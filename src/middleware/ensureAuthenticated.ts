import {Request, Response, NextFunction} from 'express';
import {verify} from 'jsonwebtoken';
import authConfig from '../config/auth';

interface TokenPayLoad{
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(request:Request, response: Response, next: NextFunction): void{
    const authHeader = request.headers.authorization;
    if(!authHeader){
        throw new Error('Authentication is missing!');
    }
    const [,token] = authHeader.split(' ');
    //console.log('o token: '+token);
    try{
        const decoded = verify(token,authConfig.jwt.secret );
        const {sub} = decoded as TokenPayLoad;
        request.account ={
            id:sub
        };
        //console.log('id: '+request.account.id);
        return next();
    }catch(err){
        throw new Error('Authentication fail!');
    }


}
