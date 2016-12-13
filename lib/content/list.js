"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require("babel-runtime/helpers/get");

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _paragraph = require("./paragraph");

var _paragraph2 = _interopRequireDefault(_paragraph);

var _text = require("./text");

var _group = require("../composed/group");

var _group2 = _interopRequireDefault(_group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var list = function (_Paragraph) {
	(0, _inherits3.default)(list, _Paragraph);

	function list() {
		(0, _classCallCheck3.default)(this, list);
		return (0, _possibleConstructorReturn3.default)(this, (list.__proto__ || (0, _getPrototypeOf2.default)(list)).apply(this, arguments));
	}

	(0, _createClass3.default)(list, [{
		key: "_newLine",
		value: function _newLine() {
			var line = (0, _get3.default)(list.prototype.__proto__ || (0, _getPrototypeOf2.default)(list.prototype), "_newLine", this).call(this);

			if (this.computed.composed.length == 0) {
				var _getStyle = this.getStyle(),
				    indent = _getStyle.indent;

				var _getLabel = this.getLabel(),
				    label = _getLabel.label,
				    style = _getLabel.style;

				var wordWrapper = new _text.WordWrapper(label, style);
				var height = wordWrapper.height,
				    descent = wordWrapper.descent;

				var _wordWrapper$next = wordWrapper.next({ width: indent.hanging }),
				    contentWidth = _wordWrapper$next.contentWidth,
				    whiteSpace = _wordWrapper$next.whiteSpace,
				    text = (0, _objectWithoutProperties3.default)(_wordWrapper$next, ["contentWidth", "whiteSpace"]);

				line.children.push(_react2.default.createElement(
					_group2.default,
					{
						x: 0,
						index: -1,
						descent: descent,
						width: indent.hanging,
						height: height },
					_react2.default.createElement(
						_group2.default,
						{ width: indent.hanging, height: height },
						_react2.default.createElement("text", text)
					)
				));

				line.width -= indent.hanging;
				line.height = height;
				line.descent = descent;
			}
			return line;
		}
	}, {
		key: "getLabel",
		value: function getLabel() {
			throw new Error("You need implement it");
		}
	}]);
	return list;
}(_paragraph2.default);

list.displayName = "list";
exports.default = list;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2xpc3QuanMiXSwibmFtZXMiOlsibGlzdCIsImxpbmUiLCJjb21wdXRlZCIsImNvbXBvc2VkIiwibGVuZ3RoIiwiZ2V0U3R5bGUiLCJpbmRlbnQiLCJnZXRMYWJlbCIsImxhYmVsIiwic3R5bGUiLCJ3b3JkV3JhcHBlciIsImhlaWdodCIsImRlc2NlbnQiLCJuZXh0Iiwid2lkdGgiLCJoYW5naW5nIiwiY29udGVudFdpZHRoIiwid2hpdGVTcGFjZSIsInRleHQiLCJjaGlsZHJlbiIsInB1c2giLCJFcnJvciIsImRpc3BsYXlOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7SUFFcUJBLEk7Ozs7Ozs7Ozs7NkJBR1Y7QUFDSCxPQUFJQyxpSUFBSjs7QUFFTixPQUFHLEtBQUtDLFFBQUwsQ0FBY0MsUUFBZCxDQUF1QkMsTUFBdkIsSUFBK0IsQ0FBbEMsRUFBb0M7QUFBQSxvQkFDdEIsS0FBS0MsUUFBTCxFQURzQjtBQUFBLFFBQzlCQyxNQUQ4QixhQUM5QkEsTUFEOEI7O0FBQUEsb0JBRWpCLEtBQUtDLFFBQUwsRUFGaUI7QUFBQSxRQUU5QkMsS0FGOEIsYUFFOUJBLEtBRjhCO0FBQUEsUUFFeEJDLEtBRndCLGFBRXhCQSxLQUZ3Qjs7QUFHbkMsUUFBSUMsY0FBWSxzQkFBZ0JGLEtBQWhCLEVBQXNCQyxLQUF0QixDQUFoQjtBQUhtQyxRQUk5QkUsTUFKOEIsR0FJZEQsV0FKYyxDQUk5QkMsTUFKOEI7QUFBQSxRQUl2QkMsT0FKdUIsR0FJZEYsV0FKYyxDQUl2QkUsT0FKdUI7O0FBQUEsNEJBS0tGLFlBQVlHLElBQVosQ0FBaUIsRUFBQ0MsT0FBTVIsT0FBT1MsT0FBZCxFQUFqQixDQUxMO0FBQUEsUUFLOUJDLFlBTDhCLHFCQUs5QkEsWUFMOEI7QUFBQSxRQUtoQkMsVUFMZ0IscUJBS2hCQSxVQUxnQjtBQUFBLFFBS0RDLElBTEM7O0FBTW5DakIsU0FBS2tCLFFBQUwsQ0FBY0MsSUFBZCxDQUFtQjtBQUFBO0FBQUE7QUFDbEIsU0FBRyxDQURlO0FBRWxCLGFBQU8sQ0FBQyxDQUZVO0FBR2xCLGVBQVNSLE9BSFM7QUFJbEIsYUFBT04sT0FBT1MsT0FKSTtBQUtsQixjQUFRSixNQUxVO0FBTWxCO0FBQUE7QUFBQSxRQUFPLE9BQU9MLE9BQU9TLE9BQXJCLEVBQThCLFFBQVFKLE1BQXRDO0FBQThDLDRDQUFVTyxJQUFWO0FBQTlDO0FBTmtCLEtBQW5COztBQVNBakIsU0FBS2EsS0FBTCxJQUFZUixPQUFPUyxPQUFuQjtBQUNBZCxTQUFLVSxNQUFMLEdBQVlBLE1BQVo7QUFDQVYsU0FBS1csT0FBTCxHQUFhQSxPQUFiO0FBQ0E7QUFDRCxVQUFPWCxJQUFQO0FBQ0E7Ozs2QkFFWTtBQUNOLFNBQU0sSUFBSW9CLEtBQUosQ0FBVSx1QkFBVixDQUFOO0FBQ0g7Ozs7O0FBOUJnQnJCLEksQ0FDVnNCLFcsR0FBWSxNO2tCQURGdEIsSSIsImZpbGUiOiJsaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgUGFyYWdyYXBoIGZyb20gXCIuL3BhcmFncmFwaFwiXG5pbXBvcnQge1dvcmRXcmFwcGVyfSBmcm9tIFwiLi90ZXh0XCJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZWQvZ3JvdXBcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBsaXN0IGV4dGVuZHMgUGFyYWdyYXBoe1xuICAgIHN0YXRpYyBkaXNwbGF5TmFtZT1cImxpc3RcIlxuXG5cdF9uZXdMaW5lKCl7XG4gICAgICAgIGxldCBsaW5lPXN1cGVyLl9uZXdMaW5lKClcblxuXHRcdGlmKHRoaXMuY29tcHV0ZWQuY29tcG9zZWQubGVuZ3RoPT0wKXtcblx0XHRcdGxldCB7aW5kZW50fT10aGlzLmdldFN0eWxlKClcblx0XHRcdGxldCB7bGFiZWwsc3R5bGV9PXRoaXMuZ2V0TGFiZWwoKVxuXHRcdFx0bGV0IHdvcmRXcmFwcGVyPW5ldyBXb3JkV3JhcHBlcihsYWJlbCxzdHlsZSlcblx0XHRcdGxldCB7aGVpZ2h0LGRlc2NlbnR9PXdvcmRXcmFwcGVyXG5cdFx0XHRsZXQge2NvbnRlbnRXaWR0aCwgd2hpdGVTcGFjZSwgLi4udGV4dH09d29yZFdyYXBwZXIubmV4dCh7d2lkdGg6aW5kZW50Lmhhbmdpbmd9KVxuXHRcdFx0bGluZS5jaGlsZHJlbi5wdXNoKDxHcm91cFxuXHRcdFx0XHR4PXswfVxuXHRcdFx0XHRpbmRleD17LTF9XG5cdFx0XHRcdGRlc2NlbnQ9e2Rlc2NlbnR9XG5cdFx0XHRcdHdpZHRoPXtpbmRlbnQuaGFuZ2luZ31cblx0XHRcdFx0aGVpZ2h0PXtoZWlnaHR9PlxuXHRcdFx0XHQ8R3JvdXAgd2lkdGg9e2luZGVudC5oYW5naW5nfSBoZWlnaHQ9e2hlaWdodH0+PHRleHQgey4uLnRleHR9Lz48L0dyb3VwPlxuXHRcdFx0PC9Hcm91cD4pXG5cblx0XHRcdGxpbmUud2lkdGgtPWluZGVudC5oYW5naW5nXG5cdFx0XHRsaW5lLmhlaWdodD1oZWlnaHRcblx0XHRcdGxpbmUuZGVzY2VudD1kZXNjZW50XG5cdFx0fVxuXHRcdHJldHVybiBsaW5lXG5cdH1cblxuICAgIGdldExhYmVsKCl7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIllvdSBuZWVkIGltcGxlbWVudCBpdFwiKVxuICAgIH1cbn1cbiJdfQ==