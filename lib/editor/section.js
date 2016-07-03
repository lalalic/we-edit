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
						a._reComposeFrom();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3Ivc2VjdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztpQ0FHZ0IsU0FBUTs7O09BQ1QsV0FBVSxLQUFWLFNBRFM7T0FFVixXQUFVLFFBQWYsSUFGZTs7QUFHaEIsT0FBSSxjQUFZLFNBQVMsU0FBUyxNQUFULEdBQWdCLENBQWhCLENBQXJCLENBSFk7c0JBSUYsWUFKRTtPQUlYLCtCQUpXOztBQUtoQixPQUFJLGdCQUFjLFFBQVEsUUFBUSxNQUFSLEdBQWUsQ0FBZixDQUF0QixDQUxZO0FBTXRCLE9BQUksUUFBTSxDQUFDLENBQUQsQ0FOWTtBQU90QixVQUFNLENBQUMsQ0FBRCxLQUFLLFFBQU0sY0FBYyxRQUFkLENBQXVCLFNBQXZCLENBQWlDLGlCQUFPOztBQUN4RCxXQUFPLE1BQU0sS0FBTixDQUFZLFFBQVosQ0FBcUIsS0FBckIsQ0FBMkIsR0FBM0IsSUFBZ0MsUUFBaEMsQ0FEaUQ7SUFBUCxDQUF2QyxDQUFMLEVBRUY7QUFDSCxZQUFRLEdBQVIsR0FERztBQUVILFFBQUcsUUFBUSxNQUFSLEVBQWU7QUFDakIscUJBQWMsUUFBUSxRQUFRLE1BQVIsR0FBZSxDQUFmLENBQXRCLENBRGlCO0FBRWpCLGFBQU0sQ0FBQyxDQUFELENBRlc7S0FBbEIsTUFHSztBQUNKLGNBQVMsR0FBVCxHQURJO0FBRUosU0FBRyxTQUFTLE1BQVQsRUFBZ0I7QUFDbEIsb0JBQVksU0FBUyxTQUFTLE1BQVQsR0FBZ0IsQ0FBaEIsQ0FBckIsQ0FEa0I7MEJBRVAsWUFGTztBQUVoQixzQ0FGZ0I7O0FBR2xCLHNCQUFjLFFBQVEsUUFBUSxNQUFSLEdBQWUsQ0FBZixDQUF0QixDQUhrQjtBQUlsQixjQUFNLENBQUMsQ0FBRCxDQUpZO01BQW5CLE1BS007QUFDTDs7QUFESyxNQUxOO0tBTEQ7SUFKRDs7QUFxQkEsT0FBRyxTQUFPLENBQUMsQ0FBRCxFQUFHOztBQUNaLFNBQU0sUUFBTSxjQUFjLFFBQWQsQ0FBdUIsS0FBdkIsRUFBOEIsS0FBOUIsQ0FBb0MsS0FBcEM7QUFDWixtQkFBYyxRQUFkLENBQXVCLE1BQXZCLENBQThCLEtBQTlCOztBQUVBLFNBQU0sVUFBUSxPQUFLLFFBQUwsQ0FBYyxNQUFkLENBQXFCLEtBQXJCLENBQVI7O0FBRU4sU0FBTSxlQUFhLElBQUksSUFBSixHQUFXLFFBQVgsRUFBYjtBQUNOLGFBQVEsT0FBUixDQUFnQixVQUFDLENBQUQsRUFBRyxDQUFILEVBQU87QUFDdEIsUUFBRSxjQUFGOzs7O0FBRHNCLE9BS3RCLENBQUUsUUFBRixDQUFXLEVBQUMsMEJBQUQsRUFBWCxFQUxzQjtNQUFQLENBQWhCO0FBT0EsWUFBSyxJQUFMLENBQVUsUUFBVixDQUFtQixRQUFuQixDQUE0QixFQUFDLDBCQUFELEVBQTVCO1NBZFk7SUFBYixNQWVLO0FBQ0osVUFBTSxJQUFJLEtBQUosQ0FBVSxnREFBVixDQUFOLENBREk7SUFmTDs7Ozs7RUE3QjJCIiwiZmlsZSI6InNlY3Rpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1NlY3Rpb259IGZyb20gXCIuLi9jb250ZW50XCJcbmltcG9ydCBlZGl0YWJsZSBmcm9tIFwiLi9lZGl0YWJsZVwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgZWRpdGFibGUoU2VjdGlvbil7XG5cdF9yZUNvbXBvc2VGcm9tKGNvbnRlbnQpe1xuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXNcblx0XHRjb25zdCB7X2lkOiB0YXJnZXRJZH09Y29udGVudFxuICAgICAgICBsZXQgY3VycmVudFBhZ2U9Y29tcG9zZWRbY29tcG9zZWQubGVuZ3RoLTFdXG4gICAgICAgIGxldCB7Y29sdW1uc309Y3VycmVudFBhZ2VcbiAgICAgICAgbGV0IGN1cnJlbnRDb2x1bW49Y29sdW1uc1tjb2x1bW5zLmxlbmd0aC0xXVxuXHRcdGxldCBmb3VuZD0tMVxuXHRcdHdoaWxlKC0xPT0oZm91bmQ9Y3VycmVudENvbHVtbi5jaGlsZHJlbi5maW5kSW5kZXgoZ3JvdXA9PnsvL2dyb3VwL0xpbmVcblx0XHRcdHJldHVybiBncm91cC5wcm9wcy5jaGlsZHJlbi5wcm9wcy5faWQ9PXRhcmdldElkXG5cdFx0fSkpKXtcblx0XHRcdGNvbHVtbnMucG9wKClcblx0XHRcdGlmKGNvbHVtbnMubGVuZ3RoKXtcblx0XHRcdFx0Y3VycmVudENvbHVtbj1jb2x1bW5zW2NvbHVtbnMubGVuZ3RoLTFdXG5cdFx0XHRcdGZvdW5kPS0xXG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0Y29tcG9zZWQucG9wKClcblx0XHRcdFx0aWYoY29tcG9zZWQubGVuZ3RoKXtcblx0XHRcdFx0XHRjdXJyZW50UGFnZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV07XG5cdFx0XHRcdFx0KHtjb2x1bW5zfT1jdXJyZW50UGFnZSk7XG5cdFx0XHRcdFx0Y3VycmVudENvbHVtbj1jb2x1bW5zW2NvbHVtbnMubGVuZ3RoLTFdO1xuXHRcdFx0XHRcdGZvdW5kPS0xXG5cdFx0XHRcdH1lbHNlIHtcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdC8vdGhyb3cgbmV3IEVycm9yKFwieW91IHNob3VsZCBmaW5kIHRoZSBsaW5lIGZyb20gc2VjdGlvbiwgYnV0IG5vdFwiKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYoZm91bmQhPS0xKXtcblx0XHRcdGNvbnN0IGluZGV4PWN1cnJlbnRDb2x1bW4uY2hpbGRyZW5bZm91bmRdLnByb3BzLmluZGV4XG5cdFx0XHRjdXJyZW50Q29sdW1uLmNoaWxkcmVuLnNwbGljZShmb3VuZClcblxuXHRcdFx0Y29uc3QgcmVtb3ZlZD10aGlzLmNoaWxkcmVuLnNwbGljZShpbmRleClcblxuXHRcdFx0Y29uc3QgY29tcG9zZWRUaW1lPW5ldyBEYXRlKCkudG9TdHJpbmcoKVxuXHRcdFx0cmVtb3ZlZC5mb3JFYWNoKChhLGkpPT57XG5cdFx0XHRcdGEuX3JlQ29tcG9zZUZyb20oKVxuXHRcdFx0XHQvKipcblx0XHRcdFx0ICogIGRvIHJlLWNvbXBvc2Ugam9iXG5cdFx0XHRcdCAqL1xuXHRcdFx0XHRhLnNldFN0YXRlKHtjb21wb3NlZFRpbWV9KVxuXHRcdFx0fSlcblx0XHRcdHRoaXMucmVmcy5jb21wb3NlZC5zZXRTdGF0ZSh7Y29tcG9zZWRUaW1lfSlcblx0XHR9ZWxzZXtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcInlvdSBzaG91bGQgZmluZCB0aGUgbGluZSBmcm9tIHNlY3Rpb24sIGJ1dCBub3RcIilcblx0XHR9XG5cdH1cblxufVxuIl19