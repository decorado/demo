import { Component, OnInit, ViewChild } from '@angular/core';
import { DecSnackBarService } from 'projects/decora/browser-lib-ui/src/public_api';

@Component({
  selector: 'app-object-sort',
  templateUrl: './object-sort.component.html',
  styleUrls: ['./object-sort.component.css']
})
export class ObjectSortComponent implements OnInit {

  sortedObject;

  @ViewChild('prettyObjectElement') prettyObjectElement;

  set data(v: any) {

    this._data = v;

    if (v) {

      try {

        const parsedObject = JSON.parse(v);

        this.sortedObject = this.sortObject(parsedObject);

      } catch (error) { }


    }

  }

  get data() {
    return this._data;
  }

  private _data;

  constructor(
    private snack: DecSnackBarService
  ) { }

  ngOnInit() {
  }

  private sortObject(object) {

    const sortedObject = {};

    const keys = Object.keys(object).sort();

    keys.forEach((key) => {

      const value = object[key];

      if (typeof value === 'object') {

        sortedObject[key] = this.sortObject(value);

      } else {

        sortedObject[key] = object[key];

      }
    });

    return sortedObject;

  }

  copyToClipboard() {

    const copyText = this.prettyObjectElement.nativeElement.innerText;

    const textArea = document.createElement('textarea');

    textArea.textContent = copyText;

    document.body.appendChild(textArea);

    textArea.select();

    document.execCommand('copy');

    this.snack.open('Text copied', 'success');

    document.body.removeChild(textArea);
  }



}
