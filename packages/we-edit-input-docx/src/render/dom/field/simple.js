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
        return $.replace(text, React.cloneElement(text.get(0), { children: value })).get(0);
    }

    replaceNUMPAGES(element){
        const { props: { display, id, command, instr } } = this;
        const $ = new ReactQuery(element);
        const text = (all => all[1 + all.findIndex(a => a.props.id == id)])($.find(`[id="${id}"],text`).toArray());
        const getValue=()=>{
            return Fields.create(instr).execute(new Context(this.context.activeDocStore.getState(),id))
        }
        return $.replace(text, <NumPages children={text} getValue={getValue}/>).get(0);
    }
};
