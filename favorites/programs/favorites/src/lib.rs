use anchor_lang::prelude::*;

declare_id!("9UpkvNvpz2UmhKYkGQt8x1Z3Ty6dF5F5pt7RaoVFWshd");

#[program]
pub mod favorites {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
