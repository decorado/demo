/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ContentChild, EventEmitter, Input, Output } from '@angular/core';
import { DecListGridComponent } from './list-grid/list-grid.component';
import { DecListTableComponent } from './list-table/list-table.component';
import { DecListFilterComponent } from './list-filter/list-filter.component';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';
import { DecApiService } from './../../services/api/decora-api.service';
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
            var /** @type {?} */ listMode = _this.listMode;
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
                var /** @type {?} */ elementWithCdkOverlayClass = $event['path'].find(function (path) {
                    var /** @type {?} */ className = path['className'] || '';
                    var /** @type {?} */ insideOverlay = className.indexOf('cdk-overlay') >= 0;
                    var /** @type {?} */ insideFullscreanDialogContainer = className.indexOf('fullscrean-dialog-container') >= 0;
                    return insideOverlay || insideFullscreanDialogContainer;
                });
                if (!elementWithCdkOverlayClass) {
                    // avoid closing filter from any open dialog
                    if (!_this.isLastPage) {
                        var /** @type {?} */ target = $event['target'];
                        var /** @type {?} */ limit = target.scrollHeight - target.clientHeight;
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
            this.setRows(rows);
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
            var /** @type {?} */ endpoint = this.endpoint[this.endpoint.length - 1] === '/' ? this.endpoint + "count" : this.endpoint + "/count";
            var /** @type {?} */ filters = this.filter.filters;
            var /** @type {?} */ payloadWithSearchableProperties = this.getCountableFilters(filters);
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
     * @param {?} id
     * @return {?}
     */
    DecListComponent.prototype.removeItem = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        var /** @type {?} */ item = this.rows.find(function (_item) { return _item.id === id; });
        if (item) {
            var /** @type {?} */ itemIndex = this.rows.indexOf(item);
            if (itemIndex >= 0) {
                this.rows.splice(itemIndex, 1);
            }
        }
        if (this.endpoint) {
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
        catch (/** @type {?} */ error) {
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
        var /** @type {?} */ countReport = {
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
        var /** @type {?} */ filterGroupsWithoutTabs = this.filter.filterGroupsWithoutTabs || [{ filters: [] }];
        var /** @type {?} */ filtersPlusSearch = filters.map(function (decFilter) {
            var /** @type {?} */ decFilterFiltersPlusSearch = JSON.parse(JSON.stringify(decFilter));
            if (decFilterFiltersPlusSearch.filters) {
                var /** @type {?} */ tabFiltersCopy_1 = JSON.parse(JSON.stringify(decFilterFiltersPlusSearch.filters));
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
            var /** @type {?} */ error = 'ListComponentError: The list component must have an unique name to be used in url filter.'
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
        var /** @type {?} */ filter = this.collapsableFilters.children.find(function (item) { return item.uid === filterUid; });
        var /** @type {?} */ filterGroup = { filters: filter.filters };
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
            else if (!_this.rows) {
                setTimeout(function () {
                    if (!_this.rows) {
                        rej('No endpoint, customFetchMethod or rows set');
                    }
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
            var /** @type {?} */ searchFilterGroups = _this.filter ? _this.filter.filterGroups : undefined;
            var /** @type {?} */ filterGroups = _this.appendFilterGroupsToEachFilterGroup(searchFilterGroups, collapseFilterGroups);
            var /** @type {?} */ payload = {};
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
        if (rows === void 0) { rows = []; }
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
            var /** @type {?} */ observable = new BehaviorSubject(undefined);
            var /** @type {?} */ fetchMethod = _this.customFetchMethod || _this.service.get;
            var /** @type {?} */ endpoint = filterData ? filterData.endpoint : undefined;
            var /** @type {?} */ payloadWithSearchableProperties = _this.getPayloadWithSearchTransformedIntoSearchableProperties(_this.payload);
            if (filterData && filterData.clear) {
                _this.setRows([]);
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
        var /** @type {?} */ payloadCopy = tslib_1.__assign({}, payload);
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
        var /** @type {?} */ filterGroupThatContainsBasicSearch = this.getFilterGroupThatContainsTheBasicSearch(filterGroups);
        if (filterGroupThatContainsBasicSearch) {
            this.removeFilterGroup(filterGroups, filterGroupThatContainsBasicSearch);
            var /** @type {?} */ basicSearch_1 = filterGroupThatContainsBasicSearch.filters.find(function (filter) { return filter.property === 'search'; });
            var /** @type {?} */ basicSearchIndex_1 = filterGroupThatContainsBasicSearch.filters.indexOf(basicSearch_1);
            this.searchableProperties.forEach(function (property) {
                var /** @type {?} */ newFilterGroup = {
                    filters: tslib_1.__spread(filterGroupThatContainsBasicSearch.filters)
                };
                newFilterGroup.filters[basicSearchIndex_1] = {
                    property: property,
                    value: [basicSearch_1.value]
                };
                filterGroups.push(newFilterGroup);
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
        var /** @type {?} */ filterGroupThatContainsBasicSearchIndex = filterGroups.indexOf(filterGroupThatContainsBasicSearch);
        filterGroups.splice(filterGroupThatContainsBasicSearchIndex, 1);
    };
    /**
     * @param {?} filterGroups
     * @return {?}
     */
    DecListComponent.prototype.getFilterGroupThatContainsTheBasicSearch = /**
     * @param {?} filterGroups
     * @return {?}
     */
    function (filterGroups) {
        return filterGroups.find(function (filterGroup) {
            var /** @type {?} */ basicSerchFilter = filterGroup.filters ? filterGroup.filters.find(function (filter) { return filter.property === 'search'; }) : undefined;
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
        var /** @type {?} */ numberOfrows = rows.length;
        var /** @type {?} */ emptList = numberOfrows === 0;
        var /** @type {?} */ singlePageList = numberOfrows === count;
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
        var /** @type {?} */ rows = this.endpoint ? this.report.result.rows : this.rows;
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
                var /** @type {?} */ tabChanged = _this.previousSelectedTab && _this.previousSelectedTab !== _this.selectedTab;
                var /** @type {?} */ filterModeChanged = _this.filterMode !== event.filterMode;
                if (tabChanged) {
                    _this.previousSelectedTab = _this.selectedTab;
                    _this.setRows([]); // if changing tabs, clear the results before showing the rows because it is done only after fetching the data
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
                        _this.selectedCollapsable = undefined;
                        _this.collapsableFilters = {
                            tab: _this.selectedTab,
                            children: event.children ? event.children : []
                        };
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
function DecListComponent_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvbGlzdC9saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBaUIsU0FBUyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkgsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDdkUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDMUUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDN0UsT0FBTyxFQUFjLGVBQWUsRUFBZ0IsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsb0JBQW9CLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3BGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQzs7SUFzYnRFOzs7O09BSUc7SUFDSCwwQkFDVTtRQURWLGlCQUVLO1FBREssWUFBTyxHQUFQLE9BQU87Ozs7OzswQkFoVmlCLE1BQU07MEJBZ0ZFLElBQUksT0FBTyxFQUFjO3dCQU9oRCxJQUFJO2lDQTBDSyxJQUFJLFlBQVksRUFBTzs7Ozs7O3FCQThIbEMsRUFBRTs7Ozs7O3dDQWNpQixxQkFBcUI7Ozs7OzswQkFjbkMsSUFBSTs7Ozs7OzBCQU9ILElBQUksWUFBWSxFQUFPOzs7Ozs7d0JBT04sSUFBSSxZQUFZLEVBQU87MkJBa1B6QztZQUVwQixxQkFBSSxRQUFRLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBQztZQUU3QixFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsTUFBTSxJQUFJLEtBQUksQ0FBQyxNQUFNLENBQUMs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LEtBQUs7MkNBT0wsS0FBSzt1Q0FPTCxLQUFLOzZCQU9MLEtBQUs7NkJBT0wsTUFBTTsyQkFPTixNQUFNO3VCQU9OLFlBQVksU0FBQyxvQkFBb0I7d0JBT2pDLFlBQVksU0FBQyxxQkFBcUI7eUJBT2xDLFlBQVksU0FBQyxzQkFBc0I7OzJCQWhidEM7O1NBb0dhLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgQ29udGVudENoaWxkLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWNMaXN0R3JpZENvbXBvbmVudCB9IGZyb20gJy4vbGlzdC1ncmlkL2xpc3QtZ3JpZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjTGlzdFRhYmxlQ29tcG9uZW50IH0gZnJvbSAnLi9saXN0LXRhYmxlL2xpc3QtdGFibGUuY29tcG9uZW50JztcbmltcG9ydCB7IERlY0xpc3RGaWx0ZXJDb21wb25lbnQgfSBmcm9tICcuL2xpc3QtZmlsdGVyL2xpc3QtZmlsdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QsIFN1YnNjcmlwdGlvbiwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgdGFwLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBEZWNBcGlTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9hcGkvZGVjb3JhLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IERlY0xpc3RGZXRjaE1ldGhvZCwgQ291bnRSZXBvcnQgfSBmcm9tICcuL2xpc3QubW9kZWxzJztcbmltcG9ydCB7IEZpbHRlckRhdGEsIERlY0ZpbHRlciwgRmlsdGVyR3JvdXBzLCBGaWx0ZXJHcm91cCB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvYXBpL2RlY29yYS1hcGkubW9kZWwnO1xuaW1wb3J0IHsgRGVjTGlzdEZpbHRlciB9IGZyb20gJy4vbGlzdC5tb2RlbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtbGlzdCcsXG4gIHRlbXBsYXRlOiBgPCEtLSBDT01QT05FTlQgTEFZT1VUIC0tPlxuPGRpdiBjbGFzcz1cImxpc3QtY29tcG9uZW50LXdyYXBwZXJcIj5cbiAgPGRpdiAqbmdJZj1cImZpbHRlclwiPlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImRlYy1saXN0LWZpbHRlclwiPjwvbmctY29udGVudD5cbiAgPC9kaXY+XG4gIDxkaXYgKm5nSWY9XCJyZXBvcnQgfHwgZmlsdGVyTW9kZSA9PT0gJ2NvbGxhcHNlJ1wiPlxuICAgIDxkaXYgZnhMYXlvdXQ9XCJjb2x1bW5cIiBmeExheW91dEdhcD1cIjE2cHhcIj5cbiAgICAgIDxkaXYgZnhGbGV4IGNsYXNzPVwidGV4dC1yaWdodFwiICpuZ0lmPVwidGFibGVBbmRHcmlkQXJlU2V0KClcIj5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbWF0LWljb24tYnV0dG9uIChjbGljayk9XCJ0b2dnbGVMaXN0TW9kZSgpXCI+XG4gICAgICAgICAgPG1hdC1pY29uIHRpdGxlPVwiU3dpdGNoIHRvIHRhYmxlIG1vZGVcIiBhcmlhLWxhYmVsPVwiU3dpdGNoIHRvIHRhYmxlIG1vZGVcIiBjb2xvcj1cInByaW1hcnlcIiBjb250cmFzdEZvbnRXaXRoQmcgKm5nSWY9XCJsaXN0TW9kZSA9PT0gJ2dyaWQnXCI+dmlld19oZWFkbGluZTwvbWF0LWljb24+XG4gICAgICAgICAgPG1hdC1pY29uIHRpdGxlPVwiU3dpdGNoIHRvIGdyaWQgbW9kZVwiIGFyaWEtbGFiZWw9XCJTd2l0Y2ggdG8gZ3JpZCBtb2RlXCIgY29sb3I9XCJwcmltYXJ5XCIgY29udHJhc3RGb250V2l0aEJnICpuZ0lmPVwibGlzdE1vZGUgPT09ICd0YWJsZSdcIj52aWV3X21vZHVsZTwvbWF0LWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGZ4RmxleD5cbiAgICAgICAgPGRpdiAqbmdJZj1cImZpbHRlck1vZGUgPT0gJ2NvbGxhcHNlJyB0aGVuIGNvbGxhcHNlVGVtcGxhdGUgZWxzZSB0YWJzVGVtcGxhdGVcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuXG48IS0tIEdSSUQgVEVNUExBVEUgLS0+XG48bmctdGVtcGxhdGUgI2dyaWRUZW1wbGF0ZT5cbiAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZGVjLWxpc3QtZ3JpZFwiPjwvbmctY29udGVudD5cbjwvbmctdGVtcGxhdGU+XG5cbjwhLS0gVEFCTEUgVEVNUExBVEUgLS0+XG48bmctdGVtcGxhdGUgI2xpc3RUZW1wbGF0ZT5cbiAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZGVjLWxpc3QtdGFibGVcIj48L25nLWNvbnRlbnQ+XG48L25nLXRlbXBsYXRlPlxuXG48IS0tIEZPT1RFUiBURU1QTEFURSAtLT5cbjxuZy10ZW1wbGF0ZSAjZm9vdGVyVGVtcGxhdGU+XG4gIDxuZy1jb250ZW50IHNlbGVjdD1cImRlYy1saXN0LWZvb3RlclwiPjwvbmctY29udGVudD5cbiAgPHAgY2xhc3M9XCJsaXN0LWZvb3RlclwiPlxuICAgIHt7ICdsYWJlbC5hbW91bnQtbG9hZGVkLW9mLXRvdGFsJyB8XG4gICAgICB0cmFuc2xhdGU6e1xuICAgICAgICBsb2FkZWQ6IHJlcG9ydD8ucmVzdWx0Py5yb3dzPy5sZW5ndGgsXG4gICAgICAgIHRvdGFsOiByZXBvcnQ/LnJlc3VsdD8uY291bnRcbiAgICAgIH1cbiAgICB9fVxuICA8L3A+XG48L25nLXRlbXBsYXRlPlxuXG48IS0tIENPTExBUFNFIFRFTVBMQVRFIC0tPlxuPG5nLXRlbXBsYXRlICN0YWJzVGVtcGxhdGU+XG4gIDxkaXYgZnhMYXlvdXQ9XCJjb2x1bW5cIiBmeExheW91dEdhcD1cIjE2cHhcIj5cbiAgICA8ZGl2ICpuZ0lmPVwibGlzdE1vZGUgPT0gJ2dyaWQnIHRoZW4gZ3JpZFRlbXBsYXRlIGVsc2UgbGlzdFRlbXBsYXRlXCI+PC9kaXY+XG4gICAgPCEtLSBGT09URVIgQ09OVEVOVCAtLT5cbiAgICA8ZGl2IGZ4RmxleD5cbiAgICAgIDxkaXYgKm5nSWY9XCJzaG93Rm9vdGVyICYmICFsb2FkaW5nIHRoZW4gZm9vdGVyVGVtcGxhdGVcIj48L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8IS0tIExPQURJTkcgU1BJTk5FUiAtLT5cbiAgICA8ZGl2IGZ4RmxleCAqbmdJZj1cImxvYWRpbmdcIiBjbGFzcz1cInRleHQtY2VudGVyIGxvYWRpbmctc3Bpbm5lci13cmFwcGVyXCI+XG4gICAgICA8ZGVjLXNwaW5uZXI+PC9kZWMtc3Bpbm5lcj5cbiAgICA8L2Rpdj5cbiAgICA8IS0tIExPQUQgTU9SRSBCVVRUT04gLS0+XG4gICAgPGRpdiBmeEZsZXggKm5nSWY9XCIhaXNMYXN0UGFnZSAmJiAhbG9hZGluZyAmJiAhZGlzYWJsZVNob3dNb3JlQnV0dG9uXCIgY2xhc3M9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbWF0LXJhaXNlZC1idXR0b24gKGNsaWNrKT1cInNob3dNb3JlKClcIj57eydsYWJlbC5zaG93LW1vcmUnIHwgdHJhbnNsYXRlfX08L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L25nLXRlbXBsYXRlPlxuXG48IS0tIENPTExBUFNFIFRFTVBMQVRFIC0tPlxuPG5nLXRlbXBsYXRlICNjb2xsYXBzZVRlbXBsYXRlPlxuICA8bWF0LWFjY29yZGlvbj5cbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBmaWx0ZXIgb2YgY29sbGFwc2FibGVGaWx0ZXJzLmNoaWxkcmVuXCI+XG4gICAgICA8bWF0LWV4cGFuc2lvbi1wYW5lbCAob3BlbmVkKT1cInNlYXJjaENvbGxhcHNhYmxlKGZpbHRlcilcIj5cbiAgICAgICAgPG1hdC1leHBhbnNpb24tcGFuZWwtaGVhZGVyPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2xsYXBzZS10aXRsZVwiIGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRHYXA9XCIzMnB4XCIgZnhMYXlvdXRBbGlnbj1cImxlZnQgY2VudGVyXCI+XG4gICAgICAgICAgICA8ZGl2IGZ4RmxleD1cIjk2cHhcIiAqbmdJZj1cImNvdW50UmVwb3J0XCI+XG4gICAgICAgICAgICAgIDxkZWMtbGFiZWwgW2NvbG9ySGV4XT1cImZpbHRlci5jb2xvclwiPnt7IGdldENvbGxhcHNhYmxlQ291bnQoZmlsdGVyLnVpZCkgfX08L2RlYy1sYWJlbD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAge3sgJ2xhYmVsLicgKyBmaWx0ZXIubGFiZWwgfCB0cmFuc2xhdGUgfX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9tYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlcj5cbiAgICAgICAgPGRpdiAqbmdJZj1cInNlbGVjdGVkQ29sbGFwc2FibGUgPT09IGZpbHRlci51aWRcIj5cbiAgICAgICAgICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRhYnNUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbWF0LWV4cGFuc2lvbi1wYW5lbD5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgPC9tYXQtYWNjb3JkaW9uPlxuICA8ZGl2IGNsYXNzPVwiYWNjb3JkaW9uLWJvdHRvbS1tYXJnaW5cIj48L2Rpdj5cbjwvbmctdGVtcGxhdGU+XG5cbmAsXG4gIHN0eWxlczogW2AubGlzdC1mb290ZXJ7Zm9udC1zaXplOjE0cHg7dGV4dC1hbGlnbjpjZW50ZXJ9Lmxpc3QtY29tcG9uZW50LXdyYXBwZXJ7bWluLWhlaWdodDo3MnB4fS50ZXh0LXJpZ2h0e3RleHQtYWxpZ246cmlnaHR9LmxvYWRpbmctc3Bpbm5lci13cmFwcGVye3BhZGRpbmc6MzJweH0uY29sbGFwc2UtdGl0bGV7d2lkdGg6MTAwJX0uYWNjb3JkaW9uLWJvdHRvbS1tYXJnaW57bWFyZ2luLWJvdHRvbToxMDBweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQge1xuXG4gIC8qXG4gICogY291bnRSZXBvcnRcbiAgKlxuICAqXG4gICovXG4gIGNvdW50UmVwb3J0OiBDb3VudFJlcG9ydDtcblxuICAvKlxuICAqIGZpbHRlck1vZGVcbiAgKlxuICAqXG4gICovXG4gIGZpbHRlck1vZGU6ICd0YWJzJyB8ICdjb2xsYXBzZScgPSAndGFicyc7XG5cblxuICAvKlxuICAqIGNvbGxhcHNhYmxlRmlsdGVyc1xuICAqXG4gICpcbiAgKi9cbiAgY29sbGFwc2FibGVGaWx0ZXJzOiB7IHRhYjogc3RyaW5nLCBjaGlsZHJlbjogRGVjTGlzdEZpbHRlcltdIH07XG5cbiAgLypcbiAgICogbG9hZGluZ1xuICAgKlxuICAgKlxuICAgKi9cbiAgc2V0IGxvYWRpbmcodikge1xuXG4gICAgdGhpcy5fbG9hZGluZyA9IHY7XG5cbiAgICBpZiAodGhpcy5maWx0ZXIpIHtcblxuICAgICAgdGhpcy5maWx0ZXIubG9hZGluZyA9IHY7XG5cbiAgICB9XG5cbiAgfVxuXG4gIGdldCBsb2FkaW5nKCkge1xuICAgIHJldHVybiB0aGlzLl9sb2FkaW5nO1xuICB9XG5cbiAgLypcbiAgICogZmlsdGVyR3JvdXBzXG4gICAqXG4gICAqXG4gICAqL1xuICBnZXQgZmlsdGVyR3JvdXBzKCk6IEZpbHRlckdyb3VwcyB7XG4gICAgcmV0dXJuIHRoaXMuZmlsdGVyID8gdGhpcy5maWx0ZXIuZmlsdGVyR3JvdXBzIDogW107XG4gIH1cblxuICAvKlxuICAgKiBzZWxlY3RlZENvbGxhcHNhYmxlXG4gICAqXG4gICAqXG4gICAqL1xuICBzZWxlY3RlZENvbGxhcHNhYmxlO1xuXG4gIC8qXG4gICAqIHJlcG9ydFxuICAgKlxuICAgKlxuICAgKi9cbiAgcmVwb3J0O1xuXG4gIC8qXG4gICAqIGlzTGFzdFBhZ2VcbiAgICpcbiAgICpcbiAgICovXG4gIGlzTGFzdFBhZ2U6IGJvb2xlYW47XG5cbiAgLypcbiAgKiBzZWxlY3RlZFRhYlxuICAqXG4gICpcbiAgKi9cbiAgc2VsZWN0ZWRUYWI6IGFueTtcblxuICAvKlxuICAqIHByZXZpb3VzU2VsZWN0ZWRUYWJcbiAgKlxuICAqXG4gICovXG4gIHByZXZpb3VzU2VsZWN0ZWRUYWI6IGFueTtcblxuICAvKlxuICAgKiBmaWx0ZXJEYXRhXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIGZpbHRlckRhdGE6IFN1YmplY3Q8RmlsdGVyRGF0YT4gPSBuZXcgU3ViamVjdDxGaWx0ZXJEYXRhPigpO1xuXG4gIC8qXG4gICAqIF9sb2FkaW5nO1xuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBfbG9hZGluZyA9IHRydWU7XG5cbiAgLypcbiAgICogY2xlYXJBbmRSZWxvYWRSZXBvcnRcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgY2xlYXJBbmRSZWxvYWRSZXBvcnQ7XG5cbiAgLypcbiAgICogZmlsdGVyU3Vic2NyaXB0aW9uXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIGZpbHRlclN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qXG4gICAqIHJlYWN0aXZlUmVwb3J0XG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHJlYWN0aXZlUmVwb3J0OiBPYnNlcnZhYmxlPGFueT47XG5cbiAgLypcbiAgICogcmVhY3RpdmVSZXBvcnRTdWJzY3JpcHRpb25cbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgcmVhY3RpdmVSZXBvcnRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKlxuICAgKiBzY3JvbGxhYmxlQ29udGFpbmVyXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHNjcm9sbGFibGVDb250YWluZXI6IEVsZW1lbnQ7XG5cbiAgLypcbiAgICogc2Nyb2xsRXZlbnRFbWl0ZXJcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc2Nyb2xsRXZlbnRFbWl0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAvKlxuICAgKiBzY3JvbGxFdmVudEVtaXRlclN1YnNjcmlwdGlvblxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzY3JvbGxFdmVudEVtaXRlclN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qXG4gICAqIHRhYnNDaGFuZ2VTdWJzY3JpcHRpb25cbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgdGFic0NoYW5nZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qXG4gICAqIHRhYmxlU29ydFN1YnNjcmlwdGlvblxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB0YWJsZVNvcnRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKlxuICAgKiBwYXlsb2FkXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHBheWxvYWQ6IERlY0ZpbHRlcjtcblxuICAvKlxuICAgKiBfZW5kcG9pbnQgaW50ZXJuYWxsXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIF9lbmRwb2ludDogc3RyaW5nO1xuXG4gIC8qXG4gICAqIF9maWx0ZXJcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgX2ZpbHRlcjogRGVjTGlzdEZpbHRlckNvbXBvbmVudDtcblxuICAvKlxuICAgKiBfbmFtZVxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBfbmFtZTogc3RyaW5nO1xuXG4gIC8qXG4gICAqIGN1c3RvbUZldGNoTWV0aG9kXG4gICAqXG4gICAqIG1ldGhvZCB1c2VkIHRvIGZldGNoIGRhdGEgZnJvbSBiYWNrLWVuZFxuICAgKi9cbiAgQElucHV0KCkgY3VzdG9tRmV0Y2hNZXRob2Q6IERlY0xpc3RGZXRjaE1ldGhvZDtcblxuICAvKlxuICAgKiBjb2x1bW5zU29ydENvbmZpZ1xuICAgKlxuICAgKiB1c2VkIHRvIGdldCBhIHNvcnRlZCBsaXN0IGZyb20gYmFja2VuZFxuICAgKiBjYW4gYmUgcGFzZWQgdmlhIGF0dHJpYnV0ZSB0byBzb3J0IHRoZSBmaXJzdCBsb2FkXG4gICAqL1xuICBASW5wdXQoKSBjb2x1bW5zU29ydENvbmZpZztcblxuICAvKlxuICAgKiBkaXNhYmxlU2hvd01vcmVCdXR0b25cbiAgICpcbiAgICogdXNlZCB0byBoaWRlIHRoZSBzaG93IG1vcmUgYnV0dG9uXG4gICAqL1xuICBASW5wdXQoKSBkaXNhYmxlU2hvd01vcmVCdXR0b246IGJvb2xlYW47XG5cbiAgLypcbiAgICogZW5kcG9pbnRcbiAgICpcbiAgICpcbiAgICovXG4gIEBJbnB1dCgpXG4gIHNldCBlbmRwb2ludCh2OiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5fZW5kcG9pbnQgIT09IHYpIHtcbiAgICAgIHRoaXMuX2VuZHBvaW50ID0gKHZbMF0gJiYgdlswXSA9PT0gJy8nKSA/IHYucmVwbGFjZSgnLycsICcnKSA6IHY7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGVuZHBvaW50KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2VuZHBvaW50O1xuICB9XG5cbiAgLypcbiAgICogbmFtZVxuICAgKlxuICAgKlxuICAgKi9cbiAgQElucHV0KClcbiAgc2V0IG5hbWUodjogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuX25hbWUgIT09IHYpIHtcbiAgICAgIHRoaXMuX25hbWUgPSB2O1xuICAgICAgdGhpcy5zZXRGaWx0ZXJzQ29tcG9uZW50c0Jhc2VQYXRoQW5kTmFtZXMoKTtcbiAgICB9XG4gIH1cblxuICBnZXQgbmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgfVxuXG4gIC8qXG4gICAqIHJvd3NcbiAgICpcbiAgICpcbiAgICovXG4gIEBJbnB1dCgncm93cycpXG5cbiAgc2V0IHJvd3Mocm93cykge1xuICAgIHRoaXMuc2V0Um93cyhyb3dzKTtcbiAgfVxuXG4gIGdldCByb3dzKCkge1xuICAgIHJldHVybiB0aGlzLnJlcG9ydCA/IHRoaXMucmVwb3J0LnJlc3VsdC5yb3dzIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgLypcbiAgICogbGltaXRcbiAgICpcbiAgICpcbiAgICovXG4gIEBJbnB1dCgpIGxpbWl0ID0gMTA7XG5cbiAgLypcbiAgICogbGlzdE1vZGVcbiAgICpcbiAgICpcbiAgICovXG4gIEBJbnB1dCgpIGxpc3RNb2RlO1xuXG4gIC8qXG4gICAqIHNjcm9sbGFibGVDb250YWluZXJDbGFzc1xuICAgKlxuICAgKiBXaGVyZSB0aGUgc2Nyb2xsIHdhdGNoZXIgc2hvdWxkIGJlIGxpc3RlbmluZ1xuICAgKi9cbiAgQElucHV0KCkgc2Nyb2xsYWJsZUNvbnRhaW5lckNsYXNzID0gJ21hdC1zaWRlbmF2LWNvbnRlbnQnO1xuXG4gIC8qXG4gICAqIHNlYXJjaGFibGVQcm9wZXJ0aWVzXG4gICAqXG4gICAqIFByb3BlcnRpZXMgdG8gYmUgc2VhcmNoZWQgd2hlbiB1c2luZyBiYXNpYyBzZWFyY2hcbiAgICovXG4gIEBJbnB1dCgpIHNlYXJjaGFibGVQcm9wZXJ0aWVzOiBzdHJpbmdbXTtcblxuICAvKlxuICAgKiBzaG93Rm9vdGVyXG4gICAqXG4gICAqXG4gICAqL1xuICBASW5wdXQoKSBzaG93Rm9vdGVyID0gdHJ1ZTtcblxuICAvKlxuICAgKiBwb3N0U2VhcmNoXG4gICAqXG4gICAqIFRoaXMgbWlkZGxld2FyZSBpcyB1c2VkIHRvIHRyaWdnZXIgZXZlbnRzIGFmdGVyIGV2ZXJ5IHNlYXJjaFxuICAgKi9cbiAgQE91dHB1dCgpIHBvc3RTZWFyY2ggPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAvKlxuICAgKiByb3dDbGlja1xuICAgKlxuICAgKiBFbWl0cyBhbiBldmVudCB3aGVuIGEgcm93IG9yIGNhcmQgaXMgY2xpY2tlZFxuICAgKi9cbiAgQE91dHB1dCgpIHJvd0NsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIC8qXG4gICAqIGdyaWRcbiAgICpcbiAgICpcbiAgICovXG4gIEBDb250ZW50Q2hpbGQoRGVjTGlzdEdyaWRDb21wb25lbnQpIGdyaWQ6IERlY0xpc3RHcmlkQ29tcG9uZW50O1xuXG4gIC8qXG4gICAqIHRhYmxlXG4gICAqXG4gICAqXG4gICAqL1xuICBAQ29udGVudENoaWxkKERlY0xpc3RUYWJsZUNvbXBvbmVudCkgdGFibGU6IERlY0xpc3RUYWJsZUNvbXBvbmVudDtcblxuICAvKlxuICAgKiBmaWx0ZXJcbiAgICpcbiAgICpcbiAgICovXG4gIEBDb250ZW50Q2hpbGQoRGVjTGlzdEZpbHRlckNvbXBvbmVudClcbiAgc2V0IGZpbHRlcih2OiBEZWNMaXN0RmlsdGVyQ29tcG9uZW50KSB7XG4gICAgaWYgKHRoaXMuX2ZpbHRlciAhPT0gdikge1xuICAgICAgdGhpcy5fZmlsdGVyID0gdjtcbiAgICAgIHRoaXMuc2V0RmlsdGVyc0NvbXBvbmVudHNCYXNlUGF0aEFuZE5hbWVzKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGZpbHRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5fZmlsdGVyO1xuICB9XG5cbiAgLypcbiAgICogbmdPbkluaXRcbiAgICpcbiAgICpcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgc2VydmljZTogRGVjQXBpU2VydmljZVxuICApIHsgfVxuXG4gIC8qXG4gICAqIG5nT25Jbml0XG4gICAqXG4gICAqIFN0YXJ0cyBhIGZyZXNoIGNvbXBvbmVudCBhbmQgcHJlcGFyZSBpdCB0byBydW5cbiAgICpcbiAgICogLSBTdGFydCB0aGUgUmVhY3RpdmUgUmVwb3J0XG4gICAqIC0gU3Vic2NyaWJlIHRvIHRoZSBSZWFjdGl2ZSBSZXBvcnRcbiAgICogLSBTdGFydCB3YXRjaGluZyB3aW5kb3cgU2Nyb2xsXG4gICAqIC0gRW5zdXJlIHVuaXF1ZSBuYW1lXG4gICAqL1xuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLndhdGNoRmlsdGVyRGF0YSgpO1xuICAgIHRoaXMuZW5zdXJlVW5pcXVlTmFtZSgpO1xuICAgIHRoaXMuZGV0ZWN0TGlzdE1vZGVCYXNlZE9uR3JpZEFuZFRhYmxlUHJlc2VuY2UoKTtcbiAgfVxuXG4gIC8qXG4gICogbmdBZnRlclZpZXdJbml0XG4gICpcbiAgKiBXYWl0IGZvciB0aGUgc3ViY29tcG9uZW50cyB0byBzdGFydCBiZWZvcmUgcnVuIHRoZSBjb21wb25lbnRcbiAgKlxuICAqIC0gU3RhcnQgd2F0Y2hpbmcgRmlsdGVyXG4gICogLSBEbyB0aGUgZmlyc3QgbG9hZFxuICAqL1xuIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgIHRoaXMud2F0Y2hGaWx0ZXIoKTtcbiAgIHRoaXMuZG9GaXJzdExvYWQoKTtcbiAgIHRoaXMuZGV0ZWN0TGlzdE1vZGUoKTtcbiAgIHRoaXMud2F0Y2hUYWJzQ2hhbmdlKCk7XG4gICB0aGlzLndhdGNoVGFibGVTb3J0KCk7XG4gICB0aGlzLnJlZ2lzdGVyQ2hpbGRXYXRjaGVycygpO1xuICAgdGhpcy53YXRjaFNjcm9sbCgpO1xuICAgdGhpcy53YXRjaFNjcm9sbEV2ZW50RW1pdHRlcigpO1xuICB9XG5cbiAgLypcbiAgICogbmdPbkRlc3Ryb3lcbiAgICpcbiAgICogRGVzdHJveSB3YXRjaGVyIHRvIGZyZWUgbWVlbW9yeSBhbmQgcmVtb3ZlIHVubmVjZXNzYXJ5IHRyaWdnZXJzXG4gICAqXG4gICAqIC0gVW5zdWJzY3JpYmUgZnJvbSB0aGUgUmVhY3RpdmUgUmVwb3J0XG4gICAqIC0gU3RvcCB3YXRjaGluZyB3aW5kb3cgU2Nyb2xsXG4gICAqIC0gU3RvcCB3YXRjaGluZyBGaWx0ZXJcbiAgICovXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMudW5zdWJzY3JpYmVUb1JlYWN0aXZlUmVwb3J0KCk7XG4gICAgdGhpcy5zdG9wV2F0Y2hpbmdTY3JvbGwoKTtcbiAgICB0aGlzLnN0b3BXYXRjaGluZ0ZpbHRlcigpO1xuICAgIHRoaXMuc3RvcFdhdGNoaW5nVGFic0NoYW5nZSgpO1xuICAgIHRoaXMuc3RvcFdhdGNoaW5nVGFibGVTb3J0KCk7XG4gICAgdGhpcy5zdG9wV2F0Y2hpbmdTY3JvbGxFdmVudEVtaXR0ZXIoKTtcbiAgfVxuXG4gIC8qXG4gICAqIHJlbG9hZENvdW50UmVwb3J0XG4gICAqXG4gICAqL1xuICByZWxvYWRDb3VudFJlcG9ydCgpIHtcblxuICAgIGlmICh0aGlzLmZpbHRlciAmJiB0aGlzLmZpbHRlci5maWx0ZXJzICYmIHRoaXMuZmlsdGVyLmxvYWRDb3VudFJlcG9ydCkge1xuXG4gICAgICBjb25zdCBlbmRwb2ludCA9IHRoaXMuZW5kcG9pbnRbdGhpcy5lbmRwb2ludC5sZW5ndGggLSAxXSA9PT0gJy8nID8gYCR7dGhpcy5lbmRwb2ludH1jb3VudGAgOiBgJHt0aGlzLmVuZHBvaW50fS9jb3VudGA7XG5cbiAgICAgIGNvbnN0IGZpbHRlcnMgPSB0aGlzLmZpbHRlci5maWx0ZXJzO1xuXG4gICAgICBjb25zdCBwYXlsb2FkV2l0aFNlYXJjaGFibGVQcm9wZXJ0aWVzID0gdGhpcy5nZXRDb3VudGFibGVGaWx0ZXJzKGZpbHRlcnMpO1xuXG4gICAgICB0aGlzLnNlcnZpY2UucG9zdChlbmRwb2ludCwgcGF5bG9hZFdpdGhTZWFyY2hhYmxlUHJvcGVydGllcylcbiAgICAgIC5zdWJzY3JpYmUocmVzID0+IHtcblxuICAgICAgICB0aGlzLmNvdW50UmVwb3J0ID0gdGhpcy5tb3VudENvdW50UmVwb3J0KHJlcyk7XG5cbiAgICAgICAgdGhpcy5maWx0ZXIuY291bnRSZXBvcnQgPSB0aGlzLmNvdW50UmVwb3J0O1xuXG4gICAgICB9KTtcblxuICAgIH1cblxuICB9XG5cbiAgLypcbiAgICogcmVtb3ZlSXRlbVxuICAgKlxuICAgKiBSZW1vdmVzIGFuIGl0ZW0gZnJvbSB0aGUgbGlzdFxuICAgKi9cbiAgcmVtb3ZlSXRlbShpZCkge1xuXG4gICAgY29uc3QgaXRlbSA9IHRoaXMucm93cy5maW5kKF9pdGVtID0+IF9pdGVtLmlkID09PSBpZCk7XG5cbiAgICBpZiAoaXRlbSkge1xuXG4gICAgICBjb25zdCBpdGVtSW5kZXggPSB0aGlzLnJvd3MuaW5kZXhPZihpdGVtKTtcblxuICAgICAgaWYgKGl0ZW1JbmRleCA+PSAwKSB7XG5cbiAgICAgICAgdGhpcy5yb3dzLnNwbGljZShpdGVtSW5kZXgsIDEpO1xuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgICBpZiAodGhpcy5lbmRwb2ludCkge1xuXG4gICAgICB0aGlzLnJlbG9hZENvdW50UmVwb3J0KCk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIC8qXG4gICAqIHJlc3RhcnRcbiAgICpcbiAgICogQ2xlYXIgdGhlIGxpc3QgYW5kIHJlbG9hZCB0aGUgZmlyc3QgcGFnZVxuICAgKi9cbiAgcmVzdGFydCgpIHtcblxuICAgIHRoaXMubG9hZFJlcG9ydCh0cnVlKTtcblxuICB9XG5cbiAgLypcbiAgICogc2hvd01vcmVcbiAgICpcbiAgICovXG4gIHNob3dNb3JlKCkge1xuXG4gICAgcmV0dXJuIHRoaXMubG9hZFJlcG9ydCgpO1xuXG4gIH1cblxuICAvKlxuICAgKiBzZWFyY2hDb2xsYXBzYWJsZVxuICAgKlxuICAgKiBzZWFyY2ggYnkgY29sbGFwc2FibGUgZmlsdGVyXG4gICAqL1xuICBzZWFyY2hDb2xsYXBzYWJsZShmaWx0ZXI6IERlY0xpc3RGaWx0ZXIpIHtcblxuICAgIGlmICh0aGlzLnNlbGVjdGVkQ29sbGFwc2FibGUgIT09IGZpbHRlci51aWQpIHtcblxuICAgICAgdGhpcy5sb2FkQnlPcGVubmVkQ29sbGFwc2UoZmlsdGVyLnVpZCk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIC8qXG4gICAqIHRhYmxlQW5kR3JpZEFyZVNldFxuICAgKlxuICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGVyZSBhcmUgYm90aCBHUklEIGFuZCBUQUJMRSBkZWZpbml0aW9uIGluc2lkZSB0aGUgbGlzdFxuICAgKi9cbiAgdGFibGVBbmRHcmlkQXJlU2V0KCkge1xuICAgIHJldHVybiB0aGlzLmdyaWQgJiYgdGhpcy50YWJsZTtcbiAgfVxuXG4gIC8qXG4gICAqIHRvZ2dsZUxpc3RNb2RlXG4gICAqXG4gICAqIENoYW5nZXMgYmV0d2VlbiBHUklEIGFuZCBUQUJMRSB2aXN1YWxpemF0b2luIG1vZGVzXG4gICAqL1xuICB0b2dnbGVMaXN0TW9kZSgpIHtcblxuICAgIHRoaXMubGlzdE1vZGUgPSB0aGlzLmxpc3RNb2RlID09PSAnZ3JpZCcgPyAndGFibGUnIDogJ2dyaWQnO1xuXG4gICAgaWYgKHRoaXMubGlzdE1vZGUgPT09ICd0YWJsZScpIHtcblxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgICAgdGhpcy50YWJsZS50YWJsZUNvbXBvbmVudC5yZWNhbGN1bGF0ZSgpO1xuXG4gICAgICB9LCAxKTtcblxuICAgIH1cblxuICB9XG5cbiAgLypcbiAgICogZ2V0Q29sbGFwc2FibGVDb3VudFxuICAgKlxuICAgKiBnZXQgQ29sbGFwc2FibGUgQ291bnQgZnJvbSBjb3VudFJlcG9ydFxuICAgKi9cbiAgZ2V0Q29sbGFwc2FibGVDb3VudCh1aWQpIHtcblxuICAgIHRyeSB7XG5cbiAgICAgIHJldHVybiB0aGlzLmNvdW50UmVwb3J0W3RoaXMuc2VsZWN0ZWRUYWJdLmNoaWxkcmVuW3VpZF0uY291bnQ7XG5cbiAgICB9IGNhdGNoIChlcnJvcikge1xuXG4gICAgICByZXR1cm4gJz8nO1xuXG4gICAgfVxuXG5cbiAgfVxuXG4gIC8qXG4gICBnZXRMaXN0TW9kZVxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBnZXRMaXN0TW9kZSA9ICgpID0+IHtcblxuICAgIGxldCBsaXN0TW9kZSA9IHRoaXMubGlzdE1vZGU7XG5cbiAgICBpZiAodGhpcy5maWx0ZXIgJiYgdGhpcy5maWx0ZXIudGFic0ZpbHRlckNvbXBvbmVudCkge1xuXG4gICAgICBpZiAodGhpcy5zZWxlY3RlZFRhYiAmJiB0aGlzLnNlbGVjdGVkVGFiLmxpc3RNb2RlKSB7XG5cbiAgICAgICAgbGlzdE1vZGUgPSB0aGlzLnNlbGVjdGVkVGFiLmxpc3RNb2RlO1xuXG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIGxpc3RNb2RlID0gdGhpcy50YWJsZSA/ICd0YWJsZScgOiAnZ3JpZCc7XG5cbiAgICAgIH1cblxuICAgIH1cblxuICAgIHJldHVybiBsaXN0TW9kZTtcblxuICB9XG5cbiAgLypcbiAgIG1vdW50Q291bnRSZXBvcnRcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgbW91bnRDb3VudFJlcG9ydChmaWx0ZXJzQ291bnRlcnMpOiBDb3VudFJlcG9ydCB7XG5cbiAgICBjb25zdCBjb3VudFJlcG9ydDogQ291bnRSZXBvcnQgPSB7XG4gICAgICBjb3VudDogMFxuICAgIH07XG5cbiAgICBmaWx0ZXJzQ291bnRlcnMuZm9yRWFjaChpdGVtID0+IHtcblxuICAgICAgY291bnRSZXBvcnRbaXRlbS51aWRdID0ge1xuXG4gICAgICAgIGNvdW50OiBpdGVtLmNvdW50XG5cbiAgICAgIH07XG5cbiAgICAgIGlmIChpdGVtLmNoaWxkcmVuKSB7XG5cbiAgICAgICAgY291bnRSZXBvcnRbaXRlbS51aWRdLmNoaWxkcmVuID0gdGhpcy5tb3VudENvdW50UmVwb3J0KGl0ZW0uY2hpbGRyZW4pO1xuXG4gICAgICB9XG5cbiAgICB9KTtcblxuICAgIHJldHVybiBjb3VudFJlcG9ydDtcblxuICB9XG5cbiAgLypcbiAgICogZ2V0Q291bnRhYmxlRmlsdGVyc1xuICAgKlxuICAgKiBHZXQgdGhlIHNlYXJjaCBmaWx0ZXIsIHRybnNmb3JtZSB0aGUgc2VhcmNoIHBhcmFtcyBpbnRvIHRoZSBzZWFyY2hhYmxlIHByb3BlcnRpZXMgYW5kIGluamVjdCBpdCBpbiBldmVyeSBmaWx0ZXIgY29uZmlndXJlZCBpbiBkZWMtZmlsdGVyc1xuICAgKlxuICAgKiBUaGUgcmVzdWx0IGlzIHVzZWQgdG8gY2FsbCB0aGUgY291bnQgZW5kcG9pbnQgYW5kIHJldHVybiB0aGUgYW1vdW50IG9mIHJlY2NvcmRzIGZvdW5kIGluIGV2ZXJ5IHRhYi9jb2xsYXBzZVxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBnZXRDb3VudGFibGVGaWx0ZXJzKGZpbHRlcnMpIHtcblxuICAgIGNvbnN0IGZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzID0gdGhpcy5maWx0ZXIuZmlsdGVyR3JvdXBzV2l0aG91dFRhYnMgfHwgW3tmaWx0ZXJzOiBbXX1dO1xuXG4gICAgY29uc3QgZmlsdGVyc1BsdXNTZWFyY2ggPSBmaWx0ZXJzLm1hcChkZWNGaWx0ZXIgPT4ge1xuXG4gICAgICBjb25zdCBkZWNGaWx0ZXJGaWx0ZXJzUGx1c1NlYXJjaCA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZGVjRmlsdGVyKSk7XG5cbiAgICAgIGlmIChkZWNGaWx0ZXJGaWx0ZXJzUGx1c1NlYXJjaC5maWx0ZXJzKSB7XG5cbiAgICAgICAgY29uc3QgdGFiRmlsdGVyc0NvcHkgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRlY0ZpbHRlckZpbHRlcnNQbHVzU2VhcmNoLmZpbHRlcnMpKTtcblxuICAgICAgICBkZWNGaWx0ZXJGaWx0ZXJzUGx1c1NlYXJjaC5maWx0ZXJzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShmaWx0ZXJHcm91cHNXaXRob3V0VGFicykpO1xuXG4gICAgICAgIGRlY0ZpbHRlckZpbHRlcnNQbHVzU2VhcmNoLmZpbHRlcnMuZm9yRWFjaChmaWx0ZXJHcm91cCA9PiB7XG5cbiAgICAgICAgICBmaWx0ZXJHcm91cC5maWx0ZXJzLnB1c2goLi4udGFiRmlsdGVyc0NvcHkpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICB9IGVsc2UgaWYgKGRlY0ZpbHRlckZpbHRlcnNQbHVzU2VhcmNoLmNoaWxkcmVuKSB7XG5cbiAgICAgICAgZGVjRmlsdGVyRmlsdGVyc1BsdXNTZWFyY2guY2hpbGRyZW4gPSB0aGlzLmdldENvdW50YWJsZUZpbHRlcnMoZGVjRmlsdGVyRmlsdGVyc1BsdXNTZWFyY2guY2hpbGRyZW4pO1xuXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHVpZDogZGVjRmlsdGVyRmlsdGVyc1BsdXNTZWFyY2gudWlkLFxuICAgICAgICBmaWx0ZXJzOiBkZWNGaWx0ZXJGaWx0ZXJzUGx1c1NlYXJjaC5maWx0ZXJzLFxuICAgICAgICBjaGlsZHJlbjogZGVjRmlsdGVyRmlsdGVyc1BsdXNTZWFyY2guY2hpbGRyZW4sXG4gICAgICB9O1xuXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5lbnN1cmVGaWx0ZXJWYWx1ZXNBc0FycmF5KGZpbHRlcnNQbHVzU2VhcmNoKTtcblxuICB9XG5cbiAgLypcbiAgICogZW5zdXJlRmlsdGVyVmFsdWVzQXNBcnJheVxuICAgKlxuICAgKiBHZXQgYW4gYXJyYXkgb2YgZmlsdGVyZ3JvdXBzIGFuZCBzZXQgdGhlIGZpbHRlciB2YWx1ZXMgdG8gYXJyYXkgaWYgbm90XG4gICAqXG4gICAqL1xuICBwcml2YXRlIGVuc3VyZUZpbHRlclZhbHVlc0FzQXJyYXkoZmlsdGVyR3JvdXBzOiBhbnkgPSBbXSkge1xuXG4gICAgcmV0dXJuIGZpbHRlckdyb3Vwcy5tYXAoZGVjTGlzdEZpbHRlciA9PiB7XG5cbiAgICAgIGlmIChkZWNMaXN0RmlsdGVyLmZpbHRlcnMpIHtcblxuICAgICAgICB0aGlzLmFwcGVuZEZpbHRlckdyb3Vwc0Jhc2VkT25TZWFyY2hhYmxlUHJvcGVydGllcyhkZWNMaXN0RmlsdGVyLmZpbHRlcnMpO1xuXG4gICAgICAgIGRlY0xpc3RGaWx0ZXIuZmlsdGVycyA9IGRlY0xpc3RGaWx0ZXIuZmlsdGVycy5tYXAoZmlsdGVyR3JvdXAgPT4ge1xuXG5cbiAgICAgICAgICBmaWx0ZXJHcm91cC5maWx0ZXJzID0gZmlsdGVyR3JvdXAuZmlsdGVycy5tYXAoZmlsdGVyID0+IHtcblxuICAgICAgICAgICAgZmlsdGVyLnZhbHVlID0gQXJyYXkuaXNBcnJheShmaWx0ZXIudmFsdWUpID8gZmlsdGVyLnZhbHVlIDogW2ZpbHRlci52YWx1ZV07XG5cbiAgICAgICAgICAgIHJldHVybiBmaWx0ZXI7XG5cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHJldHVybiBmaWx0ZXJHcm91cDtcblxuICAgICAgICB9KTtcblxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZGVjTGlzdEZpbHRlcjtcblxuICAgIH0pO1xuXG4gIH1cblxuICAvKlxuICAgKiBhY3RCeVNjcm9sbFBvc2l0aW9uXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGRldGVjdCBpZiB0aGVyZSBpcyBzY3Jvb2xpbmcgYWN0aW9uIG9uIHdpbmRvdyB0byBmZXRjaCBhbmQgc2hvdyBtb3JlIHJvd3Mgd2hlbiB0aGUgc2Nyb2xsaW5nIGRvd24uXG4gICAqL1xuICBwcml2YXRlIGFjdEJ5U2Nyb2xsUG9zaXRpb24gPSAoJGV2ZW50KSA9PiB7XG5cbiAgICBpZiAoJGV2ZW50WydwYXRoJ10pIHtcblxuICAgICAgY29uc3QgZWxlbWVudFdpdGhDZGtPdmVybGF5Q2xhc3MgPSAkZXZlbnRbJ3BhdGgnXS5maW5kKHBhdGggPT4ge1xuXG4gICAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IHBhdGhbJ2NsYXNzTmFtZSddIHx8ICcnO1xuXG4gICAgICAgIGNvbnN0IGluc2lkZU92ZXJsYXkgPSBjbGFzc05hbWUuaW5kZXhPZignY2RrLW92ZXJsYXknKSA+PSAwO1xuXG4gICAgICAgIGNvbnN0IGluc2lkZUZ1bGxzY3JlYW5EaWFsb2dDb250YWluZXIgPSBjbGFzc05hbWUuaW5kZXhPZignZnVsbHNjcmVhbi1kaWFsb2ctY29udGFpbmVyJykgPj0gMDtcblxuICAgICAgICByZXR1cm4gaW5zaWRlT3ZlcmxheSB8fCBpbnNpZGVGdWxsc2NyZWFuRGlhbG9nQ29udGFpbmVyO1xuXG4gICAgICB9KTtcblxuICAgICAgaWYgKCFlbGVtZW50V2l0aENka092ZXJsYXlDbGFzcykgeyAvLyBhdm9pZCBjbG9zaW5nIGZpbHRlciBmcm9tIGFueSBvcGVuIGRpYWxvZ1xuXG4gICAgICAgIGlmICghdGhpcy5pc0xhc3RQYWdlKSB7XG5cbiAgICAgICAgICBjb25zdCB0YXJnZXQ6IGFueSA9ICRldmVudFsndGFyZ2V0J107XG5cbiAgICAgICAgICBjb25zdCBsaW1pdCA9IHRhcmdldC5zY3JvbGxIZWlnaHQgLSB0YXJnZXQuY2xpZW50SGVpZ2h0O1xuXG4gICAgICAgICAgaWYgKHRhcmdldC5zY3JvbGxUb3AgPj0gKGxpbWl0IC0gMTYpKSB7XG5cbiAgICAgICAgICAgIHRoaXMuc2hvd01vcmUoKTtcblxuICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICB9XG5cbiAgfVxuXG4gIC8qXG4gICAqIGRldGVjdExpc3RNb2RlXG4gICAqXG4gICBnZXRMaXN0TW9kZSBpbnB1dFxuICAgKi9cbiAgcHJpdmF0ZSBkZXRlY3RMaXN0TW9kZSgpIHtcblxuICAgIHRoaXMuZ2V0TGlzdE1vZGUoKTtcblxuICB9XG5cbiAgLypcbiAgICogZGV0ZWN0TGlzdE1vZGVCYXNlZE9uR3JpZEFuZFRhYmxlUHJlc2VuY2UoKVxuICAgKlxuICAgKiBTZXQgdGhlIGxpc3QgbW9kZSBiYXNlZCBvbiBkZWNsYXJhdGlvbiBvZiB0YWJsZSBhbmQgZ3JpZC4gVGhpcyBpcyBuZWNlc3NhcnkgdG8gYm9vdGFzdHJhcCB0aGUgY29tcG9uZW50IHdpdGggb25seSBncmlkIG9yIG9ubHkgdGFibGVcbiAgICogVGhpcyBvbmx5IHdvcmsgaWYgbm8gbW9kZSBpcyBwcm92aWRlZCBieSBASW5wdXQgb3RoZXJ3aXNlIHRoZSBASW5wdXQgdmFsdWUgd2lsbCBiZSB1c2VkXG4gICAqL1xuICBwcml2YXRlIGRldGVjdExpc3RNb2RlQmFzZWRPbkdyaWRBbmRUYWJsZVByZXNlbmNlKCkge1xuXG4gICAgdGhpcy5saXN0TW9kZSA9IHRoaXMubGlzdE1vZGUgPyB0aGlzLmxpc3RNb2RlIDogdGhpcy50YWJsZSA/ICd0YWJsZScgOiAnZ3JpZCc7XG5cbiAgfVxuXG4gIC8qXG4gICAqIGVtaXRTY3JvbGxFdmVudFxuICAgKlxuICAgKiBFbWl0cyBzY3JvbGwgZXZlbnQgd2hlbiBub3QgbG9hZGluZ1xuICAgKi9cbiAgcHJpdmF0ZSBlbWl0U2Nyb2xsRXZlbnQgPSAoJGV2ZW50KSA9PiB7XG5cbiAgICBpZiAoIXRoaXMubG9hZGluZykge1xuXG4gICAgICB0aGlzLnNjcm9sbEV2ZW50RW1pdGVyLmVtaXQoJGV2ZW50KTtcblxuICAgIH1cblxuICB9XG5cbiAgLypcbiAgICogaXNUYWJzRmlsdGVyRGVmaW5lZFxuICAgKlxuICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgVGFicyBGaWx0ZXIgaXMgZGVmaW5lZCBpbnNpZGUgdGhlIGxpc3RcbiAgICovXG4gIHByaXZhdGUgaXNUYWJzRmlsdGVyRGVmaW5lZCgpIHtcbiAgICByZXR1cm4gdGhpcy5maWx0ZXIgJiYgdGhpcy5maWx0ZXIudGFic0ZpbHRlckNvbXBvbmVudDtcbiAgfVxuXG4gIC8qXG4gICAqIGRvRmlyc3RMb2FkXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGlzIGNhbGxlZCBhZnRlciB0aGUgdmlldyBhbmQgaW5wdXRzIGFyZSBpbml0aWFsaXplZFxuICAgKlxuICAgKiBUaGlzIGlzIHRoZSBmaXJzdCBjYWxsIHRvIGdldCBkYXRhXG4gICAqL1xuICBwcml2YXRlIGRvRmlyc3RMb2FkKCkge1xuICAgIGlmICh0aGlzLmlzVGFic0ZpbHRlckRlZmluZWQoKSkge1xuICAgICAgdGhpcy5kb0ZpcnN0TG9hZEJ5VGFic0ZpbHRlcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRvRmlyc3RMb2FkTG9jYWxseSh0cnVlKTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiBkb0ZpcnN0TG9hZEJ5VGFic0ZpbHRlclxuICAgKlxuICAgKiB1c2UgdGhlIHRhYnMgZmlsdGVyIHRvIHRyaWdnZXIgdGhlIGZpcnN0IGxvYWRcbiAgICpcbiAgICogVGhpcyB3YXkgdGhlIGRlZmF1bHQgdGFiIGFuZCBmaWx0ZXIgYXJlIHNlbGVjdGVkIGJ5IHRoZSBkZWN0YWJzRmlsdGVyIGNvbXBvbmVudFxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBkb0ZpcnN0TG9hZEJ5VGFic0ZpbHRlcigpIHtcbiAgICB0aGlzLmZpbHRlci50YWJzRmlsdGVyQ29tcG9uZW50LmRvRmlyc3RMb2FkKCk7XG4gIH1cblxuICAvKlxuICAgKiBkb0ZpcnN0TG9hZExvY2FsbHlcbiAgICpcbiAgICogSWYgbm8gZmlsdGVyIGFyZSBkZWZpbmVkLCBqdXN0IGNhbGwgdGggZWVuZHBvaW50IHdpdGhvdXQgZmlsdGVyc1xuICAgKi9cbiAgcHJpdmF0ZSBkb0ZpcnN0TG9hZExvY2FsbHkocmVmcmVzaCkge1xuICAgIHRoaXMubG9hZFJlcG9ydChyZWZyZXNoKTtcbiAgfVxuXG4gIC8qXG4gICAqIGVuc3VyZVVuaXF1ZU5hbWVcbiAgICpcbiAgICogV2UgbXVzdCBwcm92aWRlIGFuIHVuaXF1ZSBuYW1lIHRvIHRoZSBsaXN0IHNvIHdlIGNhbiBwZXJzaXN0IGl0cyBzdGF0ZSBpbiB0aGUgVVJMIHdpdGhvdXQgY29uZmxpY3RzXG4gICAqXG4gICAqL1xuICBwcml2YXRlIGVuc3VyZVVuaXF1ZU5hbWUoKSB7XG4gICAgaWYgKCF0aGlzLm5hbWUpIHtcbiAgICAgIGNvbnN0IGVycm9yID0gJ0xpc3RDb21wb25lbnRFcnJvcjogVGhlIGxpc3QgY29tcG9uZW50IG11c3QgaGF2ZSBhbiB1bmlxdWUgbmFtZSB0byBiZSB1c2VkIGluIHVybCBmaWx0ZXIuJ1xuICAgICAgKyAnIFBsZWFzZSwgZW5zdXJlIHRoYXQgeW91IGhhdmUgcGFzc2VkIGFuIHVuaXF1ZSBuYW1tZSB0byB0aGUgY29tcG9uZW50Lic7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIGxvYWRCeU9wZW5uZWRDb2xsYXBzZVxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBpcyB0cmlnZ2VyZWQgd2hlbiBhIGNvbGxhcHNhYmxlIHRhYmxlIGlzIG9wZW4uXG4gICAqXG4gICAqL1xuICBwcml2YXRlIGxvYWRCeU9wZW5uZWRDb2xsYXBzZShmaWx0ZXJVaWQpIHtcblxuICAgIGNvbnN0IGZpbHRlciA9IHRoaXMuY29sbGFwc2FibGVGaWx0ZXJzLmNoaWxkcmVuLmZpbmQoaXRlbSA9PiBpdGVtLnVpZCA9PT0gZmlsdGVyVWlkKTtcblxuICAgIGNvbnN0IGZpbHRlckdyb3VwOiBGaWx0ZXJHcm91cCA9IHsgZmlsdGVyczogZmlsdGVyLmZpbHRlcnMgfTtcblxuICAgIHRoaXMubG9hZFJlcG9ydCh0cnVlLCBmaWx0ZXJHcm91cCk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcblxuICAgICAgdGhpcy5zZWxlY3RlZENvbGxhcHNhYmxlID0gZmlsdGVyLnVpZDtcblxuICAgIH0sIDApO1xuXG5cbiAgfVxuXG4gIC8qXG4gICAqIGxvYWRSZXBvcnRcbiAgICpcbiAgICogVGhpcyBtZWh0b2QgZ2F0aGVyIHRoZSBmaWx0ZXIgaW5mbyBhbmQgZW5kcG9pbnQgYW5kIGNhbGwgdGhlIGJhY2stZW5kIHRvIGZldGNoIHRoZSBkYXRhXG4gICAqXG4gICAqIElmIHRoZSBzdWN0b21GZXRjaE1ldGhvZCBpcyB1c2VkLCBpdHMgY2FsbCBpdFxuICAgKlxuICAgKiBJZiBvbmx5IHRoZSByb3dzIGFyZSBwYXNzZWQsIHRoZSBtZXRob2QganVzdCB1c2UgaXQgYXMgcmVzdWx0XG4gICAqL1xuICBwcml2YXRlIGxvYWRSZXBvcnQoY2xlYXJBbmRSZWxvYWRSZXBvcnQ/OiBib29sZWFuLCBjb2xsYXBzZUZpbHRlckdyb3Vwcz86IEZpbHRlckdyb3VwKTogUHJvbWlzZTxhbnk+IHtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcblxuICAgICAgaWYgKGNsZWFyQW5kUmVsb2FkUmVwb3J0ICYmIHRoaXMucm93cykge1xuXG4gICAgICAgIHRoaXMuc2V0Um93cyh0aGlzLnJvd3MpO1xuXG4gICAgICB9XG5cbiAgICAgIHRoaXMuY2xlYXJBbmRSZWxvYWRSZXBvcnQgPSBjbGVhckFuZFJlbG9hZFJlcG9ydDtcblxuICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgaWYgKHRoaXMuZW5kcG9pbnQpIHtcblxuICAgICAgICB0aGlzLm1vdW50UGF5bG9hZChjbGVhckFuZFJlbG9hZFJlcG9ydCwgY29sbGFwc2VGaWx0ZXJHcm91cHMpXG4gICAgICAgIC50aGVuKHBheWxvYWQgPT4ge1xuXG4gICAgICAgICAgdGhpcy5wYXlsb2FkID0gcGF5bG9hZDtcblxuICAgICAgICAgIHRoaXMuZmlsdGVyRGF0YS5uZXh0KHsgZW5kcG9pbnQ6IHRoaXMuZW5kcG9pbnQsIHBheWxvYWQ6IHRoaXMucGF5bG9hZCwgY2JrOiByZXMsIGNsZWFyOiBjbGVhckFuZFJlbG9hZFJlcG9ydCB9KTtcblxuICAgICAgICB9KTtcblxuXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuY3VzdG9tRmV0Y2hNZXRob2QpIHtcblxuICAgICAgICB0aGlzLm1vdW50UGF5bG9hZChjbGVhckFuZFJlbG9hZFJlcG9ydCwgY29sbGFwc2VGaWx0ZXJHcm91cHMpXG4gICAgICAgIC50aGVuKHBheWxvYWQgPT4ge1xuXG4gICAgICAgICAgdGhpcy5wYXlsb2FkID0gcGF5bG9hZDtcblxuICAgICAgICAgIHRoaXMuZmlsdGVyRGF0YS5uZXh0KCk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgIH0gZWxzZSBpZiAoIXRoaXMucm93cykge1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuXG4gICAgICAgICAgaWYgKCF0aGlzLnJvd3MpIHtcblxuICAgICAgICAgICAgcmVqKCdObyBlbmRwb2ludCwgY3VzdG9tRmV0Y2hNZXRob2Qgb3Igcm93cyBzZXQnKTtcblxuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXG4gICAgICAgIH0sIDEpO1xuXG4gICAgICB9XG5cbiAgICB9KTtcblxuICB9XG5cbiAgcHJpdmF0ZSBtb3VudFBheWxvYWQoY2xlYXJBbmRSZWxvYWRSZXBvcnQ6IGJvb2xlYW4gPSBmYWxzZSwgY29sbGFwc2VGaWx0ZXJHcm91cHM/KSB7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgICBjb25zdCBzZWFyY2hGaWx0ZXJHcm91cHMgPSB0aGlzLmZpbHRlciA/IHRoaXMuZmlsdGVyLmZpbHRlckdyb3VwcyA6IHVuZGVmaW5lZDtcblxuICAgICAgY29uc3QgZmlsdGVyR3JvdXBzID0gdGhpcy5hcHBlbmRGaWx0ZXJHcm91cHNUb0VhY2hGaWx0ZXJHcm91cChzZWFyY2hGaWx0ZXJHcm91cHMsIGNvbGxhcHNlRmlsdGVyR3JvdXBzKTtcblxuICAgICAgY29uc3QgcGF5bG9hZDogRGVjRmlsdGVyID0ge307XG5cbiAgICAgIHBheWxvYWQubGltaXQgPSB0aGlzLmxpbWl0O1xuXG4gICAgICBpZiAoZmlsdGVyR3JvdXBzKSB7XG5cbiAgICAgICAgcGF5bG9hZC5maWx0ZXJHcm91cHMgPSBmaWx0ZXJHcm91cHM7XG5cbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuY29sdW1uc1NvcnRDb25maWcpIHtcblxuICAgICAgICBwYXlsb2FkLnNvcnQgPSB0aGlzLmNvbHVtbnNTb3J0Q29uZmlnO1xuXG4gICAgICB9XG5cbiAgICAgIGlmICghY2xlYXJBbmRSZWxvYWRSZXBvcnQgJiYgdGhpcy5yZXBvcnQpIHtcblxuICAgICAgICBwYXlsb2FkLnBhZ2UgPSB0aGlzLnJlcG9ydC5wYWdlICsgMTtcblxuICAgICAgICBwYXlsb2FkLmxpbWl0ID0gdGhpcy5yZXBvcnQubGltaXQ7XG5cbiAgICAgIH1cblxuICAgICAgcmVzb2x2ZShwYXlsb2FkKTtcblxuICAgIH0pO1xuXG4gIH1cblxuICAvKlxuICAgKiBhcHBlbmRGaWx0ZXJHcm91cHNUb0VhY2hGaWx0ZXJHcm91cFxuICAgKlxuICAgKiBHZXRzIGFuIGFycmF5IG9mIGZpbHRlckdyb3VwIGFuZCBpbiBlYWNoIGZpbHRlckdyb3VwIGluIHRoaXMgYXJyYXkgYXBwZW5kcyB0aGUgc2Vjb25kIGZpbHRlckdyb3VwIGZpbHRlcnMuXG4gICAqL1xuICBwcml2YXRlIGFwcGVuZEZpbHRlckdyb3Vwc1RvRWFjaEZpbHRlckdyb3VwKGZpbHRlckdyb3VwczogRmlsdGVyR3JvdXBzLCBmaWx0ZXJHcm91cFRvQXBwZW5kOiBGaWx0ZXJHcm91cCkge1xuXG4gICAgaWYgKGZpbHRlckdyb3VwVG9BcHBlbmQpIHtcblxuICAgICAgaWYgKGZpbHRlckdyb3VwcyAmJiBmaWx0ZXJHcm91cHMubGVuZ3RoID4gMCkge1xuXG4gICAgICAgIGZpbHRlckdyb3Vwcy5mb3JFYWNoKGdyb3VwID0+IHtcblxuICAgICAgICAgIGdyb3VwLmZpbHRlcnMucHVzaCguLi5maWx0ZXJHcm91cFRvQXBwZW5kLmZpbHRlcnMpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIGZpbHRlckdyb3VwcyA9IFtmaWx0ZXJHcm91cFRvQXBwZW5kXTtcblxuICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmV0dXJuIGZpbHRlckdyb3VwcyB8fCBbXTtcblxuICB9XG5cbiAgLypcbiAgICogc2V0RmlsdGVyc0NvbXBvbmVudHNCYXNlUGF0aEFuZE5hbWVzXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHNldEZpbHRlcnNDb21wb25lbnRzQmFzZVBhdGhBbmROYW1lcygpIHtcblxuICAgIGlmICh0aGlzLmZpbHRlcikge1xuXG4gICAgICB0aGlzLmZpbHRlci5uYW1lID0gdGhpcy5uYW1lO1xuXG5cbiAgICAgIGlmICh0aGlzLmZpbHRlci50YWJzRmlsdGVyQ29tcG9uZW50KSB7XG5cbiAgICAgICAgdGhpcy5maWx0ZXIudGFic0ZpbHRlckNvbXBvbmVudC5uYW1lID0gdGhpcy5uYW1lO1xuXG4gICAgICAgIGlmICh0aGlzLmN1c3RvbUZldGNoTWV0aG9kKSB7XG5cbiAgICAgICAgICB0aGlzLmZpbHRlci50YWJzRmlsdGVyQ29tcG9uZW50LmN1c3RvbUZldGNoTWV0aG9kID0gdGhpcy5jdXN0b21GZXRjaE1ldGhvZDtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgdGhpcy5maWx0ZXIudGFic0ZpbHRlckNvbXBvbmVudC5zZXJ2aWNlID0gdGhpcy5zZXJ2aWNlO1xuXG4gICAgICAgIH1cblxuXG5cbiAgICAgIH1cblxuICAgIH1cblxuICB9XG5cbiAgLypcbiAgICogc2V0Um93c1xuICAgKlxuICAgKiBTZXRzIHRoZSBjdXJyZW50IHRhYmxlIHJvd3NcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc2V0Um93cyhyb3dzID0gW10pIHtcblxuICAgIHRoaXMucmVwb3J0ID0ge1xuXG4gICAgICBwYWdlOiAxLFxuXG4gICAgICByZXN1bHQ6IHtcblxuICAgICAgICByb3dzOiByb3dzLFxuXG4gICAgICAgIGNvdW50OiByb3dzLmxlbmd0aFxuXG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuZGV0ZWN0TGFzdFBhZ2Uocm93cywgcm93cy5sZW5ndGgpO1xuXG4gICAgdGhpcy51cGRhdGVDb250ZW50Q2hpbGRyZW4oKTtcbiAgfVxuXG4gIC8qXG4gICAqIHdhdGNoU2Nyb2xsRXZlbnRFbWl0dGVyXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHdhdGNoU2Nyb2xsRXZlbnRFbWl0dGVyKCkge1xuXG4gICAgdGhpcy5zY3JvbGxFdmVudEVtaXRlclN1YnNjcmlwdGlvbiA9IHRoaXMuc2Nyb2xsRXZlbnRFbWl0ZXJcbiAgICAucGlwZShcbiAgICAgIGRlYm91bmNlVGltZSgxNTApLFxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKVxuICAgICkuc3Vic2NyaWJlKHRoaXMuYWN0QnlTY3JvbGxQb3NpdGlvbik7XG5cbiAgfVxuXG4gIC8qXG4gICAqIHN0b3BXYXRjaGluZ1Njcm9sbEV2ZW50RW1pdHRlclxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzdG9wV2F0Y2hpbmdTY3JvbGxFdmVudEVtaXR0ZXIoKSB7XG5cbiAgICBpZiAodGhpcy5zY3JvbGxFdmVudEVtaXRlclN1YnNjcmlwdGlvbikge1xuXG4gICAgICB0aGlzLnNjcm9sbEV2ZW50RW1pdGVyU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIC8qXG4gICAqIHdhdGNoRmlsdGVyRGF0YVxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB3YXRjaEZpbHRlckRhdGEoKSB7XG4gICAgdGhpcy5yZWFjdGl2ZVJlcG9ydCA9IHRoaXMuZmlsdGVyRGF0YVxuICAgIC5waXBlKFxuICAgICAgZGVib3VuY2VUaW1lKDE1MCksIC8vIGF2b2lkIG11aWx0aXBsZSByZXF1ZXN0IHdoZW4gdGhlIGZpbHRlciBvciB0YWIgY2hhbmdlIHRvbyBmYXN0XG4gICAgICBzd2l0Y2hNYXAoKGZpbHRlckRhdGE6IEZpbHRlckRhdGEpID0+IHtcblxuICAgICAgICBjb25zdCBvYnNlcnZhYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxhbnk+KHVuZGVmaW5lZCk7XG5cbiAgICAgICAgY29uc3QgZmV0Y2hNZXRob2Q6IERlY0xpc3RGZXRjaE1ldGhvZCA9IHRoaXMuY3VzdG9tRmV0Y2hNZXRob2QgfHwgdGhpcy5zZXJ2aWNlLmdldDtcblxuICAgICAgICBjb25zdCBlbmRwb2ludCA9IGZpbHRlckRhdGEgPyBmaWx0ZXJEYXRhLmVuZHBvaW50IDogdW5kZWZpbmVkO1xuXG4gICAgICAgIGNvbnN0IHBheWxvYWRXaXRoU2VhcmNoYWJsZVByb3BlcnRpZXMgPSB0aGlzLmdldFBheWxvYWRXaXRoU2VhcmNoVHJhbnNmb3JtZWRJbnRvU2VhcmNoYWJsZVByb3BlcnRpZXModGhpcy5wYXlsb2FkKTtcblxuICAgICAgICBpZiAoZmlsdGVyRGF0YSAmJiBmaWx0ZXJEYXRhLmNsZWFyKSB7XG4gICAgICAgICAgdGhpcy5zZXRSb3dzKFtdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZldGNoTWV0aG9kKGVuZHBvaW50LCBwYXlsb2FkV2l0aFNlYXJjaGFibGVQcm9wZXJ0aWVzKVxuICAgICAgICAuc3Vic2NyaWJlKHJlcyA9PiB7XG5cbiAgICAgICAgICBvYnNlcnZhYmxlLm5leHQocmVzKTtcblxuICAgICAgICAgIGlmIChmaWx0ZXJEYXRhICYmIGZpbHRlckRhdGEuY2JrKSB7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyAvLyB3YWl0IGZvciBzdWJzY3JpYmVycyB0byByZWZyZXNoIHRoZWlyIHJvd3NcblxuICAgICAgICAgICAgICBmaWx0ZXJEYXRhLmNiayhuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqKSA9PiB7XG5cbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlcyk7XG5cbiAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICB9LCAxKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGU7XG4gICAgICB9KVxuXG4gICAgKTtcbiAgICB0aGlzLnN1YnNjcmliZVRvUmVhY3RpdmVSZXBvcnQoKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0UGF5bG9hZFdpdGhTZWFyY2hUcmFuc2Zvcm1lZEludG9TZWFyY2hhYmxlUHJvcGVydGllcyhwYXlsb2FkKSB7XG5cbiAgICBjb25zdCBwYXlsb2FkQ29weSA9IHsuLi5wYXlsb2FkfTtcblxuICAgIGlmIChwYXlsb2FkQ29weS5maWx0ZXJHcm91cHMgJiYgdGhpcy5zZWFyY2hhYmxlUHJvcGVydGllcykge1xuXG4gICAgICBwYXlsb2FkQ29weS5maWx0ZXJHcm91cHMgPSBbLi4ucGF5bG9hZC5maWx0ZXJHcm91cHNdO1xuXG4gICAgICB0aGlzLmFwcGVuZEZpbHRlckdyb3Vwc0Jhc2VkT25TZWFyY2hhYmxlUHJvcGVydGllcyhwYXlsb2FkQ29weS5maWx0ZXJHcm91cHMpO1xuXG4gICAgICByZXR1cm4gcGF5bG9hZENvcHk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICByZXR1cm4gdGhpcy5wYXlsb2FkO1xuXG4gICAgfVxuXG4gIH1cblxuICBwcml2YXRlIGFwcGVuZEZpbHRlckdyb3Vwc0Jhc2VkT25TZWFyY2hhYmxlUHJvcGVydGllcyhmaWx0ZXJHcm91cHMpIHtcblxuICAgIGNvbnN0IGZpbHRlckdyb3VwVGhhdENvbnRhaW5zQmFzaWNTZWFyY2ggPSB0aGlzLmdldEZpbHRlckdyb3VwVGhhdENvbnRhaW5zVGhlQmFzaWNTZWFyY2goZmlsdGVyR3JvdXBzKTtcblxuICAgIGlmIChmaWx0ZXJHcm91cFRoYXRDb250YWluc0Jhc2ljU2VhcmNoKSB7XG5cbiAgICAgIHRoaXMucmVtb3ZlRmlsdGVyR3JvdXAoZmlsdGVyR3JvdXBzLCBmaWx0ZXJHcm91cFRoYXRDb250YWluc0Jhc2ljU2VhcmNoKTtcblxuICAgICAgY29uc3QgYmFzaWNTZWFyY2ggPSBmaWx0ZXJHcm91cFRoYXRDb250YWluc0Jhc2ljU2VhcmNoLmZpbHRlcnMuZmluZChmaWx0ZXIgPT4gZmlsdGVyLnByb3BlcnR5ID09PSAnc2VhcmNoJyk7XG5cbiAgICAgIGNvbnN0IGJhc2ljU2VhcmNoSW5kZXggPSBmaWx0ZXJHcm91cFRoYXRDb250YWluc0Jhc2ljU2VhcmNoLmZpbHRlcnMuaW5kZXhPZihiYXNpY1NlYXJjaCk7XG5cbiAgICAgIHRoaXMuc2VhcmNoYWJsZVByb3BlcnRpZXMuZm9yRWFjaChwcm9wZXJ0eSA9PiB7XG5cbiAgICAgICAgY29uc3QgbmV3RmlsdGVyR3JvdXA6IEZpbHRlckdyb3VwID0ge1xuICAgICAgICAgIGZpbHRlcnM6IFsuLi5maWx0ZXJHcm91cFRoYXRDb250YWluc0Jhc2ljU2VhcmNoLmZpbHRlcnNdXG4gICAgICAgIH07XG5cbiAgICAgICAgbmV3RmlsdGVyR3JvdXAuZmlsdGVyc1tiYXNpY1NlYXJjaEluZGV4XSA9IHtcbiAgICAgICAgICBwcm9wZXJ0eTogcHJvcGVydHksXG4gICAgICAgICAgdmFsdWU6IFtiYXNpY1NlYXJjaC52YWx1ZV1cbiAgICAgICAgfTtcblxuICAgICAgICBmaWx0ZXJHcm91cHMucHVzaChuZXdGaWx0ZXJHcm91cCk7XG5cbiAgICAgIH0pO1xuXG4gICAgfVxuXG4gIH1cblxuICBwcml2YXRlIHJlbW92ZUZpbHRlckdyb3VwKGZpbHRlckdyb3VwcywgZmlsdGVyR3JvdXBUaGF0Q29udGFpbnNCYXNpY1NlYXJjaCkge1xuXG4gICAgY29uc3QgZmlsdGVyR3JvdXBUaGF0Q29udGFpbnNCYXNpY1NlYXJjaEluZGV4ID0gZmlsdGVyR3JvdXBzLmluZGV4T2YoZmlsdGVyR3JvdXBUaGF0Q29udGFpbnNCYXNpY1NlYXJjaCk7XG5cbiAgICBmaWx0ZXJHcm91cHMuc3BsaWNlKGZpbHRlckdyb3VwVGhhdENvbnRhaW5zQmFzaWNTZWFyY2hJbmRleCwgMSk7XG5cbiAgfVxuXG4gIHByaXZhdGUgZ2V0RmlsdGVyR3JvdXBUaGF0Q29udGFpbnNUaGVCYXNpY1NlYXJjaChmaWx0ZXJHcm91cHMpIHtcblxuICAgIHJldHVybiBmaWx0ZXJHcm91cHMuZmluZChmaWx0ZXJHcm91cCA9PiB7XG5cbiAgICAgIGNvbnN0IGJhc2ljU2VyY2hGaWx0ZXIgPSBmaWx0ZXJHcm91cC5maWx0ZXJzID8gZmlsdGVyR3JvdXAuZmlsdGVycy5maW5kKGZpbHRlciA9PiBmaWx0ZXIucHJvcGVydHkgPT09ICdzZWFyY2gnKSA6IHVuZGVmaW5lZDtcblxuICAgICAgcmV0dXJuIGJhc2ljU2VyY2hGaWx0ZXIgPyB0cnVlIDogZmFsc2U7XG5cbiAgICB9KTtcblxuICB9XG5cbiAgLypcbiAgICogc3Vic2NyaWJlVG9SZWFjdGl2ZVJlcG9ydFxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzdWJzY3JpYmVUb1JlYWN0aXZlUmVwb3J0KCkge1xuICAgIHRoaXMucmVhY3RpdmVSZXBvcnRTdWJzY3JpcHRpb24gPSB0aGlzLnJlYWN0aXZlUmVwb3J0XG4gICAgLnBpcGUoXG4gICAgICB0YXAocmVzID0+IHtcbiAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIClcbiAgICAuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgaWYgKGRhdGEgJiYgZGF0YS5yZXN1bHQgJiYgZGF0YS5yZXN1bHQucm93cykge1xuXG4gICAgICAgIGlmICghdGhpcy5jbGVhckFuZFJlbG9hZFJlcG9ydCkge1xuICAgICAgICAgIGRhdGEucmVzdWx0LnJvd3MgPSB0aGlzLnJlcG9ydC5yZXN1bHQucm93cy5jb25jYXQoZGF0YS5yZXN1bHQucm93cyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlcG9ydCA9IGRhdGE7XG5cbiAgICAgICAgdGhpcy5wb3N0U2VhcmNoLmVtaXQoZGF0YSk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVDb250ZW50Q2hpbGRyZW4oKTtcblxuICAgICAgICB0aGlzLmRldGVjdExhc3RQYWdlKGRhdGEucmVzdWx0LnJvd3MsIGRhdGEucmVzdWx0LmNvdW50KTtcblxuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZGV0ZWN0TGFzdFBhZ2Uocm93cywgY291bnQpIHtcblxuICAgIGNvbnN0IG51bWJlck9mcm93cyA9IHJvd3MubGVuZ3RoO1xuXG4gICAgY29uc3QgZW1wdExpc3QgPSBudW1iZXJPZnJvd3MgPT09IDA7XG5cbiAgICBjb25zdCBzaW5nbGVQYWdlTGlzdCA9IG51bWJlck9mcm93cyA9PT0gY291bnQ7XG5cbiAgICB0aGlzLmlzTGFzdFBhZ2UgPSBlbXB0TGlzdCB8fCBzaW5nbGVQYWdlTGlzdDtcblxuICB9XG5cbiAgLypcbiAgICogdW5zdWJzY3JpYmVUb1JlYWN0aXZlUmVwb3J0XG4gICAqXG4gICAqL1xuICBwcml2YXRlIHVuc3Vic2NyaWJlVG9SZWFjdGl2ZVJlcG9ydCgpIHtcbiAgICBpZiAodGhpcy5yZWFjdGl2ZVJlcG9ydFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5yZWFjdGl2ZVJlcG9ydFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIHVwZGF0ZUNvbnRlbnRDaGlsZHJlblxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB1cGRhdGVDb250ZW50Q2hpbGRyZW4oKSB7XG5cbiAgICBjb25zdCByb3dzID0gdGhpcy5lbmRwb2ludCA/IHRoaXMucmVwb3J0LnJlc3VsdC5yb3dzIDogdGhpcy5yb3dzO1xuICAgIGlmICh0aGlzLmdyaWQpIHtcbiAgICAgIHRoaXMuZ3JpZC5yb3dzID0gcm93cztcbiAgICB9XG4gICAgaWYgKHRoaXMudGFibGUpIHtcbiAgICAgIHRoaXMudGFibGUucm93cyA9IHJvd3M7XG4gICAgfVxuICAgIGlmICh0aGlzLmZpbHRlcikge1xuICAgICAgdGhpcy5maWx0ZXIuY291bnQgPSB0aGlzLnJlcG9ydC5yZXN1bHQuY291bnQ7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogcmVnaXN0ZXJDaGlsZFdhdGNoZXJzXG4gICAqXG4gICAqIFdhdGNoIGZvciBjaGlsZHJlbiBvdXRwdXRzXG4gICAqL1xuICBwcml2YXRlIHJlZ2lzdGVyQ2hpbGRXYXRjaGVycygpIHtcblxuICAgIGlmICh0aGlzLmdyaWQpIHtcbiAgICAgIHRoaXMud2F0Y2hHcmlkUm93Q2xpY2soKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy50YWJsZSkge1xuICAgICAgdGhpcy53YXRjaFRhYmxlUm93Q2xpY2soKTtcbiAgICB9XG5cbiAgfVxuXG4gIC8qXG4gICAqIHdhdGNoR3JpZFJvd0NsaWNrXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHdhdGNoR3JpZFJvd0NsaWNrKCkge1xuICAgIHRoaXMuZ3JpZC5yb3dDbGljay5zdWJzY3JpYmUoKCRldmVudCkgPT4ge1xuICAgICAgdGhpcy5yb3dDbGljay5lbWl0KCRldmVudCk7XG4gICAgfSk7XG4gIH1cblxuICAvKlxuICAgKiB3YXRjaFRhYmxlUm93Q2xpY2tcbiAgICpcbiAgICovXG4gIHByaXZhdGUgd2F0Y2hUYWJsZVJvd0NsaWNrKCkge1xuICAgIHRoaXMudGFibGUucm93Q2xpY2suc3Vic2NyaWJlKCgkZXZlbnQpID0+IHtcbiAgICAgIHRoaXMucm93Q2xpY2suZW1pdCgkZXZlbnQpO1xuICAgIH0pO1xuICB9XG5cbiAgLypcbiAgICogd2F0Y2hGaWx0ZXJcbiAgICpcbiAgICovXG4gIHByaXZhdGUgd2F0Y2hGaWx0ZXIoKSB7XG4gICAgaWYgKHRoaXMuZmlsdGVyKSB7XG4gICAgICB0aGlzLmZpbHRlclN1YnNjcmlwdGlvbiA9IHRoaXMuZmlsdGVyLnNlYXJjaC5zdWJzY3JpYmUoZXZlbnQgPT4ge1xuXG4gICAgICAgIGNvbnN0IHRhYkNoYW5nZWQgPSB0aGlzLnByZXZpb3VzU2VsZWN0ZWRUYWIgJiYgdGhpcy5wcmV2aW91c1NlbGVjdGVkVGFiICE9PSB0aGlzLnNlbGVjdGVkVGFiO1xuXG4gICAgICAgIGNvbnN0IGZpbHRlck1vZGVDaGFuZ2VkID0gdGhpcy5maWx0ZXJNb2RlICE9PSBldmVudC5maWx0ZXJNb2RlO1xuXG4gICAgICAgIGlmICh0YWJDaGFuZ2VkKSB7XG5cbiAgICAgICAgICB0aGlzLnByZXZpb3VzU2VsZWN0ZWRUYWIgPSB0aGlzLnNlbGVjdGVkVGFiO1xuXG4gICAgICAgICAgdGhpcy5zZXRSb3dzKFtdKTsgLy8gaWYgY2hhbmdpbmcgdGFicywgY2xlYXIgdGhlIHJlc3VsdHMgYmVmb3JlIHNob3dpbmcgdGhlIHJvd3MgYmVjYXVzZSBpdCBpcyBkb25lIG9ubHkgYWZ0ZXIgZmV0Y2hpbmcgdGhlIGRhdGFcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZpbHRlck1vZGVDaGFuZ2VkKSB7XG5cbiAgICAgICAgICB0aGlzLmZpbHRlck1vZGUgPSBldmVudC5maWx0ZXJNb2RlO1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5maWx0ZXJNb2RlID09PSAndGFicycpIHtcblxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDb2xsYXBzYWJsZSA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgIHRoaXMuY29sbGFwc2FibGVGaWx0ZXJzID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgdGhpcy5sb2FkUmVwb3J0KHRydWUpLnRoZW4oKHJlcykgPT4ge1xuXG4gICAgICAgICAgICBpZiAoZXZlbnQucmVjb3VudCkge1xuXG4gICAgICAgICAgICAgIHRoaXMucmVsb2FkQ291bnRSZXBvcnQoKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgIGlmICghdGhpcy5jb3VudFJlcG9ydCB8fCBldmVudC5yZWNvdW50KSB7XG5cbiAgICAgICAgICAgIHRoaXMucmVsb2FkQ291bnRSZXBvcnQoKTtcblxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkQ29sbGFwc2FibGUgJiYgIXRhYkNoYW5nZWQpIHtcblxuICAgICAgICAgICAgdGhpcy5sb2FkQnlPcGVubmVkQ29sbGFwc2UodGhpcy5zZWxlY3RlZENvbGxhcHNhYmxlKTtcblxuICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDb2xsYXBzYWJsZSA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgdGhpcy5jb2xsYXBzYWJsZUZpbHRlcnMgPSB7XG4gICAgICAgICAgICAgIHRhYjogdGhpcy5zZWxlY3RlZFRhYixcbiAgICAgICAgICAgICAgY2hpbGRyZW46IGV2ZW50LmNoaWxkcmVuID8gZXZlbnQuY2hpbGRyZW4gOiBbXVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIHdhdGNoRmlsdGVyXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHN0b3BXYXRjaGluZ0ZpbHRlcigpIHtcbiAgICBpZiAodGhpcy5maWx0ZXJTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuZmlsdGVyU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogd2F0Y2hTY3JvbGxcbiAgICpcbiAgICovXG4gIHByaXZhdGUgd2F0Y2hTY3JvbGwoKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnNjcm9sbGFibGVDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMuc2Nyb2xsYWJsZUNvbnRhaW5lckNsYXNzKVswXTtcbiAgICAgIGlmICh0aGlzLnNjcm9sbGFibGVDb250YWluZXIpIHtcbiAgICAgICAgdGhpcy5zY3JvbGxhYmxlQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuZW1pdFNjcm9sbEV2ZW50LCB0cnVlKTtcbiAgICAgIH1cbiAgICB9LCAxKTtcbiAgfVxuXG4gIC8qXG4gICAqIHN0b3BXYXRjaGluZ1Njcm9sbFxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzdG9wV2F0Y2hpbmdTY3JvbGwoKSB7XG4gICAgaWYgKHRoaXMuc2Nyb2xsYWJsZUNvbnRhaW5lcikge1xuICAgICAgdGhpcy5zY3JvbGxhYmxlQ29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuZW1pdFNjcm9sbEV2ZW50LCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiBzdWJzY3JpYmVUb1JlYWN0aXZlUmVwb3J0XG4gICAqXG4gICAqL1xuICBwcml2YXRlIHdhdGNoVGFic0NoYW5nZSgpIHtcbiAgICBpZiAodGhpcy5maWx0ZXIgJiYgdGhpcy5maWx0ZXIudGFic0ZpbHRlckNvbXBvbmVudCkge1xuICAgICAgdGhpcy5zZWxlY3RlZFRhYiA9IHRoaXMuZmlsdGVyLnRhYnNGaWx0ZXJDb21wb25lbnQuc2VsZWN0ZWRUYWI7XG4gICAgICB0aGlzLnRhYnNDaGFuZ2VTdWJzY3JpcHRpb24gPSB0aGlzLmZpbHRlci50YWJzRmlsdGVyQ29tcG9uZW50LnRhYkNoYW5nZS5zdWJzY3JpYmUodGFiID0+IHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFRhYiA9IHRhYjtcbiAgICAgICAgdGhpcy5kZXRlY3RMaXN0TW9kZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogc3Vic2NyaWJlVG9UYWJzQ2hhbmdlXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHN0b3BXYXRjaGluZ1RhYnNDaGFuZ2UoKSB7XG4gICAgaWYgKHRoaXMudGFic0NoYW5nZVN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy50YWJzQ2hhbmdlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogd2F0Y2hUYWJsZVNvcnRcbiAgICpcbiAgICovXG4gIHByaXZhdGUgd2F0Y2hUYWJsZVNvcnQoKSB7XG4gICAgaWYgKHRoaXMudGFibGUpIHtcblxuICAgICAgdGhpcy50YWJsZVNvcnRTdWJzY3JpcHRpb24gPSB0aGlzLnRhYmxlLnNvcnQuc3Vic2NyaWJlKGNvbHVtbnNTb3J0Q29uZmlnID0+IHtcblxuICAgICAgICBpZiAodGhpcy5jb2x1bW5zU29ydENvbmZpZyAhPT0gY29sdW1uc1NvcnRDb25maWcpIHtcblxuICAgICAgICAgIHRoaXMuY29sdW1uc1NvcnRDb25maWcgPSBjb2x1bW5zU29ydENvbmZpZztcblxuICAgICAgICAgIGlmICh0aGlzLmNvbGxhcHNhYmxlRmlsdGVycykge1xuXG4gICAgICAgICAgICB0aGlzLmxvYWRCeU9wZW5uZWRDb2xsYXBzZSh0aGlzLnNlbGVjdGVkQ29sbGFwc2FibGUpO1xuXG4gICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgdGhpcy5sb2FkUmVwb3J0KHRydWUpO1xuXG4gICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogc3RvcFdhdGNoaW5nVGFibGVTb3J0XG4gICAqXG4gICAqL1xuICBwcml2YXRlIHN0b3BXYXRjaGluZ1RhYmxlU29ydCgpIHtcbiAgICBpZiAodGhpcy50YWJsZVNvcnRTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMudGFibGVTb3J0U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==