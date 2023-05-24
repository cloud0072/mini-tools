import{_ as $,D as tt,r as et,t as ot,a as x,o as A,c as nt,w as l,b as s,d as p,e as _,m as R,f as w,g as rt,F as at,h as st}from"./index-1742d53e.js";const P="3.7.5",lt=P,it=typeof atob=="function",ct=typeof btoa=="function",y=typeof Buffer=="function",F=typeof TextDecoder=="function"?new TextDecoder:void 0,L=typeof TextEncoder=="function"?new TextEncoder:void 0,dt="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",m=Array.prototype.slice.call(dt),b=(t=>{let e={};return t.forEach((n,o)=>e[n]=o),e})(m),ut=/^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/,a=String.fromCharCode.bind(String),S=typeof Uint8Array.from=="function"?Uint8Array.from.bind(Uint8Array):t=>new Uint8Array(Array.prototype.slice.call(t,0)),T=t=>t.replace(/=/g,"").replace(/[+\/]/g,e=>e=="+"?"-":"_"),O=t=>t.replace(/[^A-Za-z0-9\+\/]/g,""),V=t=>{let e,n,o,d,i="";const c=t.length%3;for(let u=0;u<t.length;){if((n=t.charCodeAt(u++))>255||(o=t.charCodeAt(u++))>255||(d=t.charCodeAt(u++))>255)throw new TypeError("invalid character found");e=n<<16|o<<8|d,i+=m[e>>18&63]+m[e>>12&63]+m[e>>6&63]+m[e&63]}return c?i.slice(0,c-3)+"===".substring(c):i},U=ct?t=>btoa(t):y?t=>Buffer.from(t,"binary").toString("base64"):V,B=y?t=>Buffer.from(t).toString("base64"):t=>{let n=[];for(let o=0,d=t.length;o<d;o+=4096)n.push(a.apply(null,t.subarray(o,o+4096)));return U(n.join(""))},g=(t,e=!1)=>e?T(B(t)):B(t),ft=t=>{if(t.length<2){var e=t.charCodeAt(0);return e<128?t:e<2048?a(192|e>>>6)+a(128|e&63):a(224|e>>>12&15)+a(128|e>>>6&63)+a(128|e&63)}else{var e=65536+(t.charCodeAt(0)-55296)*1024+(t.charCodeAt(1)-56320);return a(240|e>>>18&7)+a(128|e>>>12&63)+a(128|e>>>6&63)+a(128|e&63)}},xt=/[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,Z=t=>t.replace(xt,ft),I=y?t=>Buffer.from(t,"utf8").toString("base64"):L?t=>B(L.encode(t)):t=>U(Z(t)),h=(t,e=!1)=>e?T(I(t)):I(t),E=t=>h(t,!0),_t=/[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g,ht=t=>{switch(t.length){case 4:var e=(7&t.charCodeAt(0))<<18|(63&t.charCodeAt(1))<<12|(63&t.charCodeAt(2))<<6|63&t.charCodeAt(3),n=e-65536;return a((n>>>10)+55296)+a((n&1023)+56320);case 3:return a((15&t.charCodeAt(0))<<12|(63&t.charCodeAt(1))<<6|63&t.charCodeAt(2));default:return a((31&t.charCodeAt(0))<<6|63&t.charCodeAt(1))}},N=t=>t.replace(_t,ht),j=t=>{if(t=t.replace(/\s+/g,""),!ut.test(t))throw new TypeError("malformed base64.");t+="==".slice(2-(t.length&3));let e,n="",o,d;for(let i=0;i<t.length;)e=b[t.charAt(i++)]<<18|b[t.charAt(i++)]<<12|(o=b[t.charAt(i++)])<<6|(d=b[t.charAt(i++)]),n+=o===64?a(e>>16&255):d===64?a(e>>16&255,e>>8&255):a(e>>16&255,e>>8&255,e&255);return n},v=it?t=>atob(O(t)):y?t=>Buffer.from(t,"base64").toString("binary"):j,q=y?t=>S(Buffer.from(t,"base64")):t=>S(v(t).split("").map(e=>e.charCodeAt(0))),G=t=>q(H(t)),yt=y?t=>Buffer.from(t,"base64").toString("utf8"):F?t=>F.decode(q(t)):t=>N(v(t)),H=t=>O(t.replace(/[-_]/g,e=>e=="-"?"+":"/")),C=t=>yt(H(t)),pt=t=>{if(typeof t!="string")return!1;const e=t.replace(/\s+/g,"").replace(/={0,2}$/,"");return!/[^\s0-9a-zA-Z\+/]/.test(e)||!/[^\s0-9a-zA-Z\-_]/.test(e)},J=t=>({value:t,enumerable:!1,writable:!0,configurable:!0}),K=function(){const t=(e,n)=>Object.defineProperty(String.prototype,e,J(n));t("fromBase64",function(){return C(this)}),t("toBase64",function(e){return h(this,e)}),t("toBase64URI",function(){return h(this,!0)}),t("toBase64URL",function(){return h(this,!0)}),t("toUint8Array",function(){return G(this)})},M=function(){const t=(e,n)=>Object.defineProperty(Uint8Array.prototype,e,J(n));t("toBase64",function(e){return g(this,e)}),t("toBase64URI",function(){return g(this,!0)}),t("toBase64URL",function(){return g(this,!0)})},mt=()=>{K(),M()},z={version:P,VERSION:lt,atob:v,atobPolyfill:j,btoa:U,btoaPolyfill:V,fromBase64:C,toBase64:h,encode:h,encodeURI:E,encodeURL:E,utob:Z,btou:N,decode:C,isValid:pt,fromUint8Array:g,toUint8Array:G,extendString:K,extendUint8Array:M,extendBuiltins:mt};const bt={name:"ToolBase64",components:{DeleteOutlined:tt},setup(){const t=et({text1:"",text2:"",autoIndex:1,historyList:[]}),e={rows:8,autoSize:{minRows:8,maxRows:8}},n=()=>{const r=z.encode(t.text1);t.text2=r,t.historyList.unshift({key:"历史"+t.autoIndex++,value:r}),console.log("encodeBase64",t.text1)},o=()=>{const r=z.decode(t.text1);t.text2=r,t.historyList.unshift({key:"历史"+t.autoIndex++,value:r}),console.log("decodeBase64",t.text1)},d=()=>{const r=encodeURIComponent(t.text1);t.text2=r,t.historyList.unshift({key:"历史"+t.autoIndex++,value:r}),console.log("encodeBase64",t.text1)},i=()=>{const r=decodeURIComponent(t.text1);t.text2=r,t.historyList.unshift({key:"历史"+t.autoIndex++,value:r}),console.log("decodeBase64",t.text1)},c=r=>{t.historyList.splice(r,1)},u=()=>{t.historyList=[]};return{...ot(t),textareaProps:e,encodeBase64:n,decodeBase64:o,encodeURL:d,decodeURL:i,handleDel:c,handleDelAll:u}}},gt={class:"form-action"},At={class:"history-list"},Bt={class:"history-wrapper"},Ct={class:"history-title"},Ut={class:"history-option"};function vt(t,e,n,o,d,i){const c=x("a-button"),u=x("a-space"),r=x("a-textarea"),k=x("a-form-item"),Q=x("a-form"),D=x("a-col"),W=x("DeleteOutlined"),X=x("a-row");return A(),nt(X,{gutter:20,style:{height:"100%"}},{default:l(()=>[s(D,{span:14},{default:l(()=>[p("div",gt,[s(u,null,{default:l(()=>[s(c,{size:"large",onClick:o.encodeBase64},{default:l(()=>[_("Base64编码")]),_:1},8,["onClick"]),s(c,{size:"large",onClick:o.decodeBase64},{default:l(()=>[_("Base64解码")]),_:1},8,["onClick"]),s(c,{size:"large",onClick:o.encodeURL},{default:l(()=>[_("URL编码")]),_:1},8,["onClick"]),s(c,{size:"large",onClick:o.decodeURL},{default:l(()=>[_("URL解码")]),_:1},8,["onClick"])]),_:1})]),s(Q,{layout:"vertical"},{default:l(()=>[s(k,{label:"输入"},{default:l(()=>[s(r,R({value:t.text1,"onUpdate:value":e[0]||(e[0]=f=>t.text1=f)},o.textareaProps),null,16,["value"])]),_:1}),s(k,{label:"输出"},{default:l(()=>[s(r,R({value:t.text2,"onUpdate:value":e[1]||(e[1]=f=>t.text2=f)},o.textareaProps),null,16,["value"])]),_:1})]),_:1})]),_:1}),s(D,{span:10},{default:l(()=>[p("div",At,[p("div",Bt,[p("div",Ct,[_(" 历史记录 "),s(c,{type:"link",onClick:e[2]||(e[2]=f=>o.handleDelAll())},{default:l(()=>[_("清空全部")]),_:1})]),(A(!0),w(at,null,rt(t.historyList,(f,Y)=>(A(),w("div",{class:"history-item",key:f.key},[p("div",Ut,[_(st(f.key)+" ",1),s(c,{type:"link",onClick:kt=>o.handleDel(Y)},{default:l(()=>[s(W)]),_:2},1032,["onClick"])]),s(r,{value:f.value,rows:3},null,8,["value"])]))),128))])])]),_:1})]),_:1})}const Rt=$(bt,[["render",vt]]);export{Rt as default};