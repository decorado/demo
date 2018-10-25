import { DecDialogAction } from './../dialog/dec-dialog.models';
export declare class DecConfirmDialogConfig {
    title?: string;
    message: string;
    customButtonTitle?: string;
    width?: string;
    height?: string;
    color?: 'primary' | 'accent' | 'warn' | 'default' | 'transparent';
    extraButtons?: DecDialogAction[];
    constructor(data?: any);
}
