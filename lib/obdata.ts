import { type } from "os";

export enum ObDataType {
  // 挖矿奖励
  MiningReward = "reward",
  // 转账
  Transfer = "transfer",
}

export default interface ObData {
  type: ObDataType; // 类型
  sender: string; // 发送者的地址
  receiver: string; // 接收者的地址
  amount: number; // 金额
  message?: string; // 信息
}

//   constructor(
//     sender: string,
//     receiver: string,
//     amount: number,
//     message: string,
//     signature: string
//   ) {
//     this.sender = sender;
//     this.receiver = receiver;
//     this.amount = amount;
//     this.message = message;
//     this.signature = signature;
//   }

//   verifySignature() {
//     // 验证签名信息
//     // 使用私钥对信息进行签名
//     const publicKeyBuffer = Buffer.from(this.sender, "hex");
//     const messageBuffer = Buffer.from(this.message, "utf8");
//     const signatureBuffer = Buffer.from(this.signature, "hex");
//     return eccrypto.verify(publicKeyBuffer, messageBuffer, signatureBuffer);
//   }

//   sign(privateKey: string) {
//     // 使用私钥对信息进行签名
//     const privateKeyBuffer = Buffer.from(privateKey, "hex");
//     const messageBuffer = Buffer.from(this.message, "utf8");
//     const signature = eccrypto.sign(privateKeyBuffer, messageBuffer);
//     this.signature = signature.toString();
//   }
// }
