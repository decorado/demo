import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-decora-product-briefing-demo',
  templateUrl: './decora-product-briefing-demo.component.html',
  styleUrls: ['./decora-product-briefing-demo.component.scss']
})
export class DecoraProductBriefingDemoComponent implements OnInit {

  briefingUrl = "https://s3-sa-east-1.amazonaws.com/briefingimages/BRIEFINGS_PT/TORNEIRAS_4_PT.jpg";
  
  constructor() { }

  ngOnInit() {
  }

}
