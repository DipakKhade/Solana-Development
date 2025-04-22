import { PublicKey } from "@solana/web3.js";

const [pda, seed] = PublicKey.findProgramAddressSync(
  [
    Buffer.from('balances'),
    Buffer.from('USDC'),
    new PublicKey('HWbr3TWZrxnyNMhLXd5CkwRpTmd76oL5cDqrTfCVpNfq').toBuffer()
  ],
  new PublicKey('TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb')
)

console.log(seed, pda.toBase58());
