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

  constructor(private decApi: DecApiService) { }

  private async getProductColorVariationFather(productIdColorVariationFather: string) {
    this.productColorVariationFather = await this.decApi.get(`/legacy/product/${productIdColorVariationFather}`).toPromise();
    this.referencesSysFiles();
    this.getRendersColorVariationFather();
    this.measures = this.formatMeasures();
  }

  referencesSysFiles() {
    this.references = this.productColorVariationFather ? this.productColorVariationFather.referenceImages.map(images => {
      return {
        file: images.sysFile,
        tags: [],
        zoomAreas: []
      }
    }) : undefined;
  }

  getRendersColorVariationFather() {
    this.rendersColorVariationFather = this.productColorVariationFather ? this.productColorVariationFather.renderedImages.map(images => {
      return {
        file: images,
        tags: [],
        zoomAreas: []
      }
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
    }
  }

  public downloadMax(): void {
    window.open(this.productColorVariationFather.max.fileUrl, '_blank');
  }

}
