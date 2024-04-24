"use client";
import * as eccrypto from "@toruslabs/eccrypto";

export function generateWalletKeyPair(prePrivateKey?: string) {
  // 生成一个新的ECC密钥对
  const privateKey = prePrivateKey
    ? Buffer.from(prePrivateKey)
    : eccrypto.generatePrivate();
  const publicKey = eccrypto.getPublic(privateKey);
  const key = {
    public: publicKey.toString("hex"),
    private: privateKey.toString("hex"),
  };
  return key;
}

// console.log(generateWalletKeyPair());
