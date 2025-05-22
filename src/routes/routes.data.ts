import authRoutes from "../feature-modules/auth/auth.routes";
import locationRoute from "../feature-modules/location/location.route";
import { Routes } from "./routes.types";

export const routes: Routes = [
  authRoutes,
  locationRoute
];