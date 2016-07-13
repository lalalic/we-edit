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
						a._clearComposed4reCompose(i == 0);
						/**
       *  do re-compose job
       */
						a.setState({ composedTime: composedTime });
					});
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3Ivc2VjdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztpQ0FHZ0IsU0FBUTs7O09BQ1QsV0FBVSxLQUFWLFNBRFM7T0FFVixXQUFVLFFBQWYsSUFGZTs7QUFHaEIsT0FBSSxjQUFZLFNBQVMsU0FBUyxNQUFULEdBQWdCLENBQWhCLENBQXJCLENBSFk7c0JBSUYsWUFKRTtPQUlYLCtCQUpXOztBQUtoQixPQUFJLGdCQUFjLFFBQVEsUUFBUSxNQUFSLEdBQWUsQ0FBZixDQUF0QixDQUxZO0FBTXRCLE9BQUksUUFBTSxDQUFDLENBQUQsQ0FOWTtBQU90QixVQUFNLENBQUMsQ0FBRCxLQUFLLFFBQU0sY0FBYyxRQUFkLENBQXVCLFNBQXZCLENBQWlDLGlCQUFPOztBQUN4RCxXQUFPLE1BQU0sS0FBTixDQUFZLFFBQVosQ0FBcUIsS0FBckIsQ0FBMkIsR0FBM0IsSUFBZ0MsUUFBaEMsQ0FEaUQ7SUFBUCxDQUF2QyxDQUFMLEVBRUY7QUFDSCxZQUFRLEdBQVIsR0FERztBQUVILFFBQUcsUUFBUSxNQUFSLEVBQWU7QUFDakIscUJBQWMsUUFBUSxRQUFRLE1BQVIsR0FBZSxDQUFmLENBQXRCLENBRGlCO0FBRWpCLGFBQU0sQ0FBQyxDQUFELENBRlc7S0FBbEIsTUFHSztBQUNKLGNBQVMsR0FBVCxHQURJO0FBRUosU0FBRyxTQUFTLE1BQVQsRUFBZ0I7QUFDbEIsb0JBQVksU0FBUyxTQUFTLE1BQVQsR0FBZ0IsQ0FBaEIsQ0FBckIsQ0FEa0I7MEJBRVAsWUFGTztBQUVoQixzQ0FGZ0I7O0FBR2xCLHNCQUFjLFFBQVEsUUFBUSxNQUFSLEdBQWUsQ0FBZixDQUF0QixDQUhrQjtBQUlsQixjQUFNLENBQUMsQ0FBRCxDQUpZO01BQW5CLE1BS007QUFDTDs7QUFESyxNQUxOO0tBTEQ7SUFKRDs7QUFxQkEsT0FBRyxTQUFPLENBQUMsQ0FBRCxFQUFHOztBQUNaLFNBQU0sUUFBTSxjQUFjLFFBQWQsQ0FBdUIsS0FBdkIsRUFBOEIsS0FBOUIsQ0FBb0MsS0FBcEM7QUFDWixtQkFBYyxRQUFkLENBQXVCLE1BQXZCLENBQThCLEtBQTlCOztBQUVBLFNBQU0sVUFBUSxPQUFLLFFBQUwsQ0FBYyxNQUFkLENBQXFCLEtBQXJCLENBQVI7O0FBRU4sU0FBTSxlQUFhLElBQUksSUFBSixHQUFXLFFBQVgsRUFBYjtBQUNOLGFBQVEsT0FBUixDQUFnQixVQUFDLENBQUQsRUFBRyxDQUFILEVBQU87QUFDdEIsUUFBRSx3QkFBRixDQUEyQixLQUFHLENBQUgsQ0FBM0I7Ozs7QUFEc0IsT0FLdEIsQ0FBRSxRQUFGLENBQVcsRUFBQywwQkFBRCxFQUFYLEVBTHNCO01BQVAsQ0FBaEI7U0FQWTtJQUFiLE1BY0s7QUFDSixVQUFNLElBQUksS0FBSixDQUFVLGdEQUFWLENBQU4sQ0FESTtJQWRMOzs7OztFQTdCMkIiLCJmaWxlIjoic2VjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7U2VjdGlvbn0gZnJvbSBcIi4uL2NvbnRlbnRcIlxuaW1wb3J0IGVkaXRhYmxlIGZyb20gXCIuL2VkaXRhYmxlXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBlZGl0YWJsZShTZWN0aW9uKXtcblx0X3JlQ29tcG9zZUZyb20oY29udGVudCl7XG4gICAgICAgIGNvbnN0IHtjb21wb3NlZH09dGhpc1xuXHRcdGNvbnN0IHtfaWQ6IHRhcmdldElkfT1jb250ZW50XG4gICAgICAgIGxldCBjdXJyZW50UGFnZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cbiAgICAgICAgbGV0IHtjb2x1bW5zfT1jdXJyZW50UGFnZVxuICAgICAgICBsZXQgY3VycmVudENvbHVtbj1jb2x1bW5zW2NvbHVtbnMubGVuZ3RoLTFdXG5cdFx0bGV0IGZvdW5kPS0xXG5cdFx0d2hpbGUoLTE9PShmb3VuZD1jdXJyZW50Q29sdW1uLmNoaWxkcmVuLmZpbmRJbmRleChncm91cD0+ey8vZ3JvdXAvTGluZVxuXHRcdFx0cmV0dXJuIGdyb3VwLnByb3BzLmNoaWxkcmVuLnByb3BzLl9pZD09dGFyZ2V0SWRcblx0XHR9KSkpe1xuXHRcdFx0Y29sdW1ucy5wb3AoKVxuXHRcdFx0aWYoY29sdW1ucy5sZW5ndGgpe1xuXHRcdFx0XHRjdXJyZW50Q29sdW1uPWNvbHVtbnNbY29sdW1ucy5sZW5ndGgtMV1cblx0XHRcdFx0Zm91bmQ9LTFcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRjb21wb3NlZC5wb3AoKVxuXHRcdFx0XHRpZihjb21wb3NlZC5sZW5ndGgpe1xuXHRcdFx0XHRcdGN1cnJlbnRQYWdlPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXTtcblx0XHRcdFx0XHQoe2NvbHVtbnN9PWN1cnJlbnRQYWdlKTtcblx0XHRcdFx0XHRjdXJyZW50Q29sdW1uPWNvbHVtbnNbY29sdW1ucy5sZW5ndGgtMV07XG5cdFx0XHRcdFx0Zm91bmQ9LTFcblx0XHRcdFx0fWVsc2Uge1xuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdFx0Ly90aHJvdyBuZXcgRXJyb3IoXCJ5b3Ugc2hvdWxkIGZpbmQgdGhlIGxpbmUgZnJvbSBzZWN0aW9uLCBidXQgbm90XCIpXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZihmb3VuZCE9LTEpe1xuXHRcdFx0Y29uc3QgaW5kZXg9Y3VycmVudENvbHVtbi5jaGlsZHJlbltmb3VuZF0ucHJvcHMuaW5kZXhcblx0XHRcdGN1cnJlbnRDb2x1bW4uY2hpbGRyZW4uc3BsaWNlKGZvdW5kKVxuXG5cdFx0XHRjb25zdCByZW1vdmVkPXRoaXMuY2hpbGRyZW4uc3BsaWNlKGluZGV4KVxuXG5cdFx0XHRjb25zdCBjb21wb3NlZFRpbWU9bmV3IERhdGUoKS50b1N0cmluZygpXG5cdFx0XHRyZW1vdmVkLmZvckVhY2goKGEsaSk9Pntcblx0XHRcdFx0YS5fY2xlYXJDb21wb3NlZDRyZUNvbXBvc2UoaT09MClcblx0XHRcdFx0LyoqXG5cdFx0XHRcdCAqICBkbyByZS1jb21wb3NlIGpvYlxuXHRcdFx0XHQgKi9cblx0XHRcdFx0YS5zZXRTdGF0ZSh7Y29tcG9zZWRUaW1lfSlcblx0XHRcdH0pXG5cdFx0fWVsc2V7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJ5b3Ugc2hvdWxkIGZpbmQgdGhlIGxpbmUgZnJvbSBzZWN0aW9uLCBidXQgbm90XCIpXG5cdFx0fVxuXHR9XG5cbn1cbiJdfQ==