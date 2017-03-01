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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3Ivc2VjdGlvbi5qcyJdLCJuYW1lcyI6WyJwcm9wcyIsImNvbXB1dGVkIiwiY2hpbGRyZW4iLCJsZW5ndGgiLCJjb250ZW50IiwiY29tcG9zZWQiLCJ0YXJnZXRJZCIsIl9pZCIsImN1cnJlbnRQYWdlIiwiY29sdW1ucyIsImN1cnJlbnRDb2x1bW4iLCJmb3VuZCIsImZpbmRJbmRleCIsImdyb3VwIiwicG9wIiwiY29uc29sZSIsImxvZyIsImluZGV4Iiwic3BsaWNlIiwicmVtb3ZlZCIsImNvbXBvc2VkVGltZSIsIkRhdGUiLCJ0b1N0cmluZyIsImZvckVhY2giLCJhIiwiaSIsIl9jbGVhckNvbXBvc2VkNHJlQ29tcG9zZSIsInNldFN0YXRlIiwiRXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBRUE7Ozs7QUFFQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozt3Q0FHdUJBLEssRUFBTTtBQUMzQixVQUFPLDBFQUFXQSxLQUFYLElBQWtCLE9BQU8sS0FBS0MsUUFBTCxDQUFjQyxRQUFkLENBQXVCQyxNQUFoRCxJQUFQO0FBQ0E7OztpQ0FFY0MsTyxFQUFRO0FBQUEsT0FDVEMsUUFEUyxHQUNDLEtBQUtKLFFBRE4sQ0FDVEksUUFEUztBQUFBLE9BRVZDLFFBRlUsR0FFQUYsT0FGQSxDQUVmRyxHQUZlOztBQUdoQixPQUFJQyxjQUFZSCxTQUFTQSxTQUFTRixNQUFULEdBQWdCLENBQXpCLENBQWhCO0FBSGdCLHNCQUlGSyxXQUpFO0FBQUEsT0FJWEMsT0FKVyxnQkFJWEEsT0FKVzs7QUFLaEIsT0FBSUMsZ0JBQWNELFFBQVFBLFFBQVFOLE1BQVIsR0FBZSxDQUF2QixDQUFsQjtBQUNOLE9BQUlRLFFBQU0sQ0FBQyxDQUFYO0FBQ0EsVUFBTSxDQUFDLENBQUQsS0FBS0EsUUFBTUQsY0FBY1IsUUFBZCxDQUF1QlUsU0FBdkIsQ0FBaUMsaUJBQU87QUFBQztBQUN6RCxXQUFPQyxNQUFNYixLQUFOLENBQVlFLFFBQVosQ0FBcUJGLEtBQXJCLENBQTJCTyxHQUEzQixJQUFnQ0QsUUFBdkM7QUFDQSxJQUZnQixDQUFYLENBQU4sRUFFSTtBQUNIRyxZQUFRSyxHQUFSO0FBQ0EsUUFBR0wsUUFBUU4sTUFBWCxFQUFrQjtBQUNqQk8scUJBQWNELFFBQVFBLFFBQVFOLE1BQVIsR0FBZSxDQUF2QixDQUFkO0FBQ0FRLGFBQU0sQ0FBQyxDQUFQO0FBQ0EsS0FIRCxNQUdLO0FBQ0pOLGNBQVNTLEdBQVQ7QUFDQUMsYUFBUUMsR0FBUixDQUFZLG1CQUFaO0FBQ0EsU0FBR1gsU0FBU0YsTUFBWixFQUFtQjtBQUNsQkssb0JBQVlILFNBQVNBLFNBQVNGLE1BQVQsR0FBZ0IsQ0FBekIsQ0FBWjtBQURrQiwwQkFFUEssV0FGTztBQUVoQkMsYUFGZ0IsaUJBRWhCQSxPQUZnQjs7QUFHbEJDLHNCQUFjRCxRQUFRQSxRQUFRTixNQUFSLEdBQWUsQ0FBdkIsQ0FBZDtBQUNBUSxjQUFNLENBQUMsQ0FBUDtBQUNBLE1BTEQsTUFLTTtBQUNMO0FBQ0E7QUFDQTtBQUNEO0FBQ0Q7O0FBRUQsT0FBR0EsU0FBTyxDQUFDLENBQVgsRUFBYTtBQUNaO0FBQ0E7QUFDQSxRQUFNTSxRQUFNUCxjQUFjUixRQUFkLENBQXVCUyxLQUF2QixFQUE4QlgsS0FBOUIsQ0FBb0NpQixLQUFoRDs7QUFFQVAsa0JBQWNSLFFBQWQsQ0FBdUJnQixNQUF2QixDQUE4QlAsS0FBOUI7O0FBRUEsUUFBTVEsVUFBUSxLQUFLbEIsUUFBTCxDQUFjQyxRQUFkLENBQXVCZ0IsTUFBdkIsQ0FBOEJELEtBQTlCLENBQWQ7O0FBRUEsUUFBTUcsZUFBYSxJQUFJQyxJQUFKLEdBQVdDLFFBQVgsRUFBbkI7O0FBRUFILFlBQVFJLE9BQVIsQ0FBZ0IsVUFBQ0MsQ0FBRCxFQUFHQyxDQUFILEVBQU87QUFDdEJELE9BQUVFLHdCQUFGLENBQTJCRCxLQUFHLENBQTlCO0FBQ0E7OztBQUdBRCxPQUFFRyxRQUFGLENBQVcsRUFBQ1AsMEJBQUQsRUFBWDtBQUNBLEtBTkQ7QUFPQSxJQWxCRCxNQWtCSztBQUNKLFVBQU0sSUFBSVEsS0FBSixDQUFVLGdEQUFWLENBQU47QUFDQTtBQUNEOzs7RUF2RDJCLHlDIiwiZmlsZSI6InNlY3Rpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCJcclxuXHJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZWQvZ3JvdXBcIlxyXG5cclxuaW1wb3J0IHtTZWN0aW9ufSBmcm9tIFwiLi4vY29udGVudFwiXHJcbmltcG9ydCBlZGl0YWJsZSBmcm9tIFwiLi9lZGl0YWJsZVwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIGVkaXRhYmxlKFNlY3Rpb24pe1xyXG5cdGNyZWF0ZUNvbXBvc2VkMlBhcmVudChwcm9wcyl7XHJcblx0XHRyZXR1cm4gPEdyb3VwIHsuLi5wcm9wc30gaW5kZXg9e3RoaXMuY29tcHV0ZWQuY2hpbGRyZW4ubGVuZ3RofS8+XHJcblx0fVxyXG5cclxuXHRfcmVDb21wb3NlRnJvbShjb250ZW50KXtcclxuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXMuY29tcHV0ZWRcclxuXHRcdGNvbnN0IHtfaWQ6IHRhcmdldElkfT1jb250ZW50XHJcbiAgICAgICAgbGV0IGN1cnJlbnRQYWdlPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxyXG4gICAgICAgIGxldCB7Y29sdW1uc309Y3VycmVudFBhZ2VcclxuICAgICAgICBsZXQgY3VycmVudENvbHVtbj1jb2x1bW5zW2NvbHVtbnMubGVuZ3RoLTFdXHJcblx0XHRsZXQgZm91bmQ9LTFcclxuXHRcdHdoaWxlKC0xPT0oZm91bmQ9Y3VycmVudENvbHVtbi5jaGlsZHJlbi5maW5kSW5kZXgoZ3JvdXA9PnsvL2dyb3VwL0xpbmVcclxuXHRcdFx0cmV0dXJuIGdyb3VwLnByb3BzLmNoaWxkcmVuLnByb3BzLl9pZD09dGFyZ2V0SWRcclxuXHRcdH0pKSl7XHJcblx0XHRcdGNvbHVtbnMucG9wKClcclxuXHRcdFx0aWYoY29sdW1ucy5sZW5ndGgpe1xyXG5cdFx0XHRcdGN1cnJlbnRDb2x1bW49Y29sdW1uc1tjb2x1bW5zLmxlbmd0aC0xXVxyXG5cdFx0XHRcdGZvdW5kPS0xXHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdGNvbXBvc2VkLnBvcCgpXHJcblx0XHRcdFx0Y29uc29sZS5sb2coXCJhIHBhZ2UgaXMgcmVtb3ZlZFwiKVxyXG5cdFx0XHRcdGlmKGNvbXBvc2VkLmxlbmd0aCl7XHJcblx0XHRcdFx0XHRjdXJyZW50UGFnZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV07XHJcblx0XHRcdFx0XHQoe2NvbHVtbnN9PWN1cnJlbnRQYWdlKTtcclxuXHRcdFx0XHRcdGN1cnJlbnRDb2x1bW49Y29sdW1uc1tjb2x1bW5zLmxlbmd0aC0xXTtcclxuXHRcdFx0XHRcdGZvdW5kPS0xXHJcblx0XHRcdFx0fWVsc2Uge1xyXG5cdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRcdC8vdGhyb3cgbmV3IEVycm9yKFwieW91IHNob3VsZCBmaW5kIHRoZSBsaW5lIGZyb20gc2VjdGlvbiwgYnV0IG5vdFwiKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmKGZvdW5kIT0tMSl7XHJcblx0XHRcdC8vd2UgbmVlZCBrbm93IGZyb20gd2hpY2ggY2hpbGQgZWFjaCBsaW5lIGNvbXBvc2VzIGZyb20gZm9yIHJlLWNvbXBvc2VcclxuXHRcdFx0Ly90aGF0J3Mgd2h5IG92ZXJ3cml0ZSBjcmVhdGVDb21wb3NlZDJQYXJlbnRcclxuXHRcdFx0Y29uc3QgaW5kZXg9Y3VycmVudENvbHVtbi5jaGlsZHJlbltmb3VuZF0ucHJvcHMuaW5kZXhcclxuXHJcblx0XHRcdGN1cnJlbnRDb2x1bW4uY2hpbGRyZW4uc3BsaWNlKGZvdW5kKVxyXG5cclxuXHRcdFx0Y29uc3QgcmVtb3ZlZD10aGlzLmNvbXB1dGVkLmNoaWxkcmVuLnNwbGljZShpbmRleClcclxuXHJcblx0XHRcdGNvbnN0IGNvbXBvc2VkVGltZT1uZXcgRGF0ZSgpLnRvU3RyaW5nKClcclxuXHJcblx0XHRcdHJlbW92ZWQuZm9yRWFjaCgoYSxpKT0+e1xyXG5cdFx0XHRcdGEuX2NsZWFyQ29tcG9zZWQ0cmVDb21wb3NlKGk9PTApXHJcblx0XHRcdFx0LyoqXHJcblx0XHRcdFx0ICogIGRvIHJlLWNvbXBvc2Ugam9iXHJcblx0XHRcdFx0ICovXHJcblx0XHRcdFx0YS5zZXRTdGF0ZSh7Y29tcG9zZWRUaW1lfSlcclxuXHRcdFx0fSlcclxuXHRcdH1lbHNle1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJ5b3Ugc2hvdWxkIGZpbmQgdGhlIGxpbmUgZnJvbSBzZWN0aW9uLCBidXQgbm90XCIpXHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiJdfQ==