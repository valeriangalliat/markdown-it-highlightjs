import MarkdownIt from 'markdown-it'
import Renderer from 'markdown-it/lib/renderer'
import StateCore from 'markdown-it/lib/rules_core/state_core'
import Token from 'markdown-it/lib/token'
import { HLJSApi, LanguageFn } from 'highlight.js'

export interface HighlightOptions {
  /**
   * Whether to automatically detect language if not specified.
   */
  auto?: boolean

  /**
   * Whether to add the `hljs` class to raw code blocks (not fenced blocks).
   */
  code?: boolean

  /**
   * Register other languages which are not included in the standard pack.
   */
  register?: {
    [lang: string]: LanguageFn
  }

  /**
   * Whether to highlight inline code.
   */
  inline?: boolean

  /**
   * Provide the instance of highlight.js to use for highlighting
   */
  hljs?: HLJSApi

  /**
   * Forces highlighting to finish even in case of detecting illegal syntax for
   * the language instead of throwing an exception.
   */
  ignoreIllegals?: boolean
}

// Allow registration of other languages.
function registerLangs (hljs: HLJSApi, register: { [lang: string]: LanguageFn }): void {
  for (const [lang, fn] of Object.entries(register)) {
    hljs.registerLanguage(lang, fn)
  }
}

// Highlight with given language.
function highlight (md: MarkdownIt, hljs: HLJSApi, ignoreIllegals: boolean, code: string, lang: string): string {
  try {
    return hljs.highlight(code, { language: lang !== '' ? lang : 'plaintext', ignoreIllegals }).value
  } catch (e) {
    return md.utils.escapeHtml(code)
  }
}

// Highlight with given language or automatically.
function highlightAuto (md: MarkdownIt, hljs: HLJSApi, ignoreIllegals: boolean, code: string, lang: string): string {
  if (lang !== '') {
    return highlight(md, hljs, ignoreIllegals, code, lang)
  }

  try {
    return hljs.highlightAuto(code).value
  } catch (e) {
    return md.utils.escapeHtml(code)
  }
}
// Wrap a render function to add `hljs` class to code blocks.
function wrapCodeRenderer (renderer: Renderer.RenderRule): Renderer.RenderRule {
  return function wrappedRenderer (...args) {
    return renderer(...args)
      .replace(/<code class="/g, '<code class="hljs ')
      .replace(/<code>/g, '<code class="hljs">')
  }
}

function inlineCodeLanguageRule (state: StateCore): void {
  for (const parentToken of state.tokens) {
    if (parentToken.type !== 'inline') {
      continue
    }

    if (parentToken.children == null) {
      continue
    }

    for (const [i, token] of parentToken.children.entries()) {
      if (token.type !== 'code_inline') {
        continue
      }

      const next = parentToken.children[i + 1]

      if (next == null) {
        continue
      }

      const match = /^{:?\.([^}]+)}/.exec(next.content)

      if (match == null) {
        continue
      }

      const lang = match[1]

      // Remove the language specification from text following the code.
      next.content = next.content.slice(match[0].length)

      let className = token.attrGet('class') ?? ''

      className += `${state.md.options.langPrefix ?? 'language-'}${lang}`

      token.attrSet('class', className)
      token.meta = { ...token.meta, highlightLanguage: lang }
    }
  }
}

function inlineCodeRenderer (tokens: Token[], idx: number, options: MarkdownIt.Options, env: any, slf: Renderer): string {
  const token = tokens[idx]

  // Make TypeScript happy...
  if (options.highlight == null) {
    throw new Error('`options.highlight` was null, this is not supposed to happen')
  }

  const highlighted = options.highlight(token.content, token.meta?.highlightLanguage ?? '', '')

  return `<code${slf.renderAttrs(token)}>${highlighted}</code>`
}

export default function core (md: MarkdownIt, opts?: HighlightOptions): void {
  const optsWithDefaults = { ...core.defaults, ...opts }

  if (optsWithDefaults.hljs == null) {
    throw new Error('Please pass a highlight.js instance for the required `hljs` option.')
  }

  if (optsWithDefaults.register != null) {
    registerLangs(optsWithDefaults.hljs, optsWithDefaults.register)
  }

  md.options.highlight = (optsWithDefaults.auto ? highlightAuto : highlight).bind(null, md, optsWithDefaults.hljs, optsWithDefaults.ignoreIllegals)

  if (md.renderer.rules.fence != null) {
    md.renderer.rules.fence = wrapCodeRenderer(md.renderer.rules.fence)
  }

  if (optsWithDefaults.code && md.renderer.rules.code_block != null) {
    md.renderer.rules.code_block = wrapCodeRenderer(md.renderer.rules.code_block)
  }

  if (optsWithDefaults.inline) {
    md.core.ruler.before('linkify', 'inline_code_language', inlineCodeLanguageRule)
    md.renderer.rules.code_inline = wrapCodeRenderer(inlineCodeRenderer)
  }
}

core.defaults = {
  auto: false,
  code: false,
  inline: false,
  ignoreIllegals: false
}
