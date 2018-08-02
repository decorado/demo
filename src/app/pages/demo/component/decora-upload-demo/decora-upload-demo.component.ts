import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-decora-upload-demo',
  templateUrl: './decora-upload-demo.component.html',
  styleUrls: ['./decora-upload-demo.component.css']
})
export class DecoraUploadDemoComponent implements OnInit {

  singleFileData = [];

  multipleFileData = [];

  constructor() { }

  ngOnInit() {
  }

  uploaded($event) {
    console.log('UPLOADED ALL FILES', $event);
  }

}
