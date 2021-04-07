import Transfer from '../models/Transfer'
import TransfersRepository from '../repositories/TrasnfersRepository'
import{EntityRepository, Repository, getCustomRepository} from 'typeorm'
import AccountsRepository from '../repositories/AccountsRepository';
import TransferFact from './TransferFactService';

interface Request{
    origin_email:string;
    target_email: string;
    amount: number;
    created_at: Date;
}

class CreateTransfersService{
    private trasnfertRepository: TransfersRepository;



    public async execute({ origin_email, target_email, amount, created_at}: Request): Promise<Transfer>{
        const accountRepository = getCustomRepository(AccountsRepository);
        const transferRepository = getCustomRepository(TransfersRepository);
        const transferFact = new TransferFact();
        created_at = new Date();
        const transfer  = transferRepository.create({origin_email,
            target_email,
            amount,
            created_at});
            await transferRepository.save(transfer);
            await transferFact.execute({origin_email, target_email, amount});
        return transfer;
    }
}


export default CreateTransfersService;
