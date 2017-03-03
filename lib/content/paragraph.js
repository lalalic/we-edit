"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _any = require("./any");

var _any2 = _interopRequireDefault(_any);

var _group = require("../composed/group");

var _group2 = _interopRequireDefault(_group);

var _line = require("../composed/line");

var _line2 = _interopRequireDefault(_line);

var _text = require("../composed/text");

var _text2 = _interopRequireDefault(_text);

var _inline = require("./inline");

var _inline2 = _interopRequireDefault(_inline);

var _text3 = require("./text");

var _text4 = _interopRequireDefault(_text3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Paragraph = function (_Any) {
	_inherits(Paragraph, _Any);

	function Paragraph() {
		_classCallCheck(this, Paragraph);

		return _possibleConstructorReturn(this, (Paragraph.__proto__ || Object.getPrototypeOf(Paragraph)).apply(this, arguments));
	}

	_createClass(Paragraph, [{
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"p",
				null,
				this.getContent()
			);
		}
	}, {
		key: "getContent",
		value: function getContent() {
			if (_react2.default.Children.count(this.props.children) == 0) {
				this.getContentCount = function (a) {
					return 1;
				};
				return _react2.default.createElement(
					_inline2.default,
					null,
					_react2.default.createElement(
						_text4.default,
						null,
						" "
					)
				);
			}
			return _get(Paragraph.prototype.__proto__ || Object.getPrototypeOf(Paragraph.prototype), "getContent", this).call(this);
		}
	}, {
		key: "isEmpty",
		value: function isEmpty() {
			return false;
		}
	}, {
		key: "_newLine",
		value: function _newLine() {
			return new LineInfo(this.lineWidth(), this);
		}
	}, {
		key: "lineWidth",
		value: function lineWidth() {
			var _getStyle = this.getStyle(),
			    _getStyle$indent = _getStyle.indent,
			    _getStyle$indent$left = _getStyle$indent.left,
			    left = _getStyle$indent$left === undefined ? 0 : _getStyle$indent$left,
			    _getStyle$indent$righ = _getStyle$indent.right,
			    right = _getStyle$indent$righ === undefined ? 0 : _getStyle$indent$righ,
			    _getStyle$indent$firs = _getStyle$indent.firstLine,
			    firstLine = _getStyle$indent$firs === undefined ? 0 : _getStyle$indent$firs,
			    _getStyle$indent$hang = _getStyle$indent.hanging,
			    hanging = _getStyle$indent$hang === undefined ? 0 : _getStyle$indent$hang;

			var width = this.availableSpace.width;

			width -= left + right;
			if (this.computed.composed.length == 0) width -= firstLine;else width -= hanging;
			return width;
		}
	}, {
		key: "nextAvailableSpace",
		value: function nextAvailableSpace() {
			var required = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			var _required$width = required.width,
			    minRequiredW = _required$width === undefined ? Number.MIN_VALUE : _required$width,
			    _required$height = required.height,
			    minRequiredH = _required$height === undefined ? Number.MIN_VALUE : _required$height,
			    _required$splitable = required.splitable,
			    splitable = _required$splitable === undefined ? true : _required$splitable;
			var composed = this.computed.composed;

			if (0 == composed.length) {
				var _context$parent$nextA = this.context.parent.nextAvailableSpace(required),
				    _width = _context$parent$nextA.width,
				    height = _context$parent$nextA.height;

				this.availableSpace = { width: _width, height: height };
				composed.push(this._newLine());
			}
			var currentLine = composed[composed.length - 1];

			var width = currentLine.width,
			    availableWidth = currentLine.availableWidth;

			if (availableWidth < minRequiredW || this.availableSpace.height < minRequiredH) {
				if (this.availableSpace.height < minRequiredH) this.availableSpace = this.context.parent.nextAvailableSpace(required);

				availableWidth = this.lineWidth();
			}
			return {
				width: availableWidth,
				height: this.availableSpace.height,
				bFirstLine: composed.length < 2,
				bLineStart: availableWidth == this.availableSpace.width,
				line: currentLine
			};
		}
	}, {
		key: "appendComposed",
		value: function appendComposed(content) {
			//@TODO: need consider availableSpace.height
			var composed = this.computed.composed;
			var parent = this.context.parent;


			var currentLine = composed[composed.length - 1];
			var availableWidth = currentLine.availableWidth;
			var contentWidth = content.props.width;


			if (availableWidth >= contentWidth) {
				currentLine.children.push(content);
			} else if (availableWidth < contentWidth) {
				if (content.type.ableExceed && content.type.ableExceed(content.props.children)) {
					currentLine.children.push(content);
				} else {
					this.commitCurrentLine(true);
					this.appendComposed(content);
				}
			}
		}
	}, {
		key: "commitCurrentLine",
		value: function commitCurrentLine() {
			var needNewLine = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
			var composed = this.computed.composed;
			var parent = this.context.parent;

			var currentLine = composed[composed.length - 1];

			parent.appendComposed(this.createComposed2Parent(currentLine));

			if (needNewLine) composed.push(this._newLine());
		}
	}, {
		key: "onAllChildrenComposed",
		value: function onAllChildrenComposed() {
			//need append last non-full-width line to parent
			this.commitCurrentLine();

			this.availableSpace = { width: 0, height: 0 };

			_get(Paragraph.prototype.__proto__ || Object.getPrototypeOf(Paragraph.prototype), "onAllChildrenComposed", this).call(this);
		}
	}, {
		key: "createComposed2Parent",
		value: function createComposed2Parent(props) {
			var height = props.height,
			    width = props.width,
			    paragraph = props.paragraph,
			    others = _objectWithoutProperties(props, ["height", "width", "paragraph"]);

			var _getStyle2 = this.getStyle(),
			    _getStyle2$spacing = _getStyle2.spacing,
			    _getStyle2$spacing$li = _getStyle2$spacing.lineHeight,
			    lineHeight = _getStyle2$spacing$li === undefined ? "100%" : _getStyle2$spacing$li,
			    _getStyle2$spacing$to = _getStyle2$spacing.top,
			    top = _getStyle2$spacing$to === undefined ? 0 : _getStyle2$spacing$to,
			    _getStyle2$spacing$bo = _getStyle2$spacing.bottom,
			    bottom = _getStyle2$spacing$bo === undefined ? 0 : _getStyle2$spacing$bo,
			    _getStyle2$indent = _getStyle2.indent,
			    _getStyle2$indent$lef = _getStyle2$indent.left,
			    left = _getStyle2$indent$lef === undefined ? 0 : _getStyle2$indent$lef,
			    _getStyle2$indent$rig = _getStyle2$indent.right,
			    right = _getStyle2$indent$rig === undefined ? 0 : _getStyle2$indent$rig,
			    _getStyle2$indent$fir = _getStyle2$indent.firstLine,
			    firstLine = _getStyle2$indent$fir === undefined ? 0 : _getStyle2$indent$fir,
			    _getStyle2$indent$han = _getStyle2$indent.hanging,
			    hanging = _getStyle2$indent$han === undefined ? 0 : _getStyle2$indent$han;

			var contentY = 0,
			    contentX = left;

			lineHeight = typeof lineHeight == 'string' ? Math.ceil(height * parseInt(lineHeight) / 100.0) : lineHeight;

			if (this.computed.composed.length == 1) {
				//first line
				lineHeight += top;
				contentY += top;
				contentX += firstLine;
			} else {
				contentX += hanging;
			}

			if (this.isAllChildrenComposed()) {
				//last line
				lineHeight += bottom;
			}

			this.availableSpace.height -= lineHeight;

			return _react2.default.createElement(
				_group2.default,
				{ height: lineHeight, width: width },
				_react2.default.createElement(
					_group2.default,
					{ x: contentX, y: contentY },
					_react2.default.createElement(_line2.default, _extends({ width: width, height: height }, others))
				)
			);
		}
	}, {
		key: "getStyle",
		value: function getStyle() {
			return _get(Paragraph.prototype.__proto__ || Object.getPrototypeOf(Paragraph.prototype), "getStyle", this).call(this) || {
				spacing: {
					lineHeight: "100%",
					top: 0,
					bottom: 0
				},
				indent: {
					left: 0,
					right: 0,
					firstLine: 0,
					hanging: 0
				}
			};
		}
	}]);

	return Paragraph;
}(_any2.default);

Paragraph.displayName = "paragraph";
exports.default = Paragraph;

var LineInfo = function () {
	function LineInfo(width, p) {
		_classCallCheck(this, LineInfo);

		this.paragraph = p;
		this.width = width;
		this.children = [];
	}

	_createClass(LineInfo, [{
		key: "rollback",
		value: function rollback(_ref) {
			var _this2 = this;

			var type = _ref.type;

			var removed = [];
			for (var i = this.children.length - 1; i > -1; i--) {
				var text = this.children[i];
				if (text.type != _text2.default) break;
				var _text$props = text.props,
				    width = _text$props.width,
				    pieces = _text$props.children;


				var j = pieces.length - 1;
				for (; j > -1; j--) {
					var chars = pieces[j];
					if (chars.type != type) {
						break;
					}
				}

				if (j == -1) {
					removed.unshift(this.children.pop());
					continue;
				} else if (j == pieces.length - 1) {
					break;
				} else {
					var removedPieces = pieces.splice(j);
					this.children[i] = _react2.default.cloneElement(text, { children: pieces, width: pieces.reduce(function (w, _ref2) {
							var width = _ref2.width;
							return w + width;
						}, 0) });
					removed.unshift(_react2.default.cloneElement(text, { children: removedPieces, width: removedPieces.reduce(function (w, _ref3) {
							var width = _ref3.width;
							return w + width;
						}, 0) }));
					break;
				}
			}

			this.paragraph.commitCurrentLine(true);

			removed.map(function (a) {
				return _this2.paragraph.appendComposed(a);
			});
		}
	}, {
		key: "commit",
		value: function commit(needNewLine) {
			this.paragraph.commitCurrentLine(needNewLine);
		}
	}, {
		key: "canSeperateWith",
		value: function canSeperateWith(_ref4) {
			var type = _ref4.type;

			if (this.children.length == 0) return true;

			var text = this.children[this.children.length - 1];
			var pieces = text.props.children;
			var lastPiece = pieces[pieces.length - 1];
			return type.canSeperateWith && type.canSeperateWith(lastPiece.type);
		}
	}, {
		key: "allCantSeperateWith",
		value: function allCantSeperateWith(_ref5) {
			var type = _ref5.type;

			return this.children.reduce(function (cantSeperate, text) {
				if (!cantSeperate) return false;

				return text.props.children.reduce(function (state, a) {
					if (!state) return false;
					return !type.canSeperateWith || !type.canSeperateWith(a.type);
				}, true);
			}, true);
		}
	}, {
		key: "height",
		get: function get() {
			return this.children.reduce(function (h, _ref6) {
				var height = _ref6.props.height;
				return Math.max(h, height);
			}, 0);
		}
	}, {
		key: "availableWidth",
		get: function get() {
			return this.children.reduce(function (w, _ref7) {
				var width = _ref7.props.width;
				return w - width;
			}, this.width);
		}
	}]);

	return LineInfo;
}();

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3BhcmFncmFwaC5qcyJdLCJuYW1lcyI6WyJQYXJhZ3JhcGgiLCJnZXRDb250ZW50IiwiQ2hpbGRyZW4iLCJjb3VudCIsInByb3BzIiwiY2hpbGRyZW4iLCJnZXRDb250ZW50Q291bnQiLCJMaW5lSW5mbyIsImxpbmVXaWR0aCIsImdldFN0eWxlIiwiaW5kZW50IiwibGVmdCIsInJpZ2h0IiwiZmlyc3RMaW5lIiwiaGFuZ2luZyIsIndpZHRoIiwiYXZhaWxhYmxlU3BhY2UiLCJjb21wdXRlZCIsImNvbXBvc2VkIiwibGVuZ3RoIiwicmVxdWlyZWQiLCJtaW5SZXF1aXJlZFciLCJOdW1iZXIiLCJNSU5fVkFMVUUiLCJoZWlnaHQiLCJtaW5SZXF1aXJlZEgiLCJzcGxpdGFibGUiLCJjb250ZXh0IiwicGFyZW50IiwibmV4dEF2YWlsYWJsZVNwYWNlIiwicHVzaCIsIl9uZXdMaW5lIiwiY3VycmVudExpbmUiLCJhdmFpbGFibGVXaWR0aCIsImJGaXJzdExpbmUiLCJiTGluZVN0YXJ0IiwibGluZSIsImNvbnRlbnQiLCJjb250ZW50V2lkdGgiLCJ0eXBlIiwiYWJsZUV4Y2VlZCIsImNvbW1pdEN1cnJlbnRMaW5lIiwiYXBwZW5kQ29tcG9zZWQiLCJuZWVkTmV3TGluZSIsImNyZWF0ZUNvbXBvc2VkMlBhcmVudCIsInBhcmFncmFwaCIsIm90aGVycyIsInNwYWNpbmciLCJsaW5lSGVpZ2h0IiwidG9wIiwiYm90dG9tIiwiY29udGVudFkiLCJjb250ZW50WCIsIk1hdGgiLCJjZWlsIiwicGFyc2VJbnQiLCJpc0FsbENoaWxkcmVuQ29tcG9zZWQiLCJkaXNwbGF5TmFtZSIsInAiLCJyZW1vdmVkIiwiaSIsInRleHQiLCJwaWVjZXMiLCJqIiwiY2hhcnMiLCJ1bnNoaWZ0IiwicG9wIiwicmVtb3ZlZFBpZWNlcyIsInNwbGljZSIsImNsb25lRWxlbWVudCIsInJlZHVjZSIsInciLCJtYXAiLCJhIiwibGFzdFBpZWNlIiwiY2FuU2VwZXJh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QVVuQyxJQUEvQixDQUEvQjtBQUNBOzs7NkNBRTBCO0FBQUEsT0FBTkEsSUFBTSxTQUFOQSxJQUFNOztBQUMxQixVQUFPLEtBQUtsQyxRQUFMLENBQWNpRSxNQUFkLENBQXFCLFVBQUNNLFlBQUQsRUFBY2YsSUFBZCxFQUFxQjtBQUNoRCxRQUFHLENBQUNlLFlBQUosRUFDQyxPQUFPLEtBQVA7O0FBRUQsV0FBT2YsS0FBS3pELEtBQUwsQ0FBV0MsUUFBWCxDQUFvQmlFLE1BQXBCLENBQTJCLFVBQUNPLEtBQUQsRUFBT0osQ0FBUCxFQUFXO0FBQzVDLFNBQUcsQ0FBQ0ksS0FBSixFQUNDLE9BQU8sS0FBUDtBQUNELFlBQU8sQ0FBQ3RDLEtBQUtvQyxlQUFOLElBQXlCLENBQUNwQyxLQUFLb0MsZUFBTCxDQUFxQkYsRUFBRWxDLElBQXZCLENBQWpDO0FBQ0EsS0FKTSxFQUlMLElBSkssQ0FBUDtBQU1BLElBVk0sRUFVTCxJQVZLLENBQVA7QUFXQTs7O3NCQXBFVztBQUNYLFVBQU8sS0FBS2xDLFFBQUwsQ0FBY2lFLE1BQWQsQ0FBcUIsVUFBQ1EsQ0FBRDtBQUFBLFFBQVd0RCxNQUFYLFNBQUlwQixLQUFKLENBQVdvQixNQUFYO0FBQUEsV0FBc0I2QixLQUFLMEIsR0FBTCxDQUFTRCxDQUFULEVBQVd0RCxNQUFYLENBQXRCO0FBQUEsSUFBckIsRUFBOEQsQ0FBOUQsQ0FBUDtBQUNBOzs7c0JBRW1CO0FBQ25CLFVBQU8sS0FBS25CLFFBQUwsQ0FBY2lFLE1BQWQsQ0FBcUIsVUFBQ0MsQ0FBRDtBQUFBLFFBQVd4RCxLQUFYLFNBQUlYLEtBQUosQ0FBV1csS0FBWDtBQUFBLFdBQXFCd0QsSUFBRXhELEtBQXZCO0FBQUEsSUFBckIsRUFBa0QsS0FBS0EsS0FBdkQsQ0FBUDtBQUNBIiwiZmlsZSI6InBhcmFncmFwaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgQW55IGZyb20gXCIuL2FueVwiXHJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZWQvZ3JvdXBcIlxyXG5pbXBvcnQgTGluZSBmcm9tIFwiLi4vY29tcG9zZWQvbGluZVwiXHJcbmltcG9ydCBDb21wb3NlZFRleHQgZnJvbSBcIi4uL2NvbXBvc2VkL3RleHRcIlxyXG5cclxuaW1wb3J0IElubGluZSBmcm9tIFwiLi9pbmxpbmVcIlxyXG5pbXBvcnQgVGV4dCBmcm9tIFwiLi90ZXh0XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhcmFncmFwaCBleHRlbmRzIEFueXtcclxuXHRzdGF0aWMgZGlzcGxheU5hbWU9XCJwYXJhZ3JhcGhcIlxyXG5cclxuXHRyZW5kZXIoKXtcclxuXHRcdHJldHVybiA8cD57dGhpcy5nZXRDb250ZW50KCl9PC9wPlxyXG5cdH1cclxuXHJcblx0Z2V0Q29udGVudCgpe1xyXG5cdFx0aWYoUmVhY3QuQ2hpbGRyZW4uY291bnQodGhpcy5wcm9wcy5jaGlsZHJlbik9PTApe1xyXG5cdFx0XHR0aGlzLmdldENvbnRlbnRDb3VudD1hPT4xXHJcblx0XHRcdHJldHVybiAoPElubGluZT48VGV4dD4gPC9UZXh0PjwvSW5saW5lPilcclxuXHRcdH1cclxuXHRcdHJldHVybiBzdXBlci5nZXRDb250ZW50KClcclxuXHR9XHJcblxyXG5cdGlzRW1wdHkoKXtcclxuXHRcdHJldHVybiBmYWxzZVxyXG5cdH1cclxuXHJcblxyXG5cdF9uZXdMaW5lKCl7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5lSW5mbyh0aGlzLmxpbmVXaWR0aCgpLHRoaXMpXHJcblx0fVxyXG5cclxuXHRsaW5lV2lkdGgoKXtcclxuXHRcdGNvbnN0IHtpbmRlbnQ6e2xlZnQ9MCxyaWdodD0wLGZpcnN0TGluZT0wLGhhbmdpbmc9MH19PXRoaXMuZ2V0U3R5bGUoKVxyXG4gICAgICAgIGxldCB7d2lkdGh9PXRoaXMuYXZhaWxhYmxlU3BhY2VcclxuICAgICAgICB3aWR0aC09KGxlZnQrcmlnaHQpXHJcbiAgICAgICAgaWYodGhpcy5jb21wdXRlZC5jb21wb3NlZC5sZW5ndGg9PTApXHJcbiAgICAgICAgICAgIHdpZHRoLT1maXJzdExpbmVcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHdpZHRoLT1oYW5naW5nXHJcblx0XHRyZXR1cm4gd2lkdGhcclxuXHR9XHJcblxyXG4gICAgbmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkPXt9KXtcclxuICAgICAgICBjb25zdCB7d2lkdGg6bWluUmVxdWlyZWRXPU51bWJlci5NSU5fVkFMVUUsaGVpZ2h0Om1pblJlcXVpcmVkSD1OdW1iZXIuTUlOX1ZBTFVFLHNwbGl0YWJsZT10cnVlfT1yZXF1aXJlZFxyXG4gICAgICAgIGNvbnN0IHtjb21wb3NlZH09dGhpcy5jb21wdXRlZFxyXG5cdFx0aWYoMD09Y29tcG9zZWQubGVuZ3RoKXtcclxuXHRcdFx0bGV0IHt3aWR0aCxoZWlnaHR9PXRoaXMuY29udGV4dC5wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkKVxyXG5cdFx0XHR0aGlzLmF2YWlsYWJsZVNwYWNlPXt3aWR0aCxoZWlnaHR9XHJcblx0XHRcdGNvbXBvc2VkLnB1c2godGhpcy5fbmV3TGluZSgpKVxyXG5cdFx0fVxyXG4gICAgICAgIGxldCBjdXJyZW50TGluZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cclxuXHJcbiAgICAgICAgbGV0IHt3aWR0aCxhdmFpbGFibGVXaWR0aH09Y3VycmVudExpbmVcclxuICAgICAgICBpZihhdmFpbGFibGVXaWR0aDxtaW5SZXF1aXJlZFcgfHwgdGhpcy5hdmFpbGFibGVTcGFjZS5oZWlnaHQ8bWluUmVxdWlyZWRIKXtcclxuXHRcdFx0aWYodGhpcy5hdmFpbGFibGVTcGFjZS5oZWlnaHQ8bWluUmVxdWlyZWRIKVxyXG5cdFx0XHRcdHRoaXMuYXZhaWxhYmxlU3BhY2U9dGhpcy5jb250ZXh0LnBhcmVudC5uZXh0QXZhaWxhYmxlU3BhY2UocmVxdWlyZWQpXHJcblxyXG5cdFx0XHRhdmFpbGFibGVXaWR0aD10aGlzLmxpbmVXaWR0aCgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7XHJcblx0XHRcdHdpZHRoOmF2YWlsYWJsZVdpZHRoLFxyXG5cdFx0XHRoZWlnaHQ6dGhpcy5hdmFpbGFibGVTcGFjZS5oZWlnaHQsXHJcblx0XHRcdGJGaXJzdExpbmU6IGNvbXBvc2VkLmxlbmd0aDwyLFxyXG5cdFx0XHRiTGluZVN0YXJ0OiBhdmFpbGFibGVXaWR0aD09dGhpcy5hdmFpbGFibGVTcGFjZS53aWR0aCxcclxuXHRcdFx0bGluZTogY3VycmVudExpbmVcclxuXHRcdH1cclxuICAgIH1cclxuXHJcbiAgICBhcHBlbmRDb21wb3NlZChjb250ZW50KXsvL0BUT0RPOiBuZWVkIGNvbnNpZGVyIGF2YWlsYWJsZVNwYWNlLmhlaWdodFxyXG4gICAgICAgIGNvbnN0IHtjb21wb3NlZH09dGhpcy5jb21wdXRlZFxyXG4gICAgICAgIGNvbnN0IHtwYXJlbnR9PXRoaXMuY29udGV4dFxyXG5cclxuXHRcdGxldCBjdXJyZW50TGluZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cclxuICAgICAgICBsZXQgYXZhaWxhYmxlV2lkdGg9Y3VycmVudExpbmUuYXZhaWxhYmxlV2lkdGhcclxuICAgICAgICBsZXQge3dpZHRoOmNvbnRlbnRXaWR0aH09Y29udGVudC5wcm9wc1xyXG5cclxuXHRcdGlmKGF2YWlsYWJsZVdpZHRoPj1jb250ZW50V2lkdGgpe1xyXG4gICAgICAgICAgY3VycmVudExpbmUuY2hpbGRyZW4ucHVzaChjb250ZW50KVxyXG5cdFx0fWVsc2UgaWYoYXZhaWxhYmxlV2lkdGg8Y29udGVudFdpZHRoKXtcclxuXHRcdFx0aWYoY29udGVudC50eXBlLmFibGVFeGNlZWQgJiZcclxuXHRcdFx0XHRjb250ZW50LnR5cGUuYWJsZUV4Y2VlZChjb250ZW50LnByb3BzLmNoaWxkcmVuKSl7XHJcblx0XHRcdFx0Y3VycmVudExpbmUuY2hpbGRyZW4ucHVzaChjb250ZW50KVxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHR0aGlzLmNvbW1pdEN1cnJlbnRMaW5lKHRydWUpXHJcblx0XHRcdFx0dGhpcy5hcHBlbmRDb21wb3NlZChjb250ZW50KVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcbiAgICB9XHJcblxyXG5cdGNvbW1pdEN1cnJlbnRMaW5lKG5lZWROZXdMaW5lPWZhbHNlKXtcclxuXHRcdGNvbnN0IHtjb21wb3NlZH09dGhpcy5jb21wdXRlZFxyXG5cdFx0Y29uc3Qge3BhcmVudH09dGhpcy5jb250ZXh0XHJcblx0XHRsZXQgY3VycmVudExpbmU9Y29tcG9zZWRbY29tcG9zZWQubGVuZ3RoLTFdXHJcblxyXG5cdFx0cGFyZW50LmFwcGVuZENvbXBvc2VkKHRoaXMuY3JlYXRlQ29tcG9zZWQyUGFyZW50KGN1cnJlbnRMaW5lKSlcclxuXHJcblx0XHRpZihuZWVkTmV3TGluZSlcclxuXHRcdFx0Y29tcG9zZWQucHVzaCh0aGlzLl9uZXdMaW5lKCkpXHJcblx0fVxyXG5cclxuXHRvbkFsbENoaWxkcmVuQ29tcG9zZWQoKXsvL25lZWQgYXBwZW5kIGxhc3Qgbm9uLWZ1bGwtd2lkdGggbGluZSB0byBwYXJlbnRcclxuXHRcdHRoaXMuY29tbWl0Q3VycmVudExpbmUoKVxyXG5cclxuXHRcdHRoaXMuYXZhaWxhYmxlU3BhY2U9e3dpZHRoOjAsIGhlaWdodDowfVxyXG5cclxuXHRcdHN1cGVyLm9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpXHJcblx0fVxyXG5cclxuICAgIGNyZWF0ZUNvbXBvc2VkMlBhcmVudChwcm9wcyl7XHJcbiAgICAgICAgbGV0IHtoZWlnaHQsIHdpZHRoLCBwYXJhZ3JhcGgsIC4uLm90aGVyc309cHJvcHNcclxuICAgICAgICBsZXQge3NwYWNpbmc6e2xpbmVIZWlnaHQ9XCIxMDAlXCIsdG9wPTAsIGJvdHRvbT0wfSwgaW5kZW50OntsZWZ0PTAscmlnaHQ9MCxmaXJzdExpbmU9MCxoYW5naW5nPTB9fT10aGlzLmdldFN0eWxlKClcclxuICAgICAgICBsZXQgY29udGVudFk9MCwgY29udGVudFg9bGVmdFxyXG5cclxuICAgICAgIGxpbmVIZWlnaHQ9dHlwZW9mKGxpbmVIZWlnaHQpPT0nc3RyaW5nJyA/IE1hdGguY2VpbChoZWlnaHQqcGFyc2VJbnQobGluZUhlaWdodCkvMTAwLjApOiBsaW5lSGVpZ2h0XHJcblxyXG4gICAgICAgIGlmKHRoaXMuY29tcHV0ZWQuY29tcG9zZWQubGVuZ3RoPT0xKXsvL2ZpcnN0IGxpbmVcclxuICAgICAgICAgICAgbGluZUhlaWdodCs9dG9wXHJcbiAgICAgICAgICAgIGNvbnRlbnRZKz10b3BcclxuXHRcdFx0Y29udGVudFgrPWZpcnN0TGluZVxyXG4gICAgICAgIH1lbHNle1xyXG5cdFx0XHRjb250ZW50WCs9aGFuZ2luZ1xyXG5cdFx0fVxyXG5cclxuICAgICAgICBpZih0aGlzLmlzQWxsQ2hpbGRyZW5Db21wb3NlZCgpKXsvL2xhc3QgbGluZVxyXG4gICAgICAgICAgICBsaW5lSGVpZ2h0Kz1ib3R0b21cclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmF2YWlsYWJsZVNwYWNlLmhlaWdodC09bGluZUhlaWdodFxyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8R3JvdXAgaGVpZ2h0PXtsaW5lSGVpZ2h0fSB3aWR0aD17d2lkdGh9PlxyXG4gICAgICAgICAgICAgICAgPEdyb3VwIHg9e2NvbnRlbnRYfSB5PXtjb250ZW50WX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPExpbmUgd2lkdGg9e3dpZHRofSBoZWlnaHQ9e2hlaWdodH0gey4uLm90aGVyc30vPlxyXG4gICAgICAgICAgICAgICAgPC9Hcm91cD5cclxuICAgICAgICAgICAgPC9Hcm91cD5cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U3R5bGUoKXtcclxuXHRcdHJldHVybiBzdXBlci5nZXRTdHlsZSgpfHx7XHJcblx0XHRcdHNwYWNpbmc6e1xyXG5cdFx0XHRcdGxpbmVIZWlnaHQ6XCIxMDAlXCJcclxuXHRcdFx0XHQsdG9wOjBcclxuXHRcdFx0XHQsYm90dG9tOjBcclxuXHRcdFx0fVxyXG5cdFx0XHQsaW5kZW50OntcclxuXHRcdFx0XHRsZWZ0OjBcclxuXHRcdFx0XHQscmlnaHQ6MFxyXG5cdFx0XHRcdCxmaXJzdExpbmU6MFxyXG5cdFx0XHRcdCxoYW5naW5nOjBcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcbmNsYXNzIExpbmVJbmZve1xyXG5cdGNvbnN0cnVjdG9yKHdpZHRoLHApe1xyXG5cdFx0dGhpcy5wYXJhZ3JhcGg9cFxyXG5cdFx0dGhpcy53aWR0aD13aWR0aFxyXG5cdFx0dGhpcy5jaGlsZHJlbj1bXVxyXG5cdH1cclxuXHJcblx0Z2V0IGhlaWdodCgpe1xyXG5cdFx0cmV0dXJuIHRoaXMuY2hpbGRyZW4ucmVkdWNlKChoLHtwcm9wczp7aGVpZ2h0fX0pPT5NYXRoLm1heChoLGhlaWdodCksMClcclxuXHR9XHJcblxyXG5cdGdldCBhdmFpbGFibGVXaWR0aCgpe1xyXG5cdFx0cmV0dXJuIHRoaXMuY2hpbGRyZW4ucmVkdWNlKCh3LHtwcm9wczp7d2lkdGh9fSk9Pnctd2lkdGgsdGhpcy53aWR0aClcclxuXHR9XHJcblxyXG5cdHJvbGxiYWNrKHt0eXBlfSl7XHJcblx0XHRsZXQgcmVtb3ZlZD1bXVxyXG5cdFx0Zm9yKGxldCBpPXRoaXMuY2hpbGRyZW4ubGVuZ3RoLTE7aT4tMTtpLS0pe1xyXG5cdFx0XHRsZXQgdGV4dD10aGlzLmNoaWxkcmVuW2ldXHJcblx0XHRcdGlmKHRleHQudHlwZSE9Q29tcG9zZWRUZXh0KVxyXG5cdFx0XHRcdGJyZWFrXHJcblx0XHRcdGxldCB7d2lkdGgsY2hpbGRyZW46cGllY2VzfT10ZXh0LnByb3BzXHJcblxyXG5cdFx0XHRsZXQgaj1waWVjZXMubGVuZ3RoLTFcclxuXHRcdFx0Zm9yKDtqPi0xO2otLSl7XHJcblx0XHRcdFx0bGV0IGNoYXJzPXBpZWNlc1tqXVxyXG5cdFx0XHRcdGlmKGNoYXJzLnR5cGUhPXR5cGUpe1xyXG5cdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmKGo9PS0xKXtcclxuXHRcdFx0XHRyZW1vdmVkLnVuc2hpZnQodGhpcy5jaGlsZHJlbi5wb3AoKSlcclxuXHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0fWVsc2UgaWYoaj09cGllY2VzLmxlbmd0aC0xKXtcclxuXHRcdFx0XHRicmVha1xyXG5cdFx0XHR9ZWxzZSB7XHJcblx0XHRcdFx0bGV0IHJlbW92ZWRQaWVjZXM9cGllY2VzLnNwbGljZShqKVxyXG5cdFx0XHRcdHRoaXMuY2hpbGRyZW5baV09UmVhY3QuY2xvbmVFbGVtZW50KHRleHQse2NoaWxkcmVuOnBpZWNlcywgd2lkdGg6cGllY2VzLnJlZHVjZSgodyx7d2lkdGh9KT0+dyt3aWR0aCwwKX0pXHJcblx0XHRcdFx0cmVtb3ZlZC51bnNoaWZ0KFJlYWN0LmNsb25lRWxlbWVudCh0ZXh0LHtjaGlsZHJlbjpyZW1vdmVkUGllY2VzLHdpZHRoOnJlbW92ZWRQaWVjZXMucmVkdWNlKCh3LHt3aWR0aH0pPT53K3dpZHRoLDApfSkpXHJcblx0XHRcdFx0YnJlYWtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMucGFyYWdyYXBoLmNvbW1pdEN1cnJlbnRMaW5lKHRydWUpXHJcblxyXG5cdFx0cmVtb3ZlZC5tYXAoYT0+dGhpcy5wYXJhZ3JhcGguYXBwZW5kQ29tcG9zZWQoYSkpXHJcblx0fVxyXG5cclxuXHRjb21taXQobmVlZE5ld0xpbmUpe1xyXG5cdFx0dGhpcy5wYXJhZ3JhcGguY29tbWl0Q3VycmVudExpbmUobmVlZE5ld0xpbmUpXHJcblx0fVxyXG5cclxuXHRjYW5TZXBlcmF0ZVdpdGgoe3R5cGV9KXtcclxuXHRcdGlmKHRoaXMuY2hpbGRyZW4ubGVuZ3RoPT0wKVxyXG5cdFx0XHRyZXR1cm4gdHJ1ZVxyXG5cclxuXHRcdGxldCB0ZXh0PXRoaXMuY2hpbGRyZW5bdGhpcy5jaGlsZHJlbi5sZW5ndGgtMV1cclxuXHRcdGxldCBwaWVjZXM9dGV4dC5wcm9wcy5jaGlsZHJlblxyXG5cdFx0bGV0IGxhc3RQaWVjZT1waWVjZXNbcGllY2VzLmxlbmd0aC0xXVxyXG5cdFx0cmV0dXJuIHR5cGUuY2FuU2VwZXJhdGVXaXRoICYmIHR5cGUuY2FuU2VwZXJhdGVXaXRoKGxhc3RQaWVjZS50eXBlKVxyXG5cdH1cclxuXHJcblx0YWxsQ2FudFNlcGVyYXRlV2l0aCh7dHlwZX0pe1xyXG5cdFx0cmV0dXJuIHRoaXMuY2hpbGRyZW4ucmVkdWNlKChjYW50U2VwZXJhdGUsdGV4dCk9PntcclxuXHRcdFx0aWYoIWNhbnRTZXBlcmF0ZSlcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2VcclxuXHJcblx0XHRcdHJldHVybiB0ZXh0LnByb3BzLmNoaWxkcmVuLnJlZHVjZSgoc3RhdGUsYSk9PntcclxuXHRcdFx0XHRpZighc3RhdGUpXHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2VcclxuXHRcdFx0XHRyZXR1cm4gIXR5cGUuY2FuU2VwZXJhdGVXaXRoIHx8ICF0eXBlLmNhblNlcGVyYXRlV2l0aChhLnR5cGUpXHJcblx0XHRcdH0sdHJ1ZSlcclxuXHJcblx0XHR9LHRydWUpXHJcblx0fVxyXG5cclxufVxyXG4iXX0=