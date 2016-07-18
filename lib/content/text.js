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
				y: composer.descent
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3RleHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7OzRCQUdSO09BQ0osV0FBVSxLQUFLLFFBQUwsQ0FBVixTQURJO09BRUUsU0FBUSxLQUFLLE9BQUwsQ0FBUixPQUZGOztBQUdYLE9BQU0sVUFBUSxLQUFLLFVBQUwsRUFBUixDQUhLO0FBSVgsT0FBSSxRQUFNLEtBQUssUUFBTCxFQUFOLENBSk87QUFLWCxPQUFJLFdBQVMsSUFBSSxLQUFLLFdBQUwsQ0FBaUIsV0FBakIsQ0FBNkIsT0FBakMsRUFBMEMsS0FBMUMsQ0FBVCxDQUxPO0FBTVgsT0FBSSxlQUFhO0FBQ2hCLGdCQUFXLEtBQVg7QUFDQSxjQUFZLE1BQU0sRUFBTixPQUFaO0FBQ0EsZ0JBQVcsTUFBTSxDQUFOLEdBQVUsR0FBVixHQUFnQixHQUFoQjtBQUNYLGVBQVUsTUFBTSxDQUFOLEdBQVUsUUFBVixHQUFxQixRQUFyQjtBQUNWLFlBQVEsU0FBUyxNQUFUO0FBQ1IsT0FBRyxTQUFTLE9BQVQ7SUFOQSxDQU5POztBQWVYLE9BQUcsTUFBTSxLQUFOLEVBQ0YsYUFBYSxJQUFiLEdBQWtCLE1BQU0sS0FBTixDQURuQjs7QUFHTSxPQUFJLE9BQUssSUFBTCxDQWxCQztBQW1CTCxVQUFNLE9BQUssU0FBUyxJQUFULENBQWMsT0FBTyxrQkFBUCxFQUFkLENBQUwsRUFBZ0Q7QUFDM0QsV0FBTyxNQUFQLENBQWMsSUFBZCxFQUFtQixZQUFuQixFQUQyRDtBQUVsRCxhQUFTLElBQVQsQ0FBYyxJQUFkLEVBRmtEO0FBR2xELFdBQU8sY0FBUCxDQUFzQixLQUFLLHFCQUFMLENBQTJCLElBQTNCLENBQXRCLEVBSGtEO0lBQXREO0FBS04sVUFBTyxnQkFBUCxDQUF3QixJQUF4QixFQXhCVzs7Ozs2QkEyQkY7T0FDRixpQkFBZ0IsS0FBSyxPQUFMLENBQWhCLGVBREU7O0FBRVQsVUFBTyw2QkFBNkIsS0FBN0IsQ0FBbUMsR0FBbkMsRUFBd0MsTUFBeEMsQ0FBK0MsVUFBQyxLQUFELEVBQVEsR0FBUixFQUFjO0FBQzFELFFBQUksd0JBQW9CLEdBQXBCLENBRHNEO0FBRTFELFFBQUksUUFBTSxlQUFlLEdBQWYsQ0FBbUIsU0FBbkIsQ0FBTixDQUZzRDtBQUcxRCxRQUFHLFNBQU8sU0FBUCxFQUFpQjtBQUNoQixTQUFHLHdCQUFjLFNBQWQsS0FBNEIsUUFBTSxDQUFOLEVBQVE7QUFDbEQsWUFBTSxHQUFOLElBQVcsUUFBTSxDQUFOLENBRHVDO01BQXZDLE1BR1gsTUFBTSxHQUFOLElBQVcsS0FBWCxDQUhXO0tBREo7QUFNQSxXQUFPLEtBQVAsQ0FUMEQ7SUFBZCxFQVU5QyxFQVZELENBQVAsQ0FGUzs7Ozt3Q0FlWSxPQUFNO21CQUNiLEtBQUssUUFBTCxHQURhOztPQUNwQix3QkFEb0I7O0FBRTNCLE9BQUcsS0FBSCxFQUNDLE1BQU0sSUFBTixHQUFXLEtBQVgsQ0FERDtBQUVBLFNBQU0sS0FBTixHQUFZLEVBQUMsWUFBVyxLQUFYLEVBQWIsQ0FKMkI7T0FLcEIsUUFBK0IsTUFBL0IsTUFMb0I7T0FLYixTQUF3QixNQUF4QixPQUxhO09BS0wsTUFBZ0IsTUFBaEIsSUFMSzs7T0FLRyxrQ0FBUSxtQ0FMWDs7QUFNM0IsVUFBTzs7TUFBTyxPQUFPLEtBQVAsRUFBYyxRQUFRLE1BQVIsRUFBckI7SUFBcUMsbURBQVUsU0FBTyxPQUFPLEVBQUMsWUFBVyxLQUFYLEVBQVIsR0FBakIsQ0FBckM7SUFBUCxDQU4yQjs7OztRQTdDUjs7O0tBQ2IsY0FBWTtBQURDLEtBc0RiLGVBQWEsT0FBTyxNQUFQLENBQWM7QUFDakMsaUJBQWdCLGlCQUFVLE1BQVY7Q0FERyxFQUVqQixhQUFRLFlBQVI7QUF4RGlCLEtBMERiO2tCQTFEYSIsImZpbGUiOiJ0ZXh0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7Tm9DaGlsZCwgaXNUb2dnbGVTdHlsZX0gZnJvbSBcIi4vYW55XCJcclxuaW1wb3J0IEh0bWxXb3JkV3JhcHBlciBmcm9tIFwiLi4vd29yZHdyYXAvaHRtbFwiXHJcblxyXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRleHQgZXh0ZW5kcyBOb0NoaWxke1xyXG5cdHN0YXRpYyBkaXNwbGF5TmFtZT1cInRleHRcIlxyXG5cclxuICAgIGNvbXBvc2UoKXtcclxuXHRcdGNvbnN0IHtjb21wb3NlZH09dGhpcy5jb21wdXRlZFxyXG4gICAgICAgIGNvbnN0IHtwYXJlbnR9PXRoaXMuY29udGV4dFxyXG5cdFx0Y29uc3QgY29udGVudD10aGlzLmdldENvbnRlbnQoKVxyXG5cdFx0bGV0IHN0eWxlPXRoaXMuZ2V0U3R5bGUoKVxyXG5cdFx0bGV0IGNvbXBvc2VyPW5ldyB0aGlzLmNvbnN0cnVjdG9yLldvcmRXcmFwcGVyKGNvbnRlbnQsIHN0eWxlKVxyXG5cdFx0bGV0IGRlZmF1bHRTdHlsZT17XHJcblx0XHRcdHdoaXRlU3BhY2U6J3ByZScsXHJcblx0XHRcdGZvbnRTaXplOmAke3N0eWxlLnN6fXB4YCxcclxuXHRcdFx0Zm9udFdlaWdodDpzdHlsZS5iID8gNzAwIDogNDAwLFxyXG5cdFx0XHRmb250U3R5bGU6c3R5bGUuaSA/IFwiaXRhbGljXCIgOiBcIm5vcm1hbFwiLFxyXG5cdFx0XHRoZWlnaHQ6IGNvbXBvc2VyLmhlaWdodCxcclxuXHRcdFx0eTogY29tcG9zZXIuZGVzY2VudFxyXG5cdFx0fVxyXG5cclxuXHRcdGlmKHN0eWxlLmNvbG9yKVxyXG5cdFx0XHRkZWZhdWx0U3R5bGUuZmlsbD1zdHlsZS5jb2xvclxyXG5cclxuICAgICAgICBsZXQgdGV4dD1udWxsXHJcbiAgICAgICAgd2hpbGUodGV4dD1jb21wb3Nlci5uZXh0KHBhcmVudC5uZXh0QXZhaWxhYmxlU3BhY2UoKSkpe1xyXG5cdFx0XHRPYmplY3QuYXNzaWduKHRleHQsZGVmYXVsdFN0eWxlKVxyXG4gICAgICAgICAgICBjb21wb3NlZC5wdXNoKHRleHQpXHJcbiAgICAgICAgICAgIHBhcmVudC5hcHBlbmRDb21wb3NlZCh0aGlzLmNyZWF0ZUNvbXBvc2VkMlBhcmVudCh0ZXh0KSlcclxuICAgICAgICB9XHJcblx0XHRwYXJlbnQub24xQ2hpbGRDb21wb3NlZCh0aGlzKVxyXG4gICAgfVxyXG5cclxuXHRnZXRTdHlsZSgpe1xyXG5cdFx0Y29uc3Qge2NvbnRhaW5lclN0eWxlfT10aGlzLmNvbnRleHRcclxuXHRcdHJldHVybiAnckZvbnRzLHN6LGNvbG9yLGIsaSx2YW5pc2gnLnNwbGl0KFwiLFwiKS5yZWR1Y2UoKHN0eWxlLCBrZXkpPT57XHJcbiAgICAgICAgICAgIGxldCBzdHlsZVBhdGg9YGlubGluZS4ke2tleX1gXHJcbiAgICAgICAgICAgIGxldCB2YWx1ZT1jb250YWluZXJTdHlsZS5nZXQoc3R5bGVQYXRoKVxyXG4gICAgICAgICAgICBpZih2YWx1ZSE9dW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGlmKGlzVG9nZ2xlU3R5bGUoc3R5bGVQYXRoKSAmJiB2YWx1ZTwwKXtcclxuXHRcdFx0XHRcdHN0eWxlW2tleV09dmFsdWUlMlxyXG5cdFx0XHRcdH1lbHNlXHJcblx0XHRcdFx0XHRzdHlsZVtrZXldPXZhbHVlXHJcblx0XHRcdH1cclxuICAgICAgICAgICAgcmV0dXJuIHN0eWxlXHJcbiAgICAgICAgfSx7fSlcclxuXHR9XHJcblxyXG5cdGNyZWF0ZUNvbXBvc2VkMlBhcmVudChwcm9wcyl7XHJcblx0XHRjb25zdCB7Y29sb3J9PXRoaXMuZ2V0U3R5bGUoKVxyXG5cdFx0aWYoY29sb3IpXHJcblx0XHRcdHByb3BzLmZpbGw9Y29sb3JcclxuXHRcdHByb3BzLnN0eWxlPXt3aGl0ZVNwYWNlOidwcmUnfVxyXG5cdFx0Y29uc3Qge3dpZHRoLCBoZWlnaHQsIGVuZCwgLi4ub3RoZXJzfT1wcm9wc1xyXG5cdFx0cmV0dXJuIDxHcm91cCB3aWR0aD17d2lkdGh9IGhlaWdodD17aGVpZ2h0fT48dGV4dCB7Li4ucHJvcHN9IHN0eWxlPXt7d2hpdGVTcGFjZTpcInByZVwifX0vPjwvR3JvdXA+XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgY29udGV4dFR5cGVzPU9iamVjdC5hc3NpZ24oe1xyXG5cdFx0Y29udGFpbmVyU3R5bGU6IFByb3BUeXBlcy5vYmplY3RcclxuXHR9LCBOb0NoaWxkLmNvbnRleHRUeXBlcylcclxuXHJcblx0c3RhdGljIFdvcmRXcmFwcGVyPUh0bWxXb3JkV3JhcHBlclxyXG59XHJcbiJdfQ==