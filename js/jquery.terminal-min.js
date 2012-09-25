/*

 |       __ _____                     ________                              __
 |      / // _  /__ __ _____ ___ __ _/__  ___/__ ___ ______ __ __  __ ___  / /
 |  __ / // // // // // _  // _// // / / // _  // _//     // //  \/ // _ \/ /
 | /  / // // // // // ___// / / // / / // ___// / / / / // // /\  // // / /__
 | \___//____ \\___//____//_/ _\_  / /_//____//_/ /_/ /_//_//_/ /_/ \__\_\___/
 |           \/              /____/                              version 0.4.20
 http://terminal.jcubic.pl

 Licensed under GNU LGPL Version 3 license
 Copyright (c) 2011 Jakub Jankiewicz <http://jcubic.pl>

 Includes:

 Storage plugin Distributed under the MIT License
 Copyright (c) 2010 Dave Schindler

 jQuery Timers licenced with the WTFPL
 <http://jquery.offput.ca/every/>

 Cross-Browser Split 1.1.1
 Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
 Available under the MIT License

 Date: Tue, 25 Sep 2012 00:35:41 +0000
*/
(function(k,J){function $(c,g){var f;if(typeof c==="string"&&typeof g==="string"){localStorage[c]=g;return true}else if(typeof c==="object"&&typeof g==="undefined"){for(f in c)if(c.hasOwnProperty(f))localStorage[f]=c[f];return true}return false}function W(c,g){var f,h;f=new Date;f.setTime(f.getTime()+31536E6);f="; expires="+f.toGMTString();if(typeof c==="string"&&typeof g==="string"){document.cookie=c+"="+g+f+"; path=/";return true}else if(typeof c==="object"&&typeof g==="undefined"){for(h in c)if(c.hasOwnProperty(h))document.cookie=
h+"="+c[h]+f+"; path=/";return true}return false}function aa(c){return localStorage[c]}function ba(c){var g,f,h;c+="=";g=document.cookie.split(";");for(f=0;f<g.length;f++){for(h=g[f];h.charAt(0)===" ";)h=h.substring(1,h.length);if(h.indexOf(c)===0)return h.substring(c.length,h.length)}return null}function ca(c){return delete localStorage[c]}function da(c){return W(c,"",-1)}function U(c,g){var f=[],h=c.length;if(h<g)return[c];for(var i=0;i<h;i+=g)f.push(c.substring(i,i+g));return f}function X(c){var g=
c instanceof Array?c:c?[c]:[],f=0;k.extend(this,{left:function(){if(f===0)f=g.length-1;else--f;return g[f]},right:function(){if(f===g.length-1)f=0;else++f;return g[f]},current:function(){return g[f]},data:function(){return g},length:function(){return g.length},reset:function(){f=0},append:function(h){g.push(h);this.reset()}})}function ea(c){var g=c?[c]:[];k.extend(this,{size:function(){return g.length},pop:function(){if(g.length===0)return null;else{var f=g[g.length-1];g=g.slice(0,g.length-1);return f}},
push:function(f){g=g.concat([f]);return f},top:function(){return g.length>0?g[g.length-1]:null}})}function fa(c){var g=true;if(typeof c==="string"&&c!=="")c+="_";var f=k.Storage.get(c+"commands"),h=new X(f?eval("("+f+")"):[""]);k.extend(this,{append:function(i){if(g){h.append(i);k.Storage.set(c+"commands",k.json_stringify(h.data()))}},data:function(){return h.data()},next:function(){return h.right()},last:function(){h.reset()},previous:function(){return h.left()},clear:function(){h=new X;k.Storage.remove(c+
"commands")},enable:function(){g=true},disable:function(){g=false}})}k.omap=function(c,g){var f={};k.each(c,function(h,i){f[h]=g.call(c,h,i)});return f};var R=typeof window.localStorage!=="undefined";k.extend({Storage:{set:R?$:W,get:R?aa:ba,remove:R?ca:da}});jQuery.fn.extend({everyTime:function(c,g,f,h,i){return this.each(function(){jQuery.timer.add(this,c,g,f,h,i)})},oneTime:function(c,g,f){return this.each(function(){jQuery.timer.add(this,c,g,f,1)})},stopTime:function(c,g){return this.each(function(){jQuery.timer.remove(this,
c,g)})}});jQuery.extend({timer:{guid:1,global:{},regex:/^([0-9]+)\s*(.*s)?$/,powers:{ms:1,cs:10,ds:100,s:1E3,das:1E4,hs:1E5,ks:1E6},timeParse:function(c){if(c===J||c===null)return null;var g=this.regex.exec(jQuery.trim(c.toString()));return g[2]?parseInt(g[1],10)*(this.powers[g[2]]||1):c},add:function(c,g,f,h,i,o){var s=0;if(jQuery.isFunction(f)){i||(i=h);h=f;f=g}g=jQuery.timer.timeParse(g);if(!(typeof g!=="number"||isNaN(g)||g<=0)){if(i&&i.constructor!==Number){o=!!i;i=0}i=i||0;o=o||false;if(!c.$timers)c.$timers=
{};c.$timers[f]||(c.$timers[f]={});h.$timerID=h.$timerID||this.guid++;var m=function(){if(!(o&&m.inProgress)){m.inProgress=true;if(++s>i&&i!==0||h.call(c,s)===false)jQuery.timer.remove(c,f,h);m.inProgress=false}};m.$timerID=h.$timerID;c.$timers[f][h.$timerID]||(c.$timers[f][h.$timerID]=window.setInterval(m,g));this.global[f]||(this.global[f]=[]);this.global[f].push(c)}},remove:function(c,g,f){var h=c.$timers,i;if(h){if(g){if(h[g]){if(f){if(f.$timerID){window.clearInterval(h[g][f.$timerID]);delete h[g][f.$timerID]}}else for(var o in h[g])if(h[g].hasOwnProperty(o)){window.clearInterval(h[g][o]);
delete h[g][o]}for(i in h[g])if(h[g].hasOwnProperty(i))break;if(!i){i=null;delete h[g]}}}else for(var s in h)h.hasOwnProperty(s)&&this.remove(c,s,f);for(i in h)if(h.hasOwnProperty(i))break;if(!i)c.$timers=null}}}});if(jQuery.browser.msie)jQuery(window).one("unload",function(){var c=jQuery.timer.global,g;for(g in c)if(c.hasOwnProperty(g))for(var f=c[g],h=f.length;--h;)jQuery.timer.remove(f[h],g)});(function(c){if(String.prototype.split.toString().match(/\[native/)){var g=String.prototype.split,f=/()??/.exec("")[1]===
c,h;h=function(i,o,s){if(Object.prototype.toString.call(o)!=="[object RegExp]")return g.call(i,o,s);var m=[],v=(o.ignoreCase?"i":"")+(o.multiline?"m":"")+(o.extended?"x":"")+(o.sticky?"y":""),z=0,A,w,C;o=RegExp(o.source,v+"g");i+="";f||(A=RegExp("^"+o.source+"$(?!\\s)",v));for(s=s===c?4294967295:s>>>0;w=o.exec(i);){v=w.index+w[0].length;if(v>z){m.push(i.slice(z,w.index));!f&&w.length>1&&w[0].replace(A,function(){for(var E=1;E<arguments.length-2;E++)if(arguments[E]===c)w[E]=c});w.length>1&&w.index<
i.length&&Array.prototype.push.apply(m,w.slice(1));C=w[0].length;z=v;if(m.length>=s)break}o.lastIndex===w.index&&o.lastIndex++}if(z===i.length){if(C||!o.test(""))m.push("")}else m.push(i.slice(z));return m.length>s?m.slice(0,s):m};String.prototype.split=function(i,o){return h(this,i,o)};return h}})();k.json_stringify=function(c,g){var f="",h;g=g===J?1:g;switch(typeof c){case "function":f+=c;break;case "boolean":f+=c?"true":"false";break;case "object":if(c===null)f+="null";else if(c instanceof Array){f+=
"[";var i=c.length;for(h=0;h<i-1;++h)f+=k.json_stringify(c[h],g+1);f+=k.json_stringify(c[i-1],g+1)+"]"}else{f+="{";for(i in c)if(c.hasOwnProperty(i))f+='"'+i+'":'+k.json_stringify(c[i],g+1);f+="}"}break;case "string":i=c;var o={"\\\\":"\\\\",'"':'\\"',"/":"\\/","\\n":"\\n","\\r":"\\r","\\t":"\\t"};for(h in o)if(o.hasOwnProperty(h))i=i.replace(RegExp(h,"g"),o[h]);f+='"'+i+'"';break;case "number":f+=String(c)}f+=g>1?",":"";if(g===1)f=f.replace(/,([\]}])/g,"$1");return f.replace(/([\[{]),/g,"$1")};k.fn.cmd=
function(c){function g(){H.toggleClass("inverted")}function f(){x="(reverse-i-search)`"+C+"': ";G()}function h(d){var q=D.data(),M=RegExp("^"+C),K=q.length;if(d&&E>0)K-=E;for(d=K;d--;)if(M.test(q[d])){E=q.length-d;b=0;m.set(q[d],true);l();break}}function i(d){var q=d.substring(0,z-A);d=d.substring(z-A);return[q].concat(U(d,z))}function o(){v.focus();m.oneTime(1,function(){m.insert(v.val());v.blur().val("")})}function s(d){if(c.keydown&&c.keydown(d)===false)return false;if(I){var q;if(w&&(d.which===
35||d.which===36||d.which===37||d.which===38||d.which===39||d.which===40||d.which===66||d.which===13||d.which===27)){x=O;w=false;E=null;C="";G();if(d.which===27)p="";l();s.call(this,d)}else if(d.altKey){if(d.which===68){m.set(p.slice(0,b)+p.slice(b).replace(/[^ ]+ |[^ ]+$/,""),true);return false}return true}else if(d.keyCode===13){if(D&&p&&(c.historyFilter&&c.historyFilter(p)||!c.historyFilter))D.data().slice(-1)[0]!==p&&D.append(p);D.last();d=p;m.set("");c.commands&&c.commands(d);typeof x==="function"&&
G()}else if(d.which===32)if(w){C+=" ";f()}else m.insert(" ");else if(d.which===8)if(w){C=C.slice(0,-1);f()}else{if(p!==""&&b>0){p=p.slice(0,b-1)+p.slice(b,p.length);--b;l()}}else if(d.which===9&&!(d.ctrlKey||d.altKey))m.insert("\t");else if(d.which===46){if(p!==""&&b<p.length){p=p.slice(0,b)+p.slice(b+1,p.length);l()}return true}else if(D&&d.which===38||d.which===80&&d.ctrlKey)m.set(D.previous());else if(D&&d.which===40||d.which===78&&d.ctrlKey)m.set(D.next());else if(d.which===37||d.which===66&&
d.ctrlKey)if(d.ctrlKey&&d.which!==66){q=b-1;d=0;for(p[q]===" "&&--q;q>0;--q)if(p[q]===" "&&p[q+1]!==" "){d=q+1;break}else if(p[q]==="\n"&&p[q+1]!=="\n"){d=q;break}m.position(d)}else{if(b>0){--b;l()}}else if(d.which===82&&d.ctrlKey)if(w)h(true);else{O=x;f();p="";l();w=true}else if(d.which===39||d.which===70&&d.ctrlKey)if(d.ctrlKey&&d.which!==70){p[b]===" "&&++b;d=p.slice(b).match(/\S[\n\s]{2,}|[\n\s]+\S?/);if(!d||d[0].match(/^\s+$/))b=p.length;else if(d[0][0]!==" ")b+=d.index+1;else{b+=d.index+d[0].length-
1;d[0][d[0].length-1]!==" "&&--b}l()}else{if(b<p.length){++b;l()}}else if(d.which===123)return true;else if(d.which===36)m.position(0);else if(d.which===35)m.position(p.length);else if(d.ctrlKey||d.metaKey)if(d.shiftKey){if(d.which===84)return true}else if(d.which===65)m.position(0);else if(d.which===69)m.position(p.length);else if(d.which===88||d.which===67||d.which===87||d.which===84)return true;else if(d.which===86){o();return true}else if(d.which===75)if(b===0)m.set("");else b!==p.length&&m.set(p.slice(0,
b));else if(d.which===85){m.set(p.slice(b,p.length));m.position(0)}else{if(d.which===17)return true}else return true;return false}}var m=this;m.addClass("cmd");m.append('<span class="prompt"></span><span></span><span class="cursor">&nbsp;</span><span></span>');var v=k("<textarea/>").addClass("clipboard").appendTo(m);c.width&&m.width(c.width);var z,A,w=false,C="",E=null,O,F=c.mask||false,p="",b=0,x,I=c.enabled,T,D,H=m.find(".cursor"),l=function(d){function q(n,a){if(a===n.length){L.html(k.terminal.encode(n));
H.html("&nbsp;");B.html("")}else if(a===0){L.html("");H.html(k.terminal.encode(n.slice(0,1)));B.html(k.terminal.encode(n.slice(1)))}else{var e=k.terminal.encode(n.slice(0,a));L.html(e);e=n.slice(a,a+1);H.html(e===" "?"&nbsp;":k.terminal.encode(e));a===n.length-1?B.html(""):B.html(k.terminal.encode(n.slice(a+1)))}}function M(n){return"<div>"+k.terminal.encode(n)+"</div>"}function K(n){var a=B;k.each(n,function(e,j){a=k(M(j)).insertAfter(a).addClass("clear")})}function S(n){k.each(n,function(a,e){L.before(M(e))})}
var L=H.prev(),B=H.next();return function(){var n=F?p.replace(/./g,"*"):p,a,e;d.find("div").remove();L.html("");if(n.length>z-A-1||n.match(/\n/)){var j,u=n.match(/\t/g),r=u?u.length*3:0;if(u)n=n.replace(/\t/g,"\u0000\u0000\u0000\u0000");if(n.match(/\n/)){var t=n.split("\n");e=z-A-1;for(a=0;a<t.length-1;++a)t[a]+=" ";if(t[0].length>e){j=[t[0].substring(0,e)];j=j.concat(U(t[0].substring(e),z))}else j=[t[0]];for(a=1;a<t.length;++a)if(t[a].length>z)j=j.concat(U(t[a],z));else j.push(t[a])}else j=i(n);
if(u)j=k.map(j,function(N){return N.replace(/\x00\x00\x00\x00/g,"\t")});e=j[0].length;if(b<e){q(j[0],b);K(j.slice(1))}else if(b===e){L.before(M(j[0]));q(j[1],0);K(j.slice(2))}else{a=j.length;if(b<e){q(j[0],b);K(j.slice(1))}else if(b===e){L.before(M(j[0]));q(j[1],0);K(j.slice(2))}else{u=j.slice(-1)[0];t=n.length-b;var y=u.length;n=0;if(t<=y){S(j.slice(0,-1));q(u,(y===t?0:y-t)+r)}else if(a===3){L.before("<div>"+k.terminal.encode(j[0])+"</div>");q(j[1],b-e-1);B.after('<div class="clear">'+k.terminal.encode(j[2])+
"</div>")}else{n=b;for(a=0;a<j.length;++a){e=j[a].length;if(n>e)n-=e;else break}e=j[a];r=a;if(n===e.length){n=0;e=j[++r]}q(e,n);S(j.slice(0,r));K(j.slice(r+1))}}}}else if(n===""){L.html("");H.html("&nbsp;");B.html("")}else q(n,b)}}(m),G=function(){var d=m.find(".prompt");return function(){if(typeof x==="string"){A=k.terminal.strip(x).length;d.html(k.terminal.format(x))}else x(function(q){A=k.terminal.strip(q).length;d.html(k.terminal.format(q))})}}();k.extend(m,{name:function(d){if(d!==J){T=d;D=new fa(d)}else return T},
history:function(){return D},set:function(d,q){if(d!==J){p=d;if(!q)b=p.length;l();if(typeof c.onCommandChange==="function")c.onCommandChange(p)}},insert:function(d,q){if(b===p.length)p+=d;else p=b===0?d+p:p.slice(0,b)+d+p.slice(b);q||(b+=d.length);l();if(typeof c.onCommandChange==="function")c.onCommandChange(p)},get:function(){return p},commands:function(d){if(d)c.commands=d;else return d},destroy:function(){k(document.documentElement).unbind(".commandline");m.find(".prompt").remove()},prompt:function(d){if(d===
J)return x;else{if(typeof d==="string"||typeof d==="function")x=d;else throw"prompt must be a function or string";G();l()}},position:function(d){if(typeof d==="number"){b=d<0?0:d>p.length?p.length:d;l()}else return b},show:function(){var d=m.show;return function(){d.apply(m,[]);l();G()}}(),resize:function(d){if(d)z=d;else{d=m.width();var q=H.innerWidth();z=Math.floor(d/q)}l()},enable:function(){if(!I){H.addClass("inverted");m.everyTime(500,"blink",g);I=true}},isenabled:function(){return I},disable:function(){if(I){m.stopTime("blink",
g);H.removeClass("inverted");I=false}},mask:function(d){if(typeof d==="boolean"){F=d;l()}else return F}});m.name(c.name||"");x=c.prompt||"> ";G();if(c.enabled===J||c.enabled===true)m.enable();k(k.browser.msie?document.documentElement:window).keypress(function(d){var q;if(d.ctrlKey&&d.which===99)return true;if(!w&&c.keypress)q=c.keypress(d);if(q===J||q){if(I)if(k.inArray(d.which,[38,32,13,0,8])>-1&&d.keyCode!==123&&!(d.which===38&&d.shiftKey))return false;else if(!d.ctrlKey&&!(d.altKey&&d.which===
100)){if(w){C+=String.fromCharCode(d.which);f();h()}else m.insert(String.fromCharCode(d.which));return false}else if(d.altKey)if(w){C+=String.fromCharCode(d.which);f();h()}else m.insert(String.fromCharCode(d.which))}else return q}).keydown(s);return m};var ga=/(\[\[[gbius]*;[^;]*;[^\]]*\][^\]\[]*\])/g,Y=/\[\[([gbius]*);([^;]*);([^\]]*)\]([^\]\[]*)\]/g,Z=/#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})/,ha=/(https?:((?!&[^;]+;)[^\s:"'])+)/g,ia=/((([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))/g;
k.terminal={split_equal:function(c,g){for(var f=c.split(/\n/g),h=/(\[\[[gbius]*;[^;]*;[^\]]*\][^\]\[]*\]?)/g,i=/(\[\[[gbius]*;[^;]*;[^\]]*\])/,o=/\[\[[gbius]*;?[^;]*;?[^\]]*\]?$/,s=false,m=false,v="",z=[],A=0,w=f.length;A<w;++A){if(v!=="")if(f[A]===""){z.push(v+"]");continue}else{f[A]=v+f[A];v=""}else if(f[A]===""){z.push("");continue}for(var C=f[A],E=0,O=0,F=0,p=C.length;F<p;++F){if(C[F]==="["&&C[F+1]==="[")s=true;else if(s&&C[F]==="]")if(m)m=s=false;else m=true;else if(s&&m||!s)++O;if(O===g||F===
p-1){var b=C.substring(E,F+1);if(v){b=v+b;if(b.match("]"))v=""}E=F+1;O=0;var x=b.match(h);if(x){x=x[x.length-1];if(x[x.length-1]!=="]"){v=x.match(i)[1];b+="]"}else if(b.match(o)){b=b.replace(o,"");v=x.match(i)[1]}}z.push(b)}}}return z},encode:function(c){return c.replace(/&(?!#[0-9]+;|[a-zA-Z]+;)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br/>").replace(/ /g,"&nbsp;").replace(/\t/g,"&nbsp;&nbsp;&nbsp;&nbsp;")},format:function(c){if(typeof c==="string"){c=k.terminal.encode(k.terminal.from_ansi(c));
var g=c.split(ga);if(g&&g.length>1)c=k.map(g,function(f){return f===""?f:f.substring(0,1)==="["?f.replace(Y,function(h,i,o,s,m){if(m==="")return"<span>&nbsp;</span>";h="";if(i.indexOf("b")!==-1)h+="font-weight:bold;";var v="text-decoration:";if(i.indexOf("u")!==-1)v+="underline ";if(i.indexOf("s")!==-1)v+="line-through";if(i.indexOf("s")!==-1||i.indexOf("u")!==-1)h+=v+";";if(i.indexOf("i")!==-1)h+="font-style:italic;";if(o.match(Z)){h+="color:"+o+";";if(i.indexOf("g")!==-1)h+="text-shadow: 0 0 5px "+
o+";"}if(s.match(Z))h+="background-color:"+s;return c='<span style="'+h+'">'+m+"</span>"}):"<span>"+f+"</span>"}).join("");return c.replace(ha,'<a target="_blank" href="$1">$1</a>').replace(ia,'<a href="mailto:$1">$1</a>')}else return""},strip:function(c){return c.replace(Y,"$4")},active:function(){},ansi_colors:{normal:{black:"#000",red:"#AA0000",green:"#008400",yellow:"#AA5500",blue:"#0000AA",magenta:"#AA00AA",cyan:"#00AAAA",white:"#fff"},bold:{white:"#fff",red:"#FF5555",green:"#44D544",yellow:"#FFFF55",
blue:"#5555FF",magenta:"#FF55FF",cyan:"#55FFFF",black:"#000"}},from_ansi:function(){function c(h){var i=h.split(";"),o;h=[];var s="",m="",v;for(v in i){o=parseInt(i[v],10);o===1&&h.push("b");o===4&&h.push("u");if(f[o])m=f[o];if(g[o])s=g[o]}o=i=k.terminal.ansi_colors.normal;for(v=h.length;v--;)if(h[v]=="b"){if(s=="")s="white";o=k.terminal.ansi_colors.bold;break}return"[["+[h.join(""),o[s],i[m]].join(";")+"]"}var g={30:"black",31:"red",32:"green",33:"yellow",34:"blue",35:"magenta",36:"cyan",37:"white"},
f={40:"black",41:"red",42:"green",43:"yellow",44:"blue",45:"magenta",46:"cyan",47:"white"};return function(h){var i=h.split(/(\[[0-9;]*m)/g);if(i.length==1)return h;h=[];if(i.length>3&&i.slice(0,3).join("")=="[0m")i=i.slice(3);for(var o=false,s=0;s<i.length;++s){var m=i[s].match(/^\[([0-9;]*)m$/);if(m){if(m[1]!="")if(o){h.push("]");if(m[1]=="0")o=false;else h.push(c(m[1]))}else{o=true;h.push(c(m[1]))}}else h.push(i[s])}o&&h.push("]");return h.join("")}}()};k.jrpc=function(c,g,f,h,i,o){g=k.json_stringify({jsonrpc:"2.0",
method:f,params:h,id:g});return k.ajax({url:c,data:g,success:i,error:o,contentType:"application/json",dataType:"json",async:true,cache:false,type:"POST"})};R=/ {14}$/;var ja=[["jQuery Terminal","(c) 2011 jcubic"],["jQuery Terminal Emulator v. 0.4.20","Copyright (c) 2011 Jakub Jankiewicz <http://jcubic.pl>".replace(/ *<.*>/,"")],["jQuery Terminal Emulator version version 0.4.20","Copyright (c) 2011 Jakub Jankiewicz <http://jcubic.pl>"],["      _______                 ________                        __",
"     / / _  /_ ____________ _/__  ___/______________  _____  / /"," __ / / // / // / _  / _/ // / / / _  / _/     / /  \\/ / _ \\/ /","/  / / // / // / ___/ // // / / / ___/ // / / / / /\\  / // / /__","\\___/____ \\\\__/____/_/ \\__ / /_/____/_//_/ /_/ /_/  \\/\\__\\_\\___/","         \\/          /____/                                   ".replace(R,"")+"version 0.4.20","Copyright (c) 2011 Jakub Jankiewicz <http://jcubic.pl>"],["      __ _____                     ________                              __",
"     / // _  /__ __ _____ ___ __ _/__  ___/__ ___ ______ __ __  __ ___  / /"," __ / // // // // // _  // _// // / / // _  // _//     // //  \\/ // _ \\/ /","/  / // // // // // ___// / / // / / // ___// / / / / // // /\\  // // / /__","\\___//____ \\\\___//____//_/ _\\_  / /_//____//_/ /_/ /_//_//_/ /_/ \\__\\_\\___/","          \\/              /____/                                          ".replace(R,"")+"version 0.4.20","Copyright (c) 2011 Jakub Jankiewicz <http://jcubic.pl>"]],V=[],P=new function(c){var g=
c?[c]:[],f=0;k.extend(this,{rotate:function(){if(g.length===1)return g[0];else{if(f===g.length-1)f=0;else++f;return g[f]}},length:function(){return g.length},set:function(h){for(var i=g.length;i--;)if(g[i]===h){f=i;return}this.append(h)},front:function(){return g[f]},append:function(h){g.push(h)}})};k.fn.terminal=function(c,g){function f(){return b.get(0).scrollHeight>b.innerHeight()}function h(){var a=b.find(".cursor").width(),e=Math.floor(b.width()/a);if(f()){var j=b.innerWidth()-b.width();e-=Math.ceil((20-
j/2)/(a-1))}return e}function i(a,e){if(l.displayExceptions){b.error("&#91;"+e+"&#93;: "+(typeof a==="string"?a:typeof a.fileName==="string"?a.fileName+": "+a.message:a.message));if(typeof a.fileName==="string"){b.pause();k.get(a.fileName,function(j){b.resume();var u=a.lineNumber-1;(j=j.split("\n")[u])&&b.error("&#91;"+a.lineNumber+"&#93;: "+j)})}a.stack&&b.error(a.stack)}}function o(a,e){try{if(typeof e==="function")e(function(){});else if(typeof e!=="string")throw a+" must be string or function";
}catch(j){i(j,a.toUpperCase());return false}return true}function s(){var a=b.prop?b.prop("scrollHeight"):b.attr("scrollHeight");b.scrollTop(a)}function m(a){a=typeof a==="string"?a:String(a);var e,j;if(a.length>D){var u=k.terminal.split_equal(a,D);a=k("<div></div>");e=0;for(j=u.length;e<j;++e)u[e]===""||u[e]==="\r"?a.append("<div>&nbsp;</div>"):k("<div/>").html(k.terminal.format(u[e])).appendTo(a)}else a=k("<div/>").html(k.terminal.format(a));I.append(a);a.width("100%");s();return a}function v(){if(g.greetings===
J)b.echo(b.signature);else g.greetings&&b.echo(g.greetings)}function z(a,e){var j=1,u=function(r,t){e.pause();k.jrpc(a,j++,r,t,function(y){if(y.error)e.error("&#91;RPC&#93; "+y.error.message);else if(typeof y.result==="string")e.echo(y.result);else if(y.result instanceof Array)e.echo(y.result.join(" "));else if(typeof y.result==="object"){var N="",Q;for(Q in y.result)if(y.result.hasOwnProperty(Q))N+=Q+": "+y.result[Q]+"\n";e.echo(N)}e.resume()},function(y,N){e.error("&#91;AJAX&#93; "+N+" - Server reponse is: \n"+
y.responseText);e.resume()})};return function(r,t){if(r!==""){var y,N;if(r.match(/[^ ]* /)){r=r.split(/ +/);y=r[0];N=r.slice(1)}else{y=r;N=[]}if(!l.login||y==="help")u(y,N);else{var Q=t.token();Q?u(y,[Q].concat(N)):t.error("&#91;AUTH&#93; Access denied (no token)")}}}}function A(a){a=a.replace(/\[/g,"&#91;").replace(/\]/g,"&#93;");var e=n.prompt();if(n.mask())a=a.replace(/./g,"*");typeof e==="function"?e(function(j){b.echo(j+a)}):b.echo(e+a)}function w(a,e){try{var j=B.top();if(a==="exit"&&l.exit)if(B.size()===
1)if(l.login)E();else{e||A(a);b.echo("You can exit from main interpeter")}else b.pop("exit");else{e||A(a);a==="clear"&&l.clear?b.clear():j.eval(a,b)}}catch(u){i(u,"USER");b.resume();throw u;}}function C(){var a=null;n.prompt("login: ");l.history&&n.history().disable();n.commands(function(e){try{A(e);if(a){n.mask(false);b.pause();if(typeof l.login!=="function")throw"Value of login property must be a function";l.login(a,e,function(u){if(u){var r=l.name;r=r?"_"+r:"";k.Storage.set("token"+r,u);k.Storage.set("login"+
r,a);n.commands(w);F()}else{b.error("Wrong password try again");n.prompt("login: ");a=null}b.resume();l.history&&n.history().enable()})}else{a=e;n.prompt("password: ");n.mask(true)}}catch(j){i(j,"LOGIN",b);throw j;}})}function E(){if(typeof l.onBeforelogout==="function")try{if(l.onBeforelogout(b)==false)return}catch(a){i(a,"onBeforelogout");throw a;}var e=l.name;e=e?"_"+e:"";k.Storage.remove("token"+e,null);k.Storage.remove("login"+e,null);l.history&&n.history().disable();C();if(typeof l.onAfterlogout===
"function")try{l.onAfterlogout(b)}catch(j){i(j,"onAfterlogout");throw j;}}function O(){var a=B.top(),e="";if(a.name!==J&&a.name!=="")e+=a.name+"_";e+=T;n.name(e);typeof a.prompt=="function"?n.prompt(function(j){a.prompt(j,b)}):n.prompt(a.prompt);l.history&&n.history().enable();n.set("");if(typeof a.onStart==="function")a.onStart(b)}function F(){O();v();if(typeof l.onInit==="function")try{l.onInit(b)}catch(a){i(a,"OnInit");throw a;}}function p(a){b.oneTime(5,function(){q()});if(b.paused()){if(a.which===
68&&a.ctrlKey){for(a=V.length;a--;){var e=V[a];if(4!==e.readyState)try{e.abort()}catch(j){b.error("error in aborting ajax")}}b.resume();return false}}else{if(l.keydown&&l.keydown(a,b)===false)return false;if(a.which!==9)M=0;if(a.which===68&&a.ctrlKey){if(n.get()==="")if(B.size()>1||l.login!==J)b.pop("");else{b.resume();b.echo("")}else b.set_command("");return false}else if(l.tabcompletion&&a.which===9){++M;e=n.get();if(!e.match(" ")){var u=RegExp("^"+e),r=B.top().command_list,t=[];for(a=r.length;a--;)u.test(r[a])&&
t.push(r[a]);if(t.length===1)b.set_command(t[0]);else if(t.length>1)if(M>=2){A(e);b.echo(t.join("\t"));M=0}}return false}else if(a.which===86&&a.ctrlKey){b.oneTime(1,function(){s()});return true}else if(a.which===9&&a.ctrlKey){P.length()>1&&b.focus(false);return false}else if(a.which===34)b.scroll(b.height());else a.which===33?b.scroll(-b.height()):b.attr({scrollTop:b.attr("scrollHeight")})}}var b=this,x=[],I,T=P.length(),D,H=[],l=k.extend({name:"",prompt:"> ",history:true,exit:true,clear:true,enabled:true,
displayExceptions:true,cancelableAjax:true,login:null,tabcompletion:null,historyFilter:null,onInit:k.noop,onClear:k.noop,onBlur:k.noop,onFocus:k.noop,onTerminalChange:k.noop,onExit:k.noop,keypress:k.noop,keydown:k.noop},g||{});l.width&&b.width(l.width);l.height&&b.height(l.height);var G=!l.enabled;if(b.length===0)throw'Sorry, but terminal said that "'+b.selector+'" is not valid selector!';b.ajaxSend(function(a,e){V.push(e)});if(b.data("terminal"))return b.data("terminal");I=k("<div>").addClass("terminal-output").appendTo(b);
b.addClass("terminal").append("<div/>");b.click(function(){b.find("textarea").focus()});var d=[];k.extend(b,k.omap({clear:function(){I.html("");try{l.onClear(b)}catch(a){i(a,"onClear");throw a;}n.set("");x=[];b.attr({scrollTop:0});return b},exec:function(a,e){G?d.push([a,e]):w(a,e);return b},greetings:function(){v();return b},paused:function(){return G},pause:function(){if(n){G=true;b.disable()}return b},resume:function(){if(n){b.enable();var a=d;for(d=[];a.length;){var e=a.shift();b.exec.apply(b,
e)}s()}return b},cols:function(){return D},rows:function(){return x.length},history:function(){return n.history()},next:function(){if(P.length()===1)return b;else{var a=b.offset().top;b.height();b.scrollTop();var e=b,j=k(window).scrollTop(),u=j+k(window).height(),r=k(e).offset().top;if(r+k(e).height()>=j&&r<=u){P.front().disable();a=P.rotate().enable();e=a.offset().top-50;k("html,body").animate({scrollTop:e},500);try{l.onTerminalChange(a)}catch(t){i(t,"onTerminalChange");throw t;}return a}else{b.enable();
k("html,body").animate({scrollTop:a-50},500);return b}}},focus:function(a){b.oneTime(1,function(){if(P.length()===1)if(a===false)try{l.onBlur(b)!==false&&b.disable()}catch(e){i(e,"onBlur");throw e;}else try{l.onFocus(b)!==false&&b.enable()}catch(j){i(j,"onFocus");throw j;}else if(a===false)b.next();else{var u=P.front();if(u!=b){u.disable();try{l.onTerminalChange(b)}catch(r){i(r,"onTerminalChange");throw r;}}P.set(b);b.enable()}});return b},enable:function(){D===J&&b.resize();if(G)if(n){n.enable();
G=false}return b},disable:function(){if(n){G=true;n.disable()}return b},enabled:function(){return G},signature:function(){var a=b.cols();a=a<15?null:a<35?0:a<55?1:a<64?2:a<75?3:4;return a!==null?ja[a].join("\n")+"\n":""},version:function(){return"0.4.20"},get_command:function(){return n.get()},insert:function(a){if(typeof a==="string"){n.insert(a);return b}else throw"insert function argument is not a string";},set_prompt:function(a){if(o("prompt",a)){typeof a=="function"?n.prompt(function(e){a(e,
b)}):n.prompt(a);B.top().prompt=a}return b},get_prompt:function(){return B.top().prompt},set_command:function(a){n.set(a);return b},set_mask:function(a){n.mask(a);return b},get_output:function(a){return a?x:k.map(x,function(e,j){return typeof j=="function"?j():j}).join("\n")},resize:function(a,e){if(a&&e){b.width(a);b.height(e)}D=h();n.resize(D);var j=I.detach();I.html("");k.each(x,function(u,r){m(r&&typeof r=="function"?r():r)});b.prepend(j);s();return b},echo:function(a){x.push(a);m(typeof a===
"function"?a():a);q();return b},error:function(a){return b.echo("[[;#f00;]"+a.replace(/\[/g,"&#91;").replace(/\]/g,"&#93;")+"]")},scroll:function(a){var e;if(b.prop){a>b.prop("scrollTop")&&a>0&&b.prop("scrollTop",0);e=b.prop("scrollTop");b.prop("scrollTop",e+a)}else{a>b.attr("scrollTop")&&a>0&&b.attr("scrollTop",0);e=b.attr("scrollTop");b.attr("scrollTop",e+a)}return b},logout:l.login?function(){for(;B.size()>1;)B.pop();E();return b}:function(){throw"You don't have login function";},token:l.login?
function(){var a=l.name;return k.Storage.get("token"+(a?"_"+a:""))}:k.noop,login_name:l.login?function(){var a=l.name;return k.Storage.get("login"+(a?"_"+a:""))}:k.noop,name:function(){return l.name},push:function(a,e){if(e&&(!e.prompt||o("prompt",e.prompt))||!e){if(typeof a==="string")a=z(e.eval,b);B.push(k.extend({eval:a},e));O()}return b},reset:function(){for(b.clear();B.size()>1;)B.pop();F()},pop:function(a){a!==J&&A(a);if(B.top().name===l.name){if(l.login){E();if(typeof l.onExit==="function")try{l.onExit(b)}catch(e){i(e,
"onExit");throw e;}}}else{a=B.pop();O();if(typeof a.onExit==="function")try{l.onExit(b)}catch(j){i(j,"onExit");throw j;}}return b}},function(a,e){return function(){try{return e.apply(this,Array.prototype.slice.apply(arguments))}catch(j){i(j,"TERMINAL")}}}));var q=function(){var a=f();return function(){if(a!==f()){b.resize();a=f()}}}(),M=0,K;if(l.login&&typeof l.onBeforeLogin==="function")try{l.onBeforeLogin(b)}catch(S){i(S,"onBeforeLogin");throw S;}if(typeof c=="string"){K=c;c=z(c,b)}else if(typeof c==
"object"&&c.constructor===Array)throw"You can't use array as eval";else if(typeof c==="object"){for(var L in c)c.hasOwnProperty(L)&&H.push(L);c=function a(e){return function(j){if(j!==""){j=j.split(/ +/);var u=j[0],r=j.slice(1);j=e[u];var t=typeof j;if(t==="function")j.apply(b,r);else if(t==="object"||t==="string"){r=[];if(t==="object"){for(var y in j)j.hasOwnProperty(y)&&r.push(y);j=a(j)}b.push(j,{prompt:u+"> ",name:u,command_list:r})}else b.error("Command '"+u+"' Not Found")}}}(c)}else if(typeof c!==
"function")throw'Unknow object "'+String(c)+'" passed as eval';if(K&&(typeof l.login==="string"||l.login))l.login=function(a){var e=1;return function(j,u,r){b.pause();k.jrpc(K,e++,a,[j,u],function(t){b.resume();!t.error&&t.result?r(t.result):r(null)},function(t,y){b.resume();b.error("&#91;AJAX&#92; Response: "+y+"\n"+t.responseText)})}}(typeof l.login==="boolean"?"login":l.login);if(o("prompt",l.prompt)){var B=new ea({name:l.name,eval:c,prompt:l.prompt,command_list:H,greetings:l.greetings}),n=b.find(".terminal-output").next().cmd({prompt:l.prompt,
history:l.history,historyFilter:l.historyFilter,width:"100%",keydown:p,keypress:l.keypress?function(a){return l.keypress(a,b)}:null,onCommandChange:function(a){if(typeof l.onCommandChange==="function")try{l.onCommandChange(a,b)}catch(e){i(e,"onCommandChange");throw e;}s()},commands:w});P.append(b);l.enabled===true?b.focus():b.disable();k(window).resize(b.resize);b.click(function(){G||b.focus()});g.login&&b.token&&!b.token()&&b.login_name&&!b.login_name()?C():F();typeof k.fn.init.prototype.mousewheel===
"function"&&b.mousewheel(function(a,e){e>0?b.scroll(-40):b.scroll(40);return false},true)}b.data("terminal",b);return b}})(jQuery);
