"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _any = require("./any");

var _group = require("../compose/group");

var _group2 = _interopRequireDefault(_group);

var _cursor = require("../editor/cursor");

var _cursor2 = _interopRequireDefault(_cursor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Document = function (_HasChild) {
	_inherits(Document, _HasChild);

	function Document() {
		var _Object$getPrototypeO;

		var _temp, _this, _ret;

		_classCallCheck(this, Document);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Document)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = { width: _this.props.width, height: _this.props.height }, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Document, [{
		key: "render",
		value: function render() {
			var composed = this.composed;
			var _state = this.state;
			var width = _state.width;
			var height = _state.height;


			var y = 0;
			return _react2.default.createElement(
				"svg",
				_extends({}, this.props, { width: width, height: height, viewBox: "0 0 " + width + " " + height }),
				this.props.children,
				_react2.default.createElement(
					Composed,
					null,
					composed.map(function (a, i) {
						var section = _react2.default.createElement(
							_group2.default,
							{ key: i, y: y },
							a
						);
						y += a.props.height;
						return section;
					})
				),
				_react2.default.createElement(_cursor2.default, null)
			);
		}
	}, {
		key: "getChildContext",
		value: function getChildContext() {
			var _props = this.props;
			var width = _props.width;
			var height = _props.height;
			var pageGap = _props.pageGap;

			return Object.assign(_get(Object.getPrototypeOf(Document.prototype), "getChildContext", this).call(this), {
				canvas: { width: width, height: height, pageGap: pageGap }
			});
		}
	}, {
		key: "appendComposed",
		value: function appendComposed(section) {
			var composed = this.composed;
			var _state2 = this.state;
			var width = _state2.width;
			var height = _state2.height;

			composed.push(section);

			var minWidth = composed.reduce(function (prev, a) {
				return Math.max(prev, a.props.width);
			}, 0);
			var minHeight = composed.reduce(function (prev, a) {
				return prev + a.props.height;
			}, 0);

			if (minWidth > width) width = minWidth;

			if (minHeight > height) height = minHeight + this.props.pageGap;

			this.setState({ width: width, height: height });
		}
	}]);

	return Document;
}(_any.HasChild);

Document.childContextTypes = Object.assign({
	canvas: _react.PropTypes.object
}, _any.HasChild.childContextTypes);
Document.defaultProps = {
	width: 600,
	height: 100,
	pageGap: 20,
	style: {
		background: "lightgray"
	}
};
exports.default = Document;

var Composed = function (_Group) {
	_inherits(Composed, _Group);

	function Composed() {
		_classCallCheck(this, Composed);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Composed).apply(this, arguments));
	}

	return Composed;
}(_group2.default);

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7Ozs7OztvTUFDcEIsUUFBTSxFQUFDLE9BQU0sTUFBSyxLQUFMLENBQVcsS0FBWCxFQUFrQixRQUFPLE1BQUssS0FBTCxDQUFXLE1BQVg7OztjQURsQjs7MkJBR1Q7T0FDSCxXQUFVLEtBQVYsU0FERztnQkFFWSxLQUFLLEtBQUwsQ0FGWjtPQUVILHFCQUZHO09BRUksdUJBRko7OztBQUlWLE9BQUksSUFBRSxDQUFGLENBSk07QUFLSixVQUNMOztpQkFBUyxLQUFLLEtBQUwsSUFBWSxPQUFPLEtBQVAsRUFBYyxRQUFRLE1BQVIsRUFBZ0Isa0JBQWdCLGNBQVMsTUFBekIsR0FBbkQ7SUFDRSxLQUFLLEtBQUwsQ0FBVyxRQUFYO0lBQ0Q7QUFBQyxhQUFEOztLQUVDLFNBQVMsR0FBVCxDQUFhLFVBQUMsQ0FBRCxFQUFHLENBQUgsRUFBTztBQUNuQixVQUFJLFVBQVE7O1NBQU8sS0FBSyxDQUFMLEVBQVEsR0FBRyxDQUFILEVBQWY7T0FBc0IsQ0FBdEI7T0FBUixDQURlO0FBRW5CLFdBQUcsRUFBRSxLQUFGLENBQVEsTUFBUixDQUZnQjtBQUduQixhQUFPLE9BQVAsQ0FIbUI7TUFBUCxDQUZkO0tBRkQ7SUFXQyxxREFYRDtJQURLLENBTEk7Ozs7b0NBMkJTO2dCQUNpQixLQUFLLEtBQUwsQ0FEakI7T0FDTixxQkFETTtPQUNBLHVCQURBO09BQ1EseUJBRFI7O0FBRWIsVUFBTyxPQUFPLE1BQVAsNEJBaENNLHdEQWdDTixFQUFzQztBQUN6QyxZQUFRLEVBQUMsWUFBRCxFQUFPLGNBQVAsRUFBZSxnQkFBZixFQUFSO0lBREcsQ0FBUCxDQUZhOzs7O2lDQU9MLFNBQVE7T0FDZixXQUFVLEtBQVYsU0FEZTtpQkFFRixLQUFLLEtBQUwsQ0FGRTtPQUVqQixzQkFGaUI7T0FFVix3QkFGVTs7QUFHdEIsWUFBUyxJQUFULENBQWMsT0FBZCxFQUhzQjs7QUFLdEIsT0FBSSxXQUFTLFNBQVMsTUFBVCxDQUFnQixVQUFDLElBQUQsRUFBTyxDQUFQO1dBQVcsS0FBSyxHQUFMLENBQVMsSUFBVCxFQUFlLEVBQUUsS0FBRixDQUFRLEtBQVI7SUFBMUIsRUFBeUMsQ0FBekQsQ0FBVCxDQUxrQjtBQU10QixPQUFJLFlBQVUsU0FBUyxNQUFULENBQWdCLFVBQUMsSUFBRCxFQUFPLENBQVA7V0FBVyxPQUFLLEVBQUUsS0FBRixDQUFRLE1BQVI7SUFBaEIsRUFBK0IsQ0FBL0MsQ0FBVixDQU5rQjs7QUFRdEIsT0FBRyxXQUFTLEtBQVQsRUFDRixRQUFNLFFBQU4sQ0FERDs7QUFHQSxPQUFHLFlBQVUsTUFBVixFQUNGLFNBQU8sWUFBVSxLQUFLLEtBQUwsQ0FBVyxPQUFYLENBRGxCOztBQUdBLFFBQUssUUFBTCxDQUFjLEVBQUMsWUFBRCxFQUFRLGNBQVIsRUFBZCxFQWRzQjs7OztRQXJDSDs7O1NBMEJWLG9CQUFrQixPQUFPLE1BQVAsQ0FBYztBQUNuQyxTQUFRLGlCQUFVLE1BQVY7Q0FEYSxFQUV2QixjQUFTLGlCQUFUO0FBNUJlLFNBc0RiLGVBQWE7QUFDbkIsUUFBTyxHQUFQO0FBQ0EsU0FBTyxHQUFQO0FBQ0EsVUFBUyxFQUFUO0FBQ0EsUUFBTztBQUNOLGNBQVcsV0FBWDtFQUREOztrQkExRG1COztJQWdFZiIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtIYXNDaGlsZH0gZnJvbSBcIi4vYW55XCJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZS9ncm91cFwiXG5pbXBvcnQgQ3Vyc29yIGZyb20gXCIuLi9lZGl0b3IvY3Vyc29yXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9jdW1lbnQgZXh0ZW5kcyBIYXNDaGlsZHtcblx0c3RhdGU9e3dpZHRoOnRoaXMucHJvcHMud2lkdGgsIGhlaWdodDp0aGlzLnByb3BzLmhlaWdodH1cblxuICAgIHJlbmRlcigpe1xuXHRcdGNvbnN0IHtjb21wb3NlZH09dGhpc1xuXHRcdGNvbnN0IHt3aWR0aCwgaGVpZ2h0fT10aGlzLnN0YXRlXG5cdFxuXHRcdGxldCB5PTBcbiAgICAgICAgcmV0dXJuIChcblx0XHRcdDxzdmcgey4uLnRoaXMucHJvcHN9IHdpZHRoPXt3aWR0aH0gaGVpZ2h0PXtoZWlnaHR9IHZpZXdCb3g9e2AwIDAgJHt3aWR0aH0gJHtoZWlnaHR9YH0+XG5cdFx0XHRcdHt0aGlzLnByb3BzLmNoaWxkcmVufVxuXHRcdFx0XHQ8Q29tcG9zZWQ+XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb21wb3NlZC5tYXAoKGEsaSk9Pntcblx0XHRcdFx0XHRcdGxldCBzZWN0aW9uPTxHcm91cCBrZXk9e2l9IHk9e3l9PnthfTwvR3JvdXA+XG5cdFx0XHRcdFx0XHR5Kz1hLnByb3BzLmhlaWdodFxuXHRcdFx0XHRcdFx0cmV0dXJuIHNlY3Rpb25cblx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9XG5cdFx0XHRcdDwvQ29tcG9zZWQ+XG5cdFx0XHRcdDxDdXJzb3IvPlxuXHRcdFx0PC9zdmc+XG5cdFx0KVxuXG4gICAgfVxuXG4gICAgc3RhdGljIGNoaWxkQ29udGV4dFR5cGVzPU9iamVjdC5hc3NpZ24oe1xuICAgICAgICBjYW52YXM6IFByb3BUeXBlcy5vYmplY3RcbiAgICB9LEhhc0NoaWxkLmNoaWxkQ29udGV4dFR5cGVzKVxuXG4gICAgZ2V0Q2hpbGRDb250ZXh0KCl7XG4gICAgICAgIGNvbnN0IHt3aWR0aCxoZWlnaHQsIHBhZ2VHYXB9PXRoaXMucHJvcHNcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oc3VwZXIuZ2V0Q2hpbGRDb250ZXh0KCkse1xuICAgICAgICAgICAgY2FudmFzOiB7d2lkdGgsaGVpZ2h0LCBwYWdlR2FwfVxuICAgICAgICB9KVxuICAgIH1cblxuXHRhcHBlbmRDb21wb3NlZChzZWN0aW9uKXtcblx0XHRjb25zdCB7Y29tcG9zZWR9PXRoaXNcblx0XHRsZXQge3dpZHRoLCBoZWlnaHR9PXRoaXMuc3RhdGVcblx0XHRjb21wb3NlZC5wdXNoKHNlY3Rpb24pXG5cblx0XHRsZXQgbWluV2lkdGg9Y29tcG9zZWQucmVkdWNlKChwcmV2LCBhKT0+TWF0aC5tYXgocHJldiwgYS5wcm9wcy53aWR0aCksMClcblx0XHRsZXQgbWluSGVpZ2h0PWNvbXBvc2VkLnJlZHVjZSgocHJldiwgYSk9PnByZXYrYS5wcm9wcy5oZWlnaHQsMClcblxuXHRcdGlmKG1pbldpZHRoPndpZHRoKVxuXHRcdFx0d2lkdGg9bWluV2lkdGhcblxuXHRcdGlmKG1pbkhlaWdodD5oZWlnaHQpXG5cdFx0XHRoZWlnaHQ9bWluSGVpZ2h0K3RoaXMucHJvcHMucGFnZUdhcFxuXG5cdFx0dGhpcy5zZXRTdGF0ZSh7d2lkdGgsIGhlaWdodH0pXG5cdH1cblxuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtcblx0XHR3aWR0aDogNjAwLFxuXHRcdGhlaWdodDoxMDAsXG5cdFx0cGFnZUdhcDogMjAsXG5cdFx0c3R5bGU6IHtcblx0XHRcdGJhY2tncm91bmQ6XCJsaWdodGdyYXlcIlxuXHRcdH1cblx0fVxufVxuXG5jbGFzcyBDb21wb3NlZCBleHRlbmRzIEdyb3Vwe31cbiJdfQ==