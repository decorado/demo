import { Component } from '@angular/core';

@Component({
  selector: 'app-decora-fbx-qa',
  templateUrl: './decora-fbx-qa.component.html',
  styleUrls: ['./decora-fbx-qa.component.scss']
})
export class DecoraFbxQaComponent {

  public tagStructure: any;

  public updateTagStructure(tagStructure): void {
    this.tagStructure = tagStructure;
  }
}
