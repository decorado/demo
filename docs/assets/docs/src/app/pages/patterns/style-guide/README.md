# Decora Style Guide

This document contains most of decorado development Style-guide. Please, folow the orientations here to delivey a better software for the client and for other developers.

Before learning the Decora Style Guide we ask you to learn the [Angular Style Guide][AngularStyleGuide]

## Paths

Always use raltive pats starting with `./`. Some IDE's that provide autoimport uses `../` by default and it should be changed.

Wrong:
``` javascript
import { Foo } from '../foo';
```

Right
``` javascript
import { Foo } from './../foo';
```

## Less style customization

We should avoid customizing components. Most of the style problems can be solved without too much css.

A well designed component should allow theming, not break view, not inherit styles from outside or children components and is non opinionative.

This should end up in a component that can be used anywhere with any style and without any trick.

## Avoid changing encapsulation

We should avoid using another encapsulation than `Emulated`. Other encapsulations have big chances of breaking the app style and provoking weird views.

Unless you are very sure about what you are doing, do not change this.

[AngularStyleGuide]: https://angular.io/guide/styleguide

## Create forms inside `<form>` tags

Whenever creating a form, being it a big or a small one, you should place it inside a `<form>` tag and use `(submit)` to submit the form.

This ensure every browser can read and understand what it is, we can control it better and we can submit using enter. Besides, if we have a `form` tag why won't us use it?

Wrong:
``` html
<input type="text" name="newsletterEmailAddress">
<button (click)="cancel()">Register</button>
<button (click)="registerNewsletterAddress()">Register</button>

```

Right:
``` html
<form role="form" (submit)="registerNewsletterAddress()">
  <input type="text" name="newsletterEmailAddress">
  <button type="button" (click)="cancel()">Register</button>
  <button type="submit">Register</button>
</form>
```
