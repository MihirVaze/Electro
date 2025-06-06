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
import meterRoute from '../feature-modules/meter/meter.route';
import consumptionRoute from '../feature-modules/consumption/consumption.route';
import customerBillRoute from '../feature-modules/billing/customerBill/customerBill.route';
import reportRoutes from '../feature-modules/report/report.routes';
import clientBillRoute from '../feature-modules/billing/clientBill/clientBill.route';
import grievanceRoute from '../feature-modules/grievance/grievance.route';
import clientUIRoute from '../feature-modules/clientUIData/clientUI.route';

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
    userRoutes,
    meterRoute,
    consumptionRoute,
    customerBillRoute,
    reportRoutes,
    clientUIRoute,
    meterRoute,
    consumptionRoute,
    clientBillRoute,
    grievanceRoute,
];
