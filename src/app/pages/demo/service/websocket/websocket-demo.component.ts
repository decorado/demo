import { Component, OnInit } from '@angular/core';
import { DecWsClientService, OpenConnection } from '@projects/decora/browser-lib-ui/src/public_api';

const WS_HOST = 'wss://demos.kaazing.com/echo';
@Component({
  selector: 'app-websocket-demo',
  templateUrl: './websocket-demo.component.html',
  styleUrls: ['./websocket-demo.component.css']
})
export class WebsocketDemoComponent implements OnInit {

  messageToSend: string;

  decWsConnection: OpenConnection;

  constructor(
    private wsClient: DecWsClientService
  ) { }

  ngOnInit() {
    this.decWsConnection = this.wsClient.connect(WS_HOST);

    this.watchMessages();
  }

  sendMessage() {
    if (this.decWsConnection && this.messageToSend) {
      this.decWsConnection.channel.send(this.messageToSend);
      this.messageToSend = undefined;
    }
  }

  private watchMessages() {

    this.decWsConnection.messages.subscribe(messages => {
      console.log('Message received', messages);
      this.actBasedOnMessage(messages[0]);
    });

  }

  private actBasedOnMessage(message) {

    switch (message) {
      case 'reload':
        this.hardReload();
        break;
    }

  }

  private hardReload() {
    window.location.reload(true);
  }

}
