<document defaultStyles={{text:{fonts:"Arial", size:"12pt"}}}>
    <page size="A4" I={0} margin="1in">
        <anchor x={"3cm"} y={100}>
            <shape geometry={{width:100,height:300}} outline={{width:1, color:"red"}}>
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