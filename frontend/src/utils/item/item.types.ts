import { NPCName } from '../npc/npc.types.ts';

export type ItemName = string;

export type Item = {
  name: ItemName;
  value?: number;
  NPCs?: (NPCName | 'Players')[];
};

export type ItemLooted = Item & {
  amount: number;
};
