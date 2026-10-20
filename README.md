# PC Lab — Build Quest (prototipe)

Game edukasi simulasi rakit PC yang responsif untuk HP dan komputer.

## Fitur
- Model casing PC 3D interaktif (putar, zoom, reset kamera).
- 12 misi: sekrup casing, panel samping, motherboard, baut motherboard, CPU, RAM, SSD, GPU, PSU, kabel, panel, tes boot virtual.
- Pilihan alat (obeng, tangan, kabel daya, tombol daya) dengan umpan balik.
- Klik objek target pada model 3D untuk memilihnya.
- Inventaris/progres disimpan lokal pada browser (`localStorage`).
- Tampilan responsif untuk layar kecil.

## File
- `index.html` — halaman utama
- `style.css` — tampilan
- `app.js` — game, model 3D, misi dan interaksi

## Menjalankan
Three.js dan font dimuat dari CDN, jadi koneksi internet diperlukan.
1. Ekstrak ZIP.
2. Untuk pengujian sederhana, buka `index.html` di browser modern. Beberapa browser HP membatasi file lokal; jika model tidak muncul, unggah ke GitHub Pages atau hosting.
3. Untuk GitHub Pages, upload `index.html`, `style.css`, `app.js` langsung ke root repository. Buka Settings → Pages → Deploy from a branch → `main` → `/ (root)` → Save.
4. Setelah deploy, tunggu beberapa menit lalu buka URL Pages yang diberikan GitHub.

## Catatan penting
Ini prototipe pendidikan dengan geometri 3D sederhana. Beberapa aksi/urutan disederhanakan agar bisa dipelajari dengan aman. Ini bukan simulator teknik bersertifikasi dan tidak menggantikan instruksi guru, manual motherboard, atau prosedur keselamatan saat praktik nyata. Penyimpanan progres hanya di browser/perangkat yang digunakan, belum memakai akun atau database.
