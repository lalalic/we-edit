"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Cursor = exports.ACTION = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _text = require("./text");

var _text2 = _interopRequireDefault(_text);

var _selection = require("./selection");

var _selector = require("./selector");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ACTION = exports.ACTION = {
	AT: function AT(contentId, from, width) {
		return function (dispatch) {
			var content = (0, _selector.getContent)(contentId);
			var text = content.getContent();
			var wordwrapper = new _text2.default.WordWrapper(text.substr(from), content.getStyle());

			var _ref = wordwrapper.next({ width: width }) || { end: 0, contentWidth: 0 },
			    end = _ref.end;

			dispatch(_selection.ACTION.SELECT(contentId, from + end));
		};
	}
};

var timer = void 0;
var Cursor = exports.Cursor = function Cursor(_ref2) {
	var id = _ref2.id,
	    at = _ref2.at;

	var info = { left: 0, top: 0, height: 0 };
	if (id) {
		var _getContentClientBoun = (0, _selector.getContentClientBoundBox)(id, at),
		    _top = _getContentClientBoun.top,
		    _left = _getContentClientBoun.left,
		    from = _getContentClientBoun.from;

		var content = (0, _selector.getContent)(id);
		var text = content.getContent();
		var wordwrapper = new _text2.default.WordWrapper(text.substring(from, at), content.getStyle());

		var _ref3 = wordwrapper.next({ width: Number.MAX_SAFE_INTEGER }) || { end: 0, contentWidth: 0 },
		    end = _ref3.end,
		    contentWidth = _ref3.contentWidth;

		var _height = wordwrapper.height,
		    descent = wordwrapper.descent;

		_left += contentWidth;
		info = { left: _left, top: _top, height: _height };
	}
	var _info = info,
	    top = _info.top,
	    left = _info.left,
	    height = _info.height;

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

var NO_CURSOR = {};
exports.default = (0, _reactRedux.connect)(function (state) {
	var _state$selection = state.selection,
	    _state$selection$star = _state$selection.start,
	    id = _state$selection$star.id,
	    at = _state$selection$star.at,
	    end = _state$selection.end;

	if (id == 0) return NO_CURSOR;
	if (end.id == id && end.at == at) return end;else return NO_CURSOR;
})(Cursor);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvY3Vyc29yLmpzIl0sIm5hbWVzIjpbIkFDVElPTiIsIkFUIiwiY29udGVudElkIiwiZnJvbSIsIndpZHRoIiwiY29udGVudCIsInRleHQiLCJnZXRDb250ZW50Iiwid29yZHdyYXBwZXIiLCJXb3JkV3JhcHBlciIsInN1YnN0ciIsImdldFN0eWxlIiwibmV4dCIsImVuZCIsImNvbnRlbnRXaWR0aCIsImRpc3BhdGNoIiwiU0VMRUNUIiwidGltZXIiLCJDdXJzb3IiLCJpZCIsImF0IiwiaW5mbyIsImxlZnQiLCJ0b3AiLCJoZWlnaHQiLCJzdWJzdHJpbmciLCJOdW1iZXIiLCJNQVhfU0FGRV9JTlRFR0VSIiwiZGVzY2VudCIsImNsZWFySW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsInkxIiwibm9kZSIsImdldEF0dHJpYnV0ZSIsInkyIiwic2V0QXR0cmlidXRlIiwiTk9fQ1VSU09SIiwic3RhdGUiLCJzZWxlY3Rpb24iLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUVPLElBQU1BLDBCQUFPO0FBQ25CQyxLQUFJLFlBQUNDLFNBQUQsRUFBWUMsSUFBWixFQUFrQkMsS0FBbEI7QUFBQSxTQUEwQixvQkFBVTtBQUN2QyxPQUFNQyxVQUFRLDBCQUFXSCxTQUFYLENBQWQ7QUFDQSxPQUFNSSxPQUFLRCxRQUFRRSxVQUFSLEVBQVg7QUFDQSxPQUFNQyxjQUFZLElBQUksZUFBYUMsV0FBakIsQ0FBNkJILEtBQUtJLE1BQUwsQ0FBWVAsSUFBWixDQUE3QixFQUFnREUsUUFBUU0sUUFBUixFQUFoRCxDQUFsQjs7QUFIdUMsY0FJM0JILFlBQVlJLElBQVosQ0FBaUIsRUFBQ1IsWUFBRCxFQUFqQixLQUEyQixFQUFDUyxLQUFJLENBQUwsRUFBT0MsY0FBYSxDQUFwQixFQUpBO0FBQUEsT0FJaENELEdBSmdDLFFBSWhDQSxHQUpnQzs7QUFLdkNFLFlBQVMsa0JBQWlCQyxNQUFqQixDQUF3QmQsU0FBeEIsRUFBbUNDLE9BQUtVLEdBQXhDLENBQVQ7QUFDQSxHQU5HO0FBQUE7QUFEZSxDQUFiOztBQVVQLElBQUlJLGNBQUo7QUFDTyxJQUFNQywwQkFBTyxTQUFQQSxNQUFPLFFBQVc7QUFBQSxLQUFUQyxFQUFTLFNBQVRBLEVBQVM7QUFBQSxLQUFOQyxFQUFNLFNBQU5BLEVBQU07O0FBQzlCLEtBQUlDLE9BQUssRUFBQ0MsTUFBSyxDQUFOLEVBQVNDLEtBQUksQ0FBYixFQUFnQkMsUUFBTyxDQUF2QixFQUFUO0FBQ0EsS0FBR0wsRUFBSCxFQUFNO0FBQUEsOEJBQ2Usd0NBQXlCQSxFQUF6QixFQUE0QkMsRUFBNUIsQ0FEZjtBQUFBLE1BQ0FHLElBREEseUJBQ0FBLEdBREE7QUFBQSxNQUNJRCxLQURKLHlCQUNJQSxJQURKO0FBQUEsTUFDU25CLElBRFQseUJBQ1NBLElBRFQ7O0FBRUwsTUFBTUUsVUFBUSwwQkFBV2MsRUFBWCxDQUFkO0FBQ0EsTUFBTWIsT0FBS0QsUUFBUUUsVUFBUixFQUFYO0FBQ0EsTUFBSUMsY0FBWSxJQUFJLGVBQWFDLFdBQWpCLENBQTZCSCxLQUFLbUIsU0FBTCxDQUFldEIsSUFBZixFQUFvQmlCLEVBQXBCLENBQTdCLEVBQXNEZixRQUFRTSxRQUFSLEVBQXRELENBQWhCOztBQUpLLGNBS21CSCxZQUFZSSxJQUFaLENBQWlCLEVBQUNSLE9BQU1zQixPQUFPQyxnQkFBZCxFQUFqQixLQUFtRCxFQUFDZCxLQUFJLENBQUwsRUFBT0MsY0FBYSxDQUFwQixFQUx0RTtBQUFBLE1BS0FELEdBTEEsU0FLQUEsR0FMQTtBQUFBLE1BS0tDLFlBTEwsU0FLS0EsWUFMTDs7QUFBQSxNQU1BVSxPQU5BLEdBTWlCaEIsV0FOakIsQ0FNQWdCLE1BTkE7QUFBQSxNQU1RSSxPQU5SLEdBTWlCcEIsV0FOakIsQ0FNUW9CLE9BTlI7O0FBT0xOLFdBQU1SLFlBQU47QUFDQU8sU0FBSyxFQUFDQyxXQUFELEVBQU9DLFNBQVAsRUFBWUMsZUFBWixFQUFMO0FBQ0E7QUFYNkIsYUFZTkgsSUFaTTtBQUFBLEtBWXpCRSxHQVp5QixTQVl6QkEsR0FaeUI7QUFBQSxLQVlwQkQsSUFab0IsU0FZcEJBLElBWm9CO0FBQUEsS0FZZEUsTUFaYyxTQVlkQSxNQVpjOztBQWE5QixRQUNDO0FBQ0MsTUFBSUYsSUFETDtBQUVDLE1BQUlDLEdBRkw7QUFHQyxNQUFJRCxJQUhMO0FBSUMsTUFBSUMsTUFBSUMsTUFKVDtBQUtDLGVBQWEsQ0FMZDtBQU1DLFVBQVEsT0FOVDtBQU9DLE9BQUssbUJBQU07QUFDVlAsWUFBU1ksY0FBY1osS0FBZCxDQUFUO0FBQ0FBLFdBQU1hLFlBQVksYUFBRztBQUNwQixRQUFJQyxLQUFHQyxLQUFLQyxZQUFMLENBQWtCLElBQWxCLENBQVA7QUFBQSxRQUFnQ0MsS0FBR0YsS0FBS0MsWUFBTCxDQUFrQixJQUFsQixDQUFuQztBQUNBRCxTQUFLRyxZQUFMLENBQWtCLElBQWxCLEVBQXVCSixNQUFJRyxFQUFKLEdBQVNYLE1BQUlDLE1BQWIsR0FBc0JELEdBQTdDO0FBQ0EsSUFISyxFQUdILEdBSEcsQ0FBTjtBQUlBO0FBYkYsR0FERDtBQWlCQSxDQTlCTTs7QUFnQ1AsSUFBTWEsWUFBVSxFQUFoQjtrQkFDZSx5QkFBUSxpQkFBTztBQUFBLHdCQUNTQyxLQURULENBQ3RCQyxTQURzQjtBQUFBLDhDQUNYQyxLQURXO0FBQUEsS0FDSnBCLEVBREkseUJBQ0pBLEVBREk7QUFBQSxLQUNEQyxFQURDLHlCQUNEQSxFQURDO0FBQUEsS0FDR1AsR0FESCxvQkFDR0EsR0FESDs7QUFFN0IsS0FBR00sTUFBSSxDQUFQLEVBQ0MsT0FBT2lCLFNBQVA7QUFDRCxLQUFHdkIsSUFBSU0sRUFBSixJQUFRQSxFQUFSLElBQWNOLElBQUlPLEVBQUosSUFBUUEsRUFBekIsRUFDQyxPQUFPUCxHQUFQLENBREQsS0FHQyxPQUFPdUIsU0FBUDtBQUNELENBUmMsRUFRWmxCLE1BUlksQyIsImZpbGUiOiJjdXJzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxyXG5pbXBvcnQgRWRpdGFibGVUZXh0IGZyb20gXCIuL3RleHRcIlxyXG5pbXBvcnQge0FDVElPTiBhcyBTZWxlY3Rpb25fQUNUSU9OfSBmcm9tIFwiLi9zZWxlY3Rpb25cIlxyXG5pbXBvcnQge2dldENvbnRlbnQsZ2V0Q29udGVudENsaWVudEJvdW5kQm94fSBmcm9tIFwiLi9zZWxlY3RvclwiXHJcblxyXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcclxuXHRBVDogKGNvbnRlbnRJZCwgZnJvbSwgd2lkdGgpPT5kaXNwYXRjaD0+e1xyXG5cdFx0Y29uc3QgY29udGVudD1nZXRDb250ZW50KGNvbnRlbnRJZClcclxuXHRcdGNvbnN0IHRleHQ9Y29udGVudC5nZXRDb250ZW50KClcclxuXHRcdGNvbnN0IHdvcmR3cmFwcGVyPW5ldyBFZGl0YWJsZVRleHQuV29yZFdyYXBwZXIodGV4dC5zdWJzdHIoZnJvbSksIGNvbnRlbnQuZ2V0U3R5bGUoKSlcclxuXHRcdGNvbnN0IHtlbmR9PXdvcmR3cmFwcGVyLm5leHQoe3dpZHRofSl8fHtlbmQ6MCxjb250ZW50V2lkdGg6MH1cclxuXHRcdGRpc3BhdGNoKFNlbGVjdGlvbl9BQ1RJT04uU0VMRUNUKGNvbnRlbnRJZCwgZnJvbStlbmQpKVxyXG5cdH1cclxufVxyXG5cclxubGV0IHRpbWVyXHJcbmV4cG9ydCBjb25zdCBDdXJzb3I9KHtpZCxhdH0pPT57XHJcblx0bGV0IGluZm89e2xlZnQ6MCwgdG9wOjAsIGhlaWdodDowfVxyXG5cdGlmKGlkKXtcclxuXHRcdGxldCB7dG9wLGxlZnQsZnJvbX09Z2V0Q29udGVudENsaWVudEJvdW5kQm94KGlkLGF0KVxyXG5cdFx0Y29uc3QgY29udGVudD1nZXRDb250ZW50KGlkKVxyXG5cdFx0Y29uc3QgdGV4dD1jb250ZW50LmdldENvbnRlbnQoKVxyXG5cdFx0bGV0IHdvcmR3cmFwcGVyPW5ldyBFZGl0YWJsZVRleHQuV29yZFdyYXBwZXIodGV4dC5zdWJzdHJpbmcoZnJvbSxhdCksIGNvbnRlbnQuZ2V0U3R5bGUoKSlcclxuXHRcdGxldCB7ZW5kLCBjb250ZW50V2lkdGh9PXdvcmR3cmFwcGVyLm5leHQoe3dpZHRoOk51bWJlci5NQVhfU0FGRV9JTlRFR0VSfSl8fHtlbmQ6MCxjb250ZW50V2lkdGg6MH1cclxuXHRcdGxldCB7aGVpZ2h0LCBkZXNjZW50fT13b3Jkd3JhcHBlclxyXG5cdFx0bGVmdCs9Y29udGVudFdpZHRoXHJcblx0XHRpbmZvPXtsZWZ0LCB0b3AsIGhlaWdodH1cclxuXHR9XHJcblx0bGV0IHt0b3AsIGxlZnQsIGhlaWdodH09aW5mb1xyXG5cdHJldHVybiAoXHJcblx0XHQ8bGluZVxyXG5cdFx0XHR4MT17bGVmdH1cclxuXHRcdFx0eTE9e3RvcH1cclxuXHRcdFx0eDI9e2xlZnR9XHJcblx0XHRcdHkyPXt0b3AraGVpZ2h0fVxyXG5cdFx0XHRzdHJva2VXaWR0aD17MX1cclxuXHRcdFx0c3Ryb2tlPXtcImJsYWNrXCJ9XHJcblx0XHRcdHJlZj17bm9kZT0+e1xyXG5cdFx0XHRcdHRpbWVyICYmIGNsZWFySW50ZXJ2YWwodGltZXIpO1xyXG5cdFx0XHRcdHRpbWVyPXNldEludGVydmFsKGE9PntcclxuXHRcdFx0XHRcdGxldCB5MT1ub2RlLmdldEF0dHJpYnV0ZSgneTEnKSwgeTI9bm9kZS5nZXRBdHRyaWJ1dGUoJ3kyJylcclxuXHRcdFx0XHRcdG5vZGUuc2V0QXR0cmlidXRlKCd5MicseTE9PXkyID8gdG9wK2hlaWdodCA6IHRvcClcclxuXHRcdFx0XHR9LCA3MDApXHJcblx0XHRcdH19XHJcblx0XHRcdC8+XHJcblx0KVxyXG59XHJcblxyXG5jb25zdCBOT19DVVJTT1I9e31cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChzdGF0ZT0+e1xyXG5cdGNvbnN0IHtzZWxlY3Rpb246e3N0YXJ0OntpZCxhdH0sZW5kfX09c3RhdGVcclxuXHRpZihpZD09MClcclxuXHRcdHJldHVybiBOT19DVVJTT1JcclxuXHRpZihlbmQuaWQ9PWlkICYmIGVuZC5hdD09YXQpXHJcblx0XHRyZXR1cm4gZW5kXHJcblx0ZWxzZVxyXG5cdFx0cmV0dXJuIE5PX0NVUlNPUlxyXG59KShDdXJzb3IpXHJcbiJdfQ==