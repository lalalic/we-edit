"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _any = require("./any");

var _html = require("../wordwrap/html");

var _html2 = _interopRequireDefault(_html);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
			this._startComposeAt = Date.now();
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

			return _react2.default.createElement("text", props);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3RleHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7Ozs7O2dNQUNwQixjQUFZOzs7Y0FEUTs7NEJBR1I7QUFDWCxRQUFLLGVBQUwsR0FBcUIsS0FBSyxHQUFMLEVBQXJCLENBRFc7T0FFSixXQUFVLEtBQVYsU0FGSTtPQUdFLFNBQVEsS0FBSyxPQUFMLENBQVIsT0FIRjtPQUlKLFVBQVMsS0FBSyxLQUFMLENBQVQsUUFKSTs7QUFLWCxPQUFJLFFBQU0sS0FBSyxZQUFMLEVBQU4sQ0FMTztBQU1MLE9BQUksV0FBUyxJQUFJLEtBQUssV0FBTCxDQUFpQixXQUFqQixDQUE2QixPQUFqQyxFQUEwQyxLQUExQyxDQUFULENBTkM7QUFPTCxPQUFJLE9BQUssSUFBTCxDQVBDO0FBUUwsVUFBTSxPQUFLLFNBQVMsSUFBVCxDQUFjLE9BQU8sa0JBQVAsRUFBZCxDQUFMLEVBQWdEO0FBQzNELFFBQUksV0FBUSxLQUFLLG1CQUFMLENBQXlCLElBQXpCLENBQVIsQ0FEdUQ7QUFFbEQsYUFBUyxJQUFULENBQWMsUUFBZCxFQUZrRDtBQUdsRCxXQUFPLGNBQVAsQ0FBc0IsUUFBdEIsRUFIa0Q7SUFBdEQ7QUFLTixVQUFPLGdCQUFQLENBQXdCLElBQXhCLEVBYlc7Ozs7c0NBZ0JRLE9BQU07dUJBQ1gsS0FBSyxZQUFMLEdBRFc7O09BQ2xCLDRCQURrQjs7QUFFekIsT0FBRyxLQUFILEVBQ0MsTUFBTSxJQUFOLEdBQVcsS0FBWCxDQUREOztBQUdBLFVBQU8sc0NBQVUsS0FBVixDQUFQLENBTHlCOzs7O2lDQVNaO09BQ04sU0FBUSxLQUFLLE9BQUwsQ0FBUixPQURNO09BRUUsUUFBTyxPQUFPLEtBQVAsQ0FBYSxZQUFiLENBQWYsT0FGTTtPQUdOLGVBQWMsS0FBSyxPQUFMLENBQWQ7O0FBSE07QUFLYixVQUFPLEtBQVAsQ0FMYTs7OztRQTVCTTs7O0tBb0NiLGVBQWEsT0FBTyxNQUFQLENBQWM7QUFDakMsZUFBYyxpQkFBVSxNQUFWO0NBREssRUFFakIsYUFBUSxZQUFSO0FBdENpQixLQXdDYjtrQkF4Q2EiLCJmaWxlIjoidGV4dC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge05vQ2hpbGR9IGZyb20gXCIuL2FueVwiXHJcbmltcG9ydCBIdG1sV29yZFdyYXBwZXIgZnJvbSBcIi4uL3dvcmR3cmFwL2h0bWxcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dCBleHRlbmRzIE5vQ2hpbGR7XHJcblx0ZGlzcGxheU5hbWU9XCJ0ZXh0XCJcclxuXHJcbiAgICBjb21wb3NlKCl7XHJcblx0XHR0aGlzLl9zdGFydENvbXBvc2VBdD1EYXRlLm5vdygpXHJcblx0XHRjb25zdCB7Y29tcG9zZWR9PXRoaXNcclxuICAgICAgICBjb25zdCB7cGFyZW50fT10aGlzLmNvbnRleHRcclxuXHRcdGNvbnN0IHtjb250ZW50fT10aGlzLnN0YXRlXHJcblx0XHRsZXQgc3R5bGU9dGhpcy5nZXRGb250U3R5bGUoKVxyXG4gICAgICAgIGxldCBjb21wb3Nlcj1uZXcgdGhpcy5jb25zdHJ1Y3Rvci5Xb3JkV3JhcHBlcihjb250ZW50LCBzdHlsZSlcclxuICAgICAgICBsZXQgdGV4dD1udWxsXHJcbiAgICAgICAgd2hpbGUodGV4dD1jb21wb3Nlci5uZXh0KHBhcmVudC5uZXh0QXZhaWxhYmxlU3BhY2UoKSkpe1xyXG5cdFx0XHRsZXQgY29udGVudD10aGlzLmNyZWF0ZUNvbXBvc2VkUGllY2UodGV4dClcclxuICAgICAgICAgICAgY29tcG9zZWQucHVzaChjb250ZW50KVxyXG4gICAgICAgICAgICBwYXJlbnQuYXBwZW5kQ29tcG9zZWQoY29udGVudClcclxuICAgICAgICB9XHJcblx0XHRwYXJlbnQub24xQ2hpbGRDb21wb3NlZCh0aGlzKVxyXG4gICAgfVxyXG5cclxuXHRjcmVhdGVDb21wb3NlZFBpZWNlKHByb3BzKXtcclxuXHRcdGNvbnN0IHtjb2xvcn09dGhpcy5nZXRGb250U3R5bGUoKVxyXG5cdFx0aWYoY29sb3IpXHJcblx0XHRcdHByb3BzLmZpbGw9Y29sb3JcclxuXHRcdFxyXG5cdFx0cmV0dXJuIDx0ZXh0IHsuLi5wcm9wc30vPlxyXG5cdH1cclxuXHRcclxuXHRcclxuXHRnZXRGb250U3R5bGUoKXtcclxuXHRcdGNvbnN0IHtwYXJlbnR9PXRoaXMuY29udGV4dFxyXG5cdFx0Y29uc3Qge2lubGluZTogc3R5bGV9PXBhcmVudC5wcm9wcy5jb250ZW50U3R5bGVcclxuXHRcdGNvbnN0IHt0b2dnbGVTdHlsZXN9PXRoaXMuY29udGV4dFxyXG5cdFx0Ly9AVE9ETzogbmVlZCBtZXJnZSBkaXJlY3Qgc3R5bGUgYW5kIHRvZ2dsZSBzdHlsZVxyXG5cdFx0cmV0dXJuIHN0eWxlXHJcblx0fVxyXG5cdFxyXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9T2JqZWN0LmFzc2lnbih7XHJcblx0XHR0b2dnbGVTdHlsZXM6IFByb3BUeXBlcy5vYmplY3RcclxuXHR9LCBOb0NoaWxkLmNvbnRleHRUeXBlcylcclxuXHJcblx0c3RhdGljIFdvcmRXcmFwcGVyPUh0bWxXb3JkV3JhcHBlclxyXG59XHJcbiJdfQ==