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
├── Materi/
│   ├── note-meet.txt              # Catatan meeting
│   ├── task-deskripsi.txt        # Deskripsi tugas/alur patient
│   ├── usulan-module-docs.txt     # Spesifikasi modul lengkap
│   ├── front-office-gigi.md       # Spec front office klinik gigi
│   └── front-office-kecantikan.md # Spec front office klinik kecantikan
├── Diagram/
│   └── 00-front-office/          # Diagram flowchart front office
│       ├── klinik-umum.mmd       # Alur klinik umum
│       ├── klinik-gigi.mmd       # Alur klinik gigi
│       └── klinik-kecantikan.mmd  # Alur klinik kecantikan
├── index.html                     # Viewer diagram
├── server.js                      # Static server untuk index.html
└── AGENTS.md
```

## Diagram Convention

- Format: **Mermaid flowchart** dengan ekstensi `.mmd`
- Encoding: UTF-8
- Location: `Diagram/[module-name]/[nama-alur].mmd`
- Style: Gunakan `subgraph` untuk area/stage, `style` untuk coloring
- Bahasa: Indonesia untuk label node

## Three Clinic Types

| Type | Key Behavior |
|------|-------------|
| **Klinik Umum** | Direct poly selection, no prior consultation |
| **Klinik Gigi** | Mandatory consultation first, odontogram (32-tooth mapping) |
| **Klinik Kecantikan** | Mandatory consultation first, member system, before/after photos |

## Key Business Rules

1. Queue numbers auto-generated on patient registration; online and walk-in queues must sync
2. Inventory decreases **only** when medication is handed over (not on prescription)
3. Doctor fee split is per-invoice (e.g., 70% doctor / 30% clinic)
4. SIP/STR expiry alerts trigger **3 months before** expiration
5. WhatsApp integration for appointment reminders and receipts

## Modules (for future diagrams)

| Module | Status |
|--------|--------|
| Dashboard | Pending diagram |
| Front Office | ✅ Done (3 diagrams) |
| Rekam Medis (EMR) | Pending diagram |
| Kasir & Tagihan | ✅ Done (tagihan-pasien.mmd) |
| Farmasi | Pending diagram |
| Keuangan | Pending diagram |
| HR | Pending diagram |
| Penunjang (Lab/Rad) | Pending diagram |
| Hak Akses | Pending diagram |

## Change Log

| Date | Description |
|------|-------------|
| 2026-04-02 | Initial AGENTS.md |
| 2026-04-05 | Compacted — removed speculative content |
| 2026-04-05 | Role redefined as System Analyst focus |
