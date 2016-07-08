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
		var _Object$getPrototypeO;

		var _temp, _this, _ret;

		_classCallCheck(this, Text);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Text)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.displayName = "text", _temp), _possibleConstructorReturn(_this, _ret);
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
			var parent = this.context.parent;
			var style = parent.props.contentStyle.inline;
			var toggleStyles = this.context.toggleStyles;
			//@TODO: need merge direct style and toggle style

			return style;
		}
	}]);

	return Text;
}(_any.NoChild);

Text.contextTypes = Object.assign({
	toggleStyles: _react.PropTypes.object
}, _any.NoChild.contextTypes);
Text.WordWrapper = _html2.default;
exports.default = Text;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3RleHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7Ozs7OztnTUFDcEIsY0FBWTs7O2NBRFE7OzRCQUdSO09BQ0osV0FBVSxLQUFWLFNBREk7T0FFRSxTQUFRLEtBQUssT0FBTCxDQUFSLE9BRkY7T0FHSixVQUFTLEtBQUssS0FBTCxDQUFULFFBSEk7O0FBSVgsT0FBSSxRQUFNLEtBQUssWUFBTCxFQUFOLENBSk87QUFLTCxPQUFJLFdBQVMsSUFBSSxLQUFLLFdBQUwsQ0FBaUIsV0FBakIsQ0FBNkIsT0FBakMsRUFBMEMsS0FBMUMsQ0FBVCxDQUxDO0FBTUwsT0FBSSxPQUFLLElBQUwsQ0FOQztBQU9MLFVBQU0sT0FBSyxTQUFTLElBQVQsQ0FBYyxPQUFPLGtCQUFQLEVBQWQsQ0FBTCxFQUFnRDtBQUMzRCxRQUFJLFdBQVEsS0FBSyxtQkFBTCxDQUF5QixJQUF6QixDQUFSLENBRHVEO0FBRWxELGFBQVMsSUFBVCxDQUFjLFFBQWQsRUFGa0Q7QUFHbEQsV0FBTyxjQUFQLENBQXNCLFFBQXRCLEVBSGtEO0lBQXREO0FBS04sVUFBTyxnQkFBUCxDQUF3QixJQUF4QixFQVpXOzs7O3NDQWVRLE9BQU07dUJBQ1gsS0FBSyxZQUFMLEdBRFc7O09BQ2xCLDRCQURrQjs7QUFFekIsT0FBRyxLQUFILEVBQ0MsTUFBTSxJQUFOLEdBQVcsS0FBWCxDQUREO09BRU8sUUFBK0IsTUFBL0IsTUFKa0I7T0FJWCxTQUF3QixNQUF4QixPQUpXO09BSUgsTUFBZ0IsTUFBaEIsSUFKRzs7T0FJSyxrQ0FBUSxtQ0FKYjs7QUFLekIsVUFBTztBQUFDLFNBQUQ7TUFBTyxPQUFPLEtBQVAsRUFBYyxRQUFRLE1BQVIsRUFBckI7SUFBcUMsbURBQVUsU0FBTyxPQUFPLEVBQUMsWUFBVyxLQUFYLEVBQVIsR0FBakIsQ0FBckM7SUFBUCxDQUx5Qjs7OztpQ0FTWjtPQUNOLFNBQVEsS0FBSyxPQUFMLENBQVIsT0FETTtPQUVFLFFBQU8sT0FBTyxLQUFQLENBQWEsWUFBYixDQUFmLE9BRk07T0FHTixlQUFjLEtBQUssT0FBTCxDQUFkOztBQUhNO0FBS2IsVUFBTyxLQUFQLENBTGE7Ozs7UUEzQk07OztLQW1DYixlQUFhLE9BQU8sTUFBUCxDQUFjO0FBQ2pDLGVBQWMsaUJBQVUsTUFBVjtDQURLLEVBRWpCLGFBQVEsWUFBUjtBQXJDaUIsS0F1Q2I7a0JBdkNhIiwiZmlsZSI6InRleHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtOb0NoaWxkfSBmcm9tIFwiLi9hbnlcIlxyXG5pbXBvcnQgSHRtbFdvcmRXcmFwcGVyIGZyb20gXCIuLi93b3Jkd3JhcC9odG1sXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRleHQgZXh0ZW5kcyBOb0NoaWxke1xyXG5cdGRpc3BsYXlOYW1lPVwidGV4dFwiXHJcblxyXG4gICAgY29tcG9zZSgpe1xyXG5cdFx0Y29uc3Qge2NvbXBvc2VkfT10aGlzXHJcbiAgICAgICAgY29uc3Qge3BhcmVudH09dGhpcy5jb250ZXh0XHJcblx0XHRjb25zdCB7Y29udGVudH09dGhpcy5zdGF0ZVxyXG5cdFx0bGV0IHN0eWxlPXRoaXMuZ2V0Rm9udFN0eWxlKClcclxuICAgICAgICBsZXQgY29tcG9zZXI9bmV3IHRoaXMuY29uc3RydWN0b3IuV29yZFdyYXBwZXIoY29udGVudCwgc3R5bGUpXHJcbiAgICAgICAgbGV0IHRleHQ9bnVsbFxyXG4gICAgICAgIHdoaWxlKHRleHQ9Y29tcG9zZXIubmV4dChwYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKCkpKXtcclxuXHRcdFx0bGV0IGNvbnRlbnQ9dGhpcy5jcmVhdGVDb21wb3NlZFBpZWNlKHRleHQpXHJcbiAgICAgICAgICAgIGNvbXBvc2VkLnB1c2goY29udGVudClcclxuICAgICAgICAgICAgcGFyZW50LmFwcGVuZENvbXBvc2VkKGNvbnRlbnQpXHJcbiAgICAgICAgfVxyXG5cdFx0cGFyZW50Lm9uMUNoaWxkQ29tcG9zZWQodGhpcylcclxuICAgIH1cclxuXHJcblx0Y3JlYXRlQ29tcG9zZWRQaWVjZShwcm9wcyl7XHJcblx0XHRjb25zdCB7Y29sb3J9PXRoaXMuZ2V0Rm9udFN0eWxlKClcclxuXHRcdGlmKGNvbG9yKVxyXG5cdFx0XHRwcm9wcy5maWxsPWNvbG9yXHJcblx0XHRjb25zdCB7d2lkdGgsIGhlaWdodCwgZW5kLCAuLi5vdGhlcnN9PXByb3BzXHJcblx0XHRyZXR1cm4gPEdyb3VwIHdpZHRoPXt3aWR0aH0gaGVpZ2h0PXtoZWlnaHR9Pjx0ZXh0IHsuLi5wcm9wc30gc3R5bGU9e3t3aGl0ZVNwYWNlOlwicHJlXCJ9fS8+PC9Hcm91cD5cclxuXHR9XHJcblx0XHJcblx0XHJcblx0Z2V0Rm9udFN0eWxlKCl7XHJcblx0XHRjb25zdCB7cGFyZW50fT10aGlzLmNvbnRleHRcclxuXHRcdGNvbnN0IHtpbmxpbmU6IHN0eWxlfT1wYXJlbnQucHJvcHMuY29udGVudFN0eWxlXHJcblx0XHRjb25zdCB7dG9nZ2xlU3R5bGVzfT10aGlzLmNvbnRleHRcclxuXHRcdC8vQFRPRE86IG5lZWQgbWVyZ2UgZGlyZWN0IHN0eWxlIGFuZCB0b2dnbGUgc3R5bGVcclxuXHRcdHJldHVybiBzdHlsZVxyXG5cdH1cclxuXHRcclxuXHRzdGF0aWMgY29udGV4dFR5cGVzPU9iamVjdC5hc3NpZ24oe1xyXG5cdFx0dG9nZ2xlU3R5bGVzOiBQcm9wVHlwZXMub2JqZWN0XHJcblx0fSwgTm9DaGlsZC5jb250ZXh0VHlwZXMpXHJcblxyXG5cdHN0YXRpYyBXb3JkV3JhcHBlcj1IdG1sV29yZFdyYXBwZXJcclxufVxyXG4iXX0=