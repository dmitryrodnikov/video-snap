!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{c(r.next(e))}catch(e){i(e)}}function u(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,u)}c((r=r.apply(e,t||[])).next())}))},o=this&&this.__generator||function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=a.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}};Object.defineProperty(t,"__esModule",{value:!0});var i=n(1);document.addEventListener("DOMContentLoaded",(function(){var e=document.getElementById("frames"),t=document.getElementById("fileInput"),n=document.getElementById("thumbnails");t.addEventListener("change",(function(){return r(void 0,void 0,void 0,(function(){var r,a,u;return o(this,(function(o){switch(o.label){case 0:return o.trys.push([0,2,,3]),r=t.files[0],a=window.URL.createObjectURL(r),[4,new i.VideoSnap(a).getFrames(Number(e.value))];case 1:return function(e){e.forEach((function(e){var t=document.createElement("img");t.src=e,t.style.width="150px",n.appendChild(t)}))}(o.sent()),[3,3];case 2:return u=o.sent(),console.error(u),[3,3];case 3:return[2]}}))}))}))}))},function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{c(r.next(e))}catch(e){i(e)}}function u(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,u)}c((r=r.apply(e,t||[])).next())}))},o=this&&this.__generator||function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=a.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}};Object.defineProperty(t,"__esModule",{value:!0}),t.VideoSnap=void 0;var i=function(){function e(e){this.video=document.createElement("video"),this.canvas=document.createElement("canvas");var t=this.canvas.getContext("2d");if(!t)throw new Error("Could not create canvas context");this.context=t,this.video.src=e}return e.rewindVideo=function(e,t){return new Promise((function(n){var r=function(){e.removeEventListener("seeked",r),n()};e.addEventListener("seeked",r),e.currentTime=t}))},e.prototype.getFrames=function(e,t){return void 0===t&&(t={}),r(this,void 0,void 0,(function(){return o(this,(function(n){switch(n.label){case 0:return 4===this.video.readyState?[3,2]:[4,this.waitVideoLoading(t.maxVideoLoadTime)];case 1:n.sent(),n.label=2;case 2:return this.canvas.height=this.video.videoHeight,this.canvas.width=this.video.videoWidth,[2,this.getEvenlyDistributedImages(e,t)]}}))}))},e.prototype.getFrameFrom=function(e,t){return void 0===t&&(t={}),r(this,void 0,void 0,(function(){return o(this,(function(n){switch(n.label){case 0:return this.video.crossOrigin="anonymous",4===this.video.readyState?[3,2]:[4,this.waitVideoLoading(t.maxVideoLoadTime)];case 1:n.sent(),n.label=2;case 2:return this.canvas.height=this.video.videoHeight,this.canvas.width=this.video.videoWidth,[4,this.captureImage(e,t.imageQuality)];case 3:return[2,n.sent()]}}))}))},e.prototype.waitVideoLoading=function(e){var t=this;return console.log("wait"),new Promise((function(n,r){var o=function(){a(),n()},i=function(){a(),r("Error loading video")},a=function(){t.video.removeEventListener("error",i),t.video.removeEventListener("loadedmetadata",o)};t.video.addEventListener("loadedmetadata",o),t.video.addEventListener("error",i),e&&setTimeout(i,e)}))},e.prototype.getEvenlyDistributedImages=function(e,t){return r(this,void 0,void 0,(function(){var n,r,i,a;return o(this,(function(o){switch(o.label){case 0:n=[],r=this.video.duration/e,i=0,o.label=1;case 1:return i<e?[4,this.captureImage(r*i,t.imageQuality)]:[3,4];case 2:a=o.sent(),n.push(a),o.label=3;case 3:return i++,[3,1];case 4:return[2,n]}}))}))},e.prototype.captureImage=function(t,n){return void 0===n&&(n=1),r(this,void 0,void 0,(function(){return o(this,(function(r){switch(r.label){case 0:return[4,e.rewindVideo(this.video,t)];case 1:return r.sent(),this.context.clearRect(0,0,this.canvas.width,this.canvas.height),this.context.drawImage(this.video,0,0,this.canvas.width,this.canvas.height),[2,this.convertCanvasImageToBlobUrl(this.canvas,n)]}}))}))},e.prototype.convertCanvasImageToBlobUrl=function(e,t){return new Promise((function(n){if(e.toBlob)e.toBlob((function(e){return n(window.URL.createObjectURL(e))}),"image/jpeg",t);else{if(!e.msToBlob)throw new Error("canvas.toBlob and canvas.msToBlob are not supported");var r=e.msToBlob();n(window.URL.createObjectURL(r))}}))},e}();t.VideoSnap=i}]);