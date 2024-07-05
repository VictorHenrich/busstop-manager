'use server'

import type { PointEntity, ActionProps } from "@/utils/interfaces";
import { findAddress } from "@/services/geolocation";

export interface SearchLocationsActionProps extends ActionProps{
    finish: boolean,
    errorMessage?: string
}


export async function createOrUpdatePoint(_: unknown, formData: FormData): Promise<ActionProps>{
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


export async function deletePoint(_: unknown, formData: FormData): Promise<ActionProps>{
    const pointUuid: string | undefined = formData.get("pointUuid")?.toString();

    return {
        finish: true
    }
}


export async function searchLocations(_: unknown, formData: FormData): Promise<{ locations: PointEntity[] } & ActionProps>{
    const locations: PointEntity[] = await findAddress();

    return {
        finish: true,
        locations
    }
}