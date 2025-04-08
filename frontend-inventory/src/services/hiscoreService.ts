import { Hiscore } from '../types';
const baseUrl = '/api/hiscore';

export const getHiscore = async (name: string): Promise<Hiscore> => {
  const data = await fetch(`${baseUrl}/${name}`);
  return data.json();
};
