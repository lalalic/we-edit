"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Frame = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _group = require("./group");

var _group2 = _interopRequireDefault(_group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Frame = exports.Frame = function Frame(_ref) {
	var _ref$margin = _ref.margin,
	    left = _ref$margin.left,
	    top = _ref$margin.top,
	    columns = _ref.columns;
	return _react2.default.createElement(
		_group2.default,
		{ x: left, y: top },
		columns.map(function (a, i) {
			return _react2.default.createElement(_group2.default, (0, _extends3.default)({ key: i }, a));
		})
	);
};

Frame.propTypes = {
	columns: _react.PropTypes.arrayOf(_react.PropTypes.object).isRequired,
	size: _react.PropTypes.object.isRequired,
	margin: _react.PropTypes.object
};

exports.default = Frame;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb3NlZC9mcmFtZS5qcyJdLCJuYW1lcyI6WyJGcmFtZSIsIm1hcmdpbiIsImxlZnQiLCJ0b3AiLCJjb2x1bW5zIiwibWFwIiwiYSIsImkiLCJwcm9wVHlwZXMiLCJhcnJheU9mIiwib2JqZWN0IiwiaXNSZXF1aXJlZCIsInNpemUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7Ozs7O0FBRU8sSUFBTUEsd0JBQU0sU0FBTkEsS0FBTTtBQUFBLHdCQUFFQyxNQUFGO0FBQUEsS0FBVUMsSUFBVixlQUFVQSxJQUFWO0FBQUEsS0FBZUMsR0FBZixlQUFlQSxHQUFmO0FBQUEsS0FBcUJDLE9BQXJCLFFBQXFCQSxPQUFyQjtBQUFBLFFBQ2xCO0FBQUE7QUFBQSxJQUFPLEdBQUdGLElBQVYsRUFBZ0IsR0FBR0MsR0FBbkI7QUFDRUMsVUFBUUMsR0FBUixDQUFZLFVBQUNDLENBQUQsRUFBR0MsQ0FBSDtBQUFBLFVBQU8sd0VBQU8sS0FBS0EsQ0FBWixJQUFtQkQsQ0FBbkIsRUFBUDtBQUFBLEdBQVo7QUFERixFQURrQjtBQUFBLENBQVo7O0FBTVBOLE1BQU1RLFNBQU4sR0FBZ0I7QUFDZkosVUFBUyxpQkFBVUssT0FBVixDQUFrQixpQkFBVUMsTUFBNUIsRUFBb0NDLFVBRDlCO0FBRWZDLE9BQU0saUJBQVVGLE1BQVYsQ0FBaUJDLFVBRlI7QUFHZlYsU0FBUSxpQkFBVVM7QUFISCxDQUFoQjs7a0JBTWVWLEsiLCJmaWxlIjoiZnJhbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcblxuaW1wb3J0IEdyb3VwIGZyb20gXCIuL2dyb3VwXCJcblxuZXhwb3J0IGNvbnN0IEZyYW1lPSh7bWFyZ2luOntsZWZ0LHRvcH0sIGNvbHVtbnN9KT0+KFxuXHQ8R3JvdXAgeD17bGVmdH0geT17dG9wfT5cblx0XHR7Y29sdW1ucy5tYXAoKGEsaSk9PjxHcm91cCBrZXk9e2l9IHsuLi5hfS8+KX1cblx0PC9Hcm91cD5cbilcblxuRnJhbWUucHJvcFR5cGVzPXtcblx0Y29sdW1uczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm9iamVjdCkuaXNSZXF1aXJlZCxcblx0c2l6ZTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuXHRtYXJnaW46IFByb3BUeXBlcy5vYmplY3Rcbn1cblxuZXhwb3J0IGRlZmF1bHQgRnJhbWVcbiJdfQ==