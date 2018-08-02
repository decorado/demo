# Dec Mock server

## Guide

- Install all dependencies in `decora-mock-server`
- Execute `npm run start.mock-aot` to run Angular and Mock server 

Every `.json` in `dbs` folder will be used, if you want to add more endpoints, you need to add another `.json` file with what you want to receive in the response.

## Example

Create a file called `test.json` with this:

```json
  {
    "test": {
      "data": {
        "name": "Test"
      },
      "message": "Only a test message!!"
    }
  }
```

If you make a request to `http://localhost:3000/test`, the mock server will return this:

```json
  {
    "data": {
      "name": "Test"
    },
    "message": "Only a test message!!"
  }
  
```

## Custom routes

If you want to create a custom route, you need to add in `mock-server.js` another line on `rewriter` method, example:

```js
  server.use(jsonServer.rewriter({
    "/auth/account": "/account",
    "/auth/signin": "/signin"
  }));
```
- Added "/auth/account" to use "/account" and "/auth/signin" for "/signin".

## Tips

If you access http://localhost:3000 is possible to see a page with all resources the server have.

For more information, you can check the `json-server` docs: https://github.com/typicode/json-server
