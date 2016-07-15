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

			return { width: cols[this.computed.children.length], height: Number.MAX_VALUE };
		}
	}, {
		key: "appendComposed",
		value: function appendComposed(line) {
			if (this.computed.composed.length == 0) this.computed.composed.push([]);
			var currentCell = this.computed.composed[this.computed.composed.length - 1];
			currentCell.push(line);
		}
	}, {
		key: "on1ChildComposed",
		value: function on1ChildComposed() {
			this.computed.composed.push([]);
			_get(Object.getPrototypeOf(Row.prototype), "on1ChildComposed", this).apply(this, arguments);
		}
	}, {
		key: "onAllChildrenComposed",
		value: function onAllChildrenComposed() {
			var _this2 = this;

			this.computed.composed.splice(this.computed.children.length); //on1ChildComposed will always add 1

			var parent = this.context.parent;

			var indexes = new Array(this.computed.composed.length);
			indexes.fill(0);

			var isAllSent2Table = function isAllSent2Table(a) {
				return indexes.reduce(function (prev, index, i) {
					return _this2.computed.composed[i].length == index && prev;
				}, true);
			};

			var counter = 0;
			var minSpace = {};

			var _loop = function _loop() {
				var availableSpace = parent.nextAvailableSpace(minSpace);
				var currentGroupedLines = new Array(_this2.computed.composed.length);
				_this2.computed.composed.forEach(function (lines, i) {
					var style = _this2.computed.children[i].getStyle();
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
						var _computed$children$i$ = _this2.computed.children[i].getStyle();

						var border = _computed$children$i$.border;
						var margin = _computed$children$i$.margin;
						var spacing = _computed$children$i$.spacing;

						var line = _this2.computed.composed[i][index];
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
			var children = this.computed.children;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3Jvdy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUI7OztBQUVwQixVQUZvQixHQUVwQixHQUFhO3dCQUZPLEtBRVA7O3FFQUZPLGlCQUdWLFlBREc7O0FBRVosUUFBSyxLQUFMLENBQVcsWUFBWCxDQUF3QixRQUF4QixDQUFpQyxPQUFqQyxHQUF5QyxNQUFLLE9BQUwsQ0FBYSxVQUFiLENBRjdCOztFQUFiOztjQUZvQjs7dUNBT0E7T0FDWixPQUFNLEtBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsS0FBcEIsQ0FBTixLQURZOztBQUVuQixVQUFPLEVBQUMsT0FBTSxLQUFLLEtBQUssUUFBTCxDQUFjLFFBQWQsQ0FBdUIsTUFBdkIsQ0FBWCxFQUEyQyxRQUFPLE9BQU8sU0FBUCxFQUExRCxDQUZtQjs7OztpQ0FLTCxNQUFLO0FBQ25CLE9BQUcsS0FBSyxRQUFMLENBQWMsUUFBZCxDQUF1QixNQUF2QixJQUErQixDQUEvQixFQUNGLEtBQUssUUFBTCxDQUFjLFFBQWQsQ0FBdUIsSUFBdkIsQ0FBNEIsRUFBNUIsRUFERDtBQUVBLE9BQU0sY0FBWSxLQUFLLFFBQUwsQ0FBYyxRQUFkLENBQXVCLEtBQUssUUFBTCxDQUFjLFFBQWQsQ0FBdUIsTUFBdkIsR0FBOEIsQ0FBOUIsQ0FBbkMsQ0FIYTtBQUluQixlQUFZLElBQVosQ0FBaUIsSUFBakIsRUFKbUI7Ozs7cUNBT0Y7QUFDakIsUUFBSyxRQUFMLENBQWMsUUFBZCxDQUF1QixJQUF2QixDQUE0QixFQUE1QixFQURpQjtBQUVqQiw4QkFyQm1CLHNEQXFCTyxVQUExQixDQUZpQjs7OzswQ0FLSzs7O0FBQ3RCLFFBQUssUUFBTCxDQUFjLFFBQWQsQ0FBdUIsTUFBdkIsQ0FBOEIsS0FBSyxRQUFMLENBQWMsUUFBZCxDQUF1QixNQUF2QixDQUE5Qjs7QUFEc0IsT0FHZixTQUFRLEtBQUssT0FBTCxD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b3cuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcblxyXG5pbXBvcnQgQ29udGFpbmVyIGZyb20gXCIuL2NvbnRhaW5lclwiXHJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZWQvZ3JvdXBcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm93IGV4dGVuZHMgQ29udGFpbmVye1xyXG5cdHN0YXRpYyBkaXNwbGF5TmFtZT1cInJvd1wiXHJcblx0Y29uc3RydWN0b3IoKXtcclxuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcclxuXHRcdHRoaXMucHJvcHMuY29udGVudFN0eWxlLm1ldGFkYXRhLmJhc2VkT249dGhpcy5jb250ZXh0LnRhYmxlU3R5bGVcclxuXHR9XHJcblxyXG5cdG5leHRBdmFpbGFibGVTcGFjZSgpe1xyXG5cdFx0Y29uc3Qge2NvbHN9PXRoaXMuY29udGV4dC5wYXJlbnQucHJvcHNcclxuXHRcdHJldHVybiB7d2lkdGg6Y29sc1t0aGlzLmNvbXB1dGVkLmNoaWxkcmVuLmxlbmd0aF0sIGhlaWdodDpOdW1iZXIuTUFYX1ZBTFVFfVxyXG5cdH1cclxuXHJcblx0YXBwZW5kQ29tcG9zZWQobGluZSl7XHJcblx0XHRpZih0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLmxlbmd0aD09MClcclxuXHRcdFx0dGhpcy5jb21wdXRlZC5jb21wb3NlZC5wdXNoKFtdKVxyXG5cdFx0Y29uc3QgY3VycmVudENlbGw9dGhpcy5jb21wdXRlZC5jb21wb3NlZFt0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLmxlbmd0aC0xXVxyXG5cdFx0Y3VycmVudENlbGwucHVzaChsaW5lKVxyXG5cdH1cclxuXHJcblx0b24xQ2hpbGRDb21wb3NlZCgpe1xyXG5cdFx0dGhpcy5jb21wdXRlZC5jb21wb3NlZC5wdXNoKFtdKVxyXG5cdFx0c3VwZXIub24xQ2hpbGRDb21wb3NlZCguLi5hcmd1bWVudHMpXHJcblx0fVxyXG5cclxuXHRvbkFsbENoaWxkcmVuQ29tcG9zZWQoKXtcclxuXHRcdHRoaXMuY29tcHV0ZWQuY29tcG9zZWQuc3BsaWNlKHRoaXMuY29tcHV0ZWQuY2hpbGRyZW4ubGVuZ3RoKS8vb24xQ2hpbGRDb21wb3NlZCB3aWxsIGFsd2F5cyBhZGQgMVxyXG5cclxuXHRcdGNvbnN0IHtwYXJlbnR9PXRoaXMuY29udGV4dFxyXG5cdFx0bGV0IGluZGV4ZXM9bmV3IEFycmF5KHRoaXMuY29tcHV0ZWQuY29tcG9zZWQubGVuZ3RoKVxyXG5cdFx0aW5kZXhlcy5maWxsKDApXHJcblxyXG5cdFx0bGV0IGlzQWxsU2VudDJUYWJsZT1hPT5pbmRleGVzLnJlZHVjZSgocHJldixpbmRleCwgaSk9PnRoaXMuY29tcHV0ZWQuY29tcG9zZWRbaV0ubGVuZ3RoPT1pbmRleCAmJiBwcmV2LCB0cnVlKVxyXG5cclxuXHRcdGxldCBjb3VudGVyPTBcclxuXHRcdGxldCBtaW5TcGFjZT17fVxyXG5cdFx0ZG97XHJcblx0XHRcdGxldCBhdmFpbGFibGVTcGFjZT1wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKG1pblNwYWNlKVxyXG5cdFx0XHRsZXQgY3VycmVudEdyb3VwZWRMaW5lcz1uZXcgQXJyYXkodGhpcy5jb21wdXRlZC5jb21wb3NlZC5sZW5ndGgpXHJcblx0XHRcdHRoaXMuY29tcHV0ZWQuY29tcG9zZWQuZm9yRWFjaCgobGluZXMsaSk9PntcclxuXHRcdFx0XHRsZXQgc3R5bGU9dGhpcy5jb21wdXRlZC5jaGlsZHJlbltpXS5nZXRTdHlsZSgpXHJcblx0XHRcdFx0bGV0IHtib3JkZXIsIG1hcmdpbixzcGFjaW5nfT1zdHlsZVxyXG5cclxuXHRcdFx0XHRsZXQgaGVpZ2h0PWF2YWlsYWJsZVNwYWNlLmhlaWdodFxyXG5cdFx0XHRcdFx0LWJvcmRlci50b3Auc3pcclxuXHRcdFx0XHRcdC1ib3JkZXIuYm90dG9tLnN6XHJcblx0XHRcdFx0XHQtbWFyZ2luLnRvcFxyXG5cdFx0XHRcdFx0LW1hcmdpbi5ib3R0b21cclxuXHRcdFx0XHRcdC1zcGFjaW5nXHJcblxyXG5cdFx0XHRcdGxldCBpbmRleD1pbmRleGVzW2ldXHJcblx0XHRcdFx0bGV0IHN0YXJ0PWluZGV4XHJcblx0XHRcdFx0Zm9yKGxldCBsZW49bGluZXMubGVuZ3RoOyBpbmRleDxsZW4gJiYgaGVpZ2h0PjA7IGluZGV4Kyspe1xyXG5cdFx0XHRcdFx0bGV0IGxpbmU9bGluZXNbaW5kZXhdXHJcblx0XHRcdFx0XHRoZWlnaHQtPWxpbmUucHJvcHMuaGVpZ2h0XHJcblx0XHRcdFx0XHRpZihoZWlnaHQ8MCl7XHJcblx0XHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0XHR9ZWxzZXtcclxuXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGluZGV4ZXNbaV09aW5kZXhcclxuXHJcblx0XHRcdFx0Y3VycmVudEdyb3VwZWRMaW5lc1tpXT1saW5lcy5zbGljZShzdGFydCxpbmRleClcclxuXHRcdFx0XHRjdXJyZW50R3JvdXBlZExpbmVzW2ldLnN0eWxlPXN0eWxlXHJcblx0XHRcdH0pXHJcblxyXG5cdFx0XHRpZighY3VycmVudEdyb3VwZWRMaW5lcy5maW5kKGE9PmEubGVuZ3RoPjApKXtcclxuXHRcdFx0XHQvL2F2YWlsYWJsZVNwYWNlIGlzIHRvbyBzbWFsbCwgbmVlZCBmaW5kIGEgbWluIGF2YWlsYWJsZSBzcGFjZVxyXG5cdFx0XHRcdGxldCBtaW5IZWlnaHQ9aW5kZXhlcy5yZWR1Y2UoKHAsaW5kZXgsaSk9PntcclxuXHRcdFx0XHRcdGxldCB7Ym9yZGVyLCBtYXJnaW4sIHNwYWNpbmd9PXRoaXMuY29tcHV0ZWQuY2hpbGRyZW5baV0uZ2V0U3R5bGUoKVxyXG5cdFx0XHRcdFx0bGV0IGxpbmU9dGhpcy5jb21wdXRlZC5jb21wb3NlZFtpXVtpbmRleF1cclxuXHRcdFx0XHRcdGlmKGxpbmUpe1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gTWF0aC5tYXgocCwgbGluZS5wcm9wcy5oZWlnaHRcclxuXHRcdFx0XHRcdFx0XHQrYm9yZGVyLnRvcC5zelxyXG5cdFx0XHRcdFx0XHRcdCtib3JkZXIuYm90dG9tLnN6XHJcblx0XHRcdFx0XHRcdFx0K21hcmdpbi50b3BcclxuXHRcdFx0XHRcdFx0XHQrbWFyZ2luLmJvdHRvbVxyXG5cdFx0XHRcdFx0XHRcdCtzcGFjaW5nKVxyXG5cdFx0XHRcdFx0fWVsc2VcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHBcclxuXHRcdFx0XHR9LDApXHJcblx0XHRcdFx0bWluU3BhY2UuaGVpZ2h0PW1pbkhlaWdodFxyXG5cdFx0XHR9ZWxzZVxyXG5cdFx0XHRcdHBhcmVudC5hcHBlbmRDb21wb3NlZChjdXJyZW50R3JvdXBlZExpbmVzKVxyXG5cdFx0XHQvL2lmKGNvdW50ZXIrKz4xMDApXHJcblx0XHRcdFx0Ly90aHJvdyBuZXcgRXJyb3IoXCJ0aGVyZSBzaG91bGQgYmUgYSBpbmZpbml0ZSBsb29wIGR1cmluZyByb3cgc3BsaXQsIHBsZWFzZSBjaGVja1wiKVxyXG5cclxuXHJcblx0XHR9d2hpbGUoIWlzQWxsU2VudDJUYWJsZSgpKTtcclxuXHJcblx0XHRzdXBlci5vbkFsbENoaWxkcmVuQ29tcG9zZWQoKVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGNvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcclxuXHRcdHRhYmxlU3R5bGU6IFByb3BUeXBlcy5vYmplY3RcclxuXHR9LCBDb250YWluZXIuY29udGV4dFR5cGVzKVxyXG5cclxuXHRzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9T2JqZWN0LmFzc2lnbih7XHJcblx0XHRjb25kaXRpb25zOiBQcm9wVHlwZXMuYXJyYXksXHJcblx0XHRyb3dTdHlsZTogUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdGlzRmlyc3RDb2w6IFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0aXNMYXN0Q29sOiBQcm9wVHlwZXMuZnVuY1xyXG5cdH0sIENvbnRhaW5lci5jaGlsZENvbnRleHRUeXBlcylcclxuXHJcblx0Z2V0Q2hpbGRDb250ZXh0KCl7XHJcblx0XHRsZXQgY2hpbGRyZW49dGhpcy5jb21wdXRlZC5jaGlsZHJlblxyXG5cdFx0bGV0IGNvbnRlbnRMZW5ndGg9dGhpcy5nZXRDb250ZW50Q291bnQoKVxyXG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oc3VwZXIuZ2V0Q2hpbGRDb250ZXh0KCkse1xyXG5cdFx0XHRjb25kaXRpb25zOiB0aGlzLnByb3BzLmNvbnRlbnRTdHlsZS5nZXQoJ2NuZlN0eWxlJyl8fFtdLFxyXG5cdFx0XHRyb3dTdHlsZTogdGhpcy5wcm9wcy5jb250ZW50U3R5bGUsXHJcblx0XHRcdGlzRmlyc3RDb2woKXtcclxuXHRcdFx0XHRyZXR1cm4gY2hpbGRyZW4ubGVuZ3RoPT0wXHJcblx0XHRcdH0sXHJcblx0XHRcdGlzTGFzdENvbCgpe1xyXG5cdFx0XHRcdHJldHVybiBjaGlsZHJlbi5sZW5ndGg9PWNvbnRlbnRMZW5ndGgtMVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgQ2VsbExpbmVzV2l0aENlbGxTdHlsZSBleHRlbmRzIEFycmF5e1xyXG5cdGNvbnN0cnVjdG9yKHN0eWxlLC4uLm90aGVycyl7XHJcblx0XHRzdXBlcihvdGhlcnMpXHJcblx0XHR0aGlzLnN0eWxlPXN0eWxlXHJcblx0fVxyXG59XHJcbiJdfQ==