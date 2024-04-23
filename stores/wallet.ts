"use client";
import {
  fetchLatestBlock,
  getBalanceByAddress,
  getBlockHeight,
} from "@/app/actions";
import ObBlock from "@/lib/block";
import { generateWalletKeyPair } from "@/lib/key";
import { makeAutoObservable } from "mobx";

const firstBlock = {
  i: 0,
  t: 0,
  hash: "0",
  nonce: 0,
} as ObBlock;


class WalletStore {
  publicKey: string = "";
  privateKey: string = "";
  balance: number = 0;
  blockHeight: number = -1;
  lastBlock: ObBlock | null = null;
  constructor() {
    makeAutoObservable(this); // 响应式处理
  }
  loadHeight() {
    fetchLatestBlock().then((block) => {
      if (!block) {
        this.blockHeight = 0;
        this.lastBlock = firstBlock;
        return;
      }
      this.blockHeight = block?.i ?? 0;
      this.lastBlock = block;
    });
  }
  loadLastBlock() {
    // TODO: 获取最新区块
    this.lastBlock = null;
  }
  loadBalance() {
    getBalanceByAddress(walletStore.publicKey).then((balance) => {
      this.balance = balance;
    });
  }
  loadWalletFromStorage() {
    const public_key = localStorage.getItem("public_key");
    const private_key = localStorage.getItem("private_key");
    if (public_key && private_key) {
      this.publicKey = public_key;
      this.privateKey = private_key;
    }
  }
  saveWalletToStorage() {
    localStorage.setItem("public_key", this.publicKey);
    localStorage.setItem("private_key", this.privateKey);
  }
  importWallet(private_key: string) {
    const keyPair = generateWalletKeyPair(private_key);
    this.publicKey = keyPair.public;
    this.privateKey = keyPair.private;
    this.saveWalletToStorage();
  }
  newWallet() {
    const keyPair = generateWalletKeyPair();
    this.publicKey = keyPair.public;
    this.privateKey = keyPair.private;
    this.saveWalletToStorage();
  }
  removeWallet() {
    this.publicKey = "";
    this.privateKey = "";
    localStorage.removeItem("public_key");
    localStorage.removeItem("private_key"); // 移除本地存储
  }
}

const walletStore = new WalletStore();

export default walletStore;
