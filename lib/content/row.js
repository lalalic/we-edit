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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Row = function (_Any) {
	_inherits(Row, _Any);

	function Row() {
		_classCallCheck(this, Row);

		return _possibleConstructorReturn(this, (Row.__proto__ || Object.getPrototypeOf(Row)).apply(this, arguments));
	}

	_createClass(Row, [{
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"tr",
				null,
				this.getContent()
			);
		}
	}, {
		key: "appendComposed",
		value: function appendComposed() {}
	}, {
		key: "on1ChildComposed",
		value: function on1ChildComposed() {
			this.computed.composed.push([]);
			_get(Row.prototype.__proto__ || Object.getPrototypeOf(Row.prototype), "on1ChildComposed", this).apply(this, arguments);
		}
	}, {
		key: "createComposed2Parent",
		value: function createComposed2Parent() {
			var w = 0,
			    h = 0;
			var positionedCells = this.computed.children.map(function (cell, i) {
				var composedCell = cell.createComposed2Parent();
				var _composedCell$props = composedCell.props,
				    width = _composedCell$props.width,
				    height = _composedCell$props.height;

				h = Math.max(h, height);
				var positionedCell = _react2.default.createElement(
					_group2.default,
					{ x: w, key: i },
					composedCell
				);

				w += width;
				return positionedCell;
			});

			return _react2.default.createElement(
				ComposedRow,
				{ width: w, height: h },
				positionedCells
			);
		}
	}, {
		key: "onAllChildrenComposed",
		value: function onAllChildrenComposed() {
			this.computed.composed.splice(this.computed.children.length); //on1ChildComposed will always add 1
			_get(Row.prototype.__proto__ || Object.getPrototypeOf(Row.prototype), "onAllChildrenComposed", this).call(this);
		}
	}]);

	return Row;
}(_any2.default);

Row.displayName = "row";
exports.default = Row;

var ComposedRow = function (_Group) {
	_inherits(ComposedRow, _Group);

	function ComposedRow() {
		_classCallCheck(this, ComposedRow);

		return _possibleConstructorReturn(this, (ComposedRow.__proto__ || Object.getPrototypeOf(ComposedRow)).apply(this, arguments));
	}

	_createClass(ComposedRow, [{
		key: "getChildContext",
		value: function getChildContext() {
			return {
				rowSize: {
					width: this.props.width,
					height: this.props.height
				}
			};
		}
	}]);

	return ComposedRow;
}(_group2.default);

ComposedRow.childContextTypes = {
	rowSize: _react.PropTypes.object
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3Jvdy5qcyJdLCJuYW1lcyI6WyJSb3ciLCJnZXRDb250ZW50IiwiY29tcHV0ZWQiLCJjb21wb3NlZCIsInB1c2giLCJhcmd1bWVudHMiLCJ3IiwiaCIsInBvc2l0aW9uZWRDZWxscyIsImNoaWxkcmVuIiwibWFwIiwiY2VsbCIsImkiLCJjb21wb3NlZENlbGwiLCJjcmVhdGVDb21wb3NlZDJQYXJlbnQiLCJwcm9wcyIsIndpZHRoIiwiaGVpZ2h0IiwiTWF0aCIsIm1heCIsInBvc2l0aW9uZWRDZWxsIiwic3BsaWNlIiwibGVuZ3RoIiwiZGlzcGxheU5hbWUiLCJDb21wb3NlZFJvdyIsInJvd1NpemUiLCJjaGlsZENvbnRleHRUeXBlcyIsIm9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxHOzs7Ozs7Ozs7OzsyQkFFWjtBQUNQLFVBQU87QUFBQTtBQUFBO0FBQUssU0FBS0MsVUFBTDtBQUFMLElBQVA7QUFDQTs7O21DQUVlLENBRWY7OztxQ0FHaUI7QUFDakIsUUFBS0MsUUFBTCxDQUFjQyxRQUFkLENBQXVCQyxJQUF2QixDQUE0QixFQUE1QjtBQUNBLCtHQUEwQkMsU0FBMUI7QUFDQTs7OzBDQUVzQjtBQUN0QixPQUFJQyxJQUFFLENBQU47QUFBQSxPQUFRQyxJQUFFLENBQVY7QUFDQSxPQUFJQyxrQkFBZ0IsS0FBS04sUUFBTCxDQUFjTyxRQUFkLENBQXVCQyxHQUF2QixDQUEyQixVQUFDQyxJQUFELEVBQU1DLENBQU4sRUFBVTtBQUN4RCxRQUFJQyxlQUFhRixLQUFLRyxxQkFBTCxFQUFqQjtBQUR3RCw4QkFFbkNELGFBQWFFLEtBRnNCO0FBQUEsUUFFakRDLEtBRmlELHVCQUVqREEsS0FGaUQ7QUFBQSxRQUUzQ0MsTUFGMkMsdUJBRTNDQSxNQUYyQzs7QUFHeERWLFFBQUVXLEtBQUtDLEdBQUwsQ0FBU1osQ0FBVCxFQUFXVSxNQUFYLENBQUY7QUFDQSxRQUFJRyxpQkFDSDtBQUFBO0FBQUEsT0FBTyxHQUFHZCxDQUFWLEVBQWEsS0FBS00sQ0FBbEI7QUFDRUM7QUFERixLQUREOztBQU1BUCxTQUFHVSxLQUFIO0FBQ0EsV0FBT0ksY0FBUDtBQUNBLElBWm1CLENBQXBCOztBQWNBLFVBQ0M7QUFBQyxlQUFEO0FBQUEsTUFBYSxPQUFPZCxDQUFwQixFQUF1QixRQUFRQyxDQUEvQjtBQUNFQztBQURGLElBREQ7QUFLQTs7OzBDQUVzQjtBQUN0QixRQUFLTixRQUFMLENBQWNDLFFBQWQsQ0FBdUJrQixNQUF2QixDQUE4QixLQUFLbkIsUUFBTCxDQUFjTyxRQUFkLENBQXVCYSxNQUFyRCxFQURzQixDQUNzQztBQUM1RDtBQUNBOzs7Ozs7QUExQ21CdEIsRyxDQUNidUIsVyxHQUFZLEs7a0JBREN2QixHOztJQThDZndCLFc7Ozs7Ozs7Ozs7O29DQUtZO0FBQ2hCLFVBQU87QUFDTkMsYUFBUztBQUNSVCxZQUFPLEtBQUtELEtBQUwsQ0FBV0MsS0FEVjtBQUVSQyxhQUFRLEtBQUtGLEtBQUwsQ0FBV0U7QUFGWDtBQURILElBQVA7QUFNQTs7Ozs7O0FBWklPLFcsQ0FDRUUsaUIsR0FBa0I7QUFDeEJELFVBQVEsaUJBQVVFO0FBRE0sQyIsImZpbGUiOiJyb3cuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuXHJcbmltcG9ydCBBbnkgZnJvbSBcIi4vYW55XCJcclxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb3cgZXh0ZW5kcyBBbnl7XHJcblx0c3RhdGljIGRpc3BsYXlOYW1lPVwicm93XCJcclxuXHRyZW5kZXIoKXtcclxuXHRcdHJldHVybiA8dHI+e3RoaXMuZ2V0Q29udGVudCgpfTwvdHI+XHJcblx0fVxyXG5cclxuXHRhcHBlbmRDb21wb3NlZCgpe1xyXG5cclxuXHR9XHJcblxyXG5cclxuXHRvbjFDaGlsZENvbXBvc2VkKCl7XHJcblx0XHR0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLnB1c2goW10pXHJcblx0XHRzdXBlci5vbjFDaGlsZENvbXBvc2VkKC4uLmFyZ3VtZW50cylcclxuXHR9XHJcblxyXG5cdGNyZWF0ZUNvbXBvc2VkMlBhcmVudCgpe1xyXG5cdFx0bGV0IHc9MCxoPTBcclxuXHRcdGxldCBwb3NpdGlvbmVkQ2VsbHM9dGhpcy5jb21wdXRlZC5jaGlsZHJlbi5tYXAoKGNlbGwsaSk9PntcclxuXHRcdFx0bGV0IGNvbXBvc2VkQ2VsbD1jZWxsLmNyZWF0ZUNvbXBvc2VkMlBhcmVudCgpXHJcblx0XHRcdGNvbnN0IHt3aWR0aCxoZWlnaHR9PWNvbXBvc2VkQ2VsbC5wcm9wc1xyXG5cdFx0XHRoPU1hdGgubWF4KGgsaGVpZ2h0KVxyXG5cdFx0XHRsZXQgcG9zaXRpb25lZENlbGw9KFxyXG5cdFx0XHRcdDxHcm91cCB4PXt3fSBrZXk9e2l9PlxyXG5cdFx0XHRcdFx0e2NvbXBvc2VkQ2VsbH1cclxuXHRcdFx0XHQ8L0dyb3VwPlxyXG5cdFx0XHQpXHJcblxyXG5cdFx0XHR3Kz13aWR0aFxyXG5cdFx0XHRyZXR1cm4gcG9zaXRpb25lZENlbGxcclxuXHRcdH0pXHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PENvbXBvc2VkUm93IHdpZHRoPXt3fSBoZWlnaHQ9e2h9PlxyXG5cdFx0XHRcdHtwb3NpdGlvbmVkQ2VsbHN9XHJcblx0XHRcdDwvQ29tcG9zZWRSb3c+XHJcblx0XHQpXHJcblx0fVxyXG5cclxuXHRvbkFsbENoaWxkcmVuQ29tcG9zZWQoKXtcclxuXHRcdHRoaXMuY29tcHV0ZWQuY29tcG9zZWQuc3BsaWNlKHRoaXMuY29tcHV0ZWQuY2hpbGRyZW4ubGVuZ3RoKS8vb24xQ2hpbGRDb21wb3NlZCB3aWxsIGFsd2F5cyBhZGQgMVxyXG5cdFx0c3VwZXIub25BbGxDaGlsZHJlbkNvbXBvc2VkKClcclxuXHR9XHJcbn1cclxuXHJcblxyXG5jbGFzcyBDb21wb3NlZFJvdyBleHRlbmRzIEdyb3Vwe1xyXG5cdHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz17XHJcblx0XHRyb3dTaXplOlByb3BUeXBlcy5vYmplY3RcclxuXHR9XHJcblxyXG5cdGdldENoaWxkQ29udGV4dCgpe1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0cm93U2l6ZToge1xyXG5cdFx0XHRcdHdpZHRoOiB0aGlzLnByb3BzLndpZHRoLFxyXG5cdFx0XHRcdGhlaWdodDogdGhpcy5wcm9wcy5oZWlnaHRcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iXX0=