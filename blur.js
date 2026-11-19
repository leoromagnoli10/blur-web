
(function(){
function preload(){
document.querySelectorAll('img.product-item-image-secondary').forEach(function(img){
if(img.dataset.srcset && !img.getAttribute('srcset')){ img.setAttribute('srcset', img.dataset.srcset); }
if(img.dataset.src && !img.getAttribute('src')){ img.setAttribute('src', img.dataset.src); }
if(img.dataset.sizes === 'auto'){ var card = img.closest('.product-item'); var cw = card ? Math.round(card.getBoundingClientRect().width) : 400; img.setAttribute('sizes', Math.max(cw, 300) + 'px'); }
img.classList.remove('lazyload'); img.classList.add('lazyloaded');
});
}
if(document.readyState === 'loading'){ document.addEventListener('DOMContentLoaded', preload); } else { preload(); }
window.addEventListener('load', preload);
var tmr; new MutationObserver(function(){ clearTimeout(tmr); tmr = setTimeout(preload, 250); }).observe(document.documentElement, {childList:true, subtree:true});
})();

;

(function(){
function num(s){ s=(s||'').replace(/[^0-9,]/g,'').replace(',','.'); return parseFloat(s)||0; }
function fmt(n){ return '$'+Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g,'.'); }
function init(){
var form=document.querySelector('#product_form'); if(!form) return;
var price=document.querySelector('#price_display');
var buy=form.querySelector('.buy-button-container input, .buy-button-container .btn, input.cart');
if(!price||!buy) return;
function ahorro(){
var box=document.querySelector('.product-payment-discount-price');
var d=box&&box.querySelector('.payment-discount-price-product'); if(!d) return;
var p=num(price.textContent), t=num(d.textContent); if(!p||!t||t>=p) return;
var txt='Ahorrás '+fmt(p-t)+' · '+Math.round((1-t/p)*100)+'% off';
var el=box.querySelector('.blur-ahorro');
if(!el){ el=document.createElement('span'); el.className='blur-ahorro'; box.appendChild(el); }
if(el.textContent!==txt) el.textContent=txt;
}
var bar=document.querySelector('.blur-sticky');
if(!bar){
bar=document.createElement('div'); bar.className='blur-sticky';
var og=document.querySelector('meta[property="og:image"]');
var h=document.querySelector('.product-name');
var img=document.createElement('img'); if(og) img.src=og.content; img.alt='';
var tx=document.createElement('div'); tx.className='blur-sticky__txt';
var n=document.createElement('div'); n.className='blur-sticky__name'; n.textContent=h?h.textContent.trim():'';
var pr=document.createElement('div'); pr.className='blur-sticky__price';
tx.appendChild(n); tx.appendChild(pr);
var b=document.createElement('button'); b.type='button'; b.className='blur-sticky__btn'; b.textContent='Agregar';
b.addEventListener('click',function(){ var r=form.querySelector('.buy-button-container input, .buy-button-container .btn, input.cart'); if(r&&!r.disabled){ r.click(); } else { form.scrollIntoView({behavior:'smooth',block:'center'}); } });
if(og) bar.appendChild(img); bar.appendChild(tx); bar.appendChild(b);
document.body.appendChild(bar);
if('IntersectionObserver' in window){
new IntersectionObserver(function(es){ var on=!es[0].isIntersecting && es[0].boundingClientRect.top<0; bar.classList.toggle('is-on',on); document.body.classList.toggle('blur-sticky-on',on); }).observe(buy.closest('.product-actions')||buy);
}
}
function sync(){
ahorro();
var pr=bar.querySelector('.blur-sticky__price'), b=bar.querySelector('.blur-sticky__btn');
var t=price.textContent.trim(); if(pr.textContent!==t) pr.textContent=t;
var r=form.querySelector('.buy-button-container input, .buy-button-container .btn, input.cart');
var off=!r||r.disabled||/nostock/.test(r.className);
if(b.disabled!==off) b.disabled=off;
var lbl=off?'Sin stock':'Agregar'; if(b.textContent!==lbl) b.textContent=lbl;
}
sync();
var tm; new MutationObserver(function(){ clearTimeout(tm); tm=setTimeout(sync,200); }).observe(document.querySelector('.product-content')||form,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['class','disabled','value']});
}
if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded',init); } else { init(); }
})();

;

(function(){
function cleanOne(c){
if(!c||c.dataset.blurClean==='1') return;
var ps=Array.prototype.slice.call(c.querySelectorAll('p'));
if(!ps.length) return;
var sec='';
ps.forEach(function(p){
var txt=p.textContent.replace(/\u00a0/g,' ').trim();
var up=txt.toUpperCase();
if(p.querySelector('strong')&&up.length>3){
if(up.indexOf('DETALLE')>-1){sec='det';}
else if(up.indexOf('TALLE')>-1){sec='guia';p.remove();return;}
else if(up.indexOf('CUIDADO')>-1){sec='cuid';p.remove();return;}
else{sec='otro';}
}
if(sec==='cuid'){p.remove();return;}
if(sec==='guia'&&!/mide|usa talle/i.test(txt)){p.remove();return;}
if(!txt){p.remove();return;}
var st=p.querySelectorAll('[style]');for(var i=0;i<st.length;i++){st[i].removeAttribute('style');}
p.removeAttribute('style');
});
c.dataset.blurClean='1';
}
function clean(){var ls=document.querySelectorAll('.product-description-content');for(var i=0;i<ls.length;i++){cleanOne(ls[i]);}}
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',clean);}else{clean();}
var tm;new MutationObserver(function(){clearTimeout(tm);tm=setTimeout(clean,300);}).observe(document.documentElement,{childList:true,subtree:true});
})();

;

(function(){
function build(){
var list=document.querySelector(".navigation-bar-list"); if(!list) return;
var g=list.querySelector(".navigation-bar-group"); if(!g) return;
var txt=[];
var bl=g.querySelectorAll(".navigation-bar-item");
for(var i=0;i<bl.length;i++){var s=bl[i].textContent.replace(/\s+/g," ").trim(); if(s) txt.push(s);}
if(!txt.length) return;
var line=txt.join("  //  ")+"  //  ";
var old=list.querySelector(".blur-adbar");
if(old && old.dataset.line===line) return;
if(old) old.remove();
var wrap=document.createElement("div"); wrap.className="blur-adbar"; wrap.dataset.line=line;
var track=document.createElement("div"); track.className="blur-adbar__track";
for(var k=0;k<10;k++){var sp=document.createElement("span"); sp.textContent=line; track.appendChild(sp);}
wrap.appendChild(track); list.appendChild(wrap);
}
function dots(){
var sl=document.querySelector(".js-product-slider"); if(!sl||!sl.swiper) return;
var sw=sl.swiper, n=sw.slides.length; if(n<2) return;
var box=sl.parentElement.querySelector(".blur-dots");
if(!box){
box=document.createElement("div"); box.className="blur-dots";
for(var i=0;i<n;i++){box.appendChild(document.createElement("i"));}
sl.parentElement.insertBefore(box, sl.nextSibling);
sw.on("slideChange", mark); sw.on("slideChangeTransitionEnd", mark);
} else if(box.children.length!==n){
box.innerHTML=""; for(var j=0;j<n;j++){box.appendChild(document.createElement("i"));}
}
mark();
function mark(){
var a=(sl.swiper&&sl.swiper.realIndex!=null)?sl.swiper.realIndex:0;
for(var x=0;x<box.children.length;x++){box.children[x].className=(x===a)?"on":"";}
}
}
function run(){ build(); dots(); }
if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",run);}else{run();}
window.addEventListener("load",run);
var tm; new MutationObserver(function(){clearTimeout(tm);tm=setTimeout(run,250);}).observe(document.documentElement,{childList:true,subtree:true});
})();

;

(function(){
function num(s){s=(s||"").replace(/[^0-9,]/g,"");return parseFloat(s.replace(",","."))||0;}
function money(n){return "$"+Math.round(n).toLocaleString("es-AR");}
function build(){
var content=document.querySelector(".product-content"); if(!content) return;
var price=document.querySelector("#price_display"); if(!price) return;
var pv=num(price.textContent); if(!pv) return;
var rows=[];
var dEl=document.querySelector(".payment-discount-price-product");
var dName=document.querySelector(".js-payment-discount-name-product");
if(dEl){var dv=num(dEl.textContent); if(dv&&dv<pv){rows.push({l:(dName?dName.textContent:"TRANSFERENCIA").replace(/\s+/g," ").trim(),s:"Ahorrás "+money(pv-dv)+" · "+Math.round((1-dv/pv)*100)+"% off",hi:true,a:money(dv)});}}
var inst=document.querySelector(".product-installment");
if(inst){var m=inst.textContent.replace(/\s+/g," ").match(/(\d+)\s*cuotas\s*sin inter[eé]s\s*de\s*(\$[\d.,]+)/i); if(m){rows.push({l:m[1]+" CUOTAS SIN INTERÉS",s:"Con tarjeta de crédito",a:money(num(m[2])),suf:"/cuota"});}}
if(!rows.length) return;
var sig=money(pv)+"|"+rows.map(function(r){return r.l+r.s+r.a}).join("|");
var box=content.querySelector(".blur-pb");
if(box&&box.dataset.sig===sig) return;
if(!box){box=document.createElement("div");box.className="blur-pb";
var anchor=document.querySelector(".product-price");
if(anchor&&anchor.parentNode){anchor.parentNode.insertBefore(box,anchor.nextSibling);}else{content.appendChild(box);}}
box.dataset.sig=sig; box.innerHTML="";
rows.forEach(function(r){
var row=document.createElement("div"); row.className="blur-pb__row";
var left=document.createElement("div");
var l=document.createElement("b"); l.textContent=r.l; left.appendChild(l);
var s=document.createElement("span"); s.className=r.hi?"hi":""; s.textContent=r.s; left.appendChild(s);
var right=document.createElement("div"); right.className="blur-pb__amt"; right.textContent=r.a;
if(r.suf){var i=document.createElement("i"); i.textContent=" "+r.suf; right.appendChild(i);}
row.appendChild(left); row.appendChild(right); box.appendChild(row);
});
var clean=money(pv);
if(price.textContent.trim()!==clean) price.textContent=clean;
}
if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",build);}else{build();}
window.addEventListener("load",build);
var tm; new MutationObserver(function(){clearTimeout(tm);tm=setTimeout(build,200);}).observe(document.documentElement,{childList:true,subtree:true,characterData:true});
})();

;

(function(){
function run(){
var col=document.querySelector(".footer-contact-info-container"); if(!col) return;
if(col.querySelector(".blur-news")) return;
var form=document.querySelector(".section-newsletter .newsletter-form");
if(!form){
form=document.createElement("form"); form.className="newsletter-form"; form.setAttribute("action","/winnie-pooh"); form.setAttribute("method","post");
form.innerHTML='<div class="newsletter-form-wrapper input-append"><input type="email" name="email" class="newsletter-form-input form-control" placeholder="Tu email" required><div class="winnie-pooh"><label>No completar este campo</label><input type="text" name="winnie-pooh"></div><input type="hidden" name="name" value="Sin nombre"><input type="hidden" name="message" value="Pedido de inscripcion a newsletter"><input type="hidden" name="type" value="newsletter"><button type="submit" class="js-newsletter-form-submit newsletter-form-button btn btn-inline btn-outline"><span class="js-newsletter-form-submit-label">Enviar</span></button></div>';
}
var box=document.createElement("div"); box.className="blur-news";
var h=document.createElement("div"); h.className="blur-news__t";
h.textContent="PONÉ TU MAIL ACÁ PARA ENTERARTE ANTES QUE NADIE DE NUESTROS LANZAMIENTOS";
box.appendChild(h); box.appendChild(form);
var social=col.querySelector(".footer-social-container");
if(social){col.insertBefore(box,social);}else{col.appendChild(box);}
var sec=document.querySelector(".section-newsletter"); if(sec) sec.style.display="none";
}
if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",run);}else{run();}
window.addEventListener("load",run);
var tm; new MutationObserver(function(){clearTimeout(tm);tm=setTimeout(run,250);}).observe(document.documentElement,{childList:true,subtree:true});
})();

;

(function(){
function run(){
var fm=document.querySelector(".footer-main-info"); if(!fm) return;
if(fm.querySelector(".blur-contact")) return;
var box=document.createElement("div"); box.className="blur-contact";
var h=document.createElement("div"); h.className="footer-menu-title"; h.textContent="CONTACTÁNOS";
var ul=document.createElement("ul"); ul.className="list list-unstyled footer-menu-list";
var items=[["11 2398 8874","https://wa.me/5491123988874"],["blurstudiosar@gmail.com","mailto:blurstudiosar@gmail.com"]];
items.forEach(function(it){var li=document.createElement("li");var a=document.createElement("a");a.href=it[1];a.textContent=it[0];if(it[1].indexOf("http")===0){a.target="_blank";a.rel="noopener";}li.appendChild(a);ul.appendChild(li);});
box.appendChild(h); box.appendChild(ul); fm.appendChild(box);
}
if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",run);}else{run();}
window.addEventListener("load",run);
var tm; new MutationObserver(function(){clearTimeout(tm);tm=setTimeout(run,250);}).observe(document.documentElement,{childList:true,subtree:true});
})();

;

(function(){
var saved=null;
function apply(){
var sec=document.querySelector(".section-slideshow"); if(!sec) return;
var cont=sec.querySelector(".swiper-container"); var sw=cont&&cont.swiper; if(!sw) return;
var reals=cont.querySelectorAll(".swiper-slide:not(.swiper-slide-duplicate)");
var desktop=window.innerWidth>=768;
if(desktop&&reals.length>1){
saved=reals[1].outerHTML;
try{sw.removeSlide([1]);}catch(e){}
} else if(!desktop&&reals.length===1&&saved){
try{sw.appendSlide(saved);}catch(e){}
}
}
if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",apply);}else{apply();}
window.addEventListener("load",apply);
var rt; window.addEventListener("resize",function(){clearTimeout(rt);rt=setTimeout(apply,350);});
var tm; new MutationObserver(function(){clearTimeout(tm);tm=setTimeout(apply,300);}).observe(document.documentElement,{childList:true,subtree:true});
})();

;

(function(){
function build(){
if(!document.body.classList.contains("template-category")) return;
var grid=document.querySelector(".grid.grid-md-auto-4"); if(!grid) return;
var cont=grid.parentElement; if(!cont) return;
if(cont.querySelector(".blur-filters")) return;
var side=grid.querySelector(".filters-controls-content"); if(!side) return;
var cats=side.querySelectorAll(".category-item a");
var sizeBox=side.querySelector(".js-filter-container");
if(!cats.length&&!sizeBox) return;
var wrap=document.createElement("div"); wrap.className="blur-filters";
if(cats.length){
var row=document.createElement("div"); row.className="blur-pills";
var all=document.createElement("a"); all.className="blur-pill"; all.href="/productos/"; all.textContent="TODOS";
if(location.pathname.indexOf("/productos")===0) all.classList.add("on");
row.appendChild(all);
Array.prototype.forEach.call(cats,function(a){
var p=document.createElement("a"); p.className="blur-pill"; p.href=a.getAttribute("href"); p.textContent=a.textContent.replace(/\s+/g," ").trim();
try{ if(new URL(p.href,location.href).pathname===location.pathname) p.classList.add("on"); }catch(e){}
row.appendChild(p);
});
wrap.appendChild(row);
}
if(sizeBox){
var labels=sizeBox.querySelectorAll(".js-filter-checkbox");
if(labels.length){
var row2=document.createElement("div"); row2.className="blur-pills blur-pills-size";
var tag=document.createElement("span"); tag.className="blur-pills__label"; tag.textContent="TALLE"; row2.appendChild(tag);
Array.prototype.forEach.call(labels,function(lb){
var txt=lb.querySelector(".checkbox-text"); if(!txt) return;
var name=txt.textContent.replace(/\(.*\)/,"").trim().toUpperCase();
var inp=lb.querySelector("input");
var b=document.createElement("button"); b.type="button"; b.className="blur-pill blur-pill-size"; b.textContent=name;
if(inp&&inp.checked) b.classList.add("on");
b.addEventListener("click",function(){ lb.click(); });
row2.appendChild(b);
});
wrap.appendChild(row2);
}
}
cont.insertBefore(wrap,grid);
}
if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",build);}else{build();}
window.addEventListener("load",build);
var tm; new MutationObserver(function(){clearTimeout(tm);tm=setTimeout(build,300);}).observe(document.documentElement,{childList:true,subtree:true});
})();

;

(function(){
function mk(title){
var box=document.createElement("div"); box.className="blur-acc";
var h=document.createElement("button"); h.type="button"; h.className="blur-acc__h"; h.textContent=title;
var b=document.createElement("div"); b.className="blur-acc__b";
h.addEventListener("click",function(){ box.classList.toggle("open"); });
box.appendChild(h); box.appendChild(b);
return {el:box,body:b};
}
function build(){
var content=document.querySelector(".product-content"); if(!content) return;
if(content.querySelector(".blur-accs")) return;
var ship=content.querySelector(".product-shipping-wrapper"); if(!ship) return;
var wrap=document.createElement("div"); wrap.className="blur-accs";
ship.parentNode.insertBefore(wrap,ship);
var a1=mk("Medios de envío");
a1.body.appendChild(ship);
wrap.appendChild(a1.el);
var pay=document.querySelector(".footer-payments-shipping-container .footer-payment-group");
if(pay){
var a2=mk("Medios de pago");
var inst=document.querySelector(".product-installment");
if(inst){ var p=document.createElement("div"); p.className="blur-acc__note"; p.textContent=inst.textContent.replace(/\s+/g," ").trim(); a2.body.appendChild(p); }
a2.body.appendChild(pay.cloneNode(true));
wrap.appendChild(a2.el);
}
}
if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",build);}else{build();}
window.addEventListener("load",build);
var tm; new MutationObserver(function(){clearTimeout(tm);tm=setTimeout(build,300);}).observe(document.documentElement,{childList:true,subtree:true});
})();

;

(function(){
var T={
regular:{n:"Regular fit",s:["S","M","L","XL"],c:["Largo","Ancho","Manga"],m:[[67,56,38],[69,58,40],[71,60,42],[74,62,44]],b:"top"},
boxy:{n:"Boxy fit",s:["S","M","L","XL"],c:["Largo","Ancho","Manga"],m:[[65,65,50],[68,68,51],[71,70,52],[74,72,53]],b:"top",w:0.6,o:-0.3},
waffle:{n:"Manga larga raglan",s:["S","M","L","XL"],c:["Largo","Ancho","Manga"],m:[[66,60,79],[68,62,81],[70,64,83],[72,66,85]],b:"top"},
hoodie:{n:"Corte regular",s:["S","M","L","XL"],c:["Largo","Ancho","Mangas"],m:[[64,58,64],[66,61,66],[68,64,68],[70,66,70]],b:"top"},
zipg:{n:"Zip hoodie regular",s:["S","M","L","XL"],c:["Largo","Ancho"],m:[[60,57],[63,58],[66,59],[69,60]],b:"top"},
zipb:{n:"Campera frisa",s:["S","M","L","XL"],c:["Largo","Ancho"],m:[[64,62],[66,64],[68,66],[70,68]],b:"top"},
jogging:{n:"Jogging",s:["S","M","L","XL"],c:["Cintura","Largo","Rodilla"],m:[[34,100,33],[36,102,34],[38,104,35],[40,106,36]],b:"pant"},
shorts:{n:"Corte baggy",s:["S","M","L","XL"],c:["Largo","Cintura"],m:[[53,"36-42"],[54,"38-44"],[55,"40-46"],[56,"42-48"]],b:"short"},
polomc:{n:"Polo manga corta",s:["1","2","3"],c:["Largo","Ancho","Manga"],m:[[66,60,47],[70,64,48],[74,68,49]],b:"three",w:0.7},
poloml:{n:"Polo manga larga",s:["1","2","3"],c:["Largo","Ancho"],m:[[63,52],[66,54],[70,56]],b:"three",w:0.7},
shirt:{n:"Fit intermedio",s:["1","2","3"],c:["Largo","Ancho"],m:[[60,58],[62,60],[64,62]],b:"three",w:0.7}
};
var MAP=[["paisley-monogram-tee","regular"],["lettering-tee","regular"],["icon-tee","regular"],["do-your-thing-tee","regular"],["tartan-monogram-tee","regular"],["more-life-tee","boxy"],["birds-tee","boxy"],["blue-camo-waffle-tee","waffle"],["stitches-hoodie","hoodie"],["gothic-purple-zip","zipg"],["zip-hoodie-btw","zipb"],["stitches-pants","jogging"],["jogging-btw","jogging"],["baggy-shorts","shorts"],["emblem-white-polo","polomc"],["emblem-black-polo","polomc"],["everyday-heat","poloml"],["signature-zip-shirt","shirt"]];
function tableFor(){var p=decodeURIComponent(location.pathname);for(var i=0;i<MAP.length;i++){if(p.indexOf(MAP[i][0])>-1)return T[MAP[i][1]];}return null;}
function bands(b){
if(b==="pant")return [[0,169,0.2],[170,174,0.7],[175,179,1.2],[180,184,2.2],[185,250,3]];
if(b==="short")return [[0,169,0.4],[170,174,0.9],[175,179,1.3],[180,184,1.9],[185,250,2.5]];
if(b==="three")return [[0,169,0.2],[170,174,0.5],[175,179,1],[180,184,1.5],[185,250,2]];
return [[0,169,0.2],[170,174,0.8],[175,179,1.6],[180,184,2.3],[185,250,3]];
}
function score(tb,h,w,fit){
var bs=bands(tb.b),base=0;
for(var i=0;i<bs.length;i++){if(h>=bs[i][0]&&h<=bs[i][1]){base=bs[i][2];break;}}
var bmi=w/Math.pow(h/100,2),adj=0;
if(bmi<18.5)adj=-0.9;else if(bmi<20.5)adj=-0.5;else if(bmi<22.5)adj=-0.25;else if(bmi<26)adj=0;else if(bmi<28.5)adj=0.5;else if(bmi<31)adj=1;else if(bmi<34)adj=1.5;else adj=1.9;
base=base+adj*(tb.w===undefined?1:tb.w)+(tb.o||0)+(fit==="aj"?-0.6:(fit==="ho"?0.6:0));
var max=tb.s.length-1;
if(base<0)base=0; if(base>max)base=max;
return base;
}
function heightRange(tb,i){
var bs=bands(tb.b),lo=null,hi=null;
for(var h=150;h<=200;h++){var sc=score(tb,h,Math.round(22*Math.pow(h/100,2)),"no");if(Math.round(sc)===i){if(lo===null)lo=h;hi=h;}}
if(lo===null)return "-";
if(lo<=150)return "hasta "+hi; if(hi>=200)return lo+" o mas"; return lo+" - "+hi;
}
var st={h:175,w:72,fit:"no"};
try{var sv=JSON.parse(localStorage.getItem("blurFit")||"null");if(sv&&sv.h)st=sv;}catch(e){}
function build(){
var tb=tableFor(); if(!tb) return;
var labs=document.querySelectorAll(".product-detail-variants .form-label"),lab=null;
for(var q=0;q<labs.length;q++){ if(labs[q].getBoundingClientRect().width>0){ lab=labs[q]; break; } }
if(!lab) return;
if(document.querySelector(".blur-sizebtn")) return;
var b=document.createElement("button"); b.type="button"; b.className="blur-sizebtn"; b.textContent="¿Cuál es mi talle?";
lab.parentNode.insertBefore(b,lab.nextSibling);
lab.parentNode.style.display="flex"; lab.parentNode.style.alignItems="center"; lab.parentNode.style.gap="12px";
b.addEventListener("click",function(){ open(tb); });
}
function open(tb){
var old=document.querySelector(".blur-fit"); if(old) old.remove();
var nameEl=document.querySelector(".product-name");
var og=document.querySelector('meta[property="og:image"]');
var w=document.createElement("div"); w.className="blur-fit on";
var img=og?('<img src="'+og.content+'" alt="">'):"";
w.innerHTML='<div class="blur-fit__bg"></div><div class="blur-fit__panel">'+
'<div class="blur-fit__top"><span class="blur-fit__kicker">Probador</span><button class="blur-fit__x" type="button">&times;</button></div>'+
'<div class="blur-fit__prod">'+img+'<div><div class="blur-fit__pname"></div><div class="blur-fit__pfit">'+tb.n+'</div></div></div>'+
'<div class="blur-fit__body"></div></div>';
document.body.appendChild(w);
w.querySelector(".blur-fit__pname").textContent=nameEl?nameEl.textContent.trim():"";
w.querySelector(".blur-fit__x").addEventListener("click",function(){w.remove();});
w.querySelector(".blur-fit__bg").addEventListener("click",function(){w.remove();});
step1(w,tb);
}
function step1(w,tb){
var body=w.querySelector(".blur-fit__body");
body.innerHTML='<div class="blur-fit__step">Paso 1 de 2</div><div class="blur-fit__h">Encontremos tu talle</div><div class="blur-fit__p">Con tu altura y tu peso alcanza. Movelos y mirá cómo cambia.</div>'+
row("altura","ALTURA","cm",150,205,st.h)+row("peso","PESO","kg",40,130,st.w)+
'<div class="blur-fit__row"><div class="blur-fit__lab"><span>¿Cómo te gusta que te quede?</span></div><div class="blur-fit__fits"><button type="button" data-f="aj">Ajustado</button><button type="button" data-f="no">Fit recomendado</button><button type="button" data-f="ho">Holgado</button></div></div>'+
'<div class="blur-fit__res"><div class="blur-fit__msg"></div><div class="blur-fit__big"></div></div>'+
'<button class="blur-fit__cta" type="button">Ver mi talle</button>';
function refresh(){
var sc=score(tb,st.h,st.w,st.fit),i=Math.round(sc),frac=Math.abs(sc-i);
w.querySelector(".blur-fit__big").textContent=tb.s[i];
w.querySelector(".blur-fit__msg").textContent=frac>0.32?"Estás entre dos talles. Te sugerimos este, que es como cae mejor esta prenda.":"Tu talle en esta prenda.";
w.querySelectorAll(".blur-fit__fits button").forEach(function(x){x.classList.toggle("on",x.getAttribute("data-f")===st.fit);});
return i;
}
bind(w,"altura",function(v){st.h=v;refresh();});
bind(w,"peso",function(v){st.w=v;refresh();});
w.querySelectorAll(".blur-fit__fits button").forEach(function(x){x.addEventListener("click",function(){st.fit=x.getAttribute("data-f");refresh();});});
w.querySelector(".blur-fit__cta").addEventListener("click",function(){ try{localStorage.setItem("blurFit",JSON.stringify(st));}catch(e){} step2(w,tb,refresh()); });
refresh();
}
function row(id,label,unit,min,max,val){
return '<div class="blur-fit__row" data-row="'+id+'"><div class="blur-fit__lab"><span>'+label+'</span><span class="blur-fit__val"><b>'+val+'</b><small>'+unit+'</small></span></div>'+
'<div class="blur-fit__slider"><button class="blur-fit__pm" type="button" data-d="-1">&minus;</button><input type="range" min="'+min+'" max="'+max+'" value="'+val+'"><button class="blur-fit__pm" type="button" data-d="1">+</button></div></div>';
}
function bind(w,id,cb){
var row=w.querySelector('[data-row="'+id+'"]'); if(!row) return;
var inp=row.querySelector("input"),out=row.querySelector("b");
function upd(){ out.textContent=inp.value; cb(parseInt(inp.value,10)); }
inp.addEventListener("input",upd);
row.querySelectorAll(".blur-fit__pm").forEach(function(btn){btn.addEventListener("click",function(){inp.value=parseInt(inp.value,10)+parseInt(btn.getAttribute("data-d"),10);upd();});});
}
function step2(w,tb,i){
var body=w.querySelector(".blur-fit__body");
var rows="";
for(var k=0;k<tb.s.length;k++){
rows+='<tr class="'+(k===i?"on":"")+'"><td>'+tb.s[k]+'</td>';
for(var c=0;c<tb.c.length;c++){rows+="<td>"+tb.m[k][c]+"</td>";}
rows+="<td>"+heightRange(tb,k)+"</td></tr>";
}
var head="<th>Talle</th>";
for(var c2=0;c2<tb.c.length;c2++){head+="<th>"+tb.c[c2]+"</th>";}
head+="<th>Altura</th>";
body.innerHTML='<div class="blur-fit__step">Paso 2 de 2</div><div class="blur-fit__big" style="font-size:52px;line-height:1">'+tb.s[i]+'</div><div class="blur-fit__p">Tu talle en esta prenda.</div>'+
'<table class="blur-fit__table"><thead><tr>'+head+'</tr></thead><tbody>'+rows+'</tbody></table>'+
'<div class="blur-fit__note">Medidas de la prenda en cm, tomadas sobre la prenda apoyada. La columna Altura es orientativa.</div>'+
'<button class="blur-fit__cta" type="button">Usar talle '+tb.s[i]+'</button>'+
'<button class="blur-fit__cta" type="button" style="background:#fff;color:#111;border:1px solid #DCDCDC;margin-top:10px" data-back="1">Volver</button>';
body.querySelector("[data-back]").addEventListener("click",function(){step1(w,tb);});
body.querySelector(".blur-fit__cta").addEventListener("click",function(){
var btns=document.querySelectorAll(".product-detail-variants .btn-variant");
for(var x=0;x<btns.length;x++){ if(btns[x].textContent.replace(/\s+/g,"").toUpperCase()===tb.s[i].toUpperCase()){ btns[x].click(); break; } }
w.remove();
});
}
if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",build);}else{build();}
window.addEventListener("load",build);
var tm; new MutationObserver(function(){clearTimeout(tm);tm=setTimeout(build,300);}).observe(document.documentElement,{childList:true,subtree:true});
})();

;
(function(){function S(s){return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'')}function D(k,p){var x=document.createElement(k);if(p)x.className=p;return x}function B(){var c=document.querySelector('.page-content.user-content');if(!c||c.dataset.bf)return;var K=[].slice.call(c.children);if(K.length<6)return;var L=[],u=null,I=[],st=0;K.forEach(function(e){var t=(e.textContent||'').trim().replace(/\s+/g,' ');if(e.tagName=='H1')return;var q=t.indexOf('¿')==0&&/\?$/.test(t)&&t.length<170;var h=!q&&((!!e.querySelector('strong')&&/:$/.test(t)&&t.length<70)||(/^H[2-4]$/.test(e.tagName)&&!!t));if(h){u={t:t.replace(/:$/,''),q:[],f:[]};L.push(u);st=1;return}if(!st){if(t)I.push(e);return}if(q){u.q.push({t:t,a:[]});return}if(!t&&!e.querySelector('img'))return;if(u.q.length)u.q[u.q.length-1].a.push(e);else u.f.push(e)});if(L.length<2)return;var w=D('div','blur-faq');if(I.length){var ip=D('div','blur-faq__i');I.forEach(function(e){ip.appendChild(e)});w.appendChild(ip)}var nv=D('div','blur-faq__n');w.appendChild(nv);L.forEach(function(s){var id='faq-'+S(s.t);var a=D('a');a.href='#'+id;a.textContent=s.t.charAt(0)+s.t.slice(1).toLowerCase();nv.appendChild(a);var sc=D('section','blur-faq__s');sc.id=id;var h2=D('h2');h2.textContent=s.t;sc.appendChild(h2);if(s.f.length){var fd=D('div','blur-faq__f');s.f.forEach(function(e){fd.appendChild(e)});sc.appendChild(fd)}s.q.forEach(function(it){var d=D('div','blur-faq__q'),b=D('button'),an=D('div','blur-faq__a'),nn=D('div');b.type='button';b.textContent=it.t;it.a.forEach(function(e){nn.appendChild(e)});an.appendChild(nn);d.appendChild(b);d.appendChild(an);sc.appendChild(d);b.addEventListener('click',function(){var o=d.classList.contains('o');[].slice.call(w.querySelectorAll('.blur-faq__q.o')).forEach(function(z){z.classList.remove('o');z.querySelector('.blur-faq__a').style.maxHeight='0px'});if(!o){d.classList.add('o');an.style.maxHeight=an.scrollHeight+'px'}})});w.appendChild(sc)});[].slice.call(nv.children).forEach(function(a){a.addEventListener('click',function(ev){ev.preventDefault();var el=document.getElementById(a.getAttribute('href').slice(1));if(el)window.scrollTo({top:el.getBoundingClientRect().top+window.pageYOffset-110,behavior:'smooth'})})});window.addEventListener('resize',function(){var o=w.querySelector('.blur-faq__q.o');if(o){var an=o.querySelector('.blur-faq__a');an.style.maxHeight=an.scrollHeight+'px'}});c.dataset.bf=1;c.innerHTML='';c.appendChild(w)}function G(){if(/faqs/i.test(location.pathname)){document.body.classList.add('blur-faqpg');B()}}if(document.readyState=='loading')document.addEventListener('DOMContentLoaded',G);else G();setTimeout(G,600);setTimeout(G,1800)})();
