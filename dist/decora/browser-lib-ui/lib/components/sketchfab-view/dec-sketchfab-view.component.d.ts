import { OnInit, ElementRef } from '@angular/core';
import { DecScriptLoaderService } from './../../services/script-loader/dec-script-loader.service';
export declare class DecSketchfabViewComponent implements OnInit {
    private decScriptLoaderService;
    sketchfabId: string;
    _sketchfabId: string;
    apiFrame: ElementRef;
    constructor(decScriptLoaderService: DecScriptLoaderService);
    ngOnInit(): void;
    startSketchfab(id: any): void;
}
