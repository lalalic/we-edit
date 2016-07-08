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
					var height = availableSpace.height;
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
						var line = _this2.composed[i][index];
						if (line) {
							return Math.max(p, line.props.height);
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
		}
	}]);

	return Row;
}(_container2.default);

Row.displayName = "row";
exports.default = Row;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3Jvdy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7O3VDQUVBO09BQ1osT0FBTSxLQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLEtBQXBCLENBQU4sS0FEWTs7QUFFbkIsVUFBTyxFQUFDLE9BQU0sS0FBSyxLQUFLLFFBQUwsQ0FBYyxNQUFkLENBQVgsRUFBa0MsUUFBTyxPQUFPLFNBQVAsRUFBakQsQ0FGbUI7Ozs7NEJBS1g7QUFDUiw4QkFSbUIsMkNBUW5CLENBRFE7QUFFUixRQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW1CLEVBQW5CLEVBRlE7Ozs7aUNBS00sTUFBSztBQUNuQixPQUFNLGNBQVksS0FBSyxRQUFMLENBQWMsS0FBSyxRQUFMLENBQWMsTUFBZCxHQUFxQixDQUFyQixDQUExQixDQURhO0FBRW5CLGVBQVksSUFBWixDQUFpQixJQUFqQixFQUZtQjs7OztxQ0FLRjtBQUNqQixRQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW1CLEVBQW5CLEVBRGlCO0FBRWpCLDhCQW5CbUIsc0RBbUJPLFVBQTFCLENBRmlCOzs7OzBDQUtLOzs7QUFDdEIsV0FBUSxJQUFSLENBQWEsa0JBQWIsRUFEc0I7QUFFdEIsUUFBSyxRQUFMLENBQWMsR0FBZCxHQUZzQjtPQUdmLFNBQVEsS0FBSyxPQUFMLENBQVIsT0FIZTs7QUFJdEIsT0FBSSxVQUFRLElBQUksS0FBSixDQUFVLEtBQUssUUFBTCxDQUFjLE1BQWQsQ0FBbEIsQ0FKa0I7QUFLdEIsV0FBUSxJQUFSLENBQWEsQ0FBYixFQUxzQjs7QUFPdEIsT0FBSSxrQkFBZ0IsU0FBaEIsZUFBZ0I7V0FBRyxRQUFRLE1BQVIsQ0FBZSxVQUFDLElBQUQsRUFBTSxLQUFOLEVBQWEsQ0FBYjtZQUFpQixPQUFLLFFBQUwsQ0FBYyxDQUFkLEVBQWlCLE1BQWpCLElBQXlCLEtBQXpCLElBQWtDLElBQWxDO0tBQWpCLEVBQXlELElBQXhFO0lBQUgsQ0FQRTs7QUFTdEIsT0FBSSxVQUFRLENBQVIsQ0FUa0I7QUFVdEIsT0FBSSxXQUFTLEVBQVQsQ0FWa0I7OztBQVlyQixRQUFJLGlCQUFlLE9BQU8sa0JBQVAsQ0FBMEIsUUFBMUIsQ0FBZjtBQUNKLFFBQUksc0JBQW9CLElBQUksS0FBSixDQUFVLE9BQUssUUFBTCxDQUFjLE1BQWQsQ0FBOUI7QUFDSixXQUFLLFFBQUwsQ0FBYyxPQUFkLENBQXNCLFVBQUMsS0FBRCxFQUFPLENBQVAsRUFBVztBQUNoQyxTQUFJLFNBQU8sZUFBZSxNQUFmLENBRHFCO0FBRWhDLFNBQUksUUFBTSxRQUFRLENBQVIsQ0FBTixDQUY0QjtBQUdoQyxTQUFJLFFBQU0sS0FBTixDQUg0QjtBQUloQyxVQUFJLElBQUksTUFBSSxNQUFNLE1BQU4sRUFBYyxRQUFNLEdBQU4sSUFBYSxTQUFPLENBQVAsRUFBVSxPQUFqRCxFQUF5RDtBQUN4RCxVQUFJLE9BQUssTUFBTSxLQUFOLENBQUwsQ0FEb0Q7QUFFeEQsZ0JBQVEsS0FBSyxLQUFMLENBQVcsTUFBWCxDQUZnRDtBQUd4RCxVQUFHLFNBQU8sQ0FBUCxFQUFTO0FBQ1gsYUFEVztPQUFaLE1BRUssRUFGTDtNQUhEO0FBU0EsYUFBUSxDQUFSLElBQVcsS0FBWCxDQWJnQzs7QUFlaEMseUJBQW9CLENBQXBCLElBQXVCLE1BQU0sS0FBTixDQUFZLEtBQVosRUFBa0IsS0FBbEIsQ0FBdkIsQ0FmZ0M7S0FBWCxDQUF0Qjs7QUFrQkEsUUFBRyxDQUFDLG9CQUFvQixJQUFwQixDQUF5QjtZQUFHLEVBQUUsTUFBRixHQUFTLENBQVQ7S0FBSCxDQUExQixFQUF5Qzs7QUFFM0MsU0FBSSxZQUFVLFFBQVEsTUFBUixDQUFlLFVBQUMsQ0FBRCxFQUFHLEtBQUgsRUFBUyxDQUFULEVBQWE7QUFDekMsVUFBSSxPQUFLLE9BQUssUUFBTCxDQUFjLENBQWQsRUFBaUIsS0FBakIsQ0FBTCxDQURxQztBQUV6QyxVQUFHLElBQUgsRUFBUTtBQUNQLGNBQU8sS0FBSyxHQUFMLENBQVMsQ0FBVCxFQUFZLEtBQUssS0FBTCxDQUFXLE1BQVgsQ0FBbkIsQ0FETztPQUFSLE1BR0MsT0FBTyxDQUFQLENBSEQ7TUFGNEIsRUFNM0IsQ0FOWSxDQUFWLENBRnVDO0FBUzNDLGNBQVMsTUFBVCxHQUFnQixTQUFoQixDQVQyQztLQUE1QyxNQVdDLE9BQU8sY0FBUCxDQUFzQixtQkFBdEIsRUFYRDs7O0tBaENxQjs7QUFXdEIsTUFBRTs7SUFBRixRQXFDTyxDQUFDLGlCQUFELEVBaERlOzs7O1FBdEJIOzs7SUFDYixjQUFZO2tCQURDIiwiZmlsZSI6InJvdy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuXHJcbmltcG9ydCBDb250YWluZXIgZnJvbSBcIi4vY29udGFpbmVyXCJcclxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb3cgZXh0ZW5kcyBDb250YWluZXJ7XHJcblx0c3RhdGljIGRpc3BsYXlOYW1lPVwicm93XCJcclxuXHRuZXh0QXZhaWxhYmxlU3BhY2UoKXtcclxuXHRcdGNvbnN0IHtjb2xzfT10aGlzLmNvbnRleHQucGFyZW50LnByb3BzXHJcblx0XHRyZXR1cm4ge3dpZHRoOmNvbHNbdGhpcy5jaGlsZHJlbi5sZW5ndGhdLCBoZWlnaHQ6TnVtYmVyLk1BWF9WQUxVRX1cclxuXHR9XHJcblxyXG5cdGNvbXBvc2UoKXtcclxuXHRcdHN1cGVyLmNvbXBvc2UoKVxyXG5cdFx0dGhpcy5jb21wb3NlZC5wdXNoKFtdKVxyXG5cdH1cclxuXHJcblx0YXBwZW5kQ29tcG9zZWQobGluZSl7XHJcblx0XHRjb25zdCBjdXJyZW50Q2VsbD10aGlzLmNvbXBvc2VkW3RoaXMuY29tcG9zZWQubGVuZ3RoLTFdXHJcblx0XHRjdXJyZW50Q2VsbC5wdXNoKGxpbmUpXHJcblx0fVxyXG5cclxuXHRvbjFDaGlsZENvbXBvc2VkKCl7XHJcblx0XHR0aGlzLmNvbXBvc2VkLnB1c2goW10pXHJcblx0XHRzdXBlci5vbjFDaGlsZENvbXBvc2VkKC4uLmFyZ3VtZW50cylcclxuXHR9XHJcblxyXG5cdG9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpe1xyXG5cdFx0Y29uc29sZS53YXJuKFwib25lIHJvdyBjb21wb3NlZFwiKVxyXG5cdFx0dGhpcy5jb21wb3NlZC5wb3AoKVxyXG5cdFx0Y29uc3Qge3BhcmVudH09dGhpcy5jb250ZXh0XHJcblx0XHRsZXQgaW5kZXhlcz1uZXcgQXJyYXkodGhpcy5jb21wb3NlZC5sZW5ndGgpXHJcblx0XHRpbmRleGVzLmZpbGwoMClcclxuXHJcblx0XHRsZXQgaXNBbGxTZW50MlRhYmxlPWE9PmluZGV4ZXMucmVkdWNlKChwcmV2LGluZGV4LCBpKT0+dGhpcy5jb21wb3NlZFtpXS5sZW5ndGg9PWluZGV4ICYmIHByZXYsIHRydWUpXHJcblxyXG5cdFx0bGV0IGNvdW50ZXI9MFxyXG5cdFx0bGV0IG1pblNwYWNlPXt9XHJcblx0XHRkb3tcclxuXHRcdFx0bGV0IGF2YWlsYWJsZVNwYWNlPXBhcmVudC5uZXh0QXZhaWxhYmxlU3BhY2UobWluU3BhY2UpXHJcblx0XHRcdGxldCBjdXJyZW50R3JvdXBlZExpbmVzPW5ldyBBcnJheSh0aGlzLmNvbXBvc2VkLmxlbmd0aClcclxuXHRcdFx0dGhpcy5jb21wb3NlZC5mb3JFYWNoKChsaW5lcyxpKT0+e1xyXG5cdFx0XHRcdGxldCBoZWlnaHQ9YXZhaWxhYmxlU3BhY2UuaGVpZ2h0XHJcblx0XHRcdFx0bGV0IGluZGV4PWluZGV4ZXNbaV1cclxuXHRcdFx0XHRsZXQgc3RhcnQ9aW5kZXhcclxuXHRcdFx0XHRmb3IobGV0IGxlbj1saW5lcy5sZW5ndGg7IGluZGV4PGxlbiAmJiBoZWlnaHQ+MDsgaW5kZXgrKyl7XHJcblx0XHRcdFx0XHRsZXQgbGluZT1saW5lc1tpbmRleF1cclxuXHRcdFx0XHRcdGhlaWdodC09bGluZS5wcm9wcy5oZWlnaHRcclxuXHRcdFx0XHRcdGlmKGhlaWdodDwwKXtcclxuXHRcdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRcdH1lbHNle1xyXG5cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aW5kZXhlc1tpXT1pbmRleFxyXG5cclxuXHRcdFx0XHRjdXJyZW50R3JvdXBlZExpbmVzW2ldPWxpbmVzLnNsaWNlKHN0YXJ0LGluZGV4KVxyXG5cdFx0XHR9KVxyXG5cclxuXHRcdFx0aWYoIWN1cnJlbnRHcm91cGVkTGluZXMuZmluZChhPT5hLmxlbmd0aD4wKSl7XHJcblx0XHRcdFx0Ly9hdmFpbGFibGVTcGFjZSBpcyB0b28gc21hbGwsIG5lZWQgZmluZCBhIG1pbiBhdmFpbGFibGUgc3BhY2VcclxuXHRcdFx0XHRsZXQgbWluSGVpZ2h0PWluZGV4ZXMucmVkdWNlKChwLGluZGV4LGkpPT57XHJcblx0XHRcdFx0XHRsZXQgbGluZT10aGlzLmNvbXBvc2VkW2ldW2luZGV4XVxyXG5cdFx0XHRcdFx0aWYobGluZSl7XHJcblx0XHRcdFx0XHRcdHJldHVybiBNYXRoLm1heChwLCBsaW5lLnByb3BzLmhlaWdodClcclxuXHRcdFx0XHRcdH1lbHNlXHJcblx0XHRcdFx0XHRcdHJldHVybiBwXHJcblx0XHRcdFx0fSwwKVxyXG5cdFx0XHRcdG1pblNwYWNlLmhlaWdodD1taW5IZWlnaHRcclxuXHRcdFx0fWVsc2VcclxuXHRcdFx0XHRwYXJlbnQuYXBwZW5kQ29tcG9zZWQoY3VycmVudEdyb3VwZWRMaW5lcylcclxuXHRcdFx0Ly9pZihjb3VudGVyKys+MTAwKVxyXG5cdFx0XHRcdC8vdGhyb3cgbmV3IEVycm9yKFwidGhlcmUgc2hvdWxkIGJlIGEgaW5maW5pdGUgbG9vcCBkdXJpbmcgcm93IHNwbGl0LCBwbGVhc2UgY2hlY2tcIilcclxuXHJcblxyXG5cdFx0fXdoaWxlKCFpc0FsbFNlbnQyVGFibGUoKSlcclxuXHR9XHJcbn1cclxuIl19