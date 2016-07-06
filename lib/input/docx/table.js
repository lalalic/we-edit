'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _any = require('./any');

var _any2 = _interopRequireDefault(_any);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Model) {
	_inherits(_class, _Model);

	function _class() {
		_classCallCheck(this, _class);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
	}

	_createClass(_class, [{
		key: 'visit',
		value: function visit() {
			var _wordModel$getColWidt = this.wordModel.getColWidth();

			var sum = _wordModel$getColWidt.sum;
			var cols = _wordModel$getColWidt.cols;

			Object.assign(this.contentProps, { cols: cols, width: sum });
		}
	}]);

	return _class;
}(_any2.default);

exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L3RhYmxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBCQUdROytCQUNZLEtBQUssU0FBTCxDQUFlLFdBQWYsR0FEWjs7T0FDQyxnQ0FERDtPQUNNLGtDQUROOztBQUVOLFVBQU8sTUFBUCxDQUFjLEtBQUssWUFBTCxFQUFrQixFQUFDLFVBQUQsRUFBTyxPQUFNLEdBQU4sRUFBdkMsRUFGTSIsImZpbGUiOiJ0YWJsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNb2RlbCBmcm9tICcuL2FueSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgTW9kZWx7XHJcblx0dmlzaXQoKXtcclxuXHRcdGNvbnN0IHtzdW0sIGNvbHN9PXRoaXMud29yZE1vZGVsLmdldENvbFdpZHRoKClcclxuXHRcdE9iamVjdC5hc3NpZ24odGhpcy5jb250ZW50UHJvcHMse2NvbHMsIHdpZHRoOnN1bX0pXHJcblx0fVxyXG59XHJcbiJdfQ==