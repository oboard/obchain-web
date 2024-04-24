"use server";
import ObBlock from "@/lib/block";
import { ObDataType } from "@/lib/obdata";
import { kv } from "@vercel/kv";
import * as eccrypto from "@toruslabs/eccrypto";

export async function getBalanceByAddress(address: string): Promise<number> {
  const balance = await kv.get(`balance:${address}`);
  return balance ? Number(balance) : 0;
}

export async function fetchLatestBlock(): Promise<ObBlock | undefined> {
  const height = await getBlockHeight();
  if (await kv.exists(`block:${height}`)) {
    return (await kv.get(`block:${height}`)) as ObBlock;
  } else {
    // search for the latest block
    let _height = height;
    while (_height > 0) {
      if (await kv.exists(`block:${_height}`)) {
        await kv.set("height", _height);
        return (await kv.get(`block:${_height}`)) as ObBlock;
      }
      _height--;
    }
  }
  return undefined;
}

export async function getBlockHeight(): Promise<number> {
  return (await kv.get("height")) ?? 0;
}

export async function pushBlock(block: ObBlock): Promise<ObBlock> {
  block.data = [
    {
      type: ObDataType.MiningReward,
      amount: 10,
      receiver: block.miner,
      sender: "system",
    },
  ];
  kv.set(`block:${block.i}`, block);
  kv.incr(`height`);
  await kv.incrby(`balance:${block.miner}`, 10);
  return block;
}

export async function sendToAddress(
  from: string,
  to: string,
  amount: number,
  sig: Buffer
): Promise<boolean> {
  const balance = await getBalanceByAddress(from);
  if (balance < amount) {
    return false;
  }
  // validate ecc signature
  await eccrypto
    .verify(Buffer.from(from), sig, Buffer.from(`${from}${to}${amount}`))
    .then(function () {
      console.log("Signature is OK");
    })
    .catch(function () {
      console.log("Signature is BAD");
      return false;
    });

  // appending transaction to block
  const block = await fetchLatestBlock();
  if (!block) {
    return false;
  }
  block.data.push({
    type: ObDataType.Transfer,
    amount,
    receiver: to,
    sender: from,
  });

  // update balance
  await kv.incrby(`balance:${from}`, -amount);
  await kv.incrby(`balance:${to}`, amount);
  return true;
}
