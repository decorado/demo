# Product Spin
`import { ProductSpinModule } from '@decora/browser-lib-ui';`

This component is used to spin objects using a sequence of images.

The images are loaded, parsed, treated and then displayed. So the user can interact with it dragging the cursor horizontally over the image. It will give a sensation of movement.

## Usage

```html
  <dec-product-spin></dec-product-spin>
```

## API

| Attribute            | Type    | Default       | Usage                                                                         |
|----------------------|---------|---------------|-------------------------------------------------------------------------------|
| looping              | boolean | false         | Flag to determine if it will loop upon reaching the end.                      |
| onlyModal            | boolean | false         | Flag to define whether the modal will appear or not.                          |
| fallbackImage        | string  | fallbackImage | Parameter to override fallback image with another url.                        |
| startInCenter        | boolean | false         | Flag to define whether or not the middle image will be the first displayed.   |
| showOpenDialogButton | boolean | true          | Flag to display button that swaps between reference and render images.        |
| rotateToIndex        | number  | undefined     | Rotates the sequence (reordering the scnes array) to a given index            |
| rotateToMiddle       | boolean | undefined     | Rotates the sequence (reordering the scnes array) to the center image index   |
