# Front Office Flowchart - Klinik Umum

```mermaid
flowchart TD
    Start([Pasien]) --> EntryPoint{Pilih Jalur?}
    EntryPoint{Pilih Jalur?} -->|Langsung| A1
    EntryPoint{Pilih Jalur?} -->|Online| B1
    
    %% ==================== PENDAFTARAN LANGSUNG ====================
    subgraph Pendaftaran_Langsung["A. PENDAFTARAN LANGSUNG (Walk-In)"]
        A1["Pasien Datang ke Klinik"] --> A2["Dapat Nomor Antrian Otomatis"]
        A2 --> A3["Estimasi Jam Realtime"]
        A3 -.->|"📋 30 menit/pasien<br/>Layar: Klinik"| EstimasiWalkin
        A3 --> A4["Tampilkan di Layar Antrian"]
        A4 --> A5["Menunggu Dipanggil Front Liner"]
        A5 --> A6["Pilih Poli"]
        A6 --> A7{"Baru atau Lama?"}
        
        A7 -->|Baru| A8["Verifikasi KTP"]
        A7 -->|Lama| A9["Scan Nomor RM"]
        
        A8 --> A8a["Scan/Foto KTP"]
        A8a --> A8b["Auto-Fill: Nama, Alamat, NIK, Tgl Lahir"]
        A8b --> A10["Lengkapi Data (Pekerjaan, Telepon)"]
        A10 --> A11["Input Keluhan"]
        A11 --> A12["Registrasi Pasien Baru"]
        A12 --> A18["Masuk Antrian Dokter"]
        
        A9 --> A13["Cek Data Pasien"]
        A13 --> A14{"Pasien Ditemukan?"}
        A14 -->|Tidak| A8["Verifikasi KTP"]
        A14 -->|Ya| A16["Input Keluhan"]
        A16 --> A17["Buat Kunjungan Baru"]
        A17 --> A18["Masuk Antrian Dokter"]
        
        A18 --> WaitingRoom
    end
    
    %% ==================== BOOKING ONLINE ====================
    subgraph Booking_Online["B. BOOKING ONLINE"]
        B1["Buka Link / Scan QR Code"] --> B2["Pilih Poli"]
        B2 --> B3["Pilih Dokter"]
        B3 --> B4["Pilih Tanggal & Jam"]
        B4 --> B5{"Pernah Berobat?"}
        
        B5 -->|Ya| B6["Input Nomor RM"]
        B6 --> B7["Cek Data Pasien"]
        B7 --> B8{"Data Valid?"}
        B8 -->|Tidak| B9["Registrasi Ulang"]
        B8 -->|Ya| B10a["Input Keluhan"]
        
        B5 -->|Tidak| B11["Upload KTP"]
        B11 --> B11a["OCR Auto-Fill: Nama, Alamat, NIK, Tgl Lahir"]
        B11a --> B12["Lengkapi Data (Pekerjaan, Telepon)"]
        B12 --> B10b["Input Keluhan"]
        
        B9 --> B13["Verifikasi KTP"]
        B13 --> B13a["Upload KTP Ulang"] --> B13b["OCR Auto-Fill Ulang"] --> B12
        
        B10a --> B14a["Buat Kunjungan Baru"]
        B10b --> B14["Registrasi Pasien Baru"]
        B14a --> B15["Masuk Antrian Dokter"]
        B14 --> B15["Masuk Antrian Dokter"]
        B15 --> B16["WhatsApp: Kirim Pengingat"]
        B16 -.->|"📱 Pengingat"| KirimPengingat
        B16 --> B17["Konfirmasi Kedatangan"]
        B17 --> WaitingRoom
    end
    
    %% ==================== WAITING ROOM ====================
    subgraph WaitingRoom["C. RUANG TUNGGU"]
        WR1{"Antrian Dipanggil?"}
        WR1 -->|Ya| WR2["Pasien Masuk Ruang Dokter"]
        WR1 -->|Belum| WR3["Tunggu & Lihat Estimasi"]
        WR3 --> WR1
        
        WR2 --> DoctorRoom
    end
    
    %% ==================== RUANG DOKTER ====================
    subgraph DoctorRoom["D. RUANG DOKTER"]
        D1["Dokter Input SOAP"] --> D2{"Resep Obat?"}
        D2 -->|Ya| D3["Input Resep → Farmasi"]
        D2 -->|Tidak| D4["Pasien Kembali ke Front Liner"]
        
        D3 --> D5{"Pasien Perlu Obat?"}
        D5 -->|Ya| D6["Ambil Obat di Farmasi"]
        D6 --> D7["Stok Deduction"]
        D7 --> D8["Serahkan Obat"]
        D8 --> D4
        
        D5 -->|Tidak| D4
    end
    
    %% ==================== FRONT LINER ====================
    subgraph FrontLiner["E. FRONT LINER"]
        FL1["Jelaskan Hasil Pemeriksaan"] --> FL2["Ke Kasir"]
        FL2 --> Payment
    end
    
    %% ==================== KASIR ====================
    subgraph Payment["F. PEMBAYARAN"]
        P1["Kasir Tampilkan Rincian"] --> P2{"Metode Bayar?"}
        P2 -->|Tunai| P3["Bayar Tunai"]
        P2 -->|QRIS| P4["Scan QRIS"]
        P2 -->|Transfer| P5["Upload Bukti Transfer"]
        
        P3 --> P6["Cetak Struk"]
        P4 --> P6
        P5 --> P6
        P6 --> P7["WhatsApp: Kirim Struk"]
        P7 --> End
    end
    
    End([Selesai])
    
    %% ==================== ESTIMASI ANNOTATIONS ====================
    subgraph EstimasiWalkin["📋 Estimasi Jam Realtime - Walk-In"]
        EW1["📊 Kalkulasi: Sekarang + (Posisi × 30 menit)"]
        EW2["📺 Tampilan: Layar monitor di ruang tunggu"]
        EW3["📱 Update: Realtime setiap giliran berubah"]
    end
    
    subgraph EstimasiOnline["📋 Estimasi Jam Realtime - Online"]
        EO1["📊 Kalkulasi: Sekarang + (Posisi × 30 menit)"]
        EO2["📱 Tampilan: WhatsApp notification"]
        EO3["⏰ Trigger: Saat booking + H-1 + 2 jam sebelum"]
    end
    
    subgraph KirimPengingat["📱 Kirim Pengingat - Isi WhatsApp"]
        KP1["📋 Isi Pesan:"]
        KP2["  • Tanggal & jam booking"]
        KP3["  • Nama dokter & poli"]
        KP4["  • Nomor antrian"]
        KP5["  • Permintaan konfirmasi kehadiran"]
        KP6["⏰ Kirim saat: Dapat nomor antrian"]
    end
    
    %% ==================== STYLES ====================
    style Start fill:#E8F5E9,stroke:#4CAF50
    style End fill:#FFEBEE,stroke:#F44336
    style WaitingRoom fill:#E3F2FD,stroke:#2196F3
    style DoctorRoom fill:#FFF3E0,stroke:#FF9800
    style FrontLiner fill:#F3E5F5,stroke:#9C27B0
    style Payment fill:#ECEFF1,stroke:#607D8B
    style Pendaftaran_Langsung fill:#E8F5E9,stroke:#4CAF50
    style Booking_Online fill:#E3F2FD,stroke:#2196F3
    style EstimasiWalkin fill:#FFF9C4,stroke:#FBC02D
    style EstimasiOnline fill:#FFF9C4,stroke:#FBC02D
    style KirimPengingat fill:#FFF9C4,stroke:#FBC02D
```

---

## Legend

### Flow Symbols (Mermaid)

| Symbol | Syntax | Meaning |
|--------|--------|---------|
| `([Shape])` | `([Node])` | Rounded rectangle = Start/End point |
| `[Shape]` | `[Node]` | Rectangle = Process/Action |
| `{Shape}` | `{Node}` | Diamond = Decision point |
| `-->\|Label\|` | `-->\|Yes\|` | Arrow with condition label |
| `-.->` | `-.->"annotation"` | Dotted arrow = Annotation/Note |
| `subgraph` | `subgraph NAME["Title"]` | Group of related nodes |

### Color Coding

| Color | Hex | Module |
|-------|-----|--------|
| 🟢 Hijau | `#E8F5E9` | A. Pendaftaran Langsung (Walk-In) |
| 🔵 Biru | `#E3F2FD` | B. Booking Online |
| 🔵 Biru | `#E3F2FD` | C. Ruang Tunggu |
| 🟠 Orange | `#FFF3E0` | D. Ruang Dokter |
| 🟣 Ungu | `#F3E5F5` | E. Front Liner |
| ⬜ Abu | `#ECEFF1` | F. Pembayaran |
| 🟡 Kuning | `#FFF9C4` | Annotations (Estimasi, WhatsApp) |

### Main Paths

| Path | Description |
|------|-------------|
| **A. Pendaftaran Langsung** | Walk-in: Pasien datang → Langsung dapat nomor antrian |
| **B. Booking Online** | Online: Booking via link/QR yang disediakan klinik |
| **C. Ruang Tunggu** | Pasien menunggu dipanggil dokter |
| **D. Ruang Dokter** | Pemeriksaan (SOAP) & Resep |
| **E. Front Liner** | Penjelasan hasil pemeriksaan ke pasien |
| **F. Pembayaran** | Kasir: Tunai, QRIS, atau Transfer |

### Decision Points

| Decision | Options |
|----------|---------|
| `Pilih Jalur?` | Langsung / Online |
| `Baru atau Lama?` | Baru / Lama |
| `Rekam Medis Ditemukan?` | Ya / Tidak |
| `Pernah Berobat?` | Ya / Tidak |
| `Data Valid?` | Ya / Tidak |
| `Antrian Dipanggil?` | Ya / Belum |
| `Resep Obat?` | Ya / Tidak |
| `Pasien Perlu Obat?` | Ya / Tidak |
| `Metode Bayar?` | Tunai / QRIS / Transfer |

### Annotations

| Annotation | Meaning |
|------------|---------|
| `📋 30 menit/pasien` | Estimasi waktu per pasien |
| `📺 Layar: Klinik` | Display di monitor ruang tunggu |
| `📱 WA: Kirim Estimasi` | Kirim via WhatsApp |
| `📊 Kalkulasi` | Cara hitung estimasi |
| `⏰ Trigger` | Kapan notifikasi dikirim |

---

## Estimasi Jam Realtime

### Apa Itu Estimasi Jam?
Perkiraan waktu kapan giliran pasien akan dipanggil, berdasarkan posisi antrian dan estimasi waktu per pasien.

### Cara Kalkulasi
```
Estimasi = Waktu Sekarang + (Posisi dalam Antrian × 30 menit/pasien)
```

**Contoh:**
```
Jam Sekarang: 09:00
Nomor Sedang Diproses: #5
Posisi Pasien #8: #8 - #5 = 3 orang
Estimasi: 09:00 + (3 × 30 menit) = 09:30 - 10:00
```

### Dua Metode Estimasi

| Metode | Pendaftaran Langsung (Walk-In) | Booking Online |
|--------|--------------------------------|----------------|
| **Tampilan** | 📺 Layar monitor di ruang tunggu klinik | 📱 WhatsApp notification |
| **Update** | Realtime setiap nomor dipanggil | Saat booking + H-1 + 2 jam sebelum |
| **Trigger** | Otomatis saat antrian bergerak | Sistem reminder otomatis |

### Spesifikasi Teknis
- **Waktu per pasien:** 30 menit (bisa dikonfigurasi per poli)
- **Update trigger:** Setiap pasien dipanggil atau selesai
- **Display:** Compatible dengan TV monitor biasa (HDMI)

---

## Key Differences: Langsung vs Online

| Aspek | Pendaftaran Langsung | Booking Online |
|-------|----------------------|----------------|
| **QR Code** | ❌ Tidak ada | ✅ Link booking dijadikan QR |
| **Nomor Antrian** | Langsung saat datang | Setelah booking confirmed |
| **Baru/Lama Check** | Saat dipanggil front liner | Saat booking |
| **Estimasi Jam** | Realtime berdasarkan antrian | Dikirim via WhatsApp |

---

## WhatsApp Notification Triggers
- **📱 Kirim Pengingat:** Setelah dapat nomor antrian, minta konfirmasi kehadiran (B16)
- **✅ Konfirmasi Kedatangan:** Saat pasien scan/cek in di klinik (B17)
- **📅 H-1:** Reminder
- **🔔 2 Jam Sebelum:** Pengingat
- **📋 Giliran Mendekat:** Notifikasi
- **🧾 Setelah Bayar:** Struk

---

## Status Tracking

| Status | Description |
|--------|-------------|
| `walk_in` | Pasien datang, dapat nomor antrian |
| `waiting` | Di ruang tunggu |
| `called` | Dipanggil front liner |
| `registered` | Baru saja registrasi |
| `at_doctor` | Sedang diperiksa dokter |
| `pharmacy` | Ambil obat di farmasi |
| `billing` | Di kasir |
| `completed` | Selesai |

---

## Document Info

| Attribute | Value |
|-----------|-------|
| Module | Front Office |
| Clinic Type | Klinik Umum |
| Focus | Rawat Jalan |
| Version | 1.2 |
| Last Updated | 2026-04-02 |
