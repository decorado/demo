/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { DecScriptLoaderService } from './../../services/script-loader/dec-script-loader.service';
import { DecColorService } from './../../services/color/dec-color.service';
/** @type {?} */
var HIGHLIGHT_COLOR = [255, 255, 0];
/** @type {?} */
var SKETCHFAB_SCRIPT_URL = 'https://static.sketchfab.com/api/sketchfab-viewer-1.0.0.js';
var DecSketchfabViewComponent = /** @class */ (function () {
    function DecSketchfabViewComponent(decScriptLoaderService, decColorService) {
        this.decScriptLoaderService = decScriptLoaderService;
        this.decColorService = decColorService;
        this.materialSelected = new EventEmitter();
        this.materialUnselected = new EventEmitter();
        this.sendMaterials = new EventEmitter();
        this.loaded = new EventEmitter();
    }
    Object.defineProperty(DecSketchfabViewComponent.prototype, "sketchfabId", {
        get: /**
         * @return {?}
         */
        function () {
            return this._sketchfabId;
        },
        set: /**
         * @param {?} id
         * @return {?}
         */
        function (id) {
            if (id) {
                this._sketchfabId = id;
                this.startSketchfab(id);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecSketchfabViewComponent.prototype, "materialName", {
        get: /**
         * @return {?}
         */
        function () {
            return this._materialName;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v && this._materialName !== v) {
                this._materialName = v;
                /** @type {?} */
                var material = this.selectMaterialByName(v, true);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecSketchfabViewComponent.prototype, "material", {
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v && this.update) {
                this.updateMaterials(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecSketchfabViewComponent.prototype, "editMode", {
        get: /**
         * @return {?}
         */
        function () {
            return this._editMode;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v) {
                this.addClickEvent();
                this._editMode = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecSketchfabViewComponent.prototype, "getAllMaterials", {
        get: /**
         * @return {?}
         */
        function () {
            return this._getAllMaterials;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v) {
                this._getAllMaterials = v;
                this.sendAllMaterials();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DecSketchfabViewComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @param {?} id
     * @return {?}
     */
    DecSketchfabViewComponent.prototype.startSketchfab = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        var _this = this;
        this.decScriptLoaderService.load(SKETCHFAB_SCRIPT_URL, 'Sketchfab')
            .then(function (Sketchfab) {
            /** @type {?} */
            var iframe = _this.apiFrame.nativeElement;
            _this.client = new Sketchfab('1.0.0', iframe);
            _this.client.init(_this.sketchfabId, {
                success: function (api) {
                    api.start();
                    _this.api = api;
                    api.addEventListener('viewerready', function () {
                        console.log('--- SKETCHFAB  viewerready');
                        _this.getMaterials()
                            .then(function (materials) {
                            _this.loaded.emit();
                        });
                        if (_this.editMode) {
                            _this.addClickEvent();
                        }
                    });
                }
            });
        });
    };
    /**
     * @param {?} material
     * @return {?}
     */
    DecSketchfabViewComponent.prototype.updateMaterials = /**
     * @param {?} material
     * @return {?}
     */
    function (material) {
        this.api.setMaterial(material, function (resColor) {
            console.log('--- SKETCHFAB  COLOR SET', resColor);
        });
    };
    /**
     * @return {?}
     */
    DecSketchfabViewComponent.prototype.getMaterials = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.api.getMaterialList(function (err, materialList) {
                _this.materials = materialList;
                resolve(materialList);
            });
        });
    };
    /**
     * @param {?} name
     * @param {?=} emit
     * @return {?}
     */
    DecSketchfabViewComponent.prototype.selectMaterialByName = /**
     * @param {?} name
     * @param {?=} emit
     * @return {?}
     */
    function (name, emit) {
        if (emit === void 0) { emit = false; }
        /** @type {?} */
        var material = this.materials.find(function (m) { return m.name === name; });
        if (this.highlightOnSelection) {
            this.highlightMaterial(material);
        }
        if (emit) {
            this.materialSelected.emit(material);
        }
        return material;
    };
    /**
     * @return {?}
     */
    DecSketchfabViewComponent.prototype.addClickEvent = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.api) {
            this.api.addEventListener('click', function (e) {
                _this._materialName = e.material.name;
                _this.selectEffect(e.material);
                _this.selectMaterialByName(e.material.name, true);
            });
        }
    };
    /**
     * @param {?} material
     * @return {?}
     */
    DecSketchfabViewComponent.prototype.selectEffect = /**
     * @param {?} material
     * @return {?}
     */
    function (material) {
        material.shadeless = true;
        if (material.channels.NormalMap.factor === 1 || material.channels.NormalMap.enable) {
            material.channels.NormalMap.factor = 1;
        }
        this.api.setMaterial(material, function () {
            setTimeout(function () {
                material.shadeless = false;
            }, 500);
        });
    };
    /**
     * @return {?}
     */
    DecSketchfabViewComponent.prototype.sendAllMaterials = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.api.getMaterialList(function (err, materialList) {
            _this.sendMaterials.emit(materialList);
        });
    };
    /**
     * @param {?} material
     * @param {?} color
     * @return {?}
     */
    DecSketchfabViewComponent.prototype.setMaterialColor = /**
     * @param {?} material
     * @param {?} color
     * @return {?}
     */
    function (material, color) {
        /** @type {?} */
        var Albedo = material.channels.AlbedoPBR;
        this.setChannelColor(Albedo, color);
        delete Albedo.texture;
        this.api.setMaterial(material, function (response) {
            console.log("MATERIAL COLOR SET TO " + color);
        });
    };
    /**
     * @param {?} material
     * @param {?} factor
     * @return {?}
     */
    DecSketchfabViewComponent.prototype.setMaterialRoughness = /**
     * @param {?} material
     * @param {?} factor
     * @return {?}
     */
    function (material, factor) {
        /** @type {?} */
        var Roughness = material.channels.RoughnessPBR;
        Roughness.factor = factor;
        this.api.setMaterial(material, function (response) {
            console.log("MATERIAL ROUGHNESS SET TO " + factor);
        });
    };
    /**
     * @param {?} material
     * @param {?} factor
     * @return {?}
     */
    DecSketchfabViewComponent.prototype.setMaterialMetalness = /**
     * @param {?} material
     * @param {?} factor
     * @return {?}
     */
    function (material, factor) {
        /** @type {?} */
        var Metalness = material.channels.MetalnessPBR;
        Metalness.factor = factor;
        this.api.setMaterial(material, function (response) {
            console.log("MATERIAL METALNESS SET TO " + factor);
        });
    };
    /**
     * @param {?} material
     * @param {?} texture
     * @return {?}
     */
    DecSketchfabViewComponent.prototype.setMaterialAlbedoPBRTexture = /**
     * @param {?} material
     * @param {?} texture
     * @return {?}
     */
    function (material, texture) {
        /** @type {?} */
        var Albedo = material.channels.AlbedoPBR;
        Albedo.texture = texture;
        delete Albedo.color;
        this.api.setMaterial(material, function (response) {
            console.log("MATERIAL TEXTURE SET TO " + texture);
        });
    };
    /**
     * @param {?} channel
     * @param {?} rgbArray
     * @return {?}
     */
    DecSketchfabViewComponent.prototype.setChannelColor = /**
     * @param {?} channel
     * @param {?} rgbArray
     * @return {?}
     */
    function (channel, rgbArray) {
        channel.color = this.decColorService.rgbArrayToLinearArray(rgbArray);
    };
    /**
     * @return {?}
     */
    DecSketchfabViewComponent.prototype.unhigHlightCurrentMaterial = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var linearHitghlightColor = this.decColorService.rgbArrayToLinearArray(HIGHLIGHT_COLOR);
        /** @type {?} */
        var material = this.materials.find(function (mat) { return mat.name === _this.highlightedMaterial.name; });
        /** @type {?} */
        var materialColor = material.channels.AlbedoPBR.color;
        if (JSON.stringify(materialColor) === JSON.stringify(linearHitghlightColor)) {
            /** @type {?} */
            var texture = JSON.parse(JSON.stringify(this.highlightedMaterial.channels.AlbedoPBR.texture));
            this.setMaterialAlbedoPBRTexture(material, texture);
        }
    };
    /**
     * @param {?} material
     * @return {?}
     */
    DecSketchfabViewComponent.prototype.highlightMaterial = /**
     * @param {?} material
     * @return {?}
     */
    function (material) {
        /** @type {?} */
        var materialCopy = JSON.parse(JSON.stringify(material));
        if (!this.highlightedMaterial) {
            this.highlightedMaterial = materialCopy;
            this.setMaterialColor(material, HIGHLIGHT_COLOR);
        }
        else {
            if (this.highlightedMaterial.name !== material.name) {
                this.unhigHlightCurrentMaterial();
                this.highlightedMaterial = materialCopy;
                this.setMaterialColor(material, HIGHLIGHT_COLOR);
            }
            else {
                this.unhigHlightCurrentMaterial();
                this.highlightedMaterial = undefined;
                this.materialUnselected.emit();
            }
        }
    };
    DecSketchfabViewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-sketchfab-view',
                    template: "<iframe src=\"\"\n  #apiFrame\n  id=\"api-frame\"\n  height=\"620\"\n  width=\"620\"\n  allowfullscreen\n  mozallowfullscreen=\"true\"\n  webkitallowfullscreen=\"true\"></iframe>\n",
                    styles: [""]
                },] },
    ];
    /** @nocollapse */
    DecSketchfabViewComponent.ctorParameters = function () { return [
        { type: DecScriptLoaderService },
        { type: DecColorService }
    ]; };
    DecSketchfabViewComponent.propDecorators = {
        sketchfabId: [{ type: Input }],
        materialName: [{ type: Input }],
        material: [{ type: Input }],
        editMode: [{ type: Input }],
        getAllMaterials: [{ type: Input }],
        highlightOnSelection: [{ type: Input }],
        update: [{ type: Input }],
        textures: [{ type: Input }],
        materialSelected: [{ type: Output }],
        materialUnselected: [{ type: Output }],
        sendMaterials: [{ type: Output }],
        loaded: [{ type: Output }],
        apiFrame: [{ type: ViewChild, args: ['apiFrame',] }]
    };
    return DecSketchfabViewComponent;
}());
export { DecSketchfabViewComponent };
if (false) {
    /** @type {?} */
    DecSketchfabViewComponent.prototype.api;
    /** @type {?} */
    DecSketchfabViewComponent.prototype.materials;
    /** @type {?} */
    DecSketchfabViewComponent.prototype.highlightOnSelection;
    /** @type {?} */
    DecSketchfabViewComponent.prototype.update;
    /** @type {?} */
    DecSketchfabViewComponent.prototype.textures;
    /** @type {?} */
    DecSketchfabViewComponent.prototype.materialSelected;
    /** @type {?} */
    DecSketchfabViewComponent.prototype.materialUnselected;
    /** @type {?} */
    DecSketchfabViewComponent.prototype.sendMaterials;
    /** @type {?} */
    DecSketchfabViewComponent.prototype.loaded;
    /** @type {?} */
    DecSketchfabViewComponent.prototype._sketchfabId;
    /** @type {?} */
    DecSketchfabViewComponent.prototype._materialName;
    /** @type {?} */
    DecSketchfabViewComponent.prototype._editMode;
    /** @type {?} */
    DecSketchfabViewComponent.prototype._getAllMaterials;
    /** @type {?} */
    DecSketchfabViewComponent.prototype.client;
    /** @type {?} */
    DecSketchfabViewComponent.prototype.highlightedMaterial;
    /** @type {?} */
    DecSketchfabViewComponent.prototype.apiFrame;
    /** @type {?} */
    DecSketchfabViewComponent.prototype.decScriptLoaderService;
    /** @type {?} */
    DecSketchfabViewComponent.prototype.decColorService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLXNrZXRjaGZhYi12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9za2V0Y2hmYWItdmlldy9kZWMtc2tldGNoZmFiLXZpZXcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEcsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sMERBQTBELENBQUM7QUFDbEcsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBDQUEwQyxDQUFDOztBQUUzRSxJQUFNLGVBQWUsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7O0FBQ3RDLElBQU0sb0JBQW9CLEdBQUcsNERBQTRELENBQUM7O0lBb0d4RixtQ0FDVSx3QkFDQTtRQURBLDJCQUFzQixHQUF0QixzQkFBc0I7UUFDdEIsb0JBQWUsR0FBZixlQUFlO2dDQXBCSSxJQUFJLFlBQVksRUFBRTtrQ0FFaEIsSUFBSSxZQUFZLEVBQUU7NkJBRXZCLElBQUksWUFBWSxFQUFFO3NCQUV6QixJQUFJLFlBQVksRUFBRTtLQWVoQztJQWxGTCxzQkFDSSxrREFBVzs7OztRQU9mO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7U0FDMUI7Ozs7O1FBVkQsVUFDZ0IsRUFBRTtZQUNoQixFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNQLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO2dCQUN2QixJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ3pCO1NBQ0Y7OztPQUFBO0lBTUQsc0JBQ0ksbURBQVk7Ozs7UUFPaEI7WUFDRSxNQUFNLENB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QUFDO1NBRWxEO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFFTixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUVwRCxJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztnQkFFbEMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLFlBQVksQ0FBQztnQkFFeEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxlQUFlLENBQUMsQ0FBQzthQUVsRDtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUVOLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO2dCQUVsQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsU0FBUyxDQUFDO2dCQUVyQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLENBQUM7YUFFaEM7U0FFRjs7O2dCQTNSSixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsUUFBUSxFQUFFLHNMQVFYO29CQUNDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQztpQkFDYjs7OztnQkFsQlEsc0JBQXNCO2dCQUN0QixlQUFlOzs7OEJBd0JyQixLQUFLOytCQVlMLEtBQUs7MkJBWUwsS0FBSzsyQkFPTCxLQUFLO2tDQVlMLEtBQUs7dUNBWUwsS0FBSzt5QkFFTCxLQUFLOzJCQUVMLEtBQUs7bUNBRUwsTUFBTTtxQ0FFTixNQUFNO2dDQUVOLE1BQU07eUJBRU4sTUFBTTsyQkFVTixTQUFTLFNBQUMsVUFBVTs7b0NBdkd2Qjs7U0FvQmEseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWNTY3JpcHRMb2FkZXJTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9zY3JpcHQtbG9hZGVyL2RlYy1zY3JpcHQtbG9hZGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGVjQ29sb3JTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9jb2xvci9kZWMtY29sb3Iuc2VydmljZSc7XG5cbmNvbnN0IEhJR0hMSUdIVF9DT0xPUiA9IFsyNTUsIDI1NSwgMF07XG5jb25zdCBTS0VUQ0hGQUJfU0NSSVBUX1VSTCA9ICdodHRwczovL3N0YXRpYy5za2V0Y2hmYWIuY29tL2FwaS9za2V0Y2hmYWItdmlld2VyLTEuMC4wLmpzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLXNrZXRjaGZhYi12aWV3JyxcbiAgdGVtcGxhdGU6IGA8aWZyYW1lIHNyYz1cIlwiXG4gICNhcGlGcmFtZVxuICBpZD1cImFwaS1mcmFtZVwiXG4gIGhlaWdodD1cIjYyMFwiXG4gIHdpZHRoPVwiNjIwXCJcbiAgYWxsb3dmdWxsc2NyZWVuXG4gIG1vemFsbG93ZnVsbHNjcmVlbj1cInRydWVcIlxuICB3ZWJraXRhbGxvd2Z1bGxzY3JlZW49XCJ0cnVlXCI+PC9pZnJhbWU+XG5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjU2tldGNoZmFiVmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgYXBpOiBhbnk7XG5cbiAgbWF0ZXJpYWxzO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBza2V0Y2hmYWJJZChpZCkge1xuICAgIGlmIChpZCkge1xuICAgICAgdGhpcy5fc2tldGNoZmFiSWQgPSBpZDtcbiAgICAgIHRoaXMuc3RhcnRTa2V0Y2hmYWIoaWQpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBza2V0Y2hmYWJJZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2tldGNoZmFiSWQ7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgbWF0ZXJpYWxOYW1lKHYpIHtcbiAgICBpZiAodiAmJiB0aGlzLl9tYXRlcmlhbE5hbWUgIT09IHYpIHtcbiAgICAgIHRoaXMuX21hdGVyaWFsTmFtZSA9IHY7XG4gICAgICBjb25zdCBtYXRlcmlhbCA9IHRoaXMuc2VsZWN0TWF0ZXJpYWxCeU5hbWUodiwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IG1hdGVyaWFsTmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fbWF0ZXJpYWxOYW1lO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IG1hdGVyaWFsICh2KSB7XG4gICAgaWYgKHYgJiYgdGhpcy51cGRhdGUpIHtcbiAgICAgIHRoaXMudXBkYXRlTWF0ZXJpYWxzKHYpO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBlZGl0TW9kZSh2KSB7XG4gICAgaWYgKHYpIHtcbiAgICAgIHRoaXMuYWRkQ2xpY2tFdmVudCgpO1xuICAgICAgdGhpcy5fZWRpdE1vZGUgPSB2O1xuICAgIH1cbiAgfVxuXG4gIGdldCBlZGl0TW9kZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fZWRpdE1vZGU7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgZ2V0QWxsTWF0ZXJpYWxzKHYpIHtcbiAgICBpZiAodikge1xuICAgICAgdGhpcy5fZ2V0QWxsTWF0ZXJpYWxzID0gdjtcbiAgICAgIHRoaXMuc2VuZEFsbE1hdGVyaWFscygpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBnZXRBbGxNYXRlcmlhbHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dldEFsbE1hdGVyaWFscztcbiAgfVxuXG4gIEBJbnB1dCgpIGhpZ2hsaWdodE9uU2VsZWN0aW9uOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHVwZGF0ZTogYW55O1xuXG4gIEBJbnB1dCgpIHRleHR1cmVzOiBhbnk7XG5cbiAgQE91dHB1dCgpIG1hdGVyaWFsU2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQE91dHB1dCgpIG1hdGVyaWFsVW5zZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAT3V0cHV0KCkgc2VuZE1hdGVyaWFscyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAT3V0cHV0KCkgbG9hZGVkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5cbiAgcHJpdmF0ZSBfc2tldGNoZmFiSWQ6IHN0cmluZztcbiAgcHJpdmF0ZSBfbWF0ZXJpYWxOYW1lOiBzdHJpbmc7XG4gIHByaXZhdGUgX2VkaXRNb2RlOiBib29sZWFuO1xuICBwcml2YXRlIF9nZXRBbGxNYXRlcmlhbHM6IGJvb2xlYW47XG4gIHByaXZhdGUgY2xpZW50O1xuICBwcml2YXRlIGhpZ2hsaWdodGVkTWF0ZXJpYWw7XG5cbiAgQFZpZXdDaGlsZCgnYXBpRnJhbWUnKSBhcGlGcmFtZTogRWxlbWVudFJlZjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGRlY1NjcmlwdExvYWRlclNlcnZpY2U6IERlY1NjcmlwdExvYWRlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBkZWNDb2xvclNlcnZpY2U6IERlY0NvbG9yU2VydmljZSxcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIHN0YXJ0U2tldGNoZmFiKGlkKSB7XG4gICAgdGhpcy5kZWNTY3JpcHRMb2FkZXJTZXJ2aWNlLmxvYWQoU0tFVENIRkFCX1NDUklQVF9VUkwsICdTa2V0Y2hmYWInKVxuICAgICAgLnRoZW4oKFNrZXRjaGZhYjogYW55KSA9PiB7XG4gICAgICAgIGNvbnN0IGlmcmFtZSA9IHRoaXMuYXBpRnJhbWUubmF0aXZlRWxlbWVudDtcbiAgICAgICAgdGhpcy5jbGllbnQgPSBuZXcgU2tldGNoZmFiKCcxLjAuMCcsIGlmcmFtZSk7XG4gICAgICAgIHRoaXMuY2xpZW50LmluaXQodGhpcy5za2V0Y2hmYWJJZCwge1xuICAgICAgICAgIHN1Y2Nlc3M6IChhcGkpID0+IHtcbiAgICAgICAgICAgIGFwaS5zdGFydCgpO1xuICAgICAgICAgICAgdGhpcy5hcGkgPSBhcGk7XG4gICAgICAgICAgICBhcGkuYWRkRXZlbnRMaXN0ZW5lcigndmlld2VycmVhZHknLCAoKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCctLS0gU0tFVENIRkFCICB2aWV3ZXJyZWFkeScpO1xuICAgICAgICAgICAgICB0aGlzLmdldE1hdGVyaWFscygpXG4gICAgICAgICAgICAgIC50aGVuKG1hdGVyaWFscyA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkZWQuZW1pdCgpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuZWRpdE1vZGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZENsaWNrRXZlbnQoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlTWF0ZXJpYWxzKG1hdGVyaWFsKSB7XG5cbiAgICB0aGlzLmFwaS5zZXRNYXRlcmlhbChtYXRlcmlhbCwgKHJlc0NvbG9yKSA9PiB7XG5cbiAgICAgIGNvbnNvbGUubG9nKCctLS0gU0tFVENIRkFCICBDT0xPUiBTRVQnLCByZXNDb2xvcik7XG5cbiAgICB9KTtcblxuICB9XG5cbiAgZ2V0TWF0ZXJpYWxzKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmFwaS5nZXRNYXRlcmlhbExpc3QoKGVyciwgbWF0ZXJpYWxMaXN0KSA9PiB7XG4gICAgICAgIHRoaXMubWF0ZXJpYWxzID0gbWF0ZXJpYWxMaXN0O1xuICAgICAgICByZXNvbHZlKG1hdGVyaWFsTGlzdCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG5cbiAgc2VsZWN0TWF0ZXJpYWxCeU5hbWUobmFtZSwgZW1pdCA9IGZhbHNlKSB7XG5cbiAgICBjb25zdCBtYXRlcmlhbCA9IHRoaXMubWF0ZXJpYWxzLmZpbmQobSA9PiBtLm5hbWUgPT09IG5hbWUpO1xuXG4gICAgaWYgKHRoaXMuaGlnaGxpZ2h0T25TZWxlY3Rpb24pIHtcblxuICAgICAgdGhpcy5oaWdobGlnaHRNYXRlcmlhbChtYXRlcmlhbCk7XG5cbiAgICB9XG5cblxuICAgIGlmIChlbWl0KSB7XG4gICAgICB0aGlzLm1hdGVyaWFsU2VsZWN0ZWQuZW1pdChtYXRlcmlhbCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hdGVyaWFsO1xuICB9XG5cbiAgYWRkQ2xpY2tFdmVudCgpIHtcbiAgICBpZiAodGhpcy5hcGkpIHtcbiAgICAgIHRoaXMuYXBpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgdGhpcy5fbWF0ZXJpYWxOYW1lID0gZS5tYXRlcmlhbC5uYW1lO1xuICAgICAgICB0aGlzLnNlbGVjdEVmZmVjdChlLm1hdGVyaWFsKTtcbiAgICAgICAgdGhpcy5zZWxlY3RNYXRlcmlhbEJ5TmFtZShlLm1hdGVyaWFsLm5hbWUsIHRydWUpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgc2VsZWN0RWZmZWN0KG1hdGVyaWFsKSB7XG4gICAgbWF0ZXJpYWwuc2hhZGVsZXNzID0gdHJ1ZTtcbiAgICBpZiAobWF0ZXJpYWwuY2hhbm5lbHMuTm9ybWFsTWFwLmZhY3RvciA9PT0gMSB8fCBtYXRlcmlhbC5jaGFubmVscy5Ob3JtYWxNYXAuZW5hYmxlKSB7XG4gICAgICBtYXRlcmlhbC5jaGFubmVscy5Ob3JtYWxNYXAuZmFjdG9yID0gMTtcbiAgICB9XG4gICAgdGhpcy5hcGkuc2V0TWF0ZXJpYWwobWF0ZXJpYWwsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBtYXRlcmlhbC5zaGFkZWxlc3MgPSBmYWxzZTtcbiAgICAgIH0sIDUwMCk7XG5cbiAgICB9KTtcbiAgfVxuXG4gIHNlbmRBbGxNYXRlcmlhbHMoKSB7XG4gICAgdGhpcy5hcGkuZ2V0TWF0ZXJpYWxMaXN0KChlcnIsIG1hdGVyaWFsTGlzdCkgPT4ge1xuICAgICAgdGhpcy5zZW5kTWF0ZXJpYWxzLmVtaXQobWF0ZXJpYWxMaXN0KTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldE1hdGVyaWFsQ29sb3IobWF0ZXJpYWwsIGNvbG9yKSB7XG4gICAgY29uc3QgQWxiZWRvID0gbWF0ZXJpYWwuY2hhbm5lbHMuQWxiZWRvUEJSO1xuICAgIHRoaXMuc2V0Q2hhbm5lbENvbG9yKEFsYmVkbywgY29sb3IpO1xuICAgIGRlbGV0ZSBBbGJlZG8udGV4dHVyZTtcbiAgICB0aGlzLmFwaS5zZXRNYXRlcmlhbChtYXRlcmlhbCwgKHJlc3BvbnNlKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhgTUFURVJJQUwgQ09MT1IgU0VUIFRPICR7Y29sb3J9YCk7XG4gICAgfSk7XG4gIH1cblxuICBzZXRNYXRlcmlhbFJvdWdobmVzcyhtYXRlcmlhbCwgZmFjdG9yKSB7XG4gICAgY29uc3QgUm91Z2huZXNzID0gbWF0ZXJpYWwuY2hhbm5lbHMuUm91Z2huZXNzUEJSO1xuICAgIFJvdWdobmVzcy5mYWN0b3IgPSBmYWN0b3I7XG4gICAgdGhpcy5hcGkuc2V0TWF0ZXJpYWwobWF0ZXJpYWwsIChyZXNwb25zZSkgPT4ge1xuICAgICAgY29uc29sZS5sb2coYE1BVEVSSUFMIFJPVUdITkVTUyBTRVQgVE8gJHtmYWN0b3J9YCk7XG4gICAgfSk7XG4gIH1cblxuICBzZXRNYXRlcmlhbE1ldGFsbmVzcyhtYXRlcmlhbCwgZmFjdG9yKSB7XG4gICAgY29uc3QgTWV0YWxuZXNzID0gbWF0ZXJpYWwuY2hhbm5lbHMuTWV0YWxuZXNzUEJSO1xuICAgIE1ldGFsbmVzcy5mYWN0b3IgPSBmYWN0b3I7XG4gICAgdGhpcy5hcGkuc2V0TWF0ZXJpYWwobWF0ZXJpYWwsIChyZXNwb25zZSkgPT4ge1xuICAgICAgY29uc29sZS5sb2coYE1BVEVSSUFMIE1FVEFMTkVTUyBTRVQgVE8gJHtmYWN0b3J9YCk7XG4gICAgfSk7XG4gIH1cblxuICBzZXRNYXRlcmlhbEFsYmVkb1BCUlRleHR1cmUobWF0ZXJpYWwsIHRleHR1cmUpIHtcbiAgICBjb25zdCBBbGJlZG8gPSBtYXRlcmlhbC5jaGFubmVscy5BbGJlZG9QQlI7XG4gICAgQWxiZWRvLnRleHR1cmUgPSB0ZXh0dXJlO1xuICAgIGRlbGV0ZSBBbGJlZG8uY29sb3I7XG4gICAgdGhpcy5hcGkuc2V0TWF0ZXJpYWwobWF0ZXJpYWwsIChyZXNwb25zZSkgPT4ge1xuICAgICAgY29uc29sZS5sb2coYE1BVEVSSUFMIFRFWFRVUkUgU0VUIFRPICR7dGV4dHVyZX1gKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0Q2hhbm5lbENvbG9yKGNoYW5uZWwsIHJnYkFycmF5KSB7XG4gICAgY2hhbm5lbC5jb2xvciA9IHRoaXMuZGVjQ29sb3JTZXJ2aWNlLnJnYkFycmF5VG9MaW5lYXJBcnJheShyZ2JBcnJheSk7XG4gIH1cblxuICBwcml2YXRlIHVuaGlnSGxpZ2h0Q3VycmVudE1hdGVyaWFsKCkge1xuXG4gICAgY29uc3QgbGluZWFySGl0Z2hsaWdodENvbG9yID0gdGhpcy5kZWNDb2xvclNlcnZpY2UucmdiQXJyYXlUb0xpbmVhckFycmF5KEhJR0hMSUdIVF9DT0xPUik7XG5cbiAgICBjb25zdCBtYXRlcmlhbCA9IHRoaXMubWF0ZXJpYWxzLmZpbmQobWF0ID0+IG1hdC5uYW1lID09PSB0aGlzLmhpZ2hsaWdodGVkTWF0ZXJpYWwubmFtZSk7XG5cbiAgICBjb25zdCBtYXRlcmlhbENvbG9yID0gbWF0ZXJpYWwuY2hhbm5lbHMuQWxiZWRvUEJSLmNvbG9yO1xuXG4gICAgaWYgKEpTT04uc3RyaW5naWZ5KG1hdGVyaWFsQ29sb3IpID09PSBKU09OLnN0cmluZ2lmeShsaW5lYXJIaXRnaGxpZ2h0Q29sb3IpKSB7XG5cbiAgICAgIGNvbnN0IHRleHR1cmUgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMuaGlnaGxpZ2h0ZWRNYXRlcmlhbC5jaGFubmVscy5BbGJlZG9QQlIudGV4dHVyZSkpO1xuXG4gICAgICB0aGlzLnNldE1hdGVyaWFsQWxiZWRvUEJSVGV4dHVyZShtYXRlcmlhbCwgdGV4dHVyZSk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIHByaXZhdGUgaGlnaGxpZ2h0TWF0ZXJpYWwobWF0ZXJpYWwpIHtcblxuICAgIGNvbnN0IG1hdGVyaWFsQ29weSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkobWF0ZXJpYWwpKTtcblxuICAgIGlmICghdGhpcy5oaWdobGlnaHRlZE1hdGVyaWFsKSB7XG5cbiAgICAgIHRoaXMuaGlnaGxpZ2h0ZWRNYXRlcmlhbCA9IG1hdGVyaWFsQ29weTtcblxuICAgICAgdGhpcy5zZXRNYXRlcmlhbENvbG9yKG1hdGVyaWFsLCBISUdITElHSFRfQ09MT1IpO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgaWYgKHRoaXMuaGlnaGxpZ2h0ZWRNYXRlcmlhbC5uYW1lICE9PSBtYXRlcmlhbC5uYW1lKSB7XG5cbiAgICAgICAgdGhpcy51bmhpZ0hsaWdodEN1cnJlbnRNYXRlcmlhbCgpO1xuXG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0ZWRNYXRlcmlhbCA9IG1hdGVyaWFsQ29weTtcblxuICAgICAgICB0aGlzLnNldE1hdGVyaWFsQ29sb3IobWF0ZXJpYWwsIEhJR0hMSUdIVF9DT0xPUik7XG5cbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgdGhpcy51bmhpZ0hsaWdodEN1cnJlbnRNYXRlcmlhbCgpO1xuXG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0ZWRNYXRlcmlhbCA9IHVuZGVmaW5lZDtcblxuICAgICAgICB0aGlzLm1hdGVyaWFsVW5zZWxlY3RlZC5lbWl0KCk7XG5cbiAgICAgIH1cblxuICAgIH1cblxuICB9XG5cbn1cbiJdfQ==