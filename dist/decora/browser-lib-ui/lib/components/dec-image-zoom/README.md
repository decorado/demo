# Dec Image Zoom

`import { DecImageZoomModule } from '@decora/browser-lib-ui'`

This component enables zoom in images

## Usage

```html
  <dec-image-zoom
    [size]="{width: 300, height: 300}"
    [systemFile]="image">
  </dec-image-zoom>
```

## API

### @Input() zoomMode: ZoomMode = 'click';

`'hover' | 'click' | 'toggle' | 'hover-freeze'`

### @Input() enableScrollZoom = true;

### @Input() scrollStepSize = 0.1;

### @Input() enableLens = false;

### @Input() lensWidth = 100;

### @Input() lensHeight = 100;

### @Input() systemFile: SystemFileKey;

### @Input() size: DecImageSize;
