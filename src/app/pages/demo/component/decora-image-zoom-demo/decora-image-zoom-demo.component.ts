import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-decora-image-zoom-demo',
  templateUrl: './decora-image-zoom-demo.component.html',
  styleUrls: ['./decora-image-zoom-demo.component.scss']
})
export class DecoraImageZoomDemoComponent implements OnInit {

  // image = {
  //   extension: 'jpg',
  //   fileBasePath: '2018/5/29/5b0cf3d418ab527a27ef718b.jpg',
  //   fileBaseUrl: 'https://s3.amazonaws.com/decora-platform-1-nv/2018/5/29/5b0cf3d418ab527a27ef718b',
  //   fileUrl: 'https://s3.amazonaws.com/decora-platform-1-nv/2018/5/29/5b0cf3d418ab527a27ef718b.jpg',
  //   id: '5b0cf3d418ab527a27ef718b',
  //   originalName: '7I5RdLBE03Q.jpg',
  //   size: 325983,
  // };

  image = {
    id: '599cb3244d0733612a6d1294',
    extension: 'jpg',
    originalName: '599cb3244d0733612a6d12931982936233452036646.jpg',
    fileBasePath: '/2017/8/22/599cb3244d0733612a6d1294.jpg',
    fileUrl: 'http://s3.amazonaws.com/decora-platform-1-nv/2017/8/22/599cb3244d0733612a6d1294.jpg'
  }

  constructor() { }

  ngOnInit() {
  }

}
