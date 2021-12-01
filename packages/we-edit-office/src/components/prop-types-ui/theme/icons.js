import React, { Fragment } from "react";
import SvgIcon from "material-ui/SvgIcon";

export const IconSuperscript = props => (
    <SvgIcon {...props}>
        <g transform="translate(0 3) scale(0.7)">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </g>
        <text x="15" y="9" style={{ fontSize: 9 }}>2</text>
    </SvgIcon>
);
export const IconSubscript = props => (
    <SvgIcon {...props}>
        <g transform="translate(0 3) scale(0.7)">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </g>
        <text x="15" y="20" style={{ fontSize: 9 }}>2</text>
    </SvgIcon>
);
export const IconTextBorder = props => (
    <SvgIcon {...props}>
        <g transform="translate(0 2)">
            <path d="M5 17m4.5-4.2h5l.9 2.2h2.1L12.75 4h-1.5L6.5 15h2.1l.9-2.2zM12 5.98L13.87 11h-3.74L12 5.98z" />
        </g>
        <path d="M2 2 h20v20h-20z" fill="none" stroke="black" />
    </SvgIcon>
);
const IconBlank = props => <path {...props} d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z" />;
export const IconSize = () => (
    <SvgIcon>
        <g transform="translate(-3,-3)">
            <IconBlank transform="scale(0.6) translate(10,10)" />
            <path d="M8 3 v3v-1.5 h10v-1.5v3" fill="none" stroke="blue" />
            <path d="M9 3 v3v-1.5 h10v-1.5v3" fill="none" stroke="blue" transform="translate(9.5 -1) rotate(90)" />
        </g>
    </SvgIcon>
);
export const IconOrientation = props => (
    <SvgIcon {...props}>
        <g transform="scale(0.8) translate(4 4)">
            <IconBlank transform="translate(-3 -1) scale(0.9)" />
            <IconBlank transform="translate(24 4.5) scale(0.9) rotate(90)" />
        </g>
    </SvgIcon>
);
export const IconMargin = ({ children, ...props }) => (
    <SvgIcon {...props}>
        <path d="M4 2h16v20H4z" fill="none" stroke="black" />

        {children ||
            <Fragment>
                <H />
                <H transform="translate(10 0)" />
                <V />
                <V transform="translate(0 14)" />
            </Fragment>}
    </SvgIcon>
);
const H = props => <path d="M7 2.5 v19" fill="none" stroke="blue" {...props} />;
const V = props => <path d="M4.5 5 h15" fill="none" stroke="blue" {...props} />;
export const Column = props => <path d="M8.5 6.5v12" fill="none" stroke="blue" strokeWidth="5" strokeDasharray="1.5" {...props} />;
export const IconColumn = ({ size = 20, d = (24 - size) / 2, children, ...props }) => (
    <SvgIcon {...props}>
        <path d="M4 2h16v20H4z" fill="none" stroke="black" />
        {children}
    </SvgIcon>
);
