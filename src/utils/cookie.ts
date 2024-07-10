import { cookies } from "next/headers";
import type { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import type { NextRequest } from "next/server";
import { TOKEN_KEY_NAME, REFRESH_TOKEN_KEY_NAME } from "@/utils/constants";


export default class CookieUtils{
    private static captureCookieData(
        propName: string,
        request: NextRequest | null = null
    ): string | void{
        if(!request){
            const tokenData: RequestCookie | void = cookies().get(propName);
    
            if(tokenData)
                return tokenData.value
    
        }else{
            const tokenData: RequestCookie | void = request.cookies.get(propName);
    
            if(tokenData)
                return tokenData.value
        }
    }

    private static setCookieData(
        propName: string,
        value: string,
        request: NextRequest | null = null
    ): void{
        if(!request)
            cookies().set(propName, value);
    
        else
            request.cookies.set(propName, value);
    }

    static resetCookieData(
        propName: string,
        request: NextRequest | null = null
    ): void{
        if(!request){
            if(cookies().has(propName))
                cookies().delete(propName);

        }else{
            if(request.cookies.has(propName))
                request.cookies.delete(propName);
        }
    }

    static resetAllCookieData(): void{
        CookieUtils.resetCookieData(TOKEN_KEY_NAME);
        CookieUtils.resetCookieData(REFRESH_TOKEN_KEY_NAME);
    }

    static setTokenData(
        token: string,
        request: NextRequest | null = null
    ): void{
        CookieUtils.setCookieData(TOKEN_KEY_NAME, token, request);
    }

    static setRefreshTokenData(
        token: string,
        request: NextRequest | null = null
    ): void{
        CookieUtils.setCookieData(REFRESH_TOKEN_KEY_NAME, token, request);
    }

    static captureTokenData(request: NextRequest | null = null): string | void{
        return CookieUtils.captureCookieData(
            TOKEN_KEY_NAME, request
        )
    }

    static captureRefreshTokenData(request: NextRequest | null = null): string | void{
        return CookieUtils.captureCookieData(
            REFRESH_TOKEN_KEY_NAME, request
        )
    }
}