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
		var wordwrapper = new _text2.default.WordWrapper(text.substring(from, at), content.getStyle());

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvY3Vyc29yLmpzIl0sIm5hbWVzIjpbIkFDVElPTiIsIkFUIiwiY29udGVudElkIiwiZnJvbSIsIndpZHRoIiwiY29udGVudCIsInRleHQiLCJnZXRDb250ZW50Iiwid29yZHdyYXBwZXIiLCJXb3JkV3JhcHBlciIsInN1YnN0ciIsImdldFN0eWxlIiwibmV4dCIsImVuZCIsImNvbnRlbnRXaWR0aCIsImRpc3BhdGNoIiwiU0VMRUNUIiwidGltZXIiLCJDdXJzb3IiLCJpZCIsImF0IiwiaW5mbyIsImxlZnQiLCJ0b3AiLCJoZWlnaHQiLCJzdWJzdHJpbmciLCJkZXNjZW50IiwiY2xlYXJJbnRlcnZhbCIsInNldEludGVydmFsIiwieTEiLCJub2RlIiwiZ2V0QXR0cmlidXRlIiwieTIiLCJzZXRBdHRyaWJ1dGUiLCJOT19DVVJTT1IiLCJzdGF0ZSIsInNlbGVjdGlvbiIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUVPLElBQU1BLDBCQUFPO0FBQ25CQyxLQUFJLFlBQUNDLFNBQUQsRUFBWUMsSUFBWixFQUFrQkMsS0FBbEI7QUFBQSxTQUEwQixvQkFBVTtBQUN2QyxPQUFNQyxVQUFRLDBCQUFXSCxTQUFYLENBQWQ7QUFDQSxPQUFNSSxPQUFLRCxRQUFRRSxVQUFSLEVBQVg7QUFDQSxPQUFNQyxjQUFZLElBQUksZUFBYUMsV0FBakIsQ0FBNkJILEtBQUtJLE1BQUwsQ0FBWVAsSUFBWixDQUE3QixFQUFnREUsUUFBUU0sUUFBUixFQUFoRCxDQUFsQjs7QUFIdUMsY0FJM0JILFlBQVlJLElBQVosQ0FBaUIsRUFBQ1IsWUFBRCxFQUFqQixLQUEyQixFQUFDUyxLQUFJLENBQUwsRUFBT0MsY0FBYSxDQUFwQixFQUpBO0FBQUEsT0FJaENELEdBSmdDLFFBSWhDQSxHQUpnQzs7QUFLdkNFLFlBQVMsa0JBQWlCQyxNQUFqQixDQUF3QmQsU0FBeEIsRUFBbUNDLE9BQUtVLEdBQXhDLENBQVQ7QUFDQSxHQU5HO0FBQUE7QUFEZSxDQUFiOztBQVVQLElBQUlJLGNBQUo7QUFDTyxJQUFNQywwQkFBTyxTQUFQQSxNQUFPLFFBQVc7QUFBQSxLQUFUQyxFQUFTLFNBQVRBLEVBQVM7QUFBQSxLQUFOQyxFQUFNLFNBQU5BLEVBQU07O0FBQzlCLEtBQUlDLE9BQUssRUFBQ0MsTUFBSyxDQUFOLEVBQVNDLEtBQUksQ0FBYixFQUFnQkMsUUFBTyxDQUF2QixFQUFUO0FBQ0EsS0FBR0wsRUFBSCxFQUFNO0FBQUEsOEJBQ2Usd0NBQXlCQSxFQUF6QixFQUE0QkMsRUFBNUIsQ0FEZjtBQUFBLE1BQ0FHLElBREEseUJBQ0FBLEdBREE7QUFBQSxNQUNJRCxLQURKLHlCQUNJQSxJQURKO0FBQUEsTUFDU25CLElBRFQseUJBQ1NBLElBRFQ7O0FBRUwsTUFBTUUsVUFBUSwwQkFBV2MsRUFBWCxDQUFkO0FBQ0EsTUFBTWIsT0FBS0QsUUFBUUUsVUFBUixFQUFYO0FBQ0EsTUFBSUMsY0FBWSxJQUFJLGVBQWFDLFdBQWpCLENBQTZCSCxLQUFLbUIsU0FBTCxDQUFldEIsSUFBZixFQUFvQmlCLEVBQXBCLENBQTdCLEVBQXNEZixRQUFRTSxRQUFSLEVBQXRELENBQWhCOztBQUpLLGNBS21CSCxZQUFZSSxJQUFaLENBQWlCLEVBQUNSLCtCQUFELEVBQWpCLEtBQW1ELEVBQUNTLEtBQUksQ0FBTCxFQUFPQyxjQUFhLENBQXBCLEVBTHRFO0FBQUEsTUFLQUQsR0FMQSxTQUtBQSxHQUxBO0FBQUEsTUFLS0MsWUFMTCxTQUtLQSxZQUxMOztBQUFBLE1BTUFVLE9BTkEsR0FNaUJoQixXQU5qQixDQU1BZ0IsTUFOQTtBQUFBLE1BTVFFLE9BTlIsR0FNaUJsQixXQU5qQixDQU1Ra0IsT0FOUjs7QUFPTEosV0FBTVIsWUFBTjtBQUNBTyxTQUFLLEVBQUNDLFdBQUQsRUFBT0MsU0FBUCxFQUFZQyxlQUFaLEVBQUw7QUFDQTtBQVg2QixhQVlOSCxJQVpNO0FBQUEsS0FZekJFLEdBWnlCLFNBWXpCQSxHQVp5QjtBQUFBLEtBWXBCRCxJQVpvQixTQVlwQkEsSUFab0I7QUFBQSxLQVlkRSxNQVpjLFNBWWRBLE1BWmM7O0FBYTlCLFFBQ0M7QUFDQyxNQUFJRixJQURMO0FBRUMsTUFBSUMsR0FGTDtBQUdDLE1BQUlELElBSEw7QUFJQyxNQUFJQyxNQUFJQyxNQUpUO0FBS0MsZUFBYSxDQUxkO0FBTUMsVUFBUSxPQU5UO0FBT0MsT0FBSyxtQkFBTTtBQUNWUCxZQUFTVSxjQUFjVixLQUFkLENBQVQ7QUFDQUEsV0FBTVcsWUFBWSxhQUFHO0FBQ3BCLFFBQUlDLEtBQUdDLEtBQUtDLFlBQUwsQ0FBa0IsSUFBbEIsQ0FBUDtBQUFBLFFBQWdDQyxLQUFHRixLQUFLQyxZQUFMLENBQWtCLElBQWxCLENBQW5DO0FBQ0FELFNBQUtHLFlBQUwsQ0FBa0IsSUFBbEIsRUFBdUJKLE1BQUlHLEVBQUosR0FBU1QsTUFBSUMsTUFBYixHQUFzQkQsR0FBN0M7QUFDQSxJQUhLLEVBR0gsR0FIRyxDQUFOO0FBSUE7QUFiRixHQUREO0FBaUJBLENBOUJNOztBQWdDUCxJQUFNVyxZQUFVLEVBQWhCO2tCQUNlLHlCQUFRLGlCQUFPO0FBQUEsd0JBQ1NDLEtBRFQsQ0FDdEJDLFNBRHNCO0FBQUEsOENBQ1hDLEtBRFc7QUFBQSxLQUNKbEIsRUFESSx5QkFDSkEsRUFESTtBQUFBLEtBQ0RDLEVBREMseUJBQ0RBLEVBREM7QUFBQSxLQUNHUCxHQURILG9CQUNHQSxHQURIOztBQUU3QixLQUFHTSxNQUFJLENBQVAsRUFDQyxPQUFPZSxTQUFQO0FBQ0QsS0FBR3JCLElBQUlNLEVBQUosSUFBUUEsRUFBUixJQUFjTixJQUFJTyxFQUFKLElBQVFBLEVBQXpCLEVBQ0MsT0FBT1AsR0FBUCxDQURELEtBR0MsT0FBT3FCLFNBQVA7QUFDRCxDQVJjLEVBUVpoQixNQVJZLEMiLCJmaWxlIjoiY3Vyc29yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcclxuaW1wb3J0IEVkaXRhYmxlVGV4dCBmcm9tIFwiLi90ZXh0XCJcclxuaW1wb3J0IHtBQ1RJT04gYXMgU2VsZWN0aW9uX0FDVElPTn0gZnJvbSBcIi4vc2VsZWN0aW9uXCJcclxuaW1wb3J0IHtnZXRDb250ZW50LGdldENvbnRlbnRDbGllbnRCb3VuZEJveH0gZnJvbSBcIi4vc2VsZWN0b3JcIlxyXG5cclxuZXhwb3J0IGNvbnN0IEFDVElPTj17XHJcblx0QVQ6IChjb250ZW50SWQsIGZyb20sIHdpZHRoKT0+ZGlzcGF0Y2g9PntcclxuXHRcdGNvbnN0IGNvbnRlbnQ9Z2V0Q29udGVudChjb250ZW50SWQpXHJcblx0XHRjb25zdCB0ZXh0PWNvbnRlbnQuZ2V0Q29udGVudCgpXHJcblx0XHRjb25zdCB3b3Jkd3JhcHBlcj1uZXcgRWRpdGFibGVUZXh0LldvcmRXcmFwcGVyKHRleHQuc3Vic3RyKGZyb20pLCBjb250ZW50LmdldFN0eWxlKCkpXHJcblx0XHRjb25zdCB7ZW5kfT13b3Jkd3JhcHBlci5uZXh0KHt3aWR0aH0pfHx7ZW5kOjAsY29udGVudFdpZHRoOjB9XHJcblx0XHRkaXNwYXRjaChTZWxlY3Rpb25fQUNUSU9OLlNFTEVDVChjb250ZW50SWQsIGZyb20rZW5kKSlcclxuXHR9XHJcbn1cclxuXHJcbmxldCB0aW1lclxyXG5leHBvcnQgY29uc3QgQ3Vyc29yPSh7aWQsYXR9KT0+e1xyXG5cdGxldCBpbmZvPXtsZWZ0OjAsIHRvcDowLCBoZWlnaHQ6MH1cclxuXHRpZihpZCl7XHJcblx0XHRsZXQge3RvcCxsZWZ0LGZyb219PWdldENvbnRlbnRDbGllbnRCb3VuZEJveChpZCxhdClcclxuXHRcdGNvbnN0IGNvbnRlbnQ9Z2V0Q29udGVudChpZClcclxuXHRcdGNvbnN0IHRleHQ9Y29udGVudC5nZXRDb250ZW50KClcclxuXHRcdGxldCB3b3Jkd3JhcHBlcj1uZXcgRWRpdGFibGVUZXh0LldvcmRXcmFwcGVyKHRleHQuc3Vic3RyaW5nKGZyb20sYXQpLCBjb250ZW50LmdldFN0eWxlKCkpXHJcblx0XHRsZXQge2VuZCwgY29udGVudFdpZHRofT13b3Jkd3JhcHBlci5uZXh0KHt3aWR0aDpOdW1iZXIuTUFYX1NBRkVfSU5URUdFUn0pfHx7ZW5kOjAsY29udGVudFdpZHRoOjB9XHJcblx0XHRsZXQge2hlaWdodCwgZGVzY2VudH09d29yZHdyYXBwZXJcclxuXHRcdGxlZnQrPWNvbnRlbnRXaWR0aFxyXG5cdFx0aW5mbz17bGVmdCwgdG9wLCBoZWlnaHR9XHJcblx0fVxyXG5cdGxldCB7dG9wLCBsZWZ0LCBoZWlnaHR9PWluZm9cclxuXHRyZXR1cm4gKFxyXG5cdFx0PGxpbmVcclxuXHRcdFx0eDE9e2xlZnR9XHJcblx0XHRcdHkxPXt0b3B9XHJcblx0XHRcdHgyPXtsZWZ0fVxyXG5cdFx0XHR5Mj17dG9wK2hlaWdodH1cclxuXHRcdFx0c3Ryb2tlV2lkdGg9ezF9XHJcblx0XHRcdHN0cm9rZT17XCJibGFja1wifVxyXG5cdFx0XHRyZWY9e25vZGU9PntcclxuXHRcdFx0XHR0aW1lciAmJiBjbGVhckludGVydmFsKHRpbWVyKTtcclxuXHRcdFx0XHR0aW1lcj1zZXRJbnRlcnZhbChhPT57XHJcblx0XHRcdFx0XHRsZXQgeTE9bm9kZS5nZXRBdHRyaWJ1dGUoJ3kxJyksIHkyPW5vZGUuZ2V0QXR0cmlidXRlKCd5MicpXHJcblx0XHRcdFx0XHRub2RlLnNldEF0dHJpYnV0ZSgneTInLHkxPT15MiA/IHRvcCtoZWlnaHQgOiB0b3ApXHJcblx0XHRcdFx0fSwgNzAwKVxyXG5cdFx0XHR9fVxyXG5cdFx0XHQvPlxyXG5cdClcclxufVxyXG5cclxuY29uc3QgTk9fQ1VSU09SPXt9XHJcbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3Qoc3RhdGU9PntcclxuXHRjb25zdCB7c2VsZWN0aW9uOntzdGFydDp7aWQsYXR9LGVuZH19PXN0YXRlXHJcblx0aWYoaWQ9PTApXHJcblx0XHRyZXR1cm4gTk9fQ1VSU09SXHJcblx0aWYoZW5kLmlkPT1pZCAmJiBlbmQuYXQ9PWF0KVxyXG5cdFx0cmV0dXJuIGVuZFxyXG5cdGVsc2VcclxuXHRcdHJldHVybiBOT19DVVJTT1JcclxufSkoQ3Vyc29yKVxyXG4iXX0=