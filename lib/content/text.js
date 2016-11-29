"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

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

var _text2 = require("../composed/text");

var _text3 = _interopRequireDefault(_text2);

var _chars = require("./chars");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Text = function (_NoChild) {
	(0, _inherits3.default)(Text, _NoChild);

	function Text() {
		(0, _classCallCheck3.default)(this, Text);
		return (0, _possibleConstructorReturn3.default)(this, (Text.__proto__ || (0, _getPrototypeOf2.default)(Text)).apply(this, arguments));
	}

	(0, _createClass3.default)(Text, [{
		key: "render",
		value: function render() {
			var composer = new this.constructor.WordWrapper(content, this.getStyle());
			return _react2.default.createElement(
				"i",
				null,
				this.computed.pieces.map(function (_ref) {
					var type = _ref.type,
					    chars = _ref.chars,
					    end = _ref.end,
					    width = _ref.width;

					return _react2.default.createElement(type, { chars: chars, end: end, width: width, key: end });
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
					last.end = offset;
				} else {
					pieces.push({ type: type, chars: [a], end: offset });
				}
				return pieces;
			}, []).map(function (a) {
				a.width = composer.stringWidth(a.chars.join(""));
				return a;
			});
		}
	}, {
		key: "compose",
		value: function compose() {
			var _this2 = this;

			var parent = this.context.parent;
			var composer = new this.constructor.WordWrapper(this.getContent(), this.getStyle());
			var defaultStyle = composer.defaultStyle;

			var append = function append(state) {
				var stack = state.stack,
				    contentWidth = state.contentWidth,
				    end = state.end,
				    line = state.space.line;

				if (stack.length) {
					var text = _this2.createComposed2Parent((0, _extends3.default)({}, defaultStyle, { width: Math.floor(contentWidth), contentWidth: contentWidth, end: end, children: [].concat((0, _toConsumableArray3.default)(stack)) }));
					parent.appendComposed(text);
					state.contentWidth = 0;
					stack.splice(0, stack.length);
				}
				state.space = parent.nextAvailableSpace();
			};

			var commit = function commit(state) {
				var stack = state.stack,
				    contentWidth = state.contentWidth,
				    end = state.end,
				    line = state.space.line;

				if (stack.length) {
					var text = _this2.createComposed2Parent((0, _extends3.default)({}, defaultStyle, { width: Math.floor(contentWidth), contentWidth: contentWidth, end: end, children: [].concat((0, _toConsumableArray3.default)(stack)) }));
					parent.appendComposed(text);
					state.contentWidth = 0;
					stack.splice(0, stack.length);
				}
				line.commit();
				state.space = parent.nextAvailableSpace();
			};

			var push = function push(state, piece) {
				state.stack.push(piece);
				state.contentWidth += piece.width;
				state.end += piece.chars.length;
				state.space.bLineStart = false;
			};

			var splitPiece = function splitPiece(piece, text) {
				var width = piece.width,
				    end = piece.end,
				    chars = piece.chars;

				var first = (0, _extends3.default)({}, piece, { chars: [].concat((0, _toConsumableArray3.default)(text.children)), width: text.width, end: end - piece.chars.length + text.children.length });
				var second = (0, _extends3.default)({}, piece, { chars: chars.splice(text.children.length), width: width - text.width });
				return [first, second];
			};

			var _handlePiece = void 0,
			    state = this._parseText().reduce(_handlePiece = function handlePiece(state, piece) {
				var _state$space = state.space,
				    width = _state$space.width,
				    bFirstLine = _state$space.bFirstLine,
				    bLineStart = _state$space.bLineStart,
				    line = _state$space.line,
				    stack = state.stack,
				    contentWidth = state.contentWidth;

				if (width - contentWidth > 0) {
					if (width - contentWidth >= piece.width) {
						//left space is bigger enough
						push(state, piece);
					} else {
						//left space is not enough
						append(state);
						var _state$space2 = state.space;
						width = _state$space2.width;
						bFirstLine = _state$space2.bFirstLine;
						bLineStart = _state$space2.bLineStart;
						line = _state$space2.line;
						stack = state.stack;
						contentWidth = state.contentWidth;

						if (bLineStart) {
							if (bFirstLine) {
								composer.composed = state.end;
								var text = composer.next(state.space); //split
								var splitted = splitPiece(piece, text);
								push(state, splitted[0]);
								commit(state);
								_handlePiece(state, splitted[1]);
							} else {
								if (piece.type.ableExceed()) {
									push(state, piece);
								} else if (line.canSeperateWith(piece)) {
									commit(state);
									_handlePiece(state, piece);
								} else {
									line.rollback(piece);
									state.space = parent.nextAvailableSpace();
									_handlePiece(state, piece);
								}
							}
						} else {
							if (piece.type.ableExceed()) {
								push(state, piece);
							} else if (line.canSeperateWith(piece)) {
								commit(state);
								_handlePiece(state, piece);
							} else if (line.allCantSeperateWith(piece)) {
								composer.composed = state.end;
								var _text = composer.next(state.space); //split
								var _splitted = splitPiece(piece, _text);
								push(state, _splitted[0]);
								commit(state);
								_handlePiece(state, _splitted[1]);
							} else {
								line.rollback(piece);
								state.space = parent.nextAvailableSpace();
								_handlePiece(state, piece);
							}
						}
					}
				} else {
					if (piece.type.ableExceed()) {
						push(state, piece);
					} else {
						commit(state);
						_handlePiece(state, piece);
					}
				}
				return state;
			}, { space: parent.nextAvailableSpace(), stack: [], contentWidth: 0, end: 0 });

			append(state);

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
			return _react2.default.createElement(_text3.default, props);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3RleHQuanMiXSwibmFtZXMiOlsiVGV4dCIsImNvbXBvc2VyIiwiY29uc3RydWN0b3IiLCJXb3JkV3JhcHBlciIsImNvbnRlbnQiLCJnZXRTdHlsZSIsImNvbXB1dGVkIiwicGllY2VzIiwibWFwIiwidHlwZSIsImNoYXJzIiwiZW5kIiwid2lkdGgiLCJjcmVhdGVFbGVtZW50Iiwia2V5IiwiZ2V0Q29udGVudCIsInJlZHVjZSIsImEiLCJvZmZzZXQiLCJsYXN0IiwibGVuZ3RoIiwicHVzaCIsInN0cmluZ1dpZHRoIiwiam9pbiIsInBhcmVudCIsImNvbnRleHQiLCJkZWZhdWx0U3R5bGUiLCJhcHBlbmQiLCJzdGFjayIsInN0YXRlIiwiY29udGVudFdpZHRoIiwibGluZSIsInNwYWNlIiwidGV4dCIsImNyZWF0ZUNvbXBvc2VkMlBhcmVudCIsIk1hdGgiLCJmbG9vciIsImNoaWxkcmVuIiwiYXBwZW5kQ29tcG9zZWQiLCJzcGxpY2UiLCJuZXh0QXZhaWxhYmxlU3BhY2UiLCJjb21taXQiLCJwaWVjZSIsImJMaW5lU3RhcnQiLCJzcGxpdFBpZWNlIiwiZmlyc3QiLCJzZWNvbmQiLCJoYW5kbGVQaWVjZSIsIl9wYXJzZVRleHQiLCJiRmlyc3RMaW5lIiwiY29tcG9zZWQiLCJuZXh0Iiwic3BsaXR0ZWQiLCJhYmxlRXhjZWVkIiwiY2FuU2VwZXJhdGVXaXRoIiwicm9sbGJhY2siLCJhbGxDYW50U2VwZXJhdGVXaXRoIiwib24xQ2hpbGRDb21wb3NlZCIsImluaGVyaXRlZFN0eWxlIiwic3BsaXQiLCJzdHlsZSIsInN0eWxlUGF0aCIsInZhbHVlIiwiZ2V0IiwidW5kZWZpbmVkIiwicHJvcHMiLCJkaXNwbGF5TmFtZSIsImNvbnRleHRUeXBlcyIsIm9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FB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UixPQUFPZ0Isa0JBQVAsRUFBUCxFQUFtQ1osT0FBTSxFQUF6QyxFQUE0Q0UsY0FBYSxDQUF6RCxFQUEyRG5CLEtBQUksQ0FBL0QsRUF6RHFCLENBQXZCOztBQTJEQWdCLFVBQU9FLEtBQVA7O0FBRUFMLFVBQU9pQyxnQkFBUCxDQUF3QixJQUF4QjtBQUNBOzs7NkJBRVM7QUFBQSxPQUNGQyxjQURFLEdBQ2MsS0FBS2pDLE9BRG5CLENBQ0ZpQyxjQURFOzs7QUFHVCxVQUFPLDZCQUE2QkMsS0FBN0IsQ0FBbUMsR0FBbkMsRUFBd0MzQyxNQUF4QyxDQUErQyxVQUFDNEMsS0FBRCxFQUFROUMsR0FBUixFQUFjO0FBQzFELFFBQUkrQyxxQkFBaUIvQyxHQUFyQjtBQUNULFFBQUlnRCxRQUFNSixlQUFlSyxHQUFmLENBQW1CRixTQUFuQixDQUFWO0FBQ1MsUUFBR0MsU0FBT0UsU0FBVixFQUFvQjtBQUNoQkosV0FBTTlDLEdBQU4sSUFBV2dELEtBQVg7QUFDWjtBQUNRLFdBQU9GLEtBQVA7QUFDSCxJQVBBLEVBT0MsRUFQRCxDQUFQO0FBUUE7Ozt3Q0FFcUJLLEssRUFBTTtBQUMzQixVQUFPLDhDQUFrQkEsS0FBbEIsQ0FBUDtBQUNBOzs7OztBQTNKbUJqRSxJLENBQ2JrRSxXLEdBQVksTTtBQURDbEUsSSxDQTZKYm1FLFksOEJBQ0gsYUFBUUEsWTtBQUNYVCxpQkFBZ0IsaUJBQVVVOztBQS9KUHBFLEksQ0FrS2JHLFc7a0JBbEthSCxJIiwiZmlsZSI6InRleHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtOb0NoaWxkfSBmcm9tIFwiLi9hbnlcIlxyXG5pbXBvcnQgSHRtbFdvcmRXcmFwcGVyIGZyb20gXCIuLi93b3Jkd3JhcC9odG1sXCJcclxuaW1wb3J0IHtpc0NoYXIsIGlzV2hpdGVzcGFjZSwgZmluZCwgaXNXb3JkfSBmcm9tIFwiLi4vd29yZHdyYXBcIlxyXG5cclxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXHJcbmltcG9ydCBDb21wb3NlZFRleHQgZnJvbSBcIi4uL2NvbXBvc2VkL3RleHRcIlxyXG5cclxuaW1wb3J0IHtjYXRlZ29yeX0gZnJvbSBcIi4vY2hhcnNcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dCBleHRlbmRzIE5vQ2hpbGR7XHJcblx0c3RhdGljIGRpc3BsYXlOYW1lPVwidGV4dFwiXHJcblx0XHJcblx0cmVuZGVyKCl7XHJcblx0XHRsZXQgY29tcG9zZXI9bmV3IHRoaXMuY29uc3RydWN0b3IuV29yZFdyYXBwZXIoY29udGVudCwgdGhpcy5nZXRTdHlsZSgpKVxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGk+XHJcblx0XHRcdHtcclxuXHRcdFx0XHR0aGlzLmNvbXB1dGVkLnBpZWNlcy5tYXAoKHt0eXBlLGNoYXJzLGVuZCx3aWR0aH0pPT57XHJcblx0XHRcdFx0XHRyZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCh0eXBlLCB7Y2hhcnMsZW5kLHdpZHRoLGtleTplbmR9KVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH1cclxuXHRcdFx0PC9pPlxyXG5cdFx0KVxyXG5cdH1cclxuXHRcclxuXHRfcGFyc2VUZXh0KCl7XHJcblx0XHRsZXQgY29tcG9zZXI9bmV3IHRoaXMuY29uc3RydWN0b3IuV29yZFdyYXBwZXIoY29udGVudCwgdGhpcy5nZXRTdHlsZSgpKVxyXG5cdFx0cmV0dXJuIHRoaXMuY29tcHV0ZWQucGllY2VzPVsuLi50aGlzLmdldENvbnRlbnQoKV0ucmVkdWNlKChwaWVjZXMsYSwgb2Zmc2V0KT0+e1xyXG5cdFx0XHRsZXQgdHlwZT1jYXRlZ29yeShhKVxyXG5cdFx0XHRsZXQgbGFzdD1waWVjZXNbcGllY2VzLmxlbmd0aC0xXVxyXG5cdFx0XHRpZihsYXN0ICYmIGxhc3QudHlwZT09dHlwZSl7XHJcblx0XHRcdFx0bGFzdC5jaGFycy5wdXNoKGEpXHJcblx0XHRcdFx0bGFzdC5lbmQ9b2Zmc2V0XHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdHBpZWNlcy5wdXNoKHt0eXBlLGNoYXJzOlthXSxlbmQ6b2Zmc2V0fSlcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gcGllY2VzXHJcblx0XHR9LFtdKS5tYXAoYT0+e1xyXG5cdFx0XHRhLndpZHRoPWNvbXBvc2VyLnN0cmluZ1dpZHRoKGEuY2hhcnMuam9pbihcIlwiKSlcclxuXHRcdFx0cmV0dXJuIGFcclxuXHRcdH0pXHJcblx0fVxyXG5cdFxyXG5cdGNvbXBvc2UoKXtcclxuXHRcdGxldCBwYXJlbnQ9dGhpcy5jb250ZXh0LnBhcmVudFxyXG5cdFx0bGV0IGNvbXBvc2VyPW5ldyB0aGlzLmNvbnN0cnVjdG9yLldvcmRXcmFwcGVyKHRoaXMuZ2V0Q29udGVudCgpLCB0aGlzLmdldFN0eWxlKCkpXHJcblx0XHRsZXQgZGVmYXVsdFN0eWxlPWNvbXBvc2VyLmRlZmF1bHRTdHlsZVxyXG5cdFx0XHJcblx0XHRjb25zdCBhcHBlbmQ9c3RhdGU9PntcclxuXHRcdFx0bGV0IHtzdGFjaywgY29udGVudFdpZHRoLGVuZCwgc3BhY2U6e2xpbmV9fT1zdGF0ZVxyXG5cdFx0XHRpZihzdGFjay5sZW5ndGgpe1xyXG5cdFx0XHRcdGxldCB0ZXh0PXRoaXMuY3JlYXRlQ29tcG9zZWQyUGFyZW50KHsuLi5kZWZhdWx0U3R5bGUsd2lkdGg6TWF0aC5mbG9vcihjb250ZW50V2lkdGgpLGNvbnRlbnRXaWR0aCxlbmQsY2hpbGRyZW46Wy4uLnN0YWNrXX0pXHJcblx0XHRcdFx0cGFyZW50LmFwcGVuZENvbXBvc2VkKHRleHQpXHJcblx0XHRcdFx0c3RhdGUuY29udGVudFdpZHRoPTBcclxuXHRcdFx0XHRzdGFjay5zcGxpY2UoMCxzdGFjay5sZW5ndGgpXHJcblx0XHRcdH1cclxuXHRcdFx0c3RhdGUuc3BhY2U9cGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZSgpXHJcblx0XHR9XHJcblx0XHRcclxuXHRcdGNvbnN0IGNvbW1pdD1zdGF0ZT0+e1xyXG5cdFx0XHRsZXQge3N0YWNrLCBjb250ZW50V2lkdGgsZW5kLCBzcGFjZTp7bGluZX19PXN0YXRlXHJcblx0XHRcdGlmKHN0YWNrLmxlbmd0aCl7XHJcblx0XHRcdFx0bGV0IHRleHQ9dGhpcy5jcmVhdGVDb21wb3NlZDJQYXJlbnQoey4uLmRlZmF1bHRTdHlsZSx3aWR0aDpNYXRoLmZsb29yKGNvbnRlbnRXaWR0aCksY29udGVudFdpZHRoLGVuZCxjaGlsZHJlbjpbLi4uc3RhY2tdfSlcclxuXHRcdFx0XHRwYXJlbnQuYXBwZW5kQ29tcG9zZWQodGV4dClcclxuXHRcdFx0XHRzdGF0ZS5jb250ZW50V2lkdGg9MFxyXG5cdFx0XHRcdHN0YWNrLnNwbGljZSgwLHN0YWNrLmxlbmd0aClcclxuXHRcdFx0fVxyXG5cdFx0XHRsaW5lLmNvbW1pdCgpXHJcblx0XHRcdHN0YXRlLnNwYWNlPXBhcmVudC5uZXh0QXZhaWxhYmxlU3BhY2UoKVxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRjb25zdCBwdXNoPShzdGF0ZSxwaWVjZSk9PntcclxuXHRcdFx0c3RhdGUuc3RhY2sucHVzaChwaWVjZSlcclxuXHRcdFx0c3RhdGUuY29udGVudFdpZHRoKz1waWVjZS53aWR0aFxyXG5cdFx0XHRzdGF0ZS5lbmQrPXBpZWNlLmNoYXJzLmxlbmd0aFxyXG5cdFx0XHRzdGF0ZS5zcGFjZS5iTGluZVN0YXJ0PWZhbHNlXHJcblx0XHR9XHJcblx0XHRcclxuXHRcdGNvbnN0IHNwbGl0UGllY2U9KHBpZWNlLHRleHQpPT57XHJcblx0XHRcdGNvbnN0IHt3aWR0aCwgZW5kLCBjaGFyc309cGllY2VcclxuXHRcdFx0bGV0IGZpcnN0PXsuLi5waWVjZSwgY2hhcnM6IFsuLi50ZXh0LmNoaWxkcmVuXSwgd2lkdGg6dGV4dC53aWR0aCxlbmQ6ZW5kLXBpZWNlLmNoYXJzLmxlbmd0aCt0ZXh0LmNoaWxkcmVuLmxlbmd0aH1cclxuXHRcdFx0bGV0IHNlY29uZD17Li4ucGllY2UsIGNoYXJzOiBjaGFycy5zcGxpY2UodGV4dC5jaGlsZHJlbi5sZW5ndGgpLCB3aWR0aDogd2lkdGgtdGV4dC53aWR0aH1cclxuXHRcdFx0cmV0dXJuIFtmaXJzdCxzZWNvbmRdXHJcblx0XHR9XHJcblx0XHRcclxuXHRcdGxldCBoYW5kbGVQaWVjZSwgc3RhdGU9dGhpcy5fcGFyc2VUZXh0KCkucmVkdWNlKGhhbmRsZVBpZWNlPShzdGF0ZSxwaWVjZSk9PntcclxuXHRcdFx0bGV0IHtzcGFjZTp7d2lkdGgsYkZpcnN0TGluZSxiTGluZVN0YXJ0LGxpbmV9LHN0YWNrLCBjb250ZW50V2lkdGh9PXN0YXRlXHJcblx0XHRcdGlmKHdpZHRoLWNvbnRlbnRXaWR0aD4wKXtcclxuXHRcdFx0XHRpZih3aWR0aC1jb250ZW50V2lkdGg+PXBpZWNlLndpZHRoKXsvL2xlZnQgc3BhY2UgaXMgYmlnZ2VyIGVub3VnaFxyXG5cdFx0XHRcdFx0cHVzaChzdGF0ZSxwaWVjZSlcclxuXHRcdFx0XHR9ZWxzZXsvL2xlZnQgc3BhY2UgaXMgbm90IGVub3VnaFxyXG5cdFx0XHRcdFx0YXBwZW5kKHN0YXRlKTtcclxuXHRcdFx0XHRcdCh7c3BhY2U6e3dpZHRoLGJGaXJzdExpbmUsYkxpbmVTdGFydCxsaW5lfSxzdGFjaywgY29udGVudFdpZHRofT1zdGF0ZSk7XHJcblx0XHRcdFx0XHRpZihiTGluZVN0YXJ0KXtcclxuXHRcdFx0XHRcdFx0aWYoYkZpcnN0TGluZSl7XHJcblx0XHRcdFx0XHRcdFx0Y29tcG9zZXIuY29tcG9zZWQ9c3RhdGUuZW5kXHJcblx0XHRcdFx0XHRcdFx0bGV0IHRleHQ9Y29tcG9zZXIubmV4dChzdGF0ZS5zcGFjZSk7Ly9zcGxpdFxyXG5cdFx0XHRcdFx0XHRcdGxldCBzcGxpdHRlZD1zcGxpdFBpZWNlKHBpZWNlLHRleHQpXHJcblx0XHRcdFx0XHRcdFx0cHVzaChzdGF0ZSxzcGxpdHRlZFswXSlcclxuXHRcdFx0XHRcdFx0XHRjb21taXQoc3RhdGUpXHJcblx0XHRcdFx0XHRcdFx0aGFuZGxlUGllY2Uoc3RhdGUsc3BsaXR0ZWRbMV0pXHJcblx0XHRcdFx0XHRcdH1lbHNleyBcclxuXHRcdFx0XHRcdFx0XHRpZihwaWVjZS50eXBlLmFibGVFeGNlZWQoKSl7XHJcblx0XHRcdFx0XHRcdFx0XHRwdXNoKHN0YXRlLHBpZWNlKVxyXG5cdFx0XHRcdFx0XHRcdH1lbHNlIGlmKGxpbmUuY2FuU2VwZXJhdGVXaXRoKHBpZWNlKSl7XHJcblx0XHRcdFx0XHRcdFx0XHRjb21taXQoc3RhdGUpO1xyXG5cdFx0XHRcdFx0XHRcdFx0aGFuZGxlUGllY2Uoc3RhdGUscGllY2UpXHJcblx0XHRcdFx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRcdFx0XHRsaW5lLnJvbGxiYWNrKHBpZWNlKTtcclxuXHRcdFx0XHRcdFx0XHRcdHN0YXRlLnNwYWNlPXBhcmVudC5uZXh0QXZhaWxhYmxlU3BhY2UoKVxyXG5cdFx0XHRcdFx0XHRcdFx0aGFuZGxlUGllY2Uoc3RhdGUscGllY2UpXHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdFx0aWYocGllY2UudHlwZS5hYmxlRXhjZWVkKCkpe1xyXG5cdFx0XHRcdFx0XHRcdHB1c2goc3RhdGUscGllY2UpXHJcblx0XHRcdFx0XHRcdH1lbHNlIGlmKGxpbmUuY2FuU2VwZXJhdGVXaXRoKHBpZWNlKSl7XHJcblx0XHRcdFx0XHRcdFx0Y29tbWl0KHN0YXRlKVxyXG5cdFx0XHRcdFx0XHRcdGhhbmRsZVBpZWNlKHN0YXRlLHBpZWNlKVxyXG5cdFx0XHRcdFx0XHR9ZWxzZSBpZihsaW5lLmFsbENhbnRTZXBlcmF0ZVdpdGgocGllY2UpKXtcclxuXHRcdFx0XHRcdFx0XHRjb21wb3Nlci5jb21wb3NlZD1zdGF0ZS5lbmRcclxuXHRcdFx0XHRcdFx0XHRsZXQgdGV4dD1jb21wb3Nlci5uZXh0KHN0YXRlLnNwYWNlKTsvL3NwbGl0XHJcblx0XHRcdFx0XHRcdFx0bGV0IHNwbGl0dGVkPXNwbGl0UGllY2UocGllY2UsdGV4dClcclxuXHRcdFx0XHRcdFx0XHRwdXNoKHN0YXRlLHNwbGl0dGVkWzBdKVxyXG5cdFx0XHRcdFx0XHRcdGNvbW1pdChzdGF0ZSlcclxuXHRcdFx0XHRcdFx0XHRoYW5kbGVQaWVjZShzdGF0ZSxzcGxpdHRlZFsxXSlcclxuXHRcdFx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRcdFx0bGluZS5yb2xsYmFjayhwaWVjZSlcclxuXHRcdFx0XHRcdFx0XHRzdGF0ZS5zcGFjZT1wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKClcclxuXHRcdFx0XHRcdFx0XHRoYW5kbGVQaWVjZShzdGF0ZSxwaWVjZSlcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0aWYocGllY2UudHlwZS5hYmxlRXhjZWVkKCkpe1xyXG5cdFx0XHRcdFx0cHVzaChzdGF0ZSxwaWVjZSlcclxuXHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdGNvbW1pdChzdGF0ZSlcclxuXHRcdFx0XHRcdGhhbmRsZVBpZWNlKHN0YXRlLHBpZWNlKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gc3RhdGVcclxuXHRcdH0se3NwYWNlOnBhcmVudC5uZXh0QXZhaWxhYmxlU3BhY2UoKSxzdGFjazpbXSxjb250ZW50V2lkdGg6MCxlbmQ6MH0pXHJcblx0XHRcclxuXHRcdGFwcGVuZChzdGF0ZSlcclxuXHRcdFxyXG5cdFx0cGFyZW50Lm9uMUNoaWxkQ29tcG9zZWQodGhpcylcclxuXHR9XHJcblx0XHJcblx0Z2V0U3R5bGUoKXtcclxuXHRcdGNvbnN0IHtpbmhlcml0ZWRTdHlsZX09dGhpcy5jb250ZXh0XHJcblxyXG5cdFx0cmV0dXJuICdyRm9udHMsc3osY29sb3IsYixpLHZhbmlzaCcuc3BsaXQoXCIsXCIpLnJlZHVjZSgoc3R5bGUsIGtleSk9PntcclxuICAgICAgICAgICAgbGV0IHN0eWxlUGF0aD1gclByLiR7a2V5fWBcclxuXHRcdFx0bGV0IHZhbHVlPWluaGVyaXRlZFN0eWxlLmdldChzdHlsZVBhdGgpXHJcbiAgICAgICAgICAgIGlmKHZhbHVlIT11bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgc3R5bGVba2V5XT12YWx1ZVxyXG5cdFx0XHR9XHJcbiAgICAgICAgICAgIHJldHVybiBzdHlsZVxyXG4gICAgICAgIH0se30pXHJcblx0fVxyXG5cclxuXHRjcmVhdGVDb21wb3NlZDJQYXJlbnQocHJvcHMpe1xyXG5cdFx0cmV0dXJuIDxDb21wb3NlZFRleHQgey4uLnByb3BzfS8+XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcclxuXHRcdC4uLk5vQ2hpbGQuY29udGV4dFR5cGVzLFxyXG5cdFx0aW5oZXJpdGVkU3R5bGU6IFByb3BUeXBlcy5vYmplY3RcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBXb3JkV3JhcHBlcj1IdG1sV29yZFdyYXBwZXJcclxufVxyXG4iXX0=