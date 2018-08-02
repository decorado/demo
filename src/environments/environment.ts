// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export interface EnvConfig {
  [key: string]: any;
}

export const environment: EnvConfig = {
  profile: '_PROFILE_ACTIVE_',
  active: {},
  local: {
    production: false,
    host: '//localhost:4200',
    api: '//qa-k8s.decora/api',
    authHost: '//localhost:4200/demo/service/api?DemoContainer-tab=examples',
    useMockApi: false,
    mockApiHost: 'http://localhost:3000',
    defaultLang: 'en',
    facebookToken: '1600618120154277'
  },
  development: {
    production: false,
    host: '//development-k8s.decora/d',
    api: '//development-k8s.decora/api',
    authHost: '//development-k8s.decora/auth',
    defaultLang: 'en',
    facebookToken: '1600618120154277'
  },
  qa: {
    production: false,
    host: '//qa-k8s.decora/d',
    api: '//qa-k8s.decora/api',
    authHost: '//qa-k8s.decora/auth',
    defaultLang: 'en',
    facebookToken: '1600618120154277'
  },
  stage: {},
  production: {
    production: true,
    host: '//192.168.5.140:8080',
    api: '//cloud.decoracontent.com/api',
    authHost: '//cloud.decoracontent.com/auth',
    defaultLang: 'en',
    facebookToken: '1598973586985397'
  }
};

const active = environment[environment.profile];
if (active) {
  environment.active = active;
} else {
  environment.active = environment.local;
  environment.profile = 'local';
}

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
