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
			var directStyle = this.props.directStyle;

			var label = directStyle.get("label");

			var inheritedStyle = this.context.inheritedStyle;


			var style = 'rFonts,sz,color,b,i,vanish'.split(",").reduce(function (style, key) {
				var stylePath = "rPr." + key;
				var value = directStyle.get("label." + stylePath);
				if (value == undefined) value = inheritedStyle.get(stylePath);

				if (value != undefined) {
					style[key] = value;
				}
				return style;
			}, {});

			return { label: label, style: style };
		}
	}]);
	return list;
}(_paragraph2.default);

list.displayName = "list";
exports.default = list;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2xpc3QuanMiXSwibmFtZXMiOlsibGlzdCIsImxpbmUiLCJjb21wdXRlZCIsImNvbXBvc2VkIiwibGVuZ3RoIiwiZ2V0U3R5bGUiLCJpbmRlbnQiLCJnZXRMYWJlbCIsImxhYmVsIiwic3R5bGUiLCJ3b3JkV3JhcHBlciIsImhlaWdodCIsImRlc2NlbnQiLCJuZXh0Iiwid2lkdGgiLCJoYW5naW5nIiwiY29udGVudFdpZHRoIiwid2hpdGVTcGFjZSIsInRleHQiLCJjaGlsZHJlbiIsInB1c2giLCJkaXJlY3RTdHlsZSIsInByb3BzIiwiZ2V0IiwiaW5oZXJpdGVkU3R5bGUiLCJjb250ZXh0Iiwic3BsaXQiLCJyZWR1Y2UiLCJrZXkiLCJzdHlsZVBhdGgiLCJ2YWx1ZSIsInVuZGVmaW5lZCIsImRpc3BsYXlOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7SUFFcUJBLEk7Ozs7Ozs7Ozs7NkJBR1Y7QUFDSCxPQUFJQyxpSUFBSjs7QUFFTixPQUFHLEtBQUtDLFFBQUwsQ0FBY0MsUUFBZCxDQUF1QkMsTUFBdkIsSUFBK0IsQ0FBbEMsRUFBb0M7QUFBQSxvQkFDdEIsS0FBS0MsUUFBTCxFQURzQjtBQUFBLFFBQzlCQyxNQUQ4QixhQUM5QkEsTUFEOEI7O0FBQUEsb0JBRWpCLEtBQUtDLFFBQUwsRUFGaUI7QUFBQSxRQUU5QkMsS0FGOEIsYUFFOUJBLEtBRjhCO0FBQUEsUUFFeEJDLEtBRndCLGFBRXhCQSxLQUZ3Qjs7QUFHbkMsUUFBSUMsY0FBWSxzQkFBZ0JGLEtBQWhCLEVBQXNCQyxLQUF0QixDQUFoQjtBQUhtQyxRQUk5QkUsTUFKOEIsR0FJZEQsV0FKYyxDQUk5QkMsTUFKOEI7QUFBQSxRQUl2QkMsT0FKdUIsR0FJZEYsV0FKYyxDQUl2QkUsT0FKdUI7O0FBQUEsNEJBS0tGLFlBQVlHLElBQVosQ0FBaUIsRUFBQ0MsT0FBTVIsT0FBT1MsT0FBZCxFQUFqQixDQUxMO0FBQUEsUUFLOUJDLFlBTDhCLHFCQUs5QkEsWUFMOEI7QUFBQSxRQUtoQkMsVUFMZ0IscUJBS2hCQSxVQUxnQjtBQUFBLFFBS0RDLElBTEM7O0FBTW5DakIsU0FBS2tCLFFBQUwsQ0FBY0MsSUFBZCxDQUFtQjtBQUFBO0FBQUE7QUFDbEIsU0FBRyxDQURlO0FBRWxCLGFBQU8sQ0FBQyxDQUZVO0FBR2xCLGVBQVNSLE9BSFM7QUFJbEIsYUFBT04sT0FBT1MsT0FKSTtBQUtsQixjQUFRSixNQUxVO0FBTWxCO0FBQUE7QUFBQSxRQUFPLE9BQU9MLE9BQU9TLE9BQXJCLEVBQThCLFFBQVFKLE1BQXRDO0FBQThDLDRDQUFVTyxJQUFWO0FBQTlDO0FBTmtCLEtBQW5COztBQVNBakIsU0FBS2EsS0FBTCxJQUFZUixPQUFPUyxPQUFuQjtBQUNBZCxTQUFLVSxNQUFMLEdBQVlBLE1BQVo7QUFDQVYsU0FBS1csT0FBTCxHQUFhQSxPQUFiO0FBQ0E7QUFDRCxVQUFPWCxJQUFQO0FBQ0E7Ozs2QkFFUztBQUFBLE9BQ0ZvQixXQURFLEdBQ1csS0FBS0MsS0FEaEIsQ0FDRkQsV0FERTs7QUFFVCxPQUFJYixRQUFNYSxZQUFZRSxHQUFaLENBQWdCLE9BQWhCLENBQVY7O0FBRlMsT0FJRkMsY0FKRSxHQUljLEtBQUtDLE9BSm5CLENBSUZELGNBSkU7OztBQU1ULE9BQUlmLFFBQU0sNkJBQTZCaUIsS0FBN0IsQ0FBbUMsR0FBbkMsRUFBd0NDLE1BQXhDLENBQStDLFVBQUNsQixLQUFELEVBQVFtQixHQUFSLEVBQWM7QUFDN0QsUUFBSUMscUJBQWlCRCxHQUFyQjtBQUNULFFBQUlFLFFBQU1ULFlBQVlFLEdBQVosQ0FBZ0IsV0FBU00sU0FBekIsQ0FBVjtBQUNBLFFBQUdDLFNBQU9DLFNBQVYsRUFDQ0QsUUFBTU4sZUFBZUQsR0FBZixDQUFtQk0sU0FBbkIsQ0FBTjs7QUFFUSxRQUFHQyxTQUFPQyxTQUFWLEVBQW9CO0FBQ2hCdEIsV0FBTW1CLEdBQU4sSUFBV0UsS0FBWDtBQUNaO0FBQ1EsV0FBT3JCLEtBQVA7QUFDSCxJQVZHLEVBVUYsRUFWRSxDQUFWOztBQVlBLFVBQU8sRUFBQ0QsWUFBRCxFQUFPQyxZQUFQLEVBQVA7QUFDQTs7Ozs7QUEvQ21CVCxJLENBQ1ZnQyxXLEdBQVksTTtrQkFERmhDLEkiLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgUGFyYWdyYXBoIGZyb20gXCIuL3BhcmFncmFwaFwiXHJcbmltcG9ydCB7V29yZFdyYXBwZXJ9IGZyb20gXCIuL3RleHRcIlxyXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGxpc3QgZXh0ZW5kcyBQYXJhZ3JhcGh7XHJcbiAgICBzdGF0aWMgZGlzcGxheU5hbWU9XCJsaXN0XCJcclxuXHJcblx0X25ld0xpbmUoKXtcclxuICAgICAgICBsZXQgbGluZT1zdXBlci5fbmV3TGluZSgpXHJcblxyXG5cdFx0aWYodGhpcy5jb21wdXRlZC5jb21wb3NlZC5sZW5ndGg9PTApe1xyXG5cdFx0XHRsZXQge2luZGVudH09dGhpcy5nZXRTdHlsZSgpXHJcblx0XHRcdGxldCB7bGFiZWwsc3R5bGV9PXRoaXMuZ2V0TGFiZWwoKVxyXG5cdFx0XHRsZXQgd29yZFdyYXBwZXI9bmV3IFdvcmRXcmFwcGVyKGxhYmVsLHN0eWxlKVxyXG5cdFx0XHRsZXQge2hlaWdodCxkZXNjZW50fT13b3JkV3JhcHBlclxyXG5cdFx0XHRsZXQge2NvbnRlbnRXaWR0aCwgd2hpdGVTcGFjZSwgLi4udGV4dH09d29yZFdyYXBwZXIubmV4dCh7d2lkdGg6aW5kZW50Lmhhbmdpbmd9KVxyXG5cdFx0XHRsaW5lLmNoaWxkcmVuLnB1c2goPEdyb3VwXHJcblx0XHRcdFx0eD17MH1cclxuXHRcdFx0XHRpbmRleD17LTF9XHJcblx0XHRcdFx0ZGVzY2VudD17ZGVzY2VudH1cclxuXHRcdFx0XHR3aWR0aD17aW5kZW50Lmhhbmdpbmd9XHJcblx0XHRcdFx0aGVpZ2h0PXtoZWlnaHR9PlxyXG5cdFx0XHRcdDxHcm91cCB3aWR0aD17aW5kZW50Lmhhbmdpbmd9IGhlaWdodD17aGVpZ2h0fT48dGV4dCB7Li4udGV4dH0vPjwvR3JvdXA+XHJcblx0XHRcdDwvR3JvdXA+KVxyXG5cclxuXHRcdFx0bGluZS53aWR0aC09aW5kZW50LmhhbmdpbmdcclxuXHRcdFx0bGluZS5oZWlnaHQ9aGVpZ2h0XHJcblx0XHRcdGxpbmUuZGVzY2VudD1kZXNjZW50XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gbGluZVxyXG5cdH1cclxuXHJcblx0Z2V0TGFiZWwoKXtcclxuXHRcdGNvbnN0IHtkaXJlY3RTdHlsZX09dGhpcy5wcm9wc1xyXG5cdFx0bGV0IGxhYmVsPWRpcmVjdFN0eWxlLmdldChcImxhYmVsXCIpXHJcblxyXG5cdFx0Y29uc3Qge2luaGVyaXRlZFN0eWxlfT10aGlzLmNvbnRleHRcclxuXHJcblx0XHRsZXQgc3R5bGU9J3JGb250cyxzeixjb2xvcixiLGksdmFuaXNoJy5zcGxpdChcIixcIikucmVkdWNlKChzdHlsZSwga2V5KT0+e1xyXG4gICAgICAgICAgICBsZXQgc3R5bGVQYXRoPWByUHIuJHtrZXl9YFxyXG5cdFx0XHRsZXQgdmFsdWU9ZGlyZWN0U3R5bGUuZ2V0KFwibGFiZWwuXCIrc3R5bGVQYXRoKVxyXG5cdFx0XHRpZih2YWx1ZT09dW5kZWZpbmVkKVxyXG5cdFx0XHRcdHZhbHVlPWluaGVyaXRlZFN0eWxlLmdldChzdHlsZVBhdGgpXHJcblxyXG4gICAgICAgICAgICBpZih2YWx1ZSE9dW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHN0eWxlW2tleV09dmFsdWVcclxuXHRcdFx0fVxyXG4gICAgICAgICAgICByZXR1cm4gc3R5bGVcclxuICAgICAgICB9LHt9KVxyXG5cclxuXHRcdHJldHVybiB7bGFiZWwsc3R5bGV9XHJcblx0fVxyXG59XHJcbiJdfQ==