import { Component, Input, forwardRef, Output, EventEmitter, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { DecLanguageService } from '../../services/language/dec-language.service';
import { of, Observable, Subscription, timer } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { DecAutocompleteComponent } from './../autocomplete/autocomplete.component';
import { CategoryService } from './../../services/category/category.service';

const BASE_AUTOCOMPLETE_PRODUCT_CATEGORY_ENDPOINT = `/legacy/product/category`;

//  Return an empty function to be used as default trigger functions
const noop = () => {
};

//  Used to extend ngForms functions
const AUTOCOMPLETE_PRODUCT_CATEGORY_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DecAutocompleteProductCategoryComponent),
  multi: true
};

@Component({
  selector: 'dec-autocomplete-product-category',
  templateUrl: './autocomplete-product-category.component.html',
  styles: [],
  providers: [AUTOCOMPLETE_PRODUCT_CATEGORY_CONTROL_VALUE_ACCESSOR]
})
export class DecAutocompleteProductCategoryComponent implements ControlValueAccessor, OnDestroy {

  endpoint;

  touched: boolean;

  @Input() valueAttr = 'key';

  @Input() leafOnly = true;

  @Input() disabled: boolean;

  @Input() required: boolean;

  @Input() name = 'Category autocomplete';

  @Input() placeholder = 'Category autocomplete';

  @Input() multi: boolean;

  @Input() notFoundMessage: string;

  @Input() repeat: boolean;

  @Output() blur: EventEmitter<any> = new EventEmitter<any>();

  @Output() optionSelected: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(DecAutocompleteComponent) autocompleteComponent: DecAutocompleteComponent;

  private categories;

  private classWatcher: Subscription;

  private classesString: string;

  /*
  ** ngModel propertie
  ** Used to two way data bind using [(ngModel)]
  */
  //  The internal data model
  private innerValue: any;
  //  Placeholders for the callbacks which are later provided by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  //  Placeholders for the callbacks which are later provided by the Control Value Accessor
  private onChangeCallback: (_: any) => void = noop;

  constructor(
    private categoryService: CategoryService,
    private elementRef: ElementRef<HTMLElement>,
    private languageService: DecLanguageService,
  ) {
    this.subscribeToClassChange();
  }

  ngOnDestroy() {
    this.unsubscribeToClassChange();
  }

  /*
  ** ngModel API
  */

  // Get accessor
  get value(): any {
    return this.innerValue;
  }

  // Set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  labelFn(category) {
    return `${category.key} - ${category.name}`;
  }

  // From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  // From ControlValueAccessor interface
  setDisabledState(disabled = false) {
    this.disabled = disabled;
  }

  onValueChanged(event: any) {
    this.value = event.toString();
  }

  writeValue(value: any) {
    if (`${value}` !== `${this.value}`) { // convert to string to avoid problems comparing values
      this.value = value;
    }
  }

  setEndpointBasedOnLang(lang) {
    const endpoint = BASE_AUTOCOMPLETE_PRODUCT_CATEGORY_ENDPOINT;
    this.endpoint = `${endpoint}?language=${lang}`;
  }

  onAutocompleteBlur($event) {
    this.onTouchedCallback();
    this.blur.emit(this.value);
  }

  extractRowsFn = (res) => {
    const mappedSub = this.getMappedSub(res);
    const flatOptions = this.flatOptions(mappedSub);
    return flatOptions;
  }

  customFetchFunction = (searchTerm): Observable<any> => {

    return this.fetchCategories(searchTerm);

  }

  private fetchCategories(searchTerm) {

    if (this.categories) {

      const filteredCategories = this.searchInLocalCategories(searchTerm);

      return of(filteredCategories);

    } else {

      return this.languageService.lang$.pipe(

        switchMap((lang: any) => {

          this.setEndpointBasedOnLang(lang.decoraLanguageCode);

          return this.categoryService.fetchCategories().pipe(

            map(res => {

              this.categories = this.extractRowsFn(res);

              const filteredCategories = this.searchInLocalCategories(searchTerm);

              return filteredCategories;

            })

          );

        })
      );

    }

  }

  private searchInLocalCategories(searchTerm) {

    if (searchTerm) {

      return this.categories.filter(category => {

        const keyMatches = category.key.toLowerCase().search(searchTerm.toLowerCase()) > -1;

        const nameMatches = category.name.toLowerCase().search(searchTerm.toLowerCase()) > -1;

        return keyMatches || nameMatches;

      });

    } else {

      return this.categories;

    }


  }

  private getMappedSub = (item, parentId = '', parentName = '') => {
    return Object.keys(item.sub).map(key => {
      const subitem = item.sub[key];
      const itemId = `${parentId}${key}`;
      const itemName = parentName ? `${parentName} > ${subitem.name}` : subitem.name;
      const mappedItem: any = {
        key: itemId,
        name: itemName,
      };
      if (subitem.sub) {
        mappedItem.sub = this.getMappedSub(subitem, itemId, itemName);
      }
      return mappedItem;
    });
  }

  private flatOptions = (options = [], list = []) => {

    options.forEach(option => {
      list.push(option);
      if (option.sub) {
        this.flatOptions(option.sub, list);
      }
    });
    return list;
  }

  private subscribeToClassChange() {
    this.classWatcher = timer(100, 250).subscribe(this.detectClassChanges);
  }

  private detectClassChanges = () => {
    const classesString = this.elementRef.nativeElement.classList.value;
    if (this.classesString !== classesString) {
      this.classesString = classesString;
      const hasTouchedClass = classesString.search('ng-touched') >= 0;
      this.touched = hasTouchedClass;
    }
  }

  private unsubscribeToClassChange() {
    this.classWatcher.unsubscribe();
  }

}
