export type DecDialogColor = 'primary' | 'accent' | 'warn' | 'default' | 'basic';

export class DecDialogOpenConfiguration {
  autoFocus?: boolean;
  color?: DecDialogColor;
  context?: any;
  disableClose?: boolean;
  height?: string;
  hideBackButton?: boolean;
  id?: number;
  title?: string;
  width?: string;

  constructor(data: any = {}) {
    this.autoFocus = data.autoFocus;
    this.color = data.color || 'primary';
    this.context = data.context;
    this.disableClose = data.disableClose || false;
    this.height = data.height;
    this.hideBackButton = data.hideBackButton;
    this.id = data.id || parseInt(`${Date.now()}${Math.random() * 10000 * Math.random() * 100}`, 10);
    this.title = data.title;
    this.width = data.width;
  }
}
