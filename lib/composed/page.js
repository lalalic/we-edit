"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Page = undefined;

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _group = require("./group");

var _group2 = _interopRequireDefault(_group);

var _line = require("./line");

var _line2 = _interopRequireDefault(_line);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Page = exports.Page = function Page(_ref) {
	var _ref$size = _ref.size,
	    width = _ref$size.width,
	    height = _ref$size.height,
	    _ref$margin = _ref.margin,
	    left = _ref$margin.left,
	    top = _ref$margin.top,
	    right = _ref$margin.right,
	    bottom = _ref$margin.bottom,
	    _ref$margin$header = _ref$margin.header,
	    headerStartAt = _ref$margin$header === undefined ? 0 : _ref$margin$header,
	    _ref$margin$footer = _ref$margin.footer,
	    footerEndAt = _ref$margin$footer === undefined ? 0 : _ref$margin$footer,
	    columns = _ref.columns,
	    header = _ref.header,
	    footer = _ref.footer;
	return _react2.default.createElement(
		_group2.default,
		{ className: "page" },
		_react2.default.createElement(Paper, { width: width, height: height, fill: "white",
			margin: { left: left, top: top, right: width - right, bottom: height - bottom } }),
		header && _react2.default.createElement(
			_group2.default,
			{ x: left, y: headerStartAt, className: "header" },
			header
		),
		_react2.default.createElement(
			_group2.default,
			{ x: left, y: top, className: "content" },
			columns.map(function (a, i) {
				return _react2.default.createElement(_group2.default, (0, _extends3.default)({ key: i }, a));
			})
		),
		footer && _react2.default.createElement(
			_group2.default,
			{ x: left, y: height - footerEndAt - footer.props.height, className: "footer" },
			footer
		)
	);
};

Page.propTypes = {
	columns: _react.PropTypes.arrayOf(_react.PropTypes.object).isRequired,
	size: _react.PropTypes.object.isRequired,
	margin: _react.PropTypes.object,
	header: _react.PropTypes.element,
	footer: _react.PropTypes.element
};

var Paper = function Paper(_ref2) {
	var _ref2$margin = _ref2.margin,
	    left = _ref2$margin.left,
	    top = _ref2$margin.top,
	    right = _ref2$margin.right,
	    bottom = _ref2$margin.bottom,
	    _ref2$marginWidth = _ref2.marginWidth,
	    marginWidth = _ref2$marginWidth === undefined ? 20 : _ref2$marginWidth,
	    others = (0, _objectWithoutProperties3.default)(_ref2, ["margin", "marginWidth"]);
	return _react2.default.createElement(
		"g",
		null,
		_react2.default.createElement("rect", others),
		_react2.default.createElement("line", { x1: left, y1: top, x2: left - marginWidth, y2: top, strokeWidth: 1, stroke: "gray" }),
		_react2.default.createElement("line", { x1: left, y1: top, x2: left, y2: top - marginWidth, strokeWidth: 1, stroke: "gray" }),
		_react2.default.createElement("line", { x1: left, y1: bottom, x2: left - marginWidth, y2: bottom, strokeWidth: 1, stroke: "gray" }),
		_react2.default.createElement("line", { x1: left, y1: bottom, x2: left, y2: bottom + marginWidth, strokeWidth: 1, stroke: "gray" }),
		_react2.default.createElement("line", { x1: right, y1: bottom, x2: right + marginWidth, y2: bottom, strokeWidth: 1, stroke: "gray" }),
		_react2.default.createElement("line", { x1: right, y1: bottom, x2: right, y2: bottom + marginWidth, strokeWidth: 1, stroke: "gray" }),
		_react2.default.createElement("line", { x1: right, y1: top, x2: right + marginWidth, y2: top, strokeWidth: 1, stroke: "gray" }),
		_react2.default.createElement("line", { x1: right, y1: top, x2: right, y2: top - marginWidth, strokeWidth: 1, stroke: "gray" })
	);
};

exports.default = Page;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb3NlZC9wYWdlLmpzIl0sIm5hbWVzIjpbIlBhZ2UiLCJzaXplIiwid2lkdGgiLCJoZWlnaHQiLCJtYXJnaW4iLCJsZWZ0IiwidG9wIiwicmlnaHQiLCJib3R0b20iLCJoZWFkZXIiLCJoZWFkZXJTdGFydEF0IiwiZm9vdGVyIiwiZm9vdGVyRW5kQXQiLCJjb2x1bW5zIiwibWFwIiwiYSIsImkiLCJwcm9wcyIsInByb3BUeXBlcyIsImFycmF5T2YiLCJvYmplY3QiLCJpc1JlcXVpcmVkIiwiZWxlbWVudCIsIlBhcGVyIiwibWFyZ2luV2lkdGgiLCJvdGhlcnMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRU8sSUFBTUEsc0JBQUssU0FBTEEsSUFBSztBQUFBLHNCQUNmQyxJQURlO0FBQUEsS0FDVEMsS0FEUyxhQUNUQSxLQURTO0FBQUEsS0FDRkMsTUFERSxhQUNGQSxNQURFO0FBQUEsd0JBRWZDLE1BRmU7QUFBQSxLQUVQQyxJQUZPLGVBRVBBLElBRk87QUFBQSxLQUVGQyxHQUZFLGVBRUZBLEdBRkU7QUFBQSxLQUVHQyxLQUZILGVBRUdBLEtBRkg7QUFBQSxLQUVTQyxNQUZULGVBRVNBLE1BRlQ7QUFBQSxzQ0FFaUJDLE1BRmpCO0FBQUEsS0FFd0JDLGFBRnhCLHNDQUVzQyxDQUZ0QztBQUFBLHNDQUV5Q0MsTUFGekM7QUFBQSxLQUVnREMsV0FGaEQsc0NBRTRELENBRjVEO0FBQUEsS0FHZkMsT0FIZSxRQUdmQSxPQUhlO0FBQUEsS0FJZkosTUFKZSxRQUlmQSxNQUplO0FBQUEsS0FLZkUsTUFMZSxRQUtmQSxNQUxlO0FBQUEsUUFNakI7QUFBQTtBQUFBLElBQU8sV0FBVSxNQUFqQjtBQUNDLGdDQUFDLEtBQUQsSUFBTyxPQUFPVCxLQUFkLEVBQXFCLFFBQVFDLE1BQTdCLEVBQXFDLE1BQUssT0FBMUM7QUFDQyxXQUFRLEVBQUNFLFVBQUQsRUFBTUMsUUFBTixFQUFVQyxP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LElBQUlDLEtBQVYsRUFBaUIsSUFBSUQsR0FBckIsRUFBMEIsSUFBSUMsS0FBOUIsRUFBcUMsSUFBSUQsTUFBSWtCLFdBQTdDLEVBQTBELGFBQWEsQ0FBdkUsRUFBMEUsUUFBTyxNQUFqRjtBQVpELEVBRFc7QUFBQSxDQUFaOztrQkFpQmV4QixJIiwiZmlsZSI6InBhZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi9ncm91cFwiXG5pbXBvcnQgTGluZSBmcm9tIFwiLi9saW5lXCJcblxuZXhwb3J0IGNvbnN0IFBhZ2U9KHtcblx0XHRcdHNpemU6e3dpZHRoLCBoZWlnaHR9LCBcblx0XHRcdG1hcmdpbjp7bGVmdCx0b3AsIHJpZ2h0LGJvdHRvbSwgaGVhZGVyOmhlYWRlclN0YXJ0QXQ9MCwgZm9vdGVyOmZvb3RlckVuZEF0PTB9LCBcblx0XHRcdGNvbHVtbnMsIFxuXHRcdFx0aGVhZGVyLCBcblx0XHRcdGZvb3Rlcn0pPT4oXG5cdDxHcm91cCBjbGFzc05hbWU9XCJwYWdlXCI+XG5cdFx0PFBhcGVyIHdpZHRoPXt3aWR0aH0gaGVpZ2h0PXtoZWlnaHR9IGZpbGw9XCJ3aGl0ZVwiIFxuXHRcdFx0bWFyZ2luPXt7bGVmdCx0b3AscmlnaHQ6d2lkdGgtcmlnaHQsYm90dG9tOmhlaWdodC1ib3R0b219fS8+XG5cdFx0XG5cdFx0e2hlYWRlciAmJiAoPEdyb3VwIHg9e2xlZnR9IHk9e2hlYWRlclN0YXJ0QXR9IGNsYXNzTmFtZT1cImhlYWRlclwiPntoZWFkZXJ9PC9Hcm91cD4pfVxuXHRcdFxuXHRcdDxHcm91cCB4PXtsZWZ0fSB5PXt0b3B9IGNsYXNzTmFtZT1cImNvbnRlbnRcIj5cblx0XHRcdHtjb2x1bW5zLm1hcCgoYSxpKT0+PEdyb3VwIGtleT17aX0gey4uLmF9Lz4pfVxuXHRcdDwvR3JvdXA+XG5cdFx0XG5cdFx0e2Zvb3RlciAmJiAoPEdyb3VwIHg9e2xlZnR9IHk9e2hlaWdodC1mb290ZXJFbmRBdC1mb290ZXIucHJvcHMuaGVpZ2h0fSBjbGFzc05hbWU9XCJmb290ZXJcIj57Zm9vdGVyfTwvR3JvdXA+KX1cblx0XHRcblx0PC9Hcm91cD5cbilcblxuUGFnZS5wcm9wVHlwZXM9e1xuXHRjb2x1bW5zOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMub2JqZWN0KS5pc1JlcXVpcmVkLFxuXHRzaXplOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG5cdG1hcmdpbjogUHJvcFR5cGVzLm9iamVjdCxcblx0aGVhZGVyOiBQcm9wVHlwZXMuZWxlbWVudCxcblx0Zm9vdGVyOiBQcm9wVHlwZXMuZWxlbWVudFxufVxuXG5jb25zdCBQYXBlcj0oe21hcmdpbjp7bGVmdCx0b3AsIHJpZ2h0LGJvdHRvbX0sbWFyZ2luV2lkdGg9MjAsLi4ub3RoZXJzfSk9Pihcblx0PGc+XG5cdFx0PHJlY3Qgey4uLm90aGVyc30vPlxuXHRcdDxsaW5lIHgxPXtsZWZ0fSB5MT17dG9wfSB4Mj17bGVmdC1tYXJnaW5XaWR0aH0geTI9e3RvcH0gc3Ryb2tlV2lkdGg9ezF9IHN0cm9rZT1cImdyYXlcIi8+XG5cdFx0PGxpbmUgeDE9e2xlZnR9IHkxPXt0b3B9IHgyPXtsZWZ0fSB5Mj17dG9wLW1hcmdpbldpZHRofSBzdHJva2VXaWR0aD17MX0gc3Ryb2tlPVwiZ3JheVwiLz5cblx0XHRcblx0XHQ8bGluZSB4MT17bGVmdH0geTE9e2JvdHRvbX0geDI9e2xlZnQtbWFyZ2luV2lkdGh9IHkyPXtib3R0b219IHN0cm9rZVdpZHRoPXsxfSBzdHJva2U9XCJncmF5XCIvPlxuXHRcdDxsaW5lIHgxPXtsZWZ0fSB5MT17Ym90dG9tfSB4Mj17bGVmdH0geTI9e2JvdHRvbSttYXJnaW5XaWR0aH0gc3Ryb2tlV2lkdGg9ezF9IHN0cm9rZT1cImdyYXlcIi8+XG5cdFx0XG5cdFx0PGxpbmUgeDE9e3JpZ2h0fSB5MT17Ym90dG9tfSB4Mj17cmlnaHQrbWFyZ2luV2lkdGh9IHkyPXtib3R0b219IHN0cm9rZVdpZHRoPXsxfSBzdHJva2U9XCJncmF5XCIvPlxuXHRcdDxsaW5lIHgxPXtyaWdodH0geTE9e2JvdHRvbX0geDI9e3JpZ2h0fSB5Mj17Ym90dG9tK21hcmdpbldpZHRofSBzdHJva2VXaWR0aD17MX0gc3Ryb2tlPVwiZ3JheVwiLz5cblx0XHRcblx0XHQ8bGluZSB4MT17cmlnaHR9IHkxPXt0b3B9IHgyPXtyaWdodCttYXJnaW5XaWR0aH0geTI9e3RvcH0gc3Ryb2tlV2lkdGg9ezF9IHN0cm9rZT1cImdyYXlcIi8+XG5cdFx0PGxpbmUgeDE9e3JpZ2h0fSB5MT17dG9wfSB4Mj17cmlnaHR9IHkyPXt0b3AtbWFyZ2luV2lkdGh9IHN0cm9rZVdpZHRoPXsxfSBzdHJva2U9XCJncmF5XCIvPlxuXHQ8L2c+XG4pXG5cbmV4cG9ydCBkZWZhdWx0IFBhZ2VcbiJdfQ==