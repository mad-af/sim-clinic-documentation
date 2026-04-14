# AGENTS.md — SIM Klinik (System Analyst)

## Role

Fokus pada **analisis sistem** dan **pembuatan flowchart diagram** untuk dokumentasi klinik. Tidak menulis kode aplikasi.

## Repo Purpose

Repositori dokumentasi **System Analyst** untuk sistem manajemen klinik (SIM Klinik) Klinik Bening. Berisi analisis kebutuhan, spesifikasi workflow, dan diagram alur — **bukan kode aplikasi**.

## Workflow

1. Baca `Materi/*.txt/*.md` untuk memahami modul yang akan di-diagram
2. Buat flowchart dalam format **Mermaid** (`.mmd`) di `Diagram/[module-name]/`
3. Update `index.html` jika menambah diagram baru
4. Update AGENTS.md ini jika ada konvensi baru

## Directory Structure

```
Klinik App/
├── Materi/                        # Specs & meeting notes
├── Diagram/
│   ├── 00-front-office/           # Klinik umum, gigi, kecantikan
│   ├── 01-finance/                # Tagihan, layanan medis, payroll, pemasukan
│   ├── 02-hr/                     # Staff management, absensi, shift, izin cuti, reimbursement
│   ├── 03-farmasi/                # Stok obat, peresepan, obat racikan, pengadaan
│   └── 04-penunjang/              # Lab dan radiologi
├── conductor/                      # Track planning system (spec.md, plan.md per track)
├── index.html                     # Mermaid diagram viewer (port 3000)
├── server.js                      # Static server with /api/diagrams endpoint
├── sidebar.json                    # Sidebar navigation config (data-driven)
├── sidebar.html                   # Sidebar component preview
└── AGENTS.md
```

## Diagram Convention

- Format: **Mermaid flowchart** dengan ekstensi `.mmd`
- Encoding: UTF-8
- Location: `Diagram/[module-name]/[nama-alur].mmd`
- Style: Gunakan `subgraph` untuk area/stage, `style` untuk coloring
- Bahasa: Indonesia untuk label node

## Sidebar Navigation

- Config: `sidebar.json` (data-driven, satu source of truth)
- Component preview: `sidebar.html`
- Struktur: Group → Menu → Sub-Menu
- Semua 18 diagram (.mmd) sudah dipetakan ke struktur sidebar

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
- **Pendapatan:** Gaji Pokok + Tunjangan + **Bagi Hasil (% per invoice)**
- **Potongan:** PPh 21 (TER), BPJS Kesehatan, BPJS Ketenagakerjaan

## Modules

| Module | Status | Files |
|--------|--------|-------|
| Front Office | ✅ | klinik-umum, klinik-gigi, klinik-kecantikan |
| Kasir & Tagihan | ✅ | tagihan-pasien |
| Layanan Medis & Tindakan | ✅ | layanan-medis-dan-tindakan |
| Payroll | ✅ | payroll-staff-dan-dokter |
| Pemasukan & Pengeluaran | ✅ | pemasukan-dan-pengeluaran-klinik |
| HR | ✅ | manajemen, absensi, shift, izin-cuti-lembur, reimbursement |
| Farmasi | ✅ | stok-obat, peresepan, obat-racikan, pengadaan, stok-opname |
| Penunjang (Lab/Rad) | ✅ | lab-dan-radiologi |
| Dashboard | Pending | — |
| Rekam Medis (EMR) | Pending | — |
| Hak Akses | Pending | — |

## Change Log

| Date | Description |
|------|-------------|
| 2026-04-02 | Initial AGENTS.md |
| 2026-04-05 | Compacted — removed speculative content |
| 2026-04-05 | Role redefined as System Analyst focus |
| 2026-04-13 | Updated: Farmasi & Penunjang diagrams now complete; HR updated; directory structure corrected |
| 2026-04-13 | Added: sidebar.json (navigation config) and sidebar.html (component preview) |
