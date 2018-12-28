import { Component, ViewChild } from '@angular/core';
import { DecMeshQaComponent } from '@projects/decora/browser-lib-ui/src/lib/components/dec-mesh-qa/dec-mesh-qa.component';

@Component({
  selector: 'app-decora-fbx-qa',
  templateUrl: './decora-fbx-qa.component.html',
  styleUrls: ['./decora-fbx-qa.component.scss']
})
export class DecoraFbxQaComponent {

  public glb: any = { fileUrl: 'https://s3.amazonaws.com/decora-platform-1-nv/2018/12/4/5c06c48d18ab521c011158dc.glb' };

  public mesh: any;

  public editEnable = false;

  @ViewChild(DecMeshQaComponent) decMeshQaComponent: DecMeshQaComponent;

  public updateTagStructure(tagStructure): void {
    this.mesh = { ...tagStructure };
  }

  enableEdit(): void {
    this.decMeshQaComponent.EnableEdit(!this.editEnable);
    this.editEnable = !this.editEnable;
  }
}
