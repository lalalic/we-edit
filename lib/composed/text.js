"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ableExceed = exports.Text = undefined;

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Text = function Text(_ref) {
	var children = _ref.children,
	    contentWidth = _ref.contentWidth,
	    whiteSpace = _ref.whiteSpace,
	    others = (0, _objectWithoutProperties3.default)(_ref, ["children", "contentWidth", "whiteSpace"]);
	return _react2.default.createElement(
		"text",
		(0, _extends3.default)({ style: { whiteSpace: "pre" } }, others),
		children.reduce(function (s, a) {
			s.splice.apply(s, [s.length, 0].concat((0, _toConsumableArray3.default)(a.chars)));
			return s;
		}, []).join("")
	);
};

exports.Text = Text;
var ableExceed = exports.ableExceed = function ableExceed(pieces) {
	return pieces.reduce(function (state, a) {
		return state && a.type.ableExceed();
	}, true);
};

exports.default = (0, _assign2.default)(Text, { ableExceed: ableExceed });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb3NlZC90ZXh0LmpzIl0sIm5hbWVzIjpbIlRleHQiLCJjaGlsZHJlbiIsImNvbnRlbnRXaWR0aCIsIndoaXRlU3BhY2UiLCJvdGhlcnMiLCJyZWR1Y2UiLCJzIiwiYSIsInNwbGljZSIsImxlbmd0aCIsImNoYXJzIiwiam9pbiIsImFibGVFeGNlZWQiLCJwaWVjZXMiLCJzdGF0ZSIsInR5cGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztBQUVPLElBQU1BLE9BQUssU0FBTEEsSUFBSztBQUFBLEtBQUVDLFFBQUYsUUFBRUEsUUFBRjtBQUFBLEtBQVlDLFlBQVosUUFBWUEsWUFBWjtBQUFBLEtBQTBCQyxVQUExQixRQUEwQkEsVUFBMUI7QUFBQSxLQUF5Q0MsTUFBekM7QUFBQSxRQUNqQjtBQUFBO0FBQUEsMkJBQU0sT0FBTyxFQUFDRCxZQUFXLEtBQVosRUFBYixJQUFxQ0MsTUFBckM7QUFFQ0gsV0FBU0ksTUFBVCxDQUFnQixVQUFDQyxDQUFELEVBQUdDLENBQUgsRUFBTztBQUN0QkQsS0FBRUUsTUFBRixXQUFTRixFQUFFRyxNQUFYLEVBQWtCLENBQWxCLDBDQUF1QkYsRUFBRUcsS0FBekI7QUFDQSxVQUFPSixDQUFQO0FBQ0EsR0FIRCxFQUdFLEVBSEYsRUFHTUssSUFITixDQUdXLEVBSFg7QUFGRCxFQURpQjtBQUFBLENBQVg7OztBQVdBLElBQU1DLGtDQUFXLFNBQVhBLFVBQVc7QUFBQSxRQUFRQyxPQUFPUixNQUFQLENBQWMsVUFBQ1MsS0FBRCxFQUFPUCxDQUFQO0FBQUEsU0FBV08sU0FBU1AsRUFBRVEsSUFBRixDQUFPSCxVQUFQLEVBQXBCO0FBQUEsRUFBZCxFQUFzRCxJQUF0RCxDQUFSO0FBQUEsQ0FBakI7O2tCQUVRLHNCQUFjWixJQUFkLEVBQW1CLEVBQUNZLHNCQUFELEVBQW5CLEMiLCJmaWxlIjoidGV4dC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5cclxuZXhwb3J0IGNvbnN0IFRleHQ9KHtjaGlsZHJlbiwgY29udGVudFdpZHRoLCB3aGl0ZVNwYWNlLCAuLi5vdGhlcnN9KT0+KFxyXG5cdDx0ZXh0IHN0eWxlPXt7d2hpdGVTcGFjZTpcInByZVwifX0gey4uLm90aGVyc30+XHJcblx0e1xyXG5cdFx0Y2hpbGRyZW4ucmVkdWNlKChzLGEpPT57XHJcblx0XHRcdHMuc3BsaWNlKHMubGVuZ3RoLDAsLi4uYS5jaGFycylcclxuXHRcdFx0cmV0dXJuIHNcclxuXHRcdH0sW10pLmpvaW4oXCJcIilcclxuXHR9XHRcclxuXHQ8L3RleHQ+XHJcbilcclxuXHJcbmV4cG9ydCBjb25zdCBhYmxlRXhjZWVkPXBpZWNlcz0+cGllY2VzLnJlZHVjZSgoc3RhdGUsYSk9PnN0YXRlICYmIGEudHlwZS5hYmxlRXhjZWVkKCksdHJ1ZSlcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24oVGV4dCx7YWJsZUV4Y2VlZH0pIl19