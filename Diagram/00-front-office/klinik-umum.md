# Front Office Flowchart - Klinik Umum

```mermaid
flowchart TD
    Start([Pasien]) --> EntryPoint{Pilih Jalur}
    
    %% ==================== PENDAFTARAN LANGSUNG ====================
    subgraph Pendaftaran_Langsung["A. PENDAFTARAN LANGSUNG"]
        A1["Pasien Datang ke Klinik"] --> A2["Scan QR Code"]
        A2 --> A3{"Jenis Kunjungan?"}
        A3 -->|Baru| A4["Verifikasi KTP oleh Petugas"]
        A3 -->|Lama| A5["Scan Member Pasien"]
        
        A4 --> A6["Isi Form Digital"]
        A6 --> A7["Input Keluhan"]
        A7 --> A8["Upload Foto Before"]
        
        A5 --> A9["Cek Rekam Medis Otomatis"]
        A9 --> A10{"Rekam Medis Ditemukan?"}
        A10 -->|Tidak| A11["Verifikasi KTP"]
        A11 --> A6
        A10 -->|Ya| A12["Tampilkan Data Pasien"]
        
        A8 --> A13["Buat Member & RM Otomatis"]
        A12 --> A13
        A13 --> A14["Nomor Antrian Otomatis"]
        A14 --> A15["Estimasi Jam Realtime"]
        
        A15 --> A16["Tampilkan di Layar Antrian"]
        A16 --> A17["WhatsApp: Konfirmasi & Estimasi"]
        A17 --> WaitingRoom
    end
    
    %% ==================== BOOKING ONLINE ====================
    subgraph Booking_Online["B. BOOKING ONLINE"]
        B1["Buka Link/QR Code"] --> B2["Pilih Jenis Layanan"]
        B2 --> B3["Pilih Poli"]
        B3 --> B4["Pilih Dokter"]
        B4 --> B5["Pilih Tanggal & Jam"]
        B5 --> B6{"Pernah Berobat?"}
        
        B6 -->|Ya| B7["Input Nomor RM"]
        B7 --> B8["Cek Data Pasien"]
        B8 --> B9{"Data Valid?"}
        B9 -->|Tidak| B10["Registrasi Ulang"]
        B9 -->|Ya| B11["Input Keluhan & Foto Before"]
        
        B6 -->|Tidak| B12["Upload KTP"]
        B12 --> B13["Input Data Diri"]
        B13 --> B11
        
        B10 --> B14["Verifikasi KTP"]
        B14 --> B13
        
        B11 --> B15["Buat Member & RM Otomatis"]
        B15 --> B16["Nomor Antrian Otomatis"]
        B16 --> B17["WhatsApp: Konfirmasi & Estimasi"]
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
        D1["Dokter Input SOAP"]
        D1 --> D2["Resep Obat?"]
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
        FL1["Front Liner Jelaskan Hasil"]
        FL1 --> FL2["Ke Kasir"]
        FL2 --> Payment
    end
    
    %% ==================== KASIR ====================
    subgraph Payment["F. PEMBAYARAN"]
        P1["Kasir Tampilkan Rincian"]
        P1 --> P2{"Metode Bayar?"}
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
    
    %% ==================== WHATSAPP ANNOTATIONS ====================
    style Start fill:#E8F5E9,stroke:#4CAF50
    style End fill:#FFEBEE,stroke:#F44336
    style WaitingRoom fill:#E3F2FD,stroke:#2196F3
    style DoctorRoom fill:#FFF3E0,stroke:#FF9800
    style FrontLiner fill:#F3E5F5,stroke:#9C27B0
    style Payment fill:#ECEFF1,stroke:#607D8B
    style Pendaftaran_Langsung fill:#E8F5E9,stroke:#4CAF50
    style Booking_Online fill:#E3F2FD,stroke:#2196F3
```

---

## Legend

| Symbol | Meaning |
|--------|---------|
| `-->|Label|` | Decision with condition |
| `---` | Default flow |
| Color Blocks | Different modules/sections |
| 📱 WhatsApp | Notification triggers |

### WhatsApp Notification Triggers
- **📅 Booking:** Konfirmasi & Estimasi
- **⏰ H-1:** Reminder
- **🔔 2 Jam Sebelum:** Pengingat
- **📋 Giliran Mendekat:** Notifikasi
- **🧾 Setelah Bayar:** Struk

---

## Key Flow Points

### A. Pendaftaran Langsung
1. Pasien datang → Scan QR
2. **Baru:** Verifikasi KTP → Form Digital → Keluhan → Foto → Auto Member
3. **Lama:** Scan Member → Auto-check EMR
4. Generate Queue # → Estimasi Jam → Display

### B. Booking Online
1. Buka Link → Pilih Layanan → Poli → Dokter → Jadwal
2. Check: Pernah berobat?
3. **Baru:** Upload KTP → Registrasi
4. **Lama:** Input RM → Validasi
5. Generate Queue # → WhatsApp Konfirmasi

### C-F. Waiting Room → Doctor → Front Liner → Kasir
- Patient waits with realtime estimate
- Called by doctor → Enter room
- SOAP input → Resep if needed
- Return to Front Liner for explanation
- Go to Kasir for payment
- Send receipt via WhatsApp

---

## Status Tracking

| Status | Description |
|--------|-------------|
| `registered` | Baru daftar, dapat queue number |
| `waiting` | Di ruang tunggu |
| `called` | Dipanggil dokter |
| `in_progress` | Sedang diperiksa |
| `pharmacy` | Ambil obat di farmasi |
| `billing` | Di kasir |
| `completed` | Selesai |

---

## Document Info

| Attribute | Value |
|-----------|-------|
| Module | Front Office |
| Clinic Type | Klinik Umum |
| Version | 1.0 |
| Last Updated | 2026-04-02 |
