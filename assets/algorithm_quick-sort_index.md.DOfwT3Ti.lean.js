import{B as E}from"./chunks/baseSort.B9phsB3y.js";import{d as e,o as p,b as r,k as g,c as d,I as y,a3 as t}from"./chunks/framework.DtS1GCNb.js";import"./chunks/stao-ui-utils.BeyqDMGl.js";import"./chunks/MapCache.D46w3Ur3.js";import"./chunks/index.DOFZgDuz.js";const F="/stao-ui/assets/quicksort.BdVuWP4H.webp";function k(s,a=(i,h)=>i>h){if(s.length<2)return s;const i=s[0],h=[],l=[];for(let n=1;n<s.length;n++)a(s[n],i)?l.push(s[n]):h.push(s[n]);return[...k(h,a),i,...k(l,a)]}const c=e({__name:"sort",setup(s){return(a,i)=>(p(),r(E,{sort:g(k)},null,8,["sort"]))}}),C=t("",17),o=t("",1),b=JSON.parse('{"title":"Quick Sort 快速排序","description":"","frontmatter":{"head":[["link",{"rel":"stylesheet","href":"https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css"}]]},"headers":[],"relativePath":"algorithm/quick-sort/index.md","filePath":"algorithm/quick-sort/index.md","lastUpdated":1698633593000}'),A={name:"algorithm/quick-sort/index.md"},f=Object.assign(A,{setup(s){return(a,i)=>(p(),d("div",null,[C,y(c),o]))}});export{b as __pageData,f as default};
