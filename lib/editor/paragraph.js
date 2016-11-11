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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvcGFyYWdyYXBoLmpzIl0sIm5hbWVzIjpbInByb3BzIiwibGluZSIsImFyZ3VtZW50cyIsIndpZHRoIiwiaGVpZ2h0IiwicHMiLCJjb21wdXRlZCIsImNvbXBvc2VkIiwibGVuZ3RoIiwiX2lkIiwiY2hpbGRyZW4iLCJsZW4iLCJsYXN0Q29tcG9zZWQiLCJmb3JFYWNoIiwib25lIiwiaSIsInB1c2giLCJjb250ZXh0IiwicGFyZW50IiwiYXBwZW5kQ29tcG9zZWQiLCJjcmVhdGVDb21wb3NlZDJQYXJlbnQiLCJvbjFDaGlsZENvbXBvc2VkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7aUNBSWU7QUFDYixVQUFPLENBQUM7QUFBQTtBQUFBO0FBQVE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFSLElBQUQsQ0FBUDtBQUNBOzs7d0NBRXFCQSxLLEVBQU07QUFDM0IsT0FBSUMsb0pBQW9DQyxTQUFwQyxDQUFKO0FBRDJCLHFCQUVSRCxLQUFLRCxLQUZHO0FBQUEsT0FFdEJHLEtBRnNCLGVBRXRCQSxLQUZzQjtBQUFBLE9BRWhCQyxNQUZnQixlQUVoQkEsTUFGZ0I7O0FBRzNCLE9BQUlDLEtBQUcsRUFBQ0YsWUFBRCxFQUFPQyxjQUFQLEVBQVA7QUFDQSxPQUFHLEtBQUtFLFFBQUwsQ0FBY0MsUUFBZCxDQUF1QkMsTUFBdkIsSUFBK0IsQ0FBbEMsRUFDQ0gsR0FBR0ksR0FBSCxHQUFPLEtBQUtBLEdBQVo7QUFDRCxVQUFPO0FBQUE7QUFBV0osTUFBWDtBQUFnQko7QUFBaEIsSUFBUDtBQUNBOzs7aURBRTZCO0FBQzdCLFVBQU8sSUFBUDtBQUNBOztBQUVEOzs7Ozs7dUNBR29CO0FBQUE7O0FBQ25CLE9BQUlTLFdBQVMsS0FBS0osUUFBTCxDQUFjSSxRQUEzQjtBQUNBLFFBQUtKLFFBQUwsQ0FBY0ksUUFBZCxHQUF1QixFQUF2QixDQUZtQixDQUVNO0FBQ3pCLE9BQUlDLE1BQUksS0FBS0wsUUFBTCxDQUFjTSxZQUFkLENBQTJCSixNQUFuQztBQUNBLFFBQUtGLFFBQUwsQ0FBY00sWUFBZCxDQUEyQkMsT0FBM0IsQ0FBbUMsVUFBQ0MsR0FBRCxFQUFLQyxDQUFMLEVBQVM7QUFDM0MsV0FBS1QsUUFBTCxDQUFjQyxRQUFkLENBQXVCUyxJQUF2QixDQUE0QkYsR0FBNUI7QUFDQSxRQUFHQyxLQUFHSixNQUFJLENBQVYsRUFBWTtBQUFDO0FBQ1osWUFBS0wsUUFBTCxDQUFjSSxRQUFkLEdBQXVCQSxRQUF2QjtBQUNBO0FBQ0QsV0FBS08sT0FBTCxDQUFhQyxNQUFiLENBQW9CQyxjQUFwQixDQUFtQyxPQUFLQyxxQkFBTCxDQUEyQk4sR0FBM0IsQ0FBbkM7QUFDQSxJQU5EO0FBT0EsUUFBS0csT0FBTCxDQUFhQyxNQUFiLENBQW9CRyxnQkFBcEIsQ0FBcUMsSUFBckM7QUFDQSxRQUFLZixRQUFMLENBQWNNLFlBQWQsR0FBMkIsSUFBM0I7QUFDQTs7O0VBbEMyQiwyQyIsImZpbGUiOiJwYXJhZ3JhcGguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3Qse1Byb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IEltbXV0YWJsZSBmcm9tIFwiaW1tdXRhYmxlXCJcclxuXHJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZWQvZ3JvdXBcIlxyXG5cclxuaW1wb3J0IHtQYXJhZ3JhcGh9IGZyb20gXCIuLi9jb250ZW50XCJcclxuaW1wb3J0IGVkaXRhYmxlIGZyb20gXCIuL2VkaXRhYmxlXCJcclxuaW1wb3J0IElubGluZSBmcm9tIFwiLi9pbmxpbmVcIlxyXG5pbXBvcnQgVGV4dCBmcm9tIFwiLi90ZXh0XCJcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIGVkaXRhYmxlKFBhcmFncmFwaCl7XHJcblx0ZW1wdHlDb250ZW50KCl7XHJcblx0XHRyZXR1cm4gWzxJbmxpbmU+PFRleHQ+IDwvVGV4dD48L0lubGluZT5dXHJcblx0fVxyXG5cclxuXHRjcmVhdGVDb21wb3NlZDJQYXJlbnQocHJvcHMpe1xyXG5cdFx0bGV0IGxpbmU9c3VwZXIuY3JlYXRlQ29tcG9zZWQyUGFyZW50KC4uLmFyZ3VtZW50cylcclxuXHRcdGxldCB7d2lkdGgsaGVpZ2h0fT1saW5lLnByb3BzXHJcblx0XHRsZXQgcHM9e3dpZHRoLGhlaWdodH1cclxuXHRcdGlmKHRoaXMuY29tcHV0ZWQuY29tcG9zZWQubGVuZ3RoPT0xKVxyXG5cdFx0XHRwcy5faWQ9dGhpcy5faWRcclxuXHRcdHJldHVybiA8R3JvdXAgey4uLnBzfT57bGluZX08L0dyb3VwPlxyXG5cdH1cclxuXHJcblx0X2lzTGFzdENvbXBvc2VkRml0SW50b1BhcmVudCgpe1xyXG5cdFx0cmV0dXJuIHRydWVcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqICBpc0FsbENoaWxkcmVuQ29tcG9zZWQgd2lsbCBhZmZlY3QgbGFzdCBsaW5lIGhlaWdodCwgc28gaGVyZSB3ZSBuZWVkIG1ha2UgaXQgcmlnaHRcclxuXHQgKi9cclxuXHRhcHBlbmRMYXN0Q29tcG9zZWQoKXtcclxuXHRcdGxldCBjaGlsZHJlbj10aGlzLmNvbXB1dGVkLmNoaWxkcmVuXHJcblx0XHR0aGlzLmNvbXB1dGVkLmNoaWxkcmVuPVtdLy9tYWtlIGlzQWxsQ2hpbGRyZW5Db21wb3NlZCByaWdodFxyXG5cdFx0bGV0IGxlbj10aGlzLmNvbXB1dGVkLmxhc3RDb21wb3NlZC5sZW5ndGhcclxuXHRcdHRoaXMuY29tcHV0ZWQubGFzdENvbXBvc2VkLmZvckVhY2goKG9uZSxpKT0+e1xyXG5cdFx0XHR0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLnB1c2gob25lKVxyXG5cdFx0XHRpZihpPT1sZW4tMSl7Ly9tYWtlIGlzQWxsQ2hpbGRyZW5Db21wb3NlZCByaWdodFxyXG5cdFx0XHRcdHRoaXMuY29tcHV0ZWQuY2hpbGRyZW49Y2hpbGRyZW5cclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLmNvbnRleHQucGFyZW50LmFwcGVuZENvbXBvc2VkKHRoaXMuY3JlYXRlQ29tcG9zZWQyUGFyZW50KG9uZSkpXHJcblx0XHR9KVxyXG5cdFx0dGhpcy5jb250ZXh0LnBhcmVudC5vbjFDaGlsZENvbXBvc2VkKHRoaXMpXHJcblx0XHR0aGlzLmNvbXB1dGVkLmxhc3RDb21wb3NlZD1udWxsXHJcblx0fVxyXG59XHJcbiJdfQ==