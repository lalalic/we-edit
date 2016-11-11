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
			var _this2 = this;

			var composed = this.computed.composed;
			var targetId = content._id;

			var currentPage = composed[composed.length - 1];
			var _currentPage = currentPage,
			    columns = _currentPage.columns;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3Ivc2VjdGlvbi5qcyJdLCJuYW1lcyI6WyJwcm9wcyIsImNvbXB1dGVkIiwiY2hpbGRyZW4iLCJsZW5ndGgiLCJjb250ZW50IiwiY29tcG9zZWQiLCJ0YXJnZXRJZCIsIl9pZCIsImN1cnJlbnRQYWdlIiwiY29sdW1ucyIsImN1cnJlbnRDb2x1bW4iLCJmb3VuZCIsImZpbmRJbmRleCIsImdyb3VwIiwicG9wIiwiY29uc29sZSIsImxvZyIsImluZGV4Iiwic3BsaWNlIiwicmVtb3ZlZCIsImNvbXBvc2VkVGltZSIsIkRhdGUiLCJ0b1N0cmluZyIsImZvckVhY2giLCJhIiwiaSIsIl9jbGVhckNvbXBvc2VkNHJlQ29tcG9zZSIsInNldFN0YXRlIiwiRXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBRUE7Ozs7QUFFQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozt3Q0FHdUJBLEssRUFBTTtBQUMzQixVQUFPLDBFQUFXQSxLQUFYLElBQWtCLE9BQU8sS0FBS0MsUUFBTCxDQUFjQyxRQUFkLENBQXVCQyxNQUFoRCxJQUFQO0FBQ0E7OztpQ0FFY0MsTyxFQUFRO0FBQUE7O0FBQUEsT0FDVEMsUUFEUyxHQUNDLEtBQUtKLFFBRE4sQ0FDVEksUUFEUztBQUFBLE9BRVZDLFFBRlUsR0FFQUYsT0FGQSxDQUVmRyxHQUZlOztBQUdoQixPQUFJQyxjQUFZSCxTQUFTQSxTQUFTRixNQUFULEdBQWdCLENBQXpCLENBQWhCO0FBSGdCLHNCQUlGSyxXQUpFO0FBQUEsT0FJWEMsT0FKVyxnQkFJWEEsT0FKVzs7QUFLaEIsT0FBSUMsZ0JBQWNELFFBQVFBLFFBQVFOLE1BQVIsR0FBZSxDQUF2QixDQUFsQjtBQUNOLE9BQUlRLFFBQU0sQ0FBQyxDQUFYO0FBQ0EsVUFBTSxDQUFDLENBQUQsS0FBS0EsUUFBTUQsY0FBY1IsUUFBZCxDQUF1QlUsU0FBdkIsQ0FBaUMsaUJBQU87QUFBQztBQUN6RCxXQUFPQyxNQUFNYixLQUFOLENBQVlFLFFBQVosQ0FBcUJGLEtBQXJCLENBQTJCTyxHQUEzQixJQUFnQ0QsUUFBdkM7QUFDQSxJQUZnQixDQUFYLENBQU4sRUFFSTtBQUNIRyxZQUFRSyxHQUFSO0FBQ0EsUUFBR0wsUUFBUU4sTUFBWCxFQUFrQjtBQUNqQk8scUJBQWNELFFBQVFBLFFBQVFOLE1BQVIsR0FBZSxDQUF2QixDQUFkO0FBQ0FRLGFBQU0sQ0FBQyxDQUFQO0FBQ0EsS0FIRCxNQUdLO0FBQ0pOLGNBQVNTLEdBQVQ7QUFDQUMsYUFBUUMsR0FBUixDQUFZLG1CQUFaO0FBQ0EsU0FBR1gsU0FBU0YsTUFBWixFQUFtQjtBQUNsQkssb0JBQVlILFNBQVNBLFNBQVNGLE1BQVQsR0FBZ0IsQ0FBekIsQ0FBWjtBQURrQiwwQkFFUEssV0FGTztBQUVoQkMsYUFGZ0IsaUJBRWhCQSxPQUZnQjs7QUFHbEJDLHNCQUFjRCxRQUFRQSxRQUFRTixNQUFSLEdBQWUsQ0FBdkIsQ0FBZDtBQUNBUSxjQUFNLENBQUMsQ0FBUDtBQUNBLE1BTEQsTUFLTTtBQUNMO0FBQ0E7QUFDQTtBQUNEO0FBQ0Q7O0FBRUQsT0FBR0EsU0FBTyxDQUFDLENBQVgsRUFBYTtBQUFBO0FBQ1o7QUFDQTtBQUNBLFNBQU1NLFFBQU1QLGNBQWNSLFFBQWQsQ0FBdUJTLEtBQXZCLEVBQThCWCxLQUE5QixDQUFvQ2lCLEtBQWhEOztBQUVBUCxtQkFBY1IsUUFBZCxDQUF1QmdCLE1BQXZCLENBQThCUCxLQUE5Qjs7QUFFQSxTQUFNUSxVQUFRLE9BQUtsQixRQUFMLENBQWNDLFFBQWQsQ0FBdUJnQixNQUF2QixDQUE4QkQsS0FBOUIsQ0FBZDs7QUFFQSxTQUFNRyxlQUFhLElBQUlDLElBQUosR0FBV0MsUUFBWCxFQUFuQjs7QUFFQUgsYUFBUUksT0FBUixDQUFnQixVQUFDQyxDQUFELEVBQUdDLENBQUgsRUFBTztBQUN0QkQsUUFBRUUsd0JBQUYsQ0FBMkJELEtBQUcsQ0FBOUI7QUFDQTs7O0FBR0FELFFBQUVHLFFBQUYsQ0FBVyxFQUFDUCwwQkFBRCxFQUFYO0FBQ0EsTUFORDtBQVhZO0FBa0JaLElBbEJELE1Ba0JLO0FBQ0osVUFBTSxJQUFJUSxLQUFKLENBQVUsZ0RBQVYsQ0FBTjtBQUNBO0FBQ0Q7OztFQXZEMkIseUMiLCJmaWxlIjoic2VjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxyXG5cclxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXHJcblxyXG5pbXBvcnQge1NlY3Rpb259IGZyb20gXCIuLi9jb250ZW50XCJcclxuaW1wb3J0IGVkaXRhYmxlIGZyb20gXCIuL2VkaXRhYmxlXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgZWRpdGFibGUoU2VjdGlvbil7XHJcblx0Y3JlYXRlQ29tcG9zZWQyUGFyZW50KHByb3BzKXtcclxuXHRcdHJldHVybiA8R3JvdXAgey4uLnByb3BzfSBpbmRleD17dGhpcy5jb21wdXRlZC5jaGlsZHJlbi5sZW5ndGh9Lz5cclxuXHR9XHJcblxyXG5cdF9yZUNvbXBvc2VGcm9tKGNvbnRlbnQpe1xyXG4gICAgICAgIGNvbnN0IHtjb21wb3NlZH09dGhpcy5jb21wdXRlZFxyXG5cdFx0Y29uc3Qge19pZDogdGFyZ2V0SWR9PWNvbnRlbnRcclxuICAgICAgICBsZXQgY3VycmVudFBhZ2U9Y29tcG9zZWRbY29tcG9zZWQubGVuZ3RoLTFdXHJcbiAgICAgICAgbGV0IHtjb2x1bW5zfT1jdXJyZW50UGFnZVxyXG4gICAgICAgIGxldCBjdXJyZW50Q29sdW1uPWNvbHVtbnNbY29sdW1ucy5sZW5ndGgtMV1cclxuXHRcdGxldCBmb3VuZD0tMVxyXG5cdFx0d2hpbGUoLTE9PShmb3VuZD1jdXJyZW50Q29sdW1uLmNoaWxkcmVuLmZpbmRJbmRleChncm91cD0+ey8vZ3JvdXAvTGluZVxyXG5cdFx0XHRyZXR1cm4gZ3JvdXAucHJvcHMuY2hpbGRyZW4ucHJvcHMuX2lkPT10YXJnZXRJZFxyXG5cdFx0fSkpKXtcclxuXHRcdFx0Y29sdW1ucy5wb3AoKVxyXG5cdFx0XHRpZihjb2x1bW5zLmxlbmd0aCl7XHJcblx0XHRcdFx0Y3VycmVudENvbHVtbj1jb2x1bW5zW2NvbHVtbnMubGVuZ3RoLTFdXHJcblx0XHRcdFx0Zm91bmQ9LTFcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0Y29tcG9zZWQucG9wKClcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhcImEgcGFnZSBpcyByZW1vdmVkXCIpXHJcblx0XHRcdFx0aWYoY29tcG9zZWQubGVuZ3RoKXtcclxuXHRcdFx0XHRcdGN1cnJlbnRQYWdlPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXTtcclxuXHRcdFx0XHRcdCh7Y29sdW1uc309Y3VycmVudFBhZ2UpO1xyXG5cdFx0XHRcdFx0Y3VycmVudENvbHVtbj1jb2x1bW5zW2NvbHVtbnMubGVuZ3RoLTFdO1xyXG5cdFx0XHRcdFx0Zm91bmQ9LTFcclxuXHRcdFx0XHR9ZWxzZSB7XHJcblx0XHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdFx0Ly90aHJvdyBuZXcgRXJyb3IoXCJ5b3Ugc2hvdWxkIGZpbmQgdGhlIGxpbmUgZnJvbSBzZWN0aW9uLCBidXQgbm90XCIpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYoZm91bmQhPS0xKXtcclxuXHRcdFx0Ly93ZSBuZWVkIGtub3cgZnJvbSB3aGljaCBjaGlsZCBlYWNoIGxpbmUgY29tcG9zZXMgZnJvbSBmb3IgcmUtY29tcG9zZVxyXG5cdFx0XHQvL3RoYXQncyB3aHkgb3ZlcndyaXRlIGNyZWF0ZUNvbXBvc2VkMlBhcmVudFxyXG5cdFx0XHRjb25zdCBpbmRleD1jdXJyZW50Q29sdW1uLmNoaWxkcmVuW2ZvdW5kXS5wcm9wcy5pbmRleFxyXG5cclxuXHRcdFx0Y3VycmVudENvbHVtbi5jaGlsZHJlbi5zcGxpY2UoZm91bmQpXHJcblxyXG5cdFx0XHRjb25zdCByZW1vdmVkPXRoaXMuY29tcHV0ZWQuY2hpbGRyZW4uc3BsaWNlKGluZGV4KVxyXG5cclxuXHRcdFx0Y29uc3QgY29tcG9zZWRUaW1lPW5ldyBEYXRlKCkudG9TdHJpbmcoKVxyXG5cclxuXHRcdFx0cmVtb3ZlZC5mb3JFYWNoKChhLGkpPT57XHJcblx0XHRcdFx0YS5fY2xlYXJDb21wb3NlZDRyZUNvbXBvc2UoaT09MClcclxuXHRcdFx0XHQvKipcclxuXHRcdFx0XHQgKiAgZG8gcmUtY29tcG9zZSBqb2JcclxuXHRcdFx0XHQgKi9cclxuXHRcdFx0XHRhLnNldFN0YXRlKHtjb21wb3NlZFRpbWV9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fWVsc2V7XHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcInlvdSBzaG91bGQgZmluZCB0aGUgbGluZSBmcm9tIHNlY3Rpb24sIGJ1dCBub3RcIilcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIl19