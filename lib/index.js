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
        ),
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
        )
    ), document.querySelector('#app'));
}
//# sourceMappingURL=data:application/json;base64,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ZSxvQkFBZixFQUFxQyxJQUFyQyxDQUEwQyxHQUExQyxDQUFQO3FCQUFSO2lCQURKO2dCQUVYOzs7b0JBQVE7Ozt3QkFBTyxNQUFNLENBQU4sRUFBUyxJQUFULENBQWMsb0JBQWQsRUFBb0MsSUFBcEMsQ0FBeUMsR0FBekMsQ0FBUDtxQkFBUjtpQkFGVztnQkFHWDs7O29CQUFROzs7d0JBQU8sTUFBTSxDQUFOLEVBQVMsSUFBVCxDQUFjLE1BQWQsRUFBc0IsSUFBdEIsQ0FBMkIsR0FBM0IsQ0FBUDtxQkFBUjtpQkFIVzthQUREO1lBTVg7OztnQkFDZ0I7OztvQkFBUTs7O3dCQUFPLE1BQU0sRUFBTixFQUFVLElBQVYsQ0FBZSxvQkFBZixFQUFxQyxJQUFyQyxDQUEwQyxHQUExQyxDQUFQO3FCQUFSO2lCQURoQjtnQkFFQzs7O29CQUFROzs7d0JBQU8sTUFBTSxDQUFOLEVBQVMsSUFBVCxDQUFjLG9CQUFkLEVBQW9DLElBQXBDLENBQXlDLEdBQXpDLENBQVA7cUJBQVI7aUJBRkQ7Z0JBR0M7OztvQkFBUTs7O3dCQUFPLE1BQU0sQ0FBTixFQUFTLElBQVQsQ0FBYyxNQUFkLEVBQXNCLElBQXRCLENBQTJCLEdBQTNCLENBQVA7cUJBQVI7aUJBSEQ7YUFOVztTQTNCUDtLQURKLEVBMENFLFNBQVMsYUFBVCxDQUF1QixNQUF2QixDQTFDRixFQURrQjtDQUFmIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiXG5cbmlmICghU3RyaW5nLnByb3RvdHlwZS5zcGxpY2UpIHtcbiAgICBTdHJpbmcucHJvdG90eXBlLnNwbGljZSA9IGZ1bmN0aW9uKHN0YXJ0LCBkZWxDb3VudCwgbmV3U3ViU3RyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNsaWNlKDAsIHN0YXJ0KSArIG5ld1N1YlN0ciArIHRoaXMuc2xpY2Uoc3RhcnQgKyBNYXRoLmFicyhkZWxDb3VudCkpO1xuICAgIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGVkaXQoKXtcblxufVxuXG5pbXBvcnQgRG9jdW1lbnQgZnJvbSBcIi4vY29udGVudC9kb2N1bWVudFwiXG5pbXBvcnQgU2VjdGlvbiBmcm9tIFwiLi9jb250ZW50L3NlY3Rpb25cIlxuaW1wb3J0IFBhcmFncmFwaCBmcm9tIFwiLi9jb250ZW50L3BhcmFncmFwaFwiXG5pbXBvcnQgSW5saW5lIGZyb20gXCIuL2NvbnRlbnQvaW5saW5lXCJcbmltcG9ydCBUZXh0IGZyb20gXCIuL2NvbnRlbnQvdGV4dFwiXG5pbXBvcnQgU1ZHV29yZFdyYXBwZXIgZnJvbSBcIi4vd29yZHdyYXAvc3ZnXCJcblxuLy9UZXh0LldvcmRXcmFwcGVyPVNWR1dvcmRXcmFwcGVyXG5cbmV4cG9ydCBmdW5jdGlvbiB0ZXN0KCl7XG4gICAgUmVhY3RET00ucmVuZGVyKChcbiAgICAgICAgPERvY3VtZW50PlxuICAgICAgICAgICAgPFNlY3Rpb24+XG4gICAgICAgICAgICAgICAgPFBhcmFncmFwaD5cbiAgICAgICAgICAgICAgICAgICAgPElubGluZT48VGV4dD57QXJyYXkoMjcpLmZpbGwoXCJoZWxsbzEsIGxldCdzIGVkaXRcIikuam9pbihcIiBcIil9PC9UZXh0PjwvSW5saW5lPlxuXHRcdFx0XHRcdDxJbmxpbmU+PFRleHQ+e0FycmF5KDcpLmZpbGwoXCJoZWxsbzEsIGxldCdzIGVkaXRcIikuam9pbihcIiBcIil9PC9UZXh0PjwvSW5saW5lPlxuXHRcdFx0XHRcdDxJbmxpbmU+PFRleHQ+e0FycmF5KDEpLmZpbGwoXCJvdmVyXCIpLmpvaW4oXCIgXCIpfTwvVGV4dD48L0lubGluZT5cbiAgICAgICAgICAgICAgICA8L1BhcmFncmFwaD5cblx0XHRcdFx0PFBhcmFncmFwaD5cbiAgICAgICAgICAgICAgICAgICAgPElubGluZT48VGV4dD57QXJyYXkoMjcpLmZpbGwoXCJoZWxsbzEsIGxldCdzIGVkaXRcIikuam9pbihcIiBcIil9PC9UZXh0PjwvSW5saW5lPlxuXHRcdFx0XHRcdDxJbmxpbmU+PFRleHQ+e0FycmF5KDcpLmZpbGwoXCJoZWxsbzEsIGxldCdzIGVkaXRcIikuam9pbihcIiBcIil9PC9UZXh0PjwvSW5saW5lPlxuXHRcdFx0XHRcdDxJbmxpbmU+PFRleHQ+e0FycmF5KDEpLmZpbGwoXCJvdmVyXCIpLmpvaW4oXCIgXCIpfTwvVGV4dD48L0lubGluZT5cbiAgICAgICAgICAgICAgICA8L1BhcmFncmFwaD5cbiAgICAgICAgICAgIDwvU2VjdGlvbj5cblxuXHRcdFx0PFNlY3Rpb24gcGFnZT17e3dpZHRoOjIwMCwgaGVpZ2h0OjIwMCwgbWFyZ2luOjEwfX0+XG4gICAgICAgICAgICAgICAgPFBhcmFncmFwaD5cbiAgICAgICAgICAgICAgICAgICAgPElubGluZT48VGV4dD57QXJyYXkoMjcpLmZpbGwoXCJoZWxsbzEsIGxldCdzIGVkaXRcIikuam9pbihcIiBcIil9PC9UZXh0PjwvSW5saW5lPlxuXHRcdFx0XHRcdDxJbmxpbmU+PFRleHQ+e0FycmF5KDcpLmZpbGwoXCJoZWxsbzEsIGxldCdzIGVkaXRcIikuam9pbihcIiBcIil9PC9UZXh0PjwvSW5saW5lPlxuXHRcdFx0XHRcdDxJbmxpbmU+PFRleHQ+e0FycmF5KDEpLmZpbGwoXCJvdmVyXCIpLmpvaW4oXCIgXCIpfTwvVGV4dD48L0lubGluZT5cbiAgICAgICAgICAgICAgICA8L1BhcmFncmFwaD5cblx0XHRcdFx0PFBhcmFncmFwaD5cbiAgICAgICAgICAgICAgICAgICAgPElubGluZT48VGV4dD57QXJyYXkoMjcpLmZpbGwoXCJoZWxsbzEsIGxldCdzIGVkaXRcIikuam9pbihcIiBcIil9PC9UZXh0PjwvSW5saW5lPlxuXHRcdFx0XHRcdDxJbmxpbmU+PFRleHQ+e0FycmF5KDcpLmZpbGwoXCJoZWxsbzEsIGxldCdzIGVkaXRcIikuam9pbihcIiBcIil9PC9UZXh0PjwvSW5saW5lPlxuXHRcdFx0XHRcdDxJbmxpbmU+PFRleHQ+e0FycmF5KDEpLmZpbGwoXCJvdmVyXCIpLmpvaW4oXCIgXCIpfTwvVGV4dD48L0lubGluZT5cbiAgICAgICAgICAgICAgICA8L1BhcmFncmFwaD5cbiAgICAgICAgICAgIDwvU2VjdGlvbj5cblxuXHRcdFx0ICAgICAgICAgICAgPFNlY3Rpb24+XG4gICAgICAgICAgICAgICAgPFBhcmFncmFwaD5cbiAgICAgICAgICAgICAgICAgICAgPElubGluZT48VGV4dD57QXJyYXkoMjcpLmZpbGwoXCJoZWxsbzEsIGxldCdzIGVkaXRcIikuam9pbihcIiBcIil9PC9UZXh0PjwvSW5saW5lPlxuXHRcdFx0XHRcdDxJbmxpbmU+PFRleHQ+e0FycmF5KDcpLmZpbGwoXCJoZWxsbzEsIGxldCdzIGVkaXRcIikuam9pbihcIiBcIil9PC9UZXh0PjwvSW5saW5lPlxuXHRcdFx0XHRcdDxJbmxpbmU+PFRleHQ+e0FycmF5KDEpLmZpbGwoXCJvdmVyXCIpLmpvaW4oXCIgXCIpfTwvVGV4dD48L0lubGluZT5cbiAgICAgICAgICAgICAgICA8L1BhcmFncmFwaD5cblx0XHRcdFx0PFBhcmFncmFwaD5cbiAgICAgICAgICAgICAgICAgICAgPElubGluZT48VGV4dD57QXJyYXkoMjcpLmZpbGwoXCJoZWxsbzEsIGxldCdzIGVkaXRcIikuam9pbihcIiBcIil9PC9UZXh0PjwvSW5saW5lPlxuXHRcdFx0XHRcdDxJbmxpbmU+PFRleHQ+e0FycmF5KDcpLmZpbGwoXCJoZWxsbzEsIGxldCdzIGVkaXRcIikuam9pbihcIiBcIil9PC9UZXh0PjwvSW5saW5lPlxuXHRcdFx0XHRcdDxJbmxpbmU+PFRleHQ+e0FycmF5KDEpLmZpbGwoXCJvdmVyXCIpLmpvaW4oXCIgXCIpfTwvVGV4dD48L0lubGluZT5cbiAgICAgICAgICAgICAgICA8L1BhcmFncmFwaD5cbiAgICAgICAgICAgIDwvU2VjdGlvbj5cblxuICAgICAgICA8L0RvY3VtZW50PlxuICAgICksZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FwcCcpKVxufVxuIl19