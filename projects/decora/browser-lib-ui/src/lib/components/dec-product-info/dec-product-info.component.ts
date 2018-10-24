import { Component, Input, ContentChildren, QueryList } from '@angular/core';
import { DecProductInfoExtraComponent } from './dec-product-info-extra/dec-product-info-extra.component';

export enum PRODUCT_INFO_PROPERTIES {
  ID = 'ID',
  SKU = 'SKU',
  NAME = 'NAME',
  COMPANY_NAME = 'COMPANY_NAME',
  PROJECT_TITLE = 'PROJECT_TITLE',
  PROJECT_QUOTE = 'PROJECT_QUOTE',
  CATEGORY = 'CATEGORY',
  MEASURES = 'MEASURES'
}

@Component({
  selector: 'dec-product-info',
  templateUrl: './dec-product-info.component.html',
  styleUrls: ['./dec-product-info.component.scss']
})
export class DecProductInfoComponent {

  infoTypes = PRODUCT_INFO_PROPERTIES;

  @Input() product;

  @Input() visibleInfo: string[] = [];

  @ContentChildren(DecProductInfoExtraComponent) extraInfos: QueryList<DecProductInfoExtraComponent> = new QueryList<DecProductInfoExtraComponent>();

  constructor() { }

  isVisible(info: string) {
    return this.visibleInfo.indexOf(info) > -1;
  }

}
