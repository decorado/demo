# Dec Grid

`import { DecGridModule } from '@decora/browser-lib-ui'`

This component is used to arrange the content in the view. It is composed by 12 columns with a 24px gap batween them by default.

# Example

```html
  <dec-grid gap="0">
    <dec-grid-row>
      <dec-grid-column span="2">Coluna 1-2</dec-grid-column>
      <dec-grid-column span="3">Coluna 3-5</dec-grid-column>
      <dec-grid-column>Coluna 6</dec-grid-column>
      <dec-grid-column span="6">Coluna 7-12</dec-grid-column>
    </dec-grid-row>
    <dec-grid-row>
      <dec-grid-column span="2">Coluna 1-2</dec-grid-column>
      <dec-grid-column span="3">Coluna 3-5</dec-grid-column>
      <dec-grid-column>Coluna 6</dec-grid-column>
      <dec-grid-column span="6">
        <dec-grid-row>
          <dec-grid-column span="2">Coluna 1-2</dec-grid-column>
          <dec-grid-column span="3">Coluna 3-5</dec-grid-column>
          <dec-grid-column>Coluna 6</dec-grid-column>
          <dec-grid-column span="6">Coluna 7-12</dec-grid-column>
        </dec-grid-row>
        <dec-grid-row>linha 2</dec-grid-row>
      </dec-grid-column>
    </dec-grid-row>
  </dec-grid>
```
