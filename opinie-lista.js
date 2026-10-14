'use strict';
(()=>{
 const box=document.getElementById('opublikowane-opinie');
 const summary=document.getElementById('review-summary');
 const more=document.getElementById('reviews-more');
 if(!box||!summary||!more)return;
 let offset=0,pending=false,total=0,sum=0;
 const text=(tag,value,cls)=>{const e=document.createElement(tag);e.textContent=value;if(cls)e.className=cls;return e;};
 async function load(){
  if(pending)return;
  pending=true;more.disabled=true;box.setAttribute('aria-busy','true');
  try{
   const response=await fetch('https://opinie-pomoc-drogowa-api.jadwiga-regia.workers.dev/api/reviews?offset='+offset,{credentials:'omit',referrerPolicy:'no-referrer'});
   if(!response.ok)throw Error('HTTP '+response.status);
   const data=await response.json();
   if(!offset)box.replaceChildren();
   const reviews=Array.isArray(data.reviews)?data.reviews:[];
   total=Number(data.total)||0;
   if(!total)box.append(text('p','Nie ma jeszcze opinii. Możesz dodać pierwszą!','review-empty'));
   for(const review of reviews){
    const card=document.createElement('article');card.className='review-card';
    const rating=Math.max(1,Math.min(5,Number(review.rating)||1));
    const stars=text('div','★'.repeat(rating)+'☆'.repeat(5-rating),'stars');
    stars.setAttribute('aria-label','Ocena '+rating+' na 5');card.append(stars);
    const quote=document.createElement('blockquote');
    const content=text('p',String(review.comment||''));content.style.whiteSpace='pre-wrap';content.style.overflowWrap='anywhere';quote.append(content);card.append(quote);
    const author=text('p',String(review.nickname||'Klient'));author.style.overflowWrap='anywhere';card.append(author);
    const date=new Date(String(review.created_at||'').replace(' ','T')+'Z');
    card.append(text('p',(Number.isNaN(date.getTime())?'':date.toLocaleDateString('pl-PL',{timeZone:'Europe/Warsaw'})),'review-small'));
    box.append(card);sum+=rating;
   }
   offset+=reviews.length;
   summary.textContent=total?'Liczba opinii: '+total:'';
   more.hidden=offset>=total||!reviews.length;more.textContent='Pokaż kolejne opinie';
  }catch(e){
   if(!offset)box.replaceChildren(text('p','Nie udało się wczytać opinii. Spróbuj ponownie.'));
   more.hidden=false;more.textContent='Spróbuj ponownie';
  }finally{pending=false;more.disabled=false;box.setAttribute('aria-busy','false');}
 }
 more.addEventListener('click',load);load();
})();