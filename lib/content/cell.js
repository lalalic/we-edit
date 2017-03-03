"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _maxSafeInteger = require("babel-runtime/core-js/number/max-safe-integer");

var _maxSafeInteger2 = _interopRequireDefault(_maxSafeInteger);

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

var _any = require("./any");

var _any2 = _interopRequireDefault(_any);

var _group = require("../composed/group");

var _group2 = _interopRequireDefault(_group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Cell = function (_Any) {
	(0, _inherits3.default)(Cell, _Any);

	function Cell() {
		(0, _classCallCheck3.default)(this, Cell);
		return (0, _possibleConstructorReturn3.default)(this, (Cell.__proto__ || (0, _getPrototypeOf2.default)(Cell)).apply(this, arguments));
	}

	(0, _createClass3.default)(Cell, [{
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"td",
				null,
				this.getContent()
			);
		}
	}, {
		key: "appendComposed",
		value: function appendComposed() {
			var _computed$composed;

			(_computed$composed = this.computed.composed).push.apply(_computed$composed, arguments);
		}
	}, {
		key: "createComposed2Parent",
		value: function createComposed2Parent() {
			var style = this.getStyle();
			var margin = style.margin,
			    border = style.border,
			    width = style.width,
			    background = style.background;

			var gap = this.getContentGap(style);
			var y = 0;
			var positionedLines = this.computed.composed.map(function (line, i) {
				var _line$props = line.props,
				    width = _line$props.width,
				    height = _line$props.height;

				var positionedLine = _react2.default.createElement(
					_group2.default,
					{ y: y, width: width, height: height, key: i },
					line
				);
				y += height;
				return positionedLine;
			});

			return _react2.default.createElement(
				ComposedCell,
				{ width: width, height: y + gap.top + gap.bottom, background: background },
				_react2.default.createElement(Border, { border: border }),
				_react2.default.createElement(
					_group2.default,
					{ x: gap.left, y: gap.top },
					positionedLines
				)
			);
		}
	}, {
		key: "nextAvailableSpace",
		value: function nextAvailableSpace(required) {
			var style = this.getStyle();
			var gap = this.getContentGap(style);
			var width = style.width - gap.right - gap.left;

			return { width: width, height: _maxSafeInteger2.default };
		}
	}, {
		key: "getContentGap",
		value: function getContentGap(style) {
			return { left: 0, right: 0, top: 0, bottom: 0 };
		}
	}]);
	return Cell;
}(_any2.default);

Cell.displayName = "cell";
exports.default = Cell;

var ComposedCell = function (_Component) {
	(0, _inherits3.default)(ComposedCell, _Component);

	function ComposedCell() {
		(0, _classCallCheck3.default)(this, ComposedCell);
		return (0, _possibleConstructorReturn3.default)(this, (ComposedCell.__proto__ || (0, _getPrototypeOf2.default)(ComposedCell)).apply(this, arguments));
	}

	(0, _createClass3.default)(ComposedCell, [{
		key: "getChildContext",
		value: function getChildContext() {
			return {
				cellSize: {
					width: this.props.width,
					height: this.props.height
				}
			};
		}
	}, {
		key: "render",
		value: function render() {
			var _props = this.props,
			    width = _props.width,
			    height = _props.height,
			    background = _props.background,
			    children = _props.children,
			    others = (0, _objectWithoutProperties3.default)(_props, ["width", "height", "background", "children"]);
			var rowSize = this.context.rowSize;

			return _react2.default.createElement(
				_group2.default,
				others,
				background ? _react2.default.createElement("rect", { width: width, height: rowSize.height, fill: background }) : null,
				children
			);
		}
	}]);
	return ComposedCell;
}(_react.Component);

ComposedCell.contextTypes = {
	rowSize: _react.PropTypes.object
};
ComposedCell.childContextTypes = {
	cellSize: _react.PropTypes.object
};

var Border = function (_Component2) {
	(0, _inherits3.default)(Border, _Component2);

	function Border() {
		(0, _classCallCheck3.default)(this, Border);
		return (0, _possibleConstructorReturn3.default)(this, (Border.__proto__ || (0, _getPrototypeOf2.default)(Border)).apply(this, arguments));
	}

	(0, _createClass3.default)(Border, [{
		key: "render",
		value: function render() {
			var _props$border = this.props.border,
			    left = _props$border.left,
			    right = _props$border.right,
			    bottom = _props$border.bottom,
			    top = _props$border.top;
			var _context = this.context,
			    height = _context.rowSize.height,
			    width = _context.cellSize.width;

			return _react2.default.createElement(
				_group2.default,
				null,
				top.sz && _react2.default.createElement("path", { strokeWidth: top.sz, stroke: top.color, d: "M0 0 L" + width + " 0" }),
				bottom.sz && _react2.default.createElement("path", { strokeWidth: bottom.sz, stroke: bottom.color, d: "M0 " + height + " L" + width + " " + height }),
				right.sz && _react2.default.createElement("path", { strokeWidth: right.sz, stroke: right.color, d: "M" + width + " 0 L" + width + " " + height }),
				left.sz && _react2.default.createElement("path", { strokeWidth: left.sz, stroke: left.color, d: "M0 0 L0 " + height })
			);
		}
	}]);
	return Border;
}(_react.Component);

Border.contextTypes = {
	rowSize: _react.PropTypes.object,
	cellSize: _react.PropTypes.object
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2NlbGwuanMiXSwibmFtZXMiOlsiQ2VsbCIsImdldENvbnRlbnQiLCJjb21wdXRlZCIsImNvbXBvc2VkIiwicHVzaCIsImFyZ3VtZW50cyIsInN0eWxlIiwiZ2V0U3R5bGUiLCJtYXJnaW4iLCJib3JkZXIiLCJ3aWR0aCIsImJhY2tncm91bmQiLCJnYXAiLCJnZXRDb250ZW50R2FwIiwieSIsInBvc2l0aW9uZWRMaW5lcyIsIm1hcCIsImxpbmUiLCJpIiwicHJvcHMiLCJoZWlnaHQiLCJwb3NpdGlvbmVkTGluZSIsInRvcCIsImJvdHRvbSIsImxlZnQiLCJyZXF1aXJlZCIsInJpZ2h0IiwiZGlzcGxheU5hbWUiLCJDb21wb3NlZENlbGwiLCJjZWxsU2l6ZSIsImNoaWxkcmVuIiwib3RoZXJzIiwicm93U2l6ZSIsImNvbnRleHQiLCJjb250ZXh0VHlwZXMiLCJvYmplY3QiLCJjaGlsZENvbnRleHRUeXBlcyIsIkJvcmRlciIsInN6IiwiY29sb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUVBOzs7O0FBQ0E7Ozs7OztJQUVxQkEsSTs7Ozs7Ozs7OzsyQkFHWjtBQUNQLFVBQU87QUFBQTtBQUFBO0FBQUssU0FBS0MsVUFBTDtBQUFMLElBQVA7QUFDQTs7O21DQUVlO0FBQUE7O0FBQ2YsOEJBQUtDLFFBQUwsQ0FBY0MsUUFBZCxFQUF1QkMsSUFBdkIsMkJBQStCQyxTQUEvQjtBQUNBOzs7MENBRXNCO0FBQ3RCLE9BQU1DLFFBQU0sS0FBS0MsUUFBTCxFQUFaO0FBRHNCLE9BRWpCQyxNQUZpQixHQUVlRixLQUZmLENBRWpCRSxNQUZpQjtBQUFBLE9BRVZDLE1BRlUsR0FFZUgsS0FGZixDQUVWRyxNQUZVO0FBQUEsT0FFSEMsS0FGRyxHQUVlSixLQUZmLENBRUhJLEtBRkc7QUFBQSxPQUVHQyxVQUZILEdBRWVMLEtBRmYsQ0FFR0ssVUFGSDs7QUFHdEIsT0FBSUMsTUFB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T0FFNEJWLEtBRjVCLFlBRWtCbUIsUUFGbEIsQ0FFNEJuQixLQUY1Qjs7QUFHUCxVQUNDO0FBQUE7QUFBQTtBQUNFWSxRQUFJZ0IsRUFBSixJQUFVLHdDQUFNLGFBQWFoQixJQUFJZ0IsRUFBdkIsRUFBMkIsUUFBUWhCLElBQUlpQixLQUF2QyxFQUE4QyxjQUFZN0IsS0FBWixPQUE5QyxHQURaO0FBRUVhLFdBQU9lLEVBQVAsSUFBYSx3Q0FBTSxhQUFhZixPQUFPZSxFQUExQixFQUE4QixRQUFRZixPQUFPZ0IsS0FBN0MsRUFBb0QsV0FBU25CLE1BQVQsVUFBb0JWLEtBQXBCLFNBQTZCVSxNQUFqRixHQUZmO0FBR0VNLFVBQU1ZLEVBQU4sSUFBWSx3Q0FBTSxhQUFhWixNQUFNWSxFQUF6QixFQUE2QixRQUFRWixNQUFNYSxLQUEzQyxFQUFrRCxTQUFPN0IsS0FBUCxZQUFtQkEsS0FBbkIsU0FBNEJVLE1BQTlFLEdBSGQ7QUFJRUksU0FBS2MsRUFBTCxJQUFXLHdDQUFNLGFBQWFkLEtBQUtjLEVBQXhCLEVBQTRCLFFBQVFkLEtBQUtlLEtBQXpDLEVBQWdELGdCQUFjbkIsTUFBOUQ7QUFKYixJQUREO0FBUUE7Ozs7O0FBaEJJaUIsTSxDQUNFSCxZLEdBQWE7QUFDbkJGLFVBQVMsaUJBQVVHLE1BREE7QUFFbkJOLFdBQVUsaUJBQVVNO0FBRkQsQyIsImZpbGUiOiJjZWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcblxyXG5pbXBvcnQgQW55IGZyb20gXCIuL2FueVwiXHJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZWQvZ3JvdXBcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2VsbCBleHRlbmRzIEFueXtcclxuXHRzdGF0aWMgZGlzcGxheU5hbWU9XCJjZWxsXCJcclxuXHJcblx0cmVuZGVyKCl7XHJcblx0XHRyZXR1cm4gPHRkPnt0aGlzLmdldENvbnRlbnQoKX08L3RkPlxyXG5cdH1cclxuXHJcblx0YXBwZW5kQ29tcG9zZWQoKXtcclxuXHRcdHRoaXMuY29tcHV0ZWQuY29tcG9zZWQucHVzaCguLi5hcmd1bWVudHMpXHJcblx0fVxyXG5cclxuXHRjcmVhdGVDb21wb3NlZDJQYXJlbnQoKXtcclxuXHRcdGNvbnN0IHN0eWxlPXRoaXMuZ2V0U3R5bGUoKVxyXG5cdFx0bGV0IHttYXJnaW4sYm9yZGVyLHdpZHRoLGJhY2tncm91bmR9PXN0eWxlXHJcblx0XHRsZXQgZ2FwPXRoaXMuZ2V0Q29udGVudEdhcChzdHlsZSlcclxuXHRcdGxldCB5PTBcclxuXHRcdGxldCBwb3NpdGlvbmVkTGluZXM9dGhpcy5jb21wdXRlZC5jb21wb3NlZC5tYXAoKGxpbmUsaSk9PntcclxuXHRcdFx0Y29uc3Qge3dpZHRoLGhlaWdodH09bGluZS5wcm9wc1xyXG5cdFx0XHRsZXQgcG9zaXRpb25lZExpbmU9KDxHcm91cCB5PXt5fSB3aWR0aD17d2lkdGh9IGhlaWdodD17aGVpZ2h0fSBrZXk9e2l9PntsaW5lfTwvR3JvdXA+KVxyXG5cdFx0XHR5Kz1oZWlnaHRcclxuXHRcdFx0cmV0dXJuIHBvc2l0aW9uZWRMaW5lXHJcblx0XHR9KVxyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxDb21wb3NlZENlbGwgd2lkdGg9e3dpZHRofSBoZWlnaHQ9e3krZ2FwLnRvcCtnYXAuYm90dG9tfSBiYWNrZ3JvdW5kPXtiYWNrZ3JvdW5kfT5cclxuXHRcdFx0XHQ8Qm9yZGVyIGJvcmRlcj17Ym9yZGVyfS8+XHJcblx0XHRcdFx0PEdyb3VwIHg9e2dhcC5sZWZ0fSB5PXtnYXAudG9wfT5cclxuXHRcdFx0XHRcdHtwb3NpdGlvbmVkTGluZXN9XHJcblx0XHRcdFx0PC9Hcm91cD5cclxuXHRcdFx0PC9Db21wb3NlZENlbGw+XHJcblx0XHQpXHJcblx0fVxyXG5cclxuXHRuZXh0QXZhaWxhYmxlU3BhY2UocmVxdWlyZWQpe1xyXG5cdFx0Y29uc3Qgc3R5bGU9dGhpcy5nZXRTdHlsZSgpXHJcblx0XHRjb25zdCBnYXA9dGhpcy5nZXRDb250ZW50R2FwKHN0eWxlKVxyXG5cdFx0bGV0IHdpZHRoPXN0eWxlLndpZHRoLWdhcC5yaWdodC1nYXAubGVmdFxyXG5cclxuXHRcdHJldHVybiB7d2lkdGgsaGVpZ2h0Ok51bWJlci5NQVhfU0FGRV9JTlRFR0VSfVxyXG5cdH1cclxuXHJcblx0Z2V0Q29udGVudEdhcChzdHlsZSl7XHJcblx0XHRyZXR1cm4ge2xlZnQ6MCxyaWdodDowLHRvcDowLGJvdHRvbTowfVxyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgQ29tcG9zZWRDZWxsIGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xyXG5cdFx0cm93U2l6ZTogUHJvcFR5cGVzLm9iamVjdFxyXG5cdH1cclxuXHRzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9e1xyXG5cdFx0Y2VsbFNpemU6UHJvcFR5cGVzLm9iamVjdFxyXG5cdH1cclxuXHJcblx0Z2V0Q2hpbGRDb250ZXh0KCl7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRjZWxsU2l6ZToge1xyXG5cdFx0XHRcdHdpZHRoOiB0aGlzLnByb3BzLndpZHRoLFxyXG5cdFx0XHRcdGhlaWdodDogdGhpcy5wcm9wcy5oZWlnaHRcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmVuZGVyKCl7XHJcblx0XHRjb25zdCB7d2lkdGgsaGVpZ2h0LCBiYWNrZ3JvdW5kLCBjaGlsZHJlbiwgLi4ub3RoZXJzfT10aGlzLnByb3BzXHJcblx0XHRjb25zdCB7cm93U2l6ZX09dGhpcy5jb250ZXh0XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8R3JvdXAgey4uLm90aGVyc30+XHJcblx0XHRcdFx0e2JhY2tncm91bmQgPyAoPHJlY3Qgd2lkdGg9e3dpZHRofSBoZWlnaHQ9e3Jvd1NpemUuaGVpZ2h0fSBmaWxsPXtiYWNrZ3JvdW5kfS8+KSA6IG51bGx9XHJcblx0XHRcdFx0e2NoaWxkcmVufVxyXG5cdFx0XHQ8L0dyb3VwPlxyXG5cdFx0KVxyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgQm9yZGVyIGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xyXG5cdFx0cm93U2l6ZTogUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdGNlbGxTaXplOiBQcm9wVHlwZXMub2JqZWN0XHJcblx0fVxyXG5cdHJlbmRlcigpe1xyXG5cdFx0Y29uc3Qge2xlZnQscmlnaHQsYm90dG9tLHRvcH09dGhpcy5wcm9wcy5ib3JkZXJcclxuXHRcdGNvbnN0IHtyb3dTaXplOntoZWlnaHR9LCBjZWxsU2l6ZTp7d2lkdGh9fT10aGlzLmNvbnRleHRcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxHcm91cD5cclxuXHRcdFx0XHR7dG9wLnN6ICYmIDxwYXRoIHN0cm9rZVdpZHRoPXt0b3Auc3p9IHN0cm9rZT17dG9wLmNvbG9yfSBkPXtgTTAgMCBMJHt3aWR0aH0gMGB9Lz59XHJcblx0XHRcdFx0e2JvdHRvbS5zeiAmJiA8cGF0aCBzdHJva2VXaWR0aD17Ym90dG9tLnN6fSBzdHJva2U9e2JvdHRvbS5jb2xvcn0gZD17YE0wICR7aGVpZ2h0fSBMJHt3aWR0aH0gJHtoZWlnaHR9YH0vPn1cclxuXHRcdFx0XHR7cmlnaHQuc3ogJiYgPHBhdGggc3Ryb2tlV2lkdGg9e3JpZ2h0LnN6fSBzdHJva2U9e3JpZ2h0LmNvbG9yfSBkPXtgTSR7d2lkdGh9IDAgTCR7d2lkdGh9ICR7aGVpZ2h0fWB9Lz59XHJcblx0XHRcdFx0e2xlZnQuc3ogJiYgPHBhdGggc3Ryb2tlV2lkdGg9e2xlZnQuc3p9IHN0cm9rZT17bGVmdC5jb2xvcn0gZD17YE0wIDAgTDAgJHtoZWlnaHR9YH0vPn1cclxuXHRcdFx0PC9Hcm91cD5cclxuXHRcdClcclxuXHR9XHJcbn1cclxuIl19