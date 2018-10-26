import React, {Fragment} from "react"

import {models} from "we-edit"
import Document from "./document"
import Paragraph from "./paragraph"
import Text from  "./text"

export default Object.assign({...models},{
	Document,
	Paragraph,
	Text,
})