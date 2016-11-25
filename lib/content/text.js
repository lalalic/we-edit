"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray2 = require("babel-runtime/helpers/slicedToArray");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _any = require("./any");

var _html = require("../wordwrap/html");

var _html2 = _interopRequireDefault(_html);

var _wordwrap = require("../wordwrap");

var _group = require("../composed/group");

var _group2 = _interopRequireDefault(_group);

var _chars = require("./chars");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Text = function (_NoChild) {
	(0, _inherits3.default)(Text, _NoChild);

	function Text() {
		(0, _classCallCheck3.default)(this, Text);
		return (0, _possibleConstructorReturn3.default)(this, (Text.__proto__ || (0, _getPrototypeOf2.default)(Text)).apply(this, arguments));
	}

	(0, _createClass3.default)(Text, [{
		key: "compose",
		value: function compose() {
			var composed = this.computed.composed;
			var parent = this.context.parent;

			var content = this.getContent();
			var length = content.length;

			var composer = new this.constructor.WordWrapper(content, this.getStyle());
			var text = null;
			var minWidth = 0;

			var nextAvailableSpace = parent.nextAvailableSpace();
			if ((0, _wordwrap.isWhitespace)(content[0])) {
				//all whitespace should be appended to last line end
				var whitespaces = (0, _wordwrap.find)(content, _wordwrap.isWhitespace);
				text = composer.next({ len: whitespaces.length });
				composed.push(text);
				parent.appendComposed(this.createComposed2Parent(text));
				nextAvailableSpace = parent.nextAvailableSpace();
			} else if ((0, _wordwrap.isChar)(content[0])) {
				//first word should be wrapped to merge with last line's ending word
				var firstWord = (0, _wordwrap.find)(content, _wordwrap.isChar);
				text = composer.next({ len: firstWord.length });

				if (false === parent.appendComposed(this.createComposed2Parent(text))) composer.rollback(firstWord.length);

				nextAvailableSpace = parent.nextAvailableSpace();
			}

			while (text = composer.next(this.getWrapContext(nextAvailableSpace))) {
				if (text.contentWidth == 0) {
					//width of available space is too small, request a bigger space
					minWidth = nextAvailableSpace.width + 1;
				} else {
					var isLastPiece = text.end == length;
					var endWithChar = (0, _wordwrap.isChar)(text.children[text.children.length - 1]);
					if (isLastPiece && endWithChar && !(0, _wordwrap.isWord)(text.children)) {
						/* <t>xxx he</t><t>llo</t>=>line: [<text children="xxx "/><text children="he"/>]
      make it ready to side by side arrange splitted word text
      */
						var _reduceRight = [].concat((0, _toConsumableArray3.default)(text.children)).reduceRight(function (state, chr) {
							if (state.end) return state;

							if ((0, _wordwrap.isChar)(chr)) state.word = chr + state.word;else state.end = true;

							return state;
						}, { word: "", end: false }),
						    word = _reduceRight.word;

						var wordWidth = composer.stringWidth(word);

						var _text = text,
						    children = _text.children,
						    contentWidth = _text.contentWidth,
						    width = _text.width,
						    end = _text.end,
						    others = (0, _objectWithoutProperties3.default)(_text, ["children", "contentWidth", "width", "end"]);

						composed.push(text = (0, _extends3.default)({}, others, {
							children: children.substr(0, children.length - word.length),
							contentWidth: contentWidth - wordWidth,
							width: width - wordWidth,
							end: end - word.length
						}));
						parent.appendComposed(this.createComposed2Parent(text));

						composed.push(text = (0, _extends3.default)({}, others, {
							children: word,
							contentWidth: wordWidth,
							width: wordWidth,
							end: end
						}));
						parent.appendComposed(this.createComposed2Parent(text));
					} else {
						composed.push(text);
						parent.appendComposed(this.createComposed2Parent(text));
					}
					if (text.end == length) break;
					minWidth = 0;
				}

				nextAvailableSpace = parent.nextAvailableSpace({ width: minWidth });
			}
			parent.on1ChildComposed(this);
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"i",
				null,
				this.getContent()
			);
		}
	}, {
		key: "_parseText",
		value: function _parseText() {
			this.computed.composed = [].concat((0, _toConsumableArray3.default)(this.getContent())).reduce(function (pieces, a, offset) {
				var type = (0, _chars.category)(a);

				var _pieces = (0, _slicedToArray3.default)(pieces, 2),
				    last = _pieces[1];

				if (last && last.type == type) {
					last.chars.push(a);
				} else {
					pieces.push({ type: type, chars: [a], offset: offset });
				}
			}, []);
		}
	}, {
		key: "getStyle",
		value: function getStyle() {
			var inheritedStyle = this.context.inheritedStyle;


			return 'rFonts,sz,color,b,i,vanish'.split(",").reduce(function (style, key) {
				var stylePath = "rPr." + key;
				var value = inheritedStyle.get(stylePath);
				if (value != undefined) {
					style[key] = value;
				}
				return style;
			}, {});
		}
	}, {
		key: "createComposed2Parent",
		value: function createComposed2Parent(props) {
			var _getStyle = this.getStyle(),
			    color = _getStyle.color;

			var width = props.width,
			    height = props.height,
			    descent = props.descent,
			    contentWidth = props.contentWidth,
			    whiteSpace = props.whiteSpace,
			    others = (0, _objectWithoutProperties3.default)(props, ["width", "height", "descent", "contentWidth", "whiteSpace"]);

			return _react2.default.createElement(
				_group2.default,
				{ width: width, height: height, descent: descent },
				_react2.default.createElement("text", (0, _extends3.default)({ width: width, height: height, descent: descent }, others, { style: { whiteSpace: "pre" } }))
			);
		}
	}, {
		key: "getWrapContext",
		value: function getWrapContext(_ref) {
			var width = _ref.width,
			    height = _ref.height,
			    lineWidth = _ref.lineWidth;
			var _context = this.context,
			    parent = _context.parent,
			    isComposingLastChildInParent = _context.isComposingLastChildInParent,
			    currentLineHasOnlyOneWord = _context.currentLineHasOnlyOneWord;

			var wholeLine = width == lineWidth;

			return {
				width: width,
				height: height,
				wordy: function wordy(text, isEnd) {
					if (isComposingLastChildInParent(this) && parent.context.isComposingLastChildInParent(parent) && isEnd) return false;

					var hasOnlyOneWord = (0, _wordwrap.isWord)(text);
					if (wholeLine && hasOnlyOneWord || hasOnlyOneWord && currentLineHasOnlyOneWord()) return false;

					return true;
				}
			};
		}
	}]);
	return Text;
}(_any.NoChild);

Text.displayName = "text";
Text.contextTypes = (0, _extends3.default)({}, _any.NoChild.contextTypes, {
	inheritedStyle: _react.PropTypes.object,
	currentLineHasOnlyOneWord: _react.PropTypes.func
});
Text.WordWrapper = _html2.default;
exports.default = Text;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3RleHQuanMiXSwibmFtZXMiOlsiVGV4dCIsImNvbXBvc2VkIiwiY29tcHV0ZWQiLCJwYXJlbnQiLCJjb250ZXh0IiwiY29udGVudCIsImdldENvbnRlbnQiLCJsZW5ndGgiLCJjb21wb3NlciIsImNvbnN0cnVjdG9yIiwiV29yZFdyYXBwZXIiLCJnZXRTdHlsZSIsInRleHQiLCJtaW5XaWR0aCIsIm5leHRBdmFpbGFibGVTcGFjZSIsIndoaXRlc3BhY2VzIiwibmV4dCIsImxlbiIsInB1c2giLCJhcHBlbmRDb21wb3NlZCIsImNyZWF0ZUNvbXBvc2VkMlBhcmVudCIsImZpcnN0V29yZCIsInJvbGxiYWNrIiwiZ2V0V3JhcENvbnRleHQiLCJjb250ZW50V2lkdGgiLCJ3aWR0aCIsImlzTGFzdFBpZWNlIiwiZW5kIiwiZW5kV2l0aENoYXIiLCJjaGlsZHJlbiIsInJlZHVjZVJpZ2h0Iiwic3RhdGUiLCJjaHIiLCJ3b3JkIiwid29yZFdpZHRoIiwic3RyaW5nV2lkdGgiLCJvdGhlcnMiLCJzdWJzdHIiLCJvbjFDaGlsZENvbXBvc2VkIiwicmVkdWNlIiwicGllY2VzIiwiYSIsIm9mZnNldCIsInR5cGUiLCJsYXN0IiwiY2hhcnMiLCJpbmhlcml0ZWRTdHlsZSIsInNwbGl0Iiwic3R5bGUiLCJrZXkiLCJzdHlsZVBhdGgiLCJ2YWx1ZSIsImdldCIsInVuZGVmaW5lZCIsInByb3BzIiwiY29sb3IiLCJoZWlnaHQiLCJkZXNjZW50Iiwid2hpdGVTcGFjZSIsImxpbmVXaWR0aCIsImlzQ29tcG9zaW5nTGFzdENoaWxkSW5QYXJlbnQiLCJjdXJyZW50TGluZUhhc09ubHlPbmVXb3JkIiwid2hvbGVMaW5lIiwid29yZHkiLCJpc0VuZCIsImhhc09ubHlPbmVXb3JkIiwiZGlzcGxheU5hbWUiLCJjb250ZXh0VHlwZXMiLCJvYmplY3QiLCJmdW5jIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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QUFEQ2xFLEksQ0F1SmJtRSxZLDhCQUNILGFBQVFBLFk7QUFDWHJCLGlCQUFnQixpQkFBVXNCLE07QUFDMUJQLDRCQUEyQixpQkFBVVE7O0FBMUpsQnJFLEksQ0E2SmJVLFc7a0JBN0phVixJIiwiZmlsZSI6InRleHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtOb0NoaWxkfSBmcm9tIFwiLi9hbnlcIlxyXG5pbXBvcnQgSHRtbFdvcmRXcmFwcGVyIGZyb20gXCIuLi93b3Jkd3JhcC9odG1sXCJcclxuaW1wb3J0IHtpc0NoYXIsIGlzV2hpdGVzcGFjZSwgZmluZCwgaXNXb3JkfSBmcm9tIFwiLi4vd29yZHdyYXBcIlxyXG5cclxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXHJcblxyXG5pbXBvcnQge2NhdGVnb3J5fSBmcm9tIFwiLi9jaGFyc1wiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXh0IGV4dGVuZHMgTm9DaGlsZHtcclxuXHRzdGF0aWMgZGlzcGxheU5hbWU9XCJ0ZXh0XCJcclxuXHJcbiAgICBjb21wb3NlKCl7XHJcblx0XHRjb25zdCB7Y29tcG9zZWR9PXRoaXMuY29tcHV0ZWRcclxuICAgICAgICBjb25zdCB7cGFyZW50fT10aGlzLmNvbnRleHRcclxuXHRcdGNvbnN0IGNvbnRlbnQ9dGhpcy5nZXRDb250ZW50KClcclxuXHRcdGNvbnN0IGxlbmd0aD1jb250ZW50Lmxlbmd0aFxyXG5cclxuXHRcdGxldCBjb21wb3Nlcj1uZXcgdGhpcy5jb25zdHJ1Y3Rvci5Xb3JkV3JhcHBlcihjb250ZW50LCB0aGlzLmdldFN0eWxlKCkpXHJcbiAgICAgICAgbGV0IHRleHQ9bnVsbFxyXG5cdFx0bGV0IG1pbldpZHRoPTBcclxuXHJcblx0XHRsZXQgbmV4dEF2YWlsYWJsZVNwYWNlPXBhcmVudC5uZXh0QXZhaWxhYmxlU3BhY2UoKVxyXG5cdFx0aWYoaXNXaGl0ZXNwYWNlKGNvbnRlbnRbMF0pKXtcclxuXHRcdFx0Ly9hbGwgd2hpdGVzcGFjZSBzaG91bGQgYmUgYXBwZW5kZWQgdG8gbGFzdCBsaW5lIGVuZFxyXG5cdFx0XHRsZXQgd2hpdGVzcGFjZXM9ZmluZChjb250ZW50LCBpc1doaXRlc3BhY2UpXHJcblx0XHRcdHRleHQ9Y29tcG9zZXIubmV4dCh7bGVuOndoaXRlc3BhY2VzLmxlbmd0aH0pXHJcblx0XHRcdGNvbXBvc2VkLnB1c2godGV4dClcclxuXHRcdFx0cGFyZW50LmFwcGVuZENvbXBvc2VkKHRoaXMuY3JlYXRlQ29tcG9zZWQyUGFyZW50KHRleHQpKVxyXG5cdFx0XHRuZXh0QXZhaWxhYmxlU3BhY2U9cGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZSgpXHJcblx0XHR9ZWxzZSBpZihpc0NoYXIoY29udGVudFswXSkpe1xyXG5cdFx0XHQvL2ZpcnN0IHdvcmQgc2hvdWxkIGJlIHdyYXBwZWQgdG8gbWVyZ2Ugd2l0aCBsYXN0IGxpbmUncyBlbmRpbmcgd29yZFxyXG5cdFx0XHRsZXQgZmlyc3RXb3JkPWZpbmQoY29udGVudCxpc0NoYXIpXHJcblx0XHRcdHRleHQ9Y29tcG9zZXIubmV4dCh7bGVuOmZpcnN0V29yZC5sZW5ndGh9KVxyXG5cclxuXHRcdFx0aWYoZmFsc2U9PT1wYXJlbnQuYXBwZW5kQ29tcG9zZWQodGhpcy5jcmVhdGVDb21wb3NlZDJQYXJlbnQodGV4dCkpKVxyXG5cdFx0XHRcdGNvbXBvc2VyLnJvbGxiYWNrKGZpcnN0V29yZC5sZW5ndGgpXHJcblxyXG5cdFx0XHRuZXh0QXZhaWxhYmxlU3BhY2U9cGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZSgpXHJcblx0XHR9XHJcblxyXG5cclxuICAgICAgICB3aGlsZSh0ZXh0PWNvbXBvc2VyLm5leHQodGhpcy5nZXRXcmFwQ29udGV4dChuZXh0QXZhaWxhYmxlU3BhY2UpKSl7XHJcblx0XHRcdGlmKHRleHQuY29udGVudFdpZHRoPT0wKXtcclxuXHRcdFx0XHQvL3dpZHRoIG9mIGF2YWlsYWJsZSBzcGFjZSBpcyB0b28gc21hbGwsIHJlcXVlc3QgYSBiaWdnZXIgc3BhY2VcclxuXHRcdFx0XHRtaW5XaWR0aD1uZXh0QXZhaWxhYmxlU3BhY2Uud2lkdGgrMVxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRjb25zdCBpc0xhc3RQaWVjZT10ZXh0LmVuZD09bGVuZ3RoXHJcblx0XHRcdFx0Y29uc3QgZW5kV2l0aENoYXI9aXNDaGFyKHRleHQuY2hpbGRyZW5bdGV4dC5jaGlsZHJlbi5sZW5ndGgtMV0pXHJcblx0XHRcdFx0aWYoaXNMYXN0UGllY2UgJiYgZW5kV2l0aENoYXIgJiYgIWlzV29yZCh0ZXh0LmNoaWxkcmVuKSl7XHJcblx0XHRcdFx0XHQvKiA8dD54eHggaGU8L3Q+PHQ+bGxvPC90Pj0+bGluZTogWzx0ZXh0IGNoaWxkcmVuPVwieHh4IFwiLz48dGV4dCBjaGlsZHJlbj1cImhlXCIvPl1cclxuXHRcdFx0XHRcdG1ha2UgaXQgcmVhZHkgdG8gc2lkZSBieSBzaWRlIGFycmFuZ2Ugc3BsaXR0ZWQgd29yZCB0ZXh0XHJcblx0XHRcdFx0XHQqL1xyXG5cdFx0XHRcdFx0bGV0IHt3b3JkfT1bLi4udGV4dC5jaGlsZHJlbl0ucmVkdWNlUmlnaHQoKHN0YXRlLGNocik9PntcclxuXHRcdFx0XHRcdFx0aWYoc3RhdGUuZW5kKVxyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBzdGF0ZVxyXG5cclxuXHRcdFx0XHRcdFx0aWYoaXNDaGFyKGNocikpXHJcblx0XHRcdFx0XHRcdFx0c3RhdGUud29yZD1jaHIrc3RhdGUud29yZFxyXG5cdFx0XHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRcdFx0c3RhdGUuZW5kPXRydWVcclxuXHJcblx0XHRcdFx0XHRcdHJldHVybiBzdGF0ZVxyXG5cdFx0XHRcdFx0fSx7d29yZDpcIlwiLGVuZDpmYWxzZX0pXHJcblxyXG5cdFx0XHRcdFx0bGV0IHdvcmRXaWR0aD1jb21wb3Nlci5zdHJpbmdXaWR0aCh3b3JkKVxyXG5cclxuXHRcdFx0XHRcdGxldCB7Y2hpbGRyZW4sIGNvbnRlbnRXaWR0aCx3aWR0aCxlbmQsLi4ub3RoZXJzfT10ZXh0XHJcblx0XHRcdFx0XHRjb21wb3NlZC5wdXNoKHRleHQ9ey4uLm90aGVycyxcclxuXHRcdFx0XHRcdFx0Y2hpbGRyZW46Y2hpbGRyZW4uc3Vic3RyKDAsY2hpbGRyZW4ubGVuZ3RoLXdvcmQubGVuZ3RoKVxyXG5cdFx0XHRcdFx0XHQsY29udGVudFdpZHRoOmNvbnRlbnRXaWR0aC13b3JkV2lkdGhcclxuXHRcdFx0XHRcdFx0LHdpZHRoOndpZHRoLXdvcmRXaWR0aFxyXG5cdFx0XHRcdFx0XHQsZW5kOmVuZC13b3JkLmxlbmd0aFxyXG5cdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdHBhcmVudC5hcHBlbmRDb21wb3NlZCh0aGlzLmNyZWF0ZUNvbXBvc2VkMlBhcmVudCh0ZXh0KSlcclxuXHJcblx0XHRcdFx0XHRjb21wb3NlZC5wdXNoKHRleHQ9ey4uLm90aGVycyxcclxuXHRcdFx0XHRcdFx0Y2hpbGRyZW46d29yZFxyXG5cdFx0XHRcdFx0XHQsY29udGVudFdpZHRoOndvcmRXaWR0aFxyXG5cdFx0XHRcdFx0XHQsd2lkdGg6d29yZFdpZHRoXHJcblx0XHRcdFx0XHRcdCxlbmRcclxuXHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRwYXJlbnQuYXBwZW5kQ29tcG9zZWQodGhpcy5jcmVhdGVDb21wb3NlZDJQYXJlbnQodGV4dCkpXHJcblx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRjb21wb3NlZC5wdXNoKHRleHQpXHJcblx0XHRcdFx0XHRwYXJlbnQuYXBwZW5kQ29tcG9zZWQodGhpcy5jcmVhdGVDb21wb3NlZDJQYXJlbnQodGV4dCkpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmKHRleHQuZW5kPT1sZW5ndGgpXHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRtaW5XaWR0aD0wXHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRuZXh0QXZhaWxhYmxlU3BhY2U9cGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZSh7d2lkdGg6bWluV2lkdGh9KVxyXG4gICAgICAgIH1cclxuXHRcdHBhcmVudC5vbjFDaGlsZENvbXBvc2VkKHRoaXMpXHJcbiAgICB9XHJcblx0XHJcblx0cmVuZGVyKCl7XHJcblx0XHRyZXR1cm4gPGk+e3RoaXMuZ2V0Q29udGVudCgpfTwvaT5cclxuXHR9XHJcblx0XHJcblx0X3BhcnNlVGV4dCgpe1xyXG5cdFx0dGhpcy5jb21wdXRlZC5jb21wb3NlZD1bLi4udGhpcy5nZXRDb250ZW50KCldLnJlZHVjZSgocGllY2VzLGEsIG9mZnNldCk9PntcclxuXHRcdFx0bGV0IHR5cGU9Y2F0ZWdvcnkoYSlcclxuXHRcdFx0bGV0IFssbGFzdF09cGllY2VzXHJcblx0XHRcdGlmKGxhc3QgJiYgbGFzdC50eXBlPT10eXBlKXtcclxuXHRcdFx0XHRsYXN0LmNoYXJzLnB1c2goYSlcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0cGllY2VzLnB1c2goe3R5cGUsY2hhcnM6W2FdLG9mZnNldH0pXHJcblx0XHRcdH1cclxuXHRcdH0sW10pXHJcblx0fVxyXG5cclxuXHRnZXRTdHlsZSgpe1xyXG5cdFx0Y29uc3Qge2luaGVyaXRlZFN0eWxlfT10aGlzLmNvbnRleHRcclxuXHJcblx0XHRyZXR1cm4gJ3JGb250cyxzeixjb2xvcixiLGksdmFuaXNoJy5zcGxpdChcIixcIikucmVkdWNlKChzdHlsZSwga2V5KT0+e1xyXG4gICAgICAgICAgICBsZXQgc3R5bGVQYXRoPWByUHIuJHtrZXl9YFxyXG5cdFx0XHRsZXQgdmFsdWU9aW5oZXJpdGVkU3R5bGUuZ2V0KHN0eWxlUGF0aClcclxuICAgICAgICAgICAgaWYodmFsdWUhPXVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBzdHlsZVtrZXldPXZhbHVlXHJcblx0XHRcdH1cclxuICAgICAgICAgICAgcmV0dXJuIHN0eWxlXHJcbiAgICAgICAgfSx7fSlcclxuXHR9XHJcblxyXG5cdGNyZWF0ZUNvbXBvc2VkMlBhcmVudChwcm9wcyl7XHJcblx0XHRjb25zdCB7Y29sb3J9PXRoaXMuZ2V0U3R5bGUoKVxyXG5cdFx0Y29uc3Qge3dpZHRoLCBoZWlnaHQsIGRlc2NlbnQsIGNvbnRlbnRXaWR0aCwgd2hpdGVTcGFjZSwgLi4ub3RoZXJzfT1wcm9wc1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEdyb3VwIHdpZHRoPXt3aWR0aH0gaGVpZ2h0PXtoZWlnaHR9IGRlc2NlbnQ9e2Rlc2NlbnR9PlxyXG5cdFx0XHRcdDx0ZXh0IHsuLi57d2lkdGgsaGVpZ2h0LGRlc2NlbnR9fSB7Li4ub3RoZXJzfSBzdHlsZT17e3doaXRlU3BhY2U6XCJwcmVcIn19Lz5cclxuXHRcdFx0PC9Hcm91cD5cclxuXHRcdClcclxuXHR9XHJcblxyXG5cdGdldFdyYXBDb250ZXh0KHt3aWR0aCxoZWlnaHQsbGluZVdpZHRofSl7XHJcblx0XHRjb25zdCB7cGFyZW50LGlzQ29tcG9zaW5nTGFzdENoaWxkSW5QYXJlbnQsIGN1cnJlbnRMaW5lSGFzT25seU9uZVdvcmR9PXRoaXMuY29udGV4dFxyXG5cdFx0Y29uc3Qgd2hvbGVMaW5lPXdpZHRoPT1saW5lV2lkdGhcclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHR3aWR0aFxyXG5cdFx0XHQsaGVpZ2h0XHJcblx0XHRcdCx3b3JkeSh0ZXh0LCBpc0VuZCl7XHJcblx0XHRcdFx0aWYoaXNDb21wb3NpbmdMYXN0Q2hpbGRJblBhcmVudCh0aGlzKVxyXG5cdFx0XHRcdFx0JiYgcGFyZW50LmNvbnRleHQuaXNDb21wb3NpbmdMYXN0Q2hpbGRJblBhcmVudChwYXJlbnQpXHJcblx0XHRcdFx0XHQmJiBpc0VuZClcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZVxyXG5cclxuXHRcdFx0XHRjb25zdCBoYXNPbmx5T25lV29yZD1pc1dvcmQodGV4dClcclxuXHRcdFx0XHRpZigod2hvbGVMaW5lICYmIGhhc09ubHlPbmVXb3JkKSBcclxuXHRcdFx0XHRcdHx8IChoYXNPbmx5T25lV29yZCAmJiBjdXJyZW50TGluZUhhc09ubHlPbmVXb3JkKCkpKVxyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlXHJcblxyXG5cdFx0XHRcdHJldHVybiB0cnVlXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xyXG5cdFx0Li4uTm9DaGlsZC5jb250ZXh0VHlwZXMsXHJcblx0XHRpbmhlcml0ZWRTdHlsZTogUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdGN1cnJlbnRMaW5lSGFzT25seU9uZVdvcmQ6IFByb3BUeXBlcy5mdW5jXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgV29yZFdyYXBwZXI9SHRtbFdvcmRXcmFwcGVyXHJcbn1cclxuIl19