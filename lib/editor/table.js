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

		return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
	}

	_createClass(_class, [{
		key: "createComposed2Parent",
		value: function createComposed2Parent(props) {
			this.computed.composed.push(props);
			var row = _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "createComposed2Parent", this).call(this, props);
			var _row$props = row.props,
			    width = _row$props.width,
			    height = _row$props.height;

			var ps = { width: width, height: height };
			if (this.computed.composed.length == 1) //that's why fill this.computed.composed in appendComposed
				ps.id = this.id;
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

			var _nextAvailableSpace = this.nextAvailableSpace(),
			    width = _nextAvailableSpace.width,
			    height = _nextAvailableSpace.height;

			var _computed$lastCompose = _slicedToArray(this.computed.lastComposed, 1),
			    tableWidth = _computed$lastCompose[0].width;

			var tableHeight = this.computed.lastComposed.reduce(function (prev, line) {
				return prev + line.height;
			}, 0);
			if (tableHeight <= height && tableWidth <= width) {
				var parent = this.context.parent;

				this.computed.lastComposed.forEach(function (line) {
					return parent.appendComposed(_this2.createComposed2Parent(line));
				});
			} else {
				var children = this.computed.children.splice(0);
				children.forEach(function (row) {
					row.onAllChildrenComposed();
				});
			}

			this.computed.lastComposed = null;
			_get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "onAllChildrenComposed", this).call(this);
		}
	}]);

	return _class;
}((0, _editable3.default)(_content.Table));

exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvdGFibGUuanMiXSwibmFtZXMiOlsicHJvcHMiLCJjb21wdXRlZCIsImNvbXBvc2VkIiwicHVzaCIsInJvdyIsIndpZHRoIiwiaGVpZ2h0IiwicHMiLCJsZW5ndGgiLCJpZCIsIm5leHRBdmFpbGFibGVTcGFjZSIsImxhc3RDb21wb3NlZCIsInRhYmxlV2lkdGgiLCJ0YWJsZUhlaWdodCIsInJlZHVjZSIsInByZXYiLCJsaW5lIiwicGFyZW50IiwiY29udGV4dCIsImZvckVhY2giLCJhcHBlbmRDb21wb3NlZCIsImNyZWF0ZUNvbXBvc2VkMlBhcmVudCIsImNoaWxkcmVuIiwic3BsaWNlIiwib25BbGxDaGlsZHJlbkNvbXBvc2VkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3dDQUd1QkEsSyxFQUFNO0FBQzNCLFFBQUtDLFFBQUwsQ0FBY0MsUUFBZCxDQUF1QkMsSUFBdkIsQ0FBNEJILEtBQTVCO0FBQ0EsT0FBSUksNEhBQWdDSixLQUFoQyxDQUFKO0FBRjJCLG9CQUdSSSxJQUFJSixLQUhJO0FBQUEsT0FHdEJLLEtBSHNCLGNBR3RCQSxLQUhzQjtBQUFBLE9BR2hCQyxNQUhnQixjQUdoQkEsTUFIZ0I7O0FBSTNCLE9BQUlDLEtBQUcsRUFBQ0YsWUFBRCxFQUFPQyxjQUFQLEVBQVA7QUFDQSxPQUFHLEtBQUtMLFFBQUwsQ0FBY0MsUUFBZCxDQUF1Qk0sTUFBdkIsSUFBK0IsQ0FBbEMsRUFBb0M7QUFDbkNELE9BQUdFLEVBQUgsR0FBTSxLQUFLQSxFQUFYO0FBQ0QsVUFBTztBQUFBO0FBQVdGLE1BQVg7QUFBZ0JIO0FBQWhCLElBQVA7QUFDQTs7O2lEQUU2QjtBQUM3QixVQUFPLElBQVA7QUFDQTs7QUFFRDs7Ozs7O3VDQUdvQjtBQUFBOztBQUFBLDZCQUNBLEtBQUtNLGtCQUFMLEVBREE7QUFBQSxPQUNkTCxLQURjLHVCQUNkQSxLQURjO0FBQUEsT0FDUkMsTUFEUSx1QkFDUkEsTUFEUTs7QUFBQSw4Q0FFTSxLQUFLTCxRQUFMLENBQWNVLFlBRnBCO0FBQUEsT0FFUEMsVUFGTyw0QkFFYlAsS0FGYTs7QUFHbkIsT0FBSVEsY0FBWSxLQUFLWixRQUFMLENBQWNVLFlBQWQsQ0FBMkJHLE1BQTNCLENBQWtDLFVBQUNDLElBQUQsRUFBT0MsSUFBUDtBQUFBLFdBQWNELE9BQUtDLEtBQUtWLE1BQXhCO0FBQUEsSUFBbEMsRUFBaUUsQ0FBakUsQ0FBaEI7QUFDQSxPQUFHTyxlQUFhUCxNQUFiLElBQXVCTSxjQUFZUCxLQUF0QyxFQUE0QztBQUFBLFFBQ3BDWSxNQURvQyxHQUM1QixLQUFLQyxPQUR1QixDQUNwQ0QsTUFEb0M7O0FBRTNDLFNBQUtoQixRQUFMLENBQWNVLFlBQWQsQ0FBMkJRLE9BQTNCLENBQW1DO0FBQUEsWUFBTUYsT0FBT0csY0FBUCxDQUFzQixPQUFLQyxxQkFBTCxDQUEyQkwsSUFBM0IsQ0FBdEIsQ0FBTjtBQUFBLEtBQW5DO0FBQ0EsSUFIRCxNQUdLO0FBQ0osUUFBSU0sV0FBUyxLQUFLckIsUUFBTCxDQUFjcUIsUUFBZCxDQUF1QkMsTUFBdkIsQ0FBOEIsQ0FBOUIsQ0FBYjtBQUNBRCxhQUFTSCxPQUFULENBQWlCLGVBQUs7QUFDckJmLFNBQUlvQixxQkFBSjtBQUNBLEtBRkQ7QUFHQTs7QUFFRCxRQUFLdkIsUUFBTCxDQUFjVSxZQUFkLEdBQTJCLElBQTNCO0FBQ0E7QUFDQTs7OztFQWxDMkIsdUMiLCJmaWxlIjoidGFibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3Qse1Byb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXHJcblxyXG5pbXBvcnQge1RhYmxlfSBmcm9tIFwiLi4vY29udGVudFwiXHJcbmltcG9ydCBlZGl0YWJsZSBmcm9tIFwiLi9lZGl0YWJsZVwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIGVkaXRhYmxlKFRhYmxlKXtcclxuXHRjcmVhdGVDb21wb3NlZDJQYXJlbnQocHJvcHMpe1xyXG5cdFx0dGhpcy5jb21wdXRlZC5jb21wb3NlZC5wdXNoKHByb3BzKVxyXG5cdFx0bGV0IHJvdz1zdXBlci5jcmVhdGVDb21wb3NlZDJQYXJlbnQocHJvcHMpXHJcblx0XHRsZXQge3dpZHRoLGhlaWdodH09cm93LnByb3BzXHJcblx0XHRsZXQgcHM9e3dpZHRoLGhlaWdodH1cclxuXHRcdGlmKHRoaXMuY29tcHV0ZWQuY29tcG9zZWQubGVuZ3RoPT0xKS8vdGhhdCdzIHdoeSBmaWxsIHRoaXMuY29tcHV0ZWQuY29tcG9zZWQgaW4gYXBwZW5kQ29tcG9zZWRcclxuXHRcdFx0cHMuaWQ9dGhpcy5pZFxyXG5cdFx0cmV0dXJuIDxHcm91cCB7Li4ucHN9Pntyb3d9PC9Hcm91cD5cclxuXHR9XHJcblxyXG5cdF9pc0xhc3RDb21wb3NlZEZpdEludG9QYXJlbnQoKXtcclxuXHRcdHJldHVybiB0cnVlXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiAgaXNBbGxDaGlsZHJlbkNvbXBvc2VkIHdpbGwgYWZmZWN0IGxhc3QgbGluZSBoZWlnaHQsIHNvIGhlcmUgd2UgbmVlZCBtYWtlIGl0IHJpZ2h0XHJcblx0ICovXHJcblx0YXBwZW5kTGFzdENvbXBvc2VkKCl7XHJcblx0XHRsZXQge3dpZHRoLGhlaWdodH09dGhpcy5uZXh0QXZhaWxhYmxlU3BhY2UoKVxyXG5cdFx0bGV0IFt7d2lkdGg6dGFibGVXaWR0aH1dPXRoaXMuY29tcHV0ZWQubGFzdENvbXBvc2VkXHJcblx0XHRsZXQgdGFibGVIZWlnaHQ9dGhpcy5jb21wdXRlZC5sYXN0Q29tcG9zZWQucmVkdWNlKChwcmV2LCBsaW5lKT0+cHJlditsaW5lLmhlaWdodCwwKVxyXG5cdFx0aWYodGFibGVIZWlnaHQ8PWhlaWdodCAmJiB0YWJsZVdpZHRoPD13aWR0aCl7XHJcblx0XHRcdGNvbnN0IHtwYXJlbnR9PXRoaXMuY29udGV4dFxyXG5cdFx0XHR0aGlzLmNvbXB1dGVkLmxhc3RDb21wb3NlZC5mb3JFYWNoKGxpbmU9PnBhcmVudC5hcHBlbmRDb21wb3NlZCh0aGlzLmNyZWF0ZUNvbXBvc2VkMlBhcmVudChsaW5lKSkpXHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0bGV0IGNoaWxkcmVuPXRoaXMuY29tcHV0ZWQuY2hpbGRyZW4uc3BsaWNlKDApXHJcblx0XHRcdGNoaWxkcmVuLmZvckVhY2gocm93PT57XHJcblx0XHRcdFx0cm93Lm9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpXHJcblx0XHRcdH0pXHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5jb21wdXRlZC5sYXN0Q29tcG9zZWQ9bnVsbFxyXG5cdFx0c3VwZXIub25BbGxDaGlsZHJlbkNvbXBvc2VkKClcclxuXHR9XHJcbn1cclxuIl19