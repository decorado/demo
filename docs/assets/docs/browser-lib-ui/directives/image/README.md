# Dec Image Component

`import { DecImageModule } from '@decora/browser-lib-ui';`

## Modes

We have 2 modes: IMG and BG. It depends on the element the directive is attached at.

`IMG` is a simple image where we set the src.

`BG` is to use background images instead a image element tag.

## Inputs

### `decImage: SystemFileKey | URL | data:url`
The image to be used. It can be a system file, url or a data:url.

### `decImageSize: ImageSize`
The size of the image to be loaded from thumbor and to be set in the container element.

### `fitIn`
Defines if the image should be cropped or fit the size respectin the aspect ratio

### `thumborize`
Ged redimensioned image from thumbor image resize service

### `trim`
Defines if white margins should be cropped

## Examples

Img usage example
```html
  <img md-card-image
  [decImage]="image"
  [decImageSize]="{width:300, height:300}">
```

Div usage example
```html
  <div class="div-image"
    [decImage]="image"
    [decImageSize]="{width:300, height:300}">
  </div>
```

file.css
```Css
  .div-image {
    width: 300px;
    height: 300px;
  }
```

## Models

### SystemFileKey

```javascript
export interface SystemFileKey {
  extension?: string;
  fileBasePath?: string;
  fileUrl?: string;
  id?: string;
  originalName?: string;
  size?: number;
}
```

### ImageSize

```javascript
export interface ImageSize {
  height?: string;
  width?: string;
}
```
