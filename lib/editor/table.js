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

			var _computed$lastCompose = _slicedToArray(this.computed.lastComposed, 1);

			var tableWidth = _computed$lastCompose[0].width;

			var tableHeight = this.computed.lastComposed.reduce(function (prev, line) {
				return prev + line.height;
			}, 0);
			if (tableHeight <= height && tableWidth <= width) {
				(function () {
					var parent = _this2.context.parent;

					_this2.computed.lastComposed.forEach(function (line) {
						return parent.appendComposed(_this2.createComposed2Parent(line));
					});
				})();
			} else {
				var children = this.computed.children.splice(0);
				children.forEach(function (row) {
					row.onAllChildrenComposed();
				});
			}

			this.computed.lastComposed = null;
			_get(Object.getPrototypeOf(_class.prototype), "onAllChildrenComposed", this).call(this);
		}
	}]);

	return _class;
}((0, _editable3.default)(_content.Table));

exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvdGFibGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt3Q0FHdUIsT0FBTTtBQUMzQixRQUFLLFFBQUwsQ0FBYyxRQUFkLENBQXVCLElBQXZCLENBQTRCLEtBQTVCLEVBRDJCO0FBRTNCLE9BQUksOEZBQWdDLE1BQWhDLENBRnVCO29CQUdSLElBQUksS0FBSixDQUhRO09BR3RCLHlCQUhzQjtPQUdoQiwyQkFIZ0I7O0FBSTNCLE9BQUksS0FBRyxFQUFDLFlBQUQsRUFBTyxjQUFQLEVBQUgsQ0FKdUI7QUFLM0IsT0FBRyxLQUFLLFFBQUwsQ0FBYyxRQUFkLENBQXVCLE1BQXZCLElBQStCLENBQS9CO0FBQ0YsT0FBRyxHQUFILEdBQU8sS0FBSyxHQUFMLENBRFI7QUFFQSxVQUFPOztJQUFXLEVBQVg7SUFBZ0IsR0FBaEI7SUFBUCxDQVAyQjs7OztpREFVRTtBQUM3QixVQUFPLElBQVAsQ0FENkI7Ozs7Ozs7Ozt1Q0FPVjs7OzZCQUNBLEtBQUssa0JBQUwsR0FEQTs7T0FDZCxrQ0FEYztPQUNSLG9DQURROzs4Q0FFTSxLQUFLLFFBQUwsQ0FBYyxZQUFkLEtBRk47O09BRVAsc0NBQU4sTUFGYTs7QUFHbkIsT0FBSSxjQUFZLEtBQUssUUFBTCxDQUFjLFlBQWQsQ0FBMkIsTUFBM0IsQ0FBa0MsVUFBQyxJQUFELEVBQU8sSUFBUDtXQUFjLE9BQUssS0FBSyxNQUFMO0lBQW5CLEVBQStCLENBQWpFLENBQVosQ0FIZTtBQUluQixPQUFHLGVBQWEsTUFBYixJQUF1QixjQUFZLEtBQVosRUFBa0I7O1NBQ3BDLFNBQVEsT0FBSyxPQUFMLENBQVI7O0FBQ1AsWUFBSyxRQUFMLENBQWMsWUFBZCxDQUEyQixPQUEzQixDQUFtQzthQUFNLE9BQU8sY0FBUCxDQUFzQixPQUFLLHFCQUFMLENBQTJCLElBQTNCLENBQXRCO01BQU4sQ0FBbkM7U0FGMkM7SUFBNUMsTUFHSztBQUNKLFFBQUksV0FBUyxLQUFLLFFBQUwsQ0FBYyxRQUFkLENBQXVCLE1BQXZCLENBQThCLENBQTlCLENBQVQsQ0FEQTtBQUVKLGFBQVMsT0FBVCxDQUFpQixlQUFLO0FBQ3JCLFNBQUkscUJBQUosR0FEcUI7S0FBTCxDQUFqQixDQUZJO0lBSEw7O0FBVUEsUUFBSyxRQUFMLENBQWMsWUFBZCxHQUEyQixJQUEzQixDQWRtQjtBQWVuQiwyRkFmbUI7Ozs7O0VBbEJRIiwiZmlsZSI6InRhYmxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LHtQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcblxuaW1wb3J0IHtUYWJsZX0gZnJvbSBcIi4uL2NvbnRlbnRcIlxuaW1wb3J0IGVkaXRhYmxlIGZyb20gXCIuL2VkaXRhYmxlXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBlZGl0YWJsZShUYWJsZSl7XG5cdGNyZWF0ZUNvbXBvc2VkMlBhcmVudChwcm9wcyl7XG5cdFx0dGhpcy5jb21wdXRlZC5jb21wb3NlZC5wdXNoKHByb3BzKVxuXHRcdGxldCByb3c9c3VwZXIuY3JlYXRlQ29tcG9zZWQyUGFyZW50KHByb3BzKVxuXHRcdGxldCB7d2lkdGgsaGVpZ2h0fT1yb3cucHJvcHNcblx0XHRsZXQgcHM9e3dpZHRoLGhlaWdodH1cblx0XHRpZih0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLmxlbmd0aD09MSkvL3RoYXQncyB3aHkgZmlsbCB0aGlzLmNvbXB1dGVkLmNvbXBvc2VkIGluIGFwcGVuZENvbXBvc2VkXG5cdFx0XHRwcy5faWQ9dGhpcy5faWRcblx0XHRyZXR1cm4gPEdyb3VwIHsuLi5wc30+e3Jvd308L0dyb3VwPlxuXHR9XG5cblx0X2lzTGFzdENvbXBvc2VkRml0SW50b1BhcmVudCgpe1xuXHRcdHJldHVybiB0cnVlXG5cdH1cblxuXHQvKipcblx0ICogIGlzQWxsQ2hpbGRyZW5Db21wb3NlZCB3aWxsIGFmZmVjdCBsYXN0IGxpbmUgaGVpZ2h0LCBzbyBoZXJlIHdlIG5lZWQgbWFrZSBpdCByaWdodFxuXHQgKi9cblx0YXBwZW5kTGFzdENvbXBvc2VkKCl7XG5cdFx0bGV0IHt3aWR0aCxoZWlnaHR9PXRoaXMubmV4dEF2YWlsYWJsZVNwYWNlKClcblx0XHRsZXQgW3t3aWR0aDp0YWJsZVdpZHRofV09dGhpcy5jb21wdXRlZC5sYXN0Q29tcG9zZWRcblx0XHRsZXQgdGFibGVIZWlnaHQ9dGhpcy5jb21wdXRlZC5sYXN0Q29tcG9zZWQucmVkdWNlKChwcmV2LCBsaW5lKT0+cHJlditsaW5lLmhlaWdodCwwKVxuXHRcdGlmKHRhYmxlSGVpZ2h0PD1oZWlnaHQgJiYgdGFibGVXaWR0aDw9d2lkdGgpe1xuXHRcdFx0Y29uc3Qge3BhcmVudH09dGhpcy5jb250ZXh0XG5cdFx0XHR0aGlzLmNvbXB1dGVkLmxhc3RDb21wb3NlZC5mb3JFYWNoKGxpbmU9PnBhcmVudC5hcHBlbmRDb21wb3NlZCh0aGlzLmNyZWF0ZUNvbXBvc2VkMlBhcmVudChsaW5lKSkpXG5cdFx0fWVsc2V7XG5cdFx0XHRsZXQgY2hpbGRyZW49dGhpcy5jb21wdXRlZC5jaGlsZHJlbi5zcGxpY2UoMClcblx0XHRcdGNoaWxkcmVuLmZvckVhY2gocm93PT57XG5cdFx0XHRcdHJvdy5vbkFsbENoaWxkcmVuQ29tcG9zZWQoKVxuXHRcdFx0fSlcblx0XHR9XG5cblx0XHR0aGlzLmNvbXB1dGVkLmxhc3RDb21wb3NlZD1udWxsXG5cdFx0c3VwZXIub25BbGxDaGlsZHJlbkNvbXBvc2VkKClcblx0fVxufVxuIl19