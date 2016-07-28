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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var list = function (_Paragraph) {
	_inherits(list, _Paragraph);

	function list() {
		_classCallCheck(this, list);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(list).apply(this, arguments));
	}

	_createClass(list, [{
		key: "_newLine",
		value: function _newLine() {
			var line = _get(Object.getPrototypeOf(list.prototype), "_newLine", this).call(this);

			if (this.computed.composed.length == 0) {
				var _getStyle = this.getStyle();

				var indent = _getStyle.indent;

				var _getLabel = this.getLabel();

				var label = _getLabel.label;
				var style = _getLabel.style;

				var wordWrapper = new _text.WordWrapper(label, style);
				var height = wordWrapper.height;
				var descent = wordWrapper.descent;

				var text = wordWrapper.next({ width: indent.hanging });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2xpc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7Ozs2QkFHVjtBQUNILE9BQUksa0NBSlMsNkNBSVQsQ0FERDs7QUFHVCxPQUFHLEtBQUssUUFBTCxDQUFjLFFBQWQsQ0FBdUIsTUFBdkIsSUFBK0IsQ0FBL0IsRUFBaUM7b0JBQ3RCLEtBQUssUUFBTCxHQURzQjs7UUFDOUIsMEJBRDhCOztvQkFFakIsS0FBSyxRQUFMLEdBRmlCOztRQUU5Qix3QkFGOEI7UUFFeEIsd0JBRndCOztBQUduQyxRQUFJLGNBQVksc0JBQWdCLEtBQWhCLEVBQXNCLEtBQXRCLENBQVosQ0FIK0I7UUFJOUIsU0FBZ0IsWUFBaEIsT0FKOEI7UUFJdkIsVUFBUyxZQUFULFFBSnVCOztBQUtuQyxRQUFJLE9BQUssWUFBWSxJQUFaLENBQWlCLEVBQUMsT0FBTSxPQUFPLE9BQVAsRUFBeEIsQ0FBTCxDQUwrQjtBQU1uQyxTQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW1COzs7QUFDbEIsU0FBRyxDQUFIO0FBQ0EsYUFBTyxDQUFDLENBQUQ7QUFDUCxlQUFTLE9BQVQ7QUFDQSxhQUFPLE9BQU8sT0FBUDtBQUNQLGNBQVEsTUFBUixFQUxrQjtLQU1sQjs7UUFBTyxPQUFPLE9BQU8sT0FBUCxFQUFnQixRQUFRLE1BQVIsRUFBOUI7TUFBOEMsc0NBQVUsSUFBVixDQUE5QztNQU5rQjtLQUFuQixFQU5tQzs7QUFlbkMsU0FBSyxLQUFMLElBQVksT0FBTyxPQUFQLENBZnVCO0FBZ0JuQyxTQUFLLE1BQUwsR0FBWSxNQUFaLENBaEJtQztBQWlCbkMsU0FBSyxPQUFMLEdBQWEsT0FBYixDQWpCbUM7SUFBcEM7QUFtQkEsVUFBTyxJQUFQLENBdEJTOzs7OzZCQXlCQTtPQUNGLGNBQWEsS0FBSyxLQUFMLENBQWIsWUFERTs7QUFFVCxPQUFJLFFBQU0sWUFBWSxHQUFaLENBQWdCLE9BQWhCLENBQU4sQ0FGSzs7T0FJRixpQkFBZ0IsS0FBSyxPQUFMLENBQWhCLGVBSkU7OztBQU1ULE9BQUksUUFBTSw2QkFBNkIsS0FBN0IsQ0FBbUMsR0FBbkMsRUFBd0MsTUFBeEMsQ0FBK0MsVUFBQyxLQUFELEVBQVEsR0FBUixFQUFjO0FBQzdELFFBQUkscUJBQWlCLEdBQWpCLENBRHlEO0FBRXRFLFFBQUksUUFBTSxZQUFZLEdBQVosQ0FBZ0IsV0FBUyxTQUFULENBQXRCLENBRmtFO0FBR3RFLFFBQUcsU0FBTyxTQUFQLEVBQ0YsUUFBTSxlQUFlLEdBQWYsQ0FBbUIsU0FBbkIsQ0FBTixDQUREOztBQUdTLFFBQUcsU0FBTyxTQUFQLEVBQWlCO0FBQ2hCLFdBQU0sR0FBTixJQUFXLEtBQVgsQ0FEZ0I7S0FBcEI7QUFHQSxXQUFPLEtBQVAsQ0FUNkQ7SUFBZCxFQVVqRCxFQVZFLENBQU4sQ0FOSzs7QUFrQlQsVUFBTyxFQUFDLFlBQUQsRUFBTyxZQUFQLEVBQVAsQ0FsQlM7Ozs7UUE1QlU7OztLQUNWLGNBQVk7a0JBREYiLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IFBhcmFncmFwaCBmcm9tIFwiLi9wYXJhZ3JhcGhcIlxuaW1wb3J0IHtXb3JkV3JhcHBlcn0gZnJvbSBcIi4vdGV4dFwiXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgbGlzdCBleHRlbmRzIFBhcmFncmFwaHtcbiAgICBzdGF0aWMgZGlzcGxheU5hbWU9XCJsaXN0XCJcblx0XG5cdF9uZXdMaW5lKCl7XG4gICAgICAgIGxldCBsaW5lPXN1cGVyLl9uZXdMaW5lKClcblx0XHRcblx0XHRpZih0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLmxlbmd0aD09MCl7XG5cdFx0XHRsZXQge2luZGVudH09dGhpcy5nZXRTdHlsZSgpXG5cdFx0XHRsZXQge2xhYmVsLHN0eWxlfT10aGlzLmdldExhYmVsKClcblx0XHRcdGxldCB3b3JkV3JhcHBlcj1uZXcgV29yZFdyYXBwZXIobGFiZWwsc3R5bGUpXG5cdFx0XHRsZXQge2hlaWdodCxkZXNjZW50fT13b3JkV3JhcHBlclxuXHRcdFx0bGV0IHRleHQ9d29yZFdyYXBwZXIubmV4dCh7d2lkdGg6aW5kZW50Lmhhbmdpbmd9KVxuXHRcdFx0bGluZS5jaGlsZHJlbi5wdXNoKDxHcm91cFxuXHRcdFx0XHR4PXswfVxuXHRcdFx0XHRpbmRleD17LTF9XG5cdFx0XHRcdGRlc2NlbnQ9e2Rlc2NlbnR9XG5cdFx0XHRcdHdpZHRoPXtpbmRlbnQuaGFuZ2luZ31cblx0XHRcdFx0aGVpZ2h0PXtoZWlnaHR9PlxuXHRcdFx0XHQ8R3JvdXAgd2lkdGg9e2luZGVudC5oYW5naW5nfSBoZWlnaHQ9e2hlaWdodH0+PHRleHQgey4uLnRleHR9Lz48L0dyb3VwPlxuXHRcdFx0PC9Hcm91cD4pXG5cdFx0XHRcblx0XHRcdGxpbmUud2lkdGgtPWluZGVudC5oYW5naW5nXG5cdFx0XHRsaW5lLmhlaWdodD1oZWlnaHRcblx0XHRcdGxpbmUuZGVzY2VudD1kZXNjZW50XG5cdFx0fVxuXHRcdHJldHVybiBsaW5lXG5cdH1cblx0XG5cdGdldExhYmVsKCl7XG5cdFx0Y29uc3Qge2RpcmVjdFN0eWxlfT10aGlzLnByb3BzXG5cdFx0bGV0IGxhYmVsPWRpcmVjdFN0eWxlLmdldChcImxhYmVsXCIpXG5cdFx0XG5cdFx0Y29uc3Qge2luaGVyaXRlZFN0eWxlfT10aGlzLmNvbnRleHRcblxuXHRcdGxldCBzdHlsZT0nckZvbnRzLHN6LGNvbG9yLGIsaSx2YW5pc2gnLnNwbGl0KFwiLFwiKS5yZWR1Y2UoKHN0eWxlLCBrZXkpPT57XG4gICAgICAgICAgICBsZXQgc3R5bGVQYXRoPWByUHIuJHtrZXl9YFxuXHRcdFx0bGV0IHZhbHVlPWRpcmVjdFN0eWxlLmdldChcImxhYmVsLlwiK3N0eWxlUGF0aClcblx0XHRcdGlmKHZhbHVlPT11bmRlZmluZWQpXG5cdFx0XHRcdHZhbHVlPWluaGVyaXRlZFN0eWxlLmdldChzdHlsZVBhdGgpXG5cdFx0XHRcbiAgICAgICAgICAgIGlmKHZhbHVlIT11bmRlZmluZWQpe1xuICAgICAgICAgICAgICAgIHN0eWxlW2tleV09dmFsdWVcblx0XHRcdH1cbiAgICAgICAgICAgIHJldHVybiBzdHlsZVxuICAgICAgICB9LHt9KVxuXHRcdFxuXHRcdHJldHVybiB7bGFiZWwsc3R5bGV9XG5cdH1cbn1cbiJdfQ==