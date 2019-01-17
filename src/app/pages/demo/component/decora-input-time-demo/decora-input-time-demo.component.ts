import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-decora-input-time-demo',
  templateUrl: './decora-input-time-demo.component.html',
  styleUrls: ['./decora-input-time-demo.component.scss']
})
export class DecoraInputTimeDemoComponent {

  demoForm: FormGroup;

  modelValue = 225;

  modelValue2 = 63;

  modelValue3;

  modelValue4 = 123;

  modelValue5 = 123;

  set disabled(v: boolean) {
    this._disabled = v;

    this.enableDisableFields();
  }

  get disabled() {
    return this._disabled;
  }

  private _disabled: boolean;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.initiateForm();
  }

  private initiateForm() {
    this.demoForm = this.formBuilder.group({
      textareaInput: new FormControl({ value: this.modelValue5, disabled: this.disabled }, Validators.required)
    });
  }

  private enableDisableFields() {
    console.log('enableDisableFields');
    if (this.disabled) {
      this.demoForm.disable();
    } else {
      this.demoForm.enable();
    }
  }

}
