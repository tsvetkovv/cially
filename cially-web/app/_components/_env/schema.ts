import {z} from "zod";

export const envSchema = z.object({
    // you might want to use `z.string().url()` for URLs
    // optional because they don't exist during pre-render (next build command for Docker)
    NEXT_PUBLIC_WEBSITE_URL: z.string().optional(),
    NEXT_PUBLIC_BOT_API_URL: z.string().optional()
});

export type EnvSchema = z.infer<typeof envSchema>;