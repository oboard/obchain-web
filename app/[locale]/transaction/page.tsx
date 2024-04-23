"use client";
import Miner from "@/components/miner";
import Wallet from "@/components/wallet";
import walletStore from "@/stores/wallet";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

function TransactionPage() {
  useEffect(() => {
    walletStore.loadWalletFromStorage();
  }, []);

  return (
    <main className="relative flex min-h-screen flex-col items-center gap-2">
      <h1 className="pt-4 pb-8 bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
        ObChain Web
      </h1>
      <Wallet />
      <Miner />
    </main>
  );
}

export default observer(TransactionPage);
