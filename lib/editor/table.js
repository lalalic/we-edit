"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _group = require("../composed/group");

var _group2 = _interopRequireDefault(_group);

var _content = require("../content");

var _editable2 = require("./editable");

var _editable3 = _interopRequireDefault(_editable2);

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
		key: "createComposed2Parent",
		value: function createComposed2Parent(props) {
			this.computed.composed.push(props);
			var row = _get(Object.getPrototypeOf(_class.prototype), "createComposed2Parent", this).call(this, props);
			var _row$props = row.props;
			var width = _row$props.width;
			var height = _row$props.height;

			var ps = { width: width, height: height };
			if (this.computed.composed.length == 1) //that's why fill this.computed.composed in appendComposed
				ps._id = this._id;
			return _react2.default.createElement(
				_group2.default,
				ps,
				row
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

			var _nextAvailableSpace = this.nextAvailableSpace();

			var width = _nextAvailableSpace.width;
			var height = _nextAvailableSpace.height;

			var _lastComposed = _slicedToArray(this.lastComposed, 1);

			var tableWidth = _lastComposed[0].width;

			var tableHeight = this.lastComposed.reduce(function (prev, line) {
				return prev + line.height;
			}, 0);
			if (tableHeight <= height && tableWidth <= width) {
				(function () {
					var parent = _this2.context.parent;

					_this2.lastComposed.forEach(function (line) {
						return parent.appendComposed(_this2.createComposed2Parent(line));
					});
				})();
			} else {
				var children = this.computed.children.splice(0);
				children.forEach(function (row) {
					row.onAllChildrenComposed();
				});
			}

			this.lastComposed = null;
			_get(Object.getPrototypeOf(_class.prototype), "onAllChildrenComposed", this).call(this);
		}
	}]);

	return _class;
}((0, _editable3.default)(_content.Table));

exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvdGFibGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt3Q0FHdUIsT0FBTTtBQUMzQixRQUFLLFFBQUwsQ0FBYyxRQUFkLENBQXVCLElBQXZCLENBQTRCLEtBQTVCLEVBRDJCO0FBRTNCLE9BQUksOEZBQWdDLE1BQWhDLENBRnVCO29CQUdSLElBQUksS0FBSixDQUhRO09BR3RCLHlCQUhzQjtPQUdoQiwyQkFIZ0I7O0FBSTNCLE9BQUksS0FBRyxFQUFDLFlBQUQsRUFBTyxjQUFQLEVBQUgsQ0FKdUI7QUFLM0IsT0FBRyxLQUFLLFFBQUwsQ0FBYyxRQUFkLENBQXVCLE1BQXZCLElBQStCLENBQS9CO0FBQ0YsT0FBRyxHQUFILEdBQU8sS0FBSyxHQUFMLENBRFI7QUFFQSxVQUFPOztJQUFXLEVBQVg7SUFBZ0IsR0FBaEI7SUFBUCxDQVAyQjs7OztpREFVRTtBQUM3QixVQUFPLElBQVAsQ0FENkI7Ozs7Ozs7Ozt1Q0FPVjs7OzZCQUNBLEtBQUssa0JBQUwsR0FEQTs7T0FDZCxrQ0FEYztPQUNSLG9DQURROztzQ0FFTSxLQUFLLFlBQUwsS0FGTjs7T0FFUCw4QkFBTixNQUZhOztBQUduQixPQUFJLGNBQVksS0FBSyxZQUFMLENBQWtCLE1BQWxCLENBQXlCLFVBQUMsSUFBRCxFQUFPLElBQVA7V0FBYyxPQUFLLEtBQUssTUFBTDtJQUFuQixFQUErQixDQUF4RCxDQUFaLENBSGU7QUFJbkIsT0FBRyxlQUFhLE1BQWIsSUFBdUIsY0FBWSxLQUFaLEVBQWtCOztTQUNwQyxTQUFRLE9BQUssT0FBTCxDQUFSOztBQUNQLFlBQUssWUFBTCxDQUFrQixPQUFsQixDQUEwQjthQUFNLE9BQU8sY0FBUCxDQUFzQixPQUFLLHFCQUFMLENBQTJCLElBQTNCLENBQXRCO01BQU4sQ0FBMUI7U0FGMkM7SUFBNUMsTUFHSztBQUNKLFFBQUksV0FBUyxLQUFLLFFBQUwsQ0FBYyxRQUFkLENBQXVCLE1BQXZCLENBQThCLENBQTlCLENBQVQsQ0FEQTtBQUVKLGFBQVMsT0FBVCxDQUFpQixlQUFLO0FBQ3JCLFNBQUkscUJBQUosR0FEcUI7S0FBTCxDQUFqQixDQUZJO0lBSEw7O0FBVUEsUUFBSyxZQUFMLEdBQWtCLElBQWxCLENBZG1CO0FBZW5CLDJGQWZtQjs7Ozs7RUFsQlEiLCJmaWxlIjoidGFibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3Qse1Byb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZWQvZ3JvdXBcIlxuXG5pbXBvcnQge1RhYmxlfSBmcm9tIFwiLi4vY29udGVudFwiXG5pbXBvcnQgZWRpdGFibGUgZnJvbSBcIi4vZWRpdGFibGVcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIGVkaXRhYmxlKFRhYmxlKXtcblx0Y3JlYXRlQ29tcG9zZWQyUGFyZW50KHByb3BzKXtcblx0XHR0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLnB1c2gocHJvcHMpXG5cdFx0bGV0IHJvdz1zdXBlci5jcmVhdGVDb21wb3NlZDJQYXJlbnQocHJvcHMpXG5cdFx0bGV0IHt3aWR0aCxoZWlnaHR9PXJvdy5wcm9wc1xuXHRcdGxldCBwcz17d2lkdGgsaGVpZ2h0fVxuXHRcdGlmKHRoaXMuY29tcHV0ZWQuY29tcG9zZWQubGVuZ3RoPT0xKS8vdGhhdCdzIHdoeSBmaWxsIHRoaXMuY29tcHV0ZWQuY29tcG9zZWQgaW4gYXBwZW5kQ29tcG9zZWRcblx0XHRcdHBzLl9pZD10aGlzLl9pZFxuXHRcdHJldHVybiA8R3JvdXAgey4uLnBzfT57cm93fTwvR3JvdXA+XG5cdH1cblxuXHRfaXNMYXN0Q29tcG9zZWRGaXRJbnRvUGFyZW50KCl7XG5cdFx0cmV0dXJuIHRydWVcblx0fVxuXG5cdC8qKlxuXHQgKiAgaXNBbGxDaGlsZHJlbkNvbXBvc2VkIHdpbGwgYWZmZWN0IGxhc3QgbGluZSBoZWlnaHQsIHNvIGhlcmUgd2UgbmVlZCBtYWtlIGl0IHJpZ2h0XG5cdCAqL1xuXHRhcHBlbmRMYXN0Q29tcG9zZWQoKXtcblx0XHRsZXQge3dpZHRoLGhlaWdodH09dGhpcy5uZXh0QXZhaWxhYmxlU3BhY2UoKVxuXHRcdGxldCBbe3dpZHRoOnRhYmxlV2lkdGh9XT10aGlzLmxhc3RDb21wb3NlZFxuXHRcdGxldCB0YWJsZUhlaWdodD10aGlzLmxhc3RDb21wb3NlZC5yZWR1Y2UoKHByZXYsIGxpbmUpPT5wcmV2K2xpbmUuaGVpZ2h0LDApXG5cdFx0aWYodGFibGVIZWlnaHQ8PWhlaWdodCAmJiB0YWJsZVdpZHRoPD13aWR0aCl7XG5cdFx0XHRjb25zdCB7cGFyZW50fT10aGlzLmNvbnRleHRcblx0XHRcdHRoaXMubGFzdENvbXBvc2VkLmZvckVhY2gobGluZT0+cGFyZW50LmFwcGVuZENvbXBvc2VkKHRoaXMuY3JlYXRlQ29tcG9zZWQyUGFyZW50KGxpbmUpKSlcblx0XHR9ZWxzZXtcblx0XHRcdGxldCBjaGlsZHJlbj10aGlzLmNvbXB1dGVkLmNoaWxkcmVuLnNwbGljZSgwKVxuXHRcdFx0Y2hpbGRyZW4uZm9yRWFjaChyb3c9Pntcblx0XHRcdFx0cm93Lm9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpXG5cdFx0XHR9KVxuXHRcdH1cblxuXHRcdHRoaXMubGFzdENvbXBvc2VkPW51bGxcblx0XHRzdXBlci5vbkFsbENoaWxkcmVuQ29tcG9zZWQoKVxuXHR9XG59XG4iXX0=