import { DecRenderCommentService } from './../dec-render-comment/dec-render-comment.service';
import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { DecZoomMarksComponent } from './../dec-zoom-marks/dec-zoom-marks.component';
import { DecMeshQaComponent } from '../dec-mesh-qa/dec-mesh-qa.component';

@Component({
  selector: 'dec-zoom-marks-gallery',
  templateUrl: './dec-zoom-marks-gallery.component.html',
  styleUrls: ['./dec-zoom-marks-gallery.component.scss']
})
export class DecZoomMarksGalleryComponent {

  meshQaSelected = false;

  imageIndex = 0;

  markedObj: any;

  @Input() jobType;

  @Input() isProfessional: boolean;

  @Input() qaModeActive: boolean;

  @Input() glbReadonly: boolean;

  isThereAnyMeshTag: boolean;

  @Input()
  set qualityAssurance(v: any) {
    this._qualityAssurance = v;
  }

  get qualityAssurance(): any {
    return this._qualityAssurance;
  }

  @Input()
  set markedObjs(v) {
    if (this._markedObjs !== v) {
      this._markedObjs = this.sortRenders(v);
      this.markedObj = this.markedObjs[0];

      this.bindRenderDescriptions();
      this.generateCacheForImages(v);
    }
  }

  get markedObjs() {
    return this._markedObjs;
  }

  @Input()
  set showTags(v) {
    this._showTags = v;
  }

  get showTags() {
    return this._showTags;
  }

  @Input()
  set reviewers(v: any) {
    this._reviewers = v;
  }

  get reviewers(): any {
    return this._reviewers;
  }

  @Input()
  set maxFile(v) {
    if (v) {
      this._maxFile = v;
    }
  }

  get maxFile() {
    return this._maxFile;
  }

  @Input()
  set glb(v: any) {
    if (this._glb !== v) {
      this._glb = v;

      if (!this._glb) {
        this.onSelectImage(0);
      } else if ((!this._markedObjs || !this._markedObjs.length)) {
        this.onSelectMesh();
      }
    }
  }

  get glb(): any {
    return this._glb;
  }

  @Output() deleteZoomArea = new EventEmitter();

  @Output() openZoomArea = new EventEmitter();

  @ViewChild('carouselGallery') carouselGallery;

  @ViewChild(DecMeshQaComponent) meshQa: DecMeshQaComponent;

  @ViewChild(DecZoomMarksComponent) zoomMarks: DecZoomMarksComponent;

  private _markedObjs: any;

  private _showTags: boolean;

  private _glb: any;

  private _qualityAssurance: any;

  private _reviewers: any;

  private _maxFile: any;

  constructor(
    private decRenderCommentService: DecRenderCommentService
  ) { }

  onSelectImage = (i: number) => {
    this.markedObj = this.markedObjs[i];
    this.imageIndex = i;
    this.meshQaSelected = false;
  }

  onSelectMesh = () => {
    this.markedObj = {};
    this.meshQaSelected = true;
  }

  getFormatedPositionAndScale() {
    return this.zoomMarks.getFormatedPositionAndScale();
  }

  addNewZoomArea(addNewZoomArea) {
    this.zoomMarks.addNewZoomArea(addNewZoomArea);
  }

  onOpenZoomArea($event) {
    this.openZoomArea.emit($event);
  }

  getImageIndex() {
    return this.imageIndex;
  }

  private sortRenders(markedObjs) {
    const rendersWithMark = markedObjs.filter(render => (render.tags && render.tags.length) || (render.zoomAreas && render.zoomAreas.length));
    const rendersWithoutMark = markedObjs.filter(render => (render.tags && !render.tags.length) && (render.zoomAreas && !render.zoomAreas.length));

    if (!rendersWithMark.length && !rendersWithoutMark.length) {
      return markedObjs;
    }

    return [...rendersWithMark, ...rendersWithoutMark];
  }

  deleteArea($event) {
    this.deleteZoomArea.emit($event);
  }

  updateTagStructure(tagStructure) {
    this.qualityAssurance.mesh = { ...tagStructure };
  }

  private bindRenderDescriptions(): void {
    this.markedObjs.forEach(item => {
      if (item.tags) {
        this.decRenderCommentService.getRenderDescriptionsByCode(item.tags);
      }

      if (item.zoomAreas) {
        item.zoomAreas.forEach(zoomArea => {
          this.decRenderCommentService.getRenderDescriptionsByCode(zoomArea.renderShot.tags);
        });
      }

    });
  }

  private generateCacheForImages(renders) {
    renders.forEach(mark => {
      const image = new Image();
      image.src = mark.file.fileUrl;
    });
  }

  openMaxFile() {
    window.open(this.maxFile, '_blank');
  }

  thereIsAMeshTag() {
    this.isThereAnyMeshTag = true;
  }
}
