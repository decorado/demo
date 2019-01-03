import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-decora-image-demo',
  templateUrl: './decora-image-demo.component.html',
  styleUrls: ['./decora-image-demo.component.css']
})
export class DecoraImageDemoComponent implements OnInit {

  image = {
    extension: 'jpg',
    fileBasePath: '2018/5/29/5b0cf3d418ab527a27ef718b.jpg',
    fileBaseUrl: 'https://s3.amazonaws.com/decora-platform-1-nv/2018/5/29/5b0cf3d418ab527a27ef718b',
    fileUrl: 'https://s3.amazonaws.com/decora-platform-1-nv/2018/5/29/5b0cf3d418ab527a27ef718b.jpg',
    id: '5b0cf3d418ab527a27ef718b',
    originalName: '7I5RdLBE03Q.jpg',
    size: 325983,
  };

  image2 = {
    extension: 'png',
    fileBasePath: '/2017/8/28/59a44d1ad13e7d14439b0ce8.png',
    fileUrl: 'https://s3.amazonaws.com/decora-platform-1-nv/2017/8/28/59a44d1ad13e7d14439b0ce8.png',
    id: '59a44d1ad13e7d14439b0ce8',
    originalName: 'DECORA_PROP_BATH_44.png',
  };

  constructor() { }

  ngOnInit() {
  }

}
