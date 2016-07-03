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
            var d = this.data.getPath(string, 0, 0, size, { kerning: true });
            return (0, _svgPathBoundingBox2.default)(d);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mb250cy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztRQXVDZ0I7O0FBdkNoQjs7OztBQUNBOzs7Ozs7OztBQUVBLElBQUksUUFBTSxFQUFOOztrQkFFVztBQUNYLHNCQUFJLE1BQUs7QUFDWCxZQUFHLENBQUMsTUFBTSxJQUFOLENBQUQsRUFBYTtBQUNmLG1CQUFPLE1BQU0sSUFBTixJQUFZLFNBQVMsSUFBVCxDQUFaLENBRFE7U0FBaEIsTUFFSztBQUNLLGtCQUFNLElBQUksS0FBSixDQUFhLG9CQUFiLENBQU4sQ0FETDtTQUZMO0tBRmE7OztJQVdUO0FBQ0YsYUFERSxJQUNGLENBQVksSUFBWixFQUFrQixFQUFsQixFQUFxQjs4QkFEbkIsTUFDbUI7O0FBQ2pCLGFBQUssSUFBTCxHQUFVLElBQVYsQ0FEaUI7QUFFakIsYUFBSyxPQUFMLEdBQWEsQ0FBYjtBQUZpQixZQUdqQixDQUFLLEVBQUwsR0FBUSxFQUFSLENBSGlCO0tBQXJCOztpQkFERTs7Z0NBT0csTUFBSyxLQUFJO2dCQUNILE9BQU0sSUFBTjs7QUFERztBQUdoQixtQkFBTyxFQUFDLE9BQU0sQ0FBTixFQUFTLFFBQU8sQ0FBUCxFQUFVLFFBQU8sRUFBUCxFQUEzQixDQUhnQjs7OzttQ0FNSCxNQUFLO0FBQ1osbUJBQU8sQ0FBQyxLQUFLLElBQUwsQ0FBVSxRQUFWLEdBQW1CLEtBQUssT0FBTCxHQUFhLEtBQUssSUFBTCxDQUFVLFNBQVYsQ0FBakMsR0FBc0QsSUFBdEQsR0FBMkQsSUFBM0QsQ0FESzs7OztvQ0FJSixRQUFPLE1BQUs7QUFDcEIsZ0JBQUksSUFBRSxLQUFLLElBQUwsQ0FBVSxPQUFWLENBQWtCLE1BQWxCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLEVBQTZCLElBQTdCLEVBQW1DLEVBQUMsU0FBUSxJQUFSLEVBQXBDLENBQUYsQ0FEZ0I7QUFFcEIsbUJBQU8sa0NBQVksQ0FBWixDQUFQLENBRm9COzs7O1dBakJ0Qjs7O0FBdUJDLFNBQVMsUUFBVCxHQUFtQjtBQUN0QixRQUFJLFNBQU8sU0FBUyxhQUFULENBQXVCLFFBQXZCLENBQVAsQ0FEa0I7QUFFdEIsV0FBTyxRQUFQLEdBQWdCLFVBQVMsQ0FBVCxFQUFXO0FBQ3ZCLGFBQUksSUFBSSxJQUFFLENBQUYsRUFBSyxJQUFULEVBQWUsTUFBSSxLQUFLLEtBQUwsQ0FBVyxNQUFYLEVBQWtCLElBQUUsR0FBRixFQUFNLEdBQS9DLEVBQW1EO0FBQy9DLG1CQUFLLEtBQUssS0FBTCxDQUFXLENBQVgsQ0FBTCxDQUQrQztBQUUvQzs7QUFDSSx3QkFBSSxPQUFLLEtBQUssSUFBTDtBQUNULHdCQUFJLFNBQU8sSUFBSSxVQUFKLEVBQVA7QUFDSiwyQkFBTyxNQUFQLEdBQWMsYUFBRztBQUNiLDRCQUFJLE9BQUssT0FBTyxNQUFQLENBREk7QUFFYiw0QkFBSSxPQUFLLG1CQUFTLEtBQVQsQ0FBZSxJQUFmLENBQUwsQ0FGUztBQUdiLDRCQUFHLEtBQUssU0FBTCxFQUFlO0FBQ2QsZ0NBQUksS0FBRyxLQUFLLEtBQUwsQ0FBVyxHQUFYLEVBQWdCLENBQWhCLEVBQW1CLFdBQW5CLEVBQUgsQ0FEVTtBQUVkLGtDQUFNLEVBQU4sSUFBVSxJQUFJLElBQUosQ0FBUyxJQUFULEVBQWMsRUFBZCxDQUFWLENBRmM7QUFHZCxvQ0FBUSxHQUFSLENBQWUscUJBQWYsRUFIYzt5QkFBbEIsTUFJSztBQUNELG9DQUFRLEtBQVIsQ0FBaUIsMEJBQWpCLEVBREM7eUJBSkw7cUJBSFU7QUFXZCwyQkFBTyxpQkFBUCxDQUF5QixJQUF6QjtxQkFkSjthQUYrQztTQUFuRDs7QUFvQkEsZUFBTyxLQUFQLEdBQWEsRUFBYixDQXJCdUI7S0FBWCxDQUZNO0NBQW5CIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG9wZW50eXBlIGZyb20gXCJvcGVudHlwZS5qc1wiXG5pbXBvcnQgYm91bmRpbmdCb3ggZnJvbSBcInN2Zy1wYXRoLWJvdW5kaW5nLWJveFwiXG5cbnZhciBmb250cz17fVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZ2V0KG5hbWUpe1xuXHRcdGlmKCFmb250c1tuYW1lXSl7XG5cdFx0XHRyZXR1cm4gZm9udHNbbmFtZV09bG9hZEZvbnQobmFtZSlcblx0XHR9ZWxzZXtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtuYW1lfSBub3QgZXhpc3RzYClcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5jbGFzcyBGb250e1xuICAgIGNvbnN0cnVjdG9yKGRhdGEsIGlkKXtcbiAgICAgICAgdGhpcy5kYXRhPWRhdGFcbiAgICAgICAgdGhpcy5saW5lR2FwPTAvL0BUT0RPXG4gICAgICAgIHRoaXMuaWQ9aWRcbiAgICB9XG5cblx0bWV0cmljcyh3b3JkLG9wdCl7XG4gICAgICAgIGNvbnN0IHtzaXplfT1vcHRcbiAgICAgICAgLy90aGlzLmRhdGEuc3RyaW5nVG9cblx0XHRyZXR1cm4ge3dpZHRoOjAsIGhlaWdodDowLCBnbHlwaHM6W119XG5cdH1cblxuICAgIGxpbmVIZWlnaHQoc2l6ZSl7XG4gICAgICAgIHJldHVybiAodGhpcy5kYXRhLmFzY2VuZGVyK3RoaXMubGluZUdhcC10aGlzLmRhdGEuZGVzY2VuZGVyKS8xMDAwKnNpemVcbiAgICB9XG5cbiAgICBzdHJpbmdXaWR0aChzdHJpbmcsc2l6ZSl7XG4gICAgICAgIGxldCBkPXRoaXMuZGF0YS5nZXRQYXRoKHN0cmluZywwLDAsc2l6ZSwge2tlcm5pbmc6dHJ1ZX0pXG4gICAgICAgIHJldHVybiBib3VuZGluZ0JveChkKVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRGb250KCl7XG4gICAgbGV0IGxvYWRlcj1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZm9udHMnKVxuICAgIGxvYWRlci5vbmNoYW5nZT1mdW5jdGlvbihlKXtcbiAgICAgICAgZm9yKGxldCBpPTAsIGZpbGUsIGxlbj10aGlzLmZpbGVzLmxlbmd0aDtpPGxlbjtpKyspe1xuICAgICAgICAgICAgZmlsZT10aGlzLmZpbGVzW2ldXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGV0IG5hbWU9ZmlsZS5uYW1lXG4gICAgICAgICAgICAgICAgbGV0IHJlYWRlcj1uZXcgRmlsZVJlYWRlcigpXG4gICAgICAgICAgICAgICAgcmVhZGVyLm9ubG9hZD1lPT57XG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhPXJlYWRlci5yZXN1bHRcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZvbnQ9b3BlbnR5cGUucGFyc2UoZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgaWYoZm9udC5zdXBwb3J0ZWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGlkPW5hbWUuc3BsaXQoXCIuXCIpWzBdLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRzW2lkXT1uZXcgRm9udChmb250LGlkKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYCR7bmFtZX0gZm9udCBsb2FkZWRgKVxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYCR7bmFtZX0gZm9udCBsb2FkZWQgZmFpbGApXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGZpbGUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsb2FkZXIudmFsdWU9XCJcIlxuICAgIH1cbn1cbiJdfQ==