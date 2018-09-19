import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class DecLoaderService {

  constructor(private translateService: TranslateService) { }

  // FIX ME: Paleativo ate o componente dec-loader ser criado
  addBlockerBackground(message, duration?) {
    
    const existLoader = document.getElementById('blockerContentLoading');
    if (existLoader) {
      return;
    }

    const loading = document.createElement('div');
    loading.id = 'blockerContentLoading';
    loading.style.position = 'absolute';
    loading.style.top = '0';
    loading.style.left = '0';
    loading.style.backgroundColor = 'rgba(0,0,0,0.3)';
    loading.style.width = '100%';
    loading.style.height = '100%';
    loading.style.zIndex = '9999';
    loading.style.display = 'flex';
    loading.style.justifyContent = 'center';
    loading.style.alignItems = 'center';
    loading.style.flexDirection = 'column-reverse';
    const description = document.createElement('h1');
    description.innerText = this.translateService.instant(message);
    loading.appendChild(description);
    const spinner = document.createElement('span');
    spinner.style.width = '4rem';
    spinner.style.height = '4rem';
    spinner.style.borderTopColor = '#444';
    spinner.style.borderLeftColor = '#444';
    spinner.style.borderBottomColor = 'transparent';
    spinner.style.borderRightColor = 'transparent';
    spinner.style.borderStyle = 'solid';
    spinner.style.borderWidth = '12px';
    spinner.style.borderRadius = '50%';
    spinner.style.animation = 'spinIt 1000ms infinite ease-in-out';
    loading.appendChild(spinner);
    document.body.appendChild(loading);
    const style = document.createElement('style');
    style.type = 'text/css';
    const keyFrames = '\
    @-webkit-keyframes spinIt {\
        100% {\
            -webkit-transform: rotate(A_DYNAMIC_VALUE);\
        }\
    }\
    @-moz-keyframes spinIt {\
        100% {\
            -webkit-transform: rotate(A_DYNAMIC_VALUE);\
        }\
    }';
    style.innerHTML = keyFrames.replace(/A_DYNAMIC_VALUE/g, '360deg');
    loading.appendChild(style);

    if (duration) {
      setTimeout(() => {
        this.removeBlockerBackground();
      }, duration)
    }
  }

  // FIX ME: Paleativo ate o componente dec-loader ser criado
  removeBlockerBackground() {
    document.getElementById('blockerContentLoading').remove();
  }
}
