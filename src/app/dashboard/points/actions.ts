'use server'

import type { PointEntity, ActionProps } from "@/utils/interfaces";
import { findAddress } from "@/services/geolocation";

export interface SearchLocationsActionProps extends ActionProps{
    locations?: PointEntity[]
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


export async function searchLocations(_: unknown, formData: FormData): Promise<SearchLocationsActionProps>{
    const addressDescription: string = formData.get("addressDescription")?.toString() || "";

    const locations: PointEntity[] = await findAddress(addressDescription);

    return {
        finish: true,
        locations
    }
}