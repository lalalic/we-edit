import React,{PureComponent,Fragment} from "react"
import PropTypes from "prop-types"
import {DOMAIN} from "we-edit"
import {connect} from 'react-redux'
import {FontManager} from "we-edit-representation-pagination"


export default connect()(class __$1 extends PureComponent{
    constructor(){
        super(...arguments)
        this.state={}
    }

    render(){
        var input
        const loaded=FontManager.names
        return (
            <Fragment>
                {loaded.length>0 && <div>Already Loaded {loaded.length} Fonts</div>}
                <span>you can </span><button onClick={e=>input.click()}>load more local fonts</button>
                <input type="file" ref={a=>input=a} multiple
                    style={{display:"none"}}
                    onChange={e=>this.load(e.target)}
                    />
            </Fragment>
        )
    }

    load(input){
        FontManager.fromBrowser(input)
            .then(e=>this.setState({loaded:Date.now()}))
    }
})
