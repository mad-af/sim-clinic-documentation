# Specification - Simplify Payroll Diagram

## Overview

Simplify the existing `payroll-staff-dan-dokter.mmd` diagram by removing annotations and keeping only the essential flow.

## Current State

Existing diagram has:
- 3 subgraphs: A. PENDAPATAN, B. POTONGAN, C. SELESAI
- Annotations subgraph with detailed explanations
- 35 lines total

## Target State

Simplified diagram:
- Direct flow without annotations subgraph
- Keep core structure: Pendapatan → Potongan → Gaji Bersih
- Staff vs Dokter parallel paths
- Clean, minimal design
- ~15-20 lines total

## Changes

1. Remove `Annotations` subgraph entirely
2. Merge inline notes into node labels if needed
3. Keep parallel structure for Staff and Dokter
4. Maintain warm color scheme