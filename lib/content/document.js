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
		_classCallCheck(this, Document);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Document).apply(this, arguments));

		Object.assign(_this.state);
		_this.displayName = "document";
		_this.currentY = _this.props.pageGap;
		return _this;
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
				_extends({}, this.props, { ref: "svg", width: width, height: height, viewBox: "0 0 " + width + " " + height }),
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
				canvas: { width: width, pageGap: pageGap },
				y: this.currentY
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
		key: "_reComposeFrom",
		value: function _reComposeFrom() {
			//never recompose from document
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7QUFDcEIsVUFEb0IsUUFDcEIsR0FBYTt3QkFETyxVQUNQOztxRUFETyxzQkFFVixZQURHOztBQUVaLFNBQU8sTUFBUCxDQUFjLE1BQUssS0FBTCxDQUFkLENBRlk7QUFHWixRQUFLLFdBQUwsR0FBaUIsVUFBakIsQ0FIWTtBQUlaLFFBQUssUUFBTCxHQUFjLE1BQUssS0FBTCxDQUFXLE9BQVgsQ0FKRjs7RUFBYjs7Y0FEb0I7OzJCQVFUO09BQ0gsV0FBa0QsS0FBbEQsU0FERztPQUNjLFVBQWlDLEtBQXhDLE1BQU8sUUFEZDtnQkFDK0MsS0FBdkIsTUFEeEI7T0FDK0IscUJBRC9CO09BQ3NDLHVCQUR0Qzs7QUFFSixVQUNMOztpQkFBUyxLQUFLLEtBQUwsSUFBWSxLQUFJLEtBQUosRUFBVSxPQUFPLEtBQVAsRUFBYyxRQUFRLE1BQVIsRUFBZ0Isa0JBQWdCLGNBQVMsTUFBekIsR0FBN0Q7K0JBWGtCLCtDQVdsQjtJQURLLENBRkk7Ozs7b0NBYVM7aUJBQ1UsS0FBSyxLQUFMLENBRFY7T0FDTixzQkFETTtPQUNDLDBCQUREOztBQUVuQixVQUFPLE9BQU8sTUFBUCw0QkF2Qlksd0RBdUJaLEVBQXNDO0FBQ25DLFlBQVEsRUFBQyxZQUFELEVBQU8sZ0JBQVAsRUFBUjtBQUNULE9BQUcsS0FBSyxRQUFMO0lBRkcsQ0FBUCxDQUZtQjs7OztpQ0FRTCxTQUFRLE1BQUs7QUFDM0IsT0FBRyxDQUFDLElBQUQsRUFBTTtBQUNSLFNBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsT0FBbkIsRUFEUTtBQUVSLFlBQVEsQ0FBUixHQUFVLEtBQUssUUFBTCxDQUZGO0FBR1IsV0FIUTtJQUFUOztBQU1BLFFBQUssUUFBTCxJQUFlLEtBQUssTUFBTCxHQUFZLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FQQTtPQVFwQixNQUFLLEtBQUssSUFBTCxDQUFMLElBUm9COztBQVMzQixPQUFHLEdBQUgsRUFBTztBQUNOLFFBQUksWUFBSixDQUFpQixRQUFqQixFQUEwQixLQUFLLFFBQUwsQ0FBMUIsQ0FETTtBQUVOLFFBQUksWUFBSixDQUFpQixTQUFqQixXQUFrQyxLQUFLLEtBQUwsQ0FBVyxLQUFYLFNBQW9CLEtBQUssUUFBTCxDQUF0RCxDQUZNO0lBQVA7Ozs7Z0NBTVk7QUFDWixVQUFPLEtBQUssUUFBTCxDQURLOzs7O3NDQUlNO09BQ1gsTUFBSyxLQUFLLElBQUwsQ0FBTCxJQURXOztBQUVsQixPQUFJLFlBQUosQ0FBaUIsUUFBakIsRUFBMEIsS0FBSyxRQUFMLENBQTFCLENBRmtCO0FBR2xCLE9BQUksWUFBSixDQUFpQixTQUFqQixXQUFrQyxLQUFLLEtBQUwsQ0FBVyxLQUFYLFNBQW9CLEtBQUssUUFBTCxDQUF0RCxDQUhrQjs7OzttQ0FNSDs7Ozs7cUNBSUU7QUFDakIsT0FBRyxLQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLE1BQW5CLElBQTJCLEtBQUssUUFBTCxDQUFjLE1BQWQsRUFBcUI7QUFDbEQsU0FBSyxxQkFBTCxHQURrRDtJQUFuRDs7OztRQTNEbUI7OztTQWlCVixvQkFBa0IsT0FBTyxNQUFQLENBQWM7QUFDbkMsU0FBUSxpQkFBVSxNQUFWO0NBRGEsRUFFdkIsY0FBUyxpQkFBVDtBQW5CZSxTQWdFYixlQUFhO0FBQ25CLFFBQU8sT0FBTyxVQUFQO0FBQ1AsU0FBUSxPQUFPLFdBQVA7QUFDUixVQUFTLEVBQVQ7QUFDQSxRQUFPO0FBQ04sY0FBVyxXQUFYO0VBREQ7O2tCQXBFbUIiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7SGFzQ2hpbGR9IGZyb20gXCIuL2FueVwiXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcbmltcG9ydCBDdXJzb3IgZnJvbSBcIi4uL2VkaXRvci9jdXJzb3JcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb2N1bWVudCBleHRlbmRzIEhhc0NoaWxke1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHRPYmplY3QuYXNzaWduKHRoaXMuc3RhdGUpXG5cdFx0dGhpcy5kaXNwbGF5TmFtZT1cImRvY3VtZW50XCJcblx0XHR0aGlzLmN1cnJlbnRZPXRoaXMucHJvcHMucGFnZUdhcFxuXHR9XG5cbiAgICByZW5kZXIoKXtcblx0XHRjb25zdCB7Y29tcG9zZWQsIHN0YXRlOntjb250ZW50fSwgcHJvcHM6e3dpZHRoLCBoZWlnaHR9fT10aGlzXG4gICAgICAgIHJldHVybiAoXG5cdFx0XHQ8c3ZnIHsuLi50aGlzLnByb3BzfSByZWY9XCJzdmdcIiB3aWR0aD17d2lkdGh9IGhlaWdodD17aGVpZ2h0fSB2aWV3Qm94PXtgMCAwICR7d2lkdGh9ICR7aGVpZ2h0fWB9PlxuXHRcdFx0XHR7c3VwZXIucmVuZGVyKCl9XG5cdFx0XHQ8L3N2Zz5cblx0XHQpXG4gICAgfVxuXG4gICAgc3RhdGljIGNoaWxkQ29udGV4dFR5cGVzPU9iamVjdC5hc3NpZ24oe1xuICAgICAgICBjYW52YXM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgfSxIYXNDaGlsZC5jaGlsZENvbnRleHRUeXBlcylcblxuICAgIGdldENoaWxkQ29udGV4dCgpe1xuICAgICAgICBjb25zdCB7d2lkdGgsIHBhZ2VHYXB9PXRoaXMucHJvcHNcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbihzdXBlci5nZXRDaGlsZENvbnRleHQoKSx7XG4gICAgICAgICAgICBjYW52YXM6IHt3aWR0aCxwYWdlR2FwfSxcblx0XHRcdHk6IHRoaXMuY3VycmVudFlcbiAgICAgICAgfSlcbiAgICB9XG5cblx0YXBwZW5kQ29tcG9zZWQoc2VjdGlvbixwYWdlKXtcblx0XHRpZighcGFnZSl7XG5cdFx0XHR0aGlzLmNoaWxkcmVuLnB1c2goc2VjdGlvbilcblx0XHRcdHNlY3Rpb24ueT10aGlzLmN1cnJlbnRZXG5cdFx0XHRyZXR1cm5cblx0XHR9XG5cblx0XHR0aGlzLmN1cnJlbnRZKz1wYWdlLmhlaWdodCt0aGlzLnByb3BzLnBhZ2VHYXA7XG5cdFx0Y29uc3Qge3N2Z309dGhpcy5yZWZzXG5cdFx0aWYoc3ZnKXtcblx0XHRcdHN2Zy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsdGhpcy5jdXJyZW50WSlcblx0XHRcdHN2Zy5zZXRBdHRyaWJ1dGUoJ3ZpZXdCb3gnLGAwIDAgJHt0aGlzLnByb3BzLndpZHRofSAke3RoaXMuY3VycmVudFl9YClcblx0XHR9XG5cdH1cblxuXHRnZXRDdXJyZW50WSgpe1xuXHRcdHJldHVybiB0aGlzLmN1cnJlbnRZXG5cdH1cblxuXHRjb21wb25lbnREaWRNb3VudCgpe1xuXHRcdGNvbnN0IHtzdmd9PXRoaXMucmVmc1xuXHRcdHN2Zy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsdGhpcy5jdXJyZW50WSlcblx0XHRzdmcuc2V0QXR0cmlidXRlKCd2aWV3Qm94JyxgMCAwICR7dGhpcy5wcm9wcy53aWR0aH0gJHt0aGlzLmN1cnJlbnRZfWApXG5cdH1cblxuXHRfcmVDb21wb3NlRnJvbSgpe1xuXHRcdC8vbmV2ZXIgcmVjb21wb3NlIGZyb20gZG9jdW1lbnRcblx0fVxuXG5cdG9uMUNoaWxkQ29tcG9zZWQoKXtcblx0XHRpZih0aGlzLnN0YXRlLmNvbnRlbnQubGVuZ3RoPT10aGlzLmNoaWxkcmVuLmxlbmd0aCl7XG5cdFx0XHR0aGlzLm9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpXG5cdFx0fVxuXHR9XG5cblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XG5cdFx0d2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLFxuXHRcdGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0LFxuXHRcdHBhZ2VHYXA6IDIwLFxuXHRcdHN0eWxlOiB7XG5cdFx0XHRiYWNrZ3JvdW5kOlwibGlnaHRncmF5XCJcblx0XHR9XG5cdH1cbn1cbiJdfQ==