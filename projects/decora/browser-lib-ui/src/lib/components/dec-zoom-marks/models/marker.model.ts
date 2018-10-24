import { Comment } from './comment.model';
import { SystemFileKey } from './../../../directives/image/image.directive.models';
import { ZoomArea } from './zoom-area.model';
export class Marker {
  public file: SystemFileKey;
  public comments: Comment[];
  public zoomAreas: ZoomArea[];

  constructor(file?: SystemFileKey, comments?: Comment[], zoomAreas?: ZoomArea[]) {
    this.file = file || {};
    this.comments = comments || [];
    this.zoomAreas = zoomAreas || [];
  }
}
