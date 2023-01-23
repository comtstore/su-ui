const fs = require('fs-extra')

module.exports = async function ExportJsToSass (options = {}) {
  
    const targets = options.targets || []
    const output = options.output
    
    return {
      name: 'export-js-to-sass-plugin',
      async buildEnd(){
        if(Array.isArray(targets) && targets.length > 0){
              let tempString = ''
              for(let filename of targets){
                if(typeof filename !== 'string'){
                  throw new Error('targets should be a array of file path string !!')
                }
                 const { default: variableSet } = await import(filename)
                 tempString += Object.keys(variableSet).map((key) => `$${key}: ${variableSet[key]};`).join('\n')
              }
              await fs.outputFileSync(output, tempString)
        }
      }
   }
}