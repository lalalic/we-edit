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

		return _possibleConstructorReturn(this, (Reference.__proto__ || Object.getPrototypeOf(Reference)).apply(this, arguments));
	}

	_createClass(Reference, [{
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb3NlZC9yZWZlcmVuY2UuanMiXSwibmFtZXMiOlsiUmVmZXJlbmNlIiwicHJvcHMiLCJmcm9tIiwidG8iLCJDaGlsZHJlbiIsIm9ubHkiLCJjaGlsZHJlbiIsImFzQXJyYXkiLCJzbGljZSIsInByb3BUeXBlcyIsIm51bWJlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFM7Ozs7Ozs7Ozs7OzJCQU1aO0FBQUEsZ0JBQ1ksS0FBS0MsS0FEakI7QUFBQSw0QkFDQUMsSUFEQTtBQUFBLE9BQ0FBLElBREEsK0JBQ0ssQ0FBQyxDQUROO0FBQUEsT0FDUUMsRUFEUixVQUNRQSxFQURSOztBQUVQLE9BQUdELE9BQUssQ0FBUixFQUFVO0FBQ1QsV0FBTyxnQkFBTUUsUUFBTixDQUFlQyxJQUFmLENBQW9CLEtBQUtKLEtBQUwsQ0FBV0ssUUFBL0IsQ0FBUDtBQUNBLElBRkQsTUFFSztBQUNKLFdBQU87QUFBQTtBQUFXLFVBQUtMLEtBQWhCO0FBQXdCLHFCQUFNRyxRQUFOLENBQWVHLE9BQWYsQ0FBdUIsS0FBS04sS0FBTCxDQUFXSyxRQUFsQyxFQUE0Q0UsS0FBNUMsQ0FBa0ROLElBQWxELEVBQXVEQyxFQUF2RDtBQUF4QixLQUFQO0FBQ0E7QUFDRDs7Ozs7O0FBYm1CSCxTLENBQ2JTLFMsR0FBVTtBQUNoQlAsT0FBSyxpQkFBVVEsTUFEQztBQUVoQlAsS0FBRyxpQkFBVU87QUFGRyxDO2tCQURHVixTIiwiZmlsZSI6InJlZmVyZW5jZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5cclxuaW1wb3J0IEdyb3VwIGZyb20gXCIuL2dyb3VwXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlZmVyZW5jZSBleHRlbmRzIEdyb3Vwe1xyXG5cdHN0YXRpYyBwcm9wVHlwZXM9e1xyXG5cdFx0ZnJvbTpQcm9wVHlwZXMubnVtYmVyLFxyXG5cdFx0dG86UHJvcFR5cGVzLm51bWJlclxyXG5cdH1cclxuXHRcclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHtmcm9tPS0xLHRvfT10aGlzLnByb3BzXHJcblx0XHRpZihmcm9tPDApe1xyXG5cdFx0XHRyZXR1cm4gUmVhY3QuQ2hpbGRyZW4ub25seSh0aGlzLnByb3BzLmNoaWxkcmVuKVxyXG5cdFx0fWVsc2V7XHJcblx0XHRcdHJldHVybiA8R3JvdXAgey4uLnRoaXMucHJvcHN9PntSZWFjdC5DaGlsZHJlbi5hc0FycmF5KHRoaXMucHJvcHMuY2hpbGRyZW4pLnNsaWNlKGZyb20sdG8pfTwvR3JvdXA+XHJcblx0XHR9XHJcblx0fVxyXG59Il19