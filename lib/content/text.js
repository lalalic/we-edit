"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _any = require("./any");

var _html = require("../wordwrap/html");

var _html2 = _interopRequireDefault(_html);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Text = function (_NoChild) {
	_inherits(Text, _NoChild);

	function Text() {
		_classCallCheck(this, Text);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Text).apply(this, arguments));
	}

	_createClass(Text, [{
		key: "compose",
		value: function compose() {
			var composed = this.composed;
			var parent = this.context.parent;
			var content = this.state.content;

			var style = this.getStyle();
			var composer = new this.constructor.WordWrapper(content, style);
			var defaultStyle = {
				whiteSpace: 'pre',
				fontSize: style.sz + "px",
				fontWeight: style.b ? 700 : 400,
				fontStyle: style.i ? "italic" : "normal",
				height: composer.height
			};

			if (style.color) defaultStyle.fill = style.color;

			var text = null;
			while (text = composer.next(parent.nextAvailableSpace())) {
				Object.assign(text, defaultStyle);
				var _content = this.createComposedPiece(text);
				composed.push(_content);
				parent.appendComposed(_content);
			}
			parent.on1ChildComposed(this);
		}
	}, {
		key: "getStyle",
		value: function getStyle() {
			var containerStyle = this.context.containerStyle;

			return 'rFonts,sz,color,b,i,vanish'.split(",").reduce(function (style, key) {
				var stylePath = "inline." + key;
				var value = containerStyle.get(stylePath);
				if (value != undefined) {
					if ((0, _any.isToggleStyle)(stylePath) && value < 0) {
						style[key] = value % 2;
					} else style[key] = value;
				}
				return style;
			}, {});
		}
	}, {
		key: "createComposedPiece",
		value: function createComposedPiece(props) {
			var _getFontStyle = this.getFontStyle();

			var color = _getFontStyle.color;

			if (color) props.fill = color;
			props.style = { whiteSpace: 'pre' };
			var width = props.width;
			var height = props.height;
			var end = props.end;

			var others = _objectWithoutProperties(props, ["width", "height", "end"]);

			return _react2.default.createElement(
				Group,
				{ width: width, height: height },
				_react2.default.createElement("text", _extends({}, props, { style: { whiteSpace: "pre" } }))
			);
		}
	}]);

	return Text;
}(_any.NoChild);

Text.displayName = "text";
Text.contextTypes = Object.assign({
	containerStyle: _react.PropTypes.object
}, _any.NoChild.contextTypes);
Text.WordWrapper = _html2.default;
exports.default = Text;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3RleHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7Ozs0QkFHUjtPQUNKLFdBQVUsS0FBVixTQURJO09BRUUsU0FBUSxLQUFLLE9BQUwsQ0FBUixPQUZGO09BR0osVUFBUyxLQUFLLEtBQUwsQ0FBVCxRQUhJOztBQUlYLE9BQUksUUFBTSxLQUFLLFFBQUwsRUFBTixDQUpPO0FBS1gsT0FBSSxXQUFTLElBQUksS0FBSyxXQUFMLENBQWlCLFdBQWpCLENBQTZCLE9BQWpDLEVBQTBDLEtBQTFDLENBQVQsQ0FMTztBQU1YLE9BQUksZUFBYTtBQUNoQixnQkFBVyxLQUFYO0FBQ0EsY0FBWSxNQUFNLEVBQU4sT0FBWjtBQUNBLGdCQUFXLE1BQU0sQ0FBTixHQUFVLEdBQVYsR0FBZ0IsR0FBaEI7QUFDWCxlQUFVLE1BQU0sQ0FBTixHQUFVLFFBQVYsR0FBcUIsUUFBckI7QUFDVixZQUFRLFNBQVMsTUFBVDtJQUxMLENBTk87O0FBY1gsT0FBRyxNQUFNLEtBQU4sRUFDRixhQUFhLElBQWIsR0FBa0IsTUFBTSxLQUFOLENBRG5COztBQUdNLE9BQUksT0FBSyxJQUFMLENBakJDO0FBa0JMLFVBQU0sT0FBSyxTQUFTLElBQVQsQ0FBYyxPQUFPLGtCQUFQLEVBQWQsQ0FBTCxFQUFnRDtBQUMzRCxXQUFPLE1BQVAsQ0FBYyxJQUFkLEVBQW1CLFlBQW5CLEVBRDJEO0FBRTNELFFBQUksV0FBUSxLQUFLLG1CQUFMLENBQXlCLElBQXpCLENBQVIsQ0FGdUQ7QUFHbEQsYUFBUyxJQUFULENBQWMsUUFBZCxFQUhrRDtBQUlsRCxXQUFPLGNBQVAsQ0FBc0IsUUFBdEIsRUFKa0Q7SUFBdEQ7QUFNTixVQUFPLGdCQUFQLENBQXdCLElBQXhCLEVBeEJXOzs7OzZCQTJCRjtPQUNGLGlCQUFnQixLQUFLLE9BQUwsQ0FBaEIsZUFERTs7QUFFVCxVQUFPLDZCQUE2QixLQUE3QixDQUFtQyxHQUFuQyxFQUF3QyxNQUF4QyxDQUErQyxVQUFDLEtBQUQsRUFBUSxHQUFSLEVBQWM7QUFDMUQsUUFBSSx3QkFBb0IsR0FBcEIsQ0FEc0Q7QUFFMUQsUUFBSSxRQUFNLGVBQWUsR0FBZixDQUFtQixTQUFuQixDQUFOLENBRnNEO0FBRzFELFFBQUcsU0FBTyxTQUFQLEVBQWlCO0FBQ2hCLFNBQUcsd0JBQWMsU0FBZCxLQUE0QixRQUFNLENBQU4sRUFBUTtBQUNsRCxZQUFNLEdBQU4sSUFBVyxRQUFNLENBQU4sQ0FEdUM7TUFBdkMsTUFHWCxNQUFNLEdBQU4sSUFBVyxLQUFYLENBSFc7S0FESjtBQU1BLFdBQU8sS0FBUCxDQVQwRDtJQUFkLEVBVTlDLEVBVkQsQ0FBUCxDQUZTOzs7O3NDQWVVLE9BQU07dUJBQ1gsS0FBSyxZQUFMLEdBRFc7O09BQ2xCLDRCQURrQjs7QUFFekIsT0FBRyxLQUFILEVBQ0MsTUFBTSxJQUFOLEdBQVcsS0FBWCxDQUREO0FBRUEsU0FBTSxLQUFOLEdBQVksRUFBQyxZQUFXLEtBQVgsRUFBYixDQUp5QjtPQUtsQixRQUErQixNQUEvQixNQUxrQjtPQUtYLFNBQXdCLE1BQXhCLE9BTFc7T0FLSCxNQUFnQixNQUFoQixJQUxHOztPQUtLLGtDQUFRLG1DQUxiOztBQU16QixVQUFPO0FBQUMsU0FBRDtNQUFPLE9BQU8sS0FBUCxFQUFjLFFBQVEsTUFBUixFQUFyQjtJQUFxQyxtREFBVSxTQUFPLE9BQU8sRUFBQyxZQUFXLEtBQVgsRUFBUixHQUFqQixDQUFyQztJQUFQLENBTnlCOzs7O1FBN0NOOzs7S0FDYixjQUFZO0FBREMsS0FzRGIsZUFBYSxPQUFPLE1BQVAsQ0FBYztBQUNqQyxpQkFBZ0IsaUJBQVUsTUFBVjtDQURHLEVBRWpCLGFBQVEsWUFBUjtBQXhEaUIsS0EwRGI7a0JBMURhIiwiZmlsZSI6InRleHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtOb0NoaWxkLCBpc1RvZ2dsZVN0eWxlfSBmcm9tIFwiLi9hbnlcIlxyXG5pbXBvcnQgSHRtbFdvcmRXcmFwcGVyIGZyb20gXCIuLi93b3Jkd3JhcC9odG1sXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRleHQgZXh0ZW5kcyBOb0NoaWxke1xyXG5cdHN0YXRpYyBkaXNwbGF5TmFtZT1cInRleHRcIlxyXG5cclxuICAgIGNvbXBvc2UoKXtcclxuXHRcdGNvbnN0IHtjb21wb3NlZH09dGhpc1xyXG4gICAgICAgIGNvbnN0IHtwYXJlbnR9PXRoaXMuY29udGV4dFxyXG5cdFx0Y29uc3Qge2NvbnRlbnR9PXRoaXMuc3RhdGVcclxuXHRcdGxldCBzdHlsZT10aGlzLmdldFN0eWxlKClcclxuXHRcdGxldCBjb21wb3Nlcj1uZXcgdGhpcy5jb25zdHJ1Y3Rvci5Xb3JkV3JhcHBlcihjb250ZW50LCBzdHlsZSlcclxuXHRcdGxldCBkZWZhdWx0U3R5bGU9e1xyXG5cdFx0XHR3aGl0ZVNwYWNlOidwcmUnLFxyXG5cdFx0XHRmb250U2l6ZTpgJHtzdHlsZS5zen1weGAsXHJcblx0XHRcdGZvbnRXZWlnaHQ6c3R5bGUuYiA/IDcwMCA6IDQwMCxcclxuXHRcdFx0Zm9udFN0eWxlOnN0eWxlLmkgPyBcIml0YWxpY1wiIDogXCJub3JtYWxcIixcclxuXHRcdFx0aGVpZ2h0OiBjb21wb3Nlci5oZWlnaHRcclxuXHRcdH1cclxuXHJcblx0XHRpZihzdHlsZS5jb2xvcilcclxuXHRcdFx0ZGVmYXVsdFN0eWxlLmZpbGw9c3R5bGUuY29sb3JcclxuXHJcbiAgICAgICAgbGV0IHRleHQ9bnVsbFxyXG4gICAgICAgIHdoaWxlKHRleHQ9Y29tcG9zZXIubmV4dChwYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKCkpKXtcclxuXHRcdFx0T2JqZWN0LmFzc2lnbih0ZXh0LGRlZmF1bHRTdHlsZSlcclxuXHRcdFx0bGV0IGNvbnRlbnQ9dGhpcy5jcmVhdGVDb21wb3NlZFBpZWNlKHRleHQpXHJcbiAgICAgICAgICAgIGNvbXBvc2VkLnB1c2goY29udGVudClcclxuICAgICAgICAgICAgcGFyZW50LmFwcGVuZENvbXBvc2VkKGNvbnRlbnQpXHJcbiAgICAgICAgfVxyXG5cdFx0cGFyZW50Lm9uMUNoaWxkQ29tcG9zZWQodGhpcylcclxuICAgIH1cclxuXHJcblx0Z2V0U3R5bGUoKXtcclxuXHRcdGNvbnN0IHtjb250YWluZXJTdHlsZX09dGhpcy5jb250ZXh0XHJcblx0XHRyZXR1cm4gJ3JGb250cyxzeixjb2xvcixiLGksdmFuaXNoJy5zcGxpdChcIixcIikucmVkdWNlKChzdHlsZSwga2V5KT0+e1xyXG4gICAgICAgICAgICBsZXQgc3R5bGVQYXRoPWBpbmxpbmUuJHtrZXl9YFxyXG4gICAgICAgICAgICBsZXQgdmFsdWU9Y29udGFpbmVyU3R5bGUuZ2V0KHN0eWxlUGF0aClcclxuICAgICAgICAgICAgaWYodmFsdWUhPXVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBpZihpc1RvZ2dsZVN0eWxlKHN0eWxlUGF0aCkgJiYgdmFsdWU8MCl7XHJcblx0XHRcdFx0XHRzdHlsZVtrZXldPXZhbHVlJTJcclxuXHRcdFx0XHR9ZWxzZVxyXG5cdFx0XHRcdFx0c3R5bGVba2V5XT12YWx1ZVxyXG5cdFx0XHR9XHJcbiAgICAgICAgICAgIHJldHVybiBzdHlsZVxyXG4gICAgICAgIH0se30pXHJcblx0fVxyXG5cclxuXHRjcmVhdGVDb21wb3NlZFBpZWNlKHByb3BzKXtcclxuXHRcdGNvbnN0IHtjb2xvcn09dGhpcy5nZXRGb250U3R5bGUoKVxyXG5cdFx0aWYoY29sb3IpXHJcblx0XHRcdHByb3BzLmZpbGw9Y29sb3JcclxuXHRcdHByb3BzLnN0eWxlPXt3aGl0ZVNwYWNlOidwcmUnfVxyXG5cdFx0Y29uc3Qge3dpZHRoLCBoZWlnaHQsIGVuZCwgLi4ub3RoZXJzfT1wcm9wc1xyXG5cdFx0cmV0dXJuIDxHcm91cCB3aWR0aD17d2lkdGh9IGhlaWdodD17aGVpZ2h0fT48dGV4dCB7Li4ucHJvcHN9IHN0eWxlPXt7d2hpdGVTcGFjZTpcInByZVwifX0vPjwvR3JvdXA+XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgY29udGV4dFR5cGVzPU9iamVjdC5hc3NpZ24oe1xyXG5cdFx0Y29udGFpbmVyU3R5bGU6IFByb3BUeXBlcy5vYmplY3RcclxuXHR9LCBOb0NoaWxkLmNvbnRleHRUeXBlcylcclxuXHJcblx0c3RhdGljIFdvcmRXcmFwcGVyPUh0bWxXb3JkV3JhcHBlclxyXG59XHJcbiJdfQ==