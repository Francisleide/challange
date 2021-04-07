import Account from '../models/Account'
import AccountRepository from '../repositories/AccountsRepository'
import{getCustomRepository} from 'typeorm'
import Transfer from '../models/Transfer';

interface Request{
    origin_email:string;
    target_email: string;
    amount: number;
}

class TransferFactService{
    private accountRepository: AccountRepository;



    public async execute({origin_email, target_email, amount}: Request): Promise<void>{

        const accountRepository = getCustomRepository(AccountRepository);
        const account_origin = await accountRepository.findOne({where:{email: origin_email}});
        const account_target = await accountRepository.findOne({where:{email: target_email}});
        if(account_origin){
            if(Number(account_origin.balance) < Number(amount)){
                throw new Error('Insufficient balance');
            }
            let balanceNumber = Number(account_origin.balance);
            balanceNumber -= Number(amount);
            account_origin.balance = balanceNumber;
            await accountRepository.save(account_origin);
            if(account_target){
                let balanceNumberTarget = Number(account_target.balance);
                balanceNumberTarget += Number(amount);
                account_target.balance = balanceNumberTarget;
                await accountRepository.save(account_target);
            }
        }



    }
}


export default TransferFactService;
