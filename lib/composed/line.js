"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Line = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _group = require("./group");

var _group2 = _interopRequireDefault(_group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
export default class Line extends Group{
	render(){
		const {height, descent}=this.props
		return <Group y={height-descent} {...this.props}/>
	}
}
*/

var Line = exports.Line = function Line(_ref) {
	var children = _ref.children;

	var width = children.reduce(function (w, _ref2) {
		var width = _ref2.props.width;
		return w + width;
	}, 0);
	var height = children.reduce(function (h, _ref3) {
		var height = _ref3.props.height;
		return Math.max(h, height);
	}, 0);
	var descent = children.reduce(function (h, _ref4) {
		var _ref4$props$descent = _ref4.props.descent,
		    descent = _ref4$props$descent === undefined ? 0 : _ref4$props$descent;
		return Math.max(h, descent);
	}, 0);

	return _react2.default.createElement(
		_group2.default,
		{ y: height - descent },
		children.reduce(function (state, piece, i) {
			var pieces = state.pieces,
			    x = state.x;
			var _piece$props = piece.props,
			    width = _piece$props.width,
			    height = _piece$props.height;

			pieces.push(_react2.default.createElement(
				_group2.default,
				{ x: x },
				piece
			));
			state.x = x + width;
			return state;
		}, { pieces: [], x: 0 }).pieces
	);
};

exports.default = Line;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb3NlZC9saW5lLmpzIl0sIm5hbWVzIjpbIkxpbmUiLCJjaGlsZHJlbiIsIndpZHRoIiwicmVkdWNlIiwidyIsInByb3BzIiwiaGVpZ2h0IiwiaCIsIk1hdGgiLCJtYXgiLCJkZXNjZW50Iiwic3RhdGUiLCJwaWVjZSIsImkiLCJwaWVjZXMiLCJ4IiwicHVzaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7OztBQUVBOzs7Ozs7Ozs7QUFTTyxJQUFNQSxzQkFBSyxTQUFMQSxJQUFLLE9BQWM7QUFBQSxLQUFaQyxRQUFZLFFBQVpBLFFBQVk7O0FBQy9CLEtBQU1DLFFBQU1ELFNBQVNFLE1BQVQsQ0FBZ0IsVUFBQ0MsQ0FBRDtBQUFBLE1BQVdGLEtBQVgsU0FBSUcsS0FBSixDQUFXSCxLQUFYO0FBQUEsU0FBcUJFLElBQUVGLEtBQXZCO0FBQUEsRUFBaEIsRUFBNkMsQ0FBN0MsQ0FBWjtBQUNBLEtBQU1JLFNBQU9MLFNBQVNFLE1BQVQsQ0FBZ0IsVUFBQ0ksQ0FBRDtBQUFBLE1BQVdELE1BQVgsU0FBSUQsS0FBSixDQUFXQyxNQUFYO0FBQUEsU0FBc0JFLEtBQUtDLEdBQUwsQ0FBU0YsQ0FBVCxFQUFXRCxNQUFYLENBQXRCO0FBQUEsRUFBaEIsRUFBeUQsQ0FBekQsQ0FBYjtBQUNBLEtBQU1JLFVBQVFULFNBQVNFLE1BQVQsQ0FBZ0IsVUFBQ0ksQ0FBRDtBQUFBLGtDQUFJRixLQUFKLENBQVdLLE9BQVg7QUFBQSxNQUFXQSxPQUFYLHVDQUFtQixDQUFuQjtBQUFBLFNBQXlCRixLQUFLQyxHQUFMLENBQVNGLENBQVQsRUFBV0csT0FBWCxDQUF6QjtBQUFBLEVBQWhCLEVBQTZELENBQTdELENBQWQ7O0FBRUEsUUFDQztBQUFBO0FBQUEsSUFBTyxHQUFHSixTQUFPSSxPQUFqQjtBQUVDVCxXQUFTRSxNQUFULENBQWdCLFVBQUNRLEtBQUQsRUFBT0MsS0FBUCxFQUFhQyxDQUFiLEVBQWlCO0FBQUEsT0FDekJDLE1BRHlCLEdBQ2ZILEtBRGUsQ0FDekJHLE1BRHlCO0FBQUEsT0FDbEJDLENBRGtCLEdBQ2ZKLEtBRGUsQ0FDbEJJLENBRGtCO0FBQUEsc0JBRVhILE1BQU1QLEtBRks7QUFBQSxPQUV6QkgsS0FGeUIsZ0JBRXpCQSxLQUZ5QjtBQUFBLE9BRW5CSSxNQUZtQixnQkFFbkJBLE1BRm1COztBQUdoQ1EsVUFBT0UsSUFBUCxDQUNDO0FBQUE7QUFBQSxNQUFPLEdBQUdELENBQVY7QUFDRUg7QUFERixJQUREO0FBS0FELFNBQU1JLENBQU4sR0FBUUEsSUFBRWIsS0FBVjtBQUNBLFVBQU9TLEtBQVA7QUFDQSxHQVZELEVBVUUsRUFBQ0csUUFBTyxFQUFSLEVBQVdDLEdBQUUsQ0FBYixFQVZGLEVBVW1CRDtBQVpwQixFQUREO0FBaUJBLENBdEJNOztrQkF3QlFkLEkiLCJmaWxlIjoibGluZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4vZ3JvdXBcIlxyXG5cclxuLypcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGluZSBleHRlbmRzIEdyb3Vwe1xyXG5cdHJlbmRlcigpe1xyXG5cdFx0Y29uc3Qge2hlaWdodCwgZGVzY2VudH09dGhpcy5wcm9wc1xyXG5cdFx0cmV0dXJuIDxHcm91cCB5PXtoZWlnaHQtZGVzY2VudH0gey4uLnRoaXMucHJvcHN9Lz5cclxuXHR9XHJcbn1cclxuKi9cclxuXHJcbmV4cG9ydCBjb25zdCBMaW5lPSh7Y2hpbGRyZW59KT0+e1xyXG5cdGNvbnN0IHdpZHRoPWNoaWxkcmVuLnJlZHVjZSgodyx7cHJvcHM6e3dpZHRofX0pPT53K3dpZHRoLDApXHJcblx0Y29uc3QgaGVpZ2h0PWNoaWxkcmVuLnJlZHVjZSgoaCx7cHJvcHM6e2hlaWdodH19KT0+TWF0aC5tYXgoaCxoZWlnaHQpLDApXHJcblx0Y29uc3QgZGVzY2VudD1jaGlsZHJlbi5yZWR1Y2UoKGgse3Byb3BzOntkZXNjZW50PTB9fSk9Pk1hdGgubWF4KGgsZGVzY2VudCksMClcclxuXHRcclxuXHRyZXR1cm4gKFxyXG5cdFx0PEdyb3VwIHk9e2hlaWdodC1kZXNjZW50fT5cclxuXHRcdHtcclxuXHRcdFx0Y2hpbGRyZW4ucmVkdWNlKChzdGF0ZSxwaWVjZSxpKT0+e1xyXG5cdFx0XHRcdGNvbnN0IHtwaWVjZXMseH09c3RhdGVcclxuXHRcdFx0XHRjb25zdCB7d2lkdGgsaGVpZ2h0fT1waWVjZS5wcm9wc1xyXG5cdFx0XHRcdHBpZWNlcy5wdXNoKFxyXG5cdFx0XHRcdFx0PEdyb3VwIHg9e3h9PlxyXG5cdFx0XHRcdFx0XHR7cGllY2V9XHJcblx0XHRcdFx0XHQ8L0dyb3VwPlxyXG5cdFx0XHRcdCk7XHJcblx0XHRcdFx0c3RhdGUueD14K3dpZHRoXHJcblx0XHRcdFx0cmV0dXJuIHN0YXRlXHJcblx0XHRcdH0se3BpZWNlczpbXSx4OjB9KS5waWVjZXNcclxuXHRcdH1cclxuXHRcdDwvR3JvdXA+XHJcblx0KVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMaW5lXHJcbiJdfQ==