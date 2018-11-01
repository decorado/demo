import { DecDialogColor } from './../dialog/dec-dialog.models';

export class DecConfirmDialogConfig {
  color?: DecDialogColor;
  customButtonTitle?: string;
  description: string;
  disableClose?: boolean;
  height?: string;
  optionalMessage?: boolean;
  message?: string;
  messagePlaceholder?: string;
  requiredMessage?: boolean;
  title?: string;
  width?: string;

  constructor(data: any = {}) {
    this.color = data.color || 'basic';
    this.customButtonTitle = data.customButtonTitle || 'label.Confirm';
    this.description = data.description;
    this.disableClose = data.disableClose;
    this.height = data.height;
    this.optionalMessage = data.optionalMessage;
    this.message = data.message;
    this.messagePlaceholder = data.messagePlaceholder || 'label.Description';
    this.requiredMessage = data.requiredMessage;
    this.title = data.title;
    this.width = data.width || '480px';
  }
}
