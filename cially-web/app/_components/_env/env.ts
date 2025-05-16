"use server";
import {z} from "zod";
import {envSchema} from "@/app/_components/_env/schema";

export const getEnv = async () => {
    return envSchema.parse(process.env);
};

