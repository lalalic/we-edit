"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Model = function () {
	function Model(srcModel, targetParent) {
		_classCallCheck(this, Model);

		var type = srcModel.type;
		this.type = type.charAt(0).toUpperCase() + type.substr(1);
		this.wordModel = srcModel;
		this.props = {};
		this.children = [];
	}

	_createClass(Model, [{
		key: "visit",
		value: function visit() {}
	}, {
		key: "appendChild",
		value: function appendChild(srcModel, targetParent) {
			switch (srcModel.type) {
				case "section":
				case "paragraph":
				case "inline":
				case "text":
				case "image":
					var appended = new Model(srcModel, this);
					this.children.push(appended);
					return appended;
				default:
					return this;
			}
		}
	}, {
		key: "createReactElement",
		value: function createReactElement(namespace) {
			var reactClass = namespace[this.type];
			var props = this.props;
			switch (this.type) {
				case 'Text':
					return _react2.default.createElement(reactClass, props, this.wordModel.getText());
					break;
				case 'Image':
					var blob = this.wordModel.getImage();
					props.src = URL.createObjectURL(blob, { type: "image/*" });
					props.width = 200;
					props.height = 200;
					return _react2.default.createElement(reactClass, props);
				default:
					var children = this.children.map(function (a) {
						return a.createReactElement(namespace);
					});
					return _react2.default.createElement(reactClass, props, children);
					break;
			}
		}
	}]);

	return Model;
}();

exports.default = Model;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L2FueS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7OztJQUNxQjtBQUNwQixVQURvQixLQUNwQixDQUFZLFFBQVosRUFBc0IsWUFBdEIsRUFBbUM7d0JBRGYsT0FDZTs7QUFDbEMsTUFBSSxPQUFLLFNBQVMsSUFBVCxDQUR5QjtBQUVsQyxPQUFLLElBQUwsR0FBVSxLQUFLLE1BQUwsQ0FBWSxDQUFaLEVBQWUsV0FBZixLQUE2QixLQUFLLE1BQUwsQ0FBWSxDQUFaLENBQTdCLENBRndCO0FBR2xDLE9BQUssU0FBTCxHQUFlLFFBQWYsQ0FIa0M7QUFJbEMsT0FBSyxLQUFMLEdBQVcsRUFBWCxDQUprQztBQUtsQyxPQUFLLFFBQUwsR0FBYyxFQUFkLENBTGtDO0VBQW5DOztjQURvQjs7MEJBU2I7Ozs4QkFJSyxVQUFVLGNBQWE7QUFDbEMsV0FBTyxTQUFTLElBQVQ7QUFDUCxTQUFLLFNBQUwsQ0FEQTtBQUVBLFNBQUssV0FBTCxDQUZBO0FBR0EsU0FBSyxRQUFMLENBSEE7QUFJQSxTQUFLLE1BQUwsQ0FKQTtBQUtBLFNBQUssT0FBTDtBQUNDLFNBQUksV0FBUyxJQUFJLEtBQUosQ0FBVSxRQUFWLEVBQW9CLElBQXBCLENBQVQsQ0FETDtBQUVDLFVBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsUUFBbkIsRUFGRDtBQUdDLFlBQU8sUUFBUCxDQUhEO0FBTEE7QUFVQyxZQUFPLElBQVAsQ0FERDtBQVRBLElBRGtDOzs7O3FDQWVoQixXQUFVO0FBQzVCLE9BQUksYUFBVyxVQUFVLEtBQUssSUFBTCxDQUFyQixDQUR3QjtBQUU1QixPQUFJLFFBQU0sS0FBSyxLQUFMLENBRmtCO0FBRzVCLFdBQU8sS0FBSyxJQUFMO0FBQ1AsU0FBSyxNQUFMO0FBQ0MsWUFBTyxnQkFBTSxhQUFOLENBQW9CLFVBQXBCLEVBQWdDLEtBQWhDLEVBQXVDLEtBQUssU0FBTCxDQUFlLE9BQWYsRUFBdkMsQ0FBUCxDQUREO0FBRUEsV0FGQTtBQURBLFNBSUssT0FBTDtBQUNDLFNBQUksT0FBSyxLQUFLLFNBQUwsQ0FBZSxRQUFmLEVBQUwsQ0FETDtBQUVDLFdBQU0sR0FBTixHQUFVLElBQUksZUFBSixDQUFvQixJQUFwQixFQUF5QixFQUFDLE1BQUssU0FBTCxFQUExQixDQUFWLENBRkQ7QUFHQyxXQUFNLEtBQU4sR0FBWSxHQUFaLENBSEQ7QUFJQyxXQUFNLE1BQU4sR0FBYSxHQUFiLENBSkQ7QUFLQyxZQUFPLGdCQUFNLGFBQU4sQ0FBb0IsVUFBcEIsRUFBZ0MsS0FBaEMsQ0FBUCxDQUxEO0FBSkE7QUFXQyxTQUFJLFdBQVMsS0FBSyxRQUFMLENBQWMsR0FBZCxDQUFrQjthQUFHLEVBQUUsa0JBQUYsQ0FBcUIsU0FBckI7TUFBSCxDQUEzQixDQURMO0FBRUMsWUFBTyxnQkFBTSxhQUFOLENBQW9CLFVBQXBCLEVBQWdDLEtBQWhDLEVBQXVDLFFBQXZDLENBQVAsQ0FGRDtBQUdBLFdBSEE7QUFWQSxJQUg0Qjs7OztRQTVCVCIsImZpbGUiOiJhbnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9kZWx7XHJcblx0Y29uc3RydWN0b3Ioc3JjTW9kZWwsIHRhcmdldFBhcmVudCl7XHJcblx0XHRsZXQgdHlwZT1zcmNNb2RlbC50eXBlXHJcblx0XHR0aGlzLnR5cGU9dHlwZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSt0eXBlLnN1YnN0cigxKVxyXG5cdFx0dGhpcy53b3JkTW9kZWw9c3JjTW9kZWxcclxuXHRcdHRoaXMucHJvcHM9e31cclxuXHRcdHRoaXMuY2hpbGRyZW49W11cclxuXHR9XHJcblx0XHJcblx0dmlzaXQoKXtcclxuXHRcdFxyXG5cdH1cclxuXHRcclxuXHRhcHBlbmRDaGlsZChzcmNNb2RlbCwgdGFyZ2V0UGFyZW50KXtcclxuXHRcdHN3aXRjaChzcmNNb2RlbC50eXBlKXtcclxuXHRcdGNhc2UgXCJzZWN0aW9uXCI6XHJcblx0XHRjYXNlIFwicGFyYWdyYXBoXCI6XHJcblx0XHRjYXNlIFwiaW5saW5lXCI6XHJcblx0XHRjYXNlIFwidGV4dFwiOlxyXG5cdFx0Y2FzZSBcImltYWdlXCI6XHJcblx0XHRcdGxldCBhcHBlbmRlZD1uZXcgTW9kZWwoc3JjTW9kZWwsIHRoaXMpXHJcblx0XHRcdHRoaXMuY2hpbGRyZW4ucHVzaChhcHBlbmRlZClcclxuXHRcdFx0cmV0dXJuIGFwcGVuZGVkXHJcblx0XHRkZWZhdWx0OlxyXG5cdFx0XHRyZXR1cm4gdGhpc1xyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuXHRjcmVhdGVSZWFjdEVsZW1lbnQobmFtZXNwYWNlKXtcclxuXHRcdGxldCByZWFjdENsYXNzPW5hbWVzcGFjZVt0aGlzLnR5cGVdXHJcblx0XHRsZXQgcHJvcHM9dGhpcy5wcm9wc1xyXG5cdFx0c3dpdGNoKHRoaXMudHlwZSl7XHJcblx0XHRjYXNlICdUZXh0JzpcclxuXHRcdFx0cmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQocmVhY3RDbGFzcywgcHJvcHMsIHRoaXMud29yZE1vZGVsLmdldFRleHQoKSlcclxuXHRcdGJyZWFrXHJcblx0XHRjYXNlICdJbWFnZSc6XHJcblx0XHRcdGxldCBibG9iPXRoaXMud29yZE1vZGVsLmdldEltYWdlKCk7XHJcblx0XHRcdHByb3BzLnNyYz1VUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2Ise3R5cGU6XCJpbWFnZS8qXCJ9KVxyXG5cdFx0XHRwcm9wcy53aWR0aD0yMDBcclxuXHRcdFx0cHJvcHMuaGVpZ2h0PTIwMFxyXG5cdFx0XHRyZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChyZWFjdENsYXNzLCBwcm9wcylcclxuXHRcdGRlZmF1bHQ6XHJcblx0XHRcdGxldCBjaGlsZHJlbj10aGlzLmNoaWxkcmVuLm1hcChhPT5hLmNyZWF0ZVJlYWN0RWxlbWVudChuYW1lc3BhY2UpKVxyXG5cdFx0XHRyZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChyZWFjdENsYXNzLCBwcm9wcywgY2hpbGRyZW4pXHJcblx0XHRicmVha1xyXG5cdFx0fVxyXG5cdH1cclxufSJdfQ==