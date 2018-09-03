/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
        var /** @type {?} */ config = {
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
        var /** @type {?} */ mat = {};
        for (var /** @type {?} */ i = 0; i < $event.length; i++) {
            mat[$event[i].id] = $event[i];
        }
        var /** @type {?} */ config = {
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
                    template: "<div fxLayout=\"column\" class=\"container\" fxLayoutGap=\"32px\" fxLayoutAlign=\"space-between center\">\n    <dec-sketchfab-view [materialName]=\"materialName\" \n        [sketchfabId]=\"sketchfabId\" \n        [editMode]=\"editMode\"\n        [material]=\"material\" \n        [update]=\"update\"\n        [getAllMaterials]=\"getMaterialsSketchfab\"\n        (sendMaterials)=\"getAllMaterials($event)\"\n        (materialSelected)=\"materialSelected($event)\">\n    </dec-sketchfab-view>\n    <div fxLayout=\"row\" style=\"width: 100%\" fxLayoutAlign=\"space-between start\" fxLayoutGap=\"32px\">\n        <mat-form-field fxFlex=\"40\">\n            <mat-select [(ngModel)]=\"materialName\" name=\"config\" placeholder=\"Material ID\">\n                <mat-option *ngFor=\"let config of assetMax?.renderMaterialConfigs\" [value]=\"config.materialName\">\n                    {{ config.materialName }}\n                </mat-option>\n            </mat-select>\n        </mat-form-field>\n\n        <div fxFlex=\"60\" class=\"polygon-count dec-color-gray text-right\">\n            {{ 'label.polygon' | translate }}: {{ assetMax?.fbxFiles?.fbxAllGroupsFile?.fbxOriginalPolyCount }} - {{ 'label.current-polygon'\n            | translate }} {{ assetMax?.fbxFiles?.fbxAllGroupsFile?.fbxPolyCount }}\n        </div>\n\n    </div>\n\n    <div *ngIf=\"materialConfig\" fxLayout=\"row\" class=\"row-size\" fxLayoutAlign=\"space-between start\" fxLayoutGap=\"16px\">\n        <div fxFlex=\"30\" fxLayout=\"column\" fxLayoutGap=\"8px\">\n            <div fxLayout=\"column\">\n                <div fxLayout=\"row\" fxLayoutAlign=\"start start\" class=\"row-span-icon\" fxLayoutGap=\"8px\">\n                    <span class=\"setting-name\">Base Color {{ materialConfig?.config?.diffuse }}</span>\n                    <mat-icon class=\"md-span-icon click\" (click)=\"ableTo('base-color')\">\n                        {{ materialConfig?.config?.diffuseEnabled ? 'lock_open' : 'lock_outline' }}\n                    </mat-icon>\n                </div>\n                <mat-slider class=\"slider-position\" [max]=\"100\" [min]=\"0\" [step]=\"1\" [disabled]=\"!materialConfig?.config?.diffuseEnabled\"\n                    [(ngModel)]=\"materialConfig.config.diffuse\" (input)=\"updateMaterial('base-color', $event)\">\n                </mat-slider>\n\n            </div>\n\n            <div fxLayout=\"column\">\n                <div fxLayout=\"row\" fxLayoutAlign=\"start start\" class=\"row-span-icon\" fxLayoutGap=\"8px\">\n                    <span class=\"setting-name\">Roughness {{ materialConfig?.config?.roughness }}</span>\n                    <mat-icon class=\"md-span-icon click\" (click)=\"ableTo('roug')\">\n                        {{ materialConfig?.config?.roughnessEnabled ? 'lock_open' : 'lock_outline' }}\n                    </mat-icon>\n                </div>\n                <mat-slider class=\"slider-position\" [max]=\"100\" [min]=\"0\" [step]=\"1\" [disabled]=\"!materialConfig?.config?.roughnessEnabled\"\n                    [(ngModel)]=\"materialConfig.config.roughness\" (input)=\"updateMaterial('roug', $event)\">\n                </mat-slider>\n            </div>\n        </div>\n\n        <div fxFlex=\"30\" fxLayout=\"column\" fxLayoutGap=\"8px\">\n\n            <mat-form-field>\n                <mat-select class=\"polygon-select\" fxFill [(ngModel)]=\"materialConfig.adjustOptimize\" name=\"config\" placeholder=\"{{ 'label.polygon-reduction' | translate }}\">\n                    <mat-option *ngFor=\"let config of configSelect\" [value]=\"config\">\n                        {{ 'label.'+config | translate }}\n                        <span class=\"position-polygon-number gray\" *ngIf=\"config === 'OFF'\">\n                            {{ materialConfig?.fbxPolyCountOrigin}}\n                        </span>\n                        <span class=\"position-polygon-number gray\" *ngIf=\"materialConfig?.adjustOptimize === config\">\n                            {{ materialConfig?.fbxPolyCount}}\n                        </span>\n                    </mat-option>\n                </mat-select>\n            </mat-form-field>\n\n            <div fxLayout=\"column\" class=\"metalness-position\">\n                <div fxLayout=\"row\" fxLayoutAlign=\"start start\" class=\"row-span-icon\" fxLayoutGap=\"8px\">\n                    <span class=\"setting-name\">Metalness {{ materialConfig?.config?.metalness }}</span>\n                    <mat-icon class=\"md-span-icon click\" (click)=\"ableTo('metal')\">\n                        {{ materialConfig?.config?.metalnessEnabled ? 'lock_open' : 'lock_outline' }}\n                    </mat-icon>\n                </div>\n                <mat-slider class=\"slider-position\" [max]=\"100\" [min]=\"0\" [step]=\"1\" [disabled]=\"!materialConfig?.config?.metalnessEnabled\"\n                    [(ngModel)]=\"materialConfig.config.metalness\" (input)=\"updateMaterial('metal', $event)\">\n                </mat-slider>\n            </div>\n\n        </div>\n\n        <div fxFlex=\"30\" fxLayout=\"column\" fxLayoutGap=\"8px\">\n            <div>\n              <mat-checkbox class=\"check-box-normal-map\" (input)=\"updateMaterial('normal', $event)\" [(ngModel)]=\"checked\" [labelPosition]=\"align\">\n                Normal Map\n              </mat-checkbox>\n            </div>\n            <div fxLayout=\"column\" class=\"opacity-position\" fxLayoutGap=\"8px\">\n              <div fxLayout=\"row\" fxLayoutAlign=\"start start\" class=\"opacity-position-text\" fxLayoutGap=\"8px\">\n                <span class=\"setting-name\">Opacity {{ materialConfig?.config?.opacity }}</span>\n                <mat-icon class=\"md-span-icon click\" (click)=\"ableTo('opacity')\">\n                  {{ materialConfig?.config?.opacityEnabled ? 'lock_open' : 'lock_outline' }}\n                </mat-icon>\n              </div>\n              <mat-slider class=\"slider-position\" [max]=\"100\" [min]=\"0\" [step]=\"1\" [disabled]=\"!materialConfig?.config?.opacityEnabled\"\n                [(ngModel)]=\"materialConfig.config.opacity\" (input)=\"updateMaterial('opacity', $event)\">\n              </mat-slider>\n            </div>\n          </div>\n    </div>\n    <div class=\"text-right save-button-div\">\n        <button mat-raised-button type=\"button\" color=\"primary\" (click)=\"onSave()\">{{ 'label.save' | translate }}</button>\n    </div>\n</div>",
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLXNrZXRjaGZhYi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGVjLXNrZXRjaGZhYi9kZWMtc2tldGNoZmFiLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7SUF3SjVELCtCQUFvQixtQkFBd0M7UUFBeEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtvQkF4QjNDLElBQUksWUFBWSxFQUFFO3dCQVV4QixJQUFJO3NCQUNOLEtBQUs7cUNBQ1UsS0FBSzt1QkFHbkIsSUFBSTs0QkFFQztZQUNiLEtBQUs7WUFDTCxLQUFLO1lBQ0wsUUFBUTtZQUNSLE1BQU07U0FDUDtLQUVnRTtJQXJDakUsc0JBQ0ksMkNBQVE7Ozs7UUFRWjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1NBQ3ZCOzs7OztRQVhELFVBQ2EsQ0FBTTtZQUNqQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNOLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO2dCQUNuQixJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDaEUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQzthQUM1QztTQUNGOzs7T0FBQTs7OztJQWdDRCx3Q0FBUTs7O0lBQVI7S0FDQzs7Ozs7SUFFRCxpREFBaUI7Ozs7SUFBakIsVUFBa0IsRUFBRTtRQUFwQixpQkFvTEM7UUFuTEMscUJBQU0sTUFBTSxHQUFHO1lBQ2Is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TUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3ZDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQy9CO1FBRUQscUJBQU0sTUFBTSxHQUFHO1lBQ2IsU0FBUyxFQUFFO2dCQUNULFdBQVcsRUFBRSxHQUFHO2FBQ2pCO1NBQ0YsQ0FBQztRQUVGLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLElBQUk7WUFDOUcsS0FBSSxDQUFDLHFCQUFxQixHQUFHLEtBQUssQ0FBQztZQUNuQyxLQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDL0IsQ0FBQyxDQUFDO0tBQ0o7O2dCQTVkRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLFFBQVEsRUFBRSwweE1BMEdMO29CQUNMLE1BQU0sRUFBRSxDQUFDLGtoQkFBa2hCLENBQUM7aUJBQzdoQjs7OztnQkFoSFEsbUJBQW1COzs7MkJBbUh6QixLQUFLO3VCQWFMLE1BQU07O2dDQWpJVDs7U0FrSGEscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVjU2tldGNoZmFiU2VydmljZSB9IGZyb20gJy4vZGVjLXNrZXRjaGZhYi5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLXNrZXRjaGZhYicsXG4gIHRlbXBsYXRlOiBgPGRpdiBmeExheW91dD1cImNvbHVtblwiIGNsYXNzPVwiY29udGFpbmVyXCIgZnhMYXlvdXRHYXA9XCIzMnB4XCIgZnhMYXlvdXRBbGlnbj1cInNwYWNlLWJldHdlZW4gY2VudGVyXCI+XG4gICAgPGRlYy1za2V0Y2hmYWItdmlldyBbbWF0ZXJpYWxOYW1lXT1cIm1hdGVyaWFsTmFtZVwiIFxuICAgICAgICBbc2tldGNoZmFiSWRdPVwic2tldGNoZmFiSWRcIiBcbiAgICAgICAgW2VkaXRNb2RlXT1cImVkaXRNb2RlXCJcbiAgICAgICAgW21hdGVyaWFsXT1cIm1hdGVyaWFsXCIgXG4gICAgICAgIFt1cGRhdGVdPVwidXBkYXRlXCJcbiAgICAgICAgW2dldEFsbE1hdGVyaWFsc109XCJnZXRNYXRlcmlhbHNTa2V0Y2hmYWJcIlxuICAgICAgICAoc2VuZE1hdGVyaWFscyk9XCJnZXRBbGxNYXRlcmlhbHMoJGV2ZW50KVwiXG4gICAgICAgIChtYXRlcmlhbFNlbGVjdGVkKT1cIm1hdGVyaWFsU2VsZWN0ZWQoJGV2ZW50KVwiPlxuICAgIDwvZGVjLXNrZXRjaGZhYi12aWV3PlxuICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBzdHlsZT1cIndpZHRoOiAxMDAlXCIgZnhMYXlvdXRBbGlnbj1cInNwYWNlLWJldHdlZW4gc3RhcnRcIiBmeExheW91dEdhcD1cIjMycHhcIj5cbiAgICAgICAgPG1hdC1mb3JtLWZpZWxkIGZ4RmxleD1cIjQwXCI+XG4gICAgICAgICAgICA8bWF0LXNlbGVjdCBbKG5nTW9kZWwpXT1cIm1hdGVyaWFsTmFtZVwiIG5hbWU9XCJjb25maWdcIiBwbGFjZWhvbGRlcj1cIk1hdGVyaWFsIElEXCI+XG4gICAgICAgICAgICAgICAgPG1hdC1vcHRpb24gKm5nRm9yPVwibGV0IGNvbmZpZyBvZiBhc3NldE1heD8ucmVuZGVyTWF0ZXJpYWxDb25maWdzXCIgW3ZhbHVlXT1cImNvbmZpZy5tYXRlcmlhbE5hbWVcIj5cbiAgICAgICAgICAgICAgICAgICAge3sgY29uZmlnLm1hdGVyaWFsTmFtZSB9fVxuICAgICAgICAgICAgICAgIDwvbWF0LW9wdGlvbj5cbiAgICAgICAgICAgIDwvbWF0LXNlbGVjdD5cbiAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cblxuICAgICAgICA8ZGl2IGZ4RmxleD1cIjYwXCIgY2xhc3M9XCJwb2x5Z29uLWNvdW50IGRlYy1jb2xvci1ncmF5IHRleHQtcmlnaHRcIj5cbiAgICAgICAgICAgIHt7ICdsYWJlbC5wb2x5Z29uJyB8IHRyYW5zbGF0ZSB9fToge3sgYXNzZXRNYXg/LmZieEZpbGVzPy5mYnhBbGxHcm91cHNGaWxlPy5mYnhPcmlnaW5hbFBvbHlDb3VudCB9fSAtIHt7ICdsYWJlbC5jdXJyZW50LXBvbHlnb24nXG4gICAgICAgICAgICB8IHRyYW5zbGF0ZSB9fSB7eyBhc3NldE1heD8uZmJ4RmlsZXM/LmZieEFsbEdyb3Vwc0ZpbGU/LmZieFBvbHlDb3VudCB9fVxuICAgICAgICA8L2Rpdj5cblxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiAqbmdJZj1cIm1hdGVyaWFsQ29uZmlnXCIgZnhMYXlvdXQ9XCJyb3dcIiBjbGFzcz1cInJvdy1zaXplXCIgZnhMYXlvdXRBbGlnbj1cInNwYWNlLWJldHdlZW4gc3RhcnRcIiBmeExheW91dEdhcD1cIjE2cHhcIj5cbiAgICAgICAgPGRpdiBmeEZsZXg9XCIzMFwiIGZ4TGF5b3V0PVwiY29sdW1uXCIgZnhMYXlvdXRHYXA9XCI4cHhcIj5cbiAgICAgICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJjb2x1bW5cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cInN0YXJ0IHN0YXJ0XCIgY2xhc3M9XCJyb3ctc3Bhbi1pY29uXCIgZnhMYXlvdXRHYXA9XCI4cHhcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzZXR0aW5nLW5hbWVcIj5CYXNlIENvbG9yIHt7IG1hdGVyaWFsQ29uZmlnPy5jb25maWc/LmRpZmZ1c2UgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cIm1kLXNwYW4taWNvbiBjbGlja1wiIChjbGljayk9XCJhYmxlVG8oJ2Jhc2UtY29sb3InKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge3sgbWF0ZXJpYWxDb25maWc/LmNvbmZpZz8uZGlmZnVzZUVuYWJsZWQgPyAnbG9ja19vcGVuJyA6ICdsb2NrX291dGxpbmUnIH19XG4gICAgICAgICAgICAgICAgICAgIDwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPG1hdC1zbGlkZXIgY2xhc3M9XCJzbGlkZXItcG9zaXRpb25cIiBbbWF4XT1cIjEwMFwiIFttaW5dPVwiMFwiIFtzdGVwXT1cIjFcIiBbZGlzYWJsZWRdPVwiIW1hdGVyaWFsQ29uZmlnPy5jb25maWc/LmRpZmZ1c2VFbmFibGVkXCJcbiAgICAgICAgICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJtYXRlcmlhbENvbmZpZy5jb25maWcuZGlmZnVzZVwiIChpbnB1dCk9XCJ1cGRhdGVNYXRlcmlhbCgnYmFzZS1jb2xvcicsICRldmVudClcIj5cbiAgICAgICAgICAgICAgICA8L21hdC1zbGlkZXI+XG5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwiY29sdW1uXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJzdGFydCBzdGFydFwiIGNsYXNzPVwicm93LXNwYW4taWNvblwiIGZ4TGF5b3V0R2FwPVwiOHB4XCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic2V0dGluZy1uYW1lXCI+Um91Z2huZXNzIHt7IG1hdGVyaWFsQ29uZmlnPy5jb25maWc/LnJvdWdobmVzcyB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwibWQtc3Bhbi1pY29uIGNsaWNrXCIgKGNsaWNrKT1cImFibGVUbygncm91ZycpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7eyBtYXRlcmlhbENvbmZpZz8uY29uZmlnPy5yb3VnaG5lc3NFbmFibGVkID8gJ2xvY2tfb3BlbicgOiAnbG9ja19vdXRsaW5lJyB9fVxuICAgICAgICAgICAgICAgICAgICA8L21hdC1pY29uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxtYXQtc2xpZGVyIGNsYXNzPVwic2xpZGVyLXBvc2l0aW9uXCIgW21heF09XCIxMDBcIiBbbWluXT1cIjBcIiBbc3RlcF09XCIxXCIgW2Rpc2FibGVkXT1cIiFtYXRlcmlhbENvbmZpZz8uY29uZmlnPy5yb3VnaG5lc3NFbmFibGVkXCJcbiAgICAgICAgICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJtYXRlcmlhbENvbmZpZy5jb25maWcucm91Z2huZXNzXCIgKGlucHV0KT1cInVwZGF0ZU1hdGVyaWFsKCdyb3VnJywgJGV2ZW50KVwiPlxuICAgICAgICAgICAgICAgIDwvbWF0LXNsaWRlcj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGZ4RmxleD1cIjMwXCIgZnhMYXlvdXQ9XCJjb2x1bW5cIiBmeExheW91dEdhcD1cIjhweFwiPlxuXG4gICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICAgICAgPG1hdC1zZWxlY3QgY2xhc3M9XCJwb2x5Z29uLXNlbGVjdFwiIGZ4RmlsbCBbKG5nTW9kZWwpXT1cIm1hdGVyaWFsQ29uZmlnLmFkanVzdE9wdGltaXplXCIgbmFtZT1cImNvbmZpZ1wiIHBsYWNlaG9sZGVyPVwie3sgJ2xhYmVsLnBvbHlnb24tcmVkdWN0aW9uJyB8IHRyYW5zbGF0ZSB9fVwiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LW9wdGlvbiAqbmdGb3I9XCJsZXQgY29uZmlnIG9mIGNvbmZpZ1NlbGVjdFwiIFt2YWx1ZV09XCJjb25maWdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt7ICdsYWJlbC4nK2NvbmZpZyB8IHRyYW5zbGF0ZSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwb3NpdGlvbi1wb2x5Z29uLW51bWJlciBncmF5XCIgKm5nSWY9XCJjb25maWcgPT09ICdPRkYnXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgbWF0ZXJpYWxDb25maWc/LmZieFBvbHlDb3VudE9yaWdpbn19XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInBvc2l0aW9uLXBvbHlnb24tbnVtYmVyIGdyYXlcIiAqbmdJZj1cIm1hdGVyaWFsQ29uZmlnPy5hZGp1c3RPcHRpbWl6ZSA9PT0gY29uZmlnXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgbWF0ZXJpYWxDb25maWc/LmZieFBvbHlDb3VudH19XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvbWF0LW9wdGlvbj5cbiAgICAgICAgICAgICAgICA8L21hdC1zZWxlY3Q+XG4gICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuXG4gICAgICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwiY29sdW1uXCIgY2xhc3M9XCJtZXRhbG5lc3MtcG9zaXRpb25cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cInN0YXJ0IHN0YXJ0XCIgY2xhc3M9XCJyb3ctc3Bhbi1pY29uXCIgZnhMYXlvdXRHYXA9XCI4cHhcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzZXR0aW5nLW5hbWVcIj5NZXRhbG5lc3Mge3sgbWF0ZXJpYWxDb25maWc/LmNvbmZpZz8ubWV0YWxuZXNzIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJtZC1zcGFuLWljb24gY2xpY2tcIiAoY2xpY2spPVwiYWJsZVRvKCdtZXRhbCcpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7eyBtYXRlcmlhbENvbmZpZz8uY29uZmlnPy5tZXRhbG5lc3NFbmFibGVkID8gJ2xvY2tfb3BlbicgOiAnbG9ja19vdXRsaW5lJyB9fVxuICAgICAgICAgICAgICAgICAgICA8L21hdC1pY29uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxtYXQtc2xpZGVyIGNsYXNzPVwic2xpZGVyLXBvc2l0aW9uXCIgW21heF09XCIxMDBcIiBbbWluXT1cIjBcIiBbc3RlcF09XCIxXCIgW2Rpc2FibGVkXT1cIiFtYXRlcmlhbENvbmZpZz8uY29uZmlnPy5tZXRhbG5lc3NFbmFibGVkXCJcbiAgICAgICAgICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJtYXRlcmlhbENvbmZpZy5jb25maWcubWV0YWxuZXNzXCIgKGlucHV0KT1cInVwZGF0ZU1hdGVyaWFsKCdtZXRhbCcsICRldmVudClcIj5cbiAgICAgICAgICAgICAgICA8L21hdC1zbGlkZXI+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGZ4RmxleD1cIjMwXCIgZnhMYXlvdXQ9XCJjb2x1bW5cIiBmeExheW91dEdhcD1cIjhweFwiPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPG1hdC1jaGVja2JveCBjbGFzcz1cImNoZWNrLWJveC1ub3JtYWwtbWFwXCIgKGlucHV0KT1cInVwZGF0ZU1hdGVyaWFsKCdub3JtYWwnLCAkZXZlbnQpXCIgWyhuZ01vZGVsKV09XCJjaGVja2VkXCIgW2xhYmVsUG9zaXRpb25dPVwiYWxpZ25cIj5cbiAgICAgICAgICAgICAgICBOb3JtYWwgTWFwXG4gICAgICAgICAgICAgIDwvbWF0LWNoZWNrYm94PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwiY29sdW1uXCIgY2xhc3M9XCJvcGFjaXR5LXBvc2l0aW9uXCIgZnhMYXlvdXRHYXA9XCI4cHhcIj5cbiAgICAgICAgICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJzdGFydCBzdGFydFwiIGNsYXNzPVwib3BhY2l0eS1wb3NpdGlvbi10ZXh0XCIgZnhMYXlvdXRHYXA9XCI4cHhcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNldHRpbmctbmFtZVwiPk9wYWNpdHkge3sgbWF0ZXJpYWxDb25maWc/LmNvbmZpZz8ub3BhY2l0eSB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJtZC1zcGFuLWljb24gY2xpY2tcIiAoY2xpY2spPVwiYWJsZVRvKCdvcGFjaXR5JylcIj5cbiAgICAgICAgICAgICAgICAgIHt7IG1hdGVyaWFsQ29uZmlnPy5jb25maWc/Lm9wYWNpdHlFbmFibGVkID8gJ2xvY2tfb3BlbicgOiAnbG9ja19vdXRsaW5lJyB9fVxuICAgICAgICAgICAgICAgIDwvbWF0LWljb24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8bWF0LXNsaWRlciBjbGFzcz1cInNsaWRlci1wb3NpdGlvblwiIFttYXhdPVwiMTAwXCIgW21pbl09XCIwXCIgW3N0ZXBdPVwiMVwiIFtkaXNhYmxlZF09XCIhbWF0ZXJpYWxDb25maWc/LmNvbmZpZz8ub3BhY2l0eUVuYWJsZWRcIlxuICAgICAgICAgICAgICAgIFsobmdNb2RlbCldPVwibWF0ZXJpYWxDb25maWcuY29uZmlnLm9wYWNpdHlcIiAoaW5wdXQpPVwidXBkYXRlTWF0ZXJpYWwoJ29wYWNpdHknLCAkZXZlbnQpXCI+XG4gICAgICAgICAgICAgIDwvbWF0LXNsaWRlcj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXJpZ2h0IHNhdmUtYnV0dG9uLWRpdlwiPlxuICAgICAgICA8YnV0dG9uIG1hdC1yYWlzZWQtYnV0dG9uIHR5cGU9XCJidXR0b25cIiBjb2xvcj1cInByaW1hcnlcIiAoY2xpY2spPVwib25TYXZlKClcIj57eyAnbGFiZWwuc2F2ZScgfCB0cmFuc2xhdGUgfX08L2J1dHRvbj5cbiAgICA8L2Rpdj5cbjwvZGl2PmAsXG4gIHN0eWxlczogW2AuY29udGFpbmVye21heC13aWR0aDo2MjBweCFpbXBvcnRhbnR9LnNldHRpbmctbmFtZXt3aWR0aDoxMDBweDtkaXNwbGF5OmlubGluZS1ibG9ja30ubWQtc3Bhbi1pY29ue3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDotNXB4O2xlZnQ6LTVweH0uc2xpZGVyLXBvc2l0aW9ue3Bvc2l0aW9uOnJlbGF0aXZlO2xlZnQ6LThweDt0b3A6LThweH0ucm93LXNpemV7d2lkdGg6MTAwJX0ucG9seWdvbi1zZWxlY3R7cG9zaXRpb246cmVsYXRpdmU7dG9wOi01cHh9Lm1ldGFsbmVzcy1wb3NpdGlvbntwb3NpdGlvbjpyZWxhdGl2ZTt0b3A6MTZweH0ucG9seWdvbi1jb3VudHtmb250LXNpemU6MTJweDtwb3NpdGlvbjpyZWxhdGl2ZTt0b3A6MjdweH0ub3BhY2l0eS1wb3NpdGlvbntwb3NpdGlvbjpyZWxhdGl2ZTt0b3A6NDBweH0ub3BhY2l0eS1wb3NpdGlvbi10ZXh0e3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDo4cHh9LmNoZWNrLWJveC1ub3JtYWwtbWFwe3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDoxOHB4fS5zYXZlLWJ1dHRvbi1kaXZ7d2lkdGg6MTAwJX1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNTa2V0Y2hmYWJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpXG4gIHNldCBhc3NldE1heCh2OiBhbnkpIHtcbiAgICBpZiAodikge1xuICAgICAgdGhpcy5fYXNzZXRNYXggPSB2O1xuICAgICAgdGhpcy5lbnZpcm9ubWVudENvbmZpZyh2LmZieEZpbGVzLmZieEFsbEdyb3Vwc0ZpbGUuc2tldGNoZmFiSWQpO1xuICAgICAgdGhpcy5nZXRNYXRlcmlhbHModi5yZW5kZXJNYXRlcmlhbENvbmZpZ3MpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBhc3NldE1heCgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9hc3NldE1heDtcbiAgfVxuXG4gIEBPdXRwdXQoKSBzYXZlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIF9hc3NldE1heDogYW55O1xuICBza2V0Y2hmYWJJZDogc3RyaW5nO1xuXG4gIG1hdGVyaWFsOiBhbnk7XG4gIG1hdGVyaWFsQ29uZmlnOiBhbnk7XG4gIG1hdGVyaWFsTmFtZTogc3RyaW5nO1xuICBtYXRlcmlhbHM6IGFueTtcbiAgdGV4dHVyZXM6IGFueTtcbiAgZWRpdE1vZGUgPSB0cnVlO1xuICB1cGRhdGUgPSBmYWxzZTtcbiAgZ2V0TWF0ZXJpYWxzU2tldGNoZmFiID0gZmFsc2U7XG5cbiAgYWxpZ246ICdzdGFydCc7XG4gIGNoZWNrZWQgPSB0cnVlO1xuXG4gIGNvbmZpZ1NlbGVjdCA9IFtcbiAgICAnT0ZGJyxcbiAgICAnTE9XJyxcbiAgICAnTUVESVVNJyxcbiAgICAnSElHSCdcbiAgXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRlY1NrZXRjaGZhYlNlcnZpY2U6IERlY1NrZXRjaGZhYlNlcnZpY2UpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgZW52aXJvbm1lbnRDb25maWcoaWQpIHtcbiAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICBcIm9wdGlvbnNcIjoge1xuICAgICAgICBcInZlcnNpb25cIjogNyxcbiAgICAgICAgXCJiYWNrZ3JvdW5kXCI6IHtcbiAgICAgICAgICBcImVuYWJsZVwiOiBcImFtYmllbnRcIixcbiAgICAgICAgICBcInVpZFwiOiBcIjUxYWY2YTg3MGNjZTQ0OWViNzViMDM0NWZlZWJhZWJiXCIsXG4gICAgICAgICAgXCJjb2xvclwiOiBbXG4gICAgICAgICAgICAwLjIsXG4gICAgICAgICAgICAwLjIsXG4gICAgICAgICAgICAwLjJcbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIFwiZW52aXJvbm1lbnRcIjoge1xuICAgICAgICAgIFwiZW5hYmxlXCI6IHRydWUsXG4gICAgICAgICAgXCJiYWNrZ3JvdW5kRXhwb3N1cmVcIjogMSxcbiAgICAgICAgICBcImV4cG9zdXJlXCI6IDIuMjAwMDAwMDAwMDAwMDAxLFxuICAgICAgICAgIFwicm90YXRpb25cIjogNC43MTIzODg5ODAzODQ2OSxcbiAgICAgICAgICBcInVpZFwiOiBcIjhhNDA3NGFjOGEzYTRiODNiZjFmNmExNzdhMGY5YTM0XCIsXG4gICAgICAgICAgXCJibHVyXCI6IDAuMSxcbiAgICAgICAgICBcInNoYWRvd0VuYWJsZVwiOiBmYWxzZSxcbiAgICAgICAgICBcImxpZ2h0SW50ZW5zaXR5XCI6IDUsXG4gICAgICAgICAgXCJzaGFkb3dCaWFzXCI6IDAuMDA1XG4gICAgICAgIH0sXG4gICAgICAgIFwibGlnaHRpbmdcIjoge1xuICAgICAgICAgIFwiZW5hYmxlXCI6IGZhbHNlLFxuICAgICAgICAgIFwibGlnaHRzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiRElSRUNUSU9OXCIsXG4gICAgICAgICAgICAgIFwiZW5hYmxlXCI6IHRydWUsXG4gICAgICAgICAgICAgIFwiY29sb3JcIjogW1xuICAgICAgICAgICAgICAgIDAuNzgwNjEyMjQ0OSxcbiAgICAgICAgICAgICAgICAwLjc5ODUyMTQ0OTQsXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBcImludGVuc2l0eVwiOiAwLjk2LFxuICAgICAgICAgICAgICBcImdyb3VuZFwiOiBbXG4gICAgICAgICAgICAgICAgMC4zLFxuICAgICAgICAgICAgICAgIDAuMixcbiAgICAgICAgICAgICAgICAwLjJcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgXCJpbnRlbnNpdHlHcm91bmRcIjogMSxcbiAgICAgICAgICAgICAgXCJtYXRyaXhcIjogW1xuICAgICAgICAgICAgICAgIC0wLjk4MTU4MDQ1LFxuICAgICAgICAgICAgICAgIDAuMTkwOTkyMjE2NyxcbiAgICAgICAgICAgICAgICAtMC4wMDQ2NjgzMjczLFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMC4xMzU0ODM0NzEsXG4gICAgICAgICAgICAgICAgMC43MTMxMTI2MDYyLFxuICAgICAgICAgICAgICAgIDAuNjg3ODMzMjkzNyxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDAuMTM0Njk5ODQ4NixcbiAgICAgICAgICAgICAgICAwLjY3NDUzMTIzMjgsXG4gICAgICAgICAgICAgICAgLTAuNzI1ODUzNjgxNCxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDYuODk3NDc1MzExOSxcbiAgICAgICAgICAgICAgICAzNC41Mzk5MTE0MzI4LFxuICAgICAgICAgICAgICAgIC0xLjI3MjU1NzA5MTcsXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBcImZhbGxvZmZcIjogMC4wMDA5NTM0NTg2LFxuICAgICAgICAgICAgICBcImF0dGFjaGVkVG9DYW1lcmFcIjogZmFsc2UsXG4gICAgICAgICAgICAgIFwiYW5nbGVcIjogNDUsXG4gICAgICAgICAgICAgIFwiaGFyZG5lc3NcIjogMC41LFxuICAgICAgICAgICAgICBcImNhc3RTaGFkb3dzXCI6IGZhbHNlLFxuICAgICAgICAgICAgICBcInNoYWRvd0JpYXNcIjogMC4wMDVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcIkRJUkVDVElPTlwiLFxuICAgICAgICAgICAgICBcImVuYWJsZVwiOiB0cnVlLFxuICAgICAgICAgICAgICBcImNvbG9yXCI6IFtcbiAgICAgICAgICAgICAgICAxLFxuICAgICAgICAgICAgICAgIDAuODc4MzMxOTQ1LFxuICAgICAgICAgICAgICAgIDAuNzA5MTgzNjczNVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBcImludGVuc2l0eVwiOiAxLFxuICAgICAgICAgICAgICBcImdyb3VuZFwiOiBbXG4gICAgICAgICAgICAgICAgMC4zLFxuICAgICAgICAgICAgICAgIDAuMixcbiAgICAgICAgICAgICAgICAwLjJcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgXCJpbnRlbnNpdHlHcm91bmRcIjogMSxcbiAgICAgICAgICAgICAgXCJtYXRyaXhcIjogW1xuICAgICAgICAgICAgICAgIDAuNzc1NTIxMTQ5NSxcbiAgICAgICAgICAgICAgICAtMC4wNjY2NjAyODYsXG4gICAgICAgICAgICAgICAgMC42Mjc3OTI0NDQyLFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMC4yNjkwNDgzNzM3LFxuICAgICAgICAgICAgICAgIDAuOTM0NDg0NjUyMyxcbiAgICAgICAgICAgICAgICAtMC4yMzMxMzM4ODI1LFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgLTAuNTcxMTIxNjMyNixcbiAgICAgICAgICAgICAgICAwLjM0OTcwNjc5MjcsXG4gICAgICAgICAgICAgICAgMC43NDI2NDc0NTMzLFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgLTI5LjI0NDY3MjMzNjIsXG4gICAgICAgICAgICAgICAgMTcuOTA3MDE4ODU2MSxcbiAgICAgICAgICAgICAgICA3My45MjMyMDU5MjU3LFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgXCJmYWxsb2ZmXCI6IDAuMDAwOTUzNDU4NixcbiAgICAgICAgICAgICAgXCJhdHRhY2hlZFRvQ2FtZXJhXCI6IGZhbHNlLFxuICAgICAgICAgICAgICBcImFuZ2xlXCI6IDQ1LFxuICAgICAgICAgICAgICBcImhhcmRuZXNzXCI6IDAuNSxcbiAgICAgICAgICAgICAgXCJjYXN0U2hhZG93c1wiOiBmYWxzZSxcbiAgICAgICAgICAgICAgXCJzaGFkb3dCaWFzXCI6IDAuMDA1XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJESVJFQ1RJT05cIixcbiAgICAgICAgICAgICAgXCJlbmFibGVcIjogdHJ1ZSxcbiAgICAgICAgICAgICAgXCJjb2xvclwiOiBbXG4gICAgICAgICAgICAgICAgMC40MjM0NjkzODc4LFxuICAgICAgICAgICAgICAgIDAuNzM1MjY2NTU1NixcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIFwiaW50ZW5zaXR5XCI6IDAuMTIsXG4gICAgICAgICAgICAgIFwiZ3JvdW5kXCI6IFtcbiAgICAgICAgICAgICAgICAwLjk2NDI4NTcxNDMsXG4gICAgICAgICAgICAgICAgMC42NDg0MTI4NjM3LFxuICAgICAgICAgICAgICAgIDAuMjYwNzUwNzI4OVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBcImludGVuc2l0eUdyb3VuZFwiOiAwLjA2LFxuICAgICAgICAgICAgICBcIm1hdHJpeFwiOiBbXG4gICAgICAgICAgICAgICAgMC42OTAzMjk5MTMxLFxuICAgICAgICAgICAgICAgIC0wLjcwNzYzNjM2NjksXG4gICAgICAgICAgICAgICAgLTAuMTUwNjQ5ODY5OSxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIC0wLjAxMTA4OTY5ODIsXG4gICAgICAgICAgICAgICAgMC4xOTc4NTEzNzMsXG4gICAgICAgICAgICAgICAgLTAuOTgwMTY5Mjk4LFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMC43MjM0MDk3MjQ2LFxuICAgICAgICAgICAgICAgIDAuNjc4MzEwODQ3OSxcbiAgICAgICAgICAgICAgICAwLjEyODczNTI0NzQsXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAzNy4wNDI4MzA1MTc3LFxuICAgICAgICAgICAgICAgIDM0LjczMzQ0OTYxNzYsXG4gICAgICAgICAgICAgICAgNDIuNDg3MzQ1NDY4NSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIFwiZmFsbG9mZlwiOiAwLjAwMDk1MzQ1ODYsXG4gICAgICAgICAgICAgIFwiYXR0YWNoZWRUb0NhbWVyYVwiOiBmYWxzZSxcbiAgICAgICAgICAgICAgXCJhbmdsZVwiOiA0NSxcbiAgICAgICAgICAgICAgXCJoYXJkbmVzc1wiOiAwLjUsXG4gICAgICAgICAgICAgIFwiY2FzdFNoYWRvd3NcIjogZmFsc2UsXG4gICAgICAgICAgICAgIFwic2hhZG93Qmlhc1wiOiAwLjAwNVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAgXCJvcmllbnRhdGlvblwiOiB7XG4gICAgICAgICAgXCJtYXRyaXhcIjogW1xuICAgICAgICAgICAgMSxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAxLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLmRlY1NrZXRjaGZhYlNlcnZpY2UucGFjaENvbmZpZ3MoaWQsIGNvbmZpZykuc3Vic2NyaWJlKHJlc3AgPT4ge1xuICAgICAgdGhpcy5kZWNTa2V0Y2hmYWJTZXJ2aWNlLmdldEFsbFRleHR1cmVzKGlkKS5zdWJzY3JpYmUodGV4dHVyZVJlc3AgPT4ge1xuICAgICAgICBpZiAodGV4dHVyZVJlc3ApIHtcbiAgICAgICAgICB0aGlzLnNrZXRjaGZhYklkID0gaWQ7XG4gICAgICAgICAgdGhpcy50ZXh0dXJlcyA9IHRleHR1cmVSZXNwLnJlc3VsdHM7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSk7XG4gIH1cblxuICBtYXRlcmlhbFNlbGVjdGVkKG0pIHtcbiAgICBpZiAobSkge1xuICAgICAgdGhpcy51cGRhdGUgPSBmYWxzZTtcbiAgICAgIHRoaXMubWF0ZXJpYWwgPSBtO1xuICAgICAgdGhpcy5zZWxlY3RNYXRlcmlhbEJ5TmFtZShtLm5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIHNlbGVjdE1hdGVyaWFsQnlOYW1lKG5hbWUpIHtcbiAgICB0aGlzLm1hdGVyaWFsTmFtZSA9IG5hbWU7XG4gICAgdGhpcy5tYXRlcmlhbENvbmZpZyA9IHRoaXMubWF0ZXJpYWxzLmZpbHRlcih4ID0+IHgubWF0ZXJpYWxOYW1lID09PSBuYW1lKTtcbiAgICB0aGlzLm1hdGVyaWFsQ29uZmlnID0gdGhpcy5tYXRlcmlhbENvbmZpZ1swXTtcbiAgfVxuXG4gIGdldE1hdGVyaWFscyhjb25maWdzKSB7XG4gICAgaWYgKGNvbmZpZ3MpIHtcbiAgICAgIHRoaXMubWF0ZXJpYWxzID0gY29uZmlncztcbiAgICB9XG4gIH1cblxuICB1cGRhdGVNYXRlcmlhbChtYXRlcmlhbCwgJGV2ZW50KSB7XG4gICAgc3dpdGNoIChtYXRlcmlhbCkge1xuICAgICAgY2FzZSAnbWV0YWwnOiB7XG4gICAgICAgIHRoaXMubWF0ZXJpYWwuY2hhbm5lbHMuTWV0YWxuZXNzUEJSLmZhY3RvciA9ICRldmVudC52YWx1ZSAvIDEwMDtcbiAgICAgICAgdGhpcy5tYXRlcmlhbENvbmZpZy5jb25maWcubWV0YWxuZXNzID0gJGV2ZW50LnZhbHVlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgJ2Jhc2UtY29sb3InOiB7XG4gICAgICAgIHRoaXMubWF0ZXJpYWwuY2hhbm5lbHMuQWxiZWRvUEJSLmZhY3RvciA9ICRldmVudC52YWx1ZSAvIDEwMDtcbiAgICAgICAgdGhpcy5tYXRlcmlhbENvbmZpZy5jb25maWcuZGlmZnVzZSA9ICRldmVudC52YWx1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlICdyb3VnJzoge1xuICAgICAgICB0aGlzLm1hdGVyaWFsLmNoYW5uZWxzLlJvdWdobmVzc1BCUi5mYWN0b3IgPSAkZXZlbnQudmFsdWUgLyAxMDA7XG4gICAgICAgIHRoaXMubWF0ZXJpYWxDb25maWcuY29uZmlnLnJvdWdobmVzcyA9ICRldmVudC52YWx1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlICdub3JtYWwnOiB7XG4gICAgICAgIHRoaXMubWF0ZXJpYWwuY2hhbm5lbHMuTm9ybWFsTWFwLmVuYWJsZSA9ICRldmVudC5jaGVja2VkO1xuICAgICAgICB0aGlzLm1hdGVyaWFsQ29uZmlnLmNvbmZpZy5ub3JtYWwgPSAkZXZlbnQuY2hlY2tlZDtcbiAgICAgICAgaWYgKCRldmVudC5jaGVja2VkKSB7XG4gICAgICAgICAgdGhpcy5tYXRlcmlhbC5jaGFubmVscy5Ob3JtYWxNYXAuZmFjdG9yID0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm1hdGVyaWFsLmNoYW5uZWxzLk5vcm1hbE1hcC5mYWN0b3IgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSAnb3BhY2l0eSc6IHtcbiAgICAgICAgdGhpcy5tYXRlcmlhbC5jaGFubmVscy5PcGFjaXR5LmZhY3RvciA9ICRldmVudC52YWx1ZSAvIDEwMDtcbiAgICAgICAgdGhpcy5tYXRlcmlhbENvbmZpZy5jb25maWcub3BhY2l0eSA9ICRldmVudC52YWx1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuc2VuZE1hdGVyaWFsVG9VcGRhdGUoKTtcbiAgfVxuXG5cbiAgYWJsZVRvKHR5cGUpIHtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ21ldGFsJzpcbiAgICAgICAgdGhpcy5tYXRlcmlhbENvbmZpZy5jb25maWcubWV0YWxuZXNzRW5hYmxlZCA9ICF0aGlzLm1hdGVyaWFsQ29uZmlnLmNvbmZpZy5tZXRhbG5lc3NFbmFibGVkO1xuICAgICAgICB0aGlzLnNldFRleHR1cmUoJ21ldGFsJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnYmFzZS1jb2xvcic6XG4gICAgICAgIHRoaXMubWF0ZXJpYWxDb25maWcuY29uZmlnLmRpZmZ1c2VFbmFibGVkID0gIXRoaXMubWF0ZXJpYWxDb25maWcuY29uZmlnLmRpZmZ1c2VFbmFibGVkO1xuICAgICAgICB0aGlzLnNldFRleHR1cmUoJ2Jhc2UtY29sb3InKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyb3VnJzpcbiAgICAgICAgdGhpcy5tYXRlcmlhbENvbmZpZy5jb25maWcucm91Z2huZXNzRW5hYmxlZCA9ICF0aGlzLm1hdGVyaWFsQ29uZmlnLmNvbmZpZy5yb3VnaG5lc3NFbmFibGVkO1xuICAgICAgICB0aGlzLnNldFRleHR1cmUoJ3JvdWcnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdvcGFjaXR5JzpcbiAgICAgICAgdGhpcy5tYXRlcmlhbENvbmZpZy5jb25maWcub3BhY2l0eUVuYWJsZWQgPSAhdGhpcy5tYXRlcmlhbENvbmZpZy5jb25maWcub3BhY2l0eUVuYWJsZWQ7XG4gICAgICAgIHRoaXMuc2V0VGV4dHVyZSgnb3BhY2l0eScpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBzZXRUZXh0dXJlKHR5cGUpIHtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ21ldGFsJzpcbiAgICAgICAgaWYgKHRoaXMubWF0ZXJpYWwuY2hhbm5lbHMuTWV0YWxuZXNzUEJSLnRleHR1cmUpIHtcbiAgICAgICAgICBkZWxldGUgdGhpcy5tYXRlcmlhbC5jaGFubmVscy5NZXRhbG5lc3NQQlIudGV4dHVyZTtcbiAgICAgICAgICB0aGlzLm1hdGVyaWFsLmNoYW5uZWxzLk1ldGFsbmVzc1BCUi5jb2xvciA9IFsxLCAxLCAxXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkZWxldGUgdGhpcy5tYXRlcmlhbC5jaGFubmVscy5NZXRhbG5lc3NQQlIuY29sb3I7XG4gICAgICAgICAgdGhpcy5tYXRlcmlhbC5jaGFubmVscy5NZXRhbG5lc3NQQlIudGV4dHVyZSA9IHRoaXMuZ2V0VGV4dHVyZSh0aGlzLm1hdGVyaWFsQ29uZmlnLm1hdGVyaWFsTmFtZSArICdfTUVUQUxMSUMuanBnJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyb3VnJzpcbiAgICAgICAgaWYgKHRoaXMubWF0ZXJpYWwuY2hhbm5lbHMuUm91Z2huZXNzUEJSLnRleHR1cmUpIHtcbiAgICAgICAgICBkZWxldGUgdGhpcy5tYXRlcmlhbC5jaGFubmVscy5Sb3VnaG5lc3NQQlIudGV4dHVyZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm1hdGVyaWFsLmNoYW5uZWxzLlJvdWdobmVzc1BCUi50ZXh0dXJlID0gdGhpcy5nZXRUZXh0dXJlKHRoaXMubWF0ZXJpYWxDb25maWcubWF0ZXJpYWxOYW1lICsgJ19ST1VHSE5FU1MuanBnJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdvcGFjaXR5JzpcbiAgICAgICAgaWYgKHRoaXMubWF0ZXJpYWwuY2hhbm5lbHMuT3BhY2l0eS50ZXh0dXJlKSB7XG4gICAgICAgICAgZGVsZXRlIHRoaXMubWF0ZXJpYWwuY2hhbm5lbHMuT3BhY2l0eS50ZXh0dXJlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMubWF0ZXJpYWwuY2hhbm5lbHMuT3BhY2l0eS50ZXh0dXJlID0gdGhpcy5nZXRUZXh0dXJlKHRoaXMubWF0ZXJpYWxDb25maWcubWF0ZXJpYWxOYW1lICsgJ19UUkFOU1BBUkVOVC5qcGcnKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgdGhpcy5zZW5kTWF0ZXJpYWxUb1VwZGF0ZSgpO1xuICB9XG5cbiAgZ2V0VGV4dHVyZShuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMudGV4dHVyZXMuZmluZCh4ID0+IHgubmFtZSA9PT0gbmFtZSk7XG4gIH1cblxuICBzZW5kTWF0ZXJpYWxUb1VwZGF0ZSgpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMudXBkYXRlID0gdHJ1ZTtcbiAgICAgIHRoaXMubWF0ZXJpYWwgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMubWF0ZXJpYWwpKTtcbiAgICB9LCAyMDApO1xuICB9XG5cbiAgb25TYXZlKCkge1xuICAgIHRoaXMuZ2V0TWF0ZXJpYWxzU2tldGNoZmFiID0gdHJ1ZTsgXG4gIH1cblxuICBnZXRBbGxNYXRlcmlhbHMoJGV2ZW50KSB7XG4gICAgbGV0IG1hdCA9IHt9O1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAkZXZlbnQubGVuZ3RoOyBpKyspIHtcbiAgICAgIG1hdFskZXZlbnRbaV0uaWRdID0gJGV2ZW50W2ldO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbmZpZyA9IHtcbiAgICAgICdvcHRpb25zJzoge1xuICAgICAgICAnbWF0ZXJpYWxzJzogbWF0XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuZGVjU2tldGNoZmFiU2VydmljZS5wYWNoQ29uZmlncyh0aGlzLmFzc2V0TWF4LmZieEZpbGVzLmZieEFsbEdyb3Vwc0ZpbGUuc2tldGNoZmFiSWQsIGNvbmZpZykuc3Vic2NyaWJlKHJlc3AgPT4ge1xuICAgICAgdGhpcy5nZXRNYXRlcmlhbHNTa2V0Y2hmYWIgPSBmYWxzZTtcbiAgICAgIHRoaXMuc2F2ZS5lbWl0KHRoaXMuYXNzZXRNYXgpO1xuICAgIH0pO1xuICB9IFxufVxuIl19