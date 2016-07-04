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
		value: function visit() {
			switch (this.type) {
				case 'Image':
					var blob = this.wordModel.getImage();
					this.props.src = URL.createObjectURL(new Blob(blob), { type: "image/*" });
					this.props.width = 200;
					this.props.height = 200;
					break;
				case 'Text':
					this.children.push(this.wordModel.getText());
					break;
			}
		}
	}, {
		key: "appendChild",
		value: function appendChild(srcModel) {
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
					return _react2.default.createElement(reactClass, props, this.children[0]);
					break;
				case 'Image':
					return _react2.default.createElement(reactClass, props);
					break;
				default:
					var children = this.children.map(function (a) {
						return a.createReactElement(namespace);
					});
					return _react2.default.createElement(reactClass, props, children);
			}
		}
	}]);

	return Model;
}();

exports.default = Model;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L2FueS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7OztJQUNxQjtBQUNwQixVQURvQixLQUNwQixDQUFZLFFBQVosRUFBc0IsWUFBdEIsRUFBbUM7d0JBRGYsT0FDZTs7QUFDbEMsTUFBSSxPQUFLLFNBQVMsSUFBVCxDQUR5QjtBQUVsQyxPQUFLLElBQUwsR0FBVSxLQUFLLE1BQUwsQ0FBWSxDQUFaLEVBQWUsV0FBZixLQUE2QixLQUFLLE1BQUwsQ0FBWSxDQUFaLENBQTdCLENBRndCO0FBR2xDLE9BQUssU0FBTCxHQUFlLFFBQWYsQ0FIa0M7QUFJbEMsT0FBSyxLQUFMLEdBQVcsRUFBWCxDQUprQztBQUtsQyxPQUFLLFFBQUwsR0FBYyxFQUFkLENBTGtDO0VBQW5DOztjQURvQjs7MEJBU2I7QUFDTixXQUFPLEtBQUssSUFBTDtBQUNQLFNBQUssT0FBTDtBQUNDLFNBQUksT0FBSyxLQUFLLFNBQUwsQ0FBZSxRQUFmLEVBQUwsQ0FETDtBQUVDLFVBQUssS0FBTCxDQUFXLEdBQVgsR0FBZSxJQUFJLGVBQUosQ0FBb0IsSUFBSSxJQUFKLENBQVMsSUFBVCxDQUFwQixFQUFtQyxFQUFDLE1BQUssU0FBTCxFQUFwQyxDQUFmLENBRkQ7QUFHQyxVQUFLLEtBQUwsQ0FBVyxLQUFYLEdBQWlCLEdBQWpCLENBSEQ7QUFJQyxVQUFLLEtBQUwsQ0FBVyxNQUFYLEdBQWtCLEdBQWxCLENBSkQ7QUFLQSxXQUxBO0FBREEsU0FPSyxNQUFMO0FBQ0MsVUFBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixLQUFLLFNBQUwsQ0FBZSxPQUFmLEVBQW5CLEVBREQ7QUFFQSxXQUZBO0FBUEEsSUFETTs7Ozs4QkFjSyxVQUFTO0FBQ3BCLFdBQU8sU0FBUyxJQUFUO0FBQ1AsU0FBSyxTQUFMLENBREE7QUFFQSxTQUFLLFdBQUwsQ0FGQTtBQUdBLFNBQUssUUFBTCxDQUhBO0FBSUEsU0FBSyxNQUFMLENBSkE7QUFLQSxTQUFLLE9BQUw7QUFDQyxTQUFJLFdBQVMsSUFBSSxLQUFKLENBQVUsUUFBVixFQUFvQixJQUFwQixDQUFULENBREw7QUFFQyxVQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW1CLFFBQW5CLEVBRkQ7QUFHQyxZQUFPLFFBQVAsQ0FIRDtBQUxBO0FBVUMsWUFBTyxJQUFQLENBREQ7QUFUQSxJQURvQjs7OztxQ0FlRixXQUFVO0FBQzVCLE9BQUksYUFBVyxVQUFVLEtBQUssSUFBTCxDQUFyQixDQUR3QjtBQUU1QixPQUFJLFFBQU0sS0FBSyxLQUFMLENBRmtCO0FBRzVCLFdBQU8sS0FBSyxJQUFMO0FBQ1AsU0FBSyxNQUFMO0FBQ0MsWUFBTyxnQkFBTSxhQUFOLENBQW9CLFVBQXBCLEVBQStCLEtBQS9CLEVBQXFDLEtBQUssUUFBTCxDQUFjLENBQWQsQ0FBckMsQ0FBUCxDQUREO0FBRUEsV0FGQTtBQURBLFNBSUssT0FBTDtBQUNDLFlBQU8sZ0JBQU0sYUFBTixDQUFvQixVQUFwQixFQUErQixLQUEvQixDQUFQLENBREQ7QUFFQSxXQUZBO0FBSkE7QUFRQyxTQUFJLFdBQVMsS0FBSyxRQUFMLENBQWMsR0FBZCxDQUFrQjthQUFHLEVBQUUsa0JBQUYsQ0FBcUIsU0FBckI7TUFBSCxDQUEzQixDQURMO0FBRUMsWUFBTyxnQkFBTSxhQUFOLENBQW9CLFVBQXBCLEVBQWdDLEtBQWhDLEVBQXVDLFFBQXZDLENBQVAsQ0FGRDtBQVBBLElBSDRCOzs7O1FBdENUIiwiZmlsZSI6ImFueS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb2RlbHtcclxuXHRjb25zdHJ1Y3RvcihzcmNNb2RlbCwgdGFyZ2V0UGFyZW50KXtcclxuXHRcdGxldCB0eXBlPXNyY01vZGVsLnR5cGVcclxuXHRcdHRoaXMudHlwZT10eXBlLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpK3R5cGUuc3Vic3RyKDEpXHJcblx0XHR0aGlzLndvcmRNb2RlbD1zcmNNb2RlbFxyXG5cdFx0dGhpcy5wcm9wcz17fVxyXG5cdFx0dGhpcy5jaGlsZHJlbj1bXVxyXG5cdH1cclxuXHJcblx0dmlzaXQoKXtcclxuXHRcdHN3aXRjaCh0aGlzLnR5cGUpe1xyXG5cdFx0Y2FzZSAnSW1hZ2UnOlxyXG5cdFx0XHRsZXQgYmxvYj10aGlzLndvcmRNb2RlbC5nZXRJbWFnZSgpO1xyXG5cdFx0XHR0aGlzLnByb3BzLnNyYz1VUkwuY3JlYXRlT2JqZWN0VVJMKG5ldyBCbG9iKGJsb2IpLHt0eXBlOlwiaW1hZ2UvKlwifSlcclxuXHRcdFx0dGhpcy5wcm9wcy53aWR0aD0yMDBcclxuXHRcdFx0dGhpcy5wcm9wcy5oZWlnaHQ9MjAwXHJcblx0XHRicmVha1xyXG5cdFx0Y2FzZSAnVGV4dCc6XHJcblx0XHRcdHRoaXMuY2hpbGRyZW4ucHVzaCh0aGlzLndvcmRNb2RlbC5nZXRUZXh0KCkpXHJcblx0XHRicmVha1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YXBwZW5kQ2hpbGQoc3JjTW9kZWwpe1xyXG5cdFx0c3dpdGNoKHNyY01vZGVsLnR5cGUpe1xyXG5cdFx0Y2FzZSBcInNlY3Rpb25cIjpcclxuXHRcdGNhc2UgXCJwYXJhZ3JhcGhcIjpcclxuXHRcdGNhc2UgXCJpbmxpbmVcIjpcclxuXHRcdGNhc2UgXCJ0ZXh0XCI6XHJcblx0XHRjYXNlIFwiaW1hZ2VcIjpcclxuXHRcdFx0bGV0IGFwcGVuZGVkPW5ldyBNb2RlbChzcmNNb2RlbCwgdGhpcylcclxuXHRcdFx0dGhpcy5jaGlsZHJlbi5wdXNoKGFwcGVuZGVkKVxyXG5cdFx0XHRyZXR1cm4gYXBwZW5kZWRcclxuXHRcdGRlZmF1bHQ6XHJcblx0XHRcdHJldHVybiB0aGlzXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRjcmVhdGVSZWFjdEVsZW1lbnQobmFtZXNwYWNlKXtcclxuXHRcdGxldCByZWFjdENsYXNzPW5hbWVzcGFjZVt0aGlzLnR5cGVdXHJcblx0XHRsZXQgcHJvcHM9dGhpcy5wcm9wc1xyXG5cdFx0c3dpdGNoKHRoaXMudHlwZSl7XHJcblx0XHRjYXNlICdUZXh0JzpcclxuXHRcdFx0cmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQocmVhY3RDbGFzcyxwcm9wcyx0aGlzLmNoaWxkcmVuWzBdKVxyXG5cdFx0YnJlYWtcclxuXHRcdGNhc2UgJ0ltYWdlJzpcclxuXHRcdFx0cmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQocmVhY3RDbGFzcyxwcm9wcylcclxuXHRcdGJyZWFrXHJcblx0XHRkZWZhdWx0OlxyXG5cdFx0XHRsZXQgY2hpbGRyZW49dGhpcy5jaGlsZHJlbi5tYXAoYT0+YS5jcmVhdGVSZWFjdEVsZW1lbnQobmFtZXNwYWNlKSlcclxuXHRcdFx0cmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQocmVhY3RDbGFzcywgcHJvcHMsIGNoaWxkcmVuKVxyXG5cdFx0fVxyXG5cclxuXHR9XHJcbn1cclxuIl19