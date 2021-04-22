module.exports={
    comments:true,
    "presets": [
      "@babel/preset-env",
      "@babel/preset-react",
    ],
    "plugins": [
      ["@babel/plugin-transform-runtime",{}],
      ["@babel/plugin-transform-spread",{loose:true}],
      ["@babel/plugin-proposal-object-rest-spread",{userBuiltIns:true}],
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-proposal-optional-chaining",
    ]
} 