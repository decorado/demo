import { Component, Input, ContentChild, ElementRef } from '@angular/core';

@Component({
  selector: 'dec-download-button',
  templateUrl: './dec-download-button.component.html',
  styleUrls: ['./dec-download-button.component.scss']
})
export class DecDownloadButtonComponent {

  @ContentChild('buttonText')
  buttonText: ElementRef;

  @Input()
  set url(v) {
    if (v) {
      this._url = v;
    }
  }

  get url() {
    return this._url;
  }

  private _url: string;

  constructor() { }

  download(url: string): void {
    if (url) {
      window.open(url, '_blank');
    }
  }

}
