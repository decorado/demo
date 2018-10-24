import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { DecMarksComponent } from './../dec-marks/dec-marks.component';

@Component({
  selector: 'dec-zoom-area',
  templateUrl: './dec-zoom-area.component.html',
  styleUrls: ['./dec-zoom-area.component.scss']
})
export class DecZoomAreaComponent implements OnInit {

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

  get render() {
    return this._render;
  }

  @Output() save = new EventEmitter();

  @Output() cancel = new EventEmitter();
  
  private _reference;
  private _render;

  @Input() parentId: number;

  commentIndex;
  referenceQaMode = false;

  descripition: any;

  renderMarkdons = [];

  @ViewChild('renderZoom') renderZoom: DecMarksComponent;

  @ViewChild('referenceZoom') referenceZoom: DecMarksComponent;

  constructor() { }

  ngOnInit() {
  }

  onSave() {
    const saveObj = {
      coordinates: [],
      id: this.parentId,
      descripition: this.descripition,
      renderShot: this.renderZoom.marker,
      referenceShot: this.referenceZoom.marker
    }
    console.log(saveObj);
    this.save.emit(saveObj);
  }

  onLinkTag(event) {
    this.referenceQaMode = true;
    this.commentIndex = event.id;
  }

  onReferenceQa($event) {
    this.referenceQaMode = false;
  }

  onCancel() {
    this.cancel.emit();
  }
}
