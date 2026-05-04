Ya. Kalau dibikin ulang supaya **selaras**, ERD domain obatnya sebaiknya dipisah jadi **2 boundary besar**:

1. **Landlord / global master KFA**
2. **Tenant / operasional klinik**

Di bawah ini versi full yang saya sarankan untuk domain ini saja.

```mermaid
erDiagram

  %% =========================
  %% LANDLORD / GLOBAL KFA
  %% =========================

  kfa_active_substances {
    uuid id PK
    string kfa_code "91xxxxxx"
    string name
    string status
    datetime created_at
    datetime updated_at
  }

  kfa_medication_templates {
    uuid id PK
    string kfa_code "92xxxxxx"
    string name
    string dosage_form
    string strength_text
    string route
    string status
    datetime created_at
    datetime updated_at
  }

  kfa_medication_template_ingredients {
    uuid id PK
    uuid medication_template_id FK
    uuid active_substance_id FK
    decimal amount
    string unit
    string note
    datetime created_at
    datetime updated_at
  }

  kfa_products {
    uuid id PK
    string kfa_code "93xxxxxx"
    uuid medication_template_id FK
    string brand_name
    string manufacturer_name
    string dosage_form
    string strength_text
    string status
    datetime created_at
    datetime updated_at
  }

  kfa_product_packages {
    uuid id PK
    string kfa_code "94xxxxxx"
    uuid product_id FK
    string package_name
    string package_type
    decimal package_quantity
    string package_unit
    string status
    datetime created_at
    datetime updated_at
  }

  %% =========================
  %% TENANT / OPERATIONAL
  %% =========================

  clinics {
    uuid id PK
    string code
    string name
    string status
    datetime created_at
    datetime updated_at
  }

  clinic_medication_catalogs {
    uuid id PK
    uuid clinic_id FK
    uuid kfa_medication_template_id FK
    uuid kfa_product_id FK
    uuid kfa_product_package_id FK
    string display_name
    decimal selling_price
    boolean is_active
    datetime created_at
    datetime updated_at
  }

  clinic_inventory_locations {
    uuid id PK
    uuid clinic_id FK
    string code
    string name
    string location_type
    boolean is_active
    datetime created_at
    datetime updated_at
  }

  clinic_inventory_lots {
    uuid id PK
    uuid clinic_id FK
    uuid kfa_product_package_id FK
    uuid inventory_location_id FK
    string batch_number
    date expired_at
    decimal quantity_on_hand
    decimal quantity_reserved
    decimal quantity_available
    datetime created_at
    datetime updated_at
  }

  clinic_inventory_movements {
    uuid id PK
    uuid clinic_id FK
    uuid inventory_lot_id FK
    string movement_type "IN|OUT|ADJUSTMENT|RESERVE|RELEASE"
    string reference_type
    uuid reference_id
    decimal quantity
    string note
    datetime created_at
    datetime updated_at
  }

  clinic_medication_requests {
    uuid id PK
    uuid clinic_id FK
    uuid patient_id
    uuid doctor_id
    uuid encounter_id
    boolean is_compound
    string status "DRAFT|SIGNED|CANCELLED"
    string note
    datetime created_at
    datetime updated_at
  }

  clinic_medication_request_items {
    uuid id PK
    uuid medication_request_id FK
    string item_type "GENERIC|BRAND|COMPOUND_COMPONENT"
    uuid kfa_medication_template_id FK
    uuid kfa_product_id FK
    uuid kfa_active_substance_id FK
    decimal dose_amount
    string dose_unit
    decimal frequency_per_day
    integer duration_days
    string instruction
    datetime created_at
    datetime updated_at
  }

  clinic_compound_prescriptions {
    uuid id PK
    uuid medication_request_item_id FK
    string compound_name
    string preparation_note
    datetime created_at
    datetime updated_at
  }

  clinic_compound_prescription_items {
    uuid id PK
    uuid compound_prescription_id FK
    uuid kfa_active_substance_id FK
    uuid kfa_medication_template_id FK
    uuid kfa_product_id FK
    decimal amount
    string unit
    string note
    datetime created_at
    datetime updated_at
  }

  clinic_medication_dispenses {
    uuid id PK
    uuid clinic_id FK
    uuid medication_request_id FK
    uuid pharmacist_id
    string status "DRAFT|DISPENSED|VOID"
    datetime dispensed_at
    string note
    datetime created_at
    datetime updated_at
  }

  clinic_medication_dispense_items {
    uuid id PK
    uuid medication_dispense_id FK
    uuid medication_request_item_id FK
    uuid kfa_product_id FK
    uuid kfa_product_package_id FK
    uuid inventory_lot_id FK
    decimal quantity
    string unit
    string substitution_note
    datetime created_at
    datetime updated_at
  }

  %% =========================
  %% RELATIONSHIPS - GLOBAL
  %% =========================

  kfa_active_substances ||--o{ kfa_medication_template_ingredients : used_in
  kfa_medication_templates ||--o{ kfa_medication_template_ingredients : has_ingredient
  kfa_medication_templates ||--o{ kfa_products : parent_template
  kfa_products ||--o{ kfa_product_packages : packaged_as

  %% =========================
  %% RELATIONSHIPS - TENANT
  %% =========================

  clinics ||--o{ clinic_medication_catalogs : owns
  clinics ||--o{ clinic_inventory_locations : owns
  clinics ||--o{ clinic_inventory_lots : owns
  clinics ||--o{ clinic_inventory_movements : owns
  clinics ||--o{ clinic_medication_requests : owns
  clinics ||--o{ clinic_medication_dispenses : owns

  clinic_inventory_locations ||--o{ clinic_inventory_lots : stores
  kfa_product_packages ||--o{ clinic_inventory_lots : stocked_as
  clinic_inventory_lots ||--o{ clinic_inventory_movements : moved_by

  clinic_medication_requests ||--o{ clinic_medication_request_items : contains
  clinic_medication_request_items ||--o| clinic_compound_prescriptions : compound_header
  clinic_compound_prescriptions ||--o{ clinic_compound_prescription_items : contains

  clinic_medication_requests ||--o{ clinic_medication_dispenses : fulfilled_by
  clinic_medication_dispenses ||--o{ clinic_medication_dispense_items : contains
  clinic_medication_request_items ||--o{ clinic_medication_dispense_items : fulfilled_as

  kfa_medication_templates ||--o{ clinic_medication_request_items : requested_template
  kfa_products ||--o{ clinic_medication_request_items : requested_product
  kfa_active_substances ||--o{ clinic_medication_request_items : requested_substance

  kfa_active_substances ||--o{ clinic_compound_prescription_items : compound_substance
  kfa_medication_templates ||--o{ clinic_compound_prescription_items : compound_template
  kfa_products ||--o{ clinic_compound_prescription_items : compound_product

  kfa_products ||--o{ clinic_medication_dispense_items : dispensed_product
  kfa_product_packages ||--o{ clinic_medication_dispense_items : dispensed_package
  clinic_inventory_lots ||--o{ clinic_medication_dispense_items : sourced_from

  clinic_medication_catalogs }o--|| kfa_medication_templates : maps_to_template
  clinic_medication_catalogs }o--|| kfa_products : maps_to_product
  clinic_medication_catalogs }o--|| kfa_product_packages : maps_to_package
```

## Inti desainnya

* **BZA / 91** → `kfa_active_substances`
* **POV / 92** → `kfa_medication_templates`
* **POA / 93** → `kfa_products`
* **POAK / 94** → `kfa_product_packages`

Lalu di tenant:

* **dokter menulis resep** di `clinic_medication_requests` + `clinic_medication_request_items`
* **farmasi menebus** di `clinic_medication_dispenses` + `clinic_medication_dispense_items`
* **stok nyata** ada di `clinic_inventory_lots`
* **mutasi stok** ada di `clinic_inventory_movements`

## Kenapa ada `clinic_medication_catalogs`

Supaya tiap klinik bisa punya:

* nama tampil lokal
* harga jual
* status aktif/nonaktif
* mapping ke KFA master

Jadi KFA tetap global, tapi operasional tetap fleksibel.

## Bagian yang paling penting

Di level resep:

* non-racikan: dokter pilih **POV atau POA**
* racikan: dokter pilih **BZA** atau kombinasi komponen

Di level dispensing:

* yang benar-benar keluar dari farmasi sebaiknya tercatat sebagai **POA**
* pengurang stok mengambil dari **POAK / lot stok**

Itu yang bikin alurnya nyambung dari klinik sampai inventory.

Kalau mau, langkah berikutnya yang paling berguna adalah saya turunkan ERD ini jadi **versi Mermaid yang lebih ringkas** atau langsung jadi **struktur migration / GORM model**.
