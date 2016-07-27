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
						var parent = node.parent;

						if (Array.isArray(children)) children = children.filter(function (a) {
							return a;
						});
						var Content = Models[type];
						var props = attributes;
						delete props.isSelfClosing;
						if (Content) {
							if ((type == "tr" || type == "tc") && !props.directStyle) props.directStyle = this.officeDocument.styles.createDirectStyle({}, type + "Pr");
							if (type == 'hdr' || type == 'ftr') props.key = type + "_" + props.type;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUdxQjs7Ozs7Ozs7Ozs7dUJBS2YsTUFBTSxRQUFPO0FBQ2pCLE9BQU0sU0FBTyxRQUFRLE1BQVIsQ0FBUCxDQURXOztBQUdqQixVQUFPOzs7Ozs7Ozs7OztxQ0FDVSxNQUFNLE1BQUs7VUFDckIsYUFBOEIsS0FBOUIsV0FEcUI7VUFDVCxXQUFrQixLQUFsQixTQURTO1VBQ0MsU0FBUSxLQUFSLE9BREQ7O0FBRTFCLFVBQUcsTUFBTSxPQUFOLENBQWMsUUFBZCxDQUFILEVBQ0MsV0FBUyxTQUFTLE1BQVQsQ0FBZ0I7Y0FBRztPQUFILENBQXpCLENBREQ7QUFFQSxVQUFJLFVBQVEsT0FBTyxJQUFQLENBQVIsQ0FKc0I7QUFLMUIsVUFBSSxRQUFNLFVBQU4sQ0FMc0I7QUFNMUIsYUFBTyxNQUFNLGFBQU4sQ0FObUI7QUFPMUIsVUFBRyxPQUFILEVBQVc7QUFDVixXQUFHLENBQUMsUUFBTSxJQUFOLElBQWMsUUFBTSxJQUFOLENBQWYsSUFBOEIsQ0FBQyxNQUFNLFdBQU4sRUFDakMsTUFBTSxXQUFOLEdBQWtCLEtBQUssY0FBTCxDQUFvQixNQUFwQixDQUEyQixpQkFBM0IsQ0FBNkMsRUFBN0MsRUFBbUQsV0FBbkQsQ0FBbEIsQ0FERDtBQUVBLFdBQUcsUUFBTSxLQUFOLElBQWUsUUFBTSxLQUFOLEVBQ2pCLE1BQU0sR0FBTixHQUFhLGFBQVEsTUFBTSxJQUFOLENBRHRCOztBQUdBLGNBQU8sZ0JBQU0sYUFBTixDQUFvQixPQUFwQixFQUE2QixLQUE3QixFQUFvQyxRQUFwQyxDQUFQLENBTlU7T0FBWCxNQU9LO0FBQ0osZUFBUSxJQUFSLENBQWdCLDJCQUFoQixFQURJO0FBRUosY0FBTyxJQUFQLENBRkk7T0FQTDs7Ozs7dUJBUkssQ0FxQkosSUFyQkksQ0FxQkMsSUFyQkQsRUFxQk8sSUFyQlAsQ0FxQlk7V0FBTSxLQUFLLEtBQUwsR0FBYSxJQUFiLENBQWtCLGdCQUFNO0FBQ2hELGFBQVEsR0FBUixDQUFZLElBQVosRUFEZ0Q7QUFFaEQsWUFBTyxJQUFQLENBRmdEO0tBQU47SUFBeEIsQ0FyQm5CLENBSGlCOzs7OzBCQUpILE1BQUs7QUFDbkIsVUFBTyxJQUFQLENBRG1COzs7O1FBREE7Ozs7OztBQW9DckIsU0FBUyxPQUFULENBQWlCLE1BQWpCLEVBQXdCO0tBQ2pCOzs7Ozs7Ozs7OztxQ0FDWTtBQUNoQixRQUFNLGlDQUZGLHdEQUVFLENBRFU7QUFFaEIsUUFBSSxtQkFBaUIsSUFBSSxlQUFKLENBRkw7QUFHaEIsV0FBTyxPQUFPLE1BQVAsQ0FBYyxHQUFkLEVBQWtCO0FBQ3hCLCtDQUFnQixNQUFLO0FBQ3BCLGNBQU8sSUFBUDtBQUNBLFlBQUssUUFBTDtBQUNDLGVBQUssV0FBTCxDQUREO0FBRUEsY0FGQTtBQURBLE9BRG9CO0FBTXBCLGFBQU8saUJBQWlCLElBQWpCLENBQVAsQ0FOb0I7TUFERztLQUFsQixDQUFQLENBSGdCOzs7O1NBRFo7R0FBaUIsT0FBTyxRQUFQLEVBREE7O0tBaUJoQixNQVlFLE9BWkYsSUFqQmdCO0tBa0J0QixVQVdRLE9BWFIsUUFsQnNCO0tBbUJ0QixZQVVRLE9BVlIsVUFuQnNCO0tBb0J0QixTQVNRLE9BVFIsT0FwQnNCO0tBcUJ0QixPQVFRLE9BUlIsS0FyQnNCO0tBc0J0QixRQU9RLE9BUFIsTUF0QnNCO0tBdUJ0QixRQU1RLE9BTlIsTUF2QnNCO0tBd0J0QixRQUtRLE9BTFIsTUF4QnNCO0tBeUJ0QixNQUlRLE9BSlIsSUF6QnNCO0tBMEJ0QixPQUdRLE9BSFIsS0ExQnNCO0tBMkJ0QixPQUVRLE9BRlIsS0EzQnNCO0tBNEJ0QixTQUNRLE9BRFIsT0E1QnNCO0tBNkJ0QixTQUFRLE9BQVIsT0E3QnNCOztBQThCdkIsUUFBTztBQUNOLFVBQU8sR0FBUDtBQUNBLGNBQVcsUUFBWDtBQUNBLGFBQVUsT0FBVjtBQUNBLE9BQUksU0FBSjtBQUNBLE9BQUksTUFBSjtBQUNBLE9BQUksSUFBSjtBQUNBLFNBQU0sS0FBTjtBQUNBLFFBQUssR0FBTDtBQUNBLFFBQUssSUFBTDtBQUNBLFVBQU8sSUFBUDtBQUNBLFdBQVEsS0FBUjtBQUNBLFNBQU0sTUFBTjtBQUNBLFNBQU0sTUFBTjtFQWJELENBOUJ1QjtDQUF4QiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkb2N4NGpzIGZyb20gXCJkb2N4NGpzXCJcclxuaW1wb3J0IEJhc2UgZnJvbSBcIi4uL2Jhc2VcIlxyXG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCJcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb2N4IGV4dGVuZHMgQmFzZXtcclxuXHRzdGF0aWMgc3VwcG9ydChmaWxlKXtcclxuXHRcdHJldHVybiB0cnVlXHJcblx0fVxyXG5cclxuXHRsb2FkKGRhdGEsIGRvbWFpbil7XHJcblx0XHRjb25zdCBNb2RlbHM9d29yZGlmeShkb21haW4pXHJcblxyXG5cdFx0cmV0dXJuIChjbGFzcyBleHRlbmRzIGRvY3g0anN7XHJcblx0XHRcdG9uQ3JlYXRlRWxlbWVudChub2RlLCB0eXBlKXtcclxuXHRcdFx0XHRsZXQge2F0dHJpYnV0ZXMsIGNoaWxkcmVuLCBwYXJlbnR9PW5vZGVcclxuXHRcdFx0XHRpZihBcnJheS5pc0FycmF5KGNoaWxkcmVuKSlcclxuXHRcdFx0XHRcdGNoaWxkcmVuPWNoaWxkcmVuLmZpbHRlcihhPT5hKVxyXG5cdFx0XHRcdGxldCBDb250ZW50PU1vZGVsc1t0eXBlXVxyXG5cdFx0XHRcdGxldCBwcm9wcz1hdHRyaWJ1dGVzXHJcblx0XHRcdFx0ZGVsZXRlIHByb3BzLmlzU2VsZkNsb3NpbmdcclxuXHRcdFx0XHRpZihDb250ZW50KXtcclxuXHRcdFx0XHRcdGlmKCh0eXBlPT1cInRyXCIgfHwgdHlwZT09XCJ0Y1wiKSAmJiAhcHJvcHMuZGlyZWN0U3R5bGUpXHJcblx0XHRcdFx0XHRcdHByb3BzLmRpcmVjdFN0eWxlPXRoaXMub2ZmaWNlRG9jdW1lbnQuc3R5bGVzLmNyZWF0ZURpcmVjdFN0eWxlKHt9LGAke3R5cGV9UHJgKVxyXG5cdFx0XHRcdFx0aWYodHlwZT09J2hkcicgfHwgdHlwZT09J2Z0cicpXHJcblx0XHRcdFx0XHRcdHByb3BzLmtleT1gJHt0eXBlfV8ke3Byb3BzLnR5cGV9YFxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRyZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChDb250ZW50LCBwcm9wcywgY2hpbGRyZW4pXHJcblx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRjb25zb2xlLndhcm4oYCR7dHlwZX0gaXMgbm90IGlkZW50aWZpZWRgKVxyXG5cdFx0XHRcdFx0cmV0dXJuIG51bGxcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHR9KS5sb2FkKGRhdGEpLnRoZW4oZG9jeD0+ZG9jeC5wYXJzZSgpLnRoZW4oZG9jeD0+e1xyXG5cdFx0XHRjb25zb2xlLmxvZyhkb2N4KVxyXG5cdFx0XHRyZXR1cm4gZG9jeFxyXG5cdFx0fSkpXHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiB3b3JkaWZ5KGRvbWFpbil7XHJcblx0Y2xhc3MgRG9jdW1lbnQgZXh0ZW5kcyBkb21haW4uRG9jdW1lbnR7XHJcblx0XHRnZXRDaGlsZENvbnRleHQoKXtcclxuXHRcdFx0Y29uc3QgY3R4PXN1cGVyLmdldENoaWxkQ29udGV4dCgpXHJcblx0XHRcdGxldCBfZ2V0RGVmYXVsdFN0eWxlPWN0eC5nZXREZWZhdWx0U3R5bGVcclxuXHRcdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oY3R4LHtcclxuXHRcdFx0XHRnZXREZWZhdWx0U3R5bGUodHlwZSl7XHJcblx0XHRcdFx0XHRzd2l0Y2godHlwZSl7XHJcblx0XHRcdFx0XHRjYXNlICdpbmxpbmUnOlxyXG5cdFx0XHRcdFx0XHR0eXBlPVwiY2hhcmFjdGVyXCJcclxuXHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRyZXR1cm4gX2dldERlZmF1bHRTdHlsZSh0eXBlKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHR9XHJcblx0Y29uc3Qge0FueSxcclxuXHRcdFNlY3Rpb24sXHJcblx0XHRQYXJhZ3JhcGgsXHJcblx0XHRJbmxpbmUsXHJcblx0XHRUZXh0LFxyXG5cdFx0RnJhbWUsXHJcblx0XHRJbWFnZSxcclxuXHRcdFRhYmxlLFxyXG5cdFx0Um93LFxyXG5cdFx0Q2VsbCxcclxuXHRcdExpc3QsXHJcblx0XHRIZWFkZXIsXHJcblx0XHRGb290ZXJ9PWRvbWFpblxyXG5cdHJldHVybiB7XHJcblx0XHRcImRvY3hcIjpBbnksXHJcblx0XHRcImRvY3VtZW50XCI6RG9jdW1lbnQsXHJcblx0XHRcInNlY3Rpb25cIjpTZWN0aW9uLFxyXG5cdFx0XCJwXCI6UGFyYWdyYXBoLFxyXG5cdFx0XCJyXCI6SW5saW5lLFxyXG5cdFx0XCJ0XCI6VGV4dCxcclxuXHRcdFwidGJsXCI6VGFibGUsXHJcblx0XHRcInRyXCI6Um93LFxyXG5cdFx0XCJ0Y1wiOkNlbGwsXHJcblx0XHRcImxpc3RcIjpMaXN0LFxyXG5cdFx0XCJpbWFnZVwiOkltYWdlLFxyXG5cdFx0XCJoZHJcIjpIZWFkZXIsXHJcblx0XHRcImZ0clwiOkZvb3RlclxyXG5cdH1cclxufVxyXG4iXX0=