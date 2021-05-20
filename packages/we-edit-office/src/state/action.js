import {DOMAIN} from "we-edit"
export default {
    channel:channel=>({type:`${DOMAIN}/office`,payload:{channel}}),
    office: payload=>({type:`${DOMAIN}/office`,payload}),
    reducer: reducer=>({type:`${DOMAIN}/office/reducer`,payload:reducer}),
    theme: (...themes)=>({type:`${DOMAIN}/office/theme`,payload:themes})
}

export const getOffice=state=>state.get("office")
export const getTheme=state=>{
    const {theme={}}=getOffice(state)
    return theme
}
