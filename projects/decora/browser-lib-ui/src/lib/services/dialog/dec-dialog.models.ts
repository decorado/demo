export interface DecDialogAction {
  label?: string;
  i18nLabel?: string;
  color?: 'primary' | 'accent' | 'warn' | 'default';
  buttonType?: 'mat-button' | 'mat-raised-button';
  callback: (context: any) => any;
}

export class DecDialogOpenConfiguration {
  width?: string;
  height?: string;
  title?: string;
  topActions?: DecDialogAction[];
  bottomActions?: DecDialogAction[];
  context?: any;
  hideBackButton?: boolean;
  showCancelButton?: boolean;
  color?: 'primary' | 'accent' | 'warn' | 'default' | 'transparent' = 'primary';
  disableClose?: boolean;

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
    this.disableClose = data.disableClose || false;
  }
}
