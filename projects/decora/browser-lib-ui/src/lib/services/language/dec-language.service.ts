import { Injectable } from '@angular/core';
import { LANGUAGES_MAP, DecLaguageMap } from './dec-language.models';
import { BehaviorSubject } from 'rxjs';

const DEFAULT_LANGUAGE = 'en';

@Injectable()
export class DecLanguageService {

  lang$ = new BehaviorSubject<DecLaguageMap>(undefined);

  constructor() {

    this.detectLanguage();

  }

  setLanguage(langName: string) {

    const language: DecLaguageMap = this.getLanguageBasedOnVariation(langName) || LANGUAGES_MAP.EN_US;

    localStorage.setItem('localeId', language.code);

    this.lang$.next(language);

  }

  private getLanguageBasedOnVariation(variation): DecLaguageMap {

    const language = Object.keys(LANGUAGES_MAP)
      .map(langKey => LANGUAGES_MAP[langKey])
      .find(langMap => {
        const variations: string[] = langMap.variations;
        return variations.includes(variation);
      });

    return language;

  }

  private detectLanguage() {

    const lang = this.getLanguageInMemory();

    if (lang) {

      this.setLanguage(lang);

    } else {

      this.setDefaultLanguage();

    }
  }

  private setDefaultLanguage() {

    this.setLanguage(DEFAULT_LANGUAGE);

  }

  private getLanguageInMemory() {

    return localStorage.getItem('localeId') || undefined;

  }

}
