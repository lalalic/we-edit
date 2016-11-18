"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Cursor = exports.reducer = exports.ACTION = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _text = require("./text");

var _selection = require("./selection");

var Selection = _interopRequireWildcard(_selection);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ACTION = exports.ACTION = {
	AT: function AT(content, from, width, top, left) {
		return function (dispatch) {
			var content = getComponentById(id);
			var text = content.getContent();
			var wordwrapper = new _text.WordWrapper(text.substr(from), content.getStyle());

			var _ref = wordwrapper.next({ width: width }) || { end: 0, contentWidth: 0 },
			    end = _ref.end,
			    contentWidth = _ref.contentWidth;

			var height = wordwrapper.height,
			    descent = wordwrapper.descent;

			dispatch(Selection.SELECT(id, from + end));
			dispatch({ type: 'cursor', payload: { top: top + descent, left: left + contentWidth, height: height } });
		};
	}
};

var reducer = exports.reducer = function reducer() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { top: 0, left: 0, height: 0 };
	var _ref2 = arguments[1];
	var type = _ref2.type,
	    payload = _ref2.payload;

	switch (type) {
		case 'cursor':
			return payload;
	}
	return state;
};

var timer = void 0;
var Cursor = exports.Cursor = function Cursor(_ref3) {
	var top = _ref3.top,
	    left = _ref3.left,
	    height = _ref3.height;
	return _react2.default.createElement("line", {
		x1: left,
		y1: top,
		x2: left,
		y2: top + height,
		strokeWidth: 1,
		stroke: "black",
		ref: function ref(node) {
			timer && clearInterval(timer);
			timer = setInterval(function (a) {
				var y1 = node.getAttribute('y1'),
				    y2 = node.getAttribute('y2');
				node.setAttribute('y2', y1 == y2 ? top + height : top);
			}, 700);
		}
	});
};

exports.default = (0, _reactRedux.connect)(function (state) {
	return state.cursor;
})(Cursor);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvY3Vyc29yLmpzIl0sIm5hbWVzIjpbIlNlbGVjdGlvbiIsIkFDVElPTiIsIkFUIiwiY29udGVudCIsImZyb20iLCJ3aWR0aCIsInRvcCIsImxlZnQiLCJnZXRDb21wb25lbnRCeUlkIiwiaWQiLCJ0ZXh0IiwiZ2V0Q29udGVudCIsIndvcmR3cmFwcGVyIiwic3Vic3RyIiwiZ2V0U3R5bGUiLCJuZXh0IiwiZW5kIiwiY29udGVudFdpZHRoIiwiaGVpZ2h0IiwiZGVzY2VudCIsImRpc3BhdGNoIiwiU0VMRUNUIiwidHlwZSIsInBheWxvYWQiLCJyZWR1Y2VyIiwic3RhdGUiLCJ0aW1lciIsIkN1cnNvciIsImNsZWFySW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsInkxIiwibm9kZSIsImdldEF0dHJpYnV0ZSIsInkyIiwic2V0QXR0cmlidXRlIiwiY3Vyc29yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7SUFBWUEsUzs7Ozs7O0FBRUwsSUFBTUMsMEJBQU87QUFDbkJDLEtBQUksWUFBQ0MsT0FBRCxFQUFhQyxJQUFiLEVBQW1CQyxLQUFuQixFQUEwQkMsR0FBMUIsRUFBK0JDLElBQS9CO0FBQUEsU0FBc0Msb0JBQVU7QUFDbkQsT0FBTUosVUFBUUssaUJBQWlCQyxFQUFqQixDQUFkO0FBQ0EsT0FBTUMsT0FBS1AsUUFBUVEsVUFBUixFQUFYO0FBQ0EsT0FBTUMsY0FBWSxzQkFBZ0JGLEtBQUtHLE1BQUwsQ0FBWVQsSUFBWixDQUFoQixFQUFtQ0QsUUFBUVcsUUFBUixFQUFuQyxDQUFsQjs7QUFIbUQsY0FJekJGLFlBQVlHLElBQVosQ0FBaUIsRUFBQ1YsWUFBRCxFQUFqQixLQUEyQixFQUFDVyxLQUFJLENBQUwsRUFBT0MsY0FBYSxDQUFwQixFQUpGO0FBQUEsT0FJNUNELEdBSjRDLFFBSTVDQSxHQUo0QztBQUFBLE9BSXZDQyxZQUp1QyxRQUl2Q0EsWUFKdUM7O0FBQUEsT0FLNUNDLE1BTDRDLEdBSzNCTixXQUwyQixDQUs1Q00sTUFMNEM7QUFBQSxPQUtwQ0MsT0FMb0MsR0FLM0JQLFdBTDJCLENBS3BDTyxPQUxvQzs7QUFNbkRDLFlBQVNwQixVQUFVcUIsTUFBVixDQUFpQlosRUFBakIsRUFBcUJMLE9BQUtZLEdBQTFCLENBQVQ7QUFDQUksWUFBUyxFQUFDRSxNQUFLLFFBQU4sRUFBZUMsU0FBUSxFQUFDakIsS0FBSUEsTUFBSWEsT0FBVCxFQUFpQlosTUFBS0EsT0FBS1UsWUFBM0IsRUFBd0NDLGNBQXhDLEVBQXZCLEVBQVQ7QUFDQSxHQVJHO0FBQUE7QUFEZSxDQUFiOztBQVlBLElBQU1NLDRCQUFRLFNBQVJBLE9BQVEsR0FBa0Q7QUFBQSxLQUFqREMsS0FBaUQsdUVBQTNDLEVBQUNuQixLQUFJLENBQUwsRUFBT0MsTUFBSyxDQUFaLEVBQWNXLFFBQU8sQ0FBckIsRUFBMkM7QUFBQTtBQUFBLEtBQWpCSSxJQUFpQixTQUFqQkEsSUFBaUI7QUFBQSxLQUFYQyxPQUFXLFNBQVhBLE9BQVc7O0FBQ3RFLFNBQU9ELElBQVA7QUFDQSxPQUFLLFFBQUw7QUFDQyxVQUFPQyxPQUFQO0FBRkQ7QUFJQSxRQUFPRSxLQUFQO0FBQ0EsQ0FOTTs7QUFRUCxJQUFJQyxjQUFKO0FBQ08sSUFBTUMsMEJBQU8sU0FBUEEsTUFBTztBQUFBLEtBQUVyQixHQUFGLFNBQUVBLEdBQUY7QUFBQSxLQUFNQyxJQUFOLFNBQU1BLElBQU47QUFBQSxLQUFXVyxNQUFYLFNBQVdBLE1BQVg7QUFBQSxRQUNuQjtBQUNDLE1BQUlYLElBREw7QUFFQyxNQUFJRCxHQUZMO0FBR0MsTUFBSUMsSUFITDtBQUlDLE1BQUlELE1BQUlZLE1BSlQ7QUFLQyxlQUFhLENBTGQ7QUFNQyxVQUFRLE9BTlQ7QUFPQyxPQUFLLG1CQUFNO0FBQ1ZRLFlBQVNFLGNBQWNGLEtBQWQsQ0FBVDtBQUNBQSxXQUFNRyxZQUFZLGFBQUc7QUFDcEIsUUFBSUMsS0FBR0MsS0FBS0MsWUFBTCxDQUFrQixJQUFsQixDQUFQO0FBQUEsUUFBZ0NDLEtBQUdGLEtBQUtDLFlBQUwsQ0FBa0IsSUFBbEIsQ0FBbkM7QUFDQUQsU0FBS0csWUFBTCxDQUFrQixJQUFsQixFQUF1QkosTUFBSUcsRUFBSixHQUFTM0IsTUFBSVksTUFBYixHQUFzQlosR0FBN0M7QUFDQSxJQUhLLEVBR0gsR0FIRyxDQUFOO0FBSUE7QUFiRixHQURtQjtBQUFBLENBQWI7O2tCQWtCUSx5QkFBUTtBQUFBLFFBQU9tQixNQUFNVSxNQUFiO0FBQUEsQ0FBUixFQUE2QlIsTUFBN0IsQyIsImZpbGUiOiJjdXJzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxyXG5pbXBvcnQge1dvcmRXcmFwcGVyfSBmcm9tIFwiLi90ZXh0XCJcclxuaW1wb3J0ICogYXMgU2VsZWN0aW9uIGZyb20gXCIuL3NlbGVjdGlvblwiXHJcblxyXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcclxuXHRBVDogKGNvbnRlbnQ6aWQsIGZyb20sIHdpZHRoLCB0b3AsIGxlZnQpPT5kaXNwYXRjaD0+e1xyXG5cdFx0Y29uc3QgY29udGVudD1nZXRDb21wb25lbnRCeUlkKGlkKVxyXG5cdFx0Y29uc3QgdGV4dD1jb250ZW50LmdldENvbnRlbnQoKVxyXG5cdFx0Y29uc3Qgd29yZHdyYXBwZXI9bmV3IFdvcmRXcmFwcGVyKHRleHQuc3Vic3RyKGZyb20pLCBjb250ZW50LmdldFN0eWxlKCkpXHJcblx0XHRjb25zdCB7ZW5kLCBjb250ZW50V2lkdGh9PXdvcmR3cmFwcGVyLm5leHQoe3dpZHRofSl8fHtlbmQ6MCxjb250ZW50V2lkdGg6MH1cclxuXHRcdGNvbnN0IHtoZWlnaHQsIGRlc2NlbnR9PXdvcmR3cmFwcGVyXHJcblx0XHRkaXNwYXRjaChTZWxlY3Rpb24uU0VMRUNUKGlkLCBmcm9tK2VuZCkpXHJcblx0XHRkaXNwYXRjaCh7dHlwZTonY3Vyc29yJyxwYXlsb2FkOnt0b3A6dG9wK2Rlc2NlbnQsbGVmdDpsZWZ0K2NvbnRlbnRXaWR0aCxoZWlnaHR9fSlcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCByZWR1Y2VyPShzdGF0ZT17dG9wOjAsbGVmdDowLGhlaWdodDowfSwge3R5cGUsIHBheWxvYWR9KT0+e1xyXG5cdHN3aXRjaCh0eXBlKXtcclxuXHRjYXNlICdjdXJzb3InOlxyXG5cdFx0cmV0dXJuIHBheWxvYWRcclxuXHR9XHJcblx0cmV0dXJuIHN0YXRlXHJcbn1cclxuXHJcbmxldCB0aW1lclxyXG5leHBvcnQgY29uc3QgQ3Vyc29yPSh7dG9wLGxlZnQsaGVpZ2h0fSk9PihcclxuXHQ8bGluZVxyXG5cdFx0eDE9e2xlZnR9XHJcblx0XHR5MT17dG9wfVxyXG5cdFx0eDI9e2xlZnR9XHJcblx0XHR5Mj17dG9wK2hlaWdodH1cclxuXHRcdHN0cm9rZVdpZHRoPXsxfVxyXG5cdFx0c3Ryb2tlPXtcImJsYWNrXCJ9XHJcblx0XHRyZWY9e25vZGU9PntcclxuXHRcdFx0dGltZXIgJiYgY2xlYXJJbnRlcnZhbCh0aW1lcik7XHJcblx0XHRcdHRpbWVyPXNldEludGVydmFsKGE9PntcclxuXHRcdFx0XHRsZXQgeTE9bm9kZS5nZXRBdHRyaWJ1dGUoJ3kxJyksIHkyPW5vZGUuZ2V0QXR0cmlidXRlKCd5MicpXHJcblx0XHRcdFx0bm9kZS5zZXRBdHRyaWJ1dGUoJ3kyJyx5MT09eTIgPyB0b3AraGVpZ2h0IDogdG9wKVxyXG5cdFx0XHR9LCA3MDApXHJcblx0XHR9fVxyXG5cdFx0Lz5cclxuKVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChzdGF0ZT0+c3RhdGUuY3Vyc29yKShDdXJzb3IpIl19