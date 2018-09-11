/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { DecScriptLoaderService } from './../../services/script-loader/dec-script-loader.service';
const /** @type {?} */ SKETCHFAB_SCRIPT_URL = 'https://static.sketchfab.com/api/sketchfab-viewer-1.0.0.js';
export class DecSketchfabViewComponent {
    /**
     * @param {?} decScriptLoaderService
     */
    constructor(decScriptLoaderService) {
        this.decScriptLoaderService = decScriptLoaderService;
        this.materialSelected = new EventEmitter();
        this.sendMaterials = new EventEmitter();
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
    set configs(v) {
        if (v) {
            this._configs = v;
        }
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set materialName(v) {
        if (v && this._materialName !== v) {
            this._materialName = v;
            const /** @type {?} */ material = this.selectMaterialByName(v, true);
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
            const /** @type {?} */ iframe = this.apiFrame.nativeElement;
            const /** @type {?} */ client = new Sketchfab('1.0.0', iframe);
            client.init(this.sketchfabId, {
                success: (api) => {
                    api.start();
                    this.api = api;
                    api.addEventListener('viewerready', () => {
                        this.getMaterials();
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
        this.api.setMaterial(material, () => {
            // console.log(`Material ${material.name} Updated`);
        });
    }
    /**
     * @return {?}
     */
    getMaterials() {
        this.api.getMaterialList((err, materialList) => {
            this.materials = materialList;
        });
    }
    /**
     * @param {?} name
     * @param {?} emit
     * @return {?}
     */
    selectMaterialByName(name, emit) {
        const /** @type {?} */ material = this.materials.find(m => m.name === name);
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
            console.log('add event listener');
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
        this.api.setMaterial(material, () => {
            setTimeout(() => {
                material.shadeless = false;
                this.api.setMaterial(material, () => {
                });
            }, 200);
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
  webkitallowfullscreen="true"></iframe>`,
                styles: [``]
            },] },
];
/** @nocollapse */
DecSketchfabViewComponent.ctorParameters = () => [
    { type: DecScriptLoaderService }
];
DecSketchfabViewComponent.propDecorators = {
    sketchfabId: [{ type: Input }],
    configs: [{ type: Input }],
    materialName: [{ type: Input }],
    material: [{ type: Input }],
    editMode: [{ type: Input }],
    getAllMaterials: [{ type: Input }],
    update: [{ type: Input }],
    textures: [{ type: Input }],
    materialSelected: [{ type: Output }],
    sendMaterials: [{ type: Output }],
    apiFrame: [{ type: ViewChild, args: ['apiFrame',] }]
};
function DecSketchfabViewComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    DecSketchfabViewComponent.prototype.update;
    /** @type {?} */
    DecSketchfabViewComponent.prototype.textures;
    /** @type {?} */
    DecSketchfabViewComponent.prototype.materialSelected;
    /** @type {?} */
    DecSketchfabViewComponent.prototype.sendMaterials;
    /** @type {?} */
    DecSketchfabViewComponent.prototype._sketchfabId;
    /** @type {?} */
    DecSketchfabViewComponent.prototype._configs;
    /** @type {?} */
    DecSketchfabViewComponent.prototype._materialName;
    /** @type {?} */
    DecSketchfabViewComponent.prototype._editMode;
    /** @type {?} */
    DecSketchfabViewComponent.prototype._getAllMaterials;
    /** @type {?} */
    DecSketchfabViewComponent.prototype.channels;
    /** @type {?} */
    DecSketchfabViewComponent.prototype.api;
    /** @type {?} */
    DecSketchfabViewComponent.prototype.materials;
    /** @type {?} */
    DecSketchfabViewComponent.prototype.apiFrame;
    /** @type {?} */
    DecSketchfabViewComponent.prototype.decScriptLoaderService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLXNrZXRjaGZhYi12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9za2V0Y2hmYWItdmlldy9kZWMtc2tldGNoZmFiLXZpZXcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEcsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sMERBQTBELENBQUM7QUFFbEcsdUJBQU0sb0JBQW9CLEdBQUcsNERBQTRELENBQUM7QUFjMUYsTUFBTTs7OztJQW1GSixZQUFvQixzQkFBOEM7UUFBOUMsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF3QjtnQ0FmckMsSUFBSSxZQUFZLEVBQUU7NkJBRXJCLElBQUksWUFBWSxFQUFFO0tBYTJCOzs7OztJQWpGdkUsSUFDSSxXQUFXLENBQUMsRUFBRTtRQUNoQixFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ1AsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUN6QjtLQUNGOzs7O0lBRUQsSUFBSSxXQUFXO1FBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7S0FDMUI7Ozs7O0lBRUQsSUFDSSxPQUFPLENBQUMsQ0FBQztRQUNYLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztTQUNuQjtLQUNGOzs7OztJQUVELElBQ0ksWUFBWSxDQUFDLENBQUM7UUFDaEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxhQUFhLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztZQUN2Qix1QkFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNyRDtLQUNGOzs7O0lBRUQsSUFBSSxZQUFZO1FBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7S0FDM0I7Ozs7O0lBRUQsSUFDSSxRQUFRLENBQUUsQ0FBQztRQUNiLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNyQixJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3pCO0tBQ0Y7Ozs7O0lBRUQsSUFDSSxRQUFRLENBQUMsQ0FBQztRQUNaLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7U0FDcEI7S0FDRjs7OztJQUVELElBQUksUUFBUTtRQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0tBQ3ZCOzs7OztJQUVELElBQ0ksZUFBZSxDQUFDLENBQUM7UUFDbkIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7U0FDekI7S0FDRjs7OztJQUVELElBQUksZUFBZTtRQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDO0tBQzlCOzs7O0lBdUJELFFBQVE7S0FDUDs7Ozs7SUFFRCxjQUFjLENBQUMsRUFBRTtRQUNmLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsV0FBVyxDQUFDO2FBQ2hFLElBQUksQ0FBQyxDQUFDLFNBQWMsRUFBRSxFQUFFO1lBQ3ZCLHVCQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQztZQUMzQyx1QkFBTSxNQUFNLEdBQUcsSUFBSSxTQUFTLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQzlDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDNUIsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7b0JBQ2YsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUNaLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO29CQUNmLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsR0FBRyxFQUFFO3dCQUN2QyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7d0JBQ3BCLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDOzRCQUNqQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7eUJBQ3RCO3FCQUNGLENBQUMsQ0FBQztpQkFDSjthQUNGLENBQUMsQ0FBQztTQUNKLENBQUMsQ0FBQztLQUNOOzs7OztJQUVELGVBQWUsQ0FBQyxRQUFRO1FBQ3RCLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7O1NBRW5DLENBQUMsQ0FBQztLQUNKOzs7O0lBRUQsWUFBWTtRQUNWLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUMsR0FBRyxFQUFFLFlBQVksRUFBRSxFQUFFO1lBQzdDLElBQUksQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDO1NBQy9CLENBQUMsQ0FBQTtLQUNIOzs7Ozs7SUFHRCxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsSUFBSTtRQUM3Qix1QkFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDO1FBQzNELEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDUixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3RDO1FBQ0QsTUFBTSxDQUFDLFFBQVEsQ0FBQztLQUNqQjs7OztJQUVELGFBQWE7UUFDWCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUN2QyxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO2dCQUNyQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDOUIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ2xELENBQUMsQ0FBQztTQUNKO0tBQ0Y7Ozs7O0lBRUQsWUFBWSxDQUFDLFFBQVE7UUFDbkIsUUFBUSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDMUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRTtZQUNsQyxVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNkLFFBQVEsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO2dCQUMzQixJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFO2lCQUNuQyxDQUFDLENBQUM7YUFDSixFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ1QsQ0FBQyxDQUFDO0tBQ0o7Ozs7SUFFRCxnQkFBZ0I7UUFDZCxJQUFJLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxZQUFZLEVBQUUsRUFBRTtZQUM3QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUN2QyxDQUFDLENBQUE7S0FDSDs7O1lBdktGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixRQUFRLEVBQUU7Ozs7Ozs7eUNBTzZCO2dCQUN2QyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7YUFDYjs7OztZQWZRLHNCQUFzQjs7OzBCQWtCNUIsS0FBSztzQkFZTCxLQUFLOzJCQU9MLEtBQUs7dUJBWUwsS0FBSzt1QkFPTCxLQUFLOzhCQVlMLEtBQUs7cUJBWUwsS0FBSzt1QkFFTCxLQUFLOytCQUVMLE1BQU07NEJBRU4sTUFBTTt1QkFXTixTQUFTLFNBQUMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVjU2NyaXB0TG9hZGVyU2VydmljZSB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvc2NyaXB0LWxvYWRlci9kZWMtc2NyaXB0LWxvYWRlci5zZXJ2aWNlJztcblxuY29uc3QgU0tFVENIRkFCX1NDUklQVF9VUkwgPSAnaHR0cHM6Ly9zdGF0aWMuc2tldGNoZmFiLmNvbS9hcGkvc2tldGNoZmFiLXZpZXdlci0xLjAuMC5qcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1za2V0Y2hmYWItdmlldycsXG4gIHRlbXBsYXRlOiBgPGlmcmFtZSBzcmM9XCJcIiBcbiAgI2FwaUZyYW1lIFxuICBpZD1cImFwaS1mcmFtZVwiIFxuICBoZWlnaHQ9XCI2MjBcIlxuICB3aWR0aD1cIjYyMFwiIFxuICBhbGxvd2Z1bGxzY3JlZW4gXG4gIG1vemFsbG93ZnVsbHNjcmVlbj1cInRydWVcIiBcbiAgd2Via2l0YWxsb3dmdWxsc2NyZWVuPVwidHJ1ZVwiPjwvaWZyYW1lPmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNTa2V0Y2hmYWJWaWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKVxuICBzZXQgc2tldGNoZmFiSWQoaWQpIHtcbiAgICBpZiAoaWQpIHtcbiAgICAgIHRoaXMuX3NrZXRjaGZhYklkID0gaWQ7XG4gICAgICB0aGlzLnN0YXJ0U2tldGNoZmFiKGlkKTtcbiAgICB9XG4gIH1cblxuICBnZXQgc2tldGNoZmFiSWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NrZXRjaGZhYklkO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IGNvbmZpZ3Modikge1xuICAgIGlmICh2KSB7XG4gICAgICB0aGlzLl9jb25maWdzID0gdjtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgbWF0ZXJpYWxOYW1lKHYpIHtcbiAgICBpZiAodiAmJiB0aGlzLl9tYXRlcmlhbE5hbWUgIT09IHYpIHtcbiAgICAgIHRoaXMuX21hdGVyaWFsTmFtZSA9IHY7XG4gICAgICBjb25zdCBtYXRlcmlhbCA9IHRoaXMuc2VsZWN0TWF0ZXJpYWxCeU5hbWUodiwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IG1hdGVyaWFsTmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fbWF0ZXJpYWxOYW1lO1xuICB9XG5cbiAgQElucHV0KCkgXG4gIHNldCBtYXRlcmlhbCAodil7XG4gICAgaWYgKHYgJiYgdGhpcy51cGRhdGUpIHtcbiAgICAgIHRoaXMudXBkYXRlTWF0ZXJpYWxzKHYpO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBlZGl0TW9kZSh2KSB7XG4gICAgaWYgKHYpIHtcbiAgICAgIHRoaXMuYWRkQ2xpY2tFdmVudCgpO1xuICAgICAgdGhpcy5fZWRpdE1vZGUgPSB2O1xuICAgIH1cbiAgfSBcblxuICBnZXQgZWRpdE1vZGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2VkaXRNb2RlO1xuICB9XG5cbiAgQElucHV0KCkgXG4gIHNldCBnZXRBbGxNYXRlcmlhbHModikge1xuICAgIGlmICh2KSB7XG4gICAgICB0aGlzLl9nZXRBbGxNYXRlcmlhbHMgPSB2O1xuICAgICAgdGhpcy5zZW5kQWxsTWF0ZXJpYWxzKCk7XG4gICAgfVxuICB9XG4gIFxuICBnZXQgZ2V0QWxsTWF0ZXJpYWxzKCkge1xuICAgIHJldHVybiB0aGlzLl9nZXRBbGxNYXRlcmlhbHM7XG4gIH1cblxuICBASW5wdXQoKSB1cGRhdGU6IGFueTtcblxuICBASW5wdXQoKSB0ZXh0dXJlczogYW55O1xuXG4gIEBPdXRwdXQoKSBtYXRlcmlhbFNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBPdXRwdXQoKSBzZW5kTWF0ZXJpYWxzID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHByaXZhdGUgX3NrZXRjaGZhYklkOiBzdHJpbmc7XG4gIHByaXZhdGUgX2NvbmZpZ3M6IGFueTtcbiAgcHJpdmF0ZSBfbWF0ZXJpYWxOYW1lOiBzdHJpbmc7XG4gIHByaXZhdGUgX2VkaXRNb2RlOiBib29sZWFuO1xuICBwcml2YXRlIF9nZXRBbGxNYXRlcmlhbHM6IGJvb2xlYW47XG4gIHByaXZhdGUgY2hhbm5lbHM6IGFueTtcbiAgcHJpdmF0ZSBhcGk6IGFueTtcbiAgcHJpdmF0ZSBtYXRlcmlhbHM7XG5cbiAgQFZpZXdDaGlsZCgnYXBpRnJhbWUnKSBhcGlGcmFtZTogRWxlbWVudFJlZjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRlY1NjcmlwdExvYWRlclNlcnZpY2U6IERlY1NjcmlwdExvYWRlclNlcnZpY2UpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgc3RhcnRTa2V0Y2hmYWIoaWQpIHtcbiAgICB0aGlzLmRlY1NjcmlwdExvYWRlclNlcnZpY2UubG9hZChTS0VUQ0hGQUJfU0NSSVBUX1VSTCwgJ1NrZXRjaGZhYicpXG4gICAgICAudGhlbigoU2tldGNoZmFiOiBhbnkpID0+IHtcbiAgICAgICAgY29uc3QgaWZyYW1lID0gdGhpcy5hcGlGcmFtZS5uYXRpdmVFbGVtZW50O1xuICAgICAgICBjb25zdCBjbGllbnQgPSBuZXcgU2tldGNoZmFiKCcxLjAuMCcsIGlmcmFtZSk7XG4gICAgICAgIGNsaWVudC5pbml0KHRoaXMuc2tldGNoZmFiSWQsIHtcbiAgICAgICAgICBzdWNjZXNzOiAoYXBpKSA9PiB7XG4gICAgICAgICAgICBhcGkuc3RhcnQoKTtcbiAgICAgICAgICAgIHRoaXMuYXBpID0gYXBpO1xuICAgICAgICAgICAgYXBpLmFkZEV2ZW50TGlzdGVuZXIoJ3ZpZXdlcnJlYWR5JywgKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmdldE1hdGVyaWFscygpO1xuICAgICAgICAgICAgICBpZih0aGlzLmVkaXRNb2RlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRDbGlja0V2ZW50KCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZU1hdGVyaWFscyhtYXRlcmlhbCkge1xuICAgIHRoaXMuYXBpLnNldE1hdGVyaWFsKG1hdGVyaWFsLCAoKSA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyhgTWF0ZXJpYWwgJHttYXRlcmlhbC5uYW1lfSBVcGRhdGVkYCk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRNYXRlcmlhbHMoKSB7XG4gICAgdGhpcy5hcGkuZ2V0TWF0ZXJpYWxMaXN0KChlcnIsIG1hdGVyaWFsTGlzdCkgPT4ge1xuICAgICAgdGhpcy5tYXRlcmlhbHMgPSBtYXRlcmlhbExpc3Q7XG4gICAgfSlcbiAgfVxuXG5cbiAgc2VsZWN0TWF0ZXJpYWxCeU5hbWUobmFtZSwgZW1pdCkge1xuICAgIGNvbnN0IG1hdGVyaWFsID0gdGhpcy5tYXRlcmlhbHMuZmluZChtID0+IG0ubmFtZSA9PT0gbmFtZSk7XG4gICAgaWYoZW1pdCkge1xuICAgICAgdGhpcy5tYXRlcmlhbFNlbGVjdGVkLmVtaXQobWF0ZXJpYWwpO1xuICAgIH1cbiAgICByZXR1cm4gbWF0ZXJpYWw7XG4gIH1cblxuICBhZGRDbGlja0V2ZW50KCkge1xuICAgIGlmICh0aGlzLmFwaSkge1xuICAgICAgY29uc29sZS5sb2coJ2FkZCBldmVudCBsaXN0ZW5lcicpO1xuICAgICAgdGhpcy5hcGkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICB0aGlzLl9tYXRlcmlhbE5hbWUgPSBlLm1hdGVyaWFsLm5hbWU7XG4gICAgICAgIHRoaXMuc2VsZWN0RWZmZWN0KGUubWF0ZXJpYWwpO1xuICAgICAgICB0aGlzLnNlbGVjdE1hdGVyaWFsQnlOYW1lKGUubWF0ZXJpYWwubmFtZSwgdHJ1ZSk7XG4gICAgICB9KTsgXG4gICAgfVxuICB9XG5cbiAgc2VsZWN0RWZmZWN0KG1hdGVyaWFsKSB7XG4gICAgbWF0ZXJpYWwuc2hhZGVsZXNzID0gdHJ1ZTtcbiAgICB0aGlzLmFwaS5zZXRNYXRlcmlhbChtYXRlcmlhbCwgKCkgPT4ge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIG1hdGVyaWFsLnNoYWRlbGVzcyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmFwaS5zZXRNYXRlcmlhbChtYXRlcmlhbCwgKCkgPT4ge1xuICAgICAgICB9KTtcbiAgICAgIH0sIDIwMCk7XG4gICAgfSk7XG4gIH1cblxuICBzZW5kQWxsTWF0ZXJpYWxzKCkge1xuICAgIHRoaXMuYXBpLmdldE1hdGVyaWFsTGlzdCgoZXJyLCBtYXRlcmlhbExpc3QpID0+IHtcbiAgICAgIHRoaXMuc2VuZE1hdGVyaWFscy5lbWl0KG1hdGVyaWFsTGlzdCk7XG4gICAgfSlcbiAgfVxufVxuIl19