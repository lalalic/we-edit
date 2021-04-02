import React,{Fragment} from "react"

export default ()=>(
    <Fragment>
        <defs>
            <TableAdder/>
            <Anchor/>
            <Table/>
            <Rotator/>
            <filter x="0" y="0" width="1" height="1" id="background">
                <feFlood floodColor="darkgray"/>
                <feComposite in="SourceGraphic" operator="xor" />
            </filter>
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

const Anchor=()=>(
    <svg id="anchor" height="24" viewBox="0 0 24 24" width="24">
        <path d="M17,15l1.55,1.55c-0.96,1.69-3.33,3.04-5.55,3.37V11h3V9h-3V7.82C14.16,7.4,15,6.3,15,5c0-1.65-1.35-3-3-3S9,3.35,9,5 c0,1.3,0.84,2.4,2,2.82V9H8v2h3v8.92c-2.22-0.33-4.59-1.68-5.55-3.37L7,15l-4-3v3c0,3.88,4.92,7,9,7s9-3.12,9-7v-3L17,15z M12,4 c0.55,0,1,0.45,1,1s-0.45,1-1,1s-1-0.45-1-1S11.45,4,12,4z"/>
    </svg>
)

const Table=()=>(
    <svg id="table" height="24" viewBox="0 0 24 24" width="24">
        <path d="M3 3v18h18V3H3zm8 16H5v-6h6v6zm0-8H5V5h6v6zm8 8h-6v-6h6v6zm0-8h-6V5h6v6z"/>
    </svg>
)