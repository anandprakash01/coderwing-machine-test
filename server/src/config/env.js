import "dotenv/config";
import {z} from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().min(1024).max(65535).default(3000),
  MONGO_URI: z
    .string()
    .min(1, "MONGO URI can not be an empty string")
    .regex(/^mongodb(\+srv)?:\/\//),
  JWT_EXPIRE: z.string().default("7d"),
  JWT_SECRET_KEY: z.string().min(10),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.log(`[FATAL] [ENV] missing or invalid environment variables`);
  process.exit(1);
}

const env = Object.freeze(_env.data);

export default env;
