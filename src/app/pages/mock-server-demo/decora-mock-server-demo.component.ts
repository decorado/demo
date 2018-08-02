import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DecoraMockServerDemoService } from './decora-mock-server-demo.service';
import { ICharacter } from './character.interface';

@Component({
  selector: 'app-decora-mock-server-demo',
  templateUrl: './decora-mock-server-demo.component.html',
  styleUrls: ['./decora-mock-server-demo.component.scss']
})
export class DecoraMockServerDemoComponent {

  test: Object;
  peoples: Object[];
  countId: number;
  id: number;
  editId: number;
  character: ICharacter;
  authForm: FormGroup;
  newCharacterForm: FormGroup;
  editCharacterForm: FormGroup;

  constructor(private service: DecoraMockServerDemoService, private fb: FormBuilder) {

    this.countId = 10;
    this.id = 1;
    this.editId = 2;

    // this.authForm = this.fb.group({
    //   name: ['', Validators.required]
    // });

    this.newCharacterForm = this.fb.group({
      name: ['', Validators.required]
    });

    this.editCharacterForm = this.fb.group({
      name: ['', Validators.required]
    });

    this.service.test().subscribe((res) => {
      this.test = <Object>res;
    });

    this.renewList();

    this.service.getById(this.editId).subscribe((res) => {
      this.character = <ICharacter>res;
      this.editCharacterForm.patchValue({
        name: this.character.name
      });
    });

  }

  addNewCharacter(form: FormGroup) {
    this.service.add(form.value).subscribe(() => {
      this.renewList();
    });
  }

  editCharacter(form: FormGroup) {
    this.service.edit(this.editId, form.value).subscribe(() => {
      this.renewList();
    });
  }

  removeCharacter(id: number) {
    this.service.delete(id).subscribe((res) => {
      this.renewList();
    });
  }

  renewList() {
    this.service.list().subscribe((res) => {
      this.peoples = <Object[]>res;
    });
  }

}
