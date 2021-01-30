module.exports={
	modulePathIgnorePatterns:[require.resolve("./package.json"), "src/", "responsible/"],
	moduleNameMapper:{
		"^we-edit(.*)/__tests__(.*)":`<rootDir>/packages/we-edit$1/__tests__$2`,
		"^we-edit(.*)/(.*)":`<rootDir>/packages/we-edit$1/src/$2`,
		"^we-edit(.*)":`<rootDir>/packages/we-edit$1/src`,
	}
}
