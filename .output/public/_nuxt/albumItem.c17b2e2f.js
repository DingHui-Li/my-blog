import{d as h,a as g,aQ as v,c as f,k as s,l as o,t as r,F as i,af as c,m as e,ad as l,ae as m,D as y}from"./entry.01da0e6f.js";import k from"./topicTag.38311d61.js";import{_ as b}from"./_plugin-vue_export-helper.c27b6911.js";const w={key:0},B={key:0,class:"year"},D={class:"moment-item"},I={class:"month"},S={key:0},T={class:"right"},C={class:"info"},F={class:"time"},M={class:"topics"},N={class:"img"},Y=["src"],V=h({__name:"albumItem",props:{data:{},showMonth:{},showYear:{}},setup(_){const u=_,p=g();v().globalSetting.profile;let n=f(()=>new Date(Number(u.data.createTime)));return(t,d)=>t.data.imgs.length?(s(),o("div",w,[t.showYear?(s(),o("div",B,r(i(n).getFullYear())+"年",1)):c("",!0),e("div",D,[e("div",I,[t.showMonth?(s(),o("span",S,r(i(n).getMonth()+1)+"月",1)):c("",!0)]),e("div",T,[e("div",C,[e("div",F,r(i(n).getDate())+"日",1)]),e("div",M,[(s(!0),o(l,null,m(t.data.topics,a=>(s(),y(k,{data:a},null,8,["data"]))),256))]),e("div",{class:"imgs",onClick:d[0]||(d[0]=a=>i(p).push("/article/"+t.data._id+"#photo"))},[(s(!0),o(l,null,m(t.data.imgs,(a,A)=>(s(),o("div",N,[e("img",{src:a+"?x-oss-process=image/resize,m_fill,w_400"},null,8,Y)]))),256))])])])])):c("",!0)}});const R=b(V,[["__scopeId","data-v-38d10bc2"]]);export{R as default};