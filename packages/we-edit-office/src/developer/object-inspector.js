import React, { Component } from "react";
import { whenSelectionChangeDiscardable, ACTION } from "we-edit";
import { compose, setDisplayName } from "recompose";
import ObjectTree from "../components/object-tree";
import PropTypesUI from "../components/prop-types-ui"

export default compose(
    setDisplayName("Content Properties"),
    whenSelectionChangeDiscardable(({ selection: { positioning, end: { id } = {} } , content=true, computed=true, layout=true}) => {
        if (id) {
            const { type, props } = positioning.getContent(id)?.toJS();
            const composer = positioning.getComposer(id);
            const value={ 
                content: props, 
                computed: composer?.computed,
                layout: composer ? <PropTypesUI 
                    propTypes={composer.constructor.propTypes} 
                    props={composer.props} 
                    theme={type.replace(/^\w/,(a)=>a.toUpperCase())}
                    onChange={change=>positioning.responsible.dispatch(ACTION.Entity.UPDATE({[type]:change}))}    
                    /> : undefined,//composer?.props,
            }

            if(!content)
                delete value.content
            if(!computed)
                delete value.computed
            if(!layout)
                delete value.layout


            return {value:{id,type, props:Object.keys(value).length==1 ? Object.values(value)[0] : value}}
        }
    })
)(class extends Component {
    render() {
        const { value, style, order=["id", "type", "content", "layout", "computed"], filter=["hash", "End","children",a=>a[0]==="_"]} = this.props;
        return (
            <div style={style}>
                {value?.id && <ObjectTree {...{value,order,filter}}/>}
            </div>
        );
    }
});
