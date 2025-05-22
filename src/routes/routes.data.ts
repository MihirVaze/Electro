import authRoutes from "../feature-modules/auth/auth.routes";
import locationRoute from "../feature-modules/location/location.route";
import { Routes } from "./routes.types";
import planRoute from "../feature-modules/plan/plan.route"

export const routes: Routes = [
  authRoutes,
  locationRoute,
  planRoute
];