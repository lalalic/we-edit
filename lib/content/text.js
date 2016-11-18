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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3RleHQuanMiXSwibmFtZXMiOlsiVGV4dCIsImNvbXBvc2VkIiwiY29tcHV0ZWQiLCJwYXJlbnQiLCJjb250ZXh0IiwiY29tcG9zZXIiLCJjb25zdHJ1Y3RvciIsIldvcmRXcmFwcGVyIiwiZ2V0Q29udGVudCIsImdldFN0eWxlIiwidGV4dCIsIm5leHQiLCJuZXh0QXZhaWxhYmxlU3BhY2UiLCJwdXNoIiwiYXBwZW5kQ29tcG9zZWQiLCJjcmVhdGVDb21wb3NlZDJQYXJlbnQiLCJvbjFDaGlsZENvbXBvc2VkIiwiaW5oZXJpdGVkU3R5bGUiLCJzcGxpdCIsInJlZHVjZSIsInN0eWxlIiwia2V5Iiwic3R5bGVQYXRoIiwidmFsdWUiLCJnZXQiLCJ1bmRlZmluZWQiLCJwcm9wcyIsImNvbG9yIiwid2lkdGgiLCJoZWlnaHQiLCJkZXNjZW50IiwiY29udGVudFdpZHRoIiwid2hpdGVTcGFjZSIsIm90aGVycyIsImRpc3BsYXlOYW1lIiwiY29udGV4dFR5cGVzIiwib2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7Ozs7O0lBRXFCQSxJOzs7Ozs7Ozs7OzRCQUdSO0FBQUEsT0FDSkMsUUFESSxHQUNNLEtBQUtDLFFBRFgsQ0FDSkQsUUFESTtBQUFBLE9BRUVFLE1BRkYsR0FFVSxLQUFLQyxPQUZmLENBRUVELE1BRkY7OztBQUlYLE9BQUlFLFdBQVMsSUFBSSxLQUFLQyxXQUFMLENBQWlCQyxXQUFyQixDQUFpQyxLQUFLQyxVQUFMLEVBQWpDLEVBQW9ELEtBQUtDLFFBQUwsRUFBcEQsQ0FBYjtBQUNNLE9BQUlDLE9BQUssSUFBVDtBQUNBLFVBQU1BLE9BQUtMLFNBQVNNLElBQVQsQ0FBY1IsT0FBT1Msa0JBQVAsRUFBZCxDQUFYLEVBQXNEO0FBQ2xEWCxhQUFTWSxJQUFULENBQWNILElBQWQ7QUFDQVAsV0FBT1csY0FBUCxDQUFzQixLQUFLQyxxQkFBTCxDQUEyQkwsSUFBM0IsQ0FBdEI7QUFDSDtBQUNQUCxVQUFPYSxnQkFBUCxDQUF3QixJQUF4QjtBQUNHOzs7NkJBRU07QUFBQSxPQUNGQyxjQURFLEdBQ2MsS0FBS2IsT0FEbkIsQ0FDRmEsY0FERTs7O0FBR1QsVUFBTyw2QkFBNkJDLEtBQTdCLENBQW1DLEdBQW5DLEVBQXdDQyxNQUF4QyxDQUErQyxVQUFDQyxLQUFELEVBQVFDLEdBQVIsRUFBYztBQUMxRCxRQUFJQyxxQkFBaUJELEdBQXJCO0FBQ1QsUUFBSUUsUUFBTU4sZUFBZU8sR0FBZixDQUFtQkYsU0FBbkIsQ0FBVjtBQUNTLFFBQUdDLFNBQU9FLFNBQVYsRUFBb0I7QUFDaEJMLFdBQU1DLEdBQU4sSUFBV0UsS0FBWDtBQUNaO0FBQ1EsV0FBT0gsS0FBUDtBQUNILElBUEEsRUFPQyxFQVBELENBQVA7QUFRQTs7O3dDQUVxQk0sSyxFQUFNO0FBQUEsbUJBQ2IsS0FBS2pCLFFBQUwsRUFEYTtBQUFBLE9BQ3BCa0IsS0FEb0IsYUFDcEJBLEtBRG9COztBQUFBLE9BRXBCQyxLQUZvQixHQUV5Q0YsS0FGekMsQ0FFcEJFLEtBRm9CO0FBQUEsT0FFYkMsTUFGYSxHQUV5Q0gsS0FGekMsQ0FFYkcsTUFGYTtBQUFBLE9BRUxDLE9BRkssR0FFeUNKLEtBRnpDLENBRUxJLE9BRks7QUFBQSxPQUVJQyxZQUZKLEdBRXlDTCxLQUZ6QyxDQUVJSyxZQUZKO0FBQUEsT0FFa0JDLFVBRmxCLEdBRXlDTixLQUZ6QyxDQUVrQk0sVUFGbEI7QUFBQSxPQUVpQ0MsTUFGakMsMENBRXlDUCxLQUZ6Qzs7QUFHM0IsVUFDQztBQUFBO0FBQUEsTUFBTyxPQUFPRSxLQUFkLEVBQXFCLFFBQVFDLE1BQTdCLEVBQXFDLFNBQVNDLE9BQTlDO0FBQ0MsaUVBQVUsRUFBQ0YsWUFBRCxFQUFPQyxjQUFQLEVBQWNDLGdCQUFkLEVBQVYsRUFBc0NHLE1BQXRDLElBQThDLE9BQU8sRUFBQ0QsWUFBVyxLQUFaLEVBQXJEO0FBREQsSUFERDtBQUtBOzs7OztBQXJDbUJoQyxJLENBQ2JrQyxXLEdBQVksTTtBQURDbEMsSSxDQXVDYm1DLFksR0FBYSxzQkFBYztBQUNqQ2xCLGlCQUFnQixpQkFBVW1CO0FBRE8sQ0FBZCxFQUVqQixhQUFRRCxZQUZTLEM7QUF2Q0FuQyxJLENBMkNiTyxXO2tCQTNDYVAsSSIsImZpbGUiOiJ0ZXh0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7Tm9DaGlsZH0gZnJvbSBcIi4vYW55XCJcclxuaW1wb3J0IEh0bWxXb3JkV3JhcHBlciBmcm9tIFwiLi4vd29yZHdyYXAvaHRtbFwiXHJcblxyXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRleHQgZXh0ZW5kcyBOb0NoaWxke1xyXG5cdHN0YXRpYyBkaXNwbGF5TmFtZT1cInRleHRcIlxyXG5cclxuICAgIGNvbXBvc2UoKXtcclxuXHRcdGNvbnN0IHtjb21wb3NlZH09dGhpcy5jb21wdXRlZFxyXG4gICAgICAgIGNvbnN0IHtwYXJlbnR9PXRoaXMuY29udGV4dFxyXG5cclxuXHRcdGxldCBjb21wb3Nlcj1uZXcgdGhpcy5jb25zdHJ1Y3Rvci5Xb3JkV3JhcHBlcih0aGlzLmdldENvbnRlbnQoKSwgdGhpcy5nZXRTdHlsZSgpKVxyXG4gICAgICAgIGxldCB0ZXh0PW51bGxcclxuICAgICAgICB3aGlsZSh0ZXh0PWNvbXBvc2VyLm5leHQocGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZSgpKSl7XHJcbiAgICAgICAgICAgIGNvbXBvc2VkLnB1c2godGV4dClcclxuICAgICAgICAgICAgcGFyZW50LmFwcGVuZENvbXBvc2VkKHRoaXMuY3JlYXRlQ29tcG9zZWQyUGFyZW50KHRleHQpKVxyXG4gICAgICAgIH1cclxuXHRcdHBhcmVudC5vbjFDaGlsZENvbXBvc2VkKHRoaXMpXHJcbiAgICB9XHJcblxyXG5cdGdldFN0eWxlKCl7XHJcblx0XHRjb25zdCB7aW5oZXJpdGVkU3R5bGV9PXRoaXMuY29udGV4dFxyXG5cclxuXHRcdHJldHVybiAnckZvbnRzLHN6LGNvbG9yLGIsaSx2YW5pc2gnLnNwbGl0KFwiLFwiKS5yZWR1Y2UoKHN0eWxlLCBrZXkpPT57XHJcbiAgICAgICAgICAgIGxldCBzdHlsZVBhdGg9YHJQci4ke2tleX1gXHJcblx0XHRcdGxldCB2YWx1ZT1pbmhlcml0ZWRTdHlsZS5nZXQoc3R5bGVQYXRoKVxyXG4gICAgICAgICAgICBpZih2YWx1ZSE9dW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHN0eWxlW2tleV09dmFsdWVcclxuXHRcdFx0fVxyXG4gICAgICAgICAgICByZXR1cm4gc3R5bGVcclxuICAgICAgICB9LHt9KVxyXG5cdH1cclxuXHJcblx0Y3JlYXRlQ29tcG9zZWQyUGFyZW50KHByb3BzKXtcclxuXHRcdGNvbnN0IHtjb2xvcn09dGhpcy5nZXRTdHlsZSgpXHJcblx0XHRjb25zdCB7d2lkdGgsIGhlaWdodCwgZGVzY2VudCwgY29udGVudFdpZHRoLCB3aGl0ZVNwYWNlLCAuLi5vdGhlcnN9PXByb3BzXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8R3JvdXAgd2lkdGg9e3dpZHRofSBoZWlnaHQ9e2hlaWdodH0gZGVzY2VudD17ZGVzY2VudH0+XHJcblx0XHRcdFx0PHRleHQgey4uLnt3aWR0aCxoZWlnaHQsZGVzY2VudH19IHsuLi5vdGhlcnN9IHN0eWxlPXt7d2hpdGVTcGFjZTpcInByZVwifX0vPlxyXG5cdFx0XHQ8L0dyb3VwPlxyXG5cdFx0KVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGNvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcclxuXHRcdGluaGVyaXRlZFN0eWxlOiBQcm9wVHlwZXMub2JqZWN0XHJcblx0fSwgTm9DaGlsZC5jb250ZXh0VHlwZXMpXHJcblxyXG5cdHN0YXRpYyBXb3JkV3JhcHBlcj1IdG1sV29yZFdyYXBwZXJcclxufVxyXG4iXX0=