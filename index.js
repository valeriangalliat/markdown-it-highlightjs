const highlightjs = (md, opts) => {
  opts = Object.assign({}, highlightjs.defaults, opts)

  if (!opts.hljs) {
    opts.hljs = require('highlight.js')
  }

  return require('./core')(md, opts)
}

highlightjs.defaults = {
  auto: true,
  code: true,
  inline: false
}

module.exports = highlightjs
