import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-decora-zoom-area-demo',
  templateUrl: './decora-zoom-area-demo.component.html',
  styleUrls: ['./decora-zoom-area-demo.component.scss']
})
export class DecoraZoomAreaDemoComponent implements OnInit {

  render = {
    position: {x: 205.23, y: 205.45},
    scale: 1.5,
    file: {
      'id': '5af21109d42cb34adaad2c8f',
      'extension': 'jpg',
      'originalName': '5a228be8eaa4256953f8afa63410780853607066604.jpg',
      'fileBasePath': '2018/5/8/5af21109d42cb34adaad2c8f.jpg',
      'fileBaseUrl': 'https://s3.amazonaws.com/decora-platform-1-nv/2018/5/8/5af21109d42cb34adaad2c8f.jpg',
      'fileUrl': 'https://s3.amazonaws.com/decora-platform-1-nv/2018/5/8/5af21109d42cb34adaad2c8f.jpg'
    },
    comments: []
  };

  reference = {
    position: {x: 205.23, y: 205.45},
    scale: 1.5,
    file: {
      'id': '5af21109d42cb34adaad2c8f',
      'extension': 'jpg',
      'originalName': '5a228be8eaa4256953f8afa63410780853607066604.jpg',
      'fileBasePath': '2018/5/8/5af21109d42cb34adaad2c8f.jpg',
      'fileBaseUrl': 'https://s3.amazonaws.com/decora-platform-1-nv/2018/5/8/5af21109d42cb34adaad2c8f.jpg',
      'fileUrl': 'https://s3.amazonaws.com/decora-platform-1-nv/2018/5/8/5af21109d42cb34adaad2c8f.jpg'
    },
    comments: []
  };

  constructor() { }

  ngOnInit() {
  }

  onCancel($event) {
    console.log('cancel');
  }
}
