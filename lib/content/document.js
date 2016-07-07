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

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Document)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.currentY = _this.props.pageGap, _temp), _possibleConstructorReturn(_this, _ret);
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
				_get(Object.getPrototypeOf(Document.prototype), "render", this).call(this),
				this.more()
			);
		}
	}, {
		key: "getChildContext",
		value: function getChildContext() {
			var documentStyles = this.props.documentStyles;
			var _props3 = this.props;
			var width = _props3.width;
			var pageGap = _props3.pageGap;

			return Object.assign(_get(Object.getPrototypeOf(Document.prototype), "getChildContext", this).call(this), {
				canvas: { width: width, pageGap: pageGap },
				getDefaultStyle: function getDefaultStyle(type) {
					return documentStyles.getDefault(type);
				}
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
	}, {
		key: "more",
		value: function more() {
			return null;
		}
	}]);

	return Document;
}(_any.HasChild);

Document.displayName = "document";
Document.childContextTypes = Object.assign({
	canvas: _react.PropTypes.object,
	getDefaultStyle: _react.PropTypes.func
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7Ozs7O29NQUdwQixXQUFTLE1BQUssS0FBTCxDQUFXLE9BQVg7OztjQUhXOzsyQkFLVDtPQUNILFdBQWtELEtBQWxELFNBREc7T0FDYyxVQUFpQyxLQUF4QyxNQUFPLFFBRGQ7Z0JBQytDLEtBQXZCLE1BRHhCO09BQytCLHFCQUQvQjtPQUNzQyx1QkFEdEM7aUJBRXdCLEtBQUssS0FBTCxDQUZ4QjtPQUVILHdDQUZHOztPQUVnQiwrREFGaEI7O0FBR0osVUFDTDs7aUJBQVM7QUFDUixVQUFJLEtBQUo7QUFDQSxZQUFPLEtBQVAsRUFBYyxRQUFRLE1BQVIsRUFBZ0Isa0JBQWdCLGNBQVMsTUFBekIsR0FGL0I7K0JBVGtCLCtDQVNsQjtJQUlFLEtBQUssSUFBTCxFQUpGO0lBREssQ0FISTs7OztvQ0FrQlM7QUFDbkIsT0FBTSxpQkFBZSxLQUFLLEtBQUwsQ0FBVyxjQUFYLENBREY7aUJBRVUsS0FBSyxLQUFMLENBRlY7T0FFTixzQkFGTTtPQUVDLDBCQUZEOztBQUduQixVQUFPLE9BQU8sTUFBUCw0QkExQlksd0RBMEJaLEVBQXNDO0FBQ25DLFlBQVEsRUFBQyxZQUFELEVBQU8sZ0JBQVAsRUFBUjtBQUNULDhDQUFnQixNQUFLO0FBQ3BCLFlBQU8sZUFBZSxVQUFmLENBQTBCLElBQTFCLENBQVAsQ0FEb0I7S0FGdUI7SUFBdEMsQ0FBUCxDQUhtQjs7OztpQ0FXTCxTQUFRLE1BQUs7QUFDM0IsT0FBRyxDQUFDLElBQUQsRUFBTTtBQUNSLFNBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsT0FBbkIsRUFEUTtBQUVSLFlBQVEsQ0FBUixHQUFVLEtBQUssUUFBTCxDQUZGO0FBR1IsV0FIUTtJQUFUOztBQU1BLFFBQUssUUFBTCxJQUFlLEtBQUssSUFBTCxDQUFVLE1BQVYsR0FBaUIsS0FBSyxLQUFMLENBQVcsT0FBWCxDQVBMO09BUXBCLE1BQUssS0FBSyxJQUFMLENBQUwsSUFSb0I7O0FBUzNCLE9BQUcsR0FBSCxFQUFPO0FBQ04sUUFBSSxZQUFKLENBQWlCLFFBQWpCLEVBQTBCLEtBQUssUUFBTCxDQUExQixDQURNO0FBRU4sUUFBSSxZQUFKLENBQWlCLFNBQWpCLFdBQWtDLEtBQUssS0FBTCxDQUFXLEtBQVgsU0FBb0IsS0FBSyxRQUFMLENBQXRELENBRk07SUFBUDs7OztnQ0FNWTtBQUNaLFVBQU8sS0FBSyxRQUFMLENBREs7Ozs7c0NBSU07T0FDWCxNQUFLLEtBQUssSUFBTCxDQUFMLElBRFc7O0FBRWxCLE9BQUksWUFBSixDQUFpQixRQUFqQixFQUEwQixLQUFLLFFBQUwsQ0FBMUIsQ0FGa0I7QUFHbEIsT0FBSSxZQUFKLENBQWlCLFNBQWpCLFdBQWtDLEtBQUssS0FBTCxDQUFXLEtBQVgsU0FBb0IsS0FBSyxRQUFMLENBQXRELENBSGtCOzs7O3FDQU1EO0FBQ2pCLE9BQUcsS0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixNQUFuQixJQUEyQixLQUFLLFFBQUwsQ0FBYyxNQUFkLEVBQXFCO0FBQ2xELFNBQUsscUJBQUwsR0FEa0Q7SUFBbkQ7Ozs7eUJBS0s7QUFDTCxVQUFPLElBQVAsQ0FESzs7OztRQWpFYzs7O1NBQ2IsY0FBWTtBQURDLFNBa0JWLG9CQUFrQixPQUFPLE1BQVAsQ0FBYztBQUNuQyxTQUFRLGlCQUFVLE1BQVY7QUFDZCxrQkFBaUIsaUJBQVUsSUFBVjtDQUZVLEVBR3ZCLGNBQVMsaUJBQVQ7QUFyQmUsU0FxRWIsZUFBYTtBQUNuQixRQUFPLE9BQU8sVUFBUDtBQUNQLFNBQVEsT0FBTyxXQUFQO0FBQ1IsVUFBUyxFQUFUO0FBQ0EsUUFBTztBQUNOLGNBQVcsV0FBWDtFQUREOztrQkF6RW1CIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge0hhc0NoaWxkfSBmcm9tIFwiLi9hbnlcIlxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXG5pbXBvcnQgQ3Vyc29yIGZyb20gXCIuLi9lZGl0b3IvY3Vyc29yXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9jdW1lbnQgZXh0ZW5kcyBIYXNDaGlsZHtcblx0c3RhdGljIGRpc3BsYXlOYW1lPVwiZG9jdW1lbnRcIlxuXHRcblx0Y3VycmVudFk9dGhpcy5wcm9wcy5wYWdlR2FwXG5cbiAgICByZW5kZXIoKXtcblx0XHRjb25zdCB7Y29tcG9zZWQsIHN0YXRlOntjb250ZW50fSwgcHJvcHM6e3dpZHRoLCBoZWlnaHR9fT10aGlzXG5cdFx0Y29uc3Qge2RvY3VtZW50U3R5bGVzLCAuLi5vdGhlcnN9PXRoaXMucHJvcHNcbiAgICAgICAgcmV0dXJuIChcblx0XHRcdDxzdmcgey4uLm90aGVyc31cblx0XHRcdFx0cmVmPVwic3ZnXCJcblx0XHRcdFx0d2lkdGg9e3dpZHRofSBoZWlnaHQ9e2hlaWdodH0gdmlld0JveD17YDAgMCAke3dpZHRofSAke2hlaWdodH1gfT5cblx0XHRcdFx0e3N1cGVyLnJlbmRlcigpfVxuXHRcdFx0XHR7dGhpcy5tb3JlKCl9XG5cdFx0XHQ8L3N2Zz5cblx0XHQpXG4gICAgfVxuXG4gICAgc3RhdGljIGNoaWxkQ29udGV4dFR5cGVzPU9iamVjdC5hc3NpZ24oe1xuICAgICAgICBjYW52YXM6IFByb3BUeXBlcy5vYmplY3QsXG5cdFx0Z2V0RGVmYXVsdFN0eWxlOiBQcm9wVHlwZXMuZnVuY1xuICAgIH0sSGFzQ2hpbGQuY2hpbGRDb250ZXh0VHlwZXMpXG5cbiAgICBnZXRDaGlsZENvbnRleHQoKXtcblx0XHRjb25zdCBkb2N1bWVudFN0eWxlcz10aGlzLnByb3BzLmRvY3VtZW50U3R5bGVzXG4gICAgICAgIGNvbnN0IHt3aWR0aCwgcGFnZUdhcH09dGhpcy5wcm9wc1xuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKHN1cGVyLmdldENoaWxkQ29udGV4dCgpLHtcbiAgICAgICAgICAgIGNhbnZhczoge3dpZHRoLHBhZ2VHYXB9LFxuXHRcdFx0Z2V0RGVmYXVsdFN0eWxlKHR5cGUpe1xuXHRcdFx0XHRyZXR1cm4gZG9jdW1lbnRTdHlsZXMuZ2V0RGVmYXVsdCh0eXBlKVxuXHRcdFx0fVxuICAgICAgICB9KVxuICAgIH1cblxuXHRhcHBlbmRDb21wb3NlZChzZWN0aW9uLHBhZ2Upe1xuXHRcdGlmKCFwYWdlKXtcblx0XHRcdHRoaXMuY2hpbGRyZW4ucHVzaChzZWN0aW9uKVxuXHRcdFx0c2VjdGlvbi55PXRoaXMuY3VycmVudFlcblx0XHRcdHJldHVyblxuXHRcdH1cblxuXHRcdHRoaXMuY3VycmVudFkrPXBhZ2Uuc2l6ZS5oZWlnaHQrdGhpcy5wcm9wcy5wYWdlR2FwO1xuXHRcdGNvbnN0IHtzdmd9PXRoaXMucmVmc1xuXHRcdGlmKHN2Zyl7XG5cdFx0XHRzdmcuc2V0QXR0cmlidXRlKCdoZWlnaHQnLHRoaXMuY3VycmVudFkpXG5cdFx0XHRzdmcuc2V0QXR0cmlidXRlKCd2aWV3Qm94JyxgMCAwICR7dGhpcy5wcm9wcy53aWR0aH0gJHt0aGlzLmN1cnJlbnRZfWApXG5cdFx0fVxuXHR9XG5cblx0Z2V0Q3VycmVudFkoKXtcblx0XHRyZXR1cm4gdGhpcy5jdXJyZW50WVxuXHR9XG5cblx0Y29tcG9uZW50RGlkTW91bnQoKXtcblx0XHRjb25zdCB7c3ZnfT10aGlzLnJlZnNcblx0XHRzdmcuc2V0QXR0cmlidXRlKCdoZWlnaHQnLHRoaXMuY3VycmVudFkpXG5cdFx0c3ZnLnNldEF0dHJpYnV0ZSgndmlld0JveCcsYDAgMCAke3RoaXMucHJvcHMud2lkdGh9ICR7dGhpcy5jdXJyZW50WX1gKVxuXHR9XG5cblx0b24xQ2hpbGRDb21wb3NlZCgpe1xuXHRcdGlmKHRoaXMuc3RhdGUuY29udGVudC5sZW5ndGg9PXRoaXMuY2hpbGRyZW4ubGVuZ3RoKXtcblx0XHRcdHRoaXMub25BbGxDaGlsZHJlbkNvbXBvc2VkKClcblx0XHR9XG5cdH1cblx0XG5cdG1vcmUoKXtcblx0XHRyZXR1cm4gbnVsbFxuXHR9XG5cblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XG5cdFx0d2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLFxuXHRcdGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0LFxuXHRcdHBhZ2VHYXA6IDIwLFxuXHRcdHN0eWxlOiB7XG5cdFx0XHRiYWNrZ3JvdW5kOlwibGlnaHRncmF5XCJcblx0XHR9XG5cdH1cbn1cbiJdfQ==