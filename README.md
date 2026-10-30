# Bengkel & Armada Monitoring (GitHub Pages)

Aplikasi ini hanya tampilan. Data tetap dari Google Sheet lewat Web App Apps Script
(file `Code.gs` terbaru, **tidak** ada di repo ini).

## Isi folder
- `index.html`, `app.js` - aplikasi
- `sw.js` - service worker (aplikasi cepat dibuka, tetap terbuka saat sinyal jelek)
- `manifest.webmanifest` + ikon - supaya bisa dipasang di layar utama HP
- `pwa.js` - peluncur; `config.js` - pengaturan (boleh dikosongkan)

## Pasang (sekali)
1. Di Apps Script: tempel **Code.gs** dan **Index.html** terbaru, lalu **Deploy > Kelola deployment > Edit > Versi baru > Deploy**.
   Akses Web App harus **Siapa saja (Anyone)**. Salin alamat Web App yang berakhiran `/exec`.
2. Upload semua isi folder ini ke repo GitHub, lalu **Settings > Pages > Build and deployment > Deploy from a branch > main / (root) > Save**.
3. Buka alamat `https://<akun>.github.io/<repo>/` di HP. Pertama kali akan diminta alamat Web App: tempel, tekan **Simpan & buka**.
   Bisa juga lewat tautan sekali pakai: `https://<akun>.github.io/<repo>/?api=ALAMAT_WEB_APP` (alamat tersimpan di HP itu, lalu dihapus dari tautan).
4. Chrome: menu titik tiga > **Tambahkan ke layar utama / Instal aplikasi**.

## Catatan
- Jangan isi alamat Web App di `config.js` bila repo ini **Public**; cukup lewat langkah 3.
- Ganti alamat di satu HP: buka `.../?reset=1`.
- Setiap kali `app.js` / `sw.js` diganti, HP mengambil versi baru otomatis saat ada internet.
