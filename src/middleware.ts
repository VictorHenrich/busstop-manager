'use server'

import { refresh } from '@/services/auth';
import { type NextRequest, type MiddlewareConfig, NextResponse } from 'next/server';
import CookieUtils from './utils/cookie';

export async function middleware(request: NextRequest): Promise<NextResponse>{
    try{
        const refreshToken: string | void = CookieUtils.captureRefreshTokenData(request);

        if(!refreshToken)
            throw new Error("Unauthorized!");

        const { token } = await refresh(refreshToken);

        CookieUtils.setTokenData(token, request);

        return NextResponse.next();
    }catch(error){
        return NextResponse.redirect(new URL("/login", request.url));
    }
}


export const config: MiddlewareConfig = {
    matcher: [
        "/dashboard",
        "/dashboard/:path*",
    ]
}