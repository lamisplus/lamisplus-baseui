(window.webpackJsonp=window.webpackJsonp||[]).push([[43],{1711:function(e,a,t){"use strict";var l=t(22),n=t(1),c=t.n(n),s=(t(30),t(1746)),r=t(1747),m=function(e){var a=e.headers,t=e.usersData,n=Object(l.a)(e,["headers","usersData"]);return c.a.createElement(s.a,Object.assign({responsive:!0,hover:!0},n),c.a.createElement("thead",null,c.a.createElement("tr",{className:"text-capitalize "},a.map(function(e,a){return c.a.createElement("th",{key:a},e)}))),c.a.createElement("tbody",null,t.map(function(e,a){var t=e.name;return c.a.createElement("tr",{key:a},c.a.createElement("td",{className:"text-primary"},t),c.a.createElement("td",{className:"align-middle text-center"},c.a.createElement(r.a,{color:"success"})))})))};m.defaultProps={headers:[],usersData:[]},a.a=m},1947:function(e,a,t){"use strict";t.r(a);var l=t(42),n=t(43),c=t(45),s=t(44),r=t(46),m=t(401),o=t(1711),i=t(51),d=t(40),u=t(13),E=t(914),p=t(915),b=["January","February","March","April"],h=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return{labels:b,datasets:[Object(u.a)({label:"Male",backgroundColor:Object(E.a)("primary"),borderColor:Object(E.a)("primary"),borderWidth:1,data:[Object(p.a)(),Object(p.a)(),Object(p.a)(),Object(p.a)()]},e),Object(u.a)({label:"Female",backgroundColor:Object(E.a)("secondary"),borderColor:Object(E.a)("secondary"),borderWidth:1,data:[Object(p.a)(),Object(p.a)(),Object(p.a)(),Object(p.a)()]},a)]}};console.log(h);var N=[{name:"Tom Suliman"},{name:"Jenny Alex"},{name:"Simi Adedeji"},{name:"Christine Ada"}],x=t(1),f=t.n(x),g=t(918),v=t(626),y=t(627),w=t(267),j=t(268),O=t(269),k=t(272),C={borderColor:"#fff"},A=function(e){function a(){return Object(l.a)(this,a),Object(c.a)(this,Object(s.a)(a).apply(this,arguments))}return Object(r.a)(a,e),Object(n.a)(a,[{key:"componentDidMount",value:function(){window.scrollTo(0,0)}},{key:"render",value:function(){return f.a.createElement(m.a,{className:"DashboardPage p-5",title:"Dashboard"},f.a.createElement(v.a,null,f.a.createElement(y.a,{lg:3,md:6,sm:6,xs:12},f.a.createElement(w.a,{style:C,className:"card-stats mb-4 mb-xl-0 p-3"},f.a.createElement(j.a,null,f.a.createElement(v.a,null,f.a.createElement("div",{className:"col"},f.a.createElement(O.a,{tag:"h6",className:" text-uppercase text-muted mb-0"},"Total Patient"),f.a.createElement("span",{className:"h3 font-weight-bold mb-5"},"350,897")),f.a.createElement(y.a,{className:"col-auto"},f.a.createElement("div",{className:"icon icon-shape  text-primary "},f.a.createElement(i.l,{size:30})))),f.a.createElement("p",{className:"mt-3 mb-0 text-muted text-sm"},f.a.createElement("span",{className:"text-success mr-2"},f.a.createElement("i",{className:"fa fa-arrow-up"})," 3.48%")," ",f.a.createElement("span",{className:"text-nowrap"},"this month"))))),f.a.createElement(y.a,{lg:3,md:6,sm:6,xs:12},f.a.createElement(w.a,{style:C,className:"card-stats mb-4 mb-xl-0 p-3"},f.a.createElement(j.a,null,f.a.createElement(v.a,null,f.a.createElement("div",{className:"col"},f.a.createElement(O.a,{tag:"h6",className:"text-uppercase text-muted mb-0"},"Emergency"),f.a.createElement("span",{className:"h2 font-weight-bold mb-0"},"22")),f.a.createElement(y.a,{className:"col-auto"},f.a.createElement("div",{className:"icon icon-shape bg-danger text-white rounded-circle shadow"},f.a.createElement(d.a,{size:30})))),f.a.createElement("p",{className:"mt-3 mb-0 text-muted text-sm"},f.a.createElement("span",{className:"text-danger mr-2"},f.a.createElement("i",{className:"fas fa-arrow-down"})," 3.48%")," ",f.a.createElement("span",{className:"text-nowrap"},"This week"))))),f.a.createElement(y.a,{lg:3,md:6,sm:6,xs:12},f.a.createElement(w.a,{style:C,className:"card-stats mb-4 mb-xl-0 p-3"},f.a.createElement(j.a,null,f.a.createElement(v.a,null,f.a.createElement("div",{className:"col"},f.a.createElement(O.a,{tag:"h6",className:"text-uppercase text-muted mb-0"},"Checked In"),f.a.createElement("span",{className:"h2 font-weight-bold mb-0"},"924")),f.a.createElement(y.a,{className:"col-auto"},f.a.createElement("div",{className:"icon icon-shape bg-yellow text-black rounded-circle shadow"},f.a.createElement(i.k,{size:30})))),f.a.createElement("p",{className:"mt-3 mb-0 text-muted text-sm"},f.a.createElement("span",{className:"text-warning mr-2"},f.a.createElement("i",{className:"fas fa-arrow-down"})," 1.10%")," ",f.a.createElement("span",{className:"text-nowrap"},"As at Today"))))),f.a.createElement(y.a,{lg:3,md:6,sm:6,xs:12},f.a.createElement(w.a,{style:C,className:"card-stats mb-4 mb-xl-0 p-3 "},f.a.createElement(j.a,null,f.a.createElement(v.a,null,f.a.createElement("div",{className:"col"},f.a.createElement(O.a,{tag:"h6",className:"text-uppercase text-muted mb-0"},"Appointments"),f.a.createElement("span",{className:"h2 font-weight-bold mb-0"},"49")),f.a.createElement(y.a,{className:"col-auto"},f.a.createElement("div",{className:"icon icon-shape bg-info text-white rounded-circle shadow"},f.a.createElement(i.b,{size:30})))),f.a.createElement("p",{className:"mt-3 mb-0 text-muted text-sm"},f.a.createElement("span",{className:"text-success mr-2"},f.a.createElement("i",{className:"fas fa-arrow-up"})," 12%")," ",f.a.createElement("span",{className:"text-nowrap"},"As at Today")))))),f.a.createElement(v.a,null,f.a.createElement(y.a,{md:"8",sm:"12",xs:"12",xl:"6",lg:"8"},f.a.createElement(w.a,null,f.a.createElement(k.a,null,"Total Registered Patients (Male and Female)  "," ",f.a.createElement("small",{className:"text-muted text-capitalize"},"In the last 4 Months")),f.a.createElement(j.a,null,f.a.createElement(g.b,{data:h({fill:!1},{fill:!1})})))),f.a.createElement(y.a,{md:"4",sm:"12",xs:"12",xl:"6",lg:"4"},f.a.createElement(w.a,null,f.a.createElement(k.a,null,"Active Clinicians Now"),f.a.createElement(j.a,null,f.a.createElement(o.a,{headers:["name"],usersData:N}))))))}}]),a}(f.a.Component);a.default=A},401:function(e,a,t){"use strict";var l=t(22),n=t(1),c=t.n(n),s=(t(30),t(60)),r=t(687),m=t(688),o=t(68),i=t(9),d=t.n(i),u={h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6","display-1":"h1","display-2":"h1","display-3":"h1","display-4":"h1",p:"p",lead:"p",blockquote:"blockquote"},E=function(e){var a,t=e.tag,n=e.className,s=e.type,r=Object(l.a)(e,["tag","className","type"]),m=d()(Object(o.a)({},s,!!s),n);return a=t||(!t&&u[s]?u[s]:"p"),c.a.createElement(a,Object.assign({},r,{className:m}))};E.defaultProps={type:"p"};var p=E,b=s.a.create("page"),h=function(e){var a=e.title,t=e.breadcrumbs,n=e.tag,s=e.className,o=e.children,i=Object(l.a)(e,["title","breadcrumbs","tag","className","children"]),d=b.b("px-5","p-5",s);return c.a.createElement(n,Object.assign({className:d},i),c.a.createElement("div",{className:b.e("header")},a&&"string"===typeof a?c.a.createElement(p,{type:"h4",className:b.e("title")},a):a,t&&c.a.createElement(r.a,{className:b.e("breadcrumb")},c.a.createElement(m.a,null,"Home"),t.length&&t.map(function(e,a){var t=e.name,l=e.active;return c.a.createElement(m.a,{key:a,active:l},t)}))),o)};h.defaultProps={tag:"div",title:""};a.a=h},914:function(e,a,t){"use strict";t.d(a,"a",function(){return l});var l=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"primary";return"undefined"===typeof window?null:window.getComputedStyle(document.documentElement).getPropertyValue("--".concat(e))}},915:function(e,a,t){"use strict";t.d(a,"a",function(){return c});var l=t(916),n=t.n(l),c=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1e3;return n()().number({min:e,max:a})}}}]);
//# sourceMappingURL=43.22e3eedd.chunk.js.map