import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-decora-suggested-time-demo',
  templateUrl: './decora-suggested-time-demo.component.html',
  styleUrls: ['./decora-suggested-time-demo.component.scss']
})
export class DecoraSuggestedTimeDemoComponent implements OnInit {

  interval = 3;

  time = 30;

  selected = 60;

  selectedReactive = 60;

  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.startForm();
  }

  startForm() {
    this.form = this.fb.group({
      selectedTime: ['']
    });

    if (this.selectedReactive) {
      this.form.controls['selectedTime'].setValue(this.selectedReactive);
    }

    this.form.controls['selectedTime'].valueChanges.subscribe((value) => {
      this.selectedReactive = value;
    });

    this.form.controls['selectedTime'].disable();

    setTimeout(() => {
      this.form.controls['selectedTime'].enable();
    }, 2e3);
  }
}
