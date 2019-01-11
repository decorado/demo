import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecIconComponent } from './dec-icon.component';
import { MatIconModule, MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { DecIconsMap } from './dec-icons.map';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
  ],
  declarations: [DecIconComponent],
  exports: [DecIconComponent]
})
export class DecIconModule {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) {
    this.registerFontAweomeAlias();
    this.registerDecoraIcons();
  }

  private registerFontAweomeAlias() {
    this.matIconRegistry.registerFontClassAlias('fas', 'fa');
  }

  private registerDecoraIcons() {
    DecIconsMap.forEach(this.registerDecoraIcon);
  }

  private registerDecoraIcon = (icon) => {
    const meshIconBlackUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(icon.path);
    this.matIconRegistry.addSvgIcon(icon.name, meshIconBlackUrl);
  }
}
