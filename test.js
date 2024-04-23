import sha256 from "crypto-js/sha256";

class Block {
  constructor(index, time, data, previousHash = "") {
    this.i = index;
    this.t = time;
    this.data = data;
    this.pre = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0; // 用于工作量证明的随机数
  }

  calculateHash() {
    return sha256(
      this.i +
        this.pre +
        this.t +
        JSON.stringify(this.data) +
        this.nonce
    ).toString();
  }

  mineBlock(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
      console.log("Nonce: ", this.nonce);
    }
  }
}

// 创建区块链的创世区块
let genesisBlock = new Block(0, Date.now(), "Genesis Block", "0");

const difficulty = 4;

// 为创世区块挖矿，设置难度为4
genesisBlock.mineBlock(difficulty);

// 创建新的区块
let secondBlock = new Block(1, Date.now(), "Hello, World!", genesisBlock.hash);

// 为新块挖矿，同样设置难度为4
secondBlock.mineBlock(difficulty);

console.log("Genesis Block Hash: ", genesisBlock.hash);
console.log("Second Block Hash: ", secondBlock.hash);

function verifyBlock(block, difficulty) {
  let hash = block.hash;
  while (hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
    block.nonce++;
    hash = block.calculateHash();
  }
  return hash === block.hash;
}

function verifyHashForPoW(block, difficulty) {
  // 验证哈希值是否以特定数量的零开头
  return block.hash.substring(0, difficulty) === Array(difficulty + 1).join("0");
}

// 验证创世区块
console.log("Genesis Block is valid: ", verifyBlock(genesisBlock, difficulty+1));

// 验证第二个区块
console.log("Second Block is valid: ", verifyBlock(secondBlock, difficulty+1));
