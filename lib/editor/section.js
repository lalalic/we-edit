"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _content = require("../content");

var _editable2 = require("./editable");

var _editable3 = _interopRequireDefault(_editable2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_editable) {
	_inherits(_class, _editable);

	function _class() {
		_classCallCheck(this, _class);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
	}

	_createClass(_class, [{
		key: "_reComposeFrom",
		value: function _reComposeFrom(content) {
			var _this2 = this;

			var composed = this.composed;
			var targetId = content._id;

			var currentPage = composed[composed.length - 1];
			var _currentPage = currentPage;
			var columns = _currentPage.columns;

			var currentColumn = columns[columns.length - 1];
			var found = -1;
			while (-1 == (found = currentColumn.children.findIndex(function (group) {
				//group/Line
				return group.props.children.props._id == targetId;
			}))) {
				columns.pop();
				if (columns.length) {
					currentColumn = columns[columns.length - 1];
					found = -1;
				} else {
					composed.pop();
					if (composed.length) {
						currentPage = composed[composed.length - 1];
						var _currentPage2 = currentPage;
						columns = _currentPage2.columns;

						currentColumn = columns[columns.length - 1];
						found = -1;
					} else {
						break;
						//throw new Error("you should find the line from section, but not")
					}
				}
			}

			if (found != -1) {
				(function () {
					var index = currentColumn.children[found].props.index;
					currentColumn.children.splice(found);

					var removed = _this2.children.splice(index);

					var composedTime = new Date().toString();
					removed.forEach(function (a, i) {
						a._clearComposed4reCompose();
						/**
       *  do re-compose job
       */
						a.setState({ composedTime: composedTime });
					});
					_this2.refs.composed.setState({ composedTime: composedTime });
				})();
			} else {
				throw new Error("you should find the line from section, but not");
			}
		}
	}]);

	return _class;
}((0, _editable3.default)(_content.Section));

exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3Ivc2VjdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztpQ0FHZ0IsU0FBUTs7O09BQ1QsV0FBVSxLQUFWLFNBRFM7T0FFVixXQUFVLFFBQWYsSUFGZTs7QUFHaEIsT0FBSSxjQUFZLFNBQVMsU0FBUyxNQUFULEdBQWdCLENBQWhCLENBQXJCLENBSFk7c0JBSUYsWUFKRTtPQUlYLCtCQUpXOztBQUtoQixPQUFJLGdCQUFjLFFBQVEsUUFBUSxNQUFSLEdBQWUsQ0FBZixDQUF0QixDQUxZO0FBTXRCLE9BQUksUUFBTSxDQUFDLENBQUQsQ0FOWTtBQU90QixVQUFNLENBQUMsQ0FBRCxLQUFLLFFBQU0sY0FBYyxRQUFkLENBQXVCLFNBQXZCLENBQWlDLGlCQUFPOztBQUN4RCxXQUFPLE1BQU0sS0FBTixDQUFZLFFBQVosQ0FBcUIsS0FBckIsQ0FBMkIsR0FBM0IsSUFBZ0MsUUFBaEMsQ0FEaUQ7SUFBUCxDQUF2QyxDQUFMLEVBRUY7QUFDSCxZQUFRLEdBQVIsR0FERztBQUVILFFBQUcsUUFBUSxNQUFSLEVBQWU7QUFDakIscUJBQWMsUUFBUSxRQUFRLE1BQVIsR0FBZSxDQUFmLENBQXRCLENBRGlCO0FBRWpCLGFBQU0sQ0FBQyxDQUFELENBRlc7S0FBbEIsTUFHSztBQUNKLGNBQVMsR0FBVCxHQURJO0FBRUosU0FBRyxTQUFTLE1BQVQsRUFBZ0I7QUFDbEIsb0JBQVksU0FBUyxTQUFTLE1BQVQsR0FBZ0IsQ0FBaEIsQ0FBckIsQ0FEa0I7MEJBRVAsWUFGTztBQUVoQixzQ0FGZ0I7O0FBR2xCLHNCQUFjLFFBQVEsUUFBUSxNQUFSLEdBQWUsQ0FBZixDQUF0QixDQUhrQjtBQUlsQixjQUFNLENBQUMsQ0FBRCxDQUpZO01BQW5CLE1BS007QUFDTDs7QUFESyxNQUxOO0tBTEQ7SUFKRDs7QUFxQkEsT0FBRyxTQUFPLENBQUMsQ0FBRCxFQUFHOztBQUNaLFNBQU0sUUFBTSxjQUFjLFFBQWQsQ0FBdUIsS0FBdkIsRUFBOEIsS0FBOUIsQ0FBb0MsS0FBcEM7QUFDWixtQkFBYyxRQUFkLENBQXVCLE1BQXZCLENBQThCLEtBQTlCOztBQUVBLFNBQU0sVUFBUSxPQUFLLFFBQUwsQ0FBYyxNQUFkLENBQXFCLEtBQXJCLENBQVI7O0FBRU4sU0FBTSxlQUFhLElBQUksSUFBSixHQUFXLFFBQVgsRUFBYjtBQUNOLGFBQVEsT0FBUixDQUFnQixVQUFDLENBQUQsRUFBRyxDQUFILEVBQU87QUFDdEIsUUFBRSx3QkFBRjs7OztBQURzQixPQUt0QixDQUFFLFFBQUYsQ0FBVyxFQUFDLDBCQUFELEVBQVgsRUFMc0I7TUFBUCxDQUFoQjtBQU9BLFlBQUssSUFBTCxDQUFVLFFBQVYsQ0FBbUIsUUFBbkIsQ0FBNEIsRUFBQywwQkFBRCxFQUE1QjtTQWRZO0lBQWIsTUFlSztBQUNKLFVBQU0sSUFBSSxLQUFKLENBQVUsZ0RBQVYsQ0FBTixDQURJO0lBZkw7Ozs7O0VBN0IyQiIsImZpbGUiOiJzZWN0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTZWN0aW9ufSBmcm9tIFwiLi4vY29udGVudFwiXG5pbXBvcnQgZWRpdGFibGUgZnJvbSBcIi4vZWRpdGFibGVcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIGVkaXRhYmxlKFNlY3Rpb24pe1xuXHRfcmVDb21wb3NlRnJvbShjb250ZW50KXtcbiAgICAgICAgY29uc3Qge2NvbXBvc2VkfT10aGlzXG5cdFx0Y29uc3Qge19pZDogdGFyZ2V0SWR9PWNvbnRlbnRcbiAgICAgICAgbGV0IGN1cnJlbnRQYWdlPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxuICAgICAgICBsZXQge2NvbHVtbnN9PWN1cnJlbnRQYWdlXG4gICAgICAgIGxldCBjdXJyZW50Q29sdW1uPWNvbHVtbnNbY29sdW1ucy5sZW5ndGgtMV1cblx0XHRsZXQgZm91bmQ9LTFcblx0XHR3aGlsZSgtMT09KGZvdW5kPWN1cnJlbnRDb2x1bW4uY2hpbGRyZW4uZmluZEluZGV4KGdyb3VwPT57Ly9ncm91cC9MaW5lXG5cdFx0XHRyZXR1cm4gZ3JvdXAucHJvcHMuY2hpbGRyZW4ucHJvcHMuX2lkPT10YXJnZXRJZFxuXHRcdH0pKSl7XG5cdFx0XHRjb2x1bW5zLnBvcCgpXG5cdFx0XHRpZihjb2x1bW5zLmxlbmd0aCl7XG5cdFx0XHRcdGN1cnJlbnRDb2x1bW49Y29sdW1uc1tjb2x1bW5zLmxlbmd0aC0xXVxuXHRcdFx0XHRmb3VuZD0tMVxuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdGNvbXBvc2VkLnBvcCgpXG5cdFx0XHRcdGlmKGNvbXBvc2VkLmxlbmd0aCl7XG5cdFx0XHRcdFx0Y3VycmVudFBhZ2U9Y29tcG9zZWRbY29tcG9zZWQubGVuZ3RoLTFdO1xuXHRcdFx0XHRcdCh7Y29sdW1uc309Y3VycmVudFBhZ2UpO1xuXHRcdFx0XHRcdGN1cnJlbnRDb2x1bW49Y29sdW1uc1tjb2x1bW5zLmxlbmd0aC0xXTtcblx0XHRcdFx0XHRmb3VuZD0tMVxuXHRcdFx0XHR9ZWxzZSB7XG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHQvL3Rocm93IG5ldyBFcnJvcihcInlvdSBzaG91bGQgZmluZCB0aGUgbGluZSBmcm9tIHNlY3Rpb24sIGJ1dCBub3RcIilcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmKGZvdW5kIT0tMSl7XG5cdFx0XHRjb25zdCBpbmRleD1jdXJyZW50Q29sdW1uLmNoaWxkcmVuW2ZvdW5kXS5wcm9wcy5pbmRleFxuXHRcdFx0Y3VycmVudENvbHVtbi5jaGlsZHJlbi5zcGxpY2UoZm91bmQpXG5cblx0XHRcdGNvbnN0IHJlbW92ZWQ9dGhpcy5jaGlsZHJlbi5zcGxpY2UoaW5kZXgpXG5cblx0XHRcdGNvbnN0IGNvbXBvc2VkVGltZT1uZXcgRGF0ZSgpLnRvU3RyaW5nKClcblx0XHRcdHJlbW92ZWQuZm9yRWFjaCgoYSxpKT0+e1xuXHRcdFx0XHRhLl9jbGVhckNvbXBvc2VkNHJlQ29tcG9zZSgpXG5cdFx0XHRcdC8qKlxuXHRcdFx0XHQgKiAgZG8gcmUtY29tcG9zZSBqb2Jcblx0XHRcdFx0ICovXG5cdFx0XHRcdGEuc2V0U3RhdGUoe2NvbXBvc2VkVGltZX0pXG5cdFx0XHR9KVxuXHRcdFx0dGhpcy5yZWZzLmNvbXBvc2VkLnNldFN0YXRlKHtjb21wb3NlZFRpbWV9KVxuXHRcdH1lbHNle1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwieW91IHNob3VsZCBmaW5kIHRoZSBsaW5lIGZyb20gc2VjdGlvbiwgYnV0IG5vdFwiKVxuXHRcdH1cblx0fVxuXG59XG4iXX0=