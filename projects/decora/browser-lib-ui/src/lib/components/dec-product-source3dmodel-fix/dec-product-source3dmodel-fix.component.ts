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

  constructor(private decApiService: DecApiService) {
    this.refType = 'reference';
  }

  public async populateSkuFix(id: string | number) {
    const endpoint = `/skufixes/${id}`;
    this.skuFix = await this.decApiService.get(endpoint).toPromise();
    this.contentDone = true;
  }

  public downloadMax(): void {
    window.open(this.product.max.fileUrl, '_blank');
  }

}
