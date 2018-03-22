const path = require('path')
const webpack = require('webpack')
process.env.NODE_ENV='production'

console.dir(process.env)

module.exports=(base, packages)=>{
	return packages.map(p=>{
		return {
			...base,
			entry:`./packages/${p}/src/index.js`,
			output:{
				filename:`index.${process.env.NODE_ENV}.js`,
				path: path.resolve(`${__dirname}/packages/${p}`, 'dist')
			},
			externals:{
				react:"react",
				"we-edit":"we-edit"
			}
		}
	})
}