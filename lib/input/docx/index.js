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
		value: function load2(data) {
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

				return new Promise(function (resolve, reject) {
					var root = { name: "docx", children: [] };
					var current = root;
					var data = docx.parts[docx.rels.officeDocument];
					var stream = new _stream.PassThrough();
					stream.end(new Buffer(data.asUint8Array()));
					stream.pipe(require("sax").createStream(true, { xmlns: false }).on("error", function (e) {
						console.error(e);
					}).on("opentag", function (node) {
						current.children.push(node);
						node.parent = current;
						current = node;
						node.children = [];
					}).on("closetag", function (tag) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQXNFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUF4RXFCOzs7Ozs7Ozs7Ozt1QkFLZixNQUFLO0FBQ1QsVUFBTyxrQkFBUSxJQUFSLENBQWEsSUFBYixFQUFtQixJQUFuQixDQUF3QixnQkFBTTtBQUNwQyxRQUFJLFlBQUosQ0FEb0M7QUFFcEMsV0FBTyxLQUFLLEtBQUwsQ0FBVyxrQkFBUSxvQkFBUixDQUE2QixVQUFDLFNBQUQsRUFBWSxZQUFaLEVBQTJCO0FBQ3pFLFNBQUcsVUFBVSxJQUFWLElBQWtCLFVBQVUsSUFBVixDQUFlLE1BQWYsQ0FBc0IsQ0FBdEIsRUFBd0IsQ0FBeEIsS0FBNEIsUUFBNUIsRUFBcUM7QUFDekQsYUFBTyxhQUFhLFFBQWIsQ0FBc0IsU0FBdEIsRUFBZ0MsR0FBaEMsQ0FBUCxDQUR5RDtNQUExRCxNQUVNLElBQUcsWUFBSCxFQUNMLE9BQU8sYUFBYSxXQUFiLENBQXlCLFNBQXpCLEVBQW1DLEdBQW5DLENBQVAsQ0FESyxLQUdMLE9BQU8sTUFBSSx1QkFBYSxTQUFiLENBQUosQ0FIRjtLQUh3QyxDQUF4QyxDQUFQLENBRm9DO0lBQU4sQ0FBL0IsQ0FEUzs7Ozt3QkFjSixNQUFLO0FBQ1YsVUFBTyxrQkFBUSxJQUFSLENBQWEsSUFBYixFQUFtQixJQUFuQixDQUF3QixnQkFBTTs7QUFFcEMsYUFBUyxlQUFULENBQXlCLElBQXpCLEVBQThCOzs7QUFDN0I7Z0JBQWE7Ozs7Ozs7Ozs7Z0NBRUo7QUFDUCxlQUFPOzs7U0FBTSxLQUFLLEtBQUwsQ0FBVyxRQUFYO1NBQWIsQ0FETzs7OzthQUZJO2lDQUNMLGNBQVksV0FEcEIsQ0FENkI7S0FBOUI7O0FBU0EsV0FBTyxJQUFJLE9BQUosQ0FBWSxVQUFDLE9BQUQsRUFBVSxNQUFWLEVBQW1CO0FBQ3JDLFNBQUksT0FBSyxFQUFDLE1BQUssTUFBTCxFQUFZLFVBQVMsRUFBVCxFQUFsQixDQURpQztBQUVyQyxTQUFJLFVBQVEsSUFBUixDQUZpQztBQUdyQyxTQUFJLE9BQUssS0FBSyxLQUFMLENBQVcsS0FBSyxJQUFMLENBQVUsY0FBVixDQUFoQixDQUhpQztBQUlyQyxTQUFJLFNBQU8seUJBQVAsQ0FKaUM7QUFLckMsWUFBTyxHQUFQLENBQVcsSUFBSSxNQUFKLENBQVcsS0FBSyxZQUFMLEVBQVgsQ0FBWCxFQUxxQztBQU1yQyxZQUFPLElBQVAsQ0FBWSxRQUFRLEtBQVIsRUFBZSxZQUFmLENBQTRCLElBQTVCLEVBQWlDLEVBQUMsT0FBTSxLQUFOLEVBQWxDLEVBQ1YsRUFEVSxDQUNQLE9BRE8sRUFDRSxhQUFHO0FBQ2YsY0FBUSxLQUFSLENBQWMsQ0FBZCxFQURlO01BQUgsQ0FERixDQUdSLEVBSFEsQ0FHTCxTQUhLLEVBR00sZ0JBQU07QUFDdEIsY0FBUSxRQUFSLENBQWlCLElBQWpCLENBQXNCLElBQXRCLEVBRHNCO0FBRXRCLFdBQUssTUFBTCxHQUFZLE9BQVosQ0FGc0I7QUFHdEIsZ0JBQVEsSUFBUixDQUhzQjtBQUl0QixXQUFLLFFBQUwsR0FBYyxFQUFkLENBSnNCO01BQU4sQ0FITixDQVFSLEVBUlEsQ0FRTCxVQVJLLEVBUU0sZUFBSztxQkFDNEIsUUFENUI7VUFDZCxpQ0FEYztVQUNGLHlCQURFO1VBQ00sNkJBRE47VUFDZ0IsdUJBRGhCO1VBQ3NCLHFCQUR0Qjs7QUFFckIsVUFBSSxRQUFNLE9BQU8sUUFBUCxDQUFnQixPQUFoQixDQUF3QixPQUF4QixDQUFOLENBRmlCO0FBR3JCLGlCQUFXLEdBQVgsR0FBZSxLQUFmLENBSHFCO0FBSXJCLFVBQUksVUFBUSxnQkFBTSxhQUFOLENBQW9CLGdCQUFnQixJQUFoQixDQUFwQixFQUEyQyxVQUEzQyxFQUF1RCxRQUF2RCxDQUFSLENBSmlCO0FBS3JCLGFBQU8sUUFBUCxDQUFnQixNQUFoQixDQUF1QixLQUF2QixFQUE2QixDQUE3QixFQUErQixPQUEvQixFQUxxQjtBQU1yQixnQkFBUSxNQUFSLENBTnFCO01BQUwsQ0FSTixDQWVSLEVBZlEsQ0FlTCxLQWZLLEVBZUUsYUFBRztBQUNmLGNBQVE7QUFDUCx5REFBb0I7QUFDbkIsZUFBTyxnQkFBTSxhQUFOLENBQW9CLGdCQUFnQixNQUFoQixDQUFwQixFQUE2QyxJQUE3QyxFQUFtRCxLQUFLLFFBQUwsQ0FBMUQsQ0FEbUI7UUFEYjtPQUFSLEVBRGU7TUFBSCxDQWZGLENBcUJSLEVBckJRLENBcUJMLE1BckJLLEVBcUJHLGdCQUFNO0FBQ25CLFVBQUcsWUFBVSxJQUFWLEVBQ0YsUUFBUSxRQUFSLENBQWlCLElBQWpCLENBQXNCLElBQXRCLEVBREQ7TUFEYSxDQXJCZixFQU5xQztLQUFuQixDQUFuQixDQVhvQztJQUFOLENBQS9CLENBRFU7Ozs7MEJBbEJJLE1BQUs7QUFDbkIsVUFBTyxJQUFQLENBRG1COzs7O1FBREE7Ozs7QUEwRWQsSUFBSSwwQkFBTztBQUNqQiw2QkFEaUI7QUFFaEIsMkJBRmdCO0FBR2hCLHVCQUhnQjtBQUloQixxQkFKZ0I7QUFLaEIsdUJBTGdCO0NBQVAiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZG9jeDRqcyBmcm9tIFwiZG9jeDRqc1wiXHJcbmltcG9ydCBCYXNlIGZyb20gXCIuLi9iYXNlXCJcclxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge1Bhc3NUaHJvdWdofSBmcm9tIFwic3RyZWFtXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvY3ggZXh0ZW5kcyBCYXNle1xyXG5cdHN0YXRpYyBzdXBwb3J0KGZpbGUpe1xyXG5cdFx0cmV0dXJuIHRydWVcclxuXHR9XHJcblxyXG5cdGxvYWQoZGF0YSl7XHJcblx0XHRyZXR1cm4gZG9jeDRqcy5sb2FkKGRhdGEpLnRoZW4oZG9jeD0+e1xyXG5cdFx0XHRsZXQgZG9jXHJcblx0XHRcdHJldHVybiBkb2N4LnBhcnNlKGRvY3g0anMuY3JlYXRlVmlzaXRvckZhY3RvcnkoKHdvcmRNb2RlbCwgdGFyZ2V0UGFyZW50KT0+e1xyXG5cdFx0XHRcdGlmKHdvcmRNb2RlbC50eXBlICYmIHdvcmRNb2RlbC50eXBlLnN1YnN0cigwLDYpPT0nc3R5bGUuJyl7XHJcblx0XHRcdFx0XHRyZXR1cm4gdGFyZ2V0UGFyZW50LmFkZFN0eWxlKHdvcmRNb2RlbCxkb2MpXHJcblx0XHRcdFx0fWVsc2UgaWYodGFyZ2V0UGFyZW50KVxyXG5cdFx0XHRcdFx0cmV0dXJuIHRhcmdldFBhcmVudC5hcHBlbmRDaGlsZCh3b3JkTW9kZWwsZG9jKVxyXG5cdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdHJldHVybiBkb2M9bmV3IERvY3VtZW50KHdvcmRNb2RlbClcclxuXHRcdFx0fSkpXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0bG9hZDIoZGF0YSl7XHJcblx0XHRyZXR1cm4gZG9jeDRqcy5sb2FkKGRhdGEpLnRoZW4oZG9jeD0+e1xyXG5cclxuXHRcdFx0ZnVuY3Rpb24gY3JlYXRlQ29tcG9uZW50KHR5cGUpe1xyXG5cdFx0XHRcdHJldHVybiBjbGFzcyBDb250ZW50IGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdFx0XHRcdFx0c3RhdGljIGRpc3BsYXlOYW1lPXR5cGVcclxuXHRcdFx0XHRcdHJlbmRlcigpe1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gPGRpdj57dGhpcy5wcm9wcy5jaGlsZHJlbn08L2Rpdj5cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xyXG5cdFx0XHRcdGxldCByb290PXtuYW1lOlwiZG9jeFwiLGNoaWxkcmVuOltdfVxyXG5cdFx0XHRcdGxldCBjdXJyZW50PXJvb3RcclxuXHRcdFx0XHRsZXQgZGF0YT1kb2N4LnBhcnRzW2RvY3gucmVscy5vZmZpY2VEb2N1bWVudF1cclxuXHRcdFx0XHRsZXQgc3RyZWFtPW5ldyBQYXNzVGhyb3VnaCgpXHJcblx0XHRcdFx0c3RyZWFtLmVuZChuZXcgQnVmZmVyKGRhdGEuYXNVaW50OEFycmF5KCkpKVxyXG5cdFx0XHRcdHN0cmVhbS5waXBlKHJlcXVpcmUoXCJzYXhcIikuY3JlYXRlU3RyZWFtKHRydWUse3htbG5zOmZhbHNlfSlcclxuXHRcdFx0XHRcdC5vbihcImVycm9yXCIsIGU9PntcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5lcnJvcihlKVxyXG5cdFx0XHRcdFx0fSkub24oXCJvcGVudGFnXCIsIG5vZGU9PntcclxuXHRcdFx0XHRcdFx0Y3VycmVudC5jaGlsZHJlbi5wdXNoKG5vZGUpXHJcblx0XHRcdFx0XHRcdG5vZGUucGFyZW50PWN1cnJlbnRcclxuXHRcdFx0XHRcdFx0Y3VycmVudD1ub2RlXHJcblx0XHRcdFx0XHRcdG5vZGUuY2hpbGRyZW49W11cclxuXHRcdFx0XHRcdH0pLm9uKFwiY2xvc2V0YWdcIix0YWc9PntcclxuXHRcdFx0XHRcdFx0Y29uc3Qge2F0dHJpYnV0ZXMsIHBhcmVudCwgY2hpbGRyZW4sIGxvY2FsLG5hbWV9PWN1cnJlbnRcclxuXHRcdFx0XHRcdFx0bGV0IGluZGV4PXBhcmVudC5jaGlsZHJlbi5pbmRleE9mKGN1cnJlbnQpXHJcblx0XHRcdFx0XHRcdGF0dHJpYnV0ZXMua2V5PWluZGV4XHJcblx0XHRcdFx0XHRcdGxldCBlbGVtZW50PVJlYWN0LmNyZWF0ZUVsZW1lbnQoY3JlYXRlQ29tcG9uZW50KG5hbWUpLCBhdHRyaWJ1dGVzLCBjaGlsZHJlbilcclxuXHRcdFx0XHRcdFx0cGFyZW50LmNoaWxkcmVuLnNwbGljZShpbmRleCwxLGVsZW1lbnQpXHJcblx0XHRcdFx0XHRcdGN1cnJlbnQ9cGFyZW50XHJcblx0XHRcdFx0XHR9KS5vbihcImVuZFwiLCBhPT57XHJcblx0XHRcdFx0XHRcdHJlc29sdmUoe1xyXG5cdFx0XHRcdFx0XHRcdGNyZWF0ZVJlYWN0RWxlbWVudCgpe1xyXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoY3JlYXRlQ29tcG9uZW50KFwiZG9jeFwiKSwgbnVsbCwgcm9vdC5jaGlsZHJlbilcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHR9KS5vbihcInRleHRcIiwgdGV4dD0+e1xyXG5cdFx0XHRcdFx0XHRpZihjdXJyZW50IT09cm9vdClcclxuXHRcdFx0XHRcdFx0XHRjdXJyZW50LmNoaWxkcmVuLnB1c2godGV4dClcclxuXHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcbn1cclxuXHJcbmltcG9ydCBEb2N1bWVudCBmcm9tIFwiLi9kb2N1bWVudFwiXHJcbmltcG9ydCBTZWN0aW9uIGZyb20gXCIuL3NlY3Rpb25cIlxyXG5pbXBvcnQgSW1hZ2UgZnJvbSBcIi4vaW1hZ2VcIlxyXG5pbXBvcnQgVGV4dCBmcm9tIFwiLi90ZXh0XCJcclxuaW1wb3J0IFRhYmxlIGZyb20gXCIuL3RhYmxlXCJcclxuXHJcbmV4cG9ydCBsZXQgTW9kZWxzPXtcclxuXHREb2N1bWVudFxyXG5cdCxTZWN0aW9uXHJcblx0LEltYWdlXHJcblx0LFRleHRcclxuXHQsVGFibGVcclxufVxyXG4iXX0=