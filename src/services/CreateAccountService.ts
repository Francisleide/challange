import Account from '../models/Account'
import AccountRepository from '../repositories/AccountsRepository'
import{getCustomRepository} from 'typeorm'
import {hash} from 'bcryptjs';

interface Request{
    name: string;
    email: string;
    password: string;
    balance: number;
    created_at: Date;
}

class CreateAccountService{
    private accountRepository: AccountRepository;



    public async execute({name, email, password, balance, created_at}: Request): Promise<Account>{

        const accountRepository = getCustomRepository(AccountRepository);
        balance = 1000;
        created_at = new Date();
        const usrExists = accountRepository.findOne({where:{email} });
        console.log(usrExists);
        if(!usrExists){
            throw new Error('The Email already exists!');
        }
        const hashPassword = await hash(password, 8);
        console.log('data no service: '+created_at);
        const account  = accountRepository.create({name, email, password: hashPassword, balance, created_at});
        await accountRepository.save(account);

        return account;
    }
}


export default CreateAccountService;
