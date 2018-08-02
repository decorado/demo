import { Component, OnInit } from '@angular/core';
import { FAKE_COUNTRY_DATA } from './fake-country';
import { FAKE_STRING_ARRAY } from './fake-string-array';
import { of } from 'rxjs';

@Component({
  selector: 'app-decora-autocomplete-demo',
  templateUrl: './decora-autocomplete-demo.component.html',
  styleUrls: ['./decora-autocomplete-demo.component.scss']
})
export class DecoraAutocompleteDemoComponent implements OnInit {

  endpoint = 'companies/options';

  labelAttr = 'value';

  valueAttr = 'key';

  models: any = {
    disabled: 'Option 1',
    fromEndpointWithInitialValue: 2,
    fromCustomFetchWithInitialValue: 'AI',
    fromArrayOfObjectsWithInitialValue: 'AI',
  };

  fakeCountryOptions = FAKE_COUNTRY_DATA;

  fakeStringOptions = FAKE_STRING_ARRAY;

  constructor() { }

  ngOnInit() {
  }

  customFetchFunction(endpoint, filter) {
    return of(FAKE_COUNTRY_DATA);
  }

  optionSelected($event) {
    console.info('DecoraAutocompleteDemoComponent:: OptionSelected', $event);
  }

  labelFn(item) {
    return item ? item.value : '';
  }

  valueFn(item) {
    return item ? item.key : 'none';
  }

}
