import {DOMAIN} from "we-edit"
export default {
    loader:loader=>({type:`${DOMAIN}/office/LOADER`, payload:loader}),
    stream:stream=>({type:`${DOMAIN}/office/STREAM`, payload:stream}),
    format:payload=>({type:`${DOMAIN}/office/FORMAT`,payload}),
    channel:channel=>({type:`${DOMAIN}/office/channel`,payload:channel}),
    scale: scale=>({type:`${DOMAIN}/office/scale`,payload:scale}),
}

export const getOffice=state=>state.get("office")
