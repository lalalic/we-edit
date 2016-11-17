"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

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

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _any = require("./any");

var _html = require("../wordwrap/html");

var _html2 = _interopRequireDefault(_html);

var _group = require("../composed/group");

var _group2 = _interopRequireDefault(_group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Text = function (_NoChild) {
	(0, _inherits3.default)(Text, _NoChild);

	function Text() {
		(0, _classCallCheck3.default)(this, Text);
		return (0, _possibleConstructorReturn3.default)(this, (Text.__proto__ || (0, _getPrototypeOf2.default)(Text)).apply(this, arguments));
	}

	(0, _createClass3.default)(Text, [{
		key: "compose",
		value: function compose() {
			var composed = this.computed.composed;
			var parent = this.context.parent;


			var composer = new this.constructor.WordWrapper(this.getContent(), this.getStyle());
			var text = null;
			while (text = composer.next(parent.nextAvailableSpace())) {
				composed.push(text);
				parent.appendComposed(this.createComposed2Parent(text));
			}
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
			var _getStyle = this.getStyle(),
			    color = _getStyle.color;

			var width = props.width,
			    height = props.height,
			    descent = props.descent,
			    contentWidth = props.contentWidth,
			    whiteSpace = props.whiteSpace,
			    others = (0, _objectWithoutProperties3.default)(props, ["width", "height", "descent", "contentWidth", "whiteSpace"]);

			return _react2.default.createElement(
				_group2.default,
				{ width: width, height: height, descent: descent },
				_react2.default.createElement("text", (0, _extends3.default)({ width: width, height: height, descent: descent }, others, { style: { whiteSpace: "pre" } }))
			);
		}
	}]);
	return Text;
}(_any.NoChild);

Text.displayName = "text";
Text.contextTypes = (0, _assign2.default)({
	inheritedStyle: _react.PropTypes.object
}, _any.NoChild.contextTypes);
Text.WordWrapper = _html2.default;
exports.default = Text;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3RleHQuanMiXSwibmFtZXMiOlsiVGV4dCIsImNvbXBvc2VkIiwiY29tcHV0ZWQiLCJwYXJlbnQiLCJjb250ZXh0IiwiY29tcG9zZXIiLCJjb25zdHJ1Y3RvciIsIldvcmRXcmFwcGVyIiwiZ2V0Q29udGVudCIsImdldFN0eWxlIiwidGV4dCIsIm5leHQiLCJuZXh0QXZhaWxhYmxlU3BhY2UiLCJwdXNoIiwiYXBwZW5kQ29tcG9zZWQiLCJjcmVhdGVDb21wb3NlZDJQYXJlbnQiLCJvbjFDaGlsZENvbXBvc2VkIiwiaW5oZXJpdGVkU3R5bGUiLCJzcGxpdCIsInJlZHVjZSIsInN0eWxlIiwia2V5Iiwic3R5bGVQYXRoIiwidmFsdWUiLCJnZXQiLCJ1bmRlZmluZWQiLCJwcm9wcyIsImNvbG9yIiwid2lkdGgiLCJoZWlnaHQiLCJkZXNjZW50IiwiY29udGVudFdpZHRoIiwid2hpdGVTcGFjZSIsIm90aGVycyIsImRpc3BsYXlOYW1lIiwiY29udGV4dFR5cGVzIiwib2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7Ozs7O0lBRXFCQSxJOzs7Ozs7Ozs7OzRCQUdSO0FBQUEsT0FDSkMsUUFESSxHQUNNLEtBQUtDLFFBRFgsQ0FDSkQsUUFESTtBQUFBLE9BRUVFLE1BRkYsR0FFVSxLQUFLQyxPQUZmLENBRUVELE1BRkY7OztBQUlYLE9BQUlFLFdBQVMsSUFBSSxLQUFLQyxXQUFMLENBQWlCQyxXQUFyQixDQUFpQyxLQUFLQyxVQUFMLEVBQWpDLEVBQW9ELEtBQUtDLFFBQUwsRUFBcEQsQ0FBYjtBQUNNLE9BQUlDLE9BQUssSUFBVDtBQUNBLFVBQU1BLE9BQUtMLFNBQVNNLElBQVQsQ0FBY1IsT0FBT1Msa0JBQVAsRUFBZCxDQUFYLEVBQXNEO0FBQ2xEWCxhQUFTWSxJQUFULENBQWNILElBQWQ7QUFDQVAsV0FBT1csY0FBUCxDQUFzQixLQUFLQyxxQkFBTCxDQUEyQkwsSUFBM0IsQ0FBdEI7QUFDSDtBQUNQUCxVQUFPYSxnQkFBUCxDQUF3QixJQUF4QjtBQUNHOzs7NkJBRU07QUFBQSxPQUNGQyxjQURFLEdBQ2MsS0FBS2IsT0FEbkIsQ0FDRmEsY0FERTs7O0FBR1QsVUFBTyw2QkFBNkJDLEtBQTdCLENBQW1DLEdBQW5DLEVBQXdDQyxNQUF4QyxDQUErQyxVQUFDQyxLQUFELEVBQVFDLEdBQVIsRUFBYztBQUMxRCxRQUFJQyxxQkFBaUJELEdBQXJCO0FBQ1QsUUFBSUUsUUFBTU4sZUFBZU8sR0FBZixDQUFtQkYsU0FBbkIsQ0FBVjtBQUNTLFFBQUdDLFNBQU9FLFNBQVYsRUFBb0I7QUFDaEJMLFdBQU1DLEdBQU4sSUFBV0UsS0FBWDtBQUNaO0FBQ1EsV0FBT0gsS0FBUDtBQUNILElBUEEsRUFPQyxFQVBELENBQVA7QUFRQTs7O3dDQUVxQk0sSyxFQUFNO0FBQUEsbUJBQ2IsS0FBS2pCLFFBQUwsRUFEYTtBQUFBLE9BQ3BCa0IsS0FEb0IsYUFDcEJBLEtBRG9COztBQUFBLE9BRXBCQyxLQUZvQixHQUV5Q0YsS0FGekMsQ0FFcEJFLEtBRm9CO0FBQUEsT0FFYkMsTUFGYSxHQUV5Q0gsS0FGekMsQ0FFYkcsTUFGYTtBQUFBLE9BRUxDLE9BRkssR0FFeUNKLEtBRnpDLENBRUxJLE9BRks7QUFBQSxPQUVJQyxZQUZKLEdBRXlDTCxLQUZ6QyxDQUVJSyxZQUZKO0FBQUEsT0FFa0JDLFVBRmxCLEdBRXlDTixLQUZ6QyxDQUVrQk0sVUFGbEI7QUFBQSxPQUVpQ0MsTUFGakMsMENBRXlDUCxLQUZ6Qzs7QUFHM0IsVUFBTztBQUFBO0FBQUEsTUFBTyxPQUFPRSxLQUFkLEVBQXFCLFFBQVFDLE1BQTdCLEVBQXFDLFNBQVNDLE9BQTlDO0FBQXVELGlFQUFVLEVBQUNGLFlBQUQsRUFBT0MsY0FBUCxFQUFjQyxnQkFBZCxFQUFWLEVBQXNDRyxNQUF0QyxJQUE4QyxPQUFPLEVBQUNELFlBQVcsS0FBWixFQUFyRDtBQUF2RCxJQUFQO0FBQ0E7Ozs7O0FBakNtQmhDLEksQ0FDYmtDLFcsR0FBWSxNO0FBRENsQyxJLENBbUNibUMsWSxHQUFhLHNCQUFjO0FBQ2pDbEIsaUJBQWdCLGlCQUFVbUI7QUFETyxDQUFkLEVBRWpCLGFBQVFELFlBRlMsQztBQW5DQW5DLEksQ0F1Q2JPLFc7a0JBdkNhUCxJIiwiZmlsZSI6InRleHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtOb0NoaWxkfSBmcm9tIFwiLi9hbnlcIlxyXG5pbXBvcnQgSHRtbFdvcmRXcmFwcGVyIGZyb20gXCIuLi93b3Jkd3JhcC9odG1sXCJcclxuXHJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZWQvZ3JvdXBcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dCBleHRlbmRzIE5vQ2hpbGR7XHJcblx0c3RhdGljIGRpc3BsYXlOYW1lPVwidGV4dFwiXHJcblxyXG4gICAgY29tcG9zZSgpe1xyXG5cdFx0Y29uc3Qge2NvbXBvc2VkfT10aGlzLmNvbXB1dGVkXHJcbiAgICAgICAgY29uc3Qge3BhcmVudH09dGhpcy5jb250ZXh0XHJcblxyXG5cdFx0bGV0IGNvbXBvc2VyPW5ldyB0aGlzLmNvbnN0cnVjdG9yLldvcmRXcmFwcGVyKHRoaXMuZ2V0Q29udGVudCgpLCB0aGlzLmdldFN0eWxlKCkpXHJcbiAgICAgICAgbGV0IHRleHQ9bnVsbFxyXG4gICAgICAgIHdoaWxlKHRleHQ9Y29tcG9zZXIubmV4dChwYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKCkpKXtcclxuICAgICAgICAgICAgY29tcG9zZWQucHVzaCh0ZXh0KVxyXG4gICAgICAgICAgICBwYXJlbnQuYXBwZW5kQ29tcG9zZWQodGhpcy5jcmVhdGVDb21wb3NlZDJQYXJlbnQodGV4dCkpXHJcbiAgICAgICAgfVxyXG5cdFx0cGFyZW50Lm9uMUNoaWxkQ29tcG9zZWQodGhpcylcclxuICAgIH1cclxuXHJcblx0Z2V0U3R5bGUoKXtcclxuXHRcdGNvbnN0IHtpbmhlcml0ZWRTdHlsZX09dGhpcy5jb250ZXh0XHJcblxyXG5cdFx0cmV0dXJuICdyRm9udHMsc3osY29sb3IsYixpLHZhbmlzaCcuc3BsaXQoXCIsXCIpLnJlZHVjZSgoc3R5bGUsIGtleSk9PntcclxuICAgICAgICAgICAgbGV0IHN0eWxlUGF0aD1gclByLiR7a2V5fWBcclxuXHRcdFx0bGV0IHZhbHVlPWluaGVyaXRlZFN0eWxlLmdldChzdHlsZVBhdGgpXHJcbiAgICAgICAgICAgIGlmKHZhbHVlIT11bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgc3R5bGVba2V5XT12YWx1ZVxyXG5cdFx0XHR9XHJcbiAgICAgICAgICAgIHJldHVybiBzdHlsZVxyXG4gICAgICAgIH0se30pXHJcblx0fVxyXG5cclxuXHRjcmVhdGVDb21wb3NlZDJQYXJlbnQocHJvcHMpe1xyXG5cdFx0Y29uc3Qge2NvbG9yfT10aGlzLmdldFN0eWxlKClcclxuXHRcdGNvbnN0IHt3aWR0aCwgaGVpZ2h0LCBkZXNjZW50LCBjb250ZW50V2lkdGgsIHdoaXRlU3BhY2UsIC4uLm90aGVyc309cHJvcHNcclxuXHRcdHJldHVybiA8R3JvdXAgd2lkdGg9e3dpZHRofSBoZWlnaHQ9e2hlaWdodH0gZGVzY2VudD17ZGVzY2VudH0+PHRleHQgey4uLnt3aWR0aCxoZWlnaHQsZGVzY2VudH19IHsuLi5vdGhlcnN9IHN0eWxlPXt7d2hpdGVTcGFjZTpcInByZVwifX0vPjwvR3JvdXA+XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgY29udGV4dFR5cGVzPU9iamVjdC5hc3NpZ24oe1xyXG5cdFx0aW5oZXJpdGVkU3R5bGU6IFByb3BUeXBlcy5vYmplY3RcclxuXHR9LCBOb0NoaWxkLmNvbnRleHRUeXBlcylcclxuXHJcblx0c3RhdGljIFdvcmRXcmFwcGVyPUh0bWxXb3JkV3JhcHBlclxyXG59XHJcbiJdfQ==