"use server";
import ObBlock from "@/lib/block";
import { ObDataType } from "@/lib/obdata";
import { kv } from "@vercel/kv";

export async function getBalanceByAddress(address: string): Promise<number> {
  const balance = await kv.get(`balance:${address}`);
  return balance ? Number(balance) : 0;
}

export async function fetchLatestBlock(): Promise<ObBlock | undefined> {
  const height = await getBlockHeight();
  if (await kv.exists(`block:${height}`)) {
    return (await kv.get(`block:${height}`)) as ObBlock;
  }
  return undefined;
}

export async function getBlockHeight(): Promise<number> {
  return (await kv.get("height")) ?? 0;
}

export async function pushBlock(block: ObBlock): Promise<ObBlock> {

  kv.set(`block:${block.i}`, block);
  kv.set(`height`, block.i);
  block.data = [
    {
      type: ObDataType.MiningReward,
      amount: 10,
      receiver: block.miner,
      sender: "system",
    },
  ];
  await kv.incrby(`balance:${block.miner}`, 10);
  return block;
}
