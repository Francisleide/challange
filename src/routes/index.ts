import { Router } from 'express';
import accountRoute from './Accounts.routes';
import sessionRoutes from './Sessions.routes';
import transferRoute from './Transfers.routs'
import withdraw from './Withdraw.routs'

const routes = Router();

routes.use('/api/accounts', accountRoute);
routes.use('/api/signin', sessionRoutes);
routes.use('/api/transfers', transferRoute);
routes.use('/api/withdraw', withdraw);


export default routes;
