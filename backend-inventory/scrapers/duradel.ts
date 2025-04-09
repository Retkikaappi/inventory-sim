import puppeteer from 'puppeteer';
import fs from 'fs';

const scrape = async () => {
  const ua =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.3';
  const browser = await puppeteer.launch({ devtools: true });
  const page = await browser.newPage();
  await page.setUserAgent(ua);

  await page.goto('https://oldschool.runescape.wiki/w/Duradel', {
    waitUntil: 'domcontentloaded',
  });
  await new Promise((resolve) => setTimeout(resolve, 1500));
  await page.waitForSelector('div.mw-parser-output', { visible: true });

  const content = await page.evaluate(() => {
    const content = document.querySelectorAll(
      'div.mw-parser-output > table'
    )[3];

    if (!content) throw new Error('No content');

    const rows = content.querySelectorAll('tbody > tr');

    return Array.from(rows).map((row) => {
      const cells = row.querySelectorAll('td');
      const name = cells[0].textContent?.trim();
      const amount = cells[1].textContent?.trim();
      const extAmount = cells[2].textContent?.trim();

      const req = cells[3].querySelector('span')?.getAttribute('data-skill');

      const requirement =
        req === 'Slayer'
          ? cells[3].querySelector('span')?.textContent?.trim()
          : null;
      const weight = cells[5].textContent?.trim();

      return {
        name: name ? name : 'No name',
        amount: amount ? amount : 'No amount',
        extAmount: extAmount ? extAmount : 'No extAmount',
        requirement: requirement ? requirement : 'No requirement',
        weight: weight ? weight : 'No weight',
      };
    });
  });

  fs.writeFileSync(
    './src/data/tasks-duradel.json',
    JSON.stringify(content, null, 2)
  );

  await browser.close();
};

await scrape();
process.exit(1);
