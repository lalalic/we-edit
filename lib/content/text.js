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

			var style = this.getFontStyle();
			var composer = new this.constructor.WordWrapper(content, style);
			var text = null;
			while (text = composer.next(parent.nextAvailableSpace())) {
				var _content = this.createComposedPiece(text);
				composed.push(_content);
				parent.appendComposed(_content);
			}
			parent.on1ChildComposed(this);
		}
	}, {
		key: "createComposedPiece",
		value: function createComposedPiece(props) {
			var _getFontStyle = this.getFontStyle();

			var color = _getFontStyle.color;

			if (color) props.fill = color;
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
	}, {
		key: "getFontStyle",
		value: function getFontStyle() {
			var style = this.context.style;

			return style;
		}
	}]);

	return Text;
}(_any.NoChild);

Text.displayName = "text";
Text.contextTypes = Object.assign({
	style: _react.PropTypes.object
}, _any.NoChild.contextTypes);
Text.WordWrapper = _html2.default;
exports.default = Text;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3RleHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7Ozs0QkFHUjtPQUNKLFdBQVUsS0FBVixTQURJO09BRUUsU0FBUSxLQUFLLE9BQUwsQ0FBUixPQUZGO09BR0osVUFBUyxLQUFLLEtBQUwsQ0FBVCxRQUhJOztBQUlYLE9BQUksUUFBTSxLQUFLLFlBQUwsRUFBTixDQUpPO0FBS0wsT0FBSSxXQUFTLElBQUksS0FBSyxXQUFMLENBQWlCLFdBQWpCLENBQTZCLE9BQWpDLEVBQTBDLEtBQTFDLENBQVQsQ0FMQztBQU1MLE9BQUksT0FBSyxJQUFMLENBTkM7QUFPTCxVQUFNLE9BQUssU0FBUyxJQUFULENBQWMsT0FBTyxrQkFBUCxFQUFkLENBQUwsRUFBZ0Q7QUFDM0QsUUFBSSxXQUFRLEtBQUssbUJBQUwsQ0FBeUIsSUFBekIsQ0FBUixDQUR1RDtBQUVsRCxhQUFTLElBQVQsQ0FBYyxRQUFkLEVBRmtEO0FBR2xELFdBQU8sY0FBUCxDQUFzQixRQUF0QixFQUhrRDtJQUF0RDtBQUtOLFVBQU8sZ0JBQVAsQ0FBd0IsSUFBeEIsRUFaVzs7OztzQ0FlUSxPQUFNO3VCQUNYLEtBQUssWUFBTCxHQURXOztPQUNsQiw0QkFEa0I7O0FBRXpCLE9BQUcsS0FBSCxFQUNDLE1BQU0sSUFBTixHQUFXLEtBQVgsQ0FERDtPQUVPLFFBQStCLE1BQS9CLE1BSmtCO09BSVgsU0FBd0IsTUFBeEIsT0FKVztPQUlILE1BQWdCLE1BQWhCLElBSkc7O09BSUssa0NBQVEsbUNBSmI7O0FBS3pCLFVBQU87QUFBQyxTQUFEO01BQU8sT0FBTyxLQUFQLEVBQWMsUUFBUSxNQUFSLEVBQXJCO0lBQXFDLG1EQUFVLFNBQU8sT0FBTyxFQUFDLFlBQVcsS0FBWCxFQUFSLEdBQWpCLENBQXJDO0lBQVAsQ0FMeUI7Ozs7aUNBU1o7T0FDTixRQUFPLEtBQUssT0FBTCxDQUFQLE1BRE07O0FBRWIsVUFBTyxLQUFQLENBRmE7Ozs7UUEzQk07OztLQUNiLGNBQVk7QUFEQyxLQWdDYixlQUFhLE9BQU8sTUFBUCxDQUFjO0FBQ2pDLFFBQU8saUJBQVUsTUFBVjtDQURZLEVBRWpCLGFBQVEsWUFBUjtBQWxDaUIsS0FvQ2I7a0JBcENhIiwiZmlsZSI6InRleHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtOb0NoaWxkfSBmcm9tIFwiLi9hbnlcIlxyXG5pbXBvcnQgSHRtbFdvcmRXcmFwcGVyIGZyb20gXCIuLi93b3Jkd3JhcC9odG1sXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRleHQgZXh0ZW5kcyBOb0NoaWxke1xyXG5cdHN0YXRpYyBkaXNwbGF5TmFtZT1cInRleHRcIlxyXG5cclxuICAgIGNvbXBvc2UoKXtcclxuXHRcdGNvbnN0IHtjb21wb3NlZH09dGhpc1xyXG4gICAgICAgIGNvbnN0IHtwYXJlbnR9PXRoaXMuY29udGV4dFxyXG5cdFx0Y29uc3Qge2NvbnRlbnR9PXRoaXMuc3RhdGVcclxuXHRcdGxldCBzdHlsZT10aGlzLmdldEZvbnRTdHlsZSgpXHJcbiAgICAgICAgbGV0IGNvbXBvc2VyPW5ldyB0aGlzLmNvbnN0cnVjdG9yLldvcmRXcmFwcGVyKGNvbnRlbnQsIHN0eWxlKVxyXG4gICAgICAgIGxldCB0ZXh0PW51bGxcclxuICAgICAgICB3aGlsZSh0ZXh0PWNvbXBvc2VyLm5leHQocGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZSgpKSl7XHJcblx0XHRcdGxldCBjb250ZW50PXRoaXMuY3JlYXRlQ29tcG9zZWRQaWVjZSh0ZXh0KVxyXG4gICAgICAgICAgICBjb21wb3NlZC5wdXNoKGNvbnRlbnQpXHJcbiAgICAgICAgICAgIHBhcmVudC5hcHBlbmRDb21wb3NlZChjb250ZW50KVxyXG4gICAgICAgIH1cclxuXHRcdHBhcmVudC5vbjFDaGlsZENvbXBvc2VkKHRoaXMpXHJcbiAgICB9XHJcblxyXG5cdGNyZWF0ZUNvbXBvc2VkUGllY2UocHJvcHMpe1xyXG5cdFx0Y29uc3Qge2NvbG9yfT10aGlzLmdldEZvbnRTdHlsZSgpXHJcblx0XHRpZihjb2xvcilcclxuXHRcdFx0cHJvcHMuZmlsbD1jb2xvclxyXG5cdFx0Y29uc3Qge3dpZHRoLCBoZWlnaHQsIGVuZCwgLi4ub3RoZXJzfT1wcm9wc1xyXG5cdFx0cmV0dXJuIDxHcm91cCB3aWR0aD17d2lkdGh9IGhlaWdodD17aGVpZ2h0fT48dGV4dCB7Li4ucHJvcHN9IHN0eWxlPXt7d2hpdGVTcGFjZTpcInByZVwifX0vPjwvR3JvdXA+XHJcblx0fVxyXG5cclxuXHJcblx0Z2V0Rm9udFN0eWxlKCl7XHJcblx0XHRjb25zdCB7c3R5bGV9PXRoaXMuY29udGV4dFxyXG5cdFx0cmV0dXJuIHN0eWxlXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgY29udGV4dFR5cGVzPU9iamVjdC5hc3NpZ24oe1xyXG5cdFx0c3R5bGU6IFByb3BUeXBlcy5vYmplY3RcclxuXHR9LCBOb0NoaWxkLmNvbnRleHRUeXBlcylcclxuXHJcblx0c3RhdGljIFdvcmRXcmFwcGVyPUh0bWxXb3JkV3JhcHBlclxyXG59XHJcbiJdfQ==