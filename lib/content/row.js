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
			var _ref = this.context.tableStyle.get('tblPr.tblLook') || {};

			var firstColumn = _ref.firstColumn;

			if (firstColumn == "0") return 0;
			return 1;
		}
	}, {
		key: "getChildContext",
		value: function getChildContext() {
			var self = this;

			var _ref2 = this.context.tableStyle.get('tblPr.tblLook') || {};

			var firstColumn = _ref2.firstColumn;
			var lastColumn = _ref2.lastColumn;
			var noVBand = _ref2.noVBand;

			var children = this.computed.children;
			var contentLength = this.getContentCount();
			return Object.assign(_get(Object.getPrototypeOf(Row.prototype), "getChildContext", this).call(this), {
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
Row.contextTypes = Object.assign({
	tableStyle: _react.PropTypes.object
}, Super.contextTypes);
Row.childContextTypes = Object.assign({
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3Jvdy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNLHFCQUFOOztJQUNxQjs7Ozs7Ozs7Ozs7dUNBR0E7T0FDWixPQUFNLEtBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsS0FBcEIsQ0FBTixLQURZOztBQUVuQixVQUFPLEVBQUMsT0FBTSxLQUFLLEtBQUssUUFBTCxDQUFjLFFBQWQsQ0FBdUIsTUFBdkIsQ0FBWCxFQUEyQyxRQUFPLE9BQU8sU0FBUCxFQUExRCxDQUZtQjs7OztpQ0FLTCxNQUFLO0FBQ25CLE9BQUcsS0FBSyxRQUFMLENBQWMsUUFBZCxDQUF1QixNQUF2QixJQUErQixDQUEvQixFQUNGLEtBQUssUUFBTCxDQUFjLFFBQWQsQ0FBdUIsSUFBdkIsQ0FBNEIsRUFBNUIsRUFERDtBQUVBLE9BQU0sY0FBWSxLQUFLLFFBQUwsQ0FBYyxRQUFkLENBQXVCLEtBQUssUUFBTCxDQUFjLFFBQWQsQ0FBdUIsTUFBdkIsR0FBOEIsQ0FBOUIsQ0FBbkMsQ0FIYTtBQUluQixlQUFZLElBQVosQ0FBaUIsSUFBakIsRUFKbUI7Ozs7cUNBT0Y7QUFDakIsUUFBSyxRQUFMLENBQWMsUUFBZCxDQUF1QixJQUF2QixDQUE0QixFQUE1QixFQURpQjtBQUVqQiw4QkFqQm1CLHNEQWlCTyxVQUExQixDQUZpQjs7OzswQ0FLSzs7O0FBQ3RCLFFBQUssUUFBTCxDQUFjLFFBQWQsQ0FBdUIsTUFBdkIsQ0FBOEIsS0FBSyxRQUFMLENBQWMsUUFBZCxDQUF1QixNQUF2QixDQUE5Qjs7QUFEc0IsT0FHZixTQUFRLEtBQUssT0FBTCxDQUFSLE9BSGU7O0FBSXRCLE9BQUksVUFBUSxJQUFJLEtBQUosQ0FBVSxLQUFLLFFBQUwsQ0FBYyxRQUFkLENBQXVCLE1BQXZCLENBQWxCLENBSmtCO0FBS3RCLFdBQVEsSUFBUixDQUFhLENBQWIsRUFMc0I7O0FBT3RCLE9BQUksa0JBQWdCLFNBQWhCLGVBQWdCO1dBQUcsUUFBUSxNQUFSLENBQWUsVUFBQyxJQUFELEVBQU0sS0FBTixFQUFhLENBQWI7WUFBaUIsT0FBSyxRQUFMLENBQWMsUUFBZCxDQUF1QixDQUF2QixFQUEwQixNQUExQixJQUFrQyxLQUFsQyxJQUEyQyxJQUEzQztLQUFqQixFQUFrRSxJQUFqRjtJQUFILENBUEU7O0FBU3RCLE9BQUksVUFBUSxDQUFSLENBVGtCO0FBVXRCLE9BQUksV0FBUyxFQUFULENBVmtCOzs7QUFZckIsUUFBSSxpQkFBZSxPQUFPLGtCQUFQLENBQTBCLFFBQTFCLENBQWY7QUFDSixRQUFJLHNCQUFvQixJQUFJLEtBQUosQ0FBVSxPQUFLLFFBQUwsQ0FBYyxRQUFkLENBQXVCLE1BQXZCLENBQTlCO0FBQ0osV0FBSyxRQUFMLENBQWMsUUFBZCxDQUF1QixPQUF2QixDQUErQixVQUFDLEtBQUQsRUFBTyxDQUFQLEVBQVc7QUFDekMsU0FBSSxRQUFNLE9BQUssUUFBTCxDQUFjLFFBQWQsQ0FBdUIsQ0FBdkIsRUFBMEIsUUFBMUIsRUFBTixDQURxQztTQUVwQyxTQUF3QixNQUF4QixPQUZvQztTQUU1QixTQUFnQixNQUFoQixPQUY0QjtTQUVyQixVQUFTLE1BQVQsUUFGcUI7OztBQUl6QyxTQUFJLFNBQU8sZUFBZSxNQUFmLEdBQ1QsT0FBTyxHQUFQLENBQVcsRUFBWCxHQUNBLE9BQU8sTUFBUCxDQUFjLEVBQWQsR0FDQSxPQUFPLEdBQVAsR0FDQSxPQUFPLE1BQVAsR0FDQSxPQUxTLENBSjhCOztBQVd6QyxTQUFJLFFBQU0sUUFBUSxDQUFSLENBQU4sQ0FYcUM7QUFZekMsU0FBSSxRQUFNLEtBQU4sQ0FacUM7QUFhekMsVUFBSSxJQUFJLE1BQUksTUFBTSxNQUFOLEVBQWMsUUFBTSxHQUFOLElBQWEsU0FBTyxDQUFQLEVBQVUsT0FBakQsRUFBeUQ7QUFDeEQsVUFBSSxPQUFLLE1BQU0sS0FBTixDQUFMLENBRG9EO0FBRXhELGdCQUFRLEtBQUssS0FBTCxDQUFXLE1BQVgsQ0FGZ0Q7QUFHeEQsVUFBRyxTQUFPLENBQVAsRUFBUztBQUNYLGFBRFc7T0FBWixNQUVLLEVBRkw7TUFIRDtBQVNBLGFBQVEsQ0FBUixJQUFXLEtBQVgsQ0F0QnlDOztBQXdCekMseUJBQW9CLENBQXBCLElBQXVCLE1BQU0sS0FBTixDQUFZLEtBQVosRUFBa0IsS0FBbEIsQ0FBdkIsQ0F4QnlDO0FBeUJ6Qyx5QkFBb0IsQ0FBcEIsRUFBdUIsS0FBdkIsR0FBNkIsS0FBN0IsQ0F6QnlDO0tBQVgsQ0FBL0I7O0FBNEJBLFFBQUcsQ0FBQyxvQkFBb0IsSUFBcEIsQ0FBeUI7WUFBRyxFQUFFLE1BQUYsR0FBUyxDQUFUO0tBQUgsQ0FBMUIsRUFBeUM7O0FBRTNDLFNBQUksWUFBVSxRQUFRLE1BQVIsQ0FBZSxVQUFDLENBQUQsRUFBRyxLQUFILEVBQVMsQ0FBVCxFQUFhO2tDQUNYLE9BQUssUUFBTCxDQUFjLFFBQWQsQ0FBdUIsQ0FBdkIsRUFBMEIsUUFBMUIsR0FEVzs7VUFDcEMsc0NBRG9DO1VBQzVCLHNDQUQ0QjtVQUNwQix3Q0FEb0I7O0FBRXpDLFVBQUksT0FBSyxPQUFLLFFBQUwsQ0FBYyxRQUFkLENBQXVCLENBQXZCLEVBQTBCLEtBQTFCLENBQUwsQ0FGcUM7QUFHekMsVUFBRyxJQUFILEVBQVE7QUFDUCxjQUFPLEtBQUssR0FBTCxDQUFTLENBQVQsRUFBWSxLQUFLLEtBQUwsQ0FBVyxNQUFYLEdBQ2pCLE9BQU8sR0FBUCxDQUFXLEVBQVgsR0FDQSxPQUFPLE1BQVAsQ0FBYyxFQUFkLEdBQ0EsT0FBTyxHQUFQLEdBQ0EsT0FBTyxNQUFQLEdBQ0EsT0FMaUIsQ0FBbkIsQ0FETztPQUFSLE1BUUMsT0FBTyxDQUFQLENBUkQ7TUFINEIsRUFZM0IsQ0FaWSxDQUFWLENBRnVDO0FBZTNDLGNBQVMsTUFBVCxHQUFnQixTQUFoQixDQWYyQztLQUE1QyxNQWlCQyxPQUFPLGNBQVAsQ0FBc0IsbUJBQXRCLEVBakJEOzs7S0ExQ3FCOztBQVd0QixNQUFFOztJQUFGLFFBcURPLENBQUMsaUJBQUQsRUFoRWU7O0FBa0V0Qiw4QkF0Rm1CLHlEQXNGbkIsQ0FsRXNCOzs7O3NDQXVGSjtjQUNFLEtBQUssT0FBTCxDQUFhLFVBQWIsQ0FBd0IsR0FBeEIsQ0FBNEIsZUFBNUIsS0FBK0MsRUFBL0MsQ0FERjs7T0FDWCwrQkFEVzs7QUFFbEIsT0FBRyxlQUFhLEdBQWIsRUFDRixPQUFPLENBQVAsQ0FERDtBQUVBLFVBQU8sQ0FBUCxDQUprQjs7OztvQ0FPRjtBQUNoQixPQUFJLE9BQUssSUFBTCxDQURZOztlQUV5QixLQUFLLE9BQUwsQ0FBYSxVQUFiLENBQXdCLEdBQXhCLENBQTRCLGVBQTVCLEtBQThDLEVBQTlDLENBRnpCOztPQUVULGdDQUZTO09BRUksOEJBRko7T0FFZ0Isd0JBRmhCOztBQUdoQixPQUFJLFdBQVMsS0FBSyxRQUFMLENBQWMsUUFBZCxDQUhHO0FBSWhCLE9BQUksZ0JBQWMsS0FBSyxlQUFMLEVBQWQsQ0FKWTtBQUtoQixVQUFPLE9BQU8sTUFBUCw0QkF2SFksbURBdUhaLEVBQXNDO0FBQzVDLGNBQVUsS0FBSyxLQUFMLENBQVcsV0FBWDtBQUNWLHNDQUFZO0FBQ1gsWUFBTyxlQUFhLEdBQWIsSUFDSCxDQUFDLEtBQUssVUFBTCxFQUFELElBQ0EsQ0FBQyxLQUFLLFNBQUwsRUFBRCxJQUNBLEtBQUssa0JBQUwsRUFIRyxDQURJO0tBRmdDO0FBUzVDLHNEQUFvQjtBQUNuQixZQUFPLEtBQUssUUFBTCxDQUFjLFFBQWQsQ0FBdUIsTUFBdkIsSUFBK0IsQ0FBL0IsQ0FEWTtLQVR3QjtBQVk1QyxvQ0FBVztBQUNWLFlBQU8sY0FBWSxHQUFaLElBQ0gsQ0FBQyxLQUFLLFVBQUwsRUFBRCxJQUNBLENBQUMsS0FBSyxTQUFMLEVBQUQsSUFDQSxLQUFLLGlCQUFMLEVBSEcsQ0FERztLQVppQztBQWtCNUMsb0RBQW1CO0FBQ2xCLFlBQU8sS0FBSyxRQUFMLENBQWMsUUFBZCxDQUF1QixNQUF2QixJQUErQixLQUFLLGVBQUwsS0FBdUIsQ0FBdkIsQ0FEcEI7S0FsQnlCO0FBcUI1Qyx3Q0FBYTtBQUNaLFlBQU8sV0FBUyxHQUFULElBQ0gsQ0FBQyxLQUFLLFVBQUwsRUFBRCxJQUNBLENBQUMsS0FBSyxTQUFMLEVBQUQsSUFDQSxDQUFDLEtBQUssUUFBTCxDQUFjLFFBQWQsQ0FBdUIsTUFBdkIsR0FBOEIsS0FBSyxpQkFBTCxFQUE5QixDQUFELEdBQXlELENBQXpELElBQTRELENBQTVELENBSlE7S0FyQitCO0FBMkI1Qyx3Q0FBYTtBQUNaLFlBQU8sV0FBUyxHQUFULElBQ0gsQ0FBQyxLQUFLLFVBQUwsRUFBRCxJQUNBLENBQUMsS0FBSyxTQUFMLEVBQUQsSUFDQSxDQUFDLEtBQUssUUFBTCxDQUFjLFFBQWQsQ0FBdUIsTUFBdkIsR0FBOEIsS0FBSyxpQkFBTCxFQUE5QixDQUFELEdBQXlELENBQXpELElBQTRELENBQTVELENBSlE7S0EzQitCO0FBaUM1QyxrQ0FBVTtBQUNULFlBQU8sS0FBSyxpQkFBTCxNQUE0QixLQUFLLGlCQUFMLEVBQTVCLENBREU7S0FqQ2tDO0FBb0M1QyxrQ0FBVTtBQUNULFlBQU8sS0FBSyxpQkFBTCxNQUE0QixLQUFLLGtCQUFMLEVBQTVCLENBREU7S0FwQ2tDO0FBdUM1QyxrQ0FBVTtBQUNULFlBQU8sS0FBSyxrQkFBTCxNQUE4QixLQUFLLGlCQUFMLEVBQTlCLENBREU7S0F2Q2tDO0FBMEM1QyxrQ0FBVTtBQUNULFlBQU8sS0FBSyxrQkFBTCxNQUE2QixLQUFLLGtCQUFMLEVBQTdCLENBREU7S0ExQ2tDO0lBQXRDLENBQVAsQ0FMZ0I7Ozs7UUFsSEc7RUFBWTs7QUFBWixJQUNiLGNBQVk7QUFEQyxJQXlGYixlQUFhLE9BQU8sTUFBUCxDQUFjO0FBQ2pDLGFBQVksaUJBQVUsTUFBVjtDQURPLEVBRWpCLE1BQU0sWUFBTjtBQTNGaUIsSUE2RmIsb0JBQWtCLE9BQU8sTUFBUCxDQUFjO0FBQ3RDLFdBQVUsaUJBQVUsTUFBVjtBQUNWLGFBQVksaUJBQVUsSUFBVjtBQUNaLFlBQVcsaUJBQVUsSUFBVjtBQUNYLHFCQUFvQixpQkFBVSxJQUFWO0FBQ3BCLG9CQUFtQixpQkFBVSxJQUFWO0FBQ25CLGNBQWEsaUJBQVUsSUFBVjtBQUNiLGNBQWEsaUJBQVUsSUFBVjtBQUNiLFdBQVUsaUJBQVUsSUFBVjtBQUNWLFdBQVUsaUJBQVUsSUFBVjtBQUNWLFdBQVUsaUJBQVUsSUFBVjtBQUNWLFdBQVUsaUJBQVUsSUFBVjtDQVhjLEVBWXRCLE1BQU0saUJBQU47a0JBekdpQjs7SUF3S2Y7OztBQUNMLFVBREssc0JBQ0wsQ0FBWSxLQUFaLEVBQTRCO3dCQUR2Qix3QkFDdUI7O29DQUFQOztHQUFPOztzRUFEdkIsbUNBRUUsU0FEcUI7O0FBRTNCLFNBQUssS0FBTCxHQUFXLEtBQVgsQ0FGMkI7O0VBQTVCOztRQURLO0VBQStCIiwiZmlsZSI6InJvdy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuXHJcbmltcG9ydCBBbnkgZnJvbSBcIi4vYW55XCJcclxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXHJcblxyXG5jb25zdCBTdXBlcj1BbnlcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm93IGV4dGVuZHMgU3VwZXJ7XHJcblx0c3RhdGljIGRpc3BsYXlOYW1lPVwicm93XCJcclxuXHJcblx0bmV4dEF2YWlsYWJsZVNwYWNlKCl7XHJcblx0XHRjb25zdCB7Y29sc309dGhpcy5jb250ZXh0LnBhcmVudC5wcm9wc1xyXG5cdFx0cmV0dXJuIHt3aWR0aDpjb2xzW3RoaXMuY29tcHV0ZWQuY2hpbGRyZW4ubGVuZ3RoXSwgaGVpZ2h0Ok51bWJlci5NQVhfVkFMVUV9XHJcblx0fVxyXG5cclxuXHRhcHBlbmRDb21wb3NlZChsaW5lKXtcclxuXHRcdGlmKHRoaXMuY29tcHV0ZWQuY29tcG9zZWQubGVuZ3RoPT0wKVxyXG5cdFx0XHR0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLnB1c2goW10pXHJcblx0XHRjb25zdCBjdXJyZW50Q2VsbD10aGlzLmNvbXB1dGVkLmNvbXBvc2VkW3RoaXMuY29tcHV0ZWQuY29tcG9zZWQubGVuZ3RoLTFdXHJcblx0XHRjdXJyZW50Q2VsbC5wdXNoKGxpbmUpXHJcblx0fVxyXG5cclxuXHRvbjFDaGlsZENvbXBvc2VkKCl7XHJcblx0XHR0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLnB1c2goW10pXHJcblx0XHRzdXBlci5vbjFDaGlsZENvbXBvc2VkKC4uLmFyZ3VtZW50cylcclxuXHR9XHJcblxyXG5cdG9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpe1xyXG5cdFx0dGhpcy5jb21wdXRlZC5jb21wb3NlZC5zcGxpY2UodGhpcy5jb21wdXRlZC5jaGlsZHJlbi5sZW5ndGgpLy9vbjFDaGlsZENvbXBvc2VkIHdpbGwgYWx3YXlzIGFkZCAxXHJcblxyXG5cdFx0Y29uc3Qge3BhcmVudH09dGhpcy5jb250ZXh0XHJcblx0XHRsZXQgaW5kZXhlcz1uZXcgQXJyYXkodGhpcy5jb21wdXRlZC5jb21wb3NlZC5sZW5ndGgpXHJcblx0XHRpbmRleGVzLmZpbGwoMClcclxuXHJcblx0XHRsZXQgaXNBbGxTZW50MlRhYmxlPWE9PmluZGV4ZXMucmVkdWNlKChwcmV2LGluZGV4LCBpKT0+dGhpcy5jb21wdXRlZC5jb21wb3NlZFtpXS5sZW5ndGg9PWluZGV4ICYmIHByZXYsIHRydWUpXHJcblxyXG5cdFx0bGV0IGNvdW50ZXI9MFxyXG5cdFx0bGV0IG1pblNwYWNlPXt9XHJcblx0XHRkb3tcclxuXHRcdFx0bGV0IGF2YWlsYWJsZVNwYWNlPXBhcmVudC5uZXh0QXZhaWxhYmxlU3BhY2UobWluU3BhY2UpXHJcblx0XHRcdGxldCBjdXJyZW50R3JvdXBlZExpbmVzPW5ldyBBcnJheSh0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLmxlbmd0aClcclxuXHRcdFx0dGhpcy5jb21wdXRlZC5jb21wb3NlZC5mb3JFYWNoKChsaW5lcyxpKT0+e1xyXG5cdFx0XHRcdGxldCBzdHlsZT10aGlzLmNvbXB1dGVkLmNoaWxkcmVuW2ldLmdldFN0eWxlKClcclxuXHRcdFx0XHRsZXQge2JvcmRlciwgbWFyZ2luLHNwYWNpbmd9PXN0eWxlXHJcblxyXG5cdFx0XHRcdGxldCBoZWlnaHQ9YXZhaWxhYmxlU3BhY2UuaGVpZ2h0XHJcblx0XHRcdFx0XHQtYm9yZGVyLnRvcC5zelxyXG5cdFx0XHRcdFx0LWJvcmRlci5ib3R0b20uc3pcclxuXHRcdFx0XHRcdC1tYXJnaW4udG9wXHJcblx0XHRcdFx0XHQtbWFyZ2luLmJvdHRvbVxyXG5cdFx0XHRcdFx0LXNwYWNpbmdcclxuXHJcblx0XHRcdFx0bGV0IGluZGV4PWluZGV4ZXNbaV1cclxuXHRcdFx0XHRsZXQgc3RhcnQ9aW5kZXhcclxuXHRcdFx0XHRmb3IobGV0IGxlbj1saW5lcy5sZW5ndGg7IGluZGV4PGxlbiAmJiBoZWlnaHQ+MDsgaW5kZXgrKyl7XHJcblx0XHRcdFx0XHRsZXQgbGluZT1saW5lc1tpbmRleF1cclxuXHRcdFx0XHRcdGhlaWdodC09bGluZS5wcm9wcy5oZWlnaHRcclxuXHRcdFx0XHRcdGlmKGhlaWdodDwwKXtcclxuXHRcdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRcdH1lbHNle1xyXG5cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aW5kZXhlc1tpXT1pbmRleFxyXG5cclxuXHRcdFx0XHRjdXJyZW50R3JvdXBlZExpbmVzW2ldPWxpbmVzLnNsaWNlKHN0YXJ0LGluZGV4KVxyXG5cdFx0XHRcdGN1cnJlbnRHcm91cGVkTGluZXNbaV0uc3R5bGU9c3R5bGVcclxuXHRcdFx0fSlcclxuXHJcblx0XHRcdGlmKCFjdXJyZW50R3JvdXBlZExpbmVzLmZpbmQoYT0+YS5sZW5ndGg+MCkpe1xyXG5cdFx0XHRcdC8vYXZhaWxhYmxlU3BhY2UgaXMgdG9vIHNtYWxsLCBuZWVkIGZpbmQgYSBtaW4gYXZhaWxhYmxlIHNwYWNlXHJcblx0XHRcdFx0bGV0IG1pbkhlaWdodD1pbmRleGVzLnJlZHVjZSgocCxpbmRleCxpKT0+e1xyXG5cdFx0XHRcdFx0bGV0IHtib3JkZXIsIG1hcmdpbiwgc3BhY2luZ309dGhpcy5jb21wdXRlZC5jaGlsZHJlbltpXS5nZXRTdHlsZSgpXHJcblx0XHRcdFx0XHRsZXQgbGluZT10aGlzLmNvbXB1dGVkLmNvbXBvc2VkW2ldW2luZGV4XVxyXG5cdFx0XHRcdFx0aWYobGluZSl7XHJcblx0XHRcdFx0XHRcdHJldHVybiBNYXRoLm1heChwLCBsaW5lLnByb3BzLmhlaWdodFxyXG5cdFx0XHRcdFx0XHRcdCtib3JkZXIudG9wLnN6XHJcblx0XHRcdFx0XHRcdFx0K2JvcmRlci5ib3R0b20uc3pcclxuXHRcdFx0XHRcdFx0XHQrbWFyZ2luLnRvcFxyXG5cdFx0XHRcdFx0XHRcdCttYXJnaW4uYm90dG9tXHJcblx0XHRcdFx0XHRcdFx0K3NwYWNpbmcpXHJcblx0XHRcdFx0XHR9ZWxzZVxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gcFxyXG5cdFx0XHRcdH0sMClcclxuXHRcdFx0XHRtaW5TcGFjZS5oZWlnaHQ9bWluSGVpZ2h0XHJcblx0XHRcdH1lbHNlXHJcblx0XHRcdFx0cGFyZW50LmFwcGVuZENvbXBvc2VkKGN1cnJlbnRHcm91cGVkTGluZXMpXHJcblx0XHRcdC8vaWYoY291bnRlcisrPjEwMClcclxuXHRcdFx0XHQvL3Rocm93IG5ldyBFcnJvcihcInRoZXJlIHNob3VsZCBiZSBhIGluZmluaXRlIGxvb3AgZHVyaW5nIHJvdyBzcGxpdCwgcGxlYXNlIGNoZWNrXCIpXHJcblxyXG5cclxuXHRcdH13aGlsZSghaXNBbGxTZW50MlRhYmxlKCkpO1xyXG5cclxuXHRcdHN1cGVyLm9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgY29udGV4dFR5cGVzPU9iamVjdC5hc3NpZ24oe1xyXG5cdFx0dGFibGVTdHlsZTogUHJvcFR5cGVzLm9iamVjdFxyXG5cdH0sIFN1cGVyLmNvbnRleHRUeXBlcylcclxuXHJcblx0c3RhdGljIGNoaWxkQ29udGV4dFR5cGVzPU9iamVjdC5hc3NpZ24oe1xyXG5cdFx0cm93U3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXHJcblx0XHRpc0ZpcnN0Q29sOiBQcm9wVHlwZXMuZnVuYyxcclxuXHRcdGlzTGFzdENvbDogUHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRpc0ZpcnN0Q29sQWJzb2x1dGU6IFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0aXNMYXN0Q29sQWJzb2x1dGU6IFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0aXNCYW5kMVZlcnQ6IFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0aXNCYW5kMlZlcnQ6IFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0aXNTZUNlbGw6IFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0aXNTd0NlbGw6IFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0aXNOZUNlbGw6IFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0aXNOd0NlbGw6IFByb3BUeXBlcy5mdW5jXHJcblx0fSwgU3VwZXIuY2hpbGRDb250ZXh0VHlwZXMpXHJcblxyXG5cdGdldEhlYWRlckNvbENvdW50KCl7XHJcblx0XHRjb25zdCB7Zmlyc3RDb2x1bW59PXRoaXMuY29udGV4dC50YWJsZVN0eWxlLmdldCgndGJsUHIudGJsTG9vaycpIHx8e31cclxuXHRcdGlmKGZpcnN0Q29sdW1uPT1cIjBcIilcclxuXHRcdFx0cmV0dXJuIDBcclxuXHRcdHJldHVybiAxXHJcblx0fVxyXG5cclxuXHRnZXRDaGlsZENvbnRleHQoKXtcclxuXHRcdGxldCBzZWxmPXRoaXNcclxuXHRcdGNvbnN0IHtmaXJzdENvbHVtbiwgbGFzdENvbHVtbiwgbm9WQmFuZH09dGhpcy5jb250ZXh0LnRhYmxlU3R5bGUuZ2V0KCd0YmxQci50YmxMb29rJyl8fHt9XHJcblx0XHRsZXQgY2hpbGRyZW49dGhpcy5jb21wdXRlZC5jaGlsZHJlblxyXG5cdFx0bGV0IGNvbnRlbnRMZW5ndGg9dGhpcy5nZXRDb250ZW50Q291bnQoKVxyXG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oc3VwZXIuZ2V0Q2hpbGRDb250ZXh0KCkse1xyXG5cdFx0XHRyb3dTdHlsZTogdGhpcy5wcm9wcy5kaXJlY3RTdHlsZSxcclxuXHRcdFx0aXNGaXJzdENvbCgpe1xyXG5cdFx0XHRcdHJldHVybiBmaXJzdENvbHVtbj09XCIxXCIgXHJcblx0XHRcdFx0XHQmJiAhdGhpcy5pc0ZpcnN0Um93KCkgXHJcblx0XHRcdFx0XHQmJiAhdGhpcy5pc0xhc3RSb3coKVxyXG5cdFx0XHRcdFx0JiYgdGhpcy5pc0ZpcnN0Q29sQWJzb2x1dGUoKSBcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHR9LFxyXG5cdFx0XHRpc0ZpcnN0Q29sQWJzb2x1dGUoKXtcclxuXHRcdFx0XHRyZXR1cm4gc2VsZi5jb21wdXRlZC5jaGlsZHJlbi5sZW5ndGg9PTBcclxuXHRcdFx0fSxcclxuXHRcdFx0aXNMYXN0Q29sKCl7XHJcblx0XHRcdFx0cmV0dXJuIGxhc3RDb2x1bW49PVwiMVwiXHJcblx0XHRcdFx0XHQmJiAhdGhpcy5pc0ZpcnN0Um93KClcclxuXHRcdFx0XHRcdCYmICF0aGlzLmlzTGFzdFJvdygpXHJcblx0XHRcdFx0XHQmJiB0aGlzLmlzTGFzdENvbEFic29sdXRlKClcclxuXHRcdFx0fSxcclxuXHRcdFx0aXNMYXN0Q29sQWJzb2x1dGUoKXtcclxuXHRcdFx0XHRyZXR1cm4gc2VsZi5jb21wdXRlZC5jaGlsZHJlbi5sZW5ndGg9PXNlbGYuZ2V0Q29udGVudENvdW50KCktMSBcclxuXHRcdFx0fSxcclxuXHRcdFx0aXNCYW5kMVZlcnQoKXtcclxuXHRcdFx0XHRyZXR1cm4gbm9WQmFuZD09XCIwXCIgXHJcblx0XHRcdFx0XHQmJiAhdGhpcy5pc0ZpcnN0Q29sKCkgXHJcblx0XHRcdFx0XHQmJiAhdGhpcy5pc0xhc3RDb2woKSBcclxuXHRcdFx0XHRcdCYmIChzZWxmLmNvbXB1dGVkLmNoaWxkcmVuLmxlbmd0aC1zZWxmLmdldEhlYWRlckNvbENvdW50KCkpJTI9PTFcclxuXHRcdFx0fSxcclxuXHRcdFx0aXNCYW5kMlZlcnQoKXtcclxuXHRcdFx0XHRyZXR1cm4gbm9WQmFuZD09XCIwXCIgXHJcblx0XHRcdFx0XHQmJiAhdGhpcy5pc0ZpcnN0Q29sKCkgXHJcblx0XHRcdFx0XHQmJiAhdGhpcy5pc0xhc3RDb2woKSBcclxuXHRcdFx0XHRcdCYmIChzZWxmLmNvbXB1dGVkLmNoaWxkcmVuLmxlbmd0aC1zZWxmLmdldEhlYWRlckNvbENvdW50KCkpJTI9PTBcclxuXHRcdFx0fSxcclxuXHRcdFx0aXNTZUNlbGwoKXtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5pc0xhc3RSb3dBYnNvbHV0ZSgpICYmIHRoaXMuaXNMYXN0Q29sQWJzb2x1dGUoKVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRpc1N3Q2VsbCgpe1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLmlzTGFzdFJvd0Fic29sdXRlKCkgJiYgdGhpcy5pc0ZpcnN0Q29sQWJzb2x1dGUoKVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRpc05lQ2VsbCgpe1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLmlzRmlyc3RSb3dBYnNvbHV0ZSgpICAmJiB0aGlzLmlzTGFzdENvbEFic29sdXRlKClcclxuXHRcdFx0fSxcclxuXHRcdFx0aXNOd0NlbGwoKXtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5pc0ZpcnN0Um93QWJzb2x1dGUoKSAmJiB0aGlzLmlzRmlyc3RDb2xBYnNvbHV0ZSgpXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG59XHJcblxyXG5jbGFzcyBDZWxsTGluZXNXaXRoQ2VsbFN0eWxlIGV4dGVuZHMgQXJyYXl7XHJcblx0Y29uc3RydWN0b3Ioc3R5bGUsLi4ub3RoZXJzKXtcclxuXHRcdHN1cGVyKG90aGVycylcclxuXHRcdHRoaXMuc3R5bGU9c3R5bGVcclxuXHR9XHJcbn1cclxuIl19