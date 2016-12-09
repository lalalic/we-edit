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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3BhcmFncmFwaC5qcyJdLCJuYW1lcyI6WyJTdXBlciIsIlBhcmFncmFwaCIsImdldENvbnRlbnQiLCJDaGlsZHJlbiIsImNvdW50IiwicHJvcHMiLCJjaGlsZHJlbiIsImdldENvbnRlbnRDb3VudCIsIkxpbmVJbmZvIiwibGluZVdpZHRoIiwiZ2V0U3R5bGUiLCJpbmRlbnQiLCJsZWZ0IiwicmlnaHQiLCJmaXJzdExpbmUiLCJoYW5naW5nIiwid2lkdGgiLCJhdmFpbGFibGVTcGFjZSIsImNvbXB1dGVkIiwiY29tcG9zZWQiLCJsZW5ndGgiLCJyZXF1aXJlZCIsIm1pblJlcXVpcmVkVyIsIk51bWJlciIsIk1JTl9WQUxVRSIsImhlaWdodCIsIm1pblJlcXVpcmVkSCIsInNwbGl0YWJsZSIsImNvbnRleHQiLCJwYXJlbnQiLCJuZXh0QXZhaWxhYmxlU3BhY2UiLCJwdXNoIiwiX25ld0xpbmUiLCJjdXJyZW50TGluZSIsImF2YWlsYWJsZVdpZHRoIiwiYkZpcnN0TGluZSIsImJMaW5lU3RhcnQiLCJsaW5lIiwiY29udGVudCIsImNvbnRlbnRXaWR0aCIsInR5cGUiLCJhYmxlRXhjZWVkIiwiY29tbWl0Q3VycmVudExpbmUiLCJhcHBlbmRDb21wb3NlZCIsIm5lZWROZXdMaW5lIiwiY3JlYXRlQ29tcG9zZWQyUGFyZW50IiwicGFyYWdyYXBoIiwib3RoZXJzIiwic3BhY2luZyIsImxpbmVIZWlnaHQiLCJ0b3AiLCJib3R0b20iLCJjb250ZW50WSIsImNvbnRlbnRYIiwiTWF0aCIsImNlaWwiLCJwYXJzZUludCIsImlzQWxsQ2hpbGRyZW5Db21wb3NlZCIsIl9zdHlsZSIsInN0eWxlIiwiZGlzcGxheU5hbWUiLCJjb250ZXh0VHlwZXMiLCJnZXREZWZhdWx0U3R5bGUiLCJmdW5jIiwicCIsInJlbW92ZWQiLCJpIiwidGV4dCIsInBpZWNlcyIsImoiLCJjaGFycyIsInVuc2hpZnQiLCJwb3AiLCJyZW1vdmVkUGllY2VzIiwic3BsaWNlIiwiY2xvbmVFbGVtZW50IiwicmVkdWNlIiwidyIsIm1hcCIsImEiLCJsYXN0UGllY2UiLCJjYW5TZXBlcmF0ZVdpdGgiLCJjYW50U2VwZXJhdGUiLCJzdGF0ZSIsImgiLCJtYXgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7OztBQUdBLElBQUlBLFFBQU0seUNBQVY7O0lBQ3FCQyxTOzs7Ozs7Ozs7OzJCQUdaO0FBQ1AsVUFBTztBQUFBO0FBQUE7QUFBSSxTQUFLQyxVQUFMO0FBQUosSUFBUDtBQUNBOzs7K0JBRVc7QUFDWCxPQUFHLGdCQUFNQyxRQUFOLENBQWVDLEtBQWYsQ0FBcUIsS0FBS0MsS0FBTCxDQUFXQyxRQUFoQyxLQUEyQyxDQUE5QyxFQUFnRDtBQUMvQyxTQUFLQyxlQUFMLEdBQXFCO0FBQUEsWUFBRyxDQUFIO0FBQUEsS0FBckI7QUFDQSxXQUFRO0FBQUE7QUFBQTtBQUFRO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBUixLQUFSO0FBQ0E7QUFDRDtBQUNBOzs7NEJBRVE7QUFDUixVQUFPLEtBQVA7QUFDQTs7OzZCQUdTO0FBQ0gsVUFBTyxJQUFJQyxRQUFKLENBQWEsS0FBS0MsU0FBTCxFQUFiLEVBQThCLElBQTlCLENBQVA7QUFDTjs7OzhCQUVVO0FBQUEsbUJBQzRDLEtBQUtDLFFBQUwsRUFENUM7QUFBQSxvQ0FDSEMsTUFERztBQUFBLGdEQUNLQyxJQURMO0FBQUEsT0FDS0EsSUFETCx5Q0FDVSxDQURWO0FBQUEsZ0RBQ1lDLEtBRFo7QUFBQSxPQUNZQSxLQURaLHlDQUNrQixDQURsQjtBQUFBLGdEQUNvQkMsU0FEcEI7QUFBQSxPQUNvQkEsU0FEcEIseUNBQzhCLENBRDlCO0FBQUEsZ0RBQ2dDQyxPQURoQztBQUFBLE9BQ2dDQSxPQURoQyx5Q0FDd0MsQ0FEeEM7O0FBQUEsT0FFQ0MsS0FGRCxHQUVRLEtBQUtDLGNBRmIsQ0FF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QVg7QUFBQSxXQUFxQjZELElBQUU3RCxLQUF2QjtBQUFBLElBQXJCLEVBQWtELEtBQUtBLEtBQXZELENBQVA7QUFDQSIsImZpbGUiOiJwYXJhZ3JhcGguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IEFueSwge3N0eWxlSW5oZXJpdGFibGV9IGZyb20gXCIuL2FueVwiXHJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZWQvZ3JvdXBcIlxyXG5pbXBvcnQgTGluZSBmcm9tIFwiLi4vY29tcG9zZWQvbGluZVwiXHJcbmltcG9ydCBDb21wb3NlZFRleHQgZnJvbSBcIi4uL2NvbXBvc2VkL3RleHRcIlxyXG5cclxuaW1wb3J0IElubGluZSBmcm9tIFwiLi9pbmxpbmVcIlxyXG5pbXBvcnQgVGV4dCBmcm9tIFwiLi90ZXh0XCJcclxuXHJcblxyXG5sZXQgU3VwZXI9c3R5bGVJbmhlcml0YWJsZShBbnkpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhcmFncmFwaCBleHRlbmRzIFN1cGVye1xyXG5cdHN0YXRpYyBkaXNwbGF5TmFtZT1cInBhcmFncmFwaFwiXHJcblxyXG5cdHJlbmRlcigpe1xyXG5cdFx0cmV0dXJuIDxwPnt0aGlzLmdldENvbnRlbnQoKX08L3A+XHJcblx0fVxyXG5cclxuXHRnZXRDb250ZW50KCl7XHJcblx0XHRpZihSZWFjdC5DaGlsZHJlbi5jb3VudCh0aGlzLnByb3BzLmNoaWxkcmVuKT09MCl7XHJcblx0XHRcdHRoaXMuZ2V0Q29udGVudENvdW50PWE9PjFcclxuXHRcdFx0cmV0dXJuICg8SW5saW5lPjxUZXh0PiA8L1RleHQ+PC9JbmxpbmU+KVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHN1cGVyLmdldENvbnRlbnQoKVxyXG5cdH1cclxuXHJcblx0aXNFbXB0eSgpe1xyXG5cdFx0cmV0dXJuIGZhbHNlXHJcblx0fVxyXG5cclxuXHJcblx0X25ld0xpbmUoKXtcclxuICAgICAgICByZXR1cm4gbmV3IExpbmVJbmZvKHRoaXMubGluZVdpZHRoKCksdGhpcylcclxuXHR9XHJcblxyXG5cdGxpbmVXaWR0aCgpe1xyXG5cdFx0Y29uc3Qge2luZGVudDp7bGVmdD0wLHJpZ2h0PTAsZmlyc3RMaW5lPTAsaGFuZ2luZz0wfX09dGhpcy5nZXRTdHlsZSgpXHJcbiAgICAgICAgbGV0IHt3aWR0aH09dGhpcy5hdmFpbGFibGVTcGFjZVxyXG4gICAgICAgIHdpZHRoLT0obGVmdCtyaWdodClcclxuICAgICAgICBpZih0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLmxlbmd0aD09MClcclxuICAgICAgICAgICAgd2lkdGgtPWZpcnN0TGluZVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgd2lkdGgtPWhhbmdpbmdcclxuXHRcdHJldHVybiB3aWR0aFxyXG5cdH1cclxuXHJcbiAgICBuZXh0QXZhaWxhYmxlU3BhY2UocmVxdWlyZWQ9e30pe1xyXG4gICAgICAgIGNvbnN0IHt3aWR0aDptaW5SZXF1aXJlZFc9TnVtYmVyLk1JTl9WQUxVRSxoZWlnaHQ6bWluUmVxdWlyZWRIPU51bWJlci5NSU5fVkFMVUUsc3BsaXRhYmxlPXRydWV9PXJlcXVpcmVkXHJcbiAgICAgICAgY29uc3Qge2NvbXBvc2VkfT10aGlzLmNvbXB1dGVkXHJcblx0XHRpZigwPT1jb21wb3NlZC5sZW5ndGgpe1xyXG5cdFx0XHRsZXQge3dpZHRoLGhlaWdodH09dGhpcy5jb250ZXh0LnBhcmVudC5uZXh0QXZhaWxhYmxlU3BhY2UocmVxdWlyZWQpXHJcblx0XHRcdHRoaXMuYXZhaWxhYmxlU3BhY2U9e3dpZHRoLGhlaWdodH1cclxuXHRcdFx0Y29tcG9zZWQucHVzaCh0aGlzLl9uZXdMaW5lKCkpXHJcblx0XHR9XHJcbiAgICAgICAgbGV0IGN1cnJlbnRMaW5lPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxyXG5cclxuICAgICAgICBsZXQge3dpZHRoLGF2YWlsYWJsZVdpZHRofT1jdXJyZW50TGluZVxyXG4gICAgICAgIGlmKGF2YWlsYWJsZVdpZHRoPG1pblJlcXVpcmVkVyB8fCB0aGlzLmF2YWlsYWJsZVNwYWNlLmhlaWdodDxtaW5SZXF1aXJlZEgpe1xyXG5cdFx0XHRpZih0aGlzLmF2YWlsYWJsZVNwYWNlLmhlaWdodDxtaW5SZXF1aXJlZEgpXHJcblx0XHRcdFx0dGhpcy5hdmFpbGFibGVTcGFjZT10aGlzLmNvbnRleHQucGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZShyZXF1aXJlZClcclxuXHJcblx0XHRcdGF2YWlsYWJsZVdpZHRoPXRoaXMubGluZVdpZHRoKClcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHtcclxuXHRcdFx0d2lkdGg6YXZhaWxhYmxlV2lkdGgsXHJcblx0XHRcdGhlaWdodDp0aGlzLmF2YWlsYWJsZVNwYWNlLmhlaWdodCxcclxuXHRcdFx0YkZpcnN0TGluZTogY29tcG9zZWQubGVuZ3RoPDIsXHJcblx0XHRcdGJMaW5lU3RhcnQ6IGF2YWlsYWJsZVdpZHRoPT10aGlzLmF2YWlsYWJsZVNwYWNlLndpZHRoLFxyXG5cdFx0XHRsaW5lOiBjdXJyZW50TGluZVxyXG5cdFx0fVxyXG4gICAgfVxyXG5cclxuICAgIGFwcGVuZENvbXBvc2VkKGNvbnRlbnQpey8vQFRPRE86IG5lZWQgY29uc2lkZXIgYXZhaWxhYmxlU3BhY2UuaGVpZ2h0XHJcbiAgICAgICAgY29uc3Qge2NvbXBvc2VkfT10aGlzLmNvbXB1dGVkXHJcbiAgICAgICAgY29uc3Qge3BhcmVudH09dGhpcy5jb250ZXh0XHJcblxyXG5cdFx0bGV0IGN1cnJlbnRMaW5lPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxyXG4gICAgICAgIGxldCBhdmFpbGFibGVXaWR0aD1jdXJyZW50TGluZS5hdmFpbGFibGVXaWR0aFxyXG4gICAgICAgIGxldCB7d2lkdGg6Y29udGVudFdpZHRofT1jb250ZW50LnByb3BzXHJcblxyXG5cdFx0aWYoYXZhaWxhYmxlV2lkdGg+PWNvbnRlbnRXaWR0aCl7XHJcbiAgICAgICAgICBjdXJyZW50TGluZS5jaGlsZHJlbi5wdXNoKGNvbnRlbnQpXHJcblx0XHR9ZWxzZSBpZihhdmFpbGFibGVXaWR0aDxjb250ZW50V2lkdGgpe1xyXG5cdFx0XHRpZihjb250ZW50LnR5cGUuYWJsZUV4Y2VlZCAmJlxyXG5cdFx0XHRcdGNvbnRlbnQudHlwZS5hYmxlRXhjZWVkKGNvbnRlbnQucHJvcHMuY2hpbGRyZW4pKXtcclxuXHRcdFx0XHRjdXJyZW50TGluZS5jaGlsZHJlbi5wdXNoKGNvbnRlbnQpXHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdHRoaXMuY29tbWl0Q3VycmVudExpbmUodHJ1ZSlcclxuXHRcdFx0XHR0aGlzLmFwcGVuZENvbXBvc2VkKGNvbnRlbnQpXHJcblx0XHRcdH1cclxuXHRcdH1cclxuICAgIH1cclxuXHJcblx0Y29tbWl0Q3VycmVudExpbmUobmVlZE5ld0xpbmU9ZmFsc2Upe1xyXG5cdFx0Y29uc3Qge2NvbXBvc2VkfT10aGlzLmNvbXB1dGVkXHJcblx0XHRjb25zdCB7cGFyZW50fT10aGlzLmNvbnRleHRcclxuXHRcdGxldCBjdXJyZW50TGluZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cclxuXHJcblx0XHRwYXJlbnQuYXBwZW5kQ29tcG9zZWQodGhpcy5jcmVhdGVDb21wb3NlZDJQYXJlbnQoY3VycmVudExpbmUpKVxyXG5cclxuXHRcdGlmKG5lZWROZXdMaW5lKVxyXG5cdFx0XHRjb21wb3NlZC5wdXNoKHRoaXMuX25ld0xpbmUoKSlcclxuXHR9XHJcblxyXG5cdG9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpey8vbmVlZCBhcHBlbmQgbGFzdCBub24tZnVsbC13aWR0aCBsaW5lIHRvIHBhcmVudFxyXG5cdFx0dGhpcy5jb21taXRDdXJyZW50TGluZSgpXHJcblxyXG5cdFx0dGhpcy5hdmFpbGFibGVTcGFjZT17d2lkdGg6MCwgaGVpZ2h0OjB9XHJcblxyXG5cdFx0c3VwZXIub25BbGxDaGlsZHJlbkNvbXBvc2VkKClcclxuXHR9XHJcblxyXG4gICAgY3JlYXRlQ29tcG9zZWQyUGFyZW50KHByb3BzKXtcclxuICAgICAgICBsZXQge2hlaWdodCwgd2lkdGgsIHBhcmFncmFwaCwgLi4ub3RoZXJzfT1wcm9wc1xyXG4gICAgICAgIGxldCB7c3BhY2luZzp7bGluZUhlaWdodD1cIjEwMCVcIix0b3A9MCwgYm90dG9tPTB9LCBpbmRlbnQ6e2xlZnQ9MCxyaWdodD0wLGZpcnN0TGluZT0wLGhhbmdpbmc9MH19PXRoaXMuZ2V0U3R5bGUoKVxyXG4gICAgICAgIGxldCBjb250ZW50WT0wLCBjb250ZW50WD1sZWZ0XHJcblxyXG4gICAgICAgbGluZUhlaWdodD10eXBlb2YobGluZUhlaWdodCk9PSdzdHJpbmcnID8gTWF0aC5jZWlsKGhlaWdodCpwYXJzZUludChsaW5lSGVpZ2h0KS8xMDAuMCk6IGxpbmVIZWlnaHRcclxuXHJcbiAgICAgICAgaWYodGhpcy5jb21wdXRlZC5jb21wb3NlZC5sZW5ndGg9PTEpey8vZmlyc3QgbGluZVxyXG4gICAgICAgICAgICBsaW5lSGVpZ2h0Kz10b3BcclxuICAgICAgICAgICAgY29udGVudFkrPXRvcFxyXG5cdFx0XHRjb250ZW50WCs9Zmlyc3RMaW5lXHJcbiAgICAgICAgfWVsc2V7XHJcblx0XHRcdGNvbnRlbnRYKz1oYW5naW5nXHJcblx0XHR9XHJcblxyXG4gICAgICAgIGlmKHRoaXMuaXNBbGxDaGlsZHJlbkNvbXBvc2VkKCkpey8vbGFzdCBsaW5lXHJcbiAgICAgICAgICAgIGxpbmVIZWlnaHQrPWJvdHRvbVxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuYXZhaWxhYmxlU3BhY2UuaGVpZ2h0LT1saW5lSGVpZ2h0XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxHcm91cCBoZWlnaHQ9e2xpbmVIZWlnaHR9IHdpZHRoPXt3aWR0aH0+XHJcbiAgICAgICAgICAgICAgICA8R3JvdXAgeD17Y29udGVudFh9IHk9e2NvbnRlbnRZfT5cclxuICAgICAgICAgICAgICAgICAgICA8TGluZSB3aWR0aD17d2lkdGh9IGhlaWdodD17aGVpZ2h0fSB7Li4ub3RoZXJzfS8+XHJcbiAgICAgICAgICAgICAgICA8L0dyb3VwPlxyXG4gICAgICAgICAgICA8L0dyb3VwPlxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcbiAgICBnZXRTdHlsZSgpe1xyXG4gICAgICAgIGlmKHRoaXMuX3N0eWxlKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3R5bGVcclxuICAgICAgICBsZXQgc3BhY2luZz10aGlzLnN0eWxlKCdwUHIuc3BhY2luZycpfHx7fVxyXG4gICAgICAgIGxldCBpbmRlbnQ9dGhpcy5zdHlsZSgncFByLmluZCcpfHx7fVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdHlsZT17c3BhY2luZyxpbmRlbnR9XHJcbiAgICB9XHJcblxyXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xyXG5cdFx0Li4uU3VwZXIuY29udGV4dFR5cGVzXHJcblx0XHQsZ2V0RGVmYXVsdFN0eWxlOiBQcm9wVHlwZXMuZnVuY1xyXG5cdH1cclxufVxyXG5cclxuXHJcbmNsYXNzIExpbmVJbmZve1xyXG5cdGNvbnN0cnVjdG9yKHdpZHRoLHApe1xyXG5cdFx0dGhpcy5wYXJhZ3JhcGg9cFxyXG5cdFx0dGhpcy53aWR0aD13aWR0aFxyXG5cdFx0dGhpcy5jaGlsZHJlbj1bXVxyXG5cdH1cclxuXHJcblx0Z2V0IGhlaWdodCgpe1xyXG5cdFx0cmV0dXJuIHRoaXMuY2hpbGRyZW4ucmVkdWNlKChoLHtwcm9wczp7aGVpZ2h0fX0pPT5NYXRoLm1heChoLGhlaWdodCksMClcclxuXHR9XHJcblxyXG5cdGdldCBhdmFpbGFibGVXaWR0aCgpe1xyXG5cdFx0cmV0dXJuIHRoaXMuY2hpbGRyZW4ucmVkdWNlKCh3LHtwcm9wczp7d2lkdGh9fSk9Pnctd2lkdGgsdGhpcy53aWR0aClcclxuXHR9XHJcblxyXG5cdHJvbGxiYWNrKHt0eXBlfSl7XHJcblx0XHRsZXQgcmVtb3ZlZD1bXVxyXG5cdFx0Zm9yKGxldCBpPXRoaXMuY2hpbGRyZW4ubGVuZ3RoLTE7aT4tMTtpLS0pe1xyXG5cdFx0XHRsZXQgdGV4dD10aGlzLmNoaWxkcmVuW2ldXHJcblx0XHRcdGlmKHRleHQudHlwZSE9Q29tcG9zZWRUZXh0KVxyXG5cdFx0XHRcdGJyZWFrXHJcblx0XHRcdGxldCB7d2lkdGgsY2hpbGRyZW46cGllY2VzfT10ZXh0LnByb3BzXHJcblxyXG5cdFx0XHRsZXQgaj1waWVjZXMubGVuZ3RoLTFcclxuXHRcdFx0Zm9yKDtqPi0xO2otLSl7XHJcblx0XHRcdFx0bGV0IGNoYXJzPXBpZWNlc1tqXVxyXG5cdFx0XHRcdGlmKGNoYXJzLnR5cGUhPXR5cGUpe1xyXG5cdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmKGo9PS0xKXtcclxuXHRcdFx0XHRyZW1vdmVkLnVuc2hpZnQodGhpcy5jaGlsZHJlbi5wb3AoKSlcclxuXHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0fWVsc2UgaWYoaj09cGllY2VzLmxlbmd0aC0xKXtcclxuXHRcdFx0XHRicmVha1xyXG5cdFx0XHR9ZWxzZSB7XHJcblx0XHRcdFx0bGV0IHJlbW92ZWRQaWVjZXM9cGllY2VzLnNwbGljZShqKVxyXG5cdFx0XHRcdHRoaXMuY2hpbGRyZW5baV09UmVhY3QuY2xvbmVFbGVtZW50KHRleHQse2NoaWxkcmVuOnBpZWNlcywgd2lkdGg6cGllY2VzLnJlZHVjZSgodyx7d2lkdGh9KT0+dyt3aWR0aCwwKX0pXHJcblx0XHRcdFx0cmVtb3ZlZC51bnNoaWZ0KFJlYWN0LmNsb25lRWxlbWVudCh0ZXh0LHtjaGlsZHJlbjpyZW1vdmVkUGllY2VzLHdpZHRoOnJlbW92ZWRQaWVjZXMucmVkdWNlKCh3LHt3aWR0aH0pPT53K3dpZHRoLDApfSkpXHJcblx0XHRcdFx0YnJlYWtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMucGFyYWdyYXBoLmNvbW1pdEN1cnJlbnRMaW5lKHRydWUpXHJcblxyXG5cdFx0cmVtb3ZlZC5tYXAoYT0+dGhpcy5wYXJhZ3JhcGguYXBwZW5kQ29tcG9zZWQoYSkpXHJcblx0fVxyXG5cclxuXHRjb21taXQobmVlZE5ld0xpbmUpe1xyXG5cdFx0dGhpcy5wYXJhZ3JhcGguY29tbWl0Q3VycmVudExpbmUobmVlZE5ld0xpbmUpXHJcblx0fVxyXG5cclxuXHRjYW5TZXBlcmF0ZVdpdGgoe3R5cGV9KXtcclxuXHRcdGlmKHRoaXMuY2hpbGRyZW4ubGVuZ3RoPT0wKVxyXG5cdFx0XHRyZXR1cm4gdHJ1ZVxyXG5cclxuXHRcdGxldCB0ZXh0PXRoaXMuY2hpbGRyZW5bdGhpcy5jaGlsZHJlbi5sZW5ndGgtMV1cclxuXHRcdGxldCBwaWVjZXM9dGV4dC5wcm9wcy5jaGlsZHJlblxyXG5cdFx0bGV0IGxhc3RQaWVjZT1waWVjZXNbcGllY2VzLmxlbmd0aC0xXVxyXG5cdFx0cmV0dXJuIHR5cGUuY2FuU2VwZXJhdGVXaXRoICYmIHR5cGUuY2FuU2VwZXJhdGVXaXRoKGxhc3RQaWVjZS50eXBlKVxyXG5cdH1cclxuXHJcblx0YWxsQ2FudFNlcGVyYXRlV2l0aCh7dHlwZX0pe1xyXG5cdFx0cmV0dXJuIHRoaXMuY2hpbGRyZW4ucmVkdWNlKChjYW50U2VwZXJhdGUsdGV4dCk9PntcclxuXHRcdFx0aWYoIWNhbnRTZXBlcmF0ZSlcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2VcclxuXHJcblx0XHRcdHJldHVybiB0ZXh0LnByb3BzLmNoaWxkcmVuLnJlZHVjZSgoc3RhdGUsYSk9PntcclxuXHRcdFx0XHRpZighc3RhdGUpXHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2VcclxuXHRcdFx0XHRyZXR1cm4gIXR5cGUuY2FuU2VwZXJhdGVXaXRoIHx8ICF0eXBlLmNhblNlcGVyYXRlV2l0aChhLnR5cGUpXHJcblx0XHRcdH0sdHJ1ZSlcclxuXHJcblx0XHR9LHRydWUpXHJcblx0fVxyXG5cclxufVxyXG4iXX0=