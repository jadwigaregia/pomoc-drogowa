# RODO, cookies i opinie – wdrożenie

## Do uzupełnienia PRZED publikacją
1. Ustal podmiot będący administratorem danych witryny. Nie zakładaj, że jest nim IVNE tylko dlatego, że IVNE występuje na stronie jako wykonawca/podwykonawca.
2. W pliku `polityka-prywatnosci.html` uzupełnij trzy pola w sekcji 1: pełną nazwę podmiotu, adres i adres e-mail do kontaktu w sprawach RODO.
3. Potwierdź przebieg obsługi zleceń (kto odbiera SMS/telefon i kto jest administratorem tych danych), okresy retencji danych oraz właściwy wykaz odbiorców.
4. Rozważ przeniesienie Google Fonts, Font Awesome i tła Unsplash do lokalnych zasobów albo uzupełnienie analizy podstaw prawnych dla zewnętrznych żądań.
5. Zweryfikuj daty i opisy, najlepiej skonsultuj dokumenty z osobą od RODO.

## Jak działa obecne rozwiązanie
- Pytanie o preferencje pojawia się w nowej sesji przeglądarki; wybór pozostaje podczas nawigowania po podstronach w tej samej sesji (sessionStorage).
- Przyciski odmowy i akceptacji są równie widoczne, ustawienia można zmienić w stopce.
- Mapa Google nie otrzymuje `src` przed zgodą; bez niej widoczny jest placeholder i link do Map Google.
- Nie dodano żadnych skryptów analitycznych ani reklamowych.

## Opinie
- Brak fikcyjnych ocen. Miejsce na przyszłe, zweryfikowane opinie jest w `index.html`, kontener `#opublikowane-opinie`.
- Formularz klienta otwiera aplikację SMS z przygotowaną wiadomością. SMS nie wysyła się automatycznie.
- Zgoda na publikację opinii jest domyślnie odznaczona.
- Weryfikuj prawdziwość opinii na podstawie zlecenia i informuj na stronie o rzeczywistej procedurze. Publikuj również uprawnione opinie negatywne; nie twórz sztucznego ratingu.
- Opinie dodawaj ręcznie w kodzie jako dostępne HTML, np.:
```html
<article class="review-card">
  <div class="stars" aria-label="Ocena 4 na 5">★★★★☆</div>
  <blockquote><p>[rzeczywista treść klienta po zgodzie]</p></blockquote>
  <p>– [pseudonim zaakceptowany przez autora]</p>
</article>
```
- Jeżeli opinia jest zweryfikowana, dopisz rzetelną informację o metodzie. Jeżeli jej nie zweryfikowano, nie nazywaj jej zweryfikowaną. Usuń tekst stanu pustego po publikacji pierwszej autentycznej opinii.
- Aby opinie spływały bez SMS albo trafiały automatycznie na stronę, będzie potrzebny zewnętrzny formularz/usługa i moderacja; GitHub Pages jest hostingiem statycznym.
