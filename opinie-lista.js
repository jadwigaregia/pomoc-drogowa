'use strict';
(()=>{
 const box=document.getElementById('opublikowane-opinie');
 const summary=document.getElementById('review-summary');
 const more=document.getElementById('reviews-more');
 if(!box)return;
 let offset=0,pending=false;
 function text(tag,value,className){const e=document.createElement(tag);e.textContent=value;if(className)e.className=className;return e;}
 async function load(){
  if(pending)return;pending=true;more.disabled=true;box.setAttribute('aria-busy','true');
  try{
   const response=await fetch("https://opinie-pomoc-drogowa-poznan.young-mug-0243.chatgpt.site/api/reviews?offset="+offset,{credentials:'omit',referrerPolicy:'no-referrer'});
   if(!response.ok)throw Error();
   const data=await response.json();
   if(!offset)box.replaceChildren();
   if(!data.count)box.append(text('p','Pierwsze opinie pojawią się tutaj po przesłaniu formularza przez zaproszonych klientów.','review-empty'));
   for(const review of data.reviews){
    const card=document.createElement('article');card.className='review-card';
    const stars=text('div','★'.repeat(review.rating)+'☆'.repeat(5-review.rating),'stars');stars.setAttribute('aria-label','Ocena '+review.rating+' na 5');card.append(stars);
    const quote=document.createElement('blockquote');const content=text('p',review.comment);content.style.whiteSpace='pre-wrap';content.style.overflowWrap='anywhere';quote.append(content);card.append(quote);
    const author=text('p',review.nickname);author.style.overflowWrap='anywhere';card.append(author);
    card.append(text('p',new Date(review.createdAt).toLocaleDateString('pl-PL',{timeZone:'Europe/Warsaw'})+' · Opinia z zaproszenia','review-small'));
    box.append(card);
   }
   offset+=data.reviews.length;
   summary.textContent=data.count?'Średnia ocen: '+Number(data.average).toFixed(1).replace('.',',')+'/5 · Liczba opinii: '+data.count:'';
   more.hidden=offset>=data.count;more.textContent='Pokaż kolejne opinie';
  }catch{
   if(!offset)box.replaceChildren(text('p','Nie udało się wczytać opinii. Spróbuj ponownie za chwilę.'));
   more.hidden=false;more.textContent='Spróbuj ponownie';
  }finally{pending=false;more.disabled=false;box.setAttribute('aria-busy','false');}
 }
 more.addEventListener('click',load);load();
})();
