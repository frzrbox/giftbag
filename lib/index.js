parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"Psyh":[function(require,module,exports) {
"use strict";function e(e){var t=e.wrapper,o=e.activeClass,r=void 0===o?"in-dark-mode":o,a=e.active,d=void 0!==a&&a,c=e.trigger,i=t.querySelectorAll("*");function l(){d?(document.body.setAttribute("data-dark-mode",!0),i.forEach(function(e){e.classList.add(r)}),d=!1,localStorage.setItem("dark-mode","true")):i.forEach(function(e){document.body.removeAttribute("data-dark-mode"),e.classList.remove(r),d=!0,localStorage.removeItem("dark-mode")})}localStorage.getItem("dark-mode")&&(d=!0),l(),c.addEventListener("click",l)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=e;
},{}],"ItTS":[function(require,module,exports) {
"use strict";function e(e){var t,r=e.provider,o=void 0===r?document.body:r,u=e.initial,n=localStorage.getItem("current theme");return t=n||u,o.setAttribute("data-theme",t),localStorage.setItem("current theme",t),{setTheme:function(e){t=e,o.setAttribute("data-theme",e),localStorage.setItem("current theme",e)},getCurrentTheme:function(){return t}}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=e;
},{}],"uRBM":[function(require,module,exports) {
"use strict";function e(e){var t=e.el;e.activeClass,e.threshold;console.log(t)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=e;
},{}],"S1Q6":[function(require,module,exports) {
"use strict";function t(t){var e=t.el,a=t.ease,r=void 0===a?"linear":a,o=!1;window.addEventListener("scroll",function(){o||window.requestAnimationFrame(function(){var t,a,n;t=window.pageYOffset+window.innerHeight/2-(e.offsetTop+e.offsetHeight/2),a=parseFloat(e.getAttribute("data-parallax-speed")),n="","vertical"===(n=e.hasAttribute("data-parallax-direction")?e.getAttribute("data-parallax-direction"):"vertical").toLowerCase()?e.style.transform="translate3d(0, ".concat(t*a/3,"px, 0)"):"horizontal"===n.toLowerCase()&&(e.style.transform="translate3d( ".concat(t*a/3,"px, 0, 0)")),e.style.transition="transform ".concat(r),o=!1}),o=!0})}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=t;
},{}],"OgKs":[function(require,module,exports) {
"use strict";function t(t){var e=t.parent,o=t.transition,a=void 0===o||o,n=t.animation,i=void 0!==n&&n,r=t.stagger,s=void 0===r?.1:r;e.querySelectorAll("*").forEach(function(t,e){a&&(t.style.transitionDelay="".concat(e*s,"s")),i&&(t.style.animationDelay="".concat(e*s,"s"))})}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=t;
},{}],"Focm":[function(require,module,exports) {
"use strict";var e=t(require("./darkMode")),r=t(require("./themeBuilder")),l=t(require("./scroll")),u=t(require("./parallax")),a=t(require("./staggerChildren"));function t(e){return e&&e.__esModule?e:{default:e}}var d=function(){return{darkMode:e.default,themeBuilder:r.default,scroll:l.default,parallax:u.default,staggerChildren:a.default}};module.exports=d;
},{"./darkMode":"Psyh","./themeBuilder":"ItTS","./scroll":"uRBM","./parallax":"S1Q6","./staggerChildren":"OgKs"}]},{},["Focm"], null)
//# sourceMappingURL=/index.js.map