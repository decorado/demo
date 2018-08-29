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
                _this.filterData.next();
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvbGlzdC9saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBaUIsU0FBUyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkgsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDdkUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDMUUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDN0UsT0FBTyxFQUFjLGVBQWUsRUFBZ0IsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsb0JBQW9CLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3BGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQzs7SUFzYnRFOzs7O09BSUc7SUFDSCwwQkFDVTtRQURWLGlCQUVLO1FBREssWUFBTyxHQUFQLE9BQU87Ozs7OzswQkFoVmlCLE1BQU07MEJBZ0ZFLElBQUksT0FBTyxFQUFjO3dCQU9oRCxJQUFJO2lDQTBDSyxJQUFJLFlBQVksRUFBTzs7Ozs7O3FCQThIbEMsRUFBRTs7Ozs7O3dDQWNpQixxQkFBcUI7Ozs7OzswQkFjbkMsSUFBSTs7Ozs7OzBCQU9ILElBQUksWUFBWSxFQUFPOzs7Ozs7d0JBT04sSUFBSSxZQUFZLEVBQU87MkJBa1B6QztZQUVwQixxQkFBSSxRQUFRLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBQztZQUU3QixFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsTUFBTSxJQUFJLEtBQUksQ0FBQyxNQUFNLENBQUMs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Qjs7MkJBaGJ0Qzs7U0FvR2EsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBDb250ZW50Q2hpbGQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERlY0xpc3RHcmlkQ29tcG9uZW50IH0gZnJvbSAnLi9saXN0LWdyaWQvbGlzdC1ncmlkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNMaXN0VGFibGVDb21wb25lbnQgfSBmcm9tICcuL2xpc3QtdGFibGUvbGlzdC10YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjTGlzdEZpbHRlckNvbXBvbmVudCB9IGZyb20gJy4vbGlzdC1maWx0ZXIvbGlzdC1maWx0ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCwgU3Vic2NyaXB0aW9uLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIGRpc3RpbmN0VW50aWxDaGFuZ2VkLCB0YXAsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IERlY0FwaVNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGVjTGlzdEZldGNoTWV0aG9kLCBDb3VudFJlcG9ydCB9IGZyb20gJy4vbGlzdC5tb2RlbHMnO1xuaW1wb3J0IHsgRmlsdGVyRGF0YSwgRGVjRmlsdGVyLCBGaWx0ZXJHcm91cHMsIEZpbHRlckdyb3VwIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9hcGkvZGVjb3JhLWFwaS5tb2RlbCc7XG5pbXBvcnQgeyBEZWNMaXN0RmlsdGVyIH0gZnJvbSAnLi9saXN0Lm1vZGVscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1saXN0JyxcbiAgdGVtcGxhdGU6IGA8IS0tIENPTVBPTkVOVCBMQVlPVVQgLS0+XG48ZGl2IGNsYXNzPVwibGlzdC1jb21wb25lbnQtd3JhcHBlclwiPlxuICA8ZGl2ICpuZ0lmPVwiZmlsdGVyXCI+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZGVjLWxpc3QtZmlsdGVyXCI+PC9uZy1jb250ZW50PlxuICA8L2Rpdj5cbiAgPGRpdiAqbmdJZj1cInJlcG9ydCB8fCBmaWx0ZXJNb2RlID09PSAnY29sbGFwc2UnXCI+XG4gICAgPGRpdiBmeExheW91dD1cImNvbHVtblwiIGZ4TGF5b3V0R2FwPVwiMTZweFwiPlxuICAgICAgPGRpdiBmeEZsZXggY2xhc3M9XCJ0ZXh0LXJpZ2h0XCIgKm5nSWY9XCJ0YWJsZUFuZEdyaWRBcmVTZXQoKVwiPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBtYXQtaWNvbi1idXR0b24gKGNsaWNrKT1cInRvZ2dsZUxpc3RNb2RlKClcIj5cbiAgICAgICAgICA8bWF0LWljb24gdGl0bGU9XCJTd2l0Y2ggdG8gdGFibGUgbW9kZVwiIGFyaWEtbGFiZWw9XCJTd2l0Y2ggdG8gdGFibGUgbW9kZVwiIGNvbG9yPVwicHJpbWFyeVwiIGNvbnRyYXN0Rm9udFdpdGhCZyAqbmdJZj1cImxpc3RNb2RlID09PSAnZ3JpZCdcIj52aWV3X2hlYWRsaW5lPC9tYXQtaWNvbj5cbiAgICAgICAgICA8bWF0LWljb24gdGl0bGU9XCJTd2l0Y2ggdG8gZ3JpZCBtb2RlXCIgYXJpYS1sYWJlbD1cIlN3aXRjaCB0byBncmlkIG1vZGVcIiBjb2xvcj1cInByaW1hcnlcIiBjb250cmFzdEZvbnRXaXRoQmcgKm5nSWY9XCJsaXN0TW9kZSA9PT0gJ3RhYmxlJ1wiPnZpZXdfbW9kdWxlPC9tYXQtaWNvbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgZnhGbGV4PlxuICAgICAgICA8ZGl2ICpuZ0lmPVwiZmlsdGVyTW9kZSA9PSAnY29sbGFwc2UnIHRoZW4gY29sbGFwc2VUZW1wbGF0ZSBlbHNlIHRhYnNUZW1wbGF0ZVwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG5cbjwhLS0gR1JJRCBURU1QTEFURSAtLT5cbjxuZy10ZW1wbGF0ZSAjZ3JpZFRlbXBsYXRlPlxuICA8bmctY29udGVudCBzZWxlY3Q9XCJkZWMtbGlzdC1ncmlkXCI+PC9uZy1jb250ZW50PlxuPC9uZy10ZW1wbGF0ZT5cblxuPCEtLSBUQUJMRSBURU1QTEFURSAtLT5cbjxuZy10ZW1wbGF0ZSAjbGlzdFRlbXBsYXRlPlxuICA8bmctY29udGVudCBzZWxlY3Q9XCJkZWMtbGlzdC10YWJsZVwiPjwvbmctY29udGVudD5cbjwvbmctdGVtcGxhdGU+XG5cbjwhLS0gRk9PVEVSIFRFTVBMQVRFIC0tPlxuPG5nLXRlbXBsYXRlICNmb290ZXJUZW1wbGF0ZT5cbiAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZGVjLWxpc3QtZm9vdGVyXCI+PC9uZy1jb250ZW50PlxuICA8cCBjbGFzcz1cImxpc3QtZm9vdGVyXCI+XG4gICAge3sgJ2xhYmVsLmFtb3VudC1sb2FkZWQtb2YtdG90YWwnIHxcbiAgICAgIHRyYW5zbGF0ZTp7XG4gICAgICAgIGxvYWRlZDogcmVwb3J0Py5yZXN1bHQ/LnJvd3M/Lmxlbmd0aCxcbiAgICAgICAgdG90YWw6IHJlcG9ydD8ucmVzdWx0Py5jb3VudFxuICAgICAgfVxuICAgIH19XG4gIDwvcD5cbjwvbmctdGVtcGxhdGU+XG5cbjwhLS0gQ09MTEFQU0UgVEVNUExBVEUgLS0+XG48bmctdGVtcGxhdGUgI3RhYnNUZW1wbGF0ZT5cbiAgPGRpdiBmeExheW91dD1cImNvbHVtblwiIGZ4TGF5b3V0R2FwPVwiMTZweFwiPlxuICAgIDxkaXYgKm5nSWY9XCJsaXN0TW9kZSA9PSAnZ3JpZCcgdGhlbiBncmlkVGVtcGxhdGUgZWxzZSBsaXN0VGVtcGxhdGVcIj48L2Rpdj5cbiAgICA8IS0tIEZPT1RFUiBDT05URU5UIC0tPlxuICAgIDxkaXYgZnhGbGV4PlxuICAgICAgPGRpdiAqbmdJZj1cInNob3dGb290ZXIgJiYgIWxvYWRpbmcgdGhlbiBmb290ZXJUZW1wbGF0ZVwiPjwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDwhLS0gTE9BRElORyBTUElOTkVSIC0tPlxuICAgIDxkaXYgZnhGbGV4ICpuZ0lmPVwibG9hZGluZ1wiIGNsYXNzPVwidGV4dC1jZW50ZXIgbG9hZGluZy1zcGlubmVyLXdyYXBwZXJcIj5cbiAgICAgIDxkZWMtc3Bpbm5lcj48L2RlYy1zcGlubmVyPlxuICAgIDwvZGl2PlxuICAgIDwhLS0gTE9BRCBNT1JFIEJVVFRPTiAtLT5cbiAgICA8ZGl2IGZ4RmxleCAqbmdJZj1cIiFpc0xhc3RQYWdlICYmICFsb2FkaW5nICYmICFkaXNhYmxlU2hvd01vcmVCdXR0b25cIiBjbGFzcz1cInRleHQtY2VudGVyXCI+XG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBtYXQtcmFpc2VkLWJ1dHRvbiAoY2xpY2spPVwic2hvd01vcmUoKVwiPnt7J2xhYmVsLnNob3ctbW9yZScgfCB0cmFuc2xhdGV9fTwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvbmctdGVtcGxhdGU+XG5cbjwhLS0gQ09MTEFQU0UgVEVNUExBVEUgLS0+XG48bmctdGVtcGxhdGUgI2NvbGxhcHNlVGVtcGxhdGU+XG4gIDxtYXQtYWNjb3JkaW9uPlxuICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGZpbHRlciBvZiBjb2xsYXBzYWJsZUZpbHRlcnMuY2hpbGRyZW5cIj5cbiAgICAgIDxtYXQtZXhwYW5zaW9uLXBhbmVsIChvcGVuZWQpPVwic2VhcmNoQ29sbGFwc2FibGUoZmlsdGVyKVwiPlxuICAgICAgICA8bWF0LWV4cGFuc2lvbi1wYW5lbC1oZWFkZXI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbGxhcHNlLXRpdGxlXCIgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEdhcD1cIjMycHhcIiBmeExheW91dEFsaWduPVwibGVmdCBjZW50ZXJcIj5cbiAgICAgICAgICAgIDxkaXYgZnhGbGV4PVwiOTZweFwiICpuZ0lmPVwiY291bnRSZXBvcnRcIj5cbiAgICAgICAgICAgICAgPGRlYy1sYWJlbCBbY29sb3JIZXhdPVwiZmlsdGVyLmNvbG9yXCI+e3sgZ2V0Q29sbGFwc2FibGVDb3VudChmaWx0ZXIudWlkKSB9fTwvZGVjLWxhYmVsPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7eyAnbGFiZWwuJyArIGZpbHRlci5sYWJlbCB8IHRyYW5zbGF0ZSB9fVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L21hdC1leHBhbnNpb24tcGFuZWwtaGVhZGVyPlxuICAgICAgICA8ZGl2ICpuZ0lmPVwic2VsZWN0ZWRDb2xsYXBzYWJsZSA9PT0gZmlsdGVyLnVpZFwiPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgW25nVGVtcGxhdGVPdXRsZXRdPVwidGFic1RlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9tYXQtZXhwYW5zaW9uLXBhbmVsPlxuICAgIDwvbmctY29udGFpbmVyPlxuICA8L21hdC1hY2NvcmRpb24+XG4gIDxkaXYgY2xhc3M9XCJhY2NvcmRpb24tYm90dG9tLW1hcmdpblwiPjwvZGl2PlxuPC9uZy10ZW1wbGF0ZT5cblxuYCxcbiAgc3R5bGVzOiBbYC5saXN0LWZvb3Rlcntmb250LXNpemU6MTRweDt0ZXh0LWFsaWduOmNlbnRlcn0ubGlzdC1jb21wb25lbnQtd3JhcHBlcnttaW4taGVpZ2h0OjcycHh9LnRleHQtcmlnaHR7dGV4dC1hbGlnbjpyaWdodH0ubG9hZGluZy1zcGlubmVyLXdyYXBwZXJ7cGFkZGluZzozMnB4fS5jb2xsYXBzZS10aXRsZXt3aWR0aDoxMDAlfS5hY2NvcmRpb24tYm90dG9tLW1hcmdpbnttYXJnaW4tYm90dG9tOjEwMHB4fWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0xpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgLypcbiAgKiBjb3VudFJlcG9ydFxuICAqXG4gICpcbiAgKi9cbiAgY291bnRSZXBvcnQ6IENvdW50UmVwb3J0O1xuXG4gIC8qXG4gICogZmlsdGVyTW9kZVxuICAqXG4gICpcbiAgKi9cbiAgZmlsdGVyTW9kZTogJ3RhYnMnIHwgJ2NvbGxhcHNlJyA9ICd0YWJzJztcblxuXG4gIC8qXG4gICogY29sbGFwc2FibGVGaWx0ZXJzXG4gICpcbiAgKlxuICAqL1xuICBjb2xsYXBzYWJsZUZpbHRlcnM6IHsgdGFiOiBzdHJpbmcsIGNoaWxkcmVuOiBEZWNMaXN0RmlsdGVyW10gfTtcblxuICAvKlxuICAgKiBsb2FkaW5nXG4gICAqXG4gICAqXG4gICAqL1xuICBzZXQgbG9hZGluZyh2KSB7XG5cbiAgICB0aGlzLl9sb2FkaW5nID0gdjtcblxuICAgIGlmICh0aGlzLmZpbHRlcikge1xuXG4gICAgICB0aGlzLmZpbHRlci5sb2FkaW5nID0gdjtcblxuICAgIH1cblxuICB9XG5cbiAgZ2V0IGxvYWRpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xvYWRpbmc7XG4gIH1cblxuICAvKlxuICAgKiBmaWx0ZXJHcm91cHNcbiAgICpcbiAgICpcbiAgICovXG4gIGdldCBmaWx0ZXJHcm91cHMoKTogRmlsdGVyR3JvdXBzIHtcbiAgICByZXR1cm4gdGhpcy5maWx0ZXIgPyB0aGlzLmZpbHRlci5maWx0ZXJHcm91cHMgOiBbXTtcbiAgfVxuXG4gIC8qXG4gICAqIHNlbGVjdGVkQ29sbGFwc2FibGVcbiAgICpcbiAgICpcbiAgICovXG4gIHNlbGVjdGVkQ29sbGFwc2FibGU7XG5cbiAgLypcbiAgICogcmVwb3J0XG4gICAqXG4gICAqXG4gICAqL1xuICByZXBvcnQ7XG5cbiAgLypcbiAgICogaXNMYXN0UGFnZVxuICAgKlxuICAgKlxuICAgKi9cbiAgaXNMYXN0UGFnZTogYm9vbGVhbjtcblxuICAvKlxuICAqIHNlbGVjdGVkVGFiXG4gICpcbiAgKlxuICAqL1xuICBzZWxlY3RlZFRhYjogYW55O1xuXG4gIC8qXG4gICogcHJldmlvdXNTZWxlY3RlZFRhYlxuICAqXG4gICpcbiAgKi9cbiAgcHJldmlvdXNTZWxlY3RlZFRhYjogYW55O1xuXG4gIC8qXG4gICAqIGZpbHRlckRhdGFcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgZmlsdGVyRGF0YTogU3ViamVjdDxGaWx0ZXJEYXRhPiA9IG5ldyBTdWJqZWN0PEZpbHRlckRhdGE+KCk7XG5cbiAgLypcbiAgICogX2xvYWRpbmc7XG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIF9sb2FkaW5nID0gdHJ1ZTtcblxuICAvKlxuICAgKiBjbGVhckFuZFJlbG9hZFJlcG9ydFxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBjbGVhckFuZFJlbG9hZFJlcG9ydDtcblxuICAvKlxuICAgKiBmaWx0ZXJTdWJzY3JpcHRpb25cbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgZmlsdGVyU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgLypcbiAgICogcmVhY3RpdmVSZXBvcnRcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgcmVhY3RpdmVSZXBvcnQ6IE9ic2VydmFibGU8YW55PjtcblxuICAvKlxuICAgKiByZWFjdGl2ZVJlcG9ydFN1YnNjcmlwdGlvblxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSByZWFjdGl2ZVJlcG9ydFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qXG4gICAqIHNjcm9sbGFibGVDb250YWluZXJcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc2Nyb2xsYWJsZUNvbnRhaW5lcjogRWxlbWVudDtcblxuICAvKlxuICAgKiBzY3JvbGxFdmVudEVtaXRlclxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzY3JvbGxFdmVudEVtaXRlciA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIC8qXG4gICAqIHNjcm9sbEV2ZW50RW1pdGVyU3Vic2NyaXB0aW9uXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHNjcm9sbEV2ZW50RW1pdGVyU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgLypcbiAgICogdGFic0NoYW5nZVN1YnNjcmlwdGlvblxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB0YWJzQ2hhbmdlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgLypcbiAgICogdGFibGVTb3J0U3Vic2NyaXB0aW9uXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHRhYmxlU29ydFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qXG4gICAqIHBheWxvYWRcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgcGF5bG9hZDogRGVjRmlsdGVyO1xuXG4gIC8qXG4gICAqIF9lbmRwb2ludCBpbnRlcm5hbGxcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgX2VuZHBvaW50OiBzdHJpbmc7XG5cbiAgLypcbiAgICogX2ZpbHRlclxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBfZmlsdGVyOiBEZWNMaXN0RmlsdGVyQ29tcG9uZW50O1xuXG4gIC8qXG4gICAqIF9uYW1lXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIF9uYW1lOiBzdHJpbmc7XG5cbiAgLypcbiAgICogY3VzdG9tRmV0Y2hNZXRob2RcbiAgICpcbiAgICogbWV0aG9kIHVzZWQgdG8gZmV0Y2ggZGF0YSBmcm9tIGJhY2stZW5kXG4gICAqL1xuICBASW5wdXQoKSBjdXN0b21GZXRjaE1ldGhvZDogRGVjTGlzdEZldGNoTWV0aG9kO1xuXG4gIC8qXG4gICAqIGNvbHVtbnNTb3J0Q29uZmlnXG4gICAqXG4gICAqIHVzZWQgdG8gZ2V0IGEgc29ydGVkIGxpc3QgZnJvbSBiYWNrZW5kXG4gICAqIGNhbiBiZSBwYXNlZCB2aWEgYXR0cmlidXRlIHRvIHNvcnQgdGhlIGZpcnN0IGxvYWRcbiAgICovXG4gIEBJbnB1dCgpIGNvbHVtbnNTb3J0Q29uZmlnO1xuXG4gIC8qXG4gICAqIGRpc2FibGVTaG93TW9yZUJ1dHRvblxuICAgKlxuICAgKiB1c2VkIHRvIGhpZGUgdGhlIHNob3cgbW9yZSBidXR0b25cbiAgICovXG4gIEBJbnB1dCgpIGRpc2FibGVTaG93TW9yZUJ1dHRvbjogYm9vbGVhbjtcblxuICAvKlxuICAgKiBlbmRwb2ludFxuICAgKlxuICAgKlxuICAgKi9cbiAgQElucHV0KClcbiAgc2V0IGVuZHBvaW50KHY6IHN0cmluZykge1xuICAgIGlmICh0aGlzLl9lbmRwb2ludCAhPT0gdikge1xuICAgICAgdGhpcy5fZW5kcG9pbnQgPSAodlswXSAmJiB2WzBdID09PSAnLycpID8gdi5yZXBsYWNlKCcvJywgJycpIDogdjtcbiAgICB9XG4gIH1cblxuICBnZXQgZW5kcG9pbnQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fZW5kcG9pbnQ7XG4gIH1cblxuICAvKlxuICAgKiBuYW1lXG4gICAqXG4gICAqXG4gICAqL1xuICBASW5wdXQoKVxuICBzZXQgbmFtZSh2OiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5fbmFtZSAhPT0gdikge1xuICAgICAgdGhpcy5fbmFtZSA9IHY7XG4gICAgICB0aGlzLnNldEZpbHRlcnNDb21wb25lbnRzQmFzZVBhdGhBbmROYW1lcygpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBuYW1lKCkge1xuICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICB9XG5cbiAgLypcbiAgICogcm93c1xuICAgKlxuICAgKlxuICAgKi9cbiAgQElucHV0KCdyb3dzJylcblxuICBzZXQgcm93cyhyb3dzKSB7XG4gICAgdGhpcy5zZXRSb3dzKHJvd3MpO1xuICB9XG5cbiAgZ2V0IHJvd3MoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVwb3J0ID8gdGhpcy5yZXBvcnQucmVzdWx0LnJvd3MgOiB1bmRlZmluZWQ7XG4gIH1cblxuICAvKlxuICAgKiBsaW1pdFxuICAgKlxuICAgKlxuICAgKi9cbiAgQElucHV0KCkgbGltaXQgPSAxMDtcblxuICAvKlxuICAgKiBsaXN0TW9kZVxuICAgKlxuICAgKlxuICAgKi9cbiAgQElucHV0KCkgbGlzdE1vZGU7XG5cbiAgLypcbiAgICogc2Nyb2xsYWJsZUNvbnRhaW5lckNsYXNzXG4gICAqXG4gICAqIFdoZXJlIHRoZSBzY3JvbGwgd2F0Y2hlciBzaG91bGQgYmUgbGlzdGVuaW5nXG4gICAqL1xuICBASW5wdXQoKSBzY3JvbGxhYmxlQ29udGFpbmVyQ2xhc3MgPSAnbWF0LXNpZGVuYXYtY29udGVudCc7XG5cbiAgLypcbiAgICogc2VhcmNoYWJsZVByb3BlcnRpZXNcbiAgICpcbiAgICogUHJvcGVydGllcyB0byBiZSBzZWFyY2hlZCB3aGVuIHVzaW5nIGJhc2ljIHNlYXJjaFxuICAgKi9cbiAgQElucHV0KCkgc2VhcmNoYWJsZVByb3BlcnRpZXM6IHN0cmluZ1tdO1xuXG4gIC8qXG4gICAqIHNob3dGb290ZXJcbiAgICpcbiAgICpcbiAgICovXG4gIEBJbnB1dCgpIHNob3dGb290ZXIgPSB0cnVlO1xuXG4gIC8qXG4gICAqIHBvc3RTZWFyY2hcbiAgICpcbiAgICogVGhpcyBtaWRkbGV3YXJlIGlzIHVzZWQgdG8gdHJpZ2dlciBldmVudHMgYWZ0ZXIgZXZlcnkgc2VhcmNoXG4gICAqL1xuICBAT3V0cHV0KCkgcG9zdFNlYXJjaCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIC8qXG4gICAqIHJvd0NsaWNrXG4gICAqXG4gICAqIEVtaXRzIGFuIGV2ZW50IHdoZW4gYSByb3cgb3IgY2FyZCBpcyBjbGlja2VkXG4gICAqL1xuICBAT3V0cHV0KCkgcm93Q2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgLypcbiAgICogZ3JpZFxuICAgKlxuICAgKlxuICAgKi9cbiAgQENvbnRlbnRDaGlsZChEZWNMaXN0R3JpZENvbXBvbmVudCkgZ3JpZDogRGVjTGlzdEdyaWRDb21wb25lbnQ7XG5cbiAgLypcbiAgICogdGFibGVcbiAgICpcbiAgICpcbiAgICovXG4gIEBDb250ZW50Q2hpbGQoRGVjTGlzdFRhYmxlQ29tcG9uZW50KSB0YWJsZTogRGVjTGlzdFRhYmxlQ29tcG9uZW50O1xuXG4gIC8qXG4gICAqIGZpbHRlclxuICAgKlxuICAgKlxuICAgKi9cbiAgQENvbnRlbnRDaGlsZChEZWNMaXN0RmlsdGVyQ29tcG9uZW50KVxuICBzZXQgZmlsdGVyKHY6IERlY0xpc3RGaWx0ZXJDb21wb25lbnQpIHtcbiAgICBpZiAodGhpcy5fZmlsdGVyICE9PSB2KSB7XG4gICAgICB0aGlzLl9maWx0ZXIgPSB2O1xuICAgICAgdGhpcy5zZXRGaWx0ZXJzQ29tcG9uZW50c0Jhc2VQYXRoQW5kTmFtZXMoKTtcbiAgICB9XG4gIH1cblxuICBnZXQgZmlsdGVyKCkge1xuICAgIHJldHVybiB0aGlzLl9maWx0ZXI7XG4gIH1cblxuICAvKlxuICAgKiBuZ09uSW5pdFxuICAgKlxuICAgKlxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBzZXJ2aWNlOiBEZWNBcGlTZXJ2aWNlXG4gICkgeyB9XG5cbiAgLypcbiAgICogbmdPbkluaXRcbiAgICpcbiAgICogU3RhcnRzIGEgZnJlc2ggY29tcG9uZW50IGFuZCBwcmVwYXJlIGl0IHRvIHJ1blxuICAgKlxuICAgKiAtIFN0YXJ0IHRoZSBSZWFjdGl2ZSBSZXBvcnRcbiAgICogLSBTdWJzY3JpYmUgdG8gdGhlIFJlYWN0aXZlIFJlcG9ydFxuICAgKiAtIFN0YXJ0IHdhdGNoaW5nIHdpbmRvdyBTY3JvbGxcbiAgICogLSBFbnN1cmUgdW5pcXVlIG5hbWVcbiAgICovXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMud2F0Y2hGaWx0ZXJEYXRhKCk7XG4gICAgdGhpcy5lbnN1cmVVbmlxdWVOYW1lKCk7XG4gICAgdGhpcy5kZXRlY3RMaXN0TW9kZUJhc2VkT25HcmlkQW5kVGFibGVQcmVzZW5jZSgpO1xuICB9XG5cbiAgLypcbiAgKiBuZ0FmdGVyVmlld0luaXRcbiAgKlxuICAqIFdhaXQgZm9yIHRoZSBzdWJjb21wb25lbnRzIHRvIHN0YXJ0IGJlZm9yZSBydW4gdGhlIGNvbXBvbmVudFxuICAqXG4gICogLSBTdGFydCB3YXRjaGluZyBGaWx0ZXJcbiAgKiAtIERvIHRoZSBmaXJzdCBsb2FkXG4gICovXG4gbmdBZnRlclZpZXdJbml0KCkge1xuICAgdGhpcy53YXRjaEZpbHRlcigpO1xuICAgdGhpcy5kb0ZpcnN0TG9hZCgpO1xuICAgdGhpcy5kZXRlY3RMaXN0TW9kZSgpO1xuICAgdGhpcy53YXRjaFRhYnNDaGFuZ2UoKTtcbiAgIHRoaXMud2F0Y2hUYWJsZVNvcnQoKTtcbiAgIHRoaXMucmVnaXN0ZXJDaGlsZFdhdGNoZXJzKCk7XG4gICB0aGlzLndhdGNoU2Nyb2xsKCk7XG4gICB0aGlzLndhdGNoU2Nyb2xsRXZlbnRFbWl0dGVyKCk7XG4gIH1cblxuICAvKlxuICAgKiBuZ09uRGVzdHJveVxuICAgKlxuICAgKiBEZXN0cm95IHdhdGNoZXIgdG8gZnJlZSBtZWVtb3J5IGFuZCByZW1vdmUgdW5uZWNlc3NhcnkgdHJpZ2dlcnNcbiAgICpcbiAgICogLSBVbnN1YnNjcmliZSBmcm9tIHRoZSBSZWFjdGl2ZSBSZXBvcnRcbiAgICogLSBTdG9wIHdhdGNoaW5nIHdpbmRvdyBTY3JvbGxcbiAgICogLSBTdG9wIHdhdGNoaW5nIEZpbHRlclxuICAgKi9cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy51bnN1YnNjcmliZVRvUmVhY3RpdmVSZXBvcnQoKTtcbiAgICB0aGlzLnN0b3BXYXRjaGluZ1Njcm9sbCgpO1xuICAgIHRoaXMuc3RvcFdhdGNoaW5nRmlsdGVyKCk7XG4gICAgdGhpcy5zdG9wV2F0Y2hpbmdUYWJzQ2hhbmdlKCk7XG4gICAgdGhpcy5zdG9wV2F0Y2hpbmdUYWJsZVNvcnQoKTtcbiAgICB0aGlzLnN0b3BXYXRjaGluZ1Njcm9sbEV2ZW50RW1pdHRlcigpO1xuICB9XG5cbiAgLypcbiAgICogcmVsb2FkQ291bnRSZXBvcnRcbiAgICpcbiAgICovXG4gIHJlbG9hZENvdW50UmVwb3J0KCkge1xuXG4gICAgaWYgKHRoaXMuZmlsdGVyICYmIHRoaXMuZmlsdGVyLmZpbHRlcnMgJiYgdGhpcy5maWx0ZXIubG9hZENvdW50UmVwb3J0KSB7XG5cbiAgICAgIGNvbnN0IGVuZHBvaW50ID0gdGhpcy5lbmRwb2ludFt0aGlzLmVuZHBvaW50Lmxlbmd0aCAtIDFdID09PSAnLycgPyBgJHt0aGlzLmVuZHBvaW50fWNvdW50YCA6IGAke3RoaXMuZW5kcG9pbnR9L2NvdW50YDtcblxuICAgICAgY29uc3QgZmlsdGVycyA9IHRoaXMuZmlsdGVyLmZpbHRlcnM7XG5cbiAgICAgIGNvbnN0IHBheWxvYWRXaXRoU2VhcmNoYWJsZVByb3BlcnRpZXMgPSB0aGlzLmdldENvdW50YWJsZUZpbHRlcnMoZmlsdGVycyk7XG5cbiAgICAgIHRoaXMuc2VydmljZS5wb3N0KGVuZHBvaW50LCBwYXlsb2FkV2l0aFNlYXJjaGFibGVQcm9wZXJ0aWVzKVxuICAgICAgLnN1YnNjcmliZShyZXMgPT4ge1xuXG4gICAgICAgIHRoaXMuY291bnRSZXBvcnQgPSB0aGlzLm1vdW50Q291bnRSZXBvcnQocmVzKTtcblxuICAgICAgICB0aGlzLmZpbHRlci5jb3VudFJlcG9ydCA9IHRoaXMuY291bnRSZXBvcnQ7XG5cbiAgICAgIH0pO1xuXG4gICAgfVxuXG4gIH1cblxuICAvKlxuICAgKiByZW1vdmVJdGVtXG4gICAqXG4gICAqIFJlbW92ZXMgYW4gaXRlbSBmcm9tIHRoZSBsaXN0XG4gICAqL1xuICByZW1vdmVJdGVtKGlkKSB7XG5cbiAgICBjb25zdCBpdGVtID0gdGhpcy5yb3dzLmZpbmQoX2l0ZW0gPT4gX2l0ZW0uaWQgPT09IGlkKTtcblxuICAgIGlmIChpdGVtKSB7XG5cbiAgICAgIGNvbnN0IGl0ZW1JbmRleCA9IHRoaXMucm93cy5pbmRleE9mKGl0ZW0pO1xuXG4gICAgICBpZiAoaXRlbUluZGV4ID49IDApIHtcblxuICAgICAgICB0aGlzLnJvd3Muc3BsaWNlKGl0ZW1JbmRleCwgMSk7XG5cbiAgICAgIH1cblxuICAgIH1cblxuICAgIGlmICh0aGlzLmVuZHBvaW50KSB7XG5cbiAgICAgIHRoaXMucmVsb2FkQ291bnRSZXBvcnQoKTtcblxuICAgIH1cblxuICB9XG5cbiAgLypcbiAgICogcmVzdGFydFxuICAgKlxuICAgKiBDbGVhciB0aGUgbGlzdCBhbmQgcmVsb2FkIHRoZSBmaXJzdCBwYWdlXG4gICAqL1xuICByZXN0YXJ0KCkge1xuXG4gICAgdGhpcy5sb2FkUmVwb3J0KHRydWUpO1xuXG4gIH1cblxuICAvKlxuICAgKiBzaG93TW9yZVxuICAgKlxuICAgKi9cbiAgc2hvd01vcmUoKSB7XG5cbiAgICByZXR1cm4gdGhpcy5sb2FkUmVwb3J0KCk7XG5cbiAgfVxuXG4gIC8qXG4gICAqIHNlYXJjaENvbGxhcHNhYmxlXG4gICAqXG4gICAqIHNlYXJjaCBieSBjb2xsYXBzYWJsZSBmaWx0ZXJcbiAgICovXG4gIHNlYXJjaENvbGxhcHNhYmxlKGZpbHRlcjogRGVjTGlzdEZpbHRlcikge1xuXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRDb2xsYXBzYWJsZSAhPT0gZmlsdGVyLnVpZCkge1xuXG4gICAgICB0aGlzLmxvYWRCeU9wZW5uZWRDb2xsYXBzZShmaWx0ZXIudWlkKTtcblxuICAgIH1cblxuICB9XG5cbiAgLypcbiAgICogdGFibGVBbmRHcmlkQXJlU2V0XG4gICAqXG4gICAqIFJldHVybiB0cnVlIGlmIHRoZXJlIGFyZSBib3RoIEdSSUQgYW5kIFRBQkxFIGRlZmluaXRpb24gaW5zaWRlIHRoZSBsaXN0XG4gICAqL1xuICB0YWJsZUFuZEdyaWRBcmVTZXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ3JpZCAmJiB0aGlzLnRhYmxlO1xuICB9XG5cbiAgLypcbiAgICogdG9nZ2xlTGlzdE1vZGVcbiAgICpcbiAgICogQ2hhbmdlcyBiZXR3ZWVuIEdSSUQgYW5kIFRBQkxFIHZpc3VhbGl6YXRvaW4gbW9kZXNcbiAgICovXG4gIHRvZ2dsZUxpc3RNb2RlKCkge1xuXG4gICAgdGhpcy5saXN0TW9kZSA9IHRoaXMubGlzdE1vZGUgPT09ICdncmlkJyA/ICd0YWJsZScgOiAnZ3JpZCc7XG5cbiAgICBpZiAodGhpcy5saXN0TW9kZSA9PT0gJ3RhYmxlJykge1xuXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcblxuICAgICAgICB0aGlzLnRhYmxlLnRhYmxlQ29tcG9uZW50LnJlY2FsY3VsYXRlKCk7XG5cbiAgICAgIH0sIDEpO1xuXG4gICAgfVxuXG4gIH1cblxuICAvKlxuICAgKiBnZXRDb2xsYXBzYWJsZUNvdW50XG4gICAqXG4gICAqIGdldCBDb2xsYXBzYWJsZSBDb3VudCBmcm9tIGNvdW50UmVwb3J0XG4gICAqL1xuICBnZXRDb2xsYXBzYWJsZUNvdW50KHVpZCkge1xuXG4gICAgdHJ5IHtcblxuICAgICAgcmV0dXJuIHRoaXMuY291bnRSZXBvcnRbdGhpcy5zZWxlY3RlZFRhYl0uY2hpbGRyZW5bdWlkXS5jb3VudDtcblxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG5cbiAgICAgIHJldHVybiAnPyc7XG5cbiAgICB9XG5cblxuICB9XG5cbiAgLypcbiAgIGdldExpc3RNb2RlXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIGdldExpc3RNb2RlID0gKCkgPT4ge1xuXG4gICAgbGV0IGxpc3RNb2RlID0gdGhpcy5saXN0TW9kZTtcblxuICAgIGlmICh0aGlzLmZpbHRlciAmJiB0aGlzLmZpbHRlci50YWJzRmlsdGVyQ29tcG9uZW50KSB7XG5cbiAgICAgIGlmICh0aGlzLnNlbGVjdGVkVGFiICYmIHRoaXMuc2VsZWN0ZWRUYWIubGlzdE1vZGUpIHtcblxuICAgICAgICBsaXN0TW9kZSA9IHRoaXMuc2VsZWN0ZWRUYWIubGlzdE1vZGU7XG5cbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgbGlzdE1vZGUgPSB0aGlzLnRhYmxlID8gJ3RhYmxlJyA6ICdncmlkJztcblxuICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmV0dXJuIGxpc3RNb2RlO1xuXG4gIH1cblxuICAvKlxuICAgbW91bnRDb3VudFJlcG9ydFxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBtb3VudENvdW50UmVwb3J0KGZpbHRlcnNDb3VudGVycyk6IENvdW50UmVwb3J0IHtcblxuICAgIGNvbnN0IGNvdW50UmVwb3J0OiBDb3VudFJlcG9ydCA9IHtcbiAgICAgIGNvdW50OiAwXG4gICAgfTtcblxuICAgIGZpbHRlcnNDb3VudGVycy5mb3JFYWNoKGl0ZW0gPT4ge1xuXG4gICAgICBjb3VudFJlcG9ydFtpdGVtLnVpZF0gPSB7XG5cbiAgICAgICAgY291bnQ6IGl0ZW0uY291bnRcblxuICAgICAgfTtcblxuICAgICAgaWYgKGl0ZW0uY2hpbGRyZW4pIHtcblxuICAgICAgICBjb3VudFJlcG9ydFtpdGVtLnVpZF0uY2hpbGRyZW4gPSB0aGlzLm1vdW50Q291bnRSZXBvcnQoaXRlbS5jaGlsZHJlbik7XG5cbiAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGNvdW50UmVwb3J0O1xuXG4gIH1cblxuICAvKlxuICAgKiBnZXRDb3VudGFibGVGaWx0ZXJzXG4gICAqXG4gICAqIEdldCB0aGUgc2VhcmNoIGZpbHRlciwgdHJuc2Zvcm1lIHRoZSBzZWFyY2ggcGFyYW1zIGludG8gdGhlIHNlYXJjaGFibGUgcHJvcGVydGllcyBhbmQgaW5qZWN0IGl0IGluIGV2ZXJ5IGZpbHRlciBjb25maWd1cmVkIGluIGRlYy1maWx0ZXJzXG4gICAqXG4gICAqIFRoZSByZXN1bHQgaXMgdXNlZCB0byBjYWxsIHRoZSBjb3VudCBlbmRwb2ludCBhbmQgcmV0dXJuIHRoZSBhbW91bnQgb2YgcmVjY29yZHMgZm91bmQgaW4gZXZlcnkgdGFiL2NvbGxhcHNlXG4gICAqXG4gICAqL1xuICBwcml2YXRlIGdldENvdW50YWJsZUZpbHRlcnMoZmlsdGVycykge1xuXG4gICAgY29uc3QgZmlsdGVyR3JvdXBzV2l0aG91dFRhYnMgPSB0aGlzLmZpbHRlci5maWx0ZXJHcm91cHNXaXRob3V0VGFicyB8fCBbe2ZpbHRlcnM6IFtdfV07XG5cbiAgICBjb25zdCBmaWx0ZXJzUGx1c1NlYXJjaCA9IGZpbHRlcnMubWFwKGRlY0ZpbHRlciA9PiB7XG5cbiAgICAgIGNvbnN0IGRlY0ZpbHRlckZpbHRlcnNQbHVzU2VhcmNoID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShkZWNGaWx0ZXIpKTtcblxuICAgICAgaWYgKGRlY0ZpbHRlckZpbHRlcnNQbHVzU2VhcmNoLmZpbHRlcnMpIHtcblxuICAgICAgICBjb25zdCB0YWJGaWx0ZXJzQ29weSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZGVjRmlsdGVyRmlsdGVyc1BsdXNTZWFyY2guZmlsdGVycykpO1xuXG4gICAgICAgIGRlY0ZpbHRlckZpbHRlcnNQbHVzU2VhcmNoLmZpbHRlcnMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzKSk7XG5cbiAgICAgICAgZGVjRmlsdGVyRmlsdGVyc1BsdXNTZWFyY2guZmlsdGVycy5mb3JFYWNoKGZpbHRlckdyb3VwID0+IHtcblxuICAgICAgICAgIGZpbHRlckdyb3VwLmZpbHRlcnMucHVzaCguLi50YWJGaWx0ZXJzQ29weSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgIH0gZWxzZSBpZiAoZGVjRmlsdGVyRmlsdGVyc1BsdXNTZWFyY2guY2hpbGRyZW4pIHtcblxuICAgICAgICBkZWNGaWx0ZXJGaWx0ZXJzUGx1c1NlYXJjaC5jaGlsZHJlbiA9IHRoaXMuZ2V0Q291bnRhYmxlRmlsdGVycyhkZWNGaWx0ZXJGaWx0ZXJzUGx1c1NlYXJjaC5jaGlsZHJlbik7XG5cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdWlkOiBkZWNGaWx0ZXJGaWx0ZXJzUGx1c1NlYXJjaC51aWQsXG4gICAgICAgIGZpbHRlcnM6IGRlY0ZpbHRlckZpbHRlcnNQbHVzU2VhcmNoLmZpbHRlcnMsXG4gICAgICAgIGNoaWxkcmVuOiBkZWNGaWx0ZXJGaWx0ZXJzUGx1c1NlYXJjaC5jaGlsZHJlbixcbiAgICAgIH07XG5cbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmVuc3VyZUZpbHRlclZhbHVlc0FzQXJyYXkoZmlsdGVyc1BsdXNTZWFyY2gpO1xuXG4gIH1cblxuICAvKlxuICAgKiBlbnN1cmVGaWx0ZXJWYWx1ZXNBc0FycmF5XG4gICAqXG4gICAqIEdldCBhbiBhcnJheSBvZiBmaWx0ZXJncm91cHMgYW5kIHNldCB0aGUgZmlsdGVyIHZhbHVlcyB0byBhcnJheSBpZiBub3RcbiAgICpcbiAgICovXG4gIHByaXZhdGUgZW5zdXJlRmlsdGVyVmFsdWVzQXNBcnJheShmaWx0ZXJHcm91cHM6IGFueSA9IFtdKSB7XG5cbiAgICByZXR1cm4gZmlsdGVyR3JvdXBzLm1hcChkZWNMaXN0RmlsdGVyID0+IHtcblxuICAgICAgaWYgKGRlY0xpc3RGaWx0ZXIuZmlsdGVycykge1xuXG4gICAgICAgIHRoaXMuYXBwZW5kRmlsdGVyR3JvdXBzQmFzZWRPblNlYXJjaGFibGVQcm9wZXJ0aWVzKGRlY0xpc3RGaWx0ZXIuZmlsdGVycyk7XG5cbiAgICAgICAgZGVjTGlzdEZpbHRlci5maWx0ZXJzID0gZGVjTGlzdEZpbHRlci5maWx0ZXJzLm1hcChmaWx0ZXJHcm91cCA9PiB7XG5cblxuICAgICAgICAgIGZpbHRlckdyb3VwLmZpbHRlcnMgPSBmaWx0ZXJHcm91cC5maWx0ZXJzLm1hcChmaWx0ZXIgPT4ge1xuXG4gICAgICAgICAgICBmaWx0ZXIudmFsdWUgPSBBcnJheS5pc0FycmF5KGZpbHRlci52YWx1ZSkgPyBmaWx0ZXIudmFsdWUgOiBbZmlsdGVyLnZhbHVlXTtcblxuICAgICAgICAgICAgcmV0dXJuIGZpbHRlcjtcblxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcmV0dXJuIGZpbHRlckdyb3VwO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkZWNMaXN0RmlsdGVyO1xuXG4gICAgfSk7XG5cbiAgfVxuXG4gIC8qXG4gICAqIGFjdEJ5U2Nyb2xsUG9zaXRpb25cbiAgICpcbiAgICogVGhpcyBtZXRob2QgZGV0ZWN0IGlmIHRoZXJlIGlzIHNjcm9vbGluZyBhY3Rpb24gb24gd2luZG93IHRvIGZldGNoIGFuZCBzaG93IG1vcmUgcm93cyB3aGVuIHRoZSBzY3JvbGxpbmcgZG93bi5cbiAgICovXG4gIHByaXZhdGUgYWN0QnlTY3JvbGxQb3NpdGlvbiA9ICgkZXZlbnQpID0+IHtcblxuICAgIGlmICgkZXZlbnRbJ3BhdGgnXSkge1xuXG4gICAgICBjb25zdCBlbGVtZW50V2l0aENka092ZXJsYXlDbGFzcyA9ICRldmVudFsncGF0aCddLmZpbmQocGF0aCA9PiB7XG5cbiAgICAgICAgY29uc3QgY2xhc3NOYW1lID0gcGF0aFsnY2xhc3NOYW1lJ10gfHwgJyc7XG5cbiAgICAgICAgY29uc3QgaW5zaWRlT3ZlcmxheSA9IGNsYXNzTmFtZS5pbmRleE9mKCdjZGstb3ZlcmxheScpID49IDA7XG5cbiAgICAgICAgY29uc3QgaW5zaWRlRnVsbHNjcmVhbkRpYWxvZ0NvbnRhaW5lciA9IGNsYXNzTmFtZS5pbmRleE9mKCdmdWxsc2NyZWFuLWRpYWxvZy1jb250YWluZXInKSA+PSAwO1xuXG4gICAgICAgIHJldHVybiBpbnNpZGVPdmVybGF5IHx8IGluc2lkZUZ1bGxzY3JlYW5EaWFsb2dDb250YWluZXI7XG5cbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIWVsZW1lbnRXaXRoQ2RrT3ZlcmxheUNsYXNzKSB7IC8vIGF2b2lkIGNsb3NpbmcgZmlsdGVyIGZyb20gYW55IG9wZW4gZGlhbG9nXG5cbiAgICAgICAgaWYgKCF0aGlzLmlzTGFzdFBhZ2UpIHtcblxuICAgICAgICAgIGNvbnN0IHRhcmdldDogYW55ID0gJGV2ZW50Wyd0YXJnZXQnXTtcblxuICAgICAgICAgIGNvbnN0IGxpbWl0ID0gdGFyZ2V0LnNjcm9sbEhlaWdodCAtIHRhcmdldC5jbGllbnRIZWlnaHQ7XG5cbiAgICAgICAgICBpZiAodGFyZ2V0LnNjcm9sbFRvcCA+PSAobGltaXQgLSAxNikpIHtcblxuICAgICAgICAgICAgdGhpcy5zaG93TW9yZSgpO1xuXG4gICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgIH1cblxuICB9XG5cbiAgLypcbiAgICogZGV0ZWN0TGlzdE1vZGVcbiAgICpcbiAgIGdldExpc3RNb2RlIGlucHV0XG4gICAqL1xuICBwcml2YXRlIGRldGVjdExpc3RNb2RlKCkge1xuXG4gICAgdGhpcy5nZXRMaXN0TW9kZSgpO1xuXG4gIH1cblxuICAvKlxuICAgKiBkZXRlY3RMaXN0TW9kZUJhc2VkT25HcmlkQW5kVGFibGVQcmVzZW5jZSgpXG4gICAqXG4gICAqIFNldCB0aGUgbGlzdCBtb2RlIGJhc2VkIG9uIGRlY2xhcmF0aW9uIG9mIHRhYmxlIGFuZCBncmlkLiBUaGlzIGlzIG5lY2Vzc2FyeSB0byBib290YXN0cmFwIHRoZSBjb21wb25lbnQgd2l0aCBvbmx5IGdyaWQgb3Igb25seSB0YWJsZVxuICAgKiBUaGlzIG9ubHkgd29yayBpZiBubyBtb2RlIGlzIHByb3ZpZGVkIGJ5IEBJbnB1dCBvdGhlcndpc2UgdGhlIEBJbnB1dCB2YWx1ZSB3aWxsIGJlIHVzZWRcbiAgICovXG4gIHByaXZhdGUgZGV0ZWN0TGlzdE1vZGVCYXNlZE9uR3JpZEFuZFRhYmxlUHJlc2VuY2UoKSB7XG5cbiAgICB0aGlzLmxpc3RNb2RlID0gdGhpcy5saXN0TW9kZSA/IHRoaXMubGlzdE1vZGUgOiB0aGlzLnRhYmxlID8gJ3RhYmxlJyA6ICdncmlkJztcblxuICB9XG5cbiAgLypcbiAgICogZW1pdFNjcm9sbEV2ZW50XG4gICAqXG4gICAqIEVtaXRzIHNjcm9sbCBldmVudCB3aGVuIG5vdCBsb2FkaW5nXG4gICAqL1xuICBwcml2YXRlIGVtaXRTY3JvbGxFdmVudCA9ICgkZXZlbnQpID0+IHtcblxuICAgIGlmICghdGhpcy5sb2FkaW5nKSB7XG5cbiAgICAgIHRoaXMuc2Nyb2xsRXZlbnRFbWl0ZXIuZW1pdCgkZXZlbnQpO1xuXG4gICAgfVxuXG4gIH1cblxuICAvKlxuICAgKiBpc1RhYnNGaWx0ZXJEZWZpbmVkXG4gICAqXG4gICAqIFJldHVybiB0cnVlIGlmIHRoZSBUYWJzIEZpbHRlciBpcyBkZWZpbmVkIGluc2lkZSB0aGUgbGlzdFxuICAgKi9cbiAgcHJpdmF0ZSBpc1RhYnNGaWx0ZXJEZWZpbmVkKCkge1xuICAgIHJldHVybiB0aGlzLmZpbHRlciAmJiB0aGlzLmZpbHRlci50YWJzRmlsdGVyQ29tcG9uZW50O1xuICB9XG5cbiAgLypcbiAgICogZG9GaXJzdExvYWRcbiAgICpcbiAgICogVGhpcyBtZXRob2QgaXMgY2FsbGVkIGFmdGVyIHRoZSB2aWV3IGFuZCBpbnB1dHMgYXJlIGluaXRpYWxpemVkXG4gICAqXG4gICAqIFRoaXMgaXMgdGhlIGZpcnN0IGNhbGwgdG8gZ2V0IGRhdGFcbiAgICovXG4gIHByaXZhdGUgZG9GaXJzdExvYWQoKSB7XG4gICAgaWYgKHRoaXMuaXNUYWJzRmlsdGVyRGVmaW5lZCgpKSB7XG4gICAgICB0aGlzLmRvRmlyc3RMb2FkQnlUYWJzRmlsdGVyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZG9GaXJzdExvYWRMb2NhbGx5KHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIGRvRmlyc3RMb2FkQnlUYWJzRmlsdGVyXG4gICAqXG4gICAqIHVzZSB0aGUgdGFicyBmaWx0ZXIgdG8gdHJpZ2dlciB0aGUgZmlyc3QgbG9hZFxuICAgKlxuICAgKiBUaGlzIHdheSB0aGUgZGVmYXVsdCB0YWIgYW5kIGZpbHRlciBhcmUgc2VsZWN0ZWQgYnkgdGhlIGRlY3RhYnNGaWx0ZXIgY29tcG9uZW50XG4gICAqXG4gICAqL1xuICBwcml2YXRlIGRvRmlyc3RMb2FkQnlUYWJzRmlsdGVyKCkge1xuICAgIHRoaXMuZmlsdGVyLnRhYnNGaWx0ZXJDb21wb25lbnQuZG9GaXJzdExvYWQoKTtcbiAgfVxuXG4gIC8qXG4gICAqIGRvRmlyc3RMb2FkTG9jYWxseVxuICAgKlxuICAgKiBJZiBubyBmaWx0ZXIgYXJlIGRlZmluZWQsIGp1c3QgY2FsbCB0aCBlZW5kcG9pbnQgd2l0aG91dCBmaWx0ZXJzXG4gICAqL1xuICBwcml2YXRlIGRvRmlyc3RMb2FkTG9jYWxseShyZWZyZXNoKSB7XG4gICAgdGhpcy5sb2FkUmVwb3J0KHJlZnJlc2gpO1xuICB9XG5cbiAgLypcbiAgICogZW5zdXJlVW5pcXVlTmFtZVxuICAgKlxuICAgKiBXZSBtdXN0IHByb3ZpZGUgYW4gdW5pcXVlIG5hbWUgdG8gdGhlIGxpc3Qgc28gd2UgY2FuIHBlcnNpc3QgaXRzIHN0YXRlIGluIHRoZSBVUkwgd2l0aG91dCBjb25mbGljdHNcbiAgICpcbiAgICovXG4gIHByaXZhdGUgZW5zdXJlVW5pcXVlTmFtZSgpIHtcbiAgICBpZiAoIXRoaXMubmFtZSkge1xuICAgICAgY29uc3QgZXJyb3IgPSAnTGlzdENvbXBvbmVudEVycm9yOiBUaGUgbGlzdCBjb21wb25lbnQgbXVzdCBoYXZlIGFuIHVuaXF1ZSBuYW1lIHRvIGJlIHVzZWQgaW4gdXJsIGZpbHRlci4nXG4gICAgICArICcgUGxlYXNlLCBlbnN1cmUgdGhhdCB5b3UgaGF2ZSBwYXNzZWQgYW4gdW5pcXVlIG5hbW1lIHRvIHRoZSBjb21wb25lbnQuJztcbiAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogbG9hZEJ5T3Blbm5lZENvbGxhcHNlXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGlzIHRyaWdnZXJlZCB3aGVuIGEgY29sbGFwc2FibGUgdGFibGUgaXMgb3Blbi5cbiAgICpcbiAgICovXG4gIHByaXZhdGUgbG9hZEJ5T3Blbm5lZENvbGxhcHNlKGZpbHRlclVpZCkge1xuXG4gICAgY29uc3QgZmlsdGVyID0gdGhpcy5jb2xsYXBzYWJsZUZpbHRlcnMuY2hpbGRyZW4uZmluZChpdGVtID0+IGl0ZW0udWlkID09PSBmaWx0ZXJVaWQpO1xuXG4gICAgY29uc3QgZmlsdGVyR3JvdXA6IEZpbHRlckdyb3VwID0geyBmaWx0ZXJzOiBmaWx0ZXIuZmlsdGVycyB9O1xuXG4gICAgdGhpcy5sb2FkUmVwb3J0KHRydWUsIGZpbHRlckdyb3VwKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuXG4gICAgICB0aGlzLnNlbGVjdGVkQ29sbGFwc2FibGUgPSBmaWx0ZXIudWlkO1xuXG4gICAgfSwgMCk7XG5cblxuICB9XG5cbiAgLypcbiAgICogbG9hZFJlcG9ydFxuICAgKlxuICAgKiBUaGlzIG1laHRvZCBnYXRoZXIgdGhlIGZpbHRlciBpbmZvIGFuZCBlbmRwb2ludCBhbmQgY2FsbCB0aGUgYmFjay1lbmQgdG8gZmV0Y2ggdGhlIGRhdGFcbiAgICpcbiAgICogSWYgdGhlIHN1Y3RvbUZldGNoTWV0aG9kIGlzIHVzZWQsIGl0cyBjYWxsIGl0XG4gICAqXG4gICAqIElmIG9ubHkgdGhlIHJvd3MgYXJlIHBhc3NlZCwgdGhlIG1ldGhvZCBqdXN0IHVzZSBpdCBhcyByZXN1bHRcbiAgICovXG4gIHByaXZhdGUgbG9hZFJlcG9ydChjbGVhckFuZFJlbG9hZFJlcG9ydD86IGJvb2xlYW4sIGNvbGxhcHNlRmlsdGVyR3JvdXBzPzogRmlsdGVyR3JvdXApOiBQcm9taXNlPGFueT4ge1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuXG4gICAgICBpZiAoY2xlYXJBbmRSZWxvYWRSZXBvcnQgJiYgdGhpcy5yb3dzKSB7XG5cbiAgICAgICAgdGhpcy5zZXRSb3dzKHRoaXMucm93cyk7XG5cbiAgICAgIH1cblxuICAgICAgdGhpcy5jbGVhckFuZFJlbG9hZFJlcG9ydCA9IGNsZWFyQW5kUmVsb2FkUmVwb3J0O1xuXG4gICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICBpZiAodGhpcy5lbmRwb2ludCkge1xuXG4gICAgICAgIHRoaXMubW91bnRQYXlsb2FkKGNsZWFyQW5kUmVsb2FkUmVwb3J0LCBjb2xsYXBzZUZpbHRlckdyb3VwcylcbiAgICAgICAgLnRoZW4ocGF5bG9hZCA9PiB7XG5cbiAgICAgICAgICB0aGlzLnBheWxvYWQgPSBwYXlsb2FkO1xuXG4gICAgICAgICAgdGhpcy5maWx0ZXJEYXRhLm5leHQoeyBlbmRwb2ludDogdGhpcy5lbmRwb2ludCwgcGF5bG9hZDogdGhpcy5wYXlsb2FkLCBjYms6IHJlcywgY2xlYXI6IGNsZWFyQW5kUmVsb2FkUmVwb3J0IH0pO1xuXG4gICAgICAgIH0pO1xuXG5cbiAgICAgIH0gZWxzZSBpZiAodGhpcy5jdXN0b21GZXRjaE1ldGhvZCkge1xuXG4gICAgICAgIHRoaXMuZmlsdGVyRGF0YS5uZXh0KCk7XG5cbiAgICAgIH0gZWxzZSBpZiAoIXRoaXMucm93cykge1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuXG4gICAgICAgICAgaWYgKCF0aGlzLnJvd3MpIHtcblxuICAgICAgICAgICAgcmVqKCdObyBlbmRwb2ludCwgY3VzdG9tRmV0Y2hNZXRob2Qgb3Igcm93cyBzZXQnKTtcblxuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXG4gICAgICAgIH0sIDEpO1xuXG4gICAgICB9XG5cbiAgICB9KTtcblxuICB9XG5cbiAgcHJpdmF0ZSBtb3VudFBheWxvYWQoY2xlYXJBbmRSZWxvYWRSZXBvcnQ6IGJvb2xlYW4gPSBmYWxzZSwgY29sbGFwc2VGaWx0ZXJHcm91cHM/KSB7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgICBjb25zdCBzZWFyY2hGaWx0ZXJHcm91cHMgPSB0aGlzLmZpbHRlciA/IHRoaXMuZmlsdGVyLmZpbHRlckdyb3VwcyA6IHVuZGVmaW5lZDtcblxuICAgICAgY29uc3QgZmlsdGVyR3JvdXBzID0gdGhpcy5hcHBlbmRGaWx0ZXJHcm91cHNUb0VhY2hGaWx0ZXJHcm91cChzZWFyY2hGaWx0ZXJHcm91cHMsIGNvbGxhcHNlRmlsdGVyR3JvdXBzKTtcblxuICAgICAgY29uc3QgcGF5bG9hZDogRGVjRmlsdGVyID0ge307XG5cbiAgICAgIHBheWxvYWQubGltaXQgPSB0aGlzLmxpbWl0O1xuXG4gICAgICBpZiAoZmlsdGVyR3JvdXBzKSB7XG5cbiAgICAgICAgcGF5bG9hZC5maWx0ZXJHcm91cHMgPSBmaWx0ZXJHcm91cHM7XG5cbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuY29sdW1uc1NvcnRDb25maWcpIHtcblxuICAgICAgICBwYXlsb2FkLnNvcnQgPSB0aGlzLmNvbHVtbnNTb3J0Q29uZmlnO1xuXG4gICAgICB9XG5cbiAgICAgIGlmICghY2xlYXJBbmRSZWxvYWRSZXBvcnQgJiYgdGhpcy5yZXBvcnQpIHtcblxuICAgICAgICBwYXlsb2FkLnBhZ2UgPSB0aGlzLnJlcG9ydC5wYWdlICsgMTtcblxuICAgICAgICBwYXlsb2FkLmxpbWl0ID0gdGhpcy5yZXBvcnQubGltaXQ7XG5cbiAgICAgIH1cblxuICAgICAgcmVzb2x2ZShwYXlsb2FkKTtcblxuICAgIH0pO1xuXG4gIH1cblxuICAvKlxuICAgKiBhcHBlbmRGaWx0ZXJHcm91cHNUb0VhY2hGaWx0ZXJHcm91cFxuICAgKlxuICAgKiBHZXRzIGFuIGFycmF5IG9mIGZpbHRlckdyb3VwIGFuZCBpbiBlYWNoIGZpbHRlckdyb3VwIGluIHRoaXMgYXJyYXkgYXBwZW5kcyB0aGUgc2Vjb25kIGZpbHRlckdyb3VwIGZpbHRlcnMuXG4gICAqL1xuICBwcml2YXRlIGFwcGVuZEZpbHRlckdyb3Vwc1RvRWFjaEZpbHRlckdyb3VwKGZpbHRlckdyb3VwczogRmlsdGVyR3JvdXBzLCBmaWx0ZXJHcm91cFRvQXBwZW5kOiBGaWx0ZXJHcm91cCkge1xuXG4gICAgaWYgKGZpbHRlckdyb3VwVG9BcHBlbmQpIHtcblxuICAgICAgaWYgKGZpbHRlckdyb3VwcyAmJiBmaWx0ZXJHcm91cHMubGVuZ3RoID4gMCkge1xuXG4gICAgICAgIGZpbHRlckdyb3Vwcy5mb3JFYWNoKGdyb3VwID0+IHtcblxuICAgICAgICAgIGdyb3VwLmZpbHRlcnMucHVzaCguLi5maWx0ZXJHcm91cFRvQXBwZW5kLmZpbHRlcnMpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIGZpbHRlckdyb3VwcyA9IFtmaWx0ZXJHcm91cFRvQXBwZW5kXTtcblxuICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmV0dXJuIGZpbHRlckdyb3VwcyB8fCBbXTtcblxuICB9XG5cbiAgLypcbiAgICogc2V0RmlsdGVyc0NvbXBvbmVudHNCYXNlUGF0aEFuZE5hbWVzXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHNldEZpbHRlcnNDb21wb25lbnRzQmFzZVBhdGhBbmROYW1lcygpIHtcblxuICAgIGlmICh0aGlzLmZpbHRlcikge1xuXG4gICAgICB0aGlzLmZpbHRlci5uYW1lID0gdGhpcy5uYW1lO1xuXG5cbiAgICAgIGlmICh0aGlzLmZpbHRlci50YWJzRmlsdGVyQ29tcG9uZW50KSB7XG5cbiAgICAgICAgdGhpcy5maWx0ZXIudGFic0ZpbHRlckNvbXBvbmVudC5uYW1lID0gdGhpcy5uYW1lO1xuXG4gICAgICAgIGlmICh0aGlzLmN1c3RvbUZldGNoTWV0aG9kKSB7XG5cbiAgICAgICAgICB0aGlzLmZpbHRlci50YWJzRmlsdGVyQ29tcG9uZW50LmN1c3RvbUZldGNoTWV0aG9kID0gdGhpcy5jdXN0b21GZXRjaE1ldGhvZDtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgdGhpcy5maWx0ZXIudGFic0ZpbHRlckNvbXBvbmVudC5zZXJ2aWNlID0gdGhpcy5zZXJ2aWNlO1xuXG4gICAgICAgIH1cblxuXG5cbiAgICAgIH1cblxuICAgIH1cblxuICB9XG5cbiAgLypcbiAgICogc2V0Um93c1xuICAgKlxuICAgKiBTZXRzIHRoZSBjdXJyZW50IHRhYmxlIHJvd3NcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc2V0Um93cyhyb3dzID0gW10pIHtcblxuICAgIHRoaXMucmVwb3J0ID0ge1xuXG4gICAgICBwYWdlOiAxLFxuXG4gICAgICByZXN1bHQ6IHtcblxuICAgICAgICByb3dzOiByb3dzLFxuXG4gICAgICAgIGNvdW50OiByb3dzLmxlbmd0aFxuXG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuZGV0ZWN0TGFzdFBhZ2Uocm93cywgcm93cy5sZW5ndGgpO1xuXG4gICAgdGhpcy51cGRhdGVDb250ZW50Q2hpbGRyZW4oKTtcbiAgfVxuXG4gIC8qXG4gICAqIHdhdGNoU2Nyb2xsRXZlbnRFbWl0dGVyXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHdhdGNoU2Nyb2xsRXZlbnRFbWl0dGVyKCkge1xuXG4gICAgdGhpcy5zY3JvbGxFdmVudEVtaXRlclN1YnNjcmlwdGlvbiA9IHRoaXMuc2Nyb2xsRXZlbnRFbWl0ZXJcbiAgICAucGlwZShcbiAgICAgIGRlYm91bmNlVGltZSgxNTApLFxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKVxuICAgICkuc3Vic2NyaWJlKHRoaXMuYWN0QnlTY3JvbGxQb3NpdGlvbik7XG5cbiAgfVxuXG4gIC8qXG4gICAqIHN0b3BXYXRjaGluZ1Njcm9sbEV2ZW50RW1pdHRlclxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzdG9wV2F0Y2hpbmdTY3JvbGxFdmVudEVtaXR0ZXIoKSB7XG5cbiAgICBpZiAodGhpcy5zY3JvbGxFdmVudEVtaXRlclN1YnNjcmlwdGlvbikge1xuXG4gICAgICB0aGlzLnNjcm9sbEV2ZW50RW1pdGVyU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIC8qXG4gICAqIHdhdGNoRmlsdGVyRGF0YVxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB3YXRjaEZpbHRlckRhdGEoKSB7XG4gICAgdGhpcy5yZWFjdGl2ZVJlcG9ydCA9IHRoaXMuZmlsdGVyRGF0YVxuICAgIC5waXBlKFxuICAgICAgZGVib3VuY2VUaW1lKDE1MCksIC8vIGF2b2lkIG11aWx0aXBsZSByZXF1ZXN0IHdoZW4gdGhlIGZpbHRlciBvciB0YWIgY2hhbmdlIHRvbyBmYXN0XG4gICAgICBzd2l0Y2hNYXAoKGZpbHRlckRhdGE6IEZpbHRlckRhdGEpID0+IHtcblxuICAgICAgICBjb25zdCBvYnNlcnZhYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxhbnk+KHVuZGVmaW5lZCk7XG5cbiAgICAgICAgY29uc3QgZmV0Y2hNZXRob2Q6IERlY0xpc3RGZXRjaE1ldGhvZCA9IHRoaXMuY3VzdG9tRmV0Y2hNZXRob2QgfHwgdGhpcy5zZXJ2aWNlLmdldDtcblxuICAgICAgICBjb25zdCBlbmRwb2ludCA9IGZpbHRlckRhdGEgPyBmaWx0ZXJEYXRhLmVuZHBvaW50IDogdW5kZWZpbmVkO1xuXG4gICAgICAgIGNvbnN0IHBheWxvYWRXaXRoU2VhcmNoYWJsZVByb3BlcnRpZXMgPSB0aGlzLmdldFBheWxvYWRXaXRoU2VhcmNoVHJhbnNmb3JtZWRJbnRvU2VhcmNoYWJsZVByb3BlcnRpZXModGhpcy5wYXlsb2FkKTtcblxuICAgICAgICBpZiAoZmlsdGVyRGF0YSAmJiBmaWx0ZXJEYXRhLmNsZWFyKSB7XG4gICAgICAgICAgdGhpcy5zZXRSb3dzKFtdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZldGNoTWV0aG9kKGVuZHBvaW50LCBwYXlsb2FkV2l0aFNlYXJjaGFibGVQcm9wZXJ0aWVzKVxuICAgICAgICAuc3Vic2NyaWJlKHJlcyA9PiB7XG5cbiAgICAgICAgICBvYnNlcnZhYmxlLm5leHQocmVzKTtcblxuICAgICAgICAgIGlmIChmaWx0ZXJEYXRhICYmIGZpbHRlckRhdGEuY2JrKSB7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyAvLyB3YWl0IGZvciBzdWJzY3JpYmVycyB0byByZWZyZXNoIHRoZWlyIHJvd3NcblxuICAgICAgICAgICAgICBmaWx0ZXJEYXRhLmNiayhuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqKSA9PiB7XG5cbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlcyk7XG5cbiAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICB9LCAxKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGU7XG4gICAgICB9KVxuXG4gICAgKTtcbiAgICB0aGlzLnN1YnNjcmliZVRvUmVhY3RpdmVSZXBvcnQoKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0UGF5bG9hZFdpdGhTZWFyY2hUcmFuc2Zvcm1lZEludG9TZWFyY2hhYmxlUHJvcGVydGllcyhwYXlsb2FkKSB7XG5cbiAgICBjb25zdCBwYXlsb2FkQ29weSA9IHsuLi5wYXlsb2FkfTtcblxuICAgIGlmIChwYXlsb2FkQ29weS5maWx0ZXJHcm91cHMgJiYgdGhpcy5zZWFyY2hhYmxlUHJvcGVydGllcykge1xuXG4gICAgICBwYXlsb2FkQ29weS5maWx0ZXJHcm91cHMgPSBbLi4ucGF5bG9hZC5maWx0ZXJHcm91cHNdO1xuXG4gICAgICB0aGlzLmFwcGVuZEZpbHRlckdyb3Vwc0Jhc2VkT25TZWFyY2hhYmxlUHJvcGVydGllcyhwYXlsb2FkQ29weS5maWx0ZXJHcm91cHMpO1xuXG4gICAgICByZXR1cm4gcGF5bG9hZENvcHk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICByZXR1cm4gdGhpcy5wYXlsb2FkO1xuXG4gICAgfVxuXG4gIH1cblxuICBwcml2YXRlIGFwcGVuZEZpbHRlckdyb3Vwc0Jhc2VkT25TZWFyY2hhYmxlUHJvcGVydGllcyhmaWx0ZXJHcm91cHMpIHtcblxuICAgIGNvbnN0IGZpbHRlckdyb3VwVGhhdENvbnRhaW5zQmFzaWNTZWFyY2ggPSB0aGlzLmdldEZpbHRlckdyb3VwVGhhdENvbnRhaW5zVGhlQmFzaWNTZWFyY2goZmlsdGVyR3JvdXBzKTtcblxuICAgIGlmIChmaWx0ZXJHcm91cFRoYXRDb250YWluc0Jhc2ljU2VhcmNoKSB7XG5cbiAgICAgIHRoaXMucmVtb3ZlRmlsdGVyR3JvdXAoZmlsdGVyR3JvdXBzLCBmaWx0ZXJHcm91cFRoYXRDb250YWluc0Jhc2ljU2VhcmNoKTtcblxuICAgICAgY29uc3QgYmFzaWNTZWFyY2ggPSBmaWx0ZXJHcm91cFRoYXRDb250YWluc0Jhc2ljU2VhcmNoLmZpbHRlcnMuZmluZChmaWx0ZXIgPT4gZmlsdGVyLnByb3BlcnR5ID09PSAnc2VhcmNoJyk7XG5cbiAgICAgIGNvbnN0IGJhc2ljU2VhcmNoSW5kZXggPSBmaWx0ZXJHcm91cFRoYXRDb250YWluc0Jhc2ljU2VhcmNoLmZpbHRlcnMuaW5kZXhPZihiYXNpY1NlYXJjaCk7XG5cbiAgICAgIHRoaXMuc2VhcmNoYWJsZVByb3BlcnRpZXMuZm9yRWFjaChwcm9wZXJ0eSA9PiB7XG5cbiAgICAgICAgY29uc3QgbmV3RmlsdGVyR3JvdXA6IEZpbHRlckdyb3VwID0ge1xuICAgICAgICAgIGZpbHRlcnM6IFsuLi5maWx0ZXJHcm91cFRoYXRDb250YWluc0Jhc2ljU2VhcmNoLmZpbHRlcnNdXG4gICAgICAgIH07XG5cbiAgICAgICAgbmV3RmlsdGVyR3JvdXAuZmlsdGVyc1tiYXNpY1NlYXJjaEluZGV4XSA9IHtcbiAgICAgICAgICBwcm9wZXJ0eTogcHJvcGVydHksXG4gICAgICAgICAgdmFsdWU6IFtiYXNpY1NlYXJjaC52YWx1ZV1cbiAgICAgICAgfTtcblxuICAgICAgICBmaWx0ZXJHcm91cHMucHVzaChuZXdGaWx0ZXJHcm91cCk7XG5cbiAgICAgIH0pO1xuXG4gICAgfVxuXG4gIH1cblxuICBwcml2YXRlIHJlbW92ZUZpbHRlckdyb3VwKGZpbHRlckdyb3VwcywgZmlsdGVyR3JvdXBUaGF0Q29udGFpbnNCYXNpY1NlYXJjaCkge1xuXG4gICAgY29uc3QgZmlsdGVyR3JvdXBUaGF0Q29udGFpbnNCYXNpY1NlYXJjaEluZGV4ID0gZmlsdGVyR3JvdXBzLmluZGV4T2YoZmlsdGVyR3JvdXBUaGF0Q29udGFpbnNCYXNpY1NlYXJjaCk7XG5cbiAgICBmaWx0ZXJHcm91cHMuc3BsaWNlKGZpbHRlckdyb3VwVGhhdENvbnRhaW5zQmFzaWNTZWFyY2hJbmRleCwgMSk7XG5cbiAgfVxuXG4gIHByaXZhdGUgZ2V0RmlsdGVyR3JvdXBUaGF0Q29udGFpbnNUaGVCYXNpY1NlYXJjaChmaWx0ZXJHcm91cHMpIHtcblxuICAgIHJldHVybiBmaWx0ZXJHcm91cHMuZmluZChmaWx0ZXJHcm91cCA9PiB7XG5cbiAgICAgIGNvbnN0IGJhc2ljU2VyY2hGaWx0ZXIgPSBmaWx0ZXJHcm91cC5maWx0ZXJzID8gZmlsdGVyR3JvdXAuZmlsdGVycy5maW5kKGZpbHRlciA9PiBmaWx0ZXIucHJvcGVydHkgPT09ICdzZWFyY2gnKSA6IHVuZGVmaW5lZDtcblxuICAgICAgcmV0dXJuIGJhc2ljU2VyY2hGaWx0ZXIgPyB0cnVlIDogZmFsc2U7XG5cbiAgICB9KTtcblxuICB9XG5cbiAgLypcbiAgICogc3Vic2NyaWJlVG9SZWFjdGl2ZVJlcG9ydFxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzdWJzY3JpYmVUb1JlYWN0aXZlUmVwb3J0KCkge1xuICAgIHRoaXMucmVhY3RpdmVSZXBvcnRTdWJzY3JpcHRpb24gPSB0aGlzLnJlYWN0aXZlUmVwb3J0XG4gICAgLnBpcGUoXG4gICAgICB0YXAocmVzID0+IHtcbiAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIClcbiAgICAuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgaWYgKGRhdGEgJiYgZGF0YS5yZXN1bHQgJiYgZGF0YS5yZXN1bHQucm93cykge1xuXG4gICAgICAgIGlmICghdGhpcy5jbGVhckFuZFJlbG9hZFJlcG9ydCkge1xuICAgICAgICAgIGRhdGEucmVzdWx0LnJvd3MgPSB0aGlzLnJlcG9ydC5yZXN1bHQucm93cy5jb25jYXQoZGF0YS5yZXN1bHQucm93cyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlcG9ydCA9IGRhdGE7XG5cbiAgICAgICAgdGhpcy5wb3N0U2VhcmNoLmVtaXQoZGF0YSk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVDb250ZW50Q2hpbGRyZW4oKTtcblxuICAgICAgICB0aGlzLmRldGVjdExhc3RQYWdlKGRhdGEucmVzdWx0LnJvd3MsIGRhdGEucmVzdWx0LmNvdW50KTtcblxuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZGV0ZWN0TGFzdFBhZ2Uocm93cywgY291bnQpIHtcblxuICAgIGNvbnN0IG51bWJlck9mcm93cyA9IHJvd3MubGVuZ3RoO1xuXG4gICAgY29uc3QgZW1wdExpc3QgPSBudW1iZXJPZnJvd3MgPT09IDA7XG5cbiAgICBjb25zdCBzaW5nbGVQYWdlTGlzdCA9IG51bWJlck9mcm93cyA9PT0gY291bnQ7XG5cbiAgICB0aGlzLmlzTGFzdFBhZ2UgPSBlbXB0TGlzdCB8fCBzaW5nbGVQYWdlTGlzdDtcblxuICB9XG5cbiAgLypcbiAgICogdW5zdWJzY3JpYmVUb1JlYWN0aXZlUmVwb3J0XG4gICAqXG4gICAqL1xuICBwcml2YXRlIHVuc3Vic2NyaWJlVG9SZWFjdGl2ZVJlcG9ydCgpIHtcbiAgICBpZiAodGhpcy5yZWFjdGl2ZVJlcG9ydFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5yZWFjdGl2ZVJlcG9ydFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIHVwZGF0ZUNvbnRlbnRDaGlsZHJlblxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB1cGRhdGVDb250ZW50Q2hpbGRyZW4oKSB7XG5cbiAgICBjb25zdCByb3dzID0gdGhpcy5lbmRwb2ludCA/IHRoaXMucmVwb3J0LnJlc3VsdC5yb3dzIDogdGhpcy5yb3dzO1xuICAgIGlmICh0aGlzLmdyaWQpIHtcbiAgICAgIHRoaXMuZ3JpZC5yb3dzID0gcm93cztcbiAgICB9XG4gICAgaWYgKHRoaXMudGFibGUpIHtcbiAgICAgIHRoaXMudGFibGUucm93cyA9IHJvd3M7XG4gICAgfVxuICAgIGlmICh0aGlzLmZpbHRlcikge1xuICAgICAgdGhpcy5maWx0ZXIuY291bnQgPSB0aGlzLnJlcG9ydC5yZXN1bHQuY291bnQ7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogcmVnaXN0ZXJDaGlsZFdhdGNoZXJzXG4gICAqXG4gICAqIFdhdGNoIGZvciBjaGlsZHJlbiBvdXRwdXRzXG4gICAqL1xuICBwcml2YXRlIHJlZ2lzdGVyQ2hpbGRXYXRjaGVycygpIHtcblxuICAgIGlmICh0aGlzLmdyaWQpIHtcbiAgICAgIHRoaXMud2F0Y2hHcmlkUm93Q2xpY2soKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy50YWJsZSkge1xuICAgICAgdGhpcy53YXRjaFRhYmxlUm93Q2xpY2soKTtcbiAgICB9XG5cbiAgfVxuXG4gIC8qXG4gICAqIHdhdGNoR3JpZFJvd0NsaWNrXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHdhdGNoR3JpZFJvd0NsaWNrKCkge1xuICAgIHRoaXMuZ3JpZC5yb3dDbGljay5zdWJzY3JpYmUoKCRldmVudCkgPT4ge1xuICAgICAgdGhpcy5yb3dDbGljay5lbWl0KCRldmVudCk7XG4gICAgfSk7XG4gIH1cblxuICAvKlxuICAgKiB3YXRjaFRhYmxlUm93Q2xpY2tcbiAgICpcbiAgICovXG4gIHByaXZhdGUgd2F0Y2hUYWJsZVJvd0NsaWNrKCkge1xuICAgIHRoaXMudGFibGUucm93Q2xpY2suc3Vic2NyaWJlKCgkZXZlbnQpID0+IHtcbiAgICAgIHRoaXMucm93Q2xpY2suZW1pdCgkZXZlbnQpO1xuICAgIH0pO1xuICB9XG5cbiAgLypcbiAgICogd2F0Y2hGaWx0ZXJcbiAgICpcbiAgICovXG4gIHByaXZhdGUgd2F0Y2hGaWx0ZXIoKSB7XG4gICAgaWYgKHRoaXMuZmlsdGVyKSB7XG4gICAgICB0aGlzLmZpbHRlclN1YnNjcmlwdGlvbiA9IHRoaXMuZmlsdGVyLnNlYXJjaC5zdWJzY3JpYmUoZXZlbnQgPT4ge1xuXG4gICAgICAgIGNvbnN0IHRhYkNoYW5nZWQgPSB0aGlzLnByZXZpb3VzU2VsZWN0ZWRUYWIgJiYgdGhpcy5wcmV2aW91c1NlbGVjdGVkVGFiICE9PSB0aGlzLnNlbGVjdGVkVGFiO1xuXG4gICAgICAgIGNvbnN0IGZpbHRlck1vZGVDaGFuZ2VkID0gdGhpcy5maWx0ZXJNb2RlICE9PSBldmVudC5maWx0ZXJNb2RlO1xuXG4gICAgICAgIGlmICh0YWJDaGFuZ2VkKSB7XG5cbiAgICAgICAgICB0aGlzLnByZXZpb3VzU2VsZWN0ZWRUYWIgPSB0aGlzLnNlbGVjdGVkVGFiO1xuXG4gICAgICAgICAgdGhpcy5zZXRSb3dzKFtdKTsgLy8gaWYgY2hhbmdpbmcgdGFicywgY2xlYXIgdGhlIHJlc3VsdHMgYmVmb3JlIHNob3dpbmcgdGhlIHJvd3MgYmVjYXVzZSBpdCBpcyBkb25lIG9ubHkgYWZ0ZXIgZmV0Y2hpbmcgdGhlIGRhdGFcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZpbHRlck1vZGVDaGFuZ2VkKSB7XG5cbiAgICAgICAgICB0aGlzLmZpbHRlck1vZGUgPSBldmVudC5maWx0ZXJNb2RlO1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5maWx0ZXJNb2RlID09PSAndGFicycpIHtcblxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDb2xsYXBzYWJsZSA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgIHRoaXMuY29sbGFwc2FibGVGaWx0ZXJzID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgdGhpcy5sb2FkUmVwb3J0KHRydWUpLnRoZW4oKHJlcykgPT4ge1xuXG4gICAgICAgICAgICBpZiAoZXZlbnQucmVjb3VudCkge1xuXG4gICAgICAgICAgICAgIHRoaXMucmVsb2FkQ291bnRSZXBvcnQoKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgIGlmICghdGhpcy5jb3VudFJlcG9ydCB8fCBldmVudC5yZWNvdW50KSB7XG5cbiAgICAgICAgICAgIHRoaXMucmVsb2FkQ291bnRSZXBvcnQoKTtcblxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkQ29sbGFwc2FibGUgJiYgIXRhYkNoYW5nZWQpIHtcblxuICAgICAgICAgICAgdGhpcy5sb2FkQnlPcGVubmVkQ29sbGFwc2UodGhpcy5zZWxlY3RlZENvbGxhcHNhYmxlKTtcblxuICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDb2xsYXBzYWJsZSA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgdGhpcy5jb2xsYXBzYWJsZUZpbHRlcnMgPSB7XG4gICAgICAgICAgICAgIHRhYjogdGhpcy5zZWxlY3RlZFRhYixcbiAgICAgICAgICAgICAgY2hpbGRyZW46IGV2ZW50LmNoaWxkcmVuID8gZXZlbnQuY2hpbGRyZW4gOiBbXVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIHdhdGNoRmlsdGVyXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHN0b3BXYXRjaGluZ0ZpbHRlcigpIHtcbiAgICBpZiAodGhpcy5maWx0ZXJTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuZmlsdGVyU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogd2F0Y2hTY3JvbGxcbiAgICpcbiAgICovXG4gIHByaXZhdGUgd2F0Y2hTY3JvbGwoKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnNjcm9sbGFibGVDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMuc2Nyb2xsYWJsZUNvbnRhaW5lckNsYXNzKVswXTtcbiAgICAgIGlmICh0aGlzLnNjcm9sbGFibGVDb250YWluZXIpIHtcbiAgICAgICAgdGhpcy5zY3JvbGxhYmxlQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuZW1pdFNjcm9sbEV2ZW50LCB0cnVlKTtcbiAgICAgIH1cbiAgICB9LCAxKTtcbiAgfVxuXG4gIC8qXG4gICAqIHN0b3BXYXRjaGluZ1Njcm9sbFxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzdG9wV2F0Y2hpbmdTY3JvbGwoKSB7XG4gICAgaWYgKHRoaXMuc2Nyb2xsYWJsZUNvbnRhaW5lcikge1xuICAgICAgdGhpcy5zY3JvbGxhYmxlQ29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuZW1pdFNjcm9sbEV2ZW50LCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiBzdWJzY3JpYmVUb1JlYWN0aXZlUmVwb3J0XG4gICAqXG4gICAqL1xuICBwcml2YXRlIHdhdGNoVGFic0NoYW5nZSgpIHtcbiAgICBpZiAodGhpcy5maWx0ZXIgJiYgdGhpcy5maWx0ZXIudGFic0ZpbHRlckNvbXBvbmVudCkge1xuICAgICAgdGhpcy5zZWxlY3RlZFRhYiA9IHRoaXMuZmlsdGVyLnRhYnNGaWx0ZXJDb21wb25lbnQuc2VsZWN0ZWRUYWI7XG4gICAgICB0aGlzLnRhYnNDaGFuZ2VTdWJzY3JpcHRpb24gPSB0aGlzLmZpbHRlci50YWJzRmlsdGVyQ29tcG9uZW50LnRhYkNoYW5nZS5zdWJzY3JpYmUodGFiID0+IHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFRhYiA9IHRhYjtcbiAgICAgICAgdGhpcy5kZXRlY3RMaXN0TW9kZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogc3Vic2NyaWJlVG9UYWJzQ2hhbmdlXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHN0b3BXYXRjaGluZ1RhYnNDaGFuZ2UoKSB7XG4gICAgaWYgKHRoaXMudGFic0NoYW5nZVN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy50YWJzQ2hhbmdlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogd2F0Y2hUYWJsZVNvcnRcbiAgICpcbiAgICovXG4gIHByaXZhdGUgd2F0Y2hUYWJsZVNvcnQoKSB7XG4gICAgaWYgKHRoaXMudGFibGUpIHtcblxuICAgICAgdGhpcy50YWJsZVNvcnRTdWJzY3JpcHRpb24gPSB0aGlzLnRhYmxlLnNvcnQuc3Vic2NyaWJlKGNvbHVtbnNTb3J0Q29uZmlnID0+IHtcblxuICAgICAgICBpZiAodGhpcy5jb2x1bW5zU29ydENvbmZpZyAhPT0gY29sdW1uc1NvcnRDb25maWcpIHtcblxuICAgICAgICAgIHRoaXMuY29sdW1uc1NvcnRDb25maWcgPSBjb2x1bW5zU29ydENvbmZpZztcblxuICAgICAgICAgIGlmICh0aGlzLmNvbGxhcHNhYmxlRmlsdGVycykge1xuXG4gICAgICAgICAgICB0aGlzLmxvYWRCeU9wZW5uZWRDb2xsYXBzZSh0aGlzLnNlbGVjdGVkQ29sbGFwc2FibGUpO1xuXG4gICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgdGhpcy5sb2FkUmVwb3J0KHRydWUpO1xuXG4gICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogc3RvcFdhdGNoaW5nVGFibGVTb3J0XG4gICAqXG4gICAqL1xuICBwcml2YXRlIHN0b3BXYXRjaGluZ1RhYmxlU29ydCgpIHtcbiAgICBpZiAodGhpcy50YWJsZVNvcnRTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMudGFibGVTb3J0U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==