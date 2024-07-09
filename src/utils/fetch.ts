import { API_CONFIGS, BASE_URL } from "./constants";

export interface FetchProps<T>{
    url: string,
    data?: T,
    method: "POST" | "PUT" | "DELETE" | "GET" | "PATCH",
    baseUrl: string,
    config: Partial<RequestInit>,
    authorization?: string
}

interface FetchMethodProps<T> extends Omit<FetchProps<T>, "method" | "baseUrl" | "config">{
    baseUrl?: string,
    config?: Partial<RequestInit>
}

interface DisembodiedFetchMethodProps<T> extends Omit<FetchProps<T>, "method" | "baseUrl" | "config" | "data">{
    baseUrl?: string,
    config?: Partial<RequestInit>
}


export default class FetchUtils{
    private static async fetchInApp<T>({
        url, 
        data,
        method,
        baseUrl,
        config,
        authorization
    }: FetchProps<T>): Promise<Response>{
        let body: string | null = null;

        const headers: HeadersInit = {
            //...headers
        }

        if(authorization)
            headers["Authorization"] = authorization

        if(data)
            body = JSON.stringify(data);

        const response: Response = await fetch(`${baseUrl}${url}`, { body, method, headers, ...config });

        if(!response.ok)
            throw new Error(
                `Failed to request for certain url: ${url}\n` +
                `Status Code: ${response.status}\n` +
                `Response Body: ${response.body}`
            )

        return response;
    }

    static async post<T>({
        data,
        url,
        authorization,
        baseUrl = BASE_URL,
        config = API_CONFIGS
    }: FetchMethodProps<T>): Promise<Response>{
        return await FetchUtils.fetchInApp({
            data, url, baseUrl, config, authorization, method: "POST"
        });
    }

    static async put<T>({
        data,
        url,
        authorization,
        baseUrl = BASE_URL,
        config = API_CONFIGS
    }: FetchMethodProps<T>): Promise<Response>{
        return await FetchUtils.fetchInApp({
            data, url, baseUrl, config, authorization, method: "PUT"
        });
    }

    static async patch<T>({
        data,
        url,
        authorization,
        baseUrl = BASE_URL,
        config = API_CONFIGS
    }: FetchMethodProps<T>): Promise<Response>{
        return await FetchUtils.fetchInApp({
            data, url, baseUrl, config, authorization, method: "PATCH"
        });
    }

    static async get<T>({
        url,
        authorization,
        baseUrl = BASE_URL,
        config = API_CONFIGS,
    }: DisembodiedFetchMethodProps<T>): Promise<Response>{
        return await FetchUtils.fetchInApp({
            url, baseUrl, config, authorization, method: "GET"
        });
    }

    static async delete<T>({
        url,
        authorization,
        baseUrl = BASE_URL,
        config = API_CONFIGS
    }: DisembodiedFetchMethodProps<T>): Promise<Response>{
        return await FetchUtils.fetchInApp({
            url, baseUrl, config, authorization, method: "DELETE"
        });
    }
}