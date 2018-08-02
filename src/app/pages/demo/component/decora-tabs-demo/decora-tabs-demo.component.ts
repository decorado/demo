import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';

@Component({
  selector: 'app-decora-tabs-demo',
  templateUrl: './decora-tabs-demo.component.html',
  styleUrls: ['./decora-tabs-demo.component.css']
})
export class DecoraTabsDemoComponent implements OnInit {

  baseHref = environment.active.host;

  activeTab;

  constructor() { }

  ngOnInit() {
  }

}
