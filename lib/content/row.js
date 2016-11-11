"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require("babel-runtime/helpers/get");

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _any = require("./any");

var _any2 = _interopRequireDefault(_any);

var _group = require("../composed/group");

var _group2 = _interopRequireDefault(_group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Super = _any2.default;

var Row = function (_Super) {
	(0, _inherits3.default)(Row, _Super);

	function Row() {
		(0, _classCallCheck3.default)(this, Row);
		return (0, _possibleConstructorReturn3.default)(this, (Row.__proto__ || (0, _getPrototypeOf2.default)(Row)).apply(this, arguments));
	}

	(0, _createClass3.default)(Row, [{
		key: "nextAvailableSpace",
		value: function nextAvailableSpace() {
			var cols = this.context.parent.props.tblGrid;

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
			(0, _get3.default)(Row.prototype.__proto__ || (0, _getPrototypeOf2.default)(Row.prototype), "on1ChildComposed", this).apply(this, arguments);
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
					var border = style.border,
					    margin = style.margin,
					    spacing = style.spacing;


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
						var _computed$children$i$ = _this2.computed.children[i].getStyle(),
						    border = _computed$children$i$.border,
						    margin = _computed$children$i$.margin,
						    spacing = _computed$children$i$.spacing;

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

			(0, _get3.default)(Row.prototype.__proto__ || (0, _getPrototypeOf2.default)(Row.prototype), "onAllChildrenComposed", this).call(this);
		}
	}, {
		key: "getHeaderColCount",
		value: function getHeaderColCount() {
			var _ref = this.context.tableStyle.get('tblPr.tblLook') || {},
			    firstColumn = _ref.firstColumn;

			if (firstColumn == "0") return 0;
			return 1;
		}
	}, {
		key: "getChildContext",
		value: function getChildContext() {
			var self = this;

			var _ref2 = this.context.tableStyle.get('tblPr.tblLook') || {},
			    firstColumn = _ref2.firstColumn,
			    lastColumn = _ref2.lastColumn,
			    noVBand = _ref2.noVBand;

			var children = this.computed.children;
			var contentLength = this.getContentCount();
			return (0, _assign2.default)((0, _get3.default)(Row.prototype.__proto__ || (0, _getPrototypeOf2.default)(Row.prototype), "getChildContext", this).call(this), {
				rowStyle: this.props.directStyle,
				isFirstCol: function isFirstCol() {
					return firstColumn == "1" && !this.isFirstRow() && !this.isLastRow() && this.isFirstColAbsolute();
				},
				isFirstColAbsolute: function isFirstColAbsolute() {
					return self.computed.children.length == 0;
				},
				isLastCol: function isLastCol() {
					return lastColumn == "1" && !this.isFirstRow() && !this.isLastRow() && this.isLastColAbsolute();
				},
				isLastColAbsolute: function isLastColAbsolute() {
					return self.computed.children.length == self.getContentCount() - 1;
				},
				isBand1Vert: function isBand1Vert() {
					return noVBand == "0" && !this.isFirstCol() && !this.isLastCol() && (self.computed.children.length - self.getHeaderColCount()) % 2 == 1;
				},
				isBand2Vert: function isBand2Vert() {
					return noVBand == "0" && !this.isFirstCol() && !this.isLastCol() && (self.computed.children.length - self.getHeaderColCount()) % 2 == 0;
				},
				isSeCell: function isSeCell() {
					return this.isLastRowAbsolute() && this.isLastColAbsolute();
				},
				isSwCell: function isSwCell() {
					return this.isLastRowAbsolute() && this.isFirstColAbsolute();
				},
				isNeCell: function isNeCell() {
					return this.isFirstRowAbsolute() && this.isLastColAbsolute();
				},
				isNwCell: function isNwCell() {
					return this.isFirstRowAbsolute() && this.isFirstColAbsolute();
				}
			});
		}
	}]);
	return Row;
}(Super);

Row.displayName = "row";
Row.contextTypes = (0, _assign2.default)({
	tableStyle: _react.PropTypes.object
}, Super.contextTypes);
Row.childContextTypes = (0, _assign2.default)({
	rowStyle: _react.PropTypes.object,
	isFirstCol: _react.PropTypes.func,
	isLastCol: _react.PropTypes.func,
	isFirstColAbsolute: _react.PropTypes.func,
	isLastColAbsolute: _react.PropTypes.func,
	isBand1Vert: _react.PropTypes.func,
	isBand2Vert: _react.PropTypes.func,
	isSeCell: _react.PropTypes.func,
	isSwCell: _react.PropTypes.func,
	isNeCell: _react.PropTypes.func,
	isNwCell: _react.PropTypes.func
}, Super.childContextTypes);
exports.default = Row;

var CellLinesWithCellStyle = function (_Array) {
	(0, _inherits3.default)(CellLinesWithCellStyle, _Array);

	function CellLinesWithCellStyle(style) {
		(0, _classCallCheck3.default)(this, CellLinesWithCellStyle);

		for (var _len = arguments.length, others = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			others[_key - 1] = arguments[_key];
		}

		var _this3 = (0, _possibleConstructorReturn3.default)(this, (CellLinesWithCellStyle.__proto__ || (0, _getPrototypeOf2.default)(CellLinesWithCellStyle)).call(this, others));

		_this3.style = style;
		return _this3;
	}

	return CellLinesWithCellStyle;
}(Array);

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3Jvdy5qcyJdLCJuYW1lcyI6WyJTdXBlciIsIlJvdyIsImNvbHMiLCJjb250ZXh0IiwicGFyZW50IiwicHJvcHMiLCJ0YmxHcmlkIiwid2lkdGgiLCJjb21wdXRlZCIsImNoaWxkcmVuIiwibGVuZ3RoIiwiaGVpZ2h0IiwiTnVtYmVyIiwiTUFYX1ZBTFVFIiwibGluZSIsImNvbXBvc2VkIiwicHVzaCIsImN1cnJlbnRDZWxsIiwiYXJndW1lbnRzIiwic3BsaWNlIiwiaW5kZXhlcyIsIkFycmF5IiwiZmlsbCIsImlzQWxsU2VudDJUYWJsZSIsInJlZHVjZSIsInByZXYiLCJpbmRleCIsImkiLCJjb3VudGVyIiwibWluU3BhY2UiLCJhdmFpbGFibGVTcGFjZSIsIm5leHRBdmFpbGFibGVTcGFjZSIsImN1cnJlbnRHcm91cGVkTGluZXMiLCJmb3JFYWNoIiwibGluZXMiLCJzdHlsZSIsImdldFN0eWxlIiwiYm9yZGVyIiwibWFyZ2luIiwic3BhY2luZyIsInRvcCIsInN6IiwiYm90dG9tIiwic3RhcnQiLCJsZW4iLCJzbGljZSIsImZpbmQiLCJhIiwibWluSGVpZ2h0IiwicCIsIk1hdGgiLCJtYXgiLCJhcHBlbmRDb21wb3NlZCIsInRhYmxlU3R5bGUiLCJnZXQiLCJmaXJzdENvbHVtbiIsInNlbGYiLCJsYXN0Q29sdW1uIiwibm9WQmFuZCIsImNvbnRlbnRMZW5ndGgiLCJnZXRDb250ZW50Q291bnQiLCJyb3dTdHlsZSIsImRpcmVjdFN0eWxlIiwiaXNGaXJzdENvbCIsImlzRmlyc3RSb3ciLCJpc0xhc3RSb3ciLCJpc0ZpcnN0Q29sQWJzb2x1dGUiLCJpc0xhc3RDb2wiLCJpc0xhc3RDb2xBYnNvbHV0ZSIsImlzQmFuZDFWZXJ0IiwiZ2V0SGVhZGVyQ29sQ291bnQiLCJpc0JhbmQyVmVydCIsImlzU2VDZWxsIiwiaXNMYXN0Um93QWJzb2x1dGUiLCJpc1N3Q2VsbCIsImlzTmVDZWxsIiwiaXNGaXJzdFJvd0Fic29sdXRlIiwiaXNOd0NlbGwiLCJkaXNwbGF5TmFtZSIsImNvbnRleHRUeXBlcyIsIm9iamVjdCIsImNoaWxkQ29udGV4dFR5cGVzIiwiZnVuYyIsIkNlbGxMaW5lc1dpdGhDZWxsU3R5bGUiLCJvdGhlcnMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUVBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLHFCQUFOOztJQUNxQkMsRzs7Ozs7Ozs7Ozt1Q0FHQTtBQUFBLE9BQ0pDLElBREksR0FDRSxLQUFLQyxPQUFMLENBQWFDLE1BQWIsQ0FBb0JDLEtBRHRCLENBQ1pDLE9BRFk7O0FBRW5CLFVBQU8sRUFBQ0MsT0FBTUwsS0FBSyxLQUFLTSxRQUFMLENBQWNDLFFBQWQsQ0FBdUJDLE1BQTVCLENBQVAsRUFBNENDLFFBQU9DLE9BQU9DLFNBQTFELEVBQVA7QUFDQTs7O2lDQUVjQyxJLEVBQUs7QUFDbkIsT0FBRyxLQUFLTixRQUFMLENBQWNPLFFBQWQsQ0FBdUJMLE1BQXZCLElBQStCLENBQWxDLEVBQ0MsS0FBS0YsUUFBTCxDQUFjTyxRQUFkLENBQXVCQyxJQUF2QixDQUE0QixFQUE1QjtBQUNELE9BQU1DLGNBQVksS0FBS1QsUUFBTCxDQUFjTyxRQUFkLENBQXVCLEtBQUtQLFFBQUwsQ0FBY08sUUFBZCxDQUF1QkwsTUFBdkIsR0FBOEIsQ0FBckQsQ0FBbEI7QUFDQU8sZUFBWUQsSUFBWixDQUFpQkYsSUFBakI7QUFDQTs7O3FDQUVpQjtBQUNqQixRQUFLTixRQUFMLENBQWNPLFFBQWQsQ0FBdUJDLElBQXZCLENBQTRCLEVBQTVCO0FBQ0EscUlBQTBCRSxTQUExQjtBQUNBOzs7MENBRXNCO0FBQUE7O0FBQ3RCLFFBQUtWLFFBQUwsQ0FBY08sUUFBZCxDQUF1QkksTUFBdkIsQ0FBOEIsS0FBS1gsUUFBTCxDQUFjQyxRQUFkLENBQXVCQyxNQUFyRCxFQURzQixDQUNzQzs7QUFEdEMsT0FHZk4sTUFIZSxHQUdQLEtBQUtELE9BSEUsQ0FHZkMsTUFIZTs7QUFJdEIs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bnQiOlsiaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5cclxuaW1wb3J0IEFueSBmcm9tIFwiLi9hbnlcIlxyXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcclxuXHJcbmNvbnN0IFN1cGVyPUFueVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb3cgZXh0ZW5kcyBTdXBlcntcclxuXHRzdGF0aWMgZGlzcGxheU5hbWU9XCJyb3dcIlxyXG5cclxuXHRuZXh0QXZhaWxhYmxlU3BhY2UoKXtcclxuXHRcdGNvbnN0IHt0YmxHcmlkOmNvbHN9PXRoaXMuY29udGV4dC5wYXJlbnQucHJvcHNcclxuXHRcdHJldHVybiB7d2lkdGg6Y29sc1t0aGlzLmNvbXB1dGVkLmNoaWxkcmVuLmxlbmd0aF0sIGhlaWdodDpOdW1iZXIuTUFYX1ZBTFVFfVxyXG5cdH1cclxuXHJcblx0YXBwZW5kQ29tcG9zZWQobGluZSl7XHJcblx0XHRpZih0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLmxlbmd0aD09MClcclxuXHRcdFx0dGhpcy5jb21wdXRlZC5jb21wb3NlZC5wdXNoKFtdKVxyXG5cdFx0Y29uc3QgY3VycmVudENlbGw9dGhpcy5jb21wdXRlZC5jb21wb3NlZFt0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLmxlbmd0aC0xXVxyXG5cdFx0Y3VycmVudENlbGwucHVzaChsaW5lKVxyXG5cdH1cclxuXHJcblx0b24xQ2hpbGRDb21wb3NlZCgpe1xyXG5cdFx0dGhpcy5jb21wdXRlZC5jb21wb3NlZC5wdXNoKFtdKVxyXG5cdFx0c3VwZXIub24xQ2hpbGRDb21wb3NlZCguLi5hcmd1bWVudHMpXHJcblx0fVxyXG5cclxuXHRvbkFsbENoaWxkcmVuQ29tcG9zZWQoKXtcclxuXHRcdHRoaXMuY29tcHV0ZWQuY29tcG9zZWQuc3BsaWNlKHRoaXMuY29tcHV0ZWQuY2hpbGRyZW4ubGVuZ3RoKS8vb24xQ2hpbGRDb21wb3NlZCB3aWxsIGFsd2F5cyBhZGQgMVxyXG5cclxuXHRcdGNvbnN0IHtwYXJlbnR9PXRoaXMuY29udGV4dFxyXG5cdFx0bGV0IGluZGV4ZXM9bmV3IEFycmF5KHRoaXMuY29tcHV0ZWQuY29tcG9zZWQubGVuZ3RoKVxyXG5cdFx0aW5kZXhlcy5maWxsKDApXHJcblxyXG5cdFx0bGV0IGlzQWxsU2VudDJUYWJsZT1hPT5pbmRleGVzLnJlZHVjZSgocHJldixpbmRleCwgaSk9PnRoaXMuY29tcHV0ZWQuY29tcG9zZWRbaV0ubGVuZ3RoPT1pbmRleCAmJiBwcmV2LCB0cnVlKVxyXG5cclxuXHRcdGxldCBjb3VudGVyPTBcclxuXHRcdGxldCBtaW5TcGFjZT17fVxyXG5cdFx0ZG97XHJcblx0XHRcdGxldCBhdmFpbGFibGVTcGFjZT1wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKG1pblNwYWNlKVxyXG5cdFx0XHRsZXQgY3VycmVudEdyb3VwZWRMaW5lcz1uZXcgQXJyYXkodGhpcy5jb21wdXRlZC5jb21wb3NlZC5sZW5ndGgpXHJcblx0XHRcdHRoaXMuY29tcHV0ZWQuY29tcG9zZWQuZm9yRWFjaCgobGluZXMsaSk9PntcclxuXHRcdFx0XHRsZXQgc3R5bGU9dGhpcy5jb21wdXRlZC5jaGlsZHJlbltpXS5nZXRTdHlsZSgpXHJcblx0XHRcdFx0bGV0IHtib3JkZXIsIG1hcmdpbixzcGFjaW5nfT1zdHlsZVxyXG5cclxuXHRcdFx0XHRsZXQgaGVpZ2h0PWF2YWlsYWJsZVNwYWNlLmhlaWdodFxyXG5cdFx0XHRcdFx0LWJvcmRlci50b3Auc3pcclxuXHRcdFx0XHRcdC1ib3JkZXIuYm90dG9tLnN6XHJcblx0XHRcdFx0XHQtbWFyZ2luLnRvcFxyXG5cdFx0XHRcdFx0LW1hcmdpbi5ib3R0b21cclxuXHRcdFx0XHRcdC1zcGFjaW5nXHJcblxyXG5cdFx0XHRcdGxldCBpbmRleD1pbmRleGVzW2ldXHJcblx0XHRcdFx0bGV0IHN0YXJ0PWluZGV4XHJcblx0XHRcdFx0Zm9yKGxldCBsZW49bGluZXMubGVuZ3RoOyBpbmRleDxsZW4gJiYgaGVpZ2h0PjA7IGluZGV4Kyspe1xyXG5cdFx0XHRcdFx0bGV0IGxpbmU9bGluZXNbaW5kZXhdXHJcblx0XHRcdFx0XHRoZWlnaHQtPWxpbmUucHJvcHMuaGVpZ2h0XHJcblx0XHRcdFx0XHRpZihoZWlnaHQ8MCl7XHJcblx0XHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0XHR9ZWxzZXtcclxuXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGluZGV4ZXNbaV09aW5kZXhcclxuXHJcblx0XHRcdFx0Y3VycmVudEdyb3VwZWRMaW5lc1tpXT1saW5lcy5zbGljZShzdGFydCxpbmRleClcclxuXHRcdFx0XHRjdXJyZW50R3JvdXBlZExpbmVzW2ldLnN0eWxlPXN0eWxlXHJcblx0XHRcdH0pXHJcblxyXG5cdFx0XHRpZighY3VycmVudEdyb3VwZWRMaW5lcy5maW5kKGE9PmEubGVuZ3RoPjApKXtcclxuXHRcdFx0XHQvL2F2YWlsYWJsZVNwYWNlIGlzIHRvbyBzbWFsbCwgbmVlZCBmaW5kIGEgbWluIGF2YWlsYWJsZSBzcGFjZVxyXG5cdFx0XHRcdGxldCBtaW5IZWlnaHQ9aW5kZXhlcy5yZWR1Y2UoKHAsaW5kZXgsaSk9PntcclxuXHRcdFx0XHRcdGxldCB7Ym9yZGVyLCBtYXJnaW4sIHNwYWNpbmd9PXRoaXMuY29tcHV0ZWQuY2hpbGRyZW5baV0uZ2V0U3R5bGUoKVxyXG5cdFx0XHRcdFx0bGV0IGxpbmU9dGhpcy5jb21wdXRlZC5jb21wb3NlZFtpXVtpbmRleF1cclxuXHRcdFx0XHRcdGlmKGxpbmUpe1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gTWF0aC5tYXgocCwgbGluZS5wcm9wcy5oZWlnaHRcclxuXHRcdFx0XHRcdFx0XHQrYm9yZGVyLnRvcC5zelxyXG5cdFx0XHRcdFx0XHRcdCtib3JkZXIuYm90dG9tLnN6XHJcblx0XHRcdFx0XHRcdFx0K21hcmdpbi50b3BcclxuXHRcdFx0XHRcdFx0XHQrbWFyZ2luLmJvdHRvbVxyXG5cdFx0XHRcdFx0XHRcdCtzcGFjaW5nKVxyXG5cdFx0XHRcdFx0fWVsc2VcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHBcclxuXHRcdFx0XHR9LDApXHJcblx0XHRcdFx0bWluU3BhY2UuaGVpZ2h0PW1pbkhlaWdodFxyXG5cdFx0XHR9ZWxzZVxyXG5cdFx0XHRcdHBhcmVudC5hcHBlbmRDb21wb3NlZChjdXJyZW50R3JvdXBlZExpbmVzKVxyXG5cdFx0XHQvL2lmKGNvdW50ZXIrKz4xMDApXHJcblx0XHRcdFx0Ly90aHJvdyBuZXcgRXJyb3IoXCJ0aGVyZSBzaG91bGQgYmUgYSBpbmZpbml0ZSBsb29wIGR1cmluZyByb3cgc3BsaXQsIHBsZWFzZSBjaGVja1wiKVxyXG5cclxuXHJcblx0XHR9d2hpbGUoIWlzQWxsU2VudDJUYWJsZSgpKTtcclxuXHJcblx0XHRzdXBlci5vbkFsbENoaWxkcmVuQ29tcG9zZWQoKVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGNvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcclxuXHRcdHRhYmxlU3R5bGU6IFByb3BUeXBlcy5vYmplY3RcclxuXHR9LCBTdXBlci5jb250ZXh0VHlwZXMpXHJcblxyXG5cdHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcclxuXHRcdHJvd1N0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0aXNGaXJzdENvbDogUHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRpc0xhc3RDb2w6IFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0aXNGaXJzdENvbEFic29sdXRlOiBQcm9wVHlwZXMuZnVuYyxcclxuXHRcdGlzTGFzdENvbEFic29sdXRlOiBQcm9wVHlwZXMuZnVuYyxcclxuXHRcdGlzQmFuZDFWZXJ0OiBQcm9wVHlwZXMuZnVuYyxcclxuXHRcdGlzQmFuZDJWZXJ0OiBQcm9wVHlwZXMuZnVuYyxcclxuXHRcdGlzU2VDZWxsOiBQcm9wVHlwZXMuZnVuYyxcclxuXHRcdGlzU3dDZWxsOiBQcm9wVHlwZXMuZnVuYyxcclxuXHRcdGlzTmVDZWxsOiBQcm9wVHlwZXMuZnVuYyxcclxuXHRcdGlzTndDZWxsOiBQcm9wVHlwZXMuZnVuY1xyXG5cdH0sIFN1cGVyLmNoaWxkQ29udGV4dFR5cGVzKVxyXG5cclxuXHRnZXRIZWFkZXJDb2xDb3VudCgpe1xyXG5cdFx0Y29uc3Qge2ZpcnN0Q29sdW1ufT10aGlzLmNvbnRleHQudGFibGVTdHlsZS5nZXQoJ3RibFByLnRibExvb2snKSB8fHt9XHJcblx0XHRpZihmaXJzdENvbHVtbj09XCIwXCIpXHJcblx0XHRcdHJldHVybiAwXHJcblx0XHRyZXR1cm4gMVxyXG5cdH1cclxuXHJcblx0Z2V0Q2hpbGRDb250ZXh0KCl7XHJcblx0XHRsZXQgc2VsZj10aGlzXHJcblx0XHRjb25zdCB7Zmlyc3RDb2x1bW4sIGxhc3RDb2x1bW4sIG5vVkJhbmR9PXRoaXMuY29udGV4dC50YWJsZVN0eWxlLmdldCgndGJsUHIudGJsTG9vaycpfHx7fVxyXG5cdFx0bGV0IGNoaWxkcmVuPXRoaXMuY29tcHV0ZWQuY2hpbGRyZW5cclxuXHRcdGxldCBjb250ZW50TGVuZ3RoPXRoaXMuZ2V0Q29udGVudENvdW50KClcclxuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKHN1cGVyLmdldENoaWxkQ29udGV4dCgpLHtcclxuXHRcdFx0cm93U3R5bGU6IHRoaXMucHJvcHMuZGlyZWN0U3R5bGUsXHJcblx0XHRcdGlzRmlyc3RDb2woKXtcclxuXHRcdFx0XHRyZXR1cm4gZmlyc3RDb2x1bW49PVwiMVwiIFxyXG5cdFx0XHRcdFx0JiYgIXRoaXMuaXNGaXJzdFJvdygpIFxyXG5cdFx0XHRcdFx0JiYgIXRoaXMuaXNMYXN0Um93KClcclxuXHRcdFx0XHRcdCYmIHRoaXMuaXNGaXJzdENvbEFic29sdXRlKCkgXHJcblx0XHRcdFx0XHRcclxuXHRcdFx0fSxcclxuXHRcdFx0aXNGaXJzdENvbEFic29sdXRlKCl7XHJcblx0XHRcdFx0cmV0dXJuIHNlbGYuY29tcHV0ZWQuY2hpbGRyZW4ubGVuZ3RoPT0wXHJcblx0XHRcdH0sXHJcblx0XHRcdGlzTGFzdENvbCgpe1xyXG5cdFx0XHRcdHJldHVybiBsYXN0Q29sdW1uPT1cIjFcIlxyXG5cdFx0XHRcdFx0JiYgIXRoaXMuaXNGaXJzdFJvdygpXHJcblx0XHRcdFx0XHQmJiAhdGhpcy5pc0xhc3RSb3coKVxyXG5cdFx0XHRcdFx0JiYgdGhpcy5pc0xhc3RDb2xBYnNvbHV0ZSgpXHJcblx0XHRcdH0sXHJcblx0XHRcdGlzTGFzdENvbEFic29sdXRlKCl7XHJcblx0XHRcdFx0cmV0dXJuIHNlbGYuY29tcHV0ZWQuY2hpbGRyZW4ubGVuZ3RoPT1zZWxmLmdldENvbnRlbnRDb3VudCgpLTEgXHJcblx0XHRcdH0sXHJcblx0XHRcdGlzQmFuZDFWZXJ0KCl7XHJcblx0XHRcdFx0cmV0dXJuIG5vVkJhbmQ9PVwiMFwiIFxyXG5cdFx0XHRcdFx0JiYgIXRoaXMuaXNGaXJzdENvbCgpIFxyXG5cdFx0XHRcdFx0JiYgIXRoaXMuaXNMYXN0Q29sKCkgXHJcblx0XHRcdFx0XHQmJiAoc2VsZi5jb21wdXRlZC5jaGlsZHJlbi5sZW5ndGgtc2VsZi5nZXRIZWFkZXJDb2xDb3VudCgpKSUyPT0xXHJcblx0XHRcdH0sXHJcblx0XHRcdGlzQmFuZDJWZXJ0KCl7XHJcblx0XHRcdFx0cmV0dXJuIG5vVkJhbmQ9PVwiMFwiIFxyXG5cdFx0XHRcdFx0JiYgIXRoaXMuaXNGaXJzdENvbCgpIFxyXG5cdFx0XHRcdFx0JiYgIXRoaXMuaXNMYXN0Q29sKCkgXHJcblx0XHRcdFx0XHQmJiAoc2VsZi5jb21wdXRlZC5jaGlsZHJlbi5sZW5ndGgtc2VsZi5nZXRIZWFkZXJDb2xDb3VudCgpKSUyPT0wXHJcblx0XHRcdH0sXHJcblx0XHRcdGlzU2VDZWxsKCl7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuaXNMYXN0Um93QWJzb2x1dGUoKSAmJiB0aGlzLmlzTGFzdENvbEFic29sdXRlKClcclxuXHRcdFx0fSxcclxuXHRcdFx0aXNTd0NlbGwoKXtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5pc0xhc3RSb3dBYnNvbHV0ZSgpICYmIHRoaXMuaXNGaXJzdENvbEFic29sdXRlKClcclxuXHRcdFx0fSxcclxuXHRcdFx0aXNOZUNlbGwoKXtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5pc0ZpcnN0Um93QWJzb2x1dGUoKSAgJiYgdGhpcy5pc0xhc3RDb2xBYnNvbHV0ZSgpXHJcblx0XHRcdH0sXHJcblx0XHRcdGlzTndDZWxsKCl7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuaXNGaXJzdFJvd0Fic29sdXRlKCkgJiYgdGhpcy5pc0ZpcnN0Q29sQWJzb2x1dGUoKVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgQ2VsbExpbmVzV2l0aENlbGxTdHlsZSBleHRlbmRzIEFycmF5e1xyXG5cdGNvbnN0cnVjdG9yKHN0eWxlLC4uLm90aGVycyl7XHJcblx0XHRzdXBlcihvdGhlcnMpXHJcblx0XHR0aGlzLnN0eWxlPXN0eWxlXHJcblx0fVxyXG59XHJcbiJdfQ==