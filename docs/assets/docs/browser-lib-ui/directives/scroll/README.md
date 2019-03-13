# Dec Scroll Directive

`import { DecScrollModule } from '@decora/browser-lib-ui';`

## Inputs

### `decScrollOffset: number`
Define offset in pixels to fire the output.

## Outputs 

### `decScrollFinished`
Output fired when div scrolling finish

## Examples

Img usage example
```html
  
<h2> Scroll without OffSet</h2>
<div class="container-first-scroll"
  fxLayout="column"
  decScroll
  (decScrollFinished)="onScrollFinish('first')"
  fxLayoutAlign="start start"
  fxLayoutGap="8px">
  <div class="item" *ngFor="let item of itens;"> item: {{ item }} </div>
</div>
```

```html
<h2> Scroll with OffSet</h2>
<div class="container-first-scroll"
  fxLayout="column"
  decScroll
  [decScrollOffset]="50"
  (decScrollFinished)="onScrollFinish('second')"
  fxLayoutAlign="start start"
  fxLayoutGap="8px">
  <div class="item" *ngFor="let item of itens;"> item: {{ item }} </div>
</div>
```
