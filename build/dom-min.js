/*
Copyright 2011, KISSY UI Library v1.20dev
MIT Licensed
build time: Aug 5 21:18
*/
KISSY.add("dom/attr",function(n,c,t,q){function z(g,b){b=A[b]||b;var f=u[b];if(!g)return q;return f&&f.get?f.get(g,b):g[b]}t=document.documentElement;var B=!t.hasAttribute,w=t.textContent!==q?"textContent":"innerText",j=c._isElementNode,k=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,p=/^(?:button|input|object|select|textarea)$/i,x=/^a(?:rea)?$/i,i=/:|^on/,o=/\r/g,m={},v={val:1,css:1,html:1,text:1,data:1,width:1,height:1,
offset:1},y={tabindex:{get:function(g){var b=g.getAttributeNode("tabindex");return b&&b.specified?parseInt(b.value,10):p.test(g.nodeName)||x.test(g.nodeName)&&g.href?0:q}},style:{get:function(g){return g.style.cssText},set:function(g,b){g.style.cssText=b}}},A={tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},
E={get:function(g,b){return c.prop(g,b)?b.toLowerCase():q},set:function(g,b,f){if(b===false)c.removeAttr(g,f);else{b=A[f]||f;if(b in g)g[b]=true;g.setAttribute(f,f.toLowerCase())}return f}},u={},l={},s={option:{get:function(g){var b=g.attributes.value;return!b||b.specified?g.value:g.text}},select:{get:function(g){var b=g.selectedIndex,f=g.options;g=g.type==="select-one";if(b<0)return null;else if(g)return c.val(f[b]);b=[];g=0;for(var a=f.length;g<a;++g)f[g].selected&&b.push(c.val(f[g]));return b},
set:function(g,b){var f=n.makeArray(b);n.each(g.options,function(a){a.selected=n.inArray(c.val(a),f)});if(!f.length)g.selectedIndex=-1;return f}}};if(B){l={get:function(g,b){var f;return(f=g.getAttributeNode(b))&&f.nodeValue!==""?f.nodeValue:q},set:function(g,b,f){if(g=g.getAttributeNode(f))g.nodeValue=b}};m=A;y.tabIndex=y.tabindex;n.each(["href","src","width","height","colSpan","rowSpan"],function(g){y[g]={get:function(b){b=b.getAttribute(g,2);return b===null?q:b}}});s.button=y.value=l}n.each(["radio",
"checkbox"],function(g){s[g]={get:function(b){return b.getAttribute("value")===null?"on":b.value},set:function(b,f){if(n.isArray(f))return b.checked=n.inArray(c.val(b),f)}}});n.mix(c,{prop:function(g,b,f){if(n.isPlainObject(b))for(var a in b)c.prop(g,a,b[a]);else{g=c.query(g);b=A[b]||b;var d=u[b];if(f!==q)n.each(g,function(e){if(d&&d.set)d.set(e,f,b);else e[b]=f});else if(g=g[0])return z(g,b)}},hasProp:function(g,b){return z(g,b)!==q},removeProp:function(g,b){b=A[b]||b;c.query(g).each(function(f){try{f[b]=
q;delete f[b]}catch(a){}})},attr:function(g,b,f,a){if(n.isPlainObject(b)){a=f;for(var d in b)c.attr(g,d,b[d],a)}else if(b=n.trim(b)){b=b.toLowerCase();if(a&&v[b])return c[b](g,f);b=m[b]||b;var e;e=k.test(b)?E:i.test(b)?l:y[b];if(f===q){g=c.get(g);if(j(g)){if(g.nodeName.toLowerCase()=="form")e=l;if(e&&e.get)return e.get(g,b);g=g.getAttribute(b);return g===null?q:g}}else n.each(c.query(g),function(h){if(j(h))e&&e.set?e.set(h,f,b):h.setAttribute(b,""+f)})}},removeAttr:function(g,b){b=b.toLowerCase();
b=m[b]||b;n.each(c.query(g),function(f){if(j(f)){var a;f.removeAttribute(b);if(k.test(b)&&(a=A[b]||b)in f)f[a]=false}})},hasAttr:B?function(g,b){b=b.toLowerCase();var f=c.get(g).getAttributeNode(b);return!!(f&&f.specified)}:function(g,b){b=b.toLowerCase();return c.get(g).hasAttribute(b)},val:function(g,b){var f,a;if(b===q){var d=c.get(g);if(d){if((f=s[d.nodeName.toLowerCase()]||s[d.type])&&"get"in f&&(a=f.get(d,"value"))!==q)return a;a=d.value;return typeof a==="string"?a.replace(o,""):a==null?"":
a}}else c.query(g).each(function(e){if(e.nodeType===1){var h=b;if(h==null)h="";else if(typeof h==="number")h+="";else if(n.isArray(h))h=n.map(h,function(r){return r==null?"":r+""});f=s[e.nodeName.toLowerCase()]||s[e.type];if(!f||!("set"in f)||f.set(e,h,"value")===q)e.value=h}})},text:function(g,b){if(b===q){var f=c.get(g);if(j(f))return f[w]||"";else if(c._nodeTypeIs(f,3))return f.nodeValue;return q}else n.each(c.query(g),function(a){if(j(a))a[w]=b;else if(c._nodeTypeIs(a,3))a.nodeValue=b})}});return c},
{requires:["./base","ua"]});
KISSY.add("dom/base",function(n,c){function t(q,z){return q&&q.nodeType===z}return{ELEMENT_NODE:1,ATTRIBUTE_NODE:2,TEXT_NODE:3,CDATA_SECTION_NODE:4,ENTITY_REFERENCE_NODE:5,ENTITY_NODE:6,PROCESSING_INSTRUCTION_NODE:7,COMMENT_NODE:8,DOCUMENT_NODE:9,DOCUMENT_TYPE_NODE:10,DOCUMENT_FRAGMENT_NODE:11,NOTATION_NODE:12,_isElementNode:function(q){return t(q,1)},_getWin:function(q){return q&&"scrollTo"in q&&q.document?q:t(q,9)?q.defaultView||q.parentWindow:q===c||q===null?window:false},_nodeTypeIs:t,_isNodeList:function(q){return q&&
!q.nodeType&&q.item&&!q.setTimeout}}});
KISSY.add("dom/class",function(n,c,t){function q(w,j,k,p){if(!(j=n.trim(j)))return p?false:t;w=c.query(w);var x=w.length,i=j.split(z);j=[];for(var o=0;o<i.length;o++){var m=n.trim(i[o]);m&&j.push(m)}for(o=0;o<x;o++){i=w[o];if(c._isElementNode(i)){i=k(i,j,j.length);if(i!==t)return i}}if(p)return false;return t}var z=/[\.\s]\s*\.?/,B=/[\n\t]/g;n.mix(c,{hasClass:function(w,j){return q(w,j,function(k,p,x){if(k=k.className){k=(" "+k+" ").replace(B," ");for(var i=0,o=true;i<x;i++)if(k.indexOf(" "+p[i]+
" ")<0){o=false;break}if(o)return true}},true)},addClass:function(w,j){q(w,j,function(k,p,x){var i=k.className;if(i){var o=(" "+i+" ").replace(B," ");i=i;for(var m=0;m<x;m++)if(o.indexOf(" "+p[m]+" ")<0)i+=" "+p[m];k.className=n.trim(i)}else k.className=j},t)},removeClass:function(w,j){q(w,j,function(k,p,x){var i=k.className;if(i)if(x){i=(" "+i+" ").replace(B," ");for(var o=0,m;o<x;o++)for(m=" "+p[o]+" ";i.indexOf(m)>=0;)i=i.replace(m," ");k.className=n.trim(i)}else k.className=""},t)},replaceClass:function(w,
j,k){c.removeClass(w,j);c.addClass(w,k)},toggleClass:function(w,j,k){var p=n.isBoolean(k),x;q(w,j,function(i,o,m){for(var v=0,y;v<m;v++){y=o[v];x=p?!k:c.hasClass(i,y);c[x?"removeClass":"addClass"](i,y)}},t)}});return c},{requires:["dom/base"]});
KISSY.add("dom/create",function(n,c,t,q){function z(a,d){if(n.isPlainObject(d))if(i(a))c.attr(a,d,true);else a.nodeType==11&&n.each(a.childNodes,function(e){c.attr(e,d,true)});return a}function B(a,d){var e=null,h,r;if(a&&(a.push||a.item)&&a[0]){d=d||a[0].ownerDocument;e=d.createDocumentFragment();if(a.item)a=n.makeArray(a);h=0;for(r=a.length;h<r;h++)e.appendChild(a[h])}return e}function w(a,d,e,h){if(e){var r=n.guid("ks-tmp-"),C=RegExp(y);d+='<span id="'+r+'"></span>';n.available(r,function(){var D=
c.get("head"),F,H,G,I,K,J;for(C.lastIndex=0;F=C.exec(d);)if((G=(H=F[1])?H.match(E):false)&&G[2]){F=k.createElement("script");F.src=G[2];if((I=H.match(u))&&I[2])F.charset=I[2];F.async=true;D.appendChild(F)}else if((J=F[2])&&J.length>0)n.globalEval(J);(K=k.getElementById(r))&&c.remove(K);n.isFunction(h)&&h()});j(a,d)}else{j(a,d);n.isFunction(h)&&h()}}function j(a,d){d=(d+"").replace(y,"");try{a.innerHTML=d}catch(e){for(;a.firstChild;)a.removeChild(a.firstChild);d&&a.appendChild(c.create(d))}}var k=
document,p=t.ie,x=c._nodeTypeIs,i=c._isElementNode,o=k.createElement("div"),m=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,v=/<(\w+)/,y=/<script([^>]*)>([^<]*(?:(?!<\/script>)<[^<]*)*)<\/script>/ig,A=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,E=/\ssrc=(['"])(.*?)\1/i,u=/\scharset=(['"])(.*?)\1/i;n.mix(c,{create:function(a,d,e){if(x(a,1)||x(a,3)){d=a;e=d.cloneNode(true);if(t.ie<8)e.innerHTML=d.innerHTML;return e}if(!(a=n.trim(a)))return null;var h=null;h=c._creators;var r,C="div",D;
if(r=A.exec(a))h=(e||k).createElement(r[1]);else{a=a.replace(m,"<$1></$2>");if((r=v.exec(a))&&(D=r[1])&&n.isFunction(h[D=D.toLowerCase()]))C=D;a=h[C](a,e).childNodes;h=a.length===1?a[0].parentNode.removeChild(a[0]):B(a,e||k)}return z(h,d)},_creators:{div:function(a,d){var e=d?d.createElement("div"):o;e.innerHTML="w<div>"+a+"</div>";return e.lastChild}},html:function(a,d,e,h){if(d===q){a=c.get(a);if(i(a))return a.innerHTML}else n.each(c.query(a),function(r){i(r)&&w(r,d,e,h)})},remove:function(a){n.each(c.query(a),
function(d){d.parentNode&&d.parentNode.removeChild(d)})},_nl2frag:B});if(p||t.gecko||t.webkit){var l=c._creators,s=c.create,g=/(?:\/(?:thead|tfoot|caption|col|colgroup)>)+\s*<tbody/,b={option:"select",td:"tr",tr:"tbody",tbody:"table",col:"colgroup",legend:"fieldset"},f;for(f in b)(function(a){l[f]=function(d,e){return s("<"+a+">"+d+"</"+a+">",null,e)}})(b[f]);if(p){l.script=function(a,d){var e=d?d.createElement("div"):o;e.innerHTML="-"+a;e.removeChild(e.firstChild);return e};if(p<8)l.tbody=function(a,
d){var e=s("<table>"+a+"</table>",null,d),h=e.children.tags("tbody")[0];e.children.length>1&&h&&!g.test(a)&&h.parentNode.removeChild(h);return e}}n.mix(l,{optgroup:l.option,th:l.td,thead:l.tbody,tfoot:l.tbody,caption:l.tbody,colgroup:l.tbody})}return c},{requires:["./base","ua"]});
KISSY.add("dom/data",function(n,c,t){var q=window,z="_ks_data_"+n.now(),B={},w={},j={};j.applet=1;j.object=1;j.embed=1;var k={hasData:function(i,o){if(i)if(o!==t){if(o in i)return true}else if(!n.isEmptyObject(i))return true;return false}},p={hasData:function(i,o){if(i==q)return p.hasData(w,o);return k.hasData(i[z],o)},data:function(i,o,m){if(i==q)return p.data(w,o,m);var v=i[z];if(m!==t){v=i[z]=i[z]||{};v[o]=m}else if(o!==t)return v&&v[o];else return v=i[z]=i[z]||{}},removeData:function(i,o){if(i==
q)return p.removeData(w,o);var m=i[z];if(m)if(o!==t){delete m[o];n.isEmptyObject(m)&&p.removeData(i,t)}else delete i[z]}},x={hasData:function(i,o){var m=i[z];if(!m)return false;return k.hasData(B[m],o)},data:function(i,o,m){if(!j[i.nodeName.toLowerCase()]){var v=i[z];v||(v=i[z]=n.guid());i=B[v];if(m!==t){i=B[v]=B[v]||{};i[o]=m}else if(o!==t)return i&&i[o];else return i=B[v]=B[v]||{}}},removeData:function(i,o){var m=i[z];if(m){var v=B[m];if(v)if(o!==t){delete v[o];n.isEmptyObject(v)&&x.removeData(i,
t)}else{delete B[m];try{delete i[z]}catch(y){}i.removeAttribute&&i.removeAttribute(z)}}}};n.mix(c,{hasData:function(i,o){var m=false;c.query(i).each(function(v){m=v&&v.nodeType?m||x.hasData(v,o):m||p.hasData(v,o)});return m},data:function(i,o,m){if(n.isPlainObject(o))for(var v in o)c.data(i,v,o[v]);else if(m===t)return(i=c.get(i))&&i.nodeType?x.data(i,o,m):p.data(i,o,m);else c.query(i).each(function(y){y&&y.nodeType?x.data(y,o,m):p.data(y,o,m)})},removeData:function(i,o){c.query(i).each(function(m){m&&
m.nodeType?x.removeData(m,o):p.removeData(m,o)})}});return c},{requires:["./base"]});
KISSY.add("dom/insertion",function(n,c){function t(w,j,k){w=c.query(w);j=c.query(j);if(w=q(w)){var p;if(j.length>1)p=w.cloneNode(true);for(var x=0;x<j.length;x++){var i=j[x],o=x>0?p.cloneNode(true):w;k(o,i)}}}var q=c._nl2frag;n.mix(c,{insertBefore:function(w,j){t(w,j,function(k,p){p.parentNode&&p.parentNode.insertBefore(k,p)})},insertAfter:function(w,j){t(w,j,function(k,p){p.parentNode&&p.parentNode.insertBefore(k,p.nextSibling)})},appendTo:function(w,j){t(w,j,function(k,p){p.appendChild(k)})},prependTo:function(w,
j){t(w,j,function(k,p){p.insertBefore(k,p.firstChild)})}});var z={prepend:"prependTo",append:"appendTo",before:"insertBefore",after:"insertAfter"},B;for(B in z)c[B]=c[z[B]];return c},{requires:["./create"]});
KISSY.add("dom/offset",function(n,c,t,q){function z(b){var f,a=0;f=0;var d=j.body,e=o(b[A]);if(b[g]){f=b[g]();a=f[E];f=f[u];b=k&&j.documentMode!=9&&(m?p.clientTop:d.clientTop)||0;a-=k&&j.documentMode!=9&&(m?p.clientLeft:d.clientLeft)||0;f-=b;if(t.mobile=="apple"){a-=c[l](e);f-=c[s](e)}}return{left:a,top:f}}function B(b,f){var a={left:0,top:0},d=o(b[A]),e=b;f=f||d;do{var h;if(d==f){var r=e;h=z(r);r=o(r[A]);h.left+=c[l](r);h.top+=c[s](r);h=h}else h=z(e);h=h;a.left+=h.left;a.top+=h.top}while(d&&d!=f&&
(e=d.frameElement)&&(d=d.parent));return a}var w=window,j=document,k=t.ie,p=j.documentElement,x=c._isElementNode,i=c._nodeTypeIs,o=c._getWin,m=j.compatMode==="CSS1Compat",v=Math.max,y=parseInt,A="ownerDocument",E="left",u="top",l="scrollLeft",s="scrollTop",g="getBoundingClientRect";n.mix(c,{offset:function(b,f,a){if((b=c.get(b))&&b[A]){if(f===q)return B(b,a);b=b;if(c.css(b,"position")==="static")b.style.position="relative";a=B(b);var d={},e,h;for(h in f){e=y(c.css(b,h),10)||0;d[h]=e+f[h]-a[h]}c.css(b,
d)}},scrollIntoView:function(b,f,a,d){if((b=c.get(b))&&b[A]){d=d===q?true:!!d;a=a===q?true:!!a;if(!f||(f=c.get(f))===w)b.scrollIntoView(a);else{if(i(f,9))f=o(f);var e=!!o(f),h=c.offset(b),r=e?{left:c.scrollLeft(f),top:c.scrollTop(f)}:c.offset(f),C={left:h[E]-r[E],top:h[u]-r[u]};h=e?c.viewportHeight(f):f.clientHeight;e=e?c.viewportWidth(f):f.clientWidth;r=c[l](f);var D=c[s](f),F=r+e,H=D+h,G=b.offsetHeight;b=b.offsetWidth;var I=C.left+r-(y(c.css(f,"borderLeftWidth"))||0);C=C.top+D-(y(c.css(f,"borderTopWidth"))||
0);var K=I+b,J=C+G,L,M;if(G>h||C<D||a)L=C;else if(J>H)L=J-h;if(d)if(b>e||I<r||a)M=I;else if(K>F)M=K-e;c[s](f,L);c[l](f,M)}}},docWidth:0,docHeight:0,viewportHeight:0,viewportWidth:0});n.each(["Left","Top"],function(b,f){var a="scroll"+b;c[a]=function(d,e){if(n.isNumber(d))arguments.callee(w,d);else{d=c.get(d);var h=0,r=o(d);if(r){if(e!==q){h=b=="Left"?e:c.scrollLeft(r);var C=b=="Top"?e:c.scrollTop(r);r.scrollTo(h,C)}h=r.document;h=r[f?"pageYOffset":"pageXOffset"]||h.documentElement[a]||h.body[a]}else if(x(d=
c.get(d)))h=e!==q?d[a]=e:d[a];return e===q?h:q}}});n.each(["Width","Height"],function(b){c["doc"+b]=function(f){f=c.get(f);f=o(f).document;return v(f.documentElement["scroll"+b],f.body["scroll"+b],c["viewport"+b](f))};c["viewport"+b]=function(f){f=c.get(f);var a="inner"+b;f=o(f);var d=f.document;return a in f?f[a]:m?d.documentElement["client"+b]:d.body["client"+b]}});return c},{requires:["./base","ua"]});
KISSY.add("dom/selector",function(n,c,t){function q(a,d){var e=[],h;h=d===t?[x]:q(d,t);m(h,function(r){E.apply(e,z(a,r))});if(n.isString(a)&&a.indexOf(",")>-1||h.length>1)b(e);e.each=n.bind(m,t,e);return e}function z(a,d){var e=[];o("sizzle");if(l(a))a=n.trim(a);if(l(a)&&a.indexOf(",")>-1)e=B(a,d);else{if(l(a)&&!g.exec(String(a))){e=a;var h=[],r=o("sizzle");r&&r(e,d,h);e=h}else e=w(a,d);e=e}return e=e}function B(a,d){var e=[],h=a.split(",");m(h,function(r){E.apply(e,z(r,d))});return e}function w(a,
d){var e,h,r=[],C;if(l(a))if(s.test(a)){if(h=k(a.slice(1),d))r=[h]}else{if(e=g.exec(a)){h=e[1];C=e[2];e=e[3];if(d=h?k(h,d):d)if(e)if(!h||a.indexOf(u)!=-1)r=[].concat(f(e,C,d));else{if((h=k(h,d))&&c.hasClass(h,e))r=[h]}else if(C)r=p(C,d)}}else if(a&&(v(a)||A(a)))r=i(a,function(D){return j(D,d)});else if(a)if(j(a,d))r=[a];return r}function j(a,d){if(!a)return false;if(d==x)return true;return c.__contains(d,a)}function k(a,d){if(!d)return null;var e=d;if(d.nodeType!==9)e=d.ownerDocument;e=e.getElementById(a);
if(!j(e,d))return null;return e}function p(a,d){return d&&y(d.getElementsByTagName(a))||[]}var x=document,i=n.filter,o=n.require,m=n.each,v=n.isArray,y=n.makeArray,A=c._isNodeList,E=Array.prototype.push,u=" ",l=n.isString,s=/^#[\w-]+$/,g=/^(?:#([\w-]+))?\s*([\w-]+|\*)?\.?([\w-]+)?$/,b;(function(){var a,d,e=true;[0,0].sort(function(){e=false;return 0});b=function(h){if(a){d=e;h.sort(a);if(d)for(var r=1,C=h.length;r<C;)if(h[r]===h[r-1])h.splice(r,1);else r++}return h};a=x.documentElement.compareDocumentPosition?
function(h,r){if(h==r){d=true;return 0}if(!h.compareDocumentPosition||!r.compareDocumentPosition)return h.compareDocumentPosition?-1:1;return h.compareDocumentPosition(r)&4?-1:1}:function(h,r){if(h==r){d=true;return 0}else if(h.sourceIndex&&r.sourceIndex)return h.sourceIndex-r.sourceIndex}})();(function(){var a=x.createElement("div");a.appendChild(x.createComment(""));if(a.getElementsByTagName("*").length>0)p=function(d,e){var h=y(e.getElementsByTagName(d));if(d==="*"){for(var r=[],C=0,D;D=h[C++];)D.nodeType===
1&&r.push(D);h=r}return h}})();var f=x.getElementsByClassName?function(a,d,e){if(!e)return[];e=a=y(e.getElementsByClassName(a));var h=0,r=a.length,C;if(d&&d!=="*")for(e=y();h<r;++h){C=a[h];C.nodeName.toLowerCase()==d.toLowerCase()&&e.push(C)}return e}:x.querySelectorAll?function(a,d,e){return e&&y(e.querySelectorAll((d?d:"")+"."+a))||[]}:function(a,d,e){if(!e)return[];d=y(e.getElementsByTagName(d||"*"));e=[];for(var h=0,r=d.length,C;h<r;++h){C=d[h];c.hasClass(C,a)&&e.push(C)}return e};n.mix(c,{query:q,
get:function(a,d){return q(a,d)[0]||null},unique:b,filter:function(a,d,e){a=q(a,e);e=o("sizzle");var h,r,C,D=[];if(l(d)&&(h=g.exec(d))&&!h[1]){r=h[2];C=h[3];d=function(F){var H=true,G=true;if(r)H=F.nodeName.toLowerCase()==r.toLowerCase();if(C)G=c.hasClass(F,C);return G&&H}}if(n.isFunction(d))D=n.filter(a,d);else if(d&&e)D=e.matches(d,a);return D},test:function(a,d,e){a=q(a,e);return a.length&&c.filter(a,d,e).length===a.length}});return c},{requires:["dom/base"]});
KISSY.add("dom/style-ie",function(n,c,t,q,z){if(!t.ie)return c;q=document;var B=q.documentElement,w=c._CUSTOM_STYLES,j=/^-?\d+(?:px)?$/i,k=/^-?\d/,p=/^(?:width|height)$/;try{if(B.style.opacity==z&&B.filters)w.opacity={get:function(m){var v=100;try{v=m.filters["DXImageTransform.Microsoft.Alpha"].opacity}catch(y){try{v=m.filters("alpha").opacity}catch(A){if(m=((m.currentStyle||0).filter||"").match(/alpha\(opacity[=:]([^)]+)\)/))v=parseInt(n.trim(m[1]))}}return v/100+""},set:function(m,v){var y=m.style,
A=(m.currentStyle||0).filter||"";y.zoom=1;if(A)A=n.trim(A.replace(/alpha\(opacity[^=]*=[^)]+\),?/ig,""));if(A&&v!=1)A+=", ";y.filter=A+(v!=1?"alpha(opacity="+v*100+")":"")}}}catch(x){}t=t.ie==8;var i={},o={get:function(m,v){var y=m.currentStyle[v]+"";if(y.indexOf("px")<0)y=i[y]?i[y]:0;return y}};i.thin=t?"1px":"2px";i.medium=t?"3px":"4px";i.thick=t?"5px":"6px";n.each(["","Top","Left","Right","Bottom"],function(m){w["border"+m+"Width"]=o});if(!(q.defaultView||{}).getComputedStyle&&B.currentStyle)c._getComputedStyle=
function(m,v){var y=m.style,A=m.currentStyle[v];if(p.test(v))A=c[v](m)+"px";else if(!j.test(A)&&k.test(A)){var E=y.left,u=m.runtimeStyle.left;m.runtimeStyle.left=m.currentStyle.left;y.left=v==="fontSize"?"1em":A||0;A=y.pixelLeft+"px";y.left=E;m.runtimeStyle.left=u}return A};return c},{requires:["./base","ua","./style"]});
KISSY.add("dom/style",function(n,c,t,q){function z(u,l){var s=c.get(u);if(n.isWindow(s))return l==p?c.viewportWidth(s):c.viewportHeight(s);else if(s.nodeType==9)return l==p?c.docWidth(s):c.docHeight(s);var g=l===p?s.offsetWidth:s.offsetHeight;n.each(l===p?["Left","Right"]:["Top","Bottom"],function(b){g-=parseFloat(c._getComputedStyle(s,"padding"+b))||0;g-=parseFloat(c._getComputedStyle(s,"border"+b+"Width"))||0});return g}function B(u,l,s){var g=s;if(s===x&&o.test(l)){g=0;if(n.inArray(c.css(u,"position"),
["absolute","fixed"])){s=u[l==="left"?"offsetLeft":"offsetTop"];if(k&&document.documentMode!=9||t.opera)s-=u.offsetParent["client"+(l=="left"?"Left":"Top")]||0;g=s-(i(c.css(u,"margin-"+l))||0)}}return g}var w=document,j=w.documentElement,k=t.ie,p="width",x="auto",i=parseInt,o=/^(?:left|top)/,m=/^(?:width|height|top|left|right|bottom|margin|padding)/i,v=/-([a-z])/ig,y=function(u,l){return l.toUpperCase()},A={},E={};n.mix(c,{_CUSTOM_STYLES:A,_getComputedStyle:function(u,l){var s="",g=u.ownerDocument;
if(u.style)s=g.defaultView.getComputedStyle(u,null)[l];return s},css:function(u,l,s){if(n.isPlainObject(l))for(var g in l)c.css(u,g,l[g]);else{if(l.indexOf("-")>0)l=l.replace(v,y);g=l;l=A[l]||l;if(s===q){u=c.get(u);var b="";if(u&&u.style){b=l.get?l.get(u,g):u.style[l];if(b===""&&!l.get)b=B(u,l,c._getComputedStyle(u,l))}return b===q?"":b}else{if(s===null||s==="")s="";else if(!isNaN(new Number(s))&&m.test(l))s+="px";(l===p||l==="height")&&parseFloat(s)<0||n.each(c.query(u),function(f){if(f&&f.style){l.set?
l.set(f,s):f.style[l]=s;if(s==="")f.style.cssText||f.removeAttribute("style")}})}}},width:function(u,l){if(l===q)return z(u,p);else c.css(u,p,l)},height:function(u,l){if(l===q)return z(u,"height");else c.css(u,"height",l)},show:function(u){c.query(u).each(function(l){if(l){l.style.display=c.data(l,"display")||"";if(c.css(l,"display")==="none"){var s=l.tagName,g=E[s],b;if(!g){b=w.createElement(s);w.body.appendChild(b);g=c.css(b,"display");c.remove(b);E[s]=g}c.data(l,"display",g);l.style.display=g}}})},
hide:function(u){c.query(u).each(function(l){if(l){var s=l.style,g=s.display;if(g!=="none"){g&&c.data(l,"display",g);s.display="none"}}})},toggle:function(u){c.query(u).each(function(l){if(l)c.css(l,"display")==="none"?c.show(l):c.hide(l)})},addStyleSheet:function(u,l,s){if(n.isString(u)){s=l;l=u;u=window}u=c.get(u);u=c._getWin(u).document;var g;if(s&&(s=s.replace("#","")))g=c.get("#"+s,u);if(!g){g=c.create("<style>",{id:s},u);c.get("head",u).appendChild(g);if(g.styleSheet)g.styleSheet.cssText=l;
else g.appendChild(u.createTextNode(l))}},unselectable:function(u){c.query(u).each(function(l){if(l)if(t.gecko)l.style.MozUserSelect="none";else if(t.webkit)l.style.KhtmlUserSelect="none";else if(t.ie||t.opera){var s=0,g=l.getElementsByTagName("*");for(l.setAttribute("unselectable","on");l=g[s++];)switch(l.tagName.toLowerCase()){case "iframe":case "textarea":case "input":case "select":break;default:l.setAttribute("unselectable","on")}}})}});if(j.style.cssFloat!==q)A["float"]="cssFloat";else if(j.style.styleFloat!==
q)A["float"]="styleFloat";return c},{requires:["dom/base","ua"]});
KISSY.add("dom/traversal",function(n,c,t){function q(j,k,p,x,i,o){if(!(j=c.get(j)))return null;if(k===0)return j;o||(j=j[p]);if(!j)return null;i=i&&c.get(i)||null;if(k===t)k=1;o=[];var m=n.isArray(k),v,y;if(n.isNumber(k)){v=0;y=k;k=function(){return++v===y}}for(;j&&j!=i;){if(w(j)&&z(j,k)&&(!x||x(j))){o.push(j);if(!m)break}j=j[p]}return m?o:o[0]||null}function z(j,k){if(!k)return true;if(n.isArray(k))for(var p=0;p<k.length;p++){if(c.test(j,k[p]))return true}else if(c.test(j,k))return true;return false}
function B(j,k,p){var x=[];var i=j=c.get(j);if(j&&p)i=j.parentNode;if(i){p=0;for(i=i.firstChild;i;i=i.nextSibling)if(w(i)&&i!==j&&(!k||c.test(i,k)))x[p++]=i}return x}var w=c._isElementNode;n.mix(c,{closest:function(j,k,p){return q(j,k,"parentNode",function(x){return x.nodeType!=11},p,true)},parent:function(j,k,p){return q(j,k,"parentNode",function(x){return x.nodeType!=11},p)},next:function(j,k){return q(j,k,"nextSibling",t)},prev:function(j,k){return q(j,k,"previousSibling",t)},siblings:function(j,
k){return B(j,k,true)},children:function(j,k){return B(j,k,t)},__contains:document.documentElement.contains?function(j,k){if(j.nodeType==3)return false;var p;if(k.nodeType==3){k=k.parentNode;p=true}else if(k.nodeType==9)return false;else p=j!==k;return p&&(j.contains?j.contains(k):true)}:document.documentElement.compareDocumentPosition?function(j,k){return!!(j.compareDocumentPosition(k)&16)}:0,contains:function(j,k){j=c.get(j);k=c.get(k);return c.__contains(j,k)},equals:function(j,k){j=c.query(j);
k=c.query(k);if(j.length!=k.length)return false;for(var p=j.length;p>=0;p--)if(j[p]!=k[p])return false;return true}});return c},{requires:["./base"]});KISSY.add("dom",function(n,c){return c},{requires:["dom/attr","dom/class","dom/create","dom/data","dom/insertion","dom/offset","dom/style","dom/selector","dom/style-ie","dom/traversal"]});
