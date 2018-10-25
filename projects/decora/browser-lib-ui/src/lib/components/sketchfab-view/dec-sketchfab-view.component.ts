import { Component, OnInit, Input, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { DecScriptLoaderService } from './../../services/script-loader/dec-script-loader.service';
import { DecColorService } from './../../services/color/dec-color.service';

const HIGHLIGHT_COLOR = [255, 255, 0];
const SKETCHFAB_SCRIPT_URL = 'https://static.sketchfab.com/api/sketchfab-viewer-1.0.0.js';

@Component({
  selector: 'dec-sketchfab-view',
  templateUrl: './dec-sketchfab-view.component.html',
  styleUrls: ['./dec-sketchfab-view.component.css']
})
export class DecSketchfabViewComponent implements OnInit {

  api: any;

  materials;

  @Input()
  set sketchfabId(id) {
    if (id) {
      this._sketchfabId = id;
      this.startSketchfab(id);
    }
  }

  get sketchfabId() {
    return this._sketchfabId;
  }

  @Input()
  set materialName(v) {
    if (v && this._materialName !== v) {
      this._materialName = v;
      const material = this.selectMaterialByName(v, true);
    }
  }

  get materialName() {
    return this._materialName;
  }

  @Input()
  set material (v) {
    if (v && this.update) {
      this.updateMaterials(v);
    }
  }

  @Input()
  set editMode(v) {
    if (v) {
      this.addClickEvent();
      this._editMode = v;
    }
  }

  get editMode() {
    return this._editMode;
  }

  @Input()
  set getAllMaterials(v) {
    if (v) {
      this._getAllMaterials = v;
      this.sendAllMaterials();
    }
  }

  get getAllMaterials() {
    return this._getAllMaterials;
  }

  @Input() highlightOnSelection: boolean;

  @Input() update: any;

  @Input() textures: any;

  @Output() materialSelected = new EventEmitter();

  @Output() materialUnselected = new EventEmitter();

  @Output() sendMaterials = new EventEmitter();

  @Output() loaded = new EventEmitter();


  private _sketchfabId: string;
  private _materialName: string;
  private _editMode: boolean;
  private _getAllMaterials: boolean;
  private client;
  private highlightedMaterial;

  @ViewChild('apiFrame') apiFrame: ElementRef;

  constructor(
    private decScriptLoaderService: DecScriptLoaderService,
    private decColorService: DecColorService,
  ) { }

  ngOnInit() {
  }

  startSketchfab(id) {
    this.decScriptLoaderService.load(SKETCHFAB_SCRIPT_URL, 'Sketchfab')
      .then((Sketchfab: any) => {
        const iframe = this.apiFrame.nativeElement;
        this.client = new Sketchfab('1.0.0', iframe);
        this.client.init(this.sketchfabId, {
          success: (api) => {
            api.start();
            this.api = api;
            api.addEventListener('viewerready', () => {
              console.log('--- SKETCHFAB  viewerready');
              this.getMaterials()
              .then(materials => {
                this.loaded.emit();
              });
              if (this.editMode) {
                this.addClickEvent();
              }
            });
          }
        });
      });
  }

  updateMaterials(material) {

    this.api.setMaterial(material, (resColor) => {

      console.log('--- SKETCHFAB  COLOR SET', resColor);

    });

  }

  getMaterials() {
    return new Promise((resolve, reject) => {
      this.api.getMaterialList((err, materialList) => {
        this.materials = materialList;
        resolve(materialList);
      });
    });
  }


  selectMaterialByName(name, emit = false) {

    const material = this.materials.find(m => m.name === name);

    if (this.highlightOnSelection) {

      this.highlightMaterial(material);

    }


    if (emit) {
      this.materialSelected.emit(material);
    }

    return material;
  }

  addClickEvent() {
    if (this.api) {
      this.api.addEventListener('click', (e) => {
        this._materialName = e.material.name;
        this.selectEffect(e.material);
        this.selectMaterialByName(e.material.name, true);
      });
    }
  }

  selectEffect(material) {
    material.shadeless = true;
    if (material.channels.NormalMap.factor === 1 || material.channels.NormalMap.enable) {
      material.channels.NormalMap.factor = 1;
    }
    this.api.setMaterial(material, function () {
      setTimeout(() => {
        material.shadeless = false;
      }, 500);

    });
  }

  sendAllMaterials() {
    this.api.getMaterialList((err, materialList) => {
      this.sendMaterials.emit(materialList);
    });
  }

  setMaterialColor(material, color) {
    const Albedo = material.channels.AlbedoPBR;
    this.setChannelColor(Albedo, color);
    delete Albedo.texture;
    this.api.setMaterial(material, (response) => {
      console.log(`MATERIAL COLOR SET TO ${color}`);
    });
  }

  setMaterialRoughness(material, factor) {
    const Roughness = material.channels.RoughnessPBR;
    Roughness.factor = factor;
    this.api.setMaterial(material, (response) => {
      console.log(`MATERIAL ROUGHNESS SET TO ${factor}`);
    });
  }

  setMaterialMetalness(material, factor) {
    const Metalness = material.channels.MetalnessPBR;
    Metalness.factor = factor;
    this.api.setMaterial(material, (response) => {
      console.log(`MATERIAL METALNESS SET TO ${factor}`);
    });
  }

  setMaterialAlbedoPBRTexture(material, texture) {
    const Albedo = material.channels.AlbedoPBR;
    Albedo.texture = texture;
    delete Albedo.color;
    this.api.setMaterial(material, (response) => {
      console.log(`MATERIAL TEXTURE SET TO ${texture}`);
    });
  }

  private setChannelColor(channel, rgbArray) {
    channel.color = this.decColorService.rgbArrayToLinearArray(rgbArray);
  }

  private unhigHlightCurrentMaterial() {

    const linearHitghlightColor = this.decColorService.rgbArrayToLinearArray(HIGHLIGHT_COLOR);

    const material = this.materials.find(mat => mat.name === this.highlightedMaterial.name);

    const materialColor = material.channels.AlbedoPBR.color;

    if (JSON.stringify(materialColor) === JSON.stringify(linearHitghlightColor)) {

      const texture = JSON.parse(JSON.stringify(this.highlightedMaterial.channels.AlbedoPBR.texture));

      this.setMaterialAlbedoPBRTexture(material, texture);

    }

  }

  private highlightMaterial(material) {

    const materialCopy = JSON.parse(JSON.stringify(material));

    if (!this.highlightedMaterial) {

      this.highlightedMaterial = materialCopy;

      this.setMaterialColor(material, HIGHLIGHT_COLOR);

    } else {

      if (this.highlightedMaterial.name !== material.name) {

        this.unhigHlightCurrentMaterial();

        this.highlightedMaterial = materialCopy;

        this.setMaterialColor(material, HIGHLIGHT_COLOR);

      } else {

        this.unhigHlightCurrentMaterial();

        this.highlightedMaterial = undefined;

        this.materialUnselected.emit();

      }

    }

  }

}
