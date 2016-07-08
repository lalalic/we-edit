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
			var parent = this.context.parent;
			var style = parent.props.contentStyle.inline;
			var toggleStyles = this.context.toggleStyles;
			//@TODO: need merge direct style and toggle style

			return style;
		}
	}]);

	return Text;
}(_any.NoChild);

Text.displayName = "text";
Text.contextTypes = Object.assign({
	toggleStyles: _react.PropTypes.object
}, _any.NoChild.contextTypes);
Text.WordWrapper = _html2.default;
exports.default = Text;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3RleHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7Ozs0QkFHUjtPQUNKLFdBQVUsS0FBVixTQURJO09BRUUsU0FBUSxLQUFLLE9BQUwsQ0FBUixPQUZGO09BR0osVUFBUyxLQUFLLEtBQUwsQ0FBVCxRQUhJOztBQUlYLE9BQUksUUFBTSxLQUFLLFlBQUwsRUFBTixDQUpPO0FBS0wsT0FBSSxXQUFTLElBQUksS0FBSyxXQUFMLENBQWlCLFdBQWpCLENBQTZCLE9BQWpDLEVBQTBDLEtBQTFDLENBQVQsQ0FMQztBQU1MLE9BQUksT0FBSyxJQUFMLENBTkM7QUFPTCxVQUFNLE9BQUssU0FBUyxJQUFULENBQWMsT0FBTyxrQkFBUCxFQUFkLENBQUwsRUFBZ0Q7QUFDM0QsUUFBSSxXQUFRLEtBQUssbUJBQUwsQ0FBeUIsSUFBekIsQ0FBUixDQUR1RDtBQUVsRCxhQUFTLElBQVQsQ0FBYyxRQUFkLEVBRmtEO0FBR2xELFdBQU8sY0FBUCxDQUFzQixRQUF0QixFQUhrRDtJQUF0RDtBQUtOLFVBQU8sZ0JBQVAsQ0FBd0IsSUFBeEIsRUFaVzs7OztzQ0FlUSxPQUFNO3VCQUNYLEtBQUssWUFBTCxHQURXOztPQUNsQiw0QkFEa0I7O0FBRXpCLE9BQUcsS0FBSCxFQUNDLE1BQU0sSUFBTixHQUFXLEtBQVgsQ0FERDtPQUVPLFFBQStCLE1BQS9CLE1BSmtCO09BSVgsU0FBd0IsTUFBeEIsT0FKVztPQUlILE1BQWdCLE1BQWhCLElBSkc7O09BSUssa0NBQVEsbUNBSmI7O0FBS3pCLFVBQU87QUFBQyxTQUFEO01BQU8sT0FBTyxLQUFQLEVBQWMsUUFBUSxNQUFSLEVBQXJCO0lBQXFDLG1EQUFVLFNBQU8sT0FBTyxFQUFDLFlBQVcsS0FBWCxFQUFSLEdBQWpCLENBQXJDO0lBQVAsQ0FMeUI7Ozs7aUNBU1o7T0FDTixTQUFRLEtBQUssT0FBTCxDQUFSLE9BRE07T0FFRSxRQUFPLE9BQU8sS0FBUCxDQUFhLFlBQWIsQ0FBZixPQUZNO09BR04sZUFBYyxLQUFLLE9BQUwsQ0FBZDs7QUFITTtBQUtiLFVBQU8sS0FBUCxDQUxhOzs7O1FBM0JNOzs7S0FDYixjQUFZO0FBREMsS0FtQ2IsZUFBYSxPQUFPLE1BQVAsQ0FBYztBQUNqQyxlQUFjLGlCQUFVLE1BQVY7Q0FESyxFQUVqQixhQUFRLFlBQVI7QUFyQ2lCLEtBdUNiO2tCQXZDYSIsImZpbGUiOiJ0ZXh0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7Tm9DaGlsZH0gZnJvbSBcIi4vYW55XCJcclxuaW1wb3J0IEh0bWxXb3JkV3JhcHBlciBmcm9tIFwiLi4vd29yZHdyYXAvaHRtbFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXh0IGV4dGVuZHMgTm9DaGlsZHtcclxuXHRzdGF0aWMgZGlzcGxheU5hbWU9XCJ0ZXh0XCJcclxuXHJcbiAgICBjb21wb3NlKCl7XHJcblx0XHRjb25zdCB7Y29tcG9zZWR9PXRoaXNcclxuICAgICAgICBjb25zdCB7cGFyZW50fT10aGlzLmNvbnRleHRcclxuXHRcdGNvbnN0IHtjb250ZW50fT10aGlzLnN0YXRlXHJcblx0XHRsZXQgc3R5bGU9dGhpcy5nZXRGb250U3R5bGUoKVxyXG4gICAgICAgIGxldCBjb21wb3Nlcj1uZXcgdGhpcy5jb25zdHJ1Y3Rvci5Xb3JkV3JhcHBlcihjb250ZW50LCBzdHlsZSlcclxuICAgICAgICBsZXQgdGV4dD1udWxsXHJcbiAgICAgICAgd2hpbGUodGV4dD1jb21wb3Nlci5uZXh0KHBhcmVudC5uZXh0QXZhaWxhYmxlU3BhY2UoKSkpe1xyXG5cdFx0XHRsZXQgY29udGVudD10aGlzLmNyZWF0ZUNvbXBvc2VkUGllY2UodGV4dClcclxuICAgICAgICAgICAgY29tcG9zZWQucHVzaChjb250ZW50KVxyXG4gICAgICAgICAgICBwYXJlbnQuYXBwZW5kQ29tcG9zZWQoY29udGVudClcclxuICAgICAgICB9XHJcblx0XHRwYXJlbnQub24xQ2hpbGRDb21wb3NlZCh0aGlzKVxyXG4gICAgfVxyXG5cclxuXHRjcmVhdGVDb21wb3NlZFBpZWNlKHByb3BzKXtcclxuXHRcdGNvbnN0IHtjb2xvcn09dGhpcy5nZXRGb250U3R5bGUoKVxyXG5cdFx0aWYoY29sb3IpXHJcblx0XHRcdHByb3BzLmZpbGw9Y29sb3JcclxuXHRcdGNvbnN0IHt3aWR0aCwgaGVpZ2h0LCBlbmQsIC4uLm90aGVyc309cHJvcHNcclxuXHRcdHJldHVybiA8R3JvdXAgd2lkdGg9e3dpZHRofSBoZWlnaHQ9e2hlaWdodH0+PHRleHQgey4uLnByb3BzfSBzdHlsZT17e3doaXRlU3BhY2U6XCJwcmVcIn19Lz48L0dyb3VwPlxyXG5cdH1cclxuXHJcblxyXG5cdGdldEZvbnRTdHlsZSgpe1xyXG5cdFx0Y29uc3Qge3BhcmVudH09dGhpcy5jb250ZXh0XHJcblx0XHRjb25zdCB7aW5saW5lOiBzdHlsZX09cGFyZW50LnByb3BzLmNvbnRlbnRTdHlsZVxyXG5cdFx0Y29uc3Qge3RvZ2dsZVN0eWxlc309dGhpcy5jb250ZXh0XHJcblx0XHQvL0BUT0RPOiBuZWVkIG1lcmdlIGRpcmVjdCBzdHlsZSBhbmQgdG9nZ2xlIHN0eWxlXHJcblx0XHRyZXR1cm4gc3R5bGVcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9T2JqZWN0LmFzc2lnbih7XHJcblx0XHR0b2dnbGVTdHlsZXM6IFByb3BUeXBlcy5vYmplY3RcclxuXHR9LCBOb0NoaWxkLmNvbnRleHRUeXBlcylcclxuXHJcblx0c3RhdGljIFdvcmRXcmFwcGVyPUh0bWxXb3JkV3JhcHBlclxyXG59XHJcbiJdfQ==