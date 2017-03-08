"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

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

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Text = function (_NoChild) {
	_inherits(Text, _NoChild);

	function Text() {
		_classCallCheck(this, Text);

		return _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).apply(this, arguments));
	}

	_createClass(Text, [{
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
			return this.computed.pieces = [].concat(_toConsumableArray(this.getContent())).reduce(function (pieces, a, offset) {
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
					var text = _this2.createComposed2Parent(_extends({}, defaultStyle, { width: Math.floor(contentWidth), contentWidth: contentWidth, end: end, children: [].concat(_toConsumableArray(stack)) }));
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

				var first = _extends({}, piece, { chars: [].concat(_toConsumableArray(text.children)), width: text.width, end: end - piece.chars.length + text.children.length });
				var second = _extends({}, piece, { chars: chars.splice(text.children.length), width: width - text.width });
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
			return _get(Text.prototype.__proto__ || Object.getPrototypeOf(Text.prototype), "getStyle", this).call(this) || {
				rFonts: "arial",
				sz: 9,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250ZW50L3RleHQvaW5kZXguanMiXSwibmFtZXMiOlsiVGV4dCIsImNvbXBvc2VyIiwiY29uc3RydWN0b3IiLCJXb3JkV3JhcHBlciIsImNvbnRlbnQiLCJnZXRTdHlsZSIsImNvbXB1dGVkIiwicGllY2VzIiwibWFwIiwidHlwZSIsImNoYXJzIiwiZW5kIiwid2lkdGgiLCJjcmVhdGVFbGVtZW50Iiwia2V5IiwiZ2V0Q29udGVudCIsInJlZHVjZSIsImEiLCJvZmZzZXQiLCJsYXN0IiwibGVuZ3RoIiwicHVzaCIsInN0cmluZ1dpZHRoIiwiam9pbiIsInBhcmVudCIsImNvbnRleHQiLCJkZWZhdWx0U3R5bGUiLCJjb21taXQiLCJzdGF0ZSIsIm5lZWROZXdMaW5lIiwic3RhY2siLCJjb250ZW50V2lkdGgiLCJsaW5lIiwic3BhY2UiLCJjaGFuZ2VkIiwidGV4dCIsImNyZWF0ZUNvbXBvc2VkMlBhcmVudCIsIk1hdGgiLCJmbG9vciIsImNoaWxkcmVuIiwiYXBwZW5kQ29tcG9zZWQiLCJzcGxpY2UiLCJuZXh0QXZhaWxhYmxlU3BhY2UiLCJwaWVjZSIsImJMaW5lU3RhcnQiLCJzcGxpdFBpZWNlIiwiZmlyc3QiLCJzZWNvbmQiLCJoYW5kbGVQaWVjZSIsIl9wYXJzZVRleHQiLCJiRmlyc3RMaW5lIiwiY29tcG9zZWQiLCJuZXh0Iiwic3BsaXR0ZWQiLCJhYmxlRXhjZWVkIiwiY2FuU2VwZXJhdGVXaXRoIiwicm9sbGJhY2siLCJhbGxDYW50U2VwZXJhdGVXaXRoIiwib24xQ2hpbGRDb21wb3NlZCIsInJGb250cyIsInN6IiwiYiIsImkiLCJ2YW5pc2giLCJwcm9wcyIsImRpc3BsYXlOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEk7Ozs7Ozs7Ozs7OzJCQUdaO0FBQ1AsT0FBSUMsV0FBUyxJQUFJLEtBQUtDLFdB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fSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge05vQ2hpbGR9IGZyb20gXCIuLi9hbnlcIlxyXG5pbXBvcnQgSHRtbFdvcmRXcmFwcGVyIGZyb20gXCIuLi8uLi93b3Jkd3JhcC9odG1sXCJcclxuXHJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vLi4vY29tcG9zZWQvZ3JvdXBcIlxyXG5pbXBvcnQgQ29tcG9zZWRUZXh0IGZyb20gXCIuLi8uLi9jb21wb3NlZC90ZXh0XCJcclxuXHJcbmltcG9ydCB7Y2F0ZWdvcnl9IGZyb20gXCIuL2NoYXJzXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRleHQgZXh0ZW5kcyBOb0NoaWxke1xyXG5cdHN0YXRpYyBkaXNwbGF5TmFtZT1cInRleHRcIlxyXG5cclxuXHRyZW5kZXIoKXtcclxuXHRcdGxldCBjb21wb3Nlcj1uZXcgdGhpcy5jb25zdHJ1Y3Rvci5Xb3JkV3JhcHBlcihjb250ZW50LCB0aGlzLmdldFN0eWxlKCkpXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8aT5cclxuXHRcdFx0e1xyXG5cdFx0XHRcdHRoaXMuY29tcHV0ZWQucGllY2VzLm1hcCgoe3R5cGUsY2hhcnMsZW5kLHdpZHRofSk9PntcclxuXHRcdFx0XHRcdHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KHR5cGUsIHtjaGFycyxlbmQsd2lkdGgsa2V5OmVuZH0pXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fVxyXG5cdFx0XHQ8L2k+XHJcblx0XHQpXHJcblx0fVxyXG5cclxuXHRfcGFyc2VUZXh0KCl7XHJcblx0XHRsZXQgY29tcG9zZXI9bmV3IHRoaXMuY29uc3RydWN0b3IuV29yZFdyYXBwZXIoY29udGVudCwgdGhpcy5nZXRTdHlsZSgpKVxyXG5cdFx0cmV0dXJuIHRoaXMuY29tcHV0ZWQucGllY2VzPVsuLi50aGlzLmdldENvbnRlbnQoKV0ucmVkdWNlKChwaWVjZXMsYSwgb2Zmc2V0KT0+e1xyXG5cdFx0XHRsZXQgdHlwZT1jYXRlZ29yeShhKVxyXG5cdFx0XHRsZXQgbGFzdD1waWVjZXNbcGllY2VzLmxlbmd0aC0xXVxyXG5cdFx0XHRpZihsYXN0ICYmIGxhc3QudHlwZT09dHlwZSl7XHJcblx0XHRcdFx0bGFzdC5jaGFycy5wdXNoKGEpXHJcblx0XHRcdFx0bGFzdC5lbmQ9b2Zmc2V0XHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdHBpZWNlcy5wdXNoKHt0eXBlLGNoYXJzOlthXSxlbmQ6b2Zmc2V0fSlcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gcGllY2VzXHJcblx0XHR9LFtdKS5tYXAoYT0+e1xyXG5cdFx0XHRhLndpZHRoPWNvbXBvc2VyLnN0cmluZ1dpZHRoKGEuY2hhcnMuam9pbihcIlwiKSlcclxuXHRcdFx0cmV0dXJuIGFcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRjb21wb3NlKCl7XHJcblx0XHRsZXQgcGFyZW50PXRoaXMuY29udGV4dC5wYXJlbnRcclxuXHRcdGxldCBjb21wb3Nlcj1uZXcgdGhpcy5jb25zdHJ1Y3Rvci5Xb3JkV3JhcHBlcih0aGlzLmdldENvbnRlbnQoKSwgdGhpcy5nZXRTdHlsZSgpKVxyXG5cdFx0bGV0IGRlZmF1bHRTdHlsZT1jb21wb3Nlci5kZWZhdWx0U3R5bGVcclxuXHJcblx0XHRjb25zdCBjb21taXQ9KHN0YXRlLG5lZWROZXdMaW5lKT0+e1xyXG5cdFx0XHRsZXQge3N0YWNrLCBjb250ZW50V2lkdGgsZW5kLCBzcGFjZTp7bGluZX19PXN0YXRlXHJcblx0XHRcdGxldCBjaGFuZ2VkPWZhbHNlXHJcblx0XHRcdGlmKGNoYW5nZWQ9c3RhY2subGVuZ3RoKXtcclxuXHRcdFx0XHRsZXQgdGV4dD10aGlzLmNyZWF0ZUNvbXBvc2VkMlBhcmVudCh7Li4uZGVmYXVsdFN0eWxlLHdpZHRoOk1hdGguZmxvb3IoY29udGVudFdpZHRoKSxjb250ZW50V2lkdGgsZW5kLGNoaWxkcmVuOlsuLi5zdGFja119KVxyXG5cdFx0XHRcdHBhcmVudC5hcHBlbmRDb21wb3NlZCh0ZXh0KVxyXG5cdFx0XHRcdHN0YXRlLmNvbnRlbnRXaWR0aD0wXHJcblx0XHRcdFx0c3RhY2suc3BsaWNlKDAsc3RhY2subGVuZ3RoKVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZihuZWVkTmV3TGluZSlcclxuXHRcdFx0XHRsaW5lLmNvbW1pdCh0cnVlKVxyXG5cclxuXHRcdFx0aWYoY2hhbmdlZCB8fCBuZWVkTmV3TGluZSlcclxuXHRcdFx0XHRzdGF0ZS5zcGFjZT1wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKClcclxuXHJcblx0XHRcdHJldHVybiBzdGF0ZVxyXG5cdFx0fVxyXG5cclxuXHRcdGNvbnN0IHB1c2g9KHN0YXRlLHBpZWNlKT0+e1xyXG5cdFx0XHRzdGF0ZS5zdGFjay5wdXNoKHBpZWNlKVxyXG5cdFx0XHRzdGF0ZS5jb250ZW50V2lkdGgrPXBpZWNlLndpZHRoXHJcblx0XHRcdHN0YXRlLmVuZCs9cGllY2UuY2hhcnMubGVuZ3RoXHJcblx0XHRcdHN0YXRlLnNwYWNlLmJMaW5lU3RhcnQ9ZmFsc2VcclxuXHRcdH1cclxuXHJcblx0XHRjb25zdCBzcGxpdFBpZWNlPShwaWVjZSx0ZXh0KT0+e1xyXG5cdFx0XHRjb25zdCB7d2lkdGgsIGVuZCwgY2hhcnN9PXBpZWNlXHJcblx0XHRcdGxldCBmaXJzdD17Li4ucGllY2UsIGNoYXJzOiBbLi4udGV4dC5jaGlsZHJlbl0sIHdpZHRoOnRleHQud2lkdGgsZW5kOmVuZC1waWVjZS5jaGFycy5sZW5ndGgrdGV4dC5jaGlsZHJlbi5sZW5ndGh9XHJcblx0XHRcdGxldCBzZWNvbmQ9ey4uLnBpZWNlLCBjaGFyczogY2hhcnMuc3BsaWNlKHRleHQuY2hpbGRyZW4ubGVuZ3RoKSwgd2lkdGg6IHdpZHRoLXRleHQud2lkdGh9XHJcblx0XHRcdHJldHVybiBbZmlyc3Qsc2Vjb25kXVxyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBoYW5kbGVQaWVjZSwgc3RhdGU9dGhpcy5fcGFyc2VUZXh0KCkucmVkdWNlKGhhbmRsZVBpZWNlPShzdGF0ZSxwaWVjZSk9PntcclxuXHRcdFx0bGV0IHtzcGFjZTp7d2lkdGgsYkZpcnN0TGluZSxiTGluZVN0YXJ0LGxpbmV9LHN0YWNrLCBjb250ZW50V2lkdGh9PXN0YXRlXHJcblx0XHRcdGlmKHdpZHRoLWNvbnRlbnRXaWR0aD4wKXtcclxuXHRcdFx0XHRpZih3aWR0aC1jb250ZW50V2lkdGg+PXBpZWNlLndpZHRoKXsvL2xlZnQgc3BhY2UgaXMgYmlnZ2VyIGVub3VnaFxyXG5cdFx0XHRcdFx0cHVzaChzdGF0ZSxwaWVjZSlcclxuXHRcdFx0XHR9ZWxzZXsvL2xlZnQgc3BhY2UgaXMgbm90IGVub3VnaFxyXG5cdFx0XHRcdFx0KHtzcGFjZTp7d2lkdGgsYkZpcnN0TGluZSxiTGluZVN0YXJ0LGxpbmV9LHN0YWNrLCBjb250ZW50V2lkdGh9PWNvbW1pdChzdGF0ZSkpO1xyXG5cdFx0XHRcdFx0aWYoYkxpbmVTdGFydCl7XHJcblx0XHRcdFx0XHRcdGlmKGJGaXJzdExpbmUpe1xyXG5cdFx0XHRcdFx0XHRcdGNvbXBvc2VyLmNvbXBvc2VkPXN0YXRlLmVuZFxyXG5cdFx0XHRcdFx0XHRcdGxldCB0ZXh0PWNvbXBvc2VyLm5leHQoc3RhdGUuc3BhY2UpOy8vc3BsaXRcclxuXHRcdFx0XHRcdFx0XHRsZXQgc3BsaXR0ZWQ9c3BsaXRQaWVjZShwaWVjZSx0ZXh0KVxyXG5cdFx0XHRcdFx0XHRcdHB1c2goc3RhdGUsc3BsaXR0ZWRbMF0pXHJcblx0XHRcdFx0XHRcdFx0Y29tbWl0KHN0YXRlLHRydWUpXHJcblx0XHRcdFx0XHRcdFx0aGFuZGxlUGllY2Uoc3RhdGUsc3BsaXR0ZWRbMV0pXHJcblx0XHRcdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0XHRcdGlmKHBpZWNlLnR5cGUuYWJsZUV4Y2VlZCgpKXtcclxuXHRcdFx0XHRcdFx0XHRcdHB1c2goc3RhdGUscGllY2UpXHJcblx0XHRcdFx0XHRcdFx0fWVsc2UgaWYobGluZS5jYW5TZXBlcmF0ZVdpdGgocGllY2UpKXtcclxuXHRcdFx0XHRcdFx0XHRcdGNvbW1pdChzdGF0ZSx0cnVlKVxyXG5cdFx0XHRcdFx0XHRcdFx0aGFuZGxlUGllY2Uoc3RhdGUscGllY2UpXHJcblx0XHRcdFx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRcdFx0XHRsaW5lLnJvbGxiYWNrKHBpZWNlKTtcclxuXHRcdFx0XHRcdFx0XHRcdHN0YXRlLnNwYWNlPXBhcmVudC5uZXh0QXZhaWxhYmxlU3BhY2UoKVxyXG5cdFx0XHRcdFx0XHRcdFx0aGFuZGxlUGllY2Uoc3RhdGUscGllY2UpXHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdFx0aWYocGllY2UudHlwZS5hYmxlRXhjZWVkKCkpe1xyXG5cdFx0XHRcdFx0XHRcdHB1c2goc3RhdGUscGllY2UpXHJcblx0XHRcdFx0XHRcdH1lbHNlIGlmKGxpbmUuY2FuU2VwZXJhdGVXaXRoKHBpZWNlKSl7XHJcblx0XHRcdFx0XHRcdFx0Y29tbWl0KHN0YXRlLHRydWUpXHJcblx0XHRcdFx0XHRcdFx0aGFuZGxlUGllY2Uoc3RhdGUscGllY2UpXHJcblx0XHRcdFx0XHRcdH1lbHNlIGlmKGxpbmUuYWxsQ2FudFNlcGVyYXRlV2l0aChwaWVjZSkpe1xyXG5cdFx0XHRcdFx0XHRcdGNvbXBvc2VyLmNvbXBvc2VkPXN0YXRlLmVuZFxyXG5cdFx0XHRcdFx0XHRcdGxldCB0ZXh0PWNvbXBvc2VyLm5leHQoc3RhdGUuc3BhY2UpOy8vc3BsaXRcclxuXHRcdFx0XHRcdFx0XHRsZXQgc3BsaXR0ZWQ9c3BsaXRQaWVjZShwaWVjZSx0ZXh0KVxyXG5cdFx0XHRcdFx0XHRcdHB1c2goc3RhdGUsc3BsaXR0ZWRbMF0pXHJcblx0XHRcdFx0XHRcdFx0Y29tbWl0KHN0YXRlLHRydWUpXHJcblx0XHRcdFx0XHRcdFx0aGFuZGxlUGllY2Uoc3RhdGUsc3BsaXR0ZWRbMV0pXHJcblx0XHRcdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0XHRcdGxpbmUucm9sbGJhY2socGllY2UpXHJcblx0XHRcdFx0XHRcdFx0c3RhdGUuc3BhY2U9cGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZSgpXHJcblx0XHRcdFx0XHRcdFx0aGFuZGxlUGllY2Uoc3RhdGUscGllY2UpXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdGlmKHBpZWNlLnR5cGUuYWJsZUV4Y2VlZCgpKXtcclxuXHRcdFx0XHRcdHB1c2goc3RhdGUscGllY2UpXHJcblx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRjb21taXQoc3RhdGUsdHJ1ZSlcclxuXHRcdFx0XHRcdGhhbmRsZVBpZWNlKHN0YXRlLHBpZWNlKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gc3RhdGVcclxuXHRcdH0se3NwYWNlOnBhcmVudC5uZXh0QXZhaWxhYmxlU3BhY2UoKSxzdGFjazpbXSxjb250ZW50V2lkdGg6MCxlbmQ6MH0pXHJcblxyXG5cdFx0Y29tbWl0KHN0YXRlKVxyXG5cclxuXHRcdHBhcmVudC5vbjFDaGlsZENvbXBvc2VkKHRoaXMpXHJcblx0fVxyXG5cclxuXHRnZXRTdHlsZSgpe1xyXG5cdFx0cmV0dXJuIHN1cGVyLmdldFN0eWxlKCl8fHtcclxuXHRcdFx0ckZvbnRzOlwiYXJpYWxcIlxyXG5cdFx0XHQsc3o6OVxyXG5cdFx0XHQsYjpmYWxzZVxyXG5cdFx0XHQsaTpmYWxzZVxyXG5cdFx0XHQsdmFuaXNoOmZhbHNlXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRjcmVhdGVDb21wb3NlZDJQYXJlbnQocHJvcHMpe1xyXG5cdFx0cmV0dXJuIDxDb21wb3NlZFRleHQgey4uLnByb3BzfS8+XHJcblx0fVxyXG5cclxuXHJcblx0c3RhdGljIFdvcmRXcmFwcGVyPUh0bWxXb3JkV3JhcHBlclxyXG59XHJcbiJdfQ==