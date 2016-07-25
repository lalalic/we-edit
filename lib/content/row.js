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

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Row).apply(this, arguments));
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
		key: "getHeaderColCount",
		value: function getHeaderColCount() {
			var _ref = this.context.tableStyle.tblLook || {};

			var firstColumn = _ref.firstColumn;

			if (firstColumn == "0") return 0;
			return 1;
		}
	}, {
		key: "getChildContext",
		value: function getChildContext() {
			var self = this;

			var _ref2 = this.context.tableStyle.tblLook || {};

			var firstColumn = _ref2.firstColumn;
			var lastColumn = _ref2.lastColumn;
			var noVBand = _ref2.noVBand;

			var children = this.computed.children;
			var contentLength = this.getContentCount();
			return Object.assign(_get(Object.getPrototypeOf(Row.prototype), "getChildContext", this).call(this), {
				rowStyle: this.props.directStyle,
				isFirstCol: function isFirstCol() {
					return firstColumn == "1" && self.computed.children.length == 0;
				},
				isLastCol: function isLastCol() {
					return lastColumn == "1" && self.computed.children.length == self.getContentCount() - 1;
				},
				isBand1Vert: function isBand1Vert() {
					return noVBand == "0" && (self.computed.children.length - self.getHeaderColCount()) % 2;
				},
				isBand2Vert: function isBand2Vert() {
					return noVBand == "0" && (self.computed.children.length - self.getHeaderColCount()) % 2;
				},
				isSeCell: function isSeCell() {
					return this.isLastRow() && this.isLastCol();
				},
				isSwCell: function isSwCell() {
					return this.isLastRow() && this.isFirstCol();
				},
				isNeCell: function isNeCell() {
					return this.isFirstRow() && this.isLastCol();
				},
				isNwCell: function isNwCell() {
					return this.isFirstRow() && this.isFirstCol();
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
	rowStyle: _react.PropTypes.object,
	isFirstCol: _react.PropTypes.func,
	isLastCol: _react.PropTypes.func,
	isBand1Vert: _react.PropTypes.func,
	isBand2Vert: _react.PropTypes.func,
	isSeCell: _react.PropTypes.func,
	isSwCell: _react.PropTypes.func,
	isNeCell: _react.PropTypes.func,
	isNwCell: _react.PropTypes.func
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3Jvdy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNLHFCQUFOOztJQUNxQjs7Ozs7Ozs7Ozs7dUNBR0E7T0FDWixPQUFNLEtBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsS0FBcEIsQ0FBTixLQURZOztBQUVuQixVQUFPLEVBQUMsT0FBTSxLQUFLLEtBQUssUUFBTCxDQUFjLFFBQWQsQ0FBdUIsTUFBdkIsQ0FBWCxFQUEyQyxRQUFPLE9BQU8sU0FBUCxFQUExRCxDQUZtQjs7OztpQ0FLTCxNQUFLO0FBQ25CLE9BQUcsS0FBSyxRQUFMLENBQWMsUUFBZCxDQUF1QixNQUF2QixJQUErQixDQUEvQixFQUNGLEtBQUssUUFBTCxDQUFjLFFBQWQsQ0FBdUIsSUFBdkIsQ0FBNEIsRUFBNUIsRUFERDtBQUVBLE9BQU0sY0FBWSxLQUFLLFFBQUwsQ0FBYyxRQUFkLENBQXVCLEtBQUssUUFBTCxDQUFjLFFBQWQsQ0FBdUIsTUFBdkIsR0FBOEIsQ0FBOUIsQ0FBbkMsQ0FIYTtBQUluQixlQUFZLElBQVosQ0FBaUIsSUFBakIsRUFKbUI7Ozs7cUNBT0Y7QUFDakIsUUFBSyxRQUFMLENBQWMsUUFBZCxDQUF1QixJQUF2QixDQUE0QixFQUE1QixFQURpQjtBQUVqQiw4QkFqQm1CLHNEQWlCTyxVQUExQixDQUZpQjs7OzswQ0FLSzs7O0FBQ3RCLFFBQUssUUFBTCxDQUFjLFFBQWQsQ0FBdUIsTUFBdkIsQ0FBOEIsS0FBSyxRQUFMLENBQWMsUUFBZCxDQUF1QixNQUF2QixDQUE5Qjs7QUFEc0IsT0FHZixTQUFRLEtBQUssT0FBTCxDQUFSLE9BSGU7O0FBSXRCLE9BQUksVUFBUSxJQUFJLEtBQUosQ0FBVSxLQUFLLFFBQUwsQ0FBYyxRQUFkLENBQXVCLE1BQXZCLENBQWxCLENBSmtCO0FBS3RCLFdBQVEsSUFBUixDQUFhLENBQWIsRUFMc0I7O0FBT3RC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LGtDQUFVO0FBQ1QsWUFBTyxLQUFLLFNBQUwsTUFBb0IsS0FBSyxTQUFMLEVBQXBCLENBREU7S0Fka0M7QUFpQjVDLGtDQUFVO0FBQ1QsWUFBTyxLQUFLLFNBQUwsTUFBb0IsS0FBSyxVQUFMLEVBQXBCLENBREU7S0FqQmtDO0FBb0I1QyxrQ0FBVTtBQUNULFlBQU8sS0FBSyxVQUFMLE1BQXFCLEtBQUssU0FBTCxFQUFyQixDQURFO0tBcEJrQztBQXVCNUMsa0NBQVU7QUFDVCxZQUFPLEtBQUssVUFBTCxNQUFxQixLQUFLLFVBQUwsRUFBckIsQ0FERTtLQXZCa0M7SUFBdEMsQ0FBUCxDQUxnQjs7OztRQWhIRztFQUFZOztBQUFaLElBQ2IsY0FBWTtBQURDLElBeUZiLGVBQWEsT0FBTyxNQUFQLENBQWM7QUFDakMsYUFBWSxpQkFBVSxNQUFWO0NBRE8sRUFFakIsTUFBTSxZQUFOO0FBM0ZpQixJQTZGYixvQkFBa0IsT0FBTyxNQUFQLENBQWM7QUFDdEMsV0FBVSxpQkFBVSxNQUFWO0FBQ1YsYUFBWSxpQkFBVSxJQUFWO0FBQ1osWUFBVyxpQkFBVSxJQUFWO0FBQ1gsY0FBYSxpQkFBVSxJQUFWO0FBQ2IsY0FBYSxpQkFBVSxJQUFWO0FBQ2IsV0FBVSxpQkFBVSxJQUFWO0FBQ1YsV0FBVSxpQkFBVSxJQUFWO0FBQ1YsV0FBVSxpQkFBVSxJQUFWO0FBQ1YsV0FBVSxpQkFBVSxJQUFWO0NBVGMsRUFVdEIsTUFBTSxpQkFBTjtrQkF2R2lCOztJQW1KZjs7O0FBQ0wsVUFESyxzQkFDTCxDQUFZLEtBQVosRUFBNEI7d0JBRHZCLHdCQUN1Qjs7b0NBQVA7O0dBQU87O3NFQUR2QixtQ0FFRSxTQURxQjs7QUFFM0IsU0FBSyxLQUFMLEdBQVcsS0FBWCxDQUYyQjs7RUFBNUI7O1FBREs7RUFBK0IiLCJmaWxlIjoicm93LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5cclxuaW1wb3J0IEFueSBmcm9tIFwiLi9hbnlcIlxyXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcclxuXHJcbmNvbnN0IFN1cGVyPUFueVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb3cgZXh0ZW5kcyBTdXBlcntcclxuXHRzdGF0aWMgZGlzcGxheU5hbWU9XCJyb3dcIlxyXG5cclxuXHRuZXh0QXZhaWxhYmxlU3BhY2UoKXtcclxuXHRcdGNvbnN0IHtjb2xzfT10aGlzLmNvbnRleHQucGFyZW50LnByb3BzXHJcblx0XHRyZXR1cm4ge3dpZHRoOmNvbHNbdGhpcy5jb21wdXRlZC5jaGlsZHJlbi5sZW5ndGhdLCBoZWlnaHQ6TnVtYmVyLk1BWF9WQUxVRX1cclxuXHR9XHJcblxyXG5cdGFwcGVuZENvbXBvc2VkKGxpbmUpe1xyXG5cdFx0aWYodGhpcy5jb21wdXRlZC5jb21wb3NlZC5sZW5ndGg9PTApXHJcblx0XHRcdHRoaXMuY29tcHV0ZWQuY29tcG9zZWQucHVzaChbXSlcclxuXHRcdGNvbnN0IGN1cnJlbnRDZWxsPXRoaXMuY29tcHV0ZWQuY29tcG9zZWRbdGhpcy5jb21wdXRlZC5jb21wb3NlZC5sZW5ndGgtMV1cclxuXHRcdGN1cnJlbnRDZWxsLnB1c2gobGluZSlcclxuXHR9XHJcblxyXG5cdG9uMUNoaWxkQ29tcG9zZWQoKXtcclxuXHRcdHRoaXMuY29tcHV0ZWQuY29tcG9zZWQucHVzaChbXSlcclxuXHRcdHN1cGVyLm9uMUNoaWxkQ29tcG9zZWQoLi4uYXJndW1lbnRzKVxyXG5cdH1cclxuXHJcblx0b25BbGxDaGlsZHJlbkNvbXBvc2VkKCl7XHJcblx0XHR0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLnNwbGljZSh0aGlzLmNvbXB1dGVkLmNoaWxkcmVuLmxlbmd0aCkvL29uMUNoaWxkQ29tcG9zZWQgd2lsbCBhbHdheXMgYWRkIDFcclxuXHJcblx0XHRjb25zdCB7cGFyZW50fT10aGlzLmNvbnRleHRcclxuXHRcdGxldCBpbmRleGVzPW5ldyBBcnJheSh0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLmxlbmd0aClcclxuXHRcdGluZGV4ZXMuZmlsbCgwKVxyXG5cclxuXHRcdGxldCBpc0FsbFNlbnQyVGFibGU9YT0+aW5kZXhlcy5yZWR1Y2UoKHByZXYsaW5kZXgsIGkpPT50aGlzLmNvbXB1dGVkLmNvbXBvc2VkW2ldLmxlbmd0aD09aW5kZXggJiYgcHJldiwgdHJ1ZSlcclxuXHJcblx0XHRsZXQgY291bnRlcj0wXHJcblx0XHRsZXQgbWluU3BhY2U9e31cclxuXHRcdGRve1xyXG5cdFx0XHRsZXQgYXZhaWxhYmxlU3BhY2U9cGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZShtaW5TcGFjZSlcclxuXHRcdFx0bGV0IGN1cnJlbnRHcm91cGVkTGluZXM9bmV3IEFycmF5KHRoaXMuY29tcHV0ZWQuY29tcG9zZWQubGVuZ3RoKVxyXG5cdFx0XHR0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLmZvckVhY2goKGxpbmVzLGkpPT57XHJcblx0XHRcdFx0bGV0IHN0eWxlPXRoaXMuY29tcHV0ZWQuY2hpbGRyZW5baV0uZ2V0U3R5bGUoKVxyXG5cdFx0XHRcdGxldCB7Ym9yZGVyLCBtYXJnaW4sc3BhY2luZ309c3R5bGVcclxuXHJcblx0XHRcdFx0bGV0IGhlaWdodD1hdmFpbGFibGVTcGFjZS5oZWlnaHRcclxuXHRcdFx0XHRcdC1ib3JkZXIudG9wLnN6XHJcblx0XHRcdFx0XHQtYm9yZGVyLmJvdHRvbS5zelxyXG5cdFx0XHRcdFx0LW1hcmdpbi50b3BcclxuXHRcdFx0XHRcdC1tYXJnaW4uYm90dG9tXHJcblx0XHRcdFx0XHQtc3BhY2luZ1xyXG5cclxuXHRcdFx0XHRsZXQgaW5kZXg9aW5kZXhlc1tpXVxyXG5cdFx0XHRcdGxldCBzdGFydD1pbmRleFxyXG5cdFx0XHRcdGZvcihsZXQgbGVuPWxpbmVzLmxlbmd0aDsgaW5kZXg8bGVuICYmIGhlaWdodD4wOyBpbmRleCsrKXtcclxuXHRcdFx0XHRcdGxldCBsaW5lPWxpbmVzW2luZGV4XVxyXG5cdFx0XHRcdFx0aGVpZ2h0LT1saW5lLnByb3BzLmhlaWdodFxyXG5cdFx0XHRcdFx0aWYoaGVpZ2h0PDApe1xyXG5cdFx0XHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdFx0fWVsc2V7XHJcblxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpbmRleGVzW2ldPWluZGV4XHJcblxyXG5cdFx0XHRcdGN1cnJlbnRHcm91cGVkTGluZXNbaV09bGluZXMuc2xpY2Uoc3RhcnQsaW5kZXgpXHJcblx0XHRcdFx0Y3VycmVudEdyb3VwZWRMaW5lc1tpXS5zdHlsZT1zdHlsZVxyXG5cdFx0XHR9KVxyXG5cclxuXHRcdFx0aWYoIWN1cnJlbnRHcm91cGVkTGluZXMuZmluZChhPT5hLmxlbmd0aD4wKSl7XHJcblx0XHRcdFx0Ly9hdmFpbGFibGVTcGFjZSBpcyB0b28gc21hbGwsIG5lZWQgZmluZCBhIG1pbiBhdmFpbGFibGUgc3BhY2VcclxuXHRcdFx0XHRsZXQgbWluSGVpZ2h0PWluZGV4ZXMucmVkdWNlKChwLGluZGV4LGkpPT57XHJcblx0XHRcdFx0XHRsZXQge2JvcmRlciwgbWFyZ2luLCBzcGFjaW5nfT10aGlzLmNvbXB1dGVkLmNoaWxkcmVuW2ldLmdldFN0eWxlKClcclxuXHRcdFx0XHRcdGxldCBsaW5lPXRoaXMuY29tcHV0ZWQuY29tcG9zZWRbaV1baW5kZXhdXHJcblx0XHRcdFx0XHRpZihsaW5lKXtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIE1hdGgubWF4KHAsIGxpbmUucHJvcHMuaGVpZ2h0XHJcblx0XHRcdFx0XHRcdFx0K2JvcmRlci50b3Auc3pcclxuXHRcdFx0XHRcdFx0XHQrYm9yZGVyLmJvdHRvbS5zelxyXG5cdFx0XHRcdFx0XHRcdCttYXJnaW4udG9wXHJcblx0XHRcdFx0XHRcdFx0K21hcmdpbi5ib3R0b21cclxuXHRcdFx0XHRcdFx0XHQrc3BhY2luZylcclxuXHRcdFx0XHRcdH1lbHNlXHJcblx0XHRcdFx0XHRcdHJldHVybiBwXHJcblx0XHRcdFx0fSwwKVxyXG5cdFx0XHRcdG1pblNwYWNlLmhlaWdodD1taW5IZWlnaHRcclxuXHRcdFx0fWVsc2VcclxuXHRcdFx0XHRwYXJlbnQuYXBwZW5kQ29tcG9zZWQoY3VycmVudEdyb3VwZWRMaW5lcylcclxuXHRcdFx0Ly9pZihjb3VudGVyKys+MTAwKVxyXG5cdFx0XHRcdC8vdGhyb3cgbmV3IEVycm9yKFwidGhlcmUgc2hvdWxkIGJlIGEgaW5maW5pdGUgbG9vcCBkdXJpbmcgcm93IHNwbGl0LCBwbGVhc2UgY2hlY2tcIilcclxuXHJcblxyXG5cdFx0fXdoaWxlKCFpc0FsbFNlbnQyVGFibGUoKSk7XHJcblxyXG5cdFx0c3VwZXIub25BbGxDaGlsZHJlbkNvbXBvc2VkKClcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9T2JqZWN0LmFzc2lnbih7XHJcblx0XHR0YWJsZVN0eWxlOiBQcm9wVHlwZXMub2JqZWN0XHJcblx0fSwgU3VwZXIuY29udGV4dFR5cGVzKVxyXG5cclxuXHRzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9T2JqZWN0LmFzc2lnbih7XHJcblx0XHRyb3dTdHlsZTogUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdGlzRmlyc3RDb2w6IFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0aXNMYXN0Q29sOiBQcm9wVHlwZXMuZnVuYyxcclxuXHRcdGlzQmFuZDFWZXJ0OiBQcm9wVHlwZXMuZnVuYyxcclxuXHRcdGlzQmFuZDJWZXJ0OiBQcm9wVHlwZXMuZnVuYyxcclxuXHRcdGlzU2VDZWxsOiBQcm9wVHlwZXMuZnVuYyxcclxuXHRcdGlzU3dDZWxsOiBQcm9wVHlwZXMuZnVuYyxcclxuXHRcdGlzTmVDZWxsOiBQcm9wVHlwZXMuZnVuYyxcclxuXHRcdGlzTndDZWxsOiBQcm9wVHlwZXMuZnVuY1xyXG5cdH0sIFN1cGVyLmNoaWxkQ29udGV4dFR5cGVzKVxyXG5cclxuXHRnZXRIZWFkZXJDb2xDb3VudCgpe1xyXG5cdFx0Y29uc3Qge2ZpcnN0Q29sdW1ufT10aGlzLmNvbnRleHQudGFibGVTdHlsZS50YmxMb29rIHx8e31cclxuXHRcdGlmKGZpcnN0Q29sdW1uPT1cIjBcIilcclxuXHRcdFx0cmV0dXJuIDBcclxuXHRcdHJldHVybiAxXHJcblx0fVxyXG5cclxuXHRnZXRDaGlsZENvbnRleHQoKXtcclxuXHRcdGxldCBzZWxmPXRoaXNcclxuXHRcdGNvbnN0IHtmaXJzdENvbHVtbiwgbGFzdENvbHVtbiwgbm9WQmFuZH09dGhpcy5jb250ZXh0LnRhYmxlU3R5bGUudGJsTG9vayB8fHt9XHJcblx0XHRsZXQgY2hpbGRyZW49dGhpcy5jb21wdXRlZC5jaGlsZHJlblxyXG5cdFx0bGV0IGNvbnRlbnRMZW5ndGg9dGhpcy5nZXRDb250ZW50Q291bnQoKVxyXG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oc3VwZXIuZ2V0Q2hpbGRDb250ZXh0KCkse1xyXG5cdFx0XHRyb3dTdHlsZTogdGhpcy5wcm9wcy5kaXJlY3RTdHlsZSxcclxuXHRcdFx0aXNGaXJzdENvbCgpe1xyXG5cdFx0XHRcdHJldHVybiBmaXJzdENvbHVtbj09XCIxXCIgJiYgc2VsZi5jb21wdXRlZC5jaGlsZHJlbi5sZW5ndGg9PTBcclxuXHRcdFx0fSxcclxuXHRcdFx0aXNMYXN0Q29sKCl7XHJcblx0XHRcdFx0cmV0dXJuIGxhc3RDb2x1bW49PVwiMVwiICYmIHNlbGYuY29tcHV0ZWQuY2hpbGRyZW4ubGVuZ3RoPT1zZWxmLmdldENvbnRlbnRDb3VudCgpLTFcclxuXHRcdFx0fSxcclxuXHRcdFx0aXNCYW5kMVZlcnQoKXtcclxuXHRcdFx0XHRyZXR1cm4gbm9WQmFuZD09XCIwXCIgJiYgKHNlbGYuY29tcHV0ZWQuY2hpbGRyZW4ubGVuZ3RoLXNlbGYuZ2V0SGVhZGVyQ29sQ291bnQoKSklMlxyXG5cdFx0XHR9LFxyXG5cdFx0XHRpc0JhbmQyVmVydCgpe1xyXG5cdFx0XHRcdHJldHVybiBub1ZCYW5kPT1cIjBcIiAmJiAoc2VsZi5jb21wdXRlZC5jaGlsZHJlbi5sZW5ndGgtc2VsZi5nZXRIZWFkZXJDb2xDb3VudCgpKSUyXHJcblx0XHRcdH0sXHJcblx0XHRcdGlzU2VDZWxsKCl7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuaXNMYXN0Um93KCkgJiYgdGhpcy5pc0xhc3RDb2woKVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRpc1N3Q2VsbCgpe1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLmlzTGFzdFJvdygpICYmIHRoaXMuaXNGaXJzdENvbCgpXHJcblx0XHRcdH0sXHJcblx0XHRcdGlzTmVDZWxsKCl7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuaXNGaXJzdFJvdygpICYmIHRoaXMuaXNMYXN0Q29sKClcclxuXHRcdFx0fSxcclxuXHRcdFx0aXNOd0NlbGwoKXtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5pc0ZpcnN0Um93KCkgJiYgdGhpcy5pc0ZpcnN0Q29sKClcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIENlbGxMaW5lc1dpdGhDZWxsU3R5bGUgZXh0ZW5kcyBBcnJheXtcclxuXHRjb25zdHJ1Y3RvcihzdHlsZSwuLi5vdGhlcnMpe1xyXG5cdFx0c3VwZXIob3RoZXJzKVxyXG5cdFx0dGhpcy5zdHlsZT1zdHlsZVxyXG5cdH1cclxufVxyXG4iXX0=