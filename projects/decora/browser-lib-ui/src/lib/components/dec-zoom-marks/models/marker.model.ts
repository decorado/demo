import { Tag } from './tag.model';
import { SystemFileKey } from './../../../directives/image/image.directive.models';
import { ZoomArea } from './zoom-area.model';
export class Marker {
  public file: SystemFileKey;
  public tags: Tag[];
  public zoomAreas: ZoomArea[];

  constructor(file?: SystemFileKey, tags?: Tag[], zoomAreas?: ZoomArea[]) {
    this.file = file || {};
    this.tags = tags || [];
    this.zoomAreas = zoomAreas || [];
  }
}
