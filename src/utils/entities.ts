

export interface ModelEntity{
    uuid: string
}


export interface PointEntity extends ModelEntity{
    addressState: string,
    addressCity: string,
    addressNeighborhood: string,
    addressStreet: string,
    addressNumber: string,
    latitude: string,
    longitude: string
}


export interface RouteEntity{
    description: string,
    openingTime: Date,
    closingTime: Date,
    ticketPrice: number
}


export interface AgentEntity{
    name: string,
    email: string,
    password?: string
}