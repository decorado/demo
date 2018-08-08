import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { DecScriptLoaderService } from './../../services/script-loader/dec-script-loader.service';

const SKETCHFAB_SCRIPT_URL = 'https://static.sketchfab.com/api/sketchfab-viewer-1.0.0.js';

@Component({
  selector: 'dec-sketchfab-view',
  templateUrl: './dec-sketchfab-view.component.html',
  styleUrls: ['./dec-sketchfab-view.component.css']
})
export class DecSketchfabViewComponent implements OnInit {

  @Input() 
  set sketchfabId(id) {
    if (id) {
      this._sketchfabId = id;
      this.startSketchfab(id);
    }
  }

  get sketchfabId() {
    return this._sketchfabId;
  }

  _sketchfabId: string;

  @ViewChild('apiFrame') apiFrame: ElementRef;

  constructor(private decScriptLoaderService: DecScriptLoaderService) { }

  ngOnInit() {
  }

  startSketchfab(id) {
    this.decScriptLoaderService.load(SKETCHFAB_SCRIPT_URL, 'Sketchfab')
      .then((Sketchfab: any) => {
        const iframe = this.apiFrame.nativeElement;
        const client = new Sketchfab('1.0.0', iframe);
        client.init(this.sketchfabId, {
          success: function onSuccess(api) {
            api.start();
            api.addEventListener('viewerready',  () => {});
          }
      });
    });
  }
}
