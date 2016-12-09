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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3Ivc2VjdGlvbi5qcyJdLCJuYW1lcyI6WyJwcm9wcyIsImNvbXB1dGVkIiwiY2hpbGRyZW4iLCJsZW5ndGgiLCJjb250ZW50IiwiY29tcG9zZWQiLCJ0YXJnZXRJZCIsImlkIiwiY3VycmVudFBhZ2UiLCJjb2x1bW5zIiwiY3VycmVudENvbHVtbiIsImZvdW5kIiwiZmluZEluZGV4IiwiZ3JvdXAiLCJwb3AiLCJjb25zb2xlIiwibG9nIiwiaW5kZXgiLCJzcGxpY2UiLCJyZW1vdmVkIiwiY29tcG9zZWRUaW1lIiwiRGF0ZSIsInRvU3RyaW5nIiwiZm9yRWFjaCIsImEiLCJpIiwiX2NsZWFyQ29tcG9zZWQ0cmVDb21wb3NlIiwic2V0U3RhdGUiLCJFcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7OztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O3dDQUd1QkEsSyxFQUFNO0FBQzNCLFVBQU8sMEVBQVdBLEtBQVgsSUFBa0IsT0FBTyxLQUFLQyxRQUFMLENBQWNDLFFBQWQsQ0FBdUJDLE1BQWhELElBQVA7QUFDQTs7O2lDQUVjQyxPLEVBQVE7QUFBQTs7QUFBQSxPQUNUQyxRQURTLEdBQ0MsS0FBS0osUUFETixDQUNUSSxRQURTO0FBQUEsT0FFWEMsUUFGVyxHQUVERixPQUZDLENBRWZHLEVBRmU7O0FBR2hCLE9BQUlDLGNBQVlILFNBQVNBLFNBQVNGLE1BQVQsR0FBZ0IsQ0FBekIsQ0FBaEI7QUFIZ0Isc0JBSUZLLFdBSkU7QUFBQSxPQUlYQyxPQUpXLGdCQUlYQSxPQUpXOztBQUtoQixPQUFJQyxnQkFBY0QsUUFBUUEsUUFBUU4sTUFBUixHQUFlLENBQXZCLENBQWxCO0FBQ04sT0FBSVEsUUFBTSxDQUFDLENBQVg7QUFDQSxVQUFNLENBQUMsQ0FBRCxLQUFLQSxRQUFNRCxjQUFjUixRQUFkLENBQXVCVSxTQUF2QixDQUFpQyxpQkFBTztBQUFDO0FBQ3pELFdBQU9DLE1BQU1iLEtBQU4sQ0FBWUUsUUFBWixDQUFxQkYsS0FBckIsQ0FBMkJPLEVBQTNCLElBQStCRCxRQUF0QztBQUNBLElBRmdCLENBQVgsQ0FBTixFQUVJO0FBQ0hHLFlBQVFLLEdBQVI7QUFDQSxRQUFHTCxRQUFRTixNQUFYLEVBQWtCO0FBQ2pCTyxxQkFBY0QsUUFBUUEsUUFBUU4sTUFBUixHQUFlLENBQXZCLENBQWQ7QUFDQVEsYUFBTSxDQUFDLENBQVA7QUFDQSxLQUhELE1BR0s7QUFDSk4sY0FBU1MsR0FBVDtBQUNBQyxhQUFRQyxHQUFSLENBQVksbUJBQVo7QUFDQSxTQUFHWCxTQUFTRixNQUFaLEVBQW1CO0FBQ2xCSyxvQkFBWUgsU0FBU0EsU0FBU0YsTUFBVCxHQUFnQixDQUF6QixDQUFaO0FBRGtCLDBCQUVQSyxXQUZPO0FBRWhCQyxhQUZnQixpQkFFaEJBLE9BRmdCOztBQUdsQkMsc0JBQWNELFFBQVFBLFFBQVFOLE1BQVIsR0FBZSxDQUF2QixDQUFkO0FBQ0FRLGNBQU0sQ0FBQyxDQUFQO0FBQ0EsTUFMRCxNQUtNO0FBQ0w7QUFDQTtBQUNBO0FBQ0Q7QUFDRDs7QUFFRCxPQUFHQSxTQUFPLENBQUMsQ0FBWCxFQUFhO0FBQUE7QUFDWjtBQUNBO0FBQ0EsU0FBTU0sUUFBTVAsY0FBY1IsUUFBZCxDQUF1QlMsS0FBdkIsRUFBOEJYLEtBQTlCLENBQW9DaUIsS0FBaEQ7O0FBRUFQLG1CQUFjUixRQUFkLENBQXVCZ0IsTUFBdkIsQ0FBOEJQLEtBQTlCOztBQUVBLFNBQU1RLFVBQVEsT0FBS2xCLFFBQUwsQ0FBY0MsUUFBZCxDQUF1QmdCLE1BQXZCLENBQThCRCxLQUE5QixDQUFkOztBQUVBLFNBQU1HLGVBQWEsSUFBSUMsSUFBSixHQUFXQyxRQUFYLEVBQW5COztBQUVBSCxhQUFRSSxPQUFSLENBQWdCLFVBQUNDLENBQUQsRUFBR0MsQ0FBSCxFQUFPO0FBQ3RCRCxRQUFFRSx3QkFBRixDQUEyQkQsS0FBRyxDQUE5QjtBQUNBOzs7QUFHQUQsUUFBRUcsUUFBRixDQUFXLEVBQUNQLDBCQUFELEVBQVg7QUFDQSxNQU5EO0FBWFk7QUFrQlosSUFsQkQsTUFrQks7QUFDSixVQUFNLElBQUlRLEtBQUosQ0FBVSxnREFBVixDQUFOO0FBQ0E7QUFDRDs7O0VBdkQyQix5QyIsImZpbGUiOiJzZWN0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiXHJcblxyXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcclxuXHJcbmltcG9ydCB7U2VjdGlvbn0gZnJvbSBcIi4uL2NvbnRlbnRcIlxyXG5pbXBvcnQgZWRpdGFibGUgZnJvbSBcIi4vZWRpdGFibGVcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBlZGl0YWJsZShTZWN0aW9uKXtcclxuXHRjcmVhdGVDb21wb3NlZDJQYXJlbnQocHJvcHMpe1xyXG5cdFx0cmV0dXJuIDxHcm91cCB7Li4ucHJvcHN9IGluZGV4PXt0aGlzLmNvbXB1dGVkLmNoaWxkcmVuLmxlbmd0aH0vPlxyXG5cdH1cclxuXHJcblx0X3JlQ29tcG9zZUZyb20oY29udGVudCl7XHJcbiAgICAgICAgY29uc3Qge2NvbXBvc2VkfT10aGlzLmNvbXB1dGVkXHJcblx0XHRjb25zdCB7aWQ6IHRhcmdldElkfT1jb250ZW50XHJcbiAgICAgICAgbGV0IGN1cnJlbnRQYWdlPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxyXG4gICAgICAgIGxldCB7Y29sdW1uc309Y3VycmVudFBhZ2VcclxuICAgICAgICBsZXQgY3VycmVudENvbHVtbj1jb2x1bW5zW2NvbHVtbnMubGVuZ3RoLTFdXHJcblx0XHRsZXQgZm91bmQ9LTFcclxuXHRcdHdoaWxlKC0xPT0oZm91bmQ9Y3VycmVudENvbHVtbi5jaGlsZHJlbi5maW5kSW5kZXgoZ3JvdXA9PnsvL2dyb3VwL0xpbmVcclxuXHRcdFx0cmV0dXJuIGdyb3VwLnByb3BzLmNoaWxkcmVuLnByb3BzLmlkPT10YXJnZXRJZFxyXG5cdFx0fSkpKXtcclxuXHRcdFx0Y29sdW1ucy5wb3AoKVxyXG5cdFx0XHRpZihjb2x1bW5zLmxlbmd0aCl7XHJcblx0XHRcdFx0Y3VycmVudENvbHVtbj1jb2x1bW5zW2NvbHVtbnMubGVuZ3RoLTFdXHJcblx0XHRcdFx0Zm91bmQ9LTFcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0Y29tcG9zZWQucG9wKClcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhcImEgcGFnZSBpcyByZW1vdmVkXCIpXHJcblx0XHRcdFx0aWYoY29tcG9zZWQubGVuZ3RoKXtcclxuXHRcdFx0XHRcdGN1cnJlbnRQYWdlPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXTtcclxuXHRcdFx0XHRcdCh7Y29sdW1uc309Y3VycmVudFBhZ2UpO1xyXG5cdFx0XHRcdFx0Y3VycmVudENvbHVtbj1jb2x1bW5zW2NvbHVtbnMubGVuZ3RoLTFdO1xyXG5cdFx0XHRcdFx0Zm91bmQ9LTFcclxuXHRcdFx0XHR9ZWxzZSB7XHJcblx0XHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdFx0Ly90aHJvdyBuZXcgRXJyb3IoXCJ5b3Ugc2hvdWxkIGZpbmQgdGhlIGxpbmUgZnJvbSBzZWN0aW9uLCBidXQgbm90XCIpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYoZm91bmQhPS0xKXtcclxuXHRcdFx0Ly93ZSBuZWVkIGtub3cgZnJvbSB3aGljaCBjaGlsZCBlYWNoIGxpbmUgY29tcG9zZXMgZnJvbSBmb3IgcmUtY29tcG9zZVxyXG5cdFx0XHQvL3RoYXQncyB3aHkgb3ZlcndyaXRlIGNyZWF0ZUNvbXBvc2VkMlBhcmVudFxyXG5cdFx0XHRjb25zdCBpbmRleD1jdXJyZW50Q29sdW1uLmNoaWxkcmVuW2ZvdW5kXS5wcm9wcy5pbmRleFxyXG5cclxuXHRcdFx0Y3VycmVudENvbHVtbi5jaGlsZHJlbi5zcGxpY2UoZm91bmQpXHJcblxyXG5cdFx0XHRjb25zdCByZW1vdmVkPXRoaXMuY29tcHV0ZWQuY2hpbGRyZW4uc3BsaWNlKGluZGV4KVxyXG5cclxuXHRcdFx0Y29uc3QgY29tcG9zZWRUaW1lPW5ldyBEYXRlKCkudG9TdHJpbmcoKVxyXG5cclxuXHRcdFx0cmVtb3ZlZC5mb3JFYWNoKChhLGkpPT57XHJcblx0XHRcdFx0YS5fY2xlYXJDb21wb3NlZDRyZUNvbXBvc2UoaT09MClcclxuXHRcdFx0XHQvKipcclxuXHRcdFx0XHQgKiAgZG8gcmUtY29tcG9zZSBqb2JcclxuXHRcdFx0XHQgKi9cclxuXHRcdFx0XHRhLnNldFN0YXRlKHtjb21wb3NlZFRpbWV9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fWVsc2V7XHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcInlvdSBzaG91bGQgZmluZCB0aGUgbGluZSBmcm9tIHNlY3Rpb24sIGJ1dCBub3RcIilcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIl19