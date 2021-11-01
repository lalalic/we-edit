import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Test } from "we-edit";
import IconButton from "../components/size-icon-button";
import IconTest from "material-ui/svg-icons/action/bug-report";
import IconFile from "material-ui/svg-icons/file/create-new-folder";
import IconRun from "material-ui/svg-icons/av/play-circle-outline";
import IconRunFails from "material-ui/svg-icons/av/slow-motion-video";
import selectFile from "../components/file-select";


export default class Tester extends PureComponent {
    constructor() {
        super(...arguments);
        this.state = {};
    }

    render() {
        const { src, key, testing, target, lastFailed } = this.state;
        const style = { padding: 2 };
        return (
            <div>
                <div style={{ borderBottom: "1px solid lightgray" }}>
                    <IconButton
                        disabled={testing ? true : false}
                        style={style}
                        onClick={e => {
                            selectFile(".js")
                                .then(url => {
                                    if (src) {
                                        URL.revokeObjectURL(src);
                                    }
                                    this.setState({ src: url, key: url, target: undefined });
                                });
                        }}
                        children={<IconFile />} />

                    {src && <IconButton label={"start"}
                        disabled={testing ? true : false}
                        style={style}
                        children={<IconRun />}
                        onClick={e => {
                            this.setState({ key: Date.now(), target: undefined });
                        }} />}

                    {lastFailed && lastFailed.length && <IconButton label={"test fails"}
                        disabled={testing ? true : false}
                        style={style}
                        children={<IconRunFails />}
                        onClick={e => {
                            this.setState({ key: Date.now(), target: [...lastFailed] });
                        }} />}
                </div>
                <Test ref={this.tester} fixture={src} key={key} auto={key != src} focus={target}
                    onEnd={({ status, failed }) => {
                        if (status == "failed") {
                            this.setState({ lastFailed: failed });
                        }
                    }}

                    onChange={({ testing }) => {
                        this.setState({ testing });
                    }}

                    on1Chosen={id => {
                        this.setState({ key: Date.now(), target: [id] });
                    }} />
            </div>
        );
    }

    static panel = <Tester title="Test" />;
    static Button = class extends PureComponent {
        static contextTypes = {
            panelManager: PropTypes.any,
        };
        render() {
            const { title = Tester.panel.props.title, whichPanel = "right", ...props } = this.props;
            return (
                <IconButton
                    {...props}
                    hint={title}
                    onClick={() => this.context.panelManager.toggle(Tester.panel, whichPanel)}>
                    <IconTest />
                </IconButton>
            );
        }
    };
}
