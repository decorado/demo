/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { DecScriptLoaderService } from './../../services/script-loader/dec-script-loader.service';
import { DecColorService } from './../../services/color/dec-color.service';
/** @type {?} */
const HIGHLIGHT_COLOR = [255, 255, 0];
/** @type {?} */
const SKETCHFAB_SCRIPT_URL = 'https://static.sketchfab.com/api/sketchfab-viewer-1.0.0.js';
export class DecSketchfabViewComponent {
    /**
     * @param {?} decScriptLoaderService
     * @param {?} decColorService
     */
    constructor(decScriptLoaderService, decColorService) {
        this.decScriptLoaderService = decScriptLoaderService;
        this.decColorService = decColorService;
        this.materialSelected = new EventEmitter();
        this.materialUnselected = new EventEmitter();
        this.sendMaterials = new EventEmitter();
        this.loaded = new EventEmitter();
    }
    /**
     * @param {?} id
     * @return {?}
     */
    set sketchfabId(id) {
        if (id) {
            this._sketchfabId = id;
            this.startSketchfab(id);
        }
    }
    /**
     * @return {?}
     */
    get sketchfabId() {
        return this._sketchfabId;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set materialName(v) {
        if (v && this._materialName !== v) {
            this._materialName = v;
            /** @type {?} */
            const material = this.selectMaterialByName(v, true);
        }
    }
    /**
     * @return {?}
     */
    get materialName() {
        return this._materialName;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set material(v) {
        if (v && this.update) {
            this.updateMaterials(v);
        }
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set editMode(v) {
        if (v) {
            this.addClickEvent();
            this._editMode = v;
        }
    }
    /**
     * @return {?}
     */
    get editMode() {
        return this._editMode;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set getAllMaterials(v) {
        if (v) {
            this._getAllMaterials = v;
            this.sendAllMaterials();
        }
    }
    /**
     * @return {?}
     */
    get getAllMaterials() {
        return this._getAllMaterials;
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
    startSketchfab(id) {
        this.decScriptLoaderService.load(SKETCHFAB_SCRIPT_URL, 'Sketchfab')
            .then((Sketchfab) => {
            /** @type {?} */
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
    /**
     * @param {?} material
     * @return {?}
     */
    updateMaterials(material) {
        this.api.setMaterial(material, (resColor) => {
            console.log('--- SKETCHFAB  COLOR SET', resColor);
        });
    }
    /**
     * @return {?}
     */
    getMaterials() {
        return new Promise((resolve, reject) => {
            this.api.getMaterialList((err, materialList) => {
                this.materials = materialList;
                resolve(materialList);
            });
        });
    }
    /**
     * @param {?} name
     * @param {?=} emit
     * @return {?}
     */
    selectMaterialByName(name, emit = false) {
        /** @type {?} */
        const material = this.materials.find(m => m.name === name);
        if (this.highlightOnSelection) {
            this.highlightMaterial(material);
        }
        if (emit) {
            this.materialSelected.emit(material);
        }
        return material;
    }
    /**
     * @return {?}
     */
    addClickEvent() {
        if (this.api) {
            this.api.addEventListener('click', (e) => {
                this._materialName = e.material.name;
                this.selectEffect(e.material);
                this.selectMaterialByName(e.material.name, true);
            });
        }
    }
    /**
     * @param {?} material
     * @return {?}
     */
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
    /**
     * @return {?}
     */
    sendAllMaterials() {
        this.api.getMaterialList((err, materialList) => {
            this.sendMaterials.emit(materialList);
        });
    }
    /**
     * @param {?} material
     * @param {?} color
     * @return {?}
     */
    setMaterialColor(material, color) {
        /** @type {?} */
        const Albedo = material.channels.AlbedoPBR;
        this.setChannelColor(Albedo, color);
        delete Albedo.texture;
        this.api.setMaterial(material, (response) => {
            console.log(`MATERIAL COLOR SET TO ${color}`);
        });
    }
    /**
     * @param {?} material
     * @param {?} factor
     * @return {?}
     */
    setMaterialRoughness(material, factor) {
        /** @type {?} */
        const Roughness = material.channels.RoughnessPBR;
        Roughness.factor = factor;
        this.api.setMaterial(material, (response) => {
            console.log(`MATERIAL ROUGHNESS SET TO ${factor}`);
        });
    }
    /**
     * @param {?} material
     * @param {?} factor
     * @return {?}
     */
    setMaterialMetalness(material, factor) {
        /** @type {?} */
        const Metalness = material.channels.MetalnessPBR;
        Metalness.factor = factor;
        this.api.setMaterial(material, (response) => {
            console.log(`MATERIAL METALNESS SET TO ${factor}`);
        });
    }
    /**
     * @param {?} material
     * @param {?} texture
     * @return {?}
     */
    setMaterialAlbedoPBRTexture(material, texture) {
        /** @type {?} */
        const Albedo = material.channels.AlbedoPBR;
        Albedo.texture = texture;
        delete Albedo.color;
        this.api.setMaterial(material, (response) => {
            console.log(`MATERIAL TEXTURE SET TO ${texture}`);
        });
    }
    /**
     * @param {?} channel
     * @param {?} rgbArray
     * @return {?}
     */
    setChannelColor(channel, rgbArray) {
        channel.color = this.decColorService.rgbArrayToLinearArray(rgbArray);
    }
    /**
     * @return {?}
     */
    unhigHlightCurrentMaterial() {
        /** @type {?} */
        const linearHitghlightColor = this.decColorService.rgbArrayToLinearArray(HIGHLIGHT_COLOR);
        /** @type {?} */
        const material = this.materials.find(mat => mat.name === this.highlightedMaterial.name);
        /** @type {?} */
        const materialColor = material.channels.AlbedoPBR.color;
        if (JSON.stringify(materialColor) === JSON.stringify(linearHitghlightColor)) {
            /** @type {?} */
            const texture = JSON.parse(JSON.stringify(this.highlightedMaterial.channels.AlbedoPBR.texture));
            this.setMaterialAlbedoPBRTexture(material, texture);
        }
    }
    /**
     * @param {?} material
     * @return {?}
     */
    highlightMaterial(material) {
        /** @type {?} */
        const materialCopy = JSON.parse(JSON.stringify(material));
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
    }
}
DecSketchfabViewComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-sketchfab-view',
                template: `<iframe src=""
  #apiFrame
  id="api-frame"
  height="620"
  width="620"
  allowfullscreen
  mozallowfullscreen="true"
  webkitallowfullscreen="true"></iframe>
`,
                styles: [``]
            },] },
];
/** @nocollapse */
DecSketchfabViewComponent.ctorParameters = () => [
    { type: DecScriptLoaderService },
    { type: DecColorService }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLXNrZXRjaGZhYi12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9za2V0Y2hmYWItdmlldy9kZWMtc2tldGNoZmFiLXZpZXcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEcsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sMERBQTBELENBQUM7QUFDbEcsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBDQUEwQyxDQUFDOztBQUUzRSxNQUFNLGVBQWUsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7O0FBQ3RDLE1BQU0sb0JBQW9CLEdBQUcsNERBQTRELENBQUM7QUFlMUYsTUFBTTs7Ozs7SUFxRkosWUFDVSx3QkFDQTtRQURBLDJCQUFzQixHQUF0QixzQkFBc0I7UUFDdEIsb0JBQWUsR0FBZixlQUFlO2dDQXBCSSxJQUFJLFlBQVksRUFBRTtrQ0FFaEIsSUFBSSxZQUFZLEVBQUU7NkJBRXZCLElBQUksWUFBWSxFQUFFO3NCQUV6QixJQUFJLFlBQVksRUFBRTtLQWVoQzs7Ozs7SUFsRkwsSUFDSSxXQUFXLENBQUMsRUFBRTtRQUNoQixFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ1AsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUN6QjtLQUNGOzs7O0lBRUQsSUFBSSxXQUFXO1FBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7S0FDMUI7Ozs7O0lBRUQsSUFDSSxZQUFZLENBQUMsQ0FBQztRQUNo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UUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBRXBELElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO2dCQUVsQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsWUFBWSxDQUFDO2dCQUV4QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLGVBQWUsQ0FBQyxDQUFDO2FBRWxEO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRU4sSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7Z0JBRWxDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxTQUFTLENBQUM7Z0JBRXJDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUVoQztTQUVGOzs7O1lBM1JKLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixRQUFRLEVBQUU7Ozs7Ozs7O0NBUVg7Z0JBQ0MsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO2FBQ2I7Ozs7WUFsQlEsc0JBQXNCO1lBQ3RCLGVBQWU7OzswQkF3QnJCLEtBQUs7MkJBWUwsS0FBSzt1QkFZTCxLQUFLO3VCQU9MLEtBQUs7OEJBWUwsS0FBSzttQ0FZTCxLQUFLO3FCQUVMLEtBQUs7dUJBRUwsS0FBSzsrQkFFTCxNQUFNO2lDQUVOLE1BQU07NEJBRU4sTUFBTTtxQkFFTixNQUFNO3VCQVVOLFNBQVMsU0FBQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWNTY3JpcHRMb2FkZXJTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9zY3JpcHQtbG9hZGVyL2RlYy1zY3JpcHQtbG9hZGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGVjQ29sb3JTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9jb2xvci9kZWMtY29sb3Iuc2VydmljZSc7XG5cbmNvbnN0IEhJR0hMSUdIVF9DT0xPUiA9IFsyNTUsIDI1NSwgMF07XG5jb25zdCBTS0VUQ0hGQUJfU0NSSVBUX1VSTCA9ICdodHRwczovL3N0YXRpYy5za2V0Y2hmYWIuY29tL2FwaS9za2V0Y2hmYWItdmlld2VyLTEuMC4wLmpzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLXNrZXRjaGZhYi12aWV3JyxcbiAgdGVtcGxhdGU6IGA8aWZyYW1lIHNyYz1cIlwiXG4gICNhcGlGcmFtZVxuICBpZD1cImFwaS1mcmFtZVwiXG4gIGhlaWdodD1cIjYyMFwiXG4gIHdpZHRoPVwiNjIwXCJcbiAgYWxsb3dmdWxsc2NyZWVuXG4gIG1vemFsbG93ZnVsbHNjcmVlbj1cInRydWVcIlxuICB3ZWJraXRhbGxvd2Z1bGxzY3JlZW49XCJ0cnVlXCI+PC9pZnJhbWU+XG5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjU2tldGNoZmFiVmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgYXBpOiBhbnk7XG5cbiAgbWF0ZXJpYWxzO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBza2V0Y2hmYWJJZChpZCkge1xuICAgIGlmIChpZCkge1xuICAgICAgdGhpcy5fc2tldGNoZmFiSWQgPSBpZDtcbiAgICAgIHRoaXMuc3RhcnRTa2V0Y2hmYWIoaWQpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBza2V0Y2hmYWJJZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2tldGNoZmFiSWQ7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgbWF0ZXJpYWxOYW1lKHYpIHtcbiAgICBpZiAodiAmJiB0aGlzLl9tYXRlcmlhbE5hbWUgIT09IHYpIHtcbiAgICAgIHRoaXMuX21hdGVyaWFsTmFtZSA9IHY7XG4gICAgICBjb25zdCBtYXRlcmlhbCA9IHRoaXMuc2VsZWN0TWF0ZXJpYWxCeU5hbWUodiwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IG1hdGVyaWFsTmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fbWF0ZXJpYWxOYW1lO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IG1hdGVyaWFsICh2KSB7XG4gICAgaWYgKHYgJiYgdGhpcy51cGRhdGUpIHtcbiAgICAgIHRoaXMudXBkYXRlTWF0ZXJpYWxzKHYpO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBlZGl0TW9kZSh2KSB7XG4gICAgaWYgKHYpIHtcbiAgICAgIHRoaXMuYWRkQ2xpY2tFdmVudCgpO1xuICAgICAgdGhpcy5fZWRpdE1vZGUgPSB2O1xuICAgIH1cbiAgfVxuXG4gIGdldCBlZGl0TW9kZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fZWRpdE1vZGU7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgZ2V0QWxsTWF0ZXJpYWxzKHYpIHtcbiAgICBpZiAodikge1xuICAgICAgdGhpcy5fZ2V0QWxsTWF0ZXJpYWxzID0gdjtcbiAgICAgIHRoaXMuc2VuZEFsbE1hdGVyaWFscygpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBnZXRBbGxNYXRlcmlhbHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dldEFsbE1hdGVyaWFscztcbiAgfVxuXG4gIEBJbnB1dCgpIGhpZ2hsaWdodE9uU2VsZWN0aW9uOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHVwZGF0ZTogYW55O1xuXG4gIEBJbnB1dCgpIHRleHR1cmVzOiBhbnk7XG5cbiAgQE91dHB1dCgpIG1hdGVyaWFsU2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQE91dHB1dCgpIG1hdGVyaWFsVW5zZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAT3V0cHV0KCkgc2VuZE1hdGVyaWFscyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAT3V0cHV0KCkgbG9hZGVkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5cbiAgcHJpdmF0ZSBfc2tldGNoZmFiSWQ6IHN0cmluZztcbiAgcHJpdmF0ZSBfbWF0ZXJpYWxOYW1lOiBzdHJpbmc7XG4gIHByaXZhdGUgX2VkaXRNb2RlOiBib29sZWFuO1xuICBwcml2YXRlIF9nZXRBbGxNYXRlcmlhbHM6IGJvb2xlYW47XG4gIHByaXZhdGUgY2xpZW50O1xuICBwcml2YXRlIGhpZ2hsaWdodGVkTWF0ZXJpYWw7XG5cbiAgQFZpZXdDaGlsZCgnYXBpRnJhbWUnKSBhcGlGcmFtZTogRWxlbWVudFJlZjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGRlY1NjcmlwdExvYWRlclNlcnZpY2U6IERlY1NjcmlwdExvYWRlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBkZWNDb2xvclNlcnZpY2U6IERlY0NvbG9yU2VydmljZSxcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIHN0YXJ0U2tldGNoZmFiKGlkKSB7XG4gICAgdGhpcy5kZWNTY3JpcHRMb2FkZXJTZXJ2aWNlLmxvYWQoU0tFVENIRkFCX1NDUklQVF9VUkwsICdTa2V0Y2hmYWInKVxuICAgICAgLnRoZW4oKFNrZXRjaGZhYjogYW55KSA9PiB7XG4gICAgICAgIGNvbnN0IGlmcmFtZSA9IHRoaXMuYXBpRnJhbWUubmF0aXZlRWxlbWVudDtcbiAgICAgICAgdGhpcy5jbGllbnQgPSBuZXcgU2tldGNoZmFiKCcxLjAuMCcsIGlmcmFtZSk7XG4gICAgICAgIHRoaXMuY2xpZW50LmluaXQodGhpcy5za2V0Y2hmYWJJZCwge1xuICAgICAgICAgIHN1Y2Nlc3M6IChhcGkpID0+IHtcbiAgICAgICAgICAgIGFwaS5zdGFydCgpO1xuICAgICAgICAgICAgdGhpcy5hcGkgPSBhcGk7XG4gICAgICAgICAgICBhcGkuYWRkRXZlbnRMaXN0ZW5lcigndmlld2VycmVhZHknLCAoKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCctLS0gU0tFVENIRkFCICB2aWV3ZXJyZWFkeScpO1xuICAgICAgICAgICAgICB0aGlzLmdldE1hdGVyaWFscygpXG4gICAgICAgICAgICAgIC50aGVuKG1hdGVyaWFscyA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkZWQuZW1pdCgpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuZWRpdE1vZGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZENsaWNrRXZlbnQoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlTWF0ZXJpYWxzKG1hdGVyaWFsKSB7XG5cbiAgICB0aGlzLmFwaS5zZXRNYXRlcmlhbChtYXRlcmlhbCwgKHJlc0NvbG9yKSA9PiB7XG5cbiAgICAgIGNvbnNvbGUubG9nKCctLS0gU0tFVENIRkFCICBDT0xPUiBTRVQnLCByZXNDb2xvcik7XG5cbiAgICB9KTtcblxuICB9XG5cbiAgZ2V0TWF0ZXJpYWxzKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmFwaS5nZXRNYXRlcmlhbExpc3QoKGVyciwgbWF0ZXJpYWxMaXN0KSA9PiB7XG4gICAgICAgIHRoaXMubWF0ZXJpYWxzID0gbWF0ZXJpYWxMaXN0O1xuICAgICAgICByZXNvbHZlKG1hdGVyaWFsTGlzdCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG5cbiAgc2VsZWN0TWF0ZXJpYWxCeU5hbWUobmFtZSwgZW1pdCA9IGZhbHNlKSB7XG5cbiAgICBjb25zdCBtYXRlcmlhbCA9IHRoaXMubWF0ZXJpYWxzLmZpbmQobSA9PiBtLm5hbWUgPT09IG5hbWUpO1xuXG4gICAgaWYgKHRoaXMuaGlnaGxpZ2h0T25TZWxlY3Rpb24pIHtcblxuICAgICAgdGhpcy5oaWdobGlnaHRNYXRlcmlhbChtYXRlcmlhbCk7XG5cbiAgICB9XG5cblxuICAgIGlmIChlbWl0KSB7XG4gICAgICB0aGlzLm1hdGVyaWFsU2VsZWN0ZWQuZW1pdChtYXRlcmlhbCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hdGVyaWFsO1xuICB9XG5cbiAgYWRkQ2xpY2tFdmVudCgpIHtcbiAgICBpZiAodGhpcy5hcGkpIHtcbiAgICAgIHRoaXMuYXBpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgdGhpcy5fbWF0ZXJpYWxOYW1lID0gZS5tYXRlcmlhbC5uYW1lO1xuICAgICAgICB0aGlzLnNlbGVjdEVmZmVjdChlLm1hdGVyaWFsKTtcbiAgICAgICAgdGhpcy5zZWxlY3RNYXRlcmlhbEJ5TmFtZShlLm1hdGVyaWFsLm5hbWUsIHRydWUpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgc2VsZWN0RWZmZWN0KG1hdGVyaWFsKSB7XG4gICAgbWF0ZXJpYWwuc2hhZGVsZXNzID0gdHJ1ZTtcbiAgICBpZiAobWF0ZXJpYWwuY2hhbm5lbHMuTm9ybWFsTWFwLmZhY3RvciA9PT0gMSB8fCBtYXRlcmlhbC5jaGFubmVscy5Ob3JtYWxNYXAuZW5hYmxlKSB7XG4gICAgICBtYXRlcmlhbC5jaGFubmVscy5Ob3JtYWxNYXAuZmFjdG9yID0gMTtcbiAgICB9XG4gICAgdGhpcy5hcGkuc2V0TWF0ZXJpYWwobWF0ZXJpYWwsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBtYXRlcmlhbC5zaGFkZWxlc3MgPSBmYWxzZTtcbiAgICAgIH0sIDUwMCk7XG5cbiAgICB9KTtcbiAgfVxuXG4gIHNlbmRBbGxNYXRlcmlhbHMoKSB7XG4gICAgdGhpcy5hcGkuZ2V0TWF0ZXJpYWxMaXN0KChlcnIsIG1hdGVyaWFsTGlzdCkgPT4ge1xuICAgICAgdGhpcy5zZW5kTWF0ZXJpYWxzLmVtaXQobWF0ZXJpYWxMaXN0KTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldE1hdGVyaWFsQ29sb3IobWF0ZXJpYWwsIGNvbG9yKSB7XG4gICAgY29uc3QgQWxiZWRvID0gbWF0ZXJpYWwuY2hhbm5lbHMuQWxiZWRvUEJSO1xuICAgIHRoaXMuc2V0Q2hhbm5lbENvbG9yKEFsYmVkbywgY29sb3IpO1xuICAgIGRlbGV0ZSBBbGJlZG8udGV4dHVyZTtcbiAgICB0aGlzLmFwaS5zZXRNYXRlcmlhbChtYXRlcmlhbCwgKHJlc3BvbnNlKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhgTUFURVJJQUwgQ09MT1IgU0VUIFRPICR7Y29sb3J9YCk7XG4gICAgfSk7XG4gIH1cblxuICBzZXRNYXRlcmlhbFJvdWdobmVzcyhtYXRlcmlhbCwgZmFjdG9yKSB7XG4gICAgY29uc3QgUm91Z2huZXNzID0gbWF0ZXJpYWwuY2hhbm5lbHMuUm91Z2huZXNzUEJSO1xuICAgIFJvdWdobmVzcy5mYWN0b3IgPSBmYWN0b3I7XG4gICAgdGhpcy5hcGkuc2V0TWF0ZXJpYWwobWF0ZXJpYWwsIChyZXNwb25zZSkgPT4ge1xuICAgICAgY29uc29sZS5sb2coYE1BVEVSSUFMIFJPVUdITkVTUyBTRVQgVE8gJHtmYWN0b3J9YCk7XG4gICAgfSk7XG4gIH1cblxuICBzZXRNYXRlcmlhbE1ldGFsbmVzcyhtYXRlcmlhbCwgZmFjdG9yKSB7XG4gICAgY29uc3QgTWV0YWxuZXNzID0gbWF0ZXJpYWwuY2hhbm5lbHMuTWV0YWxuZXNzUEJSO1xuICAgIE1ldGFsbmVzcy5mYWN0b3IgPSBmYWN0b3I7XG4gICAgdGhpcy5hcGkuc2V0TWF0ZXJpYWwobWF0ZXJpYWwsIChyZXNwb25zZSkgPT4ge1xuICAgICAgY29uc29sZS5sb2coYE1BVEVSSUFMIE1FVEFMTkVTUyBTRVQgVE8gJHtmYWN0b3J9YCk7XG4gICAgfSk7XG4gIH1cblxuICBzZXRNYXRlcmlhbEFsYmVkb1BCUlRleHR1cmUobWF0ZXJpYWwsIHRleHR1cmUpIHtcbiAgICBjb25zdCBBbGJlZG8gPSBtYXRlcmlhbC5jaGFubmVscy5BbGJlZG9QQlI7XG4gICAgQWxiZWRvLnRleHR1cmUgPSB0ZXh0dXJlO1xuICAgIGRlbGV0ZSBBbGJlZG8uY29sb3I7XG4gICAgdGhpcy5hcGkuc2V0TWF0ZXJpYWwobWF0ZXJpYWwsIChyZXNwb25zZSkgPT4ge1xuICAgICAgY29uc29sZS5sb2coYE1BVEVSSUFMIFRFWFRVUkUgU0VUIFRPICR7dGV4dHVyZX1gKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0Q2hhbm5lbENvbG9yKGNoYW5uZWwsIHJnYkFycmF5KSB7XG4gICAgY2hhbm5lbC5jb2xvciA9IHRoaXMuZGVjQ29sb3JTZXJ2aWNlLnJnYkFycmF5VG9MaW5lYXJBcnJheShyZ2JBcnJheSk7XG4gIH1cblxuICBwcml2YXRlIHVuaGlnSGxpZ2h0Q3VycmVudE1hdGVyaWFsKCkge1xuXG4gICAgY29uc3QgbGluZWFySGl0Z2hsaWdodENvbG9yID0gdGhpcy5kZWNDb2xvclNlcnZpY2UucmdiQXJyYXlUb0xpbmVhckFycmF5KEhJR0hMSUdIVF9DT0xPUik7XG5cbiAgICBjb25zdCBtYXRlcmlhbCA9IHRoaXMubWF0ZXJpYWxzLmZpbmQobWF0ID0+IG1hdC5uYW1lID09PSB0aGlzLmhpZ2hsaWdodGVkTWF0ZXJpYWwubmFtZSk7XG5cbiAgICBjb25zdCBtYXRlcmlhbENvbG9yID0gbWF0ZXJpYWwuY2hhbm5lbHMuQWxiZWRvUEJSLmNvbG9yO1xuXG4gICAgaWYgKEpTT04uc3RyaW5naWZ5KG1hdGVyaWFsQ29sb3IpID09PSBKU09OLnN0cmluZ2lmeShsaW5lYXJIaXRnaGxpZ2h0Q29sb3IpKSB7XG5cbiAgICAgIGNvbnN0IHRleHR1cmUgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMuaGlnaGxpZ2h0ZWRNYXRlcmlhbC5jaGFubmVscy5BbGJlZG9QQlIudGV4dHVyZSkpO1xuXG4gICAgICB0aGlzLnNldE1hdGVyaWFsQWxiZWRvUEJSVGV4dHVyZShtYXRlcmlhbCwgdGV4dHVyZSk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIHByaXZhdGUgaGlnaGxpZ2h0TWF0ZXJpYWwobWF0ZXJpYWwpIHtcblxuICAgIGNvbnN0IG1hdGVyaWFsQ29weSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkobWF0ZXJpYWwpKTtcblxuICAgIGlmICghdGhpcy5oaWdobGlnaHRlZE1hdGVyaWFsKSB7XG5cbiAgICAgIHRoaXMuaGlnaGxpZ2h0ZWRNYXRlcmlhbCA9IG1hdGVyaWFsQ29weTtcblxuICAgICAgdGhpcy5zZXRNYXRlcmlhbENvbG9yKG1hdGVyaWFsLCBISUdITElHSFRfQ09MT1IpO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgaWYgKHRoaXMuaGlnaGxpZ2h0ZWRNYXRlcmlhbC5uYW1lICE9PSBtYXRlcmlhbC5uYW1lKSB7XG5cbiAgICAgICAgdGhpcy51bmhpZ0hsaWdodEN1cnJlbnRNYXRlcmlhbCgpO1xuXG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0ZWRNYXRlcmlhbCA9IG1hdGVyaWFsQ29weTtcblxuICAgICAgICB0aGlzLnNldE1hdGVyaWFsQ29sb3IobWF0ZXJpYWwsIEhJR0hMSUdIVF9DT0xPUik7XG5cbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgdGhpcy51bmhpZ0hsaWdodEN1cnJlbnRNYXRlcmlhbCgpO1xuXG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0ZWRNYXRlcmlhbCA9IHVuZGVmaW5lZDtcblxuICAgICAgICB0aGlzLm1hdGVyaWFsVW5zZWxlY3RlZC5lbWl0KCk7XG5cbiAgICAgIH1cblxuICAgIH1cblxuICB9XG5cbn1cbiJdfQ==