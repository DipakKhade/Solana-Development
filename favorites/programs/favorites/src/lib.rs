use anchor_lang::prelude::*;


declare_id!("Cn66ThiVjZ4FrjmRYEWReYMeuwu7iMVXYWeuKecaN49z");

#[program]
mod hello_solana{
    use anchor_lang::{prelude::Context, solana_program::nonce::state::Data};

    use super::*;
    // each fn is a instruction
    pub fn init_account(ctx:Context<Init>,data:u64) ->Result<()> {
        ctx.accounts.new_account.data = data;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Init <'info>{
    #[account(init,payer=signer, space = 8+8)]
    pub new_account:Account<'info,NewAccount>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program:Program<'info,System>
}

#[account]
pub struct NewAccount{
    data:u64,
}