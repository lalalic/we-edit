import React, {PropTypes} from "react"
import Component from "./component"


export default class Header extends Component{
    static displayName="header"
    static contextTypes={
        pgSz: PropTypes.object,
        pgMar: PropTypes.object
    }
}
