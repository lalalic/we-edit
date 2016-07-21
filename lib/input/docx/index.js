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
		value: function load1(data, domain) {
			return _docx4js3.default.load(data).then(function (docx) {
				var doc = void 0;
				return docx.parse(_docx4js3.default.createVisitorFactory(function (wordModel, targetParent) {
					if (wordModel.type && wordModel.type.substr(0, 6) == 'style.') {
						return targetParent.addStyle(wordModel, doc);
					} else if (targetParent) return targetParent.appendChild(wordModel, doc);else return doc = new _document2.default(wordModel);
				}));
			}).then(function (doc) {
				console.log(doc.toTag());
				return doc.createReactElement(domain);
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
					console.log(docx);
					return docx.props.children[0];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQStEQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQWpFcUI7Ozs7Ozs7Ozs7O3dCQUtkLE1BQU0sUUFBTztBQUNsQixVQUFPLGtCQUFRLElBQVIsQ0FBYSxJQUFiLEVBQW1CLElBQW5CLENBQXdCLGdCQUFNO0FBQ3BDLFFBQUksWUFBSixDQURvQztBQUVwQyxXQUFPLEtBQUssS0FBTCxDQUFXLGtCQUFRLG9CQUFSLENBQTZCLFVBQUMsU0FBRCxFQUFZLFlBQVosRUFBMkI7QUFDekUsU0FBRyxVQUFVLElBQVYsSUFBa0IsVUFBVSxJQUFWLENBQWUsTUFBZixDQUFzQixDQUF0QixFQUF3QixDQUF4QixLQUE0QixRQUE1QixFQUFxQztBQUN6RCxhQUFPLGFBQWEsUUFBYixDQUFzQixTQUF0QixFQUFnQyxHQUFoQyxDQUFQLENBRHlEO01BQTFELE1BRU0sSUFBRyxZQUFILEVBQ0wsT0FBTyxhQUFhLFdBQWIsQ0FBeUIsU0FBekIsRUFBbUMsR0FBbkMsQ0FBUCxDQURLLEtBR0wsT0FBTyxNQUFJLHVCQUFhLFNBQWIsQ0FBSixDQUhGO0tBSHdDLENBQXhDLENBQVAsQ0FGb0M7SUFBTixDQUF4QixDQVVKLElBVkksQ0FVQyxlQUFLO0FBQ1osWUFBUSxHQUFSLENBQVksSUFBSSxLQUFKLEVBQVosRUFEWTtBQUVaLFdBQU8sSUFBSSxrQkFBSixDQUF1QixNQUF2QixDQUFQLENBRlk7SUFBTCxDQVZSLENBRGtCOzs7O3VCQWlCZCxNQUFNLFFBQU87QUFDakIsVUFBTzs7Ozs7Ozs7Ozs7cUNBQ1UsTUFBTSxNQUFLO0FBQzFCLFVBQUksVUFBUSxPQUFPLEdBQVAsQ0FEYztBQUUxQixjQUFPLElBQVA7QUFDQSxZQUFLLFVBQUw7QUFDQyxrQkFBUSxPQUFPLFFBQVAsQ0FEVDtBQURBLFlBR0ssU0FBTDtBQUNDLGtCQUFRLE9BQU8sT0FBUCxDQURUO0FBRUEsY0FGQTtBQUhBLFlBTUssR0FBTDtBQUNDLGtCQUFRLE9BQU8sTUFBUCxDQURUO0FBRUEsY0FGQTtBQU5BLFlBU0ssR0FBTDtBQUNDLGtCQUFRLE9BQU8sSUFBUCxDQURUO0FBRUEsY0FGQTtBQVRBLFlBWUssS0FBTDtBQUNDLGtCQUFRLE9BQU8sS0FBUCxDQURUO0FBRUEsY0FGQTtBQVpBLFlBZUssSUFBTDtBQUNDLGtCQUFRLE9BQU8sR0FBUCxDQURUO0FBRUEsY0FGQTtBQWZBLFlBa0JLLElBQUw7QUFDQyxrQkFBUSxPQUFPLElBQVAsQ0FEVDtBQUVBLGNBRkE7QUFsQkEsT0FGMEI7O1VBeUJuQixhQUFzQixLQUF0QixXQXpCbUI7VUF5QlAsV0FBVSxLQUFWLFNBekJPOztBQTBCMUIsYUFBTyxnQkFBTSxhQUFOLENBQW9CLE9BQXBCLEVBQTZCLFVBQTdCLEVBQXlDLFFBQXpDLENBQVAsQ0ExQjBCOzs7Ozt1QkFEckIsQ0E4QkosSUE5QkksQ0E4QkMsSUE5QkQsRUE4Qk8sSUE5QlAsQ0E4Qlk7V0FBTSxLQUFLLEtBQUwsR0FBYSxJQUFiLENBQWtCLGdCQUFNO0FBQ2hELGFBQVEsR0FBUixDQUFZLElBQVosRUFEZ0Q7QUFFaEQsWUFBTyxLQUFLLEtBQUwsQ0FBVyxRQUFYLENBQW9CLENBQXBCLENBQVAsQ0FGZ0Q7S0FBTjtJQUF4QixDQTlCbkIsQ0FEaUI7Ozs7MEJBckJILE1BQUs7QUFDbkIsVUFBTyxJQUFQLENBRG1COzs7O1FBREE7Ozs7QUFtRWQsSUFBSSwwQkFBTztBQUNqQiw2QkFEaUI7QUFFaEIsMkJBRmdCO0FBR2hCLHVCQUhnQjtBQUloQixxQkFKZ0I7QUFLaEIsdUJBTGdCO0FBTWhCLHFCQU5nQjtDQUFQIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRvY3g0anMgZnJvbSBcImRvY3g0anNcIlxyXG5pbXBvcnQgQmFzZSBmcm9tIFwiLi4vYmFzZVwiXHJcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvY3ggZXh0ZW5kcyBCYXNle1xyXG5cdHN0YXRpYyBzdXBwb3J0KGZpbGUpe1xyXG5cdFx0cmV0dXJuIHRydWVcclxuXHR9XHJcblxyXG5cdGxvYWQxKGRhdGEsIGRvbWFpbil7XHJcblx0XHRyZXR1cm4gZG9jeDRqcy5sb2FkKGRhdGEpLnRoZW4oZG9jeD0+e1xyXG5cdFx0XHRsZXQgZG9jXHJcblx0XHRcdHJldHVybiBkb2N4LnBhcnNlKGRvY3g0anMuY3JlYXRlVmlzaXRvckZhY3RvcnkoKHdvcmRNb2RlbCwgdGFyZ2V0UGFyZW50KT0+e1xyXG5cdFx0XHRcdGlmKHdvcmRNb2RlbC50eXBlICYmIHdvcmRNb2RlbC50eXBlLnN1YnN0cigwLDYpPT0nc3R5bGUuJyl7XHJcblx0XHRcdFx0XHRyZXR1cm4gdGFyZ2V0UGFyZW50LmFkZFN0eWxlKHdvcmRNb2RlbCxkb2MpXHJcblx0XHRcdFx0fWVsc2UgaWYodGFyZ2V0UGFyZW50KVxyXG5cdFx0XHRcdFx0cmV0dXJuIHRhcmdldFBhcmVudC5hcHBlbmRDaGlsZCh3b3JkTW9kZWwsZG9jKVxyXG5cdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdHJldHVybiBkb2M9bmV3IERvY3VtZW50KHdvcmRNb2RlbClcclxuXHRcdFx0fSkpXHJcblx0XHR9KS50aGVuKGRvYz0+e1xyXG5cdFx0XHRjb25zb2xlLmxvZyhkb2MudG9UYWcoKSlcclxuXHRcdFx0cmV0dXJuIGRvYy5jcmVhdGVSZWFjdEVsZW1lbnQoZG9tYWluKVxyXG5cdFx0fSlcclxuXHR9XHJcblx0XHJcblx0bG9hZChkYXRhLCBkb21haW4pe1xyXG5cdFx0cmV0dXJuIChjbGFzcyBleHRlbmRzIGRvY3g0anN7XHJcblx0XHRcdG9uQ3JlYXRlRWxlbWVudChub2RlLCB0eXBlKXtcclxuXHRcdFx0XHRsZXQgQ29udGVudD1kb21haW4uQW55XHJcblx0XHRcdFx0c3dpdGNoKHR5cGUpe1xyXG5cdFx0XHRcdGNhc2UgJ2RvY3VtZW50JzpcclxuXHRcdFx0XHRcdENvbnRlbnQ9ZG9tYWluLkRvY3VtZW50XHJcblx0XHRcdFx0Y2FzZSAnc2VjdGlvbic6XHJcblx0XHRcdFx0XHRDb250ZW50PWRvbWFpbi5TZWN0aW9uXHJcblx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRjYXNlIFwiclwiOlxyXG5cdFx0XHRcdFx0Q29udGVudD1kb21haW4uSW5saW5lXHJcblx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRjYXNlIFwidFwiOlxyXG5cdFx0XHRcdFx0Q29udGVudD1kb21haW4uVGV4dFxyXG5cdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0Y2FzZSBcInRibFwiOlxyXG5cdFx0XHRcdFx0Q29udGVudD1kb21haW4uVGFibGVcclxuXHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdGNhc2UgXCJ0clwiOlxyXG5cdFx0XHRcdFx0Q29udGVudD1kb21haW4uUm93XHJcblx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRjYXNlICd0Yyc6XHJcblx0XHRcdFx0XHRDb250ZW50PWRvbWFpbi5DZWxsXHJcblx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0Y29uc3Qge2F0dHJpYnV0ZXMsIGNoaWxkcmVufT1ub2RlXHJcblx0XHRcdFx0cmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ29udGVudCwgYXR0cmlidXRlcywgY2hpbGRyZW4pXHJcblx0XHRcdH1cclxuXHRcdFxyXG5cdFx0fSkubG9hZChkYXRhKS50aGVuKGRvY3g9PmRvY3gucGFyc2UoKS50aGVuKGRvY3g9PntcclxuXHRcdFx0Y29uc29sZS5sb2coZG9jeClcclxuXHRcdFx0cmV0dXJuIGRvY3gucHJvcHMuY2hpbGRyZW5bMF1cclxuXHRcdH0pKVxyXG5cdH1cclxufVxyXG5cclxuaW1wb3J0IERvY3VtZW50IGZyb20gXCIuL2RvY3VtZW50XCJcclxuaW1wb3J0IFNlY3Rpb24gZnJvbSBcIi4vc2VjdGlvblwiXHJcbmltcG9ydCBJbWFnZSBmcm9tIFwiLi9pbWFnZVwiXHJcbmltcG9ydCBUZXh0IGZyb20gXCIuL3RleHRcIlxyXG5pbXBvcnQgVGFibGUgZnJvbSBcIi4vdGFibGVcIlxyXG5pbXBvcnQgTGlzdCBmcm9tIFwiLi9saXN0XCJcclxuXHJcbmV4cG9ydCBsZXQgTW9kZWxzPXtcclxuXHREb2N1bWVudFxyXG5cdCxTZWN0aW9uXHJcblx0LEltYWdlXHJcblx0LFRleHRcclxuXHQsVGFibGVcclxuXHQsTGlzdFxyXG59XHJcbiJdfQ==