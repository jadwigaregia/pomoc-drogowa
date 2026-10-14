'use strict';
(() => {
  const form = document.getElementById('review-form');
  const result = document.getElementById('result');
  const message = document.getElementById('message');
  const status = document.getElementById('copy-status');
  const code = document.getElementById('code');
  const inviteCode = new URLSearchParams(location.hash.slice(1)).get('kod');
  if (inviteCode && /^[A-Za-z0-9_-]{1,64}$/.test(inviteCode)) code.value = inviteCode;
  form.hidden = false;
  form.addEventListener('input', () => { result.hidden = true; });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const comment = document.getElementById('comment');
    const signature = document.getElementById('signature');
    for (const field of [comment, signature]) {
      field.setCustomValidity(field.value.trim() ? '' : 'Uzupełnij to pole.');
    }
    if (!form.reportValidity()) return;
    const rating = form.querySelector('input[name="rating"]:checked').value;
    const consent = document.getElementById('consent').checked;
    message.value = [
      'Opinia — Pomoc Drogowa 24/7 Poland',
      'Kod zaproszenia: ' + (code.value.trim() || 'nie podano — proszę o weryfikację zlecenia'),
      'Ocena: ' + rating + '/5',
      'Opinia: ' + comment.value.trim(),
      'Podpis: ' + signature.value.trim(),
      'Publikacja opinii, oceny i podpisu na stronie: ' + (consent ? 'ZGADZAM SIĘ' : 'NIE ZGADZAM SIĘ')
    ].join('\n');
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    document.getElementById('sms-link').href =
      'sms:+48508511133' + (ios ? '&' : '?') + 'body=' + encodeURIComponent(message.value);
    status.textContent = '';
    result.hidden = false;
    document.getElementById('result-title').focus();
    result.scrollIntoView({behavior: 'auto', block: 'start'});
  });
  for (const id of ['comment', 'signature']) {
    document.getElementById(id).addEventListener('input', event => event.target.setCustomValidity(''));
  }
  document.getElementById('copy').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(message.value);
      status.textContent = 'Skopiowano. Wklej treść do SMS-a na numer 508 511 133 i wyślij.';
    } catch {
      message.focus();
      message.select();
      status.textContent = 'Zaznaczono wiadomość. Skopiuj ją ręcznie i wklej do SMS-a na numer 508 511 133.';
    }
  });
})();
