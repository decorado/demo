import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-decora-bootstrap',
  templateUrl: './decora-bootstrap.component.html',
  styleUrls: ['./decora-bootstrap.component.scss']
})
export class DecoraBootstrapComponent implements OnInit {

  navLinks = [
    { path: 'overview', label: 'Overview' },
    { path: 'appearance', label: 'Appearance' },
    { path: 'positioning', label: 'Positioning' },
    { path: 'third-party', label: 'Custom Third Party' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
