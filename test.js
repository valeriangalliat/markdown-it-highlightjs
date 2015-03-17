import { equal } from 'assert'
import md from 'markdown-it'
import highlightjs from './'

const html = md()
  .use(highlightjs)
  .render('```js\nconsole.log(42)\n```')

equal(html, `<pre><code class="language-js"><span class="hljs-built_in">console</span>.log(<span class="hljs-number">42</span>)
</code></pre>
`)
