import React, { PureComponent } from "react";
import { SvgIcon } from "material-ui";

const lines = <path d={new Array(21 / 3).fill(0).map((a, i) => `M0 ${i * 3}h44`).join("")} stroke="lightgray" strokeWidth={2} />;
const dog = <path d="M20.5 6c-2.61.7-5.67 1-8.5 1s-5.89-.3-8.5-1L3 8c1.86.5 4 .83 6 1v13h4v-6h4v6h4V9c2-.17 4.14-.5 6-1l-.5-2zM12 6c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />;
export const IconWrap = props => (<SvgIcon {...props}> {lines} {dog} </SvgIcon>);
export class IconWrapSquare extends PureComponent {
    label = "Square";
    render() {
        return (
            <div style={{ display: "inline-block", width: 75, height: 75, padding: 20, fontSize: 10, textAlign: "center" }}>
                <SvgIcon style={{ width: 50, height: 50 }}>
                    {lines}
                    {dog}
                </SvgIcon>
                <div>{this.label}</div>
            </div>
        );
    }
}
export class IconWrapTight extends IconWrapSquare {
    label = "Tight";
}
export class IconWrapThrough extends IconWrapSquare {
    label = "Through";
}
export class IconWrapClear extends IconWrapSquare {
    label = "Top and bottom";
}
export class IconWrapBehind extends IconWrapSquare {
    label = "Behind text";
}
export class IconWrapFront extends IconWrapSquare {
    label = "In front of Text";
}
export class IconWrapInline extends IconWrapSquare {
    label = "Inline with text";
}
