const resolve = require('rollup-plugin-node-resolve')
const vue = require("rollup-plugin-vue")
const terser = require("rollup-plugin-terser").terser;
const scss = require('rollup-plugin-scss')
const postcss = require('postcss')
const autoprefixer = require('autoprefixer')
const commonjs  = require( '@rollup/plugin-commonjs')
const path  = require( 'path')
const fs = require('fs')
module.exports =(config) => {
  const {input, dir , name} = config
  return {
      // 入口
      input: {
        input,
        external: ['vue'],
        plugins: [
          resolve({extensions: ['.vue']}),
          vue({
            // 把单文件组件中的样式，插入到html中的style标签
            css: false,
            // 把组件转换成 render 函数
            compileTemplate: true,
          }),
          commonjs(),
          // 代码压缩
          terser(),
          scss({
            output: function (styles) {
              if (!fs.existsSync(path.join(__dirname, dir))) {
                fs.mkdirSync(path.join(__dirname, dir), {recursive: true})
              }
              fs.writeFileSync(`${dir}/${name}.css`, styles)
            },
            processor: () => postcss([autoprefixer()]),
            includePaths: [
              path.join(__dirname, '../../node_modules/'),
              'node_modules/'
            ]
          })
        ],
      },
      // 出口
      output: {
        dir,
        // 配置打包模块化的方式 es:ESM  cjs:CommonJS
        format: "es",
        name: name || 'tlkjui',
        globals: {
          vue: 'Vue',
        },
      },
    }

}

