import React, {Component} from "react"
import PropTypes from "prop-types"

export const BookmarkBegin=({Text})=>class BookmarkBegin extends Component{
    static displayName="bookmarkBegin"
    render(){
        return <Text {...{
                        fonts:"Arial",
                        size:10,
                        ...this.props,
                        children:String.fromCharCode(0),
                    }}/>
	}
}

export const BookmarkEnd=({Text})=>class BookmarkEnd extends Component{
    static displayName="bookmarkEnd"
    render(){
        return <Text {...{
                        fonts:"Arial",
                        size:10,
                        ...this.props,
                        children:String.fromCharCode(0),
                    }}/>
	}
}