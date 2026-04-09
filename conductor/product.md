# Product Guide - SIM Klinik Documentation

## 1. Concept & Vision

Dokumentasi sistem SIM Klinik (Sistem Informasi Manajemen Klinik) untuk Klinik Bening yang menyediakan analisis kebutuhan, spesifikasi workflow, dan flowchart diagram untuk tiga jenis layanan: Klinik Umum, Klinik Gigi, dan Klinik Kecantikan.

## 2. Target Users

- **Staff Klinik**: Administrasi, perawat, dan dokter
- **Pasien**: Pengunjung klinik
- **Manajemen**: Pemilik atau manajer klinik

## 3. Key Modules

| Module | Description |
|--------|-------------|
| Front Office | Alur pendaftaran dan antrian pasien |
| Rekam Medis | Pencatatan rekam medis elektronik (EMR) |
| Kasir & Tagihan | Proses pembayaran dan tagihan |
| HR & Payroll | Manajemen staff, jadwal shift, dan payroll |

## 4. Clinic Types

| Type | Key Characteristics |
|------|---------------------|
| Klinik Umum | Direct poly selection, no prior consultation |
| Klinik Gigi | Mandatory consultation first, odontogram (32-tooth mapping) |
| Klinik Kecantikan | Mandatory consultation first, member system, before/after photos |

## 5. Key Business Rules

1. Queue numbers auto-generated on patient registration; online and walk-in queues must sync
2. Inventory decreases **only** when medication is handed over (not on prescription)
3. Doctor fee split is per-invoice (configurable %, e.g., 70% doctor / 30% clinic)
4. SIP/STR expiry alerts trigger **3 months before** expiration
5. WhatsApp integration for appointment reminders and receipts

## 6. Deliverables

Primary output: **Flowchart Diagram** - Mermaid-format diagrams in `Diagram/[module-name]/` directories