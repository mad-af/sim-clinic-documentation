# AGENTS.md - SIM Klinik (Clinic Management System)

## Project Overview

This is a **System Analyst documentation repository** for a clinic management system (SIM Klinik) developed for **Klinik Bening**. The system handles multi-specialty clinic operations including General Practice, Beauty Clinic, and Dental Clinic.

**Repository Purpose:** Requirements analysis, system design documentation, and workflow specifications for the development team.

---

## System Architecture

### Core Modules

| Module | Description | Key Features |
|--------|-------------|--------------|
| **Dashboard** | Main landing page after login | Daily summary, revenue charts, alerts, critical stock warnings |
| **Front Office** | Patient registration & queue management | OCR registration, queue management, appointment booking, visit tracking |
| **Rekam Medis (EMR)** | Electronic Medical Records | SOAP format, ICD-10/ICD-9 integration, odontogram for dental, before/after photos for beauty |
| **Kasir & Tagihan** | Billing & payments | Auto-itemized bills, multi-payment methods, QRIS, WhatsApp receipt |
| **Farmasi** | Pharmacy management | Recipe queue, stock control, expiry monitoring, procurement |
| **Keuangan** | Finance & accounting | Doctor fee sharing, payroll, expense tracking |
| **HR** | Human resources | Staff directory, credentials (SIP/STR), attendance, leave management |
| **Penunjang** | Lab & Radiology | Order entry, result input, normal value indicators, PDF reports |
| **Hak Akses** | Role & Permissions | Role-based access (Owner, Admin, Doctor, Nurse, Farmasi, Kasir, Lab, HRD) |

### Clinic Types Supported

1. **Klinik Umum** (General) - Direct poly selection, no prior consultation
2. **Klinik Kecantikan** (Beauty) - Mandatory consultation first, member system, before/after photos
3. **Klinik Gigi** (Dental) - Consultation required, odontogram (32-tooth mapping)

---

## Documentation Structure

```
Klinik App/
├── Materi/                    # Requirements & analysis documents
│   ├── note-meet.txt         # Meeting notes
│   ├── task-deskripsi.txt   # Task descriptions & workflows
│   └── usulan-module-docs.txt # Detailed module specifications
├── Diagram/                   # Flowcharts & diagrams
│   └── 00-front-office/      # Front office module diagrams
└── AGENTS.md                 # This file
```

### Documentation Standards

1. **Meeting Notes:** Store in `Materi/note-meet.txt` with date and participants
2. **Module Docs:** Detailed specifications in `Materi/usulan-module-docs.txt`
3. **Task Flows:** Patient flows in `Materi/task-deskripsi.txt`
4. **Diagrams:** Store in `Diagram/[module-name]/` with semantic naming

---

## Code Standards (For Development Team)

When implementing this system, adhere to the following standards:

### General Guidelines

- Write code in **Bahasa Indonesia** for user-facing text, **English** for code
- Follow **clean architecture** principles (separation of concerns)
- Use **DRY** (Don't Repeat Yourself) and **SOLID** principles
- Document all business logic with comments explaining the "why"

### Backend Standards

- **Framework:** Laravel or similar PHP framework (to be confirmed with dev team)
- **API Design:** RESTful with versioned endpoints (`/api/v1/`)
- **Authentication:** JWT-based with role permissions
- **Validation:** Server-side validation on all inputs
- **Error Handling:** Structured JSON responses `{ "success": bool, "data": [], "message": string, "errors": [] }`

### Database Standards

- Use **soft deletes** for master data (patients, staff)
- All tables must have `created_at`, `updated_at` timestamps
- Foreign keys must be explicitly named: `fk_[table]_[reference]`
- Use **audit trails** for financial transactions

### Frontend Standards

- **Framework:** React or Vue (to be confirmed)
- **State Management:** Centralized store (Vuex/Pinia or React Context)
- **Forms:** Validate before submission, show inline errors
- **Responsive:** Mobile-first design for front desk operations

### Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Tables | snake_case plural | `patient_visits` |
| Columns | snake_case | `created_at`, `doctor_fee` |
| Models | PascalCase singular | `PatientVisit`, `Invoice` |
| Controllers | PascalCase + Controller | `PatientController` |
| Methods | camelCase | `getActiveQueue()`, `calculateDoctorFee()` |
| Variables | camelCase | `patientName`, `totalAmount` |
| Constants | UPPER_SNAKE_CASE | `MAX_QUEUE_SIZE`, `DEFAULT_PAGE_SIZE` |
| APIs | kebab-case | `/queue-management`, `/patient-registration` |

### Code Quality

- **Type Safety:** Use strict typing (TypeScript recommended)
- **Linting:** ESLint + Prettier for frontend, PHP CS Fixer for backend
- **Testing:** Unit tests for business logic, integration tests for APIs
  - Run single test: `npm test -- --testNamePattern="test name"` or `vendor/bin/phpunit --filter="testName"`
- **Code Review:** All PRs require at least 1 approval

---

## Key Business Rules

1. **Queue Number:** Auto-generated upon patient registration
2. **Queue Sync:** Online booking and walk-in queue must be synchronized
3. **Stock Logic:** Inventory decreases only when medication is handed over
4. **Doctor Fee Split:** Per-invoice calculation (e.g., 70% doctor / 30% clinic)
5. **Alert System:**
   - Low stock warning when below minimum limit
   - SIP/STR expiry alerts 3 months before expiration
6. **WhatsApp Integration:** Automated notifications for appointment reminders and receipts

---

## Important Notes for Agents

- This is a **multi-tenant-ready** system design (owner can own multiple clinics)
- All timestamps should use **UTC** internally, convert to local timezone for display
- Financial calculations must use **precise decimals** (2 decimal places minimum)
- Patient photos (before/after for beauty, odontogram for dental) require secure storage
- Consider **offline-capable** front desk operations for network instability

---

## Change Log

| Date | Description |
|------|-------------|
| 2026-04-02 | Initial AGENTS.md created from system analysis docs |
