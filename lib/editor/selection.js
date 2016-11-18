"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Selection = exports.reducer = exports.ACTION = undefined;

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ACTION = exports.ACTION = {
	SELECT: function SELECT(start, at) {
		var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : start;
		var endAt = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : at;
		return {
			type: "selected",
			payload: {
				start: {
					id: start,
					at: at
				},
				end: {
					id: end,
					at: endAt
				}
			}
		};
	}
};

var reducer = exports.reducer = function reducer() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var _ref = arguments[1];
	var type = _ref.type,
	    payload = _ref.payload;

	switch (type) {
		case "selected":
			return (0, _extends3.default)({}, state, payload);
	}
	return state;
};

var Selection = exports.Selection = function (_Component) {
	(0, _inherits3.default)(Selection, _Component);

	function Selection() {
		(0, _classCallCheck3.default)(this, Selection);
		return (0, _possibleConstructorReturn3.default)(this, (Selection.__proto__ || (0, _getPrototypeOf2.default)(Selection)).apply(this, arguments));
	}

	(0, _createClass3.default)(Selection, [{
		key: "render",
		value: function render() {
			return null;
		}
	}]);
	return Selection;
}(_react.Component);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3Ivc2VsZWN0aW9uLmpzIl0sIm5hbWVzIjpbIkFDVElPTiIsIlNFTEVDVCIsInN0YXJ0IiwiYXQiLCJlbmQiLCJlbmRBdCIsInR5cGUiLCJwYXlsb2FkIiwiaWQiLCJyZWR1Y2VyIiwic3RhdGUiLCJTZWxlY3Rpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0FBRU8sSUFBTUEsMEJBQU87QUFDbkJDLFNBQVEsZ0JBQUNDLEtBQUQsRUFBUUMsRUFBUjtBQUFBLE1BQVlDLEdBQVosdUVBQWdCRixLQUFoQjtBQUFBLE1BQXVCRyxLQUF2Qix1RUFBNkJGLEVBQTdCO0FBQUEsU0FBbUM7QUFDMUNHLFNBQUssVUFEcUM7QUFFekNDLFlBQVM7QUFDVEwsV0FBTTtBQUNMTSxTQUFHTixLQURFO0FBRUpDO0FBRkksS0FERztBQUtSQyxTQUFJO0FBQ0pJLFNBQUdKLEdBREM7QUFFSEQsU0FBR0U7QUFGQTtBQUxJO0FBRmdDLEdBQW5DO0FBQUE7QUFEVyxDQUFiOztBQWdCQSxJQUFNSSw0QkFBUSxTQUFSQSxPQUFRLEdBQTRCO0FBQUEsS0FBM0JDLEtBQTJCLHVFQUFyQixFQUFxQjtBQUFBO0FBQUEsS0FBaEJKLElBQWdCLFFBQWhCQSxJQUFnQjtBQUFBLEtBQVhDLE9BQVcsUUFBWEEsT0FBVzs7QUFDaEQsU0FBT0QsSUFBUDtBQUNBLE9BQUssVUFBTDtBQUNDLHFDQUFZSSxLQUFaLEVBQXNCSCxPQUF0QjtBQUZEO0FBSUEsUUFBT0csS0FBUDtBQUNBLENBTk07O0lBUU1DLFMsV0FBQUEsUzs7Ozs7Ozs7OzsyQkFDSjtBQUNQLFVBQU8sSUFBUDtBQUNBIiwiZmlsZSI6InNlbGVjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5cclxuZXhwb3J0IGNvbnN0IEFDVElPTj17XHJcblx0U0VMRUNUOiAoc3RhcnQsIGF0LCBlbmQ9c3RhcnQsIGVuZEF0PWF0KT0+KHtcclxuXHRcdHR5cGU6XCJzZWxlY3RlZFwiXHJcblx0XHQscGF5bG9hZDoge1xyXG5cdFx0XHRzdGFydDp7XHJcblx0XHRcdFx0aWQ6c3RhcnRcclxuXHRcdFx0XHQsYXRcclxuXHRcdFx0fVxyXG5cdFx0XHQsZW5kOntcclxuXHRcdFx0XHRpZDplbmRcclxuXHRcdFx0XHQsYXQ6ZW5kQXRcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0pXHRcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHJlZHVjZXI9KHN0YXRlPXt9LCB7dHlwZSxwYXlsb2FkfSk9PntcclxuXHRzd2l0Y2godHlwZSl7XHJcblx0Y2FzZSBcInNlbGVjdGVkXCI6XHJcblx0XHRyZXR1cm4gKHsuLi5zdGF0ZSwgLi4ucGF5bG9hZH0pXHJcblx0fVxyXG5cdHJldHVybiBzdGF0ZVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2VsZWN0aW9uIGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHJlbmRlcigpe1xyXG5cdFx0cmV0dXJuIG51bGxcclxuXHR9XHJcbn1cclxuIl19