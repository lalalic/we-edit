"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _container = require("./container");

var _container2 = _interopRequireDefault(_container);

var _group = require("../composed/group");

var _group2 = _interopRequireDefault(_group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Row = function (_Container) {
	_inherits(Row, _Container);

	function Row() {
		_classCallCheck(this, Row);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Row).apply(this, arguments));

		_this.props.contentStyle.metadata.basedOn = _this.context.tableStyle;
		return _this;
	}

	_createClass(Row, [{
		key: "nextAvailableSpace",
		value: function nextAvailableSpace() {
			var cols = this.context.parent.props.cols;

			return { width: cols[this.children.length], height: Number.MAX_VALUE };
		}
	}, {
		key: "appendComposed",
		value: function appendComposed(line) {
			if (this.composed.length == 0) this.composed.push([]);
			var currentCell = this.composed[this.composed.length - 1];
			currentCell.push(line);
		}
	}, {
		key: "on1ChildComposed",
		value: function on1ChildComposed() {
			this.composed.push([]);
			_get(Object.getPrototypeOf(Row.prototype), "on1ChildComposed", this).apply(this, arguments);
		}
	}, {
		key: "onAllChildrenComposed",
		value: function onAllChildrenComposed() {
			var _this2 = this;

			this.composed.splice(this.children.length); //on1ChildComposed will always add 1

			var parent = this.context.parent;

			var indexes = new Array(this.composed.length);
			indexes.fill(0);

			var isAllSent2Table = function isAllSent2Table(a) {
				return indexes.reduce(function (prev, index, i) {
					return _this2.composed[i].length == index && prev;
				}, true);
			};

			var counter = 0;
			var minSpace = {};

			var _loop = function _loop() {
				var availableSpace = parent.nextAvailableSpace(minSpace);
				var currentGroupedLines = new Array(_this2.composed.length);
				_this2.composed.forEach(function (lines, i) {
					var style = _this2.children[i].getStyle();
					var border = style.border;
					var margin = style.margin;
					var spacing = style.spacing;


					var height = availableSpace.height - border.top.sz - border.bottom.sz - margin.top - margin.bottom - spacing;

					var index = indexes[i];
					var start = index;
					for (var len = lines.length; index < len && height > 0; index++) {
						var line = lines[index];
						height -= line.props.height;
						if (height < 0) {
							break;
						} else {}
					}
					indexes[i] = index;

					currentGroupedLines[i] = lines.slice(start, index);
					currentGroupedLines[i].style = style;
				});

				if (!currentGroupedLines.find(function (a) {
					return a.length > 0;
				})) {
					//availableSpace is too small, need find a min available space
					var minHeight = indexes.reduce(function (p, index, i) {
						var _children$i$getStyle = _this2.children[i].getStyle();

						var border = _children$i$getStyle.border;
						var margin = _children$i$getStyle.margin;
						var spacing = _children$i$getStyle.spacing;

						var line = _this2.composed[i][index];
						if (line) {
							return Math.max(p, line.props.height + border.top.sz + border.bottom.sz + margin.top + margin.bottom + spacing);
						} else return p;
					}, 0);
					minSpace.height = minHeight;
				} else parent.appendComposed(currentGroupedLines);
				//if(counter++>100)
				//throw new Error("there should be a infinite loop during row split, please check")
			};

			do {
				_loop();
			} while (!isAllSent2Table());

			_get(Object.getPrototypeOf(Row.prototype), "onAllChildrenComposed", this).call(this);
		}
	}, {
		key: "getChildContext",
		value: function getChildContext() {
			var children = this.children;
			var contentLength = this.getContentCount();
			return Object.assign(_get(Object.getPrototypeOf(Row.prototype), "getChildContext", this).call(this), {
				conditions: this.props.contentStyle.get('cnfStyle') || [],
				rowStyle: this.props.contentStyle,
				isFirstCol: function isFirstCol() {
					return children.length == 0;
				},
				isLastCol: function isLastCol() {
					return children.length == contentLength - 1;
				}
			});
		}
	}]);

	return Row;
}(_container2.default);

Row.displayName = "row";
Row.contextTypes = Object.assign({
	tableStyle: _react.PropTypes.object
}, _container2.default.contextTypes);
Row.childContextTypes = Object.assign({
	conditions: _react.PropTypes.array,
	rowStyle: _react.PropTypes.object,
	isFirstCol: _react.PropTypes.func,
	isLastCol: _react.PropTypes.func
}, _container2.default.childContextTypes);
exports.default = Row;

var CellLinesWithCellStyle = function (_Array) {
	_inherits(CellLinesWithCellStyle, _Array);

	function CellLinesWithCellStyle(style) {
		_classCallCheck(this, CellLinesWithCellStyle);

		for (var _len = arguments.length, others = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			others[_key - 1] = arguments[_key];
		}

		var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(CellLinesWithCellStyle).call(this, others));

		_this3.style = style;
		return _this3;
	}

	return CellLinesWithCellStyle;
}(Array);

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3Jvdy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUI7OztBQUVwQixVQUZvQixHQUVwQixHQUFhO3dCQUZPLEtBRVA7O3FFQUZPLGlCQUdWLFlBREc7O0FBRVosUUFBSyxLQUFMLENBQVcsWUFBWCxDQUF3QixRQUF4QixDQUFpQyxPQUFqQyxHQUF5QyxNQUFLLE9BQUwsQ0FBYSxVQUFiLENBRjdCOztFQUFiOztjQUZvQjs7dUNBT0E7T0FDWixPQUFNLEtBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsS0FBcEIsQ0FBTixLQURZOztBQUVuQixVQUFPLEVBQUMsT0FBTSxLQUFLLEtBQUssUUFBTCxDQUFjLE1BQWQsQ0FBWCxFQUFrQyxRQUFPLE9BQU8sU0FBUCxFQUFqRCxDQUZtQjs7OztpQ0FLTCxNQUFLO0FBQ25CLE9BQUcsS0FBSyxRQUFMLENBQWMsTUFBZCxJQUFzQixDQUF0QixFQUNGLEtBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsRUFBbkIsRUFERDtBQUVBLE9BQU0sY0FBWSxLQUFLLFFBQUwsQ0FBYyxLQUFLLFFBQUwsQ0FBYyxNQUFkLEdBQXFCLENBQXJCLENBQTFCLENBSGE7QUFJbkIsZUFBWSxJQUFaLENBQWlCLElBQWpCLEVBSm1COzs7O3FDQU9GO0FBQ2pCLFFBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsRUFBbkIsRUFEaUI7QUFFakIsOEJBckJtQixzREFxQk8sVUFBMUIsQ0FGaUI7Ozs7MENBS0s7OztBQUN0QixRQUFLLFFBQUwsQ0FBYyxNQUFkLENBQXFCLEtBQUssUUFBTCxDQUFjLE1BQWQsQ0FBckI7O0FBRHNCLE9BR2YsU0FBUSxLQUFLLE9BQUwsQ0FBUixPQUhlOztBQUl0QixPQUFJLFVBQVEsSUFBSSxLQUFKLENBQVUsS0FBSyxRQUFMLENBQWMsTUFBZCxDQUFsQixDQUprQjtBQUt0QixXQUFRLElBQVIsQ0FBYSxD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Q0FERztBQUVoQixPQUFJLGdCQUFjLEtBQUssZUFBTCxFQUFkLENBRlk7QUFHaEIsVUFBTyxPQUFPLE1BQVAsNEJBM0dZLG1EQTJHWixFQUFzQztBQUM1QyxnQkFBWSxLQUFLLEtBQUwsQ0FBVyxZQUFYLENBQXdCLEdBQXhCLENBQTRCLFVBQTVCLEtBQXlDLEVBQXpDO0FBQ1osY0FBVSxLQUFLLEtBQUwsQ0FBVyxZQUFYO0FBQ1Ysc0NBQVk7QUFDWCxZQUFPLFNBQVMsTUFBVCxJQUFpQixDQUFqQixDQURJO0tBSGdDO0FBTTVDLG9DQUFXO0FBQ1YsWUFBTyxTQUFTLE1BQVQsSUFBaUIsZ0JBQWMsQ0FBZCxDQURkO0tBTmlDO0lBQXRDLENBQVAsQ0FIZ0I7Ozs7UUF4R0c7OztJQUNiLGNBQVk7QUFEQyxJQTZGYixlQUFhLE9BQU8sTUFBUCxDQUFjO0FBQ2pDLGFBQVksaUJBQVUsTUFBVjtDQURPLEVBRWpCLG9CQUFVLFlBQVY7QUEvRmlCLElBaUdiLG9CQUFrQixPQUFPLE1BQVAsQ0FBYztBQUN0QyxhQUFZLGlCQUFVLEtBQVY7QUFDWixXQUFVLGlCQUFVLE1BQVY7QUFDVixhQUFZLGlCQUFVLElBQVY7QUFDWixZQUFXLGlCQUFVLElBQVY7Q0FKYSxFQUt0QixvQkFBVSxpQkFBVjtrQkF0R2lCOztJQXdIZjs7O0FBQ0wsVUFESyxzQkFDTCxDQUFZLEtBQVosRUFBNEI7d0JBRHZCLHdCQUN1Qjs7b0NBQVA7O0dBQU87O3NFQUR2QixtQ0FFRSxTQURxQjs7QUFFM0IsU0FBSyxLQUFMLEdBQVcsS0FBWCxDQUYyQjs7RUFBNUI7O1FBREs7RUFBK0IiLCJmaWxlIjoicm93LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5cclxuaW1wb3J0IENvbnRhaW5lciBmcm9tIFwiLi9jb250YWluZXJcIlxyXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvdyBleHRlbmRzIENvbnRhaW5lcntcclxuXHRzdGF0aWMgZGlzcGxheU5hbWU9XCJyb3dcIlxyXG5cdGNvbnN0cnVjdG9yKCl7XHJcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXHJcblx0XHR0aGlzLnByb3BzLmNvbnRlbnRTdHlsZS5tZXRhZGF0YS5iYXNlZE9uPXRoaXMuY29udGV4dC50YWJsZVN0eWxlXHJcblx0fVxyXG5cdFxyXG5cdG5leHRBdmFpbGFibGVTcGFjZSgpe1xyXG5cdFx0Y29uc3Qge2NvbHN9PXRoaXMuY29udGV4dC5wYXJlbnQucHJvcHNcclxuXHRcdHJldHVybiB7d2lkdGg6Y29sc1t0aGlzLmNoaWxkcmVuLmxlbmd0aF0sIGhlaWdodDpOdW1iZXIuTUFYX1ZBTFVFfVxyXG5cdH1cclxuXHJcblx0YXBwZW5kQ29tcG9zZWQobGluZSl7XHJcblx0XHRpZih0aGlzLmNvbXBvc2VkLmxlbmd0aD09MClcclxuXHRcdFx0dGhpcy5jb21wb3NlZC5wdXNoKFtdKVxyXG5cdFx0Y29uc3QgY3VycmVudENlbGw9dGhpcy5jb21wb3NlZFt0aGlzLmNvbXBvc2VkLmxlbmd0aC0xXVxyXG5cdFx0Y3VycmVudENlbGwucHVzaChsaW5lKVxyXG5cdH1cclxuXHJcblx0b24xQ2hpbGRDb21wb3NlZCgpe1xyXG5cdFx0dGhpcy5jb21wb3NlZC5wdXNoKFtdKVxyXG5cdFx0c3VwZXIub24xQ2hpbGRDb21wb3NlZCguLi5hcmd1bWVudHMpXHJcblx0fVxyXG5cclxuXHRvbkFsbENoaWxkcmVuQ29tcG9zZWQoKXtcclxuXHRcdHRoaXMuY29tcG9zZWQuc3BsaWNlKHRoaXMuY2hpbGRyZW4ubGVuZ3RoKS8vb24xQ2hpbGRDb21wb3NlZCB3aWxsIGFsd2F5cyBhZGQgMVxyXG5cdFx0XHJcblx0XHRjb25zdCB7cGFyZW50fT10aGlzLmNvbnRleHRcclxuXHRcdGxldCBpbmRleGVzPW5ldyBBcnJheSh0aGlzLmNvbXBvc2VkLmxlbmd0aClcclxuXHRcdGluZGV4ZXMuZmlsbCgwKVxyXG5cclxuXHRcdGxldCBpc0FsbFNlbnQyVGFibGU9YT0+aW5kZXhlcy5yZWR1Y2UoKHByZXYsaW5kZXgsIGkpPT50aGlzLmNvbXBvc2VkW2ldLmxlbmd0aD09aW5kZXggJiYgcHJldiwgdHJ1ZSlcclxuXHJcblx0XHRsZXQgY291bnRlcj0wXHJcblx0XHRsZXQgbWluU3BhY2U9e31cclxuXHRcdGRve1xyXG5cdFx0XHRsZXQgYXZhaWxhYmxlU3BhY2U9cGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZShtaW5TcGFjZSlcclxuXHRcdFx0bGV0IGN1cnJlbnRHcm91cGVkTGluZXM9bmV3IEFycmF5KHRoaXMuY29tcG9zZWQubGVuZ3RoKVxyXG5cdFx0XHR0aGlzLmNvbXBvc2VkLmZvckVhY2goKGxpbmVzLGkpPT57XHJcblx0XHRcdFx0bGV0IHN0eWxlPXRoaXMuY2hpbGRyZW5baV0uZ2V0U3R5bGUoKVxyXG5cdFx0XHRcdGxldCB7Ym9yZGVyLCBtYXJnaW4sc3BhY2luZ309c3R5bGVcclxuXHJcblx0XHRcdFx0bGV0IGhlaWdodD1hdmFpbGFibGVTcGFjZS5oZWlnaHRcclxuXHRcdFx0XHRcdC1ib3JkZXIudG9wLnN6XHJcblx0XHRcdFx0XHQtYm9yZGVyLmJvdHRvbS5zelxyXG5cdFx0XHRcdFx0LW1hcmdpbi50b3BcclxuXHRcdFx0XHRcdC1tYXJnaW4uYm90dG9tXHJcblx0XHRcdFx0XHQtc3BhY2luZ1xyXG5cclxuXHRcdFx0XHRsZXQgaW5kZXg9aW5kZXhlc1tpXVxyXG5cdFx0XHRcdGxldCBzdGFydD1pbmRleFxyXG5cdFx0XHRcdGZvcihsZXQgbGVuPWxpbmVzLmxlbmd0aDsgaW5kZXg8bGVuICYmIGhlaWdodD4wOyBpbmRleCsrKXtcclxuXHRcdFx0XHRcdGxldCBsaW5lPWxpbmVzW2luZGV4XVxyXG5cdFx0XHRcdFx0aGVpZ2h0LT1saW5lLnByb3BzLmhlaWdodFxyXG5cdFx0XHRcdFx0aWYoaGVpZ2h0PDApe1xyXG5cdFx0XHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdFx0fWVsc2V7XHJcblxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpbmRleGVzW2ldPWluZGV4XHJcblxyXG5cdFx0XHRcdGN1cnJlbnRHcm91cGVkTGluZXNbaV09bGluZXMuc2xpY2Uoc3RhcnQsaW5kZXgpXHJcblx0XHRcdFx0Y3VycmVudEdyb3VwZWRMaW5lc1tpXS5zdHlsZT1zdHlsZVxyXG5cdFx0XHR9KVxyXG5cclxuXHRcdFx0aWYoIWN1cnJlbnRHcm91cGVkTGluZXMuZmluZChhPT5hLmxlbmd0aD4wKSl7XHJcblx0XHRcdFx0Ly9hdmFpbGFibGVTcGFjZSBpcyB0b28gc21hbGwsIG5lZWQgZmluZCBhIG1pbiBhdmFpbGFibGUgc3BhY2VcclxuXHRcdFx0XHRsZXQgbWluSGVpZ2h0PWluZGV4ZXMucmVkdWNlKChwLGluZGV4LGkpPT57XHJcblx0XHRcdFx0XHRsZXQge2JvcmRlciwgbWFyZ2luLCBzcGFjaW5nfT10aGlzLmNoaWxkcmVuW2ldLmdldFN0eWxlKClcclxuXHRcdFx0XHRcdGxldCBsaW5lPXRoaXMuY29tcG9zZWRbaV1baW5kZXhdXHJcblx0XHRcdFx0XHRpZihsaW5lKXtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIE1hdGgubWF4KHAsIGxpbmUucHJvcHMuaGVpZ2h0XHJcblx0XHRcdFx0XHRcdFx0K2JvcmRlci50b3Auc3pcclxuXHRcdFx0XHRcdFx0XHQrYm9yZGVyLmJvdHRvbS5zelxyXG5cdFx0XHRcdFx0XHRcdCttYXJnaW4udG9wXHJcblx0XHRcdFx0XHRcdFx0K21hcmdpbi5ib3R0b21cclxuXHRcdFx0XHRcdFx0XHQrc3BhY2luZylcclxuXHRcdFx0XHRcdH1lbHNlXHJcblx0XHRcdFx0XHRcdHJldHVybiBwXHJcblx0XHRcdFx0fSwwKVxyXG5cdFx0XHRcdG1pblNwYWNlLmhlaWdodD1taW5IZWlnaHRcclxuXHRcdFx0fWVsc2VcclxuXHRcdFx0XHRwYXJlbnQuYXBwZW5kQ29tcG9zZWQoY3VycmVudEdyb3VwZWRMaW5lcylcclxuXHRcdFx0Ly9pZihjb3VudGVyKys+MTAwKVxyXG5cdFx0XHRcdC8vdGhyb3cgbmV3IEVycm9yKFwidGhlcmUgc2hvdWxkIGJlIGEgaW5maW5pdGUgbG9vcCBkdXJpbmcgcm93IHNwbGl0LCBwbGVhc2UgY2hlY2tcIilcclxuXHJcblxyXG5cdFx0fXdoaWxlKCFpc0FsbFNlbnQyVGFibGUoKSk7XHJcblxyXG5cdFx0c3VwZXIub25BbGxDaGlsZHJlbkNvbXBvc2VkKClcclxuXHR9XHJcblx0XHJcblx0c3RhdGljIGNvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcclxuXHRcdHRhYmxlU3R5bGU6IFByb3BUeXBlcy5vYmplY3RcclxuXHR9LCBDb250YWluZXIuY29udGV4dFR5cGVzKVxyXG5cclxuXHRzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9T2JqZWN0LmFzc2lnbih7XHJcblx0XHRjb25kaXRpb25zOiBQcm9wVHlwZXMuYXJyYXksXHJcblx0XHRyb3dTdHlsZTogUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdGlzRmlyc3RDb2w6IFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0aXNMYXN0Q29sOiBQcm9wVHlwZXMuZnVuY1xyXG5cdH0sIENvbnRhaW5lci5jaGlsZENvbnRleHRUeXBlcylcclxuXHJcblx0Z2V0Q2hpbGRDb250ZXh0KCl7XHJcblx0XHRsZXQgY2hpbGRyZW49dGhpcy5jaGlsZHJlblxyXG5cdFx0bGV0IGNvbnRlbnRMZW5ndGg9dGhpcy5nZXRDb250ZW50Q291bnQoKVxyXG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oc3VwZXIuZ2V0Q2hpbGRDb250ZXh0KCkse1xyXG5cdFx0XHRjb25kaXRpb25zOiB0aGlzLnByb3BzLmNvbnRlbnRTdHlsZS5nZXQoJ2NuZlN0eWxlJyl8fFtdLFxyXG5cdFx0XHRyb3dTdHlsZTogdGhpcy5wcm9wcy5jb250ZW50U3R5bGUsXHJcblx0XHRcdGlzRmlyc3RDb2woKXtcclxuXHRcdFx0XHRyZXR1cm4gY2hpbGRyZW4ubGVuZ3RoPT0wXHJcblx0XHRcdH0sXHJcblx0XHRcdGlzTGFzdENvbCgpe1xyXG5cdFx0XHRcdHJldHVybiBjaGlsZHJlbi5sZW5ndGg9PWNvbnRlbnRMZW5ndGgtMVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgQ2VsbExpbmVzV2l0aENlbGxTdHlsZSBleHRlbmRzIEFycmF5e1xyXG5cdGNvbnN0cnVjdG9yKHN0eWxlLC4uLm90aGVycyl7XHJcblx0XHRzdXBlcihvdGhlcnMpXHJcblx0XHR0aGlzLnN0eWxlPXN0eWxlXHJcblx0fVxyXG59XHJcbiJdfQ==