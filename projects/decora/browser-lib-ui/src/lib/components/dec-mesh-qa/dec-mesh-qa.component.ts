import { Component, ViewChild, ElementRef, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { TagWrapper, enumTagWrapperContext } from './dec-mesh-qa.models';
import { DecConfigurationService } from '../../services/configuration/configuration.service';
import { Guid } from '../../utilities/guid';
import { DecRenderCommentService } from '../dec-render-comment/dec-render-comment.service';

@Component({
  selector: 'dec-mesh-qa',
  templateUrl: './dec-mesh-qa.component.html',
  styleUrls: ['./dec-mesh-qa.component.scss']
})
export class DecMeshQaComponent {

  public uId = Guid.create();

  @Input()
  public isProfessional: boolean;

  @Input()
  public glb: any;

  @Input()
  public glbReadonly: boolean;

  @Input()
  public mesh: any;

  @ViewChild('iframeUnity') iframeUnity: ElementRef<HTMLIFrameElement>;

  @Output() updateTagStructure: EventEmitter<any> = new EventEmitter<any>();

  private _meshBase: any;

  public get meshUrl(): string {
    return `${this.decConfig.config.meshUrl}?uId=${this.uId}`;
  }

  constructor(public decConfig: DecConfigurationService, private decRenderCommentService: DecRenderCommentService) {
    this.getRenderfeedbacktree();
  }

  private async getRenderfeedbacktree() {
    const ErrorCode = await this.decRenderCommentService.getRenderfeedbacktreeOnlyEnglish(null);
    this._meshBase = { ErrorCode };
  }

  @HostListener('window:message', ['$event'])
  onMessage(event) {
    if (event.data.uId === this.iframeUnity.nativeElement.id) {
      this.ReceiveMessage(event);
    }
  }

  ReceiveMessage = (event: any) => {
    const { data } = event;

    switch (data.type) {
      case 'Ready':
        this.SetData();
        break;
      case 'SetTagStructure':
        this.SetTagStructure(data.payload);
        break;
      case 'AddTag':
        this.AddTag(data.payload);
        break;
      case 'EditTag':
        this.EditTag(data.payload);
        break;
      case 'RemoveTag':
        this.RemoveTag(data.payload);
        break;
      default:
        break;
    }
  }

  SetTagStructure = (tagStructureString: string): void => {
    this.mesh = JSON.parse(tagStructureString);
    this.updateTagStructure.emit(this.mesh);
  }

  AddTag = (tagWrapperString: string): void => {
    const tagWrapper: TagWrapper = JSON.parse(tagWrapperString);

    switch (tagWrapper.Context) {
      case enumTagWrapperContext.Wireframe:
      case enumTagWrapperContext.Matcap:
      case enumTagWrapperContext.Map:
        this.mesh[tagWrapper.Context][tagWrapper.Kit].push(tagWrapper.Tag);
        break;
      default:
        this.mesh[tagWrapper.Context][tagWrapper.Kit][tagWrapper.SubContext].push(tagWrapper.Tag);
        break;
    }

    this.updateTagStructure.emit(this.mesh);
  }

  EditTag = (tagWrapperString: string): void => {
    const tagWrapper: TagWrapper = JSON.parse(tagWrapperString);

    switch (tagWrapper.Context) {
      case enumTagWrapperContext.Wireframe:
      case enumTagWrapperContext.Matcap:
      case enumTagWrapperContext.Map:
        this.mesh[tagWrapper.Context][tagWrapper.Kit] =
          this.mesh[tagWrapper.Context][tagWrapper.Kit].map(tag => tag.Id === tagWrapper.Tag.Id ? tagWrapper.Tag : tag);
        break;
      default:
        this.mesh[tagWrapper.Context][tagWrapper.Kit][tagWrapper.SubContext] =
          this.mesh[tagWrapper.Context][tagWrapper.Kit][tagWrapper.SubContext].map(tag => tag.Id === tagWrapper.Tag.Id ? tagWrapper.Tag : tag);
        break;
    }

    this.updateTagStructure.emit(this.mesh);
  }

  RemoveTag = (tagWrapperString: string): void => {
    const tagWrapper: TagWrapper = JSON.parse(tagWrapperString);

    switch (tagWrapper.Context) {
      case enumTagWrapperContext.Wireframe:
      case enumTagWrapperContext.Matcap:
      case enumTagWrapperContext.Map:
        this.mesh[tagWrapper.Context][tagWrapper.Kit] =
          this.mesh[tagWrapper.Context][tagWrapper.Kit].filter(tag => tag.Id !== tagWrapper.Tag.Id);
        break;
      default:
        this.mesh[tagWrapper.Context][tagWrapper.Kit][tagWrapper.SubContext] =
          this.mesh[tagWrapper.Context][tagWrapper.Kit][tagWrapper.SubContext].filter(tag => tag.Id !== tagWrapper.Tag.Id);
        break;
    }

    this.updateTagStructure.emit(this.mesh);
  }

  //// Unity Functions
  SetData = (): void => {
    if (this.iframeUnity.nativeElement.contentWindow) {
      const model = this.glb.fileUrl.replace('http://', 'https://');
      // model = model.replace('https://s3.amazonaws.com/', 'http://sysfilecache.decoracontent.com:8081/');

      const tags = this.mesh || null;
      const editMode = this.glbReadonly ? false : !this.isProfessional;

      const fullMesh = { editMode, model, tags, ...this._meshBase };
      this.iframeUnity.nativeElement.contentWindow.postMessage({ type: 'SetData', payload: fullMesh }, '*');
    }
  }
  EnableEdit = (enable: boolean): void => {
    if (this.iframeUnity.nativeElement.contentWindow) {
      this.iframeUnity.nativeElement.contentWindow.postMessage({ type: 'EnableEdit', payload: enable }, '*');
    }
  }
  //// Unity Functions
}
