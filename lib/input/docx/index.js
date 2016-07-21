"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Models = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _docx4js2 = require("docx4js");

var _docx4js3 = _interopRequireDefault(_docx4js2);

var _base = require("../base");

var _base2 = _interopRequireDefault(_base);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

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

var _list = require("./list");

var _list2 = _interopRequireDefault(_list);

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
		key: "load1",
		value: function load1(data) {
			return _docx4js3.default.load(data).then(function (docx) {
				var doc = void 0;
				return docx.parse(_docx4js3.default.createVisitorFactory(function (wordModel, targetParent) {
					if (wordModel.type && wordModel.type.substr(0, 6) == 'style.') {
						return targetParent.addStyle(wordModel, doc);
					} else if (targetParent) return targetParent.appendChild(wordModel, doc);else return doc = new _document2.default(wordModel);
				}));
			}).then(function (a) {
				console.log(a.toTag());
				return a;
			});
		}
	}, {
		key: "load",
		value: function load(data, domain) {
			return function (_docx4js) {
				_inherits(_class, _docx4js);

				function _class() {
					_classCallCheck(this, _class);

					return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
				}

				_createClass(_class, [{
					key: "onCreateElement",
					value: function onCreateElement(node, type) {
						var Content = domain.Any;
						switch (type) {
							case 'document':
								Content = domain.Document;
							case 'section':
								Content = domain.Section;
								break;
							case "r":
								Content = domain.Inline;
								break;
							case "t":
								Content = domain.Text;
								break;
							case "tbl":
								Content = domain.Table;
								break;
							case "tr":
								Content = domain.Row;
								break;
							case 'tc':
								Content = domain.Cell;
								break;
						}

						var attributes = node.attributes;
						var children = node.children;

						return _react2.default.createElement(Content, attributes, children);
					}
				}]);

				return _class;
			}(_docx4js3.default).load(data).then(function (docx) {
				return docx.parse().then(function (docx) {
					return {
						createReactElement: function createReactElement() {
							console.log(docx);
							return docx.children[0];
						}
					};
				});
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
	Table: _table2.default,
	List: _list2.default
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQXFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQXZFcUI7Ozs7Ozs7Ozs7O3dCQUtkLE1BQUs7QUFDVixVQUFPLGtCQUFRLElBQVIsQ0FBYSxJQUFiLEVBQW1CLElBQW5CLENBQXdCLGdCQUFNO0FBQ3BDLFFBQUksWUFBSixDQURvQztBQUVwQyxXQUFPLEtBQUssS0FBTCxDQUFXLGtCQUFRLG9CQUFSLENBQTZCLFVBQUMsU0FBRCxFQUFZLFlBQVosRUFBMkI7QUFDekUsU0FBRyxVQUFVLElBQVYsSUFBa0IsVUFBVSxJQUFWLENBQWUsTUFBZixDQUFzQixDQUF0QixFQUF3QixDQUF4QixLQUE0QixRQUE1QixFQUFxQztBQUN6RCxhQUFPLGFBQWEsUUFBYixDQUFzQixTQUF0QixFQUFnQyxHQUFoQyxDQUFQLENBRHlEO01BQTFELE1BRU0sSUFBRyxZQUFILEVBQ0wsT0FBTyxhQUFhLFdBQWIsQ0FBeUIsU0FBekIsRUFBbUMsR0FBbkMsQ0FBUCxDQURLLEtBR0wsT0FBTyxNQUFJLHVCQUFhLFNBQWIsQ0FBSixDQUhGO0tBSHdDLENBQXhDLENBQVAsQ0FGb0M7SUFBTixDQUF4QixDQVVKLElBVkksQ0FVQyxhQUFHO0FBQ1YsWUFBUSxHQUFSLENBQVksRUFBRSxLQUFGLEVBQVosRUFEVTtBQUVWLFdBQU8sQ0FBUCxDQUZVO0lBQUgsQ0FWUixDQURVOzs7O3VCQWlCTixNQUFNLFFBQU87QUFDakIsVUFBTzs7Ozs7Ozs7Ozs7cUNBQ1UsTUFBTSxNQUFLO0FBQzFCLFVBQUksVUFBUSxPQUFPLEdBQVAsQ0FEYztBQUUxQixjQUFPLElBQVA7QUFDQSxZQUFLLFVBQUw7QUFDQyxrQkFBUSxPQUFPLFFBQVAsQ0FEVDtBQURBLFlBR0ssU0FBTDtBQUNDLGtCQUFRLE9BQU8sT0FBUCxDQURUO0FBRUEsY0FGQTtBQUhBLFlBTUssR0FBTDtBQUNDLGtCQUFRLE9BQU8sTUFBUCxDQURUO0FBRUEsY0FGQTtBQU5BLFlBU0ssR0FBTDtBQUNDLGtCQUFRLE9BQU8sSUFBUCxDQURUO0FBRUEsY0FGQTtBQVRBLFlBWUssS0FBTDtBQUNDLGtCQUFRLE9BQU8sS0FBUCxDQURUO0FBRUEsY0FGQTtBQVpBLFlBZUssSUFBTDtBQUNDLGtCQUFRLE9BQU8sR0FBUCxDQURUO0FBRUEsY0FGQTtBQWZBLFlBa0JLLElBQUw7QUFDQyxrQkFBUSxPQUFPLElBQVAsQ0FEVDtBQUVBLGNBRkE7QUFsQkEsT0FGMEI7O1VBeUJuQixhQUFzQixLQUF0QixXQXpCbUI7VUF5QlAsV0FBVSxLQUFWLFNBekJPOztBQTBCMUIsYUFBTyxnQkFBTSxhQUFOLENBQW9CLE9BQXBCLEVBQTZCLFVBQTdCLEVBQXlDLFFBQXpDLENBQVAsQ0ExQjBCOzs7Ozt1QkFEckIsQ0E4QkosSUE5QkksQ0E4QkMsSUE5QkQsRUE4Qk8sSUE5QlAsQ0E4QlksZ0JBQU07QUFDeEIsV0FBTyxLQUFLLEtBQUwsR0FBYSxJQUFiLENBQWtCLGdCQUFNO0FBQzlCLFlBQU87QUFDTix3REFBb0I7QUFDbkIsZUFBUSxHQUFSLENBQVksSUFBWixFQURtQjtBQUVuQixjQUFPLEtBQUssUUFBTCxDQUFjLENBQWQsQ0FBUCxDQUZtQjtPQURkO01BQVAsQ0FEOEI7S0FBTixDQUF6QixDQUR3QjtJQUFOLENBOUJuQixDQURpQjs7OzswQkFyQkgsTUFBSztBQUNuQixVQUFPLElBQVAsQ0FEbUI7Ozs7UUFEQTs7OztBQXlFZCxJQUFJLDBCQUFPO0FBQ2pCLDZCQURpQjtBQUVoQiwyQkFGZ0I7QUFHaEIsdUJBSGdCO0FBSWhCLHFCQUpnQjtBQUtoQix1QkFMZ0I7QUFNaEIscUJBTmdCO0NBQVAiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZG9jeDRqcyBmcm9tIFwiZG9jeDRqc1wiXHJcbmltcG9ydCBCYXNlIGZyb20gXCIuLi9iYXNlXCJcclxuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9jeCBleHRlbmRzIEJhc2V7XHJcblx0c3RhdGljIHN1cHBvcnQoZmlsZSl7XHJcblx0XHRyZXR1cm4gdHJ1ZVxyXG5cdH1cclxuXHJcblx0bG9hZDEoZGF0YSl7XHJcblx0XHRyZXR1cm4gZG9jeDRqcy5sb2FkKGRhdGEpLnRoZW4oZG9jeD0+e1xyXG5cdFx0XHRsZXQgZG9jXHJcblx0XHRcdHJldHVybiBkb2N4LnBhcnNlKGRvY3g0anMuY3JlYXRlVmlzaXRvckZhY3RvcnkoKHdvcmRNb2RlbCwgdGFyZ2V0UGFyZW50KT0+e1xyXG5cdFx0XHRcdGlmKHdvcmRNb2RlbC50eXBlICYmIHdvcmRNb2RlbC50eXBlLnN1YnN0cigwLDYpPT0nc3R5bGUuJyl7XHJcblx0XHRcdFx0XHRyZXR1cm4gdGFyZ2V0UGFyZW50LmFkZFN0eWxlKHdvcmRNb2RlbCxkb2MpXHJcblx0XHRcdFx0fWVsc2UgaWYodGFyZ2V0UGFyZW50KVxyXG5cdFx0XHRcdFx0cmV0dXJuIHRhcmdldFBhcmVudC5hcHBlbmRDaGlsZCh3b3JkTW9kZWwsZG9jKVxyXG5cdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdHJldHVybiBkb2M9bmV3IERvY3VtZW50KHdvcmRNb2RlbClcclxuXHRcdFx0fSkpXHJcblx0XHR9KS50aGVuKGE9PntcclxuXHRcdFx0Y29uc29sZS5sb2coYS50b1RhZygpKVxyXG5cdFx0XHRyZXR1cm4gYVxyXG5cdFx0fSlcclxuXHR9XHJcblx0XHJcblx0bG9hZChkYXRhLCBkb21haW4pe1xyXG5cdFx0cmV0dXJuIChjbGFzcyBleHRlbmRzIGRvY3g0anN7XHJcblx0XHRcdG9uQ3JlYXRlRWxlbWVudChub2RlLCB0eXBlKXtcclxuXHRcdFx0XHRsZXQgQ29udGVudD1kb21haW4uQW55XHJcblx0XHRcdFx0c3dpdGNoKHR5cGUpe1xyXG5cdFx0XHRcdGNhc2UgJ2RvY3VtZW50JzpcclxuXHRcdFx0XHRcdENvbnRlbnQ9ZG9tYWluLkRvY3VtZW50XHJcblx0XHRcdFx0Y2FzZSAnc2VjdGlvbic6XHJcblx0XHRcdFx0XHRDb250ZW50PWRvbWFpbi5TZWN0aW9uXHJcblx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRjYXNlIFwiclwiOlxyXG5cdFx0XHRcdFx0Q29udGVudD1kb21haW4uSW5saW5lXHJcblx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRjYXNlIFwidFwiOlxyXG5cdFx0XHRcdFx0Q29udGVudD1kb21haW4uVGV4dFxyXG5cdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0Y2FzZSBcInRibFwiOlxyXG5cdFx0XHRcdFx0Q29udGVudD1kb21haW4uVGFibGVcclxuXHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdGNhc2UgXCJ0clwiOlxyXG5cdFx0XHRcdFx0Q29udGVudD1kb21haW4uUm93XHJcblx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRjYXNlICd0Yyc6XHJcblx0XHRcdFx0XHRDb250ZW50PWRvbWFpbi5DZWxsXHJcblx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0Y29uc3Qge2F0dHJpYnV0ZXMsIGNoaWxkcmVufT1ub2RlXHJcblx0XHRcdFx0cmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ29udGVudCwgYXR0cmlidXRlcywgY2hpbGRyZW4pXHJcblx0XHRcdH1cclxuXHRcdFxyXG5cdFx0fSkubG9hZChkYXRhKS50aGVuKGRvY3g9PntcclxuXHRcdFx0cmV0dXJuIGRvY3gucGFyc2UoKS50aGVuKGRvY3g9PntcclxuXHRcdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdFx0Y3JlYXRlUmVhY3RFbGVtZW50KCl7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKGRvY3gpXHJcblx0XHRcdFx0XHRcdHJldHVybiBkb2N4LmNoaWxkcmVuWzBdXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcbn1cclxuXHJcbmltcG9ydCBEb2N1bWVudCBmcm9tIFwiLi9kb2N1bWVudFwiXHJcbmltcG9ydCBTZWN0aW9uIGZyb20gXCIuL3NlY3Rpb25cIlxyXG5pbXBvcnQgSW1hZ2UgZnJvbSBcIi4vaW1hZ2VcIlxyXG5pbXBvcnQgVGV4dCBmcm9tIFwiLi90ZXh0XCJcclxuaW1wb3J0IFRhYmxlIGZyb20gXCIuL3RhYmxlXCJcclxuaW1wb3J0IExpc3QgZnJvbSBcIi4vbGlzdFwiXHJcblxyXG5leHBvcnQgbGV0IE1vZGVscz17XHJcblx0RG9jdW1lbnRcclxuXHQsU2VjdGlvblxyXG5cdCxJbWFnZVxyXG5cdCxUZXh0XHJcblx0LFRhYmxlXHJcblx0LExpc3RcclxufVxyXG4iXX0=