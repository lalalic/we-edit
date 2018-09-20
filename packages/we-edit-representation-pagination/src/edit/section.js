import React, {Fragment,Children} from "react"
import PropTypes from "prop-types"

import Base from "../section"

import recomposable from "./recomposable"

const Super=recomposable(Base)

export default class Section extends Super{

	onAllChildrenComposed(){
		super.onAllChildrenComposed()
		let last=this.computed.composed[this.computed.composed.length-1]
		last && (last.lastSectionPage=true);
	}
}
