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

			return _react2.default.createElement(
				"svg",
				_extends({}, this.props, {
					ref: "svg",
					width: width, height: height, viewBox: "0 0 " + width + " " + height }),
				_get(Object.getPrototypeOf(Document.prototype), "render", this).call(this)
			);
		}
	}, {
		key: "getChildContext",
		value: function getChildContext() {
			var _props2 = this.props;
			var width = _props2.width;
			var pageGap = _props2.pageGap;

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

			this.currentY += page.height + this.props.pageGap;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7Ozs7OztvTUFDcEIsY0FBWSxrQkFDWixXQUFTLE1BQUssS0FBTCxDQUFXLE9BQVg7OztjQUZXOzsyQkFJVDtPQUNILFdBQWtELEtBQWxELFNBREc7T0FDYyxVQUFpQyxLQUF4QyxNQUFPLFFBRGQ7Z0JBQytDLEtBQXZCLE1BRHhCO09BQytCLHFCQUQvQjtPQUNzQyx1QkFEdEM7O0FBRUosVUFDTDs7aUJBQVMsS0FBSyxLQUFMO0FBQ1IsVUFBSSxLQUFKO0FBQ0EsWUFBTyxLQUFQLEVBQWMsUUFBUSxNQUFSLEVBQWdCLGtCQUFnQixjQUFTLE1BQXpCLEdBRi9COytCQVBrQiwrQ0FPbEI7SUFESyxDQUZJOzs7O29DQWVTO2lCQUNVLEtBQUssS0FBTCxDQURWO09BQ04sc0JBRE07T0FDQywwQkFERDs7QUFFbkIsVUFBTyxPQUFPLE1BQVAsNEJBckJZLHdEQXFCWixFQUFzQztBQUNuQyxZQUFRLEVBQUMsWUFBRCxFQUFPLGdCQUFQLEVBQVI7SUFESCxDQUFQLENBRm1COzs7O2lDQU9MLFNBQVEsTUFBSztBQUMzQixPQUFHLENBQUMsSUFBRCxFQUFNO0FBQ1IsU0FBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixPQUFuQixFQURRO0FBRVIsWUFBUSxDQUFSLEdBQVUsS0FBSyxRQUFMLENBRkY7QUFHUixXQUhRO0lBQVQ7O0FBTUEsUUFBSyxRQUFMLElBQWUsS0FBSyxNQUFMLEdBQVksS0FBSyxLQUFMLENBQVcsT0FBWCxDQVBBO09BUXBCLE1BQUssS0FBSyxJQUFMLENBQUwsSUFSb0I7O0FBUzNCLE9BQUcsR0FBSCxFQUFPO0FBQ04sUUFBSSxZQUFKLENBQWlCLFFBQWpCLEVBQTBCLEtBQUssUUFBTCxDQUExQixDQURNO0FBRU4sUUFBSSxZQUFKLENBQWlCLFNBQWpCLFdBQWtDLEtBQUssS0FBTCxDQUFXLEtBQVgsU0FBb0IsS0FBSyxRQUFMLENBQXRELENBRk07SUFBUDs7OztnQ0FNWTtBQUNaLFVBQU8sS0FBSyxRQUFMLENBREs7Ozs7c0NBSU07T0FDWCxNQUFLLEtBQUssSUFBTCxDQUFMLElBRFc7O0FBRWxCLE9BQUksWUFBSixDQUFpQixRQUFqQixFQUEwQixLQUFLLFFBQUwsQ0FBMUIsQ0FGa0I7QUFHbEIsT0FBSSxZQUFKLENBQWlCLFNBQWpCLFdBQWtDLEtBQUssS0FBTCxDQUFXLEtBQVgsU0FBb0IsS0FBSyxRQUFMLENBQXRELENBSGtCOzs7O3FDQU1EO0FBQ2pCLE9BQUcsS0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixNQUFuQixJQUEyQixLQUFLLFFBQUwsQ0FBYyxNQUFkLEVBQXFCO0FBQ2xELFNBQUsscUJBQUwsR0FEa0Q7SUFBbkQ7Ozs7UUFwRG1COzs7U0FlVixvQkFBa0IsT0FBTyxNQUFQLENBQWM7QUFDbkMsU0FBUSxpQkFBVSxNQUFWO0NBRGEsRUFFdkIsY0FBUyxpQkFBVDtBQWpCZSxTQXlEYixlQUFhO0FBQ25CLFFBQU8sT0FBTyxVQUFQO0FBQ1AsU0FBUSxPQUFPLFdBQVA7QUFDUixVQUFTLEVBQVQ7QUFDQSxRQUFPO0FBQ04sY0FBVyxXQUFYO0VBREQ7O2tCQTdEbUIiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7SGFzQ2hpbGR9IGZyb20gXCIuL2FueVwiXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcbmltcG9ydCBDdXJzb3IgZnJvbSBcIi4uL2VkaXRvci9jdXJzb3JcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb2N1bWVudCBleHRlbmRzIEhhc0NoaWxke1xuXHRkaXNwbGF5TmFtZT1cImRvY3VtZW50XCJcblx0Y3VycmVudFk9dGhpcy5wcm9wcy5wYWdlR2FwXG5cbiAgICByZW5kZXIoKXtcblx0XHRjb25zdCB7Y29tcG9zZWQsIHN0YXRlOntjb250ZW50fSwgcHJvcHM6e3dpZHRoLCBoZWlnaHR9fT10aGlzXG4gICAgICAgIHJldHVybiAoXG5cdFx0XHQ8c3ZnIHsuLi50aGlzLnByb3BzfVxuXHRcdFx0XHRyZWY9XCJzdmdcIlxuXHRcdFx0XHR3aWR0aD17d2lkdGh9IGhlaWdodD17aGVpZ2h0fSB2aWV3Qm94PXtgMCAwICR7d2lkdGh9ICR7aGVpZ2h0fWB9PlxuXHRcdFx0XHR7c3VwZXIucmVuZGVyKCl9XG5cdFx0XHQ8L3N2Zz5cblx0XHQpXG4gICAgfVxuXG4gICAgc3RhdGljIGNoaWxkQ29udGV4dFR5cGVzPU9iamVjdC5hc3NpZ24oe1xuICAgICAgICBjYW52YXM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgfSxIYXNDaGlsZC5jaGlsZENvbnRleHRUeXBlcylcblxuICAgIGdldENoaWxkQ29udGV4dCgpe1xuICAgICAgICBjb25zdCB7d2lkdGgsIHBhZ2VHYXB9PXRoaXMucHJvcHNcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbihzdXBlci5nZXRDaGlsZENvbnRleHQoKSx7XG4gICAgICAgICAgICBjYW52YXM6IHt3aWR0aCxwYWdlR2FwfVxuICAgICAgICB9KVxuICAgIH1cblxuXHRhcHBlbmRDb21wb3NlZChzZWN0aW9uLHBhZ2Upe1xuXHRcdGlmKCFwYWdlKXtcblx0XHRcdHRoaXMuY2hpbGRyZW4ucHVzaChzZWN0aW9uKVxuXHRcdFx0c2VjdGlvbi55PXRoaXMuY3VycmVudFlcblx0XHRcdHJldHVyblxuXHRcdH1cblxuXHRcdHRoaXMuY3VycmVudFkrPXBhZ2UuaGVpZ2h0K3RoaXMucHJvcHMucGFnZUdhcDtcblx0XHRjb25zdCB7c3ZnfT10aGlzLnJlZnNcblx0XHRpZihzdmcpe1xuXHRcdFx0c3ZnLnNldEF0dHJpYnV0ZSgnaGVpZ2h0Jyx0aGlzLmN1cnJlbnRZKVxuXHRcdFx0c3ZnLnNldEF0dHJpYnV0ZSgndmlld0JveCcsYDAgMCAke3RoaXMucHJvcHMud2lkdGh9ICR7dGhpcy5jdXJyZW50WX1gKVxuXHRcdH1cblx0fVxuXG5cdGdldEN1cnJlbnRZKCl7XG5cdFx0cmV0dXJuIHRoaXMuY3VycmVudFlcblx0fVxuXG5cdGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0Y29uc3Qge3N2Z309dGhpcy5yZWZzXG5cdFx0c3ZnLnNldEF0dHJpYnV0ZSgnaGVpZ2h0Jyx0aGlzLmN1cnJlbnRZKVxuXHRcdHN2Zy5zZXRBdHRyaWJ1dGUoJ3ZpZXdCb3gnLGAwIDAgJHt0aGlzLnByb3BzLndpZHRofSAke3RoaXMuY3VycmVudFl9YClcblx0fVxuXG5cdG9uMUNoaWxkQ29tcG9zZWQoKXtcblx0XHRpZih0aGlzLnN0YXRlLmNvbnRlbnQubGVuZ3RoPT10aGlzLmNoaWxkcmVuLmxlbmd0aCl7XG5cdFx0XHR0aGlzLm9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpXG5cdFx0fVxuXHR9XG5cblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XG5cdFx0d2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLFxuXHRcdGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0LFxuXHRcdHBhZ2VHYXA6IDIwLFxuXHRcdHN0eWxlOiB7XG5cdFx0XHRiYWNrZ3JvdW5kOlwibGlnaHRncmF5XCJcblx0XHR9XG5cdH1cbn1cbiJdfQ==