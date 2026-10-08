# RODO, cookies i opinie – wdrożenie

## Ważne działania organizacyjne
1. **Administrator wskazany przez użytkownika: IVNE sp. z o.o.** Potwierdź dane adresowe/rejestrowe zgodne z informacjami zamieszczonymi na stronie.
2. **Na życzenie administratora nie podajemy na razie e-maila.** Kontakt w sprawach ochrony danych jest możliwy listownie na ul. Wierzbowa 155/B, 62-081 Wysogotowo, albo telefonicznie za pośrednictwem numeru strony 508 511 133. IVNE musi faktycznie obsługiwać otrzymane tymi kanałami żądania.
3. Uwaga prawna: art. 13 RODO nie wymaga wskazania konkretnego formatu kontaktu, ale art. 5 ust. 2 pkt 1 ustawy o świadczeniu usług drogą elektroniczną może wymagać udostępnienia adresu elektronicznego przez usługodawcę. Sprawdź zastosowanie do faktycznej działalności i w razie potrzeby uzupełnij kontakt elektroniczny.
4. Potwierdź przebieg obsługi zleceń (kto odbiera SMS/telefon i kto jest administratorem tych danych), okresy retencji danych oraz właściwy wykaz odbiorców.
5. Rozważ przeniesienie Google Fonts, Font Awesome i tła Unsplash do lokalnych zasobów albo uzupełnienie analizy podstaw prawnych dla zewnętrznych żądań.
6. Zweryfikuj daty i opisy, najlepiej skonsultuj dokumenty z osobą od RODO.

## Jak działa obecne rozwiązanie
- Pytanie o preferencje pojawia się w nowej sesji przeglądarki; wybór pozostaje podczas nawigowania po podstronach w tej samej sesji (sessionStorage).
- Przyciski odmowy i akceptacji są równie widoczne, ustawienia można zmienić w stopce.
- Mapa Google nie otrzymuje `src` przed zgodą; bez niej widoczny jest placeholder i link do Map Google.
- Nie dodano żadnych skryptów analitycznych ani reklamowych.

## Opinie wyłącznie po zrealizowanym zleceniu – darmowa obsługa przez jedną osobę

### Po wykonaniu usługi
1. Pracownik IVNE potwierdza, że zgłoszenie zostało wykonane i odnotowuje **numer zlecenia i numer kontaktowy klienta** w prywatnym rejestrze, niedostępnym publicznie.
2. Dla tego zlecenia przygotowuje **jeden indywidualny, trudny do odgadnięcia kod**, np. wygenerowany przez menedżera haseł (12 losowych znaków). Kod musi być unikalny; nie należy używać kolejnych numerów 000001, daty ani fragmentów numeru telefonu.
3. W prywatnym arkuszu, do którego dostęp ma tylko upoważniona osoba, zapisuje: numer zlecenia, numer telefonu klienta, kod, datę zaproszenia i status "zaproszony". Nie wolno umieszczać tych danych w publicznym repozytorium ani kodzie strony.
4. Wysyła SMS **tylko na numer z rzeczywiście wykonanego zlecenia** i nie warunkuje możliwości oceny jej treścią czy wysokością oceny.

### SMS wysyłany klientowi (wzór)
> IVNE – dziękujemy za skorzystanie z pomocy drogowej. Jeśli chcesz dobrowolnie ocenić zakończoną usługę, odpowiedz na tego SMS-a:
> Kod: [INDYWIDUALNY_KOD]
> Ocena: [1–5]
> Opinia: [Twój komentarz]
> Publikacja opinii i podpisu [pseudonim]: ZGADZAM SIĘ / NIE ZGADZAM SIĘ.
> Publikujemy wyłącznie po weryfikacji wykonania usługi i zgodzie autora – także oceny negatywne. Kontakt RODO: IVNE, ul. Wierzbowa 155/B, 62-081 Wysogotowo, tel. 508 511 133. Więcej: https://pomocdrogowapoznan24h.pl/polityka-prywatnosci.html

**Uwaga:** możesz skrócić wzór SMS-a; wówczas podaj odnośnik do polityki i poproś o jednoznaczne potwierdzenie publikacji w dalszej wymianie wiadomości. Klient może odpowiedzieć na SMS bez wchodzenia na stronę. Koszt wiadomości zależy od taryfy operatora.

### Przyjęcie i weryfikacja opinii
1. Operator porównuje otrzymany **kod** z prywatnym rejestrem zakończonych zleceń oraz numer nadawcy z numerem kontaktowym zapisanym przy zleceniu. Nieprawidłowa wiadomość jest wyjaśniana indywidualnie i nie jest publikowana jako zweryfikowana. Jeśli numer nadawcy różni się, tożsamość klienta trzeba sprawdzić dodatkowo bez ujawniania danych w odpowiedzi do przypadkowej osoby.
2. Operator sprawdza, czy kod nie był już wykorzystany. Jedno zlecenie = co najwyżej jedna opublikowana opinia dla danego zaproszenia; zarejestrowane kolejne korekty klienta można uwzględnić po ponownej weryfikacji.
3. Operator odnotowuje **oddzielną zgodę na publikację** treści i zaakceptowanego podpisu. Bez zgody nie zamieszcza opinii publicznie.
4. Dopiero po dopasowaniu do ukończonego zlecenia i zgodzie autora umieszcza opinię w `index.html` w `#opublikowane-opinie`. W arkuszu ustawia status "wykorzystany".
5. Publikuje także autentyczne oceny negatywne, bez warunkowania dostępu do formularza czy zaproszenia pozytywnym nastawieniem. Nie zmienia znaczenia komentarza. Treści niezgodne z prawem lub ujawniające dane osób trzecich wyjaśnia z autorem.
6. Jeśli klient wycofa zgodę, usuwa jego opublikowaną opinię z serwisu bez zbędnej zwłoki oraz rozpatruje zakres dalszego przechowywania danych.
7. Nie publikuje w GitHubie **numerów telefonów, kodów zaproszenia, numerów zleceń, rejestracji pojazdów ani szczegółów pozwalających identyfikować klienta bez podstawy prawnej**.

### Co zapewnia ta wersja?
- Strona jest statyczna (GitHub Pages) – nie ma publicznego formularza ani bazy, do której osoba z zewnątrz mogłaby samodzielnie dopisać opinię.
- **To weryfikacja przez operatora** oraz powiązanie z ukończonym zleceniem chronią przed fałszywą publikacją. Sam kod SMS nie jest automatycznie weryfikowany przez serwer.
- Konkurent może próbować wysyłać wiadomości na publiczny numer firmy, ale nie ma dostępu do publikacji na stronie, a niezweryfikowane SMS-y są odrzucane.
- Tylko upoważniona osoba mająca dostęp do GitHub i prywatnego rejestru dodaje zweryfikowane opinie.
- Jeśli potrzebujesz w przyszłości **automatycznej jednorazowej weryfikacji i publikacji bez człowieka**, potrzebna będzie usługa serwerowa lub zewnętrzny system formularzy z walidacją po stronie serwera.

### Przykład struktury HTML zatwierdzonej opinii
```html
<article class="review-card">
  <div class="stars" aria-label="Ocena 4 na 5">★★★★☆</div>
  <blockquote><p>[rzeczywista treść klienta, z jego zgodą]</p></blockquote>
  <p>– [podpis zatwierdzony przez autora]</p>
  <p>Opinia zweryfikowana na podstawie zakończonego zlecenia i kodu SMS.</p>
</article>
```

Nigdy nie generuj fikcyjnych ocen. Usuwając pusty komunikat po pierwszej opinii, zachowaj kontener `#opublikowane-opinie`.
