# selectchic

> SelectChic renders one or all of the select elements as dropdown menus
> complete with change events and styling. Can be set to render dropdowns
> of any style, including a feature to copy the styles of any other element.

## Usage

```sh
$ npm install selectchic --save
```

## Using with selectChic without bundling

Move the imported folder from node_modules to your public folder
of js scripts. You can use the original source file with any
version of jQuery you'd like.

```html
<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
<script src="your_js_folder/selectchic/src/select_chic.js"></script>
<script>
  $('select').selectChic().renderChic();
</script>
```


## Using with webpack

SelectChic will pass through it's own jQuery instance (version 3).

```js
  // import SelectChic
  var $ = require('selectchic');

  // Render all select boxes as dropdowns
  $('select').selectChic().renderChic();
```
