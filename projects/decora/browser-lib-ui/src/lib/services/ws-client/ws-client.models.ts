import { BehaviorSubject } from 'rxjs';

export interface OpenConnection {
  channel: WebSocket;
  messages: BehaviorSubject<string[]>;
}
