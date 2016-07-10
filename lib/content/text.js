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

			return 'rFonts,sz,color,b,i'.split(",").reduce(function (style, key) {
				var stylePath = "inline." + key;
				var value = containerStyle.get(stylePath);
				if (value != undefined) style[key] = value;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3RleHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7Ozs0QkFHUjtPQUNKLFdBQVUsS0FBVixTQURJO09BRUUsU0FBUSxLQUFLLE9BQUwsQ0FBUixPQUZGO09BR0osVUFBUyxLQUFLLEtBQUwsQ0FBVCxRQUhJOztBQUlYLE9BQUksUUFBTSxLQUFLLFFBQUwsRUFBTixDQUpPO0FBS1gsT0FBSSxXQUFTLElBQUksS0FBSyxXQUFMLENBQWlCLFdBQWpCLENBQTZCLE9BQWpDLEVBQTBDLEtBQTFDLENBQVQsQ0FMTztBQU1YLE9BQUksZUFBYTtBQUNoQixnQkFBVyxLQUFYO0FBQ0EsY0FBWSxNQUFNLEVBQU4sT0FBWjtBQUNBLGdCQUFXLE1BQU0sQ0FBTixHQUFVLEdBQVYsR0FBZ0IsR0FBaEI7QUFDWCxlQUFVLE1BQU0sQ0FBTixHQUFVLFFBQVYsR0FBcUIsUUFBckI7QUFDVixZQUFRLFNBQVMsTUFBVDtJQUxMLENBTk87O0FBY1gsT0FBRyxNQUFNLEtBQU4sRUFDRixhQUFhLElBQWIsR0FBa0IsTUFBTSxLQUFOLENBRG5COztBQUdNLE9BQUksT0FBSyxJQUFMLENBakJDO0FBa0JMLFVBQU0sT0FBSyxTQUFTLElBQVQsQ0FBYyxPQUFPLGtCQUFQLEVBQWQsQ0FBTCxFQUFnRDtBQUMzRCxXQUFPLE1BQVAsQ0FBYyxJQUFkLEVBQW1CLFlBQW5CLEVBRDJEO0FBRTNELFFBQUksV0FBUSxLQUFLLG1CQUFMLENBQXlCLElBQXpCLENBQVIsQ0FGdUQ7QUFHbEQsYUFBUyxJQUFULENBQWMsUUFBZCxFQUhrRDtBQUlsRCxXQUFPLGNBQVAsQ0FBc0IsUUFBdEIsRUFKa0Q7SUFBdEQ7QUFNTixVQUFPLGdCQUFQLENBQXdCLElBQXhCLEVBeEJXOzs7OzZCQTJCRjtPQUNGLGlCQUFnQixLQUFLLE9BQUwsQ0FBaEIsZUFERTs7QUFFVCxVQUFPLHNCQUFzQixLQUF0QixDQUE0QixHQUE1QixFQUFpQyxNQUFqQyxDQUF3QyxVQUFDLEtBQUQsRUFBUSxHQUFSLEVBQWM7QUFDbkQsUUFBSSx3QkFBb0IsR0FBcEIsQ0FEK0M7QUFFbkQsUUFBSSxRQUFNLGVBQWUsR0FBZixDQUFtQixTQUFuQixDQUFOLENBRitDO0FBR25ELFFBQUcsU0FBTyxTQUFQLEVBQ0MsTUFBTSxHQUFOLElBQVcsS0FBWCxDQURKO0FBRUEsV0FBTyxLQUFQLENBTG1EO0lBQWQsRUFNdkMsRUFORCxDQUFQLENBRlM7Ozs7c0NBV1UsT0FBTTt1QkFDWCxLQUFLLFlBQUwsR0FEVzs7T0FDbEIsNEJBRGtCOztBQUV6QixPQUFHLEtBQUgsRUFDQyxNQUFNLElBQU4sR0FBVyxLQUFYLENBREQ7QUFFQSxTQUFNLEtBQU4sR0FBWSxFQUFDLFlBQVcsS0FBWCxFQUFiLENBSnlCO09BS2xCLFFBQStCLE1BQS9CLE1BTGtCO09BS1gsU0FBd0IsTUFBeEIsT0FMVztPQUtILE1BQWdCLE1BQWhCLElBTEc7O09BS0ssa0NBQVEsbUNBTGI7O0FBTXpCLFVBQU87QUFBQyxTQUFEO01BQU8sT0FBTyxLQUFQLEVBQWMsUUFBUSxNQUFSLEVBQXJCO0lBQXFDLG1EQUFVLFNBQU8sT0FBTyxFQUFDLFlBQVcsS0FBWCxFQUFSLEdBQWpCLENBQXJDO0lBQVAsQ0FOeUI7Ozs7UUF6Q047OztLQUNiLGNBQVk7QUFEQyxLQWtEYixlQUFhLE9BQU8sTUFBUCxDQUFjO0FBQ2pDLGlCQUFnQixpQkFBVSxNQUFWO0NBREcsRUFFakIsYUFBUSxZQUFSO0FBcERpQixLQXNEYjtrQkF0RGEiLCJmaWxlIjoidGV4dC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge05vQ2hpbGR9IGZyb20gXCIuL2FueVwiXHJcbmltcG9ydCBIdG1sV29yZFdyYXBwZXIgZnJvbSBcIi4uL3dvcmR3cmFwL2h0bWxcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dCBleHRlbmRzIE5vQ2hpbGR7XHJcblx0c3RhdGljIGRpc3BsYXlOYW1lPVwidGV4dFwiXHJcblxyXG4gICAgY29tcG9zZSgpe1xyXG5cdFx0Y29uc3Qge2NvbXBvc2VkfT10aGlzXHJcbiAgICAgICAgY29uc3Qge3BhcmVudH09dGhpcy5jb250ZXh0XHJcblx0XHRjb25zdCB7Y29udGVudH09dGhpcy5zdGF0ZVxyXG5cdFx0bGV0IHN0eWxlPXRoaXMuZ2V0U3R5bGUoKVxyXG5cdFx0bGV0IGNvbXBvc2VyPW5ldyB0aGlzLmNvbnN0cnVjdG9yLldvcmRXcmFwcGVyKGNvbnRlbnQsIHN0eWxlKVxyXG5cdFx0bGV0IGRlZmF1bHRTdHlsZT17XHJcblx0XHRcdHdoaXRlU3BhY2U6J3ByZScsXHJcblx0XHRcdGZvbnRTaXplOmAke3N0eWxlLnN6fXB4YCxcclxuXHRcdFx0Zm9udFdlaWdodDpzdHlsZS5iID8gNzAwIDogNDAwLFxyXG5cdFx0XHRmb250U3R5bGU6c3R5bGUuaSA/IFwiaXRhbGljXCIgOiBcIm5vcm1hbFwiLFxyXG5cdFx0XHRoZWlnaHQ6IGNvbXBvc2VyLmhlaWdodFxyXG5cdFx0fVxyXG5cclxuXHRcdGlmKHN0eWxlLmNvbG9yKVxyXG5cdFx0XHRkZWZhdWx0U3R5bGUuZmlsbD1zdHlsZS5jb2xvclxyXG5cclxuICAgICAgICBsZXQgdGV4dD1udWxsXHJcbiAgICAgICAgd2hpbGUodGV4dD1jb21wb3Nlci5uZXh0KHBhcmVudC5uZXh0QXZhaWxhYmxlU3BhY2UoKSkpe1xyXG5cdFx0XHRPYmplY3QuYXNzaWduKHRleHQsZGVmYXVsdFN0eWxlKVxyXG5cdFx0XHRsZXQgY29udGVudD10aGlzLmNyZWF0ZUNvbXBvc2VkUGllY2UodGV4dClcclxuICAgICAgICAgICAgY29tcG9zZWQucHVzaChjb250ZW50KVxyXG4gICAgICAgICAgICBwYXJlbnQuYXBwZW5kQ29tcG9zZWQoY29udGVudClcclxuICAgICAgICB9XHJcblx0XHRwYXJlbnQub24xQ2hpbGRDb21wb3NlZCh0aGlzKVxyXG4gICAgfVxyXG5cclxuXHRnZXRTdHlsZSgpe1xyXG5cdFx0Y29uc3Qge2NvbnRhaW5lclN0eWxlfT10aGlzLmNvbnRleHRcclxuXHRcdHJldHVybiAnckZvbnRzLHN6LGNvbG9yLGIsaScuc3BsaXQoXCIsXCIpLnJlZHVjZSgoc3R5bGUsIGtleSk9PntcclxuICAgICAgICAgICAgbGV0IHN0eWxlUGF0aD1gaW5saW5lLiR7a2V5fWBcclxuICAgICAgICAgICAgbGV0IHZhbHVlPWNvbnRhaW5lclN0eWxlLmdldChzdHlsZVBhdGgpXHJcbiAgICAgICAgICAgIGlmKHZhbHVlIT11bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICBzdHlsZVtrZXldPXZhbHVlXHJcbiAgICAgICAgICAgIHJldHVybiBzdHlsZVxyXG4gICAgICAgIH0se30pXHJcblx0fVxyXG5cclxuXHRjcmVhdGVDb21wb3NlZFBpZWNlKHByb3BzKXtcclxuXHRcdGNvbnN0IHtjb2xvcn09dGhpcy5nZXRGb250U3R5bGUoKVxyXG5cdFx0aWYoY29sb3IpXHJcblx0XHRcdHByb3BzLmZpbGw9Y29sb3JcclxuXHRcdHByb3BzLnN0eWxlPXt3aGl0ZVNwYWNlOidwcmUnfVxyXG5cdFx0Y29uc3Qge3dpZHRoLCBoZWlnaHQsIGVuZCwgLi4ub3RoZXJzfT1wcm9wc1xyXG5cdFx0cmV0dXJuIDxHcm91cCB3aWR0aD17d2lkdGh9IGhlaWdodD17aGVpZ2h0fT48dGV4dCB7Li4ucHJvcHN9IHN0eWxlPXt7d2hpdGVTcGFjZTpcInByZVwifX0vPjwvR3JvdXA+XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgY29udGV4dFR5cGVzPU9iamVjdC5hc3NpZ24oe1xyXG5cdFx0Y29udGFpbmVyU3R5bGU6IFByb3BUeXBlcy5vYmplY3RcclxuXHR9LCBOb0NoaWxkLmNvbnRleHRUeXBlcylcclxuXHJcblx0c3RhdGljIFdvcmRXcmFwcGVyPUh0bWxXb3JkV3JhcHBlclxyXG59XHJcbiJdfQ==