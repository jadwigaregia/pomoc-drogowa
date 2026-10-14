# Opinie klientów — jednorazowe zaproszenia

Aktualizacja: 14.10.2026. Ta wersja zastępuje poprzedni system ręcznego dodawania opinii z SMS-ów.

## Panel obsługi
https://opinie-pomoc-drogowa-poznan.young-mug-0243.chatgpt.site/admin

Zaloguj się kontem właściciela ChatGPT użytym do utworzenia systemu. Publiczny formularz klienta nie wymaga konta ChatGPT.

1. Po zakończeniu usługi kliknij „Utwórz nowy link dla klienta”.
2. Wpisz numer klienta i wybierz „Otwórz SMS do klienta” albo skopiuj wiadomość i wyślij ją ze swojego telefonu.
3. Jeden link wysyłaj tylko jednemu klientowi. Zapisz go przed zamknięciem panelu; system nie przechowuje jawnych tokenów do późniejszego odczytu.
4. Klient wpisuje e-mail, pseudonim, ocenę i komentarz. Po wyrażeniu zgody i wysłaniu formularza opinia publikuje się automatycznie.
5. E-mail nigdy nie jest udostępniany przez publiczne API. Na stronie widoczny jest pseudonim, ocena, treść i data.

Link wygasa po 30 dniach, działa tylko raz i może zostać anulowany w panelu przed wykorzystaniem. Kod jest losowy (256 bitów); baza przechowuje jego skrót SHA-256. Unikalny indeks chroni przed podwójną publikacją również przy równoczesnych żądaniach.

Nie ma potwierdzania SMS ani e-maila. Link może być przekazany dalej — dlatego nie oznaczamy opinii jako zweryfikowanej tożsamości. Zapraszaj wszystkich rzeczywistych klientów niezależnie od przewidywanej oceny.

Nie umieszczaj telefonów, e-maili, tokenów ani prywatnych wiadomości klientów w GitHubie.

## Utrzymanie
Frontend: index.html, opinia.html, opinia.js, opinie-lista.js w tym repozytorium.
Zaplecze: OpenAI Sites, projekt appgprj_6acfaa4f45c08191ab07bc7bd1169642; własne repozytorium źródłowe Sites.
Baza: D1 (DB). API odczytu udostępnia wyłącznie publiczne pola. Właściciela identyfikuje logowanie ChatGPT; początkowy adres administratora zapisano jako niepubliczną zmienną ADMIN_EMAIL, a identyfikator użytkownika zostaje przypisany przy pierwszym logowaniu.

Dostępne chronione API: POST /api/invites (utworzenie), DELETE /api/invites (anulowanie), DELETE /api/reviews (usunięcie po zweryfikowanym żądaniu autora, z wyczyszczeniem danych osobowych). Usunięcie nie zwalnia wykorzystanego zaproszenia.

Testy zaplecza: scripts/check-reviews.cjs. Obejmują jednorazowość, uprawnienia, CSRF, zgodę, e-mail, prywatność, wygasanie i anulowanie.

Administrator danych pozostaje zgodny z obecną stroną: IVNE sp. z o.o., ul. Wierzbowa 155/B, 62-081 Wysogotowo. Kontakt i okresy przechowywania opisuje polityka-prywatnosci.html. Obsługuj zgłoszenia wycofania zgody i naruszeń prywatności; nie usuwaj opinii tylko dlatego, że jest krytyczna.
