/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DecSketchfabService } from './dec-sketchfab.service';
var DecSketchfabComponent = /** @class */ (function () {
    function DecSketchfabComponent(decSketchfabService) {
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
    Object.defineProperty(DecSketchfabComponent.prototype, "assetMax", {
        get: /**
         * @return {?}
         */
        function () {
            return this._assetMax;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v) {
                this._assetMax = v;
                this.environmentConfig(v.fbxFiles.fbxAllGroupsFile.sketchfabId);
                this.getMaterials(v.renderMaterialConfigs);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DecSketchfabComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @param {?} id
     * @return {?}
     */
    DecSketchfabComponent.prototype.environmentConfig = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        var _this = this;
        /** @type {?} */
        var config = {
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
        this.decSketchfabService.pachConfigs(id, config).subscribe(function (resp) {
            _this.decSketchfabService.getAllTextures(id).subscribe(function (textureResp) {
                if (textureResp) {
                    _this.sketchfabId = id;
                    _this.textures = textureResp.results;
                }
            });
        });
    };
    /**
     * @param {?} m
     * @return {?}
     */
    DecSketchfabComponent.prototype.materialSelected = /**
     * @param {?} m
     * @return {?}
     */
    function (m) {
        if (m) {
            this.update = false;
            this.material = m;
            this.selectMaterialByName(m.name);
        }
    };
    /**
     * @param {?} name
     * @return {?}
     */
    DecSketchfabComponent.prototype.selectMaterialByName = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        this.materialName = name;
        this.materialConfig = this.materials.filter(function (x) { return x.materialName === name; });
        this.materialConfig = this.materialConfig[0];
    };
    /**
     * @param {?} configs
     * @return {?}
     */
    DecSketchfabComponent.prototype.getMaterials = /**
     * @param {?} configs
     * @return {?}
     */
    function (configs) {
        if (configs) {
            this.materials = configs;
        }
    };
    /**
     * @param {?} material
     * @param {?} $event
     * @return {?}
     */
    DecSketchfabComponent.prototype.updateMaterial = /**
     * @param {?} material
     * @param {?} $event
     * @return {?}
     */
    function (material, $event) {
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
    };
    /**
     * @param {?} type
     * @return {?}
     */
    DecSketchfabComponent.prototype.ableTo = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
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
    };
    /**
     * @param {?} type
     * @return {?}
     */
    DecSketchfabComponent.prototype.setTexture = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
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
    };
    /**
     * @param {?} name
     * @return {?}
     */
    DecSketchfabComponent.prototype.getTexture = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        return this.textures.find(function (x) { return x.name === name; });
    };
    /**
     * @return {?}
     */
    DecSketchfabComponent.prototype.sendMaterialToUpdate = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout(function () {
            _this.update = true;
            _this.material = JSON.parse(JSON.stringify(_this.material));
        }, 200);
    };
    /**
     * @return {?}
     */
    DecSketchfabComponent.prototype.onSave = /**
     * @return {?}
     */
    function () {
        this.getMaterialsSketchfab = true;
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    DecSketchfabComponent.prototype.getAllMaterials = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        var _this = this;
        /** @type {?} */
        var mat = {};
        for (var i = 0; i < $event.length; i++) {
            mat[$event[i].id] = $event[i];
        }
        /** @type {?} */
        var config = {
            'options': {
                'materials': mat
            }
        };
        this.decSketchfabService.pachConfigs(this.assetMax.fbxFiles.fbxAllGroupsFile.sketchfabId, config).subscribe(function (resp) {
            _this.getMaterialsSketchfab = false;
            _this.save.emit(_this.assetMax);
        });
    };
    DecSketchfabComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-sketchfab',
                    template: "<div fxLayout=\"column\" class=\"container\" fxLayoutGap=\"32px\" fxLayoutAlign=\"space-between center\">\n  <dec-sketchfab-view [materialName]=\"materialName\" [sketchfabId]=\"sketchfabId\" [editMode]=\"editMode\" [material]=\"material\"\n    [update]=\"update\" [getAllMaterials]=\"getMaterialsSketchfab\" (sendMaterials)=\"getAllMaterials($event)\"\n    (materialSelected)=\"materialSelected($event)\">\n  </dec-sketchfab-view>\n  <div fxLayout=\"row\" style=\"width: 100%\" fxLayoutAlign=\"space-between start\" fxLayoutGap=\"32px\">\n    <mat-form-field fxFlex=\"40\">\n      <mat-select [(ngModel)]=\"materialName\" name=\"config\" placeholder=\"Material ID\">\n        <mat-option *ngFor=\"let config of assetMax?.renderMaterialConfigs\" [value]=\"config.materialName\">\n          {{ config.materialName }}\n        </mat-option>\n      </mat-select>\n    </mat-form-field>\n\n    <div fxFlex=\"60\" class=\"polygon-count dec-color-gray text-right\">\n      {{ 'label.polygon' | translate }}: {{ assetMax?.fbxFiles?.fbxAllGroupsFile?.fbxOriginalPolyCount }} - {{\n      'label.current-polygon'\n      | translate }} {{ assetMax?.fbxFiles?.fbxAllGroupsFile?.fbxPolyCount }}\n    </div>\n\n  </div>\n\n  <div *ngIf=\"materialConfig\" fxLayout=\"row\" class=\"row-size\" fxLayoutAlign=\"space-between start\" fxLayoutGap=\"16px\">\n    <div fxFlex=\"30\" fxLayout=\"column\" fxLayoutGap=\"8px\">\n      <div fxLayout=\"column\">\n        <div fxLayout=\"row\" fxLayoutAlign=\"start start\" class=\"row-span-icon\" fxLayoutGap=\"8px\">\n          <span class=\"setting-name\">Base Color {{ materialConfig?.config?.diffuse }}</span>\n          <mat-icon class=\"md-span-icon click\" (click)=\"ableTo('base-color')\">\n            {{ materialConfig?.config?.diffuseEnabled ? 'lock_open' : 'lock_outline' }}\n          </mat-icon>\n        </div>\n        <mat-slider class=\"slider-position\" [max]=\"100\" [min]=\"0\" [step]=\"1\" [disabled]=\"!materialConfig?.config?.diffuseEnabled\"\n          [(ngModel)]=\"materialConfig.config.diffuse\" (input)=\"updateMaterial('base-color', $event)\">\n        </mat-slider>\n\n      </div>\n\n      <div fxLayout=\"column\">\n        <div fxLayout=\"row\" fxLayoutAlign=\"start start\" class=\"row-span-icon\" fxLayoutGap=\"8px\">\n          <span class=\"setting-name\">Roughness {{ materialConfig?.config?.roughness }}</span>\n          <mat-icon class=\"md-span-icon click\" (click)=\"ableTo('roug')\">\n            {{ materialConfig?.config?.roughnessEnabled ? 'lock_open' : 'lock_outline' }}\n          </mat-icon>\n        </div>\n        <mat-slider class=\"slider-position\" [max]=\"100\" [min]=\"0\" [step]=\"1\" [disabled]=\"!materialConfig?.config?.roughnessEnabled\"\n          [(ngModel)]=\"materialConfig.config.roughness\" (input)=\"updateMaterial('roug', $event)\">\n        </mat-slider>\n      </div>\n    </div>\n\n    <div fxFlex=\"30\" fxLayout=\"column\" fxLayoutGap=\"8px\">\n\n      <mat-form-field>\n        <mat-select class=\"polygon-select\" fxFill [(ngModel)]=\"materialConfig.adjustOptimize\" name=\"config\" placeholder=\"{{ 'label.polygon-reduction' | translate }}\">\n          <mat-option *ngFor=\"let config of configSelect\" [value]=\"config\">\n            {{ 'label.'+config | translate }}\n            <span class=\"position-polygon-number gray\" *ngIf=\"config === 'OFF'\">\n              {{ materialConfig?.fbxPolyCountOrigin}}\n            </span>\n            <span class=\"position-polygon-number gray\" *ngIf=\"materialConfig?.adjustOptimize === config\">\n              {{ materialConfig?.fbxPolyCount}}\n            </span>\n          </mat-option>\n        </mat-select>\n      </mat-form-field>\n\n      <div fxLayout=\"column\" class=\"metalness-position\">\n        <div fxLayout=\"row\" fxLayoutAlign=\"start start\" class=\"row-span-icon\" fxLayoutGap=\"8px\">\n          <span class=\"setting-name\">Metalness {{ materialConfig?.config?.metalness }}</span>\n          <mat-icon class=\"md-span-icon click\" (click)=\"ableTo('metal')\">\n            {{ materialConfig?.config?.metalnessEnabled ? 'lock_open' : 'lock_outline' }}\n          </mat-icon>\n        </div>\n        <mat-slider class=\"slider-position\" [max]=\"100\" [min]=\"0\" [step]=\"1\" [disabled]=\"!materialConfig?.config?.metalnessEnabled\"\n          [(ngModel)]=\"materialConfig.config.metalness\" (input)=\"updateMaterial('metal', $event)\">\n        </mat-slider>\n      </div>\n\n    </div>\n\n    <div fxFlex=\"30\" fxLayout=\"column\" fxLayoutGap=\"8px\">\n      <div>\n        <mat-checkbox class=\"check-box-normal-map\" (input)=\"updateMaterial('normal', $event)\" [(ngModel)]=\"checked\"\n          [labelPosition]=\"align\">\n          Normal Map\n        </mat-checkbox>\n      </div>\n      <div fxLayout=\"column\" class=\"opacity-position\" fxLayoutGap=\"8px\">\n        <div fxLayout=\"row\" fxLayoutAlign=\"start start\" class=\"opacity-position-text\" fxLayoutGap=\"8px\">\n          <span class=\"setting-name\">Opacity {{ materialConfig?.config?.opacity }}</span>\n          <mat-icon class=\"md-span-icon click\" (click)=\"ableTo('opacity')\">\n            {{ materialConfig?.config?.opacityEnabled ? 'lock_open' : 'lock_outline' }}\n          </mat-icon>\n        </div>\n        <mat-slider class=\"slider-position\" [max]=\"100\" [min]=\"0\" [step]=\"1\" [disabled]=\"!materialConfig?.config?.opacityEnabled\"\n          [(ngModel)]=\"materialConfig.config.opacity\" (input)=\"updateMaterial('opacity', $event)\">\n        </mat-slider>\n      </div>\n    </div>\n  </div>\n  <div class=\"text-right save-button-div\">\n    <button mat-raised-button type=\"button\" color=\"primary\" (click)=\"onSave()\">{{ 'label.save' | translate }}</button>\n  </div>\n</div>\n",
                    styles: [".container{max-width:620px!important}.setting-name{width:100px;display:inline-block}.md-span-icon{position:relative;top:-5px;left:-5px}.slider-position{position:relative;left:-8px;top:-8px}.row-size{width:100%}.polygon-select{position:relative;top:-5px}.metalness-position{position:relative;top:16px}.polygon-count{font-size:12px;position:relative;top:27px}.opacity-position{position:relative;top:40px}.opacity-position-text{position:relative;top:8px}.check-box-normal-map{position:relative;top:18px}.save-button-div{width:100%}"]
                },] },
    ];
    /** @nocollapse */
    DecSketchfabComponent.ctorParameters = function () { return [
        { type: DecSketchfabService }
    ]; };
    DecSketchfabComponent.propDecorators = {
        assetMax: [{ type: Input }],
        save: [{ type: Output }]
    };
    return DecSketchfabComponent;
}());
export { DecSketchfabComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLXNrZXRjaGZhYi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGVjLXNrZXRjaGZhYi9kZWMtc2tldGNoZmFiLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7SUFzSjVELCtCQUFvQixtQkFBd0M7UUFBeEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtvQkF4QjNDLElBQUksWUFBWSxFQUFFO3dCQVV4QixJQUFJO3NCQUNOLEtBQUs7cUNBQ1UsS0FBSzt1QkFHbkIsSUFBSTs0QkFFQztZQUNiLEtBQUs7WUFDTCxLQUFLO1lBQ0wsUUFBUTtZQUNSLE1BQU07U0FDUDtLQUVnRTtJQXJDakUsc0JBQ0ksMkNBQVE7Ozs7UUFRWjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1NBQ3ZCOzs7OztRQVhELFVBQ2EsQ0FBTTtZQUNqQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNOLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO2dCQUNuQixJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDaEUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQzthQUM1QztTQUNGOzs7T0FBQTs7OztJQWdDRCx3Q0FBUTs7O0lBQVI7S0FDQzs7Ozs7SUFFRCxpREFBaUI7Ozs7SUFBakIsVUFBa0IsRUFBRTtRQUFwQixpQkFvTEM7O1FBbkxDLElBQU0sTUFBTSxHQUFHO1lBQ2IsU0FBUyxFQUFFO2dCQUNULFNBQVMsRUFBRSxDQUFDO2dCQUNaLFlBQVksRUFBRTtvQkFDWixRQUFRLEVBQUUsU0FBUztvQkFDbkIsS0FBSyxFQUFFLGtDQUFrQztvQkFDekMsT0FBTyxFQUFFO3dCQUNQLEdBQUc7d0JBQ0gsR0FBRzt3QkFDSCxHQUFHO3FCQUNKO2lCQUNGO2dCQUNELGFBQWEsRUFBRTtvQkFDYixRQUFRLEVBQUUsSUFBSTtvQkFDZCxvQkFBb0IsRUFBRSxDQUFDO29CQUN2QixVQUFVLEVBQUUsaUJBQWlCO29CQUM3QixVQUFVLEVBQUUsZ0JBQWdCO29CQUM1QixLQUFLLEVBQUUsa0NBQWtDO29CQUN6QyxNQUFNLEVBQUUsR0FBRztvQkFDWCxjQUFjLEVBQUUsS0FBSztvQkFDckIsZ0JBQWdCLEVBQUUsQ0FBQztvQkFDbkIsWUFBWSxFQUFFLEtBQUs7aUJBQ3BCO2dCQUNELFVBQVUsRUFBRTtvQkFDVixRQUFRLEVBQUUsS0FBSztvQkFDZixRQUFRLEVBQUU7d0JBQ1I7NEJBQ0UsTUFBTSxFQUFFLFdBQVc7NEJBQ25CLFFBQVEsRUFBRSxJQUFJOzRCQUNkLE9BQU8sRUFBRTtnQ0FDUCxZQUFZO2dDQUNaLFlBQVk7Z0NBQ1osQ0FBQzs2QkFDRjs0QkFDRCxXQUFXLEVBQUUsSUFBSTs0QkFDakIsUUFBUSxFQUFFO2dDQUNSLEdBQUc7Z0NBQ0gsR0FBRztnQ0FDSCxHQUFHOzZCQUNKOzRCQUNELGlCQUFpQixFQUFFLENBQUM7NEJBQ3BCLFFBQVEsRUFBRTtnQ0FDUixDQUFDLFVBQVU7Z0NBQ1gsWUFBWTtnQ0FDWixDQUFDLFlBQVk7Z0NBQ2IsQ0FBQztnQ0FDRCxXQUFXO2dDQUNYLFlBQVk7Z0NBQ1osWUFBWTtnQ0FDWixDQUFDO2dDQUNELFlBQVk7Z0NBQ1osWUFBWTtnQ0FDWixDQUFDLFlBQVk7Z0NBQ2IsQ0FBQztnQ0FDRCxZQUFZO2dDQUNaLGFBQWE7Z0NBQ2IsQ0FBQyxZQUFZO2dDQUNiLENBQUM7NkJBQ0Y7NEJBQ0QsU0FBUyxFQUFFLFlBQVk7NEJBQ3ZCLGtCQUFrQixFQUFFLEtBQUs7NEJBQ3pCLE9BQU8sRUFBRSxFQUFFOzRCQUNYLFVBQVUsRUFBRSxHQUFHOzRCQUNmLGFBQWEsRUFBRSxLQUFLOzRCQUNwQixZQUFZLEVBQUUsS0FBSzt5QkFDcEI7d0JBQ0Q7NEJBQ0UsTUFBTSxFQUFFLFdBQVc7NEJBQ25CLFFBQVEsRUFBRSxJQUFJOzRCQUNkLE9BQU8sRUFBRTtnQ0FDUCxDQUFDO2dDQUNELFdBQVc7Z0NBQ1gsWUFBWTs2QkFDYjs0QkFDRCxXQUFXLEVBQUUsQ0FBQzs0QkFDZCxRQUFRLEVBQUU7Z0NBQ1IsR0FBRztnQ0FDSCxHQUFHO2dDQUNILEdBQUc7NkJBQ0o7NEJBQ0QsaUJBQWlCLEVBQUUsQ0FBQzs0QkFDcEIsUUFBUSxFQUFFO2dDQUNSLFlBQVk7Z0NBQ1osQ0FBQyxXQUFXO2dDQUNaLFlBQVk7Z0NBQ1osQ0FBQztnQ0FDRCxZQUFZO2dDQUNaLFlBQVk7Z0NBQ1osQ0FBQyxZQUFZO2dDQUNiLENBQUM7Z0NBQ0QsQ0FBQyxZQUFZO2dDQUNiLFlBQVk7Z0NBQ1osWUFBWTtnQ0FDWixDQUFDO2dDQUNELENBQUMsYUFBYTtnQ0FDZCxhQUFhO2dDQUNiLGFBQWE7Z0NBQ2IsQ0FBQzs2QkFDRjs0QkFDRCxTQUFTLEVBQUUsWUFBWTs0QkFDdkIsa0JBQWtCLEVBQUUsS0FBSzs0QkFDekIsT0FBTyxFQUFFLEVBQUU7NEJBQ1gsVUFBVSxFQUFFLEdBQUc7NEJBQ2YsYUFBYSxFQUFFLEtBQUs7NEJBQ3BCLFlBQVksRUFBRSxLQUFLO3lCQUNwQjt3QkFDRDs0QkFDRSxNQUFNLEVBQUUsV0FBVzs0QkFDbkIsUUFBUSxFQUFFLElBQUk7NEJBQ2QsT0FBTyxFQUFFO2dDQUNQLFlBQVk7Z0NBQ1osWUFBWTtnQ0FDWixDQUFDOzZCQUNGOzRCQUNELFdBQVcsRUFBRSxJQUFJOzRCQUNqQixRQUFRLEVBQUU7Z0NBQ1IsWUFBWTtnQ0FDWixZQUFZO2dDQUNaLFlBQVk7NkJBQ2I7NEJBQ0QsaUJBQWlCLEVBQUUsSUFBSTs0QkFDdkIsUUFBUSxFQUFFO2dDQUNSLFlBQVk7Z0NBQ1osQ0FBQyxZQUFZO2dDQUNiLENBQUMsWUFBWTtnQ0FDYixDQUFDO2dDQUNELENBQUMsWUFBWTtnQ0FDYixXQUFXO2dDQUNYLENBQUMsV0FBVztnQ0FDWixDQUFDO2dDQUNELFlBQVk7Z0NBQ1osWUFBWTtnQ0FDWixZQUFZO2dDQUNaLENBQUM7Z0NBQ0QsYUFBYTtnQ0FDYixhQUFhO2dDQUNiLGFBQWE7Z0NBQ2IsQ0FBQzs2QkFDRjs0QkFDRCxTQUFTLEVBQUUsWUFBWTs0QkFDdkIsa0JBQWtCLEVBQUUsS0FBSzs0QkFDekIsT0FBTyxFQUFFLEVBQUU7NEJBQ1gsVUFBVSxFQUFFLEdBQUc7NEJBQ2YsYUFBYSxFQUFFLEtBQUs7NEJBQ3BCLFlBQVksRUFBRSxLQUFLO3lCQUNwQjtxQkFDRjtpQkFDRjtnQkFDRCxhQUFhLEVBQUU7b0JBQ2IsUUFBUSxFQUFFO3dCQUNSLENBQUM7d0JBQ0QsQ0FBQzt3QkFDRCxDQUFDO3dCQUNELENBQUM7d0JBQ0QsQ0FBQzt3QkFDRCxDQUFDO3dCQUNELENBQUM7d0JBQ0QsQ0FBQzt3QkFDRCxDQUFDO3dCQUNELENBQUM7d0JBQ0QsQ0FBQzt3QkFDRCxDQUFDO3dCQUNELENBQUM7d0JBQ0QsQ0FBQzt3QkFDRCxDQUFDO3dCQUNELENBQUM7cUJBQ0Y7aUJBQ0Y7YUFDRjtTQUNGLENBQUM7UUFFRixJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxJQUFJO1lBQzdELEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsV0FBVztnQkFDL0QsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztvQkFDaEIsS0FBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7b0JBQ3RCLEtBQUksQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQztpQkFDckM7YUFDRixDQUFDLENBQUM7U0FDSixDQUFDLENBQUM7S0FDSjs7Ozs7SUFFRCxnREFBZ0I7Ozs7SUFBaEIsVUFBaUIsQ0FBQztRQUNoQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDcEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7WUFDbEIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNuQztLQUNGOzs7OztJQUVELG9EQUFvQjs7OztJQUFwQixVQUFxQixJQUFJO1FBQ3ZCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsWUFBWSxLQUFLLElBQUksRUFBdkIsQ0FBdUIsQ0FBQyxDQUFDO1FBQzFFLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUM5Qzs7Ozs7SUFFRCw0Q0FBWTs7OztJQUFaLFVBQWEsT0FBTztRQUNsQixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ1osSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7U0FDMUI7S0FDRjs7Ozs7O0lBRUQsOENBQWM7Ozs7O0lBQWQsVUFBZSxRQUFRLEVBQUUsTUFBTTtRQUM3QixNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLEtBQUssT0FBTyxFQUFFLENBQUM7Z0JBQ2IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztnQkFDaEUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7Z0JBQ3BELEtBQUssQ0FBQzthQUNQO1lBQ0QsS0FBSyxZQUFZLEVBQUUsQ0FBQztnQkFDbEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztnQkFDN0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7Z0JBQ2xELEtBQUssQ0FBQzthQUNQO1lBQ0QsS0FBSyxNQUFNLEVBQUUsQ0FBQztnQkFDWixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO2dCQUNoRSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztnQkFDcEQsS0FBSyxDQUFDO2FBQ1A7WUFDRCxLQUFLLFFBQVEsRUFBRSxDQUFDO2dCQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztnQkFDekQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7Z0JBQ25ELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztpQkFDN0M7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ04sSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7aUJBQzdDO2dCQUNELEtBQUssQ0FBQzthQUNQO1lBQ0QsS0FBSyxTQUFTLEVBQUUsQ0FBQztnQkFDZixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO2dCQUMzRCxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztnQkFDbEQsS0FBSyxDQUFDO2FBQ1A7U0FDRjtRQUNELElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO0tBQzdCOzs7OztJQUdELHNDQUFNOzs7O0lBQU4sVUFBTyxJQUFJO1FBQ1QsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNiLEtBQUssT0FBTztnQkFDVixJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDO2dCQUMzRixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUN6QixLQUFLLENBQUM7WUFDUixLQUFLLFlBQVk7Z0JBQ2YsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsY0FBYyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDO2dCQUN2RixJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUM5QixLQUFLLENBQUM7WUFDUixLQUFLLE1BQU07Z0JBQ1QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDM0YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDeEIsS0FBSyxDQUFDO1lBQ1IsS0FBSyxTQUFTO2dCQUNaLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLGNBQWMsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQztnQkFDdkYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDM0IsS0FBSyxDQUFDO1NBQ1Q7S0FDRjs7Ozs7SUFFRCwwQ0FBVTs7OztJQUFWLFVBQVcsSUFBSTtRQUNiLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDYixLQUFLLE9BQU87Z0JBQ1YsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ2hELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQztvQkFDbkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7aUJBQ3ZEO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQztvQkFDakQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxHQUFHLGVBQWUsQ0FBQyxDQUFDO2lCQUNuSDtnQkFDRCxLQUFLLENBQUM7WUFDUixLQUFLLE1BQU07Z0JBQ1QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ2hELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQztpQkFDcEQ7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ04sSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxHQUFHLGdCQUFnQixDQUFDLENBQUM7aUJBQ3BIO2dCQUNELEtBQUssQ0FBQztZQUNSLEtBQUssU0FBUztnQkFDWixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztvQkFDM0MsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO2lCQUMvQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDTixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEdBQUcsa0JBQWtCLENBQUMsQ0FBQztpQkFDakg7Z0JBQ0QsS0FBSyxDQUFDO1NBQ1Q7UUFDRCxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztLQUM3Qjs7Ozs7SUFFRCwwQ0FBVTs7OztJQUFWLFVBQVcsSUFBSTtRQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxFQUFmLENBQWUsQ0FBQyxDQUFDO0tBQ2pEOzs7O0lBRUQsb0RBQW9COzs7SUFBcEI7UUFBQSxpQkFLQztRQUpDLFVBQVUsQ0FBQztZQUNULEtBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ25CLEtBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1NBQzNELEVBQUUsR0FBRyxDQUFDLENBQUM7S0FDVDs7OztJQUVELHNDQUFNOzs7SUFBTjtRQUNFLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUM7S0FDbkM7Ozs7O0lBRUQsK0NBQWU7Ozs7SUFBZixVQUFnQixNQUFNO1FBQXRCLGlCQWlCQzs7UUFoQkMsSUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBRWYsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDdkMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDL0I7O1FBRUQsSUFBTSxNQUFNLEdBQUc7WUFDYixTQUFTLEVBQUU7Z0JBQ1QsV0FBVyxFQUFFLEdBQUc7YUFDakI7U0FDRixDQUFDO1FBRUYsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSTtZQUM5RyxLQUFJLENBQUMscUJBQXFCLEdBQUcsS0FBSyxDQUFDO1lBQ25DLEtBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUMvQixDQUFDLENBQUM7S0FDSjs7Z0JBMWRGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsZUFBZTtvQkFDekIsUUFBUSxFQUFFLDhuTEF3R1g7b0JBQ0MsTUFBTSxFQUFFLENBQUMsa2hCQUFraEIsQ0FBQztpQkFDN2hCOzs7O2dCQTlHUSxtQkFBbUI7OzsyQkFpSHpCLEtBQUs7dUJBYUwsTUFBTTs7Z0NBL0hUOztTQWdIYSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWNTa2V0Y2hmYWJTZXJ2aWNlIH0gZnJvbSAnLi9kZWMtc2tldGNoZmFiLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtc2tldGNoZmFiJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGZ4TGF5b3V0PVwiY29sdW1uXCIgY2xhc3M9XCJjb250YWluZXJcIiBmeExheW91dEdhcD1cIjMycHhcIiBmeExheW91dEFsaWduPVwic3BhY2UtYmV0d2VlbiBjZW50ZXJcIj5cbiAgPGRlYy1za2V0Y2hmYWItdmlldyBbbWF0ZXJpYWxOYW1lXT1cIm1hdGVyaWFsTmFtZVwiIFtza2V0Y2hmYWJJZF09XCJza2V0Y2hmYWJJZFwiIFtlZGl0TW9kZV09XCJlZGl0TW9kZVwiIFttYXRlcmlhbF09XCJtYXRlcmlhbFwiXG4gICAgW3VwZGF0ZV09XCJ1cGRhdGVcIiBbZ2V0QWxsTWF0ZXJpYWxzXT1cImdldE1hdGVyaWFsc1NrZXRjaGZhYlwiIChzZW5kTWF0ZXJpYWxzKT1cImdldEFsbE1hdGVyaWFscygkZXZlbnQpXCJcbiAgICAobWF0ZXJpYWxTZWxlY3RlZCk9XCJtYXRlcmlhbFNlbGVjdGVkKCRldmVudClcIj5cbiAgPC9kZWMtc2tldGNoZmFiLXZpZXc+XG4gIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBzdHlsZT1cIndpZHRoOiAxMDAlXCIgZnhMYXlvdXRBbGlnbj1cInNwYWNlLWJldHdlZW4gc3RhcnRcIiBmeExheW91dEdhcD1cIjMycHhcIj5cbiAgICA8bWF0LWZvcm0tZmllbGQgZnhGbGV4PVwiNDBcIj5cbiAgICAgIDxtYXQtc2VsZWN0IFsobmdNb2RlbCldPVwibWF0ZXJpYWxOYW1lXCIgbmFtZT1cImNvbmZpZ1wiIHBsYWNlaG9sZGVyPVwiTWF0ZXJpYWwgSURcIj5cbiAgICAgICAgPG1hdC1vcHRpb24gKm5nRm9yPVwibGV0IGNvbmZpZyBvZiBhc3NldE1heD8ucmVuZGVyTWF0ZXJpYWxDb25maWdzXCIgW3ZhbHVlXT1cImNvbmZpZy5tYXRlcmlhbE5hbWVcIj5cbiAgICAgICAgICB7eyBjb25maWcubWF0ZXJpYWxOYW1lIH19XG4gICAgICAgIDwvbWF0LW9wdGlvbj5cbiAgICAgIDwvbWF0LXNlbGVjdD5cbiAgICA8L21hdC1mb3JtLWZpZWxkPlxuXG4gICAgPGRpdiBmeEZsZXg9XCI2MFwiIGNsYXNzPVwicG9seWdvbi1jb3VudCBkZWMtY29sb3ItZ3JheSB0ZXh0LXJpZ2h0XCI+XG4gICAgICB7eyAnbGFiZWwucG9seWdvbicgfCB0cmFuc2xhdGUgfX06IHt7IGFzc2V0TWF4Py5mYnhGaWxlcz8uZmJ4QWxsR3JvdXBzRmlsZT8uZmJ4T3JpZ2luYWxQb2x5Q291bnQgfX0gLSB7e1xuICAgICAgJ2xhYmVsLmN1cnJlbnQtcG9seWdvbidcbiAgICAgIHwgdHJhbnNsYXRlIH19IHt7IGFzc2V0TWF4Py5mYnhGaWxlcz8uZmJ4QWxsR3JvdXBzRmlsZT8uZmJ4UG9seUNvdW50IH19XG4gICAgPC9kaXY+XG5cbiAgPC9kaXY+XG5cbiAgPGRpdiAqbmdJZj1cIm1hdGVyaWFsQ29uZmlnXCIgZnhMYXlvdXQ9XCJyb3dcIiBjbGFzcz1cInJvdy1zaXplXCIgZnhMYXlvdXRBbGlnbj1cInNwYWNlLWJldHdlZW4gc3RhcnRcIiBmeExheW91dEdhcD1cIjE2cHhcIj5cbiAgICA8ZGl2IGZ4RmxleD1cIjMwXCIgZnhMYXlvdXQ9XCJjb2x1bW5cIiBmeExheW91dEdhcD1cIjhweFwiPlxuICAgICAgPGRpdiBmeExheW91dD1cImNvbHVtblwiPlxuICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cInN0YXJ0IHN0YXJ0XCIgY2xhc3M9XCJyb3ctc3Bhbi1pY29uXCIgZnhMYXlvdXRHYXA9XCI4cHhcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInNldHRpbmctbmFtZVwiPkJhc2UgQ29sb3Ige3sgbWF0ZXJpYWxDb25maWc/LmNvbmZpZz8uZGlmZnVzZSB9fTwvc3Bhbj5cbiAgICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJtZC1zcGFuLWljb24gY2xpY2tcIiAoY2xpY2spPVwiYWJsZVRvKCdiYXNlLWNvbG9yJylcIj5cbiAgICAgICAgICAgIHt7IG1hdGVyaWFsQ29uZmlnPy5jb25maWc/LmRpZmZ1c2VFbmFibGVkID8gJ2xvY2tfb3BlbicgOiAnbG9ja19vdXRsaW5lJyB9fVxuICAgICAgICAgIDwvbWF0LWljb24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8bWF0LXNsaWRlciBjbGFzcz1cInNsaWRlci1wb3NpdGlvblwiIFttYXhdPVwiMTAwXCIgW21pbl09XCIwXCIgW3N0ZXBdPVwiMVwiIFtkaXNhYmxlZF09XCIhbWF0ZXJpYWxDb25maWc/LmNvbmZpZz8uZGlmZnVzZUVuYWJsZWRcIlxuICAgICAgICAgIFsobmdNb2RlbCldPVwibWF0ZXJpYWxDb25maWcuY29uZmlnLmRpZmZ1c2VcIiAoaW5wdXQpPVwidXBkYXRlTWF0ZXJpYWwoJ2Jhc2UtY29sb3InLCAkZXZlbnQpXCI+XG4gICAgICAgIDwvbWF0LXNsaWRlcj5cblxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgZnhMYXlvdXQ9XCJjb2x1bW5cIj5cbiAgICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJzdGFydCBzdGFydFwiIGNsYXNzPVwicm93LXNwYW4taWNvblwiIGZ4TGF5b3V0R2FwPVwiOHB4XCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJzZXR0aW5nLW5hbWVcIj5Sb3VnaG5lc3Mge3sgbWF0ZXJpYWxDb25maWc/LmNvbmZpZz8ucm91Z2huZXNzIH19PC9zcGFuPlxuICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cIm1kLXNwYW4taWNvbiBjbGlja1wiIChjbGljayk9XCJhYmxlVG8oJ3JvdWcnKVwiPlxuICAgICAgICAgICAge3sgbWF0ZXJpYWxDb25maWc/LmNvbmZpZz8ucm91Z2huZXNzRW5hYmxlZCA/ICdsb2NrX29wZW4nIDogJ2xvY2tfb3V0bGluZScgfX1cbiAgICAgICAgICA8L21hdC1pY29uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPG1hdC1zbGlkZXIgY2xhc3M9XCJzbGlkZXItcG9zaXRpb25cIiBbbWF4XT1cIjEwMFwiIFttaW5dPVwiMFwiIFtzdGVwXT1cIjFcIiBbZGlzYWJsZWRdPVwiIW1hdGVyaWFsQ29uZmlnPy5jb25maWc/LnJvdWdobmVzc0VuYWJsZWRcIlxuICAgICAgICAgIFsobmdNb2RlbCldPVwibWF0ZXJpYWxDb25maWcuY29uZmlnLnJvdWdobmVzc1wiIChpbnB1dCk9XCJ1cGRhdGVNYXRlcmlhbCgncm91ZycsICRldmVudClcIj5cbiAgICAgICAgPC9tYXQtc2xpZGVyPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGZ4RmxleD1cIjMwXCIgZnhMYXlvdXQ9XCJjb2x1bW5cIiBmeExheW91dEdhcD1cIjhweFwiPlxuXG4gICAgICA8bWF0LWZvcm0tZmllbGQ+XG4gICAgICAgIDxtYXQtc2VsZWN0IGNsYXNzPVwicG9seWdvbi1zZWxlY3RcIiBmeEZpbGwgWyhuZ01vZGVsKV09XCJtYXRlcmlhbENvbmZpZy5hZGp1c3RPcHRpbWl6ZVwiIG5hbWU9XCJjb25maWdcIiBwbGFjZWhvbGRlcj1cInt7ICdsYWJlbC5wb2x5Z29uLXJlZHVjdGlvbicgfCB0cmFuc2xhdGUgfX1cIj5cbiAgICAgICAgICA8bWF0LW9wdGlvbiAqbmdGb3I9XCJsZXQgY29uZmlnIG9mIGNvbmZpZ1NlbGVjdFwiIFt2YWx1ZV09XCJjb25maWdcIj5cbiAgICAgICAgICAgIHt7ICdsYWJlbC4nK2NvbmZpZyB8IHRyYW5zbGF0ZSB9fVxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwb3NpdGlvbi1wb2x5Z29uLW51bWJlciBncmF5XCIgKm5nSWY9XCJjb25maWcgPT09ICdPRkYnXCI+XG4gICAgICAgICAgICAgIHt7IG1hdGVyaWFsQ29uZmlnPy5mYnhQb2x5Q291bnRPcmlnaW59fVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwb3NpdGlvbi1wb2x5Z29uLW51bWJlciBncmF5XCIgKm5nSWY9XCJtYXRlcmlhbENvbmZpZz8uYWRqdXN0T3B0aW1pemUgPT09IGNvbmZpZ1wiPlxuICAgICAgICAgICAgICB7eyBtYXRlcmlhbENvbmZpZz8uZmJ4UG9seUNvdW50fX1cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L21hdC1vcHRpb24+XG4gICAgICAgIDwvbWF0LXNlbGVjdD5cbiAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG5cbiAgICAgIDxkaXYgZnhMYXlvdXQ9XCJjb2x1bW5cIiBjbGFzcz1cIm1ldGFsbmVzcy1wb3NpdGlvblwiPlxuICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cInN0YXJ0IHN0YXJ0XCIgY2xhc3M9XCJyb3ctc3Bhbi1pY29uXCIgZnhMYXlvdXRHYXA9XCI4cHhcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInNldHRpbmctbmFtZVwiPk1ldGFsbmVzcyB7eyBtYXRlcmlhbENvbmZpZz8uY29uZmlnPy5tZXRhbG5lc3MgfX08L3NwYW4+XG4gICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwibWQtc3Bhbi1pY29uIGNsaWNrXCIgKGNsaWNrKT1cImFibGVUbygnbWV0YWwnKVwiPlxuICAgICAgICAgICAge3sgbWF0ZXJpYWxDb25maWc/LmNvbmZpZz8ubWV0YWxuZXNzRW5hYmxlZCA/ICdsb2NrX29wZW4nIDogJ2xvY2tfb3V0bGluZScgfX1cbiAgICAgICAgICA8L21hdC1pY29uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPG1hdC1zbGlkZXIgY2xhc3M9XCJzbGlkZXItcG9zaXRpb25cIiBbbWF4XT1cIjEwMFwiIFttaW5dPVwiMFwiIFtzdGVwXT1cIjFcIiBbZGlzYWJsZWRdPVwiIW1hdGVyaWFsQ29uZmlnPy5jb25maWc/Lm1ldGFsbmVzc0VuYWJsZWRcIlxuICAgICAgICAgIFsobmdNb2RlbCldPVwibWF0ZXJpYWxDb25maWcuY29uZmlnLm1ldGFsbmVzc1wiIChpbnB1dCk9XCJ1cGRhdGVNYXRlcmlhbCgnbWV0YWwnLCAkZXZlbnQpXCI+XG4gICAgICAgIDwvbWF0LXNsaWRlcj5cbiAgICAgIDwvZGl2PlxuXG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGZ4RmxleD1cIjMwXCIgZnhMYXlvdXQ9XCJjb2x1bW5cIiBmeExheW91dEdhcD1cIjhweFwiPlxuICAgICAgPGRpdj5cbiAgICAgICAgPG1hdC1jaGVja2JveCBjbGFzcz1cImNoZWNrLWJveC1ub3JtYWwtbWFwXCIgKGlucHV0KT1cInVwZGF0ZU1hdGVyaWFsKCdub3JtYWwnLCAkZXZlbnQpXCIgWyhuZ01vZGVsKV09XCJjaGVja2VkXCJcbiAgICAgICAgICBbbGFiZWxQb3NpdGlvbl09XCJhbGlnblwiPlxuICAgICAgICAgIE5vcm1hbCBNYXBcbiAgICAgICAgPC9tYXQtY2hlY2tib3g+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgZnhMYXlvdXQ9XCJjb2x1bW5cIiBjbGFzcz1cIm9wYWNpdHktcG9zaXRpb25cIiBmeExheW91dEdhcD1cIjhweFwiPlxuICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cInN0YXJ0IHN0YXJ0XCIgY2xhc3M9XCJvcGFjaXR5LXBvc2l0aW9uLXRleHRcIiBmeExheW91dEdhcD1cIjhweFwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwic2V0dGluZy1uYW1lXCI+T3BhY2l0eSB7eyBtYXRlcmlhbENvbmZpZz8uY29uZmlnPy5vcGFjaXR5IH19PC9zcGFuPlxuICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cIm1kLXNwYW4taWNvbiBjbGlja1wiIChjbGljayk9XCJhYmxlVG8oJ29wYWNpdHknKVwiPlxuICAgICAgICAgICAge3sgbWF0ZXJpYWxDb25maWc/LmNvbmZpZz8ub3BhY2l0eUVuYWJsZWQgPyAnbG9ja19vcGVuJyA6ICdsb2NrX291dGxpbmUnIH19XG4gICAgICAgICAgPC9tYXQtaWNvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxtYXQtc2xpZGVyIGNsYXNzPVwic2xpZGVyLXBvc2l0aW9uXCIgW21heF09XCIxMDBcIiBbbWluXT1cIjBcIiBbc3RlcF09XCIxXCIgW2Rpc2FibGVkXT1cIiFtYXRlcmlhbENvbmZpZz8uY29uZmlnPy5vcGFjaXR5RW5hYmxlZFwiXG4gICAgICAgICAgWyhuZ01vZGVsKV09XCJtYXRlcmlhbENvbmZpZy5jb25maWcub3BhY2l0eVwiIChpbnB1dCk9XCJ1cGRhdGVNYXRlcmlhbCgnb3BhY2l0eScsICRldmVudClcIj5cbiAgICAgICAgPC9tYXQtc2xpZGVyPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwidGV4dC1yaWdodCBzYXZlLWJ1dHRvbi1kaXZcIj5cbiAgICA8YnV0dG9uIG1hdC1yYWlzZWQtYnV0dG9uIHR5cGU9XCJidXR0b25cIiBjb2xvcj1cInByaW1hcnlcIiAoY2xpY2spPVwib25TYXZlKClcIj57eyAnbGFiZWwuc2F2ZScgfCB0cmFuc2xhdGUgfX08L2J1dHRvbj5cbiAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AuY29udGFpbmVye21heC13aWR0aDo2MjBweCFpbXBvcnRhbnR9LnNldHRpbmctbmFtZXt3aWR0aDoxMDBweDtkaXNwbGF5OmlubGluZS1ibG9ja30ubWQtc3Bhbi1pY29ue3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDotNXB4O2xlZnQ6LTVweH0uc2xpZGVyLXBvc2l0aW9ue3Bvc2l0aW9uOnJlbGF0aXZlO2xlZnQ6LThweDt0b3A6LThweH0ucm93LXNpemV7d2lkdGg6MTAwJX0ucG9seWdvbi1zZWxlY3R7cG9zaXRpb246cmVsYXRpdmU7dG9wOi01cHh9Lm1ldGFsbmVzcy1wb3NpdGlvbntwb3NpdGlvbjpyZWxhdGl2ZTt0b3A6MTZweH0ucG9seWdvbi1jb3VudHtmb250LXNpemU6MTJweDtwb3NpdGlvbjpyZWxhdGl2ZTt0b3A6MjdweH0ub3BhY2l0eS1wb3NpdGlvbntwb3NpdGlvbjpyZWxhdGl2ZTt0b3A6NDBweH0ub3BhY2l0eS1wb3NpdGlvbi10ZXh0e3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDo4cHh9LmNoZWNrLWJveC1ub3JtYWwtbWFwe3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDoxOHB4fS5zYXZlLWJ1dHRvbi1kaXZ7d2lkdGg6MTAwJX1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNTa2V0Y2hmYWJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpXG4gIHNldCBhc3NldE1heCh2OiBhbnkpIHtcbiAgICBpZiAodikge1xuICAgICAgdGhpcy5fYXNzZXRNYXggPSB2O1xuICAgICAgdGhpcy5lbnZpcm9ubWVudENvbmZpZyh2LmZieEZpbGVzLmZieEFsbEdyb3Vwc0ZpbGUuc2tldGNoZmFiSWQpO1xuICAgICAgdGhpcy5nZXRNYXRlcmlhbHModi5yZW5kZXJNYXRlcmlhbENvbmZpZ3MpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBhc3NldE1heCgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9hc3NldE1heDtcbiAgfVxuXG4gIEBPdXRwdXQoKSBzYXZlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIF9hc3NldE1heDogYW55O1xuICBza2V0Y2hmYWJJZDogc3RyaW5nO1xuXG4gIG1hdGVyaWFsOiBhbnk7XG4gIG1hdGVyaWFsQ29uZmlnOiBhbnk7XG4gIG1hdGVyaWFsTmFtZTogc3RyaW5nO1xuICBtYXRlcmlhbHM6IGFueTtcbiAgdGV4dHVyZXM6IGFueTtcbiAgZWRpdE1vZGUgPSB0cnVlO1xuICB1cGRhdGUgPSBmYWxzZTtcbiAgZ2V0TWF0ZXJpYWxzU2tldGNoZmFiID0gZmFsc2U7XG5cbiAgYWxpZ246ICdzdGFydCc7XG4gIGNoZWNrZWQgPSB0cnVlO1xuXG4gIGNvbmZpZ1NlbGVjdCA9IFtcbiAgICAnT0ZGJyxcbiAgICAnTE9XJyxcbiAgICAnTUVESVVNJyxcbiAgICAnSElHSCdcbiAgXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRlY1NrZXRjaGZhYlNlcnZpY2U6IERlY1NrZXRjaGZhYlNlcnZpY2UpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgZW52aXJvbm1lbnRDb25maWcoaWQpIHtcbiAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICAnb3B0aW9ucyc6IHtcbiAgICAgICAgJ3ZlcnNpb24nOiA3LFxuICAgICAgICAnYmFja2dyb3VuZCc6IHtcbiAgICAgICAgICAnZW5hYmxlJzogJ2FtYmllbnQnLFxuICAgICAgICAgICd1aWQnOiAnNTFhZjZhODcwY2NlNDQ5ZWI3NWIwMzQ1ZmVlYmFlYmInLFxuICAgICAgICAgICdjb2xvcic6IFtcbiAgICAgICAgICAgIDAuMixcbiAgICAgICAgICAgIDAuMixcbiAgICAgICAgICAgIDAuMlxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAgJ2Vudmlyb25tZW50Jzoge1xuICAgICAgICAgICdlbmFibGUnOiB0cnVlLFxuICAgICAgICAgICdiYWNrZ3JvdW5kRXhwb3N1cmUnOiAxLFxuICAgICAgICAgICdleHBvc3VyZSc6IDIuMjAwMDAwMDAwMDAwMDAxLFxuICAgICAgICAgICdyb3RhdGlvbic6IDQuNzEyMzg4OTgwMzg0NjksXG4gICAgICAgICAgJ3VpZCc6ICc4YTQwNzRhYzhhM2E0YjgzYmYxZjZhMTc3YTBmOWEzNCcsXG4gICAgICAgICAgJ2JsdXInOiAwLjEsXG4gICAgICAgICAgJ3NoYWRvd0VuYWJsZSc6IGZhbHNlLFxuICAgICAgICAgICdsaWdodEludGVuc2l0eSc6IDUsXG4gICAgICAgICAgJ3NoYWRvd0JpYXMnOiAwLjAwNVxuICAgICAgICB9LFxuICAgICAgICAnbGlnaHRpbmcnOiB7XG4gICAgICAgICAgJ2VuYWJsZSc6IGZhbHNlLFxuICAgICAgICAgICdsaWdodHMnOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICd0eXBlJzogJ0RJUkVDVElPTicsXG4gICAgICAgICAgICAgICdlbmFibGUnOiB0cnVlLFxuICAgICAgICAgICAgICAnY29sb3InOiBbXG4gICAgICAgICAgICAgICAgMC43ODA2MTIyNDQ5LFxuICAgICAgICAgICAgICAgIDAuNzk4NTIxNDQ5NCxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICdpbnRlbnNpdHknOiAwLjk2LFxuICAgICAgICAgICAgICAnZ3JvdW5kJzogW1xuICAgICAgICAgICAgICAgIDAuMyxcbiAgICAgICAgICAgICAgICAwLjIsXG4gICAgICAgICAgICAgICAgMC4yXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICdpbnRlbnNpdHlHcm91bmQnOiAxLFxuICAgICAgICAgICAgICAnbWF0cml4JzogW1xuICAgICAgICAgICAgICAgIC0wLjk4MTU4MDQ1LFxuICAgICAgICAgICAgICAgIDAuMTkwOTkyMjE2NyxcbiAgICAgICAgICAgICAgICAtMC4wMDQ2NjgzMjczLFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMC4xMzU0ODM0NzEsXG4gICAgICAgICAgICAgICAgMC43MTMxMTI2MDYyLFxuICAgICAgICAgICAgICAgIDAuNjg3ODMzMjkzNyxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDAuMTM0Njk5ODQ4NixcbiAgICAgICAgICAgICAgICAwLjY3NDUzMTIzMjgsXG4gICAgICAgICAgICAgICAgLTAuNzI1ODUzNjgxNCxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDYuODk3NDc1MzExOSxcbiAgICAgICAgICAgICAgICAzNC41Mzk5MTE0MzI4LFxuICAgICAgICAgICAgICAgIC0xLjI3MjU1NzA5MTcsXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAnZmFsbG9mZic6IDAuMDAwOTUzNDU4NixcbiAgICAgICAgICAgICAgJ2F0dGFjaGVkVG9DYW1lcmEnOiBmYWxzZSxcbiAgICAgICAgICAgICAgJ2FuZ2xlJzogNDUsXG4gICAgICAgICAgICAgICdoYXJkbmVzcyc6IDAuNSxcbiAgICAgICAgICAgICAgJ2Nhc3RTaGFkb3dzJzogZmFsc2UsXG4gICAgICAgICAgICAgICdzaGFkb3dCaWFzJzogMC4wMDVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICd0eXBlJzogJ0RJUkVDVElPTicsXG4gICAgICAgICAgICAgICdlbmFibGUnOiB0cnVlLFxuICAgICAgICAgICAgICAnY29sb3InOiBbXG4gICAgICAgICAgICAgICAgMSxcbiAgICAgICAgICAgICAgICAwLjg3ODMzMTk0NSxcbiAgICAgICAgICAgICAgICAwLjcwOTE4MzY3MzVcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgJ2ludGVuc2l0eSc6IDEsXG4gICAgICAgICAgICAgICdncm91bmQnOiBbXG4gICAgICAgICAgICAgICAgMC4zLFxuICAgICAgICAgICAgICAgIDAuMixcbiAgICAgICAgICAgICAgICAwLjJcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgJ2ludGVuc2l0eUdyb3VuZCc6IDEsXG4gICAgICAgICAgICAgICdtYXRyaXgnOiBbXG4gICAgICAgICAgICAgICAgMC43NzU1MjExNDk1LFxuICAgICAgICAgICAgICAgIC0wLjA2NjY2MDI4NixcbiAgICAgICAgICAgICAgICAwLjYyNzc5MjQ0NDIsXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwLjI2OTA0ODM3MzcsXG4gICAgICAgICAgICAgICAgMC45MzQ0ODQ2NTIzLFxuICAgICAgICAgICAgICAgIC0wLjIzMzEzMzg4MjUsXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAtMC41NzExMjE2MzI2LFxuICAgICAgICAgICAgICAgIDAuMzQ5NzA2NzkyNyxcbiAgICAgICAgICAgICAgICAwLjc0MjY0NzQ1MzMsXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAtMjkuMjQ0NjcyMzM2MixcbiAgICAgICAgICAgICAgICAxNy45MDcwMTg4NTYxLFxuICAgICAgICAgICAgICAgIDczLjkyMzIwNTkyNTcsXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAnZmFsbG9mZic6IDAuMDAwOTUzNDU4NixcbiAgICAgICAgICAgICAgJ2F0dGFjaGVkVG9DYW1lcmEnOiBmYWxzZSxcbiAgICAgICAgICAgICAgJ2FuZ2xlJzogNDUsXG4gICAgICAgICAgICAgICdoYXJkbmVzcyc6IDAuNSxcbiAgICAgICAgICAgICAgJ2Nhc3RTaGFkb3dzJzogZmFsc2UsXG4gICAgICAgICAgICAgICdzaGFkb3dCaWFzJzogMC4wMDVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICd0eXBlJzogJ0RJUkVDVElPTicsXG4gICAgICAgICAgICAgICdlbmFibGUnOiB0cnVlLFxuICAgICAgICAgICAgICAnY29sb3InOiBbXG4gICAgICAgICAgICAgICAgMC40MjM0NjkzODc4LFxuICAgICAgICAgICAgICAgIDAuNzM1MjY2NTU1NixcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICdpbnRlbnNpdHknOiAwLjEyLFxuICAgICAgICAgICAgICAnZ3JvdW5kJzogW1xuICAgICAgICAgICAgICAgIDAuOTY0Mjg1NzE0MyxcbiAgICAgICAgICAgICAgICAwLjY0ODQxMjg2MzcsXG4gICAgICAgICAgICAgICAgMC4yNjA3NTA3Mjg5XG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICdpbnRlbnNpdHlHcm91bmQnOiAwLjA2LFxuICAgICAgICAgICAgICAnbWF0cml4JzogW1xuICAgICAgICAgICAgICAgIDAuNjkwMzI5OTEzMSxcbiAgICAgICAgICAgICAgICAtMC43MDc2MzYzNjY5LFxuICAgICAgICAgICAgICAgIC0wLjE1MDY0OTg2OTksXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAtMC4wMTEwODk2OTgyLFxuICAgICAgICAgICAgICAgIDAuMTk3ODUxMzczLFxuICAgICAgICAgICAgICAgIC0wLjk4MDE2OTI5OCxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDAuNzIzNDA5NzI0NixcbiAgICAgICAgICAgICAgICAwLjY3ODMxMDg0NzksXG4gICAgICAgICAgICAgICAgMC4xMjg3MzUyNDc0LFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMzcuMDQyODMwNTE3NyxcbiAgICAgICAgICAgICAgICAzNC43MzM0NDk2MTc2LFxuICAgICAgICAgICAgICAgIDQyLjQ4NzM0NTQ2ODUsXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAnZmFsbG9mZic6IDAuMDAwOTUzNDU4NixcbiAgICAgICAgICAgICAgJ2F0dGFjaGVkVG9DYW1lcmEnOiBmYWxzZSxcbiAgICAgICAgICAgICAgJ2FuZ2xlJzogNDUsXG4gICAgICAgICAgICAgICdoYXJkbmVzcyc6IDAuNSxcbiAgICAgICAgICAgICAgJ2Nhc3RTaGFkb3dzJzogZmFsc2UsXG4gICAgICAgICAgICAgICdzaGFkb3dCaWFzJzogMC4wMDVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgICdvcmllbnRhdGlvbic6IHtcbiAgICAgICAgICAnbWF0cml4JzogW1xuICAgICAgICAgICAgMSxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAxLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLmRlY1NrZXRjaGZhYlNlcnZpY2UucGFjaENvbmZpZ3MoaWQsIGNvbmZpZykuc3Vic2NyaWJlKHJlc3AgPT4ge1xuICAgICAgdGhpcy5kZWNTa2V0Y2hmYWJTZXJ2aWNlLmdldEFsbFRleHR1cmVzKGlkKS5zdWJzY3JpYmUodGV4dHVyZVJlc3AgPT4ge1xuICAgICAgICBpZiAodGV4dHVyZVJlc3ApIHtcbiAgICAgICAgICB0aGlzLnNrZXRjaGZhYklkID0gaWQ7XG4gICAgICAgICAgdGhpcy50ZXh0dXJlcyA9IHRleHR1cmVSZXNwLnJlc3VsdHM7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgbWF0ZXJpYWxTZWxlY3RlZChtKSB7XG4gICAgaWYgKG0pIHtcbiAgICAgIHRoaXMudXBkYXRlID0gZmFsc2U7XG4gICAgICB0aGlzLm1hdGVyaWFsID0gbTtcbiAgICAgIHRoaXMuc2VsZWN0TWF0ZXJpYWxCeU5hbWUobS5uYW1lKTtcbiAgICB9XG4gIH1cblxuICBzZWxlY3RNYXRlcmlhbEJ5TmFtZShuYW1lKSB7XG4gICAgdGhpcy5tYXRlcmlhbE5hbWUgPSBuYW1lO1xuICAgIHRoaXMubWF0ZXJpYWxDb25maWcgPSB0aGlzLm1hdGVyaWFscy5maWx0ZXIoeCA9PiB4Lm1hdGVyaWFsTmFtZSA9PT0gbmFtZSk7XG4gICAgdGhpcy5tYXRlcmlhbENvbmZpZyA9IHRoaXMubWF0ZXJpYWxDb25maWdbMF07XG4gIH1cblxuICBnZXRNYXRlcmlhbHMoY29uZmlncykge1xuICAgIGlmIChjb25maWdzKSB7XG4gICAgICB0aGlzLm1hdGVyaWFscyA9IGNvbmZpZ3M7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlTWF0ZXJpYWwobWF0ZXJpYWwsICRldmVudCkge1xuICAgIHN3aXRjaCAobWF0ZXJpYWwpIHtcbiAgICAgIGNhc2UgJ21ldGFsJzoge1xuICAgICAgICB0aGlzLm1hdGVyaWFsLmNoYW5uZWxzLk1ldGFsbmVzc1BCUi5mYWN0b3IgPSAkZXZlbnQudmFsdWUgLyAxMDA7XG4gICAgICAgIHRoaXMubWF0ZXJpYWxDb25maWcuY29uZmlnLm1ldGFsbmVzcyA9ICRldmVudC52YWx1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlICdiYXNlLWNvbG9yJzoge1xuICAgICAgICB0aGlzLm1hdGVyaWFsLmNoYW5uZWxzLkFsYmVkb1BCUi5mYWN0b3IgPSAkZXZlbnQudmFsdWUgLyAxMDA7XG4gICAgICAgIHRoaXMubWF0ZXJpYWxDb25maWcuY29uZmlnLmRpZmZ1c2UgPSAkZXZlbnQudmFsdWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSAncm91Zyc6IHtcbiAgICAgICAgdGhpcy5tYXRlcmlhbC5jaGFubmVscy5Sb3VnaG5lc3NQQlIuZmFjdG9yID0gJGV2ZW50LnZhbHVlIC8gMTAwO1xuICAgICAgICB0aGlzLm1hdGVyaWFsQ29uZmlnLmNvbmZpZy5yb3VnaG5lc3MgPSAkZXZlbnQudmFsdWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSAnbm9ybWFsJzoge1xuICAgICAgICB0aGlzLm1hdGVyaWFsLmNoYW5uZWxzLk5vcm1hbE1hcC5lbmFibGUgPSAkZXZlbnQuY2hlY2tlZDtcbiAgICAgICAgdGhpcy5tYXRlcmlhbENvbmZpZy5jb25maWcubm9ybWFsID0gJGV2ZW50LmNoZWNrZWQ7XG4gICAgICAgIGlmICgkZXZlbnQuY2hlY2tlZCkge1xuICAgICAgICAgIHRoaXMubWF0ZXJpYWwuY2hhbm5lbHMuTm9ybWFsTWFwLmZhY3RvciA9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5tYXRlcmlhbC5jaGFubmVscy5Ob3JtYWxNYXAuZmFjdG9yID0gMDtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgJ29wYWNpdHknOiB7XG4gICAgICAgIHRoaXMubWF0ZXJpYWwuY2hhbm5lbHMuT3BhY2l0eS5mYWN0b3IgPSAkZXZlbnQudmFsdWUgLyAxMDA7XG4gICAgICAgIHRoaXMubWF0ZXJpYWxDb25maWcuY29uZmlnLm9wYWNpdHkgPSAkZXZlbnQudmFsdWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnNlbmRNYXRlcmlhbFRvVXBkYXRlKCk7XG4gIH1cblxuXG4gIGFibGVUbyh0eXBlKSB7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdtZXRhbCc6XG4gICAgICAgIHRoaXMubWF0ZXJpYWxDb25maWcuY29uZmlnLm1ldGFsbmVzc0VuYWJsZWQgPSAhdGhpcy5tYXRlcmlhbENvbmZpZy5jb25maWcubWV0YWxuZXNzRW5hYmxlZDtcbiAgICAgICAgdGhpcy5zZXRUZXh0dXJlKCdtZXRhbCcpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2Jhc2UtY29sb3InOlxuICAgICAgICB0aGlzLm1hdGVyaWFsQ29uZmlnLmNvbmZpZy5kaWZmdXNlRW5hYmxlZCA9ICF0aGlzLm1hdGVyaWFsQ29uZmlnLmNvbmZpZy5kaWZmdXNlRW5hYmxlZDtcbiAgICAgICAgdGhpcy5zZXRUZXh0dXJlKCdiYXNlLWNvbG9yJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncm91Zyc6XG4gICAgICAgIHRoaXMubWF0ZXJpYWxDb25maWcuY29uZmlnLnJvdWdobmVzc0VuYWJsZWQgPSAhdGhpcy5tYXRlcmlhbENvbmZpZy5jb25maWcucm91Z2huZXNzRW5hYmxlZDtcbiAgICAgICAgdGhpcy5zZXRUZXh0dXJlKCdyb3VnJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnb3BhY2l0eSc6XG4gICAgICAgIHRoaXMubWF0ZXJpYWxDb25maWcuY29uZmlnLm9wYWNpdHlFbmFibGVkID0gIXRoaXMubWF0ZXJpYWxDb25maWcuY29uZmlnLm9wYWNpdHlFbmFibGVkO1xuICAgICAgICB0aGlzLnNldFRleHR1cmUoJ29wYWNpdHknKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgc2V0VGV4dHVyZSh0eXBlKSB7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdtZXRhbCc6XG4gICAgICAgIGlmICh0aGlzLm1hdGVyaWFsLmNoYW5uZWxzLk1ldGFsbmVzc1BCUi50ZXh0dXJlKSB7XG4gICAgICAgICAgZGVsZXRlIHRoaXMubWF0ZXJpYWwuY2hhbm5lbHMuTWV0YWxuZXNzUEJSLnRleHR1cmU7XG4gICAgICAgICAgdGhpcy5tYXRlcmlhbC5jaGFubmVscy5NZXRhbG5lc3NQQlIuY29sb3IgPSBbMSwgMSwgMV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGVsZXRlIHRoaXMubWF0ZXJpYWwuY2hhbm5lbHMuTWV0YWxuZXNzUEJSLmNvbG9yO1xuICAgICAgICAgIHRoaXMubWF0ZXJpYWwuY2hhbm5lbHMuTWV0YWxuZXNzUEJSLnRleHR1cmUgPSB0aGlzLmdldFRleHR1cmUodGhpcy5tYXRlcmlhbENvbmZpZy5tYXRlcmlhbE5hbWUgKyAnX01FVEFMTElDLmpwZycpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncm91Zyc6XG4gICAgICAgIGlmICh0aGlzLm1hdGVyaWFsLmNoYW5uZWxzLlJvdWdobmVzc1BCUi50ZXh0dXJlKSB7XG4gICAgICAgICAgZGVsZXRlIHRoaXMubWF0ZXJpYWwuY2hhbm5lbHMuUm91Z2huZXNzUEJSLnRleHR1cmU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5tYXRlcmlhbC5jaGFubmVscy5Sb3VnaG5lc3NQQlIudGV4dHVyZSA9IHRoaXMuZ2V0VGV4dHVyZSh0aGlzLm1hdGVyaWFsQ29uZmlnLm1hdGVyaWFsTmFtZSArICdfUk9VR0hORVNTLmpwZycpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnb3BhY2l0eSc6XG4gICAgICAgIGlmICh0aGlzLm1hdGVyaWFsLmNoYW5uZWxzLk9wYWNpdHkudGV4dHVyZSkge1xuICAgICAgICAgIGRlbGV0ZSB0aGlzLm1hdGVyaWFsLmNoYW5uZWxzLk9wYWNpdHkudGV4dHVyZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm1hdGVyaWFsLmNoYW5uZWxzLk9wYWNpdHkudGV4dHVyZSA9IHRoaXMuZ2V0VGV4dHVyZSh0aGlzLm1hdGVyaWFsQ29uZmlnLm1hdGVyaWFsTmFtZSArICdfVFJBTlNQQVJFTlQuanBnJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHRoaXMuc2VuZE1hdGVyaWFsVG9VcGRhdGUoKTtcbiAgfVxuXG4gIGdldFRleHR1cmUobmFtZSkge1xuICAgIHJldHVybiB0aGlzLnRleHR1cmVzLmZpbmQoeCA9PiB4Lm5hbWUgPT09IG5hbWUpO1xuICB9XG5cbiAgc2VuZE1hdGVyaWFsVG9VcGRhdGUoKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnVwZGF0ZSA9IHRydWU7XG4gICAgICB0aGlzLm1hdGVyaWFsID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLm1hdGVyaWFsKSk7XG4gICAgfSwgMjAwKTtcbiAgfVxuXG4gIG9uU2F2ZSgpIHtcbiAgICB0aGlzLmdldE1hdGVyaWFsc1NrZXRjaGZhYiA9IHRydWU7XG4gIH1cblxuICBnZXRBbGxNYXRlcmlhbHMoJGV2ZW50KSB7XG4gICAgY29uc3QgbWF0ID0ge307XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8ICRldmVudC5sZW5ndGg7IGkrKykge1xuICAgICAgbWF0WyRldmVudFtpXS5pZF0gPSAkZXZlbnRbaV07XG4gICAgfVxuXG4gICAgY29uc3QgY29uZmlnID0ge1xuICAgICAgJ29wdGlvbnMnOiB7XG4gICAgICAgICdtYXRlcmlhbHMnOiBtYXRcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5kZWNTa2V0Y2hmYWJTZXJ2aWNlLnBhY2hDb25maWdzKHRoaXMuYXNzZXRNYXguZmJ4RmlsZXMuZmJ4QWxsR3JvdXBzRmlsZS5za2V0Y2hmYWJJZCwgY29uZmlnKS5zdWJzY3JpYmUocmVzcCA9PiB7XG4gICAgICB0aGlzLmdldE1hdGVyaWFsc1NrZXRjaGZhYiA9IGZhbHNlO1xuICAgICAgdGhpcy5zYXZlLmVtaXQodGhpcy5hc3NldE1heCk7XG4gICAgfSk7XG4gIH1cbn1cblxuIl19