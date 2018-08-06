import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { DecListFetchMethod, DecListFetchMethodResponse } from '@projects/decora/browser-lib-ui/src/public_api';
@Component({
  selector: 'app-decora-list-demo',
  templateUrl: './decora-list-demo.component.html',
  styleUrls: ['./decora-list-demo.component.css']
})
export class DecoraListDemoComponent implements OnInit {

  rows = [
    { id: 1, name: 'teste 1' },
    { id: 2, name: 'teste 2' },
    { id: 3, name: 'teste 3' },
  ];

  filters = [
    { label: 'bruno', filters: [{ property: 'name', value: 'bruno' }] },
    { label: 'bruno OR rene', default: true, filters: [{ property: 'name', value: ['bruno', 'rene'] }] },
  ];

  filtersWithSubfilters = [
    { label: 'bruno', filters: [{ property: 'name', value: 'bruno' }] },
    { label: 'bruno OR rene', default: true, filters: [{ property: 'name', value: ['bruno', 'rene'] }] },
    { label: 'With sub', children: [
      { label: 'bruno', filters: [{ property: 'name', value: 'bruno' }] },
      { label: 'bruno OR rene', color: '#1a1aff', filters: [{ property: 'name', value: ['bruno', 'rene'] }] },
    ]},
  ];

  constructor() { }

  ngOnInit() {
  }

  myCustomDecListFetchMethod: DecListFetchMethod = (endpoint: string, filter: any): Observable<DecListFetchMethodResponse> => {
    const response: DecListFetchMethodResponse = {
      result: {
        rows: this.rows,
        count: this.rows.length
      }
    };
    return of(response);
  }

}
