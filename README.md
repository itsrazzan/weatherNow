🌦️ WeatherNow - Aplikasi Cuaca Sederhana
📝 Deskripsi
WeatherNow adalah aplikasi web ringan untuk mengecek cuaca secara real-time menggunakan HTML, CSS, dan JavaScript. Data cuaca diambil dari WeatherAPI.com.
🚀 Fitur Utama
Cek cuaca berdasarkan nama kota dan daerah
Tampilkan suhu & kondisi cuaca (dalam °C)
Jam & tanggal otomatis real-time
Sapaan dinamis (Pagi, Siang, Malam)
Simpan riwayat pencarian di localStorage
Nama pengguna bisa diedit
Animasi untuk error handling

🧠 Struktur & Workflow JavaScript
🔹 1. Class WeatherNow
Semua logic utama dibungkus dalam satu class.

🔹 2. Fitur Inti
✅ API Cuaca
Fetch data dari WeatherAPI.com pakai async/await
Menangani error (misal kota nggak ditemukan)
Tampilkan animasi error kalau fetch gagal

✅ Local Storage
Simpan nama user & riwayat pencarian
Data tetap tersimpan meski reload
Load otomatis saat halaman dibuka

✅ Real-time Updates
Jam digital (update tiap detik)
menampilkan tanggal
Sapaan berubah sesuai waktu

🔹 3. Event Handler
Tombol search / enter untuk cari kota
Input nama user bisa langsung disimpan

🔹 4. Method Utama
getWeatherData(), updateUI(), saveToLocalStorage(), dll.

🔹 5. Inisialisasi
Instance WeatherNow dibuat saat halaman load
Gunakan API Key yang kamu dapet dari WeatherAPI

🛠️ Instalasi
Clone repo ini
Daftar di WeatherAPI.com dan dapatkan API Key
Masukkan API Key kamu ke file app.js
Buka index.html di browser

Penjelasan Video Youtube
 - untuk penjelasan lebih lanjut tentang projek bisa dilihat pada video berikut
 [Youtube](https://youtu.be/3q5yXmbkL78)

👤 Pembuat
Agil Razzan – Proyek pembelajaran JavaScript pribadi 
