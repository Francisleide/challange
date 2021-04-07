import { response } from 'express';
import Transfer from '../models/Transfer';
import{EntityRepository, Repository, getCustomRepository} from 'typeorm'

interface TransferDTO{
    origin_email:string;
    target_email: string;
    amount: number;
    created_at: Date;
}

@EntityRepository(Transfer)
class TransfersRepository extends Repository<Transfer>{




}

export default TransfersRepository;
