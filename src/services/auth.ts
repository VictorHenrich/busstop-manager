import { cookies } from 'next/headers';

import { AUTH_URL, REFRESH_TOKEN_KEY_NAME, TOKEN_KEY_NAME } from "@/utils/constants";
import FetchUtils from "@/utils/fetch";
import { type RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';


interface AuthenticateProps{
    email: string,
    password: string
}


export async function authenticate(data: AuthenticateProps): Promise<void>{
    const response: Response = await FetchUtils.post<AuthenticateProps>({
        data,
        url: AUTH_URL,
    });

    const { content: { token, refreshToken }} = await response.json();

    cookies().set(TOKEN_KEY_NAME, token);

    cookies().set(REFRESH_TOKEN_KEY_NAME, refreshToken);
}


export async function refresh(): Promise<void>{
    const refreshToken: RequestCookie | void = cookies().get(REFRESH_TOKEN_KEY_NAME);

    if(!refreshToken)
        throw new Error("Unauthorized!");

    const data = { refresh_token: refreshToken.value };

    const response: Response = await FetchUtils.put<any>({
        data,
        url: `${AUTH_URL}/refresh`,
    });

    const { content: { token }} = await response.json();

    cookies().set(TOKEN_KEY_NAME, token);
}