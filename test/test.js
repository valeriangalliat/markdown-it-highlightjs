/* eslint-env mocha */

const { assert } = require('chai')
const md = require('markdown-it')
const attrs = require('markdown-it-attrs')
const highlightjs = require('..')

describe('markdown-it-highlightjs', () => {
  it('throw when core called without `hljs` option', () => {
    let message

    try {
      md().use(require('../core'))
    } catch (e) {
      message = e.message
    }

    assert.equal(message, 'Please pass a highlight.js instance for the required `hljs` option.')
  })

  it('set class names even if language is not registered', () => {
    delete require.cache[require.resolve('highlight.js/lib/core')]

    assert.equal(
      md().use(highlightjs, { hljs: require('highlight.js/lib/core') }).render('```js\nconsole.log(42)\n```'),
  `<pre><code class="hljs language-js">console.log(42)\n</code></pre>
`)
  })

  it('actually highlights', () => {
    assert.equal(
      md().use(highlightjs).render('```js\nconsole.log(42)\n```'),
  `<pre><code class="hljs language-js"><span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-number">42</span>)
</code></pre>
`)
  })

  it('without language', () => {
    assert.equal(
      md().use(highlightjs).render('```\ntest\n```'),
  `<pre><code class="hljs"><span class="hljs-keyword">test
</span></code></pre>
`)
  })

  it('indented code', () => {
    assert.equal(
      md().use(highlightjs).render('    test\n'),
    `<pre><code class="hljs">test
</code></pre>
`)
  })

  it('ignore indented code', () => {
    assert.equal(
      md().use(highlightjs, { code: false }).render('    test\n'),
    `<pre><code>test
</code></pre>
`)
  })

  it('auto', () => {
    assert.equal(
      md().use(highlightjs).render('```\n<?php echo 42;\n```'),
    `<pre><code class="hljs"><span class="hljs-meta">&lt;?php</span> <span class="hljs-keyword">echo</span> <span class="hljs-number">42</span>;
</code></pre>
`)
  })

  it('no auto', () => {
    assert.equal(
      md().use(highlightjs, { auto: false }).render('```\n<?php echo 42;\n```'),
    `<pre><code class="hljs">&lt;?php echo 42;
</code></pre>
`)
  })

  it('allow registering languages', () => {
    assert.equal(
      md().use(highlightjs, { register: { test: require('highlight.js/lib/languages/sql') } })
        .render('```test\nSELECT * FROM TABLE;\n```'),
    `<pre><code class="hljs language-test"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span> <span class="hljs-keyword">FROM</span> <span class="hljs-keyword">TABLE</span>;
</code></pre>
`)
  })

  it('inline with Pandoc format', () => {
    assert.equal(
      md().use(highlightjs, { inline: true }).renderInline('`console.log(42)`{.js}'),
      '<code class="hljs language-js"><span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-number">42</span>)</code>'
    )
  })

  it('inline with kramdown format', () => {
    assert.equal(
      md().use(highlightjs, { inline: true }).renderInline('`console.log(42)`{:.js}'),
      '<code class="hljs language-js"><span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-number">42</span>)</code>'
    )
  })

  it('inline escape language class', () => {
    assert.equal(
      md().use(highlightjs, { inline: true }).renderInline('`console.log(42)`{:."><img onerror=alert(1) src=.>js}'),
      '<code class="hljs language-&quot;&gt;&lt;img onerror=alert(1) src=.&gt;js">console.log(42)</code>'
    )
  })

  it('inline not enabled by default', () => {
    assert.equal(
      md().use(highlightjs).renderInline('`console.log(42)`{.js}'),
      '<code>console.log(42)</code>{.js}'
    )
  })

  it('inline auto', () => {
    assert.equal(
      md().use(highlightjs, { inline: true }).renderInline('`console.log(42)`'),
      '<code class="hljs"><span class="hljs-built_in">console</span>.<span class="hljs-built_in">log</span>(<span class="hljs-number">42</span>)</code>'
    )
  })

  it('inline no auto', () => {
    assert.equal(
      md().use(highlightjs, { inline: true, auto: false }).renderInline('`console.log(42)`'),
      '<code class="hljs">console.log(42)</code>'
    )
  })

  it('inline works with markdown-it-attrs', () => {
    assert.equal(
      md().use(highlightjs, { inline: true }).use(attrs).renderInline('`console.log(42)`{.js}'),
      '<code class="hljs language-js"><span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-number">42</span>)</code>')
  })
})
