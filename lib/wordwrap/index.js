"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _textComposerTime = 0;

var WordWrapper = function () {
    function WordWrapper(text) {
        var fontFamily = arguments.length <= 1 || arguments[1] === undefined ? "verdana" : arguments[1];
        var fontSize = arguments.length <= 2 || arguments[2] === undefined ? 12 : arguments[2];

        _classCallCheck(this, WordWrapper);

        this.text = text;
        this.fontFamily = fontFamily;
        this.size = fontSize;
        this.height = this.lineHeight();
        this.composed = 0;
    }

    _createClass(WordWrapper, [{
        key: "lineHeight",
        value: function lineHeight() {
            return 25;
        }
    }, {
        key: "stringWidth",
        value: function stringWidth(string) {
            return 200;
        }
    }, {
        key: "next",
        value: function next(_ref) {
            var maxWidth = _ref.width;

            if (this.composed == this.text.length) return null;

            var startAt = Date.now();

            var text = null,
                info = null;
            var width = this.stringWidth(text = this.text.substr(this.composed));
            if (width <= maxWidth) {
                info = { width: width, contentWidth: width, end: this.composed += text.length, children: text };
            } else {
                text = text.substr(0, Math.floor(text.length * maxWidth / width));
                width = this.stringWidth(text);

                if (width == maxWidth) {
                    info = { width: width, end: this.composed += text.length, children: text };
                } else if (width < maxWidth) {
                    var index = this.composed + text.length,
                        len = this.text.length;
                    while (width > maxWidth && index < len) {
                        width = this.stringWidth(text += this.text.charAt(index++));
                    }
                } else {
                    while (width > maxWidth && text.length) {
                        width = this.stringWidth(text = text.slice(0, -1));
                    }
                }

                if (text.length) {
                    info = { width: maxWidth, contentWidth: width, end: this.composed += text.length, children: text };
                } else {
                    //@TODO: the space is too small, give a placeholder
                    info = { width: maxWidth, contentWidth: 0, end: this.composed += text.length, children: text };
                }
            }

            console.info("text composer total time: " + (_textComposerTime += Date.now() - startAt));
            return Object.assign(info, {
                fontFamily: this.fontFamily,
                fontSize: this.size,
                height: this.height
            });
        }
    }]);

    return WordWrapper;
}();

exports.default = WordWrapper;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93b3Jkd3JhcC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBSSxvQkFBa0IsQ0FBbEI7O0lBQ2lCO0FBQ2pCLGFBRGlCLFdBQ2pCLENBQVksSUFBWixFQUFvRDtZQUFsQyxtRUFBVyx5QkFBdUI7WUFBWixpRUFBUyxrQkFBRzs7OEJBRG5DLGFBQ21DOztBQUNoRCxhQUFLLElBQUwsR0FBVSxJQUFWLENBRGdEO0FBRWhELGFBQUssVUFBTCxHQUFnQixVQUFoQixDQUZnRDtBQUd0RCxhQUFLLElBQUwsR0FBVSxRQUFWLENBSHNEO0FBSWhELGFBQUssTUFBTCxHQUFZLEtBQUssVUFBTCxFQUFaLENBSmdEO0FBS2hELGFBQUssUUFBTCxHQUFjLENBQWQsQ0FMZ0Q7S0FBcEQ7O2lCQURpQjs7cUNBU1I7QUFDWCxtQkFBTyxFQUFQLENBRFc7Ozs7b0NBSUEsUUFBTztBQUNsQixtQkFBTyxHQUFQLENBRGtCOzs7O21DQUlNO2dCQUFWLGdCQUFOLE1BQWdCOztBQUNsQixnQkFBRyxLQUFLLFFBQUwsSUFBZSxLQUFLLElBQUwsQ0FBVSxNQUFWLEVBQ2QsT0FBTyxJQUFQLENBREo7O0FBR0EsZ0JBQUksVUFBUSxLQUFLLEdBQUwsRUFBUixDQUpjOztBQU1sQixnQkFBSSxPQUFLLElBQUw7Z0JBQVUsT0FBSyxJQUFMLENBTkk7QUFPbEIsZ0JBQUksUUFBTSxLQUFLLFdBQUwsQ0FBaUIsT0FBSyxLQUFLLElBQUwsQ0FBVSxNQUFWLENBQWlCLEtBQUssUUFBTCxDQUF0QixDQUF2QixDQVBjO0FBUWxCLGdCQUFHLFNBQU8sUUFBUCxFQUFnQjtBQUNmLHVCQUFLLEVBQUMsWUFBRCxFQUFRLGNBQWEsS0FBYixFQUFvQixLQUFJLEtBQUssUUFBTCxJQUFlLEtBQUssTUFBTCxFQUFhLFVBQVMsSUFBVCxFQUFqRSxDQURlO2FBQW5CLE1BRUs7QUFDRCx1QkFBSyxLQUFLLE1BQUwsQ0FBWSxDQUFaLEVBQWMsS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLEdBQVksUUFBWixHQUFxQixLQUFyQixDQUF6QixDQUFMLENBREM7QUFFRCx3QkFBTSxLQUFLLFdBQUwsQ0FBaUIsSUFBakIsQ0FBTixDQUZDOztBQUlELG9CQUFHLFNBQU8sUUFBUCxFQUFnQjtBQUNmLDJCQUFLLEVBQUMsWUFBRCxFQUFRLEtBQUksS0FBSyxRQUFMLElBQWUsS0FBSyxNQUFMLEVBQWEsVUFBUyxJQUFULEVBQTdDLENBRGU7aUJBQW5CLE1BRU0sSUFBRyxRQUFNLFFBQU4sRUFBZTtBQUNwQix3QkFBSSxRQUFNLEtBQUssUUFBTCxHQUFjLEtBQUssTUFBTDt3QkFBYSxNQUFJLEtBQUssSUFBTCxDQUFVLE1BQVYsQ0FEckI7QUFFcEIsMkJBQU0sUUFBTSxRQUFOLElBQWtCLFFBQU0sR0FBTjtBQUNwQixnQ0FBTSxLQUFLLFdBQUwsQ0FBaUIsUUFBTSxLQUFLLElBQUwsQ0FBVSxNQUFWLENBQWlCLE9BQWpCLENBQU4sQ0FBdkI7cUJBREo7aUJBRkUsTUFJQztBQUNILDJCQUFNLFFBQU0sUUFBTixJQUFrQixLQUFLLE1BQUw7QUFDcEIsZ0NBQU0sS0FBSyxXQUFMLENBQWlCLE9BQUssS0FBSyxLQUFMLENBQVcsQ0FBWCxFQUFhLENBQUMsQ0FBRCxDQUFsQixDQUF2QjtxQkFESjtpQkFMRTs7QUFTTixvQkFBRyxLQUFLLE1BQUwsRUFBWTtBQUNYLDJCQUFLLEVBQUMsT0FBTSxRQUFOLEVBQWdCLGNBQWMsS0FBZCxFQUFxQixLQUFJLEtBQUssUUFBTCxJQUFlLEtBQUssTUFBTCxFQUFhLFVBQVMsSUFBVCxFQUEzRSxDQURXO2lCQUFmLE1BRUs7O0FBQ0QsMkJBQUssRUFBQyxPQUFNLFFBQU4sRUFBZ0IsY0FBYSxDQUFiLEVBQWdCLEtBQUksS0FBSyxRQUFMLElBQWUsS0FBSyxNQUFMLEVBQWEsVUFBUyxJQUFULEVBQXRFLENBREM7aUJBRkw7YUFqQko7O0FBd0JBLG9CQUFRLElBQVIsaUNBQTBDLHFCQUFvQixLQUFLLEdBQUwsS0FBVyxPQUFYLENBQTlELEVBaENrQjtBQWlDbEIsbUJBQU8sT0FBTyxNQUFQLENBQWMsSUFBZCxFQUFtQjtBQUM5Qiw0QkFBVyxLQUFLLFVBQUw7QUFDWCwwQkFBUyxLQUFLLElBQUw7QUFDVCx3QkFBTyxLQUFLLE1BQUw7YUFISSxDQUFQLENBakNrQjs7OztXQWpCTCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBfdGV4dENvbXBvc2VyVGltZT0wXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXb3JkV3JhcHBlcntcbiAgICBjb25zdHJ1Y3Rvcih0ZXh0LCBmb250RmFtaWx5PVwidmVyZGFuYVwiLCBmb250U2l6ZT0xMil7XG4gICAgICAgIHRoaXMudGV4dD10ZXh0XG4gICAgICAgIHRoaXMuZm9udEZhbWlseT1mb250RmFtaWx5XG5cdFx0dGhpcy5zaXplPWZvbnRTaXplXG4gICAgICAgIHRoaXMuaGVpZ2h0PXRoaXMubGluZUhlaWdodCgpXG4gICAgICAgIHRoaXMuY29tcG9zZWQ9MFxuICAgIH1cblx0XG5cdGxpbmVIZWlnaHQoKXtcblx0XHRyZXR1cm4gMjVcblx0fVxuXHRcblx0c3RyaW5nV2lkdGgoc3RyaW5nKXtcblx0XHRyZXR1cm4gMjAwXG5cdH1cblx0XG4gICAgbmV4dCh7d2lkdGg6bWF4V2lkdGh9KXtcbiAgICAgICAgaWYodGhpcy5jb21wb3NlZD09dGhpcy50ZXh0Lmxlbmd0aClcbiAgICAgICAgICAgIHJldHVybiBudWxsXG5cbiAgICAgICAgbGV0IHN0YXJ0QXQ9RGF0ZS5ub3coKVxuXG4gICAgICAgIGxldCB0ZXh0PW51bGwsaW5mbz1udWxsXG4gICAgICAgIGxldCB3aWR0aD10aGlzLnN0cmluZ1dpZHRoKHRleHQ9dGhpcy50ZXh0LnN1YnN0cih0aGlzLmNvbXBvc2VkKSlcbiAgICAgICAgaWYod2lkdGg8PW1heFdpZHRoKXtcbiAgICAgICAgICAgIGluZm89e3dpZHRoLCBjb250ZW50V2lkdGg6d2lkdGgsIGVuZDp0aGlzLmNvbXBvc2VkKz10ZXh0Lmxlbmd0aCwgY2hpbGRyZW46dGV4dH1cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0ZXh0PXRleHQuc3Vic3RyKDAsTWF0aC5mbG9vcih0ZXh0Lmxlbmd0aCptYXhXaWR0aC93aWR0aCkpXG4gICAgICAgICAgICB3aWR0aD10aGlzLnN0cmluZ1dpZHRoKHRleHQpXG5cbiAgICAgICAgICAgIGlmKHdpZHRoPT1tYXhXaWR0aCl7XG4gICAgICAgICAgICAgICAgaW5mbz17d2lkdGgsIGVuZDp0aGlzLmNvbXBvc2VkKz10ZXh0Lmxlbmd0aCwgY2hpbGRyZW46dGV4dH1cbiAgICAgICAgICAgIH1lbHNlIGlmKHdpZHRoPG1heFdpZHRoKXtcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXg9dGhpcy5jb21wb3NlZCt0ZXh0Lmxlbmd0aCwgbGVuPXRoaXMudGV4dC5sZW5ndGhcbiAgICAgICAgICAgICAgICB3aGlsZSh3aWR0aD5tYXhXaWR0aCAmJiBpbmRleDxsZW4pXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoPXRoaXMuc3RyaW5nV2lkdGgodGV4dCs9dGhpcy50ZXh0LmNoYXJBdChpbmRleCsrKSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd2hpbGUod2lkdGg+bWF4V2lkdGggJiYgdGV4dC5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoPXRoaXMuc3RyaW5nV2lkdGgodGV4dD10ZXh0LnNsaWNlKDAsLTEpKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZih0ZXh0Lmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgaW5mbz17d2lkdGg6bWF4V2lkdGgsIGNvbnRlbnRXaWR0aDogd2lkdGgsIGVuZDp0aGlzLmNvbXBvc2VkKz10ZXh0Lmxlbmd0aCwgY2hpbGRyZW46dGV4dH1cbiAgICAgICAgICAgIH1lbHNley8vQFRPRE86IHRoZSBzcGFjZSBpcyB0b28gc21hbGwsIGdpdmUgYSBwbGFjZWhvbGRlclxuICAgICAgICAgICAgICAgIGluZm89e3dpZHRoOm1heFdpZHRoLCBjb250ZW50V2lkdGg6MCwgZW5kOnRoaXMuY29tcG9zZWQrPXRleHQubGVuZ3RoLCBjaGlsZHJlbjp0ZXh0fVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5pbmZvKGB0ZXh0IGNvbXBvc2VyIHRvdGFsIHRpbWU6ICR7X3RleHRDb21wb3NlclRpbWUrPShEYXRlLm5vdygpLXN0YXJ0QXQpfWApXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKGluZm8se1xuXHRcdFx0XHRmb250RmFtaWx5OnRoaXMuZm9udEZhbWlseSxcblx0XHRcdFx0Zm9udFNpemU6dGhpcy5zaXplLFxuXHRcdFx0XHRoZWlnaHQ6dGhpcy5oZWlnaHRcblx0XHRcdH0pXG4gICAgfVxufVxuIl19