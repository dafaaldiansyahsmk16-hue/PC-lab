# PC Lab Simulator — Prototipe awal

Website simulasi belajar rakit PC untuk siswa SMK, dengan tampilan responsif dan model 3D prosedural.

## Isi folder
- `index.html` — struktur halaman
- `style.css` — desain responsif untuk HP dan komputer
- `app.js` — interaksi mode panduan/bebas, progres, dan model 3D

## Cara menjalankan
1. Ekstrak ZIP.
2. Buka `index.html` lewat browser untuk melihat halaman. Model 3D memerlukan koneksi internet karena Three.js dimuat dari CDN.
3. Untuk penggunaan yang lebih konsisten, unggah ketiga file ke satu folder di hosting/cPanel, lalu buka URL folder tersebut.

## Upload ke cPanel
1. Masuk cPanel → File Manager.
2. Buka `public_html` (atau document root domain/subdomain yang digunakan).
3. Buat folder, misalnya `pclab`, lalu upload dan ekstrak ZIP di dalam folder itu.
4. Pastikan `index.html`, `style.css`, dan `app.js` berada langsung di folder `pclab`, bukan tersarang dalam folder lain.
5. Buka `https://domain-kamu/pclab/`.

## Catatan prototipe
- Model 3D dibangun dari bentuk geometris sederhana, bukan model CAD komponen asli.
- Mode panduan membatasi urutan pemasangan. Mode bebas mengizinkan pilihan komponen.
- Progres disimpan lokal pada browser/perangkat dengan localStorage, belum ada akun atau dashboard guru.
- Ini media pembelajaran awal; prosedur praktik asli harus mengikuti guru dan manual komponen.
- Untuk versi lanjutan: model 3D lebih realistis, target klik pada komponen, kuis, login guru, nilai siswa, dan sertifikat.
