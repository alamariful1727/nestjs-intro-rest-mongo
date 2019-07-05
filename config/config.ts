import { resolve } from 'path';

import * as dotenv from 'dotenv';

dotenv.config({ path: resolve(__dirname, '../.env') });

export const config = {
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
};
