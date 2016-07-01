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
		value: function on1ChildComposed() {}
	}, {
		key: "onAllChildrenComposed",
		value: function onAllChildrenComposed() {}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7QUFDcEIsVUFEb0IsUUFDcEIsR0FBYTt3QkFETyxVQUNQOztxRUFETyxzQkFFVixZQURHOztBQUVaLFNBQU8sTUFBUCxDQUFjLE1BQUssS0FBTCxDQUFkLENBRlk7QUFHWixRQUFLLFdBQUwsR0FBaUIsVUFBakIsQ0FIWTtBQUlaLFFBQUssUUFBTCxHQUFjLE1BQUssS0FBTCxDQUFXLE9BQVgsQ0FKRjs7RUFBYjs7Y0FEb0I7OzJCQVFUO09BQ0gsV0FBa0QsS0FBbEQsU0FERztPQUNjLFVBQWlDLEtBQXhDLE1BQU8sUUFEZDtnQkFDK0MsS0FBdkIsTUFEeEI7T0FDK0IscUJBRC9CO09BQ3NDLHVCQUR0Qzs7QUFFSixVQUNMOztpQkFBUyxLQUFLLEtBQUwsSUFBWSxLQUFJLEtBQUosRUFBVSxPQUFPLEtBQVAsRUFBYyxRQUFRLE1BQVIsRUFBZ0Isa0JBQWdCLGNBQVMsTUFBekIsR0FBN0Q7K0JBWGtCLCtDQVdsQjtJQURLLENBRkk7Ozs7b0NBYVM7aUJBQ1UsS0FBSyxLQUFMLENBRFY7T0FDTixzQkFETTtPQUNDLDBCQUREOztBQUVuQixVQUFPLE9BQU8sTUFBUCw0QkF2Qlksd0RBdUJaLEVBQXNDO0FBQ25DLFlBQVEsRUFBQyxZQUFELEVBQU8sZ0JBQVAsRUFBUjtBQUNULE9BQUcsS0FBSyxRQUFMO0lBRkcsQ0FBUCxDQUZtQjs7OztpQ0FRTCxTQUFRLE1BQUs7QUFDM0IsT0FBRyxDQUFDLElBQUQsRUFBTTtBQUNSLFNBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsT0FBbkIsRUFEUTtBQUVSLFlBQVEsQ0FBUixHQUFVLEtBQUssUUFBTCxDQUZGO0lBQVQ7O0FBS0EsUUFBSyxRQUFMLElBQWUsS0FBSyxNQUFMLEdBQVksS0FBSyxLQUFMLENBQVcsT0FBWCxDQU5BO09BT3BCLE1BQUssS0FBSyxJQUFMLENBQUwsSUFQb0I7O0FBUTNCLE9BQUcsR0FBSCxFQUFPO0FBQ04sUUFBSSxZQUFKLENBQWlCLFFBQWpCLEVBQTBCLEtBQUssUUFBTCxDQUExQixDQURNO0FBRU4sUUFBSSxZQUFKLENBQWlCLFNBQWpCLFdBQWtDLEtBQUssS0FBTCxDQUFXLEtBQVgsU0FBb0IsS0FBSyxRQUFMLENBQXRELENBRk07SUFBUDs7OztnQ0FNWTtBQUNaLFVBQU8sS0FBSyxRQUFMLENBREs7Ozs7c0NBSU07T0FDWCxNQUFLLEtBQUssSUFBTCxDQUFMLElBRFc7O0FBRWxCLE9BQUksWUFBSixDQUFpQixRQUFqQixFQUEwQixLQUFLLFFBQUwsQ0FBMUIsQ0FGa0I7QUFHbEIsT0FBSSxZQUFKLENBQWlCLFNBQWpCLFdBQWtDLEtBQUssS0FBTCxDQUFXLEtBQVgsU0FBb0IsS0FBSyxRQUFMLENBQXRELENBSGtCOzs7O21DQU1IOzs7OztxQ0FJRTs7OzBDQUlLOzs7UUE3REg7OztTQWlCVixvQkFBa0IsT0FBTyxNQUFQLENBQWM7QUFDbkMsU0FBUSxpQkFBVSxNQUFWO0NBRGEsRUFFdkIsY0FBUyxpQkFBVDtBQW5CZSxTQWlFYixlQUFhO0FBQ25CLFFBQU8sT0FBTyxVQUFQO0FBQ1AsU0FBUSxPQUFPLFdBQVA7QUFDUixVQUFTLEVBQVQ7QUFDQSxRQUFPO0FBQ04sY0FBVyxXQUFYO0VBREQ7O2tCQXJFbUIiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7SGFzQ2hpbGR9IGZyb20gXCIuL2FueVwiXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcbmltcG9ydCBDdXJzb3IgZnJvbSBcIi4uL2VkaXRvci9jdXJzb3JcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb2N1bWVudCBleHRlbmRzIEhhc0NoaWxke1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHRPYmplY3QuYXNzaWduKHRoaXMuc3RhdGUpXG5cdFx0dGhpcy5kaXNwbGF5TmFtZT1cImRvY3VtZW50XCJcblx0XHR0aGlzLmN1cnJlbnRZPXRoaXMucHJvcHMucGFnZUdhcFxuXHR9XG5cdFxuICAgIHJlbmRlcigpe1xuXHRcdGNvbnN0IHtjb21wb3NlZCwgc3RhdGU6e2NvbnRlbnR9LCBwcm9wczp7d2lkdGgsIGhlaWdodH19PXRoaXNcbiAgICAgICAgcmV0dXJuIChcblx0XHRcdDxzdmcgey4uLnRoaXMucHJvcHN9IHJlZj1cInN2Z1wiIHdpZHRoPXt3aWR0aH0gaGVpZ2h0PXtoZWlnaHR9IHZpZXdCb3g9e2AwIDAgJHt3aWR0aH0gJHtoZWlnaHR9YH0+XG5cdFx0XHRcdHtzdXBlci5yZW5kZXIoKX1cblx0XHRcdDwvc3ZnPlxuXHRcdClcbiAgICB9XG5cbiAgICBzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9T2JqZWN0LmFzc2lnbih7XG4gICAgICAgIGNhbnZhczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICB9LEhhc0NoaWxkLmNoaWxkQ29udGV4dFR5cGVzKVxuXG4gICAgZ2V0Q2hpbGRDb250ZXh0KCl7XG4gICAgICAgIGNvbnN0IHt3aWR0aCwgcGFnZUdhcH09dGhpcy5wcm9wc1xuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKHN1cGVyLmdldENoaWxkQ29udGV4dCgpLHtcbiAgICAgICAgICAgIGNhbnZhczoge3dpZHRoLHBhZ2VHYXB9LFxuXHRcdFx0eTogdGhpcy5jdXJyZW50WVxuICAgICAgICB9KVxuICAgIH1cblxuXHRhcHBlbmRDb21wb3NlZChzZWN0aW9uLHBhZ2Upe1xuXHRcdGlmKCFwYWdlKXtcblx0XHRcdHRoaXMuY2hpbGRyZW4ucHVzaChzZWN0aW9uKVxuXHRcdFx0c2VjdGlvbi55PXRoaXMuY3VycmVudFlcblx0XHR9XG5cdFx0XG5cdFx0dGhpcy5jdXJyZW50WSs9cGFnZS5oZWlnaHQrdGhpcy5wcm9wcy5wYWdlR2FwO1xuXHRcdGNvbnN0IHtzdmd9PXRoaXMucmVmc1xuXHRcdGlmKHN2Zyl7XG5cdFx0XHRzdmcuc2V0QXR0cmlidXRlKCdoZWlnaHQnLHRoaXMuY3VycmVudFkpXG5cdFx0XHRzdmcuc2V0QXR0cmlidXRlKCd2aWV3Qm94JyxgMCAwICR7dGhpcy5wcm9wcy53aWR0aH0gJHt0aGlzLmN1cnJlbnRZfWApXG5cdFx0fVxuXHR9XG5cdFxuXHRnZXRDdXJyZW50WSgpe1xuXHRcdHJldHVybiB0aGlzLmN1cnJlbnRZXG5cdH1cblx0XG5cdGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0Y29uc3Qge3N2Z309dGhpcy5yZWZzXG5cdFx0c3ZnLnNldEF0dHJpYnV0ZSgnaGVpZ2h0Jyx0aGlzLmN1cnJlbnRZKVxuXHRcdHN2Zy5zZXRBdHRyaWJ1dGUoJ3ZpZXdCb3gnLGAwIDAgJHt0aGlzLnByb3BzLndpZHRofSAke3RoaXMuY3VycmVudFl9YClcblx0fVxuXG5cdF9yZUNvbXBvc2VGcm9tKCl7XG5cdFx0Ly9uZXZlciByZWNvbXBvc2UgZnJvbSBkb2N1bWVudFxuXHR9XG5cdFxuXHRvbjFDaGlsZENvbXBvc2VkKCl7XG5cdFx0XG5cdH1cblx0XG5cdG9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpe1xuXHRcdFxuXHR9XG5cblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XG5cdFx0d2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLFxuXHRcdGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0LFxuXHRcdHBhZ2VHYXA6IDIwLFxuXHRcdHN0eWxlOiB7XG5cdFx0XHRiYWNrZ3JvdW5kOlwibGlnaHRncmF5XCJcblx0XHR9XG5cdH1cbn1cbiJdfQ==