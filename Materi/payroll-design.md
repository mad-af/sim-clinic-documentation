# Payroll — 3 Pages Design

## Overview

| Page | Route | Purpose |
|------|-------|---------|
| Gaji Staff | `/payroll/gaji-staff` | List monthly salary for staff (Perawat, Admin, CS, Farmasi) |
| Gaji Dokter | `/payroll/gaji-dokter` | List monthly salary for doctors |
| Slip Gaji | `/payroll/slip-gaji` | View & print salary slips |

---

## 1. Gaji Staff

### Filter Bar
| Field | Type | Default |
|-------|------|---------|
| Bulan | Select (Jan–Des) | Current month |
| Tahun | Select | Current year |

### Table Columns
| Column | Type | Notes |
|--------|------|-------|
| No | Auto | Row number |
| Nama | Text | Staff name |
| Jabatan | Badge | Perawat / Admin / CS / Farmasi |
| Gaji Pokok | Currency (Rp) | Base salary |
| Tunjangan | Currency (Rp) | Makan + Transport combined |
| Bonus | Currency (Rp) | Insentif (nullable/0 if none) |
| Total Potongan | Currency (Rp) | PPh21 + BPJS shown as one total |
| Gaji Bersih | Currency (Rp, bold) | Calculated: (Gaji + Tunjangan + Bonus) - Potongan |
| Aksi | Button | [Cetak Slip] → opens Slip Gaji for that employee |

### Summary Row (Footer)
| Gaji Pokok | Tunjangan | Bonus | Total Potongan | Gaji Bersih |
|------------|-----------|-------|----------------|-------------|

---

## 2. Gaji Dokter

### Filter Bar
| Field | Type | Default |
|-------|------|---------|
| Bulan | Select (Jan–Des) | Current month |
| Tahun | Select | Current year |

### Table Columns
| Column | Type | Notes |
|--------|------|-------|
| No | Auto | Row number |
| Nama | Text | Doctor name |
| SIP | Text | SIP number |
| Gaji Pokok | Currency (Rp) | Base salary |
| Tunjangan | Currency (Rp) | Fixed allowance |
| % Bagi Hasil | Percentage | Config value (e.g., 70%) |
| Total Pendapatan | Currency (Rp) | Gaji + Tunjangan + (Invoice × %) |
| Total Potongan | Currency (Rp) | PPh21 + BPJS shown as one total |
| Gaji Bersih | Currency (Rp, bold) | Calculated: Total Pendapatan - Potongan |
| Aksi | Button | [Cetak Slip] → opens Slip Gaji for that employee |

### Summary Row (Footer)
| Gaji Pokok | Tunjangan | Total Pendapatan | Total Potongan | Gaji Bersih |
|------------|-----------|------------------|----------------|-------------|

---

## 3. Slip Gaji

### Filter Bar
| Field | Type | Default |
|-------|------|---------|
| Bulan | Select (Jan–Des) | Current month |
| Tahun | Select | Current year |
| Tipe | Select | Semua / Staff / Dokter |

### Table Columns
| Column | Type | Notes |
|--------|------|-------|
| No | Auto | Row number |
| Nama | Text | Employee name |
| Tipe | Badge | Staff / Dokter |
| Jabatan / Profesi | Text | Staff position or doctor specialization |
| Gaji Bersih | Currency (Rp) | Net salary |
| Aksi | Button | [Lihat Slip] → opens printable view |

### On "Lihat Slip" — Printable Slip Content

**Header:**
```
SLIP GAJI
Bulan: [Nama Bulan] [Tahun]
PT. Klinik Bening
```

**Body:**
```
NAMA          : [Nama]
JABATAN/PROFESI: [Jabatan/Profesi]
TYPE          : Staff / Dokter
------------------------------------------
PENDAPATAN
  Gaji Pokok       : Rp [xxxx]
  Tunjangan        : Rp [xxxx]
  Bonus/Insentif   : Rp [xxxx]  (if applicable)
  Bagi Hasil       : Rp [xxxx]  (dokter only)
  ----------------------------------------
  TOTAL PENDAPATAN : Rp [xxxx]
------------------------------------------
POTONGAN
  PPh 21           : Rp [xxxx]
  BPJS Kesehatan    : Rp [xxxx]
  BPJS Ketenagakerjaan: Rp [xxxx]
  ----------------------------------------
  TOTAL POTONGAN   : Rp [xxxx]
------------------------------------------
GAJI BERSIH          : Rp [xxxx]
```

**Footer:**
```
Dicetak pada: [datetime]
Tanda tangan manager: ____________
```

---

## Component Notes

### Currency Display
- Format: Rp 1.000.000
- Right-aligned in table cells
- Bold for Gaji Bersih row

### Badge Colors (Jabatan)
| Jabatan | Color |
|---------|-------|
| Perawat | Blue |
| Admin | Gray |
| CS | Green |
| Farmasi | Purple |
| Dokter | Red |

### Badge Colors (Tipe)
| Tipe | Color |
|------|-------|
| Staff | Blue |
| Dokter | Red |

### Print Behavior
- Opens in new tab/window
- Uses print-friendly CSS (white background, black text)
- Auto-triggers browser print dialog on open

---

## Related Diagrams
- `Diagram/01-finance/payroll-staff-dan-dokter.mmd`
