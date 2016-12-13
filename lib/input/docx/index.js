"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

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

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _docx4js2 = require("docx4js");

var _docx4js3 = _interopRequireDefault(_docx4js2);

var _base = require("../base");

var _base2 = _interopRequireDefault(_base);

var _editor = require("../../editor");

var _editor2 = _interopRequireDefault(_editor);

var _document = require("./document");

var _document2 = _interopRequireDefault(_document);

var _inline = require("./inline");

var _inline2 = _interopRequireDefault(_inline);

var _text = require("./text");

var _text2 = _interopRequireDefault(_text);

var _paragraph = require("./paragraph");

var _paragraph2 = _interopRequireDefault(_paragraph);

var _cell = require("./cell");

var _cell2 = _interopRequireDefault(_cell);

var _row = require("./row");

var _row2 = _interopRequireDefault(_row);

var _table = require("./table");

var _table2 = _interopRequireDefault(_table);

var _list = require("./list");

var _list2 = _interopRequireDefault(_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function wordify(domain) {
	var Any = domain.Any,
	    Section = domain.Section,
	    Frame = domain.Frame,
	    Image = domain.Image,
	    Header = domain.Header,
	    Footer = domain.Footer;

	return {
		"docx": Any,
		"document": _document2.default,
		"section": Section,
		"paragraph": _paragraph2.default,
		"inline": _inline2.default,
		"text": _text2.default,
		"table": _table2.default,
		"row": _row2.default,
		"cell": _cell2.default,
		"list": _list2.default,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L2luZGV4LmpzIl0sIm5hbWVzIjpbIndvcmRpZnkiLCJkb21haW4iLCJBbnkiLCJTZWN0aW9uIiwiRnJhbWUiLCJJbWFnZSIsIkhlYWRlciIsIkZvb3RlciIsImRhdGEiLCJNb2RlbHMiLCJzZWxmIiwibm9kZSIsInR5cGUiLCJhdHRyaWJ1dGVzIiwiY2hpbGRyZW4iLCJwYXJlbnQiLCJBcnJheSIsImlzQXJyYXkiLCJmaWx0ZXIiLCJhIiwiQ29udGVudCIsInByb3BzIiwiZG9jeFR5cGUiLCJuYW1lIiwic3BsaXQiLCJkaXJlY3RTdHlsZSIsIm9mZmljZURvY3VtZW50Iiwic3R5bGVzIiwiY3JlYXRlRGlyZWN0U3R5bGUiLCJjcmVhdGVFbGVtZW50IiwiY29uc29sZSIsIndhcm4iLCJsb2FkIiwidGhlbiIsImRvY3giLCJwYXJzZSIsIkVNUFRZX0RPQ1giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxTQUFTQSxPQUFULENBQWlCQyxNQUFqQixFQUF3QjtBQUFBLEtBQ2hCQyxHQURnQixHQWFkRCxNQWJjLENBQ2hCQyxHQURnQjtBQUFBLEtBRXRCQyxPQUZzQixHQWFkRixNQWJjLENBRXRCRSxPQUZzQjtBQUFBLEtBTXRCQyxLQU5zQixHQWFkSCxNQWJjLENBTXRCRyxLQU5zQjtBQUFBLEtBT3RCQyxLQVBzQixHQWFkSixNQWJjLENBT3RCSSxLQVBzQjtBQUFBLEtBWXRCQyxNQVpzQixHQWFkTCxNQWJjLENBWXRCSyxNQVpzQjtBQUFBLEtBYXRCQyxNQWJzQixHQWFkTixNQWJjLENBYXRCTSxNQWJzQjs7QUFjdkIsUUFBTztBQUNOLFVBQU9MLEdBREQ7QUFFTixnQ0FGTTtBQUdOLGFBQVVDLE9BSEo7QUFJTixrQ0FKTTtBQUtOLDRCQUxNO0FBTU4sd0JBTk07QUFPTiwwQkFQTTtBQVFOLHNCQVJNO0FBU04sd0JBVE07QUFVTix3QkFWTTtBQVdOLFdBQVFFLEtBWEY7QUFZTixZQUFTQyxNQVpIO0FBYU4sWUFBU0M7QUFiSCxFQUFQO0FBZUE7Ozs7Ozs7Ozs7Ozt1QkFPS0MsSSxFQUFNUCxNLEVBQU87QUFDakIsT0FBTVEsU0FBT1QsUUFBUUMsTUFBUixDQUFiO0FBQ0EsT0FBTVMsT0FBSyxJQUFYO0FBQ0EsVUFBTztBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxxQ0FDVUMsSUFEVixFQUNnQkMsSUFEaEIsRUFDcUI7QUFBQSxVQUNyQkMsVUFEcUIsR0FDU0YsSUFEVCxDQUNyQkUsVUFEcUI7QUFBQSxVQUNUQyxRQURTLEdBQ1NILElBRFQsQ0FDVEcsUUFEUztBQUFBLFVBQ0NDLE1BREQsR0FDU0osSUFEVCxDQUNDSSxNQUREOztBQUUxQixVQUFHQyxNQUFNQyxPQUFOLENBQWNILFFBQWQsQ0FBSCxFQUNDQSxXQUFTQSxTQUFTSSxNQUFULENBQWdCO0FBQUEsY0FBR0MsQ0FBSDtBQUFBLE9BQWhCLENBQVQ7QUFDRCxVQUFJQyxVQUFRWCxPQUFPRyxJQUFQLENBQVo7QUFDQSxVQUFJUyxRQUFNUixVQUFWOztBQUVBLFVBQUdPLE9BQUgsRUFBVztBQUNWLFdBQUlFLFdBQVNYLEtBQUtZLElBQUwsQ0FBVUMsS0FBVixDQUFnQixHQUFoQixFQUFxQixDQUFyQixDQUFiO0FBQ0EsV0FBRyxDQUFDWixRQUFNLEtBQU4sSUFBZUEsUUFBTSxNQUF0QixLQUFpQyxDQUFDUyxNQUFNSSxXQUEzQyxFQUNDSixNQUFNSSxXQUFOLEdBQWtCLEtBQUtDLGNBQUwsQ0FBb0JDLE1BQXBCLENBQTJCQyxpQkFBM0IsQ0FBNkMsSUFBN0MsRUFBcUROLFFBQXJELFFBQWxCO0FBQ0QsY0FBT1osS0FBS21CLGFBQUwsQ0FBbUJULE9BQW5CLEVBQTRCQyxLQUE1QixFQUFtQ1AsUUFBbkMsQ0FBUDtBQUNBLE9BTEQsTUFLSztBQUNKZ0IsZUFBUUMsSUFBUixDQUFnQm5CLElBQWhCO0FBQ0EsY0FBTyxJQUFQO0FBQ0E7QUFDRDtBQWpCSztBQUFBO0FBQUEsd0JBa0JKb0IsSUFsQkksQ0FrQkN4QixJQWxCRCxFQWtCT3lCLElBbEJQLENBa0JZO0FBQUEsV0FBTUMsS0FBS0MsS0FBTCxFQUFOO0FBQUEsSUFsQlosQ0FBUDtBQW1CQTs7OzJCQUVPO0FBQ1AsVUFBTyxLQUFLSCxJQUFMLENBQVVJLFVBQVYsbUJBQVA7QUFDQTs7O2dDQTlCcUI7QUFBQSxPQUFOeEIsSUFBTSxRQUFOQSxJQUFNOztBQUNyQixVQUFPQSxRQUFNLHlFQUFiO0FBQ0E7Ozs7Ozs7O0FBK0JGLElBQU13QixhQUFXLEVBQWpCIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCBkb2N4NGpzIGZyb20gXCJkb2N4NGpzXCJcclxuaW1wb3J0IEJhc2UgZnJvbSBcIi4uL2Jhc2VcIlxyXG5pbXBvcnQgRWRpdG9yIGZyb20gXCIuLi8uLi9lZGl0b3JcIlxyXG5cclxuaW1wb3J0IERvY3VtZW50IGZyb20gXCIuL2RvY3VtZW50XCJcclxuaW1wb3J0IElubGluZSBmcm9tIFwiLi9pbmxpbmVcIlxyXG5pbXBvcnQgVGV4dCBmcm9tIFwiLi90ZXh0XCJcclxuaW1wb3J0IFBhcmFncmFwaCBmcm9tIFwiLi9wYXJhZ3JhcGhcIlxyXG5pbXBvcnQgQ2VsbCBmcm9tIFwiLi9jZWxsXCJcclxuaW1wb3J0IFJvdyBmcm9tIFwiLi9yb3dcIlxyXG5pbXBvcnQgVGFibGUgZnJvbSBcIi4vdGFibGVcIlxyXG5pbXBvcnQgTGlzdCBmcm9tIFwiLi9saXN0XCJcclxuXHJcbmZ1bmN0aW9uIHdvcmRpZnkoZG9tYWluKXtcclxuXHRjb25zdCB7QW55LFxyXG5cdFx0U2VjdGlvbixcclxuXHRcdC8vUGFyYWdyYXBoLFxyXG5cdFx0Ly9JbmxpbmUsXHJcblx0XHQvL1RleHQsXHJcblx0XHRGcmFtZSxcclxuXHRcdEltYWdlLFxyXG5cdFx0Ly9UYWJsZSxcclxuXHRcdC8vUm93LFxyXG5cdFx0Ly9DZWxsLFxyXG5cdFx0Ly9MaXN0LFxyXG5cdFx0SGVhZGVyLFxyXG5cdFx0Rm9vdGVyfT1kb21haW5cclxuXHRyZXR1cm4ge1xyXG5cdFx0XCJkb2N4XCI6QW55LFxyXG5cdFx0XCJkb2N1bWVudFwiOkRvY3VtZW50LFxyXG5cdFx0XCJzZWN0aW9uXCI6U2VjdGlvbixcclxuXHRcdFwicGFyYWdyYXBoXCI6UGFyYWdyYXBoLFxyXG5cdFx0XCJpbmxpbmVcIjpJbmxpbmUsXHJcblx0XHRcInRleHRcIjpUZXh0LFxyXG5cdFx0XCJ0YWJsZVwiOlRhYmxlLFxyXG5cdFx0XCJyb3dcIjpSb3csXHJcblx0XHRcImNlbGxcIjpDZWxsLFxyXG5cdFx0XCJsaXN0XCI6TGlzdCxcclxuXHRcdFwiaW1hZ2VcIjpJbWFnZSxcclxuXHRcdFwiaGVhZGVyXCI6SGVhZGVyLFxyXG5cdFx0XCJmb290ZXJcIjpGb290ZXJcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQmFzZXtcclxuXHRzdGF0aWMgc3VwcG9ydCh7dHlwZX0pe1xyXG5cdFx0cmV0dXJuIHR5cGU9PVwiYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LndvcmRwcm9jZXNzaW5nbWwuZG9jdW1lbnRcIlxyXG5cdH1cclxuXHJcblx0bG9hZChkYXRhLCBkb21haW4pe1xyXG5cdFx0Y29uc3QgTW9kZWxzPXdvcmRpZnkoZG9tYWluKVxyXG5cdFx0Y29uc3Qgc2VsZj10aGlzXHJcblx0XHRyZXR1cm4gKGNsYXNzIGV4dGVuZHMgZG9jeDRqc3tcclxuXHRcdFx0b25DcmVhdGVFbGVtZW50KG5vZGUsIHR5cGUpe1xyXG5cdFx0XHRcdGxldCB7YXR0cmlidXRlcywgY2hpbGRyZW4sIHBhcmVudH09bm9kZVxyXG5cdFx0XHRcdGlmKEFycmF5LmlzQXJyYXkoY2hpbGRyZW4pKVxyXG5cdFx0XHRcdFx0Y2hpbGRyZW49Y2hpbGRyZW4uZmlsdGVyKGE9PmEpXHJcblx0XHRcdFx0bGV0IENvbnRlbnQ9TW9kZWxzW3R5cGVdXHJcblx0XHRcdFx0bGV0IHByb3BzPWF0dHJpYnV0ZXNcclxuXHJcblx0XHRcdFx0aWYoQ29udGVudCl7XHJcblx0XHRcdFx0XHRsZXQgZG9jeFR5cGU9bm9kZS5uYW1lLnNwbGl0KCc6JylbMV1cclxuXHRcdFx0XHRcdGlmKCh0eXBlPT1cInJvd1wiIHx8IHR5cGU9PVwiY2VsbFwiKSAmJiAhcHJvcHMuZGlyZWN0U3R5bGUpXHJcblx0XHRcdFx0XHRcdHByb3BzLmRpcmVjdFN0eWxlPXRoaXMub2ZmaWNlRG9jdW1lbnQuc3R5bGVzLmNyZWF0ZURpcmVjdFN0eWxlKG51bGwsYCR7ZG9jeFR5cGV9UHJgKVxyXG5cdFx0XHRcdFx0cmV0dXJuIHNlbGYuY3JlYXRlRWxlbWVudChDb250ZW50LCBwcm9wcywgY2hpbGRyZW4pXHJcblx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRjb25zb2xlLndhcm4oYCR7dHlwZX0gaXMgbm90IGlkZW50aWZpZWRgKVxyXG5cdFx0XHRcdFx0cmV0dXJuIG51bGxcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pLmxvYWQoZGF0YSkudGhlbihkb2N4PT5kb2N4LnBhcnNlKCkpXHJcblx0fVxyXG5cclxuXHRjcmVhdGUoKXtcclxuXHRcdHJldHVybiB0aGlzLmxvYWQoRU1QVFlfRE9DWCxFZGl0b3IpXHJcblx0fVxyXG59XHJcblxyXG5jb25zdCBFTVBUWV9ET0NYPVwiXCJcclxuIl19