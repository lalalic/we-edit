"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _docx4js = require("docx4js");

var _docx4js2 = _interopRequireDefault(_docx4js);

var _base = require("../base");

var _base2 = _interopRequireDefault(_base);

var _any = require("./any");

var _any2 = _interopRequireDefault(_any);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Docx = function (_Base) {
	_inherits(Docx, _Base);

	function Docx() {
		_classCallCheck(this, Docx);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Docx).apply(this, arguments));
	}

	_createClass(Docx, [{
		key: "load",
		value: function load(data) {
			return _docx4js2.default.load(data).then(function (docx) {
				var currentParent = null;
				return docx.parse(_docx4js2.default.createVisitorFactory(function (srcModel, targetParent) {
					if (targetParent) return currentParent = currentParent.appendChild(srcModel, targetParent);else return currentParent = new _any2.default(srcModel);
				}));
			});
		}
	}], [{
		key: "support",
		value: function support(file) {
			return true;
		}
	}]);

	return Docx;
}(_base2.default);

exports.default = Docx;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7O3VCQUtmLE1BQUs7QUFDVCxVQUFPLGtCQUFRLElBQVIsQ0FBYSxJQUFiLEVBQW1CLElBQW5CLENBQXdCLGdCQUFNO0FBQ3BDLFFBQUksZ0JBQWMsSUFBZCxDQURnQztBQUVwQyxXQUFPLEtBQUssS0FBTCxDQUFXLGtCQUFRLG9CQUFSLENBQTZCLFVBQUMsUUFBRCxFQUFXLFlBQVgsRUFBMEI7QUFDeEUsU0FBRyxZQUFILEVBQ0MsT0FBTyxnQkFBYyxjQUFjLFdBQWQsQ0FBMEIsUUFBMUIsRUFBb0MsWUFBcEMsQ0FBZCxDQURSLEtBR0MsT0FBTyxnQkFBYyxrQkFBVSxRQUFWLENBQWQsQ0FIUjtLQUQ4QyxDQUF4QyxDQUFQLENBRm9DO0lBQU4sQ0FBL0IsQ0FEUzs7OzswQkFKSyxNQUFLO0FBQ25CLFVBQU8sSUFBUCxDQURtQjs7OztRQURBIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRvY3g0anMgZnJvbSBcImRvY3g0anNcIlxyXG5pbXBvcnQgQmFzZSBmcm9tIFwiLi4vYmFzZVwiXHJcblxyXG5pbXBvcnQgTW9kZWwgZnJvbSBcIi4vYW55XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvY3ggZXh0ZW5kcyBCYXNle1xyXG5cdHN0YXRpYyBzdXBwb3J0KGZpbGUpe1xyXG5cdFx0cmV0dXJuIHRydWVcclxuXHR9XHJcblx0XHJcblx0bG9hZChkYXRhKXtcclxuXHRcdHJldHVybiBkb2N4NGpzLmxvYWQoZGF0YSkudGhlbihkb2N4PT57XHJcblx0XHRcdGxldCBjdXJyZW50UGFyZW50PW51bGxcclxuXHRcdFx0cmV0dXJuIGRvY3gucGFyc2UoZG9jeDRqcy5jcmVhdGVWaXNpdG9yRmFjdG9yeSgoc3JjTW9kZWwsIHRhcmdldFBhcmVudCk9PntcclxuXHRcdFx0XHRpZih0YXJnZXRQYXJlbnQpXHJcblx0XHRcdFx0XHRyZXR1cm4gY3VycmVudFBhcmVudD1jdXJyZW50UGFyZW50LmFwcGVuZENoaWxkKHNyY01vZGVsLCB0YXJnZXRQYXJlbnQpXHJcblx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0cmV0dXJuIGN1cnJlbnRQYXJlbnQ9bmV3IE1vZGVsKHNyY01vZGVsKVxyXG5cdFx0XHR9KSlcclxuXHRcdH0pXHJcblx0fVxyXG59ICJdfQ==