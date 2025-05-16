import {z} from "zod";

export const envSchema = z.object({
    // you might want to use `z.string().url()` for URLs
    NEXT_PUBLIC_WEBSITE_URL: z.string(),
    NEXT_PUBLIC_BOT_API_URL: z.string()
});

export type EnvSchema = z.infer<typeof envSchema>;