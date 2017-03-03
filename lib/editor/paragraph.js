"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require("babel-runtime/helpers/get");

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _immutable = require("immutable");

var _immutable2 = _interopRequireDefault(_immutable);

var _group = require("../composed/group");

var _group2 = _interopRequireDefault(_group);

var _content = require("../content");

var _editable2 = require("./editable");

var _editable3 = _interopRequireDefault(_editable2);

var _inline = require("./inline");

var _inline2 = _interopRequireDefault(_inline);

var _text = require("./text");

var _text2 = _interopRequireDefault(_text);

var _uuid = require("../tools/uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_editable) {
	(0, _inherits3.default)(_class, _editable);

	function _class() {
		(0, _classCallCheck3.default)(this, _class);
		return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));
	}

	(0, _createClass3.default)(_class, [{
		key: "emptyContent",
		value: function emptyContent() {
			return [_react2.default.createElement(
				_inline2.default,
				{ key: (0, _uuid.uuid)() },
				_react2.default.createElement(
					_text2.default,
					{ key: (0, _uuid.uuid)() },
					" "
				)
			)];
		}
	}, {
		key: "createComposed2Parent",
		value: function createComposed2Parent(props) {
			var line = (0, _get3.default)(_class.prototype.__proto__ || (0, _getPrototypeOf2.default)(_class.prototype), "createComposed2Parent", this).apply(this, arguments);
			var _line$props = line.props,
			    width = _line$props.width,
			    height = _line$props.height;

			var ps = { width: width, height: height };
			if (this.computed.composed.length == 1) ps.id = this.id;
			return _react2.default.createElement(
				_group2.default,
				ps,
				line
			);
		}
	}, {
		key: "_isLastComposedFitIntoParent",
		value: function _isLastComposedFitIntoParent() {
			return true;
		}

		/**
   *  isAllChildrenComposed will affect last line height, so here we need make it right
   */

	}, {
		key: "appendLastComposed",
		value: function appendLastComposed() {
			var _this2 = this;

			var children = this.computed.children;
			this.computed.children = []; //make isAllChildrenComposed right
			var len = this.computed.lastComposed.length;
			this.computed.lastComposed.forEach(function (one, i) {
				_this2.computed.composed.push(one);
				if (i == len - 1) {
					//make isAllChildrenComposed right
					_this2.computed.children = children;
				}
				_this2.context.parent.appendComposed(_this2.createComposed2Parent(one));
			});
			this.context.parent.on1ChildComposed(this);
			this.computed.lastComposed = null;
		}
	}]);
	return _class;
}((0, _editable3.default)(_content.Paragraph));

exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvcGFyYWdyYXBoLmpzIl0sIm5hbWVzIjpbInByb3BzIiwibGluZSIsImFyZ3VtZW50cyIsIndpZHRoIiwiaGVpZ2h0IiwicHMiLCJjb21wdXRlZCIsImNvbXBvc2VkIiwibGVuZ3RoIiwiaWQiLCJjaGlsZHJlbiIsImxlbiIsImxhc3RDb21wb3NlZCIsImZvckVhY2giLCJvbmUiLCJpIiwicHVzaCIsImNvbnRleHQiLCJwYXJlbnQiLCJhcHBlbmRDb21wb3NlZCIsImNyZWF0ZUNvbXBvc2VkMlBhcmVudCIsIm9uMUNoaWxkQ29tcG9zZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUVBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7OztpQ0FJZTtBQUNiLFVBQU8sQ0FBQztBQUFBO0FBQUEsTUFBUSxLQUFLLGlCQUFiO0FBQXFCO0FBQUE7QUFBQSxPQUFNLEtBQUssaUJBQVg7QUFBQTtBQUFBO0FBQXJCLElBQUQsQ0FBUDtBQUNBOzs7d0NBRXFCQSxLLEVBQU07QUFDM0IsT0FBSUMsb0pBQW9DQyxTQUFwQyxDQUFKO0FBRDJCLHFCQUVSRCxLQUFLRCxLQUZHO0FBQUEsT0FFdEJHLEtBRnNCLGVBRXRCQSxLQUZzQjtBQUFBLE9BRWhCQyxNQUZnQixlQUVoQkEsTUFGZ0I7O0FBRzNCLE9BQUlDLEtBQUcsRUFBQ0YsWUFBRCxFQUFPQyxjQUFQLEVBQVA7QUFDQSxPQUFHLEtBQUtFLFFBQUwsQ0FBY0MsUUFBZCxDQUF1QkMsTUFBdkIsSUFBK0IsQ0FBbEMsRUFDQ0gsR0FBR0ksRUFBSCxHQUFNLEtBQUtBLEVBQVg7QUFDRCxVQUFPO0FBQUE7QUFBV0osTUFBWDtBQUFnQko7QUFBaEIsSUFBUDtBQUNBOzs7aURBRTZCO0FBQzdCLFVBQU8sSUFBUDtBQUNBOztBQUVEOzs7Ozs7dUNBR29CO0FBQUE7O0FBQ25CLE9BQUlTLFdBQVMsS0FBS0osUUFBTCxDQUFjSSxRQUEzQjtBQUNBLFFBQUtKLFFBQUwsQ0FBY0ksUUFBZCxHQUF1QixFQUF2QixDQUZtQixDQUVNO0FBQ3pCLE9BQUlDLE1BQUksS0FBS0wsUUFBTCxDQUFjTSxZQUFkLENBQTJCSixNQUFuQztBQUNBLFFBQUtGLFFBQUwsQ0FBY00sWUFBZCxDQUEyQkMsT0FBM0IsQ0FBbUMsVUFBQ0MsR0FBRCxFQUFLQyxDQUFMLEVBQVM7QUFDM0MsV0FBS1QsUUFBTCxDQUFjQyxRQUFkLENBQXVCUyxJQUF2QixDQUE0QkYsR0FBNUI7QUFDQSxRQUFHQyxLQUFHSixNQUFJLENBQVYsRUFBWTtBQUFDO0FBQ1osWUFBS0wsUUFBTCxDQUFjSSxRQUFkLEdBQXVCQSxRQUF2QjtBQUNBO0FBQ0QsV0FBS08sT0FBTCxDQUFhQyxNQUFiLENBQW9CQyxjQUFwQixDQUFtQyxPQUFLQyxxQkFBTCxDQUEyQk4sR0FBM0IsQ0FBbkM7QUFDQSxJQU5EO0FBT0EsUUFBS0csT0FBTCxDQUFhQyxNQUFiLENBQW9CRyxnQkFBcEIsQ0FBcUMsSUFBckM7QUFDQSxRQUFLZixRQUFMLENBQWNNLFlBQWQsR0FBMkIsSUFBM0I7QUFDQTs7O0VBbEMyQiwyQyIsImZpbGUiOiJwYXJhZ3JhcGguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3Qse1Byb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IEltbXV0YWJsZSBmcm9tIFwiaW1tdXRhYmxlXCJcclxuXHJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZWQvZ3JvdXBcIlxyXG5cclxuaW1wb3J0IHtQYXJhZ3JhcGh9IGZyb20gXCIuLi9jb250ZW50XCJcclxuaW1wb3J0IGVkaXRhYmxlIGZyb20gXCIuL2VkaXRhYmxlXCJcclxuaW1wb3J0IElubGluZSBmcm9tIFwiLi9pbmxpbmVcIlxyXG5pbXBvcnQgVGV4dCBmcm9tIFwiLi90ZXh0XCJcclxuXHJcbmltcG9ydCB7dXVpZH0gZnJvbSBcIi4uL3Rvb2xzL3V1aWRcIlxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgZWRpdGFibGUoUGFyYWdyYXBoKXtcclxuXHRlbXB0eUNvbnRlbnQoKXtcclxuXHRcdHJldHVybiBbPElubGluZSBrZXk9e3V1aWQoKX0+PFRleHQga2V5PXt1dWlkKCl9PiA8L1RleHQ+PC9JbmxpbmU+XVxyXG5cdH1cclxuXHJcblx0Y3JlYXRlQ29tcG9zZWQyUGFyZW50KHByb3BzKXtcclxuXHRcdGxldCBsaW5lPXN1cGVyLmNyZWF0ZUNvbXBvc2VkMlBhcmVudCguLi5hcmd1bWVudHMpXHJcblx0XHRsZXQge3dpZHRoLGhlaWdodH09bGluZS5wcm9wc1xyXG5cdFx0bGV0IHBzPXt3aWR0aCxoZWlnaHR9XHJcblx0XHRpZih0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLmxlbmd0aD09MSlcclxuXHRcdFx0cHMuaWQ9dGhpcy5pZFxyXG5cdFx0cmV0dXJuIDxHcm91cCB7Li4ucHN9PntsaW5lfTwvR3JvdXA+XHJcblx0fVxyXG5cclxuXHRfaXNMYXN0Q29tcG9zZWRGaXRJbnRvUGFyZW50KCl7XHJcblx0XHRyZXR1cm4gdHJ1ZVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogIGlzQWxsQ2hpbGRyZW5Db21wb3NlZCB3aWxsIGFmZmVjdCBsYXN0IGxpbmUgaGVpZ2h0LCBzbyBoZXJlIHdlIG5lZWQgbWFrZSBpdCByaWdodFxyXG5cdCAqL1xyXG5cdGFwcGVuZExhc3RDb21wb3NlZCgpe1xyXG5cdFx0bGV0IGNoaWxkcmVuPXRoaXMuY29tcHV0ZWQuY2hpbGRyZW5cclxuXHRcdHRoaXMuY29tcHV0ZWQuY2hpbGRyZW49W10vL21ha2UgaXNBbGxDaGlsZHJlbkNvbXBvc2VkIHJpZ2h0XHJcblx0XHRsZXQgbGVuPXRoaXMuY29tcHV0ZWQubGFzdENvbXBvc2VkLmxlbmd0aFxyXG5cdFx0dGhpcy5jb21wdXRlZC5sYXN0Q29tcG9zZWQuZm9yRWFjaCgob25lLGkpPT57XHJcblx0XHRcdHRoaXMuY29tcHV0ZWQuY29tcG9zZWQucHVzaChvbmUpXHJcblx0XHRcdGlmKGk9PWxlbi0xKXsvL21ha2UgaXNBbGxDaGlsZHJlbkNvbXBvc2VkIHJpZ2h0XHJcblx0XHRcdFx0dGhpcy5jb21wdXRlZC5jaGlsZHJlbj1jaGlsZHJlblxyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuY29udGV4dC5wYXJlbnQuYXBwZW5kQ29tcG9zZWQodGhpcy5jcmVhdGVDb21wb3NlZDJQYXJlbnQob25lKSlcclxuXHRcdH0pXHJcblx0XHR0aGlzLmNvbnRleHQucGFyZW50Lm9uMUNoaWxkQ29tcG9zZWQodGhpcylcclxuXHRcdHRoaXMuY29tcHV0ZWQubGFzdENvbXBvc2VkPW51bGxcclxuXHR9XHJcbn1cclxuIl19