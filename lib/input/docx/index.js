"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _get2 = require("babel-runtime/helpers/get");

var _get3 = _interopRequireDefault(_get2);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _docx4js2 = require("docx4js");

var _docx4js3 = _interopRequireDefault(_docx4js2);

var _base = require("../base");

var _base2 = _interopRequireDefault(_base);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Docx = function (_Base) {
	(0, _inherits3.default)(Docx, _Base);

	function Docx() {
		(0, _classCallCheck3.default)(this, Docx);
		return (0, _possibleConstructorReturn3.default)(this, (Docx.__proto__ || (0, _getPrototypeOf2.default)(Docx)).apply(this, arguments));
	}

	(0, _createClass3.default)(Docx, [{
		key: "load",
		value: function load(data, domain) {
			var Models = wordify(domain);

			return function (_docx4js) {
				(0, _inherits3.default)(_class, _docx4js);

				function _class() {
					(0, _classCallCheck3.default)(this, _class);
					return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));
				}

				(0, _createClass3.default)(_class, [{
					key: "onCreateElement",
					value: function onCreateElement(node, type) {
						var attributes = node.attributes,
						    children = node.children,
						    parent = node.parent;

						if (Array.isArray(children)) children = children.filter(function (a) {
							return a;
						});
						var Content = Models[type];
						var props = attributes;
						delete props.isSelfClosing;
						if (Content) {
							var docxType = node.name.split(':')[1];
							if ((type == "row" || type == "cell") && !props.directStyle) props.directStyle = this.officeDocument.styles.createDirectStyle(null, docxType + "Pr");
							if (type == 'header' || type == 'footer') props.key = docxType + "_" + props.type;

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
		value: function support(_ref) {
			var type = _ref.type;

			return type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
		}
	}]);
	return Docx;
}(_base2.default);

exports.default = Docx;


function wordify(domain) {
	var Document = function (_domain$Document) {
		(0, _inherits3.default)(Document, _domain$Document);

		function Document() {
			(0, _classCallCheck3.default)(this, Document);
			return (0, _possibleConstructorReturn3.default)(this, (Document.__proto__ || (0, _getPrototypeOf2.default)(Document)).apply(this, arguments));
		}

		(0, _createClass3.default)(Document, [{
			key: "getChildContext",
			value: function getChildContext() {
				var ctx = (0, _get3.default)(Document.prototype.__proto__ || (0, _getPrototypeOf2.default)(Document.prototype), "getChildContext", this).call(this);
				var _getDefaultStyle = ctx.getDefaultStyle;
				return (0, _assign2.default)(ctx, {
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

	var Any = domain.Any,
	    Section = domain.Section,
	    Paragraph = domain.Paragraph,
	    Inline = domain.Inline,
	    Text = domain.Text,
	    Frame = domain.Frame,
	    Image = domain.Image,
	    Table = domain.Table,
	    Row = domain.Row,
	    Cell = domain.Cell,
	    List = domain.List,
	    Header = domain.Header,
	    Footer = domain.Footer;

	return {
		"docx": Any,
		"document": Document,
		"section": Section,
		"paragraph": Paragraph,
		"inline": Inline,
		"text": Text,
		"table": Table,
		"row": Row,
		"cell": Cell,
		"list": List,
		"image": Image,
		"header": Header,
		"footer": Footer
	};
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L2luZGV4LmpzIl0sIm5hbWVzIjpbIkRvY3giLCJkYXRhIiwiZG9tYWluIiwiTW9kZWxzIiwid29yZGlmeSIsIm5vZGUiLCJ0eXBlIiwiYXR0cmlidXRlcyIsImNoaWxkcmVuIiwicGFyZW50IiwiQXJyYXkiLCJpc0FycmF5IiwiZmlsdGVyIiwiYSIsIkNvbnRlbnQiLCJwcm9wcyIsImlzU2VsZkNsb3NpbmciLCJkb2N4VHlwZSIsIm5hbWUiLCJzcGxpdCIsImRpcmVjdFN0eWxlIiwib2ZmaWNlRG9jdW1lbnQiLCJzdHlsZXMiLCJjcmVhdGVEaXJlY3RTdHlsZSIsImtleSIsImNyZWF0ZUVsZW1lbnQiLCJjb25zb2xlIiwid2FybiIsImxvYWQiLCJ0aGVuIiwiZG9jeCIsInBhcnNlIiwibG9nIiwiRG9jdW1lbnQiLCJjdHgiLCJfZ2V0RGVmYXVsdFN0eWxlIiwiZ2V0RGVmYXVsdFN0eWxlIiwiQW55IiwiU2VjdGlvbiIsIlBhcmFncmFwaCIsIklubGluZSIsIlRleHQiLCJGcmFtZSIsIkltYWdlIiwiVGFibGUiLCJSb3ciLCJDZWxsIiwiTGlzdCIsIkhlYWRlciIsIkZvb3RlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0lBR3FCQSxJOzs7Ozs7Ozs7O3VCQU1mQyxJLEVBQU1DLE0sRUFBTztBQUNqQixPQUFNQyxTQUFPQyxRQUFRRixNQUFSLENBQWI7O0FBRUEsVUFBTztBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxxQ0FDVUcsSUFEVixFQUNnQkMsSUFEaEIsRUFDcUI7QUFBQSxVQUNyQkMsVUFEcUIsR0FDU0YsSUFEVCxDQUNyQkUsVUFEcUI7QUFBQSxVQUNUQyxRQURTLEdBQ1NILElBRFQsQ0FDVEcsUUFEUztBQUFBLFVBQ0NDLE1BREQsR0FDU0osSUFEVCxDQUNDSSxNQUREOztBQUUxQixV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M0JzQixHQTZCZDdDLE1BN0JjLENBMkJ0QjZDLElBM0JzQjtBQUFBLEtBNEJ0QkMsTUE1QnNCLEdBNkJkOUMsTUE3QmMsQ0E0QnRCOEMsTUE1QnNCO0FBQUEsS0E2QnRCQyxNQTdCc0IsR0E2QmQvQyxNQTdCYyxDQTZCdEIrQyxNQTdCc0I7O0FBOEJ2QixRQUFPO0FBQ04sVUFBT1osR0FERDtBQUVOLGNBQVdKLFFBRkw7QUFHTixhQUFVSyxPQUhKO0FBSU4sZUFBWUMsU0FKTjtBQUtOLFlBQVNDLE1BTEg7QUFNTixVQUFPQyxJQU5EO0FBT04sV0FBUUcsS0FQRjtBQVFOLFNBQU1DLEdBUkE7QUFTTixVQUFPQyxJQVREO0FBVU4sVUFBT0MsSUFWRDtBQVdOLFdBQVFKLEtBWEY7QUFZTixZQUFTSyxNQVpIO0FBYU4sWUFBU0M7QUFiSCxFQUFQO0FBZUEiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZG9jeDRqcyBmcm9tIFwiZG9jeDRqc1wiXHJcbmltcG9ydCBCYXNlIGZyb20gXCIuLi9iYXNlXCJcclxuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9jeCBleHRlbmRzIEJhc2V7XHJcblx0XHJcblx0c3RhdGljIHN1cHBvcnQoe3R5cGV9KXtcclxuXHRcdHJldHVybiB0eXBlPT1cImFwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1vZmZpY2Vkb2N1bWVudC53b3JkcHJvY2Vzc2luZ21sLmRvY3VtZW50XCJcclxuXHR9XHJcblxyXG5cdGxvYWQoZGF0YSwgZG9tYWluKXtcclxuXHRcdGNvbnN0IE1vZGVscz13b3JkaWZ5KGRvbWFpbilcclxuXHJcblx0XHRyZXR1cm4gKGNsYXNzIGV4dGVuZHMgZG9jeDRqc3tcclxuXHRcdFx0b25DcmVhdGVFbGVtZW50KG5vZGUsIHR5cGUpe1xyXG5cdFx0XHRcdGxldCB7YXR0cmlidXRlcywgY2hpbGRyZW4sIHBhcmVudH09bm9kZVxyXG5cdFx0XHRcdGlmKEFycmF5LmlzQXJyYXkoY2hpbGRyZW4pKVxyXG5cdFx0XHRcdFx0Y2hpbGRyZW49Y2hpbGRyZW4uZmlsdGVyKGE9PmEpXHJcblx0XHRcdFx0bGV0IENvbnRlbnQ9TW9kZWxzW3R5cGVdXHJcblx0XHRcdFx0bGV0IHByb3BzPWF0dHJpYnV0ZXNcclxuXHRcdFx0XHRkZWxldGUgcHJvcHMuaXNTZWxmQ2xvc2luZ1xyXG5cdFx0XHRcdGlmKENvbnRlbnQpe1xyXG5cdFx0XHRcdFx0bGV0IGRvY3hUeXBlPW5vZGUubmFtZS5zcGxpdCgnOicpWzFdXHJcblx0XHRcdFx0XHRpZigodHlwZT09XCJyb3dcIiB8fCB0eXBlPT1cImNlbGxcIikgJiYgIXByb3BzLmRpcmVjdFN0eWxlKVxyXG5cdFx0XHRcdFx0XHRwcm9wcy5kaXJlY3RTdHlsZT10aGlzLm9mZmljZURvY3VtZW50LnN0eWxlcy5jcmVhdGVEaXJlY3RTdHlsZShudWxsLGAke2RvY3hUeXBlfVByYClcclxuXHRcdFx0XHRcdGlmKHR5cGU9PSdoZWFkZXInIHx8IHR5cGU9PSdmb290ZXInKVxyXG5cdFx0XHRcdFx0XHRwcm9wcy5rZXk9YCR7ZG9jeFR5cGV9XyR7cHJvcHMudHlwZX1gXHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KENvbnRlbnQsIHByb3BzLCBjaGlsZHJlbilcclxuXHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdGNvbnNvbGUud2FybihgJHt0eXBlfSBpcyBub3QgaWRlbnRpZmllZGApXHJcblx0XHRcdFx0XHRyZXR1cm4gbnVsbFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdH0pLmxvYWQoZGF0YSkudGhlbihkb2N4PT5kb2N4LnBhcnNlKCkudGhlbihkb2N4PT57XHJcblx0XHRcdGNvbnNvbGUubG9nKGRvY3gpXHJcblx0XHRcdHJldHVybiBkb2N4XHJcblx0XHR9KSlcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHdvcmRpZnkoZG9tYWluKXtcclxuXHRjbGFzcyBEb2N1bWVudCBleHRlbmRzIGRvbWFpbi5Eb2N1bWVudHtcclxuXHRcdGdldENoaWxkQ29udGV4dCgpe1xyXG5cdFx0XHRjb25zdCBjdHg9c3VwZXIuZ2V0Q2hpbGRDb250ZXh0KClcclxuXHRcdFx0bGV0IF9nZXREZWZhdWx0U3R5bGU9Y3R4LmdldERlZmF1bHRTdHlsZVxyXG5cdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbihjdHgse1xyXG5cdFx0XHRcdGdldERlZmF1bHRTdHlsZSh0eXBlKXtcclxuXHRcdFx0XHRcdHN3aXRjaCh0eXBlKXtcclxuXHRcdFx0XHRcdGNhc2UgJ2lubGluZSc6XHJcblx0XHRcdFx0XHRcdHR5cGU9XCJjaGFyYWN0ZXJcIlxyXG5cdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHJldHVybiBfZ2V0RGVmYXVsdFN0eWxlKHR5cGUpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cdH1cclxuXHRjb25zdCB7QW55LFxyXG5cdFx0U2VjdGlvbixcclxuXHRcdFBhcmFncmFwaCxcclxuXHRcdElubGluZSxcclxuXHRcdFRleHQsXHJcblx0XHRGcmFtZSxcclxuXHRcdEltYWdlLFxyXG5cdFx0VGFibGUsXHJcblx0XHRSb3csXHJcblx0XHRDZWxsLFxyXG5cdFx0TGlzdCxcclxuXHRcdEhlYWRlcixcclxuXHRcdEZvb3Rlcn09ZG9tYWluXHJcblx0cmV0dXJuIHtcclxuXHRcdFwiZG9jeFwiOkFueSxcclxuXHRcdFwiZG9jdW1lbnRcIjpEb2N1bWVudCxcclxuXHRcdFwic2VjdGlvblwiOlNlY3Rpb24sXHJcblx0XHRcInBhcmFncmFwaFwiOlBhcmFncmFwaCxcclxuXHRcdFwiaW5saW5lXCI6SW5saW5lLFxyXG5cdFx0XCJ0ZXh0XCI6VGV4dCxcclxuXHRcdFwidGFibGVcIjpUYWJsZSxcclxuXHRcdFwicm93XCI6Um93LFxyXG5cdFx0XCJjZWxsXCI6Q2VsbCxcclxuXHRcdFwibGlzdFwiOkxpc3QsXHJcblx0XHRcImltYWdlXCI6SW1hZ2UsXHJcblx0XHRcImhlYWRlclwiOkhlYWRlcixcclxuXHRcdFwiZm9vdGVyXCI6Rm9vdGVyXHJcblx0fVxyXG59XHJcbiJdfQ==