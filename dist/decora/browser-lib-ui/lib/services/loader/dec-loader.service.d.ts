import { TranslateService } from '@ngx-translate/core';
export declare class DecLoaderService {
    private translateService;
    constructor(translateService: TranslateService);
    addBlockerBackground(message: any, duration?: any): void;
    removeBlockerBackground(): void;
}
