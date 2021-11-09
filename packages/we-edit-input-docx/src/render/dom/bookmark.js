import React, {Component} from "react"
import PropTypes from "prop-types"

export const BookmarkBegin=({Text})=>class BookmarkBegin extends Component{
    static contextTypes={
        hintMeasure: PropTypes.object
    }
    static displayName="bookmarkBegin"
    render(){
        return <Text {...{
                        fonts:this.context.hintMeasure?.style.fonts||"Fallback",
                        size:this.context.hintMeasure?.style.size||10,
                        ...this.props,
                        children:String.fromCharCode(0),
                    }}/>
	}
}

export const BookmarkEnd=({Text})=>class BookmarkEnd extends Component{
    static contextTypes={
        hintMeasure: PropTypes.object
    }
    
    static displayName="bookmarkEnd"
    render(){
        return <Text {...{
                        fonts:this.context.hintMeasure?.style.fonts||"Fallback",
                        size:this.context.hintMeasure?.style.size||10,
                        ...this.props,
                        children:String.fromCharCode(0),
                    }}/>
	}
}