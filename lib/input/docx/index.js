"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require("babel-runtime/helpers/get");

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _docx4js2 = require("docx4js");

var _docx4js3 = _interopRequireDefault(_docx4js2);

var _base = require("../base");

var _base2 = _interopRequireDefault(_base);

var _editor = require("../../editor");

var _editor2 = _interopRequireDefault(_editor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var _class = function (_Base) {
	(0, _inherits3.default)(_class, _Base);

	function _class() {
		(0, _classCallCheck3.default)(this, _class);
		return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));
	}

	(0, _createClass3.default)(_class, [{
		key: "load",
		value: function load(data, domain) {
			var Models = wordify(domain);
			var self = this;
			return function (_docx4js) {
				(0, _inherits3.default)(_class2, _docx4js);

				function _class2() {
					(0, _classCallCheck3.default)(this, _class2);
					return (0, _possibleConstructorReturn3.default)(this, (_class2.__proto__ || (0, _getPrototypeOf2.default)(_class2)).apply(this, arguments));
				}

				(0, _createClass3.default)(_class2, [{
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

						if (Content) {
							var docxType = node.name.split(':')[1];
							if ((type == "row" || type == "cell") && !props.directStyle) props.directStyle = this.officeDocument.styles.createDirectStyle(null, docxType + "Pr");
							return self.createElement(Content, props, children);
						} else {
							console.warn(type + " is not identified");
							return null;
						}
					}
				}]);
				return _class2;
			}(_docx4js3.default).load(data).then(function (docx) {
				return docx.parse();
			});
		}
	}, {
		key: "create",
		value: function create() {
			return this.load(EMPTY_DOCX, _editor2.default);
		}
	}], [{
		key: "support",
		value: function support(_ref) {
			var type = _ref.type;

			return type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
		}
	}]);
	return _class;
}(_base2.default);

exports.default = _class;


var EMPTY_DOCX = "";
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L2luZGV4LmpzIl0sIm5hbWVzIjpbIndvcmRpZnkiLCJkb21haW4iLCJEb2N1bWVudCIsImN0eCIsIl9nZXREZWZhdWx0U3R5bGUiLCJnZXREZWZhdWx0U3R5bGUiLCJ0eXBlIiwiQW55IiwiU2VjdGlvbiIsIlBhcmFncmFwaCIsIklubGluZSIsIlRleHQiLCJGcmFtZSIsIkltYWdlIiwiVGFibGUiLCJSb3ciLCJDZWxsIiwiTGlzdCIsIkhlYWRlciIsIkZvb3RlciIsImRhdGEiLCJNb2RlbHMiLCJzZWxmIiwibm9kZSIsImF0dHJpYnV0ZXMiLCJjaGlsZHJlbiIsInBhcmVudCIsIkFycmF5IiwiaXNBcnJheSIsImZpbHRlciIsImEiLCJDb250ZW50IiwicHJvcHMiLCJkb2N4VHlwZSIsIm5hbWUiLCJzcGxpdCIsImRpcmVjdFN0eWxlIiwib2ZmaWNlRG9jdW1lbnQiLCJzdHlsZXMiLCJjcmVhdGVEaXJlY3RTdHlsZSIsImNyZWF0ZUVsZW1lbnQiLCJjb25zb2xlIiwid2FybiIsImxvYWQiLCJ0aGVuIiwiZG9jeCIsInBhcnNlIiwiRU1QVFlfRE9DWCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxTQUFTQSxPQUFULENBQWlCQyxNQUFqQixFQUF3QjtBQUFBLEtBQ2pCQyxRQURpQjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxxQ0FFTDtBQUNoQixRQUFNQywrSUFBTjtBQUNBLFFBQUlDLG1CQUFpQkQsSUFBSUUsZUFBekI7QUFDQSxXQUFPLHNCQUFjRixHQUFkLEVBQWtCO0FBQ3hCRSxvQkFEd0IsMkJBQ1JDLElBRFEsRUFDSDtBQUNwQixjQUFPQSxJQUFQO0FBQ0EsWUFBSyxRQUFMO0FBQ0NBLGVBQUssV0FBTDtBQUNEO0FBSEE7QUFLQSxhQUFPRixpQkFBaUJFLElBQWpC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LENBa0JDdkIsSUFsQkQsRUFrQk93QixJQWxCUCxDQWtCWTtBQUFBLFdBQU1DLEtBQUtDLEtBQUwsRUFBTjtBQUFBLElBbEJaLENBQVA7QUFtQkE7OzsyQkFFTztBQUNQLFVBQU8sS0FBS0gsSUFBTCxDQUFVSSxVQUFWLG1CQUFQO0FBQ0E7OztnQ0E5QnFCO0FBQUEsT0FBTnpDLElBQU0sUUFBTkEsSUFBTTs7QUFDckIsVUFBT0EsUUFBTSx5RUFBYjtBQUNBOzs7Ozs7OztBQStCRixJQUFNeUMsYUFBVyxFQUFqQiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgZG9jeDRqcyBmcm9tIFwiZG9jeDRqc1wiXHJcbmltcG9ydCBCYXNlIGZyb20gXCIuLi9iYXNlXCJcclxuaW1wb3J0IEVkaXRvciBmcm9tIFwiLi4vLi4vZWRpdG9yXCJcclxuXHJcbmZ1bmN0aW9uIHdvcmRpZnkoZG9tYWluKXtcclxuXHRjbGFzcyBEb2N1bWVudCBleHRlbmRzIGRvbWFpbi5Eb2N1bWVudHtcclxuXHRcdGdldENoaWxkQ29udGV4dCgpe1xyXG5cdFx0XHRjb25zdCBjdHg9c3VwZXIuZ2V0Q2hpbGRDb250ZXh0KClcclxuXHRcdFx0bGV0IF9nZXREZWZhdWx0U3R5bGU9Y3R4LmdldERlZmF1bHRTdHlsZVxyXG5cdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbihjdHgse1xyXG5cdFx0XHRcdGdldERlZmF1bHRTdHlsZSh0eXBlKXtcclxuXHRcdFx0XHRcdHN3aXRjaCh0eXBlKXtcclxuXHRcdFx0XHRcdGNhc2UgJ2lubGluZSc6XHJcblx0XHRcdFx0XHRcdHR5cGU9XCJjaGFyYWN0ZXJcIlxyXG5cdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHJldHVybiBfZ2V0RGVmYXVsdFN0eWxlKHR5cGUpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cdH1cclxuXHRjb25zdCB7QW55LFxyXG5cdFx0U2VjdGlvbixcclxuXHRcdFBhcmFncmFwaCxcclxuXHRcdElubGluZSxcclxuXHRcdFRleHQsXHJcblx0XHRGcmFtZSxcclxuXHRcdEltYWdlLFxyXG5cdFx0VGFibGUsXHJcblx0XHRSb3csXHJcblx0XHRDZWxsLFxyXG5cdFx0TGlzdCxcclxuXHRcdEhlYWRlcixcclxuXHRcdEZvb3Rlcn09ZG9tYWluXHJcblx0cmV0dXJuIHtcclxuXHRcdFwiZG9jeFwiOkFueSxcclxuXHRcdFwiZG9jdW1lbnRcIjpEb2N1bWVudCxcclxuXHRcdFwic2VjdGlvblwiOlNlY3Rpb24sXHJcblx0XHRcInBhcmFncmFwaFwiOlBhcmFncmFwaCxcclxuXHRcdFwiaW5saW5lXCI6SW5saW5lLFxyXG5cdFx0XCJ0ZXh0XCI6VGV4dCxcclxuXHRcdFwidGFibGVcIjpUYWJsZSxcclxuXHRcdFwicm93XCI6Um93LFxyXG5cdFx0XCJjZWxsXCI6Q2VsbCxcclxuXHRcdFwibGlzdFwiOkxpc3QsXHJcblx0XHRcImltYWdlXCI6SW1hZ2UsXHJcblx0XHRcImhlYWRlclwiOkhlYWRlcixcclxuXHRcdFwiZm9vdGVyXCI6Rm9vdGVyXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEJhc2V7XHJcblx0c3RhdGljIHN1cHBvcnQoe3R5cGV9KXtcclxuXHRcdHJldHVybiB0eXBlPT1cImFwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1vZmZpY2Vkb2N1bWVudC53b3JkcHJvY2Vzc2luZ21sLmRvY3VtZW50XCJcclxuXHR9XHJcblxyXG5cdGxvYWQoZGF0YSwgZG9tYWluKXtcclxuXHRcdGNvbnN0IE1vZGVscz13b3JkaWZ5KGRvbWFpbilcclxuXHRcdGNvbnN0IHNlbGY9dGhpc1xyXG5cdFx0cmV0dXJuIChjbGFzcyBleHRlbmRzIGRvY3g0anN7XHJcblx0XHRcdG9uQ3JlYXRlRWxlbWVudChub2RlLCB0eXBlKXtcclxuXHRcdFx0XHRsZXQge2F0dHJpYnV0ZXMsIGNoaWxkcmVuLCBwYXJlbnR9PW5vZGVcclxuXHRcdFx0XHRpZihBcnJheS5pc0FycmF5KGNoaWxkcmVuKSlcclxuXHRcdFx0XHRcdGNoaWxkcmVuPWNoaWxkcmVuLmZpbHRlcihhPT5hKVxyXG5cdFx0XHRcdGxldCBDb250ZW50PU1vZGVsc1t0eXBlXVxyXG5cdFx0XHRcdGxldCBwcm9wcz1hdHRyaWJ1dGVzXHJcblxyXG5cdFx0XHRcdGlmKENvbnRlbnQpe1xyXG5cdFx0XHRcdFx0bGV0IGRvY3hUeXBlPW5vZGUubmFtZS5zcGxpdCgnOicpWzFdXHJcblx0XHRcdFx0XHRpZigodHlwZT09XCJyb3dcIiB8fCB0eXBlPT1cImNlbGxcIikgJiYgIXByb3BzLmRpcmVjdFN0eWxlKVxyXG5cdFx0XHRcdFx0XHRwcm9wcy5kaXJlY3RTdHlsZT10aGlzLm9mZmljZURvY3VtZW50LnN0eWxlcy5jcmVhdGVEaXJlY3RTdHlsZShudWxsLGAke2RvY3hUeXBlfVByYClcclxuXHRcdFx0XHRcdHJldHVybiBzZWxmLmNyZWF0ZUVsZW1lbnQoQ29udGVudCwgcHJvcHMsIGNoaWxkcmVuKVxyXG5cdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0Y29uc29sZS53YXJuKGAke3R5cGV9IGlzIG5vdCBpZGVudGlmaWVkYClcclxuXHRcdFx0XHRcdHJldHVybiBudWxsXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KS5sb2FkKGRhdGEpLnRoZW4oZG9jeD0+ZG9jeC5wYXJzZSgpKVxyXG5cdH1cclxuXHJcblx0Y3JlYXRlKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5sb2FkKEVNUFRZX0RPQ1gsRWRpdG9yKVxyXG5cdH1cclxufVxyXG5cclxuY29uc3QgRU1QVFlfRE9DWD1cIlwiXHJcbiJdfQ==