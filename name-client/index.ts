import { Connection, Keypair, SystemProgram, Transaction } from "@solana/web3.js";

const connection = new Connection("http://127.0.0.1:8899");

async function main() {
    const kp = new Keypair();
    const sign = await connection.requestAirdrop(kp.publicKey, 3000000000);
    await connection.confirmTransaction(sign);
    
    const balance  = await connection.getBalance(kp.publicKey)
    console.log(balance);

    const ix = await SystemProgram.createAccount({
        fromPubkey: kp.publicKey,
        newAccountPubkey: kp.publicKey,
        lamports: 1000000000,
        space: 1000,
        programId: SystemProgram.programId,
    });

    const tx = new Transaction().add(ix);
    tx.feePayer = kp.publicKey;
    tx.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
    tx.sign(kp);

}


main();