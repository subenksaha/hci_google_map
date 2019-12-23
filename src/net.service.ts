import { Injectable, OnModuleInit, OnModuleDestroy, Inject } from '@nestjs/common';
import * as net from 'net';
import { WebSocketGateway, WebSocketServer, OnGatewayInit } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { WsService } from './ws.service';

@Injectable()
export class NetService {
    private server: net.Server;

    constructor(
      private ws: WsService
    ) {
        this.server = net.createServer();
        this.server.on('connection', (socket: net.Socket) =>{

          //this property shows the number of characters currently buffered to be written. (Number of characters is approximately equal to the number of bytes to be written, but the buffer may contain strings, and the strings are lazily encoded, so the exact number of bytes is not known.)
          //Users who experience large or growing bufferSize should attempt to "throttle" the data flows in their program with pause() and resume().
      
          console.log('---------server details -----------------');
      
          var address = this.server.address();
      
          var lport = socket.localPort;
          var laddr = socket.localAddress;
          console.log({
              address,
              localPort: lport,
              localAddress: laddr
          });

          var rport = socket.remotePort;
          var raddr = socket.remoteAddress;
          var rfamily = socket.remoteFamily;

          console.log('---------Remote Client details -----------------');
          console.log({
              raddr,
              rport,
              rfamily
          })
      
          console.log('--------------------------------------------')

          socket.setEncoding('utf8');
          
          socket.on('data', (data) => {
            var bread = socket.bytesRead;
            var bwrite = socket.bytesWritten;
            console.log('Bytes read : ' + bread);
            console.log('Bytes written : ' + bwrite);
            let json = JSON.parse(data.toString());
            this.ws.server.sockets.emit('sensor', json)

            console.log('Data sent to server : ',  JSON.parse(data.toString()));
          
          });
          
          socket.on('drain', function(){
            console.log('write buffer is empty now .. u can resume the writable stream');
            socket.resume();
          });
          
          socket.on('error',function(error){
            console.log('Error : ' + error);
          });
          
          socket.on('timeout',function(){
            console.log('Socket timed out !');
            socket.end('Timed out!');
            // can call socket.destroy() here too.
          });
          
          socket.on('end',function(data){
            console.log('Socket ended from other end!');
            console.log('End data : ' + data);
          });
          
          socket.on('close',function(error){
            var bread = socket.bytesRead;
            var bwrite = socket.bytesWritten;
            console.log('Bytes read : ' + bread);
            console.log('Bytes written : ' + bwrite);
            console.log('Socket closed!');
            if(error){
              console.log('Socket was closed coz of transmission error');
            }
          });
      });

      // emits when any error occurs -> calls closed event immediately after this.
      this.server.on('error', function(error){
        console.log('Error: ', error);
      });
      
      //emits when server is bound with server.listen
      this.server.on('listening', function(){
          console.log('Server is listening!');
      });
      
      this.server.maxConnections = 10;
    }

    onModuleInit() {
      //static port allocation
      this.server.listen(81);
        
    }
    onModuleDestroy() {
        this.server.close()
    }

}
