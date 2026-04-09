# Product Guidelines - SIM Klinik Documentation

## 1. Language & Terminology

- **Documentation Language**: Bahasa Indonesia for all labels and descriptions
- **Technical Terms**: boleh campur dengan English jika diperlukan
- **Naming Convention**: PascalCase (e.g., `KlinikUmum`, `FrontOffice`, `RekamMedis`)

## 2. Diagram Style Guidelines

### 2.1 Color Scheme (Warm Colors)
- **Decision Nodes**: Kuning/oranye (`#F4D03F`, `#E67E22`)
- **Process Nodes**: Biru cerah (`#3498DB`)
- **Success/End Nodes**: Hijau (`#27AE60`)
- **Start Nodes**: Hijau tua (`#1E8449`)
- **Error/Alert Nodes**: Merah (`#E74C3C`)

### 2.2 Shape Conventions
- **Start/End**: Rounded rectangle (stadium)
- **Process**: Rectangle
- **Decision**: Diamond
- **Input/Output**: Parallelogram
- **Subprocess**: Rectangle with double border

### 2.3 Node Labeling
- Use PascalCase for node IDs
- Use Bahasa Indonesia for display labels
- Keep labels concise (max 5 words per node)

## 3. File Organization

### 3.1 Directory Structure
```
Diagram/
├── 00-front-office/          # Front Office module
│   ├── klinik-umum.mmd
│   ├── klinik-gigi.mmd
│   └── klinik-kecantikan.mmd
├── 01-finance/               # Finance module
│   ├── tagihan-pasien.mmd
│   ├── layanan-medis-dan-tindakan.mmd
│   └── ...
├── 02-hr/                    # HR module
└── ...
```

### 3.2 File Naming
- Format: `kebab-case.mmd` (e.g., `klinik-umum.mmd`, `tagihan-pasien.mmd`)
- Encoding: UTF-8

## 4. Mermaid Diagram Conventions

### 4.1 Graph Type
- Use `flowchart` as primary graph type
- Direction: Left-to-Right (`LR`) or Top-to-Bottom (`TB`)

### 4.2 Subgraph Usage
- Group related nodes by stage/area using `subgraph`
- Label subgraph headers in Bahasa Indonesia

### 4.3 Styling
- Apply inline styles for custom colors
- Use `classDef` for reusable style definitions

## 5. Content Quality Standards

### 5.1 Completeness
- Every flowchart must have Start and End nodes
- All decision points must have clear Yes/No paths
- All branches must converge to a终点

### 5.2 Clarity
- Node labels should be self-explanatory
- Complex logic should be broken into sub-processes
- Loopback paths must be clearly marked

### 5.3 Consistency
- Same Business Rule always maps to same node style
- Same actor role always uses same actor shape