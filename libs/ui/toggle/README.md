<h1>Toggle</h1>

[![CI/CD Status][github-action-badge]][github-action-link] [![Codecov][codecov-badge]][codecov-project] [![MIT License][license-image]][license-url]  
[![NPM version][npm-version-image]][npm-package] [![Library size][file-size-badge]][raw-distribution-js]

A simple toggle, or 'switch', component.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Installation](#installation)
  - [CSS imports](#css-imports)
  - [CSS resources](#css-resources)
- [Usage](#usage)
  - [Label position](#label-position)
  - [Disabled](#disabled)
  - [Checked](#checked)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

Use the `ng add` command to quickly install all the needed dependencies:

```bash
ng add @terminus/ui-toggle
```

### CSS imports

In your top-level stylesheet, add these imports:

```css
@import '~@terminus/design-tokens/css/library-design-tokens.css';
@import '~@terminus/ui-styles/terminus-ui.css';
```  

### CSS resources

Load the needed font families by adding this link to the `<head>` of your application:

```css
<link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,400&display=swap" rel="stylesheet">
```

## Usage

```html
<ts-toggle (selectionChange)="myChange($event)">Toggle</ts-toggle>
```

### Label position

The label can be displayed before or after the toggle. By default, it is after the toggle.

```html
<ts-toggle labelPosition="before">Toggle</ts-toggle>
```

### Disabled

The control can be disabled via Input or by disabling the associated `FormControl`:

```html
<ts-toggle [isDisabled]="true">Toggle</ts-toggle>
```

```typescript
myCtrl = new FormControl({ value: false, disabled: true });
```

```html
<ts-toggle [formControl]="myCtrl">Toggle</ts-toggle>
```

### Checked

The checked value can be set programmatically:

```html
<ts-toggle [isChecked]="true">Toggle</ts-toggle>
```

<!-- Links -->
[license-url]:         https://github.com/GetTerminus/terminus-oss/blob/release/LICENSE
[license-image]:       http://img.shields.io/badge/license-MIT-blue.svg
[codecov-project]:     https://codecov.io/gh/GetTerminus/terminus-oss
[codecov-badge]:       https://codecov.io/gh/GetTerminus/terminus-oss/branch/release/graph/badge.svg
[npm-version-image]:   http://img.shields.io/npm/v/@terminus/ui-toggle.svg
[npm-package]:         https://www.npmjs.com/package/@terminus/ui-toggle
[github-action-badge]: https://github.com/GetTerminus/terminus-oss/workflows/Release%20CI/badge.svg
[github-action-link]:  https://github.com/GetTerminus/terminus-oss/actions?query=workflow%3A%22CI+Release%22
[file-size-badge]:     http://img.badgesize.io/https://unpkg.com/@terminus/ui-toggle/bundles/terminus-ui-toggle.umd.min.js?compression=gzip
[raw-distribution-js]: https://unpkg.com/@terminus/ui-toggle/bundles/terminus-ui-toggle.umd.js
