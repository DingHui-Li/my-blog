import u from"./earth.7c34a21e.js";import{r as v,av as m,l as i,q as h,m as t,ad as f,ae as x,F as l,k as _,v as r,t as e,au as p,x as g,y}from"./entry.01da0e6f.js";import{_ as I}from"./_plugin-vue_export-helper.c27b6911.js";import"./util.e9db9118.js";const k=a=>(g("data-v-061c2ce3"),a=a(),y(),a),S={class:"visitor-page"},Y=k(()=>t("div",{class:"title"},"访问记录",-1)),B={class:"list"},D={class:"item"},N={class:"col ip"},V={class:"col url"},E={class:"col time"},F={__name:"index",setup(a){let d=v([]);n(),setInterval(()=>{n()},5e3);function n(){m.get("/api/log?type=client",{size:100}).then(o=>{var c;d.value=(c=o==null?void 0:o.data)==null?void 0:c.list})}return(o,c)=>(_(),i("div",S,[Y,h(u),t("div",B,[(_(!0),i(f,null,x(l(d),s=>(_(),i("div",D,[t("div",N,[r(e(s.ip),1),t("div",null,e(s.location),1)]),t("div",V,e(s.url),1),t("div",E,[r(e(l(p)(s.time).calendar()),1),t("div",null,e(l(p)(s.time).format("YYYY-MM-DD HH:mm:ss")),1)])]))),256))])]))}},w=I(F,[["__scopeId","data-v-061c2ce3"]]);export{w as default};