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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3RleHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7OzRCQUdSO09BQ0osV0FBVSxLQUFWLFNBREk7T0FFRSxTQUFRLEtBQUssT0FBTCxDQUFSLE9BRkY7T0FHSixVQUFTLEtBQUssS0FBTCxDQUFULFFBSEk7O0FBSVgsT0FBSSxRQUFNLEtBQUssUUFBTCxFQUFOLENBSk87QUFLWCxPQUFJLFdBQVMsSUFBSSxLQUFLLFdBQUwsQ0FBaUIsV0FBakIsQ0FBNkIsT0FBakMsRUFBMEMsS0FBMUMsQ0FBVCxDQUxPO0FBTVgsT0FBSSxlQUFhO0FBQ2hCLGdCQUFXLEtBQVg7QUFDQSxjQUFZLE1BQU0sRUFBTixPQUFaO0FBQ0EsZ0JBQVcsTUFBTSxDQUFOLEdBQVUsR0FBVixHQUFnQixHQUFoQjtBQUNYLGVBQVUsTUFBTSxDQUFOLEdBQVUsUUFBVixHQUFxQixRQUFyQjtBQUNWLFlBQVEsU0FBUyxNQUFUO0lBTEwsQ0FOTzs7QUFjWCxPQUFHLE1BQU0sS0FBTixFQUNGLGFBQWEsSUFBYixHQUFrQixNQUFNLEtBQU4sQ0FEbkI7O0FBR00sT0FBSSxPQUFLLElBQUwsQ0FqQkM7QUFrQkwsVUFBTSxPQUFLLFNBQVMsSUFBVCxDQUFjLE9BQU8sa0JBQVAsRUFBZCxDQUFMLEVBQWdEO0FBQzNELFdBQU8sTUFBUCxDQUFjLElBQWQsRUFBbUIsWUFBbkIsRUFEMkQ7QUFFbEQsYUFBUyxJQUFULENBQWMsSUFBZCxFQUZrRDtBQUdsRCxXQUFPLGNBQVAsQ0FBc0IsS0FBSyxxQkFBTCxDQUEyQixJQUEzQixDQUF0QixFQUhrRDtJQUF0RDtBQUtOLFVBQU8sZ0JBQVAsQ0FBd0IsSUFBeEIsRUF2Qlc7Ozs7NkJBMEJGO09BQ0YsaUJBQWdCLEtBQUssT0FBTCxDQUFoQixlQURFOztBQUVULFVBQU8sNkJBQTZCLEtBQTdCLENBQW1DLEdBQW5DLEVBQXdDLE1BQXhDLENBQStDLFVBQUMsS0FBRCxFQUFRLEdBQVIsRUFBYztBQUMxRCxRQUFJLHdCQUFvQixHQUFwQixDQURzRDtBQUUxRCxRQUFJLFFBQU0sZUFBZSxHQUFmLENBQW1CLFNBQW5CLENBQU4sQ0FGc0Q7QUFHMUQsUUFBRyxTQUFPLFNBQVAsRUFBaUI7QUFDaEIsU0FBRyx3QkFBYyxTQUFkLEtBQTRCLFFBQU0sQ0FBTixFQUFRO0FBQ2xELFlBQU0sR0FBTixJQUFXLFFBQU0sQ0FBTixDQUR1QztNQUF2QyxNQUdYLE1BQU0sR0FBTixJQUFXLEtBQVgsQ0FIVztLQURKO0FBTUEsV0FBTyxLQUFQLENBVDBEO0lBQWQsRUFVOUMsRUFWRCxDQUFQLENBRlM7Ozs7d0NBZVksT0FBTTttQkFDYixLQUFLLFFBQUwsR0FEYTs7T0FDcEIsd0JBRG9COztBQUUzQixPQUFHLEtBQUgsRUFDQyxNQUFNLElBQU4sR0FBVyxLQUFYLENBREQ7QUFFQSxTQUFNLEtBQU4sR0FBWSxFQUFDLFlBQVcsS0FBWCxFQUFiLENBSjJCO09BS3BCLFFBQStCLE1BQS9CLE1BTG9CO09BS2IsU0FBd0IsTUFBeEIsT0FMYTtPQUtMLE1BQWdCLE1BQWhCLElBTEs7O09BS0csa0NBQVEsbUNBTFg7O0FBTTNCLFVBQU87O01BQU8sT0FBTyxLQUFQLEVBQWMsUUFBUSxNQUFSLEVBQXJCO0lBQXFDLG1EQUFVLFNBQU8sT0FBTyxFQUFDLFlBQVcsS0FBWCxFQUFSLEdBQWpCLENBQXJDO0lBQVAsQ0FOMkI7Ozs7UUE1Q1I7OztLQUNiLGNBQVk7QUFEQyxLQXFEYixlQUFhLE9BQU8sTUFBUCxDQUFjO0FBQ2pDLGlCQUFnQixpQkFBVSxNQUFWO0NBREcsRUFFakIsYUFBUSxZQUFSO0FBdkRpQixLQXlEYjtrQkF6RGEiLCJmaWxlIjoidGV4dC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge05vQ2hpbGQsIGlzVG9nZ2xlU3R5bGV9IGZyb20gXCIuL2FueVwiXHJcbmltcG9ydCBIdG1sV29yZFdyYXBwZXIgZnJvbSBcIi4uL3dvcmR3cmFwL2h0bWxcIlxyXG5cclxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXh0IGV4dGVuZHMgTm9DaGlsZHtcclxuXHRzdGF0aWMgZGlzcGxheU5hbWU9XCJ0ZXh0XCJcclxuXHJcbiAgICBjb21wb3NlKCl7XHJcblx0XHRjb25zdCB7Y29tcG9zZWR9PXRoaXNcclxuICAgICAgICBjb25zdCB7cGFyZW50fT10aGlzLmNvbnRleHRcclxuXHRcdGNvbnN0IHtjb250ZW50fT10aGlzLnN0YXRlXHJcblx0XHRsZXQgc3R5bGU9dGhpcy5nZXRTdHlsZSgpXHJcblx0XHRsZXQgY29tcG9zZXI9bmV3IHRoaXMuY29uc3RydWN0b3IuV29yZFdyYXBwZXIoY29udGVudCwgc3R5bGUpXHJcblx0XHRsZXQgZGVmYXVsdFN0eWxlPXtcclxuXHRcdFx0d2hpdGVTcGFjZToncHJlJyxcclxuXHRcdFx0Zm9udFNpemU6YCR7c3R5bGUuc3p9cHhgLFxyXG5cdFx0XHRmb250V2VpZ2h0OnN0eWxlLmIgPyA3MDAgOiA0MDAsXHJcblx0XHRcdGZvbnRTdHlsZTpzdHlsZS5pID8gXCJpdGFsaWNcIiA6IFwibm9ybWFsXCIsXHJcblx0XHRcdGhlaWdodDogY29tcG9zZXIuaGVpZ2h0XHJcblx0XHR9XHJcblxyXG5cdFx0aWYoc3R5bGUuY29sb3IpXHJcblx0XHRcdGRlZmF1bHRTdHlsZS5maWxsPXN0eWxlLmNvbG9yXHJcblxyXG4gICAgICAgIGxldCB0ZXh0PW51bGxcclxuICAgICAgICB3aGlsZSh0ZXh0PWNvbXBvc2VyLm5leHQocGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZSgpKSl7XHJcblx0XHRcdE9iamVjdC5hc3NpZ24odGV4dCxkZWZhdWx0U3R5bGUpXHJcbiAgICAgICAgICAgIGNvbXBvc2VkLnB1c2godGV4dClcclxuICAgICAgICAgICAgcGFyZW50LmFwcGVuZENvbXBvc2VkKHRoaXMuY3JlYXRlQ29tcG9zZWQyUGFyZW50KHRleHQpKVxyXG4gICAgICAgIH1cclxuXHRcdHBhcmVudC5vbjFDaGlsZENvbXBvc2VkKHRoaXMpXHJcbiAgICB9XHJcblxyXG5cdGdldFN0eWxlKCl7XHJcblx0XHRjb25zdCB7Y29udGFpbmVyU3R5bGV9PXRoaXMuY29udGV4dFxyXG5cdFx0cmV0dXJuICdyRm9udHMsc3osY29sb3IsYixpLHZhbmlzaCcuc3BsaXQoXCIsXCIpLnJlZHVjZSgoc3R5bGUsIGtleSk9PntcclxuICAgICAgICAgICAgbGV0IHN0eWxlUGF0aD1gaW5saW5lLiR7a2V5fWBcclxuICAgICAgICAgICAgbGV0IHZhbHVlPWNvbnRhaW5lclN0eWxlLmdldChzdHlsZVBhdGgpXHJcbiAgICAgICAgICAgIGlmKHZhbHVlIT11bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgaWYoaXNUb2dnbGVTdHlsZShzdHlsZVBhdGgpICYmIHZhbHVlPDApe1xyXG5cdFx0XHRcdFx0c3R5bGVba2V5XT12YWx1ZSUyXHJcblx0XHRcdFx0fWVsc2VcclxuXHRcdFx0XHRcdHN0eWxlW2tleV09dmFsdWVcclxuXHRcdFx0fVxyXG4gICAgICAgICAgICByZXR1cm4gc3R5bGVcclxuICAgICAgICB9LHt9KVxyXG5cdH1cclxuXHJcblx0Y3JlYXRlQ29tcG9zZWQyUGFyZW50KHByb3BzKXtcclxuXHRcdGNvbnN0IHtjb2xvcn09dGhpcy5nZXRTdHlsZSgpXHJcblx0XHRpZihjb2xvcilcclxuXHRcdFx0cHJvcHMuZmlsbD1jb2xvclxyXG5cdFx0cHJvcHMuc3R5bGU9e3doaXRlU3BhY2U6J3ByZSd9XHJcblx0XHRjb25zdCB7d2lkdGgsIGhlaWdodCwgZW5kLCAuLi5vdGhlcnN9PXByb3BzXHJcblx0XHRyZXR1cm4gPEdyb3VwIHdpZHRoPXt3aWR0aH0gaGVpZ2h0PXtoZWlnaHR9Pjx0ZXh0IHsuLi5wcm9wc30gc3R5bGU9e3t3aGl0ZVNwYWNlOlwicHJlXCJ9fS8+PC9Hcm91cD5cclxuXHR9XHJcblxyXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9T2JqZWN0LmFzc2lnbih7XHJcblx0XHRjb250YWluZXJTdHlsZTogUHJvcFR5cGVzLm9iamVjdFxyXG5cdH0sIE5vQ2hpbGQuY29udGV4dFR5cGVzKVxyXG5cclxuXHRzdGF0aWMgV29yZFdyYXBwZXI9SHRtbFdvcmRXcmFwcGVyXHJcbn1cclxuIl19