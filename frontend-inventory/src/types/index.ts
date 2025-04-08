export type TaskData = {
  name: string;
  amount: string;
  extAmount: string;
  requirement: string;
  weight: string;
};

export type ItemSlot =
  | 'head'
  | 'cape'
  | 'neck'
  | 'ammo'
  | 'weapon'
  | 'shield'
  | 'two-handed'
  | 'body'
  | 'legs'
  | 'hands'
  | 'feet'
  | 'ring';

export type Item = {
  equipped: boolean;
  slot: ItemSlot;
  img: string;
};

export type EmptySlot = {
  equipped: null;
  slot: null;
};

export type Slot = Item | EmptySlot;

export type EquippedGear = {
  mainHand: Item | null;
  offHand: Item | null;
  head: Item | null;
  cape: Item | null;
  neck: Item | null;
  ammo: Item | null;
  body: Item | null;
  legs: Item | null;
  hands: Item | null;
  feet: Item | null;
  ring: Item | null;
};

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
