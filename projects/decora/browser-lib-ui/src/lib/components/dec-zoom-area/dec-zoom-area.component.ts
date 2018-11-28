import { Component, OnInit, Input, ViewChild, Output, EventEmitter, HostListener } from '@angular/core';
import { DecMarksComponent } from './../dec-marks/dec-marks.component';
import { DecConfirmDialogService } from './../../services/confirm-dialog/dec-confirm-dialog.service';

@Component({
  selector: 'dec-zoom-area',
  templateUrl: './dec-zoom-area.component.html',
  styleUrls: ['./dec-zoom-area.component.scss']
})
export class DecZoomAreaComponent implements OnInit {

  @Input() jobType;

  @Input()
  set reference(v) {
    if (v) {
      this._reference = v;
    }
  }

  get reference() {
    return this._reference;
  }

  @Input()
  set render(v) {
    if (v) {
      this._render = v;
      this.renderMarkdons.push(this._render);
    }
  }


  private _editMode: string;
  @Input()
  public get editMode(): string {
    return this._editMode;
  }
  public set editMode(v: string) {
    this._editMode = v;
  }


  get render() {
    return this._render;
  }

  @Input()
  set note(v) {
    if (v) {
      this._note = v;
    }
  }

  get note() {
    return this._note;
  }

  @Input()
  public get qaMode(): boolean {
    return this._qaMode;
  }
  public set qaMode(v: boolean) {
    this._qaMode = v;
  }


  @Output() save = new EventEmitter();

  @Output() cancel = new EventEmitter();

  @Output() delete = new EventEmitter();

  private _reference;
  private _render;
  private _note;
  private _qaMode: boolean;

  init = false;

  @Input() parentId: number;

  commentIndex;
  referenceQaMode = false;

  renderMarkdons = [];

  @ViewChild('renderZoom') renderZoom: DecMarksComponent;

  @ViewChild('referenceZoom') referenceZoom: DecMarksComponent;

  constructor(private confirmDialog: DecConfirmDialogService) { }

  ngOnInit() {
  }

  @HostListener('window:keydown.control.s', ['$event'])
  @HostListener('window:keydown.meta.s', ['$event'])
  onKeyPress(event) {
    if (this.qaMode && this.editMode) {
      event.preventDefault();
      this.onSave();
    }
  }

  onSave() {
    const saveObj = {
      coordinates: [],
      note: this.note,
      renderShot: this.renderZoom.marker,
      referenceShot: this.referenceZoom.marker
    };
    this.note = '';
    this.save.emit(saveObj);
  }

  onLinkTag(event) {
    if (this.qaMode) {
      this.referenceQaMode = true;
      this.commentIndex = event.reference;
    }
  }

  deleteTag(event) {
    this.renderZoom.deleteMarkByReference(`${this.parentId}.${event.reference}`);
  }

  onReferenceQa($event) {
    this.referenceQaMode = false;
  }

  deleteZoomArea() {
    const dialogRef = this.confirmDialog.open({
      description: 'message.info.are-you-sure-you-want-to-delete-this-zoom-area',
      height: '240px',
      customButtonTitle: 'message.info.yes-delete-zoom-area'
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.delete.emit(this.parentId - 1);
      }
    });
  }

  onCancel() {
    this.note = '';
    this.cancel.emit();
  }
}
