import{d as s,A as l,T as u}from"./framework.b8b3e2fc.js";const c=(e,t)=>{if(e.install=o=>{for(const n of[e,...Object.values(t??{})])o.component(n.name,n)},t)for(const[o,n]of Object.entries(t))e[o]=n;return e},a=e=>{const t=window.getComputedStyle(e,null),o=Number.parseInt(t.paddingLeft,10)||0,n=Number.parseInt(t.paddingRight,10)||0,r=Number.parseInt(t.paddingTop,10)||0,i=Number.parseInt(t.paddingBottom,10)||0;return{left:o,right:n,top:r,bottom:i}},p=e=>{const{left:t,right:o}=a(e),n=e.children[0];if(!n)return!1;const r=t+o+n.offsetWidth;return e.clientWidth<=r};function d(e=!0){const t=s(null),o=s(!1),n=()=>{if(!t.value)return;const r=t.value;o.value=p(r)};return l(n),e&&u(n),{textEllipsisRef:t,isOverflow:o,updateTextEllipsisStatus:n}}export{d as R,c as a};
