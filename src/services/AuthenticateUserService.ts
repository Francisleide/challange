import Account from '../models/Account'
import AccountRepository from '../repositories/AccountsRepository'
import{getCustomRepository} from 'typeorm'
import {compare} from 'bcryptjs';
import {sign} from 'jsonwebtoken';
import authConfig from '../config/auth'


interface Request{
    email: string;
    password: string;
}


class AuthenticateUserService{

    public async execute({email, password}: Request): Promise<{account:Account, token: string}>{

        const accountRepository = getCustomRepository(AccountRepository);
        const account = await accountRepository.findOne({where: {email}});
        if(!account){
            throw new Error('Email/Password error!');
        }
        console.log('senha do account: ', account.password);
        const verifyPassword = await compare( password, account.password);
        if(!verifyPassword){
            throw new Error('Email/Password error!');
        }

        const token = sign({}, authConfig.jwt.secret,{
            subject: account.id,
            expiresIn: authConfig.jwt.expiresIn,

        });
        return {account, token};
    }
}


export default AuthenticateUserService;
