import { Component, OnInit } from '@angular/core';
import { DecLoaderService } from '@projects/decora/browser-lib-ui/src/public_api';

@Component({
  selector: 'app-decora-loader-demo',
  templateUrl: './decora-loader-demo.component.html',
  styleUrls: ['./decora-loader-demo.component.scss']
})
export class DecoraLoaderDemoComponent implements OnInit {

  constructor(private decLoader: DecLoaderService) { }

  ngOnInit() {
  }


  startLoader(){
    this.decLoader.addBlockerBackground('label.loading', 5e3);
  }
}
