import { DecConfirmDialogConfig } from './dec-confirm-dialog.models';
import { DecDialogService } from './../dialog/dec-dialog.service';
import { MatDialogRef } from '@angular/material';
export declare class DecConfirmDialogService {
    private decDialog;
    constructor(decDialog: DecDialogService);
    open(config: DecConfirmDialogConfig): MatDialogRef<any>;
}
