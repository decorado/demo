import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'dec-breadcrumb',
  templateUrl: 'breadcrumb.component.html',
  styleUrls: ['breadcrumb.component.scss'],
})
export class DecBreadcrumbComponent implements OnInit {

  @Input() backButtonPath: string;
  @Input() breadcrumb: string;
  @Input() feature: string;
  @Input() forwardButton: string;
  @Input() i18nFeature: string;
  @Input() i18nBreadcrumb: string[];
  @Input() backLabel = 'Back';
  @Input() forwardLabel = 'Forward';

  constructor(private router: Router, private translator: TranslateService) {
  }

  ngOnInit() {
    this.translateFeature();
    this.translatePaths();
    this.detectAndParseButtonsConfig();
  }

  private detectAndParseButtonsConfig() {
    this.parseBackButton();
    this.parseForwardButton();
  }

  private parseBackButton() {
    if (this.backButtonPath !== undefined && this.backButtonPath !== 'false') {
      this.backButtonPath = this.backButtonPath ? this.backButtonPath : '/';
    }
  }

  private parseForwardButton() {
    if (this.forwardButton !== undefined && this.forwardButton !== 'false') {
      this.forwardButton = this.forwardButton ? this.forwardButton : '/';
    }
  }

  private translateFeature() {
    if (this.i18nBreadcrumb) {
      this.breadcrumb = this.i18nBreadcrumb.map(path => this.translator.instant(path)).join(' / ');
    }
  }

  private translatePaths() {
    if (this.i18nFeature) {
      this.feature = this.translator.instant(this.i18nFeature);
    }
  }

  // ****************** //
  // Navigation Methods //
  // ****************** //

  public goBack() {
    if (this.backButtonPath) {
      this.router.navigate([this.backButtonPath]);
    } else {
      window.history.back();
    }
  }

  public goForward() {
    if (this.forwardButton) {
      this.router.navigate([this.forwardButton]);
    } else {
      window.history.forward();
    }
  }
}
