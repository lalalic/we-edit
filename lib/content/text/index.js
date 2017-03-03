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

var _get2 = require("babel-runtime/helpers/get");

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _any = require("../any");

var _html = require("../../wordwrap/html");

var _html2 = _interopRequireDefault(_html);

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
			return (0, _get3.default)(Text.prototype.__proto__ || (0, _getPrototypeOf2.default)(Text.prototype), "getStyle", this).call(this) || {
				rFonts: "arial",
				sz: "9pt",
				b: false,
				i: false,
				vanish: false
			};
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
Text.WordWrapper = _html2.default;
exports.default = Text;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250ZW50L3RleHQvaW5kZXguanMiXSwibmFtZXMiOlsiVGV4dCIsImNvbXBvc2VyIiwiY29uc3RydWN0b3IiLCJXb3JkV3JhcHBlciIsImNvbnRlbnQiLCJnZXRTdHlsZSIsImNvbXB1dGVkIiwicGllY2VzIiwibWFwIiwidHlwZSIsImNoYXJzIiwiZW5kIiwid2lkdGgiLCJjcmVhdGVFbGVtZW50Iiwia2V5IiwiZ2V0Q29udGVudCIsInJlZHVjZSIsImEiLCJvZmZzZXQiLCJsYXN0IiwibGVuZ3RoIiwicHVzaCIsInN0cmluZ1dpZHRoIiwiam9pbiIsInBhcmVudCIsImNvbnRleHQiLCJkZWZhdWx0U3R5bGUiLCJjb21taXQiLCJzdGF0ZSIsIm5lZWROZXdMaW5lIiwic3RhY2siLCJjb250ZW50V2lkdGgiLCJsaW5lIiwic3BhY2UiLCJjaGFuZ2VkIiwidGV4dCIsImNyZWF0ZUNvbXBvc2VkMlBhcmVudCIsIk1hdGgiLCJmbG9vciIsImNoaWxkcmVuIiwiYXBwZW5kQ29tcG9zZWQiLCJzcGxpY2UiLCJuZXh0QXZhaWxhYmxlU3BhY2UiLCJwaWVjZSIsImJMaW5lU3RhcnQiLCJzcGxpdFBpZWNlIiwiZmlyc3QiLCJzZWNvbmQiLCJoYW5kbGVQaWVjZSIsIl9wYXJzZVRleHQiLCJiRmlyc3RMaW5lIiwiY29tcG9zZWQiLCJuZXh0Iiwic3BsaXR0ZWQiLCJhYmxlRXhjZWVkIiwiY2FuU2VwZXJhdGVXaXRoIiwicm9sbGJhY2siLCJhbGxDYW50U2VwZXJhdGVXaXRoIiwib24xQ2hpbGRDb21wb3NlZCIsInJGb250cyIsInN6IiwiYiIsImkiLCJ2YW5pc2giLCJwcm9wcyIsImRpc3BsYXlOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBRUE7Ozs7SUFFcUJBLEk7Ozs7Ozs7Ozs7MkJBR1o7QUFDUCxPQUFJQyxX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cG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7Tm9DaGlsZH0gZnJvbSBcIi4uL2FueVwiXHJcbmltcG9ydCBIdG1sV29yZFdyYXBwZXIgZnJvbSBcIi4uLy4uL3dvcmR3cmFwL2h0bWxcIlxyXG5cclxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi8uLi9jb21wb3NlZC9ncm91cFwiXHJcbmltcG9ydCBDb21wb3NlZFRleHQgZnJvbSBcIi4uLy4uL2NvbXBvc2VkL3RleHRcIlxyXG5cclxuaW1wb3J0IHtjYXRlZ29yeX0gZnJvbSBcIi4vY2hhcnNcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dCBleHRlbmRzIE5vQ2hpbGR7XHJcblx0c3RhdGljIGRpc3BsYXlOYW1lPVwidGV4dFwiXHJcblxyXG5cdHJlbmRlcigpe1xyXG5cdFx0bGV0IGNvbXBvc2VyPW5ldyB0aGlzLmNvbnN0cnVjdG9yLldvcmRXcmFwcGVyKGNvbnRlbnQsIHRoaXMuZ2V0U3R5bGUoKSlcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxpPlxyXG5cdFx0XHR7XHJcblx0XHRcdFx0dGhpcy5jb21wdXRlZC5waWVjZXMubWFwKCh7dHlwZSxjaGFycyxlbmQsd2lkdGh9KT0+e1xyXG5cdFx0XHRcdFx0cmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQodHlwZSwge2NoYXJzLGVuZCx3aWR0aCxrZXk6ZW5kfSlcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9XHJcblx0XHRcdDwvaT5cclxuXHRcdClcclxuXHR9XHJcblxyXG5cdF9wYXJzZVRleHQoKXtcclxuXHRcdGxldCBjb21wb3Nlcj1uZXcgdGhpcy5jb25zdHJ1Y3Rvci5Xb3JkV3JhcHBlcihjb250ZW50LCB0aGlzLmdldFN0eWxlKCkpXHJcblx0XHRyZXR1cm4gdGhpcy5jb21wdXRlZC5waWVjZXM9Wy4uLnRoaXMuZ2V0Q29udGVudCgpXS5yZWR1Y2UoKHBpZWNlcyxhLCBvZmZzZXQpPT57XHJcblx0XHRcdGxldCB0eXBlPWNhdGVnb3J5KGEpXHJcblx0XHRcdGxldCBsYXN0PXBpZWNlc1twaWVjZXMubGVuZ3RoLTFdXHJcblx0XHRcdGlmKGxhc3QgJiYgbGFzdC50eXBlPT10eXBlKXtcclxuXHRcdFx0XHRsYXN0LmNoYXJzLnB1c2goYSlcclxuXHRcdFx0XHRsYXN0LmVuZD1vZmZzZXRcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0cGllY2VzLnB1c2goe3R5cGUsY2hhcnM6W2FdLGVuZDpvZmZzZXR9KVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBwaWVjZXNcclxuXHRcdH0sW10pLm1hcChhPT57XHJcblx0XHRcdGEud2lkdGg9Y29tcG9zZXIuc3RyaW5nV2lkdGgoYS5jaGFycy5qb2luKFwiXCIpKVxyXG5cdFx0XHRyZXR1cm4gYVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdGNvbXBvc2UoKXtcclxuXHRcdGxldCBwYXJlbnQ9dGhpcy5jb250ZXh0LnBhcmVudFxyXG5cdFx0bGV0IGNvbXBvc2VyPW5ldyB0aGlzLmNvbnN0cnVjdG9yLldvcmRXcmFwcGVyKHRoaXMuZ2V0Q29udGVudCgpLCB0aGlzLmdldFN0eWxlKCkpXHJcblx0XHRsZXQgZGVmYXVsdFN0eWxlPWNvbXBvc2VyLmRlZmF1bHRTdHlsZVxyXG5cclxuXHRcdGNvbnN0IGNvbW1pdD0oc3RhdGUsbmVlZE5ld0xpbmUpPT57XHJcblx0XHRcdGxldCB7c3RhY2ssIGNvbnRlbnRXaWR0aCxlbmQsIHNwYWNlOntsaW5lfX09c3RhdGVcclxuXHRcdFx0bGV0IGNoYW5nZWQ9ZmFsc2VcclxuXHRcdFx0aWYoY2hhbmdlZD1zdGFjay5sZW5ndGgpe1xyXG5cdFx0XHRcdGxldCB0ZXh0PXRoaXMuY3JlYXRlQ29tcG9zZWQyUGFyZW50KHsuLi5kZWZhdWx0U3R5bGUsd2lkdGg6TWF0aC5mbG9vcihjb250ZW50V2lkdGgpLGNvbnRlbnRXaWR0aCxlbmQsY2hpbGRyZW46Wy4uLnN0YWNrXX0pXHJcblx0XHRcdFx0cGFyZW50LmFwcGVuZENvbXBvc2VkKHRleHQpXHJcblx0XHRcdFx0c3RhdGUuY29udGVudFdpZHRoPTBcclxuXHRcdFx0XHRzdGFjay5zcGxpY2UoMCxzdGFjay5sZW5ndGgpXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmKG5lZWROZXdMaW5lKVxyXG5cdFx0XHRcdGxpbmUuY29tbWl0KHRydWUpXHJcblxyXG5cdFx0XHRpZihjaGFuZ2VkIHx8IG5lZWROZXdMaW5lKVxyXG5cdFx0XHRcdHN0YXRlLnNwYWNlPXBhcmVudC5uZXh0QXZhaWxhYmxlU3BhY2UoKVxyXG5cclxuXHRcdFx0cmV0dXJuIHN0YXRlXHJcblx0XHR9XHJcblxyXG5cdFx0Y29uc3QgcHVzaD0oc3RhdGUscGllY2UpPT57XHJcblx0XHRcdHN0YXRlLnN0YWNrLnB1c2gocGllY2UpXHJcblx0XHRcdHN0YXRlLmNvbnRlbnRXaWR0aCs9cGllY2Uud2lkdGhcclxuXHRcdFx0c3RhdGUuZW5kKz1waWVjZS5jaGFycy5sZW5ndGhcclxuXHRcdFx0c3RhdGUuc3BhY2UuYkxpbmVTdGFydD1mYWxzZVxyXG5cdFx0fVxyXG5cclxuXHRcdGNvbnN0IHNwbGl0UGllY2U9KHBpZWNlLHRleHQpPT57XHJcblx0XHRcdGNvbnN0IHt3aWR0aCwgZW5kLCBjaGFyc309cGllY2VcclxuXHRcdFx0bGV0IGZpcnN0PXsuLi5waWVjZSwgY2hhcnM6IFsuLi50ZXh0LmNoaWxkcmVuXSwgd2lkdGg6dGV4dC53aWR0aCxlbmQ6ZW5kLXBpZWNlLmNoYXJzLmxlbmd0aCt0ZXh0LmNoaWxkcmVuLmxlbmd0aH1cclxuXHRcdFx0bGV0IHNlY29uZD17Li4ucGllY2UsIGNoYXJzOiBjaGFycy5zcGxpY2UodGV4dC5jaGlsZHJlbi5sZW5ndGgpLCB3aWR0aDogd2lkdGgtdGV4dC53aWR0aH1cclxuXHRcdFx0cmV0dXJuIFtmaXJzdCxzZWNvbmRdXHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGhhbmRsZVBpZWNlLCBzdGF0ZT10aGlzLl9wYXJzZVRleHQoKS5yZWR1Y2UoaGFuZGxlUGllY2U9KHN0YXRlLHBpZWNlKT0+e1xyXG5cdFx0XHRsZXQge3NwYWNlOnt3aWR0aCxiRmlyc3RMaW5lLGJMaW5lU3RhcnQsbGluZX0sc3RhY2ssIGNvbnRlbnRXaWR0aH09c3RhdGVcclxuXHRcdFx0aWYod2lkdGgtY29udGVudFdpZHRoPjApe1xyXG5cdFx0XHRcdGlmKHdpZHRoLWNvbnRlbnRXaWR0aD49cGllY2Uud2lkdGgpey8vbGVmdCBzcGFjZSBpcyBiaWdnZXIgZW5vdWdoXHJcblx0XHRcdFx0XHRwdXNoKHN0YXRlLHBpZWNlKVxyXG5cdFx0XHRcdH1lbHNley8vbGVmdCBzcGFjZSBpcyBub3QgZW5vdWdoXHJcblx0XHRcdFx0XHQoe3NwYWNlOnt3aWR0aCxiRmlyc3RMaW5lLGJMaW5lU3RhcnQsbGluZX0sc3RhY2ssIGNvbnRlbnRXaWR0aH09Y29tbWl0KHN0YXRlKSk7XHJcblx0XHRcdFx0XHRpZihiTGluZVN0YXJ0KXtcclxuXHRcdFx0XHRcdFx0aWYoYkZpcnN0TGluZSl7XHJcblx0XHRcdFx0XHRcdFx0Y29tcG9zZXIuY29tcG9zZWQ9c3RhdGUuZW5kXHJcblx0XHRcdFx0XHRcdFx0bGV0IHRleHQ9Y29tcG9zZXIubmV4dChzdGF0ZS5zcGFjZSk7Ly9zcGxpdFxyXG5cdFx0XHRcdFx0XHRcdGxldCBzcGxpdHRlZD1zcGxpdFBpZWNlKHBpZWNlLHRleHQpXHJcblx0XHRcdFx0XHRcdFx0cHVzaChzdGF0ZSxzcGxpdHRlZFswXSlcclxuXHRcdFx0XHRcdFx0XHRjb21taXQoc3RhdGUsdHJ1ZSlcclxuXHRcdFx0XHRcdFx0XHRoYW5kbGVQaWVjZShzdGF0ZSxzcGxpdHRlZFsxXSlcclxuXHRcdFx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRcdFx0aWYocGllY2UudHlwZS5hYmxlRXhjZWVkKCkpe1xyXG5cdFx0XHRcdFx0XHRcdFx0cHVzaChzdGF0ZSxwaWVjZSlcclxuXHRcdFx0XHRcdFx0XHR9ZWxzZSBpZihsaW5lLmNhblNlcGVyYXRlV2l0aChwaWVjZSkpe1xyXG5cdFx0XHRcdFx0XHRcdFx0Y29tbWl0KHN0YXRlLHRydWUpXHJcblx0XHRcdFx0XHRcdFx0XHRoYW5kbGVQaWVjZShzdGF0ZSxwaWVjZSlcclxuXHRcdFx0XHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdFx0XHRcdGxpbmUucm9sbGJhY2socGllY2UpO1xyXG5cdFx0XHRcdFx0XHRcdFx0c3RhdGUuc3BhY2U9cGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZSgpXHJcblx0XHRcdFx0XHRcdFx0XHRoYW5kbGVQaWVjZShzdGF0ZSxwaWVjZSlcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0XHRpZihwaWVjZS50eXBlLmFibGVFeGNlZWQoKSl7XHJcblx0XHRcdFx0XHRcdFx0cHVzaChzdGF0ZSxwaWVjZSlcclxuXHRcdFx0XHRcdFx0fWVsc2UgaWYobGluZS5jYW5TZXBlcmF0ZVdpdGgocGllY2UpKXtcclxuXHRcdFx0XHRcdFx0XHRjb21taXQoc3RhdGUsdHJ1ZSlcclxuXHRcdFx0XHRcdFx0XHRoYW5kbGVQaWVjZShzdGF0ZSxwaWVjZSlcclxuXHRcdFx0XHRcdFx0fWVsc2UgaWYobGluZS5hbGxDYW50U2VwZXJhdGVXaXRoKHBpZWNlKSl7XHJcblx0XHRcdFx0XHRcdFx0Y29tcG9zZXIuY29tcG9zZWQ9c3RhdGUuZW5kXHJcblx0XHRcdFx0XHRcdFx0bGV0IHRleHQ9Y29tcG9zZXIubmV4dChzdGF0ZS5zcGFjZSk7Ly9zcGxpdFxyXG5cdFx0XHRcdFx0XHRcdGxldCBzcGxpdHRlZD1zcGxpdFBpZWNlKHBpZWNlLHRleHQpXHJcblx0XHRcdFx0XHRcdFx0cHVzaChzdGF0ZSxzcGxpdHRlZFswXSlcclxuXHRcdFx0XHRcdFx0XHRjb21taXQoc3RhdGUsdHJ1ZSlcclxuXHRcdFx0XHRcdFx0XHRoYW5kbGVQaWVjZShzdGF0ZSxzcGxpdHRlZFsxXSlcclxuXHRcdFx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRcdFx0bGluZS5yb2xsYmFjayhwaWVjZSlcclxuXHRcdFx0XHRcdFx0XHRzdGF0ZS5zcGFjZT1wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKClcclxuXHRcdFx0XHRcdFx0XHRoYW5kbGVQaWVjZShzdGF0ZSxwaWVjZSlcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0aWYocGllY2UudHlwZS5hYmxlRXhjZWVkKCkpe1xyXG5cdFx0XHRcdFx0cHVzaChzdGF0ZSxwaWVjZSlcclxuXHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdGNvbW1pdChzdGF0ZSx0cnVlKVxyXG5cdFx0XHRcdFx0aGFuZGxlUGllY2Uoc3RhdGUscGllY2UpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBzdGF0ZVxyXG5cdFx0fSx7c3BhY2U6cGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZSgpLHN0YWNrOltdLGNvbnRlbnRXaWR0aDowLGVuZDowfSlcclxuXHJcblx0XHRjb21taXQoc3RhdGUpXHJcblxyXG5cdFx0cGFyZW50Lm9uMUNoaWxkQ29tcG9zZWQodGhpcylcclxuXHR9XHJcblxyXG5cdGdldFN0eWxlKCl7XHJcblx0XHRyZXR1cm4gc3VwZXIuZ2V0U3R5bGUoKXx8e1xyXG5cdFx0XHRyRm9udHM6XCJhcmlhbFwiXHJcblx0XHRcdCxzejpcIjlwdFwiXHJcblx0XHRcdCxiOmZhbHNlXHJcblx0XHRcdCxpOmZhbHNlXHJcblx0XHRcdCx2YW5pc2g6ZmFsc2VcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGNyZWF0ZUNvbXBvc2VkMlBhcmVudChwcm9wcyl7XHJcblx0XHRyZXR1cm4gPENvbXBvc2VkVGV4dCB7Li4ucHJvcHN9Lz5cclxuXHR9XHJcblxyXG5cclxuXHRzdGF0aWMgV29yZFdyYXBwZXI9SHRtbFdvcmRXcmFwcGVyXHJcbn1cclxuIl19