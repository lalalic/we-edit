"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _group = require("../composed/group");

var _group2 = _interopRequireDefault(_group);

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
		key: "createComposed2Parent",
		value: function createComposed2Parent(props) {
			return _react2.default.createElement(_group2.default, _extends({}, props, { index: this.children.length }));
		}
	}, {
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
					console.log("a page is removed");
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
					//we need know from which child each line composes from for re-compose
					//that's why overwrite createComposed2Parent
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3Ivc2VjdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7OztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt3Q0FHdUIsT0FBTTtBQUMzQixVQUFPLDREQUFXLFNBQU8sT0FBTyxLQUFLLFFBQUwsQ0FBYyxNQUFkLEdBQXpCLENBQVAsQ0FEMkI7Ozs7aUNBSWIsU0FBUTs7O09BQ1QsV0FBVSxLQUFWLFNBRFM7T0FFVixXQUFVLFFBQWYsSUFGZTs7QUFHaEIsT0FBSSxjQUFZLFNBQVMsU0FBUyxNQUFULEdBQWdCLENBQWhCLENBQXJCLENBSFk7c0JBSUYsWUFKRTtPQUlYLCtCQUpXOztBQUtoQixPQUFJLGdCQUFjLFFBQVEsUUFBUSxNQUFSLEdBQWUsQ0FBZixDQUF0QixDQUxZO0FBTXRCLE9BQUksUUFBTSxDQUFDLENBQUQsQ0FOWTtBQU90QixVQUFNLENBQUMsQ0FBRCxLQUFLLFFBQU0sY0FBYyxRQUFkLENBQXVCLFNBQXZCLENBQWlDLGlCQUFPOztBQUN4RCxXQUFPLE1BQU0sS0FBTixDQUFZLFFBQVosQ0FBcUIsS0FBckIsQ0FBMkIsR0FBM0IsSUFBZ0MsUUFBaEMsQ0FEaUQ7SUFBUCxDQUF2QyxDQUFMLEVBRUY7QUFDSCxZQUFRLEdBQVIsR0FERztBQUVILFFBQUcsUUFBUSxNQUFSLEVBQWU7QUFDakIscUJBQWMsUUFBUSxRQUFRLE1BQVIsR0FBZSxDQUFmLENBQXRCLENBRGlCO0FBRWpCLGFBQU0sQ0FBQyxDQUFELENBRlc7S0FBbEIsTUFHSztBQUNKLGNBQVMsR0FBVCxHQURJO0FBRUosYUFBUSxHQUFSLENBQVksbUJBQVosRUFGSTtBQUdKLFNBQUcsU0FBUyxNQUFULEVBQWdCO0FBQ2xCLG9CQUFZLFNBQVMsU0FBUyxNQUFULEdBQWdCLENBQWhCLENBQXJCLENBRGtCOzBCQUVQLFlBRk87QUFFaEIsc0NBRmdCOztBQUdsQixzQkFBYyxRQUFRLFFBQVEsTUFBUixHQUFlLENBQWYsQ0FBdEIsQ0FIa0I7QUFJbEIsY0FBTSxDQUFDLENBQUQsQ0FKWTtNQUFuQixNQUtNO0FBQ0w7O0FBREssTUFMTjtLQU5EO0lBSkQ7O0FBc0JBLE9BQUcsU0FBTyxDQUFDLENBQUQsRUFBRzs7OztBQUdaLFNBQU0sUUFBTSxjQUFjLFFBQWQsQ0FBdUIsS0FBdkIsRUFBOEIsS0FBOUIsQ0FBb0MsS0FBcEM7O0FBRVosbUJBQWMsUUFBZCxDQUF1QixNQUF2QixDQUE4QixLQUE5Qjs7QUFFQSxTQUFNLFVBQVEsT0FBSyxRQUFMLENBQWMsTUFBZCxDQUFxQixLQUFyQixDQUFSOztBQUVOLFNBQU0sZUFBYSxJQUFJLElBQUosR0FBVyxRQUFYLEVBQWI7O0FBRU4sYUFBUSxPQUFSLENBQWdCLFVBQUMsQ0FBRCxFQUFHLENBQUgsRUFBTztBQUN0QixRQUFFLHdCQUFGLENBQTJCLEtBQUcsQ0FBSCxDQUEzQjs7OztBQURzQixPQUt0QixDQUFFLFFBQUYsQ0FBVyxFQUFDLDBCQUFELEVBQVgsRUFMc0I7TUFBUCxDQUFoQjtTQVhZO0lBQWIsTUFrQks7QUFDSixVQUFNLElBQUksS0FBSixDQUFVLGdEQUFWLENBQU4sQ0FESTtJQWxCTDs7Ozs7RUFsQzJCIiwiZmlsZSI6InNlY3Rpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCJcblxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXG5cbmltcG9ydCB7U2VjdGlvbn0gZnJvbSBcIi4uL2NvbnRlbnRcIlxuaW1wb3J0IGVkaXRhYmxlIGZyb20gXCIuL2VkaXRhYmxlXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBlZGl0YWJsZShTZWN0aW9uKXtcblx0Y3JlYXRlQ29tcG9zZWQyUGFyZW50KHByb3BzKXtcblx0XHRyZXR1cm4gPEdyb3VwIHsuLi5wcm9wc30gaW5kZXg9e3RoaXMuY2hpbGRyZW4ubGVuZ3RofS8+XG5cdH1cblx0XG5cdF9yZUNvbXBvc2VGcm9tKGNvbnRlbnQpe1xuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXNcblx0XHRjb25zdCB7X2lkOiB0YXJnZXRJZH09Y29udGVudFxuICAgICAgICBsZXQgY3VycmVudFBhZ2U9Y29tcG9zZWRbY29tcG9zZWQubGVuZ3RoLTFdXG4gICAgICAgIGxldCB7Y29sdW1uc309Y3VycmVudFBhZ2VcbiAgICAgICAgbGV0IGN1cnJlbnRDb2x1bW49Y29sdW1uc1tjb2x1bW5zLmxlbmd0aC0xXVxuXHRcdGxldCBmb3VuZD0tMVxuXHRcdHdoaWxlKC0xPT0oZm91bmQ9Y3VycmVudENvbHVtbi5jaGlsZHJlbi5maW5kSW5kZXgoZ3JvdXA9PnsvL2dyb3VwL0xpbmVcblx0XHRcdHJldHVybiBncm91cC5wcm9wcy5jaGlsZHJlbi5wcm9wcy5faWQ9PXRhcmdldElkXG5cdFx0fSkpKXtcblx0XHRcdGNvbHVtbnMucG9wKClcblx0XHRcdGlmKGNvbHVtbnMubGVuZ3RoKXtcblx0XHRcdFx0Y3VycmVudENvbHVtbj1jb2x1bW5zW2NvbHVtbnMubGVuZ3RoLTFdXG5cdFx0XHRcdGZvdW5kPS0xXG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0Y29tcG9zZWQucG9wKClcblx0XHRcdFx0Y29uc29sZS5sb2coXCJhIHBhZ2UgaXMgcmVtb3ZlZFwiKVxuXHRcdFx0XHRpZihjb21wb3NlZC5sZW5ndGgpe1xuXHRcdFx0XHRcdGN1cnJlbnRQYWdlPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXTtcblx0XHRcdFx0XHQoe2NvbHVtbnN9PWN1cnJlbnRQYWdlKTtcblx0XHRcdFx0XHRjdXJyZW50Q29sdW1uPWNvbHVtbnNbY29sdW1ucy5sZW5ndGgtMV07XG5cdFx0XHRcdFx0Zm91bmQ9LTFcblx0XHRcdFx0fWVsc2Uge1xuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdFx0Ly90aHJvdyBuZXcgRXJyb3IoXCJ5b3Ugc2hvdWxkIGZpbmQgdGhlIGxpbmUgZnJvbSBzZWN0aW9uLCBidXQgbm90XCIpXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZihmb3VuZCE9LTEpe1xuXHRcdFx0Ly93ZSBuZWVkIGtub3cgZnJvbSB3aGljaCBjaGlsZCBlYWNoIGxpbmUgY29tcG9zZXMgZnJvbSBmb3IgcmUtY29tcG9zZVxuXHRcdFx0Ly90aGF0J3Mgd2h5IG92ZXJ3cml0ZSBjcmVhdGVDb21wb3NlZDJQYXJlbnRcblx0XHRcdGNvbnN0IGluZGV4PWN1cnJlbnRDb2x1bW4uY2hpbGRyZW5bZm91bmRdLnByb3BzLmluZGV4XG5cdFx0XHRcblx0XHRcdGN1cnJlbnRDb2x1bW4uY2hpbGRyZW4uc3BsaWNlKGZvdW5kKVxuXG5cdFx0XHRjb25zdCByZW1vdmVkPXRoaXMuY2hpbGRyZW4uc3BsaWNlKGluZGV4KVxuXG5cdFx0XHRjb25zdCBjb21wb3NlZFRpbWU9bmV3IERhdGUoKS50b1N0cmluZygpXG5cdFx0XHRcblx0XHRcdHJlbW92ZWQuZm9yRWFjaCgoYSxpKT0+e1xuXHRcdFx0XHRhLl9jbGVhckNvbXBvc2VkNHJlQ29tcG9zZShpPT0wKVxuXHRcdFx0XHQvKipcblx0XHRcdFx0ICogIGRvIHJlLWNvbXBvc2Ugam9iXG5cdFx0XHRcdCAqL1xuXHRcdFx0XHRhLnNldFN0YXRlKHtjb21wb3NlZFRpbWV9KVxuXHRcdFx0fSlcblx0XHR9ZWxzZXtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcInlvdSBzaG91bGQgZmluZCB0aGUgbGluZSBmcm9tIHNlY3Rpb24sIGJ1dCBub3RcIilcblx0XHR9XG5cdH1cbn1cbiJdfQ==