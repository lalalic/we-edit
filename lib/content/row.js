"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _any = require("./any");

var _any2 = _interopRequireDefault(_any);

var _group = require("../composed/group");

var _group2 = _interopRequireDefault(_group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Super = _any2.default;

var Row = function (_Super) {
	_inherits(Row, _Super);

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
}(Super);

Row.displayName = "row";
Row.contextTypes = Object.assign({
	tableStyle: _react.PropTypes.object
}, Super.contextTypes);
Row.childContextTypes = Object.assign({
	conditions: _react.PropTypes.array,
	rowStyle: _react.PropTypes.object,
	isFirstCol: _react.PropTypes.func,
	isLastCol: _react.PropTypes.func
}, Super.childContextTypes);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3Jvdy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNLHFCQUFOOztJQUNxQjs7O0FBRXBCLFVBRm9CLEdBRXBCLEdBQWE7d0JBRk8sS0FFUDs7cUVBRk8saUJBR1YsWUFERzs7QUFFWixRQUFLLEtBQUwsQ0FBVyxZQUFYLENBQXdCLFFBQXhCLENBQWlDLE9BQWpDLEdBQXlDLE1BQUssT0FBTCxDQUFhLFVBQWIsQ0FGN0I7O0VBQWI7O2NBRm9COzt1Q0FPQTtPQUNaLE9BQU0sS0FBSyxPQUFMLENBQWEsTUFBYixDQUFvQixLQUFwQixDQUFOLEtBRFk7O0FBRW5CLFVBQU8sRUFBQyxPQUFNLEtBQUssS0FBSyxRQUFMLENBQWMsUUFBZCxDQUF1QixNQUF2QixDQUFYLEVBQTJDLFFBQU8sT0FBTyxTQUFQLEVBQTFELENBRm1COzs7O2lDQUtMLE1BQUs7QUFDbkIsT0FBRyxLQUFLLFFBQUwsQ0FBYyxRQUFkLENBQXVCLE1BQXZCLElBQStCLENBQS9CLEVBQ0YsS0FBSyxRQUFMLENBQWMsUUFBZCxDQUF1QixJQUF2QixDQUE0QixFQUE1QixFQUREO0FBRUEsT0FBTSxjQUFZLEtBQUssUUFBTCxDQUFjLFFBQWQsQ0FBdUIsS0FBSyxRQUFMLENBQWMsUUFBZCxDQUF1QixNQUF2QixHQUE4QixDQUE5QixDQUFuQyxDQUhhO0FBSW5CLGVBQVksSUFBWixDQUFpQixJQUFqQixFQUptQjs7OztxQ0FPRjtBQUNqQixRQUFLLFFBQUwsQ0FBYyxRQUFkLENBQXVCLElBQXZCLENBQTRCLEVBQTVCLEVBRGlCO0FBRWpCLDhCQXJCbUIsc0RBcUJPLFVBQTFCLENBRmlCOzs7OzBDQUtLOzs7QUFDdEIsUUFBSyxRQUFMLENBQWMsUUFBZCxDQUF1QixNQUF2QixDQUE4QixLQUFLLFFBQUwsQ0FBYyxRQUFkLENBQXVCLE1BQXZCLENBQTlCOztBQURzQixPQUdm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Qjs7UUFESztFQUErQiIsImZpbGUiOiJyb3cuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcblxyXG5pbXBvcnQgQW55IGZyb20gXCIuL2FueVwiXHJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZWQvZ3JvdXBcIlxyXG5cclxuY29uc3QgU3VwZXI9QW55XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvdyBleHRlbmRzIFN1cGVye1xyXG5cdHN0YXRpYyBkaXNwbGF5TmFtZT1cInJvd1wiXHJcblx0Y29uc3RydWN0b3IoKXtcclxuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcclxuXHRcdHRoaXMucHJvcHMuY29udGVudFN0eWxlLm1ldGFkYXRhLmJhc2VkT249dGhpcy5jb250ZXh0LnRhYmxlU3R5bGVcclxuXHR9XHJcblxyXG5cdG5leHRBdmFpbGFibGVTcGFjZSgpe1xyXG5cdFx0Y29uc3Qge2NvbHN9PXRoaXMuY29udGV4dC5wYXJlbnQucHJvcHNcclxuXHRcdHJldHVybiB7d2lkdGg6Y29sc1t0aGlzLmNvbXB1dGVkLmNoaWxkcmVuLmxlbmd0aF0sIGhlaWdodDpOdW1iZXIuTUFYX1ZBTFVFfVxyXG5cdH1cclxuXHJcblx0YXBwZW5kQ29tcG9zZWQobGluZSl7XHJcblx0XHRpZih0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLmxlbmd0aD09MClcclxuXHRcdFx0dGhpcy5jb21wdXRlZC5jb21wb3NlZC5wdXNoKFtdKVxyXG5cdFx0Y29uc3QgY3VycmVudENlbGw9dGhpcy5jb21wdXRlZC5jb21wb3NlZFt0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLmxlbmd0aC0xXVxyXG5cdFx0Y3VycmVudENlbGwucHVzaChsaW5lKVxyXG5cdH1cclxuXHJcblx0b24xQ2hpbGRDb21wb3NlZCgpe1xyXG5cdFx0dGhpcy5jb21wdXRlZC5jb21wb3NlZC5wdXNoKFtdKVxyXG5cdFx0c3VwZXIub24xQ2hpbGRDb21wb3NlZCguLi5hcmd1bWVudHMpXHJcblx0fVxyXG5cclxuXHRvbkFsbENoaWxkcmVuQ29tcG9zZWQoKXtcclxuXHRcdHRoaXMuY29tcHV0ZWQuY29tcG9zZWQuc3BsaWNlKHRoaXMuY29tcHV0ZWQuY2hpbGRyZW4ubGVuZ3RoKS8vb24xQ2hpbGRDb21wb3NlZCB3aWxsIGFsd2F5cyBhZGQgMVxyXG5cclxuXHRcdGNvbnN0IHtwYXJlbnR9PXRoaXMuY29udGV4dFxyXG5cdFx0bGV0IGluZGV4ZXM9bmV3IEFycmF5KHRoaXMuY29tcHV0ZWQuY29tcG9zZWQubGVuZ3RoKVxyXG5cdFx0aW5kZXhlcy5maWxsKDApXHJcblxyXG5cdFx0bGV0IGlzQWxsU2VudDJUYWJsZT1hPT5pbmRleGVzLnJlZHVjZSgocHJldixpbmRleCwgaSk9PnRoaXMuY29tcHV0ZWQuY29tcG9zZWRbaV0ubGVuZ3RoPT1pbmRleCAmJiBwcmV2LCB0cnVlKVxyXG5cclxuXHRcdGxldCBjb3VudGVyPTBcclxuXHRcdGxldCBtaW5TcGFjZT17fVxyXG5cdFx0ZG97XHJcblx0XHRcdGxldCBhdmFpbGFibGVTcGFjZT1wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKG1pblNwYWNlKVxyXG5cdFx0XHRsZXQgY3VycmVudEdyb3VwZWRMaW5lcz1uZXcgQXJyYXkodGhpcy5jb21wdXRlZC5jb21wb3NlZC5sZW5ndGgpXHJcblx0XHRcdHRoaXMuY29tcHV0ZWQuY29tcG9zZWQuZm9yRWFjaCgobGluZXMsaSk9PntcclxuXHRcdFx0XHRsZXQgc3R5bGU9dGhpcy5jb21wdXRlZC5jaGlsZHJlbltpXS5nZXRTdHlsZSgpXHJcblx0XHRcdFx0bGV0IHtib3JkZXIsIG1hcmdpbixzcGFjaW5nfT1zdHlsZVxyXG5cclxuXHRcdFx0XHRsZXQgaGVpZ2h0PWF2YWlsYWJsZVNwYWNlLmhlaWdodFxyXG5cdFx0XHRcdFx0LWJvcmRlci50b3Auc3pcclxuXHRcdFx0XHRcdC1ib3JkZXIuYm90dG9tLnN6XHJcblx0XHRcdFx0XHQtbWFyZ2luLnRvcFxyXG5cdFx0XHRcdFx0LW1hcmdpbi5ib3R0b21cclxuXHRcdFx0XHRcdC1zcGFjaW5nXHJcblxyXG5cdFx0XHRcdGxldCBpbmRleD1pbmRleGVzW2ldXHJcblx0XHRcdFx0bGV0IHN0YXJ0PWluZGV4XHJcblx0XHRcdFx0Zm9yKGxldCBsZW49bGluZXMubGVuZ3RoOyBpbmRleDxsZW4gJiYgaGVpZ2h0PjA7IGluZGV4Kyspe1xyXG5cdFx0XHRcdFx0bGV0IGxpbmU9bGluZXNbaW5kZXhdXHJcblx0XHRcdFx0XHRoZWlnaHQtPWxpbmUucHJvcHMuaGVpZ2h0XHJcblx0XHRcdFx0XHRpZihoZWlnaHQ8MCl7XHJcblx0XHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0XHR9ZWxzZXtcclxuXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGluZGV4ZXNbaV09aW5kZXhcclxuXHJcblx0XHRcdFx0Y3VycmVudEdyb3VwZWRMaW5lc1tpXT1saW5lcy5zbGljZShzdGFydCxpbmRleClcclxuXHRcdFx0XHRjdXJyZW50R3JvdXBlZExpbmVzW2ldLnN0eWxlPXN0eWxlXHJcblx0XHRcdH0pXHJcblxyXG5cdFx0XHRpZighY3VycmVudEdyb3VwZWRMaW5lcy5maW5kKGE9PmEubGVuZ3RoPjApKXtcclxuXHRcdFx0XHQvL2F2YWlsYWJsZVNwYWNlIGlzIHRvbyBzbWFsbCwgbmVlZCBmaW5kIGEgbWluIGF2YWlsYWJsZSBzcGFjZVxyXG5cdFx0XHRcdGxldCBtaW5IZWlnaHQ9aW5kZXhlcy5yZWR1Y2UoKHAsaW5kZXgsaSk9PntcclxuXHRcdFx0XHRcdGxldCB7Ym9yZGVyLCBtYXJnaW4sIHNwYWNpbmd9PXRoaXMuY29tcHV0ZWQuY2hpbGRyZW5baV0uZ2V0U3R5bGUoKVxyXG5cdFx0XHRcdFx0bGV0IGxpbmU9dGhpcy5jb21wdXRlZC5jb21wb3NlZFtpXVtpbmRleF1cclxuXHRcdFx0XHRcdGlmKGxpbmUpe1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gTWF0aC5tYXgocCwgbGluZS5wcm9wcy5oZWlnaHRcclxuXHRcdFx0XHRcdFx0XHQrYm9yZGVyLnRvcC5zelxyXG5cdFx0XHRcdFx0XHRcdCtib3JkZXIuYm90dG9tLnN6XHJcblx0XHRcdFx0XHRcdFx0K21hcmdpbi50b3BcclxuXHRcdFx0XHRcdFx0XHQrbWFyZ2luLmJvdHRvbVxyXG5cdFx0XHRcdFx0XHRcdCtzcGFjaW5nKVxyXG5cdFx0XHRcdFx0fWVsc2VcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHBcclxuXHRcdFx0XHR9LDApXHJcblx0XHRcdFx0bWluU3BhY2UuaGVpZ2h0PW1pbkhlaWdodFxyXG5cdFx0XHR9ZWxzZVxyXG5cdFx0XHRcdHBhcmVudC5hcHBlbmRDb21wb3NlZChjdXJyZW50R3JvdXBlZExpbmVzKVxyXG5cdFx0XHQvL2lmKGNvdW50ZXIrKz4xMDApXHJcblx0XHRcdFx0Ly90aHJvdyBuZXcgRXJyb3IoXCJ0aGVyZSBzaG91bGQgYmUgYSBpbmZpbml0ZSBsb29wIGR1cmluZyByb3cgc3BsaXQsIHBsZWFzZSBjaGVja1wiKVxyXG5cclxuXHJcblx0XHR9d2hpbGUoIWlzQWxsU2VudDJUYWJsZSgpKTtcclxuXHJcblx0XHRzdXBlci5vbkFsbENoaWxkcmVuQ29tcG9zZWQoKVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGNvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcclxuXHRcdHRhYmxlU3R5bGU6IFByb3BUeXBlcy5vYmplY3RcclxuXHR9LCBTdXBlci5jb250ZXh0VHlwZXMpXHJcblxyXG5cdHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcclxuXHRcdGNvbmRpdGlvbnM6IFByb3BUeXBlcy5hcnJheSxcclxuXHRcdHJvd1N0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0aXNGaXJzdENvbDogUHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRpc0xhc3RDb2w6IFByb3BUeXBlcy5mdW5jXHJcblx0fSwgU3VwZXIuY2hpbGRDb250ZXh0VHlwZXMpXHJcblxyXG5cdGdldENoaWxkQ29udGV4dCgpe1xyXG5cdFx0bGV0IGNoaWxkcmVuPXRoaXMuY29tcHV0ZWQuY2hpbGRyZW5cclxuXHRcdGxldCBjb250ZW50TGVuZ3RoPXRoaXMuZ2V0Q29udGVudENvdW50KClcclxuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKHN1cGVyLmdldENoaWxkQ29udGV4dCgpLHtcclxuXHRcdFx0Y29uZGl0aW9uczogdGhpcy5wcm9wcy5jb250ZW50U3R5bGUuZ2V0KCdjbmZTdHlsZScpfHxbXSxcclxuXHRcdFx0cm93U3R5bGU6IHRoaXMucHJvcHMuY29udGVudFN0eWxlLFxyXG5cdFx0XHRpc0ZpcnN0Q29sKCl7XHJcblx0XHRcdFx0cmV0dXJuIGNoaWxkcmVuLmxlbmd0aD09MFxyXG5cdFx0XHR9LFxyXG5cdFx0XHRpc0xhc3RDb2woKXtcclxuXHRcdFx0XHRyZXR1cm4gY2hpbGRyZW4ubGVuZ3RoPT1jb250ZW50TGVuZ3RoLTFcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIENlbGxMaW5lc1dpdGhDZWxsU3R5bGUgZXh0ZW5kcyBBcnJheXtcclxuXHRjb25zdHJ1Y3RvcihzdHlsZSwuLi5vdGhlcnMpe1xyXG5cdFx0c3VwZXIob3RoZXJzKVxyXG5cdFx0dGhpcy5zdHlsZT1zdHlsZVxyXG5cdH1cclxufVxyXG4iXX0=