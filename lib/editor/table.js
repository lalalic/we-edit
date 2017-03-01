"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray2 = require("babel-runtime/helpers/slicedToArray");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_editable) {
	(0, _inherits3.default)(_class, _editable);

	function _class() {
		(0, _classCallCheck3.default)(this, _class);
		return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));
	}

	(0, _createClass3.default)(_class, [{
		key: "createComposed2Parent",
		value: function createComposed2Parent(props) {
			this.computed.composed.push(props);
			var row = (0, _get3.default)(_class.prototype.__proto__ || (0, _getPrototypeOf2.default)(_class.prototype), "createComposed2Parent", this).call(this, props);
			var _row$props = row.props,
			    width = _row$props.width,
			    height = _row$props.height;

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

			var _nextAvailableSpace = this.nextAvailableSpace(),
			    width = _nextAvailableSpace.width,
			    height = _nextAvailableSpace.height;

			var _computed$lastCompose = (0, _slicedToArray3.default)(this.computed.lastComposed, 1),
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
			(0, _get3.default)(_class.prototype.__proto__ || (0, _getPrototypeOf2.default)(_class.prototype), "onAllChildrenComposed", this).call(this);
		}
	}]);
	return _class;
}((0, _editable3.default)(_content.Table));

exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvdGFibGUuanMiXSwibmFtZXMiOlsicHJvcHMiLCJjb21wdXRlZCIsImNvbXBvc2VkIiwicHVzaCIsInJvdyIsIndpZHRoIiwiaGVpZ2h0IiwicHMiLCJsZW5ndGgiLCJfaWQiLCJuZXh0QXZhaWxhYmxlU3BhY2UiLCJsYXN0Q29tcG9zZWQiLCJ0YWJsZVdpZHRoIiwidGFibGVIZWlnaHQiLCJyZWR1Y2UiLCJwcmV2IiwibGluZSIsInBhcmVudCIsImNvbnRleHQiLCJmb3JFYWNoIiwiYXBwZW5kQ29tcG9zZWQiLCJjcmVhdGVDb21wb3NlZDJQYXJlbnQiLCJjaGlsZHJlbiIsInNwbGljZSIsIm9uQWxsQ2hpbGRyZW5Db21wb3NlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozt3Q0FHdUJBLEssRUFBTTtBQUMzQixRQUFLQyxRQUFMLENBQWNDLFFBQWQsQ0FBdUJDLElBQXZCLENBQTRCSCxLQUE1QjtBQUNBLE9BQUlJLGtKQUFnQ0osS0FBaEMsQ0FBSjtBQUYyQixvQkFHUkksSUFBSUosS0FISTtBQUFBLE9BR3RCSyxLQUhzQixjQUd0QkEsS0FIc0I7QUFBQSxPQUdoQkMsTUFIZ0IsY0FHaEJBLE1BSGdCOztBQUkzQixPQUFJQyxLQUFHLEVBQUNGLFlBQUQsRUFBT0MsY0FBUCxFQUFQO0FBQ0EsT0FBRyxLQUFLTCxRQUFMLENBQWNDLFFBQWQsQ0FBdUJNLE1BQXZCLElBQStCLENBQWxDLEVBQW9DO0FBQ25DRCxPQUFHRSxHQUFILEdBQU8sS0FBS0EsR0FBWjtBQUNELFVBQU87QUFBQTtBQUFXRixNQUFYO0FBQWdCSDtBQUFoQixJQUFQO0FBQ0E7OztpREFFNkI7QUFDN0IsVUFBTyxJQUFQO0FBQ0E7O0FBRUQ7Ozs7Ozt1Q0FHb0I7QUFBQTs7QUFBQSw2QkFDQSxLQUFLTSxrQkFBTCxFQURBO0FBQUEsT0FDZEwsS0FEYyx1QkFDZEEsS0FEYztBQUFBLE9BQ1JDLE1BRFEsdUJBQ1JBLE1BRFE7O0FBQUEsNERBRU0sS0FBS0wsUUFBTCxDQUFjVSxZQUZwQjtBQUFBLE9BRVBDLFVBRk8sNEJBRWJQLEtBRmE7O0FBR25CLE9BQUlRLGNBQVksS0FBS1osUUFBTCxDQUFjVSxZQUFkLENBQTJCRyxNQUEzQixDQUFrQyxVQUFDQyxJQUFELEVBQU9DLElBQVA7QUFBQSxXQUFjRCxPQUFLQyxLQUFLVixNQUF4QjtBQUFBLElBQWxDLEVBQWlFLENBQWpFLENBQWhCO0FBQ0EsT0FBR08sZUFBYVAsTUFBYixJQUF1Qk0sY0FBWVAsS0FBdEMsRUFBNEM7QUFBQSxRQUNwQ1ksTUFEb0MsR0FDNUIsS0FBS0MsT0FEdUIsQ0FDcENELE1BRG9DOztBQUUzQyxTQUFLaEIsUUFBTCxDQUFjVSxZQUFkLENBQTJCUSxPQUEzQixDQUFtQztBQUFBLFlBQU1GLE9BQU9HLGNBQVAsQ0FBc0IsT0FBS0MscUJBQUwsQ0FBMkJMLElBQTNCLENBQXRCLENBQU47QUFBQSxLQUFuQztBQUNBLElBSEQsTUFHSztBQUNKLFFBQUlNLFdBQVMsS0FBS3JCLFFBQUwsQ0FBY3FCLFFBQWQsQ0FBdUJDLE1BQXZCLENBQThCLENBQTlCLENBQWI7QUFDQUQsYUFBU0gsT0FBVCxDQUFpQixlQUFLO0FBQ3JCZixTQUFJb0IscUJBQUo7QUFDQSxLQUZEO0FBR0E7O0FBRUQsUUFBS3ZCLFFBQUwsQ0FBY1UsWUFBZCxHQUEyQixJQUEzQjtBQUNBO0FBQ0E7OztFQWxDMkIsdUMiLCJmaWxlIjoidGFibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3Qse1Byb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXHJcblxyXG5pbXBvcnQge1RhYmxlfSBmcm9tIFwiLi4vY29udGVudFwiXHJcbmltcG9ydCBlZGl0YWJsZSBmcm9tIFwiLi9lZGl0YWJsZVwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIGVkaXRhYmxlKFRhYmxlKXtcclxuXHRjcmVhdGVDb21wb3NlZDJQYXJlbnQocHJvcHMpe1xyXG5cdFx0dGhpcy5jb21wdXRlZC5jb21wb3NlZC5wdXNoKHByb3BzKVxyXG5cdFx0bGV0IHJvdz1zdXBlci5jcmVhdGVDb21wb3NlZDJQYXJlbnQocHJvcHMpXHJcblx0XHRsZXQge3dpZHRoLGhlaWdodH09cm93LnByb3BzXHJcblx0XHRsZXQgcHM9e3dpZHRoLGhlaWdodH1cclxuXHRcdGlmKHRoaXMuY29tcHV0ZWQuY29tcG9zZWQubGVuZ3RoPT0xKS8vdGhhdCdzIHdoeSBmaWxsIHRoaXMuY29tcHV0ZWQuY29tcG9zZWQgaW4gYXBwZW5kQ29tcG9zZWRcclxuXHRcdFx0cHMuX2lkPXRoaXMuX2lkXHJcblx0XHRyZXR1cm4gPEdyb3VwIHsuLi5wc30+e3Jvd308L0dyb3VwPlxyXG5cdH1cclxuXHJcblx0X2lzTGFzdENvbXBvc2VkRml0SW50b1BhcmVudCgpe1xyXG5cdFx0cmV0dXJuIHRydWVcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqICBpc0FsbENoaWxkcmVuQ29tcG9zZWQgd2lsbCBhZmZlY3QgbGFzdCBsaW5lIGhlaWdodCwgc28gaGVyZSB3ZSBuZWVkIG1ha2UgaXQgcmlnaHRcclxuXHQgKi9cclxuXHRhcHBlbmRMYXN0Q29tcG9zZWQoKXtcclxuXHRcdGxldCB7d2lkdGgsaGVpZ2h0fT10aGlzLm5leHRBdmFpbGFibGVTcGFjZSgpXHJcblx0XHRsZXQgW3t3aWR0aDp0YWJsZVdpZHRofV09dGhpcy5jb21wdXRlZC5sYXN0Q29tcG9zZWRcclxuXHRcdGxldCB0YWJsZUhlaWdodD10aGlzLmNvbXB1dGVkLmxhc3RDb21wb3NlZC5yZWR1Y2UoKHByZXYsIGxpbmUpPT5wcmV2K2xpbmUuaGVpZ2h0LDApXHJcblx0XHRpZih0YWJsZUhlaWdodDw9aGVpZ2h0ICYmIHRhYmxlV2lkdGg8PXdpZHRoKXtcclxuXHRcdFx0Y29uc3Qge3BhcmVudH09dGhpcy5jb250ZXh0XHJcblx0XHRcdHRoaXMuY29tcHV0ZWQubGFzdENvbXBvc2VkLmZvckVhY2gobGluZT0+cGFyZW50LmFwcGVuZENvbXBvc2VkKHRoaXMuY3JlYXRlQ29tcG9zZWQyUGFyZW50KGxpbmUpKSlcclxuXHRcdH1lbHNle1xyXG5cdFx0XHRsZXQgY2hpbGRyZW49dGhpcy5jb21wdXRlZC5jaGlsZHJlbi5zcGxpY2UoMClcclxuXHRcdFx0Y2hpbGRyZW4uZm9yRWFjaChyb3c9PntcclxuXHRcdFx0XHRyb3cub25BbGxDaGlsZHJlbkNvbXBvc2VkKClcclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmNvbXB1dGVkLmxhc3RDb21wb3NlZD1udWxsXHJcblx0XHRzdXBlci5vbkFsbENoaWxkcmVuQ29tcG9zZWQoKVxyXG5cdH1cclxufVxyXG4iXX0=