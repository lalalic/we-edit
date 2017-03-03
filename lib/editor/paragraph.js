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

var _uuid = require("../tools/uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_editable) {
	_inherits(_class, _editable);

	function _class() {
		_classCallCheck(this, _class);

		return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
	}

	_createClass(_class, [{
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
			var line = _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "createComposed2Parent", this).apply(this, arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvcGFyYWdyYXBoLmpzIl0sIm5hbWVzIjpbInByb3BzIiwibGluZSIsImFyZ3VtZW50cyIsIndpZHRoIiwiaGVpZ2h0IiwicHMiLCJjb21wdXRlZCIsImNvbXBvc2VkIiwibGVuZ3RoIiwiaWQiLCJjaGlsZHJlbiIsImxlbiIsImxhc3RDb21wb3NlZCIsImZvckVhY2giLCJvbmUiLCJpIiwicHVzaCIsImNvbnRleHQiLCJwYXJlbnQiLCJhcHBlbmRDb21wb3NlZCIsImNyZWF0ZUNvbXBvc2VkMlBhcmVudCIsIm9uMUNoaWxkQ29tcG9zZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUVBOzs7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztpQ0FJZTtBQUNiLFVBQU8sQ0FBQztBQUFBO0FBQUEsTUFBUSxLQUFLLGlCQUFiO0FBQXFCO0FBQUE7QUFBQSxPQUFNLEtBQUssaUJBQVg7QUFBQTtBQUFBO0FBQXJCLElBQUQsQ0FBUDtBQUNBOzs7d0NBRXFCQSxLLEVBQU07QUFDM0IsT0FBSUMsOEhBQW9DQyxTQUFwQyxDQUFKO0FBRDJCLHFCQUVSRCxLQUFLRCxLQUZHO0FBQUEsT0FFdEJHLEtBRnNCLGVBRXRCQSxLQUZzQjtBQUFBLE9BRWhCQyxNQUZnQixlQUVoQkEsTUFGZ0I7O0FBRzNCLE9BQUlDLEtBQUcsRUFBQ0YsWUFBRCxFQUFPQyxjQUFQLEVBQVA7QUFDQSxPQUFHLEtBQUtFLFFBQUwsQ0FBY0MsUUFBZCxDQUF1QkMsTUFBdkIsSUFBK0IsQ0FBbEMsRUFDQ0gsR0FBR0ksRUFBSCxHQUFNLEtBQUtBLEVBQVg7QUFDRCxVQUFPO0FBQUE7QUFBV0osTUFBWDtBQUFnQko7QUFBaEIsSUFBUDtBQUNBOzs7aURBRTZCO0FBQzdCLFVBQU8sSUFBUDtBQUNBOztBQUVEOzs7Ozs7dUNBR29CO0FBQUE7O0FBQ25CLE9BQUlTLFdBQVMsS0FBS0osUUFBTCxDQUFjSSxRQUEzQjtBQUNBLFFBQUtKLFFBQUwsQ0FBY0ksUUFBZCxHQUF1QixFQUF2QixDQUZtQixDQUVNO0FBQ3pCLE9BQUlDLE1BQUksS0FBS0wsUUFBTCxDQUFjTSxZQUFkLENBQTJCSixNQUFuQztBQUNBLFFBQUtGLFFBQUwsQ0FBY00sWUFBZCxDQUEyQkMsT0FBM0IsQ0FBbUMsVUFBQ0MsR0FBRCxFQUFLQyxDQUFMLEVBQVM7QUFDM0MsV0FBS1QsUUFBTCxDQUFjQyxRQUFkLENBQXVCUyxJQUF2QixDQUE0QkYsR0FBNUI7QUFDQSxRQUFHQyxLQUFHSixNQUFJLENBQVYsRUFBWTtBQUFDO0FBQ1osWUFBS0wsUUFBTCxDQUFjSSxRQUFkLEdBQXVCQSxRQUF2QjtBQUNBO0FBQ0QsV0FBS08sT0FBTCxDQUFhQyxNQUFiLENBQW9CQyxjQUFwQixDQUFtQyxPQUFLQyxxQkFBTCxDQUEyQk4sR0FBM0IsQ0FBbkM7QUFDQSxJQU5EO0FBT0EsUUFBS0csT0FBTCxDQUFhQyxNQUFiLENBQW9CRyxnQkFBcEIsQ0FBcUMsSUFBckM7QUFDQSxRQUFLZixRQUFMLENBQWNNLFlBQWQsR0FBMkIsSUFBM0I7QUFDQTs7OztFQWxDMkIsMkMiLCJmaWxlIjoicGFyYWdyYXBoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LHtQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcblxyXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcclxuXHJcbmltcG9ydCB7UGFyYWdyYXBofSBmcm9tIFwiLi4vY29udGVudFwiXHJcbmltcG9ydCBlZGl0YWJsZSBmcm9tIFwiLi9lZGl0YWJsZVwiXHJcbmltcG9ydCBJbmxpbmUgZnJvbSBcIi4vaW5saW5lXCJcclxuaW1wb3J0IFRleHQgZnJvbSBcIi4vdGV4dFwiXHJcblxyXG5pbXBvcnQge3V1aWR9IGZyb20gXCIuLi90b29scy91dWlkXCJcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIGVkaXRhYmxlKFBhcmFncmFwaCl7XHJcblx0ZW1wdHlDb250ZW50KCl7XHJcblx0XHRyZXR1cm4gWzxJbmxpbmUga2V5PXt1dWlkKCl9PjxUZXh0IGtleT17dXVpZCgpfT4gPC9UZXh0PjwvSW5saW5lPl1cclxuXHR9XHJcblxyXG5cdGNyZWF0ZUNvbXBvc2VkMlBhcmVudChwcm9wcyl7XHJcblx0XHRsZXQgbGluZT1zdXBlci5jcmVhdGVDb21wb3NlZDJQYXJlbnQoLi4uYXJndW1lbnRzKVxyXG5cdFx0bGV0IHt3aWR0aCxoZWlnaHR9PWxpbmUucHJvcHNcclxuXHRcdGxldCBwcz17d2lkdGgsaGVpZ2h0fVxyXG5cdFx0aWYodGhpcy5jb21wdXRlZC5jb21wb3NlZC5sZW5ndGg9PTEpXHJcblx0XHRcdHBzLmlkPXRoaXMuaWRcclxuXHRcdHJldHVybiA8R3JvdXAgey4uLnBzfT57bGluZX08L0dyb3VwPlxyXG5cdH1cclxuXHJcblx0X2lzTGFzdENvbXBvc2VkRml0SW50b1BhcmVudCgpe1xyXG5cdFx0cmV0dXJuIHRydWVcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqICBpc0FsbENoaWxkcmVuQ29tcG9zZWQgd2lsbCBhZmZlY3QgbGFzdCBsaW5lIGhlaWdodCwgc28gaGVyZSB3ZSBuZWVkIG1ha2UgaXQgcmlnaHRcclxuXHQgKi9cclxuXHRhcHBlbmRMYXN0Q29tcG9zZWQoKXtcclxuXHRcdGxldCBjaGlsZHJlbj10aGlzLmNvbXB1dGVkLmNoaWxkcmVuXHJcblx0XHR0aGlzLmNvbXB1dGVkLmNoaWxkcmVuPVtdLy9tYWtlIGlzQWxsQ2hpbGRyZW5Db21wb3NlZCByaWdodFxyXG5cdFx0bGV0IGxlbj10aGlzLmNvbXB1dGVkLmxhc3RDb21wb3NlZC5sZW5ndGhcclxuXHRcdHRoaXMuY29tcHV0ZWQubGFzdENvbXBvc2VkLmZvckVhY2goKG9uZSxpKT0+e1xyXG5cdFx0XHR0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLnB1c2gob25lKVxyXG5cdFx0XHRpZihpPT1sZW4tMSl7Ly9tYWtlIGlzQWxsQ2hpbGRyZW5Db21wb3NlZCByaWdodFxyXG5cdFx0XHRcdHRoaXMuY29tcHV0ZWQuY2hpbGRyZW49Y2hpbGRyZW5cclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLmNvbnRleHQucGFyZW50LmFwcGVuZENvbXBvc2VkKHRoaXMuY3JlYXRlQ29tcG9zZWQyUGFyZW50KG9uZSkpXHJcblx0XHR9KVxyXG5cdFx0dGhpcy5jb250ZXh0LnBhcmVudC5vbjFDaGlsZENvbXBvc2VkKHRoaXMpXHJcblx0XHR0aGlzLmNvbXB1dGVkLmxhc3RDb21wb3NlZD1udWxsXHJcblx0fVxyXG59XHJcbiJdfQ==