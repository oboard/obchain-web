"use server";
import { kv } from "@vercel/kv";

export async function getBalanceByAddress(address: string): Promise<number> {
  const balance = await kv.get(`balance:${address}`);
  return balance ? Number(balance) : 0;
}
