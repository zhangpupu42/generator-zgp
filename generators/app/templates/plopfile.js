const fs = require('fs')
const path = require('path')

const generatorsDir = 'plopGenerators'
const generatorsFunc = []
const files = fs.readdirSync(generatorsDir)
files.forEach(f => {
    generatorsFunc.push(require(path.join(__dirname, generatorsDir, f)))
})
console.log('generatorsFunc -- ',generatorsFunc)
module.exports = plop => {
    for (let i = 0; i < generatorsFunc.length; i++){
        generatorsFunc[i](plop)
    }
}