import React, {Component, PropTypes} from "react"
import Any, {togglable} from "./any"

export default class Inline extends togglable(Any){
    static displayName="inline"
}
