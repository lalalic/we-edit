const babel = require("rollup-plugin-babel");
const commonjs = require("rollup-plugin-commonjs");
const resolve = require("rollup-plugin-node-resolve");
const minify=require("rollup-plugin-uglify")

export function config(project,format){
	const {dependencies={}, peerDependencies={}}=require(`./packages/${project}/package.json`)
	let cjs={
		  input: `packages/${project}/src/index.js`,
		  output:{
			file: `packages/${project}/index.js`,
			format,
			sourcemap:true,
		  },
		  treeshake:false,
		  
		  cache:true,
		  
		  external:Object.keys(dependencies).concat(Object.keys(peerDependencies)).filter(a=>!!a),
		  plugins: [
			babel({
				babelrc:false,
				presets: [
					["env", {modules:false}],
					"react",
				],
				exclude: ["node_modules/**"],
				plugins:[
					"babel-plugin-external-helpers",
					"babel-plugin-add-module-exports",
					"babel-plugin-transform-object-rest-spread",
					"babel-plugin-transform-class-properties",
				]
			}),
			commonjs(),
		  ]
	}
	if(format=="cjs")
		return cjs

	return {
		...cjs,
		name:project,
		output:{
			...cjs.output,
			sourcemap:false,
			file: `packages/${project}/index.browser.js`,
		},
		external:Object.keys(peerDependencies).filter(a=>!!a),
		plugins:[
			resolve({
				browser:true,
				preferBuiltins: false
			})
		].concat(cjs.plugins)
		.concat([minify()])
		
	}
	
	return 
}

export default config("we-edit","cjs")
