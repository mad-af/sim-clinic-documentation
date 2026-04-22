# AGENTS.md — SIM Klinik (System Analyst)

## Role

Fokus pada **analisis sistem** dan **pembuatan flowchart diagram** untuk dokumentasi klinik. Tidak menulis kode aplikasi.

## Repo Purpose

Repositori dokumentasi **System Analyst** untuk sistem manajemen klinik (SIM Klinik) Klinik Bening. Berisi analisis kebutuhan, spesifikasi workflow, diagram alur, dan desain UI — **bukan kode aplikasi**.

## Workflow

1. Baca `Materi/*.txt/*.md` untuk memahami modul yang akan di-diagram
2. Buat flowchart dalam format **Mermaid** (`.mmd`) di `Diagram/[module-name]/`
3. Update `index.html` jika menambah diagram baru
4. Update AGENTS.md ini jika ada konvensi baru

## Directory Structure

```
Klinik App/
├── Materi/                        # Specs, meeting notes, UI designs
├── Diagram/                       # Mermaid flowcharts (.mmd)
│   ├── 00-front-office/
│   ├── 01-finance/
│   ├── 02-hr/
│   ├── 03-farmasi/
│   └── 04-penunjang/
├── conductor/                     # Track planning system
├── index.html                    # Mermaid diagram viewer (port 3000)
├── server.js                     # Static server + /api/diagrams
├── sidebar.json                  # Sidebar navigation config
├── sidebar.html                  # Sidebar component preview
└── AGENTS.md
```

## Sidebar Navigation

- Config: `sidebar.json` (data-driven, satu source of truth)
- Preview: `sidebar.html` (serve via `node server.js`)
- Structure: Group → Menu → Sub-Menu
- Filtering: menu dengan `clinicType: ["gigi"]` atau `["kecantikan"]` conditionally visible
- Role separation: Cuti, Lembur, Reimbursement punya sub-menu untuk Employee vs Manager/HR

## Three Clinic Types

| Type | Key Behavior |
|------|-------------|
| **Klinik Umum** | Direct poly selection, no prior consultation |
| **Klinik Gigi** | Mandatory consultation first, odontogram (32-tooth mapping) |
| **Klinik Kecantikan** | Mandatory consultation first, member system, before/after photos |

## Key Business Rules

1. Queue numbers auto-generated on patient registration; online and walk-in queues must sync
2. Inventory decreases **only** when medication is handed over (not on prescription)
3. Doctor fee split is per-invoice (configurable %, e.g., 70% doctor / 30% clinic)
4. SIP/STR expiry alerts trigger **3 months before** expiration
5. WhatsApp integration for appointment reminders and receipts

## Payroll Components

### Staff (Perawat, Admin, CS)
- **Pendapatan:** Gaji Pokok + Tunjangan (Makan, Transport) + Bonus/Insentif
- **Potongan:** PPh 21 (TER), BPJS Kesehatan (5%), BPJS Ketenagakerjaan (JHT, JP, JKK, JKM, JKP)

### Dokter
- **Pendapatan:** Gaji Pokok + Tunjangan + **Bagi Hasil (% per invoice × total invoice)**
- **Potongan:** PPh 21 (TER), BPJS Kesehatan, BPJS Ketenagakerjaan

## Modules & Design Files

| Module | Status | Diagram Files | UI Design Files |
|--------|--------|---------------|-----------------|
| Front Office | ✅ | klinik-umum, klinik-gigi, klinik-kecantikan | — |
| Kasir & Tagihan | ✅ | tagihan-pasien | — |
| Layanan Medis | ✅ | layanan-medis-dan-tindakan | — |
| Payroll | ✅ | payroll-staff-dan-dokter | `Materi/payroll-*.html`, `layanan-medis-*.html` |
| Pemasukan & Pengeluaran | ✅ | pemasukan-dan-pengeluaran-klinik | — |
| HR | ✅ | manajemen, absensi, shift, izin-cuti-lembur, reimbursement | — |
| Farmasi | ✅ | stok-obat, peresepan, obat-racikan, pengadaan, stok-opname | — |
| Penunjang (Lab/Rad) | ✅ | lab-dan-radiologi | — |
| Dashboard | Pending | — | — |
| Rekam Medis (EMR) | Pending | — | — |
| Hak Akses | Pending | — | — |

## Payroll UI Designs (Materi/)

| File | Purpose |
|------|---------|
| `payroll-gaji-staff.html` | List Gaji Staff (filter: Bulan, Tahun) |
| `payroll-gaji-staff-create.html` | Form: Staff + Gaji/Tunjangan/Bonus + Potongan |
| `payroll-gaji-staff-detail.html` | Detail: Full breakdown + Edit + Cetak Slip |
| `payroll-gaji-dokter.html` | List Gaji Dokter (filter: Bulan, Tahun) |
| `payroll-gaji-dokter-create.html` | Form: Dokter + Gaji + % Bagi Hasil + Total Invoice |
| `payroll-gaji-dokter-detail.html` | Detail: Gaji + Tunjangan + **Bagi Hasil** breakdown + Gaji Bersih |
| `payroll-slip-gaji.html` | Slip Gaji list (combined: Staff + Dokter) |
| `payroll-slip-gaji-detail.html` | Printable slip dengan full detail |
| `payroll-slip-preview.html` | Slip preview (alternative) |

## Change Log

| Date | Description |
|------|-------------|
| 2026-04-02 | Initial AGENTS.md |
| 2026-04-05 | Compacted — removed speculative content |
| 2026-04-05 | Role redefined as System Analyst focus |
| 2026-04-13 | Farmasi & Penunjang diagrams complete; HR updated; directory corrected |
| 2026-04-13 | Added sidebar.json and sidebar.html |
| 2026-04-14 | Simplified sidebar (Farmasi: 2 menus, Penunjang: 1 menu); SDM split (Manajemen Staff/Dokter separate, Cuti/Lembur/Reimbursement with intent sub-menus); payroll UI designs added |
| 2026-04-14 | Added: layanan-medis-list.html and layanan-medis-detail.html (billing pool with editable items) |
