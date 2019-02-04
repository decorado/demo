import { Component, OnInit, ViewChild } from '@angular/core';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-decora-i18n-input-demo',
  templateUrl: './decora-i18n-input-demo.component.html',
  styleUrls: ['./decora-i18n-input-demo.component.scss']
})
export class DecoraI18nInputDemoComponent implements OnInit {

  testModel1 = {
    en: '',
    pt: '',
  };

  testModel2 = {
    en: '',
    pt: '',
  };

  @ViewChild(NgForm) inputsForm: NgForm;

  constructor() { }

  ngOnInit() {
  }

  setTouched() {
    Object.values(this.inputsForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

}
