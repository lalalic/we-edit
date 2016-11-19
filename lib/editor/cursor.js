"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Cursor = exports.ACTION = undefined;

var _maxSafeInteger = require("babel-runtime/core-js/number/max-safe-integer");

var _maxSafeInteger2 = _interopRequireDefault(_maxSafeInteger);

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
		var wordwrapper = new _text2.default.WordWrapper(text.substr(from, at), content.getStyle());

		var _ref3 = wordwrapper.next({ width: _maxSafeInteger2.default }) || { end: 0, contentWidth: 0 },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvY3Vyc29yLmpzIl0sIm5hbWVzIjpbIkFDVElPTiIsIkFUIiwiY29udGVudElkIiwiZnJvbSIsIndpZHRoIiwiY29udGVudCIsInRleHQiLCJnZXRDb250ZW50Iiwid29yZHdyYXBwZXIiLCJXb3JkV3JhcHBlciIsInN1YnN0ciIsImdldFN0eWxlIiwibmV4dCIsImVuZCIsImNvbnRlbnRXaWR0aCIsImRpc3BhdGNoIiwiU0VMRUNUIiwidGltZXIiLCJDdXJzb3IiLCJpZCIsImF0IiwiaW5mbyIsImxlZnQiLCJ0b3AiLCJoZWlnaHQiLCJkZXNjZW50IiwiY2xlYXJJbnRlcnZhbCIsInNldEludGVydmFsIiwieTEiLCJub2RlIiwiZ2V0QXR0cmlidXRlIiwieTIiLCJzZXRBdHRyaWJ1dGUiLCJOT19DVVJTT1IiLCJzdGF0ZSIsInNlbGVjdGlvbiIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUVPLElBQU1BLDBCQUFPO0FBQ25CQyxLQUFJLFlBQUNDLFNBQUQsRUFBWUMsSUFBWixFQUFrQkMsS0FBbEI7QUFBQSxTQUEwQixvQkFBVTtBQUN2QyxPQUFNQyxVQUFRLDBCQUFXSCxTQUFYLENBQWQ7QUFDQSxPQUFNSSxPQUFLRCxRQUFRRSxVQUFSLEVBQVg7QUFDQSxPQUFNQyxjQUFZLElBQUksZUFBYUMsV0FBakIsQ0FBNkJILEtBQUtJLE1BQUwsQ0FBWVAsSUFBWixDQUE3QixFQUFnREUsUUFBUU0sUUFBUixFQUFoRCxDQUFsQjs7QUFIdUMsY0FJM0JILFlBQVlJLElBQVosQ0FBaUIsRUFBQ1IsWUFBRCxFQUFqQixLQUEyQixFQUFDUyxLQUFJLENBQUwsRUFBT0MsY0FBYSxDQUFwQixFQUpBO0FBQUEsT0FJaENELEdBSmdDLFFBSWhDQSxHQUpnQzs7QUFLdkNFLFlBQVMsa0JBQWlCQyxNQUFqQixDQUF3QmQsU0FBeEIsRUFBbUNDLE9BQUtVLEdBQXhDLENBQVQ7QUFDQSxHQU5HO0FBQUE7QUFEZSxDQUFiOztBQVVQLElBQUlJLGNBQUo7QUFDTyxJQUFNQywwQkFBTyxTQUFQQSxNQUFPLFFBQVc7QUFBQSxLQUFUQyxFQUFTLFNBQVRBLEVBQVM7QUFBQSxLQUFOQyxFQUFNLFNBQU5BLEVBQU07O0FBQzlCLEtBQUlDLE9BQUssRUFBQ0MsTUFBSyxDQUFOLEVBQVNDLEtBQUksQ0FBYixFQUFnQkMsUUFBTyxDQUF2QixFQUFUO0FBQ0EsS0FBR0wsRUFBSCxFQUFNO0FBQUEsOEJBQ2Usd0NBQXlCQSxFQUF6QixFQUE0QkMsRUFBNUIsQ0FEZjtBQUFBLE1BQ0FHLElBREEseUJBQ0FBLEdBREE7QUFBQSxNQUNJRCxLQURKLHlCQUNJQSxJQURKO0FBQUEsTUFDU25CLElBRFQseUJBQ1NBLElBRFQ7O0FBRUwsTUFBTUUsVUFBUSwwQkFBV2MsRUFBWCxDQUFkO0FBQ0EsTUFBTWIsT0FBS0QsUUFBUUUsVUFBUixFQUFYO0FBQ0EsTUFBSUMsY0FBWSxJQUFJLGVBQWFDLFdBQWpCLENBQTZCSCxLQUFLSSxNQUFMLENBQVlQLElBQVosRUFBaUJpQixFQUFqQixDQUE3QixFQUFtRGYsUUFBUU0sUUFBUixFQUFuRCxDQUFoQjs7QUFKSyxjQUttQkgsWUFBWUksSUFBWixDQUFpQixFQUFDUiwrQkFBRCxFQUFqQixLQUFtRCxFQUFDUyxLQUFJLENBQUwsRUFBT0MsY0FBYSxDQUFwQixFQUx0RTtBQUFBLE1BS0FELEdBTEEsU0FLQUEsR0FMQTtBQUFBLE1BS0tDLFlBTEwsU0FLS0EsWUFMTDs7QUFBQSxNQU1BVSxPQU5BLEdBTWlCaEIsV0FOakIsQ0FNQWdCLE1BTkE7QUFBQSxNQU1RQyxPQU5SLEdBTWlCakIsV0FOakIsQ0FNUWlCLE9BTlI7O0FBT0xILFdBQU1SLFlBQU47QUFDQU8sU0FBSyxFQUFDQyxXQUFELEVBQU9DLFNBQVAsRUFBWUMsZUFBWixFQUFMO0FBQ0E7QUFYNkIsYUFZTkgsSUFaTTtBQUFBLEtBWXpCRSxHQVp5QixTQVl6QkEsR0FaeUI7QUFBQSxLQVlwQkQsSUFab0IsU0FZcEJBLElBWm9CO0FBQUEsS0FZZEUsTUFaYyxTQVlkQSxNQVpjOztBQWE5QixRQUNDO0FBQ0MsTUFBSUYsSUFETDtBQUVDLE1BQUlDLEdBRkw7QUFHQyxNQUFJRCxJQUhMO0FBSUMsTUFBSUMsTUFBSUMsTUFKVDtBQUtDLGVBQWEsQ0FMZDtBQU1DLFVBQVEsT0FOVDtBQU9DLE9BQUssbUJBQU07QUFDVlAsWUFBU1MsY0FBY1QsS0FBZCxDQUFUO0FBQ0FBLFdBQU1VLFlBQVksYUFBRztBQUNwQixRQUFJQyxLQUFHQyxLQUFLQyxZQUFMLENBQWtCLElBQWxCLENBQVA7QUFBQSxRQUFnQ0MsS0FBR0YsS0FBS0MsWUFBTCxDQUFrQixJQUFsQixDQUFuQztBQUNBRCxTQUFLRyxZQUFMLENBQWtCLElBQWxCLEVBQXVCSixNQUFJRyxFQUFKLEdBQVNSLE1BQUlDLE1BQWIsR0FBc0JELEdBQTdDO0FBQ0EsSUFISyxFQUdILEdBSEcsQ0FBTjtBQUlBO0FBYkYsR0FERDtBQWlCQSxDQTlCTTs7QUFnQ1AsSUFBTVUsWUFBVSxFQUFoQjtrQkFDZSx5QkFBUSxpQkFBTztBQUFBLHdCQUNTQyxLQURULENBQ3RCQyxTQURzQjtBQUFBLDhDQUNYQyxLQURXO0FBQUEsS0FDSmpCLEVBREkseUJBQ0pBLEVBREk7QUFBQSxLQUNEQyxFQURDLHlCQUNEQSxFQURDO0FBQUEsS0FDR1AsR0FESCxvQkFDR0EsR0FESDs7QUFFN0IsS0FBR00sTUFBSSxDQUFQLEVBQ0MsT0FBT2MsU0FBUDtBQUNELEtBQUdwQixJQUFJTSxFQUFKLElBQVFBLEVBQVIsSUFBY04sSUFBSU8sRUFBSixJQUFRQSxFQUF6QixFQUNDLE9BQU9QLEdBQVAsQ0FERCxLQUdDLE9BQU9vQixTQUFQO0FBQ0QsQ0FSYyxFQVFaZixNQVJZLEMiLCJmaWxlIjoiY3Vyc29yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXG5pbXBvcnQgRWRpdGFibGVUZXh0IGZyb20gXCIuL3RleHRcIlxuaW1wb3J0IHtBQ1RJT04gYXMgU2VsZWN0aW9uX0FDVElPTn0gZnJvbSBcIi4vc2VsZWN0aW9uXCJcbmltcG9ydCB7Z2V0Q29udGVudCxnZXRDb250ZW50Q2xpZW50Qm91bmRCb3h9IGZyb20gXCIuL3NlbGVjdG9yXCJcblxuZXhwb3J0IGNvbnN0IEFDVElPTj17XG5cdEFUOiAoY29udGVudElkLCBmcm9tLCB3aWR0aCk9PmRpc3BhdGNoPT57XG5cdFx0Y29uc3QgY29udGVudD1nZXRDb250ZW50KGNvbnRlbnRJZClcblx0XHRjb25zdCB0ZXh0PWNvbnRlbnQuZ2V0Q29udGVudCgpXG5cdFx0Y29uc3Qgd29yZHdyYXBwZXI9bmV3IEVkaXRhYmxlVGV4dC5Xb3JkV3JhcHBlcih0ZXh0LnN1YnN0cihmcm9tKSwgY29udGVudC5nZXRTdHlsZSgpKVxuXHRcdGNvbnN0IHtlbmR9PXdvcmR3cmFwcGVyLm5leHQoe3dpZHRofSl8fHtlbmQ6MCxjb250ZW50V2lkdGg6MH1cblx0XHRkaXNwYXRjaChTZWxlY3Rpb25fQUNUSU9OLlNFTEVDVChjb250ZW50SWQsIGZyb20rZW5kKSlcblx0fVxufVxuXG5sZXQgdGltZXJcbmV4cG9ydCBjb25zdCBDdXJzb3I9KHtpZCxhdH0pPT57XG5cdGxldCBpbmZvPXtsZWZ0OjAsIHRvcDowLCBoZWlnaHQ6MH1cblx0aWYoaWQpe1xuXHRcdGxldCB7dG9wLGxlZnQsZnJvbX09Z2V0Q29udGVudENsaWVudEJvdW5kQm94KGlkLGF0KVxuXHRcdGNvbnN0IGNvbnRlbnQ9Z2V0Q29udGVudChpZClcblx0XHRjb25zdCB0ZXh0PWNvbnRlbnQuZ2V0Q29udGVudCgpXG5cdFx0bGV0IHdvcmR3cmFwcGVyPW5ldyBFZGl0YWJsZVRleHQuV29yZFdyYXBwZXIodGV4dC5zdWJzdHIoZnJvbSxhdCksIGNvbnRlbnQuZ2V0U3R5bGUoKSlcblx0XHRsZXQge2VuZCwgY29udGVudFdpZHRofT13b3Jkd3JhcHBlci5uZXh0KHt3aWR0aDpOdW1iZXIuTUFYX1NBRkVfSU5URUdFUn0pfHx7ZW5kOjAsY29udGVudFdpZHRoOjB9XG5cdFx0bGV0IHtoZWlnaHQsIGRlc2NlbnR9PXdvcmR3cmFwcGVyXG5cdFx0bGVmdCs9Y29udGVudFdpZHRoXG5cdFx0aW5mbz17bGVmdCwgdG9wLCBoZWlnaHR9XG5cdH1cblx0bGV0IHt0b3AsIGxlZnQsIGhlaWdodH09aW5mb1xuXHRyZXR1cm4gKFxuXHRcdDxsaW5lXG5cdFx0XHR4MT17bGVmdH1cblx0XHRcdHkxPXt0b3B9XG5cdFx0XHR4Mj17bGVmdH1cblx0XHRcdHkyPXt0b3AraGVpZ2h0fVxuXHRcdFx0c3Ryb2tlV2lkdGg9ezF9XG5cdFx0XHRzdHJva2U9e1wiYmxhY2tcIn1cblx0XHRcdHJlZj17bm9kZT0+e1xuXHRcdFx0XHR0aW1lciAmJiBjbGVhckludGVydmFsKHRpbWVyKTtcblx0XHRcdFx0dGltZXI9c2V0SW50ZXJ2YWwoYT0+e1xuXHRcdFx0XHRcdGxldCB5MT1ub2RlLmdldEF0dHJpYnV0ZSgneTEnKSwgeTI9bm9kZS5nZXRBdHRyaWJ1dGUoJ3kyJylcblx0XHRcdFx0XHRub2RlLnNldEF0dHJpYnV0ZSgneTInLHkxPT15MiA/IHRvcCtoZWlnaHQgOiB0b3ApXG5cdFx0XHRcdH0sIDcwMClcblx0XHRcdH19XG5cdFx0XHQvPlxuXHQpXG59XG5cbmNvbnN0IE5PX0NVUlNPUj17fVxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChzdGF0ZT0+e1xuXHRjb25zdCB7c2VsZWN0aW9uOntzdGFydDp7aWQsYXR9LGVuZH19PXN0YXRlXG5cdGlmKGlkPT0wKVxuXHRcdHJldHVybiBOT19DVVJTT1Jcblx0aWYoZW5kLmlkPT1pZCAmJiBlbmQuYXQ9PWF0KVxuXHRcdHJldHVybiBlbmRcblx0ZWxzZVxuXHRcdHJldHVybiBOT19DVVJTT1Jcbn0pKEN1cnNvcilcbiJdfQ==