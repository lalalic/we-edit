const path = require('path')
const webpack = require('webpack')
const { execSync } = require('child_process');

process.env.NODE_ENV='production'

module.exports=(base, packages)=>{
	//packages="we-edit,we-edit-channel-pagination".split(",")

	execSync(`yarn clean`)

	packages.forEach(p=>execSync(`mkdir packages/${p}/cjs packages/${p}/umd`))

	return packages.reduce((builds,p)=>{
			let root=`packages/${p}`
			let entry=`./${root}/src/index.js`
			let {dependencies={}, peerDependencies={}}=require(`./${root}/package.json`)
			let externals=Object.keys(dependencies).concat(Object.keys(peerDependencies))
			let cjs={
				...base,
				entry,
				output:{
					filename:`index.${process.env.NODE_ENV}.js`,
					path: path.resolve(`${__dirname}/${root}`, 'cjs'),
					library:p,
					libraryTarget:"commonjs",
				},
				externals
			}

			let umd={
				...base,
				entry,
				output:{
					filename:`index.${process.env.NODE_ENV}.js`,
					path: path.resolve(`${__dirname}/${root}`, 'umd'),
					library:p,
					libraryTarget:"umd",
				},
				resolve:{
					alias: packages.reduce((alias,p)=>(alias[p]=path.resolve(__dirname, `packages/${p}/src/`),alias),{})
				},
				externals:Object.keys(peerDependencies)
			}

			builds.splice(builds.length, 0, cjs,umd)
			return builds
		},[])
}
