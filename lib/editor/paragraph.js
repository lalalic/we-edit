"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_editable) {
	_inherits(_class, _editable);

	function _class() {
		_classCallCheck(this, _class);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
	}

	_createClass(_class, [{
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
			var line = _get(Object.getPrototypeOf(_class.prototype), "createComposed2Parent", this).apply(this, arguments);
			var _line$props = line.props;
			var width = _line$props.width;
			var height = _line$props.height;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvcGFyYWdyYXBoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2lDQUllO0FBQ2IsVUFBTyxDQUFDOzs7SUFBUTs7OztLQUFSO0lBQUQsQ0FBUCxDQURhOzs7O3dDQUlRLE9BQU07QUFDM0IsT0FBSSxnR0FBb0MsVUFBcEMsQ0FEdUI7cUJBRVIsS0FBSyxLQUFMLENBRlE7T0FFdEIsMEJBRnNCO09BRWhCLDRCQUZnQjs7QUFHM0IsT0FBSSxLQUFHLEVBQUMsWUFBRCxFQUFPLGNBQVAsRUFBSCxDQUh1QjtBQUkzQixPQUFHLEtBQUssUUFBTCxDQUFjLFFBQWQsQ0FBdUIsTUFBdkIsSUFBK0IsQ0FBL0IsRUFDRixHQUFHLEdBQUgsR0FBTyxLQUFLLEdBQUwsQ0FEUjtBQUVBLFVBQU87O0lBQVcsRUFBWDtJQUFnQixJQUFoQjtJQUFQLENBTjJCOzs7O2lEQVNFO0FBQzdCLFVBQU8sSUFBUCxDQUQ2Qjs7Ozs7Ozs7O3VDQU9WOzs7QUFDbkIsT0FBSSxXQUFTLEtBQUssUUFBTCxDQUFjLFFBQWQsQ0FETTtBQUVuQixRQUFLLFFBQUwsQ0FBYyxRQUFkLEdBQXVCLEVBQXZCO0FBRm1CLE9BR2YsTUFBSSxLQUFLLFFBQUwsQ0FBYyxZQUFkLENBQTJCLE1BQTNCLENBSFc7QUFJbkIsUUFBSyxRQUFMLENBQWMsWUFBZCxDQUEyQixPQUEzQixDQUFtQyxVQUFDLEdBQUQsRUFBSyxDQUFMLEVBQVM7QUFDM0MsV0FBSyxRQUFMLENBQWMsUUFBZCxDQUF1QixJQUF2QixDQUE0QixHQUE1QixFQUQyQztBQUUzQyxRQUFHLEtBQUcsTUFBSSxDQUFKLEVBQU07O0FBQ1gsWUFBSyxRQUFMLENBQWMsUUFBZCxHQUF1QixRQUF2QixDQURXO0tBQVo7QUFHQSxXQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLGNBQXBCLENBQW1DLE9BQUsscUJBQUwsQ0FBMkIsR0FBM0IsQ0FBbkMsRUFMMkM7SUFBVCxDQUFuQyxDQUptQjtBQVduQixRQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLGdCQUFwQixDQUFxQyxJQUFyQyxFQVhtQjtBQVluQixRQUFLLFFBQUwsQ0FBYyxZQUFkLEdBQTJCLElBQTNCLENBWm1COzs7OztFQXJCUSIsImZpbGUiOiJwYXJhZ3JhcGguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3Qse1Byb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IEltbXV0YWJsZSBmcm9tIFwiaW1tdXRhYmxlXCJcclxuXHJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZWQvZ3JvdXBcIlxyXG5cclxuaW1wb3J0IHtQYXJhZ3JhcGh9IGZyb20gXCIuLi9jb250ZW50XCJcclxuaW1wb3J0IGVkaXRhYmxlIGZyb20gXCIuL2VkaXRhYmxlXCJcclxuaW1wb3J0IElubGluZSBmcm9tIFwiLi9pbmxpbmVcIlxyXG5pbXBvcnQgVGV4dCBmcm9tIFwiLi90ZXh0XCJcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIGVkaXRhYmxlKFBhcmFncmFwaCl7XHJcblx0ZW1wdHlDb250ZW50KCl7XHJcblx0XHRyZXR1cm4gWzxJbmxpbmU+PFRleHQ+IDwvVGV4dD48L0lubGluZT5dXHJcblx0fVxyXG5cclxuXHRjcmVhdGVDb21wb3NlZDJQYXJlbnQocHJvcHMpe1xyXG5cdFx0bGV0IGxpbmU9c3VwZXIuY3JlYXRlQ29tcG9zZWQyUGFyZW50KC4uLmFyZ3VtZW50cylcclxuXHRcdGxldCB7d2lkdGgsaGVpZ2h0fT1saW5lLnByb3BzXHJcblx0XHRsZXQgcHM9e3dpZHRoLGhlaWdodH1cclxuXHRcdGlmKHRoaXMuY29tcHV0ZWQuY29tcG9zZWQubGVuZ3RoPT0xKVxyXG5cdFx0XHRwcy5faWQ9dGhpcy5faWRcclxuXHRcdHJldHVybiA8R3JvdXAgey4uLnBzfT57bGluZX08L0dyb3VwPlxyXG5cdH1cclxuXHJcblx0X2lzTGFzdENvbXBvc2VkRml0SW50b1BhcmVudCgpe1xyXG5cdFx0cmV0dXJuIHRydWVcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqICBpc0FsbENoaWxkcmVuQ29tcG9zZWQgd2lsbCBhZmZlY3QgbGFzdCBsaW5lIGhlaWdodCwgc28gaGVyZSB3ZSBuZWVkIG1ha2UgaXQgcmlnaHRcclxuXHQgKi9cclxuXHRhcHBlbmRMYXN0Q29tcG9zZWQoKXtcclxuXHRcdGxldCBjaGlsZHJlbj10aGlzLmNvbXB1dGVkLmNoaWxkcmVuXHJcblx0XHR0aGlzLmNvbXB1dGVkLmNoaWxkcmVuPVtdLy9tYWtlIGlzQWxsQ2hpbGRyZW5Db21wb3NlZCByaWdodFxyXG5cdFx0bGV0IGxlbj10aGlzLmNvbXB1dGVkLmxhc3RDb21wb3NlZC5sZW5ndGhcclxuXHRcdHRoaXMuY29tcHV0ZWQubGFzdENvbXBvc2VkLmZvckVhY2goKG9uZSxpKT0+e1xyXG5cdFx0XHR0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLnB1c2gob25lKVxyXG5cdFx0XHRpZihpPT1sZW4tMSl7Ly9tYWtlIGlzQWxsQ2hpbGRyZW5Db21wb3NlZCByaWdodFxyXG5cdFx0XHRcdHRoaXMuY29tcHV0ZWQuY2hpbGRyZW49Y2hpbGRyZW5cclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLmNvbnRleHQucGFyZW50LmFwcGVuZENvbXBvc2VkKHRoaXMuY3JlYXRlQ29tcG9zZWQyUGFyZW50KG9uZSkpXHJcblx0XHR9KVxyXG5cdFx0dGhpcy5jb250ZXh0LnBhcmVudC5vbjFDaGlsZENvbXBvc2VkKHRoaXMpXHJcblx0XHR0aGlzLmNvbXB1dGVkLmxhc3RDb21wb3NlZD1udWxsXHJcblx0fVxyXG59XHJcbiJdfQ==