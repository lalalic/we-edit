import {DOMAIN} from "we-edit"
export default {
    loader:loader=>({type:`${DOMAIN}/office`, payload:{loader}}),
    stream:stream=>({type:`${DOMAIN}/office`, payload:{stream}}),
    format:format=>({type:`${DOMAIN}/office`,payload:{format}}),
    channel:channel=>({type:`${DOMAIN}/office`,payload:{channel}}),
    scale: scale=>({type:`${DOMAIN}/office`,payload:{scale}}),
    reducer: reducer=>({type:`${DOMAIN}/office/reducer`,payload:reducer}),
}

export const getOffice=state=>state.get("office")
