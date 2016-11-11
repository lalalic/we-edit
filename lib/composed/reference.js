"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Reference = function (_Group) {
	(0, _inherits3.default)(Reference, _Group);

	function Reference() {
		(0, _classCallCheck3.default)(this, Reference);
		return (0, _possibleConstructorReturn3.default)(this, (Reference.__proto__ || (0, _getPrototypeOf2.default)(Reference)).apply(this, arguments));
	}

	(0, _createClass3.default)(Reference, [{
		key: "render",
		value: function render() {
			var _props = this.props,
			    _props$from = _props.from,
			    from = _props$from === undefined ? -1 : _props$from,
			    to = _props.to;

			if (from < 0) {
				return _react2.default.Children.only(this.props.children);
			} else {
				return _react2.default.createElement(
					_group2.default,
					this.props,
					_react2.default.Children.asArray(this.props.children).slice(from, to)
				);
			}
		}
	}]);
	return Reference;
}(_group2.default);

Reference.propTypes = {
	from: _react.PropTypes.number,
	to: _react.PropTypes.number
};
exports.default = Reference;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb3NlZC9yZWZlcmVuY2UuanMiXSwibmFtZXMiOlsiUmVmZXJlbmNlIiwicHJvcHMiLCJmcm9tIiwidG8iLCJDaGlsZHJlbiIsIm9ubHkiLCJjaGlsZHJlbiIsImFzQXJyYXkiLCJzbGljZSIsInByb3BUeXBlcyIsIm51bWJlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUVBOzs7Ozs7SUFFcUJBLFM7Ozs7Ozs7Ozs7MkJBTVo7QUFBQSxnQkFDWSxLQUFLQyxLQURqQjtBQUFBLDRCQUNBQyxJQURBO0FBQUEsT0FDQUEsSUFEQSwrQkFDSyxDQUFDLENBRE47QUFBQSxPQUNRQyxFQURSLFVBQ1FBLEVBRFI7O0FBRVAsT0FBR0QsT0FBSyxDQUFSLEVBQVU7QUFDVCxXQUFPLGdCQUFNRSxRQUFOLENBQWVDLElBQWYsQ0FBb0IsS0FBS0osS0FBTCxDQUFXSyxRQUEvQixDQUFQO0FBQ0EsSUFGRCxNQUVLO0FBQ0osV0FBTztBQUFBO0FBQVcsVUFBS0wsS0FBaEI7QUFBd0IscUJBQU1HLFFBQU4sQ0FBZUcsT0FBZixDQUF1QixLQUFLTixLQUFMLENBQVdLLFFBQWxDLEVBQTRDRSxLQUE1QyxDQUFrRE4sSUFBbEQsRUFBdURDLEVBQXZEO0FBQXhCLEtBQVA7QUFDQTtBQUNEOzs7OztBQWJtQkgsUyxDQUNiUyxTLEdBQVU7QUFDaEJQLE9BQUssaUJBQVVRLE1BREM7QUFFaEJQLEtBQUcsaUJBQVVPO0FBRkcsQztrQkFER1YsUyIsImZpbGUiOiJyZWZlcmVuY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuXHJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi9ncm91cFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWZlcmVuY2UgZXh0ZW5kcyBHcm91cHtcclxuXHRzdGF0aWMgcHJvcFR5cGVzPXtcclxuXHRcdGZyb206UHJvcFR5cGVzLm51bWJlcixcclxuXHRcdHRvOlByb3BUeXBlcy5udW1iZXJcclxuXHR9XHJcblx0XHJcblx0cmVuZGVyKCl7XHJcblx0XHRjb25zdCB7ZnJvbT0tMSx0b309dGhpcy5wcm9wc1xyXG5cdFx0aWYoZnJvbTwwKXtcclxuXHRcdFx0cmV0dXJuIFJlYWN0LkNoaWxkcmVuLm9ubHkodGhpcy5wcm9wcy5jaGlsZHJlbilcclxuXHRcdH1lbHNle1xyXG5cdFx0XHRyZXR1cm4gPEdyb3VwIHsuLi50aGlzLnByb3BzfT57UmVhY3QuQ2hpbGRyZW4uYXNBcnJheSh0aGlzLnByb3BzLmNoaWxkcmVuKS5zbGljZShmcm9tLHRvKX08L0dyb3VwPlxyXG5cdFx0fVxyXG5cdH1cclxufSJdfQ==