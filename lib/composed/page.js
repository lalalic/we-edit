"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Page = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _group = require("./group");

var _group2 = _interopRequireDefault(_group);

var _line = require("./line");

var _line2 = _interopRequireDefault(_line);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

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
				return _react2.default.createElement(_group2.default, _extends({ key: i }, a));
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
	    others = _objectWithoutProperties(_ref2, ["margin", "marginWidth"]);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb3NlZC9wYWdlLmpzIl0sIm5hbWVzIjpbIlBhZ2UiLCJzaXplIiwid2lkdGgiLCJoZWlnaHQiLCJtYXJnaW4iLCJsZWZ0IiwidG9wIiwicmlnaHQiLCJib3R0b20iLCJoZWFkZXIiLCJoZWFkZXJTdGFydEF0IiwiZm9vdGVyIiwiZm9vdGVyRW5kQXQiLCJjb2x1bW5zIiwibWFwIiwiYSIsImkiLCJwcm9wcyIsInByb3BUeXBlcyIsImFycmF5T2YiLCJvYmplY3QiLCJpc1JlcXVpcmVkIiwiZWxlbWVudCIsIlBhcGVyIiwibWFyZ2luV2lkdGgiLCJvdGhlcnMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7QUFFTyxJQUFNQSxzQkFBSyxTQUFMQSxJQUFLO0FBQUEsc0JBQ2ZDLElBRGU7QUFBQSxLQUNUQyxLQURTLGFBQ1RBLEtBRFM7QUFBQSxLQUNGQyxNQURFLGFBQ0ZBLE1BREU7QUFBQSx3QkFFZkMsTUFGZTtBQUFBLEtBRVBDLElBRk8sZUFFUEEsSUFGTztBQUFBLEtBRUZDLEdBRkUsZUFFRkEsR0FGRTtBQUFBLEtBRUdDLEtBRkgsZUFFR0EsS0FGSDtBQUFBLEtBRVNDLE1BRlQsZUFFU0EsTUFGVDtBQUFBLHNDQUVpQkMsTUFGakI7QUFBQSxLQUV3QkMsYUFGeEIsc0NBRXNDLENBRnRDO0FBQUEsc0NBRXlDQyxNQUZ6QztBQUFBLEtBRWdEQyxXQUZoRCxzQ0FFNEQsQ0FGNUQ7QUFBQSxLQUdmQyxPQUhlLFFBR2ZBLE9BSGU7QUFBQSxLQUlmSixNQUplLFFBSWZBLE1BSmU7QUFBQSxLQUtmRSxNQUxlLFFBS2ZBLE1BTGU7QUFBQSxRQU1qQjtBQUFBO0FBQUEsSUFBTyxXQUFVLE1BQWpCO0FBQ0MsZ0NBQUMsS0FBRCxJQUFPLE9BQU9ULEtBQWQsRUFBcUIsUUFBUUMsTUFBN0IsRUFBcUMsTUFBSyxPQUExQztBQUNDLFdBQVEsRUFBQ0UsVUFBRCxFQUFNQyxRQUFOLEVBQVVDLE9BQU1M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QUlDLEtBQVYsRUFBaUIsSUFBSUQsR0FBckIsRUFBMEIsSUFBSUMsS0FBOUIsRUFBcUMsSUFBSUQsTUFBSWtCLFdBQTdDLEVBQTBELGFBQWEsQ0FBdkUsRUFBMEUsUUFBTyxNQUFqRjtBQVpELEVBRFc7QUFBQSxDQUFaOztrQkFpQmV4QixJIiwiZmlsZSI6InBhZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IEdyb3VwIGZyb20gXCIuL2dyb3VwXCJcclxuaW1wb3J0IExpbmUgZnJvbSBcIi4vbGluZVwiXHJcblxyXG5leHBvcnQgY29uc3QgUGFnZT0oe1xyXG5cdFx0XHRzaXplOnt3aWR0aCwgaGVpZ2h0fSwgXHJcblx0XHRcdG1hcmdpbjp7bGVmdCx0b3AsIHJpZ2h0LGJvdHRvbSwgaGVhZGVyOmhlYWRlclN0YXJ0QXQ9MCwgZm9vdGVyOmZvb3RlckVuZEF0PTB9LCBcclxuXHRcdFx0Y29sdW1ucywgXHJcblx0XHRcdGhlYWRlciwgXHJcblx0XHRcdGZvb3Rlcn0pPT4oXHJcblx0PEdyb3VwIGNsYXNzTmFtZT1cInBhZ2VcIj5cclxuXHRcdDxQYXBlciB3aWR0aD17d2lkdGh9IGhlaWdodD17aGVpZ2h0fSBmaWxsPVwid2hpdGVcIiBcclxuXHRcdFx0bWFyZ2luPXt7bGVmdCx0b3AscmlnaHQ6d2lkdGgtcmlnaHQsYm90dG9tOmhlaWdodC1ib3R0b219fS8+XHJcblx0XHRcclxuXHRcdHtoZWFkZXIgJiYgKDxHcm91cCB4PXtsZWZ0fSB5PXtoZWFkZXJTdGFydEF0fSBjbGFzc05hbWU9XCJoZWFkZXJcIj57aGVhZGVyfTwvR3JvdXA+KX1cclxuXHRcdFxyXG5cdFx0PEdyb3VwIHg9e2xlZnR9IHk9e3RvcH0gY2xhc3NOYW1lPVwiY29udGVudFwiPlxyXG5cdFx0XHR7Y29sdW1ucy5tYXAoKGEsaSk9PjxHcm91cCBrZXk9e2l9IHsuLi5hfS8+KX1cclxuXHRcdDwvR3JvdXA+XHJcblx0XHRcclxuXHRcdHtmb290ZXIgJiYgKDxHcm91cCB4PXtsZWZ0fSB5PXtoZWlnaHQtZm9vdGVyRW5kQXQtZm9vdGVyLnByb3BzLmhlaWdodH0gY2xhc3NOYW1lPVwiZm9vdGVyXCI+e2Zvb3Rlcn08L0dyb3VwPil9XHJcblx0XHRcclxuXHQ8L0dyb3VwPlxyXG4pXHJcblxyXG5QYWdlLnByb3BUeXBlcz17XHJcblx0Y29sdW1uczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm9iamVjdCkuaXNSZXF1aXJlZCxcclxuXHRzaXplOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXHJcblx0bWFyZ2luOiBQcm9wVHlwZXMub2JqZWN0LFxyXG5cdGhlYWRlcjogUHJvcFR5cGVzLmVsZW1lbnQsXHJcblx0Zm9vdGVyOiBQcm9wVHlwZXMuZWxlbWVudFxyXG59XHJcblxyXG5jb25zdCBQYXBlcj0oe21hcmdpbjp7bGVmdCx0b3AsIHJpZ2h0LGJvdHRvbX0sbWFyZ2luV2lkdGg9MjAsLi4ub3RoZXJzfSk9PihcclxuXHQ8Zz5cclxuXHRcdDxyZWN0IHsuLi5vdGhlcnN9Lz5cclxuXHRcdDxsaW5lIHgxPXtsZWZ0fSB5MT17dG9wfSB4Mj17bGVmdC1tYXJnaW5XaWR0aH0geTI9e3RvcH0gc3Ryb2tlV2lkdGg9ezF9IHN0cm9rZT1cImdyYXlcIi8+XHJcblx0XHQ8bGluZSB4MT17bGVmdH0geTE9e3RvcH0geDI9e2xlZnR9IHkyPXt0b3AtbWFyZ2luV2lkdGh9IHN0cm9rZVdpZHRoPXsxfSBzdHJva2U9XCJncmF5XCIvPlxyXG5cdFx0XHJcblx0XHQ8bGluZSB4MT17bGVmdH0geTE9e2JvdHRvbX0geDI9e2xlZnQtbWFyZ2luV2lkdGh9IHkyPXtib3R0b219IHN0cm9rZVdpZHRoPXsxfSBzdHJva2U9XCJncmF5XCIvPlxyXG5cdFx0PGxpbmUgeDE9e2xlZnR9IHkxPXtib3R0b219IHgyPXtsZWZ0fSB5Mj17Ym90dG9tK21hcmdpbldpZHRofSBzdHJva2VXaWR0aD17MX0gc3Ryb2tlPVwiZ3JheVwiLz5cclxuXHRcdFxyXG5cdFx0PGxpbmUgeDE9e3JpZ2h0fSB5MT17Ym90dG9tfSB4Mj17cmlnaHQrbWFyZ2luV2lkdGh9IHkyPXtib3R0b219IHN0cm9rZVdpZHRoPXsxfSBzdHJva2U9XCJncmF5XCIvPlxyXG5cdFx0PGxpbmUgeDE9e3JpZ2h0fSB5MT17Ym90dG9tfSB4Mj17cmlnaHR9IHkyPXtib3R0b20rbWFyZ2luV2lkdGh9IHN0cm9rZVdpZHRoPXsxfSBzdHJva2U9XCJncmF5XCIvPlxyXG5cdFx0XHJcblx0XHQ8bGluZSB4MT17cmlnaHR9IHkxPXt0b3B9IHgyPXtyaWdodCttYXJnaW5XaWR0aH0geTI9e3RvcH0gc3Ryb2tlV2lkdGg9ezF9IHN0cm9rZT1cImdyYXlcIi8+XHJcblx0XHQ8bGluZSB4MT17cmlnaHR9IHkxPXt0b3B9IHgyPXtyaWdodH0geTI9e3RvcC1tYXJnaW5XaWR0aH0gc3Ryb2tlV2lkdGg9ezF9IHN0cm9rZT1cImdyYXlcIi8+XHJcblx0PC9nPlxyXG4pXHJcblxyXG5leHBvcnQgZGVmYXVsdCBQYWdlXHJcbiJdfQ==