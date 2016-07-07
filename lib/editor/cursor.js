"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

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

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Cursor)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = { shape: null }, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Cursor, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var node = _reactDom2.default.findDOMNode(this);
			var x = -1000,
			    show = false;
			this.timer = setInterval(function (a) {
				node.setAttribute('transform', "translate(" + (show ? 0 : x) + ",0)");
				show = !show;
			}, this.props.interval);
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			this.timer && clearInterval(this.timer);
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"g",
				null,
				this.state.shape
			);
		}
	}]);

	return Cursor;
}(_react.Component);

Cursor.displayName = "cursor";
Cursor.defaultProps = {
	interval: 700
};
exports.default = Cursor;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvY3Vyc29yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7Ozs7OztrTUFFcEIsUUFBTSxFQUFDLE9BQU0sSUFBTjs7O2NBRmE7O3NDQUlEO0FBQ2xCLE9BQUksT0FBSyxtQkFBUyxXQUFULENBQXFCLElBQXJCLENBQUwsQ0FEYztBQUVsQixPQUFJLElBQUUsQ0FBQyxJQUFEO09BQU8sT0FBSyxLQUFMLENBRks7QUFHbEIsUUFBSyxLQUFMLEdBQVcsWUFBWSxhQUFHO0FBQ3pCLFNBQUssWUFBTCxDQUFrQixXQUFsQixrQkFBMkMsT0FBTyxDQUFQLEdBQVcsQ0FBWCxTQUEzQyxFQUR5QjtBQUV6QixXQUFLLENBQUMsSUFBRCxDQUZvQjtJQUFILEVBR3BCLEtBQUssS0FBTCxDQUFXLFFBQVgsQ0FISCxDQUhrQjs7Ozt5Q0FTRztBQUNyQixRQUFLLEtBQUwsSUFBYyxjQUFjLEtBQUssS0FBTCxDQUE1QixDQURxQjs7OzsyQkFJWDtBQUNWLFVBQU87OztJQUFJLEtBQUssS0FBTCxDQUFXLEtBQVg7SUFBWCxDQURVOzs7O1FBakJTOzs7T0FDYixjQUFZO0FBREMsT0FxQmIsZUFBYTtBQUNuQixXQUFTLEdBQVQ7O2tCQXRCbUIiLCJmaWxlIjoiY3Vyc29yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1cnNvciBleHRlbmRzIENvbXBvbmVudHtcblx0c3RhdGljIGRpc3BsYXlOYW1lPVwiY3Vyc29yXCJcblx0c3RhdGU9e3NoYXBlOm51bGx9XG5cdFxuXHRjb21wb25lbnREaWRNb3VudCgpe1xuXHRcdGxldCBub2RlPVJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpXG5cdFx0bGV0IHg9LTEwMDAsIHNob3c9ZmFsc2Vcblx0XHR0aGlzLnRpbWVyPXNldEludGVydmFsKGE9Pntcblx0XHRcdG5vZGUuc2V0QXR0cmlidXRlKCd0cmFuc2Zvcm0nLGB0cmFuc2xhdGUoJHtzaG93ID8gMCA6IHh9LDApYClcblx0XHRcdHNob3c9IXNob3dcblx0XHR9LCB0aGlzLnByb3BzLmludGVydmFsKVxuXHR9XG5cdFxuXHRjb21wb25lbnRXaWxsVW5tb3VudCgpe1xuXHRcdHRoaXMudGltZXIgJiYgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVyKVxuXHR9XG5cdFxuICAgIHJlbmRlcigpe1xuXHRcdHJldHVybiA8Zz57dGhpcy5zdGF0ZS5zaGFwZX08L2c+XG4gICAgfVxuXHRcblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XG5cdFx0aW50ZXJ2YWw6NzAwXG5cdH1cbn1cbiJdfQ==