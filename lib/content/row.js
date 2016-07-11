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

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Row).apply(this, arguments));
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

			console.warn("one row composed");
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
			return Object.assign(_get(Object.getPrototypeOf(Row.prototype), "getChildContext", this).call(this), {
				conditions: this.props.contentStyle.get('row.cnfStyle') || [],
				rowStyle: this.props.contentStyle
			});
		}
	}]);

	return Row;
}(_container2.default);

Row.displayName = "row";
Row.childContextTypes = Object.assign({
	conditions: _react.PropTypes.array,
	rowStyle: _react.PropTypes.object
}, _container2.default.childContextTypes);
exports.default = Row;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3Jvdy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7O3VDQUVBO09BQ1osT0FBTSxLQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLEtBQXBCLENBQU4sS0FEWTs7QUFFbkIsVUFBTyxFQUFDLE9BQU0sS0FBSyxLQUFLLFFBQUwsQ0FBYyxNQUFkLENBQVgsRUFBa0MsUUFBTyxPQUFPLFNBQVAsRUFBakQsQ0FGbUI7Ozs7NEJBS1g7QUFDUiw4QkFSbUIsMkNBUW5CLENBRFE7QUFFUixRQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW1CLEVBQW5CLEVBRlE7Ozs7aUNBS00sTUFBSztBQUNuQixPQUFNLGNBQVksS0FBSyxRQUFMLENBQWMsS0FBSyxRQUFMLENBQWMsTUFBZCxHQUFxQixDQUFyQixDQUExQixDQURhO0FBRW5CLGVBQVksSUFBWixDQUFpQixJQUFqQixFQUZtQjs7OztxQ0FLRjtBQUNqQixRQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW1CLEVBQW5CLEVBRGlCO0FBRWpCLDhCQW5CbUIsc0RBbUJPLFVBQTFCLENBRmlCOzs7OzBDQUtLOzs7QUFDdEIsV0FBUSxJQUFSLENBQWEsa0JBQWIsRUFEc0I7QUFFdEIsUUFBSyxRQUFMLENBQWMsR0FBZCxHQUZzQjtBQUd0QixRQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLFFBQXBCLENBQTZCLElBQTdCLENBQWtDLElBQWxDLEVBSHNCO09BSWYsU0FBUSxLQUFLLE9BQUwsQ0FBUixPQUplOztBQUt0QixPQUFJLFVBQVEsSUFBSSxLQUFKLENBQVUsS0FBSyxRQUFMLENBQWMsTUFBZCxDQUFsQixDQUxrQjtBQU10QixXQUFRLElBQVIsQ0FBYSxDQUFiLEVBTnNCOztBQVF0QixPQUFJLGtCQUFnQixTQUFoQixlQUFnQjtXQUFHLFFBQVEsTUFBUixDQUFlLFVBQUMsSUFBRCxFQUFNLEtBQU4s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QVAsQ0FEZ0I7Ozs7UUFoR0c7OztJQUNiLGNBQVk7QUFEQyxJQTJGYixvQkFBa0IsT0FBTyxNQUFQLENBQWM7QUFDdEMsYUFBWSxpQkFBVSxLQUFWO0FBQ1osV0FBVSxpQkFBVSxNQUFWO0NBRmMsRUFHdEIsb0JBQVUsaUJBQVY7a0JBOUZpQiIsImZpbGUiOiJyb3cuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcblxyXG5pbXBvcnQgQ29udGFpbmVyIGZyb20gXCIuL2NvbnRhaW5lclwiXHJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZWQvZ3JvdXBcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm93IGV4dGVuZHMgQ29udGFpbmVye1xyXG5cdHN0YXRpYyBkaXNwbGF5TmFtZT1cInJvd1wiXHJcblx0bmV4dEF2YWlsYWJsZVNwYWNlKCl7XHJcblx0XHRjb25zdCB7Y29sc309dGhpcy5jb250ZXh0LnBhcmVudC5wcm9wc1xyXG5cdFx0cmV0dXJuIHt3aWR0aDpjb2xzW3RoaXMuY2hpbGRyZW4ubGVuZ3RoXSwgaGVpZ2h0Ok51bWJlci5NQVhfVkFMVUV9XHJcblx0fVxyXG5cclxuXHRjb21wb3NlKCl7XHJcblx0XHRzdXBlci5jb21wb3NlKClcclxuXHRcdHRoaXMuY29tcG9zZWQucHVzaChbXSlcclxuXHR9XHJcblxyXG5cdGFwcGVuZENvbXBvc2VkKGxpbmUpe1xyXG5cdFx0Y29uc3QgY3VycmVudENlbGw9dGhpcy5jb21wb3NlZFt0aGlzLmNvbXBvc2VkLmxlbmd0aC0xXVxyXG5cdFx0Y3VycmVudENlbGwucHVzaChsaW5lKVxyXG5cdH1cclxuXHJcblx0b24xQ2hpbGRDb21wb3NlZCgpe1xyXG5cdFx0dGhpcy5jb21wb3NlZC5wdXNoKFtdKVxyXG5cdFx0c3VwZXIub24xQ2hpbGRDb21wb3NlZCguLi5hcmd1bWVudHMpXHJcblx0fVxyXG5cclxuXHRvbkFsbENoaWxkcmVuQ29tcG9zZWQoKXtcclxuXHRcdGNvbnNvbGUud2FybihcIm9uZSByb3cgY29tcG9zZWRcIilcclxuXHRcdHRoaXMuY29tcG9zZWQucG9wKClcclxuXHRcdHRoaXMuY29udGV4dC5wYXJlbnQuY2hpbGRyZW4ucHVzaCh0aGlzKVxyXG5cdFx0Y29uc3Qge3BhcmVudH09dGhpcy5jb250ZXh0XHJcblx0XHRsZXQgaW5kZXhlcz1uZXcgQXJyYXkodGhpcy5jb21wb3NlZC5sZW5ndGgpXHJcblx0XHRpbmRleGVzLmZpbGwoMClcclxuXHJcblx0XHRsZXQgaXNBbGxTZW50MlRhYmxlPWE9PmluZGV4ZXMucmVkdWNlKChwcmV2LGluZGV4LCBpKT0+dGhpcy5jb21wb3NlZFtpXS5sZW5ndGg9PWluZGV4ICYmIHByZXYsIHRydWUpXHJcblxyXG5cdFx0bGV0IGNvdW50ZXI9MFxyXG5cdFx0bGV0IG1pblNwYWNlPXt9XHJcblx0XHRkb3tcclxuXHRcdFx0bGV0IGF2YWlsYWJsZVNwYWNlPXBhcmVudC5uZXh0QXZhaWxhYmxlU3BhY2UobWluU3BhY2UpXHJcblx0XHRcdGxldCBjdXJyZW50R3JvdXBlZExpbmVzPW5ldyBBcnJheSh0aGlzLmNvbXBvc2VkLmxlbmd0aClcclxuXHRcdFx0dGhpcy5jb21wb3NlZC5mb3JFYWNoKChsaW5lcyxpKT0+e1xyXG5cdFx0XHRcdGxldCB7Ym9yZGVyLCBtYXJnaW4sc3BhY2luZ309dGhpcy5jaGlsZHJlbltpXS5nZXRTdHlsZSgpXHJcblx0XHRcdFx0XHJcblx0XHRcdFx0bGV0IGhlaWdodD1hdmFpbGFibGVTcGFjZS5oZWlnaHRcclxuXHRcdFx0XHRcdC1ib3JkZXIudG9wLnN6XHJcblx0XHRcdFx0XHQtYm9yZGVyLmJvdHRvbS5zelxyXG5cdFx0XHRcdFx0LW1hcmdpbi50b3BcclxuXHRcdFx0XHRcdC1tYXJnaW4uYm90dG9tXHJcblx0XHRcdFx0XHQtc3BhY2luZ1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0bGV0IGluZGV4PWluZGV4ZXNbaV1cclxuXHRcdFx0XHRsZXQgc3RhcnQ9aW5kZXhcclxuXHRcdFx0XHRmb3IobGV0IGxlbj1saW5lcy5sZW5ndGg7IGluZGV4PGxlbiAmJiBoZWlnaHQ+MDsgaW5kZXgrKyl7XHJcblx0XHRcdFx0XHRsZXQgbGluZT1saW5lc1tpbmRleF1cclxuXHRcdFx0XHRcdGhlaWdodC09bGluZS5wcm9wcy5oZWlnaHRcclxuXHRcdFx0XHRcdGlmKGhlaWdodDwwKXtcclxuXHRcdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRcdH1lbHNle1xyXG5cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aW5kZXhlc1tpXT1pbmRleFxyXG5cclxuXHRcdFx0XHRjdXJyZW50R3JvdXBlZExpbmVzW2ldPWxpbmVzLnNsaWNlKHN0YXJ0LGluZGV4KVxyXG5cdFx0XHR9KVxyXG5cclxuXHRcdFx0aWYoIWN1cnJlbnRHcm91cGVkTGluZXMuZmluZChhPT5hLmxlbmd0aD4wKSl7XHJcblx0XHRcdFx0Ly9hdmFpbGFibGVTcGFjZSBpcyB0b28gc21hbGwsIG5lZWQgZmluZCBhIG1pbiBhdmFpbGFibGUgc3BhY2VcclxuXHRcdFx0XHRsZXQgbWluSGVpZ2h0PWluZGV4ZXMucmVkdWNlKChwLGluZGV4LGkpPT57XHJcblx0XHRcdFx0XHRsZXQge2JvcmRlciwgbWFyZ2luLCBzcGFjaW5nfT10aGlzLmNoaWxkcmVuW2ldLmdldFN0eWxlKClcclxuXHRcdFx0XHRcdGxldCBsaW5lPXRoaXMuY29tcG9zZWRbaV1baW5kZXhdXHJcblx0XHRcdFx0XHRpZihsaW5lKXtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIE1hdGgubWF4KHAsIGxpbmUucHJvcHMuaGVpZ2h0XHJcblx0XHRcdFx0XHRcdFx0K2JvcmRlci50b3Auc3pcclxuXHRcdFx0XHRcdFx0XHQrYm9yZGVyLmJvdHRvbS5zelxyXG5cdFx0XHRcdFx0XHRcdCttYXJnaW4udG9wXHJcblx0XHRcdFx0XHRcdFx0K21hcmdpbi5ib3R0b21cclxuXHRcdFx0XHRcdFx0XHQrc3BhY2luZylcclxuXHRcdFx0XHRcdH1lbHNlXHJcblx0XHRcdFx0XHRcdHJldHVybiBwXHJcblx0XHRcdFx0fSwwKVxyXG5cdFx0XHRcdG1pblNwYWNlLmhlaWdodD1taW5IZWlnaHRcclxuXHRcdFx0fWVsc2VcclxuXHRcdFx0XHRwYXJlbnQuYXBwZW5kQ29tcG9zZWQoY3VycmVudEdyb3VwZWRMaW5lcylcclxuXHRcdFx0Ly9pZihjb3VudGVyKys+MTAwKVxyXG5cdFx0XHRcdC8vdGhyb3cgbmV3IEVycm9yKFwidGhlcmUgc2hvdWxkIGJlIGEgaW5maW5pdGUgbG9vcCBkdXJpbmcgcm93IHNwbGl0LCBwbGVhc2UgY2hlY2tcIilcclxuXHJcblxyXG5cdFx0fXdoaWxlKCFpc0FsbFNlbnQyVGFibGUoKSk7XHJcblx0XHRcclxuXHRcdHRoaXMuY29udGV4dC5wYXJlbnQuY2hpbGRyZW4ucG9wKClcclxuXHRcdHN1cGVyLm9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpXHJcblx0fVxyXG5cdFxyXG5cdHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcclxuXHRcdGNvbmRpdGlvbnM6IFByb3BUeXBlcy5hcnJheSxcclxuXHRcdHJvd1N0eWxlOiBQcm9wVHlwZXMub2JqZWN0XHJcblx0fSwgQ29udGFpbmVyLmNoaWxkQ29udGV4dFR5cGVzKVxyXG5cdFxyXG5cdGdldENoaWxkQ29udGV4dCgpe1xyXG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oc3VwZXIuZ2V0Q2hpbGRDb250ZXh0KCkse1xyXG5cdFx0XHRjb25kaXRpb25zOiB0aGlzLnByb3BzLmNvbnRlbnRTdHlsZS5nZXQoJ3Jvdy5jbmZTdHlsZScpfHxbXSxcclxuXHRcdFx0cm93U3R5bGU6IHRoaXMucHJvcHMuY29udGVudFN0eWxlXHJcblx0XHR9KVxyXG5cdH1cclxufVxyXG4iXX0=