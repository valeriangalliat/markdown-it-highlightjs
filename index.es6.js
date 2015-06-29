import assign from 'lodash.assign'
import flow from 'lodash.flow'
import hljs from 'highlight.js'

const maybe = f => (...args) => {
  try {
    return f(...args)
  } catch (e) {
    return false
  }
}

const get = name => x => x[name]
const maybeValue = f => maybe(flow(f, get('value')))

const highlight = (code, lang) =>
  maybeValue(hljs.highlight)(lang, code, true) ||
    maybeValue(hljs.highlightAuto)(code) ||
    ''

// Wrap a render function to add `hljs` class to code blocks.
const wrap = render =>
  function (...args) {
    return render.apply(this, args)
      .replace('<code class="', '<code class="hljs ')
      .replace('<code>', '<code class="hljs">')
  }

const highlightjs = (md, opts) => {
  opts = assign({}, highlightjs.defaults, opts)

  md.options.highlight = highlight
  md.renderer.rules.fence = wrap(md.renderer.rules.fence)

  if (opts.code) {
    md.renderer.rules.code_block = wrap(md.renderer.rules.code_block)
  }
}

highlightjs.defaults = {
  code: true
}

export default highlightjs
