'use server'

import CookieUtils from "@/utils/cookie";
import { redirect } from "next/navigation";



export async function GET(_request: Request){
    CookieUtils.resetAllCookieData();

    redirect("/login");
}