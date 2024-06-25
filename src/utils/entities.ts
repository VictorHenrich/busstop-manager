


export interface PointEntity{
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