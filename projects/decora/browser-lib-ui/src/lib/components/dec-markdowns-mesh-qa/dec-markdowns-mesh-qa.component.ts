import { Component, Input } from '@angular/core';

@Component({
  selector: 'dec-markdowns-mesh-qa',
  templateUrl: './dec-markdowns-mesh-qa.component.html',
  styleUrls: ['./dec-markdowns-mesh-qa.component.scss']
})
export class DecMarkdownsMeshQaComponent {

  @Input()
  public tagStructure: any;

  public showKitMaterials = (kit: any): boolean => kit.some(item => item.length > 0);
}
