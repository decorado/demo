import { Comment } from './comment.model';
import { SystemFileKey } from './../../../directives/image/image.directive.models';
import { ZoomArea } from './zoom-area.model';
export declare class Marker {
    file: SystemFileKey;
    comments: Comment[];
    zoomAreas: ZoomArea[];
    constructor(file?: SystemFileKey, comments?: Comment[], zoomAreas?: ZoomArea[]);
}
