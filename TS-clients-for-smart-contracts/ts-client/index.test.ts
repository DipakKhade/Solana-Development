import { Keypair } from "@solana/web3.js";
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
})


