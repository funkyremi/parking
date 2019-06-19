(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{152:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(42),i=a.n(o),s=(a(56),a(43)),l=a(44),c=a(49),m=a(45),u=a(50),d=(a(57),a(24)),f=a(47),p=a.n(f),g=a(48),h=a.n(g),k=function(e){function t(){var e;return Object(s.a)(this,t),(e=Object(c.a)(this,Object(m.a)(t).call(this))).state={parkings:[],openMap:!1},e}return Object(u.a)(t,e),Object(l.a)(t,[{key:"componentWillMount",value:function(){d.a.pluginService.register({beforeDraw:function(e){if(e.config.options.elements.center){var t=e.chart.ctx,a=e.config.options.elements.center,n=a.fontStyle||"Arial",r=a.text,o=a.color||"#000",i=(a.sidePadding||20)/100*(2*e.innerRadius);t.font="30px "+n;var s=t.measureText(r).width,l=(2*e.innerRadius-i)/s,c=Math.floor(30*l),m=2*e.innerRadius,u=Math.min(c,m);t.textAlign="center",t.textBaseline="middle";var d=(e.chartArea.left+e.chartArea.right)/2,f=(e.chartArea.top+e.chartArea.bottom)/2;t.font=u+"px "+n,t.fillStyle=o,t.fillText(r,d,f)}}})}},{key:"componentDidMount",value:function(){var e=this;this.updateData(),setInterval(function(){e.updateData()},3e4)}},{key:"formatParkingName",value:function(e){return e.replace(/Parking\sd?u?\s?/g,"")}},{key:"sortParkingsArray",value:function(e){var t=this;return e.sort(function(e,a){return t.formatParkingName(e.name)<t.formatParkingName(a.name)?-1:t.formatParkingName(e.name)>t.formatParkingName(a.name)?1:0})}},{key:"getMapLink",value:function(e){return"http://maps.apple.com/?daddr=".concat(e.split(" ").filter(Boolean).join("+"),"&dirflg=d&t=h")}},{key:"updateData",value:function(){var e=this;window.fetch("".concat("https://cors.io/?").concat("https://data.montpellier3m.fr/api/3/action/package_show?id=90e17b94-989f-4d66-83f4-766d4587bec2")).then(function(e){return e.json()}).then(function(t){t.result.resources.forEach(function(t){var a=t.name,n=t.id;a&&!a.includes(".xml")&&window.fetch("".concat("https://cors.io/?").concat(t.url)).then(function(e){return e.text()}).then(function(e){return(new window.DOMParser).parseFromString(e,"text/xml")}).then(function(t){try{var r=t.getElementsByTagName("Status")[0].childNodes[0].nodeValue,o=Number(t.getElementsByTagName("Free")[0].childNodes[0].nodeValue),i=Number(t.getElementsByTagName("Total")[0].childNodes[0].nodeValue);if(e.state.parkings.find(function(e){return e.name===a})){var s=e.state.parkings,l=e.state.parkings.findIndex(function(e){return e.name===a});s.splice(l,1,{id:n,name:a,status:r,free:o,total:i}),e.setState({parkings:e.sortParkingsArray(s)})}else{var c=e.state.parkings;c.push({id:n,name:a,status:r,free:o,total:i}),e.setState({parkings:e.sortParkingsArray(c)});var m=document.getElementById(n),u=e;h.a.set(m,{change:function(e,t){var r=1+e/2;document.getElementById(n).style.transform="scale(".concat(r,")"),1!==e||u.state.openMap||(u.setState({openMap:!0}),console.log(window.location),setTimeout(function(){window.location=u.getMapLink(a)},5),document.getElementById(n).style.transform="scale(1)")},end:function(){document.getElementById(n).style.transform="scale(1)",u.setState({openMap:!1})}})}}catch(d){}})})})}},{key:"statusStyle",value:function(e){return"Open"===e?"text-open":"text-closed"}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"App"},r.a.createElement("span",{id:"test",className:"logo noselect default-cursor"},"MONT",r.a.createElement("img",{src:"p.jpg",alt:"logo",className:"animated pulse infinite logo-img"}),"ELLIER"),r.a.createElement("div",{className:"container"},0===this.state.parkings.length&&r.a.createElement(p.a,{type:"spinningBubbles",color:"#3258a1",className:"preloader",height:"5em",width:"5em"}),r.a.createElement("div",{className:"row"},this.state.parkings.map(function(t){return r.a.createElement("div",{className:"col-xs-12 col-sm-6 col-md-4 col-xl-3 margin-bottom",key:t.id},r.a.createElement("h5",{className:"default-cursor noselect text-bold ".concat(e.statusStyle(t.status))},e.formatParkingName(t.name)),r.a.createElement("div",{id:t.id},r.a.createElement(d.b,{options:{legend:{display:!1},tooltips:{enabled:!1},elements:{center:{text:t.free,color:"rgb(75, 192, 192)",fontStyle:"Helvetica",sidePadding:30}}},data:{datasets:[{data:[t.total-t.free,t.free],backgroundColor:["rgb(255, 99, 132)","rgb(75, 192, 192)"]}]}})))}))),r.a.createElement("div",{className:"footer"},r.a.createElement("a",{href:"https://github.com/funkyremi"},"Made with ",r.a.createElement("span",{role:"img","aria-label":"love"},"\ufe0f\u2764\ufe0f")," in Montpellier"),r.a.createElement("br",null),r.a.createElement("a",{href:"https://data.montpellier3m.fr"},"Sources : Open Data Montpellier M\xe9diterran\xe9e M\xe9tropole")))}}]),t}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(k,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},51:function(e,t,a){e.exports=a(152)},56:function(e,t,a){},57:function(e,t,a){}},[[51,1,2]]]);
//# sourceMappingURL=main.43fda2d0.chunk.js.map