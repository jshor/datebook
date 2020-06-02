const fs = require('fs')
const path = require('path')

module.exports = function getDir (dirName) {
  const folderPath = path.resolve('docs', dirName)

  return fs
    .readdirSync(folderPath)
    .filter(file => /\.md$/.test(file) && file !== 'README.md')
    .map(file => {
      const title = fs
        .readFileSync(path.join(folderPath, file))
        .toString()
        .split('\n')
        .shift()
        .replace('# ', '')

      return {
        title,
        path: `/${dirName}/${file.replace('.md', '')}`
      }
    })
}