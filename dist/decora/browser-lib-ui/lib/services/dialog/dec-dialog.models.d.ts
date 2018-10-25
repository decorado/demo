export interface DecDialogAction {
    label?: string;
    i18nLabel?: string;
    color?: 'primary' | 'accent' | 'warn' | 'default';
    buttonType?: 'mat-button' | 'mat-raised-button';
    callback: (context: any) => any;
}
export declare class DecDialogOpenConfiguration {
    width?: string;
    height?: string;
    title?: string;
    topActions?: DecDialogAction[];
    bottomActions?: DecDialogAction[];
    context?: any;
    hideBackButton?: boolean;
    showCancelButton?: boolean;
    color?: 'primary' | 'accent' | 'warn' | 'default' | 'transparent';
    constructor(data?: any);
}
