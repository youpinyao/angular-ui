webpackJsonp([13],{

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

__webpack_require__("Fhdu");

angular.module(_name2['default'], []).config(function () {}).run(function () {});

__webpack_require__("j6O1");
__webpack_require__("zXSm");

exports['default'] = _name2['default'];

/***/ }),

/***/ "zXSm":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _name = __webpack_require__("WTIP");

var _name2 = _interopRequireDefault(_name);

var _jquery = __webpack_require__("7t+N");

var _jquery2 = _interopRequireDefault(_jquery);

__webpack_require__("19Qz");

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