import { Component, Input, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'dec-image-marks',
  templateUrl: './dec-image-marks.component.html',
  styleUrls: ['./dec-image-marks.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DecImageMarksComponent {

  @Input() render: any;

  @ViewChild('marksWrapper') marksWrapper: ElementRef;
  @ViewChild('imgRef') imgRef: ElementRef;

  constructor() { }

  drawMarks(): void {
    const pointElements = this.marksWrapper.nativeElement.getElementsByClassName('point-tag');
    const squareElements = this.marksWrapper.nativeElement.getElementsByClassName('square-tag');

    while (pointElements[0]) {
      pointElements[0].parentNode.removeChild(pointElements[0]);
    }

    while (squareElements[0]) {
      squareElements[0].parentNode.removeChild(squareElements[0]);
    }

    this.render.comments.forEach((item, index) => {
      item.coordinates.length > 2
        ? this.createSquareTag(item.coordinates[0], item.coordinates[1], item.coordinates[2], item.coordinates[3], index + 1)
        : this.createPointTag(item.coordinates[0], item.coordinates[1], index + 1);
    });
  }

  createPointTag(x: number, y: number, index: number): HTMLDivElement {

    const mark = document.createElement('div');
    mark.innerHTML = `${index}`;
    mark.className = 'point-tag';
    mark.style.top = `calc(${y}% - 12px)`;
    mark.style.left = `calc(${x}% - 12px)`;

    this.marksWrapper.nativeElement.appendChild(mark);

    mark.addEventListener('mouseover', () => {

      const span = document.createElement('span');
      span.innerHTML = this.render.comments[parseInt(mark.innerHTML, 10) - 1].comment;

      const commentDiv = document.createElement('div');

      commentDiv.className = 'comment-hover';
      commentDiv.style.maxWidth = this.marksWrapper.nativeElement > 340 ? '340px' : 'calc(100% - 20px)';

      commentDiv.appendChild(span);

      this.marksWrapper.nativeElement.appendChild(commentDiv);
    });

    mark.addEventListener('mouseout', () => {
      this.removeCommentNode();
    });

    return mark;

  }

  createSquareTag(x: number, y: number, x2: number, y2: number, index: number): void {

    const square = document.createElement('div');
    square.className = 'square-tag';
    square.style.width = `${Math.abs(x - x2)}%`;
    square.style.height = `${Math.abs(y - y2)}%`;
    square.style.top = `${y2 > y ? y : y2}%`;
    square.style.left = `${x2 > x ? x : x2}%`;

    const point = this.createPointTag(0, 0, index);
    square.appendChild(point);
    this.marksWrapper.nativeElement.appendChild(square);

  }

  removeCommentNode() {
    const commentNode = document.getElementsByClassName('comment-hover')[0];
    if (commentNode) {
      commentNode.parentElement.removeChild(commentNode);
    }
  }

}
