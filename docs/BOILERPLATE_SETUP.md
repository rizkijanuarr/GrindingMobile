## 1. Ganti Nama Aplikasi & Package Name (Bundle ID)
Untuk memulai project baru, jalankan perintah ini dari terminal root project:

```bash
bun run rename "Nama App Baru" -b "com.rizki.namaappbaru"
```

*Contoh:*
```bash
bun run rename "Boilerplate" -b "com.rizki.boilerplate"
```
> **Catatan:** Proses ini akan otomatis merombak semua file `AndroidManifest.xml`, `strings.xml`, `MainApplication.java`, dan `Info.plist`. Kamu tidak perlu buka Android Studio atau Xcode!

---

## 2. Ganti Splash Screen Level Native
Boilerplate ini menggunakan `react-native-bootsplash`.

**Cara Ganti:**
1. Siapkan logo aplikasi berformat `.png`
2. Replace (timpa) file logo yang ada di `assets/splash/default.png`.
3. Jalankan perintah ini:
   ```bash
   bun run generate-splash
   ```
> Script di atas akan menggenerate Splash Screen untuk Android dan iOS dengan background putih (`#FFFFFF`) dan ukuran logo 100.
> *Kalau ingin ganti warna background, silakan edit command `generate-splash` di dalam `package.json`.*

---

## 3. Ganti App Icon
Ubah juga App Icon (icon aplikasi yang tampil di homescreen HP) dengan 1 langkah mudah.

1. Kunjungi : https://icon.kitchen/
2. Extract ZIP
3. Copy android, ios, web ke folder assets/app-icon/
4. Jalankan perintah ini:

```bash
bun run apply-icon
```

---

## 🎉 Selesai!
Setelah melakukan 3 langkah di atas, silakan build ulang aplikasi kamu:

```bash
bun run android
# atau
bun run ios
```

