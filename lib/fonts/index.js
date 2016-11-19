"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

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
	return new _promise2.default(function (resolve, reject) {
		var loaded = [],
		    files = loader.files;

		var _loop = function _loop(i, _file, len) {
			_file = files[i];
			loaded.push(new _promise2.default(function (resolve, reject) {
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
		_promise2.default.all(loaded).then(resolve, reject);
	});
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mb250cy9pbmRleC5qcyJdLCJuYW1lcyI6WyJsb2FkRm9udCIsImZvbnRzIiwiZ2V0IiwibmFtZSIsInRvTG93ZXJDYXNlIiwiRXJyb3IiLCJsb2FkZXIiLCJyZXNvbHZlIiwicmVqZWN0IiwibG9hZGVkIiwiZmlsZXMiLCJpIiwibGVuIiwiZmlsZSIsInB1c2giLCJyZWFkZXIiLCJGaWxlUmVhZGVyIiwib25sb2FkIiwiZGF0YSIsInJlc3VsdCIsImlkIiwic3BsaXQiLCJjb25zb2xlIiwibG9nIiwiZSIsImVycm9yIiwibWVzc2FnZSIsIm9uZXJyb3IiLCJyZWFkQXNBcnJheUJ1ZmZlciIsImxlbmd0aCIsInZhbHVlIiwiYWxsIiwidGhlbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztRQWVnQkEsUSxHQUFBQSxROztBQWZoQjs7Ozs7O0FBRUEsSUFBSUMsUUFBTSxFQUFWOztrQkFFZTtBQUNYQyxJQURXLGVBQ1BDLElBRE8sRUFDRjtBQUNYQSxTQUFLQSxLQUFLQyxXQUFMLEVBQUw7QUFDQSxNQUFHSCxNQUFNRSxJQUFOLENBQUgsRUFBZTtBQUNkLFVBQU9GLE1BQU1FLElBQU4sQ0FBUDtBQUNBLEdBRkQsTUFFSztBQUNLLFNBQU0sSUFBSUUsS0FBSixDQUFhRixJQUFiLGlCQUFOO0FBQ0g7QUFDSjtBQVJVLEM7QUFXUixTQUFTSCxRQUFULENBQWtCTSxNQUFsQixFQUF5QjtBQUM1QixRQUFPLHNCQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFtQjtBQUN4QyxNQUFJQyxTQUFPLEVBQVg7QUFBQSxNQUFlQyxRQUFNSixPQUFPSSxLQUE1Qjs7QUFEd0MsNkJBRWhDQyxDQUZnQyxTQUVyQkMsR0FGcUI7QUFHdkNDLFdBQUtILE1BQU1DLENBQU4sQ0FBTDtBQUNBRixVQUFPSyxJQUFQLENBQVksc0JBQVksVUFBQ1AsT0FBRCxFQUFVQyxNQUFWLEVBQW1CO0FBQzFDLFFBQUlMLE9BQUtVLE1BQUtWLElBQWQ7QUFDQSxRQUFJWSxTQUFPLElBQUlDLFVBQUosRUFBWDtBQUNBRCxXQUFPRSxNQUFQLEdBQWMsYUFBRztBQUNoQixTQUFHO0FBQ0YsVUFBSUMsT0FBS0gsT0FBT0ksTUFBaEI7QUFDQSxVQUFJQyxLQUFHakIsS0FBS2tCLEtBQUwsQ0FBVyxHQUFYLEVBQWdCLENBQWhCLEVBQW1CakIsV0FBbkIsRUFBUDtBQUNBSCxZQUFNbUIsRUFBTixJQUFVLG9CQUFZRixJQUFaLENBQVY7QUFDQUksY0FBUUMsR0FBUixDQUFlcEIsSUFBZjtBQUNBSSxjQUFRTixNQUFNbUIsRUFBTixDQUFSO0FBQ0EsTUFORCxDQU1DLE9BQU1JLENBQU4sRUFBUTtBQUNSRixjQUFRRyxLQUFSLENBQWlCdEIsSUFBakIsc0NBQXNEcUIsRUFBRUUsT0FBeEQ7QUFDQW5CO0FBQ0E7QUFDRCxLQVhEOztBQWFBUSxXQUFPWSxPQUFQLEdBQWU7QUFBQSxZQUFHcEIsU0FBSDtBQUFBLEtBQWY7QUFDQVEsV0FBT2EsaUJBQVAsQ0FBeUJmLEtBQXpCO0FBQ0EsSUFsQlcsQ0FBWjtBQUZZQSxPQUYyQjtBQUFBOztBQUV4QyxPQUFJLElBQUlGLElBQUUsQ0FBTixFQUFTRSxJQUFULEVBQWVELE1BQUlGLE1BQU1tQixNQUE3QixFQUFvQ2xCLElBQUVDLEdBQXRDLEVBQTBDRCxHQUExQyxFQUE4QztBQUFBLFNBQXRDQSxDQUFzQyxFQUFqQ0UsSUFBaUMsRUFBM0JELEdBQTJCO0FBcUI3QztBQUNETixTQUFPd0IsS0FBUCxHQUFhLEVBQWI7QUFDQSxvQkFBUUMsR0FBUixDQUFZdEIsTUFBWixFQUFvQnVCLElBQXBCLENBQXlCekIsT0FBekIsRUFBa0NDLE1BQWxDO0FBQ0EsRUExQlMsQ0FBUDtBQTJCSCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUVEZGb250IGZyb20gXCJ0dGZqc1wiXG5cbnZhciBmb250cz17fVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZ2V0KG5hbWUpe1xuXHRcdG5hbWU9bmFtZS50b0xvd2VyQ2FzZSgpXG5cdFx0aWYoZm9udHNbbmFtZV0pe1xuXHRcdFx0cmV0dXJuIGZvbnRzW25hbWVdXG5cdFx0fWVsc2V7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7bmFtZX0gbm90IGV4aXN0c2ApXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkRm9udChsb2FkZXIpe1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuXHRcdGxldCBsb2FkZWQ9W10sIGZpbGVzPWxvYWRlci5maWxlc1xuXHRcdGZvcihsZXQgaT0wLCBmaWxlLCBsZW49ZmlsZXMubGVuZ3RoO2k8bGVuO2krKyl7XG5cdFx0XHRmaWxlPWZpbGVzW2ldXG5cdFx0XHRsb2FkZWQucHVzaChuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuXHRcdFx0XHRsZXQgbmFtZT1maWxlLm5hbWVcblx0XHRcdFx0bGV0IHJlYWRlcj1uZXcgRmlsZVJlYWRlcigpXG5cdFx0XHRcdHJlYWRlci5vbmxvYWQ9ZT0+e1xuXHRcdFx0XHRcdHRyeXtcblx0XHRcdFx0XHRcdGxldCBkYXRhPXJlYWRlci5yZXN1bHRcblx0XHRcdFx0XHRcdGxldCBpZD1uYW1lLnNwbGl0KFwiLlwiKVswXS50b0xvd2VyQ2FzZSgpXG5cdFx0XHRcdFx0XHRmb250c1tpZF09bmV3IFRURkZvbnQoZGF0YSlcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKGAke25hbWV9IGZvbnQgbG9hZGVkYClcblx0XHRcdFx0XHRcdHJlc29sdmUoZm9udHNbaWRdKVxuXHRcdFx0XHRcdH1jYXRjaChlKXtcblx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoYCR7bmFtZX0gZm9udCBsb2FkZWQgZmFpbCB3aXRoIGVycm9yOiAke2UubWVzc2FnZX1gKVxuXHRcdFx0XHRcdFx0cmVzb2x2ZSgpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHRyZWFkZXIub25lcnJvcj1lPT5yZXNvbHZlKClcblx0XHRcdFx0cmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGZpbGUpXG5cdFx0XHR9KSlcblx0XHR9XG5cdFx0bG9hZGVyLnZhbHVlPVwiXCJcblx0XHRQcm9taXNlLmFsbChsb2FkZWQpLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KVx0XG5cdH0pXG59XG4iXX0=