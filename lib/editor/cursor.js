"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Shape = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Cursor = function (_Component) {
	_inherits(Cursor, _Component);

	function Cursor() {
		var _Object$getPrototypeO;

		var _temp, _this, _ret;

		_classCallCheck(this, Cursor);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Cursor)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = { target: null, shape: null }, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Cursor, [{
		key: "render",
		value: function render() {
			return null;
		}
	}, {
		key: "componentDidUpdate",
		value: function componentDidUpdate(prevProps, prevState) {
			var _state = this.state;
			var target = _state.target;
			var shape = _state.shape;
			var prevTarget = prevState.target;
			var prevShape = prevState.shape;

			if (target != prevTarget && prevTarget) prevTarget.blur();

			if (shape != prevShape && prevShape) prevShape.setState({ show: false });
		}
	}, {
		key: "replaceFocusedContent",
		value: function replaceFocusedContent(content) {
			this.state.target.insert(content);
		}
	}]);

	return Cursor;
}(_react.Component);

Cursor.displayName = "cursor";
exports.default = Cursor;

var Shape = exports.Shape = function (_Component2) {
	_inherits(Shape, _Component2);

	function Shape() {
		var _Object$getPrototypeO2;

		var _temp2, _this2, _ret2;

		_classCallCheck(this, Shape);

		for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			args[_key2] = arguments[_key2];
		}

		return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn(this, (_Object$getPrototypeO2 = Object.getPrototypeOf(Shape)).call.apply(_Object$getPrototypeO2, [this].concat(args))), _this2), _this2.state = { show: true }, _temp2), _possibleConstructorReturn(_this2, _ret2);
	}

	_createClass(Shape, [{
		key: "render",
		value: function render() {
			var show = this.state.show;

			if (!show) return null;

			var _props = this.props;
			var width = _props.width;
			var height = _props.height;
			var style = _props.style;

			return _react2.default.createElement("line", {
				x1: width,
				y1: 0,
				x2: width,
				y2: -height,
				strokeWidth: 1,
				stroke: style.color || "black"
			});
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			var node = _reactDom2.default.findDOMNode(this);
			var x = -1000,
			    show = false;
			this.timer = setInterval(function (a) {
				node.setAttribute('transform', "translate(" + (show ? 0 : x) + ",0)");
				show = !show;
			}, 700);
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			this.timer && clearInterval(this.timer);
		}
	}]);

	return Shape;
}(_react.Component);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvY3Vyc29yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7Ozs7a01BRXBCLFFBQU0sRUFBQyxRQUFPLElBQVAsRUFBYSxPQUFPLElBQVA7OztjQUZBOzsyQkFJVDtBQUNWLFVBQU8sSUFBUCxDQURVOzs7O3FDQUlRLFdBQVcsV0FBVTtnQkFDakIsS0FBSyxLQUFMLENBRGlCO09BQ2hDLHVCQURnQztPQUN4QixxQkFEd0I7T0FFekIsYUFBNkIsVUFBcEMsT0FGZ0M7T0FFUCxZQUFXLFVBQWpCLE1BRmE7O0FBR3ZDLE9BQUcsVUFBUSxVQUFSLElBQXNCLFVBQXRCLEVBQ0YsV0FBVyxJQUFYLEdBREQ7O0FBR0EsT0FBRyxTQUFPLFNBQVAsSUFBb0IsU0FBcEIsRUFDRixVQUFVLFFBQVYsQ0FBbUIsRUFBQyxNQUFLLEtBQUwsRUFBcEIsRUFERDs7Ozt3Q0FJcUIsU0FBUTtBQUM3QixRQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWtCLE1BQWxCLENBQXlCLE9BQXpCLEVBRDZCOzs7O1FBbEJWOzs7T0FDYixjQUFZO2tCQURDOztJQXVCUjs7Ozs7Ozs7Ozs7Ozs7d01BQ1osUUFBTSxFQUFDLE1BQUssSUFBTDs7O2NBREs7OzJCQUVKO09BQ0EsT0FBTSxLQUFLLEtBQUwsQ0FBTixLQURBOztBQUVQLE9BQUcsQ0FBQyxJQUFELEVBQ0YsT0FBTyxJQUFQLENBREQ7O2dCQUc2QixLQUFLLEtBQUwsQ0FMdEI7T0FLQSxxQkFMQTtPQUtPLHVCQUxQO09BS2UscUJBTGY7O0FBTVAsVUFBTztBQUNKLFFBQUksS0FBSjtBQUNBLFFBQUksQ0FBSjtBQUNBLFFBQUksS0FBSjtBQUNBLFFBQUksQ0FBQyxNQUFEO0FBQ0osaUJBQWEsQ0FBYjtBQUNBLFlBQVEsTUFBTSxLQUFOLElBQWEsT0FBYjtJQU5KLENBQVAsQ0FOTzs7OztzQ0FnQlc7QUFDbEIsT0FBSSxPQUFLLG1CQUFTLFdBQVQsQ0FBcUIsSUFBckIsQ0FBTCxDQURjO0FBRWxCLE9BQUksSUFBRSxDQUFDLElBQUQ7T0FBTyxPQUFLLEtBQUwsQ0FGSztBQUdsQixRQUFLLEtBQUwsR0FBVyxZQUFZLGFBQUc7QUFDekIsU0FBSyxZQUFMLENBQWtCLFdBQWxCLGtCQUEyQyxPQUFPLENBQVAsR0FBVyxDQUFYLFNBQTNDLEVBRHlCO0FBRXpCLFdBQUssQ0FBQyxJQUFELENBRm9CO0lBQUgsRUFHcEIsR0FIUSxDQUFYLENBSGtCOzs7O3lDQVNHO0FBQ3JCLFFBQUssS0FBTCxJQUFjLGNBQWMsS0FBSyxLQUFMLENBQTVCLENBRHFCOzs7O1FBM0JWIiwiZmlsZSI6ImN1cnNvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDdXJzb3IgZXh0ZW5kcyBDb21wb25lbnR7XG5cdHN0YXRpYyBkaXNwbGF5TmFtZT1cImN1cnNvclwiXG5cdHN0YXRlPXt0YXJnZXQ6bnVsbCwgc2hhcGU6IG51bGx9XG5cdFxuICAgIHJlbmRlcigpe1xuXHRcdHJldHVybiBudWxsXG4gICAgfVxuXHRcblx0Y29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKXtcblx0XHRjb25zdCB7dGFyZ2V0LCBzaGFwZX09dGhpcy5zdGF0ZVxuXHRcdGNvbnN0IHt0YXJnZXQ6cHJldlRhcmdldCwgc2hhcGU6cHJldlNoYXBlfT1wcmV2U3RhdGVcblx0XHRpZih0YXJnZXQhPXByZXZUYXJnZXQgJiYgcHJldlRhcmdldClcblx0XHRcdHByZXZUYXJnZXQuYmx1cigpXG5cdFx0XG5cdFx0aWYoc2hhcGUhPXByZXZTaGFwZSAmJiBwcmV2U2hhcGUpXG5cdFx0XHRwcmV2U2hhcGUuc2V0U3RhdGUoe3Nob3c6ZmFsc2V9KVxuXHR9XG5cdFxuXHRyZXBsYWNlRm9jdXNlZENvbnRlbnQoY29udGVudCl7XG5cdFx0dGhpcy5zdGF0ZS50YXJnZXQuaW5zZXJ0KGNvbnRlbnQpXG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIFNoYXBlIGV4dGVuZHMgQ29tcG9uZW50e1xuXHRzdGF0ZT17c2hvdzp0cnVlfVxuXHRyZW5kZXIoKXtcblx0XHRjb25zdCB7c2hvd309dGhpcy5zdGF0ZVxuXHRcdGlmKCFzaG93KVxuXHRcdFx0cmV0dXJuIG51bGxcblx0XHRcblx0XHRjb25zdCB7d2lkdGgsIGhlaWdodCwgc3R5bGV9PXRoaXMucHJvcHNcblx0XHRyZXR1cm4gPGxpbmUgXG5cdFx0XHRcdFx0eDE9e3dpZHRofSBcblx0XHRcdFx0XHR5MT17MH0gXG5cdFx0XHRcdFx0eDI9e3dpZHRofSBcblx0XHRcdFx0XHR5Mj17LWhlaWdodH0gXG5cdFx0XHRcdFx0c3Ryb2tlV2lkdGg9ezF9IFxuXHRcdFx0XHRcdHN0cm9rZT17c3R5bGUuY29sb3J8fFwiYmxhY2tcIn1cblx0XHRcdFx0XHQvPlxuXHR9XG5cdFxuXHRjb21wb25lbnREaWRNb3VudCgpe1xuXHRcdGxldCBub2RlPVJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpXG5cdFx0bGV0IHg9LTEwMDAsIHNob3c9ZmFsc2Vcblx0XHR0aGlzLnRpbWVyPXNldEludGVydmFsKGE9Pntcblx0XHRcdG5vZGUuc2V0QXR0cmlidXRlKCd0cmFuc2Zvcm0nLGB0cmFuc2xhdGUoJHtzaG93ID8gMCA6IHh9LDApYClcblx0XHRcdHNob3c9IXNob3dcblx0XHR9LCA3MDApXG5cdH1cblx0XG5cdGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XG5cdFx0dGhpcy50aW1lciAmJiBjbGVhckludGVydmFsKHRoaXMudGltZXIpXG5cdH1cblx0XG5cdFxufVxuIl19