import React, {PureComponent} from 'react'
import PropTypes from "prop-types"
import {Loader} from "we-edit"

export default class Browser extends PureComponent{
    static displayName="loader-browser"
    static propTypes={
        type: PropTypes.string.isRequired
    }

    static defaultProps={
        type:"browser"
    }

    render(){
        return <input ref="input"
            type="file"
            onChange={({target})=>{
                this.select(target.files[0])
                target.value=""
            }}
            style={{position:"fixed", left:-9999}}/>
    }

    componentDidMount(){
        this.refs.input.click()
    }

    select(file){
        let reader=new FileReader()
        reader.onload=e=>{
            this.props.onLoad({
                data:e.target.result,
                type:file.type.split("/").pop(),
                name:file.name
            })
        }
        reader.readAsArrayBuffer(file)
    }
}

Loader.support(Browser)
