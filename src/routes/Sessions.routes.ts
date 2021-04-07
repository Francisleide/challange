import {Router} from 'express'
import AccountRepository from '../repositories/AccountsRepository';
import AuthenticateUserService from '../services/AuthenticateUserService'


const sessionRoutes = Router();


sessionRoutes.post('/', async (request, response) => {
    try{
        const authenticateUserService = new AuthenticateUserService();
        const {email, password} = request.body;
        const {account, token} = await authenticateUserService.execute({email, password});

        response.json({account, token});

    }catch(err){
        return response.status(400).json({ error: err.message });
    };


});

export default sessionRoutes ;
