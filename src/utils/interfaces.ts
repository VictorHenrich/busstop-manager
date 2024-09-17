

export interface ModelEntity{
    uuid?: string
}


export interface LocationEntity{
    latitude: number | string,
    longitude: number | string,
}

export interface PointEntity extends ModelEntity, LocationEntity{
    addressState: string,
    addressCity: string,
    addressNeighborhood: string,
    addressStreet: string,
    addressNumber: string,
    placeId?: string
}


export interface RouteEntity extends ModelEntity{
    description: string,
    openingTime: Date,
    closingTime: Date,
    ticketPrice: number
}

export interface VehicleEntity extends ModelEntity{
    plate: string,
    type: "bus" | "car" | "motorcycle"
}


export interface AgentEntity extends ModelEntity{
    name: string,
    email: string,
    password?: string
}


export interface ActionProps{
    finish: boolean,
    errorMessage?: string
}