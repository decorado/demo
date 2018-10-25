/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ContentChild, EventEmitter, Input, Output } from '@angular/core';
import { DecListGridComponent } from './list-grid/list-grid.component';
import { DecListTableComponent } from './list-table/list-table.component';
import { DecListFilterComponent } from './list-filter/list-filter.component';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';
import { DecApiService } from './../../services/api/decora-api.service';
/** @type {?} */
var DELETE_COMPARE_FUNCTION = function (_item, id) { return _item.id === id; };
var ɵ0 = DELETE_COMPARE_FUNCTION;
var DecListComponent = /** @class */ (function () {
    /*
     * ngOnInit
     *
     *
     */
    function DecListComponent(service) {
        var _this = this;
        this.service = service;
        /*
          * filterMode
          *
          *
          */
        this.filterMode = 'tabs';
        this.filterData = new Subject();
        this._loading = true;
        this.scrollEventEmiter = new EventEmitter();
        /*
           * limit
           *
           *
           */
        this.limit = 10;
        /*
           * scrollableContainerClass
           *
           * Where the scroll watcher should be listening
           */
        this.scrollableContainerClass = 'mat-sidenav-content';
        /*
           * showFooter
           *
           *
           */
        this.selected = [];
        /*
           * showFooter
           *
           *
           */
        this.showFooter = true;
        /*
           * postSearch
           *
           * This middleware is used to trigger events after every search
           */
        this.postSearch = new EventEmitter();
        /*
           * rowClick
           *
           * Emits an event when a row or card is clicked
           */
        this.rowClick = new EventEmitter();
        this.getListMode = function () {
            /** @type {?} */
            var listMode = _this.listMode;
            if (_this.filter && _this.filter.tabsFilterComponent) {
                if (_this.selectedTab && _this.selectedTab.listMode) {
                    listMode = _this.selectedTab.listMode;
                }
                else {
                    listMode = _this.table ? 'table' : 'grid';
                }
            }
            return listMode;
        };
        this.actByScrollPosition = function ($event) {
            if ($event['path']) {
                /** @type {?} */
                var elementWithCdkOverlayClass = $event['path'].find(function (path) {
                    /** @type {?} */
                    var className = path['className'] || '';
                    /** @type {?} */
                    var insideOverlay = className.indexOf('cdk-overlay') >= 0;
                    /** @type {?} */
                    var insideFullscreanDialogContainer = className.indexOf('fullscrean-dialog-container') >= 0;
                    return insideOverlay || insideFullscreanDialogContainer;
                });
                if (!elementWithCdkOverlayClass) {
                    // avoid closing filter from any open dialog
                    if (!_this.isLastPage) {
                        /** @type {?} */
                        var target = $event['target'];
                        /** @type {?} */
                        var limit = target.scrollHeight - target.clientHeight;
                        if (target.scrollTop >= (limit - 16)) {
                            _this.showMore();
                        }
                    }
                }
            }
        };
        this.emitScrollEvent = function ($event) {
            if (!_this.loading) {
                _this.scrollEventEmiter.emit($event);
            }
        };
    }
    Object.defineProperty(DecListComponent.prototype, "loading", {
        get: /**
         * @return {?}
         */
        function () {
            return this._loading;
        },
        /*
         * loading
         *
         *
         */
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._loading = v;
            if (this.filter) {
                this.filter.loading = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecListComponent.prototype, "filterGroups", {
        /*
         * filterGroups
         *
         *
         */
        get: /**
         * @return {?}
         */
        function () {
            return this.filter ? this.filter.filterGroups : [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecListComponent.prototype, "endpoint", {
        get: /**
         * @return {?}
         */
        function () {
            return this._endpoint;
        },
        /*
         * endpoint
         *
         *
         */
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (this._endpoint !== v) {
                this._endpoint = (v[0] && v[0] === '/') ? v.replace('/', '') : v;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecListComponent.prototype, "name", {
        get: /**
         * @return {?}
         */
        function () {
            return this._name;
        },
        /*
         * name
         *
         *
         */
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (this._name !== v) {
                this._name = v;
                this.setFiltersComponentsBasePathAndNames();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecListComponent.prototype, "rows", {
        get: /**
         * @return {?}
         */
        function () {
            return this.report ? this.report.result.rows : undefined;
        },
        /*
         * rows
         *
         *
         */
        set: /**
         * @param {?} rows
         * @return {?}
         */
        function (rows) {
            this._givenRows = rows;
            this.setRows(this._givenRows);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecListComponent.prototype, "filter", {
        get: /**
         * @return {?}
         */
        function () {
            return this._filter;
        },
        /*
         * filter
         *
         *
         */
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (this._filter !== v) {
                this._filter = v;
                this.setFiltersComponentsBasePathAndNames();
            }
        },
        enumerable: true,
        configurable: true
    });
    /*
     * ngOnInit
     *
     * Starts a fresh component and prepare it to run
     *
     * - Start the Reactive Report
     * - Subscribe to the Reactive Report
     * - Start watching window Scroll
     * - Ensure unique name
     */
    /**
     * @return {?}
     */
    DecListComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.watchFilterData();
        this.ensureUniqueName();
        this.detectListModeBasedOnGridAndTablePresence();
    };
    /*
    * ngAfterViewInit
    *
    * Wait for the subcomponents to start before run the component
    *
    * - Start watching Filter
    * - Do the first load
    */
    /**
     * @return {?}
     */
    DecListComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.watchFilter();
        this.doFirstLoad();
        this.detectListMode();
        this.watchTabsChange();
        this.watchTableSort();
        this.registerChildWatchers();
        this.shareSelectedRowsArray();
        this.watchScroll();
        this.watchScrollEventEmitter();
    };
    /*
     * ngOnDestroy
     *
     * Destroy watcher to free meemory and remove unnecessary triggers
     *
     * - Unsubscribe from the Reactive Report
     * - Stop watching window Scroll
     * - Stop watching Filter
     */
    /**
     * @return {?}
     */
    DecListComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.unsubscribeToReactiveReport();
        this.stopWatchingScroll();
        this.stopWatchingFilter();
        this.stopWatchingTabsChange();
        this.stopWatchingTableSort();
        this.stopWatchingScrollEventEmitter();
    };
    /*
     * reloadCountReport
     *
     */
    /**
     * @return {?}
     */
    DecListComponent.prototype.reloadCountReport = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.filter && this.filter.filters && this.filter.loadCountReport) {
            /** @type {?} */
            var endpoint = this.endpoint[this.endpoint.length - 1] === '/' ? this.endpoint + "count" : this.endpoint + "/count";
            /** @type {?} */
            var filters = this.filter.filters;
            /** @type {?} */
            var payloadWithSearchableProperties = this.getCountableFilters(filters);
            this.service.post(endpoint, payloadWithSearchableProperties)
                .subscribe(function (res) {
                _this.countReport = _this.mountCountReport(res);
                _this.filter.countReport = _this.countReport;
            });
        }
    };
    /*
     * removeItem
     *
     * Removes an item from the list
     */
    /**
     * @param {?} ids
     * @param {?=} compareFn
     * @param {?=} recount
     * @return {?}
     */
    DecListComponent.prototype.removeItem = /**
     * @param {?} ids
     * @param {?=} compareFn
     * @param {?=} recount
     * @return {?}
     */
    function (ids, compareFn, recount) {
        var _this = this;
        if (compareFn === void 0) { compareFn = DELETE_COMPARE_FUNCTION; }
        if (recount === void 0) { recount = true; }
        if (Array.isArray(ids)) {
            ids.forEach(function (id) {
                _this.removeItem(id, compareFn, false);
            });
        }
        else {
            /** @type {?} */
            var item = this.rows.find(function (_item) { return compareFn(_item, ids); });
            if (item) {
                /** @type {?} */
                var itemIndex = this.rows.indexOf(item);
                if (itemIndex >= 0) {
                    this.rows.splice(itemIndex, 1);
                }
                /** @type {?} */
                var selectedItemIndex = this.selected.indexOf(item);
                if (selectedItemIndex >= 0) {
                    this.selected.splice(selectedItemIndex, 1);
                }
            }
        }
        if (recount && this.endpoint) {
            this.reloadCountReport();
        }
    };
    /*
     * restart
     *
     * Clear the list and reload the first page
     */
    /**
     * @return {?}
     */
    DecListComponent.prototype.restart = /**
     * @return {?}
     */
    function () {
        this.loadReport(true);
        this.resetSelected();
    };
    /*
     * showMore
     *
     */
    /**
     * @return {?}
     */
    DecListComponent.prototype.showMore = /**
     * @return {?}
     */
    function () {
        return this.loadReport();
    };
    /*
     * searchCollapsable
     *
     * search by collapsable filter
     */
    /**
     * @param {?} filter
     * @return {?}
     */
    DecListComponent.prototype.searchCollapsable = /**
     * @param {?} filter
     * @return {?}
     */
    function (filter) {
        if (this.selectedCollapsable !== filter.uid) {
            this.loadByOpennedCollapse(filter.uid);
        }
    };
    /*
     * tableAndGridAreSet
     *
     * Return true if there are both GRID and TABLE definition inside the list
     */
    /**
     * @return {?}
     */
    DecListComponent.prototype.tableAndGridAreSet = /**
     * @return {?}
     */
    function () {
        return this.grid && this.table;
    };
    /*
     * toggleListMode
     *
     * Changes between GRID and TABLE visualizatoin modes
     */
    /**
     * @return {?}
     */
    DecListComponent.prototype.toggleListMode = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.listMode = this.listMode === 'grid' ? 'table' : 'grid';
        if (this.listMode === 'table') {
            setTimeout(function () {
                _this.table.tableComponent.recalculate();
            }, 1);
        }
    };
    /*
     * getCollapsableCount
     *
     * get Collapsable Count from countReport
     */
    /**
     * @param {?} uid
     * @return {?}
     */
    DecListComponent.prototype.getCollapsableCount = /**
     * @param {?} uid
     * @return {?}
     */
    function (uid) {
        try {
            return this.countReport[this.selectedTab].children[uid].count;
        }
        catch (error) {
            return '?';
        }
    };
    /**
     * @param {?} filtersCounters
     * @return {?}
     */
    DecListComponent.prototype.mountCountReport = /**
     * @param {?} filtersCounters
     * @return {?}
     */
    function (filtersCounters) {
        var _this = this;
        /** @type {?} */
        var countReport = {
            count: 0
        };
        filtersCounters.forEach(function (item) {
            countReport[item.uid] = {
                count: item.count
            };
            if (item.children) {
                countReport[item.uid].children = _this.mountCountReport(item.children);
            }
        });
        return countReport;
    };
    /**
     * @param {?} filters
     * @return {?}
     */
    DecListComponent.prototype.getCountableFilters = /**
     * @param {?} filters
     * @return {?}
     */
    function (filters) {
        var _this = this;
        /** @type {?} */
        var filterGroupsWithoutTabs = this.filter.filterGroupsWithoutTabs || [{ filters: [] }];
        /** @type {?} */
        var filtersPlusSearch = filters.map(function (decFilter) {
            /** @type {?} */
            var decFilterFiltersPlusSearch = JSON.parse(JSON.stringify(decFilter));
            if (decFilterFiltersPlusSearch.filters) {
                /** @type {?} */
                var tabFiltersCopy_1 = JSON.parse(JSON.stringify(decFilterFiltersPlusSearch.filters));
                decFilterFiltersPlusSearch.filters = JSON.parse(JSON.stringify(filterGroupsWithoutTabs));
                decFilterFiltersPlusSearch.filters.forEach(function (filterGroup) {
                    (_a = filterGroup.filters).push.apply(_a, tslib_1.__spread(tabFiltersCopy_1));
                    var _a;
                });
            }
            else if (decFilterFiltersPlusSearch.children) {
                decFilterFiltersPlusSearch.children = _this.getCountableFilters(decFilterFiltersPlusSearch.children);
            }
            return {
                uid: decFilterFiltersPlusSearch.uid,
                filters: decFilterFiltersPlusSearch.filters,
                children: decFilterFiltersPlusSearch.children,
            };
        });
        return this.ensureFilterValuesAsArray(filtersPlusSearch);
    };
    /**
     * @param {?=} filterGroups
     * @return {?}
     */
    DecListComponent.prototype.ensureFilterValuesAsArray = /**
     * @param {?=} filterGroups
     * @return {?}
     */
    function (filterGroups) {
        var _this = this;
        if (filterGroups === void 0) { filterGroups = []; }
        return filterGroups.map(function (decListFilter) {
            if (decListFilter.filters) {
                _this.appendFilterGroupsBasedOnSearchableProperties(decListFilter.filters);
                decListFilter.filters = decListFilter.filters.map(function (filterGroup) {
                    filterGroup.filters = filterGroup.filters.map(function (filter) {
                        filter.value = Array.isArray(filter.value) ? filter.value : [filter.value];
                        return filter;
                    });
                    return filterGroup;
                });
            }
            return decListFilter;
        });
    };
    /**
     * @return {?}
     */
    DecListComponent.prototype.detectListMode = /**
     * @return {?}
     */
    function () {
        this.getListMode();
    };
    /**
     * @return {?}
     */
    DecListComponent.prototype.detectListModeBasedOnGridAndTablePresence = /**
     * @return {?}
     */
    function () {
        this.listMode = this.listMode ? this.listMode : this.table ? 'table' : 'grid';
    };
    /**
     * @return {?}
     */
    DecListComponent.prototype.isTabsFilterDefined = /**
     * @return {?}
     */
    function () {
        return this.filter && this.filter.tabsFilterComponent;
    };
    /**
     * @return {?}
     */
    DecListComponent.prototype.doFirstLoad = /**
     * @return {?}
     */
    function () {
        if (this.isTabsFilterDefined()) {
            this.doFirstLoadByTabsFilter();
        }
        else {
            this.doFirstLoadLocally(true);
        }
    };
    /**
     * @return {?}
     */
    DecListComponent.prototype.doFirstLoadByTabsFilter = /**
     * @return {?}
     */
    function () {
        this.filter.tabsFilterComponent.doFirstLoad();
    };
    /**
     * @param {?} refresh
     * @return {?}
     */
    DecListComponent.prototype.doFirstLoadLocally = /**
     * @param {?} refresh
     * @return {?}
     */
    function (refresh) {
        this.loadReport(refresh);
    };
    /**
     * @return {?}
     */
    DecListComponent.prototype.ensureUniqueName = /**
     * @return {?}
     */
    function () {
        if (!this.name) {
            /** @type {?} */
            var error = 'ListComponentError: The list component must have an unique name to be used in url filter.'
                + ' Please, ensure that you have passed an unique namme to the component.';
            throw new Error(error);
        }
    };
    /**
     * @param {?} filterUid
     * @return {?}
     */
    DecListComponent.prototype.loadByOpennedCollapse = /**
     * @param {?} filterUid
     * @return {?}
     */
    function (filterUid) {
        var _this = this;
        /** @type {?} */
        var filter = this.collapsableFilters.children.find(function (item) { return item.uid === filterUid; });
        /** @type {?} */
        var filterGroup = { filters: filter.filters };
        this.loadReport(true, filterGroup);
        setTimeout(function () {
            _this.selectedCollapsable = filter.uid;
        }, 0);
    };
    /**
     * @param {?=} clearAndReloadReport
     * @param {?=} collapseFilterGroups
     * @return {?}
     */
    DecListComponent.prototype.loadReport = /**
     * @param {?=} clearAndReloadReport
     * @param {?=} collapseFilterGroups
     * @return {?}
     */
    function (clearAndReloadReport, collapseFilterGroups) {
        var _this = this;
        return new Promise(function (res, rej) {
            if (clearAndReloadReport && _this.rows) {
                _this.resetSelected();
                _this.setRows(_this.rows);
            }
            _this.clearAndReloadReport = clearAndReloadReport;
            _this.loading = true;
            if (_this.endpoint) {
                _this.mountPayload(clearAndReloadReport, collapseFilterGroups)
                    .then(function (payload) {
                    _this.payload = payload;
                    _this.filterData.next({ endpoint: _this.endpoint, payload: _this.payload, cbk: res, clear: clearAndReloadReport });
                });
            }
            else if (_this.customFetchMethod) {
                _this.mountPayload(clearAndReloadReport, collapseFilterGroups)
                    .then(function (payload) {
                    _this.payload = payload;
                    _this.filterData.next();
                });
            }
            else if (_this.rows) {
                console.log('DecList:: Local filter not implemented. Talk to Bruno to see how to do it!');
            }
            else {
                setTimeout(function () {
                    rej('No endpoint, customFetchMethod or rows set');
                    _this.loading = false;
                }, 1);
            }
        });
    };
    /**
     * @param {?=} clearAndReloadReport
     * @param {?=} collapseFilterGroups
     * @return {?}
     */
    DecListComponent.prototype.mountPayload = /**
     * @param {?=} clearAndReloadReport
     * @param {?=} collapseFilterGroups
     * @return {?}
     */
    function (clearAndReloadReport, collapseFilterGroups) {
        var _this = this;
        if (clearAndReloadReport === void 0) { clearAndReloadReport = false; }
        return new Promise(function (resolve, reject) {
            /** @type {?} */
            var searchFilterGroups = _this.filter ? _this.filter.filterGroups : undefined;
            /** @type {?} */
            var filterGroups = _this.appendFilterGroupsToEachFilterGroup(searchFilterGroups, collapseFilterGroups);
            /** @type {?} */
            var payload = {};
            payload.limit = _this.limit;
            if (filterGroups) {
                payload.filterGroups = filterGroups;
            }
            if (_this.columnsSortConfig) {
                payload.sort = _this.columnsSortConfig;
            }
            if (!clearAndReloadReport && _this.report) {
                payload.page = _this.report.page + 1;
                payload.limit = _this.report.limit;
            }
            resolve(payload);
        });
    };
    /**
     * @param {?} filterGroups
     * @param {?} filterGroupToAppend
     * @return {?}
     */
    DecListComponent.prototype.appendFilterGroupsToEachFilterGroup = /**
     * @param {?} filterGroups
     * @param {?} filterGroupToAppend
     * @return {?}
     */
    function (filterGroups, filterGroupToAppend) {
        if (filterGroupToAppend) {
            if (filterGroups && filterGroups.length > 0) {
                filterGroups.forEach(function (group) {
                    (_a = group.filters).push.apply(_a, tslib_1.__spread(filterGroupToAppend.filters));
                    var _a;
                });
            }
            else {
                filterGroups = [filterGroupToAppend];
            }
        }
        return filterGroups || [];
    };
    /**
     * @return {?}
     */
    DecListComponent.prototype.setFiltersComponentsBasePathAndNames = /**
     * @return {?}
     */
    function () {
        if (this.filter) {
            this.filter.name = this.name;
            if (this.filter.tabsFilterComponent) {
                this.filter.tabsFilterComponent.name = this.name;
                if (this.customFetchMethod) {
                    this.filter.tabsFilterComponent.customFetchMethod = this.customFetchMethod;
                }
                else {
                    this.filter.tabsFilterComponent.service = this.service;
                }
            }
        }
    };
    /**
     * @param {?=} rows
     * @return {?}
     */
    DecListComponent.prototype.setRows = /**
     * @param {?=} rows
     * @return {?}
     */
    function (rows) {
        if (rows === void 0) { rows = this._givenRows || []; }
        this.report = {
            page: 1,
            result: {
                rows: rows,
                count: rows.length
            }
        };
        this.detectLastPage(rows, rows.length);
        this.updateContentChildren();
    };
    /**
     * @return {?}
     */
    DecListComponent.prototype.watchScrollEventEmitter = /**
     * @return {?}
     */
    function () {
        this.scrollEventEmiterSubscription = this.scrollEventEmiter
            .pipe(debounceTime(150), distinctUntilChanged()).subscribe(this.actByScrollPosition);
    };
    /**
     * @return {?}
     */
    DecListComponent.prototype.stopWatchingScrollEventEmitter = /**
     * @return {?}
     */
    function () {
        if (this.scrollEventEmiterSubscription) {
            this.scrollEventEmiterSubscription.unsubscribe();
        }
    };
    /**
     * @return {?}
     */
    DecListComponent.prototype.watchFilterData = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.reactiveReport = this.filterData
            .pipe(debounceTime(150), // avoid muiltiple request when the filter or tab change too fast
        // avoid muiltiple request when the filter or tab change too fast
        switchMap(function (filterData) {
            /** @type {?} */
            var observable = new BehaviorSubject(undefined);
            /** @type {?} */
            var fetchMethod = _this.customFetchMethod || _this.service.get;
            /** @type {?} */
            var endpoint = filterData ? filterData.endpoint : undefined;
            /** @type {?} */
            var payloadWithSearchableProperties = _this.getPayloadWithSearchTransformedIntoSearchableProperties(_this.payload);
            if (filterData && filterData.clear) {
                _this.setRows();
            }
            fetchMethod(endpoint, payloadWithSearchableProperties)
                .subscribe(function (res) {
                observable.next(res);
                if (filterData && filterData.cbk) {
                    setTimeout(function () {
                        // wait for subscribers to refresh their rows
                        filterData.cbk(new Promise(function (resolve, rej) {
                            resolve(res);
                        }));
                    }, 1);
                }
                return res;
            });
            return observable;
        }));
        this.subscribeToReactiveReport();
    };
    /**
     * @param {?} payload
     * @return {?}
     */
    DecListComponent.prototype.getPayloadWithSearchTransformedIntoSearchableProperties = /**
     * @param {?} payload
     * @return {?}
     */
    function (payload) {
        /** @type {?} */
        var payloadCopy = tslib_1.__assign({}, payload);
        if (payloadCopy.filterGroups && this.searchableProperties) {
            payloadCopy.filterGroups = tslib_1.__spread(payload.filterGroups);
            this.appendFilterGroupsBasedOnSearchableProperties(payloadCopy.filterGroups);
            return payloadCopy;
        }
        else {
            return this.payload;
        }
    };
    /**
     * @param {?} filterGroups
     * @return {?}
     */
    DecListComponent.prototype.appendFilterGroupsBasedOnSearchableProperties = /**
     * @param {?} filterGroups
     * @return {?}
     */
    function (filterGroups) {
        var _this = this;
        /** @type {?} */
        var filterGroupsThatContainsBasicSearch = this.getFilterGroupsThatContainsTheBasicSearch(filterGroups);
        if (filterGroupsThatContainsBasicSearch && filterGroupsThatContainsBasicSearch.length > 0) {
            filterGroupsThatContainsBasicSearch.forEach(function (filterGroupThatContainsBasicSearch) {
                _this.removeFilterGroup(filterGroups, filterGroupThatContainsBasicSearch);
                /** @type {?} */
                var basicSearch = filterGroupThatContainsBasicSearch.filters.find(function (filter) { return filter.property === 'search'; });
                /** @type {?} */
                var basicSearchIndex = filterGroupThatContainsBasicSearch.filters.indexOf(basicSearch);
                _this.searchableProperties.forEach(function (property) {
                    /** @type {?} */
                    var newFilterGroup = {
                        filters: tslib_1.__spread(filterGroupThatContainsBasicSearch.filters)
                    };
                    newFilterGroup.filters[basicSearchIndex] = {
                        property: property,
                        value: [basicSearch.value]
                    };
                    filterGroups.push(newFilterGroup);
                });
            });
        }
    };
    /**
     * @param {?} filterGroups
     * @param {?} filterGroupThatContainsBasicSearch
     * @return {?}
     */
    DecListComponent.prototype.removeFilterGroup = /**
     * @param {?} filterGroups
     * @param {?} filterGroupThatContainsBasicSearch
     * @return {?}
     */
    function (filterGroups, filterGroupThatContainsBasicSearch) {
        /** @type {?} */
        var filterGroupThatContainsBasicSearchIndex = filterGroups.indexOf(filterGroupThatContainsBasicSearch);
        filterGroups.splice(filterGroupThatContainsBasicSearchIndex, 1);
    };
    /**
     * @param {?} filterGroups
     * @return {?}
     */
    DecListComponent.prototype.getFilterGroupsThatContainsTheBasicSearch = /**
     * @param {?} filterGroups
     * @return {?}
     */
    function (filterGroups) {
        return filterGroups.filter(function (filterGroup) {
            /** @type {?} */
            var basicSerchFilter = filterGroup.filters ? filterGroup.filters.find(function (filter) { return filter.property === 'search'; }) : undefined;
            return basicSerchFilter ? true : false;
        });
    };
    /**
     * @return {?}
     */
    DecListComponent.prototype.subscribeToReactiveReport = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.reactiveReportSubscription = this.reactiveReport
            .pipe(tap(function (res) {
            if (res) {
                _this.loading = false;
            }
        }))
            .subscribe(function (data) {
            if (data && data.result && data.result.rows) {
                if (!_this.clearAndReloadReport) {
                    data.result.rows = _this.report.result.rows.concat(data.result.rows);
                }
                _this.report = data;
                _this.postSearch.emit(data);
                _this.updateContentChildren();
                _this.detectLastPage(data.result.rows, data.result.count);
            }
        });
    };
    /**
     * @param {?} rows
     * @param {?} count
     * @return {?}
     */
    DecListComponent.prototype.detectLastPage = /**
     * @param {?} rows
     * @param {?} count
     * @return {?}
     */
    function (rows, count) {
        /** @type {?} */
        var numberOfrows = rows.length;
        /** @type {?} */
        var emptList = numberOfrows === 0;
        /** @type {?} */
        var singlePageList = numberOfrows === count;
        this.isLastPage = emptList || singlePageList;
    };
    /**
     * @return {?}
     */
    DecListComponent.prototype.unsubscribeToReactiveReport = /**
     * @return {?}
     */
    function () {
        if (this.reactiveReportSubscription) {
            this.reactiveReportSubscription.unsubscribe();
        }
    };
    /**
     * @return {?}
     */
    DecListComponent.prototype.updateContentChildren = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var rows = this.endpoint ? this.report.result.rows : this.rows;
        if (this.grid) {
            this.grid.rows = rows;
        }
        if (this.table) {
            this.table.rows = rows;
        }
        if (this.filter) {
            this.filter.count = this.report.result.count;
        }
    };
    /**
     * @return {?}
     */
    DecListComponent.prototype.registerChildWatchers = /**
     * @return {?}
     */
    function () {
        if (this.grid) {
            this.watchGridRowClick();
        }
        if (this.table) {
            this.watchTableRowClick();
        }
    };
    /**
     * @return {?}
     */
    DecListComponent.prototype.shareSelectedRowsArray = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout(function () {
            if (_this.table) {
                _this.table.selected = _this.selected;
            }
            if (_this.grid) {
                _this.grid.selected = _this.selected;
            }
        }, 0);
    };
    /**
     * @return {?}
     */
    DecListComponent.prototype.watchGridRowClick = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.grid.rowClick.subscribe(function ($event) {
            _this.rowClick.emit($event);
        });
    };
    /**
     * @return {?}
     */
    DecListComponent.prototype.watchTableRowClick = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.table.rowClick.subscribe(function ($event) {
            _this.rowClick.emit($event);
        });
    };
    /**
     * @return {?}
     */
    DecListComponent.prototype.watchFilter = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.filter) {
            this.filterSubscription = this.filter.search.subscribe(function (event) {
                /** @type {?} */
                var tabChanged = !_this.previousSelectedTab || (_this.previousSelectedTab !== _this.selectedTab);
                /** @type {?} */
                var filterModeChanged = _this.filterMode !== event.filterMode;
                if (!_this.previousSelectedTab || tabChanged) {
                    _this.previousSelectedTab = _this.selectedTab;
                    _this.setRows(); // if changing tabs, clear the results before showing the rows because it is done only after fetching the data
                }
                if (filterModeChanged) {
                    _this.filterMode = event.filterMode;
                }
                if (_this.filterMode === 'tabs') {
                    _this.selectedCollapsable = undefined;
                    _this.collapsableFilters = undefined;
                    _this.loadReport(true).then(function (res) {
                        if (event.recount) {
                            _this.reloadCountReport();
                        }
                    });
                }
                else {
                    if (!_this.countReport || event.recount) {
                        _this.reloadCountReport();
                    }
                    if (_this.selectedCollapsable && !tabChanged) {
                        _this.loadByOpennedCollapse(_this.selectedCollapsable);
                    }
                    else {
                        _this.collapsableFilters = {
                            tab: _this.selectedTab,
                            children: event.children ? event.children : []
                        };
                        _this.selectedCollapsable = undefined;
                    }
                }
            });
        }
    };
    /**
     * @return {?}
     */
    DecListComponent.prototype.stopWatchingFilter = /**
     * @return {?}
     */
    function () {
        if (this.filterSubscription) {
            this.filterSubscription.unsubscribe();
        }
    };
    /**
     * @return {?}
     */
    DecListComponent.prototype.watchScroll = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout(function () {
            _this.scrollableContainer = document.getElementsByClassName(_this.scrollableContainerClass)[0];
            if (_this.scrollableContainer) {
                _this.scrollableContainer.addEventListener('scroll', _this.emitScrollEvent, true);
            }
        }, 1);
    };
    /**
     * @return {?}
     */
    DecListComponent.prototype.stopWatchingScroll = /**
     * @return {?}
     */
    function () {
        if (this.scrollableContainer) {
            this.scrollableContainer.removeEventListener('scroll', this.emitScrollEvent, true);
        }
    };
    /**
     * @return {?}
     */
    DecListComponent.prototype.watchTabsChange = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.filter && this.filter.tabsFilterComponent) {
            this.selectedTab = this.filter.tabsFilterComponent.selectedTab;
            this.tabsChangeSubscription = this.filter.tabsFilterComponent.tabChange.subscribe(function (tab) {
                _this.selectedTab = tab;
                _this.detectListMode();
            });
        }
    };
    /**
     * @return {?}
     */
    DecListComponent.prototype.stopWatchingTabsChange = /**
     * @return {?}
     */
    function () {
        if (this.tabsChangeSubscription) {
            this.tabsChangeSubscription.unsubscribe();
        }
    };
    /**
     * @return {?}
     */
    DecListComponent.prototype.watchTableSort = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.table) {
            this.tableSortSubscription = this.table.sort.subscribe(function (columnsSortConfig) {
                if (_this.columnsSortConfig !== columnsSortConfig) {
                    _this.columnsSortConfig = columnsSortConfig;
                    if (_this.collapsableFilters) {
                        _this.loadByOpennedCollapse(_this.selectedCollapsable);
                    }
                    else {
                        _this.loadReport(true);
                    }
                }
            });
        }
    };
    /**
     * @return {?}
     */
    DecListComponent.prototype.stopWatchingTableSort = /**
     * @return {?}
     */
    function () {
        if (this.tableSortSubscription) {
            this.tableSortSubscription.unsubscribe();
        }
    };
    /**
     * @return {?}
     */
    DecListComponent.prototype.resetSelected = /**
     * @return {?}
     */
    function () {
        this.selected = [];
        this.shareSelectedRowsArray();
    };
    DecListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-list',
                    template: "<!-- COMPONENT LAYOUT -->\n<div class=\"list-component-wrapper\">\n  <div *ngIf=\"filter\">\n    <ng-content select=\"dec-list-filter\"></ng-content>\n  </div>\n  <div *ngIf=\"report || filterMode === 'collapse'\">\n    <div fxLayout=\"column\" fxLayoutGap=\"16px\">\n      <div fxFlex class=\"text-right\" *ngIf=\"tableAndGridAreSet()\">\n        <button type=\"button\" mat-icon-button (click)=\"toggleListMode()\">\n          <mat-icon title=\"Switch to table mode\" aria-label=\"Switch to table mode\" color=\"primary\" contrastFontWithBg *ngIf=\"listMode === 'grid'\">view_headline</mat-icon>\n          <mat-icon title=\"Switch to grid mode\" aria-label=\"Switch to grid mode\" color=\"primary\" contrastFontWithBg *ngIf=\"listMode === 'table'\">view_module</mat-icon>\n        </button>\n      </div>\n      <div fxFlex>\n        <div *ngIf=\"filterMode == 'collapse' then collapseTemplate else tabsTemplate\"></div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!-- GRID TEMPLATE -->\n<ng-template #gridTemplate>\n  <ng-content select=\"dec-list-grid\"></ng-content>\n</ng-template>\n\n<!-- TABLE TEMPLATE -->\n<ng-template #listTemplate>\n  <ng-content select=\"dec-list-table\"></ng-content>\n</ng-template>\n\n<!-- FOOTER TEMPLATE -->\n<ng-template #footerTemplate>\n  <ng-content select=\"dec-list-footer\"></ng-content>\n  <p class=\"list-footer\">\n    {{ 'label.amount-loaded-of-total' |\n      translate:{\n        loaded: report?.result?.rows?.length,\n        total: report?.result?.count\n      }\n    }}\n  </p>\n</ng-template>\n\n<!-- COLLAPSE TEMPLATE -->\n<ng-template #tabsTemplate>\n  <div fxLayout=\"column\" fxLayoutGap=\"16px\">\n    <div *ngIf=\"listMode == 'grid' then gridTemplate else listTemplate\"></div>\n    <!-- FOOTER CONTENT -->\n    <div fxFlex>\n      <div *ngIf=\"showFooter && !loading then footerTemplate\"></div>\n    </div>\n    <!-- LOADING SPINNER -->\n    <div fxFlex *ngIf=\"loading\" class=\"text-center loading-spinner-wrapper\">\n      <dec-spinner></dec-spinner>\n    </div>\n    <!-- LOAD MORE BUTTON -->\n    <div fxFlex *ngIf=\"!isLastPage && !loading && !disableShowMoreButton\" class=\"text-center\">\n      <button type=\"button\" mat-raised-button (click)=\"showMore()\">{{'label.show-more' | translate}}</button>\n    </div>\n  </div>\n</ng-template>\n\n<!-- COLLAPSE TEMPLATE -->\n<ng-template #collapseTemplate>\n  <mat-accordion>\n    <ng-container *ngFor=\"let filter of collapsableFilters.children\">\n      <mat-expansion-panel (opened)=\"searchCollapsable(filter)\">\n        <mat-expansion-panel-header>\n          <div class=\"collapse-title\" fxLayout=\"row\" fxLayoutGap=\"32px\" fxLayoutAlign=\"left center\">\n            <div fxFlex=\"96px\" *ngIf=\"countReport\">\n              <dec-label [colorHex]=\"filter.color\">{{ getCollapsableCount(filter.uid) }}</dec-label>\n            </div>\n            {{ 'label.' + filter.label | translate }}\n          </div>\n        </mat-expansion-panel-header>\n        <div *ngIf=\"selectedCollapsable === filter.uid\">\n          <ng-container [ngTemplateOutlet]=\"tabsTemplate\"></ng-container>\n        </div>\n      </mat-expansion-panel>\n    </ng-container>\n  </mat-accordion>\n  <div class=\"accordion-bottom-margin\"></div>\n</ng-template>\n\n",
                    styles: [".list-footer{font-size:14px;text-align:center}.list-component-wrapper{min-height:72px}.text-right{text-align:right}.loading-spinner-wrapper{padding:32px}.collapse-title{width:100%}.accordion-bottom-margin{margin-bottom:100px}"]
                },] },
    ];
    /** @nocollapse */
    DecListComponent.ctorParameters = function () { return [
        { type: DecApiService }
    ]; };
    DecListComponent.propDecorators = {
        customFetchMethod: [{ type: Input }],
        columnsSortConfig: [{ type: Input }],
        disableShowMoreButton: [{ type: Input }],
        endpoint: [{ type: Input }],
        name: [{ type: Input }],
        rows: [{ type: Input, args: ['rows',] }],
        limit: [{ type: Input }],
        listMode: [{ type: Input }],
        scrollableContainerClass: [{ type: Input }],
        searchableProperties: [{ type: Input }],
        selected: [{ type: Input }],
        showFooter: [{ type: Input }],
        postSearch: [{ type: Output }],
        rowClick: [{ type: Output }],
        grid: [{ type: ContentChild, args: [DecListGridComponent,] }],
        table: [{ type: ContentChild, args: [DecListTableComponent,] }],
        filter: [{ type: ContentChild, args: [DecListFilterComponent,] }]
    };
    return DecListComponent;
}());
export { DecListComponent };
if (false) {
    /** @type {?} */
    DecListComponent.prototype.countReport;
    /** @type {?} */
    DecListComponent.prototype.filterMode;
    /** @type {?} */
    DecListComponent.prototype.collapsableFilters;
    /** @type {?} */
    DecListComponent.prototype.selectedCollapsable;
    /** @type {?} */
    DecListComponent.prototype.report;
    /** @type {?} */
    DecListComponent.prototype.isLastPage;
    /** @type {?} */
    DecListComponent.prototype.selectedTab;
    /** @type {?} */
    DecListComponent.prototype.previousSelectedTab;
    /** @type {?} */
    DecListComponent.prototype.filterData;
    /** @type {?} */
    DecListComponent.prototype._loading;
    /** @type {?} */
    DecListComponent.prototype.clearAndReloadReport;
    /** @type {?} */
    DecListComponent.prototype.filterSubscription;
    /** @type {?} */
    DecListComponent.prototype.reactiveReport;
    /** @type {?} */
    DecListComponent.prototype.reactiveReportSubscription;
    /** @type {?} */
    DecListComponent.prototype.scrollableContainer;
    /** @type {?} */
    DecListComponent.prototype.scrollEventEmiter;
    /** @type {?} */
    DecListComponent.prototype.scrollEventEmiterSubscription;
    /** @type {?} */
    DecListComponent.prototype.tabsChangeSubscription;
    /** @type {?} */
    DecListComponent.prototype.tableSortSubscription;
    /** @type {?} */
    DecListComponent.prototype.payload;
    /** @type {?} */
    DecListComponent.prototype._endpoint;
    /** @type {?} */
    DecListComponent.prototype._filter;
    /** @type {?} */
    DecListComponent.prototype._name;
    /** @type {?} */
    DecListComponent.prototype._givenRows;
    /** @type {?} */
    DecListComponent.prototype.customFetchMethod;
    /** @type {?} */
    DecListComponent.prototype.columnsSortConfig;
    /** @type {?} */
    DecListComponent.prototype.disableShowMoreButton;
    /** @type {?} */
    DecListComponent.prototype.limit;
    /** @type {?} */
    DecListComponent.prototype.listMode;
    /** @type {?} */
    DecListComponent.prototype.scrollableContainerClass;
    /** @type {?} */
    DecListComponent.prototype.searchableProperties;
    /** @type {?} */
    DecListComponent.prototype.selected;
    /** @type {?} */
    DecListComponent.prototype.showFooter;
    /** @type {?} */
    DecListComponent.prototype.postSearch;
    /** @type {?} */
    DecListComponent.prototype.rowClick;
    /** @type {?} */
    DecListComponent.prototype.grid;
    /** @type {?} */
    DecListComponent.prototype.table;
    /** @type {?} */
    DecListComponent.prototype.getListMode;
    /** @type {?} */
    DecListComponent.prototype.actByScrollPosition;
    /** @type {?} */
    DecListComponent.prototype.emitScrollEvent;
    /** @type {?} */
    DecListComponent.prototype.service;
}
export { ɵ0 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvbGlzdC9saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBaUIsU0FBUyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkgsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDdkUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDMUUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDN0UsT0FBTyxFQUFjLGVBQWUsRUFBZ0IsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsb0JBQW9CLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3BGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQzs7QUFLeEUsSUFBTSx1QkFBdUIsR0FBRyxVQUFDLEtBQUssRUFBRSxFQUFFLElBQUssT0FBQSxLQUFLLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBZixDQUFlLENBQUM7OztJQWtjN0Q7Ozs7T0FJRztJQUNILDBCQUNVO1FBRFYsaUJBRUs7UUFESyxZQUFPLEdBQVAsT0FBTzs7Ozs7OzBCQS9WaUIsTUFBTTswQkFnRkUsSUFBSSxPQUFPLEVBQWM7d0JBT2hELElBQUk7aUNBMENLLElBQUksWUFBWSxFQUFPOzs7Ozs7cUJBc0lsQyxFQUFFOzs7Ozs7d0NBY2lCLHFCQUFxQjs7Ozs7O3dCQWNyQyxFQUFFOzs7Ozs7MEJBT0EsSUFBSTs7Ozs7OzBCQU9ILElBQUksWUFBWSxFQUFPOzs7Ozs7d0JBT04sSUFBSSxZQUFZLEVBQU87MkJBdVF6Qzs7WUFFcEIsSUFBSSxRQUFRLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBQztZQUU3QixFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsTUFBTSxJQUFJLEtBQUksQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO2dCQUVuRCxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsV0FBVyxJQUFJLEtBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFFbEQsUUFBUSxHQUFHLEtBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDO2lCQUV0QztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFFTixRQUFRLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7aUJBRTFDO2FBRUY7WUFFRCxNQUFNLENBQUMsUUFBUSxDQUFDO1NBRWpCO21DQXlINkIsVUFBQyxNQUFNO1lBRW5DLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7O2dCQUVuQixJQUFNLDBCQUEwQixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxJQUFJOztvQkFFekQsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7b0JBRTFDLElBQU0sYUFBYSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDOztvQkFFNUQsSUFBTSwrQkFBK0IsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLDZCQUE2QixDQUFDLElBQUksQ0FBQyxDQUFDO29CQUU5RixNQUFNLENBQUMsYUFBYSxJQUFJLCtCQUErQixDQUFDO2lCQUV6RCxDQUFDLENBQUM7Z0JBRUgsRUFBRSxDQUFDLENBQUMsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLENBQUM7O29CQUVoQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDOzt3QkFFckIsSUFBTSxNQUFNLEdBQVEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzt3QkFFckMsSUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDO3dCQUV4RCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFFckMsS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO3lCQUVqQjtxQkFFRjtpQkFDRjthQUVGO1NBRUY7K0JBOEJ5QixVQUFDLE1BQU07WUFFL0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFFbEIsS0FBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUVyQztTQUVGO0tBcmJJO0lBalZMLHNCQUFJLHFDQUFPOzs7O1FBWVg7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUN0QjtRQW5CRDs7OztXQUlHOzs7OztRQUNILFVBQVksQ0FBQztZQUVYLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1lBRWxCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUVoQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7YUFFekI7U0FFRjs7O09BQUE7SUFXRCxzQkFBSSwwQ0FBWTtRQUxoQjs7OztXQUlHOzs7O1FBQ0g7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztTQUNwRDs7O09BQUE7SUFnTEQsc0JBQ0ksc0NBQVE7Ozs7UUFNWjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1NBQ3ZCO1FBZEQ7Ozs7V0FJRzs7Ozs7UUFDSCxVQUNhLENBQVM7WUFDcEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNsRTtTQUNGOzs7T0FBQTtJQVdELHNCQUNJLGtDQUFJOzs7O1FBT1I7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztTQUNuQjtRQWZEOzs7O1dBSUc7Ozs7O1FBQ0gsVUFDUyxDQUFTO1lBQ2hCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckIsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLG9DQUFvQyxFQUFFLENBQUM7YUFDN0M7U0FDRjs7O09BQUE7SUFXRCxzQkFFSSxrQ0FBSTs7OztRQUtSO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1NBQzFEO1FBZEQ7Ozs7V0FJRzs7Ozs7UUFDSCxVQUVTLElBQUk7WUFDWCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUMvQjs7O09BQUE7SUFpRkQsc0JBQ0ksb0NBQU07Ozs7UUFPVjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1NBQ3JCO1FBZkQ7Ozs7V0FJRzs7Ozs7UUFDSCxVQUNXLENBQXlCO1lBQ2xDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxvQ0FBb0MsRUFBRSxDQUFDO2FBQzdDO1NBQ0Y7OztPQUFBO0lBZUQ7Ozs7Ozs7OztPQVNHOzs7O0lBQ0gsbUNBQVE7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyx5Q0FBeUMsRUFBRSxDQUFDO0tBQ2xEO0lBRUQ7Ozs7Ozs7TUFPRTs7OztJQUNILDBDQUFlOzs7SUFBZjtRQUNFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO0tBQy9CO0lBRUQ7Ozs7Ozs7O09BUUc7Ozs7SUFDSCxzQ0FBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsOEJBQThCLEVBQUUsQ0FBQztLQUN2QztJQUVEOzs7T0FHRzs7OztJQUNILDRDQUFpQjs7O0lBQWpCO1FBQUEsaUJBcUJDO1FBbkJDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDOztZQUV0RSxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUksSUFBSSxDQUFDLFFBQVEsVUFBTyxDQUFDLENBQUMsQ0FBSSxJQUFJLENBQUMsUUFBUSxXQUFRLENBQUM7O1lBRXRILElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDOztZQUVwQyxJQUFNLCtCQUErQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUUxRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsK0JBQStCLENBQUM7aUJBQ3pELFNBQVMsQ0FBQyxVQUFBLEdBQUc7Z0JBRVosS0FBSSxDQUFDLFdBQVcsR0FBRyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBRTlDLEtBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLEtBQUksQ0FBQyxXQUFXLENBQUM7YUFFNUMsQ0FBQyxDQUFDO1NBRU47S0FFRjtJQUVEOzs7O09BSUc7Ozs7Ozs7SUFDSCxxQ0FBVTs7Ozs7O0lBQVYsVUFBVyxHQUFzQixFQUFFLFNBQW1DLEVBQUUsT0FBYztRQUF0RixpQkEwQ0M7UUExQ2tDLDBCQUFBLEVBQUEsbUNBQW1DO1FBQUUsd0JBQUEsRUFBQSxjQUFjO1FBRXBGLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXZCLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBQSxFQUFFO2dCQUVaLEtBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQzthQUV2QyxDQUFDLENBQUM7U0FFSjtRQUFDLElBQUksQ0FBQyxDQUFDOztZQUVOLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQUMsS0FBSyxJQUFLLE9BQUEsU0FBUyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsRUFBckIsQ0FBcUIsQ0FBQyxDQUFDO1lBRTlELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7O2dCQUVQLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUUxQyxFQUFFLENBQUMsQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUVoQzs7Z0JBRUQsSUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFdEQsRUFBRSxDQUFDLENBQUMsaUJBQWlCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLENBQUM7aUJBRTlDO2FBRUo7U0FFRjtRQUVELEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUU3QixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztTQUUxQjtLQUVGO0lBRUQ7Ozs7T0FJRzs7OztJQUNILGtDQUFPOzs7SUFBUDtRQUVFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0tBQ3RCO0lBRUQ7OztPQUdHOzs7O0lBQ0gsbUNBQVE7OztJQUFSO1FBRUUsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztLQUUxQjtJQUVEOzs7O09BSUc7Ozs7O0lBQ0gsNENBQWlCOzs7O0lBQWpCLFVBQWtCLE1BQXFCO1FBRXJDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsS0FBSyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUU1QyxJQUFJLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBRXhDO0tBRUY7SUFFRDs7OztPQUlHOzs7O0lBQ0gsNkNBQWtCOzs7SUFBbEI7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDO0tBQ2hDO0lBRUQ7Ozs7T0FJRzs7OztJQUNILHlDQUFjOzs7SUFBZDtRQUFBLGlCQWNDO1FBWkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFFNUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBRTlCLFVBQVUsQ0FBQztnQkFFVCxLQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUV6QyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBRVA7S0FFRjtJQUVEOzs7O09BSUc7Ozs7O0lBQ0gsOENBQW1COzs7O0lBQW5CLFVBQW9CLEdBQUc7UUFFckIsSUFBSSxDQUFDO1lBRUgsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7U0FFL0Q7UUFBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUVmLE1BQU0sQ0FBQyxHQUFHLENBQUM7U0FFWjtLQUdGOzs7OztJQWtDTywyQ0FBZ0I7Ozs7Y0FBQyxlQUFlOzs7UUFFdEMsSUFBTSxXQUFXLEdBQWdCO1lBQy9CLEtBQUssRUFBRSxDQUFDO1NBQ1QsQ0FBQztRQUVGLGVBQWUsQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO1lBRTFCLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUc7Z0JBRXRCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSzthQUVsQixDQUFDO1lBRUYsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBRWxCLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxHQUFHLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7YUFFdkU7U0FFRixDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsV0FBVyxDQUFDOzs7Ozs7SUFZYiw4Q0FBbUI7Ozs7Y0FBQyxPQUFPOzs7UUFFakMsSUFBTSx1QkFBdUIsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLHVCQUF1QixJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQzs7UUFFekYsSUFBTSxpQkFBaUIsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQUEsU0FBUzs7WUFFN0MsSUFBTSwwQkFBMEIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUV6RSxFQUFFLENBQUMsQ0FBQywwQkFBMEIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDOztnQkFFdkMsSUFBTSxnQkFBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQywwQkFBMEIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUV0RiwwQkFBMEIsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQztnQkFFekYsMEJBQTBCLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFBLFdBQVc7b0JBRXBELENBQUEsS0FBQSxXQUFXLENBQUMsT0FBTyxDQUFBLENBQUMsSUFBSSw0QkFBSSxnQkFBYyxHQUFFOztpQkFFN0MsQ0FBQyxDQUFDO2FBRUo7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsMEJBQTBCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFFL0MsMEJBQTBCLENBQUMsUUFBUSxHQUFHLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQywwQkFBMEIsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUVyRztZQUVELE1BQU0sQ0FBQztnQkFDTCxHQUFHLEVBQUUsMEJBQTBCLENBQUMsR0FBRztnQkFDbkMsT0FBTyxFQUFFLDBCQUEwQixDQUFDLE9BQU87Z0JBQzNDLFFBQVEsRUFBRSwwQkFBMEIsQ0FBQyxRQUFRO2FBQzlDLENBQUM7U0FFSCxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLGlCQUFpQixDQUFDLENBQUM7Ozs7OztJQVVuRCxvREFBeUI7Ozs7Y0FBQyxZQUFzQjs7UUFBdEIsNkJBQUEsRUFBQSxpQkFBc0I7UUFFdEQsTUFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsVUFBQSxhQUFhO1lBRW5DLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUUxQixLQUFJLENBQUMsNkNBQTZDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUUxRSxhQUFhLENBQUMsT0FBTyxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQUEsV0FBVztvQkFHM0QsV0FBVyxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFBLE1BQU07d0JBRWxELE1BQU0sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUUzRSxNQUFNLENBQUMsTUFBTSxDQUFDO3FCQUVmLENBQUMsQ0FBQztvQkFFSCxNQUFNLENBQUMsV0FBVyxDQUFDO2lCQUVwQixDQUFDLENBQUM7YUFFSjtZQUVELE1BQU0sQ0FBQyxhQUFhLENBQUM7U0FFdEIsQ0FBQyxDQUFDOzs7OztJQW1ERyx5Q0FBYzs7OztRQUVwQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Ozs7O0lBVWIsb0VBQXlDOzs7O1FBRS9DLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7Ozs7O0lBd0J4RSw4Q0FBbUI7Ozs7UUFDekIsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQzs7Ozs7SUFVaEQsc0NBQVc7Ozs7UUFDakIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1NBQ2hDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDL0I7Ozs7O0lBV0ssa0RBQXVCOzs7O1FBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLENBQUM7Ozs7OztJQVF4Qyw2Q0FBa0I7Ozs7Y0FBQyxPQUFPO1FBQ2hDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7Ozs7O0lBU25CLDJDQUFnQjs7OztRQUN0QixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOztZQUNmLElBQU0sS0FBSyxHQUFHLDJGQUEyRjtrQkFDckcsd0VBQXdFLENBQUM7WUFDN0UsTUFBTSxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN4Qjs7Ozs7O0lBU0ssZ0RBQXFCOzs7O2NBQUMsU0FBUzs7O1FBRXJDLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLEdBQUcsS0FBSyxTQUFTLEVBQXRCLENBQXNCLENBQUMsQ0FBQzs7UUFFckYsSUFBTSxXQUFXLEdBQWdCLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUU3RCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztRQUVuQyxVQUFVLENBQUM7WUFFVCxLQUFJLENBQUMsbUJBQW1CLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQztTQUV2QyxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7Ozs7O0lBY0EscUNBQVU7Ozs7O2NBQUMsb0JBQThCLEVBQUUsb0JBQWtDOztRQUVuRixNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsVUFBQyxHQUFHLEVBQUUsR0FBRztZQUUxQixFQUFFLENBQUMsQ0FBQyxvQkFBb0IsSUFBSSxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFFdEMsS0FBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUNyQixLQUFJLENBQUMsT0FBTyxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUV6QjtZQUVELEtBQUksQ0FBQyxvQkFBb0IsR0FBRyxvQkFBb0IsQ0FBQztZQUVqRCxLQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUVwQixFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFFbEIsS0FBSSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsRUFBRSxvQkFBb0IsQ0FBQztxQkFDMUQsSUFBSSxDQUFDLFVBQUEsT0FBTztvQkFFWCxLQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztvQkFFdkIsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSSxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsS0FBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxvQkFBb0IsRUFBRSxDQUFDLENBQUM7aUJBRWpILENBQUMsQ0FBQzthQUdOO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7Z0JBRWxDLEtBQUksQ0FBQyxZQUFZLENBQUMsb0JBQW9CLEVBQUUsb0JBQW9CLENBQUM7cUJBQzFELElBQUksQ0FBQyxVQUFBLE9BQU87b0JBRVgsS0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7b0JBRXZCLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7aUJBRXhCLENBQUMsQ0FBQzthQUVOO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUVyQixPQUFPLENBQUMsR0FBRyxDQUFDLDRFQUE0RSxDQUFDLENBQUM7YUFFM0Y7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFFTixVQUFVLENBQUM7b0JBRVQsR0FBRyxDQUFDLDRDQUE0QyxDQUFDLENBQUM7b0JBRWxELEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2lCQUV0QixFQUFFLENBQUMsQ0FBQyxDQUFDO2FBRVA7U0FFRixDQUFDLENBQUM7Ozs7Ozs7SUFJRyx1Q0FBWTs7Ozs7Y0FBQyxvQkFBcUMsRUFBRSxvQkFBcUI7O1FBQTVELHFDQUFBLEVBQUEsNEJBQXFDO1FBRXhELE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNOztZQUVqQyxJQUFNLGtCQUFrQixHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7O1lBRTlFLElBQU0sWUFBWSxHQUFHLEtBQUksQ0FBQyxtQ0FBbUMsQ0FBQyxrQkFBa0IsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDOztZQUV4RyxJQUFNLE9BQU8sR0FBYyxFQUFFLENBQUM7WUFFOUIsT0FBTyxDQUFDLEtBQUssR0FBRyxLQUFJLENBQUMsS0FBSyxDQUFDO1lBRTNCLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBRWpCLE9BQU8sQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO2FBRXJDO1lBRUQsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztnQkFFM0IsT0FBTyxDQUFDLElBQUksR0FBRyxLQUFJLENBQUMsaUJBQWlCLENBQUM7YUFFdkM7WUFFRCxFQUFFLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixJQUFJLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUV6QyxPQUFPLENBQUMsSUFBSSxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztnQkFFcEMsT0FBTyxDQUFDLEtBQUssR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQzthQUVuQztZQUVELE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUVsQixDQUFDLENBQUM7Ozs7Ozs7SUFTRyw4REFBbUM7Ozs7O2NBQUMsWUFBMEIsRUFBRSxtQkFBZ0M7UUFFdEcsRUFBRSxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO1lBRXhCLEVBQUUsQ0FBQyxDQUFDLFlBQVksSUFBSSxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRTVDLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLO29CQUV4QixDQUFBLEtBQUEsS0FBSyxDQUFDLE9BQU8sQ0FBQSxDQUFDLElBQUksNEJBQUksbUJBQW1CLENBQUMsT0FBTyxHQUFFOztpQkFFcEQsQ0FBQyxDQUFDO2FBRUo7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFFTixZQUFZLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2FBRXRDO1NBRUY7UUFFRCxNQUFNLENBQUMsWUFBWSxJQUFJLEVBQUUsQ0FBQzs7Ozs7SUFRcEIsK0RBQW9DOzs7O1FBRTFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBRWhCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7WUFHN0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7Z0JBRXBDLElBQUksQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBRWpELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7b0JBRTNCLElBQUksQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDO2lCQUU1RTtnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFFTixJQUFJLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO2lCQUV4RDthQUlGO1NBRUY7Ozs7OztJQVVLLGtDQUFPOzs7O2NBQUMsSUFBNEI7UUFBNUIscUJBQUEsRUFBQSxPQUFPLElBQUksQ0FBQyxVQUFVLElBQUksRUFBRTtRQUUxQyxJQUFJLENBQUMsTUFBTSxHQUFHO1lBRVosSUFBSSxFQUFFLENBQUM7WUFFUCxNQUFNLEVBQUU7Z0JBRU4sSUFBSSxFQUFFLElBQUk7Z0JBRVYsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNO2FBRW5CO1NBQ0YsQ0FBQztRQUVGLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV2QyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQzs7Ozs7SUFRdkIsa0RBQXVCOzs7O1FBRTdCLElBQUksQ0FBQyw2QkFBNkIsR0FBRyxJQUFJLENBQUMsaUJBQWlCO2FBQ3hELElBQUksQ0FDSCxZQUFZLENBQUMsR0FBRyxDQUFDLEVBQ2pCLG9CQUFvQixFQUFFLENBQ3ZCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDOzs7OztJQVNsQyx5REFBOEI7Ozs7UUFFcEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLENBQUMsQ0FBQztZQUV2QyxJQUFJLENBQUMsNkJBQTZCLENBQUMsV0FBVyxFQUFFLENBQUM7U0FFbEQ7Ozs7O0lBUUssMENBQWU7Ozs7O1FBQ3JCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFVBQVU7YUFDbEMsSUFBSSxDQUNILFlBQVksQ0FBQyxHQUFHLENBQUMsRUFBRSxpRUFBaUU7O1FBQ3BGLFNBQVMsQ0FBQyxVQUFDLFVBQXNCOztZQUUvQixJQUFNLFVBQVUsR0FBRyxJQUFJLGVBQWUsQ0FBTSxTQUFTLENBQUMsQ0FBQzs7WUFFdkQsSUFBTSxXQUFXLEdBQXVCLEtBQUksQ0FBQyxpQkFBaUIsSUFBSSxLQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQzs7WUFFbkYsSUFBTSxRQUFRLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7O1lBRTlELElBQU0sK0JBQStCLEdBQUcsS0FBSSxDQUFDLHVEQUF1RCxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUVySCxFQUFFLENBQUMsQ0FBQyxVQUFVLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ25DLEtBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUNoQjtZQUVDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsK0JBQStCLENBQUM7aUJBQ25ELFNBQVMsQ0FBQyxVQUFBLEdBQUc7Z0JBRVosVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFFckIsRUFBRSxDQUFDLENBQUMsVUFBVSxJQUFJLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUVqQyxVQUFVLENBQUM7O3dCQUVULFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsR0FBRzs0QkFFdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3lCQUVkLENBQUMsQ0FBQyxDQUFDO3FCQUVMLEVBQUUsQ0FBQyxDQUFDLENBQUM7aUJBQ1A7Z0JBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQzthQUNaLENBQUMsQ0FBQztZQUVMLE1BQU0sQ0FBQyxVQUFVLENBQUM7U0FDbkIsQ0FBQyxDQUVILENBQUM7UUFDSixJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQzs7Ozs7O0lBRzNCLGtGQUF1RDs7OztjQUFDLE9BQU87O1FBRXJFLElBQU0sV0FBVyx3QkFBUSxPQUFPLEVBQUc7UUFFbkMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDO1lBRTFELFdBQVcsQ0FBQyxZQUFZLG9CQUFPLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUVyRCxJQUFJLENBQUMsNkNBQTZDLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBRTdFLE1BQU0sQ0FBQyxXQUFXLENBQUM7U0FFcEI7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUVOLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1NBRXJCOzs7Ozs7SUFJSyx3RUFBNkM7Ozs7Y0FBQyxZQUFZOzs7UUFFaEUsSUFBTSxtQ0FBbUMsR0FBRyxJQUFJLENBQUMseUNBQXlDLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFekcsRUFBRSxDQUFDLENBQUMsbUNBQW1DLElBQUksbUNBQW1DLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFMUYsbUNBQW1DLENBQUMsT0FBTyxDQUFDLFVBQUEsa0NBQWtDO2dCQUU1RSxLQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLGtDQUFrQyxDQUFDLENBQUM7O2dCQUV6RSxJQUFNLFdBQVcsR0FBRyxrQ0FBa0MsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsTUFBTSxDQUFDLFFBQVEsS0FBSyxRQUFRLEVBQTVCLENBQTRCLENBQUMsQ0FBQzs7Z0JBRTVHLElBQU0sZ0JBQWdCLEdBQUcsa0NBQWtDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFFekYsS0FBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxVQUFBLFFBQVE7O29CQUV4QyxJQUFNLGNBQWMsR0FBZ0I7d0JBQ2xDLE9BQU8sbUJBQU0sa0NBQWtDLENBQUMsT0FBTyxDQUFDO3FCQUN6RCxDQUFDO29CQUVGLGNBQWMsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsR0FBRzt3QkFDekMsUUFBUSxFQUFFLFFBQVE7d0JBQ2xCLEtBQUssRUFBRSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7cUJBQzNCLENBQUM7b0JBRUYsWUFBWSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztpQkFFbkMsQ0FBQyxDQUFDO2FBRUosQ0FBQyxDQUFDO1NBRUo7Ozs7Ozs7SUFJSyw0Q0FBaUI7Ozs7O2NBQUMsWUFBWSxFQUFFLGtDQUFrQzs7UUFFeEUsSUFBTSx1Q0FBdUMsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7UUFFekcsWUFBWSxDQUFDLE1BQU0sQ0FBQyx1Q0FBdUMsRUFBRSxDQUFDLENBQUMsQ0FBQzs7Ozs7O0lBSTFELG9FQUF5Qzs7OztjQUFDLFlBQVk7UUFFNUQsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsVUFBQSxXQUFXOztZQUVwQyxJQUFNLGdCQUFnQixHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsTUFBTSxDQUFDLFFBQVEsS0FBSyxRQUFRLEVBQTVCLENBQTRCLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1lBRTVILE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7U0FFeEMsQ0FBQyxDQUFDOzs7OztJQVFHLG9EQUF5Qjs7Ozs7UUFDL0IsSUFBSSxDQUFDLDBCQUEwQixHQUFHLElBQUksQ0FBQyxjQUFjO2FBQ2xELElBQUksQ0FDSCxHQUFHLENBQUMsVUFBQSxHQUFHO1lBQ0wsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDUixLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQzthQUN0QjtTQUNGLENBQUMsQ0FDSDthQUNBLFNBQVMsQ0FBQyxVQUFBLElBQUk7WUFDYixFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBRTVDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQztvQkFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNyRTtnQkFFRCxLQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFFbkIsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRTNCLEtBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO2dCQUU3QixLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7YUFFMUQ7U0FDRixDQUFDLENBQUM7Ozs7Ozs7SUFHQyx5Q0FBYzs7Ozs7Y0FBQyxJQUFJLEVBQUUsS0FBSzs7UUFFaEMsSUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQzs7UUFFakMsSUFBTSxRQUFRLEdBQUcsWUFBWSxLQUFLLENBQUMsQ0FBQzs7UUFFcEMsSUFBTSxjQUFjLEdBQUcsWUFBWSxLQUFLLEtBQUssQ0FBQztRQUU5QyxJQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsSUFBSSxjQUFjLENBQUM7Ozs7O0lBUXZDLHNEQUEyQjs7OztRQUNqQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUMvQzs7Ozs7SUFPSyxnREFBcUI7Ozs7O1FBRTNCLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztRQUVqRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztTQUN2QjtRQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2YsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1NBQ3hCO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1NBQzlDOzs7OztJQVNLLGdEQUFxQjs7OztRQUUzQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNkLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1NBQzFCO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDZixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztTQUMzQjs7Ozs7SUFTSyxpREFBc0I7Ozs7O1FBRTVCLFVBQVUsQ0FBQztZQUNULEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNmLEtBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUM7YUFDckM7WUFFRCxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDZCxLQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFJLENBQUMsUUFBUSxDQUFDO2FBQ3BDO1NBQ0YsRUFBRSxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFRQSw0Q0FBaUI7Ozs7O1FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxVQUFDLE1BQU07WUFDbEMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDNUIsQ0FBQyxDQUFDOzs7OztJQU9HLDZDQUFrQjs7Ozs7UUFDeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFVBQUMsTUFBTTtZQUNuQyxLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUM1QixDQUFDLENBQUM7Ozs7O0lBT0csc0NBQVc7Ozs7O1FBQ2pCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBQSxLQUFLOztnQkFFMUQsSUFBTSxVQUFVLEdBQUcsQ0FBQyxLQUFJLENBQUMsbUJBQW1CLElBQUksQ0FBQyxLQUFJLENBQUMsbUJBQW1CLEtBQUssS0FBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDOztnQkFFaEcsSUFBTSxpQkFBaUIsR0FBRyxLQUFJLENBQUMsVUFBVSxLQUFLLEtBQUssQ0FBQyxVQUFVLENBQUM7Z0JBRS9ELEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLG1CQUFtQixJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUM7b0JBRTVDLEtBQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFDO29CQUU1QyxLQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7aUJBRWhCO2dCQUVELEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztvQkFFdEIsS0FBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDO2lCQUVwQztnQkFFRCxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsVUFBVSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBRS9CLEtBQUksQ0FBQyxtQkFBbUIsR0FBRyxTQUFTLENBQUM7b0JBRXJDLEtBQUksQ0FBQyxrQkFBa0IsR0FBRyxTQUFTLENBQUM7b0JBRXBDLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBRzt3QkFFN0IsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7NEJBRWxCLEtBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO3lCQUUxQjtxQkFFRixDQUFDLENBQUM7aUJBRUo7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBRU4sRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsV0FBVyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO3dCQUV2QyxLQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztxQkFFMUI7b0JBRUQsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLG1CQUFtQixJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQzt3QkFFNUMsS0FBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO3FCQUV0RDtvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFFTixLQUFJLENBQUMsa0JBQWtCLEdBQUc7NEJBQ3hCLEdBQUcsRUFBRSxLQUFJLENBQUMsV0FBVzs0QkFDckIsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUU7eUJBQy9DLENBQUM7d0JBRUYsS0FBSSxDQUFDLG1CQUFtQixHQUFHLFNBQVMsQ0FBQztxQkFFdEM7aUJBRUY7YUFFRixDQUFDLENBQUM7U0FDSjs7Ozs7SUFPSyw2Q0FBa0I7Ozs7UUFDeEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDdkM7Ozs7O0lBT0ssc0NBQVc7Ozs7O1FBQ2pCLFVBQVUsQ0FBQztZQUNULEtBQUksQ0FBQyxtQkFBbUIsR0FBRyxRQUFRLENBQUMsc0JBQXNCLENBQUMsS0FBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0YsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztnQkFDN0IsS0FBSSxDQUFDLG1CQUFtQixDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxLQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ2pGO1NBQ0YsRUFBRSxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFPQSw2Q0FBa0I7Ozs7UUFDeEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztZQUM3QixJQUFJLENBQUMsbUJBQW1CLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDcEY7Ozs7O0lBT0ssMENBQWU7Ozs7O1FBQ3JCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7WUFDbkQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQztZQUMvRCxJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFVBQUEsR0FBRztnQkFDbkYsS0FBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7Z0JBQ3ZCLEtBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUN2QixDQUFDLENBQUM7U0FDSjs7Ozs7SUFPSyxpREFBc0I7Ozs7UUFDNUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDM0M7Ozs7O0lBT0sseUNBQWM7Ozs7O1FBQ3BCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBRWYsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFBLGlCQUFpQjtnQkFFdEUsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLGlCQUFpQixLQUFLLGlCQUFpQixDQUFDLENBQUMsQ0FBQztvQkFFakQsS0FBSSxDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDO29CQUUzQyxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO3dCQUU1QixLQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7cUJBRXREO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUVOLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBRXZCO2lCQUVGO2FBRUYsQ0FBQyxDQUFDO1NBQ0o7Ozs7O0lBT0ssZ0RBQXFCOzs7O1FBQzNCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQzFDOzs7OztJQVFJLHdDQUFhOzs7O1FBQ3BCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDOzs7Z0JBN2xEL0IsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxVQUFVO29CQUNwQixRQUFRLEVBQUUseXNHQW9GWDtvQkFDQyxNQUFNLEVBQUUsQ0FBQyxtT0FBbU8sQ0FBQztpQkFDOU87Ozs7Z0JBL0ZRLGFBQWE7OztvQ0E4U25CLEtBQUs7b0NBUUwsS0FBSzt3Q0FPTCxLQUFLOzJCQU9MLEtBQUs7dUJBZ0JMLEtBQUs7dUJBaUJMLEtBQUssU0FBQyxNQUFNO3dCQWdCWixLQUFLOzJCQU9MLEtBQUs7MkNBT0wsS0FBSzt1Q0FPTCxLQUFLOzJCQU9MLEtBQUs7NkJBT0wsS0FBSzs2QkFPTCxNQUFNOzJCQU9OLE1BQU07dUJBT04sWUFBWSxTQUFDLG9CQUFvQjt3QkFPakMsWUFBWSxTQUFDLHFCQUFxQjt5QkFPbEMsWUFBWSxTQUFDLHNCQUFzQjs7MkJBamN0Qzs7U0FzR2EsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBDb250ZW50Q2hpbGQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERlY0xpc3RHcmlkQ29tcG9uZW50IH0gZnJvbSAnLi9saXN0LWdyaWQvbGlzdC1ncmlkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNMaXN0VGFibGVDb21wb25lbnQgfSBmcm9tICcuL2xpc3QtdGFibGUvbGlzdC10YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjTGlzdEZpbHRlckNvbXBvbmVudCB9IGZyb20gJy4vbGlzdC1maWx0ZXIvbGlzdC1maWx0ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCwgU3Vic2NyaXB0aW9uLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIGRpc3RpbmN0VW50aWxDaGFuZ2VkLCB0YXAsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IERlY0FwaVNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGVjTGlzdEZldGNoTWV0aG9kLCBDb3VudFJlcG9ydCB9IGZyb20gJy4vbGlzdC5tb2RlbHMnO1xuaW1wb3J0IHsgRmlsdGVyRGF0YSwgRGVjRmlsdGVyLCBGaWx0ZXJHcm91cHMsIEZpbHRlckdyb3VwIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9hcGkvZGVjb3JhLWFwaS5tb2RlbCc7XG5pbXBvcnQgeyBEZWNMaXN0RmlsdGVyIH0gZnJvbSAnLi9saXN0Lm1vZGVscyc7XG5cbmNvbnN0IERFTEVURV9DT01QQVJFX0ZVTkNUSU9OID0gKF9pdGVtLCBpZCkgPT4gX2l0ZW0uaWQgPT09IGlkO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtbGlzdCcsXG4gIHRlbXBsYXRlOiBgPCEtLSBDT01QT05FTlQgTEFZT1VUIC0tPlxuPGRpdiBjbGFzcz1cImxpc3QtY29tcG9uZW50LXdyYXBwZXJcIj5cbiAgPGRpdiAqbmdJZj1cImZpbHRlclwiPlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImRlYy1saXN0LWZpbHRlclwiPjwvbmctY29udGVudD5cbiAgPC9kaXY+XG4gIDxkaXYgKm5nSWY9XCJyZXBvcnQgfHwgZmlsdGVyTW9kZSA9PT0gJ2NvbGxhcHNlJ1wiPlxuICAgIDxkaXYgZnhMYXlvdXQ9XCJjb2x1bW5cIiBmeExheW91dEdhcD1cIjE2cHhcIj5cbiAgICAgIDxkaXYgZnhGbGV4IGNsYXNzPVwidGV4dC1yaWdodFwiICpuZ0lmPVwidGFibGVBbmRHcmlkQXJlU2V0KClcIj5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbWF0LWljb24tYnV0dG9uIChjbGljayk9XCJ0b2dnbGVMaXN0TW9kZSgpXCI+XG4gICAgICAgICAgPG1hdC1pY29uIHRpdGxlPVwiU3dpdGNoIHRvIHRhYmxlIG1vZGVcIiBhcmlhLWxhYmVsPVwiU3dpdGNoIHRvIHRhYmxlIG1vZGVcIiBjb2xvcj1cInByaW1hcnlcIiBjb250cmFzdEZvbnRXaXRoQmcgKm5nSWY9XCJsaXN0TW9kZSA9PT0gJ2dyaWQnXCI+dmlld19oZWFkbGluZTwvbWF0LWljb24+XG4gICAgICAgICAgPG1hdC1pY29uIHRpdGxlPVwiU3dpdGNoIHRvIGdyaWQgbW9kZVwiIGFyaWEtbGFiZWw9XCJTd2l0Y2ggdG8gZ3JpZCBtb2RlXCIgY29sb3I9XCJwcmltYXJ5XCIgY29udHJhc3RGb250V2l0aEJnICpuZ0lmPVwibGlzdE1vZGUgPT09ICd0YWJsZSdcIj52aWV3X21vZHVsZTwvbWF0LWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGZ4RmxleD5cbiAgICAgICAgPGRpdiAqbmdJZj1cImZpbHRlck1vZGUgPT0gJ2NvbGxhcHNlJyB0aGVuIGNvbGxhcHNlVGVtcGxhdGUgZWxzZSB0YWJzVGVtcGxhdGVcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuXG48IS0tIEdSSUQgVEVNUExBVEUgLS0+XG48bmctdGVtcGxhdGUgI2dyaWRUZW1wbGF0ZT5cbiAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZGVjLWxpc3QtZ3JpZFwiPjwvbmctY29udGVudD5cbjwvbmctdGVtcGxhdGU+XG5cbjwhLS0gVEFCTEUgVEVNUExBVEUgLS0+XG48bmctdGVtcGxhdGUgI2xpc3RUZW1wbGF0ZT5cbiAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZGVjLWxpc3QtdGFibGVcIj48L25nLWNvbnRlbnQ+XG48L25nLXRlbXBsYXRlPlxuXG48IS0tIEZPT1RFUiBURU1QTEFURSAtLT5cbjxuZy10ZW1wbGF0ZSAjZm9vdGVyVGVtcGxhdGU+XG4gIDxuZy1jb250ZW50IHNlbGVjdD1cImRlYy1saXN0LWZvb3RlclwiPjwvbmctY29udGVudD5cbiAgPHAgY2xhc3M9XCJsaXN0LWZvb3RlclwiPlxuICAgIHt7ICdsYWJlbC5hbW91bnQtbG9hZGVkLW9mLXRvdGFsJyB8XG4gICAgICB0cmFuc2xhdGU6e1xuICAgICAgICBsb2FkZWQ6IHJlcG9ydD8ucmVzdWx0Py5yb3dzPy5sZW5ndGgsXG4gICAgICAgIHRvdGFsOiByZXBvcnQ/LnJlc3VsdD8uY291bnRcbiAgICAgIH1cbiAgICB9fVxuICA8L3A+XG48L25nLXRlbXBsYXRlPlxuXG48IS0tIENPTExBUFNFIFRFTVBMQVRFIC0tPlxuPG5nLXRlbXBsYXRlICN0YWJzVGVtcGxhdGU+XG4gIDxkaXYgZnhMYXlvdXQ9XCJjb2x1bW5cIiBmeExheW91dEdhcD1cIjE2cHhcIj5cbiAgICA8ZGl2ICpuZ0lmPVwibGlzdE1vZGUgPT0gJ2dyaWQnIHRoZW4gZ3JpZFRlbXBsYXRlIGVsc2UgbGlzdFRlbXBsYXRlXCI+PC9kaXY+XG4gICAgPCEtLSBGT09URVIgQ09OVEVOVCAtLT5cbiAgICA8ZGl2IGZ4RmxleD5cbiAgICAgIDxkaXYgKm5nSWY9XCJzaG93Rm9vdGVyICYmICFsb2FkaW5nIHRoZW4gZm9vdGVyVGVtcGxhdGVcIj48L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8IS0tIExPQURJTkcgU1BJTk5FUiAtLT5cbiAgICA8ZGl2IGZ4RmxleCAqbmdJZj1cImxvYWRpbmdcIiBjbGFzcz1cInRleHQtY2VudGVyIGxvYWRpbmctc3Bpbm5lci13cmFwcGVyXCI+XG4gICAgICA8ZGVjLXNwaW5uZXI+PC9kZWMtc3Bpbm5lcj5cbiAgICA8L2Rpdj5cbiAgICA8IS0tIExPQUQgTU9SRSBCVVRUT04gLS0+XG4gICAgPGRpdiBmeEZsZXggKm5nSWY9XCIhaXNMYXN0UGFnZSAmJiAhbG9hZGluZyAmJiAhZGlzYWJsZVNob3dNb3JlQnV0dG9uXCIgY2xhc3M9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbWF0LXJhaXNlZC1idXR0b24gKGNsaWNrKT1cInNob3dNb3JlKClcIj57eydsYWJlbC5zaG93LW1vcmUnIHwgdHJhbnNsYXRlfX08L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L25nLXRlbXBsYXRlPlxuXG48IS0tIENPTExBUFNFIFRFTVBMQVRFIC0tPlxuPG5nLXRlbXBsYXRlICNjb2xsYXBzZVRlbXBsYXRlPlxuICA8bWF0LWFjY29yZGlvbj5cbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBmaWx0ZXIgb2YgY29sbGFwc2FibGVGaWx0ZXJzLmNoaWxkcmVuXCI+XG4gICAgICA8bWF0LWV4cGFuc2lvbi1wYW5lbCAob3BlbmVkKT1cInNlYXJjaENvbGxhcHNhYmxlKGZpbHRlcilcIj5cbiAgICAgICAgPG1hdC1leHBhbnNpb24tcGFuZWwtaGVhZGVyPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2xsYXBzZS10aXRsZVwiIGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRHYXA9XCIzMnB4XCIgZnhMYXlvdXRBbGlnbj1cImxlZnQgY2VudGVyXCI+XG4gICAgICAgICAgICA8ZGl2IGZ4RmxleD1cIjk2cHhcIiAqbmdJZj1cImNvdW50UmVwb3J0XCI+XG4gICAgICAgICAgICAgIDxkZWMtbGFiZWwgW2NvbG9ySGV4XT1cImZpbHRlci5jb2xvclwiPnt7IGdldENvbGxhcHNhYmxlQ291bnQoZmlsdGVyLnVpZCkgfX08L2RlYy1sYWJlbD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAge3sgJ2xhYmVsLicgKyBmaWx0ZXIubGFiZWwgfCB0cmFuc2xhdGUgfX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9tYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlcj5cbiAgICAgICAgPGRpdiAqbmdJZj1cInNlbGVjdGVkQ29sbGFwc2FibGUgPT09IGZpbHRlci51aWRcIj5cbiAgICAgICAgICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRhYnNUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbWF0LWV4cGFuc2lvbi1wYW5lbD5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgPC9tYXQtYWNjb3JkaW9uPlxuICA8ZGl2IGNsYXNzPVwiYWNjb3JkaW9uLWJvdHRvbS1tYXJnaW5cIj48L2Rpdj5cbjwvbmctdGVtcGxhdGU+XG5cbmAsXG4gIHN0eWxlczogW2AubGlzdC1mb290ZXJ7Zm9udC1zaXplOjE0cHg7dGV4dC1hbGlnbjpjZW50ZXJ9Lmxpc3QtY29tcG9uZW50LXdyYXBwZXJ7bWluLWhlaWdodDo3MnB4fS50ZXh0LXJpZ2h0e3RleHQtYWxpZ246cmlnaHR9LmxvYWRpbmctc3Bpbm5lci13cmFwcGVye3BhZGRpbmc6MzJweH0uY29sbGFwc2UtdGl0bGV7d2lkdGg6MTAwJX0uYWNjb3JkaW9uLWJvdHRvbS1tYXJnaW57bWFyZ2luLWJvdHRvbToxMDBweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQge1xuXG4gIC8qXG4gICogY291bnRSZXBvcnRcbiAgKlxuICAqXG4gICovXG4gIGNvdW50UmVwb3J0OiBDb3VudFJlcG9ydDtcblxuICAvKlxuICAqIGZpbHRlck1vZGVcbiAgKlxuICAqXG4gICovXG4gIGZpbHRlck1vZGU6ICd0YWJzJyB8ICdjb2xsYXBzZScgPSAndGFicyc7XG5cblxuICAvKlxuICAqIGNvbGxhcHNhYmxlRmlsdGVyc1xuICAqXG4gICpcbiAgKi9cbiAgY29sbGFwc2FibGVGaWx0ZXJzOiB7IHRhYjogc3RyaW5nLCBjaGlsZHJlbjogRGVjTGlzdEZpbHRlcltdIH07XG5cbiAgLypcbiAgICogbG9hZGluZ1xuICAgKlxuICAgKlxuICAgKi9cbiAgc2V0IGxvYWRpbmcodikge1xuXG4gICAgdGhpcy5fbG9hZGluZyA9IHY7XG5cbiAgICBpZiAodGhpcy5maWx0ZXIpIHtcblxuICAgICAgdGhpcy5maWx0ZXIubG9hZGluZyA9IHY7XG5cbiAgICB9XG5cbiAgfVxuXG4gIGdldCBsb2FkaW5nKCkge1xuICAgIHJldHVybiB0aGlzLl9sb2FkaW5nO1xuICB9XG5cbiAgLypcbiAgICogZmlsdGVyR3JvdXBzXG4gICAqXG4gICAqXG4gICAqL1xuICBnZXQgZmlsdGVyR3JvdXBzKCk6IEZpbHRlckdyb3VwcyB7XG4gICAgcmV0dXJuIHRoaXMuZmlsdGVyID8gdGhpcy5maWx0ZXIuZmlsdGVyR3JvdXBzIDogW107XG4gIH1cblxuICAvKlxuICAgKiBzZWxlY3RlZENvbGxhcHNhYmxlXG4gICAqXG4gICAqXG4gICAqL1xuICBzZWxlY3RlZENvbGxhcHNhYmxlO1xuXG4gIC8qXG4gICAqIHJlcG9ydFxuICAgKlxuICAgKlxuICAgKi9cbiAgcmVwb3J0O1xuXG4gIC8qXG4gICAqIGlzTGFzdFBhZ2VcbiAgICpcbiAgICpcbiAgICovXG4gIGlzTGFzdFBhZ2U6IGJvb2xlYW47XG5cbiAgLypcbiAgKiBzZWxlY3RlZFRhYlxuICAqXG4gICpcbiAgKi9cbiAgc2VsZWN0ZWRUYWI6IGFueTtcblxuICAvKlxuICAqIHByZXZpb3VzU2VsZWN0ZWRUYWJcbiAgKlxuICAqXG4gICovXG4gIHByZXZpb3VzU2VsZWN0ZWRUYWI6IGFueTtcblxuICAvKlxuICAgKiBmaWx0ZXJEYXRhXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIGZpbHRlckRhdGE6IFN1YmplY3Q8RmlsdGVyRGF0YT4gPSBuZXcgU3ViamVjdDxGaWx0ZXJEYXRhPigpO1xuXG4gIC8qXG4gICAqIF9sb2FkaW5nO1xuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBfbG9hZGluZyA9IHRydWU7XG5cbiAgLypcbiAgICogY2xlYXJBbmRSZWxvYWRSZXBvcnRcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgY2xlYXJBbmRSZWxvYWRSZXBvcnQ7XG5cbiAgLypcbiAgICogZmlsdGVyU3Vic2NyaXB0aW9uXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIGZpbHRlclN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qXG4gICAqIHJlYWN0aXZlUmVwb3J0XG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHJlYWN0aXZlUmVwb3J0OiBPYnNlcnZhYmxlPGFueT47XG5cbiAgLypcbiAgICogcmVhY3RpdmVSZXBvcnRTdWJzY3JpcHRpb25cbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgcmVhY3RpdmVSZXBvcnRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKlxuICAgKiBzY3JvbGxhYmxlQ29udGFpbmVyXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHNjcm9sbGFibGVDb250YWluZXI6IEVsZW1lbnQ7XG5cbiAgLypcbiAgICogc2Nyb2xsRXZlbnRFbWl0ZXJcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc2Nyb2xsRXZlbnRFbWl0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAvKlxuICAgKiBzY3JvbGxFdmVudEVtaXRlclN1YnNjcmlwdGlvblxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzY3JvbGxFdmVudEVtaXRlclN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qXG4gICAqIHRhYnNDaGFuZ2VTdWJzY3JpcHRpb25cbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgdGFic0NoYW5nZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qXG4gICAqIHRhYmxlU29ydFN1YnNjcmlwdGlvblxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB0YWJsZVNvcnRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKlxuICAgKiBwYXlsb2FkXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHBheWxvYWQ6IERlY0ZpbHRlcjtcblxuICAvKlxuICAgKiBfZW5kcG9pbnQgaW50ZXJuYWxsXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIF9lbmRwb2ludDogc3RyaW5nO1xuXG4gIC8qXG4gICAqIF9maWx0ZXJcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgX2ZpbHRlcjogRGVjTGlzdEZpbHRlckNvbXBvbmVudDtcblxuICAvKlxuICAgKiBfbmFtZVxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBfbmFtZTogc3RyaW5nO1xuXG4gIC8qXG4gICAqIF9naXZlblJvd3NcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgX2dpdmVuUm93czogYW55W107XG5cbiAgLypcbiAgICogY3VzdG9tRmV0Y2hNZXRob2RcbiAgICpcbiAgICogbWV0aG9kIHVzZWQgdG8gZmV0Y2ggZGF0YSBmcm9tIGJhY2stZW5kXG4gICAqL1xuICBASW5wdXQoKSBjdXN0b21GZXRjaE1ldGhvZDogRGVjTGlzdEZldGNoTWV0aG9kO1xuXG4gIC8qXG4gICAqIGNvbHVtbnNTb3J0Q29uZmlnXG4gICAqXG4gICAqIHVzZWQgdG8gZ2V0IGEgc29ydGVkIGxpc3QgZnJvbSBiYWNrZW5kXG4gICAqIGNhbiBiZSBwYXNlZCB2aWEgYXR0cmlidXRlIHRvIHNvcnQgdGhlIGZpcnN0IGxvYWRcbiAgICovXG4gIEBJbnB1dCgpIGNvbHVtbnNTb3J0Q29uZmlnO1xuXG4gIC8qXG4gICAqIGRpc2FibGVTaG93TW9yZUJ1dHRvblxuICAgKlxuICAgKiB1c2VkIHRvIGhpZGUgdGhlIHNob3cgbW9yZSBidXR0b25cbiAgICovXG4gIEBJbnB1dCgpIGRpc2FibGVTaG93TW9yZUJ1dHRvbjogYm9vbGVhbjtcblxuICAvKlxuICAgKiBlbmRwb2ludFxuICAgKlxuICAgKlxuICAgKi9cbiAgQElucHV0KClcbiAgc2V0IGVuZHBvaW50KHY6IHN0cmluZykge1xuICAgIGlmICh0aGlzLl9lbmRwb2ludCAhPT0gdikge1xuICAgICAgdGhpcy5fZW5kcG9pbnQgPSAodlswXSAmJiB2WzBdID09PSAnLycpID8gdi5yZXBsYWNlKCcvJywgJycpIDogdjtcbiAgICB9XG4gIH1cblxuICBnZXQgZW5kcG9pbnQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fZW5kcG9pbnQ7XG4gIH1cblxuICAvKlxuICAgKiBuYW1lXG4gICAqXG4gICAqXG4gICAqL1xuICBASW5wdXQoKVxuICBzZXQgbmFtZSh2OiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5fbmFtZSAhPT0gdikge1xuICAgICAgdGhpcy5fbmFtZSA9IHY7XG4gICAgICB0aGlzLnNldEZpbHRlcnNDb21wb25lbnRzQmFzZVBhdGhBbmROYW1lcygpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBuYW1lKCkge1xuICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICB9XG5cbiAgLypcbiAgICogcm93c1xuICAgKlxuICAgKlxuICAgKi9cbiAgQElucHV0KCdyb3dzJylcblxuICBzZXQgcm93cyhyb3dzKSB7XG4gICAgdGhpcy5fZ2l2ZW5Sb3dzID0gcm93cztcbiAgICB0aGlzLnNldFJvd3ModGhpcy5fZ2l2ZW5Sb3dzKTtcbiAgfVxuXG4gIGdldCByb3dzKCkge1xuICAgIHJldHVybiB0aGlzLnJlcG9ydCA/IHRoaXMucmVwb3J0LnJlc3VsdC5yb3dzIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgLypcbiAgICogbGltaXRcbiAgICpcbiAgICpcbiAgICovXG4gIEBJbnB1dCgpIGxpbWl0ID0gMTA7XG5cbiAgLypcbiAgICogbGlzdE1vZGVcbiAgICpcbiAgICpcbiAgICovXG4gIEBJbnB1dCgpIGxpc3RNb2RlO1xuXG4gIC8qXG4gICAqIHNjcm9sbGFibGVDb250YWluZXJDbGFzc1xuICAgKlxuICAgKiBXaGVyZSB0aGUgc2Nyb2xsIHdhdGNoZXIgc2hvdWxkIGJlIGxpc3RlbmluZ1xuICAgKi9cbiAgQElucHV0KCkgc2Nyb2xsYWJsZUNvbnRhaW5lckNsYXNzID0gJ21hdC1zaWRlbmF2LWNvbnRlbnQnO1xuXG4gIC8qXG4gICAqIHNlYXJjaGFibGVQcm9wZXJ0aWVzXG4gICAqXG4gICAqIFByb3BlcnRpZXMgdG8gYmUgc2VhcmNoZWQgd2hlbiB1c2luZyBiYXNpYyBzZWFyY2hcbiAgICovXG4gIEBJbnB1dCgpIHNlYXJjaGFibGVQcm9wZXJ0aWVzOiBzdHJpbmdbXTtcblxuICAvKlxuICAgKiBzaG93Rm9vdGVyXG4gICAqXG4gICAqXG4gICAqL1xuICBASW5wdXQoKSBzZWxlY3RlZCA9IFtdO1xuXG4gIC8qXG4gICAqIHNob3dGb290ZXJcbiAgICpcbiAgICpcbiAgICovXG4gIEBJbnB1dCgpIHNob3dGb290ZXIgPSB0cnVlO1xuXG4gIC8qXG4gICAqIHBvc3RTZWFyY2hcbiAgICpcbiAgICogVGhpcyBtaWRkbGV3YXJlIGlzIHVzZWQgdG8gdHJpZ2dlciBldmVudHMgYWZ0ZXIgZXZlcnkgc2VhcmNoXG4gICAqL1xuICBAT3V0cHV0KCkgcG9zdFNlYXJjaCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIC8qXG4gICAqIHJvd0NsaWNrXG4gICAqXG4gICAqIEVtaXRzIGFuIGV2ZW50IHdoZW4gYSByb3cgb3IgY2FyZCBpcyBjbGlja2VkXG4gICAqL1xuICBAT3V0cHV0KCkgcm93Q2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgLypcbiAgICogZ3JpZFxuICAgKlxuICAgKlxuICAgKi9cbiAgQENvbnRlbnRDaGlsZChEZWNMaXN0R3JpZENvbXBvbmVudCkgZ3JpZDogRGVjTGlzdEdyaWRDb21wb25lbnQ7XG5cbiAgLypcbiAgICogdGFibGVcbiAgICpcbiAgICpcbiAgICovXG4gIEBDb250ZW50Q2hpbGQoRGVjTGlzdFRhYmxlQ29tcG9uZW50KSB0YWJsZTogRGVjTGlzdFRhYmxlQ29tcG9uZW50O1xuXG4gIC8qXG4gICAqIGZpbHRlclxuICAgKlxuICAgKlxuICAgKi9cbiAgQENvbnRlbnRDaGlsZChEZWNMaXN0RmlsdGVyQ29tcG9uZW50KVxuICBzZXQgZmlsdGVyKHY6IERlY0xpc3RGaWx0ZXJDb21wb25lbnQpIHtcbiAgICBpZiAodGhpcy5fZmlsdGVyICE9PSB2KSB7XG4gICAgICB0aGlzLl9maWx0ZXIgPSB2O1xuICAgICAgdGhpcy5zZXRGaWx0ZXJzQ29tcG9uZW50c0Jhc2VQYXRoQW5kTmFtZXMoKTtcbiAgICB9XG4gIH1cblxuICBnZXQgZmlsdGVyKCkge1xuICAgIHJldHVybiB0aGlzLl9maWx0ZXI7XG4gIH1cblxuICAvKlxuICAgKiBuZ09uSW5pdFxuICAgKlxuICAgKlxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBzZXJ2aWNlOiBEZWNBcGlTZXJ2aWNlXG4gICkgeyB9XG5cbiAgLypcbiAgICogbmdPbkluaXRcbiAgICpcbiAgICogU3RhcnRzIGEgZnJlc2ggY29tcG9uZW50IGFuZCBwcmVwYXJlIGl0IHRvIHJ1blxuICAgKlxuICAgKiAtIFN0YXJ0IHRoZSBSZWFjdGl2ZSBSZXBvcnRcbiAgICogLSBTdWJzY3JpYmUgdG8gdGhlIFJlYWN0aXZlIFJlcG9ydFxuICAgKiAtIFN0YXJ0IHdhdGNoaW5nIHdpbmRvdyBTY3JvbGxcbiAgICogLSBFbnN1cmUgdW5pcXVlIG5hbWVcbiAgICovXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMud2F0Y2hGaWx0ZXJEYXRhKCk7XG4gICAgdGhpcy5lbnN1cmVVbmlxdWVOYW1lKCk7XG4gICAgdGhpcy5kZXRlY3RMaXN0TW9kZUJhc2VkT25HcmlkQW5kVGFibGVQcmVzZW5jZSgpO1xuICB9XG5cbiAgLypcbiAgKiBuZ0FmdGVyVmlld0luaXRcbiAgKlxuICAqIFdhaXQgZm9yIHRoZSBzdWJjb21wb25lbnRzIHRvIHN0YXJ0IGJlZm9yZSBydW4gdGhlIGNvbXBvbmVudFxuICAqXG4gICogLSBTdGFydCB3YXRjaGluZyBGaWx0ZXJcbiAgKiAtIERvIHRoZSBmaXJzdCBsb2FkXG4gICovXG4gbmdBZnRlclZpZXdJbml0KCkge1xuICAgdGhpcy53YXRjaEZpbHRlcigpO1xuICAgdGhpcy5kb0ZpcnN0TG9hZCgpO1xuICAgdGhpcy5kZXRlY3RMaXN0TW9kZSgpO1xuICAgdGhpcy53YXRjaFRhYnNDaGFuZ2UoKTtcbiAgIHRoaXMud2F0Y2hUYWJsZVNvcnQoKTtcbiAgIHRoaXMucmVnaXN0ZXJDaGlsZFdhdGNoZXJzKCk7XG4gICB0aGlzLnNoYXJlU2VsZWN0ZWRSb3dzQXJyYXkoKTtcbiAgIHRoaXMud2F0Y2hTY3JvbGwoKTtcbiAgIHRoaXMud2F0Y2hTY3JvbGxFdmVudEVtaXR0ZXIoKTtcbiAgfVxuXG4gIC8qXG4gICAqIG5nT25EZXN0cm95XG4gICAqXG4gICAqIERlc3Ryb3kgd2F0Y2hlciB0byBmcmVlIG1lZW1vcnkgYW5kIHJlbW92ZSB1bm5lY2Vzc2FyeSB0cmlnZ2Vyc1xuICAgKlxuICAgKiAtIFVuc3Vic2NyaWJlIGZyb20gdGhlIFJlYWN0aXZlIFJlcG9ydFxuICAgKiAtIFN0b3Agd2F0Y2hpbmcgd2luZG93IFNjcm9sbFxuICAgKiAtIFN0b3Agd2F0Y2hpbmcgRmlsdGVyXG4gICAqL1xuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnVuc3Vic2NyaWJlVG9SZWFjdGl2ZVJlcG9ydCgpO1xuICAgIHRoaXMuc3RvcFdhdGNoaW5nU2Nyb2xsKCk7XG4gICAgdGhpcy5zdG9wV2F0Y2hpbmdGaWx0ZXIoKTtcbiAgICB0aGlzLnN0b3BXYXRjaGluZ1RhYnNDaGFuZ2UoKTtcbiAgICB0aGlzLnN0b3BXYXRjaGluZ1RhYmxlU29ydCgpO1xuICAgIHRoaXMuc3RvcFdhdGNoaW5nU2Nyb2xsRXZlbnRFbWl0dGVyKCk7XG4gIH1cblxuICAvKlxuICAgKiByZWxvYWRDb3VudFJlcG9ydFxuICAgKlxuICAgKi9cbiAgcmVsb2FkQ291bnRSZXBvcnQoKSB7XG5cbiAgICBpZiAodGhpcy5maWx0ZXIgJiYgdGhpcy5maWx0ZXIuZmlsdGVycyAmJiB0aGlzLmZpbHRlci5sb2FkQ291bnRSZXBvcnQpIHtcblxuICAgICAgY29uc3QgZW5kcG9pbnQgPSB0aGlzLmVuZHBvaW50W3RoaXMuZW5kcG9pbnQubGVuZ3RoIC0gMV0gPT09ICcvJyA/IGAke3RoaXMuZW5kcG9pbnR9Y291bnRgIDogYCR7dGhpcy5lbmRwb2ludH0vY291bnRgO1xuXG4gICAgICBjb25zdCBmaWx0ZXJzID0gdGhpcy5maWx0ZXIuZmlsdGVycztcblxuICAgICAgY29uc3QgcGF5bG9hZFdpdGhTZWFyY2hhYmxlUHJvcGVydGllcyA9IHRoaXMuZ2V0Q291bnRhYmxlRmlsdGVycyhmaWx0ZXJzKTtcblxuICAgICAgdGhpcy5zZXJ2aWNlLnBvc3QoZW5kcG9pbnQsIHBheWxvYWRXaXRoU2VhcmNoYWJsZVByb3BlcnRpZXMpXG4gICAgICAgIC5zdWJzY3JpYmUocmVzID0+IHtcblxuICAgICAgICAgIHRoaXMuY291bnRSZXBvcnQgPSB0aGlzLm1vdW50Q291bnRSZXBvcnQocmVzKTtcblxuICAgICAgICAgIHRoaXMuZmlsdGVyLmNvdW50UmVwb3J0ID0gdGhpcy5jb3VudFJlcG9ydDtcblxuICAgICAgICB9KTtcblxuICAgIH1cblxuICB9XG5cbiAgLypcbiAgICogcmVtb3ZlSXRlbVxuICAgKlxuICAgKiBSZW1vdmVzIGFuIGl0ZW0gZnJvbSB0aGUgbGlzdFxuICAgKi9cbiAgcmVtb3ZlSXRlbShpZHM6IG51bWJlciB8IG51bWJlcltdLCBjb21wYXJlRm4gPSBERUxFVEVfQ09NUEFSRV9GVU5DVElPTiwgcmVjb3VudCA9IHRydWUpIHtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KGlkcykpIHtcblxuICAgICAgaWRzLmZvckVhY2goaWQgPT4ge1xuXG4gICAgICAgIHRoaXMucmVtb3ZlSXRlbShpZCwgY29tcGFyZUZuLCBmYWxzZSk7XG5cbiAgICAgIH0pO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgY29uc3QgaXRlbSA9IHRoaXMucm93cy5maW5kKChfaXRlbSkgPT4gY29tcGFyZUZuKF9pdGVtLCBpZHMpKTtcblxuICAgICAgaWYgKGl0ZW0pIHtcblxuICAgICAgICAgIGNvbnN0IGl0ZW1JbmRleCA9IHRoaXMucm93cy5pbmRleE9mKGl0ZW0pO1xuXG4gICAgICAgICAgaWYgKGl0ZW1JbmRleCA+PSAwKSB7XG5cbiAgICAgICAgICAgIHRoaXMucm93cy5zcGxpY2UoaXRlbUluZGV4LCAxKTtcblxuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHNlbGVjdGVkSXRlbUluZGV4ID0gdGhpcy5zZWxlY3RlZC5pbmRleE9mKGl0ZW0pO1xuXG4gICAgICAgICAgaWYgKHNlbGVjdGVkSXRlbUluZGV4ID49IDApIHtcblxuICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkLnNwbGljZShzZWxlY3RlZEl0ZW1JbmRleCwgMSk7XG5cbiAgICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgIH1cblxuICAgIGlmIChyZWNvdW50ICYmIHRoaXMuZW5kcG9pbnQpIHtcblxuICAgICAgdGhpcy5yZWxvYWRDb3VudFJlcG9ydCgpO1xuXG4gICAgfVxuXG4gIH1cblxuICAvKlxuICAgKiByZXN0YXJ0XG4gICAqXG4gICAqIENsZWFyIHRoZSBsaXN0IGFuZCByZWxvYWQgdGhlIGZpcnN0IHBhZ2VcbiAgICovXG4gIHJlc3RhcnQoKSB7XG5cbiAgICB0aGlzLmxvYWRSZXBvcnQodHJ1ZSk7XG4gICAgdGhpcy5yZXNldFNlbGVjdGVkKCk7XG4gIH1cblxuICAvKlxuICAgKiBzaG93TW9yZVxuICAgKlxuICAgKi9cbiAgc2hvd01vcmUoKSB7XG5cbiAgICByZXR1cm4gdGhpcy5sb2FkUmVwb3J0KCk7XG5cbiAgfVxuXG4gIC8qXG4gICAqIHNlYXJjaENvbGxhcHNhYmxlXG4gICAqXG4gICAqIHNlYXJjaCBieSBjb2xsYXBzYWJsZSBmaWx0ZXJcbiAgICovXG4gIHNlYXJjaENvbGxhcHNhYmxlKGZpbHRlcjogRGVjTGlzdEZpbHRlcikge1xuXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRDb2xsYXBzYWJsZSAhPT0gZmlsdGVyLnVpZCkge1xuXG4gICAgICB0aGlzLmxvYWRCeU9wZW5uZWRDb2xsYXBzZShmaWx0ZXIudWlkKTtcblxuICAgIH1cblxuICB9XG5cbiAgLypcbiAgICogdGFibGVBbmRHcmlkQXJlU2V0XG4gICAqXG4gICAqIFJldHVybiB0cnVlIGlmIHRoZXJlIGFyZSBib3RoIEdSSUQgYW5kIFRBQkxFIGRlZmluaXRpb24gaW5zaWRlIHRoZSBsaXN0XG4gICAqL1xuICB0YWJsZUFuZEdyaWRBcmVTZXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ3JpZCAmJiB0aGlzLnRhYmxlO1xuICB9XG5cbiAgLypcbiAgICogdG9nZ2xlTGlzdE1vZGVcbiAgICpcbiAgICogQ2hhbmdlcyBiZXR3ZWVuIEdSSUQgYW5kIFRBQkxFIHZpc3VhbGl6YXRvaW4gbW9kZXNcbiAgICovXG4gIHRvZ2dsZUxpc3RNb2RlKCkge1xuXG4gICAgdGhpcy5saXN0TW9kZSA9IHRoaXMubGlzdE1vZGUgPT09ICdncmlkJyA/ICd0YWJsZScgOiAnZ3JpZCc7XG5cbiAgICBpZiAodGhpcy5saXN0TW9kZSA9PT0gJ3RhYmxlJykge1xuXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcblxuICAgICAgICB0aGlzLnRhYmxlLnRhYmxlQ29tcG9uZW50LnJlY2FsY3VsYXRlKCk7XG5cbiAgICAgIH0sIDEpO1xuXG4gICAgfVxuXG4gIH1cblxuICAvKlxuICAgKiBnZXRDb2xsYXBzYWJsZUNvdW50XG4gICAqXG4gICAqIGdldCBDb2xsYXBzYWJsZSBDb3VudCBmcm9tIGNvdW50UmVwb3J0XG4gICAqL1xuICBnZXRDb2xsYXBzYWJsZUNvdW50KHVpZCkge1xuXG4gICAgdHJ5IHtcblxuICAgICAgcmV0dXJuIHRoaXMuY291bnRSZXBvcnRbdGhpcy5zZWxlY3RlZFRhYl0uY2hpbGRyZW5bdWlkXS5jb3VudDtcblxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG5cbiAgICAgIHJldHVybiAnPyc7XG5cbiAgICB9XG5cblxuICB9XG5cbiAgLypcbiAgIGdldExpc3RNb2RlXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIGdldExpc3RNb2RlID0gKCkgPT4ge1xuXG4gICAgbGV0IGxpc3RNb2RlID0gdGhpcy5saXN0TW9kZTtcblxuICAgIGlmICh0aGlzLmZpbHRlciAmJiB0aGlzLmZpbHRlci50YWJzRmlsdGVyQ29tcG9uZW50KSB7XG5cbiAgICAgIGlmICh0aGlzLnNlbGVjdGVkVGFiICYmIHRoaXMuc2VsZWN0ZWRUYWIubGlzdE1vZGUpIHtcblxuICAgICAgICBsaXN0TW9kZSA9IHRoaXMuc2VsZWN0ZWRUYWIubGlzdE1vZGU7XG5cbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgbGlzdE1vZGUgPSB0aGlzLnRhYmxlID8gJ3RhYmxlJyA6ICdncmlkJztcblxuICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmV0dXJuIGxpc3RNb2RlO1xuXG4gIH1cblxuICAvKlxuICAgbW91bnRDb3VudFJlcG9ydFxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBtb3VudENvdW50UmVwb3J0KGZpbHRlcnNDb3VudGVycyk6IENvdW50UmVwb3J0IHtcblxuICAgIGNvbnN0IGNvdW50UmVwb3J0OiBDb3VudFJlcG9ydCA9IHtcbiAgICAgIGNvdW50OiAwXG4gICAgfTtcblxuICAgIGZpbHRlcnNDb3VudGVycy5mb3JFYWNoKGl0ZW0gPT4ge1xuXG4gICAgICBjb3VudFJlcG9ydFtpdGVtLnVpZF0gPSB7XG5cbiAgICAgICAgY291bnQ6IGl0ZW0uY291bnRcblxuICAgICAgfTtcblxuICAgICAgaWYgKGl0ZW0uY2hpbGRyZW4pIHtcblxuICAgICAgICBjb3VudFJlcG9ydFtpdGVtLnVpZF0uY2hpbGRyZW4gPSB0aGlzLm1vdW50Q291bnRSZXBvcnQoaXRlbS5jaGlsZHJlbik7XG5cbiAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGNvdW50UmVwb3J0O1xuXG4gIH1cblxuICAvKlxuICAgKiBnZXRDb3VudGFibGVGaWx0ZXJzXG4gICAqXG4gICAqIEdldCB0aGUgc2VhcmNoIGZpbHRlciwgdHJuc2Zvcm1lIHRoZSBzZWFyY2ggcGFyYW1zIGludG8gdGhlIHNlYXJjaGFibGUgcHJvcGVydGllcyBhbmQgaW5qZWN0IGl0IGluIGV2ZXJ5IGZpbHRlciBjb25maWd1cmVkIGluIGRlYy1maWx0ZXJzXG4gICAqXG4gICAqIFRoZSByZXN1bHQgaXMgdXNlZCB0byBjYWxsIHRoZSBjb3VudCBlbmRwb2ludCBhbmQgcmV0dXJuIHRoZSBhbW91bnQgb2YgcmVjY29yZHMgZm91bmQgaW4gZXZlcnkgdGFiL2NvbGxhcHNlXG4gICAqXG4gICAqL1xuICBwcml2YXRlIGdldENvdW50YWJsZUZpbHRlcnMoZmlsdGVycykge1xuXG4gICAgY29uc3QgZmlsdGVyR3JvdXBzV2l0aG91dFRhYnMgPSB0aGlzLmZpbHRlci5maWx0ZXJHcm91cHNXaXRob3V0VGFicyB8fCBbeyBmaWx0ZXJzOiBbXSB9XTtcblxuICAgIGNvbnN0IGZpbHRlcnNQbHVzU2VhcmNoID0gZmlsdGVycy5tYXAoZGVjRmlsdGVyID0+IHtcblxuICAgICAgY29uc3QgZGVjRmlsdGVyRmlsdGVyc1BsdXNTZWFyY2ggPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRlY0ZpbHRlcikpO1xuXG4gICAgICBpZiAoZGVjRmlsdGVyRmlsdGVyc1BsdXNTZWFyY2guZmlsdGVycykge1xuXG4gICAgICAgIGNvbnN0IHRhYkZpbHRlcnNDb3B5ID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShkZWNGaWx0ZXJGaWx0ZXJzUGx1c1NlYXJjaC5maWx0ZXJzKSk7XG5cbiAgICAgICAgZGVjRmlsdGVyRmlsdGVyc1BsdXNTZWFyY2guZmlsdGVycyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZmlsdGVyR3JvdXBzV2l0aG91dFRhYnMpKTtcblxuICAgICAgICBkZWNGaWx0ZXJGaWx0ZXJzUGx1c1NlYXJjaC5maWx0ZXJzLmZvckVhY2goZmlsdGVyR3JvdXAgPT4ge1xuXG4gICAgICAgICAgZmlsdGVyR3JvdXAuZmlsdGVycy5wdXNoKC4uLnRhYkZpbHRlcnNDb3B5KTtcblxuICAgICAgICB9KTtcblxuICAgICAgfSBlbHNlIGlmIChkZWNGaWx0ZXJGaWx0ZXJzUGx1c1NlYXJjaC5jaGlsZHJlbikge1xuXG4gICAgICAgIGRlY0ZpbHRlckZpbHRlcnNQbHVzU2VhcmNoLmNoaWxkcmVuID0gdGhpcy5nZXRDb3VudGFibGVGaWx0ZXJzKGRlY0ZpbHRlckZpbHRlcnNQbHVzU2VhcmNoLmNoaWxkcmVuKTtcblxuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICB1aWQ6IGRlY0ZpbHRlckZpbHRlcnNQbHVzU2VhcmNoLnVpZCxcbiAgICAgICAgZmlsdGVyczogZGVjRmlsdGVyRmlsdGVyc1BsdXNTZWFyY2guZmlsdGVycyxcbiAgICAgICAgY2hpbGRyZW46IGRlY0ZpbHRlckZpbHRlcnNQbHVzU2VhcmNoLmNoaWxkcmVuLFxuICAgICAgfTtcblxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuZW5zdXJlRmlsdGVyVmFsdWVzQXNBcnJheShmaWx0ZXJzUGx1c1NlYXJjaCk7XG5cbiAgfVxuXG4gIC8qXG4gICAqIGVuc3VyZUZpbHRlclZhbHVlc0FzQXJyYXlcbiAgICpcbiAgICogR2V0IGFuIGFycmF5IG9mIGZpbHRlcmdyb3VwcyBhbmQgc2V0IHRoZSBmaWx0ZXIgdmFsdWVzIHRvIGFycmF5IGlmIG5vdFxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBlbnN1cmVGaWx0ZXJWYWx1ZXNBc0FycmF5KGZpbHRlckdyb3VwczogYW55ID0gW10pIHtcblxuICAgIHJldHVybiBmaWx0ZXJHcm91cHMubWFwKGRlY0xpc3RGaWx0ZXIgPT4ge1xuXG4gICAgICBpZiAoZGVjTGlzdEZpbHRlci5maWx0ZXJzKSB7XG5cbiAgICAgICAgdGhpcy5hcHBlbmRGaWx0ZXJHcm91cHNCYXNlZE9uU2VhcmNoYWJsZVByb3BlcnRpZXMoZGVjTGlzdEZpbHRlci5maWx0ZXJzKTtcblxuICAgICAgICBkZWNMaXN0RmlsdGVyLmZpbHRlcnMgPSBkZWNMaXN0RmlsdGVyLmZpbHRlcnMubWFwKGZpbHRlckdyb3VwID0+IHtcblxuXG4gICAgICAgICAgZmlsdGVyR3JvdXAuZmlsdGVycyA9IGZpbHRlckdyb3VwLmZpbHRlcnMubWFwKGZpbHRlciA9PiB7XG5cbiAgICAgICAgICAgIGZpbHRlci52YWx1ZSA9IEFycmF5LmlzQXJyYXkoZmlsdGVyLnZhbHVlKSA/IGZpbHRlci52YWx1ZSA6IFtmaWx0ZXIudmFsdWVdO1xuXG4gICAgICAgICAgICByZXR1cm4gZmlsdGVyO1xuXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICByZXR1cm4gZmlsdGVyR3JvdXA7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRlY0xpc3RGaWx0ZXI7XG5cbiAgICB9KTtcblxuICB9XG5cbiAgLypcbiAgICogYWN0QnlTY3JvbGxQb3NpdGlvblxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBkZXRlY3QgaWYgdGhlcmUgaXMgc2Nyb29saW5nIGFjdGlvbiBvbiB3aW5kb3cgdG8gZmV0Y2ggYW5kIHNob3cgbW9yZSByb3dzIHdoZW4gdGhlIHNjcm9sbGluZyBkb3duLlxuICAgKi9cbiAgcHJpdmF0ZSBhY3RCeVNjcm9sbFBvc2l0aW9uID0gKCRldmVudCkgPT4ge1xuXG4gICAgaWYgKCRldmVudFsncGF0aCddKSB7XG5cbiAgICAgIGNvbnN0IGVsZW1lbnRXaXRoQ2RrT3ZlcmxheUNsYXNzID0gJGV2ZW50WydwYXRoJ10uZmluZChwYXRoID0+IHtcblxuICAgICAgICBjb25zdCBjbGFzc05hbWUgPSBwYXRoWydjbGFzc05hbWUnXSB8fCAnJztcblxuICAgICAgICBjb25zdCBpbnNpZGVPdmVybGF5ID0gY2xhc3NOYW1lLmluZGV4T2YoJ2Nkay1vdmVybGF5JykgPj0gMDtcblxuICAgICAgICBjb25zdCBpbnNpZGVGdWxsc2NyZWFuRGlhbG9nQ29udGFpbmVyID0gY2xhc3NOYW1lLmluZGV4T2YoJ2Z1bGxzY3JlYW4tZGlhbG9nLWNvbnRhaW5lcicpID49IDA7XG5cbiAgICAgICAgcmV0dXJuIGluc2lkZU92ZXJsYXkgfHwgaW5zaWRlRnVsbHNjcmVhbkRpYWxvZ0NvbnRhaW5lcjtcblxuICAgICAgfSk7XG5cbiAgICAgIGlmICghZWxlbWVudFdpdGhDZGtPdmVybGF5Q2xhc3MpIHsgLy8gYXZvaWQgY2xvc2luZyBmaWx0ZXIgZnJvbSBhbnkgb3BlbiBkaWFsb2dcblxuICAgICAgICBpZiAoIXRoaXMuaXNMYXN0UGFnZSkge1xuXG4gICAgICAgICAgY29uc3QgdGFyZ2V0OiBhbnkgPSAkZXZlbnRbJ3RhcmdldCddO1xuXG4gICAgICAgICAgY29uc3QgbGltaXQgPSB0YXJnZXQuc2Nyb2xsSGVpZ2h0IC0gdGFyZ2V0LmNsaWVudEhlaWdodDtcblxuICAgICAgICAgIGlmICh0YXJnZXQuc2Nyb2xsVG9wID49IChsaW1pdCAtIDE2KSkge1xuXG4gICAgICAgICAgICB0aGlzLnNob3dNb3JlKCk7XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgfVxuXG4gIH1cblxuICAvKlxuICAgKiBkZXRlY3RMaXN0TW9kZVxuICAgKlxuICAgZ2V0TGlzdE1vZGUgaW5wdXRcbiAgICovXG4gIHByaXZhdGUgZGV0ZWN0TGlzdE1vZGUoKSB7XG5cbiAgICB0aGlzLmdldExpc3RNb2RlKCk7XG5cbiAgfVxuXG4gIC8qXG4gICAqIGRldGVjdExpc3RNb2RlQmFzZWRPbkdyaWRBbmRUYWJsZVByZXNlbmNlKClcbiAgICpcbiAgICogU2V0IHRoZSBsaXN0IG1vZGUgYmFzZWQgb24gZGVjbGFyYXRpb24gb2YgdGFibGUgYW5kIGdyaWQuIFRoaXMgaXMgbmVjZXNzYXJ5IHRvIGJvb3Rhc3RyYXAgdGhlIGNvbXBvbmVudCB3aXRoIG9ubHkgZ3JpZCBvciBvbmx5IHRhYmxlXG4gICAqIFRoaXMgb25seSB3b3JrIGlmIG5vIG1vZGUgaXMgcHJvdmlkZWQgYnkgQElucHV0IG90aGVyd2lzZSB0aGUgQElucHV0IHZhbHVlIHdpbGwgYmUgdXNlZFxuICAgKi9cbiAgcHJpdmF0ZSBkZXRlY3RMaXN0TW9kZUJhc2VkT25HcmlkQW5kVGFibGVQcmVzZW5jZSgpIHtcblxuICAgIHRoaXMubGlzdE1vZGUgPSB0aGlzLmxpc3RNb2RlID8gdGhpcy5saXN0TW9kZSA6IHRoaXMudGFibGUgPyAndGFibGUnIDogJ2dyaWQnO1xuXG4gIH1cblxuICAvKlxuICAgKiBlbWl0U2Nyb2xsRXZlbnRcbiAgICpcbiAgICogRW1pdHMgc2Nyb2xsIGV2ZW50IHdoZW4gbm90IGxvYWRpbmdcbiAgICovXG4gIHByaXZhdGUgZW1pdFNjcm9sbEV2ZW50ID0gKCRldmVudCkgPT4ge1xuXG4gICAgaWYgKCF0aGlzLmxvYWRpbmcpIHtcblxuICAgICAgdGhpcy5zY3JvbGxFdmVudEVtaXRlci5lbWl0KCRldmVudCk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIC8qXG4gICAqIGlzVGFic0ZpbHRlckRlZmluZWRcbiAgICpcbiAgICogUmV0dXJuIHRydWUgaWYgdGhlIFRhYnMgRmlsdGVyIGlzIGRlZmluZWQgaW5zaWRlIHRoZSBsaXN0XG4gICAqL1xuICBwcml2YXRlIGlzVGFic0ZpbHRlckRlZmluZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZmlsdGVyICYmIHRoaXMuZmlsdGVyLnRhYnNGaWx0ZXJDb21wb25lbnQ7XG4gIH1cblxuICAvKlxuICAgKiBkb0ZpcnN0TG9hZFxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBpcyBjYWxsZWQgYWZ0ZXIgdGhlIHZpZXcgYW5kIGlucHV0cyBhcmUgaW5pdGlhbGl6ZWRcbiAgICpcbiAgICogVGhpcyBpcyB0aGUgZmlyc3QgY2FsbCB0byBnZXQgZGF0YVxuICAgKi9cbiAgcHJpdmF0ZSBkb0ZpcnN0TG9hZCgpIHtcbiAgICBpZiAodGhpcy5pc1RhYnNGaWx0ZXJEZWZpbmVkKCkpIHtcbiAgICAgIHRoaXMuZG9GaXJzdExvYWRCeVRhYnNGaWx0ZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kb0ZpcnN0TG9hZExvY2FsbHkodHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogZG9GaXJzdExvYWRCeVRhYnNGaWx0ZXJcbiAgICpcbiAgICogdXNlIHRoZSB0YWJzIGZpbHRlciB0byB0cmlnZ2VyIHRoZSBmaXJzdCBsb2FkXG4gICAqXG4gICAqIFRoaXMgd2F5IHRoZSBkZWZhdWx0IHRhYiBhbmQgZmlsdGVyIGFyZSBzZWxlY3RlZCBieSB0aGUgZGVjdGFic0ZpbHRlciBjb21wb25lbnRcbiAgICpcbiAgICovXG4gIHByaXZhdGUgZG9GaXJzdExvYWRCeVRhYnNGaWx0ZXIoKSB7XG4gICAgdGhpcy5maWx0ZXIudGFic0ZpbHRlckNvbXBvbmVudC5kb0ZpcnN0TG9hZCgpO1xuICB9XG5cbiAgLypcbiAgICogZG9GaXJzdExvYWRMb2NhbGx5XG4gICAqXG4gICAqIElmIG5vIGZpbHRlciBhcmUgZGVmaW5lZCwganVzdCBjYWxsIHRoIGVlbmRwb2ludCB3aXRob3V0IGZpbHRlcnNcbiAgICovXG4gIHByaXZhdGUgZG9GaXJzdExvYWRMb2NhbGx5KHJlZnJlc2gpIHtcbiAgICB0aGlzLmxvYWRSZXBvcnQocmVmcmVzaCk7XG4gIH1cblxuICAvKlxuICAgKiBlbnN1cmVVbmlxdWVOYW1lXG4gICAqXG4gICAqIFdlIG11c3QgcHJvdmlkZSBhbiB1bmlxdWUgbmFtZSB0byB0aGUgbGlzdCBzbyB3ZSBjYW4gcGVyc2lzdCBpdHMgc3RhdGUgaW4gdGhlIFVSTCB3aXRob3V0IGNvbmZsaWN0c1xuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBlbnN1cmVVbmlxdWVOYW1lKCkge1xuICAgIGlmICghdGhpcy5uYW1lKSB7XG4gICAgICBjb25zdCBlcnJvciA9ICdMaXN0Q29tcG9uZW50RXJyb3I6IFRoZSBsaXN0IGNvbXBvbmVudCBtdXN0IGhhdmUgYW4gdW5pcXVlIG5hbWUgdG8gYmUgdXNlZCBpbiB1cmwgZmlsdGVyLidcbiAgICAgICAgKyAnIFBsZWFzZSwgZW5zdXJlIHRoYXQgeW91IGhhdmUgcGFzc2VkIGFuIHVuaXF1ZSBuYW1tZSB0byB0aGUgY29tcG9uZW50Lic7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIGxvYWRCeU9wZW5uZWRDb2xsYXBzZVxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBpcyB0cmlnZ2VyZWQgd2hlbiBhIGNvbGxhcHNhYmxlIHRhYmxlIGlzIG9wZW4uXG4gICAqXG4gICAqL1xuICBwcml2YXRlIGxvYWRCeU9wZW5uZWRDb2xsYXBzZShmaWx0ZXJVaWQpIHtcblxuICAgIGNvbnN0IGZpbHRlciA9IHRoaXMuY29sbGFwc2FibGVGaWx0ZXJzLmNoaWxkcmVuLmZpbmQoaXRlbSA9PiBpdGVtLnVpZCA9PT0gZmlsdGVyVWlkKTtcblxuICAgIGNvbnN0IGZpbHRlckdyb3VwOiBGaWx0ZXJHcm91cCA9IHsgZmlsdGVyczogZmlsdGVyLmZpbHRlcnMgfTtcblxuICAgIHRoaXMubG9hZFJlcG9ydCh0cnVlLCBmaWx0ZXJHcm91cCk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcblxuICAgICAgdGhpcy5zZWxlY3RlZENvbGxhcHNhYmxlID0gZmlsdGVyLnVpZDtcblxuICAgIH0sIDApO1xuXG5cbiAgfVxuXG4gIC8qXG4gICAqIGxvYWRSZXBvcnRcbiAgICpcbiAgICogVGhpcyBtZWh0b2QgZ2F0aGVyIHRoZSBmaWx0ZXIgaW5mbyBhbmQgZW5kcG9pbnQgYW5kIGNhbGwgdGhlIGJhY2stZW5kIHRvIGZldGNoIHRoZSBkYXRhXG4gICAqXG4gICAqIElmIHRoZSBzdWN0b21GZXRjaE1ldGhvZCBpcyB1c2VkLCBpdHMgY2FsbCBpdFxuICAgKlxuICAgKiBJZiBvbmx5IHRoZSByb3dzIGFyZSBwYXNzZWQsIHRoZSBtZXRob2QganVzdCB1c2UgaXQgYXMgcmVzdWx0XG4gICAqL1xuICBwcml2YXRlIGxvYWRSZXBvcnQoY2xlYXJBbmRSZWxvYWRSZXBvcnQ/OiBib29sZWFuLCBjb2xsYXBzZUZpbHRlckdyb3Vwcz86IEZpbHRlckdyb3VwKTogUHJvbWlzZTxhbnk+IHtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcblxuICAgICAgaWYgKGNsZWFyQW5kUmVsb2FkUmVwb3J0ICYmIHRoaXMucm93cykge1xuXG4gICAgICAgIHRoaXMucmVzZXRTZWxlY3RlZCgpO1xuICAgICAgICB0aGlzLnNldFJvd3ModGhpcy5yb3dzKTtcblxuICAgICAgfVxuXG4gICAgICB0aGlzLmNsZWFyQW5kUmVsb2FkUmVwb3J0ID0gY2xlYXJBbmRSZWxvYWRSZXBvcnQ7XG5cbiAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG5cbiAgICAgIGlmICh0aGlzLmVuZHBvaW50KSB7XG5cbiAgICAgICAgdGhpcy5tb3VudFBheWxvYWQoY2xlYXJBbmRSZWxvYWRSZXBvcnQsIGNvbGxhcHNlRmlsdGVyR3JvdXBzKVxuICAgICAgICAgIC50aGVuKHBheWxvYWQgPT4ge1xuXG4gICAgICAgICAgICB0aGlzLnBheWxvYWQgPSBwYXlsb2FkO1xuXG4gICAgICAgICAgICB0aGlzLmZpbHRlckRhdGEubmV4dCh7IGVuZHBvaW50OiB0aGlzLmVuZHBvaW50LCBwYXlsb2FkOiB0aGlzLnBheWxvYWQsIGNiazogcmVzLCBjbGVhcjogY2xlYXJBbmRSZWxvYWRSZXBvcnQgfSk7XG5cbiAgICAgICAgICB9KTtcblxuXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuY3VzdG9tRmV0Y2hNZXRob2QpIHtcblxuICAgICAgICB0aGlzLm1vdW50UGF5bG9hZChjbGVhckFuZFJlbG9hZFJlcG9ydCwgY29sbGFwc2VGaWx0ZXJHcm91cHMpXG4gICAgICAgICAgLnRoZW4ocGF5bG9hZCA9PiB7XG5cbiAgICAgICAgICAgIHRoaXMucGF5bG9hZCA9IHBheWxvYWQ7XG5cbiAgICAgICAgICAgIHRoaXMuZmlsdGVyRGF0YS5uZXh0KCk7XG5cbiAgICAgICAgICB9KTtcblxuICAgICAgfSBlbHNlIGlmICh0aGlzLnJvd3MpIHtcblxuICAgICAgICBjb25zb2xlLmxvZygnRGVjTGlzdDo6IExvY2FsIGZpbHRlciBub3QgaW1wbGVtZW50ZWQuIFRhbGsgdG8gQnJ1bm8gdG8gc2VlIGhvdyB0byBkbyBpdCEnKTtcblxuICAgICAgfSBlbHNlIHtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcblxuICAgICAgICAgIHJlaignTm8gZW5kcG9pbnQsIGN1c3RvbUZldGNoTWV0aG9kIG9yIHJvd3Mgc2V0Jyk7XG5cbiAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICB9LCAxKTtcblxuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgfVxuXG4gIHByaXZhdGUgbW91bnRQYXlsb2FkKGNsZWFyQW5kUmVsb2FkUmVwb3J0OiBib29sZWFuID0gZmFsc2UsIGNvbGxhcHNlRmlsdGVyR3JvdXBzPykge1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgICAgY29uc3Qgc2VhcmNoRmlsdGVyR3JvdXBzID0gdGhpcy5maWx0ZXIgPyB0aGlzLmZpbHRlci5maWx0ZXJHcm91cHMgOiB1bmRlZmluZWQ7XG5cbiAgICAgIGNvbnN0IGZpbHRlckdyb3VwcyA9IHRoaXMuYXBwZW5kRmlsdGVyR3JvdXBzVG9FYWNoRmlsdGVyR3JvdXAoc2VhcmNoRmlsdGVyR3JvdXBzLCBjb2xsYXBzZUZpbHRlckdyb3Vwcyk7XG5cbiAgICAgIGNvbnN0IHBheWxvYWQ6IERlY0ZpbHRlciA9IHt9O1xuXG4gICAgICBwYXlsb2FkLmxpbWl0ID0gdGhpcy5saW1pdDtcblxuICAgICAgaWYgKGZpbHRlckdyb3Vwcykge1xuXG4gICAgICAgIHBheWxvYWQuZmlsdGVyR3JvdXBzID0gZmlsdGVyR3JvdXBzO1xuXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmNvbHVtbnNTb3J0Q29uZmlnKSB7XG5cbiAgICAgICAgcGF5bG9hZC5zb3J0ID0gdGhpcy5jb2x1bW5zU29ydENvbmZpZztcblxuICAgICAgfVxuXG4gICAgICBpZiAoIWNsZWFyQW5kUmVsb2FkUmVwb3J0ICYmIHRoaXMucmVwb3J0KSB7XG5cbiAgICAgICAgcGF5bG9hZC5wYWdlID0gdGhpcy5yZXBvcnQucGFnZSArIDE7XG5cbiAgICAgICAgcGF5bG9hZC5saW1pdCA9IHRoaXMucmVwb3J0LmxpbWl0O1xuXG4gICAgICB9XG5cbiAgICAgIHJlc29sdmUocGF5bG9hZCk7XG5cbiAgICB9KTtcblxuICB9XG5cbiAgLypcbiAgICogYXBwZW5kRmlsdGVyR3JvdXBzVG9FYWNoRmlsdGVyR3JvdXBcbiAgICpcbiAgICogR2V0cyBhbiBhcnJheSBvZiBmaWx0ZXJHcm91cCBhbmQgaW4gZWFjaCBmaWx0ZXJHcm91cCBpbiB0aGlzIGFycmF5IGFwcGVuZHMgdGhlIHNlY29uZCBmaWx0ZXJHcm91cCBmaWx0ZXJzLlxuICAgKi9cbiAgcHJpdmF0ZSBhcHBlbmRGaWx0ZXJHcm91cHNUb0VhY2hGaWx0ZXJHcm91cChmaWx0ZXJHcm91cHM6IEZpbHRlckdyb3VwcywgZmlsdGVyR3JvdXBUb0FwcGVuZDogRmlsdGVyR3JvdXApIHtcblxuICAgIGlmIChmaWx0ZXJHcm91cFRvQXBwZW5kKSB7XG5cbiAgICAgIGlmIChmaWx0ZXJHcm91cHMgJiYgZmlsdGVyR3JvdXBzLmxlbmd0aCA+IDApIHtcblxuICAgICAgICBmaWx0ZXJHcm91cHMuZm9yRWFjaChncm91cCA9PiB7XG5cbiAgICAgICAgICBncm91cC5maWx0ZXJzLnB1c2goLi4uZmlsdGVyR3JvdXBUb0FwcGVuZC5maWx0ZXJzKTtcblxuICAgICAgICB9KTtcblxuICAgICAgfSBlbHNlIHtcblxuICAgICAgICBmaWx0ZXJHcm91cHMgPSBbZmlsdGVyR3JvdXBUb0FwcGVuZF07XG5cbiAgICAgIH1cblxuICAgIH1cblxuICAgIHJldHVybiBmaWx0ZXJHcm91cHMgfHwgW107XG5cbiAgfVxuXG4gIC8qXG4gICAqIHNldEZpbHRlcnNDb21wb25lbnRzQmFzZVBhdGhBbmROYW1lc1xuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzZXRGaWx0ZXJzQ29tcG9uZW50c0Jhc2VQYXRoQW5kTmFtZXMoKSB7XG5cbiAgICBpZiAodGhpcy5maWx0ZXIpIHtcblxuICAgICAgdGhpcy5maWx0ZXIubmFtZSA9IHRoaXMubmFtZTtcblxuXG4gICAgICBpZiAodGhpcy5maWx0ZXIudGFic0ZpbHRlckNvbXBvbmVudCkge1xuXG4gICAgICAgIHRoaXMuZmlsdGVyLnRhYnNGaWx0ZXJDb21wb25lbnQubmFtZSA9IHRoaXMubmFtZTtcblxuICAgICAgICBpZiAodGhpcy5jdXN0b21GZXRjaE1ldGhvZCkge1xuXG4gICAgICAgICAgdGhpcy5maWx0ZXIudGFic0ZpbHRlckNvbXBvbmVudC5jdXN0b21GZXRjaE1ldGhvZCA9IHRoaXMuY3VzdG9tRmV0Y2hNZXRob2Q7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgIHRoaXMuZmlsdGVyLnRhYnNGaWx0ZXJDb21wb25lbnQuc2VydmljZSA9IHRoaXMuc2VydmljZTtcblxuICAgICAgICB9XG5cblxuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgfVxuXG4gIC8qXG4gICAqIHNldFJvd3NcbiAgICpcbiAgICogU2V0cyB0aGUgY3VycmVudCB0YWJsZSByb3dzXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHNldFJvd3Mocm93cyA9IHRoaXMuX2dpdmVuUm93cyB8fCBbXSkge1xuXG4gICAgdGhpcy5yZXBvcnQgPSB7XG5cbiAgICAgIHBhZ2U6IDEsXG5cbiAgICAgIHJlc3VsdDoge1xuXG4gICAgICAgIHJvd3M6IHJvd3MsXG5cbiAgICAgICAgY291bnQ6IHJvd3MubGVuZ3RoXG5cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5kZXRlY3RMYXN0UGFnZShyb3dzLCByb3dzLmxlbmd0aCk7XG5cbiAgICB0aGlzLnVwZGF0ZUNvbnRlbnRDaGlsZHJlbigpO1xuICB9XG5cbiAgLypcbiAgICogd2F0Y2hTY3JvbGxFdmVudEVtaXR0ZXJcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgd2F0Y2hTY3JvbGxFdmVudEVtaXR0ZXIoKSB7XG5cbiAgICB0aGlzLnNjcm9sbEV2ZW50RW1pdGVyU3Vic2NyaXB0aW9uID0gdGhpcy5zY3JvbGxFdmVudEVtaXRlclxuICAgICAgLnBpcGUoXG4gICAgICAgIGRlYm91bmNlVGltZSgxNTApLFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpXG4gICAgICApLnN1YnNjcmliZSh0aGlzLmFjdEJ5U2Nyb2xsUG9zaXRpb24pO1xuXG4gIH1cblxuICAvKlxuICAgKiBzdG9wV2F0Y2hpbmdTY3JvbGxFdmVudEVtaXR0ZXJcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc3RvcFdhdGNoaW5nU2Nyb2xsRXZlbnRFbWl0dGVyKCkge1xuXG4gICAgaWYgKHRoaXMuc2Nyb2xsRXZlbnRFbWl0ZXJTdWJzY3JpcHRpb24pIHtcblxuICAgICAgdGhpcy5zY3JvbGxFdmVudEVtaXRlclN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuXG4gICAgfVxuXG4gIH1cblxuICAvKlxuICAgKiB3YXRjaEZpbHRlckRhdGFcbiAgICpcbiAgICovXG4gIHByaXZhdGUgd2F0Y2hGaWx0ZXJEYXRhKCkge1xuICAgIHRoaXMucmVhY3RpdmVSZXBvcnQgPSB0aGlzLmZpbHRlckRhdGFcbiAgICAgIC5waXBlKFxuICAgICAgICBkZWJvdW5jZVRpbWUoMTUwKSwgLy8gYXZvaWQgbXVpbHRpcGxlIHJlcXVlc3Qgd2hlbiB0aGUgZmlsdGVyIG9yIHRhYiBjaGFuZ2UgdG9vIGZhc3RcbiAgICAgICAgc3dpdGNoTWFwKChmaWx0ZXJEYXRhOiBGaWx0ZXJEYXRhKSA9PiB7XG5cbiAgICAgICAgICBjb25zdCBvYnNlcnZhYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxhbnk+KHVuZGVmaW5lZCk7XG5cbiAgICAgICAgICBjb25zdCBmZXRjaE1ldGhvZDogRGVjTGlzdEZldGNoTWV0aG9kID0gdGhpcy5jdXN0b21GZXRjaE1ldGhvZCB8fCB0aGlzLnNlcnZpY2UuZ2V0O1xuXG4gICAgICAgICAgY29uc3QgZW5kcG9pbnQgPSBmaWx0ZXJEYXRhID8gZmlsdGVyRGF0YS5lbmRwb2ludCA6IHVuZGVmaW5lZDtcblxuICAgICAgICAgIGNvbnN0IHBheWxvYWRXaXRoU2VhcmNoYWJsZVByb3BlcnRpZXMgPSB0aGlzLmdldFBheWxvYWRXaXRoU2VhcmNoVHJhbnNmb3JtZWRJbnRvU2VhcmNoYWJsZVByb3BlcnRpZXModGhpcy5wYXlsb2FkKTtcblxuICAgICAgICBpZiAoZmlsdGVyRGF0YSAmJiBmaWx0ZXJEYXRhLmNsZWFyKSB7XG4gICAgICAgICAgdGhpcy5zZXRSb3dzKCk7XG4gICAgICAgIH1cblxuICAgICAgICAgIGZldGNoTWV0aG9kKGVuZHBvaW50LCBwYXlsb2FkV2l0aFNlYXJjaGFibGVQcm9wZXJ0aWVzKVxuICAgICAgICAgICAgLnN1YnNjcmliZShyZXMgPT4ge1xuXG4gICAgICAgICAgICAgIG9ic2VydmFibGUubmV4dChyZXMpO1xuXG4gICAgICAgICAgICAgIGlmIChmaWx0ZXJEYXRhICYmIGZpbHRlckRhdGEuY2JrKSB7XG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgLy8gd2FpdCBmb3Igc3Vic2NyaWJlcnMgdG8gcmVmcmVzaCB0aGVpciByb3dzXG5cbiAgICAgICAgICAgICAgICAgIGZpbHRlckRhdGEuY2JrKG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWopID0+IHtcblxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlcyk7XG5cbiAgICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICAgIH0sIDEpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgIHJldHVybiBvYnNlcnZhYmxlO1xuICAgICAgICB9KVxuXG4gICAgICApO1xuICAgIHRoaXMuc3Vic2NyaWJlVG9SZWFjdGl2ZVJlcG9ydCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRQYXlsb2FkV2l0aFNlYXJjaFRyYW5zZm9ybWVkSW50b1NlYXJjaGFibGVQcm9wZXJ0aWVzKHBheWxvYWQpIHtcblxuICAgIGNvbnN0IHBheWxvYWRDb3B5ID0geyAuLi5wYXlsb2FkIH07XG5cbiAgICBpZiAocGF5bG9hZENvcHkuZmlsdGVyR3JvdXBzICYmIHRoaXMuc2VhcmNoYWJsZVByb3BlcnRpZXMpIHtcblxuICAgICAgcGF5bG9hZENvcHkuZmlsdGVyR3JvdXBzID0gWy4uLnBheWxvYWQuZmlsdGVyR3JvdXBzXTtcblxuICAgICAgdGhpcy5hcHBlbmRGaWx0ZXJHcm91cHNCYXNlZE9uU2VhcmNoYWJsZVByb3BlcnRpZXMocGF5bG9hZENvcHkuZmlsdGVyR3JvdXBzKTtcblxuICAgICAgcmV0dXJuIHBheWxvYWRDb3B5O1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgcmV0dXJuIHRoaXMucGF5bG9hZDtcblxuICAgIH1cblxuICB9XG5cbiAgcHJpdmF0ZSBhcHBlbmRGaWx0ZXJHcm91cHNCYXNlZE9uU2VhcmNoYWJsZVByb3BlcnRpZXMoZmlsdGVyR3JvdXBzKSB7XG5cbiAgICBjb25zdCBmaWx0ZXJHcm91cHNUaGF0Q29udGFpbnNCYXNpY1NlYXJjaCA9IHRoaXMuZ2V0RmlsdGVyR3JvdXBzVGhhdENvbnRhaW5zVGhlQmFzaWNTZWFyY2goZmlsdGVyR3JvdXBzKTtcblxuICAgIGlmIChmaWx0ZXJHcm91cHNUaGF0Q29udGFpbnNCYXNpY1NlYXJjaCAmJiBmaWx0ZXJHcm91cHNUaGF0Q29udGFpbnNCYXNpY1NlYXJjaC5sZW5ndGggPiAwKSB7XG5cbiAgICAgIGZpbHRlckdyb3Vwc1RoYXRDb250YWluc0Jhc2ljU2VhcmNoLmZvckVhY2goZmlsdGVyR3JvdXBUaGF0Q29udGFpbnNCYXNpY1NlYXJjaCA9PiB7XG5cbiAgICAgICAgdGhpcy5yZW1vdmVGaWx0ZXJHcm91cChmaWx0ZXJHcm91cHMsIGZpbHRlckdyb3VwVGhhdENvbnRhaW5zQmFzaWNTZWFyY2gpO1xuXG4gICAgICAgIGNvbnN0IGJhc2ljU2VhcmNoID0gZmlsdGVyR3JvdXBUaGF0Q29udGFpbnNCYXNpY1NlYXJjaC5maWx0ZXJzLmZpbmQoZmlsdGVyID0+IGZpbHRlci5wcm9wZXJ0eSA9PT0gJ3NlYXJjaCcpO1xuXG4gICAgICAgIGNvbnN0IGJhc2ljU2VhcmNoSW5kZXggPSBmaWx0ZXJHcm91cFRoYXRDb250YWluc0Jhc2ljU2VhcmNoLmZpbHRlcnMuaW5kZXhPZihiYXNpY1NlYXJjaCk7XG5cbiAgICAgICAgdGhpcy5zZWFyY2hhYmxlUHJvcGVydGllcy5mb3JFYWNoKHByb3BlcnR5ID0+IHtcblxuICAgICAgICAgIGNvbnN0IG5ld0ZpbHRlckdyb3VwOiBGaWx0ZXJHcm91cCA9IHtcbiAgICAgICAgICAgIGZpbHRlcnM6IFsuLi5maWx0ZXJHcm91cFRoYXRDb250YWluc0Jhc2ljU2VhcmNoLmZpbHRlcnNdXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIG5ld0ZpbHRlckdyb3VwLmZpbHRlcnNbYmFzaWNTZWFyY2hJbmRleF0gPSB7XG4gICAgICAgICAgICBwcm9wZXJ0eTogcHJvcGVydHksXG4gICAgICAgICAgICB2YWx1ZTogW2Jhc2ljU2VhcmNoLnZhbHVlXVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBmaWx0ZXJHcm91cHMucHVzaChuZXdGaWx0ZXJHcm91cCk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgIH0pO1xuXG4gICAgfVxuXG4gIH1cblxuICBwcml2YXRlIHJlbW92ZUZpbHRlckdyb3VwKGZpbHRlckdyb3VwcywgZmlsdGVyR3JvdXBUaGF0Q29udGFpbnNCYXNpY1NlYXJjaCkge1xuXG4gICAgY29uc3QgZmlsdGVyR3JvdXBUaGF0Q29udGFpbnNCYXNpY1NlYXJjaEluZGV4ID0gZmlsdGVyR3JvdXBzLmluZGV4T2YoZmlsdGVyR3JvdXBUaGF0Q29udGFpbnNCYXNpY1NlYXJjaCk7XG5cbiAgICBmaWx0ZXJHcm91cHMuc3BsaWNlKGZpbHRlckdyb3VwVGhhdENvbnRhaW5zQmFzaWNTZWFyY2hJbmRleCwgMSk7XG5cbiAgfVxuXG4gIHByaXZhdGUgZ2V0RmlsdGVyR3JvdXBzVGhhdENvbnRhaW5zVGhlQmFzaWNTZWFyY2goZmlsdGVyR3JvdXBzKSB7XG5cbiAgICByZXR1cm4gZmlsdGVyR3JvdXBzLmZpbHRlcihmaWx0ZXJHcm91cCA9PiB7XG5cbiAgICAgIGNvbnN0IGJhc2ljU2VyY2hGaWx0ZXIgPSBmaWx0ZXJHcm91cC5maWx0ZXJzID8gZmlsdGVyR3JvdXAuZmlsdGVycy5maW5kKGZpbHRlciA9PiBmaWx0ZXIucHJvcGVydHkgPT09ICdzZWFyY2gnKSA6IHVuZGVmaW5lZDtcblxuICAgICAgcmV0dXJuIGJhc2ljU2VyY2hGaWx0ZXIgPyB0cnVlIDogZmFsc2U7XG5cbiAgICB9KTtcblxuICB9XG5cbiAgLypcbiAgICogc3Vic2NyaWJlVG9SZWFjdGl2ZVJlcG9ydFxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzdWJzY3JpYmVUb1JlYWN0aXZlUmVwb3J0KCkge1xuICAgIHRoaXMucmVhY3RpdmVSZXBvcnRTdWJzY3JpcHRpb24gPSB0aGlzLnJlYWN0aXZlUmVwb3J0XG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKHJlcyA9PiB7XG4gICAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5yZXN1bHQgJiYgZGF0YS5yZXN1bHQucm93cykge1xuXG4gICAgICAgICAgaWYgKCF0aGlzLmNsZWFyQW5kUmVsb2FkUmVwb3J0KSB7XG4gICAgICAgICAgICBkYXRhLnJlc3VsdC5yb3dzID0gdGhpcy5yZXBvcnQucmVzdWx0LnJvd3MuY29uY2F0KGRhdGEucmVzdWx0LnJvd3MpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMucmVwb3J0ID0gZGF0YTtcblxuICAgICAgICAgIHRoaXMucG9zdFNlYXJjaC5lbWl0KGRhdGEpO1xuXG4gICAgICAgICAgdGhpcy51cGRhdGVDb250ZW50Q2hpbGRyZW4oKTtcblxuICAgICAgICAgIHRoaXMuZGV0ZWN0TGFzdFBhZ2UoZGF0YS5yZXN1bHQucm93cywgZGF0YS5yZXN1bHQuY291bnQpO1xuXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBkZXRlY3RMYXN0UGFnZShyb3dzLCBjb3VudCkge1xuXG4gICAgY29uc3QgbnVtYmVyT2Zyb3dzID0gcm93cy5sZW5ndGg7XG5cbiAgICBjb25zdCBlbXB0TGlzdCA9IG51bWJlck9mcm93cyA9PT0gMDtcblxuICAgIGNvbnN0IHNpbmdsZVBhZ2VMaXN0ID0gbnVtYmVyT2Zyb3dzID09PSBjb3VudDtcblxuICAgIHRoaXMuaXNMYXN0UGFnZSA9IGVtcHRMaXN0IHx8IHNpbmdsZVBhZ2VMaXN0O1xuXG4gIH1cblxuICAvKlxuICAgKiB1bnN1YnNjcmliZVRvUmVhY3RpdmVSZXBvcnRcbiAgICpcbiAgICovXG4gIHByaXZhdGUgdW5zdWJzY3JpYmVUb1JlYWN0aXZlUmVwb3J0KCkge1xuICAgIGlmICh0aGlzLnJlYWN0aXZlUmVwb3J0U3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnJlYWN0aXZlUmVwb3J0U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogdXBkYXRlQ29udGVudENoaWxkcmVuXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHVwZGF0ZUNvbnRlbnRDaGlsZHJlbigpIHtcblxuICAgIGNvbnN0IHJvd3MgPSB0aGlzLmVuZHBvaW50ID8gdGhpcy5yZXBvcnQucmVzdWx0LnJvd3MgOiB0aGlzLnJvd3M7XG5cbiAgICBpZiAodGhpcy5ncmlkKSB7XG4gICAgICB0aGlzLmdyaWQucm93cyA9IHJvd3M7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMudGFibGUpIHtcbiAgICAgIHRoaXMudGFibGUucm93cyA9IHJvd3M7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZmlsdGVyKSB7XG4gICAgICB0aGlzLmZpbHRlci5jb3VudCA9IHRoaXMucmVwb3J0LnJlc3VsdC5jb3VudDtcbiAgICB9XG5cbiAgfVxuXG4gIC8qXG4gICAqIHJlZ2lzdGVyQ2hpbGRXYXRjaGVyc1xuICAgKlxuICAgKiBXYXRjaCBmb3IgY2hpbGRyZW4gb3V0cHV0c1xuICAgKi9cbiAgcHJpdmF0ZSByZWdpc3RlckNoaWxkV2F0Y2hlcnMoKSB7XG5cbiAgICBpZiAodGhpcy5ncmlkKSB7XG4gICAgICB0aGlzLndhdGNoR3JpZFJvd0NsaWNrKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMudGFibGUpIHtcbiAgICAgIHRoaXMud2F0Y2hUYWJsZVJvd0NsaWNrKCk7XG4gICAgfVxuXG4gIH1cblxuICAvKlxuICAgKiBzaGFyZVNlbGVjdGVkUm93c0FycmF5XG4gICAqXG4gICAqIFNoYXJlIHRoZSBzZWxlY3RlZCBhcnJheSBiZXR3ZWVuIHZpZXdzXG4gICAqL1xuICBwcml2YXRlIHNoYXJlU2VsZWN0ZWRSb3dzQXJyYXkoKSB7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICh0aGlzLnRhYmxlKSB7XG4gICAgICAgIHRoaXMudGFibGUuc2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGVkO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5ncmlkKSB7XG4gICAgICAgIHRoaXMuZ3JpZC5zZWxlY3RlZCA9IHRoaXMuc2VsZWN0ZWQ7XG4gICAgICB9XG4gICAgfSwgMCk7XG5cbiAgfVxuXG4gIC8qXG4gICAqIHdhdGNoR3JpZFJvd0NsaWNrXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHdhdGNoR3JpZFJvd0NsaWNrKCkge1xuICAgIHRoaXMuZ3JpZC5yb3dDbGljay5zdWJzY3JpYmUoKCRldmVudCkgPT4ge1xuICAgICAgdGhpcy5yb3dDbGljay5lbWl0KCRldmVudCk7XG4gICAgfSk7XG4gIH1cblxuICAvKlxuICAgKiB3YXRjaFRhYmxlUm93Q2xpY2tcbiAgICpcbiAgICovXG4gIHByaXZhdGUgd2F0Y2hUYWJsZVJvd0NsaWNrKCkge1xuICAgIHRoaXMudGFibGUucm93Q2xpY2suc3Vic2NyaWJlKCgkZXZlbnQpID0+IHtcbiAgICAgIHRoaXMucm93Q2xpY2suZW1pdCgkZXZlbnQpO1xuICAgIH0pO1xuICB9XG5cbiAgLypcbiAgICogd2F0Y2hGaWx0ZXJcbiAgICpcbiAgICovXG4gIHByaXZhdGUgd2F0Y2hGaWx0ZXIoKSB7XG4gICAgaWYgKHRoaXMuZmlsdGVyKSB7XG4gICAgICB0aGlzLmZpbHRlclN1YnNjcmlwdGlvbiA9IHRoaXMuZmlsdGVyLnNlYXJjaC5zdWJzY3JpYmUoZXZlbnQgPT4ge1xuXG4gICAgICAgIGNvbnN0IHRhYkNoYW5nZWQgPSAhdGhpcy5wcmV2aW91c1NlbGVjdGVkVGFiIHx8ICh0aGlzLnByZXZpb3VzU2VsZWN0ZWRUYWIgIT09IHRoaXMuc2VsZWN0ZWRUYWIpO1xuXG4gICAgICAgIGNvbnN0IGZpbHRlck1vZGVDaGFuZ2VkID0gdGhpcy5maWx0ZXJNb2RlICE9PSBldmVudC5maWx0ZXJNb2RlO1xuXG4gICAgICAgIGlmICghdGhpcy5wcmV2aW91c1NlbGVjdGVkVGFiIHx8IHRhYkNoYW5nZWQpIHtcblxuICAgICAgICAgIHRoaXMucHJldmlvdXNTZWxlY3RlZFRhYiA9IHRoaXMuc2VsZWN0ZWRUYWI7XG5cbiAgICAgICAgICB0aGlzLnNldFJvd3MoKTsgLy8gaWYgY2hhbmdpbmcgdGFicywgY2xlYXIgdGhlIHJlc3VsdHMgYmVmb3JlIHNob3dpbmcgdGhlIHJvd3MgYmVjYXVzZSBpdCBpcyBkb25lIG9ubHkgYWZ0ZXIgZmV0Y2hpbmcgdGhlIGRhdGFcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZpbHRlck1vZGVDaGFuZ2VkKSB7XG5cbiAgICAgICAgICB0aGlzLmZpbHRlck1vZGUgPSBldmVudC5maWx0ZXJNb2RlO1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5maWx0ZXJNb2RlID09PSAndGFicycpIHtcblxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDb2xsYXBzYWJsZSA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgIHRoaXMuY29sbGFwc2FibGVGaWx0ZXJzID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgdGhpcy5sb2FkUmVwb3J0KHRydWUpLnRoZW4oKHJlcykgPT4ge1xuXG4gICAgICAgICAgICBpZiAoZXZlbnQucmVjb3VudCkge1xuXG4gICAgICAgICAgICAgIHRoaXMucmVsb2FkQ291bnRSZXBvcnQoKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgIGlmICghdGhpcy5jb3VudFJlcG9ydCB8fCBldmVudC5yZWNvdW50KSB7XG5cbiAgICAgICAgICAgIHRoaXMucmVsb2FkQ291bnRSZXBvcnQoKTtcblxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkQ29sbGFwc2FibGUgJiYgIXRhYkNoYW5nZWQpIHtcblxuICAgICAgICAgICAgdGhpcy5sb2FkQnlPcGVubmVkQ29sbGFwc2UodGhpcy5zZWxlY3RlZENvbGxhcHNhYmxlKTtcblxuICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHRoaXMuY29sbGFwc2FibGVGaWx0ZXJzID0ge1xuICAgICAgICAgICAgICB0YWI6IHRoaXMuc2VsZWN0ZWRUYWIsXG4gICAgICAgICAgICAgIGNoaWxkcmVuOiBldmVudC5jaGlsZHJlbiA/IGV2ZW50LmNoaWxkcmVuIDogW11cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDb2xsYXBzYWJsZSA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIHdhdGNoRmlsdGVyXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHN0b3BXYXRjaGluZ0ZpbHRlcigpIHtcbiAgICBpZiAodGhpcy5maWx0ZXJTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuZmlsdGVyU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogd2F0Y2hTY3JvbGxcbiAgICpcbiAgICovXG4gIHByaXZhdGUgd2F0Y2hTY3JvbGwoKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnNjcm9sbGFibGVDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMuc2Nyb2xsYWJsZUNvbnRhaW5lckNsYXNzKVswXTtcbiAgICAgIGlmICh0aGlzLnNjcm9sbGFibGVDb250YWluZXIpIHtcbiAgICAgICAgdGhpcy5zY3JvbGxhYmxlQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuZW1pdFNjcm9sbEV2ZW50LCB0cnVlKTtcbiAgICAgIH1cbiAgICB9LCAxKTtcbiAgfVxuXG4gIC8qXG4gICAqIHN0b3BXYXRjaGluZ1Njcm9sbFxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzdG9wV2F0Y2hpbmdTY3JvbGwoKSB7XG4gICAgaWYgKHRoaXMuc2Nyb2xsYWJsZUNvbnRhaW5lcikge1xuICAgICAgdGhpcy5zY3JvbGxhYmxlQ29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuZW1pdFNjcm9sbEV2ZW50LCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiBzdWJzY3JpYmVUb1JlYWN0aXZlUmVwb3J0XG4gICAqXG4gICAqL1xuICBwcml2YXRlIHdhdGNoVGFic0NoYW5nZSgpIHtcbiAgICBpZiAodGhpcy5maWx0ZXIgJiYgdGhpcy5maWx0ZXIudGFic0ZpbHRlckNvbXBvbmVudCkge1xuICAgICAgdGhpcy5zZWxlY3RlZFRhYiA9IHRoaXMuZmlsdGVyLnRhYnNGaWx0ZXJDb21wb25lbnQuc2VsZWN0ZWRUYWI7XG4gICAgICB0aGlzLnRhYnNDaGFuZ2VTdWJzY3JpcHRpb24gPSB0aGlzLmZpbHRlci50YWJzRmlsdGVyQ29tcG9uZW50LnRhYkNoYW5nZS5zdWJzY3JpYmUodGFiID0+IHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFRhYiA9IHRhYjtcbiAgICAgICAgdGhpcy5kZXRlY3RMaXN0TW9kZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogc3Vic2NyaWJlVG9UYWJzQ2hhbmdlXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHN0b3BXYXRjaGluZ1RhYnNDaGFuZ2UoKSB7XG4gICAgaWYgKHRoaXMudGFic0NoYW5nZVN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy50YWJzQ2hhbmdlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogd2F0Y2hUYWJsZVNvcnRcbiAgICpcbiAgICovXG4gIHByaXZhdGUgd2F0Y2hUYWJsZVNvcnQoKSB7XG4gICAgaWYgKHRoaXMudGFibGUpIHtcblxuICAgICAgdGhpcy50YWJsZVNvcnRTdWJzY3JpcHRpb24gPSB0aGlzLnRhYmxlLnNvcnQuc3Vic2NyaWJlKGNvbHVtbnNTb3J0Q29uZmlnID0+IHtcblxuICAgICAgICBpZiAodGhpcy5jb2x1bW5zU29ydENvbmZpZyAhPT0gY29sdW1uc1NvcnRDb25maWcpIHtcblxuICAgICAgICAgIHRoaXMuY29sdW1uc1NvcnRDb25maWcgPSBjb2x1bW5zU29ydENvbmZpZztcblxuICAgICAgICAgIGlmICh0aGlzLmNvbGxhcHNhYmxlRmlsdGVycykge1xuXG4gICAgICAgICAgICB0aGlzLmxvYWRCeU9wZW5uZWRDb2xsYXBzZSh0aGlzLnNlbGVjdGVkQ29sbGFwc2FibGUpO1xuXG4gICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgdGhpcy5sb2FkUmVwb3J0KHRydWUpO1xuXG4gICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogc3RvcFdhdGNoaW5nVGFibGVTb3J0XG4gICAqXG4gICAqL1xuICBwcml2YXRlIHN0b3BXYXRjaGluZ1RhYmxlU29ydCgpIHtcbiAgICBpZiAodGhpcy50YWJsZVNvcnRTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMudGFibGVTb3J0U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cblxuICAvKlxuICAqIFJlc2V0IFNlbGVjdGVkIFJvd3MgaW4gVGFibGVcbiAgKlxuICAqL1xuIHByaXZhdGUgcmVzZXRTZWxlY3RlZCgpIHtcbiAgdGhpcy5zZWxlY3RlZCA9IFtdO1xuICB0aGlzLnNoYXJlU2VsZWN0ZWRSb3dzQXJyYXkoKTtcbiB9XG59XG4iXX0=