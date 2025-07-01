useTransition

- adalah React Hook yang memungkinkan kamu merender sebagian antarmuka pengguna (UI) di latar belakang.

Dengan kata lain, hook ini digunakan untuk menunda pembaruan UI tertentu agar tidak mengganggu responsivitas bagian UI yang lebih penting, sehingga memberikan pengalaman pengguna yang lebih mulus.

Fungsi yang diteruskan ke startTransition disebut sebagai “Aksi” (Action). Kamu dapat memperbarui state dan (opsional) melakukan side effect di dalam sebuah Aksi, dan pekerjaan tersebut akan dijalankan di latar belakang tanpa menghambat interaksi pengguna di halaman.

Melakukan side effect di dalam sebuah Aksi" berarti menjalankan kode yang berdampak di luar React, seperti:

- Memanggil API
- Menyimpan data ke localStorage
- Mengirim log ke server
- Mengatur timer, dll
