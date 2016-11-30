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

			var commit = function commit(state, needNewLine) {
				var stack = state.stack,
				    contentWidth = state.contentWidth,
				    end = state.end,
				    line = state.space.line;

				var changed = false;
				if (changed = stack.length) {
					var text = _this2.createComposed2Parent((0, _extends3.default)({}, defaultStyle, { width: Math.floor(contentWidth), contentWidth: contentWidth, end: end, children: [].concat((0, _toConsumableArray3.default)(stack)) }));
					parent.appendComposed(text);
					state.contentWidth = 0;
					stack.splice(0, stack.length);
				}

				if (needNewLine) line.commit(true);

				if (changed || needNewLine) state.space = parent.nextAvailableSpace();

				return state;
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
						var _commit = commit(state); //left space is not enough


						var _commit$space = _commit.space;
						width = _commit$space.width;
						bFirstLine = _commit$space.bFirstLine;
						bLineStart = _commit$space.bLineStart;
						line = _commit$space.line;
						stack = _commit.stack;
						contentWidth = _commit.contentWidth;

						if (bLineStart) {
							if (bFirstLine) {
								composer.composed = state.end;
								var text = composer.next(state.space); //split
								var splitted = splitPiece(piece, text);
								push(state, splitted[0]);
								commit(state, true);
								_handlePiece(state, splitted[1]);
							} else {
								if (piece.type.ableExceed()) {
									push(state, piece);
								} else if (line.canSeperateWith(piece)) {
									commit(state, true);
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
								commit(state, true);
								_handlePiece(state, piece);
							} else if (line.allCantSeperateWith(piece)) {
								composer.composed = state.end;
								var _text = composer.next(state.space); //split
								var _splitted = splitPiece(piece, _text);
								push(state, _splitted[0]);
								commit(state, true);
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
						commit(state, true);
						_handlePiece(state, piece);
					}
				}
				return state;
			}, { space: parent.nextAvailableSpace(), stack: [], contentWidth: 0, end: 0 });

			commit(state);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3RleHQuanMiXSwibmFtZXMiOlsiVGV4dCIsImNvbXBvc2VyIiwiY29uc3RydWN0b3IiLCJXb3JkV3JhcHBlciIsImNvbnRlbnQiLCJnZXRTdHlsZSIsImNvbXB1dGVkIiwicGllY2VzIiwibWFwIiwidHlwZSIsImNoYXJzIiwiZW5kIiwid2lkdGgiLCJjcmVhdGVFbGVtZW50Iiwia2V5IiwiZ2V0Q29udGVudCIsInJlZHVjZSIsImEiLCJvZmZzZXQiLCJsYXN0IiwibGVuZ3RoIiwicHVzaCIsInN0cmluZ1dpZHRoIiwiam9pbiIsInBhcmVudCIsImNvbnRleHQiLCJkZWZhdWx0U3R5bGUiLCJjb21taXQiLCJzdGF0ZSIsIm5lZWROZXdMaW5lIiwic3RhY2siLCJjb250ZW50V2lkdGgiLCJsaW5lIiwic3BhY2UiLCJjaGFuZ2VkIiwidGV4dCIsImNyZWF0ZUNvbXBvc2VkMlBhcmVudCIsIk1hdGgiLCJmbG9vciIsImNoaWxkcmVuIiwiYXBwZW5kQ29tcG9zZWQiLCJzcGxpY2UiLCJuZXh0QXZhaWxhYmxlU3BhY2UiLCJwaWVjZSIsImJMaW5lU3RhcnQiLCJzcGxpdFBpZWNlIiwiZmlyc3QiLCJzZWNvbmQiLCJoYW5kbGVQaWVjZSIsIl9wYXJzZVRleHQiLCJiRmlyc3RMaW5lIiwiY29tcG9zZWQiLCJuZXh0Iiwic3BsaXR0ZWQiLCJhYmxlRXhjZWVkIiwiY2FuU2VwZXJhdGVXaXRoIiwicm9sbGJhY2siLCJhbGxDYW50U2VwZXJhdGVXaXRoIiwib24xQ2hpbGRDb21wb3NlZCIsImluaGVyaXRlZFN0eWxlIiwic3BsaXQiLCJzdHlsZSIsInN0eWxlUGF0aCIsInZhbHVlIiwiZ2V0IiwidW5kZWZpbmVkIiwicHJvcHMiLCJkaXNwbGF5TmFtZSIsImNvbnRleHRUeXBlcyIsIm9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFF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VixFQUFvQjtBQUNoQkosV0FBTS9DLEdBQU4sSUFBV2lELEtBQVg7QUFDWjtBQUNRLFdBQU9GLEtBQVA7QUFDSCxJQVBBLEVBT0MsRUFQRCxDQUFQO0FBUUE7Ozt3Q0FFcUJLLEssRUFBTTtBQUMzQixVQUFPLDhDQUFrQkEsS0FBbEIsQ0FBUDtBQUNBOzs7OztBQXRKbUJsRSxJLENBQ2JtRSxXLEdBQVksTTtBQURDbkUsSSxDQXdKYm9FLFksOEJBQ0gsYUFBUUEsWTtBQUNYVCxpQkFBZ0IsaUJBQVVVOztBQTFKUHJFLEksQ0E2SmJHLFc7a0JBN0phSCxJIiwiZmlsZSI6InRleHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtOb0NoaWxkfSBmcm9tIFwiLi9hbnlcIlxyXG5pbXBvcnQgSHRtbFdvcmRXcmFwcGVyIGZyb20gXCIuLi93b3Jkd3JhcC9odG1sXCJcclxuaW1wb3J0IHtpc0NoYXIsIGlzV2hpdGVzcGFjZSwgZmluZCwgaXNXb3JkfSBmcm9tIFwiLi4vd29yZHdyYXBcIlxyXG5cclxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXHJcbmltcG9ydCBDb21wb3NlZFRleHQgZnJvbSBcIi4uL2NvbXBvc2VkL3RleHRcIlxyXG5cclxuaW1wb3J0IHtjYXRlZ29yeX0gZnJvbSBcIi4vY2hhcnNcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dCBleHRlbmRzIE5vQ2hpbGR7XHJcblx0c3RhdGljIGRpc3BsYXlOYW1lPVwidGV4dFwiXHJcblx0XHJcblx0cmVuZGVyKCl7XHJcblx0XHRsZXQgY29tcG9zZXI9bmV3IHRoaXMuY29uc3RydWN0b3IuV29yZFdyYXBwZXIoY29udGVudCwgdGhpcy5nZXRTdHlsZSgpKVxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGk+XHJcblx0XHRcdHtcclxuXHRcdFx0XHR0aGlzLmNvbXB1dGVkLnBpZWNlcy5tYXAoKHt0eXBlLGNoYXJzLGVuZCx3aWR0aH0pPT57XHJcblx0XHRcdFx0XHRyZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCh0eXBlLCB7Y2hhcnMsZW5kLHdpZHRoLGtleTplbmR9KVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH1cclxuXHRcdFx0PC9pPlxyXG5cdFx0KVxyXG5cdH1cclxuXHRcclxuXHRfcGFyc2VUZXh0KCl7XHJcblx0XHRsZXQgY29tcG9zZXI9bmV3IHRoaXMuY29uc3RydWN0b3IuV29yZFdyYXBwZXIoY29udGVudCwgdGhpcy5nZXRTdHlsZSgpKVxyXG5cdFx0cmV0dXJuIHRoaXMuY29tcHV0ZWQucGllY2VzPVsuLi50aGlzLmdldENvbnRlbnQoKV0ucmVkdWNlKChwaWVjZXMsYSwgb2Zmc2V0KT0+e1xyXG5cdFx0XHRsZXQgdHlwZT1jYXRlZ29yeShhKVxyXG5cdFx0XHRsZXQgbGFzdD1waWVjZXNbcGllY2VzLmxlbmd0aC0xXVxyXG5cdFx0XHRpZihsYXN0ICYmIGxhc3QudHlwZT09dHlwZSl7XHJcblx0XHRcdFx0bGFzdC5jaGFycy5wdXNoKGEpXHJcblx0XHRcdFx0bGFzdC5lbmQ9b2Zmc2V0XHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdHBpZWNlcy5wdXNoKHt0eXBlLGNoYXJzOlthXSxlbmQ6b2Zmc2V0fSlcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gcGllY2VzXHJcblx0XHR9LFtdKS5tYXAoYT0+e1xyXG5cdFx0XHRhLndpZHRoPWNvbXBvc2VyLnN0cmluZ1dpZHRoKGEuY2hhcnMuam9pbihcIlwiKSlcclxuXHRcdFx0cmV0dXJuIGFcclxuXHRcdH0pXHJcblx0fVxyXG5cdFxyXG5cdGNvbXBvc2UoKXtcclxuXHRcdGxldCBwYXJlbnQ9dGhpcy5jb250ZXh0LnBhcmVudFxyXG5cdFx0bGV0IGNvbXBvc2VyPW5ldyB0aGlzLmNvbnN0cnVjdG9yLldvcmRXcmFwcGVyKHRoaXMuZ2V0Q29udGVudCgpLCB0aGlzLmdldFN0eWxlKCkpXHJcblx0XHRsZXQgZGVmYXVsdFN0eWxlPWNvbXBvc2VyLmRlZmF1bHRTdHlsZVxyXG5cdFx0XHJcblx0XHRjb25zdCBjb21taXQ9KHN0YXRlLG5lZWROZXdMaW5lKT0+e1xyXG5cdFx0XHRsZXQge3N0YWNrLCBjb250ZW50V2lkdGgsZW5kLCBzcGFjZTp7bGluZX19PXN0YXRlXHJcblx0XHRcdGxldCBjaGFuZ2VkPWZhbHNlXHJcblx0XHRcdGlmKGNoYW5nZWQ9c3RhY2subGVuZ3RoKXtcclxuXHRcdFx0XHRsZXQgdGV4dD10aGlzLmNyZWF0ZUNvbXBvc2VkMlBhcmVudCh7Li4uZGVmYXVsdFN0eWxlLHdpZHRoOk1hdGguZmxvb3IoY29udGVudFdpZHRoKSxjb250ZW50V2lkdGgsZW5kLGNoaWxkcmVuOlsuLi5zdGFja119KVxyXG5cdFx0XHRcdHBhcmVudC5hcHBlbmRDb21wb3NlZCh0ZXh0KVxyXG5cdFx0XHRcdHN0YXRlLmNvbnRlbnRXaWR0aD0wXHJcblx0XHRcdFx0c3RhY2suc3BsaWNlKDAsc3RhY2subGVuZ3RoKVxyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRpZihuZWVkTmV3TGluZSlcclxuXHRcdFx0XHRsaW5lLmNvbW1pdCh0cnVlKVxyXG5cdFx0XHRcclxuXHRcdFx0aWYoY2hhbmdlZCB8fCBuZWVkTmV3TGluZSlcclxuXHRcdFx0XHRzdGF0ZS5zcGFjZT1wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKClcclxuXHJcblx0XHRcdHJldHVybiBzdGF0ZVxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRjb25zdCBwdXNoPShzdGF0ZSxwaWVjZSk9PntcclxuXHRcdFx0c3RhdGUuc3RhY2sucHVzaChwaWVjZSlcclxuXHRcdFx0c3RhdGUuY29udGVudFdpZHRoKz1waWVjZS53aWR0aFxyXG5cdFx0XHRzdGF0ZS5lbmQrPXBpZWNlLmNoYXJzLmxlbmd0aFxyXG5cdFx0XHRzdGF0ZS5zcGFjZS5iTGluZVN0YXJ0PWZhbHNlXHJcblx0XHR9XHJcblx0XHRcclxuXHRcdGNvbnN0IHNwbGl0UGllY2U9KHBpZWNlLHRleHQpPT57XHJcblx0XHRcdGNvbnN0IHt3aWR0aCwgZW5kLCBjaGFyc309cGllY2VcclxuXHRcdFx0bGV0IGZpcnN0PXsuLi5waWVjZSwgY2hhcnM6IFsuLi50ZXh0LmNoaWxkcmVuXSwgd2lkdGg6dGV4dC53aWR0aCxlbmQ6ZW5kLXBpZWNlLmNoYXJzLmxlbmd0aCt0ZXh0LmNoaWxkcmVuLmxlbmd0aH1cclxuXHRcdFx0bGV0IHNlY29uZD17Li4ucGllY2UsIGNoYXJzOiBjaGFycy5zcGxpY2UodGV4dC5jaGlsZHJlbi5sZW5ndGgpLCB3aWR0aDogd2lkdGgtdGV4dC53aWR0aH1cclxuXHRcdFx0cmV0dXJuIFtmaXJzdCxzZWNvbmRdXHJcblx0XHR9XHJcblx0XHRcclxuXHRcdGxldCBoYW5kbGVQaWVjZSwgc3RhdGU9dGhpcy5fcGFyc2VUZXh0KCkucmVkdWNlKGhhbmRsZVBpZWNlPShzdGF0ZSxwaWVjZSk9PntcclxuXHRcdFx0bGV0IHtzcGFjZTp7d2lkdGgsYkZpcnN0TGluZSxiTGluZVN0YXJ0LGxpbmV9LHN0YWNrLCBjb250ZW50V2lkdGh9PXN0YXRlXHJcblx0XHRcdGlmKHdpZHRoLWNvbnRlbnRXaWR0aD4wKXtcclxuXHRcdFx0XHRpZih3aWR0aC1jb250ZW50V2lkdGg+PXBpZWNlLndpZHRoKXsvL2xlZnQgc3BhY2UgaXMgYmlnZ2VyIGVub3VnaFxyXG5cdFx0XHRcdFx0cHVzaChzdGF0ZSxwaWVjZSlcclxuXHRcdFx0XHR9ZWxzZXsvL2xlZnQgc3BhY2UgaXMgbm90IGVub3VnaFxyXG5cdFx0XHRcdFx0KHtzcGFjZTp7d2lkdGgsYkZpcnN0TGluZSxiTGluZVN0YXJ0LGxpbmV9LHN0YWNrLCBjb250ZW50V2lkdGh9PWNvbW1pdChzdGF0ZSkpO1xyXG5cdFx0XHRcdFx0aWYoYkxpbmVTdGFydCl7XHJcblx0XHRcdFx0XHRcdGlmKGJGaXJzdExpbmUpe1xyXG5cdFx0XHRcdFx0XHRcdGNvbXBvc2VyLmNvbXBvc2VkPXN0YXRlLmVuZFxyXG5cdFx0XHRcdFx0XHRcdGxldCB0ZXh0PWNvbXBvc2VyLm5leHQoc3RhdGUuc3BhY2UpOy8vc3BsaXRcclxuXHRcdFx0XHRcdFx0XHRsZXQgc3BsaXR0ZWQ9c3BsaXRQaWVjZShwaWVjZSx0ZXh0KVxyXG5cdFx0XHRcdFx0XHRcdHB1c2goc3RhdGUsc3BsaXR0ZWRbMF0pXHJcblx0XHRcdFx0XHRcdFx0Y29tbWl0KHN0YXRlLHRydWUpXHJcblx0XHRcdFx0XHRcdFx0aGFuZGxlUGllY2Uoc3RhdGUsc3BsaXR0ZWRbMV0pXHJcblx0XHRcdFx0XHRcdH1lbHNleyBcclxuXHRcdFx0XHRcdFx0XHRpZihwaWVjZS50eXBlLmFibGVFeGNlZWQoKSl7XHJcblx0XHRcdFx0XHRcdFx0XHRwdXNoKHN0YXRlLHBpZWNlKVxyXG5cdFx0XHRcdFx0XHRcdH1lbHNlIGlmKGxpbmUuY2FuU2VwZXJhdGVXaXRoKHBpZWNlKSl7XHJcblx0XHRcdFx0XHRcdFx0XHRjb21taXQoc3RhdGUsdHJ1ZSlcclxuXHRcdFx0XHRcdFx0XHRcdGhhbmRsZVBpZWNlKHN0YXRlLHBpZWNlKVxyXG5cdFx0XHRcdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0XHRcdFx0bGluZS5yb2xsYmFjayhwaWVjZSk7XHJcblx0XHRcdFx0XHRcdFx0XHRzdGF0ZS5zcGFjZT1wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKClcclxuXHRcdFx0XHRcdFx0XHRcdGhhbmRsZVBpZWNlKHN0YXRlLHBpZWNlKVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRcdGlmKHBpZWNlLnR5cGUuYWJsZUV4Y2VlZCgpKXtcclxuXHRcdFx0XHRcdFx0XHRwdXNoKHN0YXRlLHBpZWNlKVxyXG5cdFx0XHRcdFx0XHR9ZWxzZSBpZihsaW5lLmNhblNlcGVyYXRlV2l0aChwaWVjZSkpe1xyXG5cdFx0XHRcdFx0XHRcdGNvbW1pdChzdGF0ZSx0cnVlKVxyXG5cdFx0XHRcdFx0XHRcdGhhbmRsZVBpZWNlKHN0YXRlLHBpZWNlKVxyXG5cdFx0XHRcdFx0XHR9ZWxzZSBpZihsaW5lLmFsbENhbnRTZXBlcmF0ZVdpdGgocGllY2UpKXtcclxuXHRcdFx0XHRcdFx0XHRjb21wb3Nlci5jb21wb3NlZD1zdGF0ZS5lbmRcclxuXHRcdFx0XHRcdFx0XHRsZXQgdGV4dD1jb21wb3Nlci5uZXh0KHN0YXRlLnNwYWNlKTsvL3NwbGl0XHJcblx0XHRcdFx0XHRcdFx0bGV0IHNwbGl0dGVkPXNwbGl0UGllY2UocGllY2UsdGV4dClcclxuXHRcdFx0XHRcdFx0XHRwdXNoKHN0YXRlLHNwbGl0dGVkWzBdKVxyXG5cdFx0XHRcdFx0XHRcdGNvbW1pdChzdGF0ZSx0cnVlKVxyXG5cdFx0XHRcdFx0XHRcdGhhbmRsZVBpZWNlKHN0YXRlLHNwbGl0dGVkWzFdKVxyXG5cdFx0XHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdFx0XHRsaW5lLnJvbGxiYWNrKHBpZWNlKVxyXG5cdFx0XHRcdFx0XHRcdHN0YXRlLnNwYWNlPXBhcmVudC5uZXh0QXZhaWxhYmxlU3BhY2UoKVxyXG5cdFx0XHRcdFx0XHRcdGhhbmRsZVBpZWNlKHN0YXRlLHBpZWNlKVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRpZihwaWVjZS50eXBlLmFibGVFeGNlZWQoKSl7XHJcblx0XHRcdFx0XHRwdXNoKHN0YXRlLHBpZWNlKVxyXG5cdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0Y29tbWl0KHN0YXRlLHRydWUpXHJcblx0XHRcdFx0XHRoYW5kbGVQaWVjZShzdGF0ZSxwaWVjZSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHN0YXRlXHJcblx0XHR9LHtzcGFjZTpwYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKCksc3RhY2s6W10sY29udGVudFdpZHRoOjAsZW5kOjB9KVxyXG5cdFx0XHJcblx0XHRjb21taXQoc3RhdGUpXHJcblx0XHRcclxuXHRcdHBhcmVudC5vbjFDaGlsZENvbXBvc2VkKHRoaXMpXHJcblx0fVxyXG5cdFxyXG5cdGdldFN0eWxlKCl7XHJcblx0XHRjb25zdCB7aW5oZXJpdGVkU3R5bGV9PXRoaXMuY29udGV4dFxyXG5cclxuXHRcdHJldHVybiAnckZvbnRzLHN6LGNvbG9yLGIsaSx2YW5pc2gnLnNwbGl0KFwiLFwiKS5yZWR1Y2UoKHN0eWxlLCBrZXkpPT57XHJcbiAgICAgICAgICAgIGxldCBzdHlsZVBhdGg9YHJQci4ke2tleX1gXHJcblx0XHRcdGxldCB2YWx1ZT1pbmhlcml0ZWRTdHlsZS5nZXQoc3R5bGVQYXRoKVxyXG4gICAgICAgICAgICBpZih2YWx1ZSE9dW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHN0eWxlW2tleV09dmFsdWVcclxuXHRcdFx0fVxyXG4gICAgICAgICAgICByZXR1cm4gc3R5bGVcclxuICAgICAgICB9LHt9KVxyXG5cdH1cclxuXHJcblx0Y3JlYXRlQ29tcG9zZWQyUGFyZW50KHByb3BzKXtcclxuXHRcdHJldHVybiA8Q29tcG9zZWRUZXh0IHsuLi5wcm9wc30vPlxyXG5cdH1cclxuXHJcblx0c3RhdGljIGNvbnRleHRUeXBlcz17XHJcblx0XHQuLi5Ob0NoaWxkLmNvbnRleHRUeXBlcyxcclxuXHRcdGluaGVyaXRlZFN0eWxlOiBQcm9wVHlwZXMub2JqZWN0XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgV29yZFdyYXBwZXI9SHRtbFdvcmRXcmFwcGVyXHJcbn1cclxuIl19