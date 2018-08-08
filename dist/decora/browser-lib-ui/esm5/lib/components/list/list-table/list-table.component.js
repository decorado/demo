/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ContentChildren, QueryList, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { DecListTableColumnComponent } from './../list-table-column/list-table-column.component';
import { DatatableComponent } from '@swimlane/ngx-datatable';
var DecListTableComponent = /** @class */ (function () {
    function DecListTableComponent() {
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
        var /** @type {?} */ sortConfig = [{
                property: event.sorts[0].prop,
                order: { type: event.sorts[0].dir }
            }];
        if (sortConfig !== this.columnsSortConfig) {
            this.columnsSortConfig = sortConfig;
            this.sort.emit(this.columnsSortConfig);
        }
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
        var /** @type {?} */ event = $event;
        var /** @type {?} */ item = $event.row;
        var /** @type {?} */ list = this.rows;
        var /** @type {?} */ index = $event.row.$$index;
        this.rowClick.emit({ event: event, item: item, list: list, index: index });
    };
    DecListTableComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-list-table',
                    template: "<ngx-datatable #tableComponent\n  columnMode=\"flex\"\n  headerHeight=\"24px\"\n  rowHeight=\"auto\"\n  [externalSorting]=\"true\"\n  [messages]=\"{emptyMessage:''}\"\n  [rows]=\"rows\"\n  (sort)=\"onSort($event)\"\n  (activate)=\"onItemClick($event)\">\n\n  <ngx-datatable-column *ngFor=\"let column of columns;\"\n                         name=\"{{column.title | translate}}\"\n                         [flexGrow]=\"column.colSpan\"\n                         [prop]=\"column.prop\"\n                         [sortable]=\"column.prop ? true : false\">\n\n    <ng-template *ngIf=\"column.template ? true : false\"\n      let-row=\"row\"\n      let-index=\"rowIndex\"\n      ngx-datatable-cell-template>\n\n      <ng-container\n        [ngTemplateOutlet]=\"column.template\"\n        [ngTemplateOutletContext]=\"{row: row || {}, list: rows || [], index: index}\"\n      ></ng-container>\n\n    </ng-template>\n\n  </ngx-datatable-column>\n\n</ngx-datatable>\n",
                    styles: ["::ng-deep .ngx-datatable .overflow-visible{overflow:visible!important}::ng-deep datatable-scroller{width:100%!important}::ng-deep .ngx-datatable.no-overflow{overflow:auto}::ng-deep .ngx-datatable.no-padding .datatable-body-row .datatable-body-cell .datatable-body-cell-label{padding:0}::ng-deep .ngx-datatable .datatable-header{padding:11px 16px}::ng-deep .ngx-datatable .datatable-header .datatable-header-cell-label{font-size:12px;font-weight:500}::ng-deep .ngx-datatable .datatable-body-row .datatable-body-cell{font-size:13px;font-weight:400;overflow:hidden;min-height:100%;display:table;-webkit-user-select:initial;-moz-user-select:initial;-ms-user-select:initial;-o-user-select:initial;user-select:initial}::ng-deep .ngx-datatable .datatable-body-row .datatable-body-cell .datatable-body-cell-label{padding:16px;display:table-cell;vertical-align:middle;word-break:break-all}::ng-deep .ngx-datatable .datatable-body-row .datatable-body-cell.cell-top .datatable-body-cell-label{vertical-align:top}::ng-deep .ngx-datatable .datatable-row-detail{padding:10px}::ng-deep .ngx-datatable .sort-btn{width:0;height:0}::ng-deep .ngx-datatable .icon-down{border-left:5px solid transparent;border-right:5px solid transparent}::ng-deep .ngx-datatable .icon-up{border-left:5px solid transparent;border-right:5px solid transparent}"]
                },] },
    ];
    /** @nocollapse */
    DecListTableComponent.ctorParameters = function () { return []; };
    DecListTableComponent.propDecorators = {
        rows: [{ type: Input }],
        tableComponent: [{ type: ViewChild, args: [DatatableComponent,] }],
        columns: [{ type: ContentChildren, args: [DecListTableColumnComponent,] }],
        sort: [{ type: Output }],
        rowClick: [{ type: Output }]
    };
    return DecListTableComponent;
}());
export { DecListTableComponent };
function DecListTableComponent_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC10YWJsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvbGlzdC9saXN0LXRhYmxlL2xpc3QtdGFibGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlHLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLG9EQUFvRCxDQUFDO0FBQ2pHLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDOztJQStEM0Q7cUJBUjRCLEVBQUU7b0JBSU0sSUFBSSxZQUFZLEVBQU87d0JBRW5CLElBQUksWUFBWSxFQUFPO0tBRTlDO0lBdkJqQixzQkFDSSx1Q0FBSTs7OztRQU1SO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7U0FDbkI7Ozs7O1FBVEQsVUFDUyxDQUFDO1lBQ1IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQzthQUNoQjtTQUNGOzs7T0FBQTs7Ozs7SUFvQkQsc0NBQU07Ozs7SUFBTixVQUFPLEtBQUs7UUFFVixxQkFBTSxVQUFVLEdBQUcsQ0FBQztnQkFDbEIsUUFBUSxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSTtnQkFDN0IsS0FBSyxFQUFFLEVBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFDO2FBQ2xDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxDQUFDLFVBQVUsS0FBSyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1lBRTFDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxVQUFVLENBQUM7WUFFcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7U0FFeEM7S0FFRjs7Ozs7SUFFRCwyQ0FBVzs7OztJQUFYLFVBQVksTUFBTTtRQUVoQixxQkFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDO1FBRXJCLHFCQUFNLElBQUksR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDO1FBRXhCLHFCQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBRXZCLHFCQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztRQUVqQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssT0FBQSxFQUFFLElBQUksTUFBQSxFQUFFLElBQUksTUFBQSxFQUFFLEtBQUssT0FBQSxFQUFDLENBQUMsQ0FBQztLQUVoRDs7Z0JBNUZGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixRQUFRLEVBQUUsZzhCQStCWDtvQkFDQyxNQUFNLEVBQUUsQ0FBQywyeUNBQTJ5QyxDQUFDO2lCQUN0ekM7Ozs7O3VCQUdFLEtBQUs7aUNBV0wsU0FBUyxTQUFDLGtCQUFrQjswQkFNNUIsZUFBZSxTQUFDLDJCQUEyQjt1QkFFM0MsTUFBTTsyQkFFTixNQUFNOztnQ0EvRFQ7O1NBd0NhLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQ29udGVudENoaWxkcmVuLCBRdWVyeUxpc3QsIFZpZXdDaGlsZCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWNMaXN0VGFibGVDb2x1bW5Db21wb25lbnQgfSBmcm9tICcuLy4uL2xpc3QtdGFibGUtY29sdW1uL2xpc3QtdGFibGUtY29sdW1uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEYXRhdGFibGVDb21wb25lbnQgfSBmcm9tICdAc3dpbWxhbmUvbmd4LWRhdGF0YWJsZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1saXN0LXRhYmxlJyxcbiAgdGVtcGxhdGU6IGA8bmd4LWRhdGF0YWJsZSAjdGFibGVDb21wb25lbnRcbiAgY29sdW1uTW9kZT1cImZsZXhcIlxuICBoZWFkZXJIZWlnaHQ9XCIyNHB4XCJcbiAgcm93SGVpZ2h0PVwiYXV0b1wiXG4gIFtleHRlcm5hbFNvcnRpbmddPVwidHJ1ZVwiXG4gIFttZXNzYWdlc109XCJ7ZW1wdHlNZXNzYWdlOicnfVwiXG4gIFtyb3dzXT1cInJvd3NcIlxuICAoc29ydCk9XCJvblNvcnQoJGV2ZW50KVwiXG4gIChhY3RpdmF0ZSk9XCJvbkl0ZW1DbGljaygkZXZlbnQpXCI+XG5cbiAgPG5neC1kYXRhdGFibGUtY29sdW1uICpuZ0Zvcj1cImxldCBjb2x1bW4gb2YgY29sdW1ucztcIlxuICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJ7e2NvbHVtbi50aXRsZSB8IHRyYW5zbGF0ZX19XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICBbZmxleEdyb3ddPVwiY29sdW1uLmNvbFNwYW5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgIFtwcm9wXT1cImNvbHVtbi5wcm9wXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICBbc29ydGFibGVdPVwiY29sdW1uLnByb3AgPyB0cnVlIDogZmFsc2VcIj5cblxuICAgIDxuZy10ZW1wbGF0ZSAqbmdJZj1cImNvbHVtbi50ZW1wbGF0ZSA/IHRydWUgOiBmYWxzZVwiXG4gICAgICBsZXQtcm93PVwicm93XCJcbiAgICAgIGxldC1pbmRleD1cInJvd0luZGV4XCJcbiAgICAgIG5neC1kYXRhdGFibGUtY2VsbC10ZW1wbGF0ZT5cblxuICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJjb2x1bW4udGVtcGxhdGVcIlxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie3Jvdzogcm93IHx8IHt9LCBsaXN0OiByb3dzIHx8IFtdLCBpbmRleDogaW5kZXh9XCJcbiAgICAgID48L25nLWNvbnRhaW5lcj5cblxuICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgPC9uZ3gtZGF0YXRhYmxlLWNvbHVtbj5cblxuPC9uZ3gtZGF0YXRhYmxlPlxuYCxcbiAgc3R5bGVzOiBbYDo6bmctZGVlcCAubmd4LWRhdGF0YWJsZSAub3ZlcmZsb3ctdmlzaWJsZXtvdmVyZmxvdzp2aXNpYmxlIWltcG9ydGFudH06Om5nLWRlZXAgZGF0YXRhYmxlLXNjcm9sbGVye3dpZHRoOjEwMCUhaW1wb3J0YW50fTo6bmctZGVlcCAubmd4LWRhdGF0YWJsZS5uby1vdmVyZmxvd3tvdmVyZmxvdzphdXRvfTo6bmctZGVlcCAubmd4LWRhdGF0YWJsZS5uby1wYWRkaW5nIC5kYXRhdGFibGUtYm9keS1yb3cgLmRhdGF0YWJsZS1ib2R5LWNlbGwgLmRhdGF0YWJsZS1ib2R5LWNlbGwtbGFiZWx7cGFkZGluZzowfTo6bmctZGVlcCAubmd4LWRhdGF0YWJsZSAuZGF0YXRhYmxlLWhlYWRlcntwYWRkaW5nOjExcHggMTZweH06Om5nLWRlZXAgLm5neC1kYXRhdGFibGUgLmRhdGF0YWJsZS1oZWFkZXIgLmRhdGF0YWJsZS1oZWFkZXItY2VsbC1sYWJlbHtmb250LXNpemU6MTJweDtmb250LXdlaWdodDo1MDB9OjpuZy1kZWVwIC5uZ3gtZGF0YXRhYmxlIC5kYXRhdGFibGUtYm9keS1yb3cgLmRhdGF0YWJsZS1ib2R5LWNlbGx7Zm9udC1zaXplOjEzcHg7Zm9udC13ZWlnaHQ6NDAwO292ZXJmbG93OmhpZGRlbjttaW4taGVpZ2h0OjEwMCU7ZGlzcGxheTp0YWJsZTstd2Via2l0LXVzZXItc2VsZWN0OmluaXRpYWw7LW1vei11c2VyLXNlbGVjdDppbml0aWFsOy1tcy11c2VyLXNlbGVjdDppbml0aWFsOy1vLXVzZXItc2VsZWN0OmluaXRpYWw7dXNlci1zZWxlY3Q6aW5pdGlhbH06Om5nLWRlZXAgLm5neC1kYXRhdGFibGUgLmRhdGF0YWJsZS1ib2R5LXJvdyAuZGF0YXRhYmxlLWJvZHktY2VsbCAuZGF0YXRhYmxlLWJvZHktY2VsbC1sYWJlbHtwYWRkaW5nOjE2cHg7ZGlzcGxheTp0YWJsZS1jZWxsO3ZlcnRpY2FsLWFsaWduOm1pZGRsZTt3b3JkLWJyZWFrOmJyZWFrLWFsbH06Om5nLWRlZXAgLm5neC1kYXRhdGFibGUgLmRhdGF0YWJsZS1ib2R5LXJvdyAuZGF0YXRhYmxlLWJvZHktY2VsbC5jZWxsLXRvcCAuZGF0YXRhYmxlLWJvZHktY2VsbC1sYWJlbHt2ZXJ0aWNhbC1hbGlnbjp0b3B9OjpuZy1kZWVwIC5uZ3gtZGF0YXRhYmxlIC5kYXRhdGFibGUtcm93LWRldGFpbHtwYWRkaW5nOjEwcHh9OjpuZy1kZWVwIC5uZ3gtZGF0YXRhYmxlIC5zb3J0LWJ0bnt3aWR0aDowO2hlaWdodDowfTo6bmctZGVlcCAubmd4LWRhdGF0YWJsZSAuaWNvbi1kb3due2JvcmRlci1sZWZ0OjVweCBzb2xpZCB0cmFuc3BhcmVudDtib3JkZXItcmlnaHQ6NXB4IHNvbGlkIHRyYW5zcGFyZW50fTo6bmctZGVlcCAubmd4LWRhdGF0YWJsZSAuaWNvbi11cHtib3JkZXItbGVmdDo1cHggc29saWQgdHJhbnNwYXJlbnQ7Ym9yZGVyLXJpZ2h0OjVweCBzb2xpZCB0cmFuc3BhcmVudH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNMaXN0VGFibGVDb21wb25lbnQge1xuXG4gIEBJbnB1dCgpXG4gIHNldCByb3dzKHYpIHtcbiAgICBpZiAodGhpcy5fcm93cyAhPT0gdikge1xuICAgICAgdGhpcy5fcm93cyA9IHY7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHJvd3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Jvd3M7XG4gIH1cblxuICBAVmlld0NoaWxkKERhdGF0YWJsZUNvbXBvbmVudCkgdGFibGVDb21wb25lbnQ6IERhdGF0YWJsZUNvbXBvbmVudDtcblxuICBjb2x1bW5zU29ydENvbmZpZzogYW55O1xuXG4gIHByaXZhdGUgX3Jvd3M6IEFycmF5PGFueT4gPSBbXTtcblxuICBAQ29udGVudENoaWxkcmVuKERlY0xpc3RUYWJsZUNvbHVtbkNvbXBvbmVudCkgY29sdW1uczogUXVlcnlMaXN0PERlY0xpc3RUYWJsZUNvbHVtbkNvbXBvbmVudD47XG5cbiAgQE91dHB1dCgpIHNvcnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIHJvd0NsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgb25Tb3J0KGV2ZW50KSB7XG5cbiAgICBjb25zdCBzb3J0Q29uZmlnID0gW3tcbiAgICAgIHByb3BlcnR5OiBldmVudC5zb3J0c1swXS5wcm9wLFxuICAgICAgb3JkZXI6IHt0eXBlOiBldmVudC5zb3J0c1swXS5kaXJ9XG4gICAgfV07XG5cbiAgICBpZiAoc29ydENvbmZpZyAhPT0gdGhpcy5jb2x1bW5zU29ydENvbmZpZykge1xuXG4gICAgICB0aGlzLmNvbHVtbnNTb3J0Q29uZmlnID0gc29ydENvbmZpZztcblxuICAgICAgdGhpcy5zb3J0LmVtaXQodGhpcy5jb2x1bW5zU29ydENvbmZpZyk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIG9uSXRlbUNsaWNrKCRldmVudCkge1xuXG4gICAgY29uc3QgZXZlbnQgPSAkZXZlbnQ7XG5cbiAgICBjb25zdCBpdGVtID0gJGV2ZW50LnJvdztcblxuICAgIGNvbnN0IGxpc3QgPSB0aGlzLnJvd3M7XG5cbiAgICBjb25zdCBpbmRleCA9ICRldmVudC5yb3cuJCRpbmRleDtcblxuICAgIHRoaXMucm93Q2xpY2suZW1pdCh7ZXZlbnQsIGl0ZW0sIGxpc3QsIGluZGV4fSk7XG5cbiAgfVxufVxuIl19