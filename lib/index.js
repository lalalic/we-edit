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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (!String.prototype.splice) {
    String.prototype.splice = function (start, delCount, newSubStr) {
        return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
    };
}

function edit() {}

//Text.WordWrapper=SVGWordWrapper

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
//# sourceMappingURL=data:application/json;base64,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bmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIlxuXG5pZiAoIVN0cmluZy5wcm90b3R5cGUuc3BsaWNlKSB7XG4gICAgU3RyaW5nLnByb3RvdHlwZS5zcGxpY2UgPSBmdW5jdGlvbihzdGFydCwgZGVsQ291bnQsIG5ld1N1YlN0cikge1xuICAgICAgICByZXR1cm4gdGhpcy5zbGljZSgwLCBzdGFydCkgKyBuZXdTdWJTdHIgKyB0aGlzLnNsaWNlKHN0YXJ0ICsgTWF0aC5hYnMoZGVsQ291bnQpKTtcbiAgICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBlZGl0KCl7XG5cbn1cblxuaW1wb3J0IERvY3VtZW50IGZyb20gXCIuL2NvbnRlbnQvZG9jdW1lbnRcIlxuaW1wb3J0IFNlY3Rpb24gZnJvbSBcIi4vY29udGVudC9zZWN0aW9uXCJcbmltcG9ydCBQYXJhZ3JhcGggZnJvbSBcIi4vY29udGVudC9wYXJhZ3JhcGhcIlxuaW1wb3J0IElubGluZSBmcm9tIFwiLi9jb250ZW50L2lubGluZVwiXG5pbXBvcnQgVGV4dCBmcm9tIFwiLi9jb250ZW50L3RleHRcIlxuaW1wb3J0IFNWR1dvcmRXcmFwcGVyIGZyb20gXCIuL3dvcmR3cmFwL3N2Z1wiXG5cbi8vVGV4dC5Xb3JkV3JhcHBlcj1TVkdXb3JkV3JhcHBlclxuXG5leHBvcnQgZnVuY3Rpb24gdGVzdCgpe1xuICAgIFJlYWN0RE9NLnJlbmRlcigoXG4gICAgICAgIDxEb2N1bWVudD5cbiAgICAgICAgICAgIDxTZWN0aW9uPlxuICAgICAgICAgICAgICAgIDxQYXJhZ3JhcGg+XG4gICAgICAgICAgICAgICAgICAgIDxJbmxpbmU+PFRleHQ+e0FycmF5KDI3KS5maWxsKFwiaGVsbG8xLCBsZXQncyBlZGl0XCIpLmpvaW4oXCIgXCIpfTwvVGV4dD48L0lubGluZT5cblx0XHRcdFx0XHQ8SW5saW5lPjxUZXh0PntBcnJheSg3KS5maWxsKFwiaGVsbG8xLCBsZXQncyBlZGl0XCIpLmpvaW4oXCIgXCIpfTwvVGV4dD48L0lubGluZT5cblx0XHRcdFx0XHQ8SW5saW5lPjxUZXh0PntBcnJheSgxKS5maWxsKFwib3ZlclwiKS5qb2luKFwiIFwiKX08L1RleHQ+PC9JbmxpbmU+XG4gICAgICAgICAgICAgICAgPC9QYXJhZ3JhcGg+XG5cdFx0XHRcdDxQYXJhZ3JhcGg+XG4gICAgICAgICAgICAgICAgICAgIDxJbmxpbmU+PFRleHQ+e0FycmF5KDI3KS5maWxsKFwiaGVsbG8xLCBsZXQncyBlZGl0XCIpLmpvaW4oXCIgXCIpfTwvVGV4dD48L0lubGluZT5cblx0XHRcdFx0XHQ8SW5saW5lPjxUZXh0PntBcnJheSg3KS5maWxsKFwiaGVsbG8xLCBsZXQncyBlZGl0XCIpLmpvaW4oXCIgXCIpfTwvVGV4dD48L0lubGluZT5cblx0XHRcdFx0XHQ8SW5saW5lPjxUZXh0PntBcnJheSgxKS5maWxsKFwib3ZlclwiKS5qb2luKFwiIFwiKX08L1RleHQ+PC9JbmxpbmU+XG4gICAgICAgICAgICAgICAgPC9QYXJhZ3JhcGg+XG4gICAgICAgICAgICA8L1NlY3Rpb24+XG5cblx0XHRcdDxTZWN0aW9uIHBhZ2U9e3t3aWR0aDoyMDAsIGhlaWdodDoyMDAsIG1hcmdpbjoxMH19PlxuICAgICAgICAgICAgICAgIDxQYXJhZ3JhcGg+XG4gICAgICAgICAgICAgICAgICAgIDxJbmxpbmU+PFRleHQ+e0FycmF5KDI3KS5maWxsKFwiaGVsbG8xLCBsZXQncyBlZGl0XCIpLmpvaW4oXCIgXCIpfTwvVGV4dD48L0lubGluZT5cblx0XHRcdFx0XHQ8SW5saW5lPjxUZXh0PntBcnJheSg3KS5maWxsKFwiaGVsbG8xLCBsZXQncyBlZGl0XCIpLmpvaW4oXCIgXCIpfTwvVGV4dD48L0lubGluZT5cblx0XHRcdFx0XHQ8SW5saW5lPjxUZXh0PntBcnJheSgxKS5maWxsKFwib3ZlclwiKS5qb2luKFwiIFwiKX08L1RleHQ+PC9JbmxpbmU+XG4gICAgICAgICAgICAgICAgPC9QYXJhZ3JhcGg+XG5cdFx0XHRcdDxQYXJhZ3JhcGg+XG4gICAgICAgICAgICAgICAgICAgIDxJbmxpbmU+PFRleHQ+e0FycmF5KDI3KS5maWxsKFwiaGVsbG8xLCBsZXQncyBlZGl0XCIpLmpvaW4oXCIgXCIpfTwvVGV4dD48L0lubGluZT5cblx0XHRcdFx0XHQ8SW5saW5lPjxUZXh0PntBcnJheSg3KS5maWxsKFwiaGVsbG8xLCBsZXQncyBlZGl0XCIpLmpvaW4oXCIgXCIpfTwvVGV4dD48L0lubGluZT5cblx0XHRcdFx0XHQ8SW5saW5lPjxUZXh0PntBcnJheSgxKS5maWxsKFwib3ZlclwiKS5qb2luKFwiIFwiKX08L1RleHQ+PC9JbmxpbmU+XG4gICAgICAgICAgICAgICAgPC9QYXJhZ3JhcGg+XG4gICAgICAgICAgICA8L1NlY3Rpb24+XG5cbiAgICAgICAgPC9Eb2N1bWVudD5cbiAgICApLGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhcHAnKSlcbn1cbiJdfQ==