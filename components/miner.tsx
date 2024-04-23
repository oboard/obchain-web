"use client";

import { fetchLatestBlock, getBlockHeight, pushBlock } from "@/app/actions";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import ObBlock, { mineBlock } from "@/lib/block";
import { toast } from "react-hot-toast";

export default function Miner() {
  const [nowBlockHeight, setNowBlockHeight] = useState(-1);
  const [lastBlock, setLastBlock] = useState<ObBlock>();
  const [miningLog, setMiningLog] = useState<string[]>([]);

  useEffect(() => {
    getBlockHeight().then((height) => {
      setNowBlockHeight(height);
    });
    fetchLatestBlock().then((block) => {
      setLastBlock(block);
    });
  }, []);

  function appendLog(log: string, index?: number) {
    if (index === undefined) {
      setMiningLog((prev) => [...prev, log]);
    } else {
      setMiningLog((prev) => {
        const newPrev = [...prev];
        newPrev[index] = log;
        return newPrev;
      });
    }
  }
  return (
    <div className="bg-white/30 p-8 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
      <h1 className="text-3xl font-bold mb-4">Miner</h1>
      {nowBlockHeight === -1 && lastBlock === undefined ? (
        <p className="animate-pulse">Loading...</p>
      ) : (
        <>
          <p>Now Block Height: {nowBlockHeight}</p>
          {miningLog.length > 0 && (
            <div className="mb-4 bg-black rounded p-4 max-height-200 overflow-y-auto">
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="mb-2">Mining Log:</p>
                <ul className="list-disc list-inside">
                  {miningLog.map((log, index) => (
                    <li key={index}>{log}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          <Button
            onClick={() => {
              const publicKey = localStorage.getItem("public_key");
              if(!publicKey) {
                toast.error("Please create a wallet first");
                return;
              }
              console.log("Start Mining");
              setMiningLog([]);
              // 开始挖矿
              const block = mineBlock(
                {
                  i: (lastBlock?.i ?? 0) + 1 || 0,
                  t: Date.now(),
                  data: [],
                  pre: lastBlock?.hash ?? "", // 前一个区块的哈希值
                  hash: "", // 区块的哈希值
                  nonce: 0, // 用于工作量证明的随机数
                  miner: publicKey ?? "", // 矿工的公钥
                },
                Math.floor(nowBlockHeight / 10) + 1,
                appendLog
              );
              pushBlock(block);
              appendLog(`Mined block ${block.i} with hash ${block.hash}`);
            }}
          >
            Start Mining
          </Button>
        </>
      )}
    </div>
  );
}
