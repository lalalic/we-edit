"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Selection = exports.reducer = exports.ACTION = undefined;

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

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ACTION = exports.ACTION = {
	SELECT: function SELECT(id, start) {
		var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : start;
		return { type: "selected", payload: { target: id, start: start, end: end } };
	}
};

var reducer = exports.reducer = function reducer() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var _ref = arguments[1];
	var type = _ref.type,
	    payload = _ref.payload;

	switch (type) {
		case "selected":
			return (0, _assign2.default)({}, state, payload);
	}
	return state;
};

var Selection = exports.Selection = function (_Component) {
	(0, _inherits3.default)(Selection, _Component);

	function Selection() {
		(0, _classCallCheck3.default)(this, Selection);
		return (0, _possibleConstructorReturn3.default)(this, (Selection.__proto__ || (0, _getPrototypeOf2.default)(Selection)).apply(this, arguments));
	}

	(0, _createClass3.default)(Selection, [{
		key: "render",
		value: function render() {}
	}]);
	return Selection;
}(_react.Component);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3Ivc2VsZWN0aW9uLmpzIl0sIm5hbWVzIjpbIkFDVElPTiIsIlNFTEVDVCIsImlkIiwic3RhcnQiLCJlbmQiLCJ0eXBlIiwicGF5bG9hZCIsInRhcmdldCIsInJlZHVjZXIiLCJzdGF0ZSIsIlNlbGVjdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7QUFFTyxJQUFNQSwwQkFBTztBQUNuQkMsU0FBUSxnQkFBQ0MsRUFBRCxFQUFJQyxLQUFKO0FBQUEsTUFBVUMsR0FBVix1RUFBY0QsS0FBZDtBQUFBLFNBQXVCLEVBQUNFLE1BQUssVUFBTixFQUFrQkMsU0FBUyxFQUFDQyxRQUFPTCxFQUFSLEVBQVdDLFlBQVgsRUFBaUJDLFFBQWpCLEVBQTNCLEVBQXZCO0FBQUE7QUFEVyxDQUFiOztBQUlBLElBQU1JLDRCQUFRLFNBQVJBLE9BQVEsR0FBNEI7QUFBQSxLQUEzQkMsS0FBMkIsdUVBQXJCLEVBQXFCO0FBQUE7QUFBQSxLQUFoQkosSUFBZ0IsUUFBaEJBLElBQWdCO0FBQUEsS0FBWEMsT0FBVyxRQUFYQSxPQUFXOztBQUNoRCxTQUFPRCxJQUFQO0FBQ0EsT0FBSyxVQUFMO0FBQ0MsVUFBTyxzQkFBYyxFQUFkLEVBQWlCSSxLQUFqQixFQUF1QkgsT0FBdkIsQ0FBUDtBQUZEO0FBSUEsUUFBT0csS0FBUDtBQUNBLENBTk07O0lBUU1DLFMsV0FBQUEsUzs7Ozs7Ozs7OzsyQkFDSixDQUNQIiwiZmlsZSI6InNlbGVjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5cclxuZXhwb3J0IGNvbnN0IEFDVElPTj17XHJcblx0U0VMRUNUOiAoaWQsc3RhcnQsZW5kPXN0YXJ0KT0+KHt0eXBlOlwic2VsZWN0ZWRcIiwgcGF5bG9hZDoge3RhcmdldDppZCxzdGFydCxlbmR9fSlcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHJlZHVjZXI9KHN0YXRlPXt9LCB7dHlwZSxwYXlsb2FkfSk9PntcclxuXHRzd2l0Y2godHlwZSl7XHJcblx0Y2FzZSBcInNlbGVjdGVkXCI6XHJcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSxwYXlsb2FkKVxyXG5cdH1cclxuXHRyZXR1cm4gc3RhdGVcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNlbGVjdGlvbiBleHRlbmRzIENvbXBvbmVudHtcclxuXHRyZW5kZXIoKXtcclxuXHR9XHJcbn1cclxuIl19