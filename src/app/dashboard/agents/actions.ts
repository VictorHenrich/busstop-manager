'use server'

import { ActionProps } from "@/utils/interfaces"




export async function createOrUpdateAgent(_: unknown, formData: FormData): Promise<ActionProps>{
    return {
        finish: true
    }
}

export async function deleteAgent(_: unknown, formData: FormData): Promise<ActionProps>{
    return {
        finish: true
    }
}