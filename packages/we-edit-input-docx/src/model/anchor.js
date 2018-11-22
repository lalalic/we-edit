import React, {Component} from "react"
import PropTypes from "prop-types"

export default ({Anchor})=>{
    class Positioning{
        constructor(line,anchor){
            this.line=line
            this.frame=line.props.frame
            this.anchor=anchor
            this.x0=0
            this.y0=0
        }

        x({align, offset}){
            if(align)
                return this[`x_${align}`]()
            else
                return this.x0+offset
        }

        y({align, offset}){
            if(align)
                return this[`y_${align}`]()
            else
                return this.y0+offset
        }
    }

    class page extends Positioning{
        y_top(){
            return 0
        }

        y_bottom(){
            return this.frame.props.height-this.anchor.props.height
        }
    }
    class margin extends page{

    }

    class insideMargin extends page{

    }

    class outsideMargin extends page{

    }

    //x only
    class column extends page{
        constructor(){
            super(...arguments)
            const {margin:{left=0,top=0}}=this.frame.props
            const {x,y}=this.frame.currentColumn
            this.x0=x
            this.y0=y
        }
    }


    class character extends column{
        constructor(){
            super(...arguments)
            this.y0+=this.frame.currentY
        }
    }

    class leftMargin extends page{
        constructor(){
            super(...arguments)
            const {margin:{left=0}}=this.frame.props
            this.x0=left
        }
    }

    class rightMargin extends page{
        constructor(){
            super(...arguments)
            const {margin:{right=0},width}=this.frame.props
            this.x0=width-right-this.anchor.props.width
        }
    }

    //y only
    class paragraph extends column{
        constructor(){
            super(...arguments)
            this.y0=this.frame.paragraphY(this.line.context.parent.props.id)
        }
    }

    class topMargin extends page{
        constructor(){
            super(...arguments)
            const {margin:{top=0}}=this.frame.props
            this.y0=top
        }
    }

    class bottomMargin extends page{
        constructor(){
            super(...arguments)
            const {margin:{bottom=0},height}=this.frame.props
            this.y0=height-bottom-this.anchor.props.height
        }
    }

    class line extends paragraph{
        constructor(){
            super(...arguments)
            this.y0=this.frame.currentY
        }
    }

    const Types={
        page,column,paragraph,line,character,
        margin, leftMargin, rightMargin, topMargin, bottomMargin,
        outsideMargin, insideMargin
    }

    return class extends Component{
        static displayName="anchor"

        render(){
            const {x,y, ...props}=this.props
            return <Anchor
                {...props}
                xy={(line,anchor)=>({x:new (Types[x.base])(line,anchor).x(x),y:new (Types[y.base])(line,anchor).y(y)})}
                />
        }
    }
}
