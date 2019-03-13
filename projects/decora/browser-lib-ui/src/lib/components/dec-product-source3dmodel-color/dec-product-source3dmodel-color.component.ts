import { DecApiService } from './../../services/api/decora-api.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'dec-product-source3dmodel-color',
  templateUrl: './dec-product-source3dmodel-color.component.html',
  styleUrls: ['./dec-product-source3dmodel-color.component.scss']
})
export class DecProductSource3dmodelColorComponent {

  @Input()
  public set product(v: any) {
    if (this._product !== v) {
      this._product = v;
      this.getProductColorVariationFather(v.productIdColorVariationFather);
      this.getSimilarProducts(v.productIdColorVariationFather);
    }
  }

  public get product(): any {
    return this._product;
  }

  public set productColorVariationFather(v: any) {
    this._productColorVariationFather = v;
  }

  public get productColorVariationFather(): any {
    return this._productColorVariationFather;
  }

  measures;
  references;
  rendersColorVariationFather;

  private _product: any;
  private _productColorVariationFather: any;
  private _similarProducts: any[];

  public get similarProducts(): any[] {
    return this._similarProducts;
  }
  public set similarProducts(v: any[]) {
    this._similarProducts = v;
  }

  constructor(private decApi: DecApiService) { }

  private async getProductColorVariationFather(productIdColorVariationFather: string) {
    this.productColorVariationFather = await this.decApi.get(`/legacy/product/${productIdColorVariationFather}`).toPromise();
    this.referencesSysFiles();
    this.getRendersColorVariationFather();
    this.measures = this.formatMeasures();
  }

  private async getSimilarProducts(productIdColorVariationFather: string) {
    this.similarProducts = await this.decApi.get(`/legacy/product/${productIdColorVariationFather}/colorVariation`).toPromise();
  }

  referencesSysFiles() {
    this.references = this.productColorVariationFather ? this.productColorVariationFather.referenceImages.map(referenceImage => {
      return {
        file: referenceImage.sysFile || referenceImage,
        tags: [],
        zoomAreas: []
      };
    }) : undefined;
  }

  getRendersColorVariationFather() {
    this.rendersColorVariationFather = this.productColorVariationFather ? this.productColorVariationFather.renderedImages.map(images => {
      return {
        file: images,
        tags: [],
        zoomAreas: []
      };
    }) : undefined;
  }

  formatMeasures() {
    return {
      referenceCubeX: this.productColorVariationFather.referenceCubeX,
      referenceCubeY: this.productColorVariationFather.referenceCubeY,
      referenceCubeZ: this.productColorVariationFather.referenceCubeZ,
      modelCubeX: this.productColorVariationFather.modelCubeX,
      modelCubeY: this.productColorVariationFather.modelCubeY,
      modelCubeZ: this.productColorVariationFather.modelCubeZ,
    };
  }

  public downloadMax(): void {
    window.open(this.productColorVariationFather.max.fileUrl, '_blank');
  }

}
