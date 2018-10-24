/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { DecApiService } from './../../services/api/decora-api.service';
var DecRenderCommentService = /** @class */ (function () {
    function DecRenderCommentService(decApi) {
        this.decApi = decApi;
        this.RENDERFEEDBACKTREE_ENDPOINT = '/legacy/job/renderfeedbacktree';
        this.feedbackTree = [];
    }
    /**
     * @param {?} version
     * @return {?}
     */
    DecRenderCommentService.prototype.getRenderfeedbacktree = /**
     * @param {?} version
     * @return {?}
     */
    function (version) {
        /** @type {?} */
        var queryParams = {
            language: this.formatI18n(this.decApi.user.i18n),
        };
        if (version) {
            queryParams['version'] = version.toString();
        }
        return this.decApi.get(this.RENDERFEEDBACKTREE_ENDPOINT, queryParams).toPromise();
    };
    /**
     * @param {?} comments
     * @return {?}
     */
    DecRenderCommentService.prototype.getRenderDescriptionsByCode = /**
     * @param {?} comments
     * @return {?}
     */
    function (comments) {
        var _this = this;
        /** @type {?} */
        var groupedComments = comments.reduce(function (r, v, i, a, k) {
            if (k === void 0) { k = v.version; }
            return ((r[k] || (r[k] = [])).push(v), r);
        }, {});
        Object.keys(groupedComments).forEach(function (key) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _this = this;
            var resp;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getRenderfeedbacktree(+key)];
                    case 1:
                        resp = _a.sent();
                        this.feedbackTree = resp['sub'];
                        groupedComments[key].forEach(function (comment) {
                            comment.description = _this.getDescription(comment.comment);
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        return comments;
    };
    /**
     * @param {?} comment
     * @return {?}
     */
    DecRenderCommentService.prototype.getDescription = /**
     * @param {?} comment
     * @return {?}
     */
    function (comment) {
        if (!comment) {
            return '';
        }
        /** @type {?} */
        var temp = this.feedbackTree;
        /** @type {?} */
        var result = '';
        comment.split('').forEach(function (char) {
            if (temp[char].sub) {
                temp = temp[char].sub;
            }
            else {
                result = temp[char].description;
            }
        });
        return result;
    };
    /**
     * @param {?} i18n
     * @return {?}
     */
    DecRenderCommentService.prototype.formatI18n = /**
     * @param {?} i18n
     * @return {?}
     */
    function (i18n) {
        switch (i18n) {
            case 'PT_BR':
                return 'pt-br';
            default:
                return 'en';
        }
    };
    DecRenderCommentService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DecRenderCommentService.ctorParameters = function () { return [
        { type: DecApiService }
    ]; };
    return DecRenderCommentService;
}());
export { DecRenderCommentService };
if (false) {
    /** @type {?} */
    DecRenderCommentService.prototype.RENDERFEEDBACKTREE_ENDPOINT;
    /** @type {?} */
    DecRenderCommentService.prototype.feedbackTree;
    /** @type {?} */
    DecRenderCommentService.prototype.decApi;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLXJlbmRlci1jb21tZW50LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGVjLXJlbmRlci1jb21tZW50L2RlYy1yZW5kZXItY29tbWVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUNBQXlDLENBQUM7O0lBVXRFLGlDQUFvQixNQUFxQjtRQUFyQixXQUFNLEdBQU4sTUFBTSxDQUFlOzJDQUhYLGdDQUFnQzs0QkFDeEMsRUFBRTtLQUVzQjs7Ozs7SUFFdkMsdURBQXFCOzs7O2NBQUMsT0FBZTs7UUFFMUMsSUFBTSxXQUFXLEdBQUc7WUFDbEIsUUFBUSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQ2pELENBQUM7UUFFRixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ1osV0FBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUM3QztRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsMkJBQTJCLEVBQUUsV0FBVyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7Ozs7OztJQUc3RSw2REFBMkI7Ozs7Y0FBQyxRQUFtQjs7O1FBQ3BELElBQU0sZUFBZSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBYTtZQUFiLGtCQUFBLEVBQUEsSUFBSSxDQUFDLENBQUMsT0FBTztZQUFLLE9BQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFBbEMsQ0FBa0MsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUUvRyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFNLEdBQUc7Ozs7OzRCQUMvQixxQkFBTSxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBQTs7d0JBQTdDLElBQUksR0FBRyxTQUFzQzt3QkFDbkQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBRWhDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPOzRCQUNsQyxPQUFPLENBQUMsV0FBVyxHQUFHLEtBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3lCQUM1RCxDQUFDLENBQUM7Ozs7YUFFSixDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsUUFBUSxDQUFDOzs7Ozs7SUFJVixnREFBYzs7OztjQUFDLE9BQWU7UUFFcEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2IsTUFBTSxDQUFDLEVBQUUsQ0FBQztTQUNYOztRQUVELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7O1FBQzdCLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUVoQixPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7WUFDNUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDO2FBQ3ZCO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLENBQUM7YUFDakM7U0FDRixDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsTUFBTSxDQUFDOzs7Ozs7SUFHUiw0Q0FBVTs7OztjQUFDLElBQVk7UUFDN0IsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNiLEtBQUssT0FBTztnQkFDVixNQUFNLENBQUMsT0FBTyxDQUFDO1lBQ2pCO2dCQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDZjs7O2dCQWhFSixVQUFVOzs7O2dCQUpGLGFBQWE7O2tDQUR0Qjs7U0FNYSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWNBcGlTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9hcGkvZGVjb3JhLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IENvbW1lbnQgfSBmcm9tICcuLy4uLy4uL2NvbXBvbmVudHMvZGVjLXpvb20tbWFya3MvbW9kZWxzL2NvbW1lbnQubW9kZWwnO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEZWNSZW5kZXJDb21tZW50U2VydmljZSB7XG5cbiAgUkVOREVSRkVFREJBQ0tUUkVFX0VORFBPSU5UID0gJy9sZWdhY3kvam9iL3JlbmRlcmZlZWRiYWNrdHJlZSc7XG4gIGZlZWRiYWNrVHJlZTogYW55W10gPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRlY0FwaTogRGVjQXBpU2VydmljZSkgeyB9XG5cbiAgcHVibGljIGdldFJlbmRlcmZlZWRiYWNrdHJlZSh2ZXJzaW9uOiBudW1iZXIpOiBQcm9taXNlPGFueT4ge1xuXG4gICAgY29uc3QgcXVlcnlQYXJhbXMgPSB7XG4gICAgICBsYW5ndWFnZTogdGhpcy5mb3JtYXRJMThuKHRoaXMuZGVjQXBpLnVzZXIuaTE4biksXG4gICAgfTtcblxuICAgIGlmICh2ZXJzaW9uKSB7XG4gICAgICBxdWVyeVBhcmFtc1sndmVyc2lvbiddID0gdmVyc2lvbi50b1N0cmluZygpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmRlY0FwaS5nZXQodGhpcy5SRU5ERVJGRUVEQkFDS1RSRUVfRU5EUE9JTlQsIHF1ZXJ5UGFyYW1zKS50b1Byb21pc2UoKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRSZW5kZXJEZXNjcmlwdGlvbnNCeUNvZGUoY29tbWVudHM6IENvbW1lbnRbXSk6IENvbW1lbnRbXSB7XG4gICAgY29uc3QgZ3JvdXBlZENvbW1lbnRzID0gY29tbWVudHMucmVkdWNlKChyLCB2LCBpLCBhLCBrID0gdi52ZXJzaW9uKSA9PiAoKHJba10gfHwgKHJba10gPSBbXSkpLnB1c2godiksIHIpLCB7fSk7XG5cbiAgICBPYmplY3Qua2V5cyhncm91cGVkQ29tbWVudHMpLmZvckVhY2goYXN5bmMga2V5ID0+IHtcbiAgICAgIGNvbnN0IHJlc3AgPSBhd2FpdCB0aGlzLmdldFJlbmRlcmZlZWRiYWNrdHJlZSgra2V5KTtcbiAgICAgIHRoaXMuZmVlZGJhY2tUcmVlID0gcmVzcFsnc3ViJ107XG5cbiAgICAgIGdyb3VwZWRDb21tZW50c1trZXldLmZvckVhY2goY29tbWVudCA9PiB7XG4gICAgICAgIGNvbW1lbnQuZGVzY3JpcHRpb24gPSB0aGlzLmdldERlc2NyaXB0aW9uKGNvbW1lbnQuY29tbWVudCk7XG4gICAgICB9KTtcblxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGNvbW1lbnRzO1xuXG4gIH1cblxuICBwcml2YXRlIGdldERlc2NyaXB0aW9uKGNvbW1lbnQ6IHN0cmluZyk6IHN0cmluZyB7XG5cbiAgICBpZiAoIWNvbW1lbnQpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICBsZXQgdGVtcCA9IHRoaXMuZmVlZGJhY2tUcmVlO1xuICAgIGxldCByZXN1bHQgPSAnJztcblxuICAgIGNvbW1lbnQuc3BsaXQoJycpLmZvckVhY2goY2hhciA9PiB7XG4gICAgICBpZiAodGVtcFtjaGFyXS5zdWIpIHtcbiAgICAgICAgdGVtcCA9IHRlbXBbY2hhcl0uc3ViO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0ID0gdGVtcFtjaGFyXS5kZXNjcmlwdGlvbjtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIGZvcm1hdEkxOG4oaTE4bjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBzd2l0Y2ggKGkxOG4pIHtcbiAgICAgIGNhc2UgJ1BUX0JSJzpcbiAgICAgICAgcmV0dXJuICdwdC1icic7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gJ2VuJztcbiAgICB9XG4gIH1cbn1cbiJdfQ==