import authRoutes from '../feature-modules/auth/auth.routes';
import locationRoute from '../feature-modules/location/location.route';
import { Routes } from './routes.types';
import planRoute from '../feature-modules/plan/plan.route';
import userRoutes from '../feature-modules/user/user.routes';
import discountRoutes from '../feature-modules/discount/discount.route';
import grievanceTypeRoutes from '../feature-modules/grievanceType/grievanceType.route';
import clientRoutes from '../feature-modules/client/client.routes';
import workerRoute from '../feature-modules/worker/worker.route';
import customerRoutes from '../feature-modules/customer/customer.routes';

export const routes: Routes = [
    authRoutes,
    locationRoute,
    planRoute,
    userRoutes,
    discountRoutes,
    grievanceTypeRoutes,
    clientRoutes,
    workerRoute,
    customerRoutes,
];
