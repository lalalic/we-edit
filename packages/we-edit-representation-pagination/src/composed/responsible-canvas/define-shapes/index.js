import React,{Fragment} from "react"

export default ()=>(
    <Fragment>
        <defs>
            <TableAdder/>
            <Rotator/>
        </defs>
    </Fragment>
)

const TableAdder=()=>(
    <path id="table.adder"
        width={14}
        height={20}
        strokeWidth={1}
        fill="transparent"
        d="M8,9h8M12,5v8 M12,2C8.13,2,5,5.13,5,9c0,5.25,7,13,7,13s7-7.75,7-13C19,5.13,15.87,2,12,2z"
        />
)

const Rotator=()=>(
    <svg id="rotator" viewBox="0 0 24 24" width={24} height={24}>
        <circle cx={12} cy={12} r={15}
            stroke="transparent"
            fillOpacity={0.01}
            cursor="pointer"/>
        <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
    </svg>
)