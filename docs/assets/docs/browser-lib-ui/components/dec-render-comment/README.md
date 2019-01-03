# Decora Render Comment

`import { DecRenderCommentModule } from '@decora/browser-lib-ui'`

## Examples

```javascript
  
  import { MatDialog } from '@angular/material';

  constructor(public dialog: MatDialog) { }

  const dialogRef = this.dialog.open(DecRenderCommentComponent, {
      data: {
        commentEdit: RenderComment
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.choiceResult = result;
    });

```

## Model

```javascript
export default interface RenderComment {
  version: number;
  comment: string;
}

```
