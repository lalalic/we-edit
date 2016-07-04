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
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7O3VCQUtmLE1BQUs7QUFDVCxVQUFPLGtCQUFRLElBQVIsQ0FBYSxJQUFiLEVBQW1CLElBQW5CLENBQXdCLGdCQUFNO0FBQ3BDLFdBQU8sS0FBSyxLQUFMLENBQVcsa0JBQVEsb0JBQVIsQ0FBNkIsVUFBQyxRQUFELEVBQVcsWUFBWCxFQUEwQjtBQUN4RSxTQUFHLFlBQUgsRUFDQyxPQUFPLGFBQWEsV0FBYixDQUF5QixRQUF6QixDQUFQLENBREQsS0FHQyxPQUFPLGtCQUFVLFFBQVYsQ0FBUCxDQUhEO0tBRDhDLENBQXhDLENBQVAsQ0FEb0M7SUFBTixDQUEvQixDQURTOzs7OzBCQUpLLE1BQUs7QUFDbkIsVUFBTyxJQUFQLENBRG1COzs7O1FBREEiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZG9jeDRqcyBmcm9tIFwiZG9jeDRqc1wiXHJcbmltcG9ydCBCYXNlIGZyb20gXCIuLi9iYXNlXCJcclxuXHJcbmltcG9ydCBNb2RlbCBmcm9tIFwiLi9hbnlcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9jeCBleHRlbmRzIEJhc2V7XHJcblx0c3RhdGljIHN1cHBvcnQoZmlsZSl7XHJcblx0XHRyZXR1cm4gdHJ1ZVxyXG5cdH1cclxuXHJcblx0bG9hZChkYXRhKXtcclxuXHRcdHJldHVybiBkb2N4NGpzLmxvYWQoZGF0YSkudGhlbihkb2N4PT57XHJcblx0XHRcdHJldHVybiBkb2N4LnBhcnNlKGRvY3g0anMuY3JlYXRlVmlzaXRvckZhY3RvcnkoKHNyY01vZGVsLCB0YXJnZXRQYXJlbnQpPT57XHJcblx0XHRcdFx0aWYodGFyZ2V0UGFyZW50KVxyXG5cdFx0XHRcdFx0cmV0dXJuIHRhcmdldFBhcmVudC5hcHBlbmRDaGlsZChzcmNNb2RlbClcclxuXHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRyZXR1cm4gbmV3IE1vZGVsKHNyY01vZGVsKVxyXG5cdFx0XHR9KSlcclxuXHRcdH0pXHJcblx0fVxyXG59XHJcbiJdfQ==