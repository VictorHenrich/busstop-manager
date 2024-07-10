import { BASE_URL } from "./constants";

export interface FetchProps<T>{
    url: string,
    data?: T,
    method: "POST" | "PUT" | "DELETE" | "GET" | "PATCH",
    baseUrl: string,
    config?: Partial<RequestInit>,
    authorization?: string,
    params?: Record<string, string>
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
        authorization,
        params
    }: FetchProps<T>): Promise<Response>{
        let body: string | null = null;

        let finalUrl: string = url;

        const headers: Record<string, string> = {
            "Content-Type": "application/json"
        }

        if(authorization)
            headers["Authorization"] = `Bearer ${authorization}`

        if(params)
            finalUrl += `?${new URLSearchParams({ ...params }).toString()}`;

        if(data)
            body = JSON.stringify(data);

        const response: Response = await fetch(`${baseUrl}${finalUrl}`, { 
            body, 
            method,
            headers,
            ...config
        });

        if(!response.ok)
            throw new Error(
                `Failed to request for certain url: ${finalUrl}\n` +
                `Status Code: ${response.status}\n` +
                `Method: ${method}` +
                `Response Body: ${await response.text()}`+
                `Response Headers: ${JSON.stringify(response.headers)}`
            )

        return response;
    }

    static async post<T>({
        data,
        url,
        baseUrl = BASE_URL,
        ...args
    }: FetchMethodProps<T>): Promise<Response>{
        return await FetchUtils.fetchInApp({
            data, url, baseUrl, method: "POST", ...args
        });
    }

    static async put<T>({
        baseUrl = BASE_URL,
        ...args
    }: FetchMethodProps<T>): Promise<Response>{
        return await FetchUtils.fetchInApp({
            baseUrl, method: "PUT", ...args
        });
    }

    static async patch<T>({
        baseUrl = BASE_URL,
        ...args
    }: FetchMethodProps<T>): Promise<Response>{
        return await FetchUtils.fetchInApp({
            baseUrl, method: "PATCH", ...args
        });
    }

    static async get<T>({
        baseUrl = BASE_URL,
        ...args
    }: DisembodiedFetchMethodProps<T>): Promise<Response>{
        return await FetchUtils.fetchInApp({
            baseUrl, method: "GET", ...args
        });
    }

    static async delete<T>({
        baseUrl = BASE_URL,
        ...args
    }: DisembodiedFetchMethodProps<T>): Promise<Response>{
        return await FetchUtils.fetchInApp({
            baseUrl, method: "DELETE", ...args
        });
    }
}