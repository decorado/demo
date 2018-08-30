import { DecStatusColorService } from './../../services/status-color/dec-status-color.service';
export declare class DecLabelStatusComponent {
    decStatusColorService: DecStatusColorService;
    status: string;
    stretched?: boolean;
    private _status;
    statusColor: string;
    constructor(decStatusColorService: DecStatusColorService);
}
