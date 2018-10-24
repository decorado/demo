import { Component, OnInit } from '@angular/core';
import { PRODUCT_INFO_PROPERTIES } from '@projects/decora/browser-lib-ui/src/public_api';

@Component({
  selector: 'app-decora-product-info-demo',
  templateUrl: './decora-product-info-demo.component.html',
  styleUrls: ['./decora-product-info-demo.component.scss']
})
export class DecoraProductInfoDemoComponent implements OnInit {

  visibleProductInfo = [
    PRODUCT_INFO_PROPERTIES.CATEGORY,
    PRODUCT_INFO_PROPERTIES.COMPANY_NAME,
    PRODUCT_INFO_PROPERTIES.NAME,
    PRODUCT_INFO_PROPERTIES.PROJECT_TITLE,
    PRODUCT_INFO_PROPERTIES.SKU,
    PRODUCT_INFO_PROPERTIES.MEASURES,
  ];

  product = {
    id: 4327,
    sku: '12341234',
    name: 'Coisa tal',
    company: {
      name: 'Company tal',
    },
    project: {
      title: 'Projeto tal',
      quote: 'Quota tal',
    },
    category: 'coisas',
    referenceCubeX: 234,
    referenceCubeY: 567,
    referenceCubeZ: 19,
  };

  constructor() { }

  ngOnInit() {
  }

}
