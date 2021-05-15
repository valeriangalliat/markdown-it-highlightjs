function maybe (f) {
  try {
    return f()
  } catch (e) {
    return false
  }
}

// Allow registration of other languages.
const registerLangs = (hljs, register) => register &&
  Object.entries(register).map(([lang, pack]) => { hljs.registerLanguage(lang, pack) })

// Highlight with given language.
const highlight = (hljs, code, lang) =>
  maybe(() => hljs.highlight(code, { language: lang || 'plaintext', ignoreIllegals: true }).value) || ''

// Highlight with given language or automatically.
const highlightAuto = (hljs, code, lang) =>
  lang
    ? highlight(hljs, code, lang)
    : maybe(() => hljs.highlightAuto(code).value) || ''

// Wrap a render function to add `hljs` class to code blocks.
const wrap = render =>
  function (...args) {
    return render.apply(this, args)
      .replace('<code class="', '<code class="hljs ')
      .replace('<code>', '<code class="hljs">')
  }

function inlineCodeRenderer (md, tokens, idx, options) {
  const code = tokens[idx]
  const next = tokens[idx + 1]
  let lang

  if (next && next.type === 'text') {
    // Match kramdown- or pandoc-style language specifier.
    // e.g. `code`{:.ruby} or `code`{.haskell}
    const match = /^{:?\.([^}]+)}/.exec(next.content)

    if (match) {
      lang = match[1]

      // Remove the language specification from text following the code.
      next.content = next.content.slice(match[0].length)
    }
  }

  const highlighted = options.highlight(code.content, lang)
  const cls = lang ? ` class="${options.langPrefix}${md.utils.escapeHtml(lang)}"` : ''

  return `<code${cls}>${highlighted}</code>`
}

module.exports = (md, opts) => {
  if (!opts || !opts.hljs) {
    throw new Error('Please pass a highlight.js instance for the required `hljs` option.')
  }

  registerLangs(opts.hljs, opts.register)

  md.options.highlight = (opts.auto ? highlightAuto : highlight).bind(null, opts.hljs)
  md.renderer.rules.fence = wrap(md.renderer.rules.fence)

  if (opts.code) {
    md.renderer.rules.code_block = wrap(md.renderer.rules.code_block)
  }

  if (opts.inline) {
    md.renderer.rules.code_inline = inlineCodeRenderer.bind(null, md)
  }
}
