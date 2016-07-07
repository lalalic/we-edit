"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _content = require("../content");

var _editable = require("./editable");

var _editable2 = _interopRequireDefault(_editable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Super = (0, _editable2.default)(_content.Text);

var _class = function (_Super) {
	_inherits(_class, _Super);

	function _class() {
		_classCallCheck(this, _class);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
	}

	_createClass(_class, [{
		key: "createComposedPiece",
		value: function createComposedPiece(props) {
			var _this2 = this;

			return _react2.default.createElement("text", _extends({}, props, { onClick: function onClick(e) {
					return _this2.onClick(e, props);
				} }));
		}
	}, {
		key: "onClick",
		value: function onClick(event, text) {
			var _event$nativeEvent = event.nativeEvent;
			var offsetX = _event$nativeEvent.offsetX;
			var offsetY = _event$nativeEvent.offsetY;
			var target = event.target;

			var style = this.getFontStyle();
			var composer = new this.constructor.WordWrapper(this.state.content, style);
			var loc = composer.next({ width: offsetX }) || { end: 0 };
			var index = text.end - text.children.length + loc.end;
			var cursor = this.context.cursor();

			var _getAbsoluteXY = this.getAbsoluteXY(target);

			var x = _getAbsoluteXY.x;
			var y = _getAbsoluteXY.y;

			var x1 = x + loc.width,
			    y1 = y;
			cursor.setState({
				target: this,
				loc: index,
				shape: _react2.default.createElement("line", {
					x1: x1,
					y1: y1,
					x2: x1,
					y2: y1 - text.height,
					strokeWidth: 1,
					stroke: style.color || "black"
				})
			});
		}
	}, {
		key: "getAbsoluteXY",
		value: function getAbsoluteXY(node) {
			var x = 0,
			    y = 0;
			var viewportElement = node.viewportElement;
			while (node && node != viewportElement) {
				if (node.nodeName == 'g') {
					x += parseFloat(node.getAttribute("x") || "0");
					y += parseFloat(node.getAttribute("y") || "0");
				}
				node = node.parentNode;
			}
			return { x: x, y: y };
		}
	}]);

	return _class;
}(Super);

_class.contextTypes = Object.assign({
	cursor: _react.PropTypes.func
}, Super.contextTypes);
exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvdGV4dC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSSxRQUFNLHNDQUFOOzs7Ozs7Ozs7Ozs7O3NDQUVvQixPQUFNOzs7QUFDdEIsVUFBTyxtREFBVSxTQUFPLFNBQVM7WUFBRyxPQUFLLE9BQUwsQ0FBYSxDQUFiLEVBQWUsS0FBZjtLQUFILEdBQTFCLENBQVAsQ0FEc0I7Ozs7MEJBSWxCLE9BQU8sTUFBSzs0QkFDeUIsTUFBeEMsWUFEZTtPQUNGLHFDQURFO09BQ08scUNBRFA7T0FDaUIsU0FBUSxNQUFSLE9BRGpCOztBQUVoQixPQUFJLFFBQU0sS0FBSyxZQUFMLEVBQU4sQ0FGWTtBQUdoQixPQUFJLFdBQVMsSUFBSSxLQUFLLFdBQUwsQ0FBaUIsV0FBakIsQ0FBNkIsS0FBSyxLQUFMLENBQVcsT0FBWCxFQUFvQixLQUFyRCxDQUFULENBSFk7QUFJaEIsT0FBSSxNQUFJLFNBQVMsSUFBVCxDQUFjLEVBQUMsT0FBTSxPQUFOLEVBQWYsS0FBZ0MsRUFBQyxLQUFJLENBQUosRUFBakMsQ0FKUTtBQUtoQixPQUFJLFFBQU0sS0FBSyxHQUFMLEdBQVMsS0FBSyxRQUFMLENBQWMsTUFBZCxHQUFxQixJQUFJLEdBQUosQ0FMeEI7QUFNdEIsT0FBSSxTQUFPLEtBQUssT0FBTCxDQUFhLE1BQWIsRUFBUCxDQU5rQjs7d0JBUVosS0FBSyxhQUFMLENBQW1CLE1BQW5CLEVBUlk7O09BUWpCLHFCQVJpQjtPQVFmLHFCQVJlOztBQVN0QixPQUFJLEtBQUcsSUFBRSxJQUFJLEtBQUo7T0FBVyxLQUFHLENBQUgsQ0FURTtBQVVoQixVQUFPLFFBQVAsQ0FBZ0I7QUFDckIsWUFBTyxJQUFQO0FBQ0EsU0FBSyxLQUFMO0FBQ0EsV0FBUTtBQUNQLFNBQUksRUFBSjtBQUNBLFNBQUksRUFBSjtBQUNBLFNBQUksRUFBSjtBQUNBLFNBQUksS0FBRyxLQUFLLE1BQUw7QUFDUCxrQkFBYSxDQUFiO0FBQ0EsYUFBUSxNQUFNLEtBQU4sSUFBYSxPQUFiO0tBTkQsQ0FBUjtJQUhLLEVBVmdCOzs7O2dDQXdCVCxNQUFLO0FBQ2xCLE9BQUksSUFBRSxDQUFGO09BQUssSUFBRSxDQUFGLENBRFM7QUFFbEIsT0FBSSxrQkFBZ0IsS0FBSyxlQUFMLENBRkY7QUFHbEIsVUFBTSxRQUFRLFFBQU0sZUFBTixFQUFzQjtBQUNuQyxRQUFHLEtBQUssUUFBTCxJQUFlLEdBQWYsRUFBbUI7QUFDckIsVUFBRyxXQUFXLEtBQUssWUFBTCxDQUFrQixHQUFsQixLQUF3QixHQUF4QixDQUFkLENBRHFCO0FBRXJCLFVBQUcsV0FBVyxLQUFLLFlBQUwsQ0FBa0IsR0FBbEIsS0FBd0IsR0FBeEIsQ0FBZCxDQUZxQjtLQUF0QjtBQUlBLFdBQUssS0FBSyxVQUFMLENBTDhCO0lBQXBDO0FBT0EsVUFBTyxFQUFDLElBQUQsRUFBRyxJQUFILEVBQVAsQ0FWa0I7Ozs7O0VBN0JTOztPQTBDckIsZUFBYSxPQUFPLE1BQVAsQ0FBYztBQUNqQyxTQUFRLGlCQUFVLElBQVY7Q0FEVyxFQUVsQixNQUFNLFlBQU4iLCJmaWxlIjoidGV4dC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCx7UHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtUZXh0fSBmcm9tIFwiLi4vY29udGVudFwiXG5pbXBvcnQgZWRpdGFibGUgZnJvbSBcIi4vZWRpdGFibGVcIlxuXG5sZXQgU3VwZXI9ZWRpdGFibGUoVGV4dClcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgU3VwZXJ7XG4gICAgY3JlYXRlQ29tcG9zZWRQaWVjZShwcm9wcyl7XG4gICAgICAgIHJldHVybiA8dGV4dCB7Li4ucHJvcHN9IG9uQ2xpY2s9e2U9PnRoaXMub25DbGljayhlLHByb3BzKX0vPlxuICAgIH1cblxuICAgIG9uQ2xpY2soZXZlbnQsIHRleHQpe1xuXHRcdGNvbnN0IHtuYXRpdmVFdmVudDp7b2Zmc2V0WCwgb2Zmc2V0WX0sIHRhcmdldH09ZXZlbnRcbiAgICAgICAgbGV0IHN0eWxlPXRoaXMuZ2V0Rm9udFN0eWxlKClcbiAgICAgICAgbGV0IGNvbXBvc2VyPW5ldyB0aGlzLmNvbnN0cnVjdG9yLldvcmRXcmFwcGVyKHRoaXMuc3RhdGUuY29udGVudCwgc3R5bGUpXG4gICAgICAgIGxldCBsb2M9Y29tcG9zZXIubmV4dCh7d2lkdGg6b2Zmc2V0WH0pfHx7ZW5kOjB9XG4gICAgICAgIGxldCBpbmRleD10ZXh0LmVuZC10ZXh0LmNoaWxkcmVuLmxlbmd0aCtsb2MuZW5kXG5cdFx0bGV0IGN1cnNvcj10aGlzLmNvbnRleHQuY3Vyc29yKClcblx0XHRcblx0XHRsZXQge3gseX09dGhpcy5nZXRBYnNvbHV0ZVhZKHRhcmdldClcblx0XHRsZXQgeDE9eCtsb2Mud2lkdGgsIHkxPXlcbiAgICAgICAgY3Vyc29yLnNldFN0YXRlKHtcblx0XHRcdHRhcmdldDp0aGlzLCBcblx0XHRcdGxvYzogaW5kZXgsXG5cdFx0XHRzaGFwZTogKDxsaW5lIFxuXHRcdFx0XHR4MT17eDF9IFxuXHRcdFx0XHR5MT17eTF9IFxuXHRcdFx0XHR4Mj17eDF9IFxuXHRcdFx0XHR5Mj17eTEtdGV4dC5oZWlnaHR9IFxuXHRcdFx0XHRzdHJva2VXaWR0aD17MX0gXG5cdFx0XHRcdHN0cm9rZT17c3R5bGUuY29sb3J8fFwiYmxhY2tcIn1cblx0XHRcdFx0Lz4pXG5cdFx0fSlcbiAgICB9XG5cdFxuXHRnZXRBYnNvbHV0ZVhZKG5vZGUpe1xuXHRcdGxldCB4PTAsIHk9MFxuXHRcdGxldCB2aWV3cG9ydEVsZW1lbnQ9bm9kZS52aWV3cG9ydEVsZW1lbnRcblx0XHR3aGlsZShub2RlICYmIG5vZGUhPXZpZXdwb3J0RWxlbWVudCl7XG5cdFx0XHRpZihub2RlLm5vZGVOYW1lPT0nZycpe1xuXHRcdFx0XHR4Kz1wYXJzZUZsb2F0KG5vZGUuZ2V0QXR0cmlidXRlKFwieFwiKXx8XCIwXCIpXG5cdFx0XHRcdHkrPXBhcnNlRmxvYXQobm9kZS5nZXRBdHRyaWJ1dGUoXCJ5XCIpfHxcIjBcIilcblx0XHRcdH1cblx0XHRcdG5vZGU9bm9kZS5wYXJlbnROb2RlXG5cdFx0fVxuXHRcdHJldHVybiB7eCx5fVxuXHR9XG5cdFxuXHRzdGF0aWMgY29udGV4dFR5cGVzPU9iamVjdC5hc3NpZ24oe1xuXHRcdGN1cnNvcjogUHJvcFR5cGVzLmZ1bmNcblx0fSxTdXBlci5jb250ZXh0VHlwZXMpXG59XG4iXX0=