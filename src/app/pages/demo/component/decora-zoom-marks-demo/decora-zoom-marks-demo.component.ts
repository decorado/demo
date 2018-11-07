import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-decora-zoom-marks-demo',
  templateUrl: './decora-zoom-marks-demo.component.html',
  styleUrls: ['./decora-zoom-marks-demo.component.scss']
})
export class DecoraZoomMarksDemoComponent implements OnInit {

  markedObj = {
    file: {
      extension: 'jpg',
      fileBasePath: '2018/5/29/5b0cf3d418ab527a27ef718b.jpg',
      fileBaseUrl: 'https://s3.amazonaws.com/decora-platform-1-nv/2018/5/29/5b0cf3d418ab527a27ef718b',
      fileUrl: 'https://s3.amazonaws.com/decora-platform-1-nv/2018/5/29/5b0cf3d418ab527a27ef718b.jpg',
      id: '5b0cf3d418ab527a27ef718b',
      originalName: '7I5RdLBE03Q.jpg',
      size: 325983,
      order: 1
    },
    tags: [
      {
        comment: '1163',
        reference: '1',
        feedback: '',
        status: '',
        coordinates: [2, 56],
        version: 21
      },
      {
        comment: '2K5',
        reference: '2',
        feedback: '',
        status: '',
        coordinates: [8, 40, 53, 32],
        version: 21
      },
      {
        comment: '73',
        reference: '3',
        feedback: '',
        status: '',
        coordinates: [54, 40],
        version: 23
      },
      {
        comment: '2C3',
        reference: '4',
        feedback: '',
        status: '',
        coordinates: [12, 67, 32, 45],
        version: 23
      }
    ]
  };

  markedObjs: any[];

  marker: any;

  qaMode: boolean;

  constructor() {
    this.markedObjs = [
      {
        'file': {
          'id': '5bb51ff2af4d0b12a262de3c',
          'extension': 'jpg',
          'size': 2741819,
          'originalName': '5bb5201249d9bc0729766e598170125292556642597.jpg',
          'fileBasePath': '2018/10/3/5bb51ff2af4d0b12a262de3c.jpg',
          'fileUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/10/3/5bb51ff2af4d0b12a262de3c.jpg'
        },
        tags: [
          {
            'id': '5bc88add0e8e3d0001958448',
            'reference': '1',
            'comment': '2K5',
            'coordinates': [
              12.3548387096774,
              3.8387096774194,
              23.9677419354839,
              11.6774193548387
            ]
          }
        ],
        'zoomAreas': []
      },
      {
        'file': {
          'id': '5bb51ff2af4d0b12a262de3d',
          'extension': 'jpg',
          'size': 1728365,
          'originalName': '5bb5201149d9bc0729766e566907899728795121544.jpg',
          'fileBasePath': '2018/10/3/5bb51ff2af4d0b12a262de3d.jpg',
          'fileUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/10/3/5bb51ff2af4d0b12a262de3d.jpg'
        },
        'tags': [
          {
            'id': '5bc88add0e8e3d0001958448',
            'reference': '2',
            'comment': '73',
            'coordinates': [
              56.3548387096774,
              77.8387096774194,
              3.9677419354839,
              90.6774193548387
            ]
          },
          {
            'id': '5bc88aea0e8e3d000195844c',
            'reference': '3',
            'comment': '2C3',
            'coordinates': [
              76.3548387096774,
              45.8387096774194,
              98.9677419354839,
              34.6774193548387
            ]
          },
          {
            'id': '5bdb4b5a83cfe0353206d83f',
            'reference': '4',
            'comment': '2C3',
            'coordinates': [
              34.3548387096776,
              23.8387096774194,
              45.9677419354839,
              76.6774193548387
            ]
          }
        ],
        'zoomAreas': []
      },
      {
        'file': {
          'id': '5bb51ff2af4d0b12a262de3e',
          'extension': 'jpg',
          'size': 116876,
          'originalName': '5bb5201149d9bc0729766e557433528998158692428.jpg',
          'fileBasePath': '2018/10/3/5bb51ff2af4d0b12a262de3e.jpg',
          'fileUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/10/3/5bb51ff2af4d0b12a262de3e.jpg'
        },
        'tags': [
          {
            'id': '5bdb4b5a83cfe0353206d83f',
            'reference': '1',
            'comment': '2C3',
            'coordinates': [
              79.3548387096776,
              69.8387096774194,
              47.9677419354839,
              59.6774193548387
            ]
          },
          {
            'id': '5bdb4b5a83cfe0353206d83f',
            'reference': '3',
            'comment': '2C3',
            'coordinates': [
              34.3548387096776,
              43.8387096774194,
              23.9677419354839,
              12.6774193548387
            ]
          }
        ],
        'zoomAreas': [
          {
            'id': '5bdb4b5a83cfe0353206d840',
            'reference': '2',
            'coordinates': [
              65.9677419354839,
              67.6774193548387
            ],
            'renderShot': {
              'x': 10,
              'y': 20,
              'scale': 30,
              'file': {
                'id': '5bb51ff2af4d0b12a262de3e',
                'extension': 'jpg',
                'size': 116876,
                'originalName': '5bb5201149d9bc0729766e557433528998158692428.jpg',
                'fileBasePath': '2018/10/3/5bb51ff2af4d0b12a262de3e.jpg',
                'fileUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/10/3/5bb51ff2af4d0b12a262de3e.jpg'
              },
              'tags': [
                {
                  'id': '5bdb4b5a83cfe0353206d841',
                  'reference': '1',
                  'comment': '2C3',
                  'coordinates': [
                    34.3548387096774,
                    46.8387096774194,
                    23.9677419354839,
                    68.6774193548387
                  ]
                }
              ]
            }
          }
        ]
      }
    ];

  }

  ngOnInit() { }

}
