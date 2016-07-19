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

var _group = require("../composed/group");

var _group2 = _interopRequireDefault(_group);

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
			var composed = this.computed.composed;
			var parent = this.context.parent;

			var content = this.getContent();
			var style = this.getStyle();
			var composer = new this.constructor.WordWrapper(content, style);
			var defaultStyle = {
				whiteSpace: 'pre',
				fontSize: style.sz + "px",
				fontWeight: style.b ? 700 : 400,
				fontStyle: style.i ? "italic" : "normal",
				height: composer.height,
				descent: composer.descent
			};

			if (style.color) defaultStyle.fill = style.color;

			var text = null;
			while (text = composer.next(parent.nextAvailableSpace())) {
				Object.assign(text, defaultStyle);
				composed.push(text);
				parent.appendComposed(this.createComposed2Parent(text));
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
		key: "createComposed2Parent",
		value: function createComposed2Parent(props) {
			var _getStyle = this.getStyle();

			var color = _getStyle.color;

			if (color) props.fill = color;
			props.style = { whiteSpace: 'pre' };
			var width = props.width;
			var height = props.height;
			var descent = props.descent;

			var others = _objectWithoutProperties(props, ["width", "height", "descent"]);

			return _react2.default.createElement(
				_group2.default,
				{ width: width, height: height, descent: descent },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3RleHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7OzRCQUdSO09BQ0osV0FBVSxLQUFLLFFBQUwsQ0FBVixTQURJO09BRUUsU0FBUSxLQUFLLE9BQUwsQ0FBUixPQUZGOztBQUdYLE9BQU0sVUFBUSxLQUFLLFVBQUwsRUFBUixDQUhLO0FBSVgsT0FBSSxRQUFNLEtBQUssUUFBTCxFQUFOLENBSk87QUFLWCxPQUFJLFdBQVMsSUFBSSxLQUFLLFdBQUwsQ0FBaUIsV0FBakIsQ0FBNkIsT0FBakMsRUFBMEMsS0FBMUMsQ0FBVCxDQUxPO0FBTVgsT0FBSSxlQUFhO0FBQ2hCLGdCQUFXLEtBQVg7QUFDQSxjQUFZLE1BQU0sRUFBTixPQUFaO0FBQ0EsZ0JBQVcsTUFBTSxDQUFOLEdBQVUsR0FBVixHQUFnQixHQUFoQjtBQUNYLGVBQVUsTUFBTSxDQUFOLEdBQVUsUUFBVixHQUFxQixRQUFyQjtBQUNWLFlBQVEsU0FBUyxNQUFUO0FBQ1IsYUFBUyxTQUFTLE9BQVQ7SUFOTixDQU5POztBQWVYLE9BQUcsTUFBTSxLQUFOLEVBQ0YsYUFBYSxJQUFiLEdBQWtCLE1BQU0sS0FBTixDQURuQjs7QUFHTSxPQUFJLE9BQUssSUFBTCxDQWxCQztBQW1CTCxVQUFNLE9BQUssU0FBUyxJQUFULENBQWMsT0FBTyxrQkFBUCxFQUFkLENBQUwsRUFBZ0Q7QUFDM0QsV0FBTyxNQUFQLENBQWMsSUFBZCxFQUFtQixZQUFuQixFQUQyRDtBQUVsRCxhQUFTLElBQVQsQ0FBYyxJQUFkLEVBRmtEO0FBR2xELFdBQU8sY0FBUCxDQUFzQixLQUFLLHFCQUFMLENBQTJCLElBQTNCLENBQXRCLEVBSGtEO0lBQXREO0FBS04sVUFBTyxnQkFBUCxDQUF3QixJQUF4QixFQXhCVzs7Ozs2QkEyQkY7T0FDRixpQkFBZ0IsS0FBSyxPQUFMLENBQWhCLGVBREU7O0FBRVQsVUFBTyw2QkFBNkIsS0FBN0IsQ0FBbUMsR0FBbkMsRUFBd0MsTUFBeEMsQ0FBK0MsVUFBQyxLQUFELEVBQVEsR0FBUixFQUFjO0FBQzFELFFBQUksd0JBQW9CLEdBQXBCLENBRHNEO0FBRTFELFFBQUksUUFBTSxlQUFlLEdBQWYsQ0FBbUIsU0FBbkIsQ0FBTixDQUZzRDtBQUcxRCxRQUFHLFNBQU8sU0FBUCxFQUFpQjtBQUNoQixTQUFHLHdCQUFjLFNBQWQsS0FBNEIsUUFBTSxDQUFOLEVBQVE7QUFDbEQsWUFBTSxHQUFOLElBQVcsUUFBTSxDQUFOLENBRHVDO01BQXZDLE1BR1gsTUFBTSxHQUFOLElBQVcsS0FBWCxDQUhXO0tBREo7QUFNQSxXQUFPLEtBQVAsQ0FUMEQ7SUFBZCxFQVU5QyxFQVZELENBQVAsQ0FGUzs7Ozt3Q0FlWSxPQUFNO21CQUNiLEtBQUssUUFBTCxHQURhOztPQUNwQix3QkFEb0I7O0FBRTNCLE9BQUcsS0FBSCxFQUNDLE1BQU0sSUFBTixHQUFXLEtBQVgsQ0FERDtBQUVBLFNBQU0sS0FBTixHQUFZLEVBQUMsWUFBVyxLQUFYLEVBQWIsQ0FKMkI7T0FLcEIsUUFBbUMsTUFBbkMsTUFMb0I7T0FLYixTQUE0QixNQUE1QixPQUxhO09BS0wsVUFBb0IsTUFBcEIsUUFMSzs7T0FLTyxrQ0FBUSx1Q0FMZjs7QUFNM0IsVUFBTzs7TUFBTyxPQUFPLEtBQVAsRUFBYyxRQUFRLE1BQVIsRUFBZ0IsU0FBUyxPQUFULEVBQXJDO0lBQXVELG1EQUFVLFNBQU8sT0FBTyxFQUFDLFlBQVcsS0FBWCxFQUFSLEdBQWpCLENBQXZEO0lBQVAsQ0FOMkI7Ozs7UUE3Q1I7OztLQUNiLGNBQVk7QUFEQyxLQXNEYixlQUFhLE9BQU8sTUFBUCxDQUFjO0FBQ2pDLGlCQUFnQixpQkFBVSxNQUFWO0NBREcsRUFFakIsYUFBUSxZQUFSO0FBeERpQixLQTBEYjtrQkExRGEiLCJmaWxlIjoidGV4dC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge05vQ2hpbGQsIGlzVG9nZ2xlU3R5bGV9IGZyb20gXCIuL2FueVwiXHJcbmltcG9ydCBIdG1sV29yZFdyYXBwZXIgZnJvbSBcIi4uL3dvcmR3cmFwL2h0bWxcIlxyXG5cclxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXh0IGV4dGVuZHMgTm9DaGlsZHtcclxuXHRzdGF0aWMgZGlzcGxheU5hbWU9XCJ0ZXh0XCJcclxuXHJcbiAgICBjb21wb3NlKCl7XHJcblx0XHRjb25zdCB7Y29tcG9zZWR9PXRoaXMuY29tcHV0ZWRcclxuICAgICAgICBjb25zdCB7cGFyZW50fT10aGlzLmNvbnRleHRcclxuXHRcdGNvbnN0IGNvbnRlbnQ9dGhpcy5nZXRDb250ZW50KClcclxuXHRcdGxldCBzdHlsZT10aGlzLmdldFN0eWxlKClcclxuXHRcdGxldCBjb21wb3Nlcj1uZXcgdGhpcy5jb25zdHJ1Y3Rvci5Xb3JkV3JhcHBlcihjb250ZW50LCBzdHlsZSlcclxuXHRcdGxldCBkZWZhdWx0U3R5bGU9e1xyXG5cdFx0XHR3aGl0ZVNwYWNlOidwcmUnLFxyXG5cdFx0XHRmb250U2l6ZTpgJHtzdHlsZS5zen1weGAsXHJcblx0XHRcdGZvbnRXZWlnaHQ6c3R5bGUuYiA/IDcwMCA6IDQwMCxcclxuXHRcdFx0Zm9udFN0eWxlOnN0eWxlLmkgPyBcIml0YWxpY1wiIDogXCJub3JtYWxcIixcclxuXHRcdFx0aGVpZ2h0OiBjb21wb3Nlci5oZWlnaHQsXHJcblx0XHRcdGRlc2NlbnQ6IGNvbXBvc2VyLmRlc2NlbnRcclxuXHRcdH1cclxuXHJcblx0XHRpZihzdHlsZS5jb2xvcilcclxuXHRcdFx0ZGVmYXVsdFN0eWxlLmZpbGw9c3R5bGUuY29sb3JcclxuXHJcbiAgICAgICAgbGV0IHRleHQ9bnVsbFxyXG4gICAgICAgIHdoaWxlKHRleHQ9Y29tcG9zZXIubmV4dChwYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKCkpKXtcclxuXHRcdFx0T2JqZWN0LmFzc2lnbih0ZXh0LGRlZmF1bHRTdHlsZSlcclxuICAgICAgICAgICAgY29tcG9zZWQucHVzaCh0ZXh0KVxyXG4gICAgICAgICAgICBwYXJlbnQuYXBwZW5kQ29tcG9zZWQodGhpcy5jcmVhdGVDb21wb3NlZDJQYXJlbnQodGV4dCkpXHJcbiAgICAgICAgfVxyXG5cdFx0cGFyZW50Lm9uMUNoaWxkQ29tcG9zZWQodGhpcylcclxuICAgIH1cclxuXHJcblx0Z2V0U3R5bGUoKXtcclxuXHRcdGNvbnN0IHtjb250YWluZXJTdHlsZX09dGhpcy5jb250ZXh0XHJcblx0XHRyZXR1cm4gJ3JGb250cyxzeixjb2xvcixiLGksdmFuaXNoJy5zcGxpdChcIixcIikucmVkdWNlKChzdHlsZSwga2V5KT0+e1xyXG4gICAgICAgICAgICBsZXQgc3R5bGVQYXRoPWBpbmxpbmUuJHtrZXl9YFxyXG4gICAgICAgICAgICBsZXQgdmFsdWU9Y29udGFpbmVyU3R5bGUuZ2V0KHN0eWxlUGF0aClcclxuICAgICAgICAgICAgaWYodmFsdWUhPXVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBpZihpc1RvZ2dsZVN0eWxlKHN0eWxlUGF0aCkgJiYgdmFsdWU8MCl7XHJcblx0XHRcdFx0XHRzdHlsZVtrZXldPXZhbHVlJTJcclxuXHRcdFx0XHR9ZWxzZVxyXG5cdFx0XHRcdFx0c3R5bGVba2V5XT12YWx1ZVxyXG5cdFx0XHR9XHJcbiAgICAgICAgICAgIHJldHVybiBzdHlsZVxyXG4gICAgICAgIH0se30pXHJcblx0fVxyXG5cclxuXHRjcmVhdGVDb21wb3NlZDJQYXJlbnQocHJvcHMpe1xyXG5cdFx0Y29uc3Qge2NvbG9yfT10aGlzLmdldFN0eWxlKClcclxuXHRcdGlmKGNvbG9yKVxyXG5cdFx0XHRwcm9wcy5maWxsPWNvbG9yXHJcblx0XHRwcm9wcy5zdHlsZT17d2hpdGVTcGFjZToncHJlJ31cclxuXHRcdGNvbnN0IHt3aWR0aCwgaGVpZ2h0LCBkZXNjZW50LCAuLi5vdGhlcnN9PXByb3BzXHJcblx0XHRyZXR1cm4gPEdyb3VwIHdpZHRoPXt3aWR0aH0gaGVpZ2h0PXtoZWlnaHR9IGRlc2NlbnQ9e2Rlc2NlbnR9Pjx0ZXh0IHsuLi5wcm9wc30gc3R5bGU9e3t3aGl0ZVNwYWNlOlwicHJlXCJ9fS8+PC9Hcm91cD5cclxuXHR9XHJcblxyXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9T2JqZWN0LmFzc2lnbih7XHJcblx0XHRjb250YWluZXJTdHlsZTogUHJvcFR5cGVzLm9iamVjdFxyXG5cdH0sIE5vQ2hpbGQuY29udGV4dFR5cGVzKVxyXG5cclxuXHRzdGF0aWMgV29yZFdyYXBwZXI9SHRtbFdvcmRXcmFwcGVyXHJcbn1cclxuIl19