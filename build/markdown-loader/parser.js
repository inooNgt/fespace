const MarkdownIt = require('markdown-it')
const itContainer = require('markdown-it-container')
const hljs = require('highlight.js')
const md = new MarkdownIt({
  // highlight
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value
      } catch (error) {
        console.log(error)
      }
    }
    return ''
  }
})

md.use(itContainer, 'vue', {
  validate(params) {
    return params.trim().match(/^vue\s*(.*)$/)
  },
  render(tokens, idx) {
    const m = tokens[idx].info.trim().match(/^vue\s*(.*)$/)
    if (tokens[idx].nesting === 1) {
      // 语法 :::ve 下一行接 ```
      const content = tokens[idx + 1].type === 'fence' ? tokens[idx + 1].content : ''
      return `<!--vue-template:${content}:vue-template-->`
    }
    return ''
  }
})

module.exports = md