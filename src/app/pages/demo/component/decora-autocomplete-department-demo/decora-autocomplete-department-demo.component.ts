import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-decora-autocomplete-department-demo',
  templateUrl: './decora-autocomplete-department-demo.component.html',
  styleUrls: ['./decora-autocomplete-department-demo.component.css']
})
export class DecoraAutocompleteDepartmentDemoComponent implements OnInit {

  companyId = 2;

  department = 140;

  constructor() { }

  ngOnInit() {
  }

  optionSelected($event) {

    console.log('optionSelected($event)', $event);

  }


}
