import Account from '../models/Account'
import AccountRepository from '../repositories/AccountsRepository'
import{getCustomRepository} from 'typeorm'
import AccountsRepository from '../repositories/AccountsRepository';
import { request } from 'express';


interface Request{
    id: string
    amount: number;
}

class CreateWithdrawService{

    public async execute({ id, amount}: Request): Promise<Account>{

        const accountRepository = getCustomRepository(AccountRepository);
        const account = await accountRepository.findOne(id);
        if(!account){
            throw new Error('User not found!');
        }
        if(Number(account.balance) < Number(amount)){
                throw new Error('Insufficient balance');
            }
            let balanceNumber = Number(account.balance);
            balanceNumber -= Number(amount);
            account.balance = balanceNumber;
            await accountRepository.save(account);
            return account;

    }
}


export default CreateWithdrawService;
