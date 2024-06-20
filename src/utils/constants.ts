



export const BASE_URL: string = process.env.BASE_URL || "";

export const TOKEN_KEY_NAME: string = process.env.BASE_URL || "";

export const REFRESH_TOKEN_KEY_NAME: string = process.env.BASE_URL || "";

export const API_CONFIGS: RequestInit = {
    headers: {
        "Content-Type": "application/json"
    }
}

export const AUTH_URL: string = process.env.AUTH_URL || "";