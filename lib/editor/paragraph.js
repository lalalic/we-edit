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
	}, {
		key: "appendLastComposed",
		value: function appendLastComposed() {
			var _this2 = this;

			this.lastComposed.forEach(function (one) {
				_this2.composed.push(one);
				_this2.context.parent.appendComposed(_this2.createComposed2Parent(one));
			});
			this.lastComposed = null;
		}
	}]);

	return _class;
}((0, _editable3.default)(_content.Paragraph));

exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvcGFyYWdyYXBoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUVBOzs7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnQ0FJYztBQUNaLFFBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsSUFBbkIsQ0FBd0I7O01BQVEsY0FBYyxLQUFLLE9BQUwsQ0FBYSxlQUFiLENBQTZCLFFBQTdCLENBQWQsRUFBUjtJQUE4RDs7OztLQUE5RDtJQUF4QixFQURZOzs7O3dDQUlTLE9BQU07QUFDM0IsT0FBSSxnR0FBb0MsVUFBcEMsQ0FEdUI7cUJBRVIsS0FBSyxLQUFMLENBRlE7T0FFdEIsMEJBRnNCO09BRWhCLDRCQUZnQjs7QUFHM0IsT0FBSSxLQUFHLEVBQUMsWUFBRCxFQUFPLGNBQVAsRUFBSCxDQUh1QjtBQUkzQixPQUFHLEtBQUssUUFBTCxDQUFjLE1BQWQsSUFBc0IsQ0FBdEIsRUFDRixHQUFHLEdBQUgsR0FBTyxLQUFLLEdBQUwsQ0FEUjtBQUVBLFVBQU87O0lBQVcsRUFBWDtJQUFnQixJQUFoQjtJQUFQLENBTjJCOzs7O2lEQVNFO0FBQzdCLFVBQU8sSUFBUCxDQUQ2Qjs7Ozt1Q0FJVjs7O0FBQ25CLFFBQUssWUFBTCxDQUFrQixPQUFsQixDQUEwQixlQUFLO0FBQzlCLFdBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsR0FBbkIsRUFEOEI7QUFFOUIsV0FBSyxPQUFMLENBQWEsTUFBYixDQUFvQixjQUFwQixDQUFtQyxPQUFLLHFCQUFMLENBQTJCLEdBQTNCLENBQW5DLEVBRjhCO0lBQUwsQ0FBMUIsQ0FEbUI7QUFLbkIsUUFBSyxZQUFMLEdBQWtCLElBQWxCLENBTG1COzs7OztFQWxCUSIsImZpbGUiOiJwYXJhZ3JhcGguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3Qse1Byb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuXHJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZWQvZ3JvdXBcIlxyXG5cclxuaW1wb3J0IHtQYXJhZ3JhcGh9IGZyb20gXCIuLi9jb250ZW50XCJcclxuaW1wb3J0IGVkaXRhYmxlIGZyb20gXCIuL2VkaXRhYmxlXCJcclxuaW1wb3J0IElubGluZSBmcm9tIFwiLi9pbmxpbmVcIlxyXG5pbXBvcnQgVGV4dCBmcm9tIFwiLi90ZXh0XCJcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIGVkaXRhYmxlKFBhcmFncmFwaCl7XHJcblx0d2hhdElmRW1wdHkoKXtcclxuXHRcdHRoaXMuc3RhdGUuY29udGVudC5wdXNoKDxJbmxpbmUgY29udGVudFN0eWxlPXt0aGlzLmNvbnRleHQuZ2V0RGVmYXVsdFN0eWxlKFwiaW5saW5lXCIpfT48VGV4dD4gPC9UZXh0PjwvSW5saW5lPilcclxuXHR9XHJcblx0XHJcblx0Y3JlYXRlQ29tcG9zZWQyUGFyZW50KHByb3BzKXtcclxuXHRcdGxldCBsaW5lPXN1cGVyLmNyZWF0ZUNvbXBvc2VkMlBhcmVudCguLi5hcmd1bWVudHMpXHJcblx0XHRsZXQge3dpZHRoLGhlaWdodH09bGluZS5wcm9wc1xyXG5cdFx0bGV0IHBzPXt3aWR0aCxoZWlnaHR9XHJcblx0XHRpZih0aGlzLmNvbXBvc2VkLmxlbmd0aD09MSlcclxuXHRcdFx0cHMuX2lkPXRoaXMuX2lkXHJcblx0XHRyZXR1cm4gPEdyb3VwIHsuLi5wc30+e2xpbmV9PC9Hcm91cD5cclxuXHR9XHJcblx0XHJcblx0X2lzTGFzdENvbXBvc2VkRml0SW50b1BhcmVudCgpe1xyXG5cdFx0cmV0dXJuIHRydWVcdFxyXG5cdH1cclxuXHRcclxuXHRhcHBlbmRMYXN0Q29tcG9zZWQoKXtcclxuXHRcdHRoaXMubGFzdENvbXBvc2VkLmZvckVhY2gob25lPT57XHJcblx0XHRcdHRoaXMuY29tcG9zZWQucHVzaChvbmUpXHJcblx0XHRcdHRoaXMuY29udGV4dC5wYXJlbnQuYXBwZW5kQ29tcG9zZWQodGhpcy5jcmVhdGVDb21wb3NlZDJQYXJlbnQob25lKSlcclxuXHRcdH0pXHJcblx0XHR0aGlzLmxhc3RDb21wb3NlZD1udWxsXHJcblx0fVxyXG59XHJcbiJdfQ==