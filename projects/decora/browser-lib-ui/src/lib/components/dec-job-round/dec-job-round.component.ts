import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { DecZoomMarksGalleryComponent } from './../dec-zoom-marks-gallery/dec-zoom-marks-gallery.component';

@Component({
  selector: 'dec-job-round',
  templateUrl: './dec-job-round.component.html',
  styleUrls: ['./dec-job-round.component.scss']
})
export class DecJobRoundComponent {

  @Input()
  set config(v) {
    if (v) {
      this.round = v.round;
      this.roundNumber = v.roundNumber;
      this.formatRenderFiles(v.round);
    }
  }

  @Input()
  rounds: any[];

  get config() {
    return this._config;
  }

  @Input()
  set product(v) {
    if (v) {
      this._product = v;
      this.formatMarkedReference(v);
      this.formatMeasures(v);
    }
  }

  get product() {
    return this._product;
  }

  @Input()
  set qaMode(v) {
    this._qaMode = v;
    if (!v) {
      this.zoomAreaOpen = false;
    }
  }

  get qaMode() {
    return this._qaMode;
  }

  @Output() setZoomAreaOpen = new EventEmitter();

  round;
  roundNumber;
  private _config;
  private _product;
  private _qaMode;

  reference;
  render;

  zoomAreaOpen = false;

  editZoomArea;

  markedReference;

  renderImages;

  note;

  measures;

  parentId;

  @ViewChild('referenceGallery') referenceGallery: DecZoomMarksGalleryComponent;

  @ViewChild('renderGallery') renderGallery: DecZoomMarksGalleryComponent;

  constructor() { }

  formatMarkedReference(v) {
    this.markedReference = v.referenceImages.map(x => {
      return {
        file: x.sysFile,
        tags: []
      };
    });
  }

  formatRenderFiles(v) {
    if (v.qualityAssurance.renders && v.qualityAssurance.renders.length) {
      v.qualityAssurance.renders = v.qualityAssurance.renders.map(x => {
        return {
          file: x.file,
          tags: x.tags || [],
          zoomAreas: x.zoomAreas || []
        };
      });
    }
    this.renderImages = v.qualityAssurance.renders;
  }

  formatMeasures(product) {
    this.measures = {};
    this.measures.referenceCubeX = product.referenceCubeX;
    this.measures.referenceCubeY = product.referenceCubeY;
    this.measures.referenceCubeZ = product.referenceCubeZ;
    this.measures.modelCubeX = product.modelCubeX;
    this.measures.modelCubeY = product.modelCubeY;
    this.measures.modelCubeZ = product.modelCubeZ;
  }

  openZoomArea() {
    if (this.qaMode) {
      let ref: any = {};
      let render: any = {};
      ref = this.referenceGallery.getFormatedPositionAndScale();
      ref.tags = [];
      this.reference = ref;
      render = this.renderGallery.getFormatedPositionAndScale();
      render.tags = [];
      this.render = render;
      this.parentId = this.renderGallery.getImageIndex();
      this.parentId++;
      this.zoomAreaOpen = true;
      this.setZoomAreaOpen.emit(this.zoomAreaOpen);
    }
  }

  onSaveZoomArea($event) {
    if (this.editZoomArea) {
      this.editZoomArea.referenceShot = $event.referenceShot;
      this.editZoomArea.renderShot = $event.renderShot;
      this.renderGallery.addNewZoomArea(JSON.parse(JSON.stringify(this.editZoomArea)));
      this.zoomAreaOpen = false;
      this.setZoomAreaOpen.emit(this.zoomAreaOpen);
      this.editZoomArea = null;
      return;
    }
    this.renderGallery.addNewZoomArea($event);
    this.zoomAreaOpen = false;
    this.setZoomAreaOpen.emit(this.zoomAreaOpen);
  }

  openEditZoomArea($event) {
    this.editZoomArea = $event;
    this.reference = $event.referenceShot;
    this.note = $event.note;
    this.render = $event.renderShot;
    this.parentId = this.renderGallery.getImageIndex();
    this.parentId++;
    this.zoomAreaOpen = true;
    this.setZoomAreaOpen.emit(this.zoomAreaOpen);
  }

  formatRenderReference(round) {
    return round.qualityAssurance.renders.map(x => {
      return {
        file: x.file,
        tags: x.tags || [],
        zoomAreas: x.zoomAreas || []
      };
    });
  }

  setView($event) {
    switch ($event.value) {
      case 'reference':
        this.formatMarkedReference(this.product);
        break;
      case 'round1':
        this.markedReference = this.formatRenderReference(this.rounds[0]);
        break;
      case 'round2':
        this.markedReference = this.formatRenderReference(this.rounds[1]);
        break;
    }
  }

  onCancel() {
    this.editZoomArea = null;
    this.zoomAreaOpen = false;
    this.setZoomAreaOpen.emit(this.zoomAreaOpen);
  }

  getClass() {
    if (this.zoomAreaOpen) {
      return 'fadeClass';
    }
    return '';
  }
}
