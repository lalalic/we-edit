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

			/*
   const lineBegin=nextAvailableSpace.width==nextAvailableSpace.lineWidth
   const beginWithChar=isChar(content.charAt(0))
   const isNotFirstLineInParagraph=!this.context.isFirstLineInParagraph()
   const lastLineEndWithChar=this.context.isLastLineEndWithChar()
   
   if(lineBegin && beginWithChar && isNotFirstLineInParagraph && lastLineEndWithChar){
   	let {word:firstWord}=content.reduce((state,a)=>{
   		if(state.end)
   			return state
   	},{word:"",end:false})
   	this.context.moveLastWordInLastLineToCurrentLineStart()
   	nextAvailableSpace=parent.nextAvailableSpace()
   }
   */

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

							if ((0, _wordwrap.isChar)(chr)) state.word += chr;else state.end = true;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3RleHQuanMiXSwibmFtZXMiOlsiVGV4dCIsImNvbXBvc2VkIiwiY29tcHV0ZWQiLCJwYXJlbnQiLCJjb250ZXh0IiwiY29udGVudCIsImdldENvbnRlbnQiLCJsZW5ndGgiLCJjb21wb3NlciIsImNvbnN0cnVjdG9yIiwiV29yZFdyYXBwZXIiLCJnZXRTdHlsZSIsInRleHQiLCJtaW5XaWR0aCIsIm5leHRBdmFpbGFibGVTcGFjZSIsIm5leHQiLCJnZXRXcmFwQ29udGV4dCIsImNvbnRlbnRXaWR0aCIsIndpZHRoIiwiaXNMYXN0UGllY2UiLCJlbmQiLCJlbmRXaXRoQ2hhciIsImNoaWxkcmVuIiwicmVkdWNlIiwic3RhdGUiLCJhIiwicmVkdWNlUmlnaHQiLCJjaHIiLCJ3b3JkIiwid29yZFdpZHRoIiwic3RyaW5nV2lkdGgiLCJvdGhlcnMiLCJwdXNoIiwic3Vic3RyIiwiYXBwZW5kQ29tcG9zZWQiLCJjcmVhdGVDb21wb3NlZDJQYXJlbnQiLCJvbjFDaGlsZENvbXBvc2VkIiwiaW5oZXJpdGVkU3R5bGUiLCJzcGxpdCIsInN0eWxlIiwia2V5Iiwic3R5bGVQYXRoIiwidmFsdWUiLCJnZXQiLCJ1bmRlZmluZWQiLCJwcm9wcyIsImNvbG9yIiwiaGVpZ2h0IiwiZGVzY2VudCIsIndoaXRlU3BhY2UiLCJsaW5lV2lkdGgiLCJpc0NvbXBvc2luZ0xhc3RDaGlsZEluUGFyZW50Iiwid2hvbGVMaW5lIiwid29yZHkiLCJpc0VuZCIsImhhc09ubHlPbmVXb3JkIiwiZGlzcGxheU5hbWUiLCJjb250ZXh0VHlwZXMiLCJvYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUVBOzs7Ozs7SUFFcUJBLEk7Ozs7Ozs7Ozs7NEJBR1I7QUFBQSxPQUNKQyxRQURJLEdBQ00sS0FBS0MsUUFEWCxDQUNKRCxRQURJO0FBQUEsT0FFRUUs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UmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtOb0NoaWxkfSBmcm9tIFwiLi9hbnlcIlxyXG5pbXBvcnQgSHRtbFdvcmRXcmFwcGVyIGZyb20gXCIuLi93b3Jkd3JhcC9odG1sXCJcclxuaW1wb3J0IHtpc0NoYXJ9IGZyb20gXCIuLi93b3Jkd3JhcFwiXHJcblxyXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRleHQgZXh0ZW5kcyBOb0NoaWxke1xyXG5cdHN0YXRpYyBkaXNwbGF5TmFtZT1cInRleHRcIlxyXG5cclxuICAgIGNvbXBvc2UoKXtcclxuXHRcdGNvbnN0IHtjb21wb3NlZH09dGhpcy5jb21wdXRlZFxyXG4gICAgICAgIGNvbnN0IHtwYXJlbnR9PXRoaXMuY29udGV4dFxyXG5cdFx0Y29uc3QgY29udGVudD10aGlzLmdldENvbnRlbnQoKVxyXG5cdFx0Y29uc3QgbGVuZ3RoPWNvbnRlbnQubGVuZ3RoXHJcblx0XHRcclxuXHRcdGxldCBjb21wb3Nlcj1uZXcgdGhpcy5jb25zdHJ1Y3Rvci5Xb3JkV3JhcHBlcihjb250ZW50LCB0aGlzLmdldFN0eWxlKCkpXHJcbiAgICAgICAgbGV0IHRleHQ9bnVsbFxyXG5cdFx0bGV0IG1pbldpZHRoPTBcclxuXHRcdFxyXG5cdFx0bGV0IG5leHRBdmFpbGFibGVTcGFjZT1wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKClcclxuXHRcdFxyXG5cdFx0LypcclxuXHRcdGNvbnN0IGxpbmVCZWdpbj1uZXh0QXZhaWxhYmxlU3BhY2Uud2lkdGg9PW5leHRBdmFpbGFibGVTcGFjZS5saW5lV2lkdGhcclxuXHRcdGNvbnN0IGJlZ2luV2l0aENoYXI9aXNDaGFyKGNvbnRlbnQuY2hhckF0KDApKVxyXG5cdFx0Y29uc3QgaXNOb3RGaXJzdExpbmVJblBhcmFncmFwaD0hdGhpcy5jb250ZXh0LmlzRmlyc3RMaW5lSW5QYXJhZ3JhcGgoKVxyXG5cdFx0Y29uc3QgbGFzdExpbmVFbmRXaXRoQ2hhcj10aGlzLmNvbnRleHQuaXNMYXN0TGluZUVuZFdpdGhDaGFyKClcclxuXHRcdFxyXG5cdFx0aWYobGluZUJlZ2luICYmIGJlZ2luV2l0aENoYXIgJiYgaXNOb3RGaXJzdExpbmVJblBhcmFncmFwaCAmJiBsYXN0TGluZUVuZFdpdGhDaGFyKXtcclxuXHRcdFx0bGV0IHt3b3JkOmZpcnN0V29yZH09Y29udGVudC5yZWR1Y2UoKHN0YXRlLGEpPT57XHJcblx0XHRcdFx0aWYoc3RhdGUuZW5kKVxyXG5cdFx0XHRcdFx0cmV0dXJuIHN0YXRlXHJcblx0XHRcdH0se3dvcmQ6XCJcIixlbmQ6ZmFsc2V9KVxyXG5cdFx0XHR0aGlzLmNvbnRleHQubW92ZUxhc3RXb3JkSW5MYXN0TGluZVRvQ3VycmVudExpbmVTdGFydCgpXHJcblx0XHRcdG5leHRBdmFpbGFibGVTcGFjZT1wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKClcclxuXHRcdH1cclxuXHRcdCovXHJcblx0XHRcclxuICAgICAgICB3aGlsZSh0ZXh0PWNvbXBvc2VyLm5leHQodGhpcy5nZXRXcmFwQ29udGV4dChuZXh0QXZhaWxhYmxlU3BhY2UpKSl7XHJcblx0XHRcdGlmKHRleHQuY29udGVudFdpZHRoPT0wKXtcclxuXHRcdFx0XHQvL3dpZHRoIG9mIGF2YWlsYWJsZSBzcGFjZSBpcyB0b28gc21hbGwsIHJlcXVlc3QgYSBiaWdnZXIgc3BhY2VcclxuXHRcdFx0XHRtaW5XaWR0aD1uZXh0QXZhaWxhYmxlU3BhY2Uud2lkdGgrMVxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRjb25zdCBpc0xhc3RQaWVjZT10ZXh0LmVuZD09bGVuZ3RoXHJcblx0XHRcdFx0Y29uc3QgZW5kV2l0aENoYXI9aXNDaGFyKHRleHQuY2hpbGRyZW5bdGV4dC5jaGlsZHJlbi5sZW5ndGgtMV0pXHJcblx0XHRcdFx0aWYoaXNMYXN0UGllY2UgJiYgZW5kV2l0aENoYXIgJiYgIVsuLi50ZXh0LmNoaWxkcmVuXS5yZWR1Y2UoKHN0YXRlLGEpPT5zdGF0ZSYmaXNDaGFyKGEpLHRydWUpKXtcclxuXHRcdFx0XHRcdC8qIDx0Pnh4eCBoZTwvdD48dD5sbG88L3Q+PT5saW5lOiBbPHRleHQgY2hpbGRyZW49XCJ4eHggXCIvPjx0ZXh0IGNoaWxkcmVuPVwiaGVcIi8+XVxyXG5cdFx0XHRcdFx0bWFrZSBpdCByZWFkeSB0byBzaWRlIGJ5IHNpZGUgYXJyYW5nZSBzcGxpdHRlZCB3b3JkIHRleHRcclxuXHRcdFx0XHRcdCovXHJcblx0XHRcdFx0XHRsZXQge3dvcmR9PVsuLi50ZXh0LmNoaWxkcmVuXS5yZWR1Y2VSaWdodCgoc3RhdGUsY2hyKT0+e1xyXG5cdFx0XHRcdFx0XHRpZihzdGF0ZS5lbmQpXHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHN0YXRlXHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHRpZihpc0NoYXIoY2hyKSlcclxuXHRcdFx0XHRcdFx0XHRzdGF0ZS53b3JkKz1jaHJcclxuXHRcdFx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0XHRcdHN0YXRlLmVuZD10cnVlXHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gc3RhdGVcclxuXHRcdFx0XHRcdH0se3dvcmQ6XCJcIixlbmQ6ZmFsc2V9KVxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRsZXQgd29yZFdpZHRoPWNvbXBvc2VyLnN0cmluZ1dpZHRoKHdvcmQpXHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdGxldCB7Y2hpbGRyZW4sIGNvbnRlbnRXaWR0aCx3aWR0aCxlbmQsLi4ub3RoZXJzfT10ZXh0XHJcblx0XHRcdFx0XHRjb21wb3NlZC5wdXNoKHRleHQ9ey4uLm90aGVycyxcclxuXHRcdFx0XHRcdFx0Y2hpbGRyZW46Y2hpbGRyZW4uc3Vic3RyKDAsY2hpbGRyZW4ubGVuZ3RoLXdvcmQubGVuZ3RoKVxyXG5cdFx0XHRcdFx0XHQsY29udGVudFdpZHRoOmNvbnRlbnRXaWR0aC13b3JkV2lkdGhcclxuXHRcdFx0XHRcdFx0LHdpZHRoOndpZHRoLXdvcmRXaWR0aFxyXG5cdFx0XHRcdFx0XHQsZW5kOmVuZC13b3JkLmxlbmd0aFxyXG5cdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdHBhcmVudC5hcHBlbmRDb21wb3NlZCh0aGlzLmNyZWF0ZUNvbXBvc2VkMlBhcmVudCh0ZXh0KSlcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0Y29tcG9zZWQucHVzaCh0ZXh0PXsuLi5vdGhlcnMsXHJcblx0XHRcdFx0XHRcdGNoaWxkcmVuOndvcmRcclxuXHRcdFx0XHRcdFx0LGNvbnRlbnRXaWR0aDp3b3JkV2lkdGhcclxuXHRcdFx0XHRcdFx0LHdpZHRoOndvcmRXaWR0aFxyXG5cdFx0XHRcdFx0XHQsZW5kXHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0cGFyZW50LmFwcGVuZENvbXBvc2VkKHRoaXMuY3JlYXRlQ29tcG9zZWQyUGFyZW50KHRleHQpKVxyXG5cdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0Y29tcG9zZWQucHVzaCh0ZXh0KVxyXG5cdFx0XHRcdFx0cGFyZW50LmFwcGVuZENvbXBvc2VkKHRoaXMuY3JlYXRlQ29tcG9zZWQyUGFyZW50KHRleHQpKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZih0ZXh0LmVuZD09bGVuZ3RoKVxyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0bWluV2lkdGg9MFxyXG5cdFx0XHRcdFxyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRuZXh0QXZhaWxhYmxlU3BhY2U9cGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZSh7d2lkdGg6bWluV2lkdGh9KVxyXG4gICAgICAgIH1cclxuXHRcdHBhcmVudC5vbjFDaGlsZENvbXBvc2VkKHRoaXMpXHJcbiAgICB9XHJcblxyXG5cdGdldFN0eWxlKCl7XHJcblx0XHRjb25zdCB7aW5oZXJpdGVkU3R5bGV9PXRoaXMuY29udGV4dFxyXG5cclxuXHRcdHJldHVybiAnckZvbnRzLHN6LGNvbG9yLGIsaSx2YW5pc2gnLnNwbGl0KFwiLFwiKS5yZWR1Y2UoKHN0eWxlLCBrZXkpPT57XHJcbiAgICAgICAgICAgIGxldCBzdHlsZVBhdGg9YHJQci4ke2tleX1gXHJcblx0XHRcdGxldCB2YWx1ZT1pbmhlcml0ZWRTdHlsZS5nZXQoc3R5bGVQYXRoKVxyXG4gICAgICAgICAgICBpZih2YWx1ZSE9dW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHN0eWxlW2tleV09dmFsdWVcclxuXHRcdFx0fVxyXG4gICAgICAgICAgICByZXR1cm4gc3R5bGVcclxuICAgICAgICB9LHt9KVxyXG5cdH1cclxuXHJcblx0Y3JlYXRlQ29tcG9zZWQyUGFyZW50KHByb3BzKXtcclxuXHRcdGNvbnN0IHtjb2xvcn09dGhpcy5nZXRTdHlsZSgpXHJcblx0XHRjb25zdCB7d2lkdGgsIGhlaWdodCwgZGVzY2VudCwgY29udGVudFdpZHRoLCB3aGl0ZVNwYWNlLCAuLi5vdGhlcnN9PXByb3BzXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8R3JvdXAgd2lkdGg9e3dpZHRofSBoZWlnaHQ9e2hlaWdodH0gZGVzY2VudD17ZGVzY2VudH0+XHJcblx0XHRcdFx0PHRleHQgey4uLnt3aWR0aCxoZWlnaHQsZGVzY2VudH19IHsuLi5vdGhlcnN9IHN0eWxlPXt7d2hpdGVTcGFjZTpcInByZVwifX0vPlxyXG5cdFx0XHQ8L0dyb3VwPlxyXG5cdFx0KVxyXG5cdH1cclxuXHRcclxuXHRnZXRXcmFwQ29udGV4dCh7d2lkdGgsaGVpZ2h0LGxpbmVXaWR0aH0pe1xyXG5cdFx0Y29uc3Qge2lzQ29tcG9zaW5nTGFzdENoaWxkSW5QYXJlbnQscGFyZW50fT10aGlzLmNvbnRleHRcclxuXHRcdGNvbnN0IHdob2xlTGluZT13aWR0aD09bGluZVdpZHRoXHJcblx0XHRcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHdpZHRoXHJcblx0XHRcdCxoZWlnaHRcclxuXHRcdFx0LHdvcmR5KHRleHQsIGlzRW5kKXtcclxuXHRcdFx0XHRpZihpc0NvbXBvc2luZ0xhc3RDaGlsZEluUGFyZW50KHRoaXMpXHJcblx0XHRcdFx0XHQmJiBwYXJlbnQuY29udGV4dC5pc0NvbXBvc2luZ0xhc3RDaGlsZEluUGFyZW50KHBhcmVudClcclxuXHRcdFx0XHRcdCYmIGlzRW5kKVxyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlXHJcblx0XHRcdFx0XHJcblx0XHRcdFx0Y29uc3QgaGFzT25seU9uZVdvcmQ9Wy4uLnRleHRdLnJlZHVjZSgoc3RhdGUsbmV4dCk9PnN0YXRlJiZpc0NoYXIobmV4dCksdHJ1ZSlcclxuXHRcdFx0XHRpZih3aG9sZUxpbmUgJiYgaGFzT25seU9uZVdvcmQpXHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2VcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcclxuXHRcdC4uLk5vQ2hpbGQuY29udGV4dFR5cGVzLFxyXG5cdFx0aW5oZXJpdGVkU3R5bGU6IFByb3BUeXBlcy5vYmplY3RcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBXb3JkV3JhcHBlcj1IdG1sV29yZFdyYXBwZXJcclxufVxyXG4iXX0=