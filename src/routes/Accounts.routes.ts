import {Router} from 'express'
import AccountRepository from '../repositories/AccountsRepository';
import CreateAccountService from '../services/CreateAccountService';
import{getCustomRepository} from 'typeorm';

const accountRoute = Router();

accountRoute.get('/', (request, response)=>{
    const accountRepository = getCustomRepository(AccountRepository);
    return response.json(accountRepository.find());
});


accountRoute.post('/', async (request, response) => {
    try{
        const accountRepository = getCustomRepository(AccountRepository);
        const {name, email, password, balance, created_at} = request.body;
        const createAccount = new CreateAccountService();
        //colocar a lógica da validação do e-mail aqui
        const validEmail = accountRepository.validateEmail(email);
        console.log("Valor de validEmail: "+validEmail);
        console.log('senha: '+password);
        if(!validEmail){
            return response.status(400).json({"message": "The email format is wrong! "});
        }
        const account = await createAccount.execute({name, email, password, balance, created_at});
        return response.json(account);
    }catch(err){
        return response.status(400).json({ error: err.message });
    };


});

export default accountRoute ;
