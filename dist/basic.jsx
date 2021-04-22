<document defaultStyles={{text:{fonts:"Arial", size:12}}}>
    <page size="A4" I={0} margin="1in">
        {/*
        <paragraph>
            <text bold={true}>
                hello world
            </text>
        </paragraph>
        */}
        <anchor x={100} y={100}>
            <shape geometry="M0 0 h100 v300 h-100Z" rotate={30} outline={{width:1, color:"red"}}>
                <frame width={100} height={300} margin={10}>
                    <paragraph>
                        <text>hello world</text>
                    </paragraph>

                    <anchor x={300} y={300}>
                        <frame width={50}>
                            <paragraph>
                                <text>hello world</text>
                            </paragraph>
                        </frame>
                    </anchor>
                </frame>
            </shape>
        </anchor>
    </page>
</document>