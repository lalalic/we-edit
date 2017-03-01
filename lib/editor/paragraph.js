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

var _group = require("../composed/group");

var _group2 = _interopRequireDefault(_group);

var _content = require("../content");

var _editable2 = require("./editable");

var _editable3 = _interopRequireDefault(_editable2);

var _inline = require("./inline");

var _inline2 = _interopRequireDefault(_inline);

var _text = require("./text");

var _text2 = _interopRequireDefault(_text);

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
				null,
				_react2.default.createElement(
					_text2.default,
					null,
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
			if (this.computed.composed.length == 1) ps._id = this._id;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvcGFyYWdyYXBoLmpzIl0sIm5hbWVzIjpbInByb3BzIiwibGluZSIsImFyZ3VtZW50cyIsIndpZHRoIiwiaGVpZ2h0IiwicHMiLCJjb21wdXRlZCIsImNvbXBvc2VkIiwibGVuZ3RoIiwiX2lkIiwiY2hpbGRyZW4iLCJsZW4iLCJsYXN0Q29tcG9zZWQiLCJmb3JFYWNoIiwib25lIiwiaSIsInB1c2giLCJjb250ZXh0IiwicGFyZW50IiwiYXBwZW5kQ29tcG9zZWQiLCJjcmVhdGVDb21wb3NlZDJQYXJlbnQiLCJvbjFDaGlsZENvbXBvc2VkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUVBOzs7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O2lDQUllO0FBQ2IsVUFBTyxDQUFDO0FBQUE7QUFBQTtBQUFRO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBUixJQUFELENBQVA7QUFDQTs7O3dDQUVxQkEsSyxFQUFNO0FBQzNCLE9BQUlDLG9KQUFvQ0MsU0FBcEMsQ0FBSjtBQUQyQixxQkFFUkQsS0FBS0QsS0FGRztBQUFBLE9BRXRCRyxLQUZzQixlQUV0QkEsS0FGc0I7QUFBQSxPQUVoQkMsTUFGZ0IsZUFFaEJBLE1BRmdCOztBQUczQixPQUFJQyxLQUFHLEVBQUNGLFlBQUQsRUFBT0MsY0FBUCxFQUFQO0FBQ0EsT0FBRyxLQUFLRSxRQUFMLENBQWNDLFFBQWQsQ0FBdUJDLE1BQXZCLElBQStCLENBQWxDLEVBQ0NILEdBQUdJLEdBQUgsR0FBTyxLQUFLQSxHQUFaO0FBQ0QsVUFBTztBQUFBO0FBQVdKLE1BQVg7QUFBZ0JKO0FBQWhCLElBQVA7QUFDQTs7O2lEQUU2QjtBQUM3QixVQUFPLElBQVA7QUFDQTs7QUFFRDs7Ozs7O3VDQUdvQjtBQUFBOztBQUNuQixPQUFJUyxXQUFTLEtBQUtKLFFBQUwsQ0FBY0ksUUFBM0I7QUFDQSxRQUFLSixRQUFMLENBQWNJLFFBQWQsR0FBdUIsRUFBdkIsQ0FGbUIsQ0FFTTtBQUN6QixPQUFJQyxNQUFJLEtBQUtMLFFBQUwsQ0FBY00sWUFBZCxDQUEyQkosTUFBbkM7QUFDQSxRQUFLRixRQUFMLENBQWNNLFlBQWQsQ0FBMkJDLE9BQTNCLENBQW1DLFVBQUNDLEdBQUQsRUFBS0MsQ0FBTCxFQUFTO0FBQzNDLFdBQUtULFFBQUwsQ0FBY0MsUUFBZCxDQUF1QlMsSUFBdkIsQ0FBNEJGLEdBQTVCO0FBQ0EsUUFBR0MsS0FBR0osTUFBSSxDQUFWLEVBQVk7QUFBQztBQUNaLFlBQUtMLFFBQUwsQ0FBY0ksUUFBZCxHQUF1QkEsUUFBdkI7QUFDQTtBQUNELFdBQUtPLE9BQUwsQ0FBYUMsTUFBYixDQUFvQkMsY0FBcEIsQ0FBbUMsT0FBS0MscUJBQUwsQ0FBMkJOLEdBQTNCLENBQW5DO0FBQ0EsSUFORDtBQU9BLFFBQUtHLE9BQUwsQ0FBYUMsTUFBYixDQUFvQkcsZ0JBQXBCLENBQXFDLElBQXJDO0FBQ0EsUUFBS2YsUUFBTCxDQUFjTSxZQUFkLEdBQTJCLElBQTNCO0FBQ0E7OztFQWxDMkIsMkMiLCJmaWxlIjoicGFyYWdyYXBoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LHtQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcblxyXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcclxuXHJcbmltcG9ydCB7UGFyYWdyYXBofSBmcm9tIFwiLi4vY29udGVudFwiXHJcbmltcG9ydCBlZGl0YWJsZSBmcm9tIFwiLi9lZGl0YWJsZVwiXHJcbmltcG9ydCBJbmxpbmUgZnJvbSBcIi4vaW5saW5lXCJcclxuaW1wb3J0IFRleHQgZnJvbSBcIi4vdGV4dFwiXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBlZGl0YWJsZShQYXJhZ3JhcGgpe1xyXG5cdGVtcHR5Q29udGVudCgpe1xyXG5cdFx0cmV0dXJuIFs8SW5saW5lPjxUZXh0PiA8L1RleHQ+PC9JbmxpbmU+XVxyXG5cdH1cclxuXHJcblx0Y3JlYXRlQ29tcG9zZWQyUGFyZW50KHByb3BzKXtcclxuXHRcdGxldCBsaW5lPXN1cGVyLmNyZWF0ZUNvbXBvc2VkMlBhcmVudCguLi5hcmd1bWVudHMpXHJcblx0XHRsZXQge3dpZHRoLGhlaWdodH09bGluZS5wcm9wc1xyXG5cdFx0bGV0IHBzPXt3aWR0aCxoZWlnaHR9XHJcblx0XHRpZih0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLmxlbmd0aD09MSlcclxuXHRcdFx0cHMuX2lkPXRoaXMuX2lkXHJcblx0XHRyZXR1cm4gPEdyb3VwIHsuLi5wc30+e2xpbmV9PC9Hcm91cD5cclxuXHR9XHJcblxyXG5cdF9pc0xhc3RDb21wb3NlZEZpdEludG9QYXJlbnQoKXtcclxuXHRcdHJldHVybiB0cnVlXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiAgaXNBbGxDaGlsZHJlbkNvbXBvc2VkIHdpbGwgYWZmZWN0IGxhc3QgbGluZSBoZWlnaHQsIHNvIGhlcmUgd2UgbmVlZCBtYWtlIGl0IHJpZ2h0XHJcblx0ICovXHJcblx0YXBwZW5kTGFzdENvbXBvc2VkKCl7XHJcblx0XHRsZXQgY2hpbGRyZW49dGhpcy5jb21wdXRlZC5jaGlsZHJlblxyXG5cdFx0dGhpcy5jb21wdXRlZC5jaGlsZHJlbj1bXS8vbWFrZSBpc0FsbENoaWxkcmVuQ29tcG9zZWQgcmlnaHRcclxuXHRcdGxldCBsZW49dGhpcy5jb21wdXRlZC5sYXN0Q29tcG9zZWQubGVuZ3RoXHJcblx0XHR0aGlzLmNvbXB1dGVkLmxhc3RDb21wb3NlZC5mb3JFYWNoKChvbmUsaSk9PntcclxuXHRcdFx0dGhpcy5jb21wdXRlZC5jb21wb3NlZC5wdXNoKG9uZSlcclxuXHRcdFx0aWYoaT09bGVuLTEpey8vbWFrZSBpc0FsbENoaWxkcmVuQ29tcG9zZWQgcmlnaHRcclxuXHRcdFx0XHR0aGlzLmNvbXB1dGVkLmNoaWxkcmVuPWNoaWxkcmVuXHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5jb250ZXh0LnBhcmVudC5hcHBlbmRDb21wb3NlZCh0aGlzLmNyZWF0ZUNvbXBvc2VkMlBhcmVudChvbmUpKVxyXG5cdFx0fSlcclxuXHRcdHRoaXMuY29udGV4dC5wYXJlbnQub24xQ2hpbGRDb21wb3NlZCh0aGlzKVxyXG5cdFx0dGhpcy5jb21wdXRlZC5sYXN0Q29tcG9zZWQ9bnVsbFxyXG5cdH1cclxufVxyXG4iXX0=