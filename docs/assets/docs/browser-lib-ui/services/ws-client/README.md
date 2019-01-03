# Decora WebSocket Client

`import { DecWsClientModule } from '@decora/browser-lib-ui';`

This module provides a service to communicate with `WebSockets` in a reactive way.

The service handles error, close, receiveing and sending messages.

## Usage

Javascript

```javascript

  decWsConnection: OpenConnection;

  constructor(
    private wsClient: DecWsClientService
  ) { }

  ngOnInit() {
    this.decWsConnection = this.wsClient.connect(WS_HOST);
  }

  sendMessage() {
    if (this.decWsConnection && this.messageToSend) {
      this.decWsConnection.channel.send(this.messageToSend);
      this.messageToSend = undefined;
    }
  }

```


Html
```html
  <div *ngIf="(decWsConnection.messages | async) as messages">

    <h3>Last message</h3>
    {{ messages[0] }}

    <h4>Messages log</h4>
    <p *ngFor="let message of messages">
      {{message}}
    </p>

  </div>
```
