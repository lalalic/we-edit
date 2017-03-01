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

var _group = require("./group");

var _group2 = _interopRequireDefault(_group);

var _line = require("./line");

var _line2 = _interopRequireDefault(_line);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Page = function (_Component) {
				(0, _inherits3.default)(Page, _Component);

				function Page() {
								(0, _classCallCheck3.default)(this, Page);
								return (0, _possibleConstructorReturn3.default)(this, (Page.__proto__ || (0, _getPrototypeOf2.default)(Page)).apply(this, arguments));
				}

				(0, _createClass3.default)(Page, [{
								key: "render",
								value: function render() {
												var _props = this.props,
												    _props$size = _props.size,
												    width = _props$size.width,
												    height = _props$size.height,
												    _props$margin = _props.margin,
												    left = _props$margin.left,
												    top = _props$margin.top,
												    bottom = _props$margin.bottom,
												    _props$margin$header = _props$margin.header,
												    headerStartAt = _props$margin$header === undefined ? 0 : _props$margin$header,
												    _props$margin$footer = _props$margin.footer,
												    footerEndAt = _props$margin$footer === undefined ? 0 : _props$margin$footer,
												    columns = _props.columns,
												    header = _props.header,
												    footer = _props.footer;

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
																								return _react2.default.createElement(Column, (0, _extends3.default)({ key: i }, a));
																				})
																),
																footer && _react2.default.createElement(
																				_group2.default,
																				{ x: left, y: height - footerEndAt - footer.props.height, className: "footer" },
																				footer
																)
												);
								}
				}]);
				return Page;
}(_react.Component);

Page.propTypes = {
				columns: _react.PropTypes.arrayOf(_react.PropTypes.object).isRequired,
				size: _react.PropTypes.object.isRequired,
				margin: _react.PropTypes.object,
				header: _react.PropTypes.element,
				footer: _react.PropTypes.element
};
exports.default = Page;

var Column = function (_Group) {
				(0, _inherits3.default)(Column, _Group);

				function Column() {
								(0, _classCallCheck3.default)(this, Column);
								return (0, _possibleConstructorReturn3.default)(this, (Column.__proto__ || (0, _getPrototypeOf2.default)(Column)).apply(this, arguments));
				}

				return Column;
}(_group2.default);

var Paper = function (_Component2) {
				(0, _inherits3.default)(Paper, _Component2);

				function Paper() {
								(0, _classCallCheck3.default)(this, Paper);
								return (0, _possibleConstructorReturn3.default)(this, (Paper.__proto__ || (0, _getPrototypeOf2.default)(Paper)).apply(this, arguments));
				}

				(0, _createClass3.default)(Paper, [{
								key: "render",
								value: function render() {
												return _react2.default.createElement("rect", this.props);
								}
				}]);
				return Paper;
}(_react.Component);

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb3NlZC9wYWdlLmpzIl0sIm5hbWVzIjpbIlBhZ2UiLCJwcm9wcyIsInNpemUiLCJ3aWR0aCIsImhlaWdodCIsIm1hcmdpbiIsImxlZnQiLCJ0b3AiLCJib3R0b20iLCJoZWFkZXIiLCJoZWFkZXJTdGFydEF0IiwiZm9vdGVyIiwiZm9vdGVyRW5kQXQiLCJjb2x1bW5zIiwibWFwIiwiYSIsImkiLCJwcm9wVHlwZXMiLCJhcnJheU9mIiwib2JqZWN0IiwiaXNSZXF1aXJlZCIsImVsZW1lbnQiLCJDb2x1bW4iLCJQYXBlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7SUFFcUJBLEk7Ozs7Ozs7Ozs7aUNBQ1Q7QUFBQSx5QkFNRCxLQUFLQyxLQU5KO0FBQUEscUNBRVRDLElBRlM7QUFBQSxnQkFFSEMsS0FGRyxlQUVIQSxLQUZHO0FBQUEsZ0JBRUlDLE1BRkosZUFFSUEsTUFGSjtBQUFBLHVDQUdUQyxNQUhTO0FBQUEsZ0JBR0RDLElBSEMsaUJBR0RBLElBSEM7QUFBQSxnQkFHSUMsR0FISixpQkFHSUEsR0FISjtBQUFBLGdCQUdTQyxNQUhULGlCQUdTQSxNQUhUO0FBQUEscURBR2lCQyxNQUhqQjtBQUFBLGdCQUd3QkMsYUFIeEIsd0NBR3NDLENBSHRDO0FBQUEscURBR3lDQyxNQUh6QztBQUFBLGdCQUdnREMsV0FIaEQsd0NBRzRELENBSDVEO0FBQUEsZ0JBSVRDLE9BSlMsVUFJVEEsT0FKUztBQUFBLGdCQUtUSixNQUxTLFVBS1RBLE1BTFM7QUFBQSxnQkFNVEUsTUFOUyxVQU1UQSxNQU5TOztBQU9KLG1CQUNJO0FBQUE7QUFBQSxrQkFBTyxXQUFVLE1BQWpCO0FBQ0ksOENBQUMsS0FBRCxJQUFPLE9BQU9SLEtBQWQsRUFBcUIsUUFBUUMsTUFBN0IsRUFBcUMsTUFBSyxPQUExQyxHQURKO0FBR1BLLDBCQUFXO0FBQUE7QUFBQSxzQkFBTyxHQUFHSCxJQUFWLEVBQWdCLEdBQUdJLGFBQW5CLEVBQWtDLFdBQVUsUUFBNUM7QUFBc0REO0FBQXRELGlCQUhKO0FBS1I7QUFBQTtBQUFBLHNCQUFPLEdBQUdILElBQVYsRUFBZ0IsR0FBR0MsR0FBbkIsRUFBd0IsV0FBVSxTQUFsQztBQUNFTSw0QkFBUUMsR0FBUixDQUFZLFVBQUNDLENBQUQsRUFBR0MsQ0FBSDtBQUFBLCtCQUFPLDhCQUFDLE1BQUQsMkJBQVEsS0FBS0EsQ0FBYixJQUFvQkQsQ0FBcEIsRUFBUDtBQUFBLHFCQUFaO0FBREYsaUJBTFE7QUFTS0osMEJBQVc7QUFBQTtBQUFBLHNCQUFPLEdBQUdMLElBQVYsRUFBZ0IsR0FBR0YsU0FBT1EsV0FBUCxHQUFtQkQsT0FBT1YsS0FBUCxDQUFhRyxNQUFuRCxFQUEyRCxXQUFVLFFBQXJFO0FBQStFTztBQUEvRTtBQVRoQixhQURKO0FBY0g7Ozs7O0FBdEJnQlgsSSxDQXdCVmlCLFMsR0FBVTtBQUNiSixhQUFTLGlCQUFVSyxPQUFWLENBQWtCLGlCQUFVQyxNQUE1QixFQUFvQ0MsVUFEaEM7QUFFbkJsQixVQUFNLGlCQUFVaUIsTUFBVixDQUFpQkMsVUFGSjtBQUduQmYsWUFBUSxpQkFBVWMsTUFIQztBQUliVixZQUFRLGlCQUFVWSxPQUpMO0FBS2JWLFlBQVEsaUJBQVVVO0FBTEwsQztrQkF4QkFyQixJOztJQWlDZnNCLE07Ozs7Ozs7Ozs7O0lBRUFDLEs7Ozs7Ozs7Ozs7aUNBQ0c7QUFDUCxtQkFBTyxzQ0FBVSxLQUFLdEIsS0FBZixDQUFQO0FBQ0EiLCJmaWxlIjoicGFnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4vZ3JvdXBcIlxyXG5pbXBvcnQgTGluZSBmcm9tIFwiLi9saW5lXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhZ2UgZXh0ZW5kcyBDb21wb25lbnR7XHJcbiAgICByZW5kZXIoKXtcclxuICAgICAgICBjb25zdCB7XHJcblx0XHRcdHNpemU6e3dpZHRoLCBoZWlnaHR9LCBcclxuXHRcdFx0bWFyZ2luOntsZWZ0LHRvcCwgYm90dG9tLCBoZWFkZXI6aGVhZGVyU3RhcnRBdD0wLCBmb290ZXI6Zm9vdGVyRW5kQXQ9MH0sIFxyXG5cdFx0XHRjb2x1bW5zLCBcclxuXHRcdFx0aGVhZGVyLCBcclxuXHRcdFx0Zm9vdGVyfT10aGlzLnByb3BzXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPEdyb3VwIGNsYXNzTmFtZT1cInBhZ2VcIj5cclxuICAgICAgICAgICAgICAgIDxQYXBlciB3aWR0aD17d2lkdGh9IGhlaWdodD17aGVpZ2h0fSBmaWxsPVwid2hpdGVcIi8+XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0e2hlYWRlciAmJiAoPEdyb3VwIHg9e2xlZnR9IHk9e2hlYWRlclN0YXJ0QXR9IGNsYXNzTmFtZT1cImhlYWRlclwiPntoZWFkZXJ9PC9Hcm91cD4pfVxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdDxHcm91cCB4PXtsZWZ0fSB5PXt0b3B9IGNsYXNzTmFtZT1cImNvbnRlbnRcIj5cclxuXHRcdFx0XHRcdHtjb2x1bW5zLm1hcCgoYSxpKT0+PENvbHVtbiBrZXk9e2l9IHsuLi5hfS8+KX1cclxuXHRcdFx0XHQ8L0dyb3VwPlxyXG5cdFx0XHRcdFxyXG4gICAgICAgICAgICAgICAge2Zvb3RlciAmJiAoPEdyb3VwIHg9e2xlZnR9IHk9e2hlaWdodC1mb290ZXJFbmRBdC1mb290ZXIucHJvcHMuaGVpZ2h0fSBjbGFzc05hbWU9XCJmb290ZXJcIj57Zm9vdGVyfTwvR3JvdXA+KX1cclxuXHRcdFx0XHRcclxuICAgICAgICAgICAgPC9Hcm91cD5cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHByb3BUeXBlcz17XHJcbiAgICAgICAgY29sdW1uczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm9iamVjdCkuaXNSZXF1aXJlZCxcclxuXHRcdHNpemU6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcclxuXHRcdG1hcmdpbjogUHJvcFR5cGVzLm9iamVjdCxcclxuICAgICAgICBoZWFkZXI6IFByb3BUeXBlcy5lbGVtZW50LFxyXG4gICAgICAgIGZvb3RlcjogUHJvcFR5cGVzLmVsZW1lbnRcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgQ29sdW1uIGV4dGVuZHMgR3JvdXB7fVxyXG5cclxuY2xhc3MgUGFwZXIgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0cmVuZGVyKCl7XHJcblx0XHRyZXR1cm4gPHJlY3Qgey4uLnRoaXMucHJvcHN9Lz5cclxuXHR9XHJcbn1cclxuIl19