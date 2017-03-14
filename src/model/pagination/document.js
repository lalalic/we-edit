import React, {Compnent, PropTypes} from "react"

import {HasChild} from "./composable"
import Base from "../document"

import Page from "./composed/page"

const Super=HasChild(Base)
export default class Document extends Super{
    render(){
        let i=1
        return (
			<div>
				<div style={{/*display:"none"*/}}>
				{super.render()}
				</div>
				<svg width={1}
					height={1}
					viewBox={`0 0 1 1`}>
                    {
                        this.computed.children.reduce((collected, section)=>{
                            section.computed.composed.forEach(page=>{
                                collected.push(<Page {...page} key={i++}/>)
                            })
                            return collected
                        },[])
                    }
				</svg>
			</div>
		)
    }
}
