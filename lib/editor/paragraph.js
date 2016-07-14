"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

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
		key: "whatIfEmpty",
		value: function whatIfEmpty() {
			this.state.content.push(_react2.default.createElement(
				_inline2.default,
				{ contentStyle: this.context.getDefaultStyle("inline") },
				_react2.default.createElement(
					_text2.default,
					null,
					" "
				)
			));
		}
	}, {
		key: "createComposed2Parent",
		value: function createComposed2Parent(props) {
			var line = _get(Object.getPrototypeOf(_class.prototype), "createComposed2Parent", this).apply(this, arguments);
			var _line$props = line.props;
			var width = _line$props.width;
			var height = _line$props.height;

			var ps = { width: width, height: height };
			if (this.composed.length == 1) ps._id = this._id;
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

			var children = this.children;
			this.children = []; //make isAllChildrenComposed right
			var len = this.lastComposed.length;
			this.lastComposed.forEach(function (one, i) {
				_this2.composed.push(one);
				if (i == len - 1) {
					//make isAllChildrenComposed right
					_this2.children = children;
				}
				_this2.context.parent.appendComposed(_this2.createComposed2Parent(one));
			});
			this.context.parent.on1ChildComposed(this);
			this.lastComposed = null;
		}
	}]);

	return _class;
}((0, _editable3.default)(_content.Paragraph));

exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvcGFyYWdyYXBoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUVBOzs7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnQ0FJYztBQUNaLFFBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsSUFBbkIsQ0FBd0I7O01BQVEsY0FBYyxLQUFLLE9BQUwsQ0FBYSxlQUFiLENBQTZCLFFBQTdCLENBQWQsRUFBUjtJQUE4RDs7OztLQUE5RDtJQUF4QixFQURZOzs7O3dDQUlTLE9BQU07QUFDM0IsT0FBSSxnR0FBb0MsVUFBcEMsQ0FEdUI7cUJBRVIsS0FBSyxLQUFMLENBRlE7T0FFdEIsMEJBRnNCO09BRWhCLDRCQUZnQjs7QUFHM0IsT0FBSSxLQUFHLEVBQUMsWUFBRCxFQUFPLGNBQVAsRUFBSCxDQUh1QjtBQUkzQixPQUFHLEtBQUssUUFBTCxDQUFjLE1BQWQsSUFBc0IsQ0FBdEIsRUFDRixHQUFHLEdBQUgsR0FBTyxLQUFLLEdBQUwsQ0FEUjtBQUVBLFVBQU87O0lBQVcsRUFBWDtJQUFnQixJQUFoQjtJQUFQLENBTjJCOzs7O2lEQVNFO0FBQzdCLFVBQU8sSUFBUCxDQUQ2Qjs7Ozs7Ozs7O3VDQU9WOzs7QUFDbkIsT0FBSSxXQUFTLEtBQUssUUFBTCxDQURNO0FBRW5CLFFBQUssUUFBTCxHQUFjLEVBQWQ7QUFGbUIsT0FHZixNQUFJLEtBQUssWUFBTCxDQUFrQixNQUFsQixDQUhXO0FBSW5CLFFBQUssWUFBTCxDQUFrQixPQUFsQixDQUEwQixVQUFDLEdBQUQsRUFBSyxDQUFMLEVBQVM7QUFDbEMsV0FBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixHQUFuQixFQURrQztBQUVsQyxRQUFHLEtBQUcsTUFBSSxDQUFKLEVBQU07O0FBQ1gsWUFBSyxRQUFMLEdBQWMsUUFBZCxDQURXO0tBQVo7QUFHQSxXQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLGNBQXBCLENBQW1DLE9BQUsscUJBQUwsQ0FBMkIsR0FBM0IsQ0FBbkMsRUFMa0M7SUFBVCxDQUExQixDQUptQjtBQVduQixRQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLGdCQUFwQixDQUFxQyxJQUFyQyxFQVhtQjtBQVluQixRQUFLLFlBQUwsR0FBa0IsSUFBbEIsQ0FabUI7Ozs7O0VBckJRIiwiZmlsZSI6InBhcmFncmFwaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCx7UHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5cclxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXHJcblxyXG5pbXBvcnQge1BhcmFncmFwaH0gZnJvbSBcIi4uL2NvbnRlbnRcIlxyXG5pbXBvcnQgZWRpdGFibGUgZnJvbSBcIi4vZWRpdGFibGVcIlxyXG5pbXBvcnQgSW5saW5lIGZyb20gXCIuL2lubGluZVwiXHJcbmltcG9ydCBUZXh0IGZyb20gXCIuL3RleHRcIlxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgZWRpdGFibGUoUGFyYWdyYXBoKXtcclxuXHR3aGF0SWZFbXB0eSgpe1xyXG5cdFx0dGhpcy5zdGF0ZS5jb250ZW50LnB1c2goPElubGluZSBjb250ZW50U3R5bGU9e3RoaXMuY29udGV4dC5nZXREZWZhdWx0U3R5bGUoXCJpbmxpbmVcIil9PjxUZXh0PiA8L1RleHQ+PC9JbmxpbmU+KVxyXG5cdH1cclxuXHRcclxuXHRjcmVhdGVDb21wb3NlZDJQYXJlbnQocHJvcHMpe1xyXG5cdFx0bGV0IGxpbmU9c3VwZXIuY3JlYXRlQ29tcG9zZWQyUGFyZW50KC4uLmFyZ3VtZW50cylcclxuXHRcdGxldCB7d2lkdGgsaGVpZ2h0fT1saW5lLnByb3BzXHJcblx0XHRsZXQgcHM9e3dpZHRoLGhlaWdodH1cclxuXHRcdGlmKHRoaXMuY29tcG9zZWQubGVuZ3RoPT0xKVxyXG5cdFx0XHRwcy5faWQ9dGhpcy5faWRcclxuXHRcdHJldHVybiA8R3JvdXAgey4uLnBzfT57bGluZX08L0dyb3VwPlxyXG5cdH1cclxuXHRcclxuXHRfaXNMYXN0Q29tcG9zZWRGaXRJbnRvUGFyZW50KCl7XHJcblx0XHRyZXR1cm4gdHJ1ZVx0XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqICBpc0FsbENoaWxkcmVuQ29tcG9zZWQgd2lsbCBhZmZlY3QgbGFzdCBsaW5lIGhlaWdodCwgc28gaGVyZSB3ZSBuZWVkIG1ha2UgaXQgcmlnaHRcclxuXHQgKi9cclxuXHRhcHBlbmRMYXN0Q29tcG9zZWQoKXtcclxuXHRcdGxldCBjaGlsZHJlbj10aGlzLmNoaWxkcmVuXHJcblx0XHR0aGlzLmNoaWxkcmVuPVtdLy9tYWtlIGlzQWxsQ2hpbGRyZW5Db21wb3NlZCByaWdodFxyXG5cdFx0bGV0IGxlbj10aGlzLmxhc3RDb21wb3NlZC5sZW5ndGhcclxuXHRcdHRoaXMubGFzdENvbXBvc2VkLmZvckVhY2goKG9uZSxpKT0+e1xyXG5cdFx0XHR0aGlzLmNvbXBvc2VkLnB1c2gob25lKVxyXG5cdFx0XHRpZihpPT1sZW4tMSl7Ly9tYWtlIGlzQWxsQ2hpbGRyZW5Db21wb3NlZCByaWdodFxyXG5cdFx0XHRcdHRoaXMuY2hpbGRyZW49Y2hpbGRyZW5cclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLmNvbnRleHQucGFyZW50LmFwcGVuZENvbXBvc2VkKHRoaXMuY3JlYXRlQ29tcG9zZWQyUGFyZW50KG9uZSkpXHJcblx0XHR9KVxyXG5cdFx0dGhpcy5jb250ZXh0LnBhcmVudC5vbjFDaGlsZENvbXBvc2VkKHRoaXMpXHJcblx0XHR0aGlzLmxhc3RDb21wb3NlZD1udWxsXHJcblx0fVxyXG59XHJcbiJdfQ==