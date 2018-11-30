import { DecApiService } from './../../../services/api/decora-api.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'dec-render-not-available',
  templateUrl: './render-not-available.component.html',
  styleUrls: ['./render-not-available.component.scss']
})
export class RenderNotAvailableComponent {

  private _renderStatus: string;
  public get renderStatus(): string {
    return this._renderStatus;
  }
  @Input()
  public set renderStatus(v: string) {
    this._renderStatus = v;
  }

  private _maxFileUrl: string;
  public get maxFileUrl(): string {
    return this._maxFileUrl;
  }
  @Input()
  public set maxFileUrl(v: string) {
    this._maxFileUrl = v;
  }

  public isProfessional = false;

  constructor(private decApiService: DecApiService) {
    this.isProfessional = this.decApiService.user.role === 'professional';
  }

}
