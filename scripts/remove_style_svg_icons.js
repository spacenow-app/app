const path = require('path')
const fs = require('fs')

const directoryPath = path.join(__dirname, '../src/components/Icon/svg/EVENT/STYLE')

fs.readdir(directoryPath, function(err, files) {
  if (err) {
    return console.warn(`Unable to scan directory: ${err}`)
  }

  if (fs.existsSync(`${directoryPath}/ori_bkp`)) {
    return console.warn('Folder backup really exists.')
  }

  if (!fs.existsSync(`${directoryPath}/ori_bkp`)) {
    fs.mkdirSync(`${directoryPath}/ori_bkp`)
  }

  files.forEach(function(file) {
    const content = fs.readFileSync(`${directoryPath}/${file}`, 'utf8')

    const newContent = content
      .replace(/(<style.*?<\/style>)/g, '')
      .replace(/(fill=\"#([0-9a-fA-F]{6})\")/g, '')
      .replace(/(fill=\"#([0-9a-fA-F]{3})\")/g, '')
      .replace(/(class=\"[a-zA-Z0-9:;\.\s\(\)\-\,]*\")/g, '')

    fs.writeFile(`${directoryPath}/ori_bkp/${file}`, content, err => {
      if (err) return console.error(err)
      console.debug('Successfully backup: ', file)
      fs.writeFile(`${directoryPath}/${file}`, newContent, err => {
        if (err) return console.error(err)
        console.debug('Successfully converted file: ', file)
      })
    })
  })
})
