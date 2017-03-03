"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _group = require("../composed/group");

var _group2 = _interopRequireDefault(_group);

var _content = require("../content");

var _editable2 = require("./editable");

var _editable3 = _interopRequireDefault(_editable2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_editable) {
	(0, _inherits3.default)(_class, _editable);

	function _class() {
		(0, _classCallCheck3.default)(this, _class);
		return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));
	}

	(0, _createClass3.default)(_class, [{
		key: "createComposed2Parent",
		value: function createComposed2Parent(props) {
			return _react2.default.createElement(_group2.default, (0, _extends3.default)({}, props, { index: this.computed.children.length }));
		}
	}, {
		key: "_reComposeFrom",
		value: function _reComposeFrom(content) {
			var composed = this.computed.composed;
			var targetId = content.id;

			var currentPage = composed[composed.length - 1];
			var _currentPage = currentPage,
			    columns = _currentPage.columns;

			var currentColumn = columns[columns.length - 1];
			var found = -1;
			while (-1 == (found = currentColumn.children.findIndex(function (group) {
				//group/Line
				return group.props.children.props.id == targetId;
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
				//we need know from which child each line composes from for re-compose
				//that's why overwrite createComposed2Parent
				var index = currentColumn.children[found].props.index;

				currentColumn.children.splice(found);

				var removed = this.computed.children.splice(index);

				var composedTime = new Date().toString();

				removed.forEach(function (a, i) {
					a._clearComposed4reCompose(i == 0);
					/**
      *  do re-compose job
      */
					a.setState({ composedTime: composedTime });
				});
			} else {
				throw new Error("you should find the line from section, but not");
			}
		}
	}]);
	return _class;
}((0, _editable3.default)(_content.Section));

exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3Ivc2VjdGlvbi5qcyJdLCJuYW1lcyI6WyJwcm9wcyIsImNvbXB1dGVkIiwiY2hpbGRyZW4iLCJsZW5ndGgiLCJjb250ZW50IiwiY29tcG9zZWQiLCJ0YXJnZXRJZCIsImlkIiwiY3VycmVudFBhZ2UiLCJjb2x1bW5zIiwiY3VycmVudENvbHVtbiIsImZvdW5kIiwiZmluZEluZGV4IiwiZ3JvdXAiLCJwb3AiLCJjb25zb2xlIiwibG9nIiwiaW5kZXgiLCJzcGxpY2UiLCJyZW1vdmVkIiwiY29tcG9zZWRUaW1lIiwiRGF0ZSIsInRvU3RyaW5nIiwiZm9yRWFjaCIsImEiLCJpIiwiX2NsZWFyQ29tcG9zZWQ0cmVDb21wb3NlIiwic2V0U3RhdGUiLCJFcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7OztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O3dDQUd1QkEsSyxFQUFNO0FBQzNCLFVBQU8sMEVBQVdBLEtBQVgsSUFBa0IsT0FBTyxLQUFLQyxRQUFMLENBQWNDLFFBQWQsQ0FBdUJDLE1BQWhELElBQVA7QUFDQTs7O2lDQUVjQyxPLEVBQVE7QUFBQSxPQUNUQyxRQURTLEdBQ0MsS0FBS0osUUFETixDQUNUSSxRQURTO0FBQUEsT0FFWEMsUUFGVyxHQUVERixPQUZDLENBRWZHLEVBRmU7O0FBR2hCLE9BQUlDLGNBQVlILFNBQVNBLFNBQVNGLE1BQVQsR0FBZ0IsQ0FBekIsQ0FBaEI7QUFIZ0Isc0JBSUZLLFdBSkU7QUFBQSxPQUlYQyxPQUpXLGdCQUlYQSxPQUpXOztBQUtoQixPQUFJQyxnQkFBY0QsUUFBUUEsUUFBUU4sTUFBUixHQUFlLENBQXZCLENBQWxCO0FBQ04sT0FBSVEsUUFBTSxDQUFDLENBQVg7QUFDQSxVQUFNLENBQUMsQ0FBRCxLQUFLQSxRQUFNRCxjQUFjUixRQUFkLENBQXVCVSxTQUF2QixDQUFpQyxpQkFBTztBQUFDO0FBQ3pELFdBQU9DLE1BQU1iLEtBQU4sQ0FBWUUsUUFBWixDQUFxQkYsS0FBckIsQ0FBMkJPLEVBQTNCLElBQStCRCxRQUF0QztBQUNBLElBRmdCLENBQVgsQ0FBTixFQUVJO0FBQ0hHLFlBQVFLLEdBQVI7QUFDQSxRQUFHTCxRQUFRTixNQUFYLEVBQWtCO0FBQ2pCTyxxQkFBY0QsUUFBUUEsUUFBUU4sTUFBUixHQUFlLENBQXZCLENBQWQ7QUFDQVEsYUFBTSxDQUFDLENBQVA7QUFDQSxLQUhELE1BR0s7QUFDSk4sY0FBU1MsR0FBVDtBQUNBQyxhQUFRQyxHQUFSLENBQVksbUJBQVo7QUFDQSxTQUFHWCxTQUFTRixNQUFaLEVBQW1CO0FBQ2xCSyxvQkFBWUgsU0FBU0EsU0FBU0YsTUFBVCxHQUFnQixDQUF6QixDQUFaO0FBRGtCLDBCQUVQSyxXQUZPO0FBRWhCQyxhQUZnQixpQkFFaEJBLE9BRmdCOztBQUdsQkMsc0JBQWNELFFBQVFBLFFBQVFOLE1BQVIsR0FBZSxDQUF2QixDQUFkO0FBQ0FRLGNBQU0sQ0FBQyxDQUFQO0FBQ0EsTUFMRCxNQUtNO0FBQ0w7QUFDQTtBQUNBO0FBQ0Q7QUFDRDs7QUFFRCxPQUFHQSxTQUFPLENBQUMsQ0FBWCxFQUFhO0FBQ1o7QUFDQTtBQUNBLFFBQU1NLFFBQU1QLGNBQWNSLFFBQWQsQ0FBdUJTLEtBQXZCLEVBQThCWCxLQUE5QixDQUFvQ2lCLEtBQWhEOztBQUVBUCxrQkFBY1IsUUFBZCxDQUF1QmdCLE1BQXZCLENBQThCUCxLQUE5Qjs7QUFFQSxRQUFNUSxVQUFRLEtBQUtsQixRQUFMLENBQWNDLFFBQWQsQ0FBdUJnQixNQUF2QixDQUE4QkQsS0FBOUIsQ0FBZDs7QUFFQSxRQUFNRyxlQUFhLElBQUlDLElBQUosR0FBV0MsUUFBWCxFQUFuQjs7QUFFQUgsWUFBUUksT0FBUixDQUFnQixVQUFDQyxDQUFELEVBQUdDLENBQUgsRUFBTztBQUN0QkQsT0FBRUUsd0JBQUYsQ0FBMkJELEtBQUcsQ0FBOUI7QUFDQTs7O0FBR0FELE9BQUVHLFFBQUYsQ0FBVyxFQUFDUCwwQkFBRCxFQUFYO0FBQ0EsS0FORDtBQU9BLElBbEJELE1Ba0JLO0FBQ0osVUFBTSxJQUFJUSxLQUFKLENBQVUsZ0RBQVYsQ0FBTjtBQUNBO0FBQ0Q7OztFQXZEMkIseUMiLCJmaWxlIjoic2VjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxyXG5cclxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXHJcblxyXG5pbXBvcnQge1NlY3Rpb259IGZyb20gXCIuLi9jb250ZW50XCJcclxuaW1wb3J0IGVkaXRhYmxlIGZyb20gXCIuL2VkaXRhYmxlXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgZWRpdGFibGUoU2VjdGlvbil7XHJcblx0Y3JlYXRlQ29tcG9zZWQyUGFyZW50KHByb3BzKXtcclxuXHRcdHJldHVybiA8R3JvdXAgey4uLnByb3BzfSBpbmRleD17dGhpcy5jb21wdXRlZC5jaGlsZHJlbi5sZW5ndGh9Lz5cclxuXHR9XHJcblxyXG5cdF9yZUNvbXBvc2VGcm9tKGNvbnRlbnQpe1xyXG4gICAgICAgIGNvbnN0IHtjb21wb3NlZH09dGhpcy5jb21wdXRlZFxyXG5cdFx0Y29uc3Qge2lkOiB0YXJnZXRJZH09Y29udGVudFxyXG4gICAgICAgIGxldCBjdXJyZW50UGFnZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cclxuICAgICAgICBsZXQge2NvbHVtbnN9PWN1cnJlbnRQYWdlXHJcbiAgICAgICAgbGV0IGN1cnJlbnRDb2x1bW49Y29sdW1uc1tjb2x1bW5zLmxlbmd0aC0xXVxyXG5cdFx0bGV0IGZvdW5kPS0xXHJcblx0XHR3aGlsZSgtMT09KGZvdW5kPWN1cnJlbnRDb2x1bW4uY2hpbGRyZW4uZmluZEluZGV4KGdyb3VwPT57Ly9ncm91cC9MaW5lXHJcblx0XHRcdHJldHVybiBncm91cC5wcm9wcy5jaGlsZHJlbi5wcm9wcy5pZD09dGFyZ2V0SWRcclxuXHRcdH0pKSl7XHJcblx0XHRcdGNvbHVtbnMucG9wKClcclxuXHRcdFx0aWYoY29sdW1ucy5sZW5ndGgpe1xyXG5cdFx0XHRcdGN1cnJlbnRDb2x1bW49Y29sdW1uc1tjb2x1bW5zLmxlbmd0aC0xXVxyXG5cdFx0XHRcdGZvdW5kPS0xXHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdGNvbXBvc2VkLnBvcCgpXHJcblx0XHRcdFx0Y29uc29sZS5sb2coXCJhIHBhZ2UgaXMgcmVtb3ZlZFwiKVxyXG5cdFx0XHRcdGlmKGNvbXBvc2VkLmxlbmd0aCl7XHJcblx0XHRcdFx0XHRjdXJyZW50UGFnZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV07XHJcblx0XHRcdFx0XHQoe2NvbHVtbnN9PWN1cnJlbnRQYWdlKTtcclxuXHRcdFx0XHRcdGN1cnJlbnRDb2x1bW49Y29sdW1uc1tjb2x1bW5zLmxlbmd0aC0xXTtcclxuXHRcdFx0XHRcdGZvdW5kPS0xXHJcblx0XHRcdFx0fWVsc2Uge1xyXG5cdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRcdC8vdGhyb3cgbmV3IEVycm9yKFwieW91IHNob3VsZCBmaW5kIHRoZSBsaW5lIGZyb20gc2VjdGlvbiwgYnV0IG5vdFwiKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmKGZvdW5kIT0tMSl7XHJcblx0XHRcdC8vd2UgbmVlZCBrbm93IGZyb20gd2hpY2ggY2hpbGQgZWFjaCBsaW5lIGNvbXBvc2VzIGZyb20gZm9yIHJlLWNvbXBvc2VcclxuXHRcdFx0Ly90aGF0J3Mgd2h5IG92ZXJ3cml0ZSBjcmVhdGVDb21wb3NlZDJQYXJlbnRcclxuXHRcdFx0Y29uc3QgaW5kZXg9Y3VycmVudENvbHVtbi5jaGlsZHJlbltmb3VuZF0ucHJvcHMuaW5kZXhcclxuXHJcblx0XHRcdGN1cnJlbnRDb2x1bW4uY2hpbGRyZW4uc3BsaWNlKGZvdW5kKVxyXG5cclxuXHRcdFx0Y29uc3QgcmVtb3ZlZD10aGlzLmNvbXB1dGVkLmNoaWxkcmVuLnNwbGljZShpbmRleClcclxuXHJcblx0XHRcdGNvbnN0IGNvbXBvc2VkVGltZT1uZXcgRGF0ZSgpLnRvU3RyaW5nKClcclxuXHJcblx0XHRcdHJlbW92ZWQuZm9yRWFjaCgoYSxpKT0+e1xyXG5cdFx0XHRcdGEuX2NsZWFyQ29tcG9zZWQ0cmVDb21wb3NlKGk9PTApXHJcblx0XHRcdFx0LyoqXHJcblx0XHRcdFx0ICogIGRvIHJlLWNvbXBvc2Ugam9iXHJcblx0XHRcdFx0ICovXHJcblx0XHRcdFx0YS5zZXRTdGF0ZSh7Y29tcG9zZWRUaW1lfSlcclxuXHRcdFx0fSlcclxuXHRcdH1lbHNle1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJ5b3Ugc2hvdWxkIGZpbmQgdGhlIGxpbmUgZnJvbSBzZWN0aW9uLCBidXQgbm90XCIpXHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiJdfQ==