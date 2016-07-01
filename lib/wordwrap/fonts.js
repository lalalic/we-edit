"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var fonts = {};

exports.default = {
	get: function get(name) {
		if (!fonts[name]) {
			return fonts[name] = loadFont(name);
		}
	}
};


function loadFont(name) {
	return {
		metrics: function metrics(word) {
			return { width: 0, height: 0, glyphs: [] };
		}
	};
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93b3Jkd3JhcC9mb250cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLElBQUksUUFBTSxFQUFOOztrQkFFVztBQUNYLG1CQUFJLE1BQUs7QUFDWCxNQUFHLENBQUMsTUFBTSxJQUFOLENBQUQsRUFBYTtBQUNmLFVBQU8sTUFBTSxJQUFOLElBQVksU0FBUyxJQUFULENBQVosQ0FEUTtHQUFoQjtFQUZhOzs7O0FBUWYsU0FBUyxRQUFULENBQWtCLElBQWxCLEVBQXVCO0FBQ3RCLFFBQU87QUFDTiw0QkFBUSxNQUFLO0FBQ1osVUFBTyxFQUFDLE9BQU0sQ0FBTixFQUFTLFFBQU8sQ0FBUCxFQUFVLFFBQU8sRUFBUCxFQUEzQixDQURZO0dBRFA7RUFBUCxDQURzQjtDQUF2QiIsImZpbGUiOiJmb250cy5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBmb250cz17fVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZ2V0KG5hbWUpe1xuXHRcdGlmKCFmb250c1tuYW1lXSl7XG5cdFx0XHRyZXR1cm4gZm9udHNbbmFtZV09bG9hZEZvbnQobmFtZSlcblx0XHR9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBsb2FkRm9udChuYW1lKXtcblx0cmV0dXJuIHtcblx0XHRtZXRyaWNzKHdvcmQpe1xuXHRcdFx0cmV0dXJuIHt3aWR0aDowLCBoZWlnaHQ6MCwgZ2x5cGhzOltdfVxuXHRcdH1cblx0fVxufVxuIl19