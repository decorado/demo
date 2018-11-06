import { Injectable } from '@angular/core';
import { DecApiService } from './../../services/api/decora-api.service';
import { Tag } from './../../components/dec-zoom-marks/models/tag.model';

@Injectable()
export class DecRenderCommentService {

  RENDERFEEDBACKTREE_ENDPOINT = '/legacy/job/renderfeedbacktree';
  feedbackTree: any[] = [];

  constructor(private decApi: DecApiService) { }

  public getRenderfeedbacktree(version: number): Promise<any> {

    const queryParams = {
      language: this.formatI18n(this.decApi.user.i18n),
    };

    if (version) {
      queryParams['version'] = version.toString();
    }

    return this.decApi.get(this.RENDERFEEDBACKTREE_ENDPOINT, queryParams).toPromise();
  }

  public getRenderDescriptionsByCode(comments: Tag[]): Tag[] {
    const groupedComments = comments.reduce((r, v, i, a, k = v.version) => ((r[k] || (r[k] = [])).push(v), r), {});

    Object.keys(groupedComments).forEach(async key => {
      const resp = await this.getRenderfeedbacktree(+key);
      this.feedbackTree = resp['sub'];

      groupedComments[key].forEach(comment => {
        comment.description = this.getDescription(comment.comment);
      });

    });

    return comments;

  }

  private getDescription(comment: string): string {

    if (!comment) {
      return '';
    }

    let temp = this.feedbackTree;
    let result = '';

    comment.split('').forEach(char => {
      if (temp[char].sub) {
        temp = temp[char].sub;
      } else {
        result = temp[char].description;
      }
    });

    return result;
  }

  private formatI18n(i18n: string): string {
    switch (i18n) {
      case 'PT_BR':
        return 'pt-br';
      default:
        return 'en';
    }
  }
}
