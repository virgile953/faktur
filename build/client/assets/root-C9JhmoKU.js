import{r as i,j as t}from"./index-CKBIMJ8Q.js";import{N as d}from"./Navbar-LaI5eeax.js";import{b as f,c as y,d as x,e as g,_ as S,O as w,M as j,f as k,S as M}from"./components-DqBg-pzF.js";import"./ChevronDownIcon-BVtRQATA.js";import"./use-resolve-button-type-B2Wslbw_.js";/**
 * @remix-run/react v2.16.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */let a="positions";function O({getKey:e,...l}){let{isSpaMode:c}=f(),o=y(),p=x();g({getKey:e,storageKey:a});let m=i.useMemo(()=>{if(!e)return null;let s=e(o,p);return s!==o.key?s:null},[]);if(c)return null;let u=((s,h)=>{if(!window.history.state||!window.history.state.key){let r=Math.random().toString(32).slice(2);window.history.replaceState({key:r},"")}try{let n=JSON.parse(sessionStorage.getItem(s)||"{}")[h||window.history.state.key];typeof n=="number"&&window.scrollTo(0,n)}catch(r){console.error(r),sessionStorage.removeItem(s)}}).toString();return i.createElement("script",S({},l,{suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${u})(${JSON.stringify(a)}, ${JSON.stringify(m)})`}}))}const R=()=>[{rel:"preconnect",href:"https://fonts.googleapis.com"},{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"anonymous"},{rel:"stylesheet",href:"https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"}];function _({children:e}){return t.jsxs("html",{lang:"en",children:[t.jsxs("head",{children:[t.jsx("meta",{charSet:"utf-8"}),t.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),t.jsx(j,{}),t.jsx(k,{})]}),t.jsxs("body",{children:[e,t.jsx(O,{}),t.jsx(M,{})]})]})}function E(){return t.jsxs(t.Fragment,{children:[t.jsx(d,{}),t.jsx(w,{})]})}export{_ as Layout,E as default,R as links};
