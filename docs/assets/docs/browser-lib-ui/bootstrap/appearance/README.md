## Appearance of elements

### A
Text without decoration

```html
  <a href="#" color="primary">A</a>
```

```css
  a {
    text-decoration: none;
    color: inherit;
  }
```

### Click
Simulates a clickable element

```html
  <h3 class="click">Click</h3>
```

```css
  .click {
    cursor: pointer;
  }
```

### Case

#### UPPERCASE
Transforms text to uppercase

```html
  <h3 class="uppercase">uppercase</h3>
```

```css
  .uppercase {
    text-transform: uppercase;
  }
```

#### LOWERCASE
Transforms text to lowercase

```html
  <h3 class="lowercase">lowercase</h3>
```

```css
  .lowercase {
    text-transform: lowercase;
  }
```

#### CAPITALIZE
Transforms text to capitalize

```html
  <h3 class="capitalize">capitalize</h3>
```

```css
  .capitalize {
    text-transform: capitalize;
  }
```

####
Break long words to fit into max width

```html
  <p class="break-word">break-word</p>
```

```css
  .break-word {
    word-wrap: break-word;
  }
```

### Full screen dialog
To set a full screen dialog

```css
  .full-screen-dialog {
    height: 100vh;
    width: 100vw !important;
    max-width: none !important;

    .mat-dialog-container {
        max-width: 100vw;
        width: 100vw;
        padding: 0;
        margin: 0;
    }

    .mat-dialog-content {
        max-height: 100vh;
        height: 100vh;
        padding: 0;
        margin: 0;
    }
  }
```

### Font style
To set default font to Roboto

```css
  @import '~@decora/bootstrap/appearance/font.scss';

  body {
    font-family: Roboto, "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

```

## Font weight

```css
.dec-font-500 {
  font-weight: 500;
};

```


### Component colors
To set default color for components

```css
  @import '~@decora/bootstrap/appearance/dec-colors.scss';

  h3 {
    color: $accent-color;
  }
```


