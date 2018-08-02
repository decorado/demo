import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-decora-steps-list-demo',
  templateUrl: './decora-steps-list-demo.component.html',
  styleUrls: ['./decora-steps-list-demo.component.css']
})
export class DecoraStepsListDemoComponent implements OnInit {

  stepsListWithTitleDateAndTime = [
    { title: 'Etapa 1', date: '2018-07-12T08:01:26.833+0000', description: 'Created by 6458'},
    { title: 'Etapa 2', date: '2018-07-13T16:30:26.833+0000', description: 'Updated by 345' },
    { title: 'Etapa 3', date: '2018-07-14T12:31:26.833+0000', description: 'Closed by 967' },
    { title: 'Etapa 1', date: '2018-07-12T08:01:26.833+0000', description: 'Created by 6458' },
    { title: 'Etapa 2', date: '2018-07-13T16:30:26.833+0000', description: 'Updated by 345' },
    { title: 'Etapa 3', date: '2018-07-14T12:31:26.833+0000', description: 'Closed by 967' },
    { title: 'Etapa 1', date: '2018-07-12T08:01:26.833+0000', description: 'Created by 6458' },
    { title: 'Etapa 2', date: '2018-07-13T16:30:26.833+0000', description: 'Updated by 345' },
    { title: 'Etapa 3', date: '2018-07-14T12:31:26.833+0000', description: 'Closed by 967' },
    { title: 'Etapa 1', date: '2018-07-12T08:01:26.833+0000', description: 'Created by 6458' },
    { title: 'Etapa 2', date: '2018-07-13T16:30:26.833+0000', description: 'Updated by 345' },
    { title: 'Etapa 3', date: '2018-07-14T12:31:26.833+0000', description: 'Closed by 967' },
    { title: 'Etapa 1', date: '2018-07-12T08:01:26.833+0000', description: 'Created by 6458' },
    { title: 'Etapa 2', date: '2018-07-13T16:30:26.833+0000', description: 'Updated by 345' },
    { title: 'Etapa 3', date: '2018-07-14T12:31:26.833+0000', description: 'Closed by 967' },
    { title: 'Etapa 1', date: '2018-07-12T08:01:26.833+0000', description: 'Created by 6458' },
    { title: 'Etapa 2', date: '2018-07-13T16:30:26.833+0000', description: 'Updated by 345' },
    { title: 'Etapa 3', date: '2018-07-14T12:31:26.833+0000', description: 'Closed by 967' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
