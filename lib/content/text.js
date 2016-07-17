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
		key: "render",
		value: function render() {
			return null;
		}
	}, {
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
				height: composer.height
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
			var end = props.end;

			var others = _objectWithoutProperties(props, ["width", "height", "end"]);

			return _react2.default.createElement(
				_group2.default,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3RleHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7OzJCQUdaO0FBQ1AsVUFBTyxJQUFQLENBRE87Ozs7NEJBR0k7T0FDSixXQUFVLEtBQUssUUFBTCxDQUFWLFNBREk7T0FFRSxTQUFRLEtBQUssT0FBTCxDQUFSLE9BRkY7O0FBR1gsT0FBTSxVQUFRLEtBQUssVUFBTCxFQUFSLENBSEs7QUFJWCxPQUFJLFFBQU0sS0FBSyxRQUFMLEVBQU4sQ0FKTztBQUtYLE9BQUksV0FBUyxJQUFJLEtBQUssV0FBTCxDQUFpQixXQUFqQixDQUE2QixPQUFqQyxFQUEwQyxLQUExQyxDQUFULENBTE87QUFNWCxPQUFJLGVBQWE7QUFDaEIsZ0JBQVcsS0FBWDtBQUNBLGNBQVksTUFBTSxFQUFOLE9BQVo7QUFDQSxnQkFBVyxNQUFNLENBQU4sR0FBVSxHQUFWLEdBQWdCLEdBQWhCO0FBQ1gsZUFBVSxNQUFNLENBQU4sR0FBVSxRQUFWLEdBQXFCLFFBQXJCO0FBQ1YsWUFBUSxTQUFTLE1BQVQ7SUFMTCxDQU5POztBQWNYLE9BQUcsTUFBTSxLQUFOLEVBQ0YsYUFBYSxJQUFiLEdBQWtCLE1BQU0sS0FBTixDQURuQjs7QUFHTSxPQUFJLE9BQUssSUFBTCxDQWpCQztBQWtCTCxVQUFNLE9BQUssU0FBUyxJQUFULENBQWMsT0FBTyxrQkFBUCxFQUFkLENBQUwsRUFBZ0Q7QUFDM0QsV0FBTyxNQUFQLENBQWMsSUFBZCxFQUFtQixZQUFuQixFQUQyRDtBQUVsRCxhQUFTLElBQVQsQ0FBYyxJQUFkLEVBRmtEO0FBR2xELFdBQU8sY0FBUCxDQUFzQixLQUFLLHFCQUFMLENBQTJCLElBQTNCLENBQXRCLEVBSGtEO0lBQXREO0FBS04sVUFBTyxnQkFBUCxDQUF3QixJQUF4QixFQXZCVzs7Ozs2QkEwQkY7T0FDRixpQkFBZ0IsS0FBSyxPQUFMLENBQWhCLGVBREU7O0FBRVQsVUFBTyw2QkFBNkIsS0FBN0IsQ0FBbUMsR0FBbkMsRUFBd0MsTUFBeEMsQ0FBK0MsVUFBQyxLQUFELEVBQVEsR0FBUixFQUFjO0FBQzFELFFBQUksd0JBQW9CLEdBQXBCLENBRHNEO0FBRTFELFFBQUksUUFBTSxlQUFlLEdBQWYsQ0FBbUIsU0FBbkIsQ0FBTixDQUZzRDtBQUcxRCxRQUFHLFNBQU8sU0FBUCxFQUFpQjtBQUNoQixTQUFHLHdCQUFjLFNBQWQsS0FBNEIsUUFBTSxDQUFOLEVBQVE7QUFDbEQsWUFBTSxHQUFOLElBQVcsUUFBTSxDQUFOLENBRHVDO01BQXZDLE1BR1gsTUFBTSxHQUFOLElBQVcsS0FBWCxDQUhXO0tBREo7QUFNQSxXQUFPLEtBQVAsQ0FUMEQ7SUFBZCxFQVU5QyxFQVZELENBQVAsQ0FGUzs7Ozt3Q0FlWSxPQUFNO21CQUNiLEtBQUssUUFBTCxHQURhOztPQUNwQix3QkFEb0I7O0FBRTNCLE9BQUcsS0FBSCxFQUNDLE1BQU0sSUFBTixHQUFXLEtBQVgsQ0FERDtBQUVBLFNBQU0sS0FBTixHQUFZLEVBQUMsWUFBVyxLQUFYLEVBQWIsQ0FKMkI7T0FLcEIsUUFBK0IsTUFBL0IsTUFMb0I7T0FLYixTQUF3QixNQUF4QixPQUxhO09BS0wsTUFBZ0IsTUFBaEIsSUFMSzs7T0FLRyxrQ0FBUSxtQ0FMWDs7QUFNM0IsVUFBTzs7TUFBTyxPQUFPLEtBQVAsRUFBYyxRQUFRLE1BQVIsRUFBckI7SUFBcUMsbURBQVUsU0FBTyxPQUFPLEVBQUMsWUFBVyxLQUFYLEVBQVIsR0FBakIsQ0FBckM7SUFBUCxDQU4yQjs7OztRQS9DUjs7O0tBQ2IsY0FBWTtBQURDLEtBd0RiLGVBQWEsT0FBTyxNQUFQLENBQWM7QUFDakMsaUJBQWdCLGlCQUFVLE1BQVY7Q0FERyxFQUVqQixhQUFRLFlBQVI7QUExRGlCLEtBNERiO2tCQTVEYSIsImZpbGUiOiJ0ZXh0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7Tm9DaGlsZCwgaXNUb2dnbGVTdHlsZX0gZnJvbSBcIi4vYW55XCJcclxuaW1wb3J0IEh0bWxXb3JkV3JhcHBlciBmcm9tIFwiLi4vd29yZHdyYXAvaHRtbFwiXHJcblxyXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRleHQgZXh0ZW5kcyBOb0NoaWxke1xyXG5cdHN0YXRpYyBkaXNwbGF5TmFtZT1cInRleHRcIlxyXG5cclxuXHRyZW5kZXIoKXtcclxuXHRcdHJldHVybiBudWxsXHJcblx0fVxyXG4gICAgY29tcG9zZSgpe1xyXG5cdFx0Y29uc3Qge2NvbXBvc2VkfT10aGlzLmNvbXB1dGVkXHJcbiAgICAgICAgY29uc3Qge3BhcmVudH09dGhpcy5jb250ZXh0XHJcblx0XHRjb25zdCBjb250ZW50PXRoaXMuZ2V0Q29udGVudCgpXHJcblx0XHRsZXQgc3R5bGU9dGhpcy5nZXRTdHlsZSgpXHJcblx0XHRsZXQgY29tcG9zZXI9bmV3IHRoaXMuY29uc3RydWN0b3IuV29yZFdyYXBwZXIoY29udGVudCwgc3R5bGUpXHJcblx0XHRsZXQgZGVmYXVsdFN0eWxlPXtcclxuXHRcdFx0d2hpdGVTcGFjZToncHJlJyxcclxuXHRcdFx0Zm9udFNpemU6YCR7c3R5bGUuc3p9cHhgLFxyXG5cdFx0XHRmb250V2VpZ2h0OnN0eWxlLmIgPyA3MDAgOiA0MDAsXHJcblx0XHRcdGZvbnRTdHlsZTpzdHlsZS5pID8gXCJpdGFsaWNcIiA6IFwibm9ybWFsXCIsXHJcblx0XHRcdGhlaWdodDogY29tcG9zZXIuaGVpZ2h0XHJcblx0XHR9XHJcblxyXG5cdFx0aWYoc3R5bGUuY29sb3IpXHJcblx0XHRcdGRlZmF1bHRTdHlsZS5maWxsPXN0eWxlLmNvbG9yXHJcblxyXG4gICAgICAgIGxldCB0ZXh0PW51bGxcclxuICAgICAgICB3aGlsZSh0ZXh0PWNvbXBvc2VyLm5leHQocGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZSgpKSl7XHJcblx0XHRcdE9iamVjdC5hc3NpZ24odGV4dCxkZWZhdWx0U3R5bGUpXHJcbiAgICAgICAgICAgIGNvbXBvc2VkLnB1c2godGV4dClcclxuICAgICAgICAgICAgcGFyZW50LmFwcGVuZENvbXBvc2VkKHRoaXMuY3JlYXRlQ29tcG9zZWQyUGFyZW50KHRleHQpKVxyXG4gICAgICAgIH1cclxuXHRcdHBhcmVudC5vbjFDaGlsZENvbXBvc2VkKHRoaXMpXHJcbiAgICB9XHJcblxyXG5cdGdldFN0eWxlKCl7XHJcblx0XHRjb25zdCB7Y29udGFpbmVyU3R5bGV9PXRoaXMuY29udGV4dFxyXG5cdFx0cmV0dXJuICdyRm9udHMsc3osY29sb3IsYixpLHZhbmlzaCcuc3BsaXQoXCIsXCIpLnJlZHVjZSgoc3R5bGUsIGtleSk9PntcclxuICAgICAgICAgICAgbGV0IHN0eWxlUGF0aD1gaW5saW5lLiR7a2V5fWBcclxuICAgICAgICAgICAgbGV0IHZhbHVlPWNvbnRhaW5lclN0eWxlLmdldChzdHlsZVBhdGgpXHJcbiAgICAgICAgICAgIGlmKHZhbHVlIT11bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgaWYoaXNUb2dnbGVTdHlsZShzdHlsZVBhdGgpICYmIHZhbHVlPDApe1xyXG5cdFx0XHRcdFx0c3R5bGVba2V5XT12YWx1ZSUyXHJcblx0XHRcdFx0fWVsc2VcclxuXHRcdFx0XHRcdHN0eWxlW2tleV09dmFsdWVcclxuXHRcdFx0fVxyXG4gICAgICAgICAgICByZXR1cm4gc3R5bGVcclxuICAgICAgICB9LHt9KVxyXG5cdH1cclxuXHJcblx0Y3JlYXRlQ29tcG9zZWQyUGFyZW50KHByb3BzKXtcclxuXHRcdGNvbnN0IHtjb2xvcn09dGhpcy5nZXRTdHlsZSgpXHJcblx0XHRpZihjb2xvcilcclxuXHRcdFx0cHJvcHMuZmlsbD1jb2xvclxyXG5cdFx0cHJvcHMuc3R5bGU9e3doaXRlU3BhY2U6J3ByZSd9XHJcblx0XHRjb25zdCB7d2lkdGgsIGhlaWdodCwgZW5kLCAuLi5vdGhlcnN9PXByb3BzXHJcblx0XHRyZXR1cm4gPEdyb3VwIHdpZHRoPXt3aWR0aH0gaGVpZ2h0PXtoZWlnaHR9Pjx0ZXh0IHsuLi5wcm9wc30gc3R5bGU9e3t3aGl0ZVNwYWNlOlwicHJlXCJ9fS8+PC9Hcm91cD5cclxuXHR9XHJcblxyXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9T2JqZWN0LmFzc2lnbih7XHJcblx0XHRjb250YWluZXJTdHlsZTogUHJvcFR5cGVzLm9iamVjdFxyXG5cdH0sIE5vQ2hpbGQuY29udGV4dFR5cGVzKVxyXG5cclxuXHRzdGF0aWMgV29yZFdyYXBwZXI9SHRtbFdvcmRXcmFwcGVyXHJcbn1cclxuIl19