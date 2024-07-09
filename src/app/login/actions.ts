'use server'

import { authenticate } from "@/services/auth";
import { type ActionProps } from "@/utils/interfaces";
import CookieUtils from "@/utils/cookie";

export default async function login(_: unknown, formData: FormData): Promise<ActionProps>{
    const email: string = `${formData.get("email")}`;

    const password: string = `${formData.get("password")}`;

    try{
        const { token, refreshToken } = await authenticate({ email, password });

        CookieUtils.setTokenData(token);

        CookieUtils.setRefreshTokenData(refreshToken);

        return { finish: true };

    }catch(error){
        return {
            errorMessage: "Email ou senha estão inválidos",
            finish: true
        }
    }
}