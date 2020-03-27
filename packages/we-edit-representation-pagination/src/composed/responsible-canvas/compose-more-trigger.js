import React, { Component } from "react"
import PropTypes from "prop-types"
import { setDisplayName, compose, getContext } from "recompose"
import Waypoint from "react-waypoint"
import { getSelection, connect } from "we-edit"
import Group from "../group"

export default compose(
    setDisplayName("ComposeMoreTrigger"), 
    connect(state => ({ selection: getSelection(state) })),
)(class ComposeMoreTrigger extends Component {
    static propTypes = {
        selection: PropTypes.object,
        getComposedY: PropTypes.func,
        isSelectionComposed: PropTypes.func,
        compose4Scroll: PropTypes.func,
        compose4Selection: PropTypes.func,
    }
    static contextTypes={
        debug: PropTypes.bool,
    }
    shouldComponentUpdate({ selection, isSelectionComposed, compose4Selection }) {
        if (!isSelectionComposed(selection)) {
            compose4Selection()
            return false
        }
        return true
    }

    render(){
        const { compose4Scroll, getComposedY } = this.props;
        const {debug}=this.context
        const y = getComposedY();
        return (
            <Waypoint onEnter={() => compose4Scroll(y)}>
                <Group y={y - 100}>
                    <line className="composeTrigger" x1="0" y1="0" x2="200" y2="0" strokeWidth="2" stroke={debug ? "red" : "transparent"} />
                </Group>
            </Waypoint>
        );
    }
})
