"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = edit;
exports.test = test;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _document = require("./content/document");

var _document2 = _interopRequireDefault(_document);

var _section = require("./content/section");

var _section2 = _interopRequireDefault(_section);

var _paragraph = require("./content/paragraph");

var _paragraph2 = _interopRequireDefault(_paragraph);

var _inline = require("./content/inline");

var _inline2 = _interopRequireDefault(_inline);

var _text = require("./content/text");

var _text2 = _interopRequireDefault(_text);

var _svg = require("./wordwrap/svg");

var _svg2 = _interopRequireDefault(_svg);

var _canvas = require("./wordwrap/canvas");

var _canvas2 = _interopRequireDefault(_canvas);

var _fonts = require("./wordwrap/fonts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (!String.prototype.splice) {
    String.prototype.splice = function (start, delCount, newSubStr) {
        return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
    };
}

function edit() {}

//Text.WordWrapper=CanvasWordWrapper

function test() {
    (0, _fonts.loadFont)();

    _reactDom2.default.render(_react2.default.createElement(
        _document2.default,
        null,
        _react2.default.createElement(
            _section2.default,
            null,
            _react2.default.createElement(
                _paragraph2.default,
                null,
                _react2.default.createElement(
                    _inline2.default,
                    null,
                    _react2.default.createElement(
                        _text2.default,
                        null,
                        Array(27).fill("hello1, let's edit").join(" ")
                    )
                ),
                _react2.default.createElement(
                    _inline2.default,
                    null,
                    _react2.default.createElement(
                        _text2.default,
                        null,
                        Array(7).fill("hello1, let's edit").join(" ")
                    )
                ),
                _react2.default.createElement(
                    _inline2.default,
                    null,
                    _react2.default.createElement(
                        _text2.default,
                        null,
                        Array(1).fill("over").join(" ")
                    )
                )
            ),
            _react2.default.createElement(
                _paragraph2.default,
                null,
                _react2.default.createElement(
                    _inline2.default,
                    null,
                    _react2.default.createElement(
                        _text2.default,
                        null,
                        Array(27).fill("hello1, let's edit").join(" ")
                    )
                ),
                _react2.default.createElement(
                    _inline2.default,
                    null,
                    _react2.default.createElement(
                        _text2.default,
                        null,
                        Array(7).fill("hello1, let's edit").join(" ")
                    )
                ),
                _react2.default.createElement(
                    _inline2.default,
                    null,
                    _react2.default.createElement(
                        _text2.default,
                        null,
                        Array(1).fill("over").join(" ")
                    )
                )
            )
        ),
        _react2.default.createElement(
            _section2.default,
            { page: { width: 200, height: 200, margin: 10 } },
            _react2.default.createElement(
                _paragraph2.default,
                null,
                _react2.default.createElement(
                    _inline2.default,
                    null,
                    _react2.default.createElement(
                        _text2.default,
                        null,
                        Array(27).fill("hello1, let's edit").join(" ")
                    )
                ),
                _react2.default.createElement(
                    _inline2.default,
                    null,
                    _react2.default.createElement(
                        _text2.default,
                        null,
                        Array(7).fill("hello1, let's edit").join(" ")
                    )
                ),
                _react2.default.createElement(
                    _inline2.default,
                    null,
                    _react2.default.createElement(
                        _text2.default,
                        null,
                        Array(1).fill("over").join(" ")
                    )
                )
            ),
            _react2.default.createElement(
                _paragraph2.default,
                null,
                _react2.default.createElement(
                    _inline2.default,
                    null,
                    _react2.default.createElement(
                        _text2.default,
                        null,
                        Array(27).fill("hello1, let's edit").join(" ")
                    )
                ),
                _react2.default.createElement(
                    _inline2.default,
                    null,
                    _react2.default.createElement(
                        _text2.default,
                        null,
                        Array(7).fill("hello1, let's edit").join(" ")
                    )
                ),
                _react2.default.createElement(
                    _inline2.default,
                    null,
                    _react2.default.createElement(
                        _text2.default,
                        null,
                        Array(1).fill("over").join(" ")
                    )
                )
            )
        )
    ), document.querySelector('#app'));
}
//# sourceMappingURL=data:application/json;base64,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QXZCLENBN0JGLEVBSGtCO0NBQWYiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCJcblxuaWYgKCFTdHJpbmcucHJvdG90eXBlLnNwbGljZSkge1xuICAgIFN0cmluZy5wcm90b3R5cGUuc3BsaWNlID0gZnVuY3Rpb24oc3RhcnQsIGRlbENvdW50LCBuZXdTdWJTdHIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2xpY2UoMCwgc3RhcnQpICsgbmV3U3ViU3RyICsgdGhpcy5zbGljZShzdGFydCArIE1hdGguYWJzKGRlbENvdW50KSk7XG4gICAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZWRpdCgpe1xuXG59XG5cbmltcG9ydCBEb2N1bWVudCBmcm9tIFwiLi9jb250ZW50L2RvY3VtZW50XCJcbmltcG9ydCBTZWN0aW9uIGZyb20gXCIuL2NvbnRlbnQvc2VjdGlvblwiXG5pbXBvcnQgUGFyYWdyYXBoIGZyb20gXCIuL2NvbnRlbnQvcGFyYWdyYXBoXCJcbmltcG9ydCBJbmxpbmUgZnJvbSBcIi4vY29udGVudC9pbmxpbmVcIlxuaW1wb3J0IFRleHQgZnJvbSBcIi4vY29udGVudC90ZXh0XCJcbmltcG9ydCBTVkdXb3JkV3JhcHBlciBmcm9tIFwiLi93b3Jkd3JhcC9zdmdcIlxuaW1wb3J0IENhbnZhc1dvcmRXcmFwcGVyIGZyb20gXCIuL3dvcmR3cmFwL2NhbnZhc1wiXG5cbmltcG9ydCB7bG9hZEZvbnR9IGZyb20gXCIuL3dvcmR3cmFwL2ZvbnRzXCJcblxuLy9UZXh0LldvcmRXcmFwcGVyPUNhbnZhc1dvcmRXcmFwcGVyXG5cbmV4cG9ydCBmdW5jdGlvbiB0ZXN0KCl7XG4gICAgbG9hZEZvbnQoKVxuXG4gICAgUmVhY3RET00ucmVuZGVyKChcbiAgICAgICAgPERvY3VtZW50PlxuICAgICAgICAgICAgPFNlY3Rpb24+XG4gICAgICAgICAgICAgICAgPFBhcmFncmFwaD5cbiAgICAgICAgICAgICAgICAgICAgPElubGluZT48VGV4dD57QXJyYXkoMjcpLmZpbGwoXCJoZWxsbzEsIGxldCdzIGVkaXRcIikuam9pbihcIiBcIil9PC9UZXh0PjwvSW5saW5lPlxuXHRcdFx0XHRcdDxJbmxpbmU+PFRleHQ+e0FycmF5KDcpLmZpbGwoXCJoZWxsbzEsIGxldCdzIGVkaXRcIikuam9pbihcIiBcIil9PC9UZXh0PjwvSW5saW5lPlxuXHRcdFx0XHRcdDxJbmxpbmU+PFRleHQ+e0FycmF5KDEpLmZpbGwoXCJvdmVyXCIpLmpvaW4oXCIgXCIpfTwvVGV4dD48L0lubGluZT5cbiAgICAgICAgICAgICAgICA8L1BhcmFncmFwaD5cblx0XHRcdFx0PFBhcmFncmFwaD5cbiAgICAgICAgICAgICAgICAgICAgPElubGluZT48VGV4dD57QXJyYXkoMjcpLmZpbGwoXCJoZWxsbzEsIGxldCdzIGVkaXRcIikuam9pbihcIiBcIil9PC9UZXh0PjwvSW5saW5lPlxuXHRcdFx0XHRcdDxJbmxpbmU+PFRleHQ+e0FycmF5KDcpLmZpbGwoXCJoZWxsbzEsIGxldCdzIGVkaXRcIikuam9pbihcIiBcIil9PC9UZXh0PjwvSW5saW5lPlxuXHRcdFx0XHRcdDxJbmxpbmU+PFRleHQ+e0FycmF5KDEpLmZpbGwoXCJvdmVyXCIpLmpvaW4oXCIgXCIpfTwvVGV4dD48L0lubGluZT5cbiAgICAgICAgICAgICAgICA8L1BhcmFncmFwaD5cbiAgICAgICAgICAgIDwvU2VjdGlvbj5cblxuXHRcdFx0PFNlY3Rpb24gcGFnZT17e3dpZHRoOjIwMCwgaGVpZ2h0OjIwMCwgbWFyZ2luOjEwfX0+XG4gICAgICAgICAgICAgICAgPFBhcmFncmFwaD5cbiAgICAgICAgICAgICAgICAgICAgPElubGluZT48VGV4dD57QXJyYXkoMjcpLmZpbGwoXCJoZWxsbzEsIGxldCdzIGVkaXRcIikuam9pbihcIiBcIil9PC9UZXh0PjwvSW5saW5lPlxuXHRcdFx0XHRcdDxJbmxpbmU+PFRleHQ+e0FycmF5KDcpLmZpbGwoXCJoZWxsbzEsIGxldCdzIGVkaXRcIikuam9pbihcIiBcIil9PC9UZXh0PjwvSW5saW5lPlxuXHRcdFx0XHRcdDxJbmxpbmU+PFRleHQ+e0FycmF5KDEpLmZpbGwoXCJvdmVyXCIpLmpvaW4oXCIgXCIpfTwvVGV4dD48L0lubGluZT5cbiAgICAgICAgICAgICAgICA8L1BhcmFncmFwaD5cblx0XHRcdFx0PFBhcmFncmFwaD5cbiAgICAgICAgICAgICAgICAgICAgPElubGluZT48VGV4dD57QXJyYXkoMjcpLmZpbGwoXCJoZWxsbzEsIGxldCdzIGVkaXRcIikuam9pbihcIiBcIil9PC9UZXh0PjwvSW5saW5lPlxuXHRcdFx0XHRcdDxJbmxpbmU+PFRleHQ+e0FycmF5KDcpLmZpbGwoXCJoZWxsbzEsIGxldCdzIGVkaXRcIikuam9pbihcIiBcIil9PC9UZXh0PjwvSW5saW5lPlxuXHRcdFx0XHRcdDxJbmxpbmU+PFRleHQ+e0FycmF5KDEpLmZpbGwoXCJvdmVyXCIpLmpvaW4oXCIgXCIpfTwvVGV4dD48L0lubGluZT5cbiAgICAgICAgICAgICAgICA8L1BhcmFncmFwaD5cbiAgICAgICAgICAgIDwvU2VjdGlvbj5cblxuICAgICAgICA8L0RvY3VtZW50PlxuICAgICksZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FwcCcpKVxufVxuIl19