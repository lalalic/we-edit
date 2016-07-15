"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _group = require("../composed/group");

var _group2 = _interopRequireDefault(_group);

var _content = require("../content");

var _editable2 = require("./editable");

var _editable3 = _interopRequireDefault(_editable2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_editable) {
	_inherits(_class, _editable);

	function _class() {
		_classCallCheck(this, _class);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
	}

	_createClass(_class, [{
		key: "createComposed2Parent",
		value: function createComposed2Parent(props) {
			return _react2.default.createElement(_group2.default, _extends({}, props, { index: this.computed.children.length }));
		}
	}, {
		key: "_reComposeFrom",
		value: function _reComposeFrom(content) {
			var _this2 = this;

			var composed = this.computed.composed;
			var targetId = content._id;

			var currentPage = composed[composed.length - 1];
			var _currentPage = currentPage;
			var columns = _currentPage.columns;

			var currentColumn = columns[columns.length - 1];
			var found = -1;
			while (-1 == (found = currentColumn.children.findIndex(function (group) {
				//group/Line
				return group.props.children.props._id == targetId;
			}))) {
				columns.pop();
				if (columns.length) {
					currentColumn = columns[columns.length - 1];
					found = -1;
				} else {
					composed.pop();
					console.log("a page is removed");
					if (composed.length) {
						currentPage = composed[composed.length - 1];
						var _currentPage2 = currentPage;
						columns = _currentPage2.columns;

						currentColumn = columns[columns.length - 1];
						found = -1;
					} else {
						break;
						//throw new Error("you should find the line from section, but not")
					}
				}
			}

			if (found != -1) {
				(function () {
					//we need know from which child each line composes from for re-compose
					//that's why overwrite createComposed2Parent
					var index = currentColumn.children[found].props.index;

					currentColumn.children.splice(found);

					var removed = _this2.computed.children.splice(index);

					var composedTime = new Date().toString();

					removed.forEach(function (a, i) {
						a._clearComposed4reCompose(i == 0);
						/**
       *  do re-compose job
       */
						a.setState({ composedTime: composedTime });
					});
				})();
			} else {
				throw new Error("you should find the line from section, but not");
			}
		}
	}]);

	return _class;
}((0, _editable3.default)(_content.Section));

exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3Ivc2VjdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7OztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt3Q0FHdUIsT0FBTTtBQUMzQixVQUFPLDREQUFXLFNBQU8sT0FBTyxLQUFLLFFBQUwsQ0FBYyxRQUFkLENBQXVCLE1BQXZCLEdBQXpCLENBQVAsQ0FEMkI7Ozs7aUNBSWIsU0FBUTs7O09BQ1QsV0FBVSxLQUFLLFFBQUwsQ0FBVixTQURTO09BRVYsV0FBVSxRQUFmLElBRmU7O0FBR2hCLE9BQUksY0FBWSxTQUFTLFNBQVMsTUFBVCxHQUFnQixDQUFoQixDQUFyQixDQUhZO3NCQUlGLFlBSkU7T0FJWCwrQkFKVzs7QUFLaEIsT0FBSSxnQkFBYyxRQUFRLFFBQVEsTUFBUixHQUFlLENBQWYsQ0FBdEIsQ0FMWTtBQU10QixPQUFJLFFBQU0sQ0FBQyxDQUFELENBTlk7QUFPdEIsVUFBTSxDQUFDLENBQUQsS0FBSyxRQUFNLGNBQWMsUUFBZCxDQUF1QixTQUF2QixDQUFpQyxpQkFBTzs7QUFDeEQsV0FBTyxNQUFNLEtBQU4sQ0FBWSxRQUFaLENBQXFCLEtBQXJCLENBQTJCLEdBQTNCLElBQWdDLFFBQWhDLENBRGlEO0lBQVAsQ0FBdkMsQ0FBTCxFQUVGO0FBQ0gsWUFBUSxHQUFSLEdBREc7QUFFSCxRQUFHLFFBQVEsTUFBUixFQUFlO0FBQ2pCLHFCQUFjLFFBQVEsUUFBUSxNQUFSLEdBQWUsQ0FBZixDQUF0QixDQURpQjtBQUVqQixhQUFNLENBQUMsQ0FBRCxDQUZXO0tBQWxCLE1BR0s7QUFDSixjQUFTLEdBQVQsR0FESTtBQUVKLGFBQVEsR0FBUixDQUFZLG1CQUFaLEVBRkk7QUFHSixTQUFHLFNBQVMsTUFBVCxFQUFnQjtBQUNsQixvQkFBWSxTQUFTLFNBQVMsTUFBVCxHQUFnQixDQUFoQixDQUFyQixDQURrQjswQkFFUCxZQUZPO0FBRWhCLHNDQUZnQjs7QUFHbEIsc0JBQWMsUUFBUSxRQUFRLE1BQVIsR0FBZSxDQUFmLENBQXRCLENBSGtCO0FBSWxCLGNBQU0sQ0FBQyxDQUFELENBSlk7TUFBbkIsTUFLTTtBQUNMOztBQURLLE1BTE47S0FORDtJQUpEOztBQXNCQSxPQUFHLFNBQU8sQ0FBQyxDQUFELEVBQUc7Ozs7QUFHWixTQUFNLFFBQU0sY0FBYyxRQUFkLENBQXVCLEtBQXZCLEVBQThCLEtBQTlCLENBQW9DLEtBQXBDOztBQUVaLG1CQUFjLFFBQWQsQ0FBdUIsTUFBdkIsQ0FBOEIsS0FBOUI7O0FBRUEsU0FBTSxVQUFRLE9BQUssUUFBTCxDQUFjLFFBQWQsQ0FBdUIsTUFBdkIsQ0FBOEIsS0FBOUIsQ0FBUjs7QUFFTixTQUFNLGVBQWEsSUFBSSxJQUFKLEdBQVcsUUFBWCxFQUFiOztBQUVOLGFBQVEsT0FBUixDQUFnQixVQUFDLENBQUQsRUFBRyxDQUFILEVBQU87QUFDdEIsUUFBRSx3QkFBRixDQUEyQixLQUFHLENBQUgsQ0FBM0I7Ozs7QUFEc0IsT0FLdEIsQ0FBRSxRQUFGLENBQVcsRUFBQywwQkFBRCxFQUFYLEVBTHNCO01BQVAsQ0FBaEI7U0FYWTtJQUFiLE1Ba0JLO0FBQ0osVUFBTSxJQUFJLEtBQUosQ0FBVSxnREFBVixDQUFOLENBREk7SUFsQkw7Ozs7O0VBbEMyQiIsImZpbGUiOiJzZWN0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiXG5cbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZWQvZ3JvdXBcIlxuXG5pbXBvcnQge1NlY3Rpb259IGZyb20gXCIuLi9jb250ZW50XCJcbmltcG9ydCBlZGl0YWJsZSBmcm9tIFwiLi9lZGl0YWJsZVwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgZWRpdGFibGUoU2VjdGlvbil7XG5cdGNyZWF0ZUNvbXBvc2VkMlBhcmVudChwcm9wcyl7XG5cdFx0cmV0dXJuIDxHcm91cCB7Li4ucHJvcHN9IGluZGV4PXt0aGlzLmNvbXB1dGVkLmNoaWxkcmVuLmxlbmd0aH0vPlxuXHR9XG5cblx0X3JlQ29tcG9zZUZyb20oY29udGVudCl7XG4gICAgICAgIGNvbnN0IHtjb21wb3NlZH09dGhpcy5jb21wdXRlZFxuXHRcdGNvbnN0IHtfaWQ6IHRhcmdldElkfT1jb250ZW50XG4gICAgICAgIGxldCBjdXJyZW50UGFnZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cbiAgICAgICAgbGV0IHtjb2x1bW5zfT1jdXJyZW50UGFnZVxuICAgICAgICBsZXQgY3VycmVudENvbHVtbj1jb2x1bW5zW2NvbHVtbnMubGVuZ3RoLTFdXG5cdFx0bGV0IGZvdW5kPS0xXG5cdFx0d2hpbGUoLTE9PShmb3VuZD1jdXJyZW50Q29sdW1uLmNoaWxkcmVuLmZpbmRJbmRleChncm91cD0+ey8vZ3JvdXAvTGluZVxuXHRcdFx0cmV0dXJuIGdyb3VwLnByb3BzLmNoaWxkcmVuLnByb3BzLl9pZD09dGFyZ2V0SWRcblx0XHR9KSkpe1xuXHRcdFx0Y29sdW1ucy5wb3AoKVxuXHRcdFx0aWYoY29sdW1ucy5sZW5ndGgpe1xuXHRcdFx0XHRjdXJyZW50Q29sdW1uPWNvbHVtbnNbY29sdW1ucy5sZW5ndGgtMV1cblx0XHRcdFx0Zm91bmQ9LTFcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRjb21wb3NlZC5wb3AoKVxuXHRcdFx0XHRjb25zb2xlLmxvZyhcImEgcGFnZSBpcyByZW1vdmVkXCIpXG5cdFx0XHRcdGlmKGNvbXBvc2VkLmxlbmd0aCl7XG5cdFx0XHRcdFx0Y3VycmVudFBhZ2U9Y29tcG9zZWRbY29tcG9zZWQubGVuZ3RoLTFdO1xuXHRcdFx0XHRcdCh7Y29sdW1uc309Y3VycmVudFBhZ2UpO1xuXHRcdFx0XHRcdGN1cnJlbnRDb2x1bW49Y29sdW1uc1tjb2x1bW5zLmxlbmd0aC0xXTtcblx0XHRcdFx0XHRmb3VuZD0tMVxuXHRcdFx0XHR9ZWxzZSB7XG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHQvL3Rocm93IG5ldyBFcnJvcihcInlvdSBzaG91bGQgZmluZCB0aGUgbGluZSBmcm9tIHNlY3Rpb24sIGJ1dCBub3RcIilcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmKGZvdW5kIT0tMSl7XG5cdFx0XHQvL3dlIG5lZWQga25vdyBmcm9tIHdoaWNoIGNoaWxkIGVhY2ggbGluZSBjb21wb3NlcyBmcm9tIGZvciByZS1jb21wb3NlXG5cdFx0XHQvL3RoYXQncyB3aHkgb3ZlcndyaXRlIGNyZWF0ZUNvbXBvc2VkMlBhcmVudFxuXHRcdFx0Y29uc3QgaW5kZXg9Y3VycmVudENvbHVtbi5jaGlsZHJlbltmb3VuZF0ucHJvcHMuaW5kZXhcblxuXHRcdFx0Y3VycmVudENvbHVtbi5jaGlsZHJlbi5zcGxpY2UoZm91bmQpXG5cblx0XHRcdGNvbnN0IHJlbW92ZWQ9dGhpcy5jb21wdXRlZC5jaGlsZHJlbi5zcGxpY2UoaW5kZXgpXG5cblx0XHRcdGNvbnN0IGNvbXBvc2VkVGltZT1uZXcgRGF0ZSgpLnRvU3RyaW5nKClcblxuXHRcdFx0cmVtb3ZlZC5mb3JFYWNoKChhLGkpPT57XG5cdFx0XHRcdGEuX2NsZWFyQ29tcG9zZWQ0cmVDb21wb3NlKGk9PTApXG5cdFx0XHRcdC8qKlxuXHRcdFx0XHQgKiAgZG8gcmUtY29tcG9zZSBqb2Jcblx0XHRcdFx0ICovXG5cdFx0XHRcdGEuc2V0U3RhdGUoe2NvbXBvc2VkVGltZX0pXG5cdFx0XHR9KVxuXHRcdH1lbHNle1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwieW91IHNob3VsZCBmaW5kIHRoZSBsaW5lIGZyb20gc2VjdGlvbiwgYnV0IG5vdFwiKVxuXHRcdH1cblx0fVxufVxuIl19