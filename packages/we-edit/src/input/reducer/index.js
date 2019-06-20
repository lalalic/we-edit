import {default as DOMReducer} from "./dom"
import {default as EventReducer} from "./event"
import xml from "./event/xml"
EventReducer.xml=xml

export {
    DOMReducer, EventReducer
}