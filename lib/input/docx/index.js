"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Models = undefined;

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
		key: "load1",
		value: function load1(data) {
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
		key: "load",
		value: function load(data) {
			return _docx4js2.default.load(data).then(function (docx) {

				function createComponent(type) {
					var _class, _temp;

					return _temp = _class = function (_Component) {
						_inherits(Content, _Component);

						function Content() {
							_classCallCheck(this, Content);

							return _possibleConstructorReturn(this, Object.getPrototypeOf(Content).apply(this, arguments));
						}

						_createClass(Content, [{
							key: "render",
							value: function render() {
								return _react2.default.createElement(
									"div",
									null,
									this.props.children
								);
							}
						}]);

						return Content;
					}(_react.Component), _class.displayName = type, _temp;
				}

				var root = { name: "docx", children: [] };
				var current = root;
				return new Promise(function (resolve, reject) {
					var partName = docx.rels.officeDocument;
					var data = docx.parts[partName];
					var stream = new _stream.PassThrough();
					stream.end(new Buffer(data.asUint8Array()));
					stream.pipe(require("sax").createStream(true, { xmlns: true }).on("error", function (e) {
						console.error(e);
					}).on("opentag", function (node) {
						current.children.push(node);
						node.parent = current;
						current = node;
						node.children = [];
						if (node.local == "document") node.attributes = null;
					}).on("closetag", function (tag) {
						var _current = current;
						var attributes = _current.attributes;
						var parent = _current.parent;
						var children = _current.children;
						var local = _current.local;
						var name = _current.name;

						var element = _react2.default.createElement(createComponent(local || name), attributes, children);
						var index = parent.children.indexOf(current);
						parent.children.splice(index, 1, element);
						current = parent;
					}).on("end", function (a) {
						resolve({
							createReactElement: function createReactElement() {
								return _react2.default.createElement(createComponent("docx"), null, root.children);
							}
						});
					}).on("text", function (text) {
						if (current !== root) current.children.push(text);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQXlFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUEzRXFCOzs7Ozs7Ozs7Ozt3QkFLZCxNQUFLO0FBQ1YsVUFBTyxrQkFBUSxJQUFSLENBQWEsSUFBYixFQUFtQixJQUFuQixDQUF3QixnQkFBTTtBQUNwQyxRQUFJLFlBQUosQ0FEb0M7QUFFcEMsV0FBTyxLQUFLLEtBQUwsQ0FBVyxrQkFBUSxvQkFBUixDQUE2QixVQUFDLFNBQUQsRUFBWSxZQUFaLEVBQTJCO0FBQ3pFLFNBQUcsVUFBVSxJQUFWLElBQWtCLFVBQVUsSUFBVixDQUFlLE1BQWYsQ0FBc0IsQ0FBdEIsRUFBd0IsQ0FBeEIsS0FBNEIsUUFBNUIsRUFBcUM7QUFDekQsYUFBTyxhQUFhLFFBQWIsQ0FBc0IsU0FBdEIsRUFBZ0MsR0FBaEMsQ0FBUCxDQUR5RDtNQUExRCxNQUVNLElBQUcsWUFBSCxFQUNMLE9BQU8sYUFBYSxXQUFiLENBQXlCLFNBQXpCLEVBQW1DLEdBQW5DLENBQVAsQ0FESyxLQUdMLE9BQU8sTUFBSSx1QkFBYSxTQUFiLENBQUosQ0FIRjtLQUh3QyxDQUF4QyxDQUFQLENBRm9DO0lBQU4sQ0FBL0IsQ0FEVTs7Ozt1QkFjTixNQUFLO0FBQ1QsVUFBTyxrQkFBUSxJQUFSLENBQWEsSUFBYixFQUFtQixJQUFuQixDQUF3QixnQkFBTTs7QUFFcEMsYUFBUyxlQUFULENBQXlCLElBQXpCLEVBQThCOzs7QUFDN0I7Z0JBQWE7Ozs7Ozs7Ozs7Z0NBRUo7QUFDUCxlQUFPOzs7U0FBTSxLQUFLLEtBQUwsQ0FBVyxRQUFYO1NBQWIsQ0FETzs7OzthQUZJO2lDQUNMLGNBQVksV0FEcEIsQ0FENkI7S0FBOUI7O0FBVUEsUUFBSSxPQUFLLEVBQUMsTUFBSyxNQUFMLEVBQVksVUFBUyxFQUFULEVBQWxCLENBWmdDO0FBYXBDLFFBQUksVUFBUSxJQUFSLENBYmdDO0FBY3BDLFdBQU8sSUFBSSxPQUFKLENBQVksVUFBQyxPQUFELEVBQVUsTUFBVixFQUFtQjtBQUNyQyxTQUFJLFdBQVMsS0FBSyxJQUFMLENBQVUsY0FBVixDQUR3QjtBQUVyQyxTQUFJLE9BQUssS0FBSyxLQUFMLENBQVcsUUFBWCxDQUFMLENBRmlDO0FBR3JDLFNBQUksU0FBTyx5QkFBUCxDQUhpQztBQUlyQyxZQUFPLEdBQVAsQ0FBVyxJQUFJLE1BQUosQ0FBVyxLQUFLLFlBQUwsRUFBWCxDQUFYLEVBSnFDO0FBS3JDLFlBQU8sSUFBUCxDQUFZLFFBQVEsS0FBUixFQUFlLFlBQWYsQ0FBNEIsSUFBNUIsRUFBaUMsRUFBQyxPQUFNLElBQU4sRUFBbEMsRUFDVixFQURVLENBQ1AsT0FETyxFQUNFLGFBQUc7QUFDZixjQUFRLEtBQVIsQ0FBYyxDQUFkLEVBRGU7TUFBSCxDQURGLENBR1IsRUFIUSxDQUdMLFNBSEssRUFHTSxnQkFBTTtBQUN0QixjQUFRLFFBQVIsQ0FBaUIsSUFBakIsQ0FBc0IsSUFBdEIsRUFEc0I7QUFFdEIsV0FBSyxNQUFMLEdBQVksT0FBWixDQUZzQjtBQUd0QixnQkFBUSxJQUFSLENBSHNCO0FBSXRCLFdBQUssUUFBTCxHQUFjLEVBQWQsQ0FKc0I7QUFLdEIsVUFBRyxLQUFLLEtBQUwsSUFBWSxVQUFaLEVBQ0YsS0FBSyxVQUFMLEdBQWdCLElBQWhCLENBREQ7TUFMZ0IsQ0FITixDQVVSLEVBVlEsQ0FVTCxVQVZLLEVBVU0sZUFBSztxQkFDNEIsUUFENUI7VUFDZCxpQ0FEYztVQUNGLHlCQURFO1VBQ00sNkJBRE47VUFDZ0IsdUJBRGhCO1VBQ3NCLHFCQUR0Qjs7QUFFckIsVUFBSSxVQUFRLGdCQUFNLGFBQU4sQ0FBb0IsZ0JBQWdCLFNBQU8sSUFBUCxDQUFwQyxFQUFrRCxVQUFsRCxFQUE4RCxRQUE5RCxDQUFSLENBRmlCO0FBR3JCLFVBQUksUUFBTSxPQUFPLFFBQVAsQ0FBZ0IsT0FBaEIsQ0FBd0IsT0FBeEIsQ0FBTixDQUhpQjtBQUlyQixhQUFPLFFBQVAsQ0FBZ0IsTUFBaEIsQ0FBdUIsS0FBdkIsRUFBNkIsQ0FBN0IsRUFBK0IsT0FBL0IsRUFKcUI7QUFLckIsZ0JBQVEsTUFBUixDQUxxQjtNQUFMLENBVk4sQ0FnQlIsRUFoQlEsQ0FnQkwsS0FoQkssRUFnQkUsYUFBRztBQUNmLGNBQVE7QUFDUCx5REFBb0I7QUFDbkIsZUFBTyxnQkFBTSxhQUFOLENBQW9CLGdCQUFnQixNQUFoQixDQUFwQixFQUE2QyxJQUE3QyxFQUFtRCxLQUFLLFFBQUwsQ0FBMUQsQ0FEbUI7UUFEYjtPQUFSLEVBRGU7TUFBSCxDQWhCRixDQXNCUixFQXRCUSxDQXNCTCxNQXRCSyxFQXNCRyxnQkFBTTtBQUNuQixVQUFHLFlBQVUsSUFBVixFQUNGLFFBQVEsUUFBUixDQUFpQixJQUFqQixDQUFzQixJQUF0QixFQUREO01BRGEsQ0F0QmYsRUFMcUM7S0FBbkIsQ0FBbkIsQ0Fkb0M7SUFBTixDQUEvQixDQURTOzs7OzBCQWxCSyxNQUFLO0FBQ25CLFVBQU8sSUFBUCxDQURtQjs7OztRQURBOzs7O0FBNkVkLElBQUksMEJBQU87QUFDakIsNkJBRGlCO0FBRWhCLDJCQUZnQjtBQUdoQix1QkFIZ0I7QUFJaEIscUJBSmdCO0FBS2hCLHVCQUxnQjtDQUFQIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRvY3g0anMgZnJvbSBcImRvY3g0anNcIlxyXG5pbXBvcnQgQmFzZSBmcm9tIFwiLi4vYmFzZVwiXHJcbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtQYXNzVGhyb3VnaH0gZnJvbSBcInN0cmVhbVwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb2N4IGV4dGVuZHMgQmFzZXtcclxuXHRzdGF0aWMgc3VwcG9ydChmaWxlKXtcclxuXHRcdHJldHVybiB0cnVlXHJcblx0fVxyXG5cclxuXHRsb2FkMShkYXRhKXtcclxuXHRcdHJldHVybiBkb2N4NGpzLmxvYWQoZGF0YSkudGhlbihkb2N4PT57XHJcblx0XHRcdGxldCBkb2NcclxuXHRcdFx0cmV0dXJuIGRvY3gucGFyc2UoZG9jeDRqcy5jcmVhdGVWaXNpdG9yRmFjdG9yeSgod29yZE1vZGVsLCB0YXJnZXRQYXJlbnQpPT57XHJcblx0XHRcdFx0aWYod29yZE1vZGVsLnR5cGUgJiYgd29yZE1vZGVsLnR5cGUuc3Vic3RyKDAsNik9PSdzdHlsZS4nKXtcclxuXHRcdFx0XHRcdHJldHVybiB0YXJnZXRQYXJlbnQuYWRkU3R5bGUod29yZE1vZGVsLGRvYylcclxuXHRcdFx0XHR9ZWxzZSBpZih0YXJnZXRQYXJlbnQpXHJcblx0XHRcdFx0XHRyZXR1cm4gdGFyZ2V0UGFyZW50LmFwcGVuZENoaWxkKHdvcmRNb2RlbCxkb2MpXHJcblx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0cmV0dXJuIGRvYz1uZXcgRG9jdW1lbnQod29yZE1vZGVsKVxyXG5cdFx0XHR9KSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdFxyXG5cdGxvYWQoZGF0YSl7XHJcblx0XHRyZXR1cm4gZG9jeDRqcy5sb2FkKGRhdGEpLnRoZW4oZG9jeD0+e1xyXG5cdFx0XHRcclxuXHRcdFx0ZnVuY3Rpb24gY3JlYXRlQ29tcG9uZW50KHR5cGUpe1xyXG5cdFx0XHRcdHJldHVybiBjbGFzcyBDb250ZW50IGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdFx0XHRcdFx0c3RhdGljIGRpc3BsYXlOYW1lPXR5cGVcclxuXHRcdFx0XHRcdHJlbmRlcigpe1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gPGRpdj57dGhpcy5wcm9wcy5jaGlsZHJlbn08L2Rpdj5cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdFxyXG5cdFx0XHRsZXQgcm9vdD17bmFtZTpcImRvY3hcIixjaGlsZHJlbjpbXX1cclxuXHRcdFx0bGV0IGN1cnJlbnQ9cm9vdFxyXG5cdFx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PntcclxuXHRcdFx0XHRsZXQgcGFydE5hbWU9ZG9jeC5yZWxzLm9mZmljZURvY3VtZW50XHJcblx0XHRcdFx0bGV0IGRhdGE9ZG9jeC5wYXJ0c1twYXJ0TmFtZV1cclxuXHRcdFx0XHRsZXQgc3RyZWFtPW5ldyBQYXNzVGhyb3VnaCgpXHJcblx0XHRcdFx0c3RyZWFtLmVuZChuZXcgQnVmZmVyKGRhdGEuYXNVaW50OEFycmF5KCkpKVxyXG5cdFx0XHRcdHN0cmVhbS5waXBlKHJlcXVpcmUoXCJzYXhcIikuY3JlYXRlU3RyZWFtKHRydWUse3htbG5zOnRydWV9KVxyXG5cdFx0XHRcdFx0Lm9uKFwiZXJyb3JcIiwgZT0+e1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKGUpXHJcblx0XHRcdFx0XHR9KS5vbihcIm9wZW50YWdcIiwgbm9kZT0+e1xyXG5cdFx0XHRcdFx0XHRjdXJyZW50LmNoaWxkcmVuLnB1c2gobm9kZSlcclxuXHRcdFx0XHRcdFx0bm9kZS5wYXJlbnQ9Y3VycmVudFxyXG5cdFx0XHRcdFx0XHRjdXJyZW50PW5vZGVcclxuXHRcdFx0XHRcdFx0bm9kZS5jaGlsZHJlbj1bXVxyXG5cdFx0XHRcdFx0XHRpZihub2RlLmxvY2FsPT1cImRvY3VtZW50XCIpXHJcblx0XHRcdFx0XHRcdFx0bm9kZS5hdHRyaWJ1dGVzPW51bGxcclxuXHRcdFx0XHRcdH0pLm9uKFwiY2xvc2V0YWdcIix0YWc9PntcclxuXHRcdFx0XHRcdFx0Y29uc3Qge2F0dHJpYnV0ZXMsIHBhcmVudCwgY2hpbGRyZW4sIGxvY2FsLG5hbWV9PWN1cnJlbnRcclxuXHRcdFx0XHRcdFx0bGV0IGVsZW1lbnQ9UmVhY3QuY3JlYXRlRWxlbWVudChjcmVhdGVDb21wb25lbnQobG9jYWx8fG5hbWUpLCBhdHRyaWJ1dGVzLCBjaGlsZHJlbilcclxuXHRcdFx0XHRcdFx0bGV0IGluZGV4PXBhcmVudC5jaGlsZHJlbi5pbmRleE9mKGN1cnJlbnQpXHJcblx0XHRcdFx0XHRcdHBhcmVudC5jaGlsZHJlbi5zcGxpY2UoaW5kZXgsMSxlbGVtZW50KVxyXG5cdFx0XHRcdFx0XHRjdXJyZW50PXBhcmVudFxyXG5cdFx0XHRcdFx0fSkub24oXCJlbmRcIiwgYT0+e1xyXG5cdFx0XHRcdFx0XHRyZXNvbHZlKHtcclxuXHRcdFx0XHRcdFx0XHRjcmVhdGVSZWFjdEVsZW1lbnQoKXtcclxuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KGNyZWF0ZUNvbXBvbmVudChcImRvY3hcIiksIG51bGwsIHJvb3QuY2hpbGRyZW4pXHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0fSkub24oXCJ0ZXh0XCIsIHRleHQ9PntcclxuXHRcdFx0XHRcdFx0aWYoY3VycmVudCE9PXJvb3QpXHJcblx0XHRcdFx0XHRcdFx0Y3VycmVudC5jaGlsZHJlbi5wdXNoKHRleHQpXHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdClcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG59XHJcblxyXG5pbXBvcnQgRG9jdW1lbnQgZnJvbSBcIi4vZG9jdW1lbnRcIlxyXG5pbXBvcnQgU2VjdGlvbiBmcm9tIFwiLi9zZWN0aW9uXCJcclxuaW1wb3J0IEltYWdlIGZyb20gXCIuL2ltYWdlXCJcclxuaW1wb3J0IFRleHQgZnJvbSBcIi4vdGV4dFwiXHJcbmltcG9ydCBUYWJsZSBmcm9tIFwiLi90YWJsZVwiXHJcblxyXG5leHBvcnQgbGV0IE1vZGVscz17XHJcblx0RG9jdW1lbnRcclxuXHQsU2VjdGlvblxyXG5cdCxJbWFnZVxyXG5cdCxUZXh0XHJcblx0LFRhYmxlXHJcbn1cclxuIl19