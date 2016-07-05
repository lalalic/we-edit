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
	Text: _text2.default
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUF1QkE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQXZCcUI7Ozs7Ozs7Ozs7O3VCQUtmLE1BQUs7QUFDVCxVQUFPLGtCQUFRLElBQVIsQ0FBYSxJQUFiLEVBQW1CLElBQW5CLENBQXdCLGdCQUFNO0FBQ3BDLFFBQUksWUFBSixDQURvQztBQUVwQyxXQUFPLEtBQUssS0FBTCxDQUFXLGtCQUFRLG9CQUFSLENBQTZCLFVBQUMsU0FBRCxFQUFZLFlBQVosRUFBMkI7QUFDekUsU0FBRyxVQUFVLElBQVYsSUFBa0IsVUFBVSxJQUFWLENBQWUsTUFBZixDQUFzQixDQUF0QixFQUF3QixDQUF4QixLQUE0QixRQUE1QixFQUFxQztBQUN6RCxhQUFPLGFBQWEsUUFBYixDQUFzQixTQUF0QixFQUFnQyxHQUFoQyxDQUFQLENBRHlEO01BQTFELE1BRU0sSUFBRyxZQUFILEVBQ0wsT0FBTyxhQUFhLFdBQWIsQ0FBeUIsU0FBekIsRUFBbUMsR0FBbkMsQ0FBUCxDQURLLEtBR0wsT0FBTyxNQUFJLHVCQUFhLFNBQWIsQ0FBSixDQUhGO0tBSHdDLENBQXhDLENBQVAsQ0FGb0M7SUFBTixDQUEvQixDQURTOzs7OzBCQUpLLE1BQUs7QUFDbkIsVUFBTyxJQUFQLENBRG1COzs7O1FBREE7Ozs7QUF5QmQsSUFBSSwwQkFBTztBQUNqQiw2QkFEaUI7QUFFaEIsMkJBRmdCO0FBR2hCLHVCQUhnQjtBQUloQixxQkFKZ0I7Q0FBUCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkb2N4NGpzIGZyb20gXCJkb2N4NGpzXCJcclxuaW1wb3J0IEJhc2UgZnJvbSBcIi4uL2Jhc2VcIlxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvY3ggZXh0ZW5kcyBCYXNle1xyXG5cdHN0YXRpYyBzdXBwb3J0KGZpbGUpe1xyXG5cdFx0cmV0dXJuIHRydWVcclxuXHR9XHJcblxyXG5cdGxvYWQoZGF0YSl7XHJcblx0XHRyZXR1cm4gZG9jeDRqcy5sb2FkKGRhdGEpLnRoZW4oZG9jeD0+e1xyXG5cdFx0XHRsZXQgZG9jXHJcblx0XHRcdHJldHVybiBkb2N4LnBhcnNlKGRvY3g0anMuY3JlYXRlVmlzaXRvckZhY3RvcnkoKHdvcmRNb2RlbCwgdGFyZ2V0UGFyZW50KT0+e1xyXG5cdFx0XHRcdGlmKHdvcmRNb2RlbC50eXBlICYmIHdvcmRNb2RlbC50eXBlLnN1YnN0cigwLDYpPT0nc3R5bGUuJyl7XHJcblx0XHRcdFx0XHRyZXR1cm4gdGFyZ2V0UGFyZW50LmFkZFN0eWxlKHdvcmRNb2RlbCxkb2MpXHJcblx0XHRcdFx0fWVsc2UgaWYodGFyZ2V0UGFyZW50KVxyXG5cdFx0XHRcdFx0cmV0dXJuIHRhcmdldFBhcmVudC5hcHBlbmRDaGlsZCh3b3JkTW9kZWwsZG9jKVxyXG5cdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdHJldHVybiBkb2M9bmV3IERvY3VtZW50KHdvcmRNb2RlbClcclxuXHRcdFx0fSkpXHJcblx0XHR9KVxyXG5cdH1cclxufVxyXG5cclxuaW1wb3J0IERvY3VtZW50IGZyb20gXCIuL2RvY3VtZW50XCJcclxuaW1wb3J0IFNlY3Rpb24gZnJvbSBcIi4vc2VjdGlvblwiXHJcbmltcG9ydCBJbWFnZSBmcm9tIFwiLi9pbWFnZVwiXHJcbmltcG9ydCBUZXh0IGZyb20gXCIuL3RleHRcIlxyXG5cclxuZXhwb3J0IGxldCBNb2RlbHM9e1xyXG5cdERvY3VtZW50XHJcblx0LFNlY3Rpb25cclxuXHQsSW1hZ2VcclxuXHQsVGV4dFxyXG59XHJcbiJdfQ==