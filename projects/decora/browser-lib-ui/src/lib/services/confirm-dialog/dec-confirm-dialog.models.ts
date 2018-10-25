import { DecDialogAction } from './../dialog/dec-dialog.models';

export class DecConfirmDialogConfig {
  title?: string;
  message: string;
  customButtonTitle?: string;
  width?: string;
  height?: string;
  color?: 'primary' | 'accent' | 'warn' | 'default' | 'transparent' = 'primary';
  extraButtons?: DecDialogAction[];

  constructor(data: any = {}) {
    this.title = data.title;
    this.message = data.message;
    this.customButtonTitle = data.customButtonTitle || 'label.Confirm';
    this.width = data.width || '480px';
    this.height = data.height;
    this.color = data.color || 'transparent';
    this.extraButtons = data.extraButtons;
  }
}
