import { Component, HostListener, Input, OnInit, Output, EventEmitter, Renderer  } from '@angular/core';

const FALLBACK_IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAACxMAAAsTAQCanBgAAAALSURBVAjXY2BgAAAAAwABINWUxwAAAABJRU5' +
'ErkJggg==';

const LOADING_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCIg' +
'Y2xhc3M9InVpbC1yaW5nIj48cGF0aCBmaWxsPSJub25lIiBjbGFzcz0iYmsiIGQ9Ik0wIDBoMTAwdjEwMEgweiIvPjxjaXJjbGUgY3g9Ijc1IiBjeT0iNzUiIHI9IjQ1IiBzdHJva2UtZGFzaGFycmF5PSIyMjYuMTk1IDU2LjU0OSI' +
'gc3Ryb2tlPSIjMjMyZTM4IiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjEwIj48YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InJvdGF0ZSIgdmFsdWVzPSIwIDc1IDc1OzE4MCA3NSA3NT' +
'szNjAgNzUgNzU7IiBrZXlUaW1lcz0iMDswLjU7MSIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGJlZ2luPSIwcyIvPjwvY2lyY2xlPjwvc3ZnPg==';

@Component({
  selector: 'dec-product-spin',
  templateUrl: './product-spin.component.html',
  styleUrls: ['./product-spin.component.scss']
})
export class DecProductSpinComponent implements OnInit {

  frameShown: number;
  scenes: string[];
  loadingImages: boolean;
  placeholderScene: string;
  started: boolean;
  totalImagesLoaded: number;
  loadingImage = LOADING_IMAGE;

  @Input() looping = false;
  @Input() onlyModal = false;
  @Input() FALLBACK_IMAGE: string = FALLBACK_IMAGE;
  @Input() startInCenter = false;
  @Input() showOpenDialogButton = true;

  @Input()
  set spin(spin: any) {
    if (spin) {
      const scenes = this.loadScenes(spin);

      const scenesChanged = !this.scenes || (scenes && this.scenes.join() !== scenes.join());

      if (scenesChanged) {
        this.resetScenesData(scenes);
        // this.resetStartPositionBasedOnCompany(spin, scenes);
      }

      this._spin = spin;

    }
  }

  get spin(): any {
    return this._spin;
  }

  @Output() open = new EventEmitter<any>();

  private scenesLen = 0;
  private mouseDown = false;
  private lastMouseEvent: MouseEvent;
  private containerWidth: number;
  private interval: number;
  private positionDiff: number;
  private _spin: any;

  /*
  * Listening for mouse events
  * mouseup in ngOnInit because it used doccument as reference
  */

  // avoid drag
  @HostListener('dragstart', ['$event'])
  onDragStart(event) {
    event.stopPropagation();
    event.preventDefault();
    return false;
  }

  // mousedown
  @HostListener('mousedown', ['$event'])
  onMousedown(event) {
    event.stopPropagation();
    this.mouseDown = true;
    this.lastMouseEvent = event;
  }

  // mousemove
  @HostListener('mousemove', ['$event'])
  onMousemove(event: MouseEvent) {
    if (this.mouseDown && this.started) {

      this.calculatePosition(event);

      // The width is divided by the amount of images. Moving from 0 to 100 will turn 360°
      if (Math.abs(this.positionDiff) >= this.interval) {
        if (this.positionDiff < 0) {
          this.goRight();
        } else {
          this.goLeft();
        }
        this.lastMouseEvent = event;
      }
    }
  }

  constructor(private renderer: Renderer) {}

  ngOnInit() {

    this.frameShown = 0;

    this.renderer.listenGlobal('document', 'mouseup', (event) => {
      if (this.mouseDown) {
        this.mouseDown = false;
      }
    });

  }

  markAsLoaded = (event) => {
    this.totalImagesLoaded++;
    if (this.totalImagesLoaded === this.scenesLen) {
      this.placeholderScene = this.scenes[0];
      this.loadingImages = false;
    }
  }

  goLeft = () => {
    if (this.scenes[this.frameShown - 1]) {
      this.frameShown--;
    } else if (this.looping) {
      this.frameShown = this.scenesLen - 1;
    }
  }

  goRight = () => {
    if (this.scenes[this.frameShown + 1]) {
      this.frameShown++;
    } else if (this.looping) {
      this.frameShown = 0;
    }
  }

  start = ($event): void => {
    this.placeholderScene = LOADING_IMAGE;
    this.totalImagesLoaded = 0;
    this.loadingImages = true;
    this.started = true;
  }

  loaderPercentage = () => {
    return (this.scenesLen - this.totalImagesLoaded) > 0 ? ((100 / this.scenesLen) * this.totalImagesLoaded).toFixed(1) : 0;
  }

  onOpen($event) {

    this.open.emit($event);

  }

  /*
   *
   * IMPORTANT
   *
   * resetStartPositionBasedOnCompany
   *
   * This method is responsible for ensuring the Business Rule of the spin sequence
   * The Home Depot aka customer 100, have a particular behavior starting 180º in the middle
   *
  */
  private resetStartPositionBasedOnCompany(spin, scenes) {

    this.startInCenter = spin.company.id === 100 ? true : false;

    this.startInCenter = this.startInCenter && scenes.length <= 16;

  }

  private resetScenesData(scenes) {
    this.placeholderScene = scenes[0];
    this.scenesLen = scenes.length;
    this.scenes = scenes;
  }

  private loadScenes(spin) {
    try {
      const scenes = this.getUrlsFromSysFiles(spin.data.shots);
      return scenes && scenes.length > 0 ? scenes : [FALLBACK_IMAGE];
    } catch (error) {
      return [FALLBACK_IMAGE];
    }
  }

  private calculatePosition(event) {
    const target: any = event['target'];

    if (this.containerWidth !== target.clientWidth) {
      this.containerWidth =  target.clientWidth;
      this.interval = (this.containerWidth / this.scenesLen) / 1.6;
    }

    this.positionDiff = event.clientX - this.lastMouseEvent.clientX;
  }

  private getUrlsFromSysFiles(sysFiles) {
    if (!sysFiles) {
      return;
    } else {
      return sysFiles.map(file => {
        return file.renderFile.fileUrl;
      });
    }
  }
}
