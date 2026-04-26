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

### 2.1 Core Module (Users, Accounts, Clinics)

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

### 2.2 Subscription & Billing Module

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
| `billing_invoices` | Invoice ke account |
| `billing_invoice_items` | Item-item dalam invoice |
| `billing_payments` | Record pembayaran |

### 2.3 Media Module

| Tabel | Deskripsi |
|-------|-----------|
| `media` | Penyimpanan file terpusat (polymorphic, scope: account/clinic) |

### 2.4 Master Data Medis

| Tabel | Deskripsi |
|-------|-----------|
| `icd_codes` | Master kode ICD-10 dan ICD-9-CM |
| `kfa_drug_templates` | Template obat KFA |
| `kfa_drug_items` | Item obat dagang |
| `kfa_lookups` | Lookup units dan dosage forms |
| `kfa_drug_ingredients` | Zat aktif per obat |

### 2.5 Search Module

| Tabel | Deskripsi |
|-------|-----------|
| `search_logs` | Log pencarian user |
| `search_aggregates` | Agregasi analytics pencarian |

---

## 3. Database Separation: Landlord vs Tenant

### 3.1 Konsep

| Tipe | Deskripsi | Isolation |
|------|-----------|-----------|
| **Landlord** | Data shared, single database | Shared schema |
| **Tenant** | Template-based per clinic | Multiple tenants per database |

Tenant tables berfungsi sebagai **template database** yang di-copy saat membuat tenant baru, bukan satu tenant per database.

### 3.2 Landlord Tables

- `users`, `user_profiles`
- `accounts`, `account_profiles`, `account_users`
- `clinics`, `clinic_profiles`, `clinic_users`
- `plans`, `subscriptions`, `subscription_extras`
- `extras`, `features`, `plan_features`, `extra_features`, `account_entitlements`
- `billing_invoices`, `billing_invoice_items`, `billing_payments`
- `icd_codes`
- `kfa_drug_templates`, `kfa_drug_items`, `kfa_lookups`, `kfa_drug_ingredients`
- `media`, `search_logs`, `search_aggregates`

### 3.3 Tenant Tables (Template)

**Patient & Visit:**
- `patients`, `out_patients`, `resumes`, `vital_signs`, `resume_icd10s`

**Medical Records:**
- `medical_certificates`, `health_certificates`, `patient_referral_letters`

**Pharmacy:**
- `drugs`, `drug_categories`, `prescriptions`, `prescription_items`, `units`

**Scheduling:**
- `schedules`, `services`, `orders`

**Polyclinics & Locations:**
- `polyclinics`, `locations`

**HR/RBAC:**
- `roles`, `permissions`, `model_has_roles`, `model_has_permissions`, `role_has_permissions`

### 3.4 Ilustrasi Arsitektur

```
┌─────────────────────────────────────────────────────┐
│               LANDLORD DATABASE                     │
│  (Shared - Users, Accounts, Plans, ICD, KFA, dll)   │
└─────────────────────────────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        ▼                       ▼
┌───────────────────┐   ┌───────────────────┐
│  TENANT DATABASE 1 │   │  TENANT DATABASE 2 │
│  ┌───┐ ┌───┐ ┌───┐ │   │  ┌───┐ ┌───┐ ┌───┐ │
│  │ T1│ │ T2│ │ T3│ │   │  │ T4│ │ T5│ │ T6│ │
│  └───┘ └───┘ └───┘ │   │  └───┘ └───┘ └───┘ │
│  (multiple tenants)│   │  (multiple tenants)│
└───────────────────┘   └───────────────────┘
```

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

---

*Document generated for SIM Klinik System Analysis*