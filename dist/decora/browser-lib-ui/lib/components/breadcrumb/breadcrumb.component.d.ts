import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
export declare class DecBreadcrumbComponent implements OnInit {
    private router;
    private translator;
    backButtonPath: string;
    breadcrumb: string;
    feature: string;
    forwardButton: string;
    i18nFeature: string;
    i18nBreadcrumb: string[];
    backLabel: string;
    forwardLabel: string;
    constructor(router: Router, translator: TranslateService);
    ngOnInit(): void;
    private detectAndParseButtonsConfig();
    private parseBackButton();
    private parseForwardButton();
    private translateFeature();
    private translatePaths();
    goBack(): void;
    goForward(): void;
}
