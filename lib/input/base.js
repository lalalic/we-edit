"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _uuid = require("../tools/uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
	function _class() {
		_classCallCheck(this, _class);
	}

	_createClass(_class, [{
		key: "load",
		value: function load() {
			return Promise.resolve({});
		}
	}, {
		key: "createElement",
		value: function createElement(type, props, children) {
			var id = (0, _uuid.uuid)();
			return _react2.default.createElement(type, _extends({}, props, { id: id, key: id }), children);
		}
	}], [{
		key: "support",
		value: function support() {
			return false;
		}
	}]);

	return _class;
}();

exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbnB1dC9iYXNlLmpzIl0sIm5hbWVzIjpbIlByb21pc2UiLCJyZXNvbHZlIiwidHlwZSIsInByb3BzIiwiY2hpbGRyZW4iLCJpZCIsImNyZWF0ZUVsZW1lbnQiLCJrZXkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7O3lCQU9PO0FBQ0wsVUFBT0EsUUFBUUMsT0FBUixDQUFnQixFQUFoQixDQUFQO0FBQ0E7OztnQ0FFYUMsSSxFQUFNQyxLLEVBQU9DLFEsRUFBUztBQUNuQyxPQUFJQyxLQUFHLGlCQUFQO0FBQ0EsVUFBTyxnQkFBTUMsYUFBTixDQUFvQkosSUFBcEIsZUFBOEJDLEtBQTlCLElBQXFDRSxNQUFyQyxFQUF5Q0UsS0FBSUYsRUFBN0MsS0FBa0RELFFBQWxELENBQVA7QUFDQTs7OzRCQVhlO0FBQ2YsVUFBTyxLQUFQO0FBQ0EiLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5cclxuaW1wb3J0IHt1dWlkfSBmcm9tIFwiLi4vdG9vbHMvdXVpZFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzc3tcclxuXHRzdGF0aWMgc3VwcG9ydCgpe1xyXG5cdFx0cmV0dXJuIGZhbHNlXHJcblx0fVxyXG5cclxuXHRsb2FkKCl7XHJcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHt9KVxyXG5cdH1cclxuXHJcblx0Y3JlYXRlRWxlbWVudCh0eXBlLCBwcm9wcywgY2hpbGRyZW4pe1xyXG5cdFx0bGV0IGlkPXV1aWQoKVxyXG5cdFx0cmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQodHlwZSwgey4uLnByb3BzLCBpZCwga2V5OmlkfSwgY2hpbGRyZW4pXHJcblx0fVxyXG59XHJcbiJdfQ==