import React from "react"
import { uuid } from "./index"
export {default as FillTextures} from "./textures"

export const LineWeights = [0.25, 0.5, 0.75, 1, 1.5, 2.25, 3, 4.5, 6];
export const LineDashes = ["", "1", "4 2", "4 2 2 2", "6 2", "6 2 2 2", "6 2 2 2 2 2"];
export const LineSketches = ["M0 5h30", "M0 5h30"];
export const FillGradients = [
    { type: "linear", angle: 90, stops: [{ offset: "0%", color: "blue" }, { offset: "100%", color: "red" }] },
    { type: "linear", angle: 90, stops: [{ offset: "0%", color: "blue" }, { offset: "100%", color: "red" }] },
    { type: "linear", angle: 90, stops: [{ offset: "0%", color: "blue" }, { offset: "100%", color: "red" }] },
    { type: "linear", angle: 90, stops: [{ offset: "0%", color: "blue" }, { offset: "100%", color: "red" }] },
    { type: "linear", angle: 90, stops: [{ offset: "0%", color: "blue" }, { offset: "100%", color: "red" }] },
    { type: "linear", angle: 90, stops: [{ offset: "0%", color: "blue" }, { offset: "100%", color: "red" }] },
    { type: "linear", angle: 90, stops: [{ offset: "0%", color: "blue" }, { offset: "100%", color: "red" }] },
    { type: "linear", angle: 90, stops: [{ offset: "0%", color: "blue" }, { offset: "100%", color: "red" }] },
];
export const FillPatterns = [
    <polygon points={"0,0 2,5 0,10 5,8 10,10 8,5 10,0 5,2"} />,
    <circle r={1} cx={5} cy={5} />,
    <line {...{ x1: 0, y1: 10, x2: 10, y2: 0, strokeLinecap: "round", strokeWidth: 1, strokeDasharray: "3,5", stroke: "black" }} />,
];
export const Gradient = ({ value: { type, angle = 0, stops }, onClick }) => (
    <div onClick={onClick} style={{ width: 45, height: 45, }}>
        <div style={{
            width: "100%", height: "100%",
            background: `${type}-gradient(${angle}deg,${stops.map(({ offset, color }) => `${color} ${offset}`).join(",")})`
        }} />
    </div>
);
export const Pattern = ({ value, onClick, checked, id = `ptn_${uuid++}` }) => (
    <svg style={{ width: 45, height: 45 }} onClick={onClick}>
        <defs>
            <pattern id={id} viewBox="0,0,10,10" width="20%" height="20%">
                {value}
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
);
