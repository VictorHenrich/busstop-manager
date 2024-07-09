'use server'
import { cookies } from "next/headers";
import { authenticate } from "@/services/auth";
import { type ActionProps } from "@/utils/interfaces";
import { REFRESH_TOKEN_KEY_NAME, TOKEN_KEY_NAME } from "@/utils/constants";

export default async function login(_: unknown, formData: FormData): Promise<ActionProps>{
    const email: string = `${formData.get("email")}`;

    const password: string = `${formData.get("password")}`;

    try{
        const { token, refreshToken } = await authenticate({ email, password });

        cookies().set(REFRESH_TOKEN_KEY_NAME, refreshToken);

        cookies().set(TOKEN_KEY_NAME, token);

        return { finish: true };

    }catch(error){
        return {
            errorMessage: "Email ou senha estão inválidos",
            finish: true
        }
    }
}