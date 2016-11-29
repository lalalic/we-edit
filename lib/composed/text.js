"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Text = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Text = exports.Text = function Text(_ref) {
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

exports.default = Text;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb3NlZC90ZXh0LmpzIl0sIm5hbWVzIjpbIlRleHQiLCJjaGlsZHJlbiIsImNvbnRlbnRXaWR0aCIsIndoaXRlU3BhY2UiLCJvdGhlcnMiLCJyZWR1Y2UiLCJzIiwiYSIsInNwbGljZSIsImxlbmd0aCIsImNoYXJzIiwiam9pbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7QUFFTyxJQUFNQSxzQkFBSyxTQUFMQSxJQUFLO0FBQUEsS0FBRUMsUUFBRixRQUFFQSxRQUFGO0FBQUEsS0FBWUMsWUFBWixRQUFZQSxZQUFaO0FBQUEsS0FBMEJDLFVBQTFCLFFBQTBCQSxVQUExQjtBQUFBLEtBQXlDQyxNQUF6QztBQUFBLFFBQ2pCO0FBQUE7QUFBQSwyQkFBTSxPQUFPLEVBQUNELFlBQVcsS0FBWixFQUFiLElBQXFDQyxNQUFyQztBQUVDSCxXQUFTSSxNQUFULENBQWdCLFVBQUNDLENBQUQsRUFBR0MsQ0FBSCxFQUFPO0FBQ3RCRCxLQUFFRSxNQUFGLFdBQVNGLEVBQUVHLE1BQVgsRUFBa0IsQ0FBbEIsMENBQXVCRixFQUFFRyxLQUF6QjtBQUNBLFVBQU9KLENBQVA7QUFDQSxHQUhELEVBR0UsRUFIRixFQUdNSyxJQUhOLENBR1csRUFIWDtBQUZELEVBRGlCO0FBQUEsQ0FBWDs7a0JBV1FYLEkiLCJmaWxlIjoidGV4dC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5cclxuZXhwb3J0IGNvbnN0IFRleHQ9KHtjaGlsZHJlbiwgY29udGVudFdpZHRoLCB3aGl0ZVNwYWNlLCAuLi5vdGhlcnN9KT0+KFxyXG5cdDx0ZXh0IHN0eWxlPXt7d2hpdGVTcGFjZTpcInByZVwifX0gey4uLm90aGVyc30+XHJcblx0e1xyXG5cdFx0Y2hpbGRyZW4ucmVkdWNlKChzLGEpPT57XHJcblx0XHRcdHMuc3BsaWNlKHMubGVuZ3RoLDAsLi4uYS5jaGFycylcclxuXHRcdFx0cmV0dXJuIHNcclxuXHRcdH0sW10pLmpvaW4oXCJcIilcclxuXHR9XHRcclxuXHQ8L3RleHQ+XHJcbilcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRleHQiXX0=