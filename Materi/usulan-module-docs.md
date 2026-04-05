# **Modul Dokteremr V2**

**Dashboard**

Halaman utama yang pertama muncul saat Owner atau Admin login. Menampilkan ringkasan seluruh kondisi klinik dalam satu layar tanpa perlu masuk ke tiap modul.

**Ringkasan Hari Ini:**

* **Total Pasien Hari Ini:** Jumlah pasien yang sudah terdaftar hari ini beserta perbandingan dengan hari kemarin  
* **Pendapatan Hari Ini:** Total pembayaran yang sudah lunas hari ini  
* **Dokter Aktif:** Jumlah dokter yang sedang praktek hari ini  
* **Antrean Menunggu:** Jumlah pasien yang belum dipanggil di ruang tunggu  
* **Stok Obat Kritis:** Jumlah item obat yang stoknya di bawah batas minimum  
* **Piutang Dokter:** Total jasa medis dokter yang belum dibayarkan klinik

**Grafik & Laporan Visual:**

* **Grafik Pendapatan:** Tren pendapatan harian, mingguan, dan bulanan  
* **Grafik Jumlah Pasien:** Perbandingan kunjungan per poli dan per dokter  
* **Top Layanan:** 5 jenis layanan dengan pendapatan terbesar bulan ini  
* **Rasio Pembayaran:** Persentase pasien Umum

**Panel Alert / Peringatan:**

* **Stok Obat Hampir Habis:** Daftar obat yang perlu reorder segera  
* **SIP/STR Akan Expired:** Dokter atau perawat yang izin praktiknya habis dalam 3 bulan  
* **Cuti Menunggu Approval:** Pengajuan cuti karyawan yang belum disetujui

# **Front Office**

**1\. Antrean (Halaman Utama Admin)**

Halaman untuk admin memantau situasi ruang tunggu.

* **Daftar Antrean Hari Ini:** Menampilkan nama pasien, jam kedatangan, dan status (Menunggu/Dipanggil).  
* **Tombol Pendaftaran Cepat:** Tombol mencolok di pojok kanan atas untuk memproses pasien yang baru datang (mengarah ke fitur OCR/Cari Pasien).  
* **Fitur "Daftarkan ke Kunjungan":** Tombol aksi untuk memindahkan pasien dari status menunggu di lobby ke status diperiksa dokter.

**2\. Pasien (Database & Registrasi OCR)**

* **Search Bar:** Satu kolom untuk cari berdasarkan Nama, No. RM, atau NIK.  
* **Registrasi Pasien Baru dengan OCR:**  
  * **Fitur Scan KTP:** Admin cukup foto/upload KTP pasien.  
  * **Auto-Fill:** Sistem otomatis mengekstrak teks (Nama, Alamat, NIK, Tgl Lahir) ke dalam form. Admin hanya perlu melengkapi data pekerjaan/telepon.  
* **History Pasien:** Tab khusus untuk melihat kapan terakhir berkunjung dan total tagihan yang pernah dibayar.

**3\. Janji Temu (Appointment)**

Halaman untuk mengelola booking kunjungan pasien sebelum datang ke klinik. Admin bisa atur jadwal dan konfirmasi janji temu. Pasien mendapat reminder otomatis via WhatsApp.

**Fitur Utama:**

* **Kalender Jadwal Dokter:** Tampilan kalender per dokter per minggu atau bulan, admin bisa lihat slot yang sudah terisi dan yang masih kosong  
* **Booking via Admin:** Admin input janji temu berdasarkan permintaan pasien via telepon atau langsung datang  
* **Booking Online:** Pasien bisa booking mandiri via link atau QR code klinik tanpa perlu telepon  
* **Batas Kapasitas:** Admin bisa set maksimal jumlah pasien per slot waktu per dokter

**Status Janji Temu:**

* **Menunggu Konfirmasi:** Baru dibuat, belum dikonfirmasi admin  
* **Dikonfirmasi:** Sudah dikonfirmasi, menunggu hari H  
* **Hadir:** Pasien sudah datang dan masuk antrean  
* **Tidak Hadir:** Pasien tidak datang tanpa konfirmasi  
* **Dibatalkan:** Dibatalkan oleh pasien atau klinik

**Integrasi Otomatis:**

* Saat pasien datang dan admin klik **"Hadir"** → sistem otomatis membuat antrean baru di halaman **Antrean**  
* Reminder otomatis dikirim via WhatsApp ke pasien **H-1** dan **2 jam sebelum** jadwal

**4\. Kunjungan**

Halaman yang berisi daftar pasien yang sudah "di tangan" dokter.

* **Monitor Pelayanan:** Menampilkan pasien yang sedang diperiksa dan dokter yang menangani.  
* **Integrasi Status:** Begitu dokter selesai mengisi SOAP di Rekam Medis, status di sini otomatis berubah menjadi **"Siap Bayar"**.  
* **Link Ke Kasir:** Tombol **"Proses Kasir"** yang muncul otomatis ketika pemeriksaan medis selesai.

**5\. Rekam Medis (SOAP)**

Halaman kerja utama dokter untuk mencatat hasil pemeriksaan pasien.

**Form SOAP:**

* **Subjective:** Kolom untuk mencatat keluhan pasien (keluhan utama, riwayat penyakit, riwayat alergi obat)  
* **Objective:** Kolom input tanda vital (Tekanan Darah, Nadi, Suhu, Berat Badan, Tinggi Badan) dan hasil pemeriksaan fisik   
- (perlu ada pemeriksaan khusus Gigi \- Odontogram/Peta 32 gigi terutama untuk klinik khusus Gigi).  
-  perlu ada modul khusus untuk klinik kecantikan misalnya gambar anatomi wajah dimana dokter bisa menandai bagian yang ada keluhan (titik yang diinjeksi, lokasi jerawat, lokasi scar dll)   
- Fitur Before After untuk klinik kecantikan (bisa langsung membandingkan foto ketika kunjungan sebelumnya VS kunjungan sekarang)  
* **Assessment:** Kolom diagnosis dokter dengan pilihan kode ICD-10  
* **Plan:** Kolom rencana tindakan dokter (resep obat, order lab, tindakan medis, anjuran) Integrasikan dengan ICD 9

**Fitur Tambahan:**

* **Riwayat Kunjungan:** Tab untuk melihat semua rekam medis pasien dari kunjungan sebelumnya  
* **Template SOAP:** Dokter bisa simpan template untuk penyakit yang sering ditemui, agar tidak perlu ketik ulang  
* **Alergi Alert:** Sistem otomatis memperingatkan jika dokter meresepkan obat yang tercatat sebagai alergi pasien  
* **Order Resep:** Dokter input obat di bagian Plan → data otomatis muncul di antrean Farmasi. Perlu ada modul khusus untuk order resep racikan. dan perlu di integrasikan resep racikan dengan pemotongan stock obat  
* **Order Lab/Radiologi:** Dokter centang pemeriksaan yang diperlukan → data otomatis muncul di modul Penunjang  
* **Surat Keterangan Sakit:** Cetak otomatis setelah dokter selesai mengisi SOAP  
* **Surat Rujukan:** Generate surat rujukan ke RS atau dokter spesialis langsung dari halaman ini

**Integrasi Otomatis:**

* Setelah dokter klik **"Selesai Periksa"** → status kunjungan otomatis berubah menjadi **"Siap Bayar"** → tombol **"Proses Kasir"** muncul di halaman Kunjungan

**6\. Kasir & Tagihan Pasien**

Halaman kerja petugas kasir untuk memproses pembayaran pasien setelah pemeriksaan selesai.

**Rincian Tagihan:**

* **Tagihan Otomatis:** Semua item tagihan terkumpul otomatis dari modul lain, kasir tidak perlu input manual:  
  * Jasa Konsultasi Dokter → dari Rekam Medis  
  * Obat & Alkes → dari Farmasi (setelah obat diserahkan)  
  * Biaya Lab / Radiologi → dari Penunjang (setelah hasil selesai)  
  * Tindakan Medis → dari Rekam Medis (bagian Plan)  
* **Verifikasi Item:** Kasir bisa cek dan koreksi rincian tagihan sebelum diproses

**Metode Pembayaran:**

* **Tunai:** Input nominal, sistem otomatis hitung kembalian  
* **Transfer Bank / QRIS:** Upload bukti transfer atau scan QR


**Fitur Tambahan:**

* **Diskon & Voucher:** Input kode diskon atau persentase diskon manual  
* **Cetak Struk:** Format A4 atau thermal printer (80mm)  
* **Kirim Struk WhatsApp:** Struk otomatis dikirim ke nomor HP pasien setelah bayar  
* **Refund / Pembatalan:** Proses pengembalian uang dengan catatan alasan  
* **Rekap Kasir Harian:** Laporan total penerimaan per shift atau per hari

**Integrasi Otomatis:**

* Setelah kasir klik **"Bayar"** → status kunjungan berubah **"Selesai"** → data pendapatan otomatis masuk ke **Modul Keuangan**

### **Modul Keuangan**

**1\. Modul Keuangan: Bagi Hasil (Jasa Medis) Dokter**

Sistem harus bisa memisahkan mana "Uang Klinik" dan mana "Hak Dokter" secara otomatis dari setiap invoice.

* **Setup Tarif Dokter:** Di menu *Tarif Dokter*, tambahkan kolom **Persentase Jasa Medis** (misal: Dokter dapat 70%, Klinik 30%) atau **Nominal Tetap** per pasien.  
* **Auto-Calculated Fee:** Setiap kali kasir menyelesaikan tagihan (seperti di Gambar 2), sistem langsung mencatat:  
  * Total Invoice: Rp 110.000  
  * Jasa Dokter (Hak dr. Alicia): Rp 77.000  
  * Pendapatan Klinik: Rp 33.000  
* **Laporan Piutang Dokter:** Dokter bisa melihat rekap jasa medis mereka yang belum dibayarkan oleh klinik dalam satu periode (misal bulanan).

**2\. Modul Keuangan: Penggajian Karyawan (Payroll)**

Untuk perawat, admin, dan CS, penggajian biasanya tidak berdasarkan per pasien, melainkan gaji pokok dan tunjangan.

* **Komponen Gaji:** Setup untuk Gaji Pokok, Tunjangan Kehadiran, dan Uang Makan.  
* **Integrasi Absensi:** Jika nanti ada fitur absensi, sistem otomatis menghitung potongan jika karyawan tidak masuk.  
* **Slip Gaji Digital:** Karyawan bisa melihat/download slip gaji mereka sendiri.

**3\. Modul Pengeluaran (Expense)**

Klinik tidak hanya punya pemasukan, tapi banyak pengeluaran.

* **Biaya Operasional:** Listrik, air, internet, sewa gedung.  
* **Belanja Stok:** Pembayaran ke supplier obat/alkes (terhubung ke modul Inventori).

### 

### **Manajemen Farmasi**

**1\. Pelayanan Resep (Antrean Farsi)**

Inilah layar kerja petugas Apotek. Tidak perlu input ulang, cukup validasi order dari dokter.

* **Alur:** Menarik data otomatis dari Rekam Medis (SOAP).  
* **Status Kerja:** Menunggu → Diracik → Siap Diserahkan.  
* **Fitur Kunci:** **Cetak Etiket Otomatis** (biar tidak tulis tangan di plastik obat).  
* **Logika Stok:** Stok **berkurang otomatis** hanya saat tombol "Serahkan Obat" diklik.

  ### **2\. Stok Obat & Alkes (Inventory List)**

Pusat kendali barang di klinik.

* **Isi:** Daftar Obat, BHP (Kapas, Spuit, dll), dan Alkes.  
* **Fitur Kunci:** \* **Low Stock Alert:** Warna baris otomatis jadi Merah jika di bawah limit.  
  * **Monitoring ED:** Widget khusus untuk obat yang kadaluarsa dalam \< 3 bulan.  
  * **Kartu Stok:** Log detail setiap butir obat keluar/masuk.

  ### **3\. Penerimaan (Procurement)**

Pintu masuk barang dari supplier (PBF).

* **Fungsi:** Input stok baru berdasarkan faktur pembelian.  
* **Otomasi:** Update harga beli (HPP) dan update stok secara instan.  
* **Margin Control:** Fitur setting harga jual otomatis (misal: HPP \+ 20%).

  ### **4\. Stok Opname (Adjustment)**

Proses audit fisik.

* **Fungsi:** Menyamakan jumlah obat di rak dengan jumlah di sistem.  
* **Output:** Laporan selisih (Obat hilang, rusak, atau expired yang dibuang).

### 

### **Manajemen Hr**

**1\. Data Induk Pegawai (Staff Directory)**

Bukan sekadar daftar nama, tapi profil lengkap untuk keperluan kredensialing.

* **Profil Pegawai:** Foto, KTP, alamat, dan jabatan (Admin, Perawat, Dokter, Farmasi).  
* **Kredensial Medis (Khusus Nakes):** Tempat menyimpan file scan **STR (Surat Tanda Registrasi)** dan **SIP (Surat Izin Praktik)** beserta tanggal masa berlakunya.  
  * *Fitur Unggulan:* Notifikasi ke admin jika SIP/STR dokter akan habis dalam 3 bulan.  
* **Kontrak & Dokumen:** File digital kontrak kerja atau ijazah.

  ### **2\. Presensi & Jadwal (Attendance & Roster)**

Mengontrol kedatangan untuk menghitung uang makan/transport.

* **Shift Kerja:** Pengaturan jadwal (Shift Pagi, Sore, Malam).  
* **Presensi Digital:** Bisa diintegrasikan dengan absensi via web (berdasarkan IP Address kantor agar tidak bisa absen dari rumah) atau upload data dari mesin fingerprint.  
* **Manajemen Cuti:** Pengajuan cuti yang harus di-approve oleh Owner/Manager melalui sistem.

  ### **3\. Modul Payroll & Jasa Medis (Pusat Penggajian)**

Ini yang paling penting dan berbeda dari kompetitor.

* **Setup Komponen Gaji:** \* *Tetap:* Gaji Pokok.  
  * *Variabel:* Tunjangan kehadiran, uang lembur.  
  * *Insentif/Jasa Medis:* **Bagi hasil per pasien** (untuk Dokter) atau **Insentif Tindakan** (untuk Perawat yang membantu tindakan).  
* **Generate Slip Gaji:** Sekali klik untuk menggabungkan Gaji Pokok \+ Jasa Medis \- Potongan (jika ada).  
* **Laporan Pembayaran:** Rekap total pengeluaran gaji bulanan klinik.


**Modul Penunjang**

**1\. Sub-Modul: Permintaan (Order Entry)**

Ini adalah tempat petugas Lab/Radiologi menerima "pesanan" dari dokter.

* **Alur Otomatis:** Begitu dokter mengisi *Order Lab* di Rekam Medis (misal: Cek Darah Rutin), data langsung muncul di sini.  
* **Fitur Utama:**  
  * **Billing Check:** Muncul indikator apakah pasien sudah bayar di kasir atau belum. (Standar klinik swasta: bayar dulu baru diperiksa).  
  * **Labeling:** Cetak stiker barcode untuk tabung sampel darah atau berkas rontgen agar tidak tertukar.

  ### **2\. Sub-Modul: Input Hasil & Verifikasi**

Tempat petugas memasukkan angka atau mengunggah gambar.

* **Fitur Utama (Lab):**  
  * **Nilai Rujukan:** Sistem otomatis menampilkan batas normal (misal: Hb normal 12-14). Jika hasil pasien di luar itu (misal: 9), angka otomatis berwarna **merah**.  
  * **Input Kualitatif/Kuantitatif:** Pilihan input berupa angka atau teks (Positif/Negatif).  
* **Fitur Utama (Radiologi):**  
  * **Upload Eksisi:** Unggah file foto rontgen/USG (JPEG/DICOM).  
  * **Expertise:** Kolom untuk dokter spesialis radiologi mengetikkan pembacaan hasil (kesan/kesimpulan).

  ### **3\. Sub-Modul: Histori & Print Hasil**

Pusat arsip hasil pemeriksaan.

* **Fitur Utama:**  
  * **Cetak Hasil:** Generate PDF hasil lab yang rapi dengan kop klinik dan tanda tangan digital.  
  * **Kirim WA:** Fitur untuk mengirim PDF hasil lab langsung ke WhatsApp pasien setelah divalidasi.

**Modul Hak Akses (Role & Permission)**

Pengaturan untuk menentukan siapa saja yang boleh mengakses halaman dan fitur tertentu dalam sistem. Setiap pegawai hanya bisa melihat dan menggunakan fitur sesuai jabatannya.

**Daftar Role (Jabatan) dalam Sistem:**

* **Owner:** Akses penuh ke semua modul termasuk seluruh laporan keuangan  
* **Admin / Receptionist:** Akses ke Front Office, Data Pasien, Antrean, Kunjungan  
* **Dokter:** Akses ke Rekam Medis, Order Resep, Order Lab  
* **Perawat:** Akses terbatas ke Rekam Medis (hanya input tanda vital)  
* **Farmasi:** Akses ke Antrean Resep, Stok Obat, Penerimaan Barang  
* **Kasir:** Akses ke Tagihan Pasien dan Proses Pembayaran  
* **Lab / Radiologi:** Akses ke Order Lab dan Input Hasil Pemeriksaan  
* **HRD:** Akses ke Data Pegawai, Absensi, Jadwal, Payroll

**Fitur Pengaturan Role:**

* **Assign Role:** Owner bisa tentukan role untuk setiap pegawai saat tambah user baru  
* **Multi Role:** Satu user bisa punya lebih dari satu role (contoh: Dokter sekaligus Owner)  
* **Nonaktifkan Akses:** Owner bisa matikan akses fitur tertentu per role sesuai kebutuhan klinik  
* **Log Aktivitas:** Sistem mencatat siapa login, kapan, dan apa yang diubah.