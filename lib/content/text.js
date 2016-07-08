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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3RleHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7Ozs7O2dNQUNwQixjQUFZOzs7Y0FEUTs7NEJBR1I7T0FDSixXQUFVLEtBQVYsU0FESTtPQUVFLFNBQVEsS0FBSyxPQUFMLENBQVIsT0FGRjtPQUdKLFVBQVMsS0FBSyxLQUFMLENBQVQsUUFISTs7QUFJWCxPQUFJLFFBQU0sS0FBSyxZQUFMLEVBQU4sQ0FKTztBQUtMLE9BQUksV0FBUyxJQUFJLEtBQUssV0FBTCxDQUFpQixXQUFqQixDQUE2QixPQUFqQyxFQUEwQyxLQUExQyxDQUFULENBTEM7QUFNTCxPQUFJLE9BQUssSUFBTCxDQU5DO0FBT0wsVUFBTSxPQUFLLFNBQVMsSUFBVCxDQUFjLE9BQU8sa0JBQVAsRUFBZCxDQUFMLEVBQWdEO0FBQzNELFFBQUksV0FBUSxLQUFLLG1CQUFMLENBQXlCLElBQXpCLENBQVIsQ0FEdUQ7QUFFbEQsYUFBUyxJQUFULENBQWMsUUFBZCxFQUZrRDtBQUdsRCxXQUFPLGNBQVAsQ0FBc0IsUUFBdEIsRUFIa0Q7SUFBdEQ7QUFLTixVQUFPLGdCQUFQLENBQXdCLElBQXhCLEVBWlc7Ozs7c0NBZVEsT0FBTTt1QkFDWCxLQUFLLFlBQUwsR0FEVzs7T0FDbEIsNEJBRGtCOztBQUV6QixPQUFHLEtBQUgsRUFDQyxNQUFNLElBQU4sR0FBVyxLQUFYLENBREQ7O0FBR0EsVUFBTyxzQ0FBVSxLQUFWLENBQVAsQ0FMeUI7Ozs7aUNBU1o7T0FDTixTQUFRLEtBQUssT0FBTCxDQUFSLE9BRE07T0FFRSxRQUFPLE9BQU8sS0FBUCxDQUFhLFlBQWIsQ0FBZixPQUZNO09BR04sZUFBYyxLQUFLLE9BQUwsQ0FBZDs7QUFITTtBQUtiLFVBQU8sS0FBUCxDQUxhOzs7O1FBM0JNOzs7S0FtQ2IsZUFBYSxPQUFPLE1BQVAsQ0FBYztBQUNqQyxlQUFjLGlCQUFVLE1BQVY7Q0FESyxFQUVqQixhQUFRLFlBQVI7QUFyQ2lCLEtBdUNiO2tCQXZDYSIsImZpbGUiOiJ0ZXh0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7Tm9DaGlsZH0gZnJvbSBcIi4vYW55XCJcclxuaW1wb3J0IEh0bWxXb3JkV3JhcHBlciBmcm9tIFwiLi4vd29yZHdyYXAvaHRtbFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXh0IGV4dGVuZHMgTm9DaGlsZHtcclxuXHRkaXNwbGF5TmFtZT1cInRleHRcIlxyXG5cclxuICAgIGNvbXBvc2UoKXtcclxuXHRcdGNvbnN0IHtjb21wb3NlZH09dGhpc1xyXG4gICAgICAgIGNvbnN0IHtwYXJlbnR9PXRoaXMuY29udGV4dFxyXG5cdFx0Y29uc3Qge2NvbnRlbnR9PXRoaXMuc3RhdGVcclxuXHRcdGxldCBzdHlsZT10aGlzLmdldEZvbnRTdHlsZSgpXHJcbiAgICAgICAgbGV0IGNvbXBvc2VyPW5ldyB0aGlzLmNvbnN0cnVjdG9yLldvcmRXcmFwcGVyKGNvbnRlbnQsIHN0eWxlKVxyXG4gICAgICAgIGxldCB0ZXh0PW51bGxcclxuICAgICAgICB3aGlsZSh0ZXh0PWNvbXBvc2VyLm5leHQocGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZSgpKSl7XHJcblx0XHRcdGxldCBjb250ZW50PXRoaXMuY3JlYXRlQ29tcG9zZWRQaWVjZSh0ZXh0KVxyXG4gICAgICAgICAgICBjb21wb3NlZC5wdXNoKGNvbnRlbnQpXHJcbiAgICAgICAgICAgIHBhcmVudC5hcHBlbmRDb21wb3NlZChjb250ZW50KVxyXG4gICAgICAgIH1cclxuXHRcdHBhcmVudC5vbjFDaGlsZENvbXBvc2VkKHRoaXMpXHJcbiAgICB9XHJcblxyXG5cdGNyZWF0ZUNvbXBvc2VkUGllY2UocHJvcHMpe1xyXG5cdFx0Y29uc3Qge2NvbG9yfT10aGlzLmdldEZvbnRTdHlsZSgpXHJcblx0XHRpZihjb2xvcilcclxuXHRcdFx0cHJvcHMuZmlsbD1jb2xvclxyXG5cdFx0XHJcblx0XHRyZXR1cm4gPHRleHQgey4uLnByb3BzfS8+XHJcblx0fVxyXG5cdFxyXG5cdFxyXG5cdGdldEZvbnRTdHlsZSgpe1xyXG5cdFx0Y29uc3Qge3BhcmVudH09dGhpcy5jb250ZXh0XHJcblx0XHRjb25zdCB7aW5saW5lOiBzdHlsZX09cGFyZW50LnByb3BzLmNvbnRlbnRTdHlsZVxyXG5cdFx0Y29uc3Qge3RvZ2dsZVN0eWxlc309dGhpcy5jb250ZXh0XHJcblx0XHQvL0BUT0RPOiBuZWVkIG1lcmdlIGRpcmVjdCBzdHlsZSBhbmQgdG9nZ2xlIHN0eWxlXHJcblx0XHRyZXR1cm4gc3R5bGVcclxuXHR9XHJcblx0XHJcblx0c3RhdGljIGNvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcclxuXHRcdHRvZ2dsZVN0eWxlczogUHJvcFR5cGVzLm9iamVjdFxyXG5cdH0sIE5vQ2hpbGQuY29udGV4dFR5cGVzKVxyXG5cclxuXHRzdGF0aWMgV29yZFdyYXBwZXI9SHRtbFdvcmRXcmFwcGVyXHJcbn1cclxuIl19