# Spec Delta

## Purpose

Makes the browser icon a single letter K that still reads at tab size, and keeps that same mark on every favicon file.

## ADDED Requirements

### Requirement: The mark is one K
The favicon SHALL show a single capital K. It SHALL NOT show a "KT" monogram. The letter SHALL NOT depend on Playfair. The ground SHALL be walnut `#34261e` and the letter SHALL be paper `#faf7f2`.

#### Scenario: Tab icon
- **WHEN** the SVG favicon is opened
- **THEN** the artwork is one K on a walnut square, and the file does not contain the letters KT

### Requirement: One mark across the set
`favicon.svg`, `favicon.ico`, and `apple-touch-icon.png` SHALL show that same K. The Apple icon SHALL be 180 px square. The ico SHALL include a 32 px image. The page SHALL NOT request `/vite.svg`.

#### Scenario: Linked files resolve
- **WHEN** `/favicon.svg`, `/favicon.ico`, and `/apple-touch-icon.png` are requested
- **THEN** each responds with status 200 and an image content type, and each shows the K

### Requirement: The contract names a K
The design contract SHALL describe the favicon as a letter K, and SHALL NOT require a "KT" monogram or Playfair for that icon.

#### Scenario: README sentence
- **WHEN** the Head and metadata section of `README.md` is read
- **THEN** the favicon sentence says the mark is a K and does not require Playfair
