import mdit from 'markdown-it'
import highlight from 'markdown-it-highlightjs'

const md = mdit()
  .use(highlight)
