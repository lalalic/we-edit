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
                    Array(7).fill("hello1, let's edit").join(" ")
                ),
                _react2.default.createElement(
                    _inline2.default,
                    null,
                    Array(7).fill("hello2, let's edit").join(" ")
                )
            ),
            _react2.default.createElement(
                _paragraph2.default,
                null,
                _react2.default.createElement(
                    _inline2.default,
                    null,
                    Array(7).fill("hello3, let's edit").join(" ")
                ),
                _react2.default.createElement(
                    _inline2.default,
                    null,
                    Array(7).fill("hello4, let's edit").join(" ")
                )
            )
        ),
        _react2.default.createElement(
            _section2.default,
            { page: { width: 200, height: 200, margin: 15 } },
            _react2.default.createElement(
                _paragraph2.default,
                null,
                _react2.default.createElement(
                    _inline2.default,
                    null,
                    Array(7).fill("hello5, let's edit").join(" ")
                ),
                _react2.default.createElement(
                    _inline2.default,
                    null,
                    Array(7).fill("hello6, let's edit").join(" ")
                )
            ),
            _react2.default.createElement(
                _paragraph2.default,
                null,
                _react2.default.createElement(
                    _inline2.default,
                    null,
                    Array(7).fill("hello7, let's edit").join(" ")
                ),
                _react2.default.createElement(
                    _inline2.default,
                    null,
                    Array(7).fill("hello8, let's edit").join(" ")
                )
            )
        )
    ), document.querySelector('#app'));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztrQkFLd0I7UUFTUjs7QUFkaEI7Ozs7QUFDQTs7OztBQVFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFQZSxTQUFTLElBQVQsR0FBZSxFQUFmOztBQVNSLFNBQVMsSUFBVCxHQUFlO0FBQ2xCLHVCQUFTLE1BQVQsQ0FDSTs7O1FBQ0k7OztZQUNJOzs7Z0JBQ0k7OztvQkFBUyxNQUFNLENBQU4sRUFBUyxJQUFULENBQWMsb0JBQWQsRUFBb0MsSUFBcEMsQ0FBeUMsR0FBekMsQ0FBVDtpQkFESjtnQkFFSTs7O29CQUFTLE1BQU0sQ0FBTixFQUFTLElBQVQsQ0FBYyxvQkFBZCxFQUFvQyxJQUFwQyxDQUF5QyxHQUF6QyxDQUFUO2lCQUZKO2FBREo7WUFNUjs7O2dCQUNnQjs7O29CQUFTLE1BQU0sQ0FBTixFQUFTLElBQVQsQ0FBYyxvQkFBZCxFQUFvQyxJQUFwQyxDQUF5QyxHQUF6QyxDQUFUO2lCQURoQjtnQkFFZ0I7OztvQkFBUyxNQUFNLENBQU4sRUFBUyxJQUFULENBQWMsb0JBQWQsRUFBb0MsSUFBcEMsQ0FBeUMsR0FBekMsQ0FBVDtpQkFGaEI7YUFOUTtTQURKO1FBYUw7O2NBQVMsTUFBTSxFQUFDLE9BQU0sR0FBTixFQUFXLFFBQU8sR0FBUCxFQUFZLFFBQU8sRUFBUCxFQUE5QixFQUFUO1lBQ2E7OztnQkFDSTs7O29CQUFTLE1BQU0sQ0FBTixFQUFTLElBQVQsQ0FBYyxvQkFBZCxFQUFvQyxJQUFwQyxDQUF5QyxHQUF6QyxDQUFUO2lCQURKO2dCQUVJOzs7b0JBQVMsTUFBTSxDQUFOLEVBQVMsSUFBVCxDQUFjLG9CQUFkLEVBQW9DLElBQXBDLENBQXlDLEdBQXpDLENBQVQ7aUJBRko7YUFEYjtZQU1DOzs7Z0JBQ2dCOzs7b0JBQVMsTUFBTSxDQUFOLEVBQVMsSUFBVCxDQUFjLG9CQUFkLEVBQW9DLElBQXBDLENBQXlDLEdBQXpDLENBQVQ7aUJBRGhCO2dCQUVnQjs7O29CQUFTLE1BQU0sQ0FBTixFQUFTLElBQVQsQ0FBYyxvQkFBZCxFQUFvQyxJQUFwQyxDQUF5QyxHQUF6QyxDQUFUO2lCQUZoQjthQU5EO1NBYks7S0FESixFQTBCRSxTQUFTLGFBQVQsQ0FBdUIsTUFBdkIsQ0ExQkYsRUFEa0I7Q0FBZiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIlxuXG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZWRpdCgpe1xuXG59XG5cbmltcG9ydCBEb2N1bWVudCBmcm9tIFwiLi9jb250ZW50L2RvY3VtZW50XCJcbmltcG9ydCBTZWN0aW9uIGZyb20gXCIuL2NvbnRlbnQvc2VjdGlvblwiXG5pbXBvcnQgUGFyYWdyYXBoIGZyb20gXCIuL2NvbnRlbnQvcGFyYWdyYXBoXCJcbmltcG9ydCBJbmxpbmUgZnJvbSBcIi4vY29udGVudC9pbmxpbmVcIlxuXG5leHBvcnQgZnVuY3Rpb24gdGVzdCgpe1xuICAgIFJlYWN0RE9NLnJlbmRlcigoXG4gICAgICAgIDxEb2N1bWVudD5cbiAgICAgICAgICAgIDxTZWN0aW9uPlxuICAgICAgICAgICAgICAgIDxQYXJhZ3JhcGg+XG4gICAgICAgICAgICAgICAgICAgIDxJbmxpbmU+e0FycmF5KDcpLmZpbGwoXCJoZWxsbzEsIGxldCdzIGVkaXRcIikuam9pbihcIiBcIil9PC9JbmxpbmU+XG4gICAgICAgICAgICAgICAgICAgIDxJbmxpbmU+e0FycmF5KDcpLmZpbGwoXCJoZWxsbzIsIGxldCdzIGVkaXRcIikuam9pbihcIiBcIil9PC9JbmxpbmU+XG4gICAgICAgICAgICAgICAgPC9QYXJhZ3JhcGg+XG5cdFx0XHRcdFxuXHRcdFx0XHQ8UGFyYWdyYXBoPlxuICAgICAgICAgICAgICAgICAgICA8SW5saW5lPntBcnJheSg3KS5maWxsKFwiaGVsbG8zLCBsZXQncyBlZGl0XCIpLmpvaW4oXCIgXCIpfTwvSW5saW5lPlxuICAgICAgICAgICAgICAgICAgICA8SW5saW5lPntBcnJheSg3KS5maWxsKFwiaGVsbG80LCBsZXQncyBlZGl0XCIpLmpvaW4oXCIgXCIpfTwvSW5saW5lPlxuICAgICAgICAgICAgICAgIDwvUGFyYWdyYXBoPlxuICAgICAgICAgICAgPC9TZWN0aW9uPlxuXHRcdFx0XG5cdFx0XHQ8U2VjdGlvbiBwYWdlPXt7d2lkdGg6MjAwLCBoZWlnaHQ6MjAwLCBtYXJnaW46MTV9fT5cbiAgICAgICAgICAgICAgICA8UGFyYWdyYXBoPlxuICAgICAgICAgICAgICAgICAgICA8SW5saW5lPntBcnJheSg3KS5maWxsKFwiaGVsbG81LCBsZXQncyBlZGl0XCIpLmpvaW4oXCIgXCIpfTwvSW5saW5lPlxuICAgICAgICAgICAgICAgICAgICA8SW5saW5lPntBcnJheSg3KS5maWxsKFwiaGVsbG82LCBsZXQncyBlZGl0XCIpLmpvaW4oXCIgXCIpfTwvSW5saW5lPlxuICAgICAgICAgICAgICAgIDwvUGFyYWdyYXBoPlxuXHRcdFx0XHRcblx0XHRcdFx0PFBhcmFncmFwaD5cbiAgICAgICAgICAgICAgICAgICAgPElubGluZT57QXJyYXkoNykuZmlsbChcImhlbGxvNywgbGV0J3MgZWRpdFwiKS5qb2luKFwiIFwiKX08L0lubGluZT5cbiAgICAgICAgICAgICAgICAgICAgPElubGluZT57QXJyYXkoNykuZmlsbChcImhlbGxvOCwgbGV0J3MgZWRpdFwiKS5qb2luKFwiIFwiKX08L0lubGluZT5cbiAgICAgICAgICAgICAgICA8L1BhcmFncmFwaD5cbiAgICAgICAgICAgIDwvU2VjdGlvbj5cbiAgICAgICAgPC9Eb2N1bWVudD5cbiAgICApLGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhcHAnKSlcbn1cbiJdfQ==