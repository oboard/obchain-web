"use server";
import ObBlock from "@/lib/block";
import { ObDataType } from "@/lib/obdata";
import { kv } from "@vercel/kv";

const firstBlock = {
  index: 0,
  hash: "0",
  time: new Date().getTime(),
};

export async function getBalanceByAddress(address: string): Promise<number> {
  const balance = await kv.get(`balance:${address}`);
  return balance ? Number(balance) : 0;
}

export async function fetchLatestBlock(): Promise<ObBlock> {
  return ((await kv.get("latestBlock")) || firstBlock) as ObBlock;
}

export async function getBlockHeight(): Promise<number> {
  return (await kv.get("height")) ?? 0;
}

export async function pushBlock(block: ObBlock): Promise<ObBlock> {
  kv.set(`block:${block.i}`, block);
  kv.set(`latestBlock`, block);
  block.data = [
    {
      type: ObDataType.MiningReward,
      amount: 10,
      receiver: block.miner,
      sender: "system"
    },
  ];
  return block;
}
