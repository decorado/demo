import { DecApiService } from './../../services/api/decora-api.service';
import { Comment } from './../../components/dec-zoom-marks/models/comment.model';
export declare class DecRenderCommentService {
    private decApi;
    RENDERFEEDBACKTREE_ENDPOINT: string;
    feedbackTree: any[];
    constructor(decApi: DecApiService);
    getRenderfeedbacktree(version: number): Promise<any>;
    getRenderDescriptionsByCode(comments: Comment[]): Comment[];
    private getDescription(comment);
    private formatI18n(i18n);
}
