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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (!String.prototype.splice) {
    String.prototype.splice = function (start, delCount, newSubStr) {
        return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
    };
}

function edit() {}

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
//# sourceMappingURL=data:application/json;base64,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QXFDLElBQXJDLENBQTBDLEdBQTFDLENBQVA7cUJBQVI7aUJBREo7Z0JBRVg7OztvQkFBUTs7O3dCQUFPLE1BQU0sQ0FBTixFQUFTLElBQVQsQ0FBYyxvQkFBZCxFQUFvQyxJQUFwQyxDQUF5QyxHQUF6QyxDQUFQO3FCQUFSO2lCQUZXO2dCQUdYOzs7b0JBQVE7Ozt3QkFBTyxNQUFNLENBQU4sRUFBUyxJQUFULENBQWMsTUFBZCxFQUFzQixJQUF0QixDQUEyQixHQUEzQixDQUFQO3FCQUFSO2lCQUhXO2FBREQ7WUFNWDs7O2dCQUNnQjs7O29CQUFROzs7d0JBQU8sTUFBTSxFQUFOLEVBQVUsSUFBVixDQUFlLG9CQUFmLEVBQXFDLElBQXJDLENBQTBDLEdBQTFDLENBQVA7cUJBQVI7aUJBRGhCO2dCQUVDOzs7b0JBQVE7Ozt3QkFBTyxNQUFNLENBQU4sRUFBUyxJQUFULENBQWMsb0JBQWQsRUFBb0MsSUFBcEMsQ0FBeUMsR0FBekMsQ0FBUDtxQkFBUjtpQkFGRDtnQkFHQzs7O29CQUFROzs7d0JBQU8sTUFBTSxDQUFOLEVBQVMsSUFBVCxDQUFjLE1BQWQsRUFBc0IsSUFBdEIsQ0FBMkIsR0FBM0IsQ0FBUDtxQkFBUjtpQkFIRDthQU5XO1NBM0JQO0tBREosRUEwQ0UsU0FBUyxhQUFULENBQXVCLE1BQXZCLENBMUNGLEVBRGtCO0NBQWYiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCJcblxuaWYgKCFTdHJpbmcucHJvdG90eXBlLnNwbGljZSkge1xuICAgIFN0cmluZy5wcm90b3R5cGUuc3BsaWNlID0gZnVuY3Rpb24oc3RhcnQsIGRlbENvdW50LCBuZXdTdWJTdHIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2xpY2UoMCwgc3RhcnQpICsgbmV3U3ViU3RyICsgdGhpcy5zbGljZShzdGFydCArIE1hdGguYWJzKGRlbENvdW50KSk7XG4gICAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZWRpdCgpe1xuXG59XG5cbmltcG9ydCBEb2N1bWVudCBmcm9tIFwiLi9jb250ZW50L2RvY3VtZW50XCJcbmltcG9ydCBTZWN0aW9uIGZyb20gXCIuL2NvbnRlbnQvc2VjdGlvblwiXG5pbXBvcnQgUGFyYWdyYXBoIGZyb20gXCIuL2NvbnRlbnQvcGFyYWdyYXBoXCJcbmltcG9ydCBJbmxpbmUgZnJvbSBcIi4vY29udGVudC9pbmxpbmVcIlxuaW1wb3J0IFRleHQgZnJvbSBcIi4vY29udGVudC90ZXh0XCJcblxuZXhwb3J0IGZ1bmN0aW9uIHRlc3QoKXtcbiAgICBSZWFjdERPTS5yZW5kZXIoKFxuICAgICAgICA8RG9jdW1lbnQ+XG4gICAgICAgICAgICA8U2VjdGlvbj5cbiAgICAgICAgICAgICAgICA8UGFyYWdyYXBoPlxuICAgICAgICAgICAgICAgICAgICA8SW5saW5lPjxUZXh0PntBcnJheSgyNykuZmlsbChcImhlbGxvMSwgbGV0J3MgZWRpdFwiKS5qb2luKFwiIFwiKX08L1RleHQ+PC9JbmxpbmU+XG5cdFx0XHRcdFx0PElubGluZT48VGV4dD57QXJyYXkoNykuZmlsbChcImhlbGxvMSwgbGV0J3MgZWRpdFwiKS5qb2luKFwiIFwiKX08L1RleHQ+PC9JbmxpbmU+XG5cdFx0XHRcdFx0PElubGluZT48VGV4dD57QXJyYXkoMSkuZmlsbChcIm92ZXJcIikuam9pbihcIiBcIil9PC9UZXh0PjwvSW5saW5lPlxuICAgICAgICAgICAgICAgIDwvUGFyYWdyYXBoPlxuXHRcdFx0XHQ8UGFyYWdyYXBoPlxuICAgICAgICAgICAgICAgICAgICA8SW5saW5lPjxUZXh0PntBcnJheSgyNykuZmlsbChcImhlbGxvMSwgbGV0J3MgZWRpdFwiKS5qb2luKFwiIFwiKX08L1RleHQ+PC9JbmxpbmU+XG5cdFx0XHRcdFx0PElubGluZT48VGV4dD57QXJyYXkoNykuZmlsbChcImhlbGxvMSwgbGV0J3MgZWRpdFwiKS5qb2luKFwiIFwiKX08L1RleHQ+PC9JbmxpbmU+XG5cdFx0XHRcdFx0PElubGluZT48VGV4dD57QXJyYXkoMSkuZmlsbChcIm92ZXJcIikuam9pbihcIiBcIil9PC9UZXh0PjwvSW5saW5lPlxuICAgICAgICAgICAgICAgIDwvUGFyYWdyYXBoPlxuICAgICAgICAgICAgPC9TZWN0aW9uPlxuXHRcdFx0XG5cdFx0XHQ8U2VjdGlvbiBwYWdlPXt7d2lkdGg6MjAwLCBoZWlnaHQ6MjAwLCBtYXJnaW46MTB9fT5cbiAgICAgICAgICAgICAgICA8UGFyYWdyYXBoPlxuICAgICAgICAgICAgICAgICAgICA8SW5saW5lPjxUZXh0PntBcnJheSgyNykuZmlsbChcImhlbGxvMSwgbGV0J3MgZWRpdFwiKS5qb2luKFwiIFwiKX08L1RleHQ+PC9JbmxpbmU+XG5cdFx0XHRcdFx0PElubGluZT48VGV4dD57QXJyYXkoNykuZmlsbChcImhlbGxvMSwgbGV0J3MgZWRpdFwiKS5qb2luKFwiIFwiKX08L1RleHQ+PC9JbmxpbmU+XG5cdFx0XHRcdFx0PElubGluZT48VGV4dD57QXJyYXkoMSkuZmlsbChcIm92ZXJcIikuam9pbihcIiBcIil9PC9UZXh0PjwvSW5saW5lPlxuICAgICAgICAgICAgICAgIDwvUGFyYWdyYXBoPlxuXHRcdFx0XHQ8UGFyYWdyYXBoPlxuICAgICAgICAgICAgICAgICAgICA8SW5saW5lPjxUZXh0PntBcnJheSgyNykuZmlsbChcImhlbGxvMSwgbGV0J3MgZWRpdFwiKS5qb2luKFwiIFwiKX08L1RleHQ+PC9JbmxpbmU+XG5cdFx0XHRcdFx0PElubGluZT48VGV4dD57QXJyYXkoNykuZmlsbChcImhlbGxvMSwgbGV0J3MgZWRpdFwiKS5qb2luKFwiIFwiKX08L1RleHQ+PC9JbmxpbmU+XG5cdFx0XHRcdFx0PElubGluZT48VGV4dD57QXJyYXkoMSkuZmlsbChcIm92ZXJcIikuam9pbihcIiBcIil9PC9UZXh0PjwvSW5saW5lPlxuICAgICAgICAgICAgICAgIDwvUGFyYWdyYXBoPlxuICAgICAgICAgICAgPC9TZWN0aW9uPlxuXHRcdFx0XG5cdFx0XHQgICAgICAgICAgICA8U2VjdGlvbj5cbiAgICAgICAgICAgICAgICA8UGFyYWdyYXBoPlxuICAgICAgICAgICAgICAgICAgICA8SW5saW5lPjxUZXh0PntBcnJheSgyNykuZmlsbChcImhlbGxvMSwgbGV0J3MgZWRpdFwiKS5qb2luKFwiIFwiKX08L1RleHQ+PC9JbmxpbmU+XG5cdFx0XHRcdFx0PElubGluZT48VGV4dD57QXJyYXkoNykuZmlsbChcImhlbGxvMSwgbGV0J3MgZWRpdFwiKS5qb2luKFwiIFwiKX08L1RleHQ+PC9JbmxpbmU+XG5cdFx0XHRcdFx0PElubGluZT48VGV4dD57QXJyYXkoMSkuZmlsbChcIm92ZXJcIikuam9pbihcIiBcIil9PC9UZXh0PjwvSW5saW5lPlxuICAgICAgICAgICAgICAgIDwvUGFyYWdyYXBoPlxuXHRcdFx0XHQ8UGFyYWdyYXBoPlxuICAgICAgICAgICAgICAgICAgICA8SW5saW5lPjxUZXh0PntBcnJheSgyNykuZmlsbChcImhlbGxvMSwgbGV0J3MgZWRpdFwiKS5qb2luKFwiIFwiKX08L1RleHQ+PC9JbmxpbmU+XG5cdFx0XHRcdFx0PElubGluZT48VGV4dD57QXJyYXkoNykuZmlsbChcImhlbGxvMSwgbGV0J3MgZWRpdFwiKS5qb2luKFwiIFwiKX08L1RleHQ+PC9JbmxpbmU+XG5cdFx0XHRcdFx0PElubGluZT48VGV4dD57QXJyYXkoMSkuZmlsbChcIm92ZXJcIikuam9pbihcIiBcIil9PC9UZXh0PjwvSW5saW5lPlxuICAgICAgICAgICAgICAgIDwvUGFyYWdyYXBoPlxuICAgICAgICAgICAgPC9TZWN0aW9uPlxuXG4gICAgICAgIDwvRG9jdW1lbnQ+XG4gICAgKSxkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYXBwJykpXG59XG4iXX0=