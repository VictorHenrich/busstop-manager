'use server'

import { refresh } from '@/services/auth';
import { type NextRequest, type MiddlewareConfig, NextResponse } from 'next/server';
import { REFRESH_TOKEN_KEY_NAME } from './utils/constants';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

export async function middleware(request: NextRequest): Promise<NextResponse>{
    try{
        const refreshToken: RequestCookie | void = request.cookies.get(REFRESH_TOKEN_KEY_NAME);

        if(!refreshToken)
            throw new Error("Unauthorized!");

        await refresh(refreshToken.value);

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