import { SOCKET_BASE_URL } from "./constants";

export interface SocketProps{
    url: string,
    baseUrl?: string
}

export default class WebSocketUtils{
    static createSocket({
        url,
        baseUrl = SOCKET_BASE_URL
    }: SocketProps): WebSocket{
        const connectionUrl: string = `${baseUrl}${url}`;

        return new WebSocket(connectionUrl);
    }

    static captureMessageEventData<T>(messageEvent: MessageEvent): T{
        return JSON.parse(messageEvent.data);
    }

}