'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _client = require('soundworks/client');

var soundworks = _interopRequireWildcard(_client);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var client = soundworks.client;

var template = '\n  <div class="background fit-container">\n    <div id="background-image" class="fit-container"></div>\n    <div id="background-color" class="fit-container"></div>\n  </div>\n  <div class="foreground">\n    <div class="section-top flex-middle" id="top">\n    </div>\n    <div class="section-center flex-middle" id="center">\n    </div>\n    <div class="section-bottom flex-middle" id="bottom">\n    </div>\n  </div>\n  <% if (state === \'choice\') { %>\n  <div id="choice">\n    <button id="restart"><%= txt.restart %></button>\n    <button id="continue"><%= txt.continue %></button>\n  </div>\n  <% } %>\n';

var PlayerView = function (_soundworks$Segmented) {
  (0, _inherits3.default)(PlayerView, _soundworks$Segmented);

  function PlayerView(model) {
    (0, _classCallCheck3.default)(this, PlayerView);
    return (0, _possibleConstructorReturn3.default)(this, (PlayerView.__proto__ || (0, _getPrototypeOf2.default)(PlayerView)).call(this, template, model, {}, {
      id: 'experience',
      ratios: {
        '.section-top': 0.1,
        '.section-center': 0.8,
        '.section-bottom': 0.1
      }
    }));
  }

  (0, _createClass3.default)(PlayerView, [{
    key: 'onRender',
    value: function onRender() {
      (0, _get3.default)(PlayerView.prototype.__proto__ || (0, _getPrototypeOf2.default)(PlayerView.prototype), 'onRender', this).call(this);

      this.$placeholders = {};
      this.$placeholders['top'] = this.$el.querySelector('#top');
      this.$placeholders['center'] = this.$el.querySelector('#center');
      this.$placeholders['bottom'] = this.$el.querySelector('#bottom');
      this.$placeholders['background-color'] = this.$el.querySelector('#background-color');
      this.$placeholders['background-image'] = this.$el.querySelector('#background-image');
      this.$placeholders['background-video'] = this.$el.querySelector('#background-video');
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.setTextContent('top', '');
      this.setTextContent('center', '');
      this.setTextContent('bottom', '');
      this.$placeholders['top'].style.opacity = 1;
      this.$placeholders['center'].style.opacity = 1;
      this.$placeholders['bottom'].style.opacity = 1;
      // make sure client can't click twice (during trigger-next-state event)
      this.installEvents({}, true);
    }
  }, {
    key: 'setId',
    value: function setId(id) {
      this.$el.dataset.id = 'state-' + id;
    }
  }, {
    key: 'setBackgroundColor',
    value: function setBackgroundColor(placeholder, color) {
      this.$placeholders[placeholder].style.backgroundColor = color;
    }
  }, {
    key: 'setBackgroundImage',
    value: function setBackgroundImage(placeholder, url) {
      this.$placeholders[placeholder].style.backgroundImage = 'url(' + url + ')';
    }
  }, {
    key: 'setTextContent',
    value: function setTextContent(placeholder, content) {
      var classes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

      var $el = this.$placeholders[placeholder];
      // classes that should never be removed
      var forbiddenClasses = ['section-top', 'section-center', 'section-bottom', 'flex-middle'];

      for (var i = $el.classList.length - 1; i >= 0; i--) {
        var className = $el.classList.item(i);

        if (forbiddenClasses.indexOf(className) === -1) $el.classList.remove(className);
      }

      classes.forEach(function (className) {
        return $el.classList.add(className);
      });

      $el.innerHTML = '<div>' + content + '</div>';
    }
  }, {
    key: 'fadeIn',
    value: function fadeIn(placeholder, duration) {
      var $el = this.$placeholders[placeholder];

      $el.style.transition = 'opacity ' + duration + 's';
      $el.style.opacity = 1;
    }
  }, {
    key: 'fadeOut',
    value: function fadeOut(placeholder, duration) {
      var $el = this.$placeholders[placeholder];

      $el.style.transition = 'opacity ' + duration + 's';
      $el.style.opacity = 0;
    }
  }, {
    key: 'setEvent',
    value: function setEvent(placeholder, callback) {
      var key = client.platform.interaction === 'touch' ? 'touchstart' : 'mousedown';

      if (placeholder !== 'screen') key += ' #' + placeholder;

      this.installEvents((0, _defineProperty3.default)({}, key, callback), true);
    }
  }]);
  return PlayerView;
}(soundworks.SegmentedView);

exports.default = PlayerView;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlBsYXllclZpZXcuanMiXSwibmFtZXMiOlsic291bmR3b3JrcyIsImNsaWVudCIsInRlbXBsYXRlIiwiUGxheWVyVmlldyIsIm1vZGVsIiwiaWQiLCJyYXRpb3MiLCIkcGxhY2Vob2xkZXJzIiwiJGVsIiwicXVlcnlTZWxlY3RvciIsInNldFRleHRDb250ZW50Iiwic3R5bGUiLCJvcGFjaXR5IiwiaW5zdGFsbEV2ZW50cyIsImRhdGFzZXQiLCJwbGFjZWhvbGRlciIsImNvbG9yIiwiYmFja2dyb3VuZENvbG9yIiwidXJsIiwiYmFja2dyb3VuZEltYWdlIiwiY29udGVudCIsImNsYXNzZXMiLCJmb3JiaWRkZW5DbGFzc2VzIiwiaSIsImNsYXNzTGlzdCIsImxlbmd0aCIsImNsYXNzTmFtZSIsIml0ZW0iLCJpbmRleE9mIiwicmVtb3ZlIiwiZm9yRWFjaCIsImFkZCIsImlubmVySFRNTCIsImR1cmF0aW9uIiwidHJhbnNpdGlvbiIsImNhbGxiYWNrIiwia2V5IiwicGxhdGZvcm0iLCJpbnRlcmFjdGlvbiIsIlNlZ21lbnRlZFZpZXciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7SUFBWUEsVTs7Ozs7O0FBRVosSUFBTUMsU0FBU0QsV0FBV0MsTUFBMUI7O0FBRUEsSUFBTUMsNG1CQUFOOztJQXFCTUMsVTs7O0FBQ0osc0JBQVlDLEtBQVosRUFBbUI7QUFBQTtBQUFBLHlJQUNYRixRQURXLEVBQ0RFLEtBREMsRUFDTSxFQUROLEVBQ1U7QUFDekJDLFVBQUksWUFEcUI7QUFFekJDLGNBQVE7QUFDTix3QkFBZ0IsR0FEVjtBQUVOLDJCQUFtQixHQUZiO0FBR04sMkJBQW1CO0FBSGI7QUFGaUIsS0FEVjtBQVNsQjs7OzsrQkFFVTtBQUNUOztBQUVBLFdBQUtDLGFBQUwsR0FBcUIsRUFBckI7QUFDQSxXQUFLQSxhQUFMLENBQW1CLEtBQW5CLElBQTRCLEtBQUtDLEdBQUwsQ0FBU0MsYUFBVCxDQUF1QixNQUF2QixD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LEtBQUtELGFBQUwsQ0FBbUJRLFdBQW5CLENBQVo7O0FBRUFQLFVBQUlHLEtBQUosQ0FBVXVCLFVBQVYsZ0JBQWtDRCxRQUFsQztBQUNBekIsVUFBSUcsS0FBSixDQUFVQyxPQUFWLEdBQW9CLENBQXBCO0FBQ0Q7Ozs2QkFFUUcsVyxFQUFhb0IsUSxFQUFVO0FBQzlCLFVBQUlDLE1BQU1uQyxPQUFPb0MsUUFBUCxDQUFnQkMsV0FBaEIsS0FBZ0MsT0FBaEMsR0FBMEMsWUFBMUMsR0FBeUQsV0FBbkU7O0FBRUEsVUFBSXZCLGdCQUFnQixRQUFwQixFQUNFcUIsY0FBWXJCLFdBQVo7O0FBRUYsV0FBS0YsYUFBTCxtQ0FBc0J1QixHQUF0QixFQUE0QkQsUUFBNUIsR0FBd0MsSUFBeEM7QUFDRDs7O0VBckZzQm5DLFdBQVd1QyxhOztrQkF3RnJCcEMsVSIsImZpbGUiOiJQbGF5ZXJWaWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgc291bmR3b3JrcyBmcm9tICdzb3VuZHdvcmtzL2NsaWVudCc7XG5cbmNvbnN0IGNsaWVudCA9IHNvdW5kd29ya3MuY2xpZW50O1xuXG5jb25zdCB0ZW1wbGF0ZSA9IGBcbiAgPGRpdiBjbGFzcz1cImJhY2tncm91bmQgZml0LWNvbnRhaW5lclwiPlxuICAgIDxkaXYgaWQ9XCJiYWNrZ3JvdW5kLWltYWdlXCIgY2xhc3M9XCJmaXQtY29udGFpbmVyXCI+PC9kaXY+XG4gICAgPGRpdiBpZD1cImJhY2tncm91bmQtY29sb3JcIiBjbGFzcz1cImZpdC1jb250YWluZXJcIj48L2Rpdj5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJmb3JlZ3JvdW5kXCI+XG4gICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tdG9wIGZsZXgtbWlkZGxlXCIgaWQ9XCJ0b3BcIj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi1jZW50ZXIgZmxleC1taWRkbGVcIiBpZD1cImNlbnRlclwiPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uLWJvdHRvbSBmbGV4LW1pZGRsZVwiIGlkPVwiYm90dG9tXCI+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuICA8JSBpZiAoc3RhdGUgPT09ICdjaG9pY2UnKSB7ICU+XG4gIDxkaXYgaWQ9XCJjaG9pY2VcIj5cbiAgICA8YnV0dG9uIGlkPVwicmVzdGFydFwiPjwlPSB0eHQucmVzdGFydCAlPjwvYnV0dG9uPlxuICAgIDxidXR0b24gaWQ9XCJjb250aW51ZVwiPjwlPSB0eHQuY29udGludWUgJT48L2J1dHRvbj5cbiAgPC9kaXY+XG4gIDwlIH0gJT5cbmA7XG5cbmNsYXNzIFBsYXllclZpZXcgZXh0ZW5kcyBzb3VuZHdvcmtzLlNlZ21lbnRlZFZpZXcge1xuICBjb25zdHJ1Y3Rvcihtb2RlbCkge1xuICAgIHN1cGVyKHRlbXBsYXRlLCBtb2RlbCwge30sIHtcbiAgICAgIGlkOiAnZXhwZXJpZW5jZScsXG4gICAgICByYXRpb3M6IHtcbiAgICAgICAgJy5zZWN0aW9uLXRvcCc6IDAuMSxcbiAgICAgICAgJy5zZWN0aW9uLWNlbnRlcic6IDAuOCxcbiAgICAgICAgJy5zZWN0aW9uLWJvdHRvbSc6IDAuMVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgb25SZW5kZXIoKSB7XG4gICAgc3VwZXIub25SZW5kZXIoKTtcblxuICAgIHRoaXMuJHBsYWNlaG9sZGVycyA9IHt9O1xuICAgIHRoaXMuJHBsYWNlaG9sZGVyc1sndG9wJ10gPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcjdG9wJyk7XG4gICAgdGhpcy4kcGxhY2Vob2xkZXJzWydjZW50ZXInXSA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJyNjZW50ZXInKTtcbiAgICB0aGlzLiRwbGFjZWhvbGRlcnNbJ2JvdHRvbSddID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignI2JvdHRvbScpO1xuICAgIHRoaXMuJHBsYWNlaG9sZGVyc1snYmFja2dyb3VuZC1jb2xvciddID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignI2JhY2tncm91bmQtY29sb3InKTtcbiAgICB0aGlzLiRwbGFjZWhvbGRlcnNbJ2JhY2tncm91bmQtaW1hZ2UnXSA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJyNiYWNrZ3JvdW5kLWltYWdlJyk7XG4gICAgdGhpcy4kcGxhY2Vob2xkZXJzWydiYWNrZ3JvdW5kLXZpZGVvJ10gPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcjYmFja2dyb3VuZC12aWRlbycpO1xuICB9XG5cbiAgY2xlYXIoKSB7XG4gICAgdGhpcy5zZXRUZXh0Q29udGVudCgndG9wJywgJycpO1xuICAgIHRoaXMuc2V0VGV4dENvbnRlbnQoJ2NlbnRlcicsICcnKTtcbiAgICB0aGlzLnNldFRleHRDb250ZW50KCdib3R0b20nLCAnJyk7XG4gICAgdGhpcy4kcGxhY2Vob2xkZXJzWyd0b3AnXS5zdHlsZS5vcGFjaXR5ID0gMTtcbiAgICB0aGlzLiRwbGFjZWhvbGRlcnNbJ2NlbnRlciddLnN0eWxlLm9wYWNpdHkgPSAxO1xuICAgIHRoaXMuJHBsYWNlaG9sZGVyc1snYm90dG9tJ10uc3R5bGUub3BhY2l0eSA9IDE7XG4gICAgLy8gbWFrZSBzdXJlIGNsaWVudCBjYW4ndCBjbGljayB0d2ljZSAoZHVyaW5nIHRyaWdnZXItbmV4dC1zdGF0ZSBldmVudClcbiAgICB0aGlzLmluc3RhbGxFdmVudHMoe30sIHRydWUpO1xuICB9XG5cbiAgc2V0SWQoaWQpIHtcbiAgICB0aGlzLiRlbC5kYXRhc2V0LmlkID0gYHN0YXRlLSR7aWR9YDtcbiAgfVxuXG4gIHNldEJhY2tncm91bmRDb2xvcihwbGFjZWhvbGRlciwgY29sb3IpIHtcbiAgICB0aGlzLiRwbGFjZWhvbGRlcnNbcGxhY2Vob2xkZXJdLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGNvbG9yO1xuICB9XG5cbiAgc2V0QmFja2dyb3VuZEltYWdlKHBsYWNlaG9sZGVyLCB1cmwpIHtcbiAgICB0aGlzLiRwbGFjZWhvbGRlcnNbcGxhY2Vob2xkZXJdLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJHt1cmx9KWA7XG4gIH1cblxuICBzZXRUZXh0Q29udGVudChwbGFjZWhvbGRlciwgY29udGVudCwgY2xhc3NlcyA9IFtdKSB7XG4gICAgY29uc3QgJGVsID0gdGhpcy4kcGxhY2Vob2xkZXJzW3BsYWNlaG9sZGVyXTtcbiAgICAvLyBjbGFzc2VzIHRoYXQgc2hvdWxkIG5ldmVyIGJlIHJlbW92ZWRcbiAgICBjb25zdCBmb3JiaWRkZW5DbGFzc2VzID0gWydzZWN0aW9uLXRvcCcsICdzZWN0aW9uLWNlbnRlcicsICdzZWN0aW9uLWJvdHRvbScsICdmbGV4LW1pZGRsZSddO1xuXG4gICAgZm9yIChsZXQgaSA9ICRlbC5jbGFzc0xpc3QubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIGNvbnN0IGNsYXNzTmFtZSA9ICRlbC5jbGFzc0xpc3QuaXRlbShpKTtcblxuICAgICAgaWYgKGZvcmJpZGRlbkNsYXNzZXMuaW5kZXhPZihjbGFzc05hbWUpID09PSAtMSlcbiAgICAgICAgJGVsLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICB9XG5cbiAgICBjbGFzc2VzLmZvckVhY2goY2xhc3NOYW1lID0+ICRlbC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSkpO1xuXG4gICAgJGVsLmlubmVySFRNTCA9IGA8ZGl2PiR7Y29udGVudH08L2Rpdj5gO1xuICB9XG5cbiAgZmFkZUluKHBsYWNlaG9sZGVyLCBkdXJhdGlvbikge1xuICAgIGNvbnN0ICRlbCA9IHRoaXMuJHBsYWNlaG9sZGVyc1twbGFjZWhvbGRlcl07XG5cbiAgICAkZWwuc3R5bGUudHJhbnNpdGlvbiA9IGBvcGFjaXR5ICR7ZHVyYXRpb259c2A7XG4gICAgJGVsLnN0eWxlLm9wYWNpdHkgPSAxO1xuICB9XG5cbiAgZmFkZU91dChwbGFjZWhvbGRlciwgZHVyYXRpb24pIHtcbiAgICBjb25zdCAkZWwgPSB0aGlzLiRwbGFjZWhvbGRlcnNbcGxhY2Vob2xkZXJdO1xuXG4gICAgJGVsLnN0eWxlLnRyYW5zaXRpb24gPSBgb3BhY2l0eSAke2R1cmF0aW9ufXNgO1xuICAgICRlbC5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgfVxuXG4gIHNldEV2ZW50KHBsYWNlaG9sZGVyLCBjYWxsYmFjaykge1xuICAgIGxldCBrZXkgPSBjbGllbnQucGxhdGZvcm0uaW50ZXJhY3Rpb24gPT09ICd0b3VjaCcgPyAndG91Y2hzdGFydCcgOiAnbW91c2Vkb3duJztcblxuICAgIGlmIChwbGFjZWhvbGRlciAhPT0gJ3NjcmVlbicpXG4gICAgICBrZXkgKz0gYCAjJHtwbGFjZWhvbGRlcn1gO1xuXG4gICAgdGhpcy5pbnN0YWxsRXZlbnRzKHsgW2tleV06IGNhbGxiYWNrIH0sIHRydWUpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllclZpZXc7XG4iXX0=