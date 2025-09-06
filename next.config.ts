import type { NextConfig } from 'next';
import { config } from 'dotenv';
import path from 'path';

// Load .env file with override to ensure it takes precedence over system env vars
config({ path: path.resolve(process.cwd(), '.env'), override: true });

const nextConfig: NextConfig = {
   /* config options here */
};

export default nextConfig;
