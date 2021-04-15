<document defaultStyles={{text:{fonts:"Arial", size:12}}}>
    <page size="A4" width={1000} height={500} I={0}>
        <paragraph>
            <text bold={true}>
                hello world
            </text>
        </paragraph>
        <frame x={250} y={250} width={100} height={300}>
            <paragraph>
                <text>hello world</text>
            </paragraph>
        </frame>

        
        <anchor x={100} y={100}>
            <shape geometry="M0 0 h50 v50 h-50Z" outline={{width:1, color:"red"}}>
                <frame width={50}>
                    <paragraph>
                        <text>hello world</text>
                    </paragraph>
                </frame>
            </shape>
        </anchor>
    </page>
</document>