"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Models = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _docx4js = require("docx4js");

var _docx4js2 = _interopRequireDefault(_docx4js);

var _base = require("../base");

var _base2 = _interopRequireDefault(_base);

var _any = require("./any");

var _any2 = _interopRequireDefault(_any);

var _image = require("./image");

var _image2 = _interopRequireDefault(_image);

var _text = require("./text");

var _text2 = _interopRequireDefault(_text);

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
				return docx.parse(_docx4js2.default.createVisitorFactory(function (srcModel, targetParent) {
					if (targetParent) return targetParent.appendChild(srcModel);else return new _any2.default(srcModel);
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
var Models = exports.Models = {
	Image: _image2.default,
	Text: _text2.default
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQW1CQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFsQnFCOzs7Ozs7Ozs7Ozt1QkFLZixNQUFLO0FBQ1QsVUFBTyxrQkFBUSxJQUFSLENBQWEsSUFBYixFQUFtQixJQUFuQixDQUF3QixnQkFBTTtBQUNwQyxXQUFPLEtBQUssS0FBTCxDQUFXLGtCQUFRLG9CQUFSLENBQTZCLFVBQUMsUUFBRCxFQUFXLFlBQVgsRUFBMEI7QUFDeEUsU0FBRyxZQUFILEVBQ0MsT0FBTyxhQUFhLFdBQWIsQ0FBeUIsUUFBekIsQ0FBUCxDQURELEtBR0MsT0FBTyxrQkFBVSxRQUFWLENBQVAsQ0FIRDtLQUQ4QyxDQUF4QyxDQUFQLENBRG9DO0lBQU4sQ0FBL0IsQ0FEUzs7OzswQkFKSyxNQUFLO0FBQ25CLFVBQU8sSUFBUCxDQURtQjs7OztRQURBOzs7O0FBb0JkLElBQUksMEJBQU87QUFDakIsdUJBRGlCO0FBRWhCLHFCQUZnQjtDQUFQIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRvY3g0anMgZnJvbSBcImRvY3g0anNcIlxyXG5pbXBvcnQgQmFzZSBmcm9tIFwiLi4vYmFzZVwiXHJcbmltcG9ydCBNb2RlbCBmcm9tIFwiLi9hbnlcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9jeCBleHRlbmRzIEJhc2V7XHJcblx0c3RhdGljIHN1cHBvcnQoZmlsZSl7XHJcblx0XHRyZXR1cm4gdHJ1ZVxyXG5cdH1cclxuXHJcblx0bG9hZChkYXRhKXtcclxuXHRcdHJldHVybiBkb2N4NGpzLmxvYWQoZGF0YSkudGhlbihkb2N4PT57XHJcblx0XHRcdHJldHVybiBkb2N4LnBhcnNlKGRvY3g0anMuY3JlYXRlVmlzaXRvckZhY3RvcnkoKHNyY01vZGVsLCB0YXJnZXRQYXJlbnQpPT57XHJcblx0XHRcdFx0aWYodGFyZ2V0UGFyZW50KVxyXG5cdFx0XHRcdFx0cmV0dXJuIHRhcmdldFBhcmVudC5hcHBlbmRDaGlsZChzcmNNb2RlbClcclxuXHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRyZXR1cm4gbmV3IE1vZGVsKHNyY01vZGVsKVxyXG5cdFx0XHR9KSlcclxuXHRcdH0pXHJcblx0fVxyXG59XHJcblxyXG5pbXBvcnQgSW1hZ2UgZnJvbSBcIi4vaW1hZ2VcIlxyXG5pbXBvcnQgVGV4dCBmcm9tIFwiLi90ZXh0XCJcclxuXHJcbmV4cG9ydCBsZXQgTW9kZWxzPXtcclxuXHRJbWFnZVxyXG5cdCxUZXh0XHJcbn1cclxuIl19