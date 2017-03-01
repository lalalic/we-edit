"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Shape = undefined;

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Cursor = function (_Component) {
	(0, _inherits3.default)(Cursor, _Component);

	function Cursor() {
		var _ref;

		var _temp, _this, _ret;

		(0, _classCallCheck3.default)(this, Cursor);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Cursor.__proto__ || (0, _getPrototypeOf2.default)(Cursor)).call.apply(_ref, [this].concat(args))), _this), _this.state = { target: null, node: null, at: 0, width: 0, height: 0, descent: 0, style: {} }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	}

	(0, _createClass3.default)(Cursor, [{
		key: "render",
		value: function render() {
			var _state = this.state,
			    width = _state.width,
			    height = _state.height,
			    descent = _state.descent,
			    style = _state.style;

			return _react2.default.createElement(Shape, { ref: "shape", width: width, height: height, style: style, descent: descent });
		}
	}, {
		key: "componentDidUpdate",
		value: function componentDidUpdate(prevProps, prevState) {
			var _state2 = this.state,
			    target = _state2.target,
			    node = _state2.node,
			    at = _state2.at;

			if (target && node) {
				node.appendChild(_reactDom2.default.findDOMNode(this.refs.shape));
				node.setAttribute('class', 'cursor');
			}
		}
	}, {
		key: "insert",
		value: function insert(content) {
			var _state3 = this.state,
			    target = _state3.target,
			    at = _state3.at;

			this.setState({ node: null, at: at + content.length });
			target.splice(at, 0, content);
		}
	}, {
		key: "backspace",
		value: function backspace() {
			var _state4 = this.state,
			    target = _state4.target,
			    at = _state4.at;

			this.setState({ node: null, at: at - 1 });
			target.splice(at - 1, 1);
		}
	}]);
	return Cursor;
}(_react.Component);

Cursor.displayName = "cursor";
exports.default = Cursor;

var Shape = exports.Shape = function (_Component2) {
	(0, _inherits3.default)(Shape, _Component2);

	function Shape() {
		(0, _classCallCheck3.default)(this, Shape);
		return (0, _possibleConstructorReturn3.default)(this, (Shape.__proto__ || (0, _getPrototypeOf2.default)(Shape)).apply(this, arguments));
	}

	(0, _createClass3.default)(Shape, [{
		key: "render",
		value: function render() {
			var _props = this.props,
			    width = _props.width,
			    height = _props.height,
			    descent = _props.descent,
			    style = _props.style;

			width = Math.ceil(width);
			height = Math.ceil(height);
			descent = Math.ceil(descent);
			return _react2.default.createElement("line", {
				x1: width,
				y1: descent,
				x2: width,
				y2: -height + descent,
				strokeWidth: 1,
				stroke: style.color || "black"
			});
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this3 = this;

			var node = _reactDom2.default.findDOMNode(this);
			this.timer = setInterval(function (a) {
				var y1 = node.getAttribute('y1'),
				    y2 = node.getAttribute('y2');
				node.setAttribute('y1', y1 == y2 ? _this3.props.descent : y2);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvY3Vyc29yLmpzIl0sIm5hbWVzIjpbIkN1cnNvciIsInN0YXRlIiwidGFyZ2V0Iiwibm9kZSIsImF0Iiwid2lkdGgiLCJoZWlnaHQiLCJkZXNjZW50Iiwic3R5bGUiLCJwcmV2UHJvcHMiLCJwcmV2U3RhdGUiLCJhcHBlbmRDaGlsZCIsImZpbmRET01Ob2RlIiwicmVmcyIsInNoYXBlIiwic2V0QXR0cmlidXRlIiwiY29udGVudCIsInNldFN0YXRlIiwibGVuZ3RoIiwic3BsaWNlIiwiZGlzcGxheU5hbWUiLCJTaGFwZSIsInByb3BzIiwiTWF0aCIsImNlaWwiLCJjb2xvciIsInRpbWVyIiwic2V0SW50ZXJ2YWwiLCJ5MSIsImdldEF0dHJpYnV0ZSIsInkyIiwiY2xlYXJJbnRlcnZhbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O0lBRXFCQSxNOzs7Ozs7Ozs7Ozs7OzswTUFFcEJDLEssR0FBTSxFQUFDQyxRQUFPLElBQVIsRUFBY0MsTUFBTSxJQUFwQixFQUEwQkMsSUFBSSxDQUE5QixFQUFpQ0MsT0FBTSxDQUF2QyxFQUEwQ0MsUUFBTyxDQUFqRCxFQUFvREMsU0FBUSxDQUE1RCxFQUErREMsT0FBTSxFQUFyRSxFOzs7OzsyQkFFSztBQUFBLGdCQUM0QixLQUFLUCxLQURqQztBQUFBLE9BQ0hJLEtBREcsVUFDSEEsS0FERztBQUFBLE9BQ0lDLE1BREosVUFDSUEsTUFESjtBQUFBLE9BQ1lDLE9BRFosVUFDWUEsT0FEWjtBQUFBLE9BQ3FCQyxLQURyQixVQUNxQkEsS0FEckI7O0FBRVYsVUFDQyw4QkFBQyxLQUFELElBQU8sS0FBSSxPQUFYLEVBQW1CLE9BQU9ILEtBQTFCLEVBQWlDLFFBQVFDLE1BQXpDLEVBQWlELE9BQU9FLEtBQXhELEVBQStELFNBQVNELE9BQXhFLEdBREQ7QUFHRzs7O3FDQUVlRSxTLEVBQVdDLFMsRUFBVTtBQUFBLGlCQUNkLEtBQUtULEtBRFM7QUFBQSxPQUNoQ0MsTUFEZ0MsV0FDaENBLE1BRGdDO0FBQUEsT0FDeEJDLElBRHdCLFdBQ3hCQSxJQUR3QjtBQUFBLE9BQ2xCQyxFQURrQixXQUNsQkEsRUFEa0I7O0FBRXZDLE9BQUdGLFVBQVVDLElBQWIsRUFBa0I7QUFDakJBLFNBQUtRLFdBQUwsQ0FBaUIsbUJBQVNDLFdBQVQsQ0FBcUIsS0FBS0MsSUFBTCxDQUFVQyxLQUEvQixDQUFqQjtBQUNBWCxTQUFLWSxZQUFMLENBQWtCLE9BQWxCLEVBQTJCLFFBQTNCO0FBQ0E7QUFDRDs7O3lCQUVNQyxPLEVBQVE7QUFBQSxpQkFDSyxLQUFLZixLQURWO0FBQUEsT0FDUEMsTUFETyxXQUNQQSxNQURPO0FBQUEsT0FDQ0UsRUFERCxXQUNDQSxFQUREOztBQUVkLFFBQUthLFFBQUwsQ0FBYyxFQUFDZCxNQUFLLElBQU4sRUFBWUMsSUFBR0EsS0FBR1ksUUFBUUUsTUFBMUIsRUFBZDtBQUNBaEIsVUFBT2lCLE1BQVAsQ0FBY2YsRUFBZCxFQUFpQixDQUFqQixFQUFtQlksT0FBbkI7QUFDQTs7OzhCQUVVO0FBQUEsaUJBQ1MsS0FBS2YsS0FEZDtBQUFBLE9BQ0hDLE1BREcsV0FDSEEsTUFERztBQUFBLE9BQ0tFLEVBREwsV0FDS0EsRUFETDs7QUFFVixRQUFLYSxRQUFMLENBQWMsRUFBQ2QsTUFBSyxJQUFOLEVBQVlDLElBQUdBLEtBQUcsQ0FBbEIsRUFBZDtBQUNBRixVQUFPaUIsTUFBUCxDQUFjZixLQUFHLENBQWpCLEVBQW1CLENBQW5CO0FBQ0E7Ozs7O0FBN0JtQkosTSxDQUNib0IsVyxHQUFZLFE7a0JBRENwQixNOztJQWdDUnFCLEssV0FBQUEsSzs7Ozs7Ozs7OzsyQkFDSjtBQUFBLGdCQUM2QixLQUFLQyxLQURsQztBQUFBLE9BQ0ZqQixLQURFLFVBQ0ZBLEtBREU7QUFBQSxPQUNLQyxNQURMLFVBQ0tBLE1BREw7QUFBQSxPQUNhQyxPQURiLFVBQ2FBLE9BRGI7QUFBQSxPQUNzQkMsS0FEdEIsVUFDc0JBLEtBRHRCOztBQUVQSCxXQUFNa0IsS0FBS0MsSUFBTCxDQUFVbkIsS0FBVixDQUFOO0FBQ0FDLFlBQU9pQixLQUFLQyxJQUFMLENBQVVsQixNQUFWLENBQVA7QUFDQUMsYUFBUWdCLEtBQUtDLElBQUwsQ0FBVWpCLE9BQVYsQ0FBUjtBQUNBLFVBQU87QUFDSixRQUFJRixLQURBO0FBRUosUUFBSUUsT0FGQTtBQUdKLFFBQUlGLEtBSEE7QUFJSixRQUFJLENBQUNDLE1BQUQsR0FBUUMsT0FKUjtBQUtKLGlCQUFhLENBTFQ7QUFNSixZQUFRQyxNQUFNaUIsS0FBTixJQUFhO0FBTmpCLEtBQVA7QUFRQTs7O3NDQUVrQjtBQUFBOztBQUNsQixPQUFJdEIsT0FBSyxtQkFBU1MsV0FBVCxDQUFxQixJQUFyQixDQUFUO0FBQ0EsUUFBS2MsS0FBTCxHQUFXQyxZQUFZLGFBQUc7QUFDekIsUUFBSUMsS0FBR3pCLEtBQUswQixZQUFMLENBQWtCLElBQWxCLENBQVA7QUFBQSxRQUFnQ0MsS0FBRzNCLEtBQUswQixZQUFMLENBQWtCLElBQWxCLENBQW5DO0FBQ0ExQixTQUFLWSxZQUFMLENBQWtCLElBQWxCLEVBQXVCYSxNQUFJRSxFQUFKLEdBQVMsT0FBS1IsS0FBTCxDQUFXZixPQUFwQixHQUE4QnVCLEVBQXJEO0FBQ0EsSUFIVSxFQUdSLEdBSFEsQ0FBWDtBQUlBOzs7eUNBRXFCO0FBQ3JCLFFBQUtKLEtBQUwsSUFBY0ssY0FBYyxLQUFLTCxLQUFuQixDQUFkO0FBQ0EiLCJmaWxlIjoiY3Vyc29yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1cnNvciBleHRlbmRzIENvbXBvbmVudHtcclxuXHRzdGF0aWMgZGlzcGxheU5hbWU9XCJjdXJzb3JcIlxyXG5cdHN0YXRlPXt0YXJnZXQ6bnVsbCwgbm9kZTogbnVsbCwgYXQ6IDAsIHdpZHRoOjAsIGhlaWdodDowLCBkZXNjZW50OjAsIHN0eWxlOnt9fVxyXG5cclxuICAgIHJlbmRlcigpe1xyXG5cdFx0Y29uc3Qge3dpZHRoLCBoZWlnaHQsIGRlc2NlbnQsIHN0eWxlfT10aGlzLnN0YXRlXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8U2hhcGUgcmVmPVwic2hhcGVcIiB3aWR0aD17d2lkdGh9IGhlaWdodD17aGVpZ2h0fSBzdHlsZT17c3R5bGV9IGRlc2NlbnQ9e2Rlc2NlbnR9Lz5cclxuXHRcdClcclxuICAgIH1cclxuXHJcblx0Y29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKXtcclxuXHRcdGNvbnN0IHt0YXJnZXQsIG5vZGUsIGF0fT10aGlzLnN0YXRlXHJcblx0XHRpZih0YXJnZXQgJiYgbm9kZSl7XHJcblx0XHRcdG5vZGUuYXBwZW5kQ2hpbGQoUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzLnNoYXBlKSlcclxuXHRcdFx0bm9kZS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2N1cnNvcicpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRpbnNlcnQoY29udGVudCl7XHJcblx0XHRjb25zdCB7dGFyZ2V0LCBhdH09dGhpcy5zdGF0ZVxyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7bm9kZTpudWxsLCBhdDphdCtjb250ZW50Lmxlbmd0aH0pXHJcblx0XHR0YXJnZXQuc3BsaWNlKGF0LDAsY29udGVudClcclxuXHR9XHJcblxyXG5cdGJhY2tzcGFjZSgpe1xyXG5cdFx0Y29uc3Qge3RhcmdldCwgYXR9PXRoaXMuc3RhdGVcclxuXHRcdHRoaXMuc2V0U3RhdGUoe25vZGU6bnVsbCwgYXQ6YXQtMX0pXHJcblx0XHR0YXJnZXQuc3BsaWNlKGF0LTEsMSlcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTaGFwZSBleHRlbmRzIENvbXBvbmVudHtcclxuXHRyZW5kZXIoKXtcclxuXHRcdGxldCB7d2lkdGgsIGhlaWdodCwgZGVzY2VudCwgc3R5bGV9PXRoaXMucHJvcHNcclxuXHRcdHdpZHRoPU1hdGguY2VpbCh3aWR0aClcclxuXHRcdGhlaWdodD1NYXRoLmNlaWwoaGVpZ2h0KVxyXG5cdFx0ZGVzY2VudD1NYXRoLmNlaWwoZGVzY2VudClcclxuXHRcdHJldHVybiA8bGluZVxyXG5cdFx0XHRcdFx0eDE9e3dpZHRofVxyXG5cdFx0XHRcdFx0eTE9e2Rlc2NlbnR9XHJcblx0XHRcdFx0XHR4Mj17d2lkdGh9XHJcblx0XHRcdFx0XHR5Mj17LWhlaWdodCtkZXNjZW50fVxyXG5cdFx0XHRcdFx0c3Ryb2tlV2lkdGg9ezF9XHJcblx0XHRcdFx0XHRzdHJva2U9e3N0eWxlLmNvbG9yfHxcImJsYWNrXCJ9XHJcblx0XHRcdFx0XHQvPlxyXG5cdH1cclxuXHJcblx0Y29tcG9uZW50RGlkTW91bnQoKXtcclxuXHRcdGxldCBub2RlPVJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpXHJcblx0XHR0aGlzLnRpbWVyPXNldEludGVydmFsKGE9PntcclxuXHRcdFx0bGV0IHkxPW5vZGUuZ2V0QXR0cmlidXRlKCd5MScpLCB5Mj1ub2RlLmdldEF0dHJpYnV0ZSgneTInKVxyXG5cdFx0XHRub2RlLnNldEF0dHJpYnV0ZSgneTEnLHkxPT15MiA/IHRoaXMucHJvcHMuZGVzY2VudCA6IHkyKVxyXG5cdFx0fSwgNzAwKVxyXG5cdH1cclxuXHJcblx0Y29tcG9uZW50V2lsbFVubW91bnQoKXtcclxuXHRcdHRoaXMudGltZXIgJiYgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVyKVxyXG5cdH1cclxufVxyXG4iXX0=