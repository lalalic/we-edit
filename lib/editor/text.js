"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _content = require("../content");

var _editable = require("./editable");

var _editable2 = _interopRequireDefault(_editable);

var _group = require("../composed/group");

var _group2 = _interopRequireDefault(_group);

var _cursor = require("./cursor");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Super = (0, _editable2.default)(_content.Text);

var _class = function (_Super) {
	_inherits(_class, _Super);

	function _class() {
		_classCallCheck(this, _class);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
	}

	_createClass(_class, [{
		key: "createComposedPiece",
		value: function createComposedPiece(props) {
			var _this2 = this;

			var width = props.width;
			var height = props.height;
			var end = props.end;
			var children = props.children;

			var others = _objectWithoutProperties(props, ["width", "height", "end", "children"]);

			var loc = this.state.loc;

			var style = this.getStyle();

			var cursor = null;
			if (typeof loc != 'undefined') {
				if (end - children.length < loc && loc <= end) {
					var locText = this.state.content.substring(end - children.length, loc);
					var composer = new this.constructor.WordWrapper(locText, style);
					var size = composer.next({ width: Number.MAX_SAFE_INTEGER });
					cursor = _react2.default.createElement(_cursor.Shape, _extends({ key: "cursorshape", ref: function ref(a) {
							return _this2.updateCursor(a);
						} }, size, { style: style }));
				}
			}

			return _react2.default.createElement(
				_group2.default,
				{ width: width, height: height },
				cursor,
				_react2.default.createElement(
					"text",
					_extends({}, others, { onClick: function onClick(e) {
							return _this2.onClick(e, props);
						} }),
					children
				)
			);
		}
	}, {
		key: "onClick",
		value: function onClick(event, text) {
			var _this3 = this;

			var _event$nativeEvent = event.nativeEvent;
			var offsetX = _event$nativeEvent.offsetX;
			var offsetY = _event$nativeEvent.offsetY;
			var target = event.target;

			var style = this.getStyle();
			var composer = new this.constructor.WordWrapper(text.children, style);
			var loc = composer.next({ width: offsetX }) || { end: 0 };
			var index = text.end - text.children.length + loc.end;
			this.setState({ loc: index }, function () {
				return _this3.reCompose();
			});
		}
	}, {
		key: "updateCursor",
		value: function updateCursor(ref) {
			this.context.cursor().setState({ target: this, shape: ref });
		}
	}, {
		key: "insert",
		value: function insert(str) {
			var _this4 = this;

			var _state = this.state;
			var content = _state.content;
			var loc = _state.loc;

			this.setState({ content: content.splice(loc, 0, str), loc: loc + str.length }, function (e) {
				return _this4.reCompose();
			});
		}
	}, {
		key: "blur",
		value: function blur() {
			this.setState({ loc: undefined });
		}
	}]);

	return _class;
}(Super);

_class.contextTypes = Object.assign({
	cursor: _react.PropTypes.func
}, Super.contextTypes);
exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvdGV4dC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQUksUUFBTSxzQ0FBTjs7Ozs7Ozs7Ozs7OztzQ0FFb0IsT0FBTTs7O09BQ3JCLFFBQXlDLE1BQXpDLE1BRHFCO09BQ2QsU0FBa0MsTUFBbEMsT0FEYztPQUNOLE1BQTBCLE1BQTFCLElBRE07T0FDRCxXQUFxQixNQUFyQixTQURDOztPQUNZLGtDQUFRLCtDQURwQjs7T0FFckIsTUFBSyxLQUFLLEtBQUwsQ0FBTCxJQUZxQjs7QUFHdEIsT0FBSSxRQUFNLEtBQUssUUFBTCxFQUFOLENBSGtCOztBQUs1QixPQUFJLFNBQU8sSUFBUCxDQUx3QjtBQU01QixPQUFHLE9BQU8sR0FBUCxJQUFhLFdBQWIsRUFBeUI7QUFDM0IsUUFBRyxNQUFJLFNBQVMsTUFBVCxHQUFnQixHQUFwQixJQUEyQixPQUFLLEdBQUwsRUFBUztBQUN0QyxTQUFJLFVBQVEsS0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixTQUFuQixDQUE2QixNQUFJLFNBQVMsTUFBVCxFQUFpQixHQUFsRCxDQUFSLENBRGtDO0FBRXRDLFNBQUksV0FBUyxJQUFJLEtBQUssV0FBTCxDQUFpQixXQUFqQixDQUE2QixPQUFqQyxFQUEwQyxLQUExQyxDQUFULENBRmtDO0FBR3RDLFNBQUksT0FBSyxTQUFTLElBQVQsQ0FBYyxFQUFDLE9BQU0sT0FBTyxnQkFBUCxFQUFyQixDQUFMLENBSGtDO0FBSXRDLGNBQU8sd0RBQWEsS0FBSSxhQUFKLEVBQWtCLEtBQUs7Y0FBRyxPQUFLLFlBQUwsQ0FBa0IsQ0FBbEI7T0FBSCxJQUE2QixRQUFNLE9BQU8sS0FBUCxHQUF2RSxDQUFQLENBSnNDO0tBQXZDO0lBREQ7O0FBU00sVUFDTDs7TUFBTyxPQUFPLEtBQVAsRUFBYyxRQUFRLE1BQVIsRUFBckI7SUFDRSxNQURGO0lBRUM7O2tCQUFVLFVBQVEsU0FBUztjQUFHLE9BQUssT0FBTCxDQUFhLENBQWIsRUFBZSxLQUFmO09BQUgsR0FBM0I7S0FBc0QsUUFBdEQ7S0FGRDtJQURLLENBZnNCOzs7OzBCQXVCbEIsT0FBTyxNQUFLOzs7NEJBQ3lCLE1BQXhDLFlBRGU7T0FDRixxQ0FERTtPQUNPLHFDQURQO09BQ2lCLFNBQVEsTUFBUixPQURqQjs7QUFFaEIsT0FBSSxRQUFNLEtBQUssUUFBTCxFQUFOLENBRlk7QUFHaEIsT0FBSSxXQUFTLElBQUksS0FBSyxXQUFMLENBQWlCLFdBQWpCLENBQTZCLEtBQUssUUFBTCxFQUFlLEtBQWhELENBQVQsQ0FIWTtBQUloQixPQUFJLE1BQUksU0FBUyxJQUFULENBQWMsRUFBQyxPQUFNLE9BQU4sRUFBZixLQUFnQyxFQUFDLEtBQUksQ0FBSixFQUFqQyxDQUpRO0FBS2hCLE9BQUksUUFBTSxLQUFLLEdBQUwsR0FBUyxLQUFLLFFBQUwsQ0FBYyxNQUFkLEdBQXFCLElBQUksR0FBSixDQUx4QjtBQU10QixRQUFLLFFBQUwsQ0FBYyxFQUFDLEtBQUksS0FBSixFQUFmLEVBQTJCO1dBQUksT0FBSyxTQUFMO0lBQUosQ0FBM0IsQ0FOc0I7Ozs7K0JBU1YsS0FBSTtBQUNoQixRQUFLLE9BQUwsQ0FBYSxNQUFiLEdBQXNCLFFBQXRCLENBQStCLEVBQUMsUUFBTyxJQUFQLEVBQWEsT0FBTSxHQUFOLEVBQTdDLEVBRGdCOzs7O3lCQUlWLEtBQUk7OztnQkFDVyxLQUFLLEtBQUwsQ0FEWDtPQUNILHlCQURHO09BQ00saUJBRE47O0FBRVYsUUFBSyxRQUFMLENBQWMsRUFBQyxTQUFRLFFBQVEsTUFBUixDQUFlLEdBQWYsRUFBbUIsQ0FBbkIsRUFBcUIsR0FBckIsQ0FBUixFQUFtQyxLQUFJLE1BQUksSUFBSSxNQUFKLEVBQTFELEVBQXNFO1dBQUcsT0FBSyxTQUFMO0lBQUgsQ0FBdEUsQ0FGVTs7Ozt5QkFLTDtBQUNMLFFBQUssUUFBTCxDQUFjLEVBQUMsS0FBSSxTQUFKLEVBQWYsRUFESzs7Ozs7RUExQ3NCOztPQThDckIsZUFBYSxPQUFPLE1BQVAsQ0FBYztBQUNqQyxTQUFRLGlCQUFVLElBQVY7Q0FEVyxFQUVsQixNQUFNLFlBQU4iLCJmaWxlIjoidGV4dC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCx7UHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtUZXh0fSBmcm9tIFwiLi4vY29udGVudFwiXG5pbXBvcnQgZWRpdGFibGUgZnJvbSBcIi4vZWRpdGFibGVcIlxuXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcbmltcG9ydCB7U2hhcGUgYXMgQ3Vyc29yU2hhcGV9IGZyb20gXCIuL2N1cnNvclwiXG5cbmxldCBTdXBlcj1lZGl0YWJsZShUZXh0KVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBTdXBlcntcbiAgICBjcmVhdGVDb21wb3NlZFBpZWNlKHByb3BzKXtcblx0XHRjb25zdCB7d2lkdGgsIGhlaWdodCwgZW5kLCBjaGlsZHJlbiwgLi4ub3RoZXJzfT1wcm9wc1xuXHRcdGNvbnN0IHtsb2N9PXRoaXMuc3RhdGVcbiAgICAgICAgbGV0IHN0eWxlPXRoaXMuZ2V0U3R5bGUoKVxuXG5cdFx0bGV0IGN1cnNvcj1udWxsXG5cdFx0aWYodHlwZW9mKGxvYykhPSd1bmRlZmluZWQnKXtcblx0XHRcdGlmKGVuZC1jaGlsZHJlbi5sZW5ndGg8bG9jICYmIGxvYzw9ZW5kKXtcblx0XHRcdFx0bGV0IGxvY1RleHQ9dGhpcy5zdGF0ZS5jb250ZW50LnN1YnN0cmluZyhlbmQtY2hpbGRyZW4ubGVuZ3RoLCBsb2MpXG5cdFx0XHRcdGxldCBjb21wb3Nlcj1uZXcgdGhpcy5jb25zdHJ1Y3Rvci5Xb3JkV3JhcHBlcihsb2NUZXh0LCBzdHlsZSlcblx0XHRcdFx0bGV0IHNpemU9Y29tcG9zZXIubmV4dCh7d2lkdGg6TnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJ9KVxuXHRcdFx0XHRjdXJzb3I9PEN1cnNvclNoYXBlIGtleT1cImN1cnNvcnNoYXBlXCIgcmVmPXthPT50aGlzLnVwZGF0ZUN1cnNvcihhKX0gey4uLnNpemV9IHN0eWxlPXtzdHlsZX0vPlxuXHRcdFx0fVxuXHRcdH1cblxuICAgICAgICByZXR1cm4gKFxuXHRcdFx0PEdyb3VwIHdpZHRoPXt3aWR0aH0gaGVpZ2h0PXtoZWlnaHR9PlxuXHRcdFx0XHR7Y3Vyc29yfVxuXHRcdFx0XHQ8dGV4dCB7Li4ub3RoZXJzfSBvbkNsaWNrPXtlPT50aGlzLm9uQ2xpY2soZSxwcm9wcyl9PntjaGlsZHJlbn08L3RleHQ+XG5cdFx0XHQ8L0dyb3VwPlxuXHRcdClcbiAgICB9XG5cbiAgICBvbkNsaWNrKGV2ZW50LCB0ZXh0KXtcblx0XHRjb25zdCB7bmF0aXZlRXZlbnQ6e29mZnNldFgsIG9mZnNldFl9LCB0YXJnZXR9PWV2ZW50XG4gICAgICAgIGxldCBzdHlsZT10aGlzLmdldFN0eWxlKClcbiAgICAgICAgbGV0IGNvbXBvc2VyPW5ldyB0aGlzLmNvbnN0cnVjdG9yLldvcmRXcmFwcGVyKHRleHQuY2hpbGRyZW4sIHN0eWxlKVxuICAgICAgICBsZXQgbG9jPWNvbXBvc2VyLm5leHQoe3dpZHRoOm9mZnNldFh9KXx8e2VuZDowfVxuICAgICAgICBsZXQgaW5kZXg9dGV4dC5lbmQtdGV4dC5jaGlsZHJlbi5sZW5ndGgrbG9jLmVuZFxuXHRcdHRoaXMuc2V0U3RhdGUoe2xvYzppbmRleH0sICgpPT50aGlzLnJlQ29tcG9zZSgpKVxuICAgIH1cblxuXHR1cGRhdGVDdXJzb3IocmVmKXtcblx0XHR0aGlzLmNvbnRleHQuY3Vyc29yKCkuc2V0U3RhdGUoe3RhcmdldDp0aGlzLCBzaGFwZTpyZWZ9KVxuXHR9XG5cblx0aW5zZXJ0KHN0cil7XG5cdFx0Y29uc3Qge2NvbnRlbnQsIGxvY309dGhpcy5zdGF0ZVxuXHRcdHRoaXMuc2V0U3RhdGUoe2NvbnRlbnQ6Y29udGVudC5zcGxpY2UobG9jLDAsc3RyKSwgbG9jOmxvYytzdHIubGVuZ3RofSxlPT50aGlzLnJlQ29tcG9zZSgpKVxuXHR9XG5cblx0Ymx1cigpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe2xvYzp1bmRlZmluZWR9KVxuXHR9XG5cblx0c3RhdGljIGNvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcblx0XHRjdXJzb3I6IFByb3BUeXBlcy5mdW5jXG5cdH0sU3VwZXIuY29udGV4dFR5cGVzKVxufVxuIl19