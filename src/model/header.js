import React, {Component, PropTypes} from "react"

export default class Header extends Component{
    static displayName="header"
    static contextTypes={
        pgSz: PropTypes.object,
        pgMar: PropTypes.object
    }
}
