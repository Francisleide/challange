import {uuid} from 'uuidv4';
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('Accounts')
class Account{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    name: string;
    @Column('time with time zone')
    email: string;
    @Column()
    password: string;
    @Column()
    balance: number;
    @Column()
    created_at: Date;

}

export default Account;
