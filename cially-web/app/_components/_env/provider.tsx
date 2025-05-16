"use client";
import {createContext, useContext, useEffect, useState} from "react";
import {getEnv} from "./env";
import type {EnvSchema} from "@/app/_components/_env/schema";

export const EnvContext = createContext<EnvSchema | undefined>(undefined);
export const EnvProvider = ({children}: Readonly<{ children: React.ReactNode; }>) => {
    const [env, setEnv] = useState<EnvSchema>();
    useEffect(() => {
        getEnv().then((env) => {
            setEnv(env);
        });
    }, []);
    if (!env) {
        return <div>Loading...</div>;
    }
    return <EnvContext.Provider value={env}>{children}</EnvContext.Provider>;
};
export const useEnv = () => {
    const context = useContext(EnvContext);
    if (!context) {
        throw new Error("useEnv must be used within a <EnvProvider />");
    }
    return context;
};