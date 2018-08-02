import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dec-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.scss']
})
export class DecMarkdownComponent implements OnInit {

  @Input() src: string;

  constructor() { }

  ngOnInit() {
  }

}
