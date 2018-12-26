import { HostListener, Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { DecZoomMarksGalleryComponent } from './../dec-zoom-marks-gallery/dec-zoom-marks-gallery.component';
import { MatDialog } from '@angular/material';
import { DecZoomAreaComponent } from './../dec-zoom-area/dec-zoom-area.component';
import { DecApiService } from '../../services/api/decora-api.service';

@Component({
  selector: 'dec-job-round',
  templateUrl: './dec-job-round.component.html',
  styleUrls: ['./dec-job-round.component.scss']
})
export class DecJobRoundComponent {

  @Input()
  public isProfessional: boolean;

  @Input()
  set config(v) {
    if (v) {
      this.round = v.round;
      this.roundNumber = v.roundNumber;
      this.jobType = v.jobType;
      if (v.skuFixId) {
        this.skuFix = this.populateSkuFix(v.skuFixId);
      }
      if (this.isProfessional && this.round.status !== 'DENIED') {
        this.showTags = false;
      }
      this.formatRenderFiles(v.round);
      this.populateReviewers(v.round);
    }
  }

  @Input()
  rounds: any[];

  get config() {
    return this._config;
  }

  showTags: boolean;

  @Input()
  set product(v) {
    if (v) {
      this._product = v;
      this.formatMarkedReference(v);
      this.formatMeasures(v);

      if (v.productIdColorVariationFather) {
        this.populateProductColorVariationFather(v.productIdColorVariationFather);
      }
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
    if (this.renderGallery) {
      this.renderGallery.meshQa.EnableEdit(!!v);
    }
  }

  get qaMode() {
    return this._qaMode;
  }

  public reviewers: any = {};

  @Output() setZoomAreaOpen = new EventEmitter();

  round;
  roundNumber;
  jobType;
  activeTab = 'reference';
  private _config;
  private _product;
  private _qaMode;

  reference;
  render;

  contentDone: boolean;
  skuFix;
  public productColorVariationFather: any;

  zoomAreaOpen = false;

  editZoomArea;

  markedReference;

  public glbReference: any;
  public qualityAssuranceReference: any;

  renderImages;

  note;

  measures;

  parentId;

  maxFile;

  referenceMax;

  @ViewChild('referenceGallery') referenceGallery: DecZoomMarksGalleryComponent;

  @ViewChild('renderGallery') renderGallery: DecZoomMarksGalleryComponent;

  @HostListener('window:keydown.control.shift')
  @HostListener('window:keydown.meta.shift')
  onKeyPress() {
    if (this.qaMode && !this.zoomAreaOpen && !this.renderGallery.meshQaSelected) {
      this.openZoomArea();
    }
  }

  constructor(private dialog: MatDialog, private decApiService: DecApiService) {
    this.showTags = true;
  }

  formatMarkedReference(v) {
    this.markedReference = v.referenceImages.map(x => {
      return {
        file: x.sysFile,
        tags: []
      };
    });
  }

  formatMarkedRenderSkuFix(skuFix: any) {
    this.markedReference = skuFix.requestAdjustment.map(x => {
      x.comments.forEach((comment, i) => {
        comment.reference = i + 1;
      });

      return {
        file: x.file,
        tags: x.comments
      };
    });
  }

  private formatMarkedRenderColorVariation(): void {
    this.markedReference = this.productColorVariationFather.renderedImages.map(file => ({ file, tags: [] }));
  }

  public async populateSkuFix(id: string | number) {
    const endpoint = `/skufixes/${id}`;
    this.skuFix = await this.decApiService.get(endpoint).toPromise();
    this.contentDone = true;
  }

  public async populateProductColorVariationFather(productIdColorVariationFather: string) {
    const endpoint = `/legacy/product/${productIdColorVariationFather}`;
    this.productColorVariationFather = await this.decApiService.get(endpoint).toPromise();
    this.contentDone = true;
  }

  private populateReviewers(round: any) {
    const { qualityAssurance } = round;
    const { lastCheck } = qualityAssurance;

    this.reviewers = {
      qualityAgent: { ...qualityAssurance.qualityAgent, date: qualityAssurance.start },
      lastChecker: lastCheck ? { ...lastCheck.reviewer, date: lastCheck.start } : undefined
    };
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
    this.measures.modelCubeX = this.round.modelCubeX;
    this.measures.modelCubeY = this.round.modelCubeY;
    this.measures.modelCubeZ = this.round.modelCubeZ;
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
      this.openZoomAreaModal();
    }
  }

  openEditZoomArea($event, cantEdit = false) {
    this.editZoomArea = $event;
    this.reference = JSON.parse(JSON.stringify($event.referenceShot));
    this.note = $event.note;
    this.render = JSON.parse(JSON.stringify($event.renderShot));
    this.parentId = this.renderGallery.getImageIndex();
    this.parentId++;
    this.zoomAreaOpen = true;

    this.openZoomAreaModal(cantEdit);
  }

  private openZoomAreaModal(cantEdit = false) {
    const dialogRef = this.dialog.open(DecZoomAreaComponent, { height: '90vh', width: '71vw' });
    dialogRef.componentInstance.reference = this.reference;
    dialogRef.componentInstance.editMode = this.editZoomArea;
    dialogRef.componentInstance.note = this.note;
    dialogRef.componentInstance.render = this.render;
    dialogRef.componentInstance.parentId = this.parentId;
    dialogRef.componentInstance.qaMode = cantEdit ? false : this.qaMode;
    dialogRef.componentInstance.jobType = this.jobType;

    dialogRef.componentInstance.save.subscribe($event => {
      this.onSaveZoomArea($event);
      dialogRef.close();
    });

    dialogRef.componentInstance.cancel.subscribe($event => {
      this.onCancel();
      dialogRef.close();
    });

    dialogRef.afterClosed().subscribe($event => {
      this.onCancel();
    });

    dialogRef.componentInstance.delete.subscribe($event => {
      this.deleteZoomAreaByParentId($event);
      dialogRef.close();
    });
  }

  onSaveZoomArea($event) {
    if ($event.renderShot.tags.length) {
      if (this.editZoomArea) {
        this.editZoomArea.referenceShot = $event.referenceShot;
        this.editZoomArea.renderShot = $event.renderShot;
        this.editZoomArea.note = $event.note;
        this.renderGallery.addNewZoomArea(JSON.parse(JSON.stringify(this.editZoomArea)));
        this.zoomAreaOpen = false;
        this.editZoomArea = null;
        this.renewGallery();
        return;
      }
      this.renderGallery.addNewZoomArea($event);
      this.zoomAreaOpen = false;
      this.renewGallery();
    } else if (this.editZoomArea) {
      this.deleteZoomAreaByParentId(this.parentId - 1);
    } else {
      this.zoomAreaOpen = false;
      this.renewGallery();
    }
  }

  deleteZoomAreaByParentId(zoomArea) {
    const area = this.editZoomArea ? this.editZoomArea : zoomArea;
    this.renderGallery.zoomMarks.deleteMark(area);
    this.onCancel();
    this.renewGallery();
  }

  renewGallery() {
    this.referenceGallery.zoomMarks.renewZoom();
    this.renderGallery.zoomMarks.renewZoom();
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

  setView = ($event) => {
    switch ($event.value) {
      case 'render':
        if (this.skuFix) {
          this.formatMarkedRenderSkuFix(this.skuFix);
        } else if (this.productColorVariationFather) {
          this.formatMarkedRenderColorVariation();
        }
        this.referenceMax = 'remove';
        this.glbReference = null;
        this.qualityAssuranceReference = null;

        break;
      case 'reference':
        this.formatMarkedReference(this.product);
        this.referenceMax = 'remove';
        this.glbReference = null;
        this.qualityAssuranceReference = null;
        break;
      case 'round1':
        this.markedReference = this.formatRenderReference(this.rounds[0]);
        this.referenceMax = this.rounds[0].max.fileUrl;
        this.glbReference = this.rounds[0].glb;
        this.qualityAssuranceReference = this.rounds[0].qualityAssurance;
        break;
      case 'round2':
        this.markedReference = this.formatRenderReference(this.rounds[1]);
        this.referenceMax = this.rounds[1].max.fileUrl;
        this.glbReference = this.rounds[1].glb;
        this.qualityAssuranceReference = this.rounds[1].qualityAssurance;
        break;
      case 'round3':
        this.markedReference = this.formatRenderReference(this.rounds[2]);
        this.referenceMax = this.rounds[2].max.fileUrl;
        this.glbReference = this.rounds[2].glb;
        this.qualityAssuranceReference = this.rounds[2].qualityAssurance;
        break;
      case 'round4':
        this.markedReference = this.formatRenderReference(this.rounds[3]);
        this.referenceMax = this.rounds[3].max.fileUrl;
        this.glbReference = this.rounds[3].glb;
        this.qualityAssuranceReference = this.rounds[3].qualityAssurance;
        break;
    }
    this.activeTab = $event.value;
  }

  onCancel() {
    this.note = null;
    this.editZoomArea = null;
    this.zoomAreaOpen = false;
  }

}
