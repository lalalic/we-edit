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

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Cursor)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = { target: null, node: null, at: 0, width: 0, height: 0, style: {} }, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Cursor, [{
		key: "render",
		value: function render() {
			var _state = this.state;
			var width = _state.width;
			var height = _state.height;
			var style = _state.style;

			return _react2.default.createElement(Shape, { ref: "shape", width: width, height: height, style: style });
		}
	}, {
		key: "componentDidUpdate",
		value: function componentDidUpdate(prevProps, prevState) {
			var _state2 = this.state;
			var target = _state2.target;
			var node = _state2.node;
			var at = _state2.at;

			if (target && node) {
				node.appendChild(_reactDom2.default.findDOMNode(this.refs.shape));
				node.setAttribute('class', 'cursor');
			}
		}
	}, {
		key: "insert",
		value: function insert(content) {
			var _state3 = this.state;
			var target = _state3.target;
			var at = _state3.at;

			this.setState({ node: null, at: at + content.length });
			target.splice(at, 0, content);
		}
	}, {
		key: "backspace",
		value: function backspace() {
			var _state4 = this.state;
			var target = _state4.target;
			var at = _state4.at;

			this.setState({ node: null, at: at - 1 });
			target.splice(at - 1, 1);
		}
	}]);

	return Cursor;
}(_react.Component);

Cursor.displayName = "cursor";
exports.default = Cursor;

var Shape = exports.Shape = function (_Component2) {
	_inherits(Shape, _Component2);

	function Shape() {
		_classCallCheck(this, Shape);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Shape).apply(this, arguments));
	}

	_createClass(Shape, [{
		key: "render",
		value: function render() {
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
			    next = 0;
			this.timer = setInterval(function (a) {
				node.setAttribute('y1', next);
				next = next ? 0 : node.getAttribute('y2');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvY3Vyc29yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7Ozs7a01BRXBCLFFBQU0sRUFBQyxRQUFPLElBQVAsRUFBYSxNQUFNLElBQU4sRUFBWSxJQUFJLENBQUosRUFBTyxPQUFNLENBQU4sRUFBUyxRQUFPLENBQVAsRUFBVSxPQUFNLEVBQU47OztjQUZ0Qzs7MkJBSVQ7Z0JBQ21CLEtBQUssS0FBTCxDQURuQjtPQUNILHFCQURHO09BQ0ksdUJBREo7T0FDWSxxQkFEWjs7QUFFVixVQUNDLDhCQUFDLEtBQUQsSUFBTyxLQUFJLE9BQUosRUFBWSxPQUFPLEtBQVAsRUFBYyxRQUFRLE1BQVIsRUFBZ0IsT0FBTyxLQUFQLEVBQWpELENBREQsQ0FGVTs7OztxQ0FPUSxXQUFXLFdBQVU7aUJBQ2QsS0FBSyxLQUFMLENBRGM7T0FDaEMsd0JBRGdDO09BQ3hCLG9CQUR3QjtPQUNsQixnQkFEa0I7O0FBRXZDLE9BQUcsVUFBVSxJQUFWLEVBQWU7QUFDakIsU0FBSyxXQUFMLENBQWlCLG1CQUFTLFdBQVQsQ0FBcUIsS0FBSyxJQUFMLENBQVUsS0FBVixDQUF0QyxFQURpQjtBQUVqQixTQUFLLFlBQUwsQ0FBa0IsT0FBbEIsRUFBMkIsUUFBM0IsRUFGaUI7SUFBbEI7Ozs7eUJBTU0sU0FBUTtpQkFDSyxLQUFLLEtBQUwsQ0FETDtPQUNQLHdCQURPO09BQ0MsZ0JBREQ7O0FBRWQsUUFBSyxRQUFMLENBQWMsRUFBQyxNQUFLLElBQUwsRUFBVyxJQUFHLEtBQUcsUUFBUSxNQUFSLEVBQWhDLEVBRmM7QUFHZCxVQUFPLE1BQVAsQ0FBYyxFQUFkLEVBQWlCLENBQWpCLEVBQW1CLE9BQW5CLEVBSGM7Ozs7OEJBTUo7aUJBQ1MsS0FBSyxLQUFMLENBRFQ7T0FDSCx3QkFERztPQUNLLGdCQURMOztBQUVWLFFBQUssUUFBTCxDQUFjLEVBQUMsTUFBSyxJQUFMLEVBQVcsSUFBRyxLQUFHLENBQUgsRUFBN0IsRUFGVTtBQUdWLFVBQU8sTUFBUCxDQUFjLEtBQUcsQ0FBSCxFQUFLLENBQW5CLEVBSFU7Ozs7UUF6QlM7OztPQUNiLGNBQVk7a0JBREM7O0lBZ0NSOzs7Ozs7Ozs7OzsyQkFDSjtnQkFDc0IsS0FBSyxLQUFMLENBRHRCO09BQ0EscUJBREE7T0FDTyx1QkFEUDtPQUNlLHFCQURmOztBQUVQLFVBQU87QUFDSixRQUFJLEtBQUo7QUFDQSxRQUFJLENBQUo7QUFDQSxRQUFJLEtBQUo7QUFDQSxRQUFJLENBQUMsTUFBRDtBQUNKLGlCQUFhLENBQWI7QUFDQSxZQUFRLE1BQU0sS0FBTixJQUFhLE9BQWI7SUFOSixDQUFQLENBRk87Ozs7c0NBWVc7QUFDbEIsT0FBSSxPQUFLLG1CQUFTLFdBQVQsQ0FBcUIsSUFBckIsQ0FBTCxDQURjO0FBRWxCLE9BQUksSUFBRSxDQUFDLElBQUQ7T0FBTyxPQUFLLENBQUwsQ0FGSztBQUdsQixRQUFLLEtBQUwsR0FBVyxZQUFZLGFBQUc7QUFDekIsU0FBSyxZQUFMLENBQWtCLElBQWxCLEVBQXVCLElBQXZCLEVBRHlCO0FBRXpCLFdBQUssT0FBTyxDQUFQLEdBQVUsS0FBSyxZQUFMLENBQWtCLElBQWxCLENBQVYsQ0FGb0I7SUFBSCxFQUdwQixHQUhRLENBQVgsQ0FIa0I7Ozs7eUNBU0c7QUFDckIsUUFBSyxLQUFMLElBQWMsY0FBYyxLQUFLLEtBQUwsQ0FBNUIsQ0FEcUI7Ozs7UUF0QlYiLCJmaWxlIjoiY3Vyc29yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1cnNvciBleHRlbmRzIENvbXBvbmVudHtcblx0c3RhdGljIGRpc3BsYXlOYW1lPVwiY3Vyc29yXCJcblx0c3RhdGU9e3RhcmdldDpudWxsLCBub2RlOiBudWxsLCBhdDogMCwgd2lkdGg6MCwgaGVpZ2h0OjAsIHN0eWxlOnt9fVxuXG4gICAgcmVuZGVyKCl7XG5cdFx0Y29uc3Qge3dpZHRoLCBoZWlnaHQsIHN0eWxlfT10aGlzLnN0YXRlXG5cdFx0cmV0dXJuIChcblx0XHRcdDxTaGFwZSByZWY9XCJzaGFwZVwiIHdpZHRoPXt3aWR0aH0gaGVpZ2h0PXtoZWlnaHR9IHN0eWxlPXtzdHlsZX0vPlxuXHRcdClcbiAgICB9XG5cblx0Y29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKXtcblx0XHRjb25zdCB7dGFyZ2V0LCBub2RlLCBhdH09dGhpcy5zdGF0ZVxuXHRcdGlmKHRhcmdldCAmJiBub2RlKXtcblx0XHRcdG5vZGUuYXBwZW5kQ2hpbGQoUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzLnNoYXBlKSlcblx0XHRcdG5vZGUuc2V0QXR0cmlidXRlKCdjbGFzcycsICdjdXJzb3InKVxuXHRcdH1cblx0fVxuXG5cdGluc2VydChjb250ZW50KXtcblx0XHRjb25zdCB7dGFyZ2V0LCBhdH09dGhpcy5zdGF0ZVxuXHRcdHRoaXMuc2V0U3RhdGUoe25vZGU6bnVsbCwgYXQ6YXQrY29udGVudC5sZW5ndGh9KVxuXHRcdHRhcmdldC5zcGxpY2UoYXQsMCxjb250ZW50KVxuXHR9XG5cdFxuXHRiYWNrc3BhY2UoKXtcblx0XHRjb25zdCB7dGFyZ2V0LCBhdH09dGhpcy5zdGF0ZVxuXHRcdHRoaXMuc2V0U3RhdGUoe25vZGU6bnVsbCwgYXQ6YXQtMX0pXG5cdFx0dGFyZ2V0LnNwbGljZShhdC0xLDEpXG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIFNoYXBlIGV4dGVuZHMgQ29tcG9uZW50e1xuXHRyZW5kZXIoKXtcblx0XHRjb25zdCB7d2lkdGgsIGhlaWdodCwgc3R5bGV9PXRoaXMucHJvcHNcblx0XHRyZXR1cm4gPGxpbmVcblx0XHRcdFx0XHR4MT17d2lkdGh9XG5cdFx0XHRcdFx0eTE9ezB9XG5cdFx0XHRcdFx0eDI9e3dpZHRofVxuXHRcdFx0XHRcdHkyPXstaGVpZ2h0fVxuXHRcdFx0XHRcdHN0cm9rZVdpZHRoPXsxfVxuXHRcdFx0XHRcdHN0cm9rZT17c3R5bGUuY29sb3J8fFwiYmxhY2tcIn1cblx0XHRcdFx0XHQvPlxuXHR9XG5cblx0Y29tcG9uZW50RGlkTW91bnQoKXtcblx0XHRsZXQgbm9kZT1SZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKVxuXHRcdGxldCB4PS0xMDAwLCBuZXh0PTBcblx0XHR0aGlzLnRpbWVyPXNldEludGVydmFsKGE9Pntcblx0XHRcdG5vZGUuc2V0QXR0cmlidXRlKCd5MScsbmV4dClcblx0XHRcdG5leHQ9bmV4dCA/IDA6IG5vZGUuZ2V0QXR0cmlidXRlKCd5MicpXG5cdFx0fSwgNzAwKVxuXHR9XG5cblx0Y29tcG9uZW50V2lsbFVubW91bnQoKXtcblx0XHR0aGlzLnRpbWVyICYmIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lcilcblx0fVxufVxuIl19