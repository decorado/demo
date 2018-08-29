import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ContentChildren, QueryList, ContentChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DecTabComponent } from './tab/tab.component';
import { DecTabMenuComponent } from './tab-menu/tab-menu.component';

@Component({
  selector: 'dec-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class DecTabsComponent implements OnInit, AfterViewInit, OnDestroy {

  @ContentChildren(DecTabComponent) tabs: QueryList<DecTabComponent>;

  @ContentChild(DecTabMenuComponent) tabMenuComponent: DecTabMenuComponent;

  @Input() hidden; // hides the tabs group to reload its contents

  @Input() persist = true;

  @Input() destroyOnBlur = false;

  @Input() name: string;

  @Input() padding = true;

  @Input()
  set activeTab(v: string) {
    if (v && this._activeTab !== v) {
      this._activeTab = v;
      this.persistTab(v);
    }
  }
  get activeTab() {
    return this._activeTab;
  }

  @Output() activeTabChange: EventEmitter<string> = new EventEmitter<string>();

  get activeTabIndex(): number {
    return this._activeTabIndex;
  }

  get activeTabObject(): any {
    return this._activeTabObject;
  }

  private _activeTab: string;

  private _activeTabIndex: number;

  private _activeTabObject: any;

  private activatedTabs: any = {};

  private queryParamsSubscription: Subscription;

  private pathFromRoot = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.ensureUniqueName();
    this.watchTabInUrlQuery();
  }

  ngAfterViewInit() {
    this.ensureUniqueTabNames()
    .then(() => {
      const queryParams: Params = Object.assign({}, this.route.snapshot.queryParams);
      if (queryParams && queryParams[this.componentTabName()]) {
        const currentTab = queryParams[this.componentTabName()];
        this.selectTab(currentTab);
      } else {
        this.startSelectedTab();
      }
    });

  }

  ngOnDestroy() {
    this.stopWatchingTabInUrlQuery();
  }

  shouldTabBeDisplayed(tab) {
    const isSelected = this._activeTabObject === tab;
    const isActivated = this.activatedTabs[tab.name];
    return isSelected || (!this.destroyOnBlur && isActivated);
  }

  onChangeTab($event) {
    const activeTabObject = this.tabs.toArray()[$event.index];
    this.activeTab = activeTabObject.name;
  }

  parseTotal(total) {

    return total !== null && total >= 0 ?  total : '?';

  }

  reset() {

    this.hidden = true;

    setTimeout(() => {

      this.hidden = false;

    }, 10);

  }

  private componentTabName() {
    return this.name + '-tab';
  }

  private ensureUniqueName = () => {
    if (!this.name) {
      throw new Error('DecTabComponentError: The tab component must have an unique name. Please, ensure that you have passed an unique namme to the component.');
    }
  }

  /* ensureUniqueTabNames
   * This method prevents the use of the same name for more than one tab
   * what would ending up conflicting the tabs activation once this is done via tab name
  */

  private ensureUniqueTabNames = () => {
    return new Promise<any>((res, rej) => {
      const names = {};
      this.tabs.toArray().forEach(tab => {
        if (!names[tab.name]) {
          names[tab.name] = true;
        } else {
           throw new Error(`DecTabComponentError: The <dec-tabs> component must have an unique name. The name ${tab.name} was used more than once.`);
        }
      });
      res();
    });
  }

  private persistTab(tab) {
    if (this.persist) {
      const queryParams: Params = Object.assign({}, this.route.snapshot.queryParams);
      queryParams[this.componentTabName()] = tab;
      this.router.navigate(['.'], { relativeTo: this.route, queryParams: queryParams, replaceUrl: true });
    }
  }

  private selectTab = (tabName) => {
    if (this.tabs) {
      this.activeTab = tabName;
      this.activatedTabs[tabName] = true;
      this._activeTabObject = this.tabs.toArray().filter(tab => tab.name === tabName)[0];
      this._activeTabIndex = this.tabs.toArray().indexOf(this._activeTabObject);
      this.activeTabChange.emit(tabName);
    }
  }

  private startSelectedTab() {
    const activeTab = this.activeTab || this.tabs.toArray()[0].name;
    setTimeout(() => { // avoid change after component checked error
      this.selectTab(activeTab);
    }, 1);
  }

  private watchTabInUrlQuery() {
    this.queryParamsSubscription = this.route.queryParams
    .subscribe((params) => {
      const tab: string = params[this.componentTabName()];
      this.selectTab(tab);
    });
  }

  private stopWatchingTabInUrlQuery() {
    this.queryParamsSubscription.unsubscribe();
  }

}
