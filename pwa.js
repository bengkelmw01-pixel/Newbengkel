/* Bengkel & Armada Monitoring - peluncur versi GitHub Pages / PWA.
   Tugas: (1) tahu alamat web app Apps Script, (2) memuat app.js, (3) mendaftarkan service worker. */
(function () {
  var P = window.BKA_PWA = { app: 'app.js?v=1d33ab4cc9' };
  var OK = /^https:\/\/script\.google\.com\/(a\/macros\/[^\/]+\/)?macros\/s\/[A-Za-z0-9_-]+\/exec$/;

  function ls(k, v) {
    try { if (v === undefined) return localStorage.getItem(k) || ''; if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) {}
    return '';
  }
  function url() { return String(window.BKA_API || ls('bka_api') || '').trim(); }

  /* ?api=ALAMAT menyimpan alamat di perangkat ini lalu membersihkan alamat halaman; ?reset=1 menghapusnya */
  try {
    var q = new URLSearchParams(location.search), a = q.get('api'), changed = false;
    if (q.get('reset')) { ls('bka_api', null); q.delete('reset'); changed = true; }
    if (a) { if (OK.test(a)) ls('bka_api', a); q.delete('api'); changed = true; }
    if (changed) history.replaceState(null, '', location.pathname + (q.toString() ? '?' + q.toString() : '') + location.hash);
  } catch (e) {}

  function start() {
    var s = document.createElement('script');
    s.src = P.app;
    document.body.appendChild(s);
  }

  function setup() {
    var box = document.createElement('div');
    box.id = 'bka-setup';
    box.style.cssText = 'max-width:460px;margin:0 auto;padding:12vh 18px 28px;font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:#0f1b4d';
    box.innerHTML =
      '<h2 style="margin:0 0 6px;color:#0b3bb8">Bengkel &amp; Armada Monitoring</h2>' +
      '<p style="margin:0 0 16px;color:#6b7694">Pertama kali dibuka: tempel alamat Web App (Apps Script) yang berakhiran <b>/exec</b>.</p>' +
      '<input id="bka-url" type="url" inputmode="url" autocomplete="off" placeholder="https://script.google.com/macros/s/.../exec" style="width:100%;padding:12px;border:1px solid #cfd8ee;border-radius:12px;font-size:15px;box-sizing:border-box">' +
      '<button id="bka-go" type="button" style="margin-top:12px;width:100%;padding:13px;border-radius:12px;background:#1a4fd8;color:#fff;font-weight:700;font-size:16px;border:0">Simpan &amp; buka</button>' +
      '<p id="bka-msg" style="min-height:22px;margin:12px 0 0;color:#d1203a"></p>';
    /* selama layar alamat tampil, sembunyikan kerangka aplikasi (menu, bilah atas) supaya hanya formulir yang terlihat */
    var st = document.createElement('style');
    st.id = 'bka-setup-css';
    st.textContent = 'body.bka-setup>*:not(#bka-setup){display:none!important}';
    document.head.appendChild(st);
    document.body.classList.add('bka-setup');
    document.body.appendChild(box);
    var inp = box.querySelector('#bka-url'), btn = box.querySelector('#bka-go'), msg = box.querySelector('#bka-msg');
    btn.onclick = function () {
      var v = String(inp.value || '').trim();
      if (!OK.test(v)) { msg.textContent = 'Alamat tidak sesuai. Harus seperti https://script.google.com/macros/s/.../exec'; return; }
      msg.style.color = '#6b7694'; msg.textContent = 'Menghubungi server...'; btn.disabled = true;
      /* sama persis dengan panggilan aplikasi (POST teks biasa), supaya yang dites memang jalur yang nanti dipakai */
      fetch(v, { method: 'POST', body: JSON.stringify({ fn: 'ping', a: [] }), credentials: 'omit', redirect: 'follow' }).then(function (r) { return r.json(); }).then(function (o) {
        if (!o || !o.ok) throw 0;
        ls('bka_api', v);
        box.parentNode.removeChild(box);
        st.parentNode.removeChild(st);
        document.body.classList.remove('bka-setup');
        start();
      }).catch(function () {
        btn.disabled = false; msg.style.color = '#d1203a';
        msg.textContent = 'Server tidak menjawab. Pastikan Code.gs terbaru sudah di-deploy (Versi baru) dan akses Web App = "Siapa saja".';
      });
    };
  }

  if (url() || window.BKA_MOCK) start(); else setup();

  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () {}); });
  }
})();
