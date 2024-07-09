'use server'

import { redirect } from "next/navigation";


export async function GET(): Promise<void>{
  redirect("/login");
}
