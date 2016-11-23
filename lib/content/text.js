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
			    parent = _context.parent,
			    isComposingLastChildInParent = _context.isComposingLastChildInParent,
			    currentLineHasOnlyOneWord = _context.currentLineHasOnlyOneWord;

			var wholeLine = width == lineWidth;

			return {
				width: width,
				height: height,
				wordy: function wordy(text, isEnd) {
					if (isComposingLastChildInParent(this) && parent.context.isComposingLastChildInParent(parent) && isEnd) return false;

					var hasOnlyOneWord = [].concat((0, _toConsumableArray3.default)(text)).reduce(function (state, next) {
						return state && (0, _wordwrap.isChar)(next);
					}, true);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3RleHQuanMiXSwibmFtZXMiOlsiVGV4dCIsImNvbXBvc2VkIiwiY29tcHV0ZWQiLCJwYXJlbnQiLCJjb250ZXh0IiwiY29udGVudCIsImdldENvbnRlbnQiLCJsZW5ndGgiLCJjb21wb3NlciIsImNvbnN0cnVjdG9yIiwiV29yZFdyYXBwZXIiLCJnZXRTdHlsZSIsInRleHQiLCJtaW5XaWR0aCIsIm5leHRBdmFpbGFibGVTcGFjZSIsInJlZHVjZSIsInN0YXRlIiwiYSIsImVuZCIsIndoaXRlc3BhY2VzIiwibmV4dCIsImxlbiIsInB1c2giLCJhcHBlbmRDb21wb3NlZCIsImNyZWF0ZUNvbXBvc2VkMlBhcmVudCIsImZpcnN0V29yZCIsInJvbGxiYWNrIiwiZ2V0V3JhcENvbnRleHQiLCJjb250ZW50V2lkdGgiLCJ3aWR0aCIsImlzTGFzdFBpZWNlIiwiZW5kV2l0aENoYXIiLCJjaGlsZHJlbiIsInJlZHVjZVJpZ2h0IiwiY2hyIiwid29yZCIsIndvcmRXaWR0aCIsInN0cmluZ1dpZHRoIiwib3RoZXJzIiwic3Vic3RyIiwib24xQ2hpbGRDb21wb3NlZCIsImluaGVyaXRlZFN0eWxlIiwic3BsaXQiLCJzdHlsZSIsImtleSIsInN0eWxlUGF0aCIsInZhbHVlIiwiZ2V0IiwidW5kZWZpbmVkIiwicHJvcHMiLCJjb2xvciIsImhlaWdodCIsImRlc2NlbnQiLCJ3aGl0ZVNwYWNlIiwibGluZVdpZHRoIiwiaXNDb21wb3NpbmdMYXN0Q2hpbGRJblBhcmVudCIsImN1cnJlbnRMaW5lSGFzT25seU9uZVdvcmQiLCJ3aG9sZUxpbmUiLCJ3b3JkeSIsImlzRW5kIiwiaGFzT25seU9uZVdvcmQiLCJkaXNwbGF5TmFtZSIsImNvbnRleHRUeXBlcyIsIm9iamVjdCIsImZ1bmMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUVBOzs7Ozs7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LENBQWlCLFVBQUNDLEtBQUQsRUFBT0ksSUFBUDtBQUFBLGFBQWNKLFNBQU8sc0JBQU9JLElBQVAsQ0FBckI7QUFBQSxNQUFqQixFQUFtRCxJQUFuRCxDQUFyQjtBQUNBLFNBQUlxQyxhQUFhRyxjQUFkLElBQ0VBLGtCQUFrQkosMkJBRHZCLEVBRUMsT0FBTyxLQUFQOztBQUVELFlBQU8sSUFBUDtBQUNBO0FBZkssSUFBUDtBQWlCQTs7Ozs7QUFySm1CeEQsSSxDQUNiNkQsVyxHQUFZLE07QUFEQzdELEksQ0F1SmI4RCxZLDhCQUNILGFBQVFBLFk7QUFDWHJCLGlCQUFnQixpQkFBVXNCLE07QUFDMUJQLDRCQUEyQixpQkFBVVE7O0FBMUpsQmhFLEksQ0E2SmJVLFc7a0JBN0phVixJIiwiZmlsZSI6InRleHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtOb0NoaWxkfSBmcm9tIFwiLi9hbnlcIlxyXG5pbXBvcnQgSHRtbFdvcmRXcmFwcGVyIGZyb20gXCIuLi93b3Jkd3JhcC9odG1sXCJcclxuaW1wb3J0IHtpc0NoYXIsIGlzV2hpdGVzcGFjZX0gZnJvbSBcIi4uL3dvcmR3cmFwXCJcclxuXHJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZWQvZ3JvdXBcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dCBleHRlbmRzIE5vQ2hpbGR7XHJcblx0c3RhdGljIGRpc3BsYXlOYW1lPVwidGV4dFwiXHJcblxyXG4gICAgY29tcG9zZSgpe1xyXG5cdFx0Y29uc3Qge2NvbXBvc2VkfT10aGlzLmNvbXB1dGVkXHJcbiAgICAgICAgY29uc3Qge3BhcmVudH09dGhpcy5jb250ZXh0XHJcblx0XHRjb25zdCBjb250ZW50PXRoaXMuZ2V0Q29udGVudCgpXHJcblx0XHRjb25zdCBsZW5ndGg9Y29udGVudC5sZW5ndGhcclxuXHJcblx0XHRsZXQgY29tcG9zZXI9bmV3IHRoaXMuY29uc3RydWN0b3IuV29yZFdyYXBwZXIoY29udGVudCwgdGhpcy5nZXRTdHlsZSgpKVxyXG4gICAgICAgIGxldCB0ZXh0PW51bGxcclxuXHRcdGxldCBtaW5XaWR0aD0wXHJcblxyXG5cdFx0bGV0IG5leHRBdmFpbGFibGVTcGFjZT1wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKClcclxuXHRcdGlmKGlzV2hpdGVzcGFjZShjb250ZW50WzBdKSl7XHJcblx0XHRcdC8vYWxsIHdoaXRlc3BhY2Ugc2hvdWxkIGJlIGFwcGVuZGVkIHRvIGxhc3QgbGluZSBlbmRcclxuXHRcdFx0bGV0IHt3aGl0ZXNwYWNlc309Wy4uLmNvbnRlbnRdLnJlZHVjZSgoc3RhdGUsYSk9PntcclxuXHRcdFx0XHRcdGlmKCFzdGF0ZS5lbmQpe1xyXG5cdFx0XHRcdFx0XHRpZihpc1doaXRlc3BhY2UoYSkpXHJcblx0XHRcdFx0XHRcdFx0c3RhdGUud2hpdGVzcGFjZXMrPWFcclxuXHRcdFx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0XHRcdHN0YXRlLmVuZD10cnVlXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRyZXR1cm4gc3RhdGVcclxuXHRcdFx0XHR9LHt3aGl0ZXNwYWNlczpcIlwiLGVuZDpmYWxzZX0pXHJcblx0XHRcdHRleHQ9Y29tcG9zZXIubmV4dCh7bGVuOndoaXRlc3BhY2VzLmxlbmd0aH0pXHJcblx0XHRcdGNvbXBvc2VkLnB1c2godGV4dClcclxuXHRcdFx0cGFyZW50LmFwcGVuZENvbXBvc2VkKHRoaXMuY3JlYXRlQ29tcG9zZWQyUGFyZW50KHRleHQpKVxyXG5cdFx0XHRuZXh0QXZhaWxhYmxlU3BhY2U9cGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZSgpXHJcblx0XHR9ZWxzZSBpZihpc0NoYXIoY29udGVudFswXSkpe1xyXG5cdFx0XHQvL2ZpcnN0IHdvcmQgc2hvdWxkIGJlIHdyYXBwZWQgdG8gbWVyZ2Ugd2l0aCBsYXN0IGxpbmUncyBlbmRpbmcgd29yZFxyXG5cdFx0XHRsZXQge2ZpcnN0V29yZH09Wy4uLmNvbnRlbnRdLnJlZHVjZSgoc3RhdGUsYSk9PntcclxuXHRcdFx0XHRcdGlmKCFzdGF0ZS5lbmQpe1xyXG5cdFx0XHRcdFx0XHRpZihpc0NoYXIoYSkpXHJcblx0XHRcdFx0XHRcdFx0c3RhdGUuZmlyc3RXb3JkKz1hXHJcblx0XHRcdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdFx0XHRzdGF0ZS5lbmQ9dHJ1ZVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0cmV0dXJuIHN0YXRlXHJcblx0XHRcdFx0fSx7Zmlyc3RXb3JkOlwiXCIsZW5kOmZhbHNlfSlcclxuXHRcdFx0dGV4dD1jb21wb3Nlci5uZXh0KHtsZW46Zmlyc3RXb3JkLmxlbmd0aH0pXHJcblxyXG5cdFx0XHRpZihmYWxzZT09PXBhcmVudC5hcHBlbmRDb21wb3NlZCh0aGlzLmNyZWF0ZUNvbXBvc2VkMlBhcmVudCh0ZXh0KSkpXHJcblx0XHRcdFx0Y29tcG9zZXIucm9sbGJhY2soZmlyc3RXb3JkLmxlbmd0aClcclxuXHJcblx0XHRcdG5leHRBdmFpbGFibGVTcGFjZT1wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKClcclxuXHRcdH1cclxuXHJcblxyXG4gICAgICAgIHdoaWxlKHRleHQ9Y29tcG9zZXIubmV4dCh0aGlzLmdldFdyYXBDb250ZXh0KG5leHRBdmFpbGFibGVTcGFjZSkpKXtcclxuXHRcdFx0aWYodGV4dC5jb250ZW50V2lkdGg9PTApe1xyXG5cdFx0XHRcdC8vd2lkdGggb2YgYXZhaWxhYmxlIHNwYWNlIGlzIHRvbyBzbWFsbCwgcmVxdWVzdCBhIGJpZ2dlciBzcGFjZVxyXG5cdFx0XHRcdG1pbldpZHRoPW5leHRBdmFpbGFibGVTcGFjZS53aWR0aCsxXHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdGNvbnN0IGlzTGFzdFBpZWNlPXRleHQuZW5kPT1sZW5ndGhcclxuXHRcdFx0XHRjb25zdCBlbmRXaXRoQ2hhcj1pc0NoYXIodGV4dC5jaGlsZHJlblt0ZXh0LmNoaWxkcmVuLmxlbmd0aC0xXSlcclxuXHRcdFx0XHRpZihpc0xhc3RQaWVjZSAmJiBlbmRXaXRoQ2hhciAmJiAhWy4uLnRleHQuY2hpbGRyZW5dLnJlZHVjZSgoc3RhdGUsYSk9PnN0YXRlJiZpc0NoYXIoYSksdHJ1ZSkpe1xyXG5cdFx0XHRcdFx0LyogPHQ+eHh4IGhlPC90Pjx0PmxsbzwvdD49PmxpbmU6IFs8dGV4dCBjaGlsZHJlbj1cInh4eCBcIi8+PHRleHQgY2hpbGRyZW49XCJoZVwiLz5dXHJcblx0XHRcdFx0XHRtYWtlIGl0IHJlYWR5IHRvIHNpZGUgYnkgc2lkZSBhcnJhbmdlIHNwbGl0dGVkIHdvcmQgdGV4dFxyXG5cdFx0XHRcdFx0Ki9cclxuXHRcdFx0XHRcdGxldCB7d29yZH09Wy4uLnRleHQuY2hpbGRyZW5dLnJlZHVjZVJpZ2h0KChzdGF0ZSxjaHIpPT57XHJcblx0XHRcdFx0XHRcdGlmKHN0YXRlLmVuZClcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gc3RhdGVcclxuXHJcblx0XHRcdFx0XHRcdGlmKGlzQ2hhcihjaHIpKVxyXG5cdFx0XHRcdFx0XHRcdHN0YXRlLndvcmQ9Y2hyK3N0YXRlLndvcmRcclxuXHRcdFx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0XHRcdHN0YXRlLmVuZD10cnVlXHJcblxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gc3RhdGVcclxuXHRcdFx0XHRcdH0se3dvcmQ6XCJcIixlbmQ6ZmFsc2V9KVxyXG5cclxuXHRcdFx0XHRcdGxldCB3b3JkV2lkdGg9Y29tcG9zZXIuc3RyaW5nV2lkdGgod29yZClcclxuXHJcblx0XHRcdFx0XHRsZXQge2NoaWxkcmVuLCBjb250ZW50V2lkdGgsd2lkdGgsZW5kLC4uLm90aGVyc309dGV4dFxyXG5cdFx0XHRcdFx0Y29tcG9zZWQucHVzaCh0ZXh0PXsuLi5vdGhlcnMsXHJcblx0XHRcdFx0XHRcdGNoaWxkcmVuOmNoaWxkcmVuLnN1YnN0cigwLGNoaWxkcmVuLmxlbmd0aC13b3JkLmxlbmd0aClcclxuXHRcdFx0XHRcdFx0LGNvbnRlbnRXaWR0aDpjb250ZW50V2lkdGgtd29yZFdpZHRoXHJcblx0XHRcdFx0XHRcdCx3aWR0aDp3aWR0aC13b3JkV2lkdGhcclxuXHRcdFx0XHRcdFx0LGVuZDplbmQtd29yZC5sZW5ndGhcclxuXHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRwYXJlbnQuYXBwZW5kQ29tcG9zZWQodGhpcy5jcmVhdGVDb21wb3NlZDJQYXJlbnQodGV4dCkpXHJcblxyXG5cdFx0XHRcdFx0Y29tcG9zZWQucHVzaCh0ZXh0PXsuLi5vdGhlcnMsXHJcblx0XHRcdFx0XHRcdGNoaWxkcmVuOndvcmRcclxuXHRcdFx0XHRcdFx0LGNvbnRlbnRXaWR0aDp3b3JkV2lkdGhcclxuXHRcdFx0XHRcdFx0LHdpZHRoOndvcmRXaWR0aFxyXG5cdFx0XHRcdFx0XHQsZW5kXHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0cGFyZW50LmFwcGVuZENvbXBvc2VkKHRoaXMuY3JlYXRlQ29tcG9zZWQyUGFyZW50KHRleHQpKVxyXG5cdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0Y29tcG9zZWQucHVzaCh0ZXh0KVxyXG5cdFx0XHRcdFx0cGFyZW50LmFwcGVuZENvbXBvc2VkKHRoaXMuY3JlYXRlQ29tcG9zZWQyUGFyZW50KHRleHQpKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZih0ZXh0LmVuZD09bGVuZ3RoKVxyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0bWluV2lkdGg9MFxyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bmV4dEF2YWlsYWJsZVNwYWNlPXBhcmVudC5uZXh0QXZhaWxhYmxlU3BhY2Uoe3dpZHRoOm1pbldpZHRofSlcclxuICAgICAgICB9XHJcblx0XHRwYXJlbnQub24xQ2hpbGRDb21wb3NlZCh0aGlzKVxyXG4gICAgfVxyXG5cclxuXHRnZXRTdHlsZSgpe1xyXG5cdFx0Y29uc3Qge2luaGVyaXRlZFN0eWxlfT10aGlzLmNvbnRleHRcclxuXHJcblx0XHRyZXR1cm4gJ3JGb250cyxzeixjb2xvcixiLGksdmFuaXNoJy5zcGxpdChcIixcIikucmVkdWNlKChzdHlsZSwga2V5KT0+e1xyXG4gICAgICAgICAgICBsZXQgc3R5bGVQYXRoPWByUHIuJHtrZXl9YFxyXG5cdFx0XHRsZXQgdmFsdWU9aW5oZXJpdGVkU3R5bGUuZ2V0KHN0eWxlUGF0aClcclxuICAgICAgICAgICAgaWYodmFsdWUhPXVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBzdHlsZVtrZXldPXZhbHVlXHJcblx0XHRcdH1cclxuICAgICAgICAgICAgcmV0dXJuIHN0eWxlXHJcbiAgICAgICAgfSx7fSlcclxuXHR9XHJcblxyXG5cdGNyZWF0ZUNvbXBvc2VkMlBhcmVudChwcm9wcyl7XHJcblx0XHRjb25zdCB7Y29sb3J9PXRoaXMuZ2V0U3R5bGUoKVxyXG5cdFx0Y29uc3Qge3dpZHRoLCBoZWlnaHQsIGRlc2NlbnQsIGNvbnRlbnRXaWR0aCwgd2hpdGVTcGFjZSwgLi4ub3RoZXJzfT1wcm9wc1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEdyb3VwIHdpZHRoPXt3aWR0aH0gaGVpZ2h0PXtoZWlnaHR9IGRlc2NlbnQ9e2Rlc2NlbnR9PlxyXG5cdFx0XHRcdDx0ZXh0IHsuLi57d2lkdGgsaGVpZ2h0LGRlc2NlbnR9fSB7Li4ub3RoZXJzfSBzdHlsZT17e3doaXRlU3BhY2U6XCJwcmVcIn19Lz5cclxuXHRcdFx0PC9Hcm91cD5cclxuXHRcdClcclxuXHR9XHJcblxyXG5cdGdldFdyYXBDb250ZXh0KHt3aWR0aCxoZWlnaHQsbGluZVdpZHRofSl7XHJcblx0XHRjb25zdCB7cGFyZW50LGlzQ29tcG9zaW5nTGFzdENoaWxkSW5QYXJlbnQsIGN1cnJlbnRMaW5lSGFzT25seU9uZVdvcmR9PXRoaXMuY29udGV4dFxyXG5cdFx0Y29uc3Qgd2hvbGVMaW5lPXdpZHRoPT1saW5lV2lkdGhcclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHR3aWR0aFxyXG5cdFx0XHQsaGVpZ2h0XHJcblx0XHRcdCx3b3JkeSh0ZXh0LCBpc0VuZCl7XHJcblx0XHRcdFx0aWYoaXNDb21wb3NpbmdMYXN0Q2hpbGRJblBhcmVudCh0aGlzKVxyXG5cdFx0XHRcdFx0JiYgcGFyZW50LmNvbnRleHQuaXNDb21wb3NpbmdMYXN0Q2hpbGRJblBhcmVudChwYXJlbnQpXHJcblx0XHRcdFx0XHQmJiBpc0VuZClcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZVxyXG5cclxuXHRcdFx0XHRjb25zdCBoYXNPbmx5T25lV29yZD1bLi4udGV4dF0ucmVkdWNlKChzdGF0ZSxuZXh0KT0+c3RhdGUmJmlzQ2hhcihuZXh0KSx0cnVlKVxyXG5cdFx0XHRcdGlmKCh3aG9sZUxpbmUgJiYgaGFzT25seU9uZVdvcmQpIFxyXG5cdFx0XHRcdFx0fHwgKGhhc09ubHlPbmVXb3JkICYmIGN1cnJlbnRMaW5lSGFzT25seU9uZVdvcmQoKSkpXHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2VcclxuXHJcblx0XHRcdFx0cmV0dXJuIHRydWVcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGNvbnRleHRUeXBlcz17XHJcblx0XHQuLi5Ob0NoaWxkLmNvbnRleHRUeXBlcyxcclxuXHRcdGluaGVyaXRlZFN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0Y3VycmVudExpbmVIYXNPbmx5T25lV29yZDogUHJvcFR5cGVzLmZ1bmNcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBXb3JkV3JhcHBlcj1IdG1sV29yZFdyYXBwZXJcclxufVxyXG4iXX0=