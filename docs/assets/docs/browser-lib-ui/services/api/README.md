# Decora API

`import { DecoraApiModule } from '@decora/browser-lib-ui';`

This library is used to comunicate with Decora REST Api's.

It handle's authentication methods, tokens and http calls. All you have to do is provide the `host` endpoints and `authHost` app endpoint.

## Instalation

In your `App Module` use `forRoot` to set the `API host`:

```javascript
    import { DecoraApiModule } from '@decora/browser-lib-ui';

    imports: [
      DecoraApiModule.forRoot({host: 'https://rest-api-host', authHost: 'http://auth-app-host'}),
    ]
```

## Usage

In your `Component` use the `DecoraApiService` as any other service. The service will start only after injected in a component.

```javascript
    import { DecoraApiService } from '@decora/browser-lib-ui';

    constructor(
      private decoraApi: DecoraApiService
    ){}
```

#### forRoot
The `forRoot` method should be invoked only once in the AppModule and received the `host` and `authHost` parameters to be configured according to the app architecture.

## Public API

#### Normal Authentication
The authentication method is built in in Decora Api Service and can be invoked passing email and password and the optional third arg to keep the user logged in after browser closed.

```javascript
  this.decoraApi.auth({email, password}, keepLoggedIn)
```


#### Facebook Authentication
The facebook authentication method is built in in Decora Api Service and can be invoked passing email and password and the optional third arg to keep the user logged in after browser closed.

```javascript
  this.decoraApi.authFacebook({facebookToken, keepLogged}, keepLoggedIn)
```

#### Logout
You can pass a boolean parameter `redirectToLoginPage` if you do not want the api to redirect the user to login page after logout.

```javascript
  this.decoraApi.logout(redirectToLoginPage: boolean)
```

#### Get
```javascript
  this.decoraApi.get(endopintUrl, search?, options?)
```

#### Post
```javascript
  this.decoraApi.post(endpoint, payload?, options?)
```

#### Put
```javascript
  this.decoraApi.put(endpoint, payload?, options?)
```

#### Delete
```javascript
  this.decoraApi.delete(endopintUrl, options?)
```

#### Upsert
This method checks the payload and calls `PUT` if the payload contains an ID property or `POST` if it doesn't.

```javascript
  this.decoraApi.upsert(endpoint, payload?, options?)
```


### Arguments
> **endpoint:** String defining the path to the resource. The host is set by the API, tou have to provide only the path. **Example** `/user`

> **options:** Object containing HttpClient Option data. **Example** `{responseType: 'json', loadingMessage: 'Loading user data'}`

> **payload:** Any data to pass as the request body. **Example** `{id: 27, name: 'Bruno'}`

> **search:** An one level Object containing a filters to be sent as URL params. **Example** `{type: 'all'}`


### Models

```javascript
  export type CallOptions = {
    headers?: HttpHeaders;
    withCredentials?: boolean;
    params?: {
      [prop: string]: any;
    };
    loadingMessage?: string; // loading message that explains wht the call is responsible for
  } & {
    [prop: string]: any;
  };
```
