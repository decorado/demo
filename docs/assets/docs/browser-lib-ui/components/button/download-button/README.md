# Dec Download Button

`import { DecDownloadButton } from '@decora/browser-lib-ui';`

## Examples

It is possible to use this component with its minimum configuration by providing only an URL as input for it like in the example below:
```html
  <dec-download-button url="http://homepages.inf.ed.ac.uk/neilb/TestWordDoc.doc">
  </dec-download-button>
```

It is also possible to provide a custom text to be shown inside the button instead of the default "Download" text.
```html
  <dec-download-button url="http://homepages.inf.ed.ac.uk/neilb/TestWordDoc.doc">
    <span #buttonText>Sample .DOC</span>
  </dec-download-button>
```
  