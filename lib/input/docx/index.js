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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUdxQjs7Ozs7Ozs7Ozs7dUJBS2YsTUFBTSxRQUFPO0FBQ2pCLE9BQU0sU0FBTyxRQUFRLE1BQVIsQ0FBUCxDQURXOztBQUdqQixVQUFPOzs7Ozs7Ozs7OztxQ0FDVSxNQUFNLE1BQUs7VUFDckIsYUFBc0IsS0FBdEIsV0FEcUI7VUFDVCxXQUFVLEtBQVYsU0FEUzs7QUFFMUIsVUFBRyxNQUFNLE9BQU4sQ0FBYyxRQUFkLENBQUgsRUFDQyxXQUFTLFNBQVMsTUFBVCxDQUFnQjtjQUFHO09BQUgsQ0FBekIsQ0FERDtBQUVBLFVBQUksVUFBUSxPQUFPLElBQVAsQ0FBUixDQUpzQjtBQUsxQixVQUFHLE9BQUgsRUFBVztBQUNWLGNBQU8sZ0JBQU0sYUFBTixDQUFvQixPQUFwQixFQUE2QixVQUE3QixFQUF5QyxRQUF6QyxDQUFQLENBRFU7T0FBWCxNQUVLO0FBQ0osZUFBUSxJQUFSLENBQWdCLDJCQUFoQixFQURJO0FBRUosY0FBTyxJQUFQLENBRkk7T0FGTDs7Ozs7dUJBTkssQ0FjSixJQWRJLENBY0MsSUFkRCxFQWNPLElBZFAsQ0FjWTtXQUFNLEtBQUssS0FBTCxHQUFhLElBQWIsQ0FBa0IsZ0JBQU07QUFDaEQsYUFBUSxHQUFSLENBQVksSUFBWixFQURnRDtBQUVoRCxZQUFPLElBQVAsQ0FGZ0Q7S0FBTjtJQUF4QixDQWRuQixDQUhpQjs7OzswQkFKSCxNQUFLO0FBQ25CLFVBQU8sSUFBUCxDQURtQjs7OztRQURBOzs7Ozs7QUE2QnJCLFNBQVMsT0FBVCxDQUFpQixNQUFqQixFQUF3QjtLQUNqQjs7Ozs7Ozs7Ozs7cUNBQ1k7QUFDaEIsUUFBTSxpQ0FGRix3REFFRSxDQURVO0FBRWhCLFFBQUksbUJBQWlCLElBQUksZUFBSixDQUZMO0FBR2hCLFdBQU8sT0FBTyxNQUFQLENBQWMsR0FBZCxFQUFrQjtBQUN4QiwrQ0FBZ0IsTUFBSztBQUNwQixjQUFPLElBQVA7QUFDQSxZQUFLLFFBQUw7QUFDQyxlQUFLLFdBQUwsQ0FERDtBQUVBLGNBRkE7QUFEQSxPQURvQjtBQU1wQixhQUFPLGlCQUFpQixJQUFqQixDQUFQLENBTm9CO01BREc7S0FBbEIsQ0FBUCxDQUhnQjs7OztTQURaO0dBQWlCLE9BQU8sUUFBUCxFQURBOztLQWlCaEIsTUFVQSxPQVZBLElBakJnQjtLQWtCdEIsVUFTTSxPQVROLFFBbEJzQjtLQW1CdEIsWUFRTSxPQVJOLFVBbkJzQjtLQW9CdEIsU0FPTSxPQVBOLE9BcEJzQjtLQXFCdEIsT0FNTSxPQU5OLEtBckJzQjtLQXNCdEIsUUFLTSxPQUxOLE1BdEJzQjtLQXVCdEIsUUFJTSxPQUpOLE1BdkJzQjtLQXdCdEIsUUFHTSxPQUhOLE1BeEJzQjtLQXlCdEIsTUFFTSxPQUZOLElBekJzQjtLQTBCdEIsT0FDTSxPQUROLEtBMUJzQjtLQTJCdEIsT0FBTSxPQUFOLEtBM0JzQjs7QUE0QnZCLFFBQU87QUFDTixVQUFPLEdBQVA7QUFDQSxjQUFXLFFBQVg7QUFDQSxhQUFVLE9BQVY7QUFDQSxPQUFJLFNBQUo7QUFDQSxPQUFJLE1BQUo7QUFDQSxPQUFJLElBQUo7QUFDQSxTQUFNLEtBQU47QUFDQSxRQUFLLEdBQUw7QUFDQSxRQUFLLElBQUw7QUFDQSxVQUFPLElBQVA7QUFDQSxXQUFRLEtBQVI7RUFYRCxDQTVCdUI7Q0FBeEIiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZG9jeDRqcyBmcm9tIFwiZG9jeDRqc1wiXHJcbmltcG9ydCBCYXNlIGZyb20gXCIuLi9iYXNlXCJcclxuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9jeCBleHRlbmRzIEJhc2V7XHJcblx0c3RhdGljIHN1cHBvcnQoZmlsZSl7XHJcblx0XHRyZXR1cm4gdHJ1ZVxyXG5cdH1cclxuXHJcblx0bG9hZChkYXRhLCBkb21haW4pe1xyXG5cdFx0Y29uc3QgTW9kZWxzPXdvcmRpZnkoZG9tYWluKVxyXG5cclxuXHRcdHJldHVybiAoY2xhc3MgZXh0ZW5kcyBkb2N4NGpze1xyXG5cdFx0XHRvbkNyZWF0ZUVsZW1lbnQobm9kZSwgdHlwZSl7XHJcblx0XHRcdFx0bGV0IHthdHRyaWJ1dGVzLCBjaGlsZHJlbn09bm9kZVxyXG5cdFx0XHRcdGlmKEFycmF5LmlzQXJyYXkoY2hpbGRyZW4pKVxyXG5cdFx0XHRcdFx0Y2hpbGRyZW49Y2hpbGRyZW4uZmlsdGVyKGE9PmEpXHJcblx0XHRcdFx0bGV0IENvbnRlbnQ9TW9kZWxzW3R5cGVdXHJcblx0XHRcdFx0aWYoQ29udGVudCl7XHJcblx0XHRcdFx0XHRyZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChDb250ZW50LCBhdHRyaWJ1dGVzLCBjaGlsZHJlbilcclxuXHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdGNvbnNvbGUud2FybihgJHt0eXBlfSBpcyBub3QgaWRlbnRpZmllZGApXHJcblx0XHRcdFx0XHRyZXR1cm4gbnVsbFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdH0pLmxvYWQoZGF0YSkudGhlbihkb2N4PT5kb2N4LnBhcnNlKCkudGhlbihkb2N4PT57XHJcblx0XHRcdGNvbnNvbGUubG9nKGRvY3gpXHJcblx0XHRcdHJldHVybiBkb2N4XHJcblx0XHR9KSlcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHdvcmRpZnkoZG9tYWluKXtcclxuXHRjbGFzcyBEb2N1bWVudCBleHRlbmRzIGRvbWFpbi5Eb2N1bWVudHtcclxuXHRcdGdldENoaWxkQ29udGV4dCgpe1xyXG5cdFx0XHRjb25zdCBjdHg9c3VwZXIuZ2V0Q2hpbGRDb250ZXh0KClcclxuXHRcdFx0bGV0IF9nZXREZWZhdWx0U3R5bGU9Y3R4LmdldERlZmF1bHRTdHlsZVxyXG5cdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbihjdHgse1xyXG5cdFx0XHRcdGdldERlZmF1bHRTdHlsZSh0eXBlKXtcclxuXHRcdFx0XHRcdHN3aXRjaCh0eXBlKXtcclxuXHRcdFx0XHRcdGNhc2UgJ2lubGluZSc6XHJcblx0XHRcdFx0XHRcdHR5cGU9XCJjaGFyYWN0ZXJcIlxyXG5cdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHJldHVybiBfZ2V0RGVmYXVsdFN0eWxlKHR5cGUpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cdH1cclxuXHRjb25zdCB7QW55LFxyXG5cdFx0U2VjdGlvbixcclxuXHRcdFBhcmFncmFwaCxcclxuXHRcdElubGluZSxcclxuXHRcdFRleHQsXHJcblx0XHRGcmFtZSxcclxuXHRcdEltYWdlLFxyXG5cdFx0VGFibGUsXHJcblx0XHRSb3csXHJcblx0XHRDZWxsLFxyXG5cdFx0TGlzdH09ZG9tYWluXHJcblx0cmV0dXJuIHtcclxuXHRcdFwiZG9jeFwiOkFueSxcclxuXHRcdFwiZG9jdW1lbnRcIjpEb2N1bWVudCxcclxuXHRcdFwic2VjdGlvblwiOlNlY3Rpb24sXHJcblx0XHRcInBcIjpQYXJhZ3JhcGgsXHJcblx0XHRcInJcIjpJbmxpbmUsXHJcblx0XHRcInRcIjpUZXh0LFxyXG5cdFx0XCJ0YmxcIjpUYWJsZSxcclxuXHRcdFwidHJcIjpSb3csXHJcblx0XHRcInRjXCI6Q2VsbCxcclxuXHRcdFwibGlzdFwiOkxpc3QsXHJcblx0XHRcImltYWdlXCI6SW1hZ2VcclxuXHR9XHJcbn1cclxuIl19