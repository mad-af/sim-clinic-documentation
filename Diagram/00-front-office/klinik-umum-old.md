```mermaid
flowchart TD
    Pasien_37121384[Pasien] --> Pendaftaran_Langsung_ff4eb910[Pendaftaran Langsung]
    Pasien_37121384 --> Booking_Online_c04cc59c[Booking Online]
    Pendaftaran_Langsung_ff4eb910 --> Pasien_Datang_Klinik_29274eb7[Pasien Datang Klinik]
    Booking_Online_c04cc59c --> Pilih_Jenis_Layanan_90216235[Pilih Jenis Layanan]
    Pasien_Datang_Klinik_29274eb7 --> Nomor_Antrian_Otomat_e21aafa8[Nomor Antrian Otomatis]
    Pilih_Jenis_Layanan_90216235 --> Pilih_Poli_bbd26c59[Pilih Poli]
    Nomor_Antrian_Otomat_e21aafa8 --> Estimasi_Jam_Realtim_a1b32076[Estimasi Jam Realtime]
    Pilih_Poli_bbd26c59 --> Pilih_Dokter_48c74585[Pilih Dokter]
    Estimasi_Jam_Realtim_a1b32076 --> Menunggu_Dipanggil_24c53efe[Menunggu Dipanggil]
    Pilih_Dokter_48c74585 --> Pilih_Tanggal_Jam_dfa20c27[Pilih Tanggal Jam]
    Menunggu_Dipanggil_24c53efe --> Pasien_Baru_Lama_2afb9251{"Pasien Baru/Lama?"}
    Pilih_Tanggal_Jam_dfa20c27 --> Pernah_Berobat_449aaeca{Pernah Berobat?}
    Pasien_Baru_Lama_2afb9251 -->|Lama| Scan_Member_19bc26df[Scan Member]
    Pasien_Baru_Lama_2afb9251 -->|Baru| Verifikasi_KTP_14d889a9[Verifikasi KTP]
    Pernah_Berobat_449aaeca -->|Ya| Cari_Nomor_RME_fa14a24d[Cari Nomor RME]
    Pernah_Berobat_449aaeca -->|Tidak| Buat_Member_Otomatis_ca16f9d9[Buat Member Otomatis]
    Pernah_Berobat_449aaeca -->|Tidak| Upload_KTP_197b5bc3[Upload KTP]
    Scan_Member_19bc26df --> Cek_Rekam_Medis_6cf3411b[Cek Rekam Medis]
    Verifikasi_KTP_14d889a9 --> Isi_Data_Pasien_OCR_d6f1f7db["Isi Data Pasien/OCR"]
    Cari_Nomor_RME_fa14a24d --> Input_Keluhan_8ab665ec[Input Keluhan]
    Isi_Data_Pasien_OCR_d6f1f7db --> Buat_Member_Otomatis_3a09c47f[Buat Member Otomatis]
    Buat_Member_Otomatis_ca16f9d9 --> Registrasi_Otomatis_a301eec0[Registrasi Otomatis]
    Upload_KTP_197b5bc3 --> Input_Keluhan_8ab665ec
    Cek_Rekam_Medis_6cf3411b --> Pilih_Jenis_Layanan_89a496d4{  Pilih Jenis Layanan}
    Input_Keluhan_8ab665ec --> Upload_Foto_Before_69f9d045[Upload Foto Before]
    Buat_Member_Otomatis_3a09c47f --> Pilih_Jenis_Layanan_89a496d4
    Upload_Foto_Before_69f9d045 --> Registrasi_Otomatis_a301eec0
    Pilih_Jenis_Layanan_89a496d4 --> Pilih_Poli_2db68f22[Pilih Poli]
    Registrasi_Otomatis_a301eec0 --> Nomor_Antrian_Otomat_20b22a75[Nomor Antrian Otomatis]
    Pilih_Poli_2db68f22 --> Input_Rekam_Medis_f9dd8e8c[Input Rekam Medis]
    Input_Rekam_Medis_f9dd8e8c --> Resep_Obat_278037c3[Resep Obat]
    Nomor_Antrian_Otomat_20b22a75 --> Notifikasi_WhatsApp_30a00214[Notifikasi WhatsApp]
    Resep_Obat_278037c3 --> Perlu_Obat_3a2c4118{Perlu Obat ?}
    Perlu_Obat_3a2c4118 -->|Iya| Farmasi_b3af6a83[Farmasi]
    Perlu_Obat_3a2c4118 -->|Tidak| Pasien_Kembali_Front_07060573[Pasien Kembali Front]
    Farmasi_b3af6a83 --> Pasien_Kembali_Front_07060573
    Pasien_Kembali_Front_07060573 --> Pembayaran_c909d2cd[Pembayaran]
    Pembayaran_c909d2cd --> Selesai_ea09b908[Selesai]
classDef style0 stroke:#C3CFD9,fill:#FFFFFF
class Booking_Online_c04cc59c,Buat_Member_Otomatis_3a09c47f,Buat_Member_Otomatis_ca16f9d9,Cari_Nomor_RME_fa14a24d,Cek_Rekam_Medis_6cf3411b,Estimasi_Jam_Realtim_a1b32076,Farmasi_b3af6a83,Input_Keluhan_8ab665ec,Input_Rekam_Medis_f9dd8e8c,Isi_Data_Pasien_OCR_d6f1f7db,Menunggu_Dipanggil_24c53efe,Nomor_Antrian_Otomat_20b22a75,Nomor_Antrian_Otomat_e21aafa8,Notifikasi_WhatsApp_30a00214,Pasien_37121384,Pasien_Baru_Lama_2afb9251,Pasien_Datang_Klinik_29274eb7,Pasien_Kembali_Front_07060573,Pembayaran_c909d2cd,Pendaftaran_Langsung_ff4eb910,Perlu_Obat_3a2c4118,Pernah_Berobat_449aaeca,Pilih_Dokter_48c74585,Pilih_Jenis_Layanan_89a496d4,Pilih_Jenis_Layanan_90216235,Pilih_Poli_2db68f22,Pilih_Poli_bbd26c59,Pilih_Tanggal_Jam_dfa20c27,Registrasi_Otomatis_a301eec0,Resep_Obat_278037c3,Scan_Member_19bc26df,Selesai_ea09b908,Upload_Foto_Before_69f9d045,Upload_KTP_197b5bc3,Verifikasi_KTP_14d889a9 style0
linkStyle 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37 stroke:#788896
```