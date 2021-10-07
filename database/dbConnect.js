import { dbConfig } from "./dbConfig.js";

import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool(dbConfig);
