import {Inject} from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {MissingTranslationHandler, MissingTranslationHandlerParams} from '@ngx-translate/core';
import {environment} from '@env/environment';
import { map } from 'rxjs/operators';

export class DecoraMissingTranslationHandler implements MissingTranslationHandler {

  isTranslationError: boolean;

  constructor(@Inject(HttpClient) private http: HttpClient) {
  }

  handle(params: MissingTranslationHandlerParams) {
    const message = this.getMessage(params);
    this.checkKey(params.key);
    this.postLog(`ERROR`, window.location.href, message);

    return params.key;
  }


  postLog(level: string, component: string, message: String) {

    if (!this.isTranslationError) {
      return;
    }

    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const options = {headers: headers, withCredentials: true};
    const body = {level: level, component: component, message: message};
    this.http
      .post(`${environment.active.api}/log`, body, options)
      .pipe(
        map(data => data)
      )
      .subscribe();
  }

  getMessage(params) {
    const currentLang = params.translateService.store.currentLang;
    const langTree = params.translateService.store.translations[currentLang];
    const logHead = langTree ? this.message_head(params.key) : this.message_no_file_head(params.key);

    const userAgent = window.navigator.userAgent;
    const nav = this.getBrowser(userAgent);

    const navMessage = `${logHead}. ${this.message_nav_info(nav)}. ${this.message_end()}`;
    const userAgentMessage = `${logHead}. ${this.message_nav_info(userAgent)}.`;

    return nav ? navMessage : userAgentMessage;
  }

  getBrowser(nav: string) {
    if (nav.indexOf('Firefox') !== -1) {
      const fireIndex = nav.indexOf('Firefox');
      const parsed = nav.substring(fireIndex + 8, nav.length);
      return `Firefox/${parsed}`;
    }

    if (nav.indexOf('Chrome') !== -1 && nav.indexOf('Chromium') !== -1) {
      const subUserAgent = nav.substring(nav.length, nav.indexOf('Chrome') + 7);
      const index = subUserAgent.split('.', 2).join('.').length;
      const parsed = subUserAgent.substring(0, nav.indexOf('.', index + 1));
      return `Chrome/${parsed}`;
    }

    // TODO: More precise version.
    if (nav.indexOf('Safari') !== -1 && nav.indexOf('Version') !== -1) {
      const versionIndex = nav.indexOf('Version');
      const parsed = parseInt(nav.substring(versionIndex + 8, nav.indexOf('.', versionIndex)), 10);
      return `Safari/${parsed}`;
    }

  }

  checkKey(key: string) {
    const keyArr = key.split('.');
    this.isTranslationError = keyArr[0] !== 'notification';
  }

  message_head(key) {
    return `Erro de tradução. Não foi possível achar a string para: ${key}`;
  }

  message_no_file_head(key) {
    return `Erro de tradução. Não foi possível achar a string para: ${key}. Arquivo de tradução indisponível`;
  }

  message_end() {
    return `Certifique-se que o identificador esteja presente nos arquivos de mensagens em inglês e português ( messages.en.json, messages.pt-br.json).`;
  }

  message_nav_info(nav) {
    return `Navegador: ${nav}`;
  }

}
