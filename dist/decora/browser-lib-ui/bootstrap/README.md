# Decora Bootstrap

This is a collection of css classes, mixin and functions to use accross Decorado apps.

To install this lib you have to do some changes in your `angular.json` and `style.scss` or `style.sscss` files.

## Instaling the fonts


```javascript
  npm i roboto-fontface
```

## Configuring `angular.json`

this configuration should be placed in `build` and `test` configurations.

### Adding font
```javascript
  ...
  "assets": [
    "src/favicon.ico",
    "src/assets",
    {
      "glob": "Roboto-Medium.*",
      "input": "node_modules/roboto-fontface/fonts/roboto",
      "output": "assets/fonts/Roboto/Medium"
    },
    {
      "glob": "Roboto-Regular.*",
      "input": "node_modules/roboto-fontface/fonts/roboto",
      "output": "assets/fonts/Roboto/Regular"
    },
    ...
  ]
  ...
```

### Adding icons
```javascript
  ...
  "styles": [
    "src/styles.scss",
    "node_modules/material-design-icons/iconfont/material-icons.css",
  ],
  ...
```

## Configuring `style.scss` or `style.sscss`

## Installing global css styles
```css
@import './../dist/decora/browser-lib-ui/bootstrap/decora_bootstrap';
```

#### Loading decora theming
```css
@import './../dist/decora/browser-lib-ui/bootstrap/third-party/material/theming';
```


## Using theme color variables and classes

```css
@import '~@decora/bootstrap/appearance/font-colors.scss';

h3 {
  color: $accent-color;
}
```

```html
<h3 class="accent-color"></h3>
```

## Using theme color variables

```css
@import '~@decora/bootstrap/appearance/font-colors.scss';

h3 {
  color: $accent-color;
}
```
