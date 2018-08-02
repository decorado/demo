# Decora Browser Lib UI

## New projects

### Use Sass

Add the schematics `"styleext": "scss"` to your angular.json file. Example:

```javascript
  ...
  "projects": {
    "decora-browser-auth-ui": {
      "root": "",
      "sourceRoot": "src",
      "projectType": "application",
      "prefix": "app",
      "schematics": {
        "@schematics/angular:component": {
          "styleext": "scss"
        }
      },
      ...
```

## Warning

## Always set the entire path to a `module/component/service`

Never use barel to import parts of the lib. This breaks the lib.

## Always use `./` in import paths

Never import with `../` this breaks the lib when used ouside demo.

## Don't use barels (`index.ts`) in libs

Never use barel in libs. This breaks the lib.

## Serving the demo using live-server

#### install liv-server if you do not have it already

`sudo npm i -g live-server`

#### serve the demo

`live-server /home/decora/projects/decora-ms/decora-browser-lib-ui/dist/decora-browser-lib-ui --entry-file=./index.html`

# Important!

## Colors

We have color classes to maintain a pattern accross the entire aplication.

Please, stick to this colors so we will have a more consisstent visual. Just use `.dec-color-*` `.dec-color-*-bg` clases or `$dec-color-*-bg` SASS constants;

