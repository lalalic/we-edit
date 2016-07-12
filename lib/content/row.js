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
		key: "compose",
		value: function compose() {
			_get(Object.getPrototypeOf(Row.prototype), "compose", this).call(this);
			this.composed.push([]);
		}
	}, {
		key: "appendComposed",
		value: function appendComposed(line) {
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

			this.composed.pop();
			this.context.parent.children.push(this);
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
					var _children$i$getStyle = _this2.children[i].getStyle();

					var border = _children$i$getStyle.border;
					var margin = _children$i$getStyle.margin;
					var spacing = _children$i$getStyle.spacing;


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
				});

				if (!currentGroupedLines.find(function (a) {
					return a.length > 0;
				})) {
					//availableSpace is too small, need find a min available space
					var minHeight = indexes.reduce(function (p, index, i) {
						var _children$i$getStyle2 = _this2.children[i].getStyle();

						var border = _children$i$getStyle2.border;
						var margin = _children$i$getStyle2.margin;
						var spacing = _children$i$getStyle2.spacing;

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

			this.context.parent.children.pop();
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
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3Jvdy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUI7OztBQUVwQixVQUZvQixHQUVwQixHQUFhO3dCQUZPLEtBRVA7O3FFQUZPLGlCQUdWLFlBREc7O0FBRVosUUFBSyxLQUFMLENBQVcsWUFBWCxDQUF3QixRQUF4QixDQUFpQyxPQUFqQyxHQUF5QyxNQUFLLE9BQUwsQ0FBYSxVQUFiLENBRjdCOztFQUFiOztjQUZvQjs7dUNBT0E7T0FDWixPQUFNLEtBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsS0FBcEIsQ0FBTixLQURZOztBQUVuQixVQUFPLEVBQUMsT0FBTSxLQUFLLEtBQUssUUFBTCxDQUFjLE1BQWQsQ0FBWCxFQUFrQyxRQUFPLE9BQU8sU0FBUCxFQUFqRCxDQUZtQjs7Ozs0QkFLWDtBQUNSLDhCQWJtQiwyQ0FhbkIsQ0FEUTtBQUVSLFFBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsRUFBbkIsRUFGUTs7OztpQ0FLTSxNQUFLO0FBQ25CLE9BQU0sY0FBWSxLQUFLLFFBQUwsQ0FBYyxLQUFLLFFBQUwsQ0FBYyxNQUFkLEdBQXFCLENBQXJCLENBQTFCLENBRGE7QUFFbkIsZUFBWSxJQUFaLENBQWlCLElBQWpCLEVBRm1COzs7O3FDQUtGO0FBQ2pCLFFBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsRUFBbkIsRUFEaUI7QUFFakIsOEJBeEJtQixzREF3Qk8sVUFBMUIsQ0FGaUI7Ozs7MENBS0s7OztBQUN0QixRQUFLLFFBQUwsQ0FBYyxHQUFkLEdBRHNCO0FBRXRCLFFBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsUUFBcEIsQ0FBNkIsSUFBN0IsQ0FBa0MsSUFBbEMsRUFGc0I7T0FHZixTQUFRLEtBQUssT0FBTCxDQUFSLE9BSGU7O0FBSXRCLE9BQUksVUFBUSxJQUFJLEtBQUosQ0FBVSxLQUFLLFFBQUwsQ0FBYyxNQUFkLENBQWxCLENB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QUksVUFBUSxLQUFLLEtBQUwsQ0FBVyxPQUFYLENBRkk7QUFHaEIsVUFBTyxPQUFPLE1BQVAsNEJBN0dZLG1EQTZHWixFQUFzQztBQUM1QyxnQkFBWSxLQUFLLEtBQUwsQ0FBVyxZQUFYLENBQXdCLEdBQXhCLENBQTRCLFVBQTVCLEtBQXlDLEVBQXpDO0FBQ1osY0FBVSxLQUFLLEtBQUwsQ0FBVyxZQUFYO0FBQ1Ysc0NBQVk7QUFDWCxZQUFPLFNBQVMsTUFBVCxJQUFpQixDQUFqQixDQURJO0tBSGdDO0FBTTVDLG9DQUFXO0FBQ1YsWUFBTyxTQUFTLE1BQVQsSUFBaUIsUUFBUSxNQUFSLEdBQWUsQ0FBZixDQURkO0tBTmlDO0lBQXRDLENBQVAsQ0FIZ0I7Ozs7UUExR0c7OztJQUNiLGNBQVk7QUFEQyxJQStGYixlQUFhLE9BQU8sTUFBUCxDQUFjO0FBQ2pDLGFBQVksaUJBQVUsTUFBVjtDQURPLEVBRWpCLG9CQUFVLFlBQVY7QUFqR2lCLElBbUdiLG9CQUFrQixPQUFPLE1BQVAsQ0FBYztBQUN0QyxhQUFZLGlCQUFVLEtBQVY7QUFDWixXQUFVLGlCQUFVLE1BQVY7QUFDVixhQUFZLGlCQUFVLElBQVY7QUFDWixZQUFXLGlCQUFVLElBQVY7Q0FKYSxFQUt0QixvQkFBVSxpQkFBVjtrQkF4R2lCIiwiZmlsZSI6InJvdy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuXHJcbmltcG9ydCBDb250YWluZXIgZnJvbSBcIi4vY29udGFpbmVyXCJcclxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb3cgZXh0ZW5kcyBDb250YWluZXJ7XHJcblx0c3RhdGljIGRpc3BsYXlOYW1lPVwicm93XCJcclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxyXG5cdFx0dGhpcy5wcm9wcy5jb250ZW50U3R5bGUubWV0YWRhdGEuYmFzZWRPbj10aGlzLmNvbnRleHQudGFibGVTdHlsZVxyXG5cdH1cclxuXHRcclxuXHRuZXh0QXZhaWxhYmxlU3BhY2UoKXtcclxuXHRcdGNvbnN0IHtjb2xzfT10aGlzLmNvbnRleHQucGFyZW50LnByb3BzXHJcblx0XHRyZXR1cm4ge3dpZHRoOmNvbHNbdGhpcy5jaGlsZHJlbi5sZW5ndGhdLCBoZWlnaHQ6TnVtYmVyLk1BWF9WQUxVRX1cclxuXHR9XHJcblxyXG5cdGNvbXBvc2UoKXtcclxuXHRcdHN1cGVyLmNvbXBvc2UoKVxyXG5cdFx0dGhpcy5jb21wb3NlZC5wdXNoKFtdKVxyXG5cdH1cclxuXHJcblx0YXBwZW5kQ29tcG9zZWQobGluZSl7XHJcblx0XHRjb25zdCBjdXJyZW50Q2VsbD10aGlzLmNvbXBvc2VkW3RoaXMuY29tcG9zZWQubGVuZ3RoLTFdXHJcblx0XHRjdXJyZW50Q2VsbC5wdXNoKGxpbmUpXHJcblx0fVxyXG5cclxuXHRvbjFDaGlsZENvbXBvc2VkKCl7XHJcblx0XHR0aGlzLmNvbXBvc2VkLnB1c2goW10pXHJcblx0XHRzdXBlci5vbjFDaGlsZENvbXBvc2VkKC4uLmFyZ3VtZW50cylcclxuXHR9XHJcblxyXG5cdG9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpe1xyXG5cdFx0dGhpcy5jb21wb3NlZC5wb3AoKVxyXG5cdFx0dGhpcy5jb250ZXh0LnBhcmVudC5jaGlsZHJlbi5wdXNoKHRoaXMpXHJcblx0XHRjb25zdCB7cGFyZW50fT10aGlzLmNvbnRleHRcclxuXHRcdGxldCBpbmRleGVzPW5ldyBBcnJheSh0aGlzLmNvbXBvc2VkLmxlbmd0aClcclxuXHRcdGluZGV4ZXMuZmlsbCgwKVxyXG5cclxuXHRcdGxldCBpc0FsbFNlbnQyVGFibGU9YT0+aW5kZXhlcy5yZWR1Y2UoKHByZXYsaW5kZXgsIGkpPT50aGlzLmNvbXBvc2VkW2ldLmxlbmd0aD09aW5kZXggJiYgcHJldiwgdHJ1ZSlcclxuXHJcblx0XHRsZXQgY291bnRlcj0wXHJcblx0XHRsZXQgbWluU3BhY2U9e31cclxuXHRcdGRve1xyXG5cdFx0XHRsZXQgYXZhaWxhYmxlU3BhY2U9cGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZShtaW5TcGFjZSlcclxuXHRcdFx0bGV0IGN1cnJlbnRHcm91cGVkTGluZXM9bmV3IEFycmF5KHRoaXMuY29tcG9zZWQubGVuZ3RoKVxyXG5cdFx0XHR0aGlzLmNvbXBvc2VkLmZvckVhY2goKGxpbmVzLGkpPT57XHJcblx0XHRcdFx0bGV0IHtib3JkZXIsIG1hcmdpbixzcGFjaW5nfT10aGlzLmNoaWxkcmVuW2ldLmdldFN0eWxlKClcclxuXHJcblx0XHRcdFx0bGV0IGhlaWdodD1hdmFpbGFibGVTcGFjZS5oZWlnaHRcclxuXHRcdFx0XHRcdC1ib3JkZXIudG9wLnN6XHJcblx0XHRcdFx0XHQtYm9yZGVyLmJvdHRvbS5zelxyXG5cdFx0XHRcdFx0LW1hcmdpbi50b3BcclxuXHRcdFx0XHRcdC1tYXJnaW4uYm90dG9tXHJcblx0XHRcdFx0XHQtc3BhY2luZ1xyXG5cclxuXHRcdFx0XHRsZXQgaW5kZXg9aW5kZXhlc1tpXVxyXG5cdFx0XHRcdGxldCBzdGFydD1pbmRleFxyXG5cdFx0XHRcdGZvcihsZXQgbGVuPWxpbmVzLmxlbmd0aDsgaW5kZXg8bGVuICYmIGhlaWdodD4wOyBpbmRleCsrKXtcclxuXHRcdFx0XHRcdGxldCBsaW5lPWxpbmVzW2luZGV4XVxyXG5cdFx0XHRcdFx0aGVpZ2h0LT1saW5lLnByb3BzLmhlaWdodFxyXG5cdFx0XHRcdFx0aWYoaGVpZ2h0PDApe1xyXG5cdFx0XHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdFx0fWVsc2V7XHJcblxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpbmRleGVzW2ldPWluZGV4XHJcblxyXG5cdFx0XHRcdGN1cnJlbnRHcm91cGVkTGluZXNbaV09bGluZXMuc2xpY2Uoc3RhcnQsaW5kZXgpXHJcblx0XHRcdH0pXHJcblxyXG5cdFx0XHRpZighY3VycmVudEdyb3VwZWRMaW5lcy5maW5kKGE9PmEubGVuZ3RoPjApKXtcclxuXHRcdFx0XHQvL2F2YWlsYWJsZVNwYWNlIGlzIHRvbyBzbWFsbCwgbmVlZCBmaW5kIGEgbWluIGF2YWlsYWJsZSBzcGFjZVxyXG5cdFx0XHRcdGxldCBtaW5IZWlnaHQ9aW5kZXhlcy5yZWR1Y2UoKHAsaW5kZXgsaSk9PntcclxuXHRcdFx0XHRcdGxldCB7Ym9yZGVyLCBtYXJnaW4sIHNwYWNpbmd9PXRoaXMuY2hpbGRyZW5baV0uZ2V0U3R5bGUoKVxyXG5cdFx0XHRcdFx0bGV0IGxpbmU9dGhpcy5jb21wb3NlZFtpXVtpbmRleF1cclxuXHRcdFx0XHRcdGlmKGxpbmUpe1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gTWF0aC5tYXgocCwgbGluZS5wcm9wcy5oZWlnaHRcclxuXHRcdFx0XHRcdFx0XHQrYm9yZGVyLnRvcC5zelxyXG5cdFx0XHRcdFx0XHRcdCtib3JkZXIuYm90dG9tLnN6XHJcblx0XHRcdFx0XHRcdFx0K21hcmdpbi50b3BcclxuXHRcdFx0XHRcdFx0XHQrbWFyZ2luLmJvdHRvbVxyXG5cdFx0XHRcdFx0XHRcdCtzcGFjaW5nKVxyXG5cdFx0XHRcdFx0fWVsc2VcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHBcclxuXHRcdFx0XHR9LDApXHJcblx0XHRcdFx0bWluU3BhY2UuaGVpZ2h0PW1pbkhlaWdodFxyXG5cdFx0XHR9ZWxzZVxyXG5cdFx0XHRcdHBhcmVudC5hcHBlbmRDb21wb3NlZChjdXJyZW50R3JvdXBlZExpbmVzKVxyXG5cdFx0XHQvL2lmKGNvdW50ZXIrKz4xMDApXHJcblx0XHRcdFx0Ly90aHJvdyBuZXcgRXJyb3IoXCJ0aGVyZSBzaG91bGQgYmUgYSBpbmZpbml0ZSBsb29wIGR1cmluZyByb3cgc3BsaXQsIHBsZWFzZSBjaGVja1wiKVxyXG5cclxuXHJcblx0XHR9d2hpbGUoIWlzQWxsU2VudDJUYWJsZSgpKTtcclxuXHJcblx0XHR0aGlzLmNvbnRleHQucGFyZW50LmNoaWxkcmVuLnBvcCgpXHJcblx0XHRzdXBlci5vbkFsbENoaWxkcmVuQ29tcG9zZWQoKVxyXG5cdH1cclxuXHRcclxuXHRzdGF0aWMgY29udGV4dFR5cGVzPU9iamVjdC5hc3NpZ24oe1xyXG5cdFx0dGFibGVTdHlsZTogUHJvcFR5cGVzLm9iamVjdFxyXG5cdH0sIENvbnRhaW5lci5jb250ZXh0VHlwZXMpXHJcblxyXG5cdHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcclxuXHRcdGNvbmRpdGlvbnM6IFByb3BUeXBlcy5hcnJheSxcclxuXHRcdHJvd1N0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0aXNGaXJzdENvbDogUHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRpc0xhc3RDb2w6IFByb3BUeXBlcy5mdW5jXHJcblx0fSwgQ29udGFpbmVyLmNoaWxkQ29udGV4dFR5cGVzKVxyXG5cclxuXHRnZXRDaGlsZENvbnRleHQoKXtcclxuXHRcdGxldCBjaGlsZHJlbj10aGlzLmNoaWxkcmVuXHJcblx0XHRsZXQgY29udGVudD10aGlzLnN0YXRlLmNvbnRlbnRcclxuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKHN1cGVyLmdldENoaWxkQ29udGV4dCgpLHtcclxuXHRcdFx0Y29uZGl0aW9uczogdGhpcy5wcm9wcy5jb250ZW50U3R5bGUuZ2V0KCdjbmZTdHlsZScpfHxbXSxcclxuXHRcdFx0cm93U3R5bGU6IHRoaXMucHJvcHMuY29udGVudFN0eWxlLFxyXG5cdFx0XHRpc0ZpcnN0Q29sKCl7XHJcblx0XHRcdFx0cmV0dXJuIGNoaWxkcmVuLmxlbmd0aD09MFxyXG5cdFx0XHR9LFxyXG5cdFx0XHRpc0xhc3RDb2woKXtcclxuXHRcdFx0XHRyZXR1cm4gY2hpbGRyZW4ubGVuZ3RoPT1jb250ZW50Lmxlbmd0aC0xXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG59XHJcbiJdfQ==