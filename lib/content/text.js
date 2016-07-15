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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3RleHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7OzRCQUdSO09BQ0osV0FBVSxLQUFLLFFBQUwsQ0FBVixTQURJO09BRUUsU0FBUSxLQUFLLE9BQUwsQ0FBUixPQUZGOztBQUdYLE9BQU0sVUFBUSxLQUFLLFVBQUwsRUFBUixDQUhLO0FBSVgsT0FBSSxRQUFNLEtBQUssUUFBTCxFQUFOLENBSk87QUFLWCxPQUFJLFdBQVMsSUFBSSxLQUFLLFdBQUwsQ0FBaUIsV0FBakIsQ0FBNkIsT0FBakMsRUFBMEMsS0FBMUMsQ0FBVCxDQUxPO0FBTVgsT0FBSSxlQUFhO0FBQ2hCLGdCQUFXLEtBQVg7QUFDQSxjQUFZLE1BQU0sRUFBTixPQUFaO0FBQ0EsZ0JBQVcsTUFBTSxDQUFOLEdBQVUsR0FBVixHQUFnQixHQUFoQjtBQUNYLGVBQVUsTUFBTSxDQUFOLEdBQVUsUUFBVixHQUFxQixRQUFyQjtBQUNWLFlBQVEsU0FBUyxNQUFUO0lBTEwsQ0FOTzs7QUFjWCxPQUFHLE1BQU0sS0FBTixFQUNGLGFBQWEsSUFBYixHQUFrQixNQUFNLEtBQU4sQ0FEbkI7O0FBR00sT0FBSSxPQUFLLElBQUwsQ0FqQkM7QUFrQkwsVUFBTSxPQUFLLFNBQVMsSUFBVCxDQUFjLE9BQU8sa0JBQVAsRUFBZCxDQUFMLEVBQWdEO0FBQzNELFdBQU8sTUFBUCxDQUFjLElBQWQsRUFBbUIsWUFBbkIsRUFEMkQ7QUFFbEQsYUFBUyxJQUFULENBQWMsSUFBZCxFQUZrRDtBQUdsRCxXQUFPLGNBQVAsQ0FBc0IsS0FBSyxxQkFBTCxDQUEyQixJQUEzQixDQUF0QixFQUhrRDtJQUF0RDtBQUtOLFVBQU8sZ0JBQVAsQ0FBd0IsSUFBeEIsRUF2Qlc7Ozs7NkJBMEJGO09BQ0YsaUJBQWdCLEtBQUssT0FBTCxDQUFoQixlQURFOztBQUVULFVBQU8sNkJBQTZCLEtBQTdCLENBQW1DLEdBQW5DLEVBQXdDLE1BQXhDLENBQStDLFVBQUMsS0FBRCxFQUFRLEdBQVIsRUFBYztBQUMxRCxRQUFJLHdCQUFvQixHQUFwQixDQURzRDtBQUUxRCxRQUFJLFFBQU0sZUFBZSxHQUFmLENBQW1CLFNBQW5CLENBQU4sQ0FGc0Q7QUFHMUQsUUFBRyxTQUFPLFNBQVAsRUFBaUI7QUFDaEIsU0FBRyx3QkFBYyxTQUFkLEtBQTRCLFFBQU0sQ0FBTixFQUFRO0FBQ2xELFlBQU0sR0FBTixJQUFXLFFBQU0sQ0FBTixDQUR1QztNQUF2QyxNQUdYLE1BQU0sR0FBTixJQUFXLEtBQVgsQ0FIVztLQURKO0FBTUEsV0FBTyxLQUFQLENBVDBEO0lBQWQsRUFVOUMsRUFWRCxDQUFQLENBRlM7Ozs7d0NBZVksT0FBTTttQkFDYixLQUFLLFFBQUwsR0FEYTs7T0FDcEIsd0JBRG9COztBQUUzQixPQUFHLEtBQUgsRUFDQyxNQUFNLElBQU4sR0FBVyxLQUFYLENBREQ7QUFFQSxTQUFNLEtBQU4sR0FBWSxFQUFDLFlBQVcsS0FBWCxFQUFiLENBSjJCO09BS3BCLFFBQStCLE1BQS9CLE1BTG9CO09BS2IsU0FBd0IsTUFBeEIsT0FMYTtPQUtMLE1BQWdCLE1BQWhCLElBTEs7O09BS0csa0NBQVEsbUNBTFg7O0FBTTNCLFVBQU87O01BQU8sT0FBTyxLQUFQLEVBQWMsUUFBUSxNQUFSLEVBQXJCO0lBQXFDLG1EQUFVLFNBQU8sT0FBTyxFQUFDLFlBQVcsS0FBWCxFQUFSLEdBQWpCLENBQXJDO0lBQVAsQ0FOMkI7Ozs7UUE1Q1I7OztLQUNiLGNBQVk7QUFEQyxLQXFEYixlQUFhLE9BQU8sTUFBUCxDQUFjO0FBQ2pDLGlCQUFnQixpQkFBVSxNQUFWO0NBREcsRUFFakIsYUFBUSxZQUFSO0FBdkRpQixLQXlEYjtrQkF6RGEiLCJmaWxlIjoidGV4dC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge05vQ2hpbGQsIGlzVG9nZ2xlU3R5bGV9IGZyb20gXCIuL2FueVwiXHJcbmltcG9ydCBIdG1sV29yZFdyYXBwZXIgZnJvbSBcIi4uL3dvcmR3cmFwL2h0bWxcIlxyXG5cclxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXh0IGV4dGVuZHMgTm9DaGlsZHtcclxuXHRzdGF0aWMgZGlzcGxheU5hbWU9XCJ0ZXh0XCJcclxuXHJcbiAgICBjb21wb3NlKCl7XHJcblx0XHRjb25zdCB7Y29tcG9zZWR9PXRoaXMuY29tcHV0ZWRcclxuICAgICAgICBjb25zdCB7cGFyZW50fT10aGlzLmNvbnRleHRcclxuXHRcdGNvbnN0IGNvbnRlbnQ9dGhpcy5nZXRDb250ZW50KClcclxuXHRcdGxldCBzdHlsZT10aGlzLmdldFN0eWxlKClcclxuXHRcdGxldCBjb21wb3Nlcj1uZXcgdGhpcy5jb25zdHJ1Y3Rvci5Xb3JkV3JhcHBlcihjb250ZW50LCBzdHlsZSlcclxuXHRcdGxldCBkZWZhdWx0U3R5bGU9e1xyXG5cdFx0XHR3aGl0ZVNwYWNlOidwcmUnLFxyXG5cdFx0XHRmb250U2l6ZTpgJHtzdHlsZS5zen1weGAsXHJcblx0XHRcdGZvbnRXZWlnaHQ6c3R5bGUuYiA/IDcwMCA6IDQwMCxcclxuXHRcdFx0Zm9udFN0eWxlOnN0eWxlLmkgPyBcIml0YWxpY1wiIDogXCJub3JtYWxcIixcclxuXHRcdFx0aGVpZ2h0OiBjb21wb3Nlci5oZWlnaHRcclxuXHRcdH1cclxuXHJcblx0XHRpZihzdHlsZS5jb2xvcilcclxuXHRcdFx0ZGVmYXVsdFN0eWxlLmZpbGw9c3R5bGUuY29sb3JcclxuXHJcbiAgICAgICAgbGV0IHRleHQ9bnVsbFxyXG4gICAgICAgIHdoaWxlKHRleHQ9Y29tcG9zZXIubmV4dChwYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKCkpKXtcclxuXHRcdFx0T2JqZWN0LmFzc2lnbih0ZXh0LGRlZmF1bHRTdHlsZSlcclxuICAgICAgICAgICAgY29tcG9zZWQucHVzaCh0ZXh0KVxyXG4gICAgICAgICAgICBwYXJlbnQuYXBwZW5kQ29tcG9zZWQodGhpcy5jcmVhdGVDb21wb3NlZDJQYXJlbnQodGV4dCkpXHJcbiAgICAgICAgfVxyXG5cdFx0cGFyZW50Lm9uMUNoaWxkQ29tcG9zZWQodGhpcylcclxuICAgIH1cclxuXHJcblx0Z2V0U3R5bGUoKXtcclxuXHRcdGNvbnN0IHtjb250YWluZXJTdHlsZX09dGhpcy5jb250ZXh0XHJcblx0XHRyZXR1cm4gJ3JGb250cyxzeixjb2xvcixiLGksdmFuaXNoJy5zcGxpdChcIixcIikucmVkdWNlKChzdHlsZSwga2V5KT0+e1xyXG4gICAgICAgICAgICBsZXQgc3R5bGVQYXRoPWBpbmxpbmUuJHtrZXl9YFxyXG4gICAgICAgICAgICBsZXQgdmFsdWU9Y29udGFpbmVyU3R5bGUuZ2V0KHN0eWxlUGF0aClcclxuICAgICAgICAgICAgaWYodmFsdWUhPXVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBpZihpc1RvZ2dsZVN0eWxlKHN0eWxlUGF0aCkgJiYgdmFsdWU8MCl7XHJcblx0XHRcdFx0XHRzdHlsZVtrZXldPXZhbHVlJTJcclxuXHRcdFx0XHR9ZWxzZVxyXG5cdFx0XHRcdFx0c3R5bGVba2V5XT12YWx1ZVxyXG5cdFx0XHR9XHJcbiAgICAgICAgICAgIHJldHVybiBzdHlsZVxyXG4gICAgICAgIH0se30pXHJcblx0fVxyXG5cclxuXHRjcmVhdGVDb21wb3NlZDJQYXJlbnQocHJvcHMpe1xyXG5cdFx0Y29uc3Qge2NvbG9yfT10aGlzLmdldFN0eWxlKClcclxuXHRcdGlmKGNvbG9yKVxyXG5cdFx0XHRwcm9wcy5maWxsPWNvbG9yXHJcblx0XHRwcm9wcy5zdHlsZT17d2hpdGVTcGFjZToncHJlJ31cclxuXHRcdGNvbnN0IHt3aWR0aCwgaGVpZ2h0LCBlbmQsIC4uLm90aGVyc309cHJvcHNcclxuXHRcdHJldHVybiA8R3JvdXAgd2lkdGg9e3dpZHRofSBoZWlnaHQ9e2hlaWdodH0+PHRleHQgey4uLnByb3BzfSBzdHlsZT17e3doaXRlU3BhY2U6XCJwcmVcIn19Lz48L0dyb3VwPlxyXG5cdH1cclxuXHJcblx0c3RhdGljIGNvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcclxuXHRcdGNvbnRhaW5lclN0eWxlOiBQcm9wVHlwZXMub2JqZWN0XHJcblx0fSwgTm9DaGlsZC5jb250ZXh0VHlwZXMpXHJcblxyXG5cdHN0YXRpYyBXb3JkV3JhcHBlcj1IdG1sV29yZFdyYXBwZXJcclxufVxyXG4iXX0=