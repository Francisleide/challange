import {Router} from 'express'
import AccountRepository from '../repositories/AccountsRepository';
import CreateAccountService from '../services/CreateAccountService';
import{getCustomRepository} from 'typeorm';
import TransfersRepository from '../repositories/TrasnfersRepository';
import CreateTransfersService from '../services/CreateTransfersService';
import Transfer from '../models/Transfer';
import ensureAuthenticated from '../middleware/ensureAuthenticated';
import CreateWithdrawService from '../services/CreateWithdrawService';

const withdraw = Router();
withdraw.use(ensureAuthenticated);


withdraw.post('/', async (request, response) => {
    try{
        const transferRepository = getCustomRepository(TransfersRepository);
        const accounts = getCustomRepository(AccountRepository);
        const account1 = await accounts.findOne(request.account.id);
        if(!account1){
            throw new Error('Not found');
        }
        const id = account1.id;
        const {
            amount} = request.body;
        const createTransfer = new CreateWithdrawService();
        const withdraw = await createTransfer.execute({id,
            amount});
        return response.json(withdraw);
    }catch(err){
        return response.status(400).json({ error: err.message });
    };

});

export default withdraw ;
