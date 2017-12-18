webpackJsonp([12],{

/***/ "2cvB":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var require;var require;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**!
 * lg-fullscreen.js | 0.0.1 | July 25th 2016
 * http://sachinchoolur.github.io/lightGallery/
 * Copyright (c) 2016 Sachin N; 
 * @license Apache 2.0 
 */(function (f) {
    if (( false ? "undefined" : _typeof(exports)) === "object" && typeof module !== "undefined") {
        module.exports = f();
    } else if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (f),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {
        var g;if (typeof window !== "undefined") {
            g = window;
        } else if (typeof global !== "undefined") {
            g = global;
        } else if (typeof self !== "undefined") {
            g = self;
        } else {
            g = this;
        }g.LgFullsceen = f();
    }
})(function () {
    var define, module, exports;return function e(t, n, r) {
        function s(o, u) {
            if (!n[o]) {
                if (!t[o]) {
                    var a = typeof require == "function" && require;if (!u && a) return require(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;
                }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
                    var n = t[o][1][e];return s(n ? n : e);
                }, l, l.exports, e, t, n, r);
            }return n[o].exports;
        }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
            s(r[o]);
        }return s;
    }({ 1: [function (require, module, exports) {
            (function (global, factory) {
                if (typeof define === "function" && define.amd) {
                    define([], factory);
                } else if (typeof exports !== "undefined") {
                    factory();
                } else {
                    var mod = {
                        exports: {}
                    };
                    factory();
                    global.lgFullscreen = mod.exports;
                }
            })(this, function () {
                'use strict';

                var _extends = Object.assign || function (target) {
                    for (var i = 1; i < arguments.length; i++) {
                        var source = arguments[i];

                        for (var key in source) {
                            if (Object.prototype.hasOwnProperty.call(source, key)) {
                                target[key] = source[key];
                            }
                        }
                    }

                    return target;
                };

                var fullscreenDefaults = {
                    fullScreen: true
                };

                var Fullscreen = function Fullscreen(element) {

                    this.el = element;

                    this.core = window.lgData[this.el.getAttribute('lg-uid')];
                    this.core.s = _extends({}, fullscreenDefaults, this.core.s);

                    this.init();

                    return this;
                };

                Fullscreen.prototype.init = function () {
                    var fullScreen = '';
                    if (this.core.s.fullScreen) {

                        // check for fullscreen browser support
                        if (!document.fullscreenEnabled && !document.webkitFullscreenEnabled && !document.mozFullScreenEnabled && !document.msFullscreenEnabled) {
                            return;
                        } else {
                            fullScreen = '<span class="lg-fullscreen lg-icon"></span>';
                            this.core.outer.querySelector('.lg-toolbar').insertAdjacentHTML('beforeend', fullScreen);
                            this.fullScreen();
                        }
                    }
                };

                Fullscreen.prototype.requestFullscreen = function () {
                    var el = document.documentElement;
                    if (el.requestFullscreen) {
                        el.requestFullscreen();
                    } else if (el.msRequestFullscreen) {
                        el.msRequestFullscreen();
                    } else if (el.mozRequestFullScreen) {
                        el.mozRequestFullScreen();
                    } else if (el.webkitRequestFullscreen) {
                        el.webkitRequestFullscreen();
                    }
                };

                Fullscreen.prototype.exitFullscreen = function () {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.webkitExitFullscreen) {
                        document.webkitExitFullscreen();
                    }
                };

                // https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Using_full_screen_mode
                Fullscreen.prototype.fullScreen = function () {
                    var _this = this;

                    utils.on(document, 'fullscreenchange.lgfullscreen webkitfullscreenchange.lgfullscreen mozfullscreenchange.lgfullscreen MSFullscreenChange.lgfullscreen', function () {
                        if (utils.hasClass(_this.core.outer, 'lg-fullscreen-on')) {
                            utils.removeClass(_this.core.outer, 'lg-fullscreen-on');
                        } else {
                            utils.addClass(_this.core.outer, 'lg-fullscreen-on');
                        }
                    });

                    utils.on(this.core.outer.querySelector('.lg-fullscreen'), 'click.lg', function () {
                        if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
                            _this.requestFullscreen();
                        } else {
                            _this.exitFullscreen();
                        }
                    });
                };

                Fullscreen.prototype.destroy = function () {

                    // exit from fullscreen if activated
                    this.exitFullscreen();

                    utils.off(document, '.lgfullscreen');
                };

                window.lgModules.fullscreen = Fullscreen;
            });
        }, {}] }, {}, [1])(1);
});

/***/ }),

/***/ "4f6j":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var require;var require;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (f) {
    if (( false ? "undefined" : _typeof(exports)) === "object" && typeof module !== "undefined") {
        module.exports = f();
    } else if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (f),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {
        var g;if (typeof window !== "undefined") {
            g = window;
        } else if (typeof global !== "undefined") {
            g = global;
        } else if (typeof self !== "undefined") {
            g = self;
        } else {
            g = this;
        }g.LgAutoplay = f();
    }
})(function () {
    var define, module, exports;return function e(t, n, r) {
        function s(o, u) {
            if (!n[o]) {
                if (!t[o]) {
                    var a = typeof require == "function" && require;if (!u && a) return require(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;
                }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
                    var n = t[o][1][e];return s(n ? n : e);
                }, l, l.exports, e, t, n, r);
            }return n[o].exports;
        }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
            s(r[o]);
        }return s;
    }({ 1: [function (require, module, exports) {
            (function (global, factory) {
                if (typeof define === "function" && define.amd) {
                    define([], factory);
                } else if (typeof exports !== "undefined") {
                    factory();
                } else {
                    var mod = {
                        exports: {}
                    };
                    factory();
                    global.lgAutoplay = mod.exports;
                }
            })(this, function () {
                'use strict';

                var _extends = Object.assign || function (target) {
                    for (var i = 1; i < arguments.length; i++) {
                        var source = arguments[i];

                        for (var key in source) {
                            if (Object.prototype.hasOwnProperty.call(source, key)) {
                                target[key] = source[key];
                            }
                        }
                    }

                    return target;
                };

                var autoplayDefaults = {
                    autoplay: false,
                    pause: 5000,
                    progressBar: true,
                    fourceAutoplay: false,
                    autoplayControls: true,
                    appendAutoplayControlsTo: '.lg-toolbar'
                };

                /**
                 * Creates the autoplay plugin.
                 * @param {object} element - lightGallery element
                 */
                var Autoplay = function Autoplay(element) {

                    this.el = element;

                    this.core = window.lgData[this.el.getAttribute('lg-uid')];

                    // Execute only if items are above 1
                    if (this.core.items.length < 2) {
                        return false;
                    }

                    this.core.s = _extends({}, autoplayDefaults, this.core.s);
                    this.interval = false;

                    // Identify if slide happened from autoplay
                    this.fromAuto = true;

                    // Identify if autoplay canceled from touch/drag
                    this.canceledOnTouch = false;

                    // save fourceautoplay value
                    this.fourceAutoplayTemp = this.core.s.fourceAutoplay;

                    // do not allow progress bar if browser does not support css3 transitions
                    if (!this.core.doCss()) {
                        this.core.s.progressBar = false;
                    }

                    this.init();

                    return this;
                };

                Autoplay.prototype.init = function () {
                    var _this = this;

                    // append autoplay controls
                    if (_this.core.s.autoplayControls) {
                        _this.controls();
                    }

                    // Create progress bar
                    if (_this.core.s.progressBar) {
                        _this.core.outer.querySelector('.lg').insertAdjacentHTML('beforeend', '<div class="lg-progress-bar"><div class="lg-progress"></div></div>');
                    }

                    // set progress
                    _this.progress();

                    // Start autoplay
                    if (_this.core.s.autoplay) {
                        _this.startlAuto();
                    }

                    // cancel interval on touchstart and dragstart
                    utils.on(_this.el, 'onDragstart.lgtm touchstart.lgtm', function () {
                        if (_this.interval) {
                            _this.cancelAuto();
                            _this.canceledOnTouch = true;
                        }
                    });

                    // restore autoplay if autoplay canceled from touchstart / dragstart
                    utils.on(_this.el, 'onDragend.lgtm touchend.lgtm onSlideClick.lgtm', function () {
                        if (!_this.interval && _this.canceledOnTouch) {
                            _this.startlAuto();
                            _this.canceledOnTouch = false;
                        }
                    });
                };

                Autoplay.prototype.progress = function () {

                    var _this = this;
                    var _progressBar;
                    var _progress;

                    utils.on(_this.el, 'onBeforeSlide.lgtm', function () {

                        // start progress bar animation
                        if (_this.core.s.progressBar && _this.fromAuto) {
                            _progressBar = _this.core.outer.querySelector('.lg-progress-bar');
                            _progress = _this.core.outer.querySelector('.lg-progress');
                            if (_this.interval) {
                                _progress.removeAttribute('style');
                                utils.removeClass(_progressBar, 'lg-start');
                                setTimeout(function () {
                                    utils.setVendor(_progress, 'Transition', 'width ' + (_this.core.s.speed + _this.core.s.pause) + 'ms ease 0s');
                                    utils.addClass(_progressBar, 'lg-start');
                                }, 20);
                            }
                        }

                        // Remove setinterval if slide is triggered manually and fourceautoplay is false
                        if (!_this.fromAuto && !_this.core.s.fourceAutoplay) {
                            _this.cancelAuto();
                        }

                        _this.fromAuto = false;
                    });
                };

                // Manage autoplay via play/stop buttons
                Autoplay.prototype.controls = function () {
                    var _this = this;
                    var _html = '<span class="lg-autoplay-button lg-icon"></span>';

                    // Append autoplay controls
                    _this.core.outer.querySelector(this.core.s.appendAutoplayControlsTo).insertAdjacentHTML('beforeend', _html);

                    utils.on(_this.core.outer.querySelector('.lg-autoplay-button'), 'click.lg', function () {
                        if (utils.hasClass(_this.core.outer, 'lg-show-autoplay')) {
                            _this.cancelAuto();
                            _this.core.s.fourceAutoplay = false;
                        } else {
                            if (!_this.interval) {
                                _this.startlAuto();
                                _this.core.s.fourceAutoplay = _this.fourceAutoplayTemp;
                            }
                        }
                    });
                };

                // Autostart gallery
                Autoplay.prototype.startlAuto = function () {
                    var _this = this;

                    utils.setVendor(_this.core.outer.querySelector('.lg-progress'), 'Transition', 'width ' + (_this.core.s.speed + _this.core.s.pause) + 'ms ease 0s');
                    utils.addClass(_this.core.outer, 'lg-show-autoplay');
                    utils.addClass(_this.core.outer.querySelector('.lg-progress-bar'), 'lg-start');

                    _this.interval = setInterval(function () {
                        if (_this.core.index + 1 < _this.core.items.length) {
                            _this.core.index++;
                        } else {
                            _this.core.index = 0;
                        }

                        _this.fromAuto = true;
                        _this.core.slide(_this.core.index, false, false);
                    }, _this.core.s.speed + _this.core.s.pause);
                };

                // cancel Autostart
                Autoplay.prototype.cancelAuto = function () {
                    clearInterval(this.interval);
                    this.interval = false;
                    if (this.core.outer.querySelector('.lg-progress')) {
                        this.core.outer.querySelector('.lg-progress').removeAttribute('style');
                    }

                    utils.removeClass(this.core.outer, 'lg-show-autoplay');
                    utils.removeClass(this.core.outer.querySelector('.lg-progress-bar'), 'lg-start');
                };

                Autoplay.prototype.destroy = function () {

                    this.cancelAuto();
                    if (this.core.outer.querySelector('.lg-progress-bar')) {
                        this.core.outer.querySelector('.lg-progress-bar').parentNode.removeChild(this.core.outer.querySelector('.lg-progress-bar'));
                    }
                };

                window.lgModules.autoplay = Autoplay;
            });
        }, {}] }, {}, [1])(1);
});

/***/ }),

/***/ "7epe":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.lgUtils = mod.exports;
    }
})(undefined, function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    /*
     *@todo remove function from window and document. Update on and off functions
     */
    window.getAttribute = function (label) {
        return window[label];
    };

    window.setAttribute = function (label, value) {
        window[label] = value;
    };

    document.getAttribute = function (label) {
        return document[label];
    };

    document.setAttribute = function (label, value) {
        document[label] = value;
    };

    var utils = {
        wrap: function wrap(el, className) {
            if (!el) {
                return;
            }

            var wrapper = document.createElement('div');
            wrapper.className = className;
            el.parentNode.insertBefore(wrapper, el);
            el.parentNode.removeChild(el);
            wrapper.appendChild(el);
        },

        addClass: function addClass(el, className) {
            if (!el) {
                return;
            }

            if (el.classList) {
                el.classList.add(className);
            } else {
                el.className += ' ' + className;
            }
        },

        removeClass: function removeClass(el, className) {
            if (!el) {
                return;
            }

            if (el.classList) {
                el.classList.remove(className);
            } else {
                el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
            }
        },

        hasClass: function hasClass(el, className) {
            if (el.classList) {
                return el.classList.contains(className);
            } else {
                return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
            }

            return false;
        },

        // ex Transform
        // ex TransitionTimingFunction
        setVendor: function setVendor(el, property, value) {
            if (!el) {
                return;
            }

            el.style[property.charAt(0).toLowerCase() + property.slice(1)] = value;
            el.style['webkit' + property] = value;
            el.style['moz' + property] = value;
            el.style['ms' + property] = value;
            el.style['o' + property] = value;
        },

        trigger: function trigger(el, event) {
            var detail = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

            if (!el) {
                return;
            }

            var customEvent = new CustomEvent(event, {
                detail: detail
            });
            el.dispatchEvent(customEvent);
        },

        Listener: {
            uid: 0
        },
        on: function on(el, events, fn) {
            if (!el) {
                return;
            }

            events.split(' ').forEach(function (event) {
                var _id = el.getAttribute('lg-event-uid') || '';
                utils.Listener.uid++;
                _id += '&' + utils.Listener.uid;
                el.setAttribute('lg-event-uid', _id);
                utils.Listener[event + utils.Listener.uid] = fn;
                el.addEventListener(event.split('.')[0], fn, false);
            });
        },

        off: function off(el, event) {
            if (!el) {
                return;
            }

            var _id = el.getAttribute('lg-event-uid');
            if (_id) {
                _id = _id.split('&');
                for (var i = 0; i < _id.length; i++) {
                    if (_id[i]) {
                        var _event = event + _id[i];
                        if (_event.substring(0, 1) === '.') {
                            for (var key in utils.Listener) {
                                if (utils.Listener.hasOwnProperty(key)) {
                                    if (key.split('.').indexOf(_event.split('.')[1]) > -1) {
                                        el.removeEventListener(key.split('.')[0], utils.Listener[key]);
                                        el.setAttribute('lg-event-uid', el.getAttribute('lg-event-uid').replace('&' + _id[i], ''));
                                        delete utils.Listener[key];
                                    }
                                }
                            }
                        } else {
                            el.removeEventListener(_event.split('.')[0], utils.Listener[_event]);
                            el.setAttribute('lg-event-uid', el.getAttribute('lg-event-uid').replace('&' + _id[i], ''));
                            delete utils.Listener[_event];
                        }
                    }
                }
            }
        },

        param: function param(obj) {
            return Object.keys(obj).map(function (k) {
                return encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]);
            }).join('&');
        }
    };

    exports["default"] = utils;
});

/***/ }),

/***/ "D/GJ":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var require;var require;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (f) {
    if (( false ? "undefined" : _typeof(exports)) === "object" && typeof module !== "undefined") {
        module.exports = f();
    } else if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (f),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {
        var g;if (typeof window !== "undefined") {
            g = window;
        } else if (typeof global !== "undefined") {
            g = global;
        } else if (typeof self !== "undefined") {
            g = self;
        } else {
            g = this;
        }g.LgShare = f();
    }
})(function () {
    var define, module, exports;return function e(t, n, r) {
        function s(o, u) {
            if (!n[o]) {
                if (!t[o]) {
                    var a = typeof require == "function" && require;if (!u && a) return require(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;
                }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
                    var n = t[o][1][e];return s(n ? n : e);
                }, l, l.exports, e, t, n, r);
            }return n[o].exports;
        }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
            s(r[o]);
        }return s;
    }({ 1: [function (require, module, exports) {
            (function (global, factory) {
                if (typeof define === "function" && define.amd) {
                    define([], factory);
                } else if (typeof exports !== "undefined") {
                    factory();
                } else {
                    var mod = {
                        exports: {}
                    };
                    factory();
                    global.lgShare = mod.exports;
                }
            })(this, function () {
                'use strict';

                var _extends = Object.assign || function (target) {
                    for (var i = 1; i < arguments.length; i++) {
                        var source = arguments[i];

                        for (var key in source) {
                            if (Object.prototype.hasOwnProperty.call(source, key)) {
                                target[key] = source[key];
                            }
                        }
                    }

                    return target;
                };

                var shareSefaults = {
                    share: true,
                    facebook: true,
                    facebookDropdownText: 'Facebook',
                    twitter: true,
                    twitterDropdownText: 'Twitter',
                    googlePlus: true,
                    googlePlusDropdownText: 'GooglePlus',
                    pinterest: true,
                    pinterestDropdownText: 'Pinterest'
                };

                var Share = function Share(element) {

                    this.el = element;

                    this.core = window.lgData[this.el.getAttribute('lg-uid')];
                    this.core.s = _extends({}, shareSefaults, this.core.s);

                    if (this.core.s.share) {
                        this.init();
                    }

                    return this;
                };

                Share.prototype.init = function () {
                    var _this = this;
                    var shareHtml = '<span id="lg-share" class="lg-icon">' + '<ul class="lg-dropdown" style="position: absolute;">';
                    shareHtml += _this.core.s.facebook ? '<li><a id="lg-share-facebook" target="_blank"><span class="lg-icon"></span><span class="lg-dropdown-text">' + this.core.s.facebookDropdownText + '</span></a></li>' : '';
                    shareHtml += _this.core.s.twitter ? '<li><a id="lg-share-twitter" target="_blank"><span class="lg-icon"></span><span class="lg-dropdown-text">' + this.core.s.twitterDropdownText + '</span></a></li>' : '';
                    shareHtml += _this.core.s.googlePlus ? '<li><a id="lg-share-googleplus" target="_blank"><span class="lg-icon"></span><span class="lg-dropdown-text">' + this.core.s.googlePlusDropdownText + '</span></a></li>' : '';
                    shareHtml += _this.core.s.pinterest ? '<li><a id="lg-share-pinterest" target="_blank"><span class="lg-icon"></span><span class="lg-dropdown-text">' + this.core.s.pinterestDropdownText + '</span></a></li>' : '';
                    shareHtml += '</ul></span>';

                    this.core.outer.querySelector('.lg-toolbar').insertAdjacentHTML('beforeend', shareHtml);
                    this.core.outer.querySelector('.lg').insertAdjacentHTML('beforeend', '<div id="lg-dropdown-overlay"></div>');
                    utils.on(document.getElementById('lg-share'), 'click.lg', function () {
                        if (utils.hasClass(_this.core.outer, 'lg-dropdown-active')) {
                            utils.removeClass(_this.core.outer, 'lg-dropdown-active');
                        } else {
                            utils.addClass(_this.core.outer, 'lg-dropdown-active');
                        }
                    });

                    utils.on(document.getElementById('lg-dropdown-overlay'), 'click.lg', function () {
                        utils.removeClass(_this.core.outer, 'lg-dropdown-active');
                    });

                    utils.on(_this.core.el, 'onAfterSlide.lgtm', function (event) {

                        setTimeout(function () {
                            document.getElementById('lg-share-facebook').setAttribute('href', 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(_this.core.items[event.detail.index].getAttribute('data-facebook-share-url') || window.location.href));

                            document.getElementById('lg-share-twitter').setAttribute('href', 'https://twitter.com/intent/tweet?text=' + _this.core.items[event.detail.index].getAttribute('data-tweet-text') + '&url=' + encodeURIComponent(_this.core.items[event.detail.index].getAttribute('data-twitter-share-url') || window.location.href));

                            document.getElementById('lg-share-googleplus').setAttribute('href', 'https://plus.google.com/share?url=' + encodeURIComponent(_this.core.items[event.detail.index].getAttribute('data-googleplus-share-url') || window.location.href));

                            document.getElementById('lg-share-pinterest').setAttribute('href', 'http://www.pinterest.com/pin/create/button/?url=' + encodeURIComponent(_this.core.items[event.detail.index].getAttribute('data-pinterest-share-url') || window.location.href) + '&media=' + encodeURIComponent(_this.core.items[event.detail.index].getAttribute('href') || _this.core.items[event.detail.index].getAttribute('data-src')) + '&description=' + _this.core.items[event.detail.index].getAttribute('data-pinterest-text'));
                        }, 100);
                    });
                };

                Share.prototype.destroy = function () {};

                window.lgModules.share = Share;
            });
        }, {}] }, {}, [1])(1);
});

/***/ }),

/***/ "Ij6f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var require;var require;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**!
 * lg-zoom.js | 1.0.1 | December 22nd 2016
 * http://sachinchoolur.github.io/lg-zoom.js
 * Copyright (c) 2016 Sachin N;
 * @license GPLv3
 */(function (f) {
    if (( false ? "undefined" : _typeof(exports)) === "object" && typeof module !== "undefined") {
        module.exports = f();
    } else if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (f),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {
        var g;if (typeof window !== "undefined") {
            g = window;
        } else if (typeof global !== "undefined") {
            g = global;
        } else if (typeof self !== "undefined") {
            g = self;
        } else {
            g = this;
        }g.LgZoom = f();
    }
})(function () {
    var define, module, exports;return function e(t, n, r) {
        function s(o, u) {
            if (!n[o]) {
                if (!t[o]) {
                    var a = typeof require == "function" && require;if (!u && a) return require(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;
                }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
                    var n = t[o][1][e];return s(n ? n : e);
                }, l, l.exports, e, t, n, r);
            }return n[o].exports;
        }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
            s(r[o]);
        }return s;
    }({ 1: [function (require, module, exports) {
            (function (global, factory) {
                if (typeof define === "function" && define.amd) {
                    define([], factory);
                } else if (typeof exports !== "undefined") {
                    factory();
                } else {
                    var mod = {
                        exports: {}
                    };
                    factory();
                    global.lgZoom = mod.exports;
                }
            })(this, function () {
                'use strict';

                var _extends = Object.assign || function (target) {
                    for (var i = 1; i < arguments.length; i++) {
                        var source = arguments[i];

                        for (var key in source) {
                            if (Object.prototype.hasOwnProperty.call(source, key)) {
                                target[key] = source[key];
                            }
                        }
                    }

                    return target;
                };

                var getUseLeft = function getUseLeft() {
                    var useLeft = false;
                    var isChrome = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
                    if (isChrome && parseInt(isChrome[2], 10) < 54) {
                        useLeft = true;
                    }

                    return useLeft;
                };

                var zoomDefaults = {
                    scale: 1,
                    zoom: true,
                    actualSize: true,
                    enableZoomAfter: 300,
                    useLeftForZoom: getUseLeft()
                };

                var Zoom = function Zoom(element) {

                    this.el = element;

                    this.core = window.lgData[this.el.getAttribute('lg-uid')];
                    this.core.s = _extends({}, zoomDefaults, this.core.s);

                    if (this.core.s.zoom && this.core.doCss()) {
                        this.init();

                        // Store the zoomable timeout value just to clear it while closing
                        this.zoomabletimeout = false;

                        // Set the initial value center
                        this.pageX = window.innerWidth / 2;
                        this.pageY = window.innerHeight / 2 + (document.documentElement.scrollTop || document.body.scrollTop);
                    }

                    return this;
                };

                Zoom.prototype.init = function () {

                    var _this = this;
                    var zoomIcons = '<span id="lg-zoom-in" class="lg-icon"></span><span id="lg-zoom-out" class="lg-icon"></span>';

                    if (_this.core.s.actualSize) {
                        zoomIcons += '<span id="lg-actual-size" class="lg-icon"></span>';
                    }

                    if (_this.core.s.useLeftForZoom) {
                        utils.addClass(_this.core.outer, 'lg-use-left-for-zoom');
                    } else {
                        utils.addClass(_this.core.outer, 'lg-use-transition-for-zoom');
                    }

                    this.core.outer.querySelector('.lg-toolbar').insertAdjacentHTML('beforeend', zoomIcons);

                    // Add zoomable class
                    utils.on(_this.core.el, 'onSlideItemLoad.lgtmzoom', function (event) {

                        // delay will be 0 except first time
                        var _speed = _this.core.s.enableZoomAfter + event.detail.delay;

                        // set _speed value 0 if gallery opened from direct url and if it is first slide
                        if (utils.hasClass(document.body, 'lg-from-hash') && event.detail.delay) {

                            // will execute only once
                            _speed = 0;
                        } else {

                            // Remove lg-from-hash to enable starting animation.
                            utils.removeClass(document.body, 'lg-from-hash');
                        }

                        _this.zoomabletimeout = setTimeout(function () {
                            utils.addClass(_this.core.___slide[event.detail.index], 'lg-zoomable');
                        }, _speed + 30);
                    });

                    var scale = 1;
                    /**
                     * @desc Image zoom
                     * Translate the wrap and scale the image to get better user experience
                     *
                     * @param {String} scaleVal - Zoom decrement/increment value
                     */
                    var zoom = function zoom(scaleVal) {

                        var image = _this.core.outer.querySelector('.lg-current .lg-image');
                        var _x;
                        var _y;

                        // Find offset manually to avoid issue after zoom
                        var offsetX = (window.innerWidth - image.clientWidth) / 2;
                        var offsetY = (window.innerHeight - image.clientHeight) / 2 + (document.documentElement.scrollTop || document.body.scrollTop);

                        _x = _this.pageX - offsetX;
                        _y = _this.pageY - offsetY;

                        var x = (scaleVal - 1) * _x;
                        var y = (scaleVal - 1) * _y;

                        utils.setVendor(image, 'Transform', 'scale3d(' + scaleVal + ', ' + scaleVal + ', 1)');
                        image.setAttribute('data-scale', scaleVal);

                        if (_this.core.s.useLeftForZoom) {
                            image.parentElement.style.left = -x + 'px';
                            image.parentElement.style.top = -y + 'px';
                        } else {
                            utils.setVendor(image.parentElement, 'Transform', 'translate3d(-' + x + 'px, -' + y + 'px, 0)');
                        }

                        image.parentElement.setAttribute('data-x', x);
                        image.parentElement.setAttribute('data-y', y);
                    };

                    var callScale = function callScale() {
                        if (scale > 1) {
                            utils.addClass(_this.core.outer, 'lg-zoomed');
                        } else {
                            _this.resetZoom();
                        }

                        if (scale < 1) {
                            scale = 1;
                        }

                        zoom(scale);
                    };

                    var actualSize = function actualSize(event, image, index, fromIcon) {
                        var w = image.clientWidth;
                        var nw;
                        if (_this.core.s.dynamic) {
                            nw = _this.core.s.dynamicEl[index].width || image.naturalWidth || w;
                        } else {
                            nw = _this.core.items[index].getAttribute('data-width') || image.naturalWidth || w;
                        }

                        var _scale;

                        if (utils.hasClass(_this.core.outer, 'lg-zoomed')) {
                            scale = 1;
                        } else {
                            if (nw > w) {
                                _scale = nw / w;
                                scale = _scale || 2;
                            }
                        }

                        if (fromIcon) {
                            _this.pageX = window.innerWidth / 2;
                            _this.pageY = window.innerHeight / 2 + (document.documentElement.scrollTop || document.body.scrollTop);
                        } else {
                            _this.pageX = event.pageX || event.targetTouches[0].pageX;
                            _this.pageY = event.pageY || event.targetTouches[0].pageY;
                        }

                        callScale();
                        setTimeout(function () {
                            utils.removeClass(_this.core.outer, 'lg-grabbing');
                            utils.addClass(_this.core.outer, 'lg-grab');
                        }, 10);
                    };

                    var tapped = false;

                    // event triggered after appending slide content
                    utils.on(_this.core.el, 'onAferAppendSlide.lgtmzoom', function (event) {

                        var index = event.detail.index;

                        // Get the current element
                        var image = _this.core.___slide[index].querySelector('.lg-image');

                        if (!_this.core.isTouch) {
                            utils.on(image, 'dblclick', function (event) {
                                actualSize(event, image, index);
                            });
                        }

                        if (_this.core.isTouch) {
                            utils.on(image, 'touchstart', function (event) {
                                if (!tapped) {
                                    tapped = setTimeout(function () {
                                        tapped = null;
                                    }, 300);
                                } else {
                                    clearTimeout(tapped);
                                    tapped = null;
                                    actualSize(event, image, index);
                                }

                                event.preventDefault();
                            });
                        }
                    });

                    // Update zoom on resize and orientationchange
                    utils.on(window, 'resize.lgzoom scroll.lgzoom orientationchange.lgzoom', function () {
                        _this.pageX = window.innerWidth / 2;
                        _this.pageY = window.innerHeight / 2 + (document.documentElement.scrollTop || document.body.scrollTop);
                        zoom(scale);
                    });

                    utils.on(document.getElementById('lg-zoom-out'), 'click.lg', function () {
                        if (_this.core.outer.querySelector('.lg-current .lg-image')) {
                            scale -= _this.core.s.scale;
                            callScale();
                        }
                    });

                    utils.on(document.getElementById('lg-zoom-in'), 'click.lg', function () {
                        if (_this.core.outer.querySelector('.lg-current .lg-image')) {
                            scale += _this.core.s.scale;
                            callScale();
                        }
                    });

                    utils.on(document.getElementById('lg-actual-size'), 'click.lg', function (event) {
                        actualSize(event, _this.core.___slide[_this.core.index].querySelector('.lg-image'), _this.core.index, true);
                    });

                    // Reset zoom on slide change
                    utils.on(_this.core.el, 'onBeforeSlide.lgtm', function () {
                        scale = 1;
                        _this.resetZoom();
                    });

                    // Drag option after zoom
                    if (!_this.core.isTouch) {
                        _this.zoomDrag();
                    }

                    if (_this.core.isTouch) {
                        _this.zoomSwipe();
                    }
                };

                // Reset zoom effect
                Zoom.prototype.resetZoom = function () {
                    utils.removeClass(this.core.outer, 'lg-zoomed');
                    for (var i = 0; i < this.core.___slide.length; i++) {
                        if (this.core.___slide[i].querySelector('.lg-img-wrap')) {
                            this.core.___slide[i].querySelector('.lg-img-wrap').removeAttribute('style');
                            this.core.___slide[i].querySelector('.lg-img-wrap').removeAttribute('data-x');
                            this.core.___slide[i].querySelector('.lg-img-wrap').removeAttribute('data-y');
                        }
                    }

                    for (var j = 0; j < this.core.___slide.length; j++) {
                        if (this.core.___slide[j].querySelector('.lg-image')) {
                            this.core.___slide[j].querySelector('.lg-image').removeAttribute('style');
                            this.core.___slide[j].querySelector('.lg-image').removeAttribute('data-scale');
                        }
                    }

                    // Reset pagx pagy values to center
                    this.pageX = window.innerWidth / 2;
                    this.pageY = window.innerHeight / 2 + (document.documentElement.scrollTop || document.body.scrollTop);
                };

                Zoom.prototype.zoomSwipe = function () {
                    var _this = this;
                    var startCoords = {};
                    var endCoords = {};
                    var isMoved = false;

                    // Allow x direction drag
                    var allowX = false;

                    // Allow Y direction drag
                    var allowY = false;

                    for (var i = 0; i < _this.core.___slide.length; i++) {

                        /*jshint loopfunc: true */
                        utils.on(_this.core.___slide[i], 'touchstart.lg', function (e) {

                            if (utils.hasClass(_this.core.outer, 'lg-zoomed')) {
                                var image = _this.core.___slide[_this.core.index].querySelector('.lg-object');

                                allowY = image.offsetHeight * image.getAttribute('data-scale') > _this.core.outer.querySelector('.lg').clientHeight;
                                allowX = image.offsetWidth * image.getAttribute('data-scale') > _this.core.outer.querySelector('.lg').clientWidth;
                                if (allowX || allowY) {
                                    e.preventDefault();
                                    startCoords = {
                                        x: e.targetTouches[0].pageX,
                                        y: e.targetTouches[0].pageY
                                    };
                                }
                            }
                        });
                    }

                    for (var j = 0; j < _this.core.___slide.length; j++) {

                        /*jshint loopfunc: true */
                        utils.on(_this.core.___slide[j], 'touchmove.lg', function (e) {

                            if (utils.hasClass(_this.core.outer, 'lg-zoomed')) {

                                var _el = _this.core.___slide[_this.core.index].querySelector('.lg-img-wrap');
                                var distanceX;
                                var distanceY;

                                e.preventDefault();
                                isMoved = true;

                                endCoords = {
                                    x: e.targetTouches[0].pageX,
                                    y: e.targetTouches[0].pageY
                                };

                                // reset opacity and transition duration
                                utils.addClass(_this.core.outer, 'lg-zoom-dragging');

                                if (allowY) {
                                    distanceY = -Math.abs(_el.getAttribute('data-y')) + (endCoords.y - startCoords.y);
                                } else {
                                    distanceY = -Math.abs(_el.getAttribute('data-y'));
                                }

                                if (allowX) {
                                    distanceX = -Math.abs(_el.getAttribute('data-x')) + (endCoords.x - startCoords.x);
                                } else {
                                    distanceX = -Math.abs(_el.getAttribute('data-x'));
                                }

                                if (Math.abs(endCoords.x - startCoords.x) > 15 || Math.abs(endCoords.y - startCoords.y) > 15) {

                                    if (_this.core.s.useLeftForZoom) {
                                        _el.style.left = distanceX + 'px';
                                        _el.style.top = distanceY + 'px';
                                    } else {
                                        utils.setVendor(_el, 'Transform', 'translate3d(' + distanceX + 'px, ' + distanceY + 'px, 0)');
                                    }
                                }
                            }
                        });
                    }

                    for (var k = 0; k < _this.core.___slide.length; k++) {

                        /*jshint loopfunc: true */
                        utils.on(_this.core.___slide[k], 'touchend.lg', function () {
                            if (utils.hasClass(_this.core.outer, 'lg-zoomed')) {
                                if (isMoved) {
                                    isMoved = false;
                                    utils.removeClass(_this.core.outer, 'lg-zoom-dragging');
                                    _this.touchendZoom(startCoords, endCoords, allowX, allowY);
                                }
                            }
                        });
                    }
                };

                Zoom.prototype.zoomDrag = function () {

                    var _this = this;
                    var startCoords = {};
                    var endCoords = {};
                    var isDraging = false;
                    var isMoved = false;

                    // Allow x direction drag
                    var allowX = false;

                    // Allow Y direction drag
                    var allowY = false;

                    for (var i = 0; i < _this.core.___slide.length; i++) {

                        /*jshint loopfunc: true */
                        utils.on(_this.core.___slide[i], 'mousedown.lgzoom', function (e) {

                            // execute only on .lg-object
                            var image = _this.core.___slide[_this.core.index].querySelector('.lg-object');

                            if (!image) {
                                return;
                            }

                            allowY = image.offsetHeight * image.getAttribute('data-scale') > _this.core.outer.querySelector('.lg').clientHeight;
                            allowX = image.offsetWidth * image.getAttribute('data-scale') > _this.core.outer.querySelector('.lg').clientWidth;

                            if (utils.hasClass(_this.core.outer, 'lg-zoomed')) {
                                if (utils.hasClass(e.target, 'lg-object') && (allowX || allowY)) {
                                    e.preventDefault();
                                    startCoords = {
                                        x: e.pageX,
                                        y: e.pageY
                                    };

                                    isDraging = true;

                                    // ** Fix for webkit cursor issue https://code.google.com/p/chromium/issues/detail?id=26723
                                    _this.core.outer.scrollLeft += 1;
                                    _this.core.outer.scrollLeft -= 1;

                                    utils.removeClass(_this.core.outer, 'lg-grab');
                                    utils.addClass(_this.core.outer, 'lg-grabbing');
                                }
                            }
                        });
                    }

                    utils.on(window, 'mousemove.lgzoom', function (e) {
                        if (isDraging) {
                            var _el = _this.core.___slide[_this.core.index].querySelector('.lg-img-wrap');
                            var distanceX;
                            var distanceY;

                            isMoved = true;
                            endCoords = {
                                x: e.pageX,
                                y: e.pageY
                            };

                            // reset opacity and transition duration
                            utils.addClass(_this.core.outer, 'lg-zoom-dragging');

                            if (allowY) {
                                distanceY = -Math.abs(_el.getAttribute('data-y')) + (endCoords.y - startCoords.y);
                            } else {
                                distanceY = -Math.abs(_el.getAttribute('data-y'));
                            }

                            if (allowX) {
                                distanceX = -Math.abs(_el.getAttribute('data-x')) + (endCoords.x - startCoords.x);
                            } else {
                                distanceX = -Math.abs(_el.getAttribute('data-x'));
                            }

                            if (_this.core.s.useLeftForZoom) {
                                _el.style.left = distanceX + 'px';
                                _el.style.top = distanceY + 'px';
                            } else {
                                utils.setVendor(_el, 'Transform', 'translate3d(' + distanceX + 'px, ' + distanceY + 'px, 0)');
                            }
                        }
                    });

                    utils.on(window, 'mouseup.lgzoom', function (e) {

                        if (isDraging) {
                            isDraging = false;
                            utils.removeClass(_this.core.outer, 'lg-zoom-dragging');

                            // Fix for chrome mouse move on click
                            if (isMoved && (startCoords.x !== endCoords.x || startCoords.y !== endCoords.y)) {
                                endCoords = {
                                    x: e.pageX,
                                    y: e.pageY
                                };
                                _this.touchendZoom(startCoords, endCoords, allowX, allowY);
                            }

                            isMoved = false;
                        }

                        utils.removeClass(_this.core.outer, 'lg-grabbing');
                        utils.addClass(_this.core.outer, 'lg-grab');
                    });
                };

                Zoom.prototype.touchendZoom = function (startCoords, endCoords, allowX, allowY) {

                    var _this = this;
                    var _el = _this.core.___slide[_this.core.index].querySelector('.lg-img-wrap');
                    var image = _this.core.___slide[_this.core.index].querySelector('.lg-object');
                    var distanceX = -Math.abs(_el.getAttribute('data-x')) + (endCoords.x - startCoords.x);
                    var distanceY = -Math.abs(_el.getAttribute('data-y')) + (endCoords.y - startCoords.y);
                    var minY = (_this.core.outer.querySelector('.lg').clientHeight - image.offsetHeight) / 2;
                    var maxY = Math.abs(image.offsetHeight * Math.abs(image.getAttribute('data-scale')) - _this.core.outer.querySelector('.lg').clientHeight + minY);
                    var minX = (_this.core.outer.querySelector('.lg').clientWidth - image.offsetWidth) / 2;
                    var maxX = Math.abs(image.offsetWidth * Math.abs(image.getAttribute('data-scale')) - _this.core.outer.querySelector('.lg').clientWidth + minX);

                    if (Math.abs(endCoords.x - startCoords.x) > 15 || Math.abs(endCoords.y - startCoords.y) > 15) {
                        if (allowY) {
                            if (distanceY <= -maxY) {
                                distanceY = -maxY;
                            } else if (distanceY >= -minY) {
                                distanceY = -minY;
                            }
                        }

                        if (allowX) {
                            if (distanceX <= -maxX) {
                                distanceX = -maxX;
                            } else if (distanceX >= -minX) {
                                distanceX = -minX;
                            }
                        }

                        if (allowY) {
                            _el.setAttribute('data-y', Math.abs(distanceY));
                        } else {
                            distanceY = -Math.abs(_el.getAttribute('data-y'));
                        }

                        if (allowX) {
                            _el.setAttribute('data-x', Math.abs(distanceX));
                        } else {
                            distanceX = -Math.abs(_el.getAttribute('data-x'));
                        }

                        if (_this.core.s.useLeftForZoom) {
                            _el.style.left = distanceX + 'px';
                            _el.style.top = distanceY + 'px';
                        } else {
                            utils.setVendor(_el, 'Transform', 'translate3d(' + distanceX + 'px, ' + distanceY + 'px, 0)');
                        }
                    }
                };

                Zoom.prototype.destroy = function () {

                    var _this = this;

                    // Unbind all events added by lightGallery zoom plugin
                    utils.off(_this.core.el, '.lgzoom');
                    utils.off(window, '.lgzoom');
                    for (var i = 0; i < _this.core.___slide.length; i++) {
                        utils.off(_this.core.___slide[i], '.lgzoom');
                    }

                    utils.off(_this.core.el, '.lgtmzoom');
                    _this.resetZoom();
                    clearTimeout(_this.zoomabletimeout);
                    _this.zoomabletimeout = false;
                };

                window.lgModules.zoom = Zoom;
            });
        }, {}] }, {}, [1])(1);
});

/***/ }),

/***/ "MgXs":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var require;var require;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**!
 * lg-pager.js | 0.0.1 | July 25th 2016
 * http://sachinchoolur.github.io/lightGallery/
 * Copyright (c) 2016 Sachin N; 
 * @license Apache 2.0 
 */(function (f) {
    if (( false ? "undefined" : _typeof(exports)) === "object" && typeof module !== "undefined") {
        module.exports = f();
    } else if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (f),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {
        var g;if (typeof window !== "undefined") {
            g = window;
        } else if (typeof global !== "undefined") {
            g = global;
        } else if (typeof self !== "undefined") {
            g = self;
        } else {
            g = this;
        }g.LgPager = f();
    }
})(function () {
    var define, module, exports;return function e(t, n, r) {
        function s(o, u) {
            if (!n[o]) {
                if (!t[o]) {
                    var a = typeof require == "function" && require;if (!u && a) return require(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;
                }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
                    var n = t[o][1][e];return s(n ? n : e);
                }, l, l.exports, e, t, n, r);
            }return n[o].exports;
        }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
            s(r[o]);
        }return s;
    }({ 1: [function (require, module, exports) {
            (function (global, factory) {
                if (typeof define === "function" && define.amd) {
                    define([], factory);
                } else if (typeof exports !== "undefined") {
                    factory();
                } else {
                    var mod = {
                        exports: {}
                    };
                    factory();
                    global.lgPager = mod.exports;
                }
            })(this, function () {
                'use strict';

                var _extends = Object.assign || function (target) {
                    for (var i = 1; i < arguments.length; i++) {
                        var source = arguments[i];

                        for (var key in source) {
                            if (Object.prototype.hasOwnProperty.call(source, key)) {
                                target[key] = source[key];
                            }
                        }
                    }

                    return target;
                };

                var pagerDefaults = {
                    pager: false
                };

                var Pager = function Pager(element) {

                    this.el = element;

                    this.core = window.lgData[this.el.getAttribute('lg-uid')];
                    this.core.s = _extends({}, pagerDefaults, this.core.s);

                    if (this.core.s.pager && this.core.items.length > 1) {
                        this.init();
                    }

                    return this;
                };

                Pager.prototype.init = function () {
                    var _this = this;
                    var pagerList = '';
                    var $pagerCont;
                    var $pagerOuter;
                    var timeout;

                    _this.core.outer.querySelector('.lg').insertAdjacentHTML('beforeend', '<div class="lg-pager-outer"></div>');

                    if (_this.core.s.dynamic) {
                        for (var j = 0; j < _this.core.s.dynamicEl.length; j++) {
                            pagerList += '<span class="lg-pager-cont"> <span class="lg-pager"></span><div class="lg-pager-thumb-cont"><span class="lg-caret"></span> <img src="' + _this.core.s.dynamicEl[j].thumb + '" /></div></span>';
                        }
                    } else {
                        for (var i = 0; i < _this.core.items.length; i++) {
                            if (!_this.core.s.exThumbImage) {
                                pagerList += '<span class="lg-pager-cont"> <span class="lg-pager"></span><div class="lg-pager-thumb-cont"><span class="lg-caret"></span> <img src="' + _this.core.items[i].querySelector('img').getAttribute('src') + '" /></div></span>';
                            } else {
                                pagerList += '<span class="lg-pager-cont"> <span class="lg-pager"></span><div class="lg-pager-thumb-cont"><span class="lg-caret"></span> <img src="' + _this.core.items[i].getAttribute(_this.core.s.exThumbImage) + '" /></div></span>';
                            }
                        }
                    }

                    $pagerOuter = _this.core.outer.querySelector('.lg-pager-outer');

                    $pagerOuter.innerHTML = pagerList;

                    $pagerCont = _this.core.outer.querySelectorAll('.lg-pager-cont');
                    for (var k = 0; k < $pagerCont.length; k++) {

                        /*jshint loopfunc: true */
                        (function (index) {
                            utils.on($pagerCont[index], 'click.lg touchend.lg', function () {
                                _this.core.index = index;
                                _this.core.slide(_this.core.index, false, false);
                            });
                        })(k);
                    }

                    utils.on($pagerOuter, 'mouseover.lg', function () {
                        clearTimeout(timeout);
                        utils.addClass($pagerOuter, 'lg-pager-hover');
                    });

                    utils.on($pagerOuter, 'mouseout.lg', function () {
                        timeout = setTimeout(function () {
                            utils.removeClass($pagerOuter, 'lg-pager-hover');
                        });
                    });

                    utils.on(_this.core.el, 'onBeforeSlide.lgtm', function (e) {
                        for (var n = 0; n < $pagerCont.length; n++) {
                            utils.removeClass($pagerCont[n], 'lg-pager-active');
                            if (e.detail.index === n) {
                                utils.addClass($pagerCont[n], 'lg-pager-active');
                            }
                        }
                    });
                };

                Pager.prototype.destroy = function () {};

                window.lgModules.pager = Pager;
            });
        }, {}] }, {}, [1])(1);
});

/***/ }),

/***/ "WTIP":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = 'meetyou.angular.ui.lightgallery';

/***/ }),

/***/ "fp4c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("7epe")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(require('./lg-utils'));
    } else {
        var mod = {
            exports: {}
        };
        factory(global.lgUtils);
        global.lightgallery = mod.exports;
    }
})(undefined, function (_lgUtils) {
    'use strict';

    var _lgUtils2 = _interopRequireDefault(_lgUtils);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }

    var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }

        return target;
    };

    /** Polyfill the CustomEvent() constructor functionality in Internet Explorer 9 and higher */
    (function () {

        if (typeof window.CustomEvent === 'function') {
            return false;
        }

        function CustomEvent(event, params) {
            params = params || {
                bubbles: false,
                cancelable: false,
                detail: undefined
            };
            var evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
        }

        CustomEvent.prototype = window.Event.prototype;

        window.CustomEvent = CustomEvent;
    })();

    window.utils = _lgUtils2["default"];
    window.lgData = {
        uid: 0
    };

    window.lgModules = {};
    var defaults = {

        mode: 'lg-slide',

        // Ex : 'ease'
        cssEasing: 'ease',

        //'for jquery animation'
        easing: 'linear',
        speed: 600,
        height: '100%',
        width: '100%',
        addClass: '',
        startClass: 'lg-start-zoom',
        backdropDuration: 150,
        hideBarsDelay: 6000,

        useLeft: false,

        closable: true,
        loop: true,
        escKey: true,
        keyPress: true,
        controls: true,
        slideEndAnimatoin: true,
        hideControlOnEnd: false,
        mousewheel: false,

        getCaptionFromTitleOrAlt: true,

        // .lg-item || '.lg-sub-html'
        appendSubHtmlTo: '.lg-sub-html',

        subHtmlSelectorRelative: false,

        /**
         * @desc number of preload slides
         * will exicute only after the current slide is fully loaded.
         *
         * @ex you clicked on 4th image and if preload = 1 then 3rd slide and 5th
         * slide will be loaded in the background after the 4th slide is fully loaded..
         * if preload is 2 then 2nd 3rd 5th 6th slides will be preloaded.. ... ...
         *
         */
        preload: 1,
        showAfterLoad: true,
        selector: '',
        selectWithin: '',
        nextHtml: '',
        prevHtml: '',

        // 0, 1
        index: false,

        iframeMaxWidth: '100%',

        download: true,
        counter: true,
        appendCounterTo: '.lg-toolbar',

        swipeThreshold: 50,
        enableSwipe: true,
        enableDrag: true,

        dynamic: false,
        dynamicEl: [],
        galleryId: 1
    };

    function Plugin(element, options) {

        // Current lightGallery element
        this.el = element;

        // lightGallery settings
        this.s = _extends({}, defaults, options);

        // When using dynamic mode, ensure dynamicEl is an array
        if (this.s.dynamic && this.s.dynamicEl !== 'undefined' && this.s.dynamicEl.constructor === Array && !this.s.dynamicEl.length) {
            throw 'When using dynamic mode, you must also define dynamicEl as an Array.';
        }

        // lightGallery modules
        this.modules = {};

        // false when lightgallery complete first slide;
        this.lGalleryOn = false;

        this.lgBusy = false;

        // Timeout function for hiding controls;
        this.hideBartimeout = false;

        // To determine browser supports for touch events;
        this.isTouch = 'ontouchstart' in document.documentElement;

        // Disable hideControlOnEnd if sildeEndAnimation is true
        if (this.s.slideEndAnimatoin) {
            this.s.hideControlOnEnd = false;
        }

        this.items = [];

        // Gallery items
        if (this.s.dynamic) {
            this.items = this.s.dynamicEl;
        } else {
            if (this.s.selector === 'this') {
                this.items.push(this.el);
            } else if (this.s.selector !== '') {
                if (this.s.selectWithin) {
                    this.items = document.querySelector(this.s.selectWithin).querySelectorAll(this.s.selector);
                } else {
                    this.items = this.el.querySelectorAll(this.s.selector);
                }
            } else {
                this.items = this.el.children;
            }
        }

        // .lg-item

        this.___slide = '';

        // .lg-outer
        this.outer = '';

        this.init();

        return this;
    }

    Plugin.prototype.init = function () {

        var _this = this;

        // s.preload should not be more than $item.length
        if (_this.s.preload > _this.items.length) {
            _this.s.preload = _this.items.length;
        }

        // if dynamic option is enabled execute immediately
        var _hash = window.location.hash;
        if (_hash.indexOf('lg=' + this.s.galleryId) > 0) {

            _this.index = parseInt(_hash.split('&slide=')[1], 10);

            _lgUtils2["default"].addClass(document.body, 'lg-from-hash');
            if (!_lgUtils2["default"].hasClass(document.body, 'lg-on')) {
                _lgUtils2["default"].addClass(document.body, 'lg-on');
                setTimeout(function () {
                    _this.build(_this.index);
                });
            }
        }

        if (_this.s.dynamic) {

            _lgUtils2["default"].trigger(this.el, 'onBeforeOpen');

            _this.index = _this.s.index || 0;

            // prevent accidental double execution
            if (!_lgUtils2["default"].hasClass(document.body, 'lg-on')) {
                _lgUtils2["default"].addClass(document.body, 'lg-on');
                setTimeout(function () {
                    _this.build(_this.index);
                });
            }
        } else {

            for (var i = 0; i < _this.items.length; i++) {

                /*jshint loopfunc: true */
                (function (index) {

                    // Using different namespace for click because click event should not unbind if selector is same object('this')
                    _lgUtils2["default"].on(_this.items[index], 'click.lgcustom', function (e) {

                        e.preventDefault();

                        _lgUtils2["default"].trigger(_this.el, 'onBeforeOpen');

                        _this.index = _this.s.index || index;

                        if (!_lgUtils2["default"].hasClass(document.body, 'lg-on')) {
                            _this.build(_this.index);
                            _lgUtils2["default"].addClass(document.body, 'lg-on');
                        }
                    });
                })(i);
            }
        }
    };

    Plugin.prototype.build = function (index) {

        var _this = this;

        _this.structure();

        for (var key in window.lgModules) {
            _this.modules[key] = new window.lgModules[key](_this.el);
        }

        // initiate slide function
        _this.slide(index, false, false);

        if (_this.s.keyPress) {
            _this.keyPress();
        }

        if (_this.items.length > 1) {

            _this.arrow();

            setTimeout(function () {
                _this.enableDrag();
                _this.enableSwipe();
            }, 50);

            if (_this.s.mousewheel) {
                _this.mousewheel();
            }
        }

        _this.counter();

        _this.closeGallery();

        _lgUtils2["default"].trigger(_this.el, 'onAfterOpen');

        // Hide controllers if mouse doesn't move for some period
        _lgUtils2["default"].on(_this.outer, 'mousemove.lg click.lg touchstart.lg', function () {

            _lgUtils2["default"].removeClass(_this.outer, 'lg-hide-items');

            clearTimeout(_this.hideBartimeout);

            // Timeout will be cleared on each slide movement also
            _this.hideBartimeout = setTimeout(function () {
                _lgUtils2["default"].addClass(_this.outer, 'lg-hide-items');
            }, _this.s.hideBarsDelay);
        });
    };

    Plugin.prototype.structure = function () {
        var list = '';
        var controls = '';
        var i = 0;
        var subHtmlCont = '';
        var template;
        var _this = this;

        document.body.insertAdjacentHTML('beforeend', '<div class="lg-backdrop"></div>');
        _lgUtils2["default"].setVendor(document.querySelector('.lg-backdrop'), 'TransitionDuration', this.s.backdropDuration + 'ms');

        // Create gallery items
        for (i = 0; i < this.items.length; i++) {
            list += '<div class="lg-item"></div>';
        }

        // Create controlls
        if (this.s.controls && this.items.length > 1) {
            controls = '<div class="lg-actions">' + '<div class="lg-prev lg-icon">' + this.s.prevHtml + '</div>' + '<div class="lg-next lg-icon">' + this.s.nextHtml + '</div>' + '</div>';
        }

        if (this.s.appendSubHtmlTo === '.lg-sub-html') {
            subHtmlCont = '<div class="lg-sub-html"></div>';
        }

        template = '<div class="lg-outer ' + this.s.addClass + ' ' + this.s.startClass + '">' + '<div class="lg" style="width:' + this.s.width + '; height:' + this.s.height + '">' + '<div class="lg-inner">' + list + '</div>' + '<div class="lg-toolbar group">' + '<span class="lg-close lg-icon"></span>' + '</div>' + controls + subHtmlCont + '</div>' + '</div>';

        document.body.insertAdjacentHTML('beforeend', template);
        this.outer = document.querySelector('.lg-outer');
        this.___slide = this.outer.querySelectorAll('.lg-item');

        if (this.s.useLeft) {
            _lgUtils2["default"].addClass(this.outer, 'lg-use-left');

            // Set mode lg-slide if use left is true;
            this.s.mode = 'lg-slide';
        } else {
            _lgUtils2["default"].addClass(this.outer, 'lg-use-css3');
        }

        // For fixed height gallery
        _this.setTop();
        _lgUtils2["default"].on(window, 'resize.lg orientationchange.lg', function () {
            setTimeout(function () {
                _this.setTop();
            }, 100);
        });

        // add class lg-current to remove initial transition
        _lgUtils2["default"].addClass(this.___slide[this.index], 'lg-current');

        // add Class for css support and transition mode
        if (this.doCss()) {
            _lgUtils2["default"].addClass(this.outer, 'lg-css3');
        } else {
            _lgUtils2["default"].addClass(this.outer, 'lg-css');

            // Set speed 0 because no animation will happen if browser doesn't support css3
            this.s.speed = 0;
        }

        _lgUtils2["default"].addClass(this.outer, this.s.mode);

        if (this.s.enableDrag && this.items.length > 1) {
            _lgUtils2["default"].addClass(this.outer, 'lg-grab');
        }

        if (this.s.showAfterLoad) {
            _lgUtils2["default"].addClass(this.outer, 'lg-show-after-load');
        }

        if (this.doCss()) {
            var inner = this.outer.querySelector('.lg-inner');
            _lgUtils2["default"].setVendor(inner, 'TransitionTimingFunction', this.s.cssEasing);
            _lgUtils2["default"].setVendor(inner, 'TransitionDuration', this.s.speed + 'ms');
        }

        setTimeout(function () {
            _lgUtils2["default"].addClass(document.querySelector('.lg-backdrop'), 'in');
        });

        setTimeout(function () {
            _lgUtils2["default"].addClass(_this.outer, 'lg-visible');
        }, this.s.backdropDuration);

        if (this.s.download) {
            this.outer.querySelector('.lg-toolbar').insertAdjacentHTML('beforeend', '<a id="lg-download" target="_blank" download class="lg-download lg-icon"></a>');
        }

        // Store the current scroll top value to scroll back after closing the gallery..
        this.prevScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    };

    // For fixed height gallery
    Plugin.prototype.setTop = function () {
        if (this.s.height !== '100%') {
            var wH = window.innerHeight;
            var top = (wH - parseInt(this.s.height, 10)) / 2;
            var lGallery = this.outer.querySelector('.lg');
            if (wH >= parseInt(this.s.height, 10)) {
                lGallery.style.top = top + 'px';
            } else {
                lGallery.style.top = '0px';
            }
        }
    };

    // Find css3 support
    Plugin.prototype.doCss = function () {
        // check for css animation support
        var support = function support() {
            var transition = ['transition', 'MozTransition', 'WebkitTransition', 'OTransition', 'msTransition', 'KhtmlTransition'];
            var root = document.documentElement;
            var i = 0;
            for (i = 0; i < transition.length; i++) {
                if (transition[i] in root.style) {
                    return true;
                }
            }
        };

        if (support()) {
            return true;
        }

        return false;
    };

    /**
     *  @desc Check the given src is video
     *  @param {String} src
     *  @return {Object} video type
     *  Ex:{ youtube  :  ["//www.youtube.com/watch?v=c0asJgSyxcY", "c0asJgSyxcY"] }
     */
    Plugin.prototype.isVideo = function (src, index) {

        if (!src) {
            throw new Error("Make sure that slide " + index + " has an image/video src");
        }

        var html;
        if (this.s.dynamic) {
            html = this.s.dynamicEl[index].html;
        } else {
            html = this.items[index].getAttribute('data-html');
        }

        if (!src && html) {
            return {
                html5: true
            };
        }

        var youtube = src.match(/\/\/(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)/i);
        var vimeo = src.match(/\/\/(?:www\.)?vimeo.com\/([0-9a-z\-_]+)/i);
        var dailymotion = src.match(/\/\/(?:www\.)?dai.ly\/([0-9a-z\-_]+)/i);
        var vk = src.match(/\/\/(?:www\.)?(?:vk\.com|vkontakte\.ru)\/(?:video_ext\.php\?)(.*)/i);

        if (youtube) {
            return {
                youtube: youtube
            };
        } else if (vimeo) {
            return {
                vimeo: vimeo
            };
        } else if (dailymotion) {
            return {
                dailymotion: dailymotion
            };
        } else if (vk) {
            return {
                vk: vk
            };
        }
    };

    /**
     *  @desc Create image counter
     *  Ex: 1/10
     */
    Plugin.prototype.counter = function () {
        if (this.s.counter) {
            this.outer.querySelector(this.s.appendCounterTo).insertAdjacentHTML('beforeend', '<div id="lg-counter"><span id="lg-counter-current">' + (parseInt(this.index, 10) + 1) + '</span> / <span id="lg-counter-all">' + this.items.length + '</span></div>');
        }
    };

    /**
     *  @desc add sub-html into the slide
     *  @param {Number} index - index of the slide
     */
    Plugin.prototype.addHtml = function (index) {
        var subHtml = null;
        var currentEle;
        if (this.s.dynamic) {
            subHtml = this.s.dynamicEl[index].subHtml;
        } else {
            currentEle = this.items[index];
            subHtml = currentEle.getAttribute('data-sub-html');
            if (this.s.getCaptionFromTitleOrAlt && !subHtml) {
                subHtml = currentEle.getAttribute('title');
                if (subHtml && currentEle.querySelector('img')) {
                    subHtml = currentEle.querySelector('img').getAttribute('alt');
                }
            }
        }

        if (typeof subHtml !== 'undefined' && subHtml !== null) {

            // get first letter of subhtml
            // if first letter starts with . or # get the html form the jQuery object
            var fL = subHtml.substring(0, 1);
            if (fL === '.' || fL === '#') {
                if (this.s.subHtmlSelectorRelative && !this.s.dynamic) {
                    subHtml = currentEle.querySelector(subHtml).innerHTML;
                } else {
                    subHtml = document.querySelector(subHtml).innerHTML;
                }
            }
        } else {
            subHtml = '';
        }

        if (this.s.appendSubHtmlTo === '.lg-sub-html') {
            this.outer.querySelector(this.s.appendSubHtmlTo).innerHTML = subHtml;
        } else {
            this.___slide[index].insertAdjacentHTML('beforeend', subHtml);
        }

        // Add lg-empty-html class if title doesn't exist
        if (typeof subHtml !== 'undefined' && subHtml !== null) {
            if (subHtml === '') {
                _lgUtils2["default"].addClass(this.outer.querySelector(this.s.appendSubHtmlTo), 'lg-empty-html');
            } else {
                _lgUtils2["default"].removeClass(this.outer.querySelector(this.s.appendSubHtmlTo), 'lg-empty-html');
            }
        }

        _lgUtils2["default"].trigger(this.el, 'onAfterAppendSubHtml', {
            index: index
        });
    };

    /**
     *  @desc Preload slides
     *  @param {Number} index - index of the slide
     */
    Plugin.prototype.preload = function (index) {
        var i = 1;
        var j = 1;
        for (i = 1; i <= this.s.preload; i++) {
            if (i >= this.items.length - index) {
                break;
            }

            this.loadContent(index + i, false, 0);
        }

        for (j = 1; j <= this.s.preload; j++) {
            if (index - j < 0) {
                break;
            }

            this.loadContent(index - j, false, 0);
        }
    };

    /**
     *  @desc Load slide content into slide.
     *  @param {Number} index - index of the slide.
     *  @param {Boolean} rec - if true call loadcontent() function again.
     *  @param {Boolean} delay - delay for adding complete class. it is 0 except first time.
     */
    Plugin.prototype.loadContent = function (index, rec, delay) {

        var _this = this;
        var _hasPoster = false;
        var _img;
        var _src;
        var _poster;
        var _srcset;
        var _sizes;
        var _html;
        var getResponsiveSrc = function getResponsiveSrc(srcItms) {
            var rsWidth = [];
            var rsSrc = [];
            for (var i = 0; i < srcItms.length; i++) {
                var __src = srcItms[i].split(' ');

                // Manage empty space
                if (__src[0] === '') {
                    __src.splice(0, 1);
                }

                rsSrc.push(__src[0]);
                rsWidth.push(__src[1]);
            }

            var wWidth = window.innerWidth;
            for (var j = 0; j < rsWidth.length; j++) {
                if (parseInt(rsWidth[j], 10) > wWidth) {
                    _src = rsSrc[j];
                    break;
                }
            }
        };

        if (_this.s.dynamic) {

            if (_this.s.dynamicEl[index].poster) {
                _hasPoster = true;
                _poster = _this.s.dynamicEl[index].poster;
            }

            _html = _this.s.dynamicEl[index].html;
            _src = _this.s.dynamicEl[index].src;

            if (_this.s.dynamicEl[index].responsive) {
                var srcDyItms = _this.s.dynamicEl[index].responsive.split(',');
                getResponsiveSrc(srcDyItms);
            }

            _srcset = _this.s.dynamicEl[index].srcset;
            _sizes = _this.s.dynamicEl[index].sizes;
        } else {

            if (_this.items[index].getAttribute('data-poster')) {
                _hasPoster = true;
                _poster = _this.items[index].getAttribute('data-poster');
            }

            _html = _this.items[index].getAttribute('data-html');
            _src = _this.items[index].getAttribute('href') || _this.items[index].getAttribute('data-src');

            if (_this.items[index].getAttribute('data-responsive')) {
                var srcItms = _this.items[index].getAttribute('data-responsive').split(',');
                getResponsiveSrc(srcItms);
            }

            _srcset = _this.items[index].getAttribute('data-srcset');
            _sizes = _this.items[index].getAttribute('data-sizes');
        }

        //if (_src || _srcset || _sizes || _poster) {

        var iframe = false;
        if (_this.s.dynamic) {
            if (_this.s.dynamicEl[index].iframe) {
                iframe = true;
            }
        } else {
            if (_this.items[index].getAttribute('data-iframe') === 'true') {
                iframe = true;
            }
        }

        var _isVideo = _this.isVideo(_src, index);
        if (!_lgUtils2["default"].hasClass(_this.___slide[index], 'lg-loaded')) {
            if (iframe) {
                _this.___slide[index].insertAdjacentHTML('afterbegin', '<div class="lg-video-cont" style="max-width:' + _this.s.iframeMaxWidth + '"><div class="lg-video"><iframe class="lg-object" frameborder="0" src="' + _src + '"  allowfullscreen="true"></iframe></div></div>');
            } else if (_hasPoster) {
                var videoClass = '';
                if (_isVideo && _isVideo.youtube) {
                    videoClass = 'lg-has-youtube';
                } else if (_isVideo && _isVideo.vimeo) {
                    videoClass = 'lg-has-vimeo';
                } else {
                    videoClass = 'lg-has-html5';
                }

                _this.___slide[index].insertAdjacentHTML('beforeend', '<div class="lg-video-cont ' + videoClass + ' "><div class="lg-video"><span class="lg-video-play"></span><img class="lg-object lg-has-poster" src="' + _poster + '" /></div></div>');
            } else if (_isVideo) {
                _this.___slide[index].insertAdjacentHTML('beforeend', '<div class="lg-video-cont "><div class="lg-video"></div></div>');
                _lgUtils2["default"].trigger(_this.el, 'hasVideo', {
                    index: index,
                    src: _src,
                    html: _html
                });
            } else {
                if (/\.(jpg|jpeg|png|gif)/g.test(("" + _src).toLowerCase())) {
                    _this.___slide[index].insertAdjacentHTML('beforeend', '<div class="lg-img-wrap"><img class="lg-object lg-image" src="' + _src + '" /></div>');
                } else {
                    _this.___slide[index].insertAdjacentHTML('beforeend', '<div class="lg-img-wrap"><a target="_blank" style=" color:#ffffff;" href="' + _src + '"><i class="iconfont icon-file" style="font-size: 60px;"></i><br/><div style="padding-top:10px; display:inline-block">点击查看文件</div></a></div>');
                    _lgUtils2["default"].addClass(_this.___slide[index], 'lg-is-file');
                }
            }

            _lgUtils2["default"].trigger(_this.el, 'onAferAppendSlide', {
                index: index
            });

            _img = _this.___slide[index].querySelector('.lg-object');
            if (_sizes) {
                _img.setAttribute('sizes', _sizes);
            }

            if (_srcset) {
                _img.setAttribute('srcset', _srcset);
                try {
                    picturefill({
                        elements: [_img[0]]
                    });
                } catch (e) {
                    console.error('Make sure you have included Picturefill version 2');
                }
            }

            if (this.s.appendSubHtmlTo !== '.lg-sub-html') {
                _this.addHtml(index);
            }

            _lgUtils2["default"].addClass(_this.___slide[index], 'lg-loaded');
        }

        _lgUtils2["default"].on(_this.___slide[index].querySelector('.lg-object'), 'load.lg error.lg', function () {

            // For first time add some delay for displaying the start animation.
            var _speed = 0;

            // Do not change the delay value because it is required for zoom plugin.
            // If gallery opened from direct url (hash) speed value should be 0
            if (delay && !_lgUtils2["default"].hasClass(document.body, 'lg-from-hash')) {
                _speed = delay;
            }

            setTimeout(function () {
                _lgUtils2["default"].addClass(_this.___slide[index], 'lg-complete');

                _lgUtils2["default"].trigger(_this.el, 'onSlideItemLoad', {
                    index: index,
                    delay: delay || 0
                });
            }, _speed);
        });

        // @todo check load state for html5 videos
        if (_isVideo && _isVideo.html5 && !_hasPoster) {
            _lgUtils2["default"].addClass(_this.___slide[index], 'lg-complete');
        }

        if (rec === true) {
            if (!_lgUtils2["default"].hasClass(_this.___slide[index], 'lg-complete')) {
                _lgUtils2["default"].on(_this.___slide[index].querySelector('.lg-object'), 'load.lg error.lg', function () {
                    _this.preload(index);
                });
            } else {
                _this.preload(index);
            }
        }

        //}
    };

    /**
    *   @desc slide function for lightgallery
        ** Slide() gets call on start
        ** ** Set lg.on true once slide() function gets called.
        ** Call loadContent() on slide() function inside setTimeout
        ** ** On first slide we do not want any animation like slide of fade
        ** ** So on first slide( if lg.on if false that is first slide) loadContent() should start loading immediately
        ** ** Else loadContent() should wait for the transition to complete.
        ** ** So set timeout s.speed + 50
    <=> ** loadContent() will load slide content in to the particular slide
        ** ** It has recursion (rec) parameter. if rec === true loadContent() will call preload() function.
        ** ** preload will execute only when the previous slide is fully loaded (images iframe)
        ** ** avoid simultaneous image load
    <=> ** Preload() will check for s.preload value and call loadContent() again accoring to preload value
        ** loadContent()  <====> Preload();
     *   @param {Number} index - index of the slide
    *   @param {Boolean} fromTouch - true if slide function called via touch event or mouse drag
    *   @param {Boolean} fromThumb - true if slide function called via thumbnail click
    */
    Plugin.prototype.slide = function (index, fromTouch, fromThumb) {

        var _prevIndex = 0;
        for (var i = 0; i < this.___slide.length; i++) {
            if (_lgUtils2["default"].hasClass(this.___slide[i], 'lg-current')) {
                _prevIndex = i;
                break;
            }
        }

        var _this = this;

        // Prevent if multiple call
        // Required for hsh plugin
        if (_this.lGalleryOn && _prevIndex === index) {
            return;
        }

        var _length = this.___slide.length;
        var _time = _this.lGalleryOn ? this.s.speed : 0;
        var _next = false;
        var _prev = false;

        if (!_this.lgBusy) {

            if (this.s.download) {
                var _src;
                if (_this.s.dynamic) {
                    _src = _this.s.dynamicEl[index].downloadUrl !== false && (_this.s.dynamicEl[index].downloadUrl || _this.s.dynamicEl[index].src);
                } else {
                    _src = _this.items[index].getAttribute('data-download-url') !== 'false' && (_this.items[index].getAttribute('data-download-url') || _this.items[index].getAttribute('href') || _this.items[index].getAttribute('data-src'));
                }

                if (_src) {
                    document.getElementById('lg-download').setAttribute('href', _src);
                    _lgUtils2["default"].removeClass(_this.outer, 'lg-hide-download');
                } else {
                    _lgUtils2["default"].addClass(_this.outer, 'lg-hide-download');
                }
            }

            _lgUtils2["default"].trigger(_this.el, 'onBeforeSlide', {
                prevIndex: _prevIndex,
                index: index,
                fromTouch: fromTouch,
                fromThumb: fromThumb
            });

            _this.lgBusy = true;

            clearTimeout(_this.hideBartimeout);

            // Add title if this.s.appendSubHtmlTo === lg-sub-html
            if (this.s.appendSubHtmlTo === '.lg-sub-html') {

                // wait for slide animation to complete
                setTimeout(function () {
                    _this.addHtml(index);
                }, _time);
            }

            this.arrowDisable(index);

            if (!fromTouch) {

                // remove all transitions
                _lgUtils2["default"].addClass(_this.outer, 'lg-no-trans');

                for (var j = 0; j < this.___slide.length; j++) {
                    _lgUtils2["default"].removeClass(this.___slide[j], 'lg-prev-slide');
                    _lgUtils2["default"].removeClass(this.___slide[j], 'lg-next-slide');
                }

                if (index < _prevIndex) {
                    _prev = true;
                    if (index === 0 && _prevIndex === _length - 1 && !fromThumb) {
                        _prev = false;
                        _next = true;
                    }
                } else if (index > _prevIndex) {
                    _next = true;
                    if (index === _length - 1 && _prevIndex === 0 && !fromThumb) {
                        _prev = true;
                        _next = false;
                    }
                }

                if (_prev) {

                    //prevslide
                    _lgUtils2["default"].addClass(this.___slide[index], 'lg-prev-slide');
                    _lgUtils2["default"].addClass(this.___slide[_prevIndex], 'lg-next-slide');
                } else if (_next) {

                    // next slide
                    _lgUtils2["default"].addClass(this.___slide[index], 'lg-next-slide');
                    _lgUtils2["default"].addClass(this.___slide[_prevIndex], 'lg-prev-slide');
                }

                // give 50 ms for browser to add/remove class
                setTimeout(function () {
                    _lgUtils2["default"].removeClass(_this.outer.querySelector('.lg-current'), 'lg-current');

                    //_this.$slide.eq(_prevIndex).removeClass('lg-current');
                    _lgUtils2["default"].addClass(_this.___slide[index], 'lg-current');

                    // reset all transitions
                    _lgUtils2["default"].removeClass(_this.outer, 'lg-no-trans');
                }, 50);
            } else {

                var touchPrev = index - 1;
                var touchNext = index + 1;

                if (index === 0 && _prevIndex === _length - 1) {

                    // next slide
                    touchNext = 0;
                    touchPrev = _length - 1;
                } else if (index === _length - 1 && _prevIndex === 0) {

                    // prev slide
                    touchNext = 0;
                    touchPrev = _length - 1;
                }

                _lgUtils2["default"].removeClass(_this.outer.querySelector('.lg-prev-slide'), 'lg-prev-slide');
                _lgUtils2["default"].removeClass(_this.outer.querySelector('.lg-current'), 'lg-current');
                _lgUtils2["default"].removeClass(_this.outer.querySelector('.lg-next-slide'), 'lg-next-slide');
                _lgUtils2["default"].addClass(_this.___slide[touchPrev], 'lg-prev-slide');
                _lgUtils2["default"].addClass(_this.___slide[touchNext], 'lg-next-slide');
                _lgUtils2["default"].addClass(_this.___slide[index], 'lg-current');
            }

            if (_this.lGalleryOn) {
                setTimeout(function () {
                    _this.loadContent(index, true, 0);
                }, this.s.speed + 50);

                setTimeout(function () {
                    _this.lgBusy = false;
                    _lgUtils2["default"].trigger(_this.el, 'onAfterSlide', {
                        prevIndex: _prevIndex,
                        index: index,
                        fromTouch: fromTouch,
                        fromThumb: fromThumb
                    });
                }, this.s.speed);
            } else {
                _this.loadContent(index, true, _this.s.backdropDuration);

                _this.lgBusy = false;
                _lgUtils2["default"].trigger(_this.el, 'onAfterSlide', {
                    prevIndex: _prevIndex,
                    index: index,
                    fromTouch: fromTouch,
                    fromThumb: fromThumb
                });
            }

            _this.lGalleryOn = true;

            if (this.s.counter) {
                if (document.getElementById('lg-counter-current')) {
                    document.getElementById('lg-counter-current').innerHTML = index + 1;
                }
            }
        }
    };

    /**
     *  @desc Go to next slide
     *  @param {Boolean} fromTouch - true if slide function called via touch event
     */
    Plugin.prototype.goToNextSlide = function (fromTouch) {
        var _this = this;
        if (!_this.lgBusy) {
            if (_this.index + 1 < _this.___slide.length) {
                _this.index++;
                _lgUtils2["default"].trigger(_this.el, 'onBeforeNextSlide', {
                    index: _this.index
                });
                _this.slide(_this.index, fromTouch, false);
            } else {
                if (_this.s.loop) {
                    _this.index = 0;
                    _lgUtils2["default"].trigger(_this.el, 'onBeforeNextSlide', {
                        index: _this.index
                    });
                    _this.slide(_this.index, fromTouch, false);
                } else if (_this.s.slideEndAnimatoin) {
                    _lgUtils2["default"].addClass(_this.outer, 'lg-right-end');
                    setTimeout(function () {
                        _lgUtils2["default"].removeClass(_this.outer, 'lg-right-end');
                    }, 400);
                }
            }
        }
    };

    /**
     *  @desc Go to previous slide
     *  @param {Boolean} fromTouch - true if slide function called via touch event
     */
    Plugin.prototype.goToPrevSlide = function (fromTouch) {
        var _this = this;
        if (!_this.lgBusy) {
            if (_this.index > 0) {
                _this.index--;
                _lgUtils2["default"].trigger(_this.el, 'onBeforePrevSlide', {
                    index: _this.index,
                    fromTouch: fromTouch
                });
                _this.slide(_this.index, fromTouch, false);
            } else {
                if (_this.s.loop) {
                    _this.index = _this.items.length - 1;
                    _lgUtils2["default"].trigger(_this.el, 'onBeforePrevSlide', {
                        index: _this.index,
                        fromTouch: fromTouch
                    });
                    _this.slide(_this.index, fromTouch, false);
                } else if (_this.s.slideEndAnimatoin) {
                    _lgUtils2["default"].addClass(_this.outer, 'lg-left-end');
                    setTimeout(function () {
                        _lgUtils2["default"].removeClass(_this.outer, 'lg-left-end');
                    }, 400);
                }
            }
        }
    };

    Plugin.prototype.keyPress = function () {
        var _this = this;
        if (this.items.length > 1) {
            _lgUtils2["default"].on(window, 'keyup.lg', function (e) {
                if (_this.items.length > 1) {
                    if (e.keyCode === 37) {
                        e.preventDefault();
                        _this.goToPrevSlide();
                    }

                    if (e.keyCode === 39) {
                        e.preventDefault();
                        _this.goToNextSlide();
                    }
                }
            });
        }

        _lgUtils2["default"].on(window, 'keydown.lg', function (e) {
            if (_this.s.escKey === true && e.keyCode === 27) {
                e.preventDefault();
                if (!_lgUtils2["default"].hasClass(_this.outer, 'lg-thumb-open')) {
                    _this.destroy();
                } else {
                    _lgUtils2["default"].removeClass(_this.outer, 'lg-thumb-open');
                }
            }
        });
    };

    Plugin.prototype.arrow = function () {
        var _this = this;
        _lgUtils2["default"].on(this.outer.querySelector('.lg-prev'), 'click.lg', function () {
            _this.goToPrevSlide();
        });

        _lgUtils2["default"].on(this.outer.querySelector('.lg-next'), 'click.lg', function () {
            _this.goToNextSlide();
        });
    };

    Plugin.prototype.arrowDisable = function (index) {

        // Disable arrows if s.hideControlOnEnd is true
        if (!this.s.loop && this.s.hideControlOnEnd) {
            var next = this.outer.querySelector('.lg-next');
            var prev = this.outer.querySelector('.lg-prev');
            if (index + 1 < this.___slide.length) {
                next.removeAttribute('disabled');
                _lgUtils2["default"].removeClass(next, 'disabled');
            } else {
                next.setAttribute('disabled', 'disabled');
                _lgUtils2["default"].addClass(next, 'disabled');
            }

            if (index > 0) {
                prev.removeAttribute('disabled');
                _lgUtils2["default"].removeClass(prev, 'disabled');
            } else {
                next.setAttribute('disabled', 'disabled');
                _lgUtils2["default"].addClass(next, 'disabled');
            }
        }
    };

    Plugin.prototype.setTranslate = function (el, xValue, yValue) {
        // jQuery supports Automatic CSS prefixing since jQuery 1.8.0
        if (this.s.useLeft) {
            el.style.left = xValue;
        } else {
            _lgUtils2["default"].setVendor(el, 'Transform', 'translate3d(' + xValue + 'px, ' + yValue + 'px, 0px)');
        }
    };

    Plugin.prototype.touchMove = function (startCoords, endCoords) {

        var distance = endCoords - startCoords;

        if (Math.abs(distance) > 15) {
            // reset opacity and transition duration
            _lgUtils2["default"].addClass(this.outer, 'lg-dragging');

            // move current slide
            this.setTranslate(this.___slide[this.index], distance, 0);

            // move next and prev slide with current slide
            this.setTranslate(document.querySelector('.lg-prev-slide'), -this.___slide[this.index].clientWidth + distance, 0);
            this.setTranslate(document.querySelector('.lg-next-slide'), this.___slide[this.index].clientWidth + distance, 0);
        }
    };

    Plugin.prototype.touchEnd = function (distance) {
        var _this = this;

        // keep slide animation for any mode while dragg/swipe
        if (_this.s.mode !== 'lg-slide') {
            _lgUtils2["default"].addClass(_this.outer, 'lg-slide');
        }

        for (var i = 0; i < this.___slide.length; i++) {
            if (!_lgUtils2["default"].hasClass(this.___slide[i], 'lg-current') && !_lgUtils2["default"].hasClass(this.___slide[i], 'lg-prev-slide') && !_lgUtils2["default"].hasClass(this.___slide[i], 'lg-next-slide')) {
                this.___slide[i].style.opacity = '0';
            }
        }

        // set transition duration
        setTimeout(function () {
            _lgUtils2["default"].removeClass(_this.outer, 'lg-dragging');
            if (distance < 0 && Math.abs(distance) > _this.s.swipeThreshold) {
                _this.goToNextSlide(true);
            } else if (distance > 0 && Math.abs(distance) > _this.s.swipeThreshold) {
                _this.goToPrevSlide(true);
            } else if (Math.abs(distance) < 5) {

                // Trigger click if distance is less than 5 pix
                _lgUtils2["default"].trigger(_this.el, 'onSlideClick');
            }

            for (var i = 0; i < _this.___slide.length; i++) {
                _this.___slide[i].removeAttribute('style');
            }
        });

        // remove slide class once drag/swipe is completed if mode is not slide
        setTimeout(function () {
            if (!_lgUtils2["default"].hasClass(_this.outer, 'lg-dragging') && _this.s.mode !== 'lg-slide') {
                _lgUtils2["default"].removeClass(_this.outer, 'lg-slide');
            }
        }, _this.s.speed + 100);
    };

    Plugin.prototype.enableSwipe = function () {
        var _this = this;
        var startCoords = 0;
        var endCoords = 0;
        var isMoved = false;

        if (_this.s.enableSwipe && _this.isTouch && _this.doCss()) {

            for (var i = 0; i < _this.___slide.length; i++) {
                /*jshint loopfunc: true */
                _lgUtils2["default"].on(_this.___slide[i], 'touchstart.lg', function (e) {
                    if (!_lgUtils2["default"].hasClass(_this.outer, 'lg-zoomed') && !_this.lgBusy) {
                        e.preventDefault();
                        _this.manageSwipeClass();
                        startCoords = e.targetTouches[0].pageX;
                    }
                });
            }

            for (var j = 0; j < _this.___slide.length; j++) {
                /*jshint loopfunc: true */
                _lgUtils2["default"].on(_this.___slide[j], 'touchmove.lg', function (e) {
                    if (!_lgUtils2["default"].hasClass(_this.outer, 'lg-zoomed')) {
                        e.preventDefault();
                        endCoords = e.targetTouches[0].pageX;
                        _this.touchMove(startCoords, endCoords);
                        isMoved = true;
                    }
                });
            }

            for (var k = 0; k < _this.___slide.length; k++) {
                /*jshint loopfunc: true */
                _lgUtils2["default"].on(_this.___slide[k], 'touchend.lg', function () {
                    if (!_lgUtils2["default"].hasClass(_this.outer, 'lg-zoomed')) {
                        if (isMoved) {
                            isMoved = false;
                            _this.touchEnd(endCoords - startCoords);
                        } else {
                            _lgUtils2["default"].trigger(_this.el, 'onSlideClick');
                        }
                    }
                });
            }
        }
    };

    Plugin.prototype.enableDrag = function () {
        var _this = this;
        var startCoords = 0;
        var endCoords = 0;
        var isDraging = false;
        var isMoved = false;
        if (_this.s.enableDrag && !_this.isTouch && _this.doCss()) {
            for (var i = 0; i < _this.___slide.length; i++) {
                /*jshint loopfunc: true */
                _lgUtils2["default"].on(_this.___slide[i], 'mousedown.lg', function (e) {
                    // execute only on .lg-object
                    if (!_lgUtils2["default"].hasClass(_this.outer, 'lg-zoomed')) {
                        if (_lgUtils2["default"].hasClass(e.target, 'lg-object') || _lgUtils2["default"].hasClass(e.target, 'lg-video-play')) {
                            e.preventDefault();

                            if (!_this.lgBusy) {
                                _this.manageSwipeClass();
                                startCoords = e.pageX;
                                isDraging = true;

                                // ** Fix for webkit cursor issue https://code.google.com/p/chromium/issues/detail?id=26723
                                _this.outer.scrollLeft += 1;
                                _this.outer.scrollLeft -= 1;

                                // *

                                _lgUtils2["default"].removeClass(_this.outer, 'lg-grab');
                                _lgUtils2["default"].addClass(_this.outer, 'lg-grabbing');

                                _lgUtils2["default"].trigger(_this.el, 'onDragstart');
                            }
                        }
                    }
                });
            }

            _lgUtils2["default"].on(window, 'mousemove.lg', function (e) {
                if (isDraging) {
                    isMoved = true;
                    endCoords = e.pageX;
                    _this.touchMove(startCoords, endCoords);
                    _lgUtils2["default"].trigger(_this.el, 'onDragmove');
                }
            });

            _lgUtils2["default"].on(window, 'mouseup.lg', function (e) {
                if (isMoved) {
                    isMoved = false;
                    _this.touchEnd(endCoords - startCoords);
                    _lgUtils2["default"].trigger(_this.el, 'onDragend');
                } else if (_lgUtils2["default"].hasClass(e.target, 'lg-object') || _lgUtils2["default"].hasClass(e.target, 'lg-video-play')) {
                    _lgUtils2["default"].trigger(_this.el, 'onSlideClick');
                }

                // Prevent execution on click
                if (isDraging) {
                    isDraging = false;
                    _lgUtils2["default"].removeClass(_this.outer, 'lg-grabbing');
                    _lgUtils2["default"].addClass(_this.outer, 'lg-grab');
                }
            });
        }
    };

    Plugin.prototype.manageSwipeClass = function () {
        var touchNext = this.index + 1;
        var touchPrev = this.index - 1;
        var length = this.___slide.length;
        if (this.s.loop) {
            if (this.index === 0) {
                touchPrev = length - 1;
            } else if (this.index === length - 1) {
                touchNext = 0;
            }
        }

        for (var i = 0; i < this.___slide.length; i++) {
            _lgUtils2["default"].removeClass(this.___slide[i], 'lg-next-slide');
            _lgUtils2["default"].removeClass(this.___slide[i], 'lg-prev-slide');
        }

        if (touchPrev > -1) {
            _lgUtils2["default"].addClass(this.___slide[touchPrev], 'lg-prev-slide');
        }

        _lgUtils2["default"].addClass(this.___slide[touchNext], 'lg-next-slide');
    };

    Plugin.prototype.mousewheel = function () {
        var _this = this;
        _lgUtils2["default"].on(_this.outer, 'mousewheel.lg', function (e) {

            if (!e.deltaY) {
                return;
            }

            if (e.deltaY > 0) {
                _this.goToPrevSlide();
            } else {
                _this.goToNextSlide();
            }

            e.preventDefault();
        });
    };

    Plugin.prototype.closeGallery = function () {

        var _this = this;
        var mousedown = false;
        _lgUtils2["default"].on(this.outer.querySelector('.lg-close'), 'click.lg', function () {
            _this.destroy();
        });

        if (_this.s.closable) {

            // If you drag the slide and release outside gallery gets close on chrome
            // for preventing this check mousedown and mouseup happened on .lg-item or lg-outer
            _lgUtils2["default"].on(_this.outer, 'mousedown.lg', function (e) {

                if (_lgUtils2["default"].hasClass(e.target, 'lg-outer') || _lgUtils2["default"].hasClass(e.target, 'lg-item') || _lgUtils2["default"].hasClass(e.target, 'lg-img-wrap')) {
                    mousedown = true;
                } else {
                    mousedown = false;
                }
            });

            _lgUtils2["default"].on(_this.outer, 'mouseup.lg', function (e) {

                if (_lgUtils2["default"].hasClass(e.target, 'lg-outer') || _lgUtils2["default"].hasClass(e.target, 'lg-item') || _lgUtils2["default"].hasClass(e.target, 'lg-img-wrap') && mousedown) {
                    if (!_lgUtils2["default"].hasClass(_this.outer, 'lg-dragging')) {
                        _this.destroy();
                    }
                }
            });
        }
    };

    Plugin.prototype.destroy = function (d) {

        var _this = this;

        if (!d) {
            _lgUtils2["default"].trigger(_this.el, 'onBeforeClose');
        }

        document.body.scrollTop = _this.prevScrollTop;
        document.documentElement.scrollTop = _this.prevScrollTop;

        /**
         * if d is false or undefined destroy will only close the gallery
         * plugins instance remains with the element
         *
         * if d is true destroy will completely remove the plugin
         */

        if (d) {
            if (!_this.s.dynamic) {
                // only when not using dynamic mode is $items a jquery collection

                for (var i = 0; i < this.items.length; i++) {
                    _lgUtils2["default"].off(this.items[i], '.lg');
                    _lgUtils2["default"].off(this.items[i], '.lgcustom');
                }
            }

            var lguid = _this.el.getAttribute('lg-uid');
            delete window.lgData[lguid];
            _this.el.removeAttribute('lg-uid');
        }

        // Unbind all events added by lightGallery
        _lgUtils2["default"].off(this.el, '.lgtm');

        // Distroy all lightGallery modules
        for (var key in window.lgModules) {
            if (_this.modules[key]) {
                _this.modules[key].destroy();
            }
        }

        this.lGalleryOn = false;

        clearTimeout(_this.hideBartimeout);
        this.hideBartimeout = false;
        _lgUtils2["default"].off(window, '.lg');
        _lgUtils2["default"].removeClass(document.body, 'lg-on');
        _lgUtils2["default"].removeClass(document.body, 'lg-from-hash');

        if (_this.outer) {
            _lgUtils2["default"].removeClass(_this.outer, 'lg-visible');
        }

        _lgUtils2["default"].removeClass(document.querySelector('.lg-backdrop'), 'in');
        setTimeout(function () {
            try {
                if (_this.outer) {
                    _this.outer.parentNode.removeChild(_this.outer);
                }

                if (document.querySelector('.lg-backdrop')) {
                    document.querySelector('.lg-backdrop').parentNode.removeChild(document.querySelector('.lg-backdrop'));
                }

                if (!d) {
                    _lgUtils2["default"].trigger(_this.el, 'onCloseAfter');
                }
            } catch (err) {}
        }, _this.s.backdropDuration + 50);
    };

    window.lightGallery = function (el, options) {
        if (!el) {
            return;
        }

        try {
            if (!el.getAttribute('lg-uid')) {
                var uid = 'lg' + window.lgData.uid++;
                window.lgData[uid] = new Plugin(el, options);
                el.setAttribute('lg-uid', uid);
            } else {
                try {
                    window.lgData[el.getAttribute('lg-uid')].init();
                } catch (err) {
                    console.error('lightGallery has not initiated properly');
                }
            }
        } catch (err) {
            console.error('lightGallery has not initiated properly');
        }
    };
});

/***/ }),

/***/ "j6O1":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _name = __webpack_require__("WTIP");

var _name2 = _interopRequireDefault(_name);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default']).directive('maLightGallery', maLightGallery);

maLightGallery.$inject = ['$lightGallery'];

function maLightGallery($lightGallery) {
  return {
    restrict: 'EA',
    link: link,
    scope: {
      lightGalleryConfig: '@'
    }
  };

  function link(scope, element, attrs, ctrl) {
    $lightGallery.LightGallery(element[0], attrs.lightGalleryConfig || $lightGallery.defaultConfig);
  }
}

/***/ }),

/***/ "pNVO":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _name = __webpack_require__("WTIP");

var _name2 = _interopRequireDefault(_name);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

__webpack_require__("tU0I");

angular.module(_name2['default'], []).config(function () {}).run(function () {});

__webpack_require__("j6O1");
__webpack_require__("zXSm");

exports['default'] = _name2['default'];

/***/ }),

/***/ "tU0I":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "zXSm":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _name = __webpack_require__("WTIP");

var _name2 = _interopRequireDefault(_name);

var _jquery = __webpack_require__("7t+N");

var _jquery2 = _interopRequireDefault(_jquery);

__webpack_require__("fp4c");

__webpack_require__("2cvB");

__webpack_require__("Ij6f");

__webpack_require__("MgXs");

__webpack_require__("4f6j");

__webpack_require__("D/GJ");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var LightGallery = window.lightGallery;

angular.module(_name2['default']).factory('$lightGallery', lightGalleryService);

lightGalleryService.$inject = [];

function lightGalleryService() {
  return {
    preview: preview,
    LightGallery: LightGallery,
    trigger: trigger,
    defaultConfig: {
      download: false,
      mousewheel: true,
      share: false
    }
  };

  function trigger(el, event) {
    if (document.createEvent) {
      var evObj = document.createEvent('MouseEvents');
      evObj.initEvent(event, true, false);
      el.dispatchEvent(evObj);
    } else if (document.createEventObject) {
      el.fireEvent('on' + event);
    }
  }

  function preview(images, config) {
    if (!images) {
      console.warn('请传入图片链接');
      return;
    }
    if (typeof images === 'string') {
      images = [images];
    }

    var div = (0, _jquery2['default'])('<div></div>');
    div.css({
      width: 0,
      height: 0,
      overflow: 'hidden',
      margin: 0,
      padding: 0
    });

    (0, _jquery2['default'])('body').append(div);

    images.forEach(function (d) {
      if (/.gif/g.test(('' + d).toLowerCase())) {
        if (/\?/g.test(('' + d).toLowerCase())) {
          d += '&t=' + +new Date();
        } else {
          d += '?t=' + +new Date();
        }
      }
      div.append('<div data-src="' + d + '"></div>');
    });

    this.LightGallery(div[0], _jquery2['default'].extend(_jquery2['default'].extend({}, this.defaultConfig), config));
    this.trigger(div.find('div').eq(0).get(0), 'click');

    div.bind('onBeforeClose', function (e) {
      div.remove();
    });
  }
}

/***/ })

},["pNVO"]);
//# sourceMappingURL=lightgallery.js.map