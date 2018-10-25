import { DecScriptLoaderService } from './../script-loader/dec-script-loader.service';
import { Observable } from 'rxjs';
import { DecColorService } from './../color/dec-color.service';
export declare class ColorPickerService {
    private decScriptLoaderService;
    private decColorService;
    private html2canvas;
    private contentBlocker;
    private previewHex;
    private sketchFab;
    private overlaySketchFab;
    private existingSketchFabView;
    constructor(decScriptLoaderService: DecScriptLoaderService, decColorService: DecColorService);
    start: Observable<{}>;
    private _generateContentBloker();
    private _generatePreviewBloker();
    private _workaroundForSketchFabFrames();
    private _eventInitClick(observer, hex);
    private _getCursorBase64BySize();
}
