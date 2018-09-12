/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ContentChildren, QueryList, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { DecListTableColumnComponent } from './../list-table-column/list-table-column.component';
import { DatatableComponent } from '@swimlane/ngx-datatable';
export class DecListTableComponent {
    constructor() {
        this.selected = [];
        this._rows = [];
        this.sort = new EventEmitter();
        this.rowClick = new EventEmitter();
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set rows(v) {
        if (this._rows !== v) {
            this._rows = v;
        }
    }
    /**
     * @return {?}
     */
    get rows() {
        return this._rows;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onSort(event) {
        /** @type {?} */
        const sortConfig = [{
                property: event.sorts[0].prop,
                order: event.sorts[0].dir.toUpperCase()
            }];
        if (sortConfig !== this.columnsSortConfig) {
            this.columnsSortConfig = sortConfig;
            this.sort.emit(this.columnsSortConfig);
        }
    }
    /**
     * @param {?} __0
     * @return {?}
     */
    onSelect({ selected }) {
        this.selected.splice(0, this.selected.length);
        this.selected.push(...selected);
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onItemClick($event) {
        /** @type {?} */
        const event = $event;
        /** @type {?} */
        const item = $event.row;
        /** @type {?} */
        const list = this.rows;
        /** @type {?} */
        const index = $event.row.$$index;
        this.rowClick.emit({ event, item, list, index });
    }
}
DecListTableComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-list-table',
                template: `<ngx-datatable #tableComponent
  columnMode="flex"
  headerHeight="24px"
  rowHeight="auto"
  [externalSorting]="true"
  [messages]="{emptyMessage:''}"
  [rows]="rows"
  [selected]="selected"
  [selectionType]="'checkbox'"
  [selectAllRowsOnPage]="false"
  (select)="onSelect($event)"
  (sort)="onSort($event)"
  (activate)="onItemClick($event)">

  <ngx-datatable-column
    *ngIf="selectable"
    [width]="40"
    [canAutoResize]="false"
    [headerCheckboxable]="true"
    [checkboxable]="true">
  </ngx-datatable-column>

  <ngx-datatable-column *ngFor="let column of columns;"
                         name="{{column.title | translate}}"
                         [flexGrow]="column.colSpan"
                         [prop]="column.prop"
                         [sortable]="column.prop ? true : false">

    <ng-template *ngIf="column.template ? true : false"
      let-row="row"
      let-index="rowIndex"
      ngx-datatable-cell-template>

      <ng-container
        [ngTemplateOutlet]="column.template"
        [ngTemplateOutletContext]="{row: row || {}, list: rows || [], index: index}"
      ></ng-container>

    </ng-template>

  </ngx-datatable-column>

</ngx-datatable>
`,
                styles: [`::ng-deep .ngx-datatable .overflow-visible{overflow:visible!important}::ng-deep datatable-scroller{width:100%!important}::ng-deep .ngx-datatable.no-overflow{overflow:auto}::ng-deep .ngx-datatable.no-padding .datatable-body-row .datatable-body-cell .datatable-body-cell-label{padding:0}::ng-deep .ngx-datatable .datatable-header{padding:11px 16px}::ng-deep .ngx-datatable .datatable-header .datatable-header-cell-label{font-size:12px;font-weight:500}::ng-deep .ngx-datatable .datatable-body-row .datatable-body-cell{font-size:13px;font-weight:400;overflow:hidden;min-height:100%;display:table;-webkit-user-select:initial;-moz-user-select:initial;-ms-user-select:initial;-o-user-select:initial;user-select:initial}::ng-deep .ngx-datatable .datatable-body-row .datatable-body-cell .datatable-body-cell-label{padding:16px;display:table-cell;vertical-align:middle;word-break:break-all}::ng-deep .ngx-datatable .datatable-body-row .datatable-body-cell.cell-top .datatable-body-cell-label{vertical-align:top}::ng-deep .ngx-datatable .datatable-row-detail{padding:10px}::ng-deep .ngx-datatable .sort-btn{width:0;height:0}::ng-deep .ngx-datatable .icon-down{border-left:5px solid transparent;border-right:5px solid transparent}::ng-deep .ngx-datatable .icon-up{border-left:5px solid transparent;border-right:5px solid transparent}`]
            },] },
];
/** @nocollapse */
DecListTableComponent.ctorParameters = () => [];
DecListTableComponent.propDecorators = {
    rows: [{ type: Input }],
    selectable: [{ type: Input }],
    tableComponent: [{ type: ViewChild, args: [DatatableComponent,] }],
    columns: [{ type: ContentChildren, args: [DecListTableColumnComponent,] }],
    sort: [{ type: Output }],
    rowClick: [{ type: Output }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC10YWJsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvbGlzdC9saXN0LXRhYmxlL2xpc3QtdGFibGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlHLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLG9EQUFvRCxDQUFDO0FBQ2pHLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBa0Q3RCxNQUFNO0lBNkJKO3dCQWRXLEVBQUU7cUJBTWUsRUFBRTtvQkFJTSxJQUFJLFlBQVksRUFBTzt3QkFFbkIsSUFBSSxZQUFZLEVBQU87S0FFOUM7Ozs7O0lBM0JqQixJQUNJLElBQUksQ0FBQyxDQUFDO1FBQ1IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1NBQ2hCO0tBQ0Y7Ozs7SUFFRCxJQUFJLElBQUk7UUFDTixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztLQUNuQjs7Ozs7SUFvQkQsTUFBTSxDQUFDLEtBQUs7O1FBRVYsTUFBTSxVQUFVLEdBQUcsQ0FBQztnQkFDbEIsUUFBUSxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSTtnQkFDN0IsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRTthQUN4QyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsQ0FBQyxVQUFVLEtBQUssSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztZQUUxQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsVUFBVSxDQUFDO1lBRXBDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1NBRXhDO0tBRUY7Ozs7O0lBRUQsUUFBUSxDQUFDLEVBQUUsUUFBUSxFQUFFO1FBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUM7S0FDakM7Ozs7O0lBRUQsV0FBVyxDQUFDLE1BQU07O1FBRWhCLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQzs7UUFFckIsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQzs7UUFFeEIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQzs7UUFFdkIsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7UUFFakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0tBRWxEOzs7WUFqSEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQTJDWDtnQkFDQyxNQUFNLEVBQUUsQ0FBQywyeUNBQTJ5QyxDQUFDO2FBQ3R6Qzs7Ozs7bUJBR0UsS0FBSzt5QkFXTCxLQUFLOzZCQUlMLFNBQVMsU0FBQyxrQkFBa0I7c0JBTTVCLGVBQWUsU0FBQywyQkFBMkI7bUJBRTNDLE1BQU07dUJBRU4sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQ29udGVudENoaWxkcmVuLCBRdWVyeUxpc3QsIFZpZXdDaGlsZCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWNMaXN0VGFibGVDb2x1bW5Db21wb25lbnQgfSBmcm9tICcuLy4uL2xpc3QtdGFibGUtY29sdW1uL2xpc3QtdGFibGUtY29sdW1uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEYXRhdGFibGVDb21wb25lbnQgfSBmcm9tICdAc3dpbWxhbmUvbmd4LWRhdGF0YWJsZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1saXN0LXRhYmxlJyxcbiAgdGVtcGxhdGU6IGA8bmd4LWRhdGF0YWJsZSAjdGFibGVDb21wb25lbnRcbiAgY29sdW1uTW9kZT1cImZsZXhcIlxuICBoZWFkZXJIZWlnaHQ9XCIyNHB4XCJcbiAgcm93SGVpZ2h0PVwiYXV0b1wiXG4gIFtleHRlcm5hbFNvcnRpbmddPVwidHJ1ZVwiXG4gIFttZXNzYWdlc109XCJ7ZW1wdHlNZXNzYWdlOicnfVwiXG4gIFtyb3dzXT1cInJvd3NcIlxuICBbc2VsZWN0ZWRdPVwic2VsZWN0ZWRcIlxuICBbc2VsZWN0aW9uVHlwZV09XCInY2hlY2tib3gnXCJcbiAgW3NlbGVjdEFsbFJvd3NPblBhZ2VdPVwiZmFsc2VcIlxuICAoc2VsZWN0KT1cIm9uU2VsZWN0KCRldmVudClcIlxuICAoc29ydCk9XCJvblNvcnQoJGV2ZW50KVwiXG4gIChhY3RpdmF0ZSk9XCJvbkl0ZW1DbGljaygkZXZlbnQpXCI+XG5cbiAgPG5neC1kYXRhdGFibGUtY29sdW1uXG4gICAgKm5nSWY9XCJzZWxlY3RhYmxlXCJcbiAgICBbd2lkdGhdPVwiNDBcIlxuICAgIFtjYW5BdXRvUmVzaXplXT1cImZhbHNlXCJcbiAgICBbaGVhZGVyQ2hlY2tib3hhYmxlXT1cInRydWVcIlxuICAgIFtjaGVja2JveGFibGVdPVwidHJ1ZVwiPlxuICA8L25neC1kYXRhdGFibGUtY29sdW1uPlxuXG4gIDxuZ3gtZGF0YXRhYmxlLWNvbHVtbiAqbmdGb3I9XCJsZXQgY29sdW1uIG9mIGNvbHVtbnM7XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwie3tjb2x1bW4udGl0bGUgfCB0cmFuc2xhdGV9fVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgW2ZsZXhHcm93XT1cImNvbHVtbi5jb2xTcGFuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICBbcHJvcF09XCJjb2x1bW4ucHJvcFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgW3NvcnRhYmxlXT1cImNvbHVtbi5wcm9wID8gdHJ1ZSA6IGZhbHNlXCI+XG5cbiAgICA8bmctdGVtcGxhdGUgKm5nSWY9XCJjb2x1bW4udGVtcGxhdGUgPyB0cnVlIDogZmFsc2VcIlxuICAgICAgbGV0LXJvdz1cInJvd1wiXG4gICAgICBsZXQtaW5kZXg9XCJyb3dJbmRleFwiXG4gICAgICBuZ3gtZGF0YXRhYmxlLWNlbGwtdGVtcGxhdGU+XG5cbiAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY29sdW1uLnRlbXBsYXRlXCJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntyb3c6IHJvdyB8fCB7fSwgbGlzdDogcm93cyB8fCBbXSwgaW5kZXg6IGluZGV4fVwiXG4gICAgICA+PC9uZy1jb250YWluZXI+XG5cbiAgICA8L25nLXRlbXBsYXRlPlxuXG4gIDwvbmd4LWRhdGF0YWJsZS1jb2x1bW4+XG5cbjwvbmd4LWRhdGF0YWJsZT5cbmAsXG4gIHN0eWxlczogW2A6Om5nLWRlZXAgLm5neC1kYXRhdGFibGUgLm92ZXJmbG93LXZpc2libGV7b3ZlcmZsb3c6dmlzaWJsZSFpbXBvcnRhbnR9OjpuZy1kZWVwIGRhdGF0YWJsZS1zY3JvbGxlcnt3aWR0aDoxMDAlIWltcG9ydGFudH06Om5nLWRlZXAgLm5neC1kYXRhdGFibGUubm8tb3ZlcmZsb3d7b3ZlcmZsb3c6YXV0b306Om5nLWRlZXAgLm5neC1kYXRhdGFibGUubm8tcGFkZGluZyAuZGF0YXRhYmxlLWJvZHktcm93IC5kYXRhdGFibGUtYm9keS1jZWxsIC5kYXRhdGFibGUtYm9keS1jZWxsLWxhYmVse3BhZGRpbmc6MH06Om5nLWRlZXAgLm5neC1kYXRhdGFibGUgLmRhdGF0YWJsZS1oZWFkZXJ7cGFkZGluZzoxMXB4IDE2cHh9OjpuZy1kZWVwIC5uZ3gtZGF0YXRhYmxlIC5kYXRhdGFibGUtaGVhZGVyIC5kYXRhdGFibGUtaGVhZGVyLWNlbGwtbGFiZWx7Zm9udC1zaXplOjEycHg7Zm9udC13ZWlnaHQ6NTAwfTo6bmctZGVlcCAubmd4LWRhdGF0YWJsZSAuZGF0YXRhYmxlLWJvZHktcm93IC5kYXRhdGFibGUtYm9keS1jZWxse2ZvbnQtc2l6ZToxM3B4O2ZvbnQtd2VpZ2h0OjQwMDtvdmVyZmxvdzpoaWRkZW47bWluLWhlaWdodDoxMDAlO2Rpc3BsYXk6dGFibGU7LXdlYmtpdC11c2VyLXNlbGVjdDppbml0aWFsOy1tb3otdXNlci1zZWxlY3Q6aW5pdGlhbDstbXMtdXNlci1zZWxlY3Q6aW5pdGlhbDstby11c2VyLXNlbGVjdDppbml0aWFsO3VzZXItc2VsZWN0OmluaXRpYWx9OjpuZy1kZWVwIC5uZ3gtZGF0YXRhYmxlIC5kYXRhdGFibGUtYm9keS1yb3cgLmRhdGF0YWJsZS1ib2R5LWNlbGwgLmRhdGF0YWJsZS1ib2R5LWNlbGwtbGFiZWx7cGFkZGluZzoxNnB4O2Rpc3BsYXk6dGFibGUtY2VsbDt2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7d29yZC1icmVhazpicmVhay1hbGx9OjpuZy1kZWVwIC5uZ3gtZGF0YXRhYmxlIC5kYXRhdGFibGUtYm9keS1yb3cgLmRhdGF0YWJsZS1ib2R5LWNlbGwuY2VsbC10b3AgLmRhdGF0YWJsZS1ib2R5LWNlbGwtbGFiZWx7dmVydGljYWwtYWxpZ246dG9wfTo6bmctZGVlcCAubmd4LWRhdGF0YWJsZSAuZGF0YXRhYmxlLXJvdy1kZXRhaWx7cGFkZGluZzoxMHB4fTo6bmctZGVlcCAubmd4LWRhdGF0YWJsZSAuc29ydC1idG57d2lkdGg6MDtoZWlnaHQ6MH06Om5nLWRlZXAgLm5neC1kYXRhdGFibGUgLmljb24tZG93bntib3JkZXItbGVmdDo1cHggc29saWQgdHJhbnNwYXJlbnQ7Ym9yZGVyLXJpZ2h0OjVweCBzb2xpZCB0cmFuc3BhcmVudH06Om5nLWRlZXAgLm5neC1kYXRhdGFibGUgLmljb24tdXB7Ym9yZGVyLWxlZnQ6NXB4IHNvbGlkIHRyYW5zcGFyZW50O2JvcmRlci1yaWdodDo1cHggc29saWQgdHJhbnNwYXJlbnR9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjTGlzdFRhYmxlQ29tcG9uZW50IHtcblxuICBASW5wdXQoKVxuICBzZXQgcm93cyh2KSB7XG4gICAgaWYgKHRoaXMuX3Jvd3MgIT09IHYpIHtcbiAgICAgIHRoaXMuX3Jvd3MgPSB2O1xuICAgIH1cbiAgfVxuXG4gIGdldCByb3dzKCkge1xuICAgIHJldHVybiB0aGlzLl9yb3dzO1xuICB9XG5cbiAgQElucHV0KCkgc2VsZWN0YWJsZTogYm9vbGVhbjtcblxuICBzZWxlY3RlZCA9IFtdO1xuXG4gIEBWaWV3Q2hpbGQoRGF0YXRhYmxlQ29tcG9uZW50KSB0YWJsZUNvbXBvbmVudDogRGF0YXRhYmxlQ29tcG9uZW50O1xuXG4gIGNvbHVtbnNTb3J0Q29uZmlnOiBhbnk7XG5cbiAgcHJpdmF0ZSBfcm93czogQXJyYXk8YW55PiA9IFtdO1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oRGVjTGlzdFRhYmxlQ29sdW1uQ29tcG9uZW50KSBjb2x1bW5zOiBRdWVyeUxpc3Q8RGVjTGlzdFRhYmxlQ29sdW1uQ29tcG9uZW50PjtcblxuICBAT3V0cHV0KCkgc29ydDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCkgcm93Q2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBvblNvcnQoZXZlbnQpIHtcblxuICAgIGNvbnN0IHNvcnRDb25maWcgPSBbe1xuICAgICAgcHJvcGVydHk6IGV2ZW50LnNvcnRzWzBdLnByb3AsXG4gICAgICBvcmRlcjogZXZlbnQuc29ydHNbMF0uZGlyLnRvVXBwZXJDYXNlKClcbiAgICB9XTtcblxuICAgIGlmIChzb3J0Q29uZmlnICE9PSB0aGlzLmNvbHVtbnNTb3J0Q29uZmlnKSB7XG5cbiAgICAgIHRoaXMuY29sdW1uc1NvcnRDb25maWcgPSBzb3J0Q29uZmlnO1xuXG4gICAgICB0aGlzLnNvcnQuZW1pdCh0aGlzLmNvbHVtbnNTb3J0Q29uZmlnKTtcblxuICAgIH1cblxuICB9XG5cbiAgb25TZWxlY3QoeyBzZWxlY3RlZCB9KSB7XG4gICAgdGhpcy5zZWxlY3RlZC5zcGxpY2UoMCwgdGhpcy5zZWxlY3RlZC5sZW5ndGgpO1xuICAgIHRoaXMuc2VsZWN0ZWQucHVzaCguLi5zZWxlY3RlZCk7XG4gIH1cblxuICBvbkl0ZW1DbGljaygkZXZlbnQpIHtcblxuICAgIGNvbnN0IGV2ZW50ID0gJGV2ZW50O1xuXG4gICAgY29uc3QgaXRlbSA9ICRldmVudC5yb3c7XG5cbiAgICBjb25zdCBsaXN0ID0gdGhpcy5yb3dzO1xuXG4gICAgY29uc3QgaW5kZXggPSAkZXZlbnQucm93LiQkaW5kZXg7XG5cbiAgICB0aGlzLnJvd0NsaWNrLmVtaXQoeyBldmVudCwgaXRlbSwgbGlzdCwgaW5kZXggfSk7XG5cbiAgfVxufVxuIl19