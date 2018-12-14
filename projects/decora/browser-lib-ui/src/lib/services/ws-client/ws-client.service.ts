import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OpenConnection } from './ws-client.models';

@Injectable()
export class DecWsClientService {

  private connection: {
    [key: string]: OpenConnection
  } = {};

  constructor() {}

  connect(url) {

    const connection = this.connection[url];

    if (connection) {

      return connection;

    } else {

      return this.connectToWs(url);

    }

  }

  private connectToWs(url): OpenConnection {

    const connection = this.openConnection(url);

    this.connection[url] = connection;

    return connection;

  }


  private openConnection(url: string, connection?: OpenConnection): OpenConnection {

    if (connection) {

      connection.channel = new WebSocket(url);

    } else {

      connection = connection ? connection : {
        channel: new WebSocket(url),
        messages: new BehaviorSubject<string[]>([]),
      };

    }

    this.configureConnectionEvents(url, connection);

    return connection;

  }

  private configureConnectionEvents(url, connection) {

    connection.channel.onclose = () => this.openConnection(url, connection);

    connection.channel.onerror = () => this.openConnection(url, connection);

    connection.channel.onmessage = (a) => this.handleMessage(a, connection);

  }

  private handleMessage(a, connection) {

    const currentMessages = connection.messages.getValue();

    currentMessages.unshift(a.data);

    connection.messages.next(currentMessages);

  }

}
