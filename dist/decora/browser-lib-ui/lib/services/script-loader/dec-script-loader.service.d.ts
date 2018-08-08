export declare class DecScriptLoaderService {
    constructor();
    load(url: string, scriptName: string): Promise<{}>;
    loadStyle(url: string): Promise<{}>;
    loadStyleAndScript(styleUrl: any, scriptUrl: any, scriptNamespace: any): Promise<{}>;
}
