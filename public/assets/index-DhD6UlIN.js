(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function e(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(r){if(r.ep)return;r.ep=!0;const n=e(r);fetch(r.href,n)}})();class p{constructor(t){this.parent=t}getHTML(t){return`
            <div class="card" style="width: 300px; margin: 10px;">
                <img class="card-img-top" src="${t.src}" alt="картинка">
                <div class="card-body">
                    <h5 class="card-title">${t.title}</h5>
                    <p class="card-text">${t.text}</p>
                    <button class="btn btn-primary" id="click-card-${t.id}" data-id="${t.id}">Нажми на меня</button>
                </div>
            </div>
        `}addListeners(t,e){const s=document.getElementById(`click-card-${t.id}`);s&&s.addEventListener("click",r=>{r.preventDefault(),e(r)})}render(t,e){const s=this.getHTML(t);this.parent.insertAdjacentHTML("beforeend",s),this.addListeners(t,e)}}class u{constructor(t){this.parent=t}getHTML(t){return`
                <div class="card mb-3" style="width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${t.src}" class="img-fluid" alt="картинка">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${t.title}</h5>
                                <p class="card-text">${t.text}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `}render(t){const e=this.getHTML(t);this.parent.insertAdjacentHTML("beforeend",e)}}class h{constructor(t){this.parent=t}addListeners(t){document.getElementById("back-button").addEventListener("click",t)}getHTML(){return`
                <button id="back-button" class="btn btn-primary" type="button">Назад</button>
            `}render(t){const e=this.getHTML();this.parent.insertAdjacentHTML("beforeend",e),this.addListeners(t)}}class g{get(t,e){const s=new XMLHttpRequest;s.open("GET",t),s.send(),s.onreadystatechange=()=>{s.readyState===4&&this._handleResponse(s,e)}}post(t,e,s){const r=new XMLHttpRequest;r.open("POST",t),r.setRequestHeader("Content-Type","application/json"),r.send(JSON.stringify(e)),r.onreadystatechange=()=>{r.readyState===4&&this._handleResponse(r,s)}}patch(t,e,s){const r=new XMLHttpRequest;r.open("PATCH",t),r.setRequestHeader("Content-Type","application/json"),r.send(JSON.stringify(e)),r.onreadystatechange=()=>{r.readyState===4&&this._handleResponse(r,s)}}delete(t,e){const s=new XMLHttpRequest;s.open("DELETE",t),s.send(),s.onreadystatechange=()=>{s.readyState===4&&this._handleResponse(s,e)}}_handleResponse(t,e){try{const s=t.responseText?JSON.parse(t.responseText):null;e(s,t.status)}catch(s){console.error("Ошибка парсинга JSON:",s),e(null,t.status)}}}const i=new g;class m{constructor(){this.baseUrl=""}getStocks(){return`${this.baseUrl}/stocks`}getStockById(t){return`${this.baseUrl}/stocks/${t}`}createStock(){return`${this.baseUrl}/stocks`}removeStockById(t){return`${this.baseUrl}/stocks/${t}`}updateStockById(t){return`${this.baseUrl}/stocks/${t}`}}const d=new m;class f{constructor(t,e){this.parent=t,this.id=e}get pageRoot(){return document.getElementById("product-page")}getHTML(){return`
            <div id="product-page">
                <h2>Детали карточки</h2>
                <div id="product-content"></div>
            </div>
        `}getData(){i.get(d.getStockById(this.id),(t,e)=>{console.log("Product data:",t,"Status:",e),t&&e===200?this.renderData(t):this.renderError()})}renderData(t){new u(this.pageRoot).render(t)}renderError(){this.pageRoot.innerHTML+="<p>Ошибка загрузки данных</p>"}clickBack(){new l(this.parent).render()}render(){this.parent.innerHTML="";const t=this.getHTML();this.parent.insertAdjacentHTML("beforeend",t),new h(this.pageRoot).render(this.clickBack.bind(this)),this.getData()}}class l{constructor(t){this.parent=t}get pageRoot(){return document.getElementById("main-page")}getHTML(){return`
            <div id="main-page" class="d-flex flex-wrap"></div>
        `}getData(){i.get(d.getStocks(),t=>{this.renderData(t)})}renderData(t){t.forEach(e=>{new p(this.pageRoot).render(e,this.clickCard.bind(this))})}clickCard(t){console.log("Card clicked!",t.target.dataset.id);const e=t.target.dataset.id;e&&new f(this.parent,e).render()}render(){this.parent.innerHTML="";const t=this.getHTML();this.parent.insertAdjacentHTML("beforeend",t),this.getData()}}const a=document.getElementById("root");a?(console.log("Root element found, creating MainPage..."),new l(a).render()):console.error("Root element not found!");
