# Specification - Flowchart Obat Racikan

## Overview

Create a Mermaid flowchart documenting the compound medication (obat racikan) process in the Farmasi module.

## Context

- Existing `peresepan-obat.mmd` shows general prescription flow (non-racikan)
- Need new diagram for compound medication specifically

## Flow

1. **Input**: Dokter input resep racikan di SOAP → Plan
2. **Verifikasi**: Farmasi verifikasi resep racikan
3. **Racik**: Proses meracik obat (bahan baku)
4. **Label**: Cetak label racikan
5. **Serah**: Serahkan ke pasien dengan stok deduction

## Components

- Antrean racikan (queue)
- Input bahan racikan
- Proses racik
- Cetak label
- Stok deduction saat serahkan

## Business Rules

- Stok obat racikan BERKURANG saat SERAHKAN, bukan saat racik
- Label racikan berbeda dari label obat biasa
- Proses parallel dengan non-racikan