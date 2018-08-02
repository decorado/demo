import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'dec-list-active-filter-resume',
  templateUrl: './list-active-filter-resume.component.html',
  styleUrls: ['./list-active-filter-resume.component.scss']
})
export class DecListActiveFilterResumeComponent implements OnInit {

  @Input() filterGroups = [];

  @Output() remove: EventEmitter<any> = new EventEmitter<any>();

  @Output() edit: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  editDecFilterGroup($event, filterGroup) {
    $event.stopPropagation();
    this.edit.emit(filterGroup);
  }
  removeDecFilterGroup($event, filterGroup) {
    $event.stopPropagation();
    this.remove.emit(filterGroup);
  }

  getValuetype(value) {

    const firstValue = Array.isArray(value) ? value[0] : value;

    let type;

    switch (true) {
      case `${firstValue}`.indexOf('000Z') >= 0:
        type = 'date';
        break;
      default:
        type = 'default';
        break;
    }

    return type;

  }

}
