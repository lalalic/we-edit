"use strict";

Object.defineProperty(exports, "__esModule", {
				value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _group = require("./group");

var _group2 = _interopRequireDefault(_group);

var _line = require("./line");

var _line2 = _interopRequireDefault(_line);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Page = function (_Component) {
				_inherits(Page, _Component);

				function Page() {
								_classCallCheck(this, Page);

								return _possibleConstructorReturn(this, Object.getPrototypeOf(Page).apply(this, arguments));
				}

				_createClass(Page, [{
								key: "render",
								value: function render() {
												var _props = this.props;
												var _props$size = _props.size;
												var width = _props$size.width;
												var height = _props$size.height;
												var _props$margin = _props.margin;
												var left = _props$margin.left;
												var top = _props$margin.top;
												var bottom = _props$margin.bottom;
												var _props$margin$header = _props$margin.header;
												var headerStartAt = _props$margin$header === undefined ? 0 : _props$margin$header;
												var _props$margin$footer = _props$margin.footer;
												var footerEndAt = _props$margin$footer === undefined ? 0 : _props$margin$footer;
												var columns = _props.columns;
												var header = _props.header;
												var footer = _props.footer;

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
																								return _react2.default.createElement(Column, _extends({ key: i }, a));
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
				_inherits(Column, _Group);

				function Column() {
								_classCallCheck(this, Column);

								return _possibleConstructorReturn(this, Object.getPrototypeOf(Column).apply(this, arguments));
				}

				return Column;
}(_group2.default);

var Paper = function (_Component2) {
				_inherits(Paper, _Component2);

				function Paper() {
								_classCallCheck(this, Paper);

								return _possibleConstructorReturn(this, Object.getPrototypeOf(Paper).apply(this, arguments));
				}

				_createClass(Paper, [{
								key: "render",
								value: function render() {
												return _react2.default.createElement("rect", this.props);
								}
				}]);

				return Paper;
}(_react.Component);

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb3NlZC9wYWdlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7aUNBQ1Q7eUJBTUQsS0FBSyxLQUFMLENBTkM7cUNBRVQsS0FGUztnQkFFSCwwQkFGRztnQkFFSSw0QkFGSjt1Q0FHVCxPQUhTO2dCQUdELDBCQUhDO2dCQUdJLHdCQUhKO2dCQUdTLDhCQUhUO3FEQUdpQixPQUhqQjtnQkFHd0IscURBQWMseUJBSHRDO3FEQUd5QyxPQUh6QztnQkFHZ0QsbURBQVkseUJBSDVEO2dCQUlULHlCQUpTO2dCQUtULHVCQUxTO2dCQU1ULHVCQU5TOztBQU9KLG1CQUNJOztrQkFBTyxXQUFVLE1BQVYsRUFBUDtnQkFDSSw4QkFBQyxLQUFELElBQU8sT0FBTyxLQUFQLEVBQWMsUUFBUSxNQUFSLEVBQWdCLE1BQUssT0FBTCxFQUFyQyxDQURKO2dCQUdQLFVBQVc7O3NCQUFPLEdBQUcsSUFBSCxFQUFTLEdBQUcsYUFBSCxFQUFrQixXQUFVLFFBQVYsRUFBbEM7b0JBQXNELE1BQXREO2lCQUFYO2dCQUVEOztzQkFBTyxHQUFHLElBQUgsRUFBUyxHQUFHLEdBQUgsRUFBUSxXQUFVLFNBQVYsRUFBeEI7b0JBQ0UsUUFBUSxHQUFSLENBQVksVUFBQyxDQUFELEVBQUcsQ0FBSDsrQkFBTyw4QkFBQyxNQUFELGFBQVEsS0FBSyxDQUFMLElBQVksRUFBcEI7cUJBQVAsQ0FEZDtpQkFMUTtnQkFTSyxVQUFXOztzQkFBTyxHQUFHLElBQUgsRUFBUyxHQUFHLFNBQU8sV0FBUCxHQUFtQixPQUFPLEtBQVAsQ0FBYSxNQUFiLEVBQXFCLFdBQVUsUUFBVixFQUEzRDtvQkFBK0UsTUFBL0U7aUJBQVg7YUFWVCxDQVBJOzs7O1dBRFM7OztLQXdCVixZQUFVO0FBQ2IsYUFBUyxpQkFBVSxPQUFWLENBQWtCLGlCQUFVLE1BQVYsQ0FBbEIsQ0FBb0MsVUFBcEM7QUFDZixVQUFNLGlCQUFVLE1BQVYsQ0FBaUIsVUFBakI7QUFDTixZQUFRLGlCQUFVLE1BQVY7QUFDRixZQUFRLGlCQUFVLE9BQVY7QUFDUixZQUFRLGlCQUFVLE9BQVY7O2tCQTdCSzs7SUFpQ2Y7Ozs7Ozs7Ozs7OztJQUVBOzs7Ozs7Ozs7OztpQ0FDRztBQUNQLG1CQUFPLHNDQUFVLEtBQUssS0FBTCxDQUFqQixDQURPOzs7O1dBREgiLCJmaWxlIjoicGFnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IEdyb3VwIGZyb20gXCIuL2dyb3VwXCJcbmltcG9ydCBMaW5lIGZyb20gXCIuL2xpbmVcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYWdlIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHJlbmRlcigpe1xuICAgICAgICBjb25zdCB7XG5cdFx0XHRzaXplOnt3aWR0aCwgaGVpZ2h0fSwgXG5cdFx0XHRtYXJnaW46e2xlZnQsdG9wLCBib3R0b20sIGhlYWRlcjpoZWFkZXJTdGFydEF0PTAsIGZvb3Rlcjpmb290ZXJFbmRBdD0wfSwgXG5cdFx0XHRjb2x1bW5zLCBcblx0XHRcdGhlYWRlciwgXG5cdFx0XHRmb290ZXJ9PXRoaXMucHJvcHNcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxHcm91cCBjbGFzc05hbWU9XCJwYWdlXCI+XG4gICAgICAgICAgICAgICAgPFBhcGVyIHdpZHRoPXt3aWR0aH0gaGVpZ2h0PXtoZWlnaHR9IGZpbGw9XCJ3aGl0ZVwiLz5cblx0XHRcdFx0XG5cdFx0XHRcdHtoZWFkZXIgJiYgKDxHcm91cCB4PXtsZWZ0fSB5PXtoZWFkZXJTdGFydEF0fSBjbGFzc05hbWU9XCJoZWFkZXJcIj57aGVhZGVyfTwvR3JvdXA+KX1cblx0XHRcdFx0XG5cdFx0XHRcdDxHcm91cCB4PXtsZWZ0fSB5PXt0b3B9IGNsYXNzTmFtZT1cImNvbnRlbnRcIj5cblx0XHRcdFx0XHR7Y29sdW1ucy5tYXAoKGEsaSk9PjxDb2x1bW4ga2V5PXtpfSB7Li4uYX0vPil9XG5cdFx0XHRcdDwvR3JvdXA+XG5cdFx0XHRcdFxuICAgICAgICAgICAgICAgIHtmb290ZXIgJiYgKDxHcm91cCB4PXtsZWZ0fSB5PXtoZWlnaHQtZm9vdGVyRW5kQXQtZm9vdGVyLnByb3BzLmhlaWdodH0gY2xhc3NOYW1lPVwiZm9vdGVyXCI+e2Zvb3Rlcn08L0dyb3VwPil9XG5cdFx0XHRcdFxuICAgICAgICAgICAgPC9Hcm91cD5cbiAgICAgICAgKVxuICAgIH1cblxuICAgIHN0YXRpYyBwcm9wVHlwZXM9e1xuICAgICAgICBjb2x1bW5zOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMub2JqZWN0KS5pc1JlcXVpcmVkLFxuXHRcdHNpemU6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcblx0XHRtYXJnaW46IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIGhlYWRlcjogUHJvcFR5cGVzLmVsZW1lbnQsXG4gICAgICAgIGZvb3RlcjogUHJvcFR5cGVzLmVsZW1lbnRcbiAgICB9XG59XG5cbmNsYXNzIENvbHVtbiBleHRlbmRzIEdyb3Vwe31cblxuY2xhc3MgUGFwZXIgZXh0ZW5kcyBDb21wb25lbnR7XG5cdHJlbmRlcigpe1xuXHRcdHJldHVybiA8cmVjdCB7Li4udGhpcy5wcm9wc30vPlxuXHR9XG59XG4iXX0=