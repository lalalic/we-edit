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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mb250cy9pbmRleC5qcyJdLCJuYW1lcyI6WyJsb2FkRm9udCIsImZvbnRzIiwiZ2V0IiwibmFtZSIsInRvTG93ZXJDYXNlIiwiRXJyb3IiLCJsb2FkZXIiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImxvYWRlZCIsImZpbGVzIiwiaSIsImxlbiIsImZpbGUiLCJwdXNoIiwicmVhZGVyIiwiRmlsZVJlYWRlciIsIm9ubG9hZCIsImRhdGEiLCJyZXN1bHQiLCJpZCIsInNwbGl0IiwiY29uc29sZSIsImxvZyIsImUiLCJlcnJvciIsIm1lc3NhZ2UiLCJvbmVycm9yIiwicmVhZEFzQXJyYXlCdWZmZXIiLCJsZW5ndGgiLCJ2YWx1ZSIsImFsbCIsInRoZW4iXSwibWFwcGluZ3MiOiI7Ozs7O1FBZWdCQSxRLEdBQUFBLFE7O0FBZmhCOzs7Ozs7QUFFQSxJQUFJQyxRQUFNLEVBQVY7O2tCQUVlO0FBQ1hDLElBRFcsZUFDUEMsSUFETyxFQUNGO0FBQ1hBLFNBQUtBLEtBQUtDLFdBQUwsRUFBTDtBQUNBLE1BQUdILE1BQU1FLElBQU4sQ0FBSCxFQUFlO0FBQ2QsVUFBT0YsTUFBTUUsSUFBTixDQUFQO0FBQ0EsR0FGRCxNQUVLO0FBQ0ssU0FBTSxJQUFJRSxLQUFKLENBQWFGLElBQWIsaUJBQU47QUFDSDtBQUNKO0FBUlUsQztBQVdSLFNBQVNILFFBQVQsQ0FBa0JNLE1BQWxCLEVBQXlCO0FBQzVCLFFBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFtQjtBQUN4QyxNQUFJQyxTQUFPLEVBQVg7QUFBQSxNQUFlQyxRQUFNTCxPQUFPSyxLQUE1Qjs7QUFEd0MsNkJBRWhDQyxDQUZnQyxTQUVyQkMsR0FGcUI7QUFHdkNDLFdBQUtILE1BQU1DLENBQU4sQ0FBTDtBQUNBRixVQUFPSyxJQUFQLENBQVksSUFBSVIsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFtQjtBQUMxQyxRQUFJTixPQUFLVyxNQUFLWCxJQUFkO0FBQ0EsUUFBSWEsU0FBTyxJQUFJQyxVQUFKLEVBQVg7QUFDQUQsV0FBT0UsTUFBUCxHQUFjLGFBQUc7QUFDaEIsU0FBRztBQUNGLFVBQUlDLE9BQUtILE9BQU9JLE1BQWhCO0FBQ0EsVUFBSUMsS0FBR2xCLEtBQUttQixLQUFMLENBQVcsR0FBWCxFQUFnQixDQUFoQixFQUFtQmxCLFdBQW5CLEVBQVA7QUFDQUgsWUFBTW9CLEVBQU4sSUFBVSxvQkFBWUYsSUFBWixDQUFWO0FBQ0FJLGNBQVFDLEdBQVIsQ0FBZXJCLElBQWY7QUFDQUssY0FBUVAsTUFBTW9CLEVBQU4sQ0FBUjtBQUNBLE1BTkQsQ0FNQyxPQUFNSSxDQUFOLEVBQVE7QUFDUkYsY0FBUUcsS0FBUixDQUFpQnZCLElBQWpCLHNDQUFzRHNCLEVBQUVFLE9BQXhEO0FBQ0FuQjtBQUNBO0FBQ0QsS0FYRDs7QUFhQVEsV0FBT1ksT0FBUCxHQUFlO0FBQUEsWUFBR3BCLFNBQUg7QUFBQSxLQUFmO0FBQ0FRLFdBQU9hLGlCQUFQLENBQXlCZixLQUF6QjtBQUNBLElBbEJXLENBQVo7QUFGWUEsT0FGMkI7QUFBQTs7QUFFeEMsT0FBSSxJQUFJRixJQUFFLENBQU4sRUFBU0UsSUFBVCxFQUFlRCxNQUFJRixNQUFNbUIsTUFBN0IsRUFBb0NsQixJQUFFQyxHQUF0QyxFQUEwQ0QsR0FBMUMsRUFBOEM7QUFBQSxTQUF0Q0EsQ0FBc0MsRUFBakNFLElBQWlDLEVBQTNCRCxHQUEyQjtBQXFCN0M7QUFDRFAsU0FBT3lCLEtBQVAsR0FBYSxFQUFiO0FBQ0F4QixVQUFReUIsR0FBUixDQUFZdEIsTUFBWixFQUFvQnVCLElBQXBCLENBQXlCekIsT0FBekIsRUFBa0NDLE1BQWxDO0FBQ0EsRUExQlMsQ0FBUDtBQTJCSCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUVEZGb250IGZyb20gXCJ0dGZqc1wiXHJcblxyXG52YXIgZm9udHM9e31cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGdldChuYW1lKXtcclxuXHRcdG5hbWU9bmFtZS50b0xvd2VyQ2FzZSgpXHJcblx0XHRpZihmb250c1tuYW1lXSl7XHJcblx0XHRcdHJldHVybiBmb250c1tuYW1lXVxyXG5cdFx0fWVsc2V7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtuYW1lfSBub3QgZXhpc3RzYClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBsb2FkRm9udChsb2FkZXIpe1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XHJcblx0XHRsZXQgbG9hZGVkPVtdLCBmaWxlcz1sb2FkZXIuZmlsZXNcclxuXHRcdGZvcihsZXQgaT0wLCBmaWxlLCBsZW49ZmlsZXMubGVuZ3RoO2k8bGVuO2krKyl7XHJcblx0XHRcdGZpbGU9ZmlsZXNbaV1cclxuXHRcdFx0bG9hZGVkLnB1c2gobmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PntcclxuXHRcdFx0XHRsZXQgbmFtZT1maWxlLm5hbWVcclxuXHRcdFx0XHRsZXQgcmVhZGVyPW5ldyBGaWxlUmVhZGVyKClcclxuXHRcdFx0XHRyZWFkZXIub25sb2FkPWU9PntcclxuXHRcdFx0XHRcdHRyeXtcclxuXHRcdFx0XHRcdFx0bGV0IGRhdGE9cmVhZGVyLnJlc3VsdFxyXG5cdFx0XHRcdFx0XHRsZXQgaWQ9bmFtZS5zcGxpdChcIi5cIilbMF0udG9Mb3dlckNhc2UoKVxyXG5cdFx0XHRcdFx0XHRmb250c1tpZF09bmV3IFRURkZvbnQoZGF0YSlcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coYCR7bmFtZX0gZm9udCBsb2FkZWRgKVxyXG5cdFx0XHRcdFx0XHRyZXNvbHZlKGZvbnRzW2lkXSlcclxuXHRcdFx0XHRcdH1jYXRjaChlKXtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5lcnJvcihgJHtuYW1lfSBmb250IGxvYWRlZCBmYWlsIHdpdGggZXJyb3I6ICR7ZS5tZXNzYWdlfWApXHJcblx0XHRcdFx0XHRcdHJlc29sdmUoKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRcclxuXHRcdFx0XHRyZWFkZXIub25lcnJvcj1lPT5yZXNvbHZlKClcclxuXHRcdFx0XHRyZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoZmlsZSlcclxuXHRcdFx0fSkpXHJcblx0XHR9XHJcblx0XHRsb2FkZXIudmFsdWU9XCJcIlxyXG5cdFx0UHJvbWlzZS5hbGwobG9hZGVkKS50aGVuKHJlc29sdmUsIHJlamVjdClcdFxyXG5cdH0pXHJcbn1cclxuIl19