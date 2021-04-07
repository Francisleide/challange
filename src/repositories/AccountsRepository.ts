import { response } from 'express';
import Account from '../models/Account';
import{EntityRepository, Repository, getCustomRepository} from 'typeorm'

interface CreateAccountDTO{
    name: string;
    email:string;
    password: string;
    balance: number;
    created_at: Date;
}

@EntityRepository(Account)
class AccountsRepository extends Repository<Account>{


    public validateEmail(email: string){
       const t =  /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i

       if(t.test(email)){
           return true;
       }
       return false;
    }


}

export default AccountsRepository;
