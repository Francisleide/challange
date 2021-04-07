import {uuid} from 'uuidv4';
import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import Account from './Account';

@Entity('Transfers')
class Transfer{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    origin_email: string;
    @Column()
    target_email: String;
    @Column()
    amount: number;
    @Column()
    created_at: Date;
    @ManyToOne(()=>Account)
    @JoinColumn({name:'origin_email'})
    account_origin: Account;
    @ManyToOne(()=>Account)
    @JoinColumn({name:'target_email'})
    account_target: Account;


}

export default Transfer;
