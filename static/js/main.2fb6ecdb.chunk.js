(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{150:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(41),s=a.n(o),c=(a(54),a(42)),l=a(43),i=a(47),u=a(44),m=a(48),d=(a(55),a(45)),p=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(i.a)(this,Object(u.a)(t).call(this))).state={parkings:[]},e}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.updateData(),setInterval(function(){e.updateData()},3e4)}},{key:"updateData",value:function(){var e=this;window.fetch("".concat("https://cors.io/?").concat("https://data.montpellier3m.fr/api/3/action/package_show?id=90e17b94-989f-4d66-83f4-766d4587bec2")).then(function(e){return e.json()}).then(function(t){t.result.resources.forEach(function(t){var a=t.name;a&&!a.includes(".xml")&&window.fetch("".concat("https://cors.io/?").concat(t.url)).then(function(e){return e.text()}).then(function(e){return(new window.DOMParser).parseFromString(e,"text/xml")}).then(function(t){try{var n=t.getElementsByTagName("Status")[0].childNodes[0].nodeValue,r=Number(t.getElementsByTagName("Free")[0].childNodes[0].nodeValue),o=Number(t.getElementsByTagName("Total")[0].childNodes[0].nodeValue);if(e.state.parkings.find(function(e){return e.name===a})){var s=e.state.parkings,c=e.state.parkings.findIndex(function(e){return e.name===a});s.splice(c,1,{name:a,status:n,free:r,total:o}),e.setState({parkings:s})}else{var l=e.state.parkings;l.push({name:a,status:n,free:r,total:o}),e.setState({parkings:l})}}catch(i){}})})})}},{key:"statusStyle",value:function(e){return"Open"===e?"text-open":"text-closed"}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"App"},r.a.createElement("div",{className:"container"},r.a.createElement("img",{src:"/montpellier-logo.png",alt:"Montpellier Parkings"}),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("h1",{className:"refresh"},"Parkings Montpellier M\xe9tropole"),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("div",{className:"row"},this.state.parkings.map(function(t){return r.a.createElement("div",{className:"col-sm-4 col-md-3 margin-bottom",key:t.name},r.a.createElement("h4",{className:"text-bold ".concat(e.statusStyle(t.status))},t.name.replace(/Parking\s/g,"")," (",t.free,")"),r.a.createElement(d.a,{options:{legend:{display:!1}},data:{datasets:[{data:[t.total-t.free,t.free],backgroundColor:["rgb(255, 99, 132)","rgb(75, 192, 192)"]}],labels:["Places prises","Places restantes"]}}))}))))}}]),t}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(p,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},49:function(e,t,a){e.exports=a(150)},54:function(e,t,a){},55:function(e,t,a){}},[[49,1,2]]]);
//# sourceMappingURL=main.2fb6ecdb.chunk.js.map