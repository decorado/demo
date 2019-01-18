# Decora Section

`import { DecSection } from '@decora/browser-lib-ui';`

This component is used to facilitate scrolling into sections of the view.

```html
  <button (click)="section1.scrollIntoView()">Scroll to section 1</button>

  <dec-section name="section1" #section1>
    Section content
  </dec-section>
```

## Properties

### @Input() data: any

Property to be used to passa data along the view (like is the section content is valid so the navigator can point out this info)

### @Input() name: string

The name of the section to be use when getting the sections using QueryList. This is commonly use to create dynamic navigation panels to allow the user to scroll to the section dynamically created.

### @Input() scroolingStyle: DecSectionScrollingStyle

The scrooling style to be used when scrolling to the section. It can be set by input or when calling `scrollIntoView`. If both are set, the function call configuration is used instead of the input one.


## Events

### @Output() navigated = new EventEmitter();

Event emitted when the view i scrolled to the section

## Methods

### scrollIntoView(config: DecSectionScrollingStyle)

Method used to navigate to the section
