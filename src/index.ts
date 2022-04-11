import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import core, { HighlightOptions } from './core.js'

export default function highlightjs (md: MarkdownIt, opts?: HighlightOptions): void {
  opts = { ...highlightjs.defaults, ...opts }

  if (opts.hljs == null) {
    opts.hljs = hljs
  }

  return core(md, opts)
}

highlightjs.defaults = {
  auto: true,
  code: true,
  inline: false,
  ignoreIllegals: true
}
