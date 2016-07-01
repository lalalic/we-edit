"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _group = require("./group");

var _group2 = _interopRequireDefault(_group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Reference = function (_Group) {
	_inherits(Reference, _Group);

	function Reference() {
		_classCallCheck(this, Reference);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Reference).apply(this, arguments));
	}

	_createClass(Reference, [{
		key: "render",
		value: function render() {
			var _props = this.props;
			var _props$from = _props.from;
			var from = _props$from === undefined ? -1 : _props$from;
			var to = _props.to;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb3NlZC9yZWZlcmVuY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7OzJCQU1aO2dCQUNZLEtBQUssS0FBTCxDQURaOzRCQUNBLEtBREE7T0FDQSxtQ0FBSyxDQUFDLENBQUQsZUFETDtPQUNRLGVBRFI7O0FBRVAsT0FBRyxPQUFLLENBQUwsRUFBTztBQUNULFdBQU8sZ0JBQU0sUUFBTixDQUFlLElBQWYsQ0FBb0IsS0FBSyxLQUFMLENBQVcsUUFBWCxDQUEzQixDQURTO0lBQVYsTUFFSztBQUNKLFdBQU87O0tBQVcsS0FBSyxLQUFMO0tBQWEsZ0JBQU0sUUFBTixDQUFlLE9BQWYsQ0FBdUIsS0FBSyxLQUFMLENBQVcsUUFBWCxDQUF2QixDQUE0QyxLQUE1QyxDQUFrRCxJQUFsRCxFQUF1RCxFQUF2RCxDQUF4QjtLQUFQLENBREk7SUFGTDs7OztRQVJtQjs7O1VBQ2IsWUFBVTtBQUNoQixPQUFLLGlCQUFVLE1BQVY7QUFDTCxLQUFHLGlCQUFVLE1BQVY7O2tCQUhnQiIsImZpbGUiOiJyZWZlcmVuY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuXHJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi9ncm91cFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWZlcmVuY2UgZXh0ZW5kcyBHcm91cHtcclxuXHRzdGF0aWMgcHJvcFR5cGVzPXtcclxuXHRcdGZyb206UHJvcFR5cGVzLm51bWJlcixcclxuXHRcdHRvOlByb3BUeXBlcy5udW1iZXJcclxuXHR9XHJcblx0XHJcblx0cmVuZGVyKCl7XHJcblx0XHRjb25zdCB7ZnJvbT0tMSx0b309dGhpcy5wcm9wc1xyXG5cdFx0aWYoZnJvbTwwKXtcclxuXHRcdFx0cmV0dXJuIFJlYWN0LkNoaWxkcmVuLm9ubHkodGhpcy5wcm9wcy5jaGlsZHJlbilcclxuXHRcdH1lbHNle1xyXG5cdFx0XHRyZXR1cm4gPEdyb3VwIHsuLi50aGlzLnByb3BzfT57UmVhY3QuQ2hpbGRyZW4uYXNBcnJheSh0aGlzLnByb3BzLmNoaWxkcmVuKS5zbGljZShmcm9tLHRvKX08L0dyb3VwPlxyXG5cdFx0fVxyXG5cdH1cclxufSJdfQ==