import{B as p}from"./chunks/baseSort.B9phsB3y.js";import{d as E,o as l,b as e,k as r,c as d,I as g,a3 as t}from"./chunks/framework.DtS1GCNb.js";import"./chunks/stao-ui-utils.BeyqDMGl.js";import"./chunks/MapCache.D46w3Ur3.js";import"./chunks/index.DOFZgDuz.js";const y="/stao-ui/assets/selectionsort.DxFZ2WDR.webp";function F(s,k=(a,i)=>a>i){const a=s.length;for(let i=0;i<a-1;i++){let n=i;for(let h=i+1;h<a;h++)k(s[n],s[h])&&(n=h);n!==i&&([s[i],s[n]]=[s[n],s[i]])}return s}const c=E({__name:"sort",setup(s){return(k,a)=>(l(),e(p,{sort:r(F)},null,8,["sort"]))}}),o=t("",14),C=t("",1),b=JSON.parse('{"title":"Selection Sort 选择排序","description":"","frontmatter":{"head":[["link",{"rel":"stylesheet","href":"https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css"}]]},"headers":[],"relativePath":"algorithm/selection-sort/index.md","filePath":"algorithm/selection-sort/index.md","lastUpdated":1698632600000}'),A={name:"algorithm/selection-sort/index.md"},f=Object.assign(A,{setup(s){return(k,a)=>(l(),d("div",null,[o,g(c),C]))}});export{b as __pageData,f as default};
