import { Component, Input } from '@angular/core';

@Component({
  selector: 'dec-card-similar-product',
  templateUrl: './dec-card-similar-product.component.html',
  styleUrls: ['./dec-card-similar-product.component.scss']
})
export class DecCardSimilarProductComponent {

  private _product: any;
  public get product(): any {
    return this._product;
  }
  @Input()
  public set product(v: any) {
    this._product = v;
  }

  public download(url: string): void {
    window.open(url, '_blank');
  }

}
