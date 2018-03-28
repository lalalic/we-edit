const babel = require("rollup-plugin-babel");
const commonjs = require("rollup-plugin-commonjs");
const resolve = require("rollup-plugin-node-resolve");
const minify=require("rollup-plugin-uglify")

const project="we-edit"
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
		exclude: ["node_modules/**"],
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
			"packages/we-edit/index.js":[
				"Channel",
				"editify",
				"ACTION", 
				"DOMAIN", 
				"reducer", 
				"getActive",
				"getContent", 
				"getSelection", 
				"getFile", 
				"getUndos", 
				"getRedos",
				"getClientRect",
				"shallowEqual",
				"uuid",
				"ContentQuery",
				"Input",
				"model",
				"Editor",
				"Viewer",
				"Emitter",
				"WeEdit",
				"WithStore",
				"WithSelection",
				"onlyWhen", 
				"when",
				"Cursor",
				"Selection"
				
			],
			"packages/we-edit/model.js":[
				"Document",
				"Section",
				"Paragraph",
				"Text",
				"Header",
				"Footer",
				"Image",
				"Table",
				"Row",
				"Cell",
				"List",
				"Frame",
				"Shape"
			],
		}
	}),
  ]
}
