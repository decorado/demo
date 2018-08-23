import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DecConfigurationForRootConfig } from './configuration-service.models';
import { tap } from 'rxjs/operators';

const CONFIG_PATH = 'assets/configuration/configuration.json';

@Injectable()
export class DecConfigurationService {

  set config(v: any) {
    if (this._config !== v) {
      this._config = v;
    }
  }

  get config(): any {
    return this._config;
  }

  profile = 'local';

  private _config: any;

  constructor(
    private http: HttpClient,
    @Optional() @Inject('DECORA_CONFIGURATION_SERVICE_CONFIG') private serviceConfiguration: DecConfigurationForRootConfig,
  ) {}

  loadConfig() {
    const basePath = this.serviceConfiguration.basePath;
    const path = `${basePath}/${CONFIG_PATH}`;

    const call = this.http.get(path).toPromise();

    call.then((res: any) => {
      console.log(`DecConfigurationService:: Initialized in ${this.profile} mode`);
      this.profile = this.isValidProfile(res.profile, res) ? res.profile : this.profile;
      this.config = res[this.profile];
    }, err => {
      console.error('DecConfigurationService:: Initialization Error. Could retrieve app configuration', err);
    });

    return call;
  }

  private isValidProfile(profile, availableProfiles) {

    const availables = Object.keys(availableProfiles);

    return (availables.indexOf(profile) >= 0) ? true : false;

  }

}
