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

var _any = require("../any");

var _html = require("../../wordwrap/html");

var _html2 = _interopRequireDefault(_html);

var _wordwrap = require("../../wordwrap");

var _group = require("../../composed/group");

var _group2 = _interopRequireDefault(_group);

var _text2 = require("../../composed/text");

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250ZW50L3RleHQvaW5kZXguanMiXSwibmFtZXMiOlsiVGV4dCIsImNvbXBvc2VyIiwiY29uc3RydWN0b3IiLCJXb3JkV3JhcHBlciIsImNvbnRlbnQiLCJnZXRTdHlsZSIsImNvbXB1dGVkIiwicGllY2VzIiwibWFwIiwidHlwZSIsImNoYXJzIiwiZW5kIiwid2lkdGgiLCJjcmVhdGVFbGVtZW50Iiwia2V5IiwiZ2V0Q29udGVudCIsInJlZHVjZSIsImEiLCJvZmZzZXQiLCJsYXN0IiwibGVuZ3RoIiwicHVzaCIsInN0cmluZ1dpZHRoIiwiam9pbiIsInBhcmVudCIsImNvbnRleHQiLCJkZWZhdWx0U3R5bGUiLCJjb21taXQiLCJzdGF0ZSIsIm5lZWROZXdMaW5lIiwic3RhY2siLCJjb250ZW50V2lkdGgiLCJsaW5lIiwic3BhY2UiLCJjaGFuZ2VkIiwidGV4dCIsImNyZWF0ZUNvbXBvc2VkMlBhcmVudCIsIk1hdGgiLCJmbG9vciIsImNoaWxkcmVuIiwiYXBwZW5kQ29tcG9zZWQiLCJzcGxpY2UiLCJuZXh0QXZhaWxhYmxlU3BhY2UiLCJwaWVjZSIsImJMaW5lU3RhcnQiLCJzcGxpdFBpZWNlIiwiZmlyc3QiLCJzZWNvbmQiLCJoYW5kbGVQaWVjZSIsIl9wYXJzZVRleHQiLCJiRmlyc3RMaW5lIiwiY29tcG9zZWQiLCJuZXh0Iiwic3BsaXR0ZWQiLCJhYmxlRXhjZWVkIiwiY2FuU2VwZXJhdGVXaXRoIiwicm9sbGJhY2siLCJhbGxDYW50U2VwZXJhdGVXaXRoIiwib24xQ2hpbGRDb21wb3NlZCIsImluaGVyaXRlZFN0eWxlIiwic3BsaXQiLCJzdHlsZSIsInN0eWxlUGF0aCIsInZhbHVlIiwiZ2V0IiwidW5kZWZpbmVkIiwicHJvcHMiLCJkaXNwbGF5TmFtZSIsImNvbnRleHRUeXBlcyIsIm9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7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U0FBT0UsU0FBVixFQUFvQjtBQUNoQkosV0FBTS9DLEdBQU4sSUFBV2lELEtBQVg7QUFDWjtBQUNRLFdBQU9GLEtBQVA7QUFDSCxJQVBBLEVBT0MsRUFQRCxDQUFQO0FBUUE7Ozt3Q0FFcUJLLEssRUFBTTtBQUMzQixVQUFPLDhDQUFrQkEsS0FBbEIsQ0FBUDtBQUNBOzs7OztBQXRKbUJsRSxJLENBQ2JtRSxXLEdBQVksTTtBQURDbkUsSSxDQXdKYm9FLFksOEJBQ0gsYUFBUUEsWTtBQUNYVCxpQkFBZ0IsaUJBQVVVOztBQTFKUHJFLEksQ0E2SmJHLFc7a0JBN0phSCxJIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7Tm9DaGlsZH0gZnJvbSBcIi4uL2FueVwiXHJcbmltcG9ydCBIdG1sV29yZFdyYXBwZXIgZnJvbSBcIi4uLy4uL3dvcmR3cmFwL2h0bWxcIlxyXG5pbXBvcnQge2lzQ2hhciwgaXNXaGl0ZXNwYWNlLCBmaW5kLCBpc1dvcmR9IGZyb20gXCIuLi8uLi93b3Jkd3JhcFwiXHJcblxyXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uLy4uL2NvbXBvc2VkL2dyb3VwXCJcclxuaW1wb3J0IENvbXBvc2VkVGV4dCBmcm9tIFwiLi4vLi4vY29tcG9zZWQvdGV4dFwiXHJcblxyXG5pbXBvcnQge2NhdGVnb3J5fSBmcm9tIFwiLi9jaGFyc1wiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXh0IGV4dGVuZHMgTm9DaGlsZHtcclxuXHRzdGF0aWMgZGlzcGxheU5hbWU9XCJ0ZXh0XCJcclxuXHJcblx0cmVuZGVyKCl7XHJcblx0XHRsZXQgY29tcG9zZXI9bmV3IHRoaXMuY29uc3RydWN0b3IuV29yZFdyYXBwZXIoY29udGVudCwgdGhpcy5nZXRTdHlsZSgpKVxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGk+XHJcblx0XHRcdHtcclxuXHRcdFx0XHR0aGlzLmNvbXB1dGVkLnBpZWNlcy5tYXAoKHt0eXBlLGNoYXJzLGVuZCx3aWR0aH0pPT57XHJcblx0XHRcdFx0XHRyZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCh0eXBlLCB7Y2hhcnMsZW5kLHdpZHRoLGtleTplbmR9KVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH1cclxuXHRcdFx0PC9pPlxyXG5cdFx0KVxyXG5cdH1cclxuXHJcblx0X3BhcnNlVGV4dCgpe1xyXG5cdFx0bGV0IGNvbXBvc2VyPW5ldyB0aGlzLmNvbnN0cnVjdG9yLldvcmRXcmFwcGVyKGNvbnRlbnQsIHRoaXMuZ2V0U3R5bGUoKSlcclxuXHRcdHJldHVybiB0aGlzLmNvbXB1dGVkLnBpZWNlcz1bLi4udGhpcy5nZXRDb250ZW50KCldLnJlZHVjZSgocGllY2VzLGEsIG9mZnNldCk9PntcclxuXHRcdFx0bGV0IHR5cGU9Y2F0ZWdvcnkoYSlcclxuXHRcdFx0bGV0IGxhc3Q9cGllY2VzW3BpZWNlcy5sZW5ndGgtMV1cclxuXHRcdFx0aWYobGFzdCAmJiBsYXN0LnR5cGU9PXR5cGUpe1xyXG5cdFx0XHRcdGxhc3QuY2hhcnMucHVzaChhKVxyXG5cdFx0XHRcdGxhc3QuZW5kPW9mZnNldFxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRwaWVjZXMucHVzaCh7dHlwZSxjaGFyczpbYV0sZW5kOm9mZnNldH0pXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHBpZWNlc1xyXG5cdFx0fSxbXSkubWFwKGE9PntcclxuXHRcdFx0YS53aWR0aD1jb21wb3Nlci5zdHJpbmdXaWR0aChhLmNoYXJzLmpvaW4oXCJcIikpXHJcblx0XHRcdHJldHVybiBhXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0Y29tcG9zZSgpe1xyXG5cdFx0bGV0IHBhcmVudD10aGlzLmNvbnRleHQucGFyZW50XHJcblx0XHRsZXQgY29tcG9zZXI9bmV3IHRoaXMuY29uc3RydWN0b3IuV29yZFdyYXBwZXIodGhpcy5nZXRDb250ZW50KCksIHRoaXMuZ2V0U3R5bGUoKSlcclxuXHRcdGxldCBkZWZhdWx0U3R5bGU9Y29tcG9zZXIuZGVmYXVsdFN0eWxlXHJcblxyXG5cdFx0Y29uc3QgY29tbWl0PShzdGF0ZSxuZWVkTmV3TGluZSk9PntcclxuXHRcdFx0bGV0IHtzdGFjaywgY29udGVudFdpZHRoLGVuZCwgc3BhY2U6e2xpbmV9fT1zdGF0ZVxyXG5cdFx0XHRsZXQgY2hhbmdlZD1mYWxzZVxyXG5cdFx0XHRpZihjaGFuZ2VkPXN0YWNrLmxlbmd0aCl7XHJcblx0XHRcdFx0bGV0IHRleHQ9dGhpcy5jcmVhdGVDb21wb3NlZDJQYXJlbnQoey4uLmRlZmF1bHRTdHlsZSx3aWR0aDpNYXRoLmZsb29yKGNvbnRlbnRXaWR0aCksY29udGVudFdpZHRoLGVuZCxjaGlsZHJlbjpbLi4uc3RhY2tdfSlcclxuXHRcdFx0XHRwYXJlbnQuYXBwZW5kQ29tcG9zZWQodGV4dClcclxuXHRcdFx0XHRzdGF0ZS5jb250ZW50V2lkdGg9MFxyXG5cdFx0XHRcdHN0YWNrLnNwbGljZSgwLHN0YWNrLmxlbmd0aClcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYobmVlZE5ld0xpbmUpXHJcblx0XHRcdFx0bGluZS5jb21taXQodHJ1ZSlcclxuXHJcblx0XHRcdGlmKGNoYW5nZWQgfHwgbmVlZE5ld0xpbmUpXHJcblx0XHRcdFx0c3RhdGUuc3BhY2U9cGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZSgpXHJcblxyXG5cdFx0XHRyZXR1cm4gc3RhdGVcclxuXHRcdH1cclxuXHJcblx0XHRjb25zdCBwdXNoPShzdGF0ZSxwaWVjZSk9PntcclxuXHRcdFx0c3RhdGUuc3RhY2sucHVzaChwaWVjZSlcclxuXHRcdFx0c3RhdGUuY29udGVudFdpZHRoKz1waWVjZS53aWR0aFxyXG5cdFx0XHRzdGF0ZS5lbmQrPXBpZWNlLmNoYXJzLmxlbmd0aFxyXG5cdFx0XHRzdGF0ZS5zcGFjZS5iTGluZVN0YXJ0PWZhbHNlXHJcblx0XHR9XHJcblxyXG5cdFx0Y29uc3Qgc3BsaXRQaWVjZT0ocGllY2UsdGV4dCk9PntcclxuXHRcdFx0Y29uc3Qge3dpZHRoLCBlbmQsIGNoYXJzfT1waWVjZVxyXG5cdFx0XHRsZXQgZmlyc3Q9ey4uLnBpZWNlLCBjaGFyczogWy4uLnRleHQuY2hpbGRyZW5dLCB3aWR0aDp0ZXh0LndpZHRoLGVuZDplbmQtcGllY2UuY2hhcnMubGVuZ3RoK3RleHQuY2hpbGRyZW4ubGVuZ3RofVxyXG5cdFx0XHRsZXQgc2Vjb25kPXsuLi5waWVjZSwgY2hhcnM6IGNoYXJzLnNwbGljZSh0ZXh0LmNoaWxkcmVuLmxlbmd0aCksIHdpZHRoOiB3aWR0aC10ZXh0LndpZHRofVxyXG5cdFx0XHRyZXR1cm4gW2ZpcnN0LHNlY29uZF1cclxuXHRcdH1cclxuXHJcblx0XHRsZXQgaGFuZGxlUGllY2UsIHN0YXRlPXRoaXMuX3BhcnNlVGV4dCgpLnJlZHVjZShoYW5kbGVQaWVjZT0oc3RhdGUscGllY2UpPT57XHJcblx0XHRcdGxldCB7c3BhY2U6e3dpZHRoLGJGaXJzdExpbmUsYkxpbmVTdGFydCxsaW5lfSxzdGFjaywgY29udGVudFdpZHRofT1zdGF0ZVxyXG5cdFx0XHRpZih3aWR0aC1jb250ZW50V2lkdGg+MCl7XHJcblx0XHRcdFx0aWYod2lkdGgtY29udGVudFdpZHRoPj1waWVjZS53aWR0aCl7Ly9sZWZ0IHNwYWNlIGlzIGJpZ2dlciBlbm91Z2hcclxuXHRcdFx0XHRcdHB1c2goc3RhdGUscGllY2UpXHJcblx0XHRcdFx0fWVsc2V7Ly9sZWZ0IHNwYWNlIGlzIG5vdCBlbm91Z2hcclxuXHRcdFx0XHRcdCh7c3BhY2U6e3dpZHRoLGJGaXJzdExpbmUsYkxpbmVTdGFydCxsaW5lfSxzdGFjaywgY29udGVudFdpZHRofT1jb21taXQoc3RhdGUpKTtcclxuXHRcdFx0XHRcdGlmKGJMaW5lU3RhcnQpe1xyXG5cdFx0XHRcdFx0XHRpZihiRmlyc3RMaW5lKXtcclxuXHRcdFx0XHRcdFx0XHRjb21wb3Nlci5jb21wb3NlZD1zdGF0ZS5lbmRcclxuXHRcdFx0XHRcdFx0XHRsZXQgdGV4dD1jb21wb3Nlci5uZXh0KHN0YXRlLnNwYWNlKTsvL3NwbGl0XHJcblx0XHRcdFx0XHRcdFx0bGV0IHNwbGl0dGVkPXNwbGl0UGllY2UocGllY2UsdGV4dClcclxuXHRcdFx0XHRcdFx0XHRwdXNoKHN0YXRlLHNwbGl0dGVkWzBdKVxyXG5cdFx0XHRcdFx0XHRcdGNvbW1pdChzdGF0ZSx0cnVlKVxyXG5cdFx0XHRcdFx0XHRcdGhhbmRsZVBpZWNlKHN0YXRlLHNwbGl0dGVkWzFdKVxyXG5cdFx0XHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdFx0XHRpZihwaWVjZS50eXBlLmFibGVFeGNlZWQoKSl7XHJcblx0XHRcdFx0XHRcdFx0XHRwdXNoKHN0YXRlLHBpZWNlKVxyXG5cdFx0XHRcdFx0XHRcdH1lbHNlIGlmKGxpbmUuY2FuU2VwZXJhdGVXaXRoKHBpZWNlKSl7XHJcblx0XHRcdFx0XHRcdFx0XHRjb21taXQoc3RhdGUsdHJ1ZSlcclxuXHRcdFx0XHRcdFx0XHRcdGhhbmRsZVBpZWNlKHN0YXRlLHBpZWNlKVxyXG5cdFx0XHRcdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0XHRcdFx0bGluZS5yb2xsYmFjayhwaWVjZSk7XHJcblx0XHRcdFx0XHRcdFx0XHRzdGF0ZS5zcGFjZT1wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKClcclxuXHRcdFx0XHRcdFx0XHRcdGhhbmRsZVBpZWNlKHN0YXRlLHBpZWNlKVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRcdGlmKHBpZWNlLnR5cGUuYWJsZUV4Y2VlZCgpKXtcclxuXHRcdFx0XHRcdFx0XHRwdXNoKHN0YXRlLHBpZWNlKVxyXG5cdFx0XHRcdFx0XHR9ZWxzZSBpZihsaW5lLmNhblNlcGVyYXRlV2l0aChwaWVjZSkpe1xyXG5cdFx0XHRcdFx0XHRcdGNvbW1pdChzdGF0ZSx0cnVlKVxyXG5cdFx0XHRcdFx0XHRcdGhhbmRsZVBpZWNlKHN0YXRlLHBpZWNlKVxyXG5cdFx0XHRcdFx0XHR9ZWxzZSBpZihsaW5lLmFsbENhbnRTZXBlcmF0ZVdpdGgocGllY2UpKXtcclxuXHRcdFx0XHRcdFx0XHRjb21wb3Nlci5jb21wb3NlZD1zdGF0ZS5lbmRcclxuXHRcdFx0XHRcdFx0XHRsZXQgdGV4dD1jb21wb3Nlci5uZXh0KHN0YXRlLnNwYWNlKTsvL3NwbGl0XHJcblx0XHRcdFx0XHRcdFx0bGV0IHNwbGl0dGVkPXNwbGl0UGllY2UocGllY2UsdGV4dClcclxuXHRcdFx0XHRcdFx0XHRwdXNoKHN0YXRlLHNwbGl0dGVkWzBdKVxyXG5cdFx0XHRcdFx0XHRcdGNvbW1pdChzdGF0ZSx0cnVlKVxyXG5cdFx0XHRcdFx0XHRcdGhhbmRsZVBpZWNlKHN0YXRlLHNwbGl0dGVkWzFdKVxyXG5cdFx0XHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdFx0XHRsaW5lLnJvbGxiYWNrKHBpZWNlKVxyXG5cdFx0XHRcdFx0XHRcdHN0YXRlLnNwYWNlPXBhcmVudC5uZXh0QXZhaWxhYmxlU3BhY2UoKVxyXG5cdFx0XHRcdFx0XHRcdGhhbmRsZVBpZWNlKHN0YXRlLHBpZWNlKVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRpZihwaWVjZS50eXBlLmFibGVFeGNlZWQoKSl7XHJcblx0XHRcdFx0XHRwdXNoKHN0YXRlLHBpZWNlKVxyXG5cdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0Y29tbWl0KHN0YXRlLHRydWUpXHJcblx0XHRcdFx0XHRoYW5kbGVQaWVjZShzdGF0ZSxwaWVjZSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHN0YXRlXHJcblx0XHR9LHtzcGFjZTpwYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKCksc3RhY2s6W10sY29udGVudFdpZHRoOjAsZW5kOjB9KVxyXG5cclxuXHRcdGNvbW1pdChzdGF0ZSlcclxuXHJcblx0XHRwYXJlbnQub24xQ2hpbGRDb21wb3NlZCh0aGlzKVxyXG5cdH1cclxuXHJcblx0Z2V0U3R5bGUoKXtcclxuXHRcdGNvbnN0IHtpbmhlcml0ZWRTdHlsZX09dGhpcy5jb250ZXh0XHJcblxyXG5cdFx0cmV0dXJuICdyRm9udHMsc3osY29sb3IsYixpLHZhbmlzaCcuc3BsaXQoXCIsXCIpLnJlZHVjZSgoc3R5bGUsIGtleSk9PntcclxuICAgICAgICAgICAgbGV0IHN0eWxlUGF0aD1gclByLiR7a2V5fWBcclxuXHRcdFx0bGV0IHZhbHVlPWluaGVyaXRlZFN0eWxlLmdldChzdHlsZVBhdGgpXHJcbiAgICAgICAgICAgIGlmKHZhbHVlIT11bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgc3R5bGVba2V5XT12YWx1ZVxyXG5cdFx0XHR9XHJcbiAgICAgICAgICAgIHJldHVybiBzdHlsZVxyXG4gICAgICAgIH0se30pXHJcblx0fVxyXG5cclxuXHRjcmVhdGVDb21wb3NlZDJQYXJlbnQocHJvcHMpe1xyXG5cdFx0cmV0dXJuIDxDb21wb3NlZFRleHQgey4uLnByb3BzfS8+XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcclxuXHRcdC4uLk5vQ2hpbGQuY29udGV4dFR5cGVzLFxyXG5cdFx0aW5oZXJpdGVkU3R5bGU6IFByb3BUeXBlcy5vYmplY3RcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBXb3JkV3JhcHBlcj1IdG1sV29yZFdyYXBwZXJcclxufVxyXG4iXX0=