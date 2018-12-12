import { Component, ViewChild, ElementRef, Input, Output, EventEmitter, AfterContentChecked } from '@angular/core';
import { TagWrapper, enumTagWrapperContext } from './dec-mesh-qa.models';
import { DecScriptLoaderService } from '../../services/script-loader/dec-script-loader.service';

declare const UnityLoader;

const baseUrlWebgl = 'http://arquivos.decora/fbx-qa/thiago/Build';

@Component({
  selector: 'dec-mesh-qa',
  templateUrl: './dec-mesh-qa.component.html',
  styleUrls: ['./dec-mesh-qa.component.scss']
})
export class DecMeshQaComponent implements AfterContentChecked {

  private uId = Math.floor(Math.random() * 6) + 1;
  private gameContainerId = `gameContainer${this.uId}`;

  private gameInstance: any;

  private _tagStructure: any;
  public get tagStructure(): any {
    return this._tagStructure;
  }
  @Input()
  public set tagStructure(v: any) {
    this._tagStructure = v;
  }

  @ViewChild('loader') loaderElement: ElementRef<HTMLDivElement>;
  @ViewChild('progress') progressElement: ElementRef<HTMLDivElement>;
  @ViewChild('progressBar') progressBarElement: ElementRef<HTMLDivElement>;

  @Output() updateTagStructure: EventEmitter<any> = new EventEmitter<any>();

  constructor(private decScriptLoaderService: DecScriptLoaderService) {
    window['unity'] = {
      SetTagStructure: this.SetTagStructure,
      AddTag: this.AddTag,
      EditTag: this.EditTag,
      RemoveTag: this.RemoveTag,
      Ready: this.Ready,
    };
  }

  ngAfterContentChecked() {
    const divGameContainer = document.querySelector(`#${this.gameContainerId}`);
    if (divGameContainer && !this.gameInstance) {
      this.init();
    }
  }

  public async init() {
    try {
      await this.decScriptLoaderService.load(`${baseUrlWebgl}/UnityLoader.js`, 'unityLoaderScript');

      this.gameInstance = UnityLoader.instantiate(this.gameContainerId, `${baseUrlWebgl}/webgl.json`, {
        onProgress: (gameInstance, progress) => {
          if (!gameInstance.Module) {
            return;
          }

          if (!gameInstance.progress) {
            this.progressElement.nativeElement.style.display = 'block';
            gameInstance.progress = this.progressBarElement.nativeElement;
          }

          gameInstance.progress.style.transform = `scaleX(${progress})`;

          if (progress === 1 && !gameInstance.removeTimeout) {
            gameInstance.removeTimeout = setTimeout(() => {
              this.loaderElement.nativeElement.style.display = 'none';
            }, 2e3);
          }

        },
      });
    } catch (error) {
      throw error;
    }
  }

  private SetTagStructure = (tagStructureString: string): void => {
    this.tagStructure = JSON.parse(tagStructureString);
    this.updateTagStructure.emit(this.tagStructure);
  }

  private AddTag = (tagWrapperString: string): void => {
    const tagWrapper: TagWrapper = JSON.parse(tagWrapperString);

    switch (tagWrapper.Context) {
      case enumTagWrapperContext.Wireframe:
      case enumTagWrapperContext.Matcap:
      case enumTagWrapperContext.Map:
        this.tagStructure[`${tagWrapper.Context}Tags`][tagWrapper.Kit].push(tagWrapper.Tag);
        break;
      default:
        this.tagStructure[`MaterialsTags`][tagWrapper.Kit][tagWrapper.SubContext].push(tagWrapper.Tag);
        break;
    }

    this.updateTagStructure.emit(this.tagStructure);
  }

  private EditTag = (tagWrapperString: string): void => {
    const tagWrapper: TagWrapper = JSON.parse(tagWrapperString);

    switch (tagWrapper.Context) {
      case enumTagWrapperContext.Wireframe:
      case enumTagWrapperContext.Matcap:
      case enumTagWrapperContext.Map:
        this.tagStructure[`${tagWrapper.Context}Tags`][tagWrapper.Kit] =
          this.tagStructure[`${tagWrapper.Context}Tags`][tagWrapper.Kit].map(tag => tag.Id === tagWrapper.Tag.Id ? tagWrapper.Tag : tag);
        break;
      default:
        this.tagStructure[`MaterialsTags`][tagWrapper.Kit][tagWrapper.SubContext] =
          this.tagStructure[`MaterialsTags`][tagWrapper.Kit][tagWrapper.SubContext].map(tag => tag.Id === tagWrapper.Tag.Id ? tagWrapper.Tag : tag);
        break;
    }

    this.updateTagStructure.emit(this.tagStructure);
  }

  private RemoveTag = (tagWrapperString: string): void => {
    const tagWrapper: TagWrapper = JSON.parse(tagWrapperString);

    switch (tagWrapper.Context) {
      case enumTagWrapperContext.Wireframe:
      case enumTagWrapperContext.Matcap:
      case enumTagWrapperContext.Map:
        this.tagStructure[`${tagWrapper.Context}Tags`][tagWrapper.Kit] =
          this.tagStructure[`${tagWrapper.Context}Tags`][tagWrapper.Kit].filter(tag => tag.Id !== tagWrapper.Tag.Id);
        break;
      default:
        this.tagStructure[`MaterialsTags`][tagWrapper.Kit][tagWrapper.SubContext] =
          this.tagStructure[`MaterialsTags`][tagWrapper.Kit][tagWrapper.SubContext].filter(tag => tag.Id !== tagWrapper.Tag.Id);
        break;
    }

    this.updateTagStructure.emit(this.tagStructure);
  }

  private Ready = (): void => console.log('<===Ready===>');

  public SentoToWebGL(): void {
    this.gameInstance.SendMessage('PageService', 'Test');
  }

}
