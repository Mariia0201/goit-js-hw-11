import{S as h,i as n}from"./assets/vendor-46aac873.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const d=document.querySelector(".form"),l=document.querySelector(".gallery"),c=document.querySelector(".loading"),m=new h(".gallery a",{captionsData:"alt",captionDelay:250});d.addEventListener("submit",f);function f(r){r.preventDefault();const o=r.currentTarget.elements.input.value;if(l.innerHTML="",!o.trim()){n.show({title:"❕",theme:"light",message:"Please, fill in the search field",messageSize:"20px",messageColor:"#f96c6c",backgroundColor:"#f5d1d1",position:"topRight",timeout:3e3});return}c.classList.remove("is-hidden"),g(o).then(s=>{s.hits.length===0&&n.show({theme:"dark",message:"Sorry, there are no images matching your search query. Please try again!",messageSize:"16px",messageColor:"#f96c6c",backgroundColor:"#f5d1d1",position:"topRight",timeout:5e3}),l.innerHTML=p(s.hits),m.refresh()}).catch(y).finally(()=>c.classList.add("is-hidden")),r.currentTarget.reset()}function g(r){const o="https://pixabay.com/api",s=new URLSearchParams({key:"42093886-563b8eca1b4570c32a235ec3c",q:r,image_type:"photo",orientation:"horizontal",safesearch:"true"});return fetch(`${o}/?${s}`).then(i=>{if(!i.ok)throw new Error(i.status);return i.json()})}function p(r){return r.map(({webformatURL:o,largeImageURL:s,tags:i,likes:e,views:t,comments:a,downloads:u})=>`<li class="gallery-item">
      <a class="gallery-link" href="${s}">
        <img
          class="gallery-image"
          src="${o}"
          alt="${i}"
          width="360"
        />
      </a>
      <div class="info">
        <div class="block">
          <h2 class="title">Likes</h2>
          <p class="amount">${e}</p>
        </div>
        <div class="block">
          <h2 class="title">Views</h2>
          <p class="amount">${t}</p>
        </div>
        <div class="block">
          <h2 class="title">Comments</h2>
          <p class="amount">${a}</p>
        </div>
        <div class="block">
          <h2 class="title">Downloads</h2>
          <p class="amount">${u}</p>
        </div>
      </div>
    </li>`).join("")}function y(r){console.error(r),l.innerHTML="",n.show({iconUrl:icon,theme:"dark",message:"Sorry, there is a problem with connection with the server.",messageSize:"16px",messageColor:"white",backgroundColor:"#EF4040",position:"center",timeout:5e3})}
//# sourceMappingURL=commonHelpers.js.map
