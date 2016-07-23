"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _docx4js2 = require("docx4js");

var _docx4js3 = _interopRequireDefault(_docx4js2);

var _base = require("../base");

var _base2 = _interopRequireDefault(_base);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

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
					} else if (targetParent) return targetParent.appendChild(wordModel, doc);else return doc = new Document(wordModel);
				}));
			}).then(function (doc) {
				return doc.createReactElement(domain);
			});
		}
	}, {
		key: "load",
		value: function load(data, domain) {
			var Text = domain.Text;

			var Inline = function (_domain$Inline) {
				_inherits(Inline, _domain$Inline);

				function Inline() {
					_classCallCheck(this, Inline);

					return _possibleConstructorReturn(this, Object.getPrototypeOf(Inline).apply(this, arguments));
				}

				_createClass(Inline, [{
					key: "defaultStyle",
					get: function get() {
						return this.context.getDefaultStyle('character');
					}
				}]);

				return Inline;
			}(domain.Inline);

			var Paragraph = function (_domain$Paragraph) {
				_inherits(Paragraph, _domain$Paragraph);

				function Paragraph() {
					_classCallCheck(this, Paragraph);

					return _possibleConstructorReturn(this, Object.getPrototypeOf(Paragraph).apply(this, arguments));
				}

				_createClass(Paragraph, [{
					key: "emptyContent",
					value: function emptyContent() {
						return [_react2.default.createElement(
							Inline,
							null,
							_react2.default.createElement(
								Text,
								null,
								" "
							)
						)];
					}
				}]);

				return Paragraph;
			}(domain.Paragraph);

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

						if (Array.isArray(children)) children = children.filter(function (a) {
							return a;
						});
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
								Content = Paragraph;
								break;
							case "r":
								Content = Inline;
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
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFHcUI7Ozs7Ozs7Ozs7O3dCQUtkLE1BQU0sUUFBTztBQUNsQixVQUFPLGtCQUFRLElBQVIsQ0FBYSxJQUFiLEVBQW1CLElBQW5CLENBQXdCLGdCQUFNO0FBQ3BDLFFBQUksWUFBSixDQURvQztBQUVwQyxXQUFPLEtBQUssS0FBTCxDQUFXLGtCQUFRLG9CQUFSLENBQTZCLFVBQUMsU0FBRCxFQUFZLFlBQVosRUFBMkI7QUFDekUsU0FBRyxVQUFVLElBQVYsSUFBa0IsVUFBVSxJQUFWLENBQWUsTUFBZixDQUFzQixDQUF0QixFQUF3QixDQUF4QixLQUE0QixRQUE1QixFQUFxQztBQUN6RCxhQUFPLGFBQWEsUUFBYixDQUFzQixTQUF0QixFQUFnQyxHQUFoQyxDQUFQLENBRHlEO01BQTFELE1BRU0sSUFBRyxZQUFILEVBQ0wsT0FBTyxhQUFhLFdBQWIsQ0FBeUIsU0FBekIsRUFBbUMsR0FBbkMsQ0FBUCxDQURLLEtBR0wsT0FBTyxNQUFJLElBQUksUUFBSixDQUFhLFNBQWIsQ0FBSixDQUhGO0tBSHdDLENBQXhDLENBQVAsQ0FGb0M7SUFBTixDQUF4QixDQVVKLElBVkksQ0FVQyxlQUFLO0FBQ1osV0FBTyxJQUFJLGtCQUFKLENBQXVCLE1BQXZCLENBQVAsQ0FEWTtJQUFMLENBVlIsQ0FEa0I7Ozs7dUJBZ0JkLE1BQU0sUUFBTztPQUNWLE9BQU0sT0FBTixLQURVOztPQUVYOzs7Ozs7Ozs7Ozt5QkFDYTtBQUNqQixhQUFPLEtBQUssT0FBTCxDQUFhLGVBQWIsQ0FBNkIsV0FBN0IsQ0FBUCxDQURpQjs7OztXQURiO0tBQWUsT0FBTyxNQUFQLEVBRko7O09BT1g7Ozs7Ozs7Ozs7O29DQUNTO0FBQ2IsYUFBTyxDQUFDO0FBQUMsYUFBRDs7T0FBUTtBQUFDLFlBQUQ7OztRQUFSO09BQUQsQ0FBUCxDQURhOzs7O1dBRFQ7S0FBa0IsT0FBTyxTQUFQLEVBUFA7O0FBYWpCLFVBQU87Ozs7Ozs7Ozs7O3FDQUNVLE1BQU0sTUFBSztVQUNyQixhQUFzQixLQUF0QixXQURxQjtVQUNULFdBQVUsS0FBVixTQURTOztBQUUxQixVQUFHLE1BQU0sT0FBTixDQUFjLFFBQWQsQ0FBSCxFQUNDLFdBQVMsU0FBUyxNQUFULENBQWdCO2NBQUc7T0FBSCxDQUF6QixDQUREO0FBRUEsVUFBSSxVQUFRLElBQVIsQ0FKc0I7QUFLMUIsY0FBTyxJQUFQO0FBQ0EsWUFBSyxNQUFMO0FBQ0Msa0JBQVEsT0FBTyxHQUFQLENBRFQ7QUFFQSxjQUZBO0FBREEsWUFJSyxVQUFMO0FBQ0Msa0JBQVEsT0FBTyxRQUFQLENBRFQ7QUFFQSxjQUZBO0FBSkEsWUFPSyxTQUFMO0FBQ0Msa0JBQVEsT0FBTyxPQUFQLENBRFQ7QUFFQSxjQUZBO0FBUEEsWUFVSyxHQUFMO0FBQ0Msa0JBQVEsU0FBUixDQUREO0FBRUEsY0FGQTtBQVZBLFlBYUssR0FBTDtBQUNDLGtCQUFRLE1BQVIsQ0FERDtBQUVBLGNBRkE7QUFiQSxZQWdCSyxHQUFMO0FBQ0Msa0JBQVEsT0FBTyxJQUFQLENBRFQ7QUFFQSxjQUZBO0FBaEJBLFlBbUJLLEtBQUw7QUFDQyxrQkFBUSxPQUFPLEtBQVAsQ0FEVDtBQUVBLGNBRkE7QUFuQkEsWUFzQkssSUFBTDtBQUNDLGtCQUFRLE9BQU8sR0FBUCxDQURUO0FBRUEsY0FGQTtBQXRCQSxZQXlCSyxJQUFMO0FBQ0Msa0JBQVEsT0FBTyxJQUFQLENBRFQ7QUFFQSxjQUZBO0FBekJBLFlBNEJLLE1BQUw7QUFDQyxrQkFBUSxPQUFPLElBQVAsQ0FEVDtBQUVBLGNBRkE7QUE1QkEsT0FMMEI7O0FBc0MxQixVQUFHLE9BQUgsRUFBVztBQUNWLGNBQU8sZ0JBQU0sYUFBTixDQUFvQixPQUFwQixFQUE2QixVQUE3QixFQUF5QyxRQUF6QyxDQUFQLENBRFU7T0FBWCxNQUVLO0FBQ0osZUFBUSxJQUFSLENBQWdCLDJCQUFoQixFQURJOztBQUdKLGNBQU8sSUFBUCxDQUhJO09BRkw7Ozs7O3VCQXZDSyxDQWdESixJQWhESSxDQWdEQyxJQWhERCxFQWdETyxJQWhEUCxDQWdEWTtXQUFNLEtBQUssS0FBTCxHQUFhLElBQWIsQ0FBa0IsZ0JBQU07QUFDaEQsYUFBUSxHQUFSLENBQVksSUFBWixFQURnRDtBQUVoRCxZQUFPLElBQVAsQ0FGZ0Q7S0FBTjtJQUF4QixDQWhEbkIsQ0FiaUI7Ozs7MEJBcEJILE1BQUs7QUFDbkIsVUFBTyxJQUFQLENBRG1COzs7O1FBREEiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZG9jeDRqcyBmcm9tIFwiZG9jeDRqc1wiXHJcbmltcG9ydCBCYXNlIGZyb20gXCIuLi9iYXNlXCJcclxuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9jeCBleHRlbmRzIEJhc2V7XHJcblx0c3RhdGljIHN1cHBvcnQoZmlsZSl7XHJcblx0XHRyZXR1cm4gdHJ1ZVxyXG5cdH1cclxuXHJcblx0bG9hZDEoZGF0YSwgZG9tYWluKXtcclxuXHRcdHJldHVybiBkb2N4NGpzLmxvYWQoZGF0YSkudGhlbihkb2N4PT57XHJcblx0XHRcdGxldCBkb2NcclxuXHRcdFx0cmV0dXJuIGRvY3gucGFyc2UoZG9jeDRqcy5jcmVhdGVWaXNpdG9yRmFjdG9yeSgod29yZE1vZGVsLCB0YXJnZXRQYXJlbnQpPT57XHJcblx0XHRcdFx0aWYod29yZE1vZGVsLnR5cGUgJiYgd29yZE1vZGVsLnR5cGUuc3Vic3RyKDAsNik9PSdzdHlsZS4nKXtcclxuXHRcdFx0XHRcdHJldHVybiB0YXJnZXRQYXJlbnQuYWRkU3R5bGUod29yZE1vZGVsLGRvYylcclxuXHRcdFx0XHR9ZWxzZSBpZih0YXJnZXRQYXJlbnQpXHJcblx0XHRcdFx0XHRyZXR1cm4gdGFyZ2V0UGFyZW50LmFwcGVuZENoaWxkKHdvcmRNb2RlbCxkb2MpXHJcblx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0cmV0dXJuIGRvYz1uZXcgRG9jdW1lbnQod29yZE1vZGVsKVxyXG5cdFx0XHR9KSlcclxuXHRcdH0pLnRoZW4oZG9jPT57XHJcblx0XHRcdHJldHVybiBkb2MuY3JlYXRlUmVhY3RFbGVtZW50KGRvbWFpbilcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRsb2FkKGRhdGEsIGRvbWFpbil7XHJcblx0XHRjb25zdCB7VGV4dH09ZG9tYWluXHJcblx0XHRjbGFzcyBJbmxpbmUgZXh0ZW5kcyBkb21haW4uSW5saW5le1xyXG5cdFx0XHRnZXQgZGVmYXVsdFN0eWxlKCl7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuY29udGV4dC5nZXREZWZhdWx0U3R5bGUoJ2NoYXJhY3RlcicpXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGNsYXNzIFBhcmFncmFwaCBleHRlbmRzIGRvbWFpbi5QYXJhZ3JhcGh7XHJcblx0XHRcdGVtcHR5Q29udGVudCgpe1xyXG5cdFx0XHRcdHJldHVybiBbPElubGluZT48VGV4dD4gPC9UZXh0PjwvSW5saW5lPl1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiAoY2xhc3MgZXh0ZW5kcyBkb2N4NGpze1xyXG5cdFx0XHRvbkNyZWF0ZUVsZW1lbnQobm9kZSwgdHlwZSl7XHJcblx0XHRcdFx0bGV0IHthdHRyaWJ1dGVzLCBjaGlsZHJlbn09bm9kZVxyXG5cdFx0XHRcdGlmKEFycmF5LmlzQXJyYXkoY2hpbGRyZW4pKVxyXG5cdFx0XHRcdFx0Y2hpbGRyZW49Y2hpbGRyZW4uZmlsdGVyKGE9PmEpXHJcblx0XHRcdFx0bGV0IENvbnRlbnQ9bnVsbFxyXG5cdFx0XHRcdHN3aXRjaCh0eXBlKXtcclxuXHRcdFx0XHRjYXNlICdkb2N4JzpcclxuXHRcdFx0XHRcdENvbnRlbnQ9ZG9tYWluLkFueVxyXG5cdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0Y2FzZSAnZG9jdW1lbnQnOlxyXG5cdFx0XHRcdFx0Q29udGVudD1kb21haW4uRG9jdW1lbnRcclxuXHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdGNhc2UgJ3NlY3Rpb24nOlxyXG5cdFx0XHRcdFx0Q29udGVudD1kb21haW4uU2VjdGlvblxyXG5cdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0Y2FzZSAncCc6XHJcblx0XHRcdFx0XHRDb250ZW50PVBhcmFncmFwaFxyXG5cdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0Y2FzZSBcInJcIjpcclxuXHRcdFx0XHRcdENvbnRlbnQ9SW5saW5lXHJcblx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRjYXNlIFwidFwiOlxyXG5cdFx0XHRcdFx0Q29udGVudD1kb21haW4uVGV4dFxyXG5cdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0Y2FzZSBcInRibFwiOlxyXG5cdFx0XHRcdFx0Q29udGVudD1kb21haW4uVGFibGVcclxuXHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdGNhc2UgXCJ0clwiOlxyXG5cdFx0XHRcdFx0Q29udGVudD1kb21haW4uUm93XHJcblx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRjYXNlICd0Yyc6XHJcblx0XHRcdFx0XHRDb250ZW50PWRvbWFpbi5DZWxsXHJcblx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRjYXNlICdsaXN0JzpcclxuXHRcdFx0XHRcdENvbnRlbnQ9ZG9tYWluLkNlbGxcclxuXHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYoQ29udGVudCl7XHJcblx0XHRcdFx0XHRyZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChDb250ZW50LCBhdHRyaWJ1dGVzLCBjaGlsZHJlbilcclxuXHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdGNvbnNvbGUud2FybihgJHt0eXBlfSBpcyBub3QgaWRlbnRpZmllZGApXHJcblxyXG5cdFx0XHRcdFx0cmV0dXJuIG51bGxcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHR9KS5sb2FkKGRhdGEpLnRoZW4oZG9jeD0+ZG9jeC5wYXJzZSgpLnRoZW4oZG9jeD0+e1xyXG5cdFx0XHRjb25zb2xlLmxvZyhkb2N4KVxyXG5cdFx0XHRyZXR1cm4gZG9jeFxyXG5cdFx0fSkpXHJcblx0fVxyXG59XHJcbiJdfQ==