import express, { Request, Response } from 'express';
import { Hiscore } from '../types';

const router = express.Router();

router.get(
  '/:name',
  async (req: Request<{ name: string }, unknown, Hiscore>, resp: Response) => {
    const { name } = req.params;
    const data = await fetch(
      `https://secure.runescape.com/m=hiscore_oldschool/index_lite.json?player=${name}`
    );
    const json = await data.json();
    resp.json(json);
  }
);

export default router;
