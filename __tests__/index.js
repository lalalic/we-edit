import {compose, preview, edit, create} from "../src"

describe("we-edit api", function(){
	it("compose, preview, edit, create",function(){
		expect(!!(compose&&preview&&edit&&create)).toBe(true)
	})

})