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
			var inheritedStyle = this.context.inheritedStyle;

			return 'rFonts,sz,color,b,i,vanish'.split(",").reduce(function (style, key) {
				var stylePath = "rPr." + key;
				var value = inheritedStyle.get(stylePath);
				if (value != undefined) {
					style[key] = value;
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
	inheritedStyle: _react.PropTypes.object
}, _any.NoChild.contextTypes);
Text.WordWrapper = _html2.default;
exports.default = Text;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3RleHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7OzRCQUdSO09BQ0osV0FBVSxLQUFLLFFBQUwsQ0FBVixTQURJO09BRUUsU0FBUSxLQUFLLE9BQUwsQ0FBUixPQUZGOztBQUdYLE9BQU0sVUFBUSxLQUFLLFVBQUwsRUFBUixDQUhLO0FBSVgsT0FBSSxRQUFNLEtBQUssUUFBTCxFQUFOLENBSk87QUFLWCxPQUFJLFdBQVMsSUFBSSxLQUFLLFdBQUwsQ0FBaUIsV0FBakIsQ0FBNkIsT0FBakMsRUFBMEMsS0FBMUMsQ0FBVCxDQUxPO0FBTVgsT0FBSSxlQUFhO0FBQ2hCLGdCQUFXLEtBQVg7QUFDQSxjQUFZLE1BQU0sRUFBTixPQUFaO0FBQ0EsZ0JBQVcsTUFBTSxDQUFOLEdBQVUsR0FBVixHQUFnQixHQUFoQjtBQUNYLGVBQVUsTUFBTSxDQUFOLEdBQVUsUUFBVixHQUFxQixRQUFyQjtBQUNWLFlBQVEsU0FBUyxNQUFUO0FBQ1IsYUFBUyxTQUFTLE9BQVQ7SUFOTixDQU5POztBQWVYLE9BQUcsTUFBTSxLQUFOLEVBQ0YsYUFBYSxJQUFiLEdBQWtCLE1BQU0sS0FBTixDQURuQjs7QUFHTSxPQUFJLE9BQUssSUFBTCxDQWxCQztBQW1CTCxVQUFNLE9BQUssU0FBUyxJQUFULENBQWMsT0FBTyxrQkFBUCxFQUFkLENBQUwsRUFBZ0Q7QUFDM0QsV0FBTyxNQUFQLENBQWMsSUFBZCxFQUFtQixZQUFuQixFQUQyRDtBQUVsRCxhQUFTLElBQVQsQ0FBYyxJQUFkLEVBRmtEO0FBR2xELFdBQU8sY0FBUCxDQUFzQixLQUFLLHFCQUFMLENBQTJCLElBQTNCLENBQXRCLEVBSGtEO0lBQXREO0FBS04sVUFBTyxnQkFBUCxDQUF3QixJQUF4QixFQXhCVzs7Ozs2QkEyQkY7T0FDRixpQkFBZ0IsS0FBSyxPQUFMLENBQWhCLGVBREU7O0FBRVQsVUFBTyw2QkFBNkIsS0FBN0IsQ0FBbUMsR0FBbkMsRUFBd0MsTUFBeEMsQ0FBK0MsVUFBQyxLQUFELEVBQVEsR0FBUixFQUFjO0FBQzFELFFBQUkscUJBQWlCLEdBQWpCLENBRHNEO0FBRTFELFFBQUksUUFBTSxlQUFlLEdBQWYsQ0FBbUIsU0FBbkIsQ0FBTixDQUZzRDtBQUcxRCxRQUFHLFNBQU8sU0FBUCxFQUFpQjtBQUNoQixXQUFNLEdBQU4sSUFBVyxLQUFYLENBRGdCO0tBQXBCO0FBR0EsV0FBTyxLQUFQLENBTjBEO0lBQWQsRUFPOUMsRUFQRCxDQUFQLENBRlM7Ozs7d0NBWVksT0FBTTttQkFDYixLQUFLLFFBQUwsR0FEYTs7T0FDcEIsd0JBRG9COztBQUUzQixPQUFHLEtBQUgsRUFDQyxNQUFNLElBQU4sR0FBVyxLQUFYLENBREQ7QUFFQSxTQUFNLEtBQU4sR0FBWSxFQUFDLFlBQVcsS0FBWCxFQUFiLENBSjJCO09BS3BCLFFBQW1DLE1BQW5DLE1BTG9CO09BS2IsU0FBNEIsTUFBNUIsT0FMYTtPQUtMLFVBQW9CLE1BQXBCLFFBTEs7O09BS08sa0NBQVEsdUNBTGY7O0FBTTNCLFVBQU87O01BQU8sT0FBTyxLQUFQLEVBQWMsUUFBUSxNQUFSLEVBQWdCLFNBQVMsT0FBVCxFQUFyQztJQUF1RCxtREFBVSxTQUFPLE9BQU8sRUFBQyxZQUFXLEtBQVgsRUFBUixHQUFqQixDQUF2RDtJQUFQLENBTjJCOzs7O1FBMUNSOzs7S0FDYixjQUFZO0FBREMsS0FtRGIsZUFBYSxPQUFPLE1BQVAsQ0FBYztBQUNqQyxpQkFBZ0IsaUJBQVUsTUFBVjtDQURHLEVBRWpCLGFBQVEsWUFBUjtBQXJEaUIsS0F1RGI7a0JBdkRhIiwiZmlsZSI6InRleHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtOb0NoaWxkLCBpc1RvZ2dsZVN0eWxlfSBmcm9tIFwiLi9hbnlcIlxyXG5pbXBvcnQgSHRtbFdvcmRXcmFwcGVyIGZyb20gXCIuLi93b3Jkd3JhcC9odG1sXCJcclxuXHJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZWQvZ3JvdXBcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dCBleHRlbmRzIE5vQ2hpbGR7XHJcblx0c3RhdGljIGRpc3BsYXlOYW1lPVwidGV4dFwiXHJcblxyXG4gICAgY29tcG9zZSgpe1xyXG5cdFx0Y29uc3Qge2NvbXBvc2VkfT10aGlzLmNvbXB1dGVkXHJcbiAgICAgICAgY29uc3Qge3BhcmVudH09dGhpcy5jb250ZXh0XHJcblx0XHRjb25zdCBjb250ZW50PXRoaXMuZ2V0Q29udGVudCgpXHJcblx0XHRsZXQgc3R5bGU9dGhpcy5nZXRTdHlsZSgpXHJcblx0XHRsZXQgY29tcG9zZXI9bmV3IHRoaXMuY29uc3RydWN0b3IuV29yZFdyYXBwZXIoY29udGVudCwgc3R5bGUpXHJcblx0XHRsZXQgZGVmYXVsdFN0eWxlPXtcclxuXHRcdFx0d2hpdGVTcGFjZToncHJlJyxcclxuXHRcdFx0Zm9udFNpemU6YCR7c3R5bGUuc3p9cHhgLFxyXG5cdFx0XHRmb250V2VpZ2h0OnN0eWxlLmIgPyA3MDAgOiA0MDAsXHJcblx0XHRcdGZvbnRTdHlsZTpzdHlsZS5pID8gXCJpdGFsaWNcIiA6IFwibm9ybWFsXCIsXHJcblx0XHRcdGhlaWdodDogY29tcG9zZXIuaGVpZ2h0LFxyXG5cdFx0XHRkZXNjZW50OiBjb21wb3Nlci5kZXNjZW50XHJcblx0XHR9XHJcblxyXG5cdFx0aWYoc3R5bGUuY29sb3IpXHJcblx0XHRcdGRlZmF1bHRTdHlsZS5maWxsPXN0eWxlLmNvbG9yXHJcblxyXG4gICAgICAgIGxldCB0ZXh0PW51bGxcclxuICAgICAgICB3aGlsZSh0ZXh0PWNvbXBvc2VyLm5leHQocGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZSgpKSl7XHJcblx0XHRcdE9iamVjdC5hc3NpZ24odGV4dCxkZWZhdWx0U3R5bGUpXHJcbiAgICAgICAgICAgIGNvbXBvc2VkLnB1c2godGV4dClcclxuICAgICAgICAgICAgcGFyZW50LmFwcGVuZENvbXBvc2VkKHRoaXMuY3JlYXRlQ29tcG9zZWQyUGFyZW50KHRleHQpKVxyXG4gICAgICAgIH1cclxuXHRcdHBhcmVudC5vbjFDaGlsZENvbXBvc2VkKHRoaXMpXHJcbiAgICB9XHJcblxyXG5cdGdldFN0eWxlKCl7XHJcblx0XHRjb25zdCB7aW5oZXJpdGVkU3R5bGV9PXRoaXMuY29udGV4dFxyXG5cdFx0cmV0dXJuICdyRm9udHMsc3osY29sb3IsYixpLHZhbmlzaCcuc3BsaXQoXCIsXCIpLnJlZHVjZSgoc3R5bGUsIGtleSk9PntcclxuICAgICAgICAgICAgbGV0IHN0eWxlUGF0aD1gclByLiR7a2V5fWBcclxuICAgICAgICAgICAgbGV0IHZhbHVlPWluaGVyaXRlZFN0eWxlLmdldChzdHlsZVBhdGgpXHJcbiAgICAgICAgICAgIGlmKHZhbHVlIT11bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgc3R5bGVba2V5XT12YWx1ZVxyXG5cdFx0XHR9XHJcbiAgICAgICAgICAgIHJldHVybiBzdHlsZVxyXG4gICAgICAgIH0se30pXHJcblx0fVxyXG5cclxuXHRjcmVhdGVDb21wb3NlZDJQYXJlbnQocHJvcHMpe1xyXG5cdFx0Y29uc3Qge2NvbG9yfT10aGlzLmdldFN0eWxlKClcclxuXHRcdGlmKGNvbG9yKVxyXG5cdFx0XHRwcm9wcy5maWxsPWNvbG9yXHJcblx0XHRwcm9wcy5zdHlsZT17d2hpdGVTcGFjZToncHJlJ31cclxuXHRcdGNvbnN0IHt3aWR0aCwgaGVpZ2h0LCBkZXNjZW50LCAuLi5vdGhlcnN9PXByb3BzXHJcblx0XHRyZXR1cm4gPEdyb3VwIHdpZHRoPXt3aWR0aH0gaGVpZ2h0PXtoZWlnaHR9IGRlc2NlbnQ9e2Rlc2NlbnR9Pjx0ZXh0IHsuLi5wcm9wc30gc3R5bGU9e3t3aGl0ZVNwYWNlOlwicHJlXCJ9fS8+PC9Hcm91cD5cclxuXHR9XHJcblxyXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9T2JqZWN0LmFzc2lnbih7XHJcblx0XHRpbmhlcml0ZWRTdHlsZTogUHJvcFR5cGVzLm9iamVjdFxyXG5cdH0sIE5vQ2hpbGQuY29udGV4dFR5cGVzKVxyXG5cclxuXHRzdGF0aWMgV29yZFdyYXBwZXI9SHRtbFdvcmRXcmFwcGVyXHJcbn1cclxuIl19