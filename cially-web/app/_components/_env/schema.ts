import {z} from "zod";

export const envSchema = z.object({
    // you might want to use `z.string().url()` for URLs
    // optional because they don't exist during pre-render (next build command for Docker)
    WEBSITE_URL: z.string(),
    BOT_API_URL: z.string()
});

export type EnvSchema = z.infer<typeof envSchema>;