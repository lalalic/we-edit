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
			this.composed.push(props);
			var row = _get(Object.getPrototypeOf(_class.prototype), "createComposed2Parent", this).call(this, props);
			var _row$props = row.props;
			var width = _row$props.width;
			var height = _row$props.height;

			var ps = { width: width, height: height };
			if (this.composed.length == 1) //that's why fill this.composed in appendComposed
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
				var children = this.children.splice(0);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvdGFibGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt3Q0FHdUIsT0FBTTtBQUMzQixRQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW1CLEtBQW5CLEVBRDJCO0FBRTNCLE9BQUksOEZBQWdDLE1BQWhDLENBRnVCO29CQUdSLElBQUksS0FBSixDQUhRO09BR3RCLHlCQUhzQjtPQUdoQiwyQkFIZ0I7O0FBSTNCLE9BQUksS0FBRyxFQUFDLFlBQUQsRUFBTyxjQUFQLEVBQUgsQ0FKdUI7QUFLM0IsT0FBRyxLQUFLLFFBQUwsQ0FBYyxNQUFkLElBQXNCLENBQXRCO0FBQ0YsT0FBRyxHQUFILEdBQU8sS0FBSyxHQUFMLENBRFI7QUFFQSxVQUFPOztJQUFXLEVBQVg7SUFBZ0IsR0FBaEI7SUFBUCxDQVAyQjs7OztpREFVRTtBQUM3QixVQUFPLElBQVAsQ0FENkI7Ozs7Ozs7Ozt1Q0FPVjs7OzZCQUNBLEtBQUssa0JBQUwsR0FEQTs7T0FDZCxrQ0FEYztPQUNSLG9DQURROztzQ0FFTSxLQUFLLFlBQUwsS0FGTjs7T0FFUCw4QkFBTixNQUZhOztBQUduQixPQUFJLGNBQVksS0FBSyxZQUFMLENBQWtCLE1BQWxCLENBQXlCLFVBQUMsSUFBRCxFQUFPLElBQVA7V0FBYyxPQUFLLEtBQUssTUFBTDtJQUFuQixFQUErQixDQUF4RCxDQUFaLENBSGU7QUFJbkIsT0FBRyxlQUFhLE1BQWIsSUFBdUIsY0FBWSxLQUFaLEVBQWtCOztTQUNwQyxTQUFRLE9BQUssT0FBTCxDQUFSOztBQUNQLFlBQUssWUFBTCxDQUFrQixPQUFsQixDQUEwQjthQUFNLE9BQU8sY0FBUCxDQUFzQixPQUFLLHFCQUFMLENBQTJCLElBQTNCLENBQXRCO01BQU4sQ0FBMUI7U0FGMkM7SUFBNUMsTUFHSztBQUNKLFFBQUksV0FBUyxLQUFLLFFBQUwsQ0FBYyxNQUFkLENBQXFCLENBQXJCLENBQVQsQ0FEQTtBQUVKLGFBQVMsT0FBVCxDQUFpQixlQUFLO0FBQ3JCLFNBQUkscUJBQUosR0FEcUI7S0FBTCxDQUFqQixDQUZJO0lBSEw7O0FBVUEsUUFBSyxZQUFMLEdBQWtCLElBQWxCLENBZG1CO0FBZW5CLDJGQWZtQjs7Ozs7RUFsQlEiLCJmaWxlIjoidGFibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3Qse1Byb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZWQvZ3JvdXBcIlxuXG5pbXBvcnQge1RhYmxlfSBmcm9tIFwiLi4vY29udGVudFwiXG5pbXBvcnQgZWRpdGFibGUgZnJvbSBcIi4vZWRpdGFibGVcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIGVkaXRhYmxlKFRhYmxlKXtcdFxuXHRjcmVhdGVDb21wb3NlZDJQYXJlbnQocHJvcHMpe1xuXHRcdHRoaXMuY29tcG9zZWQucHVzaChwcm9wcylcblx0XHRsZXQgcm93PXN1cGVyLmNyZWF0ZUNvbXBvc2VkMlBhcmVudChwcm9wcylcblx0XHRsZXQge3dpZHRoLGhlaWdodH09cm93LnByb3BzXG5cdFx0bGV0IHBzPXt3aWR0aCxoZWlnaHR9XG5cdFx0aWYodGhpcy5jb21wb3NlZC5sZW5ndGg9PTEpLy90aGF0J3Mgd2h5IGZpbGwgdGhpcy5jb21wb3NlZCBpbiBhcHBlbmRDb21wb3NlZFxuXHRcdFx0cHMuX2lkPXRoaXMuX2lkXG5cdFx0cmV0dXJuIDxHcm91cCB7Li4ucHN9Pntyb3d9PC9Hcm91cD5cblx0fVxuXHRcblx0X2lzTGFzdENvbXBvc2VkRml0SW50b1BhcmVudCgpe1xuXHRcdHJldHVybiB0cnVlXHRcblx0fVxuXHRcblx0LyoqXG5cdCAqICBpc0FsbENoaWxkcmVuQ29tcG9zZWQgd2lsbCBhZmZlY3QgbGFzdCBsaW5lIGhlaWdodCwgc28gaGVyZSB3ZSBuZWVkIG1ha2UgaXQgcmlnaHRcblx0ICovXG5cdGFwcGVuZExhc3RDb21wb3NlZCgpe1xuXHRcdGxldCB7d2lkdGgsaGVpZ2h0fT10aGlzLm5leHRBdmFpbGFibGVTcGFjZSgpXG5cdFx0bGV0IFt7d2lkdGg6dGFibGVXaWR0aH1dPXRoaXMubGFzdENvbXBvc2VkXG5cdFx0bGV0IHRhYmxlSGVpZ2h0PXRoaXMubGFzdENvbXBvc2VkLnJlZHVjZSgocHJldiwgbGluZSk9PnByZXYrbGluZS5oZWlnaHQsMClcblx0XHRpZih0YWJsZUhlaWdodDw9aGVpZ2h0ICYmIHRhYmxlV2lkdGg8PXdpZHRoKXtcblx0XHRcdGNvbnN0IHtwYXJlbnR9PXRoaXMuY29udGV4dFxuXHRcdFx0dGhpcy5sYXN0Q29tcG9zZWQuZm9yRWFjaChsaW5lPT5wYXJlbnQuYXBwZW5kQ29tcG9zZWQodGhpcy5jcmVhdGVDb21wb3NlZDJQYXJlbnQobGluZSkpKVxuXHRcdH1lbHNle1xuXHRcdFx0bGV0IGNoaWxkcmVuPXRoaXMuY2hpbGRyZW4uc3BsaWNlKDApXG5cdFx0XHRjaGlsZHJlbi5mb3JFYWNoKHJvdz0+e1xuXHRcdFx0XHRyb3cub25BbGxDaGlsZHJlbkNvbXBvc2VkKClcblx0XHRcdH0pXG5cdFx0fVxuXG5cdFx0dGhpcy5sYXN0Q29tcG9zZWQ9bnVsbFxuXHRcdHN1cGVyLm9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpXHRcdFxuXHR9XG59Il19