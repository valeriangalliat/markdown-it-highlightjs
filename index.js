'use strict';

var hljs = require('highlight.js');

var maybe = function maybe(f) {
  try {
    return f();
  } catch (e) {
    return false;
  }
};

// Highlight with given language.
var highlight = function highlight(code, lang) {
  return maybe(function () {
    return hljs.highlight(lang, code, true).value;
  }) || '';
};

// Highlight with given language or automatically.
var highlightAuto = function highlightAuto(code, lang) {
  return lang ? highlight(code, lang) : maybe(function () {
    return hljs.highlightAuto(code).value;
  }) || '';
};

// Wrap a render function to add `hljs` class to code blocks.
var wrap = function wrap(render) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return render.apply(this, args).replace('<code class="', '<code class="hljs ').replace('<code>', '<code class="hljs">');
  };
};

var highlightjs = function highlightjs(md, opts) {
  opts = Object.assign({}, highlightjs.defaults, opts);

  md.options.highlight = opts.auto ? highlightAuto : highlight;
  md.renderer.rules.fence = wrap(md.renderer.rules.fence);

  if (opts.code) {
    md.renderer.rules.code_block = wrap(md.renderer.rules.code_block);
  }
};

highlightjs.defaults = {
  auto: true,
  code: true
};

module.exports = highlightjs;
