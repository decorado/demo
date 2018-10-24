import { QueryList } from '@angular/core';
import { DecProductInfoExtraComponent } from './dec-product-info-extra/dec-product-info-extra.component';
export declare enum PRODUCT_INFO_PROPERTIES {
    ID = "ID",
    SKU = "SKU",
    NAME = "NAME",
    COMPANY_NAME = "COMPANY_NAME",
    PROJECT_TITLE = "PROJECT_TITLE",
    PROJECT_QUOTE = "PROJECT_QUOTE",
    CATEGORY = "CATEGORY",
    MEASURES = "MEASURES",
}
export declare class DecProductInfoComponent {
    infoTypes: typeof PRODUCT_INFO_PROPERTIES;
    product: any;
    visibleInfo: string[];
    extraInfos: QueryList<DecProductInfoExtraComponent>;
    constructor();
    isVisible(info: string): boolean;
}
