import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import { getFile } from "we-edit";
import { createPortal } from "react-dom";
import IconButton from "../components/size-icon-button";
import IconDiff from "material-ui/svg-icons/action/compare-arrows";
import Diff from "./diff";


export default class DiffInput extends Diff {
    static Button = class DiffButton extends PureComponent {
        static contextTypes = {
            activeDocStore: PropTypes.any
        };

        constructor() {
            super(...arguments);
            this.state = { open: false };
        }

        get activeFile() {
            const { parseActive = (file) => file.doc?.parts || {} } = this.props;
            return new Proxy(parseActive(getFile(this.context.activeDocStore.getState())), {
                get(target, k) {
                    if (k in target) {
                        const f = target[k];
                        return {
                            asText() {
                                if ('asText' in f)
                                    return f.asText();
                                else if ('html' in f) {
                                    return f.html();
                                }
                                return "[]";
                            }
                        };
                    }
                }
            });
        }

        render() {
            const { state: { open }, props: { title = "Compare", parseFile } } = this;
            return (
                <Fragment>
                    <IconButton hint={title} onClick={e => this.setState({ open: !open })}>
                        <IconDiff />
                    </IconButton>
                    {open &&
                        createPortal(
                            <div style={{ position: "fixed", width: "100%", height: "100%", zIndex: 9999 }}>
                                <Diff files={[{ name: "[Active]", parts: this.activeFile }]} parse={parseFile}
                                    onRequestClose={e => this.setState({ open: false })}
                                    style={{
                                        width: "80%", height: "80%",
                                        margin: "80px auto 0px auto", background: "white",
                                        border: "1px solid lightgray",
                                        overflow: "hidden", top: 80,
                                    }} />
                            </div>,
                            document.body
                        )}
                </Fragment>
            );
        }
    };
}
