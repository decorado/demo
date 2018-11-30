import { Component, Input } from '@angular/core';
import { DecApiService } from './../../services/api/decora-api.service';

@Component({
  selector: 'dec-product-similar-models',
  templateUrl: './dec-product-similar-models.component.html',
  styleUrls: ['./dec-product-similar-models.component.scss']
})
export class DecProductSimilarModelsComponent {

  private _sku: string;
  public get sku(): string {
    return this._sku;
  }
  @Input()
  public set sku(v: string) {
    this._sku = v;
    this.getSimilarModels(v);
  }

  public similarModels: any[];

  constructor(private decApi: DecApiService) { }

  private async getSimilarModels(sku: string) {
    this.similarModels = await this.decApi.get(`/legacy/product/${sku}/similar`).toPromise();
  }
}
