import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DecSketchfabService } from './dec-sketchfab.service';

@Component({
  selector: 'dec-sketchfab',
  templateUrl: './dec-sketchfab.component.html',
  styleUrls: ['./dec-sketchfab.component.scss']
})
export class DecSketchfabComponent implements OnInit {

  @Input()
  set assetMax(v: any) {
    if (v) {
      this._assetMax = v;
      this.environmentConfig(v.fbxFiles.fbxAllGroupsFile.sketchfabId);
      this.getMaterials(v.renderMaterialConfigs);
    }
  }

  get assetMax(): any {
    return this._assetMax;
  }

  @Output() save = new EventEmitter();

  _assetMax: any;
  sketchfabId: string;

  material: any;
  materialConfig: any;
  materialName: string;
  materials: any;
  textures: any;
  editMode = true;
  update = false;
  getMaterialsSketchfab = false;

  align: 'start';
  checked = true;

  configSelect = [
    'OFF',
    'LOW',
    'MEDIUM',
    'HIGH'
  ];

  constructor(private decSketchfabService: DecSketchfabService) { }

  ngOnInit() {
  }

  environmentConfig(id) {
    const config = {
      "options": {
        "version": 7,
        "background": {
          "enable": "ambient",
          "uid": "51af6a870cce449eb75b0345feebaebb",
          "color": [
            0.2,
            0.2,
            0.2
          ]
        },
        "environment": {
          "enable": true,
          "backgroundExposure": 1,
          "exposure": 2.200000000000001,
          "rotation": 4.71238898038469,
          "uid": "8a4074ac8a3a4b83bf1f6a177a0f9a34",
          "blur": 0.1,
          "shadowEnable": false,
          "lightIntensity": 5,
          "shadowBias": 0.005
        },
        "lighting": {
          "enable": false,
          "lights": [
            {
              "type": "DIRECTION",
              "enable": true,
              "color": [
                0.7806122449,
                0.7985214494,
                1
              ],
              "intensity": 0.96,
              "ground": [
                0.3,
                0.2,
                0.2
              ],
              "intensityGround": 1,
              "matrix": [
                -0.98158045,
                0.1909922167,
                -0.0046683273,
                0,
                0.135483471,
                0.7131126062,
                0.6878332937,
                0,
                0.1346998486,
                0.6745312328,
                -0.7258536814,
                0,
                6.8974753119,
                34.5399114328,
                -1.2725570917,
                1
              ],
              "falloff": 0.0009534586,
              "attachedToCamera": false,
              "angle": 45,
              "hardness": 0.5,
              "castShadows": false,
              "shadowBias": 0.005
            },
            {
              "type": "DIRECTION",
              "enable": true,
              "color": [
                1,
                0.878331945,
                0.7091836735
              ],
              "intensity": 1,
              "ground": [
                0.3,
                0.2,
                0.2
              ],
              "intensityGround": 1,
              "matrix": [
                0.7755211495,
                -0.066660286,
                0.6277924442,
                0,
                0.2690483737,
                0.9344846523,
                -0.2331338825,
                0,
                -0.5711216326,
                0.3497067927,
                0.7426474533,
                0,
                -29.2446723362,
                17.9070188561,
                73.9232059257,
                1
              ],
              "falloff": 0.0009534586,
              "attachedToCamera": false,
              "angle": 45,
              "hardness": 0.5,
              "castShadows": false,
              "shadowBias": 0.005
            },
            {
              "type": "DIRECTION",
              "enable": true,
              "color": [
                0.4234693878,
                0.7352665556,
                1
              ],
              "intensity": 0.12,
              "ground": [
                0.9642857143,
                0.6484128637,
                0.2607507289
              ],
              "intensityGround": 0.06,
              "matrix": [
                0.6903299131,
                -0.7076363669,
                -0.1506498699,
                0,
                -0.0110896982,
                0.197851373,
                -0.980169298,
                0,
                0.7234097246,
                0.6783108479,
                0.1287352474,
                0,
                37.0428305177,
                34.7334496176,
                42.4873454685,
                1
              ],
              "falloff": 0.0009534586,
              "attachedToCamera": false,
              "angle": 45,
              "hardness": 0.5,
              "castShadows": false,
              "shadowBias": 0.005
            }
          ]
        },
        "orientation": {
          "matrix": [
            1,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            1
          ]
        }
      }
    };

    this.decSketchfabService.pachConfigs(id, config).subscribe(resp => {
      this.decSketchfabService.getAllTextures(id).subscribe(textureResp => {
        if (textureResp) {
          this.sketchfabId = id;
          this.textures = textureResp.results;
        }
      })
    });
  }

  materialSelected(m) {
    if (m) {
      this.update = false;
      this.material = m;
      this.selectMaterialByName(m.name);
    }
  }

  selectMaterialByName(name) {
    this.materialName = name;
    this.materialConfig = this.materials.filter(x => x.materialName === name);
    this.materialConfig = this.materialConfig[0];
  }

  getMaterials(configs) {
    if (configs) {
      this.materials = configs;
    }
  }

  updateMaterial(material, $event) {
    switch (material) {
      case 'metal': {
        this.material.channels.MetalnessPBR.factor = $event.value / 100;
        this.materialConfig.config.metalness = $event.value;
        break;
      }
      case 'base-color': {
        this.material.channels.AlbedoPBR.factor = $event.value / 100;
        this.materialConfig.config.diffuse = $event.value;
        break;
      }
      case 'roug': {
        this.material.channels.RoughnessPBR.factor = $event.value / 100;
        this.materialConfig.config.roughness = $event.value;
        break;
      }
      case 'normal': {
        this.material.channels.NormalMap.enable = $event.checked;
        this.materialConfig.config.normal = $event.checked;
        if ($event.checked) {
          this.material.channels.NormalMap.factor = 1;
        } else {
          this.material.channels.NormalMap.factor = 0;
        }
        break;
      }
      case 'opacity': {
        this.material.channels.Opacity.factor = $event.value / 100;
        this.materialConfig.config.opacity = $event.value;
        break;
      }
    }
    this.sendMaterialToUpdate();
  }


  ableTo(type) {
    switch (type) {
      case 'metal':
        this.materialConfig.config.metalnessEnabled = !this.materialConfig.config.metalnessEnabled;
        this.setTexture('metal');
        break;
      case 'base-color':
        this.materialConfig.config.diffuseEnabled = !this.materialConfig.config.diffuseEnabled;
        this.setTexture('base-color');
        break;
      case 'roug':
        this.materialConfig.config.roughnessEnabled = !this.materialConfig.config.roughnessEnabled;
        this.setTexture('roug');
        break;
      case 'opacity':
        this.materialConfig.config.opacityEnabled = !this.materialConfig.config.opacityEnabled;
        this.setTexture('opacity');
        break;
    }
  }

  setTexture(type) {
    switch (type) {
      case 'metal':
        if (this.material.channels.MetalnessPBR.texture) {
          delete this.material.channels.MetalnessPBR.texture;
          this.material.channels.MetalnessPBR.color = [1, 1, 1];
        } else {
          delete this.material.channels.MetalnessPBR.color;
          this.material.channels.MetalnessPBR.texture = this.getTexture(this.materialConfig.materialName + '_METALLIC.jpg');
        }
        break;
      case 'roug':
        if (this.material.channels.RoughnessPBR.texture) {
          delete this.material.channels.RoughnessPBR.texture;
        } else {
          this.material.channels.RoughnessPBR.texture = this.getTexture(this.materialConfig.materialName + '_ROUGHNESS.jpg');
        }
        break;
      case 'opacity':
        if (this.material.channels.Opacity.texture) {
          delete this.material.channels.Opacity.texture;
        } else {
          this.material.channels.Opacity.texture = this.getTexture(this.materialConfig.materialName + '_TRANSPARENT.jpg');
        }
        break;
    }
    this.sendMaterialToUpdate();
  }

  getTexture(name) {
    return this.textures.find(x => x.name === name);
  }

  sendMaterialToUpdate() {
    setTimeout(() => {
      this.update = true;
      this.material = JSON.parse(JSON.stringify(this.material));
    }, 200);
  }

  onSave() {
    this.getMaterialsSketchfab = true;
  }

  getAllMaterials($event) {
    let mat = {};

    for (let i = 0; i < $event.length; i++) {
      mat[$event[i].id] = $event[i];
    }

    const config = {
      'options': {
        'materials': mat
      }
    };

    this.decSketchfabService.pachConfigs(this.assetMax.fbxFiles.fbxAllGroupsFile.sketchfabId, config).subscribe(resp => {
      this.getMaterialsSketchfab = false;
      this.save.emit(this.assetMax);
    });
  }
}
