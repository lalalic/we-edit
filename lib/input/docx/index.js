"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _docx4js = require("docx4js");

var _docx4js2 = _interopRequireDefault(_docx4js);

var _base = require("../base");

var _base2 = _interopRequireDefault(_base);

var _uuid = require("../../tools/uuid");

var _uuid2 = _interopRequireDefault(_uuid);

var _selector = require("./selector");

var _selector2 = _interopRequireDefault(_selector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Base) {
	_inherits(_class, _Base);

	function _class() {
		_classCallCheck(this, _class);

		return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
	}

	_createClass(_class, [{
		key: "create",
		value: function create() {
			return _docx4js2.default.create();
		}
	}, {
		key: "load",
		value: function load(data, domain) {
			return _docx4js2.default.load(data).then(function (docx) {
				var selector = new _selector2.default(docx);

				return docx.render(function (type, props, children) {
					var id = (0, _uuid2.default)();
					switch (type) {
						case "document":
							return _react2.default.createElement(domain.Document, _extends({}, selector.document(props), { key: id }), children);
						case "section":
							return _react2.default.createElement(domain.Section, _extends({}, selector.section(props), { key: id }), children);
						case "tbl":
							return _react2.default.createElement(domain.table, _extends({}, selector.table(props), { key: id }), children);
						case "p":
							return _react2.default.createElement(domain.Paragraph, _extends({}, selector.paragraph(props), { key: id }), children);
						case "r":
							return _react2.default.createElement(domain.Inline, _extends({}, selector.inline(props), { key: id }), children);
						case "t":
							return _react2.default.createElement(domain.Text, { key: id }, children[0]);
					}
				});
			}).then(function (tree) {
				console.dir(tree);return tree;
			});
		}
	}], [{
		key: "support",
		value: function support(_ref) {
			var type = _ref.type;

			return type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
		}
	}]);

	return _class;
}(_base2.default);

exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L2luZGV4LmpzIl0sIm5hbWVzIjpbImNyZWF0ZSIsImRhdGEiLCJkb21haW4iLCJsb2FkIiwidGhlbiIsInNlbGVjdG9yIiwiZG9jeCIsInJlbmRlciIsInR5cGUiLCJwcm9wcyIsImNoaWxkcmVuIiwiaWQiLCJjcmVhdGVFbGVtZW50IiwiRG9jdW1lbnQiLCJkb2N1bWVudCIsImtleSIsIlNlY3Rpb24iLCJzZWN0aW9uIiwidGFibGUiLCJQYXJhZ3JhcGgiLCJwYXJhZ3JhcGgiLCJJbmxpbmUiLCJpbmxpbmUiLCJUZXh0IiwiY29uc29sZSIsImRpciIsInRyZWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsyQkFPUztBQUNQLFVBQU8sa0JBQVFBLE1BQVIsRUFBUDtBQUNBOzs7dUJBRUlDLEksRUFBTUMsTSxFQUFPO0FBQ2pCLFVBQU8sa0JBQVFDLElBQVIsQ0FBYUYsSUFBYixFQUFtQkcsSUFBbkIsQ0FBd0IsZ0JBQU07QUFDcEMsUUFBTUMsV0FBUyx1QkFBYUMsSUFBYixDQUFmOztBQUVBLFdBQU9BLEtBQUtDLE1BQUwsQ0FBWSxVQUFDQyxJQUFELEVBQU1DLEtBQU4sRUFBWUMsUUFBWixFQUF1QjtBQUN6QyxTQUFJQyxLQUFHLHFCQUFQO0FBQ0EsYUFBT0gsSUFBUDtBQUNBLFdBQUssVUFBTDtBQUNDLGNBQU8sZ0JBQU1JLGFBQU4sQ0FBb0JWLE9BQU9XLFFBQTNCLGVBQXdDUixTQUFTUyxRQUFULENBQWtCTCxLQUFsQixDQUF4QyxJQUFpRU0sS0FBSUosRUFBckUsS0FBeUVELFFBQXpFLENBQVA7QUFDRCxXQUFLLFNBQUw7QUFDQyxjQUFPLGdCQUFNRSxhQUFOLENBQW9CVixPQUFPYyxPQUEzQixlQUF1Q1gsU0FBU1ksT0FBVCxDQUFpQlIsS0FBakIsQ0FBdkMsSUFBK0RNLEtBQUlKLEVBQW5FLEtBQXVFRCxRQUF2RSxDQUFQO0FBQ0QsV0FBSyxLQUFMO0FBQ0MsY0FBTyxnQkFBTUUsYUFBTixDQUFvQlYsT0FBT2dCLEtBQTNCLGVBQXFDYixTQUFTYSxLQUFULENBQWVULEtBQWYsQ0FBckMsSUFBMkRNLEtBQUlKLEVBQS9ELEtBQW1FRCxRQUFuRSxDQUFQO0FBQ0QsV0FBSyxHQUFMO0FBQ0MsY0FBTyxnQkFBTUUsYUFBTixDQUFvQlYsT0FBT2lCLFNBQTNCLGVBQXlDZCxTQUFTZSxTQUFULENBQW1CWCxLQUFuQixDQUF6QyxJQUFtRU0sS0FBSUosRUFBdkUsS0FBMkVELFFBQTNFLENBQVA7QUFDRCxXQUFLLEdBQUw7QUFDQyxjQUFPLGdCQUFNRSxhQUFOLENBQW9CVixPQUFPbUIsTUFBM0IsZUFBc0NoQixTQUFTaUIsTUFBVCxDQUFnQmIsS0FBaEIsQ0FBdEMsSUFBNkRNLEtBQUlKLEVBQWpFLEtBQXFFRCxRQUFyRSxDQUFQO0FBQ0QsV0FBSyxHQUFMO0FBQ0MsY0FBTyxnQkFBTUUsYUFBTixDQUFvQlYsT0FBT3FCLElBQTNCLEVBQWdDLEVBQUNSLEtBQUlKLEVBQUwsRUFBaEMsRUFBeUNELFNBQVMsQ0FBVCxDQUF6QyxDQUFQO0FBWkQ7QUFjQSxLQWhCTSxDQUFQO0FBaUJBLElBcEJNLEVBb0JKTixJQXBCSSxDQW9CQyxnQkFBTTtBQUFDb0IsWUFBUUMsR0FBUixDQUFZQyxJQUFaLEVBQWtCLE9BQU9BLElBQVA7QUFBWSxJQXBCdEMsQ0FBUDtBQXFCQTs7O2dDQTlCcUI7QUFBQSxPQUFObEIsSUFBTSxRQUFOQSxJQUFNOztBQUNyQixVQUFPQSxRQUFNLHlFQUFiO0FBQ0EiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IGRvY3g0anMgZnJvbSBcImRvY3g0anNcIlxyXG5pbXBvcnQgQmFzZSBmcm9tIFwiLi4vYmFzZVwiXHJcbmltcG9ydCB1dWlkIGZyb20gXCIuLi8uLi90b29scy91dWlkXCJcclxuXHJcbmltcG9ydCBTZWxlY3RvciBmcm9tIFwiLi9zZWxlY3RvclwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEJhc2V7XHJcblx0c3RhdGljIHN1cHBvcnQoe3R5cGV9KXtcclxuXHRcdHJldHVybiB0eXBlPT1cImFwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1vZmZpY2Vkb2N1bWVudC53b3JkcHJvY2Vzc2luZ21sLmRvY3VtZW50XCJcclxuXHR9XHJcblxyXG5cdGNyZWF0ZSgpe1xyXG5cdFx0cmV0dXJuIGRvY3g0anMuY3JlYXRlKClcclxuXHR9XHJcblx0XHJcblx0bG9hZChkYXRhLCBkb21haW4pe1xyXG5cdFx0cmV0dXJuIGRvY3g0anMubG9hZChkYXRhKS50aGVuKGRvY3g9PntcclxuXHRcdFx0Y29uc3Qgc2VsZWN0b3I9bmV3IFNlbGVjdG9yKGRvY3gpXHJcblx0XHRcclxuXHRcdFx0cmV0dXJuIGRvY3gucmVuZGVyKCh0eXBlLHByb3BzLGNoaWxkcmVuKT0+e1xyXG5cdFx0XHRcdGxldCBpZD11dWlkKClcclxuXHRcdFx0XHRzd2l0Y2godHlwZSl7XHJcblx0XHRcdFx0Y2FzZSBcImRvY3VtZW50XCI6XHJcblx0XHRcdFx0XHRyZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChkb21haW4uRG9jdW1lbnQsey4uLnNlbGVjdG9yLmRvY3VtZW50KHByb3BzKSxrZXk6aWR9LGNoaWxkcmVuKVxyXG5cdFx0XHRcdGNhc2UgXCJzZWN0aW9uXCI6XHJcblx0XHRcdFx0XHRyZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChkb21haW4uU2VjdGlvbix7Li4uc2VsZWN0b3Iuc2VjdGlvbihwcm9wcyksa2V5OmlkfSxjaGlsZHJlbilcclxuXHRcdFx0XHRjYXNlIFwidGJsXCI6XHJcblx0XHRcdFx0XHRyZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChkb21haW4udGFibGUsey4uLnNlbGVjdG9yLnRhYmxlKHByb3BzKSxrZXk6aWR9LGNoaWxkcmVuKVxyXG5cdFx0XHRcdGNhc2UgXCJwXCI6XHJcblx0XHRcdFx0XHRyZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChkb21haW4uUGFyYWdyYXBoLHsuLi5zZWxlY3Rvci5wYXJhZ3JhcGgocHJvcHMpLGtleTppZH0sY2hpbGRyZW4pXHJcblx0XHRcdFx0Y2FzZSBcInJcIjpcclxuXHRcdFx0XHRcdHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KGRvbWFpbi5JbmxpbmUsey4uLnNlbGVjdG9yLmlubGluZShwcm9wcyksa2V5OmlkfSxjaGlsZHJlbilcclxuXHRcdFx0XHRjYXNlIFwidFwiOlxyXG5cdFx0XHRcdFx0cmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoZG9tYWluLlRleHQse2tleTppZH0sY2hpbGRyZW5bMF0pXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0fSkudGhlbih0cmVlPT57Y29uc29sZS5kaXIodHJlZSk7cmV0dXJuIHRyZWV9KVxyXG5cdH1cclxufVxyXG5cclxuIl19