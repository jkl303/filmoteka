var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},o=e.parcelRequireae86;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in n){var o=n[e];delete n[e];var a={id:e,exports:{}};return t[e]=a,o.call(a.exports,a,a.exports),a.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){n[e]=t},e.parcelRequireae86=o);var a=o("baSj9"),i=o("2gAtb"),d=o("3HWqg"),r=o("eWCmQ"),l=o("iNeKx"),c=o("cTOKP");function s(e){const t=document.querySelector(".movie-list");try{const n=e.map((e=>{const t=new Date(e.first_air_date?e.first_air_date:e.release_date).getFullYear();return{title:e.title?e.title:e.name,id:e.id,image:e.poster_path?`${c.IMG_URL+e.poster_path}`:d.defaultImg,year:t||"",genres:e.genres.map((e=>`${e.name}`)).join(", ")}}));t.innerHTML=n.map((e=>(0,i.default)(e))).join("")}catch(e){r.Notify.failure("oooops! library is clear",l.notifyParams)}}var u=o("7KwqR"),m=o("31u3U");const f=document.querySelector(".modal"),g=document.querySelector("body"),p=document.querySelector(".movie-list"),E=document.querySelector(".page-heading");function L(e){e.preventDefault();const t=e.path.find((e=>"A"===e.tagName)).getAttribute("id");let n={};n="Watched movie"===E.textContent?y.find((e=>e.id===Number(t))):S.find((e=>e.id===Number(t)));try{!function(e){f.classList.add("modal--show"),g.classList.add("stop-scroll"),f.innerHTML=(0,u.default)(e),function(e){const t=document.querySelector(".modal__btn-watched");t.addEventListener("click",n),"Watched movie"===E.textContent&&(t.textContent="REMOVE FROM WATCHED");function n(n){if(n.preventDefault(),"ADD TO WATCHED"===t.textContent){t.innerHTML="REMOVE FROM WATCHED";(new(0,m.LocalStorageWatchedUtil)).addWatched(e)}else y.splice(y.indexOf(e),1),s(y),t.innerHTML="ADD TO WATCHED",localStorage.setItem("WatchedList",JSON.stringify(y));v()}const o=document.querySelector(".modal__btn-queue");o.addEventListener("click",a),"Queued movie"===E.textContent&&(o.textContent="REMOVE FROM QUEUED");function a(t){if(t.preventDefault(),"ADD TO QUEUED"===o.textContent){o.innerHTML="REMOVE FROM QUEUED";(new(0,m.LocalStorageQueuedUtil)).addQueued(e)}else S.splice(S.indexOf(e),1),s(S),o.innerHTML="ADD TO QUEUED",localStorage.setItem("QueuedList",JSON.stringify(S));v()}document.querySelector(".modal__btn-close").addEventListener("click",(()=>v())),window.addEventListener("click",(e=>{e.target===f&&v()})),window.addEventListener("keydown",(e=>{27===e.keyCode&&v()}))}(e)}(n)}catch(e){console.log(e)}}function v(){f.classList.remove("modal--show"),g.classList.remove("stop-scroll")}null!==localStorage.getItem("theme")?document.body.classList.add("dark"):document.body.classList.remove("dark"),(0,a.getCurrentPage)();let y=JSON.parse(localStorage.getItem("WatchedList")),S=JSON.parse(localStorage.getItem("QueuedList"));const D=document.querySelector(".page-heading"),O=document.getElementById("js-navigationLibraryButtonQueue"),h=document.getElementById("js-navigationLibraryButtonWatched");s(y),p.addEventListener("click",L),O.addEventListener("click",(e=>{e.preventDefault(),O.disabled=!0,h.disabled=!1,D.textContent="Queued movie",S=JSON.parse(localStorage.getItem("QueuedList")),s(S)})),h.addEventListener("click",(e=>{e.preventDefault(),h.disabled=!0,O.disabled=!1,D.textContent="Watched movie",y=JSON.parse(localStorage.getItem("WatchedList")),s(y)}));
//# sourceMappingURL=library.60897f43.js.map
