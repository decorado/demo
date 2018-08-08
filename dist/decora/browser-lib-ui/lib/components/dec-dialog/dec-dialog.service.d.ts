import { MatDialog, MatDialogRef } from '@angular/material';
import { ComponentType } from '@angular/cdk/portal';
import { OpenConfiguration } from './dec-dialog.models';
export declare class DecDialogService {
    private dialog;
    constructor(dialog: MatDialog);
    open(childComponent: ComponentType<any>, config: OpenConfiguration): MatDialogRef<any, any>;
}
