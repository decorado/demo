import { Component, Input } from '@angular/core';
import { DecApiService } from '../../services/api/decora-api.service';

@Component({
  selector: 'dec-product-source3dmodel-fix',
  templateUrl: './dec-product-source3dmodel-fix.component.html',
  styleUrls: ['./dec-product-source3dmodel-fix.component.scss']
})
export class DecProductSource3dmodelFixComponent {

  public refType: string;

  @Input()
  public get job(): any {
    return this._job;
  }
  public set job(v: any) {
    this._job = v;
    this.populateSkuFix(v.skuFixId);
  }
  private _job: any;

  @Input()
  public get product(): any {
    return this._product;
  }
  public set product(v: any) {
    this._product = v;
  }
  private _product: any;

  public skuFix: any;

  public contentDone: boolean;

  public renders: any;

  public references: any;

  public measures: any;

  constructor(private decApiService: DecApiService) {
    this.refType = 'reference';
  }

  public async populateSkuFix(id: string | number) {
    const endpoint = `/skufixes/${id}`;
    this.skuFix = await this.decApiService.get(endpoint).toPromise();
    this.contentDone = true;
    this.getReferences();
    this.getRenders();
    this.measures = this.formatMeasures();
  }

  public downloadMax(): void {
    window.open(this.product.max.fileUrl, '_blank');
  }


  private getReferences() {
    this.references = this.skuFix ? this.skuFix.product.referenceImages.map(images => {
      return {
        file: images,
        tags: [],
        zoomAreas: []
      }
    }) : undefined;
  }

  private getRenders() {
    this.renders = this.skuFix ? this.skuFix.product.renderedImages.map(images => {
      return {
        file: images,
        tags: [],
        zoomAreas: []
      }
    }) : undefined;
  }


  formatMeasures() {
    return {
      referenceCubeX: this.skuFix.product.referenceCubeX,
      referenceCubeY: this.skuFix.product.referenceCubeY,
      referenceCubeZ: this.skuFix.product.referenceCubeZ,
      modelCubeX: this.skuFix.product.modelCubeX,
      modelCubeY: this.skuFix.product.modelCubeY,
      modelCubeZ: this.skuFix.product.modelCubeZ,
    }
  }
}
