import { Component, Input } from '@angular/core';
import { environment } from '@env/environment';

@Component({
  selector: 'dec-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.scss']
})
export class DecMarkdownComponent {

  path: string;

  @Input()
  set src(v: string) {
    if (this._src !== v) {
      this._src = v;
      this.mountPath();
    }
  }

  get src() {
    return this._src;
  }

  private _src: string;

  constructor() { }

  private mountPath() {

    const startWithSlash = this.src && this.src[0] === '/';

    const startWithHttp = this.src && this.src.substring(0, 4) === 'http';

    if (this.src) {

      if (startWithHttp) {

        this.path = this.src;

      } else if (startWithSlash) {

        this.path = `${environment.basePath}${this.src}`

      } else {

        this.path = `${environment.basePath}/${this.src}`

      }

    } else {

      this.path = this.src;

    }


  }
}
