'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _textComposerTime = 0;

var WordWrapper = function () {
    function WordWrapper(text, style) {
        _classCallCheck(this, WordWrapper);

        var rFonts = style.rFonts;
        var fontSize = style.sz;

        this.style = style;
        this.text = text;
        this.fontFamily = Object.keys(rFonts).map(function (a) {
            return '' + (typeof rFonts[a] == 'string' ? rFonts[a] : '');
        }).filter(function (a) {
            return a;
        }).join(" ");
        this.size = fontSize;

        var _lineHeight = this.lineHeight();

        var height = _lineHeight.height;
        var descent = _lineHeight.descent;

        this.height = Math.ceil(height);
        this.descent = Math.ceil(descent);
        this.composed = 0;
    }

    _createClass(WordWrapper, [{
        key: 'lineHeight',
        value: function lineHeight() {
            return { height: 25, descent: 2 };
        }
    }, {
        key: 'stringWidth',
        value: function stringWidth(string) {
            return 200;
        }
    }, {
        key: 'next',
        value: function next(_ref) {
            var maxWidth = _ref.width;

            if (maxWidth == undefined) throw new Error("no max width specified when composing text");

            if (this.composed == this.text.length) return null;

            var startAt = Date.now();

            var text = null,
                info = null;
            var width = this.stringWidth(text = this.text.substr(this.composed));
            if (width <= maxWidth) {
                info = { width: width, contentWidth: width, end: this.composed += text.length, children: text };
            } else {
                var smartTypeText = text.substr(0, Math.floor(text.length * maxWidth / width));
                if (smartTypeText.length > 0) {
                    width = this.stringWidth(text = smartTypeText);
                }

                if (width == maxWidth) {
                    info = { width: width, contentWidth: width, end: this.composed += text.length, children: text };
                } else if (width < maxWidth) {
                    var index = this.composed + text.length,
                        len = this.text.length;
                    while (width < maxWidth && index < len) {
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

            info.width = Math.ceil(info.width);
            return Object.assign(info, { fontFamily: this.fontFamily });
        }
    }]);

    return WordWrapper;
}();

exports.default = WordWrapper;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93b3Jkd3JhcC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBSSxvQkFBa0IsQ0FBbEI7O0lBQ2lCO0FBQ2pCLGFBRGlCLFdBQ2pCLENBQVksSUFBWixFQUFrQixLQUFsQixFQUF3Qjs4QkFEUCxhQUNPOztZQUNuQixTQUFxQixNQUFyQixPQURtQjtZQUNSLFdBQVUsTUFBYixHQURXOztBQUUxQixhQUFLLEtBQUwsR0FBVyxLQUFYLENBRjBCO0FBR3BCLGFBQUssSUFBTCxHQUFVLElBQVYsQ0FIb0I7QUFJcEIsYUFBSyxVQUFMLEdBQWdCLE9BQU8sSUFBUCxDQUFZLE1BQVosRUFBb0IsR0FBcEIsQ0FBd0I7eUJBQU0sT0FBTyxPQUFPLENBQVAsQ0FBUCxJQUFtQixRQUFuQixHQUE2QixPQUFPLENBQVAsQ0FBN0IsR0FBeUMsRUFBekM7U0FBTixDQUF4QixDQUNYLE1BRFcsQ0FDSjttQkFBRztTQUFILENBREksQ0FDRSxJQURGLENBQ08sR0FEUCxDQUFoQixDQUpvQjtBQU0xQixhQUFLLElBQUwsR0FBVSxRQUFWLENBTjBCOzswQkFPRixLQUFLLFVBQUwsR0FQRTs7WUFPbkIsNEJBUG1CO1lBT1gsOEJBUFc7O0FBUXBCLGFBQUssTUFBTCxHQUFZLEtBQUssSUFBTCxDQUFVLE1BQVYsQ0FBWixDQVJvQjtBQVMxQixhQUFLLE9BQUwsR0FBYSxLQUFLLElBQUwsQ0FBVSxPQUFWLENBQWIsQ0FUMEI7QUFVcEIsYUFBSyxRQUFMLEdBQWMsQ0FBZCxDQVZvQjtLQUF4Qjs7aUJBRGlCOztxQ0FjUjtBQUNYLG1CQUFPLEVBQUMsUUFBTyxFQUFQLEVBQVUsU0FBUSxDQUFSLEVBQWxCLENBRFc7Ozs7b0NBSUEsUUFBTztBQUNsQixtQkFBTyxHQUFQLENBRGtCOzs7O21DQUlNO2dCQUFWLGdCQUFOLE1BQWdCOztBQUNsQixnQkFBRyxZQUFVLFNBQVYsRUFDUixNQUFNLElBQUksS0FBSixDQUFVLDRDQUFWLENBQU4sQ0FESzs7QUFHTixnQkFBRyxLQUFLLFFBQUwsSUFBZSxLQUFLLElBQUwsQ0FBVSxNQUFWLEVBQ1IsT0FBTyxJQUFQLENBRFY7O0FBR00sZ0JBQUksVUFBUSxLQUFLLEdBQUwsRUFBUixDQVBjOztBQVNsQixnQkFBSSxPQUFLLElBQUw7Z0JBQVUsT0FBSyxJQUFMLENBVEk7QUFVbEIsZ0JBQUksUUFBTSxLQUFLLFdBQUwsQ0FBaUIsT0FBSyxLQUFLLElBQUwsQ0FBVSxNQUFWLENBQWlCLEtBQUssUUFBTCxDQUF0QixDQUF2QixDQVZjO0FBV2xCLGdCQUFHLFNBQU8sUUFBUCxFQUFnQjtBQUNmLHVCQUFLLEVBQUMsWUFBRCxFQUFRLGNBQWEsS0FBYixFQUFvQixLQUFJLEtBQUssUUFBTCxJQUFlLEtBQUssTUFBTCxFQUFhLFVBQVMsSUFBVCxFQUFqRSxDQURlO2FBQW5CLE1BRUs7QUFDRCxvQkFBSSxnQkFBYyxLQUFLLE1BQUwsQ0FBWSxDQUFaLEVBQWMsS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLEdBQVksUUFBWixHQUFxQixLQUFyQixDQUF6QixDQUFkLENBREg7QUFFVixvQkFBRyxjQUFjLE1BQWQsR0FBcUIsQ0FBckIsRUFBdUI7QUFDekIsNEJBQU0sS0FBSyxXQUFMLENBQWlCLE9BQUssYUFBTCxDQUF2QixDQUR5QjtpQkFBMUI7O0FBSVMsb0JBQUcsU0FBTyxRQUFQLEVBQWdCO0FBQ2YsMkJBQUssRUFBQyxZQUFELEVBQVEsY0FBYyxLQUFkLEVBQXFCLEtBQUksS0FBSyxRQUFMLElBQWUsS0FBSyxNQUFMLEVBQWEsVUFBUyxJQUFULEVBQWxFLENBRGU7aUJBQW5CLE1BRU0sSUFBRyxRQUFNLFFBQU4sRUFBZTtBQUNwQix3QkFBSSxRQUFNLEtBQUssUUFBTCxHQUFjLEtBQUssTUFBTDt3QkFBYSxNQUFJLEtBQUssSUFBTCxDQUFVLE1BQVYsQ0FEckI7QUFFcEIsMkJBQU0sUUFBTSxRQUFOLElBQWtCLFFBQU0sR0FBTjtBQUNwQixnQ0FBTSxLQUFLLFdBQUwsQ0FBaUIsUUFBTSxLQUFLLElBQUwsQ0FBVSxNQUFWLENBQWlCLE9BQWpCLENBQU4sQ0FBdkI7cUJBREo7aUJBRkUsTUFJQztBQUNILDJCQUFNLFFBQU0sUUFBTixJQUFrQixLQUFLLE1BQUw7QUFDcEIsZ0NBQU0sS0FBSyxXQUFMLENBQWlCLE9BQUssS0FBSyxLQUFMLENBQVcsQ0FBWCxFQUFhLENBQUMsQ0FBRCxDQUFsQixDQUF2QjtxQkFESjtpQkFMRTs7QUFTTixvQkFBRyxLQUFLLE1BQUwsRUFBWTtBQUNYLDJCQUFLLEVBQUMsT0FBTSxRQUFOLEVBQWdCLGNBQWMsS0FBZCxFQUFxQixLQUFJLEtBQUssUUFBTCxJQUFlLEtBQUssTUFBTCxFQUFhLFVBQVMsSUFBVCxFQUEzRSxDQURXO2lCQUFmLE1BRUs7O0FBQ0QsMkJBQUssRUFBQyxPQUFNLFFBQU4sRUFBZ0IsY0FBYSxDQUFiLEVBQWdCLEtBQUksS0FBSyxRQUFMLElBQWUsS0FBSyxNQUFMLEVBQWEsVUFBUyxJQUFULEVBQXRFLENBREM7aUJBRkw7YUFuQko7O0FBMEJOLGlCQUFLLEtBQUwsR0FBVyxLQUFLLElBQUwsQ0FBVSxLQUFLLEtBQUwsQ0FBckIsQ0FyQ3dCO0FBc0NsQixtQkFBTyxPQUFPLE1BQVAsQ0FBYyxJQUFkLEVBQW1CLEVBQUMsWUFBVyxLQUFLLFVBQUwsRUFBL0IsQ0FBUCxDQXRDa0I7Ozs7V0F0QkwiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX3RleHRDb21wb3NlclRpbWU9MFxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV29yZFdyYXBwZXJ7XG4gICAgY29uc3RydWN0b3IodGV4dCwgc3R5bGUpe1xuXHRcdGNvbnN0IHtyRm9udHMsIHN6OmZvbnRTaXplfT1zdHlsZVxuXHRcdHRoaXMuc3R5bGU9c3R5bGVcbiAgICAgICAgdGhpcy50ZXh0PXRleHRcbiAgICAgICAgdGhpcy5mb250RmFtaWx5PU9iamVjdC5rZXlzKHJGb250cykubWFwKGE9PmAke3R5cGVvZihyRm9udHNbYV0pPT0nc3RyaW5nJz8gckZvbnRzW2FdIDogJyd9YClcbiAgICAgICAgICAgIC5maWx0ZXIoYT0+YSkuam9pbihcIiBcIilcblx0XHR0aGlzLnNpemU9Zm9udFNpemVcblx0XHRjb25zdCB7aGVpZ2h0LCBkZXNjZW50fT10aGlzLmxpbmVIZWlnaHQoKVxuICAgICAgICB0aGlzLmhlaWdodD1NYXRoLmNlaWwoaGVpZ2h0KVxuXHRcdHRoaXMuZGVzY2VudD1NYXRoLmNlaWwoZGVzY2VudClcbiAgICAgICAgdGhpcy5jb21wb3NlZD0wXG4gICAgfVxuXG5cdGxpbmVIZWlnaHQoKXtcblx0XHRyZXR1cm4ge2hlaWdodDoyNSxkZXNjZW50OjJ9XG5cdH1cblxuXHRzdHJpbmdXaWR0aChzdHJpbmcpe1xuXHRcdHJldHVybiAyMDBcblx0fVxuXG4gICAgbmV4dCh7d2lkdGg6bWF4V2lkdGh9KXtcbiAgICAgICAgaWYobWF4V2lkdGg9PXVuZGVmaW5lZClcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIm5vIG1heCB3aWR0aCBzcGVjaWZpZWQgd2hlbiBjb21wb3NpbmcgdGV4dFwiKVxuXG5cdFx0aWYodGhpcy5jb21wb3NlZD09dGhpcy50ZXh0Lmxlbmd0aClcbiAgICAgICAgICAgIHJldHVybiBudWxsXG5cbiAgICAgICAgbGV0IHN0YXJ0QXQ9RGF0ZS5ub3coKVxuXG4gICAgICAgIGxldCB0ZXh0PW51bGwsaW5mbz1udWxsXG4gICAgICAgIGxldCB3aWR0aD10aGlzLnN0cmluZ1dpZHRoKHRleHQ9dGhpcy50ZXh0LnN1YnN0cih0aGlzLmNvbXBvc2VkKSlcbiAgICAgICAgaWYod2lkdGg8PW1heFdpZHRoKXtcbiAgICAgICAgICAgIGluZm89e3dpZHRoLCBjb250ZW50V2lkdGg6d2lkdGgsIGVuZDp0aGlzLmNvbXBvc2VkKz10ZXh0Lmxlbmd0aCwgY2hpbGRyZW46dGV4dH1cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBsZXQgc21hcnRUeXBlVGV4dD10ZXh0LnN1YnN0cigwLE1hdGguZmxvb3IodGV4dC5sZW5ndGgqbWF4V2lkdGgvd2lkdGgpKVxuXHRcdFx0aWYoc21hcnRUeXBlVGV4dC5sZW5ndGg+MCl7XG5cdFx0XHRcdHdpZHRoPXRoaXMuc3RyaW5nV2lkdGgodGV4dD1zbWFydFR5cGVUZXh0KVxuXHRcdFx0fVxuXG4gICAgICAgICAgICBpZih3aWR0aD09bWF4V2lkdGgpe1xuICAgICAgICAgICAgICAgIGluZm89e3dpZHRoLCBjb250ZW50V2lkdGg6IHdpZHRoLCBlbmQ6dGhpcy5jb21wb3NlZCs9dGV4dC5sZW5ndGgsIGNoaWxkcmVuOnRleHR9XG4gICAgICAgICAgICB9ZWxzZSBpZih3aWR0aDxtYXhXaWR0aCl7XG4gICAgICAgICAgICAgICAgbGV0IGluZGV4PXRoaXMuY29tcG9zZWQrdGV4dC5sZW5ndGgsIGxlbj10aGlzLnRleHQubGVuZ3RoXG4gICAgICAgICAgICAgICAgd2hpbGUod2lkdGg8bWF4V2lkdGggJiYgaW5kZXg8bGVuKVxuICAgICAgICAgICAgICAgICAgICB3aWR0aD10aGlzLnN0cmluZ1dpZHRoKHRleHQrPXRoaXMudGV4dC5jaGFyQXQoaW5kZXgrKykpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHdoaWxlKHdpZHRoPm1heFdpZHRoICYmIHRleHQubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICB3aWR0aD10aGlzLnN0cmluZ1dpZHRoKHRleHQ9dGV4dC5zbGljZSgwLC0xKSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYodGV4dC5sZW5ndGgpe1xuICAgICAgICAgICAgICAgIGluZm89e3dpZHRoOm1heFdpZHRoLCBjb250ZW50V2lkdGg6IHdpZHRoLCBlbmQ6dGhpcy5jb21wb3NlZCs9dGV4dC5sZW5ndGgsIGNoaWxkcmVuOnRleHR9XG4gICAgICAgICAgICB9ZWxzZXsvL0BUT0RPOiB0aGUgc3BhY2UgaXMgdG9vIHNtYWxsLCBnaXZlIGEgcGxhY2Vob2xkZXJcbiAgICAgICAgICAgICAgICBpbmZvPXt3aWR0aDptYXhXaWR0aCwgY29udGVudFdpZHRoOjAsIGVuZDp0aGlzLmNvbXBvc2VkKz10ZXh0Lmxlbmd0aCwgY2hpbGRyZW46dGV4dH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cdFx0aW5mby53aWR0aD1NYXRoLmNlaWwoaW5mby53aWR0aClcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oaW5mbyx7Zm9udEZhbWlseTp0aGlzLmZvbnRGYW1pbHl9KVxuICAgIH1cbn1cbiJdfQ==