import { DecApiService } from './../../services/api/decora-api.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'dec-product-source3dmodel-color',
  templateUrl: './dec-product-source3dmodel-color.component.html',
  styleUrls: ['./dec-product-source3dmodel-color.component.scss']
})
export class DecProductSource3dmodelColorComponent {

  private _product: any;
  public get product(): any {
    return this._product;
  }
  @Input()
  public set product(v: any) {
    if (this._product !== v) {
      this._product = v;
      this.getProductColorVariationFather(v.productIdColorVariationFather);
    }
  }

  private _productColorVariationFather: any;
  public get productColorVariationFather(): any {
    return this._productColorVariationFather;
  }
  public set productColorVariationFather(v: any) {
    this._productColorVariationFather = v;
  }

  constructor(private decApi: DecApiService) { }

  private async getProductColorVariationFather(productIdColorVariationFather: string) {
    this.productColorVariationFather = await this.decApi.get(`/legacy/product/${productIdColorVariationFather}`).toPromise();
  }

  get referencesSysFiles() {
    return this.productColorVariationFather ? this.productColorVariationFather.referenceImages.map(images => images.sysFile) : undefined;
  }

  public downloadMax(): void {
    window.open(this.productColorVariationFather.max.fileUrl, '_blank');
  }

}
