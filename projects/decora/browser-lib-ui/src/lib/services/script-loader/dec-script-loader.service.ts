import { Injectable } from '@angular/core';

window['decoraScriptService'] = window['decoraScriptService'] || {};

@Injectable({
  providedIn: 'root'
})
export class DecScriptLoaderService {

  constructor() { }

  load(url: string, scriptName: string) {

    return new Promise((resolve, reject) => {
      const scriptLoaded = window['decoraScriptService'][scriptName];

      if (scriptLoaded) {

        const script = window[scriptName];

        resolve(script);

      } else {

        const scriptTag = document.createElement('script');

        scriptTag.setAttribute('src', url);

        scriptTag.setAttribute('type', 'text/javascript');

        scriptTag.onload = function () {

          window['decoraScriptService'][scriptName] = true;

          const script = window[scriptName];

          resolve(script);

        };

        scriptTag.onerror = reject;

        document.getElementsByTagName('head')[0].appendChild(scriptTag);

      }

    });

  };

  loadStyle(url: string) {

    return new Promise((resolve, reject) => {

      window['scriptServiceLoadedStylesArray'] = window['scriptServiceLoadedStylesArray'] || {};

      const styleLoaded = window['scriptServiceLoadedStylesArray'][url];

      if (styleLoaded) {

        resolve();

      } else {

        const linkTag = document.createElement('link');

        linkTag.setAttribute('rel', 'stylesheet');
        linkTag.setAttribute('type', 'text/css');
        linkTag.setAttribute('media', 'all');
        linkTag.setAttribute('href', url);

        linkTag.onload = function () {

          window['scriptServiceLoadedStylesArray'][url] = true;

          resolve();

        };

        linkTag.onerror = reject;

        document.getElementsByTagName('head')[0].appendChild(linkTag);

      }

    });

  };

  loadStyleAndScript(styleUrl, scriptUrl, scriptNamespace) {

    return this.loadStyle(styleUrl).then(() => {
      return this.load(scriptUrl, scriptNamespace);
    });

  }

  loadLeafletScriptsAndStyle() {
    return this.loadStyle('https://unpkg.com/leaflet@1.3.3/dist/leaflet.css').then(() => {
      return this.loadStyle('http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css').then(() => {
        return this.loadStyle('https://cdn.jsdelivr.net/npm/leaflet-easybutton@2/src/easy-button.css').then(() => {
          return this.load('https://unpkg.com/leaflet@1.3.3/dist/leaflet.js', 'Leaflet').then(() => {
            return this.load('https://cdn.jsdelivr.net/npm/leaflet-easybutton@2/src/easy-button.js', 'EasyButton').then(() => {
              
            });
          });
        });
      });
    });
  }
}
