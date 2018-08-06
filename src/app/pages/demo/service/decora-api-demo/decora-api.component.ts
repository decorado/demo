import { Component, OnInit } from '@angular/core';
import { DecApiService } from '@projects/decora/browser-lib-ui/src/public_api';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-decora-api',
  templateUrl: './decora-api.component.html',
  styleUrls: ['./decora-api.component.scss']
})
export class DecApiComponent implements OnInit {

  user$;

  responseStatus;

  responseMessage;

  response;

  resource = '/accounts';

  decoraApiHost;

  email: string;

  password: string;

  callType = 'get';

  callBody = '[{"property": "name", "value": "Bruno"}, {"property": "name", "value": "Bruno 2"}]';

  pageSize = 4;

  page = 0;

  callContentType = 'application/json';

  endpoint = '/accounts';

  constructor(
    private decoraApi: DecApiService,
    private route: ActivatedRoute,
  ) {
    this.decoraApiHost = this.decoraApi.host;
    this.user$ = this.decoraApi.user$;
  }

  ngOnInit() {}

  auth() {
    this.decoraApi.auth({
      email: this.email,
      password: this.password,
      keepLogged: true
    })
    .subscribe((user) => {
      if (user) {
        this.goToRedirectUrl();
      }
    }, this.handleError);
  }

  logout() {
    this.decoraApi.logout()
    .toPromise();
  }

  test() {

    this.clearPreviousResponse();

    let body: any = this.callBody ? JSON.parse(this.callBody) : undefined;

    if (this.callType === 'get') {

      body = {
        filterGroups: [{
          filters: body
        }],
        page: this.page,
        pageSize: this.pageSize,
      };

    }

    const options: any = {headers: new HttpHeaders({ 'content-type': this.callContentType })};

    this.decoraApi[this.callType](this.resource, body, options)
    .subscribe(this.handleSuccess, this.handleError);

  }

  changePassword(userId) {

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');

    const body = new HttpParams()
    .set('currentPassword', 'password.currentPassword')
    .set('newPassword', 'password.newPassword');

    this.decoraApi.post(this.endpoint + '/' + userId + '/changepassword', body, {headers: headers}).
    toPromise().
    then(res => {
      return res;
    }, err => {
      console.log('err changing password', err);
    });

  }

  private clearPreviousResponse() {
    this.responseStatus = undefined;
    this.responseMessage = undefined;
    this.response = undefined;
  }

  private clearPreviousRequest() {
    this.callBody = undefined;
  }

  private handleSuccess = (res) => {
    this.responseStatus = res.status;
    this.responseMessage = res.message;
    this.response = res;
    this.clearPreviousRequest();
  }

  private handleError = (err) => {
    this.responseStatus = err.status;
    this.responseMessage = err.message;
  }

  private goToRedirectUrl() {
    const redirectUrl = this.route.snapshot.queryParams['redirectUrl'];
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  }
}
