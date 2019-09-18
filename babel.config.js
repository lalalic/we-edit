module.exports={
    "presets": [
      ["@babel/preset-env",{
        targets:{
          esmodules:true
        }
      }],
      "@babel/preset-react",
    ],
    "plugins": [
      ["@babel/plugin-transform-runtime",{}],
      //["@babel/plugin-transform-spread",{loose:true}],
      //["@babel/plugin-proposal-object-rest-spread",{userBuiltIns:true}],
		  "@babel/plugin-proposal-class-properties",
    ]
} 