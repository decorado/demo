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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLXNrZXRjaGZhYi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGVjLXNrZXRjaGZhYi9kZWMtc2tldGNoZmFiLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7SUF3SjVELCtCQUFvQixtQkFBd0M7UUFBeEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtvQkF4QjNDLElBQUksWUFBWSxFQUFFO3dCQVV4QixJQUFJO3NCQUNOLEtBQUs7cUNBQ1UsS0FBSzt1QkFHbkIsSUFBSTs0QkFFQztZQUNiLEtBQUs7WUFDTCxLQUFLO1lBQ0wsUUFBUTtZQUNSLE1BQU07U0FDUDtLQUVnRTtJQXJDakUsc0JBQ0ksMkNBQVE7Ozs7UUFRWjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1NBQ3ZCOzs7OztRQVhELFVBQ2EsQ0FBTTtZQUNqQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNOLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO2dCQUNuQixJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDaEUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQzthQUM1QztTQUNGOzs7T0FBQTs7OztJQWdDRCx3Q0FBUTs7O0lBQVI7S0FDQzs7Ozs7SUFFRCxpREFBaUI7Ozs7SUFBakIsVUFBa0IsRUFBRTtRQUFwQixpQkFvTEM7O1FBbkxDLElBQU0sTUFBTSxHQUFHO1lBQ2Is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QUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDdkMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDL0I7O1FBRUQsSUFBTSxNQUFNLEdBQUc7WUFDYixTQUFTLEVBQUU7Z0JBQ1QsV0FBVyxFQUFFLEdBQUc7YUFDakI7U0FDRixDQUFDO1FBRUYsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSTtZQUM5RyxLQUFJLENBQUMscUJBQXFCLEdBQUcsS0FBSyxDQUFDO1lBQ25DLEtBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUMvQixDQUFDLENBQUM7S0FDSjs7Z0JBNWRGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsZUFBZTtvQkFDekIsUUFBUSxFQUFFLDB4TUEwR0w7b0JBQ0wsTUFBTSxFQUFFLENBQUMsa2hCQUFraEIsQ0FBQztpQkFDN2hCOzs7O2dCQWhIUSxtQkFBbUI7OzsyQkFtSHpCLEtBQUs7dUJBYUwsTUFBTTs7Z0NBaklUOztTQWtIYSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWNTa2V0Y2hmYWJTZXJ2aWNlIH0gZnJvbSAnLi9kZWMtc2tldGNoZmFiLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtc2tldGNoZmFiJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGZ4TGF5b3V0PVwiY29sdW1uXCIgY2xhc3M9XCJjb250YWluZXJcIiBmeExheW91dEdhcD1cIjMycHhcIiBmeExheW91dEFsaWduPVwic3BhY2UtYmV0d2VlbiBjZW50ZXJcIj5cbiAgICA8ZGVjLXNrZXRjaGZhYi12aWV3IFttYXRlcmlhbE5hbWVdPVwibWF0ZXJpYWxOYW1lXCIgXG4gICAgICAgIFtza2V0Y2hmYWJJZF09XCJza2V0Y2hmYWJJZFwiIFxuICAgICAgICBbZWRpdE1vZGVdPVwiZWRpdE1vZGVcIlxuICAgICAgICBbbWF0ZXJpYWxdPVwibWF0ZXJpYWxcIiBcbiAgICAgICAgW3VwZGF0ZV09XCJ1cGRhdGVcIlxuICAgICAgICBbZ2V0QWxsTWF0ZXJpYWxzXT1cImdldE1hdGVyaWFsc1NrZXRjaGZhYlwiXG4gICAgICAgIChzZW5kTWF0ZXJpYWxzKT1cImdldEFsbE1hdGVyaWFscygkZXZlbnQpXCJcbiAgICAgICAgKG1hdGVyaWFsU2VsZWN0ZWQpPVwibWF0ZXJpYWxTZWxlY3RlZCgkZXZlbnQpXCI+XG4gICAgPC9kZWMtc2tldGNoZmFiLXZpZXc+XG4gICAgPGRpdiBmeExheW91dD1cInJvd1wiIHN0eWxlPVwid2lkdGg6IDEwMCVcIiBmeExheW91dEFsaWduPVwic3BhY2UtYmV0d2VlbiBzdGFydFwiIGZ4TGF5b3V0R2FwPVwiMzJweFwiPlxuICAgICAgICA8bWF0LWZvcm0tZmllbGQgZnhGbGV4PVwiNDBcIj5cbiAgICAgICAgICAgIDxtYXQtc2VsZWN0IFsobmdNb2RlbCldPVwibWF0ZXJpYWxOYW1lXCIgbmFtZT1cImNvbmZpZ1wiIHBsYWNlaG9sZGVyPVwiTWF0ZXJpYWwgSURcIj5cbiAgICAgICAgICAgICAgICA8bWF0LW9wdGlvbiAqbmdGb3I9XCJsZXQgY29uZmlnIG9mIGFzc2V0TWF4Py5yZW5kZXJNYXRlcmlhbENvbmZpZ3NcIiBbdmFsdWVdPVwiY29uZmlnLm1hdGVyaWFsTmFtZVwiPlxuICAgICAgICAgICAgICAgICAgICB7eyBjb25maWcubWF0ZXJpYWxOYW1lIH19XG4gICAgICAgICAgICAgICAgPC9tYXQtb3B0aW9uPlxuICAgICAgICAgICAgPC9tYXQtc2VsZWN0PlxuICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuXG4gICAgICAgIDxkaXYgZnhGbGV4PVwiNjBcIiBjbGFzcz1cInBvbHlnb24tY291bnQgZGVjLWNvbG9yLWdyYXkgdGV4dC1yaWdodFwiPlxuICAgICAgICAgICAge3sgJ2xhYmVsLnBvbHlnb24nIHwgdHJhbnNsYXRlIH19OiB7eyBhc3NldE1heD8uZmJ4RmlsZXM/LmZieEFsbEdyb3Vwc0ZpbGU/LmZieE9yaWdpbmFsUG9seUNvdW50IH19IC0ge3sgJ2xhYmVsLmN1cnJlbnQtcG9seWdvbidcbiAgICAgICAgICAgIHwgdHJhbnNsYXRlIH19IHt7IGFzc2V0TWF4Py5mYnhGaWxlcz8uZmJ4QWxsR3JvdXBzRmlsZT8uZmJ4UG9seUNvdW50IH19XG4gICAgICAgIDwvZGl2PlxuXG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2ICpuZ0lmPVwibWF0ZXJpYWxDb25maWdcIiBmeExheW91dD1cInJvd1wiIGNsYXNzPVwicm93LXNpemVcIiBmeExheW91dEFsaWduPVwic3BhY2UtYmV0d2VlbiBzdGFydFwiIGZ4TGF5b3V0R2FwPVwiMTZweFwiPlxuICAgICAgICA8ZGl2IGZ4RmxleD1cIjMwXCIgZnhMYXlvdXQ9XCJjb2x1bW5cIiBmeExheW91dEdhcD1cIjhweFwiPlxuICAgICAgICAgICAgPGRpdiBmeExheW91dD1cImNvbHVtblwiPlxuICAgICAgICAgICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwic3RhcnQgc3RhcnRcIiBjbGFzcz1cInJvdy1zcGFuLWljb25cIiBmeExheW91dEdhcD1cIjhweFwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNldHRpbmctbmFtZVwiPkJhc2UgQ29sb3Ige3sgbWF0ZXJpYWxDb25maWc/LmNvbmZpZz8uZGlmZnVzZSB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwibWQtc3Bhbi1pY29uIGNsaWNrXCIgKGNsaWNrKT1cImFibGVUbygnYmFzZS1jb2xvcicpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7eyBtYXRlcmlhbENvbmZpZz8uY29uZmlnPy5kaWZmdXNlRW5hYmxlZCA/ICdsb2NrX29wZW4nIDogJ2xvY2tfb3V0bGluZScgfX1cbiAgICAgICAgICAgICAgICAgICAgPC9tYXQtaWNvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8bWF0LXNsaWRlciBjbGFzcz1cInNsaWRlci1wb3NpdGlvblwiIFttYXhdPVwiMTAwXCIgW21pbl09XCIwXCIgW3N0ZXBdPVwiMVwiIFtkaXNhYmxlZF09XCIhbWF0ZXJpYWxDb25maWc/LmNvbmZpZz8uZGlmZnVzZUVuYWJsZWRcIlxuICAgICAgICAgICAgICAgICAgICBbKG5nTW9kZWwpXT1cIm1hdGVyaWFsQ29uZmlnLmNvbmZpZy5kaWZmdXNlXCIgKGlucHV0KT1cInVwZGF0ZU1hdGVyaWFsKCdiYXNlLWNvbG9yJywgJGV2ZW50KVwiPlxuICAgICAgICAgICAgICAgIDwvbWF0LXNsaWRlcj5cblxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJjb2x1bW5cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cInN0YXJ0IHN0YXJ0XCIgY2xhc3M9XCJyb3ctc3Bhbi1pY29uXCIgZnhMYXlvdXRHYXA9XCI4cHhcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzZXR0aW5nLW5hbWVcIj5Sb3VnaG5lc3Mge3sgbWF0ZXJpYWxDb25maWc/LmNvbmZpZz8ucm91Z2huZXNzIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJtZC1zcGFuLWljb24gY2xpY2tcIiAoY2xpY2spPVwiYWJsZVRvKCdyb3VnJylcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt7IG1hdGVyaWFsQ29uZmlnPy5jb25maWc/LnJvdWdobmVzc0VuYWJsZWQgPyAnbG9ja19vcGVuJyA6ICdsb2NrX291dGxpbmUnIH19XG4gICAgICAgICAgICAgICAgICAgIDwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPG1hdC1zbGlkZXIgY2xhc3M9XCJzbGlkZXItcG9zaXRpb25cIiBbbWF4XT1cIjEwMFwiIFttaW5dPVwiMFwiIFtzdGVwXT1cIjFcIiBbZGlzYWJsZWRdPVwiIW1hdGVyaWFsQ29uZmlnPy5jb25maWc/LnJvdWdobmVzc0VuYWJsZWRcIlxuICAgICAgICAgICAgICAgICAgICBbKG5nTW9kZWwpXT1cIm1hdGVyaWFsQ29uZmlnLmNvbmZpZy5yb3VnaG5lc3NcIiAoaW5wdXQpPVwidXBkYXRlTWF0ZXJpYWwoJ3JvdWcnLCAkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgPC9tYXQtc2xpZGVyPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgZnhGbGV4PVwiMzBcIiBmeExheW91dD1cImNvbHVtblwiIGZ4TGF5b3V0R2FwPVwiOHB4XCI+XG5cbiAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgICAgICA8bWF0LXNlbGVjdCBjbGFzcz1cInBvbHlnb24tc2VsZWN0XCIgZnhGaWxsIFsobmdNb2RlbCldPVwibWF0ZXJpYWxDb25maWcuYWRqdXN0T3B0aW1pemVcIiBuYW1lPVwiY29uZmlnXCIgcGxhY2Vob2xkZXI9XCJ7eyAnbGFiZWwucG9seWdvbi1yZWR1Y3Rpb24nIHwgdHJhbnNsYXRlIH19XCI+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCBjb25maWcgb2YgY29uZmlnU2VsZWN0XCIgW3ZhbHVlXT1cImNvbmZpZ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAge3sgJ2xhYmVsLicrY29uZmlnIHwgdHJhbnNsYXRlIH19XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInBvc2l0aW9uLXBvbHlnb24tbnVtYmVyIGdyYXlcIiAqbmdJZj1cImNvbmZpZyA9PT0gJ09GRidcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBtYXRlcmlhbENvbmZpZz8uZmJ4UG9seUNvdW50T3JpZ2lufX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicG9zaXRpb24tcG9seWdvbi1udW1iZXIgZ3JheVwiICpuZ0lmPVwibWF0ZXJpYWxDb25maWc/LmFkanVzdE9wdGltaXplID09PSBjb25maWdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBtYXRlcmlhbENvbmZpZz8uZmJ4UG9seUNvdW50fX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9tYXQtb3B0aW9uPlxuICAgICAgICAgICAgICAgIDwvbWF0LXNlbGVjdD5cbiAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG5cbiAgICAgICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJjb2x1bW5cIiBjbGFzcz1cIm1ldGFsbmVzcy1wb3NpdGlvblwiPlxuICAgICAgICAgICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwic3RhcnQgc3RhcnRcIiBjbGFzcz1cInJvdy1zcGFuLWljb25cIiBmeExheW91dEdhcD1cIjhweFwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNldHRpbmctbmFtZVwiPk1ldGFsbmVzcyB7eyBtYXRlcmlhbENvbmZpZz8uY29uZmlnPy5tZXRhbG5lc3MgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cIm1kLXNwYW4taWNvbiBjbGlja1wiIChjbGljayk9XCJhYmxlVG8oJ21ldGFsJylcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt7IG1hdGVyaWFsQ29uZmlnPy5jb25maWc/Lm1ldGFsbmVzc0VuYWJsZWQgPyAnbG9ja19vcGVuJyA6ICdsb2NrX291dGxpbmUnIH19XG4gICAgICAgICAgICAgICAgICAgIDwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPG1hdC1zbGlkZXIgY2xhc3M9XCJzbGlkZXItcG9zaXRpb25cIiBbbWF4XT1cIjEwMFwiIFttaW5dPVwiMFwiIFtzdGVwXT1cIjFcIiBbZGlzYWJsZWRdPVwiIW1hdGVyaWFsQ29uZmlnPy5jb25maWc/Lm1ldGFsbmVzc0VuYWJsZWRcIlxuICAgICAgICAgICAgICAgICAgICBbKG5nTW9kZWwpXT1cIm1hdGVyaWFsQ29uZmlnLmNvbmZpZy5tZXRhbG5lc3NcIiAoaW5wdXQpPVwidXBkYXRlTWF0ZXJpYWwoJ21ldGFsJywgJGV2ZW50KVwiPlxuICAgICAgICAgICAgICAgIDwvbWF0LXNsaWRlcj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgZnhGbGV4PVwiMzBcIiBmeExheW91dD1cImNvbHVtblwiIGZ4TGF5b3V0R2FwPVwiOHB4XCI+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8bWF0LWNoZWNrYm94IGNsYXNzPVwiY2hlY2stYm94LW5vcm1hbC1tYXBcIiAoaW5wdXQpPVwidXBkYXRlTWF0ZXJpYWwoJ25vcm1hbCcsICRldmVudClcIiBbKG5nTW9kZWwpXT1cImNoZWNrZWRcIiBbbGFiZWxQb3NpdGlvbl09XCJhbGlnblwiPlxuICAgICAgICAgICAgICAgIE5vcm1hbCBNYXBcbiAgICAgICAgICAgICAgPC9tYXQtY2hlY2tib3g+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJjb2x1bW5cIiBjbGFzcz1cIm9wYWNpdHktcG9zaXRpb25cIiBmeExheW91dEdhcD1cIjhweFwiPlxuICAgICAgICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cInN0YXJ0IHN0YXJ0XCIgY2xhc3M9XCJvcGFjaXR5LXBvc2l0aW9uLXRleHRcIiBmeExheW91dEdhcD1cIjhweFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic2V0dGluZy1uYW1lXCI+T3BhY2l0eSB7eyBtYXRlcmlhbENvbmZpZz8uY29uZmlnPy5vcGFjaXR5IH19PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cIm1kLXNwYW4taWNvbiBjbGlja1wiIChjbGljayk9XCJhYmxlVG8oJ29wYWNpdHknKVwiPlxuICAgICAgICAgICAgICAgICAge3sgbWF0ZXJpYWxDb25maWc/LmNvbmZpZz8ub3BhY2l0eUVuYWJsZWQgPyAnbG9ja19vcGVuJyA6ICdsb2NrX291dGxpbmUnIH19XG4gICAgICAgICAgICAgICAgPC9tYXQtaWNvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxtYXQtc2xpZGVyIGNsYXNzPVwic2xpZGVyLXBvc2l0aW9uXCIgW21heF09XCIxMDBcIiBbbWluXT1cIjBcIiBbc3RlcF09XCIxXCIgW2Rpc2FibGVkXT1cIiFtYXRlcmlhbENvbmZpZz8uY29uZmlnPy5vcGFjaXR5RW5hYmxlZFwiXG4gICAgICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJtYXRlcmlhbENvbmZpZy5jb25maWcub3BhY2l0eVwiIChpbnB1dCk9XCJ1cGRhdGVNYXRlcmlhbCgnb3BhY2l0eScsICRldmVudClcIj5cbiAgICAgICAgICAgICAgPC9tYXQtc2xpZGVyPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInRleHQtcmlnaHQgc2F2ZS1idXR0b24tZGl2XCI+XG4gICAgICAgIDxidXR0b24gbWF0LXJhaXNlZC1idXR0b24gdHlwZT1cImJ1dHRvblwiIGNvbG9yPVwicHJpbWFyeVwiIChjbGljayk9XCJvblNhdmUoKVwiPnt7ICdsYWJlbC5zYXZlJyB8IHRyYW5zbGF0ZSB9fTwvYnV0dG9uPlxuICAgIDwvZGl2PlxuPC9kaXY+YCxcbiAgc3R5bGVzOiBbYC5jb250YWluZXJ7bWF4LXdpZHRoOjYyMHB4IWltcG9ydGFudH0uc2V0dGluZy1uYW1le3dpZHRoOjEwMHB4O2Rpc3BsYXk6aW5saW5lLWJsb2NrfS5tZC1zcGFuLWljb257cG9zaXRpb246cmVsYXRpdmU7dG9wOi01cHg7bGVmdDotNXB4fS5zbGlkZXItcG9zaXRpb257cG9zaXRpb246cmVsYXRpdmU7bGVmdDotOHB4O3RvcDotOHB4fS5yb3ctc2l6ZXt3aWR0aDoxMDAlfS5wb2x5Z29uLXNlbGVjdHtwb3NpdGlvbjpyZWxhdGl2ZTt0b3A6LTVweH0ubWV0YWxuZXNzLXBvc2l0aW9ue3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDoxNnB4fS5wb2x5Z29uLWNvdW50e2ZvbnQtc2l6ZToxMnB4O3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDoyN3B4fS5vcGFjaXR5LXBvc2l0aW9ue3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDo0MHB4fS5vcGFjaXR5LXBvc2l0aW9uLXRleHR7cG9zaXRpb246cmVsYXRpdmU7dG9wOjhweH0uY2hlY2stYm94LW5vcm1hbC1tYXB7cG9zaXRpb246cmVsYXRpdmU7dG9wOjE4cHh9LnNhdmUtYnV0dG9uLWRpdnt3aWR0aDoxMDAlfWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1NrZXRjaGZhYkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KClcbiAgc2V0IGFzc2V0TWF4KHY6IGFueSkge1xuICAgIGlmICh2KSB7XG4gICAgICB0aGlzLl9hc3NldE1heCA9IHY7XG4gICAgICB0aGlzLmVudmlyb25tZW50Q29uZmlnKHYuZmJ4RmlsZXMuZmJ4QWxsR3JvdXBzRmlsZS5za2V0Y2hmYWJJZCk7XG4gICAgICB0aGlzLmdldE1hdGVyaWFscyh2LnJlbmRlck1hdGVyaWFsQ29uZmlncyk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGFzc2V0TWF4KCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX2Fzc2V0TWF4O1xuICB9XG5cbiAgQE91dHB1dCgpIHNhdmUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgX2Fzc2V0TWF4OiBhbnk7XG4gIHNrZXRjaGZhYklkOiBzdHJpbmc7XG5cbiAgbWF0ZXJpYWw6IGFueTtcbiAgbWF0ZXJpYWxDb25maWc6IGFueTtcbiAgbWF0ZXJpYWxOYW1lOiBzdHJpbmc7XG4gIG1hdGVyaWFsczogYW55O1xuICB0ZXh0dXJlczogYW55O1xuICBlZGl0TW9kZSA9IHRydWU7XG4gIHVwZGF0ZSA9IGZhbHNlO1xuICBnZXRNYXRlcmlhbHNTa2V0Y2hmYWIgPSBmYWxzZTtcblxuICBhbGlnbjogJ3N0YXJ0JztcbiAgY2hlY2tlZCA9IHRydWU7XG5cbiAgY29uZmlnU2VsZWN0ID0gW1xuICAgICdPRkYnLFxuICAgICdMT1cnLFxuICAgICdNRURJVU0nLFxuICAgICdISUdIJ1xuICBdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGVjU2tldGNoZmFiU2VydmljZTogRGVjU2tldGNoZmFiU2VydmljZSkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBlbnZpcm9ubWVudENvbmZpZyhpZCkge1xuICAgIGNvbnN0IGNvbmZpZyA9IHtcbiAgICAgIFwib3B0aW9uc1wiOiB7XG4gICAgICAgIFwidmVyc2lvblwiOiA3LFxuICAgICAgICBcImJhY2tncm91bmRcIjoge1xuICAgICAgICAgIFwiZW5hYmxlXCI6IFwiYW1iaWVudFwiLFxuICAgICAgICAgIFwidWlkXCI6IFwiNTFhZjZhODcwY2NlNDQ5ZWI3NWIwMzQ1ZmVlYmFlYmJcIixcbiAgICAgICAgICBcImNvbG9yXCI6IFtcbiAgICAgICAgICAgIDAuMixcbiAgICAgICAgICAgIDAuMixcbiAgICAgICAgICAgIDAuMlxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAgXCJlbnZpcm9ubWVudFwiOiB7XG4gICAgICAgICAgXCJlbmFibGVcIjogdHJ1ZSxcbiAgICAgICAgICBcImJhY2tncm91bmRFeHBvc3VyZVwiOiAxLFxuICAgICAgICAgIFwiZXhwb3N1cmVcIjogMi4yMDAwMDAwMDAwMDAwMDEsXG4gICAgICAgICAgXCJyb3RhdGlvblwiOiA0LjcxMjM4ODk4MDM4NDY5LFxuICAgICAgICAgIFwidWlkXCI6IFwiOGE0MDc0YWM4YTNhNGI4M2JmMWY2YTE3N2EwZjlhMzRcIixcbiAgICAgICAgICBcImJsdXJcIjogMC4xLFxuICAgICAgICAgIFwic2hhZG93RW5hYmxlXCI6IGZhbHNlLFxuICAgICAgICAgIFwibGlnaHRJbnRlbnNpdHlcIjogNSxcbiAgICAgICAgICBcInNoYWRvd0JpYXNcIjogMC4wMDVcbiAgICAgICAgfSxcbiAgICAgICAgXCJsaWdodGluZ1wiOiB7XG4gICAgICAgICAgXCJlbmFibGVcIjogZmFsc2UsXG4gICAgICAgICAgXCJsaWdodHNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJESVJFQ1RJT05cIixcbiAgICAgICAgICAgICAgXCJlbmFibGVcIjogdHJ1ZSxcbiAgICAgICAgICAgICAgXCJjb2xvclwiOiBbXG4gICAgICAgICAgICAgICAgMC43ODA2MTIyNDQ5LFxuICAgICAgICAgICAgICAgIDAuNzk4NTIxNDQ5NCxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIFwiaW50ZW5zaXR5XCI6IDAuOTYsXG4gICAgICAgICAgICAgIFwiZ3JvdW5kXCI6IFtcbiAgICAgICAgICAgICAgICAwLjMsXG4gICAgICAgICAgICAgICAgMC4yLFxuICAgICAgICAgICAgICAgIDAuMlxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBcImludGVuc2l0eUdyb3VuZFwiOiAxLFxuICAgICAgICAgICAgICBcIm1hdHJpeFwiOiBbXG4gICAgICAgICAgICAgICAgLTAuOTgxNTgwNDUsXG4gICAgICAgICAgICAgICAgMC4xOTA5OTIyMTY3LFxuICAgICAgICAgICAgICAgIC0wLjAwNDY2ODMyNzMsXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwLjEzNTQ4MzQ3MSxcbiAgICAgICAgICAgICAgICAwLjcxMzExMjYwNjIsXG4gICAgICAgICAgICAgICAgMC42ODc4MzMyOTM3LFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMC4xMzQ2OTk4NDg2LFxuICAgICAgICAgICAgICAgIDAuNjc0NTMxMjMyOCxcbiAgICAgICAgICAgICAgICAtMC43MjU4NTM2ODE0LFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgNi44OTc0NzUzMTE5LFxuICAgICAgICAgICAgICAgIDM0LjUzOTkxMTQzMjgsXG4gICAgICAgICAgICAgICAgLTEuMjcyNTU3MDkxNyxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIFwiZmFsbG9mZlwiOiAwLjAwMDk1MzQ1ODYsXG4gICAgICAgICAgICAgIFwiYXR0YWNoZWRUb0NhbWVyYVwiOiBmYWxzZSxcbiAgICAgICAgICAgICAgXCJhbmdsZVwiOiA0NSxcbiAgICAgICAgICAgICAgXCJoYXJkbmVzc1wiOiAwLjUsXG4gICAgICAgICAgICAgIFwiY2FzdFNoYWRvd3NcIjogZmFsc2UsXG4gICAgICAgICAgICAgIFwic2hhZG93Qmlhc1wiOiAwLjAwNVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiRElSRUNUSU9OXCIsXG4gICAgICAgICAgICAgIFwiZW5hYmxlXCI6IHRydWUsXG4gICAgICAgICAgICAgIFwiY29sb3JcIjogW1xuICAgICAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAgICAgMC44NzgzMzE5NDUsXG4gICAgICAgICAgICAgICAgMC43MDkxODM2NzM1XG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIFwiaW50ZW5zaXR5XCI6IDEsXG4gICAgICAgICAgICAgIFwiZ3JvdW5kXCI6IFtcbiAgICAgICAgICAgICAgICAwLjMsXG4gICAgICAgICAgICAgICAgMC4yLFxuICAgICAgICAgICAgICAgIDAuMlxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBcImludGVuc2l0eUdyb3VuZFwiOiAxLFxuICAgICAgICAgICAgICBcIm1hdHJpeFwiOiBbXG4gICAgICAgICAgICAgICAgMC43NzU1MjExNDk1LFxuICAgICAgICAgICAgICAgIC0wLjA2NjY2MDI4NixcbiAgICAgICAgICAgICAgICAwLjYyNzc5MjQ0NDIsXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwLjI2OTA0ODM3MzcsXG4gICAgICAgICAgICAgICAgMC45MzQ0ODQ2NTIzLFxuICAgICAgICAgICAgICAgIC0wLjIzMzEzMzg4MjUsXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAtMC41NzExMjE2MzI2LFxuICAgICAgICAgICAgICAgIDAuMzQ5NzA2NzkyNyxcbiAgICAgICAgICAgICAgICAwLjc0MjY0NzQ1MzMsXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAtMjkuMjQ0NjcyMzM2MixcbiAgICAgICAgICAgICAgICAxNy45MDcwMTg4NTYxLFxuICAgICAgICAgICAgICAgIDczLjkyMzIwNTkyNTcsXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBcImZhbGxvZmZcIjogMC4wMDA5NTM0NTg2LFxuICAgICAgICAgICAgICBcImF0dGFjaGVkVG9DYW1lcmFcIjogZmFsc2UsXG4gICAgICAgICAgICAgIFwiYW5nbGVcIjogNDUsXG4gICAgICAgICAgICAgIFwiaGFyZG5lc3NcIjogMC41LFxuICAgICAgICAgICAgICBcImNhc3RTaGFkb3dzXCI6IGZhbHNlLFxuICAgICAgICAgICAgICBcInNoYWRvd0JpYXNcIjogMC4wMDVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcIkRJUkVDVElPTlwiLFxuICAgICAgICAgICAgICBcImVuYWJsZVwiOiB0cnVlLFxuICAgICAgICAgICAgICBcImNvbG9yXCI6IFtcbiAgICAgICAgICAgICAgICAwLjQyMzQ2OTM4NzgsXG4gICAgICAgICAgICAgICAgMC43MzUyNjY1NTU2LFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgXCJpbnRlbnNpdHlcIjogMC4xMixcbiAgICAgICAgICAgICAgXCJncm91bmRcIjogW1xuICAgICAgICAgICAgICAgIDAuOTY0Mjg1NzE0MyxcbiAgICAgICAgICAgICAgICAwLjY0ODQxMjg2MzcsXG4gICAgICAgICAgICAgICAgMC4yNjA3NTA3Mjg5XG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIFwiaW50ZW5zaXR5R3JvdW5kXCI6IDAuMDYsXG4gICAgICAgICAgICAgIFwibWF0cml4XCI6IFtcbiAgICAgICAgICAgICAgICAwLjY5MDMyOTkxMzEsXG4gICAgICAgICAgICAgICAgLTAuNzA3NjM2MzY2OSxcbiAgICAgICAgICAgICAgICAtMC4xNTA2NDk4Njk5LFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgLTAuMDExMDg5Njk4MixcbiAgICAgICAgICAgICAgICAwLjE5Nzg1MTM3MyxcbiAgICAgICAgICAgICAgICAtMC45ODAxNjkyOTgsXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwLjcyMzQwOTcyNDYsXG4gICAgICAgICAgICAgICAgMC42NzgzMTA4NDc5LFxuICAgICAgICAgICAgICAgIDAuMTI4NzM1MjQ3NCxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDM3LjA0MjgzMDUxNzcsXG4gICAgICAgICAgICAgICAgMzQuNzMzNDQ5NjE3NixcbiAgICAgICAgICAgICAgICA0Mi40ODczNDU0Njg1LFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgXCJmYWxsb2ZmXCI6IDAuMDAwOTUzNDU4NixcbiAgICAgICAgICAgICAgXCJhdHRhY2hlZFRvQ2FtZXJhXCI6IGZhbHNlLFxuICAgICAgICAgICAgICBcImFuZ2xlXCI6IDQ1LFxuICAgICAgICAgICAgICBcImhhcmRuZXNzXCI6IDAuNSxcbiAgICAgICAgICAgICAgXCJjYXN0U2hhZG93c1wiOiBmYWxzZSxcbiAgICAgICAgICAgICAgXCJzaGFkb3dCaWFzXCI6IDAuMDA1XG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICBcIm9yaWVudGF0aW9uXCI6IHtcbiAgICAgICAgICBcIm1hdHJpeFwiOiBbXG4gICAgICAgICAgICAxLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMSxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAxXG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuZGVjU2tldGNoZmFiU2VydmljZS5wYWNoQ29uZmlncyhpZCwgY29uZmlnKS5zdWJzY3JpYmUocmVzcCA9PiB7XG4gICAgICB0aGlzLmRlY1NrZXRjaGZhYlNlcnZpY2UuZ2V0QWxsVGV4dHVyZXMoaWQpLnN1YnNjcmliZSh0ZXh0dXJlUmVzcCA9PiB7XG4gICAgICAgIGlmICh0ZXh0dXJlUmVzcCkge1xuICAgICAgICAgIHRoaXMuc2tldGNoZmFiSWQgPSBpZDtcbiAgICAgICAgICB0aGlzLnRleHR1cmVzID0gdGV4dHVyZVJlc3AucmVzdWx0cztcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KTtcbiAgfVxuXG4gIG1hdGVyaWFsU2VsZWN0ZWQobSkge1xuICAgIGlmIChtKSB7XG4gICAgICB0aGlzLnVwZGF0ZSA9IGZhbHNlO1xuICAgICAgdGhpcy5tYXRlcmlhbCA9IG07XG4gICAgICB0aGlzLnNlbGVjdE1hdGVyaWFsQnlOYW1lKG0ubmFtZSk7XG4gICAgfVxuICB9XG5cbiAgc2VsZWN0TWF0ZXJpYWxCeU5hbWUobmFtZSkge1xuICAgIHRoaXMubWF0ZXJpYWxOYW1lID0gbmFtZTtcbiAgICB0aGlzLm1hdGVyaWFsQ29uZmlnID0gdGhpcy5tYXRlcmlhbHMuZmlsdGVyKHggPT4geC5tYXRlcmlhbE5hbWUgPT09IG5hbWUpO1xuICAgIHRoaXMubWF0ZXJpYWxDb25maWcgPSB0aGlzLm1hdGVyaWFsQ29uZmlnWzBdO1xuICB9XG5cbiAgZ2V0TWF0ZXJpYWxzKGNvbmZpZ3MpIHtcbiAgICBpZiAoY29uZmlncykge1xuICAgICAgdGhpcy5tYXRlcmlhbHMgPSBjb25maWdzO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZU1hdGVyaWFsKG1hdGVyaWFsLCAkZXZlbnQpIHtcbiAgICBzd2l0Y2ggKG1hdGVyaWFsKSB7XG4gICAgICBjYXNlICdtZXRhbCc6IHtcbiAgICAgICAgdGhpcy5tYXRlcmlhbC5jaGFubmVscy5NZXRhbG5lc3NQQlIuZmFjdG9yID0gJGV2ZW50LnZhbHVlIC8gMTAwO1xuICAgICAgICB0aGlzLm1hdGVyaWFsQ29uZmlnLmNvbmZpZy5tZXRhbG5lc3MgPSAkZXZlbnQudmFsdWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSAnYmFzZS1jb2xvcic6IHtcbiAgICAgICAgdGhpcy5tYXRlcmlhbC5jaGFubmVscy5BbGJlZG9QQlIuZmFjdG9yID0gJGV2ZW50LnZhbHVlIC8gMTAwO1xuICAgICAgICB0aGlzLm1hdGVyaWFsQ29uZmlnLmNvbmZpZy5kaWZmdXNlID0gJGV2ZW50LnZhbHVlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgJ3JvdWcnOiB7XG4gICAgICAgIHRoaXMubWF0ZXJpYWwuY2hhbm5lbHMuUm91Z2huZXNzUEJSLmZhY3RvciA9ICRldmVudC52YWx1ZSAvIDEwMDtcbiAgICAgICAgdGhpcy5tYXRlcmlhbENvbmZpZy5jb25maWcucm91Z2huZXNzID0gJGV2ZW50LnZhbHVlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgJ25vcm1hbCc6IHtcbiAgICAgICAgdGhpcy5tYXRlcmlhbC5jaGFubmVscy5Ob3JtYWxNYXAuZW5hYmxlID0gJGV2ZW50LmNoZWNrZWQ7XG4gICAgICAgIHRoaXMubWF0ZXJpYWxDb25maWcuY29uZmlnLm5vcm1hbCA9ICRldmVudC5jaGVja2VkO1xuICAgICAgICBpZiAoJGV2ZW50LmNoZWNrZWQpIHtcbiAgICAgICAgICB0aGlzLm1hdGVyaWFsLmNoYW5uZWxzLk5vcm1hbE1hcC5mYWN0b3IgPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMubWF0ZXJpYWwuY2hhbm5lbHMuTm9ybWFsTWFwLmZhY3RvciA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlICdvcGFjaXR5Jzoge1xuICAgICAgICB0aGlzLm1hdGVyaWFsLmNoYW5uZWxzLk9wYWNpdHkuZmFjdG9yID0gJGV2ZW50LnZhbHVlIC8gMTAwO1xuICAgICAgICB0aGlzLm1hdGVyaWFsQ29uZmlnLmNvbmZpZy5vcGFjaXR5ID0gJGV2ZW50LnZhbHVlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5zZW5kTWF0ZXJpYWxUb1VwZGF0ZSgpO1xuICB9XG5cblxuICBhYmxlVG8odHlwZSkge1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAnbWV0YWwnOlxuICAgICAgICB0aGlzLm1hdGVyaWFsQ29uZmlnLmNvbmZpZy5tZXRhbG5lc3NFbmFibGVkID0gIXRoaXMubWF0ZXJpYWxDb25maWcuY29uZmlnLm1ldGFsbmVzc0VuYWJsZWQ7XG4gICAgICAgIHRoaXMuc2V0VGV4dHVyZSgnbWV0YWwnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdiYXNlLWNvbG9yJzpcbiAgICAgICAgdGhpcy5tYXRlcmlhbENvbmZpZy5jb25maWcuZGlmZnVzZUVuYWJsZWQgPSAhdGhpcy5tYXRlcmlhbENvbmZpZy5jb25maWcuZGlmZnVzZUVuYWJsZWQ7XG4gICAgICAgIHRoaXMuc2V0VGV4dHVyZSgnYmFzZS1jb2xvcicpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3JvdWcnOlxuICAgICAgICB0aGlzLm1hdGVyaWFsQ29uZmlnLmNvbmZpZy5yb3VnaG5lc3NFbmFibGVkID0gIXRoaXMubWF0ZXJpYWxDb25maWcuY29uZmlnLnJvdWdobmVzc0VuYWJsZWQ7XG4gICAgICAgIHRoaXMuc2V0VGV4dHVyZSgncm91ZycpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ29wYWNpdHknOlxuICAgICAgICB0aGlzLm1hdGVyaWFsQ29uZmlnLmNvbmZpZy5vcGFjaXR5RW5hYmxlZCA9ICF0aGlzLm1hdGVyaWFsQ29uZmlnLmNvbmZpZy5vcGFjaXR5RW5hYmxlZDtcbiAgICAgICAgdGhpcy5zZXRUZXh0dXJlKCdvcGFjaXR5Jyk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHNldFRleHR1cmUodHlwZSkge1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAnbWV0YWwnOlxuICAgICAgICBpZiAodGhpcy5tYXRlcmlhbC5jaGFubmVscy5NZXRhbG5lc3NQQlIudGV4dHVyZSkge1xuICAgICAgICAgIGRlbGV0ZSB0aGlzLm1hdGVyaWFsLmNoYW5uZWxzLk1ldGFsbmVzc1BCUi50ZXh0dXJlO1xuICAgICAgICAgIHRoaXMubWF0ZXJpYWwuY2hhbm5lbHMuTWV0YWxuZXNzUEJSLmNvbG9yID0gWzEsIDEsIDFdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRlbGV0ZSB0aGlzLm1hdGVyaWFsLmNoYW5uZWxzLk1ldGFsbmVzc1BCUi5jb2xvcjtcbiAgICAgICAgICB0aGlzLm1hdGVyaWFsLmNoYW5uZWxzLk1ldGFsbmVzc1BCUi50ZXh0dXJlID0gdGhpcy5nZXRUZXh0dXJlKHRoaXMubWF0ZXJpYWxDb25maWcubWF0ZXJpYWxOYW1lICsgJ19NRVRBTExJQy5qcGcnKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3JvdWcnOlxuICAgICAgICBpZiAodGhpcy5tYXRlcmlhbC5jaGFubmVscy5Sb3VnaG5lc3NQQlIudGV4dHVyZSkge1xuICAgICAgICAgIGRlbGV0ZSB0aGlzLm1hdGVyaWFsLmNoYW5uZWxzLlJvdWdobmVzc1BCUi50ZXh0dXJlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMubWF0ZXJpYWwuY2hhbm5lbHMuUm91Z2huZXNzUEJSLnRleHR1cmUgPSB0aGlzLmdldFRleHR1cmUodGhpcy5tYXRlcmlhbENvbmZpZy5tYXRlcmlhbE5hbWUgKyAnX1JPVUdITkVTUy5qcGcnKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ29wYWNpdHknOlxuICAgICAgICBpZiAodGhpcy5tYXRlcmlhbC5jaGFubmVscy5PcGFjaXR5LnRleHR1cmUpIHtcbiAgICAgICAgICBkZWxldGUgdGhpcy5tYXRlcmlhbC5jaGFubmVscy5PcGFjaXR5LnRleHR1cmU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5tYXRlcmlhbC5jaGFubmVscy5PcGFjaXR5LnRleHR1cmUgPSB0aGlzLmdldFRleHR1cmUodGhpcy5tYXRlcmlhbENvbmZpZy5tYXRlcmlhbE5hbWUgKyAnX1RSQU5TUEFSRU5ULmpwZycpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICB0aGlzLnNlbmRNYXRlcmlhbFRvVXBkYXRlKCk7XG4gIH1cblxuICBnZXRUZXh0dXJlKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy50ZXh0dXJlcy5maW5kKHggPT4geC5uYW1lID09PSBuYW1lKTtcbiAgfVxuXG4gIHNlbmRNYXRlcmlhbFRvVXBkYXRlKCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy51cGRhdGUgPSB0cnVlO1xuICAgICAgdGhpcy5tYXRlcmlhbCA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5tYXRlcmlhbCkpO1xuICAgIH0sIDIwMCk7XG4gIH1cblxuICBvblNhdmUoKSB7XG4gICAgdGhpcy5nZXRNYXRlcmlhbHNTa2V0Y2hmYWIgPSB0cnVlOyBcbiAgfVxuXG4gIGdldEFsbE1hdGVyaWFscygkZXZlbnQpIHtcbiAgICBsZXQgbWF0ID0ge307XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8ICRldmVudC5sZW5ndGg7IGkrKykge1xuICAgICAgbWF0WyRldmVudFtpXS5pZF0gPSAkZXZlbnRbaV07XG4gICAgfVxuXG4gICAgY29uc3QgY29uZmlnID0ge1xuICAgICAgJ29wdGlvbnMnOiB7XG4gICAgICAgICdtYXRlcmlhbHMnOiBtYXRcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5kZWNTa2V0Y2hmYWJTZXJ2aWNlLnBhY2hDb25maWdzKHRoaXMuYXNzZXRNYXguZmJ4RmlsZXMuZmJ4QWxsR3JvdXBzRmlsZS5za2V0Y2hmYWJJZCwgY29uZmlnKS5zdWJzY3JpYmUocmVzcCA9PiB7XG4gICAgICB0aGlzLmdldE1hdGVyaWFsc1NrZXRjaGZhYiA9IGZhbHNlO1xuICAgICAgdGhpcy5zYXZlLmVtaXQodGhpcy5hc3NldE1heCk7XG4gICAgfSk7XG4gIH0gXG59XG4iXX0=