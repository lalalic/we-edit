import React, {Component, PropTypes} from "react"
import Any, {togglable} from "./any"

let Super=togglable(Any)
export default class Inline extends Super{
    static displayName="inline"
}
