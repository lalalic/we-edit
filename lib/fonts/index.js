"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.loadFont = loadFont;

var _opentype = require("opentype.js");

var _opentype2 = _interopRequireDefault(_opentype);

var _svgPathBoundingBox = require("svg-path-bounding-box");

var _svgPathBoundingBox2 = _interopRequireDefault(_svgPathBoundingBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

var Font = function () {
	function Font(data, id) {
		_classCallCheck(this, Font);

		this.data = data;
		this.lineGap = 0; //@TODO
		this.id = id;
	}

	_createClass(Font, [{
		key: "metrics",
		value: function metrics(word, opt) {
			var size = opt.size;
			//this.data.stringTo

			return { width: 0, height: 0, glyphs: [] };
		}
	}, {
		key: "lineHeight",
		value: function lineHeight(size) {
			return (this.data.ascender + this.lineGap - this.data.descender) / 1000 * size;
		}
	}, {
		key: "stringWidth",
		value: function stringWidth(string, size) {
			var d = this.data.getPath(string, 0, 0, size, { kerning: true }).toPathData();
			return (0, _svgPathBoundingBox2.default)(d);
		}
	}]);

	return Font;
}();

function loadFont() {
	return new Promise(function (resolve, reject) {
		var loader = document.querySelector('#fonts');
		loader.onchange = function (e) {
			var _this = this;

			var loaded = [];

			var _loop = function _loop(i, _file, len) {
				_file = _this.files[i];
				loaded.push(new Promise(function (resolve, reject) {
					var name = _file.name;
					var reader = new FileReader();
					reader.onload = function (e) {
						var data = reader.result;
						var font = _opentype2.default.parse(data);
						if (font.supported) {
							var id = name.split(".")[0].toLowerCase();
							fonts[id] = new Font(font, id);
							console.log(name + " font loaded");
							resolve(fonts[id]);
						} else {
							console.error(name + " font loaded fail");
							resolve();
						}
					};
					reader.onerror = function (e) {
						return reject(e);
					};

					reader.readAsArrayBuffer(_file);
				}));
				file = _file;
			};

			for (var i = 0, file, len = this.files.length; i < len; i++) {
				_loop(i, file, len);
			}
			loader.value = "";
			Promise.all(loaded).then(resolve, reject);
		};
	});
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mb250cy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztRQXdDZ0I7O0FBeENoQjs7OztBQUNBOzs7Ozs7OztBQUVBLElBQUksUUFBTSxFQUFOOztrQkFFVztBQUNYLG1CQUFJLE1BQUs7QUFDWCxTQUFLLEtBQUssV0FBTCxFQUFMLENBRFc7QUFFWCxNQUFHLE1BQU0sSUFBTixDQUFILEVBQWU7QUFDZCxVQUFPLE1BQU0sSUFBTixDQUFQLENBRGM7R0FBZixNQUVLO0FBQ0ssU0FBTSxJQUFJLEtBQUosQ0FBYSxvQkFBYixDQUFOLENBREw7R0FGTDtFQUhhOzs7SUFZVDtBQUNGLFVBREUsSUFDRixDQUFZLElBQVosRUFBa0IsRUFBbEIsRUFBcUI7d0JBRG5CLE1BQ21COztBQUNqQixPQUFLLElBQUwsR0FBVSxJQUFWLENBRGlCO0FBRWpCLE9BQUssT0FBTCxHQUFhLENBQWI7QUFGaUIsTUFHakIsQ0FBSyxFQUFMLEdBQVEsRUFBUixDQUhpQjtFQUFyQjs7Y0FERTs7MEJBT0csTUFBSyxLQUFJO09BQ0gsT0FBTSxJQUFOOztBQURHO0FBR2hCLFVBQU8sRUFBQyxPQUFNLENBQU4sRUFBUyxRQUFPLENBQVAsRUFBVSxRQUFPLEVBQVAsRUFBM0IsQ0FIZ0I7Ozs7NkJBTUgsTUFBSztBQUNaLFVBQU8sQ0FBQyxLQUFLLElBQUwsQ0FBVSxRQUFWLEdBQW1CLEtBQUssT0FBTCxHQUFhLEtBQUssSUFBTCxDQUFVLFNBQVYsQ0FBakMsR0FBc0QsSUFBdEQsR0FBMkQsSUFBM0QsQ0FESzs7Ozs4QkFJSixRQUFPLE1BQUs7QUFDcEIsT0FBSSxJQUFFLEtBQUssSUFBTCxDQUFVLE9BQVYsQ0FBa0IsTUFBbEIsRUFBeUIsQ0FBekIsRUFBMkIsQ0FBM0IsRUFBNkIsSUFBN0IsRUFBbUMsRUFBQyxTQUFRLElBQVIsRUFBcEMsRUFBbUQsVUFBbkQsRUFBRixDQURnQjtBQUVwQixVQUFPLGtDQUFZLENBQVosQ0FBUCxDQUZvQjs7OztRQWpCdEI7OztBQXVCQyxTQUFTLFFBQVQsR0FBbUI7QUFDdEIsUUFBTyxJQUFJLE9BQUosQ0FBWSxVQUFDLE9BQUQsRUFBVSxNQUFWLEVBQW1CO0FBQ3hDLE1BQUksU0FBTyxTQUFTLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBUCxDQURvQztBQUV4QyxTQUFPLFFBQVAsR0FBZ0IsVUFBUyxDQUFULEVBQVc7OztBQUMxQixPQUFJLFNBQU8sRUFBUCxDQURzQjs7OEJBRWxCLFVBQVc7QUFDbEIsWUFBSyxNQUFLLEtBQUwsQ0FBVyxDQUFYLENBQUw7QUFDQSxXQUFPLElBQVAsQ0FBWSxJQUFJLE9BQUosQ0FBWSxVQUFDLE9BQUQsRUFBVSxNQUFWLEVBQW1CO0FBQzFDLFNBQUksT0FBSyxNQUFLLElBQUwsQ0FEaUM7QUFFMUMsU0FBSSxTQUFPLElBQUksVUFBSixFQUFQLENBRnNDO0FBRzFDLFlBQU8sTUFBUCxHQUFjLGFBQUc7QUFDaEIsVUFBSSxPQUFLLE9BQU8sTUFBUCxDQURPO0FBRWhCLFVBQUksT0FBSyxtQkFBUyxLQUFULENBQWUsSUFBZixDQUFMLENBRlk7QUFHaEIsVUFBRyxLQUFLLFNBQUwsRUFBZTtBQUNqQixXQUFJLEtBQUcsS0FBSyxLQUFMLENBQVcsR0FBWCxFQUFnQixDQUFoQixFQUFtQixXQUFuQixFQUFILENBRGE7QUFFakIsYUFBTSxFQUFOLElBQVUsSUFBSSxJQUFKLENBQVMsSUFBVCxFQUFjLEVBQWQsQ0FBVixDQUZpQjtBQUdqQixlQUFRLEdBQVIsQ0FBZSxxQkFBZixFQUhpQjtBQUlqQixlQUFRLE1BQU0sRUFBTixDQUFSLEVBSmlCO09BQWxCLE1BS0s7QUFDSixlQUFRLEtBQVIsQ0FBaUIsMEJBQWpCLEVBREk7QUFFSixpQkFGSTtPQUxMO01BSGEsQ0FINEI7QUFpQjFDLFlBQU8sT0FBUCxHQUFlO2FBQUcsT0FBTyxDQUFQO01BQUgsQ0FqQjJCOztBQW1CMUMsWUFBTyxpQkFBUCxDQUF5QixLQUF6QixFQW5CMEM7S0FBbkIsQ0FBeEI7QUFGWTtLQUZhOztBQUUxQixRQUFJLElBQUksSUFBRSxDQUFGLEVBQUssSUFBVCxFQUFlLE1BQUksS0FBSyxLQUFMLENBQVcsTUFBWCxFQUFrQixJQUFFLEdBQUYsRUFBTSxHQUEvQyxFQUFtRDtVQUEzQyxHQUFLLE1BQU0sS0FBZ0M7SUFBbkQ7QUF3QkEsVUFBTyxLQUFQLEdBQWEsRUFBYixDQTFCMEI7QUEyQjFCLFdBQVEsR0FBUixDQUFZLE1BQVosRUFBb0IsSUFBcEIsQ0FBeUIsT0FBekIsRUFBa0MsTUFBbEMsRUEzQjBCO0dBQVgsQ0FGd0I7RUFBbkIsQ0FBbkIsQ0FEc0I7Q0FBbkIiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb3BlbnR5cGUgZnJvbSBcIm9wZW50eXBlLmpzXCJcbmltcG9ydCBib3VuZGluZ0JveCBmcm9tIFwic3ZnLXBhdGgtYm91bmRpbmctYm94XCJcblxudmFyIGZvbnRzPXt9XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBnZXQobmFtZSl7XG5cdFx0bmFtZT1uYW1lLnRvTG93ZXJDYXNlKClcblx0XHRpZihmb250c1tuYW1lXSl7XG5cdFx0XHRyZXR1cm4gZm9udHNbbmFtZV1cblx0XHR9ZWxzZXtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtuYW1lfSBub3QgZXhpc3RzYClcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5jbGFzcyBGb250e1xuICAgIGNvbnN0cnVjdG9yKGRhdGEsIGlkKXtcbiAgICAgICAgdGhpcy5kYXRhPWRhdGFcbiAgICAgICAgdGhpcy5saW5lR2FwPTAvL0BUT0RPXG4gICAgICAgIHRoaXMuaWQ9aWRcbiAgICB9XG5cblx0bWV0cmljcyh3b3JkLG9wdCl7XG4gICAgICAgIGNvbnN0IHtzaXplfT1vcHRcbiAgICAgICAgLy90aGlzLmRhdGEuc3RyaW5nVG9cblx0XHRyZXR1cm4ge3dpZHRoOjAsIGhlaWdodDowLCBnbHlwaHM6W119XG5cdH1cblxuICAgIGxpbmVIZWlnaHQoc2l6ZSl7XG4gICAgICAgIHJldHVybiAodGhpcy5kYXRhLmFzY2VuZGVyK3RoaXMubGluZUdhcC10aGlzLmRhdGEuZGVzY2VuZGVyKS8xMDAwKnNpemVcbiAgICB9XG5cbiAgICBzdHJpbmdXaWR0aChzdHJpbmcsc2l6ZSl7XG4gICAgICAgIGxldCBkPXRoaXMuZGF0YS5nZXRQYXRoKHN0cmluZywwLDAsc2l6ZSwge2tlcm5pbmc6dHJ1ZX0pLnRvUGF0aERhdGEoKVxuICAgICAgICByZXR1cm4gYm91bmRpbmdCb3goZClcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkRm9udCgpe1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuXHRcdGxldCBsb2FkZXI9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZvbnRzJylcblx0XHRsb2FkZXIub25jaGFuZ2U9ZnVuY3Rpb24oZSl7XG5cdFx0XHRsZXQgbG9hZGVkPVtdXG5cdFx0XHRmb3IobGV0IGk9MCwgZmlsZSwgbGVuPXRoaXMuZmlsZXMubGVuZ3RoO2k8bGVuO2krKyl7XG5cdFx0XHRcdGZpbGU9dGhpcy5maWxlc1tpXVxuXHRcdFx0XHRsb2FkZWQucHVzaChuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuXHRcdFx0XHRcdGxldCBuYW1lPWZpbGUubmFtZVxuXHRcdFx0XHRcdGxldCByZWFkZXI9bmV3IEZpbGVSZWFkZXIoKVxuXHRcdFx0XHRcdHJlYWRlci5vbmxvYWQ9ZT0+e1xuXHRcdFx0XHRcdFx0bGV0IGRhdGE9cmVhZGVyLnJlc3VsdFxuXHRcdFx0XHRcdFx0bGV0IGZvbnQ9b3BlbnR5cGUucGFyc2UoZGF0YSlcblx0XHRcdFx0XHRcdGlmKGZvbnQuc3VwcG9ydGVkKXtcblx0XHRcdFx0XHRcdFx0bGV0IGlkPW5hbWUuc3BsaXQoXCIuXCIpWzBdLnRvTG93ZXJDYXNlKClcblx0XHRcdFx0XHRcdFx0Zm9udHNbaWRdPW5ldyBGb250KGZvbnQsaWQpXG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKGAke25hbWV9IGZvbnQgbG9hZGVkYClcblx0XHRcdFx0XHRcdFx0cmVzb2x2ZShmb250c1tpZF0pXG5cdFx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdFx0Y29uc29sZS5lcnJvcihgJHtuYW1lfSBmb250IGxvYWRlZCBmYWlsYClcblx0XHRcdFx0XHRcdFx0cmVzb2x2ZSgpXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmVhZGVyLm9uZXJyb3I9ZT0+cmVqZWN0KGUpXG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0cmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGZpbGUpXG5cdFx0XHRcdH0pKVxuXHRcdFx0fVxuXHRcdFx0bG9hZGVyLnZhbHVlPVwiXCJcblx0XHRcdFByb21pc2UuYWxsKGxvYWRlZCkudGhlbihyZXNvbHZlLCByZWplY3QpXG5cdFx0fVx0XHRcblx0fSlcbn1cbiJdfQ==