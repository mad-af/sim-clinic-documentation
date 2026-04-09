# Project Workflow

## Overview

Standard Conductor workflow for documentation project (SIM Klinik flowchart diagrams).

## Process

### Track Implementation
1. Create spec.md for track requirements
2. Create plan.md with task breakdown
3. Implement diagrams per plan
4. Verify against spec.md

### Diagram Creation
1. Read module specs in `Materi/`
2. Create Mermaid flowchart in `Diagram/[module]/`
3. Update `index.html` if adding new diagram
4. Update AGENTS.md if adding new conventions

## Standards

### Diagram Quality
- All flowcharts must have Start and End nodes
- Decision nodes must have Yes/No branches
- Use Bahasa Indonesia for node labels
- Consistent color scheme per Product Guidelines

### File Management
- Diagrams in `Diagram/[module-name]/[name].mmd`
- UTF-8 encoding
- kebab-case naming

## Version Control

- Commit after each track completion
- Meaningful commit messages