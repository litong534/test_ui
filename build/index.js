const rollup = require('rollup')
const configFactory = require('../rollup.config')
const fs = require('fs')
const pify = require('pify')
const path = require('path')
const rimraf = require('rimraf')

const promisifyReadDir = pify(fs.readdir)

const promisifyRimRaf = pify(rimraf)

const formatName = n => n.replace(/\.js/, '')

async function build(option) {
  const bundle = await rollup.rollup(option.input)
  await bundle.write(option.output)
}

(async () => {
  try {
      await promisifyRimRaf(path.join(__dirname, '../dist'))
      const locales = await promisifyReadDir(path.join(__dirname, '../packages'))
      for (const l of locales) {
        await build(configFactory({
          input: [path.join(__dirname, '../packages')+`/${l}/src/index.js`],
          dir: `dist/lib/components/${l}`,
          name: `${formatName(l)}`
        }))
      }

      await build(configFactory({
        input: [path.join(__dirname, '..')+'/index.js'],
        dir: 'dist',
        name: 'index'
      }))


  } catch (e) {
    console.error(e) // eslint-disable-line no-console
  }
})()
