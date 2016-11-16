"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Shape = exports.Cursor = undefined;

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

var _reactRedux = require("react-redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Cursor = exports.Cursor = function (_Component) {
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

var timer = void 0;
var CursorShape = function CursorShape(_ref2) {
	var width = _ref2.width,
	    height = _ref2.height,
	    descent = _ref2.descent;

	width = Math.ceil(width);
	height = Math.ceil(height);
	descent = Math.ceil(descent);
	return _react2.default.createElement("line", {
		x1: width,
		y1: descent,
		x2: width,
		y2: -height + descent,
		strokeWidth: 1,
		stroke: "black",
		ref: function ref(node) {
			timer && clearInterval(timer);
			timer = setInterval(function (a) {
				var y1 = node.getAttribute('y1'),
				    y2 = node.getAttribute('y2');
				node.setAttribute('y1', y1 == y2 ? descent : y2);
			}, 700);
		}
	});
};

exports.default = Cursor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvY3Vyc29yLmpzIl0sIm5hbWVzIjpbIkN1cnNvciIsInN0YXRlIiwidGFyZ2V0Iiwibm9kZSIsImF0Iiwid2lkdGgiLCJoZWlnaHQiLCJkZXNjZW50Iiwic3R5bGUiLCJwcmV2UHJvcHMiLCJwcmV2U3RhdGUiLCJhcHBlbmRDaGlsZCIsImZpbmRET01Ob2RlIiwicmVmcyIsInNoYXBlIiwic2V0QXR0cmlidXRlIiwiY29udGVudCIsInNldFN0YXRlIiwibGVuZ3RoIiwic3BsaWNlIiwiZGlzcGxheU5hbWUiLCJTaGFwZSIsInByb3BzIiwiTWF0aCIsImNlaWwiLCJjb2xvciIsInRpbWVyIiwic2V0SW50ZXJ2YWwiLCJ5MSIsImdldEF0dHJpYnV0ZSIsInkyIiwiY2xlYXJJbnRlcnZhbCIsIkN1cnNvclNoYXBlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7SUFFYUEsTSxXQUFBQSxNOzs7Ozs7Ozs7Ozs7OzswTUFFWkMsSyxHQUFNLEVBQUNDLFFBQU8sSUFBUixFQUFjQyxNQUFNLElBQXBCLEVBQTBCQyxJQUFJLENBQTlCLEVBQWlDQyxPQUFNLENBQXZDLEVBQTBDQyxRQUFPLENBQWpELEVBQW9EQyxTQUFRLENBQTVELEVBQStEQyxPQUFNLEVBQXJFLEU7Ozs7OzJCQUVLO0FBQUEsZ0JBQzRCLEtBQUtQLEtBRGpDO0FBQUEsT0FDSEksS0FERyxVQUNIQSxLQURHO0FBQUEsT0FDSUMsTUFESixVQUNJQSxNQURKO0FBQUEsT0FDWUMsT0FEWixVQUNZQSxPQURaO0FBQUEsT0FDcUJDLEtBRHJCLFVBQ3FCQSxLQURyQjs7QUFFVixVQUNDLDhCQUFDLEtBQUQsSUFBTyxLQUFJLE9BQVgsRUFBbUIsT0FBT0gsS0FBMUIsRUFBaUMsUUFBUUMsTUFBekMsRUFBaUQsT0FBT0UsS0FBeEQsRUFBK0QsU0FBU0QsT0FBeEUsR0FERDtBQUdHOzs7cUNBRWVFLFMsRUFBV0Ms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QixPQUFWLENBQVI7QUFDQSxRQUNDO0FBQ0MsTUFBSUYsS0FETDtBQUVDLE1BQUlFLE9BRkw7QUFHQyxNQUFJRixLQUhMO0FBSUMsTUFBSSxDQUFDQyxNQUFELEdBQVFDLE9BSmI7QUFLQyxlQUFhLENBTGQ7QUFNQyxVQUFRLE9BTlQ7QUFPQyxPQUFLLG1CQUFNO0FBQ1ZtQixZQUFTSyxjQUFjTCxLQUFkLENBQVQ7QUFDQUEsV0FBTUMsWUFBWSxhQUFHO0FBQ3BCLFFBQUlDLEtBQUd6QixLQUFLMEIsWUFBTCxDQUFrQixJQUFsQixDQUFQO0FBQUEsUUFBZ0NDLEtBQUczQixLQUFLMEIsWUFBTCxDQUFrQixJQUFsQixDQUFuQztBQUNBMUIsU0FBS1ksWUFBTCxDQUFrQixJQUFsQixFQUF1QmEsTUFBSUUsRUFBSixHQUFTdkIsT0FBVCxHQUFtQnVCLEVBQTFDO0FBQ0EsSUFISyxFQUdILEdBSEcsQ0FBTjtBQUlBO0FBYkYsR0FERDtBQWlCQSxDQXJCRDs7a0JBdUJlOUIsTSIsImZpbGUiOiJjdXJzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIlxyXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXHJcblxyXG5leHBvcnQgY2xhc3MgQ3Vyc29yIGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHN0YXRpYyBkaXNwbGF5TmFtZT1cImN1cnNvclwiXHJcblx0c3RhdGU9e3RhcmdldDpudWxsLCBub2RlOiBudWxsLCBhdDogMCwgd2lkdGg6MCwgaGVpZ2h0OjAsIGRlc2NlbnQ6MCwgc3R5bGU6e319XHJcblxyXG4gICAgcmVuZGVyKCl7XHJcblx0XHRjb25zdCB7d2lkdGgsIGhlaWdodCwgZGVzY2VudCwgc3R5bGV9PXRoaXMuc3RhdGVcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxTaGFwZSByZWY9XCJzaGFwZVwiIHdpZHRoPXt3aWR0aH0gaGVpZ2h0PXtoZWlnaHR9IHN0eWxlPXtzdHlsZX0gZGVzY2VudD17ZGVzY2VudH0vPlxyXG5cdFx0KVxyXG4gICAgfVxyXG5cclxuXHRjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpe1xyXG5cdFx0Y29uc3Qge3RhcmdldCwgbm9kZSwgYXR9PXRoaXMuc3RhdGVcclxuXHRcdGlmKHRhcmdldCAmJiBub2RlKXtcclxuXHRcdFx0bm9kZS5hcHBlbmRDaGlsZChSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMuc2hhcGUpKVxyXG5cdFx0XHRub2RlLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnY3Vyc29yJylcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGluc2VydChjb250ZW50KXtcclxuXHRcdGNvbnN0IHt0YXJnZXQsIGF0fT10aGlzLnN0YXRlXHJcblx0XHR0aGlzLnNldFN0YXRlKHtub2RlOm51bGwsIGF0OmF0K2NvbnRlbnQubGVuZ3RofSlcclxuXHRcdHRhcmdldC5zcGxpY2UoYXQsMCxjb250ZW50KVxyXG5cdH1cclxuXHJcblx0YmFja3NwYWNlKCl7XHJcblx0XHRjb25zdCB7dGFyZ2V0LCBhdH09dGhpcy5zdGF0ZVxyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7bm9kZTpudWxsLCBhdDphdC0xfSlcclxuXHRcdHRhcmdldC5zcGxpY2UoYXQtMSwxKVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNoYXBlIGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHJlbmRlcigpe1xyXG5cdFx0bGV0IHt3aWR0aCwgaGVpZ2h0LCBkZXNjZW50LCBzdHlsZX09dGhpcy5wcm9wc1xyXG5cdFx0d2lkdGg9TWF0aC5jZWlsKHdpZHRoKVxyXG5cdFx0aGVpZ2h0PU1hdGguY2VpbChoZWlnaHQpXHJcblx0XHRkZXNjZW50PU1hdGguY2VpbChkZXNjZW50KVxyXG5cdFx0cmV0dXJuIDxsaW5lXHJcblx0XHRcdFx0XHR4MT17d2lkdGh9XHJcblx0XHRcdFx0XHR5MT17ZGVzY2VudH1cclxuXHRcdFx0XHRcdHgyPXt3aWR0aH1cclxuXHRcdFx0XHRcdHkyPXstaGVpZ2h0K2Rlc2NlbnR9XHJcblx0XHRcdFx0XHRzdHJva2VXaWR0aD17MX1cclxuXHRcdFx0XHRcdHN0cm9rZT17c3R5bGUuY29sb3J8fFwiYmxhY2tcIn1cclxuXHRcdFx0XHRcdC8+XHJcblx0fVxyXG5cclxuXHRjb21wb25lbnREaWRNb3VudCgpe1xyXG5cdFx0bGV0IG5vZGU9UmVhY3RET00uZmluZERPTU5vZGUodGhpcylcclxuXHRcdHRoaXMudGltZXI9c2V0SW50ZXJ2YWwoYT0+e1xyXG5cdFx0XHRsZXQgeTE9bm9kZS5nZXRBdHRyaWJ1dGUoJ3kxJyksIHkyPW5vZGUuZ2V0QXR0cmlidXRlKCd5MicpXHJcblx0XHRcdG5vZGUuc2V0QXR0cmlidXRlKCd5MScseTE9PXkyID8gdGhpcy5wcm9wcy5kZXNjZW50IDogeTIpXHJcblx0XHR9LCA3MDApXHJcblx0fVxyXG5cclxuXHRjb21wb25lbnRXaWxsVW5tb3VudCgpe1xyXG5cdFx0dGhpcy50aW1lciAmJiBjbGVhckludGVydmFsKHRoaXMudGltZXIpXHJcblx0fVxyXG59XHJcblxyXG5sZXQgdGltZXJcclxuY29uc3QgQ3Vyc29yU2hhcGU9KHt3aWR0aCwgaGVpZ2h0LCBkZXNjZW50fSk9PntcclxuXHR3aWR0aD1NYXRoLmNlaWwod2lkdGgpXHJcblx0aGVpZ2h0PU1hdGguY2VpbChoZWlnaHQpXHJcblx0ZGVzY2VudD1NYXRoLmNlaWwoZGVzY2VudClcclxuXHRyZXR1cm4gKFxyXG5cdFx0PGxpbmVcclxuXHRcdFx0eDE9e3dpZHRofVxyXG5cdFx0XHR5MT17ZGVzY2VudH1cclxuXHRcdFx0eDI9e3dpZHRofVxyXG5cdFx0XHR5Mj17LWhlaWdodCtkZXNjZW50fVxyXG5cdFx0XHRzdHJva2VXaWR0aD17MX1cclxuXHRcdFx0c3Ryb2tlPXtcImJsYWNrXCJ9XHJcblx0XHRcdHJlZj17bm9kZT0+e1xyXG5cdFx0XHRcdHRpbWVyICYmIGNsZWFySW50ZXJ2YWwodGltZXIpO1xyXG5cdFx0XHRcdHRpbWVyPXNldEludGVydmFsKGE9PntcclxuXHRcdFx0XHRcdGxldCB5MT1ub2RlLmdldEF0dHJpYnV0ZSgneTEnKSwgeTI9bm9kZS5nZXRBdHRyaWJ1dGUoJ3kyJylcclxuXHRcdFx0XHRcdG5vZGUuc2V0QXR0cmlidXRlKCd5MScseTE9PXkyID8gZGVzY2VudCA6IHkyKVxyXG5cdFx0XHRcdH0sIDcwMClcclxuXHRcdFx0fX1cclxuXHRcdFx0Lz5cclxuXHRcdClcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ3Vyc29yIl19