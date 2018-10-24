export interface DialogAction {
    label?: string;
    i18nLabel?: string;
    callback: Function;
    color?: 'primary' | 'accent' | 'warn' | 'default';
    buttonType?: 'mat-button' | 'mat-raised-button';
}
export declare class OpenConfiguration {
    width?: string;
    height?: string;
    title?: string;
    topActions?: DialogAction[];
    bottomActions?: DialogAction[];
    context?: any;
    hideBackButton?: boolean;
    showCancelButton?: boolean;
    color?: 'primary' | 'accent' | 'warn' | 'default' | 'transparent';
    constructor(data?: any);
}
