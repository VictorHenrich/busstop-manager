import { type PointEntity } from "@/utils/interfaces";
import FetchUtils from "@/utils/fetch";
import { GEOLOCATION_URL } from "@/utils/constants";
import CookieUtils from "@/utils/cookie";



export async function findAddress(addressDescription: string): Promise<PointEntity[]>{
    const token: string = CookieUtils.captureTokenData() || "";

    const response: Response = await FetchUtils.get({
        url: `${GEOLOCATION_URL}/find`,
        params: {
            address_description: addressDescription
        },
        authorization: token
    });

    const { content: locations }: {content: Record<string, any>[]} = await response.json();

    return locations.map(point => ({
        addressState: point.address_state,
        addressCity: point.address_city,
        addressNeighborhood: point.address_neighborhood,
        addressStreet: point.address_street,
        addressNumber: point.address_number,
        latitude: point.latitude,
        longitude: point.longitude
    }));
}