# Specification - Lab Workflow Diagram

## Overview

Create Mermaid flowchart for Lab/Radiologi module showing order entry, processing, and result reporting.

## Context

Lab can be:
- Partnership (external lab with checklist forms)
- In-house (own clinic lab)

## Flow

1. **Order Entry**: Dokter input order lab via SOAP → Plan (checklist available tests)
2. **Antrean**: Lab terima order, masuk antrean
3. **Proses**: 
   - Partnership: Checklist form dari lab partner
   - In-house: Input hasil + upload file
4. **Verifikasi**: Dokter verify hasil
5. **Output**: Cetak/Kirim hasil ke pasien

## Components

- Checklist jenis lab (darah, urine, dll)
- Upload hasil (file/gambar)
- Rujukan ke lab external jika perlu
- Integration dengan kasir (billing check)