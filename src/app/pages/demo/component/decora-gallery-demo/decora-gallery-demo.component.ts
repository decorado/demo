import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-decora-gallery-demo',
  templateUrl: './decora-gallery-demo.component.html',
  styleUrls: ['./decora-gallery-demo.component.css']
})
export class DecoraGalleryDemoComponent implements OnInit {

  image = {
    extension: 'jpg',
    fileBasePath: '2018/5/29/5b0cf3d418ab527a27ef718b.jpg',
    fileBaseUrl: 'https://s3.amazonaws.com/decora-platform-1-nv/2018/5/29/5b0cf3d418ab527a27ef718b',
    fileUrl: 'https://s3.amazonaws.com/decora-platform-1-nv/2018/5/29/5b0cf3d418ab527a27ef718b.jpg',
    id: '5b0cf3d418ab527a27ef718b',
    originalName: '7I5RdLBE03Q.jpg',
    size: 325983,
  };



  images = [this.image, {
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
  }, this.image];

  constructor() { }

  ngOnInit() {
  }

}
