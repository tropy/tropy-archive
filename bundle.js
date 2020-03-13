"use strict";function _interopDefault(t){return t&&"object"==typeof t&&"default"in t?t.default:t}var path=_interopDefault(require("path")),fs=_interopDefault(require("fs")),util=_interopDefault(require("util")),events=_interopDefault(require("events")),assert=_interopDefault(require("assert")),child_process=_interopDefault(require("child_process")),os=_interopDefault(require("os")),isWindows="win32"===process.platform,DEBUG=process.env.NODE_DEBUG&&/fs/.test(process.env.NODE_DEBUG);function rethrow(){var t;if(DEBUG){var e=new Error;t=function(t){t&&(e.message=t.message,r(t=e))}}else t=r;return t;function r(t){if(t){if(process.throwDeprecation)throw t;if(!process.noDeprecation){var e="fs: missing callback "+(t.stack||t.message);process.traceDeprecation?console.trace(e):console.error(e)}}}}function maybeCallback(t){return"function"==typeof t?t:rethrow()}var normalize=path.normalize;if(isWindows)var nextPartRe=/(.*?)(?:[\/\\]+|$)/g;else nextPartRe=/(.*?)(?:[\/]+|$)/g;if(isWindows)var splitRootRe=/^(?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/][^\\\/]+)?[\\\/]*/;else splitRootRe=/^[\/]*/;var realpathSync=function(t,e){if(t=path.resolve(t),e&&Object.prototype.hasOwnProperty.call(e,t))return e[t];var r,n,i,o,a=t,s={},c={};function h(){var e=splitRootRe.exec(t);r=e[0].length,n=e[0],i=e[0],o="",isWindows&&!c[i]&&(fs.lstatSync(i),c[i]=!0)}for(h();r<t.length;){nextPartRe.lastIndex=r;var l=nextPartRe.exec(t);if(o=n,n+=l[0],i=o+l[1],r=nextPartRe.lastIndex,!(c[i]||e&&e[i]===i)){var p;if(e&&Object.prototype.hasOwnProperty.call(e,i))p=e[i];else{var u=fs.lstatSync(i);if(!u.isSymbolicLink()){c[i]=!0,e&&(e[i]=i);continue}var f=null;if(!isWindows){var m=u.dev.toString(32)+":"+u.ino.toString(32);s.hasOwnProperty(m)&&(f=s[m])}null===f&&(fs.statSync(i),f=fs.readlinkSync(i)),p=path.resolve(o,f),e&&(e[i]=p),isWindows||(s[m]=f)}t=path.resolve(p,t.slice(r)),h()}}return e&&(e[a]=t),t},realpath=function(t,e,r){if("function"!=typeof r&&(r=maybeCallback(e),e=null),t=path.resolve(t),e&&Object.prototype.hasOwnProperty.call(e,t))return process.nextTick(r.bind(null,null,e[t]));var n,i,o,a,s=t,c={},h={};function l(){var e=splitRootRe.exec(t);n=e[0].length,i=e[0],o=e[0],a="",isWindows&&!h[o]?fs.lstat(o,function(t){if(t)return r(t);h[o]=!0,p()}):process.nextTick(p)}function p(){if(n>=t.length)return e&&(e[s]=t),r(null,t);nextPartRe.lastIndex=n;var c=nextPartRe.exec(t);return a=i,i+=c[0],o=a+c[1],n=nextPartRe.lastIndex,h[o]||e&&e[o]===o?process.nextTick(p):e&&Object.prototype.hasOwnProperty.call(e,o)?m(e[o]):fs.lstat(o,u)}function u(t,n){if(t)return r(t);if(!n.isSymbolicLink())return h[o]=!0,e&&(e[o]=o),process.nextTick(p);if(!isWindows){var i=n.dev.toString(32)+":"+n.ino.toString(32);if(c.hasOwnProperty(i))return f(null,c[i],o)}fs.stat(o,function(t){if(t)return r(t);fs.readlink(o,function(t,e){isWindows||(c[i]=e),f(t,e)})})}function f(t,n,i){if(t)return r(t);var o=path.resolve(a,n);e&&(e[i]=o),m(o)}function m(e){t=path.resolve(e,t.slice(n)),l()}l()},old={realpathSync:realpathSync,realpath:realpath},fs_realpath=realpath$1;realpath$1.realpath=realpath$1,realpath$1.sync=realpathSync$1,realpath$1.realpathSync=realpathSync$1,realpath$1.monkeypatch=monkeypatch,realpath$1.unmonkeypatch=unmonkeypatch;var origRealpath=fs.realpath,origRealpathSync=fs.realpathSync,version=process.version,ok=/^v[0-5]\./.test(version);function newError(t){return t&&"realpath"===t.syscall&&("ELOOP"===t.code||"ENOMEM"===t.code||"ENAMETOOLONG"===t.code)}function realpath$1(t,e,r){if(ok)return origRealpath(t,e,r);"function"==typeof e&&(r=e,e=null),origRealpath(t,e,function(n,i){newError(n)?old.realpath(t,e,r):r(n,i)})}function realpathSync$1(t,e){if(ok)return origRealpathSync(t,e);try{return origRealpathSync(t,e)}catch(r){if(newError(r))return old.realpathSync(t,e);throw r}}function monkeypatch(){fs.realpath=realpath$1,fs.realpathSync=realpathSync$1}function unmonkeypatch(){fs.realpath=origRealpath,fs.realpathSync=origRealpathSync}var concatMap=function(t,e){for(var r=[],n=0;n<t.length;n++){var i=e(t[n],n);isArray(i)?r.push.apply(r,i):r.push(i)}return r},isArray=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)},balancedMatch=balanced;function balanced(t,e,r){t instanceof RegExp&&(t=maybeMatch(t,r)),e instanceof RegExp&&(e=maybeMatch(e,r));var n=range(t,e,r);return n&&{start:n[0],end:n[1],pre:r.slice(0,n[0]),body:r.slice(n[0]+t.length,n[1]),post:r.slice(n[1]+e.length)}}function maybeMatch(t,e){var r=e.match(t);return r?r[0]:null}function range(t,e,r){var n,i,o,a,s,c=r.indexOf(t),h=r.indexOf(e,c+1),l=c;if(c>=0&&h>0){for(n=[],o=r.length;l>=0&&!s;)l==c?(n.push(l),c=r.indexOf(t,l+1)):1==n.length?s=[n.pop(),h]:((i=n.pop())<o&&(o=i,a=h),h=r.indexOf(e,l+1)),l=c<h&&c>=0?c:h;n.length&&(s=[o,a])}return s}balanced.range=range;var braceExpansion=expandTop,escSlash="\0SLASH"+Math.random()+"\0",escOpen="\0OPEN"+Math.random()+"\0",escClose="\0CLOSE"+Math.random()+"\0",escComma="\0COMMA"+Math.random()+"\0",escPeriod="\0PERIOD"+Math.random()+"\0";function numeric(t){return parseInt(t,10)==t?parseInt(t,10):t.charCodeAt(0)}function escapeBraces(t){return t.split("\\\\").join(escSlash).split("\\{").join(escOpen).split("\\}").join(escClose).split("\\,").join(escComma).split("\\.").join(escPeriod)}function unescapeBraces(t){return t.split(escSlash).join("\\").split(escOpen).join("{").split(escClose).join("}").split(escComma).join(",").split(escPeriod).join(".")}function parseCommaParts(t){if(!t)return[""];var e=[],r=balancedMatch("{","}",t);if(!r)return t.split(",");var n=r.pre,i=r.body,o=r.post,a=n.split(",");a[a.length-1]+="{"+i+"}";var s=parseCommaParts(o);return o.length&&(a[a.length-1]+=s.shift(),a.push.apply(a,s)),e.push.apply(e,a),e}function expandTop(t){return t?("{}"===t.substr(0,2)&&(t="\\{\\}"+t.substr(2)),expand(escapeBraces(t),!0).map(unescapeBraces)):[]}function embrace(t){return"{"+t+"}"}function isPadded(t){return/^-?0\d/.test(t)}function lte(t,e){return t<=e}function gte(t,e){return t>=e}function expand(t,e){var r=[],n=balancedMatch("{","}",t);if(!n||/\$$/.test(n.pre))return[t];var i,o=/^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(n.body),a=/^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(n.body),s=o||a,c=n.body.indexOf(",")>=0;if(!s&&!c)return n.post.match(/,.*\}/)?expand(t=n.pre+"{"+n.body+escClose+n.post):[t];if(s)i=n.body.split(/\.\./);else if(1===(i=parseCommaParts(n.body)).length&&1===(i=expand(i[0],!1).map(embrace)).length)return(p=n.post.length?expand(n.post,!1):[""]).map(function(t){return n.pre+i[0]+t});var h,l=n.pre,p=n.post.length?expand(n.post,!1):[""];if(s){var u=numeric(i[0]),f=numeric(i[1]),m=Math.max(i[0].length,i[1].length),d=3==i.length?Math.abs(numeric(i[2])):1,g=lte;f<u&&(d*=-1,g=gte);var y=i.some(isPadded);h=[];for(var b=u;g(b,f);b+=d){var v;if(a)"\\"===(v=String.fromCharCode(b))&&(v="");else if(v=String(b),y){var w=m-v.length;if(w>0){var E=new Array(w+1).join("0");v=b<0?"-"+E+v.slice(1):E+v}}h.push(v)}}else h=concatMap(i,function(t){return expand(t,!1)});for(var _=0;_<h.length;_++)for(var S=0;S<p.length;S++){var k=l+h[_]+p[S];(!e||s||k)&&r.push(k)}return r}var minimatch_1=minimatch;minimatch.Minimatch=Minimatch;var path$1={sep:"/"};try{path$1=path}catch(t){}var GLOBSTAR=minimatch.GLOBSTAR=Minimatch.GLOBSTAR={},plTypes={"!":{open:"(?:(?!(?:",close:"))[^/]*?)"},"?":{open:"(?:",close:")?"},"+":{open:"(?:",close:")+"},"*":{open:"(?:",close:")*"},"@":{open:"(?:",close:")"}},qmark="[^/]",star=qmark+"*?",twoStarDot="(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?",twoStarNoDot="(?:(?!(?:\\/|^)\\.).)*?",reSpecials=charSet("().*{}+?[]^$\\!");function charSet(t){return t.split("").reduce(function(t,e){return t[e]=!0,t},{})}var slashSplit=/\/+/;function filter(t,e){return e=e||{},function(r,n,i){return minimatch(r,t,e)}}function ext(t,e){t=t||{},e=e||{};var r={};return Object.keys(e).forEach(function(t){r[t]=e[t]}),Object.keys(t).forEach(function(e){r[e]=t[e]}),r}function minimatch(t,e,r){if("string"!=typeof e)throw new TypeError("glob pattern string required");return r||(r={}),!(!r.nocomment&&"#"===e.charAt(0))&&(""===e.trim()?""===t:new Minimatch(e,r).match(t))}function Minimatch(t,e){if(!(this instanceof Minimatch))return new Minimatch(t,e);if("string"!=typeof t)throw new TypeError("glob pattern string required");e||(e={}),t=t.trim(),"/"!==path$1.sep&&(t=t.split(path$1.sep).join("/")),this.options=e,this.set=[],this.pattern=t,this.regexp=null,this.negate=!1,this.comment=!1,this.empty=!1,this.make()}function make(){if(!this._made){var t=this.pattern,e=this.options;if(e.nocomment||"#"!==t.charAt(0))if(t){this.parseNegate();var r=this.globSet=this.braceExpand();e.debug&&(this.debug=console.error),this.debug(this.pattern,r),r=this.globParts=r.map(function(t){return t.split(slashSplit)}),this.debug(this.pattern,r),r=r.map(function(t,e,r){return t.map(this.parse,this)},this),this.debug(this.pattern,r),r=r.filter(function(t){return-1===t.indexOf(!1)}),this.debug(this.pattern,r),this.set=r}else this.empty=!0;else this.comment=!0}}function parseNegate(){var t=this.pattern,e=!1,r=0;if(!this.options.nonegate){for(var n=0,i=t.length;n<i&&"!"===t.charAt(n);n++)e=!e,r++;r&&(this.pattern=t.substr(r)),this.negate=e}}function braceExpand(t,e){if(e||(e=this instanceof Minimatch?this.options:{}),void 0===(t=void 0===t?this.pattern:t))throw new TypeError("undefined pattern");return e.nobrace||!t.match(/\{.*\}/)?[t]:braceExpansion(t)}minimatch.filter=filter,minimatch.defaults=function(t){if(!t||!Object.keys(t).length)return minimatch;var e=minimatch,r=function(r,n,i){return e.minimatch(r,n,ext(t,i))};return r.Minimatch=function(r,n){return new e.Minimatch(r,ext(t,n))},r},Minimatch.defaults=function(t){return t&&Object.keys(t).length?minimatch.defaults(t).Minimatch:Minimatch},Minimatch.prototype.debug=function(){},Minimatch.prototype.make=make,Minimatch.prototype.parseNegate=parseNegate,minimatch.braceExpand=function(t,e){return braceExpand(t,e)},Minimatch.prototype.braceExpand=braceExpand,Minimatch.prototype.parse=parse;var SUBPARSE={};function parse(t,e){if(t.length>65536)throw new TypeError("pattern is too long");var r=this.options;if(!r.noglobstar&&"**"===t)return GLOBSTAR;if(""===t)return"";var n,i="",o=!!r.nocase,a=!1,s=[],c=[],h=!1,l=-1,p=-1,u="."===t.charAt(0)?"":r.dot?"(?!(?:^|\\/)\\.{1,2}(?:$|\\/))":"(?!\\.)",f=this;function m(){if(n){switch(n){case"*":i+=star,o=!0;break;case"?":i+=qmark,o=!0;break;default:i+="\\"+n}f.debug("clearStateChar %j %j",n,i),n=!1}}for(var d,g=0,y=t.length;g<y&&(d=t.charAt(g));g++)if(this.debug("%s\t%s %s %j",t,g,i,d),a&&reSpecials[d])i+="\\"+d,a=!1;else switch(d){case"/":return!1;case"\\":m(),a=!0;continue;case"?":case"*":case"+":case"@":case"!":if(this.debug("%s\t%s %s %j <-- stateChar",t,g,i,d),h){this.debug("  in class"),"!"===d&&g===p+1&&(d="^"),i+=d;continue}f.debug("call clearStateChar %j",n),m(),n=d,r.noext&&m();continue;case"(":if(h){i+="(";continue}if(!n){i+="\\(";continue}s.push({type:n,start:g-1,reStart:i.length,open:plTypes[n].open,close:plTypes[n].close}),i+="!"===n?"(?:(?!(?:":"(?:",this.debug("plType %j %j",n,i),n=!1;continue;case")":if(h||!s.length){i+="\\)";continue}m(),o=!0;var b=s.pop();i+=b.close,"!"===b.type&&c.push(b),b.reEnd=i.length;continue;case"|":if(h||!s.length||a){i+="\\|",a=!1;continue}m(),i+="|";continue;case"[":if(m(),h){i+="\\"+d;continue}h=!0,p=g,l=i.length,i+=d;continue;case"]":if(g===p+1||!h){i+="\\"+d,a=!1;continue}if(h)var v,w=t.substring(p+1,g);o=!0,h=!1,i+=d;continue;default:m(),a?a=!1:!reSpecials[d]||"^"===d&&h||(i+="\\"),i+=d}for(h&&(w=t.substr(p+1),v=this.parse(w,SUBPARSE),i=i.substr(0,l)+"\\["+v[0],o=o||v[1]),b=s.pop();b;b=s.pop()){var E=i.slice(b.reStart+b.open.length);this.debug("setting tail",i,b),E=E.replace(/((?:\\{2}){0,64})(\\?)\|/g,function(t,e,r){return r||(r="\\"),e+e+r+"|"}),this.debug("tail=%j\n   %s",E,E,b,i);var _="*"===b.type?star:"?"===b.type?qmark:"\\"+b.type;o=!0,i=i.slice(0,b.reStart)+_+"\\("+E}m(),a&&(i+="\\\\");var S=!1;switch(i.charAt(0)){case".":case"[":case"(":S=!0}for(var k=c.length-1;k>-1;k--){var x=c[k],O=i.slice(0,x.reStart),A=i.slice(x.reStart,x.reEnd-8),j=i.slice(x.reEnd-8,x.reEnd),$=i.slice(x.reEnd);j+=$;var P=O.split("(").length-1,R=$;for(g=0;g<P;g++)R=R.replace(/\)[+*?]?/,"");var M="";""===($=R)&&e!==SUBPARSE&&(M="$"),i=O+A+$+M+j}if(""!==i&&o&&(i="(?=.)"+i),S&&(i=u+i),e===SUBPARSE)return[i,o];if(!o)return globUnescape(t);var I=r.nocase?"i":"";try{var G=new RegExp("^"+i+"$",I)}catch(t){return new RegExp("$.")}return G._glob=t,G._src=i,G}function makeRe(){if(this.regexp||!1===this.regexp)return this.regexp;var t=this.set;if(!t.length)return this.regexp=!1,this.regexp;var e=this.options,r=e.noglobstar?star:e.dot?twoStarDot:twoStarNoDot,n=e.nocase?"i":"",i=t.map(function(t){return t.map(function(t){return t===GLOBSTAR?r:"string"==typeof t?regExpEscape(t):t._src}).join("\\/")}).join("|");i="^(?:"+i+")$",this.negate&&(i="^(?!"+i+").*$");try{this.regexp=new RegExp(i,n)}catch(t){this.regexp=!1}return this.regexp}function match(t,e){if(this.debug("match",t,this.pattern),this.comment)return!1;if(this.empty)return""===t;if("/"===t&&e)return!0;var r=this.options;"/"!==path$1.sep&&(t=t.split(path$1.sep).join("/")),t=t.split(slashSplit),this.debug(this.pattern,"split",t);var n,i,o=this.set;for(this.debug(this.pattern,"set",o),i=t.length-1;i>=0&&!(n=t[i]);i--);for(i=0;i<o.length;i++){var a=o[i],s=t;if(r.matchBase&&1===a.length&&(s=[n]),this.matchOne(s,a,e))return!!r.flipNegate||!this.negate}return!r.flipNegate&&this.negate}function globUnescape(t){return t.replace(/\\(.)/g,"$1")}function regExpEscape(t){return t.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")}function createCommonjsModule(t,e){return t(e={exports:{}},e.exports),e.exports}minimatch.makeRe=function(t,e){return new Minimatch(t,e||{}).makeRe()},Minimatch.prototype.makeRe=makeRe,minimatch.match=function(t,e,r){var n=new Minimatch(e,r=r||{});return t=t.filter(function(t){return n.match(t)}),n.options.nonull&&!t.length&&t.push(e),t},Minimatch.prototype.match=match,Minimatch.prototype.matchOne=function(t,e,r){var n=this.options;this.debug("matchOne",{this:this,file:t,pattern:e}),this.debug("matchOne",t.length,e.length);for(var i=0,o=0,a=t.length,s=e.length;i<a&&o<s;i++,o++){this.debug("matchOne loop");var c,h=e[o],l=t[i];if(this.debug(e,h,l),!1===h)return!1;if(h===GLOBSTAR){this.debug("GLOBSTAR",[e,h,l]);var p=i,u=o+1;if(u===s){for(this.debug("** at the end");i<a;i++)if("."===t[i]||".."===t[i]||!n.dot&&"."===t[i].charAt(0))return!1;return!0}for(;p<a;){var f=t[p];if(this.debug("\nglobstar while",t,p,e,u,f),this.matchOne(t.slice(p),e.slice(u),r))return this.debug("globstar found match!",p,a,f),!0;if("."===f||".."===f||!n.dot&&"."===f.charAt(0)){this.debug("dot detected!",t,p,e,u);break}this.debug("globstar swallow a segment, and continue"),p++}return!(!r||(this.debug("\n>>> no match, partial?",t,p,e,u),p!==a))}if("string"==typeof h?(c=n.nocase?l.toLowerCase()===h.toLowerCase():l===h,this.debug("string match",h,l,c)):(c=l.match(h),this.debug("pattern match",h,l,c)),!c)return!1}if(i===a&&o===s)return!0;if(i===a)return r;if(o===s)return i===a-1&&""===t[i];throw new Error("wtf?")};var inherits_browser=createCommonjsModule(function(t){"function"==typeof Object.create?t.exports=function(t,e){e&&(t.super_=e,t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}))}:t.exports=function(t,e){if(e){t.super_=e;var r=function(){};r.prototype=e.prototype,t.prototype=new r,t.prototype.constructor=t}}}),inherits=createCommonjsModule(function(t){try{var e=util;if("function"!=typeof e.inherits)throw"";t.exports=e.inherits}catch(e){t.exports=inherits_browser}});function posix(t){return"/"===t.charAt(0)}function win32(t){var e=/^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/.exec(t),r=e[1]||"",n=Boolean(r&&":"!==r.charAt(1));return Boolean(e[2]||n)}var pathIsAbsolute="win32"===process.platform?win32:posix,posix_1=posix,win32_1=win32;pathIsAbsolute.posix=posix_1,pathIsAbsolute.win32=win32_1;var alphasort_1=alphasort,alphasorti_1=alphasorti,setopts_1=setopts,ownProp_1=ownProp,makeAbs_1=makeAbs,finish_1=finish,mark_1=mark,isIgnored_1=isIgnored,childrenIgnored_1=childrenIgnored;function ownProp(t,e){return Object.prototype.hasOwnProperty.call(t,e)}var Minimatch$1=minimatch_1.Minimatch;function alphasorti(t,e){return t.toLowerCase().localeCompare(e.toLowerCase())}function alphasort(t,e){return t.localeCompare(e)}function setupIgnores(t,e){t.ignore=e.ignore||[],Array.isArray(t.ignore)||(t.ignore=[t.ignore]),t.ignore.length&&(t.ignore=t.ignore.map(ignoreMap))}function ignoreMap(t){var e=null;if("/**"===t.slice(-3)){var r=t.replace(/(\/\*\*)+$/,"");e=new Minimatch$1(r,{dot:!0})}return{matcher:new Minimatch$1(t,{dot:!0}),gmatcher:e}}function setopts(t,e,r){if(r||(r={}),r.matchBase&&-1===e.indexOf("/")){if(r.noglobstar)throw new Error("base matching requires globstar");e="**/"+e}t.silent=!!r.silent,t.pattern=e,t.strict=!1!==r.strict,t.realpath=!!r.realpath,t.realpathCache=r.realpathCache||Object.create(null),t.follow=!!r.follow,t.dot=!!r.dot,t.mark=!!r.mark,t.nodir=!!r.nodir,t.nodir&&(t.mark=!0),t.sync=!!r.sync,t.nounique=!!r.nounique,t.nonull=!!r.nonull,t.nosort=!!r.nosort,t.nocase=!!r.nocase,t.stat=!!r.stat,t.noprocess=!!r.noprocess,t.absolute=!!r.absolute,t.maxLength=r.maxLength||1/0,t.cache=r.cache||Object.create(null),t.statCache=r.statCache||Object.create(null),t.symlinks=r.symlinks||Object.create(null),setupIgnores(t,r),t.changedCwd=!1;var n=process.cwd();ownProp(r,"cwd")?(t.cwd=path.resolve(r.cwd),t.changedCwd=t.cwd!==n):t.cwd=n,t.root=r.root||path.resolve(t.cwd,"/"),t.root=path.resolve(t.root),"win32"===process.platform&&(t.root=t.root.replace(/\\/g,"/")),t.cwdAbs=pathIsAbsolute(t.cwd)?t.cwd:makeAbs(t,t.cwd),"win32"===process.platform&&(t.cwdAbs=t.cwdAbs.replace(/\\/g,"/")),t.nomount=!!r.nomount,r.nonegate=!0,r.nocomment=!0,t.minimatch=new Minimatch$1(e,r),t.options=t.minimatch.options}function finish(t){for(var e=t.nounique,r=e?[]:Object.create(null),n=0,i=t.matches.length;n<i;n++){var o=t.matches[n];if(o&&0!==Object.keys(o).length){var a=Object.keys(o);e?r.push.apply(r,a):a.forEach(function(t){r[t]=!0})}else if(t.nonull){var s=t.minimatch.globSet[n];e?r.push(s):r[s]=!0}}if(e||(r=Object.keys(r)),t.nosort||(r=r.sort(t.nocase?alphasorti:alphasort)),t.mark){for(n=0;n<r.length;n++)r[n]=t._mark(r[n]);t.nodir&&(r=r.filter(function(e){var r=!/\/$/.test(e),n=t.cache[e]||t.cache[makeAbs(t,e)];return r&&n&&(r="DIR"!==n&&!Array.isArray(n)),r}))}t.ignore.length&&(r=r.filter(function(e){return!isIgnored(t,e)})),t.found=r}function mark(t,e){var r=makeAbs(t,e),n=t.cache[r],i=e;if(n){var o="DIR"===n||Array.isArray(n),a="/"===e.slice(-1);if(o&&!a?i+="/":!o&&a&&(i=i.slice(0,-1)),i!==e){var s=makeAbs(t,i);t.statCache[s]=t.statCache[r],t.cache[s]=t.cache[r]}}return i}function makeAbs(t,e){var r=e;return r="/"===e.charAt(0)?path.join(t.root,e):pathIsAbsolute(e)||""===e?e:t.changedCwd?path.resolve(t.cwd,e):path.resolve(e),"win32"===process.platform&&(r=r.replace(/\\/g,"/")),r}function isIgnored(t,e){return!!t.ignore.length&&t.ignore.some(function(t){return t.matcher.match(e)||!(!t.gmatcher||!t.gmatcher.match(e))})}function childrenIgnored(t,e){return!!t.ignore.length&&t.ignore.some(function(t){return!(!t.gmatcher||!t.gmatcher.match(e))})}var common={alphasort:alphasort_1,alphasorti:alphasorti_1,setopts:setopts_1,ownProp:ownProp_1,makeAbs:makeAbs_1,finish:finish_1,mark:mark_1,isIgnored:isIgnored_1,childrenIgnored:childrenIgnored_1},wrappy_1=wrappy;function wrappy(t,e){if(t&&e)return wrappy(t)(e);if("function"!=typeof t)throw new TypeError("need wrapper function");return Object.keys(t).forEach(function(e){r[e]=t[e]}),r;function r(){for(var e=new Array(arguments.length),r=0;r<e.length;r++)e[r]=arguments[r];var n=t.apply(this,e),i=e[e.length-1];return"function"==typeof n&&n!==i&&Object.keys(i).forEach(function(t){n[t]=i[t]}),n}}var once_1=wrappy_1(once),strict=wrappy_1(onceStrict);function once(t){var e=function(){return e.called?e.value:(e.called=!0,e.value=t.apply(this,arguments))};return e.called=!1,e}function onceStrict(t){var e=function(){if(e.called)throw new Error(e.onceError);return e.called=!0,e.value=t.apply(this,arguments)},r=t.name||"Function wrapped with `once`";return e.onceError=r+" shouldn't be called more than once",e.called=!1,e}once.proto=once(function(){Object.defineProperty(Function.prototype,"once",{value:function(){return once(this)},configurable:!0}),Object.defineProperty(Function.prototype,"onceStrict",{value:function(){return onceStrict(this)},configurable:!0})}),once_1.strict=strict;var reqs=Object.create(null),inflight_1=wrappy_1(inflight);function inflight(t,e){return reqs[t]?(reqs[t].push(e),null):(reqs[t]=[e],makeres(t))}function makeres(t){return once_1(function e(){var r=reqs[t],n=r.length,i=slice(arguments);try{for(var o=0;o<n;o++)r[o].apply(null,i)}finally{r.length>n?(r.splice(0,n),process.nextTick(function(){e.apply(null,i)})):delete reqs[t]}})}function slice(t){for(var e=t.length,r=[],n=0;n<e;n++)r[n]=t[n];return r}var glob_1=glob,EE=events.EventEmitter,globSync={},setopts$1=common.setopts,ownProp$1=common.ownProp,childrenIgnored$1=common.childrenIgnored,isIgnored$1=common.isIgnored;function glob(t,e,r){if("function"==typeof e&&(r=e,e={}),e||(e={}),e.sync){if(r)throw new TypeError("callback provided to sync glob");return globSync(t,e)}return new Glob(t,e,r)}glob.sync=globSync;var GlobSync=glob.GlobSync=globSync.GlobSync;function extend(t,e){if(null===e||"object"!=typeof e)return t;for(var r=Object.keys(e),n=r.length;n--;)t[r[n]]=e[r[n]];return t}function Glob(t,e,r){if("function"==typeof e&&(r=e,e=null),e&&e.sync){if(r)throw new TypeError("callback provided to sync glob");return new GlobSync(t,e)}if(!(this instanceof Glob))return new Glob(t,e,r);setopts$1(this,t,e),this._didRealPath=!1;var n=this.minimatch.set.length;this.matches=new Array(n),"function"==typeof r&&(r=once_1(r),this.on("error",r),this.on("end",function(t){r(null,t)}));var i=this;if(this._processing=0,this._emitQueue=[],this._processQueue=[],this.paused=!1,this.noprocess)return this;if(0===n)return s();for(var o=!0,a=0;a<n;a++)this._process(this.minimatch.set[a],a,!1,s);function s(){--i._processing,i._processing<=0&&(o?process.nextTick(function(){i._finish()}):i._finish())}o=!1}function readdirCb(t,e,r){return function(n,i){n?t._readdirError(e,n,r):t._readdirEntries(e,i,r)}}glob.glob=glob,glob.hasMagic=function(t,e){var r=extend({},e);r.noprocess=!0;var n=new Glob(t,r).minimatch.set;if(!t)return!1;if(n.length>1)return!0;for(var i=0;i<n[0].length;i++)if("string"!=typeof n[0][i])return!0;return!1},glob.Glob=Glob,inherits(Glob,EE),Glob.prototype._finish=function(){if(assert(this instanceof Glob),!this.aborted){if(this.realpath&&!this._didRealpath)return this._realpath();common.finish(this),this.emit("end",this.found)}},Glob.prototype._realpath=function(){if(!this._didRealpath){this._didRealpath=!0;var t=this.matches.length;if(0===t)return this._finish();for(var e=this,r=0;r<this.matches.length;r++)this._realpathSet(r,n)}function n(){0==--t&&e._finish()}},Glob.prototype._realpathSet=function(t,e){var r=this.matches[t];if(!r)return e();var n=Object.keys(r),i=this,o=n.length;if(0===o)return e();var a=this.matches[t]=Object.create(null);n.forEach(function(r,n){r=i._makeAbs(r),fs_realpath.realpath(r,i.realpathCache,function(n,s){n?"stat"===n.syscall?a[r]=!0:i.emit("error",n):a[s]=!0,0==--o&&(i.matches[t]=a,e())})})},Glob.prototype._mark=function(t){return common.mark(this,t)},Glob.prototype._makeAbs=function(t){return common.makeAbs(this,t)},Glob.prototype.abort=function(){this.aborted=!0,this.emit("abort")},Glob.prototype.pause=function(){this.paused||(this.paused=!0,this.emit("pause"))},Glob.prototype.resume=function(){if(this.paused){if(this.emit("resume"),this.paused=!1,this._emitQueue.length){var t=this._emitQueue.slice(0);this._emitQueue.length=0;for(var e=0;e<t.length;e++){var r=t[e];this._emitMatch(r[0],r[1])}}if(this._processQueue.length){var n=this._processQueue.slice(0);this._processQueue.length=0;for(e=0;e<n.length;e++){var i=n[e];this._processing--,this._process(i[0],i[1],i[2],i[3])}}}},Glob.prototype._process=function(t,e,r,n){if(assert(this instanceof Glob),assert("function"==typeof n),!this.aborted)if(this._processing++,this.paused)this._processQueue.push([t,e,r,n]);else{for(var i,o=0;"string"==typeof t[o];)o++;switch(o){case t.length:return void this._processSimple(t.join("/"),e,n);case 0:i=null;break;default:i=t.slice(0,o).join("/")}var a,s=t.slice(o);null===i?a=".":pathIsAbsolute(i)||pathIsAbsolute(t.join("/"))?(i&&pathIsAbsolute(i)||(i="/"+i),a=i):a=i;var c=this._makeAbs(a);if(childrenIgnored$1(this,a))return n();s[0]===minimatch_1.GLOBSTAR?this._processGlobStar(i,a,c,s,e,r,n):this._processReaddir(i,a,c,s,e,r,n)}},Glob.prototype._processReaddir=function(t,e,r,n,i,o,a){var s=this;this._readdir(r,o,function(c,h){return s._processReaddir2(t,e,r,n,i,o,h,a)})},Glob.prototype._processReaddir2=function(t,e,r,n,i,o,a,s){if(!a)return s();for(var c=n[0],h=!!this.minimatch.negate,l=c._glob,p=this.dot||"."===l.charAt(0),u=[],f=0;f<a.length;f++){if("."!==(d=a[f]).charAt(0)||p)(h&&!t?!d.match(c):d.match(c))&&u.push(d)}var m=u.length;if(0===m)return s();if(1===n.length&&!this.mark&&!this.stat){this.matches[i]||(this.matches[i]=Object.create(null));for(f=0;f<m;f++){var d=u[f];t&&(d="/"!==t?t+"/"+d:t+d),"/"!==d.charAt(0)||this.nomount||(d=path.join(this.root,d)),this._emitMatch(i,d)}return s()}n.shift();for(f=0;f<m;f++){d=u[f];t&&(d="/"!==t?t+"/"+d:t+d),this._process([d].concat(n),i,o,s)}s()},Glob.prototype._emitMatch=function(t,e){if(!this.aborted&&!isIgnored$1(this,e))if(this.paused)this._emitQueue.push([t,e]);else{var r=pathIsAbsolute(e)?e:this._makeAbs(e);if(this.mark&&(e=this._mark(e)),this.absolute&&(e=r),!this.matches[t][e]){if(this.nodir){var n=this.cache[r];if("DIR"===n||Array.isArray(n))return}this.matches[t][e]=!0;var i=this.statCache[r];i&&this.emit("stat",e,i),this.emit("match",e)}}},Glob.prototype._readdirInGlobStar=function(t,e){if(!this.aborted){if(this.follow)return this._readdir(t,!1,e);var r=this,n=inflight_1("lstat\0"+t,function(n,i){if(n&&"ENOENT"===n.code)return e();var o=i&&i.isSymbolicLink();r.symlinks[t]=o,o||!i||i.isDirectory()?r._readdir(t,!1,e):(r.cache[t]="FILE",e())});n&&fs.lstat(t,n)}},Glob.prototype._readdir=function(t,e,r){if(!this.aborted&&(r=inflight_1("readdir\0"+t+"\0"+e,r))){if(e&&!ownProp$1(this.symlinks,t))return this._readdirInGlobStar(t,r);if(ownProp$1(this.cache,t)){var n=this.cache[t];if(!n||"FILE"===n)return r();if(Array.isArray(n))return r(null,n)}fs.readdir(t,readdirCb(this,t,r))}},Glob.prototype._readdirEntries=function(t,e,r){if(!this.aborted){if(!this.mark&&!this.stat)for(var n=0;n<e.length;n++){var i=e[n];i="/"===t?t+i:t+"/"+i,this.cache[i]=!0}return this.cache[t]=e,r(null,e)}},Glob.prototype._readdirError=function(t,e,r){if(!this.aborted){switch(e.code){case"ENOTSUP":case"ENOTDIR":var n=this._makeAbs(t);if(this.cache[n]="FILE",n===this.cwdAbs){var i=new Error(e.code+" invalid cwd "+this.cwd);i.path=this.cwd,i.code=e.code,this.emit("error",i),this.abort()}break;case"ENOENT":case"ELOOP":case"ENAMETOOLONG":case"UNKNOWN":this.cache[this._makeAbs(t)]=!1;break;default:this.cache[this._makeAbs(t)]=!1,this.strict&&(this.emit("error",e),this.abort()),this.silent||console.error("glob error",e)}return r()}},Glob.prototype._processGlobStar=function(t,e,r,n,i,o,a){var s=this;this._readdir(r,o,function(c,h){s._processGlobStar2(t,e,r,n,i,o,h,a)})},Glob.prototype._processGlobStar2=function(t,e,r,n,i,o,a,s){if(!a)return s();var c=n.slice(1),h=t?[t]:[],l=h.concat(c);this._process(l,i,!1,s);var p=this.symlinks[r],u=a.length;if(p&&o)return s();for(var f=0;f<u;f++){if("."!==a[f].charAt(0)||this.dot){var m=h.concat(a[f],c);this._process(m,i,!0,s);var d=h.concat(a[f],n);this._process(d,i,!0,s)}}s()},Glob.prototype._processSimple=function(t,e,r){var n=this;this._stat(t,function(i,o){n._processSimple2(t,e,i,o,r)})},Glob.prototype._processSimple2=function(t,e,r,n,i){if(this.matches[e]||(this.matches[e]=Object.create(null)),!n)return i();if(t&&pathIsAbsolute(t)&&!this.nomount){var o=/[\/\\]$/.test(t);"/"===t.charAt(0)?t=path.join(this.root,t):(t=path.resolve(this.root,t),o&&(t+="/"))}"win32"===process.platform&&(t=t.replace(/\\/g,"/")),this._emitMatch(e,t),i()},Glob.prototype._stat=function(t,e){var r=this._makeAbs(t),n="/"===t.slice(-1);if(t.length>this.maxLength)return e();if(!this.stat&&ownProp$1(this.cache,r)){var i=this.cache[r];if(Array.isArray(i)&&(i="DIR"),!n||"DIR"===i)return e(null,i);if(n&&"FILE"===i)return e()}var o=this.statCache[r];if(void 0!==o){if(!1===o)return e(null,o);var a=o.isDirectory()?"DIR":"FILE";return n&&"FILE"===a?e():e(null,a,o)}var s=this,c=inflight_1("stat\0"+r,function(n,i){if(i&&i.isSymbolicLink())return fs.stat(r,function(n,o){n?s._stat2(t,r,null,i,e):s._stat2(t,r,n,o,e)});s._stat2(t,r,n,i,e)});c&&fs.lstat(r,c)},Glob.prototype._stat2=function(t,e,r,n,i){if(r&&("ENOENT"===r.code||"ENOTDIR"===r.code))return this.statCache[e]=!1,i();var o="/"===t.slice(-1);if(this.statCache[e]=n,"/"===e.slice(-1)&&n&&!n.isDirectory())return i(null,!1,n);var a=!0;return n&&(a=n.isDirectory()?"DIR":"FILE"),this.cache[e]=this.cache[e]||a,o&&"FILE"===a?i():i(null,a,n)};let glob$1=void 0;try{glob$1=glob_1}catch(t){}const defaultGlobOpts={nosort:!0,silent:!0};let timeout=0;const isWindows$1="win32"===process.platform,defaults=t=>{if(["unlink","chmod","stat","lstat","rmdir","readdir"].forEach(e=>{t[e]=t[e]||fs[e],t[e+="Sync"]=t[e]||fs[e]}),t.maxBusyTries=t.maxBusyTries||3,t.emfileWait=t.emfileWait||1e3,!1===t.glob&&(t.disableGlob=!0),!0!==t.disableGlob&&void 0===glob$1)throw Error("glob dependency not found, set `options.disableGlob = true` if intentional");t.disableGlob=t.disableGlob||!1,t.glob=t.glob||defaultGlobOpts},rimraf=(t,e,r)=>{"function"==typeof e&&(r=e,e={}),assert(t,"rimraf: missing path"),assert.equal(typeof t,"string","rimraf: path should be a string"),assert.equal(typeof r,"function","rimraf: callback function required"),assert(e,"rimraf: invalid options argument provided"),assert.equal(typeof e,"object","rimraf: options should be object"),defaults(e);let n=0,i=null,o=0;const a=(t,a)=>t?r(t):0===(o=a.length)?r():void a.forEach(t=>{const a=s=>{if(s){if(("EBUSY"===s.code||"ENOTEMPTY"===s.code||"EPERM"===s.code)&&n<e.maxBusyTries)return n++,setTimeout(()=>rimraf_(t,e,a),100*n);if("EMFILE"===s.code&&timeout<e.emfileWait)return setTimeout(()=>rimraf_(t,e,a),timeout++);"ENOENT"===s.code&&(s=null)}timeout=0,(t=>{i=i||t,0==--o&&r(i)})(s)};rimraf_(t,e,a)});if(e.disableGlob||!glob$1.hasMagic(t))return a(null,[t]);e.lstat(t,(r,n)=>{if(!r)return a(null,[t]);glob$1(t,e.glob,a)})},rimraf_=(t,e,r)=>{assert(t),assert(e),assert("function"==typeof r),e.lstat(t,(n,i)=>n&&"ENOENT"===n.code?r(null):(n&&"EPERM"===n.code&&isWindows$1&&fixWinEPERM(t,e,n,r),i&&i.isDirectory()?rmdir(t,e,n,r):void e.unlink(t,n=>{if(n){if("ENOENT"===n.code)return r(null);if("EPERM"===n.code)return isWindows$1?fixWinEPERM(t,e,n,r):rmdir(t,e,n,r);if("EISDIR"===n.code)return rmdir(t,e,n,r)}return r(n)})))},fixWinEPERM=(t,e,r,n)=>{assert(t),assert(e),assert("function"==typeof n),e.chmod(t,438,i=>{i?n("ENOENT"===i.code?null:r):e.stat(t,(i,o)=>{i?n("ENOENT"===i.code?null:r):o.isDirectory()?rmdir(t,e,r,n):e.unlink(t,n)})})},fixWinEPERMSync=(t,e,r)=>{assert(t),assert(e);try{e.chmodSync(t,438)}catch(t){if("ENOENT"===t.code)return;throw r}let n;try{n=e.statSync(t)}catch(t){if("ENOENT"===t.code)return;throw r}n.isDirectory()?rmdirSync(t,e,r):e.unlinkSync(t)},rmdir=(t,e,r,n)=>{assert(t),assert(e),assert("function"==typeof n),e.rmdir(t,i=>{!i||"ENOTEMPTY"!==i.code&&"EEXIST"!==i.code&&"EPERM"!==i.code?i&&"ENOTDIR"===i.code?n(r):n(i):rmkids(t,e,n)})},rmkids=(t,e,r)=>{assert(t),assert(e),assert("function"==typeof r),e.readdir(t,(n,i)=>{if(n)return r(n);let o,a=i.length;if(0===a)return e.rmdir(t,r);i.forEach(n=>{rimraf(path.join(t,n),e,n=>{if(!o)return n?r(o=n):void(0==--a&&e.rmdir(t,r))})})})},rimrafSync=(t,e)=>{let r;if(defaults(e=e||{}),assert(t,"rimraf: missing path"),assert.equal(typeof t,"string","rimraf: path should be a string"),assert(e,"rimraf: missing options"),assert.equal(typeof e,"object","rimraf: options should be object"),e.disableGlob||!glob$1.hasMagic(t))r=[t];else try{e.lstatSync(t),r=[t]}catch(n){r=glob$1.sync(t,e.glob)}if(r.length)for(let t=0;t<r.length;t++){const n=r[t];let i;try{i=e.lstatSync(n)}catch(t){if("ENOENT"===t.code)return;"EPERM"===t.code&&isWindows$1&&fixWinEPERMSync(n,e,t)}try{i&&i.isDirectory()?rmdirSync(n,e,null):e.unlinkSync(n)}catch(t){if("ENOENT"===t.code)return;if("EPERM"===t.code)return isWindows$1?fixWinEPERMSync(n,e,t):rmdirSync(n,e,t);if("EISDIR"!==t.code)throw t;rmdirSync(n,e,t)}}},rmdirSync=(t,e,r)=>{assert(t),assert(e);try{e.rmdirSync(t)}catch(n){if("ENOENT"===n.code)return;if("ENOTDIR"===n.code)throw r;"ENOTEMPTY"!==n.code&&"EEXIST"!==n.code&&"EPERM"!==n.code||rmkidsSync(t,e)}},rmkidsSync=(t,e)=>{assert(t),assert(e),e.readdirSync(t).forEach(r=>rimrafSync(path.join(t,r),e));const r=isWindows$1?100:1;let n=0;for(;;){let i=!0;try{const o=e.rmdirSync(t,e);return i=!1,o}finally{if(++n<r&&i)continue}}};var rimraf_1=rimraf;rimraf.sync=rimrafSync;var crossZip={zip:zip,zipSync:zipSync,unzip:unzip,unzipSync:unzipSync};function zip(t,e,r){function n(){"win32"===process.platform?rimraf_1(e,i):i()}function i(){var n={cwd:path.dirname(t),maxBuffer:1/0};child_process.execFile(getZipCommand(),getZipArgs(t,e),n,function(t){r(t)})}r||(r=function(){}),"win32"===process.platform?fs.stat(t,function(e,i){if(e)return r(e);i.isFile()?fs.readFile(t,function(e,i){if(e)return r(e);var o=path.join(os.tmpdir(),"cross-zip-"+Date.now());fs.mkdir(o,function(e){if(e)return r(e);fs.writeFile(path.join(o,path.basename(t)),i,function(e){if(e)return r(e);t=o,n()})})}):n()}):n()}function zipSync(t,e){if("win32"===process.platform){if(fs.statSync(t).isFile()){var r=fs.readFileSync(t),n=path.join(os.tmpdir(),"cross-zip-"+Date.now());fs.mkdirSync(n),fs.writeFileSync(path.join(n,path.basename(t)),r),t=n}rimraf_1.sync(e)}var i={cwd:path.dirname(t),maxBuffer:1/0};child_process.execFileSync(getZipCommand(),getZipArgs(t,e),i)}function unzip(t,e,r){r||(r=function(){});var n={maxBuffer:1/0};child_process.execFile(getUnzipCommand(),getUnzipArgs(t,e),n,function(t){r(t)})}function unzipSync(t,e){var r={maxBuffer:1/0};child_process.execFileSync(getUnzipCommand(),getUnzipArgs(t,e),r)}function getZipCommand(){return"win32"===process.platform?"powershell.exe":"zip"}function getUnzipCommand(){return"win32"===process.platform?"powershell.exe":"unzip"}function getZipArgs(t,e){return"win32"===process.platform?["-nologo","-noprofile","-command",'& { param([String]$myInPath, [String]$myOutPath); Add-Type -A "System.IO.Compression.FileSystem"; [IO.Compression.ZipFile]::CreateFromDirectory($myInPath, $myOutPath); }',"-myInPath",t,"-myOutPath",e]:["-r","-y",e,path.basename(t)]}function getUnzipArgs(t,e){return"win32"===process.platform?["-nologo","-noprofile","-command",'& { param([String]$myInPath, [String]$myOutPath); Add-Type -A "System.IO.Compression.FileSystem"; [IO.Compression.ZipFile]::ExtractToDirectory($myInPath, $myOutPath); }',"-myInPath",t,"-myOutPath",e]:["-o",t,"-d",e]}const{join:join,extname:extname,relative:relative,basename:basename}=path,{tmpdir:tmpdir}=os,{promisify:promisify}=util,zip$1=promisify(crossZip.zip),{copyFile:copyFile,mkdir:mkdir,mkdtemp:mkdtemp,rmdir:rmdir$1,writeFile:writeFile,unlink:unlink}=fs.promises;class ArchivePlugin{constructor(t,e){this.options={...ArchivePlugin.defaults,...t},this.logger=e.logger,this.dialog=e.require("../dialog").save,this.Bluebird=e.require("bluebird")}*processPhotoPaths(t,e,r){let n={},i=[];for(let o of t["@graph"])if(o.photo)for(let t of o.photo){if("file"!==t.protocol)continue;let o,a=t.path,s=extname(a),c=basename(t.path,s);if(c in n){if(i.includes(t.checksum))continue;n[c]=n[c]+1,o=`${c}${n[c]}${s}`}else n[c]=0,i.push(t.checksum),o=`${c}${s}`;t.path=join(r,o),yield{src:a,dst:join(e,r,o)}}}async export(t){let{zipFile:e,filters:r,concurrency:n,images:i}=this.options;if(e&&!this.options.prompt||(e=await this.dialog({defaultPath:e,filters:r})),!e)return;if(".zip"!==extname(e))throw new Error(`not a zip file: ${e}`);let o=await mkdtemp(join(tmpdir(),"tropy-archive-")),a=join(o,this.options.root);if(".."!==relative(a,o))throw new Error(`root "${a}" outside of tmp folder!`);await mkdir(join(a,i),{recursive:!0}),await this.Bluebird.map(this.processPhotoPaths(t,a,i),({src:t,dst:e})=>copyFile(t,e),{concurrency:n}),await writeFile(join(a,this.options.json),JSON.stringify(t,null,2));try{await unlink(e)}catch(t){}await zip$1(a,e),await rmdir$1(o,{recursive:!0})}}ArchivePlugin.defaults={concurrency:64,filters:[{name:"Zip Files",extensions:["zip"]}],images:"images",json:"items.json",prompt:!1,root:"tropy"};var src=ArchivePlugin;module.exports=src;
