import { Component, OnInit, Input, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { DecScriptLoaderService } from './../../services/script-loader/dec-script-loader.service';

const SKETCHFAB_SCRIPT_URL = 'https://static.sketchfab.com/api/sketchfab-viewer-1.0.0.js';

@Component({
  selector: 'dec-sketchfab-view',
  templateUrl: './dec-sketchfab-view.component.html',
  styleUrls: ['./dec-sketchfab-view.component.css']
})
export class DecSketchfabViewComponent implements OnInit {

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
  set configs(v) {
    if (v) {
      this._configs = v;
    }
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
  set material (v){
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

  @Input() update: any;

  @Input() textures: any;

  @Output() materialSelected = new EventEmitter();

  @Output() sendMaterials = new EventEmitter();

  private _sketchfabId: string;
  private _configs: any;
  private _materialName: string;
  private _editMode: boolean;
  private _getAllMaterials: boolean;
  private channels: any;
  private api: any;
  private materials;

  @ViewChild('apiFrame') apiFrame: ElementRef;

  constructor(private decScriptLoaderService: DecScriptLoaderService) { }

  ngOnInit() {
  }

  startSketchfab(id) {
    this.decScriptLoaderService.load(SKETCHFAB_SCRIPT_URL, 'Sketchfab')
      .then((Sketchfab: any) => {
        const iframe = this.apiFrame.nativeElement;
        const client = new Sketchfab('1.0.0', iframe);
        client.init(this.sketchfabId, {
          success: (api) => {
            api.start();
            this.api = api;
            api.addEventListener('viewerready', () => {
              this.getMaterials();
              if(this.editMode) {
                this.addClickEvent();
              }
            });
          }
        });
      });
  }

  updateMaterials(material) {
    this.api.setMaterial(material, () => {
      // console.log(`Material ${material.name} Updated`);
    });
  }

  getMaterials() {
    this.api.getMaterialList((err, materialList) => {
      this.materials = materialList;
    })
  }


  selectMaterialByName(name, emit) {
    const material = this.materials.find(m => m.name === name);
    if(emit) {
      this.materialSelected.emit(material);
    }
    return material;
  }

  addClickEvent() {
    if (this.api) {
      console.log('add event listener');
      this.api.addEventListener('click', (e) => {
        this._materialName = e.material.name;
        this.selectEffect(e.material);
        this.selectMaterialByName(e.material.name, true);
      }); 
    }
  }

  selectEffect(material) {
    material.shadeless = true;
    this.api.setMaterial(material, () => {
      setTimeout(() => {
        material.shadeless = false;
        this.api.setMaterial(material, () => {
        });
      }, 200);
    });
  }

  sendAllMaterials() {
    this.api.getMaterialList((err, materialList) => {
      this.sendMaterials.emit(materialList);
    })
  }
}
