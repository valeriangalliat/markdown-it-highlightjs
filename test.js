const { strictEqual: equal } = require('assert')
const md = require('markdown-it')
const highlightjs = require('./')

equal(
  md().use(highlightjs).render('```js\nconsole.log(42)\n```'),
  `<pre><code class="hljs language-js"><span class="hljs-built_in">console</span>.log(<span class="hljs-number">42</span>)
</code></pre>
`)

equal(
  md().use(highlightjs).render('```\ntest\n```'),
  `<pre><code class="hljs"><span class="hljs-keyword">test
</span></code></pre>
`)

equal(
  md().use(highlightjs).render('    test\n'),
  `<pre><code class="hljs">test
</code></pre>
`)

equal(
  md().use(highlightjs, { code: false }).render('    test\n'),
  `<pre><code>test
</code></pre>
`)

equal(
  md().use(highlightjs).render('```\n<?php echo 42;\n```'),
  `<pre><code class="hljs"><span class="php"><span class="hljs-meta">&lt;?php</span> <span class="hljs-keyword">echo</span> <span class="hljs-number">42</span>;
</span></code></pre>
`)

equal(
  md().use(highlightjs, { auto: false }).render('```\n<?php echo 42;\n```'),
  `<pre><code class="hljs">&lt;?php echo 42;
</code></pre>
`)
