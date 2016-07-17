"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Models = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _docx4js = require("docx4js");

var _docx4js2 = _interopRequireDefault(_docx4js);

var _base = require("../base");

var _base2 = _interopRequireDefault(_base);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _stream = require("stream");

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
	}, {
		key: "load2",
		value: function load2(data, domain) {
			return _docx4js2.default.load(data).then(function (docx) {

				function createComponent(type) {
					var _class2, _temp2;

					var _type$split = type.split(':');

					var _type$split2 = _slicedToArray(_type$split, 2);

					var name = _type$split2[1];

					if (name = 'section') return domain.Section;else if (name == 'p') return domain.Paragraph;else if (name == 'r') return domain.Inline;else if (name == 't') return domain.Text;else if (name == 'tbl') return domain.Table;else if (name == 'tr') return domain.Row;else if (name == 'tc') return domain.Cell;else if (name.substr(-2) == 'Pr') {
						var _class, _temp;

						return _temp = _class = function (_Component) {
							_inherits(_class, _Component);

							function _class() {
								_classCallCheck(this, _class);

								return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
							}

							_createClass(_class, [{
								key: "render",
								value: function render() {
									return null;
								}
							}]);

							return _class;
						}(_react.Component), _class.displayName = type, _temp;
					}

					return _temp2 = _class2 = function (_domain$) {
						_inherits(_class2, _domain$);

						function _class2() {
							_classCallCheck(this, _class2);

							return _possibleConstructorReturn(this, Object.getPrototypeOf(_class2).apply(this, arguments));
						}

						return _class2;
					}(domain['*']), _class2.displayName = type, _temp2;
				}

				return new Promise(function (resolve, reject) {
					var doc = null;
					var current = null,
					    section = null,
					    sections = [];
					var data = docx.parts[docx.rels.officeDocument];
					var stream = new _stream.PassThrough();
					stream.end(new Buffer(data.asUint8Array()));
					stream.pipe(require("sax").createStream(true, { xmlns: false }).on("error", function (e) {
						console.error(e);
					}).on("opentag", function (node) {
						switch (node.name) {
							case 'w:body':
								doc.attributes.body = node.attributes;
								break;
							case 'w:document':
								doc = node;
								break;
							default:
								if (!current) {
									if (section) {
										sections.pop();
										sections.push(_react2.default.createElement(createComponent(section.name), section.attributes, section.children));
									}
									section = current = { name: 'w:section', children: [], attributes: {} };
									sections.push(section);
								}

								current.children.push(node);
								node.parent = current;
								current = node;
								node.children = [];
						}
					}).on("closetag", function (tag) {
						switch (tag) {
							case 'w:body':
								break;
							case 'w:document':
								sections.pop();
								sections.push(_react2.default.createElement(createComponent(section.name), section.attributes, section.children));
								current = _react2.default.createElement(createComponent(doc.name), doc.attributes, sections);
								break;
							case 'w:t':
								current.children = current.children.join('');
							default:
								var _current = current;
								var attributes = _current.attributes;
								var parent = _current.parent;
								var children = _current.children;
								var local = _current.local;
								var name = _current.name;

								var index = parent.children.indexOf(current);
								attributes.key = index;

								var element = _react2.default.createElement(createComponent(name), attributes, children);
								parent.children.splice(index, 1, element);
								current = parent;

								if (name == 'w:sectPr') section.attributes.pr = element;

								if (current == section && section.attributes.pr) current = null;
								break;
						}
					}).on("end", function (a) {
						resolve({
							createReactElement: function createReactElement() {
								return _react2.default.createElement(function (_Component2) {
									_inherits(Docx, _Component2);

									function Docx() {
										_classCallCheck(this, Docx);

										return _possibleConstructorReturn(this, Object.getPrototypeOf(Docx).apply(this, arguments));
									}

									_createClass(Docx, [{
										key: "render",
										value: function render() {
											return _react2.default.createElement(
												"div",
												null,
												this.props.children
											);
										}
									}]);

									return Docx;
								}(_react.Component), null, current);
							}
						});
					}).on("text", function (text) {
						current && current.children.push(text);
					}));
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
	Table: _table2.default
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBcUlBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQXZJcUI7Ozs7Ozs7Ozs7O3VCQUtmLE1BQUs7QUFDVCxVQUFPLGtCQUFRLElBQVIsQ0FBYSxJQUFiLEVBQW1CLElBQW5CLENBQXdCLGdCQUFNO0FBQ3BDLFFBQUksWUFBSixDQURvQztBQUVwQyxXQUFPLEtBQUssS0FBTCxDQUFXLGtCQUFRLG9CQUFSLENBQTZCLFVBQUMsU0FBRCxFQUFZLFlBQVosRUFBMkI7QUFDekUsU0FBRyxVQUFVLElBQVYsSUFBa0IsVUFBVSxJQUFWLENBQWUsTUFBZixDQUFzQixDQUF0QixFQUF3QixDQUF4QixLQUE0QixRQUE1QixFQUFxQztBQUN6RCxhQUFPLGFBQWEsUUFBYixDQUFzQixTQUF0QixFQUFnQyxHQUFoQyxDQUFQLENBRHlEO01BQTFELE1BRU0sSUFBRyxZQUFILEVBQ0wsT0FBTyxhQUFhLFdBQWIsQ0FBeUIsU0FBekIsRUFBbUMsR0FBbkMsQ0FBUCxDQURLLEtBR0wsT0FBTyxNQUFJLHVCQUFhLFNBQWIsQ0FBSixDQUhGO0tBSHdDLENBQXhDLENBQVAsQ0FGb0M7SUFBTixDQUEvQixDQURTOzs7O3dCQWNKLE1BQU0sUUFBTztBQUNsQixVQUFPLGtCQUFRLElBQVIsQ0FBYSxJQUFiLEVBQW1CLElBQW5CLENBQXdCLGdCQUFNOztBQUVwQyxhQUFTLGVBQVQsQ0FBeUIsSUFBekIsRUFBOEI7Ozt1QkFDakIsS0FBSyxLQUFMLENBQVcsR0FBWCxFQURpQjs7OztTQUN2Qix1QkFEdUI7O0FBRTdCLFNBQUcsT0FBSyxTQUFMLEVBQ0YsT0FBTyxPQUFPLE9BQVAsQ0FEUixLQUVLLElBQUcsUUFBTSxHQUFOLEVBQ1AsT0FBTyxPQUFPLFNBQVAsQ0FESCxLQUVB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LEVBTnFDO0tBQW5CLENBQW5CLENBakNvQztJQUFOLENBQS9CLENBRGtCOzs7OzBCQWxCSixNQUFLO0FBQ25CLFVBQU8sSUFBUCxDQURtQjs7OztRQURBOzs7O0FBeUlkLElBQUksMEJBQU87QUFDakIsNkJBRGlCO0FBRWhCLDJCQUZnQjtBQUdoQix1QkFIZ0I7QUFJaEIscUJBSmdCO0FBS2hCLHVCQUxnQjtDQUFQIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRvY3g0anMgZnJvbSBcImRvY3g0anNcIlxyXG5pbXBvcnQgQmFzZSBmcm9tIFwiLi4vYmFzZVwiXHJcbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtQYXNzVGhyb3VnaH0gZnJvbSBcInN0cmVhbVwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb2N4IGV4dGVuZHMgQmFzZXtcclxuXHRzdGF0aWMgc3VwcG9ydChmaWxlKXtcclxuXHRcdHJldHVybiB0cnVlXHJcblx0fVxyXG5cclxuXHRsb2FkKGRhdGEpe1xyXG5cdFx0cmV0dXJuIGRvY3g0anMubG9hZChkYXRhKS50aGVuKGRvY3g9PntcclxuXHRcdFx0bGV0IGRvY1xyXG5cdFx0XHRyZXR1cm4gZG9jeC5wYXJzZShkb2N4NGpzLmNyZWF0ZVZpc2l0b3JGYWN0b3J5KCh3b3JkTW9kZWwsIHRhcmdldFBhcmVudCk9PntcclxuXHRcdFx0XHRpZih3b3JkTW9kZWwudHlwZSAmJiB3b3JkTW9kZWwudHlwZS5zdWJzdHIoMCw2KT09J3N0eWxlLicpe1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRhcmdldFBhcmVudC5hZGRTdHlsZSh3b3JkTW9kZWwsZG9jKVxyXG5cdFx0XHRcdH1lbHNlIGlmKHRhcmdldFBhcmVudClcclxuXHRcdFx0XHRcdHJldHVybiB0YXJnZXRQYXJlbnQuYXBwZW5kQ2hpbGQod29yZE1vZGVsLGRvYylcclxuXHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRyZXR1cm4gZG9jPW5ldyBEb2N1bWVudCh3b3JkTW9kZWwpXHJcblx0XHRcdH0pKVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdGxvYWQyKGRhdGEsIGRvbWFpbil7XHJcblx0XHRyZXR1cm4gZG9jeDRqcy5sb2FkKGRhdGEpLnRoZW4oZG9jeD0+e1xyXG5cclxuXHRcdFx0ZnVuY3Rpb24gY3JlYXRlQ29tcG9uZW50KHR5cGUpe1xyXG5cdFx0XHRcdGxldCBbLG5hbWVdPXR5cGUuc3BsaXQoJzonKVxyXG5cdFx0XHRcdGlmKG5hbWU9J3NlY3Rpb24nKVxyXG5cdFx0XHRcdFx0cmV0dXJuIGRvbWFpbi5TZWN0aW9uXHJcblx0XHRcdFx0ZWxzZSBpZihuYW1lPT0ncCcpXHJcblx0XHRcdFx0XHRyZXR1cm4gZG9tYWluLlBhcmFncmFwaFxyXG5cdFx0XHRcdGVsc2UgaWYobmFtZT09J3InKVxyXG5cdFx0XHRcdFx0cmV0dXJuIGRvbWFpbi5JbmxpbmVcclxuXHRcdFx0XHRlbHNlIGlmKG5hbWU9PSd0JylcclxuXHRcdFx0XHRcdHJldHVybiBkb21haW4uVGV4dFxyXG5cdFx0XHRcdGVsc2UgaWYobmFtZT09J3RibCcpXHJcblx0XHRcdFx0XHRyZXR1cm4gZG9tYWluLlRhYmxlXHJcblx0XHRcdFx0ZWxzZSBpZihuYW1lPT0ndHInKVxyXG5cdFx0XHRcdFx0cmV0dXJuIGRvbWFpbi5Sb3dcclxuXHRcdFx0XHRlbHNlIGlmKG5hbWU9PSd0YycpXHJcblx0XHRcdFx0XHRyZXR1cm4gZG9tYWluLkNlbGxcclxuXHRcdFx0XHRlbHNlIGlmKG5hbWUuc3Vic3RyKC0yKT09J1ByJyl7XHJcblx0XHRcdFx0XHRyZXR1cm4gY2xhc3MgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0XHRcdFx0XHRcdHN0YXRpYyBkaXNwbGF5TmFtZT10eXBlXHJcblx0XHRcdFx0XHRcdHJlbmRlcigpe1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBudWxsXHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRyZXR1cm4gY2xhc3MgZXh0ZW5kcyBkb21haW5bJyonXXtcclxuXHRcdFx0XHRcdHN0YXRpYyBkaXNwbGF5TmFtZT10eXBlXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PntcclxuXHRcdFx0XHRsZXQgZG9jPW51bGxcclxuXHRcdFx0XHRsZXQgY3VycmVudD1udWxsLCBzZWN0aW9uPW51bGwsIHNlY3Rpb25zPVtdXHJcblx0XHRcdFx0bGV0IGRhdGE9ZG9jeC5wYXJ0c1tkb2N4LnJlbHMub2ZmaWNlRG9jdW1lbnRdXHJcblx0XHRcdFx0bGV0IHN0cmVhbT1uZXcgUGFzc1Rocm91Z2goKVxyXG5cdFx0XHRcdHN0cmVhbS5lbmQobmV3IEJ1ZmZlcihkYXRhLmFzVWludDhBcnJheSgpKSlcclxuXHRcdFx0XHRzdHJlYW0ucGlwZShyZXF1aXJlKFwic2F4XCIpLmNyZWF0ZVN0cmVhbSh0cnVlLHt4bWxuczpmYWxzZX0pXHJcblx0XHRcdFx0XHQub24oXCJlcnJvclwiLCBlPT57XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoZSlcclxuXHRcdFx0XHRcdH0pLm9uKFwib3BlbnRhZ1wiLCBub2RlPT57XHJcblx0XHRcdFx0XHRcdHN3aXRjaChub2RlLm5hbWUpe1xyXG5cdFx0XHRcdFx0XHRjYXNlICd3OmJvZHknOlxyXG5cdFx0XHRcdFx0XHRcdGRvYy5hdHRyaWJ1dGVzLmJvZHk9bm9kZS5hdHRyaWJ1dGVzXHJcblx0XHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0XHRcdGNhc2UgJ3c6ZG9jdW1lbnQnOlxyXG5cdFx0XHRcdFx0XHRcdGRvYz1ub2RlXHJcblx0XHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHRcdFx0aWYoIWN1cnJlbnQpe1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYoc2VjdGlvbil7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHNlY3Rpb25zLnBvcCgpXHJcblx0XHRcdFx0XHRcdFx0XHRcdHNlY3Rpb25zLnB1c2goUmVhY3QuY3JlYXRlRWxlbWVudChjcmVhdGVDb21wb25lbnQoc2VjdGlvbi5uYW1lKSwgc2VjdGlvbi5hdHRyaWJ1dGVzLCBzZWN0aW9uLmNoaWxkcmVuKSlcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdHNlY3Rpb249Y3VycmVudD17bmFtZTondzpzZWN0aW9uJywgY2hpbGRyZW46W10sIGF0dHJpYnV0ZXM6e319XHJcblx0XHRcdFx0XHRcdFx0XHRzZWN0aW9ucy5wdXNoKHNlY3Rpb24pXHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRjdXJyZW50LmNoaWxkcmVuLnB1c2gobm9kZSlcclxuXHRcdFx0XHRcdFx0XHRub2RlLnBhcmVudD1jdXJyZW50XHJcblx0XHRcdFx0XHRcdFx0Y3VycmVudD1ub2RlXHJcblx0XHRcdFx0XHRcdFx0bm9kZS5jaGlsZHJlbj1bXVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9KS5vbihcImNsb3NldGFnXCIsdGFnPT57XHJcblx0XHRcdFx0XHRcdHN3aXRjaCh0YWcpe1xyXG5cdFx0XHRcdFx0XHRcdGNhc2UgJ3c6Ym9keSc6XHJcblx0XHRcdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRcdFx0XHRjYXNlICd3OmRvY3VtZW50JzpcclxuXHRcdFx0XHRcdFx0XHRcdHNlY3Rpb25zLnBvcCgpXHJcblx0XHRcdFx0XHRcdFx0XHRzZWN0aW9ucy5wdXNoKFJlYWN0LmNyZWF0ZUVsZW1lbnQoY3JlYXRlQ29tcG9uZW50KHNlY3Rpb24ubmFtZSksIHNlY3Rpb24uYXR0cmlidXRlcywgc2VjdGlvbi5jaGlsZHJlbikpXHJcblx0XHRcdFx0XHRcdFx0XHRjdXJyZW50PVJlYWN0LmNyZWF0ZUVsZW1lbnQoY3JlYXRlQ29tcG9uZW50KGRvYy5uYW1lKSwgZG9jLmF0dHJpYnV0ZXMsIHNlY3Rpb25zKVxyXG5cdFx0XHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0XHRcdFx0Y2FzZSAndzp0JzpcclxuXHRcdFx0XHRcdFx0XHRcdGN1cnJlbnQuY2hpbGRyZW49Y3VycmVudC5jaGlsZHJlbi5qb2luKCcnKVxyXG5cdFx0XHRcdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHRcdFx0XHRjb25zdCB7YXR0cmlidXRlcywgcGFyZW50LCBjaGlsZHJlbiwgbG9jYWwsbmFtZX09Y3VycmVudFxyXG5cdFx0XHRcdFx0XHRcdFx0bGV0IGluZGV4PXBhcmVudC5jaGlsZHJlbi5pbmRleE9mKGN1cnJlbnQpXHJcblx0XHRcdFx0XHRcdFx0XHRhdHRyaWJ1dGVzLmtleT1pbmRleFxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdGxldCBlbGVtZW50PVJlYWN0LmNyZWF0ZUVsZW1lbnQoY3JlYXRlQ29tcG9uZW50KG5hbWUpLCBhdHRyaWJ1dGVzLCBjaGlsZHJlbilcclxuXHRcdFx0XHRcdFx0XHRcdHBhcmVudC5jaGlsZHJlbi5zcGxpY2UoaW5kZXgsMSxlbGVtZW50KVxyXG5cdFx0XHRcdFx0XHRcdFx0Y3VycmVudD1wYXJlbnRcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRpZihuYW1lPT0ndzpzZWN0UHInKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRzZWN0aW9uLmF0dHJpYnV0ZXMucHI9ZWxlbWVudFxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdGlmKGN1cnJlbnQ9PXNlY3Rpb24gJiYgc2VjdGlvbi5hdHRyaWJ1dGVzLnByKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRjdXJyZW50PW51bGxcclxuXHRcdFx0XHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9KS5vbihcImVuZFwiLCBhPT57XHJcblx0XHRcdFx0XHRcdHJlc29sdmUoe1xyXG5cdFx0XHRcdFx0XHRcdGNyZWF0ZVJlYWN0RWxlbWVudCgpe1xyXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoY2xhc3MgRG9jeCBleHRlbmRzIENvbXBvbmVudHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmVuZGVyKCl7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIDxkaXY+e3RoaXMucHJvcHMuY2hpbGRyZW59PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdH0sIG51bGwsIGN1cnJlbnQpXHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0fSkub24oXCJ0ZXh0XCIsIHRleHQ9PntcclxuXHRcdFx0XHRcdFx0Y3VycmVudCAmJiBjdXJyZW50LmNoaWxkcmVuLnB1c2godGV4dClcclxuXHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcbn1cclxuXHJcbmltcG9ydCBEb2N1bWVudCBmcm9tIFwiLi9kb2N1bWVudFwiXHJcbmltcG9ydCBTZWN0aW9uIGZyb20gXCIuL3NlY3Rpb25cIlxyXG5pbXBvcnQgSW1hZ2UgZnJvbSBcIi4vaW1hZ2VcIlxyXG5pbXBvcnQgVGV4dCBmcm9tIFwiLi90ZXh0XCJcclxuaW1wb3J0IFRhYmxlIGZyb20gXCIuL3RhYmxlXCJcclxuXHJcbmV4cG9ydCBsZXQgTW9kZWxzPXtcclxuXHREb2N1bWVudFxyXG5cdCxTZWN0aW9uXHJcblx0LEltYWdlXHJcblx0LFRleHRcclxuXHQsVGFibGVcclxufVxyXG4iXX0=