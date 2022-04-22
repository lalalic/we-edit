
module.exports={
    themes: (ctx=>{
        const keys=ctx.keys()
        const values=keys.map(a=>ctx(a).default)
        return keys.reduce((o, k, i) => { 
            o[k.substring(2).split(".")[0]] = values[i]; 
            return o; 
        }, {});
    })(require.context("!!raw-loader!codemirror/theme",false,/\.css$/)),
    modes: (ctx=>{
        ctx.keys().forEach(ctx)
        const codemirror=require("codemirror")
        return codemirror.modeInfo
    })(require.context("codemirror/mode",true,/\.js$/)),
    options:{
        font:"Calibri",
        size:12,
        "mode": "null",
        "indentUnit": 2,
        "indentWithTabs": false,
        "smartIndent": true,
        "tabSize": 4,
        "lineSeparator": null,
        //"specialChars": {},
        "electricChars": true,
        "inputStyle": "textarea",
        "spellcheck": false,
        "autocorrect": false,
        "autocapitalize": false,
        "rtlMoveVisually": true,
        "wholeLineUpdateBefore": true,
        "theme": "eclipse",
        "keyMap": "default",
        "extraKeys": null,
        "configureMouse": null,
        "lineWrapping": false,
        "gutters": [],
        "fixedGutter": true,
        "coverGutterNextToScrollbar": false,
        "scrollbarStyle": "native",
        "lineNumbers": true,
        "firstLineNumber": 1,
        "showCursorWhenSelecting": false,
        "resetSelectionOnContextMenu": true,
        "lineWiseCopyCut": true,
        "pasteLinesPerSelection": true,
        "selectionsMayTouch": false,
        "readOnly": false,
        "disableInput": false,
        "dragDrop": true,
        "allowDropFileTypes": null,
        "cursorBlinkRate": 530,
        "cursorScrollMargin": 0,
        "cursorHeight": 1,
        "singleCursorHeightPerLine": true,
        "workTime": 100,
        "workDelay": 100,
        "flattenSpans": true,
        "addModeClass": false,
        "pollInterval": 100,
        "undoDepth": 200,
        "historyEventDelay": 1250,
        "viewportMargin": 20,
        "maxHighlightLength": 10000,
        "moveInputWithCursor": true,
        "tabindex": null,
        "autofocus": null,
        "direction": "ltr",
        "phrases": null
    }
}