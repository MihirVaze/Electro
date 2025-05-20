import { configure } from "./config/env.config";
configure();

import { startServer } from "./src/app";
startServer();