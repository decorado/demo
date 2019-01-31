import { Component, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { DecSectionComponent } from '@projects/decora/browser-lib-ui/src/lib/components/dec-section/dec-section.component';

@Component({
  selector: 'app-decora-section-demo',
  templateUrl: './decora-section-demo.component.html',
  styleUrls: ['./decora-section-demo.component.scss']
})
export class DecoraSectionDemoComponent implements AfterViewInit {

  initialized = false;

  sections = [
    { name: 'section 1' },
    { name: 'section 2' },
    { name: 'section 3' },
    { name: 'section 4' },
    { name: 'section 5' },
    { name: 'section 6' },
  ];

  @ViewChildren(DecSectionComponent) sectionComponents: QueryList<DecSectionComponent>;

  constructor() { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initialized = true;
    }, 0);
  }

}
