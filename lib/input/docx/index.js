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
						var attributes = node.attributes;
						var children = node.children;

						var Content = null;
						switch (type) {
							case 'docx':
								Content = domain.Any;
								break;
							case 'document':
								Content = domain.Document;
								break;
							case 'section':
								Content = domain.Section;
								break;
							case 'p':
								Content = domain.Paragraph;
								break;
							case "r":
								Content = function (_domain$Inline) {
									_inherits(Content, _domain$Inline);

									function Content() {
										_classCallCheck(this, Content);

										return _possibleConstructorReturn(this, Object.getPrototypeOf(Content).apply(this, arguments));
									}

									_createClass(Content, [{
										key: "defaultStyle",
										get: function get() {
											return this.context.getDefaultStyle('character');
										}
									}]);

									return Content;
								}(domain.Inline);
								break;
							case "t":
								Content = function (_domain$Text) {
									_inherits(Content, _domain$Text);

									function Content() {
										_classCallCheck(this, Content);

										return _possibleConstructorReturn(this, Object.getPrototypeOf(Content).apply(this, arguments));
									}

									return Content;
								}(domain.Text);
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
							case 'list':
								Content = domain.Cell;
								break;
						}

						if (Content) {
							return _react2.default.createElement(Content, attributes, children);
						} else {
							console.warn(type + " is not identified");

							return null;
						}
					}
				}]);

				return _class;
			}(_docx4js3.default).load(data).then(function (docx) {
				return docx.parse().then(function (docx) {
					console.log(docx);
					return docx;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQXFGQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQXZGcUI7Ozs7Ozs7Ozs7O3dCQUtkLE1BQU0sUUFBTztBQUNsQixVQUFPLGtCQUFRLElBQVIsQ0FBYSxJQUFiLEVBQW1CLElBQW5CLENBQXdCLGdCQUFNO0FBQ3BDLFFBQUksWUFBSixDQURvQztBQUVwQyxXQUFPLEtBQUssS0FBTCxDQUFXLGtCQUFRLG9CQUFSLENBQTZCLFVBQUMsU0FBRCxFQUFZLFlBQVosRUFBMkI7QUFDekUsU0FBRyxVQUFVLElBQVYsSUFBa0IsVUFBVSxJQUFWLENBQWUsTUFBZixDQUFzQixDQUF0QixFQUF3QixDQUF4QixLQUE0QixRQUE1QixFQUFxQztBQUN6RCxhQUFPLGFBQWEsUUFBYixDQUFzQixTQUF0QixFQUFnQyxHQUFoQyxDQUFQLENBRHlEO01BQTFELE1BRU0sSUFBRyxZQUFILEVBQ0wsT0FBTyxhQUFhLFdBQWIsQ0FBeUIsU0FBekIsRUFBbUMsR0FBbkMsQ0FBUCxDQURLLEtBR0wsT0FBTyxNQUFJLHVCQUFhLFNBQWIsQ0FBSixDQUhGO0tBSHdDLENBQXhDLENBQVAsQ0FGb0M7SUFBTixDQUF4QixDQVVKLElBVkksQ0FVQyxlQUFLO0FBQ1osWUFBUSxHQUFSLENBQVksSUFBSSxLQUFKLEVBQVosRUFEWTtBQUVaLFdBQU8sSUFBSSxrQkFBSixDQUF1QixNQUF2QixDQUFQLENBRlk7SUFBTCxDQVZSLENBRGtCOzs7O3VCQWlCZCxNQUFNLFFBQU87QUFDakIsVUFBTzs7Ozs7Ozs7Ozs7cUNBQ1UsTUFBTSxNQUFLO1VBQ3JCLGFBQXNCLEtBQXRCLFdBRHFCO1VBQ1QsV0FBVSxLQUFWLFNBRFM7O0FBRTFCLFVBQUksVUFBUSxJQUFSLENBRnNCO0FBRzFCLGNBQU8sSUFBUDtBQUNBLFlBQUssTUFBTDtBQUNDLGtCQUFRLE9BQU8sR0FBUCxDQURUO0FBRUEsY0FGQTtBQURBLFlBSUssVUFBTDtBQUNDLGtCQUFRLE9BQU8sUUFBUCxDQURUO0FBRUEsY0FGQTtBQUpBLFlBT0ssU0FBTDtBQUNDLGtCQUFRLE9BQU8sT0FBUCxDQURUO0FBRUEsY0FGQTtBQVBBLFlBVUssR0FBTDtBQUNDLGtCQUFRLE9BQU8sU0FBUCxDQURUO0FBRUEsY0FGQTtBQVZBLFlBYUssR0FBTDtBQUNDOzs7Ozs7Ozs7Ozs4QkFDbUI7QUFDakIsa0JBQU8sS0FBSyxPQUFMLENBQWEsZUFBYixDQUE2QixXQUE3QixDQUFQLENBRGlCOzs7OztVQURHLE9BQU8sTUFBUCxDQUF0QixDQUREO0FBTUEsY0FOQTtBQWJBLFlBb0JLLEdBQUw7QUFDQzs7Ozs7Ozs7OztVQUFzQixPQUFPLElBQVAsQ0FBdEIsQ0FERDtBQUlBLGNBSkE7QUFwQkEsWUF5QkssS0FBTDtBQUNDLGtCQUFRLE9BQU8sS0FBUCxDQURUO0FBRUEsY0FGQTtBQXpCQSxZQTRCSyxJQUFMO0FBQ0Msa0JBQVEsT0FBTyxHQUFQLENBRFQ7QUFFQSxjQUZBO0FBNUJBLFlBK0JLLElBQUw7QUFDQyxrQkFBUSxPQUFPLElBQVAsQ0FEVDtBQUVBLGNBRkE7QUEvQkEsWUFrQ0ssTUFBTDtBQUNDLGtCQUFRLE9BQU8sSUFBUCxDQURUO0FBRUEsY0FGQTtBQWxDQSxPQUgwQjs7QUEwQzFCLFVBQUcsT0FBSCxFQUFXO0FBQ1YsY0FBTyxnQkFBTSxhQUFOLENBQW9CLE9BQXBCLEVBQTZCLFVBQTdCLEVBQXlDLFFBQXpDLENBQVAsQ0FEVTtPQUFYLE1BRUs7QUFDSixlQUFRLElBQVIsQ0FBZ0IsMkJBQWhCLEVBREk7O0FBR0osY0FBTyxJQUFQLENBSEk7T0FGTDs7Ozs7dUJBM0NLLENBb0RKLElBcERJLENBb0RDLElBcERELEVBb0RPLElBcERQLENBb0RZO1dBQU0sS0FBSyxLQUFMLEdBQWEsSUFBYixDQUFrQixnQkFBTTtBQUNoRCxhQUFRLEdBQVIsQ0FBWSxJQUFaLEVBRGdEO0FBRWhELFlBQU8sSUFBUCxDQUZnRDtLQUFOO0lBQXhCLENBcERuQixDQURpQjs7OzswQkFyQkgsTUFBSztBQUNuQixVQUFPLElBQVAsQ0FEbUI7Ozs7UUFEQTs7OztBQXlGZCxJQUFJLDBCQUFPO0FBQ2pCLDZCQURpQjtBQUVoQiwyQkFGZ0I7QUFHaEIsdUJBSGdCO0FBSWhCLHFCQUpnQjtBQUtoQix1QkFMZ0I7QUFNaEIscUJBTmdCO0NBQVAiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZG9jeDRqcyBmcm9tIFwiZG9jeDRqc1wiXHJcbmltcG9ydCBCYXNlIGZyb20gXCIuLi9iYXNlXCJcclxuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9jeCBleHRlbmRzIEJhc2V7XHJcblx0c3RhdGljIHN1cHBvcnQoZmlsZSl7XHJcblx0XHRyZXR1cm4gdHJ1ZVxyXG5cdH1cclxuXHJcblx0bG9hZDEoZGF0YSwgZG9tYWluKXtcclxuXHRcdHJldHVybiBkb2N4NGpzLmxvYWQoZGF0YSkudGhlbihkb2N4PT57XHJcblx0XHRcdGxldCBkb2NcclxuXHRcdFx0cmV0dXJuIGRvY3gucGFyc2UoZG9jeDRqcy5jcmVhdGVWaXNpdG9yRmFjdG9yeSgod29yZE1vZGVsLCB0YXJnZXRQYXJlbnQpPT57XHJcblx0XHRcdFx0aWYod29yZE1vZGVsLnR5cGUgJiYgd29yZE1vZGVsLnR5cGUuc3Vic3RyKDAsNik9PSdzdHlsZS4nKXtcclxuXHRcdFx0XHRcdHJldHVybiB0YXJnZXRQYXJlbnQuYWRkU3R5bGUod29yZE1vZGVsLGRvYylcclxuXHRcdFx0XHR9ZWxzZSBpZih0YXJnZXRQYXJlbnQpXHJcblx0XHRcdFx0XHRyZXR1cm4gdGFyZ2V0UGFyZW50LmFwcGVuZENoaWxkKHdvcmRNb2RlbCxkb2MpXHJcblx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0cmV0dXJuIGRvYz1uZXcgRG9jdW1lbnQod29yZE1vZGVsKVxyXG5cdFx0XHR9KSlcclxuXHRcdH0pLnRoZW4oZG9jPT57XHJcblx0XHRcdGNvbnNvbGUubG9nKGRvYy50b1RhZygpKVxyXG5cdFx0XHRyZXR1cm4gZG9jLmNyZWF0ZVJlYWN0RWxlbWVudChkb21haW4pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRcclxuXHRsb2FkKGRhdGEsIGRvbWFpbil7XHJcblx0XHRyZXR1cm4gKGNsYXNzIGV4dGVuZHMgZG9jeDRqc3tcclxuXHRcdFx0b25DcmVhdGVFbGVtZW50KG5vZGUsIHR5cGUpe1xyXG5cdFx0XHRcdGxldCB7YXR0cmlidXRlcywgY2hpbGRyZW59PW5vZGVcclxuXHRcdFx0XHRsZXQgQ29udGVudD1udWxsXHJcblx0XHRcdFx0c3dpdGNoKHR5cGUpe1xyXG5cdFx0XHRcdGNhc2UgJ2RvY3gnOlxyXG5cdFx0XHRcdFx0Q29udGVudD1kb21haW4uQW55XHJcblx0XHRcdFx0YnJlYWtcdFxyXG5cdFx0XHRcdGNhc2UgJ2RvY3VtZW50JzpcclxuXHRcdFx0XHRcdENvbnRlbnQ9ZG9tYWluLkRvY3VtZW50XHJcblx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRjYXNlICdzZWN0aW9uJzpcclxuXHRcdFx0XHRcdENvbnRlbnQ9ZG9tYWluLlNlY3Rpb25cclxuXHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdGNhc2UgJ3AnOlxyXG5cdFx0XHRcdFx0Q29udGVudD1kb21haW4uUGFyYWdyYXBoXHJcblx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRjYXNlIFwiclwiOlxyXG5cdFx0XHRcdFx0Q29udGVudD1jbGFzcyBleHRlbmRzIGRvbWFpbi5JbmxpbmV7XHJcblx0XHRcdFx0XHRcdGdldCBkZWZhdWx0U3R5bGUoKXtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5jb250ZXh0LmdldERlZmF1bHRTdHlsZSgnY2hhcmFjdGVyJylcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0Y2FzZSBcInRcIjpcclxuXHRcdFx0XHRcdENvbnRlbnQ9Y2xhc3MgZXh0ZW5kcyBkb21haW4uVGV4dHtcclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRjYXNlIFwidGJsXCI6XHJcblx0XHRcdFx0XHRDb250ZW50PWRvbWFpbi5UYWJsZVxyXG5cdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0Y2FzZSBcInRyXCI6XHJcblx0XHRcdFx0XHRDb250ZW50PWRvbWFpbi5Sb3dcclxuXHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdGNhc2UgJ3RjJzpcclxuXHRcdFx0XHRcdENvbnRlbnQ9ZG9tYWluLkNlbGxcclxuXHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdGNhc2UgJ2xpc3QnOlxyXG5cdFx0XHRcdFx0Q29udGVudD1kb21haW4uQ2VsbFxyXG5cdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGlmKENvbnRlbnQpe1xyXG5cdFx0XHRcdFx0cmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ29udGVudCwgYXR0cmlidXRlcywgY2hpbGRyZW4pXHJcblx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRjb25zb2xlLndhcm4oYCR7dHlwZX0gaXMgbm90IGlkZW50aWZpZWRgKVxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRyZXR1cm4gbnVsbFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHJcblx0XHR9KS5sb2FkKGRhdGEpLnRoZW4oZG9jeD0+ZG9jeC5wYXJzZSgpLnRoZW4oZG9jeD0+e1xyXG5cdFx0XHRjb25zb2xlLmxvZyhkb2N4KVxyXG5cdFx0XHRyZXR1cm4gZG9jeFxyXG5cdFx0fSkpXHJcblx0fVxyXG59XHJcblxyXG5pbXBvcnQgRG9jdW1lbnQgZnJvbSBcIi4vZG9jdW1lbnRcIlxyXG5pbXBvcnQgU2VjdGlvbiBmcm9tIFwiLi9zZWN0aW9uXCJcclxuaW1wb3J0IEltYWdlIGZyb20gXCIuL2ltYWdlXCJcclxuaW1wb3J0IFRleHQgZnJvbSBcIi4vdGV4dFwiXHJcbmltcG9ydCBUYWJsZSBmcm9tIFwiLi90YWJsZVwiXHJcbmltcG9ydCBMaXN0IGZyb20gXCIuL2xpc3RcIlxyXG5cclxuZXhwb3J0IGxldCBNb2RlbHM9e1xyXG5cdERvY3VtZW50XHJcblx0LFNlY3Rpb25cclxuXHQsSW1hZ2VcclxuXHQsVGV4dFxyXG5cdCxUYWJsZVxyXG5cdCxMaXN0XHJcbn1cclxuIl19