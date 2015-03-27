import { equal } from 'assert'
import md from 'markdown-it'
import highlightjs from './'

const parser = md().use(highlightjs)

equal(
  parser.render('```js\nconsole.log(42)\n```'),
  `<pre><code class="hljs language-js"><span class="hljs-built_in">console</span>.log(<span class="hljs-number">42</span>)
</code></pre>
`)

equal(
  parser.render('```\ntest\n```'),
  `<pre><code class="hljs"><span class="hljs-built_in">test</span>
</code></pre>
`)
