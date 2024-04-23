import sha256 from "crypto-js/sha256";
import ObData from "./obdata";
import eccrypto from "eccrypto";

export default interface ObBlock {
  i: number; // 区块索引
  t: number; // 区块产生时间
  data: ObData[]; // 区块数据
  pre: string; // 前一个区块的哈希值
  hash: string; // 区块的哈希值
  nonce: number; // 用于工作量证明的随机数
  miner: string; // 区块的挖矿者地址
}

export function calculateHash(block: ObBlock) {
  return sha256(
    block.i + block.pre + block.t + JSON.stringify(block.data) + block.nonce
  ).toString();
}

export function mineBlock(block: ObBlock, difficulty: number, appendLogFunc: (log: string, index?: number) => void): ObBlock {
  while (
    calculateHash(block).substring(0, difficulty) !==
    Array(difficulty + 1).join("0")
  ) {
    block.nonce++;
    appendLogFunc(`nonce: ${block.nonce}`);
  }
  block.hash = calculateHash(block);
  return block;
}