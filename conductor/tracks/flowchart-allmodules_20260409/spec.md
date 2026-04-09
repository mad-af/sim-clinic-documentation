# Specification - Create Flowchart Diagrams for All SIM Klinik Modules

## 1. Overview

Create comprehensive Mermaid flowchart diagrams documenting the workflows for all modules in the SIM Klinik system.

## 2. Modules to Document

### 2.1 Front Office Module
- [ ] Klinik Umum flowchart
- [ ] Klinik Gigi flowchart
- [ ] Klinik Kecantikan flowchart

### 2.2 Finance Module
- [ ] Tagihan Pasien flowchart
- [ ] Layanan Medis dan Tindakan flowchart
- [ ] Payroll Staff dan Dokter flowchart
- [ ] Pemasukan dan Pengeluaran Klinik flowchart

### 2.3 HR Module
- [ ] Manajemen Staff dan Dokter flowchart
- [ ] Absensi Staff dan Dokter flowchart
- [ ] Pengaturan Shift Staff dan Dokter flowchart

## 3. Diagram Standards

### 3.1 Format
- Mermaid flowchart syntax
- UTF-8 encoding
- Location: `Diagram/[module-name]/[name].mmd`

### 3.2 Naming Convention
- Files: kebab-case (e.g., `klinik-umum.mmd`)
- Node IDs: PascalCase (e.g., `KlinikUmum`)
- Labels: Bahasa Indonesia

### 3.3 Quality Requirements
- Every flowchart has Start and End nodes
- All decision points have Yes/No branches
- All branches converge to a final node
- Use warm colors per Product Guidelines

## 4. Deliverables

- All `.mmd` files in appropriate `Diagram/` subdirectories
- HTML viewer ready (index.html + server.js already exist)