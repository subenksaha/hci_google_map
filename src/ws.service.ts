import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway()
export class WsService {
    @WebSocketServer()
    server: Server;

    broadcast(data: any) {
        this.server.sockets.emit('sensor', data)
    }
}