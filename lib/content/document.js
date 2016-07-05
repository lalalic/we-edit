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

var _group = require("../composed/group");

var _group2 = _interopRequireDefault(_group);

var _cursor = require("../editor/cursor");

var _cursor2 = _interopRequireDefault(_cursor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Document = function (_HasChild) {
	_inherits(Document, _HasChild);

	function Document() {
		var _Object$getPrototypeO;

		var _temp, _this, _ret;

		_classCallCheck(this, Document);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Document)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.displayName = "document", _this.currentY = _this.props.pageGap, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Document, [{
		key: "render",
		value: function render() {
			var composed = this.composed;
			var content = this.state.content;
			var _props = this.props;
			var width = _props.width;
			var height = _props.height;
			var _props2 = this.props;
			var documentStyles = _props2.documentStyles;

			var others = _objectWithoutProperties(_props2, ["documentStyles"]);

			return _react2.default.createElement(
				"svg",
				_extends({}, others, {
					ref: "svg",
					width: width, height: height, viewBox: "0 0 " + width + " " + height }),
				_get(Object.getPrototypeOf(Document.prototype), "render", this).call(this)
			);
		}
	}, {
		key: "getChildContext",
		value: function getChildContext() {
			var _props3 = this.props;
			var width = _props3.width;
			var pageGap = _props3.pageGap;

			return Object.assign(_get(Object.getPrototypeOf(Document.prototype), "getChildContext", this).call(this), {
				canvas: { width: width, pageGap: pageGap }
			});
		}
	}, {
		key: "appendComposed",
		value: function appendComposed(section, page) {
			if (!page) {
				this.children.push(section);
				section.y = this.currentY;
				return;
			}

			this.currentY += page.size.height + this.props.pageGap;
			var svg = this.refs.svg;

			if (svg) {
				svg.setAttribute('height', this.currentY);
				svg.setAttribute('viewBox', "0 0 " + this.props.width + " " + this.currentY);
			}
		}
	}, {
		key: "getCurrentY",
		value: function getCurrentY() {
			return this.currentY;
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			var svg = this.refs.svg;

			svg.setAttribute('height', this.currentY);
			svg.setAttribute('viewBox', "0 0 " + this.props.width + " " + this.currentY);
		}
	}, {
		key: "on1ChildComposed",
		value: function on1ChildComposed() {
			if (this.state.content.length == this.children.length) {
				this.onAllChildrenComposed();
			}
		}
	}]);

	return Document;
}(_any.HasChild);

Document.childContextTypes = Object.assign({
	canvas: _react.PropTypes.object
}, _any.HasChild.childContextTypes);
Document.defaultProps = {
	width: window.innerWidth,
	height: window.innerHeight,
	pageGap: 20,
	style: {
		background: "lightgray"
	}
};
exports.default = Document;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7Ozs7O29NQUNwQixjQUFZLGtCQUNaLFdBQVMsTUFBSyxLQUFMLENBQVcsT0FBWDs7O2NBRlc7OzJCQUlUO09BQ0gsV0FBa0QsS0FBbEQsU0FERztPQUNjLFVBQWlDLEtBQXhDLE1BQU8sUUFEZDtnQkFDK0MsS0FBdkIsTUFEeEI7T0FDK0IscUJBRC9CO09BQ3NDLHVCQUR0QztpQkFFd0IsS0FBSyxLQUFMLENBRnhCO09BRUgsd0NBRkc7O09BRWdCLCtEQUZoQjs7QUFHSixVQUNMOztpQkFBUztBQUNSLFVBQUksS0FBSjtBQUNBLFlBQU8sS0FBUCxFQUFjLFFBQVEsTUFBUixFQUFnQixrQkFBZ0IsY0FBUyxNQUF6QixHQUYvQjsrQkFSa0IsK0NBUWxCO0lBREssQ0FISTs7OztvQ0FnQlM7aUJBQ1UsS0FBSyxLQUFMLENBRFY7T0FDTixzQkFETTtPQUNDLDBCQUREOztBQUVuQixVQUFPLE9BQU8sTUFBUCw0QkF0Qlksd0RBc0JaLEVBQXNDO0FBQ25DLFlBQVEsRUFBQyxZQUFELEVBQU8sZ0JBQVAsRUFBUjtJQURILENBQVAsQ0FGbUI7Ozs7aUNBT0wsU0FBUSxNQUFLO0FBQzNCLE9BQUcsQ0FBQyxJQUFELEVBQU07QUFDUixTQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW1CLE9BQW5CLEVBRFE7QUFFUixZQUFRLENBQVIsR0FBVSxLQUFLLFFBQUwsQ0FGRjtBQUdSLFdBSFE7SUFBVDs7QUFNQSxRQUFLLFFBQUwsSUFBZSxLQUFLLElBQUwsQ0FBVSxNQUFWLEdBQWlCLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FQTDtPQVFwQixNQUFLLEtBQUssSUFBTCxDQUFMLElBUm9COztBQVMzQixPQUFHLEdBQUgsRUFBTztBQUNOLFFBQUksWUFBSixDQUFpQixRQUFqQixFQUEwQixLQUFLLFFBQUwsQ0FBMUIsQ0FETTtBQUVOLFFBQUksWUFBSixDQUFpQixTQUFqQixXQUFrQyxLQUFLLEtBQUwsQ0FBVyxLQUFYLFNBQW9CLEtBQUssUUFBTCxDQUF0RCxDQUZNO0lBQVA7Ozs7Z0NBTVk7QUFDWixVQUFPLEtBQUssUUFBTCxDQURLOzs7O3NDQUlNO09BQ1gsTUFBSyxLQUFLLElBQUwsQ0FBTCxJQURXOztBQUVsQixPQUFJLFlBQUosQ0FBaUIsUUFBakIsRUFBMEIsS0FBSyxRQUFMLENBQTFCLENBRmtCO0FBR2xCLE9BQUksWUFBSixDQUFpQixTQUFqQixXQUFrQyxLQUFLLEtBQUwsQ0FBVyxLQUFYLFNBQW9CLEtBQUssUUFBTCxDQUF0RCxDQUhrQjs7OztxQ0FNRDtBQUNqQixPQUFHLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsTUFBbkIsSUFBMkIsS0FBSyxRQUFMLENBQWMsTUFBZCxFQUFxQjtBQUNsRCxTQUFLLHFCQUFMLEdBRGtEO0lBQW5EOzs7O1FBckRtQjs7O1NBZ0JWLG9CQUFrQixPQUFPLE1BQVAsQ0FBYztBQUNuQyxTQUFRLGlCQUFVLE1BQVY7Q0FEYSxFQUV2QixjQUFTLGlCQUFUO0FBbEJlLFNBMERiLGVBQWE7QUFDbkIsUUFBTyxPQUFPLFVBQVA7QUFDUCxTQUFRLE9BQU8sV0FBUDtBQUNSLFVBQVMsRUFBVDtBQUNBLFFBQU87QUFDTixjQUFXLFdBQVg7RUFERDs7a0JBOURtQiIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtIYXNDaGlsZH0gZnJvbSBcIi4vYW55XCJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZWQvZ3JvdXBcIlxuaW1wb3J0IEN1cnNvciBmcm9tIFwiLi4vZWRpdG9yL2N1cnNvclwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvY3VtZW50IGV4dGVuZHMgSGFzQ2hpbGR7XG5cdGRpc3BsYXlOYW1lPVwiZG9jdW1lbnRcIlxuXHRjdXJyZW50WT10aGlzLnByb3BzLnBhZ2VHYXBcblxuICAgIHJlbmRlcigpe1xuXHRcdGNvbnN0IHtjb21wb3NlZCwgc3RhdGU6e2NvbnRlbnR9LCBwcm9wczp7d2lkdGgsIGhlaWdodH19PXRoaXNcblx0XHRjb25zdCB7ZG9jdW1lbnRTdHlsZXMsIC4uLm90aGVyc309dGhpcy5wcm9wc1xuICAgICAgICByZXR1cm4gKFxuXHRcdFx0PHN2ZyB7Li4ub3RoZXJzfVxuXHRcdFx0XHRyZWY9XCJzdmdcIlxuXHRcdFx0XHR3aWR0aD17d2lkdGh9IGhlaWdodD17aGVpZ2h0fSB2aWV3Qm94PXtgMCAwICR7d2lkdGh9ICR7aGVpZ2h0fWB9PlxuXHRcdFx0XHR7c3VwZXIucmVuZGVyKCl9XG5cdFx0XHQ8L3N2Zz5cblx0XHQpXG4gICAgfVxuXG4gICAgc3RhdGljIGNoaWxkQ29udGV4dFR5cGVzPU9iamVjdC5hc3NpZ24oe1xuICAgICAgICBjYW52YXM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgfSxIYXNDaGlsZC5jaGlsZENvbnRleHRUeXBlcylcblxuICAgIGdldENoaWxkQ29udGV4dCgpe1xuICAgICAgICBjb25zdCB7d2lkdGgsIHBhZ2VHYXB9PXRoaXMucHJvcHNcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbihzdXBlci5nZXRDaGlsZENvbnRleHQoKSx7XG4gICAgICAgICAgICBjYW52YXM6IHt3aWR0aCxwYWdlR2FwfVxuICAgICAgICB9KVxuICAgIH1cblxuXHRhcHBlbmRDb21wb3NlZChzZWN0aW9uLHBhZ2Upe1xuXHRcdGlmKCFwYWdlKXtcblx0XHRcdHRoaXMuY2hpbGRyZW4ucHVzaChzZWN0aW9uKVxuXHRcdFx0c2VjdGlvbi55PXRoaXMuY3VycmVudFlcblx0XHRcdHJldHVyblxuXHRcdH1cblxuXHRcdHRoaXMuY3VycmVudFkrPXBhZ2Uuc2l6ZS5oZWlnaHQrdGhpcy5wcm9wcy5wYWdlR2FwO1xuXHRcdGNvbnN0IHtzdmd9PXRoaXMucmVmc1xuXHRcdGlmKHN2Zyl7XG5cdFx0XHRzdmcuc2V0QXR0cmlidXRlKCdoZWlnaHQnLHRoaXMuY3VycmVudFkpXG5cdFx0XHRzdmcuc2V0QXR0cmlidXRlKCd2aWV3Qm94JyxgMCAwICR7dGhpcy5wcm9wcy53aWR0aH0gJHt0aGlzLmN1cnJlbnRZfWApXG5cdFx0fVxuXHR9XG5cblx0Z2V0Q3VycmVudFkoKXtcblx0XHRyZXR1cm4gdGhpcy5jdXJyZW50WVxuXHR9XG5cblx0Y29tcG9uZW50RGlkTW91bnQoKXtcblx0XHRjb25zdCB7c3ZnfT10aGlzLnJlZnNcblx0XHRzdmcuc2V0QXR0cmlidXRlKCdoZWlnaHQnLHRoaXMuY3VycmVudFkpXG5cdFx0c3ZnLnNldEF0dHJpYnV0ZSgndmlld0JveCcsYDAgMCAke3RoaXMucHJvcHMud2lkdGh9ICR7dGhpcy5jdXJyZW50WX1gKVxuXHR9XG5cblx0b24xQ2hpbGRDb21wb3NlZCgpe1xuXHRcdGlmKHRoaXMuc3RhdGUuY29udGVudC5sZW5ndGg9PXRoaXMuY2hpbGRyZW4ubGVuZ3RoKXtcblx0XHRcdHRoaXMub25BbGxDaGlsZHJlbkNvbXBvc2VkKClcblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtcblx0XHR3aWR0aDogd2luZG93LmlubmVyV2lkdGgsXG5cdFx0aGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQsXG5cdFx0cGFnZUdhcDogMjAsXG5cdFx0c3R5bGU6IHtcblx0XHRcdGJhY2tncm91bmQ6XCJsaWdodGdyYXlcIlxuXHRcdH1cblx0fVxufVxuIl19