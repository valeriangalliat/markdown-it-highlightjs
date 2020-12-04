# markdown-it-highlightjs [![npm version](https://img.shields.io/npm/v/markdown-it-highlightjs.svg?style=flat-square)](https://www.npmjs.org/package/markdown-it-highlightjs)

> Preset to use [highlight.js] with [markdown-it].

[highlight.js]: https://highlightjs.org/
[markdown-it]: https://github.com/markdown-it/markdown-it

Usage
-----

```js
const md = require('markdown-it')()
  .use(require('markdown-it-highlightjs'), opts)

// All code blocks will be highlighted.
```

The `opts` object can contain:

Name       | Type | Description                                                                | Default
-----------|------|----------------------------------------------------------------------------|--------
`auto`     | boolean | Whether to automatically detect language if not specified.              | `true`
`code`     | boolean | Whether to add the `hljs` class to raw code blocks (not fenced blocks). | `true`
`register` | object  | Register other languages which are not included in the standard pack.   | `null`
`inline`   | boolean | Whether to highlight inline code.                                       | `false`
`hljs`     | object  | Provide the instance of [highlight.js] to use for highlighting          | `require('highlight.js')`

### Register languages

```js
const md = require('markdown-it')()
  .use(require('markdown-it-highlightjs'), {
    register: {
      cypher: require('highlightjs-cypher')
    }
  })
```

### Inline code highlighting

You can enable inline code highlighting by setting `inline` to true:

```js
const md = require('markdown-it')()
  .use(require('markdown-it-highlightjs'), { inline: true })
```

You can specify the language for inline code using [Pandoc syntax](https://pandoc.org/MANUAL.html#extension-inline_code_attributes):

```markdown
`x=4`{.js}
```

or [Kramdown IAL syntax](https://kramdown.gettalong.org/syntax.html#inline-attribute-lists):

```markdown
`x=4`{:.js}
```

If you do not specify a language, then highlight.js will attempt to guess the language if `auto` is true (which it is by default).

### Provide the [highlight.js] instance

You can specify the `hljs` option to override the default [highlight.js] instance with your own:

```js
const hljs = require('highlight.js/lib/core')

hljs.registerLanguage(
  'javascript',
  require('highlight.js/lib/languages/javascript')
)

const md = require('markdown-it')()
  .use(require('markdown-it-highlightjs'), { hljs })
```

### Core plugin

You may import the core `markdown-it-highlightjs` plugin directly, without any default options. You must specify an instance of [highlight.js] for the `hljs` option.

```js
const hljs = require('highlight.js/lib/core')
const md = require('markdown-it')()
  .use(require('markdown-it-highlightjs/core'), { hljs })
```
