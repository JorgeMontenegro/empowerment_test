/* istanbul ignore file */
import * as dotenv from 'dotenv';
dotenv.config();

export const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
};
