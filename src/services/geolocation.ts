import { PointEntity } from "@/utils/interfaces";
import FetchUtils from "@/utils/fetch";
import { GEOLOCATION_URL } from "@/utils/constants";



export async function findAddress(): Promise<PointEntity[]>{
    const response: Response = await FetchUtils.get({
        url: `${GEOLOCATION_URL}/`
    });

    const { content: locations } = await response.json();

    return locations;
}