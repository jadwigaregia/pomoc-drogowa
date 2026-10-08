/* Strona statyczna. Zgody przechowywane jedynie w sessionStorage; nowe otwarcie = ponowny wybór. */
(() => {
  "use strict";
  const consentKey = "pd24_cookie_choices_v1";
  let decision = null;
  const safeGet = () => {
    try { const raw = sessionStorage.getItem(consentKey); if (!raw) return null;
      const obj = JSON.parse(raw); return typeof obj.maps === "boolean" ? obj : null;
    } catch (_) { return null; }
  };
  const safeSet = value => {
    decision = { maps: Boolean(value.maps), savedAt: new Date().toISOString() };
    try { sessionStorage.setItem(consentKey, JSON.stringify(decision)); } catch (_) {}
  };
  const mapSrc = "https://maps.google.com/maps?q=Wierzbowa%20155%2FB%2C%2062-081%20Wysogotowo%2C%20Polska&z=15&output=embed";

  function applyMapChoice() {
    const map = document.querySelector("iframe[data-consent-map]");
    const placeholder = document.querySelector("[data-map-placeholder]");
    if (!map) return;
    if (decision && decision.maps) {
      if (!map.getAttribute("src")) map.setAttribute("src", map.getAttribute("data-map-src") || mapSrc);
      map.hidden = false;
      if (placeholder) placeholder.hidden = true;
    } else {
      // Przestajemy wyświetlać mapę; zapisane wcześniej cookies Google usuwa użytkownik w przeglądarce.
      map.removeAttribute("src");
      map.hidden = true;
      if (placeholder) placeholder.hidden = false;
    }
  }

  const banner = document.createElement("section");
  banner.className = "cookie-banner";
  banner.id = "cookie-banner";
  banner.setAttribute("aria-label", "Wybór prywatności i plików cookie");
  banner.innerHTML = `
    <h2>Twoja prywatność i pliki cookie</h2>
    <p>Zapamiętujemy wybór na czas bieżącej sesji. Zewnętrzną mapę Google wczytujemy tylko za Twoją zgodą. Bez zgody możesz korzystać z usług i numeru telefonu. <a href="/polityka-cookies.html">Więcej o cookies</a>.</p>
    <div class="cookie-actions">
      <button type="button" class="cookie-button" data-cookie-reject>Odrzuć opcjonalne</button>
      <button type="button" class="cookie-button" data-cookie-preferences>Dostosuj</button>
      <button type="button" class="cookie-button cookie-button--primary" data-cookie-accept>Akceptuj opcjonalne</button>
    </div>`;
  const dialog = document.createElement("dialog");
  dialog.className = "cookie-dialog";
  dialog.id = "cookie-dialog";
  dialog.setAttribute("aria-labelledby", "cookie-dialog-title");
  dialog.innerHTML = `
    <h2 id="cookie-dialog-title">Ustawienia prywatności</h2>
    <p>Możesz odmówić załadowania usług opcjonalnych. Zmienisz decyzję w dowolnym momencie przez link „Ustawienia cookies” w stopce.</p>
    <div class="cookie-option">
      <input type="checkbox" id="cookie-necessary" checked disabled>
      <label for="cookie-necessary">Niezbędne <small>Techniczne zapisanie decyzji w pamięci sesji przeglądarki. Nie można wyłączyć w panelu.</small></label>
    </div>
    <div class="cookie-option">
      <input type="checkbox" id="cookie-maps">
      <label for="cookie-maps">Mapa Google – opcjonalna <small>Po włączeniu mapa może przekazywać Google dane techniczne i zapisywać cookies. Bez zgody dostępny jest link do Map Google.</small></label>
    </div>
    <p><a href="/polityka-prywatnosci.html">Polityka prywatności</a> • <a href="/polityka-cookies.html">Polityka cookies</a></p>
    <div class="cookie-actions">
      <button type="button" class="cookie-button" data-cookie-save>Zapisz wybór</button>
      <button type="button" class="cookie-button" data-cookie-reject>Odrzuć opcjonalne</button>
      <button type="button" class="cookie-button cookie-button--primary" data-cookie-accept>Akceptuj opcjonalne</button>
    </div>`;

  function hideBanner() { banner.hidden = true; }
  function showBanner() { banner.hidden = false; }
  function hideDialog() { if (dialog.open) dialog.close(); else dialog.hidden = true; }
  function openSettings() {
    const mapCheckbox = dialog.querySelector("#cookie-maps");
    mapCheckbox.checked = Boolean(decision && decision.maps);
    dialog.hidden = false;
    if (typeof dialog.showModal === "function") {
      if (!dialog.open) dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
  }
  function select(value) {
    safeSet({maps:value});
    applyMapChoice();
    hideBanner();
    hideDialog();
  }
  function setup() {
    document.body.appendChild(banner);
    document.body.appendChild(dialog);
    banner.addEventListener("click", (e) => {
      const button = e.target.closest("button");
      if (!button) return;
      if (button.matches("[data-cookie-accept]")) select(true);
      else if (button.matches("[data-cookie-reject]")) select(false);
      else if (button.matches("[data-cookie-preferences]")) openSettings();
    });
    dialog.addEventListener("click", (e) => {
      const button = e.target.closest("button");
      if (!button) return;
      if (button.matches("[data-cookie-accept]")) select(true);
      else if (button.matches("[data-cookie-reject]")) select(false);
      else if (button.matches("[data-cookie-save]")) select(dialog.querySelector("#cookie-maps").checked);
    });
    document.querySelectorAll("[data-cookie-settings]").forEach(button => button.addEventListener("click", openSettings));
    document.querySelectorAll("[data-enable-map]").forEach(button => button.addEventListener("click", () => select(true)));
    decision = safeGet();
    applyMapChoice();
    if (decision) hideBanner();
    else showBanner();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => { setup(); });
  else { setup(); }
})();
