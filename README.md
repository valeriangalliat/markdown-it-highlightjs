# markdown-it-highlightjs [![npm version](http://img.shields.io/npm/v/markdown-it-highlightjs.svg?style=flat-square)](https://www.npmjs.org/package/markdown-it-highlightjs)

> Preset to use [highlight.js] with [markdown-it].

[highlight.js]: https://highlightjs.org/
[markdown-it]: https://github.com/markdown-it/markdown-it/tree/master

Usage
-----

```js
const md = require('markdown-it')()
  .use(require('markdown-it-highlightjs'))

// All code blocks will be highlighted.
```
