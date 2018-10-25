# Dec Carousel

`import { DecCarouselModule } from '@decora/browser-lib-ui';`

Used to present a list of items navigated by pages

## Examples

```html
  <dec-carousel (itemSelected)="onItemSelected($event)" [highlightSelected]="true">

    <dec-carousel-item value="1">item 1</dec-carousel-item>

    <dec-carousel-item value="2">item 2</dec-carousel-item>

    <dec-carousel-item value="3">item 3</dec-carousel-item>

    <dec-carousel-item value="4">item 4</dec-carousel-item>

    <dec-carousel-item value="5">item 5</dec-carousel-item>

    <dec-carousel-item value="6">item 6</dec-carousel-item>

    <dec-carousel-item value="7">item 7</dec-carousel-item>

    <dec-carousel-item value="8">item 8</dec-carousel-item>

    <dec-carousel-item value="9">item 9</dec-carousel-item>

  </dec-carousel>
```


# dec-carousel  Inputs

## highlightSelected

Defines if a border is placed around the selected item to highlight it.

## selectedIndex = 0

The selected item index.

## itemsPerPage = 4

Number of items per page.

## gap

Space between items.

# dec-carousel-item  Inputs

## value

Value to be used when an item is selected.

# dec-carousel  Outputs

## itemSelected(event)

Event triggered when an item is selected

event {
  index: number,
  value: any;
}

The index is the item index.

The value is the `dec-carousel-item` `value` input
