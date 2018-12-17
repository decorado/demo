import { Component, Input } from '@angular/core';

@Component({
  selector: 'dec-markdowns-mesh-qa',
  templateUrl: './dec-markdowns-mesh-qa.component.html',
  styleUrls: ['./dec-markdowns-mesh-qa.component.scss']
})
export class DecMarkdownsMeshQaComponent {

  private _mesh: any;
  public get mesh(): any {
    return this._mesh;
  }
  @Input()
  public set mesh(v: any) {
    if (this._mesh !== v) {
      this._mesh = v;

      this.tags = [];
      this.bindTags(this._mesh);
      this.tags = this.tags.sort(this.sortBy('Reference'));
      this.tags = this.tags.sort(this.sortBy('reference'));
    }
  }

  public tags: any[] = [];

  private bindTags(data): void {
    Object.keys(data).forEach(key => {
      if (Array.isArray(data[key])) {
        this.bindTags(data[key]);
      } else {
        this.tags.push(data[key]);
      }
    });
  }

  private sortBy = (key) => {
    return (a, b) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0);
  }
}
