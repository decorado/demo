import { Component, Input } from '@angular/core';
import { objectKeysToCamelCase } from '../../utilities/object';
import { sortBy } from '../../utilities/array';

@Component({
  selector: 'dec-markdowns-mesh-qa',
  templateUrl: './dec-markdowns-mesh-qa.component.html',
  styleUrls: ['./dec-markdowns-mesh-qa.component.scss']
})
export class DecMarkdownsMeshQaComponent {

  public tags: any[] = [];

  private _mesh: any;
  public get mesh(): any {
    return this._mesh;
  }
  @Input()
  public set mesh(v: any) {
    if (this._mesh !== v) {
      this._mesh = objectKeysToCamelCase(v);

      this.tags = [];
      this.bindTags(this._mesh);
      this.orderTags();
    }
  }

  private bindTags(data): void {
    Object.keys(data).forEach(key => {
      if (Array.isArray(data[key])) {
        this.bindTags(data[key]);
      } else {
        this.tags.push(data[key]);
      }
    });
  }

  private orderTags() {
    let tagsWithoutP = this.tags.filter(tag => tag.reference !== 'P');
    tagsWithoutP = tagsWithoutP.map(tag => ({ ...tag, reference: +tag.reference })).sort(sortBy('reference'));

    const tagP = this.tags.filter(tag => tag.reference === 'P');

    this.tags = [...tagP, ...tagsWithoutP];
  }
}
