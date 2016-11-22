"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

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
				var _reduce = [].concat((0, _toConsumableArray3.default)(content)).reduce(function (state, a) {
					if (!state.end) {
						if ((0, _wordwrap.isWhitespace)(a)) state.whitespaces += a;else state.end = true;
					}
					return state;
				}, { whitespaces: "", end: false }),
				    whitespaces = _reduce.whitespaces;

				text = composer.next({ len: whitespaces.length });
				composed.push(text);
				parent.appendComposed(this.createComposed2Parent(text));
				nextAvailableSpace = parent.nextAvailableSpace();
			} else if ((0, _wordwrap.isChar)(content[0])) {
				//first word should be wrapped to merge with last line's ending word
				var _reduce2 = [].concat((0, _toConsumableArray3.default)(content)).reduce(function (state, a) {
					if (!state.end) {
						if ((0, _wordwrap.isChar)(a)) state.firstWord += a;else state.end = true;
					}
					return state;
				}, { firstWord: "", end: false }),
				    firstWord = _reduce2.firstWord;

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
					if (isLastPiece && endWithChar && ![].concat((0, _toConsumableArray3.default)(text.children)).reduce(function (state, a) {
						return state && (0, _wordwrap.isChar)(a);
					}, true)) {
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
			    isComposingLastChildInParent = _context.isComposingLastChildInParent,
			    parent = _context.parent;

			var wholeLine = width == lineWidth;

			return {
				width: width,
				height: height,
				wordy: function wordy(text, isEnd) {
					if (isComposingLastChildInParent(this) && parent.context.isComposingLastChildInParent(parent) && isEnd) return false;

					var hasOnlyOneWord = [].concat((0, _toConsumableArray3.default)(text)).reduce(function (state, next) {
						return state && (0, _wordwrap.isChar)(next);
					}, true);
					if (wholeLine && hasOnlyOneWord) return false;

					return true;
				}
			};
		}
	}]);
	return Text;
}(_any.NoChild);

Text.displayName = "text";
Text.contextTypes = (0, _extends3.default)({}, _any.NoChild.contextTypes, {
	inheritedStyle: _react.PropTypes.object
});
Text.WordWrapper = _html2.default;
exports.default = Text;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3RleHQuanMiXSwibmFtZXMiOlsiVGV4dCIsImNvbXBvc2VkIiwiY29tcHV0ZWQiLCJwYXJlbnQiLCJjb250ZXh0IiwiY29udGVudCIsImdldENvbnRlbnQiLCJsZW5ndGgiLCJjb21wb3NlciIsImNvbnN0cnVjdG9yIiwiV29yZFdyYXBwZXIiLCJnZXRTdHlsZSIsInRleHQiLCJtaW5XaWR0aCIsIm5leHRBdmFpbGFibGVTcGFjZSIsInJlZHVjZSIsInN0YXRlIiwiYSIsImVuZCIsIndoaXRlc3BhY2VzIiwibmV4dCIsImxlbiIsInB1c2giLCJhcHBlbmRDb21wb3NlZCIsImNyZWF0ZUNvbXBvc2VkMlBhcmVudCIsImZpcnN0V29yZCIsInJvbGxiYWNrIiwiZ2V0V3JhcENvbnRleHQiLCJjb250ZW50V2lkdGgiLCJ3aWR0aCIsImlzTGFzdFBpZWNlIiwiZW5kV2l0aENoYXIiLCJjaGlsZHJlbiIsInJlZHVjZVJpZ2h0IiwiY2hyIiwid29yZCIsIndvcmRXaWR0aCIsInN0cmluZ1dpZHRoIiwib3RoZXJzIiwic3Vic3RyIiwib24xQ2hpbGRDb21wb3NlZCIsImluaGVyaXRlZFN0eWxlIiwic3BsaXQiLCJzdHlsZSIsImtleSIsInN0eWxlUGF0aCIsInZhbHVlIiwiZ2V0IiwidW5kZWZpbmVkIiwicHJvcHMiLCJjb2xvciIsImhlaWdodCIsImRlc2NlbnQiLCJ3aGl0ZVNwYWNlIiwibGluZVdpZHRoIiwiaXNDb21wb3NpbmdMYXN0Q2hpbGRJblBhcmVudCIsIndob2xlTGluZSIsIndvcmR5IiwiaXNFbmQiLCJoYXNPbmx5T25lV29yZCIsImRpc3BsYXlOYW1lIiwiY29udGV4dFR5cGVzIiwib2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFFQTs7Ozs7O0lBRXFCQSxJOzs7Ozs7Ozs7OzRCQUdSO0FBQUEsT0FDSkMs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TUFBakIsRUFBbUQsSUFBbkQsQ0FBckI7QUFDQSxTQUFHb0MsYUFBYUcsY0FBaEIsRUFDQyxPQUFPLEtBQVA7O0FBRUQsWUFBTyxJQUFQO0FBQ0E7QUFkSyxJQUFQO0FBZ0JBOzs7OztBQXBKbUIzRCxJLENBQ2I0RCxXLEdBQVksTTtBQURDNUQsSSxDQXNKYjZELFksOEJBQ0gsYUFBUUEsWTtBQUNYcEIsaUJBQWdCLGlCQUFVcUI7O0FBeEpQOUQsSSxDQTJKYlUsVztrQkEzSmFWLEkiLCJmaWxlIjoidGV4dC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge05vQ2hpbGR9IGZyb20gXCIuL2FueVwiXHJcbmltcG9ydCBIdG1sV29yZFdyYXBwZXIgZnJvbSBcIi4uL3dvcmR3cmFwL2h0bWxcIlxyXG5pbXBvcnQge2lzQ2hhciwgaXNXaGl0ZXNwYWNlfSBmcm9tIFwiLi4vd29yZHdyYXBcIlxyXG5cclxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXh0IGV4dGVuZHMgTm9DaGlsZHtcclxuXHRzdGF0aWMgZGlzcGxheU5hbWU9XCJ0ZXh0XCJcclxuXHJcbiAgICBjb21wb3NlKCl7XHJcblx0XHRjb25zdCB7Y29tcG9zZWR9PXRoaXMuY29tcHV0ZWRcclxuICAgICAgICBjb25zdCB7cGFyZW50fT10aGlzLmNvbnRleHRcclxuXHRcdGNvbnN0IGNvbnRlbnQ9dGhpcy5nZXRDb250ZW50KClcclxuXHRcdGNvbnN0IGxlbmd0aD1jb250ZW50Lmxlbmd0aFxyXG5cclxuXHRcdGxldCBjb21wb3Nlcj1uZXcgdGhpcy5jb25zdHJ1Y3Rvci5Xb3JkV3JhcHBlcihjb250ZW50LCB0aGlzLmdldFN0eWxlKCkpXHJcbiAgICAgICAgbGV0IHRleHQ9bnVsbFxyXG5cdFx0bGV0IG1pbldpZHRoPTBcclxuXHJcblx0XHRsZXQgbmV4dEF2YWlsYWJsZVNwYWNlPXBhcmVudC5uZXh0QXZhaWxhYmxlU3BhY2UoKVxyXG5cdFx0aWYoaXNXaGl0ZXNwYWNlKGNvbnRlbnRbMF0pKXtcclxuXHRcdFx0Ly9hbGwgd2hpdGVzcGFjZSBzaG91bGQgYmUgYXBwZW5kZWQgdG8gbGFzdCBsaW5lIGVuZFxyXG5cdFx0XHRsZXQge3doaXRlc3BhY2VzfT1bLi4uY29udGVudF0ucmVkdWNlKChzdGF0ZSxhKT0+e1xyXG5cdFx0XHRcdFx0aWYoIXN0YXRlLmVuZCl7XHJcblx0XHRcdFx0XHRcdGlmKGlzV2hpdGVzcGFjZShhKSlcclxuXHRcdFx0XHRcdFx0XHRzdGF0ZS53aGl0ZXNwYWNlcys9YVxyXG5cdFx0XHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRcdFx0c3RhdGUuZW5kPXRydWVcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHJldHVybiBzdGF0ZVxyXG5cdFx0XHRcdH0se3doaXRlc3BhY2VzOlwiXCIsZW5kOmZhbHNlfSlcclxuXHRcdFx0dGV4dD1jb21wb3Nlci5uZXh0KHtsZW46d2hpdGVzcGFjZXMubGVuZ3RofSlcclxuXHRcdFx0Y29tcG9zZWQucHVzaCh0ZXh0KVxyXG5cdFx0XHRwYXJlbnQuYXBwZW5kQ29tcG9zZWQodGhpcy5jcmVhdGVDb21wb3NlZDJQYXJlbnQodGV4dCkpXHJcblx0XHRcdG5leHRBdmFpbGFibGVTcGFjZT1wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKClcclxuXHRcdH1lbHNlIGlmKGlzQ2hhcihjb250ZW50WzBdKSl7XHJcblx0XHRcdC8vZmlyc3Qgd29yZCBzaG91bGQgYmUgd3JhcHBlZCB0byBtZXJnZSB3aXRoIGxhc3QgbGluZSdzIGVuZGluZyB3b3JkXHJcblx0XHRcdGxldCB7Zmlyc3RXb3JkfT1bLi4uY29udGVudF0ucmVkdWNlKChzdGF0ZSxhKT0+e1xyXG5cdFx0XHRcdFx0aWYoIXN0YXRlLmVuZCl7XHJcblx0XHRcdFx0XHRcdGlmKGlzQ2hhcihhKSlcclxuXHRcdFx0XHRcdFx0XHRzdGF0ZS5maXJzdFdvcmQrPWFcclxuXHRcdFx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0XHRcdHN0YXRlLmVuZD10cnVlXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRyZXR1cm4gc3RhdGVcclxuXHRcdFx0XHR9LHtmaXJzdFdvcmQ6XCJcIixlbmQ6ZmFsc2V9KVxyXG5cdFx0XHR0ZXh0PWNvbXBvc2VyLm5leHQoe2xlbjpmaXJzdFdvcmQubGVuZ3RofSlcclxuXHJcblx0XHRcdGlmKGZhbHNlPT09cGFyZW50LmFwcGVuZENvbXBvc2VkKHRoaXMuY3JlYXRlQ29tcG9zZWQyUGFyZW50KHRleHQpKSlcclxuXHRcdFx0XHRjb21wb3Nlci5yb2xsYmFjayhmaXJzdFdvcmQubGVuZ3RoKVxyXG5cclxuXHRcdFx0bmV4dEF2YWlsYWJsZVNwYWNlPXBhcmVudC5uZXh0QXZhaWxhYmxlU3BhY2UoKVxyXG5cdFx0fVxyXG5cclxuXHJcbiAgICAgICAgd2hpbGUodGV4dD1jb21wb3Nlci5uZXh0KHRoaXMuZ2V0V3JhcENvbnRleHQobmV4dEF2YWlsYWJsZVNwYWNlKSkpe1xyXG5cdFx0XHRpZih0ZXh0LmNvbnRlbnRXaWR0aD09MCl7XHJcblx0XHRcdFx0Ly93aWR0aCBvZiBhdmFpbGFibGUgc3BhY2UgaXMgdG9vIHNtYWxsLCByZXF1ZXN0IGEgYmlnZ2VyIHNwYWNlXHJcblx0XHRcdFx0bWluV2lkdGg9bmV4dEF2YWlsYWJsZVNwYWNlLndpZHRoKzFcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0Y29uc3QgaXNMYXN0UGllY2U9dGV4dC5lbmQ9PWxlbmd0aFxyXG5cdFx0XHRcdGNvbnN0IGVuZFdpdGhDaGFyPWlzQ2hhcih0ZXh0LmNoaWxkcmVuW3RleHQuY2hpbGRyZW4ubGVuZ3RoLTFdKVxyXG5cdFx0XHRcdGlmKGlzTGFzdFBpZWNlICYmIGVuZFdpdGhDaGFyICYmICFbLi4udGV4dC5jaGlsZHJlbl0ucmVkdWNlKChzdGF0ZSxhKT0+c3RhdGUmJmlzQ2hhcihhKSx0cnVlKSl7XHJcblx0XHRcdFx0XHQvKiA8dD54eHggaGU8L3Q+PHQ+bGxvPC90Pj0+bGluZTogWzx0ZXh0IGNoaWxkcmVuPVwieHh4IFwiLz48dGV4dCBjaGlsZHJlbj1cImhlXCIvPl1cclxuXHRcdFx0XHRcdG1ha2UgaXQgcmVhZHkgdG8gc2lkZSBieSBzaWRlIGFycmFuZ2Ugc3BsaXR0ZWQgd29yZCB0ZXh0XHJcblx0XHRcdFx0XHQqL1xyXG5cdFx0XHRcdFx0bGV0IHt3b3JkfT1bLi4udGV4dC5jaGlsZHJlbl0ucmVkdWNlUmlnaHQoKHN0YXRlLGNocik9PntcclxuXHRcdFx0XHRcdFx0aWYoc3RhdGUuZW5kKVxyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBzdGF0ZVxyXG5cclxuXHRcdFx0XHRcdFx0aWYoaXNDaGFyKGNocikpXHJcblx0XHRcdFx0XHRcdFx0c3RhdGUud29yZD1jaHIrc3RhdGUud29yZFxyXG5cdFx0XHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRcdFx0c3RhdGUuZW5kPXRydWVcclxuXHJcblx0XHRcdFx0XHRcdHJldHVybiBzdGF0ZVxyXG5cdFx0XHRcdFx0fSx7d29yZDpcIlwiLGVuZDpmYWxzZX0pXHJcblxyXG5cdFx0XHRcdFx0bGV0IHdvcmRXaWR0aD1jb21wb3Nlci5zdHJpbmdXaWR0aCh3b3JkKVxyXG5cclxuXHRcdFx0XHRcdGxldCB7Y2hpbGRyZW4sIGNvbnRlbnRXaWR0aCx3aWR0aCxlbmQsLi4ub3RoZXJzfT10ZXh0XHJcblx0XHRcdFx0XHRjb21wb3NlZC5wdXNoKHRleHQ9ey4uLm90aGVycyxcclxuXHRcdFx0XHRcdFx0Y2hpbGRyZW46Y2hpbGRyZW4uc3Vic3RyKDAsY2hpbGRyZW4ubGVuZ3RoLXdvcmQubGVuZ3RoKVxyXG5cdFx0XHRcdFx0XHQsY29udGVudFdpZHRoOmNvbnRlbnRXaWR0aC13b3JkV2lkdGhcclxuXHRcdFx0XHRcdFx0LHdpZHRoOndpZHRoLXdvcmRXaWR0aFxyXG5cdFx0XHRcdFx0XHQsZW5kOmVuZC13b3JkLmxlbmd0aFxyXG5cdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdHBhcmVudC5hcHBlbmRDb21wb3NlZCh0aGlzLmNyZWF0ZUNvbXBvc2VkMlBhcmVudCh0ZXh0KSlcclxuXHJcblx0XHRcdFx0XHRjb21wb3NlZC5wdXNoKHRleHQ9ey4uLm90aGVycyxcclxuXHRcdFx0XHRcdFx0Y2hpbGRyZW46d29yZFxyXG5cdFx0XHRcdFx0XHQsY29udGVudFdpZHRoOndvcmRXaWR0aFxyXG5cdFx0XHRcdFx0XHQsd2lkdGg6d29yZFdpZHRoXHJcblx0XHRcdFx0XHRcdCxlbmRcclxuXHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRwYXJlbnQuYXBwZW5kQ29tcG9zZWQodGhpcy5jcmVhdGVDb21wb3NlZDJQYXJlbnQodGV4dCkpXHJcblx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRjb21wb3NlZC5wdXNoKHRleHQpXHJcblx0XHRcdFx0XHRwYXJlbnQuYXBwZW5kQ29tcG9zZWQodGhpcy5jcmVhdGVDb21wb3NlZDJQYXJlbnQodGV4dCkpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmKHRleHQuZW5kPT1sZW5ndGgpXHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRtaW5XaWR0aD0wXHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRuZXh0QXZhaWxhYmxlU3BhY2U9cGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZSh7d2lkdGg6bWluV2lkdGh9KVxyXG4gICAgICAgIH1cclxuXHRcdHBhcmVudC5vbjFDaGlsZENvbXBvc2VkKHRoaXMpXHJcbiAgICB9XHJcblxyXG5cdGdldFN0eWxlKCl7XHJcblx0XHRjb25zdCB7aW5oZXJpdGVkU3R5bGV9PXRoaXMuY29udGV4dFxyXG5cclxuXHRcdHJldHVybiAnckZvbnRzLHN6LGNvbG9yLGIsaSx2YW5pc2gnLnNwbGl0KFwiLFwiKS5yZWR1Y2UoKHN0eWxlLCBrZXkpPT57XHJcbiAgICAgICAgICAgIGxldCBzdHlsZVBhdGg9YHJQci4ke2tleX1gXHJcblx0XHRcdGxldCB2YWx1ZT1pbmhlcml0ZWRTdHlsZS5nZXQoc3R5bGVQYXRoKVxyXG4gICAgICAgICAgICBpZih2YWx1ZSE9dW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHN0eWxlW2tleV09dmFsdWVcclxuXHRcdFx0fVxyXG4gICAgICAgICAgICByZXR1cm4gc3R5bGVcclxuICAgICAgICB9LHt9KVxyXG5cdH1cclxuXHJcblx0Y3JlYXRlQ29tcG9zZWQyUGFyZW50KHByb3BzKXtcclxuXHRcdGNvbnN0IHtjb2xvcn09dGhpcy5nZXRTdHlsZSgpXHJcblx0XHRjb25zdCB7d2lkdGgsIGhlaWdodCwgZGVzY2VudCwgY29udGVudFdpZHRoLCB3aGl0ZVNwYWNlLCAuLi5vdGhlcnN9PXByb3BzXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8R3JvdXAgd2lkdGg9e3dpZHRofSBoZWlnaHQ9e2hlaWdodH0gZGVzY2VudD17ZGVzY2VudH0+XHJcblx0XHRcdFx0PHRleHQgey4uLnt3aWR0aCxoZWlnaHQsZGVzY2VudH19IHsuLi5vdGhlcnN9IHN0eWxlPXt7d2hpdGVTcGFjZTpcInByZVwifX0vPlxyXG5cdFx0XHQ8L0dyb3VwPlxyXG5cdFx0KVxyXG5cdH1cclxuXHJcblx0Z2V0V3JhcENvbnRleHQoe3dpZHRoLGhlaWdodCxsaW5lV2lkdGh9KXtcclxuXHRcdGNvbnN0IHtpc0NvbXBvc2luZ0xhc3RDaGlsZEluUGFyZW50LHBhcmVudH09dGhpcy5jb250ZXh0XHJcblx0XHRjb25zdCB3aG9sZUxpbmU9d2lkdGg9PWxpbmVXaWR0aFxyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHdpZHRoXHJcblx0XHRcdCxoZWlnaHRcclxuXHRcdFx0LHdvcmR5KHRleHQsIGlzRW5kKXtcclxuXHRcdFx0XHRpZihpc0NvbXBvc2luZ0xhc3RDaGlsZEluUGFyZW50KHRoaXMpXHJcblx0XHRcdFx0XHQmJiBwYXJlbnQuY29udGV4dC5pc0NvbXBvc2luZ0xhc3RDaGlsZEluUGFyZW50KHBhcmVudClcclxuXHRcdFx0XHRcdCYmIGlzRW5kKVxyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlXHJcblxyXG5cdFx0XHRcdGNvbnN0IGhhc09ubHlPbmVXb3JkPVsuLi50ZXh0XS5yZWR1Y2UoKHN0YXRlLG5leHQpPT5zdGF0ZSYmaXNDaGFyKG5leHQpLHRydWUpXHJcblx0XHRcdFx0aWYod2hvbGVMaW5lICYmIGhhc09ubHlPbmVXb3JkKVxyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlXHJcblxyXG5cdFx0XHRcdHJldHVybiB0cnVlXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xyXG5cdFx0Li4uTm9DaGlsZC5jb250ZXh0VHlwZXMsXHJcblx0XHRpbmhlcml0ZWRTdHlsZTogUHJvcFR5cGVzLm9iamVjdFxyXG5cdH1cclxuXHJcblx0c3RhdGljIFdvcmRXcmFwcGVyPUh0bWxXb3JkV3JhcHBlclxyXG59XHJcbiJdfQ==