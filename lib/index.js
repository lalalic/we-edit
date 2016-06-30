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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (!String.prototype.splice) {
    String.prototype.splice = function (start, delCount, newSubStr) {
        return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
    };
}

function edit() {}

var setState = _react.Component.prototype.setState;
_react.Component.prototype.setState = function () {
    console.log("setState on " + this.displayName);
    setState.call.apply(setState, [this].concat(Array.prototype.slice.call(arguments)));
};

function test() {
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
                    Array(27).fill("hello1, let's edit").join(" ")
                ),
                _react2.default.createElement(
                    _inline2.default,
                    null,
                    Array(7).fill("hello1, let's edit").join(" ")
                ),
                _react2.default.createElement(
                    _inline2.default,
                    null,
                    Array(1).fill("over").join(" ")
                )
            ),
            _react2.default.createElement(
                _paragraph2.default,
                null,
                _react2.default.createElement(
                    _inline2.default,
                    null,
                    Array(27).fill("hello1, let's edit").join(" ")
                ),
                _react2.default.createElement(
                    _inline2.default,
                    null,
                    Array(7).fill("hello1, let's edit").join(" ")
                ),
                _react2.default.createElement(
                    _inline2.default,
                    null,
                    Array(1).fill("over").join(" ")
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
                    Array(27).fill("hello1, let's edit").join(" ")
                ),
                _react2.default.createElement(
                    _inline2.default,
                    null,
                    Array(7).fill("hello1, let's edit").join(" ")
                ),
                _react2.default.createElement(
                    _inline2.default,
                    null,
                    Array(1).fill("over").join(" ")
                )
            ),
            _react2.default.createElement(
                _paragraph2.default,
                null,
                _react2.default.createElement(
                    _inline2.default,
                    null,
                    Array(27).fill("hello1, let's edit").join(" ")
                ),
                _react2.default.createElement(
                    _inline2.default,
                    null,
                    Array(7).fill("hello1, let's edit").join(" ")
                ),
                _react2.default.createElement(
                    _inline2.default,
                    null,
                    Array(1).fill("over").join(" ")
                )
            )
        )
    ), document.querySelector('#app'));
}
//# sourceMappingURL=data:application/json;base64,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Q29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCJcblxuaWYgKCFTdHJpbmcucHJvdG90eXBlLnNwbGljZSkge1xuICAgIFN0cmluZy5wcm90b3R5cGUuc3BsaWNlID0gZnVuY3Rpb24oc3RhcnQsIGRlbENvdW50LCBuZXdTdWJTdHIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2xpY2UoMCwgc3RhcnQpICsgbmV3U3ViU3RyICsgdGhpcy5zbGljZShzdGFydCArIE1hdGguYWJzKGRlbENvdW50KSk7XG4gICAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZWRpdCgpe1xuXG59XG5cbmltcG9ydCBEb2N1bWVudCBmcm9tIFwiLi9jb250ZW50L2RvY3VtZW50XCJcbmltcG9ydCBTZWN0aW9uIGZyb20gXCIuL2NvbnRlbnQvc2VjdGlvblwiXG5pbXBvcnQgUGFyYWdyYXBoIGZyb20gXCIuL2NvbnRlbnQvcGFyYWdyYXBoXCJcbmltcG9ydCBJbmxpbmUgZnJvbSBcIi4vY29udGVudC9pbmxpbmVcIlxuXG52YXIgc2V0U3RhdGU9Q29tcG9uZW50LnByb3RvdHlwZS5zZXRTdGF0ZVxuQ29tcG9uZW50LnByb3RvdHlwZS5zZXRTdGF0ZT1mdW5jdGlvbigpe1xuICAgIGNvbnNvbGUubG9nKGBzZXRTdGF0ZSBvbiAke3RoaXMuZGlzcGxheU5hbWV9YClcbiAgICBzZXRTdGF0ZS5jYWxsKHRoaXMsLi4uYXJndW1lbnRzKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdGVzdCgpe1xuICAgIFJlYWN0RE9NLnJlbmRlcigoXG4gICAgICAgIDxEb2N1bWVudD5cbiAgICAgICAgICAgIDxTZWN0aW9uPlxuICAgICAgICAgICAgICAgIDxQYXJhZ3JhcGg+XG4gICAgICAgICAgICAgICAgICAgIDxJbmxpbmU+e0FycmF5KDI3KS5maWxsKFwiaGVsbG8xLCBsZXQncyBlZGl0XCIpLmpvaW4oXCIgXCIpfTwvSW5saW5lPlxuXHRcdFx0XHRcdDxJbmxpbmU+e0FycmF5KDcpLmZpbGwoXCJoZWxsbzEsIGxldCdzIGVkaXRcIikuam9pbihcIiBcIil9PC9JbmxpbmU+XG5cdFx0XHRcdFx0PElubGluZT57QXJyYXkoMSkuZmlsbChcIm92ZXJcIikuam9pbihcIiBcIil9PC9JbmxpbmU+XG4gICAgICAgICAgICAgICAgPC9QYXJhZ3JhcGg+XG5cdFx0XHRcdDxQYXJhZ3JhcGg+XG4gICAgICAgICAgICAgICAgICAgIDxJbmxpbmU+e0FycmF5KDI3KS5maWxsKFwiaGVsbG8xLCBsZXQncyBlZGl0XCIpLmpvaW4oXCIgXCIpfTwvSW5saW5lPlxuXHRcdFx0XHRcdDxJbmxpbmU+e0FycmF5KDcpLmZpbGwoXCJoZWxsbzEsIGxldCdzIGVkaXRcIikuam9pbihcIiBcIil9PC9JbmxpbmU+XG5cdFx0XHRcdFx0PElubGluZT57QXJyYXkoMSkuZmlsbChcIm92ZXJcIikuam9pbihcIiBcIil9PC9JbmxpbmU+XG4gICAgICAgICAgICAgICAgPC9QYXJhZ3JhcGg+XG4gICAgICAgICAgICA8L1NlY3Rpb24+XG5cdFx0XHRcblx0XHRcdDxTZWN0aW9uIHBhZ2U9e3t3aWR0aDoyMDAsIGhlaWdodDoyMDAsIG1hcmdpbjoxMH19PlxuICAgICAgICAgICAgICAgIDxQYXJhZ3JhcGg+XG4gICAgICAgICAgICAgICAgICAgIDxJbmxpbmU+e0FycmF5KDI3KS5maWxsKFwiaGVsbG8xLCBsZXQncyBlZGl0XCIpLmpvaW4oXCIgXCIpfTwvSW5saW5lPlxuXHRcdFx0XHRcdDxJbmxpbmU+e0FycmF5KDcpLmZpbGwoXCJoZWxsbzEsIGxldCdzIGVkaXRcIikuam9pbihcIiBcIil9PC9JbmxpbmU+XG5cdFx0XHRcdFx0PElubGluZT57QXJyYXkoMSkuZmlsbChcIm92ZXJcIikuam9pbihcIiBcIil9PC9JbmxpbmU+XG4gICAgICAgICAgICAgICAgPC9QYXJhZ3JhcGg+XG5cdFx0XHRcdDxQYXJhZ3JhcGg+XG4gICAgICAgICAgICAgICAgICAgIDxJbmxpbmU+e0FycmF5KDI3KS5maWxsKFwiaGVsbG8xLCBsZXQncyBlZGl0XCIpLmpvaW4oXCIgXCIpfTwvSW5saW5lPlxuXHRcdFx0XHRcdDxJbmxpbmU+e0FycmF5KDcpLmZpbGwoXCJoZWxsbzEsIGxldCdzIGVkaXRcIikuam9pbihcIiBcIil9PC9JbmxpbmU+XG5cdFx0XHRcdFx0PElubGluZT57QXJyYXkoMSkuZmlsbChcIm92ZXJcIikuam9pbihcIiBcIil9PC9JbmxpbmU+XG4gICAgICAgICAgICAgICAgPC9QYXJhZ3JhcGg+XG4gICAgICAgICAgICA8L1NlY3Rpb24+XG5cbiAgICAgICAgPC9Eb2N1bWVudD5cbiAgICApLGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhcHAnKSlcbn1cbiJdfQ==