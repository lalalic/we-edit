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
			this._parseText();
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
						    _contentWidth = _text.contentWidth,
						    _width = _text.width,
						    _end = _text.end,
						    others = (0, _objectWithoutProperties3.default)(_text, ["children", "contentWidth", "width", "end"]);

						composed.push(text = (0, _extends3.default)({}, others, {
							children: children.substr(0, children.length - word.length),
							contentWidth: _contentWidth - wordWidth,
							width: _width - wordWidth,
							end: _end - word.length
						}));
						parent.appendComposed(this.createComposed2Parent(text));

						composed.push(text = (0, _extends3.default)({}, others, {
							children: word,
							contentWidth: wordWidth,
							width: wordWidth,
							end: _end
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
			var composer = new this.constructor.WordWrapper(content, this.getStyle());
			return _react2.default.createElement(
				"i",
				null,
				this.computed.pieces.map(function (_ref) {
					var type = _ref.type,
					    chars = _ref.chars,
					    offset = _ref.offset,
					    width = _ref.width;


					return _react2.default.createElement(type, { chars: chars, offset: offset, width: width, key: offset });
				})
			);
		}
	}, {
		key: "_parseText",
		value: function _parseText() {
			var composer = new this.constructor.WordWrapper(content, this.getStyle());
			return this.computed.pieces = [].concat((0, _toConsumableArray3.default)(this.getContent())).reduce(function (pieces, a, offset) {
				var type = (0, _chars.category)(a);
				var last = pieces[pieces.length - 1];
				if (last && last.type == type) {
					last.chars.push(a);
				} else {
					if (last) last.width = composer.stringWidth(last.chars.join(""));
					pieces.push({ type: type, chars: [a], offset: offset });
				}
				return pieces;
			}, []);
		}
	}, {
		key: "_compose",
		value: function _compose() {
			var _this2 = this;

			var parent = this.context.parent;
			var composer = new this.constructor.WordWrapper(content, this.getStyle());
			var defaultStyle = composer.defaultStyle;

			var add2parent = function add2parent(state) {
				var line = _this2.createComposed2Parent((0, _extends3.default)({}, defaultStyle, { width: width, contentWidth: contentWidth, end: end, children: stack.join("") }));
				parent.appendComposed(line);
				contentWidth = 0;
				stack.splice(0, stack.length);
				state.space = parent.nextAvailableSpace();
			};

			var state = this._parseText().reduce(function (state, piece) {
				var _state$space = state.space,
				    width = _state$space.width,
				    bFirstLine = _state$space.bFirstLine,
				    bLineStart = _state$space.bLineStart,
				    stack = state.stack,
				    contentWidth = state.contentWidth,
				    end = state.end;

				if (width - contentWidth > 0) {
					stack.push(piece.chars.join(""));
					contentWidth += piece.width;
					end += piece.chars.length;
				} else {
					if (piece.type.ableExceed()) {
						stack.push(piece.chars.join(""));
						contentWidth += piece.width;
						end += piece.chars.length;
					} else {
						var _line = _this2.createComposed2Parent((0, _extends3.default)({}, defaultStyle, { width: width, contentWidth: contentWidth, end: end, children: stack.join("") }));
						parent.appendComposed(_line);
						contentWidth = 0;
						stack.splice(0, stack.length);
						state.space = parent.nextAvailableSpace();
					}
				}
				state.contentWidth = contentWidth;
				state.end = end;
				return state;
			}, { space: parent.nextAvailableSpace(), stack: [], contentWidth: 0, end: 0 });

			var _state$space2 = state.space,
			    width = _state$space2.width,
			    bFirstLine = _state$space2.bFirstLine,
			    bLineStart = _state$space2.bLineStart,
			    stack = state.stack,
			    contentWidth = state.contentWidth,
			    end = state.end;

			var line = this.createComposed2Parent((0, _extends3.default)({}, defaultStyle, { width: width, contentWidth: contentWidth, end: end, children: stack.join("") }));
			parent.appendComposed(line);
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
		value: function getWrapContext(_ref2) {
			var width = _ref2.width,
			    height = _ref2.height,
			    lineWidth = _ref2.lineWidth;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3RleHQuanMiXSwibmFtZXMiOlsiVGV4dCIsIl9wYXJzZVRleHQiLCJjb21wb3NlZCIsImNvbXB1dGVkIiwicGFyZW50IiwiY29udGV4dCIsImNvbnRlbnQiLCJnZXRDb250ZW50IiwibGVuZ3RoIiwiY29tcG9zZXIiLCJjb25zdHJ1Y3RvciIsIldvcmRXcmFwcGVyIiwiZ2V0U3R5bGUiLCJ0ZXh0IiwibWluV2lkdGgiLCJuZXh0QXZhaWxhYmxlU3BhY2UiLCJ3aGl0ZXNwYWNlcyIsIm5leHQiLCJsZW4iLCJwdXNoIiwiYXBwZW5kQ29tcG9zZWQiLCJjcmVhdGVDb21wb3NlZDJQYXJlbnQiLCJmaXJzdFdvcmQiLCJyb2xsYmFjayIsImdldFdyYXBDb250ZXh0IiwiY29udGVudFdpZHRoIiwid2lkdGgiLCJpc0xhc3RQaWVjZSIsImVuZCIsImVuZFdpdGhDaGFyIiwiY2hpbGRyZW4iLCJyZWR1Y2VSaWdodCIsInN0YXRlIiwiY2hyIiwid29yZCIsIndvcmRXaWR0aCIsInN0cmluZ1dpZHRoIiwib3RoZXJzIiwic3Vic3RyIiwib24xQ2hpbGRDb21wb3NlZCIsInBpZWNlcyIsIm1hcCIsInR5cGUiLCJjaGFycyIsIm9mZnNldCIsImNyZWF0ZUVsZW1lbnQiLCJrZXkiLCJyZWR1Y2UiLCJhIiwibGFzdCIsImpvaW4iLCJkZWZhdWx0U3R5bGUiLCJhZGQycGFyZW50IiwibGluZSIsInN0YWNrIiwic3BsaWNlIiwic3BhY2UiLCJwaWVjZSIsImJGaXJzdExpbmUiLCJiTGluZVN0YXJ0IiwiYWJsZUV4Y2VlZCIsImluaGVyaXRlZFN0eWxlIiwic3BsaXQiLCJzdHlsZSIsInN0eWxlUGF0aCIsInZhbHVlIiwiZ2V0IiwidW5kZWZpbmVkIiwicHJvcHMiLCJjb2xvciIsImhlaWdodCIsImRlc2NlbnQiLCJ3aGl0ZVNwYWNlIiwibGluZVdpZHRoIiwiaXNDb21wb3NpbmdMYXN0Q2hpbGRJblBhcmVudCIsImN1cnJlbnRMaW5lSGFzT25seU9uZVdvcmQiLCJ3aG9sZUxpbmUiLCJ3b3JkeSIsImlzRW5kIiwiaGFzT25seU9uZVdvcmQiLCJkaXNwbGF5TmFtZSIsImNvbnRleHRUeXBlcyIsIm9iamVjdCIsImZ1bmMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUVBOzs7O0FBRUE7Ozs7SUFFcUJBLEk7Ozs7Ozs7Ozs7NEJBR1I7QUFDWCxRQUFLQyxVQUFMO0FBRFcsT0FFSkMsUUFGSSxHQUVNLEtBQUtDLFFBRlgsQ0FFSkQsUUFGSTtBQUFBLE9BR0VFLE1BSEYsR0FHVSxLQUFLQyxPQUhmLENBR0VELE1BSEY7O0FBSVgsT0FBTUUsVUFBUSxLQUFLQyxVQUFMLEVBQWQ7QUFDQSxPQUFNQyxTQUFPRixRQUFRRSxNQUFyQjs7QUFFQSxPQUFJQyxXQUFTLElBQUksS0FBS0MsV0FBTCxDQUFpQkMsV0FBckIsQ0FBaUNMLE9BQWpDLEVBQTBDLEtBQUtNLFFBQUwsRUFBMUMsQ0FBYjtBQUNNLE9BQUlDLE9BQUssSUFBVDtBQUNOLE9BQUlDLFdBQVMsQ0FBYjs7QUFFQSxPQUFJQyxxQkFBbUJYLE9BQU9XLGtCQUFQLEVBQXZCO0FBQ0EsT0FBRyw0QkFBYVQsUUFBUSxDQUFSLENBQWIsQ0FBSCxFQUE0QjtBQUMzQjtBQUNBLFFBQUlVLGNBQVksb0JBQUtWLE9BQUwseUJBQWhCO0FBQ0FPLFdBQUtKLFNBQVNRLElBQVQsQ0FBYyxFQUFDQyxLQUFJRixZQUFZUixNQUFqQixFQUFkLENBQUw7QUFDQU4sYUFBU2lCLElBQVQsQ0FBY04sSUFBZDtBQUNBVCxXQUFPZ0IsY0FBUCxDQUFzQixLQUFLQyxxQkFBTCxDQUEyQlIsSUFBM0IsQ0FBdEI7QUFDQUUseUJBQW1CWCxPQUFPVyxrQkFBUCxFQUFuQjtBQUNBLElBUEQsTUFPTSxJQUFHLHNCQUFPVCxRQUFRLENBQVIsQ0FBUCxDQUFILEVBQXNCO0FBQzNCO0FBQ0EsUUFBSWdCLFlBQVUsb0JBQUtoQixPQUFMLG1CQUFkO0FBQ0FPLFdBQUtKLFNBQVNRLElBQVQsQ0FBYyxFQUFDQyxLQUFJSSxVQUFVZCxNQUFmLEVBQWQsQ0FBTDs7QUFFQSxRQUFHLFVBQVFKLE9BQU9nQixjQUFQLENBQXNCLEtBQUtDLHFCQUFMLENBQTJCUixJQUEzQixDQUF0QixDQUFYLEVBQ0NKLFNBQVNjLFFBQVQsQ0FBa0JELFVBQVVkLE1BQTVCOztBQUVETyx5QkFBbUJYLE9BQU9XLGtCQUFQLEVBQW5CO0FBQ0E7O0FBR0ssVUFBTUYsT0FBS0osU0FBU1EsSUFBVCxDQUFjLEtBQUtPLGNBQUwsQ0FBb0JULGtCQUFwQixDQUFkLENBQVgsRUFBa0U7QUFDdkUsUUFBR0YsS0FBS1ksWUFBTCxJQUFtQixDQUF0QixFQUF3QjtBQUN2QjtBQUNBWCxnQkFBU0MsbUJBQW1CVyxLQUFuQixHQUF5QixDQUFsQztBQUNBLEtBSEQsTUFHSztBQUNKLFNBQU1DLGNBQVlkLEtBQUtlLEdBQUwsSUFBVXBCLE1BQTVCO0FBQ0EsU0FBTXFCLGNBQVksc0JBQU9oQixLQUFLaUIsUUFBTCxDQUFjakIsS0FBS2lCLFFBQUwsQ0FBY3RCLE1BQWQsR0FBcUIsQ0FBbkMsQ0FBUCxDQUFsQjtBQUNBLFNBQUdtQixlQUFlRSxXQUFmLElBQThCLENBQUMsc0JBQU9oQixLQUFLaUIsUUFBWixDQUFsQyxFQUF3RDtBQUN2RDs7O0FBRHVELHlCQUk1QywyQ0FBSWpCLEtBQUtpQixRQUFULEdBQW1CQyxXQUFuQixDQUErQixVQUFDQyxLQUFELEVBQU9DLEdBQVAsRUFBYTtBQUN0RCxXQUFHRCxNQUFNSixHQUFULEVBQ0MsT0FBT0ksS0FBUDs7QUFFRCxXQUFHLHNCQUFPQyxHQUFQLENBQUgsRUFDQ0QsTUFBTUUsSUFBTixHQUFXRCxNQUFJRCxNQUFNRSxJQUFyQixDQURELEtBR0NGLE1BQU1KLEdBQU4sR0FBVSxJQUFWOztBQUVELGNBQU9JLEtBQVA7QUFDQSxPQVZVLEVBVVQsRUFBQ0UsTUFBSyxFQUFOLEVBQVNOLEtBQUksS0FBYixFQVZTLENBSjRDO0FBQUEsVUFJbERNLElBSmtELGdCQUlsREEsSUFKa0Q7O0FBZ0J2RCxVQUFJQyxZQUFVMUIsU0FBUzJCLFdBQVQsQ0FBcUJGLElBQXJCLENBQWQ7O0FBaEJ1RCxrQkFrQk5yQixJQWxCTTtBQUFBLFVBa0JsRGlCLFFBbEJrRCxTQWtCbERBLFFBbEJrRDtBQUFBLFVBa0J4Q0wsYUFsQndDLFNBa0J4Q0EsWUFsQndDO0FBQUEsVUFrQjNCQyxNQWxCMkIsU0FrQjNCQSxLQWxCMkI7QUFBQSxVQWtCckJFLElBbEJxQixTQWtCckJBLEdBbEJxQjtBQUFBLFVBa0JkUyxNQWxCYzs7QUFtQnZEbkMsZUFBU2lCLElBQVQsQ0FBY04sa0NBQVN3QixNQUFUO0FBQ2JQLGlCQUFTQSxTQUFTUSxNQUFULENBQWdCLENBQWhCLEVBQWtCUixTQUFTdEIsTUFBVCxHQUFnQjBCLEtBQUsxQixNQUF2QyxDQURJO0FBRVppQixxQkFBYUEsZ0JBQWFVLFNBRmQ7QUFHWlQsY0FBTUEsU0FBTVMsU0FIQTtBQUlaUCxZQUFJQSxPQUFJTSxLQUFLMUI7QUFKRCxRQUFkO0FBTUFKLGFBQU9nQixjQUFQLENBQXNCLEtBQUtDLHFCQUFMLENBQTJCUixJQUEzQixDQUF0Qjs7QUFFQVgsZUFBU2lCLElBQVQsQ0FBY04sa0NBQVN3QixNQUFUO0FBQ2JQLGlCQUFTSSxJQURJO0FBRVpULHFCQUFhVSxTQUZEO0FBR1pULGNBQU1TLFNBSE07QUFJWlA7QUFKWSxRQUFkO0FBTUF4QixhQUFPZ0IsY0FBUCxDQUFzQixLQUFLQyxxQkFBTCxDQUEyQlIsSUFBM0IsQ0FBdEI7QUFDQSxNQWxDRCxNQWtDSztBQUNKWCxlQUFTaUIsSUFBVCxDQUFjTixJQUFkO0FBQ0FULGFBQU9nQixjQUFQLENBQXNCLEtBQUtDLHFCQUFMLENBQTJCUixJQUEzQixDQUF0QjtBQUNBO0FBQ0QsU0FBR0EsS0FBS2UsR0FBTCxJQUFVcEIsTUFBYixFQUNDO0FBQ0RNLGdCQUFTLENBQVQ7QUFFQTs7QUFFREMseUJBQW1CWCxPQUFPVyxrQkFBUCxDQUEwQixFQUFDVyxPQUFNWixRQUFQLEVBQTFCLENBQW5CO0FBQ007QUFDUFYsVUFBT21DLGdCQUFQLENBQXdCLElBQXhCO0FBQ0c7OzsyQkFFSTtBQUNQLE9BQUk5QixXQUFTLElBQUksS0FBS0MsV0FBTCxDQUFpQkMsV0FBckIsQ0FBaUNMLE9BQWpDLEVBQTBDLEtBQUtNLFFBQUwsRUFBMUMsQ0FBYjtBQUNBLFVBQ0M7QUFBQTtBQUFBO0FBRUMsU0FBS1QsUUFBTCxDQUFjcUMsTUFBZCxDQUFxQkMsR0FBckIsQ0FBeUIsZ0JBQTZCO0FBQUEsU0FBM0JDLElBQTJCLFFBQTNCQSxJQUEyQjtBQUFBLFNBQXRCQyxLQUFzQixRQUF0QkEsS0FBc0I7QUFBQSxTQUFoQkMsTUFBZ0IsUUFBaEJBLE1BQWdCO0FBQUEsU0FBVGxCLEtBQVMsUUFBVEEsS0FBUzs7O0FBRXJELFlBQU8sZ0JBQU1tQixhQUFOLENBQW9CSCxJQUFwQixFQUEwQixFQUFDQyxZQUFELEVBQU9DLGNBQVAsRUFBY2xCLFlBQWQsRUFBb0JvQixLQUFJRixNQUF4QixFQUExQixDQUFQO0FBQ0EsS0FIRDtBQUZELElBREQ7QUFVQTs7OytCQUVXO0FBQ1gsT0FBSW5DLFdBQVMsSUFBSSxLQUFLQyxXQUFMLENBQWlCQyxXQUFyQixDQUFpQ0wsT0FBakMsRUFBMEMsS0FBS00sUUFBTCxFQUExQyxDQUFiO0FBQ0EsVUFBTyxLQUFLVCxRQUFMLENBQWNxQyxNQUFkLEdBQXFCLDJDQUFJLEtBQUtqQyxVQUFMLEVBQUosR0FBdUJ3QyxNQUF2QixDQUE4QixVQUFDUCxNQUFELEVBQVFRLENBQVIsRUFBV0osTUFBWCxFQUFvQjtBQUM3RSxRQUFJRixPQUFLLHFCQUFTTSxDQUFULENBQVQ7QUFDQSxRQUFJQyxPQUFLVCxPQUFPQSxPQUFPaEMsTUFBUCxHQUFjLENBQXJCLENBQVQ7QUFDQSxRQUFHeUMsUUFBUUEsS0FBS1AsSUFBTCxJQUFXQSxJQUF0QixFQUEyQjtBQUMxQk8sVUFBS04sS0FBTCxDQUFXeEIsSUFBWCxDQUFnQjZCLENBQWhCO0FBQ0EsS0FGRCxNQUVLO0FBQ0osU0FBR0MsSUFBSCxFQUNDQSxLQUFLdkIsS0FBTCxHQUFXakIsU0FBUzJCLFdBQVQsQ0FBcUJhLEtBQUtOLEtBQUwsQ0FBV08sSUFBWCxDQUFnQixFQUFoQixDQUFyQixDQUFYO0FBQ0RWLFlBQU9yQixJQUFQLENBQVksRUFBQ3VCLFVBQUQsRUFBTUMsT0FBTSxDQUFDSyxDQUFELENBQVosRUFBZ0JKLGNBQWhCLEVBQVo7QUFDQTtBQUNELFdBQU9KLE1BQVA7QUFDQSxJQVgyQixFQVcxQixFQVgwQixDQUE1QjtBQVlBOzs7NkJBRVM7QUFBQTs7QUFDVCxPQUFJcEMsU0FBTyxLQUFLQyxPQUFMLENBQWFELE1BQXhCO0FBQ0EsT0FBSUssV0FBUyxJQUFJLEtBQUtDLFdBQUwsQ0FBaUJDLFdBQXJCLENBQWlDTCxPQUFqQyxFQUEwQyxLQUFLTSxRQUFMLEVBQTFDLENBQWI7QUFDQSxPQUFJdUMsZUFBYTFDLFNBQVMwQyxZQUExQjs7QUFFQSxPQUFNQyxhQUFXLFNBQVhBLFVBQVcsUUFBTztBQUN2QixRQUFJQyxPQUFLLE9BQUtoQyxxQkFBTCw0QkFBK0I4QixZQUEvQixJQUE0Q3pCLFlBQTVDLEVBQWtERCwwQkFBbEQsRUFBK0RHLFFBQS9ELEVBQW1FRSxVQUFTd0IsTUFBTUosSUFBTixDQUFXLEVBQVgsQ0FBNUUsSUFBVDtBQUNBOUMsV0FBT2dCLGNBQVAsQ0FBc0JpQyxJQUF0QjtBQUNBNUIsbUJBQWEsQ0FBYjtBQUNBNkIsVUFBTUMsTUFBTixDQUFhLENBQWIsRUFBZUQsTUFBTTlDLE1BQXJCO0FBQ0F3QixVQUFNd0IsS0FBTixHQUFZcEQsT0FBT1csa0JBQVAsRUFBWjtBQUNBLElBTkQ7O0FBUUEsT0FBSWlCLFFBQU0sS0FBSy9CLFVBQUwsR0FBa0I4QyxNQUFsQixDQUF5QixVQUFDZixLQUFELEVBQU95QixLQUFQLEVBQWU7QUFBQSx1QkFDaUJ6QixLQURqQixDQUM1Q3dCLEtBRDRDO0FBQUEsUUFDckM5QixLQURxQyxnQkFDckNBLEtBRHFDO0FBQUEsUUFDL0JnQyxVQUQrQixnQkFDL0JBLFVBRCtCO0FBQUEsUUFDcEJDLFVBRG9CLGdCQUNwQkEsVUFEb0I7QUFBQSxRQUNSTCxLQURRLEdBQ2lCdEIsS0FEakIsQ0FDUnNCLEtBRFE7QUFBQSxRQUNEN0IsWUFEQyxHQUNpQk8sS0FEakIsQ0FDRFAsWUFEQztBQUFBLFFBQ1lHLEdBRFosR0FDaUJJLEtBRGpCLENBQ1lKLEdBRFo7O0FBRWpELFFBQUdGLFFBQU1ELFlBQU4sR0FBbUIsQ0FBdEIsRUFBd0I7QUFDdkI2QixXQUFNbkMsSUFBTixDQUFXc0MsTUFBTWQsS0FBTixDQUFZTyxJQUFaLENBQWlCLEVBQWpCLENBQVg7QUFDQXpCLHFCQUFjZ0MsTUFBTS9CLEtBQXBCO0FBQ0FFLFlBQUs2QixNQUFNZCxLQUFOLENBQVluQyxNQUFqQjtBQUNBLEtBSkQsTUFJSztBQUNKLFNBQUdpRCxNQUFNZixJQUFOLENBQVdrQixVQUFYLEVBQUgsRUFBMkI7QUFDMUJOLFlBQU1uQyxJQUFOLENBQVdzQyxNQUFNZCxLQUFOLENBQVlPLElBQVosQ0FBaUIsRUFBakIsQ0FBWDtBQUNBekIsc0JBQWNnQyxNQUFNL0IsS0FBcEI7QUFDQUUsYUFBSzZCLE1BQU1kLEtBQU4sQ0FBWW5DLE1BQWpCO0FBQ0EsTUFKRCxNQUlLO0FBQ0osVUFBSTZDLFFBQUssT0FBS2hDLHFCQUFMLDRCQUErQjhCLFlBQS9CLElBQTRDekIsWUFBNUMsRUFBa0RELDBCQUFsRCxFQUErREcsUUFBL0QsRUFBbUVFLFVBQVN3QixNQUFNSixJQUFOLENBQVcsRUFBWCxDQUE1RSxJQUFUO0FBQ0E5QyxhQUFPZ0IsY0FBUCxDQUFzQmlDLEtBQXRCO0FBQ0E1QixxQkFBYSxDQUFiO0FBQ0E2QixZQUFNQyxNQUFOLENBQWEsQ0FBYixFQUFlRCxNQUFNOUMsTUFBckI7QUFDQXdCLFlBQU13QixLQUFOLEdBQVlwRCxPQUFPVyxrQkFBUCxFQUFaO0FBQ0E7QUFDRDtBQUNEaUIsVUFBTVAsWUFBTixHQUFtQkEsWUFBbkI7QUFDQU8sVUFBTUosR0FBTixHQUFVQSxHQUFWO0FBQ0EsV0FBT0ksS0FBUDtBQUNBLElBdEJTLEVBc0JSLEVBQUN3QixPQUFNcEQsT0FBT1csa0JBQVAsRUFBUCxFQUFtQ3VDLE9BQU0sRUFBekMsRUFBNEM3QixjQUFhLENBQXpELEVBQTJERyxLQUFJLENBQS9ELEVBdEJRLENBQVY7O0FBYlMsdUJBcUN5REksS0FyQ3pELENBcUNKd0IsS0FyQ0k7QUFBQSxPQXFDRzlCLEtBckNILGlCQXFDR0EsS0FyQ0g7QUFBQSxPQXFDU2dDLFVBckNULGlCQXFDU0EsVUFyQ1Q7QUFBQSxPQXFDb0JDLFVBckNwQixpQkFxQ29CQSxVQXJDcEI7QUFBQSxPQXFDZ0NMLEtBckNoQyxHQXFDeUR0QixLQXJDekQsQ0FxQ2dDc0IsS0FyQ2hDO0FBQUEsT0FxQ3VDN0IsWUFyQ3ZDLEdBcUN5RE8sS0FyQ3pELENBcUN1Q1AsWUFyQ3ZDO0FBQUEsT0FxQ29ERyxHQXJDcEQsR0FxQ3lESSxLQXJDekQsQ0FxQ29ESixHQXJDcEQ7O0FBc0NULE9BQUl5QixPQUFLLEtBQUtoQyxxQkFBTCw0QkFBK0I4QixZQUEvQixJQUE0Q3pCLFlBQTVDLEVBQWtERCwwQkFBbEQsRUFBK0RHLFFBQS9ELEVBQW1FRSxVQUFTd0IsTUFBTUosSUFBTixDQUFXLEVBQVgsQ0FBNUUsSUFBVDtBQUNBOUMsVUFBT2dCLGNBQVAsQ0FBc0JpQyxJQUF0QjtBQUNBakQsVUFBT21DLGdCQUFQLENBQXdCLElBQXhCO0FBQ0E7Ozs2QkFFUztBQUFBLE9BQ0ZzQixjQURFLEdBQ2MsS0FBS3hELE9BRG5CLENBQ0Z3RCxjQURFOzs7QUFHVCxVQUFPLDZCQUE2QkMsS0FBN0IsQ0FBbUMsR0FBbkMsRUFBd0NmLE1BQXhDLENBQStDLFVBQUNnQixLQUFELEVBQVFqQixHQUFSLEVBQWM7QUFDMUQsUUFBSWtCLHFCQUFpQmxCLEdBQXJCO0FBQ1QsUUFBSW1CLFFBQU1KLGVBQWVLLEdBQWYsQ0FBbUJGLFNBQW5CLENBQVY7QUFDUyxRQUFHQyxTQUFPRSxTQUFWLEVBQW9CO0FBQ2hCSixXQUFNakIsR0FBTixJQUFXbUIsS0FBWDtBQUNaO0FBQ1EsV0FBT0YsS0FBUDtBQUNILElBUEEsRUFPQyxFQVBELENBQVA7QUFRQTs7O3dDQUVxQkssSyxFQUFNO0FBQUEsbUJBQ2IsS0FBS3hELFFBQUwsRUFEYTtBQUFBLE9BQ3BCeUQsS0FEb0IsYUFDcEJBLEtBRG9COztBQUFBLE9BRXBCM0MsS0FGb0IsR0FFeUMwQyxLQUZ6QyxDQUVwQjFDLEtBRm9CO0FBQUEsT0FFYjRDLE1BRmEsR0FFeUNGLEtBRnpDLENBRWJFLE1BRmE7QUFBQSxPQUVMQyxPQUZLLEdBRXlDSCxLQUZ6QyxDQUVMRyxPQUZLO0FBQUEsT0FFSTlDLFlBRkosR0FFeUMyQyxLQUZ6QyxDQUVJM0MsWUFGSjtBQUFBLE9BRWtCK0MsVUFGbEIsR0FFeUNKLEtBRnpDLENBRWtCSSxVQUZsQjtBQUFBLE9BRWlDbkMsTUFGakMsMENBRXlDK0IsS0FGekM7O0FBRzNCLFVBQ0M7QUFBQTtBQUFBLE1BQU8sT0FBTzFDLEtBQWQsRUFBcUIsUUFBUTRDLE1BQTdCLEVBQXFDLFNBQVNDLE9BQTlDO0FBQ0MsaUVBQVUsRUFBQzdDLFlBQUQsRUFBTzRDLGNBQVAsRUFBY0MsZ0JBQWQsRUFBVixFQUFzQ2xDLE1BQXRDLElBQThDLE9BQU8sRUFBQ21DLFlBQVcsS0FBWixFQUFyRDtBQURELElBREQ7QUFLQTs7O3dDQUV1QztBQUFBLE9BQXhCOUMsS0FBd0IsU0FBeEJBLEtBQXdCO0FBQUEsT0FBbEI0QyxNQUFrQixTQUFsQkEsTUFBa0I7QUFBQSxPQUFYRyxTQUFXLFNBQVhBLFNBQVc7QUFBQSxrQkFDZ0MsS0FBS3BFLE9BRHJDO0FBQUEsT0FDaENELE1BRGdDLFlBQ2hDQSxNQURnQztBQUFBLE9BQ3pCc0UsNEJBRHlCLFlBQ3pCQSw0QkFEeUI7QUFBQSxPQUNLQyx5QkFETCxZQUNLQSx5QkFETDs7QUFFdkMsT0FBTUMsWUFBVWxELFNBQU8rQyxTQUF2Qjs7QUFFQSxVQUFPO0FBQ04vQyxnQkFETTtBQUVMNEMsa0JBRks7QUFHTE8sU0FISyxpQkFHQ2hFLElBSEQsRUFHT2lFLEtBSFAsRUFHYTtBQUNsQixTQUFHSiw2QkFBNkIsSUFBN0IsS0FDQ3RFLE9BQU9DLE9BQVAsQ0FBZXFFLDRCQUFmLENBQTRDdEUsTUFBNUMsQ0FERCxJQUVDMEUsS0FGSixFQUdDLE9BQU8sS0FBUDs7QUFFRCxTQUFNQyxpQkFBZSxzQkFBT2xFLElBQVAsQ0FBckI7QUFDQSxTQUFJK0QsYUFBYUcsY0FBZCxJQUNFQSxrQkFBa0JKLDJCQUR2QixFQUVDLE9BQU8sS0FBUDs7QUFFRCxZQUFPLElBQVA7QUFDQTtBQWZLLElBQVA7QUFpQkE7Ozs7O0FBL01tQjNFLEksQ0FDYmdGLFcsR0FBWSxNO0FBRENoRixJLENBaU5iaUYsWSw4QkFDSCxhQUFRQSxZO0FBQ1hwQixpQkFBZ0IsaUJBQVVxQixNO0FBQzFCUCw0QkFBMkIsaUJBQVVROztBQXBObEJuRixJLENBdU5iVyxXO2tCQXZOYVgsSSIsImZpbGUiOiJ0ZXh0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7Tm9DaGlsZH0gZnJvbSBcIi4vYW55XCJcclxuaW1wb3J0IEh0bWxXb3JkV3JhcHBlciBmcm9tIFwiLi4vd29yZHdyYXAvaHRtbFwiXHJcbmltcG9ydCB7aXNDaGFyLCBpc1doaXRlc3BhY2UsIGZpbmQsIGlzV29yZH0gZnJvbSBcIi4uL3dvcmR3cmFwXCJcclxuXHJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZWQvZ3JvdXBcIlxyXG5cclxuaW1wb3J0IHtjYXRlZ29yeX0gZnJvbSBcIi4vY2hhcnNcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dCBleHRlbmRzIE5vQ2hpbGR7XHJcblx0c3RhdGljIGRpc3BsYXlOYW1lPVwidGV4dFwiXHJcblxyXG4gICAgY29tcG9zZSgpe1xyXG5cdFx0dGhpcy5fcGFyc2VUZXh0KClcclxuXHRcdGNvbnN0IHtjb21wb3NlZH09dGhpcy5jb21wdXRlZFxyXG4gICAgICAgIGNvbnN0IHtwYXJlbnR9PXRoaXMuY29udGV4dFxyXG5cdFx0Y29uc3QgY29udGVudD10aGlzLmdldENvbnRlbnQoKVxyXG5cdFx0Y29uc3QgbGVuZ3RoPWNvbnRlbnQubGVuZ3RoXHJcblxyXG5cdFx0bGV0IGNvbXBvc2VyPW5ldyB0aGlzLmNvbnN0cnVjdG9yLldvcmRXcmFwcGVyKGNvbnRlbnQsIHRoaXMuZ2V0U3R5bGUoKSlcclxuICAgICAgICBsZXQgdGV4dD1udWxsXHJcblx0XHRsZXQgbWluV2lkdGg9MFxyXG5cclxuXHRcdGxldCBuZXh0QXZhaWxhYmxlU3BhY2U9cGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZSgpXHJcblx0XHRpZihpc1doaXRlc3BhY2UoY29udGVudFswXSkpe1xyXG5cdFx0XHQvL2FsbCB3aGl0ZXNwYWNlIHNob3VsZCBiZSBhcHBlbmRlZCB0byBsYXN0IGxpbmUgZW5kXHJcblx0XHRcdGxldCB3aGl0ZXNwYWNlcz1maW5kKGNvbnRlbnQsIGlzV2hpdGVzcGFjZSlcclxuXHRcdFx0dGV4dD1jb21wb3Nlci5uZXh0KHtsZW46d2hpdGVzcGFjZXMubGVuZ3RofSlcclxuXHRcdFx0Y29tcG9zZWQucHVzaCh0ZXh0KVxyXG5cdFx0XHRwYXJlbnQuYXBwZW5kQ29tcG9zZWQodGhpcy5jcmVhdGVDb21wb3NlZDJQYXJlbnQodGV4dCkpXHJcblx0XHRcdG5leHRBdmFpbGFibGVTcGFjZT1wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKClcclxuXHRcdH1lbHNlIGlmKGlzQ2hhcihjb250ZW50WzBdKSl7XHJcblx0XHRcdC8vZmlyc3Qgd29yZCBzaG91bGQgYmUgd3JhcHBlZCB0byBtZXJnZSB3aXRoIGxhc3QgbGluZSdzIGVuZGluZyB3b3JkXHJcblx0XHRcdGxldCBmaXJzdFdvcmQ9ZmluZChjb250ZW50LGlzQ2hhcilcclxuXHRcdFx0dGV4dD1jb21wb3Nlci5uZXh0KHtsZW46Zmlyc3RXb3JkLmxlbmd0aH0pXHJcblxyXG5cdFx0XHRpZihmYWxzZT09PXBhcmVudC5hcHBlbmRDb21wb3NlZCh0aGlzLmNyZWF0ZUNvbXBvc2VkMlBhcmVudCh0ZXh0KSkpXHJcblx0XHRcdFx0Y29tcG9zZXIucm9sbGJhY2soZmlyc3RXb3JkLmxlbmd0aClcclxuXHJcblx0XHRcdG5leHRBdmFpbGFibGVTcGFjZT1wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKClcclxuXHRcdH1cclxuXHJcblxyXG4gICAgICAgIHdoaWxlKHRleHQ9Y29tcG9zZXIubmV4dCh0aGlzLmdldFdyYXBDb250ZXh0KG5leHRBdmFpbGFibGVTcGFjZSkpKXtcclxuXHRcdFx0aWYodGV4dC5jb250ZW50V2lkdGg9PTApe1xyXG5cdFx0XHRcdC8vd2lkdGggb2YgYXZhaWxhYmxlIHNwYWNlIGlzIHRvbyBzbWFsbCwgcmVxdWVzdCBhIGJpZ2dlciBzcGFjZVxyXG5cdFx0XHRcdG1pbldpZHRoPW5leHRBdmFpbGFibGVTcGFjZS53aWR0aCsxXHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdGNvbnN0IGlzTGFzdFBpZWNlPXRleHQuZW5kPT1sZW5ndGhcclxuXHRcdFx0XHRjb25zdCBlbmRXaXRoQ2hhcj1pc0NoYXIodGV4dC5jaGlsZHJlblt0ZXh0LmNoaWxkcmVuLmxlbmd0aC0xXSlcclxuXHRcdFx0XHRpZihpc0xhc3RQaWVjZSAmJiBlbmRXaXRoQ2hhciAmJiAhaXNXb3JkKHRleHQuY2hpbGRyZW4pKXtcclxuXHRcdFx0XHRcdC8qIDx0Pnh4eCBoZTwvdD48dD5sbG88L3Q+PT5saW5lOiBbPHRleHQgY2hpbGRyZW49XCJ4eHggXCIvPjx0ZXh0IGNoaWxkcmVuPVwiaGVcIi8+XVxyXG5cdFx0XHRcdFx0bWFrZSBpdCByZWFkeSB0byBzaWRlIGJ5IHNpZGUgYXJyYW5nZSBzcGxpdHRlZCB3b3JkIHRleHRcclxuXHRcdFx0XHRcdCovXHJcblx0XHRcdFx0XHRsZXQge3dvcmR9PVsuLi50ZXh0LmNoaWxkcmVuXS5yZWR1Y2VSaWdodCgoc3RhdGUsY2hyKT0+e1xyXG5cdFx0XHRcdFx0XHRpZihzdGF0ZS5lbmQpXHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHN0YXRlXHJcblxyXG5cdFx0XHRcdFx0XHRpZihpc0NoYXIoY2hyKSlcclxuXHRcdFx0XHRcdFx0XHRzdGF0ZS53b3JkPWNocitzdGF0ZS53b3JkXHJcblx0XHRcdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdFx0XHRzdGF0ZS5lbmQ9dHJ1ZVxyXG5cclxuXHRcdFx0XHRcdFx0cmV0dXJuIHN0YXRlXHJcblx0XHRcdFx0XHR9LHt3b3JkOlwiXCIsZW5kOmZhbHNlfSlcclxuXHJcblx0XHRcdFx0XHRsZXQgd29yZFdpZHRoPWNvbXBvc2VyLnN0cmluZ1dpZHRoKHdvcmQpXHJcblxyXG5cdFx0XHRcdFx0bGV0IHtjaGlsZHJlbiwgY29udGVudFdpZHRoLHdpZHRoLGVuZCwuLi5vdGhlcnN9PXRleHRcclxuXHRcdFx0XHRcdGNvbXBvc2VkLnB1c2godGV4dD17Li4ub3RoZXJzLFxyXG5cdFx0XHRcdFx0XHRjaGlsZHJlbjpjaGlsZHJlbi5zdWJzdHIoMCxjaGlsZHJlbi5sZW5ndGgtd29yZC5sZW5ndGgpXHJcblx0XHRcdFx0XHRcdCxjb250ZW50V2lkdGg6Y29udGVudFdpZHRoLXdvcmRXaWR0aFxyXG5cdFx0XHRcdFx0XHQsd2lkdGg6d2lkdGgtd29yZFdpZHRoXHJcblx0XHRcdFx0XHRcdCxlbmQ6ZW5kLXdvcmQubGVuZ3RoXHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0cGFyZW50LmFwcGVuZENvbXBvc2VkKHRoaXMuY3JlYXRlQ29tcG9zZWQyUGFyZW50KHRleHQpKVxyXG5cclxuXHRcdFx0XHRcdGNvbXBvc2VkLnB1c2godGV4dD17Li4ub3RoZXJzLFxyXG5cdFx0XHRcdFx0XHRjaGlsZHJlbjp3b3JkXHJcblx0XHRcdFx0XHRcdCxjb250ZW50V2lkdGg6d29yZFdpZHRoXHJcblx0XHRcdFx0XHRcdCx3aWR0aDp3b3JkV2lkdGhcclxuXHRcdFx0XHRcdFx0LGVuZFxyXG5cdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdHBhcmVudC5hcHBlbmRDb21wb3NlZCh0aGlzLmNyZWF0ZUNvbXBvc2VkMlBhcmVudCh0ZXh0KSlcclxuXHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdGNvbXBvc2VkLnB1c2godGV4dClcclxuXHRcdFx0XHRcdHBhcmVudC5hcHBlbmRDb21wb3NlZCh0aGlzLmNyZWF0ZUNvbXBvc2VkMlBhcmVudCh0ZXh0KSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYodGV4dC5lbmQ9PWxlbmd0aClcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdG1pbldpZHRoPTBcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdG5leHRBdmFpbGFibGVTcGFjZT1wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKHt3aWR0aDptaW5XaWR0aH0pXHJcbiAgICAgICAgfVxyXG5cdFx0cGFyZW50Lm9uMUNoaWxkQ29tcG9zZWQodGhpcylcclxuICAgIH1cclxuXHRcclxuXHRyZW5kZXIoKXtcclxuXHRcdGxldCBjb21wb3Nlcj1uZXcgdGhpcy5jb25zdHJ1Y3Rvci5Xb3JkV3JhcHBlcihjb250ZW50LCB0aGlzLmdldFN0eWxlKCkpXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8aT5cclxuXHRcdFx0e1xyXG5cdFx0XHRcdHRoaXMuY29tcHV0ZWQucGllY2VzLm1hcCgoe3R5cGUsY2hhcnMsb2Zmc2V0LHdpZHRofSk9PntcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0cmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQodHlwZSwge2NoYXJzLG9mZnNldCx3aWR0aCxrZXk6b2Zmc2V0fSlcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9XHJcblx0XHRcdDwvaT5cclxuXHRcdClcclxuXHR9XHJcblx0XHJcblx0X3BhcnNlVGV4dCgpe1xyXG5cdFx0bGV0IGNvbXBvc2VyPW5ldyB0aGlzLmNvbnN0cnVjdG9yLldvcmRXcmFwcGVyKGNvbnRlbnQsIHRoaXMuZ2V0U3R5bGUoKSlcclxuXHRcdHJldHVybiB0aGlzLmNvbXB1dGVkLnBpZWNlcz1bLi4udGhpcy5nZXRDb250ZW50KCldLnJlZHVjZSgocGllY2VzLGEsIG9mZnNldCk9PntcclxuXHRcdFx0bGV0IHR5cGU9Y2F0ZWdvcnkoYSlcclxuXHRcdFx0bGV0IGxhc3Q9cGllY2VzW3BpZWNlcy5sZW5ndGgtMV1cclxuXHRcdFx0aWYobGFzdCAmJiBsYXN0LnR5cGU9PXR5cGUpe1xyXG5cdFx0XHRcdGxhc3QuY2hhcnMucHVzaChhKVxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRpZihsYXN0KVxyXG5cdFx0XHRcdFx0bGFzdC53aWR0aD1jb21wb3Nlci5zdHJpbmdXaWR0aChsYXN0LmNoYXJzLmpvaW4oXCJcIikpXHJcblx0XHRcdFx0cGllY2VzLnB1c2goe3R5cGUsY2hhcnM6W2FdLG9mZnNldH0pXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHBpZWNlc1xyXG5cdFx0fSxbXSlcclxuXHR9XHJcblx0XHJcblx0X2NvbXBvc2UoKXtcclxuXHRcdGxldCBwYXJlbnQ9dGhpcy5jb250ZXh0LnBhcmVudFxyXG5cdFx0bGV0IGNvbXBvc2VyPW5ldyB0aGlzLmNvbnN0cnVjdG9yLldvcmRXcmFwcGVyKGNvbnRlbnQsIHRoaXMuZ2V0U3R5bGUoKSlcclxuXHRcdGxldCBkZWZhdWx0U3R5bGU9Y29tcG9zZXIuZGVmYXVsdFN0eWxlXHJcblx0XHRcclxuXHRcdGNvbnN0IGFkZDJwYXJlbnQ9c3RhdGU9PntcclxuXHRcdFx0bGV0IGxpbmU9dGhpcy5jcmVhdGVDb21wb3NlZDJQYXJlbnQoey4uLmRlZmF1bHRTdHlsZSx3aWR0aCxjb250ZW50V2lkdGgsZW5kLGNoaWxkcmVuOnN0YWNrLmpvaW4oXCJcIil9KVxyXG5cdFx0XHRwYXJlbnQuYXBwZW5kQ29tcG9zZWQobGluZSlcclxuXHRcdFx0Y29udGVudFdpZHRoPTBcclxuXHRcdFx0c3RhY2suc3BsaWNlKDAsc3RhY2subGVuZ3RoKVxyXG5cdFx0XHRzdGF0ZS5zcGFjZT1wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKClcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0bGV0IHN0YXRlPXRoaXMuX3BhcnNlVGV4dCgpLnJlZHVjZSgoc3RhdGUscGllY2UpPT57XHJcblx0XHRcdGxldCB7c3BhY2U6e3dpZHRoLGJGaXJzdExpbmUsYkxpbmVTdGFydH0sc3RhY2ssIGNvbnRlbnRXaWR0aCxlbmR9PXN0YXRlXHJcblx0XHRcdGlmKHdpZHRoLWNvbnRlbnRXaWR0aD4wKXtcclxuXHRcdFx0XHRzdGFjay5wdXNoKHBpZWNlLmNoYXJzLmpvaW4oXCJcIikpXHJcblx0XHRcdFx0Y29udGVudFdpZHRoKz1waWVjZS53aWR0aFxyXG5cdFx0XHRcdGVuZCs9cGllY2UuY2hhcnMubGVuZ3RoXHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdGlmKHBpZWNlLnR5cGUuYWJsZUV4Y2VlZCgpKXtcclxuXHRcdFx0XHRcdHN0YWNrLnB1c2gocGllY2UuY2hhcnMuam9pbihcIlwiKSlcclxuXHRcdFx0XHRcdGNvbnRlbnRXaWR0aCs9cGllY2Uud2lkdGhcclxuXHRcdFx0XHRcdGVuZCs9cGllY2UuY2hhcnMubGVuZ3RoXHJcblx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRsZXQgbGluZT10aGlzLmNyZWF0ZUNvbXBvc2VkMlBhcmVudCh7Li4uZGVmYXVsdFN0eWxlLHdpZHRoLGNvbnRlbnRXaWR0aCxlbmQsY2hpbGRyZW46c3RhY2suam9pbihcIlwiKX0pXHJcblx0XHRcdFx0XHRwYXJlbnQuYXBwZW5kQ29tcG9zZWQobGluZSlcclxuXHRcdFx0XHRcdGNvbnRlbnRXaWR0aD0wXHJcblx0XHRcdFx0XHRzdGFjay5zcGxpY2UoMCxzdGFjay5sZW5ndGgpXHJcblx0XHRcdFx0XHRzdGF0ZS5zcGFjZT1wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKClcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0c3RhdGUuY29udGVudFdpZHRoPWNvbnRlbnRXaWR0aFxyXG5cdFx0XHRzdGF0ZS5lbmQ9ZW5kXHJcblx0XHRcdHJldHVybiBzdGF0ZVxyXG5cdFx0fSx7c3BhY2U6cGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZSgpLHN0YWNrOltdLGNvbnRlbnRXaWR0aDowLGVuZDowfSlcclxuXHRcdFxyXG5cdFx0bGV0IHtzcGFjZTp7d2lkdGgsYkZpcnN0TGluZSxiTGluZVN0YXJ0fSxzdGFjaywgY29udGVudFdpZHRoLGVuZH09c3RhdGVcclxuXHRcdGxldCBsaW5lPXRoaXMuY3JlYXRlQ29tcG9zZWQyUGFyZW50KHsuLi5kZWZhdWx0U3R5bGUsd2lkdGgsY29udGVudFdpZHRoLGVuZCxjaGlsZHJlbjpzdGFjay5qb2luKFwiXCIpfSlcclxuXHRcdHBhcmVudC5hcHBlbmRDb21wb3NlZChsaW5lKVxyXG5cdFx0cGFyZW50Lm9uMUNoaWxkQ29tcG9zZWQodGhpcylcclxuXHR9XHJcblxyXG5cdGdldFN0eWxlKCl7XHJcblx0XHRjb25zdCB7aW5oZXJpdGVkU3R5bGV9PXRoaXMuY29udGV4dFxyXG5cclxuXHRcdHJldHVybiAnckZvbnRzLHN6LGNvbG9yLGIsaSx2YW5pc2gnLnNwbGl0KFwiLFwiKS5yZWR1Y2UoKHN0eWxlLCBrZXkpPT57XHJcbiAgICAgICAgICAgIGxldCBzdHlsZVBhdGg9YHJQci4ke2tleX1gXHJcblx0XHRcdGxldCB2YWx1ZT1pbmhlcml0ZWRTdHlsZS5nZXQoc3R5bGVQYXRoKVxyXG4gICAgICAgICAgICBpZih2YWx1ZSE9dW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHN0eWxlW2tleV09dmFsdWVcclxuXHRcdFx0fVxyXG4gICAgICAgICAgICByZXR1cm4gc3R5bGVcclxuICAgICAgICB9LHt9KVxyXG5cdH1cclxuXHJcblx0Y3JlYXRlQ29tcG9zZWQyUGFyZW50KHByb3BzKXtcclxuXHRcdGNvbnN0IHtjb2xvcn09dGhpcy5nZXRTdHlsZSgpXHJcblx0XHRjb25zdCB7d2lkdGgsIGhlaWdodCwgZGVzY2VudCwgY29udGVudFdpZHRoLCB3aGl0ZVNwYWNlLCAuLi5vdGhlcnN9PXByb3BzXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8R3JvdXAgd2lkdGg9e3dpZHRofSBoZWlnaHQ9e2hlaWdodH0gZGVzY2VudD17ZGVzY2VudH0+XHJcblx0XHRcdFx0PHRleHQgey4uLnt3aWR0aCxoZWlnaHQsZGVzY2VudH19IHsuLi5vdGhlcnN9IHN0eWxlPXt7d2hpdGVTcGFjZTpcInByZVwifX0vPlxyXG5cdFx0XHQ8L0dyb3VwPlxyXG5cdFx0KVxyXG5cdH1cclxuXHJcblx0Z2V0V3JhcENvbnRleHQoe3dpZHRoLGhlaWdodCxsaW5lV2lkdGh9KXtcclxuXHRcdGNvbnN0IHtwYXJlbnQsaXNDb21wb3NpbmdMYXN0Q2hpbGRJblBhcmVudCwgY3VycmVudExpbmVIYXNPbmx5T25lV29yZH09dGhpcy5jb250ZXh0XHJcblx0XHRjb25zdCB3aG9sZUxpbmU9d2lkdGg9PWxpbmVXaWR0aFxyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHdpZHRoXHJcblx0XHRcdCxoZWlnaHRcclxuXHRcdFx0LHdvcmR5KHRleHQsIGlzRW5kKXtcclxuXHRcdFx0XHRpZihpc0NvbXBvc2luZ0xhc3RDaGlsZEluUGFyZW50KHRoaXMpXHJcblx0XHRcdFx0XHQmJiBwYXJlbnQuY29udGV4dC5pc0NvbXBvc2luZ0xhc3RDaGlsZEluUGFyZW50KHBhcmVudClcclxuXHRcdFx0XHRcdCYmIGlzRW5kKVxyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlXHJcblxyXG5cdFx0XHRcdGNvbnN0IGhhc09ubHlPbmVXb3JkPWlzV29yZCh0ZXh0KVxyXG5cdFx0XHRcdGlmKCh3aG9sZUxpbmUgJiYgaGFzT25seU9uZVdvcmQpIFxyXG5cdFx0XHRcdFx0fHwgKGhhc09ubHlPbmVXb3JkICYmIGN1cnJlbnRMaW5lSGFzT25seU9uZVdvcmQoKSkpXHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2VcclxuXHJcblx0XHRcdFx0cmV0dXJuIHRydWVcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGNvbnRleHRUeXBlcz17XHJcblx0XHQuLi5Ob0NoaWxkLmNvbnRleHRUeXBlcyxcclxuXHRcdGluaGVyaXRlZFN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0Y3VycmVudExpbmVIYXNPbmx5T25lV29yZDogUHJvcFR5cGVzLmZ1bmNcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBXb3JkV3JhcHBlcj1IdG1sV29yZFdyYXBwZXJcclxufVxyXG4iXX0=