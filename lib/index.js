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
        { width: 500, height: 1000, style: { background: "lightgray" } },
        _react2.default.createElement(
            _section2.default,
            { page: { width: 300, height: 400, margin: 5 } },
            _react2.default.createElement(
                _paragraph2.default,
                null,
                _react2.default.createElement(
                    _inline2.default,
                    null,
                    Array(5).fill("hello, let's edit").join(" ")
                )
            )
        )
    ), document.querySelector('#app'));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztrQkFLd0I7UUFTUjs7QUFkaEI7Ozs7QUFDQTs7OztBQVFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFQZSxTQUFTLElBQVQsR0FBZSxFQUFmOztBQVNSLFNBQVMsSUFBVCxHQUFlO0FBQ2xCLHVCQUFTLE1BQVQsQ0FDSTs7VUFBVSxPQUFPLEdBQVAsRUFBWSxRQUFRLElBQVIsRUFBYyxPQUFPLEVBQUMsWUFBVyxXQUFYLEVBQVIsRUFBcEM7UUFDSTs7Y0FBUyxNQUFNLEVBQUMsT0FBTSxHQUFOLEVBQVcsUUFBTyxHQUFQLEVBQVksUUFBTyxDQUFQLEVBQTlCLEVBQVQ7WUFDSTs7O2dCQUNJOzs7b0JBQVMsTUFBTSxDQUFOLEVBQVMsSUFBVCxDQUFjLG1CQUFkLEVBQW1DLElBQW5DLENBQXdDLEdBQXhDLENBQVQ7aUJBREo7YUFESjtTQURKO0tBREosRUFTRSxTQUFTLGFBQVQsQ0FBdUIsTUFBdkIsQ0FURixFQURrQjtDQUFmIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiXG5cblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBlZGl0KCl7XG5cbn1cblxuaW1wb3J0IERvY3VtZW50IGZyb20gXCIuL2NvbnRlbnQvZG9jdW1lbnRcIlxuaW1wb3J0IFNlY3Rpb24gZnJvbSBcIi4vY29udGVudC9zZWN0aW9uXCJcbmltcG9ydCBQYXJhZ3JhcGggZnJvbSBcIi4vY29udGVudC9wYXJhZ3JhcGhcIlxuaW1wb3J0IElubGluZSBmcm9tIFwiLi9jb250ZW50L2lubGluZVwiXG5cbmV4cG9ydCBmdW5jdGlvbiB0ZXN0KCl7XG4gICAgUmVhY3RET00ucmVuZGVyKChcbiAgICAgICAgPERvY3VtZW50IHdpZHRoPXs1MDB9IGhlaWdodD17MTAwMH0gc3R5bGU9e3tiYWNrZ3JvdW5kOlwibGlnaHRncmF5XCJ9fT5cbiAgICAgICAgICAgIDxTZWN0aW9uIHBhZ2U9e3t3aWR0aDozMDAsIGhlaWdodDo0MDAsIG1hcmdpbjo1fX0+XG4gICAgICAgICAgICAgICAgPFBhcmFncmFwaD5cbiAgICAgICAgICAgICAgICAgICAgPElubGluZT57QXJyYXkoNSkuZmlsbChcImhlbGxvLCBsZXQncyBlZGl0XCIpLmpvaW4oXCIgXCIpfTwvSW5saW5lPlxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8L1BhcmFncmFwaD5cbiAgICAgICAgICAgIDwvU2VjdGlvbj5cbiAgICAgICAgPC9Eb2N1bWVudD5cbiAgICApLGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhcHAnKSlcbn1cbiJdfQ==