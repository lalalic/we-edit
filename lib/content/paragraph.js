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

var _chars = require("./chars");

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3BhcmFncmFwaC5qcyJdLCJuYW1lcyI6WyJTdXBlciIsIlBhcmFncmFwaCIsImdldENvbnRlbnQiLCJMaW5lSW5mbyIsImxpbmVXaWR0aCIsImdldFN0eWxlIiwiaW5kZW50IiwibGVmdCIsInJpZ2h0IiwiZmlyc3RMaW5lIiwiaGFuZ2luZyIsIndpZHRoIiwiYXZhaWxhYmxlU3BhY2UiLCJjb21wdXRlZCIsImNvbXBvc2VkIiwibGVuZ3RoIiwicmVxdWlyZWQiLCJtaW5SZXF1aXJlZFciLCJOdW1iZXIiLCJNSU5fVkFMVUUiLCJoZWlnaHQiLCJtaW5SZXF1aXJlZEgiLCJzcGxpdGFibGUiLCJjb250ZXh0IiwicGFyZW50IiwibmV4dEF2YWlsYWJsZVNwYWNlIiwicHVzaCIsIl9uZXdMaW5lIiwiY3VycmVudExpbmUiLCJhdmFpbGFibGVXaWR0aCIsImJGaXJzdExpbmUiLCJiTGluZVN0YXJ0IiwibGluZSIsImNvbnRlbnQiLCJjb250ZW50V2lkdGgiLCJwcm9wcyIsImNoaWxkcmVuIiwidHlwZSIsImFibGVFeGNlZWQiLCJjb21taXRDdXJyZW50TGluZSIsImFwcGVuZENvbXBvc2VkIiwibmVlZE5ld0xpbmUiLCJjcmVhdGVDb21wb3NlZDJQYXJlbnQiLCJwYXJhZ3JhcGgiLCJvdGhlcnMiLCJzcGFjaW5nIiwibGluZUhlaWdodCIsInRvcCIsImJvdHRvbSIsImNvbnRlbnRZIiwiY29udGVudFgiLCJNYXRoIiwiY2VpbCIsInBhcnNlSW50IiwiaXNBbGxDaGlsZHJlbkNvbXBvc2VkIiwiX3N0eWxlIiwic3R5bGUiLCJkaXNwbGF5TmFtZSIsImNvbnRleHRUeXBlcyIsImdldERlZmF1bHRTdHlsZSIsImZ1bmMiLCJwIiwicmVtb3ZlZCIsImkiLCJ0ZXh0IiwicGllY2VzIiwiaiIsImNoYXJzIiwidW5zaGlmdCIsInBvcCIsInJlbW92ZWRQaWVjZXMiLCJzcGxpY2UiLCJjbG9uZUVsZW1lbnQiLCJyZWR1Y2UiLCJ3IiwibWFwIiwiYSIsImxhc3RQaWVjZSIsImNhblNlcGVyYXRlV2l0aCIsImNhbnRTZXBlcmF0ZSIsInN0YXRlIiwiaCIsIm1heCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBR0EsSUFBSUEsUUFBTSx5Q0FBVjs7SUFDcUJDLFM7Ozs7Ozs7Ozs7MkJBR1o7QUFDUCxVQUFPO0FBQUE7QUFBQTtBQUFJLFNBQUtDLFVBQUw7QUFBSixJQUFQO0FBQ0E7Ozs2QkFFUztBQUNILFVBQU8sSUFBSUMsUUFBSixDQUFhLEtBQUtDLFNBQUwsRUFBYixFQUE4QixJQUE5QixDQUFQO0FBQ047Ozs4QkFFVTtBQUFBLG1CQUM0QyxLQUFLQyxRQUFMLEVBRDVDO0FBQUEsb0NBQ0hDLE1BREc7QUFBQSxnREFDS0MsSUFETDtBQUFBLE9BQ0tBLElBREwseUNBQ1UsQ0FEVjtBQUFBLGdEQUNZQyxLQURaO0FBQUEsT0FDWUEsS0FEWix5Q0FDa0IsQ0FEbEI7QUFBQSxnREFDb0JDLFNBRHBCO0FBQUEsT0FDb0JBLFNBRHBCLHlDQUM4QixDQUQ5QjtBQUFBLGdEQUNnQ0MsT0FEaEM7QUFBQSxPQUNnQ0EsT0FEaEMseUNBQ3dDLENBRHhDOztBQUFBLE9BRUNDLEtBRkQsR0FFUSxLQUFLQyxjQUZiLENBRUNELEtBRkQ7O0FBR0pBLFlBQVFKLE9BQUtDLEtBQWI7QUFDQSxPQUFHLEtBQUtLLFFBQUwsQ0FBY0MsUUFBZCxDQUF1QkMsTUFBdkIsSUFBK0IsQ0FBbEMsRUFDSUosU0FBT0YsU0FBUCxDQURKLEtBR0lFLFNBQU9ELE9BQVA7QUFDVixVQUFPQyxLQUFQO0FBQ0E7Ozt1Q0FFaUM7QUFBQSxPQUFaSyxRQUFZLHVFQUFILEVBQUc7QUFBQSx5QkFDcUVBLFFBRHJFLENBQ3BCTCxLQURvQjtBQUFBLE9BQ2RNLFlBRGMsbUNBQ0RDLE9BQU9DLFNBRE47QUFBQSwwQkFDcUVILFFB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UUFBTCxDQUFjcUMsTUFBZCxDQUFxQixVQUFDTSxZQUFELEVBQWNmLElBQWQsRUFBcUI7QUFDaEQsUUFBRyxDQUFDZSxZQUFKLEVBQ0MsT0FBTyxLQUFQOztBQUVELFdBQU9mLEtBQUs3QixLQUFMLENBQVdDLFFBQVgsQ0FBb0JxQyxNQUFwQixDQUEyQixVQUFDTyxLQUFELEVBQU9KLENBQVAsRUFBVztBQUM1QyxTQUFHLENBQUNJLEtBQUosRUFDQyxPQUFPLEtBQVA7QUFDRCxZQUFPLENBQUMzQyxLQUFLeUMsZUFBTixJQUF5QixDQUFDekMsS0FBS3lDLGVBQUwsQ0FBcUJGLEVBQUV2QyxJQUF2QixDQUFqQztBQUNBLEtBSk0sRUFJTCxJQUpLLENBQVA7QUFNQSxJQVZNLEVBVUwsSUFWSyxDQUFQO0FBV0E7OztzQkFwRVc7QUFDWCxVQUFPLEtBQUtELFFBQUwsQ0FBY3FDLE1BQWQsQ0FBcUIsVUFBQ1EsQ0FBRDtBQUFBLFFBQVc3RCxNQUFYLFNBQUllLEtBQUosQ0FBV2YsTUFBWDtBQUFBLFdBQXNCK0IsS0FBSytCLEdBQUwsQ0FBU0QsQ0FBVCxFQUFXN0QsTUFBWCxDQUF0QjtBQUFBLElBQXJCLEVBQThELENBQTlELENBQVA7QUFDQTs7O3NCQUVtQjtBQUNuQixVQUFPLEtBQUtnQixRQUFMLENBQWNxQyxNQUFkLENBQXFCLFVBQUNDLENBQUQ7QUFBQSxRQUFXL0QsS0FBWCxTQUFJd0IsS0FBSixDQUFXeEIsS0FBWDtBQUFBLFdBQXFCK0QsSUFBRS9ELEtBQXZCO0FBQUEsSUFBckIsRUFBa0QsS0FBS0EsS0FBdkQsQ0FBUDtBQUNBIiwiZmlsZSI6InBhcmFncmFwaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgQW55LCB7c3R5bGVJbmhlcml0YWJsZX0gZnJvbSBcIi4vYW55XCJcclxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXHJcbmltcG9ydCBMaW5lIGZyb20gXCIuLi9jb21wb3NlZC9saW5lXCJcclxuaW1wb3J0IENvbXBvc2VkVGV4dCBmcm9tIFwiLi4vY29tcG9zZWQvdGV4dFwiXHJcblxyXG5pbXBvcnQgSW5saW5lIGZyb20gXCIuL2lubGluZVwiXHJcbmltcG9ydCBUZXh0IGZyb20gXCIuL3RleHRcIlxyXG5pbXBvcnQge2lzVGV4dH0gZnJvbSBcIi4vY2hhcnNcIlxyXG5cclxuXHJcbmxldCBTdXBlcj1zdHlsZUluaGVyaXRhYmxlKEFueSlcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFyYWdyYXBoIGV4dGVuZHMgU3VwZXJ7XHJcblx0c3RhdGljIGRpc3BsYXlOYW1lPVwicGFyYWdyYXBoXCJcclxuXHJcblx0cmVuZGVyKCl7XHJcblx0XHRyZXR1cm4gPHA+e3RoaXMuZ2V0Q29udGVudCgpfTwvcD5cdFxyXG5cdH1cclxuXHRcclxuXHRfbmV3TGluZSgpe1xyXG4gICAgICAgIHJldHVybiBuZXcgTGluZUluZm8odGhpcy5saW5lV2lkdGgoKSx0aGlzKVxyXG5cdH1cclxuXHJcblx0bGluZVdpZHRoKCl7XHJcblx0XHRjb25zdCB7aW5kZW50OntsZWZ0PTAscmlnaHQ9MCxmaXJzdExpbmU9MCxoYW5naW5nPTB9fT10aGlzLmdldFN0eWxlKClcclxuICAgICAgICBsZXQge3dpZHRofT10aGlzLmF2YWlsYWJsZVNwYWNlXHJcbiAgICAgICAgd2lkdGgtPShsZWZ0K3JpZ2h0KVxyXG4gICAgICAgIGlmKHRoaXMuY29tcHV0ZWQuY29tcG9zZWQubGVuZ3RoPT0wKVxyXG4gICAgICAgICAgICB3aWR0aC09Zmlyc3RMaW5lXHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB3aWR0aC09aGFuZ2luZ1xyXG5cdFx0cmV0dXJuIHdpZHRoXHJcblx0fVxyXG5cclxuICAgIG5leHRBdmFpbGFibGVTcGFjZShyZXF1aXJlZD17fSl7XHJcbiAgICAgICAgY29uc3Qge3dpZHRoOm1pblJlcXVpcmVkVz1OdW1iZXIuTUlOX1ZBTFVFLGhlaWdodDptaW5SZXF1aXJlZEg9TnVtYmVyLk1JTl9WQUxVRSxzcGxpdGFibGU9dHJ1ZX09cmVxdWlyZWRcclxuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXMuY29tcHV0ZWRcclxuXHRcdGlmKDA9PWNvbXBvc2VkLmxlbmd0aCl7XHJcblx0XHRcdGxldCB7d2lkdGgsaGVpZ2h0fT10aGlzLmNvbnRleHQucGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZShyZXF1aXJlZClcclxuXHRcdFx0dGhpcy5hdmFpbGFibGVTcGFjZT17d2lkdGgsaGVpZ2h0fVxyXG5cdFx0XHRjb21wb3NlZC5wdXNoKHRoaXMuX25ld0xpbmUoKSlcclxuXHRcdH1cclxuICAgICAgICBsZXQgY3VycmVudExpbmU9Y29tcG9zZWRbY29tcG9zZWQubGVuZ3RoLTFdXHJcblxyXG4gICAgICAgIGxldCB7d2lkdGgsYXZhaWxhYmxlV2lkdGh9PWN1cnJlbnRMaW5lXHJcbiAgICAgICAgaWYoYXZhaWxhYmxlV2lkdGg8bWluUmVxdWlyZWRXIHx8IHRoaXMuYXZhaWxhYmxlU3BhY2UuaGVpZ2h0PG1pblJlcXVpcmVkSCl7XHJcblx0XHRcdGlmKHRoaXMuYXZhaWxhYmxlU3BhY2UuaGVpZ2h0PG1pblJlcXVpcmVkSClcclxuXHRcdFx0XHR0aGlzLmF2YWlsYWJsZVNwYWNlPXRoaXMuY29udGV4dC5wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkKVxyXG5cclxuXHRcdFx0YXZhaWxhYmxlV2lkdGg9dGhpcy5saW5lV2lkdGgoKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge1xyXG5cdFx0XHR3aWR0aDphdmFpbGFibGVXaWR0aCwgXHJcblx0XHRcdGhlaWdodDp0aGlzLmF2YWlsYWJsZVNwYWNlLmhlaWdodCwgXHJcblx0XHRcdGJGaXJzdExpbmU6IGNvbXBvc2VkLmxlbmd0aDwyLFxyXG5cdFx0XHRiTGluZVN0YXJ0OiBhdmFpbGFibGVXaWR0aD09dGhpcy5hdmFpbGFibGVTcGFjZS53aWR0aCxcclxuXHRcdFx0bGluZTogY3VycmVudExpbmVcclxuXHRcdH1cclxuICAgIH1cclxuXHJcbiAgICBhcHBlbmRDb21wb3NlZChjb250ZW50KXsvL0BUT0RPOiBuZWVkIGNvbnNpZGVyIGF2YWlsYWJsZVNwYWNlLmhlaWdodFxyXG4gICAgICAgIGNvbnN0IHtjb21wb3NlZH09dGhpcy5jb21wdXRlZFxyXG4gICAgICAgIGNvbnN0IHtwYXJlbnR9PXRoaXMuY29udGV4dFxyXG5cclxuXHRcdGxldCBjdXJyZW50TGluZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cclxuICAgICAgICBsZXQgYXZhaWxhYmxlV2lkdGg9Y3VycmVudExpbmUuYXZhaWxhYmxlV2lkdGhcclxuICAgICAgICBsZXQge3dpZHRoOmNvbnRlbnRXaWR0aH09Y29udGVudC5wcm9wc1xyXG5cdFx0XHJcblx0XHRpZihhdmFpbGFibGVXaWR0aD49Y29udGVudFdpZHRoKXtcclxuICAgICAgICAgIGN1cnJlbnRMaW5lLmNoaWxkcmVuLnB1c2goY29udGVudClcclxuXHRcdH1lbHNlIGlmKGF2YWlsYWJsZVdpZHRoPGNvbnRlbnRXaWR0aCl7XHJcblx0XHRcdGlmKGNvbnRlbnQudHlwZS5hYmxlRXhjZWVkICYmIFxyXG5cdFx0XHRcdGNvbnRlbnQudHlwZS5hYmxlRXhjZWVkKGNvbnRlbnQucHJvcHMuY2hpbGRyZW4pKXtcclxuXHRcdFx0XHRjdXJyZW50TGluZS5jaGlsZHJlbi5wdXNoKGNvbnRlbnQpXHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdHRoaXMuY29tbWl0Q3VycmVudExpbmUodHJ1ZSlcclxuXHRcdFx0XHR0aGlzLmFwcGVuZENvbXBvc2VkKGNvbnRlbnQpXHJcblx0XHRcdH1cclxuXHRcdH1cclxuICAgIH1cclxuXHRcclxuXHRjb21taXRDdXJyZW50TGluZShuZWVkTmV3TGluZT1mYWxzZSl7XHJcblx0XHRjb25zdCB7Y29tcG9zZWR9PXRoaXMuY29tcHV0ZWRcclxuXHRcdGNvbnN0IHtwYXJlbnR9PXRoaXMuY29udGV4dFxyXG5cdFx0bGV0IGN1cnJlbnRMaW5lPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxyXG5cdFx0XHJcblx0XHRwYXJlbnQuYXBwZW5kQ29tcG9zZWQodGhpcy5jcmVhdGVDb21wb3NlZDJQYXJlbnQoY3VycmVudExpbmUpKVxyXG5cdFx0XHJcblx0XHRpZihuZWVkTmV3TGluZSlcclxuXHRcdFx0Y29tcG9zZWQucHVzaCh0aGlzLl9uZXdMaW5lKCkpXHJcblx0fVxyXG5cclxuXHRvbkFsbENoaWxkcmVuQ29tcG9zZWQoKXsvL25lZWQgYXBwZW5kIGxhc3Qgbm9uLWZ1bGwtd2lkdGggbGluZSB0byBwYXJlbnRcclxuXHRcdHRoaXMuY29tbWl0Q3VycmVudExpbmUoKVxyXG5cdFx0XHJcblx0XHR0aGlzLmF2YWlsYWJsZVNwYWNlPXt3aWR0aDowLCBoZWlnaHQ6MH1cclxuXHJcblx0XHRzdXBlci5vbkFsbENoaWxkcmVuQ29tcG9zZWQoKVxyXG5cdH1cclxuXHJcbiAgICBjcmVhdGVDb21wb3NlZDJQYXJlbnQocHJvcHMpe1xyXG4gICAgICAgIGxldCB7aGVpZ2h0LCB3aWR0aCwgcGFyYWdyYXBoLCAuLi5vdGhlcnN9PXByb3BzXHJcbiAgICAgICAgbGV0IHtzcGFjaW5nOntsaW5lSGVpZ2h0PVwiMTAwJVwiLHRvcD0wLCBib3R0b209MH0sIGluZGVudDp7bGVmdD0wLHJpZ2h0PTAsZmlyc3RMaW5lPTAsaGFuZ2luZz0wfX09dGhpcy5nZXRTdHlsZSgpXHJcbiAgICAgICAgbGV0IGNvbnRlbnRZPTAsIGNvbnRlbnRYPWxlZnRcclxuXHJcbiAgICAgICBsaW5lSGVpZ2h0PXR5cGVvZihsaW5lSGVpZ2h0KT09J3N0cmluZycgPyBNYXRoLmNlaWwoaGVpZ2h0KnBhcnNlSW50KGxpbmVIZWlnaHQpLzEwMC4wKTogbGluZUhlaWdodFxyXG5cclxuICAgICAgICBpZih0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLmxlbmd0aD09MSl7Ly9maXJzdCBsaW5lXHJcbiAgICAgICAgICAgIGxpbmVIZWlnaHQrPXRvcFxyXG4gICAgICAgICAgICBjb250ZW50WSs9dG9wXHJcblx0XHRcdGNvbnRlbnRYKz1maXJzdExpbmVcclxuICAgICAgICB9ZWxzZXtcclxuXHRcdFx0Y29udGVudFgrPWhhbmdpbmdcclxuXHRcdH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5pc0FsbENoaWxkcmVuQ29tcG9zZWQoKSl7Ly9sYXN0IGxpbmVcclxuICAgICAgICAgICAgbGluZUhlaWdodCs9Ym90dG9tXHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5hdmFpbGFibGVTcGFjZS5oZWlnaHQtPWxpbmVIZWlnaHRcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPEdyb3VwIGhlaWdodD17bGluZUhlaWdodH0gd2lkdGg9e3dpZHRofT5cclxuICAgICAgICAgICAgICAgIDxHcm91cCB4PXtjb250ZW50WH0geT17Y29udGVudFl9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxMaW5lIHdpZHRoPXt3aWR0aH0gaGVpZ2h0PXtoZWlnaHR9IHsuLi5vdGhlcnN9Lz5cclxuICAgICAgICAgICAgICAgIDwvR3JvdXA+XHJcbiAgICAgICAgICAgIDwvR3JvdXA+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIGdldFN0eWxlKCl7XHJcbiAgICAgICAgaWYodGhpcy5fc3R5bGUpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdHlsZVxyXG4gICAgICAgIGxldCBzcGFjaW5nPXRoaXMuc3R5bGUoJ3BQci5zcGFjaW5nJyl8fHt9XHJcbiAgICAgICAgbGV0IGluZGVudD10aGlzLnN0eWxlKCdwUHIuaW5kJyl8fHt9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0eWxlPXtzcGFjaW5nLGluZGVudH1cclxuICAgIH1cclxuXHJcblx0c3RhdGljIGNvbnRleHRUeXBlcz17XHJcblx0XHQuLi5TdXBlci5jb250ZXh0VHlwZXNcclxuXHRcdCxnZXREZWZhdWx0U3R5bGU6IFByb3BUeXBlcy5mdW5jXHJcblx0fVxyXG59XHJcblxyXG5cclxuY2xhc3MgTGluZUluZm97XHJcblx0Y29uc3RydWN0b3Iod2lkdGgscCl7XHJcblx0XHR0aGlzLnBhcmFncmFwaD1wXHJcblx0XHR0aGlzLndpZHRoPXdpZHRoXHJcblx0XHR0aGlzLmNoaWxkcmVuPVtdXHJcblx0fVxyXG5cdFxyXG5cdGdldCBoZWlnaHQoKXtcclxuXHRcdHJldHVybiB0aGlzLmNoaWxkcmVuLnJlZHVjZSgoaCx7cHJvcHM6e2hlaWdodH19KT0+TWF0aC5tYXgoaCxoZWlnaHQpLDApXHJcblx0fVxyXG5cdFxyXG5cdGdldCBhdmFpbGFibGVXaWR0aCgpe1xyXG5cdFx0cmV0dXJuIHRoaXMuY2hpbGRyZW4ucmVkdWNlKCh3LHtwcm9wczp7d2lkdGh9fSk9Pnctd2lkdGgsdGhpcy53aWR0aClcclxuXHR9XHJcblx0XHJcblx0cm9sbGJhY2soe3R5cGV9KXtcclxuXHRcdGxldCByZW1vdmVkPVtdXHJcblx0XHRmb3IobGV0IGk9dGhpcy5jaGlsZHJlbi5sZW5ndGgtMTtpPi0xO2ktLSl7XHJcblx0XHRcdGxldCB0ZXh0PXRoaXMuY2hpbGRyZW5baV1cclxuXHRcdFx0aWYodGV4dC50eXBlIT1Db21wb3NlZFRleHQpXHJcblx0XHRcdFx0YnJlYWtcclxuXHRcdFx0bGV0IHt3aWR0aCxjaGlsZHJlbjpwaWVjZXN9PXRleHQucHJvcHNcclxuXHJcblx0XHRcdGxldCBqPXBpZWNlcy5sZW5ndGgtMSBcclxuXHRcdFx0Zm9yKDtqPi0xO2otLSl7XHJcblx0XHRcdFx0bGV0IGNoYXJzPXBpZWNlc1tqXVxyXG5cdFx0XHRcdGlmKGNoYXJzLnR5cGUhPXR5cGUpe1xyXG5cdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdGlmKGo9PS0xKXtcclxuXHRcdFx0XHRyZW1vdmVkLnVuc2hpZnQodGhpcy5jaGlsZHJlbi5wb3AoKSlcclxuXHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0fWVsc2UgaWYoaj09cGllY2VzLmxlbmd0aC0xKXtcclxuXHRcdFx0XHRicmVha1xyXG5cdFx0XHR9ZWxzZSB7XHJcblx0XHRcdFx0bGV0IHJlbW92ZWRQaWVjZXM9cGllY2VzLnNwbGljZShqKVxyXG5cdFx0XHRcdHRoaXMuY2hpbGRyZW5baV09UmVhY3QuY2xvbmVFbGVtZW50KHRleHQse2NoaWxkcmVuOnBpZWNlcywgd2lkdGg6cGllY2VzLnJlZHVjZSgodyx7d2lkdGh9KT0+dyt3aWR0aCwwKX0pXHJcblx0XHRcdFx0cmVtb3ZlZC51bnNoaWZ0KFJlYWN0LmNsb25lRWxlbWVudCh0ZXh0LHtjaGlsZHJlbjpyZW1vdmVkUGllY2VzLHdpZHRoOnJlbW92ZWRQaWVjZXMucmVkdWNlKCh3LHt3aWR0aH0pPT53K3dpZHRoLDApfSkpXHJcblx0XHRcdFx0YnJlYWtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMucGFyYWdyYXBoLmNvbW1pdEN1cnJlbnRMaW5lKHRydWUpXHJcblx0XHRcclxuXHRcdHJlbW92ZWQubWFwKGE9PnRoaXMucGFyYWdyYXBoLmFwcGVuZENvbXBvc2VkKGEpKVxyXG5cdH1cclxuXHRcclxuXHRjb21taXQobmVlZE5ld0xpbmUpe1xyXG5cdFx0dGhpcy5wYXJhZ3JhcGguY29tbWl0Q3VycmVudExpbmUobmVlZE5ld0xpbmUpXHJcblx0fVxyXG5cdFxyXG5cdGNhblNlcGVyYXRlV2l0aCh7dHlwZX0pe1xyXG5cdFx0aWYodGhpcy5jaGlsZHJlbi5sZW5ndGg9PTApXHJcblx0XHRcdHJldHVybiB0cnVlXHJcblx0XHRcclxuXHRcdGxldCB0ZXh0PXRoaXMuY2hpbGRyZW5bdGhpcy5jaGlsZHJlbi5sZW5ndGgtMV1cclxuXHRcdGxldCBwaWVjZXM9dGV4dC5wcm9wcy5jaGlsZHJlblxyXG5cdFx0bGV0IGxhc3RQaWVjZT1waWVjZXNbcGllY2VzLmxlbmd0aC0xXVxyXG5cdFx0cmV0dXJuIHR5cGUuY2FuU2VwZXJhdGVXaXRoICYmIHR5cGUuY2FuU2VwZXJhdGVXaXRoKGxhc3RQaWVjZS50eXBlKVxyXG5cdH1cclxuXHRcclxuXHRhbGxDYW50U2VwZXJhdGVXaXRoKHt0eXBlfSl7XHJcblx0XHRyZXR1cm4gdGhpcy5jaGlsZHJlbi5yZWR1Y2UoKGNhbnRTZXBlcmF0ZSx0ZXh0KT0+e1xyXG5cdFx0XHRpZighY2FudFNlcGVyYXRlKVxyXG5cdFx0XHRcdHJldHVybiBmYWxzZVxyXG5cdFx0XHRcclxuXHRcdFx0cmV0dXJuIHRleHQucHJvcHMuY2hpbGRyZW4ucmVkdWNlKChzdGF0ZSxhKT0+e1xyXG5cdFx0XHRcdGlmKCFzdGF0ZSlcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZVxyXG5cdFx0XHRcdHJldHVybiAhdHlwZS5jYW5TZXBlcmF0ZVdpdGggfHwgIXR5cGUuY2FuU2VwZXJhdGVXaXRoKGEudHlwZSlcclxuXHRcdFx0fSx0cnVlKVxyXG5cdFx0XHRcclxuXHRcdH0sdHJ1ZSlcclxuXHR9XHJcblx0XHJcbn1cclxuIl19