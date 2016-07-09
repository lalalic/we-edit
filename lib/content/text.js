"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _any = require("./any");

var _html = require("../wordwrap/html");

var _html2 = _interopRequireDefault(_html);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Text = function (_NoChild) {
	_inherits(Text, _NoChild);

	function Text() {
		_classCallCheck(this, Text);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Text).apply(this, arguments));
	}

	_createClass(Text, [{
		key: "compose",
		value: function compose() {
			var composed = this.composed;
			var parent = this.context.parent;
			var content = this.state.content;

			var style = this.getFontStyle();
			var composer = new this.constructor.WordWrapper(content, style);
			var defaultStyle = {
				whiteSpace: 'pre',
				fontSize: style.sz + "px",
				fontWeight: style.b ? 700 : 400,
				fontStyle: style.i ? "italic" : "normal",
				height: composer.height
			};

			if (style.color) defaultStyle.fill = style.color;

			var text = null;
			while (text = composer.next(parent.nextAvailableSpace())) {
				Object.assign(text, defaultStyle);
				var _content = this.createComposedPiece(text);
				composed.push(_content);
				parent.appendComposed(_content);
			}
			parent.on1ChildComposed(this);
		}
	}, {
		key: "createComposedPiece",
		value: function createComposedPiece(props) {
			var _getFontStyle = this.getFontStyle();

			var color = _getFontStyle.color;

			if (color) props.fill = color;
			props.style = { whiteSpace: 'pre' };
			var width = props.width;
			var height = props.height;
			var end = props.end;

			var others = _objectWithoutProperties(props, ["width", "height", "end"]);

			return _react2.default.createElement(
				Group,
				{ width: width, height: height },
				_react2.default.createElement("text", _extends({}, props, { style: { whiteSpace: "pre" } }))
			);
		}
	}, {
		key: "getFontStyle",
		value: function getFontStyle() {
			var style = this.context.style;

			return style;
		}
	}]);

	return Text;
}(_any.NoChild);

Text.displayName = "text";
Text.contextTypes = Object.assign({
	style: _react.PropTypes.object
}, _any.NoChild.contextTypes);
Text.WordWrapper = _html2.default;
exports.default = Text;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3RleHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7Ozs0QkFHUjtPQUNKLFdBQVUsS0FBVixTQURJO09BRUUsU0FBUSxLQUFLLE9BQUwsQ0FBUixPQUZGO09BR0osVUFBUyxLQUFLLEtBQUwsQ0FBVCxRQUhJOztBQUlYLE9BQUksUUFBTSxLQUFLLFlBQUwsRUFBTixDQUpPO0FBS1gsT0FBSSxXQUFTLElBQUksS0FBSyxXQUFMLENBQWlCLFdBQWpCLENBQTZCLE9BQWpDLEVBQTBDLEtBQTFDLENBQVQsQ0FMTztBQU1YLE9BQUksZUFBYTtBQUNoQixnQkFBVyxLQUFYO0FBQ0EsY0FBWSxNQUFNLEVBQU4sT0FBWjtBQUNBLGdCQUFXLE1BQU0sQ0FBTixHQUFVLEdBQVYsR0FBZ0IsR0FBaEI7QUFDWCxlQUFVLE1BQU0sQ0FBTixHQUFVLFFBQVYsR0FBcUIsUUFBckI7QUFDVixZQUFRLFNBQVMsTUFBVDtJQUxMLENBTk87O0FBY1gsT0FBRyxNQUFNLEtBQU4sRUFDRixhQUFhLElBQWIsR0FBa0IsTUFBTSxLQUFOLENBRG5COztBQUdNLE9BQUksT0FBSyxJQUFMLENBakJDO0FBa0JMLFVBQU0sT0FBSyxTQUFTLElBQVQsQ0FBYyxPQUFPLGtCQUFQLEVBQWQsQ0FBTCxFQUFnRDtBQUMzRCxXQUFPLE1BQVAsQ0FBYyxJQUFkLEVBQW1CLFlBQW5CLEVBRDJEO0FBRTNELFFBQUksV0FBUSxLQUFLLG1CQUFMLENBQXlCLElBQXpCLENBQVIsQ0FGdUQ7QUFHbEQsYUFBUyxJQUFULENBQWMsUUFBZCxFQUhrRDtBQUlsRCxXQUFPLGNBQVAsQ0FBc0IsUUFBdEIsRUFKa0Q7SUFBdEQ7QUFNTixVQUFPLGdCQUFQLENBQXdCLElBQXhCLEVBeEJXOzs7O3NDQTJCUSxPQUFNO3VCQUNYLEtBQUssWUFBTCxHQURXOztPQUNsQiw0QkFEa0I7O0FBRXpCLE9BQUcsS0FBSCxFQUNDLE1BQU0sSUFBTixHQUFXLEtBQVgsQ0FERDtBQUVBLFNBQU0sS0FBTixHQUFZLEVBQUMsWUFBVyxLQUFYLEVBQWIsQ0FKeUI7T0FLbEIsUUFBK0IsTUFBL0IsTUFMa0I7T0FLWCxTQUF3QixNQUF4QixPQUxXO09BS0gsTUFBZ0IsTUFBaEIsSUFMRzs7T0FLSyxrQ0FBUSxtQ0FMYjs7QUFNekIsVUFBTztBQUFDLFNBQUQ7TUFBTyxPQUFPLEtBQVAsRUFBYyxRQUFRLE1BQVIsRUFBckI7SUFBcUMsbURBQVUsU0FBTyxPQUFPLEVBQUMsWUFBVyxLQUFYLEVBQVIsR0FBakIsQ0FBckM7SUFBUCxDQU55Qjs7OztpQ0FVWjtPQUNOLFFBQU8sS0FBSyxPQUFMLENBQVAsTUFETTs7QUFFYixVQUFPLEtBQVAsQ0FGYTs7OztRQXhDTTs7O0tBQ2IsY0FBWTtBQURDLEtBNkNiLGVBQWEsT0FBTyxNQUFQLENBQWM7QUFDakMsUUFBTyxpQkFBVSxNQUFWO0NBRFksRUFFakIsYUFBUSxZQUFSO0FBL0NpQixLQWlEYjtrQkFqRGEiLCJmaWxlIjoidGV4dC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge05vQ2hpbGR9IGZyb20gXCIuL2FueVwiXHJcbmltcG9ydCBIdG1sV29yZFdyYXBwZXIgZnJvbSBcIi4uL3dvcmR3cmFwL2h0bWxcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dCBleHRlbmRzIE5vQ2hpbGR7XHJcblx0c3RhdGljIGRpc3BsYXlOYW1lPVwidGV4dFwiXHJcblxyXG4gICAgY29tcG9zZSgpe1xyXG5cdFx0Y29uc3Qge2NvbXBvc2VkfT10aGlzXHJcbiAgICAgICAgY29uc3Qge3BhcmVudH09dGhpcy5jb250ZXh0XHJcblx0XHRjb25zdCB7Y29udGVudH09dGhpcy5zdGF0ZVxyXG5cdFx0bGV0IHN0eWxlPXRoaXMuZ2V0Rm9udFN0eWxlKClcclxuXHRcdGxldCBjb21wb3Nlcj1uZXcgdGhpcy5jb25zdHJ1Y3Rvci5Xb3JkV3JhcHBlcihjb250ZW50LCBzdHlsZSlcclxuXHRcdGxldCBkZWZhdWx0U3R5bGU9e1xyXG5cdFx0XHR3aGl0ZVNwYWNlOidwcmUnLFxyXG5cdFx0XHRmb250U2l6ZTpgJHtzdHlsZS5zen1weGAsXHJcblx0XHRcdGZvbnRXZWlnaHQ6c3R5bGUuYiA/IDcwMCA6IDQwMCxcclxuXHRcdFx0Zm9udFN0eWxlOnN0eWxlLmkgPyBcIml0YWxpY1wiIDogXCJub3JtYWxcIixcclxuXHRcdFx0aGVpZ2h0OiBjb21wb3Nlci5oZWlnaHRcclxuXHRcdH1cclxuXHJcblx0XHRpZihzdHlsZS5jb2xvcilcclxuXHRcdFx0ZGVmYXVsdFN0eWxlLmZpbGw9c3R5bGUuY29sb3JcclxuXHJcbiAgICAgICAgbGV0IHRleHQ9bnVsbFxyXG4gICAgICAgIHdoaWxlKHRleHQ9Y29tcG9zZXIubmV4dChwYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKCkpKXtcclxuXHRcdFx0T2JqZWN0LmFzc2lnbih0ZXh0LGRlZmF1bHRTdHlsZSlcclxuXHRcdFx0bGV0IGNvbnRlbnQ9dGhpcy5jcmVhdGVDb21wb3NlZFBpZWNlKHRleHQpXHJcbiAgICAgICAgICAgIGNvbXBvc2VkLnB1c2goY29udGVudClcclxuICAgICAgICAgICAgcGFyZW50LmFwcGVuZENvbXBvc2VkKGNvbnRlbnQpXHJcbiAgICAgICAgfVxyXG5cdFx0cGFyZW50Lm9uMUNoaWxkQ29tcG9zZWQodGhpcylcclxuICAgIH1cclxuXHJcblx0Y3JlYXRlQ29tcG9zZWRQaWVjZShwcm9wcyl7XHJcblx0XHRjb25zdCB7Y29sb3J9PXRoaXMuZ2V0Rm9udFN0eWxlKClcclxuXHRcdGlmKGNvbG9yKVxyXG5cdFx0XHRwcm9wcy5maWxsPWNvbG9yXHJcblx0XHRwcm9wcy5zdHlsZT17d2hpdGVTcGFjZToncHJlJ31cclxuXHRcdGNvbnN0IHt3aWR0aCwgaGVpZ2h0LCBlbmQsIC4uLm90aGVyc309cHJvcHNcclxuXHRcdHJldHVybiA8R3JvdXAgd2lkdGg9e3dpZHRofSBoZWlnaHQ9e2hlaWdodH0+PHRleHQgey4uLnByb3BzfSBzdHlsZT17e3doaXRlU3BhY2U6XCJwcmVcIn19Lz48L0dyb3VwPlxyXG5cdH1cclxuXHJcblxyXG5cdGdldEZvbnRTdHlsZSgpe1xyXG5cdFx0Y29uc3Qge3N0eWxlfT10aGlzLmNvbnRleHRcclxuXHRcdHJldHVybiBzdHlsZVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGNvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcclxuXHRcdHN0eWxlOiBQcm9wVHlwZXMub2JqZWN0XHJcblx0fSwgTm9DaGlsZC5jb250ZXh0VHlwZXMpXHJcblxyXG5cdHN0YXRpYyBXb3JkV3JhcHBlcj1IdG1sV29yZFdyYXBwZXJcclxufVxyXG4iXX0=