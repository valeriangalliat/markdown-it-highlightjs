import { equal } from 'assert'
import md from 'markdown-it'
import highlightjs from './'

equal(
  md().use(highlightjs).render('```js\nconsole.log(42)\n```'),
  `<pre><code class="hljs language-js"><span class="hljs-built_in">console</span>.log(<span class="hljs-number">42</span>)
</code></pre>
`)

equal(
  md().use(highlightjs).render('```\ntest\n```'),
  `<pre><code class="hljs"><span class="hljs-built_in">test</span>
</code></pre>
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
