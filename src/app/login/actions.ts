'use server'

import { authenticate } from "@/services/auth";
import { LoginActionResult } from "./states";

export default async function login(_: unknown, formData: FormData): Promise<LoginActionResult>{
    const email: string = `${formData.get("email")}`;

    const password: string = `${formData.get("password")}`;

    try{
        await authenticate({ email, password });

        return { message: "", error: false };
    }catch(error){
        return {
            message: "Email ou senha estão inválidos",
            error: true
        }
    }
}