import { Component, Input, ViewChild } from '@angular/core';
import { DecApiService } from '../../services/api/decora-api.service';
import { MatDialog } from '@angular/material';
import { DecZoomAreaComponent } from '../dec-zoom-area/dec-zoom-area.component';
import { DecZoomMarksGalleryComponent } from '../dec-zoom-marks-gallery/dec-zoom-marks-gallery.component';

@Component({
  selector: 'dec-product-source3dmodel-fix',
  templateUrl: './dec-product-source3dmodel-fix.component.html',
  styleUrls: ['./dec-product-source3dmodel-fix.component.scss']
})
export class DecProductSource3dmodelFixComponent {

  public refType: string;

  @Input()
  public get job(): any {
    return this._job;
  }
  public set job(v: any) {
    this._job = v;
    this.populateSkuFix(v.skuFixId);
  }
  private _job: any;

  @Input()
  public get product(): any {
    return this._product;
  }
  public set product(v: any) {
    this._product = v;
  }
  private _product: any;

  public skuFix: any;

  public contentDone: boolean;

  public renders: any;

  public references: any;

  public measures: any;

  public requestAdjustment: any[];

  private _zoomArea = {
    open: false,
    reference: {},
    render: {},
    editZoomArea: null,
    note: null,
    parentId: null,
  };

  @ViewChild('requestAdjustmentsGallery') requestAdjustmentsGallery: DecZoomMarksGalleryComponent;

  constructor(private decApiService: DecApiService, private matDialog: MatDialog) {
    this.refType = 'reference';
  }

  public async populateSkuFix(id: string | number) {
    const endpoint = `/skufixes/${id}`;
    this.skuFix = await this.decApiService.get(endpoint).toPromise();
    this.contentDone = true;
    this.getReferences();
    this.getRenders();
    this.measures = this.formatMeasures();
    this.requestAdjustment = this.populateRequestAdjustment();
  }

  public downloadMax(): void {
    if (this.product.max && this.product.max.fileUrl) {
      window.open(this.product.max.fileUrl, '_blank');
    } else if (this.job.actualMax && this.job.actualMax.fileUrl) {
      window.open(this.job.actualMax.fileUrl, '_blank');
    }
  }

  private getReferences() {
    this.references = this.skuFix ? this.skuFix.product.referenceImages.map(images => {
      return {
        file: images,
        tags: [],
        zoomAreas: []
      };
    }) : undefined;
  }

  private getRenders() {
    this.renders = this.skuFix ? this.skuFix.product.renderedImages.map(images => {
      return {
        file: images,
        tags: [],
        zoomAreas: []
      };
    }) : undefined;
  }

  private populateRequestAdjustment() {
    if (this.skuFix.requestAdjustment.some((request: any) => (request.tags && request.tags.length) || (request.zoomAreas && request.zoomAreas.length))) {
      return this.skuFix.requestAdjustment;
    }

    return this.skuFix.requestAdjustment.map((request: any) => {
      request.comments.forEach((comment: any, index: number) => {
        comment.reference = index + 1;
      });

      return {
        file: request.file,
        tags: request.comments,
        zoomAreas: request.zoomAreas || []
      };
    });
  }

  formatMeasures() {
    return {
      referenceCubeX: this.skuFix.product.referenceCubeX,
      referenceCubeY: this.skuFix.product.referenceCubeY,
      referenceCubeZ: this.skuFix.product.referenceCubeZ,
      modelCubeX: this.skuFix.product.modelCubeX,
      modelCubeY: this.skuFix.product.modelCubeY,
      modelCubeZ: this.skuFix.product.modelCubeZ,
    }
  }

  public openZoomArea(zoomArea: any) {
    this._zoomArea = {
      ...this._zoomArea,
      open: true,
      editZoomArea: zoomArea,
      reference: { ...zoomArea.referenceShot },
      render: { ...zoomArea.renderShot },
      note: zoomArea.note,
      parentId: this.requestAdjustmentsGallery.getImageIndex() + 1
    };

    this.openZoomAreaModal();
  }

  private openZoomAreaModal() {
    const dialogRef = this.matDialog.open(DecZoomAreaComponent, { height: '90vh', width: '1340px' });

    dialogRef.componentInstance.reference = this._zoomArea.reference;
    dialogRef.componentInstance.editMode = this._zoomArea.editZoomArea;
    dialogRef.componentInstance.note = this._zoomArea.note;
    dialogRef.componentInstance.render = this._zoomArea.render;
    dialogRef.componentInstance.parentId = this._zoomArea.parentId;
    dialogRef.componentInstance.qaMode = false;


    dialogRef.componentInstance.cancel.subscribe(() => {
      this.onCancelZoomArea();
      dialogRef.close();
    });

    dialogRef.afterClosed().subscribe(this.onCancelZoomArea);
  }

  private onCancelZoomArea() {
    this._zoomArea = { ...this._zoomArea, open: false, note: null, editZoomArea: null }
  }

}
