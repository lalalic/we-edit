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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb3NlZC9wYWdlLmpzIl0sIm5hbWVzIjpbIlBhZ2UiLCJwcm9wcyIsInNpemUiLCJ3aWR0aCIsImhlaWdodCIsIm1hcmdpbiIsImxlZnQiLCJ0b3AiLCJib3R0b20iLCJoZWFkZXIiLCJoZWFkZXJTdGFydEF0IiwiZm9vdGVyIiwiZm9vdGVyRW5kQXQiLCJjb2x1bW5zIiwibWFwIiwiYSIsImkiLCJwcm9wVHlwZXMiLCJhcnJheU9mIiwib2JqZWN0IiwiaXNSZXF1aXJlZCIsImVsZW1lbnQiLCJDb2x1bW4iLCJQYXBlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7SUFFcUJBLEk7Ozs7Ozs7Ozs7aUNBQ1Q7QUFBQSx5QkFNRCxLQUFLQyxLQU5KO0FBQUEscUNBRVRDLElBRlM7QUFBQSxnQkFFSEMsS0FGRyxlQUVIQSxLQUZHO0FBQUEsZ0JBRUlDLE1BRkosZUFFSUEsTUFGSjtBQUFBLHVDQUdUQyxNQUhTO0FBQUEsZ0JBR0RDLElBSEMsaUJBR0RBLElBSEM7QUFBQSxnQkFHSUMsR0FISixpQkFHSUEsR0FISjtBQUFBLGdCQUdTQyxNQUhULGlCQUdTQSxNQUhUO0FBQUEscURBR2lCQyxNQUhqQjtBQUFBLGdCQUd3QkMsYUFIeEIsd0NBR3NDLENBSHRDO0FBQUEscURBR3lDQyxNQUh6QztBQUFBLGdCQUdnREMsV0FIaEQsd0NBRzRELENBSDVEO0FBQUEsZ0JBSVRDLE9BSlMsVUFJVEEsT0FKUztBQUFBLGdCQUtUSixNQUxTLFVBS1RBLE1BTFM7QUFBQSxnQkFNVEUsTUFOUyxVQU1UQSxNQU5TOztBQU9KLG1CQUNJO0FBQUE7QUFBQSxrQkFBTyxXQUFVLE1BQWpCO0FBQ0ksOENBQUMsS0FBRCxJQUFPLE9BQU9SLEtBQWQsRUFBcUIsUUFBUUMsTUFBN0IsRUFBcUMsTUFBSyxPQUExQyxHQURKO0FBR1BLLDBCQUFXO0FBQUE7QUFBQSxzQkFBTyxHQUFHSCxJQUFWLEVBQWdCLEdBQUdJLGFBQW5CLEVBQWtDLFdBQVUsUUFBNUM7QUFBc0REO0FBQXRELGlCQUhKO0FBS1I7QUFBQTtBQUFBLHNCQUFPLEdBQUdILElBQVYsRUFBZ0IsR0FBR0MsR0FBbkIsRUFBd0IsV0FBVSxTQUFsQztBQUNFTSw0QkFBUUMsR0FBUixDQUFZLFVBQUNDLENBQUQsRUFBR0MsQ0FBSDtBQUFBLCtCQUFPLDhCQUFDLE1BQUQsMkJBQVEsS0FBS0EsQ0FBYixJQUFvQkQsQ0FBcEIsRUFBUDtBQUFBLHFCQUFaO0FBREYsaUJBTFE7QUFTS0osMEJBQVc7QUFBQTtBQUFBLHNCQUFPLEdBQUdMLElBQVYsRUFBZ0IsR0FBR0YsU0FBT1EsV0FBUCxHQUFtQkQsT0FBT1YsS0FBUCxDQUFhRyxNQUFuRCxFQUEyRCxXQUFVLFFBQXJFO0FBQStFTztBQUEvRTtBQVRoQixhQURKO0FBY0g7Ozs7O0FBdEJnQlgsSSxDQXdCVmlCLFMsR0FBVTtBQUNiSixhQUFTLGlCQUFVSyxPQUFWLENBQWtCLGlCQUFVQyxNQUE1QixFQUFvQ0MsVUFEaEM7QUFFbkJsQixVQUFNLGlCQUFVaUIsTUFBVixDQUFpQkMsVUFGSjtBQUduQmYsWUFBUSxpQkFBVWMsTUFIQztBQUliVixZQUFRLGlCQUFVWSxPQUpMO0FBS2JWLFlBQVEsaUJBQVVVO0FBTEwsQztrQkF4QkFyQixJOztJQWlDZnNCLE07Ozs7Ozs7Ozs7O0lBRUFDLEs7Ozs7Ozs7Ozs7aUNBQ0c7QUFDUCxtQkFBTyxzQ0FBVSxLQUFLdEIsS0FBZixDQUFQO0FBQ0EiLCJmaWxlIjoicGFnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IEdyb3VwIGZyb20gXCIuL2dyb3VwXCJcbmltcG9ydCBMaW5lIGZyb20gXCIuL2xpbmVcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYWdlIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHJlbmRlcigpe1xuICAgICAgICBjb25zdCB7XG5cdFx0XHRzaXplOnt3aWR0aCwgaGVpZ2h0fSwgXG5cdFx0XHRtYXJnaW46e2xlZnQsdG9wLCBib3R0b20sIGhlYWRlcjpoZWFkZXJTdGFydEF0PTAsIGZvb3Rlcjpmb290ZXJFbmRBdD0wfSwgXG5cdFx0XHRjb2x1bW5zLCBcblx0XHRcdGhlYWRlciwgXG5cdFx0XHRmb290ZXJ9PXRoaXMucHJvcHNcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxHcm91cCBjbGFzc05hbWU9XCJwYWdlXCI+XG4gICAgICAgICAgICAgICAgPFBhcGVyIHdpZHRoPXt3aWR0aH0gaGVpZ2h0PXtoZWlnaHR9IGZpbGw9XCJ3aGl0ZVwiLz5cblx0XHRcdFx0XG5cdFx0XHRcdHtoZWFkZXIgJiYgKDxHcm91cCB4PXtsZWZ0fSB5PXtoZWFkZXJTdGFydEF0fSBjbGFzc05hbWU9XCJoZWFkZXJcIj57aGVhZGVyfTwvR3JvdXA+KX1cblx0XHRcdFx0XG5cdFx0XHRcdDxHcm91cCB4PXtsZWZ0fSB5PXt0b3B9IGNsYXNzTmFtZT1cImNvbnRlbnRcIj5cblx0XHRcdFx0XHR7Y29sdW1ucy5tYXAoKGEsaSk9PjxDb2x1bW4ga2V5PXtpfSB7Li4uYX0vPil9XG5cdFx0XHRcdDwvR3JvdXA+XG5cdFx0XHRcdFxuICAgICAgICAgICAgICAgIHtmb290ZXIgJiYgKDxHcm91cCB4PXtsZWZ0fSB5PXtoZWlnaHQtZm9vdGVyRW5kQXQtZm9vdGVyLnByb3BzLmhlaWdodH0gY2xhc3NOYW1lPVwiZm9vdGVyXCI+e2Zvb3Rlcn08L0dyb3VwPil9XG5cdFx0XHRcdFxuICAgICAgICAgICAgPC9Hcm91cD5cbiAgICAgICAgKVxuICAgIH1cblxuICAgIHN0YXRpYyBwcm9wVHlwZXM9e1xuICAgICAgICBjb2x1bW5zOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMub2JqZWN0KS5pc1JlcXVpcmVkLFxuXHRcdHNpemU6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcblx0XHRtYXJnaW46IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIGhlYWRlcjogUHJvcFR5cGVzLmVsZW1lbnQsXG4gICAgICAgIGZvb3RlcjogUHJvcFR5cGVzLmVsZW1lbnRcbiAgICB9XG59XG5cbmNsYXNzIENvbHVtbiBleHRlbmRzIEdyb3Vwe31cblxuY2xhc3MgUGFwZXIgZXh0ZW5kcyBDb21wb25lbnR7XG5cdHJlbmRlcigpe1xuXHRcdHJldHVybiA8cmVjdCB7Li4udGhpcy5wcm9wc30vPlxuXHR9XG59XG4iXX0=