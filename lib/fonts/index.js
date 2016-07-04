"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.loadFont = loadFont;

var _ttfjs = require("ttfjs");

var _ttfjs2 = _interopRequireDefault(_ttfjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fonts = {};

exports.default = {
	get: function get(name) {
		name = name.toLowerCase();
		if (fonts[name]) {
			return fonts[name];
		} else {
			throw new Error(name + " not exists");
		}
	}
};
function loadFont(loader) {
	return new Promise(function (resolve, reject) {
		var loaded = [],
		    files = loader.files;

		var _loop = function _loop(i, _file, len) {
			_file = files[i];
			loaded.push(new Promise(function (resolve, reject) {
				var name = _file.name;
				var reader = new FileReader();
				reader.onload = function (e) {
					try {
						var data = reader.result;
						var id = name.split(".")[0].toLowerCase();
						fonts[id] = new _ttfjs2.default(data);
						console.log(name + " font loaded");
						resolve(fonts[id]);
					} catch (e) {
						console.error(name + " font loaded fail with error: " + e.message);
						resolve();
					}
				};

				reader.onerror = function (e) {
					return resolve();
				};
				reader.readAsArrayBuffer(_file);
			}));
			file = _file;
		};

		for (var i = 0, file, len = files.length; i < len; i++) {
			_loop(i, file, len);
		}
		loader.value = "";
		Promise.all(loaded).then(resolve, reject);
	});
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mb250cy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztRQWVnQjs7QUFmaEI7Ozs7OztBQUVBLElBQUksUUFBTSxFQUFOOztrQkFFVztBQUNYLG1CQUFJLE1BQUs7QUFDWCxTQUFLLEtBQUssV0FBTCxFQUFMLENBRFc7QUFFWCxNQUFHLE1BQU0sSUFBTixDQUFILEVBQWU7QUFDZCxVQUFPLE1BQU0sSUFBTixDQUFQLENBRGM7R0FBZixNQUVLO0FBQ0ssU0FBTSxJQUFJLEtBQUosQ0FBYSxvQkFBYixDQUFOLENBREw7R0FGTDtFQUhhOztBQVdSLFNBQVMsUUFBVCxDQUFrQixNQUFsQixFQUF5QjtBQUM1QixRQUFPLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFVLE1BQVYsRUFBbUI7QUFDeEMsTUFBSSxTQUFPLEVBQVA7TUFBVyxRQUFNLE9BQU8sS0FBUCxDQURtQjs7NkJBRWhDLFVBQVc7QUFDbEIsV0FBSyxNQUFNLENBQU4sQ0FBTDtBQUNBLFVBQU8sSUFBUCxDQUFZLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFVLE1BQVYsRUFBbUI7QUFDMUMsUUFBSSxPQUFLLE1BQUssSUFBTCxDQURpQztBQUUxQyxRQUFJLFNBQU8sSUFBSSxVQUFKLEVBQVAsQ0FGc0M7QUFHMUMsV0FBTyxNQUFQLEdBQWMsYUFBRztBQUNoQixTQUFHO0FBQ0YsVUFBSSxPQUFLLE9BQU8sTUFBUCxDQURQO0FBRUYsVUFBSSxLQUFHLEtBQUssS0FBTCxDQUFXLEdBQVgsRUFBZ0IsQ0FBaEIsRUFBbUIsV0FBbkIsRUFBSCxDQUZGO0FBR0YsWUFBTSxFQUFOLElBQVUsb0JBQVksSUFBWixDQUFWLENBSEU7QUFJRixjQUFRLEdBQVIsQ0FBZSxxQkFBZixFQUpFO0FBS0YsY0FBUSxNQUFNLEVBQU4sQ0FBUixFQUxFO01BQUgsQ0FNQyxPQUFNLENBQU4sRUFBUTtBQUNSLGNBQVEsS0FBUixDQUFpQiwwQ0FBcUMsRUFBRSxPQUFGLENBQXRELENBRFE7QUFFUixnQkFGUTtNQUFSO0tBUFksQ0FINEI7O0FBZ0IxQyxXQUFPLE9BQVAsR0FBZTtZQUFHO0tBQUgsQ0FoQjJCO0FBaUIxQyxXQUFPLGlCQUFQLENBQXlCLEtBQXpCLEVBakIwQztJQUFuQixDQUF4QjtBQUZZO0lBRjJCOztBQUV4QyxPQUFJLElBQUksSUFBRSxDQUFGLEVBQUssSUFBVCxFQUFlLE1BQUksTUFBTSxNQUFOLEVBQWEsSUFBRSxHQUFGLEVBQU0sR0FBMUMsRUFBOEM7U0FBdEMsR0FBSyxNQUFNLEtBQTJCO0dBQTlDO0FBc0JBLFNBQU8sS0FBUCxHQUFhLEVBQWIsQ0F4QndDO0FBeUJ4QyxVQUFRLEdBQVIsQ0FBWSxNQUFaLEVBQW9CLElBQXBCLENBQXlCLE9BQXpCLEVBQWtDLE1BQWxDLEVBekJ3QztFQUFuQixDQUFuQixDQUQ0QjtDQUF6QiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUVEZGb250IGZyb20gXCJ0dGZqc1wiXG5cbnZhciBmb250cz17fVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZ2V0KG5hbWUpe1xuXHRcdG5hbWU9bmFtZS50b0xvd2VyQ2FzZSgpXG5cdFx0aWYoZm9udHNbbmFtZV0pe1xuXHRcdFx0cmV0dXJuIGZvbnRzW25hbWVdXG5cdFx0fWVsc2V7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7bmFtZX0gbm90IGV4aXN0c2ApXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkRm9udChsb2FkZXIpe1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuXHRcdGxldCBsb2FkZWQ9W10sIGZpbGVzPWxvYWRlci5maWxlc1xuXHRcdGZvcihsZXQgaT0wLCBmaWxlLCBsZW49ZmlsZXMubGVuZ3RoO2k8bGVuO2krKyl7XG5cdFx0XHRmaWxlPWZpbGVzW2ldXG5cdFx0XHRsb2FkZWQucHVzaChuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuXHRcdFx0XHRsZXQgbmFtZT1maWxlLm5hbWVcblx0XHRcdFx0bGV0IHJlYWRlcj1uZXcgRmlsZVJlYWRlcigpXG5cdFx0XHRcdHJlYWRlci5vbmxvYWQ9ZT0+e1xuXHRcdFx0XHRcdHRyeXtcblx0XHRcdFx0XHRcdGxldCBkYXRhPXJlYWRlci5yZXN1bHRcblx0XHRcdFx0XHRcdGxldCBpZD1uYW1lLnNwbGl0KFwiLlwiKVswXS50b0xvd2VyQ2FzZSgpXG5cdFx0XHRcdFx0XHRmb250c1tpZF09bmV3IFRURkZvbnQoZGF0YSlcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKGAke25hbWV9IGZvbnQgbG9hZGVkYClcblx0XHRcdFx0XHRcdHJlc29sdmUoZm9udHNbaWRdKVxuXHRcdFx0XHRcdH1jYXRjaChlKXtcblx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoYCR7bmFtZX0gZm9udCBsb2FkZWQgZmFpbCB3aXRoIGVycm9yOiAke2UubWVzc2FnZX1gKVxuXHRcdFx0XHRcdFx0cmVzb2x2ZSgpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHRyZWFkZXIub25lcnJvcj1lPT5yZXNvbHZlKClcblx0XHRcdFx0cmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGZpbGUpXG5cdFx0XHR9KSlcblx0XHR9XG5cdFx0bG9hZGVyLnZhbHVlPVwiXCJcblx0XHRQcm9taXNlLmFsbChsb2FkZWQpLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KVx0XG5cdH0pXG59XG4iXX0=