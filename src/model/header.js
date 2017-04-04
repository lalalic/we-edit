import React, {PropTypes} from "react"
import Component from "./component"


export default class Header extends Component{
    static displayName="header"
    static propTypes={
        type: PropTypes.oneOf(["first","event","default"])
    }

    static defaultProps={
        type:"default"
    }
    
    static contextTypes={
        pgSz: PropTypes.object,
        pgMar: PropTypes.object
    }
}
