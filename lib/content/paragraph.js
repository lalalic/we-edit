"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var Super = (0, _any.styleInheritable)(_any2.default);

var Paragraph = function (_Super) {
	(0, _inherits3.default)(Paragraph, _Super);

	function Paragraph() {
		(0, _classCallCheck3.default)(this, Paragraph);
		return (0, _possibleConstructorReturn3.default)(this, (Paragraph.__proto__ || (0, _getPrototypeOf2.default)(Paragraph)).apply(this, arguments));
	}

	(0, _createClass3.default)(Paragraph, [{
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
			return (0, _get3.default)(Paragraph.prototype.__proto__ || (0, _getPrototypeOf2.default)(Paragraph.prototype), "getContent", this).call(this);
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

			(0, _get3.default)(Paragraph.prototype.__proto__ || (0, _getPrototypeOf2.default)(Paragraph.prototype), "onAllChildrenComposed", this).call(this);
		}
	}, {
		key: "createComposed2Parent",
		value: function createComposed2Parent(props) {
			var height = props.height,
			    width = props.width,
			    paragraph = props.paragraph,
			    others = (0, _objectWithoutProperties3.default)(props, ["height", "width", "paragraph"]);

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
					_react2.default.createElement(_line2.default, (0, _extends3.default)({ width: width, height: height }, others))
				)
			);
		}
	}, {
		key: "getStyle",
		value: function getStyle() {
			if (this._style) return this._style;
			var spacing = this.style('pPr.spacing') || {};
			var indent = this.style('pPr.ind') || {};
			return this._style = { spacing: spacing, indent: indent };
		}
	}]);
	return Paragraph;
}(Super);

Paragraph.displayName = "paragraph";
Paragraph.contextTypes = (0, _extends3.default)({}, Super.contextTypes, { getDefaultStyle: _react.PropTypes.func
});
exports.default = Paragraph;

var LineInfo = function () {
	function LineInfo(width, p) {
		(0, _classCallCheck3.default)(this, LineInfo);

		this.paragraph = p;
		this.width = width;
		this.children = [];
	}

	(0, _createClass3.default)(LineInfo, [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3BhcmFncmFwaC5qcyJdLCJuYW1lcyI6WyJTdXBlciIsIlBhcmFncmFwaCIsImdldENvbnRlbnQiLCJDaGlsZHJlbiIsImNvdW50IiwicHJvcHMiLCJjaGlsZHJlbiIsImdldENvbnRlbnRDb3VudCIsIkxpbmVJbmZvIiwibGluZVdpZHRoIiwiZ2V0U3R5bGUiLCJpbmRlbnQiLCJsZWZ0IiwicmlnaHQiLCJmaXJzdExpbmUiLCJoYW5naW5nIiwid2lkdGgiLCJhdmFpbGFibGVTcGFjZSIsImNvbXB1dGVkIiwiY29tcG9zZWQiLCJsZW5ndGgiLCJyZXF1aXJlZCIsIm1pblJlcXVpcmVkVyIsIk51bWJlciIsIk1JTl9WQUxVRSIsImhlaWdodCIsIm1pblJlcXVpcmVkSCIsInNwbGl0YWJsZSIsImNvbnRleHQiLCJwYXJlbnQiLCJuZXh0QXZhaWxhYmxlU3BhY2UiLCJwdXNoIiwiX25ld0xpbmUiLCJjdXJyZW50TGluZSIsImF2YWlsYWJsZVdpZHRoIiwiYkZpcnN0TGluZSIsImJMaW5lU3RhcnQiLCJsaW5lIiwiY29udGVudCIsImNvbnRlbnRXaWR0aCIsInR5cGUiLCJhYmxlRXhjZWVkIiwiY29tbWl0Q3VycmVudExpbmUiLCJhcHBlbmRDb21wb3NlZCIsIm5lZWROZXdMaW5lIiwiY3JlYXRlQ29tcG9zZWQyUGFyZW50IiwicGFyYWdyYXBoIiwib3RoZXJzIiwic3BhY2luZyIsImxpbmVIZWlnaHQiLCJ0b3AiLCJib3R0b20iLCJjb250ZW50WSIsImNvbnRlbnRYIiwiTWF0aCIsImNlaWwiLCJwYXJzZUludCIsImlzQWxsQ2hpbGRyZW5Db21wb3NlZCIsIl9zdHlsZSIsInN0eWxlIiwiZGlzcGxheU5hbWUiLCJjb250ZXh0VHlwZXMiLCJnZXREZWZhdWx0U3R5bGUiLCJmdW5jIiwicCIsInJlbW92ZWQiLCJpIiwidGV4dCIsInBpZWNlcyIsImoiLCJjaGFycyIsInVuc2hpZnQiLCJwb3AiLCJyZW1vdmVkUGllY2VzIiwic3BsaWNlIiwiY2xvbmVFbGVtZW50IiwicmVkdWNlIiwidyIsIm1hcCIsImEiLCJsYXN0UGllY2UiLCJjYW5TZXBlcmF0ZVdpdGgiLCJjYW50U2VwZXJhdGUiLCJzdGF0ZSIsImgiLCJtYXgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7OztBQUdBLElBQUlBLFFBQU0seUNBQVY7O0lBQ3FCQyxTOzs7Ozs7Ozs7OzJCQUdaO0FBQ1AsVUFBTztBQUFBO0FBQUE7QUFBSSxTQUFLQyxVQUFMO0FBQUosSUFBUDtBQUNBOzs7K0JBRVc7QUFDWCxPQUFHLGdCQUFNQyxRQUFOLENBQWVDLEtBQWYsQ0FBcUIsS0FBS0MsS0FBTCxDQUFXQyxRQUFoQyxLQUEyQyxDQUE5QyxFQUFnRDtBQUMvQyxTQUFLQyxlQUFMLEdBQXFCO0FBQUEsWUFBRyxDQUFIO0FBQUEsS0FBckI7QUFDQSxXQUFRO0FBQUE7QUFBQTtBQUFRO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBUixLQUFSO0FBQ0E7QUFDRDtBQUNBOzs7NEJBRVE7QUFDUixVQUFPLEtBQVA7QUFDQTs7OzZCQUdTO0FBQ0gsVUFBTyxJQUFJQyxRQUFKLENBQWEsS0FBS0MsU0FBTCxFQUFiLEVBQThCLElBQTlCLENBQVA7QUFDTjs7OzhCQUVVO0FBQUEsbUJBQzRDLEtBQUtDLFFBQUwsRUFENUM7QUFBQSxvQ0FDSEMsTUFERztBQUFBLGdEQUNLQyxJQURMO0FBQUEsT0FDS0EsSUFETCx5Q0FDVSxDQURWO0FBQUEsZ0RBQ1lDLEtBRFo7QUFBQSxPQUNZQSxLQURaLHlDQUNrQixDQURsQjtBQUFBLGdEQUNvQkMsU0FEcEI7QUFBQSxPQUNvQkEsU0FEcEIseUNBQzhCLENBRDlCO0FBQUEsZ0RBQ2dDQyxPQURoQztBQUFBLE9BQ2dDQSxPQURoQyx5Q0FDd0MsQ0FEeEM7O0FBQUEsT0FFQ0MsS0FGRCxHQUVRLEtBQUtDLGNBRmIsQ0FF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QVg7QUFBQSxXQUFxQjZELElBQUU3RCxLQUF2QjtBQUFBLElBQXJCLEVBQWtELEtBQUtBLEtBQXZELENBQVA7QUFDQSIsImZpbGUiOiJwYXJhZ3JhcGguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBBbnksIHtzdHlsZUluaGVyaXRhYmxlfSBmcm9tIFwiLi9hbnlcIlxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXG5pbXBvcnQgTGluZSBmcm9tIFwiLi4vY29tcG9zZWQvbGluZVwiXG5pbXBvcnQgQ29tcG9zZWRUZXh0IGZyb20gXCIuLi9jb21wb3NlZC90ZXh0XCJcblxuaW1wb3J0IElubGluZSBmcm9tIFwiLi9pbmxpbmVcIlxuaW1wb3J0IFRleHQgZnJvbSBcIi4vdGV4dFwiXG5cblxubGV0IFN1cGVyPXN0eWxlSW5oZXJpdGFibGUoQW55KVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFyYWdyYXBoIGV4dGVuZHMgU3VwZXJ7XG5cdHN0YXRpYyBkaXNwbGF5TmFtZT1cInBhcmFncmFwaFwiXG5cblx0cmVuZGVyKCl7XG5cdFx0cmV0dXJuIDxwPnt0aGlzLmdldENvbnRlbnQoKX08L3A+XG5cdH1cblxuXHRnZXRDb250ZW50KCl7XG5cdFx0aWYoUmVhY3QuQ2hpbGRyZW4uY291bnQodGhpcy5wcm9wcy5jaGlsZHJlbik9PTApe1xuXHRcdFx0dGhpcy5nZXRDb250ZW50Q291bnQ9YT0+MVxuXHRcdFx0cmV0dXJuICg8SW5saW5lPjxUZXh0PiA8L1RleHQ+PC9JbmxpbmU+KVxuXHRcdH1cblx0XHRyZXR1cm4gc3VwZXIuZ2V0Q29udGVudCgpXG5cdH1cblxuXHRpc0VtcHR5KCl7XG5cdFx0cmV0dXJuIGZhbHNlXG5cdH1cblxuXG5cdF9uZXdMaW5lKCl7XG4gICAgICAgIHJldHVybiBuZXcgTGluZUluZm8odGhpcy5saW5lV2lkdGgoKSx0aGlzKVxuXHR9XG5cblx0bGluZVdpZHRoKCl7XG5cdFx0Y29uc3Qge2luZGVudDp7bGVmdD0wLHJpZ2h0PTAsZmlyc3RMaW5lPTAsaGFuZ2luZz0wfX09dGhpcy5nZXRTdHlsZSgpXG4gICAgICAgIGxldCB7d2lkdGh9PXRoaXMuYXZhaWxhYmxlU3BhY2VcbiAgICAgICAgd2lkdGgtPShsZWZ0K3JpZ2h0KVxuICAgICAgICBpZih0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLmxlbmd0aD09MClcbiAgICAgICAgICAgIHdpZHRoLT1maXJzdExpbmVcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgd2lkdGgtPWhhbmdpbmdcblx0XHRyZXR1cm4gd2lkdGhcblx0fVxuXG4gICAgbmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkPXt9KXtcbiAgICAgICAgY29uc3Qge3dpZHRoOm1pblJlcXVpcmVkVz1OdW1iZXIuTUlOX1ZBTFVFLGhlaWdodDptaW5SZXF1aXJlZEg9TnVtYmVyLk1JTl9WQUxVRSxzcGxpdGFibGU9dHJ1ZX09cmVxdWlyZWRcbiAgICAgICAgY29uc3Qge2NvbXBvc2VkfT10aGlzLmNvbXB1dGVkXG5cdFx0aWYoMD09Y29tcG9zZWQubGVuZ3RoKXtcblx0XHRcdGxldCB7d2lkdGgsaGVpZ2h0fT10aGlzLmNvbnRleHQucGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZShyZXF1aXJlZClcblx0XHRcdHRoaXMuYXZhaWxhYmxlU3BhY2U9e3dpZHRoLGhlaWdodH1cblx0XHRcdGNvbXBvc2VkLnB1c2godGhpcy5fbmV3TGluZSgpKVxuXHRcdH1cbiAgICAgICAgbGV0IGN1cnJlbnRMaW5lPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxuXG4gICAgICAgIGxldCB7d2lkdGgsYXZhaWxhYmxlV2lkdGh9PWN1cnJlbnRMaW5lXG4gICAgICAgIGlmKGF2YWlsYWJsZVdpZHRoPG1pblJlcXVpcmVkVyB8fCB0aGlzLmF2YWlsYWJsZVNwYWNlLmhlaWdodDxtaW5SZXF1aXJlZEgpe1xuXHRcdFx0aWYodGhpcy5hdmFpbGFibGVTcGFjZS5oZWlnaHQ8bWluUmVxdWlyZWRIKVxuXHRcdFx0XHR0aGlzLmF2YWlsYWJsZVNwYWNlPXRoaXMuY29udGV4dC5wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkKVxuXG5cdFx0XHRhdmFpbGFibGVXaWR0aD10aGlzLmxpbmVXaWR0aCgpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcblx0XHRcdHdpZHRoOmF2YWlsYWJsZVdpZHRoLFxuXHRcdFx0aGVpZ2h0OnRoaXMuYXZhaWxhYmxlU3BhY2UuaGVpZ2h0LFxuXHRcdFx0YkZpcnN0TGluZTogY29tcG9zZWQubGVuZ3RoPDIsXG5cdFx0XHRiTGluZVN0YXJ0OiBhdmFpbGFibGVXaWR0aD09dGhpcy5hdmFpbGFibGVTcGFjZS53aWR0aCxcblx0XHRcdGxpbmU6IGN1cnJlbnRMaW5lXG5cdFx0fVxuICAgIH1cblxuICAgIGFwcGVuZENvbXBvc2VkKGNvbnRlbnQpey8vQFRPRE86IG5lZWQgY29uc2lkZXIgYXZhaWxhYmxlU3BhY2UuaGVpZ2h0XG4gICAgICAgIGNvbnN0IHtjb21wb3NlZH09dGhpcy5jb21wdXRlZFxuICAgICAgICBjb25zdCB7cGFyZW50fT10aGlzLmNvbnRleHRcblxuXHRcdGxldCBjdXJyZW50TGluZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cbiAgICAgICAgbGV0IGF2YWlsYWJsZVdpZHRoPWN1cnJlbnRMaW5lLmF2YWlsYWJsZVdpZHRoXG4gICAgICAgIGxldCB7d2lkdGg6Y29udGVudFdpZHRofT1jb250ZW50LnByb3BzXG5cblx0XHRpZihhdmFpbGFibGVXaWR0aD49Y29udGVudFdpZHRoKXtcbiAgICAgICAgICBjdXJyZW50TGluZS5jaGlsZHJlbi5wdXNoKGNvbnRlbnQpXG5cdFx0fWVsc2UgaWYoYXZhaWxhYmxlV2lkdGg8Y29udGVudFdpZHRoKXtcblx0XHRcdGlmKGNvbnRlbnQudHlwZS5hYmxlRXhjZWVkICYmXG5cdFx0XHRcdGNvbnRlbnQudHlwZS5hYmxlRXhjZWVkKGNvbnRlbnQucHJvcHMuY2hpbGRyZW4pKXtcblx0XHRcdFx0Y3VycmVudExpbmUuY2hpbGRyZW4ucHVzaChjb250ZW50KVxuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHRoaXMuY29tbWl0Q3VycmVudExpbmUodHJ1ZSlcblx0XHRcdFx0dGhpcy5hcHBlbmRDb21wb3NlZChjb250ZW50KVxuXHRcdFx0fVxuXHRcdH1cbiAgICB9XG5cblx0Y29tbWl0Q3VycmVudExpbmUobmVlZE5ld0xpbmU9ZmFsc2Upe1xuXHRcdGNvbnN0IHtjb21wb3NlZH09dGhpcy5jb21wdXRlZFxuXHRcdGNvbnN0IHtwYXJlbnR9PXRoaXMuY29udGV4dFxuXHRcdGxldCBjdXJyZW50TGluZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cblxuXHRcdHBhcmVudC5hcHBlbmRDb21wb3NlZCh0aGlzLmNyZWF0ZUNvbXBvc2VkMlBhcmVudChjdXJyZW50TGluZSkpXG5cblx0XHRpZihuZWVkTmV3TGluZSlcblx0XHRcdGNvbXBvc2VkLnB1c2godGhpcy5fbmV3TGluZSgpKVxuXHR9XG5cblx0b25BbGxDaGlsZHJlbkNvbXBvc2VkKCl7Ly9uZWVkIGFwcGVuZCBsYXN0IG5vbi1mdWxsLXdpZHRoIGxpbmUgdG8gcGFyZW50XG5cdFx0dGhpcy5jb21taXRDdXJyZW50TGluZSgpXG5cblx0XHR0aGlzLmF2YWlsYWJsZVNwYWNlPXt3aWR0aDowLCBoZWlnaHQ6MH1cblxuXHRcdHN1cGVyLm9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpXG5cdH1cblxuICAgIGNyZWF0ZUNvbXBvc2VkMlBhcmVudChwcm9wcyl7XG4gICAgICAgIGxldCB7aGVpZ2h0LCB3aWR0aCwgcGFyYWdyYXBoLCAuLi5vdGhlcnN9PXByb3BzXG4gICAgICAgIGxldCB7c3BhY2luZzp7bGluZUhlaWdodD1cIjEwMCVcIix0b3A9MCwgYm90dG9tPTB9LCBpbmRlbnQ6e2xlZnQ9MCxyaWdodD0wLGZpcnN0TGluZT0wLGhhbmdpbmc9MH19PXRoaXMuZ2V0U3R5bGUoKVxuICAgICAgICBsZXQgY29udGVudFk9MCwgY29udGVudFg9bGVmdFxuXG4gICAgICAgbGluZUhlaWdodD10eXBlb2YobGluZUhlaWdodCk9PSdzdHJpbmcnID8gTWF0aC5jZWlsKGhlaWdodCpwYXJzZUludChsaW5lSGVpZ2h0KS8xMDAuMCk6IGxpbmVIZWlnaHRcblxuICAgICAgICBpZih0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLmxlbmd0aD09MSl7Ly9maXJzdCBsaW5lXG4gICAgICAgICAgICBsaW5lSGVpZ2h0Kz10b3BcbiAgICAgICAgICAgIGNvbnRlbnRZKz10b3Bcblx0XHRcdGNvbnRlbnRYKz1maXJzdExpbmVcbiAgICAgICAgfWVsc2V7XG5cdFx0XHRjb250ZW50WCs9aGFuZ2luZ1xuXHRcdH1cblxuICAgICAgICBpZih0aGlzLmlzQWxsQ2hpbGRyZW5Db21wb3NlZCgpKXsvL2xhc3QgbGluZVxuICAgICAgICAgICAgbGluZUhlaWdodCs9Ym90dG9tXG5cdFx0fVxuXG5cdFx0dGhpcy5hdmFpbGFibGVTcGFjZS5oZWlnaHQtPWxpbmVIZWlnaHRcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEdyb3VwIGhlaWdodD17bGluZUhlaWdodH0gd2lkdGg9e3dpZHRofT5cbiAgICAgICAgICAgICAgICA8R3JvdXAgeD17Y29udGVudFh9IHk9e2NvbnRlbnRZfT5cbiAgICAgICAgICAgICAgICAgICAgPExpbmUgd2lkdGg9e3dpZHRofSBoZWlnaHQ9e2hlaWdodH0gey4uLm90aGVyc30vPlxuICAgICAgICAgICAgICAgIDwvR3JvdXA+XG4gICAgICAgICAgICA8L0dyb3VwPlxuICAgICAgICApXG4gICAgfVxuXG4gICAgZ2V0U3R5bGUoKXtcbiAgICAgICAgaWYodGhpcy5fc3R5bGUpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3R5bGVcbiAgICAgICAgbGV0IHNwYWNpbmc9dGhpcy5zdHlsZSgncFByLnNwYWNpbmcnKXx8e31cbiAgICAgICAgbGV0IGluZGVudD10aGlzLnN0eWxlKCdwUHIuaW5kJyl8fHt9XG4gICAgICAgIHJldHVybiB0aGlzLl9zdHlsZT17c3BhY2luZyxpbmRlbnR9XG4gICAgfVxuXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xuXHRcdC4uLlN1cGVyLmNvbnRleHRUeXBlc1xuXHRcdCxnZXREZWZhdWx0U3R5bGU6IFByb3BUeXBlcy5mdW5jXG5cdH1cbn1cblxuXG5jbGFzcyBMaW5lSW5mb3tcblx0Y29uc3RydWN0b3Iod2lkdGgscCl7XG5cdFx0dGhpcy5wYXJhZ3JhcGg9cFxuXHRcdHRoaXMud2lkdGg9d2lkdGhcblx0XHR0aGlzLmNoaWxkcmVuPVtdXG5cdH1cblxuXHRnZXQgaGVpZ2h0KCl7XG5cdFx0cmV0dXJuIHRoaXMuY2hpbGRyZW4ucmVkdWNlKChoLHtwcm9wczp7aGVpZ2h0fX0pPT5NYXRoLm1heChoLGhlaWdodCksMClcblx0fVxuXG5cdGdldCBhdmFpbGFibGVXaWR0aCgpe1xuXHRcdHJldHVybiB0aGlzLmNoaWxkcmVuLnJlZHVjZSgodyx7cHJvcHM6e3dpZHRofX0pPT53LXdpZHRoLHRoaXMud2lkdGgpXG5cdH1cblxuXHRyb2xsYmFjayh7dHlwZX0pe1xuXHRcdGxldCByZW1vdmVkPVtdXG5cdFx0Zm9yKGxldCBpPXRoaXMuY2hpbGRyZW4ubGVuZ3RoLTE7aT4tMTtpLS0pe1xuXHRcdFx0bGV0IHRleHQ9dGhpcy5jaGlsZHJlbltpXVxuXHRcdFx0aWYodGV4dC50eXBlIT1Db21wb3NlZFRleHQpXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRsZXQge3dpZHRoLGNoaWxkcmVuOnBpZWNlc309dGV4dC5wcm9wc1xuXG5cdFx0XHRsZXQgaj1waWVjZXMubGVuZ3RoLTFcblx0XHRcdGZvcig7aj4tMTtqLS0pe1xuXHRcdFx0XHRsZXQgY2hhcnM9cGllY2VzW2pdXG5cdFx0XHRcdGlmKGNoYXJzLnR5cGUhPXR5cGUpe1xuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYoaj09LTEpe1xuXHRcdFx0XHRyZW1vdmVkLnVuc2hpZnQodGhpcy5jaGlsZHJlbi5wb3AoKSlcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9ZWxzZSBpZihqPT1waWVjZXMubGVuZ3RoLTEpe1xuXHRcdFx0XHRicmVha1xuXHRcdFx0fWVsc2Uge1xuXHRcdFx0XHRsZXQgcmVtb3ZlZFBpZWNlcz1waWVjZXMuc3BsaWNlKGopXG5cdFx0XHRcdHRoaXMuY2hpbGRyZW5baV09UmVhY3QuY2xvbmVFbGVtZW50KHRleHQse2NoaWxkcmVuOnBpZWNlcywgd2lkdGg6cGllY2VzLnJlZHVjZSgodyx7d2lkdGh9KT0+dyt3aWR0aCwwKX0pXG5cdFx0XHRcdHJlbW92ZWQudW5zaGlmdChSZWFjdC5jbG9uZUVsZW1lbnQodGV4dCx7Y2hpbGRyZW46cmVtb3ZlZFBpZWNlcyx3aWR0aDpyZW1vdmVkUGllY2VzLnJlZHVjZSgodyx7d2lkdGh9KT0+dyt3aWR0aCwwKX0pKVxuXHRcdFx0XHRicmVha1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXMucGFyYWdyYXBoLmNvbW1pdEN1cnJlbnRMaW5lKHRydWUpXG5cblx0XHRyZW1vdmVkLm1hcChhPT50aGlzLnBhcmFncmFwaC5hcHBlbmRDb21wb3NlZChhKSlcblx0fVxuXG5cdGNvbW1pdChuZWVkTmV3TGluZSl7XG5cdFx0dGhpcy5wYXJhZ3JhcGguY29tbWl0Q3VycmVudExpbmUobmVlZE5ld0xpbmUpXG5cdH1cblxuXHRjYW5TZXBlcmF0ZVdpdGgoe3R5cGV9KXtcblx0XHRpZih0aGlzLmNoaWxkcmVuLmxlbmd0aD09MClcblx0XHRcdHJldHVybiB0cnVlXG5cblx0XHRsZXQgdGV4dD10aGlzLmNoaWxkcmVuW3RoaXMuY2hpbGRyZW4ubGVuZ3RoLTFdXG5cdFx0bGV0IHBpZWNlcz10ZXh0LnByb3BzLmNoaWxkcmVuXG5cdFx0bGV0IGxhc3RQaWVjZT1waWVjZXNbcGllY2VzLmxlbmd0aC0xXVxuXHRcdHJldHVybiB0eXBlLmNhblNlcGVyYXRlV2l0aCAmJiB0eXBlLmNhblNlcGVyYXRlV2l0aChsYXN0UGllY2UudHlwZSlcblx0fVxuXG5cdGFsbENhbnRTZXBlcmF0ZVdpdGgoe3R5cGV9KXtcblx0XHRyZXR1cm4gdGhpcy5jaGlsZHJlbi5yZWR1Y2UoKGNhbnRTZXBlcmF0ZSx0ZXh0KT0+e1xuXHRcdFx0aWYoIWNhbnRTZXBlcmF0ZSlcblx0XHRcdFx0cmV0dXJuIGZhbHNlXG5cblx0XHRcdHJldHVybiB0ZXh0LnByb3BzLmNoaWxkcmVuLnJlZHVjZSgoc3RhdGUsYSk9Pntcblx0XHRcdFx0aWYoIXN0YXRlKVxuXHRcdFx0XHRcdHJldHVybiBmYWxzZVxuXHRcdFx0XHRyZXR1cm4gIXR5cGUuY2FuU2VwZXJhdGVXaXRoIHx8ICF0eXBlLmNhblNlcGVyYXRlV2l0aChhLnR5cGUpXG5cdFx0XHR9LHRydWUpXG5cblx0XHR9LHRydWUpXG5cdH1cblxufVxuIl19