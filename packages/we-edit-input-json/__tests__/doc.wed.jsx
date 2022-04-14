<document 
    styles={{paragraph:{},text:{fonts:"Arial", size:12}}}
    numberings={{"50":[{hanging:'0.9cm', left:'1cm',label:"*"}]}}
    >
    <page size="A4">
        <frame x={500} y={500}>
            <paragraph>
                <text>hello</text>
                <text>world</text>
            </paragraph>
            <paragraph>
                <text>hello</text>
                <text>world</text>
                <image src="./favico.ico"/>
            </paragraph>
            <table>
                <row>
                    <cell><paragraph><text>hello</text></paragraph></cell>
                    <cell/>
                </row>
                <row>
                    <cell><paragraph><text>hello</text></paragraph></cell>
                    <cell/>
                </row>
            </table>
        </frame>

        <frame {...{x:100,y:400,width:200,height:200,test4:"numbering"}}>
            <paragraph>
                <text>hello world</text>
            </paragraph>
            <paragraph numbering={{id:"50",level:0}}>
                <text>hello world</text>
            </paragraph>
            <paragraph/>
            <paragraph/>
            <paragraph>
                <text>hello world</text>
            </paragraph>
        </frame>
    </page>
</document>