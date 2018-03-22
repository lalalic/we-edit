const path = require('path')
const webpack = require('webpack')
const { execSync } = require('child_process');

process.env.NODE_ENV='production'


module.exports=(base, packages)=>{
	packages
		.forEach(p=>{
			execSync(`yarn compile packages/${p}/src -d packages/${p}/lib`)
			console.log('compiled '+p)
		})
	return packages.map(p=>{
			return {
				...base,
				entry:`./packages/${p}/src/index.js`,
				output:{
					filename:`index.${process.env.NODE_ENV}.js`,
					path: path.resolve(`${__dirname}/packages/${p}`, 'dist')
				},
				externals:["react","we-edit"]
			}
		})
}
