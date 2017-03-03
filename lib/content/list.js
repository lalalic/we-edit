"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _paragraph = require("./paragraph");

var _paragraph2 = _interopRequireDefault(_paragraph);

var _text = require("./text");

var _group = require("../composed/group");

var _group2 = _interopRequireDefault(_group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var list = function (_Paragraph) {
	_inherits(list, _Paragraph);

	function list() {
		_classCallCheck(this, list);

		return _possibleConstructorReturn(this, (list.__proto__ || Object.getPrototypeOf(list)).apply(this, arguments));
	}

	_createClass(list, [{
		key: "_newLine",
		value: function _newLine() {
			var line = _get(list.prototype.__proto__ || Object.getPrototypeOf(list.prototype), "_newLine", this).call(this);

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
				    text = _objectWithoutProperties(_wordWrapper$next, ["contentWidth", "whiteSpace"]);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2xpc3QuanMiXSwibmFtZXMiOlsibGlzdCIsImxpbmUiLCJjb21wdXRlZCIsImNvbXBvc2VkIiwibGVuZ3RoIiwiZ2V0U3R5bGUiLCJpbmRlbnQiLCJnZXRMYWJlbCIsImxhYmVsIiwic3R5bGUiLCJ3b3JkV3JhcHBlciIsImhlaWdodCIsImRlc2NlbnQiLCJuZXh0Iiwid2lkdGgiLCJoYW5naW5nIiwiY29udGVudFdpZHRoIiwid2hpdGVTcGFjZSIsInRleHQiLCJjaGlsZHJlbiIsInB1c2giLCJFcnJvciIsImRpc3BsYXlOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsSTs7Ozs7Ozs7Ozs7NkJBR1Y7QUFDSCxPQUFJQywyR0FBSjs7QUFFTixPQUFHLEtBQUtDLFFBQUwsQ0FBY0MsUUFBZCxDQUF1QkMsTUFBdkIsSUFBK0IsQ0FBbEMsRUFBb0M7QUFBQSxvQkFDdEIsS0FBS0MsUUFBTCxFQURzQjtBQUFBLFFBQzlCQyxNQUQ4QixhQUM5QkEsTUFEOEI7O0FBQUEsb0JBRWpCLEtBQUtDLFFBQUwsRUFGaUI7QUFBQSxRQUU5QkMsS0FGOEIsYUFFOUJBLEtBRjhCO0FBQUEsUUFFeEJDLEtBRndCLGFBRXhCQSxLQUZ3Qjs7QUFHbkMsUUFBSUMsY0FBWSxzQkFBZ0JGLEtBQWhCLEVBQXNCQyxLQUF0QixDQUFoQjtBQUhtQyxRQUk5QkUsTUFKOEIsR0FJZEQsV0FKYyxDQUk5QkMsTUFKOEI7QUFBQSxRQUl2QkMsT0FKdUIsR0FJZEYsV0FKYyxDQUl2QkUsT0FKdUI7O0FBQUEsNEJBS0tGLFlBQVlHLElBQVosQ0FBaUIsRUFBQ0MsT0FBTVIsT0FBT1MsT0FBZCxFQUFqQixDQUxMO0FBQUEsUUFLOUJDLFlBTDhCLHFCQUs5QkEsWUFMOEI7QUFBQSxRQUtoQkMsVUFMZ0IscUJBS2hCQSxVQUxnQjtBQUFBLFFBS0RDLElBTEM7O0FBTW5DakIsU0FBS2tCLFFBQUwsQ0FBY0MsSUFBZCxDQUFtQjtBQUFBO0FBQUE7QUFDbEIsU0FBRyxDQURlO0FBRWxCLGFBQU8sQ0FBQyxDQUZVO0FBR2xCLGVBQVNSLE9BSFM7QUFJbEIsYUFBT04sT0FBT1MsT0FKSTtBQUtsQixjQUFRSixNQUxVO0FBTWxCO0FBQUE7QUFBQSxRQUFPLE9BQU9MLE9BQU9TLE9BQXJCLEVBQThCLFFBQVFKLE1BQXRDO0FBQThDLDRDQUFVTyxJQUFWO0FBQTlDO0FBTmtCLEtBQW5COztBQVNBakIsU0FBS2EsS0FBTCxJQUFZUixPQUFPUyxPQUFuQjtBQUNBZCxTQUFLVSxNQUFMLEdBQVlBLE1BQVo7QUFDQVYsU0FBS1csT0FBTCxHQUFhQSxPQUFiO0FBQ0E7QUFDRCxVQUFPWCxJQUFQO0FBQ0E7Ozs2QkFFWTtBQUNOLFNBQU0sSUFBSW9CLEtBQUosQ0FBVSx1QkFBVixDQUFOO0FBQ0g7Ozs7OztBQTlCZ0JyQixJLENBQ1ZzQixXLEdBQVksTTtrQkFERnRCLEkiLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgUGFyYWdyYXBoIGZyb20gXCIuL3BhcmFncmFwaFwiXHJcbmltcG9ydCB7V29yZFdyYXBwZXJ9IGZyb20gXCIuL3RleHRcIlxyXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGxpc3QgZXh0ZW5kcyBQYXJhZ3JhcGh7XHJcbiAgICBzdGF0aWMgZGlzcGxheU5hbWU9XCJsaXN0XCJcclxuXHJcblx0X25ld0xpbmUoKXtcclxuICAgICAgICBsZXQgbGluZT1zdXBlci5fbmV3TGluZSgpXHJcblxyXG5cdFx0aWYodGhpcy5jb21wdXRlZC5jb21wb3NlZC5sZW5ndGg9PTApe1xyXG5cdFx0XHRsZXQge2luZGVudH09dGhpcy5nZXRTdHlsZSgpXHJcblx0XHRcdGxldCB7bGFiZWwsc3R5bGV9PXRoaXMuZ2V0TGFiZWwoKVxyXG5cdFx0XHRsZXQgd29yZFdyYXBwZXI9bmV3IFdvcmRXcmFwcGVyKGxhYmVsLHN0eWxlKVxyXG5cdFx0XHRsZXQge2hlaWdodCxkZXNjZW50fT13b3JkV3JhcHBlclxyXG5cdFx0XHRsZXQge2NvbnRlbnRXaWR0aCwgd2hpdGVTcGFjZSwgLi4udGV4dH09d29yZFdyYXBwZXIubmV4dCh7d2lkdGg6aW5kZW50Lmhhbmdpbmd9KVxyXG5cdFx0XHRsaW5lLmNoaWxkcmVuLnB1c2goPEdyb3VwXHJcblx0XHRcdFx0eD17MH1cclxuXHRcdFx0XHRpbmRleD17LTF9XHJcblx0XHRcdFx0ZGVzY2VudD17ZGVzY2VudH1cclxuXHRcdFx0XHR3aWR0aD17aW5kZW50Lmhhbmdpbmd9XHJcblx0XHRcdFx0aGVpZ2h0PXtoZWlnaHR9PlxyXG5cdFx0XHRcdDxHcm91cCB3aWR0aD17aW5kZW50Lmhhbmdpbmd9IGhlaWdodD17aGVpZ2h0fT48dGV4dCB7Li4udGV4dH0vPjwvR3JvdXA+XHJcblx0XHRcdDwvR3JvdXA+KVxyXG5cclxuXHRcdFx0bGluZS53aWR0aC09aW5kZW50LmhhbmdpbmdcclxuXHRcdFx0bGluZS5oZWlnaHQ9aGVpZ2h0XHJcblx0XHRcdGxpbmUuZGVzY2VudD1kZXNjZW50XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gbGluZVxyXG5cdH1cclxuXHJcbiAgICBnZXRMYWJlbCgpe1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIllvdSBuZWVkIGltcGxlbWVudCBpdFwiKVxyXG4gICAgfVxyXG59XHJcbiJdfQ==