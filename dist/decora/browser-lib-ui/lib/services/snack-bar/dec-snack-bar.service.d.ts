import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
export declare type MessageType = 'success' | 'primary' | 'info' | 'warn' | 'error';
export declare class DecSnackBarService {
    snackBarService: MatSnackBar;
    private translate;
    constructor(snackBarService: MatSnackBar, translate: TranslateService);
    open(message: string, type: MessageType, duration?: number, translate?: any): MatSnackBarRef<SimpleSnackBar>;
    getClass(type: MessageType): "snack-success" | "snack-primary" | "snack-info" | "snack-warn" | "snack-error";
}
