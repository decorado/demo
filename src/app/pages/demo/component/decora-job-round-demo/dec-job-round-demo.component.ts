import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dec-job-round-demo',
  templateUrl: './dec-job-round-demo.component.html',
  styleUrls: ['./dec-job-round-demo.component.scss']
})
export class DecJobRoundDemoComponent implements OnInit {


  job = {
  'id': '1',
  'created': 1538490698834,
  'lastUpdated': 1538490698834,
  'finalApprovalDate': 1538490698834,
  'status': 'CREATED',
  'company': {
    'id': 100,
    'name': 'Company 100'
  },
  'project': {
    'id': 20,
    'title': 'Project 20'
  },
  'type': 'MODELING_FIX',
  'product': {
    'id': '100:DS1156DSA156D1S6',
    'name': 'Produto teste',
    'sku': 'DS1156DSA156D1S6',
    'referenceImages': [
      {
        'id': '5accff2ce35ccc568cdb0335',
        'extension': 'jpg',
        'size': 37602,
        'originalName': '5accff2ce35ccc568cdb03345482632910720075187.jpg',
        'fileBasePath': '2018/4/10/5accff2ce35ccc568cdb0335.jpg',
        'fileBaseUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/4/10/5accff2ce35ccc568cdb0335',
        'fileUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/4/10/5accff2ce35ccc568cdb0335.jpg'
      },
      {
        'id': '5accff2be35ccc568cdb032e',
        'extension': 'jpg',
        'size': 118157,
        'originalName': '5accff2be35ccc568cdb032d6178558494571498022.jpg',
        'fileBasePath': '2018/4/10/5accff2be35ccc568cdb032e.jpg',
        'fileBaseUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/4/10/5accff2be35ccc568cdb032e',
        'fileUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/4/10/5accff2be35ccc568cdb032e.jpg'
      },
      {
        'id': '5accff2be35ccc568cdb032e',
        'extension': 'jpg',
        'size': 118157,
        'originalName': '5accff2be35ccc568cdb032d6178558494571498022.jpg',
        'fileBasePath': '2018/4/10/5accff2be35ccc568cdb032e.jpg',
        'fileBaseUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/4/10/5accff2be35ccc568cdb032e',
        'fileUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/4/10/5accff2be35ccc568cdb032e.jpg'
      },
      {
        'id': '5accff2be35ccc568cdb032e',
        'extension': 'jpg',
        'size': 118157,
        'originalName': '5accff2be35ccc568cdb032d6178558494571498022.jpg',
        'fileBasePath': '2018/4/10/5accff2be35ccc568cdb032e.jpg',
        'fileBaseUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/4/10/5accff2be35ccc568cdb032e',
        'fileUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/4/10/5accff2be35ccc568cdb032e.jpg'
      },
      {
        'id': '5accff2ce35ccc568cdb033d',
        'extension': 'jpg',
        'size': 163661,
        'originalName': '5accff2ce35ccc568cdb033c1524882617944937730.jpg',
        'fileBasePath': '2018/4/10/5accff2ce35ccc568cdb033d.jpg',
        'fileBaseUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/4/10/5accff2ce35ccc568cdb033d',
        'fileUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/4/10/5accff2ce35ccc568cdb033d.jpg'
      }
    ],
    'renderedImages': [
      {
        'id': '5accff2ce35ccc568cdb0335',
        'extension': 'jpg',
        'size': 37602,
        'originalName': '5accff2ce35ccc568cdb03345482632910720075187.jpg',
        'fileBasePath': '2018/4/10/5accff2ce35ccc568cdb0335.jpg',
        'fileBaseUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/4/10/5accff2ce35ccc568cdb0335',
        'fileUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/4/10/5accff2ce35ccc568cdb0335.jpg'
      },
      {
        'id': '5accff2be35ccc568cdb032e',
        'extension': 'jpg',
        'size': 118157,
        'originalName': '5accff2be35ccc568cdb032d6178558494571498022.jpg',
        'fileBasePath': '2018/4/10/5accff2be35ccc568cdb032e.jpg',
        'fileBaseUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/4/10/5accff2be35ccc568cdb032e',
        'fileUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/4/10/5accff2be35ccc568cdb032e.jpg'
      },
      {
        'id': '5accff2be35ccc568cdb032e',
        'extension': 'jpg',
        'size': 118157,
        'originalName': '5accff2be35ccc568cdb032d6178558494571498022.jpg',
        'fileBasePath': '2018/4/10/5accff2be35ccc568cdb032e.jpg',
        'fileBaseUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/4/10/5accff2be35ccc568cdb032e',
        'fileUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/4/10/5accff2be35ccc568cdb032e.jpg'
      },
      {
        'id': '5accff2be35ccc568cdb032e',
        'extension': 'jpg',
        'size': 118157,
        'originalName': '5accff2be35ccc568cdb032d6178558494571498022.jpg',
        'fileBasePath': '2018/4/10/5accff2be35ccc568cdb032e.jpg',
        'fileBaseUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/4/10/5accff2be35ccc568cdb032e',
        'fileUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/4/10/5accff2be35ccc568cdb032e.jpg'
      },
      {
        'id': '5accff2ce35ccc568cdb033d',
        'extension': 'jpg',
        'size': 163661,
        'originalName': '5accff2ce35ccc568cdb033c1524882617944937730.jpg',
        'fileBasePath': '2018/4/10/5accff2ce35ccc568cdb033d.jpg',
        'fileBaseUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/4/10/5accff2ce35ccc568cdb033d',
        'fileUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/4/10/5accff2ce35ccc568cdb033d.jpg'
      }
    ],
    'referenceCubeX': 20.20,
    'referenceCubeY': 21.20,
    'referenceCubeZ': 22.20,
    'modelCubeX': 20.21,
    'modelCubeY': 20.22,
    'modelCubeZ': 20.23,
    'studio': '',
    'lastUpdate': 1538490836078,
    'tags': [
      'tag1',
      'tag2',
      'tag3',
      'tag4'
    ]
  },
  'creator': {
    'id': 1022,
    'name': 'Udson Vieira'
  },
  'priority': '',
  'professional': {
    'id': 1230,
    'name': 'Udson Vieira'
  },
  'rank': 1,
  'squad': 'qualquer 1',
  'complexity': '',
  'rounds': [
    {
      'id': '1d2sa1d32sa12d3sa1d',
      'number': 1,
      'status': 'IN_QA',
      'start': 1538674573549,
      'end': 1538772349720,
      'delivered': 1538574854654,
      'qualityAssurance': {
        'id': 'ihg32iyg321iyg31i',
        'qualityAgent': {
          'id': 1213,
          'name': 'Udson Vieira'
        },
        'reviewAgent': {
          'id': '',
          'name': ''
        },
        'status': 'CREATED',
        'start': 1538496437122,
        'end': '',
        'denyReason': '',
        'feedback': '',
        'renders': [
          {
            'file': '',
            'comments': [
              {
                'comment': '',
                'feedback': '',
                'status': '',
                'coordinates': [
                  123,
                  456
                ]
              }
            ],
            'zoomAreas': [
              {
                'feedback': '',
                'renderShot': {
                  'file': '',
                  'comments': [
                    {
                      'comment': '',
                      'feedback': '',
                      'status': '',
                      'coordinates': [
                        123,
                        456
                      ]
                    }
                  ]
                },
                'referenceShot': {
                  'file': '',
                  'comments': [
                    {
                      'comment': '',
                      'feedback': '',
                      'status': '',
                      'coordinates': [
                        123,
                        456
                      ]
                    }
                  ]
                },
                'status': ''
              }
            ]
          }
        ]
      }
    }
  ]
};

  constructor() { }

  ngOnInit() {
  }

}
