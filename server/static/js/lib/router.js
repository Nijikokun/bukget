var hashStrip=/^#*/,namedParam=/:([\w\d]+)/g,splatParam=/\*([\w\d]+)/g,escapeRegExp=/[-[\]{}()+?.,\\^$|#\s]/g,Routes=[],makeArray=function(a){return Array.prototype.slice.call(a,0)},Route={historySupport:"history"in window,history:!1,routes:[],proxy:function(a){var b=this;return function(){return a.apply(b,arguments)}},proxyAll:function(){for(var a=makeArray(arguments),b=0;b<a.length;b++)this[a[b]]=this.proxy(this[a[b]])},add:function(a,b){if(typeof a=="object")for(var c in a)this.add(c,a[c]);else typeof a==
"string"&&(a=a.replace(escapeRegExp,"\\$&").replace(namedParam,"([^/]*)").replace(splatParam,"(.*?)"),a=RegExp("^"+a+"$")),this.routes.push({route:a,callback:b})},setup:function(a){if(a&&a.history)this.history=this.historySupport&&a.history;this.history?$(window).bind("popstate",this.change):$(window).bind("hashchange",this.change);this.change()},unbind:function(){this.history?$(window).unbind("popstate",this.change):$(window).unbind("hashchange",this.change)},navigate:function(){var a=makeArray(arguments),
b=!1;typeof a[a.length-1]=="boolean"&&(b=a.pop());a=a.join("/");if(this.path!=a){if(!b)this.path=a;this.history?history.pushState({},document.title,this.getHost()+a):window.location.hash=a}},match:function(a,b,c){a=b.exec(a);if(!a)return!1;a=a.slice(1);c.apply(c,a);return!0},getPath:function(){return window.location.pathname},getHash:function(){return window.location.hash},getHost:function(){return(document.location+"").replace(this.getPath()+this.getHash(),"")},getFragment:function(){return this.getHash().replace(hashStrip,
"")},change:function(){var a=this.history?this.getPath():this.getFragment();if(a!=this.path){this.path=a;a.isEmpty()&&(a="/");for(var b=0;b<this.routes.length;b++){var c=this.routes[b];if(this.match(a,c.route,c.callback))break}}}};Route.proxyAll("change");Class.$globals.$route=function(a,b){Route.add(a,Route.proxy(b))};Class.$globals.$routes=function(a){for(var b in a)Class.$globals.$route(b,a[b])};Class.$globals.$navigate=function(){Route.navigate.apply(Route,arguments)};