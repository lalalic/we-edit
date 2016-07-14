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
			var content = this.state.content;
			return Object.assign(_get(Object.getPrototypeOf(Row.prototype), "getChildContext", this).call(this), {
				conditions: this.props.contentStyle.get('cnfStyle') || [],
				rowStyle: this.props.contentStyle,
				isFirstCol: function isFirstCol() {
					return children.length == 0;
				},
				isLastCol: function isLastCol() {
					return children.length == content.length - 1;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3Jvdy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUI7OztBQUVwQixVQUZvQixHQUVwQixHQUFhO3dCQUZPLEtBRVA7O3FFQUZPLGlCQUdWLFlBREc7O0FBRVosUUFBSyxLQUFMLENBQVcsWUFBWCxDQUF3QixRQUF4QixDQUFpQyxPQUFqQyxHQUF5QyxNQUFLLE9BQUwsQ0FBYSxVQUFiLENBRjdCOztFQUFiOztjQUZvQjs7dUNBT0E7T0FDWixPQUFNLEtBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsS0FBcEIsQ0FBTixLQURZOztBQUVuQixVQUFPLEVBQUMsT0FBTSxLQUFLLEtBQUssUUFBTCxDQUFjLE1BQWQsQ0FBWCxFQUFrQyxRQUFPLE9BQU8sU0FBUCxFQUFqRCxDQUZtQjs7OztpQ0FLTCxNQUFLO0FBQ25CLE9BQUcsS0FBSyxRQUFMLENBQWMsTUFBZCxJQUFzQixDQUF0QixFQUNGLEtBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsRUFBbkIsRUFERDtBQUVBLE9BQU0sY0FBWSxLQUFLLFFBQUwsQ0FBYyxLQUFLLFFBQUwsQ0FBYyxNQUFkLEdBQXFCLENBQXJCLENBQTFCLENBSGE7QUFJbkIsZUFBWSxJQUFaLENBQWlCLElBQWpCLEVBSm1COzs7O3FDQU9GO0FBQ2pCLFFBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsRUFBbkIsRUFEaUI7QUFFakIsOEJBckJtQixzREFxQk8sVUFBMUIsQ0FGaUI7Ozs7MENBS0s7OztBQUN0QixRQUFLLFFBQUwsQ0FBYyxNQUFkLENBQXFCLEtBQUssUUFBTCxDQUFjLE1BQWQsQ0FBckI7O0FBRHNCLE9BR2YsU0FBUSxLQUFLLE9BQUwsQ0FBUixPQUhlOztBQUl0QixPQUFJLFVBQVEsSUFBSSxLQUFKLENBQVUsS0FBSyxRQUFMLENBQWMsTUFBZCxDQUFsQixDQUprQjtBQUt0QixXQUFRLElBQVIsQ0FBYSxD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Q0FERztBQUVoQixPQUFJLFVBQVEsS0FBSyxLQUFMLENBQVcsT0FBWCxDQUZJO0FBR2hCLFVBQU8sT0FBTyxNQUFQLDRCQTNHWSxtREEyR1osRUFBc0M7QUFDNUMsZ0JBQVksS0FBSyxLQUFMLENBQVcsWUFBWCxDQUF3QixHQUF4QixDQUE0QixVQUE1QixLQUF5QyxFQUF6QztBQUNaLGNBQVUsS0FBSyxLQUFMLENBQVcsWUFBWDtBQUNWLHNDQUFZO0FBQ1gsWUFBTyxTQUFTLE1BQVQsSUFBaUIsQ0FBakIsQ0FESTtLQUhnQztBQU01QyxvQ0FBVztBQUNWLFlBQU8sU0FBUyxNQUFULElBQWlCLFFBQVEsTUFBUixHQUFlLENBQWYsQ0FEZDtLQU5pQztJQUF0QyxDQUFQLENBSGdCOzs7O1FBeEdHOzs7SUFDYixjQUFZO0FBREMsSUE2RmIsZUFBYSxPQUFPLE1BQVAsQ0FBYztBQUNqQyxhQUFZLGlCQUFVLE1BQVY7Q0FETyxFQUVqQixvQkFBVSxZQUFWO0FBL0ZpQixJQWlHYixvQkFBa0IsT0FBTyxNQUFQLENBQWM7QUFDdEMsYUFBWSxpQkFBVSxLQUFWO0FBQ1osV0FBVSxpQkFBVSxNQUFWO0FBQ1YsYUFBWSxpQkFBVSxJQUFWO0FBQ1osWUFBVyxpQkFBVSxJQUFWO0NBSmEsRUFLdEIsb0JBQVUsaUJBQVY7a0JBdEdpQjs7SUF3SGY7OztBQUNMLFVBREssc0JBQ0wsQ0FBWSxLQUFaLEVBQTRCO3dCQUR2Qix3QkFDdUI7O29DQUFQOztHQUFPOztzRUFEdkIsbUNBRUUsU0FEcUI7O0FBRTNCLFNBQUssS0FBTCxHQUFXLEtBQVgsQ0FGMkI7O0VBQTVCOztRQURLO0VBQStCIiwiZmlsZSI6InJvdy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuXHJcbmltcG9ydCBDb250YWluZXIgZnJvbSBcIi4vY29udGFpbmVyXCJcclxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb3cgZXh0ZW5kcyBDb250YWluZXJ7XHJcblx0c3RhdGljIGRpc3BsYXlOYW1lPVwicm93XCJcclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxyXG5cdFx0dGhpcy5wcm9wcy5jb250ZW50U3R5bGUubWV0YWRhdGEuYmFzZWRPbj10aGlzLmNvbnRleHQudGFibGVTdHlsZVxyXG5cdH1cclxuXHRcclxuXHRuZXh0QXZhaWxhYmxlU3BhY2UoKXtcclxuXHRcdGNvbnN0IHtjb2xzfT10aGlzLmNvbnRleHQucGFyZW50LnByb3BzXHJcblx0XHRyZXR1cm4ge3dpZHRoOmNvbHNbdGhpcy5jaGlsZHJlbi5sZW5ndGhdLCBoZWlnaHQ6TnVtYmVyLk1BWF9WQUxVRX1cclxuXHR9XHJcblxyXG5cdGFwcGVuZENvbXBvc2VkKGxpbmUpe1xyXG5cdFx0aWYodGhpcy5jb21wb3NlZC5sZW5ndGg9PTApXHJcblx0XHRcdHRoaXMuY29tcG9zZWQucHVzaChbXSlcclxuXHRcdGNvbnN0IGN1cnJlbnRDZWxsPXRoaXMuY29tcG9zZWRbdGhpcy5jb21wb3NlZC5sZW5ndGgtMV1cclxuXHRcdGN1cnJlbnRDZWxsLnB1c2gobGluZSlcclxuXHR9XHJcblxyXG5cdG9uMUNoaWxkQ29tcG9zZWQoKXtcclxuXHRcdHRoaXMuY29tcG9zZWQucHVzaChbXSlcclxuXHRcdHN1cGVyLm9uMUNoaWxkQ29tcG9zZWQoLi4uYXJndW1lbnRzKVxyXG5cdH1cclxuXHJcblx0b25BbGxDaGlsZHJlbkNvbXBvc2VkKCl7XHJcblx0XHR0aGlzLmNvbXBvc2VkLnNwbGljZSh0aGlzLmNoaWxkcmVuLmxlbmd0aCkvL29uMUNoaWxkQ29tcG9zZWQgd2lsbCBhbHdheXMgYWRkIDFcclxuXHRcdFxyXG5cdFx0Y29uc3Qge3BhcmVudH09dGhpcy5jb250ZXh0XHJcblx0XHRsZXQgaW5kZXhlcz1uZXcgQXJyYXkodGhpcy5jb21wb3NlZC5sZW5ndGgpXHJcblx0XHRpbmRleGVzLmZpbGwoMClcclxuXHJcblx0XHRsZXQgaXNBbGxTZW50MlRhYmxlPWE9PmluZGV4ZXMucmVkdWNlKChwcmV2LGluZGV4LCBpKT0+dGhpcy5jb21wb3NlZFtpXS5sZW5ndGg9PWluZGV4ICYmIHByZXYsIHRydWUpXHJcblxyXG5cdFx0bGV0IGNvdW50ZXI9MFxyXG5cdFx0bGV0IG1pblNwYWNlPXt9XHJcblx0XHRkb3tcclxuXHRcdFx0bGV0IGF2YWlsYWJsZVNwYWNlPXBhcmVudC5uZXh0QXZhaWxhYmxlU3BhY2UobWluU3BhY2UpXHJcblx0XHRcdGxldCBjdXJyZW50R3JvdXBlZExpbmVzPW5ldyBBcnJheSh0aGlzLmNvbXBvc2VkLmxlbmd0aClcclxuXHRcdFx0dGhpcy5jb21wb3NlZC5mb3JFYWNoKChsaW5lcyxpKT0+e1xyXG5cdFx0XHRcdGxldCBzdHlsZT10aGlzLmNoaWxkcmVuW2ldLmdldFN0eWxlKClcclxuXHRcdFx0XHRsZXQge2JvcmRlciwgbWFyZ2luLHNwYWNpbmd9PXN0eWxlXHJcblxyXG5cdFx0XHRcdGxldCBoZWlnaHQ9YXZhaWxhYmxlU3BhY2UuaGVpZ2h0XHJcblx0XHRcdFx0XHQtYm9yZGVyLnRvcC5zelxyXG5cdFx0XHRcdFx0LWJvcmRlci5ib3R0b20uc3pcclxuXHRcdFx0XHRcdC1tYXJnaW4udG9wXHJcblx0XHRcdFx0XHQtbWFyZ2luLmJvdHRvbVxyXG5cdFx0XHRcdFx0LXNwYWNpbmdcclxuXHJcblx0XHRcdFx0bGV0IGluZGV4PWluZGV4ZXNbaV1cclxuXHRcdFx0XHRsZXQgc3RhcnQ9aW5kZXhcclxuXHRcdFx0XHRmb3IobGV0IGxlbj1saW5lcy5sZW5ndGg7IGluZGV4PGxlbiAmJiBoZWlnaHQ+MDsgaW5kZXgrKyl7XHJcblx0XHRcdFx0XHRsZXQgbGluZT1saW5lc1tpbmRleF1cclxuXHRcdFx0XHRcdGhlaWdodC09bGluZS5wcm9wcy5oZWlnaHRcclxuXHRcdFx0XHRcdGlmKGhlaWdodDwwKXtcclxuXHRcdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRcdH1lbHNle1xyXG5cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aW5kZXhlc1tpXT1pbmRleFxyXG5cclxuXHRcdFx0XHRjdXJyZW50R3JvdXBlZExpbmVzW2ldPWxpbmVzLnNsaWNlKHN0YXJ0LGluZGV4KVxyXG5cdFx0XHRcdGN1cnJlbnRHcm91cGVkTGluZXNbaV0uc3R5bGU9c3R5bGVcclxuXHRcdFx0fSlcclxuXHJcblx0XHRcdGlmKCFjdXJyZW50R3JvdXBlZExpbmVzLmZpbmQoYT0+YS5sZW5ndGg+MCkpe1xyXG5cdFx0XHRcdC8vYXZhaWxhYmxlU3BhY2UgaXMgdG9vIHNtYWxsLCBuZWVkIGZpbmQgYSBtaW4gYXZhaWxhYmxlIHNwYWNlXHJcblx0XHRcdFx0bGV0IG1pbkhlaWdodD1pbmRleGVzLnJlZHVjZSgocCxpbmRleCxpKT0+e1xyXG5cdFx0XHRcdFx0bGV0IHtib3JkZXIsIG1hcmdpbiwgc3BhY2luZ309dGhpcy5jaGlsZHJlbltpXS5nZXRTdHlsZSgpXHJcblx0XHRcdFx0XHRsZXQgbGluZT10aGlzLmNvbXBvc2VkW2ldW2luZGV4XVxyXG5cdFx0XHRcdFx0aWYobGluZSl7XHJcblx0XHRcdFx0XHRcdHJldHVybiBNYXRoLm1heChwLCBsaW5lLnByb3BzLmhlaWdodFxyXG5cdFx0XHRcdFx0XHRcdCtib3JkZXIudG9wLnN6XHJcblx0XHRcdFx0XHRcdFx0K2JvcmRlci5ib3R0b20uc3pcclxuXHRcdFx0XHRcdFx0XHQrbWFyZ2luLnRvcFxyXG5cdFx0XHRcdFx0XHRcdCttYXJnaW4uYm90dG9tXHJcblx0XHRcdFx0XHRcdFx0K3NwYWNpbmcpXHJcblx0XHRcdFx0XHR9ZWxzZVxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gcFxyXG5cdFx0XHRcdH0sMClcclxuXHRcdFx0XHRtaW5TcGFjZS5oZWlnaHQ9bWluSGVpZ2h0XHJcblx0XHRcdH1lbHNlXHJcblx0XHRcdFx0cGFyZW50LmFwcGVuZENvbXBvc2VkKGN1cnJlbnRHcm91cGVkTGluZXMpXHJcblx0XHRcdC8vaWYoY291bnRlcisrPjEwMClcclxuXHRcdFx0XHQvL3Rocm93IG5ldyBFcnJvcihcInRoZXJlIHNob3VsZCBiZSBhIGluZmluaXRlIGxvb3AgZHVyaW5nIHJvdyBzcGxpdCwgcGxlYXNlIGNoZWNrXCIpXHJcblxyXG5cclxuXHRcdH13aGlsZSghaXNBbGxTZW50MlRhYmxlKCkpO1xyXG5cclxuXHRcdHN1cGVyLm9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpXHJcblx0fVxyXG5cdFxyXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9T2JqZWN0LmFzc2lnbih7XHJcblx0XHR0YWJsZVN0eWxlOiBQcm9wVHlwZXMub2JqZWN0XHJcblx0fSwgQ29udGFpbmVyLmNvbnRleHRUeXBlcylcclxuXHJcblx0c3RhdGljIGNoaWxkQ29udGV4dFR5cGVzPU9iamVjdC5hc3NpZ24oe1xyXG5cdFx0Y29uZGl0aW9uczogUHJvcFR5cGVzLmFycmF5LFxyXG5cdFx0cm93U3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXHJcblx0XHRpc0ZpcnN0Q29sOiBQcm9wVHlwZXMuZnVuYyxcclxuXHRcdGlzTGFzdENvbDogUHJvcFR5cGVzLmZ1bmNcclxuXHR9LCBDb250YWluZXIuY2hpbGRDb250ZXh0VHlwZXMpXHJcblxyXG5cdGdldENoaWxkQ29udGV4dCgpe1xyXG5cdFx0bGV0IGNoaWxkcmVuPXRoaXMuY2hpbGRyZW5cclxuXHRcdGxldCBjb250ZW50PXRoaXMuc3RhdGUuY29udGVudFxyXG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oc3VwZXIuZ2V0Q2hpbGRDb250ZXh0KCkse1xyXG5cdFx0XHRjb25kaXRpb25zOiB0aGlzLnByb3BzLmNvbnRlbnRTdHlsZS5nZXQoJ2NuZlN0eWxlJyl8fFtdLFxyXG5cdFx0XHRyb3dTdHlsZTogdGhpcy5wcm9wcy5jb250ZW50U3R5bGUsXHJcblx0XHRcdGlzRmlyc3RDb2woKXtcclxuXHRcdFx0XHRyZXR1cm4gY2hpbGRyZW4ubGVuZ3RoPT0wXHJcblx0XHRcdH0sXHJcblx0XHRcdGlzTGFzdENvbCgpe1xyXG5cdFx0XHRcdHJldHVybiBjaGlsZHJlbi5sZW5ndGg9PWNvbnRlbnQubGVuZ3RoLTFcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIENlbGxMaW5lc1dpdGhDZWxsU3R5bGUgZXh0ZW5kcyBBcnJheXtcclxuXHRjb25zdHJ1Y3RvcihzdHlsZSwuLi5vdGhlcnMpe1xyXG5cdFx0c3VwZXIob3RoZXJzKVxyXG5cdFx0dGhpcy5zdHlsZT1zdHlsZVxyXG5cdH1cclxufVxyXG4iXX0=