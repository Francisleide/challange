import {request, Router} from 'express'
import AccountRepository from '../repositories/AccountsRepository';
import CreateAccountService from '../services/CreateAccountService';
import{getCustomRepository} from 'typeorm';
import TransfersRepository from '../repositories/TrasnfersRepository';
import CreateTransfersService from '../services/CreateTransfersService';
import Transfer from '../models/Transfer';
import ensureAuthenticated from '../middleware/ensureAuthenticated';
import Account from '../models/Account';

const transferRoute = Router();

transferRoute.use(ensureAuthenticated);


transferRoute.get('/', async (request, response)=>{
    const transferRepository = getCustomRepository(TransfersRepository);
    const accounts = getCustomRepository(AccountRepository);
    const account = await accounts.findOne(request.account.id);
    if(!account){
        throw new Error('Not found');
    }
    const transfers = await transferRepository.find({where:[ {origin_email: account.email}, {target_email: account.email}]});

    return response.json(transfers);
});


transferRoute.post('/', async (request, response) => {
    try{
        const transferRepository = getCustomRepository(TransfersRepository);
        const accounts = getCustomRepository(AccountRepository);
        const account1 = await accounts.findOne(request.account.id);
        if(!account1){
            throw new Error('Not found');
        }
        const email = account1.email;
        const {
            target_email,
            amount,
            created_at} = request.body;
        const createTransfer = new CreateTransfersService();
        const transfer = await createTransfer.execute({origin_email: email,
            target_email,
            amount,
            created_at});
        return response.json(transfer);
    }catch(err){
        return response.status(400).json({ error: err.message });
    };


});

export default transferRoute ;
