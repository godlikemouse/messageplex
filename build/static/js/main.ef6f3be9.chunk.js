(this.webpackJsonpmessageplex=this.webpackJsonpmessageplex||[]).push([[0],{13:function(e,n,t){},17:function(e,n,t){},18:function(e,n,t){"use strict";t.r(n);var i=t(2),a=t.n(i),c=t(6),r=t.n(c),o=t(7),s=t(5),u=(t(12),t(13),t(1)),l=t.n(u),p=t(3),f=t.n(p),v=t(0),d=function(e){var n=e.app,t=e.services,i=e.onClick,a=e.notifications;return Object(v.jsx)("div",{className:"application-selector",children:l.a.map(t,(function(e,t){return Object(v.jsxs)("div",{className:f()("application",{active:e.name===n.name}),title:e.name,onClick:function(){return i(e)},children:[Object(v.jsx)("img",{src:e.icon,className:"service-icon"}),a[e.name]?Object(v.jsx)("div",{className:"notification"}):null]},"application-".concat(t))}))})};d.defaultProps={apps:[],onClick:function(e){}};var m=d,j=(t(17),window.require("electron").shell),b=function(e){var n=e.app,t=e.services,c=e.onNotificationChange,r=l.a.map(t,(function(e){return a.a.createRef()})),o=function(e){var n=new URL(e.url).protocol;if("http:"===n||"https:"===n)return e.preventDefault(),j.openExternal(e.url),!1},s=function(e){var n=l.a.get(e,"title"),i=l.a.get(e,"target.attributes['name'].value"),a=l.a.find(t,(function(e){return e.name===i})),r=l.a.get(a,"notification");if(!r)return c(a,!1);var o=new RegExp(r.toString(),"g").test(n);c(a,o)};return Object(i.useEffect)((function(){l.a.each(r,(function(e){e.current.addEventListener("new-window",o),e.current.addEventListener("page-title-updated",s)}));var e=l.a.cloneDeep(r);return function(){l.a.each(e,(function(e){e.current.removeEventListener("new-window",o),e.current.removeEventListener("page-title-updated",s)}))}})),Object(v.jsx)(v.Fragment,{children:l.a.map(t,(function(e,t){return Object(v.jsx)("div",{className:f()("application-view",{hidden:n.name!==e.name}),children:Object(v.jsx)("webview",{className:"application-webview",src:e.url,name:e.name,autosize:"on",ref:r[t]})},"service-".concat(e.name))}))})};b.defaultProps={services:[]};var g=b,h=window.require("electron"),O=h.remote,w=h.ipcRenderer;var x=function(){var e=JSON.parse(O.getGlobal("services"))||[{name:"GMail",url:"https://mail.google.com",icon:"https://mail.google.com/favicon.ico",notification:"\\(\\d\\)"}],n=Object(i.useState)(e[0]),t=Object(s.a)(n,2),a=t[0],c=t[1],r=Object(i.useState)({}),u=Object(s.a)(r,2),p=u[0],f=u[1];return Object(i.useEffect)((function(){var e=l.a.reduce(p,(function(e,n){return e||null!=n}),!1);w.send("tray-notification",e)}),[p]),Object(v.jsxs)("div",{className:"App",children:[Object(v.jsx)(m,{app:a,services:e,onClick:function(e){return c(e)},notifications:p}),Object(v.jsx)(g,{app:a,services:e,onNotificationChange:function(e,n){return function(e,n){if(!(n&&p[e.name]||!n&&!p[e.name])){var t=l.a.extend({},p,Object(o.a)({},e.name,n?e:null));f(t)}}(e,n)}})]})},N=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,19)).then((function(n){var t=n.getCLS,i=n.getFID,a=n.getFCP,c=n.getLCP,r=n.getTTFB;t(e),i(e),a(e),c(e),r(e)}))};r.a.render(Object(v.jsx)(a.a.StrictMode,{children:Object(v.jsx)(x,{})}),document.getElementById("root")),N()}},[[18,1,2]]]);
//# sourceMappingURL=main.ef6f3be9.chunk.js.map