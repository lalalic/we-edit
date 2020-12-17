import React, { Component } from "react";
import PropTypes from "prop-types";
import { ReactQuery } from "we-edit";
import memoize from "memoize-one";
import NumPages from "./numpages"
import Fields from "./fields"
import Context from "./context"


export default ({ Container }) => class SimpleField extends Component {
    static displayName = "field";
    static contextTypes = {
        activeDocStore: PropTypes.object,
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
        return <Container {...this.props} />
    }

    replaceVariable(element, values, composed) {
        const { props: { display, id, command } } = this;
        if(this[`replace${command}`]){
            return this[`replace${command}`](...arguments)
        }
        const value = values[id];
        if (value == display)
            return element;
        const $ = new ReactQuery(element);
        const text = $.findFirst(`[id="${id}"]`).findFirst('text');
        return text && $.replace(text, React.cloneElement(text.get(0), { children: value,hash:++this.uuid}),{hash:this.uuid}).get(0);
    }

    replaceNUMPAGES(element, values){
        const { props: { display, id, command, instr } } = this;
        const $ = new ReactQuery(element);
        const text = $.findFirst(`[id="${id}"]`).findFirst('text').get(0)
        return text && $.replace(
            text, 
            <NumPages 
                id={`${text.props.id}_numpages`} 
                children={text} 
                getValue={this.getNumPages}/>,
            {hash:++this.uuid}
        ).get(0);
    }

    getNumPages(){
        return Fields.create(this.props.instr).execute(new Context(this.context.activeDocStore.getState()))
    }
};
