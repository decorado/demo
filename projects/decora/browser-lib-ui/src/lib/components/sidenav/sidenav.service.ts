import { Injectable } from '@angular/core';

export const STORAGE_DOMAIN = 'decSidenavConfig';

@Injectable()
export class DecSidenavService {

  constructor() {}

  setSidenavVisibility(name, visibility) {

    const config = this.getSidenavConfig();

    config[name] = visibility;

    this.setSidenavConfig(config);

  }

  getSidenavVisibility(name) {

    const config = this.getSidenavConfig();

    return config[name];

  }

  private setSidenavConfig(conf) {

    const confString = JSON.stringify(conf);

    localStorage.setItem(STORAGE_DOMAIN, confString);

  }

  private getSidenavConfig() {

    const data = localStorage.getItem(STORAGE_DOMAIN);

    if (data) {

      return JSON.parse(data);

    } else {

      const newConfig: any = {};

      this.setSidenavConfig(newConfig);

      return newConfig;

    }

  }

}
