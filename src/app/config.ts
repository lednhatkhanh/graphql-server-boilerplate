import { resolveApp } from '@/utils';
import dotenv from 'dotenv';

dotenv.config({
  path: resolveApp('.env.local'),
});

export const config = {
  TOKEN_SECRET: process.env.TOKEN_SECRET,
};
