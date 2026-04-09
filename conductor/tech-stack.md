# Tech Stack - SIM Klinik Documentation

## 1. Diagram Authoring

### Primary Tool
- **Text Editor**: Any text editor (VS Code, Sublime, Nano, etc.)
- **Format**: Mermaid syntax written as `.mmd` files
- **Encoding**: UTF-8

### No Diagram GUI Tool
Direct Mermaid text files - no draw.io or visual diagram editor.

## 2. Diagram Types

| Type | Purpose | Format |
|------|---------|--------|
| Flowchart | Workflow/alur kerja | `.mmd` (Mermaid) |

## 3. Output Formats

| Format | Description |
|--------|-------------|
| `.mmd` | Mermaid source files (primary) |
| HTML Viewer | `index.html` with Mermaid.js rendering via `server.js` |

## 4. Visualization Stack

```
.mmd files → Mermaid.js → HTML Viewer (index.html + server.js)
```

Existing files in project:
- `index.html` - Mermaid diagram viewer
- `server.js` - Static server for index.html

## 5. File Storage

- **Location**: `Diagram/[module-name]/[diagram-name].mmd`
- **Encoding**: UTF-8
- **Naming**: kebab-case (e.g., `klinik-umum.mmd`, `tagihan-pasien.mmd`)

## 6. Tech Stack Summary

| Component | Technology |
|-----------|------------|
| Diagram Syntax | Mermaid |
| Diagram Type | Flowchart |
| Output Format | `.mmd` + HTML Viewer |
| Viewer | Custom `index.html` + `server.js` |
| Hosting | Local static server |