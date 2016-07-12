"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

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

var _inline = require("./inline");

var _inline2 = _interopRequireDefault(_inline);

var _text = require("./text");

var _text2 = _interopRequireDefault(_text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Super = (0, _any.styleInheritable)(_any2.default);

var Paragraph = function (_Super) {
	_inherits(Paragraph, _Super);

	function Paragraph() {
		_classCallCheck(this, Paragraph);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Paragraph).apply(this, arguments));

		var content = _this.state.content;

		if (content.length == 0) {
			_this.whatIfEmpty();
		}
		return _this;
	}

	_createClass(Paragraph, [{
		key: "whatIfEmpty",
		value: function whatIfEmpty() {
			this.state.content.push(_react2.default.createElement(
				_inline2.default,
				{ contentStyle: this.context.getDefaultStyle("inline") },
				_react2.default.createElement(
					_text2.default,
					null,
					" "
				)
			));
		}
	}, {
		key: "_newLine",
		value: function _newLine() {
			var _getStyle = this.getStyle();

			var _getStyle$indent = _getStyle.indent;
			var _getStyle$indent$left = _getStyle$indent.left;
			var left = _getStyle$indent$left === undefined ? 0 : _getStyle$indent$left;
			var _getStyle$indent$righ = _getStyle$indent.right;
			var right = _getStyle$indent$righ === undefined ? 0 : _getStyle$indent$righ;
			var _getStyle$indent$firs = _getStyle$indent.firstLine;
			var firstLine = _getStyle$indent$firs === undefined ? 0 : _getStyle$indent$firs;
			var _getStyle$indent$hang = _getStyle$indent.hanging;
			var hanging = _getStyle$indent$hang === undefined ? 0 : _getStyle$indent$hang;
			var width = this.availableSpace.width;

			width -= left + right;
			if (this.composed.length == 0) width -= firstLine;else width -= hanging;

			return {
				width: width,
				height: 0,
				children: []
			};
		}
	}, {
		key: "nextAvailableSpace",
		value: function nextAvailableSpace() {
			var required = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
			var _required$width = required.width;
			var minRequiredW = _required$width === undefined ? 0 : _required$width;
			var _required$height = required.height;
			var minRequiredH = _required$height === undefined ? 0 : _required$height;
			var composed = this.composed;

			if (0 == composed.length) {
				var _context$parent$nextA = this.context.parent.nextAvailableSpace();

				var _width = _context$parent$nextA.width;
				var height = _context$parent$nextA.height;

				this.availableSpace = { width: _width, height: height };
				composed.push(this._newLine());
			}
			var currentLine = composed[composed.length - 1];

			var width = currentLine.width;

			var availableWidth = currentLine.children.reduce(function (prev, a) {
				return prev - a.props.width;
			}, width);
			if (availableWidth <= minRequiredW) {
				if (this.availableSpace.height > minRequiredH) {
					return { width: width, height: this.availableSpace.height };
				} else {
					return this.availableSpace = this.context.parent.nextAvailableSpace(required);
				}
			}
			return { width: availableWidth, height: this.availableSpace.height };
		}
	}, {
		key: "appendComposed",
		value: function appendComposed(content) {
			//@TODO: need consider availableSpace
			var composed = this.composed;
			var parent = this.context.parent;


			var currentLine = composed[composed.length - 1];
			var availableWidth = currentLine.children.reduce(function (prev, a) {
				return prev - a.props.width;
			}, currentLine.width);
			var _content$props = content.props;
			var contentWidth = _content$props.width;
			var contentHeight = _content$props.height;


			var piece = null;
			if (availableWidth == 0) {
				composed.push(this._newLine());
				this.appendComposed(content);
			} else if (availableWidth >= contentWidth) {
				//not appended to parent
				piece = _react2.default.createElement(
					_group2.default,
					{
						x: currentLine.width - availableWidth,
						index: this.children.length,
						width: contentWidth,
						height: contentHeight },
					content
				);
				currentLine.children.push(piece);
				currentLine.height = Math.max(currentLine.height, contentHeight);
				if (availableWidth == contentWidth) {
					parent.appendComposed(this.createLine(currentLine));
					this.availableSpace.height -= currentLine.height;
				}
			} else if (availableWidth < contentWidth) {
				if (this.availableSpace.height >= currentLine.height) {
					parent.appendComposed(this.createLine(currentLine));
					composed.push(this._newLine());

					if (contentWidth <= this.availableSpace.width) this.appendComposed(content);else {
						//never be here
					}
				} else {}
			}
		}
	}, {
		key: "onAllChildrenComposed",
		value: function onAllChildrenComposed() {
			//need append last non-full-width line to parent
			var composed = this.composed;
			var parent = this.context.parent;


			var currentLine = composed[composed.length - 1];
			var availableWidth = currentLine.children.reduce(function (prev, a) {
				return prev - a.props.width;
			}, currentLine.width);
			if (availableWidth > 0) {
				parent.appendComposed(this.createLine(currentLine));
			} else if (availableWidth == 0) {
				//already appended to parent in appendComposed
			}

			this.availableSpace = { width: 0, height: 0 };

			_get(Object.getPrototypeOf(Paragraph.prototype), "onAllChildrenComposed", this).call(this);
		}
	}, {
		key: "createLine",
		value: function createLine(props) {
			var height = props.height;
			var width = props.width;

			var _getStyle2 = this.getStyle();

			var _getStyle2$spacing = _getStyle2.spacing;
			var _getStyle2$spacing$li = _getStyle2$spacing.lineHeight;
			var lineHeight = _getStyle2$spacing$li === undefined ? "100%" : _getStyle2$spacing$li;
			var _getStyle2$spacing$to = _getStyle2$spacing.top;
			var top = _getStyle2$spacing$to === undefined ? 0 : _getStyle2$spacing$to;
			var _getStyle2$spacing$bo = _getStyle2$spacing.bottom;
			var bottom = _getStyle2$spacing$bo === undefined ? 0 : _getStyle2$spacing$bo;

			_objectDestructuringEmpty(_getStyle2.indent);

			var contentY = 0;

			lineHeight = typeof lineHeight == 'string' ? Math.ceil(height * parseInt(lineHeight) / 100.0) : lineHeight;

			if (this.composed.length == 0) {
				lineHeight += top;
				contentY += top;
			}

			if (this.isAllChildrenComposed()) lineHeight += bottom;

			return _react2.default.createElement(
				_group2.default,
				{ height: lineHeight, width: width },
				_react2.default.createElement(
					_group2.default,
					{ y: contentY },
					_react2.default.createElement(_line2.default, props)
				)
			);
		}
	}, {
		key: "getStyle",
		value: function getStyle() {
			if (this._style) return this._style;
			var spacing = this.style('paragraph.spacing') || {};
			var indent = this.style('paragraph.ind') || {};
			return this._style = { spacing: spacing, indent: indent };
		}
	}]);

	return Paragraph;
}(Super);

Paragraph.displayName = "paragraph";
Paragraph.contextTypes = Object.assign({
	getDefaultStyle: _react.PropTypes.func
}, Super.contextTypes);
exports.default = Paragraph;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3BhcmFncmFwaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztBQUVBLElBQUksUUFBTSx5Q0FBTjs7SUFDaUI7OztBQUVwQixVQUZvQixTQUVwQixHQUFhO3dCQUZPLFdBRVA7O3FFQUZPLHVCQUdWLFlBREc7O01BRUwsVUFBUyxNQUFLLEtBQUwsQ0FBVCxRQUZLOztBQUdaLE1BQUcsUUFBUSxNQUFSLElBQWdCLENBQWhCLEVBQWtCO0FBQ3BCLFNBQUssV0FBTCxHQURvQjtHQUFyQjtlQUhZO0VBQWI7O2NBRm9COztnQ0FVUDtBQUNaLFFBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsSUFBbkIsQ0FBd0I7O01BQVEsY0FBYyxLQUFLLE9BQUwsQ0FBYSxlQUFiLENBQTZCLFFBQTdCLENBQWQsRUFBUjtJQUE4RDs7OztLQUE5RDtJQUF4QixFQURZOzs7OzZCQUlIO21CQUNtRCxLQUFLLFFBQUwsR0FEbkQ7O29DQUNJLE9BREo7Z0RBQ1ksS0FEWjtPQUNZLDZDQUFLLDBCQURqQjtnREFDbUIsTUFEbkI7T0FDbUIsOENBQU0sMEJBRHpCO2dEQUMyQixVQUQzQjtPQUMyQixrREFBVSwwQkFEckM7Z0RBQ3VDLFFBRHZDO09BQ3VDLGdEQUFRLDBCQUQvQztPQUVFLFFBQU8sS0FBSyxjQUFMLENBQVAsTUFGRjs7QUFHSCxZQUFRLE9BQUssS0FBTCxDQUhMO0FBSUgsT0FBRyxLQUFLLFFBQUwsQ0FBYyxNQUFkLElBQXNCLENBQXRCLEVBQ0MsU0FBTyxTQUFQLENBREosS0FHSSxTQUFPLE9BQVAsQ0FISjs7QUFLQSxVQUFPO0FBQ0gsZ0JBREc7QUFFWixZQUFPLENBQVA7QUFDUyxjQUFTLEVBQVQ7SUFISixDQVRHOzs7O3VDQWdCd0I7T0FBWixpRUFBUyxrQkFBRzt5QkFDd0IsU0FBNUMsTUFEb0I7T0FDZCwrQ0FB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QUFTLFVBQVQsQ0FBUCxHQUE0QixLQUE1QixDQUF6QyxHQUE2RSxVQUE3RSxDQUxFOztBQU9iLE9BQUcsS0FBSyxRQUFMLENBQWMsTUFBZCxJQUFzQixDQUF0QixFQUF3QjtBQUN2QixrQkFBWSxHQUFaLENBRHVCO0FBRXZCLGdCQUFVLEdBQVYsQ0FGdUI7SUFBM0I7O0FBS0EsT0FBRyxLQUFLLHFCQUFMLEVBQUgsRUFDSSxjQUFZLE1BQVosQ0FESjs7QUFHQSxVQUNJOztNQUFPLFFBQVEsVUFBUixFQUFvQixPQUFPLEtBQVAsRUFBM0I7SUFDSTs7T0FBTyxHQUFHLFFBQUgsRUFBUDtLQUNJLDhDQUFVLEtBQVYsQ0FESjtLQURKO0lBREosQ0FmYTs7Ozs2QkF3QlA7QUFDTixPQUFHLEtBQUssTUFBTCxFQUNDLE9BQU8sS0FBSyxNQUFMLENBRFg7QUFFQSxPQUFJLFVBQVEsS0FBSyxLQUFMLENBQVcsbUJBQVgsS0FBaUMsRUFBakMsQ0FITjtBQUlOLE9BQUksU0FBTyxLQUFLLEtBQUwsQ0FBVyxlQUFYLEtBQTZCLEVBQTdCLENBSkw7QUFLTixVQUFPLEtBQUssTUFBTCxHQUFZLEVBQUMsZ0JBQUQsRUFBUyxjQUFULEVBQVosQ0FMRDs7OztRQTFJTztFQUFrQjs7QUFBbEIsVUFDYixjQUFZO0FBREMsVUFvSmIsZUFBYSxPQUFPLE1BQVAsQ0FBYztBQUNqQyxrQkFBaUIsaUJBQVUsSUFBVjtDQURFLEVBRWxCLE1BQU0sWUFBTjtrQkF0SmtCIiwiZmlsZSI6InBhcmFncmFwaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IEFueSwge3N0eWxlSW5oZXJpdGFibGV9IGZyb20gXCIuL2FueVwiXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcbmltcG9ydCBMaW5lIGZyb20gXCIuLi9jb21wb3NlZC9saW5lXCJcblxuaW1wb3J0IElubGluZSBmcm9tIFwiLi9pbmxpbmVcIlxuaW1wb3J0IFRleHQgZnJvbSBcIi4vdGV4dFwiXG5cbmxldCBTdXBlcj1zdHlsZUluaGVyaXRhYmxlKEFueSlcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhcmFncmFwaCBleHRlbmRzIFN1cGVye1xuXHRzdGF0aWMgZGlzcGxheU5hbWU9XCJwYXJhZ3JhcGhcIlxuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHRjb25zdCB7Y29udGVudH09dGhpcy5zdGF0ZVxuXHRcdGlmKGNvbnRlbnQubGVuZ3RoPT0wKXtcblx0XHRcdHRoaXMud2hhdElmRW1wdHkoKVxuXHRcdH1cblx0fVxuXG5cdHdoYXRJZkVtcHR5KCl7XG5cdFx0dGhpcy5zdGF0ZS5jb250ZW50LnB1c2goPElubGluZSBjb250ZW50U3R5bGU9e3RoaXMuY29udGV4dC5nZXREZWZhdWx0U3R5bGUoXCJpbmxpbmVcIil9PjxUZXh0PiA8L1RleHQ+PC9JbmxpbmU+KVxuXHR9XG5cblx0X25ld0xpbmUoKXtcbiAgICAgICAgY29uc3Qge2luZGVudDp7bGVmdD0wLHJpZ2h0PTAsZmlyc3RMaW5lPTAsaGFuZ2luZz0wfX09dGhpcy5nZXRTdHlsZSgpXG4gICAgICAgIGxldCB7d2lkdGh9PXRoaXMuYXZhaWxhYmxlU3BhY2VcbiAgICAgICAgd2lkdGgtPShsZWZ0K3JpZ2h0KVxuICAgICAgICBpZih0aGlzLmNvbXBvc2VkLmxlbmd0aD09MClcbiAgICAgICAgICAgIHdpZHRoLT1maXJzdExpbmVcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgd2lkdGgtPWhhbmdpbmdcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd2lkdGgsXG5cdFx0XHRoZWlnaHQ6MCxcbiAgICAgICAgICAgIGNoaWxkcmVuOltdXG4gICAgICAgIH1cblx0fVxuXG4gICAgbmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkPXt9KXtcbiAgICAgICAgY29uc3Qge3dpZHRoOm1pblJlcXVpcmVkVz0wLGhlaWdodDptaW5SZXF1aXJlZEg9MH09cmVxdWlyZWRcbiAgICAgICAgY29uc3Qge2NvbXBvc2VkfT10aGlzXG5cdFx0aWYoMD09Y29tcG9zZWQubGVuZ3RoKXtcblx0XHRcdGxldCB7d2lkdGgsaGVpZ2h0fT10aGlzLmNvbnRleHQucGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZSgpXG5cdFx0XHR0aGlzLmF2YWlsYWJsZVNwYWNlPXt3aWR0aCxoZWlnaHR9XG5cdFx0XHRjb21wb3NlZC5wdXNoKHRoaXMuX25ld0xpbmUoKSlcblx0XHR9XG4gICAgICAgIGxldCBjdXJyZW50TGluZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cblxuICAgICAgICBsZXQge3dpZHRofT1jdXJyZW50TGluZVxuICAgICAgICBsZXQgYXZhaWxhYmxlV2lkdGg9Y3VycmVudExpbmUuY2hpbGRyZW4ucmVkdWNlKChwcmV2LGEpPT5wcmV2LWEucHJvcHMud2lkdGgsd2lkdGgpXG4gICAgICAgIGlmKGF2YWlsYWJsZVdpZHRoPD1taW5SZXF1aXJlZFcpe1xuXHRcdFx0aWYodGhpcy5hdmFpbGFibGVTcGFjZS5oZWlnaHQ+bWluUmVxdWlyZWRIKXtcblx0XHRcdFx0cmV0dXJuIHt3aWR0aCwgaGVpZ2h0OnRoaXMuYXZhaWxhYmxlU3BhY2UuaGVpZ2h0fVxuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHJldHVybiB0aGlzLmF2YWlsYWJsZVNwYWNlPXRoaXMuY29udGV4dC5wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkKVxuXHRcdFx0fVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7d2lkdGg6YXZhaWxhYmxlV2lkdGgsIGhlaWdodDp0aGlzLmF2YWlsYWJsZVNwYWNlLmhlaWdodH1cbiAgICB9XG5cbiAgICBhcHBlbmRDb21wb3NlZChjb250ZW50KXsvL0BUT0RPOiBuZWVkIGNvbnNpZGVyIGF2YWlsYWJsZVNwYWNlXG4gICAgICAgIGNvbnN0IHtjb21wb3NlZH09dGhpc1xuICAgICAgICBjb25zdCB7cGFyZW50fT10aGlzLmNvbnRleHRcblxuXHRcdGxldCBjdXJyZW50TGluZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cbiAgICAgICAgbGV0IGF2YWlsYWJsZVdpZHRoPWN1cnJlbnRMaW5lLmNoaWxkcmVuLnJlZHVjZSgocHJldixhKT0+cHJldi1hLnByb3BzLndpZHRoLGN1cnJlbnRMaW5lLndpZHRoKVxuICAgICAgICBsZXQge3dpZHRoOmNvbnRlbnRXaWR0aCwgaGVpZ2h0OmNvbnRlbnRIZWlnaHR9PWNvbnRlbnQucHJvcHNcblxuXG5cdFx0bGV0IHBpZWNlPW51bGxcblx0XHRpZihhdmFpbGFibGVXaWR0aD09MCl7XG5cdFx0XHRjb21wb3NlZC5wdXNoKHRoaXMuX25ld0xpbmUoKSlcblx0XHRcdHRoaXMuYXBwZW5kQ29tcG9zZWQoY29udGVudClcblx0XHR9ZWxzZSBpZihhdmFpbGFibGVXaWR0aD49Y29udGVudFdpZHRoKXsvL25vdCBhcHBlbmRlZCB0byBwYXJlbnRcbiAgICAgICAgICAgIHBpZWNlPShcblx0XHRcdFx0XHQ8R3JvdXBcblx0XHRcdFx0XHRcdHg9e2N1cnJlbnRMaW5lLndpZHRoLWF2YWlsYWJsZVdpZHRofVxuXHRcdFx0XHRcdFx0aW5kZXg9e3RoaXMuY2hpbGRyZW4ubGVuZ3RofVxuXHRcdFx0XHRcdFx0d2lkdGg9e2NvbnRlbnRXaWR0aH1cblx0XHRcdFx0XHRcdGhlaWdodD17Y29udGVudEhlaWdodH0+XG5cdFx0XHRcdFx0XHR7Y29udGVudH1cblx0XHRcdFx0XHQ8L0dyb3VwPlxuXHRcdFx0XHRcdClcbiAgICAgICAgICAgIGN1cnJlbnRMaW5lLmNoaWxkcmVuLnB1c2gocGllY2UpXG5cdFx0XHRjdXJyZW50TGluZS5oZWlnaHQ9TWF0aC5tYXgoY3VycmVudExpbmUuaGVpZ2h0LGNvbnRlbnRIZWlnaHQpXG5cdFx0XHRpZihhdmFpbGFibGVXaWR0aD09Y29udGVudFdpZHRoKXtcblx0XHRcdFx0cGFyZW50LmFwcGVuZENvbXBvc2VkKHRoaXMuY3JlYXRlTGluZShjdXJyZW50TGluZSkpXG5cdFx0XHRcdHRoaXMuYXZhaWxhYmxlU3BhY2UuaGVpZ2h0LT1jdXJyZW50TGluZS5oZWlnaHRcblx0XHRcdH1cblx0XHR9ZWxzZSBpZihhdmFpbGFibGVXaWR0aDxjb250ZW50V2lkdGgpe1xuXHRcdFx0aWYodGhpcy5hdmFpbGFibGVTcGFjZS5oZWlnaHQ+PWN1cnJlbnRMaW5lLmhlaWdodCl7XG5cdFx0XHRcdHBhcmVudC5hcHBlbmRDb21wb3NlZCh0aGlzLmNyZWF0ZUxpbmUoY3VycmVudExpbmUpKVxuXHRcdFx0XHRjb21wb3NlZC5wdXNoKHRoaXMuX25ld0xpbmUoKSlcblxuXHRcdFx0XHRpZihjb250ZW50V2lkdGg8PXRoaXMuYXZhaWxhYmxlU3BhY2Uud2lkdGgpXG5cdFx0XHRcdFx0dGhpcy5hcHBlbmRDb21wb3NlZChjb250ZW50KVxuXHRcdFx0XHRlbHNle1xuXHRcdFx0XHRcdC8vbmV2ZXIgYmUgaGVyZVxuXHRcdFx0XHR9XG5cdFx0XHR9ZWxzZXtcblxuXHRcdFx0fVxuXHRcdH1cbiAgICB9XG5cblx0b25BbGxDaGlsZHJlbkNvbXBvc2VkKCl7Ly9uZWVkIGFwcGVuZCBsYXN0IG5vbi1mdWxsLXdpZHRoIGxpbmUgdG8gcGFyZW50XG5cdFx0Y29uc3Qge2NvbXBvc2VkfT10aGlzXG5cdFx0Y29uc3Qge3BhcmVudH09dGhpcy5jb250ZXh0XG5cblx0XHRsZXQgY3VycmVudExpbmU9Y29tcG9zZWRbY29tcG9zZWQubGVuZ3RoLTFdXG5cdFx0bGV0IGF2YWlsYWJsZVdpZHRoPWN1cnJlbnRMaW5lLmNoaWxkcmVuLnJlZHVjZSgocHJldixhKT0+cHJldi1hLnByb3BzLndpZHRoLGN1cnJlbnRMaW5lLndpZHRoKVxuXHRcdGlmKGF2YWlsYWJsZVdpZHRoPjApe1xuXHRcdFx0cGFyZW50LmFwcGVuZENvbXBvc2VkKHRoaXMuY3JlYXRlTGluZShjdXJyZW50TGluZSkpXG5cdFx0fWVsc2UgaWYoYXZhaWxhYmxlV2lkdGg9PTApe1xuXHRcdFx0Ly9hbHJlYWR5IGFwcGVuZGVkIHRvIHBhcmVudCBpbiBhcHBlbmRDb21wb3NlZFxuXHRcdH1cblxuXHRcdHRoaXMuYXZhaWxhYmxlU3BhY2U9e3dpZHRoOjAsIGhlaWdodDowfVxuXG5cdFx0c3VwZXIub25BbGxDaGlsZHJlbkNvbXBvc2VkKClcblx0fVxuXG4gICAgY3JlYXRlTGluZShwcm9wcyl7XG4gICAgICAgIGxldCB7aGVpZ2h0LCB3aWR0aH09cHJvcHNcbiAgICAgICAgbGV0IHtzcGFjaW5nOntsaW5lSGVpZ2h0PVwiMTAwJVwiLHRvcD0wLCBib3R0b209MH0sIGluZGVudDp7fX09dGhpcy5nZXRTdHlsZSgpXG4gICAgICAgIGxldCBjb250ZW50WT0wXG5cbiAgICAgICAgbGluZUhlaWdodD10eXBlb2YobGluZUhlaWdodCk9PSdzdHJpbmcnID8gTWF0aC5jZWlsKGhlaWdodCpwYXJzZUludChsaW5lSGVpZ2h0KS8xMDAuMCk6IGxpbmVIZWlnaHRcblxuICAgICAgICBpZih0aGlzLmNvbXBvc2VkLmxlbmd0aD09MCl7XG4gICAgICAgICAgICBsaW5lSGVpZ2h0Kz10b3BcbiAgICAgICAgICAgIGNvbnRlbnRZKz10b3BcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRoaXMuaXNBbGxDaGlsZHJlbkNvbXBvc2VkKCkpXG4gICAgICAgICAgICBsaW5lSGVpZ2h0Kz1ib3R0b21cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEdyb3VwIGhlaWdodD17bGluZUhlaWdodH0gd2lkdGg9e3dpZHRofT5cbiAgICAgICAgICAgICAgICA8R3JvdXAgeT17Y29udGVudFl9PlxuICAgICAgICAgICAgICAgICAgICA8TGluZSB7Li4ucHJvcHN9Lz5cbiAgICAgICAgICAgICAgICA8L0dyb3VwPlxuICAgICAgICAgICAgPC9Hcm91cD5cbiAgICAgICAgKVxuICAgIH1cblxuICAgIGdldFN0eWxlKCl7XG4gICAgICAgIGlmKHRoaXMuX3N0eWxlKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0eWxlXG4gICAgICAgIGxldCBzcGFjaW5nPXRoaXMuc3R5bGUoJ3BhcmFncmFwaC5zcGFjaW5nJyl8fHt9XG4gICAgICAgIGxldCBpbmRlbnQ9dGhpcy5zdHlsZSgncGFyYWdyYXBoLmluZCcpfHx7fVxuICAgICAgICByZXR1cm4gdGhpcy5fc3R5bGU9e3NwYWNpbmcsaW5kZW50fVxuICAgIH1cblxuXG5cblx0c3RhdGljIGNvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcblx0XHRnZXREZWZhdWx0U3R5bGU6IFByb3BUeXBlcy5mdW5jXG5cdH0sU3VwZXIuY29udGV4dFR5cGVzKVxufVxuIl19