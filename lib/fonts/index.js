"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.loadFont = loadFont;

var _opentype = require("opentype.js");

var _opentype2 = _interopRequireDefault(_opentype);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fonts = {};

exports.default = {
    get: function get(name) {
        if (!fonts[name]) {
            return fonts[name] = loadFont(name);
        } else {
            throw new Error(name + " not exists");
        }
    }
};

var Font = function () {
    function Font(data, id) {
        _classCallCheck(this, Font);

        this.data = data;
        this.id = id;
    }

    _createClass(Font, [{
        key: "metrics",
        value: function metrics(word, opt) {
            var size = opt.size;
            //this.data.stringTo

            return { width: 0, height: 0, glyphs: [] };
        }
    }]);

    return Font;
}();

function loadFont() {
    var loader = document.querySelector('#fonts');
    loader.onchange = function (e) {
        for (var i = 0, file, len = this.files.length; i < len; i++) {
            file = this.files[i];
            {
                (function () {
                    var name = file.name;
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        var data = reader.result;
                        var font = _opentype2.default.parse(data);
                        if (font.supported) {
                            var id = name.split(".")[0].toLowerCase();
                            fonts[id] = new Font(font, id);
                            console.log(name + " font loaded");
                        } else {
                            console.error(name + " font loaded fail");
                        }
                    };
                    reader.readAsArrayBuffer(file);
                })();
            }
        }

        loader.value = "";
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mb250cy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztRQTRCZ0I7O0FBNUJoQjs7Ozs7Ozs7QUFFQSxJQUFJLFFBQU0sRUFBTjs7a0JBRVc7QUFDWCxzQkFBSSxNQUFLO0FBQ1gsWUFBRyxDQUFDLE1BQU0sSUFBTixDQUFELEVBQWE7QUFDZixtQkFBTyxNQUFNLElBQU4sSUFBWSxTQUFTLElBQVQsQ0FBWixDQURRO1NBQWhCLE1BRUs7QUFDSyxrQkFBTSxJQUFJLEtBQUosQ0FBYSxvQkFBYixDQUFOLENBREw7U0FGTDtLQUZhOzs7SUFXVDtBQUNGLGFBREUsSUFDRixDQUFZLElBQVosRUFBa0IsRUFBbEIsRUFBcUI7OEJBRG5CLE1BQ21COztBQUNqQixhQUFLLElBQUwsR0FBVSxJQUFWLENBRGlCO0FBRWpCLGFBQUssRUFBTCxHQUFRLEVBQVIsQ0FGaUI7S0FBckI7O2lCQURFOztnQ0FNRyxNQUFLLEtBQUk7Z0JBQ0gsT0FBTSxJQUFOOztBQURHO0FBR2hCLG1CQUFPLEVBQUMsT0FBTSxDQUFOLEVBQVMsUUFBTyxDQUFQLEVBQVUsUUFBTyxFQUFQLEVBQTNCLENBSGdCOzs7O1dBTlo7OztBQWFDLFNBQVMsUUFBVCxHQUFtQjtBQUN0QixRQUFJLFNBQU8sU0FBUyxhQUFULENBQXVCLFFBQXZCLENBQVAsQ0FEa0I7QUFFdEIsV0FBTyxRQUFQLEdBQWdCLFVBQVMsQ0FBVCxFQUFXO0FBQ3ZCLGFBQUksSUFBSSxJQUFFLENBQUYsRUFBSyxJQUFULEVBQWUsTUFBSSxLQUFLLEtBQUwsQ0FBVyxNQUFYLEVBQWtCLElBQUUsR0FBRixFQUFNLEdBQS9DLEVBQW1EO0FBQy9DLG1CQUFLLEtBQUssS0FBTCxDQUFXLENBQVgsQ0FBTCxDQUQrQztBQUUvQzs7QUFDSSx3QkFBSSxPQUFLLEtBQUssSUFBTDtBQUNULHdCQUFJLFNBQU8sSUFBSSxVQUFKLEVBQVA7QUFDSiwyQkFBTyxNQUFQLEdBQWMsYUFBRztBQUNiLDRCQUFJLE9BQUssT0FBTyxNQUFQLENBREk7QUFFYiw0QkFBSSxPQUFLLG1CQUFTLEtBQVQsQ0FBZSxJQUFmLENBQUwsQ0FGUztBQUdiLDRCQUFHLEtBQUssU0FBTCxFQUFlO0FBQ2QsZ0NBQUksS0FBRyxLQUFLLEtBQUwsQ0FBVyxHQUFYLEVBQWdCLENBQWhCLEVBQW1CLFdBQW5CLEVBQUgsQ0FEVTtBQUVkLGtDQUFNLEVBQU4sSUFBVSxJQUFJLElBQUosQ0FBUyxJQUFULEVBQWMsRUFBZCxDQUFWLENBRmM7QUFHZCxvQ0FBUSxHQUFSLENBQWUscUJBQWYsRUFIYzt5QkFBbEIsTUFJSztBQUNELG9DQUFRLEtBQVIsQ0FBaUIsMEJBQWpCLEVBREM7eUJBSkw7cUJBSFU7QUFXZCwyQkFBTyxpQkFBUCxDQUF5QixJQUF6QjtxQkFkSjthQUYrQztTQUFuRDs7QUFvQkEsZUFBTyxLQUFQLEdBQWEsRUFBYixDQXJCdUI7S0FBWCxDQUZNO0NBQW5CIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG9wZW50eXBlIGZyb20gXCJvcGVudHlwZS5qc1wiXG5cbnZhciBmb250cz17fVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZ2V0KG5hbWUpe1xuXHRcdGlmKCFmb250c1tuYW1lXSl7XG5cdFx0XHRyZXR1cm4gZm9udHNbbmFtZV09bG9hZEZvbnQobmFtZSlcblx0XHR9ZWxzZXtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtuYW1lfSBub3QgZXhpc3RzYClcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5jbGFzcyBGb250e1xuICAgIGNvbnN0cnVjdG9yKGRhdGEsIGlkKXtcbiAgICAgICAgdGhpcy5kYXRhPWRhdGFcbiAgICAgICAgdGhpcy5pZD1pZFxuICAgIH1cblxuXHRtZXRyaWNzKHdvcmQsb3B0KXtcbiAgICAgICAgY29uc3Qge3NpemV9PW9wdFxuICAgICAgICAvL3RoaXMuZGF0YS5zdHJpbmdUb1xuXHRcdHJldHVybiB7d2lkdGg6MCwgaGVpZ2h0OjAsIGdseXBoczpbXX1cblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9hZEZvbnQoKXtcbiAgICBsZXQgbG9hZGVyPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmb250cycpXG4gICAgbG9hZGVyLm9uY2hhbmdlPWZ1bmN0aW9uKGUpe1xuICAgICAgICBmb3IobGV0IGk9MCwgZmlsZSwgbGVuPXRoaXMuZmlsZXMubGVuZ3RoO2k8bGVuO2krKyl7XG4gICAgICAgICAgICBmaWxlPXRoaXMuZmlsZXNbaV1cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsZXQgbmFtZT1maWxlLm5hbWVcbiAgICAgICAgICAgICAgICBsZXQgcmVhZGVyPW5ldyBGaWxlUmVhZGVyKClcbiAgICAgICAgICAgICAgICByZWFkZXIub25sb2FkPWU9PntcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGE9cmVhZGVyLnJlc3VsdFxuICAgICAgICAgICAgICAgICAgICBsZXQgZm9udD1vcGVudHlwZS5wYXJzZShkYXRhKVxuICAgICAgICAgICAgICAgICAgICBpZihmb250LnN1cHBvcnRlZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaWQ9bmFtZS5zcGxpdChcIi5cIilbMF0udG9Mb3dlckNhc2UoKVxuICAgICAgICAgICAgICAgICAgICAgICAgZm9udHNbaWRdPW5ldyBGb250KGZvbnQsaWQpXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgJHtuYW1lfSBmb250IGxvYWRlZGApXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgJHtuYW1lfSBmb250IGxvYWRlZCBmYWlsYClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoZmlsZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxvYWRlci52YWx1ZT1cIlwiXG4gICAgfVxufVxuIl19