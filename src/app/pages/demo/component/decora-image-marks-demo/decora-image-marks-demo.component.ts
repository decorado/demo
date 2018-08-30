import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-decora-image-marks-demo',
  templateUrl: './decora-image-marks-demo.component.html',
  styleUrls: ['./decora-image-marks-demo.component.scss']
})
export class DecoraImageMarksDemoComponent {

  renderArray: any;
  renderObj: any;
  qaModeActive: boolean;

  constructor() {

    this.renderArray = [
      {
        'file': {
          'id': '5af21109d42cb34adaad2c8f',
          'extension': 'jpg',
          'originalName': '5a228be8eaa4256953f8afa63410780853607066604.jpg',
          'fileBasePath': '2018/5/8/5af21109d42cb34adaad2c8f.jpg',
          'fileBaseUrl': 'https://s3.amazonaws.com/decora-platform-1-nv/2018/5/8/5af21109d42cb34adaad2c8f.jpg',
          'fileUrl': 'https://s3.amazonaws.com/decora-platform-1-nv/2018/5/8/5af21109d42cb34adaad2c8f.jpg'
        },
        'comments': []
      },
      {
        'file': {
          'id': '5a228be8eaa4256953f8afa7',
          'extension': 'jpg',
          'originalName': '5a228be8eaa4256953f8afa63410780853607066604.jpg',
          'fileBasePath': '2017/12/2/5a228be8eaa4256953f8afa7.jpg',
          'fileBaseUrl': 'https://s3.amazonaws.com/decora-platform-1-nv/2017/12/2/5a228be8eaa4256953f8afa7',
          'fileUrl': 'https://s3.amazonaws.com/decora-platform-1-nv/2017/12/2/5a228be8eaa4256953f8afa7.jpg'
        },
        'comments': []
      },
      {
        'file': {
          'id': '5b2d57bdaf4d0b248e998a6f',
          'extension': 'jpg',
          'originalName': '5a228be8eaa4256953f8afa63410780853607066604.jpg',
          'fileBasePath': '2018/6/22/5b2d57bdaf4d0b248e998a6f.jpg',
          'fileBaseUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/6/22/5b2d57bdaf4d0b248e998a6f',
          'fileUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/6/22/5b2d57bdaf4d0b248e998a6f.jpg'
        },
        'comments': []
      },
      {
        'file': {
          'id': '5b2d57bdaf4d0b248e998a6f',
          'extension': 'jpg',
          'originalName': '5a228be8eaa4256953f8afa63410780853607066604.jpg',
          'fileBasePath': '2018/6/22/5b2d57bdaf4d0b248e998a6f.jpg',
          'fileBaseUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/6/22/5b2d57bdaf4d0b248e998a6f',
          'fileUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/6/22/5b2d57bdaf4d0b248e998a6f.jpg'
        },
        'comments': []
      },
      {
        'file': {
          'id': '5b2d57bdaf4d0b248e998a6f',
          'extension': 'jpg',
          'originalName': '5a228be8eaa4256953f8afa63410780853607066604.jpg',
          'fileBasePath': '2018/6/22/5b2d57bdaf4d0b248e998a6f.jpg',
          'fileBaseUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/6/22/5b2d57bdaf4d0b248e998a6f',
          'fileUrl': 'http://s3.amazonaws.com/decora-platform-1-nv/2018/6/22/5b2d57bdaf4d0b248e998a6f.jpg'
        },
        'comments': []
      }
    ];

    this.renderObj = {
      file: {
        id: '5b2d57bdaf4d0b248e998a6f',
        extension: 'jpg',
        size: 761084,
        originalName: '5b2d57ddb9d255158e2923e52769620984368920609.jpg',
        fileBasePath: '2018/6/22/5b2d57bdaf4d0b248e998a6f.jpg',
        fileUrl: 'http://s3.amazonaws.com/decora-platform-1-nv/2018/6/22/5b2d57bdaf4d0b248e998a6f.jpg',
        fileBaseUrl: 'http://s3.amazonaws.com/decora-platform-1-nv/2018/6/22/5b2d57bdaf4d0b248e998a6f'
      },
      comments: [{
        comment: 'this light blue piece should be black',
        coordinates: [50, 50]
      }, {
        comment: 'change the shape of the footrest (even length sides)',
        coordinates: [20, 20, 40, 40]
      }]
    };
  }

  toggleQaModeActive() {
    this.qaModeActive = !this.qaModeActive;
    console.log(this.qaModeActive);
  }

}
