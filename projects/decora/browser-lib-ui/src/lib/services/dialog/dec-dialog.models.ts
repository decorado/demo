export interface DialogAction {
  label?: string;
  i18nLabel?: string;
  callback: Function;
  color?: 'primary' | 'accent' | 'warn' | 'default';
  buttonType?: 'mat-button' | 'mat-raised-button';
}

export class OpenConfiguration {
  width?: string;
  height?: string;
  title?: string;
  topActions?: DialogAction[];
  bottomActions?: DialogAction[];
  context?: any;
  hideBackButton?: boolean;
  showCancelButton?: boolean;
  color?: 'primary' | 'accent' | 'warn' | 'default' | 'transparent' = 'primary';

  constructor(data: any = {}) {
    this.width = data.width;
    this.height = data.height;
    this.title = data.title;
    this.topActions = data.topActions;
    this.bottomActions = data.bottomActions;
    this.context = data.context;
    this.hideBackButton = data.hideBackButton;
    this.showCancelButton = data.showCancelButton;
    this.color = data.color || 'primary';
  }
}
