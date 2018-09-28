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

    if (this.render && typeof this.render.comments === 'object') {
      this.render.comments.forEach((comment, index) => {
        if (comment.coordinates.length > 2) {
          this.createSquareTag(comment.coordinates, index + 1, comment.requestByClient);
        } else {
          this.createPointTag(comment.coordinates, index + 1, comment.requestByClient);
        }
      });
    }
  }

  createPointTag(coordinates: number[], index: number, requestByClient: boolean): HTMLDivElement {
    const x: number = coordinates[0];
    const y: number = coordinates[1];

    const mark = document.createElement('div');
    mark.innerHTML = `${index}`;
    mark.className = 'point-tag';

    if (requestByClient) {
      mark.classList.add('client');
    }

    mark.style.top = `calc(${y}% - 12px)`;
    mark.style.left = `calc(${x}% - 12px)`;

    this.marksWrapper.nativeElement.appendChild(mark);

    mark.addEventListener('mouseover', () => this.addCommentNode(mark, requestByClient));
    mark.addEventListener('mouseout', this.removeCommentNode);

    return mark;
  }

  createSquareTag(coordinates: number[], index: number, requestByClient: boolean): void {
    const x: number = coordinates[0];
    const y: number = coordinates[1];
    const x2: number = coordinates[2];
    const y2: number = coordinates[3];

    const square = document.createElement('div');
    square.className = 'square-tag';

    if (requestByClient) {
      square.classList.add('client');
    }

    square.style.width = `${Math.abs(x - x2)}%`;
    square.style.height = `${Math.abs(y - y2)}%`;
    square.style.top = `${y2 > y ? y : y2}%`;
    square.style.left = `${x2 > x ? x : x2}%`;

    const point = this.createPointTag([0, 0], index, requestByClient);
    square.appendChild(point);
    this.marksWrapper.nativeElement.appendChild(square);

  }

  private addCommentNode = (mark: HTMLDivElement, requestByClient: boolean): void => {
    const span = document.createElement('span');
    span.innerHTML = this.render.comments[parseInt(mark.innerHTML, 10) - 1].comment;

    const commentDiv = document.createElement('div');

    commentDiv.className = `comment-hover ${requestByClient ? 'client' : ''}`;
    commentDiv.style.maxWidth = this.marksWrapper.nativeElement > 340 ? '340px' : 'calc(100% - 20px)';

    commentDiv.appendChild(span);

    this.marksWrapper.nativeElement.appendChild(commentDiv);
  }

  private removeCommentNode() {
    const commentNode = document.getElementsByClassName('comment-hover')[0];
    if (commentNode) {
      commentNode.parentElement.removeChild(commentNode);
    }
  }

}
