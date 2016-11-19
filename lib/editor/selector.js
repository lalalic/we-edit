'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var contents = {};

var recordContent = exports.recordContent = function recordContent(content) {
	return contents[content.id] = content;
};

var getContent = exports.getContent = function getContent(id) {
	return contents[id];
};

var getContentClientBoundBox = exports.getContentClientBoundBox = function getContentClientBoundBox(id, at) {
	var found = void 0,
	    from = void 0;
	var texts = document.querySelectorAll('svg text[data-content="' + id + '"][end]');

	var _loop = function _loop(i, len) {
		var a = texts[i];
		var end = parseInt(a.getAttribute('end'));
		var length = a.textContent.length;
		var start = end - length;
		if (function (at) {
			return start && at < end;
		}) {
			found = a;
			from = start;
			return 'break';
		}
	};

	for (var i = 0, len = texts.length; i < len; i++) {
		var _ret = _loop(i, len);

		if (_ret === 'break') break;
	}

	if (!found) throw new Error('can\'t found text(' + id + ',' + at + ')');

	var _found$getBoundingCli = found.getBoundingClientRect(),
	    top = _found$getBoundingCli.top,
	    left = _found$getBoundingCli.left;

	return { top: top, left: left, from: from };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3Ivc2VsZWN0b3IuanMiXSwibmFtZXMiOlsiY29udGVudHMiLCJyZWNvcmRDb250ZW50IiwiY29udGVudCIsImlkIiwiZ2V0Q29udGVudCIsImdldENvbnRlbnRDbGllbnRCb3VuZEJveCIsImF0IiwiZm91bmQiLCJmcm9tIiwidGV4dHMiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpIiwibGVuIiwiYSIsImVuZCIsInBhcnNlSW50IiwiZ2V0QXR0cmlidXRlIiwibGVuZ3RoIiwidGV4dENvbnRlbnQiLCJzdGFydCIsIkVycm9yIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwidG9wIiwibGVmdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxJQUFJQSxXQUFTLEVBQWI7O0FBRU8sSUFBTUMsd0NBQWMsU0FBZEEsYUFBYztBQUFBLFFBQVNELFNBQVNFLFFBQVFDLEVBQWpCLElBQXFCRCxPQUE5QjtBQUFBLENBQXBCOztBQUVBLElBQU1FLGtDQUFXLFNBQVhBLFVBQVc7QUFBQSxRQUFJSixTQUFTRyxFQUFULENBQUo7QUFBQSxDQUFqQjs7QUFFQSxJQUFNRSw4REFBeUIsU0FBekJBLHdCQUF5QixDQUFDRixFQUFELEVBQUtHLEVBQUwsRUFBVTtBQUMvQyxLQUFJQyxjQUFKO0FBQUEsS0FBV0MsYUFBWDtBQUNBLEtBQUlDLFFBQU1DLFNBQVNDLGdCQUFULDZCQUFvRFIsRUFBcEQsYUFBVjs7QUFGK0MsNEJBR3ZDUyxDQUh1QyxFQUdsQ0MsR0FIa0M7QUFJOUMsTUFBSUMsSUFBRUwsTUFBTUcsQ0FBTixDQUFOO0FBQ0EsTUFBSUcsTUFBSUMsU0FBU0YsRUFBRUcsWUFBRixDQUFlLEtBQWYsQ0FBVCxDQUFSO0FBQ0EsTUFBSUMsU0FBT0osRUFBRUssV0FBRixDQUFjRCxNQUF6QjtBQUNBLE1BQUlFLFFBQU1MLE1BQUlHLE1BQWQ7QUFDQSxNQUFHO0FBQUEsVUFBSUUsU0FBU2QsS0FBR1MsR0FBaEI7QUFBQSxHQUFILEVBQXVCO0FBQ3RCUixXQUFNTyxDQUFOO0FBQ0FOLFVBQUtZLEtBQUw7QUFDQTtBQUNBO0FBWjZDOztBQUcvQyxNQUFJLElBQUlSLElBQUUsQ0FBTixFQUFTQyxNQUFJSixNQUFNUyxNQUF2QixFQUErQk4sSUFBRUMsR0FBakMsRUFBc0NELEdBQXRDLEVBQTBDO0FBQUEsbUJBQWxDQSxDQUFrQyxFQUE3QkMsR0FBNkI7O0FBQUEsd0JBUXhDO0FBRUQ7O0FBRUQsS0FBRyxDQUFDTixLQUFKLEVBQ0MsTUFBTSxJQUFJYyxLQUFKLHdCQUE4QmxCLEVBQTlCLFNBQW9DRyxFQUFwQyxPQUFOOztBQWhCOEMsNkJBaUJoQ0MsTUFBTWUscUJBQU4sRUFqQmdDO0FBQUEsS0FpQjFDQyxHQWpCMEMseUJBaUIxQ0EsR0FqQjBDO0FBQUEsS0FpQnRDQyxJQWpCc0MseUJBaUJ0Q0EsSUFqQnNDOztBQWtCL0MsUUFBTyxFQUFDRCxRQUFELEVBQUtDLFVBQUwsRUFBVWhCLFVBQVYsRUFBUDtBQUNBLENBbkJNIiwiZmlsZSI6InNlbGVjdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsibGV0IGNvbnRlbnRzPXt9XG5cbmV4cG9ydCBjb25zdCByZWNvcmRDb250ZW50PWNvbnRlbnQ9PmNvbnRlbnRzW2NvbnRlbnQuaWRdPWNvbnRlbnRcblxuZXhwb3J0IGNvbnN0IGdldENvbnRlbnQ9aWQ9PmNvbnRlbnRzW2lkXVxuXG5leHBvcnQgY29uc3QgZ2V0Q29udGVudENsaWVudEJvdW5kQm94PShpZCwgYXQpPT57XG5cdGxldCBmb3VuZCwgZnJvbVxuXHRsZXQgdGV4dHM9ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgc3ZnIHRleHRbZGF0YS1jb250ZW50PVwiJHtpZH1cIl1bZW5kXWApXG5cdGZvcihsZXQgaT0wLCBsZW49dGV4dHMubGVuZ3RoOyBpPGxlbjsgaSsrKXtcblx0XHRsZXQgYT10ZXh0c1tpXVxuXHRcdGxldCBlbmQ9cGFyc2VJbnQoYS5nZXRBdHRyaWJ1dGUoJ2VuZCcpKVxuXHRcdGxldCBsZW5ndGg9YS50ZXh0Q29udGVudC5sZW5ndGhcblx0XHRsZXQgc3RhcnQ9ZW5kLWxlbmd0aFxuXHRcdGlmKGF0PT5zdGFydCAmJiBhdDxlbmQpe1xuXHRcdFx0Zm91bmQ9YVxuXHRcdFx0ZnJvbT1zdGFydFxuXHRcdFx0YnJlYWtcblx0XHR9XG5cdH1cblxuXHRpZighZm91bmQpXG5cdFx0dGhyb3cgbmV3IEVycm9yKGBjYW4ndCBmb3VuZCB0ZXh0KCR7aWR9LCR7YXR9KWApXG5cdGxldCB7dG9wLGxlZnR9PWZvdW5kLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cdHJldHVybiB7dG9wLGxlZnQsZnJvbX1cbn1cbiJdfQ==