/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { DecApiService } from './../../services/api/decora-api.service';
export class DecRenderCommentService {
    /**
     * @param {?} decApi
     */
    constructor(decApi) {
        this.decApi = decApi;
        this.RENDERFEEDBACKTREE_ENDPOINT = '/legacy/job/renderfeedbacktree';
        this.feedbackTree = [];
    }
    /**
     * @param {?} version
     * @return {?}
     */
    getRenderfeedbacktree(version) {
        /** @type {?} */
        const queryParams = {
            language: this.formatI18n(this.decApi.user.i18n),
        };
        if (version) {
            queryParams['version'] = version.toString();
        }
        return this.decApi.get(this.RENDERFEEDBACKTREE_ENDPOINT, queryParams).toPromise();
    }
    /**
     * @param {?} comments
     * @return {?}
     */
    getRenderDescriptionsByCode(comments) {
        /** @type {?} */
        const groupedComments = comments.reduce((r, v, i, a, k = v.version) => ((r[k] || (r[k] = [])).push(v), r), {});
        Object.keys(groupedComments).forEach((key) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const resp = yield this.getRenderfeedbacktree(+key);
            this.feedbackTree = resp['sub'];
            groupedComments[key].forEach(comment => {
                comment.description = this.getDescription(comment.comment);
            });
        }));
        return comments;
    }
    /**
     * @param {?} comment
     * @return {?}
     */
    getDescription(comment) {
        if (!comment) {
            return '';
        }
        /** @type {?} */
        let temp = this.feedbackTree;
        /** @type {?} */
        let result = '';
        comment.split('').forEach(char => {
            if (temp[char].sub) {
                temp = temp[char].sub;
            }
            else {
                result = temp[char].description;
            }
        });
        return result;
    }
    /**
     * @param {?} i18n
     * @return {?}
     */
    formatI18n(i18n) {
        switch (i18n) {
            case 'PT_BR':
                return 'pt-br';
            default:
                return 'en';
        }
    }
}
DecRenderCommentService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DecRenderCommentService.ctorParameters = () => [
    { type: DecApiService }
];
if (false) {
    /** @type {?} */
    DecRenderCommentService.prototype.RENDERFEEDBACKTREE_ENDPOINT;
    /** @type {?} */
    DecRenderCommentService.prototype.feedbackTree;
    /** @type {?} */
    DecRenderCommentService.prototype.decApi;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLXJlbmRlci1jb21tZW50LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGVjLXJlbmRlci1jb21tZW50L2RlYy1yZW5kZXItY29tbWVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFLeEUsTUFBTTs7OztJQUtKLFlBQW9CLE1BQXFCO1FBQXJCLFdBQU0sR0FBTixNQUFNLENBQWU7MkNBSFgsZ0NBQWdDOzRCQUN4QyxFQUFFO0tBRXNCOzs7OztJQUV2QyxxQkFBcUIsQ0FBQyxPQUFlOztRQUUxQyxNQUFNLFdBQVcsR0FBRztZQUNsQixRQUFRLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDakQsQ0FBQztRQUVGLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDWixXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQzdDO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQywyQkFBMkIsRUFBRSxXQUFXLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQzs7Ozs7O0lBRzdFLDJCQUEyQixDQUFDLFFBQW1COztRQUNwRCxNQUFNLGVBQWUsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRS9HLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQU0sR0FBRyxFQUFDLEVBQUU7O1lBQy9DLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDcEQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFaEMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDckMsT0FBTyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUM1RCxDQUFDLENBQUM7VUFFSixDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsUUFBUSxDQUFDOzs7Ozs7SUFJVixjQUFjLENBQUMsT0FBZTtRQUVwQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDYixNQUFNLENBQUMsRUFBRSxDQUFDO1NBQ1g7O1FBRUQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQzs7UUFDN0IsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBRWhCLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQy9CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQzthQUN2QjtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDO2FBQ2pDO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLE1BQU0sQ0FBQzs7Ozs7O0lBR1IsVUFBVSxDQUFDLElBQVk7UUFDN0IsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNiLEtBQUssT0FBTztnQkFDVixNQUFNLENBQUMsT0FBTyxDQUFDO1lBQ2pCO2dCQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDZjs7OztZQWhFSixVQUFVOzs7O1lBSkYsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERlY0FwaVNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29tbWVudCB9IGZyb20gJy4vLi4vLi4vY29tcG9uZW50cy9kZWMtem9vbS1tYXJrcy9tb2RlbHMvY29tbWVudC5tb2RlbCc7XG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERlY1JlbmRlckNvbW1lbnRTZXJ2aWNlIHtcblxuICBSRU5ERVJGRUVEQkFDS1RSRUVfRU5EUE9JTlQgPSAnL2xlZ2FjeS9qb2IvcmVuZGVyZmVlZGJhY2t0cmVlJztcbiAgZmVlZGJhY2tUcmVlOiBhbnlbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGVjQXBpOiBEZWNBcGlTZXJ2aWNlKSB7IH1cblxuICBwdWJsaWMgZ2V0UmVuZGVyZmVlZGJhY2t0cmVlKHZlcnNpb246IG51bWJlcik6IFByb21pc2U8YW55PiB7XG5cbiAgICBjb25zdCBxdWVyeVBhcmFtcyA9IHtcbiAgICAgIGxhbmd1YWdlOiB0aGlzLmZvcm1hdEkxOG4odGhpcy5kZWNBcGkudXNlci5pMThuKSxcbiAgICB9O1xuXG4gICAgaWYgKHZlcnNpb24pIHtcbiAgICAgIHF1ZXJ5UGFyYW1zWyd2ZXJzaW9uJ10gPSB2ZXJzaW9uLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZGVjQXBpLmdldCh0aGlzLlJFTkRFUkZFRURCQUNLVFJFRV9FTkRQT0lOVCwgcXVlcnlQYXJhbXMpLnRvUHJvbWlzZSgpO1xuICB9XG5cbiAgcHVibGljIGdldFJlbmRlckRlc2NyaXB0aW9uc0J5Q29kZShjb21tZW50czogQ29tbWVudFtdKTogQ29tbWVudFtdIHtcbiAgICBjb25zdCBncm91cGVkQ29tbWVudHMgPSBjb21tZW50cy5yZWR1Y2UoKHIsIHYsIGksIGEsIGsgPSB2LnZlcnNpb24pID0+ICgocltrXSB8fCAocltrXSA9IFtdKSkucHVzaCh2KSwgciksIHt9KTtcblxuICAgIE9iamVjdC5rZXlzKGdyb3VwZWRDb21tZW50cykuZm9yRWFjaChhc3luYyBrZXkgPT4ge1xuICAgICAgY29uc3QgcmVzcCA9IGF3YWl0IHRoaXMuZ2V0UmVuZGVyZmVlZGJhY2t0cmVlKCtrZXkpO1xuICAgICAgdGhpcy5mZWVkYmFja1RyZWUgPSByZXNwWydzdWInXTtcblxuICAgICAgZ3JvdXBlZENvbW1lbnRzW2tleV0uZm9yRWFjaChjb21tZW50ID0+IHtcbiAgICAgICAgY29tbWVudC5kZXNjcmlwdGlvbiA9IHRoaXMuZ2V0RGVzY3JpcHRpb24oY29tbWVudC5jb21tZW50KTtcbiAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgICByZXR1cm4gY29tbWVudHM7XG5cbiAgfVxuXG4gIHByaXZhdGUgZ2V0RGVzY3JpcHRpb24oY29tbWVudDogc3RyaW5nKTogc3RyaW5nIHtcblxuICAgIGlmICghY29tbWVudCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIGxldCB0ZW1wID0gdGhpcy5mZWVkYmFja1RyZWU7XG4gICAgbGV0IHJlc3VsdCA9ICcnO1xuXG4gICAgY29tbWVudC5zcGxpdCgnJykuZm9yRWFjaChjaGFyID0+IHtcbiAgICAgIGlmICh0ZW1wW2NoYXJdLnN1Yikge1xuICAgICAgICB0ZW1wID0gdGVtcFtjaGFyXS5zdWI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHQgPSB0ZW1wW2NoYXJdLmRlc2NyaXB0aW9uO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgZm9ybWF0STE4bihpMThuOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHN3aXRjaCAoaTE4bikge1xuICAgICAgY2FzZSAnUFRfQlInOlxuICAgICAgICByZXR1cm4gJ3B0LWJyJztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiAnZW4nO1xuICAgIH1cbiAgfVxufVxuIl19