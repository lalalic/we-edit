import React, { Component } from "react";
import PropTypes from "prop-types";
import { ReactQuery } from "we-edit";
import memoize from "memoize-one";
import Fields from "./fields"
import Context from "./context"
import NumPages from "./numpages"


export default ({ Text }) => class FieldBegin extends Component {
    static displayName = "fieldBegin";
    static contextTypes = {
        activeDocStore: PropTypes.object,
        style: PropTypes.object,
        notifyVariable: PropTypes.func,
    };

    constructor() {
        super(...arguments);
        this.replaceVariable = this.replaceVariable.bind(this);
        this.getNumPages=this.getNumPages.bind(this)
        this.uuid=Date.now()
    }

    getVariableDefinition = memoize(props => {
        return {
            ...props,
            replaceVariable: this.replaceVariable
        };
    });

    render() {
        const { context: { notifyVariable }, props } = this;
        if (notifyVariable) {
            notifyVariable(this.getVariableDefinition(this.props));
        }
        return <Text {...{
            ...this.context.style,
            ...this.props,
            children: String.fromCharCode(0),
        }} />;
    }

    replaceVariable(element, values, composed) {
        const { props: { display, id ,command} } = this;
        if(this[`replace${command}`]){
            return this[`replace${command}`](...arguments)
        }
        const value = values[id];
        if (value == display)
            return element;
        const $ = new ReactQuery(element);
        const text = (all => all[(all.findIndex(a => a.props.id == id)+1)||-1])($.find(`[id="${id}"],text`).toArray());
        return text && $.replace(text, React.cloneElement(text, { children: value,hash:++this.uuid}),{hash:this.uuid}).get(0);
    }

    replaceNUMPAGES(element, values){
        const { props: { display, id, command, instr}, } = this;
        const $ = new ReactQuery(element);
        const text = (all => all[(all.findIndex(a => a.props.id == id)+1)||-1])($.find(`[id="${id}"],text`).toArray());
        return text && $.replace(
                text, 
                <NumPages id={`${text.props.id}_numpages`} 
                    key={text.props.id} 
                    children={text} 
                    getValue={this.getNumPages}/>
            ).get(0);
    }

    getNumPages(){
        return Fields.create(this.props.instr).execute(new Context(this.context.activeDocStore.getState()))
    }
};
