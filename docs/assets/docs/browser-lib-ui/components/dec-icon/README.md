# Decora Icons

`import { DecIconModule } from '@decora/browser-lib-ui'`

This component is used to provide icons. We can choose between [Material Icons][mat-docs] and [Font Awesome][fa-docs];

## Instalation

### Install Material icons
`npm i material-design-icons`

### Install Font Awesome icons
`npm i font-awesome`


### Include the icons in your app
Include the [Material Icons][mat-docs] and [Font Awesome][fa-docs] in your `angular.json` styles;

```javascript
"styles": [
  ...
  "node_modules/material-design-icons/iconfont/material-icons.css",
  "node_modules/font-awesome/scss/font-awesome.scss",
  ...
],
```

## Usage

### Material icons

[Material Icons list][mat-docs]

```html
<dec-icon font="mat">home</dec-icon> Home icon
```

### Font Awesome icons

[Font Awesome Icons list][fa-docs]

```html
<dec-icon font="fas">home</dec-icon> Home icon
```

## Icon Size

The icon size is based ont the font size. If you need to have a different size, you just need to define the font-size for the dec-icon or create a class and use it in the dec-icon.

[mat-docs]: https://material.io/tools/icons
[fa-docs]: https://fontawesome.com/icons?d=gallery&m=free
