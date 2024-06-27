'use server'

import { PointEntity } from "@/utils/interfaces";

export interface PointActionProps{
    finish: boolean,
    errorMessage?: string
}


export async function createOrUpdatePoint(_: unknown, formData: FormData): Promise<PointActionProps>{
    const pointUuid: string | undefined = formData.get("pointUuid")?.toString();

    const point: Partial<PointEntity> = {
        addressState: formData.get("addressState")?.toString(),
        addressCity: formData.get("addressCity")?.toString(),
        addressNeighborhood: formData.get("addressNeighborhood")?.toString(),
        addressStreet: formData.get("addressStreet")?.toString(),
        addressNumber: formData.get("addressNumber")?.toString(),
        uuid: pointUuid,
    }

    return {
        finish: true
    }
}


export async function deletePoint(_: unknown, formData: FormData): Promise<PointActionProps>{
    const pointUuid: string | undefined = formData.get("pointUuid")?.toString();

    return {
        finish: true
    }
}