export type DecLanguageCode = 'pt-br' | 'en';

export type DecLanguage = 'PT_BR' | 'EN_US';

export class DecLaguageMap {
  code: DecLanguage;
  variations: string[] = [];
  decoraLanguageCode: DecLanguageCode;
}


export const LANGUAGES_MAP: { [key: string]: DecLaguageMap} = {
  PT_BR: {
    code: 'PT_BR',
    variations: ['pt', 'pt_br', 'pt-br', 'PT', 'PT_BR', 'PT-BR'],
    decoraLanguageCode: 'pt-br'
  },
  EN_US: {
    code: 'EN_US',
    variations: ['en', 'en_us', 'en-us', 'EN', 'EN_US', 'EN-US'],
    decoraLanguageCode: 'en'
  },
};
