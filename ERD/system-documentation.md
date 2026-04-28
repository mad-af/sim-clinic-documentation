# SIM Klinik - System Documentation

## Daftar Isi

1. [Pengenalan](#1-pengenalan)
2. [Arsitektur Entity Relationship](#2-arsitektur-entity-relationship)
3. [Database Separation: Landlord vs Tenant](#3-database-separation-landlord-vs-tenant)
4. [Q&A](#4-qa)

---

## 1. Pengenalan

### 1.1 Overview

SIM Klinik adalah sistem manajemen klinik berbasis **hybrid multi-tenant** yang mendukung operasional klinik secara menyeluruh. Sistem menggunakan arsitektur three-tier (User → Account → Clinic) dengan pemisahan data landlord (shared) dan tenant (per clinic).

### 1.2 Arsitektur Multi-Tenant

```
User (Personal)
    │
    ▼
Account (Bisnis) → memiliki banyak Clinic
    │
    ▼
Clinic (Tenant) → data operasional
```

| Entitas | Peran |
|---------|-------|
| **User** | Pengguna sistem (dokter, perawat, admin). Satu user dapat mengakses multiple accounts dan clinics. |
| **Account** | Entitas bisnis/organisasi yang menyewa sistem. Satu account dapat memiliki multiple clinics. |
| **Clinic** | Unit klinik individual. |

### 1.3 Hybrid Multi-Tenant Model

Sistem menggunakan model **hybrid** dengan dua strategi:

| Model | Deskripsi |
|-------|-----------|
| **Landlord** | Single database, dishare oleh semua tenant. Berisi data master dan konfigurasi. |
| **Tenant** | Multiple tenants per database. Tenant tables berfungsi sebagai **template** yang di-copy saat membuat tenant baru. |

**Mengapa hybrid?**

Database memiliki batasan koneksi simultan. Makin banyak koneksi aktif, makin berat beban server dan berpotensi downtime. Dengan memecah tenant ke database yang berbeda, beban koneksi didistribusikan sehingga sistem tetap stabil saat user load tinggi.

---

## 2. Arsitektur Entity Relationship

### 2.1 Core Module (Landlord)

| Tabel | Deskripsi |
|-------|-----------|
| `users` | Data utama user (autentikasi) |
| `user_profiles` | Detail tambahan user |
| `accounts` | Data utama account/organisasi |
| `account_profiles` | Detail tambahan (legal, tax, kontak) |
| `account_users` | Mapping user ke account dengan role |
| `clinics` | Data utama klinik (name, code, domain, database) |
| `clinic_profiles` | Detail klinik (category, timezone, koordinat) |
| `clinic_users` | Mapping user ke clinic dengan role |

### 2.2 Subscription & Billing Module (Landlord)

| Tabel | Deskripsi |
|-------|-----------|
| `plans` | Master paket langganan |
| `subscriptions` | Subscription aktif account ke plan |
| `extras` | Add-on yang dapat ditambahkan |
| `subscription_extras` | Extra yang aktif di subscription |
| `features` | Master fitur (limit/boolean/config) |
| `plan_features` | Fitur yang included dalam plan |
| `extra_features` | Fitur yang included dalam extra |
| `account_entitlements` | Effective feature value per account |
| `clinic_invoices` | Invoice subscription (billing ke account) |
| `clinic_invoice_items` | Item-item invoice subscription |
| `clinic_payments` | Record pembayaran subscription |

### 2.3 Media Module (Landlord)

| Tabel | Deskripsi |
|-------|-----------|
| `media` | Penyimpanan file terpusat (polymorphic, scope: account/clinic) |

### 2.4 Master Data Medis (Landlord)

| Tabel | Deskripsi |
|-------|-----------|
| `icd_codes` | Master kode ICD-10 dan ICD-9-CM |
| `kfa_templates` | Template obat KFA (kode 92xxxxxx) |
| `kfa_items` | Item obat dagang (kode 93xxxxxx) |
| `kfa_lookups` | Lookup units dan dosage forms |
| `kfa_drug_ingredients` | Zat aktif per obat |
| `observation_templates` | Template observasi vital (template untuk encounter_vitals) |

### 2.5 Search Module (Landlord)

| Tabel | Deskripsi |
|-------|-----------|
| `search_logs` | Log pencarian user |
| `search_aggregates` | Agregasi analytics pencarian |

### 2.6 Template Modules (Landlord)

| Tabel | Deskripsi |
|-------|-----------|
| `service_templates` | Template layanan (general/dental/aesthetic) |
| `position_templates` | Template posisi/jabatan (doctor, nurse, admin) |
| `specialty_templates` | Template spesialisasi |

### 2.7 Patient Domain (Tenant)

| Tabel | Deskripsi |
|-------|-----------|
| `patients` | Data utama pasien (MRN, nama, gender, birth_date) |
| `patient_profiles` | Detail tambahan (alamat, blood_type, marital_status) |
| `patient_contacts` | Kontak pasien (phone, email, whatsapp) |
| `patient_emergency_contacts` | Kontak darurat |
| `patient_identifiers` | Identifier lain (national_id, insurance, passport) |
| `patient_insurances` | Data asuransi pasien |
| `patient_allergies` | Riwayat alergi permanen pasien |
| `patient_medical_histories` | Riwayat medis permanen pasien |

### 2.8 Service Domain (Tenant)

| Tabel | Deskripsi |
|-------|-----------|
| `services` | Layanan klinik (derived dari service_templates) |
| `polyclinic_services` | Mapping service ke polyclinic |

### 2.9 Facility Domain (Tenant)

| Tabel | Deskripsi |
|-------|-----------|
| `polyclinics` | Poliklinik (kode, nama, deskripsi) |
| `rooms` | Ruangan (consultation/treatment, capacity) |
| `employee_polyclinics` | Mapping employee ke polyclinic |

### 2.10 Inventory Domain (Tenant)

| Tabel | Deskripsi |
|-------|-----------|
| `medical_items` | Item inventaris (drug, medical_supply, equipment) |
| `medical_stocks` | Stock item (quantity, min/max) |
| `medical_batches` | Batch barang (batch_number, expired_at, purchase_price) |
| `medical_movements` | Log pergerakan stock (purchase, usage, adjustment, expired) |

### 2.11 Staff Domain (Tenant)

| Tabel | Deskripsi |
|-------|-----------|
| `employees` | Data employee (linked ke landlord users) |
| `employee_profiles` | Detail employee (alamat, emergency contact) |
| `employee_positions` | Posisi/jabatan (derived dari position_templates) |
| `employee_position_assignments` | Assignment posisi ke employee |
| `specialties` | Specialisasi (derived dari specialty_templates) |
| `employee_specialties` | Mapping employee ke specialty |

### 2.12 Encounter Domain (Tenant)

| Tabel | Deskripsi |
|-------|-----------|
| `encounters` | Encounter/pemeriksaan (link ke patient_visit, polyclinic_session, doctor) |
| `encounter_subjectives` | Data subjektif SOAP (chief_complaint, history_of_present_illness) |
| `encounter_allergies` | Snapshot alergi saat encounter |
| `encounter_medical_histories` | Snapshot riwayat medis saat encounter |
| `encounter_vitals` | Vital signs (systolic, diastolic, heart_rate, temperature, dll) |
| `encounter_examinations` | Pemeriksaan fisik semi-structured |
| `encounter_observations` | Observasi terstruktur (dari observation_template) |
| `encounter_media` | Media/foto pendukung |
| `encounter_diagnoses` | Diagnosis (link ke ICD codes) |
| `encounter_services` | Layanan yang diberikan saat encounter |
| `encounter_medications` | Resep/medikasi (link ke medical_items) |
| `encounter_dispositions` | Disposisi (discharge_status, prognosis) |
| `encounter_lab_orders` | Order lab |
| `encounter_lab_results` | Hasil lab |
| `dispenses` | Penyerahan obat ( dispensing) |
| `dispense_items` | Item dispense (link ke batch, medication) |

### 2.13 Front Office Domain (Tenant)

| Tabel | Deskripsi |
|-------|-----------|
| `polyclinic_sessions` | Jadwal poli (day_of_week, start/end_time, max_patients) |
| `appointments` | Booking appointment online |
| `patient_visits` | Kunjungan pasien (created dari walk-in atau appointment) |
| `patient_queues` | Antrean poli (queue_number, status) |
| `frontdesk_queues` | Antrean frontdesk (general) |

### 2.14 Clinic Invoice Domain (Tenant)

| Tabel | Deskripsi |
|-------|-----------|
| `invoices` | Invoice layanan klinik (link ke patient, encounter) |
| `invoice_items` | Item invoice (service, medication, lab, admin) |
| `payments` | Pembayaran invoice |

---

## 3. Database Separation: Landlord vs Tenant

### 3.1 Konsep

| Tipe | Deskripsi | Isolation |
|------|-----------|-----------|
| **Landlord** | Data shared, single database | Shared schema |
| **Tenant** | Template-based per clinic | Multiple tenants per database |

Tenant tables berfungsi sebagai **template database** yang di-copy saat membuat tenant baru, bukan satu tenant per database.

### 3.2 Landlord Tables

**Core & Users:**
- `users`, `user_profiles`
- `accounts`, `account_profiles`, `account_users`
- `clinics`, `clinic_profiles`, `clinic_users`

**Media:**
- `media`

**Subscription & Billing:**
- `plans`, `subscriptions`, `subscription_extras`
- `extras`, `features`, `plan_features`, `extra_features`, `account_entitlements`
- `clinic_invoices`, `clinic_invoice_items`, `clinic_payments`

**Master Data:**
- `icd_codes`
- `kfa_templates`, `kfa_items`, `kfa_lookups`, `kfa_drug_ingredients`
- `observation_templates`

**Search:**
- `search_logs`, `search_aggregates`

**Templates:**
- `service_templates`, `position_templates`, `specialty_templates`

### 3.3 Tenant Tables (Template)

**Patient Domain:**
- `patients`, `patient_profiles`, `patient_contacts`, `patient_emergency_contacts`, `patient_identifiers`, `patient_insurances`
- `patient_allergies`, `patient_medical_histories`

**Service Domain:**
- `services`, `polyclinic_services`

**Facility Domain:**
- `polyclinics`, `rooms`, `employee_polyclinics`

**Inventory Domain:**
- `medical_items`, `medical_stocks`, `medical_batches`, `medical_movements`

**Staff Domain:**
- `employees`, `employee_profiles`, `employee_positions`, `employee_position_assignments`, `specialties`, `employee_specialties`

**Encounter Domain:**
- `encounters`, `encounter_subjectives`, `encounter_allergies`, `encounter_medical_histories`
- `encounter_vitals`, `encounter_examinations`, `encounter_observations`, `encounter_media`
- `encounter_diagnoses`, `encounter_services`, `encounter_medications`, `encounter_dispositions`
- `encounter_lab_orders`, `encounter_lab_results`, `dispenses`, `dispense_items`

**Front Office Domain:**
- `polyclinic_sessions`, `appointments`, `patient_visits`, `patient_queues`, `frontdesk_queues`

**Clinic Invoice Domain:**
- `invoices`, `invoice_items`, `payments`

### 3.4 Ilustrasi Arsitektur

```
┌──────────────────────────────────────────────────────────────┐
│                      LANDLORD DATABASE                         │
│  Users │ Accounts │ Clinics │ Plans │ Features │ ICD │ KFA   │
│  Service/Position/Specialty Templates │ Media │ Search       │
└──────────────────────────────────────────────────────────────┘
                                │
              ┌─────────────────┼─────────────────┐
              ▼                 ▼                 ▼
    ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
    │  TENANT DB 1     │ │  TENANT DB 2     │ │  TENANT DB 3     │
    │  ┌───┐ ┌───┐     │ │  ┌───┐ ┌───┐     │ │  ┌───┐ ┌───┐     │
    │  │ T1│ │ T2│     │ │  │ T3│ │ T4│     │ │  │ T5│ │ T6│     │
    │  └───┘ └───┘     │ │  └───┘ └───┘     │ │  └───┘ └───┘     │
    │  (multiple tenants per database)                      │
    └─────────────────┘ └─────────────────┘ └─────────────────┘
```

### 3.5 Clinic Relations (Tenant Hierarchy)

```
clinics
 ├── patients
 │    ├── patient_profiles, patient_contacts
 │    ├── patient_emergency_contacts, patient_identifiers
 │    ├── patient_insurances
 │    ├── patient_allergies (long-term memory)
 │    └── patient_medical_histories (long-term memory)
 ├── services
 │    └── polyclinic_services ↔ polyclinics
 ├── polyclinics
 │    ├── rooms
 │    │    └── employee_polyclinics (employee ↔ polyclinic)
 │    └── polyclinic_sessions
 ├── employees
 │    ├── employee_profiles
 │    ├── employee_positions
 │    ├── specialties
 │    └── employee_specialties
 ├── medical_items
 │    ├── medical_stocks
 │    ├── medical_batches
 │    └── medical_movements
 ├── encounters (linked to patient_visits, polyclinic_sessions, doctor)
 │    ├── encounter_subjectives, encounter_vitals
 │    ├── encounter_allergies, encounter_medical_histories (snapshots)
 │    ├── encounter_examinations, encounter_observations
 │    ├── encounter_media, encounter_diagnoses (→ ICD)
 │    ├── encounter_services, encounter_medications (→ medical_items)
 │    ├── encounter_dispositions, encounter_lab_orders/-results
 │    └── dispenses ↔ dispense_items
 ├── patient_visits (→ appointments, → patient_queues)
 └── invoices (→ payments)
```

### 3.6 Two Billing Systems

| Sistem | Tables | Purpose |
|--------|--------|---------|
| **Subscription Billing** (Landlord) | `clinic_invoices`, `clinic_invoice_items`, `clinic_payments` | Billing langganan ke account |
| **Patient Invoice** (Tenant) | `invoices`, `invoice_items`, `payments` | Billing layanan ke patient |

---

## 4. Q&A

**Q: Mengapa database perlu dipisah?**

Database memiliki batasan koneksi simultan. Semakin banyak koneksi aktif, semakin tinggi beban server dan berpotensi menyebabkan downtime. Dengan memecah tenant ke database berbeda, beban koneksi didistribusikan sehingga sistem tetap stabil saat user load meningkat.

---

**Q: Mengapa hybrid model (multiple tenants per database)?**

Resource efficiency. Tidak semua clinic memerlukan database dedicated. Dengan menyusun beberapa tenant dalam satu database, penggunaan resource lebih optimal. Namun jika tenant sudah terlalu banyak, bisa dipindah ke database baru.

---

**Q: Mengapa pisah `account` dan `clinic`?**

1. Satu bisnis bisa punya beberapa klinik berbeda kategori (general, dental, aesthetic)
2. Account sebagai entitas billing aggregate semua clinic
3. Clinic bisa dikonfigurasi independen (timezone, jam operasional, layanan)
4. Clinic baru bisa ditambah tanpa membuat account baru

---

## Revision History

| Date | Version | Description |
|------|---------|-------------|
| 2026-04-25 | 1.0 | Initial documentation |
| 2026-04-27 | 1.1 | Updated to merged ERD with complete tenant domains |
| 2026-04-28 | 1.2 | Added Encounter, Front Office, Invoice domains; renamed billing_invoices → clinic_invoices |

---

*Document generated for SIM Klinik System Analysis*