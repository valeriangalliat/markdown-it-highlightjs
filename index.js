const highlightjs = (md, opts) => {
  opts = Object.assign(
    {},
    highlightjs.defaults,
    { hljs: (opts && opts.hljs) || require('highlight.js') },
    opts
  )
  return require('./core')(md, opts)
}

highlightjs.defaults = {
  auto: true,
  code: true,
  inline: false
}

module.exports = highlightjs
