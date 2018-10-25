import { BehaviorSubject } from 'rxjs';
export declare const STORAGE_DOMAIN = "decSidenavConfig";
export declare class DecSidenavService {
    progressBarVisible: BehaviorSubject<string | boolean>;
    constructor();
    setSidenavVisibility(name: any, visibility: any): void;
    getSidenavVisibility(name: any): any;
    showProgressBar(msg?: string): void;
    hideProgressbar(): void;
    toggleProgressBar(): void;
    private setSidenavConfig(conf);
    private getSidenavConfig();
}
