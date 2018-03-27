const babel = require("rollup-plugin-babel");
const commonjs = require("rollup-plugin-commonjs");
const resolve = require("rollup-plugin-node-resolve");
const minify=require("rollup-plugin-uglify")

const project="we-edit-channel-html"
const mode="development"

export default {
  input: `packages/${project}/src/index.js`,
  output:{
	file: `packages/${project}/cjs/index.${mode}.js`,
	format: "cjs",
  },
  cache:false,
 
  plugins: [
	resolve({
		browser:true,
	}),

	babel({
		babelrc:false,
		presets: [
			["env", {modules:false}],
			"react",
		],
		exclude: "node_modules/**",
		plugins:[
			"babel-plugin-external-helpers",
			"babel-plugin-add-module-exports",
			"babel-plugin-transform-object-rest-spread",
			"babel-plugin-transform-class-properties",
		]
	}),

	commonjs({
		namedExports:{
			'node_modules/react/index.js': [
				'Component', 'PureComponent',
				'Children', 'createElement',
				'Fragment', 'createFactory'
			],
			"node_modules/immutable/dist/immutable.js":[
				"List","Map","Collection"
			],
		}
	}),
  ]
}
