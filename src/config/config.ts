import dotenv from 'dotenv';
import path from 'path';
import { z } from 'zod';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const envVarsSchema = z
  .object({
    NODE_ENV: z.enum(['production', 'development', 'test']),
    PORT: z
      .string()
      .transform((val) => parseInt(val, 10))
      .default('3000'),
    JWT_SECRET: z.string().min(1, 'JWT secret key is required'),
    JWT_ACCESS_EXPIRATION_MINUTES: z
      .string()
      .transform((val) => parseInt(val, 10))
      .default('30'),
    JWT_REFRESH_EXPIRATION_DAYS: z
      .string()
      .transform((val) => parseInt(val, 10))
      .default('30'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: z
      .string()
      .transform((val) => parseInt(val, 10))
      .default('10'),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: z
      .string()
      .transform((val) => parseInt(val, 10))
      .default('10'),
    SMTP_HOST: z.string().optional(),
    SMTP_PORT: z
      .string()
      .transform((val) => parseInt(val, 10))
      .optional(),
    SMTP_USERNAME: z.string().optional(),
    SMTP_PASSWORD: z.string().optional(),
    EMAIL_FROM: z.string().optional(),
  })
  .passthrough();

let config: z.infer<typeof envVarsSchema>;

try {
  config = envVarsSchema.parse(process.env);
} catch (error) {
  if (error instanceof z.ZodError) {
    throw new Error(`Config validation error: ${error.errors.map((e) => e.message).join(', ')}`);
  }
  throw error;
}

export default {
  env: config.NODE_ENV,
  port: config.PORT,
  jwt: {
    secret: config.JWT_SECRET,
    accessExpirationMinutes: config.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: config.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: config.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: config.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  email: {
    smtp: {
      host: config.SMTP_HOST,
      port: config.SMTP_PORT,
      auth: {
        user: config.SMTP_USERNAME,
        pass: config.SMTP_PASSWORD,
      },
    },
    from: config.EMAIL_FROM,
  },
};
