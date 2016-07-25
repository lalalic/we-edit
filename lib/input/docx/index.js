"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

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
		key: "load",
		value: function load(data, domain) {
			var Models = wordify(domain);

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
						var Content = Models[type];
						var props = attributes;
						if (Content) {
							if ((type == "tr" || type == "tc") && !props.directStyle) props.directStyle = this.officeDocument.styles.createDirectStyle({}, type + "Pr");
							return _react2.default.createElement(Content, props, children);
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


function wordify(domain) {
	var Document = function (_domain$Document) {
		_inherits(Document, _domain$Document);

		function Document() {
			_classCallCheck(this, Document);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(Document).apply(this, arguments));
		}

		_createClass(Document, [{
			key: "getChildContext",
			value: function getChildContext() {
				var ctx = _get(Object.getPrototypeOf(Document.prototype), "getChildContext", this).call(this);
				var _getDefaultStyle = ctx.getDefaultStyle;
				return Object.assign(ctx, {
					getDefaultStyle: function getDefaultStyle(type) {
						switch (type) {
							case 'inline':
								type = "character";
								break;
						}
						return _getDefaultStyle(type);
					}
				});
			}
		}]);

		return Document;
	}(domain.Document);

	var Any = domain.Any;
	var Section = domain.Section;
	var Paragraph = domain.Paragraph;
	var Inline = domain.Inline;
	var Text = domain.Text;
	var Frame = domain.Frame;
	var Image = domain.Image;
	var Table = domain.Table;
	var Row = domain.Row;
	var Cell = domain.Cell;
	var List = domain.List;

	return {
		"docx": Any,
		"document": Document,
		"section": Section,
		"p": Paragraph,
		"r": Inline,
		"t": Text,
		"tbl": Table,
		"tr": Row,
		"tc": Cell,
		"list": List,
		"image": Image
	};
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUdxQjs7Ozs7Ozs7Ozs7dUJBS2YsTUFBTSxRQUFPO0FBQ2pCLE9BQU0sU0FBTyxRQUFRLE1BQVIsQ0FBUCxDQURXOztBQUdqQixVQUFPOzs7Ozs7Ozs7OztxQ0FDVSxNQUFNLE1BQUs7VUFDckIsYUFBc0IsS0FBdEIsV0FEcUI7VUFDVCxXQUFVLEtBQVYsU0FEUzs7QUFFMUIsVUFBRyxNQUFNLE9BQU4sQ0FBYyxRQUFkLENBQUgsRUFDQyxXQUFTLFNBQVMsTUFBVCxDQUFnQjtjQUFHO09BQUgsQ0FBekIsQ0FERDtBQUVBLFVBQUksVUFBUSxPQUFPLElBQVAsQ0FBUixDQUpzQjtBQUsxQixVQUFJLFFBQU0sVUFBTixDQUxzQjtBQU0xQixVQUFHLE9BQUgsRUFBVztBQUNWLFdBQUcsQ0FBQyxRQUFNLElBQU4sSUFBYyxRQUFNLElBQU4sQ0FBZixJQUE4QixDQUFDLE1BQU0sV0FBTixFQUNqQyxNQUFNLFdBQU4sR0FBa0IsS0FBSyxjQUFMLENBQW9CLE1BQXBCLENBQTJCLGlCQUEzQixDQUE2QyxFQUE3QyxFQUFtRCxXQUFuRCxDQUFsQixDQUREO0FBRUEsY0FBTyxnQkFBTSxhQUFOLENBQW9CLE9BQXBCLEVBQTZCLEtBQTdCLEVBQW9DLFFBQXBDLENBQVAsQ0FIVTtPQUFYLE1BSUs7QUFDSixlQUFRLElBQVIsQ0FBZ0IsMkJBQWhCLEVBREk7QUFFSixjQUFPLElBQVAsQ0FGSTtPQUpMOzs7Ozt1QkFQSyxDQWlCSixJQWpCSSxDQWlCQyxJQWpCRCxFQWlCTyxJQWpCUCxDQWlCWTtXQUFNLEtBQUssS0FBTCxHQUFhLElBQWIsQ0FBa0IsZ0JBQU07QUFDaEQsYUFBUSxHQUFSLENBQVksSUFBWixFQURnRDtBQUVoRCxZQUFPLElBQVAsQ0FGZ0Q7S0FBTjtJQUF4QixDQWpCbkIsQ0FIaUI7Ozs7MEJBSkgsTUFBSztBQUNuQixVQUFPLElBQVAsQ0FEbUI7Ozs7UUFEQTs7Ozs7O0FBZ0NyQixTQUFTLE9BQVQsQ0FBaUIsTUFBakIsRUFBd0I7S0FDakI7Ozs7Ozs7Ozs7O3FDQUNZO0FBQ2hCLFFBQU0saUNBRkYsd0RBRUUsQ0FEVTtBQUVoQixRQUFJLG1CQUFpQixJQUFJLGVBQUosQ0FGTDtBQUdoQixXQUFPLE9BQU8sTUFBUCxDQUFjLEdBQWQsRUFBa0I7QUFDeEIsK0NBQWdCLE1BQUs7QUFDcEIsY0FBTyxJQUFQO0FBQ0EsWUFBSyxRQUFMO0FBQ0MsZUFBSyxXQUFMLENBREQ7QUFFQSxjQUZBO0FBREEsT0FEb0I7QUFNcEIsYUFBTyxpQkFBaUIsSUFBakIsQ0FBUCxDQU5vQjtNQURHO0tBQWxCLENBQVAsQ0FIZ0I7Ozs7U0FEWjtHQUFpQixPQUFPLFFBQVAsRUFEQTs7S0FpQmhCLE1BVUEsT0FWQSxJQWpCZ0I7S0FrQnRCLFVBU00sT0FUTixRQWxCc0I7S0FtQnRCLFlBUU0sT0FSTixVQW5Cc0I7S0FvQnRCLFNBT00sT0FQTixPQXBCc0I7S0FxQnRCLE9BTU0sT0FOTixLQXJCc0I7S0FzQnRCLFFBS00sT0FMTixNQXRCc0I7S0F1QnRCLFFBSU0sT0FKTixNQXZCc0I7S0F3QnRCLFFBR00sT0FITixNQXhCc0I7S0F5QnRCLE1BRU0sT0FGTixJQXpCc0I7S0EwQnRCLE9BQ00sT0FETixLQTFCc0I7S0EyQnRCLE9BQU0sT0FBTixLQTNCc0I7O0FBNEJ2QixRQUFPO0FBQ04sVUFBTyxHQUFQO0FBQ0EsY0FBVyxRQUFYO0FBQ0EsYUFBVSxPQUFWO0FBQ0EsT0FBSSxTQUFKO0FBQ0EsT0FBSSxNQUFKO0FBQ0EsT0FBSSxJQUFKO0FBQ0EsU0FBTSxLQUFOO0FBQ0EsUUFBSyxHQUFMO0FBQ0EsUUFBSyxJQUFMO0FBQ0EsVUFBTyxJQUFQO0FBQ0EsV0FBUSxLQUFSO0VBWEQsQ0E1QnVCO0NBQXhCIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRvY3g0anMgZnJvbSBcImRvY3g0anNcIlxyXG5pbXBvcnQgQmFzZSBmcm9tIFwiLi4vYmFzZVwiXHJcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvY3ggZXh0ZW5kcyBCYXNle1xyXG5cdHN0YXRpYyBzdXBwb3J0KGZpbGUpe1xyXG5cdFx0cmV0dXJuIHRydWVcclxuXHR9XHJcblxyXG5cdGxvYWQoZGF0YSwgZG9tYWluKXtcclxuXHRcdGNvbnN0IE1vZGVscz13b3JkaWZ5KGRvbWFpbilcclxuXHJcblx0XHRyZXR1cm4gKGNsYXNzIGV4dGVuZHMgZG9jeDRqc3tcclxuXHRcdFx0b25DcmVhdGVFbGVtZW50KG5vZGUsIHR5cGUpe1xyXG5cdFx0XHRcdGxldCB7YXR0cmlidXRlcywgY2hpbGRyZW59PW5vZGVcclxuXHRcdFx0XHRpZihBcnJheS5pc0FycmF5KGNoaWxkcmVuKSlcclxuXHRcdFx0XHRcdGNoaWxkcmVuPWNoaWxkcmVuLmZpbHRlcihhPT5hKVxyXG5cdFx0XHRcdGxldCBDb250ZW50PU1vZGVsc1t0eXBlXVxyXG5cdFx0XHRcdGxldCBwcm9wcz1hdHRyaWJ1dGVzXHJcblx0XHRcdFx0aWYoQ29udGVudCl7XHJcblx0XHRcdFx0XHRpZigodHlwZT09XCJ0clwiIHx8IHR5cGU9PVwidGNcIikgJiYgIXByb3BzLmRpcmVjdFN0eWxlKVxyXG5cdFx0XHRcdFx0XHRwcm9wcy5kaXJlY3RTdHlsZT10aGlzLm9mZmljZURvY3VtZW50LnN0eWxlcy5jcmVhdGVEaXJlY3RTdHlsZSh7fSxgJHt0eXBlfVByYClcclxuXHRcdFx0XHRcdHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KENvbnRlbnQsIHByb3BzLCBjaGlsZHJlbilcclxuXHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdGNvbnNvbGUud2FybihgJHt0eXBlfSBpcyBub3QgaWRlbnRpZmllZGApXHJcblx0XHRcdFx0XHRyZXR1cm4gbnVsbFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdH0pLmxvYWQoZGF0YSkudGhlbihkb2N4PT5kb2N4LnBhcnNlKCkudGhlbihkb2N4PT57XHJcblx0XHRcdGNvbnNvbGUubG9nKGRvY3gpXHJcblx0XHRcdHJldHVybiBkb2N4XHJcblx0XHR9KSlcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHdvcmRpZnkoZG9tYWluKXtcclxuXHRjbGFzcyBEb2N1bWVudCBleHRlbmRzIGRvbWFpbi5Eb2N1bWVudHtcclxuXHRcdGdldENoaWxkQ29udGV4dCgpe1xyXG5cdFx0XHRjb25zdCBjdHg9c3VwZXIuZ2V0Q2hpbGRDb250ZXh0KClcclxuXHRcdFx0bGV0IF9nZXREZWZhdWx0U3R5bGU9Y3R4LmdldERlZmF1bHRTdHlsZVxyXG5cdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbihjdHgse1xyXG5cdFx0XHRcdGdldERlZmF1bHRTdHlsZSh0eXBlKXtcclxuXHRcdFx0XHRcdHN3aXRjaCh0eXBlKXtcclxuXHRcdFx0XHRcdGNhc2UgJ2lubGluZSc6XHJcblx0XHRcdFx0XHRcdHR5cGU9XCJjaGFyYWN0ZXJcIlxyXG5cdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHJldHVybiBfZ2V0RGVmYXVsdFN0eWxlKHR5cGUpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cdH1cclxuXHRjb25zdCB7QW55LFxyXG5cdFx0U2VjdGlvbixcclxuXHRcdFBhcmFncmFwaCxcclxuXHRcdElubGluZSxcclxuXHRcdFRleHQsXHJcblx0XHRGcmFtZSxcclxuXHRcdEltYWdlLFxyXG5cdFx0VGFibGUsXHJcblx0XHRSb3csXHJcblx0XHRDZWxsLFxyXG5cdFx0TGlzdH09ZG9tYWluXHJcblx0cmV0dXJuIHtcclxuXHRcdFwiZG9jeFwiOkFueSxcclxuXHRcdFwiZG9jdW1lbnRcIjpEb2N1bWVudCxcclxuXHRcdFwic2VjdGlvblwiOlNlY3Rpb24sXHJcblx0XHRcInBcIjpQYXJhZ3JhcGgsXHJcblx0XHRcInJcIjpJbmxpbmUsXHJcblx0XHRcInRcIjpUZXh0LFxyXG5cdFx0XCJ0YmxcIjpUYWJsZSxcclxuXHRcdFwidHJcIjpSb3csXHJcblx0XHRcInRjXCI6Q2VsbCxcclxuXHRcdFwibGlzdFwiOkxpc3QsXHJcblx0XHRcImltYWdlXCI6SW1hZ2VcclxuXHR9XHJcbn1cclxuIl19