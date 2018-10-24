# Dec Product Info Component

`import { DecProductInfoModule } from '@decora/browser-lib-ui';`

## Examples

```javascript
  import { PRODUCT_INFO_PROPERTIES } from '@decora/browser-lib-ui';

  ...

  product = {
    id: 4327,
    sku: '12341234',
    name: 'Coisa tal',
    company: {
      name: 'Company tal',
    },
    project: {
      title: 'Projeto tal',
      quote: 'Quota tal',
    },
    category: 'coisas',
    referenceCubeX: 234,
    referenceCubeY: 567,
    referenceCubeZ: 19,
  };

  visibleProductInfo = [
    PRODUCT_INFO_PROPERTIES.CATEGORY,
    PRODUCT_INFO_PROPERTIES.COMPANY_NAME,
    PRODUCT_INFO_PROPERTIES.NAME,
    PRODUCT_INFO_PROPERTIES.PROJECT_TITLE,
    PRODUCT_INFO_PROPERTIES.SKU,
    PRODUCT_INFO_PROPERTIES.MEASURES,
  ];
```

```html
 <dec-product-info [product]="product" [visibleInfo]="visibleProductInfo">
    <app-product-info-extra label="extra field">
      <div>custom html line 1</div>
      <div>custom html line 2</div>
      <div>custom html line 3</div>
    </app-product-info-extra>
 </dec-product-info>
```


# Default fields

```javascript
product.id
product.sku
product.name
product.company?.name
product.project?.title
product.project?.quote
product.category
product?.referenceCube[XYZ]
```
