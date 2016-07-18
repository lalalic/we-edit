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

var _document = require("./document");

var _document2 = _interopRequireDefault(_document);

var _section = require("./section");

var _section2 = _interopRequireDefault(_section);

var _image = require("./image");

var _image2 = _interopRequireDefault(_image);

var _text = require("./text");

var _text2 = _interopRequireDefault(_text);

var _table = require("./table");

var _table2 = _interopRequireDefault(_table);

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
				var doc = void 0;
				return docx.parse(_docx4js2.default.createVisitorFactory(function (wordModel, targetParent) {
					if (wordModel.type && wordModel.type.substr(0, 6) == 'style.') {
						return targetParent.addStyle(wordModel, doc);
					} else if (targetParent) return targetParent.appendChild(wordModel, doc);else return doc = new _document2.default(wordModel);
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
	Document: _document2.default,
	Section: _section2.default,
	Image: _image2.default,
	Text: _text2.default,
	Table: _table2.default
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUF1QkE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBeEJxQjs7Ozs7Ozs7Ozs7dUJBS2YsTUFBSztBQUNULFVBQU8sa0JBQVEsSUFBUixDQUFhLElBQWIsRUFBbUIsSUFBbkIsQ0FBd0IsZ0JBQU07QUFDcEMsUUFBSSxZQUFKLENBRG9DO0FBRXBDLFdBQU8sS0FBSyxLQUFMLENBQVcsa0JBQVEsb0JBQVIsQ0FBNkIsVUFBQyxTQUFELEVBQVksWUFBWixFQUEyQjtBQUN6RSxTQUFHLFVBQVUsSUFBVixJQUFrQixVQUFVLElBQVYsQ0FBZSxNQUFmLENBQXNCLENBQXRCLEVBQXdCLENBQXhCLEtBQTRCLFFBQTVCLEVBQXFDO0FBQ3pELGFBQU8sYUFBYSxRQUFiLENBQXNCLFNBQXRCLEVBQWdDLEdBQWhDLENBQVAsQ0FEeUQ7TUFBMUQsTUFFTSxJQUFHLFlBQUgsRUFDTCxPQUFPLGFBQWEsV0FBYixDQUF5QixTQUF6QixFQUFtQyxHQUFuQyxDQUFQLENBREssS0FHTCxPQUFPLE1BQUksdUJBQWEsU0FBYixDQUFKLENBSEY7S0FId0MsQ0FBeEMsQ0FBUCxDQUZvQztJQUFOLENBQS9CLENBRFM7Ozs7MEJBSkssTUFBSztBQUNuQixVQUFPLElBQVAsQ0FEbUI7Ozs7UUFEQTs7OztBQTBCZCxJQUFJLDBCQUFPO0FBQ2pCLDZCQURpQjtBQUVoQiwyQkFGZ0I7QUFHaEIsdUJBSGdCO0FBSWhCLHFCQUpnQjtBQUtoQix1QkFMZ0I7Q0FBUCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkb2N4NGpzIGZyb20gXCJkb2N4NGpzXCJcclxuaW1wb3J0IEJhc2UgZnJvbSBcIi4uL2Jhc2VcIlxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvY3ggZXh0ZW5kcyBCYXNle1xyXG5cdHN0YXRpYyBzdXBwb3J0KGZpbGUpe1xyXG5cdFx0cmV0dXJuIHRydWVcclxuXHR9XHJcblx0XHJcblx0bG9hZChkYXRhKXtcclxuXHRcdHJldHVybiBkb2N4NGpzLmxvYWQoZGF0YSkudGhlbihkb2N4PT57XHJcblx0XHRcdGxldCBkb2NcclxuXHRcdFx0cmV0dXJuIGRvY3gucGFyc2UoZG9jeDRqcy5jcmVhdGVWaXNpdG9yRmFjdG9yeSgod29yZE1vZGVsLCB0YXJnZXRQYXJlbnQpPT57XHJcblx0XHRcdFx0aWYod29yZE1vZGVsLnR5cGUgJiYgd29yZE1vZGVsLnR5cGUuc3Vic3RyKDAsNik9PSdzdHlsZS4nKXtcclxuXHRcdFx0XHRcdHJldHVybiB0YXJnZXRQYXJlbnQuYWRkU3R5bGUod29yZE1vZGVsLGRvYylcclxuXHRcdFx0XHR9ZWxzZSBpZih0YXJnZXRQYXJlbnQpXHJcblx0XHRcdFx0XHRyZXR1cm4gdGFyZ2V0UGFyZW50LmFwcGVuZENoaWxkKHdvcmRNb2RlbCxkb2MpXHJcblx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0cmV0dXJuIGRvYz1uZXcgRG9jdW1lbnQod29yZE1vZGVsKVxyXG5cdFx0XHR9KSlcclxuXHRcdH0pXHJcblx0fVxyXG59XHJcblxyXG5pbXBvcnQgRG9jdW1lbnQgZnJvbSBcIi4vZG9jdW1lbnRcIlxyXG5pbXBvcnQgU2VjdGlvbiBmcm9tIFwiLi9zZWN0aW9uXCJcclxuaW1wb3J0IEltYWdlIGZyb20gXCIuL2ltYWdlXCJcclxuaW1wb3J0IFRleHQgZnJvbSBcIi4vdGV4dFwiXHJcbmltcG9ydCBUYWJsZSBmcm9tIFwiLi90YWJsZVwiXHJcblxyXG5leHBvcnQgbGV0IE1vZGVscz17XHJcblx0RG9jdW1lbnRcclxuXHQsU2VjdGlvblxyXG5cdCxJbWFnZVxyXG5cdCxUZXh0XHJcblx0LFRhYmxlXHJcbn1cclxuIl19