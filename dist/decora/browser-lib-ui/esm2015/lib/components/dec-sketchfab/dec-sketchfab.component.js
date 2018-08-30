/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
        const /** @type {?} */ config = {
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
        let /** @type {?} */ mat = {};
        for (let /** @type {?} */ i = 0; i < $event.length; i++) {
            mat[$event[i].id] = $event[i];
        }
        const /** @type {?} */ config = {
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
    <dec-sketchfab-view [materialName]="materialName" 
        [sketchfabId]="sketchfabId" 
        [editMode]="editMode"
        [material]="material" 
        [update]="update"
        [getAllMaterials]="getMaterialsSketchfab"
        (sendMaterials)="getAllMaterials($event)"
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
            {{ 'label.polygon' | translate }}: {{ assetMax?.fbxFiles?.fbxAllGroupsFile?.fbxOriginalPolyCount }} - {{ 'label.current-polygon'
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
              <mat-checkbox class="check-box-normal-map" (input)="updateMaterial('normal', $event)" [(ngModel)]="checked" [labelPosition]="align">
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
</div>`,
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
function DecSketchfabComponent_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLXNrZXRjaGZhYi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGVjLXNrZXRjaGZhYi9kZWMtc2tldGNoZmFiLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQWlIOUQsTUFBTTs7OztJQXVDSixZQUFvQixtQkFBd0M7UUFBeEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtvQkF4QjNDLElBQUksWUFBWSxFQUFFO3dCQVV4QixJQUFJO3NCQUNOLEtBQUs7cUNBQ1UsS0FBSzt1QkFHbkIsSUFBSTs0QkFFQztZQUNiLEtBQUs7WUFDTCxLQUFLO1lBQ0wsUUFBUTtZQUNSLE1BQU07U0FDUDtLQUVnRTs7Ozs7SUFyQ2pFLElBQ0ksUUFBUSxDQUFDLENBQU07UUFDakIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ2hFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUM7U0FDNUM7S0FDRjs7OztJQUVELElBQUksUUFBUTtRQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0tBQ3ZCOzs7O0lBNEJELFFBQVE7S0FDUDs7Ozs7SUFFRCxpQkFBaUIsQ0FBQyxFQUFFO1FBQ2xCLHVCQUFNLE1BQU0sR0FBRztZQUNiLFNBQVMsRUFBRTtnQkFDVCxTQUFTLEVBQUUs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R0FBRztZQUNiLFNBQVMsRUFBRTtnQkFDVCxXQUFXLEVBQUUsR0FBRzthQUNqQjtTQUNGLENBQUM7UUFFRixJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDakgsSUFBSSxDQUFDLHFCQUFxQixHQUFHLEtBQUssQ0FBQztZQUNuQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDL0IsQ0FBQyxDQUFDO0tBQ0o7OztZQTVkRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTBHTDtnQkFDTCxNQUFNLEVBQUUsQ0FBQyxraEJBQWtoQixDQUFDO2FBQzdoQjs7OztZQWhIUSxtQkFBbUI7Ozt1QkFtSHpCLEtBQUs7bUJBYUwsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERlY1NrZXRjaGZhYlNlcnZpY2UgfSBmcm9tICcuL2RlYy1za2V0Y2hmYWIuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1za2V0Y2hmYWInLFxuICB0ZW1wbGF0ZTogYDxkaXYgZnhMYXlvdXQ9XCJjb2x1bW5cIiBjbGFzcz1cImNvbnRhaW5lclwiIGZ4TGF5b3V0R2FwPVwiMzJweFwiIGZ4TGF5b3V0QWxpZ249XCJzcGFjZS1iZXR3ZWVuIGNlbnRlclwiPlxuICAgIDxkZWMtc2tldGNoZmFiLXZpZXcgW21hdGVyaWFsTmFtZV09XCJtYXRlcmlhbE5hbWVcIiBcbiAgICAgICAgW3NrZXRjaGZhYklkXT1cInNrZXRjaGZhYklkXCIgXG4gICAgICAgIFtlZGl0TW9kZV09XCJlZGl0TW9kZVwiXG4gICAgICAgIFttYXRlcmlhbF09XCJtYXRlcmlhbFwiIFxuICAgICAgICBbdXBkYXRlXT1cInVwZGF0ZVwiXG4gICAgICAgIFtnZXRBbGxNYXRlcmlhbHNdPVwiZ2V0TWF0ZXJpYWxzU2tldGNoZmFiXCJcbiAgICAgICAgKHNlbmRNYXRlcmlhbHMpPVwiZ2V0QWxsTWF0ZXJpYWxzKCRldmVudClcIlxuICAgICAgICAobWF0ZXJpYWxTZWxlY3RlZCk9XCJtYXRlcmlhbFNlbGVjdGVkKCRldmVudClcIj5cbiAgICA8L2RlYy1za2V0Y2hmYWItdmlldz5cbiAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgc3R5bGU9XCJ3aWR0aDogMTAwJVwiIGZ4TGF5b3V0QWxpZ249XCJzcGFjZS1iZXR3ZWVuIHN0YXJ0XCIgZnhMYXlvdXRHYXA9XCIzMnB4XCI+XG4gICAgICAgIDxtYXQtZm9ybS1maWVsZCBmeEZsZXg9XCI0MFwiPlxuICAgICAgICAgICAgPG1hdC1zZWxlY3QgWyhuZ01vZGVsKV09XCJtYXRlcmlhbE5hbWVcIiBuYW1lPVwiY29uZmlnXCIgcGxhY2Vob2xkZXI9XCJNYXRlcmlhbCBJRFwiPlxuICAgICAgICAgICAgICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCBjb25maWcgb2YgYXNzZXRNYXg/LnJlbmRlck1hdGVyaWFsQ29uZmlnc1wiIFt2YWx1ZV09XCJjb25maWcubWF0ZXJpYWxOYW1lXCI+XG4gICAgICAgICAgICAgICAgICAgIHt7IGNvbmZpZy5tYXRlcmlhbE5hbWUgfX1cbiAgICAgICAgICAgICAgICA8L21hdC1vcHRpb24+XG4gICAgICAgICAgICA8L21hdC1zZWxlY3Q+XG4gICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG5cbiAgICAgICAgPGRpdiBmeEZsZXg9XCI2MFwiIGNsYXNzPVwicG9seWdvbi1jb3VudCBkZWMtY29sb3ItZ3JheSB0ZXh0LXJpZ2h0XCI+XG4gICAgICAgICAgICB7eyAnbGFiZWwucG9seWdvbicgfCB0cmFuc2xhdGUgfX06IHt7IGFzc2V0TWF4Py5mYnhGaWxlcz8uZmJ4QWxsR3JvdXBzRmlsZT8uZmJ4T3JpZ2luYWxQb2x5Q291bnQgfX0gLSB7eyAnbGFiZWwuY3VycmVudC1wb2x5Z29uJ1xuICAgICAgICAgICAgfCB0cmFuc2xhdGUgfX0ge3sgYXNzZXRNYXg/LmZieEZpbGVzPy5mYnhBbGxHcm91cHNGaWxlPy5mYnhQb2x5Q291bnQgfX1cbiAgICAgICAgPC9kaXY+XG5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgKm5nSWY9XCJtYXRlcmlhbENvbmZpZ1wiIGZ4TGF5b3V0PVwicm93XCIgY2xhc3M9XCJyb3ctc2l6ZVwiIGZ4TGF5b3V0QWxpZ249XCJzcGFjZS1iZXR3ZWVuIHN0YXJ0XCIgZnhMYXlvdXRHYXA9XCIxNnB4XCI+XG4gICAgICAgIDxkaXYgZnhGbGV4PVwiMzBcIiBmeExheW91dD1cImNvbHVtblwiIGZ4TGF5b3V0R2FwPVwiOHB4XCI+XG4gICAgICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwiY29sdW1uXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJzdGFydCBzdGFydFwiIGNsYXNzPVwicm93LXNwYW4taWNvblwiIGZ4TGF5b3V0R2FwPVwiOHB4XCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic2V0dGluZy1uYW1lXCI+QmFzZSBDb2xvciB7eyBtYXRlcmlhbENvbmZpZz8uY29uZmlnPy5kaWZmdXNlIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJtZC1zcGFuLWljb24gY2xpY2tcIiAoY2xpY2spPVwiYWJsZVRvKCdiYXNlLWNvbG9yJylcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt7IG1hdGVyaWFsQ29uZmlnPy5jb25maWc/LmRpZmZ1c2VFbmFibGVkID8gJ2xvY2tfb3BlbicgOiAnbG9ja19vdXRsaW5lJyB9fVxuICAgICAgICAgICAgICAgICAgICA8L21hdC1pY29uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxtYXQtc2xpZGVyIGNsYXNzPVwic2xpZGVyLXBvc2l0aW9uXCIgW21heF09XCIxMDBcIiBbbWluXT1cIjBcIiBbc3RlcF09XCIxXCIgW2Rpc2FibGVkXT1cIiFtYXRlcmlhbENvbmZpZz8uY29uZmlnPy5kaWZmdXNlRW5hYmxlZFwiXG4gICAgICAgICAgICAgICAgICAgIFsobmdNb2RlbCldPVwibWF0ZXJpYWxDb25maWcuY29uZmlnLmRpZmZ1c2VcIiAoaW5wdXQpPVwidXBkYXRlTWF0ZXJpYWwoJ2Jhc2UtY29sb3InLCAkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgPC9tYXQtc2xpZGVyPlxuXG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBmeExheW91dD1cImNvbHVtblwiPlxuICAgICAgICAgICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwic3RhcnQgc3RhcnRcIiBjbGFzcz1cInJvdy1zcGFuLWljb25cIiBmeExheW91dEdhcD1cIjhweFwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNldHRpbmctbmFtZVwiPlJvdWdobmVzcyB7eyBtYXRlcmlhbENvbmZpZz8uY29uZmlnPy5yb3VnaG5lc3MgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cIm1kLXNwYW4taWNvbiBjbGlja1wiIChjbGljayk9XCJhYmxlVG8oJ3JvdWcnKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge3sgbWF0ZXJpYWxDb25maWc/LmNvbmZpZz8ucm91Z2huZXNzRW5hYmxlZCA/ICdsb2NrX29wZW4nIDogJ2xvY2tfb3V0bGluZScgfX1cbiAgICAgICAgICAgICAgICAgICAgPC9tYXQtaWNvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8bWF0LXNsaWRlciBjbGFzcz1cInNsaWRlci1wb3NpdGlvblwiIFttYXhdPVwiMTAwXCIgW21pbl09XCIwXCIgW3N0ZXBdPVwiMVwiIFtkaXNhYmxlZF09XCIhbWF0ZXJpYWxDb25maWc/LmNvbmZpZz8ucm91Z2huZXNzRW5hYmxlZFwiXG4gICAgICAgICAgICAgICAgICAgIFsobmdNb2RlbCldPVwibWF0ZXJpYWxDb25maWcuY29uZmlnLnJvdWdobmVzc1wiIChpbnB1dCk9XCJ1cGRhdGVNYXRlcmlhbCgncm91ZycsICRldmVudClcIj5cbiAgICAgICAgICAgICAgICA8L21hdC1zbGlkZXI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBmeEZsZXg9XCIzMFwiIGZ4TGF5b3V0PVwiY29sdW1uXCIgZnhMYXlvdXRHYXA9XCI4cHhcIj5cblxuICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgICAgIDxtYXQtc2VsZWN0IGNsYXNzPVwicG9seWdvbi1zZWxlY3RcIiBmeEZpbGwgWyhuZ01vZGVsKV09XCJtYXRlcmlhbENvbmZpZy5hZGp1c3RPcHRpbWl6ZVwiIG5hbWU9XCJjb25maWdcIiBwbGFjZWhvbGRlcj1cInt7ICdsYWJlbC5wb2x5Z29uLXJlZHVjdGlvbicgfCB0cmFuc2xhdGUgfX1cIj5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1vcHRpb24gKm5nRm9yPVwibGV0IGNvbmZpZyBvZiBjb25maWdTZWxlY3RcIiBbdmFsdWVdPVwiY29uZmlnXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7eyAnbGFiZWwuJytjb25maWcgfCB0cmFuc2xhdGUgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicG9zaXRpb24tcG9seWdvbi1udW1iZXIgZ3JheVwiICpuZ0lmPVwiY29uZmlnID09PSAnT0ZGJ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IG1hdGVyaWFsQ29uZmlnPy5mYnhQb2x5Q291bnRPcmlnaW59fVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwb3NpdGlvbi1wb2x5Z29uLW51bWJlciBncmF5XCIgKm5nSWY9XCJtYXRlcmlhbENvbmZpZz8uYWRqdXN0T3B0aW1pemUgPT09IGNvbmZpZ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IG1hdGVyaWFsQ29uZmlnPy5mYnhQb2x5Q291bnR9fVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L21hdC1vcHRpb24+XG4gICAgICAgICAgICAgICAgPC9tYXQtc2VsZWN0PlxuICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cblxuICAgICAgICAgICAgPGRpdiBmeExheW91dD1cImNvbHVtblwiIGNsYXNzPVwibWV0YWxuZXNzLXBvc2l0aW9uXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJzdGFydCBzdGFydFwiIGNsYXNzPVwicm93LXNwYW4taWNvblwiIGZ4TGF5b3V0R2FwPVwiOHB4XCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic2V0dGluZy1uYW1lXCI+TWV0YWxuZXNzIHt7IG1hdGVyaWFsQ29uZmlnPy5jb25maWc/Lm1ldGFsbmVzcyB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwibWQtc3Bhbi1pY29uIGNsaWNrXCIgKGNsaWNrKT1cImFibGVUbygnbWV0YWwnKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge3sgbWF0ZXJpYWxDb25maWc/LmNvbmZpZz8ubWV0YWxuZXNzRW5hYmxlZCA/ICdsb2NrX29wZW4nIDogJ2xvY2tfb3V0bGluZScgfX1cbiAgICAgICAgICAgICAgICAgICAgPC9tYXQtaWNvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8bWF0LXNsaWRlciBjbGFzcz1cInNsaWRlci1wb3NpdGlvblwiIFttYXhdPVwiMTAwXCIgW21pbl09XCIwXCIgW3N0ZXBdPVwiMVwiIFtkaXNhYmxlZF09XCIhbWF0ZXJpYWxDb25maWc/LmNvbmZpZz8ubWV0YWxuZXNzRW5hYmxlZFwiXG4gICAgICAgICAgICAgICAgICAgIFsobmdNb2RlbCldPVwibWF0ZXJpYWxDb25maWcuY29uZmlnLm1ldGFsbmVzc1wiIChpbnB1dCk9XCJ1cGRhdGVNYXRlcmlhbCgnbWV0YWwnLCAkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgPC9tYXQtc2xpZGVyPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBmeEZsZXg9XCIzMFwiIGZ4TGF5b3V0PVwiY29sdW1uXCIgZnhMYXlvdXRHYXA9XCI4cHhcIj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxtYXQtY2hlY2tib3ggY2xhc3M9XCJjaGVjay1ib3gtbm9ybWFsLW1hcFwiIChpbnB1dCk9XCJ1cGRhdGVNYXRlcmlhbCgnbm9ybWFsJywgJGV2ZW50KVwiIFsobmdNb2RlbCldPVwiY2hlY2tlZFwiIFtsYWJlbFBvc2l0aW9uXT1cImFsaWduXCI+XG4gICAgICAgICAgICAgICAgTm9ybWFsIE1hcFxuICAgICAgICAgICAgICA8L21hdC1jaGVja2JveD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBmeExheW91dD1cImNvbHVtblwiIGNsYXNzPVwib3BhY2l0eS1wb3NpdGlvblwiIGZ4TGF5b3V0R2FwPVwiOHB4XCI+XG4gICAgICAgICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwic3RhcnQgc3RhcnRcIiBjbGFzcz1cIm9wYWNpdHktcG9zaXRpb24tdGV4dFwiIGZ4TGF5b3V0R2FwPVwiOHB4XCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzZXR0aW5nLW5hbWVcIj5PcGFjaXR5IHt7IG1hdGVyaWFsQ29uZmlnPy5jb25maWc/Lm9wYWNpdHkgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwibWQtc3Bhbi1pY29uIGNsaWNrXCIgKGNsaWNrKT1cImFibGVUbygnb3BhY2l0eScpXCI+XG4gICAgICAgICAgICAgICAgICB7eyBtYXRlcmlhbENvbmZpZz8uY29uZmlnPy5vcGFjaXR5RW5hYmxlZCA/ICdsb2NrX29wZW4nIDogJ2xvY2tfb3V0bGluZScgfX1cbiAgICAgICAgICAgICAgICA8L21hdC1pY29uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPG1hdC1zbGlkZXIgY2xhc3M9XCJzbGlkZXItcG9zaXRpb25cIiBbbWF4XT1cIjEwMFwiIFttaW5dPVwiMFwiIFtzdGVwXT1cIjFcIiBbZGlzYWJsZWRdPVwiIW1hdGVyaWFsQ29uZmlnPy5jb25maWc/Lm9wYWNpdHlFbmFibGVkXCJcbiAgICAgICAgICAgICAgICBbKG5nTW9kZWwpXT1cIm1hdGVyaWFsQ29uZmlnLmNvbmZpZy5vcGFjaXR5XCIgKGlucHV0KT1cInVwZGF0ZU1hdGVyaWFsKCdvcGFjaXR5JywgJGV2ZW50KVwiPlxuICAgICAgICAgICAgICA8L21hdC1zbGlkZXI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwidGV4dC1yaWdodCBzYXZlLWJ1dHRvbi1kaXZcIj5cbiAgICAgICAgPGJ1dHRvbiBtYXQtcmFpc2VkLWJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY29sb3I9XCJwcmltYXJ5XCIgKGNsaWNrKT1cIm9uU2F2ZSgpXCI+e3sgJ2xhYmVsLnNhdmUnIHwgdHJhbnNsYXRlIH19PC9idXR0b24+XG4gICAgPC9kaXY+XG48L2Rpdj5gLFxuICBzdHlsZXM6IFtgLmNvbnRhaW5lcnttYXgtd2lkdGg6NjIwcHghaW1wb3J0YW50fS5zZXR0aW5nLW5hbWV7d2lkdGg6MTAwcHg7ZGlzcGxheTppbmxpbmUtYmxvY2t9Lm1kLXNwYW4taWNvbntwb3NpdGlvbjpyZWxhdGl2ZTt0b3A6LTVweDtsZWZ0Oi01cHh9LnNsaWRlci1wb3NpdGlvbntwb3NpdGlvbjpyZWxhdGl2ZTtsZWZ0Oi04cHg7dG9wOi04cHh9LnJvdy1zaXple3dpZHRoOjEwMCV9LnBvbHlnb24tc2VsZWN0e3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDotNXB4fS5tZXRhbG5lc3MtcG9zaXRpb257cG9zaXRpb246cmVsYXRpdmU7dG9wOjE2cHh9LnBvbHlnb24tY291bnR7Zm9udC1zaXplOjEycHg7cG9zaXRpb246cmVsYXRpdmU7dG9wOjI3cHh9Lm9wYWNpdHktcG9zaXRpb257cG9zaXRpb246cmVsYXRpdmU7dG9wOjQwcHh9Lm9wYWNpdHktcG9zaXRpb24tdGV4dHtwb3NpdGlvbjpyZWxhdGl2ZTt0b3A6OHB4fS5jaGVjay1ib3gtbm9ybWFsLW1hcHtwb3NpdGlvbjpyZWxhdGl2ZTt0b3A6MThweH0uc2F2ZS1idXR0b24tZGl2e3dpZHRoOjEwMCV9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjU2tldGNoZmFiQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKVxuICBzZXQgYXNzZXRNYXgodjogYW55KSB7XG4gICAgaWYgKHYpIHtcbiAgICAgIHRoaXMuX2Fzc2V0TWF4ID0gdjtcbiAgICAgIHRoaXMuZW52aXJvbm1lbnRDb25maWcodi5mYnhGaWxlcy5mYnhBbGxHcm91cHNGaWxlLnNrZXRjaGZhYklkKTtcbiAgICAgIHRoaXMuZ2V0TWF0ZXJpYWxzKHYucmVuZGVyTWF0ZXJpYWxDb25maWdzKTtcbiAgICB9XG4gIH1cblxuICBnZXQgYXNzZXRNYXgoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fYXNzZXRNYXg7XG4gIH1cblxuICBAT3V0cHV0KCkgc2F2ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBfYXNzZXRNYXg6IGFueTtcbiAgc2tldGNoZmFiSWQ6IHN0cmluZztcblxuICBtYXRlcmlhbDogYW55O1xuICBtYXRlcmlhbENvbmZpZzogYW55O1xuICBtYXRlcmlhbE5hbWU6IHN0cmluZztcbiAgbWF0ZXJpYWxzOiBhbnk7XG4gIHRleHR1cmVzOiBhbnk7XG4gIGVkaXRNb2RlID0gdHJ1ZTtcbiAgdXBkYXRlID0gZmFsc2U7XG4gIGdldE1hdGVyaWFsc1NrZXRjaGZhYiA9IGZhbHNlO1xuXG4gIGFsaWduOiAnc3RhcnQnO1xuICBjaGVja2VkID0gdHJ1ZTtcblxuICBjb25maWdTZWxlY3QgPSBbXG4gICAgJ09GRicsXG4gICAgJ0xPVycsXG4gICAgJ01FRElVTScsXG4gICAgJ0hJR0gnXG4gIF07XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkZWNTa2V0Y2hmYWJTZXJ2aWNlOiBEZWNTa2V0Y2hmYWJTZXJ2aWNlKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIGVudmlyb25tZW50Q29uZmlnKGlkKSB7XG4gICAgY29uc3QgY29uZmlnID0ge1xuICAgICAgXCJvcHRpb25zXCI6IHtcbiAgICAgICAgXCJ2ZXJzaW9uXCI6IDcsXG4gICAgICAgIFwiYmFja2dyb3VuZFwiOiB7XG4gICAgICAgICAgXCJlbmFibGVcIjogXCJhbWJpZW50XCIsXG4gICAgICAgICAgXCJ1aWRcIjogXCI1MWFmNmE4NzBjY2U0NDllYjc1YjAzNDVmZWViYWViYlwiLFxuICAgICAgICAgIFwiY29sb3JcIjogW1xuICAgICAgICAgICAgMC4yLFxuICAgICAgICAgICAgMC4yLFxuICAgICAgICAgICAgMC4yXG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICBcImVudmlyb25tZW50XCI6IHtcbiAgICAgICAgICBcImVuYWJsZVwiOiB0cnVlLFxuICAgICAgICAgIFwiYmFja2dyb3VuZEV4cG9zdXJlXCI6IDEsXG4gICAgICAgICAgXCJleHBvc3VyZVwiOiAyLjIwMDAwMDAwMDAwMDAwMSxcbiAgICAgICAgICBcInJvdGF0aW9uXCI6IDQuNzEyMzg4OTgwMzg0NjksXG4gICAgICAgICAgXCJ1aWRcIjogXCI4YTQwNzRhYzhhM2E0YjgzYmYxZjZhMTc3YTBmOWEzNFwiLFxuICAgICAgICAgIFwiYmx1clwiOiAwLjEsXG4gICAgICAgICAgXCJzaGFkb3dFbmFibGVcIjogZmFsc2UsXG4gICAgICAgICAgXCJsaWdodEludGVuc2l0eVwiOiA1LFxuICAgICAgICAgIFwic2hhZG93Qmlhc1wiOiAwLjAwNVxuICAgICAgICB9LFxuICAgICAgICBcImxpZ2h0aW5nXCI6IHtcbiAgICAgICAgICBcImVuYWJsZVwiOiBmYWxzZSxcbiAgICAgICAgICBcImxpZ2h0c1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcIkRJUkVDVElPTlwiLFxuICAgICAgICAgICAgICBcImVuYWJsZVwiOiB0cnVlLFxuICAgICAgICAgICAgICBcImNvbG9yXCI6IFtcbiAgICAgICAgICAgICAgICAwLjc4MDYxMjI0NDksXG4gICAgICAgICAgICAgICAgMC43OTg1MjE0NDk0LFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgXCJpbnRlbnNpdHlcIjogMC45NixcbiAgICAgICAgICAgICAgXCJncm91bmRcIjogW1xuICAgICAgICAgICAgICAgIDAuMyxcbiAgICAgICAgICAgICAgICAwLjIsXG4gICAgICAgICAgICAgICAgMC4yXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIFwiaW50ZW5zaXR5R3JvdW5kXCI6IDEsXG4gICAgICAgICAgICAgIFwibWF0cml4XCI6IFtcbiAgICAgICAgICAgICAgICAtMC45ODE1ODA0NSxcbiAgICAgICAgICAgICAgICAwLjE5MDk5MjIxNjcsXG4gICAgICAgICAgICAgICAgLTAuMDA0NjY4MzI3MyxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDAuMTM1NDgzNDcxLFxuICAgICAgICAgICAgICAgIDAuNzEzMTEyNjA2MixcbiAgICAgICAgICAgICAgICAwLjY4NzgzMzI5MzcsXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwLjEzNDY5OTg0ODYsXG4gICAgICAgICAgICAgICAgMC42NzQ1MzEyMzI4LFxuICAgICAgICAgICAgICAgIC0wLjcyNTg1MzY4MTQsXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICA2Ljg5NzQ3NTMxMTksXG4gICAgICAgICAgICAgICAgMzQuNTM5OTExNDMyOCxcbiAgICAgICAgICAgICAgICAtMS4yNzI1NTcwOTE3LFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgXCJmYWxsb2ZmXCI6IDAuMDAwOTUzNDU4NixcbiAgICAgICAgICAgICAgXCJhdHRhY2hlZFRvQ2FtZXJhXCI6IGZhbHNlLFxuICAgICAgICAgICAgICBcImFuZ2xlXCI6IDQ1LFxuICAgICAgICAgICAgICBcImhhcmRuZXNzXCI6IDAuNSxcbiAgICAgICAgICAgICAgXCJjYXN0U2hhZG93c1wiOiBmYWxzZSxcbiAgICAgICAgICAgICAgXCJzaGFkb3dCaWFzXCI6IDAuMDA1XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJESVJFQ1RJT05cIixcbiAgICAgICAgICAgICAgXCJlbmFibGVcIjogdHJ1ZSxcbiAgICAgICAgICAgICAgXCJjb2xvclwiOiBbXG4gICAgICAgICAgICAgICAgMSxcbiAgICAgICAgICAgICAgICAwLjg3ODMzMTk0NSxcbiAgICAgICAgICAgICAgICAwLjcwOTE4MzY3MzVcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgXCJpbnRlbnNpdHlcIjogMSxcbiAgICAgICAgICAgICAgXCJncm91bmRcIjogW1xuICAgICAgICAgICAgICAgIDAuMyxcbiAgICAgICAgICAgICAgICAwLjIsXG4gICAgICAgICAgICAgICAgMC4yXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIFwiaW50ZW5zaXR5R3JvdW5kXCI6IDEsXG4gICAgICAgICAgICAgIFwibWF0cml4XCI6IFtcbiAgICAgICAgICAgICAgICAwLjc3NTUyMTE0OTUsXG4gICAgICAgICAgICAgICAgLTAuMDY2NjYwMjg2LFxuICAgICAgICAgICAgICAgIDAuNjI3NzkyNDQ0MixcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDAuMjY5MDQ4MzczNyxcbiAgICAgICAgICAgICAgICAwLjkzNDQ4NDY1MjMsXG4gICAgICAgICAgICAgICAgLTAuMjMzMTMzODgyNSxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIC0wLjU3MTEyMTYzMjYsXG4gICAgICAgICAgICAgICAgMC4zNDk3MDY3OTI3LFxuICAgICAgICAgICAgICAgIDAuNzQyNjQ3NDUzMyxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIC0yOS4yNDQ2NzIzMzYyLFxuICAgICAgICAgICAgICAgIDE3LjkwNzAxODg1NjEsXG4gICAgICAgICAgICAgICAgNzMuOTIzMjA1OTI1NyxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIFwiZmFsbG9mZlwiOiAwLjAwMDk1MzQ1ODYsXG4gICAgICAgICAgICAgIFwiYXR0YWNoZWRUb0NhbWVyYVwiOiBmYWxzZSxcbiAgICAgICAgICAgICAgXCJhbmdsZVwiOiA0NSxcbiAgICAgICAgICAgICAgXCJoYXJkbmVzc1wiOiAwLjUsXG4gICAgICAgICAgICAgIFwiY2FzdFNoYWRvd3NcIjogZmFsc2UsXG4gICAgICAgICAgICAgIFwic2hhZG93Qmlhc1wiOiAwLjAwNVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiRElSRUNUSU9OXCIsXG4gICAgICAgICAgICAgIFwiZW5hYmxlXCI6IHRydWUsXG4gICAgICAgICAgICAgIFwiY29sb3JcIjogW1xuICAgICAgICAgICAgICAgIDAuNDIzNDY5Mzg3OCxcbiAgICAgICAgICAgICAgICAwLjczNTI2NjU1NTYsXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBcImludGVuc2l0eVwiOiAwLjEyLFxuICAgICAgICAgICAgICBcImdyb3VuZFwiOiBbXG4gICAgICAgICAgICAgICAgMC45NjQyODU3MTQzLFxuICAgICAgICAgICAgICAgIDAuNjQ4NDEyODYzNyxcbiAgICAgICAgICAgICAgICAwLjI2MDc1MDcyODlcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgXCJpbnRlbnNpdHlHcm91bmRcIjogMC4wNixcbiAgICAgICAgICAgICAgXCJtYXRyaXhcIjogW1xuICAgICAgICAgICAgICAgIDAuNjkwMzI5OTEzMSxcbiAgICAgICAgICAgICAgICAtMC43MDc2MzYzNjY5LFxuICAgICAgICAgICAgICAgIC0wLjE1MDY0OTg2OTksXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAtMC4wMTEwODk2OTgyLFxuICAgICAgICAgICAgICAgIDAuMTk3ODUxMzczLFxuICAgICAgICAgICAgICAgIC0wLjk4MDE2OTI5OCxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDAuNzIzNDA5NzI0NixcbiAgICAgICAgICAgICAgICAwLjY3ODMxMDg0NzksXG4gICAgICAgICAgICAgICAgMC4xMjg3MzUyNDc0LFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMzcuMDQyODMwNTE3NyxcbiAgICAgICAgICAgICAgICAzNC43MzM0NDk2MTc2LFxuICAgICAgICAgICAgICAgIDQyLjQ4NzM0NTQ2ODUsXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBcImZhbGxvZmZcIjogMC4wMDA5NTM0NTg2LFxuICAgICAgICAgICAgICBcImF0dGFjaGVkVG9DYW1lcmFcIjogZmFsc2UsXG4gICAgICAgICAgICAgIFwiYW5nbGVcIjogNDUsXG4gICAgICAgICAgICAgIFwiaGFyZG5lc3NcIjogMC41LFxuICAgICAgICAgICAgICBcImNhc3RTaGFkb3dzXCI6IGZhbHNlLFxuICAgICAgICAgICAgICBcInNoYWRvd0JpYXNcIjogMC4wMDVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIFwib3JpZW50YXRpb25cIjoge1xuICAgICAgICAgIFwibWF0cml4XCI6IFtcbiAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMSxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAxLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5kZWNTa2V0Y2hmYWJTZXJ2aWNlLnBhY2hDb25maWdzKGlkLCBjb25maWcpLnN1YnNjcmliZShyZXNwID0+IHtcbiAgICAgIHRoaXMuZGVjU2tldGNoZmFiU2VydmljZS5nZXRBbGxUZXh0dXJlcyhpZCkuc3Vic2NyaWJlKHRleHR1cmVSZXNwID0+IHtcbiAgICAgICAgaWYgKHRleHR1cmVSZXNwKSB7XG4gICAgICAgICAgdGhpcy5za2V0Y2hmYWJJZCA9IGlkO1xuICAgICAgICAgIHRoaXMudGV4dHVyZXMgPSB0ZXh0dXJlUmVzcC5yZXN1bHRzO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pO1xuICB9XG5cbiAgbWF0ZXJpYWxTZWxlY3RlZChtKSB7XG4gICAgaWYgKG0pIHtcbiAgICAgIHRoaXMudXBkYXRlID0gZmFsc2U7XG4gICAgICB0aGlzLm1hdGVyaWFsID0gbTtcbiAgICAgIHRoaXMuc2VsZWN0TWF0ZXJpYWxCeU5hbWUobS5uYW1lKTtcbiAgICB9XG4gIH1cblxuICBzZWxlY3RNYXRlcmlhbEJ5TmFtZShuYW1lKSB7XG4gICAgdGhpcy5tYXRlcmlhbE5hbWUgPSBuYW1lO1xuICAgIHRoaXMubWF0ZXJpYWxDb25maWcgPSB0aGlzLm1hdGVyaWFscy5maWx0ZXIoeCA9PiB4Lm1hdGVyaWFsTmFtZSA9PT0gbmFtZSk7XG4gICAgdGhpcy5tYXRlcmlhbENvbmZpZyA9IHRoaXMubWF0ZXJpYWxDb25maWdbMF07XG4gIH1cblxuICBnZXRNYXRlcmlhbHMoY29uZmlncykge1xuICAgIGlmIChjb25maWdzKSB7XG4gICAgICB0aGlzLm1hdGVyaWFscyA9IGNvbmZpZ3M7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlTWF0ZXJpYWwobWF0ZXJpYWwsICRldmVudCkge1xuICAgIHN3aXRjaCAobWF0ZXJpYWwpIHtcbiAgICAgIGNhc2UgJ21ldGFsJzoge1xuICAgICAgICB0aGlzLm1hdGVyaWFsLmNoYW5uZWxzLk1ldGFsbmVzc1BCUi5mYWN0b3IgPSAkZXZlbnQudmFsdWUgLyAxMDA7XG4gICAgICAgIHRoaXMubWF0ZXJpYWxDb25maWcuY29uZmlnLm1ldGFsbmVzcyA9ICRldmVudC52YWx1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlICdiYXNlLWNvbG9yJzoge1xuICAgICAgICB0aGlzLm1hdGVyaWFsLmNoYW5uZWxzLkFsYmVkb1BCUi5mYWN0b3IgPSAkZXZlbnQudmFsdWUgLyAxMDA7XG4gICAgICAgIHRoaXMubWF0ZXJpYWxDb25maWcuY29uZmlnLmRpZmZ1c2UgPSAkZXZlbnQudmFsdWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSAncm91Zyc6IHtcbiAgICAgICAgdGhpcy5tYXRlcmlhbC5jaGFubmVscy5Sb3VnaG5lc3NQQlIuZmFjdG9yID0gJGV2ZW50LnZhbHVlIC8gMTAwO1xuICAgICAgICB0aGlzLm1hdGVyaWFsQ29uZmlnLmNvbmZpZy5yb3VnaG5lc3MgPSAkZXZlbnQudmFsdWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSAnbm9ybWFsJzoge1xuICAgICAgICB0aGlzLm1hdGVyaWFsLmNoYW5uZWxzLk5vcm1hbE1hcC5lbmFibGUgPSAkZXZlbnQuY2hlY2tlZDtcbiAgICAgICAgdGhpcy5tYXRlcmlhbENvbmZpZy5jb25maWcubm9ybWFsID0gJGV2ZW50LmNoZWNrZWQ7XG4gICAgICAgIGlmICgkZXZlbnQuY2hlY2tlZCkge1xuICAgICAgICAgIHRoaXMubWF0ZXJpYWwuY2hhbm5lbHMuTm9ybWFsTWFwLmZhY3RvciA9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5tYXRlcmlhbC5jaGFubmVscy5Ob3JtYWxNYXAuZmFjdG9yID0gMDtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgJ29wYWNpdHknOiB7XG4gICAgICAgIHRoaXMubWF0ZXJpYWwuY2hhbm5lbHMuT3BhY2l0eS5mYWN0b3IgPSAkZXZlbnQudmFsdWUgLyAxMDA7XG4gICAgICAgIHRoaXMubWF0ZXJpYWxDb25maWcuY29uZmlnLm9wYWNpdHkgPSAkZXZlbnQudmFsdWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnNlbmRNYXRlcmlhbFRvVXBkYXRlKCk7XG4gIH1cblxuXG4gIGFibGVUbyh0eXBlKSB7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdtZXRhbCc6XG4gICAgICAgIHRoaXMubWF0ZXJpYWxDb25maWcuY29uZmlnLm1ldGFsbmVzc0VuYWJsZWQgPSAhdGhpcy5tYXRlcmlhbENvbmZpZy5jb25maWcubWV0YWxuZXNzRW5hYmxlZDtcbiAgICAgICAgdGhpcy5zZXRUZXh0dXJlKCdtZXRhbCcpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2Jhc2UtY29sb3InOlxuICAgICAgICB0aGlzLm1hdGVyaWFsQ29uZmlnLmNvbmZpZy5kaWZmdXNlRW5hYmxlZCA9ICF0aGlzLm1hdGVyaWFsQ29uZmlnLmNvbmZpZy5kaWZmdXNlRW5hYmxlZDtcbiAgICAgICAgdGhpcy5zZXRUZXh0dXJlKCdiYXNlLWNvbG9yJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncm91Zyc6XG4gICAgICAgIHRoaXMubWF0ZXJpYWxDb25maWcuY29uZmlnLnJvdWdobmVzc0VuYWJsZWQgPSAhdGhpcy5tYXRlcmlhbENvbmZpZy5jb25maWcucm91Z2huZXNzRW5hYmxlZDtcbiAgICAgICAgdGhpcy5zZXRUZXh0dXJlKCdyb3VnJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnb3BhY2l0eSc6XG4gICAgICAgIHRoaXMubWF0ZXJpYWxDb25maWcuY29uZmlnLm9wYWNpdHlFbmFibGVkID0gIXRoaXMubWF0ZXJpYWxDb25maWcuY29uZmlnLm9wYWNpdHlFbmFibGVkO1xuICAgICAgICB0aGlzLnNldFRleHR1cmUoJ29wYWNpdHknKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgc2V0VGV4dHVyZSh0eXBlKSB7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdtZXRhbCc6XG4gICAgICAgIGlmICh0aGlzLm1hdGVyaWFsLmNoYW5uZWxzLk1ldGFsbmVzc1BCUi50ZXh0dXJlKSB7XG4gICAgICAgICAgZGVsZXRlIHRoaXMubWF0ZXJpYWwuY2hhbm5lbHMuTWV0YWxuZXNzUEJSLnRleHR1cmU7XG4gICAgICAgICAgdGhpcy5tYXRlcmlhbC5jaGFubmVscy5NZXRhbG5lc3NQQlIuY29sb3IgPSBbMSwgMSwgMV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGVsZXRlIHRoaXMubWF0ZXJpYWwuY2hhbm5lbHMuTWV0YWxuZXNzUEJSLmNvbG9yO1xuICAgICAgICAgIHRoaXMubWF0ZXJpYWwuY2hhbm5lbHMuTWV0YWxuZXNzUEJSLnRleHR1cmUgPSB0aGlzLmdldFRleHR1cmUodGhpcy5tYXRlcmlhbENvbmZpZy5tYXRlcmlhbE5hbWUgKyAnX01FVEFMTElDLmpwZycpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncm91Zyc6XG4gICAgICAgIGlmICh0aGlzLm1hdGVyaWFsLmNoYW5uZWxzLlJvdWdobmVzc1BCUi50ZXh0dXJlKSB7XG4gICAgICAgICAgZGVsZXRlIHRoaXMubWF0ZXJpYWwuY2hhbm5lbHMuUm91Z2huZXNzUEJSLnRleHR1cmU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5tYXRlcmlhbC5jaGFubmVscy5Sb3VnaG5lc3NQQlIudGV4dHVyZSA9IHRoaXMuZ2V0VGV4dHVyZSh0aGlzLm1hdGVyaWFsQ29uZmlnLm1hdGVyaWFsTmFtZSArICdfUk9VR0hORVNTLmpwZycpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnb3BhY2l0eSc6XG4gICAgICAgIGlmICh0aGlzLm1hdGVyaWFsLmNoYW5uZWxzLk9wYWNpdHkudGV4dHVyZSkge1xuICAgICAgICAgIGRlbGV0ZSB0aGlzLm1hdGVyaWFsLmNoYW5uZWxzLk9wYWNpdHkudGV4dHVyZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm1hdGVyaWFsLmNoYW5uZWxzLk9wYWNpdHkudGV4dHVyZSA9IHRoaXMuZ2V0VGV4dHVyZSh0aGlzLm1hdGVyaWFsQ29uZmlnLm1hdGVyaWFsTmFtZSArICdfVFJBTlNQQVJFTlQuanBnJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHRoaXMuc2VuZE1hdGVyaWFsVG9VcGRhdGUoKTtcbiAgfVxuXG4gIGdldFRleHR1cmUobmFtZSkge1xuICAgIHJldHVybiB0aGlzLnRleHR1cmVzLmZpbmQoeCA9PiB4Lm5hbWUgPT09IG5hbWUpO1xuICB9XG5cbiAgc2VuZE1hdGVyaWFsVG9VcGRhdGUoKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnVwZGF0ZSA9IHRydWU7XG4gICAgICB0aGlzLm1hdGVyaWFsID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLm1hdGVyaWFsKSk7XG4gICAgfSwgMjAwKTtcbiAgfVxuXG4gIG9uU2F2ZSgpIHtcbiAgICB0aGlzLmdldE1hdGVyaWFsc1NrZXRjaGZhYiA9IHRydWU7IFxuICB9XG5cbiAgZ2V0QWxsTWF0ZXJpYWxzKCRldmVudCkge1xuICAgIGxldCBtYXQgPSB7fTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgJGV2ZW50Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBtYXRbJGV2ZW50W2ldLmlkXSA9ICRldmVudFtpXTtcbiAgICB9XG5cbiAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICAnb3B0aW9ucyc6IHtcbiAgICAgICAgJ21hdGVyaWFscyc6IG1hdFxuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLmRlY1NrZXRjaGZhYlNlcnZpY2UucGFjaENvbmZpZ3ModGhpcy5hc3NldE1heC5mYnhGaWxlcy5mYnhBbGxHcm91cHNGaWxlLnNrZXRjaGZhYklkLCBjb25maWcpLnN1YnNjcmliZShyZXNwID0+IHtcbiAgICAgIHRoaXMuZ2V0TWF0ZXJpYWxzU2tldGNoZmFiID0gZmFsc2U7XG4gICAgICB0aGlzLnNhdmUuZW1pdCh0aGlzLmFzc2V0TWF4KTtcbiAgICB9KTtcbiAgfSBcbn1cbiJdfQ==