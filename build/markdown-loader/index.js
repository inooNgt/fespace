const parser = require('./parser')
const template = require('./template')
const transformer = require('./transformer')

const demoName = 'docs-demo'

module.exports = function (source) {
  const demoReg = /<!--vue-template:([\s\S]*?):vue-template-->/i;
  let demoId = 0;
  // markdown => html
  let content = parser.render(source)
  let demoComponents = []
  // get demo template
  let demoArr = demoReg.exec(content);
  while (demoArr) {
    let demoString = demoArr ? demoArr[1] : ''
    // transform demo template to vue component
    const cmpname = `${demoName}-${demoId++}`
    let componentStr = transformer(demoString, cmpname)

    demoComponents.push(componentStr)
    // insert component into content
    content = content.replace(demoReg, `<${cmpname} />`)
    // next 
    demoArr = demoReg.exec(content)
  }
  // content => vue component
  content = template(content, demoComponents.join(''))
  return content
}