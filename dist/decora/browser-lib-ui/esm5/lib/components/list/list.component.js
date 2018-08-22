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
                var /** @type {?} */ tabChanged = _this.previousSelectedTab !== _this.selectedTab;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvbGlzdC9saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBaUIsU0FBUyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkgsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDdkUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDMUUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDN0UsT0FBTyxFQUFjLGVBQWUsRUFBZ0IsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsb0JBQW9CLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3BGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQzs7SUFzYnRFOzs7O09BSUc7SUFDSCwwQkFDVTtRQURWLGlCQUVLO1FBREssWUFBTyxHQUFQLE9BQU87Ozs7OzswQkFoVmlCLE1BQU07MEJBZ0ZFLElBQUksT0FBTyxFQUFjO3dCQU9oRCxJQUFJO2lDQTBDSyxJQUFJLFlBQVksRUFBTzs7Ozs7O3FCQThIbEMsRUFBRTs7Ozs7O3dDQWNpQixxQkFBcUI7Ozs7OzswQkFjbkMsSUFBSTs7Ozs7OzBCQU9ILElBQUksWUFBWSxFQUFPOzs7Ozs7d0JBT04sSUFBSSxZQUFZLEVBQU87MkJBa1B6QztZQUVwQixxQkFBSSxRQUFRLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBQztZQUU3QixFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsTUFBTSxJQUFJLEtBQUksQ0FBQyxNQUFNLENBQUMs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Z0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIENvbnRlbnRDaGlsZCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVjTGlzdEdyaWRDb21wb25lbnQgfSBmcm9tICcuL2xpc3QtZ3JpZC9saXN0LWdyaWQuY29tcG9uZW50JztcbmltcG9ydCB7IERlY0xpc3RUYWJsZUNvbXBvbmVudCB9IGZyb20gJy4vbGlzdC10YWJsZS9saXN0LXRhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNMaXN0RmlsdGVyQ29tcG9uZW50IH0gZnJvbSAnLi9saXN0LWZpbHRlci9saXN0LWZpbHRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0LCBTdWJzY3JpcHRpb24sIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZGlzdGluY3RVbnRpbENoYW5nZWQsIHRhcCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRGVjQXBpU2VydmljZSB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvYXBpL2RlY29yYS1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBEZWNMaXN0RmV0Y2hNZXRob2QsIENvdW50UmVwb3J0IH0gZnJvbSAnLi9saXN0Lm1vZGVscyc7XG5pbXBvcnQgeyBGaWx0ZXJEYXRhLCBEZWNGaWx0ZXIsIEZpbHRlckdyb3VwcywgRmlsdGVyR3JvdXAgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLm1vZGVsJztcbmltcG9ydCB7IERlY0xpc3RGaWx0ZXIgfSBmcm9tICcuL2xpc3QubW9kZWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWxpc3QnLFxuICB0ZW1wbGF0ZTogYDwhLS0gQ09NUE9ORU5UIExBWU9VVCAtLT5cbjxkaXYgY2xhc3M9XCJsaXN0LWNvbXBvbmVudC13cmFwcGVyXCI+XG4gIDxkaXYgKm5nSWY9XCJmaWx0ZXJcIj5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJkZWMtbGlzdC1maWx0ZXJcIj48L25nLWNvbnRlbnQ+XG4gIDwvZGl2PlxuICA8ZGl2ICpuZ0lmPVwicmVwb3J0IHx8IGZpbHRlck1vZGUgPT09ICdjb2xsYXBzZSdcIj5cbiAgICA8ZGl2IGZ4TGF5b3V0PVwiY29sdW1uXCIgZnhMYXlvdXRHYXA9XCIxNnB4XCI+XG4gICAgICA8ZGl2IGZ4RmxleCBjbGFzcz1cInRleHQtcmlnaHRcIiAqbmdJZj1cInRhYmxlQW5kR3JpZEFyZVNldCgpXCI+XG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG1hdC1pY29uLWJ1dHRvbiAoY2xpY2spPVwidG9nZ2xlTGlzdE1vZGUoKVwiPlxuICAgICAgICAgIDxtYXQtaWNvbiB0aXRsZT1cIlN3aXRjaCB0byB0YWJsZSBtb2RlXCIgYXJpYS1sYWJlbD1cIlN3aXRjaCB0byB0YWJsZSBtb2RlXCIgY29sb3I9XCJwcmltYXJ5XCIgY29udHJhc3RGb250V2l0aEJnICpuZ0lmPVwibGlzdE1vZGUgPT09ICdncmlkJ1wiPnZpZXdfaGVhZGxpbmU8L21hdC1pY29uPlxuICAgICAgICAgIDxtYXQtaWNvbiB0aXRsZT1cIlN3aXRjaCB0byBncmlkIG1vZGVcIiBhcmlhLWxhYmVsPVwiU3dpdGNoIHRvIGdyaWQgbW9kZVwiIGNvbG9yPVwicHJpbWFyeVwiIGNvbnRyYXN0Rm9udFdpdGhCZyAqbmdJZj1cImxpc3RNb2RlID09PSAndGFibGUnXCI+dmlld19tb2R1bGU8L21hdC1pY29uPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBmeEZsZXg+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJmaWx0ZXJNb2RlID09ICdjb2xsYXBzZScgdGhlbiBjb2xsYXBzZVRlbXBsYXRlIGVsc2UgdGFic1RlbXBsYXRlXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5cblxuPCEtLSBHUklEIFRFTVBMQVRFIC0tPlxuPG5nLXRlbXBsYXRlICNncmlkVGVtcGxhdGU+XG4gIDxuZy1jb250ZW50IHNlbGVjdD1cImRlYy1saXN0LWdyaWRcIj48L25nLWNvbnRlbnQ+XG48L25nLXRlbXBsYXRlPlxuXG48IS0tIFRBQkxFIFRFTVBMQVRFIC0tPlxuPG5nLXRlbXBsYXRlICNsaXN0VGVtcGxhdGU+XG4gIDxuZy1jb250ZW50IHNlbGVjdD1cImRlYy1saXN0LXRhYmxlXCI+PC9uZy1jb250ZW50PlxuPC9uZy10ZW1wbGF0ZT5cblxuPCEtLSBGT09URVIgVEVNUExBVEUgLS0+XG48bmctdGVtcGxhdGUgI2Zvb3RlclRlbXBsYXRlPlxuICA8bmctY29udGVudCBzZWxlY3Q9XCJkZWMtbGlzdC1mb290ZXJcIj48L25nLWNvbnRlbnQ+XG4gIDxwIGNsYXNzPVwibGlzdC1mb290ZXJcIj5cbiAgICB7eyAnbGFiZWwuYW1vdW50LWxvYWRlZC1vZi10b3RhbCcgfFxuICAgICAgdHJhbnNsYXRlOntcbiAgICAgICAgbG9hZGVkOiByZXBvcnQ/LnJlc3VsdD8ucm93cz8ubGVuZ3RoLFxuICAgICAgICB0b3RhbDogcmVwb3J0Py5yZXN1bHQ/LmNvdW50XG4gICAgICB9XG4gICAgfX1cbiAgPC9wPlxuPC9uZy10ZW1wbGF0ZT5cblxuPCEtLSBDT0xMQVBTRSBURU1QTEFURSAtLT5cbjxuZy10ZW1wbGF0ZSAjdGFic1RlbXBsYXRlPlxuICA8ZGl2IGZ4TGF5b3V0PVwiY29sdW1uXCIgZnhMYXlvdXRHYXA9XCIxNnB4XCI+XG4gICAgPGRpdiAqbmdJZj1cImxpc3RNb2RlID09ICdncmlkJyB0aGVuIGdyaWRUZW1wbGF0ZSBlbHNlIGxpc3RUZW1wbGF0ZVwiPjwvZGl2PlxuICAgIDwhLS0gRk9PVEVSIENPTlRFTlQgLS0+XG4gICAgPGRpdiBmeEZsZXg+XG4gICAgICA8ZGl2ICpuZ0lmPVwic2hvd0Zvb3RlciAmJiAhbG9hZGluZyB0aGVuIGZvb3RlclRlbXBsYXRlXCI+PC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPCEtLSBMT0FESU5HIFNQSU5ORVIgLS0+XG4gICAgPGRpdiBmeEZsZXggKm5nSWY9XCJsb2FkaW5nXCIgY2xhc3M9XCJ0ZXh0LWNlbnRlciBsb2FkaW5nLXNwaW5uZXItd3JhcHBlclwiPlxuICAgICAgPGRlYy1zcGlubmVyPjwvZGVjLXNwaW5uZXI+XG4gICAgPC9kaXY+XG4gICAgPCEtLSBMT0FEIE1PUkUgQlVUVE9OIC0tPlxuICAgIDxkaXYgZnhGbGV4ICpuZ0lmPVwiIWlzTGFzdFBhZ2UgJiYgIWxvYWRpbmcgJiYgIWRpc2FibGVTaG93TW9yZUJ1dHRvblwiIGNsYXNzPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG1hdC1yYWlzZWQtYnV0dG9uIChjbGljayk9XCJzaG93TW9yZSgpXCI+e3snbGFiZWwuc2hvdy1tb3JlJyB8IHRyYW5zbGF0ZX19PC9idXR0b24+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9uZy10ZW1wbGF0ZT5cblxuPCEtLSBDT0xMQVBTRSBURU1QTEFURSAtLT5cbjxuZy10ZW1wbGF0ZSAjY29sbGFwc2VUZW1wbGF0ZT5cbiAgPG1hdC1hY2NvcmRpb24+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZmlsdGVyIG9mIGNvbGxhcHNhYmxlRmlsdGVycy5jaGlsZHJlblwiPlxuICAgICAgPG1hdC1leHBhbnNpb24tcGFuZWwgKG9wZW5lZCk9XCJzZWFyY2hDb2xsYXBzYWJsZShmaWx0ZXIpXCI+XG4gICAgICAgIDxtYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlcj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sbGFwc2UtdGl0bGVcIiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0R2FwPVwiMzJweFwiIGZ4TGF5b3V0QWxpZ249XCJsZWZ0IGNlbnRlclwiPlxuICAgICAgICAgICAgPGRpdiBmeEZsZXg9XCI5NnB4XCIgKm5nSWY9XCJjb3VudFJlcG9ydFwiPlxuICAgICAgICAgICAgICA8ZGVjLWxhYmVsIFtjb2xvckhleF09XCJmaWx0ZXIuY29sb3JcIj57eyBnZXRDb2xsYXBzYWJsZUNvdW50KGZpbHRlci51aWQpIH19PC9kZWMtbGFiZWw+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHt7ICdsYWJlbC4nICsgZmlsdGVyLmxhYmVsIHwgdHJhbnNsYXRlIH19XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvbWF0LWV4cGFuc2lvbi1wYW5lbC1oZWFkZXI+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJzZWxlY3RlZENvbGxhcHNhYmxlID09PSBmaWx0ZXIudWlkXCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdUZW1wbGF0ZU91dGxldF09XCJ0YWJzVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L21hdC1leHBhbnNpb24tcGFuZWw+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIDwvbWF0LWFjY29yZGlvbj5cbiAgPGRpdiBjbGFzcz1cImFjY29yZGlvbi1ib3R0b20tbWFyZ2luXCI+PC9kaXY+XG48L25nLXRlbXBsYXRlPlxuXG5gLFxuICBzdHlsZXM6IFtgLmxpc3QtZm9vdGVye2ZvbnQtc2l6ZToxNHB4O3RleHQtYWxpZ246Y2VudGVyfS5saXN0LWNvbXBvbmVudC13cmFwcGVye21pbi1oZWlnaHQ6NzJweH0udGV4dC1yaWdodHt0ZXh0LWFsaWduOnJpZ2h0fS5sb2FkaW5nLXNwaW5uZXItd3JhcHBlcntwYWRkaW5nOjMycHh9LmNvbGxhcHNlLXRpdGxle3dpZHRoOjEwMCV9LmFjY29yZGlvbi1ib3R0b20tbWFyZ2lue21hcmdpbi1ib3R0b206MTAwcHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBBZnRlclZpZXdJbml0IHtcblxuICAvKlxuICAqIGNvdW50UmVwb3J0XG4gICpcbiAgKlxuICAqL1xuICBjb3VudFJlcG9ydDogQ291bnRSZXBvcnQ7XG5cbiAgLypcbiAgKiBmaWx0ZXJNb2RlXG4gICpcbiAgKlxuICAqL1xuICBmaWx0ZXJNb2RlOiAndGFicycgfCAnY29sbGFwc2UnID0gJ3RhYnMnO1xuXG5cbiAgLypcbiAgKiBjb2xsYXBzYWJsZUZpbHRlcnNcbiAgKlxuICAqXG4gICovXG4gIGNvbGxhcHNhYmxlRmlsdGVyczogeyB0YWI6IHN0cmluZywgY2hpbGRyZW46IERlY0xpc3RGaWx0ZXJbXSB9O1xuXG4gIC8qXG4gICAqIGxvYWRpbmdcbiAgICpcbiAgICpcbiAgICovXG4gIHNldCBsb2FkaW5nKHYpIHtcblxuICAgIHRoaXMuX2xvYWRpbmcgPSB2O1xuXG4gICAgaWYgKHRoaXMuZmlsdGVyKSB7XG5cbiAgICAgIHRoaXMuZmlsdGVyLmxvYWRpbmcgPSB2O1xuXG4gICAgfVxuXG4gIH1cblxuICBnZXQgbG9hZGluZygpIHtcbiAgICByZXR1cm4gdGhpcy5fbG9hZGluZztcbiAgfVxuXG4gIC8qXG4gICAqIGZpbHRlckdyb3Vwc1xuICAgKlxuICAgKlxuICAgKi9cbiAgZ2V0IGZpbHRlckdyb3VwcygpOiBGaWx0ZXJHcm91cHMge1xuICAgIHJldHVybiB0aGlzLmZpbHRlciA/IHRoaXMuZmlsdGVyLmZpbHRlckdyb3VwcyA6IFtdO1xuICB9XG5cbiAgLypcbiAgICogc2VsZWN0ZWRDb2xsYXBzYWJsZVxuICAgKlxuICAgKlxuICAgKi9cbiAgc2VsZWN0ZWRDb2xsYXBzYWJsZTtcblxuICAvKlxuICAgKiByZXBvcnRcbiAgICpcbiAgICpcbiAgICovXG4gIHJlcG9ydDtcblxuICAvKlxuICAgKiBpc0xhc3RQYWdlXG4gICAqXG4gICAqXG4gICAqL1xuICBpc0xhc3RQYWdlOiBib29sZWFuO1xuXG4gIC8qXG4gICogc2VsZWN0ZWRUYWJcbiAgKlxuICAqXG4gICovXG4gIHNlbGVjdGVkVGFiOiBhbnk7XG5cbiAgLypcbiAgKiBwcmV2aW91c1NlbGVjdGVkVGFiXG4gICpcbiAgKlxuICAqL1xuICBwcmV2aW91c1NlbGVjdGVkVGFiOiBhbnk7XG5cbiAgLypcbiAgICogZmlsdGVyRGF0YVxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBmaWx0ZXJEYXRhOiBTdWJqZWN0PEZpbHRlckRhdGE+ID0gbmV3IFN1YmplY3Q8RmlsdGVyRGF0YT4oKTtcblxuICAvKlxuICAgKiBfbG9hZGluZztcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgX2xvYWRpbmcgPSB0cnVlO1xuXG4gIC8qXG4gICAqIGNsZWFyQW5kUmVsb2FkUmVwb3J0XG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIGNsZWFyQW5kUmVsb2FkUmVwb3J0O1xuXG4gIC8qXG4gICAqIGZpbHRlclN1YnNjcmlwdGlvblxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBmaWx0ZXJTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKlxuICAgKiByZWFjdGl2ZVJlcG9ydFxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSByZWFjdGl2ZVJlcG9ydDogT2JzZXJ2YWJsZTxhbnk+O1xuXG4gIC8qXG4gICAqIHJlYWN0aXZlUmVwb3J0U3Vic2NyaXB0aW9uXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHJlYWN0aXZlUmVwb3J0U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgLypcbiAgICogc2Nyb2xsYWJsZUNvbnRhaW5lclxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzY3JvbGxhYmxlQ29udGFpbmVyOiBFbGVtZW50O1xuXG4gIC8qXG4gICAqIHNjcm9sbEV2ZW50RW1pdGVyXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHNjcm9sbEV2ZW50RW1pdGVyID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgLypcbiAgICogc2Nyb2xsRXZlbnRFbWl0ZXJTdWJzY3JpcHRpb25cbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc2Nyb2xsRXZlbnRFbWl0ZXJTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKlxuICAgKiB0YWJzQ2hhbmdlU3Vic2NyaXB0aW9uXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHRhYnNDaGFuZ2VTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKlxuICAgKiB0YWJsZVNvcnRTdWJzY3JpcHRpb25cbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgdGFibGVTb3J0U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgLypcbiAgICogcGF5bG9hZFxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBwYXlsb2FkOiBEZWNGaWx0ZXI7XG5cbiAgLypcbiAgICogX2VuZHBvaW50IGludGVybmFsbFxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBfZW5kcG9pbnQ6IHN0cmluZztcblxuICAvKlxuICAgKiBfZmlsdGVyXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIF9maWx0ZXI6IERlY0xpc3RGaWx0ZXJDb21wb25lbnQ7XG5cbiAgLypcbiAgICogX25hbWVcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgX25hbWU6IHN0cmluZztcblxuICAvKlxuICAgKiBjdXN0b21GZXRjaE1ldGhvZFxuICAgKlxuICAgKiBtZXRob2QgdXNlZCB0byBmZXRjaCBkYXRhIGZyb20gYmFjay1lbmRcbiAgICovXG4gIEBJbnB1dCgpIGN1c3RvbUZldGNoTWV0aG9kOiBEZWNMaXN0RmV0Y2hNZXRob2Q7XG5cbiAgLypcbiAgICogY29sdW1uc1NvcnRDb25maWdcbiAgICpcbiAgICogdXNlZCB0byBnZXQgYSBzb3J0ZWQgbGlzdCBmcm9tIGJhY2tlbmRcbiAgICogY2FuIGJlIHBhc2VkIHZpYSBhdHRyaWJ1dGUgdG8gc29ydCB0aGUgZmlyc3QgbG9hZFxuICAgKi9cbiAgQElucHV0KCkgY29sdW1uc1NvcnRDb25maWc7XG5cbiAgLypcbiAgICogZGlzYWJsZVNob3dNb3JlQnV0dG9uXG4gICAqXG4gICAqIHVzZWQgdG8gaGlkZSB0aGUgc2hvdyBtb3JlIGJ1dHRvblxuICAgKi9cbiAgQElucHV0KCkgZGlzYWJsZVNob3dNb3JlQnV0dG9uOiBib29sZWFuO1xuXG4gIC8qXG4gICAqIGVuZHBvaW50XG4gICAqXG4gICAqXG4gICAqL1xuICBASW5wdXQoKVxuICBzZXQgZW5kcG9pbnQodjogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuX2VuZHBvaW50ICE9PSB2KSB7XG4gICAgICB0aGlzLl9lbmRwb2ludCA9ICh2WzBdICYmIHZbMF0gPT09ICcvJykgPyB2LnJlcGxhY2UoJy8nLCAnJykgOiB2O1xuICAgIH1cbiAgfVxuXG4gIGdldCBlbmRwb2ludCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9lbmRwb2ludDtcbiAgfVxuXG4gIC8qXG4gICAqIG5hbWVcbiAgICpcbiAgICpcbiAgICovXG4gIEBJbnB1dCgpXG4gIHNldCBuYW1lKHY6IHN0cmluZykge1xuICAgIGlmICh0aGlzLl9uYW1lICE9PSB2KSB7XG4gICAgICB0aGlzLl9uYW1lID0gdjtcbiAgICAgIHRoaXMuc2V0RmlsdGVyc0NvbXBvbmVudHNCYXNlUGF0aEFuZE5hbWVzKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IG5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gIH1cblxuICAvKlxuICAgKiByb3dzXG4gICAqXG4gICAqXG4gICAqL1xuICBASW5wdXQoJ3Jvd3MnKVxuXG4gIHNldCByb3dzKHJvd3MpIHtcbiAgICB0aGlzLnNldFJvd3Mocm93cyk7XG4gIH1cblxuICBnZXQgcm93cygpIHtcbiAgICByZXR1cm4gdGhpcy5yZXBvcnQgPyB0aGlzLnJlcG9ydC5yZXN1bHQucm93cyA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qXG4gICAqIGxpbWl0XG4gICAqXG4gICAqXG4gICAqL1xuICBASW5wdXQoKSBsaW1pdCA9IDEwO1xuXG4gIC8qXG4gICAqIGxpc3RNb2RlXG4gICAqXG4gICAqXG4gICAqL1xuICBASW5wdXQoKSBsaXN0TW9kZTtcblxuICAvKlxuICAgKiBzY3JvbGxhYmxlQ29udGFpbmVyQ2xhc3NcbiAgICpcbiAgICogV2hlcmUgdGhlIHNjcm9sbCB3YXRjaGVyIHNob3VsZCBiZSBsaXN0ZW5pbmdcbiAgICovXG4gIEBJbnB1dCgpIHNjcm9sbGFibGVDb250YWluZXJDbGFzcyA9ICdtYXQtc2lkZW5hdi1jb250ZW50JztcblxuICAvKlxuICAgKiBzZWFyY2hhYmxlUHJvcGVydGllc1xuICAgKlxuICAgKiBQcm9wZXJ0aWVzIHRvIGJlIHNlYXJjaGVkIHdoZW4gdXNpbmcgYmFzaWMgc2VhcmNoXG4gICAqL1xuICBASW5wdXQoKSBzZWFyY2hhYmxlUHJvcGVydGllczogc3RyaW5nW107XG5cbiAgLypcbiAgICogc2hvd0Zvb3RlclxuICAgKlxuICAgKlxuICAgKi9cbiAgQElucHV0KCkgc2hvd0Zvb3RlciA9IHRydWU7XG5cbiAgLypcbiAgICogcG9zdFNlYXJjaFxuICAgKlxuICAgKiBUaGlzIG1pZGRsZXdhcmUgaXMgdXNlZCB0byB0cmlnZ2VyIGV2ZW50cyBhZnRlciBldmVyeSBzZWFyY2hcbiAgICovXG4gIEBPdXRwdXQoKSBwb3N0U2VhcmNoID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgLypcbiAgICogcm93Q2xpY2tcbiAgICpcbiAgICogRW1pdHMgYW4gZXZlbnQgd2hlbiBhIHJvdyBvciBjYXJkIGlzIGNsaWNrZWRcbiAgICovXG4gIEBPdXRwdXQoKSByb3dDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAvKlxuICAgKiBncmlkXG4gICAqXG4gICAqXG4gICAqL1xuICBAQ29udGVudENoaWxkKERlY0xpc3RHcmlkQ29tcG9uZW50KSBncmlkOiBEZWNMaXN0R3JpZENvbXBvbmVudDtcblxuICAvKlxuICAgKiB0YWJsZVxuICAgKlxuICAgKlxuICAgKi9cbiAgQENvbnRlbnRDaGlsZChEZWNMaXN0VGFibGVDb21wb25lbnQpIHRhYmxlOiBEZWNMaXN0VGFibGVDb21wb25lbnQ7XG5cbiAgLypcbiAgICogZmlsdGVyXG4gICAqXG4gICAqXG4gICAqL1xuICBAQ29udGVudENoaWxkKERlY0xpc3RGaWx0ZXJDb21wb25lbnQpXG4gIHNldCBmaWx0ZXIodjogRGVjTGlzdEZpbHRlckNvbXBvbmVudCkge1xuICAgIGlmICh0aGlzLl9maWx0ZXIgIT09IHYpIHtcbiAgICAgIHRoaXMuX2ZpbHRlciA9IHY7XG4gICAgICB0aGlzLnNldEZpbHRlcnNDb21wb25lbnRzQmFzZVBhdGhBbmROYW1lcygpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBmaWx0ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpbHRlcjtcbiAgfVxuXG4gIC8qXG4gICAqIG5nT25Jbml0XG4gICAqXG4gICAqXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHNlcnZpY2U6IERlY0FwaVNlcnZpY2VcbiAgKSB7IH1cblxuICAvKlxuICAgKiBuZ09uSW5pdFxuICAgKlxuICAgKiBTdGFydHMgYSBmcmVzaCBjb21wb25lbnQgYW5kIHByZXBhcmUgaXQgdG8gcnVuXG4gICAqXG4gICAqIC0gU3RhcnQgdGhlIFJlYWN0aXZlIFJlcG9ydFxuICAgKiAtIFN1YnNjcmliZSB0byB0aGUgUmVhY3RpdmUgUmVwb3J0XG4gICAqIC0gU3RhcnQgd2F0Y2hpbmcgd2luZG93IFNjcm9sbFxuICAgKiAtIEVuc3VyZSB1bmlxdWUgbmFtZVxuICAgKi9cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy53YXRjaEZpbHRlckRhdGEoKTtcbiAgICB0aGlzLmVuc3VyZVVuaXF1ZU5hbWUoKTtcbiAgICB0aGlzLmRldGVjdExpc3RNb2RlQmFzZWRPbkdyaWRBbmRUYWJsZVByZXNlbmNlKCk7XG4gIH1cblxuICAvKlxuICAqIG5nQWZ0ZXJWaWV3SW5pdFxuICAqXG4gICogV2FpdCBmb3IgdGhlIHN1YmNvbXBvbmVudHMgdG8gc3RhcnQgYmVmb3JlIHJ1biB0aGUgY29tcG9uZW50XG4gICpcbiAgKiAtIFN0YXJ0IHdhdGNoaW5nIEZpbHRlclxuICAqIC0gRG8gdGhlIGZpcnN0IGxvYWRcbiAgKi9cbiBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICB0aGlzLndhdGNoRmlsdGVyKCk7XG4gICB0aGlzLmRvRmlyc3RMb2FkKCk7XG4gICB0aGlzLmRldGVjdExpc3RNb2RlKCk7XG4gICB0aGlzLndhdGNoVGFic0NoYW5nZSgpO1xuICAgdGhpcy53YXRjaFRhYmxlU29ydCgpO1xuICAgdGhpcy5yZWdpc3RlckNoaWxkV2F0Y2hlcnMoKTtcbiAgIHRoaXMud2F0Y2hTY3JvbGwoKTtcbiAgIHRoaXMud2F0Y2hTY3JvbGxFdmVudEVtaXR0ZXIoKTtcbiAgfVxuXG4gIC8qXG4gICAqIG5nT25EZXN0cm95XG4gICAqXG4gICAqIERlc3Ryb3kgd2F0Y2hlciB0byBmcmVlIG1lZW1vcnkgYW5kIHJlbW92ZSB1bm5lY2Vzc2FyeSB0cmlnZ2Vyc1xuICAgKlxuICAgKiAtIFVuc3Vic2NyaWJlIGZyb20gdGhlIFJlYWN0aXZlIFJlcG9ydFxuICAgKiAtIFN0b3Agd2F0Y2hpbmcgd2luZG93IFNjcm9sbFxuICAgKiAtIFN0b3Agd2F0Y2hpbmcgRmlsdGVyXG4gICAqL1xuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnVuc3Vic2NyaWJlVG9SZWFjdGl2ZVJlcG9ydCgpO1xuICAgIHRoaXMuc3RvcFdhdGNoaW5nU2Nyb2xsKCk7XG4gICAgdGhpcy5zdG9wV2F0Y2hpbmdGaWx0ZXIoKTtcbiAgICB0aGlzLnN0b3BXYXRjaGluZ1RhYnNDaGFuZ2UoKTtcbiAgICB0aGlzLnN0b3BXYXRjaGluZ1RhYmxlU29ydCgpO1xuICAgIHRoaXMuc3RvcFdhdGNoaW5nU2Nyb2xsRXZlbnRFbWl0dGVyKCk7XG4gIH1cblxuICAvKlxuICAgKiByZWxvYWRDb3VudFJlcG9ydFxuICAgKlxuICAgKi9cbiAgcmVsb2FkQ291bnRSZXBvcnQoKSB7XG5cbiAgICBpZiAodGhpcy5maWx0ZXIgJiYgdGhpcy5maWx0ZXIuZmlsdGVycyAmJiB0aGlzLmZpbHRlci5sb2FkQ291bnRSZXBvcnQpIHtcblxuICAgICAgY29uc3QgZW5kcG9pbnQgPSB0aGlzLmVuZHBvaW50W3RoaXMuZW5kcG9pbnQubGVuZ3RoIC0gMV0gPT09ICcvJyA/IGAke3RoaXMuZW5kcG9pbnR9Y291bnRgIDogYCR7dGhpcy5lbmRwb2ludH0vY291bnRgO1xuXG4gICAgICBjb25zdCBmaWx0ZXJzID0gdGhpcy5maWx0ZXIuZmlsdGVycztcblxuICAgICAgY29uc3QgcGF5bG9hZFdpdGhTZWFyY2hhYmxlUHJvcGVydGllcyA9IHRoaXMuZ2V0Q291bnRhYmxlRmlsdGVycyhmaWx0ZXJzKTtcblxuICAgICAgdGhpcy5zZXJ2aWNlLnBvc3QoZW5kcG9pbnQsIHBheWxvYWRXaXRoU2VhcmNoYWJsZVByb3BlcnRpZXMpXG4gICAgICAuc3Vic2NyaWJlKHJlcyA9PiB7XG5cbiAgICAgICAgdGhpcy5jb3VudFJlcG9ydCA9IHRoaXMubW91bnRDb3VudFJlcG9ydChyZXMpO1xuXG4gICAgICAgIHRoaXMuZmlsdGVyLmNvdW50UmVwb3J0ID0gdGhpcy5jb3VudFJlcG9ydDtcblxuICAgICAgfSk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIC8qXG4gICAqIHJlbW92ZUl0ZW1cbiAgICpcbiAgICogUmVtb3ZlcyBhbiBpdGVtIGZyb20gdGhlIGxpc3RcbiAgICovXG4gIHJlbW92ZUl0ZW0oaWQpIHtcblxuICAgIGNvbnN0IGl0ZW0gPSB0aGlzLnJvd3MuZmluZChfaXRlbSA9PiBfaXRlbS5pZCA9PT0gaWQpO1xuXG4gICAgaWYgKGl0ZW0pIHtcblxuICAgICAgY29uc3QgaXRlbUluZGV4ID0gdGhpcy5yb3dzLmluZGV4T2YoaXRlbSk7XG5cbiAgICAgIGlmIChpdGVtSW5kZXggPj0gMCkge1xuXG4gICAgICAgIHRoaXMucm93cy5zcGxpY2UoaXRlbUluZGV4LCAxKTtcblxuICAgICAgfVxuXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZW5kcG9pbnQpIHtcblxuICAgICAgdGhpcy5yZWxvYWRDb3VudFJlcG9ydCgpO1xuXG4gICAgfVxuXG4gIH1cblxuICAvKlxuICAgKiByZXN0YXJ0XG4gICAqXG4gICAqIENsZWFyIHRoZSBsaXN0IGFuZCByZWxvYWQgdGhlIGZpcnN0IHBhZ2VcbiAgICovXG4gIHJlc3RhcnQoKSB7XG5cbiAgICB0aGlzLmxvYWRSZXBvcnQodHJ1ZSk7XG5cbiAgfVxuXG4gIC8qXG4gICAqIHNob3dNb3JlXG4gICAqXG4gICAqL1xuICBzaG93TW9yZSgpIHtcblxuICAgIHJldHVybiB0aGlzLmxvYWRSZXBvcnQoKTtcblxuICB9XG5cbiAgLypcbiAgICogc2VhcmNoQ29sbGFwc2FibGVcbiAgICpcbiAgICogc2VhcmNoIGJ5IGNvbGxhcHNhYmxlIGZpbHRlclxuICAgKi9cbiAgc2VhcmNoQ29sbGFwc2FibGUoZmlsdGVyOiBEZWNMaXN0RmlsdGVyKSB7XG5cbiAgICBpZiAodGhpcy5zZWxlY3RlZENvbGxhcHNhYmxlICE9PSBmaWx0ZXIudWlkKSB7XG5cbiAgICAgIHRoaXMubG9hZEJ5T3Blbm5lZENvbGxhcHNlKGZpbHRlci51aWQpO1xuXG4gICAgfVxuXG4gIH1cblxuICAvKlxuICAgKiB0YWJsZUFuZEdyaWRBcmVTZXRcbiAgICpcbiAgICogUmV0dXJuIHRydWUgaWYgdGhlcmUgYXJlIGJvdGggR1JJRCBhbmQgVEFCTEUgZGVmaW5pdGlvbiBpbnNpZGUgdGhlIGxpc3RcbiAgICovXG4gIHRhYmxlQW5kR3JpZEFyZVNldCgpIHtcbiAgICByZXR1cm4gdGhpcy5ncmlkICYmIHRoaXMudGFibGU7XG4gIH1cblxuICAvKlxuICAgKiB0b2dnbGVMaXN0TW9kZVxuICAgKlxuICAgKiBDaGFuZ2VzIGJldHdlZW4gR1JJRCBhbmQgVEFCTEUgdmlzdWFsaXphdG9pbiBtb2Rlc1xuICAgKi9cbiAgdG9nZ2xlTGlzdE1vZGUoKSB7XG5cbiAgICB0aGlzLmxpc3RNb2RlID0gdGhpcy5saXN0TW9kZSA9PT0gJ2dyaWQnID8gJ3RhYmxlJyA6ICdncmlkJztcblxuICAgIGlmICh0aGlzLmxpc3RNb2RlID09PSAndGFibGUnKSB7XG5cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuXG4gICAgICAgIHRoaXMudGFibGUudGFibGVDb21wb25lbnQucmVjYWxjdWxhdGUoKTtcblxuICAgICAgfSwgMSk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIC8qXG4gICAqIGdldENvbGxhcHNhYmxlQ291bnRcbiAgICpcbiAgICogZ2V0IENvbGxhcHNhYmxlIENvdW50IGZyb20gY291bnRSZXBvcnRcbiAgICovXG4gIGdldENvbGxhcHNhYmxlQ291bnQodWlkKSB7XG5cbiAgICB0cnkge1xuXG4gICAgICByZXR1cm4gdGhpcy5jb3VudFJlcG9ydFt0aGlzLnNlbGVjdGVkVGFiXS5jaGlsZHJlblt1aWRdLmNvdW50O1xuXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcblxuICAgICAgcmV0dXJuICc/JztcblxuICAgIH1cblxuXG4gIH1cblxuICAvKlxuICAgZ2V0TGlzdE1vZGVcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgZ2V0TGlzdE1vZGUgPSAoKSA9PiB7XG5cbiAgICBsZXQgbGlzdE1vZGUgPSB0aGlzLmxpc3RNb2RlO1xuXG4gICAgaWYgKHRoaXMuZmlsdGVyICYmIHRoaXMuZmlsdGVyLnRhYnNGaWx0ZXJDb21wb25lbnQpIHtcblxuICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRUYWIgJiYgdGhpcy5zZWxlY3RlZFRhYi5saXN0TW9kZSkge1xuXG4gICAgICAgIGxpc3RNb2RlID0gdGhpcy5zZWxlY3RlZFRhYi5saXN0TW9kZTtcblxuICAgICAgfSBlbHNlIHtcblxuICAgICAgICBsaXN0TW9kZSA9IHRoaXMudGFibGUgPyAndGFibGUnIDogJ2dyaWQnO1xuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgICByZXR1cm4gbGlzdE1vZGU7XG5cbiAgfVxuXG4gIC8qXG4gICBtb3VudENvdW50UmVwb3J0XG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIG1vdW50Q291bnRSZXBvcnQoZmlsdGVyc0NvdW50ZXJzKTogQ291bnRSZXBvcnQge1xuXG4gICAgY29uc3QgY291bnRSZXBvcnQ6IENvdW50UmVwb3J0ID0ge1xuICAgICAgY291bnQ6IDBcbiAgICB9O1xuXG4gICAgZmlsdGVyc0NvdW50ZXJzLmZvckVhY2goaXRlbSA9PiB7XG5cbiAgICAgIGNvdW50UmVwb3J0W2l0ZW0udWlkXSA9IHtcblxuICAgICAgICBjb3VudDogaXRlbS5jb3VudFxuXG4gICAgICB9O1xuXG4gICAgICBpZiAoaXRlbS5jaGlsZHJlbikge1xuXG4gICAgICAgIGNvdW50UmVwb3J0W2l0ZW0udWlkXS5jaGlsZHJlbiA9IHRoaXMubW91bnRDb3VudFJlcG9ydChpdGVtLmNoaWxkcmVuKTtcblxuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICByZXR1cm4gY291bnRSZXBvcnQ7XG5cbiAgfVxuXG4gIC8qXG4gICAqIGdldENvdW50YWJsZUZpbHRlcnNcbiAgICpcbiAgICogR2V0IHRoZSBzZWFyY2ggZmlsdGVyLCB0cm5zZm9ybWUgdGhlIHNlYXJjaCBwYXJhbXMgaW50byB0aGUgc2VhcmNoYWJsZSBwcm9wZXJ0aWVzIGFuZCBpbmplY3QgaXQgaW4gZXZlcnkgZmlsdGVyIGNvbmZpZ3VyZWQgaW4gZGVjLWZpbHRlcnNcbiAgICpcbiAgICogVGhlIHJlc3VsdCBpcyB1c2VkIHRvIGNhbGwgdGhlIGNvdW50IGVuZHBvaW50IGFuZCByZXR1cm4gdGhlIGFtb3VudCBvZiByZWNjb3JkcyBmb3VuZCBpbiBldmVyeSB0YWIvY29sbGFwc2VcbiAgICpcbiAgICovXG4gIHByaXZhdGUgZ2V0Q291bnRhYmxlRmlsdGVycyhmaWx0ZXJzKSB7XG5cbiAgICBjb25zdCBmaWx0ZXJHcm91cHNXaXRob3V0VGFicyA9IHRoaXMuZmlsdGVyLmZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzIHx8IFt7ZmlsdGVyczogW119XTtcblxuICAgIGNvbnN0IGZpbHRlcnNQbHVzU2VhcmNoID0gZmlsdGVycy5tYXAoZGVjRmlsdGVyID0+IHtcblxuICAgICAgY29uc3QgZGVjRmlsdGVyRmlsdGVyc1BsdXNTZWFyY2ggPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRlY0ZpbHRlcikpO1xuXG4gICAgICBpZiAoZGVjRmlsdGVyRmlsdGVyc1BsdXNTZWFyY2guZmlsdGVycykge1xuXG4gICAgICAgIGNvbnN0IHRhYkZpbHRlcnNDb3B5ID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShkZWNGaWx0ZXJGaWx0ZXJzUGx1c1NlYXJjaC5maWx0ZXJzKSk7XG5cbiAgICAgICAgZGVjRmlsdGVyRmlsdGVyc1BsdXNTZWFyY2guZmlsdGVycyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZmlsdGVyR3JvdXBzV2l0aG91dFRhYnMpKTtcblxuICAgICAgICBkZWNGaWx0ZXJGaWx0ZXJzUGx1c1NlYXJjaC5maWx0ZXJzLmZvckVhY2goZmlsdGVyR3JvdXAgPT4ge1xuXG4gICAgICAgICAgZmlsdGVyR3JvdXAuZmlsdGVycy5wdXNoKC4uLnRhYkZpbHRlcnNDb3B5KTtcblxuICAgICAgICB9KTtcblxuICAgICAgfSBlbHNlIGlmIChkZWNGaWx0ZXJGaWx0ZXJzUGx1c1NlYXJjaC5jaGlsZHJlbikge1xuXG4gICAgICAgIGRlY0ZpbHRlckZpbHRlcnNQbHVzU2VhcmNoLmNoaWxkcmVuID0gdGhpcy5nZXRDb3VudGFibGVGaWx0ZXJzKGRlY0ZpbHRlckZpbHRlcnNQbHVzU2VhcmNoLmNoaWxkcmVuKTtcblxuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICB1aWQ6IGRlY0ZpbHRlckZpbHRlcnNQbHVzU2VhcmNoLnVpZCxcbiAgICAgICAgZmlsdGVyczogZGVjRmlsdGVyRmlsdGVyc1BsdXNTZWFyY2guZmlsdGVycyxcbiAgICAgICAgY2hpbGRyZW46IGRlY0ZpbHRlckZpbHRlcnNQbHVzU2VhcmNoLmNoaWxkcmVuLFxuICAgICAgfTtcblxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuZW5zdXJlRmlsdGVyVmFsdWVzQXNBcnJheShmaWx0ZXJzUGx1c1NlYXJjaCk7XG5cbiAgfVxuXG4gIC8qXG4gICAqIGVuc3VyZUZpbHRlclZhbHVlc0FzQXJyYXlcbiAgICpcbiAgICogR2V0IGFuIGFycmF5IG9mIGZpbHRlcmdyb3VwcyBhbmQgc2V0IHRoZSBmaWx0ZXIgdmFsdWVzIHRvIGFycmF5IGlmIG5vdFxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBlbnN1cmVGaWx0ZXJWYWx1ZXNBc0FycmF5KGZpbHRlckdyb3VwczogYW55ID0gW10pIHtcblxuICAgIHJldHVybiBmaWx0ZXJHcm91cHMubWFwKGRlY0xpc3RGaWx0ZXIgPT4ge1xuXG4gICAgICBpZiAoZGVjTGlzdEZpbHRlci5maWx0ZXJzKSB7XG5cbiAgICAgICAgdGhpcy5hcHBlbmRGaWx0ZXJHcm91cHNCYXNlZE9uU2VhcmNoYWJsZVByb3BlcnRpZXMoZGVjTGlzdEZpbHRlci5maWx0ZXJzKTtcblxuICAgICAgICBkZWNMaXN0RmlsdGVyLmZpbHRlcnMgPSBkZWNMaXN0RmlsdGVyLmZpbHRlcnMubWFwKGZpbHRlckdyb3VwID0+IHtcblxuXG4gICAgICAgICAgZmlsdGVyR3JvdXAuZmlsdGVycyA9IGZpbHRlckdyb3VwLmZpbHRlcnMubWFwKGZpbHRlciA9PiB7XG5cbiAgICAgICAgICAgIGZpbHRlci52YWx1ZSA9IEFycmF5LmlzQXJyYXkoZmlsdGVyLnZhbHVlKSA/IGZpbHRlci52YWx1ZSA6IFtmaWx0ZXIudmFsdWVdO1xuXG4gICAgICAgICAgICByZXR1cm4gZmlsdGVyO1xuXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICByZXR1cm4gZmlsdGVyR3JvdXA7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRlY0xpc3RGaWx0ZXI7XG5cbiAgICB9KTtcblxuICB9XG5cbiAgLypcbiAgICogYWN0QnlTY3JvbGxQb3NpdGlvblxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBkZXRlY3QgaWYgdGhlcmUgaXMgc2Nyb29saW5nIGFjdGlvbiBvbiB3aW5kb3cgdG8gZmV0Y2ggYW5kIHNob3cgbW9yZSByb3dzIHdoZW4gdGhlIHNjcm9sbGluZyBkb3duLlxuICAgKi9cbiAgcHJpdmF0ZSBhY3RCeVNjcm9sbFBvc2l0aW9uID0gKCRldmVudCkgPT4ge1xuXG4gICAgaWYgKCRldmVudFsncGF0aCddKSB7XG5cbiAgICAgIGNvbnN0IGVsZW1lbnRXaXRoQ2RrT3ZlcmxheUNsYXNzID0gJGV2ZW50WydwYXRoJ10uZmluZChwYXRoID0+IHtcblxuICAgICAgICBjb25zdCBjbGFzc05hbWUgPSBwYXRoWydjbGFzc05hbWUnXSB8fCAnJztcblxuICAgICAgICBjb25zdCBpbnNpZGVPdmVybGF5ID0gY2xhc3NOYW1lLmluZGV4T2YoJ2Nkay1vdmVybGF5JykgPj0gMDtcblxuICAgICAgICBjb25zdCBpbnNpZGVGdWxsc2NyZWFuRGlhbG9nQ29udGFpbmVyID0gY2xhc3NOYW1lLmluZGV4T2YoJ2Z1bGxzY3JlYW4tZGlhbG9nLWNvbnRhaW5lcicpID49IDA7XG5cbiAgICAgICAgcmV0dXJuIGluc2lkZU92ZXJsYXkgfHwgaW5zaWRlRnVsbHNjcmVhbkRpYWxvZ0NvbnRhaW5lcjtcblxuICAgICAgfSk7XG5cbiAgICAgIGlmICghZWxlbWVudFdpdGhDZGtPdmVybGF5Q2xhc3MpIHsgLy8gYXZvaWQgY2xvc2luZyBmaWx0ZXIgZnJvbSBhbnkgb3BlbiBkaWFsb2dcblxuICAgICAgICBpZiAoIXRoaXMuaXNMYXN0UGFnZSkge1xuXG4gICAgICAgICAgY29uc3QgdGFyZ2V0OiBhbnkgPSAkZXZlbnRbJ3RhcmdldCddO1xuXG4gICAgICAgICAgY29uc3QgbGltaXQgPSB0YXJnZXQuc2Nyb2xsSGVpZ2h0IC0gdGFyZ2V0LmNsaWVudEhlaWdodDtcblxuICAgICAgICAgIGlmICh0YXJnZXQuc2Nyb2xsVG9wID49IChsaW1pdCAtIDE2KSkge1xuXG4gICAgICAgICAgICB0aGlzLnNob3dNb3JlKCk7XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgfVxuXG4gIH1cblxuICAvKlxuICAgKiBkZXRlY3RMaXN0TW9kZVxuICAgKlxuICAgZ2V0TGlzdE1vZGUgaW5wdXRcbiAgICovXG4gIHByaXZhdGUgZGV0ZWN0TGlzdE1vZGUoKSB7XG5cbiAgICB0aGlzLmdldExpc3RNb2RlKCk7XG5cbiAgfVxuXG4gIC8qXG4gICAqIGRldGVjdExpc3RNb2RlQmFzZWRPbkdyaWRBbmRUYWJsZVByZXNlbmNlKClcbiAgICpcbiAgICogU2V0IHRoZSBsaXN0IG1vZGUgYmFzZWQgb24gZGVjbGFyYXRpb24gb2YgdGFibGUgYW5kIGdyaWQuIFRoaXMgaXMgbmVjZXNzYXJ5IHRvIGJvb3Rhc3RyYXAgdGhlIGNvbXBvbmVudCB3aXRoIG9ubHkgZ3JpZCBvciBvbmx5IHRhYmxlXG4gICAqIFRoaXMgb25seSB3b3JrIGlmIG5vIG1vZGUgaXMgcHJvdmlkZWQgYnkgQElucHV0IG90aGVyd2lzZSB0aGUgQElucHV0IHZhbHVlIHdpbGwgYmUgdXNlZFxuICAgKi9cbiAgcHJpdmF0ZSBkZXRlY3RMaXN0TW9kZUJhc2VkT25HcmlkQW5kVGFibGVQcmVzZW5jZSgpIHtcblxuICAgIHRoaXMubGlzdE1vZGUgPSB0aGlzLmxpc3RNb2RlID8gdGhpcy5saXN0TW9kZSA6IHRoaXMudGFibGUgPyAndGFibGUnIDogJ2dyaWQnO1xuXG4gIH1cblxuICAvKlxuICAgKiBlbWl0U2Nyb2xsRXZlbnRcbiAgICpcbiAgICogRW1pdHMgc2Nyb2xsIGV2ZW50IHdoZW4gbm90IGxvYWRpbmdcbiAgICovXG4gIHByaXZhdGUgZW1pdFNjcm9sbEV2ZW50ID0gKCRldmVudCkgPT4ge1xuXG4gICAgaWYgKCF0aGlzLmxvYWRpbmcpIHtcblxuICAgICAgdGhpcy5zY3JvbGxFdmVudEVtaXRlci5lbWl0KCRldmVudCk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIC8qXG4gICAqIGlzVGFic0ZpbHRlckRlZmluZWRcbiAgICpcbiAgICogUmV0dXJuIHRydWUgaWYgdGhlIFRhYnMgRmlsdGVyIGlzIGRlZmluZWQgaW5zaWRlIHRoZSBsaXN0XG4gICAqL1xuICBwcml2YXRlIGlzVGFic0ZpbHRlckRlZmluZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZmlsdGVyICYmIHRoaXMuZmlsdGVyLnRhYnNGaWx0ZXJDb21wb25lbnQ7XG4gIH1cblxuICAvKlxuICAgKiBkb0ZpcnN0TG9hZFxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBpcyBjYWxsZWQgYWZ0ZXIgdGhlIHZpZXcgYW5kIGlucHV0cyBhcmUgaW5pdGlhbGl6ZWRcbiAgICpcbiAgICogVGhpcyBpcyB0aGUgZmlyc3QgY2FsbCB0byBnZXQgZGF0YVxuICAgKi9cbiAgcHJpdmF0ZSBkb0ZpcnN0TG9hZCgpIHtcbiAgICBpZiAodGhpcy5pc1RhYnNGaWx0ZXJEZWZpbmVkKCkpIHtcbiAgICAgIHRoaXMuZG9GaXJzdExvYWRCeVRhYnNGaWx0ZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kb0ZpcnN0TG9hZExvY2FsbHkodHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogZG9GaXJzdExvYWRCeVRhYnNGaWx0ZXJcbiAgICpcbiAgICogdXNlIHRoZSB0YWJzIGZpbHRlciB0byB0cmlnZ2VyIHRoZSBmaXJzdCBsb2FkXG4gICAqXG4gICAqIFRoaXMgd2F5IHRoZSBkZWZhdWx0IHRhYiBhbmQgZmlsdGVyIGFyZSBzZWxlY3RlZCBieSB0aGUgZGVjdGFic0ZpbHRlciBjb21wb25lbnRcbiAgICpcbiAgICovXG4gIHByaXZhdGUgZG9GaXJzdExvYWRCeVRhYnNGaWx0ZXIoKSB7XG4gICAgdGhpcy5maWx0ZXIudGFic0ZpbHRlckNvbXBvbmVudC5kb0ZpcnN0TG9hZCgpO1xuICB9XG5cbiAgLypcbiAgICogZG9GaXJzdExvYWRMb2NhbGx5XG4gICAqXG4gICAqIElmIG5vIGZpbHRlciBhcmUgZGVmaW5lZCwganVzdCBjYWxsIHRoIGVlbmRwb2ludCB3aXRob3V0IGZpbHRlcnNcbiAgICovXG4gIHByaXZhdGUgZG9GaXJzdExvYWRMb2NhbGx5KHJlZnJlc2gpIHtcbiAgICB0aGlzLmxvYWRSZXBvcnQocmVmcmVzaCk7XG4gIH1cblxuICAvKlxuICAgKiBlbnN1cmVVbmlxdWVOYW1lXG4gICAqXG4gICAqIFdlIG11c3QgcHJvdmlkZSBhbiB1bmlxdWUgbmFtZSB0byB0aGUgbGlzdCBzbyB3ZSBjYW4gcGVyc2lzdCBpdHMgc3RhdGUgaW4gdGhlIFVSTCB3aXRob3V0IGNvbmZsaWN0c1xuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBlbnN1cmVVbmlxdWVOYW1lKCkge1xuICAgIGlmICghdGhpcy5uYW1lKSB7XG4gICAgICBjb25zdCBlcnJvciA9ICdMaXN0Q29tcG9uZW50RXJyb3I6IFRoZSBsaXN0IGNvbXBvbmVudCBtdXN0IGhhdmUgYW4gdW5pcXVlIG5hbWUgdG8gYmUgdXNlZCBpbiB1cmwgZmlsdGVyLidcbiAgICAgICsgJyBQbGVhc2UsIGVuc3VyZSB0aGF0IHlvdSBoYXZlIHBhc3NlZCBhbiB1bmlxdWUgbmFtbWUgdG8gdGhlIGNvbXBvbmVudC4nO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiBsb2FkQnlPcGVubmVkQ29sbGFwc2VcbiAgICpcbiAgICogVGhpcyBtZXRob2QgaXMgdHJpZ2dlcmVkIHdoZW4gYSBjb2xsYXBzYWJsZSB0YWJsZSBpcyBvcGVuLlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBsb2FkQnlPcGVubmVkQ29sbGFwc2UoZmlsdGVyVWlkKSB7XG5cbiAgICBjb25zdCBmaWx0ZXIgPSB0aGlzLmNvbGxhcHNhYmxlRmlsdGVycy5jaGlsZHJlbi5maW5kKGl0ZW0gPT4gaXRlbS51aWQgPT09IGZpbHRlclVpZCk7XG5cbiAgICBjb25zdCBmaWx0ZXJHcm91cDogRmlsdGVyR3JvdXAgPSB7IGZpbHRlcnM6IGZpbHRlci5maWx0ZXJzIH07XG5cbiAgICB0aGlzLmxvYWRSZXBvcnQodHJ1ZSwgZmlsdGVyR3JvdXApO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgIHRoaXMuc2VsZWN0ZWRDb2xsYXBzYWJsZSA9IGZpbHRlci51aWQ7XG5cbiAgICB9LCAwKTtcblxuXG4gIH1cblxuICAvKlxuICAgKiBsb2FkUmVwb3J0XG4gICAqXG4gICAqIFRoaXMgbWVodG9kIGdhdGhlciB0aGUgZmlsdGVyIGluZm8gYW5kIGVuZHBvaW50IGFuZCBjYWxsIHRoZSBiYWNrLWVuZCB0byBmZXRjaCB0aGUgZGF0YVxuICAgKlxuICAgKiBJZiB0aGUgc3VjdG9tRmV0Y2hNZXRob2QgaXMgdXNlZCwgaXRzIGNhbGwgaXRcbiAgICpcbiAgICogSWYgb25seSB0aGUgcm93cyBhcmUgcGFzc2VkLCB0aGUgbWV0aG9kIGp1c3QgdXNlIGl0IGFzIHJlc3VsdFxuICAgKi9cbiAgcHJpdmF0ZSBsb2FkUmVwb3J0KGNsZWFyQW5kUmVsb2FkUmVwb3J0PzogYm9vbGVhbiwgY29sbGFwc2VGaWx0ZXJHcm91cHM/OiBGaWx0ZXJHcm91cCk6IFByb21pc2U8YW55PiB7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XG5cbiAgICAgIGlmIChjbGVhckFuZFJlbG9hZFJlcG9ydCAmJiB0aGlzLnJvd3MpIHtcblxuICAgICAgICB0aGlzLnNldFJvd3ModGhpcy5yb3dzKTtcblxuICAgICAgfVxuXG4gICAgICB0aGlzLmNsZWFyQW5kUmVsb2FkUmVwb3J0ID0gY2xlYXJBbmRSZWxvYWRSZXBvcnQ7XG5cbiAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG5cbiAgICAgIGlmICh0aGlzLmVuZHBvaW50KSB7XG5cbiAgICAgICAgdGhpcy5tb3VudFBheWxvYWQoY2xlYXJBbmRSZWxvYWRSZXBvcnQsIGNvbGxhcHNlRmlsdGVyR3JvdXBzKVxuICAgICAgICAudGhlbihwYXlsb2FkID0+IHtcblxuICAgICAgICAgIHRoaXMucGF5bG9hZCA9IHBheWxvYWQ7XG5cbiAgICAgICAgICB0aGlzLmZpbHRlckRhdGEubmV4dCh7IGVuZHBvaW50OiB0aGlzLmVuZHBvaW50LCBwYXlsb2FkOiB0aGlzLnBheWxvYWQsIGNiazogcmVzLCBjbGVhcjogY2xlYXJBbmRSZWxvYWRSZXBvcnQgfSk7XG5cbiAgICAgICAgfSk7XG5cblxuICAgICAgfSBlbHNlIGlmICh0aGlzLmN1c3RvbUZldGNoTWV0aG9kKSB7XG5cbiAgICAgICAgdGhpcy5maWx0ZXJEYXRhLm5leHQoKTtcblxuICAgICAgfSBlbHNlIGlmICghdGhpcy5yb3dzKSB7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgICAgICBpZiAoIXRoaXMucm93cykge1xuXG4gICAgICAgICAgICByZWooJ05vIGVuZHBvaW50LCBjdXN0b21GZXRjaE1ldGhvZCBvciByb3dzIHNldCcpO1xuXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgfSwgMSk7XG5cbiAgICAgIH1cblxuICAgIH0pO1xuXG4gIH1cblxuICBwcml2YXRlIG1vdW50UGF5bG9hZChjbGVhckFuZFJlbG9hZFJlcG9ydDogYm9vbGVhbiA9IGZhbHNlLCBjb2xsYXBzZUZpbHRlckdyb3Vwcz8pIHtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICAgIGNvbnN0IHNlYXJjaEZpbHRlckdyb3VwcyA9IHRoaXMuZmlsdGVyID8gdGhpcy5maWx0ZXIuZmlsdGVyR3JvdXBzIDogdW5kZWZpbmVkO1xuXG4gICAgICBjb25zdCBmaWx0ZXJHcm91cHMgPSB0aGlzLmFwcGVuZEZpbHRlckdyb3Vwc1RvRWFjaEZpbHRlckdyb3VwKHNlYXJjaEZpbHRlckdyb3VwcywgY29sbGFwc2VGaWx0ZXJHcm91cHMpO1xuXG4gICAgICBjb25zdCBwYXlsb2FkOiBEZWNGaWx0ZXIgPSB7fTtcblxuICAgICAgcGF5bG9hZC5saW1pdCA9IHRoaXMubGltaXQ7XG5cbiAgICAgIGlmIChmaWx0ZXJHcm91cHMpIHtcblxuICAgICAgICBwYXlsb2FkLmZpbHRlckdyb3VwcyA9IGZpbHRlckdyb3VwcztcblxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5jb2x1bW5zU29ydENvbmZpZykge1xuXG4gICAgICAgIHBheWxvYWQuc29ydCA9IHRoaXMuY29sdW1uc1NvcnRDb25maWc7XG5cbiAgICAgIH1cblxuICAgICAgaWYgKCFjbGVhckFuZFJlbG9hZFJlcG9ydCAmJiB0aGlzLnJlcG9ydCkge1xuXG4gICAgICAgIHBheWxvYWQucGFnZSA9IHRoaXMucmVwb3J0LnBhZ2UgKyAxO1xuXG4gICAgICAgIHBheWxvYWQubGltaXQgPSB0aGlzLnJlcG9ydC5saW1pdDtcblxuICAgICAgfVxuXG4gICAgICByZXNvbHZlKHBheWxvYWQpO1xuXG4gICAgfSk7XG5cbiAgfVxuXG4gIC8qXG4gICAqIGFwcGVuZEZpbHRlckdyb3Vwc1RvRWFjaEZpbHRlckdyb3VwXG4gICAqXG4gICAqIEdldHMgYW4gYXJyYXkgb2YgZmlsdGVyR3JvdXAgYW5kIGluIGVhY2ggZmlsdGVyR3JvdXAgaW4gdGhpcyBhcnJheSBhcHBlbmRzIHRoZSBzZWNvbmQgZmlsdGVyR3JvdXAgZmlsdGVycy5cbiAgICovXG4gIHByaXZhdGUgYXBwZW5kRmlsdGVyR3JvdXBzVG9FYWNoRmlsdGVyR3JvdXAoZmlsdGVyR3JvdXBzOiBGaWx0ZXJHcm91cHMsIGZpbHRlckdyb3VwVG9BcHBlbmQ6IEZpbHRlckdyb3VwKSB7XG5cbiAgICBpZiAoZmlsdGVyR3JvdXBUb0FwcGVuZCkge1xuXG4gICAgICBpZiAoZmlsdGVyR3JvdXBzICYmIGZpbHRlckdyb3Vwcy5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgZmlsdGVyR3JvdXBzLmZvckVhY2goZ3JvdXAgPT4ge1xuXG4gICAgICAgICAgZ3JvdXAuZmlsdGVycy5wdXNoKC4uLmZpbHRlckdyb3VwVG9BcHBlbmQuZmlsdGVycyk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgZmlsdGVyR3JvdXBzID0gW2ZpbHRlckdyb3VwVG9BcHBlbmRdO1xuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgICByZXR1cm4gZmlsdGVyR3JvdXBzIHx8IFtdO1xuXG4gIH1cblxuICAvKlxuICAgKiBzZXRGaWx0ZXJzQ29tcG9uZW50c0Jhc2VQYXRoQW5kTmFtZXNcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc2V0RmlsdGVyc0NvbXBvbmVudHNCYXNlUGF0aEFuZE5hbWVzKCkge1xuXG4gICAgaWYgKHRoaXMuZmlsdGVyKSB7XG5cbiAgICAgIHRoaXMuZmlsdGVyLm5hbWUgPSB0aGlzLm5hbWU7XG5cblxuICAgICAgaWYgKHRoaXMuZmlsdGVyLnRhYnNGaWx0ZXJDb21wb25lbnQpIHtcblxuICAgICAgICB0aGlzLmZpbHRlci50YWJzRmlsdGVyQ29tcG9uZW50Lm5hbWUgPSB0aGlzLm5hbWU7XG5cbiAgICAgICAgaWYgKHRoaXMuY3VzdG9tRmV0Y2hNZXRob2QpIHtcblxuICAgICAgICAgIHRoaXMuZmlsdGVyLnRhYnNGaWx0ZXJDb21wb25lbnQuY3VzdG9tRmV0Y2hNZXRob2QgPSB0aGlzLmN1c3RvbUZldGNoTWV0aG9kO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICB0aGlzLmZpbHRlci50YWJzRmlsdGVyQ29tcG9uZW50LnNlcnZpY2UgPSB0aGlzLnNlcnZpY2U7XG5cbiAgICAgICAgfVxuXG5cblxuICAgICAgfVxuXG4gICAgfVxuXG4gIH1cblxuICAvKlxuICAgKiBzZXRSb3dzXG4gICAqXG4gICAqIFNldHMgdGhlIGN1cnJlbnQgdGFibGUgcm93c1xuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzZXRSb3dzKHJvd3MgPSBbXSkge1xuXG4gICAgdGhpcy5yZXBvcnQgPSB7XG5cbiAgICAgIHBhZ2U6IDEsXG5cbiAgICAgIHJlc3VsdDoge1xuXG4gICAgICAgIHJvd3M6IHJvd3MsXG5cbiAgICAgICAgY291bnQ6IHJvd3MubGVuZ3RoXG5cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5kZXRlY3RMYXN0UGFnZShyb3dzLCByb3dzLmxlbmd0aCk7XG5cbiAgICB0aGlzLnVwZGF0ZUNvbnRlbnRDaGlsZHJlbigpO1xuICB9XG5cbiAgLypcbiAgICogd2F0Y2hTY3JvbGxFdmVudEVtaXR0ZXJcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgd2F0Y2hTY3JvbGxFdmVudEVtaXR0ZXIoKSB7XG5cbiAgICB0aGlzLnNjcm9sbEV2ZW50RW1pdGVyU3Vic2NyaXB0aW9uID0gdGhpcy5zY3JvbGxFdmVudEVtaXRlclxuICAgIC5waXBlKFxuICAgICAgZGVib3VuY2VUaW1lKDE1MCksXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpXG4gICAgKS5zdWJzY3JpYmUodGhpcy5hY3RCeVNjcm9sbFBvc2l0aW9uKTtcblxuICB9XG5cbiAgLypcbiAgICogc3RvcFdhdGNoaW5nU2Nyb2xsRXZlbnRFbWl0dGVyXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHN0b3BXYXRjaGluZ1Njcm9sbEV2ZW50RW1pdHRlcigpIHtcblxuICAgIGlmICh0aGlzLnNjcm9sbEV2ZW50RW1pdGVyU3Vic2NyaXB0aW9uKSB7XG5cbiAgICAgIHRoaXMuc2Nyb2xsRXZlbnRFbWl0ZXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcblxuICAgIH1cblxuICB9XG5cbiAgLypcbiAgICogd2F0Y2hGaWx0ZXJEYXRhXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHdhdGNoRmlsdGVyRGF0YSgpIHtcbiAgICB0aGlzLnJlYWN0aXZlUmVwb3J0ID0gdGhpcy5maWx0ZXJEYXRhXG4gICAgLnBpcGUoXG4gICAgICBkZWJvdW5jZVRpbWUoMTUwKSwgLy8gYXZvaWQgbXVpbHRpcGxlIHJlcXVlc3Qgd2hlbiB0aGUgZmlsdGVyIG9yIHRhYiBjaGFuZ2UgdG9vIGZhc3RcbiAgICAgIHN3aXRjaE1hcCgoZmlsdGVyRGF0YTogRmlsdGVyRGF0YSkgPT4ge1xuXG4gICAgICAgIGNvbnN0IG9ic2VydmFibGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueT4odW5kZWZpbmVkKTtcblxuICAgICAgICBjb25zdCBmZXRjaE1ldGhvZDogRGVjTGlzdEZldGNoTWV0aG9kID0gdGhpcy5jdXN0b21GZXRjaE1ldGhvZCB8fCB0aGlzLnNlcnZpY2UuZ2V0O1xuXG4gICAgICAgIGNvbnN0IGVuZHBvaW50ID0gZmlsdGVyRGF0YSA/IGZpbHRlckRhdGEuZW5kcG9pbnQgOiB1bmRlZmluZWQ7XG5cbiAgICAgICAgY29uc3QgcGF5bG9hZFdpdGhTZWFyY2hhYmxlUHJvcGVydGllcyA9IHRoaXMuZ2V0UGF5bG9hZFdpdGhTZWFyY2hUcmFuc2Zvcm1lZEludG9TZWFyY2hhYmxlUHJvcGVydGllcyh0aGlzLnBheWxvYWQpO1xuXG4gICAgICAgIGlmIChmaWx0ZXJEYXRhICYmIGZpbHRlckRhdGEuY2xlYXIpIHtcbiAgICAgICAgICB0aGlzLnNldFJvd3MoW10pO1xuICAgICAgICB9XG5cbiAgICAgICAgZmV0Y2hNZXRob2QoZW5kcG9pbnQsIHBheWxvYWRXaXRoU2VhcmNoYWJsZVByb3BlcnRpZXMpXG4gICAgICAgIC5zdWJzY3JpYmUocmVzID0+IHtcblxuICAgICAgICAgIG9ic2VydmFibGUubmV4dChyZXMpO1xuXG4gICAgICAgICAgaWYgKGZpbHRlckRhdGEgJiYgZmlsdGVyRGF0YS5jYmspIHtcblxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IC8vIHdhaXQgZm9yIHN1YnNjcmliZXJzIHRvIHJlZnJlc2ggdGhlaXIgcm93c1xuXG4gICAgICAgICAgICAgIGZpbHRlckRhdGEuY2JrKG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWopID0+IHtcblxuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzKTtcblxuICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgIH0sIDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZTtcbiAgICAgIH0pXG5cbiAgICApO1xuICAgIHRoaXMuc3Vic2NyaWJlVG9SZWFjdGl2ZVJlcG9ydCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRQYXlsb2FkV2l0aFNlYXJjaFRyYW5zZm9ybWVkSW50b1NlYXJjaGFibGVQcm9wZXJ0aWVzKHBheWxvYWQpIHtcblxuICAgIGNvbnN0IHBheWxvYWRDb3B5ID0gey4uLnBheWxvYWR9O1xuXG4gICAgaWYgKHBheWxvYWRDb3B5LmZpbHRlckdyb3VwcyAmJiB0aGlzLnNlYXJjaGFibGVQcm9wZXJ0aWVzKSB7XG5cbiAgICAgIHBheWxvYWRDb3B5LmZpbHRlckdyb3VwcyA9IFsuLi5wYXlsb2FkLmZpbHRlckdyb3Vwc107XG5cbiAgICAgIHRoaXMuYXBwZW5kRmlsdGVyR3JvdXBzQmFzZWRPblNlYXJjaGFibGVQcm9wZXJ0aWVzKHBheWxvYWRDb3B5LmZpbHRlckdyb3Vwcyk7XG5cbiAgICAgIHJldHVybiBwYXlsb2FkQ29weTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHJldHVybiB0aGlzLnBheWxvYWQ7XG5cbiAgICB9XG5cbiAgfVxuXG4gIHByaXZhdGUgYXBwZW5kRmlsdGVyR3JvdXBzQmFzZWRPblNlYXJjaGFibGVQcm9wZXJ0aWVzKGZpbHRlckdyb3Vwcykge1xuXG4gICAgY29uc3QgZmlsdGVyR3JvdXBUaGF0Q29udGFpbnNCYXNpY1NlYXJjaCA9IHRoaXMuZ2V0RmlsdGVyR3JvdXBUaGF0Q29udGFpbnNUaGVCYXNpY1NlYXJjaChmaWx0ZXJHcm91cHMpO1xuXG4gICAgaWYgKGZpbHRlckdyb3VwVGhhdENvbnRhaW5zQmFzaWNTZWFyY2gpIHtcblxuICAgICAgdGhpcy5yZW1vdmVGaWx0ZXJHcm91cChmaWx0ZXJHcm91cHMsIGZpbHRlckdyb3VwVGhhdENvbnRhaW5zQmFzaWNTZWFyY2gpO1xuXG4gICAgICBjb25zdCBiYXNpY1NlYXJjaCA9IGZpbHRlckdyb3VwVGhhdENvbnRhaW5zQmFzaWNTZWFyY2guZmlsdGVycy5maW5kKGZpbHRlciA9PiBmaWx0ZXIucHJvcGVydHkgPT09ICdzZWFyY2gnKTtcblxuICAgICAgY29uc3QgYmFzaWNTZWFyY2hJbmRleCA9IGZpbHRlckdyb3VwVGhhdENvbnRhaW5zQmFzaWNTZWFyY2guZmlsdGVycy5pbmRleE9mKGJhc2ljU2VhcmNoKTtcblxuICAgICAgdGhpcy5zZWFyY2hhYmxlUHJvcGVydGllcy5mb3JFYWNoKHByb3BlcnR5ID0+IHtcblxuICAgICAgICBjb25zdCBuZXdGaWx0ZXJHcm91cDogRmlsdGVyR3JvdXAgPSB7XG4gICAgICAgICAgZmlsdGVyczogWy4uLmZpbHRlckdyb3VwVGhhdENvbnRhaW5zQmFzaWNTZWFyY2guZmlsdGVyc11cbiAgICAgICAgfTtcblxuICAgICAgICBuZXdGaWx0ZXJHcm91cC5maWx0ZXJzW2Jhc2ljU2VhcmNoSW5kZXhdID0ge1xuICAgICAgICAgIHByb3BlcnR5OiBwcm9wZXJ0eSxcbiAgICAgICAgICB2YWx1ZTogW2Jhc2ljU2VhcmNoLnZhbHVlXVxuICAgICAgICB9O1xuXG4gICAgICAgIGZpbHRlckdyb3Vwcy5wdXNoKG5ld0ZpbHRlckdyb3VwKTtcblxuICAgICAgfSk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlRmlsdGVyR3JvdXAoZmlsdGVyR3JvdXBzLCBmaWx0ZXJHcm91cFRoYXRDb250YWluc0Jhc2ljU2VhcmNoKSB7XG5cbiAgICBjb25zdCBmaWx0ZXJHcm91cFRoYXRDb250YWluc0Jhc2ljU2VhcmNoSW5kZXggPSBmaWx0ZXJHcm91cHMuaW5kZXhPZihmaWx0ZXJHcm91cFRoYXRDb250YWluc0Jhc2ljU2VhcmNoKTtcblxuICAgIGZpbHRlckdyb3Vwcy5zcGxpY2UoZmlsdGVyR3JvdXBUaGF0Q29udGFpbnNCYXNpY1NlYXJjaEluZGV4LCAxKTtcblxuICB9XG5cbiAgcHJpdmF0ZSBnZXRGaWx0ZXJHcm91cFRoYXRDb250YWluc1RoZUJhc2ljU2VhcmNoKGZpbHRlckdyb3Vwcykge1xuXG4gICAgcmV0dXJuIGZpbHRlckdyb3Vwcy5maW5kKGZpbHRlckdyb3VwID0+IHtcblxuICAgICAgY29uc3QgYmFzaWNTZXJjaEZpbHRlciA9IGZpbHRlckdyb3VwLmZpbHRlcnMgPyBmaWx0ZXJHcm91cC5maWx0ZXJzLmZpbmQoZmlsdGVyID0+IGZpbHRlci5wcm9wZXJ0eSA9PT0gJ3NlYXJjaCcpIDogdW5kZWZpbmVkO1xuXG4gICAgICByZXR1cm4gYmFzaWNTZXJjaEZpbHRlciA/IHRydWUgOiBmYWxzZTtcblxuICAgIH0pO1xuXG4gIH1cblxuICAvKlxuICAgKiBzdWJzY3JpYmVUb1JlYWN0aXZlUmVwb3J0XG4gICAqXG4gICAqL1xuICBwcml2YXRlIHN1YnNjcmliZVRvUmVhY3RpdmVSZXBvcnQoKSB7XG4gICAgdGhpcy5yZWFjdGl2ZVJlcG9ydFN1YnNjcmlwdGlvbiA9IHRoaXMucmVhY3RpdmVSZXBvcnRcbiAgICAucGlwZShcbiAgICAgIHRhcChyZXMgPT4ge1xuICAgICAgICBpZiAocmVzKSB7XG4gICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKVxuICAgIC5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICBpZiAoZGF0YSAmJiBkYXRhLnJlc3VsdCAmJiBkYXRhLnJlc3VsdC5yb3dzKSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLmNsZWFyQW5kUmVsb2FkUmVwb3J0KSB7XG4gICAgICAgICAgZGF0YS5yZXN1bHQucm93cyA9IHRoaXMucmVwb3J0LnJlc3VsdC5yb3dzLmNvbmNhdChkYXRhLnJlc3VsdC5yb3dzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVwb3J0ID0gZGF0YTtcblxuICAgICAgICB0aGlzLnBvc3RTZWFyY2guZW1pdChkYXRhKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZUNvbnRlbnRDaGlsZHJlbigpO1xuXG4gICAgICAgIHRoaXMuZGV0ZWN0TGFzdFBhZ2UoZGF0YS5yZXN1bHQucm93cywgZGF0YS5yZXN1bHQuY291bnQpO1xuXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBkZXRlY3RMYXN0UGFnZShyb3dzLCBjb3VudCkge1xuXG4gICAgY29uc3QgbnVtYmVyT2Zyb3dzID0gcm93cy5sZW5ndGg7XG5cbiAgICBjb25zdCBlbXB0TGlzdCA9IG51bWJlck9mcm93cyA9PT0gMDtcblxuICAgIGNvbnN0IHNpbmdsZVBhZ2VMaXN0ID0gbnVtYmVyT2Zyb3dzID09PSBjb3VudDtcblxuICAgIHRoaXMuaXNMYXN0UGFnZSA9IGVtcHRMaXN0IHx8IHNpbmdsZVBhZ2VMaXN0O1xuXG4gIH1cblxuICAvKlxuICAgKiB1bnN1YnNjcmliZVRvUmVhY3RpdmVSZXBvcnRcbiAgICpcbiAgICovXG4gIHByaXZhdGUgdW5zdWJzY3JpYmVUb1JlYWN0aXZlUmVwb3J0KCkge1xuICAgIGlmICh0aGlzLnJlYWN0aXZlUmVwb3J0U3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnJlYWN0aXZlUmVwb3J0U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogdXBkYXRlQ29udGVudENoaWxkcmVuXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHVwZGF0ZUNvbnRlbnRDaGlsZHJlbigpIHtcblxuICAgIGNvbnN0IHJvd3MgPSB0aGlzLmVuZHBvaW50ID8gdGhpcy5yZXBvcnQucmVzdWx0LnJvd3MgOiB0aGlzLnJvd3M7XG4gICAgaWYgKHRoaXMuZ3JpZCkge1xuICAgICAgdGhpcy5ncmlkLnJvd3MgPSByb3dzO1xuICAgIH1cbiAgICBpZiAodGhpcy50YWJsZSkge1xuICAgICAgdGhpcy50YWJsZS5yb3dzID0gcm93cztcbiAgICB9XG4gICAgaWYgKHRoaXMuZmlsdGVyKSB7XG4gICAgICB0aGlzLmZpbHRlci5jb3VudCA9IHRoaXMucmVwb3J0LnJlc3VsdC5jb3VudDtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiByZWdpc3RlckNoaWxkV2F0Y2hlcnNcbiAgICpcbiAgICogV2F0Y2ggZm9yIGNoaWxkcmVuIG91dHB1dHNcbiAgICovXG4gIHByaXZhdGUgcmVnaXN0ZXJDaGlsZFdhdGNoZXJzKCkge1xuXG4gICAgaWYgKHRoaXMuZ3JpZCkge1xuICAgICAgdGhpcy53YXRjaEdyaWRSb3dDbGljaygpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnRhYmxlKSB7XG4gICAgICB0aGlzLndhdGNoVGFibGVSb3dDbGljaygpO1xuICAgIH1cblxuICB9XG5cbiAgLypcbiAgICogd2F0Y2hHcmlkUm93Q2xpY2tcbiAgICpcbiAgICovXG4gIHByaXZhdGUgd2F0Y2hHcmlkUm93Q2xpY2soKSB7XG4gICAgdGhpcy5ncmlkLnJvd0NsaWNrLnN1YnNjcmliZSgoJGV2ZW50KSA9PiB7XG4gICAgICB0aGlzLnJvd0NsaWNrLmVtaXQoJGV2ZW50KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qXG4gICAqIHdhdGNoVGFibGVSb3dDbGlja1xuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB3YXRjaFRhYmxlUm93Q2xpY2soKSB7XG4gICAgdGhpcy50YWJsZS5yb3dDbGljay5zdWJzY3JpYmUoKCRldmVudCkgPT4ge1xuICAgICAgdGhpcy5yb3dDbGljay5lbWl0KCRldmVudCk7XG4gICAgfSk7XG4gIH1cblxuICAvKlxuICAgKiB3YXRjaEZpbHRlclxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB3YXRjaEZpbHRlcigpIHtcbiAgICBpZiAodGhpcy5maWx0ZXIpIHtcbiAgICAgIHRoaXMuZmlsdGVyU3Vic2NyaXB0aW9uID0gdGhpcy5maWx0ZXIuc2VhcmNoLnN1YnNjcmliZShldmVudCA9PiB7XG5cbiAgICAgICAgY29uc3QgdGFiQ2hhbmdlZCA9IHRoaXMucHJldmlvdXNTZWxlY3RlZFRhYiAhPT0gdGhpcy5zZWxlY3RlZFRhYjtcblxuICAgICAgICBjb25zdCBmaWx0ZXJNb2RlQ2hhbmdlZCA9IHRoaXMuZmlsdGVyTW9kZSAhPT0gZXZlbnQuZmlsdGVyTW9kZTtcblxuICAgICAgICBpZiAodGFiQ2hhbmdlZCkge1xuXG4gICAgICAgICAgdGhpcy5wcmV2aW91c1NlbGVjdGVkVGFiID0gdGhpcy5zZWxlY3RlZFRhYjtcblxuICAgICAgICAgIHRoaXMuc2V0Um93cyhbXSk7IC8vIGlmIGNoYW5naW5nIHRhYnMsIGNsZWFyIHRoZSByZXN1bHRzIGJlZm9yZSBzaG93aW5nIHRoZSByb3dzIGJlY2F1c2UgaXQgaXMgZG9uZSBvbmx5IGFmdGVyIGZldGNoaW5nIHRoZSBkYXRhXG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmaWx0ZXJNb2RlQ2hhbmdlZCkge1xuXG4gICAgICAgICAgdGhpcy5maWx0ZXJNb2RlID0gZXZlbnQuZmlsdGVyTW9kZTtcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZmlsdGVyTW9kZSA9PT0gJ3RhYnMnKSB7XG5cbiAgICAgICAgICB0aGlzLnNlbGVjdGVkQ29sbGFwc2FibGUgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICB0aGlzLmNvbGxhcHNhYmxlRmlsdGVycyA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgIHRoaXMubG9hZFJlcG9ydCh0cnVlKS50aGVuKChyZXMpID0+IHtcblxuICAgICAgICAgICAgaWYgKGV2ZW50LnJlY291bnQpIHtcblxuICAgICAgICAgICAgICB0aGlzLnJlbG9hZENvdW50UmVwb3J0KCk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICBpZiAoIXRoaXMuY291bnRSZXBvcnQgfHwgZXZlbnQucmVjb3VudCkge1xuXG4gICAgICAgICAgICB0aGlzLnJlbG9hZENvdW50UmVwb3J0KCk7XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZENvbGxhcHNhYmxlICYmICF0YWJDaGFuZ2VkKSB7XG5cbiAgICAgICAgICAgIHRoaXMubG9hZEJ5T3Blbm5lZENvbGxhcHNlKHRoaXMuc2VsZWN0ZWRDb2xsYXBzYWJsZSk7XG5cbiAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkQ29sbGFwc2FibGUgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgIHRoaXMuY29sbGFwc2FibGVGaWx0ZXJzID0ge1xuICAgICAgICAgICAgICB0YWI6IHRoaXMuc2VsZWN0ZWRUYWIsXG4gICAgICAgICAgICAgIGNoaWxkcmVuOiBldmVudC5jaGlsZHJlbiA/IGV2ZW50LmNoaWxkcmVuIDogW11cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiB3YXRjaEZpbHRlclxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzdG9wV2F0Y2hpbmdGaWx0ZXIoKSB7XG4gICAgaWYgKHRoaXMuZmlsdGVyU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLmZpbHRlclN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIHdhdGNoU2Nyb2xsXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHdhdGNoU2Nyb2xsKCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5zY3JvbGxhYmxlQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLnNjcm9sbGFibGVDb250YWluZXJDbGFzcylbMF07XG4gICAgICBpZiAodGhpcy5zY3JvbGxhYmxlQ29udGFpbmVyKSB7XG4gICAgICAgIHRoaXMuc2Nyb2xsYWJsZUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLmVtaXRTY3JvbGxFdmVudCwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfSwgMSk7XG4gIH1cblxuICAvKlxuICAgKiBzdG9wV2F0Y2hpbmdTY3JvbGxcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc3RvcFdhdGNoaW5nU2Nyb2xsKCkge1xuICAgIGlmICh0aGlzLnNjcm9sbGFibGVDb250YWluZXIpIHtcbiAgICAgIHRoaXMuc2Nyb2xsYWJsZUNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLmVtaXRTY3JvbGxFdmVudCwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogc3Vic2NyaWJlVG9SZWFjdGl2ZVJlcG9ydFxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB3YXRjaFRhYnNDaGFuZ2UoKSB7XG4gICAgaWYgKHRoaXMuZmlsdGVyICYmIHRoaXMuZmlsdGVyLnRhYnNGaWx0ZXJDb21wb25lbnQpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRUYWIgPSB0aGlzLmZpbHRlci50YWJzRmlsdGVyQ29tcG9uZW50LnNlbGVjdGVkVGFiO1xuICAgICAgdGhpcy50YWJzQ2hhbmdlU3Vic2NyaXB0aW9uID0gdGhpcy5maWx0ZXIudGFic0ZpbHRlckNvbXBvbmVudC50YWJDaGFuZ2Uuc3Vic2NyaWJlKHRhYiA9PiB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRUYWIgPSB0YWI7XG4gICAgICAgIHRoaXMuZGV0ZWN0TGlzdE1vZGUoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIHN1YnNjcmliZVRvVGFic0NoYW5nZVxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzdG9wV2F0Y2hpbmdUYWJzQ2hhbmdlKCkge1xuICAgIGlmICh0aGlzLnRhYnNDaGFuZ2VTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMudGFic0NoYW5nZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIHdhdGNoVGFibGVTb3J0XG4gICAqXG4gICAqL1xuICBwcml2YXRlIHdhdGNoVGFibGVTb3J0KCkge1xuICAgIGlmICh0aGlzLnRhYmxlKSB7XG5cbiAgICAgIHRoaXMudGFibGVTb3J0U3Vic2NyaXB0aW9uID0gdGhpcy50YWJsZS5zb3J0LnN1YnNjcmliZShjb2x1bW5zU29ydENvbmZpZyA9PiB7XG5cbiAgICAgICAgaWYgKHRoaXMuY29sdW1uc1NvcnRDb25maWcgIT09IGNvbHVtbnNTb3J0Q29uZmlnKSB7XG5cbiAgICAgICAgICB0aGlzLmNvbHVtbnNTb3J0Q29uZmlnID0gY29sdW1uc1NvcnRDb25maWc7XG5cbiAgICAgICAgICBpZiAodGhpcy5jb2xsYXBzYWJsZUZpbHRlcnMpIHtcblxuICAgICAgICAgICAgdGhpcy5sb2FkQnlPcGVubmVkQ29sbGFwc2UodGhpcy5zZWxlY3RlZENvbGxhcHNhYmxlKTtcblxuICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHRoaXMubG9hZFJlcG9ydCh0cnVlKTtcblxuICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIHN0b3BXYXRjaGluZ1RhYmxlU29ydFxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzdG9wV2F0Y2hpbmdUYWJsZVNvcnQoKSB7XG4gICAgaWYgKHRoaXMudGFibGVTb3J0U3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnRhYmxlU29ydFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG59XG4iXX0=