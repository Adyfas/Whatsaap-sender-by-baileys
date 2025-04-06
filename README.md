# WhatsApp Bot dengan Baileys

Proyek ini adalah sebuah bot WhatsApp yang dibangun menggunakan Node.js dan library [Baileys](https://github.com/adiwajshing/Baileys). Bot ini dapat mengirim pesan ke pengguna WhatsApp dan terhubung dengan WhatsApp Web.

## Fitur

- Mengirim pesan WhatsApp ke nomor tertentu.
- Mengelola sesi autentikasi menggunakan file.
- Menangani koneksi dan pemutusan dengan baik.

## Prerequisites

Sebelum menjalankan proyek ini, pastikan Anda telah menginstal:

- [Node.js](https://nodejs.org/) (versi 14 atau lebih baru)
- [npm](https://www.npmjs.com/) (biasanya terinstal bersama Node.js)

## Instalasi

1. Clone repositori ini ke mesin lokal Anda:

   ```bash
   git clone https://github.com/Adyfas/Whatsaap-sender-by-baileys.git
   cd Whatsaap-sender-by-baileys
   ```

2. Instal dependensi yang diperlukan:

   ```bash
   npm install
   ```

3. Buat file `.env` di root proyek Anda dan tambahkan variabel berikut:

   ```plaintext
   PORT=3330
   ```

   Anda dapat menyesuaikan port sesuai kebutuhan.

## Cara Menggunakan

1. Jalankan bot dengan perintah berikut:

   ```bash
   node backend/whatsaap/index.js
   ```

2. Setelah bot berjalan, Anda akan melihat QR code di terminal. Pindai QR code tersebut menggunakan aplikasi WhatsApp di ponsel Anda untuk mengautentikasi bot.

3. Untuk mengirim pesan, Anda dapat menggunakan endpoint berikut dengan metode POST:

   ```
   POST http://localhost:3330/message
   ```

   Dengan body JSON seperti ini:

   ```json
   {
     "wa": "nomor_telepon"
   }
   ```

   Gantilah `nomor_telepon` dengan nomor WhatsApp yang ingin Anda kirimi pesan (tanpa tanda + dan dengan format `nomor@s.whatsapp.net`).

   Contoh:

   ```json
   {
     "wa": "6281234567890"
   }
   ```

4. Bot akan mengirim pesan "Hallo gessss" ke nomor yang ditentukan.

## Catatan

- Pastikan Anda telah menginstal semua dependensi dan mengonfigurasi file `.env` dengan benar.
- Jika Anda mengalami masalah saat menghubungkan bot ke WhatsApp, coba hapus folder `./session` dan ulangi proses pemindaian QR code.

## Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).
