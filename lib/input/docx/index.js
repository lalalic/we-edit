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
						delete props.isSelfClosing;
						if (Content) {
							if ((type == "tr" || type == "tc") && !props.directStyle) props.directStyle = this.officeDocument.styles.createDirectStyle({}, type + "Pr");
							if (type == 'hdr' || type == 'ftr') props.key = type + "_$props.type}";
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
	var Header = domain.Header;
	var Footer = domain.Footer;

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
		"image": Image,
		"hdr": Header,
		"ftr": Footer
	};
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUdxQjs7Ozs7Ozs7Ozs7dUJBS2YsTUFBTSxRQUFPO0FBQ2pCLE9BQU0sU0FBTyxRQUFRLE1BQVIsQ0FBUCxDQURXOztBQUdqQixVQUFPOzs7Ozs7Ozs7OztxQ0FDVSxNQUFNLE1BQUs7VUFDckIsYUFBc0IsS0FBdEIsV0FEcUI7VUFDVCxXQUFVLEtBQVYsU0FEUzs7QUFFMUIsVUFBRyxNQUFNLE9BQU4sQ0FBYyxRQUFkLENBQUgsRUFDQyxXQUFTLFNBQVMsTUFBVCxDQUFnQjtjQUFHO09BQUgsQ0FBekIsQ0FERDtBQUVBLFVBQUksVUFBUSxPQUFPLElBQVAsQ0FBUixDQUpzQjtBQUsxQixVQUFJLFFBQU0sVUFBTixDQUxzQjtBQU0xQixhQUFPLE1BQU0sYUFBTixDQU5tQjtBQU8xQixVQUFHLE9BQUgsRUFBVztBQUNWLFdBQUcsQ0FBQyxRQUFNLElBQU4sSUFBYyxRQUFNLElBQU4sQ0FBZixJQUE4QixDQUFDLE1BQU0sV0FBTixFQUNqQyxNQUFNLFdBQU4sR0FBa0IsS0FBSyxjQUFMLENBQW9CLE1BQXBCLENBQTJCLGlCQUEzQixDQUE2QyxFQUE3QyxFQUFtRCxXQUFuRCxDQUFsQixDQUREO0FBRUEsV0FBRyxRQUFNLEtBQU4sSUFBZSxRQUFNLEtBQU4sRUFDakIsTUFBTSxHQUFOLEdBQWEsc0JBQWIsQ0FERDtBQUVBLGNBQU8sZ0JBQU0sYUFBTixDQUFvQixPQUFwQixFQUE2QixLQUE3QixFQUFvQyxRQUFwQyxDQUFQLENBTFU7T0FBWCxNQU1LO0FBQ0osZUFBUSxJQUFSLENBQWdCLDJCQUFoQixFQURJO0FBRUosY0FBTyxJQUFQLENBRkk7T0FOTDs7Ozs7dUJBUkssQ0FvQkosSUFwQkksQ0FvQkMsSUFwQkQsRUFvQk8sSUFwQlAsQ0FvQlk7V0FBTSxLQUFLLEtBQUwsR0FBYSxJQUFiLENBQWtCLGdCQUFNO0FBQ2hELGFBQVEsR0FBUixDQUFZLElBQVosRUFEZ0Q7QUFFaEQsWUFBTyxJQUFQLENBRmdEO0tBQU47SUFBeEIsQ0FwQm5CLENBSGlCOzs7OzBCQUpILE1BQUs7QUFDbkIsVUFBTyxJQUFQLENBRG1COzs7O1FBREE7Ozs7OztBQW1DckIsU0FBUyxPQUFULENBQWlCLE1BQWpCLEVBQXdCO0tBQ2pCOzs7Ozs7Ozs7OztxQ0FDWTtBQUNoQixRQUFNLGlDQUZGLHdEQUVFLENBRFU7QUFFaEIsUUFBSSxtQkFBaUIsSUFBSSxlQUFKLENBRkw7QUFHaEIsV0FBTyxPQUFPLE1BQVAsQ0FBYyxHQUFkLEVBQWtCO0FBQ3hCLCtDQUFnQixNQUFLO0FBQ3BCLGNBQU8sSUFBUDtBQUNBLFlBQUssUUFBTDtBQUNDLGVBQUssV0FBTCxDQUREO0FBRUEsY0FGQTtBQURBLE9BRG9CO0FBTXBCLGFBQU8saUJBQWlCLElBQWpCLENBQVAsQ0FOb0I7TUFERztLQUFsQixDQUFQLENBSGdCOzs7O1NBRFo7R0FBaUIsT0FBTyxRQUFQLEVBREE7O0tBaUJoQixNQVlFLE9BWkYsSUFqQmdCO0tBa0J0QixVQVdRLE9BWFIsUUFsQnNCO0tBbUJ0QixZQVVRLE9BVlIsVUFuQnNCO0tBb0J0QixTQVNRLE9BVFIsT0FwQnNCO0tBcUJ0QixPQVFRLE9BUlIsS0FyQnNCO0tBc0J0QixRQU9RLE9BUFIsTUF0QnNCO0tBdUJ0QixRQU1RLE9BTlIsTUF2QnNCO0tBd0J0QixRQUtRLE9BTFIsTUF4QnNCO0tBeUJ0QixNQUlRLE9BSlIsSUF6QnNCO0tBMEJ0QixPQUdRLE9BSFIsS0ExQnNCO0tBMkJ0QixPQUVRLE9BRlIsS0EzQnNCO0tBNEJ0QixTQUNRLE9BRFIsT0E1QnNCO0tBNkJ0QixTQUFRLE9BQVIsT0E3QnNCOztBQThCdkIsUUFBTztBQUNOLFVBQU8sR0FBUDtBQUNBLGNBQVcsUUFBWDtBQUNBLGFBQVUsT0FBVjtBQUNBLE9BQUksU0FBSjtBQUNBLE9BQUksTUFBSjtBQUNBLE9BQUksSUFBSjtBQUNBLFNBQU0sS0FBTjtBQUNBLFFBQUssR0FBTDtBQUNBLFFBQUssSUFBTDtBQUNBLFVBQU8sSUFBUDtBQUNBLFdBQVEsS0FBUjtBQUNBLFNBQU0sTUFBTjtBQUNBLFNBQU0sTUFBTjtFQWJELENBOUJ1QjtDQUF4QiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkb2N4NGpzIGZyb20gXCJkb2N4NGpzXCJcclxuaW1wb3J0IEJhc2UgZnJvbSBcIi4uL2Jhc2VcIlxyXG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCJcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb2N4IGV4dGVuZHMgQmFzZXtcclxuXHRzdGF0aWMgc3VwcG9ydChmaWxlKXtcclxuXHRcdHJldHVybiB0cnVlXHJcblx0fVxyXG5cclxuXHRsb2FkKGRhdGEsIGRvbWFpbil7XHJcblx0XHRjb25zdCBNb2RlbHM9d29yZGlmeShkb21haW4pXHJcblxyXG5cdFx0cmV0dXJuIChjbGFzcyBleHRlbmRzIGRvY3g0anN7XHJcblx0XHRcdG9uQ3JlYXRlRWxlbWVudChub2RlLCB0eXBlKXtcclxuXHRcdFx0XHRsZXQge2F0dHJpYnV0ZXMsIGNoaWxkcmVufT1ub2RlXHJcblx0XHRcdFx0aWYoQXJyYXkuaXNBcnJheShjaGlsZHJlbikpXHJcblx0XHRcdFx0XHRjaGlsZHJlbj1jaGlsZHJlbi5maWx0ZXIoYT0+YSlcclxuXHRcdFx0XHRsZXQgQ29udGVudD1Nb2RlbHNbdHlwZV1cclxuXHRcdFx0XHRsZXQgcHJvcHM9YXR0cmlidXRlc1xyXG5cdFx0XHRcdGRlbGV0ZSBwcm9wcy5pc1NlbGZDbG9zaW5nXHJcblx0XHRcdFx0aWYoQ29udGVudCl7XHJcblx0XHRcdFx0XHRpZigodHlwZT09XCJ0clwiIHx8IHR5cGU9PVwidGNcIikgJiYgIXByb3BzLmRpcmVjdFN0eWxlKVxyXG5cdFx0XHRcdFx0XHRwcm9wcy5kaXJlY3RTdHlsZT10aGlzLm9mZmljZURvY3VtZW50LnN0eWxlcy5jcmVhdGVEaXJlY3RTdHlsZSh7fSxgJHt0eXBlfVByYClcclxuXHRcdFx0XHRcdGlmKHR5cGU9PSdoZHInIHx8IHR5cGU9PSdmdHInKVxyXG5cdFx0XHRcdFx0XHRwcm9wcy5rZXk9YCR7dHlwZX1fJHByb3BzLnR5cGV9YFxyXG5cdFx0XHRcdFx0cmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ29udGVudCwgcHJvcHMsIGNoaWxkcmVuKVxyXG5cdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0Y29uc29sZS53YXJuKGAke3R5cGV9IGlzIG5vdCBpZGVudGlmaWVkYClcclxuXHRcdFx0XHRcdHJldHVybiBudWxsXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fSkubG9hZChkYXRhKS50aGVuKGRvY3g9PmRvY3gucGFyc2UoKS50aGVuKGRvY3g9PntcclxuXHRcdFx0Y29uc29sZS5sb2coZG9jeClcclxuXHRcdFx0cmV0dXJuIGRvY3hcclxuXHRcdH0pKVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gd29yZGlmeShkb21haW4pe1xyXG5cdGNsYXNzIERvY3VtZW50IGV4dGVuZHMgZG9tYWluLkRvY3VtZW50e1xyXG5cdFx0Z2V0Q2hpbGRDb250ZXh0KCl7XHJcblx0XHRcdGNvbnN0IGN0eD1zdXBlci5nZXRDaGlsZENvbnRleHQoKVxyXG5cdFx0XHRsZXQgX2dldERlZmF1bHRTdHlsZT1jdHguZ2V0RGVmYXVsdFN0eWxlXHJcblx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKGN0eCx7XHJcblx0XHRcdFx0Z2V0RGVmYXVsdFN0eWxlKHR5cGUpe1xyXG5cdFx0XHRcdFx0c3dpdGNoKHR5cGUpe1xyXG5cdFx0XHRcdFx0Y2FzZSAnaW5saW5lJzpcclxuXHRcdFx0XHRcdFx0dHlwZT1cImNoYXJhY3RlclwiXHJcblx0XHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0cmV0dXJuIF9nZXREZWZhdWx0U3R5bGUodHlwZSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pXHJcblx0XHR9XHJcblx0fVxyXG5cdGNvbnN0IHtBbnksXHJcblx0XHRTZWN0aW9uLFxyXG5cdFx0UGFyYWdyYXBoLFxyXG5cdFx0SW5saW5lLFxyXG5cdFx0VGV4dCxcclxuXHRcdEZyYW1lLFxyXG5cdFx0SW1hZ2UsXHJcblx0XHRUYWJsZSxcclxuXHRcdFJvdyxcclxuXHRcdENlbGwsXHJcblx0XHRMaXN0LFxyXG5cdFx0SGVhZGVyLFxyXG5cdFx0Rm9vdGVyfT1kb21haW5cclxuXHRyZXR1cm4ge1xyXG5cdFx0XCJkb2N4XCI6QW55LFxyXG5cdFx0XCJkb2N1bWVudFwiOkRvY3VtZW50LFxyXG5cdFx0XCJzZWN0aW9uXCI6U2VjdGlvbixcclxuXHRcdFwicFwiOlBhcmFncmFwaCxcclxuXHRcdFwiclwiOklubGluZSxcclxuXHRcdFwidFwiOlRleHQsXHJcblx0XHRcInRibFwiOlRhYmxlLFxyXG5cdFx0XCJ0clwiOlJvdyxcclxuXHRcdFwidGNcIjpDZWxsLFxyXG5cdFx0XCJsaXN0XCI6TGlzdCxcclxuXHRcdFwiaW1hZ2VcIjpJbWFnZSxcclxuXHRcdFwiaGRyXCI6SGVhZGVyLFxyXG5cdFx0XCJmdHJcIjpGb290ZXJcclxuXHR9XHJcbn1cclxuIl19