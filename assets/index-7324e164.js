var g=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function _(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var $="Expected a function",x=0/0,F="[object Symbol]",N=/^\s+|\s+$/g,W=/^[-+]0x[0-9a-f]+$/i,A=/^0b[01]+$/i,B=/^0o[0-7]+$/i,P=parseInt,R=typeof g=="object"&&g&&g.Object===Object&&g,w=typeof self=="object"&&self&&self.Object===Object&&self,D=R||w||Function("return this")(),G=Object.prototype,H=G.toString,U=Math.max,X=Math.min,T=function(){return D.Date.now()};function q(e,t,i){var a,c,b,u,r,f,s=0,O=!1,d=!1,y=!0;if(typeof e!="function")throw new TypeError($);t=E(t)||0,v(i)&&(O=!!i.leading,d="maxWait"in i,b=d?U(E(i.maxWait)||0,t):b,y="trailing"in i?!!i.trailing:y);function p(n){var o=a,l=c;return a=c=void 0,s=n,u=e.apply(l,o),u}function k(n){return s=n,r=setTimeout(m,t),O?p(n):u}function C(n){var o=n-f,l=n-s,S=t-o;return d?X(S,b-l):S}function h(n){var o=n-f,l=n-s;return f===void 0||o>=t||o<0||d&&l>=b}function m(){var n=T();if(h(n))return I(n);r=setTimeout(m,C(n))}function I(n){return r=void 0,y&&a?p(n):(a=c=void 0,u)}function L(){r!==void 0&&clearTimeout(r),s=0,a=f=c=r=void 0}function M(){return r===void 0?u:I(T())}function j(){var n=T(),o=h(n);if(a=arguments,c=this,f=n,o){if(r===void 0)return k(f);if(d)return r=setTimeout(m,t),p(f)}return r===void 0&&(r=setTimeout(m,t)),u}return j.cancel=L,j.flush=M,j}function v(e){var t=typeof e;return!!e&&(t=="object"||t=="function")}function z(e){return!!e&&typeof e=="object"}function J(e){return typeof e=="symbol"||z(e)&&H.call(e)==F}function E(e){if(typeof e=="number")return e;if(J(e))return x;if(v(e)){var t=typeof e.valueOf=="function"?e.valueOf():e;e=v(t)?t+"":t}if(typeof e!="string")return e===0?e:+e;e=e.replace(N,"");var i=A.test(e);return i||B.test(e)?P(e.slice(2),i?2:8):W.test(e)?x:+e}var K=q;const Q=_(K);export{Q as d};
