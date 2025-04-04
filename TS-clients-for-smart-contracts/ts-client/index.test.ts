import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import * as borsh from "borsh"
import { test, expect } from "bun:test"

class CounterAccount {
  count = 0;

  constructor({ count }: { count: number }) {
    this.count = count;
  }
}

const Schema = {
  struct: {
    count: 'u32'
  }
}

const GERRTING_SIZE = borsh.serialize(
  Schema,
  new CounterAccount({ count: 0 })
).length;

let counterAccountKeyPair: Keypair;
let adminKeyPair: Keypair;

test("counter value does change", async function () {
  adminKeyPair = Keypair.generate();
  counterAccountKeyPair = new Keypair();

  // airdrop sol for new admin Keypair
  const connection = new Connection(`http://localhost:8899`, 'confirmed');
  const res = await connection.requestAirdrop(adminKeyPair.publicKey, 10 * LAMPORTS_PER_SOL);

  const programId = new PublicKey('HZTDGsCyj5ZZ8aktu8Gfn8wEFGTvDbGidDYrLHvhH21o');
  const rentExLamports = await connection.getMinimumBalanceForRentExemption(GERRTING_SIZE);

  const counterAccIx = SystemProgram.createAccount({
    fromPubkey: adminKeyPair.publicKey,
    lamports: rentExLamports,
    newAccountPubkey: counterAccountKeyPair.publicKey,
    programId,
    space: GERRTING_SIZE
  })

  const tx = new Transaction();
  tx.add(counterAccIx);

  const txnHash = await connection.sendTransaction(tx, [
    adminKeyPair, counterAccountKeyPair
  ]);

  await connection.confirmTransaction(txnHash);
})

//HZTDGsCyj5ZZ8aktu8Gfn8wEFGTvDbGidDYrLHvhH21o
