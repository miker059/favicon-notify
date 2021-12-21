var FaviconNotify = (function () {
    'use strict';

    class FaviconNotify {
        options;
        favicon;
        ico;
        appleFavicon;
        counter;
        icoLoaded;
        forceNotCount;
        readyCallback;
        constructor(options = {}, favicon) {
            const defaultOptions = {
                faviconUrl: '/favicon.ico',
                labelColor: '#ff0000',
                labelSize: 70,
                labelOffset: 5,
                textColor: '#fff',
                fontSize: 80,
                fontFamily: 'Arial',
                fontStyle: 'normal',
                fontWeight: 'bold',
                fontVOffset: 4,
                withCounter: false,
                animation: 'none',
                animationDuration: 500
            };
            this.forceNotCount = false;
            this.readyCallback = null;
            this.icoLoaded = false;
            this.counter = 0;
            this.options = { ...defaultOptions, ...options };
            this.appleFavicon = null;
            if (favicon) {
                this.favicon = favicon;
                this.options.faviconUrl = this.favicon.href;
            }
            else {
                this.favicon = document.createElement('link');
                this.favicon.rel = 'icon';
                this.favicon.type = 'image/x-icon';
            }
            this.ico = document.createElement('img');
            this.ico.src = this.options.faviconUrl;
            this.init();
        }
        init() {
            this.ico.addEventListener('load', () => {
                this.icoLoaded = true;
                this.favicon.href = this.ico.src;
                this.appleFavicon = document.querySelector('[rel=apple-touch-icon]');
                if (!this.appleFavicon) {
                    this.appleFavicon = document.createElement('link');
                    this.appleFavicon.rel = 'apple-touch-icon';
                    this.appleFavicon.setAttribute('sizes', `${this.ico.width}x${this.ico.height}`);
                    this.appleFavicon.href = this.ico.src;
                }
                const head = document.getElementsByTagName('head')[0];
                head.appendChild(this.favicon);
                head.appendChild(this.appleFavicon);
                this.readyCallback && this.readyCallback();
            });
        }
        ready(cb) {
            this.readyCallback = cb;
        }
        drawIcon() {
            if (!this.icoLoaded) {
                throw new Error('Favicon not loaded');
            }
            if (!this.counter && this.forceNotCount) {
                return this.ico.src;
            }
            const cnv = document.createElement('canvas');
            cnv.width = this.ico.width;
            cnv.height = this.ico.height;
            const ctx = cnv.getContext('2d');
            const width = cnv.width, height = cnv.height, labelSize = width * this.options.labelSize / 100, labelOffset = width * this.options.labelOffset / 100, labelCenterX = width - labelSize / 2 + labelOffset, labelCenterY = height - labelSize / 2 + labelOffset, labelRadius = labelSize / 2 - labelOffset, fontSize = labelRadius * 2 * this.options.fontSize / 100;
            if (ctx) {
                ctx.clearRect(0, 0, width, height);
                ctx.beginPath();
                ctx.fillStyle = this.options.labelColor;
                ctx.arc(labelCenterX, labelCenterY, labelRadius, 0, Math.PI * 2);
                ctx.fill();
                ctx.closePath();
                if (this.options.withCounter) {
                    !this.forceNotCount && this.counter++;
                    let value = this.counter < 100 ? this.counter.toString() : '99+';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.font = `${this.options.fontWeight} ${this.options.fontStyle} ${fontSize}px ${this.options.fontFamily}`;
                    ctx.fillStyle = this.options.textColor;
                    ctx.fillText(value, labelCenterX, (labelCenterY + this.options.fontVOffset), fontSize);
                }
                const mask = new Path2D();
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
        }
        addFavicon(url) {
            this.favicon && (this.favicon.href = url);
            this.appleFavicon && (this.appleFavicon.href = url);
        }
        add(forceNotCount = false) {
            this.forceNotCount = forceNotCount;
            this.addFavicon(this.drawIcon());
            return this;
        }
        remove(forceNotCount = false) {
            this.forceNotCount = forceNotCount;
            !forceNotCount && (this.counter = 0);
            this.addFavicon(this.ico.src);
            return this;
        }
    }

    return FaviconNotify;

})();
