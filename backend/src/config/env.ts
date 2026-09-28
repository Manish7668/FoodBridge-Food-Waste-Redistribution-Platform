import 'dotenv/config';
import { z } from 'zod';
export const env=z.object({MONGODB_URI:z.string().min(1),JWT_SECRET:z.string().min(16),JWT_REFRESH_SECRET:z.string().min(16),CLIENT_URL:z.string().url(),PORT:z.coerce.number().default(4000)}).parse(process.env);
