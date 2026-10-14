'use strict';
(() => {
 const api="https://opinie-pomoc-drogowa-poznan.young-mug-0243.chatgpt.site/api/reviews";
 const token=new URLSearchParams(location.hash.slice(1)).get('zaproszenie')||'';
 const form=document.getElementById('review-form');
 const info=document.getElementById('invite-status');
 const result=document.getElementById('review-result');
 const button=document.getElementById('submit-review');
 if(!/^[a-f0-9]{64}$/.test(token)){
  info.textContent='Dodanie opinii jest dostępne przez indywidualny link wysłany SMS-em po zakończonej usłudze. Otwórz link z otrzymanej wiadomości. Jeśli go nie masz, poproś obsługę o zaproszenie.';
  return;
 }
 info.textContent='Masz link z zaproszeniem. Jego ważność zostanie sprawdzona przy wysyłaniu opinii.';
 form.hidden=false;
 let pending=false;
 for(const id of ['nickname','comment']){
  document.getElementById(id).addEventListener('input',e=>e.target.setCustomValidity(''));
 }
 form.addEventListener('submit',async event=>{
  event.preventDefault();if(pending)return;
  for(const id of ['nickname','comment']){
   const field=document.getElementById(id);
   field.setCustomValidity(field.value.trim()?'':'Uzupełnij to pole.');
  }
  if(!form.reportValidity())return;
  pending=true;button.disabled=true;button.textContent='Publikowanie…';result.textContent='';
  const payload={token,email:document.getElementById('email').value.trim(),nickname:document.getElementById('nickname').value.trim(),comment:document.getElementById('comment').value.trim(),rating:Number(form.querySelector('input[name=rating]:checked').value),consent:document.getElementById('consent').checked};
  try{
   const response=await fetch(api,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),credentials:'omit',referrerPolicy:'no-referrer'});
   const data=await response.json();
   if(!response.ok)throw new Error(data.error||'Nie udało się zapisać opinii.');
   form.reset();form.hidden=true;info.hidden=true;
   result.textContent='Dziękujemy! Twoja opinia została opublikowana. Możesz zobaczyć ją w sekcji opinii klientów.';
   result.focus();
  }catch(error){result.textContent=error instanceof TypeError?'Nie udało się potwierdzić zapisu. Sprawdź połączenie i listę opinii, a następnie spróbuj ponownie.':error.message;result.focus();}
  finally{pending=false;button.disabled=false;button.textContent='Opublikuj opinię';}
 });
})();
