# Decora Browser Lib UI

This app contains all necessary data to help Decora Front-end Developers in their work.

It has demos and docs of custom components and guides of best practices and patterns.

We use [Markdown] to write the docs. You can learn more about Markdown in the [MarkdownGuide].

[Markdown]: https://www.markdownguide.org
[MarkdownGuide]: https://www.markdownguide.org/basic-syntax

# Installing and preparing your app

## From outside `decora-ms` project

```javascript
npm i @decora/browser-lib-ui
```

## From inside `decora-ms` project

```javascript
npm i ./../decora-browser-lib-ui/dist/decora/browser-lib-ui/
```

## Install the font

First: install the font in your app
```javascript
npm i roboto-fontface
```

Second: configure your `angular.json` to load the fonts

```javascript
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
  }
  ...
]
```

Third: apply the font to your `style.scss` file:

```css
@import './../dist/decora/browser-lib-ui/bootstrap/decora_bootstrap';
```

## Install the icons

Firs: install the icons

```jsvascript
npm i material-design-icons
```

Second:  configure your `angular.json` to load the icons

```javascript
  "styles": [
    "src/styles.scss",
    "node_modules/material-design-icons/iconfont/material-icons.css",
    ...
  ]
```

## Apply the Decora Theme

In your `style.scss` add the folowing line

```css
@import './../dist/decora/browser-lib-ui/bootstrap/third-party/material/theming';
```

## Add paths

In your `tsfongi.json` add the folowing paths

```javascript
  "paths": {
    "@app/*": [
      "src/app/*"
    ],
    "@assets/*": [
      "src/assets/*"
    ],
    "@env/*": [
      "src/environments/*"
    ],
    ...
  }
```

## Style-guide

Please follow our [Style Guide] to delivery the best software for clients and developers.

[Style-guide]: ./patterns/style-guide


## Criando componentes

Sempr euse o Angular cli para gerar as partes do sistema.

Basicamente, da sequinte forma:

```shell
  Página
  - ng g m pages/product/assets/pbr/pbr-create --routing
  - ng g c pages/product/assets/pbr/pbr-create

  Shared Component
  - ng g m shared/components/pbr/pbr-upsert
  - ng g c shared/components/pbr/pbr-upsert --export
```
