import sha256 from "crypto-js/sha256";
export function generateWalletKeyPair() {
  // Generate a random key
  // RSA encryption requires a public and private key pair
  const private_key = sha256(Math.random().toString()).toString();
  const public_key = sha256(private_key).toString();
  const key = {
    private: private_key,
    public: public_key,
  };
  return key;
}

// console.log(generateWalletKeyPair());