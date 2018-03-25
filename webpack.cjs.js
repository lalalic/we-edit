const path = require('path')
const webpack = require('webpack')
const { execSync } = require('child_process');

process.env.NODE_ENV='production'

module.exports=(base, packages)=>{
	//packages="we-edit,we-edit-channel-pagination".split(",")

	execSync(`yarn del packages/*/cjs`)

	packages.forEach(p=>execSync(`mkdir packages/${p}/cjs`))

	return packages.map((p)=>{
			let root=`packages/${p}`
			let entry=`./${root}/src/index.js`
			let {dependencies={}, peerDependencies={}}=require(`./${root}/package.json`)
			let externals=Object.keys(dependencies).concat(Object.keys(peerDependencies))
			return {
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
		})
}
