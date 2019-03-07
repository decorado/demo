import { AfterViewInit, Component, ContentChild, Input, TemplateRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'dec-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class DecTabComponent implements AfterViewInit {

  @Input() label: string;

  @Input() name: string;

  @Input() total: string;

  @Input() feedback: boolean;

  @ContentChild(TemplateRef) content: TemplateRef<DecTabComponent>;

  @Input() disabled: boolean;

  @Output() select = new EventEmitter();

  constructor() {}

  ngAfterViewInit() {
    this.ensureTabName();
  }

  private ensureTabName = () => {
    if (!this.name) {
      throw new Error('DecTabComponentError: The <dec-tab> component must have an unique name. Please, ensure that you have passed an unique namme to the component.');
    }
  }
}
