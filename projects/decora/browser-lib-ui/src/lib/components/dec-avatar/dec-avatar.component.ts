import { Component, Input } from '@angular/core';

@Component({
  selector: 'dec-avatar',
  templateUrl: './dec-avatar.component.html',
  styleUrls: ['./dec-avatar.component.scss']
})
export class DecAvatarComponent {

  @Input()
  set account(v: any) {
    if (v !== this._account) {
      this._account = v;

      if (v && !v['profilePicture']) {
        this.getInitialsName();
      }
    }
  }

  get account() {
    return this._account;
  }
  private _account: any;

  initialsName: string;

  private getInitialsName(): void {
    if (!this.account['profilePicture']) {
      const { name } = this.account;

      this.initialsName = name[0].toUpperCase();
      const arrName = name.split(' ');
      this.initialsName += arrName[arrName.length - 1][0].toUpperCase();
    }
  }

}
