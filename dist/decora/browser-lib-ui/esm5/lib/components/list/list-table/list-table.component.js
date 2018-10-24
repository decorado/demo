/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ContentChildren, QueryList, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { DecListTableColumnComponent } from './../list-table-column/list-table-column.component';
import { DatatableComponent } from '@swimlane/ngx-datatable';
var DecListTableComponent = /** @class */ (function () {
    function DecListTableComponent() {
        this.selected = [];
        this._rows = [];
        this.sort = new EventEmitter();
        this.rowClick = new EventEmitter();
    }
    Object.defineProperty(DecListTableComponent.prototype, "rows", {
        get: /**
         * @return {?}
         */
        function () {
            return this._rows;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (this._rows !== v) {
                this._rows = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} event
     * @return {?}
     */
    DecListTableComponent.prototype.onSort = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var sortConfig = [{
                property: event.sorts[0].prop,
                order: event.sorts[0].dir.toUpperCase()
            }];
        if (sortConfig !== this.columnsSortConfig) {
            this.columnsSortConfig = sortConfig;
            this.sort.emit(this.columnsSortConfig);
        }
    };
    /**
     * @param {?} __0
     * @return {?}
     */
    DecListTableComponent.prototype.onSelect = /**
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var selected = _a.selected;
        this.selected.splice(0, this.selected.length);
        (_b = this.selected).push.apply(_b, tslib_1.__spread(selected));
        var _b;
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    DecListTableComponent.prototype.onItemClick = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        /** @type {?} */
        var event = $event;
        /** @type {?} */
        var item = $event.row;
        /** @type {?} */
        var list = this.rows;
        /** @type {?} */
        var index = $event.row.$$index;
        this.rowClick.emit({ event: event, item: item, list: list, index: index });
    };
    DecListTableComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-list-table',
                    template: "<ngx-datatable #tableComponent\n  columnMode=\"flex\"\n  headerHeight=\"24px\"\n  rowHeight=\"auto\"\n  [externalSorting]=\"true\"\n  [messages]=\"{emptyMessage:''}\"\n  [rows]=\"rows\"\n  [selected]=\"selected\"\n  [selectionType]=\"'checkbox'\"\n  [selectAllRowsOnPage]=\"false\"\n  (select)=\"onSelect($event)\"\n  (sort)=\"onSort($event)\"\n  (activate)=\"onItemClick($event)\">\n\n  <ngx-datatable-column\n    *ngIf=\"selectable\"\n    [width]=\"40\"\n    [canAutoResize]=\"false\"\n    [headerCheckboxable]=\"true\"\n    [checkboxable]=\"true\">\n  </ngx-datatable-column>\n\n  <ngx-datatable-column *ngFor=\"let column of columns;\"\n                         name=\"{{column.title | translate}}\"\n                         [flexGrow]=\"column.colSpan\"\n                         [prop]=\"column.prop\"\n                         [sortable]=\"column.prop ? true : false\">\n\n    <ng-template *ngIf=\"column.template ? true : false\"\n      let-row=\"row\"\n      let-index=\"rowIndex\"\n      ngx-datatable-cell-template>\n\n      <ng-container\n        [ngTemplateOutlet]=\"column.template\"\n        [ngTemplateOutletContext]=\"{row: row || {}, list: rows || [], index: index}\"\n      ></ng-container>\n\n    </ng-template>\n\n  </ngx-datatable-column>\n\n</ngx-datatable>\n",
                    styles: ["::ng-deep .ngx-datatable .overflow-visible{overflow:visible!important}::ng-deep datatable-scroller{width:100%!important}::ng-deep .ngx-datatable.no-overflow{overflow:auto}::ng-deep .ngx-datatable.no-padding .datatable-body-row .datatable-body-cell .datatable-body-cell-label{padding:0}::ng-deep .ngx-datatable .datatable-header{padding:11px 16px}::ng-deep .ngx-datatable .datatable-header .datatable-header-cell-label{font-size:12px;font-weight:500}::ng-deep .ngx-datatable .datatable-body-row .datatable-body-cell{font-size:13px;font-weight:400;overflow:hidden;min-height:100%;display:table;-webkit-user-select:initial;-moz-user-select:initial;-ms-user-select:initial;-o-user-select:initial;user-select:initial}::ng-deep .ngx-datatable .datatable-body-row .datatable-body-cell .datatable-body-cell-label{padding:16px;display:table-cell;vertical-align:middle;word-break:break-all}::ng-deep .ngx-datatable .datatable-body-row .datatable-body-cell.cell-top .datatable-body-cell-label{vertical-align:top}::ng-deep .ngx-datatable .datatable-row-detail{padding:10px}::ng-deep .ngx-datatable .sort-btn{width:0;height:0}::ng-deep .ngx-datatable .icon-down{border-left:5px solid transparent;border-right:5px solid transparent}::ng-deep .ngx-datatable .icon-up{border-left:5px solid transparent;border-right:5px solid transparent}"]
                },] },
    ];
    /** @nocollapse */
    DecListTableComponent.ctorParameters = function () { return []; };
    DecListTableComponent.propDecorators = {
        rows: [{ type: Input }],
        selectable: [{ type: Input }],
        tableComponent: [{ type: ViewChild, args: [DatatableComponent,] }],
        columns: [{ type: ContentChildren, args: [DecListTableColumnComponent,] }],
        sort: [{ type: Output }],
        rowClick: [{ type: Output }]
    };
    return DecListTableComponent;
}());
export { DecListTableComponent };
if (false) {
    /** @type {?} */
    DecListTableComponent.prototype.selectable;
    /** @type {?} */
    DecListTableComponent.prototype.selected;
    /** @type {?} */
    DecListTableComponent.prototype.tableComponent;
    /** @type {?} */
    DecListTableComponent.prototype.columnsSortConfig;
    /** @type {?} */
    DecListTableComponent.prototype._rows;
    /** @type {?} */
    DecListTableComponent.prototype.columns;
    /** @type {?} */
    DecListTableComponent.prototype.sort;
    /** @type {?} */
    DecListTableComponent.prototype.rowClick;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC10YWJsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvbGlzdC9saXN0LXRhYmxlL2xpc3QtdGFibGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RyxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUNqRyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7SUErRTNEO3dCQWRrQixFQUFFO3FCQU1RLEVBQUU7b0JBSU0sSUFBSSxZQUFZLEVBQU87d0JBRW5CLElBQUksWUFBWSxFQUFPO0tBRTlDO0lBM0JqQixzQkFDSSx1Q0FBSTs7OztRQU1SO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7U0FDbkI7Ozs7O1FBVEQsVUFDUyxDQUFDO1lBQ1IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQzthQUNoQjtTQUNGOzs7T0FBQTs7Ozs7SUF3QkQsc0NBQU07Ozs7SUFBTixVQUFPLEtBQUs7O1FBRVYsSUFBTSxVQUFVLEdBQUcsQ0FBQztnQkFDbEIsUUFBUSxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSTtnQkFDN0IsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRTthQUN4QyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsQ0FBQyxVQUFVLEtBQUssSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztZQUUxQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsVUFBVSxDQUFDO1lBRXBDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1NBRXhDO0tBRUY7Ozs7O0lBRUQsd0NBQVE7Ozs7SUFBUixVQUFTLEVBQVk7WUFBVixzQkFBUTtRQUNqQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5QyxDQUFBLEtBQUEsSUFBSSxDQUFDLFFBQVEsQ0FBQSxDQUFDLElBQUksNEJBQUksUUFBUSxHQUFFOztLQUNqQzs7Ozs7SUFFRCwyQ0FBVzs7OztJQUFYLFVBQVksTUFBTTs7UUFFaEIsSUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDOztRQUVyQixJQUFNLElBQUksR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDOztRQUV4QixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDOztRQUV2QixJQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztRQUVqQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssT0FBQSxFQUFFLElBQUksTUFBQSxFQUFFLElBQUksTUFBQSxFQUFFLEtBQUssT0FBQSxFQUFFLENBQUMsQ0FBQztLQUVsRDs7Z0JBakhGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixRQUFRLEVBQUUscXdDQTJDWDtvQkFDQyxNQUFNLEVBQUUsQ0FBQywyeUNBQTJ5QyxDQUFDO2lCQUN0ekM7Ozs7O3VCQUdFLEtBQUs7NkJBV0wsS0FBSztpQ0FJTCxTQUFTLFNBQUMsa0JBQWtCOzBCQU01QixlQUFlLFNBQUMsMkJBQTJCO3VCQUUzQyxNQUFNOzJCQUVOLE1BQU07O2dDQS9FVDs7U0FvRGEscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDb250ZW50Q2hpbGRyZW4sIFF1ZXJ5TGlzdCwgVmlld0NoaWxkLCBFdmVudEVtaXR0ZXIsIE91dHB1dCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERlY0xpc3RUYWJsZUNvbHVtbkNvbXBvbmVudCB9IGZyb20gJy4vLi4vbGlzdC10YWJsZS1jb2x1bW4vbGlzdC10YWJsZS1jb2x1bW4uY29tcG9uZW50JztcbmltcG9ydCB7IERhdGF0YWJsZUNvbXBvbmVudCB9IGZyb20gJ0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWxpc3QtdGFibGUnLFxuICB0ZW1wbGF0ZTogYDxuZ3gtZGF0YXRhYmxlICN0YWJsZUNvbXBvbmVudFxuICBjb2x1bW5Nb2RlPVwiZmxleFwiXG4gIGhlYWRlckhlaWdodD1cIjI0cHhcIlxuICByb3dIZWlnaHQ9XCJhdXRvXCJcbiAgW2V4dGVybmFsU29ydGluZ109XCJ0cnVlXCJcbiAgW21lc3NhZ2VzXT1cIntlbXB0eU1lc3NhZ2U6Jyd9XCJcbiAgW3Jvd3NdPVwicm93c1wiXG4gIFtzZWxlY3RlZF09XCJzZWxlY3RlZFwiXG4gIFtzZWxlY3Rpb25UeXBlXT1cIidjaGVja2JveCdcIlxuICBbc2VsZWN0QWxsUm93c09uUGFnZV09XCJmYWxzZVwiXG4gIChzZWxlY3QpPVwib25TZWxlY3QoJGV2ZW50KVwiXG4gIChzb3J0KT1cIm9uU29ydCgkZXZlbnQpXCJcbiAgKGFjdGl2YXRlKT1cIm9uSXRlbUNsaWNrKCRldmVudClcIj5cblxuICA8bmd4LWRhdGF0YWJsZS1jb2x1bW5cbiAgICAqbmdJZj1cInNlbGVjdGFibGVcIlxuICAgIFt3aWR0aF09XCI0MFwiXG4gICAgW2NhbkF1dG9SZXNpemVdPVwiZmFsc2VcIlxuICAgIFtoZWFkZXJDaGVja2JveGFibGVdPVwidHJ1ZVwiXG4gICAgW2NoZWNrYm94YWJsZV09XCJ0cnVlXCI+XG4gIDwvbmd4LWRhdGF0YWJsZS1jb2x1bW4+XG5cbiAgPG5neC1kYXRhdGFibGUtY29sdW1uICpuZ0Zvcj1cImxldCBjb2x1bW4gb2YgY29sdW1ucztcIlxuICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJ7e2NvbHVtbi50aXRsZSB8IHRyYW5zbGF0ZX19XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICBbZmxleEdyb3ddPVwiY29sdW1uLmNvbFNwYW5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgIFtwcm9wXT1cImNvbHVtbi5wcm9wXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICBbc29ydGFibGVdPVwiY29sdW1uLnByb3AgPyB0cnVlIDogZmFsc2VcIj5cblxuICAgIDxuZy10ZW1wbGF0ZSAqbmdJZj1cImNvbHVtbi50ZW1wbGF0ZSA/IHRydWUgOiBmYWxzZVwiXG4gICAgICBsZXQtcm93PVwicm93XCJcbiAgICAgIGxldC1pbmRleD1cInJvd0luZGV4XCJcbiAgICAgIG5neC1kYXRhdGFibGUtY2VsbC10ZW1wbGF0ZT5cblxuICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJjb2x1bW4udGVtcGxhdGVcIlxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie3Jvdzogcm93IHx8IHt9LCBsaXN0OiByb3dzIHx8IFtdLCBpbmRleDogaW5kZXh9XCJcbiAgICAgID48L25nLWNvbnRhaW5lcj5cblxuICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgPC9uZ3gtZGF0YXRhYmxlLWNvbHVtbj5cblxuPC9uZ3gtZGF0YXRhYmxlPlxuYCxcbiAgc3R5bGVzOiBbYDo6bmctZGVlcCAubmd4LWRhdGF0YWJsZSAub3ZlcmZsb3ctdmlzaWJsZXtvdmVyZmxvdzp2aXNpYmxlIWltcG9ydGFudH06Om5nLWRlZXAgZGF0YXRhYmxlLXNjcm9sbGVye3dpZHRoOjEwMCUhaW1wb3J0YW50fTo6bmctZGVlcCAubmd4LWRhdGF0YWJsZS5uby1vdmVyZmxvd3tvdmVyZmxvdzphdXRvfTo6bmctZGVlcCAubmd4LWRhdGF0YWJsZS5uby1wYWRkaW5nIC5kYXRhdGFibGUtYm9keS1yb3cgLmRhdGF0YWJsZS1ib2R5LWNlbGwgLmRhdGF0YWJsZS1ib2R5LWNlbGwtbGFiZWx7cGFkZGluZzowfTo6bmctZGVlcCAubmd4LWRhdGF0YWJsZSAuZGF0YXRhYmxlLWhlYWRlcntwYWRkaW5nOjExcHggMTZweH06Om5nLWRlZXAgLm5neC1kYXRhdGFibGUgLmRhdGF0YWJsZS1oZWFkZXIgLmRhdGF0YWJsZS1oZWFkZXItY2VsbC1sYWJlbHtmb250LXNpemU6MTJweDtmb250LXdlaWdodDo1MDB9OjpuZy1kZWVwIC5uZ3gtZGF0YXRhYmxlIC5kYXRhdGFibGUtYm9keS1yb3cgLmRhdGF0YWJsZS1ib2R5LWNlbGx7Zm9udC1zaXplOjEzcHg7Zm9udC13ZWlnaHQ6NDAwO292ZXJmbG93OmhpZGRlbjttaW4taGVpZ2h0OjEwMCU7ZGlzcGxheTp0YWJsZTstd2Via2l0LXVzZXItc2VsZWN0OmluaXRpYWw7LW1vei11c2VyLXNlbGVjdDppbml0aWFsOy1tcy11c2VyLXNlbGVjdDppbml0aWFsOy1vLXVzZXItc2VsZWN0OmluaXRpYWw7dXNlci1zZWxlY3Q6aW5pdGlhbH06Om5nLWRlZXAgLm5neC1kYXRhdGFibGUgLmRhdGF0YWJsZS1ib2R5LXJvdyAuZGF0YXRhYmxlLWJvZHktY2VsbCAuZGF0YXRhYmxlLWJvZHktY2VsbC1sYWJlbHtwYWRkaW5nOjE2cHg7ZGlzcGxheTp0YWJsZS1jZWxsO3ZlcnRpY2FsLWFsaWduOm1pZGRsZTt3b3JkLWJyZWFrOmJyZWFrLWFsbH06Om5nLWRlZXAgLm5neC1kYXRhdGFibGUgLmRhdGF0YWJsZS1ib2R5LXJvdyAuZGF0YXRhYmxlLWJvZHktY2VsbC5jZWxsLXRvcCAuZGF0YXRhYmxlLWJvZHktY2VsbC1sYWJlbHt2ZXJ0aWNhbC1hbGlnbjp0b3B9OjpuZy1kZWVwIC5uZ3gtZGF0YXRhYmxlIC5kYXRhdGFibGUtcm93LWRldGFpbHtwYWRkaW5nOjEwcHh9OjpuZy1kZWVwIC5uZ3gtZGF0YXRhYmxlIC5zb3J0LWJ0bnt3aWR0aDowO2hlaWdodDowfTo6bmctZGVlcCAubmd4LWRhdGF0YWJsZSAuaWNvbi1kb3due2JvcmRlci1sZWZ0OjVweCBzb2xpZCB0cmFuc3BhcmVudDtib3JkZXItcmlnaHQ6NXB4IHNvbGlkIHRyYW5zcGFyZW50fTo6bmctZGVlcCAubmd4LWRhdGF0YWJsZSAuaWNvbi11cHtib3JkZXItbGVmdDo1cHggc29saWQgdHJhbnNwYXJlbnQ7Ym9yZGVyLXJpZ2h0OjVweCBzb2xpZCB0cmFuc3BhcmVudH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNMaXN0VGFibGVDb21wb25lbnQge1xuXG4gIEBJbnB1dCgpXG4gIHNldCByb3dzKHYpIHtcbiAgICBpZiAodGhpcy5fcm93cyAhPT0gdikge1xuICAgICAgdGhpcy5fcm93cyA9IHY7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHJvd3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Jvd3M7XG4gIH1cblxuICBASW5wdXQoKSBzZWxlY3RhYmxlOiBib29sZWFuO1xuXG4gIHNlbGVjdGVkOiBhbnlbXSA9IFtdOyAvLyBmcm9tIGxpc3QgY29tcG9uZW50XG5cbiAgQFZpZXdDaGlsZChEYXRhdGFibGVDb21wb25lbnQpIHRhYmxlQ29tcG9uZW50OiBEYXRhdGFibGVDb21wb25lbnQ7XG5cbiAgY29sdW1uc1NvcnRDb25maWc6IGFueTtcblxuICBwcml2YXRlIF9yb3dzOiBBcnJheTxhbnk+ID0gW107XG5cbiAgQENvbnRlbnRDaGlsZHJlbihEZWNMaXN0VGFibGVDb2x1bW5Db21wb25lbnQpIGNvbHVtbnM6IFF1ZXJ5TGlzdDxEZWNMaXN0VGFibGVDb2x1bW5Db21wb25lbnQ+O1xuXG4gIEBPdXRwdXQoKSBzb3J0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSByb3dDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG9uU29ydChldmVudCkge1xuXG4gICAgY29uc3Qgc29ydENvbmZpZyA9IFt7XG4gICAgICBwcm9wZXJ0eTogZXZlbnQuc29ydHNbMF0ucHJvcCxcbiAgICAgIG9yZGVyOiBldmVudC5zb3J0c1swXS5kaXIudG9VcHBlckNhc2UoKVxuICAgIH1dO1xuXG4gICAgaWYgKHNvcnRDb25maWcgIT09IHRoaXMuY29sdW1uc1NvcnRDb25maWcpIHtcblxuICAgICAgdGhpcy5jb2x1bW5zU29ydENvbmZpZyA9IHNvcnRDb25maWc7XG5cbiAgICAgIHRoaXMuc29ydC5lbWl0KHRoaXMuY29sdW1uc1NvcnRDb25maWcpO1xuXG4gICAgfVxuXG4gIH1cblxuICBvblNlbGVjdCh7IHNlbGVjdGVkIH0pIHtcbiAgICB0aGlzLnNlbGVjdGVkLnNwbGljZSgwLCB0aGlzLnNlbGVjdGVkLmxlbmd0aCk7XG4gICAgdGhpcy5zZWxlY3RlZC5wdXNoKC4uLnNlbGVjdGVkKTtcbiAgfVxuXG4gIG9uSXRlbUNsaWNrKCRldmVudCkge1xuXG4gICAgY29uc3QgZXZlbnQgPSAkZXZlbnQ7XG5cbiAgICBjb25zdCBpdGVtID0gJGV2ZW50LnJvdztcblxuICAgIGNvbnN0IGxpc3QgPSB0aGlzLnJvd3M7XG5cbiAgICBjb25zdCBpbmRleCA9ICRldmVudC5yb3cuJCRpbmRleDtcblxuICAgIHRoaXMucm93Q2xpY2suZW1pdCh7IGV2ZW50LCBpdGVtLCBsaXN0LCBpbmRleCB9KTtcblxuICB9XG59XG4iXX0=