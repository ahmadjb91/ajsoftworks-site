/* =====================================================================
   EDIT HERE: store links for each app.
   An empty link shows that store as "Coming soon".
   Texts for every language live in i18n.js.
   ===================================================================== */
const APPS = [
  {
    key: "vault",
    name: "AJ Vault",
    color: "linear-gradient(135deg,#0ea5e9,#6366f1)",
    icon: "lock",
    appStore: "https://apps.apple.com/app/aj-vault/id6830607391",
    googlePlay: "https://play.google.com/store/apps/details?id=com.ajsoftworks.vault"
  },
  {
    key: "mainu",
    name: "Mainu",
    color: "linear-gradient(135deg,#f59e0b,#ec4899)",
    icon: "users",
    appStore: "https://apps.apple.com/app/mainu-whos-most-likely-to/id6835141764",
    // Google Play: not live yet. When it is, paste the store link here.
    googlePlay: ""
  }
];
/* ===================================================================== */

const LANGS = [
  ["en","English"],["he","עברית"],["ar","العربية"],["es","Español"],["fr","Français"],
  ["de","Deutsch"],["ru","Русский"],["tr","Türkçe"],["pt","Português"],["zh","中文"]
];
const RTL = ["he","ar"];

const ICONS = {
  lock:'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
  calendar:'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/><path d="M9 15l2 2 4-4"/></svg>',
  users:'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/></svg>'
};
const APPLE = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.4 12.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8 1.6 0 2 .8 3.4.8 1.4 0 2.3-1.3 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9-.1 0-2.7-1-2.7-4.1zM13.9 4.9c.7-.9 1.2-2 1.1-3.2-1 0-2.3.7-3 1.6-.7.8-1.2 2-1.1 3.1 1.1.1 2.3-.6 3-1.5z"/></svg>';
const PLAY = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.6 1.8c-.3.3-.4.7-.4 1.2v18c0 .5.1.9.4 1.2l10-10.2-10-10.2zm11.1 11.3 2.8 2.8-11.9 6.8 9.1-9.6zm0-2.2L5.6 1.3l11.9 6.8-2.8 2.8zm5.6 3.1-2.9 1.7-3.1-3.1 3.1-3.1 2.9 1.7c.9.5.9 2.3 0 2.8z"/></svg>';

function store(label, logo, url, soonText){
  if (url) return `<a class="store" href="${url}" target="_blank" rel="noopener" dir="ltr">${logo}${label}</a>`;
  return `<span class="store soon">${logo}<span dir="ltr">${label}</span> · ${soonText}</span>`;
}

function render(lang){
  const T = I18N[lang] || I18N.en;
  const t = k => T[k] ?? I18N.en[k];
  document.documentElement.lang = lang;
  document.documentElement.dir = RTL.includes(lang) ? "rtl" : "ltr";
  document.title = t("title");
  document.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });

  document.getElementById("app-list").innerHTML = APPS.map(a => `
    <article class="app">
      <div class="app-top">
        <div class="app-icon" style="background:${a.color}">${ICONS[a.icon]}</div>
        <div><h3><bdi>${a.name}</bdi></h3><div class="tag">${t(a.key+"_tag")}</div></div>
      </div>
      <p>${t(a.key+"_desc")}</p>
      <div class="region">${t(a.key+"_region")}</div>
      <ul class="features">${t(a.key+"_f").map(f=>`<li>${f}</li>`).join("")}</ul>
      <div class="stores">
        ${store("App Store", APPLE, a.appStore, t("soon"))}
        ${store("Google Play", PLAY, a.googlePlay, t("soon"))}
      </div>
    </article>`).join("");

  document.getElementById("privacy-links").innerHTML =
    `<a href="mailto:ajsoftworks@ajsoftworks.com">${t("nav_contact")}</a>`;
  document.getElementById("lang").value = lang;
}

function pickLang(){
  const q = new URLSearchParams(location.search).get("lang");
  if (q && I18N[q]) return q;
  try { const s = localStorage.getItem("lang"); if (s && I18N[s]) return s; } catch(e){}
  for (const l of (navigator.languages || [navigator.language || "en"])) {
    const c = (l || "").slice(0,2).toLowerCase();
    if (c === "iw") return "he";
    if (I18N[c]) return c;
  }
  return "en";
}

const sel = document.getElementById("lang");
sel.innerHTML = LANGS.map(([c,n]) => `<option value="${c}">${n}</option>`).join("");
sel.addEventListener("change", e => {
  const l = e.target.value;
  try { localStorage.setItem("lang", l); } catch(err){}
  const u = new URL(location.href); u.searchParams.set("lang", l); history.replaceState(null, "", u);
  render(l);
});
document.getElementById("year").textContent = new Date().getFullYear();
render(pickLang());
