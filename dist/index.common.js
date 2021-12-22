'use strict';

var __assign = function () {
  __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};

var FaviconNotify = /** @class */ (function () {
    function FaviconNotify(options, favicon) {
        if (options === void 0) { options = {}; }
        var defaultOptions = {
            faviconUrl: '/favicon.ico',
            labelColor: '#ff0000',
            labelSize: 70,
            labelOffset: 5,
            textColor: '#ffffff',
            fontSize: 80,
            fontFamily: 'Arial',
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontVOffset: 4,
            withCounter: false,
            startCounterValue: 0,
        };
        this.options = __assign(__assign({}, defaultOptions), options);
        this.forceNotCount = false;
        this.readyCallback = null;
        this.icoLoaded = false;
        this.counter = this.options.startCounterValue;
        if (favicon) {
            this.favicon = favicon;
            this.options.faviconUrl = this.favicon.href;
        }
        else {
            this.favicon = document.createElement('link');
            this.favicon.rel = 'icon';
            this.favicon.type = 'image/x-icon';
        }
        this.ico = new Image();
        this.ico.crossOrigin = 'Anonymous';
        this.ico.src = this.options.faviconUrl;
        this.init();
    }
    FaviconNotify.prototype.init = function () {
        var _this = this;
        this.ico.addEventListener('load', function () {
            _this.icoLoaded = true;
            _this.favicon.href = _this.ico.src;
            var head = document.getElementsByTagName('head')[0];
            head.appendChild(_this.favicon);
            _this.readyCallback !== null && _this.readyCallback();
        });
    };
    FaviconNotify.prototype.drawIcon = function () {
        if (!this.icoLoaded) {
            throw new Error('Favicon not loaded');
        }
        if (!this.counter && this.forceNotCount) {
            return this.ico.src;
        }
        var cnv = document.createElement('canvas');
        cnv.width = this.ico.width;
        cnv.height = this.ico.height;
        var ctx = cnv.getContext('2d');
        var width = cnv.width;
        var height = cnv.height;
        var labelSize = (width * this.options.labelSize) / 100;
        var labelOffset = (width * this.options.labelOffset) / 100;
        var labelCenterX = width - labelSize / 2 + labelOffset;
        var labelCenterY = height - labelSize / 2 + labelOffset;
        var labelRadius = labelSize / 2 - labelOffset;
        var fontSize = (labelRadius * 2 * this.options.fontSize) / 100;
        if (ctx) {
            ctx.clearRect(0, 0, width, height);
            ctx.beginPath();
            ctx.fillStyle = this.options.labelColor;
            ctx.arc(labelCenterX, labelCenterY, labelRadius, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
            if (this.options.withCounter) {
                !this.forceNotCount && this.counter++;
                var value = this.counter < 100 ? this.counter.toString() : '99+';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.font = "".concat(this.options.fontWeight, " ").concat(this.options.fontStyle, " ").concat(fontSize, "px ").concat(this.options.fontFamily);
                ctx.fillStyle = this.options.textColor;
                ctx.fillText(value, labelCenterX, labelCenterY + this.options.fontVOffset, fontSize);
            }
            var mask = new Path2D();
            mask.moveTo(0, 0);
            mask.lineTo(width, 0);
            mask.lineTo(width, labelCenterY);
            mask.arc(labelCenterX, labelCenterY, labelSize / 2, 0, Math.PI / 2, true);
            mask.lineTo(0, height);
            ctx.clip(mask);
            ctx.drawImage(this.ico, 0, 0);
        }
        else {
            throw new Error('<canvas> not supported!');
        }
        return cnv.toDataURL();
    };
    FaviconNotify.prototype.addFavicon = function (url) {
        this.favicon && (this.favicon.href = url);
    };
    /***
     * Executes the passed callback when the Favicon Notify instance is initialized.
     *
     * @param cb // Callback function
     * @return void
     */
    FaviconNotify.prototype.ready = function (cb) {
        this.readyCallback = cb;
    };
    /***
     * Add a notification to the favicon.
     * If the WithCounter option is enabled (by default is disabled),
     * each subsequent call to this method will increment the counter by one.
     * If the WithCounter option is disabled (by default)
     * the value will not be displayed on the favicon instead,
     * an empty notification will be shown.
     *
     * @param forceNotCount: Boolean // Optional. Leaves the counter value unchanged.
     * @return faviconNotify context
     */
    FaviconNotify.prototype.add = function (forceNotCount) {
        if (forceNotCount === void 0) { forceNotCount = false; }
        this.forceNotCount = forceNotCount;
        this.addFavicon(this.drawIcon());
        return this;
    };
    /***
     * Sets the counter value and add notification from the favicon.
     * If the WithCounter option is enabled (by default is disabled),
     * this action will overwrite the counter current value.
     * If the WithCounter option is disabled (by default)
     * the value will not be displayed on the favicon instead,
     * an empty notification will be shown.
     *
     * @param value: Number
     * @return faviconNotify context
     */
    FaviconNotify.prototype.setCounter = function (value) {
        this.counter = value;
        this.add(true);
        return this;
    };
    /***
     * Remove a notification from the favicon.
     * If the "With counter" option is enabled (by default),
     * the counter will be reset to zero.
     *
     * @param forceNotCount: Boolean // Optional. Leaves the counter value unchanged.
     * @return faviconNotify context
     */
    FaviconNotify.prototype.remove = function (forceNotCount) {
        if (forceNotCount === void 0) { forceNotCount = false; }
        this.forceNotCount = forceNotCount;
        !forceNotCount && (this.counter = 0);
        this.addFavicon(this.ico.src);
        return this;
    };
    return FaviconNotify;
}());

module.exports = FaviconNotify;
