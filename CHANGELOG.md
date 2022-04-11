# [Changelog](http://keepachangelog.com/)

This project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

## [4.0.1] - 2022-04-11
* Fix `dist` directory not being published.

## [4.0.0] - 2022-04-11
* Rewrite in TypeScript. ([#21])
* Use Mocha as test runner.
* Compatibility with markdown-it-attrs. ([#24])
* **Potentially breaking:** add `hljs` class to inline code when inline
  mode is enabled. ([#25])
* **Potentially breaking:** return plain code when highlighting fails in
  inline mode (instead of an empty string).

## [3.6.0] - 2021-05-16
* Update highlight.js to version 11. ([#22])

## [3.5.0] - 2021-05-16
* Update to use new highlight.js API after old way got deprecated. ([#20])

## [3.4.0] - 2020-12-04
* Allow injecting the highlight.js instance. ([#15])

## [3.3.1] - 2020-11-15
* Proper escaping of language name. ([#14])

## [3.3.0] - 2020-09-25
* Upgrade highlight.js and support `langPrefix` option. ([#11])

## [3.2.0] - 2020-06-01
* Support inline code highlighting. ([#10])

## [3.1.0] - 2020-03-05
* Update dependencies. ([#6])
* Fix "unknown language" error. ([#8])
* Allow to register extra languages. ([#9])

## [3.0.0] - 2017-02-26
* Update highlight.js. ([#2])
* Drop Babel. This drops support for Node.js versions that doesn't
  support ES6.

## [2.0.0] - 2015-06-29
* Also add the `hljs` class to indented code blocks (together with
  fenced code blocks). This new behavior can be disabled with the `code`
  option.
* Never automatically detect the language if a language was specified,
  even if not recognized.
* Add an `auto` option to control if fenced code without language should
  be automatically highlighted.

## [1.1.2] - 2015-05-25
* Update license format in `package.json`.

## [1.1.1] - 2015-03-27
* Ensure `hljs` class is set even if no language is given.

## [1.1.0] - 2015-03-17
* Add `hljs` class and `langPrefix` to code blocks.

## [1.0.0] - 2015-03-17
* Initial release.

[Unreleased]: https://github.com/valeriangalliat/markdown-it-highlightjs/compare/v4.0.0...HEAD
[4.0.0]: https://github.com/valeriangalliat/markdown-it-highlightjs/compare/v3.6.0...v4.0.0
[3.6.0]: https://github.com/valeriangalliat/markdown-it-highlightjs/compare/v3.5.0...v3.6.0
[3.5.0]: https://github.com/valeriangalliat/markdown-it-highlightjs/compare/v3.4.0...v3.5.0
[3.4.0]: https://github.com/valeriangalliat/markdown-it-highlightjs/compare/v3.3.1...v3.4.0
[3.3.1]: https://github.com/valeriangalliat/markdown-it-highlightjs/compare/v3.3.0...v3.3.1
[3.3.0]: https://github.com/valeriangalliat/markdown-it-highlightjs/compare/v3.2.0...v3.3.0
[3.2.0]: https://github.com/valeriangalliat/markdown-it-highlightjs/compare/v3.1.0...v3.2.0
[3.1.0]: https://github.com/valeriangalliat/markdown-it-highlightjs/compare/v3.0.0...v3.1.0
[3.0.0]: https://github.com/valeriangalliat/markdown-it-highlightjs/compare/v2.0.0...v3.0.0
[2.0.0]: https://github.com/valeriangalliat/markdown-it-highlightjs/compare/v1.1.2...v2.0.0
[1.1.2]: https://github.com/valeriangalliat/markdown-it-highlightjs/compare/v1.1.1...v1.1.2
[1.1.1]: https://github.com/valeriangalliat/markdown-it-highlightjs/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/valeriangalliat/markdown-it-highlightjs/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/valeriangalliat/markdown-it-highlightjs/tree/v1.0.0

[#2]: https://github.com/valeriangalliat/markdown-it-highlightjs/pull/2
[#6]: https://github.com/valeriangalliat/markdown-it-highlightjs/pull/6
[#8]: https://github.com/valeriangalliat/markdown-it-highlightjs/pull/8
[#9]: https://github.com/valeriangalliat/markdown-it-highlightjs/pull/9
[#10]: https://github.com/valeriangalliat/markdown-it-highlightjs/pull/10
[#11]: https://github.com/valeriangalliat/markdown-it-highlightjs/pull/11
[#14]: https://github.com/valeriangalliat/markdown-it-highlightjs/pull/14
[#15]: https://github.com/valeriangalliat/markdown-it-highlightjs/pull/15
[#20]: https://github.com/valeriangalliat/markdown-it-highlightjs/pull/20
[#21]: https://github.com/valeriangalliat/markdown-it-highlightjs/issues/21
[#22]: https://github.com/valeriangalliat/markdown-it-highlightjs/pull/22
[#24]: https://github.com/valeriangalliat/markdown-it-highlightjs/issues/24
[#25]: https://github.com/valeriangalliat/markdown-it-highlightjs/issues/25
