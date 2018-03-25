const path = require('path')
const webpack = require('webpack')
const { execSync } = require('child_process');

process.env.NODE_ENV='production'

module.exports=(base, packages)=>{
	execSync(`yarn del packages/*/umd`)

	packages.forEach(p=>execSync(`mkdir packages/${p}/umd`))

	return packages.map((p)=>{
			let root=`packages/${p}`
			let entry=`./${root}/src/index.js`
			let {dependencies={}, peerDependencies={}}=require(`./${root}/package.json`)
			return {
				...base,
				entry,
				output:{
					filename:`index.${process.env.NODE_ENV}.js`,
					path: path.resolve(`${__dirname}/${root}`, 'umd'),
					library:p,
					libraryTarget:"umd",
				},
				resolve:{
					//alias: packages.reduce((alias,p)=>(alias[p]=path.resolve(__dirname, `packages/${p}/src/`),alias),{})
				},
				externals:Object.keys(peerDependencies)
			}
		},[])
}
