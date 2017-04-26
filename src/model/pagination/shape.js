import React, {PropTypes} from "react"

import {HasParentAndChild} from "./composable"
import Base from "../shape"
const Super=HasParentAndChild(Base)

export default class Shape extends Super{
	
}