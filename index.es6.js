import flow from 'lodash.flow'
import hljs from 'highlight.js'
import { escapeHtml } from 'markdown-it/lib/common/utils'

const maybe = f => (...args) => {
  try { return f(...args) }
  catch (e) { return false }
}

const get = name => x => x[name]
const maybeValue = f => maybe(flow(f, get('value')))

const highlight = (code, lang) =>
  maybeValue(hljs.highlight)(lang, code, true)
    || maybeValue(hljs.highlightAuto)(code)
    || ''

export default md => {
  md.options.highlight = highlight

  const originalFence = md.renderer.rules.fence

  md.renderer.rules.fence = function (...args) {
    return originalFence.apply(this, args)
      .replace('<code class="', '<code class="hljs ')
      .replace('<code>', '<code class="hljs">')
  }
}
