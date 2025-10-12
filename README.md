| Nama                          | NRP        |
|-------------------------------|------------|
| Adinda Cahya Pramesti | 5027241117 |
| Ananda Widi Alrafi            | 5027241067 |

# DOKUMENTASI

## Login Page
<img width="2879" height="1619" alt="image" src="https://github.com/user-attachments/assets/ce3b4854-7905-41d7-afad-8ad48f1d9fd0" />

### - Jika tidak diisi nama/password
<img width="2879" height="1619" alt="image" src="https://github.com/user-attachments/assets/ac00240b-8902-4daa-9c14-9452bfc3c500" />

### - Jika berhasil login akan menampilkan success message saat login berhasil.
<img width="836" height="724" alt="image" src="https://github.com/user-attachments/assets/d58f0f3d-8e19-4ceb-9862-c7eaf918495f" />

### - Jika tidak berhasil login akan menampilkan Error Handling ketika username/password salah.
<img width="836" height="724" alt="image" src="https://github.com/user-attachments/assets/6f6a5914-0d25-4f55-9b4f-072dcdf38e28" />

Halaman Login Page pada aplikasi Recipe Collection berfungsi sebagai gerbang utama sebelum pengguna dapat mengakses halaman resep.
Proses autentikasi dilakukan menggunakan API dari DummyJSON
, di mana pengguna login dengan memasukkan username dan password.
- Jika username dan password diisi dengan benar, maka proses login akan berhasil, dan nama pengguna (firstName) akan disimpan di localStorage untuk digunakan di halaman berikutnya.
- Jika kolom username atau password dibiarkan kosong, sistem akan menampilkan notifikasi peringatan agar pengguna mengisi seluruh form terlebih dahulu.
- Jika data login tidak valid (username atau password salah), akan muncul pesan error sebagai bentuk error handling.
- Ketika login berhasil, sistem akan menampilkan success message dan kemudian mengalihkan pengguna ke halaman utama (recipes page).

## Recipes Page - Initial Load

<img width="2878" height="1616" alt="image" src="https://github.com/user-attachments/assets/f8a53d9a-f614-41e7-894f-c1978d5618f0" />

Setelah login berhasil, pengguna akan diarahkan ke halaman utama yang menampilkan koleksi resep. Halaman ini menampilkan beberapa card resep rekomendasi, dan terlihat bahwa ada untuk filtering cuisine berdasarkan jenis dan nama.

## Pagination Show More / tampilkan lebih banyak

<img width="2878" height="1616" alt="image" src="https://github.com/user-attachments/assets/cf7b555c-eb1b-408f-b848-840f2f2fa6da" />
Tombol “Tampilkan Lebih Banyak” akan muncul di bagian bawah grid resep apabila masih terdapat resep yang belum ditampilkan. Setiap kali tombol diklik, sistem akan memuat beberapa resep tambahan dan memperbarui penghitungnya.


## Search Functionality 
### - With Results
<img width="2878" height="1616" alt="image" src="https://github.com/user-attachments/assets/40a1e649-1702-4382-9e38-05a15fa89ca9" />
<img width="2878" height="1616" alt="image" src="https://github.com/user-attachments/assets/5d35835e-d0b6-4141-9850-86a5bce388bb" />

### - No Results
<img width="2878" height="1616" alt="image" src="https://github.com/user-attachments/assets/784e1ddc-622a-45ff-877d-76bf0637e37b" />

## Cuisine Filter
<img width="2878" height="1616" alt="image" src="https://github.com/user-attachments/assets/7d093bdd-3b88-438a-ad1d-d67c500b1f9b" />


## Recipe
<img width="537" height="961" alt="image" src="https://github.com/user-attachments/assets/1575f075-8512-493f-bf32-e6f090597428" />

Jika click View Full Recipe maka akan memanmpilkan recipe lebih detail.
<img width="1389" height="1222" alt="image" src="https://github.com/user-attachments/assets/48544b2e-02a0-4abb-adfa-6386df770e0b" />












