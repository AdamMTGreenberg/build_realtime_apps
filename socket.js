import {EventEmitter} from 'events';

/**
 * This class will create a new connection, handling sending and creating messages
 * to the server
 */
class Socket{
    constructor(ws = new WebSocket(), ee = new EventEmitter()) { // providing default values
        this.ws = ws;
        this.ee = ee;
        ws.onmessage = this.message.bind(this);
        ws.onopen = this.open.bind(this);
        ws,onclose = this.close.bind(this);
    }
    on(name, fn) {
        this.ee.on(name, fn);
    }
    off(name, fn) {
        this.ee.removeListener(name, fn);
    }
    emit(name, data) {
        const message = JSON.stringify({name, data});
        this.ws.send(message);
    }
    message(e) {
        try{
            const message = JSON.parse(e.data);
            this.ee.emit(message.name, message.data);
        }
        catch(err){
            this.ee.emit('error', err);
        }
  }
    open() {
        this.ee.emit('connect');
    }
    close(){
        this.ee.emit('disconnect');
    }
}

export default Socket;