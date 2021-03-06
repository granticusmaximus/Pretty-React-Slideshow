"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var TWEEN = _interopRequireWildcard(require("@tweenjs/tween.js"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _helpers = require("../../helpers.js");

require("./slide.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Slideshow =
/*#__PURE__*/
function (_Component) {
  _inherits(Slideshow, _Component);

  function Slideshow(props) {
    var _this;

    _classCallCheck(this, Slideshow);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Slideshow).call(this, props));
    _this.state = {
      index: 0
    };
    _this.width = 0;
    _this.imageContainer = null;
    _this.timeout = null;
    _this.moveSlides = _this.moveSlides.bind(_assertThisInitialized(_this));
    _this.resizeListener = _this.resizeListener.bind(_assertThisInitialized(_this));
    _this.goToSlide = _this.goToSlide.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Slideshow, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.setWidth();
      window.addEventListener("resize", this.resizeListener);
      var _this$props = this.props,
          autoplay = _this$props.autoplay,
          duration = _this$props.duration;

      if (autoplay) {
        this.timeout = setTimeout(function () {
          return _this2.goNext();
        }, duration);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.willUnmount = true;
      clearTimeout(this.timeout);
      window.removeEventListener("resize", this.resizeListener);
    }
  }, {
    key: "setWidth",
    value: function setWidth() {
      // the .slice.call was needed to support ie11
      this.allImages = Array.prototype.slice.call(document.querySelectorAll(".images-wrap > div"), 0);
      var parent = "div.".concat(this.props.parentClassName);
      this.width = document.querySelector(parent, ".react-slideshow-wrapper").clientWidth;
      var fullwidth = this.width * (this.props.children.length + 2);
      this.imageContainer.style.width = "".concat(fullwidth, "px");
      this.imageContainer.style.transform = "translate(-".concat(this.width * (this.state.index + 1), "px)");
      this.applySlideStyle();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(props) {
      if (this.props.children.length != props.children.length) {
        this.setWidth();
      }
    }
  }, {
    key: "resizeListener",
    value: function resizeListener() {
      var parent = "div.".concat(this.props.parentClassName);
      this.width = document.querySelector(parent, ".react-slideshow-wrapper").clientWidth;
      this.setWidth();
    }
  }, {
    key: "applySlideStyle",
    value: function applySlideStyle() {
      var _this3 = this;

      this.allImages.forEach(function (eachImage, index) {
        eachImage.style.width = "".concat(_this3.width, "px");
      });
    }
  }, {
    key: "moveSlides",
    value: function moveSlides(_ref) {
      var dataset = _ref.currentTarget.dataset;

      if (dataset.type === "next") {
        this.goNext();
      } else {
        this.goBack();
      }
    }
  }, {
    key: "goToSlide",
    value: function goToSlide(_ref2) {
      var target = _ref2.target;
      this.goTo(parseInt(target.dataset.key));
    }
  }, {
    key: "goTo",
    value: function goTo(index) {
      this.slideImages(index);
    }
  }, {
    key: "goNext",
    value: function goNext() {
      var index = this.state.index;
      var _this$props2 = this.props,
          children = _this$props2.children,
          infinite = _this$props2.infinite;

      if (!infinite && index === children.length - 1) {
        return;
      }

      this.slideImages(index + 1);
    }
  }, {
    key: "goBack",
    value: function goBack() {
      var index = this.state.index;
      var infinite = this.props.infinite;

      if (!infinite && index === 0) {
        return;
      }

      this.slideImages(index - 1);
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props3 = this.props,
          children = _this$props3.children,
          infinite = _this$props3.infinite,
          indicators = _this$props3.indicators,
          arrows = _this$props3.arrows;
      var unhandledProps = (0, _helpers.getUnhandledProps)(Slideshow.propTypes, this.props);
      var index = this.state.index;
      var style = {
        transform: "translate(-".concat((index + 1) * this.width, "px)")
      };
      return _react["default"].createElement("div", unhandledProps, _react["default"].createElement("div", {
        className: "react-slideshow-container"
      }, arrows && _react["default"].createElement("div", {
        className: "nav ".concat(index <= 0 && !infinite ? "disabled" : ""),
        "data-type": "prev",
        onClick: this.moveSlides
      }, _react["default"].createElement("span", null)), _react["default"].createElement("div", {
        className: "react-slideshow-wrapper slide"
      }, _react["default"].createElement("div", {
        className: "images-wrap",
        style: style,
        ref: function ref(wrap) {
          return _this4.imageContainer = wrap;
        }
      }, _react["default"].createElement("div", {
        "data-index": "-1"
      }, children[children.length - 1]), children.map(function (each, key) {
        return _react["default"].createElement("div", {
          "data-index": key,
          key: key,
          className: key === index ? "active" : ""
        }, each);
      }), _react["default"].createElement("div", {
        "data-index": "-1"
      }, children[0]))), arrows && _react["default"].createElement("div", {
        className: "nav ".concat(index === children.length - 1 && !infinite ? "disabled" : ""),
        "data-type": "next",
        onClick: this.moveSlides
      }, _react["default"].createElement("span", null))), indicators && _react["default"].createElement("div", {
        className: "indicators"
      }, children.map(function (each, key) {
        return _react["default"].createElement("div", {
          key: key,
          "data-key": key,
          className: index === key ? "active" : "",
          onClick: _this4.goToSlide
        });
      })));
    }
  }, {
    key: "slideImages",
    value: function slideImages(index) {
      var _this5 = this;

      var _this$props4 = this.props,
          children = _this$props4.children,
          transitionDuration = _this$props4.transitionDuration,
          autoplay = _this$props4.autoplay,
          infinite = _this$props4.infinite,
          duration = _this$props4.duration,
          onChange = _this$props4.onChange;
      var existingTweens = TWEEN["default"].getAll();

      if (!existingTweens.length) {
        clearTimeout(this.timeout);
        var value = {
          margin: -this.width * (this.state.index + 1)
        };
        var tween = new TWEEN.Tween(value).to({
          margin: -this.width * (index + 1)
        }, transitionDuration).onUpdate(function (value) {
          _this5.imageContainer.style.transform = "translate(".concat(value.margin, "px)");
        }).start();

        var animate = function animate() {
          if (_this5.willUnmount) {
            TWEEN["default"].removeAll();
            return;
          }

          requestAnimationFrame(animate);
          TWEEN["default"].update();
        };

        animate();
        tween.onComplete(function () {
          var newIndex = index < 0 ? children.length - 1 : index >= children.length ? 0 : index;

          if (_this5.willUnmount) {
            return;
          }

          if (typeof onChange === "function") {
            onChange(_this5.state.index, newIndex);
          }

          _this5.setState({
            index: newIndex
          }, function () {
            if (autoplay && (infinite || _this5.state.index < children.length)) {
              _this5.timeout = setTimeout(function () {
                return _this5.goNext();
              }, duration);
            }
          });
        });
      }
    }
  }]);

  return Slideshow;
}(_react.Component);

Slideshow.defaultProps = {
  duration: 5000,
  transitionDuration: 1000,
  infinite: true,
  autoplay: true,
  indicators: false,
  arrows: true,
  parentClassName: "slide-container"
};
Slideshow.propTypes = {
  duration: _propTypes["default"].number,
  transitionDuration: _propTypes["default"].number,
  infinite: _propTypes["default"].bool,
  indicators: _propTypes["default"].bool,
  autoplay: _propTypes["default"].bool,
  arrows: _propTypes["default"].bool,
  onChange: _propTypes["default"].func,
  parentClassName: _propTypes["default"].string
};
var _default = Slideshow;
exports["default"] = _default;