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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztrQkFTd0I7UUFTUjs7QUFsQmhCOzs7O0FBQ0E7Ozs7QUFZQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBYkEsSUFBSSxDQUFDLE9BQU8sU0FBUCxDQUFpQixNQUFqQixFQUF5QjtBQUMxQixXQUFPLFNBQVAsQ0FBaUIsTUFBakIsR0FBMEIsVUFBUyxLQUFULEVBQWdCLFFBQWhCLEVBQTBCLFNBQTFCLEVBQXFDO0FBQzNELGVBQU8sS0FBSyxLQUFMLENBQVcsQ0FBWCxFQUFjLEtBQWQsSUFBdUIsU0FBdkIsR0FBbUMsS0FBSyxLQUFMLENBQVcsUUFBUSxLQUFLLEdBQUwsQ0FBUyxRQUFULENBQVIsQ0FBOUMsQ0FEb0Q7S0FBckMsQ0FEQTtDQUE5Qjs7QUFNZSxTQUFTLElBQVQsR0FBZSxFQUFmOztBQVNSLFNBQVMsSUFBVCxHQUFlO0FBQ2xCLHVCQUFTLE1BQVQsQ0FDSTs7O1FBQ0k7OztZQUNJOzs7Z0JBQ0k7OztvQkFBUyxNQUFNLENBQU4sRUFBUyxJQUFULENBQWMsb0JBQWQsRUFBb0MsSUFBcEMsQ0FBeUMsR0FBekMsQ0FBVDtpQkFESjtnQkFFSTs7O29CQUFTLE1BQU0sQ0FBTixFQUFTLElBQVQsQ0FBYyxvQkFBZCxFQUFvQyxJQUFwQyxDQUF5QyxHQUF6QyxDQUFUO2lCQUZKO2FBREo7WUFNUjs7O2dCQUNnQjs7O29CQUFTLE1BQU0sQ0FBTixFQUFTLElBQVQsQ0FBYyxvQkFBZCxFQUFvQyxJQUFwQyxDQUF5QyxHQUF6QyxDQUFUO2lCQURoQjtnQkFFZ0I7OztvQkFBUyxNQUFNLENBQU4sRUFBUyxJQUFULENBQWMsb0JBQWQsRUFBb0MsSUFBcEMsQ0FBeUMsR0FBekMsQ0FBVDtpQkFGaEI7YUFOUTtTQURKO1FBYUw7O2NBQVMsTUFBTSxFQUFDLE9BQU0sR0FBTixFQUFXLFFBQU8sR0FBUCxFQUFZLFFBQU8sRUFBUCxFQUE5QixFQUFUO1lBQ2E7OztnQkFDSTs7O29CQUFTLE1BQU0sQ0FBTixFQUFTLElBQVQsQ0FBYyxvQkFBZCxFQUFvQyxJQUFwQyxDQUF5QyxHQUF6QyxDQUFUO2lCQURKO2dCQUVJOzs7b0JBQVMsTUFBTSxDQUFOLEVBQVMsSUFBVCxDQUFjLG9CQUFkLEVBQW9DLElBQXBDLENBQXlDLEdBQXpDLENBQVQ7aUJBRko7YUFEYjtZQU1DOzs7Z0JBQ2dCOzs7b0JBQVMsTUFBTSxDQUFOLEVBQVMsSUFBVCxDQUFjLG9CQUFkLEVBQW9DLElBQXBDLENBQXlDLEdBQXpDLENBQVQ7aUJBRGhCO2dCQUVnQjs7O29CQUFTLE1BQU0sQ0FBTixFQUFTLElBQVQsQ0FBYyxvQkFBZCxFQUFvQyxJQUFwQyxDQUF5QyxHQUF6QyxDQUFUO2lCQUZoQjthQU5EO1NBYks7S0FESixFQTBCRSxTQUFTLGFBQVQsQ0FBdUIsTUFBdkIsQ0ExQkYsRUFEa0I7Q0FBZiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIlxuXG5pZiAoIVN0cmluZy5wcm90b3R5cGUuc3BsaWNlKSB7XG4gICAgU3RyaW5nLnByb3RvdHlwZS5zcGxpY2UgPSBmdW5jdGlvbihzdGFydCwgZGVsQ291bnQsIG5ld1N1YlN0cikge1xuICAgICAgICByZXR1cm4gdGhpcy5zbGljZSgwLCBzdGFydCkgKyBuZXdTdWJTdHIgKyB0aGlzLnNsaWNlKHN0YXJ0ICsgTWF0aC5hYnMoZGVsQ291bnQpKTtcbiAgICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBlZGl0KCl7XG5cbn1cblxuaW1wb3J0IERvY3VtZW50IGZyb20gXCIuL2NvbnRlbnQvZG9jdW1lbnRcIlxuaW1wb3J0IFNlY3Rpb24gZnJvbSBcIi4vY29udGVudC9zZWN0aW9uXCJcbmltcG9ydCBQYXJhZ3JhcGggZnJvbSBcIi4vY29udGVudC9wYXJhZ3JhcGhcIlxuaW1wb3J0IElubGluZSBmcm9tIFwiLi9jb250ZW50L2lubGluZVwiXG5cbmV4cG9ydCBmdW5jdGlvbiB0ZXN0KCl7XG4gICAgUmVhY3RET00ucmVuZGVyKChcbiAgICAgICAgPERvY3VtZW50PlxuICAgICAgICAgICAgPFNlY3Rpb24+XG4gICAgICAgICAgICAgICAgPFBhcmFncmFwaD5cbiAgICAgICAgICAgICAgICAgICAgPElubGluZT57QXJyYXkoNykuZmlsbChcImhlbGxvMSwgbGV0J3MgZWRpdFwiKS5qb2luKFwiIFwiKX08L0lubGluZT5cbiAgICAgICAgICAgICAgICAgICAgPElubGluZT57QXJyYXkoNykuZmlsbChcImhlbGxvMiwgbGV0J3MgZWRpdFwiKS5qb2luKFwiIFwiKX08L0lubGluZT5cbiAgICAgICAgICAgICAgICA8L1BhcmFncmFwaD5cblx0XHRcdFx0XG5cdFx0XHRcdDxQYXJhZ3JhcGg+XG4gICAgICAgICAgICAgICAgICAgIDxJbmxpbmU+e0FycmF5KDcpLmZpbGwoXCJoZWxsbzMsIGxldCdzIGVkaXRcIikuam9pbihcIiBcIil9PC9JbmxpbmU+XG4gICAgICAgICAgICAgICAgICAgIDxJbmxpbmU+e0FycmF5KDcpLmZpbGwoXCJoZWxsbzQsIGxldCdzIGVkaXRcIikuam9pbihcIiBcIil9PC9JbmxpbmU+XG4gICAgICAgICAgICAgICAgPC9QYXJhZ3JhcGg+XG4gICAgICAgICAgICA8L1NlY3Rpb24+XG5cdFx0XHRcblx0XHRcdDxTZWN0aW9uIHBhZ2U9e3t3aWR0aDoyMDAsIGhlaWdodDoyMDAsIG1hcmdpbjoxNX19PlxuICAgICAgICAgICAgICAgIDxQYXJhZ3JhcGg+XG4gICAgICAgICAgICAgICAgICAgIDxJbmxpbmU+e0FycmF5KDcpLmZpbGwoXCJoZWxsbzUsIGxldCdzIGVkaXRcIikuam9pbihcIiBcIil9PC9JbmxpbmU+XG4gICAgICAgICAgICAgICAgICAgIDxJbmxpbmU+e0FycmF5KDcpLmZpbGwoXCJoZWxsbzYsIGxldCdzIGVkaXRcIikuam9pbihcIiBcIil9PC9JbmxpbmU+XG4gICAgICAgICAgICAgICAgPC9QYXJhZ3JhcGg+XG5cdFx0XHRcdFxuXHRcdFx0XHQ8UGFyYWdyYXBoPlxuICAgICAgICAgICAgICAgICAgICA8SW5saW5lPntBcnJheSg3KS5maWxsKFwiaGVsbG83LCBsZXQncyBlZGl0XCIpLmpvaW4oXCIgXCIpfTwvSW5saW5lPlxuICAgICAgICAgICAgICAgICAgICA8SW5saW5lPntBcnJheSg3KS5maWxsKFwiaGVsbG84LCBsZXQncyBlZGl0XCIpLmpvaW4oXCIgXCIpfTwvSW5saW5lPlxuICAgICAgICAgICAgICAgIDwvUGFyYWdyYXBoPlxuICAgICAgICAgICAgPC9TZWN0aW9uPlxuICAgICAgICA8L0RvY3VtZW50PlxuICAgICksZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FwcCcpKVxufVxuIl19