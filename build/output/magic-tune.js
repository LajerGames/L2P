
/*! jQuery v2.0.2 | (c) 2005, 2013 jQuery Foundation, Inc. | jquery.org/license
//@ sourceMappingURL=jquery-2.0.2.min.map
*/
(function(e,undefined){var t,n,r=typeof undefined,i=e.location,o=e.document,s=o.documentElement,a=e.jQuery,u=e.$,l={},c=[],p="2.0.2",f=c.concat,h=c.push,d=c.slice,g=c.indexOf,m=l.toString,y=l.hasOwnProperty,v=p.trim,x=function(e,n){return new x.fn.init(e,n,t)},b=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,w=/\S+/g,T=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,C=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,k=/^-ms-/,N=/-([\da-z])/gi,E=function(e,t){return t.toUpperCase()},S=function(){o.removeEventListener("DOMContentLoaded",S,!1),e.removeEventListener("load",S,!1),x.ready()};x.fn=x.prototype={jquery:p,constructor:x,init:function(e,t,n){var r,i;if(!e)return this;if("string"==typeof e){if(r="<"===e.charAt(0)&&">"===e.charAt(e.length-1)&&e.length>=3?[null,e,null]:T.exec(e),!r||!r[1]&&t)return!t||t.jquery?(t||n).find(e):this.constructor(t).find(e);if(r[1]){if(t=t instanceof x?t[0]:t,x.merge(this,x.parseHTML(r[1],t&&t.nodeType?t.ownerDocument||t:o,!0)),C.test(r[1])&&x.isPlainObject(t))for(r in t)x.isFunction(this[r])?this[r](t[r]):this.attr(r,t[r]);return this}return i=o.getElementById(r[2]),i&&i.parentNode&&(this.length=1,this[0]=i),this.context=o,this.selector=e,this}return e.nodeType?(this.context=this[0]=e,this.length=1,this):x.isFunction(e)?n.ready(e):(e.selector!==undefined&&(this.selector=e.selector,this.context=e.context),x.makeArray(e,this))},selector:"",length:0,toArray:function(){return d.call(this)},get:function(e){return null==e?this.toArray():0>e?this[this.length+e]:this[e]},pushStack:function(e){var t=x.merge(this.constructor(),e);return t.prevObject=this,t.context=this.context,t},each:function(e,t){return x.each(this,e,t)},ready:function(e){return x.ready.promise().done(e),this},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(0>e?t:0);return this.pushStack(n>=0&&t>n?[this[n]]:[])},map:function(e){return this.pushStack(x.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:h,sort:[].sort,splice:[].splice},x.fn.init.prototype=x.fn,x.extend=x.fn.extend=function(){var e,t,n,r,i,o,s=arguments[0]||{},a=1,u=arguments.length,l=!1;for("boolean"==typeof s&&(l=s,s=arguments[1]||{},a=2),"object"==typeof s||x.isFunction(s)||(s={}),u===a&&(s=this,--a);u>a;a++)if(null!=(e=arguments[a]))for(t in e)n=s[t],r=e[t],s!==r&&(l&&r&&(x.isPlainObject(r)||(i=x.isArray(r)))?(i?(i=!1,o=n&&x.isArray(n)?n:[]):o=n&&x.isPlainObject(n)?n:{},s[t]=x.extend(l,o,r)):r!==undefined&&(s[t]=r));return s},x.extend({expando:"jQuery"+(p+Math.random()).replace(/\D/g,""),noConflict:function(t){return e.$===x&&(e.$=u),t&&e.jQuery===x&&(e.jQuery=a),x},isReady:!1,readyWait:1,holdReady:function(e){e?x.readyWait++:x.ready(!0)},ready:function(e){(e===!0?--x.readyWait:x.isReady)||(x.isReady=!0,e!==!0&&--x.readyWait>0||(n.resolveWith(o,[x]),x.fn.trigger&&x(o).trigger("ready").off("ready")))},isFunction:function(e){return"function"===x.type(e)},isArray:Array.isArray,isWindow:function(e){return null!=e&&e===e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?l[m.call(e)]||"object":typeof e},isPlainObject:function(e){if("object"!==x.type(e)||e.nodeType||x.isWindow(e))return!1;try{if(e.constructor&&!y.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(t){return!1}return!0},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw Error(e)},parseHTML:function(e,t,n){if(!e||"string"!=typeof e)return null;"boolean"==typeof t&&(n=t,t=!1),t=t||o;var r=C.exec(e),i=!n&&[];return r?[t.createElement(r[1])]:(r=x.buildFragment([e],t,i),i&&x(i).remove(),x.merge([],r.childNodes))},parseJSON:JSON.parse,parseXML:function(e){var t,n;if(!e||"string"!=typeof e)return null;try{n=new DOMParser,t=n.parseFromString(e,"text/xml")}catch(r){t=undefined}return(!t||t.getElementsByTagName("parsererror").length)&&x.error("Invalid XML: "+e),t},noop:function(){},globalEval:function(e){var t,n=eval;e=x.trim(e),e&&(1===e.indexOf("use strict")?(t=o.createElement("script"),t.text=e,o.head.appendChild(t).parentNode.removeChild(t)):n(e))},camelCase:function(e){return e.replace(k,"ms-").replace(N,E)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,t,n){var r,i=0,o=e.length,s=j(e);if(n){if(s){for(;o>i;i++)if(r=t.apply(e[i],n),r===!1)break}else for(i in e)if(r=t.apply(e[i],n),r===!1)break}else if(s){for(;o>i;i++)if(r=t.call(e[i],i,e[i]),r===!1)break}else for(i in e)if(r=t.call(e[i],i,e[i]),r===!1)break;return e},trim:function(e){return null==e?"":v.call(e)},makeArray:function(e,t){var n=t||[];return null!=e&&(j(Object(e))?x.merge(n,"string"==typeof e?[e]:e):h.call(n,e)),n},inArray:function(e,t,n){return null==t?-1:g.call(t,e,n)},merge:function(e,t){var n=t.length,r=e.length,i=0;if("number"==typeof n)for(;n>i;i++)e[r++]=t[i];else while(t[i]!==undefined)e[r++]=t[i++];return e.length=r,e},grep:function(e,t,n){var r,i=[],o=0,s=e.length;for(n=!!n;s>o;o++)r=!!t(e[o],o),n!==r&&i.push(e[o]);return i},map:function(e,t,n){var r,i=0,o=e.length,s=j(e),a=[];if(s)for(;o>i;i++)r=t(e[i],i,n),null!=r&&(a[a.length]=r);else for(i in e)r=t(e[i],i,n),null!=r&&(a[a.length]=r);return f.apply([],a)},guid:1,proxy:function(e,t){var n,r,i;return"string"==typeof t&&(n=e[t],t=e,e=n),x.isFunction(e)?(r=d.call(arguments,2),i=function(){return e.apply(t||this,r.concat(d.call(arguments)))},i.guid=e.guid=e.guid||x.guid++,i):undefined},access:function(e,t,n,r,i,o,s){var a=0,u=e.length,l=null==n;if("object"===x.type(n)){i=!0;for(a in n)x.access(e,t,a,n[a],!0,o,s)}else if(r!==undefined&&(i=!0,x.isFunction(r)||(s=!0),l&&(s?(t.call(e,r),t=null):(l=t,t=function(e,t,n){return l.call(x(e),n)})),t))for(;u>a;a++)t(e[a],n,s?r:r.call(e[a],a,t(e[a],n)));return i?e:l?t.call(e):u?t(e[0],n):o},now:Date.now,swap:function(e,t,n,r){var i,o,s={};for(o in t)s[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);for(o in t)e.style[o]=s[o];return i}}),x.ready.promise=function(t){return n||(n=x.Deferred(),"complete"===o.readyState?setTimeout(x.ready):(o.addEventListener("DOMContentLoaded",S,!1),e.addEventListener("load",S,!1))),n.promise(t)},x.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(e,t){l["[object "+t+"]"]=t.toLowerCase()});function j(e){var t=e.length,n=x.type(e);return x.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===n||"function"!==n&&(0===t||"number"==typeof t&&t>0&&t-1 in e)}t=x(o),function(e,undefined){var t,n,r,i,o,s,a,u,l,c,p,f,h,d,g,m,y,v="sizzle"+-new Date,b=e.document,w=0,T=0,C=at(),k=at(),N=at(),E=!1,S=function(){return 0},j=typeof undefined,D=1<<31,A={}.hasOwnProperty,L=[],H=L.pop,q=L.push,O=L.push,F=L.slice,P=L.indexOf||function(e){var t=0,n=this.length;for(;n>t;t++)if(this[t]===e)return t;return-1},R="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",M="[\\x20\\t\\r\\n\\f]",W="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",$=W.replace("w","w#"),B="\\["+M+"*("+W+")"+M+"*(?:([*^$|!~]?=)"+M+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+$+")|)|)"+M+"*\\]",I=":("+W+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+B.replace(3,8)+")*)|.*)\\)|)",z=RegExp("^"+M+"+|((?:^|[^\\\\])(?:\\\\.)*)"+M+"+$","g"),_=RegExp("^"+M+"*,"+M+"*"),X=RegExp("^"+M+"*([>+~]|"+M+")"+M+"*"),U=RegExp(M+"*[+~]"),Y=RegExp("="+M+"*([^\\]'\"]*)"+M+"*\\]","g"),V=RegExp(I),G=RegExp("^"+$+"$"),J={ID:RegExp("^#("+W+")"),CLASS:RegExp("^\\.("+W+")"),TAG:RegExp("^("+W.replace("w","w*")+")"),ATTR:RegExp("^"+B),PSEUDO:RegExp("^"+I),CHILD:RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+M+"*(even|odd|(([+-]|)(\\d*)n|)"+M+"*(?:([+-]|)"+M+"*(\\d+)|))"+M+"*\\)|)","i"),bool:RegExp("^(?:"+R+")$","i"),needsContext:RegExp("^"+M+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+M+"*((?:-\\d)?\\d*)"+M+"*\\)|)(?=[^-]|$)","i")},Q=/^[^{]+\{\s*\[native \w/,K=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,Z=/^(?:input|select|textarea|button)$/i,et=/^h\d$/i,tt=/'|\\/g,nt=RegExp("\\\\([\\da-f]{1,6}"+M+"?|("+M+")|.)","ig"),rt=function(e,t,n){var r="0x"+t-65536;return r!==r||n?t:0>r?String.fromCharCode(r+65536):String.fromCharCode(55296|r>>10,56320|1023&r)};try{O.apply(L=F.call(b.childNodes),b.childNodes),L[b.childNodes.length].nodeType}catch(it){O={apply:L.length?function(e,t){q.apply(e,F.call(t))}:function(e,t){var n=e.length,r=0;while(e[n++]=t[r++]);e.length=n-1}}}function ot(e,t,r,i){var o,s,a,u,l,f,g,m,x,w;if((t?t.ownerDocument||t:b)!==p&&c(t),t=t||p,r=r||[],!e||"string"!=typeof e)return r;if(1!==(u=t.nodeType)&&9!==u)return[];if(h&&!i){if(o=K.exec(e))if(a=o[1]){if(9===u){if(s=t.getElementById(a),!s||!s.parentNode)return r;if(s.id===a)return r.push(s),r}else if(t.ownerDocument&&(s=t.ownerDocument.getElementById(a))&&y(t,s)&&s.id===a)return r.push(s),r}else{if(o[2])return O.apply(r,t.getElementsByTagName(e)),r;if((a=o[3])&&n.getElementsByClassName&&t.getElementsByClassName)return O.apply(r,t.getElementsByClassName(a)),r}if(n.qsa&&(!d||!d.test(e))){if(m=g=v,x=t,w=9===u&&e,1===u&&"object"!==t.nodeName.toLowerCase()){f=vt(e),(g=t.getAttribute("id"))?m=g.replace(tt,"\\$&"):t.setAttribute("id",m),m="[id='"+m+"'] ",l=f.length;while(l--)f[l]=m+xt(f[l]);x=U.test(e)&&t.parentNode||t,w=f.join(",")}if(w)try{return O.apply(r,x.querySelectorAll(w)),r}catch(T){}finally{g||t.removeAttribute("id")}}}return St(e.replace(z,"$1"),t,r,i)}function st(e){return Q.test(e+"")}function at(){var e=[];function t(n,r){return e.push(n+=" ")>i.cacheLength&&delete t[e.shift()],t[n]=r}return t}function ut(e){return e[v]=!0,e}function lt(e){var t=p.createElement("div");try{return!!e(t)}catch(n){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function ct(e,t,n){e=e.split("|");var r,o=e.length,s=n?null:t;while(o--)(r=i.attrHandle[e[o]])&&r!==t||(i.attrHandle[e[o]]=s)}function pt(e,t){var n=e.getAttributeNode(t);return n&&n.specified?n.value:e[t]===!0?t.toLowerCase():null}function ft(e,t){return e.getAttribute(t,"type"===t.toLowerCase()?1:2)}function ht(e){return"input"===e.nodeName.toLowerCase()?e.defaultValue:undefined}function dt(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&(~t.sourceIndex||D)-(~e.sourceIndex||D);if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function gt(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function mt(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function yt(e){return ut(function(t){return t=+t,ut(function(n,r){var i,o=e([],n.length,t),s=o.length;while(s--)n[i=o[s]]&&(n[i]=!(r[i]=n[i]))})})}s=ot.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?"HTML"!==t.nodeName:!1},n=ot.support={},c=ot.setDocument=function(e){var t=e?e.ownerDocument||e:b,r=t.parentWindow;return t!==p&&9===t.nodeType&&t.documentElement?(p=t,f=t.documentElement,h=!s(t),r&&r.frameElement&&r.attachEvent("onbeforeunload",function(){c()}),n.attributes=lt(function(e){return e.innerHTML="<a href='#'></a>",ct("type|href|height|width",ft,"#"===e.firstChild.getAttribute("href")),ct(R,pt,null==e.getAttribute("disabled")),e.className="i",!e.getAttribute("className")}),n.input=lt(function(e){return e.innerHTML="<input>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")}),ct("value",ht,n.attributes&&n.input),n.getElementsByTagName=lt(function(e){return e.appendChild(t.createComment("")),!e.getElementsByTagName("*").length}),n.getElementsByClassName=lt(function(e){return e.innerHTML="<div class='a'></div><div class='a i'></div>",e.firstChild.className="i",2===e.getElementsByClassName("i").length}),n.getById=lt(function(e){return f.appendChild(e).id=v,!t.getElementsByName||!t.getElementsByName(v).length}),n.getById?(i.find.ID=function(e,t){if(typeof t.getElementById!==j&&h){var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},i.filter.ID=function(e){var t=e.replace(nt,rt);return function(e){return e.getAttribute("id")===t}}):(delete i.find.ID,i.filter.ID=function(e){var t=e.replace(nt,rt);return function(e){var n=typeof e.getAttributeNode!==j&&e.getAttributeNode("id");return n&&n.value===t}}),i.find.TAG=n.getElementsByTagName?function(e,t){return typeof t.getElementsByTagName!==j?t.getElementsByTagName(e):undefined}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},i.find.CLASS=n.getElementsByClassName&&function(e,t){return typeof t.getElementsByClassName!==j&&h?t.getElementsByClassName(e):undefined},g=[],d=[],(n.qsa=st(t.querySelectorAll))&&(lt(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||d.push("\\["+M+"*(?:value|"+R+")"),e.querySelectorAll(":checked").length||d.push(":checked")}),lt(function(e){var n=t.createElement("input");n.setAttribute("type","hidden"),e.appendChild(n).setAttribute("t",""),e.querySelectorAll("[t^='']").length&&d.push("[*^$]="+M+"*(?:''|\"\")"),e.querySelectorAll(":enabled").length||d.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),d.push(",.*:")})),(n.matchesSelector=st(m=f.webkitMatchesSelector||f.mozMatchesSelector||f.oMatchesSelector||f.msMatchesSelector))&&lt(function(e){n.disconnectedMatch=m.call(e,"div"),m.call(e,"[s!='']:x"),g.push("!=",I)}),d=d.length&&RegExp(d.join("|")),g=g.length&&RegExp(g.join("|")),y=st(f.contains)||f.compareDocumentPosition?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},n.sortDetached=lt(function(e){return 1&e.compareDocumentPosition(t.createElement("div"))}),S=f.compareDocumentPosition?function(e,r){if(e===r)return E=!0,0;var i=r.compareDocumentPosition&&e.compareDocumentPosition&&e.compareDocumentPosition(r);return i?1&i||!n.sortDetached&&r.compareDocumentPosition(e)===i?e===t||y(b,e)?-1:r===t||y(b,r)?1:l?P.call(l,e)-P.call(l,r):0:4&i?-1:1:e.compareDocumentPosition?-1:1}:function(e,n){var r,i=0,o=e.parentNode,s=n.parentNode,a=[e],u=[n];if(e===n)return E=!0,0;if(!o||!s)return e===t?-1:n===t?1:o?-1:s?1:l?P.call(l,e)-P.call(l,n):0;if(o===s)return dt(e,n);r=e;while(r=r.parentNode)a.unshift(r);r=n;while(r=r.parentNode)u.unshift(r);while(a[i]===u[i])i++;return i?dt(a[i],u[i]):a[i]===b?-1:u[i]===b?1:0},t):p},ot.matches=function(e,t){return ot(e,null,null,t)},ot.matchesSelector=function(e,t){if((e.ownerDocument||e)!==p&&c(e),t=t.replace(Y,"='$1']"),!(!n.matchesSelector||!h||g&&g.test(t)||d&&d.test(t)))try{var r=m.call(e,t);if(r||n.disconnectedMatch||e.document&&11!==e.document.nodeType)return r}catch(i){}return ot(t,p,null,[e]).length>0},ot.contains=function(e,t){return(e.ownerDocument||e)!==p&&c(e),y(e,t)},ot.attr=function(e,t){(e.ownerDocument||e)!==p&&c(e);var r=i.attrHandle[t.toLowerCase()],o=r&&A.call(i.attrHandle,t.toLowerCase())?r(e,t,!h):undefined;return o===undefined?n.attributes||!h?e.getAttribute(t):(o=e.getAttributeNode(t))&&o.specified?o.value:null:o},ot.error=function(e){throw Error("Syntax error, unrecognized expression: "+e)},ot.uniqueSort=function(e){var t,r=[],i=0,o=0;if(E=!n.detectDuplicates,l=!n.sortStable&&e.slice(0),e.sort(S),E){while(t=e[o++])t===e[o]&&(i=r.push(o));while(i--)e.splice(r[i],1)}return e},o=ot.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=o(e)}else if(3===i||4===i)return e.nodeValue}else for(;t=e[r];r++)n+=o(t);return n},i=ot.selectors={cacheLength:50,createPseudo:ut,match:J,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(nt,rt),e[3]=(e[4]||e[5]||"").replace(nt,rt),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||ot.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&ot.error(e[0]),e},PSEUDO:function(e){var t,n=!e[5]&&e[2];return J.CHILD.test(e[0])?null:(e[3]&&e[4]!==undefined?e[2]=e[4]:n&&V.test(n)&&(t=vt(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(nt,rt).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=C[e+" "];return t||(t=RegExp("(^|"+M+")"+e+"("+M+"|$)"))&&C(e,function(e){return t.test("string"==typeof e.className&&e.className||typeof e.getAttribute!==j&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r){var i=ot.attr(r,e);return null==i?"!="===t:t?(i+="","="===t?i===n:"!="===t?i!==n:"^="===t?n&&0===i.indexOf(n):"*="===t?n&&i.indexOf(n)>-1:"$="===t?n&&i.slice(-n.length)===n:"~="===t?(" "+i+" ").indexOf(n)>-1:"|="===t?i===n||i.slice(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),s="last"!==e.slice(-4),a="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,u){var l,c,p,f,h,d,g=o!==s?"nextSibling":"previousSibling",m=t.parentNode,y=a&&t.nodeName.toLowerCase(),x=!u&&!a;if(m){if(o){while(g){p=t;while(p=p[g])if(a?p.nodeName.toLowerCase()===y:1===p.nodeType)return!1;d=g="only"===e&&!d&&"nextSibling"}return!0}if(d=[s?m.firstChild:m.lastChild],s&&x){c=m[v]||(m[v]={}),l=c[e]||[],h=l[0]===w&&l[1],f=l[0]===w&&l[2],p=h&&m.childNodes[h];while(p=++h&&p&&p[g]||(f=h=0)||d.pop())if(1===p.nodeType&&++f&&p===t){c[e]=[w,h,f];break}}else if(x&&(l=(t[v]||(t[v]={}))[e])&&l[0]===w)f=l[1];else while(p=++h&&p&&p[g]||(f=h=0)||d.pop())if((a?p.nodeName.toLowerCase()===y:1===p.nodeType)&&++f&&(x&&((p[v]||(p[v]={}))[e]=[w,f]),p===t))break;return f-=i,f===r||0===f%r&&f/r>=0}}},PSEUDO:function(e,t){var n,r=i.pseudos[e]||i.setFilters[e.toLowerCase()]||ot.error("unsupported pseudo: "+e);return r[v]?r(t):r.length>1?(n=[e,e,"",t],i.setFilters.hasOwnProperty(e.toLowerCase())?ut(function(e,n){var i,o=r(e,t),s=o.length;while(s--)i=P.call(e,o[s]),e[i]=!(n[i]=o[s])}):function(e){return r(e,0,n)}):r}},pseudos:{not:ut(function(e){var t=[],n=[],r=a(e.replace(z,"$1"));return r[v]?ut(function(e,t,n,i){var o,s=r(e,null,i,[]),a=e.length;while(a--)(o=s[a])&&(e[a]=!(t[a]=o))}):function(e,i,o){return t[0]=e,r(t,null,o,n),!n.pop()}}),has:ut(function(e){return function(t){return ot(e,t).length>0}}),contains:ut(function(e){return function(t){return(t.textContent||t.innerText||o(t)).indexOf(e)>-1}}),lang:ut(function(e){return G.test(e||"")||ot.error("unsupported lang: "+e),e=e.replace(nt,rt).toLowerCase(),function(t){var n;do if(n=h?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===f},focus:function(e){return e===p.activeElement&&(!p.hasFocus||p.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeName>"@"||3===e.nodeType||4===e.nodeType)return!1;return!0},parent:function(e){return!i.pseudos.empty(e)},header:function(e){return et.test(e.nodeName)},input:function(e){return Z.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||t.toLowerCase()===e.type)},first:yt(function(){return[0]}),last:yt(function(e,t){return[t-1]}),eq:yt(function(e,t,n){return[0>n?n+t:n]}),even:yt(function(e,t){var n=0;for(;t>n;n+=2)e.push(n);return e}),odd:yt(function(e,t){var n=1;for(;t>n;n+=2)e.push(n);return e}),lt:yt(function(e,t,n){var r=0>n?n+t:n;for(;--r>=0;)e.push(r);return e}),gt:yt(function(e,t,n){var r=0>n?n+t:n;for(;t>++r;)e.push(r);return e})}};for(t in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})i.pseudos[t]=gt(t);for(t in{submit:!0,reset:!0})i.pseudos[t]=mt(t);function vt(e,t){var n,r,o,s,a,u,l,c=k[e+" "];if(c)return t?0:c.slice(0);a=e,u=[],l=i.preFilter;while(a){(!n||(r=_.exec(a)))&&(r&&(a=a.slice(r[0].length)||a),u.push(o=[])),n=!1,(r=X.exec(a))&&(n=r.shift(),o.push({value:n,type:r[0].replace(z," ")}),a=a.slice(n.length));for(s in i.filter)!(r=J[s].exec(a))||l[s]&&!(r=l[s](r))||(n=r.shift(),o.push({value:n,type:s,matches:r}),a=a.slice(n.length));if(!n)break}return t?a.length:a?ot.error(e):k(e,u).slice(0)}function xt(e){var t=0,n=e.length,r="";for(;n>t;t++)r+=e[t].value;return r}function bt(e,t,n){var i=t.dir,o=n&&"parentNode"===i,s=T++;return t.first?function(t,n,r){while(t=t[i])if(1===t.nodeType||o)return e(t,n,r)}:function(t,n,a){var u,l,c,p=w+" "+s;if(a){while(t=t[i])if((1===t.nodeType||o)&&e(t,n,a))return!0}else while(t=t[i])if(1===t.nodeType||o)if(c=t[v]||(t[v]={}),(l=c[i])&&l[0]===p){if((u=l[1])===!0||u===r)return u===!0}else if(l=c[i]=[p],l[1]=e(t,n,a)||r,l[1]===!0)return!0}}function wt(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function Tt(e,t,n,r,i){var o,s=[],a=0,u=e.length,l=null!=t;for(;u>a;a++)(o=e[a])&&(!n||n(o,r,i))&&(s.push(o),l&&t.push(a));return s}function Ct(e,t,n,r,i,o){return r&&!r[v]&&(r=Ct(r)),i&&!i[v]&&(i=Ct(i,o)),ut(function(o,s,a,u){var l,c,p,f=[],h=[],d=s.length,g=o||Et(t||"*",a.nodeType?[a]:a,[]),m=!e||!o&&t?g:Tt(g,f,e,a,u),y=n?i||(o?e:d||r)?[]:s:m;if(n&&n(m,y,a,u),r){l=Tt(y,h),r(l,[],a,u),c=l.length;while(c--)(p=l[c])&&(y[h[c]]=!(m[h[c]]=p))}if(o){if(i||e){if(i){l=[],c=y.length;while(c--)(p=y[c])&&l.push(m[c]=p);i(null,y=[],l,u)}c=y.length;while(c--)(p=y[c])&&(l=i?P.call(o,p):f[c])>-1&&(o[l]=!(s[l]=p))}}else y=Tt(y===s?y.splice(d,y.length):y),i?i(null,s,y,u):O.apply(s,y)})}function kt(e){var t,n,r,o=e.length,s=i.relative[e[0].type],a=s||i.relative[" "],l=s?1:0,c=bt(function(e){return e===t},a,!0),p=bt(function(e){return P.call(t,e)>-1},a,!0),f=[function(e,n,r){return!s&&(r||n!==u)||((t=n).nodeType?c(e,n,r):p(e,n,r))}];for(;o>l;l++)if(n=i.relative[e[l].type])f=[bt(wt(f),n)];else{if(n=i.filter[e[l].type].apply(null,e[l].matches),n[v]){for(r=++l;o>r;r++)if(i.relative[e[r].type])break;return Ct(l>1&&wt(f),l>1&&xt(e.slice(0,l-1).concat({value:" "===e[l-2].type?"*":""})).replace(z,"$1"),n,r>l&&kt(e.slice(l,r)),o>r&&kt(e=e.slice(r)),o>r&&xt(e))}f.push(n)}return wt(f)}function Nt(e,t){var n=0,o=t.length>0,s=e.length>0,a=function(a,l,c,f,h){var d,g,m,y=[],v=0,x="0",b=a&&[],T=null!=h,C=u,k=a||s&&i.find.TAG("*",h&&l.parentNode||l),N=w+=null==C?1:Math.random()||.1;for(T&&(u=l!==p&&l,r=n);null!=(d=k[x]);x++){if(s&&d){g=0;while(m=e[g++])if(m(d,l,c)){f.push(d);break}T&&(w=N,r=++n)}o&&((d=!m&&d)&&v--,a&&b.push(d))}if(v+=x,o&&x!==v){g=0;while(m=t[g++])m(b,y,l,c);if(a){if(v>0)while(x--)b[x]||y[x]||(y[x]=H.call(f));y=Tt(y)}O.apply(f,y),T&&!a&&y.length>0&&v+t.length>1&&ot.uniqueSort(f)}return T&&(w=N,u=C),b};return o?ut(a):a}a=ot.compile=function(e,t){var n,r=[],i=[],o=N[e+" "];if(!o){t||(t=vt(e)),n=t.length;while(n--)o=kt(t[n]),o[v]?r.push(o):i.push(o);o=N(e,Nt(i,r))}return o};function Et(e,t,n){var r=0,i=t.length;for(;i>r;r++)ot(e,t[r],n);return n}function St(e,t,r,o){var s,u,l,c,p,f=vt(e);if(!o&&1===f.length){if(u=f[0]=f[0].slice(0),u.length>2&&"ID"===(l=u[0]).type&&n.getById&&9===t.nodeType&&h&&i.relative[u[1].type]){if(t=(i.find.ID(l.matches[0].replace(nt,rt),t)||[])[0],!t)return r;e=e.slice(u.shift().value.length)}s=J.needsContext.test(e)?0:u.length;while(s--){if(l=u[s],i.relative[c=l.type])break;if((p=i.find[c])&&(o=p(l.matches[0].replace(nt,rt),U.test(u[0].type)&&t.parentNode||t))){if(u.splice(s,1),e=o.length&&xt(u),!e)return O.apply(r,o),r;break}}}return a(e,f)(o,t,!h,r,U.test(e)),r}i.pseudos.nth=i.pseudos.eq;function jt(){}jt.prototype=i.filters=i.pseudos,i.setFilters=new jt,n.sortStable=v.split("").sort(S).join("")===v,c(),[0,0].sort(S),n.detectDuplicates=E,x.find=ot,x.expr=ot.selectors,x.expr[":"]=x.expr.pseudos,x.unique=ot.uniqueSort,x.text=ot.getText,x.isXMLDoc=ot.isXML,x.contains=ot.contains}(e);var D={};function A(e){var t=D[e]={};return x.each(e.match(w)||[],function(e,n){t[n]=!0}),t}x.Callbacks=function(e){e="string"==typeof e?D[e]||A(e):x.extend({},e);var t,n,r,i,o,s,a=[],u=!e.once&&[],l=function(p){for(t=e.memory&&p,n=!0,s=i||0,i=0,o=a.length,r=!0;a&&o>s;s++)if(a[s].apply(p[0],p[1])===!1&&e.stopOnFalse){t=!1;break}r=!1,a&&(u?u.length&&l(u.shift()):t?a=[]:c.disable())},c={add:function(){if(a){var n=a.length;(function s(t){x.each(t,function(t,n){var r=x.type(n);"function"===r?e.unique&&c.has(n)||a.push(n):n&&n.length&&"string"!==r&&s(n)})})(arguments),r?o=a.length:t&&(i=n,l(t))}return this},remove:function(){return a&&x.each(arguments,function(e,t){var n;while((n=x.inArray(t,a,n))>-1)a.splice(n,1),r&&(o>=n&&o--,s>=n&&s--)}),this},has:function(e){return e?x.inArray(e,a)>-1:!(!a||!a.length)},empty:function(){return a=[],o=0,this},disable:function(){return a=u=t=undefined,this},disabled:function(){return!a},lock:function(){return u=undefined,t||c.disable(),this},locked:function(){return!u},fireWith:function(e,t){return t=t||[],t=[e,t.slice?t.slice():t],!a||n&&!u||(r?u.push(t):l(t)),this},fire:function(){return c.fireWith(this,arguments),this},fired:function(){return!!n}};return c},x.extend({Deferred:function(e){var t=[["resolve","done",x.Callbacks("once memory"),"resolved"],["reject","fail",x.Callbacks("once memory"),"rejected"],["notify","progress",x.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return x.Deferred(function(n){x.each(t,function(t,o){var s=o[0],a=x.isFunction(e[t])&&e[t];i[o[1]](function(){var e=a&&a.apply(this,arguments);e&&x.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[s+"With"](this===r?n.promise():this,a?[e]:arguments)})}),e=null}).promise()},promise:function(e){return null!=e?x.extend(e,r):r}},i={};return r.pipe=r.then,x.each(t,function(e,o){var s=o[2],a=o[3];r[o[1]]=s.add,a&&s.add(function(){n=a},t[1^e][2].disable,t[2][2].lock),i[o[0]]=function(){return i[o[0]+"With"](this===i?r:this,arguments),this},i[o[0]+"With"]=s.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=d.call(arguments),r=n.length,i=1!==r||e&&x.isFunction(e.promise)?r:0,o=1===i?e:x.Deferred(),s=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?d.call(arguments):r,n===a?o.notifyWith(t,n):--i||o.resolveWith(t,n)}},a,u,l;if(r>1)for(a=Array(r),u=Array(r),l=Array(r);r>t;t++)n[t]&&x.isFunction(n[t].promise)?n[t].promise().done(s(t,l,n)).fail(o.reject).progress(s(t,u,a)):--i;return i||o.resolveWith(l,n),o.promise()}}),x.support=function(t){var n=o.createElement("input"),r=o.createDocumentFragment(),i=o.createElement("div"),s=o.createElement("select"),a=s.appendChild(o.createElement("option"));return n.type?(n.type="checkbox",t.checkOn=""!==n.value,t.optSelected=a.selected,t.reliableMarginRight=!0,t.boxSizingReliable=!0,t.pixelPosition=!1,n.checked=!0,t.noCloneChecked=n.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!a.disabled,n=o.createElement("input"),n.value="t",n.type="radio",t.radioValue="t"===n.value,n.setAttribute("checked","t"),n.setAttribute("name","t"),r.appendChild(n),t.checkClone=r.cloneNode(!0).cloneNode(!0).lastChild.checked,t.focusinBubbles="onfocusin"in e,i.style.backgroundClip="content-box",i.cloneNode(!0).style.backgroundClip="",t.clearCloneStyle="content-box"===i.style.backgroundClip,x(function(){var n,r,s="padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",a=o.getElementsByTagName("body")[0];a&&(n=o.createElement("div"),n.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",a.appendChild(n).appendChild(i),i.innerHTML="",i.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%",x.swap(a,null!=a.style.zoom?{zoom:1}:{},function(){t.boxSizing=4===i.offsetWidth}),e.getComputedStyle&&(t.pixelPosition="1%"!==(e.getComputedStyle(i,null)||{}).top,t.boxSizingReliable="4px"===(e.getComputedStyle(i,null)||{width:"4px"}).width,r=i.appendChild(o.createElement("div")),r.style.cssText=i.style.cssText=s,r.style.marginRight=r.style.width="0",i.style.width="1px",t.reliableMarginRight=!parseFloat((e.getComputedStyle(r,null)||{}).marginRight)),a.removeChild(n))}),t):t}({});var L,H,q=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,O=/([A-Z])/g;function F(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=x.expando+Math.random()}F.uid=1,F.accepts=function(e){return e.nodeType?1===e.nodeType||9===e.nodeType:!0},F.prototype={key:function(e){if(!F.accepts(e))return 0;var t={},n=e[this.expando];if(!n){n=F.uid++;try{t[this.expando]={value:n},Object.defineProperties(e,t)}catch(r){t[this.expando]=n,x.extend(e,t)}}return this.cache[n]||(this.cache[n]={}),n},set:function(e,t,n){var r,i=this.key(e),o=this.cache[i];if("string"==typeof t)o[t]=n;else if(x.isEmptyObject(o))x.extend(this.cache[i],t);else for(r in t)o[r]=t[r];return o},get:function(e,t){var n=this.cache[this.key(e)];return t===undefined?n:n[t]},access:function(e,t,n){return t===undefined||t&&"string"==typeof t&&n===undefined?this.get(e,t):(this.set(e,t,n),n!==undefined?n:t)},remove:function(e,t){var n,r,i,o=this.key(e),s=this.cache[o];if(t===undefined)this.cache[o]={};else{x.isArray(t)?r=t.concat(t.map(x.camelCase)):(i=x.camelCase(t),t in s?r=[t,i]:(r=i,r=r in s?[r]:r.match(w)||[])),n=r.length;while(n--)delete s[r[n]]}},hasData:function(e){return!x.isEmptyObject(this.cache[e[this.expando]]||{})},discard:function(e){e[this.expando]&&delete this.cache[e[this.expando]]}},L=new F,H=new F,x.extend({acceptData:F.accepts,hasData:function(e){return L.hasData(e)||H.hasData(e)},data:function(e,t,n){return L.access(e,t,n)},removeData:function(e,t){L.remove(e,t)},_data:function(e,t,n){return H.access(e,t,n)},_removeData:function(e,t){H.remove(e,t)}}),x.fn.extend({data:function(e,t){var n,r,i=this[0],o=0,s=null;if(e===undefined){if(this.length&&(s=L.get(i),1===i.nodeType&&!H.get(i,"hasDataAttrs"))){for(n=i.attributes;n.length>o;o++)r=n[o].name,0===r.indexOf("data-")&&(r=x.camelCase(r.slice(5)),P(i,r,s[r]));H.set(i,"hasDataAttrs",!0)}return s}return"object"==typeof e?this.each(function(){L.set(this,e)}):x.access(this,function(t){var n,r=x.camelCase(e);if(i&&t===undefined){if(n=L.get(i,e),n!==undefined)return n;if(n=L.get(i,r),n!==undefined)return n;if(n=P(i,r,undefined),n!==undefined)return n}else this.each(function(){var n=L.get(this,r);L.set(this,r,t),-1!==e.indexOf("-")&&n!==undefined&&L.set(this,e,t)})},null,t,arguments.length>1,null,!0)},removeData:function(e){return this.each(function(){L.remove(this,e)})}});function P(e,t,n){var r;if(n===undefined&&1===e.nodeType)if(r="data-"+t.replace(O,"-$1").toLowerCase(),n=e.getAttribute(r),"string"==typeof n){try{n="true"===n?!0:"false"===n?!1:"null"===n?null:+n+""===n?+n:q.test(n)?JSON.parse(n):n}catch(i){}L.set(e,t,n)}else n=undefined;return n}x.extend({queue:function(e,t,n){var r;return e?(t=(t||"fx")+"queue",r=H.get(e,t),n&&(!r||x.isArray(n)?r=H.access(e,t,x.makeArray(n)):r.push(n)),r||[]):undefined},dequeue:function(e,t){t=t||"fx";var n=x.queue(e,t),r=n.length,i=n.shift(),o=x._queueHooks(e,t),s=function(){x.dequeue(e,t)};"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,s,o)),!r&&o&&o.empty.fire()
},_queueHooks:function(e,t){var n=t+"queueHooks";return H.get(e,n)||H.access(e,n,{empty:x.Callbacks("once memory").add(function(){H.remove(e,[t+"queue",n])})})}}),x.fn.extend({queue:function(e,t){var n=2;return"string"!=typeof e&&(t=e,e="fx",n--),n>arguments.length?x.queue(this[0],e):t===undefined?this:this.each(function(){var n=x.queue(this,e,t);x._queueHooks(this,e),"fx"===e&&"inprogress"!==n[0]&&x.dequeue(this,e)})},dequeue:function(e){return this.each(function(){x.dequeue(this,e)})},delay:function(e,t){return e=x.fx?x.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,r=1,i=x.Deferred(),o=this,s=this.length,a=function(){--r||i.resolveWith(o,[o])};"string"!=typeof e&&(t=e,e=undefined),e=e||"fx";while(s--)n=H.get(o[s],e+"queueHooks"),n&&n.empty&&(r++,n.empty.add(a));return a(),i.promise(t)}});var R,M,W=/[\t\r\n\f]/g,$=/\r/g,B=/^(?:input|select|textarea|button)$/i;x.fn.extend({attr:function(e,t){return x.access(this,x.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){x.removeAttr(this,e)})},prop:function(e,t){return x.access(this,x.prop,e,t,arguments.length>1)},removeProp:function(e){return this.each(function(){delete this[x.propFix[e]||e]})},addClass:function(e){var t,n,r,i,o,s=0,a=this.length,u="string"==typeof e&&e;if(x.isFunction(e))return this.each(function(t){x(this).addClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(w)||[];a>s;s++)if(n=this[s],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(W," "):" ")){o=0;while(i=t[o++])0>r.indexOf(" "+i+" ")&&(r+=i+" ");n.className=x.trim(r)}return this},removeClass:function(e){var t,n,r,i,o,s=0,a=this.length,u=0===arguments.length||"string"==typeof e&&e;if(x.isFunction(e))return this.each(function(t){x(this).removeClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(w)||[];a>s;s++)if(n=this[s],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(W," "):"")){o=0;while(i=t[o++])while(r.indexOf(" "+i+" ")>=0)r=r.replace(" "+i+" "," ");n.className=e?x.trim(r):""}return this},toggleClass:function(e,t){var n=typeof e,i="boolean"==typeof t;return x.isFunction(e)?this.each(function(n){x(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if("string"===n){var o,s=0,a=x(this),u=t,l=e.match(w)||[];while(o=l[s++])u=i?u:!a.hasClass(o),a[u?"addClass":"removeClass"](o)}else(n===r||"boolean"===n)&&(this.className&&H.set(this,"__className__",this.className),this.className=this.className||e===!1?"":H.get(this,"__className__")||"")})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;r>n;n++)if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(W," ").indexOf(t)>=0)return!0;return!1},val:function(e){var t,n,r,i=this[0];{if(arguments.length)return r=x.isFunction(e),this.each(function(n){var i;1===this.nodeType&&(i=r?e.call(this,n,x(this).val()):e,null==i?i="":"number"==typeof i?i+="":x.isArray(i)&&(i=x.map(i,function(e){return null==e?"":e+""})),t=x.valHooks[this.type]||x.valHooks[this.nodeName.toLowerCase()],t&&"set"in t&&t.set(this,i,"value")!==undefined||(this.value=i))});if(i)return t=x.valHooks[i.type]||x.valHooks[i.nodeName.toLowerCase()],t&&"get"in t&&(n=t.get(i,"value"))!==undefined?n:(n=i.value,"string"==typeof n?n.replace($,""):null==n?"":n)}}}),x.extend({valHooks:{option:{get:function(e){var t=e.attributes.value;return!t||t.specified?e.value:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,o="select-one"===e.type||0>i,s=o?null:[],a=o?i+1:r.length,u=0>i?a:o?i:0;for(;a>u;u++)if(n=r[u],!(!n.selected&&u!==i||(x.support.optDisabled?n.disabled:null!==n.getAttribute("disabled"))||n.parentNode.disabled&&x.nodeName(n.parentNode,"optgroup"))){if(t=x(n).val(),o)return t;s.push(t)}return s},set:function(e,t){var n,r,i=e.options,o=x.makeArray(t),s=i.length;while(s--)r=i[s],(r.selected=x.inArray(x(r).val(),o)>=0)&&(n=!0);return n||(e.selectedIndex=-1),o}}},attr:function(e,t,n){var i,o,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return typeof e.getAttribute===r?x.prop(e,t,n):(1===s&&x.isXMLDoc(e)||(t=t.toLowerCase(),i=x.attrHooks[t]||(x.expr.match.bool.test(t)?M:R)),n===undefined?i&&"get"in i&&null!==(o=i.get(e,t))?o:(o=x.find.attr(e,t),null==o?undefined:o):null!==n?i&&"set"in i&&(o=i.set(e,n,t))!==undefined?o:(e.setAttribute(t,n+""),n):(x.removeAttr(e,t),undefined))},removeAttr:function(e,t){var n,r,i=0,o=t&&t.match(w);if(o&&1===e.nodeType)while(n=o[i++])r=x.propFix[n]||n,x.expr.match.bool.test(n)&&(e[r]=!1),e.removeAttribute(n)},attrHooks:{type:{set:function(e,t){if(!x.support.radioValue&&"radio"===t&&x.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},propFix:{"for":"htmlFor","class":"className"},prop:function(e,t,n){var r,i,o,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return o=1!==s||!x.isXMLDoc(e),o&&(t=x.propFix[t]||t,i=x.propHooks[t]),n!==undefined?i&&"set"in i&&(r=i.set(e,n,t))!==undefined?r:e[t]=n:i&&"get"in i&&null!==(r=i.get(e,t))?r:e[t]},propHooks:{tabIndex:{get:function(e){return e.hasAttribute("tabindex")||B.test(e.nodeName)||e.href?e.tabIndex:-1}}}}),M={set:function(e,t,n){return t===!1?x.removeAttr(e,n):e.setAttribute(n,n),n}},x.each(x.expr.match.bool.source.match(/\w+/g),function(e,t){var n=x.expr.attrHandle[t]||x.find.attr;x.expr.attrHandle[t]=function(e,t,r){var i=x.expr.attrHandle[t],o=r?undefined:(x.expr.attrHandle[t]=undefined)!=n(e,t,r)?t.toLowerCase():null;return x.expr.attrHandle[t]=i,o}}),x.support.optSelected||(x.propHooks.selected={get:function(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null}}),x.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){x.propFix[this.toLowerCase()]=this}),x.each(["radio","checkbox"],function(){x.valHooks[this]={set:function(e,t){return x.isArray(t)?e.checked=x.inArray(x(e).val(),t)>=0:undefined}},x.support.checkOn||(x.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})});var I=/^key/,z=/^(?:mouse|contextmenu)|click/,_=/^(?:focusinfocus|focusoutblur)$/,X=/^([^.]*)(?:\.(.+)|)$/;function U(){return!0}function Y(){return!1}function V(){try{return o.activeElement}catch(e){}}x.event={global:{},add:function(e,t,n,i,o){var s,a,u,l,c,p,f,h,d,g,m,y=H.get(e);if(y){n.handler&&(s=n,n=s.handler,o=s.selector),n.guid||(n.guid=x.guid++),(l=y.events)||(l=y.events={}),(a=y.handle)||(a=y.handle=function(e){return typeof x===r||e&&x.event.triggered===e.type?undefined:x.event.dispatch.apply(a.elem,arguments)},a.elem=e),t=(t||"").match(w)||[""],c=t.length;while(c--)u=X.exec(t[c])||[],d=m=u[1],g=(u[2]||"").split(".").sort(),d&&(f=x.event.special[d]||{},d=(o?f.delegateType:f.bindType)||d,f=x.event.special[d]||{},p=x.extend({type:d,origType:m,data:i,handler:n,guid:n.guid,selector:o,needsContext:o&&x.expr.match.needsContext.test(o),namespace:g.join(".")},s),(h=l[d])||(h=l[d]=[],h.delegateCount=0,f.setup&&f.setup.call(e,i,g,a)!==!1||e.addEventListener&&e.addEventListener(d,a,!1)),f.add&&(f.add.call(e,p),p.handler.guid||(p.handler.guid=n.guid)),o?h.splice(h.delegateCount++,0,p):h.push(p),x.event.global[d]=!0);e=null}},remove:function(e,t,n,r,i){var o,s,a,u,l,c,p,f,h,d,g,m=H.hasData(e)&&H.get(e);if(m&&(u=m.events)){t=(t||"").match(w)||[""],l=t.length;while(l--)if(a=X.exec(t[l])||[],h=g=a[1],d=(a[2]||"").split(".").sort(),h){p=x.event.special[h]||{},h=(r?p.delegateType:p.bindType)||h,f=u[h]||[],a=a[2]&&RegExp("(^|\\.)"+d.join("\\.(?:.*\\.|)")+"(\\.|$)"),s=o=f.length;while(o--)c=f[o],!i&&g!==c.origType||n&&n.guid!==c.guid||a&&!a.test(c.namespace)||r&&r!==c.selector&&("**"!==r||!c.selector)||(f.splice(o,1),c.selector&&f.delegateCount--,p.remove&&p.remove.call(e,c));s&&!f.length&&(p.teardown&&p.teardown.call(e,d,m.handle)!==!1||x.removeEvent(e,h,m.handle),delete u[h])}else for(h in u)x.event.remove(e,h+t[l],n,r,!0);x.isEmptyObject(u)&&(delete m.handle,H.remove(e,"events"))}},trigger:function(t,n,r,i){var s,a,u,l,c,p,f,h=[r||o],d=y.call(t,"type")?t.type:t,g=y.call(t,"namespace")?t.namespace.split("."):[];if(a=u=r=r||o,3!==r.nodeType&&8!==r.nodeType&&!_.test(d+x.event.triggered)&&(d.indexOf(".")>=0&&(g=d.split("."),d=g.shift(),g.sort()),c=0>d.indexOf(":")&&"on"+d,t=t[x.expando]?t:new x.Event(d,"object"==typeof t&&t),t.isTrigger=i?2:3,t.namespace=g.join("."),t.namespace_re=t.namespace?RegExp("(^|\\.)"+g.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,t.result=undefined,t.target||(t.target=r),n=null==n?[t]:x.makeArray(n,[t]),f=x.event.special[d]||{},i||!f.trigger||f.trigger.apply(r,n)!==!1)){if(!i&&!f.noBubble&&!x.isWindow(r)){for(l=f.delegateType||d,_.test(l+d)||(a=a.parentNode);a;a=a.parentNode)h.push(a),u=a;u===(r.ownerDocument||o)&&h.push(u.defaultView||u.parentWindow||e)}s=0;while((a=h[s++])&&!t.isPropagationStopped())t.type=s>1?l:f.bindType||d,p=(H.get(a,"events")||{})[t.type]&&H.get(a,"handle"),p&&p.apply(a,n),p=c&&a[c],p&&x.acceptData(a)&&p.apply&&p.apply(a,n)===!1&&t.preventDefault();return t.type=d,i||t.isDefaultPrevented()||f._default&&f._default.apply(h.pop(),n)!==!1||!x.acceptData(r)||c&&x.isFunction(r[d])&&!x.isWindow(r)&&(u=r[c],u&&(r[c]=null),x.event.triggered=d,r[d](),x.event.triggered=undefined,u&&(r[c]=u)),t.result}},dispatch:function(e){e=x.event.fix(e);var t,n,r,i,o,s=[],a=d.call(arguments),u=(H.get(this,"events")||{})[e.type]||[],l=x.event.special[e.type]||{};if(a[0]=e,e.delegateTarget=this,!l.preDispatch||l.preDispatch.call(this,e)!==!1){s=x.event.handlers.call(this,e,u),t=0;while((i=s[t++])&&!e.isPropagationStopped()){e.currentTarget=i.elem,n=0;while((o=i.handlers[n++])&&!e.isImmediatePropagationStopped())(!e.namespace_re||e.namespace_re.test(o.namespace))&&(e.handleObj=o,e.data=o.data,r=((x.event.special[o.origType]||{}).handle||o.handler).apply(i.elem,a),r!==undefined&&(e.result=r)===!1&&(e.preventDefault(),e.stopPropagation()))}return l.postDispatch&&l.postDispatch.call(this,e),e.result}},handlers:function(e,t){var n,r,i,o,s=[],a=t.delegateCount,u=e.target;if(a&&u.nodeType&&(!e.button||"click"!==e.type))for(;u!==this;u=u.parentNode||this)if(u.disabled!==!0||"click"!==e.type){for(r=[],n=0;a>n;n++)o=t[n],i=o.selector+" ",r[i]===undefined&&(r[i]=o.needsContext?x(i,this).index(u)>=0:x.find(i,this,null,[u]).length),r[i]&&r.push(o);r.length&&s.push({elem:u,handlers:r})}return t.length>a&&s.push({elem:this,handlers:t.slice(a)}),s},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,t){var n,r,i,s=t.button;return null==e.pageX&&null!=t.clientX&&(n=e.target.ownerDocument||o,r=n.documentElement,i=n.body,e.pageX=t.clientX+(r&&r.scrollLeft||i&&i.scrollLeft||0)-(r&&r.clientLeft||i&&i.clientLeft||0),e.pageY=t.clientY+(r&&r.scrollTop||i&&i.scrollTop||0)-(r&&r.clientTop||i&&i.clientTop||0)),e.which||s===undefined||(e.which=1&s?1:2&s?3:4&s?2:0),e}},fix:function(e){if(e[x.expando])return e;var t,n,r,i=e.type,s=e,a=this.fixHooks[i];a||(this.fixHooks[i]=a=z.test(i)?this.mouseHooks:I.test(i)?this.keyHooks:{}),r=a.props?this.props.concat(a.props):this.props,e=new x.Event(s),t=r.length;while(t--)n=r[t],e[n]=s[n];return e.target||(e.target=o),3===e.target.nodeType&&(e.target=e.target.parentNode),a.filter?a.filter(e,s):e},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==V()&&this.focus?(this.focus(),!1):undefined},delegateType:"focusin"},blur:{trigger:function(){return this===V()&&this.blur?(this.blur(),!1):undefined},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&x.nodeName(this,"input")?(this.click(),!1):undefined},_default:function(e){return x.nodeName(e.target,"a")}},beforeunload:{postDispatch:function(e){e.result!==undefined&&(e.originalEvent.returnValue=e.result)}}},simulate:function(e,t,n,r){var i=x.extend(new x.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?x.event.trigger(i,null,t):x.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},x.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)},x.Event=function(e,t){return this instanceof x.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.getPreventDefault&&e.getPreventDefault()?U:Y):this.type=e,t&&x.extend(this,t),this.timeStamp=e&&e.timeStamp||x.now(),this[x.expando]=!0,undefined):new x.Event(e,t)},x.Event.prototype={isDefaultPrevented:Y,isPropagationStopped:Y,isImmediatePropagationStopped:Y,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=U,e&&e.preventDefault&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=U,e&&e.stopPropagation&&e.stopPropagation()},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=U,this.stopPropagation()}},x.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){x.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;return(!i||i!==r&&!x.contains(r,i))&&(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),x.support.focusinBubbles||x.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){x.event.simulate(t,e.target,x.event.fix(e),!0)};x.event.special[t]={setup:function(){0===n++&&o.addEventListener(e,r,!0)},teardown:function(){0===--n&&o.removeEventListener(e,r,!0)}}}),x.fn.extend({on:function(e,t,n,r,i){var o,s;if("object"==typeof e){"string"!=typeof t&&(n=n||t,t=undefined);for(s in e)this.on(s,t,n,e[s],i);return this}if(null==n&&null==r?(r=t,n=t=undefined):null==r&&("string"==typeof t?(r=n,n=undefined):(r=n,n=t,t=undefined)),r===!1)r=Y;else if(!r)return this;return 1===i&&(o=r,r=function(e){return x().off(e),o.apply(this,arguments)},r.guid=o.guid||(o.guid=x.guid++)),this.each(function(){x.event.add(this,e,r,n,t)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,t,n){var r,i;if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,x(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==typeof e){for(i in e)this.off(i,t,e[i]);return this}return(t===!1||"function"==typeof t)&&(n=t,t=undefined),n===!1&&(n=Y),this.each(function(){x.event.remove(this,e,n,t)})},trigger:function(e,t){return this.each(function(){x.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];return n?x.event.trigger(e,t,n,!0):undefined}});var G=/^.[^:#\[\.,]*$/,J=/^(?:parents|prev(?:Until|All))/,Q=x.expr.match.needsContext,K={children:!0,contents:!0,next:!0,prev:!0};x.fn.extend({find:function(e){var t,n=[],r=this,i=r.length;if("string"!=typeof e)return this.pushStack(x(e).filter(function(){for(t=0;i>t;t++)if(x.contains(r[t],this))return!0}));for(t=0;i>t;t++)x.find(e,r[t],n);return n=this.pushStack(i>1?x.unique(n):n),n.selector=this.selector?this.selector+" "+e:e,n},has:function(e){var t=x(e,this),n=t.length;return this.filter(function(){var e=0;for(;n>e;e++)if(x.contains(this,t[e]))return!0})},not:function(e){return this.pushStack(et(this,e||[],!0))},filter:function(e){return this.pushStack(et(this,e||[],!1))},is:function(e){return!!et(this,"string"==typeof e&&Q.test(e)?x(e):e||[],!1).length},closest:function(e,t){var n,r=0,i=this.length,o=[],s=Q.test(e)||"string"!=typeof e?x(e,t||this.context):0;for(;i>r;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(11>n.nodeType&&(s?s.index(n)>-1:1===n.nodeType&&x.find.matchesSelector(n,e))){n=o.push(n);break}return this.pushStack(o.length>1?x.unique(o):o)},index:function(e){return e?"string"==typeof e?g.call(x(e),this[0]):g.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){var n="string"==typeof e?x(e,t):x.makeArray(e&&e.nodeType?[e]:e),r=x.merge(this.get(),n);return this.pushStack(x.unique(r))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}});function Z(e,t){while((e=e[t])&&1!==e.nodeType);return e}x.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return x.dir(e,"parentNode")},parentsUntil:function(e,t,n){return x.dir(e,"parentNode",n)},next:function(e){return Z(e,"nextSibling")},prev:function(e){return Z(e,"previousSibling")},nextAll:function(e){return x.dir(e,"nextSibling")},prevAll:function(e){return x.dir(e,"previousSibling")},nextUntil:function(e,t,n){return x.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return x.dir(e,"previousSibling",n)},siblings:function(e){return x.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return x.sibling(e.firstChild)},contents:function(e){return e.contentDocument||x.merge([],e.childNodes)}},function(e,t){x.fn[e]=function(n,r){var i=x.map(this,t,n);return"Until"!==e.slice(-5)&&(r=n),r&&"string"==typeof r&&(i=x.filter(r,i)),this.length>1&&(K[e]||x.unique(i),J.test(e)&&i.reverse()),this.pushStack(i)}}),x.extend({filter:function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?x.find.matchesSelector(r,e)?[r]:[]:x.find.matches(e,x.grep(t,function(e){return 1===e.nodeType}))},dir:function(e,t,n){var r=[],i=n!==undefined;while((e=e[t])&&9!==e.nodeType)if(1===e.nodeType){if(i&&x(e).is(n))break;r.push(e)}return r},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n}});function et(e,t,n){if(x.isFunction(t))return x.grep(e,function(e,r){return!!t.call(e,r,e)!==n});if(t.nodeType)return x.grep(e,function(e){return e===t!==n});if("string"==typeof t){if(G.test(t))return x.filter(t,e,n);t=x.filter(t,e)}return x.grep(e,function(e){return g.call(t,e)>=0!==n})}var tt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,nt=/<([\w:]+)/,rt=/<|&#?\w+;/,it=/<(?:script|style|link)/i,ot=/^(?:checkbox|radio)$/i,st=/checked\s*(?:[^=]|=\s*.checked.)/i,at=/^$|\/(?:java|ecma)script/i,ut=/^true\/(.*)/,lt=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ct={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ct.optgroup=ct.option,ct.tbody=ct.tfoot=ct.colgroup=ct.caption=ct.thead,ct.th=ct.td,x.fn.extend({text:function(e){return x.access(this,function(e){return e===undefined?x.text(this):this.empty().append((this[0]&&this[0].ownerDocument||o).createTextNode(e))},null,e,arguments.length)},append:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=pt(this,e);t.appendChild(e)}})},prepend:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=pt(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},remove:function(e,t){var n,r=e?x.filter(e,this):this,i=0;for(;null!=(n=r[i]);i++)t||1!==n.nodeType||x.cleanData(mt(n)),n.parentNode&&(t&&x.contains(n.ownerDocument,n)&&dt(mt(n,"script")),n.parentNode.removeChild(n));return this},empty:function(){var e,t=0;for(;null!=(e=this[t]);t++)1===e.nodeType&&(x.cleanData(mt(e,!1)),e.textContent="");return this},clone:function(e,t){return e=null==e?!1:e,t=null==t?e:t,this.map(function(){return x.clone(this,e,t)})},html:function(e){return x.access(this,function(e){var t=this[0]||{},n=0,r=this.length;if(e===undefined&&1===t.nodeType)return t.innerHTML;if("string"==typeof e&&!it.test(e)&&!ct[(nt.exec(e)||["",""])[1].toLowerCase()]){e=e.replace(tt,"<$1></$2>");try{for(;r>n;n++)t=this[n]||{},1===t.nodeType&&(x.cleanData(mt(t,!1)),t.innerHTML=e);t=0}catch(i){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var e=x.map(this,function(e){return[e.nextSibling,e.parentNode]}),t=0;return this.domManip(arguments,function(n){var r=e[t++],i=e[t++];i&&(r&&r.parentNode!==i&&(r=this.nextSibling),x(this).remove(),i.insertBefore(n,r))},!0),t?this:this.remove()},detach:function(e){return this.remove(e,!0)},domManip:function(e,t,n){e=f.apply([],e);var r,i,o,s,a,u,l=0,c=this.length,p=this,h=c-1,d=e[0],g=x.isFunction(d);if(g||!(1>=c||"string"!=typeof d||x.support.checkClone)&&st.test(d))return this.each(function(r){var i=p.eq(r);g&&(e[0]=d.call(this,r,i.html())),i.domManip(e,t,n)});if(c&&(r=x.buildFragment(e,this[0].ownerDocument,!1,!n&&this),i=r.firstChild,1===r.childNodes.length&&(r=i),i)){for(o=x.map(mt(r,"script"),ft),s=o.length;c>l;l++)a=r,l!==h&&(a=x.clone(a,!0,!0),s&&x.merge(o,mt(a,"script"))),t.call(this[l],a,l);if(s)for(u=o[o.length-1].ownerDocument,x.map(o,ht),l=0;s>l;l++)a=o[l],at.test(a.type||"")&&!H.access(a,"globalEval")&&x.contains(u,a)&&(a.src?x._evalUrl(a.src):x.globalEval(a.textContent.replace(lt,"")))}return this}}),x.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){x.fn[e]=function(e){var n,r=[],i=x(e),o=i.length-1,s=0;for(;o>=s;s++)n=s===o?this:this.clone(!0),x(i[s])[t](n),h.apply(r,n.get());return this.pushStack(r)}}),x.extend({clone:function(e,t,n){var r,i,o,s,a=e.cloneNode(!0),u=x.contains(e.ownerDocument,e);if(!(x.support.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||x.isXMLDoc(e)))for(s=mt(a),o=mt(e),r=0,i=o.length;i>r;r++)yt(o[r],s[r]);if(t)if(n)for(o=o||mt(e),s=s||mt(a),r=0,i=o.length;i>r;r++)gt(o[r],s[r]);else gt(e,a);return s=mt(a,"script"),s.length>0&&dt(s,!u&&mt(e,"script")),a},buildFragment:function(e,t,n,r){var i,o,s,a,u,l,c=0,p=e.length,f=t.createDocumentFragment(),h=[];for(;p>c;c++)if(i=e[c],i||0===i)if("object"===x.type(i))x.merge(h,i.nodeType?[i]:i);else if(rt.test(i)){o=o||f.appendChild(t.createElement("div")),s=(nt.exec(i)||["",""])[1].toLowerCase(),a=ct[s]||ct._default,o.innerHTML=a[1]+i.replace(tt,"<$1></$2>")+a[2],l=a[0];while(l--)o=o.firstChild;x.merge(h,o.childNodes),o=f.firstChild,o.textContent=""}else h.push(t.createTextNode(i));f.textContent="",c=0;while(i=h[c++])if((!r||-1===x.inArray(i,r))&&(u=x.contains(i.ownerDocument,i),o=mt(f.appendChild(i),"script"),u&&dt(o),n)){l=0;while(i=o[l++])at.test(i.type||"")&&n.push(i)}return f},cleanData:function(e){var t,n,r,i,o,s,a=x.event.special,u=0;for(;(n=e[u])!==undefined;u++){if(F.accepts(n)&&(o=n[H.expando],o&&(t=H.cache[o]))){if(r=Object.keys(t.events||{}),r.length)for(s=0;(i=r[s])!==undefined;s++)a[i]?x.event.remove(n,i):x.removeEvent(n,i,t.handle);H.cache[o]&&delete H.cache[o]}delete L.cache[n[L.expando]]}},_evalUrl:function(e){return x.ajax({url:e,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})}});function pt(e,t){return x.nodeName(e,"table")&&x.nodeName(1===t.nodeType?t:t.firstChild,"tr")?e.getElementsByTagName("tbody")[0]||e.appendChild(e.ownerDocument.createElement("tbody")):e}function ft(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function ht(e){var t=ut.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function dt(e,t){var n=e.length,r=0;for(;n>r;r++)H.set(e[r],"globalEval",!t||H.get(t[r],"globalEval"))}function gt(e,t){var n,r,i,o,s,a,u,l;if(1===t.nodeType){if(H.hasData(e)&&(o=H.access(e),s=H.set(t,o),l=o.events)){delete s.handle,s.events={};for(i in l)for(n=0,r=l[i].length;r>n;n++)x.event.add(t,i,l[i][n])}L.hasData(e)&&(a=L.access(e),u=x.extend({},a),L.set(t,u))}}function mt(e,t){var n=e.getElementsByTagName?e.getElementsByTagName(t||"*"):e.querySelectorAll?e.querySelectorAll(t||"*"):[];return t===undefined||t&&x.nodeName(e,t)?x.merge([e],n):n}function yt(e,t){var n=t.nodeName.toLowerCase();"input"===n&&ot.test(e.type)?t.checked=e.checked:("input"===n||"textarea"===n)&&(t.defaultValue=e.defaultValue)}x.fn.extend({wrapAll:function(e){var t;return x.isFunction(e)?this.each(function(t){x(this).wrapAll(e.call(this,t))}):(this[0]&&(t=x(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstElementChild)e=e.firstElementChild;return e}).append(this)),this)},wrapInner:function(e){return x.isFunction(e)?this.each(function(t){x(this).wrapInner(e.call(this,t))}):this.each(function(){var t=x(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=x.isFunction(e);return this.each(function(n){x(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){x.nodeName(this,"body")||x(this).replaceWith(this.childNodes)}).end()}});var vt,xt,bt=/^(none|table(?!-c[ea]).+)/,wt=/^margin/,Tt=RegExp("^("+b+")(.*)$","i"),Ct=RegExp("^("+b+")(?!px)[a-z%]+$","i"),kt=RegExp("^([+-])=("+b+")","i"),Nt={BODY:"block"},Et={position:"absolute",visibility:"hidden",display:"block"},St={letterSpacing:0,fontWeight:400},jt=["Top","Right","Bottom","Left"],Dt=["Webkit","O","Moz","ms"];function At(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=Dt.length;while(i--)if(t=Dt[i]+n,t in e)return t;return r}function Lt(e,t){return e=t||e,"none"===x.css(e,"display")||!x.contains(e.ownerDocument,e)}function Ht(t){return e.getComputedStyle(t,null)}function qt(e,t){var n,r,i,o=[],s=0,a=e.length;for(;a>s;s++)r=e[s],r.style&&(o[s]=H.get(r,"olddisplay"),n=r.style.display,t?(o[s]||"none"!==n||(r.style.display=""),""===r.style.display&&Lt(r)&&(o[s]=H.access(r,"olddisplay",Rt(r.nodeName)))):o[s]||(i=Lt(r),(n&&"none"!==n||!i)&&H.set(r,"olddisplay",i?n:x.css(r,"display"))));for(s=0;a>s;s++)r=e[s],r.style&&(t&&"none"!==r.style.display&&""!==r.style.display||(r.style.display=t?o[s]||"":"none"));return e}x.fn.extend({css:function(e,t){return x.access(this,function(e,t,n){var r,i,o={},s=0;if(x.isArray(t)){for(r=Ht(e),i=t.length;i>s;s++)o[t[s]]=x.css(e,t[s],!1,r);return o}return n!==undefined?x.style(e,t,n):x.css(e,t)},e,t,arguments.length>1)},show:function(){return qt(this,!0)},hide:function(){return qt(this)},toggle:function(e){var t="boolean"==typeof e;return this.each(function(){(t?e:Lt(this))?x(this).show():x(this).hide()})}}),x.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=vt(e,"opacity");return""===n?"1":n}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(e,t,n,r){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var i,o,s,a=x.camelCase(t),u=e.style;return t=x.cssProps[a]||(x.cssProps[a]=At(u,a)),s=x.cssHooks[t]||x.cssHooks[a],n===undefined?s&&"get"in s&&(i=s.get(e,!1,r))!==undefined?i:u[t]:(o=typeof n,"string"===o&&(i=kt.exec(n))&&(n=(i[1]+1)*i[2]+parseFloat(x.css(e,t)),o="number"),null==n||"number"===o&&isNaN(n)||("number"!==o||x.cssNumber[a]||(n+="px"),x.support.clearCloneStyle||""!==n||0!==t.indexOf("background")||(u[t]="inherit"),s&&"set"in s&&(n=s.set(e,n,r))===undefined||(u[t]=n)),undefined)}},css:function(e,t,n,r){var i,o,s,a=x.camelCase(t);return t=x.cssProps[a]||(x.cssProps[a]=At(e.style,a)),s=x.cssHooks[t]||x.cssHooks[a],s&&"get"in s&&(i=s.get(e,!0,n)),i===undefined&&(i=vt(e,t,r)),"normal"===i&&t in St&&(i=St[t]),""===n||n?(o=parseFloat(i),n===!0||x.isNumeric(o)?o||0:i):i}}),vt=function(e,t,n){var r,i,o,s=n||Ht(e),a=s?s.getPropertyValue(t)||s[t]:undefined,u=e.style;return s&&(""!==a||x.contains(e.ownerDocument,e)||(a=x.style(e,t)),Ct.test(a)&&wt.test(t)&&(r=u.width,i=u.minWidth,o=u.maxWidth,u.minWidth=u.maxWidth=u.width=a,a=s.width,u.width=r,u.minWidth=i,u.maxWidth=o)),a};function Ot(e,t,n){var r=Tt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function Ft(e,t,n,r,i){var o=n===(r?"border":"content")?4:"width"===t?1:0,s=0;for(;4>o;o+=2)"margin"===n&&(s+=x.css(e,n+jt[o],!0,i)),r?("content"===n&&(s-=x.css(e,"padding"+jt[o],!0,i)),"margin"!==n&&(s-=x.css(e,"border"+jt[o]+"Width",!0,i))):(s+=x.css(e,"padding"+jt[o],!0,i),"padding"!==n&&(s+=x.css(e,"border"+jt[o]+"Width",!0,i)));return s}function Pt(e,t,n){var r=!0,i="width"===t?e.offsetWidth:e.offsetHeight,o=Ht(e),s=x.support.boxSizing&&"border-box"===x.css(e,"boxSizing",!1,o);if(0>=i||null==i){if(i=vt(e,t,o),(0>i||null==i)&&(i=e.style[t]),Ct.test(i))return i;r=s&&(x.support.boxSizingReliable||i===e.style[t]),i=parseFloat(i)||0}return i+Ft(e,t,n||(s?"border":"content"),r,o)+"px"}function Rt(e){var t=o,n=Nt[e];return n||(n=Mt(e,t),"none"!==n&&n||(xt=(xt||x("<iframe frameborder='0' width='0' height='0'/>").css("cssText","display:block !important")).appendTo(t.documentElement),t=(xt[0].contentWindow||xt[0].contentDocument).document,t.write("<!doctype html><html><body>"),t.close(),n=Mt(e,t),xt.detach()),Nt[e]=n),n}function Mt(e,t){var n=x(t.createElement(e)).appendTo(t.body),r=x.css(n[0],"display");return n.remove(),r}x.each(["height","width"],function(e,t){x.cssHooks[t]={get:function(e,n,r){return n?0===e.offsetWidth&&bt.test(x.css(e,"display"))?x.swap(e,Et,function(){return Pt(e,t,r)}):Pt(e,t,r):undefined},set:function(e,n,r){var i=r&&Ht(e);return Ot(e,n,r?Ft(e,t,r,x.support.boxSizing&&"border-box"===x.css(e,"boxSizing",!1,i),i):0)}}}),x(function(){x.support.reliableMarginRight||(x.cssHooks.marginRight={get:function(e,t){return t?x.swap(e,{display:"inline-block"},vt,[e,"marginRight"]):undefined}}),!x.support.pixelPosition&&x.fn.position&&x.each(["top","left"],function(e,t){x.cssHooks[t]={get:function(e,n){return n?(n=vt(e,t),Ct.test(n)?x(e).position()[t]+"px":n):undefined}}})}),x.expr&&x.expr.filters&&(x.expr.filters.hidden=function(e){return 0>=e.offsetWidth&&0>=e.offsetHeight},x.expr.filters.visible=function(e){return!x.expr.filters.hidden(e)}),x.each({margin:"",padding:"",border:"Width"},function(e,t){x.cssHooks[e+t]={expand:function(n){var r=0,i={},o="string"==typeof n?n.split(" "):[n];for(;4>r;r++)i[e+jt[r]+t]=o[r]||o[r-2]||o[0];return i}},wt.test(e)||(x.cssHooks[e+t].set=Ot)});var Wt=/%20/g,$t=/\[\]$/,Bt=/\r?\n/g,It=/^(?:submit|button|image|reset|file)$/i,zt=/^(?:input|select|textarea|keygen)/i;x.fn.extend({serialize:function(){return x.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=x.prop(this,"elements");return e?x.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!x(this).is(":disabled")&&zt.test(this.nodeName)&&!It.test(e)&&(this.checked||!ot.test(e))}).map(function(e,t){var n=x(this).val();return null==n?null:x.isArray(n)?x.map(n,function(e){return{name:t.name,value:e.replace(Bt,"\r\n")}}):{name:t.name,value:n.replace(Bt,"\r\n")}}).get()}}),x.param=function(e,t){var n,r=[],i=function(e,t){t=x.isFunction(t)?t():null==t?"":t,r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};if(t===undefined&&(t=x.ajaxSettings&&x.ajaxSettings.traditional),x.isArray(e)||e.jquery&&!x.isPlainObject(e))x.each(e,function(){i(this.name,this.value)});else for(n in e)_t(n,e[n],t,i);return r.join("&").replace(Wt,"+")};function _t(e,t,n,r){var i;if(x.isArray(t))x.each(t,function(t,i){n||$t.test(e)?r(e,i):_t(e+"["+("object"==typeof i?t:"")+"]",i,n,r)});else if(n||"object"!==x.type(t))r(e,t);else for(i in t)_t(e+"["+i+"]",t[i],n,r)}x.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){x.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),x.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}});var Xt,Ut,Yt=x.now(),Vt=/\?/,Gt=/#.*$/,Jt=/([?&])_=[^&]*/,Qt=/^(.*?):[ \t]*([^\r\n]*)$/gm,Kt=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Zt=/^(?:GET|HEAD)$/,en=/^\/\//,tn=/^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,nn=x.fn.load,rn={},on={},sn="*/".concat("*");
try{Ut=i.href}catch(an){Ut=o.createElement("a"),Ut.href="",Ut=Ut.href}Xt=tn.exec(Ut.toLowerCase())||[];function un(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(w)||[];if(x.isFunction(n))while(r=o[i++])"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function ln(e,t,n,r){var i={},o=e===on;function s(a){var u;return i[a]=!0,x.each(e[a]||[],function(e,a){var l=a(t,n,r);return"string"!=typeof l||o||i[l]?o?!(u=l):undefined:(t.dataTypes.unshift(l),s(l),!1)}),u}return s(t.dataTypes[0])||!i["*"]&&s("*")}function cn(e,t){var n,r,i=x.ajaxSettings.flatOptions||{};for(n in t)t[n]!==undefined&&((i[n]?e:r||(r={}))[n]=t[n]);return r&&x.extend(!0,e,r),e}x.fn.load=function(e,t,n){if("string"!=typeof e&&nn)return nn.apply(this,arguments);var r,i,o,s=this,a=e.indexOf(" ");return a>=0&&(r=e.slice(a),e=e.slice(0,a)),x.isFunction(t)?(n=t,t=undefined):t&&"object"==typeof t&&(i="POST"),s.length>0&&x.ajax({url:e,type:i,dataType:"html",data:t}).done(function(e){o=arguments,s.html(r?x("<div>").append(x.parseHTML(e)).find(r):e)}).complete(n&&function(e,t){s.each(n,o||[e.responseText,t,e])}),this},x.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){x.fn[t]=function(e){return this.on(t,e)}}),x.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Ut,type:"GET",isLocal:Kt.test(Xt[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":sn,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":x.parseJSON,"text xml":x.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?cn(cn(e,x.ajaxSettings),t):cn(x.ajaxSettings,e)},ajaxPrefilter:un(rn),ajaxTransport:un(on),ajax:function(e,t){"object"==typeof e&&(t=e,e=undefined),t=t||{};var n,r,i,o,s,a,u,l,c=x.ajaxSetup({},t),p=c.context||c,f=c.context&&(p.nodeType||p.jquery)?x(p):x.event,h=x.Deferred(),d=x.Callbacks("once memory"),g=c.statusCode||{},m={},y={},v=0,b="canceled",T={readyState:0,getResponseHeader:function(e){var t;if(2===v){if(!o){o={};while(t=Qt.exec(i))o[t[1].toLowerCase()]=t[2]}t=o[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return 2===v?i:null},setRequestHeader:function(e,t){var n=e.toLowerCase();return v||(e=y[n]=y[n]||e,m[e]=t),this},overrideMimeType:function(e){return v||(c.mimeType=e),this},statusCode:function(e){var t;if(e)if(2>v)for(t in e)g[t]=[g[t],e[t]];else T.always(e[T.status]);return this},abort:function(e){var t=e||b;return n&&n.abort(t),k(0,t),this}};if(h.promise(T).complete=d.add,T.success=T.done,T.error=T.fail,c.url=((e||c.url||Ut)+"").replace(Gt,"").replace(en,Xt[1]+"//"),c.type=t.method||t.type||c.method||c.type,c.dataTypes=x.trim(c.dataType||"*").toLowerCase().match(w)||[""],null==c.crossDomain&&(a=tn.exec(c.url.toLowerCase()),c.crossDomain=!(!a||a[1]===Xt[1]&&a[2]===Xt[2]&&(a[3]||("http:"===a[1]?"80":"443"))===(Xt[3]||("http:"===Xt[1]?"80":"443")))),c.data&&c.processData&&"string"!=typeof c.data&&(c.data=x.param(c.data,c.traditional)),ln(rn,c,t,T),2===v)return T;u=c.global,u&&0===x.active++&&x.event.trigger("ajaxStart"),c.type=c.type.toUpperCase(),c.hasContent=!Zt.test(c.type),r=c.url,c.hasContent||(c.data&&(r=c.url+=(Vt.test(r)?"&":"?")+c.data,delete c.data),c.cache===!1&&(c.url=Jt.test(r)?r.replace(Jt,"$1_="+Yt++):r+(Vt.test(r)?"&":"?")+"_="+Yt++)),c.ifModified&&(x.lastModified[r]&&T.setRequestHeader("If-Modified-Since",x.lastModified[r]),x.etag[r]&&T.setRequestHeader("If-None-Match",x.etag[r])),(c.data&&c.hasContent&&c.contentType!==!1||t.contentType)&&T.setRequestHeader("Content-Type",c.contentType),T.setRequestHeader("Accept",c.dataTypes[0]&&c.accepts[c.dataTypes[0]]?c.accepts[c.dataTypes[0]]+("*"!==c.dataTypes[0]?", "+sn+"; q=0.01":""):c.accepts["*"]);for(l in c.headers)T.setRequestHeader(l,c.headers[l]);if(c.beforeSend&&(c.beforeSend.call(p,T,c)===!1||2===v))return T.abort();b="abort";for(l in{success:1,error:1,complete:1})T[l](c[l]);if(n=ln(on,c,t,T)){T.readyState=1,u&&f.trigger("ajaxSend",[T,c]),c.async&&c.timeout>0&&(s=setTimeout(function(){T.abort("timeout")},c.timeout));try{v=1,n.send(m,k)}catch(C){if(!(2>v))throw C;k(-1,C)}}else k(-1,"No Transport");function k(e,t,o,a){var l,m,y,b,w,C=t;2!==v&&(v=2,s&&clearTimeout(s),n=undefined,i=a||"",T.readyState=e>0?4:0,l=e>=200&&300>e||304===e,o&&(b=pn(c,T,o)),b=fn(c,b,T,l),l?(c.ifModified&&(w=T.getResponseHeader("Last-Modified"),w&&(x.lastModified[r]=w),w=T.getResponseHeader("etag"),w&&(x.etag[r]=w)),204===e||"HEAD"===c.type?C="nocontent":304===e?C="notmodified":(C=b.state,m=b.data,y=b.error,l=!y)):(y=C,(e||!C)&&(C="error",0>e&&(e=0))),T.status=e,T.statusText=(t||C)+"",l?h.resolveWith(p,[m,C,T]):h.rejectWith(p,[T,C,y]),T.statusCode(g),g=undefined,u&&f.trigger(l?"ajaxSuccess":"ajaxError",[T,c,l?m:y]),d.fireWith(p,[T,C]),u&&(f.trigger("ajaxComplete",[T,c]),--x.active||x.event.trigger("ajaxStop")))}return T},getJSON:function(e,t,n){return x.get(e,t,n,"json")},getScript:function(e,t){return x.get(e,undefined,t,"script")}}),x.each(["get","post"],function(e,t){x[t]=function(e,n,r,i){return x.isFunction(n)&&(i=i||r,r=n,n=undefined),x.ajax({url:e,type:t,dataType:i,data:n,success:r})}});function pn(e,t,n){var r,i,o,s,a=e.contents,u=e.dataTypes;while("*"===u[0])u.shift(),r===undefined&&(r=e.mimeType||t.getResponseHeader("Content-Type"));if(r)for(i in a)if(a[i]&&a[i].test(r)){u.unshift(i);break}if(u[0]in n)o=u[0];else{for(i in n){if(!u[0]||e.converters[i+" "+u[0]]){o=i;break}s||(s=i)}o=o||s}return o?(o!==u[0]&&u.unshift(o),n[o]):undefined}function fn(e,t,n,r){var i,o,s,a,u,l={},c=e.dataTypes.slice();if(c[1])for(s in e.converters)l[s.toLowerCase()]=e.converters[s];o=c.shift();while(o)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!u&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u=o,o=c.shift())if("*"===o)o=u;else if("*"!==u&&u!==o){if(s=l[u+" "+o]||l["* "+o],!s)for(i in l)if(a=i.split(" "),a[1]===o&&(s=l[u+" "+a[0]]||l["* "+a[0]])){s===!0?s=l[i]:l[i]!==!0&&(o=a[0],c.unshift(a[1]));break}if(s!==!0)if(s&&e["throws"])t=s(t);else try{t=s(t)}catch(p){return{state:"parsererror",error:s?p:"No conversion from "+u+" to "+o}}}return{state:"success",data:t}}x.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){return x.globalEval(e),e}}}),x.ajaxPrefilter("script",function(e){e.cache===undefined&&(e.cache=!1),e.crossDomain&&(e.type="GET")}),x.ajaxTransport("script",function(e){if(e.crossDomain){var t,n;return{send:function(r,i){t=x("<script>").prop({async:!0,charset:e.scriptCharset,src:e.url}).on("load error",n=function(e){t.remove(),n=null,e&&i("error"===e.type?404:200,e.type)}),o.head.appendChild(t[0])},abort:function(){n&&n()}}}});var hn=[],dn=/(=)\?(?=&|$)|\?\?/;x.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=hn.pop()||x.expando+"_"+Yt++;return this[e]=!0,e}}),x.ajaxPrefilter("json jsonp",function(t,n,r){var i,o,s,a=t.jsonp!==!1&&(dn.test(t.url)?"url":"string"==typeof t.data&&!(t.contentType||"").indexOf("application/x-www-form-urlencoded")&&dn.test(t.data)&&"data");return a||"jsonp"===t.dataTypes[0]?(i=t.jsonpCallback=x.isFunction(t.jsonpCallback)?t.jsonpCallback():t.jsonpCallback,a?t[a]=t[a].replace(dn,"$1"+i):t.jsonp!==!1&&(t.url+=(Vt.test(t.url)?"&":"?")+t.jsonp+"="+i),t.converters["script json"]=function(){return s||x.error(i+" was not called"),s[0]},t.dataTypes[0]="json",o=e[i],e[i]=function(){s=arguments},r.always(function(){e[i]=o,t[i]&&(t.jsonpCallback=n.jsonpCallback,hn.push(i)),s&&x.isFunction(o)&&o(s[0]),s=o=undefined}),"script"):undefined}),x.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(e){}};var gn=x.ajaxSettings.xhr(),mn={0:200,1223:204},yn=0,vn={};e.ActiveXObject&&x(e).on("unload",function(){for(var e in vn)vn[e]();vn=undefined}),x.support.cors=!!gn&&"withCredentials"in gn,x.support.ajax=gn=!!gn,x.ajaxTransport(function(e){var t;return x.support.cors||gn&&!e.crossDomain?{send:function(n,r){var i,o,s=e.xhr();if(s.open(e.type,e.url,e.async,e.username,e.password),e.xhrFields)for(i in e.xhrFields)s[i]=e.xhrFields[i];e.mimeType&&s.overrideMimeType&&s.overrideMimeType(e.mimeType),e.crossDomain||n["X-Requested-With"]||(n["X-Requested-With"]="XMLHttpRequest");for(i in n)s.setRequestHeader(i,n[i]);t=function(e){return function(){t&&(delete vn[o],t=s.onload=s.onerror=null,"abort"===e?s.abort():"error"===e?r(s.status||404,s.statusText):r(mn[s.status]||s.status,s.statusText,"string"==typeof s.responseText?{text:s.responseText}:undefined,s.getAllResponseHeaders()))}},s.onload=t(),s.onerror=t("error"),t=vn[o=yn++]=t("abort"),s.send(e.hasContent&&e.data||null)},abort:function(){t&&t()}}:undefined});var xn,bn,wn=/^(?:toggle|show|hide)$/,Tn=RegExp("^(?:([+-])=|)("+b+")([a-z%]*)$","i"),Cn=/queueHooks$/,kn=[An],Nn={"*":[function(e,t){var n=this.createTween(e,t),r=n.cur(),i=Tn.exec(t),o=i&&i[3]||(x.cssNumber[e]?"":"px"),s=(x.cssNumber[e]||"px"!==o&&+r)&&Tn.exec(x.css(n.elem,e)),a=1,u=20;if(s&&s[3]!==o){o=o||s[3],i=i||[],s=+r||1;do a=a||".5",s/=a,x.style(n.elem,e,s+o);while(a!==(a=n.cur()/r)&&1!==a&&--u)}return i&&(s=n.start=+s||+r||0,n.unit=o,n.end=i[1]?s+(i[1]+1)*i[2]:+i[2]),n}]};function En(){return setTimeout(function(){xn=undefined}),xn=x.now()}function Sn(e,t,n){var r,i=(Nn[t]||[]).concat(Nn["*"]),o=0,s=i.length;for(;s>o;o++)if(r=i[o].call(n,t,e))return r}function jn(e,t,n){var r,i,o=0,s=kn.length,a=x.Deferred().always(function(){delete u.elem}),u=function(){if(i)return!1;var t=xn||En(),n=Math.max(0,l.startTime+l.duration-t),r=n/l.duration||0,o=1-r,s=0,u=l.tweens.length;for(;u>s;s++)l.tweens[s].run(o);return a.notifyWith(e,[l,o,n]),1>o&&u?n:(a.resolveWith(e,[l]),!1)},l=a.promise({elem:e,props:x.extend({},t),opts:x.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:xn||En(),duration:n.duration,tweens:[],createTween:function(t,n){var r=x.Tween(e,l.opts,t,n,l.opts.specialEasing[t]||l.opts.easing);return l.tweens.push(r),r},stop:function(t){var n=0,r=t?l.tweens.length:0;if(i)return this;for(i=!0;r>n;n++)l.tweens[n].run(1);return t?a.resolveWith(e,[l,t]):a.rejectWith(e,[l,t]),this}}),c=l.props;for(Dn(c,l.opts.specialEasing);s>o;o++)if(r=kn[o].call(l,e,c,l.opts))return r;return x.map(c,Sn,l),x.isFunction(l.opts.start)&&l.opts.start.call(e,l),x.fx.timer(x.extend(u,{elem:e,anim:l,queue:l.opts.queue})),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always)}function Dn(e,t){var n,r,i,o,s;for(n in e)if(r=x.camelCase(n),i=t[r],o=e[n],x.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),s=x.cssHooks[r],s&&"expand"in s){o=s.expand(o),delete e[r];for(n in o)n in e||(e[n]=o[n],t[n]=i)}else t[r]=i}x.Animation=x.extend(jn,{tweener:function(e,t){x.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;i>r;r++)n=e[r],Nn[n]=Nn[n]||[],Nn[n].unshift(t)},prefilter:function(e,t){t?kn.unshift(e):kn.push(e)}});function An(e,t,n){var r,i,o,s,a,u,l=this,c={},p=e.style,f=e.nodeType&&Lt(e),h=H.get(e,"fxshow");n.queue||(a=x._queueHooks(e,"fx"),null==a.unqueued&&(a.unqueued=0,u=a.empty.fire,a.empty.fire=function(){a.unqueued||u()}),a.unqueued++,l.always(function(){l.always(function(){a.unqueued--,x.queue(e,"fx").length||a.empty.fire()})})),1===e.nodeType&&("height"in t||"width"in t)&&(n.overflow=[p.overflow,p.overflowX,p.overflowY],"inline"===x.css(e,"display")&&"none"===x.css(e,"float")&&(p.display="inline-block")),n.overflow&&(p.overflow="hidden",l.always(function(){p.overflow=n.overflow[0],p.overflowX=n.overflow[1],p.overflowY=n.overflow[2]}));for(r in t)if(i=t[r],wn.exec(i)){if(delete t[r],o=o||"toggle"===i,i===(f?"hide":"show")){if("show"!==i||!h||h[r]===undefined)continue;f=!0}c[r]=h&&h[r]||x.style(e,r)}if(!x.isEmptyObject(c)){h?"hidden"in h&&(f=h.hidden):h=H.access(e,"fxshow",{}),o&&(h.hidden=!f),f?x(e).show():l.done(function(){x(e).hide()}),l.done(function(){var t;H.remove(e,"fxshow");for(t in c)x.style(e,t,c[t])});for(r in c)s=Sn(f?h[r]:0,r,l),r in h||(h[r]=s.start,f&&(s.end=s.start,s.start="width"===r||"height"===r?1:0))}}function Ln(e,t,n,r,i){return new Ln.prototype.init(e,t,n,r,i)}x.Tween=Ln,Ln.prototype={constructor:Ln,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(x.cssNumber[n]?"":"px")},cur:function(){var e=Ln.propHooks[this.prop];return e&&e.get?e.get(this):Ln.propHooks._default.get(this)},run:function(e){var t,n=Ln.propHooks[this.prop];return this.pos=t=this.options.duration?x.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):Ln.propHooks._default.set(this),this}},Ln.prototype.init.prototype=Ln.prototype,Ln.propHooks={_default:{get:function(e){var t;return null==e.elem[e.prop]||e.elem.style&&null!=e.elem.style[e.prop]?(t=x.css(e.elem,e.prop,""),t&&"auto"!==t?t:0):e.elem[e.prop]},set:function(e){x.fx.step[e.prop]?x.fx.step[e.prop](e):e.elem.style&&(null!=e.elem.style[x.cssProps[e.prop]]||x.cssHooks[e.prop])?x.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},Ln.propHooks.scrollTop=Ln.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},x.each(["toggle","show","hide"],function(e,t){var n=x.fn[t];x.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(Hn(t,!0),e,r,i)}}),x.fn.extend({fadeTo:function(e,t,n,r){return this.filter(Lt).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=x.isEmptyObject(e),o=x.speed(t,n,r),s=function(){var t=jn(this,x.extend({},e),o);(i||H.get(this,"finish"))&&t.stop(!0)};return s.finish=s,i||o.queue===!1?this.each(s):this.queue(o.queue,s)},stop:function(e,t,n){var r=function(e){var t=e.stop;delete e.stop,t(n)};return"string"!=typeof e&&(n=t,t=e,e=undefined),t&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,i=null!=e&&e+"queueHooks",o=x.timers,s=H.get(this);if(i)s[i]&&s[i].stop&&r(s[i]);else for(i in s)s[i]&&s[i].stop&&Cn.test(i)&&r(s[i]);for(i=o.length;i--;)o[i].elem!==this||null!=e&&o[i].queue!==e||(o[i].anim.stop(n),t=!1,o.splice(i,1));(t||!n)&&x.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=H.get(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=x.timers,s=r?r.length:0;for(n.finish=!0,x.queue(this,e,[]),i&&i.stop&&i.stop.call(this,!0),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;s>t;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}});function Hn(e,t){var n,r={height:e},i=0;for(t=t?1:0;4>i;i+=2-t)n=jt[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}x.each({slideDown:Hn("show"),slideUp:Hn("hide"),slideToggle:Hn("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){x.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),x.speed=function(e,t,n){var r=e&&"object"==typeof e?x.extend({},e):{complete:n||!n&&t||x.isFunction(e)&&e,duration:e,easing:n&&t||t&&!x.isFunction(t)&&t};return r.duration=x.fx.off?0:"number"==typeof r.duration?r.duration:r.duration in x.fx.speeds?x.fx.speeds[r.duration]:x.fx.speeds._default,(null==r.queue||r.queue===!0)&&(r.queue="fx"),r.old=r.complete,r.complete=function(){x.isFunction(r.old)&&r.old.call(this),r.queue&&x.dequeue(this,r.queue)},r},x.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},x.timers=[],x.fx=Ln.prototype.init,x.fx.tick=function(){var e,t=x.timers,n=0;for(xn=x.now();t.length>n;n++)e=t[n],e()||t[n]!==e||t.splice(n--,1);t.length||x.fx.stop(),xn=undefined},x.fx.timer=function(e){e()&&x.timers.push(e)&&x.fx.start()},x.fx.interval=13,x.fx.start=function(){bn||(bn=setInterval(x.fx.tick,x.fx.interval))},x.fx.stop=function(){clearInterval(bn),bn=null},x.fx.speeds={slow:600,fast:200,_default:400},x.fx.step={},x.expr&&x.expr.filters&&(x.expr.filters.animated=function(e){return x.grep(x.timers,function(t){return e===t.elem}).length}),x.fn.offset=function(e){if(arguments.length)return e===undefined?this:this.each(function(t){x.offset.setOffset(this,e,t)});var t,n,i=this[0],o={top:0,left:0},s=i&&i.ownerDocument;if(s)return t=s.documentElement,x.contains(t,i)?(typeof i.getBoundingClientRect!==r&&(o=i.getBoundingClientRect()),n=qn(s),{top:o.top+n.pageYOffset-t.clientTop,left:o.left+n.pageXOffset-t.clientLeft}):o},x.offset={setOffset:function(e,t,n){var r,i,o,s,a,u,l,c=x.css(e,"position"),p=x(e),f={};"static"===c&&(e.style.position="relative"),a=p.offset(),o=x.css(e,"top"),u=x.css(e,"left"),l=("absolute"===c||"fixed"===c)&&(o+u).indexOf("auto")>-1,l?(r=p.position(),s=r.top,i=r.left):(s=parseFloat(o)||0,i=parseFloat(u)||0),x.isFunction(t)&&(t=t.call(e,n,a)),null!=t.top&&(f.top=t.top-a.top+s),null!=t.left&&(f.left=t.left-a.left+i),"using"in t?t.using.call(e,f):p.css(f)}},x.fn.extend({position:function(){if(this[0]){var e,t,n=this[0],r={top:0,left:0};return"fixed"===x.css(n,"position")?t=n.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),x.nodeName(e[0],"html")||(r=e.offset()),r.top+=x.css(e[0],"borderTopWidth",!0),r.left+=x.css(e[0],"borderLeftWidth",!0)),{top:t.top-r.top-x.css(n,"marginTop",!0),left:t.left-r.left-x.css(n,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||s;while(e&&!x.nodeName(e,"html")&&"static"===x.css(e,"position"))e=e.offsetParent;return e||s})}}),x.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(t,n){var r="pageYOffset"===n;x.fn[t]=function(i){return x.access(this,function(t,i,o){var s=qn(t);return o===undefined?s?s[n]:t[i]:(s?s.scrollTo(r?e.pageXOffset:o,r?o:e.pageYOffset):t[i]=o,undefined)},t,i,arguments.length,null)}});function qn(e){return x.isWindow(e)?e:9===e.nodeType&&e.defaultView}x.each({Height:"height",Width:"width"},function(e,t){x.each({padding:"inner"+e,content:t,"":"outer"+e},function(n,r){x.fn[r]=function(r,i){var o=arguments.length&&(n||"boolean"!=typeof r),s=n||(r===!0||i===!0?"margin":"border");return x.access(this,function(t,n,r){var i;return x.isWindow(t)?t.document.documentElement["client"+e]:9===t.nodeType?(i=t.documentElement,Math.max(t.body["scroll"+e],i["scroll"+e],t.body["offset"+e],i["offset"+e],i["client"+e])):r===undefined?x.css(t,n,s):x.style(t,n,r,s)},t,o?r:undefined,o,null)}})}),x.fn.size=function(){return this.length},x.fn.andSelf=x.fn.addBack,"object"==typeof module&&module&&"object"==typeof module.exports?module.exports=x:"function"==typeof define&&define.amd&&define("jquery",[],function(){return x}),"object"==typeof e&&"object"==typeof e.document&&(e.jQuery=e.$=x)})(window);
define('browserdetect',[],function () {
	var	AC	= {};

	AC.Detector = {
	    getAgent: function () {
	        return navigator.userAgent.toLowerCase()
	    },
	    isMac: function (c) {
	        var d = c || this.getAgent();
	        return !!d.match(/mac/i)
	    },
	    isSnowLeopard: function (c) {
	        if (typeof console != "undefined") {
	            console.warn('Instead of AC.Detector.isSnowLeopard, please use AC.Detector.macOSAtLeastVersion("10.6").')
	        }
	        var d = c || this.getAgent();
	        return !!d.match(/mac os x 10_6/i)
	    },
	    macOSVersion: function (g) {
	        var h = g || this.getAgent();
	        if (!this.isMac(h)) {
	            return null
	        }
	        var f = h.match(/(mac os x )([\d\._]*)/i);
	        if (f == null) {
	            return f
	        }
	        if ( !! f[2].match(/\./)) {
	            f = f[2].split(".")
	        } else {
	            f = f[2].split("_")
	        }
	        for (var e = 0; e < f.length;
	        e++) {
	            f[e] = parseInt(f[e])
	        }
	        return f
	    },
	    macOSAtLeastVersion: function (h, i) {
	        if (typeof h == "undefined") {
	            return false
	        }
	        var g = this.macOSVersion(i);
	        if (g == null) {
	            return false
	        }
	        if (typeof h == "string") {
	            h = h.replace(".", "_").split("_")
	        }
	        for (var j = 0; j < h.length; j++) {
	            var f = parseInt(g[j]);
	            if (isNaN(f)) {
	                f = 0
	            }
	            if (parseInt(h[j]) > f) {
	                return false
	            }
	        }
	        return true
	    },
	    isWin: function (c) {
	        var d = c || this.getAgent();
	        return !!d.match(/win/i)
	    },
	    winVersion: function (f) {
	        var d = f || this.getAgent();
	        if (this.isWin(d)) {
	            var e = d.match(/nt\s*([\d\.]*)/);
	            if (e && e[1]) {
	                return parseFloat(e[1])
	            }
	            return true
	        }
	        return false
	    },
	    winAtLeastVersion: function (f, d) {
	        if (typeof f == "undefined") {
	            return false
	        }
	        f = parseFloat(f);
	        if (f === NaN) {
	            return false
	        }
	        var e = this.winVersion(d);
	        if (e === null || e === false || e === true) {
	            return false
	        }
	        return (f <= e)
	    },
	    isWin2k: function (c) {
	        var d = c || this.getAgent();
	        return this.isWin(d) && (d.match(/nt\s*5/i))
	    },
	    isWinVista: function (c) {
	        var d = c || this.getAgent();
	        return this.isWin(d) && (d.match(/nt\s*6\.0([0-9]{0,2})?/i))
	    },
	    isWebKit: function (c) {
	        if (this._isWebKit === undefined) {
	            var d = c || this.getAgent();
	            this._isWebKit = !! d.match(/AppleWebKit/i);
	            this.isWebKit = function () {
	                return this._isWebKit
	            }
	        }
	        return this._isWebKit
	    },
	    isSafari2: function (f) {
	        if (typeof console != "undefined") {
	            console.warn("Instead of AC.Detector.isSafari2(), please use AC.Detector.isWebKit().")
	        }
	        var d = f || this.getAgent();
	        if (this._isSafari2 === undefined) {
	            if (!this.isWebKit(d)) {
	                this._isSafari2 = false
	            } else {
	                var e = parseInt(parseFloat(d.substring(d.lastIndexOf("safari/") + 7)), 10);
	                this._isSafari2 = (e >= 419)
	            }
	            this.isSafari2 = function () {
	                return this._isSafari2
	            }
	        }
	        return this._isSafari2
	    },
	    isChrome: function (c) {
	        if (this._isChrome === undefined) {
	            var d = c || this.getAgent();
	            this._isChrome = !! d.match(/Chrome/i);
	            this.isChrome = function () {
	                return this._isChrome
	            }
	        }
	        return this._isChrome
	    },
	    isiPhone: function (c) {
	        if (typeof console != "undefined") {
	            console.warn("Instead of AC.Detector.isiPhone(), please use AC.Detector.isMobile().")
	        }
	        var d = c || this.getAgent();
	        return this.isMobile(d)
	    },
	    iPhoneOSVersion: function (k) {
	        if (typeof console != "undefined") {
	            console.warn("Instead of AC.Detector.iPhoneOSVersion(), please use AC.Detector.iOSVersion().")
	        }
	        var l = k || this.getAgent(),
	            h = this.isMobile(l),
	            j, i, g;
	        if (h) {
	            var j = l.match(/.*CPU ([\w|\s]+) like/i);
	            if (j && j[1]) {
	                i = j[1].split(" ");
	                g = i[2].split("_");
	                return g
	            } else {
	                return [1]
	            }
	        }
	        return null
	    },
	    isiPad: function (c) {
	        var d = c || this.getAgent();
	        return !!(this.isWebKit(d) && d.match(/ipad/i))
	    },
	    isMobile: function (c) {
	        var d = c || this.getAgent();
	        return this.isWebKit(d) && (d.match(/Mobile/i) && !this.isiPad(d))
	    },
	    _iOSVersion: null,
	    iOSVersion: function () {
	        if (this._iOSVersion === null) {
	            this._iOSVersion = (AC.Detector.isMobile() || AC.Detector.isiPad()) ? parseFloat(navigator.userAgent.match(/os ([\d_]*)/i)[1].replace("_", ".")) : false
	        }
	        return this._iOSVersion
	    },
	    isOpera: function (c) {
	        var d = c || this.getAgent();
	        return !!d.match(/opera/i)
	    },
	    isIE: function (c) {
	        var d = c || this.getAgent();
	        return !!d.match(/msie/i)
	    },
	    isIEStrict: function (c) {
	        var d = c || this.getAgent();
	        return d.match(/msie/i) && !this.isOpera(d)
	    },
	    isIE8: function (f) {
	        var d = f || this.getAgent();
	        var e = d.match(/msie\D*([\.\d]*)/i);
	        if (e && e[1]) {
	            version = e[1]
	        }
	        return (+version >= 8)
	    },
	    isFirefox: function (c) {
	        var d = c || this.getAgent();
	        return !!d.match(/firefox/i)
	    },
	    isiTunesOK: function (c) {
	        var d = c || this.getAgent();
	        if (this.isMac(d)) {
	            return true
	        }
	        if (this.winAtLeastVersion(5.1, d)) {
	            return true
	        }
	        return false
	    },
	    _isQTInstalled: undefined,
	    isQTInstalled: function () {
	        if (this._isQTInstalled === undefined) {
	            var e = false;
	            if (navigator.plugins && navigator.plugins.length) {
	                for (var d = 0; d < navigator.plugins.length;
	                d++) {
	                    var f = navigator.plugins[d];
	                    if (f.name.indexOf("QuickTime") > -1) {
	                        e = true
	                    }
	                }
	            } else {
	                if (typeof (execScript) != "undefined") {
	                    qtObj = false;
	                    execScript('on error resume next: qtObj = IsObject(CreateObject("QuickTimeCheckObject.QuickTimeCheck.1"))', "VBScript");
	                    e = qtObj
	                }
	            }
	            this._isQTInstalled = e
	        }
	        return this._isQTInstalled
	    },
	    getQTVersion: function () {
	        var f = "0";
	        if (navigator.plugins && navigator.plugins.length) {
	            for (var h = 0; h < navigator.plugins.length;
	            h++) {
	                var g = navigator.plugins[h];
	                var e = g.name.match(/quicktime\D*([\.\d]*)/i);
	                if (e && e[1]) {
	                    f = e[1]
	                }
	            }
	        } else {
	            if (typeof (execScript) != "undefined") {
	                ieQTVersion = null;
	                execScript('on error resume next: ieQTVersion = CreateObject("QuickTimeCheckObject.QuickTimeCheck.1").QuickTimeVersion', "VBScript");
	                if (ieQTVersion) {
	                    f = ieQTVersion.toString(16);
	                    f = [f.charAt(0), f.charAt(1), f.charAt(2)].join(".")
	                }
	            }
	        }
	        return f
	    },
	    isQTCompatible: function (j, h) {
	        function f(c, a) {
	            var d = parseInt(c[0], 10);
	            if (isNaN(d)) {
	                d = 0
	            }
	            var b = parseInt(a[0], 10);
	            if (isNaN(b)) {
	                b = 0
	            }
	            if (d === b) {
	                if (c.length > 1) {
	                    return f(c.slice(1), a.slice(1))
	                } else {
	                    return true
	                }
	            } else {
	                if (d < b) {
	                    return true
	                } else {
	                    return false
	                }
	            }
	        }
	        var i = j.split(/\./);
	        var g = h ? h.split(/\./) : this.getQTVersion().split(/\./);
	        return f(i, g)
	    },
	    isValidQTAvailable: function (b) {
	        return this.isQTInstalled() && this.isQTCompatible(b)
	    },
	    isSBVDPAvailable: function (b) {
	        return false
	    },
	    _svgAsBackground: null,
	    svgAsBackground: function (f) {
	        if (this._svgAsBackground === null) {
	            var d = function () {
	                    AC.Detector._svgAsBackground = true;
	                    if (typeof (f) == "function") {
	                        f()
	                    }
	                };
	            var e = document.createElement("img");
	            e.setAttribute("src", "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNzUiIGhlaWdodD0iMjc1Ij48L3N2Zz4%3D");
	            if (e.complete) {
	                e.style.visibility = "hidden";
	                e.style.position = "absolute";
	                document.body.appendChild(e);
	                window.setTimeout(function () {
	                    AC.Detector._svgAsBackground = false;
	                    if (e.width >= 100) {
	                        document.body.removeChild(e);
	                        d()
	                    } else {
	                        document.body.removeChild(e)
	                    }
	                }, 1)
	            } else {
	                this._svgAsBackground = false;
	                e.onload = d
	            }
	        } else {
	            if (this._svgAsBackground && typeof (f) == "function") {
	                f()
	            }
	        }
	        return this._svgAsBackground
	    },
	    _style: null,
	    _prefixes: null,
	    _preFixes: null,
	    _css: null,
	    isCSSAvailable: function (i) {
	        if (!this._style) {
	            this._style = document.createElement("browserdetect").style
	        }
	        if (!this._prefixes) {
	            this._prefixes = "-webkit- -moz- -o- -ms- -khtml- ".split(" ")
	        }
	        if (!this._preFixes) {
	            this._preFixes = "Webkit Moz O ms Khtml ".split(" ")
	        }
	        if (!this._css) {
	            this._css = {}
	        }
	        i = i.replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2").replace(/([a-z\d])([A-Z])/g, "$1-$2").replace(/^(\-*webkit|\-*moz|\-*o|\-*ms|\-*khtml)\-/, "").toLowerCase();
	        switch (i) {
	        case "gradient":
	            if (this._css.gradient !== undefined) {
	                return this._css.gradient
	            }
	            var i = "background-image:",
	                l = "gradient(linear,left top,right bottom,from(#9f9),to(white));",
	                m = "linear-gradient(left top,#9f9, white);";
	            this._style.cssText = (i + this._prefixes.join(l + i) + this._prefixes.join(m + i)).slice(0, -i.length);
	            this._css.gradient = (this._style.backgroundImage.indexOf("gradient") !== -1);
	            return this._css.gradient;
	        case "inset-box-shadow":
	            if (this._css["inset-box-shadow"] !== undefined) {
	                return this._css["inset-box-shadow"]
	            }
	            var i = "box-shadow:",
	                j = "#fff 0 1px 1px inset;";
	            this._style.cssText = this._prefixes.join(i + j);
	            this._css["inset-box-shadow"] = (this._style.cssText.indexOf("inset") !== -1);
	            return this._css["inset-box-shadow"];
	        default:
	            var n = i.split("-"),
	                r = n.length,
	                o, p, q;
	            if (n.length > 0) {
	                i = n[0];
	                for (p = 1; p < r; p++) {
	                    i += n[p].substr(0, 1).toUpperCase() + n[p].substr(1)
	                }
	            }
	            o = i.substr(0, 1).toUpperCase() + i.substr(1);
	            if (this._css[i] !== undefined) {
	                return this._css[i]
	            }
	            for (q = this._preFixes.length - 1; q >= 0; q--) {
	                if (this._style[this._preFixes[q] + i] !== undefined || this._style[this._preFixes[q] + o] !== undefined) {
	                    this._css[i] = true;
	                    return true
	                }
	            }
	            return false
	        }
	        return false
	    },
	    _supportsThreeD: false,
	    supportsThreeD: function () {
	        try {
	            this._supportsThreeD = false;
	            if ("styleMedia" in window) {
	                this._supportsThreeD = window.styleMedia.matchMedium("(-webkit-transform-3d)")
	            } else {
	                if ("media" in window) {
	                    this._supportsThreeD = window.media.matchMedium("(-webkit-transform-3d)")
	                }
	            }
	            if (!this._supportsThreeD) {
	                if (!document.getElementById("supportsThreeDStyle")) {
	                    var d = document.createElement("style");
	                    d.id = "supportsThreeDStyle";
	                    d.textContent = "@media (transform-3d),(-o-transform-3d),(-moz-transform-3d),(-ms-transform-3d),(-webkit-transform-3d) { #supportsThreeD { height:3px } }";
	                    document.querySelector("head").appendChild(d)
	                }
	                if (!(div = document.querySelector("#supportsThreeD"))) {
	                    div = document.createElement("div");
	                    div.id = "supportsThreeD";
	                    document.body.appendChild(div)
	                }
	                this._supportsThreeD = (div.offsetHeight === 3)
	            }
	            return this._supportsThreeD
	        } catch (c) {
	            return false
	        }
	    },
	    _hasGyro: null,
	    _testingForGyro: false,
	    hasGyro: function () {
	        if (this._hasGyro !== null) {
	            return this._hasGyro
	        }
	        if ("DeviceOrientationEvent" in window && window.DeviceOrientationEvent !== null) {
	            if (this._testingForGyro === false) {
	                this._testingForGyro = true;
	                var b = this;
	                this.boundTestingForGyro = function (a) {
	                    b.testingForGyro(a)
	                };
	                window.addEventListener("deviceorientation", this.boundTestingForGyro, true);
	                this._testGyroTimeout = window.setTimeout(function () {
	                    this._hasGyro = false
	                }.bind(this), 250)
	            }
	            return this._hasGyro
	        } else {
	            return this._hasGyro = false
	        }
	    },
	    testingForGyro: function (b) {
	        if (this._hasGyro === false) {
	            return this._hasGyro
	        } else {
	            if (typeof b.gamma !== "undefined" && typeof b.beta !== "undefined") {
	                this._hasGyro = true
	            } else {
	                this._hasGyro = false
	            }
	            window.clearTimeout(this._testGyroTimeout);
	            window.removeEventListener("deviceorientation", this.boundTestingForGyro, true);
	            delete this.boundTestingForGyro
	        }
	    },
	    _isiPadWithGyro: null,
	    isiPadWithGyro: function () {
	        if (this._isiPadWithGyro === false || !this.isiPad()) {
	            return false
	        } else {
	            return this._isiPadWithGyro = this.hasGyro()
	        }
	    },
	    _hasLocalStorage: null,
	    hasLocalStorage: function () {
	        if (this._hasLocalStorage !== null) {
	            return this._hasLocalStorage
	        }
	        try {
	            if (typeof localStorage !== "undefined" && "setItem" in localStorage) {
	                localStorage.setItem("ac_browser_detect", "test");
	                this._hasLocalStorage = true;
	                localStorage.removeItem("ac_browser_detect", "test")
	            } else {
	                this._hasLocalStorage = false
	            }
	        } catch (b) {
	            this._hasLocalStorage = false
	        }
	        return this._hasLocalStorage
	    },
	    _hasSessionStorage: null,
	    hasSessionStorage: function () {
	        if (this._hasSessionStorage !== null) {
	            return this._hasSessionStorage
	        }
	        try {
	            if (typeof sessionStorage !== "undefined" && "setItem" in sessionStorage) {
	                sessionStorage.setItem("ac_browser_detect", "test");
	                this._hasSessionStorage = true;
	                sessionStorage.removeItem("ac_browser_detect", "test")
	            } else {
	                this._hasSessionStorage = false
	            }
	        } catch (b) {
	            this._hasSessionStorage = false
	        }
	        return this._hasSessionStorage
	    },
	    _hasCookies: null,
	    hasCookies: function () {
	        if (this._hasCookies !== null) {
	            return this._hasCookies
	        }
	        this._hasCookies = ("cookie" in document && !! navigator.cookieEnabled) ? true : false;
	        return this._hasCookies
	    }
	};

	return AC;
});
/**
* Bootstrap.js by @fat & @mdo
* plugins: bootstrap-transition.js, bootstrap-modal.js, bootstrap-dropdown.js, bootstrap-scrollspy.js, bootstrap-tab.js, bootstrap-tooltip.js, bootstrap-popover.js, bootstrap-affix.js, bootstrap-alert.js, bootstrap-button.js, bootstrap-collapse.js, bootstrap-carousel.js, bootstrap-typeahead.js
* Copyright 2012 Twitter, Inc.
* http://www.apache.org/licenses/LICENSE-2.0.txt
*/
!function(a){a(function(){a.support.transition=function(){var a=function(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"},c;for(c in b)if(a.style[c]!==undefined)return b[c]}();return a&&{end:a}}()})}(window.jQuery),!function(a){var b=function(b,c){this.options=c,this.$element=a(b).delegate('[data-dismiss="modal"]',"click.dismiss.modal",a.proxy(this.hide,this)),this.options.remote&&this.$element.find(".modal-body").load(this.options.remote)};b.prototype={constructor:b,toggle:function(){return this[this.isShown?"hide":"show"]()},show:function(){var b=this,c=a.Event("show");this.$element.trigger(c);if(this.isShown||c.isDefaultPrevented())return;a("body").addClass("modal-open"),this.isShown=!0,this.escape(),this.backdrop(function(){var c=a.support.transition&&b.$element.hasClass("fade");b.$element.parent().length||b.$element.appendTo(document.body),b.$element.show(),c&&b.$element[0].offsetWidth,b.$element.addClass("in").attr("aria-hidden",!1).focus(),b.enforceFocus(),c?b.$element.one(a.support.transition.end,function(){b.$element.trigger("shown")}):b.$element.trigger("shown")})},hide:function(b){b&&b.preventDefault();var c=this;b=a.Event("hide"),this.$element.trigger(b);if(!this.isShown||b.isDefaultPrevented())return;this.isShown=!1,a("body").removeClass("modal-open"),this.escape(),a(document).off("focusin.modal"),this.$element.removeClass("in").attr("aria-hidden",!0),a.support.transition&&this.$element.hasClass("fade")?this.hideWithTransition():this.hideModal()},enforceFocus:function(){var b=this;a(document).on("focusin.modal",function(a){b.$element[0]!==a.target&&!b.$element.has(a.target).length&&b.$element.focus()})},escape:function(){var a=this;this.isShown&&this.options.keyboard?this.$element.on("keyup.dismiss.modal",function(b){b.which==27&&a.hide()}):this.isShown||this.$element.off("keyup.dismiss.modal")},hideWithTransition:function(){var b=this,c=setTimeout(function(){b.$element.off(a.support.transition.end),b.hideModal()},500);this.$element.one(a.support.transition.end,function(){clearTimeout(c),b.hideModal()})},hideModal:function(a){this.$element.hide().trigger("hidden"),this.backdrop()},removeBackdrop:function(){this.$backdrop.remove(),this.$backdrop=null},backdrop:function(b){var c=this,d=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var e=a.support.transition&&d;this.$backdrop=a('<div class="modal-backdrop '+d+'" />').appendTo(document.body),this.options.backdrop!="static"&&this.$backdrop.click(a.proxy(this.hide,this)),e&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),e?this.$backdrop.one(a.support.transition.end,b):b()}else!this.isShown&&this.$backdrop?(this.$backdrop.removeClass("in"),a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(a.support.transition.end,a.proxy(this.removeBackdrop,this)):this.removeBackdrop()):b&&b()}},a.fn.modal=function(c){return this.each(function(){var d=a(this),e=d.data("modal"),f=a.extend({},a.fn.modal.defaults,d.data(),typeof c=="object"&&c);e||d.data("modal",e=new b(this,f)),typeof c=="string"?e[c]():f.show&&e.show()})},a.fn.modal.defaults={backdrop:!0,keyboard:!0,show:!0},a.fn.modal.Constructor=b,a(function(){a("body").on("click.modal.data-api",'[data-toggle="modal"]',function(b){var c=a(this),d=c.attr("href"),e=a(c.attr("data-target")||d&&d.replace(/.*(?=#[^\s]+$)/,"")),f=e.data("modal")?"toggle":a.extend({remote:!/#/.test(d)&&d},e.data(),c.data());b.preventDefault(),e.modal(f).one("hide",function(){c.focus()})})})}(window.jQuery),!function(a){function d(){e(a(b)).removeClass("open")}function e(b){var c=b.attr("data-target"),d;return c||(c=b.attr("href"),c=c&&/#/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,"")),d=a(c),d.length||(d=b.parent()),d}var b="[data-toggle=dropdown]",c=function(b){var c=a(b).on("click.dropdown.data-api",this.toggle);a("html").on("click.dropdown.data-api",function(){c.parent().removeClass("open")})};c.prototype={constructor:c,toggle:function(b){var c=a(this),f,g;if(c.is(".disabled, :disabled"))return;return f=e(c),g=f.hasClass("open"),d(),g||(f.toggleClass("open"),c.focus()),!1},keydown:function(b){var c,d,f,g,h,i;if(!/(38|40|27)/.test(b.keyCode))return;c=a(this),b.preventDefault(),b.stopPropagation();if(c.is(".disabled, :disabled"))return;g=e(c),h=g.hasClass("open");if(!h||h&&b.keyCode==27)return c.click();d=a("[role=menu] li:not(.divider) a",g);if(!d.length)return;i=d.index(d.filter(":focus")),b.keyCode==38&&i>0&&i--,b.keyCode==40&&i<d.length-1&&i++,~i||(i=0),d.eq(i).focus()}},a.fn.dropdown=function(b){return this.each(function(){var d=a(this),e=d.data("dropdown");e||d.data("dropdown",e=new c(this)),typeof b=="string"&&e[b].call(d)})},a.fn.dropdown.Constructor=c,a(function(){a("html").on("click.dropdown.data-api touchstart.dropdown.data-api",d),a("body").on("click.dropdown touchstart.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.dropdown.data-api touchstart.dropdown.data-api",b,c.prototype.toggle).on("keydown.dropdown.data-api touchstart.dropdown.data-api",b+", [role=menu]",c.prototype.keydown)})}(window.jQuery),!function(a){function b(b,c){var d=a.proxy(this.process,this),e=a(b).is("body")?a(window):a(b),f;this.options=a.extend({},a.fn.scrollspy.defaults,c),this.$scrollElement=e.on("scroll.scroll-spy.data-api",d),this.selector=(this.options.target||(f=a(b).attr("href"))&&f.replace(/.*(?=#[^\s]+$)/,"")||"")+" .nav li > a",this.$body=a("body"),this.refresh(),this.process()}b.prototype={constructor:b,refresh:function(){var b=this,c;this.offsets=a([]),this.targets=a([]),c=this.$body.find(this.selector).map(function(){var b=a(this),c=b.data("target")||b.attr("href"),d=/^#\w/.test(c)&&a(c);return d&&d.length&&[[d.position().top,c]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){b.offsets.push(this[0]),b.targets.push(this[1])})},process:function(){var a=this.$scrollElement.scrollTop()+this.options.offset,b=this.$scrollElement[0].scrollHeight||this.$body[0].scrollHeight,c=b-this.$scrollElement.height(),d=this.offsets,e=this.targets,f=this.activeTarget,g;if(a>=c)return f!=(g=e.last()[0])&&this.activate(g);for(g=d.length;g--;)f!=e[g]&&a>=d[g]&&(!d[g+1]||a<=d[g+1])&&this.activate(e[g])},activate:function(b){var c,d;this.activeTarget=b,a(this.selector).parent(".active").removeClass("active"),d=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',c=a(d).parent("li").addClass("active"),c.parent(".dropdown-menu").length&&(c=c.closest("li.dropdown").addClass("active")),c.trigger("activate")}},a.fn.scrollspy=function(c){return this.each(function(){var d=a(this),e=d.data("scrollspy"),f=typeof c=="object"&&c;e||d.data("scrollspy",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.scrollspy.Constructor=b,a.fn.scrollspy.defaults={offset:10},a(window).on("load",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);b.scrollspy(b.data())})})}(window.jQuery),!function(a){var b=function(b){this.element=a(b)};b.prototype={constructor:b,show:function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.attr("data-target"),e,f,g;d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,""));if(b.parent("li").hasClass("active"))return;e=c.find(".active a").last()[0],g=a.Event("show",{relatedTarget:e}),b.trigger(g);if(g.isDefaultPrevented())return;f=a(d),this.activate(b.parent("li"),c),this.activate(f,f.parent(),function(){b.trigger({type:"shown",relatedTarget:e})})},activate:function(b,c,d){function g(){e.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),b.addClass("active"),f?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu")&&b.closest("li.dropdown").addClass("active"),d&&d()}var e=c.find("> .active"),f=d&&a.support.transition&&e.hasClass("fade");f?e.one(a.support.transition.end,g):g(),e.removeClass("in")}},a.fn.tab=function(c){return this.each(function(){var d=a(this),e=d.data("tab");e||d.data("tab",e=new b(this)),typeof c=="string"&&e[c]()})},a.fn.tab.Constructor=b,a(function(){a("body").on("click.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(b){b.preventDefault(),a(this).tab("show")})})}(window.jQuery),!function(a){var b=function(a,b){this.init("tooltip",a,b)};b.prototype={constructor:b,init:function(b,c,d){var e,f;this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.enabled=!0,this.options.trigger=="click"?this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this)):this.options.trigger!="manual"&&(e=this.options.trigger=="hover"?"mouseenter":"focus",f=this.options.trigger=="hover"?"mouseleave":"blur",this.$element.on(e+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(f+"."+this.type,this.options.selector,a.proxy(this.leave,this))),this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},getOptions:function(b){return b=a.extend({},a.fn[this.type].defaults,b,this.$element.data()),b.delay&&typeof b.delay=="number"&&(b.delay={show:b.delay,hide:b.delay}),b},enter:function(b){var c=a(b.currentTarget)[this.type](this._options).data(this.type);if(!c.options.delay||!c.options.delay.show)return c.show();clearTimeout(this.timeout),c.hoverState="in",this.timeout=setTimeout(function(){c.hoverState=="in"&&c.show()},c.options.delay.show)},leave:function(b){var c=a(b.currentTarget)[this.type](this._options).data(this.type);this.timeout&&clearTimeout(this.timeout);if(!c.options.delay||!c.options.delay.hide)return c.hide();c.hoverState="out",this.timeout=setTimeout(function(){c.hoverState=="out"&&c.hide()},c.options.delay.hide)},show:function(){var a,b,c,d,e,f,g;if(this.hasContent()&&this.enabled){a=this.tip(),this.setContent(),this.options.animation&&a.addClass("fade"),f=typeof this.options.placement=="function"?this.options.placement.call(this,a[0],this.$element[0]):this.options.placement,b=/in/.test(f),a.remove().css({top:0,left:0,display:"block"}).appendTo(b?this.$element:document.body),c=this.getPosition(b),d=a[0].offsetWidth,e=a[0].offsetHeight;switch(b?f.split(" ")[1]:f){case"bottom":g={top:c.top+c.height,left:c.left+c.width/2-d/2};break;case"top":g={top:c.top-e,left:c.left+c.width/2-d/2};break;case"left":g={top:c.top+c.height/2-e/2,left:c.left-d};break;case"right":g={top:c.top+c.height/2-e/2,left:c.left+c.width}}a.css(g).addClass(f).addClass("in")}},setContent:function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},hide:function(){function d(){var b=setTimeout(function(){c.off(a.support.transition.end).remove()},500);c.one(a.support.transition.end,function(){clearTimeout(b),c.remove()})}var b=this,c=this.tip();return c.removeClass("in"),a.support.transition&&this.$tip.hasClass("fade")?d():c.remove(),this},fixTitle:function(){var a=this.$element;(a.attr("title")||typeof a.attr("data-original-title")!="string")&&a.attr("data-original-title",a.attr("title")||"").removeAttr("title")},hasContent:function(){return this.getTitle()},getPosition:function(b){return a.extend({},b?{top:0,left:0}:this.$element.offset(),{width:this.$element[0].offsetWidth,height:this.$element[0].offsetHeight})},getTitle:function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||(typeof c.title=="function"?c.title.call(b[0]):c.title),a},tip:function(){return this.$tip=this.$tip||a(this.options.template)},validate:function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},enable:function(){this.enabled=!0},disable:function(){this.enabled=!1},toggleEnabled:function(){this.enabled=!this.enabled},toggle:function(){this[this.tip().hasClass("in")?"hide":"show"]()},destroy:function(){this.hide().$element.off("."+this.type).removeData(this.type)}},a.fn.tooltip=function(c){return this.each(function(){var d=a(this),e=d.data("tooltip"),f=typeof c=="object"&&c;e||d.data("tooltip",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.tooltip.Constructor=b,a.fn.tooltip.defaults={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover",title:"",delay:0,html:!0}}(window.jQuery),!function(a){var b=function(a,b){this.init("popover",a,b)};b.prototype=a.extend({},a.fn.tooltip.Constructor.prototype,{constructor:b,setContent:function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content > *")[this.options.html?"html":"text"](c),a.removeClass("fade top bottom left right in")},hasContent:function(){return this.getTitle()||this.getContent()},getContent:function(){var a,b=this.$element,c=this.options;return a=b.attr("data-content")||(typeof c.content=="function"?c.content.call(b[0]):c.content),a},tip:function(){return this.$tip||(this.$tip=a(this.options.template)),this.$tip},destroy:function(){this.hide().$element.off("."+this.type).removeData(this.type)}}),a.fn.popover=function(c){return this.each(function(){var d=a(this),e=d.data("popover"),f=typeof c=="object"&&c;e||d.data("popover",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.popover.Constructor=b,a.fn.popover.defaults=a.extend({},a.fn.tooltip.defaults,{placement:"right",trigger:"click",content:"",template:'<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'})}(window.jQuery),!function(a){var b=function(b,c){this.options=a.extend({},a.fn.affix.defaults,c),this.$window=a(window).on("scroll.affix.data-api",a.proxy(this.checkPosition,this)),this.$element=a(b),this.checkPosition()};b.prototype.checkPosition=function(){if(!this.$element.is(":visible"))return;var b=a(document).height(),c=this.$window.scrollTop(),d=this.$element.offset(),e=this.options.offset,f=e.bottom,g=e.top,h="affix affix-top affix-bottom",i;typeof e!="object"&&(f=g=e),typeof g=="function"&&(g=e.top()),typeof f=="function"&&(f=e.bottom()),i=this.unpin!=null&&c+this.unpin<=d.top?!1:f!=null&&d.top+this.$element.height()>=b-f?"bottom":g!=null&&c<=g?"top":!1;if(this.affixed===i)return;this.affixed=i,this.unpin=i=="bottom"?d.top-c:null,this.$element.removeClass(h).addClass("affix"+(i?"-"+i:""))},a.fn.affix=function(c){return this.each(function(){var d=a(this),e=d.data("affix"),f=typeof c=="object"&&c;e||d.data("affix",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.affix.Constructor=b,a.fn.affix.defaults={offset:0},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var b=a(this),c=b.data();c.offset=c.offset||{},c.offsetBottom&&(c.offset.bottom=c.offsetBottom),c.offsetTop&&(c.offset.top=c.offsetTop),b.affix(c)})})}(window.jQuery),!function(a){var b='[data-dismiss="alert"]',c=function(c){a(c).on("click",b,this.close)};c.prototype.close=function(b){function f(){e.trigger("closed").remove()}var c=a(this),d=c.attr("data-target"),e;d||(d=c.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),e=a(d),b&&b.preventDefault(),e.length||(e=c.hasClass("alert")?c:c.parent()),e.trigger(b=a.Event("close"));if(b.isDefaultPrevented())return;e.removeClass("in"),a.support.transition&&e.hasClass("fade")?e.on(a.support.transition.end,f):f()},a.fn.alert=function(b){return this.each(function(){var d=a(this),e=d.data("alert");e||d.data("alert",e=new c(this)),typeof b=="string"&&e[b].call(d)})},a.fn.alert.Constructor=c,a(function(){a("body").on("click.alert.data-api",b,c.prototype.close)})}(window.jQuery),!function(a){var b=function(b,c){this.$element=a(b),this.options=a.extend({},a.fn.button.defaults,c)};b.prototype.setState=function(a){var b="disabled",c=this.$element,d=c.data(),e=c.is("input")?"val":"html";a+="Text",d.resetText||c.data("resetText",c[e]()),c[e](d[a]||this.options[a]),setTimeout(function(){a=="loadingText"?c.addClass(b).attr(b,b):c.removeClass(b).removeAttr(b)},0)},b.prototype.toggle=function(){var a=this.$element.closest('[data-toggle="buttons-radio"]');a&&a.find(".active").removeClass("active"),this.$element.toggleClass("active")},a.fn.button=function(c){return this.each(function(){var d=a(this),e=d.data("button"),f=typeof c=="object"&&c;e||d.data("button",e=new b(this,f)),c=="toggle"?e.toggle():c&&e.setState(c)})},a.fn.button.defaults={loadingText:"loading..."},a.fn.button.Constructor=b,a(function(){a("body").on("click.button.data-api","[data-toggle^=button]",function(b){var c=a(b.target);c.hasClass("btn")||(c=c.closest(".btn")),c.button("toggle")})})}(window.jQuery),!function(a){var b=function(b,c){this.$element=a(b),this.options=a.extend({},a.fn.collapse.defaults,c),this.options.parent&&(this.$parent=a(this.options.parent)),this.options.toggle&&this.toggle()};b.prototype={constructor:b,dimension:function(){var a=this.$element.hasClass("width");return a?"width":"height"},show:function(){var b,c,d,e;if(this.transitioning)return;b=this.dimension(),c=a.camelCase(["scroll",b].join("-")),d=this.$parent&&this.$parent.find("> .accordion-group > .in");if(d&&d.length){e=d.data("collapse");if(e&&e.transitioning)return;d.collapse("hide"),e||d.data("collapse",null)}this.$element[b](0),this.transition("addClass",a.Event("show"),"shown"),a.support.transition&&this.$element[b](this.$element[0][c])},hide:function(){var b;if(this.transitioning)return;b=this.dimension(),this.reset(this.$element[b]()),this.transition("removeClass",a.Event("hide"),"hidden"),this.$element[b](0)},reset:function(a){var b=this.dimension();return this.$element.removeClass("collapse")[b](a||"auto")[0].offsetWidth,this.$element[a!==null?"addClass":"removeClass"]("collapse"),this},transition:function(b,c,d){var e=this,f=function(){c.type=="show"&&e.reset(),e.transitioning=0,e.$element.trigger(d)};this.$element.trigger(c);if(c.isDefaultPrevented())return;this.transitioning=1,this.$element[b]("in"),a.support.transition&&this.$element.hasClass("collapse")?this.$element.one(a.support.transition.end,f):f()},toggle:function(){this[this.$element.hasClass("in")?"hide":"show"]()}},a.fn.collapse=function(c){return this.each(function(){var d=a(this),e=d.data("collapse"),f=typeof c=="object"&&c;e||d.data("collapse",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.collapse.defaults={toggle:!0},a.fn.collapse.Constructor=b,a(function(){a("body").on("click.collapse.data-api","[data-toggle=collapse]",function(b){var c=a(this),d,e=c.attr("data-target")||b.preventDefault()||(d=c.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""),f=a(e).data("collapse")?"toggle":c.data();c[a(e).hasClass("in")?"addClass":"removeClass"]("collapsed"),a(e).collapse(f)})})}(window.jQuery),!function(a){var b=function(b,c){this.$element=a(b),this.options=c,this.options.slide&&this.slide(this.options.slide),this.options.pause=="hover"&&this.$element.on("mouseenter",a.proxy(this.pause,this)).on("mouseleave",a.proxy(this.cycle,this))};b.prototype={cycle:function(b){return b||(this.paused=!1),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},to:function(b){var c=this.$element.find(".item.active"),d=c.parent().children(),e=d.index(c),f=this;if(b>d.length-1||b<0)return;return this.sliding?this.$element.one("slid",function(){f.to(b)}):e==b?this.pause().cycle():this.slide(b>e?"next":"prev",a(d[b]))},pause:function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition.end&&(this.$element.trigger(a.support.transition.end),this.cycle()),clearInterval(this.interval),this.interval=null,this},next:function(){if(this.sliding)return;return this.slide("next")},prev:function(){if(this.sliding)return;return this.slide("prev")},slide:function(b,c){var d=this.$element.find(".item.active"),e=c||d[b](),f=this.interval,g=b=="next"?"left":"right",h=b=="next"?"first":"last",i=this,j=a.Event("slide",{relatedTarget:e[0]});this.sliding=!0,f&&this.pause(),e=e.length?e:this.$element.find(".item")[h]();if(e.hasClass("active"))return;if(a.support.transition&&this.$element.hasClass("slide")){this.$element.trigger(j);if(j.isDefaultPrevented())return;e.addClass(b),e[0].offsetWidth,d.addClass(g),e.addClass(g),this.$element.one(a.support.transition.end,function(){e.removeClass([b,g].join(" ")).addClass("active"),d.removeClass(["active",g].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger("slid")},0)})}else{this.$element.trigger(j);if(j.isDefaultPrevented())return;d.removeClass("active"),e.addClass("active"),this.sliding=!1,this.$element.trigger("slid")}return f&&this.cycle(),this}},a.fn.carousel=function(c){return this.each(function(){var d=a(this),e=d.data("carousel"),f=a.extend({},a.fn.carousel.defaults,typeof c=="object"&&c),g=typeof c=="string"?c:f.slide;e||d.data("carousel",e=new b(this,f)),typeof c=="number"?e.to(c):g?e[g]():f.interval&&e.cycle()})},a.fn.carousel.defaults={interval:5e3,pause:"hover"},a.fn.carousel.Constructor=b,a(function(){a("body").on("click.carousel.data-api","[data-slide]",function(b){var c=a(this),d,e=a(c.attr("data-target")||(d=c.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,"")),f=!e.data("modal")&&a.extend({},e.data(),c.data());e.carousel(f),b.preventDefault()})})}(window.jQuery),!function(a){var b=function(b,c){this.$element=a(b),this.options=a.extend({},a.fn.typeahead.defaults,c),this.matcher=this.options.matcher||this.matcher,this.sorter=this.options.sorter||this.sorter,this.highlighter=this.options.highlighter||this.highlighter,this.updater=this.options.updater||this.updater,this.$menu=a(this.options.menu).appendTo("body"),this.source=this.options.source,this.shown=!1,this.listen()};b.prototype={constructor:b,select:function(){var a=this.$menu.find(".active").attr("data-value");return this.$element.val(this.updater(a)).change(),this.hide()},updater:function(a){return a},show:function(){var b=a.extend({},this.$element.offset(),{height:this.$element[0].offsetHeight});return this.$menu.css({top:b.top+b.height,left:b.left}),this.$menu.show(),this.shown=!0,this},hide:function(){return this.$menu.hide(),this.shown=!1,this},lookup:function(b){var c;return this.query=this.$element.val(),!this.query||this.query.length<this.options.minLength?this.shown?this.hide():this:(c=a.isFunction(this.source)?this.source(this.query,a.proxy(this.process,this)):this.source,c?this.process(c):this)},process:function(b){var c=this;return b=a.grep(b,function(a){return c.matcher(a)}),b=this.sorter(b),b.length?this.render(b.slice(0,this.options.items)).show():this.shown?this.hide():this},matcher:function(a){return~a.toLowerCase().indexOf(this.query.toLowerCase())},sorter:function(a){var b=[],c=[],d=[],e;while(e=a.shift())e.toLowerCase().indexOf(this.query.toLowerCase())?~e.indexOf(this.query)?c.push(e):d.push(e):b.push(e);return b.concat(c,d)},highlighter:function(a){var b=this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&");return a.replace(new RegExp("("+b+")","ig"),function(a,b){return"<strong>"+b+"</strong>"})},render:function(b){var c=this;return b=a(b).map(function(b,d){return b=a(c.options.item).attr("data-value",d),b.find("a").html(c.highlighter(d)),b[0]}),b.first().addClass("active"),this.$menu.html(b),this},next:function(b){var c=this.$menu.find(".active").removeClass("active"),d=c.next();d.length||(d=a(this.$menu.find("li")[0])),d.addClass("active")},prev:function(a){var b=this.$menu.find(".active").removeClass("active"),c=b.prev();c.length||(c=this.$menu.find("li").last()),c.addClass("active")},listen:function(){this.$element.on("blur",a.proxy(this.blur,this)).on("keypress",a.proxy(this.keypress,this)).on("keyup",a.proxy(this.keyup,this)),(a.browser.chrome||a.browser.webkit||a.browser.msie)&&this.$element.on("keydown",a.proxy(this.keydown,this)),this.$menu.on("click",a.proxy(this.click,this)).on("mouseenter","li",a.proxy(this.mouseenter,this))},move:function(a){if(!this.shown)return;switch(a.keyCode){case 9:case 13:case 27:a.preventDefault();break;case 38:a.preventDefault(),this.prev();break;case 40:a.preventDefault(),this.next()}a.stopPropagation()},keydown:function(b){this.suppressKeyPressRepeat=!~a.inArray(b.keyCode,[40,38,9,13,27]),this.move(b)},keypress:function(a){if(this.suppressKeyPressRepeat)return;this.move(a)},keyup:function(a){switch(a.keyCode){case 40:case 38:break;case 9:case 13:if(!this.shown)return;this.select();break;case 27:if(!this.shown)return;this.hide();break;default:this.lookup()}a.stopPropagation(),a.preventDefault()},blur:function(a){var b=this;setTimeout(function(){b.hide()},150)},click:function(a){a.stopPropagation(),a.preventDefault(),this.select()},mouseenter:function(b){this.$menu.find(".active").removeClass("active"),a(b.currentTarget).addClass("active")}},a.fn.typeahead=function(c){return this.each(function(){var d=a(this),e=d.data("typeahead"),f=typeof c=="object"&&c;e||d.data("typeahead",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.typeahead.defaults={source:[],items:8,menu:'<ul class="typeahead dropdown-menu"></ul>',item:'<li><a href="#"></a></li>',minLength:1},a.fn.typeahead.Constructor=b,a(function(){a("body").on("focus.typeahead.data-api",'[data-provide="typeahead"]',function(b){var c=a(this);if(c.data("typeahead"))return;b.preventDefault(),c.typeahead(c.data())})})}(window.jQuery);
define("bootstrap.min", function(){});

define('fM',['jquery'], function ($) {
	var	link = (function () {
		var	his			= [],
			lastState	= null,
			that		= {},
			$that		= $(that);
		that.get	= function () {
			var a = window.location.search.substr(1).split('&'),
				r = {};
			for(var i = 0; i < a.length; i += 1) {
				var US = a[i].split('=');
				r[US[0]] = US[1];
			}

			return r;
		}
		that.fileName	= function () {
			return location.pathname.substr(1);
		}
		that.navigate	= function (url, title, obj) {
			title		= title || 'Play.now';
			obj			= obj || {};
			obj.title	= obj.title || title;

			if(lastState) {
				his.splice(lastState._id + 1);
			}
			his.push(obj);
			obj._id	= his.length - 1;

			if(url) {
				window.history.pushState(obj, title, url);
			}
			$(window).trigger('popstate');
		}
		that.navigated	= function (url, title, obj) {
			document.title	= title;

			obj			= $.extend(history.state, obj);
			obj.title	= title;

			his[obj._id]	= obj;
			window.history.replaceState(obj, title, document.location.pathname);
			lastState	= obj;

			$that.trigger('navigate-done', [lastState]);
		}
		that.getHistory	= function () {
			return his;
		}
		that.getParentHistory	= function () {
			return his.slice(0, lastState._id);
		}
		that.getParent	= function () {
			return his[lastState._id - 1];
		}
		that.getCurrent	= function () {
			return lastState ? his[lastState._id] : undefined;
		}
		that.getCurrentNavigate	= function () {
			return lastState ? his[lastState._id + 1] : undefined;
		}

		return that;
	}());

	var	requestAnimationFrame	= (function () {
		if(window.requestAnimationFrame) {
			return 'requestAnimationFrame';
		} else if(window.webkitRequestAnimationFrame) {
			return 'webkitRequestAnimationFrame';
		} else if(window.msRequestAnimationFrame) {
			return 'msRequestAnimationFrame';
		} else if(window.mozRequestAnimationFrame) {
			return 'mozRequestAnimationFrame';
		} else if(window.oRequestAnimationFrame) {
			return 'oRequestAnimationFrame';
		} else {
			return false;
		}
	}());
	var	audioContext	= (function () {
		if(window.audioContext) {
			return 'audioContext';
		} else if(window.webkitAudioContext) {
			return 'webkitAudioContext';
		} else if(window.msAudioContext) {
			return 'msAudioContext';
		} else if(window.mozAudioContext) {
			return 'mozAudioContext';
		} else if(window.oAudioContext) {
			return 'oAudioContext';
		} else {
			return false;
		}
	}());

	var	visibility	= (function () {
		var	status	= {},
			hidden,
			visibilityChange;
		if (typeof(document.hidden) !== "undefined") {
			hidden				= 'hidden';
			visibilityChange	= 'visibilitychange';
		} else if (typeof document.mozHidden !== 'undefined') {
			hidden				= 'mozHidden';
			visibilityChange	= 'mozvisibilitychange';
		} else if (typeof document.msHidden !== 'undefined') {
			hidden				= 'msHidden';
			visibilityChange	= 'msvisibilitychange';
		} else if (typeof document.webkitHidden !== 'undefined') {
			hidden				= 'webkitHidden';
			visibilityChange	= 'webkitvisibilitychange';
		}

		function setStatus() {
			status.hidden	= document[hidden];
			$(status).trigger('change', status);
		}
		$(document).on(visibilityChange, setStatus);
		setStatus();

		return status;
	}());

	var form	= (function () {
		function autofocus(form) {
			if(!form.find) {
				form	= $(form);
			}
			if(form.find('[autofocus]').length === 0) {
				if(form.find('[data-original-title]') !== 0) {
					form.find('[data-original-title]').first().focus();
				} else {
					form.find('input, select, button').first().focus();
				}
			} else {
				form.find('[autofocus]').focus();
			}
		}

		function getElements() {
			var	i,
				elements	= this.elements || this.querySelectorAll('input, select'),
				element,
				value,
				obj			= {};

			for(i = 0; i < elements.length; i += 1) {
				element	= elements[i];
				if(element.type === 'checkbox') {
					value	= element.checked;
				} else if(element.nodeName === 'SELECT' && element.multiple) {
					value = [];
					for(var iOption = 0; iOption < element.options.length; iOption += 1) {
						if(element.options[iOption].selected) {
							value.push(element.options[iOption].value);
						}
					}
				} else {
					value	= is.float(element.value) ? parseFloat(element.value) : (element.value || '');
				}
				obj	= stringToArray(element.name, value, obj);
			}

			return obj;
		}

		return {
			autofocus:		autofocus,
			getElements:	getElements
		};
	}());

	var is = (function () {
		function float(value) {
			return (parseFloat(value) == value);
		}
		function mail(value) {
			return (/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/).test(value);
		}

		return {
			float:	float,
			mail:	mail
		};
	}());

	var	stringToArray = (function () {
		function stringToArray(string, value, mixin) {
			var	us,
				r	= us = mixin || {},
				pre,
				arr	= string.split(/[\[\]]/);

			if(value == undefined || value == null) {
				value = {};
			}

			for(var i = 0; i < arr.length; i += 1) {
				if(arr[i] == '') {
					continue;
				}
				pre	= us;
				us	= us[arr[i]] = us[arr[i]] || {};
			}
			if(arr.length > 1) {
				pre[arr[i-2]] = value;
			} else {
				r[arr[0]] = value;
			}

			return r;
		}

		return stringToArray;
	}());

	return {
		link:					link,
		requestAnimationFrame:	requestAnimationFrame,
		audioContext:			audioContext,
		visibility:				visibility,
		form:					form
	};
});
define('api',['jquery'], function ($) {
	var systemFolder    = '';

	function _apiGetter( url, data ) {
		function then( func ) {
			$.get(systemFolder + '/api/get.' + url, data, func);
		}
		return {
			then:    then
		};
	}
	function _apiSetter( url, data, cache ) {
		function then( func ) {
			$.ajax({
				url:    systemFolder + '/api/save.' + url,
				type:   'post',
				cache:  cache || false,
				data:   data,
				success:func
			});
		}
		return {
			then:    then
		};
	}
	var get = {
		games:  function ( callback ) {
			new _apiGetter( 'games.php', {

			})
			.then( function ( data ) {
				if( callback ) {
					callback( data );
				}
			});
		},
		game_info:	function ( callback, permlink, octave ) {
			new	_apiGetter( 'game.info.php', {
				permlink:	permlink,
				octave:		octave
			})
			.then( function ( data ) {
				if( callback ) {
					callback( data );
				}
			});
		},
		lang:	function ( callback, keys ) {
			new	_apiGetter( 'lang.php', {
				keys:	keys
			})
			.then( function ( data ) {
				if( callback ) {
					callback( data );
				}
			});
		},
		statistic_uuid:	function ( callback, search ) {
			new _apiGetter( 'statistic.search.uuid.php', {
				search:	search
			})
			.then( function ( data ) {
				if( callback ) {
					callback( data );
				}
			});
		},
		illustrations:	function ( callback, octave, tone_name ) {
			new	_apiGetter( 'illustrations.php', {
				octave:		octave,
				note_name:	tone_name
			})
			.then( function ( data ) {
				if( callback ) {
					callback( data );
				}
			});
		}
	};

	var save = {
		playlist:	function ( playlist_id, playlist_name, games, callback ) {
			new	_apiSetter( 'playlist.php', {
				playlist_id:	playlist_id,
				playlist_name:	playlist_name,
				games:			games
			})
			.then( function ( data ) {
				if( callback ) {
					callback( data );
				}
			});
		}
	};

	return  {
		get:    get,
		save:   save
	};
});
define('game/tones',[],function () {
	var	toneNames	= [
			[9, 'C', true, true],
			[7, 'D', true, true],
			[5, 'E', true, true],
			[4, 'F', false, true],
			[2, 'G', true, true],
			[0, 'A', true, true],
			[-2, 'B', true, false]
		],
		tones	= [
			{name:	'',		hz: 0,			pos: 1000,	octav:	0}
		];

	var	freq	= L2P_global && L2P_global.concert_pitch || 442;
	for(var octave = 0; octave <= 8; octave++) {
		var relOctave	= octave - 4;

		toneNames.forEach(function (toneInfo, toneNo) {
			var	pos			= toneInfo[0]
				name		= toneInfo[1],
				useFlat		= toneInfo[2],
				useSharp	= toneInfo[3],
				n			= relOctave * 12 - pos,
				toneFreq	= freq * Math.pow(2, n / 12);

			if(useFlat) {
				tones.push({
					name:	name+'b',
					hz:		freq * Math.pow(2, (n - 1) / 12),
					pos:	-relOctave * 7 - toneNo + 6,
					octav:	octave
				});
			}

			tones.push({
				name:	name,
				hz:		freq * Math.pow(2, n / 12),
				pos:	-relOctave * 7 - toneNo + 6,
				octav:	octave
			});

			if(useSharp) {
				tones.push({
					name:	name+'#',
					hz:		freq * Math.pow(2, (n + 1) / 12),
					pos:	-relOctave * 7 - toneNo + 6,
					octav:	octave
				});
			}
		});
	}

	tones.push({name:	'',		hz: 8000,		pos: -1000,	octav:	0});

	return tones;
});
define('game/options',['game/tones'], function (tones) {
	function capitaliseFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	var options = {
		leftMargin:		180,
		markerPos:		100,
		topPos:			100,
		lineHeight:		25,
		waitTime:		30,
		nodeLineExtra:	3,
		gameImageNodeType:	'image',
		gameImagePath:	'img/game/',
		gameImageType:	'.svg',
		noteSlurPos:	{
			x:	-10,
			y:	0,
			z:	50
		},
		svgStartContainerPosSharp: ['F', 'C', 'G', 'D', 'A', 'E'],
		svgStartContainerPosFlat: ['B', 'E', 'A', 'D', 'G', 'C'],
		tones:	{
			all:	tones,
			names:	{
				0:	{},
				1:	{},
				2:	{},
				3:	{},
				4:	{},
				5:	{},
				6:	{},
				7:	{},
				8:	{}
			},
			hertz:	{},
			pos:	{},
			rest:	{
				pos:	3
			}
		},
		tacts:	{
			types:		{
				quarter:	{
					name:	'quarter',
					length:	1,
					nodes:	4,
					id:		1
				},
				threeForth:	{
					name:	'threeForth',
					length:	3/4,
					nodes:	3,
					id:		2
				},
				fiveForth:	{
					name:	'fiveForth',
					length:	5/4,
					nodes:	5,
					id:		3
				},
				sixForth:	{
					name:	'sixForth',
					length:	6/4,
					nodes:	6,
					id:		4
				},
				twoForth:	{
					name:	'twoForth',
					length:	2/4,
					nodes:	2,
					id:		5
				}
			}
		},
		nodes:	{
			types:	{
				whole:	{
					name:	'whole',
					length:	1/1,
					img:	true,
					width:	16,
					id:		1,
					factor:	1.85
				},
				half:	{
					name:	'half',
					length:	1/2,
					img:	true,
					width:	14,
					id:		2,
					factor:	1.5
				},
				halfPeriod:	{
					name:	'halfPeriod',
					length:	1/2 * 1.5,
					img:	true,
					width:	14,
					id:		3,
					factor:	1.72
				},
				quarter:	{
					name:	'quarter',
					length:	1/4,
					img:	true,
					width:	14,
					id:		4,
					factor:	1
				},
				quarterPeriod:	{
					name:	'quarterPeriod',
					length:	1/4 * 1.5,
					img:	true,
					width:	14,
					id:		5,
					factor:	1.15
				},
				eighth:	{
					name:	'eighth',
					length:	1/8,
					img:	true,
					width:	14,
					id:		6,
					factor:	0.85
				},
				eighthPeriod:	{
					name:	'eighthPeriod',
					length:	1/8 * 1.5,
					img:	true,
					width:	14,
					id:		7,
					factor:	0.97
				},
				sixteenth:	{
					name:	'sixteenth',
					length:	1/16,
					img:	true,
					width:	14,
					id:		8,
					factor:	0.7
				},
				sixteenthPeriod:	{
					name:	'sixteenthPeriod',
					length:	1/16 * 1.5,
					img:	true,
					width:	14,
					id:		9,
					factor:	80
				},
				rest:	{}
			}
		}
	};

	function makeRestNodes() {
		for(var name in options.nodes.types) {
			if(name !== 'rest' && name !== 'whole' && name !== 'half' && name.indexOf('Period') === -1) {
				var rest		= $.extend(true, {}, options.nodes.types[name]);
				rest.isRest	= true;
				rest.name		= 'rest' + capitaliseFirstLetter(name);
				rest.img		= true;
				rest.hasPlayed  = true;

				options.nodes.types.rest[name]	= rest;
			}
		}
	}
	makeRestNodes();

	tones.forEach(function (tone) {
		options.tones.names[tone.octav][tone.name]	= tone;
		options.tones.hertz[tone.hz]	= tone;

		options.tones.pos[tone.pos]	= options.tones.pos[tone.pos] || {};
		options.tones.pos[tone.pos][tone.name.substr(1)]	= tone;
	});

	function getClosestTone(tone, lower) {
		var	pos	= options.tones.all.indexOf(tone),
			t;

		if((pos === 0 && lower) || (pos === (options.tones.all.length - 1) && !lower)) {
			return null;
		}
		if(lower) {
			t	= options.tones.all[pos - 1];
			if(t.hz === tone.hz) {
				t	= options.tones.all[pos - 2]
			}
		} else {
			t	= options.tones.all[pos + 1];
			if(t.hz === tone.hz) {
				t	= options.tones.all[pos + 2]
			}
		}

		return t;
	}

	tones.forEach(function (tone) {
		tone.close	= {
			lower:	getClosestTone(tone, true),
			higher:	getClosestTone(tone, false)
		};
	});

	return options;
});
/**
 * @license RequireJS text 2.0.3 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/text for details
 */
/*jslint regexp: true */
/*global require: false, XMLHttpRequest: false, ActiveXObject: false,
  define: false, window: false, process: false, Packages: false,
  java: false, location: false */

define('text',['module'], function (module) {
    

    var text, fs,
        progIds = ['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.4.0'],
        xmlRegExp = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,
        bodyRegExp = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,
        hasLocation = typeof location !== 'undefined' && location.href,
        defaultProtocol = hasLocation && location.protocol && location.protocol.replace(/\:/, ''),
        defaultHostName = hasLocation && location.hostname,
        defaultPort = hasLocation && (location.port || undefined),
        buildMap = [],
        masterConfig = (module.config && module.config()) || {};

    text = {
        version: '2.0.3',

        strip: function (content) {
            //Strips <?xml ...?> declarations so that external SVG and XML
            //documents can be added to a document without worry. Also, if the string
            //is an HTML document, only the part inside the body tag is returned.
            if (content) {
                content = content.replace(xmlRegExp, "");
                var matches = content.match(bodyRegExp);
                if (matches) {
                    content = matches[1];
                }
            } else {
                content = "";
            }
            return content;
        },

        jsEscape: function (content) {
            return content.replace(/(['\\])/g, '\\$1')
                .replace(/[\f]/g, "\\f")
                .replace(/[\b]/g, "\\b")
                .replace(/[\n]/g, "\\n")
                .replace(/[\t]/g, "\\t")
                .replace(/[\r]/g, "\\r")
                .replace(/[\u2028]/g, "\\u2028")
                .replace(/[\u2029]/g, "\\u2029");
        },

        createXhr: masterConfig.createXhr || function () {
            //Would love to dump the ActiveX crap in here. Need IE 6 to die first.
            var xhr, i, progId;
            if (typeof XMLHttpRequest !== "undefined") {
                return new XMLHttpRequest();
            } else if (typeof ActiveXObject !== "undefined") {
                for (i = 0; i < 3; i += 1) {
                    progId = progIds[i];
                    try {
                        xhr = new ActiveXObject(progId);
                    } catch (e) {}

                    if (xhr) {
                        progIds = [progId];  // so faster next time
                        break;
                    }
                }
            }

            return xhr;
        },

        /**
         * Parses a resource name into its component parts. Resource names
         * look like: module/name.ext!strip, where the !strip part is
         * optional.
         * @param {String} name the resource name
         * @returns {Object} with properties "moduleName", "ext" and "strip"
         * where strip is a boolean.
         */
        parseName: function (name) {
            var strip = false, index = name.indexOf("."),
                modName = name.substring(0, index),
                ext = name.substring(index + 1, name.length);

            index = ext.indexOf("!");
            if (index !== -1) {
                //Pull off the strip arg.
                strip = ext.substring(index + 1, ext.length);
                strip = strip === "strip";
                ext = ext.substring(0, index);
            }

            return {
                moduleName: modName,
                ext: ext,
                strip: strip
            };
        },

        xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/,

        /**
         * Is an URL on another domain. Only works for browser use, returns
         * false in non-browser environments. Only used to know if an
         * optimized .js version of a text resource should be loaded
         * instead.
         * @param {String} url
         * @returns Boolean
         */
        useXhr: function (url, protocol, hostname, port) {
            var uProtocol, uHostName, uPort,
                match = text.xdRegExp.exec(url);
            if (!match) {
                return true;
            }
            uProtocol = match[2];
            uHostName = match[3];

            uHostName = uHostName.split(':');
            uPort = uHostName[1];
            uHostName = uHostName[0];

            return (!uProtocol || uProtocol === protocol) &&
                   (!uHostName || uHostName.toLowerCase() === hostname.toLowerCase()) &&
                   ((!uPort && !uHostName) || uPort === port);
        },

        finishLoad: function (name, strip, content, onLoad) {
            content = strip ? text.strip(content) : content;
            if (masterConfig.isBuild) {
                buildMap[name] = content;
            }
            onLoad(content);
        },

        load: function (name, req, onLoad, config) {
            //Name has format: some.module.filext!strip
            //The strip part is optional.
            //if strip is present, then that means only get the string contents
            //inside a body tag in an HTML string. For XML/SVG content it means
            //removing the <?xml ...?> declarations so the content can be inserted
            //into the current doc without problems.

            // Do not bother with the work if a build and text will
            // not be inlined.
            if (config.isBuild && !config.inlineText) {
                onLoad();
                return;
            }

            masterConfig.isBuild = config.isBuild;

            var parsed = text.parseName(name),
                nonStripName = parsed.moduleName + '.' + parsed.ext,
                url = req.toUrl(nonStripName),
                useXhr = (masterConfig.useXhr) ||
                         text.useXhr;

            //Load the text. Use XHR if possible and in a browser.
            if (!hasLocation || useXhr(url, defaultProtocol, defaultHostName, defaultPort)) {
                text.get(url, function (content) {
                    text.finishLoad(name, parsed.strip, content, onLoad);
                }, function (err) {
                    if (onLoad.error) {
                        onLoad.error(err);
                    }
                });
            } else {
                //Need to fetch the resource across domains. Assume
                //the resource has been optimized into a JS module. Fetch
                //by the module name + extension, but do not include the
                //!strip part to avoid file system issues.
                req([nonStripName], function (content) {
                    text.finishLoad(parsed.moduleName + '.' + parsed.ext,
                                    parsed.strip, content, onLoad);
                });
            }
        },

        write: function (pluginName, moduleName, write, config) {
            if (buildMap.hasOwnProperty(moduleName)) {
                var content = text.jsEscape(buildMap[moduleName]);
                write.asModule(pluginName + "!" + moduleName,
                               "define(function () { return '" +
                                   content +
                               "';});\n");
            }
        },

        writeFile: function (pluginName, moduleName, req, write, config) {
            var parsed = text.parseName(moduleName),
                nonStripName = parsed.moduleName + '.' + parsed.ext,
                //Use a '.js' file name so that it indicates it is a
                //script that can be loaded across domains.
                fileName = req.toUrl(parsed.moduleName + '.' +
                                     parsed.ext) + '.js';

            //Leverage own load() method to load plugin value, but only
            //write out values that do not have the strip argument,
            //to avoid any potential issues with ! in file names.
            text.load(nonStripName, req, function (value) {
                //Use own write() method to construct full module value.
                //But need to create shell that translates writeFile's
                //write() to the right interface.
                var textWrite = function (contents) {
                    return write(fileName, contents);
                };
                textWrite.asModule = function (moduleName, contents) {
                    return write.asModule(moduleName, fileName, contents);
                };

                text.write(pluginName, nonStripName, textWrite, config);
            }, config);
        }
    };

    if (masterConfig.env === 'node' || (!masterConfig.env &&
            typeof process !== "undefined" &&
            process.versions &&
            !!process.versions.node)) {
        //Using special require.nodeRequire, something added by r.js.
        fs = require.nodeRequire('fs');

        text.get = function (url, callback) {
            var file = fs.readFileSync(url, 'utf8');
            //Remove BOM (Byte Mark Order) from utf8 files if it is there.
            if (file.indexOf('\uFEFF') === 0) {
                file = file.substring(1);
            }
            callback(file);
        };
    } else if (masterConfig.env === 'xhr' || (!masterConfig.env &&
            text.createXhr())) {
        text.get = function (url, callback, errback) {
            var xhr = text.createXhr();
            xhr.open('GET', url, true);

            //Allow overrides specified in config
            if (masterConfig.onXhr) {
                masterConfig.onXhr(xhr, url);
            }

            xhr.onreadystatechange = function (evt) {
                var status, err;
                //Do not explicitly handle errors, those should be
                //visible via console output in the browser.
                if (xhr.readyState === 4) {
                    status = xhr.status;
                    if (status > 399 && status < 600) {
                        //An http 4xx or 5xx error. Signal an error.
                        err = new Error(url + ' HTTP status: ' + status);
                        err.xhr = xhr;
                        errback(err);
                    } else {
                        callback(xhr.responseText);
                    }
                }
            };
            xhr.send(null);
        };
    } else if (masterConfig.env === 'rhino' || (!masterConfig.env &&
            typeof Packages !== 'undefined' && typeof java !== 'undefined')) {
        //Why Java, why is this so awkward?
        text.get = function (url, callback) {
            var stringBuffer, line,
                encoding = "utf-8",
                file = new java.io.File(url),
                lineSeparator = java.lang.System.getProperty("line.separator"),
                input = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(file), encoding)),
                content = '';
            try {
                stringBuffer = new java.lang.StringBuffer();
                line = input.readLine();

                // Byte Order Mark (BOM) - The Unicode Standard, version 3.0, page 324
                // http://www.unicode.org/faq/utf_bom.html

                // Note that when we use utf-8, the BOM should appear as "EF BB BF", but it doesn't due to this bug in the JDK:
                // http://bugs.sun.com/bugdatabase/view_bug.do?bug_id=4508058
                if (line && line.length() && line.charAt(0) === 0xfeff) {
                    // Eat the BOM, since we've already found the encoding on this file,
                    // and we plan to concatenating this buffer with others; the BOM should
                    // only appear at the top of a file.
                    line = line.substring(1);
                }

                stringBuffer.append(line);

                while ((line = input.readLine()) !== null) {
                    stringBuffer.append(lineSeparator);
                    stringBuffer.append(line);
                }
                //Make sure we return a JavaScript string and not a Java string.
                content = String(stringBuffer.toString()); //String
            } finally {
                input.close();
            }
            callback(content);
        };
    }

    return text;
});

define('text!templates/modal.html',[],function () { return '<form class="modal">\r\n\t<div class="modal-header">\r\n\t\t<h2></h2>\r\n\t</div>\r\n\t<div class="modal-body"></div>\r\n\t<div class="modal-footer">\r\n\t\t<button class="btn btn-primary"></button>\r\n\t\t<button class="btn" data-dismiss="modal"></button>\r\n\t</div>\r\n</form>';});

define('text!templates/game.html',[],function () { return '<div id="game_container_div" style="width: 100%;height: 500px;overflow: hidden;position: relative;">\r\n\t<svg height="500" width="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="svg_container" version="1.1">\r\n\t\t<defs>\r\n\t\t\t<g id="pointer" transform="scale(0.1875)">\r\n\t\t\t\t<path id="svg_1" d="m0,0l0,100l86,-50l-87,-50"/>\r\n\t\t\t</g>\r\n\t\t</defs>\r\n\t\t<g id="background"></g>\r\n\t\t<g id="notes"></g>\r\n\t\t<g id="start"></g>\r\n\t</svg>\r\n\t<svg height="500" style="-webkit-transform: translate3d(0, -501px, 0);" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="svg_container_notes" version="1.1">\r\n\t</svg>\r\n</div>';});

define('svg',[],function () {
	var	nameSpace	= {
		svg:	'http://www.w3.org/2000/svg',
		xlink:	'http://www.w3.org/1999/xlink'
	};

	function createSVGElement(nodeName) {
		return document.createElementNS(nameSpace.svg, nodeName);
	}

	var	SVGElement	= function (node) {
		this.node;
		this.ref;
		this.options	= {};
		this.x			= 0;
		this.y			= 0;
		this.width		= 0;
		this.height		= 0;
		this.x1			= 0;
		this.y1			= 0;
		this.x2			= 0;
		this.y2			= 0;
		this.cx			= 0;
		this.cy			= 0;
		this.r			= 0;
		this.rx			= 0;
		this.ry			= 0;
		this.link		= {
			href:	''
		};
		this.fill		= '';
		this.stroke			= '';
		this.strokeWidth	= 0;
		this.d				= '';
		this.innerText		= '';
		this.fontSize		= 0;
		this.fontWeight		= '';
		this.borderRadius	= [];
		this.text			= '';

		this.setNode(node);
	};
	SVGElement.prototype.setNode	= function (node) {
		if(node && node.nodeName) {
			this.node	= node;
		} else if(node) {
			this.node	= createSVGElement(node);
		}
		if(this.node) {
			this.node.SVGElement	= this;
		}

		return this;
	};
	SVGElement.prototype.setRef	= function (ref) {
		this.ref	= ref;

		return this;
	};
	SVGElement.prototype.removeChildNodes = function () {
		var	that	= this;
		while(this.node.childElementCount !== 0) {
			this.node.removeChild(this.node.childNodes[0]);
		}
	};
	SVGElement.prototype.setPos	= function (x, y) {
		this.node.setAttributeNS(null, 'x', x);
		this.node.setAttributeNS(null, 'y', y);

		this.x	= x;
		this.y	= y;

		return this;
	};
	SVGElement.prototype.setDimensions	= function (width, height) {
		this.node.setAttributeNS(null, 'width', width);
		this.node.setAttributeNS(null, 'height', height);

		this.width	= width;
		this.height	= height;

		return this;
	};
	SVGElement.prototype.setLine	= function (x1, y1, x2, y2) {
		this.node.setAttributeNS(null, 'x1', x1);
		this.node.setAttributeNS(null, 'y1', y1);
		this.node.setAttributeNS(null, 'x2', x2);
		this.node.setAttributeNS(null, 'y2', y2);

		this.x1	= x1;
		this.y1	= y1;
		this.x2	= x2;
		this.y2	= y2;

		return this;
	};
	SVGElement.prototype.setCircle	= function (cx, cy, r) {
		this.node.setAttributeNS(null, 'cx', cx);
		this.node.setAttributeNS(null, 'cy', cy);
		this.node.setAttributeNS(null, 'r', r);

		this.cx	= cx;
		this.cy	= cy;
		this.r	= r;

		return this;
	};
	SVGElement.prototype.setEllipse	= function (cx, cy, rx, ry) {
		this.node.setAttributeNS(null, 'cx', cx);
		this.node.setAttributeNS(null, 'cy', cy);
		this.node.setAttributeNS(null, 'rx', rx);
		this.node.setAttributeNS(null, 'ry', ry);

		this.cx	= cx;
		this.cy	= cy;
		this.rx	= rx;
		this.ry	= ry;

		return this;
	};
	SVGElement.prototype.setLink	= function (url) {
		this.node.setAttributeNS(nameSpace.xlink, 'xlink:href', url);

		this.link.href	= url;

		return this;
	};
	SVGElement.prototype.setFill	= function (fill) {
		this.node.setAttributeNS(null, 'fill', fill);

		this.fill	= '';

		return this;
	};
	SVGElement.prototype.setStroke	= function (stroke, width) {
		this.node.setAttributeNS(null, 'stroke', stroke);
		if(width) {
			this.setStrokeWidth(width);
		}

		this.stroke	= stroke;

		return this;
	};
	SVGElement.prototype.setStrokeWidth	= function (strokeWidth) {
		this.node.setAttributeNS(null, 'stroke-width', strokeWidth);

		this.strokeWidth	= strokeWidth;

		return this;
	};
	SVGElement.prototype.setAttribute	= function (name, value) {
		this.node.setAttributeNS(null, name, value);

		this[name]	= value;

		return this;
	};
	SVGElement.prototype.setLinkAttribute	= function (name, value) {
		this.node.setAttributeNS(nameSpace.xlink, 'xlink:'+name, value);

		this.link[name]	= value;

		return this;
	};
	SVGElement.prototype.setPath	= function (path) {
		this.node.setAttributeNS(null, 'd', path);

		this.d	= path;

		return this;
	};
	SVGElement.prototype.setInnerText	= function (text, fontSize, fontWeight) {
		var	textNode	= document.createTextNode(text);
		this.node.appendChild(textNode);

		this.innerText	= text;

		if(fontSize) {
			this.setFontSize(fontSize);
		}
		if(fontWeight) {
			this.setFontWeight(fontWeight);
		}

		return this;
	};
	SVGElement.prototype.setFontSize	= function (size) {
		this.node.style.fontSize	= size + 'px';

		this.fontSize	= size;

		return this;
	};
	SVGElement.prototype.setFontWeight	= function (weight) {
		this.node.style.fontWeight	= weight;

		this.fontWeight	= weight;

		return this;
	};
	SVGElement.prototype.setBorderRadius	= function (rx, ry) {
		if(ry === undefined) {
			ry	= rx;
		}
		this.node.setAttributeNS(null, 'rx', rx);
		this.node.setAttributeNS(null, 'ry', ry);

		this.borderRadius	= [rx, ry];

		return this;
	};
	SVGElement.prototype.setText	= function (text) {
		this.node.textContent	= text;

		this.text	= text;

		return this;
	}
	SVGElement.prototype.animateAbs	= function (x, y, duration, callback) {
		var	that		= this,
			secPrPx		= duration / x || 0,
			relativeX	= x - this.getPos().x,
			relativeDuration	= secPrPx * relativeX;

		this.node.style.webkitTransition	= 'all '+relativeDuration+'s linear';
		this.node.style.webkitTransform		= 'translate3d('+x+'px,'+y+'px,0px)';

		if(callback) {
			$(this.node).off('webkitTransitionEnd').on('webkitTransitionEnd', function (e) {
				$(that.node).off('webkitTransitionEnd');
				callback.call(this, e);
			});
		}

		return this;
	};
	SVGElement.prototype.animateX	= function (x, duration, callback) {
		var	that		= this,
			secPrPx		= duration / x,
			relativeX	= x - this.getPos().x,
			relativeDuration	= secPrPx * relativeX;

		this.node.style.webkitTransition	= 'all '+relativeDuration+'s linear';
		this.node.style.webkitTransform		= 'translate3d('+x+'px,0px,0px)';

		if(callback) {
			$(this.node).on('webkitTransitionEnd', function (e) {
				$(that.node).off('webkitTransitionEnd');
				callback.call(this, e);
			});
		}

		return this;
	};
	SVGElement.prototype.animateStopX	= function () {
		this.node.style.webkitTransition	= 'all 0s linear';
		this.node.style.webkitTransform		= 'translateX('+this.getPos().x+'px)';

		return this;
	};
	SVGElement.prototype.animateStop	= function () {
		var	pos	= this.getPos();

		this.node.style.webkitTransition	= 'all 0s linear';
		this.node.style.webkitTransform		= 'translate3d('+pos.x+'px,'+pos.y+'px,0px)';

		return this;
	};
	SVGElement.prototype.animateY	= function (y, duration) {
		var	secPrPx		= duration / y,
			relativeY	= y - this.getPos().y,
			relativeDuration	= secPrPx * relativeY;

		this.node.style.webkitTransition	= 'all '+relativeDuration+'s linear';
		this.node.style.webkitTransform		= 'translateY('+y+'px)';

		return this;
	};
	SVGElement.prototype.getPos	= function () {
		var CTM	= this.node.getCTM();

		return {
			x:	CTM.e,
			y:	CTM.f
		};
	};
	SVGElement.prototype.getAbsolutePos	= function () {
		var BBox	= this.node.getBBox();

		return {
			x:	BBox.x,
			y:	BBox.y,
			xr:	BBox.x + BBox.width,
			yb:	BBox.y + BBox.height,
			xc:	BBox.x + BBox.width / 2,
			yc:	BBox.y + BBox.height / 2
		};
	};
	SVGElement.prototype.appendTo	= function (elem) {
		if(elem.constructor === SVGElement) {
			elem.node.appendChild(this.node);
		} else {
			elem.appendChild(this.node);
		}

		return this;
	};
	SVGElement.prototype.getX		= function () {
		return this.node.x.baseVal.value;
	};
	SVGElement.prototype.getY		= function () {
		return this.node.y.baseVal.value;
	};

	return SVGElement;
});
define('game/tick',[],function () {
	function Tick(freq, toneDiff) {
		this.time		= Date.now();
		this.freq		= freq;
		this.toneDiff	= toneDiff;

		if(this.toneDiff.diffAbs >= 10) {
			this.percent	= 0;
		} else {
			this.percent	= ((10 - this.toneDiff.diffAbs) / 10) * 100;
		}
	}
	return Tick;
});
define('game/game',['game/options', 'fM'], function (options, fM) {
	var	Game	= function (speed) {
		this.defaultSpeed	= speed;
		this.startOctave	= 4;
		this.factor		= 1;
		this.defWidth	= 750 * this.factor;
		this.startPos	= options.leftMargin + this.defWidth;
		this.tacts		= [];
		this.running	= false;
		this.frame		= -1;
		this.length		= 0;
		this.speed;
		this.secPrNode;
		this.startTime;
		this.stopTime;
		this.convasControl;
		this.sound;
		this.nodePlaying;
		this.stopTimeout;
		this.controller;
		this.title		= '';
		this.duration	= -1;
		this.width		= -1;

		this.sharps		= {};
		this.flats		= {};

		this.setSpeed(speed);
	}
	Game.prototype.setSharp = function (toneName, isTrue) {
		this.sharps[toneName]	= isTrue === false ? false : true;
	};
	Game.prototype.setFlat = function (toneName, isTrue) {
		this.flats[toneName]	= isTrue === false ? false : true;
	};
	Game.prototype.setSpeed = function (speed) {
		if(!this.running) {
			this.speed		= speed;
			this.secPrNode	= 60 / this.speed;
		}
	};
	Game.prototype.addTact = function(tact) {
		tact.fill();
		tact.setKeys(this.sharps, this.flats);
		this.tacts.push(tact);
		this.length	+= tact.type.length;
	};
	Game.prototype.reset = function () {
		this.tacts.forEach(function (tact) {
			tact.svgElement	= null;
			tact.hasPlayed	= false;
			tact.nodes.forEach(function (note) {
				note.svgElement	= null;
				note.hasPlayed  = false;
				note.img        = note.type.img;
				note.ticks		= [];
				note.kiddieModeAccepted	= false;
			});
		});
	};
	Game.prototype.start = function () {
		this.startTime	= Date.now();

		this.running	= true;
	};
	Game.prototype.stop = function () {
		this.stopTime	= Date.now();

		this.running = false;
	};
	Game.prototype.getWidth = function () {
		if(this.width === -1) {
			var	that	= this,
				width	= options.leftMargin + this.defWidth;
			this.tacts.forEach(function (tact) {
				width	+= tact.type.length * that.defWidth;
			});

			this.width	= width;
		}

		return this.width;
	};
	Game.prototype.getDuration = function () {
		if(this.duration === -1) {
			var	that		= this,
				duration	= 4 * this.secPrNode;

			this.tacts.forEach(function (tact) {
				duration	+= tact.type.nodes * that.secPrNode;
			});

			console.log(this.secPrNode, duration);

			this.duration	= duration;
		}

		return this.duration;
	};
	Game.prototype.runAtPos = function (x) {
		var	that	= this;
		this.tacts.forEach(function (tact) {
			if(tact.hasPlayed) {
				return;
			}
			tact.nodes.forEach(function (note) {
				if(note.hasPlayed) {
					return;
				}
				if(note.svgElement.node.getBBox().x - x < options.markerPos + options.leftMargin + 10) {
					that.controller.playNote(note);
				}
			});
		});
	};
	Game.prototype.userPlayNode = function (feq) {
		if(this.nodePlaying.tone.hz === feq) {
			this.nodePlaying.img = images.nodes[this.nodePlaying.type.name+'True'];
		} else {
			this.nodePlaying.img = images.nodes[this.nodePlaying.type.name+'False'];
		}
		console.log(this.nodePlaying.tone.hz, feq);
	};

	return Game;
});
define('game/note',[],function() {
	var Note = (function () {
		var	steps	= [
			{
				percent:	95,
				factor:		1,
				text:		'Perfect',
				color:		'#090'
			},
			{
				percent:	80,
				factor:		0.95,
				text:		'Good',
				color:		'#0D0'
			},
			{
				percent:	60,
				factor:		0.9,
				text:		'Fair',
				color:		'#FF0'
			},
			{
				percent:	45,
				factor:		0.8,
				text:		'Average',
				color:		'#990'
			},
			{
				percent:	30,
				factor:		0.65,
				text:		'Poor',
				color:		'#F90'
			},
			{
				percent:	10,
				factor:		0.65,
				text:		'Rubbish',
				color:		'#C60'
			},
			{
				percent:	0,
				factor:		0.65,
				text:		'Miserable',
				color:		'#900'
			}
		];
		function Note(type, tone, isRemoveKey, isSlur) {
			if (typeof isRemoveKey === "undefined") { isRemoveKey = false; }
			if (typeof isSlur === "undefined") { isSlur = false; }
			this.type			= type;
			this.tone			= tone;
			this.isRemoveKey	= isRemoveKey;
			this.isSlur			= isSlur;
			this.hasPlayed		= false;
			this.length			= this.type.length;
			this.img			= this.type.img;
			this.isSharp		= this.tone.name && this.tone.name.substr(1) === '#';
			this.isFlat			= this.tone.name && this.tone.name.substr(1) === 'b';
			this.isPeriod		= this.type.name.indexOf('Period') !== -1;
			this.isRest 		= this.type.isRest;
			this.ticks			= [];
			this.stepPercent	= 0;
			this.stepFactor;
			this.points			= 0;
			this.kiddieModeAccepted	= false;
		}
		Note.prototype.calculatePoints	= function (gameController) {
			var	that			= this,
				totalPercent	= 0,
				speedFactor		= 1 + (gameController.game.speed - gameController.game.defaultSpeed) / 200,
				factor;

			this.ticks.forEach(function (tick) {
				totalPercent	+= Math.max(tick.percent, 0);
			});

			this.stepPercent	= totalPercent / this.ticks.length;

			steps.forEach(function (step) {
				if(!that.stepFactor && that.stepPercent >= step.percent) {
					that.stepFactor	= step;
				}
			});

			factor	= this.stepFactor && this.stepFactor.factor || 0;

			this.points	= +((this.stepPercent * 100).toFixed(0) * factor * speedFactor * this.type.factor * 0.1).toFixed(0);
			$(gameController).trigger('notePoints', [this]);
		};
		return Note;
	})();
	return Note;
})

;
define('game/tact',['jquery', 'game/options', 'game/note'], function ($, options, Node) {
	var	Tact	= function (type) {
		this.type		= type;
		this.length		= this.type.length;
		this.remaining	= this.length;
		this.nodes		= [];
		this.points		= 0;

		this.noteLength		= 0;
		this.notePercent	= 0;

		this.stepFactor;
	}
	Tact.prototype.addNode = function(node) {
		if(this.remaining >= node.length) {
			node.tact	= this;
			this.nodes.push(node);
			this.remaining	-= node.length;
			return true;
		} else {
			return false;
		}
	};
	Tact.prototype.fill = function () {
		while(this.remaining > 0) {
			if(this.remaining % (1/4) === 0) {
				this.addNode(new Node(options.nodes.types.rest.quarter, options.tones.rest));
			} else if(this.remaining % (1/8) === 0) {
				this.addNode(new Node(options.nodes.types.rest.eighth, options.tones.rest));
			} else if(this.remaining % (1/16) === 0) {
				this.addNode(new Node(options.nodes.types.rest.sixteenth, options.tones.rest));
			}
		}
	};
	Tact.prototype.setKeys = function (sharps, flats) {
		var sharps	= $.extend({}, sharps);
		var flats	= $.extend({}, flats);
		this.nodes.forEach(function (node) {
			if(node.type.isRest) {
				return;
			}
			if(node.isRemoveKey) {
				delete sharps[node.tone.name];
				delete flats[node.tone.name];
			} else {
				if(node.isSharp) {
					sharps[node.tone.name.substr(0,1)]	= true;
				}
				if(node.isFlat) {
					flats[node.tone.name.substr(0,1)]	= true;
				}
				if(!node.isSharp && sharps[node.tone.name]) {
					node.tone	= options.tones.names[node.tone.octav][node.tone.name+'#'];
				}
				if(!node.isFlat && flats[node.tone.name]) {
					node.tone	= options.tones.names[node.tone.octav][node.tone.name+'b'];
				}
			}
		});
	};
	Tact.prototype.calculatePoints	= function (gameController, getStepFactor) {
		var	tact		= this,
			noteLength	= 0,
			notePercent	= 0;

		this.points		= 0;

		this.nodes.forEach(function (note) {
			if(!note.isRest) {
				note.calculatePoints(gameController);

				notePercent	+= note.stepPercent * note.length;
				noteLength	+= note.length;
				tact.points	+= note.points;
			}
		});

		this.stepFactor	= getStepFactor(notePercent / noteLength);
	};

	return Tact;
});
define('game/game-controller',['jquery', 'svg', 'game/options', 'fM', 'api', 'l2p', 'game/tick'], function ($, SVGElement, options, fM, api, L2P, Tick) {
	function getImagePath(note, connect) {
		var	path	= options.gameImagePath;
		if(note.isRest) {
			path	+= note.type.name.substr(4, 1).toLowerCase() + note.type.name.substr(5) + 'rest';
		} else if(note.isPeriod) {
			path	+= note.type.name.substr(0, note.type.name.length - 6) + 'note-period';
		} else {
			if(connect) {
				path	+= 'quarter' + 'note';
			} else {
				path	+= note.type.name + 'note';
			}
		}

		return path + options.gameImageType;
	}
	function flipNote(note) {
		note.svgElement.setPos(note.svgElement.getX(), -175 - note.svgElement.getY() + 2 * 4);
		note.svgElement.node.style.webkitTransform	= 'scaleY(-1)';
		note.svgElement.options.flip				= true;
	}
	function unFlipNote(note) {
		note.svgElement.setPos(note.svgElement.getX(), note.svgElement.options.defY);
		note.svgElement.node.style.webkitTransform	= 'scaleY(1)';
		note.svgElement.options.flip				= false;
	}

	var	GameController	= function (svg) {
		var	that	= this;
		this.$this			= $(this);
		this.svg			= svg;
		this.svgBackground	= svg.querySelector('#background');
		this.SVGBackground	= new SVGElement(this.svgBackground);
		this.svgNotes		= svg.querySelector('#notes');
		this.svgNotes		= document.getElementById('svg_container_notes');
		this.gameContainerDiv	= document.getElementById('game_container_div');
		this.pointContainerDiv	= document.createElement('div');
		this.pointContainerDiv.style.width				= '130px';
		this.pointContainerDiv.style.height				= '40px';
		this.pointContainerDiv.style.borderRadius		= '5px';
		this.pointContainerDiv.style.position			= 'absolute';
		this.pointContainerDiv.style.top				= '0';
		this.pointContainerDiv.style.textAlign			= 'center';
		this.pointContainerDiv.style.padding			= '15px 0';
		this.pointContainerDiv.style.webkitTransform	= 'translate3d(145px, 150px, 0)';
		this.SVGNotes		= new SVGElement(this.svgNotes);
		this.svgStart		= svg.querySelector('#start');
		this.SVGStart		= new SVGElement(this.svgStart);
		this.permlink		= '';
		this.sound;
		this.game;
		this.lastPos		= 0;
		this.playSound		= false;
		this.useCountdown	= true;
		this.currentNote;
		this.currentTact;
		this.kiddieMode		= L2P_global.kiddie_mode;
		this.paused			= false;
		this.lastLeft		= -1;

		$(fM.visibility).on('change', function (e, visibility) {
			if(visibility.hidden) {
				that.stopGame();
			}
		});

		for(var i = 50 + options.lineHeight; i <= 50 + options.lineHeight * 5; i += options.lineHeight) {
			var	g	= new SVGElement('g')
				.appendTo(this.svgBackground);

			g.node.setAttribute('transform', 'translate(0, '+(i + options.topPos)+')');
			new SVGElement('line')
				.setLine(0, 0, '100%', 0)
				.setStroke('#000')
				.appendTo(g);
		}
		new SVGElement('image')
			.setLink('/img/game/g-key.svg')
			.setPos(5, options.topPos + options.lineHeight)
			.setDimensions(63, 190)
			.appendTo(this.svgStart);
		this.svgStartContainer =
			new SVGElement('g')
				.appendTo(this.svgStart);
		var	g	=
			new SVGElement('g')
				.appendTo(this.svgStart);
		g.node.setAttribute('transform', 'translate('+(options.leftMargin + options.markerPos)+', '+(options.topPos + 25 + options.lineHeight)+')');
		this.svgLine =
			new SVGElement('line')
				.setLine(0, 0, 0, options.topPos + 50 + options.lineHeight * 6 - (options.topPos + 25 + options.lineHeight))
				.setStroke('#090', 3)
				.appendTo(g);
		this.svgPointer	=
			new SVGElement('use')
				.setLink('#pointer')
				.setPos(options.leftMargin + options.markerPos, options.topPos + 50 + options.lineHeight * (4 / 2 - 0.5) - 0.85 * options.lineHeight * 0.5 + 1.5)
				.setFill('#090')
				.appendTo(this.svgStart);

		this.setPointerPos(1);

		this.factor;
		this.defWidth;
		this.startPos;
		this.setFactor(1);
	};
	GameController.prototype.showPointBox	= function (points, stepFactor) {
		var	div						= this.pointContainerDiv.cloneNode();
		div.innerHTML				= stepFactor.text+'<br>'+points+' Points';
		div.style.backgroundColor	= stepFactor.color;
		div.style.webkitTransition	= '1s';
		setTimeout(function () {
			div.style.webkitTransform	= 'translate3d(145px, 100px, 0)';
			div.style.opacity			= '0';
			setTimeout(function () {
				div.remove();
			}, 1000);
		}, 0);

		this.gameContainerDiv.appendChild(div);
	};
	GameController.prototype.setFactor	= function (factor) {
		this.factor		= factor;
		this.defWidth	= 750 * this.factor;
		this.startPos	= options.leftMargin + this.defWidth;
	};
	GameController.prototype.setGame	= function (game) {
		game.controller	= this;
		this.game		= game;
		this.status		= 0;
		this.plus		= 0;
		this.minus		= 0;
		this.point		= 0;
		this.pointCon	= $('#pointContainer');
		this.currentNote	= undefined;

		console.log(this.game);
		this.game.reset();

		this.SVGNotes.animateAbs(0, -501, 0);

		console.log('reset-pos', this.SVGNotes.node.style.webkitTransition, this.SVGNotes.node.style.webkitTransform);
		this.initView();

		this.$this.trigger('gameLoadSpeedChange', this.game.speed);
	};
	GameController.prototype.startGame	= function (nextSong) {
		var	that		= this,
			firstNote;

		if(this.game) {
			this.game.tacts.forEach(function (tact) {
				if(firstNote) {
					return;
				}
				tact.nodes.forEach(function (note) {
					if(firstNote) {
						return;
					}
					if(!note.isRest) {
						firstNote	= note;
					}
				});
			});

			if(this.useCountdown) {
				api.get.lang(function (data) {
					api.get.illustrations(function (illustration) {
						L2P.countdown(L2P_global.countdown_time || 3, data.game_start, that.game.title, illustration.illustration, function () {
							that.game.start();
							that.$this.trigger('gameStart');

							that.runGame();
						});
					}, firstNote.tone.octav, firstNote.tone.name);
				}, ['game_start']);
			} else {
				that.game.start();
				that.$this.trigger('gameStart');

				that.SVGNotes.node.style.webkitTransition	= '';
				that.SVGNotes.node.style.webkitTransform	= '';

				that.runGame();
			}
		}
	};
	GameController.prototype.runGame	= function () {
		var	gameController		= this,
			totalWidth			= this.game.getWidth() - gameController.defWidth / 4,
			totalDuration		= this.game.getDuration(),
			currentLeft			= -this.svgNotes.getClientRects()[0].left,
			relativeDuration	= totalDuration * (totalWidth - currentLeft) / totalWidth,
			pulse				= 60 / gameController.game.speed * 1000;

		gameController.paused	= false;

		gameController.SVGNotes.node.style.width	= (totalWidth + gameController.defWidth / 4)+'px';

		gameController.SVGNotes.animateAbs(-totalWidth, -501, relativeDuration, this.gameDone.bind(this));

		$(gameController.svgLine.node).on('webkitAnimationEnd', function () {
			gameController.svgLine.node.classList.remove('pulse');
		});
		var lastPulse	= Date.now(),
			pulseFunc	= function () {
				if(gameController.game && gameController.game.running) {
					gameController.svgLine.node.classList.add('pulse');

					setTimeout(pulseFunc, pulse - ((Date.now() - lastPulse) % pulse));
				}
			};

		if(currentLeft === 0) {
			setTimeout(function () {
				gameController.svgLine.node.classList.add('pulse');
				lastPulse	= Date.now();
				setTimeout(pulseFunc, pulse);
			}, pulse / 2 + pulse / 10);
		} else {
			gameController.svgLine.node.classList.add('pulse');
			lastPulse	= Date.now();
			setTimeout(pulseFunc, pulse);
		}
	};
	GameController.prototype.pauseGame	= function () {
		this.SVGNotes.animateAbs((-Math.floor(this.currentLeft() / (this.defWidth / 4)) + 0.5) * (this.defWidth / 4) - 20, -501, 0);
		this.paused	= true;
	};
	GameController.prototype.stopGame	= function () {
		if(this.game && this.game.running) {
			this.game.stop();

			this.pauseGame();

			this.$this.trigger('gameStop');
			this.sound.clearSound();
		}
	};
	GameController.prototype.drawSlur	= function (from, to) {
		var	fromPos	= from.svgElement.getAbsolutePos(),
			toPos	= to.svgElement.getAbsolutePos();

		if(from.svgElement.options.flip && !to.svgElement.options.flip) {
			fromPos.yc	= -fromPos.yc - 45;
		}

		var	slur	=
			new SVGElement('path')
				.setPath('M '+(fromPos.xc + options.noteSlurPos.x)+' '+(fromPos.yb + options.noteSlurPos.y)+' q '+((toPos.xc - fromPos.xc) / 2)+' '+options.noteSlurPos.z+' '+(toPos.xc - fromPos.xc)+' '+(toPos.yc - fromPos.yc))
				.setStroke('#000', 2)
				.setFill('none')
				.appendTo(from.tact.svgElement.node);

		if(from.svgElement.options.flip) {
			slur.node.style.webkitTransform			= 'scaleY(-1)';
		}
	};
	GameController.prototype.initView	= function () {
		var	that		= this,
			game		= this.game,
			tactLeftPos	= 0,
			firstSlur,
			lastSlur,
			svgStartContainerPos	= 0;

		this.svgStartContainer.removeChildNodes();
		options.svgStartContainerPosSharp.forEach(function (toneName) {
			if(game.sharps[toneName]) {
				new SVGElement('text')
					.setInnerText('\u266F', 36, 'bold')
					.setPos(80 + svgStartContainerPos * 15, options.topPos + (options.lineHeight * (5.5 + options.tones.names[5][toneName].pos / 2)) - 2)
					.appendTo(that.svgStartContainer);

				svgStartContainerPos	+= 1;
			}
		});
		options.svgStartContainerPosFlat.forEach(function (toneName, i) {
			if(game.flats[toneName]) {
				new SVGElement('text')
					.setInnerText('\u266D', 36, 'bold')
					.setPos(80 + svgStartContainerPos * 15, options.topPos + (options.lineHeight * (5.5 + options.tones.names[i === 0 || i === 2 ? 4 : 5][toneName].pos / 2)) - 5)
					.appendTo(that.svgStartContainer);

				svgStartContainerPos	+= 1;
			}
		});

		this.SVGNotes.animateAbs(0, -501, 0);
		this.SVGNotes.removeChildNodes();

		if(this.game) {
			var	lastNote;
			this.game.tacts.forEach(function (tact) {
				var tactWidth	= tact.type.length * that.defWidth,
					tactPos		= that.startPos + tactLeftPos,
					noteLeftPos	= 0,
					lastNote	= null,
					noteTime	= 0,
					connections	= [];

				tactLeftPos	+= tactWidth;

				tact.svgElement	= new SVGElement('g').appendTo(that.svgNotes);
				new SVGElement('line')
					.setLine(tactPos, 75 + options.topPos, tactPos, options.lineHeight * 6 + 25 + options.topPos)
					.setStroke('#000', 2)
					.appendTo(tact.svgElement.node);

				tact.nodes.forEach(function (note) {
					var noteWidth	= note.type.length * that.defWidth,
						notePos		= tactPos + that.defWidth / 16 + noteLeftPos - 20,
						tonePos 	= (note.tone.pos + 11) * options.lineHeight / 2 + 4,
						connect		= false;

					noteTime	+= note.type.length;

					noteLeftPos	+= noteWidth;
					svgElement	= null;

					if(note.type.img) {
						if(note.length <= 1/8 && !note.isRest) {
							connections.push(note);
						}

						note.svgElement	= new SVGElement(options.gameImageNodeType)
											.setRef(note)
											.setLink('/'+getImagePath(note, connect))
											.setPos(notePos, tonePos)
											.setDimensions(50, 100)
											.appendTo(tact.svgElement.node);

						note.svgElement.options.defY	= tonePos;

						if(note.isSharp || note.isFlat || note.isRemoveKey) {
							var	text	= '',
								y		= 95;
							if(note.isSharp) {
								text	= '\u266F';
							} else if(note.isFlat) {
								text	= '\u266D';
								y		= 90;
							} else if(note.isRemoveKey) {
								text	= '\u266E';
							}
							new SVGElement('text')
								.setInnerText(text, 36, 'bold')
								.setPos(notePos - 25, tonePos + y)
								.appendTo(tact.svgElement.node);
						}
						if(note.isPeriod) {
							new	SVGElement('circle')
								.setCircle(notePos + 25 + 10, tonePos + 90 - 8, 3)
								.appendTo(tact.svgElement.node);
								/*
							new SVGElement('text')
								.setInnerText('◘', 36, 'bold')
								.setPos(notePos + 25, tonePos + 90)
								.appendTo(tact.svgElement.node);*/
						}

						if(note.tone.pos <= 0) {
							flipNote(note);
						}

						var	extraLine;
						for(extraLine = -6; extraLine >= note.tone.pos; extraLine -= 2) {
							var	y	= options.topPos + (extraLine / 2 + 5) * options.lineHeight;
							new SVGElement('line')
								.setLine(notePos - 5, y, notePos + 32, y)
								.setStroke('#000')
								.appendTo(tact.svgElement.node)
						}
						for(extraLine = 6; extraLine <= note.tone.pos; extraLine += 2) {
							var	y	= options.topPos + (extraLine / 2 + 5) * options.lineHeight;
							new SVGElement('line')
								.setLine(notePos - 5, y, notePos + 32, y)
								.setStroke('#000')
								.appendTo(tact.svgElement.node)
						}
					}
					if(note.isSlur) {
						lastSlur	= note;
					} else {
						if(lastSlur) {
							that.drawSlur(firstSlur, lastSlur);
							lastSlur	= null;
						}
						firstSlur	= note;
					}

					while(noteTime >= 1/4) {
						if(connections.length > 1) {
							(function (connections) {
								var	first	= connections[0],
									last	= connections[connections.length - 1],
									flip	= first.svgElement.options.flip;

								connections.forEach(function (note) {
									note.svgElement.setLink('/'+getImagePath(note, true));
									if(note !== first) {
										if(flip && !note.svgElement.options.flip) {
											flipNote(note);
										} else if(!flip && note.svgElement.options.flip) {
											unFlipNote(note);
										}
									}
								});

								var	y1		= first.svgElement.options.defY + 11 + (flip ? 147 : 0),
									y2		= last.svgElement.options.defY + 11 + (flip ? 147 : 0),
									x		= last.length - first.length,
									a		= (y2 - y1) / x,
									moveY	= 0;

								if(connections.length > 2) {
									var	notePos		= 0 - first.length;
									connections.forEach(function (note) {
										var	realY	= note.svgElement.options.defY + 11 + (flip ? 147 : 0),
											diffY	= y1 - realY;

										if(flip && diffY < 0 && diffY < -moveY) {
											moveY	= -diffY;
										} else if(!flip && diffY > 0 && diffY > -moveY) {
											moveY	= -diffY;
										}

										notePos	+= note.length;
									});

									connections.forEach(function (note) {
										if(note.svgElement.getY() !== y1 + moveY) {
											new SVGElement('line')
												.setLine(note.svgElement.getX() + 25, note.svgElement.options.defY + 11 + (flip ? 147 : 0), note.svgElement.getX() + 25, y1 + moveY)
												.setStroke('#000', 2)
												.appendTo(tact.svgElement.node);
										}
									});

									y2	= y1;
								}

								var	lastNote	= null;
								connections.forEach(function (note) {
									if(lastNote) {
										if(lastNote.length === 1/16 && note.length === 1/16) {
											new	SVGElement('line')
												.setRef(connections)
												.setLine(lastNote.svgElement.getX() + 24, y1 + moveY + (flip ? -10 : +10), note.svgElement.getX() + 26, y2 + moveY + (flip ? -10 : +10))
												.setStroke('#000', 5)
												.appendTo(tact.svgElement.node);
										}
										new	SVGElement('line')
											.setRef(connections)
											.setLine(lastNote.svgElement.getX() + 24, y1 + moveY, note.svgElement.getX() + 26, y2 + moveY)
											.setStroke('#000', 5)
											.appendTo(tact.svgElement.node);
									}
									lastNote	= note;
								});
							}(connections));
						}
						connections	= [];
						noteTime	-= 1/4;
					}
				});
			});
		}
	};
	GameController.prototype.playNote	= function (note) {
		note.hasPlayed	= true;
		if(note.type.isRest) {
			this.sound.playRest();
		} else if(this.sound) {
			this.sound.play(note.tone.hz, note.isSlur);
		}
	};
	GameController.prototype.setGameSpeed	= function (speed) {
		if(this.game) {
			this.game.setSpeed(speed);
		}
	};
	GameController.prototype.importGame	= function (gameInfo, title, defaultOctave) {
		var	that	= this;

		require(['game/game', 'game/tact', 'game/note', 'game/options'], function (Game, Tact, Node, options) {
			var game        = new Game(gameInfo[0]),
				octave		= defaultOctave || gameInfo[1][0];

			game.title			= title;
			game.startOctave	= octave;

			if(gameInfo[3]) {
				gameInfo[3].forEach(function (toneName) {
					game.setSharp(toneName);
				});
			}
			if(gameInfo[4]) {
				gameInfo[4].forEach(function (toneName) {
					game.setFlat(toneName);
				});
			}

			function findInObject(obj, id) {
				var valud;
				for(name in obj) {
					value = obj[name];
					if(value.id === id) {
						return value;
					}
				}
			}

			function createNote(id, octave, nodeName, isRemoveKey, isSlur) {
				return new Node(findInObject(options.nodes.types, id), options.tones.names[octave][nodeName], isRemoveKey === 1 ? true : false, isSlur === 1 ? true : false);
			}
			function createRest(id) {
				return new Node(findInObject(options.nodes.types.rest, id), options.tones.rest);
			}
			function applyTact(id, notes) {
				var tact    = new Tact(findInObject(options.tacts.types, id));

				notes.forEach(function (noteInfo) {
					if(!noteInfo[1]) {
						tact.addNode(createRest(noteInfo[0]));
					} else {
						tact.addNode(createNote(noteInfo[0], noteInfo[2] + octave, noteInfo[1], noteInfo[3], noteInfo[4]));
					}
				});

				game.addTact(tact);

				return;
			}

			gameInfo[2].forEach(function (tact) {
				applyTact(tact[0], tact[1]);
			});

			that.setGame(game);
		});
	};
	GameController.prototype.exportGame	= function () {
		var ex = [
			this.game.speed,
			[],
			[],
			[]
		];

		for(var toneName in this.game.sharps) {
			ex[2].push(toneName);
		}
		for(var toneName in this.game.flats) {
			ex[3].push(toneName);
		}

		this.game.tacts.forEach(function (tact) {
			var exTact = [
				tact.type.id,
				[]
			];
			tact.nodes.forEach(function (node) {
				var exNode  = [
					node.type.id,
					node.tone.name,
					node.tone.octav,
					node.isRemoveKey ? 1 : 0,
					node.isSlur ? 1: 0
				];
				exTact[1].push(exNode);
			});
			ex[1].push(exTact);
		});

		return ex;
	};
	GameController.prototype.isRunning	= function () {
		return this.game && this.game.running;
	};
	GameController.prototype.setPointerPos = function (pos) {
		this.svgPointer
			.setPos(options.leftMargin + options.markerPos, options.topPos + 50 + options.lineHeight * (pos / 2 + 3) - 0.85 * options.lineHeight * 0.5 + 1.5);
	};
	GameController.prototype.generatePercentColor	= function (colorPercent) {
		var	colorGreen	= 0,
			colorRed	= 0,
			colorBlue	= 0;

		if(colorPercent <= 0.15) {
			colorGreen	= Math.round(200 - 60 * colorPercent/0.15);
		} else if(colorPercent <= 0.95) {
			colorGreen	= Math.round(240 - 70 * (colorPercent - 0.15)/(0.95-0.15));
			colorRed	= Math.round(240 - 70 * (colorPercent - 0.15)/(0.95-0.15));
		} else {
			colorRed	= 170;
		}
		return 'rgb('+colorRed+', '+colorGreen+', '+colorBlue+')';
	};
	GameController.prototype.tactDone	= function () {
		if(this.currentTact) {
			this.currentTact.calculatePoints(this, L2P.funcs.tones.getStepFactor);

			this.point	+= this.currentTact.points;
			this.pointCon.text(this.point);
			this.showPointBox(this.currentTact.points, this.currentTact.stepFactor);
		}
	};
	GameController.prototype.currentLeft	= function () {
		var	gameController	= this,
			left			= -gameController.svgNotes.getBoundingClientRect().left + 45,
			useLeft			= left,
			timeRunning,
			factor;

		if(left === gameController.lastLeft && !gameController.paused) {
			timeRunning	= Date.now() - gameController.game.startTime;
			factor		= timeRunning / (gameController.game.getDuration() * 1000);
			//useLeft		= gameController.game.getWidth() * factor + 2;
		}
		gameController.lastLeft	= left;

		return useLeft;
	};
	GameController.prototype.soundInput = function (freq, tone, diff) {
		var	that			= this,
			gameController	= this,
			ratio;

		if(this.game && this.game.running) {
			var	newPos	= gameController.currentLeft();

			this.game.tacts.forEach(function (tact) {
				if(tact.hasPlayed) {
					return;
				}
				tact.nodes.forEach(function (note) {
					var	noteLeftPos		= note.svgElement.getX() - newPos + 20,
						noteLeftPosRel	= noteLeftPos + ((750 / 4) * (gameController.game.speed / 60) * 0.1);

					if(noteLeftPos <= (options.markerPos + options.leftMargin + 10) && (noteLeftPos + note.type.length * that.defWidth) > (options.markerPos + options.leftMargin + 10)) {
						if(!note.hasPlayed && gameController.playSound) {
							that.playNote(note);
						}
					}

					if(noteLeftPosRel <= (options.markerPos + options.leftMargin + 10) && (noteLeftPosRel + note.type.length * that.defWidth) > (options.markerPos + options.leftMargin + 10)) {
						if(!note.hasPlayed && gameController.playSound) {
							that.playNote(note);
						}
						if(that.currentNote !== note) {
							if(!gameController.kiddieMode && that.currentTact !== note.tact) {
								gameController.tactDone();
							}
							that.currentNote	= note;
							that.currentTact	= tact;
						}
						var	closeTone	= L2P.funcs.tones.getCloseTone(freq, tone, note.tone);
						freq		= closeTone.freq;
						tone		= closeTone.tone;
						toneDiff	= L2P.funcs.tones.freqDiffToTone(note.tone, freq, 0);

						if(that.compass) {
							that.compass.setTone(note.tone);
							that.compass.setFreq(freq);
						}

						if(gameController.kiddieMode) {
							if(!note.isRest && (toneDiff.ratioRel > 0.15 || freq === -1) && !note.kiddieModeAccepted) {
								if(!gameController.paused) {
									gameController.pauseGame();
								}
								return;
							} else if(gameController.paused) {
								gameController.runGame();
							}
							note.kiddieModeAccepted	= true;
						}

						note.ticks.push(new Tick(freq, toneDiff));

						var	correct			= toneDiff.diffAbs < 5,
							colorPercent	= Math.min(toneDiff.ratioRel, 1);

						var	color			= that.generatePercentColor(colorPercent);

						that.svgPointer.setFill(color);
						that.svgLine.setStroke(color, 3);

						var points	= 10 - toneDiff.diffAbs;
						if(points < 0) {
							points	= 0;
						} else {
							//that.point	+= +points.toFixed(0);
							//that.pointCon.text(that.point);
						}

						that.status	= that.status + (correct ? 1 : -1);
						if(correct) {
							that.plus++;
						} else {
							that.minus++;
						}

						nodePlaying	= true;
					}
				});
			});
		} else {
			this.compass.setTone(tone);
			this.compass.setFreq(freq);
		}

		if(tone) {
			if(Math.abs(diff) < 2 && false) {
				that.setPointerPos(tone.pos);
			} else {
				var	pos	= options.tones.all.indexOf(tone);
				if(pos === -1) {
					return;
				}
				if(diff > 0) {
					var	toneAbove	= options.tones.all[pos + 1],
						toneDiffs	= Math.abs(toneAbove.hz - tone.hz);
					if(toneDiffs === 0) {
						toneAbove	= options.tones.all[pos + 2];
						toneDiffs	= Math.abs(toneAbove.hz - tone.hz);
					}
					var	ratio		= diff / toneDiffs;
				} else {
					var	toneAbove	= options.tones.all[pos - 1],
						toneDiffs	= Math.abs(toneAbove.hz - tone.hz);
					if(toneDiffs === 0) {
						toneAbove	= options.tones.all[pos - 2];
						toneDiffs	= Math.abs(toneAbove.hz - tone.hz);
					}
					var	ratio		= diff / toneDiffs;
				}

				that.setPointerPos(tone.pos - ratio);
			}
		}
	};
	GameController.prototype.expectedTone	= function () {
		return this.currentNote && this.currentNote.tone;
	};
	GameController.prototype.generateGameData	= function () {
		var	data	= [
			1.1,					// 0	_v
			this.game.speed,		// 1	speed
			[],						// 2	tacts
			this.point,				// 3	points
			[						// 4	time
				this.game.startTime,						// 0	start
				this.game.stopTime -this.game.startTime,	// 1	stop
				this.game.getDuration()						// 2	game duration
			],
			this.permlink,			// 5	permlink
			this.game.startOctave	// 6	startOctave
		];

		this.game.tacts.forEach(function (tact) {
			var	tactData	= [
				[]		// notes
			];
			tact.nodes.forEach(function (note) {
				var	noteData	= [
					[],					// 0	ticks
					note.stepFactor,	// 1	stepFactor
					note.points,		// 2	points
					note.tone.name,		// 3	toneName
					note.tone.octav		// 4	toneOctav
				];
				note.ticks.forEach(function (tick) {
					var	tickData	= [
						tick.percent,			// 0	percent
						tick.freq,				// 1	freq
						tick.time - data[4][0]	// 2	time
					];
					noteData[0].push(tickData);
				});
				tactData[0].push(noteData);
			});

			data[2].push(JSON.stringify(tactData));
		});

		//console.log(data);

		return JSON.stringify(data);
	};
	GameController.prototype.gameDone	= function () {
		if(!this.kiddieMode && this.currentTact) {
			this.tactDone();
		}

		this.stopGame();

		if(this.kiddieMode) {
			return;
		}
		var	data	= this.generateGameData(),
			that	= this;
		$.post('/api/save.game.php', {
			data:	data
		}, function (gameInfo) {
			that.$this.trigger('gameEnd', {
				points: {
					status:	that.status,
					plus:	that.plus,
					minus:	that.minus
				},
				game_history_id:	gameInfo.game_history_id
			});
		});
	};

	return GameController;
});
define('game/sound',['game/options', 'fM'], function (options, fM) {
	var	Sound	= function () {
		this.bufferSize = 1024;
		this.numInputs  = 1;
		this.numOutputs = 2;
		this.waitTime	= options.waitTime;

		this.pos            	= 0;

		this.playAfterTimeout	= false;
		this.currentPhase   	= 0.0;
		this.phaseIncrement 	= 0;
		this.feq            	= 440;

		if(fM.audioContext) {
			this.ctx    = new window[fM.audioContext]();
			this.node   = this.ctx.createJavaScriptNode(this.bufferSize, this.numInputs, this.numOutputs);

			this.node.onaudioprocess = this.player.bind(this);
			this.node.connect(this.ctx.destination);
		}
	}
	Sound.prototype.player = function (e) {
		// Get the left and right output buffers
		var left  = e.outputBuffer.getChannelData(0);
		var right = e.outputBuffer.getChannelData(1);

		// For each output sample
		var numSamples = right.length;
		for (var i = 0; i < numSamples; i++)
		{
			// Get a sine wave value
			var val = 0.1 * Math.sin(this.currentPhase);

			// Put it in the left and right buffer
			left[i] = val;
			right[i] = val;

			// Increment the phase
			this.currentPhase += this.phaseIncrement;
		}
	};
	Sound.prototype.play = function (feq, isSlur) {
		if(!fM.audioContext) {
			return;
		}
		var that    = this;

		if(!isSlur) {
			this.clearSound();
		}

		this.playAfterTimeout	= true;
		setTimeout(function () {
			if(that.playAfterTimeout) {
				that.feq        = feq;
				that.calculatePhaseIncrement();
			}
		}, this.waitTime);
	};
	Sound.prototype.playRest = function () {
		if(!fM.audioContext) {
			return;
		}
		setTimeout(this.clearSound.bind(this), this.waitTime);
	};
	Sound.prototype.clearSound = function () {
		if(!fM.audioContext) {
			return;
		}
		this.playAfterTimeout	= false;
		if(this.feq !== 0) {
			this.feq        = 0;
			this.calculatePhaseIncrement();
		}
	};
	Sound.prototype.calculatePhaseIncrement = function () {
		if(!fM.audioContext) {
			return;
		}
		this.phaseIncrement = 2 * Math.PI * this.feq / this.ctx.sampleRate;
	};

	return Sound;
});
/*
 *  DSP.js - a comprehensive digital signal processing  library for javascript
 *
 *  Created by Corban Brook <corbanbrook@gmail.com> on 2010-01-01.
 *  Copyright 2010 Corban Brook. All rights reserved.
 *
 */

////////////////////////////////////////////////////////////////////////////////
//                                  CONSTANTS                                 //
////////////////////////////////////////////////////////////////////////////////

/**
 * DSP is an object which contains general purpose utility functions and constants
 */
define('dsp',[],function () {
	var DSP = {
	  // Channels
	  LEFT:           0,
	  RIGHT:          1,
	  MIX:            2,

	  // Waveforms
	  SINE:           1,
	  TRIANGLE:       2,
	  SAW:            3,
	  SQUARE:         4,

	  // Filters
	  LOWPASS:        0,
	  HIGHPASS:       1,
	  BANDPASS:       2,
	  NOTCH:          3,

	  // Window functions
	  BARTLETT:       1,
	  BARTLETTHANN:   2,
	  BLACKMAN:       3,
	  COSINE:         4,
	  GAUSS:          5,
	  HAMMING:        6,
	  HANN:           7,
	  LANCZOS:        8,
	  RECTANGULAR:    9,
	  TRIANGULAR:     10,

	  // Loop modes
	  OFF:            0,
	  FW:             1,
	  BW:             2,
	  FWBW:           3,

	  // Math
	  TWO_PI:         2*Math.PI
	};

	// Setup arrays for platforms which do not support byte arrays
	function setupTypedArray(name, fallback) {
	  // check if TypedArray exists
	  // typeof on Minefield and Chrome return function, typeof on Webkit returns object.
	  if (typeof this[name] !== "function" && typeof this[name] !== "object") {
		// nope.. check if WebGLArray exists
		if (typeof this[fallback] === "function" && typeof this[fallback] !== "object") {
		  this[name] = this[fallback];
		} else {
		  // nope.. set as Native JS array
		  this[name] = function(obj) {
			if (obj instanceof Array) {
			  return obj;
			} else if (typeof obj === "number") {
			  return new Array(obj);
			}
		  };
		}
	  }
	}

	setupTypedArray("Float32Array", "WebGLFloatArray");
	setupTypedArray("Int32Array",   "WebGLIntArray");
	setupTypedArray("Uint16Array",  "WebGLUnsignedShortArray");
	setupTypedArray("Uint8Array",   "WebGLUnsignedByteArray");


	////////////////////////////////////////////////////////////////////////////////
	//                            DSP UTILITY FUNCTIONS                           //
	////////////////////////////////////////////////////////////////////////////////

	/**
	 * Inverts the phase of a signal
	 *
	 * @param {Array} buffer A sample buffer
	 *
	 * @returns The inverted sample buffer
	 */
	DSP.invert = function(buffer) {
	  for (var i = 0, len = buffer.length; i < len; i++) {
		buffer[i] *= -1;
	  }

	  return buffer;
	};

	/**
	 * Converts split-stereo (dual mono) sample buffers into a stereo interleaved sample buffer
	 *
	 * @param {Array} left  A sample buffer
	 * @param {Array} right A sample buffer
	 *
	 * @returns The stereo interleaved buffer
	 */
	DSP.interleave = function(left, right) {
	  if (left.length !== right.length) {
		throw "Can not interleave. Channel lengths differ.";
	  }

	  var stereoInterleaved = new Float32Array(left.length * 2);

	  for (var i = 0, len = left.length; i < len; i++) {
		stereoInterleaved[2*i]   = left[i];
		stereoInterleaved[2*i+1] = right[i];
	  }

	  return stereoInterleaved;
	};

	/**
	 * Converts a stereo-interleaved sample buffer into split-stereo (dual mono) sample buffers
	 *
	 * @param {Array} buffer A stereo-interleaved sample buffer
	 *
	 * @returns an Array containing left and right channels
	 */
	DSP.deinterleave = (function() {
	  var left, right, mix, deinterleaveChannel = [];

	  deinterleaveChannel[DSP.MIX] = function(buffer) {
		for (var i = 0, len = buffer.length/2; i < len; i++) {
		  mix[i] = (buffer[2*i] + buffer[2*i+1]) / 2;
		}
		return mix;
	  };

	  deinterleaveChannel[DSP.LEFT] = function(buffer) {
		for (var i = 0, len = buffer.length/2; i < len; i++) {
		  left[i]  = buffer[2*i];
		}
		return left;
	  };

	  deinterleaveChannel[DSP.RIGHT] = function(buffer) {
		for (var i = 0, len = buffer.length/2; i < len; i++) {
		  right[i]  = buffer[2*i+1];
		}
		return right;
	  };

	  return function(channel, buffer) {
		left  = left  || new Float32Array(buffer.length/2);
		right = right || new Float32Array(buffer.length/2);
		mix   = mix   || new Float32Array(buffer.length/2);

		if (buffer.length/2 !== left.length) {
		  left  = new Float32Array(buffer.length/2);
		  right = new Float32Array(buffer.length/2);
		  mix   = new Float32Array(buffer.length/2);
		}

		return deinterleaveChannel[channel](buffer);
	  };
	}());

	/**
	 * Separates a channel from a stereo-interleaved sample buffer
	 *
	 * @param {Array}  buffer A stereo-interleaved sample buffer
	 * @param {Number} channel A channel constant (LEFT, RIGHT, MIX)
	 *
	 * @returns an Array containing a signal mono sample buffer
	 */
	DSP.getChannel = DSP.deinterleave;

	/**
	 * Helper method (for Reverb) to mix two (interleaved) samplebuffers. It's possible
	 * to negate the second buffer while mixing and to perform a volume correction
	 * on the final signal.
	 *
	 * @param {Array} sampleBuffer1 Array containing Float values or a Float32Array
	 * @param {Array} sampleBuffer2 Array containing Float values or a Float32Array
	 * @param {Boolean} negate When true inverts/flips the audio signal
	 * @param {Number} volumeCorrection When you add multiple sample buffers, use this to tame your signal ;)
	 *
	 * @returns A new Float32Array interleaved buffer.
	 */
	DSP.mixSampleBuffers = function(sampleBuffer1, sampleBuffer2, negate, volumeCorrection){
	  var outputSamples = new Float32Array(sampleBuffer1);

	  for(var i = 0; i<sampleBuffer1.length; i++){
		outputSamples[i] += (negate ? -sampleBuffer2[i] : sampleBuffer2[i]) / volumeCorrection;
	  }

	  return outputSamples;
	};

	// Biquad filter types
	DSP.LPF = 0;                // H(s) = 1 / (s^2 + s/Q + 1)
	DSP.HPF = 1;                // H(s) = s^2 / (s^2 + s/Q + 1)
	DSP.BPF_CONSTANT_SKIRT = 2; // H(s) = s / (s^2 + s/Q + 1)  (constant skirt gain, peak gain = Q)
	DSP.BPF_CONSTANT_PEAK = 3;  // H(s) = (s/Q) / (s^2 + s/Q + 1)      (constant 0 dB peak gain)
	DSP.NOTCH = 4;              // H(s) = (s^2 + 1) / (s^2 + s/Q + 1)
	DSP.APF = 5;                // H(s) = (s^2 - s/Q + 1) / (s^2 + s/Q + 1)
	DSP.PEAKING_EQ = 6;         // H(s) = (s^2 + s*(A/Q) + 1) / (s^2 + s/(A*Q) + 1)
	DSP.LOW_SHELF = 7;          // H(s) = A * (s^2 + (sqrt(A)/Q)*s + A)/(A*s^2 + (sqrt(A)/Q)*s + 1)
	DSP.HIGH_SHELF = 8;         // H(s) = A * (A*s^2 + (sqrt(A)/Q)*s + 1)/(s^2 + (sqrt(A)/Q)*s + A)

	// Biquad filter parameter types
	DSP.Q = 1;
	DSP.BW = 2; // SHARED with BACKWARDS LOOP MODE
	DSP.S = 3;

	// Find RMS of signal
	DSP.RMS = function(buffer) {
	  var total = 0;

	  for (var i = 0, n = buffer.length; i < n; i++) {
		total += buffer[i] * buffer[i];
	  }

	  return Math.sqrt(total / n);
	};

	// Find Peak of signal
	DSP.Peak = function(buffer) {
	  var peak = 0;

	  for (var i = 0, n = buffer.length; i < n; i++) {
		peak = (Math.abs(buffer[i]) > peak) ? Math.abs(buffer[i]) : peak;
	  }

	  return peak;
	};

	// Fourier Transform Module used by DFT, FFT, RFFT
	function FourierTransform(bufferSize, sampleRate) {
	  this.bufferSize = bufferSize;
	  this.sampleRate = sampleRate;
	  this.bandwidth  = 2 / bufferSize * sampleRate / 2;

	  this.spectrum   = new Float32Array(bufferSize/2);
	  this.real       = new Float32Array(bufferSize);
	  this.imag       = new Float32Array(bufferSize);

	  this.peakBand   = 0;
	  this.peak       = 0;

	  /**
	   * Calculates the *middle* frequency of an FFT band.
	   *
	   * @param {Number} index The index of the FFT band.
	   *
	   * @returns The middle frequency in Hz.
	   */
	  this.getBandFrequency = function(index) {
		return this.bandwidth * index + this.bandwidth / 2;
	  };

	  this.calculateSpectrum = function() {
		var spectrum  = this.spectrum,
			real      = this.real,
			imag      = this.imag,
			bSi       = 2 / this.bufferSize,
			sqrt      = Math.sqrt,
			rval,
			ival,
			mag;

		for (var i = 0, N = bufferSize/2; i < N; i++) {
		  rval = real[i];
		  ival = imag[i];
		  mag = bSi * sqrt(rval * rval + ival * ival);

		  if (mag > this.peak) {
			this.peakBand = i;
			this.peak = mag;
		  }

		  spectrum[i] = mag;
		}
	  };
	}

	/**
	 * DFT is a class for calculating the Discrete Fourier Transform of a signal.
	 *
	 * @param {Number} bufferSize The size of the sample buffer to be computed
	 * @param {Number} sampleRate The sampleRate of the buffer (eg. 44100)
	 *
	 * @constructor
	 */
	function DFT(bufferSize, sampleRate) {
	  FourierTransform.call(this, bufferSize, sampleRate);

	  var N = bufferSize/2 * bufferSize;
	  var TWO_PI = 2 * Math.PI;

	  this.sinTable = new Float32Array(N);
	  this.cosTable = new Float32Array(N);

	  for (var i = 0; i < N; i++) {
		this.sinTable[i] = Math.sin(i * TWO_PI / bufferSize);
		this.cosTable[i] = Math.cos(i * TWO_PI / bufferSize);
	  }
	}

	/**
	 * Performs a forward transform on the sample buffer.
	 * Converts a time domain signal to frequency domain spectra.
	 *
	 * @param {Array} buffer The sample buffer
	 *
	 * @returns The frequency spectrum array
	 */
	DFT.prototype.forward = function(buffer) {
	  var real = this.real,
		  imag = this.imag,
		  rval,
		  ival;

	  for (var k = 0; k < this.bufferSize/2; k++) {
		rval = 0.0;
		ival = 0.0;

		for (var n = 0; n < buffer.length; n++) {
		  rval += this.cosTable[k*n] * buffer[n];
		  ival += this.sinTable[k*n] * buffer[n];
		}

		real[k] = rval;
		imag[k] = ival;
	  }

	  return this.calculateSpectrum();
	};


	/**
	 * FFT is a class for calculating the Discrete Fourier Transform of a signal
	 * with the Fast Fourier Transform algorithm.
	 *
	 * @param {Number} bufferSize The size of the sample buffer to be computed. Must be power of 2
	 * @param {Number} sampleRate The sampleRate of the buffer (eg. 44100)
	 *
	 * @constructor
	 */
	function FFT(bufferSize, sampleRate) {
	  FourierTransform.call(this, bufferSize, sampleRate);

	  this.reverseTable = new Uint32Array(bufferSize);

	  var limit = 1;
	  var bit = bufferSize >> 1;

	  var i;

	  while (limit < bufferSize) {
		for (i = 0; i < limit; i++) {
		  this.reverseTable[i + limit] = this.reverseTable[i] + bit;
		}

		limit = limit << 1;
		bit = bit >> 1;
	  }

	  this.sinTable = new Float32Array(bufferSize);
	  this.cosTable = new Float32Array(bufferSize);

	  for (i = 0; i < bufferSize; i++) {
		this.sinTable[i] = Math.sin(-Math.PI/i);
		this.cosTable[i] = Math.cos(-Math.PI/i);
	  }
	}

	/**
	 * Performs a forward transform on the sample buffer.
	 * Converts a time domain signal to frequency domain spectra.
	 *
	 * @param {Array} buffer The sample buffer. Buffer Length must be power of 2
	 *
	 * @returns The frequency spectrum array
	 */
	FFT.prototype.forward = function(buffer) {
	  // Locally scope variables for speed up
	  var bufferSize      = this.bufferSize,
		  cosTable        = this.cosTable,
		  sinTable        = this.sinTable,
		  reverseTable    = this.reverseTable,
		  real            = this.real,
		  imag            = this.imag,
		  spectrum        = this.spectrum;

	  var k = Math.floor(Math.log(bufferSize) / Math.LN2);

	  if (Math.pow(2, k) !== bufferSize) { throw "Invalid buffer size, must be a power of 2."; }
	  if (bufferSize !== buffer.length)  { throw "Supplied buffer is not the same size as defined FFT. FFT Size: " + bufferSize + " Buffer Size: " + buffer.length; }

	  var halfSize = 1,
		  phaseShiftStepReal,
		  phaseShiftStepImag,
		  currentPhaseShiftReal,
		  currentPhaseShiftImag,
		  off,
		  tr,
		  ti,
		  tmpReal,
		  i;

	  for (i = 0; i < bufferSize; i++) {
		real[i] = buffer[reverseTable[i]];
		imag[i] = 0;
	  }

	  while (halfSize < bufferSize) {
		//phaseShiftStepReal = Math.cos(-Math.PI/halfSize);
		//phaseShiftStepImag = Math.sin(-Math.PI/halfSize);
		phaseShiftStepReal = cosTable[halfSize];
		phaseShiftStepImag = sinTable[halfSize];

		currentPhaseShiftReal = 1;
		currentPhaseShiftImag = 0;

		for (var fftStep = 0; fftStep < halfSize; fftStep++) {
		  i = fftStep;

		  while (i < bufferSize) {
			off = i + halfSize;
			tr = (currentPhaseShiftReal * real[off]) - (currentPhaseShiftImag * imag[off]);
			ti = (currentPhaseShiftReal * imag[off]) + (currentPhaseShiftImag * real[off]);

			real[off] = real[i] - tr;
			imag[off] = imag[i] - ti;
			real[i] += tr;
			imag[i] += ti;

			i += halfSize << 1;
		  }

		  tmpReal = currentPhaseShiftReal;
		  currentPhaseShiftReal = (tmpReal * phaseShiftStepReal) - (currentPhaseShiftImag * phaseShiftStepImag);
		  currentPhaseShiftImag = (tmpReal * phaseShiftStepImag) + (currentPhaseShiftImag * phaseShiftStepReal);
		}

		halfSize = halfSize << 1;
	  }

	  return this.calculateSpectrum();
	};

	FFT.prototype.inverse = function(real, imag) {
	  // Locally scope variables for speed up
	  var bufferSize      = this.bufferSize,
		  cosTable        = this.cosTable,
		  sinTable        = this.sinTable,
		  reverseTable    = this.reverseTable,
		  spectrum        = this.spectrum;

		  real = real || this.real;
		  imag = imag || this.imag;

	  var halfSize = 1,
		  phaseShiftStepReal,
		  phaseShiftStepImag,
		  currentPhaseShiftReal,
		  currentPhaseShiftImag,
		  off,
		  tr,
		  ti,
		  tmpReal,
		  i;

	  for (i = 0; i < bufferSize; i++) {
		imag[i] *= -1;
	  }

	  var revReal = new Float32Array(bufferSize);
	  var revImag = new Float32Array(bufferSize);

	  for (i = 0; i < real.length; i++) {
		revReal[i] = real[reverseTable[i]];
		revImag[i] = imag[reverseTable[i]];
	  }

	  real = revReal;
	  imag = revImag;

	  while (halfSize < bufferSize) {
		phaseShiftStepReal = cosTable[halfSize];
		phaseShiftStepImag = sinTable[halfSize];
		currentPhaseShiftReal = 1;
		currentPhaseShiftImag = 0;

		for (var fftStep = 0; fftStep < halfSize; fftStep++) {
		  i = fftStep;

		  while (i < bufferSize) {
			off = i + halfSize;
			tr = (currentPhaseShiftReal * real[off]) - (currentPhaseShiftImag * imag[off]);
			ti = (currentPhaseShiftReal * imag[off]) + (currentPhaseShiftImag * real[off]);

			real[off] = real[i] - tr;
			imag[off] = imag[i] - ti;
			real[i] += tr;
			imag[i] += ti;

			i += halfSize << 1;
		  }

		  tmpReal = currentPhaseShiftReal;
		  currentPhaseShiftReal = (tmpReal * phaseShiftStepReal) - (currentPhaseShiftImag * phaseShiftStepImag);
		  currentPhaseShiftImag = (tmpReal * phaseShiftStepImag) + (currentPhaseShiftImag * phaseShiftStepReal);
		}

		halfSize = halfSize << 1;
	  }

	  var buffer = new Float32Array(bufferSize); // this should be reused instead
	  for (i = 0; i < bufferSize; i++) {
		buffer[i] = real[i] / bufferSize;
	  }

	  return buffer;
	};

	/**
	 * RFFT is a class for calculating the Discrete Fourier Transform of a signal
	 * with the Fast Fourier Transform algorithm.
	 *
	 * This method currently only contains a forward transform but is highly optimized.
	 *
	 * @param {Number} bufferSize The size of the sample buffer to be computed. Must be power of 2
	 * @param {Number} sampleRate The sampleRate of the buffer (eg. 44100)
	 *
	 * @constructor
	 */

	// lookup tables don't really gain us any speed, but they do increase
	// cache footprint, so don't use them in here

	// also we don't use sepearate arrays for real/imaginary parts

	// this one a little more than twice as fast as the one in FFT
	// however I only did the forward transform

	// the rest of this was translated from C, see http://www.jjj.de/fxt/
	// this is the real split radix FFT

	function RFFT(bufferSize, sampleRate) {
	  FourierTransform.call(this, bufferSize, sampleRate);

	  this.trans = new Float32Array(bufferSize);

	  this.reverseTable = new Uint32Array(bufferSize);

	  // don't use a lookup table to do the permute, use this instead
	  this.reverseBinPermute = function (dest, source) {
		var bufferSize  = this.bufferSize,
			halfSize    = bufferSize >>> 1,
			nm1         = bufferSize - 1,
			i = 1, r = 0, h;

		dest[0] = source[0];

		do {
		  r += halfSize;
		  dest[i] = source[r];
		  dest[r] = source[i];

		  i++;

		  h = halfSize << 1;
		  while (h = h >> 1, !((r ^= h) & h));

		  if (r >= i) {
			dest[i]     = source[r];
			dest[r]     = source[i];

			dest[nm1-i] = source[nm1-r];
			dest[nm1-r] = source[nm1-i];
		  }
		  i++;
		} while (i < halfSize);
		dest[nm1] = source[nm1];
	  };

	  this.generateReverseTable = function () {
		var bufferSize  = this.bufferSize,
			halfSize    = bufferSize >>> 1,
			nm1         = bufferSize - 1,
			i = 1, r = 0, h;

		this.reverseTable[0] = 0;

		do {
		  r += halfSize;

		  this.reverseTable[i] = r;
		  this.reverseTable[r] = i;

		  i++;

		  h = halfSize << 1;
		  while (h = h >> 1, !((r ^= h) & h));

		  if (r >= i) {
			this.reverseTable[i] = r;
			this.reverseTable[r] = i;

			this.reverseTable[nm1-i] = nm1-r;
			this.reverseTable[nm1-r] = nm1-i;
		  }
		  i++;
		} while (i < halfSize);

		this.reverseTable[nm1] = nm1;
	  };

	  this.generateReverseTable();
	}


	// Ordering of output:
	//
	// trans[0]     = re[0] (==zero frequency, purely real)
	// trans[1]     = re[1]
	//             ...
	// trans[n/2-1] = re[n/2-1]
	// trans[n/2]   = re[n/2]    (==nyquist frequency, purely real)
	//
	// trans[n/2+1] = im[n/2-1]
	// trans[n/2+2] = im[n/2-2]
	//             ...
	// trans[n-1]   = im[1]

	RFFT.prototype.forward = function(buffer) {
	  var n         = this.bufferSize,
		  spectrum  = this.spectrum,
		  x         = this.trans,
		  TWO_PI    = 2*Math.PI,
		  sqrt      = Math.sqrt,
		  i         = n >>> 1,
		  bSi       = 2 / n,
		  n2, n4, n8, nn,
		  t1, t2, t3, t4,
		  i1, i2, i3, i4, i5, i6, i7, i8,
		  st1, cc1, ss1, cc3, ss3,
		  e,
		  a,
		  rval, ival, mag;

	  this.reverseBinPermute(x, buffer);

	  /*
	  var reverseTable = this.reverseTable;

	  for (var k = 0, len = reverseTable.length; k < len; k++) {
		x[k] = buffer[reverseTable[k]];
	  }
	  */

	  for (var ix = 0, id = 4; ix < n; id *= 4) {
		for (var i0 = ix; i0 < n; i0 += id) {
		  //sumdiff(x[i0], x[i0+1]); // {a, b}  <--| {a+b, a-b}
		  st1 = x[i0] - x[i0+1];
		  x[i0] += x[i0+1];
		  x[i0+1] = st1;
		}
		ix = 2*(id-1);
	  }

	  n2 = 2;
	  nn = n >>> 1;

	  while((nn = nn >>> 1)) {
		ix = 0;
		n2 = n2 << 1;
		id = n2 << 1;
		n4 = n2 >>> 2;
		n8 = n2 >>> 3;
		do {
		  if(n4 !== 1) {
			for(i0 = ix; i0 < n; i0 += id) {
			  i1 = i0;
			  i2 = i1 + n4;
			  i3 = i2 + n4;
			  i4 = i3 + n4;

			  //diffsum3_r(x[i3], x[i4], t1); // {a, b, s} <--| {a, b-a, a+b}
			  t1 = x[i3] + x[i4];
			  x[i4] -= x[i3];
			  //sumdiff3(x[i1], t1, x[i3]);   // {a, b, d} <--| {a+b, b, a-b}
			  x[i3] = x[i1] - t1;
			  x[i1] += t1;

			  i1 += n8;
			  i2 += n8;
			  i3 += n8;
			  i4 += n8;

			  //sumdiff(x[i3], x[i4], t1, t2); // {s, d}  <--| {a+b, a-b}
			  t1 = x[i3] + x[i4];
			  t2 = x[i3] - x[i4];

			  t1 = -t1 * Math.SQRT1_2;
			  t2 *= Math.SQRT1_2;

			  // sumdiff(t1, x[i2], x[i4], x[i3]); // {s, d}  <--| {a+b, a-b}
			  st1 = x[i2];
			  x[i4] = t1 + st1;
			  x[i3] = t1 - st1;

			  //sumdiff3(x[i1], t2, x[i2]); // {a, b, d} <--| {a+b, b, a-b}
			  x[i2] = x[i1] - t2;
			  x[i1] += t2;
			}
		  } else {
			for(i0 = ix; i0 < n; i0 += id) {
			  i1 = i0;
			  i2 = i1 + n4;
			  i3 = i2 + n4;
			  i4 = i3 + n4;

			  //diffsum3_r(x[i3], x[i4], t1); // {a, b, s} <--| {a, b-a, a+b}
			  t1 = x[i3] + x[i4];
			  x[i4] -= x[i3];

			  //sumdiff3(x[i1], t1, x[i3]);   // {a, b, d} <--| {a+b, b, a-b}
			  x[i3] = x[i1] - t1;
			  x[i1] += t1;
			}
		  }

		  ix = (id << 1) - n2;
		  id = id << 2;
		} while (ix < n);

		e = TWO_PI / n2;

		for (var j = 1; j < n8; j++) {
		  a = j * e;
		  ss1 = Math.sin(a);
		  cc1 = Math.cos(a);

		  //ss3 = sin(3*a); cc3 = cos(3*a);
		  cc3 = 4*cc1*(cc1*cc1-0.75);
		  ss3 = 4*ss1*(0.75-ss1*ss1);

		  ix = 0; id = n2 << 1;
		  do {
			for (i0 = ix; i0 < n; i0 += id) {
			  i1 = i0 + j;
			  i2 = i1 + n4;
			  i3 = i2 + n4;
			  i4 = i3 + n4;

			  i5 = i0 + n4 - j;
			  i6 = i5 + n4;
			  i7 = i6 + n4;
			  i8 = i7 + n4;

			  //cmult(c, s, x, y, &u, &v)
			  //cmult(cc1, ss1, x[i7], x[i3], t2, t1); // {u,v} <--| {x*c-y*s, x*s+y*c}
			  t2 = x[i7]*cc1 - x[i3]*ss1;
			  t1 = x[i7]*ss1 + x[i3]*cc1;

			  //cmult(cc3, ss3, x[i8], x[i4], t4, t3);
			  t4 = x[i8]*cc3 - x[i4]*ss3;
			  t3 = x[i8]*ss3 + x[i4]*cc3;

			  //sumdiff(t2, t4);   // {a, b} <--| {a+b, a-b}
			  st1 = t2 - t4;
			  t2 += t4;
			  t4 = st1;

			  //sumdiff(t2, x[i6], x[i8], x[i3]); // {s, d}  <--| {a+b, a-b}
			  //st1 = x[i6]; x[i8] = t2 + st1; x[i3] = t2 - st1;
			  x[i8] = t2 + x[i6];
			  x[i3] = t2 - x[i6];

			  //sumdiff_r(t1, t3); // {a, b} <--| {a+b, b-a}
			  st1 = t3 - t1;
			  t1 += t3;
			  t3 = st1;

			  //sumdiff(t3, x[i2], x[i4], x[i7]); // {s, d}  <--| {a+b, a-b}
			  //st1 = x[i2]; x[i4] = t3 + st1; x[i7] = t3 - st1;
			  x[i4] = t3 + x[i2];
			  x[i7] = t3 - x[i2];

			  //sumdiff3(x[i1], t1, x[i6]);   // {a, b, d} <--| {a+b, b, a-b}
			  x[i6] = x[i1] - t1;
			  x[i1] += t1;

			  //diffsum3_r(t4, x[i5], x[i2]); // {a, b, s} <--| {a, b-a, a+b}
			  x[i2] = t4 + x[i5];
			  x[i5] -= t4;
			}

			ix = (id << 1) - n2;
			id = id << 2;

		  } while (ix < n);
		}
	  }

	  while (--i) {
		rval = x[i];
		ival = x[n-i-1];
		mag = bSi * sqrt(rval * rval + ival * ival);

		if (mag > this.peak) {
		  this.peakBand = i;
		  this.peak = mag;
		}

		spectrum[i] = mag;
	  }

	  spectrum[0] = bSi * x[0];

	  return spectrum;
	};

	function Sampler(file, bufferSize, sampleRate, playStart, playEnd, loopStart, loopEnd, loopMode) {
	  this.file = file;
	  this.bufferSize = bufferSize;
	  this.sampleRate = sampleRate;
	  this.playStart  = playStart || 0; // 0%
	  this.playEnd    = playEnd   || 1; // 100%
	  this.loopStart  = loopStart || 0;
	  this.loopEnd    = loopEnd   || 1;
	  this.loopMode   = loopMode  || DSP.OFF;
	  this.loaded     = false;
	  this.samples    = [];
	  this.signal     = new Float32Array(bufferSize);
	  this.frameCount = 0;
	  this.envelope   = null;
	  this.amplitude  = 1;
	  this.rootFrequency = 110; // A2 110
	  this.frequency  = 550;
	  this.step       = this.frequency / this.rootFrequency;
	  this.duration   = 0;
	  this.samplesProcessed = 0;
	  this.playhead   = 0;

	  var audio = /* new Audio();*/ document.createElement("AUDIO");
	  var self = this;

	  this.loadSamples = function(event) {
		var buffer = DSP.getChannel(DSP.MIX, event.frameBuffer);
		for ( var i = 0; i < buffer.length; i++) {
		  self.samples.push(buffer[i]);
		}
	  };

	  this.loadComplete = function() {
		// convert flexible js array into a fast typed array
		self.samples = new Float32Array(self.samples);
		self.loaded = true;
	  };

	  this.loadMetaData = function() {
		self.duration = audio.duration;
	  };

	  audio.addEventListener("MozAudioAvailable", this.loadSamples, false);
	  audio.addEventListener("loadedmetadata", this.loadMetaData, false);
	  audio.addEventListener("ended", this.loadComplete, false);
	  audio.muted = true;
	  audio.src = file;
	  audio.play();
	}

	Sampler.prototype.applyEnvelope = function() {
	  this.envelope.process(this.signal);
	  return this.signal;
	};

	Sampler.prototype.generate = function() {
	  var frameOffset = this.frameCount * this.bufferSize;

	  var loopWidth = this.playEnd * this.samples.length - this.playStart * this.samples.length;
	  var playStartSamples = this.playStart * this.samples.length; // ie 0.5 -> 50% of the length
	  var playEndSamples = this.playEnd * this.samples.length; // ie 0.5 -> 50% of the length
	  var offset;

	  for ( var i = 0; i < this.bufferSize; i++ ) {
		switch (this.loopMode) {
		  case DSP.OFF:
			this.playhead = Math.round(this.samplesProcessed * this.step + playStartSamples);
			if (this.playhead < (this.playEnd * this.samples.length) ) {
			  this.signal[i] = this.samples[this.playhead] * this.amplitude;
			} else {
			  this.signal[i] = 0;
			}
			break;

		  case DSP.FW:
			this.playhead = Math.round((this.samplesProcessed * this.step) % loopWidth + playStartSamples);
			if (this.playhead < (this.playEnd * this.samples.length) ) {
			  this.signal[i] = this.samples[this.playhead] * this.amplitude;
			}
			break;

		  case DSP.BW:
			this.playhead = playEndSamples - Math.round((this.samplesProcessed * this.step) % loopWidth);
			if (this.playhead < (this.playEnd * this.samples.length) ) {
			  this.signal[i] = this.samples[this.playhead] * this.amplitude;
			}
			break;

		  case DSP.FWBW:
			if ( Math.floor(this.samplesProcessed * this.step / loopWidth) % 2 === 0 ) {
			  this.playhead = Math.round((this.samplesProcessed * this.step) % loopWidth + playStartSamples);
			} else {
			  this.playhead = playEndSamples - Math.round((this.samplesProcessed * this.step) % loopWidth);
			}
			if (this.playhead < (this.playEnd * this.samples.length) ) {
			  this.signal[i] = this.samples[this.playhead] * this.amplitude;
			}
			break;
		}
		this.samplesProcessed++;
	  }

	  this.frameCount++;

	  return this.signal;
	};

	Sampler.prototype.setFreq = function(frequency) {
		var totalProcessed = this.samplesProcessed * this.step;
		this.frequency = frequency;
		this.step = this.frequency / this.rootFrequency;
		this.samplesProcessed = Math.round(totalProcessed/this.step);
	};

	Sampler.prototype.reset = function() {
	  this.samplesProcessed = 0;
	  this.playhead = 0;
	};

	/**
	 * Oscillator class for generating and modifying signals
	 *
	 * @param {Number} type       A waveform constant (eg. DSP.SINE)
	 * @param {Number} frequency  Initial frequency of the signal
	 * @param {Number} amplitude  Initial amplitude of the signal
	 * @param {Number} bufferSize Size of the sample buffer to generate
	 * @param {Number} sampleRate The sample rate of the signal
	 *
	 * @contructor
	 */
	function Oscillator(type, frequency, amplitude, bufferSize, sampleRate) {
	  this.frequency  = frequency;
	  this.amplitude  = amplitude;
	  this.bufferSize = bufferSize;
	  this.sampleRate = sampleRate;
	  //this.pulseWidth = pulseWidth;
	  this.frameCount = 0;

	  this.waveTableLength = 2048;

	  this.cyclesPerSample = frequency / sampleRate;

	  this.signal = new Float32Array(bufferSize);
	  this.envelope = null;

	  switch(parseInt(type, 10)) {
		case DSP.TRIANGLE:
		  this.func = Oscillator.Triangle;
		  break;

		case DSP.SAW:
		  this.func = Oscillator.Saw;
		  break;

		case DSP.SQUARE:
		  this.func = Oscillator.Square;
		  break;

		default:
		case DSP.SINE:
		  this.func = Oscillator.Sine;
		  break;
	  }

	  this.generateWaveTable = function() {
		Oscillator.waveTable[this.func] = new Float32Array(2048);
		var waveTableTime = this.waveTableLength / this.sampleRate;
		var waveTableHz = 1 / waveTableTime;

		for (var i = 0; i < this.waveTableLength; i++) {
		  Oscillator.waveTable[this.func][i] = this.func(i * waveTableHz/this.sampleRate);
		}
	  };

	  if ( typeof Oscillator.waveTable === 'undefined' ) {
		Oscillator.waveTable = {};
	  }

	  if ( typeof Oscillator.waveTable[this.func] === 'undefined' ) {
		this.generateWaveTable();
	  }

	  this.waveTable = Oscillator.waveTable[this.func];
	}

	/**
	 * Set the amplitude of the signal
	 *
	 * @param {Number} amplitude The amplitude of the signal (between 0 and 1)
	 */
	Oscillator.prototype.setAmp = function(amplitude) {
	  if (amplitude >= 0 && amplitude <= 1) {
		this.amplitude = amplitude;
	  } else {
		throw "Amplitude out of range (0..1).";
	  }
	};

	/**
	 * Set the frequency of the signal
	 *
	 * @param {Number} frequency The frequency of the signal
	 */
	Oscillator.prototype.setFreq = function(frequency) {
	  this.frequency = frequency;
	  this.cyclesPerSample = frequency / this.sampleRate;
	};

	// Add an oscillator
	Oscillator.prototype.add = function(oscillator) {
	  for ( var i = 0; i < this.bufferSize; i++ ) {
		//this.signal[i] += oscillator.valueAt(i);
		this.signal[i] += oscillator.signal[i];
	  }

	  return this.signal;
	};

	// Add a signal to the current generated osc signal
	Oscillator.prototype.addSignal = function(signal) {
	  for ( var i = 0; i < signal.length; i++ ) {
		if ( i >= this.bufferSize ) {
		  break;
		}
		this.signal[i] += signal[i];

		/*
		// Constrain amplitude
		if ( this.signal[i] > 1 ) {
		  this.signal[i] = 1;
		} else if ( this.signal[i] < -1 ) {
		  this.signal[i] = -1;
		}
		*/
	  }
	  return this.signal;
	};

	// Add an envelope to the oscillator
	Oscillator.prototype.addEnvelope = function(envelope) {
	  this.envelope = envelope;
	};

	Oscillator.prototype.applyEnvelope = function() {
	  this.envelope.process(this.signal);
	};

	Oscillator.prototype.valueAt = function(offset) {
	  return this.waveTable[offset % this.waveTableLength];
	};

	Oscillator.prototype.generate = function() {
	  var frameOffset = this.frameCount * this.bufferSize;
	  var step = this.waveTableLength * this.frequency / this.sampleRate;
	  var offset;

	  for ( var i = 0; i < this.bufferSize; i++ ) {
		//var step = (frameOffset + i) * this.cyclesPerSample % 1;
		//this.signal[i] = this.func(step) * this.amplitude;
		//this.signal[i] = this.valueAt(Math.round((frameOffset + i) * step)) * this.amplitude;
		offset = Math.round((frameOffset + i) * step);
		this.signal[i] = this.waveTable[offset % this.waveTableLength] * this.amplitude;
	  }

	  this.frameCount++;

	  return this.signal;
	};

	Oscillator.Sine = function(step) {
	  return Math.sin(DSP.TWO_PI * step);
	};

	Oscillator.Square = function(step) {
	  return step < 0.5 ? 1 : -1;
	};

	Oscillator.Saw = function(step) {
	  return 2 * (step - Math.round(step));
	};

	Oscillator.Triangle = function(step) {
	  return 1 - 4 * Math.abs(Math.round(step) - step);
	};

	Oscillator.Pulse = function(step) {
	  // stub
	};

	function ADSR(attackLength, decayLength, sustainLevel, sustainLength, releaseLength, sampleRate) {
	  this.sampleRate = sampleRate;
	  // Length in seconds
	  this.attackLength  = attackLength;
	  this.decayLength   = decayLength;
	  this.sustainLevel  = sustainLevel;
	  this.sustainLength = sustainLength;
	  this.releaseLength = releaseLength;
	  this.sampleRate    = sampleRate;

	  // Length in samples
	  this.attackSamples  = attackLength  * sampleRate;
	  this.decaySamples   = decayLength   * sampleRate;
	  this.sustainSamples = sustainLength * sampleRate;
	  this.releaseSamples = releaseLength * sampleRate;

	  // Updates the envelope sample positions
	  this.update = function() {
		this.attack         =                this.attackSamples;
		this.decay          = this.attack  + this.decaySamples;
		this.sustain        = this.decay   + this.sustainSamples;
		this.release        = this.sustain + this.releaseSamples;
	  };

	  this.update();

	  this.samplesProcessed = 0;
	}

	ADSR.prototype.noteOn = function() {
	  this.samplesProcessed = 0;
	  this.sustainSamples = this.sustainLength * this.sampleRate;
	  this.update();
	};

	// Send a note off when using a sustain of infinity to let the envelope enter the release phase
	ADSR.prototype.noteOff = function() {
	  this.sustainSamples = this.samplesProcessed - this.decaySamples;
	  this.update();
	};

	ADSR.prototype.processSample = function(sample) {
	  var amplitude = 0;

	  if ( this.samplesProcessed <= this.attack ) {
		amplitude = 0 + (1 - 0) * ((this.samplesProcessed - 0) / (this.attack - 0));
	  } else if ( this.samplesProcessed > this.attack && this.samplesProcessed <= this.decay ) {
		amplitude = 1 + (this.sustainLevel - 1) * ((this.samplesProcessed - this.attack) / (this.decay - this.attack));
	  } else if ( this.samplesProcessed > this.decay && this.samplesProcessed <= this.sustain ) {
		amplitude = this.sustainLevel;
	  } else if ( this.samplesProcessed > this.sustain && this.samplesProcessed <= this.release ) {
		amplitude = this.sustainLevel + (0 - this.sustainLevel) * ((this.samplesProcessed - this.sustain) / (this.release - this.sustain));
	  }

	  return sample * amplitude;
	};

	ADSR.prototype.value = function() {
	  var amplitude = 0;

	  if ( this.samplesProcessed <= this.attack ) {
		amplitude = 0 + (1 - 0) * ((this.samplesProcessed - 0) / (this.attack - 0));
	  } else if ( this.samplesProcessed > this.attack && this.samplesProcessed <= this.decay ) {
		amplitude = 1 + (this.sustainLevel - 1) * ((this.samplesProcessed - this.attack) / (this.decay - this.attack));
	  } else if ( this.samplesProcessed > this.decay && this.samplesProcessed <= this.sustain ) {
		amplitude = this.sustainLevel;
	  } else if ( this.samplesProcessed > this.sustain && this.samplesProcessed <= this.release ) {
		amplitude = this.sustainLevel + (0 - this.sustainLevel) * ((this.samplesProcessed - this.sustain) / (this.release - this.sustain));
	  }

	  return amplitude;
	};

	ADSR.prototype.process = function(buffer) {
	  for ( var i = 0; i < buffer.length; i++ ) {
		buffer[i] *= this.value();

		this.samplesProcessed++;
	  }

	  return buffer;
	};


	ADSR.prototype.isActive = function() {
	  if ( this.samplesProcessed > this.release || this.samplesProcessed === -1 ) {
		return false;
	  } else {
		return true;
	  }
	};

	ADSR.prototype.disable = function() {
	  this.samplesProcessed = -1;
	};

	function IIRFilter(type, cutoff, resonance, sampleRate) {
	  this.sampleRate = sampleRate;

	  switch(type) {
		case DSP.LOWPASS:
		case DSP.LP12:
		  this.func = new IIRFilter.LP12(cutoff, resonance, sampleRate);
		  break;
	  }
	}

	IIRFilter.prototype.__defineGetter__('cutoff',
	  function() {
		return this.func.cutoff;
	  }
	);

	IIRFilter.prototype.__defineGetter__('resonance',
	  function() {
		return this.func.resonance;
	  }
	);

	IIRFilter.prototype.set = function(cutoff, resonance) {
	  this.func.calcCoeff(cutoff, resonance);
	};

	IIRFilter.prototype.process = function(buffer) {
	  this.func.process(buffer);
	};

	// Add an envelope to the filter
	IIRFilter.prototype.addEnvelope = function(envelope) {
	  if ( envelope instanceof ADSR ) {
		this.func.addEnvelope(envelope);
	  } else {
		throw "Not an envelope.";
	  }
	};

	IIRFilter.LP12 = function(cutoff, resonance, sampleRate) {
	  this.sampleRate = sampleRate;
	  this.vibraPos   = 0;
	  this.vibraSpeed = 0;
	  this.envelope = false;

	  this.calcCoeff = function(cutoff, resonance) {
		this.w = 2.0 * Math.PI * cutoff / this.sampleRate;
		this.q = 1.0 - this.w / (2.0 * (resonance + 0.5 / (1.0 + this.w)) + this.w - 2.0);
		this.r = this.q * this.q;
		this.c = this.r + 1.0 - 2.0 * Math.cos(this.w) * this.q;

		this.cutoff = cutoff;
		this.resonance = resonance;
	  };

	  this.calcCoeff(cutoff, resonance);

	  this.process = function(buffer) {
		for ( var i = 0; i < buffer.length; i++ ) {
		  this.vibraSpeed += (buffer[i] - this.vibraPos) * this.c;
		  this.vibraPos   += this.vibraSpeed;
		  this.vibraSpeed *= this.r;

		  /*
		  var temp = this.vibraPos;

		  if ( temp > 1.0 ) {
			temp = 1.0;
		  } else if ( temp < -1.0 ) {
			temp = -1.0;
		  } else if ( temp != temp ) {
			temp = 1;
		  }

		  buffer[i] = temp;
		  */

		  if (this.envelope) {
			buffer[i] = (buffer[i] * (1 - this.envelope.value())) + (this.vibraPos * this.envelope.value());
			this.envelope.samplesProcessed++;
		  } else {
			buffer[i] = this.vibraPos;
		  }
		}
	  };
	};

	IIRFilter.LP12.prototype.addEnvelope = function(envelope) {
	  this.envelope = envelope;
	};

	function IIRFilter2(type, cutoff, resonance, sampleRate) {
	  this.type = type;
	  this.cutoff = cutoff;
	  this.resonance = resonance;
	  this.sampleRate = sampleRate;

	  this.f = Float32Array(4);
	  this.f[0] = 0.0; // lp
	  this.f[1] = 0.0; // hp
	  this.f[2] = 0.0; // bp
	  this.f[3] = 0.0; // br

	  this.calcCoeff = function(cutoff, resonance) {
		this.freq = 2 * Math.sin(Math.PI * Math.min(0.25, cutoff/(this.sampleRate*2)));
		this.damp = Math.min(2 * (1 - Math.pow(resonance, 0.25)), Math.min(2, 2/this.freq - this.freq * 0.5));
	  };

	  this.calcCoeff(cutoff, resonance);
	}

	IIRFilter2.prototype.process = function(buffer) {
	  var input, output;
	  var f = this.f;

	  for ( var i = 0; i < buffer.length; i++ ) {
		input = buffer[i];

		// first pass
		f[3] = input - this.damp * f[2];
		f[0] = f[0] + this.freq * f[2];
		f[1] = f[3] - f[0];
		f[2] = this.freq * f[1] + f[2];
		output = 0.5 * f[this.type];

		// second pass
		f[3] = input - this.damp * f[2];
		f[0] = f[0] + this.freq * f[2];
		f[1] = f[3] - f[0];
		f[2] = this.freq * f[1] + f[2];
		output += 0.5 * f[this.type];

		if (this.envelope) {
		  buffer[i] = (buffer[i] * (1 - this.envelope.value())) + (output * this.envelope.value());
		  this.envelope.samplesProcessed++;
		} else {
		  buffer[i] = output;
		}
	  }
	};

	IIRFilter2.prototype.addEnvelope = function(envelope) {
	  if ( envelope instanceof ADSR ) {
		this.envelope = envelope;
	  } else {
		throw "This is not an envelope.";
	  }
	};

	IIRFilter2.prototype.set = function(cutoff, resonance) {
	  this.calcCoeff(cutoff, resonance);
	};



	function WindowFunction(type, alpha) {
	  this.alpha = alpha;

	  switch(type) {
		case DSP.BARTLETT:
		  this.func = WindowFunction.Bartlett;
		  break;

		case DSP.BARTLETTHANN:
		  this.func = WindowFunction.BartlettHann;
		  break;

		case DSP.BLACKMAN:
		  this.func = WindowFunction.Blackman;
		  this.alpha = this.alpha || 0.16;
		  break;

		case DSP.COSINE:
		  this.func = WindowFunction.Cosine;
		  break;

		case DSP.GAUSS:
		  this.func = WindowFunction.Gauss;
		  this.alpha = this.alpha || 0.25;
		  break;

		case DSP.HAMMING:
		  this.func = WindowFunction.Hamming;
		  break;

		case DSP.HANN:
		  this.func = WindowFunction.Hann;
		  break;

		case DSP.LANCZOS:
		  this.func = WindowFunction.Lanczoz;
		  break;

		case DSP.RECTANGULAR:
		  this.func = WindowFunction.Rectangular;
		  break;

		case DSP.TRIANGULAR:
		  this.func = WindowFunction.Triangular;
		  break;
	  }
	}

	WindowFunction.prototype.process = function(buffer) {
	  var length = buffer.length;
	  for ( var i = 0; i < length; i++ ) {
		buffer[i] *= this.func(length, i, this.alpha);
	  }
	  return buffer;
	};

	WindowFunction.Bartlett = function(length, index) {
	  return 2 / (length - 1) * ((length - 1) / 2 - Math.abs(index - (length - 1) / 2));
	};

	WindowFunction.BartlettHann = function(length, index) {
	  return 0.62 - 0.48 * Math.abs(index / (length - 1) - 0.5) - 0.38 * Math.cos(DSP.TWO_PI * index / (length - 1));
	};

	WindowFunction.Blackman = function(length, index, alpha) {
	  var a0 = (1 - alpha) / 2;
	  var a1 = 0.5;
	  var a2 = alpha / 2;

	  return a0 - a1 * Math.cos(DSP.TWO_PI * index / (length - 1)) + a2 * Math.cos(4 * Math.PI * index / (length - 1));
	};

	WindowFunction.Cosine = function(length, index) {
	  return Math.cos(Math.PI * index / (length - 1) - Math.PI / 2);
	};

	WindowFunction.Gauss = function(length, index, alpha) {
	  return Math.pow(Math.E, -0.5 * Math.pow((index - (length - 1) / 2) / (alpha * (length - 1) / 2), 2));
	};

	WindowFunction.Hamming = function(length, index) {
	  return 0.54 - 0.46 * Math.cos(DSP.TWO_PI * index / (length - 1));
	};

	WindowFunction.Hann = function(length, index) {
	  return 0.5 * (1 - Math.cos(DSP.TWO_PI * index / (length - 1)));
	};

	WindowFunction.Lanczos = function(length, index) {
	  var x = 2 * index / (length - 1) - 1;
	  return Math.sin(Math.PI * x) / (Math.PI * x);
	};

	WindowFunction.Rectangular = function(length, index) {
	  return 1;
	};

	WindowFunction.Triangular = function(length, index) {
	  return 2 / length * (length / 2 - Math.abs(index - (length - 1) / 2));
	};

	function sinh (arg) {
	  // Returns the hyperbolic sine of the number, defined as (exp(number) - exp(-number))/2
	  //
	  // version: 1004.2314
	  // discuss at: http://phpjs.org/functions/sinh    // +   original by: Onno Marsman
	  // *     example 1: sinh(-0.9834330348825909);
	  // *     returns 1: -1.1497971402636502
	  return (Math.exp(arg) - Math.exp(-arg))/2;
	}

	/*
	 *  Biquad filter
	 *
	 *  Created by Ricard Marxer <email@ricardmarxer.com> on 2010-05-23.
	 *  Copyright 2010 Ricard Marxer. All rights reserved.
	 *
	 */
	// Implementation based on:
	// http://www.musicdsp.org/files/Audio-EQ-Cookbook.txt
	function Biquad(type, sampleRate) {
	  this.Fs = sampleRate;
	  this.type = type;  // type of the filter
	  this.parameterType = DSP.Q; // type of the parameter

	  this.x_1_l = 0;
	  this.x_2_l = 0;
	  this.y_1_l = 0;
	  this.y_2_l = 0;

	  this.x_1_r = 0;
	  this.x_2_r = 0;
	  this.y_1_r = 0;
	  this.y_2_r = 0;

	  this.b0 = 1;
	  this.a0 = 1;

	  this.b1 = 0;
	  this.a1 = 0;

	  this.b2 = 0;
	  this.a2 = 0;

	  this.b0a0 = this.b0 / this.a0;
	  this.b1a0 = this.b1 / this.a0;
	  this.b2a0 = this.b2 / this.a0;
	  this.a1a0 = this.a1 / this.a0;
	  this.a2a0 = this.a2 / this.a0;

	  this.f0 = 3000;   // "wherever it's happenin', man."  Center Frequency or
						// Corner Frequency, or shelf midpoint frequency, depending
						// on which filter type.  The "significant frequency".

	  this.dBgain = 12; // used only for peaking and shelving filters

	  this.Q = 1;       // the EE kind of definition, except for peakingEQ in which A*Q is
						// the classic EE Q.  That adjustment in definition was made so that
						// a boost of N dB followed by a cut of N dB for identical Q and
						// f0/Fs results in a precisely flat unity gain filter or "wire".

	  this.BW = -3;     // the bandwidth in octaves (between -3 dB frequencies for BPF
						// and notch or between midpoint (dBgain/2) gain frequencies for
						// peaking EQ

	  this.S = 1;       // a "shelf slope" parameter (for shelving EQ only).  When S = 1,
						// the shelf slope is as steep as it can be and remain monotonically
						// increasing or decreasing gain with frequency.  The shelf slope, in
						// dB/octave, remains proportional to S for all other values for a
						// fixed f0/Fs and dBgain.

	  this.coefficients = function() {
		var b = [this.b0, this.b1, this.b2];
		var a = [this.a0, this.a1, this.a2];
		return {b: b, a:a};
	  };

	  this.setFilterType = function(type) {
		this.type = type;
		this.recalculateCoefficients();
	  };

	  this.setSampleRate = function(rate) {
		this.Fs = rate;
		this.recalculateCoefficients();
	  };

	  this.setQ = function(q) {
		this.parameterType = DSP.Q;
		this.Q = Math.max(Math.min(q, 115.0), 0.001);
		this.recalculateCoefficients();
	  };

	  this.setBW = function(bw) {
		this.parameterType = DSP.BW;
		this.BW = bw;
		this.recalculateCoefficients();
	  };

	  this.setS = function(s) {
		this.parameterType = DSP.S;
		this.S = Math.max(Math.min(s, 5.0), 0.0001);
		this.recalculateCoefficients();
	  };

	  this.setF0 = function(freq) {
		this.f0 = freq;
		this.recalculateCoefficients();
	  };

	  this.setDbGain = function(g) {
		this.dBgain = g;
		this.recalculateCoefficients();
	  };

	  this.recalculateCoefficients = function() {
		var A;
		if (type === DSP.PEAKING_EQ || type === DSP.LOW_SHELF || type === DSP.HIGH_SHELF ) {
		  A = Math.pow(10, (this.dBgain/40));  // for peaking and shelving EQ filters only
		} else {
		  A  = Math.sqrt( Math.pow(10, (this.dBgain/20)) );
		}

		var w0 = DSP.TWO_PI * this.f0 / this.Fs;

		var cosw0 = Math.cos(w0);
		var sinw0 = Math.sin(w0);

		var alpha = 0;

		switch (this.parameterType) {
		  case DSP.Q:
			alpha = sinw0/(2*this.Q);
			break;

		  case DSP.BW:
			alpha = sinw0 * sinh( Math.LN2/2 * this.BW * w0/sinw0 );
			break;

		  case DSP.S:
			alpha = sinw0/2 * Math.sqrt( (A + 1/A)*(1/this.S - 1) + 2 );
			break;
		}

		/**
			FYI: The relationship between bandwidth and Q is
				 1/Q = 2*sinh(ln(2)/2*BW*w0/sin(w0))     (digital filter w BLT)
			or   1/Q = 2*sinh(ln(2)/2*BW)             (analog filter prototype)

			The relationship between shelf slope and Q is
				 1/Q = sqrt((A + 1/A)*(1/S - 1) + 2)
		*/

		var coeff;

		switch (this.type) {
		  case DSP.LPF:       // H(s) = 1 / (s^2 + s/Q + 1)
			this.b0 =  (1 - cosw0)/2;
			this.b1 =   1 - cosw0;
			this.b2 =  (1 - cosw0)/2;
			this.a0 =   1 + alpha;
			this.a1 =  -2 * cosw0;
			this.a2 =   1 - alpha;
			break;

		  case DSP.HPF:       // H(s) = s^2 / (s^2 + s/Q + 1)
			this.b0 =  (1 + cosw0)/2;
			this.b1 = -(1 + cosw0);
			this.b2 =  (1 + cosw0)/2;
			this.a0 =   1 + alpha;
			this.a1 =  -2 * cosw0;
			this.a2 =   1 - alpha;
			break;

		  case DSP.BPF_CONSTANT_SKIRT:       // H(s) = s / (s^2 + s/Q + 1)  (constant skirt gain, peak gain = Q)
			this.b0 =   sinw0/2;
			this.b1 =   0;
			this.b2 =  -sinw0/2;
			this.a0 =   1 + alpha;
			this.a1 =  -2*cosw0;
			this.a2 =   1 - alpha;
			break;

		  case DSP.BPF_CONSTANT_PEAK:       // H(s) = (s/Q) / (s^2 + s/Q + 1)      (constant 0 dB peak gain)
			this.b0 =   alpha;
			this.b1 =   0;
			this.b2 =  -alpha;
			this.a0 =   1 + alpha;
			this.a1 =  -2*cosw0;
			this.a2 =   1 - alpha;
			break;

		  case DSP.NOTCH:     // H(s) = (s^2 + 1) / (s^2 + s/Q + 1)
			this.b0 =   1;
			this.b1 =  -2*cosw0;
			this.b2 =   1;
			this.a0 =   1 + alpha;
			this.a1 =  -2*cosw0;
			this.a2 =   1 - alpha;
			break;

		  case DSP.APF:       // H(s) = (s^2 - s/Q + 1) / (s^2 + s/Q + 1)
			this.b0 =   1 - alpha;
			this.b1 =  -2*cosw0;
			this.b2 =   1 + alpha;
			this.a0 =   1 + alpha;
			this.a1 =  -2*cosw0;
			this.a2 =   1 - alpha;
			break;

		  case DSP.PEAKING_EQ:  // H(s) = (s^2 + s*(A/Q) + 1) / (s^2 + s/(A*Q) + 1)
			this.b0 =   1 + alpha*A;
			this.b1 =  -2*cosw0;
			this.b2 =   1 - alpha*A;
			this.a0 =   1 + alpha/A;
			this.a1 =  -2*cosw0;
			this.a2 =   1 - alpha/A;
			break;

		  case DSP.LOW_SHELF:   // H(s) = A * (s^2 + (sqrt(A)/Q)*s + A)/(A*s^2 + (sqrt(A)/Q)*s + 1)
			coeff = sinw0 * Math.sqrt( (A^2 + 1)*(1/this.S - 1) + 2*A );
			this.b0 =    A*((A+1) - (A-1)*cosw0 + coeff);
			this.b1 =  2*A*((A-1) - (A+1)*cosw0);
			this.b2 =    A*((A+1) - (A-1)*cosw0 - coeff);
			this.a0 =       (A+1) + (A-1)*cosw0 + coeff;
			this.a1 =   -2*((A-1) + (A+1)*cosw0);
			this.a2 =       (A+1) + (A-1)*cosw0 - coeff;
			break;

		  case DSP.HIGH_SHELF:   // H(s) = A * (A*s^2 + (sqrt(A)/Q)*s + 1)/(s^2 + (sqrt(A)/Q)*s + A)
			coeff = sinw0 * Math.sqrt( (A^2 + 1)*(1/this.S - 1) + 2*A );
			this.b0 =    A*((A+1) + (A-1)*cosw0 + coeff);
			this.b1 = -2*A*((A-1) + (A+1)*cosw0);
			this.b2 =    A*((A+1) + (A-1)*cosw0 - coeff);
			this.a0 =       (A+1) - (A-1)*cosw0 + coeff;
			this.a1 =    2*((A-1) - (A+1)*cosw0);
			this.a2 =       (A+1) - (A-1)*cosw0 - coeff;
			break;
		}

		this.b0a0 = this.b0/this.a0;
		this.b1a0 = this.b1/this.a0;
		this.b2a0 = this.b2/this.a0;
		this.a1a0 = this.a1/this.a0;
		this.a2a0 = this.a2/this.a0;
	  };

	  this.process = function(buffer) {
		  //y[n] = (b0/a0)*x[n] + (b1/a0)*x[n-1] + (b2/a0)*x[n-2]
		  //       - (a1/a0)*y[n-1] - (a2/a0)*y[n-2]

		  var len = buffer.length;
		  var output = new Float32Array(len);

		  for ( var i=0; i<buffer.length; i++ ) {
			output[i] = this.b0a0*buffer[i] + this.b1a0*this.x_1_l + this.b2a0*this.x_2_l - this.a1a0*this.y_1_l - this.a2a0*this.y_2_l;
			this.y_2_l = this.y_1_l;
			this.y_1_l = output[i];
			this.x_2_l = this.x_1_l;
			this.x_1_l = buffer[i];
		  }

		  return output;
	  };

	  this.processStereo = function(buffer) {
		  //y[n] = (b0/a0)*x[n] + (b1/a0)*x[n-1] + (b2/a0)*x[n-2]
		  //       - (a1/a0)*y[n-1] - (a2/a0)*y[n-2]

		  var len = buffer.length;
		  var output = new Float32Array(len);

		  for (var i = 0; i < len/2; i++) {
			output[2*i] = this.b0a0*buffer[2*i] + this.b1a0*this.x_1_l + this.b2a0*this.x_2_l - this.a1a0*this.y_1_l - this.a2a0*this.y_2_l;
			this.y_2_l = this.y_1_l;
			this.y_1_l = output[2*i];
			this.x_2_l = this.x_1_l;
			this.x_1_l = buffer[2*i];

			output[2*i+1] = this.b0a0*buffer[2*i+1] + this.b1a0*this.x_1_r + this.b2a0*this.x_2_r - this.a1a0*this.y_1_r - this.a2a0*this.y_2_r;
			this.y_2_r = this.y_1_r;
			this.y_1_r = output[2*i+1];
			this.x_2_r = this.x_1_r;
			this.x_1_r = buffer[2*i+1];
		  }

		  return output;
	  };
	}

	/*
	 *  Magnitude to decibels
	 *
	 *  Created by Ricard Marxer <email@ricardmarxer.com> on 2010-05-23.
	 *  Copyright 2010 Ricard Marxer. All rights reserved.
	 *
	 *  @buffer array of magnitudes to convert to decibels
	 *
	 *  @returns the array in decibels
	 *
	 */
	DSP.mag2db = function(buffer) {
	  var minDb = -120;
	  var minMag = Math.pow(10.0, minDb / 20.0);

	  var log = Math.log;
	  var max = Math.max;

	  var result = Float32Array(buffer.length);
	  for (var i=0; i<buffer.length; i++) {
		result[i] = 20.0*log(max(buffer[i], minMag));
	  }

	  return result;
	};

	/*
	 *  Frequency response
	 *
	 *  Created by Ricard Marxer <email@ricardmarxer.com> on 2010-05-23.
	 *  Copyright 2010 Ricard Marxer. All rights reserved.
	 *
	 *  Calculates the frequency response at the given points.
	 *
	 *  @b b coefficients of the filter
	 *  @a a coefficients of the filter
	 *  @w w points (normally between -PI and PI) where to calculate the frequency response
	 *
	 *  @returns the frequency response in magnitude
	 *
	 */
	DSP.freqz = function(b, a, w) {
	  var i, j;

	  if (!w) {
		w = Float32Array(200);
		for (i=0;i<w.length; i++) {
		  w[i] = DSP.TWO_PI/w.length * i - Math.PI;
		}
	  }

	  var result = Float32Array(w.length);

	  var sqrt = Math.sqrt;
	  var cos = Math.cos;
	  var sin = Math.sin;

	  for (i=0; i<w.length; i++) {
		var numerator = {real:0.0, imag:0.0};
		for (j=0; j<b.length; j++) {
		  numerator.real += b[j] * cos(-j*w[i]);
		  numerator.imag += b[j] * sin(-j*w[i]);
		}

		var denominator = {real:0.0, imag:0.0};
		for (j=0; j<a.length; j++) {
		  denominator.real += a[j] * cos(-j*w[i]);
		  denominator.imag += a[j] * sin(-j*w[i]);
		}

		result[i] =  sqrt(numerator.real*numerator.real + numerator.imag*numerator.imag) / sqrt(denominator.real*denominator.real + denominator.imag*denominator.imag);
	  }

	  return result;
	};

	/*
	 *  Graphical Equalizer
	 *
	 *  Implementation of a graphic equalizer with a configurable bands-per-octave
	 *  and minimum and maximum frequencies
	 *
	 *  Created by Ricard Marxer <email@ricardmarxer.com> on 2010-05-23.
	 *  Copyright 2010 Ricard Marxer. All rights reserved.
	 *
	 */
	function GraphicalEq(sampleRate) {
	  this.FS = sampleRate;
	  this.minFreq = 40.0;
	  this.maxFreq = 16000.0;

	  this.bandsPerOctave = 1.0;

	  this.filters = [];
	  this.freqzs = [];

	  this.calculateFreqzs = true;

	  this.recalculateFilters = function() {
		var bandCount = Math.round(Math.log(this.maxFreq/this.minFreq) * this.bandsPerOctave/ Math.LN2);

		this.filters = [];
		for (var i=0; i<bandCount; i++) {
		  var freq = this.minFreq*(Math.pow(2, i/this.bandsPerOctave));
		  var newFilter = new Biquad(DSP.PEAKING_EQ, this.FS);
		  newFilter.setDbGain(0);
		  newFilter.setBW(1/this.bandsPerOctave);
		  newFilter.setF0(freq);
		  this.filters[i] = newFilter;
		  this.recalculateFreqz(i);
		}
	  };

	  this.setMinimumFrequency = function(freq) {
		this.minFreq = freq;
		this.recalculateFilters();
	  };

	  this.setMaximumFrequency = function(freq) {
		this.maxFreq = freq;
		this.recalculateFilters();
	  };

	  this.setBandsPerOctave = function(bands) {
		this.bandsPerOctave = bands;
		this.recalculateFilters();
	  };

	  this.setBandGain = function(bandIndex, gain) {
		if (bandIndex < 0 || bandIndex > (this.filters.length-1)) {
		  throw "The band index of the graphical equalizer is out of bounds.";
		}

		if (!gain) {
		  throw "A gain must be passed.";
		}

		this.filters[bandIndex].setDbGain(gain);
		this.recalculateFreqz(bandIndex);
	  };

	  this.recalculateFreqz = function(bandIndex) {
		if (!this.calculateFreqzs) {
		  return;
		}

		if (bandIndex < 0 || bandIndex > (this.filters.length-1)) {
		  throw "The band index of the graphical equalizer is out of bounds. " + bandIndex + " is out of [" + 0 + ", " + this.filters.length-1 + "]";
		}

		if (!this.w) {
		  this.w = Float32Array(400);
		  for (var i=0; i<this.w.length; i++) {
			 this.w[i] = Math.PI/this.w.length * i;
		  }
		}

		var b = [this.filters[bandIndex].b0, this.filters[bandIndex].b1, this.filters[bandIndex].b2];
		var a = [this.filters[bandIndex].a0, this.filters[bandIndex].a1, this.filters[bandIndex].a2];

		this.freqzs[bandIndex] = DSP.mag2db(DSP.freqz(b, a, this.w));
	  };

	  this.process = function(buffer) {
		var output = buffer;

		for (var i = 0; i < this.filters.length; i++) {
		  output = this.filters[i].process(output);
		}

		return output;
	  };

	  this.processStereo = function(buffer) {
		var output = buffer;

		for (var i = 0; i < this.filters.length; i++) {
		  output = this.filters[i].processStereo(output);
		}

		return output;
	  };
	}

	/**
	 * MultiDelay effect by Almer Thie (http://code.almeros.com).
	 * Copyright 2010 Almer Thie. All rights reserved.
	 * Example: http://code.almeros.com/code-examples/delay-firefox-audio-api/
	 *
	 * This is a delay that feeds it's own delayed signal back into its circular
	 * buffer. Also known as a CombFilter.
	 *
	 * Compatible with interleaved stereo (or more channel) buffers and
	 * non-interleaved mono buffers.
	 *
	 * @param {Number} maxDelayInSamplesSize Maximum possible delay in samples (size of circular buffer)
	 * @param {Number} delayInSamples Initial delay in samples
	 * @param {Number} masterVolume Initial master volume. Float value: 0.0 (silence), 1.0 (normal), >1.0 (amplify)
	 * @param {Number} delayVolume Initial feedback delay volume. Float value: 0.0 (silence), 1.0 (normal), >1.0 (amplify)
	 *
	 * @constructor
	 */
	function MultiDelay(maxDelayInSamplesSize, delayInSamples, masterVolume, delayVolume) {
	  this.delayBufferSamples   = new Float32Array(maxDelayInSamplesSize); // The maximum size of delay
	  this.delayInputPointer     = delayInSamples;
	  this.delayOutputPointer   = 0;

	  this.delayInSamples   = delayInSamples;
	  this.masterVolume     = masterVolume;
	  this.delayVolume     = delayVolume;
	}

	/**
	 * Change the delay time in samples.
	 *
	 * @param {Number} delayInSamples Delay in samples
	 */
	MultiDelay.prototype.setDelayInSamples = function (delayInSamples) {
	  this.delayInSamples = delayInSamples;

	  this.delayInputPointer = this.delayOutputPointer + delayInSamples;

	  if (this.delayInputPointer >= this.delayBufferSamples.length-1) {
		this.delayInputPointer = this.delayInputPointer - this.delayBufferSamples.length;
	  }
	};

	/**
	 * Change the master volume.
	 *
	 * @param {Number} masterVolume Float value: 0.0 (silence), 1.0 (normal), >1.0 (amplify)
	 */
	MultiDelay.prototype.setMasterVolume = function(masterVolume) {
	  this.masterVolume = masterVolume;
	};

	/**
	 * Change the delay feedback volume.
	 *
	 * @param {Number} delayVolume Float value: 0.0 (silence), 1.0 (normal), >1.0 (amplify)
	 */
	MultiDelay.prototype.setDelayVolume = function(delayVolume) {
	  this.delayVolume = delayVolume;
	};

	/**
	 * Process a given interleaved or mono non-interleaved float value Array and adds the delayed audio.
	 *
	 * @param {Array} samples Array containing Float values or a Float32Array
	 *
	 * @returns A new Float32Array interleaved or mono non-interleaved as was fed to this function.
	 */
	MultiDelay.prototype.process = function(samples) {
	  // NB. Make a copy to put in the output samples to return.
	  var outputSamples = new Float32Array(samples.length);

	  for (var i=0; i<samples.length; i++) {
		// delayBufferSamples could contain initial NULL's, return silence in that case
		var delaySample = (this.delayBufferSamples[this.delayOutputPointer] === null ? 0.0 : this.delayBufferSamples[this.delayOutputPointer]);

		// Mix normal audio data with delayed audio
		var sample = (delaySample * this.delayVolume) + samples[i];

		// Add audio data with the delay in the delay buffer
		this.delayBufferSamples[this.delayInputPointer] = sample;

		// Return the audio with delay mix
		outputSamples[i] = sample * this.masterVolume;

		// Manage circulair delay buffer pointers
		this.delayInputPointer++;
		if (this.delayInputPointer >= this.delayBufferSamples.length-1) {
		  this.delayInputPointer = 0;
		}

		this.delayOutputPointer++;
		if (this.delayOutputPointer >= this.delayBufferSamples.length-1) {
		  this.delayOutputPointer = 0;
		}
	  }

	  return outputSamples;
	};

	/**
	 * SingleDelay effect by Almer Thie (http://code.almeros.com).
	 * Copyright 2010 Almer Thie. All rights reserved.
	 * Example: See usage in Reverb class
	 *
	 * This is a delay that does NOT feeds it's own delayed signal back into its
	 * circular buffer, neither does it return the original signal. Also known as
	 * an AllPassFilter(?).
	 *
	 * Compatible with interleaved stereo (or more channel) buffers and
	 * non-interleaved mono buffers.
	 *
	 * @param {Number} maxDelayInSamplesSize Maximum possible delay in samples (size of circular buffer)
	 * @param {Number} delayInSamples Initial delay in samples
	 * @param {Number} delayVolume Initial feedback delay volume. Float value: 0.0 (silence), 1.0 (normal), >1.0 (amplify)
	 *
	 * @constructor
	 */

	function SingleDelay(maxDelayInSamplesSize, delayInSamples, delayVolume) {
	  this.delayBufferSamples = new Float32Array(maxDelayInSamplesSize); // The maximum size of delay
	  this.delayInputPointer  = delayInSamples;
	  this.delayOutputPointer = 0;

	  this.delayInSamples     = delayInSamples;
	  this.delayVolume        = delayVolume;
	}

	/**
	 * Change the delay time in samples.
	 *
	 * @param {Number} delayInSamples Delay in samples
	 */
	SingleDelay.prototype.setDelayInSamples = function(delayInSamples) {
	  this.delayInSamples = delayInSamples;
	  this.delayInputPointer = this.delayOutputPointer + delayInSamples;

	  if (this.delayInputPointer >= this.delayBufferSamples.length-1) {
		this.delayInputPointer = this.delayInputPointer - this.delayBufferSamples.length;
	  }
	};

	/**
	 * Change the return signal volume.
	 *
	 * @param {Number} delayVolume Float value: 0.0 (silence), 1.0 (normal), >1.0 (amplify)
	 */
	SingleDelay.prototype.setDelayVolume = function(delayVolume) {
	  this.delayVolume = delayVolume;
	};

	/**
	 * Process a given interleaved or mono non-interleaved float value Array and
	 * returns the delayed audio.
	 *
	 * @param {Array} samples Array containing Float values or a Float32Array
	 *
	 * @returns A new Float32Array interleaved or mono non-interleaved as was fed to this function.
	 */
	SingleDelay.prototype.process = function(samples) {
	  // NB. Make a copy to put in the output samples to return.
	  var outputSamples = new Float32Array(samples.length);

	  for (var i=0; i<samples.length; i++) {

		// Add audio data with the delay in the delay buffer
		this.delayBufferSamples[this.delayInputPointer] = samples[i];

		// delayBufferSamples could contain initial NULL's, return silence in that case
		var delaySample = this.delayBufferSamples[this.delayOutputPointer];

		// Return the audio with delay mix
		outputSamples[i] = delaySample * this.delayVolume;

		// Manage circulair delay buffer pointers
		this.delayInputPointer++;

		if (this.delayInputPointer >= this.delayBufferSamples.length-1) {
		  this.delayInputPointer = 0;
		}

		this.delayOutputPointer++;

		if (this.delayOutputPointer >= this.delayBufferSamples.length-1) {
		  this.delayOutputPointer = 0;
		}
	  }

	  return outputSamples;
	};

	/**
	 * Reverb effect by Almer Thie (http://code.almeros.com).
	 * Copyright 2010 Almer Thie. All rights reserved.
	 * Example: http://code.almeros.com/code-examples/reverb-firefox-audio-api/
	 *
	 * This reverb consists of 6 SingleDelays, 6 MultiDelays and an IIRFilter2
	 * for each of the two stereo channels.
	 *
	 * Compatible with interleaved stereo buffers only!
	 *
	 * @param {Number} maxDelayInSamplesSize Maximum possible delay in samples (size of circular buffers)
	 * @param {Number} delayInSamples Initial delay in samples for internal (Single/Multi)delays
	 * @param {Number} masterVolume Initial master volume. Float value: 0.0 (silence), 1.0 (normal), >1.0 (amplify)
	 * @param {Number} mixVolume Initial reverb signal mix volume. Float value: 0.0 (silence), 1.0 (normal), >1.0 (amplify)
	 * @param {Number} delayVolume Initial feedback delay volume for internal (Single/Multi)delays. Float value: 0.0 (silence), 1.0 (normal), >1.0 (amplify)
	 * @param {Number} dampFrequency Initial low pass filter frequency. 0 to 44100 (depending on your maximum sampling frequency)
	 *
	 * @constructor
	 */
	function Reverb(maxDelayInSamplesSize, delayInSamples, masterVolume, mixVolume, delayVolume, dampFrequency) {
	  this.delayInSamples   = delayInSamples;
	  this.masterVolume     = masterVolume;
	  this.mixVolume       = mixVolume;
	  this.delayVolume     = delayVolume;
	  this.dampFrequency     = dampFrequency;

	  this.NR_OF_MULTIDELAYS = 6;
	  this.NR_OF_SINGLEDELAYS = 6;

	  this.LOWPASSL = new IIRFilter2(DSP.LOWPASS, dampFrequency, 0, 44100);
	  this.LOWPASSR = new IIRFilter2(DSP.LOWPASS, dampFrequency, 0, 44100);

	  this.singleDelays = [];

	  var i, delayMultiply;

	  for (i = 0; i < this.NR_OF_SINGLEDELAYS; i++) {
		delayMultiply = 1.0 + (i/7.0); // 1.0, 1.1, 1.2...
		this.singleDelays[i] = new SingleDelay(maxDelayInSamplesSize, Math.round(this.delayInSamples * delayMultiply), this.delayVolume);
	  }

	  this.multiDelays = [];

	  for (i = 0; i < this.NR_OF_MULTIDELAYS; i++) {
		delayMultiply = 1.0 + (i/10.0); // 1.0, 1.1, 1.2...
		this.multiDelays[i] = new MultiDelay(maxDelayInSamplesSize, Math.round(this.delayInSamples * delayMultiply), this.masterVolume, this.delayVolume);
	  }
	}

	/**
	 * Change the delay time in samples as a base for all delays.
	 *
	 * @param {Number} delayInSamples Delay in samples
	 */
	Reverb.prototype.setDelayInSamples = function (delayInSamples){
	  this.delayInSamples = delayInSamples;

	  var i, delayMultiply;

	  for (i = 0; i < this.NR_OF_SINGLEDELAYS; i++) {
		delayMultiply = 1.0 + (i/7.0); // 1.0, 1.1, 1.2...
		this.singleDelays[i].setDelayInSamples( Math.round(this.delayInSamples * delayMultiply) );
	  }

	  for (i = 0; i < this.NR_OF_MULTIDELAYS; i++) {
		delayMultiply = 1.0 + (i/10.0); // 1.0, 1.1, 1.2...
		this.multiDelays[i].setDelayInSamples( Math.round(this.delayInSamples * delayMultiply) );
	  }
	};

	/**
	 * Change the master volume.
	 *
	 * @param {Number} masterVolume Float value: 0.0 (silence), 1.0 (normal), >1.0 (amplify)
	 */
	Reverb.prototype.setMasterVolume = function (masterVolume){
	  this.masterVolume = masterVolume;
	};

	/**
	 * Change the reverb signal mix level.
	 *
	 * @param {Number} mixVolume Float value: 0.0 (silence), 1.0 (normal), >1.0 (amplify)
	 */
	Reverb.prototype.setMixVolume = function (mixVolume){
	  this.mixVolume = mixVolume;
	};

	/**
	 * Change all delays feedback volume.
	 *
	 * @param {Number} delayVolume Float value: 0.0 (silence), 1.0 (normal), >1.0 (amplify)
	 */
	Reverb.prototype.setDelayVolume = function (delayVolume){
	  this.delayVolume = delayVolume;

	  var i;

	  for (i = 0; i<this.NR_OF_SINGLEDELAYS; i++) {
		this.singleDelays[i].setDelayVolume(this.delayVolume);
	  }

	  for (i = 0; i<this.NR_OF_MULTIDELAYS; i++) {
		this.multiDelays[i].setDelayVolume(this.delayVolume);
	  }
	};

	/**
	 * Change the Low Pass filter frequency.
	 *
	 * @param {Number} dampFrequency low pass filter frequency. 0 to 44100 (depending on your maximum sampling frequency)
	 */
	Reverb.prototype.setDampFrequency = function (dampFrequency){
	  this.dampFrequency = dampFrequency;

	  this.LOWPASSL.set(dampFrequency, 0);
	  this.LOWPASSR.set(dampFrequency, 0);
	};

	/**
	 * Process a given interleaved float value Array and copies and adds the reverb signal.
	 *
	 * @param {Array} samples Array containing Float values or a Float32Array
	 *
	 * @returns A new Float32Array interleaved buffer.
	 */
	Reverb.prototype.process = function (interleavedSamples){
	  // NB. Make a copy to put in the output samples to return.
	  var outputSamples = new Float32Array(interleavedSamples.length);

	  // Perform low pass on the input samples to mimick damp
	  var leftRightMix = DSP.deinterleave(interleavedSamples);
	  this.LOWPASSL.process( leftRightMix[DSP.LEFT] );
	  this.LOWPASSR.process( leftRightMix[DSP.RIGHT] );
	  var filteredSamples = DSP.interleave(leftRightMix[DSP.LEFT], leftRightMix[DSP.RIGHT]);

	  var i;

	  // Process MultiDelays in parallel
	  for (i = 0; i<this.NR_OF_MULTIDELAYS; i++) {
		// Invert the signal of every even multiDelay
		outputSamples = DSP.mixSampleBuffers(outputSamples, this.multiDelays[i].process(filteredSamples), 2%i === 0, this.NR_OF_MULTIDELAYS);
	  }

	  // Process SingleDelays in series
	  var singleDelaySamples = new Float32Array(outputSamples.length);
	  for (i = 0; i<this.NR_OF_SINGLEDELAYS; i++) {
		// Invert the signal of every even singleDelay
		singleDelaySamples = DSP.mixSampleBuffers(singleDelaySamples, this.singleDelays[i].process(outputSamples), 2%i === 0, 1);
	  }

	  // Apply the volume of the reverb signal
	  for (i = 0; i<singleDelaySamples.length; i++) {
		singleDelaySamples[i] *= this.mixVolume;
	  }

	  // Mix the original signal with the reverb signal
	  outputSamples = DSP.mixSampleBuffers(singleDelaySamples, interleavedSamples, 0, 1);

	  // Apply the master volume to the complete signal
	  for (i = 0; i<outputSamples.length; i++) {
		outputSamples[i] *= this.masterVolume;
	  }

	  return outputSamples;
	};

	return {
		DSP:				DSP,
		setupTypedArray:	setupTypedArray,
		FourierTransform:	FourierTransform,
		DFT:				DFT,
		FFT:				FFT,
		RFFT:				RFFT,
		Sampler:			Sampler,
		Oscillator:			Oscillator,
		ADSR:				ADSR,
		IIRFilter:			IIRFilter,
		IIRFilter2:			IIRFilter2,
		WindowFunction:		WindowFunction,
		sinh:				sinh,
		Biquad:				Biquad,
		GraphicalEq:		GraphicalEq,
		MultiDelay:			MultiDelay,
		SingleDelay:		SingleDelay,
		Reverb:				Reverb
	};
});
define('sound-input',['jquery', 'dsp', 'game/tones'], function ($, dsp, tones) {
	var	DSP	= dsp.DSP,
		setupTypedArray		= dsp.setupTypedArray,
		FourierTransform	= dsp.FourierTransform,
		DFT					= dsp.DFT,
		FFT					= dsp.FFT,
		RFFT				= dsp.RFFT,
		Sampler				= dsp.Sampler,
		Oscillator			= dsp.Oscillator,
		ADSR				= dsp.ADSR,
		IIRFilter			= dsp.IIRFilter,
		IIRFilter2			= dsp.IIRFilter2,
		WindowFunction		= dsp.WindowFunction,
		sinh				= dsp.sinh,
		Biquad				= dsp.Biquad,
		GraphicalEq			= dsp.GraphicalEq,
		MultiDelay			= dsp.MultiDelay,
		SingleDelay			= dsp.SingleDelay,
		Reverb				= dsp.Reverb,
		abekat = 0;

	var Tuner, frequencies, root,
		__hasProp = {}.hasOwnProperty;

		frequencies	= [];
	tones.forEach(function (tone) {
		frequencies[tone.name+tone.octav]	= tone;
	});

	Tuner = function (err, toneChange, expectedTone) {
		var	requestAnimationFrame	= requestAnimationFrame || webkitRequestAnimationFrame || msRequestAnimationFrame || mozRequestAnimationFrame || oRequestAnimationFrame || function () {};

		var audioContext, buffer, bufferFillSize, bufferFiller, error, fft, fftSize, gauss, hp, i, lp, sampleRate, success;
		window.AudioContext = (function() {
			return window.AudioContext || window.mozAudioContext || window.webkitAudioContext || window.msAudioContext || window.oAudioContext;
		})();
		if (!window.AudioContext) {
			return err('audioContext');
		}
		navigator.getUserMedia = (function() {
			return navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
		})();
		if (!navigator.getUserMedia) {
			return err('getUserMedia');
		}
		audioContext = new AudioContext();
		sampleRate = audioContext.sampleRate;
		fftSize = 8192;
		fft = new FFT(fftSize, sampleRate / 4);
		buffer = (function() {
			var _i, _results;
			_results = [];
			for (i = _i = 0; 0 <= fftSize ? _i < fftSize : _i > fftSize; i = 0 <= fftSize ? ++_i : --_i) {
				_results.push(0);
			}
			return _results;
		})();
		bufferFillSize = 2048;
		bufferFiller = audioContext.createJavaScriptNode(bufferFillSize, 1, 1);
		bufferFiller.onaudioprocess = function(e) {
			var b, input, _i, _j, _ref, _ref1, _results;
			input = e.inputBuffer.getChannelData(0);
			for (b = _i = bufferFillSize, _ref = buffer.length; bufferFillSize <= _ref ? _i < _ref : _i > _ref; b = bufferFillSize <= _ref ? ++_i : --_i) {
				buffer[b - bufferFillSize] = buffer[b];
			}
			_results = [];
			for (b = _j = 0, _ref1 = input.length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; b = 0 <= _ref1 ? ++_j : --_j) {
				_results.push(buffer[buffer.length - bufferFillSize + b] = input[b]);
			}
			return _results;
		};
		gauss = new WindowFunction(DSP.GAUSS);
		lp = audioContext.createBiquadFilter();
		lp.type = lp.LOWPASS;
		lp.frequency = 8000;
		lp.Q = 0.1;
		hp = audioContext.createBiquadFilter();
		hp.type = hp.HIGHPASS;
		hp.frequency = 20;
		hp.Q = 0.1;
		success = function(stream) {
			function tickDone(freq, note, diff) {
				requestAnimationFrame(process);
				toneChange(freq, note, diff);
			}

			var getPitch, maxPeaks, maxTime, noiseCount, noiseThreshold, process, src;
			maxTime = 0;
			noiseCount = 0;
			noiseThreshold = -Infinity;
			maxPeaks = 0;
			try {
				src = audioContext.createMediaStreamSource(stream);
				src.connect(lp);
				lp.connect(hp);
				hp.connect(bufferFiller);
				bufferFiller.connect(audioContext.destination);
				process = function() {
					var b, bufferCopy, diff, downsampled, firstFreq, freq, interp, left, noiseThrehold, note, p, peak, peaks, q, right, s, secondFreq, spectrumPoints, thirdFreq, upsampled, x, _i, _j, _k, _l, _len, _m, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
					bufferCopy = (function() {
						var _i, _len, _results;
						_results = [];
						for (_i = 0, _len = buffer.length; _i < _len; _i++) {
							b = buffer[_i];
							_results.push(b);
						}
						return _results;
					})();
					gauss.process(bufferCopy);
					downsampled = [];
					for (s = _i = 0, _ref = bufferCopy.length; _i < _ref; s = _i += 4) {
						downsampled.push(bufferCopy[s]);
					}
					upsampled = [];
					for (_j = 0, _len = downsampled.length; _j < _len; _j++) {
						s = downsampled[_j];
						upsampled.push(s);
						upsampled.push(0);
						upsampled.push(0);
						upsampled.push(0);
					}
					fft.forward(upsampled);
					if (noiseCount < 50) {
						noiseThreshold = _.reduce(fft.spectrum, (function(max, next) {
							if (next > max) {
								return next;
							} else {
								return max;
							}
						}), noiseThreshold);
						noiseThrehold = noiseThreshold > 0.001 ? 0.001 : noiseThreshold;
						noiseCount++;
					}
					spectrumPoints = (function() {
						var _k, _ref1, _results;
						_results = [];
						for (x = _k = 0, _ref1 = fft.spectrum.length / 4; 0 <= _ref1 ? _k < _ref1 : _k > _ref1; x = 0 <= _ref1 ? ++_k : --_k) {
							_results.push({
								x: x,
								y: fft.spectrum[x]
							});
						}
						return _results;
					})();
					spectrumPoints.sort(function(a, b) {
						return b.y - a.y;
					});
					peaks = [];
					for (p = _k = 0; _k < 8; p = ++_k) {
						if (spectrumPoints[p].y > noiseThreshold * 5) {
							peaks.push(spectrumPoints[p]);
						}
					}
					if (peaks.length > 0) {
						for (p = _l = 0, _ref1 = peaks.length; 0 <= _ref1 ? _l < _ref1 : _l > _ref1; p = 0 <= _ref1 ? ++_l : --_l) {
							if (peaks[p] != null) {
								for (q = _m = 0, _ref2 = peaks.length; 0 <= _ref2 ? _m < _ref2 : _m > _ref2; q = 0 <= _ref2 ? ++_m : --_m) {
									if (p !== q && (peaks[q] != null)) {
										if (Math.abs(peaks[p].x - peaks[q].x) < 5) {
											peaks[q] = null;
										}
									}
								}
							}
						}
						peaks = (function() {
							var _len1, _n, _results;
							_results = [];
							for (_n = 0, _len1 = peaks.length; _n < _len1; _n++) {
								p = peaks[_n];
								if (p != null) {
									_results.push(p);
								}
							}
							return _results;
						})();
						peaks.sort(function(a, b) {
							return a.x - b.x;
						});
						maxPeaks = maxPeaks < peaks.length ? peaks.length : maxPeaks;
						peak = null;
						firstFreq = peaks[0].x * (sampleRate / fftSize);
						if (peaks.length > 1) {
							secondFreq = peaks[1].x * (sampleRate / fftSize);
							if ((1.4 < (_ref3 = firstFreq / secondFreq) && _ref3 < 1.6)) {
								peak = peaks[1];
							}
						}
						if (peaks.length > 2) {
							thirdFreq = peaks[2].x * (sampleRate / fftSize);
							if ((1.4 < (_ref4 = firstFreq / thirdFreq) && _ref4 < 1.6)) {
								peak = peaks[2];
							}
						}
						/*peak	= (function (expectedTone, peaks) {
							var	diff,
								closestPeak	= null;
							if(peaks.length === 0 || expectedTone === undefined) {
								return null;
							}

							peaks.forEach(function (peak) {
								peak.hz	= peak.x * (sampleRate / fftSize);
								if(Math.abs(expectedTone.hz - peak.hz) < diff || diff === undefined) {
									diff		= Math.abs(expectedTone.hz - peak.hz);
									closestPeak	= peak;
								}
							});

							return closestPeak;
						}(expectedTone(), peaks));*/
						peaks.sort(function (a, b) {
							return a.y < b.y;
						});

						if (peaks.length > 1 || maxPeaks === 1 || maxPeaks === 2 || maxPeaks === 3) {
							if (!(peak != null)) {
								peak = peaks[0];
							}
							left = {
								x: peak.x - 1,
								y: Math.log(fft.spectrum[peak.x - 1])
							};
							peak = {
								x: peak.x,
								y: Math.log(fft.spectrum[peak.x])
							};
							right = {
								x: peak.x + 1,
								y: Math.log(fft.spectrum[peak.x + 1])
							};
							interp = 0.5 * ((left.y - right.y) / (left.y - (2 * peak.y) + right.y)) + peak.x;
							freq = interp * (sampleRate / fftSize);
							_ref5 = getPitch(freq), note = _ref5[0], diff = _ref5[1];
							tickDone(freq, note, diff);
						} else {
							tickDone(-1);
						}
					} else {
						maxPeaks = 0;
						tickDone(-1);
					}
				};
			} catch (e) {
				error(e);
			}
			getPitch = function(freq) {
				var diff, key, minDiff, tone, toneFound;
				minDiff = Infinity;
				diff = Infinity;
				for (key in frequencies) {
					if (!__hasProp.call(frequencies, key)) continue;
					tone = frequencies[key];
					if (Math.abs(freq - tone.hz) < minDiff) {
						minDiff = Math.abs(freq - tone.hz);
						diff = freq - tone.hz;
						toneFound	= tone;
					}
				}
				return [toneFound, diff];
			};
			tickDone(-1);
		};
		error = function(e) {
			console.log(e);
			console.log('ARE YOU USING CHROME CANARY (23/09/2012) ON A MAC WITH "Web Audio Input" ENABLED IN chrome://flags?');
			return alert('ERROR: CHECK ERROR CONSOLE');
		};

		return navigator.getUserMedia({
			audio: true
		}, success, error);
	};

	return Tuner;
});
define('compass',['jquery', 'game/options', 'l2p'], function ($, options, L2P) {
	function Compass($box) {
		this.toneBefore;
		this.tone;
		this.toneAfter;
		this.hz		= -1;
		this.$box	= $box;

		this.$toneBefore	= this.$box.find('.ContentBoxGameCompass-tone-before');
		this.$tone			= this.$box.find('.ContentBoxGameCompass-tone-current');
		this.$toneAfter		= this.$box.find('.ContentBoxGameCompass-tone-after');
		this.$arrow			= this.$box.find('.ContentBoxGameCompass-line');
	}
	Compass.prototype.setTone	= function (tone) {
		if(this.tone !== tone && tone) {
			this.tone		= tone;

			this.toneBefore	= L2P.funcs.tones.getClosestTone(tone, true);
			this.toneAfter	= L2P.funcs.tones.getClosestTone(tone, false);

			this.$toneBefore.text(this.toneBefore ? this.toneBefore.name : '');
			this.$tone.text(this.tone.name || '');
			this.$toneAfter.text(this.toneAfter.name || '');

			this.setFreq(this.tone.hz);
		}
	};
	Compass.prototype.setFreq	= function (hz) {
		if(this.hz !== hz && hz !== -1) {
			this.hz	= hz;
			var	toneDiff	= L2P.funcs.tones.freqDiffToTone(this.tone, hz, 0),
				ratio1		= toneDiff.ratio > 0 ? Math.min(toneDiff.ratio, 1) : Math.max(toneDiff.ratio, -1),
				arrowPos	= 50 + 50 * -ratio1;

			this.$arrow.css('margin-left', arrowPos+'%');
		}
	};
	Compass.prototype.show		= function () {

	};
	Compass.prototype.hide		= function () {

	};

	return Compass;
});
//     Underscore.js 1.4.2
//     http://underscorejs.org
//     (c) 2009-2012 Jeremy Ashkenas, DocumentCloud Inc.
//     Underscore may be freely distributed under the MIT license.
(function(){var e=this,t=e._,n={},r=Array.prototype,i=Object.prototype,s=Function.prototype,o=r.push,u=r.slice,a=r.concat,f=r.unshift,l=i.toString,c=i.hasOwnProperty,h=r.forEach,p=r.map,d=r.reduce,v=r.reduceRight,m=r.filter,g=r.every,y=r.some,b=r.indexOf,w=r.lastIndexOf,E=Array.isArray,S=Object.keys,x=s.bind,T=function(e){if(e instanceof T)return e;if(!(this instanceof T))return new T(e);this._wrapped=e};typeof exports!="undefined"?(typeof module!="undefined"&&module.exports&&(exports=module.exports=T),exports._=T):e._=T,T.VERSION="1.4.2";var N=T.each=T.forEach=function(e,t,r){if(e==null)return;if(h&&e.forEach===h)e.forEach(t,r);else if(e.length===+e.length){for(var i=0,s=e.length;i<s;i++)if(t.call(r,e[i],i,e)===n)return}else for(var o in e)if(T.has(e,o)&&t.call(r,e[o],o,e)===n)return};T.map=T.collect=function(e,t,n){var r=[];return e==null?r:p&&e.map===p?e.map(t,n):(N(e,function(e,i,s){r[r.length]=t.call(n,e,i,s)}),r)},T.reduce=T.foldl=T.inject=function(e,t,n,r){var i=arguments.length>2;e==null&&(e=[]);if(d&&e.reduce===d)return r&&(t=T.bind(t,r)),i?e.reduce(t,n):e.reduce(t);N(e,function(e,s,o){i?n=t.call(r,n,e,s,o):(n=e,i=!0)});if(!i)throw new TypeError("Reduce of empty array with no initial value");return n},T.reduceRight=T.foldr=function(e,t,n,r){var i=arguments.length>2;e==null&&(e=[]);if(v&&e.reduceRight===v)return r&&(t=T.bind(t,r)),arguments.length>2?e.reduceRight(t,n):e.reduceRight(t);var s=e.length;if(s!==+s){var o=T.keys(e);s=o.length}N(e,function(u,a,f){a=o?o[--s]:--s,i?n=t.call(r,n,e[a],a,f):(n=e[a],i=!0)});if(!i)throw new TypeError("Reduce of empty array with no initial value");return n},T.find=T.detect=function(e,t,n){var r;return C(e,function(e,i,s){if(t.call(n,e,i,s))return r=e,!0}),r},T.filter=T.select=function(e,t,n){var r=[];return e==null?r:m&&e.filter===m?e.filter(t,n):(N(e,function(e,i,s){t.call(n,e,i,s)&&(r[r.length]=e)}),r)},T.reject=function(e,t,n){var r=[];return e==null?r:(N(e,function(e,i,s){t.call(n,e,i,s)||(r[r.length]=e)}),r)},T.every=T.all=function(e,t,r){t||(t=T.identity);var i=!0;return e==null?i:g&&e.every===g?e.every(t,r):(N(e,function(e,s,o){if(!(i=i&&t.call(r,e,s,o)))return n}),!!i)};var C=T.some=T.any=function(e,t,r){t||(t=T.identity);var i=!1;return e==null?i:y&&e.some===y?e.some(t,r):(N(e,function(e,s,o){if(i||(i=t.call(r,e,s,o)))return n}),!!i)};T.contains=T.include=function(e,t){var n=!1;return e==null?n:b&&e.indexOf===b?e.indexOf(t)!=-1:(n=C(e,function(e){return e===t}),n)},T.invoke=function(e,t){var n=u.call(arguments,2);return T.map(e,function(e){return(T.isFunction(t)?t:e[t]).apply(e,n)})},T.pluck=function(e,t){return T.map(e,function(e){return e[t]})},T.where=function(e,t){return T.isEmpty(t)?[]:T.filter(e,function(e){for(var n in t)if(t[n]!==e[n])return!1;return!0})},T.max=function(e,t,n){if(!t&&T.isArray(e)&&e[0]===+e[0]&&e.length<65535)return Math.max.apply(Math,e);if(!t&&T.isEmpty(e))return-Infinity;var r={computed:-Infinity};return N(e,function(e,i,s){var o=t?t.call(n,e,i,s):e;o>=r.computed&&(r={value:e,computed:o})}),r.value},T.min=function(e,t,n){if(!t&&T.isArray(e)&&e[0]===+e[0]&&e.length<65535)return Math.min.apply(Math,e);if(!t&&T.isEmpty(e))return Infinity;var r={computed:Infinity};return N(e,function(e,i,s){var o=t?t.call(n,e,i,s):e;o<r.computed&&(r={value:e,computed:o})}),r.value},T.shuffle=function(e){var t,n=0,r=[];return N(e,function(e){t=T.random(n++),r[n-1]=r[t],r[t]=e}),r};var k=function(e){return T.isFunction(e)?e:function(t){return t[e]}};T.sortBy=function(e,t,n){var r=k(t);return T.pluck(T.map(e,function(e,t,i){return{value:e,index:t,criteria:r.call(n,e,t,i)}}).sort(function(e,t){var n=e.criteria,r=t.criteria;if(n!==r){if(n>r||n===void 0)return 1;if(n<r||r===void 0)return-1}return e.index<t.index?-1:1}),"value")};var L=function(e,t,n,r){var i={},s=k(t);return N(e,function(t,o){var u=s.call(n,t,o,e);r(i,u,t)}),i};T.groupBy=function(e,t,n){return L(e,t,n,function(e,t,n){(T.has(e,t)?e[t]:e[t]=[]).push(n)})},T.countBy=function(e,t,n){return L(e,t,n,function(e,t,n){T.has(e,t)||(e[t]=0),e[t]++})},T.sortedIndex=function(e,t,n,r){n=n==null?T.identity:k(n);var i=n.call(r,t),s=0,o=e.length;while(s<o){var u=s+o>>>1;n.call(r,e[u])<i?s=u+1:o=u}return s},T.toArray=function(e){return e?e.length===+e.length?u.call(e):T.values(e):[]},T.size=function(e){return e.length===+e.length?e.length:T.keys(e).length},T.first=T.head=T.take=function(e,t,n){return t!=null&&!n?u.call(e,0,t):e[0]},T.initial=function(e,t,n){return u.call(e,0,e.length-(t==null||n?1:t))},T.last=function(e,t,n){return t!=null&&!n?u.call(e,Math.max(e.length-t,0)):e[e.length-1]},T.rest=T.tail=T.drop=function(e,t,n){return u.call(e,t==null||n?1:t)},T.compact=function(e){return T.filter(e,function(e){return!!e})};var A=function(e,t,n){return N(e,function(e){T.isArray(e)?t?o.apply(n,e):A(e,t,n):n.push(e)}),n};T.flatten=function(e,t){return A(e,t,[])},T.without=function(e){return T.difference(e,u.call(arguments,1))},T.uniq=T.unique=function(e,t,n,r){var i=n?T.map(e,n,r):e,s=[],o=[];return N(i,function(n,r){if(t?!r||o[o.length-1]!==n:!T.contains(o,n))o.push(n),s.push(e[r])}),s},T.union=function(){return T.uniq(a.apply(r,arguments))},T.intersection=function(e){var t=u.call(arguments,1);return T.filter(T.uniq(e),function(e){return T.every(t,function(t){return T.indexOf(t,e)>=0})})},T.difference=function(e){var t=a.apply(r,u.call(arguments,1));return T.filter(e,function(e){return!T.contains(t,e)})},T.zip=function(){var e=u.call(arguments),t=T.max(T.pluck(e,"length")),n=new Array(t);for(var r=0;r<t;r++)n[r]=T.pluck(e,""+r);return n},T.object=function(e,t){var n={};for(var r=0,i=e.length;r<i;r++)t?n[e[r]]=t[r]:n[e[r][0]]=e[r][1];return n},T.indexOf=function(e,t,n){if(e==null)return-1;var r=0,i=e.length;if(n){if(typeof n!="number")return r=T.sortedIndex(e,t),e[r]===t?r:-1;r=n<0?Math.max(0,i+n):n}if(b&&e.indexOf===b)return e.indexOf(t,n);for(;r<i;r++)if(e[r]===t)return r;return-1},T.lastIndexOf=function(e,t,n){if(e==null)return-1;var r=n!=null;if(w&&e.lastIndexOf===w)return r?e.lastIndexOf(t,n):e.lastIndexOf(t);var i=r?n:e.length;while(i--)if(e[i]===t)return i;return-1},T.range=function(e,t,n){arguments.length<=1&&(t=e||0,e=0),n=arguments[2]||1;var r=Math.max(Math.ceil((t-e)/n),0),i=0,s=new Array(r);while(i<r)s[i++]=e,e+=n;return s};var O=function(){};T.bind=function(t,n){var r,i;if(t.bind===x&&x)return x.apply(t,u.call(arguments,1));if(!T.isFunction(t))throw new TypeError;return i=u.call(arguments,2),r=function(){if(this instanceof r){O.prototype=t.prototype;var e=new O,s=t.apply(e,i.concat(u.call(arguments)));return Object(s)===s?s:e}return t.apply(n,i.concat(u.call(arguments)))}},T.bindAll=function(e){var t=u.call(arguments,1);return t.length==0&&(t=T.functions(e)),N(t,function(t){e[t]=T.bind(e[t],e)}),e},T.memoize=function(e,t){var n={};return t||(t=T.identity),function(){var r=t.apply(this,arguments);return T.has(n,r)?n[r]:n[r]=e.apply(this,arguments)}},T.delay=function(e,t){var n=u.call(arguments,2);return setTimeout(function(){return e.apply(null,n)},t)},T.defer=function(e){return T.delay.apply(T,[e,1].concat(u.call(arguments,1)))},T.throttle=function(e,t){var n,r,i,s,o,u,a=T.debounce(function(){o=s=!1},t);return function(){n=this,r=arguments;var f=function(){i=null,o&&(u=e.apply(n,r)),a()};return i||(i=setTimeout(f,t)),s?o=!0:(s=!0,u=e.apply(n,r)),a(),u}},T.debounce=function(e,t,n){var r,i;return function(){var s=this,o=arguments,u=function(){r=null,n||(i=e.apply(s,o))},a=n&&!r;return clearTimeout(r),r=setTimeout(u,t),a&&(i=e.apply(s,o)),i}},T.once=function(e){var t=!1,n;return function(){return t?n:(t=!0,n=e.apply(this,arguments),e=null,n)}},T.wrap=function(e,t){return function(){var n=[e];return o.apply(n,arguments),t.apply(this,n)}},T.compose=function(){var e=arguments;return function(){var t=arguments;for(var n=e.length-1;n>=0;n--)t=[e[n].apply(this,t)];return t[0]}},T.after=function(e,t){return e<=0?t():function(){if(--e<1)return t.apply(this,arguments)}},T.keys=S||function(e){if(e!==Object(e))throw new TypeError("Invalid object");var t=[];for(var n in e)T.has(e,n)&&(t[t.length]=n);return t},T.values=function(e){var t=[];for(var n in e)T.has(e,n)&&t.push(e[n]);return t},T.pairs=function(e){var t=[];for(var n in e)T.has(e,n)&&t.push([n,e[n]]);return t},T.invert=function(e){var t={};for(var n in e)T.has(e,n)&&(t[e[n]]=n);return t},T.functions=T.methods=function(e){var t=[];for(var n in e)T.isFunction(e[n])&&t.push(n);return t.sort()},T.extend=function(e){return N(u.call(arguments,1),function(t){for(var n in t)e[n]=t[n]}),e},T.pick=function(e){var t={},n=a.apply(r,u.call(arguments,1));return N(n,function(n){n in e&&(t[n]=e[n])}),t},T.omit=function(e){var t={},n=a.apply(r,u.call(arguments,1));for(var i in e)T.contains(n,i)||(t[i]=e[i]);return t},T.defaults=function(e){return N(u.call(arguments,1),function(t){for(var n in t)e[n]==null&&(e[n]=t[n])}),e},T.clone=function(e){return T.isObject(e)?T.isArray(e)?e.slice():T.extend({},e):e},T.tap=function(e,t){return t(e),e};var M=function(e,t,n,r){if(e===t)return e!==0||1/e==1/t;if(e==null||t==null)return e===t;e instanceof T&&(e=e._wrapped),t instanceof T&&(t=t._wrapped);var i=l.call(e);if(i!=l.call(t))return!1;switch(i){case"[object String]":return e==String(t);case"[object Number]":return e!=+e?t!=+t:e==0?1/e==1/t:e==+t;case"[object Date]":case"[object Boolean]":return+e==+t;case"[object RegExp]":return e.source==t.source&&e.global==t.global&&e.multiline==t.multiline&&e.ignoreCase==t.ignoreCase}if(typeof e!="object"||typeof t!="object")return!1;var s=n.length;while(s--)if(n[s]==e)return r[s]==t;n.push(e),r.push(t);var o=0,u=!0;if(i=="[object Array]"){o=e.length,u=o==t.length;if(u)while(o--)if(!(u=M(e[o],t[o],n,r)))break}else{var a=e.constructor,f=t.constructor;if(a!==f&&!(T.isFunction(a)&&a instanceof a&&T.isFunction(f)&&f instanceof f))return!1;for(var c in e)if(T.has(e,c)){o++;if(!(u=T.has(t,c)&&M(e[c],t[c],n,r)))break}if(u){for(c in t)if(T.has(t,c)&&!(o--))break;u=!o}}return n.pop(),r.pop(),u};T.isEqual=function(e,t){return M(e,t,[],[])},T.isEmpty=function(e){if(e==null)return!0;if(T.isArray(e)||T.isString(e))return e.length===0;for(var t in e)if(T.has(e,t))return!1;return!0},T.isElement=function(e){return!!e&&e.nodeType===1},T.isArray=E||function(e){return l.call(e)=="[object Array]"},T.isObject=function(e){return e===Object(e)},N(["Arguments","Function","String","Number","Date","RegExp"],function(e){T["is"+e]=function(t){return l.call(t)=="[object "+e+"]"}}),T.isArguments(arguments)||(T.isArguments=function(e){return!!e&&!!T.has(e,"callee")}),typeof /./!="function"&&(T.isFunction=function(e){return typeof e=="function"}),T.isFinite=function(e){return T.isNumber(e)&&isFinite(e)},T.isNaN=function(e){return T.isNumber(e)&&e!=+e},T.isBoolean=function(e){return e===!0||e===!1||l.call(e)=="[object Boolean]"},T.isNull=function(e){return e===null},T.isUndefined=function(e){return e===void 0},T.has=function(e,t){return c.call(e,t)},T.noConflict=function(){return e._=t,this},T.identity=function(e){return e},T.times=function(e,t,n){for(var r=0;r<e;r++)t.call(n,r)},T.random=function(e,t){return t==null&&(t=e,e=0),e+(0|Math.random()*(t-e+1))};var _={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;"}};_.unescape=T.invert(_.escape);var D={escape:new RegExp("["+T.keys(_.escape).join("")+"]","g"),unescape:new RegExp("("+T.keys(_.unescape).join("|")+")","g")};T.each(["escape","unescape"],function(e){T[e]=function(t){return t==null?"":(""+t).replace(D[e],function(t){return _[e][t]})}}),T.result=function(e,t){if(e==null)return null;var n=e[t];return T.isFunction(n)?n.call(e):n},T.mixin=function(e){N(T.functions(e),function(t){var n=T[t]=e[t];T.prototype[t]=function(){var e=[this._wrapped];return o.apply(e,arguments),F.call(this,n.apply(T,e))}})};var P=0;T.uniqueId=function(e){var t=P++;return e?e+t:t},T.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var H=/(.)^/,B={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"},j=/\\|'|\r|\n|\t|\u2028|\u2029/g;T.template=function(e,t,n){n=T.defaults({},n,T.templateSettings);var r=new RegExp([(n.escape||H).source,(n.interpolate||H).source,(n.evaluate||H).source].join("|")+"|$","g"),i=0,s="__p+='";e.replace(r,function(t,n,r,o,u){s+=e.slice(i,u).replace(j,function(e){return"\\"+B[e]}),s+=n?"'+\n((__t=("+n+"))==null?'':_.escape(__t))+\n'":r?"'+\n((__t=("+r+"))==null?'':__t)+\n'":o?"';\n"+o+"\n__p+='":"",i=u+t.length}),s+="';\n",n.variable||(s="with(obj||{}){\n"+s+"}\n"),s="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+s+"return __p;\n";try{var o=new Function(n.variable||"obj","_",s)}catch(u){throw u.source=s,u}if(t)return o(t,T);var a=function(e){return o.call(this,e,T)};return a.source="function("+(n.variable||"obj")+"){\n"+s+"}",a},T.chain=function(e){return T(e).chain()};var F=function(e){return this._chain?T(e).chain():e};T.mixin(T),N(["pop","push","reverse","shift","sort","splice","unshift"],function(e){var t=r[e];T.prototype[e]=function(){var n=this._wrapped;return t.apply(n,arguments),(e=="shift"||e=="splice")&&n.length===0&&delete n[0],F.call(this,n)}}),N(["concat","join","slice"],function(e){var t=r[e];T.prototype[e]=function(){return F.call(this,t.apply(this._wrapped,arguments))}}),T.extend(T.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}})}).call(this);
define("underscore-min", function(){});

define('playlist',['jquery', 'l2p', 'api', 'fM'], function ($, L2P, api, fM) {
	function Playlist(options, id, name) {
		var	that		= this;
		this.$this		= $(this);
		this.id			= id || Date.now();
		this.name		= name;
		this.games		= [];
		this.options	= $.extend({
			mode:	'countdown',
			loop:	0
		}, options);

		this.firstPlay	= true;
		this.playing	= false;
		this.playNow	= -1;
		this.loop		= -1;
		this.game_history_ids	= [];
		this.gameController;

		this.storage	= new L2P.storage('PlayList');
		this.storage.$this.on('update', function (e, name) {
			if(name === that.id) {
				that.load(true);
			}
		});
		this.load(false, name);
	}
	Playlist.prototype.load			= function (doReload, name) {
		var	that	= this,
			info	= this.storage.get(this.id, doReload);

		if(!info && !name) {
			api.get.lang(function (lang) {
				that.name	= lang.browse_my_playlist;
				that.games	= [];

				that.$this.trigger('update', []);
			}, ['browse_my_playlist']);
		} else {
			if(info) {
				this.name	= name || info.name;
				this.games	= info.games;
				if(name) {
					this.save();
				}
			} else {
				this.name	= name || '';
				this.games	= [];
			}
			this.$this.trigger('update', []);
		}
	};
	Playlist.prototype.save			= function () {
		if(this.games.length === 0) {
			this.storage.set(this.id, null);
		} else {
			this.storage.set(this.id, {
				name:	this.name,
				games:	this.games
			});
		}
		this.$this.trigger('update', []);
	};
	Playlist.prototype.addGame		= function (url, title) {
		var	game	= {url: url, title: title},
			i		= this.games.push(game);

		this.save();
		this.$this.trigger('add game', [game, i]);
	};
	Playlist.prototype.removeGame	= function (game) {
		var	i	= this.games.indexOf(game),
			game;
		if(i !== -1) {
			game	= this.games.splice(i, 1);

			this.save();
			this.$this.trigger('remove game', [game, i]);
		}
	};
	Playlist.prototype.start		= function () {
		this.game_history_ids	= [];
		this.loop				= -1;
		this.restart();
	};
	Playlist.prototype.restart		= function () {
		this.playing			= true;
		this.playNow			= -1;
		this.loop				+= 1;
		this.nextGame();
	};
	Playlist.prototype.startGame	= function (game) {
		var	that		= this,
			linkObject	= {
				title:			game.title,
				from_playlist:	true,
				autostart:		!this.firstPlay,
				use_countdown:	this.options.mode === 'countdown'
			};

		if(!this.gameController) {
			linkObject.onstart	= 'gameStart-'+Date.now();
			$(L2P).on(linkObject.onstart, function (e, gameController) {
				console.log(that, 'got new gameController');
				that.gameController	= gameController;

				$(that.gameController).on('gameEnd', function (e, gameInfo) {
					console.log('gameEnd', gameInfo.points, gameInfo);
					that.game_history_ids.push(gameInfo.game_history_id);
					that.nextGame();
				});
			});
		}
		fM.link.navigate(game.url, game.title, linkObject);
	};
	Playlist.prototype.nextGame		= function () {
		this.playNow	+= 1;
		var	game	= this.games[this.playNow];
		console.log('nextGame', game, this.playNow, this.games);
		if(game) {
			this.startGame(game);
			this.firstPlay	= false;
		} else {
			this.playNow	= -1;
			this.playing	= false;
			this.firstPlay	= true;

			if(this.options.loop === -1 || this.loop < this.options.loop) {
				this.firstPlay	= false;
				this.restart();
			} else {
				console.log('playlist done', this.game_history_ids, this);
				api.get.statistic_uuid(function (data) {
					fM.link.navigate('/user/'+L2P_global.username+'/statistics/'+data.uuid+'/');
				}, {
					game_history_ids:	this.game_history_ids.join(',')
				});
			}
		}
	};
	Playlist.prototype.clear		= function () {
		this.games	= [];
		this.storage.set(this.id, this.games);

		this.save();
		this.$this.trigger('clear', []);
	};

	return Playlist;
});
define('l2p',['jquery', 'api', 'game/options', 'bootstrap.min'], function ($, api, options) {
	function goBack(e, doGoBack) {
		if(doGoBack !== false) {
			window.history.back();
		}
	}
	function getAjax(urlAjax, callback) {
		$.get(urlAjax, callback);
	}

	var	gameController,
		svgContainer,
		sound,
		playlist,
		socket,
		$controller,
		$toggleGame;

	function Render($container, loader, render, kill) {
		this.$container	= $container;
		this.loader		= loader;
		this.render		= render;
		this.kill		= kill;
		this.updates	= [];

		this.loader.call(this);
	}
	Render.prototype.reload	= function () {
		var	render	= this;
		this.render.call(this);
		this.updates.forEach(function (update) {
			update.call(render);
		});
	};
	Render.prototype.kill	= function () {
		this.kill.call(this);
	};
	Render.prototype.onUpdate	= function (func) {
		this.updates.push(func);
	};

	function ControllerSet(type) {
		if($toggleGame === undefined) {
			if($controller === undefined) {
				$controller	= $('.ContentBoxGameControl');
			}
			$toggleGame	= $controller.find('td[data-action="toggle-game"]');
		}
		if(type === 'play') {
			//$toggleGame.find('.ContentBoxGameControl-playpause').text(L2P_global.lang.global_play);
			//$toggleGame.find('img').attr('src', '/img/icons/play-white.svg');
			$toggleGame.removeClass('can_pause');
		} else if(type === 'restart') {
			//$toggleGame.find('.ContentBoxGameControl-playpause').text(L2P_global.lang.global_play_again);
			//$toggleGame.find('img').attr('src', '/img/icons/play-white.svg');
			$toggleGame.removeClass('can_pause');
		} else if(type === 'pause') {
			//$toggleGame.find('.ContentBoxGameControl-playpause').text(L2P_global.lang.global_pause);
			//$toggleGame.find('img').attr('src', '/img/icons/pause-white.svg');
			$toggleGame.addClass('can_pause');
		}
	}

	var	L2P	= {
		$modal:	undefined,
		gameController:	undefined,
		dialog:	{
			action:	function (url, title, html, color, submitText, normalPost, callback) {
				api.get.lang(function (lang) {
					require(['fM', 'text!templates/modal.html'], function (fM, modalText) {
						L2P.$modal	= $(modalText).addClass('modal-action');
						L2P.$modal.find('.modal-header').css('background-color', color).find(' h2').text(title);
						L2P.$modal.find('.modal-body').html(html);
						if(submitText === '') {
							L2P.$modal.find('.modal-footer button.btn-primary').remove();
						} else {
							L2P.$modal.find('.modal-footer button.btn-primary').html(submitText);
						}
						L2P.$modal.find('button.btn[data-dismiss]').text(lang.global_button_close);

						if(normalPost) {

							var	action	= url || document.location.pathname;
							if(location.search.substring(1) !== '')
							{
								action += "?" + getQuerlocation.search.substring(1);
							}

							L2P.$modal.attr('action', action).attr('method', 'post');
						}

						function onSubmit(a, b, c) {
							if(callback) {
								var	response	= callback.call(this, a, b, c);
								if(response !== false && typeof(response) !== 'function') {
									//L2P.$modal.modal('hide');
								} else if(typeof(response) === 'function') {
									response(function (shouldHide) {
										if(shouldHide) {
											//L2P.$modal.modal('hide');
										}
									});
								}
							}
							return normalPost ? true : false;
						}

						L2P.$modal.modal('show');
						L2P.$modal.on('submit', onSubmit);

						var	pathname	= location.pathname;
						L2P.$modal.on('hide', function () {
							if(location.pathname === pathname) {
								fM.link.navigate('/');
							}
						});

						fM.form.autofocus(L2P.$modal);

						fM.link.navigated(url, title, {
							is_dialog:	true
						});
						var	parent	= fM.link.getParent();
						if(parent && parent.is_dialog) {
							L2P.$modal
								.find('.modal-header-back-icon')
									.addClass('modal-header-back-icon--clickable')
									.on('click', function () {
										window.history.back();
									});
						}
					});
				}, ['global_button_close']);
			},
			info: function (url, title, html, color, buttons, script) {
				api.get.lang(function (lang) {
					var	requireScripts	= ['fM', 'text!templates/info.html'];
					if(script) {
						requireScripts.push('dialog/info/'+script);
					}
					require(requireScripts, function (fM, modalText, infoScript) {
						if(L2P.$modal) {
							//L2P.$modal.off('hide').modal('hide');
						}
						L2P.$modal	= $(modalText).addClass('modal-info');
						L2P.$modal.find('.modal-header').css('background-color', color).find(' h2').text(title);
						L2P.$modal.find('.modal-body').html(html);
						var	$modalFooter	= L2P.$modal.find('.modal-footer');
						if(buttons) {
							buttons.forEach(function (button) {
								$modalFooter.prepend('<button class="btn">'+button+'</button>');
							});
						}
						L2P.$modal.find('button.btn[data-dismiss]').text(lang.global_button_close);

						var	pathname	= location.pathname;
						L2P.$modal.on('hide', function () {
							if(location.pathname === pathname) {
								fM.link.navigate('/');
							}
						});

						fM.link.navigated(url, title, {
							is_dialog:	true
						});
						var	parent	= fM.link.getParent();
						if(parent && parent.is_dialog) {
							L2P.$modal
								.find('.modal-header-back-icon')
									.addClass('modal-header-back-icon--clickable')
									.on('click', function () {
										window.history.back();
									});
						}

						L2P.$modal.modal('show');

						if(infoScript) {
							infoScript(L2P.$modal);
						}
					});
				}, ['global_button_close']);
			},
			game: function (url, title, data, type, octave, callback) {
				var	$body_container	= $('body'),
					$game_container	= $('#game_container'),
					then;

				if(L2P.$modal && L2P.$modal.is(':visible')) {
					//L2P.$modal.trigger('hide-no-back');
				}

				require(['fM', 'text!templates/game.html', 'game/game-controller', 'game/sound', 'sound-input', 'compass', 'underscore-min'], function (fM, gameText, GameController, Sound, SoundInput, Compass) {
					var	generate	= !L2P.gameController,
						$compassBox	= $('div.ContentBoxGameCompass'),
						compass		= new Compass($compassBox),
						state		= fM.link.getCurrentNavigate() || {};

					L2P.resetBoxText($('#song_title'));
					L2P.resetBoxText($('#scale_title'));

					state.is_game	= true;

					if(generate) {
						$game_container.html(gameText);
					}
					$body_container.addClass('ShowGame');
					$body_container.addClass(type);
					$body_container.removeClass(type === 'song' ? 'scale' : 'song');

					svgContainer	= $game_container.find('#svg_container')[0];
					if($controller === undefined) {
						$controller	= $('.ContentBoxGameControl');
					}
					if($toggleGame === undefined) {
						$toggleGame	= $controller.find('td[data-action="toggle-game"]');
					}
					var	$speed		= $controller.find('input[name="bpm"]'),
						$speedShow	= $game_container.find('#speedShow'),
						$startGame	= $game_container.find('#startGame'),
						$stopGame	= $game_container.find('#stopGame'),
						$game_title	= type === 'song' ? $('#song_title') : $('#scale_title');

					$game_title.html(title);

					if(generate) {
						if(!sound) {
							sound	= new Sound();
						}

						L2P.gameController			= new GameController(svgContainer);
						L2P.gameController.sound	= sound;
					}

					compass.setTone(options.tones.names[4]['A']);
					compass.show();
					L2P.gameController.compass	= compass;

					$speed.on('change', function () {
						L2P.gameController.setGameSpeed(+this.value);
					});
					if(generate) {
						$(L2P.gameController).on({
							gameLoadSpeedChange:	function (e, speed) {
								$speed.val(speed).trigger('change');
							},
							gameStart:	function () {},
							gameEnd:	function (e, gameInfo) {
								var	currentState	= fM.link.getCurrent() || {};

								if(!currentState || !currentState.from_playlist) {
									api.get.statistic_uuid(function (data) {
										fM.link.navigate('/user/'+L2P_global.username+'/statistics/'+data.uuid+'/');
									}, {
										game_history_ids:	gameInfo.game_history_id
									});
								}
								ControllerSet('restart');
							},
							notePoints:	function (note) {
								//console.log(note);
							}
						});

						$startGame.on('click', $.proxy(L2P.gameController.startGame, L2P.gameController));
						$stopGame.on('click', $.proxy(L2P.gameController.stopGame, L2P.gameController));
						$toggleGame.on('click', function () {
							if(L2P.gameController.game && !L2P.gameController.game.running) {
								L2P.gameController.startGame();

								ControllerSet('pause');
							} else {
								L2P.gameController.stopGame();

								ControllerSet('play');
							}
						});
					}

					ControllerSet('play');

					L2P.gameController.importGame(data, title, octave);
					if(url) {
						L2P.gameController.permlink	= url.match(/\/game\/([^\/]+)/g)[0].substr(6);
					} else {
						L2P.gameController.permlink	= location.href.match(/\/game\/([^\/]+)/g)[0].substr(6);
					}

					if(generate) {
						SoundInput(function (e) {
							console.log(e);
						}, $.proxy(L2P.gameController.soundInput, L2P.gameController), $.proxy(L2P.gameController.expectedTone, L2P.gameController));
					}

					state.is_game	= true;
					fM.link.navigated(url, title, state);

					if(state) {
						if(state.autostart) {
							L2P.gameController.useCountdown	= state.use_countdown || state.use_countdown === undefined;
							L2P.gameController.startGame();
						}
						if(state.onstart) {
							$(L2P).trigger(state.onstart, [L2P.gameController]);
						}
					}

					if(callback) {
						callback(L2P.gameController);
					}
				});
			}
		},
		form:	{
			inputValidation:	{
				error:	function (inputName) {
					$('input[data-content][data-content!=""]' + (inputName ? '[name="'+inputName+'"]' : '')).each(function () {
						var	that		= this,
							clientRects	= this.getClientRects();

						if(clientRects.length > 0) {
							var	placement	= (clientRects[0].right + 240) > document.width ? 'left' : 'right';

							$(this).popover({
								trigger:	'focus',
								placement:	placement
							}).popover('show');
						} else { // We most sure have a dialog
							if(inputName === undefined) { // Only do this once
								setTimeout(function () {
									L2P.form.inputValidation.error(that.name);
								}, 200);
							}
						}
					});
				}
			}
		},
		resetBoxText:	function ($box) {
			$box.html($box.attr('data-default-text'));
		},
		navigate:	{
			home:	function (e) {
				var	$body_container		= $('body'),
					$CenteringContainer	= $('#CenteringContainer'),
					title				= $CenteringContainer.attr('data-default-title');

				require(['fM'], function (fM) {
					L2P.resetBoxText($('#song_title'));
					L2P.resetBoxText($('#scale_title'));
					$body_container.removeClass('ShowGame');
					$body_container.removeClass('song');
					$body_container.removeClass('scale');

					fM.link.navigated('/', title, {
						title:	title
					});

					if(L2P.$modal && false) {
						//L2P.$modal.off('hide', goBack);
						//L2P.$modal.modal('hide');
					}
				});
			},
			url:	function (url) {
				var	that	= this,
					urlAjax	= '/dialog'+url;

				getAjax(urlAjax, function (data) {
					switch(data.dialogType) {
						case 'action':
							L2P.dialog.action(url, data.title, data.body, data.color, data.submitText, true);
							break;
						case 'info':
							L2P.dialog.info(url, data.title, data.body, data.color, data.buttons, data.script);
							break;
						case 'game':
							if(that && that.nodeName === 'IMG') {
								L2P.get.playlist(null, function () {
									playlist.addGame(url, data.title, data.data, data.type);
								});
							} else {
								L2P.dialog.game(url, data.title, data.data, data.type, data.octave);
							}
							break;
					}
				});
			}
		},
		countdown: function (sec, text, next, illustration, callback) {
			var	$countdownBox	= $('body > div.countdown-box').remove(),
				i				= sec;

			$countdownBox	= $('body').append('<div class="countdown-box opacity0"><div class="countdown-number animateCountdown"></div><div class="countdown-next"></div><div class="countdown-illustration"></div></div>').find('> div.countdown-box');

			var	$textBox	= $countdownBox.css('opacity', 1).addClass('countdown').find('> div.countdown-number').text(i),
				$nextBox	= $countdownBox.find('> div.countdown-next').text(next),
				$illuBox	= $countdownBox.find('> div.countdown-illustration').html(illustration),
				interval;

			function decrement() {
				i	-= 1;
				if(i === 0) {
					clearInterval(interval);
					$textBox.text(text).removeClass('animateCountdown');
					setTimeout(function () {
						$countdownBox.css('opacity', 0);

						setTimeout(function () {
							callback();
						}, 250);
						setTimeout(function () {
							$countdownBox.hide().removeClass('countdown');
						}, 1000);
					}, 500);
				} else {
					$textBox.text(i);
				}
			}
			interval	= setInterval(decrement, 1000);
		},
		funcs:	{
			tones:	{
				freqDiffToTone: function (tone, freq, rel) {
					var	diff		= tone.hz - freq,
						diffAbs		= Math.abs(diff),
						otherTone,
						toneDiffs,
						ratio,
						ratioRel;

					otherTone	= L2P.funcs.tones.getClosestTone(tone, diff < 0);

					toneDiffs	= Math.abs(otherTone.hz - tone.hz),
					ratio		= diff / toneDiffs,
					ratioRel	= (diffAbs - rel) / (toneDiffs - rel);

					return {
						toneAbove:	diff < 0,
						diff:		diff,
						diffAbs:	diffAbs,
						otherTone:	otherTone,
						toneDiffs:	toneDiffs,
						ratio:		ratio,
						ratioRel:	ratioRel
					}
				},
				getClosestTone:	function (tone, higher) {
					var	pos	= options.tones.all.indexOf(tone),
						t;

					if(higher) {
						t	= options.tones.all[pos - 1];
						if(t) {
							if(t.hz === tone.hz) {
								t	= options.tones.all[pos - 2]
							}
						} else {
							t	= tone;
						}
					} else {
						t	= options.tones.all[pos + 1];
						if(t) {
							if(t.hz === tone.hz) {
								t	= options.tones.all[pos + 2]
							}
						} else {
							t	= tone;
						}
					}

					return t;
				},
				getCloseTone:	function (freq, defTone, tone) {
					var	octav, tempTone, diff, closestTone, closestDiff, closestFreq, newTone, newFreq, octavDiff, defToneType, defTonePos, defToneClose;

					if(defTone && tone && defTone.name !== tone.name && defTone.name.length === 2) {
						defToneType	= defTone.name.substr(1, 1);
						defTonePos	= options.tones.all.indexOf(defTone);

						if(defToneType === '#') {
							defToneClose	= options.tones.all[defTonePos + 1];
						} else if(defToneType === 'b') {
							defToneClose	= options.tones.all[defTonePos - 1];
						}

						if(defToneClose.name === tone.name) {
							defTone	= defToneClose;
						}
					}

					for(octav = 3; octav <= 6; octav += 1) {
						tempTone	= options.tones.names[octav][tone.name];
						if(tempTone) {
							diff	= Math.abs(tempTone.hz - freq);
							if(closestDiff === undefined || diff < closestDiff) {
								closestDiff	= diff;
								closestTone	= tempTone;
							}
						}
					}

					if(closestTone && defTone) {
						octavDiff	= tone.octav - closestTone.octav;
						if(options.tones.names[defTone.octav + octavDiff] === undefined) {
							console.error('TONE NOT FOUND', defTone.octav, octavDiff, defTone.octav + octavDiff);
						}
						newTone	= options.tones.names[defTone.octav + octavDiff][defTone.name];
						newFreq	= freq * Math.pow(2, octavDiff)
					}

					return {
						tone:	newTone || defTone,
						freq:	newFreq || freq
					}
				},
				getStepFactor:	function (percent) {
					var	stepFactor;
					L2P.steps.forEach(function (step) {
						if(!stepFactor && percent >= step.percent) {
							stepFactor	= step;
						}
					});

					return stepFactor;
				}
			}
		},
		storage: (function () {
			var	containers	= {},
				lastPing	= 0;

			function ping() {
				var	namespaces	= [],
					namespace;
				for(namespace in containers) {
					if(containers.hasOwnProperty(namespace)) {
						namespaces.push(namespace);
					}
				}

				if(namespaces.length > 0) {
					$.get('/api/get.storage.php', {
						namespaces:	namespaces
					}, function (data) {
						var	name;
						for(namespace in data) {
							if(data.hasOwnProperty(namespace)) {
								for(name in data[namespace]) {
									containers[namespace][0][0].set(name, data[namespace][name], true);
								}
							}
						}
					});
				}
			}
			setInterval(ping, 2000);

			function Storage(namespace) {
				this.namespace	= namespace;
				this.$this		= $(this);
				this.reload();
			}
			Storage.prototype.reload	= function () {
				this._storage	= JSON.parse(localStorage.getItem(this.namespace) || '{}');
			};
			Storage.prototype.set		= function (name, value, fromPing) {
				var	that				= this;

				if(value === null) {
					delete this._storage[name];
				} else {
					this._storage[name]		= value;
				}

				if(fromPing && localStorage.getItem(this.namespace) === JSON.stringify(this._storage)) {
					return;
				}
				console.log('save', fromPing, this._storage);
				localStorage.setItem(this.namespace, JSON.stringify(this._storage));

				containers[this.namespace].forEach(function ($storage, i) {
					if($storage !== that.$this || fromPing) {
						$storage[0].reload();
						$storage.trigger('update', [name]);
					}
				});

				if(!fromPing) {
					$.post('/api/save.storage.php', {
						namespace:	this.namespace,
						data:		this._storage
					});
				}

				return this;
			};
			Storage.prototype.get		= function (name, doReload) {
				if(doReload) {
					this.reload();
				}
				return this._storage[name];
			};
			Storage.prototype.getAll	= function (doReload) {
				if(doReload) {
					this.reload();
				}
				return this._storage;
			};

			var	storage	= (function (namespace) {
				var	storage				= new Storage(namespace),
					storageContainer	= containers[namespace] || [];

				storageContainer.push(storage.$this);

				containers[namespace]	= storageContainer;

				return storage;
			});

			return storage;
		}()),
		render:	{
			playlist:	function (playlist, $container) {
				return new Render($container, function () {
					var	that	= this,
						lang	= {};
					this.$container
						.html([
							'<div>',
								'<div></div>',
								'<table>',
									'<tbody>',
									'</tbody>',
								'</table>',
							'</div>',
							'<form class="form-inline" name="play_options">',
								'<label></label>',
								'<select name="loops"></select>',
							'</div>'
						].join(''));

					this.$tbody	= $container.find('tbody');
					this.$tbody.on('click', '.removeFromPlaylist', function () {
						var	$this	= $(this),
							game	= $this.parents('tr').data('game')

						playlist.removeGame(game);
					});

					var	$loops	= this.$container.find('[name="loops"]');
					for(var loop_no = 1; loop_no <= 10; loop_no += 1) {
						$('<option></option>')
							.attr('value', loop_no)
							.text(loop_no)
							.appendTo($loops);
					}

					api.get.lang(function (lang) {
						that.lang			= lang;

						that.$container
							.find('form[name="play_options"] label').text(lang.browse_loops);

						that.render.call(that);
					}, ['global_delete', 'browse_loops']);

					that.reloadProxy	= $.proxy(that.reload, that);

					playlist.$this.on('update', this.reloadProxy);
				}, function () {
					var	that	= this;
					this.$tbody.empty();

					this.$container
						.find('div > div')
						.text(playlist.name);

					playlist.games.forEach(function (game) {
						var	urlInfo	= game.url.split('/'),
							octave	= urlInfo[3] || 0;
						$([
							'<tr>',
								'<td>',
									'<a data-dialog="game">',
										'<span class="octave"></span>',
										'<span class="title"></span>',
									'</a>',
								'</td>',
								'<td><img src="/img/icons/trash.svg" class="removeFromPlaylist" /></td>',
							'</tr>',
						].join(''))
						.data('game', game)
						.appendTo(that.$tbody)
						.find('a[data-dialog="game"]')
							.attr('href', game.url)
							.find('span.octave')
								.text(octave === 0 ? '' : '(Octave '+octave+') ')
								.end()
							.find('span.title')
								.text(game.title)
								.end()
							.end()
						.find('img.removeFromPlaylist')
							.attr('title', that.lang.global_delete)
							.end();
					});
				}, function () {
					playlist.$this.off('update', this.reloadProxy);
				});
			}
		},
		click:	{
			on:		function (e) {
				e.preventDefault();
				var	that		= this,
					$this		= that.nodeName === 'IMG' ? $(this).next() : $(this),
					urlRaw		= $this.attr('href'),
					url			= urlRaw+(urlRaw.indexOf('?') === -1 ? (urlRaw.substr(urlRaw.length - 1, 1) === '/' ? '' : '/') : ''),
					title		= $this.attr('data-title');

				require(['fM'], function (fM) {
					if(that && that.nodeName === 'IMG') {
						L2P.get.playlist(null, function () {
							playlist.addGame(url, title);
						});
					} else {
						fM.link.navigate(url, 'Play.now', {
							title:	'Play.now'
						});
					}
				});
			},
			set:	function ($container) {
				$container.on('click', 'a[data-dialog], img.addToPlaylist', L2P.click.on);
			}
		},
		get:	{
			playlist:	function (id, callback, name) {
				require(['playlist'], function (Playlist) {
					if(!playlist || id) {
						if(id === 'new') {
							id	= undefined;
						} else if(!playlist) {
							var	playlists	= L2P.get.playlists();
							for(id in playlists) {
								break;
							}
						}
						//console.log(id);
						playlist	= new Playlist({}, id, name);
					}

					callback(playlist);
				});
			},
			playlists:	function () {
				var	storage	= L2P.storage('PlayList');

				return storage.getAll(true);
			}
		},
		io:		function () {
			if(!socket) {
				socket	= io.connect('http://l2p.fmads.dk:10001');
			}

			return socket;
		},
		steps: [
			{
				percent:	95,
				factor:		1,
				text:		'Perfect',
				color:		'#090'
			},
			{
				percent:	80,
				factor:		0.95,
				text:		'Good',
				color:		'#0D0'
			},
			{
				percent:	60,
				factor:		0.9,
				text:		'Fair',
				color:		'#FF0'
			},
			{
				percent:	45,
				factor:		0.8,
				text:		'Average',
				color:		'#990'
			},
			{
				percent:	30,
				factor:		0.65,
				text:		'Poor',
				color:		'#F90'
			},
			{
				percent:	10,
				factor:		0.65,
				text:		'Rubbish',
				color:		'#C60'
			},
			{
				percent:	0,
				factor:		0.65,
				text:		'Miserable',
				color:		'#900'
			}
		]
	};

	return L2P;
});
define('fragments/game',['jquery', 'api', 'game/game-controller', 'game/sound', 'sound-input'], function ($, api, GameController, Sound, SoundInput) {
	var	games			= [],
		svgContainer,
		gameController;

	function loadGame(e) {
		var gameId  = +this.getAttribute('data-game-id'),
			game    = games.filter(function (game) { return game.id == gameId; })[0];

		gameController.importGame(game.game);
	}

	$(document).ready(function () {
		svgContainer			= document.getElementById('svg_container');
		gameController			= new GameController(svgContainer);
		gameController.sound	= new Sound();

		$('#gamesBox').on('click', 'a[data-game-id]', loadGame);
		$('#startGame').on('click', $.proxy(gameController.startGame, gameController));
		$('#stopGame').on('click', $.proxy(gameController.stopGame, gameController));
		$('#exportGame').on('click', function () {
			console.log(JSON.stringify(gameController.exportGame()));
		});
		$('#speed').on('change', function () {
			gameController.setGameSpeed(+this.value);
			$('#speedShow').html(+this.value);
		});
		$(gameController).on({
			gameLoadSpeedChange:	function (e, speed) {
				$('#speed').val(speed).trigger('change');
			}
		});

		api.get.games(function (gotGames) {
			var gamesBox    = document.getElementById('gamesBox'),
				html        = '';

			games   = gotGames;

			var html = Array.prototype.map.call(gotGames, function (game) {
				return '<a href="#/' + game.id + '" data-game-id="' + game.id + '">' + game.title + '</a>';
			}).join(',&nbsp;');

			gamesBox.innerHTML  = html;
		});
	});

	return gameController;
});
var svgController,
	l2p,
	fm;
require.config({
	paths:	{
		'jquery':		'jquery-2.0.2.min'
	},
	shim:	{
		highcharts:	{
			exports:	'Highcharts'
		}
	}
});
require(['jquery', 'browserdetect'], function ($, AC) {
	var	$intro;
	if(!AC.Detector.isChrome() || (AC.Detector.isWin() && !AC.Detector.winAtLeastVersion(6))) {
		require(['bootstrap.min'], function () {
			if(location.host !== 'l2p.fmads.dk') {
				$([
					'<div id="system_requirements">',
						'<h1>System Requirements</h1>',
						'<ul>',
							'<li>Windows Vista or newer</li>',
							'<li>Chrome version 27 or newer</li>',
						'</ul>',
					'</div>'
				].join('')).modal({
					backdrop:	'static',
					keyboard:	false,
					show:		true
				});
				return;
			}
		});
	}
	$intro	= $('#intro');

	if($intro.length > 0) {
		$intro.addClass('ready');
		setTimeout(function () {
			$intro.remove();
		}, 2000);
	}

	require(['fM', 'l2p'], function (fM, L2P) {
		l2p	= L2P;
		fm	= fM;
		switch(fM.link.fileName()) {
			case 'game.php':
				require(['fragments/game']);
				break;
		}

		$(function () {
			var	$CenteringContainer	= $('#CenteringContainer');
			L2P.click.set($CenteringContainer);

			$CenteringContainer.on('click', 'a[data-internal-navigation]', function (e) {
				e.preventDefault();
				var	$this		= $(this),
					navigateTo	= $this.attr('data-internal-navigation'),
					url			= $this.attr('href');

				fM.link.navigate(url, 'Play.now', {
					title:	'Play.now'
				});

				return false;
			});
			function popstateTitle(e) {
				var	state;
				if(e && e.originalEvent && e.originalEvent.state) {
					state	= e.originalEvent.state;
					if(state.title === true) {
					} else if(state.title) {
						document.title	= state.title;
					} else {
						document.title	= $CenteringContainer.attr('data-default-title');
					}
				} else {
					document.title	= $CenteringContainer.attr('data-default-title');
				}
			}
			var	hasFirstPopstate	= true; //false;
			$(window).on('popstate', function (e, a, b, c) {
				if(L2P.$modal && L2P.$modal.is(':visible')) {
					L2P.$modal.modal('hide');
				}
				if(hasFirstPopstate) {
					popstateTitle(e);
				}
				switch(document.location.pathname) {
					case '/':
						L2P.navigate.home(e, false);
						break;
					default:
						if(hasFirstPopstate) {
							L2P.navigate.url(location.pathname, false);
						}
						break;
				}
				hasFirstPopstate	= true;
			});
			$(window).trigger('popstate');

			$('#DialogContainer').each(function () {
				var	$this		= $(this),
					dialogType	= $this.attr('data-dialog');

				switch(dialogType) {
					case 'action':
						var	title		= $this.attr('data-dialog-title'),
							submitText	= $this.attr('data-dialog-submit-text'),
							color		= $this.attr('data-dialog-color'),
							html		= $this.html();

						L2P.dialog[dialogType](false, title, html, color, submitText, true);
						break;
					case 'info':
						var	title	= $this.attr('data-dialog-title'),
							buttons	= JSON.parse($this.attr('data-dialog-buttons')),
							color	= $this.attr('data-dialog-color'),
							script	= $this.attr('data-dialog-script'),
							html	= $this.html();

						L2P.dialog[dialogType](false, title, html, color, buttons, script);
						break;
					case 'game':
						var	gameData	= JSON.parse($this.attr('data-game-data')),
							title		= $this.attr('data-game-title'),
							type		= $this.attr('data-game-type');

						L2P.dialog[dialogType](false, title, gameData, type);
						break;
				}
			});

			L2P.form.inputValidation.error();
			$('form:first').each(function () {
				fM.form.autofocus(this);
			});
		});
	});
});
define("main", function(){});
