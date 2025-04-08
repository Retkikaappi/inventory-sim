type Skill = {
  id: number;
  name: string;
  rank: number;
  level: number;
  xp: number;
}[];

type Activity = {
  id: number;
  name: string;
  rank: number;
  score: number;
}[];

export interface Hiscore {
  skills: Skill;
  activities: Activity;
}
