import { AUTH_URL } from "@/utils/constants";
import FetchUtils from "@/utils/fetch";
import type { AgentEntity } from "@/utils/interfaces";

export type AuthenticateProps = Omit<AgentEntity, "name">;


export async function authenticate(data: AuthenticateProps): Promise<{ token: string, refreshToken: string }>{
    const response: Response = await FetchUtils.post<AuthenticateProps>({
        data,
        url: AUTH_URL,
    });

    const { content: { token, refresh_token: refreshToken }} = await response.json();

    return {
        refreshToken,
        token
    }
}


export async function refresh(refreshToken: string): Promise<{ token: string }>{
    const data = { refresh_token: refreshToken };

    const response: Response = await FetchUtils.put<any>({
        data,
        url: `${AUTH_URL}/refresh`,
    });

    const { content: { token }} = await response.json();

    return { token }
}