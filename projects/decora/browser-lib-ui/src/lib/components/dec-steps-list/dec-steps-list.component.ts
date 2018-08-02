import { Component, Input } from '@angular/core';
import { Step } from './dec-steps-list.models';

@Component({
  selector: 'dec-steps-list',
  templateUrl: './dec-steps-list.component.html',
  styleUrls: ['./dec-steps-list.component.scss']
})
export class DecStepsListComponent {

  @Input() icon = 'history';

  @Input() title = '';

  @Input() showTime: boolean;

  @Input() maxHeight;

  @Input() stepsList: Step[] = [];

}
