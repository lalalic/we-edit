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
				return docx.render(function (type, props, children) {
					var id = (0, _uuid2.default)();
					switch (type) {
						case "document":
							return _react2.default.createElement(domain.Document, _extends({}, props, { key: id }), children);
							break;
						case "section":
							return _react2.default.createElement(domain.Section, _extends({}, props, { key: id }), children);
							break;

						case "p":
							return _react2.default.createElement(domain.Paragraph, _extends({}, props, { key: id }), children);
					}
				});
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L2luZGV4LmpzIl0sIm5hbWVzIjpbImNyZWF0ZSIsImRhdGEiLCJkb21haW4iLCJsb2FkIiwidGhlbiIsImRvY3giLCJyZW5kZXIiLCJ0eXBlIiwicHJvcHMiLCJjaGlsZHJlbiIsImlkIiwiY3JlYXRlRWxlbWVudCIsIkRvY3VtZW50Iiwia2V5IiwiU2VjdGlvbiIsIlBhcmFncmFwaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsyQkFPUztBQUNQLFVBQU8sa0JBQVFBLE1BQVIsRUFBUDtBQUNBOzs7dUJBRUlDLEksRUFBTUMsTSxFQUFPO0FBQ2pCLFVBQU8sa0JBQVFDLElBQVIsQ0FBYUYsSUFBYixFQUFtQkcsSUFBbkIsQ0FBd0IsZ0JBQU07QUFDcEMsV0FBT0MsS0FBS0MsTUFBTCxDQUFZLFVBQUNDLElBQUQsRUFBTUMsS0FBTixFQUFZQyxRQUFaLEVBQXVCO0FBQ3pDLFNBQUlDLEtBQUcscUJBQVA7QUFDQSxhQUFPSCxJQUFQO0FBQ0EsV0FBSyxVQUFMO0FBQ0MsY0FBTyxnQkFBTUksYUFBTixDQUFvQlQsT0FBT1UsUUFBM0IsZUFBd0NKLEtBQXhDLElBQThDSyxLQUFJSCxFQUFsRCxLQUFzREQsUUFBdEQsQ0FBUDtBQUNEO0FBQ0EsV0FBSyxTQUFMO0FBQ0MsY0FBTyxnQkFBTUUsYUFBTixDQUFvQlQsT0FBT1ksT0FBM0IsZUFBdUNOLEtBQXZDLElBQTZDSyxLQUFJSCxFQUFqRCxLQUFxREQsUUFBckQsQ0FBUDtBQUNEOztBQUVBLFdBQUssR0FBTDtBQUNDLGNBQU8sZ0JBQU1FLGFBQU4sQ0FBb0JULE9BQU9hLFNBQTNCLGVBQXlDUCxLQUF6QyxJQUErQ0ssS0FBSUgsRUFBbkQsS0FBdURELFFBQXZELENBQVA7QUFURDtBQVdBLEtBYk0sQ0FBUDtBQWNBLElBZk0sQ0FBUDtBQWdCQTs7O2dDQXpCcUI7QUFBQSxPQUFORixJQUFNLFFBQU5BLElBQU07O0FBQ3JCLFVBQU9BLFFBQU0seUVBQWI7QUFDQSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgZG9jeDRqcyBmcm9tIFwiZG9jeDRqc1wiXHJcbmltcG9ydCBCYXNlIGZyb20gXCIuLi9iYXNlXCJcclxuaW1wb3J0IHV1aWQgZnJvbSBcIi4uLy4uL3Rvb2xzL3V1aWRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBCYXNle1xyXG5cdHN0YXRpYyBzdXBwb3J0KHt0eXBlfSl7XHJcblx0XHRyZXR1cm4gdHlwZT09XCJhcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQud29yZHByb2Nlc3NpbmdtbC5kb2N1bWVudFwiXHJcblx0fVxyXG5cclxuXHRjcmVhdGUoKXtcclxuXHRcdHJldHVybiBkb2N4NGpzLmNyZWF0ZSgpXHJcblx0fVxyXG5cdFxyXG5cdGxvYWQoZGF0YSwgZG9tYWluKXtcclxuXHRcdHJldHVybiBkb2N4NGpzLmxvYWQoZGF0YSkudGhlbihkb2N4PT57XHJcblx0XHRcdHJldHVybiBkb2N4LnJlbmRlcigodHlwZSxwcm9wcyxjaGlsZHJlbik9PntcclxuXHRcdFx0XHRsZXQgaWQ9dXVpZCgpXHJcblx0XHRcdFx0c3dpdGNoKHR5cGUpe1xyXG5cdFx0XHRcdGNhc2UgXCJkb2N1bWVudFwiOlxyXG5cdFx0XHRcdFx0cmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoZG9tYWluLkRvY3VtZW50LHsuLi5wcm9wcyxrZXk6aWR9LGNoaWxkcmVuKVxyXG5cdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0Y2FzZSBcInNlY3Rpb25cIjpcclxuXHRcdFx0XHRcdHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KGRvbWFpbi5TZWN0aW9uLHsuLi5wcm9wcyxrZXk6aWR9LGNoaWxkcmVuKVxyXG5cdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0XHJcblx0XHRcdFx0Y2FzZSBcInBcIjpcclxuXHRcdFx0XHRcdHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KGRvbWFpbi5QYXJhZ3JhcGgsey4uLnByb3BzLGtleTppZH0sY2hpbGRyZW4pXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcbn1cclxuIl19