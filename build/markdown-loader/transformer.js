function transformer(source = '', cmpname = '') {
  const tempReg = /<template?[^>]*>([\s\S]*)<\/template>/i
  const scriptReg = /<script?[^>]*>([\s\S]*)<\/script>/i
  let templateStr = tempReg.exec(source) ? tempReg.exec(source)[1] : ''
  let scriptStr = scriptReg.exec(source) ? scriptReg.exec(source)[1] : 'export default {}'

  scriptStr = scriptStr.replace(/export\s+default\s+\{/, `${cmpname}:{template:\`\n<dev>${templateStr}</dev>\`,`).replace(/(\})\s*$/, '$1,')
  return scriptStr

}