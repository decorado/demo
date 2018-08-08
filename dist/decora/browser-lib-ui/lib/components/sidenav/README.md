# Decora Sidenav

`import { DecSidenavModule } from '@decora/browser-lib-ui';`

This component makes easy using sidenav layout. It comes with sidenav menus, toolbar and progress bar and can be used to start any application with a simple sidenav layout.

It provides a multilevel menu to be used as navigation menus.

## Examples

```html
  <dec-sidenav #mainSidenav [loading]="progressBarVisible">
    <dec-sidenav-toolbar color="default">
      <dec-sidenav-toolbar-title>Custom title</dec-sidenav-toolbar-title>
      Custom toolbar content
    </dec-sidenav-toolbar>
    <dec-sidenav-menu-left open="true" mode="side">
      <dec-dec-sidenav-menu-title>LEFT SIDENAV MENU TITLE</dec-dec-sidenav-menu-title>
      <dec-sidenav-menu-item routerLink="item/1">item 1</dec-sidenav-menu-item>
      <dec-sidenav-menu-item>Item 2 - MULTILEVEL MENU
        <dec-sidenav-menu-item>Item 2.1
          <dec-sidenav-menu-item [routerLink]="['item', 2]">Item 2.1.1</dec-sidenav-menu-item>
          <dec-sidenav-menu-item>Item 2.1.2</dec-sidenav-menu-item>
        </dec-sidenav-menu-item>
        <dec-sidenav-menu-item routerLink="http://teste.com">external link</dec-sidenav-menu-item>
      </dec-sidenav-menu-item>
    </dec-sidenav-menu-left>
    <dec-sidenav-menu-right>
      <dec-dec-sidenav-menu-title>RIGHT SIDENAV MENU TITLE</dec-dec-sidenav-menu-title>
      <dec-sidenav-menu-item>item 1</dec-sidenav-menu-item>
      <dec-sidenav-menu-item>Item 2</dec-sidenav-menu-item>
    </dec-sidenav-menu-right>
    <dec-sidenav-content>
      CONTENT
    </dec-sidenav-content>
  </dec-sidenav>
```

## Dec Sidenav

```html
  <dec-sidenav></dec-sidenav>
```

The wrapper of the component

#### Properties

| Name | Type | Default | Description |
|-|-|-|-|
| loading | boolean | false | Show/hide the progress bar |

#### Methods

| Name | Arguments | Description |
|-|-|-|
| openBothMenus | n/a | Open left and right menus |
| openLeftMenu | n/a | Open left menu |
| openRightMenu | n/a | Open right menu |
| closeBothMenus | n/a | Closes both menus |
| closeLeftMenu | n/a | Closes left menu |
| closeRightMenu | n/a | Closes right menu |
| toggleBothMenus | n/a | Show/hide both menus |
| toggleLeftMenu | n/a | Show/hide left menu |
| toggleRightMenu | n/a | Show/hide right menu |
| setBothMenusMode | mode: 'over' &#124; 'push' &#124; 'side' = 'side' | Set the menu mode of both menus |
| setLeftMenuMode | mode: 'over' &#124; 'push' &#124; 'side' = 'side' | Set left menu mode |
| setRightMenuMode | mode: 'over' &#124; 'push' &#124; 'side' = 'side' | Set right menu mode |
| toggleProgressBar | n/a | Show/hide progress bar|
| showProgressBar | n/a | Show progress bar |
| hideProgressBar | n/a | Hide progress bar |

## Dec Sidenav Toolbar

```html
  <dec-sidenav-toolbar></dec-sidenav-toolbar>
```

A toolbar placet on top of the sidenav to display title, custom content and triggers

#### Properties

| Name | Type | Default | Description |
|-|-|-|-|
| color | 'primary' &#124; 'accent' &#124; 'warn' | undefined | The color of the toolbar |
| leftMenuTriggerVisible | boolean | true | Show/hide leftMenuTrigger button |
| rightMenuTriggerVisible | boolean | true | Show/hide rightMenuTrigger button |

#### Events

| Name | Returns | Description |
|-|-|-|
| toggleLeftMenu | openedStatus: boolean | Event triggered when the leftMenuTrigger is clicked |
| toggleRightMenu | openedStatus: boolean | Event triggered when the rightMenuTrigger is clicked |

## Dec Sidenav Toolbar Title

```html
  <dec-sidenav-toolbar-title></dec-sidenav-toolbar-title>
```

Used to display an standardized title inside the toolbar

## Dec Sidenav Left Menu

```html
  <dec-sidenav-left-menu></dec-sidenav-left-menu>
```

The left menu used to display a list os navigation items or a custom content

#### Properties

| Name | Type | Default | Description |
|-|-|-|-|
| open | boolean | true | Show/hide the menu |
| mode | mode: 'over' &#124; 'push' &#124; 'side' | 'side' | Set the menu positioning mode |
| persistVisibilityMode | boolean | false | persist the visibility in memory |

#### Events

| Name | Returns | Description |
|-|-|-|
| openedChange | openedStatus: boolean | Event triggered when the left menu is closed |
| modeChange | mode: 'over' &#124; 'push' &#124; 'side' | Event triggered when the left menu mode changes |

## Dec Sidenav Right Menu

```html
  <dec-sidenav-right-menu></dec-sidenav-right-menu>
```

The left menu used to display a list os navigation items or a custom content

#### Properties

| Name | Type | Default | Description |
|-|-|-|-|
| open | boolean | true | Show/hide the menu |
| mode | mode: 'over' &#124; 'push' &#124; 'side' | 'side' | Set the menu positioning mode |
| persistVisibilityMode | boolean | false | persist the visibility in memory |

#### Events

| Name | Returns | Description |
|-|-|-|
| openedChange | openedStatus: boolean | Event triggered when the right menu is closed |
| modeChange | mode: 'over' &#124; 'push' &#124; 'side' | Event triggered when the right menu mode changes |

## Dec Sidenav Menu Item

```html
  <dec-sidenav-menu-item></dec-sidenav-menu-item>
```

Used to display a menu item inside the menus.
It can nest another items so we can have a multilevel menu.

| Name | Type | Default | Description |
|-|-|-|-|
| routerLink | PATH or URL | n/a | go to a route path or external url |

## Dec Sidenav Menu Title

```html
  <dec-sidenav-menu-title></dec-sidenav-menu-title>
```

Used to display an standardized title inside the menus
