# 🚀 React Native Boilerplate Setup Guide

Selamat datang di boilerplate project! Project ini dirancang untuk sangat mudah di-customize menjadi aplikasi baru. Semua konfigurasi native yang rumit sudah disederhanakan melalui command line.

**Project ini menggunakan `bun` sebagai package manager utama.**

---

## 1. Ganti Nama Aplikasi & Package Name (Bundle ID)
Untuk memulai project baru, jalankan perintah ini dari terminal root project:

```bash
bun run rename "Nama App Baru" -b "com.perusahaan.namaappbaru"
```

*Contoh:*
```bash
bun run rename "GoFood Clone" -b "com.gojek.gofoodclone"
```
> **Catatan:** Proses ini akan otomatis merombak semua file `AndroidManifest.xml`, `strings.xml`, `MainApplication.java`, dan `Info.plist`. Kamu tidak perlu buka Android Studio atau Xcode!

---

## 2. Ganti Splash Screen Level Native
Boilerplate ini menggunakan `react-native-bootsplash`.

**Cara Ganti:**
1. Siapkan logo aplikasi berformat `.png` berukuran besar (misal: 1024x1024 px).
2. Replace (timpa) file logo yang ada di `assets/splash/logo.png`.
3. Jalankan perintah ini:
   ```bash
   bun run generate-splash
   ```
> Script di atas akan menggenerate Splash Screen untuk Android dan iOS dengan background putih (`#FFFFFF`) dan ukuran logo 100.
> *Kalau ingin ganti warna background, silakan edit command `generate-splash` di dalam `package.json`.*

---

## 3. Ganti App Icon
Ubah juga App Icon (icon aplikasi yang tampil di homescreen HP) dengan 1 langkah mudah.

**Cara Ganti:**
Logo yang kamu letakkan di `assets/splash/logo.png` juga bisa digunakan sebagai App Icon. Jika kamu punya logo icon khusus, pastikan namanya/pathnya sesuai, lalu jalankan:

```bash
bun run generate-icon
```
> Otomatis akan mencetak puluhan icon dengan resolusi berbeda untuk target Android (`mipmap`) dan iOS (`Images.xcassets`).

---

## 🎉 Selesai!
Setelah melakukan 3 langkah di atas, silakan build ulang aplikasi kamu:

```bash
bun run android
# atau
bun run ios
```

Aplikasi baru kamu sudah siap dikembangkan di folder `src/`! Selamat ngoding! 💻
