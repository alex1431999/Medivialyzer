import { NPC_LIST } from "./npc.constants.ts";

export function getNPC(name: string) {
  return NPC_LIST.find((NPC) => NPC.name === name);
}
