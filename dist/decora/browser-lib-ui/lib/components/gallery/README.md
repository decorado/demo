# Decora Gallery

`import { DecGallery } from '@decora/browser-lib-ui'`


## Examples

```javascript
  images = [
    {
      'id': '5accff2ce35ccc568cdb0335',
      'extension': 'jpg',
      'size': 37602,
      'originalName': '5accff2ce35ccc568cdb03345482632910720075187.jpg',
      'fileBasePath': '2018/4/10/5accff2ce35ccc568cdb0335.jpg',
      'fileBaseUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/4/10/5accff2ce35ccc568cdb0335',
      'fileUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/4/10/5accff2ce35ccc568cdb0335.jpg'
    },
    {
      'id': '5accff2be35ccc568cdb032e',
      'extension': 'jpg',
      'size': 118157,
      'originalName': '5accff2be35ccc568cdb032d6178558494571498022.jpg',
      'fileBasePath': '2018/4/10/5accff2be35ccc568cdb032e.jpg',
      'fileBaseUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/4/10/5accff2be35ccc568cdb032e',
      'fileUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/4/10/5accff2be35ccc568cdb032e.jpg'
    }
  ]
```

```html
<dec-gallery [images]="images"></dec-gallery>
```
