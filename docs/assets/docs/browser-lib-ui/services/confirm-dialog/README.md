# Dec Confirm Dialog

`import { DecConfirmDialogModule } from '@decora/browser-lib-ui'`

A dialog to be use in confirmations

## Example

```javascript
  constructor(
    private confirmDialog: DecConfirmDialogService,
  ) { }

  open(config: DecConfirmDialogConfig): MatDialogRef<any> {
    config = new DecConfirmDialogConfig(config);
    const dialogRef: MatDialogRef<DecConfirmDialogComponent> = this.decDialog.open(DecConfirmDialogComponent, {
      width: config.width,
      height: config.height,
      hideBackButton: true,
      color: config.color,
      context: {
        description: config.description,
        customButtonTitle: config.customButtonTitle,
        requiredMessage: config.requiredMessage,
        optionalMessage: config.optionalMessage,
        message: config.message,
        messagePlaceholder: config.messagePlaceholder,
        title: config.title,
      },
    });
    return dialogRef;
  }
```

## Models

```javascript
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
    this.messagePlaceholder = data.messagePlaceholder || 'label.Message';
    this.requiredMessage = data.requiredMessage;
    this.title = data.title;
    this.width = data.width || '480px';
  }
}
```
