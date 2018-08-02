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

    const keys = Object.keys(object);

    keys.sort(function (key1, key2) {
      key1 = key1.toLowerCase(), key2 = key2.toLowerCase();
      if (key1 < key2) {
        return -1;
      } else if (key1 > key2) {
        return 1;
      } else {
        return 0;
      }
    });

    keys.forEach((key) => {
      if (typeof object[key] === 'object' && !(object[key] instanceof Array)) {
        sortedObject[key] = this.sortObject(object[key]);
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

  }



}
