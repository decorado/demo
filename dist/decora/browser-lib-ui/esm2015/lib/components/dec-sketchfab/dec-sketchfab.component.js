/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DecSketchfabService } from './dec-sketchfab.service';
export class DecSketchfabComponent {
    /**
     * @param {?} decSketchfabService
     */
    constructor(decSketchfabService) {
        this.decSketchfabService = decSketchfabService;
        this.save = new EventEmitter();
        this.editMode = true;
        this.update = false;
        this.getMaterialsSketchfab = false;
        this.checked = true;
        this.configSelect = [
            'OFF',
            'LOW',
            'MEDIUM',
            'HIGH'
        ];
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set assetMax(v) {
        if (v) {
            this._assetMax = v;
            this.environmentConfig(v.fbxFiles.fbxAllGroupsFile.sketchfabId);
            this.getMaterials(v.renderMaterialConfigs);
        }
    }
    /**
     * @return {?}
     */
    get assetMax() {
        return this._assetMax;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @param {?} id
     * @return {?}
     */
    environmentConfig(id) {
        /** @type {?} */
        const config = {
            'options': {
                'version': 7,
                'background': {
                    'enable': 'ambient',
                    'uid': '51af6a870cce449eb75b0345feebaebb',
                    'color': [
                        0.2,
                        0.2,
                        0.2
                    ]
                },
                'environment': {
                    'enable': true,
                    'backgroundExposure': 1,
                    'exposure': 2.200000000000001,
                    'rotation': 4.71238898038469,
                    'uid': '8a4074ac8a3a4b83bf1f6a177a0f9a34',
                    'blur': 0.1,
                    'shadowEnable': false,
                    'lightIntensity': 5,
                    'shadowBias': 0.005
                },
                'lighting': {
                    'enable': false,
                    'lights': [
                        {
                            'type': 'DIRECTION',
                            'enable': true,
                            'color': [
                                0.7806122449,
                                0.7985214494,
                                1
                            ],
                            'intensity': 0.96,
                            'ground': [
                                0.3,
                                0.2,
                                0.2
                            ],
                            'intensityGround': 1,
                            'matrix': [
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
                            'falloff': 0.0009534586,
                            'attachedToCamera': false,
                            'angle': 45,
                            'hardness': 0.5,
                            'castShadows': false,
                            'shadowBias': 0.005
                        },
                        {
                            'type': 'DIRECTION',
                            'enable': true,
                            'color': [
                                1,
                                0.878331945,
                                0.7091836735
                            ],
                            'intensity': 1,
                            'ground': [
                                0.3,
                                0.2,
                                0.2
                            ],
                            'intensityGround': 1,
                            'matrix': [
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
                            'falloff': 0.0009534586,
                            'attachedToCamera': false,
                            'angle': 45,
                            'hardness': 0.5,
                            'castShadows': false,
                            'shadowBias': 0.005
                        },
                        {
                            'type': 'DIRECTION',
                            'enable': true,
                            'color': [
                                0.4234693878,
                                0.7352665556,
                                1
                            ],
                            'intensity': 0.12,
                            'ground': [
                                0.9642857143,
                                0.6484128637,
                                0.2607507289
                            ],
                            'intensityGround': 0.06,
                            'matrix': [
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
                            'falloff': 0.0009534586,
                            'attachedToCamera': false,
                            'angle': 45,
                            'hardness': 0.5,
                            'castShadows': false,
                            'shadowBias': 0.005
                        }
                    ]
                },
                'orientation': {
                    'matrix': [
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
            });
        });
    }
    /**
     * @param {?} m
     * @return {?}
     */
    materialSelected(m) {
        if (m) {
            this.update = false;
            this.material = m;
            this.selectMaterialByName(m.name);
        }
    }
    /**
     * @param {?} name
     * @return {?}
     */
    selectMaterialByName(name) {
        this.materialName = name;
        this.materialConfig = this.materials.filter(x => x.materialName === name);
        this.materialConfig = this.materialConfig[0];
    }
    /**
     * @param {?} configs
     * @return {?}
     */
    getMaterials(configs) {
        if (configs) {
            this.materials = configs;
        }
    }
    /**
     * @param {?} material
     * @param {?} $event
     * @return {?}
     */
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
                }
                else {
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
    /**
     * @param {?} type
     * @return {?}
     */
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
    /**
     * @param {?} type
     * @return {?}
     */
    setTexture(type) {
        switch (type) {
            case 'metal':
                if (this.material.channels.MetalnessPBR.texture) {
                    delete this.material.channels.MetalnessPBR.texture;
                    this.material.channels.MetalnessPBR.color = [1, 1, 1];
                }
                else {
                    delete this.material.channels.MetalnessPBR.color;
                    this.material.channels.MetalnessPBR.texture = this.getTexture(this.materialConfig.materialName + '_METALLIC.jpg');
                }
                break;
            case 'roug':
                if (this.material.channels.RoughnessPBR.texture) {
                    delete this.material.channels.RoughnessPBR.texture;
                }
                else {
                    this.material.channels.RoughnessPBR.texture = this.getTexture(this.materialConfig.materialName + '_ROUGHNESS.jpg');
                }
                break;
            case 'opacity':
                if (this.material.channels.Opacity.texture) {
                    delete this.material.channels.Opacity.texture;
                }
                else {
                    this.material.channels.Opacity.texture = this.getTexture(this.materialConfig.materialName + '_TRANSPARENT.jpg');
                }
                break;
        }
        this.sendMaterialToUpdate();
    }
    /**
     * @param {?} name
     * @return {?}
     */
    getTexture(name) {
        return this.textures.find(x => x.name === name);
    }
    /**
     * @return {?}
     */
    sendMaterialToUpdate() {
        setTimeout(() => {
            this.update = true;
            this.material = JSON.parse(JSON.stringify(this.material));
        }, 200);
    }
    /**
     * @return {?}
     */
    onSave() {
        this.getMaterialsSketchfab = true;
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    getAllMaterials($event) {
        /** @type {?} */
        const mat = {};
        for (let i = 0; i < $event.length; i++) {
            mat[$event[i].id] = $event[i];
        }
        /** @type {?} */
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
DecSketchfabComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-sketchfab',
                template: `<div fxLayout="column" class="container" fxLayoutGap="32px" fxLayoutAlign="space-between center">
  <dec-sketchfab-view [materialName]="materialName" [sketchfabId]="sketchfabId" [editMode]="editMode" [material]="material"
    [update]="update" [getAllMaterials]="getMaterialsSketchfab" (sendMaterials)="getAllMaterials($event)"
    (materialSelected)="materialSelected($event)">
  </dec-sketchfab-view>
  <div fxLayout="row" style="width: 100%" fxLayoutAlign="space-between start" fxLayoutGap="32px">
    <mat-form-field fxFlex="40">
      <mat-select [(ngModel)]="materialName" name="config" placeholder="Material ID">
        <mat-option *ngFor="let config of assetMax?.renderMaterialConfigs" [value]="config.materialName">
          {{ config.materialName }}
        </mat-option>
      </mat-select>
    </mat-form-field>

    <div fxFlex="60" class="polygon-count dec-color-gray text-right">
      {{ 'label.polygon' | translate }}: {{ assetMax?.fbxFiles?.fbxAllGroupsFile?.fbxOriginalPolyCount }} - {{
      'label.current-polygon'
      | translate }} {{ assetMax?.fbxFiles?.fbxAllGroupsFile?.fbxPolyCount }}
    </div>

  </div>

  <div *ngIf="materialConfig" fxLayout="row" class="row-size" fxLayoutAlign="space-between start" fxLayoutGap="16px">
    <div fxFlex="30" fxLayout="column" fxLayoutGap="8px">
      <div fxLayout="column">
        <div fxLayout="row" fxLayoutAlign="start start" class="row-span-icon" fxLayoutGap="8px">
          <span class="setting-name">Base Color {{ materialConfig?.config?.diffuse }}</span>
          <mat-icon class="md-span-icon click" (click)="ableTo('base-color')">
            {{ materialConfig?.config?.diffuseEnabled ? 'lock_open' : 'lock_outline' }}
          </mat-icon>
        </div>
        <mat-slider class="slider-position" [max]="100" [min]="0" [step]="1" [disabled]="!materialConfig?.config?.diffuseEnabled"
          [(ngModel)]="materialConfig.config.diffuse" (input)="updateMaterial('base-color', $event)">
        </mat-slider>

      </div>

      <div fxLayout="column">
        <div fxLayout="row" fxLayoutAlign="start start" class="row-span-icon" fxLayoutGap="8px">
          <span class="setting-name">Roughness {{ materialConfig?.config?.roughness }}</span>
          <mat-icon class="md-span-icon click" (click)="ableTo('roug')">
            {{ materialConfig?.config?.roughnessEnabled ? 'lock_open' : 'lock_outline' }}
          </mat-icon>
        </div>
        <mat-slider class="slider-position" [max]="100" [min]="0" [step]="1" [disabled]="!materialConfig?.config?.roughnessEnabled"
          [(ngModel)]="materialConfig.config.roughness" (input)="updateMaterial('roug', $event)">
        </mat-slider>
      </div>
    </div>

    <div fxFlex="30" fxLayout="column" fxLayoutGap="8px">

      <mat-form-field>
        <mat-select class="polygon-select" fxFill [(ngModel)]="materialConfig.adjustOptimize" name="config" placeholder="{{ 'label.polygon-reduction' | translate }}">
          <mat-option *ngFor="let config of configSelect" [value]="config">
            {{ 'label.'+config | translate }}
            <span class="position-polygon-number gray" *ngIf="config === 'OFF'">
              {{ materialConfig?.fbxPolyCountOrigin}}
            </span>
            <span class="position-polygon-number gray" *ngIf="materialConfig?.adjustOptimize === config">
              {{ materialConfig?.fbxPolyCount}}
            </span>
          </mat-option>
        </mat-select>
      </mat-form-field>

      <div fxLayout="column" class="metalness-position">
        <div fxLayout="row" fxLayoutAlign="start start" class="row-span-icon" fxLayoutGap="8px">
          <span class="setting-name">Metalness {{ materialConfig?.config?.metalness }}</span>
          <mat-icon class="md-span-icon click" (click)="ableTo('metal')">
            {{ materialConfig?.config?.metalnessEnabled ? 'lock_open' : 'lock_outline' }}
          </mat-icon>
        </div>
        <mat-slider class="slider-position" [max]="100" [min]="0" [step]="1" [disabled]="!materialConfig?.config?.metalnessEnabled"
          [(ngModel)]="materialConfig.config.metalness" (input)="updateMaterial('metal', $event)">
        </mat-slider>
      </div>

    </div>

    <div fxFlex="30" fxLayout="column" fxLayoutGap="8px">
      <div>
        <mat-checkbox class="check-box-normal-map" (input)="updateMaterial('normal', $event)" [(ngModel)]="checked"
          [labelPosition]="align">
          Normal Map
        </mat-checkbox>
      </div>
      <div fxLayout="column" class="opacity-position" fxLayoutGap="8px">
        <div fxLayout="row" fxLayoutAlign="start start" class="opacity-position-text" fxLayoutGap="8px">
          <span class="setting-name">Opacity {{ materialConfig?.config?.opacity }}</span>
          <mat-icon class="md-span-icon click" (click)="ableTo('opacity')">
            {{ materialConfig?.config?.opacityEnabled ? 'lock_open' : 'lock_outline' }}
          </mat-icon>
        </div>
        <mat-slider class="slider-position" [max]="100" [min]="0" [step]="1" [disabled]="!materialConfig?.config?.opacityEnabled"
          [(ngModel)]="materialConfig.config.opacity" (input)="updateMaterial('opacity', $event)">
        </mat-slider>
      </div>
    </div>
  </div>
  <div class="text-right save-button-div">
    <button mat-raised-button type="button" color="primary" (click)="onSave()">{{ 'label.save' | translate }}</button>
  </div>
</div>
`,
                styles: [`.container{max-width:620px!important}.setting-name{width:100px;display:inline-block}.md-span-icon{position:relative;top:-5px;left:-5px}.slider-position{position:relative;left:-8px;top:-8px}.row-size{width:100%}.polygon-select{position:relative;top:-5px}.metalness-position{position:relative;top:16px}.polygon-count{font-size:12px;position:relative;top:27px}.opacity-position{position:relative;top:40px}.opacity-position-text{position:relative;top:8px}.check-box-normal-map{position:relative;top:18px}.save-button-div{width:100%}`]
            },] },
];
/** @nocollapse */
DecSketchfabComponent.ctorParameters = () => [
    { type: DecSketchfabService }
];
DecSketchfabComponent.propDecorators = {
    assetMax: [{ type: Input }],
    save: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    DecSketchfabComponent.prototype.save;
    /** @type {?} */
    DecSketchfabComponent.prototype._assetMax;
    /** @type {?} */
    DecSketchfabComponent.prototype.sketchfabId;
    /** @type {?} */
    DecSketchfabComponent.prototype.material;
    /** @type {?} */
    DecSketchfabComponent.prototype.materialConfig;
    /** @type {?} */
    DecSketchfabComponent.prototype.materialName;
    /** @type {?} */
    DecSketchfabComponent.prototype.materials;
    /** @type {?} */
    DecSketchfabComponent.prototype.textures;
    /** @type {?} */
    DecSketchfabComponent.prototype.editMode;
    /** @type {?} */
    DecSketchfabComponent.prototype.update;
    /** @type {?} */
    DecSketchfabComponent.prototype.getMaterialsSketchfab;
    /** @type {?} */
    DecSketchfabComponent.prototype.align;
    /** @type {?} */
    DecSketchfabComponent.prototype.checked;
    /** @type {?} */
    DecSketchfabComponent.prototype.configSelect;
    /** @type {?} */
    DecSketchfabComponent.prototype.decSketchfabService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLXNrZXRjaGZhYi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGVjLXNrZXRjaGZhYi9kZWMtc2tldGNoZmFiLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQStHOUQsTUFBTTs7OztJQXVDSixZQUFvQixtQkFBd0M7UUFBeEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtvQkF4QjNDLElBQUksWUFBWSxFQUFFO3dCQVV4QixJQUFJO3NCQUNOLEtBQUs7cUNBQ1UsS0FBSzt1QkFHbkIsSUFBSTs0QkFFQztZQUNiLEtBQUs7WUFDTCxLQUFLO1lBQ0wsUUFBUTtZQUNSLE1BQU07U0FDUDtLQUVnRTs7Ozs7SUFyQ2pFLElBQ0ksUUFBUSxDQUFDLENBQU07UUFDakIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ2hFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUM7U0FDNUM7S0FDRjs7OztJQUVELElBQUksUUFBUTtRQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0tBQ3ZCOzs7O0lBNEJELFFBQVE7S0FDUDs7Ozs7SUFFRCxpQkFBaUIsQ0FBQyxFQUFFOztRQUNsQixNQUFNLE1BQU0sR0FBRztZQUNiLFNBQVMsRUFBRTtnQkFDVCxTQUFTLEVBQUUs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QUFHO1lBQ2IsU0FBUyxFQUFFO2dCQUNULFdBQVcsRUFBRSxHQUFHO2FBQ2pCO1NBQ0YsQ0FBQztRQUVGLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNqSCxJQUFJLENBQUMscUJBQXFCLEdBQUcsS0FBSyxDQUFDO1lBQ25DLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUMvQixDQUFDLENBQUM7S0FDSjs7O1lBMWRGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQXdHWDtnQkFDQyxNQUFNLEVBQUUsQ0FBQyxraEJBQWtoQixDQUFDO2FBQzdoQjs7OztZQTlHUSxtQkFBbUI7Ozt1QkFpSHpCLEtBQUs7bUJBYUwsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERlY1NrZXRjaGZhYlNlcnZpY2UgfSBmcm9tICcuL2RlYy1za2V0Y2hmYWIuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1za2V0Y2hmYWInLFxuICB0ZW1wbGF0ZTogYDxkaXYgZnhMYXlvdXQ9XCJjb2x1bW5cIiBjbGFzcz1cImNvbnRhaW5lclwiIGZ4TGF5b3V0R2FwPVwiMzJweFwiIGZ4TGF5b3V0QWxpZ249XCJzcGFjZS1iZXR3ZWVuIGNlbnRlclwiPlxuICA8ZGVjLXNrZXRjaGZhYi12aWV3IFttYXRlcmlhbE5hbWVdPVwibWF0ZXJpYWxOYW1lXCIgW3NrZXRjaGZhYklkXT1cInNrZXRjaGZhYklkXCIgW2VkaXRNb2RlXT1cImVkaXRNb2RlXCIgW21hdGVyaWFsXT1cIm1hdGVyaWFsXCJcbiAgICBbdXBkYXRlXT1cInVwZGF0ZVwiIFtnZXRBbGxNYXRlcmlhbHNdPVwiZ2V0TWF0ZXJpYWxzU2tldGNoZmFiXCIgKHNlbmRNYXRlcmlhbHMpPVwiZ2V0QWxsTWF0ZXJpYWxzKCRldmVudClcIlxuICAgIChtYXRlcmlhbFNlbGVjdGVkKT1cIm1hdGVyaWFsU2VsZWN0ZWQoJGV2ZW50KVwiPlxuICA8L2RlYy1za2V0Y2hmYWItdmlldz5cbiAgPGRpdiBmeExheW91dD1cInJvd1wiIHN0eWxlPVwid2lkdGg6IDEwMCVcIiBmeExheW91dEFsaWduPVwic3BhY2UtYmV0d2VlbiBzdGFydFwiIGZ4TGF5b3V0R2FwPVwiMzJweFwiPlxuICAgIDxtYXQtZm9ybS1maWVsZCBmeEZsZXg9XCI0MFwiPlxuICAgICAgPG1hdC1zZWxlY3QgWyhuZ01vZGVsKV09XCJtYXRlcmlhbE5hbWVcIiBuYW1lPVwiY29uZmlnXCIgcGxhY2Vob2xkZXI9XCJNYXRlcmlhbCBJRFwiPlxuICAgICAgICA8bWF0LW9wdGlvbiAqbmdGb3I9XCJsZXQgY29uZmlnIG9mIGFzc2V0TWF4Py5yZW5kZXJNYXRlcmlhbENvbmZpZ3NcIiBbdmFsdWVdPVwiY29uZmlnLm1hdGVyaWFsTmFtZVwiPlxuICAgICAgICAgIHt7IGNvbmZpZy5tYXRlcmlhbE5hbWUgfX1cbiAgICAgICAgPC9tYXQtb3B0aW9uPlxuICAgICAgPC9tYXQtc2VsZWN0PlxuICAgIDwvbWF0LWZvcm0tZmllbGQ+XG5cbiAgICA8ZGl2IGZ4RmxleD1cIjYwXCIgY2xhc3M9XCJwb2x5Z29uLWNvdW50IGRlYy1jb2xvci1ncmF5IHRleHQtcmlnaHRcIj5cbiAgICAgIHt7ICdsYWJlbC5wb2x5Z29uJyB8IHRyYW5zbGF0ZSB9fToge3sgYXNzZXRNYXg/LmZieEZpbGVzPy5mYnhBbGxHcm91cHNGaWxlPy5mYnhPcmlnaW5hbFBvbHlDb3VudCB9fSAtIHt7XG4gICAgICAnbGFiZWwuY3VycmVudC1wb2x5Z29uJ1xuICAgICAgfCB0cmFuc2xhdGUgfX0ge3sgYXNzZXRNYXg/LmZieEZpbGVzPy5mYnhBbGxHcm91cHNGaWxlPy5mYnhQb2x5Q291bnQgfX1cbiAgICA8L2Rpdj5cblxuICA8L2Rpdj5cblxuICA8ZGl2ICpuZ0lmPVwibWF0ZXJpYWxDb25maWdcIiBmeExheW91dD1cInJvd1wiIGNsYXNzPVwicm93LXNpemVcIiBmeExheW91dEFsaWduPVwic3BhY2UtYmV0d2VlbiBzdGFydFwiIGZ4TGF5b3V0R2FwPVwiMTZweFwiPlxuICAgIDxkaXYgZnhGbGV4PVwiMzBcIiBmeExheW91dD1cImNvbHVtblwiIGZ4TGF5b3V0R2FwPVwiOHB4XCI+XG4gICAgICA8ZGl2IGZ4TGF5b3V0PVwiY29sdW1uXCI+XG4gICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwic3RhcnQgc3RhcnRcIiBjbGFzcz1cInJvdy1zcGFuLWljb25cIiBmeExheW91dEdhcD1cIjhweFwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwic2V0dGluZy1uYW1lXCI+QmFzZSBDb2xvciB7eyBtYXRlcmlhbENvbmZpZz8uY29uZmlnPy5kaWZmdXNlIH19PC9zcGFuPlxuICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cIm1kLXNwYW4taWNvbiBjbGlja1wiIChjbGljayk9XCJhYmxlVG8oJ2Jhc2UtY29sb3InKVwiPlxuICAgICAgICAgICAge3sgbWF0ZXJpYWxDb25maWc/LmNvbmZpZz8uZGlmZnVzZUVuYWJsZWQgPyAnbG9ja19vcGVuJyA6ICdsb2NrX291dGxpbmUnIH19XG4gICAgICAgICAgPC9tYXQtaWNvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxtYXQtc2xpZGVyIGNsYXNzPVwic2xpZGVyLXBvc2l0aW9uXCIgW21heF09XCIxMDBcIiBbbWluXT1cIjBcIiBbc3RlcF09XCIxXCIgW2Rpc2FibGVkXT1cIiFtYXRlcmlhbENvbmZpZz8uY29uZmlnPy5kaWZmdXNlRW5hYmxlZFwiXG4gICAgICAgICAgWyhuZ01vZGVsKV09XCJtYXRlcmlhbENvbmZpZy5jb25maWcuZGlmZnVzZVwiIChpbnB1dCk9XCJ1cGRhdGVNYXRlcmlhbCgnYmFzZS1jb2xvcicsICRldmVudClcIj5cbiAgICAgICAgPC9tYXQtc2xpZGVyPlxuXG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBmeExheW91dD1cImNvbHVtblwiPlxuICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cInN0YXJ0IHN0YXJ0XCIgY2xhc3M9XCJyb3ctc3Bhbi1pY29uXCIgZnhMYXlvdXRHYXA9XCI4cHhcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInNldHRpbmctbmFtZVwiPlJvdWdobmVzcyB7eyBtYXRlcmlhbENvbmZpZz8uY29uZmlnPy5yb3VnaG5lc3MgfX08L3NwYW4+XG4gICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwibWQtc3Bhbi1pY29uIGNsaWNrXCIgKGNsaWNrKT1cImFibGVUbygncm91ZycpXCI+XG4gICAgICAgICAgICB7eyBtYXRlcmlhbENvbmZpZz8uY29uZmlnPy5yb3VnaG5lc3NFbmFibGVkID8gJ2xvY2tfb3BlbicgOiAnbG9ja19vdXRsaW5lJyB9fVxuICAgICAgICAgIDwvbWF0LWljb24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8bWF0LXNsaWRlciBjbGFzcz1cInNsaWRlci1wb3NpdGlvblwiIFttYXhdPVwiMTAwXCIgW21pbl09XCIwXCIgW3N0ZXBdPVwiMVwiIFtkaXNhYmxlZF09XCIhbWF0ZXJpYWxDb25maWc/LmNvbmZpZz8ucm91Z2huZXNzRW5hYmxlZFwiXG4gICAgICAgICAgWyhuZ01vZGVsKV09XCJtYXRlcmlhbENvbmZpZy5jb25maWcucm91Z2huZXNzXCIgKGlucHV0KT1cInVwZGF0ZU1hdGVyaWFsKCdyb3VnJywgJGV2ZW50KVwiPlxuICAgICAgICA8L21hdC1zbGlkZXI+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgZnhGbGV4PVwiMzBcIiBmeExheW91dD1cImNvbHVtblwiIGZ4TGF5b3V0R2FwPVwiOHB4XCI+XG5cbiAgICAgIDxtYXQtZm9ybS1maWVsZD5cbiAgICAgICAgPG1hdC1zZWxlY3QgY2xhc3M9XCJwb2x5Z29uLXNlbGVjdFwiIGZ4RmlsbCBbKG5nTW9kZWwpXT1cIm1hdGVyaWFsQ29uZmlnLmFkanVzdE9wdGltaXplXCIgbmFtZT1cImNvbmZpZ1wiIHBsYWNlaG9sZGVyPVwie3sgJ2xhYmVsLnBvbHlnb24tcmVkdWN0aW9uJyB8IHRyYW5zbGF0ZSB9fVwiPlxuICAgICAgICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCBjb25maWcgb2YgY29uZmlnU2VsZWN0XCIgW3ZhbHVlXT1cImNvbmZpZ1wiPlxuICAgICAgICAgICAge3sgJ2xhYmVsLicrY29uZmlnIHwgdHJhbnNsYXRlIH19XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInBvc2l0aW9uLXBvbHlnb24tbnVtYmVyIGdyYXlcIiAqbmdJZj1cImNvbmZpZyA9PT0gJ09GRidcIj5cbiAgICAgICAgICAgICAge3sgbWF0ZXJpYWxDb25maWc/LmZieFBvbHlDb3VudE9yaWdpbn19XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInBvc2l0aW9uLXBvbHlnb24tbnVtYmVyIGdyYXlcIiAqbmdJZj1cIm1hdGVyaWFsQ29uZmlnPy5hZGp1c3RPcHRpbWl6ZSA9PT0gY29uZmlnXCI+XG4gICAgICAgICAgICAgIHt7IG1hdGVyaWFsQ29uZmlnPy5mYnhQb2x5Q291bnR9fVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvbWF0LW9wdGlvbj5cbiAgICAgICAgPC9tYXQtc2VsZWN0PlxuICAgICAgPC9tYXQtZm9ybS1maWVsZD5cblxuICAgICAgPGRpdiBmeExheW91dD1cImNvbHVtblwiIGNsYXNzPVwibWV0YWxuZXNzLXBvc2l0aW9uXCI+XG4gICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwic3RhcnQgc3RhcnRcIiBjbGFzcz1cInJvdy1zcGFuLWljb25cIiBmeExheW91dEdhcD1cIjhweFwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwic2V0dGluZy1uYW1lXCI+TWV0YWxuZXNzIHt7IG1hdGVyaWFsQ29uZmlnPy5jb25maWc/Lm1ldGFsbmVzcyB9fTwvc3Bhbj5cbiAgICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJtZC1zcGFuLWljb24gY2xpY2tcIiAoY2xpY2spPVwiYWJsZVRvKCdtZXRhbCcpXCI+XG4gICAgICAgICAgICB7eyBtYXRlcmlhbENvbmZpZz8uY29uZmlnPy5tZXRhbG5lc3NFbmFibGVkID8gJ2xvY2tfb3BlbicgOiAnbG9ja19vdXRsaW5lJyB9fVxuICAgICAgICAgIDwvbWF0LWljb24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8bWF0LXNsaWRlciBjbGFzcz1cInNsaWRlci1wb3NpdGlvblwiIFttYXhdPVwiMTAwXCIgW21pbl09XCIwXCIgW3N0ZXBdPVwiMVwiIFtkaXNhYmxlZF09XCIhbWF0ZXJpYWxDb25maWc/LmNvbmZpZz8ubWV0YWxuZXNzRW5hYmxlZFwiXG4gICAgICAgICAgWyhuZ01vZGVsKV09XCJtYXRlcmlhbENvbmZpZy5jb25maWcubWV0YWxuZXNzXCIgKGlucHV0KT1cInVwZGF0ZU1hdGVyaWFsKCdtZXRhbCcsICRldmVudClcIj5cbiAgICAgICAgPC9tYXQtc2xpZGVyPlxuICAgICAgPC9kaXY+XG5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgZnhGbGV4PVwiMzBcIiBmeExheW91dD1cImNvbHVtblwiIGZ4TGF5b3V0R2FwPVwiOHB4XCI+XG4gICAgICA8ZGl2PlxuICAgICAgICA8bWF0LWNoZWNrYm94IGNsYXNzPVwiY2hlY2stYm94LW5vcm1hbC1tYXBcIiAoaW5wdXQpPVwidXBkYXRlTWF0ZXJpYWwoJ25vcm1hbCcsICRldmVudClcIiBbKG5nTW9kZWwpXT1cImNoZWNrZWRcIlxuICAgICAgICAgIFtsYWJlbFBvc2l0aW9uXT1cImFsaWduXCI+XG4gICAgICAgICAgTm9ybWFsIE1hcFxuICAgICAgICA8L21hdC1jaGVja2JveD5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBmeExheW91dD1cImNvbHVtblwiIGNsYXNzPVwib3BhY2l0eS1wb3NpdGlvblwiIGZ4TGF5b3V0R2FwPVwiOHB4XCI+XG4gICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwic3RhcnQgc3RhcnRcIiBjbGFzcz1cIm9wYWNpdHktcG9zaXRpb24tdGV4dFwiIGZ4TGF5b3V0R2FwPVwiOHB4XCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJzZXR0aW5nLW5hbWVcIj5PcGFjaXR5IHt7IG1hdGVyaWFsQ29uZmlnPy5jb25maWc/Lm9wYWNpdHkgfX08L3NwYW4+XG4gICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwibWQtc3Bhbi1pY29uIGNsaWNrXCIgKGNsaWNrKT1cImFibGVUbygnb3BhY2l0eScpXCI+XG4gICAgICAgICAgICB7eyBtYXRlcmlhbENvbmZpZz8uY29uZmlnPy5vcGFjaXR5RW5hYmxlZCA/ICdsb2NrX29wZW4nIDogJ2xvY2tfb3V0bGluZScgfX1cbiAgICAgICAgICA8L21hdC1pY29uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPG1hdC1zbGlkZXIgY2xhc3M9XCJzbGlkZXItcG9zaXRpb25cIiBbbWF4XT1cIjEwMFwiIFttaW5dPVwiMFwiIFtzdGVwXT1cIjFcIiBbZGlzYWJsZWRdPVwiIW1hdGVyaWFsQ29uZmlnPy5jb25maWc/Lm9wYWNpdHlFbmFibGVkXCJcbiAgICAgICAgICBbKG5nTW9kZWwpXT1cIm1hdGVyaWFsQ29uZmlnLmNvbmZpZy5vcGFjaXR5XCIgKGlucHV0KT1cInVwZGF0ZU1hdGVyaWFsKCdvcGFjaXR5JywgJGV2ZW50KVwiPlxuICAgICAgICA8L21hdC1zbGlkZXI+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJ0ZXh0LXJpZ2h0IHNhdmUtYnV0dG9uLWRpdlwiPlxuICAgIDxidXR0b24gbWF0LXJhaXNlZC1idXR0b24gdHlwZT1cImJ1dHRvblwiIGNvbG9yPVwicHJpbWFyeVwiIChjbGljayk9XCJvblNhdmUoKVwiPnt7ICdsYWJlbC5zYXZlJyB8IHRyYW5zbGF0ZSB9fTwvYnV0dG9uPlxuICA8L2Rpdj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5jb250YWluZXJ7bWF4LXdpZHRoOjYyMHB4IWltcG9ydGFudH0uc2V0dGluZy1uYW1le3dpZHRoOjEwMHB4O2Rpc3BsYXk6aW5saW5lLWJsb2NrfS5tZC1zcGFuLWljb257cG9zaXRpb246cmVsYXRpdmU7dG9wOi01cHg7bGVmdDotNXB4fS5zbGlkZXItcG9zaXRpb257cG9zaXRpb246cmVsYXRpdmU7bGVmdDotOHB4O3RvcDotOHB4fS5yb3ctc2l6ZXt3aWR0aDoxMDAlfS5wb2x5Z29uLXNlbGVjdHtwb3NpdGlvbjpyZWxhdGl2ZTt0b3A6LTVweH0ubWV0YWxuZXNzLXBvc2l0aW9ue3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDoxNnB4fS5wb2x5Z29uLWNvdW50e2ZvbnQtc2l6ZToxMnB4O3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDoyN3B4fS5vcGFjaXR5LXBvc2l0aW9ue3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDo0MHB4fS5vcGFjaXR5LXBvc2l0aW9uLXRleHR7cG9zaXRpb246cmVsYXRpdmU7dG9wOjhweH0uY2hlY2stYm94LW5vcm1hbC1tYXB7cG9zaXRpb246cmVsYXRpdmU7dG9wOjE4cHh9LnNhdmUtYnV0dG9uLWRpdnt3aWR0aDoxMDAlfWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1NrZXRjaGZhYkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KClcbiAgc2V0IGFzc2V0TWF4KHY6IGFueSkge1xuICAgIGlmICh2KSB7XG4gICAgICB0aGlzLl9hc3NldE1heCA9IHY7XG4gICAgICB0aGlzLmVudmlyb25tZW50Q29uZmlnKHYuZmJ4RmlsZXMuZmJ4QWxsR3JvdXBzRmlsZS5za2V0Y2hmYWJJZCk7XG4gICAgICB0aGlzLmdldE1hdGVyaWFscyh2LnJlbmRlck1hdGVyaWFsQ29uZmlncyk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGFzc2V0TWF4KCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX2Fzc2V0TWF4O1xuICB9XG5cbiAgQE91dHB1dCgpIHNhdmUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgX2Fzc2V0TWF4OiBhbnk7XG4gIHNrZXRjaGZhYklkOiBzdHJpbmc7XG5cbiAgbWF0ZXJpYWw6IGFueTtcbiAgbWF0ZXJpYWxDb25maWc6IGFueTtcbiAgbWF0ZXJpYWxOYW1lOiBzdHJpbmc7XG4gIG1hdGVyaWFsczogYW55O1xuICB0ZXh0dXJlczogYW55O1xuICBlZGl0TW9kZSA9IHRydWU7XG4gIHVwZGF0ZSA9IGZhbHNlO1xuICBnZXRNYXRlcmlhbHNTa2V0Y2hmYWIgPSBmYWxzZTtcblxuICBhbGlnbjogJ3N0YXJ0JztcbiAgY2hlY2tlZCA9IHRydWU7XG5cbiAgY29uZmlnU2VsZWN0ID0gW1xuICAgICdPRkYnLFxuICAgICdMT1cnLFxuICAgICdNRURJVU0nLFxuICAgICdISUdIJ1xuICBdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGVjU2tldGNoZmFiU2VydmljZTogRGVjU2tldGNoZmFiU2VydmljZSkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBlbnZpcm9ubWVudENvbmZpZyhpZCkge1xuICAgIGNvbnN0IGNvbmZpZyA9IHtcbiAgICAgICdvcHRpb25zJzoge1xuICAgICAgICAndmVyc2lvbic6IDcsXG4gICAgICAgICdiYWNrZ3JvdW5kJzoge1xuICAgICAgICAgICdlbmFibGUnOiAnYW1iaWVudCcsXG4gICAgICAgICAgJ3VpZCc6ICc1MWFmNmE4NzBjY2U0NDllYjc1YjAzNDVmZWViYWViYicsXG4gICAgICAgICAgJ2NvbG9yJzogW1xuICAgICAgICAgICAgMC4yLFxuICAgICAgICAgICAgMC4yLFxuICAgICAgICAgICAgMC4yXG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICAnZW52aXJvbm1lbnQnOiB7XG4gICAgICAgICAgJ2VuYWJsZSc6IHRydWUsXG4gICAgICAgICAgJ2JhY2tncm91bmRFeHBvc3VyZSc6IDEsXG4gICAgICAgICAgJ2V4cG9zdXJlJzogMi4yMDAwMDAwMDAwMDAwMDEsXG4gICAgICAgICAgJ3JvdGF0aW9uJzogNC43MTIzODg5ODAzODQ2OSxcbiAgICAgICAgICAndWlkJzogJzhhNDA3NGFjOGEzYTRiODNiZjFmNmExNzdhMGY5YTM0JyxcbiAgICAgICAgICAnYmx1cic6IDAuMSxcbiAgICAgICAgICAnc2hhZG93RW5hYmxlJzogZmFsc2UsXG4gICAgICAgICAgJ2xpZ2h0SW50ZW5zaXR5JzogNSxcbiAgICAgICAgICAnc2hhZG93Qmlhcyc6IDAuMDA1XG4gICAgICAgIH0sXG4gICAgICAgICdsaWdodGluZyc6IHtcbiAgICAgICAgICAnZW5hYmxlJzogZmFsc2UsXG4gICAgICAgICAgJ2xpZ2h0cyc6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgJ3R5cGUnOiAnRElSRUNUSU9OJyxcbiAgICAgICAgICAgICAgJ2VuYWJsZSc6IHRydWUsXG4gICAgICAgICAgICAgICdjb2xvcic6IFtcbiAgICAgICAgICAgICAgICAwLjc4MDYxMjI0NDksXG4gICAgICAgICAgICAgICAgMC43OTg1MjE0NDk0LFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgJ2ludGVuc2l0eSc6IDAuOTYsXG4gICAgICAgICAgICAgICdncm91bmQnOiBbXG4gICAgICAgICAgICAgICAgMC4zLFxuICAgICAgICAgICAgICAgIDAuMixcbiAgICAgICAgICAgICAgICAwLjJcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgJ2ludGVuc2l0eUdyb3VuZCc6IDEsXG4gICAgICAgICAgICAgICdtYXRyaXgnOiBbXG4gICAgICAgICAgICAgICAgLTAuOTgxNTgwNDUsXG4gICAgICAgICAgICAgICAgMC4xOTA5OTIyMTY3LFxuICAgICAgICAgICAgICAgIC0wLjAwNDY2ODMyNzMsXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwLjEzNTQ4MzQ3MSxcbiAgICAgICAgICAgICAgICAwLjcxMzExMjYwNjIsXG4gICAgICAgICAgICAgICAgMC42ODc4MzMyOTM3LFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMC4xMzQ2OTk4NDg2LFxuICAgICAgICAgICAgICAgIDAuNjc0NTMxMjMyOCxcbiAgICAgICAgICAgICAgICAtMC43MjU4NTM2ODE0LFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgNi44OTc0NzUzMTE5LFxuICAgICAgICAgICAgICAgIDM0LjUzOTkxMTQzMjgsXG4gICAgICAgICAgICAgICAgLTEuMjcyNTU3MDkxNyxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICdmYWxsb2ZmJzogMC4wMDA5NTM0NTg2LFxuICAgICAgICAgICAgICAnYXR0YWNoZWRUb0NhbWVyYSc6IGZhbHNlLFxuICAgICAgICAgICAgICAnYW5nbGUnOiA0NSxcbiAgICAgICAgICAgICAgJ2hhcmRuZXNzJzogMC41LFxuICAgICAgICAgICAgICAnY2FzdFNoYWRvd3MnOiBmYWxzZSxcbiAgICAgICAgICAgICAgJ3NoYWRvd0JpYXMnOiAwLjAwNVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgJ3R5cGUnOiAnRElSRUNUSU9OJyxcbiAgICAgICAgICAgICAgJ2VuYWJsZSc6IHRydWUsXG4gICAgICAgICAgICAgICdjb2xvcic6IFtcbiAgICAgICAgICAgICAgICAxLFxuICAgICAgICAgICAgICAgIDAuODc4MzMxOTQ1LFxuICAgICAgICAgICAgICAgIDAuNzA5MTgzNjczNVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAnaW50ZW5zaXR5JzogMSxcbiAgICAgICAgICAgICAgJ2dyb3VuZCc6IFtcbiAgICAgICAgICAgICAgICAwLjMsXG4gICAgICAgICAgICAgICAgMC4yLFxuICAgICAgICAgICAgICAgIDAuMlxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAnaW50ZW5zaXR5R3JvdW5kJzogMSxcbiAgICAgICAgICAgICAgJ21hdHJpeCc6IFtcbiAgICAgICAgICAgICAgICAwLjc3NTUyMTE0OTUsXG4gICAgICAgICAgICAgICAgLTAuMDY2NjYwMjg2LFxuICAgICAgICAgICAgICAgIDAuNjI3NzkyNDQ0MixcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDAuMjY5MDQ4MzczNyxcbiAgICAgICAgICAgICAgICAwLjkzNDQ4NDY1MjMsXG4gICAgICAgICAgICAgICAgLTAuMjMzMTMzODgyNSxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIC0wLjU3MTEyMTYzMjYsXG4gICAgICAgICAgICAgICAgMC4zNDk3MDY3OTI3LFxuICAgICAgICAgICAgICAgIDAuNzQyNjQ3NDUzMyxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIC0yOS4yNDQ2NzIzMzYyLFxuICAgICAgICAgICAgICAgIDE3LjkwNzAxODg1NjEsXG4gICAgICAgICAgICAgICAgNzMuOTIzMjA1OTI1NyxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICdmYWxsb2ZmJzogMC4wMDA5NTM0NTg2LFxuICAgICAgICAgICAgICAnYXR0YWNoZWRUb0NhbWVyYSc6IGZhbHNlLFxuICAgICAgICAgICAgICAnYW5nbGUnOiA0NSxcbiAgICAgICAgICAgICAgJ2hhcmRuZXNzJzogMC41LFxuICAgICAgICAgICAgICAnY2FzdFNoYWRvd3MnOiBmYWxzZSxcbiAgICAgICAgICAgICAgJ3NoYWRvd0JpYXMnOiAwLjAwNVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgJ3R5cGUnOiAnRElSRUNUSU9OJyxcbiAgICAgICAgICAgICAgJ2VuYWJsZSc6IHRydWUsXG4gICAgICAgICAgICAgICdjb2xvcic6IFtcbiAgICAgICAgICAgICAgICAwLjQyMzQ2OTM4NzgsXG4gICAgICAgICAgICAgICAgMC43MzUyNjY1NTU2LFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgJ2ludGVuc2l0eSc6IDAuMTIsXG4gICAgICAgICAgICAgICdncm91bmQnOiBbXG4gICAgICAgICAgICAgICAgMC45NjQyODU3MTQzLFxuICAgICAgICAgICAgICAgIDAuNjQ4NDEyODYzNyxcbiAgICAgICAgICAgICAgICAwLjI2MDc1MDcyODlcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgJ2ludGVuc2l0eUdyb3VuZCc6IDAuMDYsXG4gICAgICAgICAgICAgICdtYXRyaXgnOiBbXG4gICAgICAgICAgICAgICAgMC42OTAzMjk5MTMxLFxuICAgICAgICAgICAgICAgIC0wLjcwNzYzNjM2NjksXG4gICAgICAgICAgICAgICAgLTAuMTUwNjQ5ODY5OSxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIC0wLjAxMTA4OTY5ODIsXG4gICAgICAgICAgICAgICAgMC4xOTc4NTEzNzMsXG4gICAgICAgICAgICAgICAgLTAuOTgwMTY5Mjk4LFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMC43MjM0MDk3MjQ2LFxuICAgICAgICAgICAgICAgIDAuNjc4MzEwODQ3OSxcbiAgICAgICAgICAgICAgICAwLjEyODczNTI0NzQsXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAzNy4wNDI4MzA1MTc3LFxuICAgICAgICAgICAgICAgIDM0LjczMzQ0OTYxNzYsXG4gICAgICAgICAgICAgICAgNDIuNDg3MzQ1NDY4NSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICdmYWxsb2ZmJzogMC4wMDA5NTM0NTg2LFxuICAgICAgICAgICAgICAnYXR0YWNoZWRUb0NhbWVyYSc6IGZhbHNlLFxuICAgICAgICAgICAgICAnYW5nbGUnOiA0NSxcbiAgICAgICAgICAgICAgJ2hhcmRuZXNzJzogMC41LFxuICAgICAgICAgICAgICAnY2FzdFNoYWRvd3MnOiBmYWxzZSxcbiAgICAgICAgICAgICAgJ3NoYWRvd0JpYXMnOiAwLjAwNVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAgJ29yaWVudGF0aW9uJzoge1xuICAgICAgICAgICdtYXRyaXgnOiBbXG4gICAgICAgICAgICAxLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMSxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAxXG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuZGVjU2tldGNoZmFiU2VydmljZS5wYWNoQ29uZmlncyhpZCwgY29uZmlnKS5zdWJzY3JpYmUocmVzcCA9PiB7XG4gICAgICB0aGlzLmRlY1NrZXRjaGZhYlNlcnZpY2UuZ2V0QWxsVGV4dHVyZXMoaWQpLnN1YnNjcmliZSh0ZXh0dXJlUmVzcCA9PiB7XG4gICAgICAgIGlmICh0ZXh0dXJlUmVzcCkge1xuICAgICAgICAgIHRoaXMuc2tldGNoZmFiSWQgPSBpZDtcbiAgICAgICAgICB0aGlzLnRleHR1cmVzID0gdGV4dHVyZVJlc3AucmVzdWx0cztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBtYXRlcmlhbFNlbGVjdGVkKG0pIHtcbiAgICBpZiAobSkge1xuICAgICAgdGhpcy51cGRhdGUgPSBmYWxzZTtcbiAgICAgIHRoaXMubWF0ZXJpYWwgPSBtO1xuICAgICAgdGhpcy5zZWxlY3RNYXRlcmlhbEJ5TmFtZShtLm5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIHNlbGVjdE1hdGVyaWFsQnlOYW1lKG5hbWUpIHtcbiAgICB0aGlzLm1hdGVyaWFsTmFtZSA9IG5hbWU7XG4gICAgdGhpcy5tYXRlcmlhbENvbmZpZyA9IHRoaXMubWF0ZXJpYWxzLmZpbHRlcih4ID0+IHgubWF0ZXJpYWxOYW1lID09PSBuYW1lKTtcbiAgICB0aGlzLm1hdGVyaWFsQ29uZmlnID0gdGhpcy5tYXRlcmlhbENvbmZpZ1swXTtcbiAgfVxuXG4gIGdldE1hdGVyaWFscyhjb25maWdzKSB7XG4gICAgaWYgKGNvbmZpZ3MpIHtcbiAgICAgIHRoaXMubWF0ZXJpYWxzID0gY29uZmlncztcbiAgICB9XG4gIH1cblxuICB1cGRhdGVNYXRlcmlhbChtYXRlcmlhbCwgJGV2ZW50KSB7XG4gICAgc3dpdGNoIChtYXRlcmlhbCkge1xuICAgICAgY2FzZSAnbWV0YWwnOiB7XG4gICAgICAgIHRoaXMubWF0ZXJpYWwuY2hhbm5lbHMuTWV0YWxuZXNzUEJSLmZhY3RvciA9ICRldmVudC52YWx1ZSAvIDEwMDtcbiAgICAgICAgdGhpcy5tYXRlcmlhbENvbmZpZy5jb25maWcubWV0YWxuZXNzID0gJGV2ZW50LnZhbHVlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgJ2Jhc2UtY29sb3InOiB7XG4gICAgICAgIHRoaXMubWF0ZXJpYWwuY2hhbm5lbHMuQWxiZWRvUEJSLmZhY3RvciA9ICRldmVudC52YWx1ZSAvIDEwMDtcbiAgICAgICAgdGhpcy5tYXRlcmlhbENvbmZpZy5jb25maWcuZGlmZnVzZSA9ICRldmVudC52YWx1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlICdyb3VnJzoge1xuICAgICAgICB0aGlzLm1hdGVyaWFsLmNoYW5uZWxzLlJvdWdobmVzc1BCUi5mYWN0b3IgPSAkZXZlbnQudmFsdWUgLyAxMDA7XG4gICAgICAgIHRoaXMubWF0ZXJpYWxDb25maWcuY29uZmlnLnJvdWdobmVzcyA9ICRldmVudC52YWx1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlICdub3JtYWwnOiB7XG4gICAgICAgIHRoaXMubWF0ZXJpYWwuY2hhbm5lbHMuTm9ybWFsTWFwLmVuYWJsZSA9ICRldmVudC5jaGVja2VkO1xuICAgICAgICB0aGlzLm1hdGVyaWFsQ29uZmlnLmNvbmZpZy5ub3JtYWwgPSAkZXZlbnQuY2hlY2tlZDtcbiAgICAgICAgaWYgKCRldmVudC5jaGVja2VkKSB7XG4gICAgICAgICAgdGhpcy5tYXRlcmlhbC5jaGFubmVscy5Ob3JtYWxNYXAuZmFjdG9yID0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm1hdGVyaWFsLmNoYW5uZWxzLk5vcm1hbE1hcC5mYWN0b3IgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSAnb3BhY2l0eSc6IHtcbiAgICAgICAgdGhpcy5tYXRlcmlhbC5jaGFubmVscy5PcGFjaXR5LmZhY3RvciA9ICRldmVudC52YWx1ZSAvIDEwMDtcbiAgICAgICAgdGhpcy5tYXRlcmlhbENvbmZpZy5jb25maWcub3BhY2l0eSA9ICRldmVudC52YWx1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuc2VuZE1hdGVyaWFsVG9VcGRhdGUoKTtcbiAgfVxuXG5cbiAgYWJsZVRvKHR5cGUpIHtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ21ldGFsJzpcbiAgICAgICAgdGhpcy5tYXRlcmlhbENvbmZpZy5jb25maWcubWV0YWxuZXNzRW5hYmxlZCA9ICF0aGlzLm1hdGVyaWFsQ29uZmlnLmNvbmZpZy5tZXRhbG5lc3NFbmFibGVkO1xuICAgICAgICB0aGlzLnNldFRleHR1cmUoJ21ldGFsJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnYmFzZS1jb2xvcic6XG4gICAgICAgIHRoaXMubWF0ZXJpYWxDb25maWcuY29uZmlnLmRpZmZ1c2VFbmFibGVkID0gIXRoaXMubWF0ZXJpYWxDb25maWcuY29uZmlnLmRpZmZ1c2VFbmFibGVkO1xuICAgICAgICB0aGlzLnNldFRleHR1cmUoJ2Jhc2UtY29sb3InKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyb3VnJzpcbiAgICAgICAgdGhpcy5tYXRlcmlhbENvbmZpZy5jb25maWcucm91Z2huZXNzRW5hYmxlZCA9ICF0aGlzLm1hdGVyaWFsQ29uZmlnLmNvbmZpZy5yb3VnaG5lc3NFbmFibGVkO1xuICAgICAgICB0aGlzLnNldFRleHR1cmUoJ3JvdWcnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdvcGFjaXR5JzpcbiAgICAgICAgdGhpcy5tYXRlcmlhbENvbmZpZy5jb25maWcub3BhY2l0eUVuYWJsZWQgPSAhdGhpcy5tYXRlcmlhbENvbmZpZy5jb25maWcub3BhY2l0eUVuYWJsZWQ7XG4gICAgICAgIHRoaXMuc2V0VGV4dHVyZSgnb3BhY2l0eScpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBzZXRUZXh0dXJlKHR5cGUpIHtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ21ldGFsJzpcbiAgICAgICAgaWYgKHRoaXMubWF0ZXJpYWwuY2hhbm5lbHMuTWV0YWxuZXNzUEJSLnRleHR1cmUpIHtcbiAgICAgICAgICBkZWxldGUgdGhpcy5tYXRlcmlhbC5jaGFubmVscy5NZXRhbG5lc3NQQlIudGV4dHVyZTtcbiAgICAgICAgICB0aGlzLm1hdGVyaWFsLmNoYW5uZWxzLk1ldGFsbmVzc1BCUi5jb2xvciA9IFsxLCAxLCAxXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkZWxldGUgdGhpcy5tYXRlcmlhbC5jaGFubmVscy5NZXRhbG5lc3NQQlIuY29sb3I7XG4gICAgICAgICAgdGhpcy5tYXRlcmlhbC5jaGFubmVscy5NZXRhbG5lc3NQQlIudGV4dHVyZSA9IHRoaXMuZ2V0VGV4dHVyZSh0aGlzLm1hdGVyaWFsQ29uZmlnLm1hdGVyaWFsTmFtZSArICdfTUVUQUxMSUMuanBnJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyb3VnJzpcbiAgICAgICAgaWYgKHRoaXMubWF0ZXJpYWwuY2hhbm5lbHMuUm91Z2huZXNzUEJSLnRleHR1cmUpIHtcbiAgICAgICAgICBkZWxldGUgdGhpcy5tYXRlcmlhbC5jaGFubmVscy5Sb3VnaG5lc3NQQlIudGV4dHVyZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm1hdGVyaWFsLmNoYW5uZWxzLlJvdWdobmVzc1BCUi50ZXh0dXJlID0gdGhpcy5nZXRUZXh0dXJlKHRoaXMubWF0ZXJpYWxDb25maWcubWF0ZXJpYWxOYW1lICsgJ19ST1VHSE5FU1MuanBnJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdvcGFjaXR5JzpcbiAgICAgICAgaWYgKHRoaXMubWF0ZXJpYWwuY2hhbm5lbHMuT3BhY2l0eS50ZXh0dXJlKSB7XG4gICAgICAgICAgZGVsZXRlIHRoaXMubWF0ZXJpYWwuY2hhbm5lbHMuT3BhY2l0eS50ZXh0dXJlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMubWF0ZXJpYWwuY2hhbm5lbHMuT3BhY2l0eS50ZXh0dXJlID0gdGhpcy5nZXRUZXh0dXJlKHRoaXMubWF0ZXJpYWxDb25maWcubWF0ZXJpYWxOYW1lICsgJ19UUkFOU1BBUkVOVC5qcGcnKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgdGhpcy5zZW5kTWF0ZXJpYWxUb1VwZGF0ZSgpO1xuICB9XG5cbiAgZ2V0VGV4dHVyZShuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMudGV4dHVyZXMuZmluZCh4ID0+IHgubmFtZSA9PT0gbmFtZSk7XG4gIH1cblxuICBzZW5kTWF0ZXJpYWxUb1VwZGF0ZSgpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMudXBkYXRlID0gdHJ1ZTtcbiAgICAgIHRoaXMubWF0ZXJpYWwgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMubWF0ZXJpYWwpKTtcbiAgICB9LCAyMDApO1xuICB9XG5cbiAgb25TYXZlKCkge1xuICAgIHRoaXMuZ2V0TWF0ZXJpYWxzU2tldGNoZmFiID0gdHJ1ZTtcbiAgfVxuXG4gIGdldEFsbE1hdGVyaWFscygkZXZlbnQpIHtcbiAgICBjb25zdCBtYXQgPSB7fTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgJGV2ZW50Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBtYXRbJGV2ZW50W2ldLmlkXSA9ICRldmVudFtpXTtcbiAgICB9XG5cbiAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICAnb3B0aW9ucyc6IHtcbiAgICAgICAgJ21hdGVyaWFscyc6IG1hdFxuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLmRlY1NrZXRjaGZhYlNlcnZpY2UucGFjaENvbmZpZ3ModGhpcy5hc3NldE1heC5mYnhGaWxlcy5mYnhBbGxHcm91cHNGaWxlLnNrZXRjaGZhYklkLCBjb25maWcpLnN1YnNjcmliZShyZXNwID0+IHtcbiAgICAgIHRoaXMuZ2V0TWF0ZXJpYWxzU2tldGNoZmFiID0gZmFsc2U7XG4gICAgICB0aGlzLnNhdmUuZW1pdCh0aGlzLmFzc2V0TWF4KTtcbiAgICB9KTtcbiAgfVxufVxuXG4iXX0=