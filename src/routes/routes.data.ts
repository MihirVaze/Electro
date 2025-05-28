import authRoutes from '../feature-modules/auth/auth.routes';
import locationRoute from '../feature-modules/location/location.route';
import { Routes } from './routes.types';
import planRoute from '../feature-modules/plan/plan.route';
import userRoutes from '../feature-modules/user/user.routes';
import discountRoute from '../feature-modules/discount/discount.route';
import grievanceTypeRoute from '../feature-modules/grievanceType/grievanceType.route';

export const routes: Routes = [
    authRoutes,
    locationRoute,
    planRoute,
    userRoutes,
    discountRoute,
    grievanceTypeRoute,
];
