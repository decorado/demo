export declare const STORAGE_DOMAIN = "decSidenavConfig";
export declare class DecSidenavService {
    constructor();
    setSidenavVisibility(name: any, visibility: any): void;
    getSidenavVisibility(name: any): any;
    private setSidenavConfig(conf);
    private getSidenavConfig();
}
