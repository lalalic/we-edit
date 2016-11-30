"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Page = undefined;

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
		_react2.default.createElement(Paper, { width: width, height: height, fill: "white" }),
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

var Paper = function Paper(props) {
	return _react2.default.createElement("rect", props);
};

exports.default = Page;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb3NlZC9wYWdlLmpzIl0sIm5hbWVzIjpbIlBhZ2UiLCJzaXplIiwid2lkdGgiLCJoZWlnaHQiLCJtYXJnaW4iLCJsZWZ0IiwidG9wIiwiYm90dG9tIiwiaGVhZGVyIiwiaGVhZGVyU3RhcnRBdCIsImZvb3RlciIsImZvb3RlckVuZEF0IiwiY29sdW1ucyIsIm1hcCIsImEiLCJpIiwicHJvcHMiLCJwcm9wVHlwZXMiLCJhcnJheU9mIiwib2JqZWN0IiwiaXNSZXF1aXJlZCIsImVsZW1lbnQiLCJQYXBlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVPLElBQU1BLHNCQUFLLFNBQUxBLElBQUs7QUFBQSxzQkFDZkMsSUFEZTtBQUFBLEtBQ1RDLEtBRFMsYUFDVEEsS0FEUztBQUFBLEtBQ0ZDLE1BREUsYUFDRkEsTUFERTtBQUFBLHdCQUVmQyxNQUZlO0FBQUEsS0FFUEMsSUFGTyxlQUVQQSxJQUZPO0FBQUEsS0FFRkMsR0FGRSxlQUVGQSxHQUZFO0FBQUEsS0FFR0MsTUFGSCxlQUVHQSxNQUZIO0FBQUEsc0NBRVdDLE1BRlg7QUFBQSxLQUVrQkMsYUFGbEIsc0NBRWdDLENBRmhDO0FBQUEsc0NBRW1DQyxNQUZuQztBQUFBLEtBRTBDQyxXQUYxQyxzQ0FFc0QsQ0FGdEQ7QUFBQSxLQUdmQyxPQUhlLFFBR2ZBLE9BSGU7QUFBQSxLQUlmSixNQUplLFFBSWZBLE1BSmU7QUFBQSxLQUtmRSxNQUxlLFFBS2ZBLE1BTGU7QUFBQSxRQU1qQjtBQUFBO0FBQUEsSUFBTyxXQUFVLE1BQWpCO0FBQ0MsZ0NBQUMsS0FBRCxJQUFPLE9BQU9SLEtBQWQsRUFBcUIsUUFBUUMsTUFBN0IsRUFBcUMsTUFBSyxPQUExQyxHQUREO0FBR0VLLFlBQVc7QUFBQTtBQUFBLEtBQU8sR0FBR0gsSUFBVixFQUFnQixHQUFHSSxhQUFuQixFQUFrQyxXQUFVLFFBQTVDO0FBQXNERDtBQUF0RCxHQUhiO0FBS0M7QUFBQTtBQUFBLEtBQU8sR0FBR0gsSUFBVixFQUFnQixHQUFHQyxHQUFuQixFQUF3QixXQUFVLFNBQWxDO0FBQ0VNLFdBQVFDLEdBQVIsQ0FBWSxVQUFDQyxDQUFELEVBQUdDLENBQUg7QUFBQSxXQUFPLHdFQUFPLEtBQUtBLENBQVosSUFBbUJELENBQW5CLEVBQVA7QUFBQSxJQUFaO0FBREYsR0FMRDtBQVNFSixZQUFXO0FBQUE7QUFBQSxLQUFPLEdBQUdMLElBQVYsRUFBZ0IsR0FBR0YsU0FBT1EsV0FBUCxHQUFtQkQsT0FBT00sS0FBUCxDQUFhYixNQUFuRCxFQUEyRCxXQUFVLFFBQXJFO0FBQStFTztBQUEvRTtBQVRiLEVBTmlCO0FBQUEsQ0FBWDs7QUFvQlBWLEtBQUtpQixTQUFMLEdBQWU7QUFDZEwsVUFBUyxpQkFBVU0sT0FBVixDQUFrQixpQkFBVUMsTUFBNUIsRUFBb0NDLFVBRC9CO0FBRWRuQixPQUFNLGlCQUFVa0IsTUFBVixDQUFpQkMsVUFGVDtBQUdkaEIsU0FBUSxpQkFBVWUsTUFISjtBQUlkWCxTQUFRLGlCQUFVYSxPQUpKO0FBS2RYLFNBQVEsaUJBQVVXO0FBTEosQ0FBZjs7QUFRQSxJQUFNQyxRQUFNLFNBQU5BLEtBQU07QUFBQSxRQUFPLHNDQUFVTixLQUFWLENBQVA7QUFBQSxDQUFaOztrQkFFZWhCLEkiLCJmaWxlIjoicGFnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4vZ3JvdXBcIlxyXG5pbXBvcnQgTGluZSBmcm9tIFwiLi9saW5lXCJcclxuXHJcbmV4cG9ydCBjb25zdCBQYWdlPSh7XHJcblx0XHRcdHNpemU6e3dpZHRoLCBoZWlnaHR9LCBcclxuXHRcdFx0bWFyZ2luOntsZWZ0LHRvcCwgYm90dG9tLCBoZWFkZXI6aGVhZGVyU3RhcnRBdD0wLCBmb290ZXI6Zm9vdGVyRW5kQXQ9MH0sIFxyXG5cdFx0XHRjb2x1bW5zLCBcclxuXHRcdFx0aGVhZGVyLCBcclxuXHRcdFx0Zm9vdGVyfSk9PihcclxuXHQ8R3JvdXAgY2xhc3NOYW1lPVwicGFnZVwiPlxyXG5cdFx0PFBhcGVyIHdpZHRoPXt3aWR0aH0gaGVpZ2h0PXtoZWlnaHR9IGZpbGw9XCJ3aGl0ZVwiLz5cclxuXHRcdFxyXG5cdFx0e2hlYWRlciAmJiAoPEdyb3VwIHg9e2xlZnR9IHk9e2hlYWRlclN0YXJ0QXR9IGNsYXNzTmFtZT1cImhlYWRlclwiPntoZWFkZXJ9PC9Hcm91cD4pfVxyXG5cdFx0XHJcblx0XHQ8R3JvdXAgeD17bGVmdH0geT17dG9wfSBjbGFzc05hbWU9XCJjb250ZW50XCI+XHJcblx0XHRcdHtjb2x1bW5zLm1hcCgoYSxpKT0+PEdyb3VwIGtleT17aX0gey4uLmF9Lz4pfVxyXG5cdFx0PC9Hcm91cD5cclxuXHRcdFxyXG5cdFx0e2Zvb3RlciAmJiAoPEdyb3VwIHg9e2xlZnR9IHk9e2hlaWdodC1mb290ZXJFbmRBdC1mb290ZXIucHJvcHMuaGVpZ2h0fSBjbGFzc05hbWU9XCJmb290ZXJcIj57Zm9vdGVyfTwvR3JvdXA+KX1cclxuXHRcdFxyXG5cdDwvR3JvdXA+XHJcbilcclxuXHJcblBhZ2UucHJvcFR5cGVzPXtcclxuXHRjb2x1bW5zOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMub2JqZWN0KS5pc1JlcXVpcmVkLFxyXG5cdHNpemU6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcclxuXHRtYXJnaW46IFByb3BUeXBlcy5vYmplY3QsXHJcblx0aGVhZGVyOiBQcm9wVHlwZXMuZWxlbWVudCxcclxuXHRmb290ZXI6IFByb3BUeXBlcy5lbGVtZW50XHJcbn1cclxuXHJcbmNvbnN0IFBhcGVyPXByb3BzPT48cmVjdCB7Li4ucHJvcHN9Lz5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBhZ2VcclxuIl19